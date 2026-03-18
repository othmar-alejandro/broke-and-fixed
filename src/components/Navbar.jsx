'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { List, X, Phone } from '@phosphor-icons/react'

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <nav className="absolute top-0 left-0 right-0 z-40 flex items-center justify-center pt-5 px-6">
        <div className="flex items-center justify-between w-full max-w-6xl">
          <a href="#">
            <img src="/broke-and-fixed-final-logo-Picsart-BackgroundRemover.jpeg" alt="Broke & Fixed" className="h-[68px] w-auto" />
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-semibold text-espresso tracking-wide transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-sage-muted"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <a
              href="tel:+13058471928"
              className="group flex items-center gap-2.5 bg-sage text-white rounded-full pl-5 pr-1.5 py-1.5 text-sm font-semibold transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-sage-light active:scale-[0.98]"
            >
              <span>Get a Quote</span>
              <span className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:scale-105">
                <Phone weight="bold" size={14} />
              </span>
            </a>
          </div>

          <button
            onClick={() => setOpen(true)}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm"
            aria-label="Open menu"
          >
            <List weight="bold" size={20} className="text-white" />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
            className="fixed inset-0 z-50 bg-cream/95 backdrop-blur-3xl flex flex-col items-center justify-center"
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center rounded-full bg-espresso/5"
              aria-label="Close menu"
            >
              <X weight="bold" size={22} className="text-espresso" />
            </button>

            <div className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.1 + i * 0.06,
                    duration: 0.6,
                    ease: [0.32, 0.72, 0, 1],
                  }}
                  className="font-display text-4xl font-semibold text-espresso tracking-tight"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="tel:+13128471928"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.1 + navLinks.length * 0.06,
                  duration: 0.6,
                  ease: [0.32, 0.72, 0, 1],
                }}
                className="mt-4 flex items-center gap-2.5 bg-sage text-white rounded-full pl-6 pr-2 py-2.5 text-lg font-semibold"
              >
                <span>+1 (312) 847-1928</span>
                <span className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center">
                  <Phone weight="bold" size={16} />
                </span>
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
