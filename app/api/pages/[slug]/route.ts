import { NextResponse } from "next/server"
import { getPage } from "@/lib/manual"

// GET /api/pages/:slug -> full content for a single manual page.
// Supports ?format=markdown|html|json (default: json with both).
export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params
  const page = await getPage(slug)

  if (!page) {
    return NextResponse.json(
      { error: "Not found", message: `No manual page with slug "${slug}".` },
      { status: 404 },
    )
  }

  const format = new URL(request.url).searchParams.get("format")

  if (format === "markdown") {
    return new NextResponse(page.markdown, {
      headers: { "Content-Type": "text/markdown; charset=utf-8" },
    })
  }

  if (format === "html") {
    return new NextResponse(page.html, {
      headers: { "Content-Type": "text/html; charset=utf-8" },
    })
  }

  return NextResponse.json(page)
}
