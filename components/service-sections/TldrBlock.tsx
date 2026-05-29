import PhoneLink from "@/components/PhoneLink"
import { Phone } from "@phosphor-icons/react/dist/ssr"

interface TldrBlockProps {
  /** 140-160 word answer-first paragraph, plain text. */
  answer: string
  /** ARIA label for the section, locale-specific. */
  label: string
  /** Locale narrow type. */
  locale: "en" | "es"
  /** Source attribution string for analytics on the phone CTA. */
  phoneSource: string
}

/**
 * TL;DR answer block for AI Overviews and answer-engine extraction.
 *
 * Per 2026 research, optimal cited passage length is 134-167 words.
 * The CSS `data-speakable` attribute pairs with Speakable schema
 * emitted by the parent page so voice assistants and AI engines can
 * locate the canonical answer block on the page.
 *
 * Visually, this renders as a clean answer card just under the hero
 * so users see the same answer the AI engines extract.
 */
export default function TldrBlock({
  answer,
  label,
  locale,
  phoneSource,
}: TldrBlockProps) {
  const callLabel = locale === "es" ? "Llamar (786) 363-7039" : "Call (786) 363-7039"

  return (
    <section
      aria-label={label}
      className="bg-white border-y border-sand"
    >
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-8 md:py-10">
        <div className="flex items-start gap-3 mb-3">
          <span className="inline-flex items-center justify-center rounded-full bg-trade-orange/10 text-trade-orange font-display font-bold text-xs uppercase tracking-wide px-3 py-1">
            {locale === "es" ? "En resumen" : "Quick answer"}
          </span>
        </div>

        <p
          data-speakable="answer"
          className="text-espresso text-base md:text-lg leading-relaxed"
        >
          {answer}
        </p>

        <div className="mt-5">
          <PhoneLink
            phoneNumber="(786) 363-7039"
            source={phoneSource}
            className="inline-flex items-center gap-2 bg-trade-orange text-white px-5 py-2.5 rounded-full font-bold text-sm hover:bg-trade-orange/90 transition-all"
          >
            <Phone weight="bold" size={14} />
            <span>{callLabel}</span>
          </PhoneLink>
        </div>
      </div>
    </section>
  )
}
