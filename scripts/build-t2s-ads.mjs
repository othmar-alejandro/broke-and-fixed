/**
 * Round one ad creative renderer.
 *
 * Builds the three launch ads from docs/t2s-07-creative-production-spec.md at
 * the exact pixel coordinates that document specifies. Photo layers go through
 * sharp. Type layers are rendered by resvg with the font files loaded
 * explicitly, because sharp's bundled fontconfig does not see fonts installed
 * on this machine and silently falls back to Helvetica. A silent fallback on a
 * type led ad is the whole ad, so the fonts are never left to chance here.
 *
 *   node scripts/build-t2s-ads.mjs
 *
 * Output lands in public/ads/round-one/. Every price rendered into an image
 * reads FROM, never a bare number, because the landing page publishes starting
 * prices and an image that drops the qualifier is a price mismatch.
 */

import { createRequire } from "node:module"
import { mkdirSync, readFileSync } from "node:fs"
import path from "node:path"
import sharp from "sharp"

const require = createRequire(import.meta.url)

/* resvg lives in the scratchpad install, not in the app's dependency tree.
   Nothing in the site imports it and it has no business in package.json. */
const RESVG_PATH =
  process.env.RESVG_PATH ??
  "/private/tmp/claude-501/-Users-othmarcasilla-broke-and-fixed-305/96132350-a9da-4d2a-b3d5-6d7481468814/scratchpad/fonts/node_modules/@resvg/resvg-js"
const FONT_DIR =
  process.env.T2S_FONT_DIR ??
  "/private/tmp/claude-501/-Users-othmarcasilla-broke-and-fixed-305/96132350-a9da-4d2a-b3d5-6d7481468814/scratchpad/fonts/ttf"

const { Resvg } = require(RESVG_PATH)

const ROOT = process.cwd()
const OUT = path.join(ROOT, "public/ads/round-one")
mkdirSync(OUT, { recursive: true })

const FONT_FILES = [
  "BarlowCondensed_400Regular",
  "BarlowCondensed_600SemiBold",
  "BarlowCondensed_700Bold",
  "Inter_400Regular",
  "Inter_500Medium",
  "Inter_600SemiBold",
  "Inter_700Bold",
  "Montserrat_600SemiBold",
  "Montserrat_700Bold",
].map((n) => path.join(FONT_DIR, `${n}.ttf`))

/* Brand tokens. Single source is CLAUDE.md and brand.json; duplicated here
   only because this script runs standalone. */
const NAVY = "#1E3A5F"
const ORANGE = "#F07A1A"
const CREAM = "#F8F9FC"
const ESPRESSO = "#0F1F35"

/**
 * Price-gate themes. Owner asked for a white ground and a calmer price colour
 * than Trade Orange, so orange survives only as a small accent on the wordmark,
 * never as a field.
 */
const THEMES = {
  // Solid dark price card. The strongest anchor of the three, and the one that
  // survives a white Feed best.
  navyBlock: {
    ground: "#FFFFFF",
    card: NAVY,
    cardStroke: "",
    price: CREAM,
    label: CREAM,
    labelOpacity: "0.72",
    rule: CREAM,
    ruleOpacity: "0.22",
    accent: NAVY,
  },
  // Light card, heavy navy price type. Quietest and most editorial.
  navyInk: {
    ground: "#FFFFFF",
    card: "#F2F5FA",
    cardStroke: ` stroke="${NAVY}" stroke-opacity="0.12" stroke-width="2"`,
    price: NAVY,
    label: NAVY,
    labelOpacity: "0.74",
    rule: NAVY,
    ruleOpacity: "0.14",
    accent: NAVY,
  },
  // Approval Green, darkened from the #4CAF50 brand token because the token
  // itself only clears about 2.8:1 on white and large price type has to be
  // unambiguous.
  green: {
    ground: "#FFFFFF",
    card: "#F2F5FA",
    cardStroke: ` stroke="${NAVY}" stroke-opacity="0.12" stroke-width="2"`,
    price: "#2E7D3A",
    label: NAVY,
    labelOpacity: "0.74",
    rule: NAVY,
    ruleOpacity: "0.14",
    accent: "#2E7D3A",
  },
}

const IMG = (p) => path.join(ROOT, "public/images", p)

/** Renders an SVG type layer to a transparent PNG buffer at its native size. */
function typeLayer(svg) {
  const r = new Resvg(svg, {
    font: { fontFiles: FONT_FILES, loadSystemFonts: false, defaultFontFamily: "Inter" },
    background: "rgba(0,0,0,0)",
  })
  return r.render().asPng()
}

/** Crops a source region in source pixels, then scales it to an exact box. */
function crop(file, { left, top, width, height }, to) {
  return sharp(file)
    .extract({ left, top, width, height })
    .resize(to.width, to.height, { fit: "fill", kernel: "lanczos3" })
    .toBuffer()
}

