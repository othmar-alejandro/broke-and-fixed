"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { CheckCircle, FilePdf } from "@phosphor-icons/react"

import { getLeadAttribution } from "@/lib/landing/attribution"

type Status = "idle" | "sending" | "error"

export default function GuideCapture({ locale = "en" }: { locale?: string }) {
  const router = useRouter()
  const es = locale === "es"
  const t = (en: string, esText: string) => (es ? esText : en)
  const [email, setEmail] = useState("")
  const [company, setCompany] = useState("")
  const [status, setStatus] = useState<Status>("idle")
  const [error, setError] = useState("")

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (status === "sending") return

    const value = email.trim()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
      setError(t("Check your email address and try again.", "Revise su correo e intente de nuevo."))
      setStatus("error")
      return
    }

    setStatus("sending")
    setError("")

    try {
      const attribution = getLeadAttribution()
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: value,
          company,
          source: "guide-inline",
          locale,
          request: "planning-guide",
          attribution,
        }),
      })
      const data: { ok?: boolean; error?: string } = await response.json().catch(() => ({}))
      if (!response.ok || !data.ok) {
        /*
         * No Web3Forms rescue here anymore. GoHighLevel is the single system
         * of record for this funnel as of 14 Aug 2026, and a guide opt-in that
         * exists only in an inbox is an opt-in the follow-up sequence cannot
         * see. The server logs GUIDE_RECOVERY when its write fails.
         */
        throw new Error(data.error || t("We could not open the guide just now.", "No pudimos abrir la guía en este momento."))
      }

      try {
        window.sessionStorage.setItem(
          "bf-tub-shower-thanks-v1",
          JSON.stringify({ kind: "guide", email: value, createdAt: Date.now() }),
        )
      } catch {
        /* The thank-you page still works without session storage. */
      }

      router.push(`/${es ? "es" : "en"}/landing/tub-to-shower/thank-you?kind=guide`)
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : t("We could not open the guide just now.", "No pudimos abrir la guía en este momento."),
      )
      setStatus("error")
    }
  }

  return (
    <section className="lp-guide" aria-labelledby="planning-guide-title">
      <div className="lp-wrap lp-guide__grid">
        <div className="lp-guide__photo">
          {/* Designed cover, not a job photo: the guide is a document, and a
              cover with the real logo reads like one. Art is the same flat
              navy and orange illustration family as the rest of the page;
              the logo is composited from the real asset, never AI-redrawn. */}
          <Image
            src={
              es
                ? "/landing/tub-to-shower/guide-cover-es.png"
                : "/landing/tub-to-shower/guide-cover-en.png"
            }
            alt={t(
              "Cover of the tub to shower planning guide for Miami-Dade",
              "Portada de la guía de planificación de bañera a ducha para Miami-Dade",
            )}
            fill
            sizes="(max-width: 767px) 100vw, 44vw"
            className="object-cover"
          />
          <span className="lp-guide__page">
            <FilePdf size={20} weight="fill" aria-hidden="true" />
            {t("3 page guide", "Guía de 3 páginas")}
          </span>
        </div>

        <div className="lp-guide__content">
          <h2 id="planning-guide-title" className="lp-display lp-h-arg">
            {t(
              "Not ready for a price range? Start with the planning guide.",
              "¿Todavía no quiere pedir un rango? Empiece con la guía.",
            )}
          </h2>
          <p className="mt-4 max-w-[52ch] text-[17px] leading-relaxed text-[var(--lp-ink-2)]">
            {t(
              "See how a walk-in shower changes daily use, what makes it easier to clean, what the three project levels include, and which bathroom details move the price.",
              "Vea cómo una ducha cambia el uso diario, qué la hace más fácil de limpiar, qué incluye cada nivel de trabajo y cuáles detalles del baño mueven el precio.",
            )}
          </p>

          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {[
              t("Safer entry and easier daily access", "Entrada más segura y mejor acceso diario"),
              t("Local starting figures and cost drivers", "Precios iniciales locales y factores de costo"),
              t("One-minute measurement checklist", "Lista de medidas de un minuto"),
              t("Photos to take before asking for a range", "Fotos que debe tomar antes de pedir un rango"),
            ].map((item) => (
              <li key={item} className="flex gap-2.5 text-[16px] text-[var(--lp-ink)]">
                <CheckCircle
                  size={20}
                  weight="fill"
                  className="mt-[2px] shrink-0 text-[var(--lp-green)]"
                  aria-hidden="true"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <form onSubmit={submit} noValidate className="mt-7">
            <label htmlFor="planning-guide-email" className="block text-[17px] font-semibold text-[var(--lp-ink)]">
              {t("Email address", "Correo electrónico")}
            </label>
            <div className="mt-2 flex flex-col gap-3 sm:flex-row">
              <input
                id="planning-guide-email"
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                required
                aria-invalid={status === "error" || undefined}
                aria-describedby={status === "error" ? "planning-guide-error" : "planning-guide-note"}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  if (status === "error") setStatus("idle")
                }}
                placeholder={t("you@example.com", "usted@ejemplo.com")}
                className="min-h-[52px] min-w-0 flex-1 rounded-[4px] border-2 border-[var(--lp-ink-3)] bg-white px-4 text-[17px] text-[var(--lp-ink)] placeholder:text-[var(--lp-ink-3)] focus-visible:border-[var(--lp-navy)] focus-visible:outline-[3px] focus-visible:outline-offset-1 focus-visible:outline-[var(--lp-navy)]"
              />
              <button type="submit" disabled={status === "sending"} className="lp-cta min-h-[52px] disabled:cursor-wait">
                {status === "sending"
                  ? t("Opening guide", "Abriendo la guía")
                  : t("Open my free guide", "Abrir mi guía gratis")}
              </button>
            </div>

            <div aria-hidden="true" className="pointer-events-none absolute -left-[9999px] h-px w-px overflow-hidden opacity-0">
              <label htmlFor="planning-guide-company">Company</label>
              <input
                id="planning-guide-company"
                name="company"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </div>

            {status === "error" ? (
              <p id="planning-guide-error" role="alert" className="mt-3 font-semibold text-[#8c1d18]">
                {error}
              </p>
            ) : null}

            <p id="planning-guide-note" className="mt-3 text-[14.5px] leading-relaxed text-[var(--lp-ink-2)]">
              {t(
                "Instant access after you enter your email. We may send one follow-up about the guide. Unsubscribe anytime.",
                "Acceso inmediato después de escribir su correo. Es posible que enviemos un seguimiento sobre la guía. Puede cancelar cuando quiera.",
              )}{" "}
              <Link href={`/${es ? "es" : "en"}/privacy`} className="font-semibold text-[var(--lp-navy)] underline underline-offset-2">
                {t("Privacy notice", "Aviso de privacidad")}
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}
