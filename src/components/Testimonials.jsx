'use client'
import { Star } from '@phosphor-icons/react'
import ScrollReveal from './ScrollReveal'

const testimonials = [
  {
    quote: 'We brought Broke & Fixed in to prep one of our Airbnb properties for the season — full bathroom refresh, kitchen update, interior paint throughout, and new lighting in every room. They treated it like it was their own home. Everything was done on schedule, the quality was excellent, and our guests have been raving ever since. We already have two more properties lined up with them.',
    name: 'Airbnb Property Solutions',
    location: 'Miami-Dade, FL',
    project: 'Full Interior Remodel',
    rating: 5,
  },
  {
    quote: 'We hired them for a rental property in The Crossings that needed serious attention — power washing the roof, driveway, and backyard, plus tile repairs up top. They found damage we hadn\'t even noticed and handled everything without us having to micromanage. Professional outfit, fair pricing, and they left the property looking better than it has in years.',
    name: '11510 Investment LLC',
    location: 'The Crossings, FL',
    project: 'Roof Repair & Power Washing',
    rating: 5,
  },
  {
    quote: 'They painted the entire exterior of my home in The Hammocks and it came out beautiful. From the first call to the final coat, everything was smooth. They prepped every surface properly, the color is exactly what I asked for, and the cleanup was perfect. My neighbors keep asking who did the work.',
    name: 'Alma R.',
    location: 'The Hammocks, FL',
    project: 'Exterior Painting',
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
