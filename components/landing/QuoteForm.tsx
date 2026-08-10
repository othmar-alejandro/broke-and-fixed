"use client"

import { useEffect, useId, useRef, useState } from "react"
import type { FormEvent, ReactNode, RefObject } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion, useReducedMotion } from "framer-motion"
import type { Transition } from "framer-motion"
import { CheckCircle, Phone } from "@phosphor-icons/react"

import { BathroomPlan, ScopePlan } from "@/components/landing/quote-plans"
import { getLeadAttribution, type LeadAttribution } from "@/lib/landing/attribution"
import {
  BASE_PRICE,
  computeRange,
  formatRange,
  formatUSD,
  type BathroomLayout,
  type QuoteRange,
  type ScopeLevel,
} from "@/lib/landing/quote-pricing"

/**
 * Three step quote form for the tub-to-shower landing page.
 *
 * Shape of the thing: two picture questions that anyone can answer from the
 * doorway of their own bathroom, then contact details, then a real computed
 * range. The two picture questions come first on purpose. Asking for a phone
 * number before giving anything back is the pattern every one of our
 * competitors uses and it is why their forms convert badly.
 *
 * The result screen is deliberately flat. No confetti, no "congratulations,
 * your quote is ready". A range is not a prize and pretending otherwise is
 * how you get a homeowner who feels lied to on measuring day.
 *
 * Mounts inside the page's .lp-dark section, so the panel paints its own light
 * ground and sets every colour explicitly. Do not use .lp-muted inside this
 * component: .lp-dark redefines it to a pale blue that vanishes on cream.
 */

/* ------------------------------------------------------------------ */
/* Content. Every string carries English and Spanish side by side via   */
/* the same t("en", "es") pattern the page uses. Do not add a string    */
/* without both languages.                                              */
/* ------------------------------------------------------------------ */

type T = (en: string, esText: string) => string

function layoutOptions(t: T): {
  id: BathroomLayout
  title: string
  body: string
}[] {
  return [
    {
      id: "wall-to-wall",
      title: t("Tub sits wall to wall", "La bañera va de pared a pared"),
      body: t(
        "The tub fills the whole end of the room. No gap at either end of it.",
        "La bañera llena todo el extremo del cuarto. Sin espacio a ningún lado.",
      ),
    },
    {
      id: "extra-space",
      title: t("There is a gap at one end", "Hay un espacio en un extremo"),
      body: t(
        "A ledge, a shelf, or a strip of open floor at one end of the tub.",
        "Una repisa, un borde o una franja de piso libre en un extremo de la bañera.",
      ),
    },
    {
      id: "master",
      title: t("Bigger master bathroom", "Baño principal más grande"),
      body: t(
        "Open floor to walk around in and a longer vanity, often two sinks.",
        "Piso libre para caminar y un vanity más largo, muchas veces con dos lavamanos.",
      ),
    },
  ]
}

function scopeOptions(t: T): {
  id: ScopeLevel
  title: string
  body: string
  featured: boolean
}[] {
  return [
    {
      id: "shower-only",
      title: t("Tub out, shower in", "Sale la bañera, entra la ducha"),
      body: t(
        "Your floor, vanity and toilet stay as they are.",
        "Su piso, su vanity y su inodoro quedan como están.",
      ),
      featured: false,
    },
    {
      id: "shower-floor",
      title: t("Shower and floor", "Ducha y piso"),
      body: t(
        "New porcelain floor through the whole bathroom, plus baseboard and paint.",
        "Piso de porcelanato nuevo en todo el baño, más zócalo y pintura.",
      ),
      featured: true,
    },
    {
      id: "full-remodel",
      title: t("Full remodel", "Remodelación completa"),
      body: t(
        "New vanity, new toilet, lighting and paint. The whole room at once.",
        "Vanity e inodoro nuevos, iluminación y pintura. El cuarto entero de una vez.",
      ),
      featured: false,
    },
  ]
}

/**
 * Result-screen display labels. The CRM keeps receiving the English labels
 * from quote-pricing's LAYOUT_LABEL and SCOPE_LABEL regardless of what the
 * visitor saw, so the sales side always reads one language.
 */
function layoutDisplay(t: T): Record<BathroomLayout, string> {
  return {
    "wall-to-wall": t("Tub sits wall to wall", "Bañera de pared a pared"),
    "extra-space": t("Extra space at one end", "Espacio extra en un extremo"),
    master: t("Larger master bathroom", "Baño principal más grande"),
  }
}

