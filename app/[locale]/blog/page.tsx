import { Metadata } from "next"
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

  return {
    title: locale === "es"
      ? "Blog | Broke & Fixed Home Solutions"
      : "Blog | Broke & Fixed Home Solutions",
    description: locale === "es"
      ? "Guias de costos, proyectos de antes y despues, y consejos para propietarios en Miami-Dade."
      : "Cost guides, before and after projects, and tips for Miami-Dade homeowners.",
  }
}

export default async function BlogPage({
  params,
}: {
  params: Promise<PageParams>
}) {
  const { locale } = await params
  const isEs = locale === "es"

  const breadcrumbs = [
    { name: isEs ? "Inicio" : "Home", href: `/${locale}` },
    { name: "Blog", href: `/${locale}/blog` },
  ]

  return (
    <main className="min-h-screen bg-cream">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs items={breadcrumbs} />

        <h1 className="font-display text-5xl font-bold text-espresso py-8">
          Blog
        </h1>

        <p className="text-warm-gray text-lg max-w-2xl leading-relaxed">
          {isEs
            ? "Contenido proximamente. Estaremos compartiendo guias de costos, proyectos de antes y despues, y consejos para propietarios en Miami-Dade."
            : "Content coming soon. We'll be sharing cost guides, before and after projects, and tips for Miami-Dade homeowners."}
        </p>
      </div>
    </main>
  )
}
