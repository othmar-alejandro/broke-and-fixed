/**
 * Fills the sub-account custom values the inherited snapshot workflows read.
 *
 * WHY THIS EXISTS. Every workflow in the snapshot was written generically
 * against {{custom_values.*}} so it would port to any client. All 17 arrived
 * empty, which is invisible until a real person receives the output:
 *
 *   1.1 New Lead (Day 1), to the homeowner:
 *     "Hi Maria, this is  with  , got your request!"
 *
 *   2.1 New Lead Alert, to the owner:
 *     to: ""   from: ""      (the alert has no recipient at all)
 *
 * Only values listed in VALUES below are touched. Anything already set to the
 * same string is skipped and reported, so re-running is safe.
 *
 * facebook_token is deliberately absent. An access token never goes in a file
 * or on a command line. Paste it into the GoHighLevel interface by hand.
 *
 *   node scripts/ghl-set-custom-values.mjs --dry-run
 *   node scripts/ghl-set-custom-values.mjs
 */

import { readFileSync } from "node:fs"
import { resolve } from "node:path"

const API = "https://services.leadconnectorhq.com"
const VERSION = "2021-07-28"
const DRY_RUN = process.argv.includes("--dry-run")

function loadEnv() {
  const raw = readFileSync(resolve(process.cwd(), ".env.local"), "utf8")
  const env = {}
  for (const line of raw.split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)$/)
    if (m) env[m[1]] = m[2].trim().replace(/^["']|["']$/g, "")
  }
  return env
}

const env = loadEnv()
const token = env.GHL_API_KEY
const locationId = env.GHL_LOCATION_ID
if (!token) throw new Error("GHL_API_KEY missing from .env.local")
if (!locationId) throw new Error("GHL_LOCATION_ID missing from .env.local")

const headers = {
  Authorization: `Bearer ${token}`,
  Version: VERSION,
  "Content-Type": "application/json",
  Accept: "application/json",
}

const CALENDAR_ID = "DuVLTGAO5jA40cpUMzzD" // "Free On-Site Estimate", round robin

/*
 * UNVERIFIED, and it cannot be verified yet. Checked 14 Aug 2026: this URL
 * returns 404, but so would any correct URL, because the calendar is
 * isActive=false with teamMembers=[] and availabilities=[]. A round robin
 * calendar with nobody assigned has no availability even once enabled.
 *
 * Do not trust this string until someone has:
 *   1. assigned at least one team member to the calendar,
 *   2. set it active,
 *   3. opened the link and seen real bookable slots.
 *
 * Then copy the working link out of the GoHighLevel interface and put it here.
 * A booking link that 404s fails silently: the email reads perfectly right up
 * until the click, which is the worst way for this to break.
 */
const BOOKING_URL = `https://api.leadconnectorhq.com/widget/booking/${CALENDAR_ID}`

/** Keyed by the fieldKey suffix, which is stable. Names differ from keys. */
const VALUES = {
  company_name: "Broke & Fixed Home Solutions",
  company_owner: "Omar",
  company_phone: "(786) 363-7039",
  company_email: "brokeandfixed305@gmail.com",
  company_website: "https://brokeandfixed.com",
  company_calendar: BOOKING_URL,
  c__reschedule_calendar: BOOKING_URL,
  confirmation_url: "https://brokeandfixed.com/en/landing/tub-to-shower/thank-you",
  // Where new-lead alerts land. Same inbox as company_email today; split them
  // the day someone other than the owners is answering the phone.
  notifications_email_for_client: "brokeandfixed305@gmail.com",
  universal__client_cell_phone_notifications: "+17863637039",
  c__google_review_link:
    "https://search.google.com/local/writereview?placeid=ChIJ7VSW8vHbAgMRvNWjsiV5kII",
  instagram_page_url: "https://www.instagram.com/brokeandfixed/",
  facebook_pixel: "1564050852174212",
  color1: "#F07A1A",
  your_agency_name: "OAC Digital Innovations",
  your_agency_email_for_notifications_to_you: "oacdigitalinnovations@gmail.com",
}

/** Set by hand in the interface. Listed so the omission is obvious, not lost. */
const HAND_ENTRY_ONLY = ["facebook_token"]

const res = await fetch(`${API}/locations/${locationId}/customValues`, { headers })
if (!res.ok) {
  throw new Error(`list failed ${res.status}: ${(await res.text()).slice(0, 300)}`)
}
const existing = (await res.json()).customValues ?? []

/** "{{ custom_values.company_name }}" -> "company_name" */
function keyOf(cv) {
  const m = String(cv.fieldKey ?? "").match(/custom_values\.([a-z0-9_]+)/i)
  return m ? m[1] : ""
}

const byKey = new Map(existing.map((cv) => [keyOf(cv), cv]))

console.log(`Location ${locationId}, ${existing.length} custom values found.\n`)

let planned = 0
let skipped = 0
const missing = []

for (const [key, value] of Object.entries(VALUES)) {
  const cv = byKey.get(key)
  if (!cv) {
    missing.push(key)
    continue
  }
  if ((cv.value ?? "") === value) {
    console.log(`SKIP    ${cv.name}  (already correct)`)
    skipped += 1
    continue
  }

  const was = cv.value ? JSON.stringify(cv.value) : "(empty)"
  console.log(`${DRY_RUN ? "WOULD SET" : "SET     "}  ${cv.name}`)
  console.log(`          was ${was}`)
  console.log(`          now ${JSON.stringify(value)}`)
  planned += 1

  if (!DRY_RUN) {
    const put = await fetch(`${API}/locations/${locationId}/customValues/${cv.id}`, {
      method: "PUT",
      headers,
      body: JSON.stringify({ name: cv.name, value }),
    })
    if (!put.ok) {
      console.log(`          FAILED ${put.status}: ${(await put.text()).slice(0, 200)}`)
    }
  }
}

console.log()
if (missing.length) console.log(`No such custom value, skipped: ${missing.join(", ")}`)
console.log(`Hand entry only, never scripted: ${HAND_ENTRY_ONLY.join(", ")}`)
console.log(`\n${planned} to write, ${skipped} already correct.`)
if (DRY_RUN) console.log("Dry run. Nothing was written.")
