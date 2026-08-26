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
 * 1. A lead is never lost. GoHighLevel is the system of record. If it is down,
 *    rate limiting us, or misconfigured, the lead is written to the recovery
 *    log as a single greppable line and the visitor is told to call. The form
 *    keeps everything they typed either way.
 *
 *    Web3Forms was removed from this funnel on 14 Aug 2026. It stays in use
 *    elsewhere on the site. Two consequences worth knowing: this route is now
 *    single-upstream, and LEAD_RECOVERY is the only net under it, so the log
 *    alert described at the bottom of this file is not optional.
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
  // Created 14 Aug 2026 for the Meta campaign. See scripts/ghl-create-custom-fields.mjs.
  startingPriceDisplay: "RyqEbWCpP1hGe2ppxMlR",
  metaEventId: "pq5ueS5n9ngk5PbmLDB8",
} as const

/**
 * GoHighLevel inbound webhook. This is what TRIGGERS the follow-up workflows.
 *
 * It fires AFTER the contact upsert has succeeded, so the contact and every
 * custom field already exist by the time a workflow looks for them. That
 * ordering is the whole point: the webhook carries an identifier, not the data,
 * so a field-mapping mistake in GoHighLevel can never cost us a lead.
 *
 * Unset is a valid state. Until the webhook exists in the sub-account the lead
 * still lands in the CRM, it just does not start a sequence.
 */
const GHL_INBOUND_WEBHOOK_URL = process.env.GHL_INBOUND_WEBHOOK_URL ?? ""

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
  /**
   * Deduplication key shared with the browser pixel. The same value goes to
   * Meta twice, once from the browser and once server-side from GoHighLevel,
   * and Meta collapses the pair into one conversion. Without it every lead is
   * counted twice and the reported CPL is half the real one.
   */
  eventId: string
  /**
   * Meta's browser cookies, read at submit time. Forwarded to the Conversions
   * API and deliberately NOT written to the contact record: they are delivery
   * signal with a short life, not customer data, and nothing in the CRM reads
   * them.
   */
  metaCookies: { fbp: string; fbc: string }
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
    // Kebab-case, like every other tag. The old value had spaces, which meant
    // any workflow condition typed as facebook-ads-lead silently never matched.
    return ["facebook-ads-lead"]
  }
  return []
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
 * The price sentence, already localized and already formatted, ready to drop
 * into an SMS or an email with no string surgery on the GoHighLevel side.
 *
 * This field exists because the numeric range fields render raw. A merge tag
 * for planning_range_low prints `6500`, so copy written as `${{...}}` reads
 * "$6500", and for a master bathroom, where there is deliberately no number at
 * all, it reads "$". Both look careless to a homeowner deciding whether to let
 * us into their house.
 *
 * Returning a whole clause rather than a number is what lets the Spanish
 * workflow set stay a straight mirror of the English one.
 */
function startingPriceDisplay(startingAt: number | null, locale: "en" | "es"): string {
  if (startingAt === null) {
    return locale === "es"
      ? "recibe su precio cuando midamos el baño"
      : "gets its number once we measure the bathroom"
  }
  return locale === "es"
    ? `empieza en ${formatUSD(startingAt)}`
    : `starts at ${formatUSD(startingAt)}`
}

/**
 * `startingAt` is null when the layout has to be measured before any number is
 * honest. The rangeLow field now carries the published STARTING price, and
 * rangeHigh is intentionally blank: the form stopped showing a computed band
 * on 11 Aug 2026. Rename those two fields in the GHL interface when convenient
 * (the API is read only for field definitions), the IDs are what matter here.
 *
 * Layout and scope are written as HUMAN LABELS, not slugs. An owner alert that
 * reads "Tub sits wall to wall / Shower and floor" needs no decoding at 7pm on
 * a Saturday; `wall-to-wall / shower-floor` does.
 */
function buildCustomFields(lead: Lead, startingAt: number | null) {
  return [
    { id: GHL_FIELD_IDS.bathroomLayout, field_value: LAYOUT_LABEL[lead.layout] },
    { id: GHL_FIELD_IDS.projectScope, field_value: SCOPE_LABEL[lead.scope] },
    {
      id: GHL_FIELD_IDS.rangeLow,
      field_value: startingAt === null ? "" : String(startingAt),
    },
    { id: GHL_FIELD_IDS.rangeHigh, field_value: "" },
    {
      id: GHL_FIELD_IDS.startingPriceDisplay,
      field_value: startingPriceDisplay(startingAt, lead.locale),
    },
    { id: GHL_FIELD_IDS.metaEventId, field_value: lead.eventId },
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
      tags: [
        LEAD_TAG,
        "estimate-request",
        // Language-combined variant. GHL's Contact Tag trigger can filter on
        // "tag added" but not on "contact has tag", so a workflow cannot
        // trigger on estimate-request AND filter by lang-*. One tag that
        // carries both facts lets each language's workflow trigger cleanly.
        `estimate-request-${lead.locale}`,
        `lang-${lead.locale}`,
        ...adPlatformTags(lead.attribution),
      ],
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
 * One email address, no bathroom questions. Goes to GoHighLevel with a distinct
 * tag so these never pollute the quote-form lead list. Returns false when that
 * write fails, so the visitor gets told to call rather than being thanked for
 * nothing.
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
            // Deliberately NOT LEAD_TAG. A guide opt-in is an email address and
            // nothing else: no name, no phone, no ZIP, no price. Tagging it the
            // same as a completed estimator meant every estimator workflow
            // enrolled people it had nothing to say to. The estimator path is
            // keyed on `estimate-request` instead.
            "planning-guide-lead",
            // Same reason as estimate-request-<locale>: tag triggers cannot
            // filter on an existing lang-* tag, so the language rides along.
            `planning-guide-lead-${locale}`,
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

    /*
     * No second upstream. Web3Forms was removed from this funnel on 14 Aug 2026
     * when GoHighLevel became the single system of record for it. This line is
     * the recovery path for a guide opt-in, same pattern as LEAD_RECOVERY below.
     */
    console.error(
      "[lead] GUIDE_RECOVERY path=none outcome=LOST",
      JSON.stringify({ email, locale, source, attribution }),
    )
    return false
  } catch (error) {
    console.error("[lead] kind=guide outcome=error", error)
    return false
  } finally {
    clearTimeout(timeout)
  }
}

