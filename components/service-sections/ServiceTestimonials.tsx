import { Star, Quotes } from "@phosphor-icons/react/dist/ssr"

export interface ServiceTestimonial {
  quote: string
  quoteEs: string
  authorName: string
  authorLocation: string
  service: string
  rating: number
}

interface ServiceTestimonialsProps {
  testimonials: ServiceTestimonial[]
  locale: "en" | "es"
  serviceName: string
  serviceNameEs: string
}

function getInitials(name: string): string {
  const parts = name.replace(/[^a-zA-Z\s.]/g, "").trim().split(/\s+/)
  if (parts.length === 0) return "?"
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

const avatarColors = [
  "bg-sage text-white",
  "bg-espresso text-white",
  "bg-orange-500 text-white",
  "bg-violet-600 text-white",
]

export default function ServiceTestimonials({
  testimonials,
  locale,
  serviceName,
  serviceNameEs,
}: ServiceTestimonialsProps) {
  const isEs = locale === "es"
  const service = isEs ? serviceNameEs : serviceName

  return (
    <section className="py-20 md:py-28 bg-cream">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block text-xs uppercase tracking-[0.2em] text-sage font-bold mb-3">
            {isEs ? "Lo que dicen" : "What they say"}
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-espresso leading-tight">
            {isEs
              ? `Clientes de ${service} en Miami`
              : `${service} Clients in Miami`}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-7 ring-1 ring-espresso/5 hover:ring-sage/40 hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              <Quotes weight="fill" size={28} className="text-sage/60 mb-3" />
              <div className="flex items-center gap-0.5 mb-3">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star
                    key={j}
                    weight="fill"
                    size={16}
                    className={j < t.rating ? "text-amber-400" : "text-gray-200"}
                  />
                ))}
              </div>
              <p className="text-espresso/85 text-base leading-relaxed mb-6 flex-1">
                &ldquo;{isEs ? t.quoteEs : t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3 mt-auto">
                <div
                  className={`w-11 h-11 rounded-full flex items-center justify-center font-display font-bold text-sm ${
                    avatarColors[i % avatarColors.length]
                  }`}
                >
                  {getInitials(t.authorName)}
                </div>
                <div>
                  <div className="font-semibold text-espresso text-sm">{t.authorName}</div>
                  <div className="text-warm-gray text-xs">{t.authorLocation}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
