'use client'
import { Bathtub, PaintBrush, Wall, HouseLine, Drop, Wrench } from '@phosphor-icons/react'
import ScrollReveal from './ScrollReveal'

const services = [
  {
    icon: Bathtub,
    title: 'Bathroom Remodeling',
    description: 'Walk-in shower conversions, full gut remodels, vanity installs, custom tile work, and tub replacements. We handle Kendall, Palmetto Bay, and West Kendall homes regularly.',
    image: '/services/bathroom.png',
  },
  {
    icon: HouseLine,
    title: 'Kitchen Remodeling',
    description: 'Cabinet refacing, new countertops, tile backsplashes, and full kitchen overhauls. We remodel kitchens across South Miami-Dade, from Doral to Kendall Lakes.',
    image: '/services/kitchen.png',
  },
  {
    icon: PaintBrush,
    title: 'Interior Painting',
    description: 'Color help, surface prep, trim, ceilings, and accent walls. Clean lines, zero mess left behind. We serve homes across Kendall, Sweetwater, Hammocks, and The Crossings.',
    image: '/services/interior-painting.png',
  },
  {
    icon: Drop,
    title: 'Exterior Painting',
    description: 'Power washing, full surface prep, primer, and finish coats built for Miami heat and salt air. We work clean and we clean up after.',
    image: '/services/exterior-painting.png',
  },
  {
    icon: Wall,
    title: 'Tile Work',
    description: 'Floors, backsplashes, shower surrounds, and feature walls. Porcelain, ceramic, large-format, natural stone. We work across Kendall, Coral Bay, and the surrounding area.',
    image: '/services/tile-work.png',
  },
  {
    icon: Wrench,
    title: 'Exterior Repairs',
    description: 'Stucco patching, fascia work, and minor structural fixes. The small stuff that gets ignored until it becomes a big problem. We catch it early.',
    image: '/services/exterior-repairs.png',
  },
]

export default function Services() {
  return (
    <section id="services" className="py-28 md:py-40 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <span className="inline-block rounded-full px-4 py-1.5 text-[11px] uppercase tracking-[0.2em] font-semibold bg-sage/8 text-sage ring-1 ring-sage/15 mb-6">
            What we do
          </span>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-4 mb-20">
          <ScrollReveal delay={0.05}>
            <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tighter leading-[0.95] text-espresso">
              Six services,
              <br />
              one crew.
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="text-warm-gray text-lg leading-relaxed max-w-[50ch] md:pt-4">
              Every project is done by our own crew. No subcontractors, no handoffs.
              One family, one point of contact, from free estimate to final walkthrough.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.map((service, i) => (
            <ScrollReveal key={service.title} delay={i * 0.06} className="h-full">
              <div className="group relative overflow-hidden rounded-[2rem] bg-espresso/[0.02] ring-1 ring-espresso/5 p-1.5 h-full flex flex-col">
                <div className="relative overflow-hidden rounded-[calc(2rem-0.375rem)] bg-white flex-1 flex flex-col">
                  <div className="grid grid-cols-1 sm:grid-cols-[1fr_200px] gap-0 flex-1">
                    <div className="p-8 md:p-10 flex flex-col justify-between min-h-[220px]">
                      <div>
                        <div className="w-11 h-11 rounded-2xl bg-sage/8 flex items-center justify-center mb-5">
                          <service.icon weight="light" size={22} className="text-sage" />
                        </div>
                        <h3 className="font-display text-xl font-semibold tracking-tight text-espresso mb-3">
                          {service.title}
                        </h3>
                        <p className="text-warm-gray text-sm leading-relaxed max-w-[40ch]">
                          {service.description}
                        </p>
                      </div>
                    </div>
                    <div className="hidden sm:block relative overflow-hidden">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
