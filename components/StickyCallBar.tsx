"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import PhoneLink from "@/components/PhoneLink"
import { trackCtaClick } from "@/lib/analytics"

const PHONE = "(786) 363-7039"

export default function StickyCallBar() {
  const [isVisible, setIsVisible] = useState(false)
  const pathname = usePathname()
  const isEs = pathname === "/es" || pathname?.startsWith("/es/")
  const contactHref = isEs ? "/es#contact" : "/en#contact"

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > 600)
    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Standalone landing pages own their entire funnel. This bar links back to
  // the marketing site homepage, which on a paid landing page is a conversion
  // leak, and it would also be a second sticky CTA competing with that page's.
  if (pathname?.includes("/landing/")) return null

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-espresso text-white flex items-center justify-between px-4 py-3 shadow-[0_-2px_10px_rgba(0,0,0,0.3)]">
        <PhoneLink
          phoneNumber={PHONE}
          displayText={isEs ? "Llame Ahora" : "Call Now"}
          source="mobile_sticky_bar"
          className="flex-1 text-center py-2.5 bg-sage text-white rounded-full font-bold text-sm mr-2"
        />
        <Link
          href={contactHref}
          onClick={() => trackCtaClick("mobile_sticky_free_estimate")}
          className="flex-1 text-center py-2.5 border border-white/30 text-white rounded-full font-bold text-sm ml-2"
        >
          {isEs ? "Presupuesto Gratis" : "Free Estimate"}
        </Link>
      </div>

      <div
        className={`fixed top-0 left-0 right-0 z-[60] hidden md:block transition-all duration-300 ${
          isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <div className="bg-espresso text-white">
          <div className="max-w-7xl mx-auto px-6 py-2.5 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <span className="text-sm font-medium text-white/80">
                {isEs
                  ? "Empresa familiar · Totalmente asegurada · Bilingüe EN/ES · Miami-Dade"
                  : "Family owned · Fully insured · Bilingual EN/ES · Miami-Dade"}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-white/60 hidden lg:inline">
                {isEs ? "Presupuestos gratis. Llame ahora:" : "Free Estimates. Call Now:"}
              </span>
              <PhoneLink
                phoneNumber={PHONE}
                displayText={PHONE}
                source="desktop_sticky_bar"
                className="flex items-center gap-2 bg-sage text-white px-5 py-1.5 rounded-full font-bold text-sm hover:bg-sage-light transition-all"
              />
              <Link
                href={contactHref}
                onClick={() => trackCtaClick("desktop_sticky_free_estimate")}
                className="border border-white/40 text-white px-5 py-1.5 rounded-full font-semibold text-sm hover:bg-white/10 transition-all"
              >
                {isEs ? "Presupuesto Gratis" : "Get Free Estimate"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
