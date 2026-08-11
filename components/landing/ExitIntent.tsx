"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { FilePdf, X } from "@phosphor-icons/react"

import { getLeadAttribution } from "@/lib/landing/attribution"
import { rescueGuideFromBrowser } from "@/lib/landing/guide-rescue"

/**
 * Exit intent, for the researcher who is six weeks out.
 *
 * The offer is a short planning guide, not a discount. This visitor is
 * not refusing to buy, they are refusing to buy today, and a coupon aimed at
 * them teaches them the published prices are soft. A document they can sit on
 * matches where they actually are.
 *
 * Rules this thing has to obey, because an exit popup that misfires is worse
 * than no exit popup:
 * - Once per session, sessionStorage guarded, set at open time not at submit.
 * - Nothing for the first 20 seconds. A modal in front of somebody still
 *   reading the headline is just a bounce with extra steps.
 * - On a phone it needs a hard scroll depth AND a fast flick upward. A person
 *   who lands, scrolls once and reaches for the back button must never see it.
 * - Escape, the X, and the backdrop all close it. Focus is trapped while it is
 *   open and goes back where it came from on close.
 *
 * Not portalled. It renders inside .lp so the scoped design tokens resolve, and
 * .lp sets no transform, so position: fixed still anchors to the viewport.
 */

const PHONE = "(786) 363-7039"
const TEL = "+17863637039"

/** Bump the suffix to re-show the modal to everybody after a copy change. */
const SESSION_KEY = "bf-exit-intent-v2"

/** Nothing fires before this. Measured from mount. */
const ARM_DELAY_MS = 20000

/** Phone triggers need this much page behind them before they count. */
const MIN_SCROLL_PX = 1200
const MIN_SCROLL_FRACTION = 0.3

/** A flick, not a scroll: this much upward travel inside one short burst. */
const FLICK_PX = 550
const FLICK_WINDOW_MS = 400
const FLICK_SPEED_PX_PER_MS = 0.7

/**
 * Engaged-idle, phones only. The flick catches the visitor leaving; this
 * catches the one who read deep into the page and then stalled, sitting on
 * the FAQ deciding nothing. Deep scroll plus long dwell plus a stretch of
 * silence is that person, and they are exactly who the price guide is for.
 */
const IDLE_DWELL_MS = 45000
const IDLE_SCROLL_FRACTION = 0.6
const IDLE_QUIET_MS = 10000

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'

type Status = "idle" | "invalid" | "sending" | "done" | "error"

