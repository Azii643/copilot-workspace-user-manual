import { NextResponse } from "next/server"
import { getManualIndex } from "@/lib/manual"

// GET /api/pages -> ordered list of every manual page (summaries only)
export async function GET() {
  const pages = await getManualIndex()

  // Group by section for convenient navigation on the client.
  const sections: { section: string; pages: typeof pages }[] = []
  for (const page of pages) {
    let group = sections.find((s) => s.section === page.section)
    if (!group) {
      group = { section: page.section, pages: [] }
      sections.push(group)
    }
    group.pages.push(page)
  }

  return NextResponse.json({ count: pages.length, pages, sections })
}
