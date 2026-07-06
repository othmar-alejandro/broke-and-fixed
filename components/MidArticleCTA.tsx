import Link from "next/link"
import PhoneLink from "@/components/PhoneLink"

interface MidArticleCTAProps {
  headline?: string
  subhead?: string
  source?: string
  locale?: "en" | "es"
}

export default function MidArticleCTA({
  headline,
  subhead,
  source = "mid_article_cta",
  locale = "en",
}: MidArticleCTAProps) {
  const isEs = locale === "es"
  const resolvedHeadline =
    headline ?? (isEs ? "Planeando una remodelación en Miami?" : "Planning a Miami remodel?")
  const resolvedSubhead =
    subhead ??
    (isEs
      ? "Presupuesto gratis en casa. Respondemos en 15 minutos."
      : "Free in-home estimate. We respond within 15 minutes.")

  return (
    <div className="bg-espresso text-white rounded-2xl p-8 my-12 text-center">
      <p className="font-display text-2xl md:text-3xl font-bold mb-2">{resolvedHeadline}</p>
      <p className="text-white/70 text-sm mb-6">{resolvedSubhead}</p>
      <div className="flex flex-col md:flex-row gap-3 justify-center">
        <PhoneLink
          phoneNumber="(786) 363-7039"
          displayText={isEs ? "Llame (786) 363-7039" : "Call (786) 363-7039"}
          source={source}
          className="bg-sage text-white px-6 py-3 rounded-full font-bold text-sm hover:bg-sage-light transition-all"
        />
        <Link
          href={isEs ? "/es#contact" : "/en#contact"}
          className="border border-white/40 text-white px-6 py-3 rounded-full font-semibold text-sm hover:bg-white/10 transition-all"
        >
          {isEs ? "Solicitar Presupuesto Gratis" : "Request Free Estimate"}
        </Link>
      </div>
    </div>
  )
}
