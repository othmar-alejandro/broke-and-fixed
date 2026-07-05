import { Metadata } from "next"
import Link from "next/link"
import { getAllGuideKeywords, getGuidePage } from "@/lib/data/long-tail-data"
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
      ? "Guias de Remodelacion para Miami | Broke & Fixed Home Solutions"
      : "Home Remodeling Guides for Miami | Broke & Fixed Home Solutions",
    description: isEs
      ? "Guias practicas de remodelacion para casas de Miami-Dade: banos, cocinas, pintura y azulejo, escritas por el equipo que hace el trabajo."
      : "Practical remodeling guides for Miami-Dade homes: bathrooms, kitchens, painting, and tile, written by the team that does the work.",
    alternates: {
      canonical: `https://brokeandfixed.com/${locale}/guides`,
      languages: {
        en: "/en/guides",
        es: "/es/guides",
      },
    },
  }
}

export default async function GuidesIndexPage({
  params,
}: {
  params: Promise<PageParams>
}) {
  const { locale } = await params
  const isEs = locale === "es"

  const guides = getAllGuideKeywords()
    .map((keyword) => getGuidePage(keyword))
    .filter((g) => g !== null)

  const breadcrumbs = [
    { name: isEs ? "Inicio" : "Home", href: `/${locale}` },
    { name: isEs ? "Guias" : "Guides", href: `/${locale}/guides` },
  ]

  return (
    <main className="min-h-screen bg-cream">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs items={breadcrumbs} />

        <h1 className="font-display text-5xl font-bold text-espresso py-8">
          {isEs ? "Guias de Remodelacion" : "Home Remodeling Guides"}
        </h1>

        <p className="text-warm-gray text-lg max-w-2xl leading-relaxed mb-12">
          {isEs
            ? "Respuestas directas a las preguntas que los propietarios de Miami nos hacen todos los dias. Escritas por el equipo que hace el trabajo, no por una agencia."
            : "Straight answers to the questions Miami homeowners ask us every day. Written by the team that does the work, not an agency."}
        </p>

        <div className="grid sm:grid-cols-2 gap-5">
          {guides.map((guide) => {
            const title = isEs ? guide!.titleEs : guide!.title
            return (
              <Link
                key={guide!.keyword}
                href={`/${locale}/guides/${guide!.keyword}`}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow group"
              >
                <h2 className="font-display text-xl font-bold text-espresso group-hover:text-sage transition-colors">
                  {title}
                </h2>
                <span className="inline-block mt-3 text-sage text-sm font-semibold">
                  {isEs ? "Leer la guia" : "Read the guide"} &rarr;
                </span>
              </Link>
            )
          })}
        </div>

        <section className="py-12 mt-6 border-t border-sage/20">
          <div className="bg-sage/10 rounded-2xl p-8 text-center">
            <h2 className="font-display text-3xl font-bold text-espresso">
              {isEs ? "Listo para empezar tu proyecto?" : "Ready to start your project?"}
            </h2>
            <p className="text-warm-gray mt-3 max-w-xl mx-auto">
              {isEs
                ? "Llamanos y hablamos de tu casa. Cotizacion escrita y gratis."
                : "Call us and let's talk about your home. Written quote, free."}
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
