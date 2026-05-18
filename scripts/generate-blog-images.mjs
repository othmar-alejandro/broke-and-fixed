#!/usr/bin/env node
// Batch generator for AI hero/gallery images using Gemini 2.5 Flash Image (Nano Banana GA).
//
// Reads prompts from the IMAGES array below, generates each, saves to the configured path,
// skips any that already exist (idempotent — safe to re-run after partial failures).
//
// Run from project root:
//   node scripts/generate-blog-images.mjs
//
// Force regenerate a single image (overwrites):
//   node scripts/generate-blog-images.mjs --only cabinet-refinishing-miami-hero --force
//
// Requires:
//   - GEMINI_API_KEY in .env.local
//   - Paid tier enabled at https://aistudio.google.com/app/apikey
//   - Free tier returns "limit: 0" for image generation

import fs from "node:fs"
import path from "node:path"

// --- Load .env.local ---
const envPath = path.resolve(".env.local")
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z_][A-Z0-9_]*)\s*=\s*(.+?)\s*$/)
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "")
  }
}

const KEY = process.env.GEMINI_API_KEY
if (!KEY) {
  console.error("Missing GEMINI_API_KEY. Add it to .env.local")
  process.exit(1)
}

const MODEL = process.env.GEMINI_IMAGE_MODEL || "gemini-2.5-flash-image"
const args = process.argv.slice(2)
const force = args.includes("--force")
const onlyIdx = args.indexOf("--only")
const onlyFilter = onlyIdx >= 0 ? args[onlyIdx + 1] : null

// --- Prompt library (photorealistic real Miami homes style) ---

const STYLE_SUFFIX =
  " Style: documentary real-estate photography, no people, no text or watermarks, no logos, no signage. Photorealistic, natural lighting, slight depth of field, lived-in feel. Aspect ratio 16:9 cinematic composition."

const IMAGES = [
  // === Cabinet Refinishing blog post ===
  {
    id: "cabinet-refinishing-miami-hero",
    path: "public/images/blog/cabinet-refinishing-miami-hero.jpg",
    prompt:
      "Wide-angle photo of a refinished oak kitchen in a Miami suburban home. Honey-stained shaker-style cabinet doors with brushed nickel hardware, freshly resealed with a satin lacquer finish. White quartz countertop, subtle subway tile backsplash, warm afternoon Florida sunlight through a window with sheer curtains. The cabinets look professionally refinished with visible wood grain texture through the stain, not new installation. Clean but lived-in." +
      STYLE_SUFFIX,
  },

  // === Budget Kitchen Update blog post ===
  {
    id: "budget-kitchen-update-miami-hero",
    path: "public/images/blog/budget-kitchen-update-miami-hero.jpg",
    prompt:
      "Wide-angle photo of an updated Miami kitchen showing the result of a budget refresh: refinished white cabinets, new white quartz countertop, fresh subway tile backsplash, brushed gold pulls and knobs. Stainless steel appliances kept from before. Bright Florida morning light through window. The overall feel is that this kitchen was updated, not gutted and rebuilt. Mid-century or 1980s Miami home architecture (terrazzo floors visible, simple trim)." +
      STYLE_SUFFIX,
  },

  // === Cabinet Refinishing service landing page ===
  {
    id: "cabinet-refinishing-service-hero",
    path: "public/images/services/cabinet-refinishing-hero.jpg",
    prompt:
      "Eye-level photo of a Miami kitchen mid-refinishing project: cabinet doors removed and visible on a drying rack in foreground, cabinet boxes still mounted on wall showing taped-off openings with paper protection. HVLP spray gun visible on a workbench. Professional remodeling worksite, organized and clean. Florida-style kitchen (tile floor, hurricane-rated windows in background). Daylight." +
      STYLE_SUFFIX,
  },

  // === Cabinet Refinishing service gallery ===
  {
    id: "cabinet-refinishing-before",
    path: "public/images/services/cabinet-refinishing-before.jpg",
    prompt:
      "Photo of dated oak kitchen cabinets in a 1990s Miami home before refinishing: visible yellowed clear coat, worn finish around handles, scuffed corners, original brass hardware. The cabinets are solid wood but tired-looking. Natural lighting, slightly cluttered counters to show real lived-in condition." +
      STYLE_SUFFIX,
  },
  {
    id: "cabinet-refinishing-after",
    path: "public/images/services/cabinet-refinishing-after.jpg",
    prompt:
      "Same Miami kitchen after professional cabinet refinishing: cabinets now in crisp matte white lacquer finish with matte black bar pulls. Quartz countertops, clean undermount sink, organized. Warm Florida late-afternoon light through window. Same kitchen layout as the before photo but completely transformed visually." +
      STYLE_SUFFIX,
  },
  {
    id: "cabinet-refinishing-process",
    path: "public/images/services/cabinet-refinishing-process.jpg",
    prompt:
      "Close-up photo of a cabinet door being sanded by hand with an orbital sander, dust visible in shaft of sunlight. Wood grain showing through the partially-removed previous finish. Hands wearing nitrile gloves and a sanding mask. Workshop setting with other doors on racks in soft focus background." +
      STYLE_SUFFIX,
  },
]

// --- Generate one image ---

async function generateOne({ id, path: outPath, prompt }) {
  if (onlyFilter && id !== onlyFilter) return { id, skipped: "filtered" }

  const fullPath = path.resolve(outPath)
  if (!force && fs.existsSync(fullPath)) {
    return { id, skipped: "exists", path: fullPath }
  }

  console.log(`Generating ${id}...`)
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${KEY}`
  const body = {
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: { responseModalities: ["IMAGE"] },
  }

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const text = await res.text()
    return { id, error: `HTTP ${res.status}: ${text.slice(0, 300)}` }
  }

  const json = await res.json()
  const parts = json?.candidates?.[0]?.content?.parts || []
  const imagePart = parts.find((p) => p.inlineData?.data)

  if (!imagePart) {
    return { id, error: `No image in response: ${JSON.stringify(json).slice(0, 300)}` }
  }

  const buffer = Buffer.from(imagePart.inlineData.data, "base64")
  fs.mkdirSync(path.dirname(fullPath), { recursive: true })
  fs.writeFileSync(fullPath, buffer)

  return { id, bytes: buffer.length, path: fullPath }
}

// --- Main ---

console.log(`Model: ${MODEL}`)
console.log(`Images planned: ${IMAGES.length}`)
console.log(`Estimated cost: ~$${(IMAGES.length * 0.04).toFixed(2)} on Flash Image GA`)
console.log()

const results = []
for (const img of IMAGES) {
  try {
    const result = await generateOne(img)
    results.push(result)
    if (result.skipped === "filtered") continue
    if (result.skipped === "exists") {
      console.log(`  SKIP (already exists): ${result.path}`)
    } else if (result.error) {
      console.log(`  ERROR: ${result.error}`)
    } else {
      console.log(`  OK: ${result.bytes.toLocaleString()} bytes -> ${result.path}`)
    }
  } catch (e) {
    console.log(`  EXCEPTION: ${e.message}`)
    results.push({ id: img.id, error: e.message })
  }
}

console.log()
const ok = results.filter((r) => r.bytes).length
const skipped = results.filter((r) => r.skipped).length
const errors = results.filter((r) => r.error).length
console.log(`Done: ${ok} generated, ${skipped} skipped, ${errors} errors`)

if (errors > 0) process.exit(1)
