import { redirect } from "next/navigation"

export default function HomePage() {
  // This is an API-focused application
  // Redirect to the API documentation or README
  redirect("/api/pages")
}
