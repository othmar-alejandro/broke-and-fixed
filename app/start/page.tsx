import { redirect } from "next/navigation"
import { headers } from "next/headers"

// Locale-less entry point for the QR code on the business card.
// brokeandfixed.com/start -> /en/start or /es/start based on the visitor's browser.
export const dynamic = "force-dynamic"

export default async function StartEntry() {
  const h = await headers()
  const primary = (h.get("accept-language") || "").split(",")[0].trim().toLowerCase()
  const locale = primary.startsWith("es") ? "es" : "en"
  redirect(`/${locale}/start`)
}
