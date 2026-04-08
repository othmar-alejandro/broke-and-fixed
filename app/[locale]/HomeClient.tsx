'use client'
import '@/lib/i18n'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'next/navigation'
import Navbar from '@/app/components/Navbar'
import Hero from '@/app/components/Hero'
import Services from '@/app/components/Services'
import About from '@/app/components/About'
import Gallery from '@/app/components/Gallery'
import Process from '@/app/components/Process'
import Testimonials from '@/app/components/Testimonials'
import Contact from '@/app/components/Contact'
import Footer from '@/app/components/Footer'
import FloatingSMS from '@/app/components/FloatingSMS'

export default function HomeClient() {
  const params = useParams()
  const locale = params.locale as string
  const { i18n } = useTranslation()

  useEffect(() => {
    if (locale && i18n.language !== locale) {
      i18n.changeLanguage(locale)
    }
  }, [locale, i18n])

  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <Hero />
      <Services />
      <About />
      <Gallery />
      <Process />
      <Testimonials />
      <Contact />
      <Footer />
      <FloatingSMS />
    </div>
  )
}
