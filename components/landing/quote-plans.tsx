/**
 * Inline SVG floor plans for the tub-to-shower quote form.
 *
 * These are drawings, not photos, on purpose. A photo of someone else's
 * bathroom invites "mine does not look like that" and stalls the answer. A
 * top-down plan asks one question: how much floor is there around the tub.
 *
 * SCALE. All three step-one plans share one viewBox and one foot-to-unit
 * scale, so the master plan is genuinely bigger on screen than the alcove
 * plan. The size difference lands before anyone reads a label, which is the
 * whole point.
 *
 * COLOR. Every fill and stroke is applied through a class, never through a
 * presentation attribute containing var(). Presentation attributes resolve
 * custom properties inconsistently across engines, and a plan that renders
 * black on black on one browser is worse than no plan at all. Numeric
 * attributes such as strokeWidth are plain values, so those stay inline.
 */

/* ------------------------------------------------------------------ */
/* Shared geometry. One unit per inch and change would be clean but    */
/* fiddly to read, so: 16 user units per foot.                         */
/* ------------------------------------------------------------------ */

const FT = 16

/** Top-left corner of every room. The left gutter holds nothing; the tub
 *  dimension line lives inside the tub so the label can stay horizontal. */
const X0 = 26
const Y0 = 12

/** A standard alcove tub: 5 feet long, 2.5 feet deep. Same in all three. */
const TUB_W = 2.5 * FT // 40
const TUB_H = 5 * FT // 80

/**
 * Real room sizes, in feet, measured off jobs we have actually done.
 * ASSUMPTION on the exact figures, but the RATIOS are what matter here and
 * they are right: a master bathroom is not "a bit bigger", it is roughly
 * two and a half times the floor area of a five by eight alcove.
 */
const ROOMS = {
  "wall-to-wall": { w: 8 * FT, h: 5 * FT }, // 128 x 80
  "extra-space": { w: 8 * FT, h: 6.5 * FT }, // 128 x 104
  master: { w: 11 * FT, h: 9 * FT }, // 176 x 144
} as const

export type PlanVariant = keyof typeof ROOMS

/** Sized off the largest room plus a little air. Shared by all three. */
const PLAN_VIEWBOX = "0 0 214 168"

/* ------------------------------------------------------------------ */
/* Class vocabulary                                                    */
/* ------------------------------------------------------------------ */

const C = {
  floor: "fill-white",
  wall: "stroke-[var(--lp-navy)]",
  fixture: "fill-[var(--lp-cream)] stroke-[var(--lp-ink-2)]",
  fixtureLine: "stroke-[var(--lp-ink-2)] fill-none",
  door: "stroke-[var(--lp-ink-3)] fill-none",
  dim: "stroke-[var(--lp-orange)]",
  dimText: "fill-[var(--lp-orange-text)] font-bold",
  zone: "fill-[rgba(240,122,26,0.16)] stroke-[var(--lp-orange)]",
  zoneText: "fill-[var(--lp-orange-text)] font-bold",
  coverShower: "fill-[rgba(240,122,26,0.58)]",
  coverFloor: "fill-[rgba(240,122,26,0.20)]",
  coverFixture: "fill-[rgba(240,122,26,0.52)] stroke-[var(--lp-orange-deep)]",
}

/* ------------------------------------------------------------------ */
/* Pieces                                                              */
/* ------------------------------------------------------------------ */

/**
 * Walls are four separate segments rather than one rect, because the doorway
 * has to be a real gap in the wall. Painting a "gap" over a rect means
 * guessing the card background, and this component does not know it.
 */
function Walls({ w, h }: { w: number; h: number }) {
  const x1 = X0 + w
  const y1 = Y0 + h
  const doorStart = x1 - 2.5 * FT // 2.5 ft opening at the right end of the top wall

  return (
    <g className={C.wall} strokeWidth={2.6} strokeLinecap="square" fill="none">
      <line x1={X0} y1={Y0} x2={doorStart} y2={Y0} />
      <line x1={x1} y1={Y0} x2={x1} y2={y1} />
      <line x1={X0} y1={y1} x2={x1} y2={y1} />
      <line x1={X0} y1={Y0} x2={X0} y2={y1} />
    </g>
  )
}

