import { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import {
  kingTideAreas,
  findKingTideArea,
  nextKingTides,
  KING_TIDE_UPDATED,
} from "@/lib/data/king-tide-areas"
import { kingTideQuestions } from "@/lib/data/king-tide-questions"
import { metaDescription } from "@/lib/seo-metadata"
import LinkedText, { stripLinks } from "@/components/seo/LinkedText"
import PhoneLink from "@/components/PhoneLink"
import CallBox from "@/components/king-tide/CallBox"
import Breadcrumbs from "@/components/seo/Breadcrumbs"
import JsonLd from "@/components/seo/JsonLd"

interface PageParams {
  locale: string
  area: string
}

export function generateStaticParams() {
  return kingTideAreas.flatMap((a) => [
    { locale: "en", area: a.slug },
    { locale: "es", area: a.slug },
  ])
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>
}): Promise<Metadata> {
  const { locale, area: slug } = await params
  const a = findKingTideArea(slug)
  if (!a) return { title: "Not Found" }

  const isEs = locale === "es"
  const name = isEs ? a.nameEs : a.name
  const title = isEs
    ? `Reparación de Daños por Marea Rey en ${name} | Octubre 2026`
    : `King Tide Flood Damage Repair in ${name} | October 2026`
  const description = metaDescription(isEs ? a.summaryEs : a.summary)

  return {
    title,
    description,
    alternates: {
      canonical: `https://brokeandfixed.com/${locale}/king-tide-flooding/${a.slug}`,
      languages: {
        en: `/en/king-tide-flooding/${a.slug}`,
        es: `/es/king-tide-flooding/${a.slug}`,
        "x-default": `/en/king-tide-flooding/${a.slug}`,
      },
    },
    openGraph: {
      title,
      description,
      type: "article",
      images: [{ url: `/images/king-tide/${a.slug}.jpg`, width: 1600, height: 900 }],
    },
  }
}

