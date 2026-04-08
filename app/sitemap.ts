import { MetadataRoute } from 'next'
import { services } from '@/lib/data/services'
import { locations } from '@/lib/data/locations'

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

  // 5. FAQ pages
  const faqPages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/faq`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    ...services.map((service) => ({
      url: `${BASE_URL}/faq/${service.slug}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ]

  // 6. Blog index
  const blogPages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/blog`,
      lastModified,
      changeFrequency: 'daily',
      priority: 0.7,
    },
  ]

  return [
    ...homepages,
    ...servicePages,
    ...locationPages,
    ...comboPages,
    ...faqPages,
    ...blogPages,
  ]
}
