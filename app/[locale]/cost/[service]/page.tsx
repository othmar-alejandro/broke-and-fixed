import { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { services } from "@/lib/data/services"
import {
  getCostPageData,
  getAllCostPageSlugs,
  type CostPageData,
  type CostTier,
  type PricingRow,
  type CostFAQ,
} from "@/lib/data/cost-page-data"
import JsonLd from "@/components/seo/JsonLd"
import Breadcrumbs from "@/components/seo/Breadcrumbs"
import {
  CurrencyDollar,
  CheckCircle,
  Lightbulb,
  Phone,
  Star,
  CaretDown,
  MapPin,
  ShieldCheck,
  ArrowRight,
} from "@phosphor-icons/react/dist/ssr"

const siteUrl = "https://brokeandfixed.com"

interface PageParams {
  locale: string
  service: string
}

/* -------------------------------------------------------------------------- */
/*  Static params: generate both EN and ES for every cost page slug           */
/* -------------------------------------------------------------------------- */

export function generateStaticParams() {
  const slugs = getAllCostPageSlugs()
  const params: { locale: string; service: string }[] = []

  for (const slug of slugs) {
    const data = getCostPageData(slug)
    if (!data) continue
    params.push({ locale: "en", service: data.slug })
    params.push({ locale: "es", service: data.slugEs })
  }

  return params
}

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                   */
/* -------------------------------------------------------------------------- */

function findCostData(serviceSlug: string, locale: string): CostPageData | null {
  const slugs = getAllCostPageSlugs()
  for (const slug of slugs) {
    const data = getCostPageData(slug)
    if (!data) continue
    if (locale === "es" && data.slugEs === serviceSlug) return data
    if (locale !== "es" && data.slug === serviceSlug) return data
  }
  return null
}

function findService(slug: string, locale: string) {
  return services.find((s) =>
    locale === "es" ? s.slugEs === slug : s.slug === slug
  )
}

function serviceSlugForLocale(
  data: CostPageData,
  locale: string
): string {
  return locale === "es" ? data.slugEs : data.slug
}

/* -------------------------------------------------------------------------- */
/*  Metadata                                                                  */
/* -------------------------------------------------------------------------- */

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>
}): Promise<Metadata> {
  const { locale, service } = await params
  const isEs = locale === "es"
  const data = findCostData(service, locale)
  if (!data) return { title: "Not Found" }

  const title = isEs ? data.metaTitleEs : data.metaTitle
  const description = isEs ? data.metaDescriptionEs : data.metaDescription
  const slug = serviceSlugForLocale(data, locale)

  return {
    title,
    description,
    keywords: data.keywords,
    openGraph: {
      title,
      description,
      type: "article",
      url: `${siteUrl}/${locale}/cost/${slug}`,
      siteName: "Broke & Fixed Home Solutions",
      locale: isEs ? "es_US" : "en_US",
      alternateLocale: isEs ? "en_US" : "es_US",
    },
    alternates: {
      canonical: `${siteUrl}/${locale}/cost/${slug}`,
      languages: {
        en: `${siteUrl}/en/cost/${data.slug}`,
        es: `${siteUrl}/es/cost/${data.slugEs}`,
        "x-default": `${siteUrl}/en/cost/${data.slug}`,
      },
    },
  }
}

/* -------------------------------------------------------------------------- */
/*  Page component                                                            */
/* -------------------------------------------------------------------------- */

