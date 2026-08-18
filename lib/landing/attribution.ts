export type LeadAttribution = {
  utmSource: string
  utmMedium: string
  utmCampaign: string
  utmContent: string
  utmTerm: string
  fbclid: string
  gclid: string
  landingPage: string
  referrer: string
}

const STORAGE_KEY = "bf-tub-shower-attribution-v1"

const EMPTY_ATTRIBUTION: LeadAttribution = {
  utmSource: "",
  utmMedium: "",
  utmCampaign: "",
  utmContent: "",
  utmTerm: "",
  fbclid: "",
  gclid: "",
  landingPage: "",
  referrer: "",
}

function clean(value: string | null, max = 300): string {
  return (value ?? "").trim().slice(0, max)
}

function readStored(): LeadAttribution | null {
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as Partial<LeadAttribution>
    return { ...EMPTY_ATTRIBUTION, ...parsed }
  } catch {
    return null
  }
}

/**
 * Records the first landing touch for this tab. No contact details are stored.
 * The same values travel with guide and quote submissions so Meta traffic can
 * be tied back to the lead that reached GoHighLevel.
 */
export function getLeadAttribution(): LeadAttribution {
  if (typeof window === "undefined") return EMPTY_ATTRIBUTION

  const stored = readStored()
  if (stored) return stored

  const params = new URLSearchParams(window.location.search)
  const attribution: LeadAttribution = {
    utmSource: clean(params.get("utm_source"), 100),
    utmMedium: clean(params.get("utm_medium"), 100),
    utmCampaign: clean(params.get("utm_campaign"), 160),
    utmContent: clean(params.get("utm_content"), 160),
    utmTerm: clean(params.get("utm_term"), 160),
    fbclid: clean(params.get("fbclid"), 300),
    gclid: clean(params.get("gclid"), 300),
    landingPage: clean(window.location.href, 500),
    referrer: clean(document.referrer, 500),
  }

  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(attribution))
  } catch {
    /* Attribution is useful, never required for form completion. */
  }

  return attribution
}

/** The two browser cookies Meta's pixel writes. Both may legitimately be absent. */
export type MetaCookies = { fbp: string; fbc: string }

function readCookie(name: string): string {
  if (typeof document === "undefined") return ""
  const match = document.cookie.match(new RegExp(`(?:^|;\\s*)${name}=([^;]*)`))
  if (!match) return ""
  /*
   * decodeURIComponent throws on malformed input, and a cookie is exactly the
   * kind of input something else may have malformed. This runs inside the
   * submit handler, so an uncaught throw here would fail the submission over
   * a value that is merely nice to have. Fall back to the raw value instead.
   */
  try {
    return decodeURIComponent(match[1]).slice(0, 300)
  } catch {
    return match[1].slice(0, 300)
  }
}

/**
 * Read at SUBMIT time, deliberately not at first touch.
 *
 * `_fbp` is written by the pixel script after it loads and `_fbc` is derived
 * from the fbclid once it does, so both are usually still missing during the
 * first paint when attribution is captured. Caching them with the rest of the
 * first-touch payload would store two empty strings on most sessions.
 *
 * They matter because they are the strongest signals in Meta's Event Match
 * Quality score, which feeds directly into delivery cost. They travel with the
 * lead and are forwarded to the Conversions API rather than being saved to the
 * contact record, since nothing in the CRM ever reads them.
 */
export function getMetaCookies(): MetaCookies {
  return { fbp: readCookie("_fbp"), fbc: readCookie("_fbc") }
}

