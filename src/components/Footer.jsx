import { InstagramLogo, FacebookLogo } from '@phosphor-icons/react'
import { useTranslation } from 'react-i18next'

export default function Footer() {
  const { t } = useTranslation()

  const footerLinks = [
    {
      headingKey: 'footer.services',
      links: [
        { labelKey: 'footer.links.bathroom', href: '#services' },
        { labelKey: 'footer.links.kitchen', href: '#services' },
        { labelKey: 'footer.links.interiorPainting', href: '#services' },
        { labelKey: 'footer.links.exteriorPainting', href: '#services' },
        { labelKey: 'footer.links.tile', href: '#services' },
        { labelKey: 'footer.links.exteriorRepairs', href: '#services' },
      ],
    },
    {
      headingKey: 'footer.company',
      links: [
        { labelKey: 'footer.links.about', href: '#about' },
        { labelKey: 'footer.links.gallery', href: '#gallery' },
        { labelKey: 'footer.links.process', href: '#process' },
        { labelKey: 'footer.links.contact', href: '#contact' },
      ],
    },
  ]

  return (
    <footer className="py-16 md:py-24 px-4 md:px-8 border-t border-espresso/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-12 md:gap-8 mb-16">
          <div>
            <a href="#" className="mb-4 inline-block">
              <img src="/broke-and-fixed-final-logo-Picsart-BackgroundRemover.png" alt="Broke & Fixed" className="h-[78px] w-auto" />
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

          {footerLinks.map((group) => (
            <div key={group.headingKey}>
              <h4 className="text-xs uppercase tracking-[0.15em] font-semibold text-espresso mb-5">
                {t(group.headingKey)}
              </h4>
              <ul className="flex flex-col gap-3">
                {group.links.map((link) => (
                  <li key={link.labelKey}>
                    <a href={link.href} className="text-sm text-warm-gray transition-colors duration-300 hover:text-espresso">
                      {t(link.labelKey)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-espresso/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-warm-gray-light">
            &copy; {new Date().getFullYear()} {t('footer.rights')}
          </p>
          <p className="text-xs text-warm-gray-light">
            {t('footer.areas')}
          </p>
        </div>
      </div>
    </footer>
  )
}
