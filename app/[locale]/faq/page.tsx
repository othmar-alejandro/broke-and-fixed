import { Metadata } from "next"
import Link from "next/link"
import { services } from "@/lib/data/services"
import { faqs } from "@/lib/data/faqs"
import JsonLd from "@/components/seo/JsonLd"
import Breadcrumbs from "@/components/seo/Breadcrumbs"

interface PageParams {
  locale: string
}

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "es" }]
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>
}): Promise<Metadata> {
  const { locale } = await params
  const isEs = locale === "es"

  return {
    title: isEs
      ? "Preguntas Frecuentes | Remodelacion del Hogar | Broke & Fixed Home Solutions"
      : "FAQ | Home Remodeling Questions | Broke & Fixed Home Solutions",
    description: isEs
      ? "Respuestas a las preguntas mas comunes sobre nuestros servicios de remodelacion en Miami-Dade."
      : "Answers to the most common questions about our home remodeling services in Miami-Dade.",
    alternates: {
      canonical: `https://brokeandfixed.com/${locale}/faq`,
      languages: {
        en: "/en/faq",
        es: "/es/faq",
      },
    },
    openGraph: {
      title: isEs ? "Preguntas Frecuentes | Broke & Fixed" : "FAQ | Broke & Fixed",
      description: isEs
        ? "Respuestas a las preguntas mas comunes sobre nuestros servicios de remodelacion en Miami-Dade."
        : "Answers to the most common questions about our home remodeling services in Miami-Dade.",
      type: "website",
    },
  }
}

export default async function FAQPage({
  params,
}: {
  params: Promise<PageParams>
}) {
  const { locale } = await params
  const isEs = locale === "es"

  const allFaqItems: { question: string; answer: string }[] = []
  for (const service of services) {
    const serviceFaqs = faqs[service.slug]
    if (serviceFaqs) {
      allFaqItems.push(...serviceFaqs)
    }
  }

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: allFaqItems.map((faq) => ({
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
  ]

  return (
    <main className="min-h-screen bg-cream">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs items={breadcrumbs} />

        <h1 className="font-display text-5xl font-bold text-espresso py-8">
          {isEs ? "Preguntas Frecuentes" : "Frequently Asked Questions"}
        </h1>

        <p className="text-warm-gray text-lg max-w-2xl leading-relaxed mb-12">
          {isEs
            ? "Estas son las preguntas que nos hacen con mas frecuencia. Si no encuentras lo que buscas, llamanos al 786-363-7039."
            : "These are the questions we get asked the most. If you do not see what you are looking for, give us a call at 786-363-7039."}
        </p>

        {services.map((service) => {
          const serviceFaqs = faqs[service.slug]
          if (!serviceFaqs) return null
          const serviceName = isEs ? service.nameEs : service.name
          const serviceSlug = isEs ? service.slugEs : service.slug

          return (
            <section key={service.slug} className="mb-12">
              <div className="flex items-baseline justify-between mb-4">
                <h2 className="font-display text-3xl font-bold text-espresso">
                  {serviceName}
                </h2>
                <Link
                  href={`/${locale}/faq/${serviceSlug}`}
                  className="text-sage text-sm hover:underline"
                >
                  {isEs ? "Ver todas" : "View all"}
                </Link>
              </div>

              <div className="space-y-3">
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
                      <p className="text-warm-gray leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </details>
                ))}
              </div>
            </section>
          )
        })}

        <section className="py-12 border-t border-sage/20">
          <div className="bg-sage/10 rounded-2xl p-8 text-center">
            <h2 className="font-display text-3xl font-bold text-espresso">
              {isEs
                ? "Todavia tienes preguntas?"
                : "Still have questions?"}
            </h2>
            <p className="text-warm-gray mt-3 max-w-xl mx-auto">
              {isEs
                ? "Llamanos y hablamos de tu proyecto. Sin compromiso."
                : "Call us and let's talk about your project. No pressure."}
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