export default async function KingTideAreaPage({
  params,
}: {
  params: Promise<PageParams>
}) {
  const { locale, area: slug } = await params
  const a = findKingTideArea(slug)
  if (!a) notFound()

  const isEs = locale === "es"
  const name = isEs ? a.nameEs : a.name
  const url = `https://brokeandfixed.com/${locale}/king-tide-flooding/${a.slug}`
  const svc = (en: string, es: string) => `/${locale}/services/${isEs ? es : en}`
  const otherAreas = kingTideAreas.filter((o) => o.slug !== a.slug)

  const breadcrumbs = [
    { name: isEs ? "Inicio" : "Home", href: `/${locale}` },
    {
      name: isEs ? "Inundaciones por Marea Rey" : "King Tide Flooding",
      href: `/${locale}/king-tide-flooding`,
    },
    { name, href: `/${locale}/king-tide-flooding/${a.slug}` },
  ]

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: a.faqs.map((faq) => ({
      "@type": "Question",
      name: isEs ? faq.questionEs : faq.question,
      acceptedAnswer: { "@type": "Answer", text: stripLinks(isEs ? faq.answerEs : faq.answer) },
    })),
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: isEs
      ? `Reparación de daños por marea rey en ${name}`
      : `King tide flood damage repair in ${name}`,
    description: isEs ? a.summaryEs : a.summary,
    datePublished: KING_TIDE_UPDATED,
    dateModified: KING_TIDE_UPDATED,
    author: { "@type": "Organization", name: "Broke & Fixed Home Solutions", url: "https://brokeandfixed.com" },
    publisher: { "@type": "Organization", name: "Broke & Fixed Home Solutions", url: "https://brokeandfixed.com" },
    image: `https://brokeandfixed.com/images/king-tide/${a.slug}.jpg`,
    about: { "@type": "Place", name: `${a.name}, ${a.county} County, FL` },
    citation: a.sources.map((s) => s.url),
    inLanguage: isEs ? "es" : "en",
    url,
  }

  return (
    <main className="min-h-screen bg-cream">
      <JsonLd data={faqSchema} />
      <JsonLd data={articleSchema} />

      {/* HERO: AI illustration, labeled. Swap for real job photos when we have them. */}
      <section className="relative bg-espresso overflow-hidden">
        <Image src={`/images/king-tide/${a.slug}.jpg`} alt={isEs ? `Ilustración de inundación por marea rey en ${name}` : `Illustration of king tide flooding in ${name}`} fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-r from-espresso/95 via-espresso/75 to-espresso/30" />
        <span className="absolute top-24 right-4 text-[11px] uppercase tracking-wider text-white/80 bg-espresso/60 px-2 py-1 rounded">
          {isEs ? "Ilustración" : "Illustration"}
        </span>
        <div className="relative max-w-5xl mx-auto px-4 pt-28 pb-12">
          <div className="text-sage-muted text-sm uppercase font-bold tracking-wider mb-3">
            {isEs
              ? `Marea rey, octubre 2026 · Condado de ${a.county}`
              : `King tide, October 2026 · ${a.county} County`}
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-4">
            {isEs
              ? `Reparación de Daños por Marea Rey en ${name}`
              : `King Tide Flood Damage Repair in ${name}`}
          </h1>
          <p className="text-cream text-lg md:text-xl max-w-3xl">
            {isEs ? a.summaryEs : a.summary}
          </p>
          <PhoneLink
            phoneNumber="(786) 363-7039"
            source="king_tide_area_hero"
            displayText={isEs ? "Llame (786) 363-7039" : "Call (786) 363-7039"}
            className="inline-block mt-6 bg-sage-muted text-white font-bold text-lg px-8 py-3 rounded hover:opacity-90 transition-opacity"
          />
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-10">
        <Breadcrumbs items={breadcrumbs} />

        <article className="prose prose-lg max-w-none mt-8 prose-headings:font-display prose-headings:text-espresso prose-h2:text-3xl prose-h2:mt-10 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-p:text-espresso prose-p:leading-relaxed prose-li:text-espresso prose-a:text-sage-muted prose-a:no-underline hover:prose-a:underline prose-strong:text-espresso">
          <p className="text-sm text-warm-gray">
            {isEs ? "Actualizado el 29 de octubre de 2026" : "Updated October 29, 2026"}
          </p>

          <h2>{isEs ? `Lo que pasó en ${name}` : `What happened in ${name}`}</h2>
          {(isEs ? a.whatHappenedEs : a.whatHappened).map((p, i) => (
            <p key={i}><LinkedText text={p} locale={locale} /></p>
          ))}

          <div className="not-prose">
            <CallBox isEs={isEs} source="king_tide_area_mid" />
          </div>

          <div className="not-prose bg-white border border-espresso/10 rounded-lg p-6 my-8">
            <div className="text-sage-muted text-sm uppercase font-bold mb-4">
              {isEs ? "Zonas reportadas con inundación" : "Reported flooding spots"}
            </div>
            <ul className="space-y-3">
              {a.hotspots.map((h) => (
                <li key={h.name}>
                  <div className="font-bold text-espresso">{h.name}</div>
                  <div className="text-espresso">{isEs ? h.noteEs : h.note}</div>
                </li>
              ))}
            </ul>
          </div>

          <h2>
            {isEs ? `Por qué ${name} se inunda con la marea rey` : `Why ${name} floods on a king tide`}
          </h2>
          <p><LinkedText text={isEs ? a.whyItFloodsEs : a.whyItFloods} locale={locale} /></p>

          <h2>
            {isEs ? "Agua salada dentro de la casa: lo que hay que sacar" : "Saltwater in the house: what has to come out"}
          </h2>
          {isEs ? (
            <>
              <p>
                El agua de la marea rey no es agua limpia de mar. Sube por desagües, canales y líneas de alcantarillado antes de llegar a su casa, y la industria de restauración la clasifica como Categoría 3, la más contaminada. Por eso no basta con secar.
              </p>
              <ul>
                <li><strong>Drywall:</strong> el agua sube por el papel y el yeso más arriba de donde estuvo. Se corta por encima de la parte mojada, muchas veces a 2 pies del piso.</li>
                <li><strong>Zócalos y aislamiento:</strong> el MDF se hincha y el aislamiento guarda la sal. Se botan.</li>
                <li><strong>Gabinetes:</strong> las bases de aglomerado de cocina y baño absorben agua por abajo y no se recuperan.</li>
                <li><strong>Pisos:</strong> la losa sobre concreto normalmente se salva con limpieza. El laminado, la madera y la alfombra casi nunca.</li>
                <li><strong>Sal:</strong> la sal que queda sigue atrayendo humedad. Las superficies se enjuagan con agua dulce antes de secar.</li>
              </ul>
            </>
          ) : (
            <>
              <p>
                King tide water is not clean seawater. It comes up through storm drains, canals and sewer lines before it reaches your house, and the restoration industry classes it as Category 3, the most contaminated kind. That is why drying alone is not enough.
              </p>
              <ul>
                <li><strong>Drywall:</strong> water wicks up the paper and gypsum well above where it stood. It gets cut out above the wet line, often at 2 feet off the floor.</li>
                <li><strong>Baseboards and insulation:</strong> MDF swells and insulation holds the salt. Both go.</li>
                <li><strong>Cabinets:</strong> particle board bases in kitchens and bathrooms soak water up from the bottom and do not recover.</li>
                <li><strong>Floors:</strong> tile on a concrete slab usually survives with cleaning. Laminate, wood and carpet rarely do.</li>
                <li><strong>Salt:</strong> salt left behind keeps pulling in moisture. Surfaces get rinsed with fresh water before drying.</li>
              </ul>
            </>
          )}

          <h2>{isEs ? `Cómo lo reparamos en ${name}` : `How we repair it in ${name}`}</h2>
          <ol>
            <li>
              {isEs
                ? "Visita a la casa. Vemos por dónde entró el agua y qué tan alto subió. Usted recibe fotos y un alcance por escrito para su póliza de inundación."
                : "Walkthrough. We find where the water came in and how high it wicked. You get photos and a written scope for your flood policy."}
            </li>
            <li>
              {isEs
                ? "Sacar el agua y cortar. Retiramos alfombra, zócalos, aislamiento y la parte baja del drywall mojado."
                : "Water out and tear-out. We remove carpet, baseboards, insulation and the wet lower drywall."}
            </li>
            <li>
              {isEs
                ? "Enjuagar y secar. Quitamos la sal y secamos con ventiladores y deshumidificadores antes de cerrar nada."
                : "Rinse and dry. We get the salt off and dry the room with air movers and dehumidifiers before anything gets closed up."}
            </li>
            <li>
              {isEs
                ? "Reconstruir. Drywall, pintura, losa, zócalos, gabinetes, baños y cocinas. Si el agua llegó a lo eléctrico o la plomería, traemos al oficio correcto para esa parte."
                : "Rebuild. Drywall, paint, tile, baseboards, cabinets, bathrooms and kitchens. If water reached electrical or plumbing, we bring in the right trade for that part."}
            </li>
          </ol>
          <p>
            {isEs ? "Servicios relacionados: " : "Related services: "}
            <Link href={svc("interior-painting", "pintura-interior")}>{isEs ? "pintura interior" : "interior painting"}</Link>,{" "}
            <Link href={svc("tile-work", "instalacion-de-pisos")}>{isEs ? "losa y pisos" : "tile work"}</Link>,{" "}
            <Link href={svc("bathroom-remodeling", "remodelacion-de-banos")}>{isEs ? "remodelación de baños" : "bathroom remodeling"}</Link>,{" "}
            <Link href={svc("kitchen-remodeling", "remodelacion-de-cocinas")}>{isEs ? "remodelación de cocinas" : "kitchen remodeling"}</Link>,{" "}
            <Link href={svc("exterior-repairs", "reparaciones-exteriores")}>{isEs ? "reparaciones exteriores" : "exterior repairs"}</Link>.
          </p>

          <h2>{isEs ? "Antes de la próxima marea rey" : "Before the next king tide"}</h2>
          <p>
            {isEs
              ? "La Ciudad de Fort Lauderdale anuncia estas próximas fechas de marea rey para 2026:"
              : "The City of Fort Lauderdale lists these remaining 2026 king tide windows:"}
          </p>
          <ul>
            {(isEs ? nextKingTides.es : nextKingTides.en).map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
          <p><LinkedText text={isEs ? a.prepTipEs : a.prepTip} locale={locale} /></p>

          <h2>{isEs ? `Preguntas frecuentes en ${name}` : `${name} king tide questions`}</h2>
          {a.faqs.map((faq, i) => (
            <div key={i} className="mb-6">
              <h3>{isEs ? faq.questionEs : faq.question}</h3>
              <p><LinkedText text={isEs ? faq.answerEs : faq.answer} locale={locale} /></p>
            </div>
          ))}

          <h2>{isEs ? "Preguntas que la gente está haciendo" : "Questions people are asking"}</h2>
          <ul>
            {kingTideQuestions.map((q) => (
              <li key={q.slug}>
                <Link href={`/${locale}/king-tide-flooding/questions/${q.slug}`}>
                  {isEs ? q.questionEs : q.question}
                </Link>
              </li>
            ))}
          </ul>

          <h2>{isEs ? "Otras zonas afectadas" : "Other areas hit by this tide"}</h2>
          <ul>
            {otherAreas.map((o) => (
              <li key={o.slug}>
                <Link href={`/${locale}/king-tide-flooding/${o.slug}`}>
                  {isEs ? `Daños por marea rey en ${o.nameEs}` : `King tide damage in ${o.name}`}
                </Link>
              </li>
            ))}
            <li>
              <Link href={`/${locale}/king-tide-flooding`}>
                {isEs ? "Guía de inundaciones por marea rey en el sur de Florida" : "South Florida king tide flooding guide"}
              </Link>
            </li>
          </ul>

          <h2>{isEs ? "Fuentes" : "Sources"}</h2>
          <ul className="text-base">
            {[...a.sources, nextKingTides.source].map((s) => (
              <li key={s.url}>
                <a href={s.url} target="_blank" rel="noopener noreferrer">{s.label}</a>
              </li>
            ))}
          </ul>
        </article>

        <div className="bg-sage-muted text-white rounded-lg p-8 mt-12 text-center">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-3">
            {isEs ? `¿Entró agua a su casa en ${name}?` : `Did water get into your ${name} home?`}
          </h2>
          <p className="mb-5 text-lg">
            {isEs
              ? "Recorremos la casa, le decimos qué hay que sacar y qué se puede salvar, y le damos el alcance por escrito."
              : "We walk the house, tell you what has to come out and what can be saved, and give you the scope in writing."}
          </p>
          <PhoneLink
            phoneNumber="(786) 363-7039"
            source="king_tide_area_footer"
            className="inline-block bg-white text-sage-muted font-bold text-lg px-8 py-3 rounded hover:bg-cream transition-colors"
          />
        </div>
      </div>
    </main>
  )
}
