'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from '@phosphor-icons/react'
import ScrollReveal from './ScrollReveal'
import { useTranslation } from 'react-i18next'

const projects = [
  {
    titleKey: 'Two-Tone Kitchen Renovation',
    category: 'Lakes of the Meadow',
    image: '/images/lakes-meadows-kitchen-after-1.jpg',
    alt: 'Beautiful two-tone kitchen renovation in Lakes of the Meadow, featuring custom white and green cabinets, geometric tile backsplash, and a branch gold chandelier',
    description: 'A stunning kitchen overhaul in Lakes of the Meadow. We replaced the outdated dark backsplash with a modern geometric tiled pattern and painted the dark cabinets in a sophisticated two-tone layout: pristine white tail for the uppers and perimeter, and a rich forest green for the central island. Upgraded with a new extractor hood and a statement gold branch chandelier with custom glass globes.',
    additionalImages: [
      '/images/lakes-meadows-kitchen-after-2.jpg',
      '/images/lakes-meadows-kitchen-after-3.jpg',
      '/images/lakes-meadows-kitchen-before-1.jpg',
      '/images/lakes-meadows-kitchen-before-2.jpg',
    ],
    span: 'row-span-2',
  },
  {
    titleKey: 'Bathroom Transformation',
    category: 'Glenvar Heights',
    image: '/images/glenvar-after-1.jpg',
    alt: 'Completed luxury bathroom remodel with marble porcelain tile walls and LED backlit mirror in Glenvar Heights',
    description: 'A complete custom spa bathroom renovation in Glenvar Heights. Replaced a dated tub with an open walk-in shower featuring custom black hex mosaic accents and frameless glass. Installed a floating navy double vanity, backlit LED mirror, and large-format white marble porcelain wall slabs.',
    additionalImages: [
      '/images/glenvar-after-2.jpg',
      '/images/glenvar-after-4.jpg',
      '/images/glenvar-after-3.jpg',
      '/images/glenvar-before-3.jpg',
    ],
    span: '',
  },
  {
    titleKey: 'Kitchen Renovation',
    category: 'South Miami Heights',
    image: '/Home Remodeling - South Miami Heights /kitchen rennovation - south miami heights /new-kitchen-countertop.jpg',
    alt: 'Completed kitchen renovation with new countertop in South Miami Heights home',
    description: 'Complete gut and remodel including new custom cabinetry, quartz countertops, and a modern subway tile backsplash. Upgraded lighting and plumbing fixtures to breathe new life into the heart of this South Miami Heights home.',
    additionalImages: [
      '/Home Remodeling - South Miami Heights /kitchen rennovation - south miami heights /kitchen-rennovation-in-process-setting-appliances.jpeg',
      '/Home Remodeling - South Miami Heights /kitchen-countertop-cutting-and-leveling.jpeg',
    ],
    span: 'row-span-2',
  },
  {
    titleKey: 'Home Remodeling',
    category: 'South Miami Heights',
    image: '/Home Remodeling - South Miami Heights /bathroom2-shower-after.jpeg',
    alt: 'Bathroom remodel with new shower tile work in South Miami Heights',
    description: "Comprehensive interior renovation featuring modernized living spaces, updated flooring, and fresh aesthetic touches throughout. Delivered exactly to the client's specifications and completely transformed the property.",
    additionalImages: [
      '/Home Remodeling - South Miami Heights /diningroom2-painted.jpeg',
      '/Home Remodeling - South Miami Heights /drywall-installation-living-room.jpeg',
    ],
    span: '',
  },
  {
    titleKey: 'Exterior Paint',
    category: 'The Hammocks',
    image: '/exterior paint - the hammocks 2/exterior-paint-hammocks-2-tall-entrance.jpeg',
    alt: 'Exterior house painting near tall entrance in The Hammocks Miami',
    description: 'Full exterior prep and paint job. We repaired all stucco damage and sealed all cracks before applying two coats of premium weather-resistant paint to protect and beautify the property for years to come.',
    additionalImages: [
      '/exterior paint - the hammocks 2/exterior-paint-hammocks-2-wall-backyard.jpeg',
      '/exterior paint - the hammocks 2/Garage-door-painting-hammocks2.jpeg',
    ],
    span: '',
  },
  {
    titleKey: 'Driveway Clear Coating',
    category: 'Miami-Dade',
    image: '/driveway clear coating/driveway-sealant-completed.jpg',
    alt: 'Completed driveway clear coat sealant application in Miami-Dade',
    description: "Professional power washing followed by a high-grade clear coat sealant. This treatment restores the driveway's original look while providing long-term protection against Florida's harsh sun, rain, and vehicle wear.",
    additionalImages: ['/driveway clear coating/driveway-sealant.jpg'],
    span: '',
  },
  {
    titleKey: 'Demolition Project',
    category: 'Miami Gardens',
    image: '/demolition project - miami gardens/kitchen-demolition-after.jpeg',
    alt: 'Kitchen demolition completed in Miami Gardens home renovation project',
    description: 'Full interior demolition to prepare the property for a complete renovation. We safely removed drywall, flooring, and fixtures across the kitchen, bathrooms, and living areas — leaving a clean slate for the rebuild.',
    additionalImages: [
      '/demolition project - miami gardens/hallway-demolition-after-good-one.jpeg',
      '/demolition project - miami gardens/livingroom-demolition-after.jpeg',
    ],
    span: 'row-span-2',
  },
  {
    titleKey: 'Exterior Painting',
    category: 'The Hammocks',
    image: '/exterior painting - the hammocks/painting-house-process.jpeg',
    alt: 'Exterior painting in progress on a home in The Hammocks Miami',
    description: 'Another successful exterior transformation in The Hammocks. Thorough pressure washing, crack sealing, and precise application of top-tier exterior paint for a flawless, lasting finish.',
    additionalImages: [
      '/exterior painting - the hammocks/washing-walls-before-painting.jpeg',
      '/exterior painting - the hammocks/roof-pressure-cleaning.jpeg',
    ],
    span: '',
  },
]

