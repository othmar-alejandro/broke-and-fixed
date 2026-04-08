import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        userAgent: ['Googlebot', 'Bingbot', 'Applebot', 'PerplexityBot', 'OAI-SearchBot', 'ClaudeBot'],
        allow: '/',
      },
      {
        userAgent: ['GPTBot', 'CCBot', 'Google-Extended', 'anthropic-ai', 'Bytespider', 'cohere-ai'],
        disallow: '/',
      },
    ],
    sitemap: 'https://brokeandfixed.com/sitemap.xml',
  }
}
