export interface ServiceImageData {
  hero: string;
  gallery: string[];
  icon: string;
  heroAlt: string;
}

export const serviceImages: Record<string, ServiceImageData> = {
  bathroom: {
    hero: "/Home Remodeling - South Miami Heights /bathroom2-shower-after.jpeg",
    gallery: [
      "/Home Remodeling - South Miami Heights /bathroom-faucets-replacement.jpeg",
      "/Home Remodeling - South Miami Heights /bathroom-plumbing-and-tile-renewal.jpeg",
      "/Home Remodeling - South Miami Heights /bathroom2-before.jpeg",
    ],
    icon: "/services/bathroom.png",
    heroAlt:
      "Bathroom remodeling completed shower renovation in South Miami Heights",
  },

  kitchen: {
    hero: "/Home Remodeling - South Miami Heights /kitchen rennovation - south miami heights /new-kitchen-countertop.jpg",
    gallery: [
      "/Home Remodeling - South Miami Heights /kitchen rennovation - south miami heights /kitchen-rennovation-in-process-setting-appliances.jpeg",
      "/Home Remodeling - South Miami Heights /kitchen rennovation - south miami heights /kitchen-rennovation-in-process.jpeg",
      "/Home Remodeling - South Miami Heights /kitchen rennovation - south miami heights /kitchen-rennovation-in-process-2.jpeg",
      "/Home Remodeling - South Miami Heights /kitchen rennovation - south miami heights /kitchen-countertop-cutting-and-leveling.jpeg",
      "/Home Remodeling - South Miami Heights /kitchen rennovation - south miami heights /kitchen-rennovation-with-appliances-in-process.jpeg",
    ],
    icon: "/services/kitchen.png",
    heroAlt:
      "New kitchen countertop installation during kitchen renovation in South Miami Heights",
  },

  "interior-painting": {
    hero: "/Home Remodeling - South Miami Heights /diningroom2-painted.jpeg",
    gallery: [
      "/Home Remodeling - South Miami Heights /compounding-corners.jpeg",
      "/Home Remodeling - South Miami Heights /drywall-compounding2.jpeg",
    ],
    icon: "/services/interior-painting.png",
    heroAlt:
      "Interior painting completed dining room in South Miami Heights home",
  },

  "exterior-painting": {
    hero: "/exterior paint - the hammocks 2/exterior-paint-hammocks-2-tall-entrance.jpeg",
    gallery: [
      "/exterior paint - the hammocks 2/exterior-paint-hammocks-2-wall-backyard.jpeg",
      "/exterior paint - the hammocks 2/exterior-paint-hammocks-2-wall-alley.jpeg",
      "/exterior paint - the hammocks 2/Garage-door-painting-hammocks2.jpeg",
      "/exterior paint - the hammocks 2/exterior-paint-hammocks-2-top-sofit.jpeg",
      "/exterior paint - the hammocks 2/exterior-paint-hammocks-2-ladder.jpeg",
    ],
    icon: "/services/exterior-painting.png",
    heroAlt:
      "Exterior house painting tall entrance finished in The Hammocks Miami",
  },

  "tile-work": {
    hero: "/Home Remodeling - South Miami Heights /bathroom-plumbing-and-tile-renewal.jpeg",
    gallery: [
      "/Home Remodeling - South Miami Heights /kitchen rennovation - south miami heights /kitchen-countertop-cutting-and-leveling.jpeg",
      "/Home Remodeling - South Miami Heights /drywall-installation-living-room.jpeg",
    ],
    icon: "/services/tile-work.png",
    heroAlt:
      "Tile installation and renewal work for bathroom remodel in South Miami Heights",
  },

  "exterior-repairs": {
    hero: "/driveway clear coating/driveway-sealant-completed.jpg",
    gallery: [
      "/Home Remodeling - South Miami Heights /demolishing-drywall-with-mold.jpeg",
      "/Home Remodeling - South Miami Heights /demolishing-drywall-2.jpeg",
      "/Home Remodeling - South Miami Heights /front-door-before.jpeg",
      "/driveway clear coating/driveway-sealant.jpg",
    ],
    icon: "/services/exterior-repairs.png",
    heroAlt:
      "Completed driveway sealant coating for exterior home repair in Miami",
  },
};
