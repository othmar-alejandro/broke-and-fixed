export interface Service {
  slug: string;
  slugEs: string;
  name: string;
  nameEs: string;
  description: string;
  descriptionEs: string;
  schemaType: string;
  priceRange: string;
  timeline: string;
  keywords: string[];
}

export const services: Service[] = [
  {
    slug: "bathroom-remodeling",
    slugEs: "remodelacion-de-banos",
    name: "Bathroom Remodeling",
    nameEs: "Remodelación de Baños",
    description:
      "We turn outdated bathrooms into modern, functional spaces your family will actually enjoy using. From tile and vanities to full gut renovations, we handle every step of the process right here in Miami-Dade.",
    descriptionEs:
      "Transformamos baños anticuados en espacios modernos y funcionales que tu familia realmente disfrutará. Desde azulejos y vanidades hasta renovaciones completas, manejamos cada paso del proceso aquí en Miami-Dade.",
    schemaType: "Service",
    priceRange: "$8,000 - $35,000",
    timeline: "2 - 4 weeks",
    keywords: [
      "bathroom remodeling Miami",
      "bathroom renovation Miami-Dade",
      "bathroom remodel Kendall",
      "shower remodel Miami",
      "bathtub replacement Miami",
      "bathroom tile installation",
      "modern bathroom renovation",
      "small bathroom remodel Miami",
      "master bathroom remodel",
      "affordable bathroom remodeling Miami",
    ],
  },
  {
    slug: "kitchen-remodeling",
    slugEs: "remodelacion-de-cocinas",
    name: "Kitchen Remodeling",
    nameEs: "Remodelación de Cocinas",
    description:
      "Your kitchen is where everything happens. We remodel kitchens across Miami-Dade with new cabinets, countertops, backsplashes, and layouts that make the space work better for how you actually live.",
    descriptionEs:
      "Tu cocina es donde todo sucede. Remodelamos cocinas en todo Miami-Dade con nuevos gabinetes, encimeras, salpicaderos y distribuciones que hacen que el espacio funcione mejor para tu estilo de vida.",
    schemaType: "Service",
    priceRange: "$12,000 - $50,000",
    timeline: "3 - 6 weeks",
    keywords: [
      "kitchen remodeling Miami",
      "kitchen renovation Miami-Dade",
      "kitchen remodel Kendall",
      "cabinet installation Miami",
      "countertop replacement Miami",
      "kitchen backsplash installation",
      "modern kitchen remodel",
      "affordable kitchen renovation Miami",
      "kitchen design Miami",
      "small kitchen remodel Miami",
    ],
  },
  {
    slug: "interior-painting",
    slugEs: "pintura-interior",
    name: "Interior Painting",
    nameEs: "Pintura Interior",
    description:
      "A fresh coat of paint changes everything. We prep surfaces the right way, protect your floors and furniture, and leave clean lines every time. We work with all kinds of homes across Miami-Dade.",
    descriptionEs:
      "Una mano de pintura fresca lo cambia todo. Preparamos las superficies correctamente, protegemos tus pisos y muebles, y dejamos líneas limpias siempre. Trabajamos con todo tipo de hogares en Miami-Dade.",
    schemaType: "Service",
    priceRange: "$2,500 - $8,000",
    timeline: "2 - 5 days",
    keywords: [
      "interior painting Miami",
      "house painting Miami-Dade",
      "interior painter Kendall",
      "room painting service Miami",
      "wall painting Miami",
      "home painting company Miami",
      "affordable interior painting",
      "professional painters Miami-Dade",
      "accent wall painting",
      "ceiling painting Miami",
    ],
  },
  {
    slug: "exterior-painting",
    slugEs: "pintura-exterior",
    name: "Exterior Painting",
    nameEs: "Pintura Exterior",
    description:
      "South Florida weather is rough on paint. We pressure wash, scrape, prime, and apply coatings built to handle the heat, humidity, and rain. Your home's curb appeal matters and we take it seriously.",
    descriptionEs:
      "El clima del sur de Florida es duro con la pintura. Lavamos a presión, raspamos, aplicamos imprimante y usamos recubrimientos diseñados para el calor, la humedad y la lluvia. La apariencia de tu hogar importa y lo tomamos en serio.",
    schemaType: "Service",
    priceRange: "$3,500 - $12,000",
    timeline: "3 - 7 days",
    keywords: [
      "exterior painting Miami",
      "house painting exterior Miami-Dade",
      "exterior painter Kendall",
      "stucco painting Miami",
      "pressure washing and painting Miami",
      "home exterior painting company",
      "weatherproof painting Miami",
      "affordable exterior painting",
      "commercial exterior painting Miami",
      "exterior paint job Miami-Dade",
    ],
  },
  {
    slug: "tile-work",
    slugEs: "instalacion-de-pisos",
    name: "Tile Work",
    nameEs: "Instalación de Pisos",
    description:
      "We install tile for floors, showers, backsplashes, and more. Porcelain, ceramic, natural stone, large format, whatever the material, we set it level, grouted tight, and built to last in Miami's climate.",
    descriptionEs:
      "Instalamos azulejos para pisos, duchas, salpicaderos y más. Porcelanato, cerámica, piedra natural, formato grande, cualquiera que sea el material, lo colocamos nivelado, con juntas firmes y hecho para durar en el clima de Miami.",
    schemaType: "Service",
    priceRange: "$3,000 - $15,000",
    timeline: "3 - 10 days",
    keywords: [
      "tile installation Miami",
      "floor tile Miami-Dade",
      "tile work Kendall",
      "porcelain tile installation",
      "shower tile Miami",
      "backsplash tile installation Miami",
      "large format tile installer",
      "affordable tile work Miami",
      "bathroom tile installation Miami",
      "kitchen tile Miami-Dade",
    ],
  },
  {
    slug: "exterior-repairs",
    slugEs: "reparaciones-exteriores",
    name: "Exterior Repairs",
    nameEs: "Reparaciones Exteriores",
    description:
      "Cracked stucco, rotting fascia, damaged soffits, water intrusion issues. We fix the exterior problems that South Florida homes deal with constantly. Small repairs now save you from big bills later.",
    descriptionEs:
      "Estuco agrietado, fascia podrida, sofitos dañados, problemas de intrusión de agua. Reparamos los problemas exteriores que las casas del sur de Florida enfrentan constantemente. Reparaciones pequeñas ahora te ahorran facturas grandes después.",
    schemaType: "Service",
    priceRange: "$1,500 - $10,000",
    timeline: "1 - 5 days",
    keywords: [
      "exterior repairs Miami",
      "stucco repair Miami-Dade",
      "home exterior repair Kendall",
      "fascia repair Miami",
      "soffit repair Miami",
      "water damage repair exterior",
      "hurricane damage repair Miami",
      "home renovation company Miami",
      "exterior home maintenance Miami",
      "stucco patching Miami-Dade",
    ],
  },
  {
    slug: "cabinet-refinishing",
    slugEs: "renovacion-de-gabinetes",
    name: "Cabinet Refinishing",
    nameEs: "Renovación de Gabinetes",
    description:
      "If your kitchen cabinets are solid wood and the layout still works, refinishing gets you what looks like a new kitchen for a fraction of the cost. We strip, sand, prime, and spray with post-catalyzed lacquer or 2K polyurethane. The finish lasts 10 to 15 years and is more durable than what comes from the factory on most new cabinets.",
    descriptionEs:
      "Si los gabinetes de tu cocina son de madera sólida y la distribución todavía funciona, renovarlos te da lo que parece una cocina nueva por una fracción del costo. Quitamos el acabado, lijamos, aplicamos primer y rociamos con laca post-catalizada o poliuretano 2K. El acabado dura 10 a 15 años y es más duradero que el de fábrica en la mayoría de los gabinetes nuevos.",
    schemaType: "Service",
    priceRange: "$2,400 - $5,500",
    timeline: "5 - 10 days",
    keywords: [
      "cabinet refinishing Miami",
      "kitchen cabinet refinishing Miami-Dade",
      "cabinet painting Miami",
      "cabinet refinishing cost per door Miami",
      "wood cabinet refinishing Kendall",
      "kitchen cabinet painting Miami",
      "cabinet restaining Miami",
      "cabinet refinishing company Miami-Dade",
      "spray finish cabinets Miami",
      "affordable cabinet refinishing Miami",
    ],
  },
];
