import type { LeadAttribution } from "@/lib/landing/attribution"

const WEB3FORMS_URL = "https://api.web3forms.com/submit"
/* This key already ships in public forms across the site. */
const WEB3FORMS_KEY = "ebb39c28-f927-4916-be94-71a448167ae6"

/** Browser fallback for guide capture when the server route cannot reach Web3Forms. */
export async function rescueGuideFromBrowser(payload: {
  email: string
  locale: string
  source: string
  attribution: LeadAttribution
}): Promise<boolean> {
  try {
    const response = await fetch(WEB3FORMS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: WEB3FORMS_KEY,
        subject: `Tub to shower planning guide: ${payload.email}`,
        from_name: "Broke and Fixed tub to shower page",
        email: payload.email,
        lead_type: "planning-guide",
        lead_source: payload.source,
        language: payload.locale,
        utm_source: payload.attribution.utmSource,
        utm_medium: payload.attribution.utmMedium,
        utm_campaign: payload.attribution.utmCampaign,
        utm_content: payload.attribution.utmContent,
        fbclid: payload.attribution.fbclid,
        landing_page: payload.attribution.landingPage,
        note: "Recovered in the browser after the API route failed.",
      }),
    })
    const data: { success?: boolean } = await response.json().catch(() => ({}))
    return response.ok && data.success !== false
  } catch {
    return false
  }
}

