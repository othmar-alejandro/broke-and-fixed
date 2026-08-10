"use client"

import { useCallback, useEffect, useRef } from "react"
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from "framer-motion"
import { CaretLeft, CaretRight } from "@phosphor-icons/react/dist/ssr"
import type { ReactNode } from "react"

/**
 * Drag-to-compare before/after.
 *
 * The split percentage is a motion value, not React state, so dragging does not
 * re-render the tree on every pointer frame. aria-valuenow is written straight
 * to the DOM from a subscription for the same reason.
 *
 * Motive for the interaction: this is the single most persuasive thing on the
 * page, and making the visitor drag it themselves is what makes the change land.
 */
export default function BeforeAfter({
  before,
  after,
  caption,
  beforeLabel = "Before",
  afterLabel = "After",
  handleAriaLabel = "Drag to compare before and after",
  valueTextTemplate = "{pct}% of the before photo showing",
}: {
  before: ReactNode
  after: ReactNode
  caption: string
  /** Badge and aria strings, passed in so the page can localize them. The
      template carries a literal "{pct}" that gets replaced with the number;
      a function prop cannot cross the server/client boundary. */
  beforeLabel?: string
  afterLabel?: string
  handleAriaLabel?: string
  valueTextTemplate?: string
}) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const handleRef = useRef<HTMLButtonElement>(null)
  const dragging = useRef(false)

  const pct = useMotionValue(50)

  // Before layer is clipped from the right as the handle moves left.
  const beforeClip = useMotionTemplate`inset(0 calc(100% - ${pct}%) 0 0)`
  const dividerLeft = useMotionTemplate`${pct}%`
  // The 48px handle is clamped to its own radius so it never leaves the
  // figure at the extremes. Unclamped it either gets clipped in half (with
  // overflow hidden) or widens the document (without). The divider line
  // stays exact; only the knob stops short.
  const handleLeft = useMotionTemplate`clamp(24px, ${pct}%, calc(100% - 24px))`

  // The labels track what is actually visible. At the extremes only one photo
  // is on screen, and a badge naming the hidden one would be lying.
  const beforeBadgeOpacity = useTransform(pct, [0, 12], [0, 1])
  const afterBadgeOpacity = useTransform(pct, [88, 100], [1, 0])

  const setFromClientX = useCallback((clientX: number) => {
    const el = wrapRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    if (r.width === 0) return
    const next = ((clientX - r.left) / r.width) * 100
    pct.set(Math.min(100, Math.max(0, next)))
  }, [pct])

  // Keep the accessible value in sync without re-rendering. aria-valuenow is
  // also set statically in the JSX so the SSR HTML is valid before hydration.
  useEffect(() => {
    const write = (v: number) => {
      const r = Math.round(v)
      handleRef.current?.setAttribute("aria-valuenow", String(r))
      handleRef.current?.setAttribute(
        "aria-valuetext",
        valueTextTemplate.replace("{pct}", String(r))
      )
    }
    write(pct.get())
    return pct.on("change", write)
  }, [pct, valueTextTemplate])

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true
    e.currentTarget.setPointerCapture?.(e.pointerId)
    setFromClientX(e.clientX)
  }
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return
    setFromClientX(e.clientX)
  }
  const endDrag = () => {
    dragging.current = false
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    const step = e.shiftKey ? 10 : 4
    if (e.key === "ArrowLeft") {
      pct.set(Math.max(0, pct.get() - step))
      e.preventDefault()
    } else if (e.key === "ArrowRight") {
      pct.set(Math.min(100, pct.get() + step))
      e.preventDefault()
    } else if (e.key === "Home") {
      pct.set(0)
      e.preventDefault()
    } else if (e.key === "End") {
      pct.set(100)
      e.preventDefault()
    }
  }

  return (
    <figure className="m-0">
      <div
        ref={wrapRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        className="relative w-full touch-pan-y select-none rounded-[4px]"
        style={{ cursor: "ew-resize" }}
      >
        {/* After sits underneath and is revealed as the handle moves left */}
        <div className="[&_*]:pointer-events-none">{after}</div>

        <motion.div
          className="absolute inset-0 [&_*]:pointer-events-none"
          style={{ clipPath: beforeClip, WebkitClipPath: beforeClip }}
        >
          {before}
        </motion.div>

        <motion.div
          className="pointer-events-none absolute inset-y-0 z-10 w-[3px] bg-white shadow-[0_0_0_1px_rgba(15,31,53,0.35)]"
          style={{ left: dividerLeft }}
        />

        <motion.button
          ref={handleRef}
          type="button"
          role="slider"
          aria-label={handleAriaLabel}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={50}
          aria-valuetext={valueTextTemplate.replace("{pct}", "50")}
          onKeyDown={onKeyDown}
          className="absolute top-1/2 z-20 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 grid-flow-col place-items-center gap-0 rounded-full border-2 border-white bg-[var(--lp-orange)] text-[var(--lp-on-orange)] shadow-[0_2px_12px_rgba(15,31,53,0.45)] transition-transform duration-[140ms] ease-[cubic-bezier(0.23,1,0.32,1)] focus-visible:shadow-[0_0_0_3px_#fff,0_0_0_6px_var(--lp-navy)] focus-visible:outline-none active:scale-110"
          style={{ left: handleLeft }}
        >
          {/* Opposing carets say "drag me sideways". The previous glyph was
              U+22EE, which reads as an overflow menu, not a drag handle. */}
          <CaretLeft size={13} weight="bold" aria-hidden="true" />
          <CaretRight size={13} weight="bold" aria-hidden="true" />
        </motion.button>

        <motion.span
          className="lp-label pointer-events-none absolute left-3 top-3 z-10 rounded-[3px] bg-[rgba(15,31,53,0.78)] px-2 py-1 text-white"
          style={{ opacity: beforeBadgeOpacity }}
        >
          {beforeLabel}
        </motion.span>
        <motion.span
          className="lp-label pointer-events-none absolute right-3 top-3 z-10 rounded-[3px] bg-[var(--lp-orange)] px-2 py-1 text-[var(--lp-on-orange)]"
          style={{ opacity: afterBadgeOpacity }}
        >
          {afterLabel}
        </motion.span>
      </div>

      <figcaption className="mt-3 text-[15px] text-[var(--lp-ink-2)]">
        {caption}
      </figcaption>
    </figure>
  )
}
