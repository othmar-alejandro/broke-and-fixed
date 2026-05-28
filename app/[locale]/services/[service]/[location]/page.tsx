import { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { services } from "@/lib/data/services"
import { locations } from "@/lib/data/locations"
import { serviceImages } from "@/lib/data/images"
import { getContent } from "@/lib/data/content-index"
import JsonLd from "@/components/seo/JsonLd"
import Breadcrumbs from "@/components/seo/Breadcrumbs"
import Hb803Banner from "@/components/Hb803Banner"
import {
  CheckCircle,
  Phone,
  ShieldCheck,
  Clock,
  MapPin,
  Star,
  Users,
} from "@phosphor-icons/react/dist/ssr"

interface PageParams {
  locale: string
  service: string
  location: string
}

function findService(slug: string, locale: string) {
  return services.find((s) =>
    locale === "es" ? s.slugEs === slug : s.slug === slug
  )
}

function findLocation(slug: string) {
  return locations.find((l) => l.slug === slug)
}

/** Map service slug to the image key used in serviceImages */
function getImageKey(serviceSlug: string): string {
  const map: Record<string, string> = {
    "bathroom-remodeling": "bathroom",
    "kitchen-remodeling": "kitchen",
    "interior-painting": "interior-painting",
    "exterior-painting": "exterior-painting",
    "tile-work": "tile-work",
    "exterior-repairs": "exterior-repairs",
    "cabinet-refinishing": "cabinet-refinishing",
  }
  return map[serviceSlug] || serviceSlug
}

/** Service-specific included items */
function getIncludedItems(serviceSlug: string, isEs: boolean): string[] {
  const items: Record<string, { en: string[]; es: string[] }> = {
    "bathroom-remodeling": {
      en: [
        "Walk-in shower conversions",
        "Custom tile work",
        "Vanity and cabinet installs",
        "Plumbing fixture upgrades",
        "Full gut remodels",
        "ADA-accessible modifications",
      ],
      es: [
        "Conversiones de ducha sin borde",
        "Trabajo de azulejos personalizados",
        "Instalacion de vanidades y gabinetes",
        "Mejora de griferia y plomeria",
        "Remodelaciones completas",
        "Modificaciones accesibles ADA",
      ],
    },
    "kitchen-remodeling": {
      en: [
        "Cabinet replacement and refacing",
        "Countertop fabrication and install",
        "Backsplash tile work",
        "Layout reconfiguration",
        "Appliance fitting",
        "Under-cabinet lighting",
      ],
      es: [
        "Reemplazo y renovacion de gabinetes",
        "Fabricacion e instalacion de encimeras",
        "Trabajo de azulejo para salpicadero",
        "Reconfiguracion de distribucion",
        "Ajuste de electrodomesticos",
        "Iluminacion debajo de gabinetes",
      ],
    },
    "interior-painting": {
      en: [
        "Wall and ceiling painting",
        "Surface prep and patching",
        "Trim and baseboard painting",
        "Accent walls",
        "Cabinet painting",
        "Color consultation included",
      ],
      es: [
        "Pintura de paredes y techos",
        "Preparacion de superficies y parches",
        "Pintura de molduras y zocalos",
        "Paredes de acento",
        "Pintura de gabinetes",
        "Consulta de colores incluida",
      ],
    },
    "exterior-painting": {
      en: [
        "Pressure washing before paint",
        "Scraping and priming",
        "Stucco and trim painting",
        "Fascia and soffit coating",
        "Garage door refinishing",
        "Weather-resistant coatings",
      ],
      es: [
        "Lavado a presion antes de pintar",
        "Raspado e imprimacion",
        "Pintura de estuco y molduras",
        "Recubrimiento de fascia y sofitos",
        "Acabado de puerta de garaje",
        "Recubrimientos resistentes al clima",
      ],
    },
    "tile-work": {
      en: [
        "Floor tile installation",
        "Shower tile and waterproofing",
        "Backsplash installation",
        "Large format tile setting",
        "Grout and sealant work",
        "Tile removal and disposal",
      ],
      es: [
        "Instalacion de azulejos de piso",
        "Azulejo de ducha e impermeabilizacion",
        "Instalacion de salpicaderos",
        "Colocacion de azulejos de gran formato",
        "Trabajo de lechada y sellador",
        "Remocion y desecho de azulejos",
      ],
    },
    "exterior-repairs": {
      en: [
        "Stucco crack repair",
        "Fascia and soffit replacement",
        "Water intrusion fixes",
        "Driveway sealing and coating",
        "Fence and gate repairs",
        "Storm damage restoration",
      ],
      es: [
        "Reparacion de grietas en estuco",
        "Reemplazo de fascia y sofitos",
        "Reparacion de intrusiones de agua",
        "Sellado y recubrimiento de entrada",
        "Reparacion de cercas y portones",
        "Restauracion por danos de tormenta",
      ],
    },
    "cabinet-refinishing": {
      en: [
        "Per-door pricing, $100 to $150 per door",
        "Strip, sand, and prime existing finish",
        "Spray lacquer or stain in our shop",
        "New hinges and pulls installed",
        "Soft-close conversion available",
        "5 to 10 day project timeline",
      ],
      es: [
        "Precio por puerta, $100 a $150 por puerta",
        "Quitar, lijar, y aplicar primer al acabado existente",
        "Aplicar laca o tinte en nuestro taller",
        "Bisagras y tiradores nuevos instalados",
        "Conversion a cierre suave disponible",
        "Cronograma de proyecto de 5 a 10 dias",
      ],
    },
  }

  const serviceItems = items[serviceSlug]
  if (!serviceItems) return []
  return isEs ? serviceItems.es : serviceItems.en
}

export function generateStaticParams() {
  const params: { locale: string; service: string; location: string }[] = []
  for (const service of services) {
    for (const location of locations) {
      params.push({
        locale: "en",
        service: service.slug,
        location: location.slug,
      })
      params.push({
        locale: "es",
        service: service.slugEs,
        location: location.slug,
      })
    }
  }
  return params
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>
}): Promise<Metadata> {
  const { locale, service: serviceSlug, location: locationSlug } = await params
  const service = findService(serviceSlug, locale)
  const location = findLocation(locationSlug)
  if (!service || !location) return {}

  const name = locale === "es" ? service.nameEs : service.name
  const desc = locale === "es" ? service.descriptionEs : service.description
  const url = `https://brokeandfixed.com/${locale}/services/${serviceSlug}/${locationSlug}`

  return {
    title: `${name} in ${location.name}, ${location.state} | Broke & Fixed`,
    description: getContent(serviceSlug.replace(/remodelacion-de-banos|remodelacion-de-cocinas|pintura-interior|pintura-exterior|instalacion-de-pisos|reparaciones-exteriores/g, (m) => { const map: Record<string, string> = {'remodelacion-de-banos':'bathroom-remodeling','remodelacion-de-cocinas':'kitchen-remodeling','pintura-interior':'interior-painting','pintura-exterior':'exterior-painting','instalacion-de-pisos':'tile-work','reparaciones-exteriores':'exterior-repairs'}; return map[m] || m }), locationSlug)?.metaDescription || `${name} in ${location.name}, ${location.state}. ${desc} Call 786-363-7039 for a free estimate.`,
    alternates: {
      canonical: url,
      languages: {
        en: `/en/services/${service.slug}/${location.slug}`,
        es: `/es/services/${service.slugEs}/${location.slug}`,
        "x-default": `/en/services/${service.slug}/${location.slug}`,
      },
    },
    openGraph: {
      title: `${name} in ${location.name}, ${location.state}`,
      description: desc,
      url,
      siteName: "Broke & Fixed Home Solutions",
      locale: locale === "es" ? "es_US" : "en_US",
      type: "website",
    },
  }
}

