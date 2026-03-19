'use client'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ArrowDown } from '@phosphor-icons/react'
import { useRef, useEffect } from 'react'

const CROSSFADE_S = 1.2   // seconds before end to begin crossfade
const CROSSFADE_MS = 1200 // must match CSS transition duration

function SeamlessVideo({ src }) {
  const aRef = useRef(null)
  const bRef = useRef(null)
  const active = useRef('a')
  const fading = useRef(false)

  useEffect(() => {
    const a = aRef.current
    const b = bRef.current
    if (!a || !b) return

    const crossfade = () => {
      if (fading.current) return
      const from = active.current === 'a' ? a : b
      const to   = active.current === 'a' ? b : a
      if (!from.duration) return

      if (from.duration - from.currentTime < CROSSFADE_S) {
        fading.current = true
        to.currentTime = 0
        to.play().catch(() => {})
        from.style.opacity = '0'
        to.style.opacity   = '1'
        active.current = active.current === 'a' ? 'b' : 'a'

        setTimeout(() => {
          from.pause()
          from.currentTime = 0
          fading.current = false
        }, CROSSFADE_MS)
      }
    }

    a.addEventListener('timeupdate', crossfade)
    b.addEventListener('timeupdate', crossfade)

    // Only start loading + playing when the section enters the viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          a.load()
          a.play().catch(() => {})
          a.style.opacity = '1'
          observer.disconnect()
        }
      },
      { threshold: 0 }
    )
    observer.observe(a)

    return () => {
      a.removeEventListener('timeupdate', crossfade)
      b.removeEventListener('timeupdate', crossfade)
      observer.disconnect()
    }
  }, [])

  return (
    <>
      <video
        ref={aRef}
        src={src}
        muted
        playsInline
        preload="none"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: 0, transition: `opacity ${CROSSFADE_MS}ms ease` }}
      />
      <video
        ref={bRef}
        src={src}
        muted
        playsInline
        preload="none"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: 0, transition: `opacity ${CROSSFADE_MS}ms ease` }}
      />
    </>
  )
}

export default function Hero() {
  const container = useRef()

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    
    tl.fromTo('.hero-anim-1', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, 0)
      .fromTo('.hero-anim-2', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.9 }, 0.1)
      .fromTo('.hero-anim-3', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.9 }, 0.2)
      .fromTo('.hero-anim-4', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.9 }, 0.3)
      .fromTo('.hero-anim-5', { opacity: 0 }, { opacity: 1, duration: 1 }, 1.2)

    gsap.to('.hero-arrow', {
      y: 6,
      duration: 1,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut'
    })
  }, { scope: container })

  return (
    <section ref={container} className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-cream">
      {/* Video + inward edge mask */}
      <div
        className="absolute inset-0"
        style={{
          maskImage: 'radial-gradient(ellipse 90% 85% at 50% 50%, black 30%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse 90% 85% at 50% 50%, black 30%, transparent 80%)',
        }}
      >
        <SeamlessVideo src="/hero_video_loop.mp4" />
        {/* Center-focused dark overlay for text readability */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 70% 65% at 50% 50%, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.06) 55%, rgba(0,0,0,0.0) 100%)',
          }}
        />
      </div>

      {/* Noise texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Top fade — blends into navbar/site bg */}
      <div className="absolute inset-x-0 top-0 h-48 pointer-events-none" style={{ background: 'linear-gradient(to bottom, #F8F9FC 0%, transparent 100%)' }} />
      {/* Bottom fade — blends into next section */}
      <div className="absolute inset-x-0 bottom-0 h-56 pointer-events-none" style={{ background: 'linear-gradient(to top, #F8F9FC 0%, transparent 100%)' }} />

      {/* Stylish center-band overlay — darkens only the text zone */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent 5%, rgba(0,0,0,0.25) 30%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0.25) 70%, transparent 95%)',
        }}
      />

      {/* Centered content */}
      <div className="relative w-full max-w-4xl mx-auto px-4 md:px-8 flex flex-col items-center text-center">
        <div className="hero-anim-1" style={{ opacity: 0, transform: 'translateY(20px)' }}>
          <span className="inline-block rounded-full px-4 py-1.5 text-[11px] uppercase tracking-[0.2em] font-semibold bg-black/40 text-white backdrop-blur-sm ring-1 ring-white/20 mb-8">
            Kendall · West Kendall · Palmetto Bay · Doral · South Miami
          </span>
        </div>

        <h1
          className="hero-anim-2 font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.92] text-white mb-6"
          style={{ textShadow: '0 2px 20px rgba(0,0,0,0.5)', opacity: 0, transform: 'translateY(30px)' }}
        >
          We fix what's broke.
          <br />
          <span className="text-sage-muted">We build what's next.</span>
        </h1>

        <p
          className="hero-anim-3 text-lg md:text-xl text-white leading-relaxed max-w-[48ch] mb-10"
          style={{ textShadow: '0 1px 12px rgba(0,0,0,0.5)', opacity: 0, transform: 'translateY(30px)' }}
        >
          Kitchen and bathroom remodels, tile installs, interior and exterior
          painting, and exterior repairs. Quality work at a fair price.
          Family owned, fully insured. Serving Miami-Dade since 2023.
        </p>

        <div
          className="hero-anim-4 flex flex-col sm:flex-row items-center gap-4"
          style={{ opacity: 0, transform: 'translateY(30px)' }}
        >
          <a
            href="tel:3053405282"
            className="group flex items-center gap-3 bg-white text-espresso rounded-full pl-7 pr-2 py-2.5 text-base font-semibold transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-cream hover:scale-105 active:scale-[0.98]"
          >
            <span>Schedule a Consultation</span>
            <span className="w-9 h-9 rounded-full bg-espresso/5 flex items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:scale-105">
              <ArrowDown weight="bold" size={15} className="text-espresso -rotate-90" />
            </span>
          </a>
          <a
            href="#gallery"
            className="flex items-center gap-2.5 rounded-full border border-white/50 bg-transparent backdrop-blur-sm px-6 py-2.5 text-sm font-semibold text-sage-muted tracking-wide transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-white/80 hover:text-white hover:scale-105 active:scale-[0.98]"
          >
            See our projects
          </a>
        </div>
      </div>{/* end content wrapper */}

      {/* Scroll indicator */}
      <div
        className="hero-anim-5 absolute bottom-8 left-1/2 -translate-x-1/2"
        style={{ opacity: 0 }}
      >
        <a href="#services" className="flex flex-col items-center gap-2 text-white/40 text-xs tracking-widest uppercase">
          <div className="hero-arrow">
            <ArrowDown weight="light" size={20} />
          </div>
        </a>
      </div>
    </section>
  )
}
