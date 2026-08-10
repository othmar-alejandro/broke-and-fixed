import { Star, House, ShieldCheck, Clock } from "@phosphor-icons/react/dist/ssr"

interface TrustStripProps {
  locale: "en" | "es"
}

const stats = {
  en: [
    { value: "Local", label: "Miami-Dade Team", Icon: House },
    { value: "Reviews", label: "Google Profile", Icon: Star },
    { value: "100%", label: "Fully Insured", Icon: ShieldCheck },
    { value: "Clear", label: "Next Steps", Icon: Clock },
  ],
  es: [
    { value: "Local", label: "Equipo Miami-Dade", Icon: House },
    { value: "Reseñas", label: "Perfil de Google", Icon: Star },
    { value: "100%", label: "Asegurados", Icon: ShieldCheck },
    { value: "Clara", label: "Próximos Pasos", Icon: Clock },
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
