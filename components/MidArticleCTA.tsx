import Link from "next/link"
import PhoneLink from "@/components/PhoneLink"

interface MidArticleCTAProps {
  headline?: string
  subhead?: string
  source?: string
}

export default function MidArticleCTA({
  headline = "Planning a Miami remodel?",
  subhead = "Free in-home estimate. We respond within 15 minutes.",
  source = "mid_article_cta",
}: MidArticleCTAProps) {
  return (
    <div className="bg-espresso text-white rounded-2xl p-8 my-12 text-center">
      <p className="font-display text-2xl md:text-3xl font-bold mb-2">{headline}</p>
      <p className="text-white/70 text-sm mb-6">{subhead}</p>
      <div className="flex flex-col md:flex-row gap-3 justify-center">
        <PhoneLink
          phoneNumber="(786) 363-7039"
          displayText="Call (786) 363-7039"
          source={source}
          className="bg-sage text-white px-6 py-3 rounded-full font-bold text-sm hover:bg-sage-light transition-all"
        />
        <Link
          href="/#contact"
          className="border border-white/40 text-white px-6 py-3 rounded-full font-semibold text-sm hover:bg-white/10 transition-all"
        >
          Request Free Estimate
        </Link>
      </div>
    </div>
  )
}
