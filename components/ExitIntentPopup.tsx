"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import PhoneLink from "@/components/PhoneLink"
import { trackCtaClick } from "@/lib/analytics"

const COOKIE_KEY = "bf_exit_intent_shown"
const READY_DELAY_MS = 30_000

export default function ExitIntentPopup() {
  const [open, setOpen] = useState(false)
  const [armed, setArmed] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return
    if (window.matchMedia("(max-width: 768px)").matches) return
    if (sessionStorage.getItem(COOKIE_KEY) === "1") return

    const armTimer = window.setTimeout(() => setArmed(true), READY_DELAY_MS)
    return () => window.clearTimeout(armTimer)
  }, [])

  useEffect(() => {
    if (!armed) return

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        setOpen(true)
        sessionStorage.setItem(COOKIE_KEY, "1")
        document.removeEventListener("mouseleave", handleMouseLeave)
      }
    }

    document.addEventListener("mouseleave", handleMouseLeave)
    return () => document.removeEventListener("mouseleave", handleMouseLeave)
  }, [armed])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={() => setOpen(false)}
    >
      <div
        className="relative w-full max-w-lg bg-cream rounded-3xl p-8 md:p-10 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setOpen(false)}
          className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-espresso/5 hover:bg-espresso/10 transition-colors text-espresso"
          aria-label="Close"
        >
          &times;
        </button>

        <div className="text-xs uppercase tracking-[0.2em] text-sage font-bold mb-3">
          Wait, before you go
        </div>
        <h3 className="font-display text-3xl md:text-4xl font-bold text-espresso leading-[0.95] mb-3">
          $250 off your first project
        </h3>
        <p className="text-espresso/70 text-base leading-relaxed mb-6">
          Kitchen, bathroom, painting, or tile. Mention this offer when you call or fill out the form.
          We respond within 15 minutes.
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <PhoneLink
            phoneNumber="(786) 363-7039"
            displayText="Call (786) 363-7039"
            source="exit_intent_popup"
            className="flex-1 text-center bg-sage text-white px-6 py-3 rounded-full font-bold text-sm hover:bg-sage-light transition-all"
          />
          <Link
            href="/#contact"
            onClick={() => {
              trackCtaClick("exit_intent_free_quote")
              setOpen(false)
            }}
            className="flex-1 text-center border border-espresso/20 text-espresso px-6 py-3 rounded-full font-semibold text-sm hover:bg-espresso/5 transition-all"
          >
            Get Free Quote
          </Link>
        </div>

        <p className="text-xs text-espresso/40 mt-5 text-center">
          Fully insured. Bilingual EN/ES. Family owned, based in Kendall.
        </p>
      </div>
    </div>
  )
}
