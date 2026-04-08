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
    title: `${name} | Miami-Dade | Broke & Fixed`,
    description,
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

  const jsonLdData = {
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
  }

  const breadcrumbs = [
    { name: isEs ? "Inicio" : "Home", href: `/${locale}` },
    { name: isEs ? "Servicios" : "Services", href: `/${locale}/services/${serviceSlugForLinks}` },
    { name, href: `/${locale}/services/${serviceSlugForLinks}` },
  ]

  return (
    <main className="min-h-screen bg-cream">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Breadcrumbs items={breadcrumbs} />

        <section className="py-12">
          <h1 className="font-display text-5xl font-bold text-espresso">
            {name}
          </h1>
          <p className="text-warm-gray text-lg mt-6 max-w-3xl leading-relaxed">
            {description}
          </p>

          <div className="mt-8 flex flex-wrap gap-6">
            <div className="bg-white rounded-lg p-5 shadow-sm">
              <span className="text-xs uppercase tracking-wider text-warm-gray">
                {isEs ? "Rango de precio" : "Price Range"}
              </span>
              <p className="font-display text-xl font-bold text-espresso mt-1">
                {service.priceRange}
              </p>
            </div>
            <div className="bg-white rounded-lg p-5 shadow-sm">
              <span className="text-xs uppercase tracking-wider text-warm-gray">
                {isEs ? "Tiempo estimado" : "Timeline"}
              </span>
              <p className="font-display text-xl font-bold text-espresso mt-1">
                {service.timeline}
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 border-t border-sage/20">
          <h2 className="font-display text-3xl font-bold text-espresso">
            {isEs
              ? `${name} en tu zona`
              : `${name} in your area`}
          </h2>
          <p className="text-warm-gray mt-3">
            {isEs
              ? "Atendemos estas comunidades en Miami-Dade:"
              : "We serve these communities across Miami-Dade:"}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-6">
            {locations.map((loc) => (
              <Link
                key={loc.slug}
                href={`/${locale}/services/${serviceSlugForLinks}/${loc.slug}`}
                className="bg-white rounded-lg p-4 text-center shadow-sm hover:shadow-md transition-shadow text-espresso font-medium hover:text-sage"
              >
                {loc.name}, {loc.state}
              </Link>
            ))}
          </div>
        </section>

        <section className="py-12 border-t border-sage/20">
          <div className="bg-sage/10 rounded-2xl p-8 text-center">
            <h2 className="font-display text-3xl font-bold text-espresso">
              {isEs ? "Pide tu estimado gratis" : "Get your free estimate"}
            </h2>
            <p className="text-warm-gray mt-3 max-w-xl mx-auto">
              {isEs
                ? "Llama hoy para hablar sobre tu proyecto. Sin compromiso."
                : "Call today to talk about your project. No pressure, no obligation."}
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