/**
 * True when a source photo can actually be opened.
 *
 * Killian-tub-to-shower-results.jpeg carries a macOS `com.apple.macl` extended
 * attribute, which pins read access to whichever app the owner first granted
 * and returns EPERM to everything else, this script included. It cannot be
 * cleared from here; the fix is to open the original and re-save a fresh copy.
 * An ad silently vanishing from a launch set is worse than a loud skip, so the
 * renderer reports it and keeps going.
 */
function readable(file) {
  try {
    readFileSync(file)
    return true
  } catch (err) {
    console.warn(`SKIPPED, cannot read ${path.basename(file)} (${err.code})`)
    return false
  }
}

const esc = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")

/* ------------------------------------------------------------------ */
/* Ad 1. TYPE_PriceAnchor. The $4,500 hero                             */
/* ------------------------------------------------------------------ */

/**
 * @param v.w,v.h            canvas
 * @param v.groundH          navy ground height, photo band fills the rest
 * @param v.bandSrc          source crop for the photo band
 * @param v.hero             hero number size
 * @param v.stmt             statement size and line height
 * @param v.y                baselines
 */
async function priceAnchor(v, outfile) {
  const bandH = v.h - v.groundH

  const band = await crop(IMG("glenvar-after-4.jpeg"), v.bandSrc, {
    width: v.w,
    height: bandH,
  })

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${v.w}" height="${v.h}">
  <!-- Wordmark set in type rather than the PNG lockup: the lockup's shield and
       wordmark are both Shield Navy and disappear against a navy ground. -->
  <text x="${v.w - 88}" y="${v.y.markA}" text-anchor="end" font-family="Montserrat" font-weight="700"
        font-size="${v.mark}" letter-spacing="${(v.mark * 0.04).toFixed(2)}" fill="${CREAM}">BROKE &amp; FIXED</text>
  <text x="${v.w - 88}" y="${v.y.markB}" text-anchor="end" font-family="Montserrat" font-weight="600"
        font-size="${Math.round(v.mark * 0.62)}" letter-spacing="${(v.mark * 0.16).toFixed(2)}"
        fill="${ORANGE}">HOME SOLUTIONS</text>

  <!-- Eyebrow is set below the spec's 32px/0.16em because the wordmark on the
       right is a type lockup, not the compact PNG mark the spec assumed, and
       the two collided at full size. -->
  <text x="88" y="${v.y.eyebrow}" font-family="Montserrat" font-weight="700" font-size="${v.eyebrow}"
        letter-spacing="${(v.eyebrow * 0.12).toFixed(2)}" fill="${CREAM}" fill-opacity="0.65">TUB TO SHOWER CONVERSION</text>

  <text x="88" y="${v.y.kicker}" font-family="Montserrat" font-weight="700" font-size="${v.kicker}"
        letter-spacing="${(v.kicker * 0.2).toFixed(2)}" fill="${CREAM}">FROM</text>

  <text x="88" y="${v.y.hero}" font-family="Barlow Condensed" font-weight="700" font-size="${v.hero}"
        fill="${ORANGE}">$4,500</text>

  <text x="88" y="${v.y.stmt1}" font-family="Barlow Condensed" font-weight="600" font-size="${v.stmt}"
        fill="${CREAM}">Tub out. Tiled walk-in</text>
  <text x="88" y="${v.y.stmt2}" font-family="Barlow Condensed" font-weight="600" font-size="${v.stmt}"
        fill="${CREAM}">shower in.</text>

  <text x="88" y="${v.y.trust}" font-family="Inter" font-weight="500" font-size="${v.trust}"
        fill="${CREAM}" fill-opacity="0.7">4.9 on Google · Fully insured · Kendall</text>
  <text x="88" y="${v.y.sig}" font-family="Inter" font-weight="600" font-size="${v.sig}"
        fill="${ORANGE}">Omar and Byron Casilla</text>
</svg>`

  await sharp({
    create: { width: v.w, height: v.h, channels: 4, background: NAVY },
  })
    .composite([
      { input: band, top: v.groundH, left: 0 },
      {
        // 6px Trade Orange divider, sitting on the seam.
        input: {
          create: { width: v.w, height: 6, channels: 4, background: ORANGE },
        },
        top: v.groundH - 3,
        left: 0,
      },
      { input: typeLayer(svg), top: 0, left: 0 },
    ])
    .jpeg({ quality: 90, chromaSubsampling: "4:4:4" })
    .toFile(path.join(OUT, outfile))

  console.log("built", outfile)
}

/* ------------------------------------------------------------------ */
/* Ad 4. PHOTO_Objection. Killian                                      */
/* ------------------------------------------------------------------ */

/**
 * The Killian shower has a LOW CURB, not a curbless entry. No "no step",
 * "curbless" or "step free" language may go on this image, ever.
 */
async function objection(v, outfile) {
  if (!readable(IMG("Killian-tub-to-shower-results.jpeg"))) return
  const photo = await crop(IMG("Killian-tub-to-shower-results.jpeg"), v.src, {
    width: v.w,
    height: v.h,
  })

  const scrimH = v.h - v.scrimTop

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${v.w}" height="${v.h}">
  <!-- The Killian frame is a white ceiling and white walls at the top, so the
       wordmark runs navy here. Cream on white is unreadable at thumbnail size. -->
  <text x="${v.w - 80}" y="${v.y.markA}" text-anchor="end" font-family="Montserrat" font-weight="700"
        font-size="${v.mark}" letter-spacing="${(v.mark * 0.04).toFixed(2)}" fill="${NAVY}">BROKE &amp; FIXED</text>
  <text x="${v.w - 80}" y="${v.y.markB}" text-anchor="end" font-family="Montserrat" font-weight="600"
        font-size="${Math.round(v.mark * 0.62)}" letter-spacing="${(v.mark * 0.16).toFixed(2)}"
        fill="${ORANGE}">HOME SOLUTIONS</text>

  <text x="80" y="${v.y.h1}" font-family="Barlow Condensed" font-weight="700" font-size="${v.head}"
        fill="${CREAM}">Three people looked at it.</text>
  <text x="80" y="${v.y.h2}" font-family="Barlow Condensed" font-weight="700" font-size="${v.head}"
        fill="${CREAM}">You still have the tub.</text>

  <text x="80" y="${v.y.s1}" font-family="Inter" font-weight="400" font-size="${v.sub}"
        fill="${CREAM}" fill-opacity="0.82">We publish our prices. Tub out,</text>
  <text x="80" y="${v.y.s2}" font-family="Inter" font-weight="400" font-size="${v.sub}"
        fill="${CREAM}" fill-opacity="0.82">walk-in shower in, from $4,500.</text>

  <text x="80" y="${v.y.trust}" font-family="Inter" font-weight="500" font-size="${v.trust}"
        fill="${CREAM}" fill-opacity="0.65">4.9 on Google · Fully insured · An owner on every job</text>
  <text x="80" y="${v.y.sig}" font-family="Inter" font-weight="600" font-size="${v.sig}"
        fill="${ORANGE}">Omar and Byron Casilla, Kendall</text>
</svg>`

  await sharp(photo)
    .composite([
      // Hard edged scrim, not a gradient, so type sits on a flat field and
      // stays legible at thumbnail size. 92 percent lets a little of the floor
      // read through, which keeps the block from looking pasted on.
      {
        input: {
          create: {
            width: v.w,
            height: scrimH,
            channels: 4,
            background: { r: 30, g: 58, b: 95, alpha: 0.92 },
          },
        },
        top: v.scrimTop,
        left: 0,
      },
      {
        input: {
          create: { width: v.w, height: 6, channels: 4, background: ORANGE },
        },
        top: v.scrimTop - 6,
        left: 0,
      },
      { input: typeLayer(svg), top: 0, left: 0 },
    ])
    .jpeg({ quality: 90, chromaSubsampling: "4:4:4" })
    .toFile(path.join(OUT, outfile))

  console.log("built", outfile)
}

