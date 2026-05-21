import Link from "next/link"
import { Check } from "@phosphor-icons/react/dist/ssr"

export interface PricingTier {
  name: string
  nameEs: string
  priceRange: string
  duration: string
  durationEs: string
  includes: string[]
  includesEs: string[]
  bestFor: string
  bestForEs: string
}

interface PricingTiersProps {
  tiers: PricingTier[]
  locale: "en" | "es"
  intro?: string
}

export default function PricingTiers({ tiers, locale, intro }: PricingTiersProps) {
  const isEs = locale === "es"

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block text-xs uppercase tracking-[0.2em] text-sage font-bold mb-3">
            {isEs ? "Rangos de precio" : "Price ranges"}
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-espresso leading-tight">
            {isEs ? "Lo que Cuesta Realmente" : "What It Actually Costs"}
          </h2>
          {intro && (
            <p className="text-warm-gray mt-4 text-lg leading-relaxed">{intro}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tiers.map((tier, i) => {
            const isMiddle = i === 1
            return (
              <div
                key={i}
                className={`relative rounded-3xl p-7 md:p-8 flex flex-col ${
                  isMiddle
                    ? "bg-espresso text-white ring-2 ring-sage scale-100 md:scale-[1.03] shadow-xl"
                    : "bg-cream text-espresso ring-1 ring-espresso/10"
                }`}
              >
                {isMiddle && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-sage text-white text-[10px] uppercase tracking-[0.18em] font-bold px-3 py-1 rounded-full">
                    {isEs ? "Más Popular" : "Most Popular"}
                  </span>
                )}
                <div className={`text-xs uppercase tracking-[0.18em] font-bold mb-2 ${isMiddle ? "text-sage" : "text-sage"}`}>
                  {isEs ? tier.nameEs : tier.name}
                </div>
                <div className={`font-display text-3xl md:text-4xl font-bold leading-none mb-2 ${isMiddle ? "text-white" : "text-espresso"}`}>
                  {tier.priceRange}
                </div>
                <div className={`text-sm mb-4 ${isMiddle ? "text-white/60" : "text-warm-gray"}`}>
                  {isEs ? tier.durationEs : tier.duration}
                </div>
                <p className={`text-sm mb-6 leading-relaxed ${isMiddle ? "text-white/80" : "text-warm-gray"}`}>
                  <span className="font-semibold">{isEs ? "Mejor para: " : "Best for: "}</span>
                  {isEs ? tier.bestForEs : tier.bestFor}
                </p>
                <ul className="space-y-2.5 mb-7 flex-1">
                  {(isEs ? tier.includesEs : tier.includes).map((item, j) => (
                    <li key={j} className="flex items-start gap-2.5">
                      <Check
                        weight="bold"
                        size={16}
                        className={`mt-0.5 shrink-0 ${isMiddle ? "text-sage" : "text-sage"}`}
                      />
                      <span className={`text-sm leading-snug ${isMiddle ? "text-white/90" : "text-espresso/85"}`}>
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="#quote"
                  className={`block text-center py-3 rounded-full font-bold text-sm transition-all ${
                    isMiddle
                      ? "bg-sage text-white hover:bg-sage-light"
                      : "bg-espresso text-white hover:bg-espresso/90"
                  }`}
                >
                  {isEs ? "Pedir Estimado" : "Get an Estimate"}
                </Link>
              </div>
            )
          })}
        </div>

        <p className="text-center text-xs text-warm-gray mt-8 max-w-2xl mx-auto">
          {isEs
            ? "Precios estimados para proyectos típicos en Miami-Dade en 2026. El precio final depende del alcance, materiales y condición existente. Estimado en casa siempre gratis."
            : "Estimated pricing for typical Miami-Dade projects in 2026. Final pricing depends on scope, materials, and existing conditions. In-home estimate always free."}
        </p>
      </div>
    </section>
  )
}
