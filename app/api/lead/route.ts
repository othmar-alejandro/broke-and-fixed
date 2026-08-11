import { NextResponse } from "next/server"

import {
  formatUSD,
  isBathroomLayout,
  isScopeLevel,
  LAYOUT_LABEL,
  SCOPE_LABEL,
  startingPrice,
  type BathroomLayout,
  type ScopeLevel,
} from "@/lib/landing/quote-pricing"

/**
 * Lead intake for the tub-to-shower quote form.
 *
 * Two rules drive the whole file:
 *
 * 1. A lead is never lost. GoHighLevel is the system of record, but if it is
 *    down, rate limiting us, or misconfigured, the lead goes to Web3Forms and
 *    lands in the shop inbox instead. Only when BOTH fail does the visitor see
 *    an error, and even then the form keeps everything they typed.
 *
 * 2. Nothing about our infrastructure reaches the browser. No API key, no
 *    upstream status code, no upstream error body. The client gets ok plus a
 *    range and nothing else to probe.
 */

// Secrets live in process.env and this module never ships to the browser.
export const runtime = "nodejs"
export const dynamic = "force-dynamic"

/* ------------------------------------------------------------------ */
/* Config                                                              */
/* ------------------------------------------------------------------ */

/**
 * GoHighLevel API v2. The Private Integration Token in GHL_API_KEY is a
 * Bearer token against services.leadconnectorhq.com, and v2 requires the
 * dated Version header on every request.
 */
const GHL_UPSERT_URL = "https://services.leadconnectorhq.com/contacts/upsert"
const GHL_API_VERSION = "2021-07-28"
const LEAD_TAG = "tub-to-shower-lead"

/** Live contact-field IDs in the Broke and Fixed Home Solutions sub-account. */
const GHL_FIELD_IDS = {
  bathroomLayout: "0OceQLClaCgawUQxFsNN",
  projectScope: "dl5Van04xjVAGM2fzCyQ",
  rangeLow: "LqrtUQITjqPz76nG1IH0",
  rangeHigh: "0h875XqcMDjjCOlU9Zun",
  leadSourceDetail: "tm7gX3bR1VmKeRGk7qjK",
  utmSource: "TCCToyUfKwN4Gjd2xXmW",
  utmMedium: "LcosLzBnfuoQrMs3ZTCU",
  utmCampaign: "4Q3jAWCuhTyHCLKR1F4H",
  utmContent: "ltNuNBtrSgCjuGxcp2H3",
  utmTerm: "IhykLc2PvSQHzMY7hIOX",
  fbclid: "v7t2MtrRLZ6AebhbsDNU",
  gclid: "dMfursjjudMU2fVVvYGC",
  landingPage: "AqnZbvFh7ndWzY57WhCU",
  referrer: "MPIR19WcWmHQd62qhfro",
} as const

/**
 * Same Web3Forms access key the rest of the site posts to. It is a public
 * submission key by design, already committed in app/components/Contact.jsx,
 * so it is not a secret being leaked here. The env var lets it be rotated
 * without a deploy.
 */
const WEB3FORMS_URL = "https://api.web3forms.com/submit"
const WEB3FORMS_KEY =
  process.env.WEB3FORMS_ACCESS_KEY ?? "ebb39c28-f927-4916-be94-71a448167ae6"

/** Upstreams get a hard ceiling. A hung CRM must not hold the visitor. */
const UPSTREAM_TIMEOUT_MS = 8000

/* ------------------------------------------------------------------ */
/* Validation                                                          */
/* ------------------------------------------------------------------ */

type Lead = {
  name: string
  phone: string
  zip: string
  email: string
  layout: BathroomLayout
  scope: ScopeLevel
  locale: "en" | "es"
  attribution: LeadAttribution
}

