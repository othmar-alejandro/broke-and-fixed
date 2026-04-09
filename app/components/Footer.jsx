'use client'
import { InstagramLogo, FacebookLogo } from '@phosphor-icons/react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'next/navigation'

const locationsCol1 = [
  { name: 'Kendall', slug: 'kendall' },
  { name: 'West Kendall', slug: 'west-kendall' },
  { name: 'Palmetto Bay', slug: 'palmetto-bay' },
  { name: 'Doral', slug: 'doral' },
  { name: 'The Hammocks', slug: 'the-hammocks' },
  { name: 'The Crossings', slug: 'the-crossings' },
  { name: 'Kendale Lakes', slug: 'kendale-lakes' },
  { name: 'Sweetwater', slug: 'sweetwater' },
  { name: 'Cutler Bay', slug: 'cutler-bay' },
]

const locationsCol2 = [
  { name: 'Pinecrest', slug: 'pinecrest' },
  { name: 'South Miami', slug: 'south-miami' },
  { name: 'South Miami Heights', slug: 'south-miami-heights' },
  { name: 'Miami Gardens', slug: 'miami-gardens' },
  { name: 'Westchester', slug: 'westchester' },
  { name: 'Coral Gables', slug: 'coral-gables' },
  { name: 'Country Walk', slug: 'country-walk' },
  { name: 'Coconut Grove', slug: 'coconut-grove' },
]

const services = [
  { labelKey: 'footer.links.bathroom', slug: 'bathroom-remodeling', slugEs: 'remodelacion-de-banos' },
  { labelKey: 'footer.links.kitchen', slug: 'kitchen-remodeling', slugEs: 'remodelacion-de-cocinas' },
  { labelKey: 'footer.links.interiorPainting', slug: 'interior-painting', slugEs: 'pintura-interior' },
  { labelKey: 'footer.links.exteriorPainting', slug: 'exterior-painting', slugEs: 'pintura-exterior' },
  { labelKey: 'footer.links.tile', slug: 'tile-work', slugEs: 'instalacion-de-pisos' },
  { labelKey: 'footer.links.exteriorRepairs', slug: 'exterior-repairs', slugEs: 'reparaciones-exteriores' },
]

function LocationLink({ loc, locale }) {
  return (
    <li>
      <a href={`/${locale}/locations/${loc.slug}`} className="text-sm text-warm-gray transition-colors duration-300 hover:text-espresso whitespace-nowrap">
        {loc.name}
      </a>
    </li>
  )
}

export default function Footer() {
  const { t } = useTranslation()
  const params = useParams()
  const locale = params.locale || 'en'

  return (
    <footer className="pt-16 md:pt-20 pb-8 md:pb-10 px-4 md:px-8 border-t border-espresso/5">
      <div className="max-w-7xl mx-auto">
        {/* Top: Brand row */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12">
          <div className="flex items-center gap-5">
            <a href={`/${locale}`}>
              <img src="/broke-and-fixed-final-logo-Picsart-BackgroundRemover.png" alt="Broke & Fixed Home Solutions" className="h-16 w-auto" />
            </a>
            <p className="text-warm-gray text-sm leading-relaxed max-w-[34ch] hidden md:block">
              {t('footer.tagline')}
            </p>
          </div>
          <div className="flex gap-3">
            <a href="https://www.instagram.com/brokeandfixed/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-espresso/5 flex items-center justify-center transition-colors duration-300 hover:bg-sage/10 hover:scale-105" aria-label="Instagram">
              <InstagramLogo weight="regular" size={18} className="text-warm-gray" />
            </a>
            <a href="#" className="w-10 h-10 rounded-xl bg-espresso/5 flex items-center justify-center transition-colors duration-300 hover:bg-sage/10" aria-label="Facebook">
              <FacebookLogo weight="regular" size={18} className="text-warm-gray" />
            </a>
          </div>
        </div>

        {/* Links grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-10">
          {/* Areas col 1 */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.15em] font-semibold text-espresso mb-4">
              {locale === 'es' ? 'Áreas que Servimos' : 'Areas We Serve'}
            </h4>
            <ul className="flex flex-col gap-2.5">
              {locationsCol1.map((loc) => (
                <LocationLink key={loc.slug} loc={loc} locale={locale} />
              ))}
            </ul>
          </div>

          {/* Areas col 2 */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.15em] font-semibold text-espresso mb-4 invisible">
              &nbsp;
            </h4>
            <ul className="flex flex-col gap-2.5">
              {locationsCol2.map((loc) => (
                <LocationLink key={loc.slug} loc={loc} locale={locale} />
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.15em] font-semibold text-espresso mb-4">
              {t('footer.services')}
            </h4>
            <ul className="flex flex-col gap-2.5">
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
            <h4 className="text-xs uppercase tracking-[0.15em] font-semibold text-espresso mb-4">
              {t('footer.company')}
            </h4>
            <ul className="flex flex-col gap-2.5">
              <li><a href="#about" className="text-sm text-warm-gray transition-colors duration-300 hover:text-espresso">{t('footer.links.about')}</a></li>
              <li><a href="#gallery" className="text-sm text-warm-gray transition-colors duration-300 hover:text-espresso">{t('footer.links.gallery')}</a></li>
              <li><a href="#process" className="text-sm text-warm-gray transition-colors duration-300 hover:text-espresso">{t('footer.links.process')}</a></li>
              <li><a href="#contact" className="text-sm text-warm-gray transition-colors duration-300 hover:text-espresso">{t('footer.links.contact')}</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-espresso/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
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
