import ImagePlaceholder from "@/components/ImagePlaceholder"
import { ArrowRight, MapPin, Clock } from "@phosphor-icons/react/dist/ssr"

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

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
}

export default function BeforeAfterGallery({
  projects,
  locale,
  intro,
  serviceSlug,
}: BeforeAfterGalleryProps) {
  const isEs = locale === "es"

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
          {intro && (
            <p className="text-white/70 mt-4 text-lg leading-relaxed">{intro}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((project, i) => {
            const projectSlug = slugify(project.title.replace(/\s+(in|en)\s+/i, "-"))
            const beforeImg = `/images/services/${serviceSlug}/projects/${projectSlug}-before.jpg`
            const afterImg = `/images/services/${serviceSlug}/projects/${projectSlug}-after.jpg`

            return (
              <div
                key={i}
                className="bg-white/5 rounded-2xl overflow-hidden ring-1 ring-white/10 hover:ring-sage/40 transition-all"
              >
                <div className="grid grid-cols-2 gap-px bg-white/10">
                  <div className="relative">
                    <ImagePlaceholder
                      src={beforeImg}
                      alt={`${project.title} before`}
                      ratio="square"
                      fill={false}
                      width={400}
                      height={400}
                      className="w-full h-full object-cover"
                      label="Before"
                    />
                    <span className="absolute top-2 left-2 bg-black/70 text-white text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded">
                      {isEs ? "Antes" : "Before"}
                    </span>
                  </div>
                  <div className="relative">
                    <ImagePlaceholder
                      src={afterImg}
                      alt={`${project.title} after`}
                      ratio="square"
                      fill={false}
                      width={400}
                      height={400}
                      className="w-full h-full object-cover"
                      label="After"
                    />
                    <span className="absolute top-2 left-2 bg-sage text-white text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded">
                      {isEs ? "Después" : "After"}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="font-display text-xl font-bold text-white mb-3 leading-tight">
                    {isEs ? project.titleEs : project.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-white/60 text-xs mb-1">
                    <MapPin weight="fill" size={12} />
                    <span>{project.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-white/60 text-xs mb-3">
                    <Clock weight="fill" size={12} />
                    <span>{isEs ? project.durationEs : project.duration}</span>
                  </div>
                  <p className="text-white/80 text-sm leading-snug mb-3">
                    <span className="text-white font-semibold">{isEs ? "Alcance: " : "Scope: "}</span>
                    {isEs ? project.scopeEs : project.scope}
                  </p>
                  <p className="text-sage text-sm font-medium leading-snug flex items-start gap-2">
                    <ArrowRight weight="bold" size={14} className="mt-1 shrink-0" />
                    <span>{isEs ? project.highlightEs : project.highlight}</span>
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
