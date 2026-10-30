/**
 * King tide flood damage pages, October 2026.
 *
 * Powers /[locale]/king-tide-flooding (hub) and /[locale]/king-tide-flooding/[area].
 * Every street-level fact below comes from a news or city source listed in that
 * area's `sources`. Do not add a neighborhood without a source, and do not add
 * job counts, prices or response times we were not given.
 */

export interface KingTideSource {
  label: string
  url: string
  date: string
}

export interface KingTideFaq {
  question: string
  questionEs: string
  answer: string
  answerEs: string
}

export interface KingTideArea {
  slug: string
  name: string
  nameEs: string
  county: "Broward" | "Miami-Dade"
  /** One or two sentences. Used as intro and meta description. */
  summary: string
  summaryEs: string
  whatHappened: string[]
  whatHappenedEs: string[]
  hotspots: Array<{ name: string; note: string; noteEs: string }>
  whyItFloods: string
  whyItFloodsEs: string
  prepTip: string
  prepTipEs: string
  faqs: KingTideFaq[]
  sources: KingTideSource[]
}

export const KING_TIDE_UPDATED = "2026-10-29"

/** Remaining 2026 king tide windows, per the City of Fort Lauderdale. */
export const nextKingTides = {
  en: ["November 5 to 11", "November 22 to 28", "December 24 to 25"],
  es: ["5 al 11 de noviembre", "22 al 28 de noviembre", "24 y 25 de diciembre"],
  source: {
    label: "City of Fort Lauderdale, King Tides and High Tides",
    url: "https://www.fortlauderdale.gov/Government/Departments/Strategic-Communications/King-Tides-and-High-Tides",
    date: "2026",
  },
}

/** Region-wide facts used on the hub. */
export const regionSources: KingTideSource[] = [
  {
    label: "Tampa Bay Times / Miami Herald, 'Highest king tide ever' swamps South Florida",
    url: "https://www.tampabay.com/news/environment/2026/10/27/king-tide-south-florida-flooding-miami-fort-lauderdale/",
    date: "2026-10-27",
  },
  {
    label: "CBS Miami, Pompano Beach flooding on Riverside Drive (September 2026 king tide)",
    url: "https://www.cbsnews.com/miami/news/south-florida-king-tide-flooding-miami-fort-lauderdale-hollywood-beach-september-2026/",
    date: "2026-09",
  },
]

export const hubFaqs: KingTideFaq[] = [
  {
    question: "Does homeowners insurance cover king tide flooding?",
    questionEs: "¿El seguro de vivienda cubre las inundaciones por marea rey?",
    answer:
      "Usually not. A standard homeowners policy in Florida excludes flood, and water that rises from the street, a canal or over a seawall counts as flood. That damage is normally covered by a separate flood policy, either through the [National Flood Insurance Program](https://www.fema.gov/flood-insurance) (NFIP) or a private flood carrier. If you have one, [report the loss right away](/king-tide-flooding/questions/flood-insurance-claim-florida). NFIP policies set a deadline for your signed proof of loss, usually 60 days from the date of the flood, and the adjuster will want to see the damage before it is torn out. Take photos and video of every room, the water line on the walls, and anything you throw away. We put together photos and a written scope of the repair for your file. We do not negotiate your claim. That is between you, your carrier and your adjuster.",
    answerEs:
      "Por lo general, no. Una póliza de vivienda estándar en Florida excluye inundaciones, y el agua que sube desde la calle, un canal o por encima de un muro de contención cuenta como inundación. Ese daño normalmente lo cubre una póliza de inundación aparte, ya sea del [Programa Nacional de Seguro contra Inundaciones](https://www.fema.gov/flood-insurance) (NFIP) o de una aseguradora privada. Si la tiene, [reporte la pérdida de inmediato](/king-tide-flooding/questions/flood-insurance-claim-florida). Las pólizas del NFIP fijan un plazo para entregar la prueba de pérdida firmada, normalmente 60 días desde la inundación, y el ajustador va a querer ver el daño antes de que se quite nada. Tome fotos y video de cada cuarto, de la marca del agua en las paredes y de todo lo que bote. Nosotros preparamos fotos y un alcance escrito de la reparación para su expediente. No negociamos su reclamo. Eso queda entre usted, su aseguradora y su ajustador.",
  },
  {
    question: "Is king tide water dirty, or is it just seawater?",
    questionEs: "¿El agua de la marea rey está contaminada o es solo agua de mar?",
    answer:
      "Treat it as dirty. King tide water does not come straight from the beach. It backs up through storm drains, canals and sewer lines before it reaches your yard, and this October residents and reporters described sewage systems backing up along the coast. Restoration industry standards (IICRC S500) put floodwater that enters from outside the house in Category 3, the most contaminated class. That changes what can be saved. Wet carpet and pad go out. Drywall, baseboards and insulation that the water touched get cut out instead of dried in place. Hard surfaces get cleaned and rinsed. The salt matters too. Salt left in drywall paper, wood and grout keeps pulling moisture out of the humid Florida air, so a room that looks dry can stay damp. Wear boots and gloves when you go in, and keep kids and pets out until it is cleaned.",
    answerEs:
      "Trátela como agua contaminada. El agua de la marea rey no llega directo de la playa. Sube por los desagües pluviales, los canales y las líneas de alcantarillado antes de llegar a su patio, y este octubre vecinos y periodistas reportaron sistemas de aguas negras desbordados a lo largo de la costa. Los estándares de la industria de restauración (IICRC S500) clasifican el agua de inundación que entra desde afuera como Categoría 3, la más contaminada. Eso cambia lo que se puede salvar. La alfombra y el acolchado mojados se botan. El drywall, los zócalos y el aislamiento que tocó el agua se cortan en vez de secarse en su lugar. Las superficies duras se limpian y se enjuagan. La sal también importa. La sal que queda en el papel del drywall, la madera y la lechada sigue atrayendo la humedad del aire de Florida, así que un cuarto que parece seco puede seguir húmedo. Use botas y guantes al entrar y mantenga a los niños y las mascotas afuera hasta que se limpie.",
  },
  {
    question: "How fast do I need to act after the water goes down?",
    questionEs: "¿Qué tan rápido tengo que actuar cuando baja el agua?",
    answer:
      "Fast. [The EPA says](https://www.epa.gov/mold/brief-guide-mold-moisture-and-your-home) wet building materials should be dried within 24 to 48 hours to keep mold from starting, and in a South Florida house with the AC off that window is short. Here is the order that works. First, if water reached outlets or anything plugged into the wall, keep that circuit off and have an electrician check it before you use it. Second, document everything for your flood policy. Third, get the wet material out: carpet, pad, baseboards and [the bottom of the drywall](/king-tide-flooding/questions/flood-cut-drywall). Fourth, rinse the salt off hard surfaces and dry the room with air movers and dehumidifiers running around the clock. Only then do you rebuild. The common mistake is painting over a wall that felt dry to the touch. The salt and moisture inside it come back through the paint in a few weeks as bubbling, stains and a musty smell.",
    answerEs:
      "Rápido. [La EPA indica](https://www.epa.gov/mold/brief-guide-mold-moisture-and-your-home) que los materiales de construcción mojados deben secarse en 24 a 48 horas para evitar que empiece el moho, y en una casa del sur de Florida con el aire acondicionado apagado ese plazo es corto. Este es el orden que funciona. Primero, si el agua llegó a los tomacorrientes o a algo enchufado, deje ese circuito apagado y que un electricista lo revise antes de usarlo. Segundo, documente todo para su póliza de inundación. Tercero, saque el material mojado: alfombra, acolchado, zócalos y [la parte baja del drywall](/king-tide-flooding/questions/flood-cut-drywall). Cuarto, enjuague la sal de las superficies duras y seque el cuarto con ventiladores y deshumidificadores funcionando día y noche. Solo después se reconstruye. El error común es pintar sobre una pared que se sentía seca al tacto. La sal y la humedad que quedan adentro salen por la pintura en pocas semanas como burbujas, manchas y olor a humedad.",
  },
]

