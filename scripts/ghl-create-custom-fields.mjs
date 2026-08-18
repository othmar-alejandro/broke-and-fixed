/**
 * Creates the two custom fields the tub-to-shower funnel needs and does not have.
 *
 *   starting_price_display  TEXT  already-localized price sentence for SMS/email copy
 *   meta_event_id           TEXT  browser-generated dedup key for Conversions API
 *
 * Both are additive. Nothing existing is modified or deleted.
 *
 * Run with --dry-run first. It prints exactly what it would send and exits.
 *
 *   node scripts/ghl-create-custom-fields.mjs --dry-run
 *   node scripts/ghl-create-custom-fields.mjs
 *
 * Reads GHL_API_KEY and GHL_LOCATION_ID from .env.local. Never logs the token.
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
    const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)$/)
    if (!match) continue
    env[match[1]] = match[2].trim().replace(/^["']|["']$/g, "")
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

/** The fields to create. `name` is what shows in the GHL interface. */
const WANTED = [
  {
    name: "Starting Price Display",
    dataType: "TEXT",
    // Expected fieldKey: contact.starting_price_display
    placeholder: "starts at $6,500",
  },
  {
    name: "Meta Event ID",
    dataType: "TEXT",
    placeholder: "uuid v4",
  },
]

async function listExisting() {
  const res = await fetch(`${API}/locations/${locationId}/customFields`, { headers })
  if (!res.ok) {
    throw new Error(`list failed ${res.status}: ${(await res.text()).slice(0, 300)}`)
  }
  const body = await res.json()
  return body.customFields ?? []
}

async function createField(field) {
  const res = await fetch(`${API}/locations/${locationId}/customFields`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      name: field.name,
      dataType: field.dataType,
      placeholder: field.placeholder,
      model: "contact",
    }),
  })
  if (!res.ok) {
    throw new Error(`create "${field.name}" failed ${res.status}: ${(await res.text()).slice(0, 300)}`)
  }
  return res.json()
}

const existing = await listExisting()
const existingNames = new Set(existing.map((f) => f.name.toLowerCase()))

console.log(`Location ${locationId} currently has ${existing.length} custom fields.\n`)

for (const field of WANTED) {
  if (existingNames.has(field.name.toLowerCase())) {
    const hit = existing.find((f) => f.name.toLowerCase() === field.name.toLowerCase())
    console.log(`SKIP   ${field.name} already exists`)
    console.log(`       id=${hit.id} fieldKey=${hit.fieldKey}\n`)
    continue
  }

  if (DRY_RUN) {
    console.log(`WOULD CREATE  ${field.name} (${field.dataType}) on model=contact\n`)
    continue
  }

  const created = await createField(field)
  const f = created.customField ?? created
  console.log(`CREATED  ${field.name}`)
  console.log(`         id=${f.id} fieldKey=${f.fieldKey}\n`)
}

if (DRY_RUN) console.log("Dry run. Nothing was written.")
