/**
 * IndexNow ping — tells Bing (and every IndexNow-participating engine) about
 * new or updated URLs the moment they go live. Bing's index feeds ChatGPT
 * Search, so this is the fastest path from "deployed" to "citable by AI".
 *
 * Usage:
 *   node scripts/indexnow-ping.mjs                          # pings every URL in the live sitemap
 *   node scripts/indexnow-ping.mjs /en/blog/some-post ...   # pings only the given paths (or full URLs)
 *
 * Run after each production deploy that adds or changes pages.
 * The key file lives at public/<key>.txt so the engines can verify ownership.
 */

const HOST = "brokeandfixed.com"
const KEY = "21ddf743c5dda683527a7463e98e47ec"
const ENDPOINT = "https://api.indexnow.org/indexnow"
const BATCH_SIZE = 500

async function urlsFromSitemap() {
  const res = await fetch(`https://${HOST}/sitemap.xml`)
  if (!res.ok) throw new Error(`sitemap fetch failed: ${res.status}`)
  const xml = await res.text()
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim())
  if (!urls.length) throw new Error("no <loc> entries found in sitemap")
  return urls
}

function normalize(arg) {
  if (arg.startsWith("http")) return arg
  return `https://${HOST}${arg.startsWith("/") ? "" : "/"}${arg}`
}

async function ping(urlList) {
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: HOST,
      key: KEY,
      keyLocation: `https://${HOST}/${KEY}.txt`,
      urlList,
    }),
  })
  // 200 = accepted, 202 = accepted (key validation pending)
  if (res.status !== 200 && res.status !== 202) {
    const body = await res.text()
    throw new Error(`IndexNow rejected batch: ${res.status} ${body}`)
  }
  return res.status
}

const args = process.argv.slice(2)
const urls = args.length ? args.map(normalize) : await urlsFromSitemap()

console.log(`Pinging ${urls.length} URL(s) to IndexNow for ${HOST}...`)
for (let i = 0; i < urls.length; i += BATCH_SIZE) {
  const batch = urls.slice(i, i + BATCH_SIZE)
  const status = await ping(batch)
  console.log(`  batch ${i / BATCH_SIZE + 1}: ${batch.length} URLs -> HTTP ${status}`)
}
console.log("Done. Bing usually reflects pinged URLs within hours, not weeks.")
