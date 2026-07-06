import { MetadataRoute } from "next"

// Policy: allow search engines and AI *search* crawlers (they send visitors),
// block training-only crawlers and SEO scrapers. Keep in sync with CLAUDE.md.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: [
          "Googlebot",
          "Bingbot",
          "Applebot",
          "DuckDuckBot",
          "Slurp",
          "Baiduspider",
          "YandexBot",
        ],
        allow: "/",
      },
      {
        userAgent: [
          "OAI-SearchBot",
          "ChatGPT-User",
          "PerplexityBot",
          "Perplexity-User",
          "ClaudeBot",
          "Claude-SearchBot",
          "Claude-User",
          "Amazonbot",
          "MistralAI-User",
        ],
        allow: "/",
      },
      {
        userAgent: [
          "GPTBot",
          "CCBot",
          "Google-Extended",
          "anthropic-ai",
          "cohere-ai",
          "Applebot-Extended",
          "Bytespider",
          "PetalBot",
          "MJ12bot",
          "SemrushBot",
          "AhrefsBot",
        ],
        disallow: "/",
      },
    ],
    sitemap: "https://brokeandfixed.com/sitemap.xml",
    host: "https://brokeandfixed.com",
  }
}
