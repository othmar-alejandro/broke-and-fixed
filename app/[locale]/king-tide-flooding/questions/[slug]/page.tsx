import { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { kingTideQuestions, findKingTideQuestion } from "@/lib/data/king-tide-questions"
import { kingTideAreas, KING_TIDE_UPDATED } from "@/lib/data/king-tide-areas"
import { metaDescription } from "@/lib/seo-metadata"
import Breadcrumbs from "@/components/seo/Breadcrumbs"
import JsonLd from "@/components/seo/JsonLd"
import LinkedText, { stripLinks } from "@/components/seo/LinkedText"
import PhoneLink from "@/components/PhoneLink"
import CallBox from "@/components/king-tide/CallBox"

interface PageParams {
  locale: string
  slug: string
}

export function generateStaticParams() {
  return kingTideQuestions.flatMap((q) => [
    { locale: "en", slug: q.slug },
    { locale: "es", slug: q.slug },
  ])
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>
}): Promise<Metadata> {
  const { locale, slug } = await params
  const q = findKingTideQuestion(slug)
  if (!q) return { title: "Not Found" }

  const isEs = locale === "es"
  const title = isEs ? q.titleEs : q.title
  const description = metaDescription(stripLinks(isEs ? q.answerEs : q.answer))
  const path = `/king-tide-flooding/questions/${q.slug}`

  return {
    title,
    description,
    alternates: {
      canonical: `https://brokeandfixed.com/${locale}${path}`,
      languages: { en: `/en${path}`, es: `/es${path}`, "x-default": `/en${path}` },
    },
    openGraph: {
      title,
      description,
      type: "article",
      images: [{ url: q.image, width: 1600, height: 900, alt: isEs ? q.imageAltEs : q.imageAlt }],
    },
  }
}

