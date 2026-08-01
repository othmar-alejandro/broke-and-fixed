declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    clarity?: (...args: unknown[]) => void
    fbq?: (...args: unknown[]) => void
    dataLayer?: unknown[]
  }
}

type GtagEventParams = Record<string, string | number | boolean | undefined>

export function event(name: string, params: GtagEventParams = {}): void {
  if (typeof window === "undefined") return
  if (typeof window.gtag === "function") {
    window.gtag("event", name, params)
  }
  if (typeof window.clarity === "function") {
    window.clarity("event", name)
  }
}

export function trackPhoneClick(phoneNumber: string, source: string = "unknown"): void {
  event("phone_call_click", {
    event_category: "conversion",
    event_label: source,
    phone_number: phoneNumber,
  })
}

export function trackFormSubmit(formName: string, service?: string): void {
  event("form_submit", {
    event_category: "conversion",
    event_label: formName,
    service: service,
  })
}

export function trackCtaClick(label: string): void {
  event("cta_click", {
    event_category: "engagement",
    event_label: label,
  })
}

export function trackQuoteStart(source: string): void {
  event("quote_request_start", {
    event_category: "conversion",
    event_label: source,
  })
}
