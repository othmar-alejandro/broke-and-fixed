/**
 * HOA-heavy Miami-Dade communities for programmatic SEO.
 *
 * Each entry powers a page at /[locale]/hoa-renovation-guide/[slug] that targets
 * long-tail searches like "Doral HOA renovation approval" or "Coral Gables Board
 * of Architects remodel". Content is unique-per-community to avoid duplicate
 * content penalties.
 */

export interface HoaCommunity {
  slug: string
  slugEs: string
  name: string
  nameEs: string

  /** Short intro paragraph. Should mention the area and HOA prevalence. */
  intro: string
  introEs: string

  /** Typical approval timeline in this community. */
  typicalTimeline: string
  typicalTimelineEs: string

  /** Named HOAs / common sub-communities. Empty array if not specifically known. */
  knownHoas: string[]

  /** Common renovation approval patterns (paint, windows, roof). */
  commonApprovals: {
    paint: string
    paintEs: string
    windows: string
    windowsEs: string
    roof: string
    roofEs: string
  }

  /** Local quirks worth calling out (e.g., Coral Gables Board of Architects). */
  localQuirk: string | null
  localQuirkEs: string | null

  /** Community-specific FAQ items (2-3 per community for SEO depth). */
  faqs: Array<{
    question: string
    questionEs: string
    answer: string
    answerEs: string
  }>

  /** Map service to image key for hero (reuse existing serviceImages). */
  heroImageKey: string

  /** Linked location slug from lib/data/locations.ts for breadcrumbs/cross-links. */
  locationSlug: string
}

