import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, CheckCircle, Phone, ShieldCheck, Star } from '@phosphor-icons/react/dist/ssr'
import JsonLd from '@/components/seo/JsonLd'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import { getTubToShowerLocation, tubToShowerLocationProfiles } from '@/lib/data/tub-to-shower-locations'
import './location.css'

const BASE_URL = 'https://brokeandfixed.com'
const LANDING_PATH = '/landing/tub-to-shower'

interface PageParams {
  locale: string
  location: string
}

function pageUrl(locale: string, slug: string) {
  return `${BASE_URL}/${locale}${LANDING_PATH}/${slug}`
}

export function generateStaticParams() {
  return tubToShowerLocationProfiles.flatMap(({ slug }) => [
    { locale: 'en', location: slug },
    { locale: 'es', location: slug },
  ])
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>
}): Promise<Metadata> {
  const { locale, location: slug } = await params
  const entry = getTubToShowerLocation(slug)
  if (!entry) return {}

  const isEs = locale === 'es'
  const name = entry.location.name
  const title = isEs
    ? `Conversión de Tina a Ducha en ${name} | Broke & Fixed`
    : `Tub-to-Shower Conversion in ${name} | Broke & Fixed`
  const description = isEs
    ? `Reemplaza tu tina con una ducha con azulejo, vidrio y entrada cómoda en ${name}. Mira opciones y pide un rango de precio para tu baño.`
    : `Replace your tub with a tiled shower, clear glass, and a more comfortable entry in ${name}. See options and request a project-specific range.`
  const canonical = pageUrl(isEs ? 'es' : 'en', slug)

  return {
    title,
    description,
    keywords: isEs
      ? [`conversión de tina a ducha ${name}`, `ducha sin tina ${name}`, `remodelación de baño ${name}`]
      : [`tub-to-shower conversion ${name}`, `walk-in shower ${name}`, `bathroom remodeling ${name}`],
    openGraph: {
      title,
      description,
      type: 'website',
      url: canonical,
      siteName: 'Broke & Fixed Home Solutions',
      locale: isEs ? 'es_US' : 'en_US',
      alternateLocale: isEs ? 'en_US' : 'es_US',
      images: [{ url: `${BASE_URL}/landing/tub-to-shower/compare-rebuild.png` }],
    },
    alternates: {
      canonical,
      languages: {
        en: pageUrl('en', slug),
        es: pageUrl('es', slug),
        'x-default': pageUrl('en', slug),
      },
    },
  }
}

