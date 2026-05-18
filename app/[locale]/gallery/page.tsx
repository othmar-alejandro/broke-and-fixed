import { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import Breadcrumbs from "@/components/seo/Breadcrumbs"
import { getAllProjects } from "@/lib/gallery"

interface PageParams {
  locale: string
}

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "es" }]
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>
}): Promise<Metadata> {
  const { locale } = await params
  return {
    title: locale === "es"
      ? "Galeria de Proyectos | Broke & Fixed Home Solutions"
      : "Project Gallery | Broke & Fixed Home Solutions",
    description: locale === "es"
      ? "Vea nuestros proyectos de remodelacion en Miami-Dade. Antes y despues de cocinas, banos, pintura y mas."
      : "See our remodeling projects across Miami-Dade. Before and after kitchens, bathrooms, painting, and more.",
  }
}

const serviceLabels: Record<string, { en: string; es: string }> = {
  bathroom: { en: "Bathroom", es: "Bano" },
  kitchen: { en: "Kitchen", es: "Cocina" },
  tile: { en: "Tile Work", es: "Trabajo de Azulejo" },
  paint: { en: "Painting", es: "Pintura" },
  exterior: { en: "Exterior", es: "Exterior" },
  cabinet: { en: "Cabinets", es: "Gabinetes" },
  countertop: { en: "Countertops", es: "Encimeras" },
}

export default async function GalleryPage({
  params,
}: {
  params: Promise<PageParams>
}) {
  const { locale } = await params
  const isEs = locale === "es"
  const projects = getAllProjects()

  const breadcrumbs = [
    { name: isEs ? "Inicio" : "Home", href: `/${locale}` },
    { name: isEs ? "Galeria" : "Gallery", href: `/${locale}/gallery` },
  ]

  return (
    <main className="min-h-screen bg-cream">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Breadcrumbs items={breadcrumbs} />

        <h1 className="font-display text-5xl font-bold text-espresso py-8">
          {isEs ? "Nuestros Proyectos" : "Our Projects"}
        </h1>

        <p className="text-warm-gray text-lg max-w-2xl mb-10">
          {isEs
            ? "Cada proyecto cuenta una historia. Vea la transformacion de principio a fin."
            : "Every project tells a story. See the transformation from start to finish."}
        </p>

        {projects.length === 0 ? (
          <p className="text-warm-gray">
            {isEs ? "Proyectos proximamente." : "Projects coming soon."}
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => {
              const coverPhoto = project.photos.find((p) => p.phase === "after")
                || project.photos[project.photos.length - 1]
              const svcLabel = serviceLabels[project.service]
              const serviceName = svcLabel
                ? isEs ? svcLabel.es : svcLabel.en
                : project.service

              return (
                <Link
                  key={project.slug}
                  href={`/${locale}/gallery/${project.slug}`}
                  className="group bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
                >
                  {coverPhoto && (
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={coverPhoto.url}
                        alt={`${project.name} - ${serviceName}`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      {project.phases.includes("before") && project.phases.includes("after") && (
                        <span className="absolute top-3 right-3 bg-trade-orange text-white text-xs font-accent font-semibold px-2 py-1 rounded">
                          {isEs ? "Antes y Despues" : "Before & After"}
                        </span>
                      )}
                    </div>
                  )}
                  <div className="p-4">
                    <div className="text-xs text-trade-orange font-accent font-medium uppercase mb-1">
                      {serviceName}
                    </div>
                    <h2 className="font-display text-xl font-bold text-espresso mb-1">
                      {project.name}
                    </h2>
                    <p className="text-warm-gray text-sm">
                      {project.photoCount} {isEs ? "fotos" : "photos"}
                      {project.location ? ` | ${project.location}` : ""}
                    </p>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </main>
  )
}
