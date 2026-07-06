import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { services } from "@/lib/data/services"
import { locations } from "@/lib/data/locations"
import { serviceImages } from "@/lib/data/images"
import JsonLd from "@/components/seo/JsonLd"
import Breadcrumbs from "@/components/seo/Breadcrumbs"

interface PageParams {
  locale: string
  location: string
}

function findLocation(slug: string) {
  return locations.find((l) => l.slug === slug)
}

export function generateStaticParams() {
  const params: { locale: string; location: string }[] = []
  for (const location of locations) {
    params.push({ locale: "en", location: location.slug })
    params.push({ locale: "es", location: location.slug })
  }
  return params
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>
}): Promise<Metadata> {
  const { locale, location: locationSlug } = await params
  const location = findLocation(locationSlug)
  if (!location) return {}

  const title =
    locale === "es"
      ? `Remodelacion de Hogares en ${location.name}, ${location.state} | Broke & Fixed`
      : `Home Remodeling in ${location.name}, ${location.state} | Broke & Fixed`

  // Meta description is SERP ad copy, not page intro. Lead with the offer.
  const description =
    locale === "es"
      ? `Remodelacion de cocinas y banos, pintura y azulejos en ${location.name}, FL. Empresa familiar, totalmente asegurada. Presupuesto gratis. Llame al (786) 363-7039.`
      : `Kitchen and bathroom remodeling, painting, and tile in ${location.name}, FL. Family owned, fully insured. Free estimates, fast response. Call (786) 363-7039.`

  return {
    title,
    description,
    alternates: {
      canonical: `https://brokeandfixed.com/${locale}/locations/${locationSlug}`,
      languages: {
        en: `/en/locations/${locationSlug}`,
        es: `/es/locations/${locationSlug}`,
      },
    },
    openGraph: {
      title,
      description,
      type: "website",
    },
    keywords: [
      `home remodeling ${location.name}`,
      `remodeling company ${location.name}`,
      `kitchen remodeling ${location.name}`,
      `bathroom remodeling ${location.name}`,
    ],
  }
}

// Map service slugs to serviceImages keys
function getServiceImageKey(slug: string): string {
  const mapping: Record<string, string> = {
    "bathroom-remodeling": "bathroom",
    "kitchen-remodeling": "kitchen",
    "interior-painting": "interior-painting",
    "exterior-painting": "exterior-painting",
    "tile-work": "tile-work",
    "exterior-repairs": "exterior-repairs",
    "cabinet-refinishing": "cabinet-refinishing",
  }
  return mapping[slug] || slug
}