/* ------------------------------------------------------------------ */
/* Ad 6. PHOTO_BeforeAfter, Spanish. Stacked                           */
/* ------------------------------------------------------------------ */

/**
 * Spanish runs the STACKED layout at every crop. English runs side by side.
 * That is a real difference in composition, not a filter swap, which is what
 * keeps Meta from reading the pair as duplicates.
 *
 * Copy says arriba and abajo, never izquierda and derecha, because the panels
 * are stacked.
 */
async function beforeAfterEs(v, outfile) {
  const before = await crop(IMG("glenvar-before-3.jpg"), v.beforeSrc, {
    width: v.w,
    height: v.beforeH,
  })
  const after = await crop(IMG("glenvar-after-1.jpeg"), v.afterSrc, {
    width: v.w,
    height: v.afterH,
  })

  const bandTop = v.beforeTop + v.beforeH
  const afterTop = bandTop + v.bandH

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${v.w}" height="${v.h}">
  <text x="${v.w / 2}" y="${bandTop + v.bandH / 2 + v.band * 0.36}" text-anchor="middle"
        font-family="Montserrat" font-weight="700" font-size="${v.band}"
        letter-spacing="${(v.band * 0.05).toFixed(2)}" fill="${CREAM}">EL MISMO CUARTO. UNA SEMANA DESPUÉS.</text>

  <rect x="40" y="${v.y.pillA}" width="190" height="62" rx="8" fill="${NAVY}" fill-opacity="0.88"/>
  <text x="135" y="${v.y.pillA + 43}" text-anchor="middle" font-family="Montserrat" font-weight="700"
        font-size="34" letter-spacing="1.7" fill="${CREAM}">ANTES</text>

  <rect x="40" y="${v.y.pillB}" width="220" height="62" rx="8" fill="${NAVY}" fill-opacity="0.88"/>
  <text x="150" y="${v.y.pillB + 43}" text-anchor="middle" font-family="Montserrat" font-weight="700"
        font-size="34" letter-spacing="1.7" fill="${CREAM}">DESPUÉS</text>

  <!-- Footer sits inside the after panel. The spec called for a shadow alone,
       but the black hex floor it lands on swallowed it, so it gets a navy
       gradient wash that fades out upward instead of a hard strip. -->
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
        fill="${CREAM}" fill-opacity="0.92">Glenvar Heights · Baño completo desde $9,500 · 4.9 en Google</text>
</svg>`

  await sharp({
    create: { width: v.w, height: v.h, channels: 4, background: NAVY },
  })
    .composite([
      { input: before, top: v.beforeTop, left: 0 },
      { input: after, top: afterTop, left: 0 },
      {
        input: {
          create: { width: v.w, height: v.bandH, channels: 4, background: NAVY },
        },
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

/* ------------------------------------------------------------------ */
/* Run                                                                 */
/* ------------------------------------------------------------------ */

await priceAnchor(
  {
    w: 1080,
    h: 1350,
    groundH: 1080,
    bandSrc: { left: 0, top: 1450, width: 1500, height: 375 },
    mark: 26,
    eyebrow: 26,
    kicker: 48,
    hero: 300,
    stmt: 96,
    trust: 32,
    sig: 30,
    y: { markA: 248, markB: 284, eyebrow: 264, kicker: 360, hero: 630, stmt1: 760, stmt2: 860, trust: 1000, sig: 1044 },
  },
  "ad1-price-anchor-en-4x5.jpg",
)

await priceAnchor(
  {
    w: 1080,
    h: 1920,
    groundH: 1248,
    bandSrc: { left: 0, top: 1250, width: 1500, height: 750 },
    mark: 26,
    eyebrow: 26,
    kicker: 48,
    hero: 300,
    stmt: 96,
    trust: 32,
    sig: 30,
    y: { markA: 384, markB: 420, eyebrow: 400, kicker: 500, hero: 770, stmt1: 900, stmt2: 1000, trust: 1130, sig: 1180 },
  },
  "ad1-price-anchor-en-9x16.jpg",
)

await objection(
  {
    w: 1080,
    h: 1350,
    src: { left: 0, top: 50, width: 1200, height: 1500 },
    scrimTop: 760,
    mark: 28,
    head: 84,
    sub: 36,
    trust: 30,
    sig: 30,
    y: { markA: 240, markB: 280, h1: 880, h2: 970, s1: 1040, s2: 1090, trust: 1170, sig: 1226 },
  },
  "ad4-objection-en-4x5.jpg",
)

await objection(
  {
    w: 1080,
    h: 1920,
    src: { left: 60, top: 0, width: 1080, height: 1600 },
    scrimTop: 620,
    mark: 28,
    head: 84,
    sub: 36,
    trust: 30,
    sig: 30,
    y: { markA: 330, markB: 370, h1: 760, h2: 850, s1: 930, s2: 980, trust: 1070, sig: 1130 },
  },
  "ad4-objection-en-9x16.jpg",
)

await beforeAfterEs(
  {
    w: 1080,
    h: 1350,
    beforeTop: 0,
    beforeH: 640,
    beforeSrc: { left: 0, top: 260, width: 768, height: 455 },
    bandH: 110,
    band: 38,
    afterH: 600,
    afterSrc: { left: 0, top: 620, width: 1500, height: 833 },
    y: { pillA: 40, pillB: 790, footer: 1300 },
  },
  "ad6-before-after-es-4x5.jpg",
)

await beforeAfterEs(
  {
    w: 1080,
    h: 1920,
    beforeTop: 270,
    beforeH: 730,
    beforeSrc: { left: 0, top: 240, width: 768, height: 519 },
    bandH: 90,
    band: 34,
    afterH: 708,
    afterSrc: { left: 0, top: 590, width: 1500, height: 983 },
    y: { pillA: 300, pillB: 1120, footer: 1230 },
  },
  "ad6-before-after-es-9x16.jpg",
)

/* ------------------------------------------------------------------ */
/* Ad A. TYPE_PriceGate. Round one v2, built from the recon            */
/* ------------------------------------------------------------------ */

/**
 * The Ad Library sweep in docs/t2s-11-recon-report.md found that not one
 * advertiser in the six-month-survivor set publishes a price. LJ Stone gates it
 * behind "tap your age to unlock pricing", Premier Home Pros behind "see if you
 * qualify", American Bath & Shower behind an email. Broke & Fixed publishes.
 *
 * So the ad is not the number. The ad is the CONTRAST. This creative states the
 * category's own mechanic and then breaks it.
 *
 * Ground is Trade Orange because the entire proven set is navy, gold and red.
 * Orange is both the brand colour and the only field nobody in the category is
 * using, which is the cheapest pattern interrupt available.
 *
 * No competitor is named anywhere. The gate phrases are category descriptions,
 * not trademarks, which keeps the policy record clean.
 */
async function priceGate(v, outfile) {
  /* A white ad sits on a white Feed, so it needs an anchor or it dissolves.
     Each theme solves that differently: `navyBlock` anchors on a solid dark
     price card, `navyInk` on heavy price type, `green` on colour. */
  const t = THEMES[v.theme]

  const rows = [
    ["Tub out, tiled walk-in shower in", "From $4,500"],
    ["Shower plus a new floor", "From $6,500"],
    ["The whole bathroom", "From $9,500"],
  ]

  const rowSvg = rows
    .map(([label, price], i) => {
      const y = v.y.row1 + i * v.rowStep
      const rule =
        i < rows.length - 1
          ? `<rect x="${v.card.x + 44}" y="${y + v.rowStep - 62}" width="${v.card.w - 88}" height="1" fill="${t.rule}" fill-opacity="${t.ruleOpacity}"/>`
          : ""
      return `
  <text x="${v.card.x + 44}" y="${y}" font-family="Inter" font-weight="500" font-size="${v.label}"
        fill="${t.label}" fill-opacity="${t.labelOpacity}">${label}</text>
  <text x="${v.card.x + v.card.w - 44}" y="${y + 6}" text-anchor="end" font-family="Barlow Condensed"
        font-weight="700" font-size="${v.price}" fill="${t.price}">${price}</text>${rule}`
    })
    .join("")

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${v.w}" height="${v.h}">
  <!-- No ground rect here. The sharp canvas already paints t.ground, and an
       opaque rect in this layer composited straight over the logo. -->
  <text x="70" y="${v.y.geo}" font-family="Montserrat" font-weight="700" font-size="${v.geoSize}"
        letter-spacing="${(v.geoSize * 0.06).toFixed(2)}" fill="${ESPRESSO}">${esc(v.area.toUpperCase())}</text>
  <text x="70" y="${v.y.eyebrow}" font-family="Montserrat" font-weight="600" font-size="22"
        letter-spacing="3.30" fill="${NAVY}" fill-opacity="0.68">TUB TO SHOWER CONVERSION</text>

  <text x="70" y="${v.y.h1}" font-family="Barlow Condensed" font-weight="700" font-size="${v.head}"
        fill="${ESPRESSO}">Nobody will tell you</text>
  <text x="70" y="${v.y.h2}" font-family="Barlow Condensed" font-weight="700" font-size="${v.head}"
        fill="${ESPRESSO}">what it costs.</text>
  <text x="70" y="${v.y.h3}" font-family="Barlow Condensed" font-weight="700" font-size="${v.head}"
        fill="${t.accent}">So here it is.</text>

  <rect x="${v.card.x}" y="${v.card.y}" width="${v.card.w}" height="${v.card.h}" rx="18" fill="${t.card}"${t.cardStroke}/>
  ${rowSvg}

  <text x="70" y="${v.y.note}" font-family="Inter" font-weight="400" font-size="${v.note}"
        fill="${NAVY}" fill-opacity="0.72">Starting prices, published before you call. Bathroom size moves them,</text>
  <text x="70" y="${v.y.note + v.noteStep}" font-family="Inter" font-weight="400" font-size="${v.note}"
        fill="${NAVY}" fill-opacity="0.72">so we measure before we quote. No sit-down in your kitchen first.</text>

  <text x="70" y="${v.y.trust}" font-family="Inter" font-weight="600" font-size="${v.trust}"
        fill="${NAVY}">4.9 on Google · Fully insured · Family owned in Kendall</text>
</svg>`

  /* The real lockup, not type. It is legible here only because the ground is
     white; against the navy version its shield and wordmark both disappeared. */
  const logo = await sharp(path.join(ROOT, "public/broke-and-fixed-final-logo-Picsart-BackgroundRemover.png"))
    .trim()
    .resize({ height: v.logoH, kernel: "lanczos3" })
    .toBuffer()
  const logoMeta = await sharp(logo).metadata()

  await sharp({
    create: { width: v.w, height: v.h, channels: 4, background: t.ground },
  })
    .composite([
      { input: logo, top: v.logoTop, left: v.w - 70 - logoMeta.width },
      { input: typeLayer(svg), top: 0, left: 0 },
    ])
    .jpeg({ quality: 92, chromaSubsampling: "4:4:4" })
    .toFile(path.join(OUT, outfile))

  console.log("built", outfile)
}

