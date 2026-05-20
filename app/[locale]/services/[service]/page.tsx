import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { services } from "@/lib/data/services"
import { locations } from "@/lib/data/locations"
import { serviceImages } from "@/lib/data/images"
import { faqs } from "@/lib/data/faqs"
import JsonLd from "@/components/seo/JsonLd"
import Breadcrumbs from "@/components/seo/Breadcrumbs"

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

const serviceIncludes: Record<string, { en: string[]; es: string[] }> = {
  "bathroom-remodeling": {
    en: [
      "Full demo and haul-away",
      "Tile installation (floors and walls)",
      "Vanity and fixture installation",
      "Plumbing updates",
      "Walk-in shower conversions",
      "Final cleanup and walkthrough",
    ],
    es: [
      "Demolicion completa y desalojo",
      "Instalacion de azulejo (pisos y paredes)",
      "Instalacion de vanidad y accesorios",
      "Actualizaciones de plomeria",
      "Conversiones a ducha abierta",
      "Limpieza final y recorrido",
    ],
  },
  "kitchen-remodeling": {
    en: [
      "Cabinet replacement or refacing",
      "Countertop fabrication and install",
      "Backsplash tile work",
      "Appliance setup and fitting",
      "Plumbing and sink installation",
      "Layout redesign and planning",
    ],
    es: [
      "Reemplazo o revestimiento de gabinetes",
      "Fabricacion e instalacion de encimeras",
      "Trabajo de azulejo para salpicadero",
      "Configuracion e instalacion de electrodomesticos",
      "Plomeria e instalacion de fregadero",
      "Rediseno y planificacion del espacio",
    ],
  },
  "interior-painting": {
    en: [
      "Drywall patching and repair",
      "Surface prep and sanding",
      "Two coats of premium paint",
      "Trim, baseboards, and ceiling edges",
      "Furniture protection and floor covering",
      "Final touch-up and cleanup",
    ],
    es: [
      "Reparacion y parcheo de drywall",
      "Preparacion de superficies y lijado",
      "Dos capas de pintura premium",
      "Molduras, zocalos y bordes de techo",
      "Proteccion de muebles y pisos",
      "Retoque final y limpieza",
    ],
  },
  "exterior-painting": {
    en: [
      "Full pressure washing",
      "Stucco crack filling and repair",
      "Primer on all prepped surfaces",
      "Two coats of UV-rated paint",
      "Trim, fascia, and shutter detail",
      "Final inspection and walkthrough",
    ],
    es: [
      "Lavado a presion completo",
      "Relleno y reparacion de grietas de estuco",
      "Imprimante en todas las superficies preparadas",
      "Dos capas de pintura con proteccion UV",
      "Detalle de molduras, fascia y persianas",
      "Inspeccion final y recorrido",
    ],
  },
  "tile-work": {
    en: [
      "Old tile removal and haul-away",
      "Subfloor leveling and prep",
      "Waterproofing for wet areas",
      "Precision tile cutting and layout",
      "Grouting and sealing",
      "Wall and floor tile installation",
    ],
    es: [
      "Remocion de azulejo viejo y desalojo",
      "Nivelacion y preparacion de subpiso",
      "Impermeabilizacion para areas humedas",
      "Corte y distribucion precisa de azulejo",
      "Aplicacion de lechada y sellador",
      "Instalacion de azulejo en pared y piso",
    ],
  },
  "exterior-repairs": {
    en: [
      "Stucco patching and resurfacing",
      "Fascia and soffit replacement",
      "Wood rot identification and repair",
      "Concrete and driveway patching",
      "Caulking and weather sealing",
      "Full exterior assessment",
    ],
    es: [
      "Parcheo y resuperficiado de estuco",
      "Reemplazo de fascia y sofitos",
      "Identificacion y reparacion de madera podrida",
      "Parcheo de concreto y entrada",
      "Sellado y calafateo contra clima",
      "Evaluacion exterior completa",
    ],
  },
  "cabinet-refinishing": {
    en: [
      "Strip or sand existing cabinet finish",
      "Repair dings, fill grain, and prep surfaces",
      "Spray primer plus 2 to 3 coats of lacquer or stain",
      "Replace hinges and pulls if requested",
      "Soft-close conversion option",
      "Per-door pricing with no hidden costs",
    ],
    es: [
      "Quitar o lijar el acabado existente de los gabinetes",
      "Reparar abolladuras, llenar la veta y preparar superficies",
      "Aplicar primer y 2 a 3 capas de laca o tinte con pistola",
      "Reemplazar bisagras y tiradores si se solicita",
      "Opcion de conversion a cierre suave",
      "Precio por puerta sin costos ocultos",
    ],
  },
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

  const imgKey = imageKeyMap[service.slug] || service.slug
  const images = serviceImages[imgKey]
  const includes = serviceIncludes[service.slug]
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
    },
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
      href: `/${locale}/services/${serviceSlugForLinks}`,
    },
    { name, href: `/${locale}/services/${serviceSlugForLinks}` },
  ]

  return (
    <main className="min-h-screen bg-cream">
      {/* ───── HERO ───── */}
      <section className="relative h-[520px] md:h-[600px] overflow-hidden">
        {images && (
          <Image
            src={images.hero}
            alt={images.heroAlt}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        )}
        <div className="absolute inset-0 bg-espresso/70" />
        <div className="relative z-10 flex flex-col justify-end h-full max-w-7xl mx-auto px-4 pb-16">
          <Breadcrumbs items={breadcrumbs} />
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white mt-4 leading-tight">
            {name}
          </h1>
          <p className="text-white/85 text-lg md:text-xl mt-4 max-w-2xl leading-relaxed">
            {description}
          </p>
          <div className="flex flex-wrap gap-4 mt-8">
            <a
              href="#quote"
              className="bg-sage-muted hover:bg-sage-muted/90 text-white font-display text-lg font-bold py-3.5 px-8 rounded-lg transition-colors"
            >
              {isEs ? "Estimado Gratis" : "Get a Free Estimate"}
            </a>
            <a
              href="tel:7863637039"
              className="bg-white/15 backdrop-blur hover:bg-white/25 text-white font-display text-lg font-bold py-3.5 px-8 rounded-lg border border-white/30 transition-colors"
            >
              {isEs ? "Llama: 786-363-7039" : "Call 786-363-7039"}
            </a>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 mt-8 text-sm text-white/75 font-medium tracking-wide uppercase">
            <span>{isEs ? "Totalmente Asegurados" : "Fully Insured"}</span>
            <span className="hidden sm:inline text-white/40">|</span>
            <span>
              {isEs ? "Cero Subcontratistas" : "Zero Subcontractors"}
            </span>
            <span className="hidden sm:inline text-white/40">|</span>
            <span>
              {isEs ? "Estimados Gratis" : "Free Estimates"}
            </span>
          </div>
        </div>
      </section>

      {/* ───── SERVICE DETAILS ───── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-espresso">
              {isEs ? "Que esta incluido" : "What's Included"}
            </h2>
            <p className="text-warm-gray mt-4 text-lg leading-relaxed">
              {isEs
                ? "Todo lo que necesitas, manejado por un solo equipo de principio a fin."
                : "Everything you need, handled by one team from start to finish."}
            </p>
          </div>
          {includes && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
              {(isEs ? includes.es : includes.en).map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 bg-cream rounded-xl p-6"
                >
                  <svg
                    className="w-6 h-6 text-sage-muted flex-shrink-0 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-espresso font-medium text-base leading-snug">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          )}
          <div className="flex flex-wrap gap-6 justify-center mt-12">
            <div className="bg-cream rounded-xl px-8 py-5 text-center">
              <span className="block text-xs uppercase tracking-wider text-warm-gray">
                {isEs ? "Rango de Precio" : "Price Range"}
              </span>
              <span className="block font-display text-2xl font-bold text-espresso mt-1">
                {service.priceRange}
              </span>
            </div>
            <div className="bg-cream rounded-xl px-8 py-5 text-center">
              <span className="block text-xs uppercase tracking-wider text-warm-gray">
                {isEs ? "Tiempo Estimado" : "Timeline"}
              </span>
              <span className="block font-display text-2xl font-bold text-espresso mt-1">
                {service.timeline}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ───── SERVICE AREAS GRID ───── */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-espresso">
              {isEs ? "Donde Trabajamos" : "Where We Work"}
            </h2>
            <p className="text-warm-gray mt-4 text-lg">
              {isEs
                ? "Atendemos 17 comunidades en Miami-Dade County."
                : "We serve 17 communities across Miami-Dade County."}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-12">
            {locations.map((loc) => (
              <Link
                key={loc.slug}
                href={`/${locale}/services/${serviceSlugForLinks}/${loc.slug}`}
                className="group bg-white rounded-lg p-5 shadow-sm hover:shadow-md transition-all border-l-4 border-transparent hover:border-sage-muted"
              >
                <span className="block font-display text-lg font-bold text-espresso group-hover:text-sage transition-colors">
                  {loc.name}, {loc.state}
                </span>
                <span className="block text-sm text-warm-gray mt-1">
                  {locationDescriptors[loc.slug] || loc.state}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ───── GALLERY ───── */}
      {images && images.gallery.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-espresso">
                {isEs ? "Nuestro Trabajo" : "Our Work"}
              </h2>
              <p className="text-warm-gray mt-4 text-lg">
                {isEs
                  ? "Fotos reales de proyectos completados por nuestro equipo en Miami-Dade."
                  : "Real photos from projects completed by our team across Miami-Dade."}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {images.gallery.slice(0, 3).map((src, i) => (
                <div
                  key={i}
                  className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-md"
                >
                  <Image
                    src={src}
                    alt={`${name} project photo ${i + 1}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ───── QUOTE FORM ───── */}
      <section id="quote" className="py-20 bg-espresso">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white">
              {isEs
                ? "Pide Tu Estimado Gratis"
                : "Get Your Free Estimate"}
            </h2>
            <p className="text-white/70 mt-4 text-lg">
              {isEs
                ? "Cuentanos sobre tu proyecto. Sin compromiso, sin presion."
                : "Tell us about your project. No obligation, no pressure."}
            </p>
          </div>
          <form
            action="https://services.leadconnectorhq.com/hooks/placeholder"
            method="POST"
            className="space-y-5"
          >
            <input type="hidden" name="service" value={name} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-white/80 mb-1.5"
                >
                  {isEs ? "Nombre" : "Name"} *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sage-muted focus:border-transparent"
                  placeholder={isEs ? "Tu nombre" : "Your name"}
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-white/80 mb-1.5"
                >
                  {isEs ? "Telefono" : "Phone"} *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  className="w-full rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sage-muted focus:border-transparent"
                  placeholder="(786) 555-0123"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-white/80 mb-1.5"
              >
                {isEs ? "Correo (opcional)" : "Email (optional)"}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sage-muted focus:border-transparent"
                placeholder={isEs ? "tu@correo.com" : "you@email.com"}
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-white/80 mb-1.5"
              >
                {isEs ? "Cuentanos sobre tu proyecto" : "Tell us about your project"}
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className="w-full rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sage-muted focus:border-transparent resize-none"
                placeholder={
                  isEs
                    ? "Describe brevemente lo que necesitas..."
                    : "Briefly describe what you need..."
                }
              />
            </div>
            <button
              type="submit"
              className="w-full bg-sage-muted hover:bg-sage-muted/90 text-white font-display text-xl font-bold py-4 rounded-lg transition-colors"
            >
              {isEs ? "Pedir Mi Estimado Gratis" : "Get My Free Estimate"}
            </button>
          </form>
        </div>
      </section>

      {/* ───── FAQ SECTION ───── */}
      {serviceFaqs.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-espresso text-center">
              {isEs ? "Preguntas Frecuentes" : "Frequently Asked Questions"}
            </h2>
            <div className="mt-10 space-y-3">
              {serviceFaqs.map((faq, i) => (
                <details
                  key={i}
                  className="group bg-cream rounded-xl overflow-hidden"
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

      {/* ───── INTERNAL LINKS ───── */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-espresso text-center">
            {isEs ? "Otros Servicios" : "Other Services"}
          </h2>
          <p className="text-warm-gray text-lg text-center mt-4 max-w-xl mx-auto">
            {isEs
              ? "Tambien ofrecemos estos servicios en todo Miami-Dade."
              : "We also offer these services across Miami-Dade."}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
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
                  className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all"
                >
                  {sImages && (
                    <div className="relative h-44 overflow-hidden">
                      <Image
                        src={sImages.hero}
                        alt={sImages.heroAlt}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-espresso/30 group-hover:bg-espresso/20 transition-colors" />
                    </div>
                  )}
                  <div className="p-5">
                    <h3 className="font-display text-xl font-bold text-espresso group-hover:text-sage transition-colors">
                      {sName}
                    </h3>
                    <p className="text-warm-gray text-sm mt-2 line-clamp-2 leading-relaxed">
                      {sDesc}
                    </p>
                    <span className="inline-block mt-3 text-sage-muted font-medium text-sm">
                      {isEs ? "Ver mas" : "Learn more"} &rarr;
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
