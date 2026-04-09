'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { ChatCircleDots, WhatsappLogo, X } from '@phosphor-icons/react'

export default function FloatingSMS() {
  const [isVisible, setIsVisible] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300)
    }
    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    if (isOpen) document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])

  return (
    <motion.div
      ref={menuRef}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.8 }}
      transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
      className={`fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 ${isVisible ? 'pointer-events-auto' : 'pointer-events-none'}`}
    >
      {/* Expanded options */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.a
              href="https://wa.me/17863637039"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.8 }}
              transition={{ duration: 0.2, delay: 0.05 }}
              className="flex items-center gap-3 bg-[#25D366] text-white rounded-full pl-5 pr-3 py-2.5 shadow-lg hover:scale-105 active:scale-95 transition-transform"
            >
              <span className="text-sm font-semibold whitespace-nowrap">WhatsApp</span>
              <WhatsappLogo weight="fill" size={24} />
            </motion.a>

            <motion.a
              href="sms:7863637039"
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-3 bg-sage text-white rounded-full pl-5 pr-3 py-2.5 shadow-lg hover:scale-105 active:scale-95 transition-transform"
            >
              <span className="text-sm font-semibold whitespace-nowrap">SMS</span>
              <ChatCircleDots weight="fill" size={24} />
            </motion.a>
          </>
        )}
      </AnimatePresence>

      {/* Main FAB */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-xl hover:scale-110 active:scale-95 transition-all duration-300 ring-2 ring-sage/20"
        aria-label="Contact us"
      >
        {!isOpen && (
          <span className="absolute inline-flex h-full w-full rounded-full bg-sage/40 opacity-75 animate-ping" style={{ animationDuration: '2s' }} />
        )}

        {isOpen ? (
          <X weight="bold" size={24} className="text-espresso relative z-10" />
        ) : (
          <img
            src="/broke-and-fixed-final-logo-Picsart-BackgroundRemover.png"
            alt="Broke & Fixed"
            className="w-10 h-10 object-contain relative z-10"
          />
        )}
      </button>
    </motion.div>
  )
}
