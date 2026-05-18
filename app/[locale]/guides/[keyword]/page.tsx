import { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import {
  BookOpenText,
  Phone,
  CaretDown,
  ArrowRight,
  Star,
  ShieldCheck,
} from "@phosphor-icons/react/dist/ssr"
import { getGuidePage, getAllGuideKeywords } from "@/lib/data/long-tail-data"
import { services } from "@/lib/data/services"
import JsonLd from "@/components/seo/JsonLd"
import Breadcrumbs from "@/components/seo/Breadcrumbs"

const siteUrl = "https://brokeandfixed.com"

interface PageParams {
  locale: string
  keyword: string
}

/* ---------- Static generation ---------- */

export function generateStaticParams() {
  const keywords = getAllGuideKeywords()
  const params: { locale: string; keyword: string }[] = []
  for (const keyword of keywords) {
    params.push({ locale: "en", keyword })
    params.push({ locale: "es", keyword })
  }
  return params
}

/* ---------- Metadata ---------- */

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>
}): Promise<Metadata> {
  const { locale, keyword } = await params
  const guide = getGuidePage(keyword)
  if (!guide) return { title: "Not Found" }

  const isEs = locale === "es"
  const title = isEs ? guide.metaTitleEs : guide.metaTitle
  const description = isEs ? guide.metaDescriptionEs : guide.metaDescription

  const enUrl = `${siteUrl}/en/guides/${keyword}`
  const esUrl = `${siteUrl}/es/guides/${keyword}`

  return {
    title,
    description,
    keywords: guide.keywords,
    openGraph: {
      title,
      description,
      type: "article",
      url: locale === "es" ? esUrl : enUrl,
      siteName: "Broke & Fixed Home Solutions",
      locale: isEs ? "es_US" : "en_US",
      alternateLocale: isEs ? "en_US" : "es_US",
    },
    alternates: {
      canonical: locale === "es" ? esUrl : enUrl,
      languages: {
        en: enUrl,
        es: esUrl,
        "x-default": enUrl,
      },
    },
  }
}

/* ---------- Page component ---------- */

