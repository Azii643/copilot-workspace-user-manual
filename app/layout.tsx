import type { Metadata } from "next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Copilot Workspace User Manual",
  description: "User manual for GitHub Copilot Workspace",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  )
}