/* One template, the place name swapped. LJ Stone runs this across ~40 markets and
   it is the cheapest creative volume available: each area is a separate retrieval
   entity under Andromeda. All 17 service areas are one command. At $20/day only a
   handful should run at once, so the launch set is deliberately short. */
const GEO_LAUNCH = ["Miami-Dade", "Kendall", "Palmetto Bay", "Doral"]

const PRICE_GATE_4X5 = {
  theme: "green",
  logoH: 168,
  logoTop: 150,
  w: 1080,
  h: 1350,
  head: 96,
  geoSize: 44,
  label: 30,
  price: 62,
  note: 26,
  noteStep: 38,
  trust: 28,
  rowStep: 132,
  card: { x: 70, y: 636, w: 940, h: 400 },
  y: { markA: 224, markB: 262, geo: 232, eyebrow: 276, h1: 380, h2: 472, h3: 564, row1: 726, note: 1128, trust: 1252 },
}

for (const area of GEO_LAUNCH) {
  const slug = area.toLowerCase().replace(/[^a-z0-9]+/g, "-")
  await priceGate({ ...PRICE_GATE_4X5, area }, `adA-price-gate-${slug}-en-4x5.jpg`)
}

/* One Kendall proof per theme, so the colour call can be made by looking. */
for (const theme of Object.keys(THEMES)) {
  await priceGate({ ...PRICE_GATE_4X5, area: "Kendall", theme }, `adA-theme-${theme}-4x5.jpg`)
}

