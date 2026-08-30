/**
 * PHOTO_BeforeAfter_H10, ENGLISH. Standalone renderer.
 *
 *   node scripts/build-t2s-ad-before-after-en.mjs
 *
 * Why this is not a function inside build-t2s-ads.mjs: that script rebuilds
 * every ad in the launch set on each run, and adD-identity-en-4x5.jpg is
 * currently the hand-corrected tiled-wall version. Re-running the full builder
 * to add one plate risks overwriting it. This renders one file and touches
 * nothing else.
 *
 * Composition, and why it differs from the Spanish sibling:
 * beforeAfterEs() stacks BEFORE over AFTER. The original spec called for the
 * English cut to run side by side so Meta could not read the pair as
 * duplicates. Both source photos are portrait (768x1024 and 1500x2000), so a
 * side-by-side crop in a 4:5 frame throws away 30-40% of the room width in
 * each panel, and the room width IS the argument: same wall, same window.
 * So English stays stacked but runs AFTER on top, which is a real
 * compositional inversion rather than a filter swap, and it matches the
 * documented H10 intent of leading with the after.
 */

import { createRequire } from "node:module"
import { mkdirSync } from "node:fs"
import os from "node:os"
import path from "node:path"
import sharp from "sharp"

const require = createRequire(import.meta.url)

/* resvg is not in the app's dependency tree and has no business in
   package.json. It gets installed into a scratchpad, and scratchpads under
   /private/tmp get reaped, so resolve across candidates instead of pinning one
   dead path. Override with RESVG_PATH when it lives somewhere else. */
function resolveResvg() {
  const candidates = [
    process.env.RESVG_PATH,
    "@resvg/resvg-js",
    path.join(ROOT, "node_modules/@resvg/resvg-js"),
  ].filter(Boolean)

  for (const c of candidates) {
    try {
      return require(c)
    } catch {}
  }
  throw new Error(
    "resvg not found. Install it somewhere and point RESVG_PATH at it:\n" +
      "  npm install @resvg/resvg-js\n" +
      "  RESVG_PATH=/abs/path/to/node_modules/@resvg/resvg-js node scripts/build-t2s-ad-before-after-en.mjs",
  )
}

/* The scratchpad ttf/ dir this originally pointed at is empty now. The same
   nine files are installed in the user font dir, under identical names. */
const FONT_DIR = process.env.T2S_FONT_DIR ?? path.join(os.homedir(), "Library/Fonts")

const ROOT = process.cwd()
const { Resvg } = resolveResvg()

const OUT = path.join(ROOT, "public/ads/round-one")
mkdirSync(OUT, { recursive: true })

const FONT_FILES = [
  "Inter_400Regular",
  "Inter_500Medium",
  "Inter_600SemiBold",
  "Inter_700Bold",
  "Montserrat_600SemiBold",
  "Montserrat_700Bold",
].map((n) => path.join(FONT_DIR, `${n}.ttf`))

const NAVY = "#1E3A5F"
const ORANGE = "#F07A1A"
const CREAM = "#F8F9FC"

const IMG = (p) => path.join(ROOT, "public/images", p)

function typeLayer(svg) {
  const r = new Resvg(svg, {
    font: { fontFiles: FONT_FILES, loadSystemFonts: false, defaultFontFamily: "Inter" },
    background: "rgba(0,0,0,0)",
  })
  return r.render().asPng()
}

function crop(file, { left, top, width, height }, to) {
  return sharp(file)
    .extract({ left, top, width, height })
    .resize(to.width, to.height, { fit: "fill", kernel: "lanczos3" })
    .toBuffer()
}

async function beforeAfterEn(v, outfile) {
  // AFTER on top, BEFORE below. Inverted against the Spanish cut on purpose.
  const after = await crop(IMG("glenvar-after-1.jpeg"), v.afterSrc, {
    width: v.w,
    height: v.afterH,
  })
  const before = await crop(IMG("glenvar-before-3.jpg"), v.beforeSrc, {
    width: v.w,
    height: v.beforeH,
  })

  const bandTop = v.afterTop + v.afterH
  const beforeTop = bandTop + v.bandH

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${v.w}" height="${v.h}">
  <text x="${v.w / 2}" y="${bandTop + v.bandH / 2 + v.band * 0.36}" text-anchor="middle"
        font-family="Montserrat" font-weight="700" font-size="${v.band}"
        letter-spacing="${(v.band * 0.05).toFixed(2)}" fill="${CREAM}">THE SAME ROOM. ONE WEEK LATER.</text>

  <rect x="40" y="${v.y.pillA}" width="190" height="62" rx="8" fill="${NAVY}" fill-opacity="0.88"/>
  <text x="135" y="${v.y.pillA + 43}" text-anchor="middle" font-family="Montserrat" font-weight="700"
        font-size="34" letter-spacing="1.7" fill="${CREAM}">AFTER</text>

  <rect x="40" y="${v.y.pillB}" width="215" height="62" rx="8" fill="${NAVY}" fill-opacity="0.88"/>
  <text x="147" y="${v.y.pillB + 43}" text-anchor="middle" font-family="Montserrat" font-weight="700"
        font-size="34" letter-spacing="1.7" fill="${CREAM}">BEFORE</text>

  <defs>
    <linearGradient id="footwash" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${NAVY}" stop-opacity="0"/>
      <stop offset="0.38" stop-color="${NAVY}" stop-opacity="0.9"/>
      <stop offset="0.72" stop-color="${NAVY}" stop-opacity="0.9"/>
      <stop offset="1" stop-color="${NAVY}" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect x="0" y="${v.y.footer - 84}" width="${v.w}" height="140" fill="url(#footwash)"/>
  <text x="60" y="${v.y.footer}" font-family="Inter" font-weight="500" font-size="28"
        fill="${CREAM}" fill-opacity="0.92">Glenvar Heights · Full bath from $9,500 · 4.9 on Google</text>
</svg>`

  await sharp({
    create: { width: v.w, height: v.h, channels: 4, background: NAVY },
  })
    .composite([
      { input: after, top: v.afterTop, left: 0 },
      { input: before, top: beforeTop, left: 0 },
      {
        input: { create: { width: v.w, height: v.bandH, channels: 4, background: NAVY } },
        top: bandTop,
        left: 0,
      },
      {
        input: { create: { width: v.w, height: 4, channels: 4, background: ORANGE } },
        top: bandTop,
        left: 0,
      },
      {
        input: { create: { width: v.w, height: 4, channels: 4, background: ORANGE } },
        top: bandTop + v.bandH - 4,
        left: 0,
      },
      { input: typeLayer(svg), top: 0, left: 0 },
    ])
    .jpeg({ quality: 90, chromaSubsampling: "4:4:4" })
    .toFile(path.join(OUT, outfile))

  console.log("built", outfile)
}

await beforeAfterEn(
  {
    w: 1080,
    h: 1350,
    afterTop: 0,
    afterH: 640,
    afterSrc: { left: 0, top: 600, width: 1500, height: 888 },
    bandH: 110,
    band: 42,
    beforeH: 600,
    /* top=345 not 275: the tub is the thing being removed, so it has to be
       legible. At 275 the tub rim landed at canvas y1193-1348 and the footer
       wash starts at y1228, burying it. Dropping the source window 70px lifts
       the tub clear of the wash and still keeps the window in frame (source
       y345-440), which is the "same room" proof. */
    beforeSrc: { left: 0, top: 345, width: 768, height: 426 },
    y: { pillA: 40, pillB: 790, footer: 1312 },
  },
  "ad6-before-after-en-4x5.jpg",
)