function scopeDisplay(t: T): Record<ScopeLevel, string> {
  return {
    "shower-only": t("tub out, shower in", "sale la bañera, entra la ducha"),
    "shower-floor": t("shower and floor", "ducha y piso"),
    "full-remodel": t("full remodel", "remodelación completa"),
  }
}

const TOTAL_STEPS = 3

/* ------------------------------------------------------------------ */
/* Tracking. Every call is guarded: an ad blocker removing fbq must    */
/* never be able to stop a lead from submitting.                       */
/* ------------------------------------------------------------------ */

function trackPixel(event: string, params: Record<string, unknown>): void {
  try {
    window.fbq?.("track", event, params)
  } catch {
    /* analytics is never load bearing */
  }
}

function trackPixelCustom(event: string, params: Record<string, unknown>): void {
  try {
    window.fbq?.("trackCustom", event, params)
  } catch {
    /* analytics is never load bearing */
  }
}

function trackGa(event: string, params: Record<string, unknown>): void {
  try {
    window.gtag?.("event", event, params)
  } catch {
    /* analytics is never load bearing */
  }
}

/* ------------------------------------------------------------------ */
/* Lead rescue                                                         */
/* ------------------------------------------------------------------ */

const WEB3FORMS_URL = "https://api.web3forms.com/submit"
/* Not a secret. This exact key already ships in a public hidden input on the
   contact form and the service pages, so using it here exposes nothing new. */
const WEB3FORMS_KEY = "ebb39c28-f927-4916-be94-71a448167ae6"

/**
 * Runs only when /api/lead has already failed.
 *
 * Web3Forms sits behind Cloudflare, which serves an interstitial to
 * server-side POSTs, so the API route's own fallback returns 403. From the
 * browser it goes through, which is how the rest of this site submits.
 * Without this tier a failed request loses the lead entirely.
 */
async function rescueLeadFromBrowser(payload: {
  name: string
  phone: string
  zip: string
  email: string
  layout: string
  scope: string
  locale: string
  attribution: LeadAttribution
}): Promise<boolean> {
  try {
    const response = await fetch(WEB3FORMS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: WEB3FORMS_KEY,
        subject: `Tub to shower lead: ${payload.name}, ${payload.zip}`,
        from_name: "Broke and Fixed tub to shower page",
        name: payload.name,
        phone: payload.phone,
        zip: payload.zip,
        email: payload.email || "not provided",
        bathroom_layout: payload.layout,
        scope_level: payload.scope,
        language: payload.locale,
        utm_source: payload.attribution.utmSource,
        utm_medium: payload.attribution.utmMedium,
        utm_campaign: payload.attribution.utmCampaign,
        utm_content: payload.attribution.utmContent,
        fbclid: payload.attribution.fbclid,
        landing_page: payload.attribution.landingPage,
        note: "Recovered in the browser after the API route failed.",
      }),
    })
    return response.ok
  } catch {
    return false
  }
}

/* ------------------------------------------------------------------ */
/* Validation                                                          */
/* ------------------------------------------------------------------ */

type FieldName = "name" | "phone" | "zip" | "email"
type Errors = Partial<Record<FieldName, string>>

function validate(values: Record<FieldName, string>, t: T): Errors {
  const errors: Errors = {}

  if (values.name.trim().length < 2) {
    errors.name = t("Please tell us your name.", "Díganos su nombre, por favor.")
  }

  const digits = values.phone.replace(/\D/g, "")
  if (digits.length === 0) {
    errors.phone = t(
      "We need a phone number to text you the range.",
      "Necesitamos un teléfono para mandarle el rango por texto.",
    )
  } else if (digits.length !== 10 && !(digits.length === 11 && digits.startsWith("1"))) {
    errors.phone = t(
      "That does not look like a 10 digit phone number.",
      "Eso no parece un teléfono de 10 dígitos.",
    )
  }

  if (!/^\d{5}$/.test(values.zip.trim())) {
    errors.zip = t(
      "Please enter your 5 digit ZIP code.",
      "Escriba su código ZIP de 5 dígitos.",
    )
  }

  const email = values.email.trim()
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    errors.email = t(
      "That email address does not look right.",
      "Ese correo no se ve bien.",
    )
  }

  return errors
}

/* ------------------------------------------------------------------ */
/* Pieces                                                              */
/* ------------------------------------------------------------------ */