/* ------------------------------------------------------------------ */
/* Ad B. TYPE_Method. Construction method, over the layer diagram      */
/* ------------------------------------------------------------------ */

/**
 * docs/t2s-11-recon-report.md classifies method and construction quality as
 * WHITESPACE: not one advertiser in the six-month-survivor set argues it. The
 * whole category argues discount, senior safety, or a gated price.
 *
 * The base art is a generated exploded-layer DIAGRAM, in the same navy and
 * orange language as compare-liner.png and compare-rebuild.png on the landing
 * page. It is an illustration and reads as one. A generated photoreal bathroom
 * would break the promise the page FAQ makes that every photo is real work, so
 * generated art never plays that role, here or anywhere.
 *
 * Housing note: this copy describes two ways of building a wall. It names no
 * condition in anybody's home. Do not add leak, rot, mold or damage to any
 * variation, and never name a franchise trademark.
 */
async function methodDiagram(v, outfile) {
  /* The diagram is placed BELOW the type, not behind it. Filling the frame put
     orange headline over brown studs and the line disappeared. Offsetting it
     down gives the headline a clean navy field and lets the illustration answer
     the question the headline asks. */
  const art = await sharp(path.join(ROOT, "public/ads/generated/gen-1.png"))
    .resize({ width: v.w, kernel: "lanczos3" })
    .toBuffer()

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${v.w}" height="${v.h}">
  <text x="${v.w - 70}" y="${v.y.markA}" text-anchor="end" font-family="Montserrat" font-weight="700"
        font-size="26" letter-spacing="1.04" fill="${CREAM}">BROKE &amp; FIXED</text>
  <text x="${v.w - 70}" y="${v.y.markB}" text-anchor="end" font-family="Montserrat" font-weight="600"
        font-size="16" letter-spacing="4.16" fill="${ORANGE}">HOME SOLUTIONS</text>

  <text x="70" y="${v.y.eyebrow}" font-family="Montserrat" font-weight="700" font-size="24"
        letter-spacing="3.36" fill="${ORANGE}">WHAT IS BEHIND THE TILE</text>

  <text x="70" y="${v.y.h1}" font-family="Barlow Condensed" font-weight="700" font-size="${v.head}"
        fill="${CREAM}">A one-day panel</text>
  <text x="70" y="${v.y.h2}" font-family="Barlow Condensed" font-weight="700" font-size="${v.head}"
        fill="${CREAM}">skips three of these.</text>

  <text x="70" y="${v.y.foot1}" font-family="Inter" font-weight="600" font-size="31"
        fill="${CREAM}">Studs. Cement board. Membrane. Then tile.</text>
  <text x="70" y="${v.y.foot2}" font-family="Inter" font-weight="400" font-size="29"
        fill="${CREAM}" fill-opacity="0.8">We take the old wall out and rebuild it. About a week, not a</text>
  <text x="70" y="${v.y.foot3}" font-family="Inter" font-weight="400" font-size="29"
        fill="${CREAM}" fill-opacity="0.8">day. Porcelain tile, from $4,500. One year warranty in writing.</text>
</svg>`

  await sharp({ create: { width: v.w, height: v.h, channels: 4, background: NAVY } })
    .composite([
      { input: art, top: v.artTop, left: 0 },
      // Hard edged footer, not a gradient. The gradient hazed the bottom of the
      // tile panel and read like a rendering fault rather than a design choice.
      {
        input: { create: { width: v.w, height: v.h - v.footTop, channels: 4, background: NAVY } },
        top: v.footTop,
        left: 0,
      },
      {
        input: { create: { width: v.w, height: 4, channels: 4, background: ORANGE } },
        top: v.footTop,
        left: 0,
      },
      { input: typeLayer(svg), top: 0, left: 0 },
    ])
    .jpeg({ quality: 92, chromaSubsampling: "4:4:4" })
    .toFile(path.join(OUT, outfile))

  console.log("built", outfile)
}

await methodDiagram(
  {
    w: 1080,
    h: 1350,
    head: 82,
    artTop: 150,
    footTop: 1108,
    y: { markA: 224, markB: 262, eyebrow: 224, h1: 316, h2: 400, foot1: 1180, foot2: 1240, foot3: 1284 },
  },
  "adB-method-en-4x5.jpg",
)

/* ------------------------------------------------------------------ */
/* Ad C. TYPE_EntryHeight. The step-over angle, done compliantly       */
/* ------------------------------------------------------------------ */

/**
 * This is Profile A's actual trigger, and Profile A is the primary buyer. It is
 * also the single most policy-exposed angle in the account, so the rule is
 * absolute:
 *
 *   TALK ABOUT THE BATHROOM. NEVER ABOUT THE PERSON.
 *
 * "A tub wall is knee high" is a fact about a bathroom. "Is stepping over the
 * tub getting hard for you?" implies knowledge of the viewer's age, health or
 * mobility, which is a personal-attributes violation, a rejection, and possibly
 * an account strike. No variation of this ad may use second person about
 * ability, name an age, or say senior, elderly, aging, mobility or safety.
 *
 * docs/t2s-11-recon-report.md classifies this angle as SATURATED: LJ Stone runs
 * a "Senior Bathroom Remodel Program" across ~46 ads, American Bath & Shower
 * sells an aging-in-place guide. The vault's rule for entering a saturated
 * angle is to bring a materially better hook. Ours is that the whole category
 * sells the buyer a senior product, which is precisely what that buyer resents.
 * The landing page already carries the better line, from pillar-content.ts:
 * "Nobody calls it aging in place when we are standing there. They just call it
 * smart." That line does the emotional work without ever describing the viewer.
 *
 * Height language is the site's own: "one low step, not a tub wall." Never
 * "curbless", "no step" or "step free" — the built curb is low, not absent, and
 * the page is careful about that distinction.
 */
async function entryHeight(v, outfile) {
  /* Crop to the band that actually carries the argument, the top of the tub
     wall down to just past the floor line, then inset it. Full-bleed put the
     floor line behind the footer and the low orange curb, which is the entire
     point of the comparison, was almost completely hidden. */
  const art = await sharp(path.join(ROOT, "public/ads/generated/gen-2-entry.png"))
    .extract(v.artCrop)
    .resize({ width: v.artW, kernel: "lanczos3" })
    .toBuffer()

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${v.w}" height="${v.h}">
  <text x="70" y="${v.y.eyebrow}" font-family="Montserrat" font-weight="700" font-size="24"
        letter-spacing="3.36" fill="${ORANGE}">THE WALL, NOT THE BATHTUB</text>

  <text x="70" y="${v.y.h1}" font-family="Barlow Condensed" font-weight="700" font-size="${v.head}"
        fill="${CREAM}">A tub wall is knee high.</text>
  <text x="70" y="${v.y.h2}" font-family="Barlow Condensed" font-weight="700" font-size="${v.head}"
        fill="${ORANGE}">Ours is one low step.</text>

  <text x="70" y="${v.y.foot1}" font-family="Inter" font-weight="600" font-size="30"
        fill="${CREAM}">Nobody calls it aging in place when we are standing</text>
  <text x="70" y="${v.y.foot2}" font-family="Inter" font-weight="600" font-size="30"
        fill="${CREAM}">there. They just call it smart.</text>
  <text x="70" y="${v.y.foot3}" font-family="Inter" font-weight="400" font-size="28"
        fill="${CREAM}" fill-opacity="0.78">Tub out, tiled walk-in shower in, from $4,500. Bench and grab</text>
  <text x="70" y="${v.y.foot4}" font-family="Inter" font-weight="400" font-size="28"
        fill="${CREAM}" fill-opacity="0.78">bar blocking built in if you want them. Fully insured, Kendall.</text>
</svg>`

  await sharp({ create: { width: v.w, height: v.h, channels: 4, background: NAVY } })
    .composite([
      { input: art, top: v.artTop, left: Math.round((v.w - v.artW) / 2) },
      {
        input: { create: { width: v.w, height: v.h - v.footTop, channels: 4, background: NAVY } },
        top: v.footTop,
        left: 0,
      },
      {
        input: { create: { width: v.w, height: 4, channels: 4, background: ORANGE } },
        top: v.footTop,
        left: 0,
      },
      { input: typeLayer(svg), top: 0, left: 0 },
    ])
    .jpeg({ quality: 92, chromaSubsampling: "4:4:4" })
    .toFile(path.join(OUT, outfile))

  console.log("built", outfile)
}

