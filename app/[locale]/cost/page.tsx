import { Metadata } from "next"
import Link from "next/link"
import { getAllCostPageSlugs, getCostPageData } from "@/lib/data/cost-page-data"
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
      ? "Guias de Costos de Remodelacion en Miami | Broke & Fixed Home Solutions"
      : "Remodeling Cost Guides for Miami | Broke & Fixed Home Solutions",
    description: isEs
      ? "Precios reales de remodelacion en Miami-Dade: banos, cocinas, pintura, azulejo y mas. Rangos por alcance, sin sorpresas."
      : "Real remodeling prices for Miami-Dade: bathrooms, kitchens, painting, tile, and more. Ranges by scope, no surprises.",
    alternates: {
      canonical: `https://brokeandfixed.com/${locale}/cost`,
      languages: {
        en: "/en/cost",
        es: "/es/cost",
      },
    },
  }
}

export default async function CostIndexPage({
  params,
}: {
  params: Promise<PageParams>
}) {
  const { locale } = await params
  const isEs = locale === "es"

  const guides = getAllCostPageSlugs()
    .map((slug) => getCostPageData(slug))
    .filter((g) => g !== null)

  const breadcrumbs = [
    { name: isEs ? "Inicio" : "Home", href: `/${locale}` },
    { name: isEs ? "Guias de Costos" : "Cost Guides", href: `/${locale}/cost` },
  ]

  return (
    <main className="min-h-screen bg-cream">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs items={breadcrumbs} />

        <h1 className="font-display text-5xl font-bold text-espresso py-8">
          {isEs ? "Guias de Costos de Remodelacion" : "Remodeling Cost Guides"}
        </h1>

        <p className="text-warm-gray text-lg max-w-2xl leading-relaxed mb-12">
          {isEs
            ? "Estos son los precios reales que cotizamos en Miami-Dade, desglosados por alcance y materiales. Si quieres un numero exacto para tu casa, llamanos al 786-363-7039."
            : "These are the real prices we quote across Miami-Dade, broken down by scope and materials. If you want an exact number for your home, call us at 786-363-7039."}
        </p>

        <div className="grid sm:grid-cols-2 gap-5">
          {guides.map((guide) => {
            const slug = isEs ? guide!.slugEs : guide!.slug
            const title = isEs ? guide!.titleEs : guide!.title
            return (
              <Link
                key={guide!.slug}
                href={`/${locale}/cost/${slug}`}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow group"
              >
                <h2 className="font-display text-2xl font-bold text-espresso group-hover:text-sage transition-colors">
                  {title}
                </h2>
                <span className="inline-block mt-3 text-sage text-sm font-semibold">
                  {isEs ? "Ver precios" : "See pricing"} &rarr;
                </span>
              </Link>
            )
          })}
        </div>

        <section className="py-12 mt-6 border-t border-sage/20">
          <div className="bg-sage/10 rounded-2xl p-8 text-center">
            <h2 className="font-display text-3xl font-bold text-espresso">
              {isEs ? "Quieres un numero exacto?" : "Want an exact number?"}
            </h2>
            <p className="text-warm-gray mt-3 max-w-xl mx-auto">
              {isEs
                ? "Cada casa es diferente. Una visita corta y te damos una cotizacion escrita, gratis."
                : "Every home is different. One short visit and we give you a written quote, free."}
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
    </main>
  )
}