/**
 * A radio dressed as a card. The input stays a real radio and stays in the
 * accessibility tree, so arrow keys move between options, the group announces
 * itself, and voice control can say the label out loud.
 *
 * The checked styling is driven from React state rather than peer-checked,
 * because peer-* only reaches siblings of the input and the pieces that need
 * to change here are nested. The focus ring IS peer driven, since that span is
 * a direct sibling.
 */
function ChoiceCard({
  name,
  value,
  checked,
  onSelect,
  title,
  body,
  badge,
  price,
  priceIntro = "From",
  children,
}: {
  name: string
  value: string
  checked: boolean
  onSelect: () => void
  title: string
  body: string
  badge?: string
  price?: string
  /** The word before the price, localized by the caller. */
  priceIntro?: string
  children: ReactNode
}) {
  return (
    <label className="relative block h-full cursor-pointer">
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onSelect}
        className="peer sr-only"
      />
      <span
        className={[
          "flex h-full flex-col rounded-[4px] border-2 bg-white p-3 text-left transition-colors duration-150",
          "peer-focus-visible:outline peer-focus-visible:outline-[3px] peer-focus-visible:outline-offset-[3px] peer-focus-visible:outline-[var(--lp-navy)]",
          checked
            ? "border-[var(--lp-orange)] bg-[rgba(240,122,26,0.07)]"
            : "border-[var(--lp-rule)]",
        ].join(" ")}
      >
        {badge ? (
          <span className="lp-label mb-2 self-start rounded-[3px] bg-[var(--lp-orange)] px-2 py-1 text-[var(--lp-on-orange)]">
            {badge}
          </span>
        ) : null}

        <span className="block overflow-hidden rounded-[3px] bg-white">
          {children}
        </span>

        <span className="mt-3 flex items-start gap-2">
          <span
            aria-hidden="true"
            className={[
              "mt-[3px] grid h-[22px] w-[22px] shrink-0 place-items-center rounded-full border-2 transition-colors duration-150",
              checked
                ? "border-[var(--lp-orange)] bg-[var(--lp-orange)]"
                : "border-[var(--lp-ink-3)] bg-white",
            ].join(" ")}
          >
            {checked ? (
              <CheckCircle
                size={16}
                weight="fill"
                className="text-[var(--lp-on-orange)]"
              />
            ) : null}
          </span>
          <span className="block">
            <span className="block text-[17px] font-semibold leading-snug text-[var(--lp-ink)]">
              {title}
            </span>
            {price ? (
              <span className="mt-1 block text-[17px] font-bold text-[var(--lp-orange-text)]">
                {priceIntro} {price}
              </span>
            ) : null}
            <span className="mt-1 block text-[15.5px] leading-snug text-[var(--lp-ink-2)]">
              {body}
            </span>
          </span>
        </span>
      </span>
    </label>
  )
}