export default async function KingTideQuestionPage({
  params,
}: {
  params: Promise<PageParams>
}) {
  const { locale, slug } = await params
  const q = findKingTideQuestion(slug)
  if (!q) notFound()

  const isEs = locale === "es"
  const question = isEs ? q.questionEs : q.question
  const answer = isEs ? q.answerEs : q.answer
  const url = `https://brokeandfixed.com/${locale}/king-tide-flooding/questions/${q.slug}`
  const areas = kingTideAreas.filter((a) => q.areas.includes(a.slug))
  const related = kingTideQuestions.filter((o) => o.slug !== q.slug)

  const breadcrumbs = [
    { name: isEs ? "Inicio" : "Home", href: `/${locale}` },
    {
      name: isEs ? "Inundaciones por Marea Rey" : "King Tide Flooding",
      href: `/${locale}/king-tide-flooding`,
    },
    { name: isEs ? q.titleEs : q.title, href: `/${locale}/king-tide-flooding/questions/${q.slug}` },
  ]

  // The page's own question goes first so it is the main FAQ entity.
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [{ question, answer }, ...q.faqs.map((f) => ({
      question: isEs ? f.questionEs : f.question,
      answer: isEs ? f.answerEs : f.answer,
    }))].map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: stripLinks(f.answer) },
    })),
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: question,
    description: stripLinks(answer),
    image: `https://brokeandfixed.com${q.image}`,
    datePublished: KING_TIDE_UPDATED,
    dateModified: KING_TIDE_UPDATED,
    author: { "@type": "Organization", name: "Broke & Fixed Home Solutions", url: "https://brokeandfixed.com" },
    publisher: { "@type": "Organization", name: "Broke & Fixed Home Solutions", url: "https://brokeandfixed.com" },
    citation: q.sources.map((s) => s.url),
    inLanguage: isEs ? "es" : "en",
    url,
  }

  return (
    <main className="min-h-screen bg-cream">
      <JsonLd data={faqSchema} />
      <JsonLd data={articleSchema} />

      <section className="relative h-[460px] md:h-[540px] w-full overflow-hidden">
        <Image
          src={q.image}
          alt={isEs ? q.imageAltEs : q.imageAlt}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-espresso/95 via-espresso/60 to-espresso/10" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-5xl mx-auto px-4 pb-10 w-full">
            <div className="text-sage-muted text-sm uppercase font-bold tracking-wider mb-3">
              {isEs ? "Preguntas sobre la marea rey" : "King tide questions"}
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-white max-w-4xl">
              {question}
            </h1>
          </div>
        </div>
        <span className="absolute top-24 right-4 text-[11px] uppercase tracking-wider text-white/80 bg-espresso/60 px-2 py-1 rounded">
          {isEs ? "Ilustración" : "Illustration"}
        </span>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-10">
        <Breadcrumbs items={breadcrumbs} />

        <div className="bg-white border-l-4 border-sage-muted rounded-r-lg p-6 my-8 shadow-sm">
          <div className="text-sage-muted text-sm uppercase font-bold mb-2">
            {isEs ? "Respuesta corta" : "Short answer"}
          </div>
          <p className="text-lg text-espresso leading-relaxed [&_a]:text-sage-muted [&_a]:underline"><LinkedText text={answer} locale={locale} /></p>
        </div>

        <CallBox isEs={isEs} source="king_tide_question_answer" />

        <article className="prose prose-lg max-w-none prose-headings:font-display prose-headings:text-espresso prose-h2:text-3xl prose-h2:mt-10 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-p:text-espresso prose-p:leading-relaxed prose-li:text-espresso prose-a:text-sage-muted prose-a:no-underline hover:prose-a:underline prose-strong:text-espresso">
          <p className="text-sm text-warm-gray">
            {isEs ? "Actualizado el 29 de octubre de 2026" : "Updated October 29, 2026"}
          </p>

          {q.sections.map((s) => (
            <section key={s.heading}>
              <h2>{isEs ? s.headingEs : s.heading}</h2>
              {(isEs ? s.bodyEs : s.body).map((p, i) => (
                <p key={i}><LinkedText text={p} locale={locale} /></p>
              ))}
            </section>
          ))}

          <h2>{isEs ? "Preguntas relacionadas" : "Related questions"}</h2>
          {q.faqs.map((f, i) => (
            <div key={i} className="mb-6">
              <h3>{isEs ? f.questionEs : f.question}</h3>
              <p><LinkedText text={isEs ? f.answerEs : f.answer} locale={locale} /></p>
            </div>
          ))}

          <h2>{isEs ? "Zonas afectadas por la marea de octubre" : "Areas hit by the October tide"}</h2>
          <ul>
            {areas.map((a) => (
              <li key={a.slug}>
                <Link href={`/${locale}/king-tide-flooding/${a.slug}`}>
                  {isEs ? `Reparación de daños por marea rey en ${a.nameEs}` : `King tide flood damage repair in ${a.name}`}
                </Link>
              </li>
            ))}
          </ul>

          <h2>{isEs ? "Más preguntas" : "More questions"}</h2>
          <ul>
            {related.map((o) => (
              <li key={o.slug}>
                <Link href={`/${locale}/king-tide-flooding/questions/${o.slug}`}>
                  {isEs ? o.questionEs : o.question}
                </Link>
              </li>
            ))}
          </ul>

          <h2>{isEs ? "Fuentes" : "Sources"}</h2>
          <ul className="text-base">
            {q.sources.map((s) => (
              <li key={s.url}>
                <a href={s.url} target="_blank" rel="noopener noreferrer">{s.label}</a>
              </li>
            ))}
          </ul>
          <p className="text-sm text-warm-gray">
            {isEs
              ? "La imagen de esta página es una ilustración, no una foto de un trabajo nuestro."
              : "The image on this page is an illustration, not a photo of one of our jobs."}
          </p>
        </article>

        <div className="bg-sage-muted text-white rounded-lg p-8 mt-12 text-center">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-3">
            {isEs ? "¿Entró agua a su casa?" : "Did water get into your home?"}
          </h2>
          <p className="mb-5 text-lg">
            {isEs
              ? "Trabajamos en Miami-Dade y Broward. Recorremos la casa, le decimos qué hay que sacar y qué se puede salvar, y le damos el alcance por escrito."
              : "We work across Miami-Dade and Broward. We walk the house, tell you what has to come out and what can be saved, and give you the scope in writing."}
          </p>
          <PhoneLink
            phoneNumber="(786) 363-7039"
            source="king_tide_question_footer"
            className="inline-block bg-white text-sage-muted font-bold text-lg px-8 py-3 rounded hover:bg-cream transition-colors"
          />
        </div>
      </div>
    </main>
  )
}
