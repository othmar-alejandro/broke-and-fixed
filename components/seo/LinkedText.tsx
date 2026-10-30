import Link from "next/link"
import { services } from "@/lib/data/services"

// Content strings carry links as [label](href). Hrefs starting with "/" are
// site paths written without the locale; external hrefs are source citations.
const LINK = /\[([^\]]+)\]\(([^)\s]+)\)/g

/** Drops link markup, for JSON-LD, meta descriptions and other plain text. */
export function stripLinks(text: string) {
  return text.replace(LINK, "$1")
}

function localPath(href: string, locale: string) {
  const svc = href.match(/^\/services\/([^/]+)(.*)$/)
  if (svc && locale === "es") {
    const s = services.find((x) => x.slug === svc[1])
    if (s) return `/es/services/${s.slugEs}${svc[2]}`
  }
  return `/${locale}${href}`
}

export default function LinkedText({ text, locale }: { text: string; locale: string }) {
  const out: React.ReactNode[] = []
  let last = 0
  for (const m of text.matchAll(LINK)) {
    out.push(text.slice(last, m.index))
    const [, label, href] = m
    out.push(
      href.startsWith("/") ? (
        <Link key={m.index} href={localPath(href, locale)}>{label}</Link>
      ) : (
        <a key={m.index} href={href} target="_blank" rel="noopener">{label}</a>
      ),
    )
    last = m.index! + m[0].length
  }
  out.push(text.slice(last))
  return <>{out}</>
}