await entryHeight(
  {
    w: 1080,
    h: 1350,
    head: 82,
    artCrop: { left: 0, top: 495, width: 1400, height: 956 },
    artW: 900,
    artTop: 440,
    footTop: 1060,
    y: { eyebrow: 224, h1: 316, h2: 400, foot1: 1130, foot2: 1172, foot3: 1232, foot4: 1272 },
  },
  "adC-entry-height-en-4x5.jpg",
)

/* ------------------------------------------------------------------ */
/* Ad D. PHOTO_Identity. The dignity angle, with a person in it        */
/* ------------------------------------------------------------------ */

/**
 * Two sourced findings drive this creative, not instinct:
 *
 * 1. The barrier is not price and it is not awareness. It is that the product
 *    LOOKS INSTITUTIONAL. Reporting on home-modification adoption is consistent
 *    that people read grab bars as "institutional" or "old" and avoid them
 *    until forced, and that stigma leaves them embarrassed to raise it at all.
 * 2. What moves people past it is normalisation and peer proof, framing the
 *    work as a proactive, sensible choice rather than a defeat. Fear framing
 *    triggers exactly the defence it needs to get past.
 *
 * That is the vault's IDENTITY angle, which it rates highest on share and save
 * rate and longest on lifespan. The whole competitive set sells fear: LJ Stone
 * runs a "Senior Bathroom Remodel Program" with a cartoon of an older woman,
 * American Bath & Shower sells an aging-in-place guide. Selling dignity instead
 * is the materially better hook the vault requires to enter a saturated angle.
 *
 * > [!danger] This is a MODEL, not a customer, and not a Broke & Fixed job.
 * > The landing page FAQ promises every photograph on the site is real work, so
 * > this image may never appear on the site, and no ad copy may present her as a
 * > customer or the room as one of ours. It is a mood image. That line is the
 * > whole reason using a generated person here is defensible.
 *
 * Same policy rule as adC: the copy describes the ROOM, never the viewer. No
 * age, no mobility, no health, no second person about ability.
 */
