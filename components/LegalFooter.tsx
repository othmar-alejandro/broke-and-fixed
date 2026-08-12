import Link from "next/link"

/**
 * Site-wide legal strip. Mounted once in app/[locale]/layout.tsx so every
 * route carries the Privacy and Terms links, including landing pages and
 * one-off routes that render no other footer. Do not duplicate it inside a
 * page: the layout already covers that page.
 *
 * The bottom padding clears StickyCallBar, which is fixed to the bottom of
 * the viewport on mobile.
 */
export default function LegalFooter({ locale }: { locale: string }) {
  const es = locale === "es"
  const prefix = `/${es ? "es" : "en"}`

  return (
    <div className="border-t border-[#0f1f35]/10 bg-[#f8f9fc] px-5 pb-24 pt-6 text-[#52647b] md:pb-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
        <p className="text-xs">
          &copy; {new Date().getFullYear()} Broke &amp; Fixed Home Solutions.{" "}
          {es ? "Todos los derechos reservados." : "All rights reserved."}
        </p>

        <nav
          aria-label={es ? "Enlaces legales" : "Legal links"}
          className="flex items-center gap-4 text-xs"
        >
          <Link
            href={`${prefix}/privacy`}
            className="underline underline-offset-2 transition-colors hover:text-[#0f1f35]"
          >
            {es ? "Aviso de privacidad" : "Privacy Notice"}
          </Link>
          <Link
            href={`${prefix}/terms`}
            className="underline underline-offset-2 transition-colors hover:text-[#0f1f35]"
          >
            {es ? "Términos de servicio" : "Terms of Service"}
          </Link>
        </nav>
      </div>
    </div>
  )
}