export const kingTideAreas: KingTideArea[] = [
  {
    slug: "fort-lauderdale",
    name: "Fort Lauderdale",
    nameEs: "Fort Lauderdale",
    county: "Broward",
    summary:
      "The October 2026 king tide put saltwater on streets across Fort Lauderdale, from Las Olas Isles to Mayan Drive, about 6 inches higher than earlier king tides. Here is what happened, what saltwater does to a house, and how we repair it.",
    summaryEs:
      "La marea rey de octubre de 2026 cubrió de agua salada calles en todo Fort Lauderdale, desde Las Olas Isles hasta Mayan Drive, unas 6 pulgadas más alta que las mareas rey anteriores. Esto fue lo que pasó, lo que el agua salada le hace a una casa y cómo la reparamos.",
    whatHappened: [
      "The king tide peaked on Tuesday, October 27, 2026. Both Fort Lauderdale and Miami measured about 2.5 feet of water above high tide, which the National Weather Service classifies as major flooding. The Port Everglades tide gauge broke the record it had set only a month earlier, in September.",
      "On Monday night, October 26, high water covered parts of Riviera Isle Drive south of Las Olas Boulevard, and earlier that day several cars stalled in it. On Tuesday the city closed the Las Olas Bridge because of flooding on both sides. A homeowner in Hendricks and Venice Isles who bought in 2006 told reporters it was only the second time he had seen the water that high.",
      "By Wednesday, October 28, Dr. Nancy Gassman, the city's resident king tide expert, said the water was running 6 inches higher than previous king tides and reaching new spots, including the Himarshee district near downtown and Mayan Drive near the beach. A resident south of Sunrise Boulevard could not walk out her front door, and water surrounded the Church by the Sea.",
      "The city was clear that it could not pump the water out. Tidal flooding comes in through the waterways, the drainage system and over the seawalls, and when the ocean is that high the stormwater pumps have nowhere to send it until the tide drops.",
    ],
    whatHappenedEs: [
      "La marea rey llegó a su punto más alto el martes 27 de octubre de 2026. Tanto Fort Lauderdale como Miami midieron cerca de 2.5 pies de agua por encima de la marea alta, lo que el Servicio Nacional de Meteorología clasifica como inundación mayor. El medidor de marea de Port Everglades rompió el récord que había marcado apenas un mes antes, en septiembre.",
      "El lunes 26 de octubre en la noche, el agua cubrió partes de Riviera Isle Drive al sur de Las Olas Boulevard, y ese mismo día varios carros se apagaron en ella. El martes la ciudad cerró el puente de Las Olas por la inundación en ambos lados. Un propietario de Hendricks y Venice Isles que compró en 2006 dijo a la prensa que era apenas la segunda vez que veía el agua tan alta.",
      "Para el miércoles 28 de octubre, la Dra. Nancy Gassman, experta en mareas rey de la ciudad, dijo que el agua estaba 6 pulgadas más alta que en mareas rey anteriores y llegaba a lugares nuevos, como el distrito de Himarshee cerca del centro y Mayan Drive cerca de la playa. Una vecina al sur de Sunrise Boulevard no podía salir por la puerta de su casa, y el agua rodeó la Church by the Sea.",
      "La ciudad fue clara en que no podía bombear el agua. La inundación por marea entra por los canales, el sistema de drenaje y por encima de los muros de contención, y cuando el mar está tan alto las bombas pluviales no tienen adónde mandarla hasta que baja la marea.",
    ],
    hotspots: [
      {
        name: "Las Olas Isles (Riviera Isle Drive)",
        note: "Water over the road south of Las Olas Blvd on Oct 26, cars stalled.",
        noteEs: "Agua sobre la calle al sur de Las Olas Blvd el 26 de octubre, carros apagados.",
      },
      {
        name: "Hendricks and Venice Isles",
        note: "Residents walked home through floodwater from the Las Olas Bridge on Oct 27.",
        noteEs: "Vecinos caminaron a casa entre el agua desde el puente de Las Olas el 27 de octubre.",
      },
      {
        name: "Las Olas Blvd at the Intracoastal bridge",
        note: "Bridge closed by the city on Oct 27 for flooding on both sides.",
        noteEs: "Puente cerrado por la ciudad el 27 de octubre por inundación en ambos lados.",
      },
      {
        name: "SE 25th Ave and SE 5th St",
        note: "Street flooding photographed on Oct 26.",
        noteEs: "Calle inundada fotografiada el 26 de octubre.",
      },
      {
        name: "Himarshee district",
        note: "Named by the city as a new spot reached by this tide.",
        noteEs: "Señalado por la ciudad como un lugar nuevo al que llegó esta marea.",
      },
      {
        name: "Mayan Drive and Church by the Sea",
        note: "New flooding near the beach, water around the church on Oct 28.",
        noteEs: "Inundación nueva cerca de la playa, agua alrededor de la iglesia el 28 de octubre.",
      },
      {
        name: "East Fort Lauderdale south of Sunrise Blvd",
        note: "A resident could not walk out her front door on Oct 28.",
        noteEs: "Una vecina no podía salir por su puerta el 28 de octubre.",
      },
    ],
    whyItFloods:
      "Fort Lauderdale is low and laced with canals. Most of the isles off Las Olas sit only a few feet above sea level with water on three sides, so a high tide pushed by onshore wind comes over seawalls and up through storm drains at the same time. The city has raised miles of seawalls and installed tidal valves to stop backflow, but this tide still reached spots the city says had not flooded before.",
    whyItFloodsEs:
      "Fort Lauderdale es bajo y está lleno de canales. La mayoría de las islas junto a Las Olas están a pocos pies sobre el nivel del mar con agua por tres lados, así que una marea alta empujada por el viento del mar pasa por encima de los muros y sube por los desagües al mismo tiempo. La ciudad ha elevado millas de muros de contención e instalado válvulas de marea contra el reflujo, pero esta marea igual llegó a lugares que, según la ciudad, no se habían inundado antes.",
    prepTip:
      "Before the next window, check that your seawall cap and any drain or backflow valve on your property are clear, move cars to higher ground before peak tide, and keep anything you care about off the floor of the garage. The city takes reports of impassable roads at 954-828-8000 or in the FixIt FTL app.",
    prepTipEs:
      "Antes de la próxima marea, revise que el tope de su muro de contención y cualquier desagüe o válvula antirreflujo en su propiedad estén despejados, mueva los carros a terreno alto antes del pico de la marea y no deje nada de valor en el piso del garaje. La ciudad recibe reportes de calles intransitables al 954-828-8000 o en la app FixIt FTL.",
    faqs: [
      {
        question: "Water came into my house in Las Olas Isles. What do I do first?",
        questionEs: "Entró agua a mi casa en Las Olas Isles. ¿Qué hago primero?",
        answer:
          "Start with safety. If the water reached outlets, the AC air handler or anything plugged in, turn off that circuit at the panel and have an electrician look before you turn it back on. Then document. Photograph every room, the line the water left on the walls and doors, and the outside of the house showing the street. Call your flood carrier and get a claim number. After that, the clock is about moisture. Pull up wet rugs, get furniture off the floor, and open the house up if the air outside is drier than inside. Do not start painting or patching. Drywall usually wicks water well above where it stood, especially behind vanities and kitchen base cabinets, so the tear-out tends to go higher than people expect. Call us at (786) 363-7039 and we will walk the house and tell you what has to come out.",
        answerEs:
          "Empiece por la seguridad. Si el agua llegó a los tomacorrientes, a la manejadora del aire acondicionado o a algo enchufado, apague ese circuito en el panel y que un electricista lo revise antes de volver a encenderlo. Después documente. Fotografíe cada cuarto, la marca que dejó el agua en paredes y puertas, y el exterior de la casa mostrando la calle. Llame a su aseguradora de inundación y pida un número de reclamo. Después de eso, todo se trata de la humedad. Levante las alfombras mojadas, suba los muebles del piso y abra la casa si el aire de afuera está más seco que el de adentro. No empiece a pintar ni a resanar. El drywall normalmente absorbe el agua bastante más arriba de donde estuvo, sobre todo detrás de los gabinetes del baño y de la cocina, así que el corte suele ir más alto de lo que la gente espera. Llámenos al (786) 363-7039 y le decimos qué hay que sacar.",
      },
      {
        question: "My street flooded but the water never came inside. Should I still worry?",
        questionEs: "Mi calle se inundó pero el agua nunca entró. ¿Igual debo preocuparme?",
        answer:
          "Check three places. First, the garage. Garages in Fort Lauderdale often sit a step lower than the house, and saltwater that sat on the slab can soak the bottom of the drywall on the shared wall with the house, plus anything stored on the floor. Second, the exterior. Saltwater sitting against stucco, wood trim, door frames and the bottom of garage doors speeds up corrosion and rot, and on older homes it gets into cracks at the base of the wall. Rinse those areas with fresh water from a hose. Third, the ground level of a pool deck or patio with pavers, where salt can loosen the sand base. If you see bubbling paint at the bottom of a wall, a musty smell in the garage, or swelling at the base of a door frame in the next few weeks, that is the salt and moisture coming out, and it is worth a look before it spreads.",
        answerEs:
          "Revise tres lugares. Primero, el garaje. En Fort Lauderdale los garajes suelen estar un escalón más bajo que la casa, y el agua salada que se quedó en el piso puede empapar la parte baja del drywall de la pared que comparte con la casa, además de lo que esté guardado en el piso. Segundo, el exterior. El agua salada contra el estuco, las molduras de madera, los marcos de las puertas y la parte baja de la puerta del garaje acelera la corrosión y la pudrición, y en casas viejas se mete por las grietas de la base de la pared. Enjuague esas áreas con agua dulce de la manguera. Tercero, el nivel del piso de la terraza o el patio con adoquines, donde la sal puede aflojar la base de arena. Si en las próximas semanas ve pintura con burbujas en la parte baja de una pared, olor a humedad en el garaje o hinchazón en la base de un marco de puerta, es la sal y la humedad saliendo, y vale la pena revisarlo antes de que se extienda.",
      },
      {
        question: "Can I wait until king tide season is over to fix the damage?",
        questionEs: "¿Puedo esperar a que termine la temporada de mareas rey para reparar el daño?",
        answer:
          "You can wait on the rebuild, but not on the tear-out and drying. Wet drywall, insulation and baseboards have to come out and the room has to be dried now, or you are looking at mold within days in this climate, and that turns a repair into a much bigger job. The rebuild is different. The City of Fort Lauderdale lists more king tide windows on November 5 to 11, November 22 to 28 and December 24 to 25. If your house took water this time, it can take it again. A sensible plan is to dry it out now, then rebuild with materials that handle water better in the lowest part of the room: tile or a waterproof floor instead of wood, PVC or composite baseboards instead of MDF, and cabinet bases that are not particle board. We can phase the job around those dates so you are not left with open walls during a tide.",
        answerEs:
          "Puede esperar para reconstruir, pero no para cortar y secar. El drywall, el aislamiento y los zócalos mojados tienen que salir y el cuarto tiene que secarse ahora, o en este clima va a tener moho en días, y eso convierte una reparación en un trabajo mucho más grande. La reconstrucción es otra cosa. La Ciudad de Fort Lauderdale anuncia más mareas rey del 5 al 11 de noviembre, del 22 al 28 de noviembre y el 24 y 25 de diciembre. Si su casa tomó agua esta vez, la puede tomar otra vez. Un plan sensato es secar ahora y luego reconstruir con materiales que aguantan mejor el agua en la parte más baja del cuarto: losa o piso impermeable en vez de madera, zócalos de PVC o compuesto en vez de MDF, y bases de gabinetes que no sean de aglomerado. Podemos organizar el trabajo alrededor de esas fechas para que no quede con paredes abiertas durante una marea.",
      },
    ],
    sources: [
      {
        label: "CBS Miami, King tide flooding in South Florida has businesses, residents experiencing multiple rounds of rising water",
        url: "https://www.cbsnews.com/miami/news/king-tide-miami-fort-lauderdale-south-florida-today-october-26-2026/",
        date: "2026-10-26",
      },
      {
        label: "CBS Miami, Fort Lauderdale official tours hardest-hit king tide areas as water runs 6 inches higher than ever before",
        url: "https://www.cbsnews.com/miami/news/fort-lauderdale-king-tide-flooding-2026-neighborhoods-tours/",
        date: "2026-10-28",
      },
      {
        label: "WLRN, Las Olas Bridge closed due to king tides",
        url: "https://www.wlrn.org/news-in-brief/2026-10-27/las-olas-bridge-closed-due-to-king-tides-peak-flooding-expected-this-week",
        date: "2026-10-27",
      },
      {
        label: "Tampa Bay Times / Miami Herald, 'Highest king tide ever' swamps South Florida",
        url: "https://www.tampabay.com/news/environment/2026/10/27/king-tide-south-florida-flooding-miami-fort-lauderdale/",
        date: "2026-10-27",
      },
      {
        label: "NBC 6, Fort Lauderdale king tide flooding could be worse Wednesday",
        url: "https://www.nbcmiami.com/news/local/worst-of-king-tide-flooding-may-not-be-over-yet-fort-lauderdale-official-says/3879049/",
        date: "2026-10-27",
      },
    ],
  },
  {
    slug: "hollywood",
    name: "Hollywood",
    nameEs: "Hollywood",
    county: "Broward",
    summary:
      "The October 2026 king tide flooded Hollywood Lakes and the streets behind Hollywood Beach, even where the city is building new seawalls. Here is what happened and how we repair saltwater damage in Hollywood homes.",
    summaryEs:
      "La marea rey de octubre de 2026 inundó Hollywood Lakes y las calles detrás de Hollywood Beach, incluso donde la ciudad está construyendo muros nuevos. Esto fue lo que pasó y cómo reparamos el daño por agua salada en casas de Hollywood.",
    whatHappened: [
      "The City of Hollywood warned that the highest water of this king tide would come October 26 through 28, 2026, and it did. Across South Florida the tide peaked Tuesday, October 27, at about 2.5 feet above high tide, a level the National Weather Service calls major flooding.",
      "On Monday, October 26, city crews pumped floodwater over a bridge near Hollywood Boulevard to drain the roads. Businesses along the Broadwalk stacked sandbags at their doors as flooding cut off several access roads. One shop owner said the September tide, a month earlier, had already brought about three feet of water and washed his store out.",
      "On Tuesday, October 27, a Hollywood Fire Rescue high-water vehicle was driving through the Hollywood Lakes neighborhood. The city has been installing new seawalls there, and the area still saw significant flooding.",
    ],
    whatHappenedEs: [
      "La Ciudad de Hollywood advirtió que el agua más alta de esta marea rey llegaría del 26 al 28 de octubre de 2026, y así fue. En todo el sur de Florida la marea llegó a su pico el martes 27 de octubre, cerca de 2.5 pies sobre la marea alta, un nivel que el Servicio Nacional de Meteorología llama inundación mayor.",
      "El lunes 26 de octubre, cuadrillas de la ciudad bombearon agua por encima de un puente cerca de Hollywood Boulevard para drenar las calles. Los negocios del Broadwalk pusieron sacos de arena en sus puertas mientras la inundación cerraba varias calles de acceso. Un dueño de tienda contó que la marea de septiembre, un mes antes, ya había traído unos tres pies de agua y le había inundado el local.",
      "El martes 27 de octubre, un vehículo de rescate para aguas altas de Hollywood Fire Rescue recorría el barrio de Hollywood Lakes. La ciudad ha estado instalando muros de contención nuevos allí, y aun así la zona tuvo una inundación importante.",
    ],
    hotspots: [
      {
        name: "Hollywood Lakes",
        note: "High-water rescue vehicle in the neighborhood on Oct 27, despite new seawall work.",
        noteEs: "Vehículo de rescate para aguas altas en el barrio el 27 de octubre, pese a los muros nuevos.",
      },
      {
        name: "Hollywood Beach Broadwalk",
        note: "Businesses sandbagged, several access roads blocked on Oct 26.",
        noteEs: "Negocios con sacos de arena y varias calles de acceso cerradas el 26 de octubre.",
      },
      {
        name: "Hollywood Blvd near the Intracoastal",
        note: "City crews pumped water over a bridge to drain roads on Oct 26.",
        noteEs: "La ciudad bombeó agua por encima de un puente para drenar las calles el 26 de octubre.",
      },
    ],
    whyItFloods:
      "Low streets near the Intracoastal drain toward the water, so when a king tide pushed by onshore wind rises above the drain outlets, water comes up through storm drains in the middle of streets that never touch a seawall. New seawalls help along the canals, but they do not stop water coming up from below. A Broadwalk shop owner told reporters the September tide had already flooded his store a month before this one.",
    whyItFloodsEs:
      "Las calles bajas cerca del Intracoastal drenan hacia el agua, así que cuando una marea rey empujada por el viento del mar sube por encima de las salidas del drenaje, el agua brota por los desagües en medio de calles que ni siquiera tocan un muro. Los muros nuevos ayudan en los canales, pero no detienen el agua que sube desde abajo. Un dueño de tienda del Broadwalk contó a la prensa que la marea de septiembre ya le había inundado el local un mes antes de esta.",
    prepTip:
      "If your house took water in September and October, plan on it happening again in November. Get valuables and electronics off the floor, keep door sweeps and garage door seals in good shape, and do not leave cars parked on the street during peak tide.",
    prepTipEs:
      "Si su casa tomó agua en septiembre y en octubre, cuente con que puede volver a pasar en noviembre. Suba del piso los objetos de valor y los equipos electrónicos, mantenga en buen estado los burletes de las puertas y los sellos de la puerta del garaje, y no deje los carros en la calle durante el pico de la marea.",
    faqs: [
      {
        question: "My Hollywood Lakes house flooded twice this season. Is it worth repairing the same way?",
        questionEs: "Mi casa en Hollywood Lakes se inundó dos veces esta temporada. ¿Vale la pena repararla igual que antes?",
        answer:
          "Not the same way. If water came in twice in two months, rebuild the lowest two feet of the house for the next one. That means tile or a fully waterproof floor instead of wood or laminate, PVC or composite baseboards instead of MDF that swells the first time it gets wet, and cabinet boxes in kitchens and bathrooms that are not particle board. On the walls, many homeowners in flood-prone streets choose to cut the drywall at a set height and finish the lower section with a material that can be rinsed and dried. None of this stops water from coming in. It changes the next cleanup from a tear-out into a rinse and dry. We will walk the house with you, show you where the water went, and give you a written scope that separates what has to be repaired now from upgrades you can choose.",
        answerEs:
          "No de la misma forma. Si el agua entró dos veces en dos meses, reconstruya los dos pies más bajos de la casa pensando en la próxima. Eso significa losa o un piso totalmente impermeable en vez de madera o laminado, zócalos de PVC o compuesto en vez de MDF que se hincha la primera vez que se moja, y cajas de gabinetes de cocina y baño que no sean de aglomerado. En las paredes, muchos propietarios en calles que se inundan cortan el drywall a una altura fija y terminan la parte baja con un material que se puede enjuagar y secar. Nada de esto evita que entre el agua. Lo que cambia es que la próxima limpieza sea enjuagar y secar en vez de demoler. Recorremos la casa con usted, le mostramos por dónde se fue el agua y le damos un alcance por escrito que separa lo que hay que reparar ahora de las mejoras que usted puede elegir.",
      },
      {
        question: "Saltwater sat in my garage for hours. What gets damaged?",
        questionEs: "El agua salada se quedó horas en mi garaje. ¿Qué se daña?",
        answer:
          "More than people think. The bottom of the drywall on any wall shared with the house soaks it up, and if that wall has insulation, the insulation holds the salt and the moisture. The bottom track of the garage door, the springs and the opener rail rust faster after saltwater. Water heaters, washers and dryers sitting on the slab often take damage to their controls. Anything stored in cardboard boxes on the floor is usually a loss. Start by rinsing the slab and the bottom of the walls with fresh water, then dry it with the door open and fans running. Check the shared wall from the inside of the house too. If the drywall feels soft, the paint is bubbling, or there is a musty smell after a few days, the lower part of that wall needs to be opened and dried. Painting over it now just traps the problem.",
        answerEs:
          "Más de lo que la gente cree. La parte baja del drywall de cualquier pared que comparte con la casa absorbe el agua, y si esa pared tiene aislamiento, el aislamiento guarda la sal y la humedad. El riel inferior de la puerta del garaje, los resortes y el riel del abridor se oxidan más rápido después del agua salada. Los calentadores de agua, las lavadoras y secadoras que están sobre el piso suelen dañarse en los controles. Lo que esté guardado en cajas de cartón en el piso casi siempre se pierde. Empiece enjuagando el piso y la parte baja de las paredes con agua dulce, y luego seque con la puerta abierta y ventiladores encendidos. Revise también la pared compartida desde adentro de la casa. Si el drywall se siente blando, la pintura hace burbujas o hay olor a humedad después de unos días, la parte baja de esa pared hay que abrirla y secarla. Pintar encima ahora solo atrapa el problema.",
      },
      {
        question: "Do you work in Hollywood, or only in Miami-Dade?",
        questionEs: "¿Trabajan en Hollywood o solo en Miami-Dade?",
        answer:
          "We work in Hollywood and across Broward as well as Miami-Dade. Our home base is Kendall, but flood repair does not wait for a zip code, and Hollywood is a short drive up I-95. For king tide damage we start with a walkthrough at the house. We look at where the water came in, how high it wicked up the walls, what is under the floor and behind the cabinets, and what can be saved. You get photos and a written scope you can hand to your flood carrier. From there we handle the tear-out and drying, then the rebuild: drywall, paint, tile, baseboards, bathroom and kitchen repairs. If the water reached electrical or plumbing, we bring in the right trade for that part. We are a family owned remodeling company and fully insured. Call (786) 363-7039 to set up the walkthrough.",
        answerEs:
          "Trabajamos en Hollywood y en todo Broward, además de Miami-Dade. Nuestra base está en Kendall, pero una reparación por inundación no espera por un código postal, y Hollywood queda a poca distancia por la I-95. Para daños por marea rey empezamos con una visita a la casa. Vemos por dónde entró el agua, qué tan alto subió por las paredes, qué hay debajo del piso y detrás de los gabinetes, y qué se puede salvar. Usted recibe fotos y un alcance por escrito que puede entregar a su aseguradora de inundación. Desde ahí nos encargamos de cortar y secar, y luego de reconstruir: drywall, pintura, losa, zócalos y reparaciones de baño y cocina. Si el agua llegó a la parte eléctrica o de plomería, traemos al oficio correcto para esa parte. Somos una empresa de remodelación familiar y totalmente asegurada. Llame al (786) 363-7039 para coordinar la visita.",
      },
    ],
    sources: [
      {
        label: "CBS Miami, King tide flooding in South Florida has businesses, residents experiencing multiple rounds of rising water",
        url: "https://www.cbsnews.com/miami/news/king-tide-miami-fort-lauderdale-south-florida-today-october-26-2026/",
        date: "2026-10-26",
      },
      {
        label: "South Florida Sun Sentinel, King tides bring coastal floods to South Florida (photos)",
        url: "https://www.sun-sentinel.com/2026/10/27/king-tides-bring-coastal-floods-to-south-florida-photos/",
        date: "2026-10-27",
      },
      {
        label: "City of Hollywood, Get Ready for King Tides",
        url: "https://www.hollywoodfl.org/m/newsflash/home/detail/1870",
        date: "2026-10",
      },
    ],
  },
  {
    slug: "miami-beach",
    name: "Miami Beach",
    nameEs: "Miami Beach",
    county: "Miami-Dade",
    summary:
      "The October 2026 king tide submerged Crespi Boulevard in North Beach and flooded Collins Avenue, the highest water Miami's tide gauge has recorded outside a hurricane. Here is what happened and how we repair saltwater damage in Miami Beach homes.",
    summaryEs:
      "La marea rey de octubre de 2026 sumergió Crespi Boulevard en North Beach e inundó Collins Avenue, el agua más alta que ha registrado el medidor de Miami fuera de un huracán. Esto fue lo que pasó y cómo reparamos el daño por agua salada en casas de Miami Beach.",
    whatHappened: [
      "On Tuesday, October 27, 2026, the [Virginia Key tide gauge](https://tidesandcurrents.noaa.gov/noaatidepredictions.html?id=8723214) recorded about 2.5 feet of water above high tide. That is the most water it has measured outside of a hurricane since it was installed in 1994, and University of Miami researcher Brian McNoldy put it in a near tie with Hurricanes Wilma and Irene.",
      "That morning, Crespi Boulevard in North Beach was completely under water. One homeowner was using a broom to push water away from her door, and by a little after 11 a.m. it had covered her front yard and reached within inches of the doorstep. Neighbors stood knee deep in the middle of the road.",
      "Further south, the Collins Express trolley drove through flooded streets at Collins Avenue and 50th Street, and floodwater covered the Fontainebleau Marina the day before. Reporters described water reaching the doors of coastal businesses in Miami Beach, and in some cases getting past them.",
    ],
    whatHappenedEs: [
      "El martes 27 de octubre de 2026, el [medidor de marea de Virginia Key](https://tidesandcurrents.noaa.gov/noaatidepredictions.html?id=8723214) registró cerca de 2.5 pies de agua por encima de la marea alta. Es la mayor cantidad de agua que ha medido fuera de un huracán desde que se instaló en 1994, y el investigador de la Universidad de Miami Brian McNoldy la puso casi empatada con los huracanes Wilma e Irene.",
      "Esa mañana, Crespi Boulevard en North Beach estaba completamente bajo el agua. Una propietaria usaba una escoba para alejar el agua de su puerta, y poco después de las 11 a.m. ya le había cubierto el patio delantero y estaba a pulgadas de la entrada. Los vecinos estaban con agua hasta las rodillas en medio de la calle.",
      "Más al sur, el trolley Collins Express pasó por calles inundadas en Collins Avenue y la calle 50, y el día anterior el agua cubrió la marina del Fontainebleau. La prensa reportó agua llegando a las puertas de negocios en Miami Beach, y en algunos casos pasando adentro.",
    ],
    hotspots: [
      {
        name: "Crespi Boulevard, North Beach",
        note: "Street fully submerged on Oct 27, water inches from front doors.",
        noteEs: "Calle totalmente sumergida el 27 de octubre, agua a pulgadas de las puertas.",
      },
      {
        name: "Collins Avenue at 50th Street",
        note: "Trolley driving through floodwater on Oct 27.",
        noteEs: "Trolley pasando entre el agua el 27 de octubre.",
      },
      {
        name: "Fontainebleau Marina, Mid-Beach",
        note: "Marina flooded on Oct 26.",
        noteEs: "Marina inundada el 26 de octubre.",
      },
    ],
    whyItFloods:
      "Miami Beach is a barrier island with Biscayne Bay on one side and the ocean on the other. North Beach streets like Crespi Boulevard run along the bay and the canals, and much of the island's stormwater drains into the bay. When the bay rises above the drain outlets, water comes back up through the street grates.",
    whyItFloodsEs:
      "Miami Beach es una isla de barrera con la Bahía de Biscayne de un lado y el océano del otro. Calles de North Beach como Crespi Boulevard corren junto a la bahía y los canales, y gran parte del drenaje pluvial de la isla desemboca en la bahía. Cuando la bahía sube por encima de las salidas del drenaje, el agua regresa por las rejillas de la calle.",
    prepTip:
      "For ground floor units and single-family homes near the bay, the door threshold is the line that matters. Water-rated door sweeps or removable flood barriers buy time, but keep rugs, electronics and anything in cardboard off the floor during each king tide window.",
    prepTipEs:
      "En unidades de planta baja y casas cerca de la bahía, el umbral de la puerta es la línea que importa. Los burletes resistentes al agua o las barreras removibles dan tiempo, pero mantenga alfombras, equipos electrónicos y todo lo que esté en cajas de cartón fuera del piso en cada marea rey.",
    faqs: [
      {
        question: "I live in a ground floor condo in Miami Beach. Who fixes what after a flood?",
        questionEs: "Vivo en un condominio de planta baja en Miami Beach. ¿Quién arregla qué después de una inundación?",
        answer:
          "It depends on your condo documents, but the usual split in Florida goes like this. The association is generally responsible for the building structure and common elements, which can include the drywall itself in some buildings. The unit owner is generally responsible for what is inside the unit: flooring, cabinets, fixtures, paint and anything you or a past owner installed. Read the maintenance section of your declaration, or ask the manager in writing, before work starts. Then document your unit and report it both to the association and to your own flood policy if you have one. We can work inside your unit on the items that are yours, coordinate with the building manager on access and work hours, and give you a written scope so the association's insurer and yours can each see which line belongs to whom.",
        answerEs:
          "Depende de los documentos de su condominio, pero la división usual en Florida es así. La asociación generalmente responde por la estructura del edificio y las áreas comunes, lo que en algunos edificios incluye el drywall. El propietario de la unidad generalmente responde por lo que está dentro: pisos, gabinetes, accesorios, pintura y todo lo que usted o un dueño anterior instaló. Lea la sección de mantenimiento de su declaración, o pregúntele al administrador por escrito, antes de empezar. Luego documente su unidad y repórtela tanto a la asociación como a su propia póliza de inundación si la tiene. Podemos trabajar dentro de su unidad en lo que le corresponde a usted, coordinar con el administrador el acceso y el horario, y darle un alcance por escrito para que la aseguradora de la asociación y la suya vean qué parte es de quién.",
      },
      {
        question: "The water only came an inch over my floor. Does the floor have to come up?",
        questionEs: "El agua solo subió una pulgada sobre mi piso. ¿Hay que levantar el piso?",
        answer:
          "It depends on what the floor is. Tile set on a concrete slab, which is most of Miami Beach, usually survives an inch of water. It needs to be cleaned, the grout rinsed of salt, and the baseboards checked, because MDF baseboards swell and wick water up into the drywall behind them. Laminate and many floating vinyl floors are different. Water gets under the planks and sits on the slab or the underlayment, with no way to dry, and laminate swells at the seams. Engineered and solid wood floors cup and often have to come up. Carpet and pad that took floodwater from outside come out. So an inch of water over tile is often a cleanup. An inch of water over laminate is often a new floor. We check under the edge of the floor and at the baseboards before telling you which one you have.",
        answerEs:
          "Depende del tipo de piso. La losa sobre placa de concreto, que es la mayoría en Miami Beach, normalmente aguanta una pulgada de agua. Hay que limpiarla, enjuagar la sal de la lechada y revisar los zócalos, porque los zócalos de MDF se hinchan y suben el agua al drywall que está detrás. El laminado y muchos pisos de vinil flotante son otra cosa. El agua se mete debajo de las tablas y se queda sobre la placa o la base, sin forma de secarse, y el laminado se hincha en las uniones. Los pisos de madera ingeniería y madera sólida se arquean y muchas veces hay que levantarlos. La alfombra y el acolchado que tomaron agua de afuera se botan. Así que una pulgada de agua sobre losa muchas veces es solo limpieza. Una pulgada sobre laminado muchas veces es piso nuevo. Revisamos debajo del borde del piso y en los zócalos antes de decirle cuál es su caso.",
      },
      {
        question: "Why does my house smell musty a week after the water went down?",
        questionEs: "¿Por qué mi casa huele a humedad una semana después de que bajó el agua?",
        answer:
          "Because something is still wet. The most common spots after a king tide are the bottom of the drywall, the insulation inside exterior walls, the toe kick under kitchen and bathroom cabinets, and the pad under carpet or a floating floor. Salt makes it worse. Salt left in those materials keeps pulling moisture out of the air, so in a humid Miami Beach house they can stay damp long after the floor looks dry. A musty smell usually means mold has started or is about to. Do not cover it with air freshener or a coat of paint. Open the affected area, take out the wet material, rinse and dry the cavity, and only then close it back up. If you are not sure where it is coming from, we can check the walls and cabinets and show you before anything gets cut.",
        answerEs:
          "Porque algo sigue mojado. Los lugares más comunes después de una marea rey son la parte baja del drywall, el aislamiento dentro de las paredes exteriores, el zócalo bajo los gabinetes de la cocina y el baño, y el acolchado debajo de la alfombra o de un piso flotante. La sal lo empeora. La sal que queda en esos materiales sigue atrayendo la humedad del aire, así que en una casa húmeda de Miami Beach pueden seguir mojados mucho después de que el piso se ve seco. El olor a humedad normalmente significa que el moho empezó o está por empezar. No lo tape con aromatizante ni con una mano de pintura. Abra el área afectada, saque el material mojado, enjuague y seque la cavidad, y solo entonces ciérrela. Si no sabe de dónde viene, podemos revisar las paredes y los gabinetes y mostrárselo antes de cortar nada.",
      },
    ],
    sources: [
      {
        label: "Tampa Bay Times / Miami Herald, 'Highest king tide ever' swamps South Florida",
        url: "https://www.tampabay.com/news/environment/2026/10/27/king-tide-south-florida-flooding-miami-fort-lauderdale/",
        date: "2026-10-27",
      },
      {
        label: "Miami Herald, Coastal flood warning issued in South Florida for king tide",
        url: "https://www.miamiherald.com/news/weather-news/article317812416.html",
        date: "2026-10-27",
      },
    ],
  },
  {
    slug: "miami",
    name: "Miami and Miami Shores",
    nameEs: "Miami y Miami Shores",
    county: "Miami-Dade",
    summary:
      "The October 2026 king tide flooded Edgewater streets and pushed water backward over flood barriers in Miami Shores and the Little River. Here is what happened and how we repair saltwater damage in Miami homes.",
    summaryEs:
      "La marea rey de octubre de 2026 inundó calles de Edgewater y empujó el agua en reversa sobre barreras de control en Miami Shores y el Little River. Esto fue lo que pasó y cómo reparamos el daño por agua salada en casas de Miami.",
    whatHappened: [
      "On Tuesday, October 27, 2026, Miami's Virginia Key tide gauge recorded about 2.5 feet of water above high tide, the most it has measured outside of a hurricane since 1994. Miami has seen about 8 inches of sea level rise since that gauge went in.",
      "In Edgewater, along the bay north of downtown, floodwater made streets hard to get through on Monday, October 26, and residents were carrying pets through the water on Tuesday morning.",
      "In Miami Shores, the water submerged the village golf course and shut it down for days. Near the 12th hole, a South Florida Water Management District flood control structure that is supposed to let canal water flow out to Biscayne Bay was not working. Water flowed backward, over the barrier and up into the canal. The same thing happened at the district's structures on the Little River and in North Miami Beach.",
    ],
    whatHappenedEs: [
      "El martes 27 de octubre de 2026, el [medidor de marea de Virginia Key](https://tidesandcurrents.noaa.gov/noaatidepredictions.html?id=8723214) en Miami registró cerca de 2.5 pies de agua por encima de la marea alta, lo máximo que ha medido fuera de un huracán desde 1994. Miami ha visto unas 8 pulgadas de aumento del nivel del mar desde que se instaló ese medidor.",
      "En Edgewater, junto a la bahía al norte del centro, el agua hizo difícil transitar las calles el lunes 26 de octubre, y el martes en la mañana los vecinos cargaban a sus mascotas entre el agua.",
      "En Miami Shores, el agua sumergió el campo de golf de la villa y lo cerró por días. Cerca del hoyo 12, una estructura de control de inundaciones del Distrito de Manejo del Agua del Sur de Florida, que debe dejar salir el agua del canal hacia la Bahía de Biscayne, no estaba funcionando. El agua corrió en reversa, por encima de la barrera y canal arriba. Lo mismo pasó en las estructuras del distrito en el Little River y en North Miami Beach.",
    ],
    hotspots: [
      {
        name: "Edgewater",
        note: "Flooded streets on Oct 26 and 27.",
        noteEs: "Calles inundadas el 26 y 27 de octubre.",
      },
      {
        name: "Miami Shores (golf course and canal)",
        note: "Golf course submerged, canal barrier overtopped and flowing backward on Oct 27.",
        noteEs: "Campo de golf sumergido, barrera del canal desbordada y corriendo en reversa el 27 de octubre.",
      },
      {
        name: "Little River",
        note: "Flood control structure overtopped, water backing up into the canal.",
        noteEs: "Estructura de control desbordada, agua subiendo por el canal.",
      },
    ],
    whyItFloods:
      "Much of this part of Miami drains through canals that were built more than 80 years ago to send rainwater out to Biscayne Bay. The gates at the mouths of those canals only work while the bay is lower than the canal. When a king tide pushes the bay higher, the water has nowhere to go, and on October 27 it went the wrong way, back up the canals toward homes. The district has federal money for bigger pumps and gates, but those projects are still in permitting.",
    whyItFloodsEs:
      "Gran parte de esta zona de Miami drena por canales construidos hace más de 80 años para sacar el agua de lluvia hacia la Bahía de Biscayne. Las compuertas en la boca de esos canales solo funcionan mientras la bahía está más baja que el canal. Cuando una marea rey sube la bahía, el agua no tiene adónde ir, y el 27 de octubre se fue en la dirección contraria, canal arriba hacia las casas. El distrito tiene fondos federales para bombas y compuertas más grandes, pero esos proyectos siguen en trámite de permisos.",
    prepTip:
      "If you live along a canal in Miami Shores or near the Little River, the canal level is your warning sign. When it is near the top of the bank during a king tide window, move cars, get things off the garage floor, and do not count on rain draining until the tide falls.",
    prepTipEs:
      "Si vive junto a un canal en Miami Shores o cerca del Little River, el nivel del canal es su señal de alerta. Cuando esté cerca del borde durante una marea rey, mueva los carros, suba las cosas del piso del garaje y no cuente con que la lluvia drene hasta que baje la marea.",
    faqs: [
      {
        question: "Water backed up from the canal into my yard in Miami Shores. Is my house at risk?",
        questionEs: "El agua del canal se metió en mi patio en Miami Shores. ¿Mi casa está en riesgo?",
        answer:
          "Look at three things. First, the foundation line. Many older Miami Shores homes are on a raised floor or a slab only a few inches above the yard, so look for a water line on the exterior walls and at the bottom of doors. Second, anything below that line: the garage, a converted ground floor room, the laundry, the AC condenser and the pool equipment. Third, the yard drains and any septic system, because saltwater that sat in the yard can push into both. If the water never crossed the threshold, rinse the bottom of the exterior walls and doors with fresh water and keep an eye out for bubbling paint or swelling over the next few weeks. If it did come in, treat it as a flood: document, call your flood carrier, and get the wet material out within a day or two. We can walk the property and tell you which case you are in.",
        answerEs:
          "Fíjese en tres cosas. Primero, la línea de la base. Muchas casas viejas de Miami Shores están sobre piso elevado o sobre una placa apenas unas pulgadas más alta que el patio, así que busque una marca de agua en las paredes exteriores y en la parte baja de las puertas. Segundo, todo lo que está por debajo de esa línea: el garaje, un cuarto convertido en planta baja, la lavandería, el condensador del aire acondicionado y el equipo de la piscina. Tercero, los desagües del patio y cualquier pozo séptico, porque el agua salada que se quedó en el patio puede meterse en ambos. Si el agua nunca pasó el umbral, enjuague la parte baja de las paredes exteriores y las puertas con agua dulce y esté pendiente de pintura con burbujas o hinchazón en las próximas semanas. Si entró, trátelo como inundación: documente, llame a su aseguradora de inundación y saque el material mojado en uno o dos días. Podemos recorrer la propiedad y decirle cuál es su caso.",
      },
      {
        question: "My Edgewater apartment building flooded at street level. What should I check in my unit?",
        questionEs: "Mi edificio en Edgewater se inundó a nivel de la calle. ¿Qué reviso en mi unidad?",
        answer:
          "If you are above the ground floor, your unit probably did not take floodwater, but check the things that connect to the ground floor. Garage parking, storage cages and anything in a ground level storage room may have been under water. Elevators and electrical rooms at street level sometimes take damage, which is the building's job. If you are on the ground floor, check the bottom of the drywall, the baseboards, the toe kicks under the kitchen and bathroom cabinets, and the edge of the floor at the walls. Salt and moisture there do not show right away. Watch for bubbling paint, a soft spot in the drywall, or a musty smell over the next two weeks. Ask the building manager in writing what the association covers before anyone opens a wall, and document your unit for your own policy. We can do the repair on the items that belong to you and coordinate access with management.",
        answerEs:
          "Si está por encima de la planta baja, su unidad probablemente no tomó agua, pero revise lo que se conecta con la planta baja. El estacionamiento, los depósitos y cualquier cosa en un cuarto de almacenamiento a nivel de calle pudieron quedar bajo el agua. Los elevadores y los cuartos eléctricos a nivel de calle a veces se dañan, y eso le toca al edificio. Si está en planta baja, revise la parte baja del drywall, los zócalos, la base bajo los gabinetes de la cocina y el baño, y el borde del piso junto a las paredes. La sal y la humedad ahí no se notan enseguida. Esté pendiente de pintura con burbujas, una zona blanda en el drywall u olor a humedad en las próximas dos semanas. Pregúntele por escrito al administrador qué cubre la asociación antes de que alguien abra una pared, y documente su unidad para su propia póliza. Podemos hacer la reparación de lo que le corresponde a usted y coordinar el acceso con la administración.",
      },
      {
        question: "Is the flooding going to keep getting worse here?",
        questionEs: "¿Las inundaciones van a seguir empeorando aquí?",
        answer:
          "The trend points that way. Miami has gained about 8 inches of sea level since the Virginia Key gauge went in in 1994, and researchers quoted after this tide said there is a clear trend toward more hours above normal high tide each year. Projections cited in the same reporting put South Florida at about two feet of additional rise by 2060. The canal gates in Miami Shores and on the Little River that failed on October 27 are slated for larger pumps and gates, with federal funding reinstated this year, but those projects are still in permitting. In practical terms, if your home took water this season, plan for it to happen again on the next big tide and rebuild the lowest part of the house with materials that can be rinsed and dried. The City of Fort Lauderdale lists the next windows as November 5 to 11, November 22 to 28 and December 24 to 25, and Miami sees the same tides.",
        answerEs:
          "La tendencia apunta a que sí. Miami ha ganado unas 8 pulgadas de nivel del mar desde que se instaló el medidor de Virginia Key en 1994, y los investigadores citados después de esta marea dijeron que hay una tendencia clara a más horas por encima de la marea alta normal cada año. Las proyecciones citadas en esos mismos reportajes ponen al sur de Florida en unos dos pies más de aumento para 2060. Las compuertas de los canales de Miami Shores y del Little River que fallaron el 27 de octubre tienen previstas bombas y compuertas más grandes, con fondos federales restablecidos este año, pero esos proyectos siguen en trámite de permisos. En la práctica, si su casa tomó agua esta temporada, cuente con que vuelva a pasar en la próxima marea grande y reconstruya la parte más baja de la casa con materiales que se puedan enjuagar y secar. La Ciudad de Fort Lauderdale anuncia las próximas fechas del 5 al 11 de noviembre, del 22 al 28 de noviembre y el 24 y 25 de diciembre, y Miami ve las mismas mareas.",
      },
    ],
    sources: [
      {
        label: "Tampa Bay Times / Miami Herald, 'Highest king tide ever' swamps South Florida",
        url: "https://www.tampabay.com/news/environment/2026/10/27/king-tide-south-florida-flooding-miami-fort-lauderdale/",
        date: "2026-10-27",
      },
      {
        label: "Miami Herald, Rain, wind and king tide flooding making Miami's streets tough to navigate",
        url: "https://www.miamiherald.com/news/local/environment/article317772209.html",
        date: "2026-10-26",
      },
      {
        label: "Miami-Dade County, King Tides",
        url: "https://www.miamidade.gov/initiative/weather-ready/flooding/king-tides.page",
        date: "2026",
      },
    ],
  },
]

export function findKingTideArea(slug: string) {
  return kingTideAreas.find((a) => a.slug === slug)
}
