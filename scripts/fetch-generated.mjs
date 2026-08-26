/**
 * Pulls generated art down to disk so the ad renderer can composite it.
 *
 *   node scripts/fetch-generated.mjs <out-dir> <url> [url...]
 *
 * Generated art is only ever used here as ILLUSTRATION, never as a photograph
 * of a bathroom. The landing page FAQ promises every photo on the site is real
 * work, and an ad has to be able to keep that promise too.
 */
import { mkdirSync, writeFileSync } from "node:fs"
import path from "node:path"

const [outDir, ...urls] = process.argv.slice(2)
if (!outDir || !urls.length) {
  console.error("usage: node scripts/fetch-generated.mjs <out-dir> <url>...")
  process.exit(1)
}
mkdirSync(outDir, { recursive: true })

for (const [i, url] of urls.entries()) {
  const res = await fetch(url)
  if (!res.ok) {
    console.error(`FAILED ${res.status} ${url}`)
    process.exitCode = 1
    continue
  }
  const ext = path.extname(new URL(url).pathname) || ".png"
  const file = path.join(outDir, `gen-${i + 1}${ext}`)
  writeFileSync(file, Buffer.from(await res.arrayBuffer()))
  console.log("saved", file)
}
