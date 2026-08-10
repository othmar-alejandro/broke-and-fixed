"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { CheckCircle, DownloadSimple, Phone } from "@phosphor-icons/react"

import { formatRange, type QuoteRange } from "@/lib/landing/quote-pricing"

const PHONE = "(786) 363-7039"
const TEL = "+17863637039"

type ThankYouState = {
  kind?: "guide" | "quote"
  range?: QuoteRange
  createdAt?: number
}

export default function ThankYouContent({
  locale = "en",
  requestedKind = "guide",
}: {
  locale?: string
  requestedKind?: "guide" | "quote"
}) {
  const es = locale === "es"
  const t = (en: string, esText: string) => (es ? esText : en)
  const [saved, setSaved] = useState<ThankYouState>({ kind: requestedKind })

  useEffect(() => {
    try {
      const raw = window.sessionStorage.getItem("bf-tub-shower-thanks-v1")
      if (!raw) return
      const parsed = JSON.parse(raw) as ThankYouState
      if (parsed.kind === requestedKind) setSaved(parsed)
    } catch {
      /* The page has complete fallback copy without saved browser state. */
    }
  }, [requestedKind])

  const kind = saved.kind ?? requestedKind
  const guideHref = `/guides/tub-to-shower-planning-guide-${es ? "es" : "en"}.pdf`

  return (
    <main className="min-h-screen bg-[var(--lp-paper)] text-[var(--lp-ink)]">
      <div className="lp-wrap py-10 sm:py-16">
        <Link
          href={`/${es ? "es" : "en"}/landing/tub-to-shower`}
          className="inline-flex items-center gap-3"
        >
          <Image src="/logo-160.webp" alt="Broke & Fixed Home Solutions" width={46} height={46} />
          <span className="lp-display text-[1.15rem] text-[var(--lp-navy)]">
            Broke &amp; Fixed Home Solutions
          </span>
        </Link>

        <div className="mt-10 grid overflow-hidden rounded-[6px] border border-[var(--lp-rule)] bg-white shadow-[0_18px_55px_rgba(15,31,53,0.10)] md:grid-cols-[1.05fr_0.95fr]">
          <div className="p-6 sm:p-10 lg:p-12">
            <p className="lp-label flex items-center gap-2 text-[var(--lp-green)]">
              <CheckCircle size={22} weight="fill" aria-hidden="true" />
              {t("Step 3 of 3", "Paso 3 de 3")}
            </p>

            {kind === "quote" ? (
              <>
                <h1 className="lp-display mt-4 text-[2.45rem] leading-[0.98] sm:text-[3.5rem]">
                  {t("Your bathroom details are in.", "Ya recibimos los datos de su baño.")}
                </h1>
                {saved.range ? (
                  <div className="mt-7 rounded-[5px] bg-[var(--lp-navy-deep)] p-5 text-white">
                    <p className="text-[15px] font-semibold uppercase tracking-[0.12em] text-white/70">
                      {t("Your planning range", "Su rango de planificación")}
                    </p>
                    <p className="lp-display mt-2 text-[2.35rem] leading-none text-white sm:text-[3rem]">
                      {formatRange(saved.range)}
                    </p>
                  </div>
                ) : null}
                <p className="mt-6 max-w-[52ch] text-[17px] leading-relaxed text-[var(--lp-ink-2)]">
                  {t(
                    "This is a planning range, not a firm price. One of us will review your answers and call or text you. We measure the bathroom before committing to a number.",
                    "Este es un rango de planificación, no un precio firme. Uno de nosotros revisará sus respuestas y le llamará o escribirá. Medimos el baño antes de comprometernos con un número.",
                  )}
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <a href={`tel:${TEL}`} className="lp-cta">
                    <Phone size={19} weight="fill" aria-hidden="true" />
                    {t("Call", "Llame al")} {PHONE}
                  </a>
                  <a href={guideHref} className="lp-cta lp-cta--navy">
                    <DownloadSimple size={20} weight="bold" aria-hidden="true" />
                    {t("Get the planning guide", "Descargar la guía")}
                  </a>
                </div>
              </>
            ) : (
              <>
                <h1 className="lp-display mt-4 text-[2.45rem] leading-[0.98] sm:text-[3.5rem]">
                  {t("Your planning guide is ready.", "Su guía de planificación está lista.")}
                </h1>
                <p className="mt-6 max-w-[52ch] text-[17px] leading-relaxed text-[var(--lp-ink-2)]">
                  {t(
                    "Open it now. It covers daily-use benefits, local starting figures, the details that move price, and the photos and measurements to gather before asking for a range.",
                    "Ábrala ahora. Incluye beneficios para el uso diario, precios iniciales locales, los detalles que mueven el precio y las fotos y medidas que debe reunir antes de pedir un rango.",
                  )}
                </p>
                <a href={guideHref} className="lp-cta mt-7" download>
                  <DownloadSimple size={21} weight="bold" aria-hidden="true" />
                  {t("Download the free guide", "Descargar la guía gratis")}
                </a>
                <div className="mt-8 border-t border-[var(--lp-rule)] pt-6">
                  <h2 className="lp-display text-[1.45rem]">
                    {t("Want a range for your bathroom?", "¿Quiere un rango para su baño?")}
                  </h2>
                  <p className="mt-2 text-[16px] text-[var(--lp-ink-2)]">
                    {t(
                      "Choose the layout and scope. The estimator takes about one minute.",
                      "Escoja la distribución y el nivel de trabajo. El estimador toma cerca de un minuto.",
                    )}
                  </p>
                  <Link
                    href={`/${es ? "es" : "en"}/landing/tub-to-shower#quote`}
                    className="lp-display mt-4 inline-flex min-h-[44px] items-center text-[1.15rem] text-[var(--lp-navy)] underline underline-offset-4"
                  >
                    {t("Start my price range", "Empezar mi rango de precio")}
                  </Link>
                </div>
              </>
            )}
          </div>

          <div className="relative min-h-[330px] md:min-h-[620px]">
            <Image
              src="/images/glenvar-after-1.jpeg"
              alt={t(
                "Finished walk-in shower after a tub to shower conversion in Miami-Dade",
                "Ducha terminada después de una conversión de bañera a ducha en Miami-Dade",
              )}
              fill
              sizes="(max-width: 767px) 100vw, 45vw"
              className="object-cover"
              priority
            />
          </div>
        </div>

        <p className="mt-8 max-w-[70ch] text-[14.5px] leading-relaxed text-[var(--lp-ink-2)]">
          {t(
            "Starting figures and estimator ranges are references for planning. Bathroom size, selections, site conditions, and what is found behind the wall can change the final price.",
            "Los precios iniciales y los rangos del estimador son referencias para planificar. El tamaño del baño, las selecciones, las condiciones del lugar y lo que se encuentre detrás de la pared pueden cambiar el precio final.",
          )}
        </p>
      </div>
    </main>
  )
}
