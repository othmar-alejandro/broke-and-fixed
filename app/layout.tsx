import type { Metadata } from "next"
import { Barlow_Condensed, Inter, Montserrat } from "next/font/google"
import "./globals.css"

const fontDisplay = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  variable: "--font-display",
  display: "swap",
})

const fontSans = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
})

const fontAccent = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-accent",
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default:
      "Broke & Fixed Home Solutions | Kitchen & Bathroom Remodeling, Painting | Miami-Dade",
    template: "%s | Broke & Fixed Home Solutions",
  },
  description:
    "Broke & Fixed Home Solutions offers kitchen and bathroom remodeling, interior and exterior painting, tile work, and exterior repairs across Kendall, West Kendall, Palmetto Bay, Doral, and all of Miami-Dade. Family owned, fully insured, zero subcontractors. Call 786-363-7039 for a free estimate.",
  keywords: [
    "home remodeling Miami",
    "kitchen remodeling Kendall",
    "bathroom remodeling Miami-Dade",
    "exterior painting The Hammocks",
    "interior painting Kendall",
    "tile work Miami",
  ],
  metadataBase: new URL("https://brokeandfixed.com"),
  openGraph: {
    title:
      "Broke & Fixed Home Solutions | Kitchen & Bathroom Remodeling, Painting | Miami-Dade",
    description:
      "Kitchen and bathroom remodeling, interior and exterior painting, tile work, and exterior repairs across Miami-Dade. Family owned, fully insured, zero subcontractors.",
    url: "https://brokeandfixed.com",
    siteName: "Broke & Fixed Home Solutions",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Broke & Fixed Home Solutions - Kitchen & Bathroom Remodeling in Miami-Dade",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Broke & Fixed Home Solutions | Miami-Dade Remodeling",
    description:
      "Kitchen and bathroom remodeling, painting, tile work, and exterior repairs across Miami-Dade. Family owned, fully insured.",
    images: ["/og-image.jpg"],
  },
  other: {
    "geo.region": "US-FL",
    "geo.placename": "Miami-Dade County",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${fontSans.variable} ${fontDisplay.variable} ${fontAccent.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