export default async function TubToShowerLocationPage({
  params,
}: {
  params: Promise<PageParams>
}) {
  const { locale, location: slug } = await params
  const entry = getTubToShowerLocation(slug)
  if (!entry) notFound()

  const { location, profile } = entry
  const isEs = locale === 'es'
  const name = location.name
  const path = pageUrl(locale, slug)
  const landingPath = `/${locale}${LANDING_PATH}`
  const profileAngle = isEs ? profile.angleEs : profile.angle
  const profileDetail = isEs ? profile.detailEs : profile.detail
  const locationDescription = isEs ? location.descriptionEs : location.description
  const homeTypes = location.commonHomeTypes.join(', ')
  const nearby = profile.nearby.join(', ')

  const faqs = isEs
    ? [
        {
          question: `¿Cuánto cuesta convertir una tina a ducha en ${name}?`,
          answer: `El costo depende del tamaño del espacio, el estado detrás de la tina, el tipo de azulejo, el vidrio, la impermeabilización, los accesorios y si la plomería se queda cerca de su ubicación actual. En ${name}, muchas casas tienen baños con medidas parecidas, pero dos proyectos pueden terminar muy distintos si hay daño escondido, piso desnivelado o cambios de drenaje. La forma correcta de presupuestarlo es revisar fotos, medir el baño y separar claramente demolición, preparación, materiales, vidrio y terminaciones. Broke & Fixed puede darte una orientación inicial, pero el estimado final debe salir de una revisión real del espacio.`,
        },
        {
          question: `¿Cuánto tiempo toma el proyecto en ${name}?`,
          answer: `El tiempo depende del alcance aprobado, la condición del baño, la disponibilidad de materiales, el patrón del azulejo, el vidrio y cualquier ajuste de plomería. Una conversión en el mismo espacio suele ser más sencilla que una remodelación completa, pero todavía requiere protección, demolición, remoción de la tina, preparación, impermeabilización, azulejo, lechada, accesorios, limpieza y revisión final. Si aparece humedad escondida, si el drenaje se mueve o si el vidrio se fabrica a la medida, el calendario cambia. Antes de comenzar, el plan debe explicar qué área estará fuera de servicio, cómo se coordina el trabajo y quién confirma cada cambio.`,
        },
        {
          question: `¿Pueden reemplazar solo la tina en mi baño de ${name}?`,
          answer: `Sí. Muchas conversiones se concentran en el área de la tina y dejan la vanidad, el inodoro y el resto del cuarto en su lugar. Eso funciona cuando el piso, las paredes fuera de la ducha y los accesorios existentes todavía están en buenas condiciones. La revisión debe confirmar que el espacio permite una entrada cómoda, buen drenaje, almacenamiento útil y una solución de vidrio que no estorbe el uso diario. También conviene hablar de nichos, asiento, barras, iluminación y tipo de azulejo antes de abrir paredes. Si el resto del baño también necesita atención, puedes comparar una conversión enfocada con una remodelación más amplia.`,
        },
      ]
    : [
        {
          question: `How much does a tub-to-shower conversion cost in ${name}?`,
          answer: `Cost depends on the shower size, the condition behind the existing tub, tile selection, glass, waterproofing, fixtures, and whether the plumbing stays close to its current location. In ${name}, many homes have similar bathroom footprints, but two projects can price very differently when there is hidden moisture damage, an uneven floor, or drain work. The right way to budget is to review photos, measure the bathroom, and separate demolition, prep, materials, glass, and finish details. Broke & Fixed can give an early planning direction, but the final estimate should come from a real review of the space and written scope.`,
        },
        {
          question: `How long does the project take in ${name}?`,
          answer: `Timing depends on the approved scope, bathroom condition, material readiness, tile pattern, glass plan, and any plumbing adjustment. A same-footprint conversion is usually simpler than a full bathroom remodel, but it still needs protection, demolition, tub removal, prep, waterproofing, tile, grout, fixtures, cleanup, and final review. Hidden damage, drain movement, custom glass, or delayed materials can change the schedule. Before work starts, the plan should explain which area will be out of service, how the work will be staged, where debris goes, who confirms changes, and who the homeowner talks to if a field condition changes.`,
        },
        {
          question: `Can you replace only the tub area in my ${name} bathroom?`,
          answer: `Yes. Many conversions focus on the tub area and leave the vanity, toilet, and rest of the room in place. That works when the bathroom floor, walls outside the wet area, and existing fixtures are still in good condition. The review should confirm that the space allows a comfortable entry, proper drainage, useful storage, and a glass solution that does not fight daily use. It is also worth discussing niches, seating, grab bars, lighting, and tile type before opening walls. If the rest of the bathroom also needs attention, you can compare a focused conversion with a larger remodel instead of guessing which path makes more sense.`,
        },
      ]

  const breadcrumbs = [
    { name: isEs ? 'Inicio' : 'Home', href: `/${locale}` },
    { name: isEs ? 'Conversión de tina a ducha' : 'Tub-to-shower conversion', href: landingPath },
    { name, href: `/${locale}${LANDING_PATH}/${slug}` },
  ]

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: isEs ? `Conversión de tina a ducha en ${name}` : `Tub-to-shower conversion in ${name}`,
    serviceType: 'Tub-to-shower conversion',
    description: isEs ? profileAngle : profileAngle,
    areaServed: { '@type': 'Place', name: `${name}, Florida` },
    provider: {
      '@type': 'HomeAndConstructionBusiness',
      name: 'Broke & Fixed Home Solutions',
      telephone: '+1-786-363-7039',
      url: BASE_URL,
    },
    url: path,
  }
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  }
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${BASE_URL}${item.href}`,
    })),
  }

  return (
    <main className="t2s-location min-h-screen bg-cream text-espresso">
      <JsonLd data={serviceSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbSchema} />

      <section className="bg-espresso text-white">
        <div className="mx-auto max-w-6xl px-4 pb-16 pt-6 md:pb-24">
          <Breadcrumbs items={breadcrumbs} />
          <div className="grid items-center gap-10 pt-10 lg:grid-cols-[1.05fr_0.95fr] lg:pt-16">
            <div>
              <p className="font-accent text-sm font-semibold uppercase tracking-[0.18em] text-sage-muted">
                {isEs ? `Servicio en ${name}, FL` : `${name}, FL service area`}
              </p>
              <h1 className="mt-4 max-w-3xl font-display text-5xl font-bold leading-[0.98] md:text-7xl">
                {isEs ? `Conversión de tina a ducha en ${name}` : `Tub-to-shower conversion in ${name}`}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/75 md:text-xl">
                {profileAngle}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href={landingPath} className="inline-flex items-center justify-center gap-2 rounded-lg bg-trade-orange px-7 py-4 font-display text-lg font-bold text-espresso transition hover:brightness-110">
                  {isEs ? 'Ver mi rango de precio' : 'See my price range'}
                  <ArrowRight size={20} weight="bold" />
                </Link>
                <a href="tel:7863637039" className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-white/25 px-7 py-4 font-display text-lg font-bold text-white transition hover:bg-white/10">
                  <Phone size={20} weight="bold" />
                  (786) 363-7039
                </a>
              </div>
              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/70">
                <span className="inline-flex items-center gap-2"><ShieldCheck size={18} weight="bold" className="text-sage-muted" /> {isEs ? 'Totalmente asegurada' : 'Fully insured'}</span>
                <span className="inline-flex items-center gap-2"><CheckCircle size={18} weight="bold" className="text-sage-muted" /> {isEs ? 'Empresa familiar' : 'Family owned'}</span>
                <span className="inline-flex items-center gap-2"><Star size={18} weight="bold" className="text-sage-muted" /> {isEs ? 'Sin presión' : 'No-pressure estimate'}</span>
              </div>
            </div>
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-2xl">
              <Image
                src="/landing/tub-to-shower/compare-rebuild.png"
                alt={isEs ? `Ejemplo de diseño de conversión de tina a ducha para propietarios de ${name}` : `Tub-to-shower conversion design example for ${name} homeowners`}
                width={1200}
                height={670}
                className="h-auto w-full"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-warm-gray-lighter/50 bg-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-3">
          <div>
            <p className="font-accent text-xs font-semibold uppercase tracking-[0.16em] text-sage">{isEs ? 'Zona' : 'Area'}</p>
            <p className="mt-2 font-display text-2xl font-bold">{name}, Florida</p>
            <p className="mt-1 text-sm text-warm-gray">ZIP {location.zip}</p>
          </div>
          <div>
            <p className="font-accent text-xs font-semibold uppercase tracking-[0.16em] text-sage">{isEs ? 'Hogares' : 'Homes'}</p>
            <p className="mt-2 text-base leading-relaxed text-warm-gray">{homeTypes}</p>
          </div>
          <div>
            <p className="font-accent text-xs font-semibold uppercase tracking-[0.16em] text-sage">{isEs ? 'Cerca de' : 'Nearby'}</p>
            <p className="mt-2 text-base leading-relaxed text-warm-gray">{nearby}</p>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
          <div className="max-w-3xl">
            <h2 className="font-display text-4xl font-bold leading-tight md:text-5xl">
              {isEs ? 'Ideas para una ducha mejor pensada' : 'Ideas for a better-planned shower'}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-warm-gray">
              {isEs
                ? 'Mira ejemplos de acabados, vidrio y almacenamiento que pueden adaptarse al espacio actual de tu baño.'
                : 'See examples of finishes, glass, and storage that can be adapted to the bathroom space you already have.'}
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <figure className="overflow-hidden rounded-2xl border border-warm-gray-lighter/60 bg-cream shadow-sm">
              <Image
                src="/images/tub-to-shower-kendall-concept.png"
                alt={
                  isEs
                    ? `Idea de ducha con vidrio y azulejo para una conversión de tina a ducha en ${name}`
                    : `Glass and tile shower idea for a tub-to-shower conversion in ${name}`
                }
                width={1536}
                height={1024}
                className="h-full min-h-[260px] w-full object-cover"
                sizes="(min-width: 1024px) 55vw, 100vw"
              />
            </figure>

            <div className="grid grid-cols-2 gap-4">
              <figure className="overflow-hidden rounded-2xl border border-warm-gray-lighter/60 bg-cream shadow-sm">
                <Image
                  src="/images/tub-to-shower-conversion-1.jpg"
                  alt={
                    isEs
                      ? `Foto de ducha terminada con azulejo, nicho y barras en un proyecto de ${name}`
                      : `Finished tiled shower with niche and grab bars from a ${name} project`
                  }
                  width={1536}
                  height={2048}
                  className="h-full min-h-[260px] w-full object-cover"
                  sizes="(min-width: 1024px) 22vw, 50vw"
                />
              </figure>
              <figure className="overflow-hidden rounded-2xl border border-warm-gray-lighter/60 bg-cream shadow-sm">
                <Image
                  src="/images/Killian-tub-to-shower-results.jpeg"
                  alt={
                    isEs
                      ? `Resultado de conversión de tina a ducha con vidrio claro en ${name}`
                      : `Completed tub-to-shower conversion with clear glass in ${name}`
                  }
                  width={1200}
                  height={1600}
                  className="h-full min-h-[260px] w-full object-cover"
                  sizes="(min-width: 1024px) 22vw, 50vw"
                />
              </figure>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-cream">
        <div className="mx-auto max-w-4xl px-4 py-16 md:py-24">
          <p className="font-accent text-sm font-semibold uppercase tracking-[0.16em] text-sage">{isEs ? `Para propietarios de ${name}` : `For ${name} homeowners`}</p>
          <h2 className="mt-3 font-display text-4xl font-bold leading-tight md:text-5xl">
            {isEs ? 'Una ducha que funciona mejor en tu baño actual' : 'A shower that works better in your current bathroom'}
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-warm-gray">{locationDescription}</p>
          <p className="mt-4 text-lg leading-relaxed text-warm-gray">{profileDetail}</p>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {[
              [isEs ? 'Mismo espacio' : 'Same footprint', isEs ? 'Conserva la distribución de la tina cuando eso tenga sentido para el presupuesto y el uso diario.' : 'Keep the tub footprint when that makes sense for the budget and the way you use the room.'],
              [isEs ? 'Impermeabilización real' : 'Real waterproofing', isEs ? 'Preparamos la base, paredes, nichos y esquinas antes de instalar el acabado final.' : 'We prepare the pan, walls, niches, and corners before the finished surface goes in.'],
              [isEs ? 'Vidrio y almacenamiento' : 'Glass and storage', isEs ? 'Escoge panel, puerta, nicho y accesorios que dejen el cuarto cómodo y fácil de limpiar.' : 'Choose the panel, door, niche, and fixtures that keep the room comfortable and easy to clean.'],
              [isEs ? 'Entrada más cómoda' : 'More comfortable entry', isEs ? 'Un borde bajo, asiento, barras y rociador de mano pueden integrarse al diseño.' : 'A low curb, seat, grab bars, and handheld shower can be built into the design.'],
            ].map(([title, copy]) => (
              <div key={title} className="rounded-xl border border-warm-gray-lighter/60 bg-white p-6 shadow-sm">
                <h3 className="font-display text-2xl font-bold">{title}</h3>
                <p className="mt-3 leading-relaxed text-warm-gray">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-espresso text-white">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
          <h2 className="font-display text-4xl font-bold md:text-5xl">{isEs ? 'Cómo funciona la conversión' : 'How the conversion works'}</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-4">
            {[
              [isEs ? '1. Medimos' : '1. Measure', isEs ? 'Revisamos el nicho, entrada, desagüe, paredes y lo que quieres mejorar.' : 'We review the alcove, entry, drain, walls, and what you want to improve.'],
              [isEs ? '2. Protegemos' : '2. Protect', isEs ? 'Preparamos el camino de entrada y definimos donde van materiales y escombros.' : 'We protect the path into the home and plan material and debris staging.'],
              [isEs ? '3. Construimos' : '3. Build', isEs ? 'Removemos la tina, impermeabilizamos, instalamos azulejo y terminamos los accesorios.' : 'We remove the tub, waterproof, install tile, and finish the fixtures.'],
              [isEs ? '4. Terminamos' : '4. Finish', isEs ? 'Medimos e instalamos el vidrio, limpiamos y revisamos el resultado contigo.' : 'We measure and install the glass, clean up, and review the result with you.'],
            ].map(([title, copy]) => (
              <div key={title} className="rounded-xl bg-espresso-light p-6">
                <h3 className="font-display text-2xl font-bold text-white">{title}</h3>
                <p className="mt-3 leading-relaxed text-white/70">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-4 py-16 md:py-24">
          <h2 className="font-display text-4xl font-bold">{isEs ? 'Preguntas sobre tu proyecto' : 'Questions about your project'}</h2>
          <div className="mt-8 space-y-3">
            {faqs.map((faq) => (
              <details key={faq.question} className="group rounded-xl border border-warm-gray-lighter/60 bg-cream p-5">
                <summary className="cursor-pointer list-none pr-8 font-display text-xl font-bold marker:hidden group-open:text-sage">{faq.question}</summary>
                <p className="mt-4 leading-relaxed text-warm-gray">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-trade-orange text-espresso">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center md:py-20">
          <h2 className="font-display text-4xl font-bold md:text-5xl">{isEs ? `¿Listo para hablar de tu baño en ${name}?` : `Ready to talk about your ${name} bathroom?`}</h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed">{isEs ? 'Mira tu rango de precio y luego cuéntanos que quieres cambiar. Sin presión y sin obligación.' : 'See your price range, then tell us what you want to change. No pressure and no obligation.'}</p>
          <Link href={landingPath} className="mt-8 inline-flex items-center justify-center gap-2 rounded-lg bg-espresso px-8 py-4 font-display text-xl font-bold text-white transition hover:bg-navy">
            {isEs ? 'Pedir mi rango de precio' : 'Get my price range'}
            <ArrowRight size={22} weight="bold" />
          </Link>
        </div>
      </section>
    </main>
  )
}
