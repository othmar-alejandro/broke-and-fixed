import { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { services } from "@/lib/data/services"
import { locations } from "@/lib/data/locations"
import { serviceImages } from "@/lib/data/images"
import { faqs } from "@/lib/data/faqs"
import { servicePageRich } from "@/lib/data/service-page-rich"
import JsonLd from "@/components/seo/JsonLd"
import Breadcrumbs from "@/components/seo/Breadcrumbs"
import Hb803Banner from "@/components/Hb803Banner"
import ServiceHero from "@/components/service-sections/ServiceHero"
import TrustStrip from "@/components/service-sections/TrustStrip"
import WhyChooseUs from "@/components/service-sections/WhyChooseUs"
import ProcessTimeline from "@/components/service-sections/ProcessTimeline"
import MaterialsShowcase from "@/components/service-sections/MaterialsShowcase"
import PricingTiers from "@/components/service-sections/PricingTiers"
import BeforeAfterGallery from "@/components/service-sections/BeforeAfterGallery"
import ServiceTestimonials from "@/components/service-sections/ServiceTestimonials"
import ImagePlaceholder from "@/components/ImagePlaceholder"
import PhoneLink from "@/components/PhoneLink"
import { Phone } from "@phosphor-icons/react/dist/ssr"

interface PageParams {
  locale: string
  service: string
}

const imageKeyMap: Record<string, string> = {
  "bathroom-remodeling": "bathroom",
  "kitchen-remodeling": "kitchen",
  "interior-painting": "interior-painting",
  "exterior-painting": "exterior-painting",
  "tile-work": "tile-work",
  "exterior-repairs": "exterior-repairs",
  "cabinet-refinishing": "cabinet-refinishing",
}

const locationDescriptors: Record<string, string> = {
  kendall: "Established community, 70s-80s homes",
  "west-kendall": "Planned neighborhoods, 90s-2000s builds",
  "palmetto-bay": "Family village, ranch-style homes",
  doral: "Growing area, newer construction",
  "the-hammocks": "Master-planned, builder-grade upgrades",
  "the-crossings": "Mid-range neighborhood, popular remodels",
  "kendale-lakes": "Well-established, classic South Florida",
  sweetwater: "Tight-knit community near FIU",
  "cutler-bay": "Growing town, storm exposure needs",
  pinecrest: "Premium neighborhood, quality renovations",
  "south-miami": "Historic charm, 50s-60s character",
  "south-miami-heights": "Affordable area, homes need updates",
  "miami-gardens": "Largest city, diverse housing stock",
  westchester: "Classic Miami, 60s-70s CBS homes",
  "coral-gables": "Historic district, character renovations",
  "country-walk": "Family community, builder-grade kitchens",
  "coconut-grove": "Historic to modern, waterfront living",
}

function findService(slug: string, locale: string) {
  return services.find((s) =>
    locale === "es" ? s.slugEs === slug : s.slug === slug
  )
}

export function generateStaticParams() {
  const params: { locale: string; service: string }[] = []
  for (const service of services) {
    params.push({ locale: "en", service: service.slug })
    params.push({ locale: "es", service: service.slugEs })
  }
  return params
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>
}): Promise<Metadata> {
  const { locale, service: serviceSlug } = await params
  const service = findService(serviceSlug, locale)
  if (!service) return {}

  const name = locale === "es" ? service.nameEs : service.name
  const description =
    locale === "es" ? service.descriptionEs : service.description

  return {
    title: `${name} | Miami-Dade | Broke & Fixed Home Solutions`,
    description: `${description} Serving 17 communities across Miami-Dade County. Call 786-363-7039 for a free estimate.`,
    alternates: {
      canonical: `https://brokeandfixed.com/${locale}/services/${locale === "es" ? service.slugEs : service.slug}`,
      languages: {
        en: `/en/services/${service.slug}`,
        es: `/es/services/${service.slugEs}`,
      },
    },
    openGraph: {
      title: `${name} | Broke & Fixed Home Solutions`,
      description,
      type: "website",
    },
    keywords: [
      `${name} Miami-Dade`,
      `${name} near me`,
      `${name} Miami`,
      `${name} Broke & Fixed`,
    ],
  }
}

