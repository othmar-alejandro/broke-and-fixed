import { getAllPosts } from "@/lib/blog"

// Static RSS feed, regenerated at build time. Bing, AI search crawlers, and
// feed-based discovery tools pick up new posts from here faster than from
// sitemap recrawls alone.
export const dynamic = "force-static"

const BASE_URL = "https://brokeandfixed.com"

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}

export async function GET() {
  const posts = getAllPosts().slice(0, 20)

  const items = posts
    .map((post) => {
      const url = `${BASE_URL}/en/blog/${post.slug}`
      const pubDate = new Date(post.updated || post.date).toUTCString()
      return `    <item>
      <title>${esc(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${esc(post.description)}</description>
      <pubDate>${pubDate}</pubDate>
      <category>${esc(post.category)}</category>
    </item>`
    })
    .join("\n")

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Broke &amp; Fixed Home Solutions Blog</title>
    <link>${BASE_URL}/en/blog</link>
    <atom:link href="${BASE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
    <description>Bathroom remodeling, kitchen remodeling, painting, and tile guides for Miami-Dade homeowners, in English and Spanish.</description>
    <language>en</language>
    <lastBuildDate>${new Date(posts[0]?.updated || posts[0]?.date || Date.now()).toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>`

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  })
}