/** Door leaf plus its swing, hinged at the left side of the top-wall gap. */
function Door({ w }: { w: number }) {
  const hinge = X0 + w - 2.5 * FT
  const r = 2.5 * FT

  return (
    <g className={C.door} strokeWidth={1.4}>
      <line x1={hinge} y1={Y0} x2={hinge} y2={Y0 + r} />
      <path d={`M ${hinge} ${Y0 + r} A ${r} ${r} 0 0 0 ${hinge + r} ${Y0}`} strokeDasharray="3 3" />
    </g>
  )
}

/** The tub, hard against the left wall, running the full 5 feet vertically. */
function Tub({ className = C.fixture }: { className?: string }) {
  return (
    <g>
      <rect
        x={X0}
        y={Y0}
        width={TUB_W}
        height={TUB_H}
        className={className}
        strokeWidth={1.6}
      />
      <rect
        x={X0 + 4}
        y={Y0 + 4}
        width={TUB_W - 8}
        height={TUB_H - 8}
        rx={6}
        className={C.fixtureLine}
        strokeWidth={1.2}
      />
      {/* Drain, pushed off the centre line so the dimension line stays clear */}
      <circle cx={X0 + 28} cy={Y0 + TUB_H - 12} r={3.4} className={C.fixtureLine} strokeWidth={1.2} />
    </g>
  )
}

/**
 * The measured length of the tub, wall to wall. Broken in the middle so the
 * label can sit horizontally: a rotated number is a thing only a draftsman
 * reads happily, and this audience is not draftsmen.
 */
function TubDimension({ label = "60 IN" }: { label?: string }) {
  // Dead centre of the tub. Off-centre reads as an accident, and at 11px the
  // label overhangs the left wall and gets visually clipped by it.
  const x = X0 + TUB_W / 2
  const top = Y0 + 2
  const bottom = Y0 + TUB_H - 2
  const gapTop = Y0 + 30
  const gapBottom = Y0 + 48

  return (
    <g>
      <g className={C.dim} strokeWidth={1.5} strokeLinecap="round">
        <line x1={x - 7} y1={top} x2={x + 7} y2={top} />
        <line x1={x - 7} y1={bottom} x2={x + 7} y2={bottom} />
        <line x1={x} y1={top} x2={x} y2={gapTop} />
        <line x1={x} y1={gapBottom} x2={x} y2={bottom} />
      </g>
      <text
        x={x}
        y={Y0 + 43}
        textAnchor="middle"
        fontSize={11}
        className={C.dimText}
      >
        {label}
      </text>
    </g>
  )
}

function Toilet({ x, wallY }: { x: number; wallY: number }) {
  return (
    <g className={C.fixture} strokeWidth={1.4}>
      <rect x={x} y={wallY - 7} width={16} height={7} rx={1.5} />
      <ellipse cx={x + 8} cy={wallY - 15} rx={7.5} ry={8} />
    </g>
  )
}

function Vanity({
  x,
  wallY,
  width,
  sinks = 1,
  className = C.fixture,
}: {
  x: number
  wallY: number
  width: number
  sinks?: number
  className?: string
}) {
  const depth = 1.5 * FT

  return (
    <g>
      <rect
        x={x}
        y={wallY - depth}
        width={width}
        height={depth}
        className={className}
        strokeWidth={1.5}
      />
      {Array.from({ length: sinks }, (_, i) => (
        <circle
          key={i}
          cx={x + (width * (i + 1)) / (sinks + 1)}
          cy={wallY - depth / 2}
          r={6.5}
          className={C.fixtureLine}
          strokeWidth={1.2}
        />
      ))}
    </g>
  )
}

/* ------------------------------------------------------------------ */
/* Step one: which room is yours                                       */
/* ------------------------------------------------------------------ */

/**
 * Decorative. Each card carries a real heading and a sentence of description,
 * so the drawing adds nothing for a screen reader and a long alt description
 * of a floor plan is noise between the question and the answer.
 */
