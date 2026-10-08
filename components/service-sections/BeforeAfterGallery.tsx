import Image from "next/image"
import Link from "next/link"
import { ArrowRight, MapPin } from "@phosphor-icons/react/dist/ssr"
import { getServiceProjects } from "@/lib/data/service-photos"

export interface RecentProject {
  title: string
  titleEs: string
  location: string
  scope: string
  scopeEs: string
  duration: string
  durationEs: string
  highlight: string
  highlightEs: string
  imagePlaceholder: string
}

interface BeforeAfterGalleryProps {
  projects: RecentProject[]
  locale: "en" | "es"
  intro?: string
  serviceSlug: string
}

const phaseLabel: Record<string, { en: string; es: string }> = {
  before: { en: "Before", es: "Antes" },
  demo: { en: "Demo", es: "Demolición" },
  progress: { en: "In progress", es: "En proceso" },
  after: { en: "After", es: "Después" },
}

export default function BeforeAfterGallery({
  locale,
  serviceSlug,
}: BeforeAfterGalleryProps) {
  const isEs = locale === "es"
  // Real jobs only. The written case studies in `projects` stay in the data file
  // but are not rendered until they are matched to photos of that same job.
  const real = getServiceProjects(serviceSlug)
  if (real.length === 0) return null

  return (
    <section className="py-20 md:py-28 bg-espresso text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block text-xs uppercase tracking-[0.2em] text-sage font-bold mb-3">
            {isEs ? "Trabajos recientes" : "Recent work"}
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white leading-tight">
            {isEs ? "Antes y Después" : "Before and After"}
          </h2>
          <p className="text-white/70 mt-4 text-lg leading-relaxed">
            {isEs
              ? "Trabajos reales de nuestro equipo en Miami-Dade. Toque uno para ver todas las fotos."
              : "Real jobs by our team in Miami-Dade. Tap one to see every photo."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {real.map((project) => {
            const after = project.photos.filter((p) => p.phase === "after")
            const earlier = project.photos.filter((p) => p.phase !== "after")
            // Left = how it started (or the next best shot), right = finished
            const right = after[0] || project.photos[project.photos.length - 1]
            const left = earlier[0] || after[1]
            const shots = left ? [left, right] : [right]
            const place = project.location ? `${project.location}, Miami-Dade` : "Miami-Dade"

            return (
              <Link
                key={project.slug}
                href={`/${locale}/gallery/${project.slug}`}
                className="group bg-white/5 rounded-2xl overflow-hidden ring-1 ring-white/10 hover:ring-sage/40 transition-all"
              >
                <div className={`grid gap-px bg-white/10 ${shots.length === 2 ? "grid-cols-2" : "grid-cols-1"}`}>
                  {shots.map((photo) => (
                    <div
                      key={photo.url}
                      className={`relative ${shots.length === 2 ? "aspect-[3/4]" : "aspect-[3/2]"}`}
                    >
                      <Image
                        src={photo.url}
                        alt={`${project.name}, ${photo.phase}, ${place}`}
                        fill
                        sizes="(max-width: 768px) 50vw, 20vw"
                        className="object-cover"
                      />
                      <span
                        className={`absolute top-2 left-2 text-white text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded ${
                          photo.phase === "after" ? "bg-sage" : "bg-black/70"
                        }`}
                      >
                        {phaseLabel[photo.phase]?.[isEs ? "es" : "en"] || photo.phase}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="p-6">
                  <h3 className="font-display text-xl font-bold text-white mb-2 leading-tight">
                    {project.name}
                  </h3>
                  <div className="flex items-center gap-1.5 text-white/60 text-xs mb-3">
                    <MapPin weight="fill" size={12} />
                    <span>{place}</span>
                  </div>
                  <p className="text-white/80 text-sm leading-snug mb-3">{right.note}</p>
                  <p className="text-sage text-sm font-medium leading-snug flex items-center gap-2">
                    <span>
                      {project.photoCount === 1
                        ? isEs ? "Ver el proyecto" : "See the project"
                        : isEs ? `Ver las ${project.photoCount} fotos` : `See all ${project.photoCount} photos`}
                    </span>
                    <ArrowRight weight="bold" size={14} className="shrink-0 group-hover:translate-x-0.5 transition-transform" />
                  </p>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
