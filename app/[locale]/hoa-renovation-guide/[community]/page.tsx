import { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { hoaCommunities, findHoaCommunity } from "@/lib/data/hoa-communities"
import { serviceImages } from "@/lib/data/images"
import Breadcrumbs from "@/components/seo/Breadcrumbs"
import JsonLd from "@/components/seo/JsonLd"

interface PageParams {
  locale: string
  community: string
}

export function generateStaticParams() {
  const params: { locale: string; community: string }[] = []
  for (const c of hoaCommunities) {
    params.push({ locale: "en", community: c.slug })
    params.push({ locale: "es", community: c.slugEs })
  }
  return params
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>
}): Promise<Metadata> {
  const { locale, community: slug } = await params
  const c = findHoaCommunity(slug)
  if (!c) return { title: "Not Found" }

  const isEs = locale === "es"
  const name = isEs ? c.nameEs : c.name

  const title = isEs
    ? `Aprobacion del HOA para Renovaciones en ${name} | Guia 2026`
    : `HOA Renovation Approval in ${name} | 2026 Guide`

  const description = isEs ? c.introEs : c.intro
  const canonical = `https://brokeandfixed.com/${locale}/hoa-renovation-guide/${isEs ? c.slugEs : c.slug}`

  return {
    title,
    description: description.slice(0, 160),
    alternates: {
      canonical,
      languages: {
        en: `/en/hoa-renovation-guide/${c.slug}`,
        es: `/es/hoa-renovation-guide/${c.slugEs}`,
        "x-default": `/en/hoa-renovation-guide/${c.slug}`,
      },
    },
    openGraph: {
      title,
      description: description.slice(0, 200),
      type: "article",
    },
  }
}

