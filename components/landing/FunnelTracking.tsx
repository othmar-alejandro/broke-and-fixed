"use client"

import { useEffect } from "react"

import { getLeadAttribution } from "@/lib/landing/attribution"

function track(event: string, destination: string) {
  const params = { content_name: "tub-to-shower", destination }
  try {
    window.fbq?.("trackCustom", event, params)
  } catch {
    /* Analytics is optional. */
  }
  try {
    window.gtag?.("event", event, { event_category: "conversion", ...params })
  } catch {
    /* Analytics is optional. */
  }
}

/** Captures first-touch ad attribution and anonymous CTA intent, never typed PII. */
export default function FunnelTracking() {
  useEffect(() => {
    getLeadAttribution()

    const onClick = (event: MouseEvent) => {
      const target = event.target
      if (!(target instanceof Element)) return
      const link = target.closest<HTMLAnchorElement>("a[href]")
      if (!link) return

      const href = link.getAttribute("href") ?? ""
      if (href === "#quote") track("estimate_cta_click", "quote-form")
      if (href.startsWith("tel:")) track("phone_click", "phone")
      if (href.includes("/guides/")) track("planning_guide_download", "pdf")
    }

    document.addEventListener("click", onClick)
    return () => document.removeEventListener("click", onClick)
  }, [])

  return null
}

