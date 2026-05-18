import { Metadata } from "next"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import Breadcrumbs from "@/components/seo/Breadcrumbs"
import { getAllProjects, getProjectBySlug, getBeforeAfterPairs } from "@/lib/gallery"

interface PageParams {
  locale: string
  slug: string
}

export function generateStaticParams() {
  const projects = getAllProjects()
  const params: { locale: string; slug: string }[] = []
  for (const p of projects) {
    params.push({ locale: "en", slug: p.slug })
    params.push({ locale: "es", slug: p.slug })
  }
  return params
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>
}): Promise<Metadata> {
  const { locale, slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) return { title: "Not Found" }

  const title = locale === "es"
    ? `${project.name} | Galeria | Broke & Fixed`
    : `${project.name} | Gallery | Broke & Fixed`

  return {
    title,
    description: `${project.service} project in ${project.location || "Miami-Dade"}. ${project.photoCount} photos showing the full transformation.`,
  }
}

const phaseLabels: Record<string, { en: string; es: string }> = {
  before: { en: "Before", es: "Antes" },
  demo: { en: "Demolition", es: "Demolicion" },
  progress: { en: "In Progress", es: "En Progreso" },
  after: { en: "After", es: "Despues" },
  detail: { en: "Details", es: "Detalles" },
}

export default async function ProjectGalleryPage({
  params,
}: {
  params: Promise<PageParams>
}) {
  const { locale, slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) notFound()

  const isEs = locale === "es"
  const pairs = getBeforeAfterPairs(project)

  const breadcrumbs = [
    { name: isEs ? "Inicio" : "Home", href: `/${locale}` },
    { name: isEs ? "Galeria" : "Gallery", href: `/${locale}/gallery` },
    { name: project.name, href: `/${locale}/gallery/${slug}` },
  ]

  // Group photos by phase
  const photosByPhase: Record<string, typeof project.photos> = {}
  for (const photo of project.photos) {
    const phase = photo.phase || "progress"
    if (!photosByPhase[phase]) photosByPhase[phase] = []
    photosByPhase[phase].push(photo)
  }

  const phaseOrder = ["before", "demo", "progress", "after", "detail"]

  return (
    <main className="min-h-screen bg-cream">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <Breadcrumbs items={breadcrumbs} />

        <div className="py-8">
          <div className="text-trade-orange font-accent font-medium text-sm uppercase mb-2">
            {project.service}
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-espresso mb-2">
            {project.name}
          </h1>
          {project.location && (
            <p className="text-warm-gray text-lg">{project.location}</p>
          )}
        </div>

        {/* Before & After comparison */}
        {pairs.length > 0 && (
          <section className="mb-12">
            <h2 className="font-display text-2xl font-bold text-espresso mb-6">
              {isEs ? "Antes y Despues" : "Before & After"}
            </h2>
            <div className="space-y-8">
              {pairs.map((pair, i) => (
                <div key={i} className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <Image
                      src={pair.before.url}
                      alt={`Before - ${project.name}`}
                      width={600}
                      height={450}
                      className="rounded-lg object-cover w-full h-72"
                    />
                    <span className="absolute bottom-3 left-3 bg-shield-navy text-white text-sm font-accent font-semibold px-3 py-1 rounded">
                      {isEs ? "Antes" : "Before"}
                    </span>
                  </div>
                  <div className="relative">
                    <Image
                      src={pair.after.url}
                      alt={`After - ${project.name}`}
                      width={600}
                      height={450}
                      className="rounded-lg object-cover w-full h-72"
                    />
                    <span className="absolute bottom-3 left-3 bg-trade-orange text-white text-sm font-accent font-semibold px-3 py-1 rounded">
                      {isEs ? "Despues" : "After"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* All photos by phase */}
        {phaseOrder.map((phase) => {
          const photos = photosByPhase[phase]
          if (!photos || photos.length === 0) return null
          // Skip before/after if already shown in comparison
          if ((phase === "before" || phase === "after") && pairs.length > 0) return null

          const label = phaseLabels[phase]
          const phaseName = label ? (isEs ? label.es : label.en) : phase

          return (
            <section key={phase} className="mb-10">
              <h2 className="font-display text-2xl font-bold text-espresso mb-4">
                {phaseName}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {photos.map((photo, i) => (
                  <div key={i} className="relative group">
                    <Image
                      src={photo.url}
                      alt={photo.note || `${project.name} - ${phaseName}`}
                      width={400}
                      height={300}
                      className="rounded-lg object-cover w-full h-52"
                    />
                    {photo.note && (
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-end p-3">
                        <p className="text-white text-sm">{photo.note}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )
        })}

        {/* CTA */}
        <div className="mt-8 p-6 bg-shield-navy rounded-lg text-white text-center">
          <h2 className="font-display text-2xl font-bold mb-3">
            {isEs
              ? "Quiere resultados como estos?"
              : "Want results like these?"}
          </h2>
          <p className="mb-4 text-white/80">
            {isEs
              ? "Llame para un estimado gratis."
              : "Call for a free estimate."}
          </p>
          <a
            href="tel:7863637039"
            className="inline-block bg-trade-orange text-white font-accent font-semibold px-6 py-3 rounded hover:bg-orange-600 transition-colors"
          >
            (786) 363-7039
          </a>
        </div>
      </div>
    </main>
  )
}
