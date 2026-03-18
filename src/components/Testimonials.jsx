'use client'
import { Star } from '@phosphor-icons/react'
import ScrollReveal from './ScrollReveal'

const testimonials = [
  {
    quote: 'They remodeled our master bathroom from top to bottom in West Kendall. Walk-in shower, new tile, the whole thing. Finished on time and left the place spotless every evening.',
    name: 'Maria L.',
    location: 'West Kendall, FL',
    project: 'Bathroom Remodel',
    rating: 5,
  },
  {
    quote: 'Got three quotes for our kitchen. Broke & Fixed was the only crew that walked us through exactly what we were paying for, piece by piece. The result was better than anything we imagined.',
    name: 'Carlos R.',
    location: 'Kendall Lakes, FL',
    project: 'Kitchen Remodel',
    rating: 5,
  },
  {
    quote: 'Hired them to repaint the exterior and fix some stucco cracks near the garage. They found a water issue two other guys missed. Honest, fast, and fully insured. That matters out here in Miami-Dade.',
    name: 'Yolanda M.',
    location: 'Palmetto Bay, FL',
    project: 'Exterior Painting & Repair',
    rating: 5,
  },
]

export default function Testimonials() {
  return (
    <section className="py-28 md:py-40 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <span className="inline-block rounded-full px-4 py-1.5 text-[11px] uppercase tracking-[0.2em] font-semibold bg-sage/8 text-sage ring-1 ring-sage/15 mb-6">
            Homeowner reviews
          </span>
        </ScrollReveal>

        <ScrollReveal delay={0.05}>
          <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tighter leading-[0.95] text-espresso mb-16">
            Real words from
            <br />
            real neighbors.
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {testimonials.map((t, i) => (
            <ScrollReveal key={t.name} delay={i * 0.08}>
              <div className="rounded-[2rem] bg-espresso/[0.02] ring-1 ring-espresso/5 p-1.5 h-full">
                <div className="rounded-[calc(2rem-0.375rem)] bg-white p-8 md:p-10 h-full flex flex-col justify-between">
                  <div>
                    <div className="flex gap-1 mb-6">
                      {Array.from({ length: t.rating }).map((_, j) => (
                        <Star key={j} weight="fill" size={16} className="text-sage" />
                      ))}
                    </div>
                    <blockquote className="text-espresso text-base leading-relaxed mb-8">
                      &ldquo;{t.quote}&rdquo;
                    </blockquote>
                  </div>
                  <div className="border-t border-espresso/5 pt-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-sage/10 flex items-center justify-center">
                        <span className="font-display text-sm font-bold text-sage">
                          {t.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-espresso">{t.name}</p>
                        <p className="text-xs text-warm-gray">{t.location} &middot; {t.project}</p>
                      </div>
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
