import { InstagramLogo, FacebookLogo } from '@phosphor-icons/react'

const footerLinks = [
  {
    heading: 'Services',
    links: [
      { label: 'Bathroom Remodeling', href: '#services' },
      { label: 'Kitchen Remodeling', href: '#services' },
      { label: 'Interior Painting', href: '#services' },
      { label: 'Exterior Painting', href: '#services' },
      { label: 'Tile Work', href: '#services' },
      { label: 'Exterior Repairs', href: '#services' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About', href: '#about' },
      { label: 'Gallery', href: '#gallery' },
      { label: 'Process', href: '#process' },
      { label: 'Contact', href: '#contact' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="py-16 md:py-24 px-4 md:px-8 border-t border-espresso/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-12 md:gap-8 mb-16">
          <div>
            <a href="#" className="mb-4 inline-block">
              <img src="/broke-and-fixed-final-logo-Picsart-BackgroundRemover.png" alt="Broke & Fixed" className="h-[78px] w-auto" />
            </a>
            <p className="text-warm-gray text-sm leading-relaxed max-w-[38ch] mb-6">
              Home remodeling &amp; renovation in South Miami-Dade.
              Family owned, fully insured, and built on referrals.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/brokeandfixed/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-espresso/5 flex items-center justify-center transition-colors duration-300 hover:bg-sage/10 hover:scale-105"
                aria-label="Instagram"
              >
                <InstagramLogo weight="regular" size={18} className="text-warm-gray" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-espresso/5 flex items-center justify-center transition-colors duration-300 hover:bg-sage/10"
                aria-label="Facebook"
              >
                <FacebookLogo weight="regular" size={18} className="text-warm-gray" />
              </a>
            </div>
          </div>

          {footerLinks.map((group) => (
            <div key={group.heading}>
              <h4 className="text-xs uppercase tracking-[0.15em] font-semibold text-espresso mb-5">
                {group.heading}
              </h4>
              <ul className="flex flex-col gap-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-warm-gray transition-colors duration-300 hover:text-espresso"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-espresso/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-warm-gray-light">
            &copy; {new Date().getFullYear()} Broke &amp; Fixed Home Solutions. All rights reserved.
          </p>
          <p className="text-xs text-warm-gray-light">
            Kendall · West Kendall · Palmetto Bay · Doral · Hammocks · The Crossings · Kendale Lakes · Sweetwater · Cutler Bay
          </p>
        </div>
      </div>
    </footer>
  )
}
