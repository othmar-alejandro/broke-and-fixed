"use client"

import { ReactNode } from "react"
import { trackPhoneClick } from "@/lib/analytics"

interface PhoneLinkProps {
  phoneNumber: string
  displayText?: string
  className?: string
  source?: string
  children?: ReactNode
  ariaLabel?: string
}

export default function PhoneLink({
  phoneNumber,
  displayText,
  className,
  source = "unknown",
  children,
  ariaLabel,
}: PhoneLinkProps) {
  const telLink = `tel:${phoneNumber.replace(/[^0-9+]/g, "")}`

  return (
    <a
      href={telLink}
      onClick={() => trackPhoneClick(phoneNumber, source)}
      className={className}
      aria-label={ariaLabel || `Call ${displayText || phoneNumber}`}
    >
      {children || displayText || phoneNumber}
    </a>
  )
}