type LeadAttribution = {
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

function asString(value: unknown, max: number): string {
  if (typeof value !== "string") return ""
  return value.trim().slice(0, max)
}

function parseAttribution(value: unknown): LeadAttribution {
  const input = value && typeof value === "object" ? (value as Record<string, unknown>) : {}
  return {
    utmSource: asString(input.utmSource, 100),
    utmMedium: asString(input.utmMedium, 100),
    utmCampaign: asString(input.utmCampaign, 160),
    utmContent: asString(input.utmContent, 160),
    utmTerm: asString(input.utmTerm, 160),
    fbclid: asString(input.fbclid, 300),
    gclid: asString(input.gclid, 300),
    landingPage: asString(input.landingPage, 500),
    referrer: asString(input.referrer, 500),
  }
}

function leadSource(kind: "quote" | "guide", attribution: LeadAttribution): string {
  const parts = [
    kind === "quote" ? "Tub to shower quote" : "Tub to shower planning guide",
    attribution.utmSource,
    attribution.utmCampaign,
    attribution.utmContent,
  ].filter(Boolean)
  return parts.join(" | ").slice(0, 500)
}

function adPlatformTags(attribution: LeadAttribution): string[] {
  const source = attribution.utmSource.toLowerCase()
  if (
    attribution.fbclid ||
    source.includes("facebook") ||
    source.includes("instagram") ||
    source.includes("meta")
  ) {
    return ["facebook ads lead"]
  }
  return []
}

function attributionLines(attribution: LeadAttribution): string {
  return [
    `UTM source: ${attribution.utmSource || "not provided"}`,
    `UTM medium: ${attribution.utmMedium || "not provided"}`,
    `UTM campaign: ${attribution.utmCampaign || "not provided"}`,
    `UTM content: ${attribution.utmContent || "not provided"}`,
    `UTM term: ${attribution.utmTerm || "not provided"}`,
    `fbclid: ${attribution.fbclid || "not provided"}`,
    `gclid: ${attribution.gclid || "not provided"}`,
    `Landing page: ${attribution.landingPage || "not provided"}`,
    `Referrer: ${attribution.referrer || "not provided"}`,
  ].join("\n")
}

/** Digits only, so (786) 363-7039 and 786.363.7039 are the same lead. */
function normalizePhone(raw: string): string | null {
  const digits = raw.replace(/\D/g, "")
  if (digits.length === 10) return digits
  // Leading country code, which plenty of people type out of habit.
  if (digits.length === 11 && digits.startsWith("1")) return digits.slice(1)
  return null
}

function splitName(full: string): { firstName: string; lastName: string } {
  const parts = full.split(/\s+/).filter(Boolean)
  if (parts.length < 2) return { firstName: full, lastName: "" }
  return {
    firstName: parts[0],
    lastName: parts.slice(1).join(" "),
  }
}

/* ------------------------------------------------------------------ */
/* GoHighLevel                                                         */
/* ------------------------------------------------------------------ */

/**
 * `startingAt` is null when the layout has to be measured before any number is
 * honest. The rangeLow field now carries the published STARTING price, and
 * rangeHigh is intentionally blank: the form stopped showing a computed band
 * on 11 Aug 2026. Rename those two fields in the GHL interface when convenient
 * (the API is read only for field definitions), the IDs are what matter here.
 */
function buildCustomFields(lead: Lead, startingAt: number | null) {
  return [
    { id: GHL_FIELD_IDS.bathroomLayout, field_value: lead.layout },
    { id: GHL_FIELD_IDS.projectScope, field_value: lead.scope },
    {
      id: GHL_FIELD_IDS.rangeLow,
      field_value: startingAt === null ? "" : String(startingAt),
    },
    { id: GHL_FIELD_IDS.rangeHigh, field_value: "" },
    { id: GHL_FIELD_IDS.leadSourceDetail, field_value: leadSource("quote", lead.attribution) },
    { id: GHL_FIELD_IDS.utmSource, field_value: lead.attribution.utmSource },
    { id: GHL_FIELD_IDS.utmMedium, field_value: lead.attribution.utmMedium },
    { id: GHL_FIELD_IDS.utmCampaign, field_value: lead.attribution.utmCampaign },
    { id: GHL_FIELD_IDS.utmContent, field_value: lead.attribution.utmContent },
    { id: GHL_FIELD_IDS.utmTerm, field_value: lead.attribution.utmTerm },
    { id: GHL_FIELD_IDS.fbclid, field_value: lead.attribution.fbclid },
    { id: GHL_FIELD_IDS.gclid, field_value: lead.attribution.gclid },
    { id: GHL_FIELD_IDS.landingPage, field_value: lead.attribution.landingPage },
    { id: GHL_FIELD_IDS.referrer, field_value: lead.attribution.referrer },
  ]
}

/**
 * Upsert, not create. The same homeowner will come back through a retargeting
 * ad and fill this in a second time, and two records for one person means two
 * people calling them. Upsert matches on phone and email inside the location
 * and updates in place.
 *
 * The endpoint, field IDs and location ID were verified against the connected
 * Broke and Fixed Home Solutions sub-account on 10 Aug 2026.
 */
async function upsertToGoHighLevel(
  lead: Lead,
  startingAt: number | null,
  signal: AbortSignal,
): Promise<void> {
  const token = process.env.GHL_API_KEY
  const locationId = process.env.GHL_LOCATION_ID

  if (!token) throw new Error("GHL_API_KEY is not set")
  if (!locationId) throw new Error("GHL_LOCATION_ID is not set")

  const { firstName, lastName } = splitName(lead.name)

  const response = await fetch(GHL_UPSERT_URL, {
    method: "POST",
    signal,
    headers: {
      Authorization: `Bearer ${token}`,
      Version: GHL_API_VERSION,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      locationId,
      firstName,
      lastName,
      name: lead.name,
      // GHL wants E.164. We stored 10 digits, all of them US.
      phone: `+1${lead.phone}`,
      ...(lead.email ? { email: lead.email } : {}),
      postalCode: lead.zip,
      country: "US",
      source: leadSource("quote", lead.attribution),
      tags: [LEAD_TAG, "estimate-request", `lang-${lead.locale}`, ...adPlatformTags(lead.attribution)],
      customFields: buildCustomFields(lead, startingAt),
    }),
  })

  if (!response.ok) {
    // Read the body for OUR log only. It never travels back to the client.
    const detail = await response.text().catch(() => "")
    throw new Error(`GHL responded ${response.status}: ${detail.slice(0, 300)}`)
  }
}

