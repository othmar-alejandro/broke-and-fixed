'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from '@phosphor-icons/react'
import ScrollReveal from './ScrollReveal'

const projects = [
  {
    title: 'Kitchen Renovation',
    category: 'South Miami Heights',
    image: '/kitchen rennovation - south miami heights /IMG_1852.jpeg',
    description: 'Complete gut and remodel including new custom cabinetry, quartz countertops, and a modern subway tile backsplash. Upgraded lighting and plumbing fixtures to breathe new life into the heart of this South Miami Heights home.',
    additionalImages: [
      '/kitchen rennovation - south miami heights /IMG_1482.jpeg',
      '/kitchen rennovation - south miami heights /IMG_1851.jpeg'
    ],
    span: 'row-span-2',
  },
  {
    title: 'Home Remodeling',
    category: 'South Miami Heights',
    image: '/Home Remodeling - South Miami Heights /IMG_2009.jpeg',
    description: 'Comprehensive interior renovation featuring modernized living spaces, updated flooring, and fresh aesthetic touches throughout. Delivered exactly to the client\'s specifications and completely transformed the property.',
    additionalImages: [
      '/Home Remodeling - South Miami Heights /IMG_1494.jpeg',
      '/Home Remodeling - South Miami Heights /IMG_1917.jpeg'
    ],
    span: '',
  },
  {
    title: 'Exterior Paint',
    category: 'The Hammocks',
    image: '/exterior paint - the hammocks 2/IMG_2051.jpeg',
    description: 'Full exterior prep and paint job. We repaired all stucco damage and sealed all cracks before applying two coats of premium weather-resistant paint to protect and beautify the property for years to come.',
    additionalImages: [
      '/exterior paint - the hammocks 2/IMG_2025.jpeg',
      '/exterior paint - the hammocks 2/IMG_2050.jpeg'
    ],
    span: '',
  },
  {
    title: 'Driveway Clear Coating',
    category: 'Miami-Dade',
    image: '/driveway clear coating/dc339e19-7807-4210-a925-e733da9c60ec.jpg',
    description: 'Professional power washing followed by a high-grade clear coat sealant. This treatment restores the driveway\'s original look while providing long-term protection against Florida\'s harsh sun, rain, and vehicle wear.',
    additionalImages: [
      '/driveway clear coating/d4542e88-d0f8-4321-b00e-9824eff47bc8.jpg'
    ],
    span: '',
  },
  {
    title: 'Chimney Removal',
    category: 'The Crossings',
    image: '/chimney removal - The Crossings/IMG_0984.jpeg',
    description: 'Safe and structural chimney demolition. We carefully removed the old masonry, patched the roof and ceiling, and seamlessly integrated the interior and exterior finishes to look like a chimney was never there.',
    additionalImages: [
      '/chimney removal - The Crossings/IMG_0975.jpeg',
      '/chimney removal - The Crossings/IMG_0980.jpeg'
    ],
    span: 'row-span-2',
  },
  {
    title: 'Exterior Painting',
    category: 'The Hammocks',
    image: '/exterior painting - the hammocks/IMG_1346.jpeg',
    description: 'Another successful exterior transformation in The Hammocks. Thorough pressure washing, crack sealing, and precise application of top-tier exterior paint for a flawless, lasting finish.',
    additionalImages: [
      '/exterior painting - the hammocks/IMG_1344.jpeg',
      '/exterior painting - the hammocks/IMG_1244.jpeg'
    ],
    span: '',
  },
]

export default function Gallery() {
  const [selected, setSelected] = useState(null)

  return (
    <section id="gallery" className="py-28 md:py-40 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <span className="inline-block rounded-full px-4 py-1.5 text-[11px] uppercase tracking-[0.2em] font-semibold bg-sage/8 text-sage ring-1 ring-sage/15 mb-6">
            Recent work
          </span>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-4 mb-16">
          <ScrollReveal delay={0.05}>
            <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tighter leading-[0.95] text-espresso">
              Proof is in
              <br />
              the craft.
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="text-warm-gray text-lg leading-relaxed max-w-[50ch] md:pt-4">
              Real photos from real job sites. No stock images, no renders.
              What you see is exactly what our crew built.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-[240px] gap-3">
          {projects.map((project, i) => (
            <ScrollReveal
              key={project.title}
              delay={i * 0.06}
              className={`${project.span} cursor-pointer`}
            >
              <div
                onClick={() => setSelected(project)}
                className="group relative h-full overflow-hidden rounded-[2rem] bg-espresso/[0.02] ring-1 ring-espresso/5 p-1.5"
              >
                <div className="relative h-full overflow-hidden rounded-[calc(2rem-0.375rem)]">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105"
                   loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-espresso/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]">
                    <p className="text-white/60 text-xs uppercase tracking-widest mb-1">{project.category}</p>
                    <h3 className="text-white font-display font-semibold text-lg tracking-tight">{project.title}</h3>
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-espresso/90 backdrop-blur-2xl flex items-center justify-center p-4 md:p-8"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
              className="relative max-w-6xl w-full h-[90vh] md:h-[80vh] rounded-3xl overflow-hidden bg-espresso-light ring-1 ring-white/10 flex flex-col md:flex-row shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/50 text-white/70 hover:text-white hover:bg-black/70 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Main Image Area */}
              <div className="md:w-[60%] h-[45vh] md:h-full bg-black relative flex items-center justify-center">
                <img
                  src={selected.image}
                  alt={selected.title}
                  className="w-full h-full object-cover"
                 loading="lazy" />
              </div>

              {/* Sidebar Info Area */}
              <div className="md:w-[40%] p-6 md:p-10 overflow-y-auto max-h-[45vh] md:max-h-full flex flex-col bg-espresso">
                <div className="mb-8">
                  <p className="text-sage-muted text-xs uppercase tracking-widest mb-3 font-medium">{selected.category}</p>
                  <h3 className="text-3xl lg:text-4xl font-display font-bold text-white mb-5 leading-tight">{selected.title}</h3>
                  <p className="text-warm-gray leading-relaxed text-sm md:text-base">
                    {selected.description}
                  </p>
                </div>
                
                {selected.additionalImages && selected.additionalImages.length > 0 && (
                  <div className="mt-auto pt-8 border-t border-white/10">
                    <h4 className="text-white/80 font-medium text-xs mb-4 uppercase tracking-wider">Additional Project Photos</h4>
                    <div className="grid grid-cols-2 gap-3 md:gap-4">
                      {selected.additionalImages.map((img, idx) => (
                        <div key={idx} className="rounded-xl overflow-hidden ring-1 ring-white/10 h-24 md:h-32 bg-white/5 relative group cursor-pointer">
                          <img 
                            src={img} 
                            alt={`${selected.title} detail ${idx + 1}`} 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                           loading="lazy" />
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
