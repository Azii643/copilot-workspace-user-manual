import "server-only"
import fs from "node:fs/promises"
import path from "node:path"
import { cache } from "react"
import matter from "gray-matter"
import { marked } from "marked"

// Root of the repository, where the manual's Markdown files live.
const CONTENT_ROOT = process.cwd()

/**
 * Ordered manual structure. Each entry maps a stable `slug` (used in API URLs)
 * to a source Markdown file and human-friendly metadata. This mirrors the
 * Table of Contents in README.md so the API exposes the manual as an ordered,
 * navigable document rather than a loose pile of files.
 */
export type ManualEntry = {
  slug: string
  title: string
  file: string
  section: string
}

export const MANUAL: ManualEntry[] = [
  { slug: "overview-readme", title: "Introduction", file: "README.md", section: "Overview" },
  { slug: "getting-started", title: "Getting Started", file: "getting-started.md", section: "Getting Started" },
  { slug: "vscode", title: "VS Code", file: "vscode.md", section: "Getting Started" },
  { slug: "changes", title: "Changelog", file: "changes.md", section: "Getting Started" },
  { slug: "tips-and-tricks", title: "Tips & Tricks", file: "tips-and-tricks.md", section: "Getting Started" },
  { slug: "troubleshooting", title: "Troubleshooting", file: "troubleshooting.md", section: "Getting Started" },
  { slug: "creating-repos", title: "Creating New Repositories", file: "creating-repos.md", section: "Going Further" },
  { slug: "repo-maintainers", title: "Controls for Repository Maintainers", file: "repo-maintainers.md", section: "Going Further" },
  { slug: "known-issues", title: "Experiments, Roadmap, and Known Issues", file: "known-issues.md", section: "Going Further" },
  { slug: "experiments", title: "Experiments", file: "experiments.md", section: "Going Further" },
  { slug: "codespaces-guide", title: "Terminal / Codespaces Guide", file: "codespaces-guide.md", section: "Going Further" },
  { slug: "settings", title: "Settings", file: "settings.md", section: "Going Further" },
  { slug: "responsible-ai-faq", title: "Responsible AI FAQ", file: "responsible-ai-faq.md", section: "Going Further" },
  { slug: "origins", title: "Origins", file: "origins.md", section: "Origins" },
  { slug: "overview", title: "Conceptual Overview", file: "overview.md", section: "Origins" },
]

const bySlug = new Map(MANUAL.map((e) => [e.slug, e]))

export type PageSummary = {
  slug: string
  title: string
  section: string
  wordCount: number
  readingTimeMinutes: number
}

export type PageDetail = PageSummary & {
  markdown: string
  html: string
  headings: { level: number; text: string; id: string }[]
}

function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
}

function extractHeadings(markdown: string) {
  const headings: { level: number; text: string; id: string }[] = []
  const lines = markdown.split("\n")
  let inFence = false
  for (const line of lines) {
    if (line.trim().startsWith("```")) {
      inFence = !inFence
      continue
    }
    if (inFence) continue
    const match = /^(#{1,6})\s+(.*)$/.exec(line)
    if (match) {
      const text = match[2].replace(/[#*`]/g, "").trim()
      headings.push({ level: match[1].length, text, id: slugifyHeading(text) })
    }
  }
  return headings
}

async function readEntry(entry: ManualEntry): Promise<PageDetail> {
  const filePath = path.join(CONTENT_ROOT, entry.file)
  const raw = await fs.readFile(filePath, "utf8")
  const { content } = matter(raw)
  const words = content.trim().split(/\s+/).filter(Boolean).length
  const html = await marked.parse(content, { async: true })
  return {
    slug: entry.slug,
    title: entry.title,
    section: entry.section,
    wordCount: words,
    readingTimeMinutes: Math.max(1, Math.round(words / 200)),
    markdown: content,
    html,
    headings: extractHeadings(content),
  }
}

/** All pages as lightweight summaries, in manual order. Deduped per request. */
export const getManualIndex = cache(async (): Promise<PageSummary[]> => {
  const details = await Promise.all(MANUAL.map(readEntry))
  return details.map(({ markdown, html, headings, ...summary }) => summary)
})

/** Full detail for a single page, or null if the slug is unknown. */
export const getPage = cache(async (slug: string): Promise<PageDetail | null> => {
  const entry = bySlug.get(slug)
  if (!entry) return null
  return readEntry(entry)
})

export type SearchHit = {
  slug: string
  title: string
  section: string
  score: number
  snippets: string[]
}

/** Case-insensitive full-text search across every manual page. */
export const searchManual = cache(async (query: string): Promise<SearchHit[]> => {
  const q = query.trim().toLowerCase()
  if (!q) return []
  const details = await Promise.all(MANUAL.map(readEntry))
  const hits: SearchHit[] = []

  for (const page of details) {
    const haystack = page.markdown.toLowerCase()
    const titleMatch = page.title.toLowerCase().includes(q)
    let index = haystack.indexOf(q)
    if (index === -1 && !titleMatch) continue

    let score = titleMatch ? 5 : 0
    const snippets: string[] = []
    while (index !== -1 && snippets.length < 3) {
      score += 1
      const start = Math.max(0, index - 60)
      const end = Math.min(page.markdown.length, index + q.length + 60)
      const snippet = page.markdown.slice(start, end).replace(/\s+/g, " ").trim()
      snippets.push((start > 0 ? "…" : "") + snippet + (end < page.markdown.length ? "…" : ""))
      index = haystack.indexOf(q, index + q.length)
    }

    hits.push({ slug: page.slug, title: page.title, section: page.section, score, snippets })
  }

  return hits.sort((a, b) => b.score - a.score)
})
