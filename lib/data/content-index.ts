import { serviceLocationContent } from './service-location-content'
import { serviceLocationContent2 } from './service-location-content-2'
import type { ServiceLocationContent } from './service-location-content'
import { enPillarContent, esPillarContent } from './pillar-content'

export type { ServiceLocationContent }

export const allContent: Record<string, ServiceLocationContent> = {
  ...serviceLocationContent,
  ...serviceLocationContent2,
}

export function getContent(serviceSlug: string, locationSlug: string, locale?: string): ServiceLocationContent | null {
  const key = `${serviceSlug}--${locationSlug}`
  // Phase 3.2 hyperlocal pillar entries override the base content, per locale.
  const overlay = (locale === 'es' ? esPillarContent : enPillarContent)[key]
  return overlay || allContent[key] || null
}
