'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft,
  CalendarBlank,
  Phone,
  GridFour,
  CookingPot,
  Bathtub,
  X,
  Star,
  CheckCircle,
  Eye
} from '@phosphor-icons/react'
import Breadcrumbs from '@/components/seo/Breadcrumbs'

const LOGO = "/logo-160.webp"
const PHONE_TEL = "+17863637039"

interface DesignIdeasClientProps {
  locale: string
}

type ConceptDef = {
  id: string
  category: 'kitchen' | 'bathroom' | 'tile'
  image: string
  titleEn: string
  titleEs: string
  descEn: string
  descEs: string
  specsEn: string[]
  specsEs: string[]
}

export default function DesignIdeasClient({ locale }: DesignIdeasClientProps) {
  const isEs = locale === "es"
  const [activeFilter, setActiveFilter] = useState<'all' | 'kitchen' | 'bathroom' | 'tile'>('all')
  const [zoomImage, setZoomImage] = useState<ConceptDef | null>(null)

  const t = {
    back: isEs ? "Volver a Enlaces" : "Back to Links",
    title: isEs ? "Ideas y Conceptos de Diseño" : "Design Ideas & Concepts",
    subtitle: isEs
      ? "Explore renderizaciones de alta fidelidad para cocinas modernas, baños de lujo y acabados de azulejos a medida. Listos para inspirar su próximo proyecto."
      : "Explore high-fidelity design concepts for modern kitchens, luxury bathrooms, and custom tile layouts. Ready to inspire your next home transformation.",
    filterAll: isEs ? "Todos" : "All Concepts",
    filterKitchen: isEs ? "Cocinas" : "Kitchens",
    filterBathroom: isEs ? "Baños" : "Bathrooms",
    filterTile: isEs ? "Azulejos y Pisos" : "Tile Work",
    specTitle: isEs ? "Detalles del Concepto:" : "Concept Details:",
    closeBtn: isEs ? "Cerrar" : "Close",
    ctaTitle: isEs ? "¿Le gustan estos conceptos?" : "Love these design concepts?",
    ctaSub: isEs
      ? "Hagamos realidad su visión. Ofrecemos estimados gratis y consultas de diseño en todo Miami-Dade."
      : "Let's bring your design vision to life. We offer free estimates and design consultations across Miami-Dade.",
    ctaPrimary: isEs ? "Pide tu Estimado Gratis" : "Get a Free Estimate",
    ctaPhone: isEs ? "Llamar ahora" : "Call (786) 363-7039",
    watermarkText: "Broke & Fixed Design Concept",
  }

  const concepts: ConceptDef[] = [
    {
      id: 'bathroom-1',
      category: 'bathroom',
      image: '/images/design-ideas/bathroom-concept-1.png',
      titleEn: 'Modern Marble-Look Master Bath',
      titleEs: 'Baño Principal Moderno Estilo Mármol',
      descEn: 'A luxury layout featuring walk-in shower with frameless glass panel, large-format marble-look porcelain tiles, and warm backlighting.',
      descEs: 'Una distribución de lujo con ducha abierta y panel de vidrio sin marco, porcelanato de gran formato imitación mármol y retroiluminación cálida.',
      specsEn: ['24"x48" polished porcelain slab walls', 'Matte black rainfall shower fixture', 'Floating oak vanity with double undermount sinks', 'Warm LED backlit vanity mirror', 'Built-in recessed shower niche'],
      specsEs: ['Paredes de losa de porcelanato pulido de 24"x48"', 'Grifería de ducha de lluvia en negro mate', 'Vanidad flotante de roble con dos lavamanos', 'Espejo de vanidad retroiluminado con LED cálido', 'Nicho empotrado de ducha']
    },
    {
      id: 'kitchen-1',
      category: 'kitchen',
      image: '/images/design-ideas/kitchen-concept-1.png',
      titleEn: 'Warm White Oak Kitchen',
      titleEs: 'Cocina de Roble Blanco Cálido',
      descEn: 'A minimalist kitchen design combining natural wood tones with premium white quartz countertops and warm under-cabinet LED strip accents.',
      descEs: 'Un diseño de cocina minimalista que combina tonos de madera natural con encimeras de cuarzo blanco premium y tiras de luces LED bajo los gabinetes.',
      specsEn: ['Flat-panel white oak custom cabinetry', 'Polished white quartz counters with grey veining', 'Minimalist solid slab quartz backsplash', 'Warm under-cabinet LED ambient lighting', 'Integrated hidden panel appliances'],
      specsEs: ['Gabinetes a medida de roble blanco lisos', 'Topes de cuarzo blanco pulido con vetas grises', 'Salpicadero de losa sólida de cuarzo', 'Iluminación ambiental LED bajo gabinetes', 'Electrodomésticos con paneles integrados']
    },
    {
      id: 'kitchen-2',
      category: 'kitchen',
      image: '/images/design-ideas/kitchen-concept-2.png',
      titleEn: 'Contemporary Navy & Brass Kitchen',
      titleEs: 'Cocina Contemporánea Azul Marino y Latón',
      descEn: 'Sleek navy blue lower cabinets paired with brushed gold fixtures, open floating wood shelves, and large concrete-look floor tiling.',
      descEs: 'Elegantes gabinetes inferiores azul marino combinados con accesorios de oro cepillado, repisas flotantes de madera y pisos de gran formato.',
      specsEn: ['Navy blue shaker style lower cabinets', 'Brushed brass drawer pulls & gooseneck faucet', 'Thick white marble island with waterfall edge', 'Open floating solid oak shelves', 'Large-format concrete-look porcelain tile floors'],
      specsEs: ['Gabinetes inferiores azul marino estilo shaker', 'Tiradores y grifería de cuello de cisne en latón cepillado', 'Isla de mármol blanco grueso con borde en cascada', 'Repisas flotantes de roble sólido', 'Pisos de porcelanato de gran formato imitación concreto']
    },
    {
      id: 'bathroom-2',
      category: 'bathroom',
      image: '/images/design-ideas/bathroom-concept-2.png',
      titleEn: 'Luxury Spa Bathroom with Garden View',
      titleEs: 'Baño Spa de Lujo con Vista al Jardín',
      descEn: 'A calm, spa-like layout featuring a freestanding oval tub, a neutral stone accent wall, and vertical wood panel slat textures.',
      descEs: 'Una distribución relajante tipo spa con bañera ovalada independiente, pared de piedra neutra y paneles de listones de madera verticales.',
      specsEn: ['Acrylic double-ended freestanding tub', 'Neutral sand-textured large format tile walls', 'Vertical oak wood slat wall paneling', 'Walk-in open glass shower floor drain', 'Contemporary wall-mounted vanity'],
      specsEs: ['Bañera independiente acrílica de doble extremo', 'Paredes de azulejos texturizados en tono arena', 'Panel de pared de listones verticales de roble', 'Drenaje de piso para ducha abierta de vidrio', 'Vanidad contemporánea montada en la pared']
    },
    {
      id: 'tile-1',
      category: 'tile',
      image: '/images/design-ideas/tile-work-concept.png',
      titleEn: 'Premium Tile & Hardwood Transition',
      titleEs: 'Transición Premium de Azulejo y Madera',
      descEn: 'A high-end flooring transition showing large-format concrete-look porcelain tiles meeting warm oak wood planks.',
      descEs: 'Una transición de piso de alta gama que muestra porcelanato de gran formato imitación concreto uniéndose con tablas de madera de roble cálido.',
      specsEn: ['Large-format grey concrete-look tiles', 'Warm natural oak hardwood flooring', 'Precision leveled transition divider', 'Ultra-thin modern grout lines'],
      specsEs: ['Azulejos de gran formato imitación concreto gris', 'Pisos de madera dura de roble natural cálido', 'Divisor de transición nivelado con precisión', 'Líneas de lechada modernas y ultrafinas']
    }
  ]

  const filteredConcepts = concepts.filter(c => activeFilter === 'all' || c.category === activeFilter)

  return (
    <main className="min-h-screen pb-20 flex flex-col items-center" style={{ backgroundColor: "#070E1A" }}>
      {/* Background radial effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30 z-0">
        <div 
          className="absolute w-[600px] h-[600px] rounded-full" 
          style={{
            top: '-200px',
            right: '-100px',
            background: 'radial-gradient(circle, rgba(240,122,26,0.12) 0%, transparent 70%)',
          }}
        />
        <div 
          className="absolute w-[500px] h-[500px] rounded-full" 
          style={{
            bottom: '20%',
            left: '-150px',
            background: 'radial-gradient(circle, rgba(30,58,95,0.25) 0%, transparent 70%)',
          }}
        />
      </div>

      {/* CSS Styles for light-catching glassmorphism */}
      <style jsx global>{`
        .glass-card-showcase {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%);
          border: 1px solid rgba(255, 255, 255, 0.07);
          border-top: 1px solid rgba(255, 255, 255, 0.14);
          border-left: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 15px 35px -10px rgba(0, 0, 0, 0.5);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .glass-card-showcase:hover {
          border-color: rgba(255, 255, 255, 0.18);
          box-shadow: 0 20px 40px -5px rgba(0, 0, 0, 0.6), 0 0 20px rgba(240, 122, 26, 0.05);
        }
        .pill-tab {
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .text-gradient {
          background: linear-gradient(120deg, #ffffff 40%, #ffc08a 80%, #ffffff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-5xl px-6 pt-10">
        
        {/* Back navigation */}
        <div className="flex items-center">
          <a
            href={`/${locale}/start`}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-[#F07A1A] transition-colors py-2"
          >
            <ArrowLeft size={16} weight="bold" />
            <span>{t.back}</span>
          </a>
        </div>

        {/* Header Title */}
        <header className="mt-8 max-w-3xl">
          <h1 className="font-display text-4xl sm:text-5xl font-black text-gradient uppercase tracking-tight leading-tight">
            {t.title}
          </h1>
          <p className="mt-3 text-slate-400 font-medium text-[15px] sm:text-[16px] leading-relaxed">
            {t.subtitle}
          </p>
        </header>

        {/* Dynamic Filter Tabs */}
        <nav className="mt-8 flex flex-wrap gap-2.5 border-b border-white/5 pb-5">
          {[
            { id: 'all', label: t.filterAll, icon: GridFour },
            { id: 'kitchen', label: t.filterKitchen, icon: CookingPot },
            { id: 'bathroom', label: t.filterBathroom, icon: Bathtub },
            { id: 'tile', label: t.filterTile, icon: GridFour },
          ].map((tab) => {
            const TabIcon = tab.icon
            const active = activeFilter === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id as any)}
                className={`pill-tab flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider border select-none ${
                  active
                    ? 'bg-[#F07A1A] border-[#F07A1A] text-[#070E1A] shadow-md shadow-orange-500/10'
                    : 'bg-white/[0.02] border-white/10 text-slate-400 hover:text-white hover:border-white/20'
                }`}
              >
                <TabIcon size={14} weight="bold" />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </nav>

        {/* Concepts Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredConcepts.map((c) => {
              const title = isEs ? c.titleEs : c.titleEn
              const desc = isEs ? c.descEs : c.descEn
              const specs = isEs ? c.specsEs : c.specsEn

              return (
                <motion.article
                  key={c.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="rounded-3xl overflow-hidden glass-card-showcase group flex flex-col h-full"
                >
                  {/* Image Frame */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-950">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={c.image}
                      alt={title}
                      className="object-cover w-full h-full group-hover:scale-[1.03] transition-transform duration-500"
                      loading="lazy"
                    />
                    {/* Overlay darkening */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent opacity-60 pointer-events-none" />

                    {/* CSS Watermark Overlay */}
                    <div className="absolute bottom-3.5 right-3.5 flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-[#070E1A]/85 backdrop-blur-md border border-white/10 shadow-xl pointer-events-none select-none">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={LOGO} alt="Broke & Fixed logo" className="w-5 h-5 object-contain opacity-95" />
                      <div className="flex flex-col items-start leading-[0.9]">
                        <span className="text-[8px] font-black tracking-widest uppercase text-white font-display">Broke & Fixed</span>
                        <span className="text-[6.5px] font-semibold text-[#F07A1A] uppercase tracking-wider mt-0.5">{isEs ? "Idea de Diseño" : "Design Concept"}</span>
                      </div>
                    </div>

                    {/* Expand View Indicator */}
                    <button
                      onClick={() => setZoomImage(c)}
                      className="absolute top-3.5 right-3.5 w-9 h-9 flex items-center justify-center rounded-xl bg-slate-950/60 backdrop-blur-md border border-white/10 text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-slate-950/80 active:scale-90"
                      aria-label="Expand concept details"
                    >
                      <Eye size={18} weight="bold" />
                    </button>
                  </div>

                  {/* Info Details */}
                  <div className="p-6 flex flex-col flex-1">
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#F07A1A]">
                      {c.category === 'kitchen' ? t.filterKitchen : t.filterBathroom}
                    </span>
                    <h2 className="font-display text-2xl font-black text-white mt-1 uppercase tracking-wide leading-tight">
                      {title}
                    </h2>
                    <p className="text-slate-400 text-sm mt-2 leading-relaxed font-medium">
                      {desc}
                    </p>

                    {/* Specifications List */}
                    <div className="mt-4 pt-4 border-t border-white/5 flex-1">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-2">
                        {t.specTitle}
                      </span>
                      <ul className="space-y-1.5">
                        {specs.map((spec, index) => (
                          <li key={index} className="flex items-start gap-2 text-xs text-slate-400 font-medium">
                            <span className="w-1.5 h-1.5 bg-[#F07A1A] rounded-full mt-1.5 flex-shrink-0" />
                            <span>{spec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Mini Interaction Button */}
                    <button
                      onClick={() => setZoomImage(c)}
                      className="mt-6 w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-xs font-bold uppercase tracking-wider text-white transition-all select-none"
                    >
                      <span>{isEs ? "Ver en pantalla completa" : "View Fullscreen"}</span>
                      <Eye size={14} weight="bold" />
                    </button>
                  </div>
                </motion.article>
              )
            })}
          </AnimatePresence>
        </div>

        {/* Lead Capture CTA Banner */}
        <section 
          className="mt-16 rounded-3xl p-8 sm:p-10 relative overflow-hidden glass-card-showcase flex flex-col items-center text-center border-l-4 hover:border-l-[#F07A1A]"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.005) 100%)",
            borderColor: "rgba(255,255,255,0.07)"
          }}
        >
          {/* Subtle logo background watermark */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.015] pointer-events-none select-none">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={LOGO} alt="" className="w-[300px] h-auto" />
          </div>

          <h3 className="font-display text-3xl font-black text-white uppercase tracking-wider leading-none">
            {t.ctaTitle}
          </h3>
          <p className="mt-3.5 text-slate-400 text-[14px] leading-relaxed max-w-xl font-medium">
            {t.ctaSub}
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <a
              href={`/${locale}#contact`}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-[#F07A1A] text-[#070E1A] font-display text-base font-black tracking-wider uppercase transition-all shadow-lg hover:shadow-orange-500/10 active:scale-98"
              style={{ boxShadow: "0 10px 25px -8px rgba(240,122,26,0.4)" }}
            >
              <CalendarBlank size={18} weight="fill" />
              <span>{t.ctaPrimary}</span>
            </a>
            <a
              href={`tel:${PHONE_TEL}`}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-white font-display text-base font-black tracking-wider uppercase transition-all active:scale-98"
            >
              <Phone size={18} weight="bold" className="text-[#F07A1A]" />
              <span>{t.ctaPhone}</span>
            </a>
          </div>
        </section>
      </div>

      {/* Lightbox / Fullscreen Zoom Modal */}
      <AnimatePresence>
        {zoomImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/95 p-4 sm:p-8 backdrop-blur-md"
            onClick={() => setZoomImage(null)}
          >
            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative max-w-4xl w-full max-h-[85vh] rounded-3xl overflow-hidden glass-card-showcase flex flex-col bg-slate-900"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setZoomImage(null)}
                className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center rounded-xl bg-slate-950/60 backdrop-blur-md border border-white/10 text-white hover:bg-slate-950/80 active:scale-90"
                aria-label="Close modal"
              >
                <X size={18} weight="bold" />
              </button>

              {/* Layout splits on desktop */}
              <div className="flex flex-col md:flex-row h-full">
                {/* Image panel */}
                <div className="relative flex-1 bg-black min-h-[30vh] md:min-h-[50vh]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={zoomImage.image}
                    alt={isEs ? zoomImage.titleEs : zoomImage.titleEn}
                    className="object-contain w-full h-full max-h-[50vh] md:max-h-[80vh] mx-auto"
                  />
                  {/* Dynamic Watermark Overlay */}
                  <div className="absolute bottom-4 right-4 flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-[#070E1A]/85 backdrop-blur-md border border-white/10 shadow-2xl pointer-events-none select-none">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={LOGO} alt="" className="w-5.5 h-5.5 object-contain opacity-95" />
                    <div className="flex flex-col items-start leading-[0.9]">
                      <span className="text-[8.5px] font-black tracking-widest uppercase text-white font-display">Broke & Fixed</span>
                      <span className="text-[7px] font-semibold text-[#F07A1A] uppercase tracking-wider mt-0.5">{isEs ? "Idea de Diseño" : "Design Concept"}</span>
                    </div>
                  </div>
                </div>

                {/* Info panel */}
                <div className="w-full md:w-80 bg-slate-900 border-t md:border-t-0 md:border-l border-white/5 p-6 flex flex-col justify-between">
                  <div>
                    <span className="text-[9px] font-black uppercase tracking-widest text-[#F07A1A]">
                      {zoomImage.category === 'kitchen' ? t.filterKitchen : t.filterBathroom}
                    </span>
                    <h3 className="font-display text-2xl font-black text-white mt-1 uppercase tracking-wide leading-tight">
                      {isEs ? zoomImage.titleEs : zoomImage.titleEn}
                    </h3>
                    <p className="text-slate-400 text-xs mt-3.5 leading-relaxed font-medium">
                      {isEs ? zoomImage.descEs : zoomImage.descEn}
                    </p>

                    {/* Spec points */}
                    <div className="mt-6 pt-5 border-t border-white/5">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-3">
                        {t.specTitle}
                      </span>
                      <ul className="space-y-2">
                        {(isEs ? zoomImage.specsEs : zoomImage.specsEn).map((spec, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs text-slate-400 font-medium">
                            <span className="w-1.5 h-1.5 bg-[#F07A1A] rounded-full mt-1.5 flex-shrink-0" />
                            <span>{spec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-8 pt-4 border-t border-white/5">
                    <a
                      href={`/${locale}#contact`}
                      onClick={() => setZoomImage(null)}
                      className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#F07A1A] text-[#070E1A] font-display text-xs font-black tracking-wider uppercase transition-all shadow-md active:scale-97"
                    >
                      <CalendarBlank size={16} weight="fill" />
                      <span>{t.ctaPrimary}</span>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
