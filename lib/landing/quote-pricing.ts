/**
 * Pricing model for the tub-to-shower quote form.
 *
 * Single source of truth for the numbers the form shows and the numbers the
 * API route writes into the CRM. Form and server call the same pure function,
 * so a visitor can never see one figure and have a different one land in
 * GoHighLevel.
 *
 * THE MODEL, owner decision 11 Aug 2026.
 *
 * A standard alcove tub is about 60 inches long and 30 to 32 deep in nearly
 * every house we work in, so the shower that replaces it barely varies. That
 * is why a starting price can be published at all. What actually moves the
 * number is how much of the ROOM is in scope, which is what the three scope
 * levels measure, plus whatever we find behind the wall.
 *
 * So the form shows a STARTING PRICE, the same language the pricing cards use,
 * not a computed range. The old range multiplied the published price by an
 * invented spread, which dressed an assumption up as precision.
 *
 * A bigger master bathroom is not priced here at all. Those rooms usually have
 * a tub separate from the shower, which makes the job a different job: a tiled
 * platform to demo, a different wet area to rebuild. It gets measured, and the
 * form says exactly that instead of inventing a figure.
 *
 * PROVENANCE. Every constant is tagged. Do not add a number without a tag, and
 * do not change an OWNER-CONFIRMED number without the owner saying so, because
 * those figures are the ones running in the ads.
 */

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

export const BATHROOM_LAYOUTS = [
  "wall-to-wall",
  "extra-space",
  "master",
] as const

/**
 * What the bathroom looks like around the tub. The variable that moves the
 * price is the SPACE, not the fixtures.
 */
export type BathroomLayout = (typeof BATHROOM_LAYOUTS)[number]

/** How much of the bathroom is in scope. */
export type ScopeLevel = "shower-only" | "shower-floor" | "full-remodel"

/* ------------------------------------------------------------------ */
/* Constants                                                           */
/* ------------------------------------------------------------------ */

/**
 * OWNER-CONFIRMED. The three published starting prices. They appear in the ad
 * copy, in the pricing section of the landing page, in the FAQ and in the
 * guide PDF. If any of these change, all of those change on the same day.
 */
export const BASE_PRICE: Record<ScopeLevel, number> = {
  "shower-only": 4500,
  // Lowered from 7500 on owner instruction, 8 Aug 2026.
  "shower-floor": 6500,
  // Lowered from 10500 on owner instruction, 8 Aug 2026.
  "full-remodel": 9500,
}

/**
 * Layouts that CAN be priced from the published table.
 *
 * wall-to-wall is pinned at exactly 1.00 on purpose. A visitor with a standard
 * five foot alcove has to land on the published number and nothing else, or
 * the form contradicts the ad that brought them here.
 *
 * extra-space is OWNER-DERIVED. On 8 Aug 2026 the owner set shower-floor to
 * $6,500 wall to wall and $7,500 with extra space. 7500 / 6500 = 1.1538, so
 * 1.15 is the multiplier those two numbers imply and it reproduces them
 * exactly once rounded to the nearest $100.
 *
 * `master` is deliberately ABSENT. It is not a multiplier we are unsure of, it
 * is a job we decline to price sight unseen. See requiresMeasure below.
 */
const LAYOUT_MULTIPLIER: Record<"wall-to-wall" | "extra-space", number> = {
  "wall-to-wall": 1.0,
  "extra-space": 1.15,
}

/** Displayed money is always on a $100 boundary. Nobody quotes $6,527. */
const ROUND_TO = 100

/* ------------------------------------------------------------------ */
/* Functions                                                           */
/* ------------------------------------------------------------------ */

function roundToNearest(value: number, step: number): number {
  return Math.round(value / step) * step
}

/**
 * True when the room has to be measured before any number is honest.
 *
 * Today that is only the larger master bathroom, where the tub is usually
 * separate from the shower and removing it means demoing a tiled platform.
 */
export function requiresMeasure(layout: BathroomLayout): boolean {
  return !(layout in LAYOUT_MULTIPLIER)
}

/**
 * Pure. Same inputs, same outputs, no clock, no environment, no I/O.
 *
 * Returns the published starting price for this combination, or null when the
 * layout has to be measured first. Null is a real answer here, not a failure.
 */
export function startingPrice(
  layout: BathroomLayout,
  scope: ScopeLevel,
): number | null {
  if (requiresMeasure(layout)) return null
  const multiplier =
    LAYOUT_MULTIPLIER[layout as "wall-to-wall" | "extra-space"]
  return roundToNearest(BASE_PRICE[scope] * multiplier, ROUND_TO)
}

/** "$7,500". No cents: this is a starting price, cents would imply precision. */
export function formatUSD(value: number): string {
  return `$${Math.round(value).toLocaleString("en-US")}`
}

/* ------------------------------------------------------------------ */
/* Guards. Used by the API route so untrusted POST bodies cannot widen  */
/* the type and index the tables above with something unexpected.       */
/* ------------------------------------------------------------------ */

export const SCOPE_LEVELS = Object.keys(BASE_PRICE) as ScopeLevel[]

export function isBathroomLayout(value: unknown): value is BathroomLayout {
  return (
    typeof value === "string" &&
    (BATHROOM_LAYOUTS as readonly string[]).includes(value)
  )
}

export function isScopeLevel(value: unknown): value is ScopeLevel {
  return typeof value === "string" && value in BASE_PRICE
}

/**
 * Human labels. Shared by the form and by the CRM payload so the sales side
 * reads the same words the customer clicked, not a slug they have to decode.
 * These stay ENGLISH in the CRM regardless of the visitor's language.
 */
export const LAYOUT_LABEL: Record<BathroomLayout, string> = {
  "wall-to-wall": "Tub sits wall to wall",
  "extra-space": "Extra space at one end",
  master: "Larger master bathroom, measure required",
}

export const SCOPE_LABEL: Record<ScopeLevel, string> = {
  "shower-only": "Tub out, shower in",
  "shower-floor": "Shower and floor",
  "full-remodel": "Full remodel",
}
