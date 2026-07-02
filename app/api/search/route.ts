import { NextResponse } from "next/server"
import { searchManual } from "@/lib/manual"

// GET /api/search?q=term -> ranked full-text search across the manual.
export async function GET(request: Request) {
  const query = new URL(request.url).searchParams.get("q") ?? ""

  if (!query.trim()) {
    return NextResponse.json(
      { error: "Missing query", message: "Provide a search term via ?q=" },
      { status: 400 },
    )
  }

  const results = await searchManual(query)
  return NextResponse.json({ query, count: results.length, results })
}
