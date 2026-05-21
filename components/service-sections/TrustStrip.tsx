import { Star, House, ShieldCheck, Clock } from "@phosphor-icons/react/dist/ssr"

interface TrustStripProps {
  locale: "en" | "es"
}

const stats = {
  en: [
    { value: "200+", label: "Miami Remodels", Icon: House },
    { value: "4.7", label: "Google Rating", Icon: Star },
    { value: "100%", label: "Fully Insured", Icon: ShieldCheck },
    { value: "<15 min", label: "Response Time", Icon: Clock },
  ],
  es: [
    { value: "200+", label: "Remodelaciones", Icon: House },
    { value: "4.7", label: "Calificación Google", Icon: Star },
    { value: "100%", label: "Asegurados", Icon: ShieldCheck },
    { value: "<15 min", label: "Tiempo de Respuesta", Icon: Clock },
  ],
}

export default function TrustStrip({ locale }: TrustStripProps) {
  const items = stats[locale]
  return (
    <section className="bg-espresso text-white py-10 md:py-14">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
          {items.map((stat, i) => {
            const { Icon } = stat
            return (
              <div key={i} className="flex flex-col items-center text-center">
                <Icon weight="light" size={32} className="text-sage mb-3" />
                <div className="font-display text-3xl md:text-4xl font-bold text-white leading-none">
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm uppercase tracking-[0.18em] text-white/60 mt-2 font-semibold">
                  {stat.label}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
