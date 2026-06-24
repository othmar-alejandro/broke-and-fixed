'use client'

import { motion } from 'framer-motion'
import {
  Phone,
  ChatCircleText,
  FileText,
  Star,
  InstagramLogo,
  Globe,
  CheckCircle,
  ArrowRight
} from '@phosphor-icons/react'

const PHONE_TEL = "+17863637039"
const IG = "https://www.instagram.com/brokeandfixed/"
const REVIEWS = "https://search.google.com/local/writereview?placeid=ChIJ7VSW8vHbAgMRvNWjsiV5kII"
const BG = "/start-bg.jpg"
const LOGO = "/broke-and-fixed-final-logo-Picsart-BackgroundRemover.png"

interface StartClientProps {
  locale: string
}

export default function StartClient({ locale }: StartClientProps) {
  const isEs = locale === "es"

  const t = {
    tagline: isEs
      ? "Reparamos lo dañado. Construimos lo que sigue."
      : "We fix what's broke. We build what's next.",
    sub: isEs
      ? "Remodelación de cocinas y baños, pintura, pisos y reparaciones en Miami-Dade."
      : "Kitchen and bathroom remodeling, painting, tiling, and repairs across Miami-Dade.",
    ratingText: isEs ? "5.0 · 5 estrellas en Google" : "5.0 · 5-Star Google Rating",
    trust: isEs
      ? ["Familiar", "Asegurado", "Bilingüe"]
      : ["Family Owned", "Fully Insured", "Bilingual Team"],
    callLabel: isEs ? "Llamar ahora" : "Call Now",
    textLabel: isEs ? "Enviar foto" : "Text a Photo",
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100, damping: 15 } }
  }

  const linkGroups = [
    {
      href: `/${locale}#contact`,
      label: isEs ? "Estimado gratis" : "Get a free estimate",
      subtext: isEs ? "Formulario simple para programar visita de inspección" : "Simple form to schedule a site consultation",
      icon: FileText,
      color: "text-[#F07A1A]",
      glow: "rgba(240, 122, 26, 0.15)"
    },
    {
      href: `/${locale}/services/kitchen-remodeling`,
      label: isEs ? "Remodelación de cocinas" : "Kitchen remodeling",
      subtext: isEs ? "Gabinetes nuevos, encimeras de cuarzo y distribuciones modernas" : "New cabinets, quartz tops, and custom layouts",
      image: "/images/design-ideas/kitchen-concept-1.png",
      glow: "rgba(240, 122, 26, 0.15)"
    },
    {
      href: `/${locale}/premium-bathroom`,
      label: isEs ? "Remodelación de baños" : "Bathroom remodeling",
      subtext: isEs ? "Duchas abiertas, vanidades flotantes y azulejos premium" : "Walk-in showers, quartz vanities, and custom tile",
      image: "/images/design-ideas/bathroom-concept-1.png",
      glow: "rgba(240, 122, 26, 0.15)"
    },
    {
      href: `/${locale}/services/tile-work`,
      label: isEs ? "Instalación de pisos" : "Tile work & flooring",
      subtext: isEs ? "Colocación de porcelanato, cerámica y gran formato" : "Porcelain, ceramic, and large-format tile installation",
      image: "/images/design-ideas/tile-work-concept.png",
      glow: "rgba(240, 122, 26, 0.15)"
    },
    {
      href: `/${locale}/services/exterior-painting`,
      label: isEs ? "Pintura exterior" : "Exterior painting",
      subtext: isEs ? "Pintura protectora y duradera contra el clima de Miami" : "Weatherproof coating built for South Florida rain & sun",
      image: "/exterior paint - the hammocks 2/exterior-paint-hammocks-2-tall-entrance.jpeg",
      glow: "rgba(240, 122, 26, 0.15)"
    },
    {
      href: `/${locale}/design-ideas`,
      label: isEs ? "Ideas de diseño" : "Design ideas",
      subtext: isEs ? "Ver conceptos de cocinas y baños con marcas de agua" : "Browse kitchen, bath & tile layout concepts",
      image: "/images/design-ideas/kitchen-concept-2.png",
      glow: "rgba(52, 211, 153, 0.15)"
    },
    {
      href: `/${locale}/gallery`,
      label: isEs ? "Nuestros proyectos" : "See our latest projects",
      subtext: isEs ? "Fotos reales de transformaciones antes y después" : "Before & after photos of recent local builds",
      image: "/Home Remodeling - South Miami Heights /diningroom2-painted.jpeg",
      glow: "rgba(240, 122, 26, 0.15)"
    },
    {
      href: REVIEWS,
      label: isEs ? "Reseñas de Google" : "Google reviews",
      subtext: isEs ? "Testimonios auténticos de nuestros clientes" : "Authentic reviews from local homeowners",
      icon: Star,
      external: true,
      color: "text-[#FFB300]",
      glow: "rgba(255, 179, 0, 0.15)"
    },
    {
      href: IG,
      label: isEs ? "Síguenos en Instagram" : "Follow us on Instagram",
      subtext: isEs ? "Trabajos diarios e historias detrás de escena" : "Behind-the-scenes daily project updates",
      icon: InstagramLogo,
      external: true,
      color: "text-[#ff9a4d]",
      glow: "rgba(240, 122, 26, 0.15)"
    },
    {
      href: `/${locale}`,
      label: isEs ? "Visitar brokeandfixed.com" : "Visit brokeandfixed.com",
      subtext: isEs ? "Explorar nuestro sitio web completo" : "Explore our full home services website",
      icon: Globe,
      color: "text-[#4A90E2]",
      glow: "rgba(74, 144, 226, 0.15)"
    }
  ]

  return (
    <main className="relative min-h-screen overflow-x-hidden flex flex-col items-center" style={{ backgroundColor: "#FAF9F6" }}>
      {/* Dynamic Keyframes Styles */}
      <style jsx global>{`
        @keyframes float-slow {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -40px) scale(1.15); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        @keyframes float-medium {
          0%, 100% { transform: translate(0px, 0px) scale(1.1); }
          50% { transform: translate(-40px, -20px) scale(0.95); }
        }
        .animate-float-1 {
          animation: float-slow 20s infinite ease-in-out;
        }
        .animate-float-2 {
          animation: float-medium 25s infinite ease-in-out;
        }
        .glass-container {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.5) 100%);
          border: 1px solid rgba(30, 58, 95, 0.08);
          border-top: 1px solid rgba(255, 255, 255, 0.9);
          border-left: 1px solid rgba(255, 255, 255, 0.85);
          box-shadow: 0 10px 30px -10px rgba(30, 58, 95, 0.04), inset 0 1px 0 rgba(255,255,255,0.9);
        }
        .glass-card-interactive {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.82) 0%, rgba(255, 255, 255, 0.55) 100%);
          border: 1px solid rgba(30, 58, 95, 0.06);
          border-top: 1px solid rgba(255, 255, 255, 0.9);
          border-left: 1px solid rgba(255, 255, 255, 0.8);
          box-shadow: 0 4px 18px -4px rgba(30, 58, 95, 0.03);
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .glass-card-interactive:hover {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.96) 0%, rgba(255, 255, 255, 0.85) 100%);
          border-color: rgba(240, 122, 26, 0.35);
          box-shadow: 0 12px 28px -6px rgba(30, 58, 95, 0.08), 0 0 12px rgba(240, 122, 26, 0.05);
        }
        .text-shimmer {
          background: linear-gradient(120deg, #1E3A5F 30%, #F07A1A 60%, #1E3A5F 90%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>

      {/* Background Image (subtle architectural ghost overlay) */}
      <div
        aria-hidden
        className="absolute inset-0 z-0 opacity-[0.08]"
        style={{
          backgroundImage: `url(${BG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "saturate(0.5) blur(1px)",
        }}
      />

      {/* Animated Glowing Orbs */}
      <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none opacity-45">
        <div 
          className="absolute w-[450px] h-[450px] rounded-full animate-float-1" 
          style={{
            top: '-80px',
            left: '-120px',
            background: 'radial-gradient(circle, rgba(240,122,26,0.12) 0%, transparent 70%)',
          }}
        />
        <div 
          className="absolute w-[500px] h-[500px] rounded-full animate-float-2" 
          style={{
            bottom: '15%',
            right: '-180px',
            background: 'radial-gradient(circle, rgba(30,58,95,0.14) 0%, transparent 70%)',
          }}
        />
      </div>

      {/* Main Overlay Gradient */}
      <div
        aria-hidden
        className="absolute inset-0 z-0"
        style={{
          background: "linear-gradient(180deg, rgba(250,249,246,0.98) 0%, rgba(242,244,247,0.90) 40%, rgba(250,249,246,0.98) 100%)",
        }}
      />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[430px] flex-col items-center px-6 py-14">
        
        {/* Header Branding Container */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center w-full"
        >
          {/* Logo Frame */}
          <div
            className="inline-flex items-center justify-center rounded-[32px] p-5 bg-white border border-slate-200/80 shadow-[0_15px_35px_rgba(30,58,95,0.06)]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={LOGO} alt="Broke & Fixed Home Solutions" width={90} height={90} className="h-[80px] w-auto object-contain" />
          </div>

          {/* Shimmer Tagline */}
          <h1 className="font-display mt-7 text-center text-[24px] font-black tracking-wide uppercase text-shimmer leading-tight">
            {t.tagline}
          </h1>
          <p className="mt-2 text-center text-[12.5px] leading-relaxed max-w-[320px] text-slate-600 font-medium">
            {t.sub}
          </p>

          {/* Google Reviews Badge */}
          <a
            href={REVIEWS}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 flex items-center justify-center gap-1.5 py-1.5 px-4 bg-white/90 border border-slate-200/80 rounded-full text-[11px] font-bold text-slate-700 hover:text-[#F07A1A] hover:border-[#F07A1A]/40 transition-all shadow-[0_4px_12px_rgba(30,58,95,0.03)] hover:shadow-[0_6px_16px_rgba(30,58,95,0.06)] active:scale-95"
            style={{ backdropFilter: "blur(8px)" }}
          >
            <span className="flex text-[#FFB300]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={11} weight="fill" />
              ))}
            </span>
            <span>{t.ratingText}</span>
          </a>
        </motion.div>

        {/* Unified Call & Text Grid - Clean Orange & Navy brand palette */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-8 grid grid-cols-2 gap-3.5 w-full"
        >
          {/* Call - Solid Brand Orange */}
          <a
            href={`tel:${PHONE_TEL}`}
            className="group flex flex-col items-center justify-center gap-2 rounded-2xl py-4 px-3 text-center transition-all duration-200 active:scale-[0.96]"
            style={{
              background: "linear-gradient(135deg, #F07A1A 0%, #D4660C 100%)",
              color: "#ffffff",
              boxShadow: "0 10px 25px -5px rgba(240,122,26,0.3), inset 0 1px 0 rgba(255,255,255,0.2)"
            }}
          >
            <div className="p-2 rounded-xl bg-white/10 group-hover:scale-110 transition-transform">
              <Phone size={20} weight="fill" className="text-white" />
            </div>
            <span className="font-display text-[15px] font-black tracking-wider uppercase">{t.callLabel}</span>
            <span className="text-[10px] font-bold tracking-wider opacity-90">(786) 363-7039</span>
          </a>

          {/* Text/SMS */}
          <a
            href={`sms:${PHONE_TEL}`}
            className="group flex flex-col items-center justify-center gap-2 rounded-2xl py-4 px-3 text-center border transition-all duration-200 active:scale-[0.96] glass-container"
            style={{
              borderColor: "rgba(240,122,26,0.3)"
            }}
          >
            <div className="relative p-2 rounded-xl bg-white/60 border border-slate-200/50 group-hover:scale-110 transition-transform">
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#F07A1A] rounded-full animate-pulse" />
              <ChatCircleText size={20} weight="bold" className="text-[#F07A1A]" />
            </div>
            <span className="font-display text-[15px] font-black tracking-wider uppercase text-[#F07A1A]">{t.textLabel}</span>
            <span className="text-[10px] text-slate-500 font-bold tracking-wider">{isEs ? "Enviar fotos" : "Get Quote Fast"}</span>
          </a>
        </motion.div>

        {/* Link List - Glassmorphic Stack with Image Thumbnails */}
        <motion.nav
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="mt-6 flex w-full flex-col gap-3.5"
        >
          {linkGroups.map((l) => {
            const LinkIcon = l.icon
            return (
              <motion.a
                key={l.label}
                href={l.href}
                variants={itemVariants}
                whileTap={{ scale: 0.98 }}
                {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="group flex items-center gap-4 rounded-2xl p-3.5 backdrop-blur-lg glass-card-interactive border-l-2 hover:border-l-[#F07A1A] border-l-transparent"
              >
                {/* Thumbnails or Premium Icons on the left */}
                {l.image ? (
                  <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-slate-200/80 shadow-inner flex-shrink-0 group-hover:scale-[1.04] transition-all">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={l.image} alt="" className="object-cover w-full h-full" />
                    {/* Overlay darkening */}
                    <div className="absolute inset-0 bg-slate-950/5 group-hover:bg-transparent transition-colors" />
                  </div>
                ) : (
                  <div 
                    className={`p-2.5 rounded-xl bg-white border border-slate-200/60 ${l.color} group-hover:scale-105 transition-transform flex-shrink-0`}
                    style={{ boxShadow: l.glow ? `0 8px 20px -8px ${l.glow}` : 'none' }}
                  >
                    {LinkIcon && <LinkIcon size={20} weight="bold" />}
                  </div>
                )}
                
                {/* Texts */}
                <div className="flex-1 flex flex-col items-start text-left min-w-0">
                  <span className="font-display text-[16px] font-bold tracking-wide text-[#0F1F35] group-hover:text-[#F07A1A] transition-colors leading-tight">
                    {l.label}
                  </span>
                  <span className="text-[11px] text-slate-500 mt-1 leading-snug line-clamp-1 group-hover:text-slate-600 transition-colors">
                    {l.subtext}
                  </span>
                </div>

                {/* Trailing arrow */}
                <div className="p-1.5 rounded-full bg-slate-50 border border-slate-100 opacity-60 group-hover:opacity-100 group-hover:bg-[#F07A1A]/10 group-hover:border-transparent transition-all flex-shrink-0">
                  <ArrowRight size={12} weight="bold" className="text-slate-400 group-hover:text-[#F07A1A] group-hover:translate-x-0.5 transition-all" />
                </div>
              </motion.a>
            )
          })}
        </motion.nav>

        {/* Footer Brand Badging */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="mt-auto pt-12 flex flex-col items-center w-full"
        >
          {/* Trust Checkmarks */}
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 mb-5">
            {t.trust.map((badge, idx) => (
              <div 
                key={idx} 
                className="flex items-center gap-1.5 px-3 py-1 bg-white border border-slate-200/80 rounded-full text-[10px] font-bold text-slate-600 uppercase tracking-wider shadow-sm"
                style={{ backdropFilter: "blur(4px)" }}
              >
                <CheckCircle size={11} weight="fill" className="text-[#F07A1A]" />
                <span>{badge}</span>
              </div>
            ))}
          </div>

          {/* Lang Switcher Pill */}
          <div 
            className="flex items-center bg-slate-100 border border-slate-200/60 rounded-full p-1 text-xs"
            style={{ 
              backdropFilter: "blur(6px)",
              boxShadow: "inset 0 1px 3px rgba(30,58,95,0.06)"
            }}
          >
            <a
              href="/en/start"
              className={`px-4 py-1.5 rounded-full font-bold uppercase tracking-wider text-[10px] transition-all ${
                locale === "en"
                  ? "bg-[#F07A1A] text-white shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              English
            </a>
            <a
              href="/es/start"
              className={`px-4 py-1.5 rounded-full font-bold uppercase tracking-wider text-[10px] transition-all ${
                locale === "es"
                  ? "bg-[#F07A1A] text-white shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Español
            </a>
          </div>
        </motion.div>
      </div>
    </main>
  )
}
