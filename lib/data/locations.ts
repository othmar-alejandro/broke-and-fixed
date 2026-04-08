export interface Location {
  slug: string;
  name: string;
  state: string;
  zip: string;
  lat: number;
  lng: number;
  description: string;
  descriptionEs: string;
  nearbyLocations: string[];
  commonHomeTypes: string[];
}

export const locations: Location[] = [
  {
    slug: "kendall",
    name: "Kendall",
    state: "FL",
    zip: "33176",
    lat: 25.6795,
    lng: -80.4072,
    description:
      "Kendall is one of the biggest communities in Miami-Dade with a mix of single-family homes from the 70s and 80s and newer townhouse developments. Lots of homeowners here are updating older layouts.",
    descriptionEs:
      "Kendall es una de las comunidades más grandes de Miami-Dade con una mezcla de casas unifamiliares de los años 70 y 80 y desarrollos de townhouses más nuevos. Muchos propietarios aquí están actualizando distribuciones antiguas.",
    nearbyLocations: ["west-kendall", "the-crossings", "kendale-lakes", "pinecrest"],
    commonHomeTypes: ["1970s-1980s single-family homes", "townhouse developments", "gated communities"],
  },
  {
    slug: "west-kendall",
    name: "West Kendall",
    state: "FL",
    zip: "33193",
    lat: 25.6842,
    lng: -80.4431,
    description:
      "West Kendall grew fast in the 90s and 2000s. Most homes are in planned communities with HOAs. Kitchens and bathrooms from that era are starting to show their age.",
    descriptionEs:
      "West Kendall creció rápido en los años 90 y 2000. La mayoría de las casas están en comunidades planificadas con HOA. Las cocinas y baños de esa época están empezando a mostrar su edad.",
    nearbyLocations: ["kendall", "the-hammocks", "country-walk", "the-crossings"],
    commonHomeTypes: ["1990s-2000s planned communities", "two-story family homes", "HOA neighborhoods"],
  },
  {
    slug: "palmetto-bay",
    name: "Palmetto Bay",
    state: "FL",
    zip: "33157",
    lat: 25.6251,
    lng: -80.3228,
    description:
      "Palmetto Bay is a quiet, family-friendly village south of Pinecrest. You see a lot of ranch-style homes from the 60s and 70s on larger lots. Many families are renovating instead of moving.",
    descriptionEs:
      "Palmetto Bay es un pueblo tranquilo y familiar al sur de Pinecrest. Se ven muchas casas estilo rancho de los años 60 y 70 en lotes grandes. Muchas familias están renovando en lugar de mudarse.",
    nearbyLocations: ["pinecrest", "cutler-bay", "south-miami-heights"],
    commonHomeTypes: ["1960s-1970s ranch-style homes", "larger lot properties", "updated estates"],
  },
  {
    slug: "doral",
    name: "Doral",
    state: "FL",
    zip: "33178",
    lat: 25.8195,
    lng: -80.3553,
    description:
      "Doral has boomed with newer construction and a large Latin American community. Many homes are relatively new but owners want upgrades like better tile, custom kitchens, and fresh paint throughout.",
    descriptionEs:
      "Doral ha crecido con construcciones nuevas y una gran comunidad latinoamericana. Muchas casas son relativamente nuevas pero los propietarios quieren mejoras como mejor azulejo, cocinas personalizadas y pintura fresca.",
    nearbyLocations: ["sweetwater", "westchester", "miami-gardens"],
    commonHomeTypes: ["2000s-2010s new construction", "condos and townhouses", "gated communities"],
  },
  {
    slug: "the-hammocks",
    name: "The Hammocks",
    state: "FL",
    zip: "33196",
    lat: 25.6717,
    lng: -80.4478,
    description:
      "The Hammocks is a large master-planned community out west. Homes here are mostly from the late 80s and 90s. Builder-grade finishes are common and a lot of owners are ready for something better.",
    descriptionEs:
      "The Hammocks es una gran comunidad planificada al oeste. Las casas aquí son mayormente de finales de los 80 y 90. Los acabados básicos de constructor son comunes y muchos propietarios quieren algo mejor.",
    nearbyLocations: ["west-kendall", "country-walk", "the-crossings"],
    commonHomeTypes: ["1980s-1990s planned community homes", "single-family with pools", "builder-grade finishes"],
  },
  {
    slug: "the-crossings",
    name: "The Crossings",
    state: "FL",
    zip: "33186",
    lat: 25.6614,
    lng: -80.4072,
    description:
      "The Crossings sits between Kendall and the Hammocks. It is a solid middle-class neighborhood with homes built in the 80s and 90s. Bathroom and kitchen remodels are the most common projects here.",
    descriptionEs:
      "The Crossings se encuentra entre Kendall y The Hammocks. Es un vecindario sólido de clase media con casas construidas en los 80 y 90. Las remodelaciones de baños y cocinas son los proyectos más comunes aquí.",
    nearbyLocations: ["kendall", "the-hammocks", "west-kendall", "kendale-lakes"],
    commonHomeTypes: ["1980s-1990s single-family homes", "tile-roof homes", "family neighborhoods"],
  },
  {
    slug: "kendale-lakes",
    name: "Kendale Lakes",
    state: "FL",
    zip: "33183",
    lat: 25.7081,
    lng: -80.4072,
    description:
      "Kendale Lakes is a well-established neighborhood just north of Kendall. Homes are mostly from the 70s and 80s with that classic South Florida look. Plenty of them need updated bathrooms, kitchens, and exterior work.",
    descriptionEs:
      "Kendale Lakes es un vecindario bien establecido al norte de Kendall. Las casas son mayormente de los 70 y 80 con ese aspecto clásico del sur de Florida. Muchas necesitan baños, cocinas y trabajo exterior actualizado.",
    nearbyLocations: ["kendall", "the-crossings", "sweetwater", "westchester"],
    commonHomeTypes: ["1970s-1980s single-family homes", "CBS construction", "screened patios"],
  },
  {
    slug: "sweetwater",
    name: "Sweetwater",
    state: "FL",
    zip: "33174",
    lat: 25.7628,
    lng: -80.3731,
    description:
      "Sweetwater is a tight-knit, predominantly Hispanic community near FIU. Homes range from older CBS houses to newer condos. Interior painting and tile work are popular projects in the area.",
    descriptionEs:
      "Sweetwater es una comunidad unida, predominantemente hispana cerca de FIU. Las casas van desde casas CBS más antiguas hasta condominios más nuevos. La pintura interior y el trabajo de azulejo son proyectos populares en la zona.",
    nearbyLocations: ["doral", "westchester", "kendale-lakes"],
    commonHomeTypes: ["older CBS homes", "condos near FIU", "small single-family homes"],
  },
  {
    slug: "cutler-bay",
    name: "Cutler Bay",
    state: "FL",
    zip: "33189",
    lat: 25.5808,
    lng: -80.3467,
    description:
      "Cutler Bay is a growing town south of Palmetto Bay. There is a mix of older homes and brand new developments. Exterior repairs and painting are big needs here because of storm exposure.",
    descriptionEs:
      "Cutler Bay es un pueblo en crecimiento al sur de Palmetto Bay. Hay una mezcla de casas antiguas y desarrollos nuevos. Las reparaciones exteriores y la pintura son grandes necesidades aquí por la exposición a tormentas.",
    nearbyLocations: ["palmetto-bay", "south-miami-heights", "country-walk"],
    commonHomeTypes: ["mixed-era homes", "newer developments", "waterfront properties"],
  },
  {
    slug: "pinecrest",
    name: "Pinecrest",
    state: "FL",
    zip: "33156",
    lat: 25.667,
    lng: -80.3078,
    description:
      "Pinecrest is one of the most desirable neighborhoods in Miami-Dade. Big lots, mature trees, and homes that range from classic 60s builds to brand new custom construction. Homeowners here invest in quality renovations.",
    descriptionEs:
      "Pinecrest es uno de los vecindarios más deseables de Miami-Dade. Lotes grandes, árboles maduros y casas que van desde construcciones clásicas de los 60 hasta construcción nueva personalizada. Los propietarios aquí invierten en renovaciones de calidad.",
    nearbyLocations: ["palmetto-bay", "south-miami", "kendall", "coral-gables"],
    commonHomeTypes: ["1960s ranch homes on large lots", "custom new construction", "luxury renovations"],
  },
  {
    slug: "south-miami",
    name: "South Miami",
    state: "FL",
    zip: "33143",
    lat: 25.7076,
    lng: -80.2917,
    description:
      "South Miami is a small city with a downtown feel and older residential streets. A lot of the homes are from the 50s and 60s. Owners love upgrading these places while keeping the original character.",
    descriptionEs:
      "South Miami es una pequeña ciudad con ambiente de centro y calles residenciales antiguas. Muchas casas son de los años 50 y 60. A los propietarios les encanta mejorar estos lugares manteniendo el carácter original.",
    nearbyLocations: ["coral-gables", "pinecrest", "westchester", "coconut-grove"],
    commonHomeTypes: ["1950s-1960s bungalows", "mid-century homes", "small historic properties"],
  },
  {
    slug: "south-miami-heights",
    name: "South Miami Heights",
    state: "FL",
    zip: "33177",
    lat: 25.5953,
    lng: -80.3817,
    description:
      "South Miami Heights is an affordable, working-class area south of Kendall. Homes here are mostly from the 70s and 80s. Many need updates like new tile, fresh paint, and exterior repairs.",
    descriptionEs:
      "South Miami Heights es un área asequible y de clase trabajadora al sur de Kendall. Las casas aquí son mayormente de los años 70 y 80. Muchas necesitan actualizaciones como azulejos nuevos, pintura fresca y reparaciones exteriores.",
    nearbyLocations: ["cutler-bay", "palmetto-bay", "the-crossings", "country-walk"],
    commonHomeTypes: ["1970s-1980s CBS homes", "starter homes", "affordable single-family"],
  },
  {
    slug: "miami-gardens",
    name: "Miami Gardens",
    state: "FL",
    zip: "33169",
    lat: 25.942,
    lng: -80.2456,
    description:
      "Miami Gardens is the largest city in Miami-Dade by population. Homes are spread across many decades of construction. Interior and exterior painting jobs are some of the most requested services here.",
    descriptionEs:
      "Miami Gardens es la ciudad más grande de Miami-Dade por población. Las casas abarcan muchas décadas de construcción. Los trabajos de pintura interior y exterior son algunos de los servicios más solicitados aquí.",
    nearbyLocations: ["doral"],
    commonHomeTypes: ["1960s-1980s single-family homes", "CBS block construction", "multi-generational homes"],
  },
  {
    slug: "westchester",
    name: "Westchester",
    state: "FL",
    zip: "33165",
    lat: 25.755,
    lng: -80.3278,
    description:
      "Westchester is a classic Miami neighborhood with deep Cuban roots. Most homes were built in the 60s and 70s. Kitchens and bathrooms from that era are due for a serious upgrade.",
    descriptionEs:
      "Westchester es un vecindario clásico de Miami con profundas raíces cubanas. La mayoría de las casas fueron construidas en los 60 y 70. Las cocinas y baños de esa época merecen una mejora seria.",
    nearbyLocations: ["sweetwater", "south-miami", "coral-gables", "kendale-lakes"],
    commonHomeTypes: ["1960s-1970s CBS homes", "terrazzo floors", "flat-roof homes"],
  },
  {
    slug: "coral-gables",
    name: "Coral Gables",
    state: "FL",
    zip: "33134",
    lat: 25.7215,
    lng: -80.2684,
    description:
      "Coral Gables is known for its tree-lined streets, historic homes, and strict building codes. Renovations here need to be done right. We work with the character of these homes, not against it.",
    descriptionEs:
      "Coral Gables es conocido por sus calles arboladas, casas históricas y códigos de construcción estrictos. Las renovaciones aquí deben hacerse bien. Trabajamos con el carácter de estas casas, no en contra.",
    nearbyLocations: ["south-miami", "coconut-grove", "westchester", "pinecrest"],
    commonHomeTypes: ["Mediterranean Revival homes", "1920s-1940s historic properties", "luxury estates"],
  },
  {
    slug: "country-walk",
    name: "Country Walk",
    state: "FL",
    zip: "33196",
    lat: 25.635,
    lng: -80.435,
    description:
      "Country Walk is a family-oriented community on the southwestern edge of Miami-Dade. Homes are mostly from the late 90s and 2000s. Builder-grade kitchens and bathrooms are the first things people want to change.",
    descriptionEs:
      "Country Walk es una comunidad orientada a familias en el borde suroeste de Miami-Dade. Las casas son mayormente de finales de los 90 y 2000. Las cocinas y baños con acabados básicos son lo primero que la gente quiere cambiar.",
    nearbyLocations: ["the-hammocks", "west-kendall", "cutler-bay", "south-miami-heights"],
    commonHomeTypes: ["late 1990s-2000s homes", "planned community", "two-story family homes"],
  },
  {
    slug: "coconut-grove",
    name: "Coconut Grove",
    state: "FL",
    zip: "33133",
    lat: 25.727,
    lng: -80.2409,
    description:
      "Coconut Grove is one of Miami's oldest and most charming neighborhoods. You will find everything from historic cottages to modern waterfront homes. Renovations here blend old-world style with updated living.",
    descriptionEs:
      "Coconut Grove es uno de los vecindarios más antiguos y encantadores de Miami. Encontrarás de todo, desde cabañas históricas hasta casas modernas frente al agua. Las renovaciones aquí mezclan estilo clásico con vida moderna.",
    nearbyLocations: ["coral-gables", "south-miami"],
    commonHomeTypes: ["historic cottages", "modern waterfront homes", "luxury condos"],
  },
];