export default async function CostGuidePage({
  params,
}: {
  params: Promise<PageParams>
}) {
  const { locale, service } = await params
  const isEs = locale === "es"
  const data = findCostData(service, locale)
  if (!data) notFound()

  const slug = serviceSlugForLocale(data, locale)
  const pageTitle = isEs ? data.titleEs : data.title
  const headline = isEs ? data.heroHeadlineEs : data.heroHeadline
  const intro = isEs ? data.introTextEs : data.introText
  const costFactors = isEs ? data.costFactorsEs : data.costFactors
  const savingTips = isEs ? data.savingTipsEs : data.savingTips
  const whyMiami = isEs ? data.whyMiamiDifferentEs : data.whyMiamiDifferent

  /* ---- Breadcrumbs ---- */
  const breadcrumbs = [
    { name: isEs ? "Inicio" : "Home", href: `/${locale}` },
    { name: isEs ? "Guias de Costos" : "Cost Guides", href: `/${locale}/cost` },
    { name: pageTitle, href: `/${locale}/cost/${slug}` },
  ]

  /* ---- Article JSON-LD ---- */
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: isEs ? data.metaTitleEs : data.metaTitle,
    description: isEs ? data.metaDescriptionEs : data.metaDescription,
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
      "@id": `${siteUrl}/${locale}/cost/${slug}`,
    },
    inLanguage: isEs ? "es" : "en",
    keywords: data.keywords.join(", "),
    about: {
      "@type": "Service",
      name: isEs ? data.titleEs : data.title,
      provider: {
        "@type": "LocalBusiness",
        name: "Broke & Fixed Home Solutions",
      },
    },
  }

  /* ---- FAQ JSON-LD ---- */
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: data.faqs.map((faq: CostFAQ) => ({
      "@type": "Question",
      name: isEs ? faq.questionEs : faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: isEs ? faq.answerEs : faq.answer,
      },
    })),
  }

  return (
    <main className="min-h-screen">
      {/* JSON-LD schemas */}
      <JsonLd data={articleSchema} />
      <JsonLd data={faqSchema} />

      {/* ================================================================== */}
      {/*  HERO                                                              */}
      {/* ================================================================== */}
      <section className="bg-[#1E3A5F] text-white">
        <div className="mx-auto max-w-5xl px-4 pb-14 pt-8">
          <Breadcrumbs items={breadcrumbs} />

          {/* Language toggle */}
          <div className="mb-6 flex gap-2 text-sm">
            <Link
              href={`/en/cost/${data.slug}`}
              className={`rounded px-3 py-1 transition-colors ${
                locale === "en"
                  ? "bg-white text-[#1E3A5F] font-semibold"
                  : "bg-white/10 text-white/70 hover:bg-white/20"
              }`}
            >
              English
            </Link>
            <Link
              href={`/es/cost/${data.slugEs}`}
              className={`rounded px-3 py-1 transition-colors ${
                locale === "es"
                  ? "bg-white text-[#1E3A5F] font-semibold"
                  : "bg-white/10 text-white/70 hover:bg-white/20"
              }`}
            >
              Espanol
            </Link>
          </div>

          <h1 className="font-display text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
            {headline}
          </h1>

          {/* Average cost badge */}
          <div className="mt-6 inline-flex items-center gap-3 rounded-lg bg-white/10 px-5 py-3 backdrop-blur-sm">
            <CurrencyDollar size={28} weight="bold" className="text-[#F07A1A]" />
            <div>
              <p className="text-xs uppercase tracking-wider text-white/60">
                {isEs ? "Costo Promedio en Miami" : "Average Cost in Miami"}
              </p>
              <p className="text-2xl font-bold text-[#F07A1A]">
                {data.averageCost}
              </p>
              <p className="text-sm text-white/70">
                {isEs ? "Rango tipico" : "Typical range"}: {data.costRange}
              </p>
            </div>
          </div>

          <div className="mt-8">
            <a
              href="tel:7863637039"
              className="inline-flex items-center gap-2 rounded-lg bg-[#F07A1A] px-6 py-3 font-[family-name:var(--font-accent)] font-semibold text-white transition-colors hover:bg-orange-600"
            >
              <Phone size={20} weight="bold" />
              {isEs ? "Llame para un Estimado Gratis" : "Call for a Free Estimate"}
            </a>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/*  INTRO                                                             */}
      {/* ================================================================== */}
      <section className="bg-[#F8F9FC]">
        <div className="mx-auto max-w-3xl px-4 py-14">
          <div className="space-y-5 text-lg leading-relaxed text-warm-gray">
            {intro.split("\n\n").map((paragraph: string, i: number) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/*  COST TIERS                                                        */}
      {/* ================================================================== */}
      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-4 py-16">
          <h2 className="mb-2 text-center font-display text-3xl font-bold text-espresso md:text-4xl">
            {isEs ? "Niveles de Presupuesto" : "Cost Tiers"}
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-center text-warm-gray">
            {isEs
              ? "Cada proyecto es diferente. Aqui tienes una idea general de lo que puedes esperar en cada nivel."
              : "Every project is different. Here is a general idea of what to expect at each level."}
          </p>

          <div className="grid gap-6 md:grid-cols-3">
            {data.tiers.map((tier: CostTier, i: number) => {
              const tierLabel = isEs ? tier.nameEs : tier.name
              const tierDesc = isEs ? tier.descriptionEs : tier.description
              const isMiddle = i === 1

              return (
                <div
                  key={i}
                  className={`relative rounded-xl border-2 p-6 transition-shadow hover:shadow-lg ${
                    isMiddle
                      ? "border-[#F07A1A] bg-[#F07A1A]/5"
                      : "border-gray-200 bg-white"
                  }`}
                >
                  {isMiddle && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#F07A1A] px-3 py-0.5 text-xs font-semibold uppercase tracking-wider text-white">
                      {isEs ? "Mas Popular" : "Most Popular"}
                    </span>
                  )}
                  <div className="mb-3 flex items-center gap-2">
                    <Star
                      size={20}
                      weight={isMiddle ? "fill" : "regular"}
                      className={isMiddle ? "text-[#F07A1A]" : "text-warm-gray"}
                    />
                    <h3 className="font-display text-xl font-bold text-espresso">
                      {tierLabel}
                    </h3>
                  </div>
                  <p className="mb-4 text-2xl font-bold text-[#1E3A5F]">
                    {tier.priceRange}
                  </p>
                  <p className="text-sm leading-relaxed text-warm-gray">
                    {tierDesc}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/*  PRICING TABLE                                                     */}
      {/* ================================================================== */}
      <section className="bg-[#0F1F35]">
        <div className="mx-auto max-w-5xl px-4 py-16">
          <h2 className="mb-8 text-center font-display text-3xl font-bold text-white md:text-4xl">
            {isEs ? "Desglose de Precios" : "Price Breakdown"}
          </h2>

          {/* Desktop table */}
          <div className="hidden overflow-hidden rounded-xl md:block">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-white/10 text-sm uppercase tracking-wider text-white/70">
                  <th className="px-6 py-4 font-semibold">
                    {isEs ? "Articulo" : "Item"}
                  </th>
                  <th className="px-6 py-4 text-center font-semibold">
                    {isEs ? "Bajo" : "Low"}
                  </th>
                  <th className="px-6 py-4 text-center font-semibold">
                    {isEs ? "Promedio" : "Average"}
                  </th>
                  <th className="px-6 py-4 text-center font-semibold">
                    {isEs ? "Alto" : "High"}
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.pricingTable.map((row: PricingRow, i: number) => (
                  <tr
                    key={i}
                    className={`border-b border-white/5 ${
                      i % 2 === 0 ? "bg-white/5" : "bg-transparent"
                    }`}
                  >
                    <td className="px-6 py-4 text-white">
                      {isEs ? row.itemEs : row.item}
                      {row.unit && (
                        <span className="ml-1 text-xs text-white/50">
                          ({row.unit})
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center text-white/80">
                      {row.low}
                    </td>
                    <td className="px-6 py-4 text-center font-semibold text-[#F07A1A]">
                      {row.average}
                    </td>
                    <td className="px-6 py-4 text-center text-white/80">
                      {row.high}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="space-y-3 md:hidden">
            {data.pricingTable.map((row: PricingRow, i: number) => (
              <div
                key={i}
                className="rounded-lg bg-white/5 p-4"
              >
                <p className="mb-2 font-semibold text-white">
                  {isEs ? row.itemEs : row.item}
                  {row.unit && (
                    <span className="ml-1 text-xs text-white/50">
                      ({row.unit})
                    </span>
                  )}
                </p>
                <div className="grid grid-cols-3 gap-2 text-center text-sm">
                  <div>
                    <p className="text-white/50">{isEs ? "Bajo" : "Low"}</p>
                    <p className="text-white/80">{row.low}</p>
                  </div>
                  <div>
                    <p className="text-white/50">{isEs ? "Prom." : "Avg."}</p>
                    <p className="font-semibold text-[#F07A1A]">{row.average}</p>
                  </div>
                  <div>
                    <p className="text-white/50">{isEs ? "Alto" : "High"}</p>
                    <p className="text-white/80">{row.high}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/*  COST FACTORS                                                      */}
      {/* ================================================================== */}
      <section className="bg-[#F8F9FC]">
        <div className="mx-auto max-w-4xl px-4 py-16">
          <h2 className="mb-8 font-display text-3xl font-bold text-espresso md:text-4xl">
            {isEs ? "Factores que Afectan el Costo" : "What Drives the Cost"}
          </h2>
          <ul className="grid gap-3 md:grid-cols-2">
            {costFactors.map((factor: string, i: number) => (
              <li
                key={i}
                className="flex items-start gap-3 rounded-lg bg-white p-4 shadow-sm"
              >
                <CheckCircle
                  size={22}
                  weight="fill"
                  className="mt-0.5 shrink-0 text-[#4CAF50]"
                />
                <span className="text-espresso">{factor}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ================================================================== */}
      {/*  SAVING TIPS                                                       */}
      {/* ================================================================== */}
      <section className="bg-white">
        <div className="mx-auto max-w-4xl px-4 py-16">
          <h2 className="mb-8 font-display text-3xl font-bold text-espresso md:text-4xl">
            <Lightbulb
              size={32}
              weight="fill"
              className="mr-2 inline-block text-[#F07A1A]"
            />
            {isEs ? "Como Ahorrar en tu Proyecto" : "Ways to Save on Your Project"}
          </h2>
          <ol className="space-y-4">
            {savingTips.map((tip: string, i: number) => (
              <li key={i} className="flex items-start gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F07A1A] text-sm font-bold text-white">
                  {i + 1}
                </span>
                <p className="pt-1 text-warm-gray">{tip}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ================================================================== */}
      {/*  WHY MIAMI IS DIFFERENT                                            */}
      {/* ================================================================== */}
      <section className="bg-[#1E3A5F]">
        <div className="mx-auto max-w-4xl px-4 py-16">
          <div className="flex items-start gap-4">
            <MapPin
              size={36}
              weight="fill"
              className="mt-1 shrink-0 text-[#F07A1A]"
            />
            <div>
              <h2 className="mb-4 font-display text-3xl font-bold text-white md:text-4xl">
                {isEs
                  ? "Por que los Costos en Miami Son Diferentes"
                  : "Why Miami Costs Are Different"}
              </h2>
              <div className="space-y-4 text-lg leading-relaxed text-white/80">
                {whyMiami.split("\n\n").map((paragraph: string, i: number) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/*  FAQ ACCORDION                                                     */}
      {/* ================================================================== */}
      <section className="bg-[#F8F9FC]">
        <div className="mx-auto max-w-3xl px-4 py-16">
          <h2 className="mb-8 text-center font-display text-3xl font-bold text-espresso md:text-4xl">
            {isEs ? "Preguntas Frecuentes" : "Frequently Asked Questions"}
          </h2>
          <div className="space-y-3">
            {data.faqs.map((faq: CostFAQ, i: number) => (
              <details
                key={i}
                className="group rounded-lg border border-gray-200 bg-white"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 px-5 py-4 font-semibold text-espresso [&::-webkit-details-marker]:hidden">
                  <span>{isEs ? faq.questionEs : faq.question}</span>
                  <CaretDown
                    size={20}
                    className="shrink-0 text-warm-gray transition-transform group-open:rotate-180"
                  />
                </summary>
                <div className="border-t border-gray-100 px-5 pb-5 pt-3 text-warm-gray leading-relaxed">
                  {isEs ? faq.answerEs : faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/*  RELATED SERVICES                                                  */}
      {/* ================================================================== */}
      {data.relatedServices.length > 0 && (
        <section className="bg-white">
          <div className="mx-auto max-w-5xl px-4 py-16">
            <h2 className="mb-8 text-center font-display text-3xl font-bold text-espresso md:text-4xl">
              {isEs
                ? "Guias de Costos Relacionadas"
                : "Related Cost Guides"}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {data.relatedServices.map((relatedSlug: string) => {
                const relatedData = getCostPageData(relatedSlug)
                const relatedService = findService(relatedSlug, "en")
                if (!relatedData) return null

                const relatedHref = `/${locale}/cost/${
                  isEs ? relatedData.slugEs : relatedData.slug
                }`
                const relatedTitle = isEs
                  ? relatedData.titleEs
                  : relatedData.title
                const relatedServiceName = relatedService
                  ? isEs
                    ? relatedService.nameEs
                    : relatedService.name
                  : relatedTitle

                return (
                  <Link
                    key={relatedSlug}
                    href={relatedHref}
                    className="group flex items-center justify-between rounded-lg border border-gray-200 p-5 transition-all hover:border-[#F07A1A] hover:shadow-md"
                  >
                    <div>
                      <p className="font-display text-lg font-bold text-espresso group-hover:text-[#F07A1A]">
                        {relatedServiceName}
                      </p>
                      <p className="text-sm text-warm-gray">
                        {relatedData.costRange}
                      </p>
                    </div>
                    <ArrowRight
                      size={20}
                      className="shrink-0 text-warm-gray transition-transform group-hover:translate-x-1 group-hover:text-[#F07A1A]"
                    />
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* ================================================================== */}
      {/*  BOTTOM CTA                                                        */}
      {/* ================================================================== */}
      <section className="bg-[#0F1F35]">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center">
          <ShieldCheck
            size={48}
            weight="fill"
            className="mx-auto mb-4 text-[#4CAF50]"
          />
          <h2 className="mb-3 font-display text-3xl font-bold text-white md:text-4xl">
            {isEs
              ? "Obtenga un Estimado Exacto para su Proyecto"
              : "Get an Exact Estimate for Your Project"}
          </h2>
          <p className="mx-auto mb-6 max-w-xl text-lg text-white/70">
            {isEs
              ? "Cada hogar es diferente. Llamenos para una consulta gratis y le daremos un precio honesto, sin sorpresas."
              : "Every home is different. Call us for a free consultation and we will give you an honest price, no surprises."}
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href="tel:7863637039"
              className="inline-flex items-center gap-2 rounded-lg bg-[#F07A1A] px-8 py-4 font-[family-name:var(--font-accent)] text-lg font-semibold text-white transition-colors hover:bg-orange-600"
            >
              <Phone size={24} weight="bold" />
              (786) 363-7039
            </a>
            <Link
              href={`/${locale}#contact`}
              className="inline-flex items-center gap-2 rounded-lg border-2 border-white/20 px-8 py-4 font-[family-name:var(--font-accent)] text-lg font-semibold text-white transition-colors hover:border-white/40 hover:bg-white/5"
            >
              {isEs ? "Formulario de Contacto" : "Contact Form"}
              <ArrowRight size={20} />
            </Link>
          </div>
          <p className="mt-6 flex items-center justify-center gap-2 text-sm text-white/50">
            <ShieldCheck size={16} weight="fill" className="text-[#4CAF50]" />
            {isEs
              ? "Empresa familiar. Completamente asegurada. Un punto de contacto responsable."
              : "Family owned. Fully insured. One accountable point of contact."}
          </p>
        </div>
      </section>
    </main>
  )
}
