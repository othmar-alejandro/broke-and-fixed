'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { List, X, Phone } from '@phosphor-icons/react'
import { useTranslation } from 'react-i18next'
import i18n from '../i18n'

function LangToggle({ className = '' }) {
  const { i18n: i18nHook } = useTranslation()
  const isES = i18nHook.language === 'es'
  return (
    <button
      onClick={() => i18n.changeLanguage(isES ? 'en' : 'es')}
      className={`relative flex items-center h-8 rounded-full bg-espresso/10 p-0.5 transition-colors duration-300 hover:bg-espresso/20 ${className}`}
      aria-label="Toggle language"
    >
      <span className={`z-10 w-9 text-center text-xs font-bold tracking-wider transition-colors duration-300 ${!isES ? 'text-white' : 'text-espresso/60'}`}>EN</span>
      <span className={`z-10 w-9 text-center text-xs font-bold tracking-wider transition-colors duration-300 ${isES ? 'text-white' : 'text-espresso/60'}`}>ES</span>
      <motion.span
        layout
        transition={{ type: 'spring', stiffness: 500, damping: 35 }}
        className="absolute top-0.5 bottom-0.5 w-9 rounded-full bg-sage shadow-sm"
        style={{ left: isES ? 'calc(50% + 2px)' : '2px' }}
      />
    </button>
  )
}

export default function Navbar() {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    history.replaceState(null, '', window.location.pathname)
  }

  const navLinks = [
    { label: t('nav.services'), id: 'services' },
    { label: t('nav.about'),    id: 'about'    },
    { label: t('nav.gallery'),  id: 'gallery'  },
    { label: t('nav.process'),  id: 'process'  },
    { label: t('nav.contact'),  id: 'contact'  },
  ]

  return (
    <>
      <nav className="absolute top-0 left-0 right-0 z-40 flex items-center justify-center pt-5 px-6">
        <div className="flex items-center justify-between w-full max-w-6xl">
          <a href="/" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); history.replaceState(null, '', window.location.pathname) }}>
            <img src="/broke-and-fixed-final-logo-Picsart-BackgroundRemover.png" alt="Broke & Fixed" className="h-[81px] w-auto" />
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="text-sm font-semibold text-espresso tracking-wide transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-sage-muted"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <LangToggle />
            <a
              href="tel:3053405282"
              className="hidden lg:inline-flex items-center justify-center h-10 px-5 text-sm font-semibold tracking-wide text-white bg-sage rounded-full hover:bg-sage-dark transition-colors duration-300 hover:scale-105 transform ease-[cubic-bezier(0.32,0.72,0,1)] shadow-[0_4px_12px_rgba(111,135,116,0.3)] hover:shadow-[0_6px_16px_rgba(111,135,116,0.4)]"
            >
              {t('nav.callNow')}
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
                <motion.button
                  key={link.id}
                  onClick={() => { scrollTo(link.id); setOpen(false) }}
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
                </motion.button>
              ))}
              <motion.a
                href="tel:3053405282"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.1 + navLinks.length * 0.06,
                  duration: 0.6,
                  ease: [0.32, 0.72, 0, 1],
                }}
                className="mt-4 flex items-center gap-2.5 bg-sage text-white rounded-full pl-6 pr-2 py-2.5 text-lg font-semibold hover:bg-sage-light hover:scale-105 active:scale-[0.98] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]"
              >
                <span>305-340-5282</span>
                <span className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center">
                  <Phone weight="bold" size={16} />
                </span>
              </motion.a>
              <LangToggle className="mt-6" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
