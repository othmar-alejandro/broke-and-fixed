import { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import {
  kingTideAreas,
  hubFaqs,
  nextKingTides,
  regionSources,
  KING_TIDE_UPDATED,
} from "@/lib/data/king-tide-areas"
import { kingTideQuestions } from "@/lib/data/king-tide-questions"
import { metaDescription } from "@/lib/seo-metadata"
import Breadcrumbs from "@/components/seo/Breadcrumbs"
import JsonLd from "@/components/seo/JsonLd"
import LinkedText, { stripLinks } from "@/components/seo/LinkedText"
import PhoneLink from "@/components/PhoneLink"
import CallBox from "@/components/king-tide/CallBox"

const SUMMARY = {
  en: "The October 2026 king tide was the highest South Florida has recorded outside a hurricane. Saltwater flooded homes from Fort Lauderdale to Miami. Here is where it hit, what saltwater does to a house, and how we repair it.",
  es: "La marea rey de octubre de 2026 fue la más alta registrada en el sur de Florida fuera de un huracán. El agua salada inundó casas desde Fort Lauderdale hasta Miami. Aquí está dónde golpeó, lo que el agua salada le hace a una casa y cómo la reparamos.",
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const isEs = locale === "es"
  const title = isEs
    ? "Reparación de Daños por Marea Rey en Broward y Miami-Dade | 2026"
    : "King Tide Flood Damage Repair in Broward and Miami-Dade | 2026"
  const description = metaDescription(isEs ? SUMMARY.es : SUMMARY.en)

  return {
    title,
    description,
    alternates: {
      canonical: `https://brokeandfixed.com/${locale}/king-tide-flooding`,
      languages: {
        en: "/en/king-tide-flooding",
        es: "/es/king-tide-flooding",
        "x-default": "/en/king-tide-flooding",
      },
    },
    openGraph: {
      title,
      description,
      type: "article",
      images: [{ url: "/images/king-tide/hub.jpg", width: 1600, height: 900 }],
    },
  }
}

export default async function KingTideHubPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const isEs = locale === "es"
  const summary = isEs ? SUMMARY.es : SUMMARY.en

  const breadcrumbs = [
    { name: isEs ? "Inicio" : "Home", href: `/${locale}` },
    {
      name: isEs ? "Inundaciones por Marea Rey" : "King Tide Flooding",
      href: `/${locale}/king-tide-flooding`,
    },
  ]

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: hubFaqs.map((faq) => ({
      "@type": "Question",
      name: isEs ? faq.questionEs : faq.question,
      acceptedAnswer: { "@type": "Answer", text: stripLinks(isEs ? faq.answerEs : faq.answer) },
    })),
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: isEs
      ? "Reparación de daños por marea rey en Broward y Miami-Dade"
      : "King tide flood damage repair in Broward and Miami-Dade",
    description: summary,
    datePublished: KING_TIDE_UPDATED,
    dateModified: KING_TIDE_UPDATED,
    author: { "@type": "Organization", name: "Broke & Fixed Home Solutions", url: "https://brokeandfixed.com" },
    publisher: { "@type": "Organization", name: "Broke & Fixed Home Solutions", url: "https://brokeandfixed.com" },
    image: "https://brokeandfixed.com/images/king-tide/hub.jpg",
    citation: regionSources.map((s) => s.url),
    inLanguage: isEs ? "es" : "en",
    url: `https://brokeandfixed.com/${locale}/king-tide-flooding`,
  }

  return (
    <main className="min-h-screen bg-cream">
      <JsonLd data={faqSchema} />
      <JsonLd data={articleSchema} />

      <section className="relative bg-espresso overflow-hidden">
        <Image src="/images/king-tide/hub.jpg" alt={isEs ? "Ilustración de una calle inundada por la marea rey en el sur de Florida, con agua saliendo por un desagüe" : "Illustration of a South Florida street flooded by a king tide, with water coming up through a storm drain"} fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-r from-espresso/95 via-espresso/75 to-espresso/30" />
        <span className="absolute top-24 right-4 text-[11px] uppercase tracking-wider text-white/80 bg-espresso/60 px-2 py-1 rounded">
          {isEs ? "Ilustración" : "Illustration"}
        </span>
        <div className="relative max-w-5xl mx-auto px-4 pt-28 pb-12">
          <div className="text-sage-muted text-sm uppercase font-bold tracking-wider mb-3">
            {isEs ? "Marea rey, octubre 2026" : "King tide, October 2026"}
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-4">
            {isEs
              ? "Reparación de Daños por Marea Rey en Broward y Miami-Dade"
              : "King Tide Flood Damage Repair in Broward and Miami-Dade"}
          </h1>
          <p className="text-cream text-lg md:text-xl max-w-3xl">{summary}</p>
          <PhoneLink
            phoneNumber="(786) 363-7039"
            source="king_tide_hub_hero"
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

          <h2>{isEs ? "El agua más alta sin un huracán" : "The highest water without a hurricane"}</h2>
          {isEs ? (
            <>
              <p>
                La marea rey llegó a su punto más alto el martes 27 de octubre de 2026. Fort Lauderdale y Miami midieron cerca de 2.5 pies de agua por encima de la marea alta, lo que el Servicio Nacional de Meteorología clasifica como inundación mayor. El medidor de Virginia Key en Miami registró la mayor cantidad de agua fuera de un huracán desde que se instaló en 1994, y el de Port Everglades rompió el récord que había marcado en septiembre.
              </p>
              <p>
                Un sistema de baja presión junto a la costa y vientos de 30 a 40 mph empujaron el agua tierra adentro. El agua entró por encima de los muros de contención y subió por los desagües, y llegó a las puertas de negocios en Miami Beach y Fort Lauderdale, en algunos casos pasando adentro.
              </p>
            </>
          ) : (
            <>
              <p>
                The king tide peaked on Tuesday, October 27, 2026. Fort Lauderdale and Miami both measured about 2.5 feet of water above high tide, which the National Weather Service classifies as major flooding. Miami's Virginia Key gauge recorded the most water it has seen outside a hurricane since it was installed in 1994, and the Port Everglades gauge broke the record it set in September.
              </p>
              <p>
                A low pressure system off the coast and 30 to 40 mph onshore wind pushed the water inland. It came over seawalls and up through storm drains, and reached the doors of coastal businesses in Miami Beach and Fort Lauderdale, in some cases getting past them.
              </p>
            </>
          )}

          <div className="not-prose">
            <CallBox isEs={isEs} source="king_tide_hub_mid" />
          </div>

          <h2>{isEs ? "Las zonas más afectadas" : "The hardest-hit areas"}</h2>
          <div className="not-prose grid md:grid-cols-2 gap-4 my-6">
            {kingTideAreas.map((a) => (
              <Link
                key={a.slug}
                href={`/${locale}/king-tide-flooding/${a.slug}`}
                className="block bg-white border border-espresso/10 rounded-lg p-5 hover:border-sage-muted transition-colors"
              >
                <div className="text-sage-muted text-xs uppercase font-bold mb-1">
                  {isEs ? `Condado de ${a.county}` : `${a.county} County`}
                </div>
                <div className="font-display text-2xl font-bold text-espresso mb-2">
                  {isEs ? a.nameEs : a.name}
                </div>
                <div className="text-sm text-espresso">
                  {a.hotspots.map((h) => h.name).join(", ")}
                </div>
              </Link>
            ))}
          </div>
          <p>
            {isEs
              ? "En Pompano Beach, la marea rey de septiembre de 2026 ya había dejado agua hasta las rodillas en Riverside Drive cerca de Atlantic Boulevard. Si su casa está en una calle que se inundó en septiembre, revise lo mismo que describimos en estas páginas."
              : "In Pompano Beach, the September 2026 king tide had already put knee-high water on Riverside Drive near Atlantic Boulevard. If your home is on a street that flooded in September, check the same things we cover on these pages."}
          </p>

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

          <h2>{isEs ? "Próximas mareas rey en 2026" : "Next king tides in 2026"}</h2>
          <p>
            {isEs
              ? "La Ciudad de Fort Lauderdale anuncia estas fechas. Miami-Dade ve las mismas mareas."
              : "The City of Fort Lauderdale lists these windows. Miami-Dade sees the same tides."}
          </p>
          <ul>
            {(isEs ? nextKingTides.es : nextKingTides.en).map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>

          <h2>{isEs ? "Lo que hacemos" : "What we do"}</h2>
          <p>
            {isEs
              ? "Somos una empresa de remodelación familiar y totalmente asegurada, con base en Kendall, que trabaja en Miami-Dade y Broward. Después de una marea rey sacamos el agua y el material mojado, enjuagamos la sal, secamos y reconstruimos: drywall, pintura, losa, zócalos, gabinetes, baños y cocinas. Usted recibe fotos y un alcance por escrito para su póliza de inundación."
              : "We are a family owned, fully insured remodeling company based in Kendall, working across Miami-Dade and Broward. After a king tide we get the water and the wet material out, rinse off the salt, dry the house and rebuild: drywall, paint, tile, baseboards, cabinets, bathrooms and kitchens. You get photos and a written scope for your flood policy."}
          </p>

          <h2>{isEs ? "Preguntas frecuentes" : "Common questions"}</h2>
          {hubFaqs.map((faq, i) => (
            <div key={i} className="mb-6">
              <h3>{isEs ? faq.questionEs : faq.question}</h3>
              <p><LinkedText text={isEs ? faq.answerEs : faq.answer} locale={locale} /></p>
            </div>
          ))}

          <h2>{isEs ? "Fuentes" : "Sources"}</h2>
          <ul className="text-base">
            {[...regionSources, nextKingTides.source].map((s) => (
              <li key={s.url}>
                <a href={s.url} target="_blank" rel="noopener noreferrer">{s.label}</a>
              </li>
            ))}
          </ul>
        </article>

        <div className="bg-sage-muted text-white rounded-lg p-8 mt-12 text-center">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-3">
            {isEs ? "¿Entró agua a su casa?" : "Did water get into your home?"}
          </h2>
          <p className="mb-5 text-lg">
            {isEs
              ? "Recorremos la casa, le decimos qué hay que sacar y qué se puede salvar, y le damos el alcance por escrito."
              : "We walk the house, tell you what has to come out and what can be saved, and give you the scope in writing."}
          </p>
          <PhoneLink
            phoneNumber="(786) 363-7039"
            source="king_tide_hub_footer"
            className="inline-block bg-white text-sage-muted font-bold text-lg px-8 py-3 rounded hover:bg-cream transition-colors"
          />
        </div>
      </div>
    </main>
  )
}