export default async function ServiceLocationPage({
  params,
}: {
  params: Promise<PageParams>
}) {
  const { locale, service: serviceSlug, location: locationSlug } = await params
  const service = findService(serviceSlug, locale)
  const location = findLocation(locationSlug)

  if (!service || !location) notFound()

  const isEs = locale === "es"
  const serviceName = isEs ? service.nameEs : service.name
  const serviceDesc = isEs ? service.descriptionEs : service.description
  const locationDesc = isEs ? location.descriptionEs : location.description
  const serviceSlugForLinks = isEs ? service.slugEs : service.slug

  const imageKey = getImageKey(service.slug)
  const images = serviceImages[imageKey]
  const includedItems = getIncludedItems(service.slug, isEs)
  const content = getContent(service.slug, location.slug)

  const nearbyLocations = location.nearbyLocations
    .map((slug) => locations.find((l) => l.slug === slug))
    .filter(Boolean)

  const otherServices = services.filter((s) => s.slug !== service.slug)

  const faqItems = isEs
    ? [
        {
          q: `Cuanto cuesta ${serviceName.toLowerCase()} en ${location.name}?`,
          a: `El rango tipico para ${serviceName.toLowerCase()} en ${location.name} es ${service.priceRange}. El costo final depende del alcance del trabajo, los materiales, y el estado actual de tu hogar. Llama al 786-363-7039 para un estimado gratis.`,
        },
        {
          q: `Cuanto tiempo toma ${serviceName.toLowerCase()} en ${location.name}?`,
          a: `La mayoria de los proyectos de ${serviceName.toLowerCase()} toman ${service.timeline}. Te damos un cronograma claro antes de empezar para que sepas que esperar.`,
        },
        {
          q: `Ofrecen estimados gratis para ${serviceName.toLowerCase()} en ${location.name}?`,
          a: `Si. Ofrecemos estimados gratis sin compromiso para todos los proyectos de ${serviceName.toLowerCase()} en ${location.name} y todo Miami-Dade. Llama al 786-363-7039.`,
        },
        {
          q: `Usan subcontratistas para los trabajos?`,
          a: `No. Todo el trabajo lo hace nuestro equipo directo. No usamos subcontratistas. Cuando nos contratas, somos nosotros los que nos presentamos a trabajar.`,
        },
      ]
    : [
        {
          q: `How much does ${serviceName.toLowerCase()} cost in ${location.name}?`,
          a: `The typical range for ${serviceName.toLowerCase()} in ${location.name} is ${service.priceRange}. Final cost depends on scope of work, materials, and the current condition of your home. Call 786-363-7039 for a free estimate.`,
        },
        {
          q: `How long does ${serviceName.toLowerCase()} take in ${location.name}?`,
          a: `Most ${serviceName.toLowerCase()} projects take ${service.timeline}. We give you a clear timeline before starting so you know what to expect.`,
        },
        {
          q: `Do you offer free estimates for ${serviceName.toLowerCase()} in ${location.name}?`,
          a: `Yes. We offer free, no-pressure estimates for all ${serviceName.toLowerCase()} projects in ${location.name} and across Miami-Dade. Call 786-363-7039.`,
        },
        {
          q: `Do you use subcontractors?`,
          a: `No. Every job is done by our own crew. We do not use subcontractors. When you hire us, we are the ones who show up.`,
        },
      ]

  const jsonLdData = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: serviceName,
      description: serviceDesc,
      provider: {
        "@type": "LocalBusiness",
        name: "Broke & Fixed Home Solutions",
        telephone: "786-363-7039",
        address: {
          "@type": "PostalAddress",
          addressLocality: location.name,
          addressRegion: location.state,
          postalCode: location.zip,
          addressCountry: "US",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: location.lat,
          longitude: location.lng,
        },
      },
      areaServed: {
        "@type": "City",
        name: location.name,
        containedInPlace: {
          "@type": "AdministrativeArea",
          name: "Miami-Dade County, FL",
        },
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: "Broke & Fixed Home Solutions",
      telephone: "786-363-7039",
      address: {
        "@type": "PostalAddress",
        addressLocality: location.name,
        addressRegion: location.state,
        postalCode: location.zip,
        addressCountry: "US",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: location.lat,
        longitude: location.lng,
      },
      priceRange: service.priceRange,
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.a,
        },
      })),
    },
  ]

  const breadcrumbs = [
    { name: isEs ? "Inicio" : "Home", href: `/${locale}` },
    {
      name: isEs ? "Servicios" : "Services",
      href: `/${locale}/services/${serviceSlugForLinks}`,
    },
    {
      name: serviceName,
      href: `/${locale}/services/${serviceSlugForLinks}`,
    },
    {
      name: location.name,
      href: `/${locale}/services/${serviceSlugForLinks}/${location.slug}`,
    },
  ]

  return (
    <main className="min-h-screen bg-cream">
      <JsonLd data={jsonLdData} />

      {/* ─── HERO SECTION ─── */}
      <section className="relative w-full h-[520px] md:h-[600px] overflow-hidden">
        {images?.hero && (
          <Image
            src={images.hero}
            alt={images.heroAlt || `${serviceName} in ${location.name}`}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        )}
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-espresso/90 via-espresso/50 to-espresso/20" />

        <div className="absolute inset-0 flex flex-col justify-end">
          <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 pb-12 md:pb-16">
            <Breadcrumbs items={breadcrumbs} />
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white uppercase tracking-tight leading-tight mt-2">
              {serviceName} {isEs ? "en" : "in"} {location.name},{" "}
              {location.state}
            </h1>
            <p className="text-white/80 text-lg md:text-xl mt-3 max-w-2xl font-sans">
              {isEs
                ? `Trabajo de calidad hecho por nuestro equipo. Sin subcontratistas. Estimados gratis en ${location.name}.`
                : `Quality work done by our crew. Zero subcontractors. Free estimates across ${location.name}.`}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <a
                href="#quote"
                className="inline-flex items-center justify-center bg-sage-muted hover:bg-sage-muted/90 text-white font-display text-base md:text-lg font-bold uppercase tracking-wide py-3.5 px-8 rounded-lg transition-colors"
              >
                {isEs ? "Estimado Gratis" : "Get a Free Estimate"}
              </a>
              <a
                href="tel:7863637039"
                className="inline-flex items-center justify-center gap-2 border-2 border-white text-white font-display text-base md:text-lg font-bold uppercase tracking-wide py-3.5 px-8 rounded-lg hover:bg-white/10 transition-colors"
              >
                <Phone size={20} weight="bold" />
                786-363-7039
              </a>
            </div>
          </div>

          {/* Trust bar */}
          <div className="w-full bg-espresso/80 backdrop-blur-sm border-t border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1 text-white/70 text-xs sm:text-sm font-sans uppercase tracking-wider">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck size={16} weight="bold" className="text-sage-muted" />
                  {isEs ? "Completamente Asegurados" : "Fully Insured"}
                </span>
                <span className="hidden sm:inline text-white/30">|</span>
                <span className="flex items-center gap-1.5">
                  <Users size={16} weight="bold" className="text-sage-muted" />
                  {isEs ? "Cero Subcontratistas" : "Zero Subcontractors"}
                </span>
                <span className="hidden sm:inline text-white/30">|</span>
                <span className="flex items-center gap-1.5">
                  <Star size={16} weight="bold" className="text-sage-muted" />
                  {isEs ? "Estimados Gratis" : "Free Estimates"}
                </span>
                <span className="hidden sm:inline text-white/30">|</span>
                <span className="flex items-center gap-1.5">
                  <Clock size={16} weight="bold" className="text-sage-muted" />
                  {isEs ? "Desde 2023" : "Since 2023"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── HB 803 BANNER ─── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <Hb803Banner locale={locale as "en" | "es"} className="my-8 md:my-12" />
      </div>

      {/* ─── QUICK FACTS BAR ─── */}
      <section className="bg-white border-b border-cream-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <dl className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-8">
            <div className="border-l-4 border-sage-muted pl-4">
              <dt className="text-[11px] uppercase tracking-widest text-warm-gray font-sans font-medium">
                {isEs ? "Servicio" : "Service"}
              </dt>
              <dd className="font-display text-lg font-bold text-espresso mt-1">
                {serviceName}
              </dd>
            </div>
            <div className="border-l-4 border-sage-muted pl-4">
              <dt className="text-[11px] uppercase tracking-widest text-warm-gray font-sans font-medium">
                {isEs ? "Ubicacion" : "Location"}
              </dt>
              <dd className="font-display text-lg font-bold text-espresso mt-1">
                <span className="flex items-center gap-1.5">
                  <MapPin size={16} className="text-sage shrink-0" weight="bold" />
                  {location.name}, {location.state}
                </span>
              </dd>
            </div>
            <div className="border-l-4 border-sage-muted pl-4">
              <dt className="text-[11px] uppercase tracking-widest text-warm-gray font-sans font-medium">
                {isEs ? "Rango de Precio" : "Price Range"}
              </dt>
              <dd className="font-display text-lg font-bold text-espresso mt-1">
                {service.priceRange}
              </dd>
            </div>
            <div className="border-l-4 border-sage-muted pl-4">
              <dt className="text-[11px] uppercase tracking-widest text-warm-gray font-sans font-medium">
                {isEs ? "Tiempo Estimado" : "Timeline"}
              </dt>
              <dd className="font-display text-lg font-bold text-espresso mt-1">
                <span className="flex items-center gap-1.5">
                  <Clock size={16} className="text-sage shrink-0" weight="bold" />
                  {service.timeline}
                </span>
              </dd>
            </div>
            <div className="border-l-4 border-sage-muted pl-4">
              <dt className="text-[11px] uppercase tracking-widest text-warm-gray font-sans font-medium">
                {isEs ? "Telefono" : "Phone"}
              </dt>
              <dd className="font-display text-lg font-bold text-espresso mt-1">
                <a
                  href="tel:7863637039"
                  className="flex items-center gap-1.5 hover:text-sage transition-colors"
                >
                  <Phone size={16} className="text-sage-muted shrink-0" weight="bold" />
                  786-363-7039
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </section>

      {/* ─── ABOUT THIS SERVICE ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-20">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div>
            <span className="text-sage-muted font-display text-sm uppercase tracking-widest font-bold">
              {isEs ? "Sobre Este Servicio" : "About This Service"}
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-espresso mt-2 uppercase tracking-tight">
              {isEs
                ? `${serviceName} para propietarios en ${location.name}`
                : `${serviceName} for homeowners in ${location.name}`}
            </h2>
            {content ? (
              <>
                <div className="text-warm-gray text-base md:text-lg leading-relaxed mt-5 font-sans space-y-4">
                  {content.intro.split('\n').filter(Boolean).map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
                {content.localContext && (
                  <p className="text-warm-gray text-base md:text-lg leading-relaxed mt-4 font-sans">
                    {content.localContext}
                  </p>
                )}
                {content.pricingContext && (
                  <p className="text-espresso font-semibold text-base md:text-lg leading-relaxed mt-4 font-sans">
                    {content.pricingContext}
                  </p>
                )}
              </>
            ) : (
              <>
                <p className="text-warm-gray text-base md:text-lg leading-relaxed mt-5 font-sans">
                  {serviceDesc}
                </p>
                <p className="text-warm-gray text-base md:text-lg leading-relaxed mt-4 font-sans">
                  {locationDesc}
                </p>
              </>
            )}
          </div>
          <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-xl">
            {images?.gallery?.[0] && (
              <Image
                src={images.gallery[0]}
                alt={`${serviceName} project in ${location.name}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            )}
            {/* Orange accent bar */}
            <div className="absolute left-0 top-6 bottom-6 w-1.5 bg-sage-muted rounded-r" />
          </div>
        </div>
      </section>

      {/* ─── WHAT'S INCLUDED ─── */}
      {includedItems.length > 0 && (
        <section className="bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-20">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-sage-muted font-display text-sm uppercase tracking-widest font-bold">
                {isEs ? "Que Incluye" : "What's Included"}
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-espresso mt-2 uppercase tracking-tight">
                {isEs
                  ? `Lo que incluye nuestro servicio de ${serviceName.toLowerCase()}`
                  : `What our ${serviceName.toLowerCase()} service covers`}
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              {(content?.whatsIncluded || includedItems).map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 bg-cream rounded-xl p-5 border border-cream-dark"
                >
                  <CheckCircle
                    size={24}
                    weight="fill"
                    className="text-sage-muted shrink-0 mt-0.5"
                  />
                  <span className="text-espresso font-sans font-medium text-base">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── GALLERY ─── */}
      {images?.gallery && images.gallery.length >= 2 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-20">
          <div className="text-center mb-10">
            <span className="text-sage-muted font-display text-sm uppercase tracking-widest font-bold">
              {isEs ? "Nuestro Trabajo" : "Our Work"}
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-espresso mt-2 uppercase tracking-tight">
              {isEs ? "Trabajo real de nuestro equipo" : "Real work by our crew"}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {images.gallery.slice(0, 3).map((src, i) => (
              <div
                key={i}
                className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg group"
              >
                <Image
                  src={src}
                  alt={`${serviceName} project photo ${i + 1}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ─── REQUEST A QUOTE FORM ─── */}
      <section id="quote" className="bg-espresso scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-20">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16">
            {/* Left: Info */}
            <div className="flex flex-col justify-center">
              <span className="text-sage-muted font-display text-sm uppercase tracking-widest font-bold">
                {isEs ? "Estimado Gratis" : "Free Estimate"}
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white mt-2 uppercase tracking-tight">
                {isEs
                  ? `Pide tu estimado gratis para ${serviceName.toLowerCase()} en ${location.name}`
                  : `Get a free estimate for ${serviceName.toLowerCase()} in ${location.name}`}
              </h2>
              <p className="text-warm-gray-light text-base md:text-lg mt-4 font-sans leading-relaxed">
                {isEs
                  ? `Cuentanos sobre tu proyecto y te contactamos el mismo dia. Sin compromiso, sin presion.`
                  : `Tell us about your project and we will get back to you the same day. No obligation, no pressure.`}
              </p>

              {/* Trust signals */}
              <div className="mt-8 space-y-3">
                <div className="flex items-center gap-3 text-white/80">
                  <ShieldCheck size={20} weight="bold" className="text-sage-muted shrink-0" />
                  <span className="font-sans text-sm">
                    {isEs ? "Completamente asegurados" : "Fully insured"}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-white/80">
                  <Users size={20} weight="bold" className="text-sage-muted shrink-0" />
                  <span className="font-sans text-sm">
                    {isEs
                      ? "Nuestro propio equipo hace todo el trabajo"
                      : "Our own crew does all the work"}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-white/80">
                  <Clock size={20} weight="bold" className="text-sage-muted shrink-0" />
                  <span className="font-sans text-sm">
                    {isEs
                      ? "Respondemos el mismo dia"
                      : "We respond the same day"}
                  </span>
                </div>
              </div>

              {/* Phone */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <p className="text-warm-gray-light text-sm font-sans">
                  {isEs ? "Prefiere llamar?" : "Prefer to call?"}
                </p>
                <a
                  href="tel:7863637039"
                  className="inline-flex items-center gap-2 text-white font-display text-2xl font-bold mt-1 hover:text-sage-muted transition-colors"
                >
                  <Phone size={24} weight="bold" className="text-sage-muted" />
                  786-363-7039
                </a>
              </div>
            </div>

            {/* Right: Form */}
            <div className="bg-espresso-light rounded-xl p-6 md:p-8 border border-white/5">
              <form
                action="https://services.leadconnectorhq.com/hooks/WEBHOOK_ID"
                method="POST"
                className="space-y-5"
              >
                {/* Hidden fields */}
                <input type="hidden" name="service" value={serviceName} />
                <input
                  type="hidden"
                  name="location"
                  value={`${location.name}, ${location.state}`}
                />
                <input type="hidden" name="source" value="service-location-page" />

                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-white/70 text-sm font-sans mb-1.5"
                  >
                    {isEs ? "Nombre completo" : "Full name"}{" "}
                    <span className="text-sage-muted">*</span>
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    required
                    className="w-full bg-espresso border border-white/10 rounded-lg px-4 py-3 text-white font-sans placeholder:text-warm-gray focus:outline-none focus:ring-2 focus:ring-sage-muted focus:border-transparent transition-colors"
                    placeholder={isEs ? "Tu nombre" : "Your name"}
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-white/70 text-sm font-sans mb-1.5"
                  >
                    {isEs ? "Telefono" : "Phone"}{" "}
                    <span className="text-sage-muted">*</span>
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    className="w-full bg-espresso border border-white/10 rounded-lg px-4 py-3 text-white font-sans placeholder:text-warm-gray focus:outline-none focus:ring-2 focus:ring-sage-muted focus:border-transparent transition-colors"
                    placeholder="(786) 000-0000"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-white/70 text-sm font-sans mb-1.5"
                  >
                    {isEs ? "Correo electronico" : "Email"}{" "}
                    <span className="text-warm-gray-light text-xs">
                      ({isEs ? "opcional" : "optional"})
                    </span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="w-full bg-espresso border border-white/10 rounded-lg px-4 py-3 text-white font-sans placeholder:text-warm-gray focus:outline-none focus:ring-2 focus:ring-sage-muted focus:border-transparent transition-colors"
                    placeholder={isEs ? "tu@email.com" : "you@email.com"}
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-white/70 text-sm font-sans mb-1.5"
                  >
                    {isEs ? "Cuentanos sobre tu proyecto" : "Tell us about your project"}{" "}
                    <span className="text-warm-gray-light text-xs">
                      ({isEs ? "opcional" : "optional"})
                    </span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    className="w-full bg-espresso border border-white/10 rounded-lg px-4 py-3 text-white font-sans placeholder:text-warm-gray focus:outline-none focus:ring-2 focus:ring-sage-muted focus:border-transparent transition-colors resize-none"
                    placeholder={
                      isEs
                        ? "Breve descripcion de lo que necesitas..."
                        : "Brief description of what you need..."
                    }
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-sage-muted hover:bg-sage-muted/90 text-white font-display text-lg font-bold uppercase tracking-wide py-4 rounded-lg transition-colors cursor-pointer"
                >
                  {isEs ? "Pedir Mi Estimado Gratis" : "Get My Free Estimate"}
                </button>

                <p className="text-center text-warm-gray-light text-xs font-sans">
                  {isEs
                    ? "Respondemos el mismo dia. Sin compromiso."
                    : "We respond the same day. No obligation."}
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FAQ SECTION ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-20">
        <div className="text-center mb-10">
          <span className="text-sage-muted font-display text-sm uppercase tracking-widest font-bold">
            FAQ
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-espresso mt-2 uppercase tracking-tight">
            {isEs ? "Preguntas frecuentes" : "Frequently asked questions"}
          </h2>
        </div>
        <div className="max-w-3xl mx-auto space-y-3">
          {faqItems.map((item) => (
            <details
              key={item.q}
              className="group bg-white rounded-xl border border-cream-dark overflow-hidden"
            >
              <summary className="flex items-center justify-between gap-4 px-6 py-5 cursor-pointer font-display text-lg font-bold text-espresso select-none list-none [&::-webkit-details-marker]:hidden">
                <span>{item.q}</span>
                <span className="shrink-0 text-sage-muted text-2xl font-light group-open:rotate-45 transition-transform duration-200">
                  +
                </span>
              </summary>
              <div className="px-6 pb-5 -mt-1">
                <p className="text-warm-gray font-sans leading-relaxed">
                  {item.a}
                </p>
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* ─── INTERNAL LINKS ─── */}
      <section className="bg-white border-t border-cream-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-20">
          {nearbyLocations.length > 0 && (
            <div className="mb-12">
              <h2 className="font-display text-2xl font-bold text-espresso uppercase tracking-tight">
                {isEs
                  ? `${serviceName} en zonas cercanas`
                  : `${serviceName} nearby`}
              </h2>
              <div className="flex flex-wrap gap-2.5 mt-5">
                {nearbyLocations.map(
                  (loc) =>
                    loc && (
                      <Link
                        key={loc.slug}
                        href={`/${locale}/services/${serviceSlugForLinks}/${loc.slug}`}
                        className="inline-block bg-cream rounded-full px-5 py-2.5 text-sm font-sans font-medium text-espresso border border-cream-dark hover:border-sage-muted hover:text-sage transition-all"
                      >
                        {loc.name}, {loc.state}
                      </Link>
                    )
                )}
              </div>
            </div>
          )}

          <div>
            <h2 className="font-display text-2xl font-bold text-espresso uppercase tracking-tight">
              {isEs
                ? `Otros servicios en ${location.name}`
                : `Other services in ${location.name}`}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-5">
              {otherServices.map((s) => {
                const slug = isEs ? s.slugEs : s.slug
                const sName = isEs ? s.nameEs : s.name
                return (
                  <Link
                    key={s.slug}
                    href={`/${locale}/services/${slug}/${location.slug}`}
                    className="flex items-center gap-3 bg-cream rounded-xl px-5 py-4 border border-cream-dark hover:border-sage-muted hover:shadow-md transition-all group"
                  >
                    <span className="w-1 h-8 bg-sage-muted rounded-full shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="font-display font-bold text-espresso text-base uppercase tracking-tight">
                      {sName}
                    </span>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className="bg-sage-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 md:py-16">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white uppercase tracking-tight">
                {isEs ? "Listo para empezar?" : "Ready to get started?"}
              </h2>
              <p className="text-white/80 font-sans mt-2 text-lg">
                {isEs
                  ? `Hablemos sobre tu proyecto de ${serviceName.toLowerCase()} en ${location.name}.`
                  : `Let's talk about your ${serviceName.toLowerCase()} project in ${location.name}.`}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <a
                href="tel:7863637039"
                className="inline-flex items-center justify-center gap-2 bg-white text-espresso font-display text-lg font-bold uppercase tracking-wide py-3.5 px-8 rounded-lg hover:bg-cream transition-colors"
              >
                <Phone size={20} weight="bold" />
                786-363-7039
              </a>
              <a
                href="#quote"
                className="inline-flex items-center justify-center bg-espresso text-white font-display text-lg font-bold uppercase tracking-wide py-3.5 px-8 rounded-lg hover:bg-espresso-light transition-colors"
              >
                {isEs ? "Pedir Estimado" : "Request a Quote"}
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
