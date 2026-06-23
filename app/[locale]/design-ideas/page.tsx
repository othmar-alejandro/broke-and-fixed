import type { Metadata } from "next"
import DesignIdeasClient from "./DesignIdeasClient"

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
    ? "Ideas y Conceptos de Diseño de Cocinas y Baños | Broke & Fixed"
    : "Kitchen & Bathroom Design Ideas & Concepts | Broke & Fixed"
  const description = isEs
    ? "Explore nuestra galería de conceptos de diseño para cocinas modernas, baños de lujo y colocación de azulejos en Miami-Dade. Totalmente asegurados."
    : "Explore our gallery of high-fidelity design concepts for modern kitchens, luxury bathrooms, and custom tile layouts in Miami-Dade. Fully insured."
    
  return {
    title,
    description,
    alternates: {
      canonical: `https://brokeandfixed.com/${locale}/design-ideas`,
      languages: {
        en: "https://brokeandfixed.com/en/design-ideas",
        es: "https://brokeandfixed.com/es/design-ideas",
      },
    },
  }
}

export default async function DesignIdeasPage({
  params,
}: {
  params: Promise<PageParams>
}) {
  const { locale } = await params
  return <DesignIdeasClient locale={locale} />
}
