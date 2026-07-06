import { Metadata } from "next"
import Link from "next/link"
import Breadcrumbs from "@/components/seo/Breadcrumbs"
import { getAllPosts, getPostTitle, getPostDescription, getPostImage } from "@/lib/blog"

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
    alternates: {
      canonical: `https://brokeandfixed.com/${locale}/blog`,
      languages: {
        en: "https://brokeandfixed.com/en/blog",
        es: "https://brokeandfixed.com/es/blog",
        "x-default": "https://brokeandfixed.com/en/blog",
      },
    },
  }
}

const categoryLabels: Record<string, { en: string; es: string }> = {
  "cost-guide": { en: "Cost Guide", es: "Guia de Costos" },
  tips: { en: "Tips", es: "Consejos" },
  "project-spotlight": { en: "Project Spotlight", es: "Proyecto Destacado" },
  "neighborhood-guide": { en: "Neighborhood Guide", es: "Guia del Vecindario" },
  "kitchen-remodeling": { en: "Kitchen Remodeling", es: "Remodelacion de Cocina" },
  "hoa-guide": { en: "HOA Guide", es: "Guia del HOA" },
  seasonal: { en: "Seasonal", es: "De Temporada" },
}

export default async function BlogPage({
  params,
}: {
  params: Promise<PageParams>
}) {
  const { locale } = await params
  const isEs = locale === "es"
  const posts = getAllPosts()

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

        {posts.length === 0 ? (
          <p className="text-warm-gray text-lg max-w-2xl leading-relaxed">
            {isEs
              ? "Contenido proximamente. Estaremos compartiendo guias de costos, proyectos de antes y despues, y consejos para propietarios en Miami-Dade."
              : "Content coming soon. We'll be sharing cost guides, before and after projects, and tips for Miami-Dade homeowners."}
          </p>
        ) : (
          <div className="space-y-8">
            {posts.map((post) => {
              const title = getPostTitle(post, locale)
              const description = getPostDescription(post, locale)
              const catLabel = categoryLabels[post.category]
              const categoryName = catLabel
                ? isEs ? catLabel.es : catLabel.en
                : post.category

              return (
                <article
                  key={post.slug}
                  className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow flex flex-col md:flex-row"
                >
                  <Link
                    href={`/${locale}/blog/${post.slug}`}
                    className="block w-full md:w-1/3 aspect-[16/9] md:aspect-auto md:min-h-full overflow-hidden relative shrink-0"
                  >
                    <img
                      src={getPostImage(post)}
                      alt={title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </Link>
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 text-sm text-warm-gray mb-3">
                        <span className="bg-trade-orange/10 text-trade-orange px-2 py-0.5 rounded font-accent text-xs font-medium uppercase">
                          {categoryName}
                        </span>
                        <time dateTime={post.date}>
                          {new Date(post.date).toLocaleDateString(
                            isEs ? "es-US" : "en-US",
                            { year: "numeric", month: "long", day: "numeric" }
                          )}
                        </time>
                        <span>{post.readTime} {isEs ? "de lectura" : "read"}</span>
                      </div>

                      <Link href={`/${locale}/blog/${post.slug}`}>
                        <h2 className="font-display text-2xl font-bold text-espresso hover:text-trade-orange transition-colors mb-2">
                          {title}
                        </h2>
                      </Link>

                      <p className="text-warm-gray leading-relaxed mb-4 line-clamp-2">
                        {description}
                      </p>
                    </div>

                    <Link
                      href={`/${locale}/blog/${post.slug}`}
                      className="text-trade-orange font-accent font-medium text-sm hover:underline self-start"
                    >
                      {isEs ? "Leer mas" : "Read more"} &rarr;
                    </Link>
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </div>
    </main>
  )
}
