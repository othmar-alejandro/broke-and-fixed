import type { Metadata } from "next"
import StartClient from "./StartClient"

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
    ? "Broke & Fixed Home Solutions | Enlaces y Proyectos"
    : "Broke & Fixed Home Solutions | Links & Projects"
  const description = isEs
    ? "Llame, escriba, vea nuestros proyectos y reseñas. Remodelación de cocinas y baños, pintura, azulejos y reparaciones en Miami-Dade. Empresa familiar, totalmente asegurada."
    : "Call, text, see our projects and reviews. Kitchen and bath remodeling, painting, tile, and repairs across Miami-Dade. Family owned, fully insured."
  return {
    title,
    description,
    alternates: {
      canonical: `https://brokeandfixed.com/${locale}/start`,
      languages: {
        en: "https://brokeandfixed.com/en/start",
        es: "https://brokeandfixed.com/es/start",
      },
    },
    robots: { index: false, follow: true },
  }
}

export default async function StartPage({
  params,
}: {
  params: Promise<PageParams>
}) {
  const { locale } = await params
  return <StartClient locale={locale} />
}