export const hoaCommunities: HoaCommunity[] = [
  {
    slug: "doral",
    slugEs: "doral",
    name: "Doral",
    nameEs: "Doral",
    intro:
      "Doral is one of the most HOA-heavy areas in Miami-Dade. Most homes here are in master-planned communities built after 2000 with active architectural review committees. If you're renovating in Doral, you're almost certainly working through an HOA approval process.",
    introEs:
      "Doral es una de las areas con mas HOA en Miami-Dade. La mayoria de las casas aqui estan en comunidades planificadas construidas despues del 2000 con comites activos de revision arquitectonica. Si estas renovando en Doral, casi con certeza estas trabajando a traves de un proceso de aprobacion del HOA.",
    typicalTimeline: "3 to 5 weeks for standard exterior projects, longer for major additions",
    typicalTimelineEs: "3 a 5 semanas para proyectos exteriores estandar, mas para adiciones mayores",
    knownHoas: [
      "Doral Isles HOA",
      "Vintage Estates at Doral",
      "Doral Park Country Club",
      "Doral Estates",
      "Doral Cay",
      "Costa Bella",
      "Doral Meadows",
      "Doral Pointe",
    ],
    commonApprovals: {
      paint:
        "Most Doral communities maintain an approved color palette of 8 to 15 colors. Many require all colors to come from Sherwin-Williams or Benjamin Moore lines. You submit a color sample with your application.",
      paintEs:
        "La mayoria de las comunidades de Doral mantienen una paleta de colores aprobada de 8 a 15 colores. Muchas requieren que todos los colores vengan de las lineas de Sherwin-Williams o Benjamin Moore. Envias una muestra de color con tu solicitud.",
      windows:
        "Hurricane impact windows are widely accepted in Doral. Most HOAs specify bronze or white frames. Manufacturers PGT and ESWindows are commonly pre-approved.",
      windowsEs:
        "Las ventanas de impacto contra huracanes son ampliamente aceptadas en Doral. La mayoria de los HOAs especifican marcos bronce o blancos. Los fabricantes PGT y ESWindows son comunmente pre-aprobados.",
      roof:
        "Tile roofs in terra cotta or charcoal are the standard. Some newer Doral communities allow metal roofs in specific colors. Reroofs almost always need both county permits and HOA color approval.",
      roofEs:
        "Los techos de teja en terracota o carbon son el estandar. Algunas comunidades mas nuevas de Doral permiten techos de metal en colores especificos. Los retechados casi siempre necesitan tanto permisos del condado como aprobacion de color del HOA.",
    },
    localQuirk:
      "Doral has the City of Doral building department running separately from Miami-Dade. Permit applications go through the city, not the county. Plan reviewers in Doral can be detailed about hurricane code compliance.",
    localQuirkEs:
      "Doral tiene su propio departamento de construccion separado de Miami-Dade. Las solicitudes de permisos van a traves de la ciudad, no del condado. Los revisores de planos en Doral pueden ser detallados sobre el cumplimiento del codigo contra huracanes.",
    faqs: [
      {
        question: "How strict are Doral HOAs about exterior paint colors?",
        questionEs: "Que tan estrictos son los HOAs de Doral con los colores de pintura exterior?",
        answer:
          "Strict, but predictable. Most Doral HOAs publish an approved palette and stick to it. Earth tones, warm whites, and soft pastels make up most palettes. Bold colors or non-listed shades are typically denied. If you're attached to a specific color, submit your sample to the ARC informally before committing to a paint purchase. We've seen ARCs approve off-list colors in rare cases when the homeowner makes a compelling case and the color is consistent with the community aesthetic.",
        answerEs:
          "Estrictos, pero predecibles. La mayoria de los HOAs de Doral publican una paleta aprobada y se quedan con ella. Tonos tierra, blancos calidos, y pasteles suaves componen la mayoria de las paletas. Los colores audaces o tonos no listados son tipicamente negados. Si estas apegado a un color especifico, envia tu muestra al ARC informalmente antes de comprometerte con una compra de pintura. Hemos visto ARCs aprobar colores fuera de lista en casos raros cuando el propietario presenta un caso convincente y el color es consistente con la estetica de la comunidad.",
      },
      {
        question: "Do I need HOA approval to install solar panels in Doral?",
        questionEs: "Necesito aprobacion del HOA para instalar paneles solares en Doral?",
        answer:
          "Yes, you need to apply, but the HOA cannot deny the basic installation. Florida Statute §163.04 protects your right to install solar. Doral HOAs can specify placement standards (rear-facing roof slope preferred, no panels visible from the street where avoidable). Submit a roof plan showing panel placement and you should be approved within 4 to 6 weeks.",
        answerEs:
          "Si, necesitas aplicar, pero el HOA no puede negar la instalacion basica. El Estatuto de Florida §163.04 protege tu derecho a instalar paneles solares. Los HOAs de Doral pueden especificar estandares de colocacion (pendiente del techo trasero preferida, sin paneles visibles desde la calle donde sea evitable). Envia un plano del techo mostrando la colocacion de los paneles y debes ser aprobado dentro de 4 a 6 semanas.",
      },
      {
        question: "Can I add a screen enclosure to my Doral home without HOA pushback?",
        questionEs: "Puedo agregar un cerramiento de pantalla a mi casa de Doral sin resistencia del HOA?",
        answer:
          "Most Doral HOAs allow screen enclosures with conditions. They typically require the structure to be set back from the property line, painted to match the home, and use frame colors from the approved palette (usually bronze or white). You will need both Doral building permits and HOA approval. Plan for 6 to 10 weeks total before construction starts.",
        answerEs:
          "La mayoria de los HOAs de Doral permiten cerramientos de pantalla con condiciones. Tipicamente requieren que la estructura este retirada del limite de la propiedad, pintada para coincidir con la casa, y usar colores de marco de la paleta aprobada (usualmente bronce o blanco). Necesitaras permisos de construccion de Doral y aprobacion del HOA. Planea 6 a 10 semanas total antes de que empiece la construccion.",
      },
    ],
    heroImageKey: "kitchen",
    locationSlug: "doral",
  },

  {
    slug: "the-hammocks",
    slugEs: "the-hammocks",
    name: "The Hammocks",
    nameEs: "The Hammocks",
    intro:
      "The Hammocks is a master-planned community in West Kendall built primarily in the 1980s and 1990s. The community has a master HOA plus multiple sub-association HOAs covering specific villages within The Hammocks. If you're renovating here, you're usually dealing with the sub-HOA for your specific village, not the master.",
    introEs:
      "The Hammocks es una comunidad planificada en West Kendall construida principalmente en los anos 80 y 90. La comunidad tiene un HOA maestro mas multiples sub-asociaciones HOAs cubriendo villas especificas dentro de The Hammocks. Si estas renovando aqui, usualmente estas tratando con el sub-HOA para tu villa especifica, no con el maestro.",
    typicalTimeline: "2 to 4 weeks for most projects through the sub-association",
    typicalTimelineEs: "2 a 4 semanas para la mayoria de los proyectos a traves de la sub-asociacion",
    knownHoas: [
      "The Hammocks Master Association",
      "Cherry Hill at The Hammocks",
      "Princeton at The Hammocks",
      "Bonita Lakes at The Hammocks",
      "Devon Park",
      "Park Lake",
      "Crystal Lake at The Hammocks",
    ],
    commonApprovals: {
      paint:
        "The Hammocks sub-HOAs generally allow a wider color range than newer master-planned communities. Light to medium earth tones, soft yellows, warm whites, and certain blues are common. Submit a color chip and matching photos of neighbors for fastest approval.",
      paintEs:
        "Los sub-HOAs de The Hammocks generalmente permiten un rango de colores mas amplio que las comunidades planificadas mas nuevas. Tonos tierra claros a medios, amarillos suaves, blancos calidos, y ciertos azules son comunes. Envia un chip de color y fotos coincidentes de los vecinos para la aprobacion mas rapida.",
      windows:
        "Bronze and white frames are widely accepted. The Hammocks generally has older specifications, so some sub-HOAs do not have updated hurricane protection guidelines. You can still install impact windows under Florida law (see our hurricane windows guide).",
      windowsEs:
        "Los marcos bronce y blanco son ampliamente aceptados. The Hammocks generalmente tiene especificaciones mas antiguas, asi que algunos sub-HOAs no tienen guias actualizadas de proteccion contra huracanes. Aun puedes instalar ventanas de impacto bajo la ley de Florida (vea nuestra guia de ventanas contra huracanes).",
      roof:
        "Original tile roofs in barrel terra cotta are common in older Hammocks villages. Modern flat tile in similar colors is generally accepted. Metal roofs require specific approval and are denied in some sub-communities.",
      roofEs:
        "Los techos de teja originales en barril terracota son comunes en las villas mas antiguas de The Hammocks. La teja plana moderna en colores similares es generalmente aceptada. Los techos de metal requieren aprobacion especifica y son negados en algunas sub-comunidades.",
    },
    localQuirk:
      "The Hammocks Master Association handles common areas (gates, lakes, parks) while sub-associations handle individual home approvals. Make sure you're applying to the right entity. Confusing the two is the #1 cause of delays for new owners.",
    localQuirkEs:
      "La Asociacion Maestra de The Hammocks maneja areas comunes (puertas, lagos, parques) mientras que las sub-asociaciones manejan aprobaciones individuales de casas. Asegurate de aplicar a la entidad correcta. Confundir las dos es la causa numero uno de retrasos para nuevos duenos.",
    faqs: [
      {
        question: "Which HOA do I submit my renovation application to in The Hammocks?",
        questionEs: "A cual HOA envio mi solicitud de renovacion en The Hammocks?",
        answer:
          "You submit to the sub-association for your specific village within The Hammocks. The master association handles community-wide concerns (gates, common areas) but not individual home renovations. Your closing documents or property tax records should identify your sub-association. If unsure, call the master association office and they can direct you. Submitting to the wrong entity does not count and can delay your timeline by weeks.",
        answerEs:
          "Envias a la sub-asociacion para tu villa especifica dentro de The Hammocks. La asociacion maestra maneja preocupaciones a nivel de comunidad (puertas, areas comunes) pero no renovaciones individuales de casas. Tus documentos de cierre o registros de impuestos a la propiedad deben identificar tu sub-asociacion. Si no estas seguro, llama a la oficina de la asociacion maestra y pueden dirigirte. Enviar a la entidad equivocada no cuenta y puede retrasar tu cronograma por semanas.",
      },
      {
        question: "Are roof color rules in The Hammocks strict?",
        questionEs: "Son estrictas las reglas de color de techo en The Hammocks?",
        answer:
          "Moderately strict. Most sub-associations maintain a list of approved tile manufacturers and colors. Barrel terra cotta and warm browns dominate. Black, very dark gray, and bright colors are typically denied. Newer flat-tile products in approved color families are often allowed even when not specifically listed if you submit samples. Plan for color approval to add 1 to 2 weeks beyond your basic ARC timeline if you're going off the standard palette.",
        answerEs:
          "Moderadamente estrictas. La mayoria de las sub-asociaciones mantienen una lista de fabricantes de tejas aprobados y colores. Barril terracota y marrones calidos dominan. Negro, gris muy oscuro, y colores brillantes son tipicamente negados. Los productos de teja plana mas nuevos en familias de colores aprobadas a menudo son permitidos incluso cuando no estan especificamente listados si envias muestras. Planea que la aprobacion de color agregue 1 a 2 semanas mas alla de tu cronograma basico del ARC si te sales de la paleta estandar.",
      },
    ],
    heroImageKey: "exterior-painting",
    locationSlug: "the-hammocks",
  },

  {
    slug: "west-kendall",
    slugEs: "west-kendall",
    name: "West Kendall",
    nameEs: "West Kendall",
    intro:
      "West Kendall grew during the 1990s and 2000s building boom. Most homes here are in planned communities with active HOAs and well-defined architectural guidelines. The age of the housing stock (20 to 35 years) means a lot of West Kendall homeowners are doing renovations now, which means a lot of HOA applications crossing ARC desks.",
    introEs:
      "West Kendall crecio durante el auge de construccion de los 90 y 2000. La mayoria de las casas aqui estan en comunidades planificadas con HOAs activos y guias arquitectonicas bien definidas. La edad del inventario de viviendas (20 a 35 anos) significa que muchos propietarios de West Kendall estan haciendo renovaciones ahora, lo que significa muchas aplicaciones del HOA cruzando los escritorios del ARC.",
    typicalTimeline: "3 to 5 weeks for typical projects",
    typicalTimelineEs: "3 a 5 semanas para proyectos tipicos",
    knownHoas: [
      "Calusa",
      "Lakes by the Bay",
      "Country Walk West",
      "Coral Gate",
      "Continental Park",
      "Kendall Lakes (sections with HOA)",
      "Kendall Breeze",
    ],
    commonApprovals: {
      paint:
        "Color palettes vary widely by community. Earth tones and warm neutrals dominate the older West Kendall HOAs. Newer subdivisions have started incorporating cooler grays and modern whites into their palettes.",
      paintEs:
        "Las paletas de colores varian ampliamente por comunidad. Tonos tierra y neutros calidos dominan los HOAs mas antiguos de West Kendall. Las subdivisiones mas nuevas han empezado a incorporar grises mas frios y blancos modernos en sus paletas.",
      windows:
        "Standard bronze, white, and clear frames widely accepted. Hurricane impact upgrades are very common in West Kendall as homes age out of their original windows. Most HOAs have updated hurricane protection specs.",
      windowsEs:
        "Marcos estandar bronce, blanco, y transparente ampliamente aceptados. Las actualizaciones de impacto contra huracanes son muy comunes en West Kendall ya que las casas envejecen y necesitan reemplazar sus ventanas originales. La mayoria de los HOAs tienen especificaciones actualizadas de proteccion contra huracanes.",
      roof:
        "Concrete tile and barrel tile both common. Many HOAs require matching neighbor colors within the same street block. Newer flat-profile tiles in earth tones are typically accepted.",
      roofEs:
        "Teja de concreto y teja de barril ambas comunes. Muchos HOAs requieren coincidir con los colores de los vecinos dentro de la misma cuadra. Las tejas mas nuevas de perfil plano en tonos tierra son tipicamente aceptadas.",
    },
    localQuirk:
      "Many West Kendall homes are on cul-de-sacs with shared walls or close lot lines. Some HOAs have specific rules about renovation work that requires neighbor consultation. Check your declaration of covenants.",
    localQuirkEs:
      "Muchas casas de West Kendall estan en callejones sin salida con paredes compartidas o lineas de lote cercanas. Algunos HOAs tienen reglas especificas sobre el trabajo de renovacion que requiere consulta con el vecino. Revisa tu declaracion de convenios.",
    faqs: [
      {
        question: "How do West Kendall HOAs handle landscaping changes?",
        questionEs: "Como manejan los HOAs de West Kendall los cambios de paisajismo?",
        answer:
          "Most West Kendall HOAs have minimum landscaping coverage requirements and protected tree lists. You can replace landscaping but not eliminate it entirely. Removing mature trees usually requires both HOA approval and Miami-Dade DERM approval for protected species. The HOA application is straightforward if you submit a planting plan showing what you'll add to replace what you remove.",
        answerEs:
          "La mayoria de los HOAs de West Kendall tienen requisitos minimos de cobertura de paisajismo y listas de arboles protegidos. Puedes reemplazar el paisajismo pero no eliminarlo por completo. Remover arboles maduros usualmente requiere aprobacion del HOA y aprobacion de DERM de Miami-Dade para especies protegidas. La solicitud del HOA es sencilla si envias un plan de plantacion mostrando lo que agregaras para reemplazar lo que removeras.",
      },
      {
        question: "Can I install pavers over my existing concrete driveway in West Kendall?",
        questionEs: "Puedo instalar pavers sobre mi entrada de concreto existente en West Kendall?",
        answer:
          "Generally yes with approval. Most West Kendall HOAs allow driveway upgrades to pavers if the color and pattern match community standards. Submit photos of the proposed pavers, your driveway dimensions, and any drainage considerations. Approval typically takes 3 to 4 weeks. You may also need a Miami-Dade or municipal permit depending on whether you're touching the apron near the street.",
        answerEs:
          "Generalmente si con aprobacion. La mayoria de los HOAs de West Kendall permiten actualizaciones de entrada a pavers si el color y patron coinciden con los estandares de la comunidad. Envia fotos de los pavers propuestos, las dimensiones de tu entrada, y cualquier consideracion de drenaje. La aprobacion tipicamente toma 3 a 4 semanas. Tambien puedes necesitar un permiso de Miami-Dade o municipal dependiendo si estas tocando el delantal cerca de la calle.",
      },
    ],
    heroImageKey: "kitchen",
    locationSlug: "west-kendall",
  },

  {
    slug: "the-crossings",
    slugEs: "the-crossings",
    name: "The Crossings",
    nameEs: "The Crossings",
    intro:
      "The Crossings is one of the more remodel-friendly HOA communities in West Kendall. Homes here mostly date from the 1980s and have plenty of original features homeowners want to update. The HOA architectural review process here tends to be quicker and more straightforward than in some neighboring communities.",
    introEs:
      "The Crossings es una de las comunidades con HOA mas amigables para renovaciones en West Kendall. Las casas aqui mayormente datan de los anos 80 y tienen muchas caracteristicas originales que los propietarios quieren actualizar. El proceso de revision arquitectonica del HOA aqui tiende a ser mas rapido y directo que en algunas comunidades vecinas.",
    typicalTimeline: "2 to 3 weeks for most renovations",
    typicalTimelineEs: "2 a 3 semanas para la mayoria de las renovaciones",
    knownHoas: [
      "The Crossings Master Association",
      "Coronado at The Crossings",
      "Eagle Ridge at The Crossings",
      "Country Estates at The Crossings",
    ],
    commonApprovals: {
      paint:
        "The Crossings palette includes warm whites, light beiges, and soft earth tones. Specific shades vary, but the overall direction is neutral and consistent with neighbors. Bright or stark colors are typically denied.",
      paintEs:
        "La paleta de The Crossings incluye blancos calidos, beiges claros, y tonos tierra suaves. Los tonos especificos varian, pero la direccion general es neutra y consistente con los vecinos. Los colores brillantes o sombrios son tipicamente negados.",
      windows:
        "Hurricane impact windows are widely approved. The Crossings has standardized on bronze and white frames as the common defaults. Specific manufacturer brand is less often dictated here than in some communities.",
      windowsEs:
        "Las ventanas de impacto contra huracanes son ampliamente aprobadas. The Crossings se ha estandarizado en marcos bronce y blanco como los predeterminados comunes. La marca especifica del fabricante es menos a menudo dictada aqui que en algunas comunidades.",
      roof:
        "Concrete flat tile and barrel tile both accepted. Brown, terra cotta, and gray are the most common approved color families.",
      roofEs:
        "Teja plana de concreto y teja de barril ambas aceptadas. Marron, terracota, y gris son las familias de colores aprobadas mas comunes.",
    },
    localQuirk: null,
    localQuirkEs: null,
    faqs: [
      {
        question: "Is The Crossings HOA easier to work with than other West Kendall HOAs?",
        questionEs: "Es el HOA de The Crossings mas facil para trabajar que otros HOAs de West Kendall?",
        answer:
          "In our experience, yes. The Crossings ARC tends to respond faster, give clearer feedback, and approve sensible renovations without excessive back-and-forth. The community's age (1980s) means a lot of renovations are happening, and the HOA has gotten efficient at processing them. The main exception is anything involving major exterior structural changes, which still go through a careful review.",
        answerEs:
          "En nuestra experiencia, si. El ARC de The Crossings tiende a responder mas rapido, dar retroalimentacion mas clara, y aprobar renovaciones sensibles sin excesivo ida y vuelta. La edad de la comunidad (anos 80) significa que muchas renovaciones estan pasando, y el HOA se ha vuelto eficiente al procesarlas. La excepcion principal es cualquier cosa que involucre cambios estructurales exteriores mayores, que aun pasan por una revision cuidadosa.",
      },
    ],
    heroImageKey: "kitchen",
    locationSlug: "the-crossings",
  },

  {
    slug: "country-walk",
    slugEs: "country-walk",
    name: "Country Walk",
    nameEs: "Country Walk",
    intro:
      "Country Walk is a family-oriented HOA community in West Kendall with homes from the late 1980s and 1990s. The HOA tends to be homeowner-friendly with reasonable architectural standards. Most renovations in Country Walk move through approval without major friction.",
    introEs:
      "Country Walk es una comunidad familiar con HOA en West Kendall con casas de finales de los 80 y 90. El HOA tiende a ser amigable con los propietarios con estandares arquitectonicos razonables. La mayoria de las renovaciones en Country Walk se mueven a traves de la aprobacion sin friccion mayor.",
    typicalTimeline: "2 to 4 weeks for typical projects",
    typicalTimelineEs: "2 a 4 semanas para proyectos tipicos",
    knownHoas: [
      "Country Walk Master Association",
      "The Greens at Country Walk",
      "Royal Oaks at Country Walk",
    ],
    commonApprovals: {
      paint:
        "Country Walk maintains a moderate-sized approved palette. Earth tones, soft yellows, and warm whites are common. The HOA looks for consistency with immediate neighbors more than strict palette adherence.",
      paintEs:
        "Country Walk mantiene una paleta aprobada de tamano moderado. Tonos tierra, amarillos suaves, y blancos calidos son comunes. El HOA busca consistencia con los vecinos inmediatos mas que adherencia estricta a la paleta.",
      windows:
        "Standard bronze and white frames accepted. Hurricane impact upgrades commonly approved. Some specific brands listed in newer guidelines.",
      windowsEs:
        "Marcos estandar bronce y blanco aceptados. Actualizaciones de impacto contra huracanes comunmente aprobadas. Algunas marcas especificas listadas en guias mas nuevas.",
      roof:
        "Barrel tile and flat concrete tile in earth tones are the standard. Specific approved colors include terra cotta, warm brown, and lighter beige variations.",
      roofEs:
        "Teja de barril y teja plana de concreto en tonos tierra son el estandar. Los colores aprobados especificos incluyen terracota, marron calido, y variaciones de beige mas claras.",
    },
    localQuirk: null,
    localQuirkEs: null,
    faqs: [
      {
        question: "Does Country Walk allow fence color changes?",
        questionEs: "Permite Country Walk cambios de color de cerca?",
        answer:
          "Yes, with approval. Country Walk has approved fence colors (typically white, beige, and earth tones). You submit a color sample with your application. Wood fences must be stained or painted within the approved palette. Vinyl and aluminum fences are accepted in standard manufacturer colors. Fence height limits also apply, typically 6 feet for side and back yards.",
        answerEs:
          "Si, con aprobacion. Country Walk tiene colores de cerca aprobados (tipicamente blanco, beige, y tonos tierra). Envias una muestra de color con tu solicitud. Las cercas de madera deben ser tenidas o pintadas dentro de la paleta aprobada. Las cercas de vinilo y aluminio son aceptadas en colores estandar del fabricante. Los limites de altura de cercas tambien aplican, tipicamente 6 pies para los patios laterales y traseros.",
      },
    ],
    heroImageKey: "exterior-painting",
    locationSlug: "country-walk",
  },

  {
    slug: "coral-gables",
    slugEs: "coral-gables",
    name: "Coral Gables",
    nameEs: "Coral Gables",
    intro:
      "Coral Gables is different from every other community in Miami-Dade because the city itself has a Board of Architects that reviews exterior changes. Some Coral Gables homes are also in HOA-governed sub-communities, which adds a second review layer. If you're renovating in Coral Gables, you're likely dealing with the city BoA first, then HOA second.",
    introEs:
      "Coral Gables es diferente de cada otra comunidad en Miami-Dade porque la ciudad misma tiene una Junta de Arquitectos que revisa cambios exteriores. Algunas casas de Coral Gables tambien estan en sub-comunidades gobernadas por HOA, lo cual agrega una segunda capa de revision. Si estas renovando en Coral Gables, probablemente estas tratando con la BoA de la ciudad primero, y el HOA en segundo lugar.",
    typicalTimeline: "6 to 12 weeks total (BoA plus any HOA review)",
    typicalTimelineEs: "6 a 12 semanas total (BoA mas cualquier revision del HOA)",
    knownHoas: [
      "City of Coral Gables Board of Architects (city-level review)",
      "Cocoplum HOA",
      "Riviera HOA",
      "Coral Gables Estates",
    ],
    commonApprovals: {
      paint:
        "Coral Gables has the strictest exterior color rules in Miami-Dade. The city maintains specific approved palettes that vary by district. Mediterranean Revival areas favor cream, ivory, soft pink, and warm yellows. Other districts have their own palettes. The BoA reviews all exterior paint changes.",
      paintEs:
        "Coral Gables tiene las reglas de color exterior mas estrictas en Miami-Dade. La ciudad mantiene paletas aprobadas especificas que varian por distrito. Las areas de Renacimiento Mediterraneo favorecen crema, marfil, rosa suave, y amarillos calidos. Otros distritos tienen sus propias paletas. La BoA revisa todos los cambios de pintura exterior.",
      windows:
        "Hurricane impact windows must match the architectural style of the home. The BoA may require divided light grids on historic-style homes. Bronze and clear glass dominate. Vinyl frames are typically denied for Mediterranean Revival and similar styles.",
      windowsEs:
        "Las ventanas de impacto contra huracanes deben coincidir con el estilo arquitectonico de la casa. La BoA puede requerir cuadriculas de vidrio dividido en casas de estilo historico. Bronce y vidrio transparente dominan. Los marcos de vinilo son tipicamente negados para Renacimiento Mediterraneo y estilos similares.",
      roof:
        "Barrel tile in specific colors (clay red, warm brown, certain off-whites) is required for most historic district homes. Flat tile is sometimes allowed in newer subdivisions. Slate-look products may be approved on a case-by-case basis.",
      roofEs:
        "Teja de barril en colores especificos (rojo arcilla, marron calido, ciertos blancos crema) es requerida para la mayoria de las casas de distritos historicos. La teja plana a veces es permitida en subdivisiones mas nuevas. Productos tipo pizarra pueden ser aprobados caso por caso.",
    },
    localQuirk:
      "The Coral Gables Board of Architects is a city-level review, not an HOA. You submit applications to City Hall, attend public meetings, and may present in person. Significant changes can require multiple BoA meetings before approval. Budget at least 6 weeks for the BoA process alone.",
    localQuirkEs:
      "La Junta de Arquitectos de Coral Gables es una revision a nivel de ciudad, no un HOA. Envias solicitudes al Ayuntamiento, asistes a reuniones publicas, y puedes presentar en persona. Los cambios significativos pueden requerir multiples reuniones de la BoA antes de la aprobacion. Presupuesta al menos 6 semanas solo para el proceso de la BoA.",
    faqs: [
      {
        question: "Does the Coral Gables BoA review interior renovations?",
        questionEs: "Revisa la BoA de Coral Gables las renovaciones interiores?",
        answer:
          "Generally no. The Board of Architects focuses on exterior appearance and visible changes. Interior renovations that don't affect the exterior (kitchen, bathroom, flooring, paint inside) do not need BoA review. They still need standard city building permits for the work involved. If your interior renovation involves moving windows, adding skylights, or any exterior-visible change, that visible portion does need BoA review.",
        answerEs:
          "Generalmente no. La Junta de Arquitectos se enfoca en la apariencia exterior y cambios visibles. Las renovaciones interiores que no afectan el exterior (cocina, bano, piso, pintura interior) no necesitan revision de la BoA. Aun necesitan los permisos estandar de construccion de la ciudad para el trabajo involucrado. Si tu renovacion interior involucra mover ventanas, agregar tragaluces, o cualquier cambio visible exterior, esa porcion visible si necesita revision de la BoA.",
      },
      {
        question: "What if my Coral Gables home is in an HOA community AND the BoA reviews?",
        questionEs: "Que pasa si mi casa de Coral Gables esta en una comunidad con HOA Y la BoA revisa?",
        answer:
          "You need both approvals. The BoA is the city's review for design and architectural compliance. The HOA is your private community association's review for community standards. They have different processes, different timelines, and different criteria. Submit to both in parallel to save time. If they give conflicting requirements, you usually have to satisfy both, which sometimes means revising plans to find the overlap.",
        answerEs:
          "Necesitas ambas aprobaciones. La BoA es la revision de la ciudad para cumplimiento de diseno y arquitectura. El HOA es la revision de tu asociacion privada de comunidad para los estandares de la comunidad. Tienen procesos diferentes, cronogramas diferentes, y criterios diferentes. Envia a ambos en paralelo para ahorrar tiempo. Si dan requisitos contradictorios, usualmente tienes que satisfacer ambos, lo cual a veces significa revisar planos para encontrar el solapamiento.",
      },
      {
        question: "Can I demolish and rebuild on a Coral Gables lot?",
        questionEs: "Puedo demoler y reconstruir en un lote de Coral Gables?",
        answer:
          "Maybe, depending on the historic status of the home. Historic district homes have demolition protections and you may not be allowed to tear down the original structure. Non-historic homes can usually be demolished and rebuilt, but the new construction must comply with current city zoning, setback rules, and BoA design standards. Plan for 4 to 8 months from initial design to construction start for a teardown-rebuild in Coral Gables. Consult an architect familiar with the city's process before committing.",
        answerEs:
          "Tal vez, dependiendo del estado historico de la casa. Las casas de distrito historico tienen protecciones de demolicion y puedes no ser permitido demoler la estructura original. Las casas no historicas usualmente pueden ser demolidas y reconstruidas, pero la nueva construccion debe cumplir con el zonificacion actual de la ciudad, reglas de retroceso, y estandares de diseno de la BoA. Planea de 4 a 8 meses desde el diseno inicial hasta el inicio de la construccion para una demolicion-reconstruccion en Coral Gables. Consulta con un arquitecto familiarizado con el proceso de la ciudad antes de comprometerte.",
      },
    ],
    heroImageKey: "exterior-painting",
    locationSlug: "coral-gables",
  },

  {
    slug: "cutler-bay",
    slugEs: "cutler-bay",
    name: "Cutler Bay",
    nameEs: "Cutler Bay",
    intro:
      "Cutler Bay has grown rapidly in the past 20 years with newer master-planned communities mixed with older single-family neighborhoods. HOA presence varies dramatically by sub-area. Some Cutler Bay neighborhoods have strict HOAs, others have no HOA at all.",
    introEs:
      "Cutler Bay ha crecido rapidamente en los ultimos 20 anos con comunidades planificadas mas nuevas mezcladas con vecindarios mas antiguos de viviendas unifamiliares. La presencia del HOA varia dramaticamente por sub-area. Algunos vecindarios de Cutler Bay tienen HOAs estrictos, otros no tienen HOA en absoluto.",
    typicalTimeline: "2 to 4 weeks for HOA-governed communities",
    typicalTimelineEs: "2 a 4 semanas para comunidades gobernadas por HOA",
    knownHoas: [
      "Lakes by the Bay",
      "Saga Bay",
      "Cutler Cove",
      "Whispering Pines (sections)",
    ],
    commonApprovals: {
      paint:
        "Color palettes vary by community. Newer subdivisions have updated modern palettes (grays, cool whites accepted). Older sections favor warm earth tones.",
      paintEs:
        "Las paletas de colores varian por comunidad. Las subdivisiones mas nuevas tienen paletas modernas actualizadas (grises, blancos frios aceptados). Las secciones mas antiguas favorecen los tonos tierra calidos.",
      windows:
        "Hurricane impact windows widely approved due to Cutler Bay's coastal location and storm exposure history. Most HOAs have updated specs given how many homes have already done upgrades.",
      windowsEs:
        "Las ventanas de impacto contra huracanes son ampliamente aprobadas debido a la ubicacion costera de Cutler Bay y el historial de exposicion a tormentas. La mayoria de los HOAs tienen especificaciones actualizadas dado cuantas casas ya han hecho actualizaciones.",
      roof:
        "Standard barrel and flat tile in approved colors. Some HOAs in newer developments accept metal roofs in specified colors. Hurricane-rated underlayment is mandatory regardless of HOA approval.",
      roofEs:
        "Teja estandar de barril y plana en colores aprobados. Algunos HOAs en desarrollos mas nuevos aceptan techos de metal en colores especificos. El underlayment con calificacion para huracanes es obligatorio independientemente de la aprobacion del HOA.",
    },
    localQuirk:
      "Cutler Bay's coastal exposure makes hurricane protection a more frequent topic at HOA meetings here than in inland areas. Most HOAs have streamlined the impact window approval process. Flood considerations also apply for some properties.",
    localQuirkEs:
      "La exposicion costera de Cutler Bay hace que la proteccion contra huracanes sea un tema mas frecuente en las reuniones del HOA aqui que en areas del interior. La mayoria de los HOAs han optimizado el proceso de aprobacion de ventanas de impacto. Las consideraciones de inundacion tambien aplican para algunas propiedades.",
    faqs: [
      {
        question: "Is my Cutler Bay home in an HOA?",
        questionEs: "Esta mi casa de Cutler Bay en un HOA?",
        answer:
          "Maybe. Cutler Bay has a mix of HOA and non-HOA neighborhoods. The fastest way to find out is to check your closing documents from when you bought the house, look up your property in the Miami-Dade County Property Appraiser site (which often notes HOA association), or ask your title company. If you've been paying HOA assessments, you're definitely in one. If you don't recognize any HOA charges on your monthly or annual statements, you may not be.",
        answerEs:
          "Tal vez. Cutler Bay tiene una mezcla de vecindarios con y sin HOA. La forma mas rapida de averiguarlo es revisar tus documentos de cierre de cuando compraste la casa, buscar tu propiedad en el sitio del Tasador de la Propiedad del Condado de Miami-Dade (que a menudo nota la asociacion del HOA), o preguntarle a tu compania de titulo. Si has estado pagando evaluaciones del HOA, definitivamente estas en uno. Si no reconoces ningun cargo de HOA en tus estados mensuales o anuales, puede que no.",
      },
    ],
    heroImageKey: "exterior-repairs",
    locationSlug: "cutler-bay",
  },

  {
    slug: "kendale-lakes",
    slugEs: "kendale-lakes",
    name: "Kendale Lakes",
    nameEs: "Kendale Lakes",
    intro:
      "Kendale Lakes is an established West Kendall community with homes from the 1970s and 1980s. HOA presence is mixed. Some sections have active HOAs with standard architectural review processes. Other sections of Kendale Lakes are not in HOAs at all, which means homeowners only need to deal with Miami-Dade County permits.",
    introEs:
      "Kendale Lakes es una comunidad establecida de West Kendall con casas de los anos 70 y 80. La presencia del HOA es mixta. Algunas secciones tienen HOAs activos con procesos estandar de revision arquitectonica. Otras secciones de Kendale Lakes no estan en HOAs en absoluto, lo cual significa que los propietarios solo necesitan tratar con permisos del Condado de Miami-Dade.",
    typicalTimeline: "2 to 4 weeks when HOA review applies",
    typicalTimelineEs: "2 a 4 semanas cuando aplica revision del HOA",
    knownHoas: [
      "Kendale Lakes (varies by section)",
      "Lakeshore",
      "Lakeview Estates",
    ],
    commonApprovals: {
      paint:
        "Where HOAs apply in Kendale Lakes, palettes lean toward warm earth tones, soft yellows, and warm whites. Specific color enforcement varies by section.",
      paintEs:
        "Donde aplican HOAs en Kendale Lakes, las paletas se inclinan hacia tonos tierra calidos, amarillos suaves, y blancos calidos. La aplicacion de color especifica varia por seccion.",
      windows:
        "Hurricane impact windows widely accepted across all sections, both HOA-governed and non-HOA. Standard bronze and white frames most common.",
      windowsEs:
        "Las ventanas de impacto contra huracanes son ampliamente aceptadas en todas las secciones, tanto gobernadas por HOA como sin HOA. Marcos estandar bronce y blancos los mas comunes.",
      roof:
        "Barrel tile and flat tile in earth tones. Less strict than newer master-planned communities. More flexibility on color and manufacturer.",
      roofEs:
        "Teja de barril y plana en tonos tierra. Menos estrictos que comunidades planificadas mas nuevas. Mas flexibilidad en color y fabricante.",
    },
    localQuirk:
      "The age of the housing stock means some Kendale Lakes homes have original 1970s features (terrazzo floors, jalousie windows, sliding glass doors) that are protected by some HOA sub-communities for historic character.",
    localQuirkEs:
      "La edad del inventario de viviendas significa que algunas casas de Kendale Lakes tienen caracteristicas originales de los 70 (pisos de terrazzo, ventanas tipo jalousie, puertas corredizas de vidrio) que estan protegidas por algunas sub-comunidades del HOA por caracter historico.",
    faqs: [
      {
        question: "Can I update an original Kendale Lakes home without HOA pushback?",
        questionEs: "Puedo actualizar una casa original de Kendale Lakes sin resistencia del HOA?",
        answer:
          "Mostly yes for interior work. Kendale Lakes HOAs (where they apply) focus on exterior consistency. Interior updates are generally not subject to HOA review. Exterior work that maintains the character of the home tends to get approved smoothly. Major exterior changes (adding a second story, dramatically changing the front facade) require more careful application and may face additional scrutiny.",
        answerEs:
          "Mayormente si para trabajo interior. Los HOAs de Kendale Lakes (donde aplican) se enfocan en la consistencia exterior. Las actualizaciones interiores generalmente no estan sujetas a revision del HOA. El trabajo exterior que mantiene el caracter de la casa tiende a ser aprobado suavemente. Los cambios exteriores mayores (agregar un segundo piso, cambiar dramaticamente la fachada delantera) requieren aplicacion mas cuidadosa y pueden enfrentar escrutinio adicional.",
      },
    ],
    heroImageKey: "kitchen",
    locationSlug: "kendale-lakes",
  },
]

export function findHoaCommunity(slug: string): HoaCommunity | undefined {
  return hoaCommunities.find((c) => c.slug === slug || c.slugEs === slug)
}
