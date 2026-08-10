import type { CSSProperties, ReactNode } from "react"

/**
 * Scroll reveal, CSS only. No JavaScript, no IntersectionObserver.
 *
 * Why not framer-motion whileInView: that ships opacity:0 in the server HTML
 * and relies on an observer to undo it. If JS fails, an extension interferes,
 * or the observer is throttled, whole sections stay invisible. On a paid
 * lead-gen page that means a visitor sees nothing and the click is wasted.
 *
 * Here the content is visible by default. The animation only applies where
 * scroll-driven animations are supported and the visitor has not asked for
 * reduced motion, so it is purely additive. Firefox just shows the content.
 *
 * Motive for the motion: hierarchy. Sections land a beat after entering, which
 * keeps the eye moving down a long page.
 */
export default function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode
  /** Stagger in seconds. Shifts the scroll range rather than timing out. */
  delay?: number
  className?: string
}) {
  // Convert a seconds-style delay into a scroll-range offset so siblings
  // resolve in sequence instead of all at once.
  const offset = Math.round(delay * 100)

  return (
    <div
      className={`lp-reveal ${className}`}
      style={{ "--lp-reveal-offset": `${offset}%` } as CSSProperties}
    >
      {children}
    </div>
  )
}
