import ImagePlaceholder from "@/components/ImagePlaceholder"

export interface MaterialOption {
  category: string
  categoryEs: string
  name: string
  nameEs: string
  description: string
  descriptionEs: string
  priceLevel: "Budget" | "Mid" | "Premium" | "Luxury"
}

interface MaterialsShowcaseProps {
  materials: MaterialOption[]
  locale: "en" | "es"
  intro?: string
  serviceSlug: string
}

const priceLevelStyles: Record<string, string> = {
  Budget: "bg-emerald-100 text-emerald-800 ring-emerald-200",
  Mid: "bg-sky-100 text-sky-800 ring-sky-200",
  Premium: "bg-violet-100 text-violet-800 ring-violet-200",
  Luxury: "bg-amber-100 text-amber-900 ring-amber-200",
}

const priceLevelEs: Record<string, string> = {
  Budget: "Económico",
  Mid: "Medio",
  Premium: "Premium",
  Luxury: "Lujo",
}

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
}

export default function MaterialsShowcase({
  materials,
  locale,
  intro,
  serviceSlug,
}: MaterialsShowcaseProps) {
  const isEs = locale === "es"

  // Group by category for cleaner layout
  const grouped = materials.reduce<Record<string, MaterialOption[]>>((acc, m) => {
    const key = isEs ? m.categoryEs : m.category
    if (!acc[key]) acc[key] = []
    acc[key].push(m)
    return acc
  }, {})

  return (
    <section className="py-20 md:py-28 bg-cream">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block text-xs uppercase tracking-[0.2em] text-sage font-bold mb-3">
            {isEs ? "Opciones de material" : "Material options"}
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-espresso leading-tight">
            {isEs ? "Materiales que Usamos" : "Materials We Work With"}
          </h2>
          {intro && (
            <p className="text-warm-gray mt-4 text-lg leading-relaxed">{intro}</p>
          )}
        </div>

        <div className="flex flex-col gap-12">
          {Object.entries(grouped).map(([category, items]) => (
            <div key={category}>
              <h3 className="font-display text-2xl font-bold text-espresso mb-5">{category}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {items.map((mat, i) => {
                  const imagePath = `/images/services/${serviceSlug}/materials/${slugify(mat.name)}.jpg`
                  return (
                    <div
                      key={i}
                      className="bg-white rounded-2xl overflow-hidden ring-1 ring-espresso/5 hover:ring-sage/40 hover:-translate-y-1 transition-all duration-300 group"
                    >
                      <div className="relative">
                        <ImagePlaceholder
                          src={imagePath}
                          alt={`${mat.name} material option`}
                          ratio="video"
                          fill={false}
                          width={600}
                          height={338}
                          className="w-full h-auto object-cover"
                          label={mat.category}
                        />
                        <span
                          className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ring-1 ${priceLevelStyles[mat.priceLevel]}`}
                        >
                          {isEs ? priceLevelEs[mat.priceLevel] : mat.priceLevel}
                        </span>
                      </div>
                      <div className="p-5">
                        <h4 className="font-display text-lg font-bold text-espresso mb-1.5 leading-tight">
                          {isEs ? mat.nameEs : mat.name}
                        </h4>
                        <p className="text-warm-gray text-sm leading-relaxed">
                          {isEs ? mat.descriptionEs : mat.description}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
