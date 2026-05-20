import Link from "next/link"

interface Hb803BannerProps {
  locale?: "en" | "es"
  className?: string
}

export default function Hb803Banner({ locale = "en", className = "" }: Hb803BannerProps) {
  const isEs = locale === "es"
  const href = isEs
    ? "/es/blog/florida-hb-803-no-permit-needed-2026"
    : "/blog/florida-hb-803-no-permit-needed-2026"

  return (
    <Link
      href={href}
      className={`block bg-gradient-to-r from-sage/15 to-sage/5 ring-1 ring-sage/30 rounded-2xl p-5 md:p-6 hover:ring-sage/60 transition-all ${className}`}
    >
      <div className="flex items-start gap-4">
        <div className="shrink-0 w-10 h-10 rounded-full bg-sage text-white flex items-center justify-center font-bold text-xs">
          NEW
        </div>
        <div className="flex-1">
          <div className="text-xs uppercase tracking-[0.18em] text-sage font-bold mb-1">
            {isEs ? "Nueva Ley de Florida" : "New Florida Law"}
          </div>
          <p className="font-display text-lg md:text-xl font-bold text-espresso leading-tight mb-1">
            {isEs
              ? "HB 803: Sin permiso para remodelaciones bajo $7,500 (1 de Julio, 2026)"
              : "HB 803: No permit needed for remodels under $7,500 (July 1, 2026)"}
          </p>
          <p className="text-espresso/70 text-sm">
            {isEs
              ? "Cocinas, baños, pintura, gabinetes, pisos, drywall y azulejos califican. Aquí está lo que los dueños de casa en Miami deben saber. Leer más →"
              : "Kitchens, bathrooms, painting, cabinets, flooring, drywall and tile qualify. Here is what Miami homeowners need to know. Read more →"}
          </p>
        </div>
      </div>
    </Link>
  )
}
