'use client'
import ScrollReveal from './ScrollReveal'

const stats = [
  { value: '3', unit: ' yrs', label: 'In business' },
  { value: 'Dozens', unit: '', label: 'Completed projects' },
  { value: '100%', unit: '', label: 'Fully insured' },
  { value: '0', unit: '', label: 'Subcontractors' },
]

export default function About() {
  return (
    <section id="about" className="py-28 md:py-40 px-4 md:px-8 bg-espresso relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="max-w-7xl mx-auto relative">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-16 lg:gap-24">
          <div>
            <ScrollReveal>
              <span className="inline-block rounded-full px-4 py-1.5 text-[11px] uppercase tracking-[0.2em] font-semibold bg-white/5 text-white/50 ring-1 ring-white/10 mb-6">
                About us
              </span>
            </ScrollReveal>

            <ScrollReveal delay={0.05}>
              <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tighter leading-[0.95] text-white mb-8">
                Built right.
                <br />
                <span className="text-sage-muted">Priced right.</span>
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <p className="text-white/50 text-lg leading-relaxed max-w-[50ch] mb-6">
                Broke & Fixed started in 2023, two brothers from Kendall who got tired
              of watching homeowners get overcharged for work that wasn't done right.
              We fix things the way they should be fixed, and we charge what's fair.
              Serving Miami-Dade from Doral down to Cutler Bay.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <p className="text-white/50 text-lg leading-relaxed max-w-[50ch]">
                We are fully insured and family owned. We don't take on more than
              we can handle so every homeowner gets our direct attention, not a
              project manager reading notes. You call us, we answer.
              </p>
            </ScrollReveal>
          </div>

          <div className="flex flex-col gap-4 w-full">
            <ScrollReveal delay={0.1} className="w-full">
              <div className="relative overflow-hidden rounded-[2rem] bg-white/5 ring-1 ring-white/10 p-1.5 w-full">
                <div className="overflow-hidden rounded-[calc(2rem-0.375rem)] w-full">
                  <img
                    src="/services/bathroom.png"
                    alt="Broke & Fixed newly remodeled modern bathroom"
                    className="w-full h-[320px] md:h-[380px] object-cover"
                  />
                </div>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 w-full">
              {stats.map((stat, i) => (
                <ScrollReveal key={stat.label} delay={0.15 + i * 0.05} className="w-full h-full">
                  <div className="rounded-[1.5rem] flex flex-col items-center justify-center bg-white/5 ring-1 ring-white/10 px-2 py-5 sm:p-5 lg:px-1 xl:px-4 xl:py-6 text-center h-full w-full overflow-hidden">
                    <div className="font-display text-2xl sm:text-3xl lg:text-2xl xl:text-3xl font-bold text-white tracking-tight">
                      {stat.value}
                      <span className="text-sage-muted text-base sm:text-lg">{stat.unit}</span>
                    </div>
                    <div className="text-white/40 text-[10px] sm:text-xs lg:text-[9px] xl:text-[10.5px] mt-1 sm:mt-1.5 tracking-wider uppercase w-full">
                      {stat.label}
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
