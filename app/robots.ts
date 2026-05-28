import { MetadataRoute } from "next"

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
          "Applebot-Extended",
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
          "GPTBot",
          "PerplexityBot",
          "Perplexity-User",
          "ClaudeBot",
          "Claude-SearchBot",
          "Claude-User",
          "Google-Extended",
          "anthropic-ai",
          "cohere-ai",
          "Amazonbot",
          "MistralAI-User",
        ],
        allow: "/",
      },
      {
        userAgent: ["Bytespider", "PetalBot", "MJ12bot", "SemrushBot", "AhrefsBot"],
        disallow: "/",
      },
    ],
    sitemap: "https://brokeandfixed.com/sitemap.xml",
    host: "https://brokeandfixed.com",
  }
}