export default async function LocationPage({
  params,
}: {
  params: Promise<PageParams>
}) {
  const { locale, location: locationSlug } = await params
  const location = findLocation(locationSlug)

  if (!location) notFound()

  const isEs = locale === "es"
  const locationDesc = isEs ? location.descriptionEs : location.description

  const nearbyLocations = location.nearbyLocations
    .map((slug) => locations.find((l) => l.slug === slug))
    .filter(Boolean)

  const displayServices = services.slice(0, 6)

  // Get hero image from first service
  const firstImageKey = getServiceImageKey(displayServices[0].slug)
  const heroImage = serviceImages[firstImageKey]?.hero || "/placeholder.jpg"

  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Broke & Fixed Home Solutions",
    telephone: "786-363-7039",
    address: {
      "@type": "PostalAddress",
      addressLocality: location.name,
      addressRegion: location.state,
      postalCode: location.zip,
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: location.lat,
      longitude: location.lng,
    },
    areaServed: {
      "@type": "City",
      name: location.name,
    },
  }

  const breadcrumbs = [
    { name: isEs ? "Inicio" : "Home", href: `/${locale}` },
    {
      name: isEs ? "Ubicaciones" : "Locations",
      href: `/${locale}/locations/${location.slug}`,
    },
    { name: location.name, href: `/${locale}/locations/${location.slug}` },
  ]

  return (
    <main className="min-h-screen bg-cream">
      {/* ─── HERO ─── */}
      <section className="relative h-[520px] md:h-[600px] w-full overflow-hidden">
        <Image
          src={heroImage}
          alt={`Home remodeling in ${location.name}, Florida`}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-espresso/70" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
          <div className="max-w-7xl mx-auto w-full">
            <Breadcrumbs items={breadcrumbs} />
          </div>
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-white uppercase tracking-tight mt-4">
            {isEs
              ? `Remodelacion de Hogares en ${location.name}, FL`
              : `Home Remodeling in ${location.name}, FL`}
          </h1>
          <p className="mt-4 max-w-2xl text-lg md:text-xl text-white/90 font-sans leading-relaxed">
            {locationDesc}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <a
              href="#quote"
              className="inline-flex items-center justify-center rounded-lg bg-sage-muted px-8 py-4 font-display text-lg font-bold uppercase tracking-wide text-white transition-colors hover:bg-sage-muted/90"
            >
              {isEs ? "Estimado Gratis" : "Get a Free Estimate"}
            </a>
            <a
              href="tel:7863637039"
              className="inline-flex items-center justify-center rounded-lg border-2 border-white px-8 py-4 font-display text-lg font-bold uppercase tracking-wide text-white transition-colors hover:bg-white hover:text-espresso"
            >
              {isEs ? "Llamar" : "Call"} 786-363-7039
            </a>
          </div>
          {/* Trust bar */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-white/80">
            <span className="flex items-center gap-2">
              <svg className="h-5 w-5 text-sage-muted" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
              </svg>
              {isEs ? "Estimados gratis" : "Free estimates"}
            </span>
            <span className="flex items-center gap-2">
              <svg className="h-5 w-5 text-sage-muted" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
              </svg>
              {isEs ? "100% local en Miami-Dade" : "100% local to Miami-Dade"}
            </span>
            <span className="flex items-center gap-2">
              <svg className="h-5 w-5 text-sage-muted" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
              </svg>
              {isEs ? "Hablamos espanol" : "Se habla espanol"}
            </span>
          </div>
        </div>
      </section>

      {/* ─── ABOUT THE AREA ─── */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-espresso uppercase tracking-tight">
              {isEs
                ? `Sobre ${location.name}`
                : `About ${location.name}`}
            </h2>
            <p className="mt-6 text-warm-gray text-lg leading-relaxed">
              {locationDesc}
            </p>
            {location.commonHomeTypes.length > 0 && (
              <div className="mt-8">
                <h3 className="font-display text-xl font-bold text-espresso uppercase">
                  {isEs ? "Tipos de vivienda comunes" : "Common home types"}
                </h3>
                <ul className="mt-4 space-y-2">
                  {location.commonHomeTypes.map((type) => (
                    <li
                      key={type}
                      className="flex items-center gap-3 text-warm-gray"
                    >
                      <span className="h-2 w-2 rounded-full bg-sage-muted flex-shrink-0" />
                      {type}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="relative h-80 md:h-[420px] rounded-2xl overflow-hidden shadow-lg">
            <Image
              src={serviceImages["kitchen"]?.hero || heroImage}
              alt={`Home renovation work in ${location.name}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* ─── OUR SERVICES ─── */}
      <section className="bg-cream py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-espresso uppercase tracking-tight">
              {isEs
                ? `Nuestros servicios en ${location.name}`
                : `Our services in ${location.name}`}
            </h2>
            <p className="mt-4 text-warm-gray text-lg max-w-2xl mx-auto">
              {isEs
                ? "Todo lo que tu hogar necesita, de un solo equipo que conoce la zona."
                : "Everything your home needs, from one team that knows the area."}
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {displayServices.map((service) => {
              const sName = isEs ? service.nameEs : service.name
              const sDesc = isEs ? service.descriptionEs : service.description
              const sSlug = isEs ? service.slugEs : service.slug
              const imageKey = getServiceImageKey(service.slug)
              const iconSrc = serviceImages[imageKey]?.icon || ""

              return (
                <Link
                  key={service.slug}
                  href={`/${locale}/services/${sSlug}/${location.slug}`}
                  className="group relative bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-200 border border-transparent hover:border-sage-muted/30 overflow-hidden"
                >
                  {/* Orange accent bar on hover */}
                  <div className="absolute left-0 top-0 h-full w-1 bg-sage-muted scale-y-0 group-hover:scale-y-100 transition-transform duration-200 origin-top" />

                  <div className="flex items-start gap-4">
                    {iconSrc && (
                      <div className="relative h-12 w-12 flex-shrink-0 rounded-lg bg-cream p-2">
                        <Image
                          src={iconSrc}
                          alt={sName}
                          fill
                          className="object-contain p-1"
                          sizes="48px"
                        />
                      </div>
                    )}
                    <div className="min-w-0">
                      <h3 className="font-display text-xl font-bold text-espresso group-hover:text-sage transition-colors uppercase">
                        {sName}
                      </h3>
                      <p className="text-warm-gray text-sm mt-2 leading-relaxed line-clamp-3">
                        {sDesc}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 flex items-center text-sage-muted font-display text-sm font-bold uppercase tracking-wide">
                    {isEs ? "Saber mas" : "Learn More"}
                    <svg
                      className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── QUOTE FORM ─── */}
      <section id="quote" className="bg-espresso py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white uppercase tracking-tight">
              {isEs
                ? `Estimado gratis en ${location.name}`
                : `Get a Free Estimate in ${location.name}`}
            </h2>
            <p className="mt-4 text-white/70 text-lg">
              {isEs
                ? "Cuentanos sobre tu proyecto y te contactamos en menos de 24 horas."
                : "Tell us about your project and we will get back to you within 24 hours."}
            </p>
          </div>

          <form
            action="https://hooks.zapier.com/hooks/catch/placeholder"
            method="POST"
            className="space-y-5"
          >
            {/* Hidden fields */}
            <input type="hidden" name="location" value={location.name} />
            <input type="hidden" name="locale" value={locale} />

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-bold text-white/80 uppercase tracking-wide mb-2"
                >
                  {isEs ? "Nombre" : "Name"} *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/40 focus:border-sage-muted focus:outline-none focus:ring-2 focus:ring-sage-muted/50 transition-colors"
                  placeholder={isEs ? "Tu nombre" : "Your name"}
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-bold text-white/80 uppercase tracking-wide mb-2"
                >
                  {isEs ? "Telefono" : "Phone"} *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/40 focus:border-sage-muted focus:outline-none focus:ring-2 focus:ring-sage-muted/50 transition-colors"
                  placeholder="(786) 000-0000"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-bold text-white/80 uppercase tracking-wide mb-2"
                >
                  {isEs ? "Correo" : "Email"}{" "}
                  <span className="font-normal text-white/50">
                    ({isEs ? "opcional" : "optional"})
                  </span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/40 focus:border-sage-muted focus:outline-none focus:ring-2 focus:ring-sage-muted/50 transition-colors"
                  placeholder={isEs ? "tu@correo.com" : "you@email.com"}
                />
              </div>
              <div>
                <label
                  htmlFor="service"
                  className="block text-sm font-bold text-white/80 uppercase tracking-wide mb-2"
                >
                  {isEs ? "Servicio" : "Service"} *
                </label>
                <select
                  id="service"
                  name="service"
                  required
                  className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white focus:border-sage-muted focus:outline-none focus:ring-2 focus:ring-sage-muted/50 transition-colors appearance-none"
                >
                  <option value="" className="text-espresso">
                    {isEs ? "Seleccionar servicio" : "Select a service"}
                  </option>
                  {displayServices.map((s) => (
                    <option
                      key={s.slug}
                      value={s.slug}
                      className="text-espresso"
                    >
                      {isEs ? s.nameEs : s.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-bold text-white/80 uppercase tracking-wide mb-2"
              >
                {isEs ? "Mensaje" : "Message"}
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/40 focus:border-sage-muted focus:outline-none focus:ring-2 focus:ring-sage-muted/50 transition-colors resize-none"
                placeholder={
                  isEs
                    ? "Cuentanos sobre tu proyecto..."
                    : "Tell us about your project..."
                }
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-sage-muted px-8 py-4 font-display text-lg font-bold uppercase tracking-wide text-white transition-colors hover:bg-sage-muted/90 focus:outline-none focus:ring-2 focus:ring-sage-muted/50 focus:ring-offset-2 focus:ring-offset-espresso"
            >
              {isEs ? "Enviar solicitud" : "Send Request"}
            </button>

            <p className="text-center text-sm text-white/50">
              {isEs
                ? "Sin compromiso. Respuesta en menos de 24 horas."
                : "No obligation. Response within 24 hours."}
            </p>
          </form>
        </div>
      </section>

      {/* ─── NEARBY AREAS ─── */}
      {nearbyLocations.length > 0 && (
        <section className="bg-white py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-espresso uppercase tracking-tight text-center">
              {isEs ? "Tambien trabajamos en" : "We also serve"}
            </h2>
            <div className="flex flex-wrap justify-center gap-3 mt-8">
              {nearbyLocations.map(
                (loc) =>
                  loc && (
                    <Link
                      key={loc.slug}
                      href={`/${locale}/locations/${loc.slug}`}
                      className="rounded-full bg-cream px-5 py-2.5 text-sm font-bold text-espresso transition-all hover:bg-sage-muted hover:text-white"
                    >
                      {loc.name}, {loc.state}
                    </Link>
                  )
              )}
            </div>
          </div>
        </section>
      )}

      {/* ─── FINAL CTA ─── */}
      <section className="bg-sage-muted py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white uppercase tracking-tight">
            {isEs
              ? `Listo para empezar tu proyecto en ${location.name}?`
              : `Ready to start your project in ${location.name}?`}
          </h2>
          <p className="mt-4 text-white/90 text-lg max-w-xl mx-auto">
            {isEs
              ? "Llama hoy o pide tu estimado gratis. Sin compromiso."
              : "Call today or request your free estimate. No pressure, no obligation."}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="tel:7863637039"
              className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-4 font-display text-lg font-bold uppercase tracking-wide text-sage-muted transition-colors hover:bg-cream"
            >
              {isEs ? "Llamar" : "Call"} 786-363-7039
            </a>
            <a
              href="#quote"
              className="inline-flex items-center justify-center rounded-lg border-2 border-white px-8 py-4 font-display text-lg font-bold uppercase tracking-wide text-white transition-colors hover:bg-white hover:text-sage-muted"
            >
              {isEs ? "Estimado Gratis" : "Get a Free Estimate"}
            </a>
          </div>
        </div>
      </section>

      <JsonLd data={jsonLdData} />
    </main>
  )
}
