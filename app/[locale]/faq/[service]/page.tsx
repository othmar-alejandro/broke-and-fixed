import { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { services } from "@/lib/data/services"
import { faqs } from "@/lib/data/faqs"
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
  const slug = locale === "es" ? service.slugEs : service.slug

  return {
    title: locale === "es"
      ? `Preguntas Frecuentes - ${name} | Broke & Fixed`
      : `${name} FAQ | Broke & Fixed`,
    description: locale === "es"
      ? `Respuestas a preguntas comunes sobre ${name.toLowerCase()} en Miami-Dade.`
      : `Answers to common questions about ${name.toLowerCase()} in Miami-Dade.`,
    alternates: {
      canonical: `https://brokeandfixed.com/${locale}/faq/${slug}`,
      languages: {
        en: `https://brokeandfixed.com/en/faq/${service.slug}`,
        es: `https://brokeandfixed.com/es/faq/${service.slugEs}`,
        "x-default": `https://brokeandfixed.com/en/faq/${service.slug}`,
      },
    },
  }
}

export default async function ServiceFAQPage({
  params,
}: {
  params: Promise<PageParams>
}) {
  const { locale, service: serviceSlug } = await params
  const service = findService(serviceSlug, locale)

  if (!service) notFound()

  const isEs = locale === "es"
  const name = isEs ? service.nameEs : service.name
  const serviceSlugForLinks = isEs ? service.slugEs : service.slug
  const serviceFaqs = faqs[service.slug]

  if (!serviceFaqs) notFound()

  const faqJsonLd = {
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
  }

  const breadcrumbs = [
    { name: isEs ? "Inicio" : "Home", href: `/${locale}` },
    { name: isEs ? "Preguntas Frecuentes" : "FAQ", href: `/${locale}/faq` },
    { name, href: `/${locale}/faq/${serviceSlugForLinks}` },
  ]

  return (
    <main className="min-h-screen bg-cream">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs items={breadcrumbs} />

        <h1 className="font-display text-5xl font-bold text-espresso py-8">
          {name} FAQ
        </h1>

        <div className="space-y-3 mb-12">
          {serviceFaqs.map((faq, index) => (
            <details
              key={index}
              className="bg-white rounded-lg shadow-sm group"
            >
              <summary className="cursor-pointer px-6 py-4 font-display font-medium text-espresso hover:text-sage transition-colors list-none flex items-center justify-between">
                <span>{faq.question}</span>
                <span className="text-sage ml-4 group-open:rotate-45 transition-transform text-xl">
                  +
                </span>
              </summary>
              <div className="px-6 pb-5">
                <p className="text-warm-gray leading-relaxed">{faq.answer}</p>
              </div>
            </details>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-12">
          <Link
            href={`/${locale}/services/${serviceSlugForLinks}`}
            className="bg-sage text-white font-display font-bold py-3 px-6 rounded-lg hover:bg-sage/90 transition-colors text-center"
          >
            {isEs ? `Ver servicio de ${name}` : `View ${name} service`}
          </Link>
          <a
            href="tel:7863637039"
            className="border-2 border-sage text-sage font-display font-bold py-3 px-6 rounded-lg hover:bg-sage/10 transition-colors text-center"
          >
            {isEs ? "Llamar ahora: 786-363-7039" : "Call now: 786-363-7039"}
          </a>
        </div>

        <section className="py-12 border-t border-sage/20">
          <div className="bg-sage/10 rounded-2xl p-8 text-center">
            <h2 className="font-display text-3xl font-bold text-espresso">
              {isEs
                ? "Pide tu estimado gratis"
                : "Get your free estimate"}
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

      <JsonLd data={faqJsonLd} />
    </main>
  )
}