export default function Gallery() {
  const [selected, setSelected] = useState(null)
  const { t } = useTranslation()

  return (
    <section id="gallery" className="py-28 md:py-40 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <span className="inline-block rounded-full px-4 py-1.5 text-[11px] uppercase tracking-[0.2em] font-semibold bg-sage/8 text-sage ring-1 ring-sage/15 mb-6">
            {t('gallery.eyebrow')}
          </span>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-4 mb-16">
          <ScrollReveal delay={0.05}>
            <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tighter leading-[0.95] text-espresso">
              {t('gallery.headline1')}
              <br />
              {t('gallery.headline2')}
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="text-warm-gray text-lg leading-relaxed max-w-[50ch] md:pt-4">
              {t('gallery.sub')}
            </p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-[240px] gap-3">
          {projects.map((project, i) => (
            <ScrollReveal key={project.titleKey} delay={i * 0.06} className={`${project.span} cursor-pointer`}>
              <div onClick={() => setSelected(project)} className="group relative h-full overflow-hidden rounded-[2rem] bg-espresso/[0.02] ring-1 ring-espresso/5 p-1.5">
                <div className="relative h-full overflow-hidden rounded-[calc(2rem-0.375rem)]">
                  <img src={project.image} alt={project.alt || project.titleKey} className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-espresso/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]">
                    <p className="text-white/60 text-xs uppercase tracking-widest mb-1">{project.category}</p>
                    <h3 className="text-white font-display font-semibold text-lg tracking-tight">{project.titleKey}</h3>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-espresso/90 backdrop-blur-2xl flex items-center justify-center p-4 md:p-8"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
              className="relative max-w-6xl w-full h-[90vh] md:h-[80vh] rounded-3xl overflow-hidden bg-espresso-light ring-1 ring-white/10 flex flex-col md:flex-row shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <button onClick={() => setSelected(null)} className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/50 text-white/70 hover:text-white hover:bg-black/70 transition-colors" aria-label="Close modal">
                <X className="w-6 h-6" />
              </button>

              <div className="md:w-[60%] h-[45vh] md:h-full bg-black relative flex items-center justify-center">
                <img src={selected.image} alt={selected.alt || selected.titleKey} className="w-full h-full object-cover" loading="lazy" />
              </div>

              <div className="md:w-[40%] p-6 md:p-10 overflow-y-auto max-h-[45vh] md:max-h-full flex flex-col bg-espresso">
                <div className="mb-8">
                  <p className="text-sage-muted text-xs uppercase tracking-widest mb-3 font-medium">{selected.category}</p>
                  <h3 className="text-3xl lg:text-4xl font-display font-bold text-white mb-5 leading-tight">{selected.titleKey}</h3>
                  <p className="text-warm-gray leading-relaxed text-sm md:text-base">{selected.description}</p>
                </div>

                {selected.additionalImages && selected.additionalImages.length > 0 && (
                  <div className="mt-auto pt-8 border-t border-white/10">
                    <h4 className="text-white/80 font-medium text-xs mb-4 uppercase tracking-wider">{t('gallery.morePhotos')}</h4>
                    <div className="grid grid-cols-2 gap-3 md:gap-4">
                      {selected.additionalImages.map((img, idx) => (
                        <div key={idx} className="rounded-xl overflow-hidden ring-1 ring-white/10 h-24 md:h-32 bg-white/5 relative group cursor-pointer">
                          <img src={img} alt={`${selected.titleKey} detail ${idx + 1}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
