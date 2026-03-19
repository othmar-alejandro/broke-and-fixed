'use client'
import { Phone, Ruler, Sparkle, Hammer, ArrowRight, CheckCircle } from '@phosphor-icons/react'
import ScrollReveal from './ScrollReveal'

const steps = [
  {
    icon: Phone,
    number: '01',
    title: 'Free Consultation',
    description: 'Tell us what you need. We ask the right questions about scope, timeline, and budget before we ever step foot in your home.',
    accent: 'sage',
    size: 'normal',
  },
  {
    icon: Ruler,
    number: '02',
    title: 'On-Site Estimate',
    description: 'We come to your home, measure everything, and give you an honest line-item quote. Every number explained. No surprises.',
    accent: 'sage',
    size: 'normal',
  },
  {
    icon: Sparkle,
    number: '03',
    title: 'See It Before We Build It',
    description: 'Right there at your home, we use AI to show you exactly what your finished space will look like — before a single tile is laid or a brush touches the wall. Kitchen, bathroom, exterior paint — you see the result first and approve the vision.',
    accent: 'highlight',
    size: 'featured',
    tag: 'AI-Powered Preview',
  },
  {
    icon: Hammer,
    number: '04',
    title: 'We Get to Work',
    description: 'Our crew works clean and on schedule. Daily cleanup, photo updates, and a direct line to us. No call centers, no middlemen.',
    accent: 'sage',
    size: 'normal',
  },
  {
    icon: CheckCircle,
    number: '05',
    title: 'Final Walkthrough',
    description: "We don't close the job until you're 100% happy. Anything on your list gets handled the same day, not next week.",
    accent: 'sage',
    size: 'normal',
  },
]

export default function Process() {
  return (
    <section id="process" className="py-28 md:py-40 px-4 md:px-8 bg-cream-dark overflow-hidden">
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
              That's not us.
            </p>
          </ScrollReveal>
        </div>

        {/* Steps — alternating layout */}
        <div className="flex flex-col gap-4">
          {/* Row 1: steps 01–02 side by side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {steps.slice(0, 2).map((step, i) => (
              <ScrollReveal key={step.number} delay={i * 0.08}>
                <StepCard step={step} />
              </ScrollReveal>
            ))}
          </div>

          {/* Row 2: Featured AI step — full width */}
          <ScrollReveal delay={0.15}>
            <FeaturedStep step={steps[2]} />
          </ScrollReveal>

          {/* Row 3: steps 04–05 side by side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {steps.slice(3).map((step, i) => (
              <ScrollReveal key={step.number} delay={i * 0.08}>
                <StepCard step={step} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function StepCard({ step }) {
  return (
    <div className="relative rounded-[2rem] bg-espresso/[0.02] ring-1 ring-espresso/5 p-1.5 h-full">
      <div className="rounded-[calc(2rem-0.375rem)] bg-white p-8 md:p-10 h-full flex flex-col">
        <div className="flex items-center justify-between mb-8">
          <div className="w-12 h-12 rounded-2xl bg-sage/8 flex items-center justify-center">
            <step.icon weight="light" size={24} className="text-sage" />
          </div>
          <span className="font-display text-4xl font-bold tracking-tighter" style={{color: 'rgba(232,89,12,0.18)'}}>
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
  )
}

function FeaturedStep({ step }) {
  return (
    <div className="relative rounded-[2rem] bg-espresso p-1.5 overflow-hidden">
      {/* Decorative glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-sage/20 blur-[80px]" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-sage/10 blur-[60px]" />
      </div>

      <div className="rounded-[calc(2rem-0.375rem)] bg-espresso relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* Left: text content */}
          <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
            {/* Tag badge */}
            <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[10px] uppercase tracking-widest font-semibold bg-sage/15 text-sage ring-1 ring-sage/25 mb-6 w-fit">
              <Sparkle weight="fill" size={10} />
              {step.tag}
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-sage/15 flex items-center justify-center">
                <step.icon weight="light" size={24} className="text-sage" />
              </div>
              <span className="font-display text-5xl font-bold tracking-tighter" style={{color: 'rgba(232,89,12,0.25)'}}>
                {step.number}
              </span>
            </div>

            <h3 className="font-display text-2xl md:text-3xl font-bold tracking-tight text-white mb-4">
              {step.title}
            </h3>
            <p className="text-white/60 text-sm md:text-base leading-relaxed max-w-[40ch]">
              {step.description}
            </p>
          </div>

          {/* Right: AI preview image */}
          <div className="relative flex items-center justify-center p-8 md:p-10 min-h-[300px]">
            <div className="relative w-full max-w-md">
              {/* Stacked glow layers behind the image */}
              <div
                className="absolute inset-2 rounded-3xl bg-sage/30 blur-2xl"
                style={{ transform: 'scale(0.92) translateY(8px)' }}
              />
              {/* Actual AI preview image */}
              <div className="relative rounded-2xl overflow-hidden ring-1 ring-white/15 shadow-2xl">
                <img
                  src="/ai-preview.png"
                  alt="AI-powered before and after home renovation preview"
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
                {/* Overlay label */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-espresso/80 to-transparent px-5 py-4">
                  <p className="text-white/50 text-[10px] uppercase tracking-widest">Generated from your space — on-site</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
