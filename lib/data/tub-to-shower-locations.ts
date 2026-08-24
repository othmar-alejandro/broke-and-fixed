import { locations } from './locations'

export interface TubToShowerLocationProfile {
  slug: string
  angle: string
  angleEs: string
  detail: string
  detailEs: string
  nearby: string[]
}

/**
 * The first geographic rollout for the tub-to-shower campaign. These are the
 * connected Kendall corridor communities, not a generic county-wide page set.
 */
export const tubToShowerLocationProfiles: TubToShowerLocationProfile[] = [
  {
    slug: 'kendall',
    angle: 'Kendall homeowners often want to replace a dated tub alcove without turning the project into a full bathroom gut job.',
    angleEs: 'Muchos propietarios de Kendall quieren reemplazar una tina vieja sin convertir el proyecto en una remodelación completa del baño.',
    detail: 'The mix of older single-family homes and newer townhouse communities makes same-footprint shower planning especially useful here. We focus on the daily result, not a one-size-fits-all package.',
    detailEs: 'La mezcla de casas antiguas y comunidades de townhouses hace muy útil planificar una ducha en el mismo espacio. Nos enfocamos en el resultado diario, no en un paquete igual para todos.',
    nearby: ['West Kendall', 'The Crossings', 'Kendale Lakes', 'Pinecrest'],
  },
  {
    slug: 'west-kendall',
    angle: 'West Kendall bathrooms from the 1990s and 2000s often have a tub and shower combination that no longer fits the way the family uses the room.',
    angleEs: 'Muchos baños de West Kendall de los años 90 y 2000 tienen una combinación de tina y ducha que ya no funciona para la familia.',
    detail: 'For planned communities, we plan the material delivery, access path, and cleanup around the home so the conversion feels controlled from demolition through final glass.',
    detailEs: 'Para comunidades planificadas, coordinamos la entrega de materiales, el acceso y la limpieza para que la conversión se sienta organizada desde la demolición hasta el vidrio final.',
    nearby: ['Kendall', 'The Hammocks', 'Country Walk', 'The Crossings'],
  },
  {
    slug: 'the-hammocks',
    angle: 'The Hammocks homeowners are often ready to trade builder-grade tub surrounds for a cleaner shower that gets used every day.',
    angleEs: 'Muchos propietarios de The Hammocks quieren cambiar una tina con acabados básicos por una ducha limpia que se use todos los días.',
    detail: 'A same-footprint shower works well in the community because it can improve entry, storage, tile, and glass without changing the entire bathroom layout.',
    detailEs: 'Una ducha en el mismo espacio funciona bien porque mejora la entrada, el almacenamiento, el azulejo y el vidrio sin cambiar toda la distribución del baño.',
    nearby: ['West Kendall', 'Country Walk', 'The Crossings', 'Kendall'],
  },
  {
    slug: 'country-walk',
    angle: 'Country Walk families often want a more open, easier-to-use shower while keeping the rest of a good bathroom intact.',
    angleEs: 'Las familias de Country Walk suelen querer una ducha más abierta y fácil de usar sin cambiar todo el baño.',
    detail: 'We plan around the existing tub footprint, the family schedule, and the finishes that make sense for a busy household, including storage niches and easy-clean surfaces.',
    detailEs: 'Planificamos alrededor del espacio actual de la tina, el horario familiar y acabados prácticos, incluyendo nichos y superficies fáciles de limpiar.',
    nearby: ['The Hammocks', 'West Kendall', 'South Miami Heights', 'Cutler Bay'],
  },
  {
    slug: 'kendale-lakes',
    angle: 'Kendale Lakes homeowners often update older bathrooms by replacing the tub they rarely use with a more comfortable walk-in shower.',
    angleEs: 'Muchos propietarios de Kendale Lakes actualizan baños antiguos reemplazando una tina que casi no usan por una ducha más cómoda.',
    detail: 'The project can stay focused on the wet area, with new waterproofing, tile, fixtures, and glass while the vanity and rest of the room remain in place.',
    detailEs: 'El proyecto puede concentrarse en el área mojada, con impermeabilización, azulejo, accesorios y vidrio nuevos mientras la vanidad y el resto del cuarto se quedan.',
    nearby: ['Kendall', 'The Crossings', 'Westchester', 'Sweetwater'],
  },
  {
    slug: 'the-crossings',
    angle: 'The Crossings is a strong fit for a practical tub-to-shower upgrade that improves an older bathroom without adding unnecessary scope.',
    angleEs: 'The Crossings es una buena zona para una mejora práctica que actualiza un baño antiguo sin agregar trabajo innecesario.',
    detail: 'We can build around the existing alcove, add a niche or seat, and choose tile and glass that make the room feel lighter and easier to maintain.',
    detailEs: 'Podemos construir alrededor del nicho existente, agregar un nicho o asiento y escoger azulejo y vidrio que hagan el cuarto más claro y fácil de mantener.',
    nearby: ['Kendall', 'The Hammocks', 'West Kendall', 'Kendale Lakes'],
  },
  {
    slug: 'south-miami-heights',
    angle: 'South Miami Heights homeowners often want honest scope and a shower that solves a real daily problem without pressure to remodel the whole house.',
    angleEs: 'Los propietarios de South Miami Heights suelen querer un alcance claro y una ducha que resuelva un problema diario sin presión para remodelar toda la casa.',
    detail: 'We keep the conversation practical: entry height, storage, waterproofing, tile, fixtures, glass, and the price range that fits the actual bathroom.',
    detailEs: 'Mantenemos la conversación práctica: altura de entrada, almacenamiento, impermeabilización, azulejo, accesorios, vidrio y el rango que corresponde al baño.',
    nearby: ['Cutler Bay', 'Palmetto Bay', 'Country Walk', 'The Crossings'],
  },
  {
    slug: 'pinecrest',
    angle: 'Pinecrest homeowners often want a tub replacement that feels like a considered part of the home, not a quick insert.',
    angleEs: 'Los propietarios de Pinecrest suelen querer un reemplazo de tina que se sienta parte pensada de la casa, no un inserto rápido.',
    detail: 'We pay attention to proportion, tile scale, glass lines, storage, and how the new shower fits the character of a larger or older home.',
    detailEs: 'Prestamos atención a las proporciones, escala del azulejo, líneas de vidrio, almacenamiento y como la ducha combina con una casa grande o antigua.',
    nearby: ['Kendall', 'Palmetto Bay', 'South Miami', 'Coral Gables'],
  },
  {
    slug: 'palmetto-bay',
    angle: 'Palmetto Bay homeowners often convert a rarely used tub into a wider-feeling shower while keeping the room comfortable for family use.',
    angleEs: 'Los propietarios de Palmetto Bay suelen convertir una tina poco usada en una ducha más amplia y cómoda para la familia.',
    detail: 'The design can respect a ranch-style or larger-lot home with simple tile, clear glass, a reachable niche, and a low entry that feels natural.',
    detailEs: 'El diseño puede respetar una casa estilo rancho o de lote grande con azulejo sencillo, vidrio claro, nicho alcanzable y entrada baja.',
    nearby: ['Pinecrest', 'Cutler Bay', 'South Miami Heights', 'Kendall'],
  },
  {
    slug: 'cutler-bay',
    angle: 'Cutler Bay homeowners often want a bathroom update that improves access and cleaning without changing the entire room.',
    angleEs: 'Los propietarios de Cutler Bay suelen querer una mejora que facilite la entrada y la limpieza sin cambiar todo el cuarto.',
    detail: 'We can keep the conversion focused on the wet area and select durable tile, simple glass, and storage that work for a busy South Miami-Dade household.',
    detailEs: 'Podemos concentrar la conversión en el área mojada y escoger azulejo durable, vidrio sencillo y almacenamiento práctico para una familia ocupada.',
    nearby: ['Palmetto Bay', 'South Miami Heights', 'Country Walk', 'Pinecrest'],
  },
  {
    slug: 'south-miami',
    angle: 'South Miami homeowners often want to modernize an older bathroom while keeping the scale and character of the home.',
    angleEs: 'Los propietarios de South Miami suelen querer modernizar un baño antiguo sin perder la escala y el carácter de la casa.',
    detail: 'We look at the existing room first, then balance entry, tile pattern, glass, storage, and fixtures so the new shower belongs in the space.',
    detailEs: 'Primero revisamos el cuarto actual y luego equilibramos entrada, patron de azulejo, vidrio, almacenamiento y accesorios para que la ducha pertenezca al espacio.',
    nearby: ['Pinecrest', 'Coral Gables', 'Westchester', 'Kendall'],
  },
  {
    slug: 'coral-gables',
    angle: 'Coral Gables homeowners often want a careful tub replacement that respects an older home while making daily use easier.',
    angleEs: 'Los propietarios de Coral Gables suelen querer un reemplazo cuidadoso que respete una casa antigua y facilite el uso diario.',
    detail: 'The design conversation covers proportion, materials, glass, storage, and how the shower will read next to the existing architecture and finishes.',
    detailEs: 'La conversación cubre proporciones, materiales, vidrio, almacenamiento y como se verá la ducha junto a la arquitectura y acabados existentes.',
    nearby: ['South Miami', 'Pinecrest', 'Westchester', 'Coconut Grove'],
  },
  {
    slug: 'westchester',
    angle: 'Westchester homeowners often update a 1960s or 1970s bathroom by replacing a dated tub and using the existing room more effectively.',
    angleEs: 'Los propietarios de Westchester suelen actualizar un baño de los años 60 o 70 reemplazando una tina vieja y usando mejor el espacio.',
    detail: 'We can work with terrazzo floors, older layouts, and existing vanities while rebuilding the wet area with new waterproofing, tile, and glass.',
    detailEs: 'Podemos trabajar con pisos de terrazo, distribuciones antiguas y vanidades existentes mientras reconstruimos el área mojada.',
    nearby: ['South Miami', 'Sweetwater', 'Kendale Lakes', 'Coral Gables'],
  },
  {
    slug: 'sweetwater',
    angle: 'Sweetwater homeowners often want a straightforward shower conversion that makes a smaller or older bathroom easier to use.',
    angleEs: 'Los propietarios de Sweetwater suelen querer una conversión directa que haga un baño pequeño o antiguo más fácil de usar.',
    detail: 'We focus on smart storage, clear glass, durable tile, and a layout that leaves the rest of the bathroom working as it should.',
    detailEs: 'Nos enfocamos en almacenamiento inteligente, vidrio claro, azulejo durable y una distribución que mantenga funcional el resto del baño.',
    nearby: ['Westchester', 'Kendale Lakes', 'West Kendall', 'South Miami'],
  },
  {
    slug: 'coconut-grove',
    angle: 'Coconut Grove homeowners often want a shower that feels current without losing the relaxed character of an older or distinctive home.',
    angleEs: 'Los propietarios de Coconut Grove suelen querer una ducha actual sin perder el carácter relajado de una casa antigua o distintiva.',
    detail: 'We use the existing room as the starting point and make deliberate choices about tile, glass, storage, and hardware rather than forcing a generic look.',
    detailEs: 'Usamos el cuarto existente como punto de partida y escogemos con cuidado el azulejo, vidrio, almacenamiento y herrajes.',
    nearby: ['Coral Gables', 'South Miami', 'Pinecrest'],
  },
{
    slug: 'doral',
    angle: 'Doral homeowners often have newer bathrooms that still came with a builder-grade tub nobody in the household actually uses.',
    angleEs: 'Muchos propietarios de Doral tienen baños relativamente nuevos que aún vinieron con una tina básica del constructor que nadie en la casa usa.',
    detail: 'Newer construction usually means sound walls and predictable plumbing, so the project can focus on the finish level instead of repairs. Many Doral homes sit in associations, so we plan the approval paperwork, access, and elevator scheduling before demolition day.',
    detailEs: 'La construcción nueva normalmente significa paredes sanas y plomería predecible, así que el proyecto se puede concentrar en el nivel de acabado y no en reparaciones. Muchas casas de Doral están en asociaciones, así que planificamos la aprobación, el acceso y el elevador antes del día de demolición.',
    nearby: ['Sweetwater', 'Westchester', 'Miami Gardens', 'Kendale Lakes'],
  },
  {
    slug: 'miami-gardens',
    angle: 'Miami Gardens homeowners often work with block homes from the 1960s through the 1980s where the original tub alcove has never been opened.',
    angleEs: 'Muchos propietarios de Miami Gardens tienen casas de bloque de los años 60 a los 80 donde el nicho original de la tina nunca se ha abierto.',
    detail: 'In homes of that era we plan for what the wall may be hiding, then rebuild the wet area with new waterproofing, tile, and glass. Multi-generational households often want a low curb, a seat, and grab bar blocking so the bathroom works for everyone under the roof.',
    detailEs: 'En casas de esa época planificamos lo que la pared pueda estar escondiendo, y después reconstruimos el área mojada con impermeabilización, azulejo y vidrio nuevos. Los hogares multigeneracionales muchas veces quieren un borde bajo, un asiento y refuerzo para barras para que el baño sirva a todos en la casa.',
    nearby: ['Doral', 'Westchester', 'Sweetwater'],
  },
]

export function getTubToShowerLocation(slug: string) {
  const profile = tubToShowerLocationProfiles.find((item) => item.slug === slug)
  const location = locations.find((item) => item.slug === slug)
  if (!profile || !location) return null
  return { profile, location }
}
