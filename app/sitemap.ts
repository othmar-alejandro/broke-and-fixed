import { MetadataRoute } from 'next'
import { services } from '@/lib/data/services'
import { locations } from '@/lib/data/locations'
import { hoaCommunities } from '@/lib/data/hoa-communities'
import { getAllPosts } from '@/lib/blog'
import { getAllProjects } from '@/lib/gallery'
import { getAllCostPageSlugs } from '@/lib/data/cost-page-data'
import { getAllGuideKeywords } from '@/lib/data/long-tail-data'

const BASE_URL = 'https://brokeandfixed.com'

// All real routes live under /[locale]/... where [locale] is "en" or "es".
// Path segments stay English (services, locations, blog, faq, cost, gallery,
// hoa-renovation-guide). Only the SLUG changes per locale where applicable
// (e.g., services have separate slugs in EN/ES).

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  // 1. Homepage (root redirects to /en, plus explicit /en and /es)
  const homepages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/en`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/es`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
  ]

  // 2. Service landing pages (EN + ES) — path is /services/ in both locales
  const servicePages: MetadataRoute.Sitemap = services.flatMap((service) => [
    {
      url: `${BASE_URL}/en/services/${service.slug}`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/es/services/${service.slugEs}`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
  ])

  // 3. Location pages (EN + ES) — path is /locations/ in both locales
  const locationPages: MetadataRoute.Sitemap = locations.flatMap((location) => [
    {
      url: `${BASE_URL}/en/locations/${location.slug}`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/es/locations/${location.slug}`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
  ])

  // 4. Service x Location combo pages (EN + ES) — 7 services x 17 locations x 2 locales
  const comboPages: MetadataRoute.Sitemap = services.flatMap((service) =>
    locations.flatMap((location) => [
      {
        url: `${BASE_URL}/en/services/${service.slug}/${location.slug}`,
        lastModified,
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      },
      {
        url: `${BASE_URL}/es/services/${service.slugEs}/${location.slug}`,
        lastModified,
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      },
    ])
  )

  // 5. FAQ pages (EN + ES)
  const faqPages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/en/faq`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/es/faq`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    ...services.flatMap((service) => [
      {
        url: `${BASE_URL}/en/faq/${service.slug}`,
        lastModified,
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      },
      {
        url: `${BASE_URL}/es/faq/${service.slugEs}`,
        lastModified,
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      },
    ]),
  ]

  // 6. Blog pages (index + individual posts, EN + ES)
  const blogPages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/en/blog`,
      lastModified,
      changeFrequency: 'daily',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/es/blog`,
      lastModified,
      changeFrequency: 'daily',
      priority: 0.7,
    },
    // Real dates per post: engines learn to trust lastmod only when it does
    // not change on every deploy. updated > date > build time.
    ...getAllPosts().flatMap((post) => {
      const postModified = post.updated || post.date ? new Date(post.updated || post.date) : lastModified
      return [
        {
          url: `${BASE_URL}/en/blog/${post.slug}`,
          lastModified: postModified,
          changeFrequency: 'weekly' as const,
          priority: 0.7,
        },
        {
          url: `${BASE_URL}/es/blog/${post.slug}`,
          lastModified: postModified,
          changeFrequency: 'weekly' as const,
          priority: 0.7,
        },
      ]
    }),
  ]

  // 7. HOA Renovation Guide (hub + per-community, EN + ES)
  const hoaHubPages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/en/hoa-renovation-guide`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/es/hoa-renovation-guide`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
  ]

  const hoaCommunityPages: MetadataRoute.Sitemap = hoaCommunities.flatMap((c) => [
    {
      url: `${BASE_URL}/en/hoa-renovation-guide/${c.slug}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/es/hoa-renovation-guide/${c.slug}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
  ])

  // 8. Gallery pages (index + individual projects, EN + ES)
  const galleryPages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/en/gallery`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/es/gallery`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    },
    ...getAllProjects().flatMap((project) => [
      {
        url: `${BASE_URL}/en/gallery/${project.slug}`,
        lastModified,
        changeFrequency: 'monthly' as const,
        priority: 0.5,
      },
      {
        url: `${BASE_URL}/es/gallery/${project.slug}`,
        lastModified,
        changeFrequency: 'monthly' as const,
        priority: 0.5,
      },
    ]),
  ]

  // 9. Cost guide pages (EN + ES)
  const costGuidePages: MetadataRoute.Sitemap = getAllCostPageSlugs().flatMap((slug) => [
    {
      url: `${BASE_URL}/en/cost/${slug}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/es/cost/${slug}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
  ])

  // 10. Long-tail guide pages (EN + ES)
  const guidePages: MetadataRoute.Sitemap = getAllGuideKeywords().flatMap((keyword) => [
    {
      url: `${BASE_URL}/en/guides/${keyword}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/es/guides/${keyword}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
  ])

  // 11. Custom/specialty pages (EN + ES)
  const specialtyPages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/en/cabinet-painting`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/es/cabinet-painting`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/en/premium-bathroom`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/es/premium-bathroom`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/en/home-security`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/es/home-security`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
  ]

  return [
    ...homepages,
    ...servicePages,
    ...locationPages,
    ...comboPages,
    ...faqPages,
    ...blogPages,
    ...hoaHubPages,
    ...hoaCommunityPages,
    ...galleryPages,
    ...costGuidePages,
    ...guidePages,
    ...specialtyPages,
  ]
}
