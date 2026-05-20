import type { Metadata } from "next"
import { Barlow_Condensed, Inter, Montserrat } from "next/font/google"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": "https://brokeandfixed.com/#organization",
                  name: "Broke & Fixed Home Solutions",
                  url: "https://brokeandfixed.com",
                  logo: "https://brokeandfixed.com/logo.png",
                  telephone: "+1-786-363-7039",
                  email: "brokeandfixed305@gmail.com",
                  sameAs: [
                    "https://www.instagram.com/brokeandfixed/",
                    "https://www.google.com/maps/place/?q=place_id:ChIJ7VSW8vHbAgMRvNWjsiV5kII",
                  ],
                },
                {
                  "@type": "LocalBusiness",
                  "@id": "https://brokeandfixed.com/#localbusiness",
                  name: "Broke & Fixed Home Solutions",
                  url: "https://brokeandfixed.com",
                  telephone: "+1-786-363-7039",
                  email: "brokeandfixed305@gmail.com",
                  address: {
                    "@type": "PostalAddress",
                    addressLocality: "Kendall",
                    addressRegion: "FL",
                    postalCode: "33186",
                    addressCountry: "US",
                  },
                  geo: {
                    "@type": "GeoCoordinates",
                    latitude: 25.6795,
                    longitude: -80.4072,
                  },
                  areaServed: [
                    "Kendall",
                    "West Kendall",
                    "Palmetto Bay",
                    "Doral",
                    "The Hammocks",
                    "The Crossings",
                    "Kendale Lakes",
                    "Sweetwater",
                    "Cutler Bay",
                    "Pinecrest",
                    "South Miami",
                    "South Miami Heights",
                    "Miami Gardens",
                    "Westchester",
                    "Coral Gables",
                    "Country Walk",
                    "Coconut Grove",
                  ],
                  serviceType: [
                    "Kitchen Remodeling",
                    "Bathroom Remodeling",
                    "Interior Painting",
                    "Exterior Painting",
                    "Tile Work",
                    "Exterior Repairs",
                  ],
                  priceRange: "$2,500 - $50,000",
                  openingHours: "Mo-Sa 07:00-18:00",
                },
                {
                  "@type": "WebSite",
                  "@id": "https://brokeandfixed.com/#website",
                  url: "https://brokeandfixed.com",
                  name: "Broke & Fixed Home Solutions",
                  publisher: {
                    "@id": "https://brokeandfixed.com/#organization",
                  },
                  inLanguage: ["en", "es"],
                },
              ],
            }),
          }}
        />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
