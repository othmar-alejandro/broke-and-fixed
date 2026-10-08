/**
 * Real job photos for service pages. Every path here must exist under /public.
 * A step with no entry renders without an image, so no empty boxes.
 */

import { getProjectBySlug, type GalleryProject } from "@/lib/gallery"

export interface StepPhoto {
  src: string
  alt: string
}

const SMH = "/Home Remodeling - South Miami Heights "
const SMH_KITCHEN = `${SMH}/kitchen rennovation - south miami heights `

/** serviceSlug -> step number -> photo */
export const processPhotos: Record<string, Record<number, StepPhoto>> = {
  "bathroom-remodeling": {
    3: { src: "/images/glenvar-demo.jpeg", alt: "Bathroom remodeling demolition down to the studs in Glenvar Heights" },
    4: { src: "/images/glenvar-waterproofing.jpeg", alt: "Shower waterproofing before tile on a bathroom remodel in Glenvar Heights" },
    5: { src: "/images/glenvar-after-1.jpeg", alt: "New floating vanity and LED mirror on a bathroom remodel in Glenvar Heights" },
    6: { src: "/images/glenvar-after-2.jpeg", alt: "Finished walk-in shower on a bathroom remodel in Glenvar Heights" },
  },
  "kitchen-remodeling": {
    3: { src: "/demolition project - miami gardens/kitchen-demolition-in-process.jpeg", alt: "Kitchen remodeling demolition in Miami Gardens" },
    4: { src: `${SMH}/kitchen-drywall-installed.jpeg`, alt: "New drywall behind the cabinets on a kitchen remodel in South Miami Heights" },
    5: { src: `${SMH_KITCHEN}/kitchen-rennovation-in-process.jpeg`, alt: "White shaker cabinets installed on a kitchen remodel in South Miami Heights" },
    6: { src: `${SMH_KITCHEN}/kitchen-countertop-cutting-and-leveling.jpeg`, alt: "Countertop cut and leveled on a kitchen remodel in South Miami Heights" },
    7: { src: "/images/lakes-meadows-kitchen-after-1.jpg", alt: "Finished two-tone kitchen remodel in Lakes of the Meadow" },
  },
  "interior-painting": {
    2: { src: "/images/bedroom-ceiling-paint-progress-1.jpg", alt: "Furniture wrapped and floors covered before interior painting in Miami" },
    3: { src: `${SMH}/drywall-compunding.jpeg`, alt: "Drywall patched and compounded before interior painting in South Miami Heights" },
    4: { src: "/images/interior-painting-rolling-walls.jpg", alt: "Rolling the first coat on an interior painting job in Miami" },
    5: { src: `${SMH}/diningroom2-painted.jpeg`, alt: "Finished interior painting in South Miami Heights" },
  },
  "exterior-painting": {
    2: { src: "/exterior painting - the hammocks/washing-walls-before-painting.jpeg", alt: "Mildew on stucco before pressure washing for exterior painting in The Hammocks" },
    5: { src: "/exterior painting - the hammocks/painting-house-process.jpeg", alt: "Exterior painting in progress on a house in The Hammocks" },
    6: { src: "/exterior paint - the hammocks 2/Garage-door-painting-hammocks2.jpeg", alt: "Garage door painted during exterior painting in The Hammocks" },
  },
  "tile-work": {
    2: { src: "/images/porcelain-floor-install-before-1.jpg", alt: "Slab ground down before tile work in Miami" },
    3: { src: "/images/covered-patio-tile-progress-1.jpg", alt: "Setting and leveling porcelain tile on a patio in Miami" },
    5: { src: "/images/porcelain-floor-install-after-1.jpg", alt: "Finished marble-look porcelain tile floor in Miami" },
  },
  "exterior-repairs": {
    4: { src: "/images/tiki-hut-paver-pad-progress-1.jpg", alt: "Leveling the base and setting pavers on an exterior repair job in Miami" },
    5: { src: "/driveway clear coating/driveway-sealant-completed.jpg", alt: "Paver driveway sealed on an exterior repair job in Miami" },
  },
  "cabinet-refinishing": {
    1: { src: "/images/lakes-meadows-kitchen-before-1.jpg", alt: "Dark kitchen cabinets before cabinet painting in Lakes of the Meadow" },
    6: { src: "/images/lakes-meadows-kitchen-after-2.jpg", alt: "Green painted island with gold pulls after cabinet painting in Lakes of the Meadow" },
  },
}

/** serviceSlug -> hero photo (portrait frame) */
export const serviceHeroPhotos: Record<string, string> = {
  "bathroom-remodeling": "/images/glenvar-after-1.jpeg",
  "kitchen-remodeling": "/images/lakes-meadows-kitchen-after-1.jpg",
  "interior-painting": "/images/two-story-wall-repair-paint-after-1.jpg",
  "exterior-painting": "/exterior paint - the hammocks 2/exterior-paint-hammocks-2-tall-entrance.jpeg",
  "tile-work": "/images/porcelain-floor-install-after-1.jpg",
  "exterior-repairs": "/images/tiki-hut-paver-pad-after-1.jpg",
  "cabinet-refinishing": "/images/lakes-meadows-kitchen-after-2.jpg",
}

/** serviceSlug -> gallery project slugs shown in its Before and After section */
const serviceProjectSlugs: Record<string, string[]> = {
  "bathroom-remodeling": ["glenvar-heights-bathroom-remodel", "south-miami-heights-hall-bath", "walk-in-shower-sliding-glass", "green-tiles-bathroom-kendall", "low-threshold-shower-grab-bars"],
  "kitchen-remodeling": ["white-shaker-kitchen-rebuild", "two-tone-kitchen-lakes-meadows"],
  "interior-painting": ["two-story-wall-repair-paint", "south-miami-heights-drywall-paint", "bedroom-ceiling-paint"],
  "exterior-painting": ["hammocks-roof-cleaning-paint-prep", "hammocks-exterior-paint"],
  "tile-work": ["porcelain-floor-install", "glenvar-heights-bathroom-remodel", "covered-patio-tile"],
  "exterior-repairs": ["tiki-hut-paver-pad", "paver-driveway-clear-coat"],
  "cabinet-refinishing": ["two-tone-kitchen-lakes-meadows", "laundry-room-cabinets"],
}

export function getServiceProjects(serviceSlug: string): GalleryProject[] {
  return (serviceProjectSlugs[serviceSlug] || [])
    .map((slug) => getProjectBySlug(slug))
    .filter((p): p is GalleryProject => p !== null)
}
