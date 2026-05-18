import { kitchenGuides } from './long-tail-kitchen'
import { bathroomGuides } from './long-tail-bathroom'
import { generalGuides } from './long-tail-general'

export type { GuidePage, GuideSection, GuideFAQ } from './long-tail-kitchen'

const allGuides = {
  ...kitchenGuides,
  ...bathroomGuides,
  ...generalGuides,
}

export function getGuidePage(keyword: string) {
  return allGuides[keyword] || null
}

export function getAllGuideKeywords(): string[] {
  return Object.keys(allGuides)
}