export default async function GuidePage({
  params,
}: {
  params: Promise<PageParams>
}) {
  const { locale, keyword } = await params
  const guide = getGuidePage(keyword)
  if (!guide) notFound()

  const isEs = locale === "es"
  const title = isEs ? guide.titleEs : guide.title
  const headline = isEs ? guide.heroHeadlineEs : guide.heroHeadline
  const subheadline = isEs ? guide.heroSubheadlineEs : guide.heroSubheadline

  const sections = guide.sections.map((s) => ({
    heading: isEs ? s.headingEs : s.heading,
    content: isEs ? s.contentEs : s.content,
  }))

  const faqItems = guide.faqs.map((f) => ({
    question: isEs ? f.questionEs : f.question,
    answer: isEs ? f.answerEs : f.answer,
  }))

  // Resolve related services to their data
  const relatedServiceData = guide.relatedServices
    .map((slug) => services.find((s) => s.slug === slug))
    .filter(Boolean)

  // Resolve related guide pages
  const relatedGuideData = guide.relatedGuides
    .map((kw) => {
      const g = getGuidePage(kw)
      if (!g) return null
      return {
        keyword: g.keyword,
        title: isEs ? g.titleEs : g.title,
        description: isEs ? g.metaDescriptionEs : g.metaDescription,
      }
    })
    .filter(Boolean)

  /* ---------- Breadcrumbs ---------- */

  const breadcrumbItems = [
    { name: isEs ? "Inicio" : "Home", href: `/${locale}` },
    { name: isEs ? "Guias" : "Guides", href: `/${locale}/guides` },
    { name: title, href: `/${locale}/guides/${keyword}` },
  ]

  /* ---------- JSON-LD schemas ---------- */

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: isEs ? guide.metaTitleEs : guide.metaTitle,
    description: isEs ? guide.metaDescriptionEs : guide.metaDescription,
    author: {
      "@type": "Organization",
      name: "Broke & Fixed Home Solutions",
      url: siteUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "Broke & Fixed Home Solutions",
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/og-image.jpg`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteUrl}/${locale}/guides/${keyword}`,
    },
    inLanguage: isEs ? "es" : "en",
    keywords: guide.keywords.join(", "),
    url: `${siteUrl}/${locale}/guides/${keyword}`,
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: guide.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.href}`,
    })),
  }

  /* ---------- Utility: generate section anchor IDs ---------- */

  function toAnchor(heading: string): string {
    return heading
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "")
  }

  /* ---------- Render ---------- */

  return (
    <main className="min-h-screen">
      {/* Schema markup */}
      <JsonLd data={articleSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbSchema} />

      {/* ===== HERO ===== */}
      <section className="bg-espresso text-white">
        <div className="max-w-5xl mx-auto px-4 pt-6 pb-16 md:pb-20">
          <Breadcrumbs items={breadcrumbItems} />

          <div className="pt-8 md:pt-12 max-w-3xl">
            <div className="flex items-center gap-2 text-sage-muted font-accent text-sm font-medium uppercase tracking-wider mb-4">
              <BookOpenText size={18} weight="bold" />
              <span>{isEs ? "Guia" : "Guide"}</span>
            </div>

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              {headline}
            </h1>

            <p className="text-lg md:text-xl text-white/75 leading-relaxed mb-8 max-w-2xl">
              {subheadline}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="tel:7863637039"
                className="inline-flex items-center justify-center gap-2 bg-sage-muted text-white font-display font-bold text-lg px-8 py-4 rounded-lg hover:brightness-110 transition-all"
              >
                <Phone size={20} weight="bold" />
                {isEs ? "Llama ahora: (786) 363-7039" : "Call now: (786) 363-7039"}
              </a>
              <a
                href="#content"
                className="inline-flex items-center justify-center gap-2 border-2 border-white/30 text-white font-display font-bold text-lg px-8 py-4 rounded-lg hover:bg-white/10 transition-all"
              >
                <CaretDown size={20} weight="bold" />
                {isEs ? "Leer la guia" : "Read the guide"}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TABLE OF CONTENTS ===== */}
      <section className="bg-cream border-b border-warm-gray-lighter/40">
        <div className="max-w-5xl mx-auto px-4 py-8">
          <h2 className="font-display text-xl font-bold text-espresso mb-4">
            {isEs ? "En esta guia" : "In this guide"}
          </h2>
          <nav aria-label={isEs ? "Tabla de contenido" : "Table of contents"}>
            <ol className="grid sm:grid-cols-2 gap-2">
              {sections.map((section, index) => (
                <li key={index}>
                  <a
                    href={`#${toAnchor(section.heading)}`}
                    className="flex items-center gap-3 text-warm-gray hover:text-sage transition-colors group py-1"
                  >
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-sage/10 text-sage text-xs font-accent font-semibold flex items-center justify-center group-hover:bg-sage group-hover:text-white transition-colors">
                      {index + 1}
                    </span>
                    <span className="text-sm font-medium">{section.heading}</span>
                  </a>
                </li>
              ))}
              {faqItems.length > 0 && (
                <li>
                  <a
                    href="#faq"
                    className="flex items-center gap-3 text-warm-gray hover:text-sage transition-colors group py-1"
                  >
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-sage/10 text-sage text-xs font-accent font-semibold flex items-center justify-center group-hover:bg-sage group-hover:text-white transition-colors">
                      ?
                    </span>
                    <span className="text-sm font-medium">
                      {isEs ? "Preguntas frecuentes" : "Frequently asked questions"}
                    </span>
                  </a>
                </li>
              )}
            </ol>
          </nav>
        </div>
      </section>

      {/* ===== CONTENT SECTIONS ===== */}
      <div id="content">
        {sections.map((section, index) => {
          const isDark = index % 2 === 1
          return (
            <section
              key={index}
              id={toAnchor(section.heading)}
              className={isDark ? "bg-espresso text-white" : "bg-cream"}
            >
              <div className="max-w-3xl mx-auto px-4 py-12 md:py-16">
                <div className="flex items-center gap-3 mb-6">
                  <span
                    className={`flex-shrink-0 w-9 h-9 rounded-full text-sm font-accent font-bold flex items-center justify-center ${
                      isDark
                        ? "bg-sage-muted text-white"
                        : "bg-sage text-white"
                    }`}
                  >
                    {index + 1}
                  </span>
                  <h2 className={`font-display text-2xl md:text-3xl font-bold ${isDark ? "text-white" : "text-espresso"}`}>
                    {section.heading}
                  </h2>
                </div>
                <div
                  className={`prose prose-lg max-w-none
                    prose-headings:font-display
                    prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                    prose-p:leading-relaxed
                    prose-li:leading-relaxed
                    prose-strong:font-semibold
                    ${
                      isDark
                        ? "prose-headings:text-white prose-p:text-white/80 prose-li:text-white/80 prose-strong:text-white prose-a:text-sage-muted"
                        : "prose-headings:text-espresso prose-p:text-warm-gray prose-li:text-warm-gray prose-strong:text-espresso prose-a:text-sage-muted"
                    }
                    prose-a:no-underline hover:prose-a:underline`}
                  dangerouslySetInnerHTML={{ __html: section.content }}
                />
              </div>
            </section>
          )
        })}
      </div>

      {/* ===== FAQ SECTION ===== */}
      {faqItems.length > 0 && (
        <section id="faq" className="bg-cream">
          <div className="max-w-3xl mx-auto px-4 py-12 md:py-16">
            <div className="flex items-center gap-3 mb-8">
              <Star size={28} weight="bold" className="text-sage-muted" />
              <h2 className="font-display text-3xl md:text-4xl font-bold text-espresso">
                {isEs ? "Preguntas frecuentes" : "Frequently asked questions"}
              </h2>
            </div>

            <div className="space-y-3">
              {faqItems.map((faq, index) => (
                <details
                  key={index}
                  className="bg-white rounded-lg shadow-sm group"
                >
                  <summary className="cursor-pointer px-6 py-4 font-display font-medium text-espresso hover:text-sage transition-colors list-none flex items-center justify-between">
                    <span>{faq.question}</span>
                    <CaretDown
                      size={20}
                      weight="bold"
                      className="text-sage ml-4 flex-shrink-0 group-open:rotate-180 transition-transform"
                    />
                  </summary>
                  <div className="px-6 pb-5">
                    <p className="text-warm-gray leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== RELATED GUIDES ===== */}
      {relatedGuideData.length > 0 && (
        <section className="bg-espresso">
          <div className="max-w-5xl mx-auto px-4 py-12 md:py-16">
            <h2 className="font-display text-3xl font-bold text-white mb-8">
              {isEs ? "Guias relacionadas" : "Related guides"}
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedGuideData.slice(0, 4).map((related) => (
                <Link
                  key={related!.keyword}
                  href={`/${locale}/guides/${related!.keyword}`}
                  className="bg-espresso-light rounded-lg p-6 hover:bg-sage/30 transition-colors group"
                >
                  <div className="flex items-center gap-2 text-sage-muted font-accent text-xs font-medium uppercase tracking-wider mb-3">
                    <BookOpenText size={14} weight="bold" />
                    <span>{isEs ? "Guia" : "Guide"}</span>
                  </div>
                  <h3 className="font-display text-lg font-bold text-white mb-2 group-hover:text-sage-muted transition-colors">
                    {related!.title}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed line-clamp-3 mb-4">
                    {related!.description}
                  </p>
                  <span className="inline-flex items-center gap-1 text-sage-muted text-sm font-accent font-medium group-hover:gap-2 transition-all">
                    {isEs ? "Leer guia" : "Read guide"}
                    <ArrowRight size={14} weight="bold" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== RELATED SERVICES ===== */}
      {relatedServiceData.length > 0 && (
        <section className="bg-cream">
          <div className="max-w-5xl mx-auto px-4 py-12 md:py-16">
            <div className="flex items-center gap-3 mb-8">
              <ShieldCheck size={28} weight="bold" className="text-sage" />
              <h2 className="font-display text-3xl font-bold text-espresso">
                {isEs ? "Servicios relacionados" : "Related services"}
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedServiceData.map((service) => {
                const name = isEs ? service!.nameEs : service!.name
                const desc = isEs ? service!.descriptionEs : service!.description
                const slug = isEs ? service!.slugEs : service!.slug
                return (
                  <Link
                    key={service!.slug}
                    href={`/${locale}/services/${slug}`}
                    className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow group"
                  >
                    <h3 className="font-display text-xl font-bold text-espresso mb-2 group-hover:text-sage transition-colors">
                      {name}
                    </h3>
                    <p className="text-warm-gray text-sm leading-relaxed line-clamp-3 mb-4">
                      {desc}
                    </p>
                    <span className="inline-flex items-center gap-1 text-sage-muted text-sm font-accent font-medium group-hover:gap-2 transition-all">
                      {isEs ? "Ver servicio" : "View service"}
                      <ArrowRight size={14} weight="bold" />
                    </span>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* ===== BOTTOM CTA ===== */}
      <section className="bg-sage">
        <div className="max-w-3xl mx-auto px-4 py-14 md:py-20 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
            {isEs
              ? "Listo para empezar tu proyecto?"
              : "Ready to start your project?"}
          </h2>
          <p className="text-white/75 text-lg mb-8 max-w-xl mx-auto">
            {isEs
              ? "Somos una empresa familiar de remodelacion con seguro completo. Llama para un estimado gratis. Sin compromiso."
              : "We are a family-owned, fully insured remodeling company. Call for a free estimate. No pressure, no obligation."}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="tel:7863637039"
              className="inline-flex items-center justify-center gap-2 bg-sage-muted text-white font-display font-bold text-xl px-10 py-4 rounded-lg hover:brightness-110 transition-all"
            >
              <Phone size={24} weight="bold" />
              (786) 363-7039
            </a>
            <Link
              href={`/${locale}#contact`}
              className="inline-flex items-center justify-center gap-2 border-2 border-white/40 text-white font-display font-bold text-lg px-8 py-4 rounded-lg hover:bg-white/10 transition-all"
            >
              {isEs ? "Pedir estimado gratis" : "Get a free estimate"}
              <ArrowRight size={18} weight="bold" />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== LANGUAGE TOGGLE (subtle, bottom) ===== */}
      <div className="bg-cream border-t border-warm-gray-lighter/40">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <p className="text-warm-gray text-xs">
            {isEs
              ? "Esta guia tambien esta disponible en ingles."
              : "This guide is also available in Spanish."}
          </p>
          <Link
            href={`/${isEs ? "en" : "es"}/guides/${keyword}`}
            className="text-sage font-accent font-medium text-sm hover:underline"
          >
            {isEs ? "Read in English" : "Leer en Espanol"}
          </Link>
        </div>
      </div>
    </main>
  )
}