export default async function HoaCommunityPage({
  params,
}: {
  params: Promise<PageParams>
}) {
  const { locale, community: slug } = await params
  const c = findHoaCommunity(slug)
  if (!c) notFound()

  const isEs = locale === "es"
  const name = isEs ? c.nameEs : c.name
  const intro = isEs ? c.introEs : c.intro
  const timeline = isEs ? c.typicalTimelineEs : c.typicalTimeline
  const localQuirk = isEs ? c.localQuirkEs : c.localQuirk

  const heroImage =
    serviceImages[c.heroImageKey]?.hero || "/placeholder.jpg"
  const heroAlt = isEs
    ? `Renovacion residencial en ${name} con guia de aprobacion del HOA`
    : `Residential renovation in ${name} with HOA approval guidance`

  const breadcrumbs = [
    { name: isEs ? "Inicio" : "Home", href: `/${locale}` },
    {
      name: isEs ? "Guia de Renovacion del HOA" : "HOA Renovation Guide",
      href: `/${locale}/hoa-renovation-guide`,
    },
    {
      name: name,
      href: `/${locale}/hoa-renovation-guide/${isEs ? c.slugEs : c.slug}`,
    },
  ]

  // FAQPage JSON-LD for the community FAQs
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: c.faqs.map((faq) => ({
      "@type": "Question",
      name: isEs ? faq.questionEs : faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: isEs ? faq.answerEs : faq.answer,
      },
    })),
  }

  // Article JSON-LD
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: isEs
      ? `Aprobacion del HOA para Renovaciones en ${name}`
      : `HOA Renovation Approval in ${name}`,
    description: intro.slice(0, 200),
    author: {
      "@type": "Organization",
      name: "Broke & Fixed Home Solutions",
      url: "https://brokeandfixed.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Broke & Fixed Home Solutions",
      url: "https://brokeandfixed.com",
    },
    inLanguage: locale === "es" ? "es" : "en",
    url: `https://brokeandfixed.com/${locale}/hoa-renovation-guide/${
      isEs ? c.slugEs : c.slug
    }`,
  }

  return (
    <main className="min-h-screen bg-cream">
      <JsonLd data={faqSchema} />
      <JsonLd data={articleSchema} />

      {/* HERO */}
      <section className="relative h-[420px] md:h-[500px] w-full overflow-hidden">
        <Image
          src={heroImage}
          alt={heroAlt}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-espresso/90 via-espresso/50 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-5xl mx-auto px-4 pb-10 w-full">
            <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-3">
              {isEs
                ? `Aprobacion del HOA en ${name}`
                : `HOA Approval in ${name}`}
            </h1>
            <p className="text-cream text-lg md:text-xl max-w-3xl">
              {isEs
                ? `Lo que necesitas saber para aprobar tu renovacion en ${name}, basado en proyectos reales que hemos hecho.`
                : `What you need to know to get your renovation approved in ${name}, based on real projects we've done.`}
            </p>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <div className="max-w-4xl mx-auto px-4 py-10">
        <Breadcrumbs items={breadcrumbs} />

        <article className="prose prose-lg max-w-none mt-8 prose-headings:font-display prose-headings:text-espresso prose-h2:text-3xl prose-h2:mt-10 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-p:text-deep-charcoal prose-p:leading-relaxed prose-li:text-deep-charcoal prose-a:text-trade-orange prose-a:no-underline hover:prose-a:underline prose-strong:text-espresso">
          <p className="text-xl leading-relaxed">{intro}</p>

          {/* Quick facts panel */}
          <div className="not-prose bg-shield-navy text-cream rounded-lg p-6 my-8 grid md:grid-cols-2 gap-4">
            <div>
              <div className="text-trade-orange font-accent text-sm uppercase font-bold mb-1">
                {isEs ? "Cronograma Tipico" : "Typical Timeline"}
              </div>
              <div className="text-lg">{timeline}</div>
            </div>
            <div>
              <div className="text-trade-orange font-accent text-sm uppercase font-bold mb-1">
                {isEs ? "Aplicacion" : "Coverage"}
              </div>
              <div className="text-lg">
                {isEs
                  ? "Renovaciones exteriores residenciales"
                  : "Residential exterior renovations"}
              </div>
            </div>
          </div>

          {/* Known HOAs */}
          {c.knownHoas.length > 0 && (
            <>
              <h2>
                {isEs ? `HOAs Comunes en ${name}` : `Common HOAs in ${name}`}
              </h2>
              <p>
                {isEs
                  ? `Algunas de las asociaciones de propietarios mas comunes en ${name} con las que hemos trabajado:`
                  : `Some of the most common homeowner associations in ${name} we have worked with:`}
              </p>
              <ul>
                {c.knownHoas.map((hoa) => (
                  <li key={hoa}>{hoa}</li>
                ))}
              </ul>
              <p>
                <em>
                  {isEs
                    ? "Si tu HOA no esta en esta lista, no significa que no podamos ayudarte. La mayoria de los procesos de ARC en Miami-Dade siguen patrones similares."
                    : "If your HOA is not on this list, that does not mean we cannot help you. Most ARC processes in Miami-Dade follow similar patterns."}
                </em>
              </p>
            </>
          )}

          {/* Local quirk if any */}
          {localQuirk && (
            <>
              <h2>
                {isEs ? `Particularidad Local de ${name}` : `${name} Local Quirk`}
              </h2>
              <p>{localQuirk}</p>
            </>
          )}

          {/* Common approval patterns */}
          <h2>
            {isEs
              ? `Patrones de Aprobacion Comunes en ${name}`
              : `Common Approval Patterns in ${name}`}
          </h2>

          <h3>
            {isEs ? "Pintura Exterior" : "Exterior Paint"}
          </h3>
          <p>{isEs ? c.commonApprovals.paintEs : c.commonApprovals.paint}</p>

          <h3>
            {isEs
              ? "Ventanas (Incluyendo Impacto Contra Huracanes)"
              : "Windows (Including Hurricane Impact)"}
          </h3>
          <p>
            {isEs ? c.commonApprovals.windowsEs : c.commonApprovals.windows}
          </p>
          <p>
            <Link
              href={`/${locale}/blog/hurricane-impact-windows-miami-hoa-rights`}
            >
              {isEs
                ? "Lea mas: Tus derechos sobre ventanas de impacto bajo la ley de Florida"
                : "Read more: Your hurricane impact window rights under Florida law"}
            </Link>
          </p>

          <h3>{isEs ? "Techo" : "Roof"}</h3>
          <p>{isEs ? c.commonApprovals.roofEs : c.commonApprovals.roof}</p>

          {/* What we typically handle */}
          <h2>
            {isEs
              ? `Como Manejamos Renovaciones en ${name}`
              : `How We Handle Renovations in ${name}`}
          </h2>
          <p>
            {isEs
              ? `Cuando trabajamos en una renovacion en ${name}, manejamos todo el proceso de aprobacion del HOA como parte del proyecto. Preparamos el paquete de solicitud, lo enviamos al ARC, damos seguimiento hasta la decision escrita, y coordinamos el trabajo para alinearlo con cualquier requisito de inspeccion final del HOA. Tu unico trabajo es elegir los acabados que quieres.`
              : `When we work on a renovation in ${name}, we handle the HOA approval process as part of the project. We prepare the application packet, submit it to the ARC, follow up until written decision, and coordinate the work to align with any HOA final inspection requirements. Your only job is to pick the finishes you want.`}
          </p>
          <p>
            {isEs
              ? "Servicios que regularmente proveemos en esta area:"
              : "Services we regularly provide in this area:"}
          </p>
          <ul>
            <li>
              <Link href={`/${locale}/services/${isEs ? "remodelacion-de-cocinas" : "kitchen-remodeling"}/${c.locationSlug}`}>
                {isEs ? `Remodelacion de cocina en ${name}` : `Kitchen remodeling in ${name}`}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/services/${isEs ? "remodelacion-de-banos" : "bathroom-remodeling"}/${c.locationSlug}`}>
                {isEs ? `Remodelacion de banos en ${name}` : `Bathroom remodeling in ${name}`}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/services/${isEs ? "pintura-exterior" : "exterior-painting"}/${c.locationSlug}`}>
                {isEs ? `Pintura exterior en ${name}` : `Exterior painting in ${name}`}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/services/${isEs ? "pintura-interior" : "interior-painting"}/${c.locationSlug}`}>
                {isEs ? `Pintura interior en ${name}` : `Interior painting in ${name}`}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/services/${isEs ? "renovacion-de-gabinetes" : "cabinet-refinishing"}/${c.locationSlug}`}>
                {isEs ? `Renovacion de gabinetes en ${name}` : `Cabinet refinishing in ${name}`}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/services/${isEs ? "reparaciones-exteriores" : "exterior-repairs"}/${c.locationSlug}`}>
                {isEs ? `Reparaciones exteriores en ${name}` : `Exterior repairs in ${name}`}
              </Link>
            </li>
          </ul>

          {/* FAQs specific to this community */}
          <h2>
            {isEs
              ? `Preguntas Frecuentes sobre el HOA en ${name}`
              : `Frequently Asked Questions about HOAs in ${name}`}
          </h2>
          {c.faqs.map((faq, idx) => (
            <div key={idx} className="mb-6">
              <h3>{isEs ? faq.questionEs : faq.question}</h3>
              <p>{isEs ? faq.answerEs : faq.answer}</p>
            </div>
          ))}

          {/* Related reading */}
          <h2>{isEs ? "Lecturas Relacionadas" : "Related Reading"}</h2>
          <ul>
            <li>
              <Link href={`/${locale}/blog/miami-hoa-renovation-approval-guide`}>
                {isEs
                  ? "Guia Completa de Aprobacion de Renovacion del HOA en Miami"
                  : "Complete Miami HOA Renovation Approval Guide"}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/blog/hoa-approval-vs-permit-miami`}>
                {isEs
                  ? "Aprobacion del HOA vs Permiso del Condado"
                  : "HOA Approval vs County Permit"}
              </Link>
            </li>
            <li>
              <Link
                href={`/${locale}/blog/hurricane-impact-windows-miami-hoa-rights`}
              >
                {isEs
                  ? "Ventanas de Impacto Contra Huracanes y Tu HOA"
                  : "Hurricane Impact Windows and Your HOA"}
              </Link>
            </li>
          </ul>
        </article>

        {/* CTA */}
        <div className="bg-trade-orange text-white rounded-lg p-8 mt-12 text-center">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-3">
            {isEs
              ? `Planeando una Renovacion en ${name}?`
              : `Planning a Renovation in ${name}?`}
          </h2>
          <p className="mb-5 text-lg">
            {isEs
              ? "Le decimos directo lo que el proceso requerira en su HOA antes de comprometerse. Evaluacion gratis en persona."
              : "We tell you straight what the process will require in your HOA before you commit. Free in-person assessment."}
          </p>
          <a
            href="tel:7863637039"
            className="inline-block bg-white text-trade-orange font-accent font-bold text-lg px-8 py-3 rounded hover:bg-cream transition-colors"
          >
            (786) 363-7039
          </a>
        </div>
      </div>
    </main>
  )
}
