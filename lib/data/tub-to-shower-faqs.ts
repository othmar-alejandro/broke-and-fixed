/**
 * Bilingual FAQ set for the tub-to-shower campaign.
 *
 * The shared `faqs` record is English-only, which leaves the Spanish FAQ pages
 * showing English answers. This campaign carries its own translated copy so the
 * Spanish page is a real page rather than a locale wrapper around English text.
 */

export interface TubToShowerFaq {
  question: string
  questionEs: string
  answer: string
  answerEs: string
}

export interface TubToShowerFaqGroup {
  id: string
  heading: string
  headingEs: string
  faqs: TubToShowerFaq[]
}

export const tubToShowerFaqGroups: TubToShowerFaqGroup[] = [
  {
    id: 'cost',
    heading: 'Cost and budget',
    headingEs: 'Costo y presupuesto',
    faqs: [
      {
        question: 'How much does a tub-to-shower conversion cost in Miami?',
        questionEs: '¿Cuánto cuesta convertir una tina en ducha en Miami?',
        answer:
          'A tiled conversion in Miami-Dade generally runs $4,500 to $12,000. The low end is a shower that stays in the existing tub footprint with standard porcelain tile, the drain left where it is, sound walls, and a fixed glass panel. The high end is a larger custom shower with a bench, niches, upgraded fixtures, a linear drain, and frameless glass. That range covers demolition and haul-away, plumbing adjustment, backer board, a waterproofing membrane, a sloped shower pan, tile and tile labor, grout, fixtures, glass, the permit, and a final water test. If an estimate is missing several of those lines, it is describing a different scope rather than a better price.',
        answerEs:
          'Una conversión con azulejo en Miami-Dade normalmente cuesta entre $4,500 y $12,000. El extremo bajo es una ducha que se queda en el espacio actual de la tina, con porcelanato estándar, el desagüe en su lugar, paredes sanas y un panel de vidrio fijo. El extremo alto es una ducha más grande con banco, nichos, accesorios mejorados, desagüe lineal y vidrio sin marco. Ese rango cubre demolición y retiro de escombros, ajuste de plomería, cemento board, membrana impermeable, base con pendiente, azulejo y su mano de obra, lechada, accesorios, vidrio, permiso y prueba final de agua. Si a un estimado le faltan varias de esas partidas, describe otro alcance, no un mejor precio.',
      },
      {
        question: 'Why do I see prices online as low as $311 or $1,500?',
        questionEs: '¿Por qué veo precios en internet desde $311 o $1,500?',
        answer:
          'Those numbers come from cost aggregators that average a wide mix of jobs under one label. They typically include tub removals with no replacement work, prefabricated insert installations into an alcove that was already prepared, tub reglazing, tub cuts, and labor-only quotes where the homeowner buys every material. Average those together and you get a figure in the low thousands that does not correspond to any complete project. None of them include a shower pan, waterproofing, tile, glass, permits, or disposal. If a quote you receive lands near those numbers, do not assume you found a deal. Ask which of the thirteen standard line items are included and which are missing.',
        answerEs:
          'Esos números vienen de sitios que promedian una mezcla amplia de trabajos bajo una sola etiqueta. Normalmente incluyen retiros de tina sin reemplazo, instalación de insertos prefabricados en un nicho ya preparado, esmaltado de tinas, cortes de tina y precios solo de mano de obra donde el propietario compra todo el material. Al promediar todo eso sale una cifra de pocos miles que no corresponde a ningún proyecto completo. Ninguno incluye base de ducha, impermeabilización, azulejo, vidrio, permisos ni retiro de escombros. Si un presupuesto que recibes se acerca a esas cifras, no asumas que encontraste una ganga. Pregunta cuáles de las trece partidas estándar están incluidas y cuáles faltan.',
      },
      {
        question: 'What is the fastest way to lower the price?',
        questionEs: '¿Cuál es la forma más rápida de bajar el precio?',
        answer:
          'Keep the drain where it is and simplify the glass. Those two decisions move more money than any tile choice, and neither one feels like a compromise in daily use. Relocating a drain in a slab home means opening concrete, rerouting the line, patching, and rebuilding the floor, which can add well over a thousand dollars on its own. Custom frameless enclosures are the other large line, and in a small bathroom a single fixed panel often works better anyway because it leaves the room feeling open. What we would not cut is the waterproofing, the pan build, or the permit. Those are the three places where saving now reliably costs more later, and all three disappear behind tile.',
        answerEs:
          'Deja el desagüe donde está y simplifica el vidrio. Esas dos decisiones mueven más dinero que cualquier elección de azulejo, y ninguna se siente como una renuncia en el uso diario. Reubicar un desagüe en una casa sobre losa significa abrir concreto, redirigir la línea, reparar y reconstruir el piso, lo que puede sumar más de mil dólares por sí solo. Los cerramientos sin marco a la medida son la otra partida grande, y en un baño pequeño un solo panel fijo muchas veces funciona mejor porque deja el cuarto más abierto. Lo que no recortaríamos es la impermeabilización, la construcción de la base ni el permiso. Esos tres quedan invisibles detrás del azulejo.',
      },
      {
        question: 'Is there a reliable cost per square foot for this project?',
        questionEs: '¿Existe un costo por pie cuadrado confiable para este proyecto?',
        answer:
          'Not a useful one. A conversion is dominated by fixed costs that do not scale with area. Demolition, drain work, the pan build, the permit, and the glass cost roughly the same in a 30 square foot alcove as in a 40 square foot one. Only tile material and part of the tile labor track square footage. A cost-per-square-foot figure taken from a large custom shower will badly overprice a standard alcove, and one taken from a simple job will underprice anything with a bench, a curbless entry, or a relocated drain. Ask for the itemized breakdown instead. It takes two minutes to read and tells you what a single multiplier never can.',
        answerEs:
          'No uno que sirva. Una conversión está dominada por costos fijos que no crecen con el área. La demolición, el trabajo de desagüe, la base, el permiso y el vidrio cuestan casi lo mismo en un nicho de 30 pies cuadrados que en uno de 40. Solo el material de azulejo y parte de la mano de obra siguen los pies cuadrados. Una cifra por pie cuadrado tomada de una ducha grande personalizada va a sobrevalorar un nicho estándar, y una tomada de un trabajo simple va a subvalorar cualquier proyecto con banco, entrada sin borde o desagüe reubicado. Pide el desglose por partidas.',
      },
    ],
  },
  {
    id: 'timeline',
    heading: 'Timeline and process',
    headingEs: 'Tiempo y proceso',
    faqs: [
      {
        question: 'How long does a tub-to-shower conversion take?',
        questionEs: '¿Cuánto tiempo toma una conversión de tina a ducha?',
        answer:
          'Five to eight working days for a same-footprint conversion with sound walls and materials already on site. Day one is protection, demolition, tub removal, and inspection. Day two is plumbing and backer board. Day three is the waterproofing membrane and the shower pan, which then need to cure. Day four is a water test and the start of wall tile. Days five and six finish the tile. Day seven is grout, fixtures, and cleanup. After that the grout cures before the shower sees water. Add days for a drain relocation, a custom tile pattern, a curbless entry, or a wall that opened up worse than expected.',
        answerEs:
          'Cinco a ocho días hábiles para una conversión en el mismo espacio, con paredes sanas y materiales ya en sitio. El día uno es protección, demolición, retiro de la tina e inspección. El día dos es plomería y cemento board. El día tres es la membrana impermeable y la base, que después necesitan curar. El día cuatro es la prueba de agua y el inicio del azulejo de pared. Los días cinco y seis terminan el azulejo. El día siete es lechada, accesorios y limpieza. Después la lechada cura antes de que la ducha reciba agua. Agrega días si hay que mover el desagüe, si el patrón es complejo o si la pared salió peor de lo esperado.',
      },
      {
        question: 'Why does the custom glass arrive one to two weeks later?',
        questionEs: '¿Por qué el vidrio a la medida llega una o dos semanas después?',
        answer:
          'Because it is measured against your finished walls, not against a drawing. Tiled walls are never perfectly plumb or square, and a frameless panel has almost no tolerance for error. The glass is templated after the tile and grout are complete, then sent to a fabricator to be cut, tempered, and edge-polished to those exact dimensions. Tempered glass cannot be trimmed after tempering, which is why nobody cuts it early. Your shower is usually usable before the glass arrives, and many homeowners run a temporary curtain during that gap. If a fixed date matters to you, ask whether the quote includes custom glass or a stock enclosure, because stock arrives immediately.',
        answerEs:
          'Porque se mide contra tus paredes terminadas, no contra un plano. Las paredes de azulejo nunca quedan perfectamente a plomo ni a escuadra, y un panel sin marco casi no tiene tolerancia para error. El vidrio se plantilla después de que el azulejo y la lechada están completos, y después se manda al fabricante para cortarlo, templarlo y pulir los bordes a esas medidas exactas. El vidrio templado no se puede recortar después de templado, y por eso nadie lo corta antes. Tu ducha normalmente se puede usar antes de que llegue el vidrio, y muchos propietarios usan una cortina temporal. Si la fecha fija importa, pregunta si el presupuesto incluye vidrio a la medida o estándar.',
      },
      {
        question: 'Is a one day tub-to-shower conversion legitimate?',
        questionEs: '¿Es legítima una conversión de tina a ducha en un día?',
        answer:
          'Yes, for the product it describes. A trained crew installing a molded acrylic panel system into a standard alcove can genuinely finish in a day. The problem is not the claim, it is the comparison. A one day install usually bonds panels to the existing wall surface. A tiled build removes the wall, inspects the framing, waterproofs, and builds a sloped pan on site, and cure times cannot be compressed. Both timelines are accurate for what they describe. Ask any company what happens between removing the tub and the first panel or tile going on, and the difference becomes obvious in about thirty seconds.',
        answerEs:
          'Sí, para el producto que describe. Un equipo entrenado instalando un sistema de paneles de acrílico moldeado en un nicho estándar sí puede terminar en un día. El problema no es la promesa, es la comparación. Una instalación de un día normalmente pega paneles sobre la superficie de pared existente. Una construcción de azulejo quita la pared, inspecciona la estructura, impermeabiliza y construye una base con pendiente en sitio, y los tiempos de curado no se pueden comprimir. Los dos tiempos son correctos para lo que describen. Pregunta qué pasa entre sacar la tina y colocar el primer panel o azulejo, y la diferencia queda clara en treinta segundos.',
      },
      {
        question: 'What happens if you find water damage behind the old tub?',
        questionEs: '¿Qué pasa si encuentran daño por agua detrás de la tina vieja?',
        answer:
          'We stop, photograph it, and show you before anything gets covered. In homes built before 1990 the surround has usually never been opened, and we find staining, swollen substrate, or a soft bottom plate often enough that we plan for the possibility. Minor staining on sound framing is usually handled inside the normal scope. Structural repair or a rotted plate becomes a written change order with its own price before work continues. What matters more than the odds is that your scope says in writing what happens when it appears. A quote that has no answer for this question is the one to be careful with.',
        answerEs:
          'Paramos, lo fotografiamos y te lo mostramos antes de tapar nada. En casas anteriores a 1990 el revestimiento casi nunca se ha abierto, y encontramos manchas, material hinchado o madera blanda con suficiente frecuencia como para planificarlo. Una mancha menor sobre estructura sana normalmente se resuelve dentro del alcance normal. Una reparación estructural o madera podrida se convierte en un cambio por escrito con su propio precio antes de continuar. Lo que importa más que la probabilidad es que tu alcance diga por escrito qué pasa cuando aparece. El presupuesto que no contesta esta pregunta es del que hay que cuidarse.',
      },
    ],
  },
  {
    id: 'permits',
    heading: 'Permits and approvals',
    headingEs: 'Permisos y aprobaciones',
    faqs: [
      {
        question: 'Do I need a permit to convert a tub to a shower in Miami-Dade?',
        questionEs: '¿Necesito permiso para convertir una tina en ducha en Miami-Dade?',
        answer:
          'Usually yes, because the project changes plumbing. A tub drain is typically 1.5 inches and a shower drain is 2 inches under code, so even a conversion that keeps the exact footprint and never moves the drain laterally still involves a plumbing modification. Plumbing work is the category that triggers permit review in Miami-Dade. Permit fees for a project this size generally land in the low hundreds of dollars. The bigger cost is usually schedule rather than fees. Permitting it properly protects the sale of your home later, protects you if there is ever a water claim, and puts a second set of eyes on the work before it is closed behind tile.',
        answerEs:
          'Normalmente sí, porque el proyecto cambia la plomería. El desagüe de una tina es de 1.5 pulgadas y el de una ducha es de 2 pulgadas según el código, así que incluso una conversión que conserva el mismo espacio y nunca mueve el desagüe de lugar implica una modificación de plomería. El trabajo de plomería es la categoría que activa la revisión de permiso en Miami-Dade. Las tarifas para un proyecto de este tamaño normalmente son de cientos de dólares. El costo mayor casi siempre es el cronograma, no la tarifa. Sacar el permiso correctamente protege la venta de tu casa después y protege un reclamo de seguro.',
      },
      {
        question: 'Does Florida HB 803 let me skip the permit?',
        questionEs: '¿La ley HB 803 de Florida me deja saltarme el permiso?',
        answer:
          'No. HB 803 exempts cosmetic work under $7,500 on single-family homes from building permit requirements, and it explicitly does not apply when work touches plumbing, electrical, structure, gas, or HVAC. A tub-to-shower conversion changes plumbing every time because of the drain size difference. The exemption also does not apply to homes in flood hazard zones, which covers a meaningful portion of Miami-Dade. HB 803 is genuinely useful for paint, flooring, cabinets, countertops, and same-spot fixture swaps. This project is simply not in that category, and treating it as though it were creates a problem that surfaces at closing.',
        answerEs:
          'No. HB 803 exime del permiso al trabajo cosmético bajo $7,500 en casas unifamiliares, y explícitamente no aplica cuando el trabajo toca plomería, electricidad, estructura, gas o aire acondicionado. Una conversión de tina a ducha cambia la plomería siempre por la diferencia de tamaño del desagüe. La exención tampoco aplica a casas en zonas de riesgo de inundación, que cubren una parte importante de Miami-Dade. HB 803 es muy útil para pintura, pisos, gabinetes, encimeras y cambios de accesorios en el mismo lugar. Este proyecto no está en esa categoría, y tratarlo como si lo estuviera crea un problema que aparece en el cierre.',
      },
      {
        question: 'I live in a condo. Do I need association approval too?',
        questionEs: 'Vivo en un condominio. ¿También necesito aprobación de la asociación?',
        answer:
          'Yes, and it is a separate process from the building permit. Your city or county issues the permit based on code. Your condo or HOA board approves the work based on your community governing documents, which are a private contract among owners. Neither one satisfies the other. In practice the association review usually has to come first, because many buildings will not grant access, reserve an elevator, or schedule a riser shutdown until they have approved the scope, and some require a copy of the issued permit before releasing access. Read your Declaration, By-Laws, and rules before ordering materials, and submit the architectural change request early. Review timelines run from a few days to several weeks.',
        answerEs:
          'Sí, y es un proceso separado del permiso de construcción. Tu ciudad o condado emite el permiso según el código. Tu condominio o HOA aprueba el trabajo según los documentos que rigen tu comunidad, que son un contrato privado entre propietarios. Ninguno satisface al otro. En la práctica la revisión de la asociación normalmente va primero, porque muchos edificios no dan acceso, no reservan elevador ni programan un cierre de columna hasta haber aprobado el alcance, y algunos exigen copia del permiso emitido antes de permitir la entrada. Lee tu Declaración, Estatutos y reglas antes de pedir materiales, y entrega la solicitud temprano. Los tiempos van de días a varias semanas.',
      },
      {
        question: 'What if the previous owner converted the bathroom without a permit?',
        questionEs: '¿Qué pasa si el dueño anterior convirtió el baño sin permiso?',
        answer:
          'You inherit it, and it typically surfaces when you sell, refinance, or file an insurance claim. A municipal lien search can reveal an open permit, or none at all where plumbing work clearly happened, and a buyer inspection may flag a shower that does not match county records. Resolving it usually means applying for an after-the-fact permit, which can require opening finished walls so an inspector can verify what is behind them. That is expensive on a shower that is already tiled. If you are buying a Miami home with a converted bathroom, ask for the permit record during your inspection period rather than after closing.',
        answerEs:
          'Lo heredas, y normalmente sale a la luz cuando vendes, refinancias o presentas un reclamo de seguro. Una búsqueda de gravámenes municipales puede revelar un permiso abierto, o ninguno donde claramente hubo trabajo de plomería, y la inspección de un comprador puede notar una ducha que no coincide con los registros del condado. Resolverlo normalmente significa solicitar un permiso posterior al hecho, lo que puede requerir abrir paredes terminadas para que un inspector verifique lo que hay detrás. Eso es caro en una ducha que ya tiene azulejo. Si estás comprando una casa con un baño convertido, pide el registro del permiso durante tu período de inspección y no después del cierre.',
      },
    ],
  },
  {
    id: 'choices',
    heading: 'Design and material choices',
    headingEs: 'Diseño y materiales',
    faqs: [
      {
        question: 'Can the new shower fit where the tub was?',
        questionEs: '¿La ducha nueva cabe donde estaba la tina?',
        answer:
          'Almost always, and it is usually the best decision for the budget. Standard alcove tubs measure 60 inches long by 30 or 32 inches deep, and that is exactly the most common rectangular shower size. Staying in that footprint avoids relocating the drain, which in a slab home is one of the more expensive line items because it means opening concrete, rerouting the line, patching, and rebuilding the floor. Staying in the footprint also keeps the bathroom reversible for a future owner who may want a tub back. Code requires a minimum interior of 30 by 30 inches and 900 square inches, so a 60 by 30 alcove is well above the minimum.',
        answerEs:
          'Casi siempre, y normalmente es la mejor decisión para el presupuesto. Las tinas estándar de nicho miden 60 pulgadas de largo por 30 o 32 de profundidad, y esa es exactamente la medida más común de ducha rectangular. Quedarte en ese espacio evita reubicar el desagüe, que en una casa sobre losa es una de las partidas más caras porque implica abrir concreto, redirigir la línea, reparar y reconstruir el piso. Quedarte en el espacio también deja el baño reversible para un dueño futuro que quiera una tina de vuelta. El código exige un mínimo interior de 30 por 30 pulgadas y 900 pulgadas cuadradas.',
      },
      {
        question: 'Acrylic panels or tile: which should I choose?',
        questionEs: '¿Paneles de acrílico o azulejo: cuál debo escoger?',
        answer:
          'They are different products, not better and worse versions of one. Acrylic gives you speed, a seamless non-porous surface, and no grout to maintain, and it is a reasonable choice when the walls are known to be sound, the bathroom is a rental, or you cannot lose the room for a week. Tile gives you a wall somebody actually inspected, waterproofing built for your specific geometry, any size or layout you want, and a shower that can be repaired in one spot instead of replaced as a unit. The risk with panel systems is not the acrylic. It is covering a wall without looking behind it first, which seals moisture in where it cannot dry.',
        answerEs:
          'Son productos distintos, no versiones mejor y peor de uno solo. El acrílico te da rapidez, una superficie sin uniones y sin lechada que mantener, y es una opción razonable cuando las paredes están sanas, el baño es de alquiler, o no puedes perder el cuarto por una semana. El azulejo te da una pared que alguien de verdad inspeccionó, impermeabilización hecha para tu geometría específica, cualquier tamaño o distribución, y una ducha que se puede reparar en un punto en vez de reemplazar completa. El riesgo con los paneles no es el acrílico. Es tapar una pared sin mirar detrás, lo que sella la humedad donde no puede secarse.',
      },
      {
        question: 'Does a tile shower leak more because of the grout?',
        questionEs: '¿Una ducha de azulejo filtra más por la lechada?',
        answer:
          'No, and this is the most common misunderstanding in bathroom remodeling. Grout is not the waterproofing layer. It is a filler between tiles, and water passes through it by design. The layer that stops water is the membrane underneath the tile, applied over cement backer board and worked into every corner, seam, and change of plane. A properly built tiled shower with a correct membrane does not leak. A tiled shower built without one will leak no matter how perfect the grout looks. When people say tile showers leak, they are almost always describing a shower where the waterproofing was skipped or done badly. That is a workmanship problem, not a material problem.',
        answerEs:
          'No, y este es el malentendido más común en la remodelación de baños. La lechada no es la capa impermeable. Es un relleno entre azulejos y el agua pasa por ella por diseño. La capa que detiene el agua es la membrana debajo del azulejo, aplicada sobre cemento board y trabajada dentro de cada esquina, unión y cambio de plano. Una ducha de azulejo bien construida con la membrana correcta no filtra. Una construida sin ella va a filtrar sin importar lo perfecta que se vea la lechada. Cuando alguien dice que las duchas de azulejo filtran, casi siempre describe una donde se saltó la impermeabilización. Es un problema de mano de obra, no del material.',
      },
      {
        question: 'Should I get a glass door or a fixed panel?',
        questionEs: '¿Debo poner puerta de vidrio o panel fijo?',
        answer:
          'A fixed panel works when the opening and the shower depth can contain the water, and it is the lower cost option by a wide margin. It also leaves a small bathroom feeling more open and gives you less hardware to clean, which matters in Miami where hard water spotting shows up fast. A door makes more sense when the vanity or toilet sits close to the shower, or when you want to keep heat in. The deciding factor is not looks, it is whether your floor stays dry after a normal shower. Decide before tile begins, because the enclosure is measured from finished surfaces and the layout affects the slope.',
        answerEs:
          'Un panel fijo funciona cuando la entrada y la profundidad de la ducha pueden contener el agua, y es la opción más económica por bastante margen. También deja un baño pequeño más abierto y te da menos herrajes que limpiar, lo que importa en Miami donde la mancha de agua dura aparece rápido. Una puerta tiene más sentido cuando la vanidad o el inodoro están cerca de la ducha, o cuando quieres conservar el calor. El factor que decide no es la estética, es si tu piso queda seco después de una ducha normal. Decide antes de empezar el azulejo, porque el cerramiento se mide desde superficies terminadas.',
      },
      {
        question: 'Can you build a curbless or low-curb shower in my home?',
        questionEs: '¿Pueden construir una ducha sin borde o con borde bajo en mi casa?',
        answer:
          'A low curb is almost always possible and it is the option we recommend most often. It looks current, it makes entry easier, and it does not read as a medical modification. A fully curbless entry depends on what is under your floor. Most Miami homes sit on concrete slabs, and a truly zero-threshold shower needs enough depth to build the slope and set the drain, which sometimes means recessing the slab or building the bathroom floor up slightly. That is a decision made at the pan stage, not later, so raise it on the first visit. We will tell you honestly whether your floor allows it or whether a low curb is the better result.',
        answerEs:
          'Un borde bajo casi siempre es posible y es la opción que más recomendamos. Se ve actual, hace la entrada más fácil, y no se lee como una modificación médica. Una entrada totalmente sin borde depende de lo que hay debajo de tu piso. La mayoría de las casas de Miami están sobre losa de concreto, y una ducha realmente a nivel necesita suficiente profundidad para construir la pendiente y colocar el desagüe, lo que a veces significa rebajar la losa o subir un poco el piso del baño. Esa decisión se toma en la etapa de la base, no después, así que menciónalo en la primera visita.',
      },
    ],
  },
  {
    id: 'fit',
    heading: 'Safety, resale, and whether it is right for you',
    headingEs: 'Seguridad, reventa y si te conviene',
    faqs: [
      {
        question: 'Will removing the tub hurt my home value?',
        questionEs: '¿Quitar la tina baja el valor de mi casa?',
        answer:
          'It depends on one thing: whether the house keeps another tub. If it does, converting usually does not hurt value and frequently helps, with a published return around 60 to 70 percent of cost and broader appeal to buyers over 50. The negative case is specific. Removing the last tub in a three-bedroom-or-larger home in a family neighborhood narrows your buyer pool, because families with young children often filter listings for a tub before they ever see photos of your shower. For most Miami homes with two bathrooms, the best answer is to convert the primary and leave the tub in the guest bathroom.',
        answerEs:
          'Depende de una sola cosa: si la casa conserva otra tina. Si la conserva, convertir normalmente no baja el valor y muchas veces ayuda, con un retorno publicado cerca del 60 al 70 por ciento del costo y más atractivo para compradores mayores de 50. El caso negativo es específico. Quitar la última tina de una casa de tres recámaras o más en un vecindario familiar reduce tu grupo de compradores, porque las familias con niños pequeños filtran los anuncios por tina antes de ver una foto de tu ducha. Para la mayoría de las casas de Miami con dos baños, lo mejor es convertir el principal y dejar la tina en el baño de visitas.',
      },
      {
        question: 'Is a walk-in shower safer for an older adult?',
        questionEs: '¿Una ducha sin tina es más segura para un adulto mayor?',
        answer:
          'Generally yes, and this is the one situation where the resale math stops mattering. Stepping over a tub wall is one of the more common ways people fall at home. A low curb or curbless entry removes that motion. What makes a shower genuinely safer is the combination: a low entry, a slip-resistant floor tile, a seat at a usable height, a handheld sprayer on a slide bar, and grab bars anchored into blocking installed behind the wall. That blocking has to go in during construction, so decide early even if you install the bars later. It costs almost nothing at that stage and it makes the bathroom easy to adapt.',
        answerEs:
          'Generalmente sí, y esta es la situación donde las cuentas de reventa dejan de importar. Pasar por encima del borde de una tina es una de las formas más comunes en que la gente se cae en casa. Un borde bajo o una entrada a nivel elimina ese movimiento. Lo que hace una ducha realmente más segura es la combinación: entrada baja, azulejo de piso antideslizante, asiento a una altura usable, rociador de mano en barra deslizante, y barras de apoyo ancladas en refuerzo instalado detrás de la pared. Ese refuerzo se instala durante la construcción, así que decide temprano aunque pongas las barras después.',
      },
      {
        question: 'Will Medicare or a grant pay for a walk-in shower in Florida?',
        questionEs: '¿Medicare o alguna ayuda paga una ducha sin tina en Florida?',
        answer:
          'Original Medicare does not cover home modifications like a walk-in shower. Some Medicare Advantage plans include supplemental home safety benefits, so it is worth checking your specific plan documents. Florida Medicaid waiver programs sometimes cover home modifications as an environmental accessibility adaptation, and eligibility depends on the program and your circumstances. Veterans may qualify through VA SAH, SHA, or HISA grants. USDA rural repair grants exist for low-income seniors in qualifying rural areas, which excludes most of Miami-Dade. We are a remodeling company and not benefits advisors, so start with your plan administrator or the Florida Department of Elder Affairs rather than with us.',
        answerEs:
          'Medicare original no cubre modificaciones del hogar como una ducha sin tina. Algunos planes Medicare Advantage incluyen beneficios suplementarios de seguridad en el hogar, así que vale la pena revisar los documentos de tu plan. Los programas waiver de Medicaid en Florida a veces cubren modificaciones del hogar como adaptación de accesibilidad, y la elegibilidad depende del programa y tu situación. Los veteranos pueden calificar por las ayudas SAH, SHA o HISA del VA. Las ayudas rurales del USDA existen para adultos mayores de bajos ingresos en zonas rurales, lo que excluye casi todo Miami-Dade. Somos una empresa de remodelación, no asesores de beneficios, así que empieza con el administrador de tu plan.',
      },
      {
        question: 'Do you work in Spanish?',
        questionEs: '¿Atienden en español?',
        answer:
          'Yes. We work in English and Spanish across Miami-Dade, and the estimate form, the guides, and the project updates are all available in both. If Spanish is the language your household plans in, use the Spanish version of the site and we will keep the whole project in Spanish, including the written scope and the change orders. That matters more than it sounds. Most of the confusion in this trade comes from a scope somebody agreed to without fully reading it.',
        answerEs:
          'Sí. Trabajamos en inglés y español en todo Miami-Dade, y el formulario de estimado, las guías y las actualizaciones del proyecto están disponibles en los dos idiomas. Si el español es el idioma en el que tu familia planifica, usa la versión en español del sitio y mantenemos todo el proyecto en español, incluyendo el alcance por escrito y los cambios. Eso importa más de lo que parece. Casi toda la confusión en este oficio viene de un alcance que alguien aceptó sin leerlo completo.',
      },
    ],
  },
]

export const tubToShowerFaqsFlat = tubToShowerFaqGroups.flatMap((g) => g.faqs)
