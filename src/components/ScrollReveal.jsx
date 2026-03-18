'use client'
import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ScrollReveal({ children, className = '', delay = 0 }) {
  const container = useRef()

  useGSAP(() => {
    gsap.fromTo(
      container.current,
      { opacity: 0, y: 40, filter: 'blur(8px)' },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.9,
        delay: delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: container.current,
          start: 'top 85%',
          once: true
        }
      }
    )
  }, { scope: container })

  return (
    <div ref={container} className={className}>
      {children}
    </div>
  )
}