async function identityPhoto(v, outfile) {
  const photo = await crop(path.join(ROOT, v.file), v.src, { width: v.w, height: v.h })

  /* Type sits at the TOP, not over a bottom scrim. The flush tiled floor and
     the linear drain are the proof this ad is selling, and they live in the
     lower third. A bottom scrim covered exactly the thing that sells. */
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${v.w}" height="${v.h}">
  <defs>
    <linearGradient id="topwash" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${NAVY}" stop-opacity="0.95"/>
      <stop offset="0.62" stop-color="${NAVY}" stop-opacity="0.9"/>
      <stop offset="1" stop-color="${NAVY}" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect x="0" y="0" width="${v.w}" height="${v.washH}" fill="url(#topwash)"/>

  <text x="70" y="${v.y.eyebrow}" font-family="Montserrat" font-weight="700" font-size="23"
        letter-spacing="3.22" fill="${ORANGE}">${esc(v.eyebrow)}</text>

  <text x="70" y="${v.y.h1}" font-family="Barlow Condensed" font-weight="700" font-size="${v.head}"
        fill="${CREAM}">${esc(v.h1)}</text>
  <text x="70" y="${v.y.h2}" font-family="Barlow Condensed" font-weight="700" font-size="${v.head}"
        fill="${ORANGE}">${esc(v.h2)}</text>

  <rect x="0" y="${v.barTop}" width="${v.w}" height="${v.h - v.barTop}" fill="${NAVY}"/>
  <rect x="0" y="${v.barTop}" width="${v.w}" height="4" fill="${ORANGE}"/>
  <text x="70" y="${v.y.s1}" font-family="Inter" font-weight="500" font-size="22"
        fill="${CREAM}" fill-opacity="0.86">${esc(v.s1)} ${esc(v.s2)}</text>
  <text x="70" y="${v.y.trust}" font-family="Inter" font-weight="600" font-size="24"
        fill="${ORANGE}">${esc(v.trust)}</text>
</svg>`

  await sharp(photo)
    .composite([{ input: typeLayer(svg), top: 0, left: 0 }])
    .jpeg({ quality: 92, chromaSubsampling: "4:4:4" })
    .toFile(path.join(OUT, outfile))

  console.log("built", outfile)
}

const IDENTITY_BASE = {
  w: 1080,
  h: 1350,
  src: { left: 0, top: 0, width: 1400, height: 1750 },
  washH: 360,
  head: 66,
  barTop: 1216,
  y: { eyebrow: 118, h1: 196, h2: 264, s1: 1262, trust: 1310 },
}

await identityPhoto(
  {
    ...IDENTITY_BASE,
    file: "public/ads/generated/gen-4-identity-en.jpg",
    eyebrow: "TUB TO SHOWER · MIAMI-DADE",
    h1: "No step to climb over.",
    h2: "It still looks like a bathroom.",
    s1: "Nobody calls it aging in place when we are standing there.",
    s2: "They just call it smart.",
    trust: "Tub out, tiled walk-in shower in, from $4,500 · Kendall",
  },
  "adD-identity-en-4x5.jpg",
)

await identityPhoto(
  {
    ...IDENTITY_BASE,
    file: "public/ads/generated/gen-5-identity-es.jpg",
    eyebrow: "CONVERSIÓN DE BAÑERA A DUCHA · MIAMI-DADE",
    h1: "Sin pared que cruzar.",
    h2: "Y sigue pareciendo un baño.",
    s1: "Nadie lo llama envejecer en casa cuando estamos ahí parados.",
    s2: "Solo dicen que es inteligente.",
    trust: "Sale la bañera, entra la ducha de porcelanato, desde $4,500 · Kendall",
  },
  "adD-identity-es-4x5.jpg",
)
