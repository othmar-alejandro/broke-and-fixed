'use client'
import { useState } from 'react'
import { Phone, Envelope, MapPin, PaperPlaneTilt } from '@phosphor-icons/react'
import ScrollReveal from './ScrollReveal'
import { useTranslation } from 'react-i18next'

export default function Contact() {
  const { t } = useTranslation()
  const [formState, setFormState] = useState({ name: '', email: '', phone: '', service: '', message: '' })
  const handleChange = (e) => setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  return (
    <section id="contact" className="py-28 md:py-40 px-4 md:px-8 bg-espresso relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` }} />

      <div className="max-w-7xl mx-auto relative">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-16 lg:gap-24">
          <div>
            <ScrollReveal>
              <span className="inline-block rounded-full px-4 py-1.5 text-[11px] uppercase tracking-[0.2em] font-semibold bg-white/5 text-white/50 ring-1 ring-white/10 mb-6">
                {t('contact.eyebrow')}
              </span>
            </ScrollReveal>

            <ScrollReveal delay={0.05}>
              <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tighter leading-[0.95] text-white mb-8">
                {t('contact.headline1')}
                <br />
                {t('contact.headline2')}
                <br />
                <span className="text-sage-muted">{t('contact.headline3')}</span>
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <p className="text-white/50 text-lg leading-relaxed max-w-[45ch] mb-12">{t('contact.sub')}</p>
            </ScrollReveal>

            <div className="flex flex-col gap-5">
              <ScrollReveal delay={0.15}>
                <a href="tel:+13053405282" className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-2xl bg-sage/10 flex items-center justify-center shrink-0 group-hover:bg-sage/20 transition-colors">
                    <Phone weight="light" size={24} className="text-sage" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-white">{t('contact.callUs')}</h3>
                    <p className="text-white font-medium text-sm">305-340-5282</p>
                  </div>
                </a>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <a href="mailto:brokeandfixed305@gmail.com" className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-2xl bg-sage/10 flex items-center justify-center shrink-0 group-hover:bg-sage/20 transition-colors">
                    <Envelope weight="light" size={24} className="text-sage" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-white">{t('contact.emailUs')}</h3>
                    <p className="text-white font-medium text-sm">brokeandfixed305@gmail.com</p>
                  </div>
                </a>
              </ScrollReveal>

              <ScrollReveal delay={0.25}>
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-white/5 ring-1 ring-white/10 flex items-center justify-center">
                    <MapPin weight="light" size={20} className="text-white/60" />
                  </div>
                  <div>
                    <p className="text-white/40 text-xs uppercase tracking-wider mb-0.5">{t('contact.serviceArea')}</p>
                    <p className="text-white font-medium text-sm">{t('contact.serviceAreaList')}</p>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>

          <ScrollReveal delay={0.1}>
            <div className="rounded-[2rem] bg-white/5 ring-1 ring-white/10 p-1.5">
              <form action="https://api.web3forms.com/submit" method="POST">
                <input type="hidden" name="access_key" value="ebb39c28-f927-4916-be94-71a448167ae6" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                  <div className="flex flex-col gap-2">
                    <label className="text-white/40 text-xs uppercase tracking-wider font-medium">{t('contact.form.fullName')}</label>
                    <input type="text" name="name" value={formState.name} onChange={handleChange} className="bg-white/5 ring-1 ring-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-sage/50 transition-all duration-300" placeholder="Mirella Konstantinou" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-white/40 text-xs uppercase tracking-wider font-medium">{t('contact.form.email')}</label>
                    <input type="email" name="email" value={formState.email} onChange={handleChange} className="bg-white/5 ring-1 ring-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-sage/50 transition-all duration-300" placeholder="mirella@email.com" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                  <div className="flex flex-col gap-2">
                    <label className="text-white/40 text-xs uppercase tracking-wider font-medium">{t('contact.form.phone')}</label>
                    <input type="tel" name="phone" value={formState.phone} onChange={handleChange} className="bg-white/5 ring-1 ring-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-sage/50 transition-all duration-300" placeholder="305-340-5282" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-white/40 text-xs uppercase tracking-wider font-medium">{t('contact.form.service')}</label>
                    <select name="service" value={formState.service} onChange={handleChange} className="bg-white/5 ring-1 ring-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-sage/50 transition-all duration-300 appearance-none">
                      <option value="" className="bg-espresso">{t('contact.form.selectService')}</option>
                      <option value="bathroom" className="bg-espresso">{t('contact.form.bathroom')}</option>
                      <option value="kitchen" className="bg-espresso">{t('contact.form.kitchen')}</option>
                      <option value="interior-painting" className="bg-espresso">{t('contact.form.interiorPainting')}</option>
                      <option value="exterior-painting" className="bg-espresso">{t('contact.form.exteriorPainting')}</option>
                      <option value="tile" className="bg-espresso">{t('contact.form.tile')}</option>
                      <option value="exterior-repair" className="bg-espresso">{t('contact.form.exteriorRepairs')}</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-2 mb-8">
                  <label className="text-white/40 text-xs uppercase tracking-wider font-medium">{t('contact.form.projectDetails')}</label>
                  <textarea name="message" value={formState.message} onChange={handleChange} rows={4} className="bg-white/5 ring-1 ring-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-sage/50 transition-all duration-300 resize-none" placeholder={t('contact.form.placeholder')} />
                </div>

                <button type="submit" className="group flex items-center gap-3 bg-sage text-white rounded-full pl-7 pr-2 py-2.5 text-sm font-semibold transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-sage-light hover:scale-105 active:scale-[0.98] w-full sm:w-auto justify-center sm:justify-start">
                  <span>{t('contact.form.submit')}</span>
                  <span className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:scale-105">
                    <PaperPlaneTilt weight="bold" size={14} />
                  </span>
                </button>
              </form>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
