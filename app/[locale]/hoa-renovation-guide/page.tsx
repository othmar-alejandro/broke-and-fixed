import { Metadata } from "next"
import Link from "next/link"
import { hoaCommunities } from "@/lib/data/hoa-communities"
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

  const title =
    locale === "es"
      ? "Guia de Renovacion del HOA en Miami-Dade | Por Comunidad"
      : "Miami-Dade HOA Renovation Guide | By Community"
  const description =
    locale === "es"
      ? "Guia comunidad por comunidad para obtener aprobacion del HOA para renovaciones en Doral, The Hammocks, Coral Gables, y mas areas de Miami-Dade. Cronogramas reales y patrones de aprobacion de un equipo local de remodelacion."
      : "Community-by-community guide to getting HOA approval for renovations in Doral, The Hammocks, Coral Gables, and more Miami-Dade areas. Real timelines and approval patterns from a local remodeling team."

  return {
    title,
    description,
    alternates: {
      languages: {
        en: "/en/hoa-renovation-guide",
        es: "/es/hoa-renovation-guide",
      },
    },
  }
}

export default async function HoaGuideHubPage({
  params,
}: {
  params: Promise<PageParams>
}) {
  const { locale } = await params
  const isEs = locale === "es"

  const breadcrumbs = [
    { name: isEs ? "Inicio" : "Home", href: `/${locale}` },
    {
      name: isEs ? "Guia de Renovacion del HOA" : "HOA Renovation Guide",
      href: `/${locale}/hoa-renovation-guide`,
    },
  ]

  return (
    <main className="min-h-screen bg-cream">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <Breadcrumbs items={breadcrumbs} />

        <h1 className="font-display text-4xl md:text-5xl font-bold text-espresso py-6">
          {isEs
            ? "Guia de Renovacion del HOA en Miami-Dade"
            : "Miami-Dade HOA Renovation Guide"}
        </h1>

        <p className="text-warm-gray text-lg max-w-3xl leading-relaxed mb-8">
          {isEs
            ? "La mayoria de las casas en Miami-Dade estan en comunidades con HOA. Cada HOA tiene sus propias reglas, cronogramas, y particularidades. Aqui esta lo que sabemos por experiencia directa de hacer renovaciones en cada area."
            : "Most homes in Miami-Dade are in HOA communities. Every HOA has its own rules, timelines, and quirks. Here is what we know from direct experience doing renovations in each area."}
        </p>

        {/* Start here block */}
        <div className="bg-shield-navy text-cream rounded-lg p-6 mb-12">
          <h2 className="font-display text-2xl font-bold text-white mb-3">
            {isEs ? "Empieza Aqui" : "Start Here"}
          </h2>
          <p className="mb-4">
            {isEs
              ? "Si esta es tu primera vez tratando con el HOA, lee primero nuestra guia completa antes de profundizar en los detalles especificos de tu comunidad."
              : "If this is your first time dealing with the HOA, read our complete guide first before diving into your community's specifics."}
          </p>
          <Link
            href={`/${locale}/blog/miami-hoa-renovation-approval-guide`}
            className="inline-block bg-trade-orange text-white font-accent font-bold px-6 py-2 rounded hover:bg-trade-orange/90 transition-colors"
          >
            {isEs
              ? "Guia Completa de Aprobacion del HOA"
              : "Complete HOA Approval Guide"}{" "}
            &rarr;
          </Link>
        </div>

        {/* Community grid */}
        <h2 className="font-display text-3xl font-bold text-espresso mb-6">
          {isEs ? "Por Comunidad" : "By Community"}
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {hoaCommunities.map((c) => {
            const name = isEs ? c.nameEs : c.name
            const intro = isEs ? c.introEs : c.intro
            const timeline = isEs ? c.typicalTimelineEs : c.typicalTimeline
            const slug = isEs ? c.slugEs : c.slug

            return (
              <Link
                key={c.slug}
                href={`/${locale}/hoa-renovation-guide/${slug}`}
                className="block bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md hover:border-trade-orange transition-all"
              >
                <h3 className="font-display text-2xl font-bold text-espresso mb-2 hover:text-trade-orange transition-colors">
                  {name}
                </h3>
                <div className="text-trade-orange font-accent text-sm uppercase font-bold mb-3">
                  {timeline}
                </div>
                <p className="text-warm-gray text-sm leading-relaxed line-clamp-3">
                  {intro}
                </p>
                <div className="text-trade-orange font-accent font-medium text-sm mt-4 hover:underline">
                  {isEs ? "Ver guia" : "View guide"} &rarr;
                </div>
              </Link>
            )
          })}
        </div>

        {/* Related blog posts */}
        <div className="mt-16">
          <h2 className="font-display text-3xl font-bold text-espresso mb-6">
            {isEs ? "Lectura Relacionada" : "Related Reading"}
          </h2>
          <div className="space-y-3">
            <Link
              href={`/${locale}/blog/miami-hoa-renovation-approval-guide`}
              className="block bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md hover:border-trade-orange transition-all"
            >
              <div className="font-display font-bold text-espresso text-lg hover:text-trade-orange transition-colors">
                {isEs
                  ? "Guia Completa de Aprobacion del HOA en Miami"
                  : "Complete Miami HOA Renovation Approval Guide"}
              </div>
              <div className="text-warm-gray text-sm mt-1">
                {isEs
                  ? "Florida Capitulo 720, proceso del ARC, multas, tus derechos."
                  : "Florida Chapter 720, ARC process, fines, your rights."}
              </div>
            </Link>
            <Link
              href={`/${locale}/blog/hoa-approval-vs-permit-miami`}
              className="block bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md hover:border-trade-orange transition-all"
            >
              <div className="font-display font-bold text-espresso text-lg hover:text-trade-orange transition-colors">
                {isEs
                  ? "Aprobacion del HOA vs Permiso del Condado"
                  : "HOA Approval vs County Permit"}
              </div>
              <div className="text-warm-gray text-sm mt-1">
                {isEs
                  ? "Cuando necesitas uno, ambos, o ninguno."
                  : "When you need one, both, or neither."}
              </div>
            </Link>
            <Link
              href={`/${locale}/blog/hurricane-impact-windows-miami-hoa-rights`}
              className="block bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md hover:border-trade-orange transition-all"
            >
              <div className="font-display font-bold text-espresso text-lg hover:text-trade-orange transition-colors">
                {isEs
                  ? "Ventanas de Impacto Contra Huracanes y Tu HOA"
                  : "Hurricane Impact Windows and Your HOA"}
              </div>
              <div className="text-warm-gray text-sm mt-1">
                {isEs
                  ? "Florida §720.3035(6) protege tu derecho a instalar."
                  : "Florida §720.3035(6) protects your right to install."}
              </div>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
