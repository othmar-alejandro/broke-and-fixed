import { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import Breadcrumbs from "@/components/seo/Breadcrumbs"
import MidArticleCTA from "@/components/MidArticleCTA"
import AuthorBio from "@/components/AuthorBio"
import { getAuthor } from "@/lib/data/authors"
import {
  getAllPosts,
  getPostBySlug,
  getPostContent,
  getPostTitle,
  getPostDescription,
  extractFaqs,
  getPostImage,
} from "@/lib/blog"

interface PageParams {
  locale: string
  slug: string
}

export function generateStaticParams() {
  const posts = getAllPosts()
  const params: { locale: string; slug: string }[] = []
  for (const post of posts) {
    params.push({ locale: "en", slug: post.slug })
    params.push({ locale: "es", slug: post.slug })
  }
  return params
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>
}): Promise<Metadata> {
  const { locale, slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return { title: "Not Found" }

  const title = getPostTitle(post, locale)
  const description = getPostDescription(post, locale)
  const canonical = `https://brokeandfixed.com/${locale}/blog/${slug}`

  return {
    title,
    description,
    keywords: post.keywords,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
      ...(post.image ? { images: [{ url: post.image }] } : {}),
    },
    alternates: {
      canonical,
      languages: {
        en: `/en/blog/${slug}`,
        es: `/es/blog/${slug}`,
        "x-default": `/en/blog/${slug}`,
      },
    },
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<PageParams>
}) {
  const { locale, slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const isEs = locale === "es"
  const title = getPostTitle(post, locale)
  const htmlContent = getPostContent(post, locale)

  const breadcrumbs = [
    { name: isEs ? "Inicio" : "Home", href: `/${locale}` },
    { name: "Blog", href: `/${locale}/blog` },
    { name: title, href: `/${locale}/blog/${slug}` },
  ]

  const author = getAuthor(post.author)
  const isPersonAuthor = author.id !== "brokeAndFixed"

  // BlogPosting JSON-LD schema with Person author when applicable (E-E-A-T uplift)
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: getPostDescription(post, locale),
    datePublished: post.date,
    dateModified: post.updated || post.date,
    author: isPersonAuthor
      ? {
          "@type": "Person",
          name: author.name,
          jobTitle: author.title,
          ...(author.links.linkedin || author.links.website
            ? { url: author.links.linkedin || author.links.website }
            : {}),
        }
      : {
          "@type": "Organization",
          name: "Broke & Fixed Home Solutions",
          url: "https://brokeandfixed.com",
        },
    publisher: {
      "@type": "Organization",
      name: "Broke & Fixed Home Solutions",
      url: "https://brokeandfixed.com",
    },
    keywords: post.keywords.join(", "),
    inLanguage: locale === "es" ? "es" : "en",
    url: `https://brokeandfixed.com/${locale}/blog/${slug}`,
    ...(post.image ? { image: post.image } : {}),
  }

  // FAQPage JSON-LD — still parsed by ChatGPT/Perplexity/Claude/AI Overviews
  // even though Google deprecated the rich result. Built from the post's
  // ## FAQ / ## Preguntas Frecuentes section when it has 2+ Q&A pairs.
  const faqItems = extractFaqs(locale === "es" ? post.contentEs : post.contentEn)
  const faqSchema =
    faqItems.length >= 2
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          inLanguage: locale === "es" ? "es" : "en",
          mainEntity: faqItems.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        }
      : null

  return (
    <main className="min-h-screen bg-cream">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <div className="max-w-3xl mx-auto px-4 py-8">
        <Breadcrumbs items={breadcrumbs} />

        <article className="py-8">
          <div className="flex items-center gap-3 text-sm text-warm-gray mb-4">
            <span className="bg-trade-orange/10 text-trade-orange px-2 py-0.5 rounded font-accent text-xs font-medium uppercase">
              {post.category.replace("-", " ")}
            </span>
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString(
                isEs ? "es-US" : "en-US",
                { year: "numeric", month: "long", day: "numeric" }
              )}
            </time>
            <span>{post.readTime} {isEs ? "de lectura" : "read"}</span>
          </div>

          <h1 className="font-display text-4xl md:text-5xl font-bold text-espresso mb-6">
            {title}
          </h1>

          {/* Language toggle */}
          <div className="flex gap-2 mb-8 text-sm">
            <Link
              href={`/en/blog/${slug}`}
              className={`px-3 py-1 rounded ${locale === "en" ? "bg-shield-navy text-white" : "bg-gray-100 text-warm-gray hover:bg-gray-200"}`}
            >
              English
            </Link>
            <Link
              href={`/es/blog/${slug}`}
              className={`px-3 py-1 rounded ${locale === "es" ? "bg-shield-navy text-white" : "bg-gray-100 text-warm-gray hover:bg-gray-200"}`}
            >
              Espanol
            </Link>
          </div>
 
          {/* Hero Image */}
          <div className="relative w-full aspect-[16/9] mb-8 overflow-hidden rounded-lg shadow-sm">
            <img
              src={getPostImage(post)}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Article content */}
          <div
            className="prose prose-lg max-w-none
              prose-headings:font-display prose-headings:text-espresso
              prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
              prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
              prose-p:text-deep-charcoal prose-p:leading-relaxed
              prose-li:text-deep-charcoal
              prose-a:text-trade-orange prose-a:no-underline hover:prose-a:underline
              prose-strong:text-espresso"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />

          <MidArticleCTA
            headline={
              isEs
                ? "Listo para comenzar su proyecto?"
                : "Ready to start your Miami remodel?"
            }
            subhead={
              isEs
                ? "Estimado gratis en casa. Respondemos en 15 minutos."
                : "Free in-home estimate. We respond within 15 minutes."
            }
            source={`blog_${slug}`}
            locale={isEs ? "es" : "en"}
          />

          <AuthorBio authorId={post.author} locale={isEs ? "es" : "en"} />

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-gray-100 text-warm-gray text-xs px-3 py-1 rounded-full font-accent"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </article>
      </div>
    </main>
  )
}
