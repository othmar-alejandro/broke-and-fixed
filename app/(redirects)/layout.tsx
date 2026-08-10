import type { Metadata } from "next"
import "../globals.css"

export const metadata: Metadata = {
  metadataBase: new URL("https://brokeandfixed.com"),
  robots: { index: false, follow: true },
}

export default function RedirectRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
