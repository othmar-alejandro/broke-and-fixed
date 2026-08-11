import Link from "next/link"
import { CalendarCheck, Phone, Users } from "@phosphor-icons/react/dist/ssr"

import Reveal from "@/components/landing/Reveal"

/**
 * Honest urgency.
 *
 * Roughly a fifth of buyers only move on a deadline, and this page currently
 * gives a procrastinator nothing to move on. The obvious fix is a countdown,
 * and a countdown would be the single most expensive thing we could put here:
 * the entire page is built on publishing real prices and admitting the job
 * takes a week. One fake timer and a visitor re-reads all of that as marketing.
 *
 * So the urgency is the real constraint. Two brothers, one of them on site
 * every day, means they are structurally a one-job-at-a-time operation. That is
 * a genuine reason today beats next month, and it survives being checked.
 *
 * Deliberately absent: countdown, "expires at midnight", strike-through price,
 * invented slot counts. If a prop is not supplied, the section says less.
 */

const PHONE = "(786) 363-7039"
const TEL = "+17863637039"
const QUOTE_HREF = "#quote"

type Props = {
  /** Human text off the real calendar, e.g. "the week of March 3". */
  nextAvailable?: string
  /** Real number of start dates left. 0 is valid and renders as booked out. */
  slotsThisMonth?: number
  /** "en" or "es". Every visible string in here carries both languages. */
  locale?: string
}

export default function CapacityBand({
  nextAvailable,
  slotsThisMonth,
  locale = "en",
}: Props) {
  const es = locale === "es"
  const t = (en: string, esText: string) => (es ? esText : en)
  const hasSlots = typeof slotsThisMonth === "number" && slotsThisMonth >= 0
  const hasAny = Boolean(nextAvailable) || hasSlots

  return (
    <section className="lp-section bg-white">
      <div className="lp-wrap">
        <Reveal>
          <div className="rounded-[4px] border-2 border-[var(--lp-navy)] bg-[var(--lp-cream)] p-7 md:p-10">
            {/* Plain eyebrow, no icon. An 18px glyph next to a 12px label that
                wraps to two lines on a phone floats between the lines, and
                every other eyebrow on this page is plain text anyway. */}
            <p className="lp-label text-[var(--lp-orange-text)]">
              {t(
                "How our calendar actually works",
                "Así funciona nuestro calendario de verdad",
              )}
            </p>

            <h2 className="lp-display mt-4 max-w-[22ch] text-[2rem] md:text-[2.8rem]">
              {t(
                "We can only be in one house at a time",
                "Solo podemos estar en una casa a la vez",
              )}
            </h2>

            <p className="mt-5 max-w-[62ch] text-[1.1rem] leading-relaxed text-[var(--lp-ink-2)]">
              {t(
                "There are two of us, and one of us is on site every day of the job. That is the reason the work comes out right. It is also the reason we run one bathroom at a time instead of four. A conversion takes about a week, so a week that is spoken for is gone, and we are normally booking a few weeks ahead.",
                "Somos dos, y uno de los dos está en la obra cada día del trabajo. Por eso el trabajo sale bien. También es la razón por la que llevamos un baño a la vez y no cuatro. Una conversión toma cerca de una semana, así que una semana comprometida ya no está, y normalmente agendamos con varias semanas de anticipación.",
              )}
            </p>

            {hasAny && (
              <div className="mt-8 flex flex-col gap-6 border-t border-[var(--lp-rule)] pt-8 sm:flex-row sm:gap-12">
                {nextAvailable && (
                  <div className="flex items-start gap-3">
                    <CalendarCheck
                      size={26}
                      weight="duotone"
                      className="mt-1 shrink-0 text-[var(--lp-orange-text)]"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="lp-label text-[var(--lp-ink-3)]">
                        {t(
                          "Earliest week we can start",
                          "La primera semana en que podemos empezar",
                        )}
                      </p>
                      <p className="lp-display mt-1 text-[1.7rem] text-[var(--lp-ink)]">
                        {nextAvailable}
                      </p>
                    </div>
                  </div>
                )}

                {hasSlots && (
                  <div className="flex items-start gap-3">
                    <Users
                      size={26}
                      weight="duotone"
                      className="mt-1 shrink-0 text-[var(--lp-orange-text)]"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="lp-label text-[var(--lp-ink-3)]">
                        {t(
                          "Start dates left this month",
                          "Fechas de inicio libres este mes",
                        )}
                      </p>
                      <p className="lp-display mt-1 text-[1.7rem] text-[var(--lp-ink)]">
                        {slotsThisMonth === 0
                          ? t("Booked out", "Agenda llena")
                          : `${slotsThisMonth} ${
                              slotsThisMonth === 1
                                ? t("week", "semana")
                                : t("weeks", "semanas")
                            }`}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}

            <p className="mt-8 max-w-[62ch] border-l-[3px] border-[var(--lp-navy)] pl-4 text-[17px] leading-relaxed text-[var(--lp-ink-2)]">
              {hasAny
                ? t(
                    "That comes off our own calendar, not a marketing tool. Call and we will tell you what is genuinely open, including when the honest answer is nothing for three weeks.",
                    "Eso sale de nuestro propio calendario, no de una herramienta de marketing. Llame y le diremos qué está abierto de verdad, incluso cuando la respuesta honesta es nada por tres semanas.",
                  )
                : t(
                    "Call and we will tell you the first week we can genuinely start, including when the honest answer is nothing for three weeks. There is no countdown on this page and nothing here expires at midnight. The only thing that ever runs out is the calendar.",
                    "Llame y le diremos la primera semana en que de verdad podemos empezar, incluso cuando la respuesta honesta es nada por tres semanas. En esta página no hay cuenta regresiva y nada vence a medianoche. Lo único que se acaba es el calendario.",
                  )}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link href={QUOTE_HREF} className="lp-cta">
                {t("Get my price", "Ver mi precio")}
              </Link>
              <a
                href={`tel:${TEL}`}
                className="lp-display inline-flex min-h-[44px] items-center gap-2 px-1 text-[1.15rem] text-[var(--lp-navy)] underline underline-offset-4 focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[var(--lp-navy)]"
              >
                <Phone size={19} weight="fill" aria-hidden="true" />
                {t("Or call", "O llame al")} {PHONE}
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
