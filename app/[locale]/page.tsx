import { Metadata } from "next"
import HomeClient from "./HomeClient"

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
    ? "Broke & Fixed Home Solutions | Remodelacion de Cocinas y Banos, Pintura | Miami-Dade"
    : "Broke & Fixed Home Solutions | Kitchen & Bathroom Remodeling, Painting | Miami-Dade"

  const description = isEs
    ? "Remodelacion de cocinas y banos, pintura interior y exterior, azulejos y reparaciones exteriores en Kendall, Pinecrest, Doral, Palmetto Bay y todo Miami-Dade. Empresa familiar, totalmente asegurada. Llame al 786-363-7039."
    : "Kitchen and bathroom remodeling, interior and exterior painting, tile work, and exterior repairs across Kendall, West Kendall, Palmetto Bay, Doral, and all of Miami-Dade. Family owned, fully insured. Call 786-363-7039 for a free estimate."

  return {
    title,
    description,
    alternates: {
      canonical: `https://brokeandfixed.com/${locale}`,
      languages: {
        en: "/en",
        es: "/es",
        "x-default": "/en",
      },
    },
    openGraph: {
      title,
      description,
      url: `https://brokeandfixed.com/${locale}`,
      siteName: "Broke & Fixed Home Solutions",
      locale: isEs ? "es_US" : "en_US",
      type: "website",
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "Broke & Fixed Home Solutions - Miami-Dade Remodeling",
        },
      ],
    },
  }
}

export default function LocaleHome() {
  return <HomeClient />
}
