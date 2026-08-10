/**
 * Reads the live Google Business Profile and prints what Google actually has,
 * as opposed to what the owner dashboard shows you.
 *
 * The `hasPendingEdits` flag is the one that answers the "it says Remodeler but
 * sometimes says general contractor" question: true means your category change
 * is still in review and the public listing is still serving the old value.
 *
 * Read-only. Nothing here writes to the profile.
 *
 * Usage:
 *   node scripts/gbp-read.mjs
 */

import { loadEnv, getAccessToken, apiGet } from "./lib/gbp.mjs"

const ACCOUNTS = "https://mybusinessaccountmanagement.googleapis.com/v1/accounts"
const INFO = "https://mybusinessbusinessinformation.googleapis.com/v1"

const READ_MASK = [
  "name",
  "title",
  "categories",
  "websiteUri",
  "phoneNumbers",
  "serviceArea",
  "profile",
  "metadata",
  "openInfo",
].join(",")

async function main() {
  const env = await loadEnv()
  const token = await getAccessToken(env)

  const { accounts = [] } = await apiGet(ACCOUNTS, token)
  if (!accounts.length) {
    console.log("No accounts returned. Are you signed in as the profile owner?")
    return
  }

  for (const account of accounts) {
    console.log(`\nAccount: ${account.accountName} (${account.name}, type ${account.type})`)

    const url = `${INFO}/${account.name}/locations?readMask=${READ_MASK}&pageSize=100`
    const { locations = [] } = await apiGet(url, token)

    if (!locations.length) {
      console.log("  No locations on this account.")
      continue
    }

    for (const loc of locations) {
      const primary = loc.categories?.primaryCategory
      const extra = loc.categories?.additionalCategories ?? []
      const areas = loc.serviceArea?.places?.placeInfos ?? []
      const pending = loc.metadata?.hasPendingEdits

      console.log(`\n  ${loc.title}  [${loc.name}]`)
      console.log(`    PRIMARY CATEGORY : ${primary?.displayName ?? "(none)"}  ${primary?.name ?? ""}`)
      console.log(`    Secondary (${extra.length}/9)   : ${extra.map((c) => c.displayName).join(", ") || "(none)"}`)
      console.log(`    Pending edits    : ${pending ? "YES — a change is still in Google review" : "no"}`)
      console.log(`    Service areas    : ${areas.length}`)
      for (const a of areas) console.log(`      - ${a.placeName}`)
      console.log(`    Website          : ${loc.websiteUri ?? "(none)"}`)
      console.log(`    Phone            : ${loc.phoneNumbers?.primaryPhone ?? "(none)"}`)
      console.log(`    Description      : ${loc.profile?.description?.slice(0, 120) ?? "(none)"}`)
      console.log(`    Status           : ${loc.openInfo?.status ?? "(unknown)"}`)

      if (primary && /contractor/i.test(primary.displayName)) {
        console.log(`\n    ** Primary category still reads "${primary.displayName}". That is the rule violation. **`)
      }
    }
  }
}

main().catch((err) => {
  console.error(`\n${err.message}`)
  process.exit(1)
})
