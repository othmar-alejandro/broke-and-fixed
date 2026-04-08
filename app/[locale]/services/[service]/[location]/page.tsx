import { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { services } from "@/lib/data/services"
import { locations } from "@/lib/data/locations"
import JsonLd from "@/components/seo/JsonLd"
import Breadcrumbs from "@/components/seo/Breadcrumbs"

interface PageParams {
  locale: string
  service: string
  location: string
}

function findService(slug: string, locale: string) {
  return services.find((s) =>
    locale === "es" ? s.slugEs === slug : s.slug === slug
  )
}

function findLocation(slug: string) {
  return locations.find((l) => l.slug === slug)
}

export function generateStaticParams() {
  const params: { locale: string; service: string; location: string }[] = []
  for (const service of services) {
    for (const location of locations) {
      params.push({
        locale: "en",
        service: service.slug,
        location: location.slug,
      })
      params.push({
        locale: "es",
        service: service.slugEs,
        location: location.slug,
      })
    }
  }
  return params
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>
}): Promise<Metadata> {
  const { locale, service: serviceSlug, location: locationSlug } = await params
  const service = findService(serviceSlug, locale)
  const location = findLocation(locationSlug)
  if (!service || !location) return {}

  const name = locale === "es" ? service.nameEs : service.name

  return {
    title: `${name} in ${location.name}, ${location.state} | Broke & Fixed Home Solutions`,
    description: `${name} in ${location.name}, ${location.state}. ${locale === "es" ? service.descriptionEs : service.description}`,
  }
}

