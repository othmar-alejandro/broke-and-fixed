import Link from "next/link"
// This route renders outside app/[locale] and app/(redirects), so it gets
// Next's generated root layout instead of one of ours. That layout imports
// no CSS, which left the 404 page unstyled. Importing the stylesheet here is
// what gets Tailwind onto the page.
import "./globals.css"

// Trade Orange is a raw hex in globals.css, not a @theme token, so it has no
// bg-/text- utility. Arbitrary values keep the brand color without inventing
// a token that the rest of the site does not use.
const ORANGE = "#F07A1A"

const services = [
  { href: "/en/services/kitchen-remodeling", label: "Kitchen Remodeling" },
  { href: "/en/services/bathroom-remodeling", label: "Bathroom Remodeling" },
  { href: "/en/services/interior-painting", label: "Interior Painting" },
  { href: "/en/services/exterior-painting", label: "Exterior Painting" },
]

export default function NotFound() {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4 py-16">
      <div className="max-w-lg text-center">
        <h1 className="font-display text-6xl font-bold text-espresso mb-4">404</h1>
        <p className="text-xl text-warm-gray mb-8">
          This page doesn&apos;t exist. It may have been moved or removed.
        </p>

        <Link
          href="/en"
          style={{ backgroundColor: ORANGE }}
          className="block rounded-lg px-8 py-3 font-display text-lg font-bold text-white transition hover:opacity-90"
        >
          Go to Homepage
        </Link>

        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {services.map((service) => (
            <Link
              key={service.href}
              href={service.href}
              className="font-medium text-sage transition hover:text-espresso"
            >
              {service.label}
            </Link>
          ))}
        </div>

        <p className="mt-8 text-warm-gray">
          Need help? Call{" "}
          <a href="tel:+17863637039" style={{ color: ORANGE }} className="font-semibold">
            (786) 363-7039
          </a>
        </p>

        {/* This route never receives the LegalFooter mounted in the [locale]
            layout, so the links are repeated here. No page ships without them. */}
        <nav
          aria-label="Legal links"
          className="mt-10 flex items-center justify-center gap-4 border-t border-espresso/10 pt-6 text-xs text-warm-gray-light"
        >
          <Link href="/en/privacy" className="underline underline-offset-2 transition hover:text-espresso">
            Privacy Notice
          </Link>
          <Link href="/en/terms" className="underline underline-offset-2 transition hover:text-espresso">
            Terms of Service
          </Link>
        </nav>
      </div>
    </div>
  )
}
