import type { IconProps } from "@phosphor-icons/react"
import {
  Wrench,
  ShieldCheck,
  Clock,
  House,
  PaintBrush,
  Hammer,
  Sparkle,
  ThumbsUp,
  Medal,
  Lightning,
  MapPin,
  ChatCircle,
  Phone,
  Handshake,
  Star,
  Drop,
  Sun,
  CloudLightning,
  Leaf,
  Bathtub,
  CookingPot,
  Tray,
  Toolbox,
  Compass,
} from "@phosphor-icons/react/dist/ssr"
import type { ComponentType } from "react"

const iconMap: Record<string, ComponentType<IconProps>> = {
  Wrench,
  ShieldCheck,
  Clock,
  HouseLine: House,
  House,
  Paintbrush: PaintBrush,
  PaintBrush,
  Hammer,
  Sparkle,
  ThumbsUp,
  Medal,
  Lightning,
  MapPin,
  ChatCircle,
  Phone,
  HandshakeFist: Handshake,
  Handshake,
  Star,
  Drop,
  Sun,
  Storm: CloudLightning,
  CloudLightning,
  Leaf,
  Bathtub,
  CookingPot,
  Tray,
  Toolbox,
  Compass,
}

export interface WhyChooseReason {
  icon: string
  title: string
  titleEs: string
  description: string
  descriptionEs: string
}

interface WhyChooseUsProps {
  reasons: WhyChooseReason[]
  locale: "en" | "es"
  intro?: string
}

export default function WhyChooseUs({ reasons, locale, intro }: WhyChooseUsProps) {
  const isEs = locale === "es"
  return (
    <section className="py-20 md:py-28 bg-cream">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block text-xs uppercase tracking-[0.2em] text-sage font-bold mb-3">
            {isEs ? "Por qué nosotros" : "Why us"}
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-espresso leading-tight">
            {isEs ? "Razones para llamarnos" : "Reasons people call us"}
          </h2>
          {intro && (
            <p className="text-warm-gray mt-4 text-lg leading-relaxed">{intro}</p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {reasons.map((reason, i) => {
            const Icon = iconMap[reason.icon] || ShieldCheck
            return (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 md:p-7 ring-1 ring-espresso/5 hover:ring-sage/40 hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-sage/15 flex items-center justify-center mb-5 group-hover:bg-sage group-hover:text-white transition-colors text-sage">
                  <Icon weight="bold" size={24} />
                </div>
                <h3 className="font-display text-xl font-bold text-espresso mb-2 leading-tight">
                  {isEs ? reason.titleEs : reason.title}
                </h3>
                <p className="text-warm-gray text-sm leading-relaxed">
                  {isEs ? reason.descriptionEs : reason.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
