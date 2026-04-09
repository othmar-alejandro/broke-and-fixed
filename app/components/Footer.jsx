'use client'
import { InstagramLogo, FacebookLogo } from '@phosphor-icons/react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'next/navigation'

const locations = [
  { name: 'Kendall', nameEs: 'Kendall', slug: 'kendall' },
  { name: 'West Kendall', nameEs: 'West Kendall', slug: 'west-kendall' },
  { name: 'Palmetto Bay', nameEs: 'Palmetto Bay', slug: 'palmetto-bay' },
  { name: 'Doral', nameEs: 'Doral', slug: 'doral' },
  { name: 'The Hammocks', nameEs: 'The Hammocks', slug: 'the-hammocks' },
  { name: 'The Crossings', nameEs: 'The Crossings', slug: 'the-crossings' },
  { name: 'Kendale Lakes', nameEs: 'Kendale Lakes', slug: 'kendale-lakes' },
  { name: 'Sweetwater', nameEs: 'Sweetwater', slug: 'sweetwater' },
  { name: 'Cutler Bay', nameEs: 'Cutler Bay', slug: 'cutler-bay' },
  { name: 'Pinecrest', nameEs: 'Pinecrest', slug: 'pinecrest' },
  { name: 'South Miami', nameEs: 'South Miami', slug: 'south-miami' },
  { name: 'South Miami Heights', nameEs: 'South Miami Heights', slug: 'south-miami-heights' },
  { name: 'Miami Gardens', nameEs: 'Miami Gardens', slug: 'miami-gardens' },
  { name: 'Westchester', nameEs: 'Westchester', slug: 'westchester' },
  { name: 'Coral Gables', nameEs: 'Coral Gables', slug: 'coral-gables' },
  { name: 'Country Walk', nameEs: 'Country Walk', slug: 'country-walk' },
  { name: 'Coconut Grove', nameEs: 'Coconut Grove', slug: 'coconut-grove' },
]

const services = [
  { labelKey: 'footer.links.bathroom', slug: 'bathroom-remodeling', slugEs: 'remodelacion-de-banos' },
  { labelKey: 'footer.links.kitchen', slug: 'kitchen-remodeling', slugEs: 'remodelacion-de-cocinas' },
  { labelKey: 'footer.links.interiorPainting', slug: 'interior-painting', slugEs: 'pintura-interior' },
  { labelKey: 'footer.links.exteriorPainting', slug: 'exterior-painting', slugEs: 'pintura-exterior' },
  { labelKey: 'footer.links.tile', slug: 'tile-work', slugEs: 'instalacion-de-pisos' },
  { labelKey: 'footer.links.exteriorRepairs', slug: 'exterior-repairs', slugEs: 'reparaciones-exteriores' },
]

export default function Footer() {
  const { t } = useTranslation()
  const params = useParams()
  const locale = params.locale || 'en'

  return (
    <footer className="pt-16 md:pt-20 pb-8 md:pb-10 px-4 md:px-8 border-t border-espresso/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_0.8fr] gap-12 md:gap-8 mb-10">
          {/* Brand */}
          <div>
            <a href={`/${locale}`} className="mb-4 inline-block">
              <img src="/broke-and-fixed-final-logo-Picsart-BackgroundRemover.png" alt="Broke & Fixed Home Solutions - Remodeling and Painting in Miami-Dade" className="h-[78px] w-auto" />
            </a>
            <p className="text-warm-gray text-sm leading-relaxed max-w-[38ch] mb-6">
              {t('footer.tagline')}
            </p>
            <div className="flex gap-3">
              <a href="https://www.instagram.com/brokeandfixed/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-espresso/5 flex items-center justify-center transition-colors duration-300 hover:bg-sage/10 hover:scale-105" aria-label="Instagram">
                <InstagramLogo weight="regular" size={18} className="text-warm-gray" />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-espresso/5 flex items-center justify-center transition-colors duration-300 hover:bg-sage/10" aria-label="Facebook">
                <FacebookLogo weight="regular" size={18} className="text-warm-gray" />
              </a>
            </div>
          </div>

          {/* Areas We Serve */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.15em] font-semibold text-espresso mb-5">
              {locale === 'es' ? 'Áreas que Servimos' : 'Areas We Serve'}
            </h4>
            <ul className="grid grid-cols-3 gap-x-5 gap-y-2">
              {locations.map((loc) => (
                <li key={loc.slug}>
                  <a href={`/${locale}/locations/${loc.slug}`} className="text-sm text-warm-gray transition-colors duration-300 hover:text-espresso">
                    {loc.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.15em] font-semibold text-espresso mb-5">
              {t('footer.services')}
            </h4>
            <ul className="flex flex-col gap-3">
              {services.map((service) => (
                <li key={service.slug}>
                  <a href={`/${locale}/services/${locale === 'es' ? service.slugEs : service.slug}`} className="text-sm text-warm-gray transition-colors duration-300 hover:text-espresso">
                    {t(service.labelKey)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.15em] font-semibold text-espresso mb-5">
              {t('footer.company')}
            </h4>
            <ul className="flex flex-col gap-3">
              <li><a href="#about" className="text-sm text-warm-gray transition-colors duration-300 hover:text-espresso">{t('footer.links.about')}</a></li>
              <li><a href="#gallery" className="text-sm text-warm-gray transition-colors duration-300 hover:text-espresso">{t('footer.links.gallery')}</a></li>
              <li><a href="#process" className="text-sm text-warm-gray transition-colors duration-300 hover:text-espresso">{t('footer.links.process')}</a></li>
              <li><a href="#contact" className="text-sm text-warm-gray transition-colors duration-300 hover:text-espresso">{t('footer.links.contact')}</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-espresso/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-warm-gray-light">
            &copy; {new Date().getFullYear()} {t('footer.rights')}
          </p>
          <p className="text-xs text-warm-gray-light">
            Designed by OAC Digital Innovations
          </p>
        </div>
      </div>
    </footer>
  )
}
