import Link from "next/link"
import PhoneLink from "@/components/PhoneLink"
import ImagePlaceholder from "@/components/ImagePlaceholder"
import { Phone, ArrowRight } from "@phosphor-icons/react/dist/ssr"

interface ServiceHeroProps {
  serviceSlug: string
  serviceName: string
  serviceNameEs: string
  headline: string
  headlineEs: string
  subhead: string
  subheadEs: string
  badges: string[]
  badgesEs: string[]
  priceRange: string
  timeline: string
  timelineEs: string
  locale: "en" | "es"
  heroImagePath?: string
}

export default function ServiceHero({
  serviceSlug,
  serviceName,
  serviceNameEs,
  headline,
  headlineEs,
  subhead,
  subheadEs,
  badges,
  badgesEs,
  priceRange,
  timeline,
  timelineEs,
  locale,
  heroImagePath,
}: ServiceHeroProps) {
  const isEs = locale === "es"
  const imagePath = heroImagePath || `/images/services/${serviceSlug}/hero.jpg`
  const displayBadges = isEs ? badgesEs : badges

  return (
    <section className="relative bg-cream overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="relative z-10">
            <div className="inline-block text-xs uppercase tracking-[0.22em] text-sage font-bold mb-5">
              {isEs ? "Servicio dedicado" : "Dedicated service"} &middot; Miami-Dade
            </div>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-espresso leading-[0.95] mb-6">
              {isEs ? headlineEs : headline}
            </h1>
            <p className="text-warm-gray text-lg md:text-xl leading-relaxed mb-7 max-w-xl">
              {isEs ? subheadEs : subhead}
            </p>

            <div className="flex flex-wrap items-center gap-2 mb-8">
              {displayBadges.map((badge, i) => (
                <span
                  key={i}
                  className="inline-flex items-center text-xs font-semibold text-espresso bg-white ring-1 ring-espresso/10 px-3 py-1.5 rounded-full"
                >
                  {badge}
                </span>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <PhoneLink
                phoneNumber="(786) 363-7039"
                source={`service_hero_${serviceSlug}`}
                className="inline-flex items-center justify-center gap-2 bg-sage text-white px-7 py-4 rounded-full font-bold text-base hover:bg-sage-light hover:scale-[1.02] transition-all shadow-[0_4px_14px_rgba(111,135,116,0.35)]"
              >
                <Phone weight="bold" size={18} />
                <span>{isEs ? "Llamar (786) 363-7039" : "Call (786) 363-7039"}</span>
              </PhoneLink>
              <Link
                href="#quote"
                className="inline-flex items-center justify-center gap-2 bg-espresso text-white px-7 py-4 rounded-full font-bold text-base hover:bg-espresso/90 hover:scale-[1.02] transition-all"
              >
                <span>{isEs ? "Estimado Gratis" : "Free Estimate"}</span>
                <ArrowRight weight="bold" size={18} />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-espresso/10 max-w-md">
              <div>
                <div className="text-xs uppercase tracking-wider text-warm-gray font-semibold mb-1">
                  {isEs ? "Rango de Precio" : "Price Range"}
                </div>
                <div className="font-display text-2xl font-bold text-espresso leading-none">
                  {priceRange}
                </div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-warm-gray font-semibold mb-1">
                  {isEs ? "Cronograma" : "Timeline"}
                </div>
                <div className="font-display text-2xl font-bold text-espresso leading-none">
                  {isEs ? timelineEs : timeline}
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl ring-1 ring-espresso/10 aspect-[4/5] md:aspect-[5/6]">
              <ImagePlaceholder
                src={imagePath}
                alt={`${isEs ? serviceNameEs : serviceName} project in Miami-Dade by Broke & Fixed Home Solutions`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                ratio="portrait"
                label={isEs ? "Imagen Hero" : "Hero Image"}
              />
              <div className="absolute -bottom-1 -left-1 bg-sage rounded-tr-3xl rounded-bl-3xl p-5 md:p-6 max-w-[16rem] shadow-xl">
                <div className="text-[10px] uppercase tracking-[0.18em] text-white/70 font-bold mb-1">
                  {isEs ? "Equipo local" : "Local team"}
                </div>
                <div className="font-display text-xl md:text-2xl font-bold text-white leading-tight">
                  {isEs ? "Familia, no franquicia" : "Family, not franchise"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