/* ------------------------------------------------------------------ */
/* GoHighLevel inbound webhook                                          */
/* ------------------------------------------------------------------ */

/**
 * Starts the follow-up sequence. Called only after the upsert succeeded.
 *
 * This NEVER throws and never fails the request. By the time it runs the lead
 * is already safe in the CRM, so the worst case is a contact that exists but
 * did not get an automated text, which a human can pick up from the pipeline.
 * Failing the visitor's submission over it would trade a real lead for a
 * cosmetic one.
 */
async function fireInboundWebhook(
  lead: Lead,
  startingAt: number | null,
): Promise<void> {
  if (!GHL_INBOUND_WEBHOOK_URL) {
    console.info("[lead] path=webhook outcome=skipped reason=not-configured")
    return
  }

  /*
   * Its own clock, deliberately not the upsert's. Sharing one AbortController
   * meant an upsert that used 7.9 of the 8 seconds left this call 100ms to
   * complete, so the slower GoHighLevel was, the more likely the follow-up
   * sequence silently never started, on exactly the leads already waiting
   * longest.
   */
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), UPSTREAM_TIMEOUT_MS)

  try {
    const response = await fetch(GHL_INBOUND_WEBHOOK_URL, {
      method: "POST",
      signal: controller.signal,
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        event: "tub_to_shower_estimate",
        // Identity, so the workflow can find the contact the upsert just wrote.
        phone: `+1${lead.phone}`,
        email: lead.email || "",
        name: lead.name,
        postal_code: lead.zip,
        locale: lead.locale,
        // Everything below is already on the contact record. It rides along so
        // a workflow can branch without a lookup, not so it can be re-saved.
        bathroom_layout: LAYOUT_LABEL[lead.layout],
        project_scope: SCOPE_LABEL[lead.scope],
        starting_price_display: startingPriceDisplay(startingAt, lead.locale),
        meta_event_id: lead.eventId,
        // Event Match Quality inputs. Absent on plenty of sessions, which is
        // normal: the pixel may be blocked, or the visit may not have come
        // from an ad at all.
        fbp: lead.metaCookies.fbp,
        fbc: lead.metaCookies.fbc,
        utm_source: lead.attribution.utmSource,
        utm_campaign: lead.attribution.utmCampaign,
        utm_content: lead.attribution.utmContent,
        fbclid: lead.attribution.fbclid,
      }),
    })

    console.info(
      `[lead] path=webhook outcome=${response.ok ? "ok" : "fail"} status=${response.status}`,
    )
  } catch (error) {
    console.warn(
      "[lead] path=webhook outcome=error",
      error instanceof Error ? error.message : error,
    )
  } finally {
    clearTimeout(timeout)
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
  /*
   * First five digits, whatever punctuation came with them. The form already
   * normalizes, so this is defence in depth for anything that posts here
   * directly. A ZIP+4 like 33186-1234 is what a mail label shows, and rejecting
   * it used to return "check your name, phone and ZIP" without saying which.
   */
  const zip = asString(input.zip, 10).replace(/\D/g, "").slice(0, 5)
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

  // Generated in the browser alongside the pixel event so both sides of the
  // Meta conversion carry the same key. Server-generated would defeat the point.
  const eventId = asString(input.eventId, 64)

  const cookieInput =
    input.metaCookies && typeof input.metaCookies === "object"
      ? (input.metaCookies as Record<string, unknown>)
      : {}
  const metaCookies = {
    fbp: asString(cookieInput.fbp, 300),
    fbc: asString(cookieInput.fbc, 300),
  }

  const lead: Lead = {
    name,
    phone,
    zip,
    email,
    layout,
    scope,
    locale,
    attribution,
    eventId,
    metaCookies,
  }

  /*
   * The server recomputes the figure from the same pure function the form used.
   * Whatever number the client sent is ignored. Otherwise anyone can POST their
   * own number and it goes straight into the CRM as if we quoted it.
   */
  const startingAt = startingPrice(layout, scope)

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), UPSTREAM_TIMEOUT_MS)

  try {
    await upsertToGoHighLevel(lead, startingAt, controller.signal)
    console.info(`[lead] path=ghl outcome=ok zip=${zip} scope=${scope} layout=${layout}`)

    // Contact is saved. Starting the sequence is best effort from here.
    await fireInboundWebhook(lead, startingAt)

    return NextResponse.json({ ok: true, startingAt })
  } catch (fallbackError) {
    /*
     * The CRM write failed and there is no second upstream, so this log line
     * IS the lead. It is written as
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