/* ------------------------------------------------------------------ */
/* Exit intent: price guide request                                     */
/* ------------------------------------------------------------------ */

/**
 * One email address, no bathroom questions. Tries GoHighLevel first with a
 * distinct tag so these never pollute the quote-form lead list, then falls
 * back to Web3Forms. Returns false only if both paths fail, so the visitor
 * gets told to call rather than being thanked for nothing.
 */
async function captureGuideRequest({
  email,
  locale,
  source,
  attribution,
}: {
  email: string
  locale: "en" | "es"
  source: "exit-intent" | "guide-inline"
  attribution: LeadAttribution
}): Promise<boolean> {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), UPSTREAM_TIMEOUT_MS)

  try {
    const token = process.env.GHL_API_KEY
    const locationId = process.env.GHL_LOCATION_ID

    if (token && locationId) {
      const response = await fetch(GHL_UPSERT_URL, {
        method: "POST",
        signal: controller.signal,
        headers: {
          Authorization: `Bearer ${token}`,
          Version: GHL_API_VERSION,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          locationId,
          email,
          country: "US",
          source: leadSource("guide", attribution),
          tags: [
            LEAD_TAG,
            "planning-guide-lead",
            `guide-${source}`,
            `lang-${locale}`,
            ...adPlatformTags(attribution),
          ],
          customFields: [
            {
              id: GHL_FIELD_IDS.leadSourceDetail,
              field_value: leadSource("guide", attribution),
            },
            { id: GHL_FIELD_IDS.utmSource, field_value: attribution.utmSource },
            { id: GHL_FIELD_IDS.utmMedium, field_value: attribution.utmMedium },
            { id: GHL_FIELD_IDS.utmCampaign, field_value: attribution.utmCampaign },
            { id: GHL_FIELD_IDS.utmContent, field_value: attribution.utmContent },
            { id: GHL_FIELD_IDS.utmTerm, field_value: attribution.utmTerm },
            { id: GHL_FIELD_IDS.fbclid, field_value: attribution.fbclid },
            { id: GHL_FIELD_IDS.gclid, field_value: attribution.gclid },
            { id: GHL_FIELD_IDS.landingPage, field_value: attribution.landingPage },
            { id: GHL_FIELD_IDS.referrer, field_value: attribution.referrer },
          ],
        }),
      })

      if (response.ok) {
        console.info("[lead] path=ghl kind=guide outcome=ok")
        return true
      }

      const detail = await response.text().catch(() => "")
      console.warn(
        `[lead] path=ghl kind=guide outcome=fail status=${response.status} ${detail.slice(0, 200)}`,
      )
    }

    const fallback = await fetch(WEB3FORMS_URL, {
      method: "POST",
      signal: controller.signal,
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: WEB3FORMS_KEY,
        subject: "Tub to shower: planning guide request",
        from_name: "Broke and Fixed landing page",
        email,
        message: [
          "Planning guide requested from the tub to shower landing page.",
          `Email: ${email}`,
          `Language: ${locale}`,
          `Capture source: ${source}`,
          attributionLines(attribution),
        ].join("\n"),
      }),
    })

    console.info(
      `[lead] path=web3forms kind=guide outcome=${fallback.ok ? "ok" : "fail"}`,
    )
    return fallback.ok
  } catch (error) {
    console.error("[lead] kind=guide outcome=error", error)
    return false
  } finally {
    clearTimeout(timeout)
  }
}

