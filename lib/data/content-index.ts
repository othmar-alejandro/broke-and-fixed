import { serviceLocationContent } from './service-location-content'
import { serviceLocationContent2 } from './service-location-content-2'
import type { ServiceLocationContent } from './service-location-content'

export type { ServiceLocationContent }

export const allContent: Record<string, ServiceLocationContent> = {
  ...serviceLocationContent,
  ...serviceLocationContent2,
}

export function getContent(serviceSlug: string, locationSlug: string): ServiceLocationContent | null {
  return allContent[`${serviceSlug}--${locationSlug}`] || null
}