export default async function ServiceLocationPage({
  params,
}: {
  params: Promise<PageParams>
}) {
  const { locale, service: serviceSlug, location: locationSlug } = await params
  const service = findService(serviceSlug, locale)
  const location = findLocation(locationSlug)

  if (!service || !location) notFound()

  const isEs = locale === "es"
  const serviceName = isEs ? service.nameEs : service.name
  const serviceDesc = isEs ? service.descriptionEs : service.description
  const locationDesc = isEs ? location.descriptionEs : location.description
  const serviceSlugForLinks = isEs ? service.slugEs : service.slug

  const nearbyLocations = location.nearbyLocations
    .map((slug) => locations.find((l) => l.slug === slug))
    .filter(Boolean)

  const otherServices = services.filter((s) => s.slug !== service.slug)

  const faqItems = isEs
    ? [
        {
          q: `Cuanto cuesta ${serviceName.toLowerCase()} en ${location.name}?`,
          a: `El rango tipico para ${serviceName.toLowerCase()} en ${location.name} es ${service.priceRange}. El costo final depende del alcance del trabajo, los materiales, y el estado actual de tu hogar. Llama al 786-363-7039 para un estimado gratis.`,
        },
        {
          q: `Cuanto tiempo toma ${serviceName.toLowerCase()} en ${location.name}?`,
          a: `La mayoria de los proyectos de ${serviceName.toLowerCase()} toman ${service.timeline}. Te damos un cronograma claro antes de empezar para que sepas que esperar.`,
        },
        {
          q: `Ofrecen estimados gratis para ${serviceName.toLowerCase()} en ${location.name}?`,
          a: `Si. Ofrecemos estimados gratis sin compromiso para todos los proyectos de ${serviceName.toLowerCase()} en ${location.name} y todo Miami-Dade. Llama al 786-363-7039.`,
        },
      ]
    : [
        {
          q: `How much does ${serviceName.toLowerCase()} cost in ${location.name}?`,
          a: `The typical range for ${serviceName.toLowerCase()} in ${location.name} is ${service.priceRange}. Final cost depends on scope of work, materials, and the current condition of your home. Call 786-363-7039 for a free estimate.`,
        },
        {
          q: `How long does ${serviceName.toLowerCase()} take in ${location.name}?`,
          a: `Most ${serviceName.toLowerCase()} projects take ${service.timeline}. We give you a clear timeline before starting so you know what to expect.`,
        },
        {
          q: `Do you offer free estimates for ${serviceName.toLowerCase()} in ${location.name}?`,
          a: `Yes. We offer free, no-pressure estimates for all ${serviceName.toLowerCase()} projects in ${location.name} and across Miami-Dade. Call 786-363-7039.`,
        },
      ]

  const jsonLdData = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: serviceName,
      description: serviceDesc,
      provider: {
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
      },
      areaServed: {
        "@type": "City",
        name: location.name,
        containedInPlace: {
          "@type": "AdministrativeArea",
          name: "Miami-Dade County, FL",
        },
      },
    },
    {
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
      priceRange: service.priceRange,
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.a,
        },
      })),
    },
  ]

  const breadcrumbs = [
    { name: isEs ? "Inicio" : "Home", href: `/${locale}` },
    { name: isEs ? "Servicios" : "Services", href: `/${locale}/services/${serviceSlugForLinks}` },
    { name: serviceName, href: `/${locale}/services/${serviceSlugForLinks}` },
    {
      name: location.name,
      href: `/${locale}/services/${serviceSlugForLinks}/${location.slug}`,
    },
  ]

  return (
    <main className="min-h-screen bg-cream">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Breadcrumbs items={breadcrumbs} />

        {/* Hero */}
        <section className="py-12">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-espresso">
            {serviceName} {isEs ? "en" : "in"} {location.name}, {location.state}
          </h1>
        </section>

        {/* Quick Facts */}
        <section className="bg-white rounded-2xl p-6 shadow-sm">
          <dl className="grid grid-cols-2 md:grid-cols-5 gap-6">
            <div>
              <dt className="text-xs uppercase tracking-wider text-warm-gray">
                {isEs ? "Servicio" : "Service"}
              </dt>
              <dd className="font-display text-lg font-bold text-espresso mt-1">
                {serviceName}
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wider text-warm-gray">
                {isEs ? "Ubicacion" : "Location"}
              </dt>
              <dd className="font-display text-lg font-bold text-espresso mt-1">
                {location.name}, {location.state}
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wider text-warm-gray">
                {isEs ? "Rango de precio" : "Price Range"}
              </dt>
              <dd className="font-display text-lg font-bold text-espresso mt-1">
                {service.priceRange}
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wider text-warm-gray">
                {isEs ? "Tiempo estimado" : "Timeline"}
              </dt>
              <dd className="font-display text-lg font-bold text-espresso mt-1">
                {service.timeline}
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wider text-warm-gray">
                {isEs ? "Telefono" : "Phone"}
              </dt>
              <dd className="font-display text-lg font-bold text-espresso mt-1">
                <a href="tel:7863637039" className="hover:text-sage transition-colors">
                  786-363-7039
                </a>
              </dd>
            </div>
          </dl>
        </section>

        {/* Intro */}
        <section className="py-12">
          <p className="text-warm-gray text-lg leading-relaxed max-w-3xl">
            {serviceDesc}
          </p>
          <p className="text-warm-gray text-lg leading-relaxed max-w-3xl mt-4">
            {locationDesc}
          </p>
        </section>

        {/* What we do */}
        <section className="py-12 border-t border-sage/20">
          <h2 className="font-display text-3xl font-bold text-espresso">
            {isEs ? "Lo que hacemos" : "What we do"}
          </h2>
          <p className="text-warm-gray text-lg leading-relaxed max-w-3xl mt-4">
            {isEs
              ? `Nuestro equipo de ${serviceName.toLowerCase()} trabaja directamente con propietarios en ${location.name} para entregar resultados que duran. Sin subcontratistas. Sin intermediarios. Solo gente que sabe lo que hace y que se presenta a trabajar todos los dias.`
              : `Our ${serviceName.toLowerCase()} team works directly with homeowners in ${location.name} to deliver results that last. No subcontractors. No middlemen. Just people who know what they are doing and show up to work every day.`}
          </p>
          <p className="text-warm-gray text-lg leading-relaxed max-w-3xl mt-4">
            {isEs
              ? `Cada proyecto incluye un estimado detallado, un cronograma claro, y comunicacion directa de principio a fin. Si tienes preguntas durante el trabajo, hablas con nosotros, no con un asistente.`
              : `Every project includes a detailed estimate, a clear timeline, and direct communication from start to finish. If you have questions during the job, you talk to us, not an answering service.`}
          </p>
        </section>

        {/* About Location */}
        <section className="py-12 border-t border-sage/20">
          <h2 className="font-display text-3xl font-bold text-espresso">
            {isEs ? `Sobre ${location.name}` : `About ${location.name}`}
          </h2>
          <p className="text-warm-gray text-lg leading-relaxed max-w-3xl mt-4">
            {locationDesc}
          </p>
          {location.commonHomeTypes.length > 0 && (
            <div className="mt-6">
              <h3 className="font-display text-xl font-bold text-espresso">
                {isEs ? "Tipos de hogar comunes" : "Common home types"}
              </h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {location.commonHomeTypes.map((type) => (
                  <li
                    key={type}
                    className="bg-white rounded-full px-4 py-2 text-sm text-warm-gray shadow-sm"
                  >
                    {type}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>

        {/* FAQ */}
        <section className="py-12 border-t border-sage/20">
          <h2 className="font-display text-3xl font-bold text-espresso">
            {isEs ? "Preguntas frecuentes" : "Frequently asked questions"}
          </h2>
          <div className="mt-6 space-y-6 max-w-3xl">
            {faqItems.map((item) => (
              <div key={item.q} className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="font-display text-lg font-bold text-espresso">
                  {item.q}
                </h3>
                <p className="text-warm-gray mt-2 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Internal Links */}
        <section className="py-12 border-t border-sage/20">
          {nearbyLocations.length > 0 && (
            <div>
              <h2 className="font-display text-2xl font-bold text-espresso">
                {isEs
                  ? `${serviceName} en zonas cercanas`
                  : `${serviceName} nearby`}
              </h2>
              <div className="flex flex-wrap gap-3 mt-4">
                {nearbyLocations.map(
                  (loc) =>
                    loc && (
                      <Link
                        key={loc.slug}
                        href={`/${locale}/services/${serviceSlugForLinks}/${loc.slug}`}
                        className="bg-white rounded-lg px-4 py-3 shadow-sm text-espresso font-medium hover:shadow-md hover:text-sage transition-all"
                      >
                        {loc.name}, {loc.state}
                      </Link>
                    )
                )}
              </div>
            </div>
          )}

          <div className="mt-10">
            <h2 className="font-display text-2xl font-bold text-espresso">
              {isEs
                ? `Otros servicios en ${location.name}`
                : `Other services in ${location.name}`}
            </h2>
            <div className="flex flex-wrap gap-3 mt-4">
              {otherServices.map((s) => {
                const slug = isEs ? s.slugEs : s.slug
                const sName = isEs ? s.nameEs : s.name
                return (
                  <Link
                    key={s.slug}
                    href={`/${locale}/services/${slug}/${location.slug}`}
                    className="bg-white rounded-lg px-4 py-3 shadow-sm text-espresso font-medium hover:shadow-md hover:text-sage transition-all"
                  >
                    {sName}
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 border-t border-sage/20">
          <div className="bg-sage/10 rounded-2xl p-8 text-center">
            <h2 className="font-display text-3xl font-bold text-espresso">
              {isEs
                ? "Llama para un estimado gratis"
                : "Call for a free estimate"}
            </h2>
            <p className="text-warm-gray mt-3 max-w-xl mx-auto">
              {isEs
                ? `Hablemos sobre tu proyecto de ${serviceName.toLowerCase()} en ${location.name}. Sin compromiso.`
                : `Let's talk about your ${serviceName.toLowerCase()} project in ${location.name}. No pressure, no obligation.`}
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
