"use client"

import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Lightning, Phone } from "@phosphor-icons/react"
import { useEffect, useRef } from "react"
import ImagePlaceholder from "@/components/ImagePlaceholder"
import { services } from "@/lib/data/services"
import { serviceImages } from "@/lib/data/images"

interface MegaMenuProps {
  open: boolean
  onClose: () => void
  locale: "en" | "es"
}

const imageKeyMap: Record<string, string> = {
  "bathroom-remodeling": "bathroom",
  "kitchen-remodeling": "kitchen",
  "interior-painting": "interior-painting",
  "exterior-painting": "exterior-painting",
  "tile-work": "tile-work",
  "exterior-repairs": "exterior-repairs",
  "cabinet-refinishing": "cabinet-refinishing",
}

export default function MegaMenu({ open, onClose, locale }: MegaMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const isEs = locale === "es"

  useEffect(() => {
    if (!open) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    const handleClick = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        onClose()
      }
    }
    document.addEventListener("keydown", handleKey)
    // Delay attaching click handler so the opening click doesn't trigger close
    const t = setTimeout(() => document.addEventListener("mousedown", handleClick), 0)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", handleKey)
      document.removeEventListener("mousedown", handleClick)
      clearTimeout(t)
      document.body.style.overflow = ""
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-espresso/30 backdrop-blur-sm"
            aria-hidden
          />

          {/* Panel */}
          <motion.div
            ref={panelRef}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
            className="fixed left-0 right-0 top-0 z-50 bg-cream shadow-2xl border-b border-espresso/10 max-h-[90vh] overflow-y-auto"
            role="dialog"
            aria-label={isEs ? "Servicios" : "Services"}
          >
            <div className="max-w-7xl mx-auto px-4 md:px-8 pt-24 pb-10 md:pb-14">
              <div className="flex items-baseline justify-between mb-8">
                <div>
                  <span className="text-xs uppercase tracking-[0.22em] text-sage font-bold">
                    {isEs ? "Servicios" : "Services"}
                  </span>
                  <h2 className="font-display text-3xl md:text-4xl font-bold text-espresso mt-1">
                    {isEs ? "Qué hacemos en Miami-Dade" : "What we do across Miami-Dade"}
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  className="hidden md:inline-flex items-center justify-center w-10 h-10 rounded-full bg-espresso/5 hover:bg-espresso/10 text-espresso transition-colors shrink-0"
                  aria-label="Close menu"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 3L13 13M13 3L3 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              {/* HB 803 Strip */}
              <Link
                href={`/${locale}/blog/florida-hb-803-no-permit-needed-2026`}
                onClick={onClose}
                className="flex items-center gap-3 bg-espresso text-white rounded-2xl px-5 py-3.5 mb-8 hover:bg-espresso/90 transition-colors group"
              >
                <span className="w-9 h-9 rounded-full bg-sage flex items-center justify-center shrink-0">
                  <Lightning weight="fill" size={16} className="text-white" />
                </span>
                <div className="flex-1 min-w-0">
                  <div className="text-xs uppercase tracking-[0.18em] text-sage font-bold mb-0.5">
                    {isEs ? "Nuevo · Julio 1, 2026" : "New · July 1, 2026"}
                  </div>
                  <div className="text-sm md:text-base font-semibold leading-tight">
                    {isEs
                      ? "HB 803: Sin permiso para trabajos bajo $7,500"
                      : "HB 803: No permit needed under $7,500"}
                  </div>
                </div>
                <ArrowRight weight="bold" size={16} className="text-white/60 group-hover:text-white group-hover:translate-x-0.5 transition-all shrink-0" />
              </Link>

              {/* Services Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {services.map((service, i) => {
                  const slug = isEs ? service.slugEs : service.slug
                  const name = isEs ? service.nameEs : service.name
                  const desc = isEs ? service.descriptionEs : service.description
                  const imgKey = imageKeyMap[service.slug] || service.slug
                  const img = serviceImages[imgKey]
                  return (
                    <motion.div
                      key={service.slug}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05 + i * 0.04, duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
                    >
                      <Link
                        href={`/${locale}/services/${slug}`}
                        onClick={onClose}
                        className="group block rounded-2xl overflow-hidden bg-white ring-1 ring-espresso/5 hover:ring-sage/40 hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
                      >
                        <div className="relative aspect-[4/3] overflow-hidden bg-cream">
                          <ImagePlaceholder
                            src={img?.hero || `/images/services/${service.slug}/hero.jpg`}
                            alt={img?.heroAlt || `${name} in Miami-Dade`}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 33vw, 25vw"
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            ratio="wide"
                            label={name}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-espresso/40 via-transparent to-transparent" aria-hidden />
                          <div className="absolute bottom-2 left-2 inline-flex items-center gap-1.5 bg-white/95 backdrop-blur text-espresso text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-full">
                            {service.priceRange}
                          </div>
                        </div>
                        <div className="p-4">
                          <h3 className="font-display text-lg font-bold text-espresso group-hover:text-sage transition-colors leading-tight">
                            {name}
                          </h3>
                          <p className="text-warm-gray text-xs mt-1.5 leading-snug line-clamp-2">
                            {desc}
                          </p>
                          <span className="inline-flex items-center gap-1 mt-3 text-sage text-xs font-bold uppercase tracking-wider">
                            {isEs ? "Ver detalle" : "View details"}
                            <ArrowRight weight="bold" size={12} className="group-hover:translate-x-0.5 transition-transform" />
                          </span>
                        </div>
                      </Link>
                    </motion.div>
                  )
                })}
              </div>

              {/* Footer row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 pt-8 border-t border-espresso/10">
                <Link
                  href={`/${locale}/blog`}
                  onClick={onClose}
                  className="flex items-center gap-3 group"
                >
                  <span className="w-10 h-10 rounded-full bg-sage/10 group-hover:bg-sage/20 flex items-center justify-center transition-colors">
                    <ArrowRight weight="bold" size={14} className="text-sage" />
                  </span>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-warm-gray font-semibold">
                      {isEs ? "Aprende" : "Learn"}
                    </div>
                    <div className="font-display text-base font-bold text-espresso group-hover:text-sage transition-colors">
                      {isEs ? "Blog y guías de costo" : "Blog & cost guides"}
                    </div>
                  </div>
                </Link>
                <Link
                  href={`/${locale}/gallery`}
                  onClick={onClose}
                  className="flex items-center gap-3 group"
                >
                  <span className="w-10 h-10 rounded-full bg-sage/10 group-hover:bg-sage/20 flex items-center justify-center transition-colors">
                    <ArrowRight weight="bold" size={14} className="text-sage" />
                  </span>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-warm-gray font-semibold">
                      {isEs ? "Mira" : "See"}
                    </div>
                    <div className="font-display text-base font-bold text-espresso group-hover:text-sage transition-colors">
                      {isEs ? "Galería de proyectos" : "Project gallery"}
                    </div>
                  </div>
                </Link>
                <a
                  href="tel:7863637039"
                  onClick={onClose}
                  className="flex items-center gap-3 group bg-sage rounded-2xl px-4 py-3 hover:bg-sage-light transition-colors"
                >
                  <span className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center">
                    <Phone weight="bold" size={14} className="text-white" />
                  </span>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-white/70 font-semibold">
                      {isEs ? "Llama ahora" : "Call now"}
                    </div>
                    <div className="font-display text-base font-bold text-white">
                      (786) 363-7039
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
