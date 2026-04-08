'use client'
import { Star } from '@phosphor-icons/react'
import ScrollReveal from './ScrollReveal'
import { useTranslation } from 'react-i18next'

export default function Testimonials() {
  const { t } = useTranslation()

  const testimonials = [
    { key: 't1', rating: 5 },
    { key: 't2', rating: 5 },
    { key: 't3', rating: 5 },
  ]

  return (
    <section className="py-28 md:py-40 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <span className="inline-block rounded-full px-4 py-1.5 text-[11px] uppercase tracking-[0.2em] font-semibold bg-sage/8 text-sage ring-1 ring-sage/15 mb-6">
            {t('testimonials.eyebrow')}
          </span>
        </ScrollReveal>

        <ScrollReveal delay={0.05}>
          <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tighter leading-[0.95] text-espresso mb-16">
            {t('testimonials.headline1')}
            <br />
            {t('testimonials.headline2')}
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {testimonials.map((item, i) => {
            const name = t(`testimonials.${item.key}.name`)
            return (
              <ScrollReveal key={item.key} delay={i * 0.08}>
                <div className="rounded-[2rem] bg-espresso/[0.02] ring-1 ring-espresso/5 p-1.5 h-full">
                  <div className="rounded-[calc(2rem-0.375rem)] bg-white p-8 md:p-10 h-full flex flex-col justify-between">
                    <div>
                      <div className="flex gap-1 mb-6">
                        {Array.from({ length: item.rating }).map((_, j) => (
                          <Star key={j} weight="fill" size={16} className="text-sage" />
                        ))}
                      </div>
                      <blockquote className="text-espresso text-base leading-relaxed mb-8">
                        &ldquo;{t(`testimonials.${item.key}.quote`)}&rdquo;
                      </blockquote>
                    </div>
                    <div className="border-t border-espresso/5 pt-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-sage/10 flex items-center justify-center">
                          <span className="font-display text-sm font-bold text-sage">
                            {name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-espresso">{name}</p>
                          <p className="text-xs text-warm-gray">
                            {t(`testimonials.${item.key}.location`)} &middot; {t(`testimonials.${item.key}.project`)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