function Field({
  id,
  label,
  hint,
  value,
  onChange,
  error,
  type = "text",
  inputMode,
  autoComplete,
  required = true,
  optionalLabel = "optional",
  inputRef,
}: {
  id: string
  label: string
  hint?: string
  value: string
  onChange: (next: string) => void
  error?: string
  type?: string
  inputMode?: "text" | "tel" | "numeric" | "email"
  autoComplete?: string
  required?: boolean
  /** The little word next to a non-required label, localized by the caller. */
  optionalLabel?: string
  inputRef?: RefObject<HTMLInputElement | null>
}) {
  const errorId = `${id}-error`
  const hintId = `${id}-hint`
  const describedBy = [hint ? hintId : null, error ? errorId : null]
    .filter(Boolean)
    .join(" ")

  return (
    <div>
      {/* Label above the input, always. A placeholder that disappears the
          moment someone starts typing is not a label, and this audience is
          filling this in one handed on a phone. */}
      <label
        htmlFor={id}
        className="block text-[17px] font-semibold text-[var(--lp-ink)]"
      >
        {label}
        {!required ? (
          <span className="ml-2 text-[15px] font-normal text-[var(--lp-ink-2)]">
            {optionalLabel}
          </span>
        ) : null}
      </label>

      {hint ? (
        <p id={hintId} className="mt-1 text-[15px] text-[var(--lp-ink-2)]">
          {hint}
        </p>
      ) : null}

      <input
        id={id}
        ref={inputRef}
        type={type}
        inputMode={inputMode}
        autoComplete={autoComplete}
        required={required}
        aria-required={required || undefined}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy || undefined}
        className={[
          "mt-2 block min-h-[52px] w-full rounded-[4px] border-2 bg-white px-3 text-[17px] text-[var(--lp-ink)]",
          "focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[2px] focus-visible:outline-[var(--lp-navy)]",
          error ? "border-[#b3261e]" : "border-[var(--lp-rule)]",
        ].join(" ")}
      />

      {/* Error sits BELOW the field it belongs to, where the eye already is
          after typing, not above it where it reads as a heading. */}
      {error ? (
        <p
          id={errorId}
          role="alert"
          className="mt-2 text-[15.5px] font-semibold text-[#b3261e]"
        >
          {error}
        </p>
      ) : null}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Form                                                                */
/* ------------------------------------------------------------------ */

export type QuoteFormProps = {
  /** Display phone, used on the fallback and result calls to action. */
  phone?: string
  /** tel: href target for the same. */
  tel?: string
  /** "en" or "es". Every visible string in here carries both languages. */
  locale?: string
  className?: string
}

export default function QuoteForm({
  phone = "(786) 363-7039",
  tel = "+17863637039",
  locale = "en",
  className = "",
}: QuoteFormProps) {
  const router = useRouter()
  const uid = useId()
  const reduceMotion = useReducedMotion()
  const es = locale === "es"
  const t: T = (en, esText) => (es ? esText : en)

  const [step, setStep] = useState<1 | 2 | 3 | "result">(1)
  const [layout, setLayout] = useState<BathroomLayout | null>(null)
  const [scope, setScope] = useState<ScopeLevel | null>(null)

  const [values, setValues] = useState<Record<FieldName, string>>({
    name: "",
    phone: "",
    zip: "",
    email: "",
  })
  /** Honeypot. Kept in state like any other field so it posts naturally. */
  const [company, setCompany] = useState("")

  const [errors, setErrors] = useState<Errors>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [result, setResult] = useState<QuoteRange | null>(null)
  const [progressLoaded, setProgressLoaded] = useState(false)

  const startedRef = useRef(false)
  const nameRef = useRef<HTMLInputElement | null>(null)
  const phoneRef = useRef<HTMLInputElement | null>(null)
  const zipRef = useRef<HTMLInputElement | null>(null)
  const emailRef = useRef<HTMLInputElement | null>(null)

  const refs: Record<FieldName, RefObject<HTMLInputElement | null>> = {
    name: nameRef,
    phone: phoneRef,
    zip: zipRef,
    email: emailRef,
  }

  /** Preview shown live on step two and again on the result screen. */
  const preview = layout && scope ? computeRange(layout, scope) : null

  /*
   * Resume only anonymous project choices. Names, phone numbers and emails stay
   * in React memory until the visitor deliberately submits the form.
   */
  useEffect(() => {
    try {
      const raw = window.sessionStorage.getItem("bf-tub-shower-quote-progress-v1")
      if (raw) {
        const saved = JSON.parse(raw) as {
          layout?: BathroomLayout
          scope?: ScopeLevel
          step?: number
        }
        if (["wall-to-wall", "extra-space", "master"].includes(saved.layout ?? "")) {
          setLayout(saved.layout ?? null)
        }
        if (["shower-only", "shower-floor", "full-remodel"].includes(saved.scope ?? "")) {
          setScope(saved.scope ?? null)
        }
        if (saved.step === 2 || saved.step === 3) setStep(saved.step)
      }
    } catch {
      /* Progress recovery is optional. */
    } finally {
      setProgressLoaded(true)
    }
  }, [])

  useEffect(() => {
    if (!progressLoaded || step === "result") return
    try {
      window.sessionStorage.setItem(
        "bf-tub-shower-quote-progress-v1",
        JSON.stringify({ layout, scope, step }),
      )
    } catch {
      /* Progress recovery is optional. */
    }
  }, [layout, progressLoaded, scope, step])

  /**
   * Fires once, on the very first card click. Without it the funnel starts at
   * "submitted" and step one dropoff is invisible, which is the number most
   * worth knowing on a page like this.
   */
  function markStarted() {
    if (startedRef.current) return
    startedRef.current = true
    trackPixelCustom("form_start", { content_name: "tub-to-shower" })
    trackGa("form_start", {
      event_category: "conversion",
      content_name: "tub-to-shower",
    })
  }

  function goTo(next: 1 | 2 | 3 | "result") {
    setStep(next)
    if (next !== "result") {
      trackPixelCustom("form_step", { content_name: "tub-to-shower", step: next })
      trackGa("form_step", {
        event_category: "conversion",
        content_name: "tub-to-shower",
        step: next,
      })
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (submitting || !layout || !scope) return

    const nextErrors = validate(values, t)
    setErrors(nextErrors)

    const firstBad = (["name", "phone", "zip", "email"] as FieldName[]).find(
      (f) => nextErrors[f],
    )
    if (firstBad) {
      refs[firstBad].current?.focus()
      return
    }

    setSubmitError(null)
    setSubmitting(true)

    try {
      const attribution = getLeadAttribution()
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          company, // honeypot, empty for every real person
          layout,
          scope,
          locale,
          attribution,
        }),
      })

      const data: { ok?: boolean; range?: QuoteRange | null; error?: string } =
        await response.json().catch(() => ({}))

      if (!response.ok || !data.ok) {
        /*
         * Last line of defence, and it has to be here rather than on the
         * server. Web3Forms sits behind Cloudflare, which serves an
         * interstitial to server-side POSTs, so the API route's fallback
         * returns 403 and the lead would exist only as a log line.
         *
         * From the browser it works: the rest of this site already submits
         * to Web3Forms exactly this way. The access key is not a secret and
         * is not being newly exposed, it is already in a public hidden input
         * on the contact form and the service pages.
         */
        const rescued = await rescueLeadFromBrowser({
          ...values,
          layout,
          scope,
          locale,
          attribution,
          phone,
        })

        if (!rescued) {
          throw new Error(
            data.error ??
              t(
                `We could not send that just now. Please call or text ${phone}.`,
                `No pudimos enviarlo en este momento. Llame o mande un texto al ${phone}.`,
              ),
          )
        }
      }

      /*
       * Trust the server's range over the local one. Both call the same pure
       * function, so they agree today, but if they ever diverge the number in
       * the CRM is the number we are accountable for.
       */
      const finalRange = data.range ?? computeRange(layout, scope)
      setResult(finalRange)

      trackPixel("Lead", {
        content_name: "tub-to-shower",
        bathroom_layout: layout,
        scope_level: scope,
        value: finalRange.low,
        currency: "USD",
      })
      trackGa("generate_lead", {
        event_category: "conversion",
        content_name: "tub-to-shower",
        bathroom_layout: layout,
        scope_level: scope,
        value: finalRange.low,
        currency: "USD",
      })

      try {
        window.sessionStorage.setItem(
          "bf-tub-shower-thanks-v1",
          JSON.stringify({
            kind: "quote",
            range: finalRange,
            layout,
            scope,
            createdAt: Date.now(),
          }),
        )
        window.sessionStorage.removeItem("bf-tub-shower-quote-progress-v1")
      } catch {
        /* The result still renders inline if navigation cannot complete. */
      }

      goTo("result")
      router.push(`/${es ? "es" : "en"}/landing/tub-to-shower/thank-you?kind=quote`)
    } catch (err) {
      // Everything the visitor typed is still in state and still on screen.
      // Losing a filled form on a network blip is how you lose the lead.
      setSubmitError(
        err instanceof Error
          ? err.message
          : t(
              `We could not send that just now. Please call or text ${phone}.`,
              `No pudimos enviarlo en este momento. Llame o mande un texto al ${phone}.`,
            ),
      )
    } finally {
      setSubmitting(false)
    }
  }

  /* ---- motion ---------------------------------------------------- */

  const transition: Transition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.28, ease: [0.23, 1, 0.32, 1] }

  /*
   * The outgoing step is removed immediately and only the incoming one
   * animates. No AnimatePresence, no exit, deliberately.
   *
   * AnimatePresence mode="wait" holds the next step back until the previous
   * one has finished animating out, and an animation that never finishes
   * therefore blocks the form forever. That is not hypothetical: background
   * the tab mid transition and the WAAPI animation stalls part way, leaving a
   * half faded step 2 on screen with step 3 never mounted. On a page this one
   * is buying traffic for, no animation is allowed to be able to strand the
   * content behind it. Same rule Reveal.tsx follows.
   */
  /*
   * Transform only. No opacity in the step transition, on purpose.
   *
   * A fade from 0 means that for 280ms the only thing keeping the step visible
   * is an animation finishing. Background the tab in that window and the
   * animation throttles with the inline style parked at opacity 0, which is
   * one dropped animation away from a visitor returning to a blank panel.
   * Measured, not theoretical: with the pane hidden the animation clock
   * advanced 22ms in several seconds of wall time.
   *
   * This audience walks off to go look at their actual bathroom mid form, on
   * phones that freeze background tabs hard. A slide degrades to "content
   * sitting 20px to the right", which nobody will ever notice. A fade degrades
   * to nothing on screen.
   */
  const enter = reduceMotion ? false : { x: 20 }

  const stepNumber = step === "result" ? TOTAL_STEPS : step
  const progressPct =
    step === "result" ? 100 : Math.round(((step - 1) / TOTAL_STEPS) * 100) + 8

  /* ---- render ---------------------------------------------------- */

  return (
    <div
      className={`rounded-[4px] bg-[var(--lp-cream)] p-5 text-[17px] text-[var(--lp-ink)] sm:p-7 ${className}`}
    >
      {/* Progress. Two readings of the same fact: a number for people who
          want the number, a bar for people who want the shape. */}
      <div className="mb-6">
        <div className="flex items-baseline justify-between">
          <p className="lp-label text-[var(--lp-ink-3)]">
            {step === "result"
              ? t("Done", "Listo")
              : t(
                  `Step ${stepNumber} of ${TOTAL_STEPS}`,
                  `Paso ${stepNumber} de ${TOTAL_STEPS}`,
                )}
          </p>
          {step !== "result" && preview && step === 2 ? (
            <p className="text-[15.5px] font-semibold text-[var(--lp-ink-2)]">
              {formatRange(preview)}
            </p>
          ) : null}
        </div>
        <div
          className="mt-2 h-2 w-full overflow-hidden rounded-full bg-[var(--lp-rule)]"
          role="progressbar"
          aria-valuemin={1}
          aria-valuemax={TOTAL_STEPS}
          aria-valuenow={stepNumber}
          aria-label={t("Quote form progress", "Progreso del formulario")}
        >
          <div
            className="h-full rounded-full bg-[var(--lp-orange)] transition-[width] duration-300 ease-out motion-reduce:transition-none"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {/* Announces the step change to a screen reader without stealing focus */}
      <p className="sr-only" aria-live="polite">
        {step === "result"
          ? t("Your estimated range is ready.", "Su rango estimado está listo.")
          : t(
              `Step ${stepNumber} of ${TOTAL_STEPS}`,
              `Paso ${stepNumber} de ${TOTAL_STEPS}`,
            )}
      </p>

      <motion.div
        key={String(step)}
        initial={enter}
        animate={{ x: 0 }}
        transition={transition}
      >
          {/* ---------------- Step 1 ---------------- */}
          {step === 1 && (
            <fieldset className="border-0 p-0">
              <legend className="lp-display mb-1 text-[1.7rem] text-[var(--lp-ink)] sm:text-[2.1rem]">
                {t(
                  "Which one looks like your bathroom?",
                  "¿Cuál se parece a su baño?",
                )}
              </legend>
              <p className="mb-4 text-[16.5px] text-[var(--lp-ink-2)]">
                {t(
                  "Looking down at the room from above. What matters is the space around the tub, not the fixtures.",
                  "El cuarto visto desde arriba. Lo que importa es el espacio alrededor de la bañera, no los muebles.",
                )}
              </p>

              <div className="grid gap-3 sm:grid-cols-3">
                {layoutOptions(t).map((option) => (
                  <ChoiceCard
                    key={option.id}
                    name={`${uid}-layout`}
                    value={option.id}
                    checked={layout === option.id}
                    onSelect={() => {
                      markStarted()
                      setLayout(option.id)
                    }}
                    title={option.title}
                    body={option.body}
                  >
                    <BathroomPlan
                      variant={option.id}
                      dimLabel={t("60 IN", "60 PULG")}
                      gapLabel={t("GAP", "ESPACIO")}
                    />
                  </ChoiceCard>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  className="lp-cta min-h-[52px]"
                  style={layout ? undefined : CTA_DISABLED}
                  disabled={!layout}
                  onClick={() => goTo(2)}
                >
                  {t("Continue", "Continuar")}
                </button>
                {!layout ? (
                  <span className="text-[15.5px] text-[var(--lp-ink-2)]">
                    {t(
                      "Pick the one closest to yours.",
                      "Elija el más parecido al suyo.",
                    )}
                  </span>
                ) : null}
              </div>
            </fieldset>
          )}

          {/* ---------------- Step 2 ---------------- */}
          {step === 2 && (
            <fieldset className="border-0 p-0">
              <legend className="lp-display mb-1 text-[1.7rem] text-[var(--lp-ink)] sm:text-[2.1rem]">
                {t(
                  "How much of the bathroom are we doing?",
                  "¿Cuánto del baño vamos a hacer?",
                )}
              </legend>
              <p className="mb-4 text-[16.5px] text-[var(--lp-ink-2)]">
                {t(
                  "Orange is what we touch. Prices are starting points for a standard size room.",
                  "Lo naranja es lo que tocamos. Los precios son puntos de partida para un cuarto de tamaño estándar.",
                )}
              </p>

              <div className="grid gap-3 sm:grid-cols-3">
                {scopeOptions(t).map((option) => (
                  <ChoiceCard
                    key={option.id}
                    name={`${uid}-scope`}
                    value={option.id}
                    checked={scope === option.id}
                    onSelect={() => {
                      markStarted()
                      setScope(option.id)
                    }}
                    title={option.title}
                    body={option.body}
                    price={formatUSD(BASE_PRICE[option.id])}
                    priceIntro={t("From", "Desde")}
                    badge={
                      option.featured ? t("Most chosen", "El más elegido") : undefined
                    }
                  >
                    <ScopePlan level={option.id} />
                  </ChoiceCard>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  className="lp-cta min-h-[52px]"
                  style={scope ? undefined : CTA_DISABLED}
                  disabled={!scope}
                  onClick={() => goTo(3)}
                >
                  {t("Continue", "Continuar")}
                </button>
                <BackButton onClick={() => goTo(1)} label={t("Back", "Atrás")} />
              </div>
            </fieldset>
          )}

          {/* ---------------- Step 3 ---------------- */}
          {step === 3 && (
            <form onSubmit={handleSubmit} noValidate>
              <h3 className="lp-display mb-1 text-[1.7rem] text-[var(--lp-ink)] sm:text-[2.1rem]">
                {t("Where do we send it?", "¿A dónde se lo mandamos?")}
              </h3>
              <p className="mb-5 text-[16.5px] text-[var(--lp-ink-2)]">
                {t(
                  "Your range is ready. We text it over and we do not pass your number to anybody else.",
                  "Su rango está listo. Se lo mandamos por texto y no pasamos su número a nadie más.",
                )}
              </p>

              <div className="grid gap-5">
                <Field
                  id={`${uid}-name`}
                  label={t("Your name", "Su nombre")}
                  value={values.name}
                  onChange={(next) => setValues((v) => ({ ...v, name: next }))}
                  error={errors.name}
                  autoComplete="name"
                  inputRef={nameRef}
                />
                <Field
                  id={`${uid}-phone`}
                  label={t("Phone number", "Número de teléfono")}
                  hint={t(
                    "So we can text you the range.",
                    "Para mandarle el rango por texto.",
                  )}
                  type="tel"
                  inputMode="tel"
                  value={values.phone}
                  onChange={(next) => setValues((v) => ({ ...v, phone: next }))}
                  error={errors.phone}
                  autoComplete="tel"
                  inputRef={phoneRef}
                />
                <Field
                  id={`${uid}-zip`}
                  label={t("ZIP code", "Código postal (ZIP)")}
                  hint={t(
                    "Tells us if you are inside our service area.",
                    "Nos dice si está dentro de nuestra área de servicio.",
                  )}
                  inputMode="numeric"
                  value={values.zip}
                  onChange={(next) => setValues((v) => ({ ...v, zip: next }))}
                  error={errors.zip}
                  autoComplete="postal-code"
                  inputRef={zipRef}
                />
                <Field
                  id={`${uid}-email`}
                  label={t("Email", "Correo electrónico")}
                  optionalLabel={t("optional", "opcional")}
                  type="email"
                  inputMode="email"
                  value={values.email}
                  onChange={(next) => setValues((v) => ({ ...v, email: next }))}
                  error={errors.email}
                  autoComplete="email"
                  required={false}
                  inputRef={emailRef}
                />
              </div>

              {/*
                Honeypot. Off screen rather than display:none, because some bots
                skip fields that are not rendered. tabIndex -1 and aria-hidden
                keep every real person, keyboard or screen reader, away from it.
              */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -left-[9999px] h-px w-px overflow-hidden opacity-0"
              >
                <label htmlFor={`${uid}-company`}>Company</label>
                <input
                  id={`${uid}-company`}
                  name="company"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                />
              </div>

              {submitError ? (
                <p
                  role="alert"
                  className="mt-5 rounded-[4px] border-2 border-[#b3261e] bg-[#fdf3f2] p-3 text-[16px] font-semibold text-[#8c1d18]"
                >
                  {submitError}{" "}
                  <a href={`tel:${tel}`} className="underline underline-offset-2">
                    {t("Call", "Llame al")} {phone}
                  </a>
                </p>
              ) : null}

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button
                  type="submit"
                  className="lp-cta min-h-[52px]"
                  style={submitting ? CTA_DISABLED : undefined}
                  disabled={submitting}
                >
                  {submitting
                    ? t("Sending your answers", "Enviando sus respuestas")
                    : t("See my price range", "Ver mi rango de precio")}
                </button>
                <BackButton
                  onClick={() => goTo(2)}
                  disabled={submitting}
                  label={t("Back", "Atrás")}
                />
              </div>

              <p className="mt-4 text-[15.5px] text-[var(--lp-ink-2)]">
                {t(
                  "By selecting See my price range, you ask us to call or text about this project. Message and data rates may apply. Reply STOP to end texts. Consent is not a condition of purchase.",
                  "Al seleccionar Ver mi rango de precio, nos pide que le llamemos o escribamos sobre este proyecto. Pueden aplicar cargos de mensajes y datos. Responda STOP para terminar los textos. El consentimiento no es una condición de compra.",
                )}
                {" "}
                <Link
                  href={`/${es ? "es" : "en"}/privacy`}
                  className="font-semibold text-[var(--lp-navy)] underline underline-offset-2"
                >
                  {t("Privacy notice", "Aviso de privacidad")}
                </Link>
              </p>
            </form>
          )}

          {/* ---------------- Result ---------------- */}
          {step === "result" && result ? (
            <div>
              <p className="lp-label text-[var(--lp-ink-3)]">
                {layout ? layoutDisplay(t)[layout] : ""}
                {layout && scope ? t(" and ", " y ") : ""}
                {scope ? scopeDisplay(t)[scope] : ""}
              </p>

              <p className="lp-display mt-2 text-[2.4rem] leading-none text-[var(--lp-ink)] sm:text-[3.2rem]">
                {formatRange(result)}
              </p>

              {/*
                The honest paragraph, in the largest type on the screen after
                the number itself. It is the reason this form is allowed to
                show a number at all.
              */}
              <p className="mt-4 max-w-[52ch] text-[17px] text-[var(--lp-ink)]">
                {t(
                  "This is a range, not a quote. We measure before we commit to a number, and we would rather tell you now than surprise you later.",
                  "Esto es un rango, no una cotización. Medimos antes de comprometernos con un número, y preferimos decírselo ahora que sorprenderlo después.",
                )}
              </p>

              <p className="mt-4 max-w-[52ch] text-[17px] font-semibold text-[var(--lp-ink)]">
                {t(
                  "One of us will text you shortly. Me or my brother.",
                  "Uno de los dos le escribe en breve. Mi hermano o yo.",
                )}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a href={`tel:${tel}`} className="lp-cta min-h-[52px]">
                  <Phone size={19} weight="fill" aria-hidden="true" />
                  {t("Call", "Llame al")} {phone}
                </a>
              </div>

              <p className="mt-5 text-[15.5px] text-[var(--lp-ink-2)]">
                {t(
                  "What moves the number: the size of the room, the tile you pick, and what we find behind the wall. Cast iron drain lines in older homes are the usual one.",
                  "Lo que mueve el número: el tamaño del cuarto, el azulejo que escoja y lo que encontremos detrás de la pared. Las líneas de desagüe de hierro fundido en casas viejas son lo más común.",
                )}
              </p>
            </div>
          ) : null}
      </motion.div>
    </div>
  )
}

/**
 * Disabled styling for .lp-cta, applied inline rather than through a class.
 *
 * landing.css is imported as a plain stylesheet, so its rules are UNLAYERED,
 * while every Tailwind utility lives in @layer utilities. Unlayered beats
 * layered in the cascade no matter how specific the layered selector is, so
 * `disabled:bg-[...]` silently loses to `.lp-cta { background: ... }` and the
 * button keeps sitting there looking like a live call to action. Verified in
 * the browser, not assumed. An inline style is outside the layer system and
 * is the one thing that reliably wins here.
 */
const CTA_DISABLED = {
  background: "var(--lp-rule)",
  color: "var(--lp-ink-3)",
  cursor: "not-allowed",
} as const

/** Plain, quiet, and still a 52px target. Back is not a call to action. */
function BackButton({
  onClick,
  disabled = false,
  label = "Back",
}: {
  onClick: () => void
  disabled?: boolean
  label?: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="inline-flex min-h-[52px] items-center rounded-[4px] px-3 text-[17px] font-semibold text-[var(--lp-ink-2)] underline underline-offset-4 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[2px] focus-visible:outline-[var(--lp-navy)] disabled:opacity-50"
    >
      {label}
    </button>
  )
}
