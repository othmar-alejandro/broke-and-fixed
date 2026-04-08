import { Metadata } from "next"
import Breadcrumbs from "@/components/seo/Breadcrumbs"

interface PageParams {
  locale: string
  slug: string
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>
}): Promise<Metadata> {
  const { slug } = await params
  const title = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  return {
    title: `${title} | Broke & Fixed Blog`,
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<PageParams>
}) {
  const { locale, slug } = await params
  const isEs = locale === "es"

  const title = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  const breadcrumbs = [
    { name: isEs ? "Inicio" : "Home", href: `/${locale}` },
    { name: "Blog", href: `/${locale}/blog` },
    { name: title, href: `/${locale}/blog/${slug}` },
  ]

  return (
    <main className="min-h-screen bg-cream">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs items={breadcrumbs} />

        <article className="py-8">
          <h1 className="font-display text-5xl font-bold text-espresso">
            {title}
          </h1>
          <p className="text-warm-gray text-lg mt-6">
            {isEs
              ? "Este articulo estara disponible pronto."
              : "This article is coming soon."}
          </p>
        </article>
      </div>
    </main>
  )
}