/* ------------------------------------------------------------------ */
/* Web3Forms fallback                                                  */
/* ------------------------------------------------------------------ */

/**
 * Last line of defence. Plain email to the shop inbox. It has no CRM fields,
 * so everything goes in the message body where a human will read it.
 */
async function sendToWeb3Forms(
  lead: Lead,
  startingAt: number | null,
  signal: AbortSignal,
): Promise<void> {
  const response = await fetch(WEB3FORMS_URL, {
    method: "POST",
    signal,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      /*
       * KNOWN ISSUE, NOT RESOLVED. Web3Forms sits behind Cloudflare, and a
       * server-side POST from the dev machine gets the "Just a moment"
       * interstitial back as a 403. Adding this User-Agent did NOT fix it, so
       * do not read its presence as the problem being solved. It stays
       * because identifying the client is correct behaviour either way.
       *
       * Cloudflare scores by IP reputation as much as by headers, so this may
       * well pass from Vercel and fail locally. It has to be exercised from a
       * deployed preview before launch. If it still 403s there, this fallback
       * is decorative and the lead only survives in the recovery log below.
       */
      "User-Agent": "BrokeAndFixed-LeadForm/1.0 (+https://brokeandfixed.com)",
    },
    body: JSON.stringify({
      access_key: WEB3FORMS_KEY,
      subject: `Tub to shower lead: ${lead.name}, ${lead.zip}`,
      from_name: "Tub to shower landing page",
      name: lead.name,
      phone: lead.phone,
      email: lead.email || "not given",
      zip: lead.zip,
      bathroom_layout: `${lead.layout} (${LAYOUT_LABEL[lead.layout]})`,
      scope_level: `${lead.scope} (${SCOPE_LABEL[lead.scope]})`,
      starting_price:
        startingAt === null
          ? "measure required, larger master bathroom"
          : formatUSD(startingAt),
      language: lead.locale,
      lead_source: leadSource("quote", lead.attribution),
      attribution: attributionLines(lead.attribution),
      note: "CRM write failed, this lead is NOT in GoHighLevel yet. Add it by hand.",
    }),
  })

  if (!response.ok) {
    const detail = await response.text().catch(() => "")
    throw new Error(`Web3Forms responded ${response.status}: ${detail.slice(0, 300)}`)
  }
}

/* ------------------------------------------------------------------ */
/* Handler                                                             */
/* ------------------------------------------------------------------ */