export function BathroomPlan({
  variant,
  dimLabel = "60 IN",
  gapLabel = "GAP",
}: {
  variant: PlanVariant
  /** SVG text labels, localized by the caller. The drawing is aria-hidden,
      but sighted readers still read these two words. */
  dimLabel?: string
  gapLabel?: string
}) {
  const { w, h } = ROOMS[variant]
  const wallY = Y0 + h
  const rightX = X0 + w

  /*
   * Centre the room in the shared box rather than pinning it top-left. The
   * scale is identical either way, but pinned to a corner the small room reads
   * as "the bottom of this drawing failed to load". Centred, the empty margin
   * reads as what it is: the room is smaller.
   */
  const dx = (ROOMS.master.w - w) / 2
  const dy = (ROOMS.master.h - h) / 2

  return (
    <svg
      viewBox={PLAN_VIEWBOX}
      className="lp-plan mx-auto block h-auto w-full max-w-[300px]"
      aria-hidden="true"
      focusable="false"
    >
      <g transform={`translate(${dx} ${dy})`}>
      <rect x={X0} y={Y0} width={w} height={h} className={C.floor} />

      {/* The dashed zone is the entire reason this variant exists. */}
      {variant === "extra-space" && (
        <g>
          <rect
            x={X0}
            y={Y0 + TUB_H}
            width={TUB_W}
            height={h - TUB_H}
            className={C.zone}
            strokeWidth={1.6}
            strokeDasharray="5 4"
          />
          <text
            x={X0 + TUB_W / 2}
            y={Y0 + TUB_H + (h - TUB_H) / 2 + 4}
            textAnchor="middle"
            fontSize={10}
            className={C.zoneText}
          >
            {gapLabel}
          </text>
        </g>
      )}

      <Tub />
      <TubDimension label={dimLabel} />

      {variant === "master" ? (
        <>
          <Vanity x={X0 + 4.1 * FT} wallY={wallY} width={6.9 * FT} sinks={2} />
          <g className={C.fixture} strokeWidth={1.4}>
            {/* Held 2 units off the wall so the tank does not sit on top of
                the wall stroke and read as poking through it. */}
            <rect x={rightX - 9} y={Y0 + 4 * FT} width={7} height={16} rx={1.5} />
            <ellipse cx={rightX - 17} cy={Y0 + 4 * FT + 8} rx={8} ry={7.5} />
          </g>
        </>
      ) : (
        <>
          <Toilet x={X0 + 3.6 * FT} wallY={wallY} />
          <Vanity x={rightX - 2.9 * FT} wallY={wallY} width={2.9 * FT} />
        </>
      )}

      <Walls w={w} h={h} />
      <Door w={w} />
      </g>
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/* Step two: how much of it are we doing                               */
/* ------------------------------------------------------------------ */

/**
 * One plan, three amounts of orange. Deliberately the SAME room in all three
 * cards: step two is about scope, and changing the room shape as well would
 * make the reader work out which variable moved.
 *
 * Cropped tighter than the step-one plans because there is no cross-card size
 * comparison to preserve here, so the drawing may as well be bigger.
 */
const SCOPE_VIEWBOX = "18 4 144 96"

export type ScopeCoverage = "shower-only" | "shower-floor" | "full-remodel"

export function ScopePlan({ level }: { level: ScopeCoverage }) {
  const { w, h } = ROOMS["wall-to-wall"]
  const wallY = Y0 + h
  const rightX = X0 + w
  const showsFloor = level === "shower-floor" || level === "full-remodel"
  const showsFixtures = level === "full-remodel"

  return (
    <svg
      viewBox={SCOPE_VIEWBOX}
      className="lp-plan mx-auto block h-auto w-full max-w-[300px]"
      aria-hidden="true"
      focusable="false"
    >
      <rect x={X0} y={Y0} width={w} height={h} className={C.floor} />

      {/* Floor coverage sits under everything else so fixtures stay legible */}
      {showsFloor && (
        <rect
          x={X0 + TUB_W}
          y={Y0}
          width={w - TUB_W}
          height={h}
          className={C.coverFloor}
        />
      )}

      {/* The new shower stands exactly where the tub was */}
      <Tub className={`${C.coverShower} stroke-[var(--lp-orange-deep)]`} />

      <Toilet x={X0 + 3.6 * FT} wallY={wallY} />
      <Vanity
        x={rightX - 2.9 * FT}
        wallY={wallY}
        width={2.9 * FT}
        className={showsFixtures ? C.coverFixture : C.fixture}
      />
      {showsFixtures && (
        <g className={C.coverFixture} strokeWidth={1.4}>
          <rect x={X0 + 3.6 * FT} y={wallY - 7} width={16} height={7} rx={1.5} />
          <ellipse cx={X0 + 3.6 * FT + 8} cy={wallY - 15} rx={7.5} ry={8} />
        </g>
      )}

      <Walls w={w} h={h} />
      <Door w={w} />
    </svg>
  )
}
