import { MetadataRoute } from 'next'
import { services } from '@/lib/data/services'
import { locations } from '@/lib/data/locations'
import { hoaCommunities } from '@/lib/data/hoa-communities'
import { getAllPosts } from '@/lib/blog'
import { getAllProjects } from '@/lib/gallery'
import { getAllCostPageSlugs } from '@/lib/data/cost-page-data'
import { getAllGuideKeywords } from '@/lib/data/long-tail-data'

const BASE_URL = 'https://brokeandfixed.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  // 1. Homepage
  const homepages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
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

  // 2. Service landing pages (EN + ES)
  const servicePages: MetadataRoute.Sitemap = services.flatMap((service) => [
    {
      url: `${BASE_URL}/services/${service.slug}`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/es/servicios/${service.slugEs}`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
  ])

  // 3. Location pages (EN + ES)
  const locationPages: MetadataRoute.Sitemap = locations.flatMap((location) => [
    {
      url: `${BASE_URL}/locations/${location.slug}`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/es/ubicaciones/${location.slug}`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
  ])

  // 4. Service x Location combo pages (EN + ES)
  const comboPages: MetadataRoute.Sitemap = services.flatMap((service) =>
    locations.flatMap((location) => [
      {
        url: `${BASE_URL}/services/${service.slug}/${location.slug}`,
        lastModified,
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      },
      {
        url: `${BASE_URL}/es/servicios/${service.slugEs}/${location.slug}`,
        lastModified,
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      },
    ])
  )

  // 5. FAQ pages (EN + ES)
  const faqPages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/faq`,
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
        url: `${BASE_URL}/faq/${service.slug}`,
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

  // 6. Blog pages (index EN + ES, individual posts EN + ES)
  const blogPages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/blog`,
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
    ...getAllPosts().flatMap((post) => [
      {
        url: `${BASE_URL}/en/blog/${post.slug}`,
        lastModified,
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      },
      {
        url: `${BASE_URL}/es/blog/${post.slug}`,
        lastModified,
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      },
    ]),
  ]

  // 7. HOA Renovation Guide pages (hub + per-community, EN + ES)
  const hoaHubPages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/hoa-renovation-guide`,
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
      url: `${BASE_URL}/hoa-renovation-guide/${c.slug}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/es/hoa-renovation-guide/${c.slugEs}`,
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

  // 10. Guide pages (EN + ES)
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