export async function POST(request: Request) {
  let body: unknown

  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ ok: false, error: "Bad request" }, { status: 400 })
  }

  const input = (body ?? {}) as Record<string, unknown>

  /*
   * Honeypot. A real person never sees this field, so anything in it is a bot.
   * Return 200 with a plausible body: a 400 here teaches the operator exactly
   * which field to leave blank next time, and they do read the responses.
   */
  const honeypot = asString(input.company, 200)
  if (honeypot.length > 0) {
    console.info("[lead] path=honeypot outcome=discarded")
    return NextResponse.json({ ok: true, startingAt: null })
  }

  /*
   * Exit intent is a different shape of lead: one email field, no bathroom
   * questions asked. It must branch before the quote-form validation, which
   * requires layout, scope, name, phone and ZIP and would 400 every one of
   * these. A visitor six weeks from buying is still worth capturing.
   */
  const source = asString(input.source, 40)
  if (source === "exit-intent" || source === "guide-inline") {
    const guideEmail = asString(input.email, 200)
    const locale = asString(input.locale, 2) === "es" ? "es" : "en"
    const attribution = parseAttribution(input.attribution)

    if (!guideEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(guideEmail)) {
      return NextResponse.json(
        { ok: false, error: "Please check the email address." },
        { status: 400 },
      )
    }

    const captured = await captureGuideRequest({
      email: guideEmail,
      locale,
      source,
      attribution,
    })
    return NextResponse.json(
      {
        ok: captured,
        startingAt: null,
        ...(captured ? {} : { error: "We could not save that email just now." }),
      },
      { status: captured ? 200 : 502 },
    )
  }

  const layout = input.layout
  const scope = input.scope

  if (!isBathroomLayout(layout) || !isScopeLevel(scope)) {
    return NextResponse.json(
      { ok: false, error: "Please pick your bathroom and what you want done." },
      { status: 400 },
    )
  }

  const name = asString(input.name, 120)
  const rawPhone = asString(input.phone, 40)
  const zip = asString(input.zip, 10)
  const email = asString(input.email, 200)
  const locale = asString(input.locale, 2) === "es" ? "es" : "en"
  const attribution = parseAttribution(input.attribution)

  const phone = normalizePhone(rawPhone)

  if (name.length < 2 || !phone || !/^\d{5}$/.test(zip)) {
    return NextResponse.json(
      { ok: false, error: "Please check your name, phone and ZIP code." },
      { status: 400 },
    )
  }

  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return NextResponse.json(
      { ok: false, error: "That email address does not look right." },
      { status: 400 },
    )
  }

  const lead: Lead = { name, phone, zip, email, layout, scope, locale, attribution }

  /*
   * The server recomputes the figure from the same pure function the form used.
   * Whatever number the client sent is ignored. Otherwise anyone can POST their
   * own number and it goes straight into the CRM as if we quoted it.
   */
  const startingAt = startingPrice(layout, scope)

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), UPSTREAM_TIMEOUT_MS)

  try {
    try {
      await upsertToGoHighLevel(lead, startingAt, controller.signal)
      console.info(`[lead] path=ghl outcome=ok zip=${zip} scope=${scope} layout=${layout}`)
      return NextResponse.json({ ok: true, startingAt })
    } catch (ghlError) {
      console.warn(
        "[lead] path=ghl outcome=failed, falling back to web3forms:",
        ghlError instanceof Error ? ghlError.message : ghlError,
      )

      await sendToWeb3Forms(lead, startingAt, controller.signal)
      console.info(
        `[lead] path=web3forms outcome=ok zip=${zip} scope=${scope} layout=${layout}`,
      )
      return NextResponse.json({ ok: true, startingAt })
    }
  } catch (fallbackError) {
    /*
     * Both upstreams are gone, so this log line IS the lead. It is written as
     * one greppable marker plus one JSON object on a single line, so it can be
     * pulled straight out of the Vercel drain:
     *
     *   vercel logs --since 1d | grep LEAD_RECOVERY
     *
     * Set up an alert on that string. A line nobody reads is not a backup.
     */
    console.error(
      "[lead] LEAD_RECOVERY path=none outcome=LOST reason=" +
        (fallbackError instanceof Error ? fallbackError.message : String(fallbackError)),
      JSON.stringify({ ...lead, startingAt }),
    )

    return NextResponse.json(
      {
        ok: false,
        error:
          "We could not send that just now. Please call or text (786) 363-7039 and we will take it down.",
      },
      { status: 502 },
    )
  } finally {
    clearTimeout(timeout)
  }
}
