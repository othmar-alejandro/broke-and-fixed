import { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { services } from "@/lib/data/services"
import { locations } from "@/lib/data/locations"
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

  const description =
    locale === "es" ? location.descriptionEs : location.description

  return { title, description }
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
    { name: isEs ? "Ubicaciones" : "Locations", href: `/${locale}/locations/${location.slug}` },
    { name: location.name, href: `/${locale}/locations/${location.slug}` },
  ]

  return (
    <main className="min-h-screen bg-cream">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Breadcrumbs items={breadcrumbs} />

        <section className="py-12">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-espresso">
            {location.name}{" "}
            {isEs ? "Remodelacion de Hogares" : "Home Remodeling"}
          </h1>
          <p className="text-warm-gray text-lg leading-relaxed max-w-3xl mt-6">
            {locationDesc}
          </p>
        </section>

        {/* Service Cards */}
        <section className="py-12 border-t border-sage/20">
          <h2 className="font-display text-3xl font-bold text-espresso">
            {isEs
              ? `Nuestros servicios en ${location.name}`
              : `Our services in ${location.name}`}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {displayServices.map((service) => {
              const sName = isEs ? service.nameEs : service.name
              const sDesc = isEs ? service.descriptionEs : service.description
              const sSlug = isEs ? service.slugEs : service.slug
              return (
                <Link
                  key={service.slug}
                  href={`/${locale}/services/${sSlug}/${location.slug}`}
                  className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow group"
                >
                  <h3 className="font-display text-xl font-bold text-espresso group-hover:text-sage transition-colors">
                    {sName}
                  </h3>
                  <p className="text-warm-gray text-sm mt-2 leading-relaxed line-clamp-3">
                    {sDesc}
                  </p>
                  <div className="mt-4 flex items-center justify-between text-xs text-warm-gray">
                    <span>{service.priceRange}</span>
                    <span>{service.timeline}</span>
                  </div>
                </Link>
              )
            })}
          </div>
        </section>

        {/* Nearby Locations */}
        {nearbyLocations.length > 0 && (
          <section className="py-12 border-t border-sage/20">
            <h2 className="font-display text-2xl font-bold text-espresso">
              {isEs ? "Zonas cercanas" : "Nearby areas"}
            </h2>
            <div className="flex flex-wrap gap-3 mt-4">
              {nearbyLocations.map(
                (loc) =>
                  loc && (
                    <Link
                      key={loc.slug}
                      href={`/${locale}/locations/${loc.slug}`}
                      className="bg-white rounded-lg px-4 py-3 shadow-sm text-espresso font-medium hover:shadow-md hover:text-sage transition-all"
                    >
                      {loc.name}, {loc.state}
                    </Link>
                  )
              )}
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="py-12 border-t border-sage/20">
          <div className="bg-sage/10 rounded-2xl p-8 text-center">
            <h2 className="font-display text-3xl font-bold text-espresso">
              {isEs
                ? `Listo para empezar tu proyecto en ${location.name}?`
                : `Ready to start your project in ${location.name}?`}
            </h2>
            <p className="text-warm-gray mt-3 max-w-xl mx-auto">
              {isEs
                ? "Llama hoy para un estimado gratis. Sin compromiso."
                : "Call today for a free estimate. No pressure, no obligation."}
            </p>
            <a
              href="tel:7863637039"
              className="inline-block mt-6 bg-sage text-white font-display text-xl font-bold py-3 px-8 rounded-lg hover:bg-sage/90 transition-colors"
            >
              786-363-7039
            </a>
          </div>
        </section>
      </div>

      <JsonLd data={jsonLdData} />
    </main>
  )
}
