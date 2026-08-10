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
  const requestedKind = kind === "quote" ? "quote" : "guide"
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

