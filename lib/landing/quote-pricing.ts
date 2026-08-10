/**
 * Pricing model for the tub-to-shower quote form.
 *
 * This file is the single source of truth for the numbers the form shows and
 * the numbers the API route writes into the CRM. The form and the server both
 * call `computeRange`, so a visitor can never be shown one range and have a
 * different one land in GoHighLevel.
 *
 * PROVENANCE. Every constant below is tagged. Do not add a number here without
 * a tag, and do not change an OWNER-CONFIRMED number without the owner saying
 * so, because those three figures are the ones running in the ads.
 */

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

/**
 * What the bathroom looks like around the tub. The variable that actually
 * moves the price is the SPACE, not the fixtures: a tub sitting wall to wall
 * in a five foot alcove is a different demo, different waterproofing area and
 * different tile count than the same tub with three feet of open floor beside
 * it.
 */
export type BathroomLayout = "wall-to-wall" | "extra-space" | "master"

/** How much of the bathroom is in scope. */
export type ScopeLevel = "shower-only" | "shower-floor" | "full-remodel"

export type QuoteRange = {
  /** Bottom of the band, rounded to the nearest $100. */
  low: number
  /** Top of the band, rounded to the nearest $100. */
  high: number
  /** Pre-rounding floor. Kept for debugging and for CRM notes. */
  rawFloor: number
}

/* ------------------------------------------------------------------ */
/* Constants                                                           */
/* ------------------------------------------------------------------ */

/**
 * OWNER-CONFIRMED. These three are the published starting prices. They appear
 * in the ad copy, in the pricing section of the landing page and in the FAQ.
 * If any of these change, the ads and the page copy change on the same day.
 */
export const BASE_PRICE: Record<ScopeLevel, number> = {
  "shower-only": 4500,
  // Lowered from 7500 on owner instruction, 8 Aug 2026.
  "shower-floor": 6500,
  // Lowered from 10500 on owner instruction, 8 Aug 2026.
  "full-remodel": 9500,
}

/**
 * extra-space is OWNER-DERIVED. On 8 Aug 2026 the owner set shower-floor to
 * $6,500 wall to wall and $7,500 with extra space. 7500 / 6500 = 1.1538, so
 * 1.15 is the multiplier those two numbers imply, and it reproduces them
 * exactly once rounded to the nearest $100.
 *
 * master is STILL AN ASSUMPTION and has not been checked against a closed job.
 *
 * wall-to-wall is pinned at exactly 1.00 on purpose. A visitor with a standard
 * five foot alcove has to land on the published number and nothing else, or
 * the form contradicts the ad that brought them here.
 */
export const LAYOUT_MULTIPLIER: Record<BathroomLayout, number> = {
  "wall-to-wall": 1.0,
  "extra-space": 1.15,
  master: 1.45,
}

/**
 * ASSUMPTION. Width of the band above the floor, as a fraction.
 *
 * 0.22 is wide enough to survive the usual surprises (cast iron drain line, an
 * out of square wall, a subfloor that needs work) without being so wide that
 * the range stops meaning anything. A range nobody believes is worse than no
 * range at all.
 */
export const SPREAD = 0.22

/** Displayed money is always on a $100 boundary. Nobody quotes $6,527. */
const ROUND_TO = 100

/* ------------------------------------------------------------------ */
/* Functions                                                           */
/* ------------------------------------------------------------------ */

function roundToNearest(value: number, step: number): number {
  return Math.round(value / step) * step
}

/**
 * Pure. Same inputs, same outputs, no clock, no environment, no I/O.
 *
 * The high end is computed from the UNROUNDED floor and rounded once at the
 * end, so rounding never compounds. With wall-to-wall the multiplier is 1.00,
 * so the floor is the published price exactly and rounding is a no-op on it.
 */
export function computeRange(
  layout: BathroomLayout,
  scope: ScopeLevel,
): QuoteRange {
  const rawFloor = BASE_PRICE[scope] * LAYOUT_MULTIPLIER[layout]

  return {
    low: roundToNearest(rawFloor, ROUND_TO),
    high: roundToNearest(rawFloor * (1 + SPREAD), ROUND_TO),
    rawFloor,
  }
}

/** "$7,500". No cents: this is a range, and cents would imply precision. */
export function formatUSD(value: number): string {
  return `$${Math.round(value).toLocaleString("en-US")}`
}

/** "$7,500 to $9,200". The word "to", never a dash. House style. */
export function formatRange(range: QuoteRange): string {
  return `${formatUSD(range.low)} to ${formatUSD(range.high)}`
}

/* ------------------------------------------------------------------ */
/* Guards. Used by the API route so untrusted POST bodies cannot widen  */
/* the type and index the tables above with something unexpected.       */
/* ------------------------------------------------------------------ */

export const BATHROOM_LAYOUTS = Object.keys(
  LAYOUT_MULTIPLIER,
) as BathroomLayout[]

export const SCOPE_LEVELS = Object.keys(BASE_PRICE) as ScopeLevel[]

export function isBathroomLayout(value: unknown): value is BathroomLayout {
  return typeof value === "string" && value in LAYOUT_MULTIPLIER
}

export function isScopeLevel(value: unknown): value is ScopeLevel {
  return typeof value === "string" && value in BASE_PRICE
}

/**
 * Human labels. Shared by the form and by the CRM payload so the sales side
 * reads the same words the customer clicked, not a slug they have to decode.
 */
export const LAYOUT_LABEL: Record<BathroomLayout, string> = {
  "wall-to-wall": "Tub sits wall to wall",
  "extra-space": "Extra space at one end",
  master: "Larger master bathroom",
}

export const SCOPE_LABEL: Record<ScopeLevel, string> = {
  "shower-only": "Tub out, shower in",
  "shower-floor": "Shower and floor",
  "full-remodel": "Full remodel",
}
