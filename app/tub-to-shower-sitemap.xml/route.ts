import { tubToShowerLocationProfiles } from '@/lib/data/tub-to-shower-locations'

const BASE_URL = 'https://brokeandfixed.com'

export const dynamic = 'force-static'

function xmlUrl(loc: string, priority: string, changefreq: string) {
  return `  <url><loc>${BASE_URL}${loc}</loc><changefreq>${changefreq}</changefreq><priority>${priority}</priority></url>`
}

export function GET() {
  const urls = [
    xmlUrl('/en/landing/tub-to-shower', '0.9', 'weekly'),
    xmlUrl('/es/landing/tub-to-shower', '0.9', 'weekly'),
    xmlUrl('/en/faq/tub-to-shower', '0.7', 'monthly'),
    xmlUrl('/es/faq/tub-to-shower', '0.7', 'monthly'),
    ...tubToShowerLocationProfiles.flatMap(({ slug }) => [
      xmlUrl(`/en/landing/tub-to-shower/${slug}`, '0.8', 'monthly'),
      xmlUrl(`/es/landing/tub-to-shower/${slug}`, '0.8', 'monthly'),
    ]),
  ]

  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  })
}