export default async function ServicePage({
  params,
}: {
  params: Promise<PageParams>
}) {
  const { locale, service: serviceSlug } = await params
  const service = findService(serviceSlug, locale)

  if (!service) notFound()

  const isEs = locale === "es"
  const name = isEs ? service.nameEs : service.name
  const description = isEs ? service.descriptionEs : service.description
  const serviceSlugForLinks = isEs ? service.slugEs : service.slug
  const localeNarrow = (locale === "es" ? "es" : "en") as "en" | "es"

  const rich = servicePageRich[service.slug]
  const serviceFaqs = faqs[service.slug] || []
  const otherServices = services.filter((s) => s.slug !== service.slug)

  const jsonLdData = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name,
      description,
      provider: {
        "@type": "LocalBusiness",
        name: "Broke & Fixed Home Solutions",
        telephone: "786-363-7039",
        areaServed: "Miami-Dade County, FL",
      },
      areaServed: {
        "@type": "AdministrativeArea",
        name: "Miami-Dade County, FL",
      },
      offers: rich?.pricingTiers
        ? rich.pricingTiers.map((tier) => ({
            "@type": "Offer",
            name: tier.name,
            description: tier.bestFor,
            priceSpecification: {
              "@type": "PriceSpecification",
              price: tier.priceRange,
            },
          }))
        : undefined,
    },
    ...(rich?.testimonials && rich.testimonials.length > 0
      ? [
          {
            "@context": "https://schema.org",
            "@type": "AggregateRating",
            itemReviewed: {
              "@type": "Service",
              name,
            },
            ratingValue:
              rich.testimonials.reduce((sum, t) => sum + t.rating, 0) /
              rich.testimonials.length,
            reviewCount: rich.testimonials.length,
            bestRating: 5,
          },
        ]
      : []),
    ...(serviceFaqs.length > 0
      ? [
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: serviceFaqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
              },
            })),
          },
        ]
      : []),
  ]

  const breadcrumbs = [
    { name: isEs ? "Inicio" : "Home", href: `/${locale}` },
    {
      name: isEs ? "Servicios" : "Services",
      href: `/${locale}`,
    },
    { name, href: `/${locale}/services/${serviceSlugForLinks}` },
  ]

  return (
    <main className="min-h-screen bg-cream">
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-6">
        <Breadcrumbs items={breadcrumbs} />
      </div>

      {/* HERO */}
      {rich ? (
        <ServiceHero
          serviceSlug={service.slug}
          serviceName={service.name}
          serviceNameEs={service.nameEs}
          headline={rich.heroHeadline}
          headlineEs={rich.heroHeadlineEs}
          subhead={rich.heroSubhead}
          subheadEs={rich.heroSubheadEs}
          badges={rich.heroBadges}
          badgesEs={rich.heroBadgesEs}
          priceRange={service.priceRange}
          timeline={service.timeline}
          timelineEs={service.timeline}
          locale={localeNarrow}
        />
      ) : (
        // Fallback hero for services without rich data yet
        <section className="bg-cream py-20 md:py-28">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <h1 className="font-display text-5xl md:text-7xl font-bold text-espresso leading-tight max-w-3xl">
              {name}
            </h1>
            <p className="text-warm-gray text-lg md:text-xl mt-4 max-w-2xl leading-relaxed">
              {description}
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              <PhoneLink
                phoneNumber="(786) 363-7039"
                source={`service_fallback_hero_${service.slug}`}
                className="inline-flex items-center justify-center gap-2 bg-sage text-white px-6 py-3 rounded-full font-bold text-base hover:bg-sage-light transition-all"
              >
                <Phone weight="bold" size={16} />
                <span>{isEs ? "Llamar (786) 363-7039" : "Call (786) 363-7039"}</span>
              </PhoneLink>
              <Link
                href="#quote"
                className="inline-flex items-center justify-center gap-2 bg-espresso text-white px-6 py-3 rounded-full font-bold text-base hover:bg-espresso/90 transition-all"
              >
                {isEs ? "Estimado Gratis" : "Free Estimate"}
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* TRUST STRIP */}
      <TrustStrip locale={localeNarrow} />

      {/* HB 803 BANNER */}
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <Hb803Banner locale={localeNarrow} className="my-12 md:my-16" />
      </div>

      {/* WHY CHOOSE US */}
      {rich?.whyChooseUs && (
        <WhyChooseUs
          reasons={rich.whyChooseUs}
          locale={localeNarrow}
          intro={isEs ? rich.whyChooseUsIntroEs : rich.whyChooseUsIntro}
        />
      )}

      {/* PROCESS TIMELINE */}
      {rich?.processSteps && (
        <ProcessTimeline
          steps={rich.processSteps}
          locale={localeNarrow}
          intro={isEs ? rich.processIntroEs : rich.processIntro}
          serviceSlug={service.slug}
        />
      )}

      {/* MATERIALS SHOWCASE */}
      {rich?.materials && (
        <MaterialsShowcase
          materials={rich.materials}
          locale={localeNarrow}
          intro={isEs ? rich.materialsIntroEs : rich.materialsIntro}
          serviceSlug={service.slug}
        />
      )}

      {/* PRICING TIERS */}
      {rich?.pricingTiers && (
        <PricingTiers
          tiers={rich.pricingTiers}
          locale={localeNarrow}
          intro={isEs ? rich.pricingIntroEs : rich.pricingIntro}
        />
      )}

      {/* BEFORE / AFTER GALLERY */}
      {rich?.recentProjects && (
        <BeforeAfterGallery
          projects={rich.recentProjects}
          locale={localeNarrow}
          intro={isEs ? rich.projectsIntroEs : rich.projectsIntro}
          serviceSlug={service.slug}
        />
      )}

      {/* SERVICE AREAS GRID */}
      <section className="py-20 md:py-28 bg-cream">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-block text-xs uppercase tracking-[0.2em] text-sage font-bold mb-3">
              {isEs ? "Áreas de servicio" : "Service areas"}
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-espresso leading-tight">
              {isEs ? `${name} cerca de ti` : `${name} near you`}
            </h2>
            <p className="text-warm-gray mt-4 text-lg">
              {isEs
                ? "Servimos 17 comunidades en Miami-Dade. Toca tu vecindario para ver detalles locales."
                : "We serve 17 communities across Miami-Dade. Tap your neighborhood for local details."}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {locations.map((loc) => (
              <Link
                key={loc.slug}
                href={`/${locale}/services/${serviceSlugForLinks}/${loc.slug}`}
                className="group bg-white rounded-xl p-5 ring-1 ring-espresso/5 hover:ring-sage/40 hover:-translate-y-0.5 hover:shadow-md transition-all"
              >
                <span className="block font-display text-lg font-bold text-espresso group-hover:text-sage transition-colors">
                  {loc.name}
                </span>
                <span className="block text-xs text-warm-gray mt-1">
                  {locationDescriptors[loc.slug] || loc.state}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      {rich?.testimonials && (
        <ServiceTestimonials
          testimonials={rich.testimonials}
          locale={localeNarrow}
          serviceName={service.name}
          serviceNameEs={service.nameEs}
        />
      )}

      {/* QUOTE FORM */}
      <section id="quote" className="py-20 md:py-28 bg-espresso">
        <div className="max-w-3xl mx-auto px-4 md:px-8">
          <div className="text-center mb-10">
            <span className="inline-block text-xs uppercase tracking-[0.2em] text-sage font-bold mb-3">
              {isEs ? "Hablemos" : "Let's talk"}
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white leading-tight">
              {isEs ? "Pide Tu Estimado Gratis" : "Get Your Free Estimate"}
            </h2>
            <p className="text-white/70 mt-4 text-lg">
              {isEs
                ? "Cuéntanos sobre tu proyecto. Sin compromiso, sin presión. Respondemos en 15 minutos."
                : "Tell us about your project. No obligation, no pressure. We respond within 15 minutes."}
            </p>
          </div>
          <form
            action="https://api.web3forms.com/submit"
            method="POST"
            className="space-y-5"
          >
            <input type="hidden" name="access_key" value="ebb39c28-f927-4916-be94-71a448167ae6" />
            <input type="hidden" name="service" value={name} />
            <input type="hidden" name="lead_source" value={`service-page-${service.slug}`} />
            <input type="hidden" name="subject" value={`New ${name} Lead from brokeandfixed.com`} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label
                  htmlFor="name-input"
                  className="block text-sm font-medium text-white/80 mb-1.5"
                >
                  {isEs ? "Nombre" : "Name"} *
                </label>
                <input
                  type="text"
                  id="name-input"
                  name="name"
                  required
                  className="w-full rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sage focus:border-transparent"
                  placeholder={isEs ? "Tu nombre" : "Your name"}
                />
              </div>
              <div>
                <label
                  htmlFor="phone-input"
                  className="block text-sm font-medium text-white/80 mb-1.5"
                >
                  {isEs ? "Teléfono" : "Phone"} *
                </label>
                <input
                  type="tel"
                  id="phone-input"
                  name="phone"
                  required
                  className="w-full rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sage focus:border-transparent"
                  placeholder="(786) 555-0123"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email-input"
                className="block text-sm font-medium text-white/80 mb-1.5"
              >
                {isEs ? "Correo (opcional)" : "Email (optional)"}
              </label>
              <input
                type="email"
                id="email-input"
                name="email"
                className="w-full rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sage focus:border-transparent"
                placeholder={isEs ? "tu@correo.com" : "you@email.com"}
              />
            </div>
            <div>
              <label
                htmlFor="message-input"
                className="block text-sm font-medium text-white/80 mb-1.5"
              >
                {isEs ? "Cuéntanos sobre tu proyecto" : "Tell us about your project"}
              </label>
              <textarea
                id="message-input"
                name="message"
                rows={4}
                className="w-full rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sage focus:border-transparent resize-none"
                placeholder={
                  isEs
                    ? "Describe brevemente lo que necesitas..."
                    : "Briefly describe what you need..."
                }
              />
            </div>
            <button
              type="submit"
              className="w-full bg-sage hover:bg-sage-light text-white font-display text-xl font-bold py-4 rounded-full transition-all hover:scale-[1.01]"
            >
              {isEs ? "Pedir Mi Estimado Gratis" : "Get My Free Estimate"}
            </button>
            <p className="text-center text-xs text-white/40 pt-2">
              {isEs
                ? "Respondemos en menos de 15 minutos. Respetamos tu privacidad."
                : "We respond in under 15 minutes. We respect your privacy."}
            </p>
          </form>
        </div>
      </section>

      {/* FAQ SECTION */}
      {serviceFaqs.length > 0 && (
        <section className="py-20 md:py-28 bg-white">
          <div className="max-w-3xl mx-auto px-4 md:px-8">
            <div className="text-center mb-12">
              <span className="inline-block text-xs uppercase tracking-[0.2em] text-sage font-bold mb-3">
                {isEs ? "Preguntas" : "Questions"}
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-espresso leading-tight">
                {isEs ? "Preguntas Frecuentes" : "Frequently Asked Questions"}
              </h2>
            </div>
            <div className="space-y-3">
              {serviceFaqs.map((faq, i) => (
                <details
                  key={i}
                  className="group bg-cream rounded-2xl overflow-hidden ring-1 ring-espresso/5 hover:ring-sage/30 transition-all"
                >
                  <summary className="flex items-center justify-between cursor-pointer px-6 py-5 font-display text-lg font-bold text-espresso hover:text-sage transition-colors list-none">
                    <span>{faq.question}</span>
                    <svg
                      className="w-5 h-5 text-warm-gray flex-shrink-0 ml-4 transition-transform group-open:rotate-180"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  </summary>
                  <div className="px-6 pb-5 text-warm-gray leading-relaxed">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* OTHER SERVICES */}
      <section className="py-20 md:py-28 bg-cream">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-block text-xs uppercase tracking-[0.2em] text-sage font-bold mb-3">
              {isEs ? "Más servicios" : "More services"}
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-espresso leading-tight">
              {isEs ? "Otros Servicios" : "Other Services"}
            </h2>
            <p className="text-warm-gray text-lg mt-4">
              {isEs
                ? "También ofrecemos estos servicios en todo Miami-Dade."
                : "We also offer these services across Miami-Dade."}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {otherServices.map((s) => {
              const slug = isEs ? s.slugEs : s.slug
              const sName = isEs ? s.nameEs : s.name
              const sDesc = isEs ? s.descriptionEs : s.description
              const sImgKey = imageKeyMap[s.slug] || s.slug
              const sImages = serviceImages[sImgKey]
              return (
                <Link
                  key={s.slug}
                  href={`/${locale}/services/${slug}`}
                  className="group relative bg-white rounded-2xl overflow-hidden ring-1 ring-espresso/5 hover:ring-sage/40 hover:-translate-y-1 hover:shadow-lg transition-all"
                >
                  <div className="relative h-44 overflow-hidden">
                    <ImagePlaceholder
                      src={sImages?.hero || `/images/services/${s.slug}/hero.jpg`}
                      alt={sImages?.heroAlt || `${sName} project in Miami-Dade`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      ratio="wide"
                      label={sName}
                    />
                    <div className="absolute inset-0 bg-espresso/20 group-hover:bg-espresso/10 transition-colors" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-xl font-bold text-espresso group-hover:text-sage transition-colors">
                      {sName}
                    </h3>
                    <p className="text-warm-gray text-sm mt-2 line-clamp-2 leading-relaxed">
                      {sDesc}
                    </p>
                    <span className="inline-block mt-3 text-sage font-semibold text-sm">
                      {isEs ? "Ver detalle" : "Learn more"} &rarr;
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <JsonLd data={jsonLdData} />
    </main>
  )
}
