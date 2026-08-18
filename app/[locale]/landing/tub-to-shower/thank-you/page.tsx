import type { Metadata } from "next"

import ThankYouContent from "@/components/landing/ThankYouContent"
import "../landing.css"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const es = locale === "es"
  return {
    title: es ? "Gracias | Broke & Fixed" : "Thank You | Broke & Fixed",
    description: es
      ? "Abra su guía o revise los próximos pasos para su conversión de bañera a ducha."
      : "Open your guide or review the next steps for your tub to shower conversion.",
    robots: { index: false, follow: true },
    alternates: {
      canonical: `/${es ? "es" : "en"}/landing/tub-to-shower/thank-you`,
      languages: {
        en: "/en/landing/tub-to-shower/thank-you",
        es: "/es/landing/tub-to-shower/thank-you",
        "x-default": "/en/landing/tub-to-shower/thank-you",
      },
    },
  }
}

export default async function ThankYouPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ kind?: string }>
}) {
  const { locale } = await params
  const { kind } = await searchParams
  /*
   * Defaults to "quote", not "guide". These two branches fire different
   * conversion events, and the estimator is the one Meta optimizes on. When the
   * query string went missing, a completed estimator used to report itself as a
   * guide download: the Lead event never fired, the campaign undercounted, and
   * the algorithm was trained on the wrong signal. Guessing wrong in this
   * direction costs a duplicate guide event. Guessing wrong in the other costs
   * a conversion.
   */
  const requestedKind = kind === "guide" ? "guide" : "quote"
  const url = `https://brokeandfixed.com/${locale}/landing/tub-to-shower/thank-you`
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: locale === "es" ? "Gracias" : "Thank You",
        url,
        isPartOf: { "@id": "https://brokeandfixed.com/#website" },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Broke & Fixed", item: "https://brokeandfixed.com" },
          {
            "@type": "ListItem",
            position: 2,
            name: locale === "es" ? "Conversión de bañera a ducha" : "Tub to Shower Conversion",
            item: `https://brokeandfixed.com/${locale}/landing/tub-to-shower`,
          },
          { "@type": "ListItem", position: 3, name: locale === "es" ? "Gracias" : "Thank You", item: url },
        ],
      },
    ],
  }

  return (
    <div className="lp">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <ThankYouContent locale={locale} requestedKind={requestedKind} />
    </div>
  )
}

