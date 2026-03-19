import { ChatCircleDots } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function FloatingSMS() {
  const [isVisible, setIsVisible] = useState(false)

  // Show after scrolling down a bit
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.8 }}
      transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
      className={`fixed bottom-6 right-6 z-50 ${isVisible ? 'pointer-events-auto' : 'pointer-events-none'}`}
    >
      <a
        href="sms:3053405282"
        className="group relative flex items-center justify-center w-14 h-14 bg-sage rounded-full shadow-xl hover:bg-sage-dark hover:scale-110 active:scale-95 transition-all duration-300"
        aria-label="Send us a text message"
      >
        {/* Radar Ping Animation */}
        <span className="absolute inline-flex h-full w-full rounded-full bg-sage/60 opacity-75 animate-ping" style={{ animationDuration: '2s' }}></span>
        
        <ChatCircleDots weight="fill" size={28} className="text-white relative z-10" />
        
        {/* Tooltip */}
        <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-espresso text-white text-xs font-medium rounded-lg opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 whitespace-nowrap pointer-events-none after:content-[''] after:absolute after:top-1/2 after:-translate-y-1/2 after:-right-1 after:border-4 after:border-transparent after:border-l-espresso">
          Text us directly!
        </span>
      </a>
    </motion.div>
  )
}