export default function ExitIntent({ locale = "en" }: { locale?: string }) {
  const router = useRouter()
  const es = locale === "es"
  const t = (en: string, esText: string) => (es ? esText : en)
  const [open, setOpen] = useState(false)
  const [visible, setVisible] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<Status>("idle")

  const firedRef = useRef(false)
  const armedRef = useRef(false)
  const panelRef = useRef<HTMLDivElement | null>(null)
  const restoreRef = useRef<HTMLElement | null>(null)

  const trigger = useCallback(() => {
    if (firedRef.current) return
    firedRef.current = true
    try {
      sessionStorage.setItem(SESSION_KEY, "1")
    } catch {
      // Private mode or storage disabled. The in-memory ref still holds for
      // this page view, which is the part that matters.
    }
    const active = document.activeElement
    restoreRef.current =
      active instanceof HTMLElement && active !== document.body ? active : null
    setOpen(true)
    try {
      window.fbq?.("trackCustom", "planning_guide_open", {
        content_name: "tub-to-shower-planning-guide",
        lead_source: "exit-intent",
      })
      window.gtag?.("event", "planning_guide_open", {
        event_category: "conversion",
        content_name: "tub-to-shower-planning-guide",
        lead_source: "exit-intent",
      })
    } catch {
      /* Analytics cannot be allowed to block the guide. */
    }
  }, [])

  const close = useCallback(() => {
    setVisible(false)
    setOpen(false)
    const el = restoreRef.current
    if (el && document.contains(el)) {
      // After the dialog has unmounted, or the browser puts focus back on a
      // node that is on its way out. A timeout rather than a frame, because a
      // backgrounded tab stops running frames and a keyboard user coming back
      // to it would find focus dumped on the body.
      window.setTimeout(() => el.focus(), 0)
    }
  }, [])

  /* Reduced motion. Read once, then track, so the transition can be disabled
     rather than the whole component behaving differently. */
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReduceMotion(mq.matches)
    const onChange = (e: MediaQueryListEvent) => setReduceMotion(e.matches)
    mq.addEventListener("change", onChange)
    return () => mq.removeEventListener("change", onChange)
  }, [])

  /* Triggers. */
  useEffect(() => {
    try {
      if (sessionStorage.getItem(SESSION_KEY)) {
        firedRef.current = true
        return
      }
    } catch {
      // Storage unavailable. Fall through and rely on the ref.
    }

    const armTimer = window.setTimeout(() => {
      armedRef.current = true
    }, ARM_DELAY_MS)

    const finePointer = window.matchMedia("(pointer: fine)").matches

    // Desktop: cursor leaves the top edge of the document entirely.
    const onMouseOut = (e: MouseEvent) => {
      if (!armedRef.current || firedRef.current) return
      // relatedTarget is null only when the pointer left the window.
      if (e.relatedTarget) return
      if (e.clientY > 4) return
      trigger()
    }

    // Phone: a fast flick upward, deep into the page. Both halves are load
    // bearing. Depth alone catches somebody scrolling back to the pricing
    // table; speed alone catches somebody who just landed.
    let lastY = window.scrollY
    let lastT = performance.now()
    let maxY = lastY
    let upRun = 0
    let burstStart = lastT

    /*
     * Quiet-period check. Re-arms itself while the conditions are not met
     * yet, so somebody who goes idle at 30 seconds still gets checked at 45
     * without needing another scroll event to restart the clock.
     */
    const mountT = performance.now()
    let idleTimer = 0
    const checkIdle = () => {
      if (firedRef.current) return
      const scrollable = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1
      )
      if (
        armedRef.current &&
        performance.now() - mountT >= IDLE_DWELL_MS &&
        maxY >= scrollable * IDLE_SCROLL_FRACTION
      ) {
        trigger()
        return
      }
      idleTimer = window.setTimeout(checkIdle, IDLE_QUIET_MS)
    }

    const onScroll = () => {
      if (firedRef.current) return
      window.clearTimeout(idleTimer)
      idleTimer = window.setTimeout(checkIdle, IDLE_QUIET_MS)
      const y = window.scrollY
      const t = performance.now()
      const dy = y - lastY
      const dt = Math.max(t - lastT, 1)

      if (y > maxY) maxY = y

      if (dy < 0) {
        if (t - burstStart > FLICK_WINDOW_MS) {
          upRun = 0
          burstStart = t
        }
        upRun += -dy

        const scrollable = Math.max(
          document.documentElement.scrollHeight - window.innerHeight,
          1
        )
        const deepEnough =
          maxY >= MIN_SCROLL_PX && maxY >= scrollable * MIN_SCROLL_FRACTION

        if (
          armedRef.current &&
          deepEnough &&
          upRun >= FLICK_PX &&
          -dy / dt >= FLICK_SPEED_PX_PER_MS
        ) {
          trigger()
        }
      } else if (dy > 0) {
        upRun = 0
        burstStart = t
      }

      lastY = y
      lastT = t
    }

    if (finePointer) {
      document.addEventListener("mouseout", onMouseOut)
    } else {
      window.addEventListener("scroll", onScroll, { passive: true })
      idleTimer = window.setTimeout(checkIdle, IDLE_QUIET_MS)
    }

    return () => {
      window.clearTimeout(armTimer)
      window.clearTimeout(idleTimer)
      document.removeEventListener("mouseout", onMouseOut)
      window.removeEventListener("scroll", onScroll)
    }
  }, [trigger])

  /* Open behaviour: scroll lock, entrance, Escape, focus trap. */
  useEffect(() => {
    if (!open) return

    const panel = panelRef.current
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    /*
     * Entrance and focus. Belt and braces on purpose: a background tab stops
     * running requestAnimationFrame entirely, and on rAF alone the panel sits
     * at opacity 0 with the backdrop still eating clicks and the body still
     * scroll locked. An invisible modal that blocks the page is the worst
     * possible failure here, so a timeout races the frame and whichever lands
     * first wins.
     */
    let shown = false
    const show = () => {
      if (shown) return
      shown = true
      setVisible(true)
      // Focus the panel, not the input. Focusing the email field would throw a
      // keyboard over the whole modal on a phone before the visitor has read
      // a word of it.
      panel?.focus()
    }
    const raf = requestAnimationFrame(show)
    const showTimer = window.setTimeout(show, 60)

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault()
        e.stopPropagation()
        close()
        return
      }
      if (e.key !== "Tab" || !panel) return

      const items = Array.from(
        panel.querySelectorAll<HTMLElement>(FOCUSABLE)
      ).filter((el) => el.offsetParent !== null || el === document.activeElement)
      if (items.length === 0) {
        e.preventDefault()
        panel.focus()
        return
      }

      const first = items[0]
      const last = items[items.length - 1]
      const active = document.activeElement

      if (e.shiftKey) {
        if (active === first || active === panel || !panel.contains(active)) {
          e.preventDefault()
          last.focus()
        }
      } else if (active === last || !panel.contains(active)) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener("keydown", onKeyDown, true)

    return () => {
      cancelAnimationFrame(raf)
      window.clearTimeout(showTimer)
      document.removeEventListener("keydown", onKeyDown, true)
      document.body.style.overflow = prevOverflow
    }
  }, [open, close])

  /*
   * On success the form is replaced wholesale, so the submit button the visitor
   * was standing on unmounts and focus falls to the body, outside the dialog.
   * Pulling focus back to the panel keeps the trap intact and gets the new
   * title read out, since the panel is labelled by it.
   */
  useEffect(() => {
    if (status === "done") panelRef.current?.focus()
  }, [status])

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (status === "sending") return

    const value = email.trim()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
      setStatus("invalid")
      return
    }

    setStatus("sending")
    try {
      const attribution = getLeadAttribution()
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: value,
          source: "exit-intent",
          locale,
          page: "tub-to-shower",
          request: "planning-guide",
          attribution,
        }),
      })
      const data: { ok?: boolean } = await res.json().catch(() => ({}))
      if (!res.ok || !data.ok) {
        const rescued = await rescueGuideFromBrowser({
          email: value,
          locale,
          source: "exit-intent",
          attribution,
        })
        if (!rescued) throw new Error(`lead route responded ${res.status}`)
      }
      setStatus("done")
      try {
        window.sessionStorage.setItem(
          "bf-tub-shower-thanks-v1",
          JSON.stringify({ kind: "guide", email: value, createdAt: Date.now() }),
        )
      } catch {
        /* The download page does not depend on session storage. */
      }
      router.push(`/${es ? "es" : "en"}/landing/tub-to-shower/thank-you?kind=guide`)
    } catch {
      // The route may not exist yet, or the visitor may be offline. Either way
      // the lead does not get silently dropped: they get the phone number.
      setStatus("error")
    }
  }

  if (!open) return null

  const duration = reduceMotion ? "1ms" : "220ms"

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-5"
      style={{
        background: "rgba(15, 31, 53, 0.66)",
        opacity: visible ? 1 : 0,
        transition: `opacity ${duration} ease`,
      }}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) close()
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="bf-exit-title"
        aria-describedby="bf-exit-body"
        tabIndex={-1}
        className="relative max-h-[92dvh] w-full max-w-[520px] overflow-y-auto rounded-t-[6px] bg-white p-6 pt-14 text-left sm:rounded-[6px] sm:p-8 sm:pt-8"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible || reduceMotion ? "none" : "translateY(16px)",
          transition: `opacity ${duration} ease, transform ${duration} var(--lp-ease-out)`,
          outline: "none",
        }}
      >
        <button
          type="button"
          onClick={close}
          aria-label={t("Close", "Cerrar")}
          className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-[4px] text-[var(--lp-ink-2)] focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[var(--lp-navy)]"
        >
          <X size={24} weight="bold" aria-hidden="true" />
        </button>

        {status === "done" ? (
          <>
            <h2
              id="bf-exit-title"
              className="lp-display text-[1.7rem] text-[var(--lp-ink)]"
            >
              {t("Your guide is ready", "Su guía está lista")}
            </h2>
            <p
              id="bf-exit-body"
              className="mt-4 text-[17px] leading-relaxed text-[var(--lp-ink-2)]"
            >
              {t(
                `Open it now, or call or text ${PHONE} if you want help applying it to your bathroom.`,
                `Ábrala ahora, o llame o mande un texto al ${PHONE} si quiere ayuda para aplicarla a su baño.`,
              )}
            </p>
            <div className="mt-7 flex flex-wrap gap-4">
              <a
                href={`/guides/tub-to-shower-planning-guide-${es ? "es" : "en"}.pdf`}
                className="lp-cta"
              >
                {t("Open the guide", "Abrir la guía")}
              </a>
              <a href={`tel:${TEL}`} className="lp-cta">
                {t("Call", "Llame al")} {PHONE}
              </a>
              <button
                type="button"
                onClick={close}
                className="lp-display inline-flex min-h-[44px] items-center px-1 text-[1.15rem] text-[var(--lp-navy)] underline underline-offset-4 focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[var(--lp-navy)]"
              >
                {t("Back to the page", "Volver a la página")}
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="lp-label flex items-center gap-2 text-[var(--lp-orange-text)]">
              <FilePdf size={18} weight="fill" aria-hidden="true" />
              {t("Free 3 page guide", "Guía gratis de 3 páginas")}
            </p>

            <h2
              id="bf-exit-title"
              className="lp-display mt-3 text-[1.7rem] text-[var(--lp-ink)] sm:text-[2rem]"
            >
              {t(
                "Before you replace the tub, know what changes daily use.",
                "Antes de cambiar la bañera, vea qué mejora el uso diario.",
              )}
            </h2>

            <p
              id="bf-exit-body"
              className="mt-4 text-[17px] leading-relaxed text-[var(--lp-ink-2)]"
            >
              {t(
                "See the benefits of a walk-in shower, local starting figures, the details that move price, and a one-minute photo and measurement checklist.",
                "Vea los beneficios de una ducha, precios iniciales locales, los detalles que mueven el precio y una lista de fotos y medidas de un minuto.",
              )}
            </p>

            <form onSubmit={onSubmit} noValidate className="mt-6">
              <label
                htmlFor="bf-exit-email"
                className="block text-[16px] font-semibold text-[var(--lp-ink)]"
              >
                {t("Your email", "Su correo")}
              </label>
              {/* Border is ink-3, not lp-rule. lp-rule measures 1.34:1 on
                  white, which is fine for a decorative card edge and not fine
                  for the boundary of a form control, where WCAG 1.4.11 wants
                  3:1. ink-3 measures 5.35:1 and still reads as a normal input. */}
              <input
                id="bf-exit-email"
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  if (status === "invalid" || status === "error") {
                    setStatus("idle")
                  }
                }}
                aria-invalid={status === "invalid"}
                aria-describedby={
                  status === "invalid" || status === "error"
                    ? "bf-exit-error"
                    : undefined
                }
                placeholder={t("you@example.com", "usted@ejemplo.com")}
                className="mt-2 block h-[52px] w-full rounded-[4px] border-2 border-[var(--lp-ink-3)] bg-white px-4 text-[17px] text-[var(--lp-ink)] placeholder:text-[var(--lp-ink-3)] focus-visible:border-[var(--lp-navy)] focus-visible:outline-[3px] focus-visible:outline-offset-1 focus-visible:outline-[var(--lp-navy)]"
              />

              {(status === "invalid" || status === "error") && (
                <p
                  id="bf-exit-error"
                  role="alert"
                  className="mt-3 border-l-[3px] border-[var(--lp-orange-text)] pl-3 text-[16.5px] leading-relaxed text-[var(--lp-ink)]"
                >
                  {status === "invalid" ? (
                    t(
                      "That address does not look right. Check it and try again.",
                      "Ese correo no se ve bien. Revíselo e intente de nuevo.",
                    )
                  ) : (
                    <>
                      {t(
                        "That did not go through on our end. Call or text",
                        "Eso no pasó de nuestro lado. Llame o mande un texto al",
                      )}{" "}
                      <a
                        href={`tel:${TEL}`}
                        className="font-semibold text-[var(--lp-navy)] underline underline-offset-2"
                      >
                        {PHONE}
                      </a>{" "}
                      {t(
                        "and we will send the guide over directly.",
                        "y le enviamos la guía directamente.",
                      )}
                    </>
                  )}
                </p>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                /* No opacity fade on disabled. Dropping the CTA to 70% alpha
                   composites the label down to 3.00:1, which is a hair off the
                   large-text floor. The label change carries the state. */
                className="lp-cta mt-4 w-full disabled:cursor-wait"
              >
                {status === "sending"
                  ? t("Sending", "Enviando")
                  : t("Open my free planning guide", "Abrir mi guía gratis")}
              </button>
            </form>

            <p className="mt-4 text-[16px] leading-relaxed text-[var(--lp-ink-2)]">
              {t(
                "Instant access after you enter your email. We may send one follow-up about the guide. Unsubscribe anytime.",
                "Acceso inmediato después de escribir su correo. Es posible que enviemos un seguimiento sobre la guía. Puede cancelar cuando quiera.",
              )}
              {" "}
              <Link
                href={`/${es ? "es" : "en"}/privacy`}
                className="font-semibold text-[var(--lp-navy)] underline underline-offset-2"
              >
                {t("Privacy notice", "Aviso de privacidad")}
              </Link>
            </p>

            <button
              type="button"
              onClick={close}
              className="mt-4 inline-flex min-h-[44px] items-center text-[16px] text-[var(--lp-ink-2)] underline underline-offset-4 focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[var(--lp-navy)]"
            >
              {t("No thanks, I am just looking", "No gracias, solo estoy mirando")}
            </button>
          </>
        )}
      </div>
    </div>
  )
}
