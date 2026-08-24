import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import JsonLd from "@/components/seo/JsonLd"
import Breadcrumbs from "@/components/seo/Breadcrumbs"
import {
  tubToShowerFaqGroups,
  tubToShowerFaqsFlat,
} from "@/lib/data/tub-to-shower-faqs"

const BASE_URL = "https://brokeandfixed.com"
const PATH = "/faq/tub-to-shower"

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

  const title = isEs
    ? "Preguntas Frecuentes: Conversión de Tina a Ducha en Miami"
    : "Tub-to-Shower Conversion FAQ | Miami-Dade"
  const description = isEs
    ? "Respuestas directas sobre costo, permisos, tiempo, materiales y seguridad para convertir una tina en ducha en Miami-Dade."
    : "Straight answers on cost, permits, timeline, materials, and safety for a tub-to-shower conversion in Miami-Dade."

  return {
    title,
    description,
    alternates: {
      canonical: `${BASE_URL}/${isEs ? "es" : "en"}${PATH}`,
      languages: {
        en: `${BASE_URL}/en${PATH}`,
        es: `${BASE_URL}/es${PATH}`,
        "x-default": `${BASE_URL}/en${PATH}`,
      },
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: `${BASE_URL}/${isEs ? "es" : "en"}${PATH}`,
      siteName: "Broke & Fixed Home Solutions",
      locale: isEs ? "es_US" : "en_US",
    },
  }
}

export default async function TubToShowerFaqPage({
  params,
}: {
  params: Promise<PageParams>
}) {
  const { locale } = await params
  if (locale !== "en" && locale !== "es") notFound()
  const isEs = locale === "es"

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: isEs ? "es" : "en",
    mainEntity: tubToShowerFaqsFlat.map((faq) => ({
      "@type": "Question",
      name: isEs ? faq.questionEs : faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: isEs ? faq.answerEs : faq.answer,
      },
    })),
  }

  const breadcrumbs = [
    { name: isEs ? "Inicio" : "Home", href: `/${locale}` },
    { name: isEs ? "Preguntas Frecuentes" : "FAQ", href: `/${locale}/faq` },
    {
      name: isEs ? "Conversión de tina a ducha" : "Tub-to-shower conversion",
      href: `/${locale}${PATH}`,
    },
  ]

  const relatedGuides = [
    {
      slug: "tub-to-shower-conversion-cost-miami",
      label: isEs ? "Guía de costo" : "Cost guide",
    },
    {
      slug: "tub-to-shower-conversion-timeline-miami",
      label: isEs ? "Guía de tiempo" : "Timeline guide",
    },
    {
      slug: "tub-to-shower-conversion-for-seniors-miami",
      label: isEs ? "Guía para adultos mayores" : "Guide for seniors",
    },
  ]

  return (
    <main className="min-h-screen bg-cream">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs items={breadcrumbs} />

        <h1 className="font-display text-4xl md:text-5xl font-bold text-espresso pt-8 pb-4">
          {isEs
            ? "Conversión de Tina a Ducha: Preguntas Frecuentes"
            : "Tub-to-Shower Conversion FAQ"}
        </h1>

        <p className="text-warm-gray leading-relaxed max-w-2xl mb-10">
          {isEs
            ? "Respuestas directas sobre costo, permisos, tiempo, materiales y seguridad, escritas para casas de Miami-Dade. Si tu pregunta no está aquí, llámanos y te la contestamos igual."
            : "Straight answers on cost, permits, timeline, materials, and safety, written for Miami-Dade homes. If your question is not here, call and we will answer it anyway."}
        </p>

        {tubToShowerFaqGroups.map((group) => (
          <section key={group.id} className="mb-10">
            <h2 className="font-display text-2xl font-bold text-espresso mb-4">
              {isEs ? group.headingEs : group.heading}
            </h2>
            <div className="space-y-3">
              {group.faqs.map((faq) => (
                <details
                  key={faq.question}
                  className="bg-white rounded-lg shadow-sm group"
                >
                  <summary className="cursor-pointer px-6 py-4 font-display font-medium text-espresso hover:text-sage transition-colors list-none flex items-center justify-between gap-4">
                    <span>{isEs ? faq.questionEs : faq.question}</span>
                    <span className="text-sage shrink-0 group-open:rotate-45 transition-transform text-xl">
                      +
                    </span>
                  </summary>
                  <div className="px-6 pb-5">
                    <p className="text-warm-gray leading-relaxed">
                      {isEs ? faq.answerEs : faq.answer}
                    </p>
                  </div>
                </details>
              ))}
            </div>
          </section>
        ))}

        <section className="py-10 border-t border-sage/20">
          <h2 className="font-display text-2xl font-bold text-espresso mb-4">
            {isEs ? "Guías relacionadas" : "Related guides"}
          </h2>
          <div className="flex flex-wrap gap-3">
            {relatedGuides.map((guide) => (
              <Link
                key={guide.slug}
                href={`/${locale}/guides/${guide.slug}`}
                className="rounded-lg border border-sage/40 bg-white px-4 py-2 text-sm font-display font-medium text-espresso hover:border-sage transition-colors"
              >
                {guide.label}
              </Link>
            ))}
          </div>
        </section>

        <section className="pb-16">
          <div className="bg-sage/10 rounded-2xl p-8 text-center">
            <h2 className="font-display text-3xl font-bold text-espresso">
              {isEs ? "Mira tu rango de precio" : "See your price range"}
            </h2>
            <p className="text-warm-gray mt-3 max-w-xl mx-auto">
              {isEs
                ? "El formulario pregunta por tu código postal, el tamaño de la tina y el desagüe, y te da un rango inicial antes de que alguien vaya a medir."
                : "The form asks for your ZIP code, tub size, and drain location, then returns a starting range before anyone comes to measure."}
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href={`/${locale}/landing/tub-to-shower`}
                className="inline-block bg-sage text-white font-display text-lg font-bold py-3 px-8 rounded-lg hover:bg-sage/90 transition-colors"
              >
                {isEs ? "Ver mi rango de precio" : "Get my price range"}
              </Link>
              <a
                href="tel:7863637039"
                className="inline-block border-2 border-sage text-sage font-display text-lg font-bold py-3 px-8 rounded-lg hover:bg-sage/10 transition-colors"
              >
                786-363-7039
              </a>
            </div>
          </div>
        </section>
      </div>

      <JsonLd data={faqSchema} />
    </main>
  )
}
