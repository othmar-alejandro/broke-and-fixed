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

