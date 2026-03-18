'use client'
import { Phone, Ruler, Hammer, Sparkle } from '@phosphor-icons/react'
import ScrollReveal from './ScrollReveal'

const steps = [
  {
    icon: Phone,
    number: '01',
    title: 'Free Consultation',
    description: 'Tell us what you need. We ask the right questions about scope, timeline, and budget before we ever step foot in your home.',
  },
  {
    icon: Ruler,
    number: '02',
    title: 'On-Site Estimate',
    description: 'We come to your home, measure everything, and give you an honest line-item quote within 48 hours. No surprises, no inflated numbers.',
  },
  {
    icon: Hammer,
    number: '03',
    title: 'We Get to Work',
    description: 'Our crew works clean and on schedule. Daily cleanup, photo updates, and a direct line to us. No call centers, no middlemen.',
  },
  {
    icon: Sparkle,
    number: '04',
    title: 'Final Walkthrough',
    description: "We don't close the job until you're 100% happy. Anything on your list gets handled the same day, not next week.",
  },
]

export default function Process() {
  return (
    <section id="process" className="py-28 md:py-40 px-4 md:px-8 bg-cream-dark">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <span className="inline-block rounded-full px-4 py-1.5 text-[11px] uppercase tracking-[0.2em] font-semibold bg-sage/8 text-sage ring-1 ring-sage/15 mb-6">
            How it works
          </span>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-4 mb-20">
          <ScrollReveal delay={0.05}>
            <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tighter leading-[0.95] text-espresso">
              Simple process,
              <br />
              zero games.
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="text-warm-gray text-lg leading-relaxed max-w-[50ch] md:pt-4">
              We built our process around what Miami homeowners actually
              complain about: no-show contractors, vague pricing, and zero communication.
              That’s not us.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((step, i) => (
            <ScrollReveal key={step.number} delay={i * 0.08}>
              <div className="relative rounded-[2rem] bg-espresso/[0.02] ring-1 ring-espresso/5 p-1.5 h-full">
                <div className="rounded-[calc(2rem-0.375rem)] bg-white p-8 md:p-10 h-full flex flex-col">
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-sage/8 flex items-center justify-center">
                      <step.icon weight="light" size={24} className="text-sage" />
                    </div>
                    <span className="font-display text-4xl font-bold text-espresso/8 tracking-tighter">
                      {step.number}
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-semibold tracking-tight text-espresso mb-3">
                    {step.title}
                  </h3>
                  <p className="text-warm-gray text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
