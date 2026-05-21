// Rich, deep service page content for Broke & Fixed Home Solutions.
// Powers per-service pages with Why Choose Us, Process, Materials, Pricing,
// Recent Projects, Testimonials. Bilingual EN/ES.

export interface ProcessStep {
  step: number
  title: string
  titleEs: string
  description: string
  descriptionEs: string
  duration: string
  durationEs: string
}

export interface MaterialOption {
  category: string
  categoryEs: string
  name: string
  nameEs: string
  description: string
  descriptionEs: string
  priceLevel: "Budget" | "Mid" | "Premium" | "Luxury"
}

export interface PricingTier {
  name: string
  nameEs: string
  priceRange: string
  duration: string
  durationEs: string
  includes: string[]
  includesEs: string[]
  bestFor: string
  bestForEs: string
}

export interface RecentProject {
  title: string
  titleEs: string
  location: string
  scope: string
  scopeEs: string
  duration: string
  durationEs: string
  highlight: string
  highlightEs: string
  imagePlaceholder: string
}

export interface ServiceTestimonial {
  quote: string
  quoteEs: string
  authorName: string
  authorLocation: string
  service: string
  rating: number
}

export interface WhyChooseReason {
  icon: string
  title: string
  titleEs: string
  description: string
  descriptionEs: string
}

export interface ServicePageRich {
  heroHeadline: string
  heroHeadlineEs: string
  heroSubhead: string
  heroSubheadEs: string
  heroBadges: string[]
  heroBadgesEs: string[]
  whyChooseUs: WhyChooseReason[]
  processSteps: ProcessStep[]
  materials: MaterialOption[]
  pricingTiers: PricingTier[]
  recentProjects: RecentProject[]
  testimonials: ServiceTestimonial[]
  whyChooseUsIntro: string
  whyChooseUsIntroEs: string
  processIntro: string
  processIntroEs: string
  materialsIntro: string
  materialsIntroEs: string
  pricingIntro: string
  pricingIntroEs: string
  projectsIntro: string
  projectsIntroEs: string
}

export const servicePageRich: Record<string, ServicePageRich> = {
  "bathroom-remodeling": {
    heroHeadline: "Bathroom Remodels That Actually Get Finished",
    heroHeadlineEs: "Remodelaciones de Baño Que Realmente Se Terminan",
    heroSubhead:
      "From a single-day vanity swap to a full gut renovation, we handle the whole job with one team and one schedule. 200+ Miami bathrooms done.",
    heroSubheadEs:
      "Desde un cambio de tocador en un día hasta una renovación completa, manejamos todo el trabajo con un solo equipo y un solo horario. Más de 200 baños terminados en Miami.",
    heroBadges: ["Same-week start", "Fully insured", "200+ Miami bathrooms"],
    heroBadgesEs: [
      "Comienzo en la misma semana",
      "Totalmente asegurados",
      "Más de 200 baños en Miami",
    ],
    whyChooseUsIntro:
      "Most bathroom jobs go sideways for the same reasons. The tile sub no-shows. The plumber blames the tile guy. The owner disappears after the deposit. We work differently.",
    whyChooseUsIntroEs:
      "La mayoría de los trabajos de baño fallan por las mismas razones. El subcontratista de azulejos no aparece. El plomero culpa al azulejero. El dueño desaparece después del depósito. Nosotros trabajamos diferente.",
    whyChooseUs: [
      {
        icon: "Toolbox",
        title: "One Crew, Not a Patchwork of Subs",
        titleEs: "Un Solo Equipo, No un Mosaico de Subcontratistas",
        description:
          "The same team that demos your bathroom sets the tile and installs the vanity. No finger pointing when something is off. No schedule chaos between trades.",
        descriptionEs:
          "El mismo equipo que demuele tu baño coloca el azulejo e instala el tocador. Sin culpar a otros cuando algo está mal. Sin caos de horarios entre oficios.",
      },
      {
        icon: "Drop",
        title: "Built for Miami Humidity",
        titleEs: "Construido para la Humedad de Miami",
        description:
          "We use proper waterproofing membranes behind shower tile, mold-resistant cement board, and quality silicone at every joint. Bathrooms here fail when shortcuts get taken on what you cannot see.",
        descriptionEs:
          "Usamos membranas impermeables apropiadas detrás del azulejo de la ducha, cemento board resistente al moho y silicón de calidad en cada junta. Los baños aquí fallan cuando se toman atajos en lo que no se ve.",
      },
      {
        icon: "ShieldCheck",
        title: "HB 803 Friendly Scope Options",
        titleEs: "Opciones de Alcance Compatibles con HB 803",
        description:
          "If you keep the plumbing in its existing rough-in and stay under $7,500, most Miami bathrooms now qualify for the Florida HB 803 permit exemption. We will quote your project both ways so you can choose.",
        descriptionEs:
          "Si mantienes la plomería en su ramal existente y te quedas bajo $7,500, la mayoría de los baños de Miami ahora califican para la exención de permiso de la Ley HB 803 de Florida. Cotizamos tu proyecto de las dos maneras para que elijas.",
      },
      {
        icon: "Clock",
        title: "Real Timelines, Not Best-Case Lies",
        titleEs: "Cronogramas Reales, No Mentiras de Mejor Caso",
        description:
          "We tell you how long it will actually take, including drying time on mortar and grout, and we update you daily. Most refreshes finish in 1 to 2 weeks. Full gut jobs run 3 to 4 weeks.",
        descriptionEs:
          "Te decimos cuánto tomará realmente, incluyendo el tiempo de secado del mortero y la lechada, y te actualizamos diariamente. La mayoría de renovaciones terminan en 1 a 2 semanas. Trabajos completos van de 3 a 4 semanas.",
      },
      {
        icon: "HandshakeFist",
        title: "Fixed Quote, Written Warranty",
        titleEs: "Cotización Fija, Garantía por Escrito",
        description:
          "You get the price in writing before we start. We include a 2-year workmanship warranty on tile and fixture installation. If something we installed fails, we come back and fix it.",
        descriptionEs:
          "Recibes el precio por escrito antes de comenzar. Incluimos una garantía de mano de obra de 2 años en instalación de azulejos y accesorios. Si algo que instalamos falla, regresamos y lo arreglamos.",
      },
    ],
    processIntro:
      "Every bathroom remodel follows the same six steps, even the small ones. The order matters because each step depends on what comes before it.",
    processIntroEs:
      "Cada remodelación de baño sigue los mismos seis pasos, incluso las pequeñas. El orden importa porque cada paso depende del anterior.",
    processSteps: [
      {
        step: 1,
        title: "Free In-Home Estimate",
        titleEs: "Estimado Gratis en Casa",
        description:
          "We come measure, photograph, and write a fixed quote. You get a real document, not a number scribbled on a napkin. Usually 45 to 60 minutes on-site.",
        descriptionEs:
          "Venimos a medir, fotografiar y escribir una cotización fija. Recibes un documento real, no un número garabateado en una servilleta. Normalmente 45 a 60 minutos en sitio.",
        duration: "Day 0",
        durationEs: "Día 0",
      },
      {
        step: 2,
        title: "Material Selection",
        titleEs: "Selección de Materiales",
        description:
          "We walk you through tile, vanity, faucet, and lighting choices at three price levels. You decide. We order. Lead times go on a written schedule so you know what is happening.",
        descriptionEs:
          "Te guiamos por opciones de azulejo, tocador, grifería e iluminación en tres niveles de precio. Tú decides. Nosotros ordenamos. Los tiempos de entrega van en un horario escrito.",
        duration: "Week 1",
        durationEs: "Semana 1",
      },
      {
        step: 3,
        title: "Demolition and Prep",
        titleEs: "Demolición y Preparación",
        description:
          "We protect floors, cover doorways with plastic, and remove the old tile, vanity, toilet, and fixtures. Debris hauled away same day. We do not leave a mess.",
        descriptionEs:
          "Protegemos pisos, cubrimos puertas con plástico y removemos el azulejo, tocador, inodoro y accesorios viejos. Los escombros se llevan el mismo día. No dejamos desorden.",
        duration: "Day 1",
        durationEs: "Día 1",
      },
      {
        step: 4,
        title: "Waterproofing and Tile Installation",
        titleEs: "Impermeabilización e Instalación de Azulejo",
        description:
          "Cement board on shower walls. Liquid waterproofing membrane in wet areas. Tile set with the right thinset for the format and substrate. Grout cured for 48 hours before sealing.",
        descriptionEs:
          "Cemento board en paredes de ducha. Membrana impermeable líquida en zonas húmedas. Azulejo asentado con el thinset correcto para el formato y sustrato. La lechada cura 48 horas antes de sellar.",
        duration: "Days 3-7",
        durationEs: "Días 3 al 7",
      },
      {
        step: 5,
        title: "Vanity, Toilet, and Fixture Install",
        titleEs: "Instalación de Tocador, Inodoro y Accesorios",
        description:
          "We hang the vanity level, set the toilet with a new wax ring, install the faucet, shower trim, mirror, and lighting. Everything tested before we leave for the day.",
        descriptionEs:
          "Colgamos el tocador nivelado, instalamos el inodoro con un nuevo sello de cera, la grifería, accesorios de ducha, espejo e iluminación. Todo probado antes de irnos.",
        duration: "Days 8-9",
        durationEs: "Días 8 al 9",
      },
      {
        step: 6,
        title: "Final Walkthrough and Punch List",
        titleEs: "Recorrido Final y Lista de Pendientes",
        description:
          "We walk the room with you, fix anything on your punch list within 48 hours, and hand over a written warranty and care instructions. Final payment due at sign-off.",
        descriptionEs:
          "Recorremos la habitación contigo, arreglamos cualquier pendiente en 48 horas y entregamos garantía escrita e instrucciones de cuidado. Pago final al firmar.",
        duration: "Day 10",
        durationEs: "Día 10",
      },
    ],
    materialsIntro:
      "Material choice is where the budget gets real. Here is what we install most often in Miami bathrooms, with honest tradeoffs.",
    materialsIntroEs:
      "La elección de materiales es donde el presupuesto se vuelve real. Esto es lo que instalamos más en baños de Miami, con compromisos honestos.",
    materials: [
      {
        category: "Tile",
        categoryEs: "Azulejo",
        name: "Ceramic 12x12",
        nameEs: "Cerámica 12x12",
        description:
          "Budget workhorse. Easy to install, easy to replace if one cracks. Fine for floors. Less ideal in showers where porcelain handles water better.",
        descriptionEs:
          "Caballo de batalla económico. Fácil de instalar, fácil de reemplazar si una se quiebra. Bien para pisos. Menos ideal en duchas donde el porcelanato maneja mejor el agua.",
        priceLevel: "Budget",
      },
      {
        category: "Tile",
        categoryEs: "Azulejo",
        name: "Porcelain Large-Format 24x48",
        nameEs: "Porcelanato Formato Grande 24x48",
        description:
          "Fewer grout lines, easier to clean, modern look. Slightly more labor because the tile has to be set perfectly flat. The most common upgrade we see in Pinecrest and Coral Gables.",
        descriptionEs:
          "Menos juntas de lechada, más fácil de limpiar, look moderno. Un poco más de mano de obra porque el azulejo debe asentarse perfectamente plano. La actualización más común en Pinecrest y Coral Gables.",
        priceLevel: "Mid",
      },
      {
        category: "Tile",
        categoryEs: "Azulejo",
        name: "Natural Stone (Travertine or Marble)",
        nameEs: "Piedra Natural (Travertino o Mármol)",
        description:
          "Beautiful, real, no two pieces alike. Requires sealing every 6 to 12 months because Miami humidity is not kind to porous stone. Best in master baths.",
        descriptionEs:
          "Hermoso, real, no hay dos piezas iguales. Requiere sellado cada 6 a 12 meses porque la humedad de Miami no es amable con la piedra porosa. Mejor en baños principales.",
        priceLevel: "Luxury",
      },
      {
        category: "Tile",
        categoryEs: "Azulejo",
        name: "Mosaic Glass or Penny Round",
        nameEs: "Mosaico de Vidrio o Penny Round",
        description:
          "Used for accent strips, niches, or shower floors. Adds visual interest and texture underfoot. We install on mesh sheets for precision.",
        descriptionEs:
          "Se usa para bandas de acento, nichos o pisos de ducha. Agrega interés visual y textura. Lo instalamos en láminas de malla para precisión.",
        priceLevel: "Mid",
      },
      {
        category: "Vanity",
        categoryEs: "Tocador",
        name: "Stock Big-Box Vanity",
        nameEs: "Tocador de Tienda Grande",
        description:
          "MDF construction, melamine wrap, drop-in cultured marble top. Functional and clean. Lifespan in Miami humidity is 5 to 8 years.",
        descriptionEs:
          "Construcción de MDF, recubrimiento de melamina, encimera de mármol cultivado integrada. Funcional y limpio. Vida útil con la humedad de Miami es 5 a 8 años.",
        priceLevel: "Budget",
      },
      {
        category: "Vanity",
        categoryEs: "Tocador",
        name: "Solid Wood Floating Vanity",
        nameEs: "Tocador Flotante de Madera Sólida",
        description:
          "Wall-hung, soft-close drawers, real wood box. Pairs with a quartz or porcelain slab top. Easier to clean under, lasts 15+ years.",
        descriptionEs:
          "Montado en pared, cajones de cierre suave, caja de madera real. Combina con encimera de cuarzo o porcelanato. Más fácil limpiar debajo, dura más de 15 años.",
        priceLevel: "Premium",
      },
      {
        category: "Vanity",
        categoryEs: "Tocador",
        name: "Custom Built-In with Quartz Top",
        nameEs: "Empotrado a Medida con Encimera de Cuarzo",
        description:
          "Built to the exact dimensions of your space. Integrated outlets, soft-close everything, mitered waterfall edge if you want it. The full premium move.",
        descriptionEs:
          "Construido a las dimensiones exactas de tu espacio. Tomacorrientes integrados, cierre suave en todo, borde de cascada en inglete si lo deseas. La movida premium completa.",
        priceLevel: "Luxury",
      },
      {
        category: "Shower",
        categoryEs: "Ducha",
        name: "Acrylic Insert with Fiberglass Pan",
        nameEs: "Inserto de Acrílico con Base de Fibra de Vidrio",
        description:
          "Fastest install. Cleanest look on a tight budget. Looks like an apartment shower, not a custom bath. Lifespan 10 to 15 years.",
        descriptionEs:
          "Instalación más rápida. Look más limpio con presupuesto ajustado. Se ve como ducha de apartamento, no baño personalizado. Vida útil 10 a 15 años.",
        priceLevel: "Budget",
      },
      {
        category: "Shower",
        categoryEs: "Ducha",
        name: "Tiled Walk-In with Glass Panel",
        nameEs: "Ducha de Acceso con Panel de Vidrio",
        description:
          "Curbless or low-curb tile shower with a single fixed glass panel. Open feel, easy to clean, no door tracks collecting grime.",
        descriptionEs:
          "Ducha de azulejo sin bordillo o con bordillo bajo con un solo panel de vidrio fijo. Sensación abierta, fácil de limpiar, sin rieles de puerta acumulando suciedad.",
        priceLevel: "Premium",
      },
      {
        category: "Faucet/Trim",
        categoryEs: "Grifería",
        name: "Moen or Delta Mid-Range",
        nameEs: "Moen o Delta Gama Media",
        description:
          "Ceramic disc cartridge, decent finish, parts available at any hardware store for years. Our default recommendation for most jobs.",
        descriptionEs:
          "Cartucho de disco cerámico, acabado decente, repuestos disponibles en cualquier ferretería por años. Nuestra recomendación predeterminada.",
        priceLevel: "Mid",
      },
      {
        category: "Faucet/Trim",
        categoryEs: "Grifería",
        name: "Kohler Purist or Hansgrohe",
        nameEs: "Kohler Purist o Hansgrohe",
        description:
          "Heavier brass body, smoother handle action, premium finishes (matte black, brushed gold, polished nickel). Worth the upgrade in a master bath.",
        descriptionEs:
          "Cuerpo de latón más pesado, acción de mango más suave, acabados premium (negro mate, oro cepillado, níquel pulido). Vale la actualización en baño principal.",
        priceLevel: "Premium",
      },
      {
        category: "Lighting",
        categoryEs: "Iluminación",
        name: "LED Vanity Bar 24-36 inch",
        nameEs: "Barra LED de Tocador 24-36 pulgadas",
        description:
          "Color-temperature adjustable, dimmable on a compatible switch. We install at 78 inches above the floor centered over the sink for the best face light.",
        descriptionEs:
          "Temperatura de color ajustable, atenuable con interruptor compatible. La instalamos a 78 pulgadas del piso centrada sobre el lavabo para mejor luz facial.",
        priceLevel: "Mid",
      },
    ],
    pricingIntro:
      "Three honest tiers. We will quote your exact job, but these ranges show where most Miami bathroom remodels land in 2026.",
    pricingIntroEs:
      "Tres niveles honestos. Cotizamos tu trabajo exacto, pero estos rangos muestran donde la mayoría de remodelaciones de baño en Miami caen en 2026.",
    pricingTiers: [
      {
        name: "Refresh",
        nameEs: "Renovación Básica",
        priceRange: "$8,000 - $13,000",
        duration: "1-2 weeks",
        durationEs: "1 a 2 semanas",
        includes: [
          "Vanity replacement (stock 30-36 inch)",
          "New toilet, standard model",
          "Faucet and shower trim swap (existing rough-in)",
          "Re-tile shower walls and floor",
          "New mirror and vanity light",
          "Paint and caulk",
        ],
        includesEs: [
          "Reemplazo de tocador (estándar 30-36 pulgadas)",
          "Inodoro nuevo, modelo estándar",
          "Cambio de grifería y accesorios de ducha (ramal existente)",
          "Re-azulejar paredes y piso de ducha",
          "Espejo nuevo y luz de tocador",
          "Pintura y sellado",
        ],
        bestFor:
          "Owners who want a clean, modern bathroom on a budget without moving plumbing. Often HB 803 exempt if total stays under $7,500.",
        bestForEs:
          "Dueños que quieren un baño limpio y moderno con presupuesto ajustado sin mover plomería. Frecuentemente exento bajo HB 803 si el total se queda bajo $7,500.",
      },
      {
        name: "Mid-Range",
        nameEs: "Gama Media",
        priceRange: "$13,000 - $22,000",
        duration: "2-3 weeks",
        durationEs: "2 a 3 semanas",
        includes: [
          "Custom-fit vanity with quartz top",
          "Frameless glass shower panel",
          "Large-format porcelain tile on walls and floor",
          "Niche or built-in shelf",
          "Premium faucet and shower system",
          "New mirror, lighting, and exhaust fan",
        ],
        includesEs: [
          "Tocador a medida con encimera de cuarzo",
          "Panel de vidrio sin marco para ducha",
          "Azulejo porcelanato de formato grande en paredes y piso",
          "Nicho o repisa empotrada",
          "Grifería y sistema de ducha premium",
          "Espejo nuevo, iluminación y ventilador de extracción",
        ],
        bestFor:
          "The most popular option for Kendall and Palmetto Bay homeowners updating a primary bathroom they will use for 10+ years.",
        bestForEs:
          "La opción más popular para dueños en Kendall y Palmetto Bay actualizando un baño principal que usarán por más de 10 años.",
      },
      {
        name: "Full Renovation",
        nameEs: "Renovación Completa",
        priceRange: "$22,000 - $35,000",
        duration: "3-4 weeks",
        durationEs: "3 a 4 semanas",
        includes: [
          "Complete gut to studs",
          "Layout changes (with permitted plumbing if moved)",
          "Custom built-in vanity, double sink",
          "Walk-in shower with bench and niche",
          "Freestanding tub option",
          "Heated floor option",
          "Smart mirror and high-end lighting",
        ],
        includesEs: [
          "Demolición completa hasta los travesaños",
          "Cambios de distribución (con plomería permitida si se mueve)",
          "Tocador empotrado a medida, doble lavabo",
          "Ducha de acceso con banca y nicho",
          "Opción de bañera independiente",
          "Opción de piso radiante",
          "Espejo inteligente e iluminación de alta gama",
        ],
        bestFor:
          "Master suites in Pinecrest, Coral Gables, and Coconut Grove where the bathroom is a destination, not just a utility.",
        bestForEs:
          "Suites principales en Pinecrest, Coral Gables y Coconut Grove donde el baño es un destino, no solo una utilidad.",
      },
    ],
    projectsIntro:
      "Three recent bathroom jobs across Miami-Dade. Real scopes, real timelines.",
    projectsIntroEs:
      "Tres trabajos recientes de baño en Miami-Dade. Alcances reales, cronogramas reales.",
    recentProjects: [
      {
        title: "Master Bath Refresh in Kendall",
        titleEs: "Renovación de Baño Principal en Kendall",
        location: "Kendall, 33186",
        scope:
          "New vanity, large-format porcelain tile, frameless shower glass, quartz top, paint.",
        scopeEs:
          "Tocador nuevo, porcelanato formato grande, vidrio de ducha sin marco, encimera de cuarzo, pintura.",
        duration: "11 working days",
        durationEs: "11 días laborables",
        highlight:
          "Quote came in at $7,300, qualifying for HB 803 no-permit exemption. Saved the owner $400 in fees and three weeks of waiting.",
        highlightEs:
          "Cotización a $7,300, calificando para exención de permiso HB 803. Ahorró al dueño $400 en tarifas y tres semanas de espera.",
        imagePlaceholder:
          "/images/services/bathroom-remodeling/projects/kendall-master-bath.jpg",
      },
      {
        title: "Guest Bath Gut Job in Pinecrest",
        titleEs: "Baño de Huéspedes Demolición Completa en Pinecrest",
        location: "Pinecrest, 33156",
        scope:
          "Full demo to studs, new layout with walk-in shower, double vanity, marble accent wall.",
        scopeEs:
          "Demolición completa, nueva distribución con ducha de acceso, doble tocador, pared de acento de mármol.",
        duration: "22 working days",
        durationEs: "22 días laborables",
        highlight:
          "Owner had three quotes. Ours was middle, but we finished 4 days earlier than promised. She referred her sister-in-law two months later.",
        highlightEs:
          "El dueño tenía tres cotizaciones. La nuestra era la del medio, pero terminamos 4 días antes de lo prometido. Refirió a su cuñada dos meses después.",
        imagePlaceholder:
          "/images/services/bathroom-remodeling/projects/pinecrest-guest-bath.jpg",
      },
      {
        title: "Small Bath Update in Doral",
        titleEs: "Actualización de Baño Pequeño en Doral",
        location: "Doral, 33172",
        scope:
          "5x7 bathroom, new tile, vanity, fixtures, paint, lighting. Kept original plumbing locations.",
        scopeEs:
          "Baño de 5x7, azulejo nuevo, tocador, accesorios, pintura, iluminación. Plomería en ubicaciones originales.",
        duration: "8 working days",
        durationEs: "8 días laborables",
        highlight:
          "Single mom on a tight budget. Came in at $9,400. We worked around her kids' school schedule and finished on a Friday so the family had the weekend to enjoy it.",
        highlightEs:
          "Madre soltera con presupuesto ajustado. Vino a $9,400. Trabajamos alrededor del horario escolar de sus hijos y terminamos un viernes para que disfrutaran el fin de semana.",
        imagePlaceholder:
          "/images/services/bathroom-remodeling/projects/doral-small-bath.jpg",
      },
    ],
    testimonials: [
      {
        quote:
          "We had two flaky quotes before Broke & Fixed. They actually showed up, started on the date they said, and finished a day early. The tile in our shower is laser-straight.",
        quoteEs:
          "Tuvimos dos cotizaciones poco serias antes de Broke & Fixed. Realmente aparecieron, comenzaron en la fecha que dijeron y terminaron un día antes. El azulejo de la ducha está perfectamente recto.",
        authorName: "Maria R.",
        authorLocation: "Kendall",
        service: "Bathroom Remodeling",
        rating: 5,
      },
      {
        quote:
          "They explained the HB 803 thing to me, told me my project would qualify, and saved me $400 plus a month of waiting for a permit. Honest people.",
        quoteEs:
          "Me explicaron lo de HB 803, me dijeron que mi proyecto calificaría, y me ahorraron $400 más un mes de espera por el permiso. Gente honesta.",
        authorName: "Jorge M.",
        authorLocation: "Cutler Bay",
        service: "Bathroom Remodeling",
        rating: 5,
      },
      {
        quote:
          "Our master bath was 1990s pink and gold. They turned it into a spa. Three weeks, no surprises on price, my wife cried when she saw it done.",
        quoteEs:
          "Nuestro baño principal era rosa y oro de los 90. Lo convirtieron en un spa. Tres semanas, sin sorpresas de precio, mi esposa lloró cuando lo vio terminado.",
        authorName: "David L.",
        authorLocation: "Pinecrest",
        service: "Bathroom Remodeling",
        rating: 5,
      },
      {
        quote:
          "Bilingual team, very respectful with my house. They put plastic everywhere, cleaned every day, and the price was exactly what they quoted.",
        quoteEs:
          "Equipo bilingüe, muy respetuosos con mi casa. Pusieron plástico por todos lados, limpiaron cada día y el precio fue exactamente lo que cotizaron.",
        authorName: "Ana C.",
        authorLocation: "Sweetwater",
        service: "Bathroom Remodeling",
        rating: 5,
      },
    ],
  },

  "kitchen-remodeling": {
    heroHeadline: "Kitchen Remodels Done Right the First Time",
    heroHeadlineEs: "Remodelaciones de Cocina Bien Hechas la Primera Vez",
    heroSubhead:
      "Cabinets, countertops, backsplash, layout. We handle every step in one schedule with one team. Real Miami kitchens, real before-and-afters.",
    heroSubheadEs:
      "Gabinetes, encimeras, salpicaderos, distribución. Manejamos cada paso en un solo horario con un solo equipo. Cocinas reales de Miami.",
    heroBadges: ["Free in-home estimate", "Fully insured", "200+ Miami remodels"],
    heroBadgesEs: [
      "Estimado gratis en casa",
      "Totalmente asegurados",
      "Más de 200 remodelaciones en Miami",
    ],
    whyChooseUsIntro:
      "A kitchen job touches more trades than any other room. Cabinets, plumbing, electrical, tile, paint, countertop fabrication. If one of them slips, the whole timeline slides. We run all of it.",
    whyChooseUsIntroEs:
      "Una cocina toca más oficios que cualquier otra habitación. Gabinetes, plomería, electricidad, azulejos, pintura, fabricación de encimera. Si uno se atrasa, todo se atrasa. Nosotros manejamos todo.",
    whyChooseUs: [
      {
        icon: "CookingPot",
        title: "We Understand How You Actually Cook",
        titleEs: "Entendemos Cómo Realmente Cocinas",
        description:
          "Before we touch anything, we ask how you use your kitchen. Where the coffee lives, how the dishwasher fights the trash, what the kids reach for. The best kitchens are designed around real life, not Pinterest.",
        descriptionEs:
          "Antes de tocar nada, preguntamos cómo usas tu cocina. Dónde vive el café, cómo el lavavajillas pelea con la basura, qué alcanzan los niños. Las mejores cocinas se diseñan alrededor de la vida real, no de Pinterest.",
      },
      {
        icon: "Toolbox",
        title: "Cabinet Install Done By Cabinet People",
        titleEs: "Gabinetes Instalados por Especialistas",
        description:
          "We have a dedicated cabinet install lead. Boxes are leveled, drawers run smooth, doors gap evenly. It is the difference between a $20K kitchen looking like $20K and looking like $8K.",
        descriptionEs:
          "Tenemos un líder dedicado a instalación de gabinetes. Las cajas se nivelan, los cajones corren suavemente, las puertas se separan parejo. Es la diferencia entre que una cocina de $20K se vea como $20K o como $8K.",
      },
      {
        icon: "ShieldCheck",
        title: "HB 803 Cosmetic Path Available",
        titleEs: "Vía Cosmética HB 803 Disponible",
        description:
          "If you keep the existing plumbing and electrical locations, a cabinet paint or replacement plus countertop and backsplash can often stay under $7,500. We will quote both the permit-free and full-renovation paths.",
        descriptionEs:
          "Si mantienes las ubicaciones existentes de plomería y electricidad, pintar o reemplazar gabinetes más encimera y salpicadero a menudo se queda bajo $7,500. Cotizamos las dos vías.",
      },
      {
        icon: "Clock",
        title: "We Sequence Trades, You Live Your Life",
        titleEs: "Coordinamos los Oficios, Tú Vives Tu Vida",
        description:
          "Most clients keep using the kitchen 60% of the project duration. We stage the work: cabinets and countertop first while the old sink still functions, then the swap-over happens in 2 days.",
        descriptionEs:
          "La mayoría de clientes siguen usando la cocina el 60% del proyecto. Escalonamos: gabinetes y encimera primero mientras el lavabo viejo aún funciona, luego el cambio sucede en 2 días.",
      },
      {
        icon: "Sparkle",
        title: "Final Detail Pass, Not Just Finish Line",
        titleEs: "Repaso Final Detallado, No Solo Línea de Meta",
        description:
          "The last day on a kitchen is for adjustments: drawer alignment, cabinet door dampers, silicone touch-ups, paint touch-ups, hood vent test. Most companies skip this. We schedule a half-day for it.",
        descriptionEs:
          "El último día en una cocina es para ajustes: alineación de cajones, amortiguadores de puertas, retoques de silicón, retoques de pintura, prueba de campana. La mayoría omite esto. Nosotros programamos medio día.",
      },
    ],
    processIntro:
      "Kitchen remodels run in seven beats. The slowest part is usually waiting for cabinets, so we start material orders early.",
    processIntroEs:
      "Las remodelaciones de cocina van en siete tiempos. La parte más lenta suele ser esperar gabinetes, así que ordenamos materiales temprano.",
    processSteps: [
      {
        step: 1,
        title: "Design Consult and Quote",
        titleEs: "Consulta de Diseño y Cotización",
        description:
          "Sketch on the spot, talk through layout options, deliver fixed quote within 48 hours. We bring tile and counter samples.",
        descriptionEs:
          "Bosquejo en el sitio, discusión de opciones de distribución, cotización fija en 48 horas. Traemos muestras de azulejo y encimera.",
        duration: "Day 0",
        durationEs: "Día 0",
      },
      {
        step: 2,
        title: "Cabinet and Countertop Order",
        titleEs: "Orden de Gabinetes y Encimera",
        description:
          "Stock cabinets ship in 1 week. Semi-custom in 3 to 5 weeks. Custom in 6 to 8 weeks. We order before demo starts so cabinets arrive when needed.",
        descriptionEs:
          "Gabinetes estándar en 1 semana. Semi-custom en 3 a 5 semanas. A medida en 6 a 8 semanas. Ordenamos antes de la demolición para que lleguen cuando se necesiten.",
        duration: "Weeks 1-4",
        durationEs: "Semanas 1 a 4",
      },
      {
        step: 3,
        title: "Demolition and Disposal",
        titleEs: "Demolición y Desecho",
        description:
          "Old cabinets, appliances, counters, backsplash, and flooring out. Floor and adjacent rooms protected. Plumbing capped and electrical de-energized.",
        descriptionEs:
          "Salen gabinetes viejos, electrodomésticos, encimeras, salpicadero y piso. Piso y habitaciones adyacentes protegidas. Plomería tapada y electricidad desconectada.",
        duration: "Days 1-2",
        durationEs: "Días 1 al 2",
      },
      {
        step: 4,
        title: "Rough-In Work (If Needed)",
        titleEs: "Trabajo de Ramales (Si Es Necesario)",
        description:
          "Any plumbing or electrical moves happen now, with permits if required. New outlets, dedicated circuits for fridge and microwave, dishwasher supply lines.",
        descriptionEs:
          "Cualquier movimiento de plomería o electricidad sucede ahora, con permisos si se requiere. Nuevos tomacorrientes, circuitos dedicados para refrigerador y microondas, líneas de lavavajillas.",
        duration: "Days 3-5",
        durationEs: "Días 3 al 5",
      },
      {
        step: 5,
        title: "Cabinet Install and Countertop Template",
        titleEs: "Instalación de Gabinetes y Plantilla de Encimera",
        description:
          "Cabinets hung level. We template the counter once cabinets are set, send to the slab yard, fabrication takes 7 to 10 days.",
        descriptionEs:
          "Gabinetes colgados nivelados. Tomamos la plantilla de la encimera una vez los gabinetes están listos, enviamos al taller, fabricación toma 7 a 10 días.",
        duration: "Days 6-8",
        durationEs: "Días 6 al 8",
      },
      {
        step: 6,
        title: "Countertop, Backsplash, Appliance Install",
        titleEs: "Instalación de Encimera, Salpicadero y Electrodomésticos",
        description:
          "Slab installed, sink and faucet hooked up, backsplash tile set, range and dishwasher placed and connected. Hood vented to exterior.",
        descriptionEs:
          "Slab instalado, lavabo y grifería conectados, azulejo de salpicadero colocado, estufa y lavavajillas conectados. Campana ventilada al exterior.",
        duration: "Days 14-18",
        durationEs: "Días 14 al 18",
      },
      {
        step: 7,
        title: "Final Punch List and Walkthrough",
        titleEs: "Lista Final y Recorrido",
        description:
          "Drawer alignment, door soft-close, silicone bead at counter-wall joints, paint touch-ups, hood test, final clean. Walk-through with you, written warranty handed over.",
        descriptionEs:
          "Alineación de cajones, cierre suave de puertas, sellado en juntas de encimera, retoques de pintura, prueba de campana, limpieza final. Recorrido contigo, garantía escrita.",
        duration: "Day 20-21",
        durationEs: "Día 20 al 21",
      },
    ],
    materialsIntro:
      "The kitchen budget gets eaten by cabinets and countertops. Here is what we install most and how each choice plays in Miami homes.",
    materialsIntroEs:
      "El presupuesto de cocina se lo comen los gabinetes y encimeras. Esto es lo que instalamos más y cómo funciona cada opción.",
    materials: [
      {
        category: "Cabinets",
        categoryEs: "Gabinetes",
        name: "Stock RTA Cabinets",
        nameEs: "Gabinetes RTA Estándar",
        description:
          "Ready-to-assemble, plywood box, MDF doors. Ships fast, looks fine, lifespan 8 to 10 years in Miami humidity if the install is good.",
        descriptionEs:
          "Listos para ensamblar, caja de plywood, puertas de MDF. Envío rápido, se ve bien, vida útil 8 a 10 años en humedad de Miami con buena instalación.",
        priceLevel: "Budget",
      },
      {
        category: "Cabinets",
        categoryEs: "Gabinetes",
        name: "Semi-Custom Plywood Box",
        nameEs: "Plywood Box Semi-Personalizado",
        description:
          "Real plywood construction, soft-close on everything, dovetail drawers, choice of door styles and stains. 3 to 5 week lead time. Our sweet spot.",
        descriptionEs:
          "Construcción real de plywood, cierre suave en todo, cajones dovetail, opciones de estilo y tinte. 3 a 5 semanas de espera. Nuestro punto dulce.",
        priceLevel: "Mid",
      },
      {
        category: "Cabinets",
        categoryEs: "Gabinetes",
        name: "Custom Solid Wood",
        nameEs: "Madera Sólida a Medida",
        description:
          "Built to your exact dimensions, any wood species, hand-applied finish. 6 to 8 weeks. The investment is large but these cabinets outlive most kitchens.",
        descriptionEs:
          "Construido a tus dimensiones exactas, cualquier especie de madera, acabado a mano. 6 a 8 semanas. La inversión es grande pero estos gabinetes sobreviven a la mayoría de cocinas.",
        priceLevel: "Luxury",
      },
      {
        category: "Countertops",
        categoryEs: "Encimeras",
        name: "Laminate",
        nameEs: "Laminado",
        description:
          "Modern HD laminates look much better than the 90s versions. Cheapest option, easy to clean. Cannot handle hot pots and the edges show wear within 5 years.",
        descriptionEs:
          "Los laminados HD modernos se ven mucho mejor que los de los 90. Opción más barata, fácil de limpiar. No aguantan ollas calientes y los bordes se desgastan en 5 años.",
        priceLevel: "Budget",
      },
      {
        category: "Countertops",
        categoryEs: "Encimeras",
        name: "Quartz",
        nameEs: "Cuarzo",
        description:
          "Engineered stone, non-porous, no sealing needed. Caesarstone, Silestone, MSI. Handles Miami humidity perfectly. Our most-installed counter material.",
        descriptionEs:
          "Piedra de ingeniería, no porosa, sin sellado necesario. Caesarstone, Silestone, MSI. Maneja la humedad de Miami perfectamente. Nuestra encimera más instalada.",
        priceLevel: "Mid",
      },
      {
        category: "Countertops",
        categoryEs: "Encimeras",
        name: "Granite Slab",
        nameEs: "Slab de Granito",
        description:
          "Real natural stone. Each slab is unique. Requires sealing every 1 to 2 years. Better with darker colors that mask staining. Still a strong value pick.",
        descriptionEs:
          "Piedra natural real. Cada slab es único. Requiere sellado cada 1 a 2 años. Mejor con colores oscuros que esconden manchas. Sigue siendo buena opción de valor.",
        priceLevel: "Mid",
      },
      {
        category: "Countertops",
        categoryEs: "Encimeras",
        name: "Quartzite or Marble",
        nameEs: "Cuarcita o Mármol",
        description:
          "Natural, dramatic veining, no two slabs alike. Marble etches with acid (lemon, wine). Quartzite is harder. Both are statement pieces in a serious kitchen.",
        descriptionEs:
          "Natural, vetas dramáticas, no hay dos slabs iguales. El mármol se mancha con ácido (limón, vino). La cuarcita es más dura. Ambos son piezas de declaración.",
        priceLevel: "Luxury",
      },
      {
        category: "Countertops",
        categoryEs: "Encimeras",
        name: "Butcher Block",
        nameEs: "Butcher Block",
        description:
          "Wood. Warm. Limited use as a full counter in Miami humidity, but excellent for an island that takes daily cutting board duty.",
        descriptionEs:
          "Madera. Cálido. Uso limitado como encimera completa con la humedad de Miami, pero excelente para una isla que recibe uso diario de tabla de cortar.",
        priceLevel: "Mid",
      },
      {
        category: "Backsplash",
        categoryEs: "Salpicadero",
        name: "Subway Tile 3x6",
        nameEs: "Azulejo Subway 3x6",
        description:
          "The classic. Ceramic, white or colored. Looks great in almost any kitchen. Cheap to install, easy to update later.",
        descriptionEs:
          "El clásico. Cerámica, blanco o de color. Se ve bien en casi cualquier cocina. Barato de instalar, fácil de actualizar después.",
        priceLevel: "Budget",
      },
      {
        category: "Backsplash",
        categoryEs: "Salpicadero",
        name: "Herringbone or Geometric Pattern",
        nameEs: "Patrón Espina de Pescado o Geométrico",
        description:
          "Subway in a herringbone layout, or hex tile, or a mosaic blend. Adds visual interest. More labor (about 30% over standard subway).",
        descriptionEs:
          "Subway en espina de pescado, o hexagonal, o mezcla de mosaico. Agrega interés visual. Más mano de obra (30% más que subway estándar).",
        priceLevel: "Mid",
      },
      {
        category: "Backsplash",
        categoryEs: "Salpicadero",
        name: "Full-Height Slab Match",
        nameEs: "Slab a Toda Altura Combinado",
        description:
          "Same stone as the countertop, run up to the underside of the upper cabinets. Seamless, modern, premium. Requires careful template and seam planning.",
        descriptionEs:
          "Misma piedra que la encimera, hasta la base de los gabinetes superiores. Sin costuras, moderno, premium. Requiere plantilla cuidadosa y planeación de juntas.",
        priceLevel: "Luxury",
      },
      {
        category: "Hardware",
        categoryEs: "Herrajes",
        name: "Solid Brass or Stainless Pulls",
        nameEs: "Halones de Latón Sólido o Acero",
        description:
          "The cheap zinc pulls peel in Miami humidity within 2 years. Spend a little more on solid brass, stainless, or quality bronze. Worth every dollar.",
        descriptionEs:
          "Los halones baratos de zinc se pelan en humedad de Miami en 2 años. Gasta un poco más en latón sólido, acero o bronce de calidad. Vale cada dólar.",
        priceLevel: "Mid",
      },
    ],
    pricingIntro:
      "Three real tiers, based on 30+ kitchen quotes we have written this year.",
    pricingIntroEs:
      "Tres niveles reales, basados en más de 30 cotizaciones de cocina que hemos escrito este año.",
    pricingTiers: [
      {
        name: "Cosmetic Refresh",
        nameEs: "Renovación Cosmética",
        priceRange: "$12,000 - $20,000",
        duration: "2-3 weeks",
        durationEs: "2 a 3 semanas",
        includes: [
          "Cabinet painting or refacing",
          "New countertop (quartz or granite)",
          "New tile backsplash",
          "New sink and faucet",
          "Paint, hardware, lighting",
        ],
        includesEs: [
          "Pintura o relaminado de gabinetes",
          "Encimera nueva (cuarzo o granito)",
          "Salpicadero de azulejo nuevo",
          "Lavabo y grifería nuevos",
          "Pintura, herrajes, iluminación",
        ],
        bestFor:
          "Owners whose layout works and cabinets are solid. The fastest way to a new-looking kitchen. Often partial HB 803 territory.",
        bestForEs:
          "Dueños cuya distribución funciona y los gabinetes están sólidos. La forma más rápida a una cocina con look nuevo. Frecuentemente territorio parcial HB 803.",
      },
      {
        name: "Mid-Range Remodel",
        nameEs: "Remodelación Gama Media",
        priceRange: "$20,000 - $35,000",
        duration: "3-5 weeks",
        durationEs: "3 a 5 semanas",
        includes: [
          "New semi-custom plywood cabinets",
          "Quartz or quartzite countertops",
          "Designer tile backsplash",
          "New sink, faucet, garbage disposal",
          "Under-cabinet lighting",
          "New range hood vented outside",
          "Some appliance updates",
        ],
        includesEs: [
          "Gabinetes nuevos plywood semi-custom",
          "Encimeras de cuarzo o cuarcita",
          "Azulejo de salpicadero de diseñador",
          "Lavabo, grifería, triturador nuevos",
          "Iluminación bajo gabinete",
          "Campana extractora nueva al exterior",
          "Actualización de algunos electrodomésticos",
        ],
        bestFor:
          "The most common kitchen we build. Doral, Kendall, Westchester homeowners getting 15+ years of use out of a fresh kitchen.",
        bestForEs:
          "La cocina más común que construimos. Dueños en Doral, Kendall, Westchester obteniendo más de 15 años de uso de una cocina fresca.",
      },
      {
        name: "Full Kitchen Renovation",
        nameEs: "Renovación Completa de Cocina",
        priceRange: "$35,000 - $50,000",
        duration: "5-6 weeks",
        durationEs: "5 a 6 semanas",
        includes: [
          "Full layout change including plumbing/electrical moves",
          "Custom solid wood cabinets",
          "Premium stone countertops with waterfall island",
          "Designer appliances (panel-ready, paneled fridge, induction range)",
          "Full slab backsplash",
          "New flooring",
          "Pantry build-out",
        ],
        includesEs: [
          "Cambio completo de distribución con plomería/electricidad",
          "Gabinetes a medida de madera sólida",
          "Encimeras de piedra premium con isla en cascada",
          "Electrodomésticos de diseñador (panelados, inducción)",
          "Salpicadero a toda altura en slab",
          "Piso nuevo",
          "Construcción de despensa",
        ],
        bestFor:
          "Pinecrest, Coral Gables, Coconut Grove homes where the kitchen is the heart of the home and the budget reflects that.",
        bestForEs:
          "Casas en Pinecrest, Coral Gables, Coconut Grove donde la cocina es el corazón del hogar.",
      },
    ],
    projectsIntro:
      "Three recent kitchens we have completed. Real Miami homes, real budgets, real results.",
    projectsIntroEs:
      "Tres cocinas recientes que hemos completado. Casas reales de Miami, presupuestos reales, resultados reales.",
    recentProjects: [
      {
        title: "Cabinet Refresh and New Counters in Westchester",
        titleEs: "Renovación de Gabinetes y Encimeras Nuevas en Westchester",
        location: "Westchester, 33172",
        scope:
          "Spray-painted oak cabinets in white, quartz counters, subway tile backsplash, new sink and pulls.",
        scopeEs:
          "Gabinetes de roble pintados en blanco con spray, encimeras de cuarzo, salpicadero subway, lavabo y halones nuevos.",
        duration: "14 working days",
        durationEs: "14 días laborables",
        highlight:
          "Owner wanted a new kitchen but the cabinet boxes were perfect. We saved her $15K by refinishing instead of replacing. Came in at $13,800.",
        highlightEs:
          "La dueña quería cocina nueva pero las cajas de gabinetes estaban perfectas. Le ahorramos $15K renovando en vez de reemplazar. Vino a $13,800.",
        imagePlaceholder:
          "/images/services/kitchen-remodeling/projects/westchester-refresh.jpg",
      },
      {
        title: "Mid-Range Remodel in Kendale Lakes",
        titleEs: "Remodelación Gama Media en Kendale Lakes",
        location: "Kendale Lakes, 33186",
        scope:
          "New plywood cabinets, quartz counters, herringbone backsplash, vented hood, under-cabinet LED, new refrigerator.",
        scopeEs:
          "Gabinetes nuevos de plywood, encimeras de cuarzo, salpicadero espina de pescado, campana ventilada, LED bajo gabinete, refrigerador nuevo.",
        duration: "26 working days",
        durationEs: "26 días laborables",
        highlight:
          "Family of five, kept the kitchen 60% functional through the first 3 weeks. Cooked Thanksgiving dinner in the finished space 2 days after final walkthrough.",
        highlightEs:
          "Familia de cinco, mantuvieron la cocina 60% funcional las primeras 3 semanas. Cocinaron cena de Acción de Gracias 2 días después del recorrido final.",
        imagePlaceholder:
          "/images/services/kitchen-remodeling/projects/kendale-lakes-mid.jpg",
      },
      {
        title: "Full Custom Build in Coral Gables",
        titleEs: "Construcción Completa a Medida en Coral Gables",
        location: "Coral Gables, 33143",
        scope:
          "Gutted to studs, new layout with island, custom wood cabinets, marble counters, panel-ready paneled fridge, full slab backsplash, hardwood floor.",
        scopeEs:
          "Demolición completa, nueva distribución con isla, gabinetes a medida de madera, encimeras de mármol, refrigerador panelado, salpicadero completo, piso de madera.",
        duration: "38 working days",
        durationEs: "38 días laborables",
        highlight:
          "Couple had been quoted $80K by two other companies. We delivered the same scope at $47K with better cabinet quality. Featured in their family Christmas card.",
        highlightEs:
          "La pareja tenía cotizaciones de $80K de otras dos empresas. Entregamos el mismo alcance a $47K con mejor calidad de gabinetes. Apareció en su tarjeta navideña.",
        imagePlaceholder:
          "/images/services/kitchen-remodeling/projects/coral-gables-custom.jpg",
      },
    ],
    testimonials: [
      {
        quote:
          "Two other companies kept pushing me to gut the whole kitchen. Broke & Fixed looked at it and said, 'Your cabinets are great, let us paint them and change everything else.' Saved me $15,000 and the result is stunning.",
        quoteEs:
          "Otras dos empresas insistían en demoler toda la cocina. Broke & Fixed la miró y dijo, 'Tus gabinetes están bien, los pintamos y cambiamos todo lo demás.' Me ahorró $15,000 y el resultado es increíble.",
        authorName: "Carolina M.",
        authorLocation: "Westchester",
        service: "Kitchen Remodeling",
        rating: 5,
      },
      {
        quote:
          "We have three kids and could not move out. They staged the work so we always had a working sink and fridge. The patience required to do that is rare.",
        quoteEs:
          "Tenemos tres hijos y no podíamos mudarnos. Escalonaron el trabajo para siempre tener lavabo y refrigerador funcionando. La paciencia para hacer eso es rara.",
        authorName: "Roberto S.",
        authorLocation: "Kendall",
        service: "Kitchen Remodeling",
        rating: 5,
      },
      {
        quote:
          "Other quotes were $80K. They did the same work for $47K and the cabinets are noticeably better quality. I cannot recommend Othmar's team enough.",
        quoteEs:
          "Otras cotizaciones eran de $80K. Hicieron el mismo trabajo por $47K y los gabinetes son notablemente de mejor calidad. No puedo recomendar más al equipo de Othmar.",
        authorName: "Patricia G.",
        authorLocation: "Coral Gables",
        service: "Kitchen Remodeling",
        rating: 5,
      },
      {
        quote:
          "Bilingual, fully insured, and they call when they say they will call. The little things matter and they get them right.",
        quoteEs:
          "Bilingüe, totalmente asegurados, llaman cuando dicen que van a llamar. Los pequeños detalles importan y los hacen bien.",
        authorName: "Luis A.",
        authorLocation: "Doral",
        service: "Kitchen Remodeling",
        rating: 5,
      },
    ],
  },

  "interior-painting": {
    heroHeadline: "Interior Painting Done Like a Trade, Not a Side Hustle",
    heroHeadlineEs: "Pintura Interior Hecha Como Oficio, No Trabajo Extra",
    heroSubhead:
      "Proper prep, real primers, clean lines, no overspray. We protect your floors, furniture, and time. Two-coat finish on every wall.",
    heroSubheadEs:
      "Preparación apropiada, primers reales, líneas limpias, sin sobrespray. Protegemos tus pisos, muebles y tiempo. Acabado de dos manos en cada pared.",
    heroBadges: ["Sherwin-Williams partner", "Fully insured", "2-day average"],
    heroBadgesEs: [
      "Socio Sherwin-Williams",
      "Totalmente asegurados",
      "Promedio de 2 días",
    ],
    whyChooseUsIntro:
      "Painting is the service most homeowners underestimate. A bad paint job ruins a year of looking at it. Here is what separates trade-level work from a weekend job.",
    whyChooseUsIntroEs:
      "La pintura es el servicio que más subestiman los dueños. Un mal trabajo arruina un año de mirarlo. Esto separa el trabajo de oficio del trabajo de fin de semana.",
    whyChooseUs: [
      {
        icon: "Paintbrush",
        title: "Prep Is 70% of a Paint Job",
        titleEs: "La Preparación Es el 70% del Trabajo",
        description:
          "We sand glossy surfaces, patch nail holes and dings, prime stains, caulk gaps in trim. Most painters skip this. The result shows up at month three when the paint starts peeling.",
        descriptionEs:
          "Lijamos superficies brillantes, parchamos huecos de clavos, aplicamos primer en manchas, calafateamos en molduras. La mayoría se salta esto. El resultado aparece al tercer mes cuando la pintura se pela.",
      },
      {
        icon: "ShieldCheck",
        title: "Your Furniture and Floors Get Protected",
        titleEs: "Tus Muebles y Pisos Se Protegen",
        description:
          "Drop cloths, plastic covers, blue tape on every edge that matters. We treat your house like a museum on the days we are there. Zero paint on your floors when we leave.",
        descriptionEs:
          "Cubiertas de tela, plástico, cinta azul en cada borde que importa. Tratamos tu casa como museo los días que estamos. Cero pintura en tus pisos cuando nos vamos.",
      },
      {
        icon: "Drop",
        title: "Real Primer, Not Watered-Down Paint",
        titleEs: "Primer Real, No Pintura Aguada",
        description:
          "We use Kilz, Zinsser, or Sherwin-Williams primers based on what the surface needs. Bare drywall, glossy trim, water stains, and dark colors all need different treatment. Cheap shops skip this step entirely.",
        descriptionEs:
          "Usamos primers Kilz, Zinsser o Sherwin-Williams según lo que la superficie necesite. Drywall sin pintura, molduras brillantes, manchas de agua y colores oscuros todos necesitan tratamiento diferente.",
      },
      {
        icon: "Clock",
        title: "Two-Coat Finish on Every Wall",
        titleEs: "Acabado de Dos Manos en Cada Pared",
        description:
          "One coat means streaks at the corners and the old color showing through where the light hits. Two coats is the minimum that looks professional. Some dark accent colors need three.",
        descriptionEs:
          "Una mano significa rayas en las esquinas y el color viejo se ve donde da la luz. Dos manos es el mínimo profesional. Algunos colores oscuros necesitan tres.",
      },
      {
        icon: "HouseLine",
        title: "Sherwin-Williams Pro Partner",
        titleEs: "Socio Pro de Sherwin-Williams",
        description:
          "We pull paint at trade pricing, which we pass to you. We can match any color from any brand and recommend the right product for the room (kitchen and bathroom paint is different from bedrooms).",
        descriptionEs:
          "Compramos pintura a precio de oficio, que te pasamos. Igualamos cualquier color de cualquier marca y recomendamos el producto correcto para cada habitación (cocina y baño usan pintura diferente).",
      },
    ],
    processIntro:
      "A clean interior paint job follows five steps. We move fast but we do not skip any of them.",
    processIntroEs:
      "Un trabajo limpio de pintura interior sigue cinco pasos. Vamos rápido pero no nos saltamos ninguno.",
    processSteps: [
      {
        step: 1,
        title: "Walkthrough and Color Pull",
        titleEs: "Recorrido y Selección de Color",
        description:
          "We walk every room with you, note repairs needed, and help you finalize colors. Sherwin-Williams pulls happen the same day so we know the price before scheduling.",
        descriptionEs:
          "Recorremos cada habitación contigo, anotamos reparaciones y ayudamos a finalizar colores. Las muestras de Sherwin-Williams se sacan el mismo día.",
        duration: "Day 0",
        durationEs: "Día 0",
      },
      {
        step: 2,
        title: "Furniture Move and Floor Cover",
        titleEs: "Mover Muebles y Cubrir Pisos",
        description:
          "We move furniture to the center of each room, cover with plastic, tape baseboards and trim, and lay drop cloths. Light fixtures get bagged. We work clean.",
        descriptionEs:
          "Movemos muebles al centro de cada habitación, cubrimos con plástico, encintamos rodapiés y molduras, ponemos cubiertas. Las luminarias se cubren.",
        duration: "Day 1 morning",
        durationEs: "Día 1 mañana",
      },
      {
        step: 3,
        title: "Repair, Patch, Caulk, and Prime",
        titleEs: "Reparar, Parchar, Calafatear y Aplicar Primer",
        description:
          "Sand glossy areas, patch nail holes and small drywall damage, caulk gaps between trim and wall, and prime any bare or stained surfaces. This usually takes a full day.",
        descriptionEs:
          "Lijamos áreas brillantes, parchamos huecos de clavos y pequeños daños de drywall, calafateamos juntas entre molduras y pared, aplicamos primer. Usualmente un día completo.",
        duration: "Day 1",
        durationEs: "Día 1",
      },
      {
        step: 4,
        title: "First Coat",
        titleEs: "Primera Mano",
        description:
          "Ceilings first if they are being painted, then walls, then trim. Brushed at edges, rolled on the field. We use proper roller naps for the texture of your walls.",
        descriptionEs:
          "Primero techos si se pintan, luego paredes, luego molduras. Brocha en bordes, rodillo en el campo. Usamos los napes correctos para la textura de tus paredes.",
        duration: "Day 2",
        durationEs: "Día 2",
      },
      {
        step: 5,
        title: "Second Coat and Cleanup",
        titleEs: "Segunda Mano y Limpieza",
        description:
          "Second coat goes on after 4 to 6 hour dry time. We touch up, remove tape carefully (paint will be tacky), pull plastic, move furniture back, and walk through with you.",
        descriptionEs:
          "La segunda mano va después de 4 a 6 horas de secado. Retocamos, quitamos cinta cuidadosamente, removemos plástico, regresamos muebles y recorremos contigo.",
        duration: "Day 3",
        durationEs: "Día 3",
      },
    ],
    materialsIntro:
      "Paint is not paint. Here are the actual products we recommend, and what to expect from each.",
    materialsIntroEs:
      "La pintura no es solo pintura. Estos son los productos que recomendamos y qué esperar de cada uno.",
    materials: [
      {
        category: "Wall Paint",
        categoryEs: "Pintura de Pared",
        name: "Sherwin-Williams ProMar 200",
        nameEs: "Sherwin-Williams ProMar 200",
        description:
          "Workhorse contractor paint. Great coverage, fair price, holds up in normal rooms. Our default for budget jobs.",
        descriptionEs:
          "Pintura de oficio fiable. Buena cobertura, precio justo, aguanta en habitaciones normales. Predeterminada para trabajos económicos.",
        priceLevel: "Budget",
      },
      {
        category: "Wall Paint",
        categoryEs: "Pintura de Pared",
        name: "Sherwin-Williams Cashmere",
        nameEs: "Sherwin-Williams Cashmere",
        description:
          "Smoother finish, low-luster, hides minor wall imperfections. Best for living rooms and bedrooms where you see the light hit it.",
        descriptionEs:
          "Acabado más suave, bajo brillo, esconde imperfecciones menores. Mejor para salas y dormitorios donde se ve la luz.",
        priceLevel: "Mid",
      },
      {
        category: "Wall Paint",
        categoryEs: "Pintura de Pared",
        name: "Sherwin-Williams Emerald",
        nameEs: "Sherwin-Williams Emerald",
        description:
          "Self-priming, washable, color-locked so it does not fade. Worth the premium for hallways with kids or accent walls you will not repaint for years.",
        descriptionEs:
          "Auto-imprimante, lavable, color anclado para que no se descolore. Vale el premium para pasillos con niños o paredes de acento.",
        priceLevel: "Premium",
      },
      {
        category: "Wall Paint",
        categoryEs: "Pintura de Pared",
        name: "Benjamin Moore Aura",
        nameEs: "Benjamin Moore Aura",
        description:
          "Top-tier finish, near-zero VOC, excellent color depth. The choice when you are painting a single statement room and want the best.",
        descriptionEs:
          "Acabado de primera, casi cero VOC, excelente profundidad de color. La elección cuando pintas una sola habitación de declaración.",
        priceLevel: "Luxury",
      },
      {
        category: "Kitchen/Bath Paint",
        categoryEs: "Pintura Cocina/Baño",
        name: "Sherwin-Williams Duration Home",
        nameEs: "Sherwin-Williams Duration Home",
        description:
          "Mildew-resistant, washable, designed for wet rooms. We always upgrade kitchens and bathrooms to a paint like this. Generic paint molds in Miami within a year.",
        descriptionEs:
          "Resistente al moho, lavable, diseñada para habitaciones húmedas. Siempre actualizamos cocinas y baños a este tipo de pintura. La genérica se mancha de moho en un año en Miami.",
        priceLevel: "Mid",
      },
      {
        category: "Trim Paint",
        categoryEs: "Pintura de Molduras",
        name: "Sherwin-Williams ProClassic",
        nameEs: "Sherwin-Williams ProClassic",
        description:
          "Waterborne alkyd, levels out beautifully, no brush marks on baseboards and doors. The trim paint we use on 90% of jobs.",
        descriptionEs:
          "Alkyd a base de agua, se nivela bien, sin marcas de brocha en rodapiés y puertas. La pintura de molduras que usamos en 90% de trabajos.",
        priceLevel: "Mid",
      },
      {
        category: "Ceiling Paint",
        categoryEs: "Pintura de Techo",
        name: "Sherwin-Williams Ceiling Flat",
        nameEs: "Sherwin-Williams Ceiling Flat",
        description:
          "Dedicated ceiling paint. Goes on pink, dries white, so you can see where you have rolled. Flat sheen hides imperfections.",
        descriptionEs:
          "Pintura dedicada para techos. Va rosa, seca blanca, así ves donde has aplicado. Acabado mate esconde imperfecciones.",
        priceLevel: "Budget",
      },
      {
        category: "Primer",
        categoryEs: "Imprimante",
        name: "Kilz Premium",
        nameEs: "Kilz Premium",
        description:
          "Water-based primer for most situations. Bare drywall, light stains, color changes. Easy cleanup.",
        descriptionEs:
          "Primer a base de agua para la mayoría de situaciones. Drywall sin pintura, manchas ligeras, cambios de color.",
        priceLevel: "Budget",
      },
      {
        category: "Primer",
        categoryEs: "Imprimante",
        name: "Zinsser BIN Shellac",
        nameEs: "Zinsser BIN Shellac",
        description:
          "Shellac-based stain killer. Locks water stains, smoke damage, marker, and oils. We always have a gallon on the truck.",
        descriptionEs:
          "Mata-manchas a base de goma laca. Bloquea manchas de agua, humo, marcador y aceites. Siempre tenemos un galón en el camión.",
        priceLevel: "Mid",
      },
      {
        category: "Primer",
        categoryEs: "Imprimante",
        name: "Sherwin-Williams Extreme Bond",
        nameEs: "Sherwin-Williams Extreme Bond",
        description:
          "Bonding primer for glossy or hard-to-paint surfaces (laminate, melamine, tile, glass). When latex would peel right off.",
        descriptionEs:
          "Primer adherente para superficies brillantes o difíciles (laminado, melamina, azulejo, vidrio). Cuando el latex se pelaría.",
        priceLevel: "Premium",
      },
      {
        category: "Sheen",
        categoryEs: "Brillo",
        name: "Flat / Matte",
        nameEs: "Mate",
        description:
          "Hides wall imperfections best. Hard to wipe clean. Good for ceilings and adult bedrooms.",
        descriptionEs:
          "Esconde mejor imperfecciones. Difícil de limpiar. Bueno para techos y dormitorios de adultos.",
        priceLevel: "Budget",
      },
      {
        category: "Sheen",
        categoryEs: "Brillo",
        name: "Eggshell / Satin",
        nameEs: "Cáscara de Huevo / Satín",
        description:
          "Most-requested. Washable, slight sheen, hides minor flaws. Standard for living rooms, hallways, kids' rooms.",
        descriptionEs:
          "Más solicitado. Lavable, brillo ligero, esconde defectos menores. Estándar para salas, pasillos, habitaciones de niños.",
        priceLevel: "Mid",
      },
    ],
    pricingIntro:
      "Three tiers based on square footage and prep level. Prices are for two-coat finish with proper prep.",
    pricingIntroEs:
      "Tres niveles basados en pies cuadrados y nivel de preparación. Precios para acabado de dos manos con preparación apropiada.",
    pricingTiers: [
      {
        name: "Single Room or Accent",
        nameEs: "Habitación Individual o Acento",
        priceRange: "$600 - $1,800",
        duration: "1-2 days",
        durationEs: "1 a 2 días",
        includes: [
          "One room walls (up to 400 sq ft)",
          "Basic patching and prep",
          "Two coats SW ProMar 200 or equivalent",
          "Furniture moved and protected",
          "Cleanup included",
        ],
        includesEs: [
          "Una habitación de paredes (hasta 400 pies cuadrados)",
          "Parcheo y preparación básica",
          "Dos manos SW ProMar 200 o equivalente",
          "Muebles movidos y protegidos",
          "Limpieza incluida",
        ],
        bestFor:
          "Master bedroom, nursery, accent wall, or one room you want refreshed. Always HB 803 exempt since this is pure cosmetic.",
        bestForEs:
          "Dormitorio principal, cuarto de bebé, pared de acento o una habitación. Siempre exento HB 803 por ser puramente cosmético.",
      },
      {
        name: "Multi-Room or Full Floor",
        nameEs: "Múltiples Habitaciones o Un Piso",
        priceRange: "$2,500 - $4,500",
        duration: "3-4 days",
        durationEs: "3 a 4 días",
        includes: [
          "3 to 5 rooms, walls and ceilings",
          "Patching, caulking, priming as needed",
          "Two coats Cashmere or Duration",
          "Trim refresh in matching rooms",
          "Color consultation included",
        ],
        includesEs: [
          "3 a 5 habitaciones, paredes y techos",
          "Parcheo, calafateo, primer según necesidad",
          "Dos manos Cashmere o Duration",
          "Renovación de molduras en habitaciones",
          "Consulta de color incluida",
        ],
        bestFor:
          "The most common interior paint job. Whole first floor or whole second floor. Owners refreshing before listing or after moving in.",
        bestForEs:
          "El trabajo más común. Todo el primer piso o el segundo. Dueños refrescando antes de listar o al mudarse.",
      },
      {
        name: "Whole-House Repaint",
        nameEs: "Repintura de Casa Completa",
        priceRange: "$5,000 - $8,000",
        duration: "4-6 days",
        durationEs: "4 a 6 días",
        includes: [
          "Every wall, ceiling, and trim piece",
          "Doors and door frames",
          "All closets",
          "Premium products (Emerald or Aura on living areas)",
          "Detailed prep and stain treatment",
          "Color matching from existing or new palette",
        ],
        includesEs: [
          "Cada pared, techo y moldura",
          "Puertas y marcos",
          "Todos los clósets",
          "Productos premium (Emerald o Aura en áreas comunes)",
          "Preparación detallada y tratamiento de manchas",
          "Combinación de color de paleta existente o nueva",
        ],
        bestFor:
          "Owners doing a true reset. New paint head-to-toe makes a 2,500 sq ft Miami home feel new without any other change.",
        bestForEs:
          "Dueños haciendo un reset real. Pintura nueva en toda la casa hace que un hogar de 2,500 pies cuadrados se sienta nuevo.",
      },
    ],
    projectsIntro:
      "Three recent interior paint jobs we have completed across Miami-Dade.",
    projectsIntroEs:
      "Tres trabajos recientes de pintura interior que hemos completado en Miami-Dade.",
    recentProjects: [
      {
        title: "Whole-House Repaint in Coral Gables",
        titleEs: "Repintura de Casa Completa en Coral Gables",
        location: "Coral Gables, 33143",
        scope:
          "2,400 sq ft, all walls, ceilings, trim, doors. SW Emerald on living areas, Duration Home in kitchen and baths.",
        scopeEs:
          "2,400 pies cuadrados, todas paredes, techos, molduras, puertas. SW Emerald en áreas comunes, Duration Home en cocina y baños.",
        duration: "5 working days",
        durationEs: "5 días laborables",
        highlight:
          "Came in at $6,400. Owner saved $400 in permit fees because of HB 803. Whole house felt new without changing anything else.",
        highlightEs:
          "Vino a $6,400. El dueño ahorró $400 en permisos por HB 803. Toda la casa se sintió nueva sin cambiar nada más.",
        imagePlaceholder:
          "/images/services/interior-painting/projects/coral-gables-whole-house.jpg",
      },
      {
        title: "Master and Two Kids' Rooms in Palmetto Bay",
        titleEs: "Principal y Dos Habitaciones de Niños en Palmetto Bay",
        location: "Palmetto Bay, 33156",
        scope:
          "Three bedrooms, custom colors per kid, accent wall in master. Patching old picture-hanging damage.",
        scopeEs:
          "Tres dormitorios, colores personalizados por niño, pared de acento en principal. Reparación de daños de cuadros.",
        duration: "3 working days",
        durationEs: "3 días laborables",
        highlight:
          "Mom wanted the kids' rooms done while they were at summer camp. We finished a day early so the rooms aired out before they came home.",
        highlightEs:
          "Mamá quería las habitaciones listas mientras los niños estaban en campamento. Terminamos un día antes para que se ventilaran.",
        imagePlaceholder:
          "/images/services/interior-painting/projects/palmetto-bay-bedrooms.jpg",
      },
      {
        title: "Living Room Accent Wall in Kendall",
        titleEs: "Pared de Acento en Sala en Kendall",
        location: "Kendall, 33186",
        scope:
          "Single accent wall in deep navy (SW Naval), trim refresh on adjacent baseboards.",
        scopeEs:
          "Pared de acento individual en azul marino profundo (SW Naval), refresco de molduras en rodapiés adyacentes.",
        duration: "1 working day",
        durationEs: "1 día laborable",
        highlight:
          "$680 for the whole job. Owner had been quoted $1,400 by a franchise. Same paint, same prep, half the price.",
        highlightEs:
          "$680 por todo el trabajo. El dueño tenía cotización de $1,400 de una franquicia. Misma pintura, misma preparación, mitad de precio.",
        imagePlaceholder:
          "/images/services/interior-painting/projects/kendall-accent.jpg",
      },
    ],
    testimonials: [
      {
        quote:
          "Other painters left drips on my baseboards and roller marks on the walls. These guys spent a whole day just prepping before paint touched the wall. Worth every dollar.",
        quoteEs:
          "Otros pintores dejaron goteos en rodapiés y marcas de rodillo en paredes. Estos pasaron un día completo preparando antes que la pintura tocara la pared. Vale cada dólar.",
        authorName: "Sofia P.",
        authorLocation: "Coral Gables",
        service: "Interior Painting",
        rating: 5,
      },
      {
        quote:
          "Did our whole house in 5 days, came in $300 under quote. Lines are razor sharp, no overspray on our floors, and they vacuumed before leaving.",
        quoteEs:
          "Hicieron toda nuestra casa en 5 días, vinieron $300 bajo cotización. Las líneas están perfectas, sin sobrespray en pisos, y aspiraron antes de irse.",
        authorName: "Miguel D.",
        authorLocation: "Doral",
        service: "Interior Painting",
        rating: 5,
      },
      {
        quote:
          "Bilingual crew, very polite, asked before moving anything. My grandmother lives with us and they treated her with respect. The work speaks for itself.",
        quoteEs:
          "Equipo bilingüe, muy educados, preguntaron antes de mover nada. Mi abuela vive con nosotros y la trataron con respeto. El trabajo habla por sí solo.",
        authorName: "Yolanda V.",
        authorLocation: "Sweetwater",
        service: "Interior Painting",
        rating: 5,
      },
      {
        quote:
          "Used SW Emerald in our hallway with three kids and a dog. Six months later, every scuff wipes off clean. Cheaper paint would have been a nightmare.",
        quoteEs:
          "Usaron SW Emerald en nuestro pasillo con tres hijos y un perro. Seis meses después, cada raspón se limpia. Pintura barata habría sido pesadilla.",
        authorName: "Rachel B.",
        authorLocation: "Pinecrest",
        service: "Interior Painting",
        rating: 5,
      },
    ],
  },

  "exterior-painting": {
    heroHeadline: "Exterior Paint Built for South Florida Weather",
    heroHeadlineEs: "Pintura Exterior Construida para el Clima del Sur de Florida",
    heroSubhead:
      "Pressure wash, scrape, prime, two coats of elastomeric or 100% acrylic. Built to handle Miami heat, humidity, and hurricane rain.",
    heroSubheadEs:
      "Lavado a presión, raspar, primer, dos manos de elastomérico o acrílico 100%. Construida para soportar calor, humedad y lluvia de huracán.",
    heroBadges: [
      "Hurricane-season ready",
      "Fully insured",
      "10-year paint warranty",
    ],
    heroBadgesEs: [
      "Listos para temporada de huracanes",
      "Totalmente asegurados",
      "Garantía de pintura de 10 años",
    ],
    whyChooseUsIntro:
      "South Florida exterior paint fails for predictable reasons: bad prep, wrong product, painted on a humid day. We do this differently because we know what kills paint here.",
    whyChooseUsIntroEs:
      "La pintura exterior del sur de Florida falla por razones predecibles: mala preparación, producto incorrecto, pintada en día húmedo. Lo hacemos diferente porque sabemos qué mata la pintura aquí.",
    whyChooseUs: [
      {
        icon: "Storm",
        title: "Built for Hurricanes and Humidity",
        titleEs: "Construida para Huracanes y Humedad",
        description:
          "We use elastomeric coatings on stucco that flex with the building and resist water intrusion during wind-driven rain. Standard latex peels in three years here. Done right, a Sherwin-Williams Loxon or Conflex job lasts 8 to 12.",
        descriptionEs:
          "Usamos recubrimientos elastoméricos en estuco que flexionan con el edificio y resisten intrusión de agua en lluvia por viento. El latex estándar se pela en tres años. Bien hecho, SW Loxon o Conflex dura 8 a 12.",
      },
      {
        icon: "Drop",
        title: "Pressure Wash With Anti-Mildew Treatment",
        titleEs: "Lavado a Presión con Tratamiento Anti-Moho",
        description:
          "Before any paint goes on, we pressure wash with a bleach-and-detergent mix to kill mildew on the stucco. If you do not kill it first, it grows back through the new paint within months.",
        descriptionEs:
          "Antes de pintar, lavamos a presión con cloro y detergente para matar moho en el estuco. Si no lo matas primero, vuelve a crecer atravesando la pintura nueva en meses.",
      },
      {
        icon: "Sun",
        title: "Painted on Dry Days Only",
        titleEs: "Pintamos Solo en Días Secos",
        description:
          "We watch the weather. Paint applied at 80% relative humidity does not cure right. We will reschedule rather than paint in conditions that will compromise the finish.",
        descriptionEs:
          "Vigilamos el clima. La pintura aplicada al 80% de humedad no cura bien. Reagendamos antes que pintar en condiciones que comprometan el acabado.",
      },
      {
        icon: "Hammer",
        title: "We Scrape, Patch, and Caulk First",
        titleEs: "Raspamos, Parchamos y Calafateamos Primero",
        description:
          "Loose paint comes off with scrapers and 60-grit sandpaper. Stucco cracks get filled with flexible patching compound. Window and door frames get caulked. Most companies skip this and the paint job dies fast.",
        descriptionEs:
          "Pintura suelta sale con raspadores y lija grano 60. Grietas de estuco se rellenan con compuesto flexible. Marcos de ventanas y puertas se calafatean. La mayoría omite esto y la pintura muere rápido.",
      },
      {
        icon: "Medal",
        title: "10-Year Workmanship Warranty",
        titleEs: "Garantía de Mano de Obra de 10 Años",
        description:
          "Written into your contract. If the paint we applied peels, blisters, or fails within 10 years for any reason other than impact damage, we come back and fix it.",
        descriptionEs:
          "Escrita en tu contrato. Si la pintura aplicada se pela, ampolla o falla en 10 años por cualquier razón que no sea daño por impacto, regresamos a arreglarla.",
      },
    ],
    processIntro:
      "Exterior painting follows six steps. The first three are the difference between a 3-year paint job and a 10-year one.",
    processIntroEs:
      "Pintura exterior sigue seis pasos. Los primeros tres son la diferencia entre 3 años de duración y 10.",
    processSteps: [
      {
        step: 1,
        title: "Inspection and Estimate",
        titleEs: "Inspección y Estimado",
        description:
          "We walk the full perimeter, note cracks, water stains, peeling areas, and trim that needs replacement. Fixed quote within 48 hours.",
        descriptionEs:
          "Recorremos todo el perímetro, notamos grietas, manchas de agua, áreas peladas y molduras que necesitan reemplazo. Cotización fija en 48 horas.",
        duration: "Day 0",
        durationEs: "Día 0",
      },
      {
        step: 2,
        title: "Pressure Wash and Treat",
        titleEs: "Lavado a Presión y Tratamiento",
        description:
          "Whole house gets a 3,500 psi wash with anti-mildew solution. We rinse plants, mask windows and doors, and let it dry 24 to 48 hours before paint goes on.",
        descriptionEs:
          "Toda la casa recibe lavado a 3,500 psi con solución anti-moho. Enjuagamos plantas, cubrimos ventanas y puertas, y dejamos secar 24 a 48 horas antes de pintar.",
        duration: "Day 1",
        durationEs: "Día 1",
      },
      {
        step: 3,
        title: "Scrape, Patch, Caulk",
        titleEs: "Raspar, Parchar, Calafatear",
        description:
          "Loose paint scraped off. Stucco cracks filled with flexible patching. Hairline cracks get a stretchable caulk. Trim gaps get sealed with paintable silicone.",
        descriptionEs:
          "Pintura suelta raspada. Grietas de estuco rellenadas con parche flexible. Grietas finas con calafateo elástico. Juntas de molduras selladas con silicón pintable.",
        duration: "Day 2",
        durationEs: "Día 2",
      },
      {
        step: 4,
        title: "Prime Bare Spots",
        titleEs: "Imprimar Puntos Sin Pintura",
        description:
          "Anywhere stucco shows through gets primed with Loxon stucco primer or equivalent. We do not roll paint over bare substrate, ever.",
        descriptionEs:
          "Donde se vea estuco crudo se imprima con Loxon o equivalente. Nunca aplicamos pintura sobre sustrato crudo.",
        duration: "Day 3",
        durationEs: "Día 3",
      },
      {
        step: 5,
        title: "Two Coats of Paint",
        titleEs: "Dos Manos de Pintura",
        description:
          "Sprayed and back-rolled on stucco for proper fill into the texture. Brushed and rolled on smooth surfaces. Second coat goes on after recoat time on the can (usually 4 hours).",
        descriptionEs:
          "Rociado y rodillo en estuco para llenar la textura. Brocha y rodillo en superficies lisas. Segunda mano después del tiempo de recoat (usualmente 4 horas).",
        duration: "Days 4-6",
        durationEs: "Días 4 al 6",
      },
      {
        step: 6,
        title: "Trim, Doors, Cleanup, Walkthrough",
        titleEs: "Molduras, Puertas, Limpieza, Recorrido",
        description:
          "Doors, shutters, and trim painted in accent color. Plant covers and masking removed. We power wash any concrete spots and walk every side of the house with you.",
        descriptionEs:
          "Puertas, contraventanas y molduras pintadas en color de acento. Cubiertas de plantas y enmascaramiento removidos. Lavamos a presión manchas en concreto y recorremos cada lado contigo.",
        duration: "Day 7",
        durationEs: "Día 7",
      },
    ],
    materialsIntro:
      "Exterior paint matters more than interior because the sun and rain attack it daily. Here is what we recommend.",
    materialsIntroEs:
      "La pintura exterior importa más que la interior porque el sol y la lluvia la atacan diariamente. Esto es lo que recomendamos.",
    materials: [
      {
        category: "Stucco Paint",
        categoryEs: "Pintura de Estuco",
        name: "Sherwin-Williams Resilience",
        nameEs: "Sherwin-Williams Resilience",
        description:
          "100% acrylic, mid-tier price. Good water resistance, decent UV protection. Solid baseline for a budget exterior job.",
        descriptionEs:
          "Acrílico 100%, precio medio. Buena resistencia al agua, protección UV decente. Base sólida para trabajo exterior económico.",
        priceLevel: "Mid",
      },
      {
        category: "Stucco Paint",
        categoryEs: "Pintura de Estuco",
        name: "Sherwin-Williams SuperPaint",
        nameEs: "Sherwin-Williams SuperPaint",
        description:
          "Step up from Resilience. Better dirt-pickup resistance, stays cleaner longer in Miami's pollen and pollution.",
        descriptionEs:
          "Un paso arriba de Resilience. Mejor resistencia a suciedad, se mantiene más limpia con polen y contaminación de Miami.",
        priceLevel: "Premium",
      },
      {
        category: "Stucco Paint",
        categoryEs: "Pintura de Estuco",
        name: "Sherwin-Williams Loxon Elastomeric",
        nameEs: "Sherwin-Williams Loxon Elastomérico",
        description:
          "Stretches with the building. Bridges hairline cracks. Best protection against wind-driven rain. Most-recommended product for South Florida stucco.",
        descriptionEs:
          "Se estira con el edificio. Cubre grietas finas. Mejor protección contra lluvia por viento. Producto más recomendado para estuco del sur de Florida.",
        priceLevel: "Luxury",
      },
      {
        category: "Stucco Paint",
        categoryEs: "Pintura de Estuco",
        name: "Behr Marquee",
        nameEs: "Behr Marquee",
        description:
          "Home Depot's flagship. Good coverage, decent durability. Sometimes the right call on a budget when you cannot get to SW. We carry both.",
        descriptionEs:
          "Estrella de Home Depot. Buena cobertura, durabilidad decente. A veces correcto en presupuesto cuando no se llega a SW.",
        priceLevel: "Mid",
      },
      {
        category: "Trim Paint",
        categoryEs: "Pintura de Molduras",
        name: "Sherwin-Williams Emerald Exterior",
        nameEs: "Sherwin-Williams Emerald Exterior",
        description:
          "Premium exterior trim and door paint. Color-locked, fade-resistant, self-priming on most surfaces. The trim color stays the color you picked for years.",
        descriptionEs:
          "Pintura premium para molduras y puertas exteriores. Color anclado, resistente a desvanecimiento, auto-imprimante. El color de moldura se queda años.",
        priceLevel: "Premium",
      },
      {
        category: "Primer",
        categoryEs: "Imprimante",
        name: "Loxon Concrete and Masonry Primer",
        nameEs: "Loxon Primer para Concreto y Mampostería",
        description:
          "Designed for bare stucco. High alkali tolerance so it does not blister on new concrete. We always carry it.",
        descriptionEs:
          "Diseñado para estuco crudo. Alta tolerancia alcalina para no ampollar en concreto nuevo. Siempre lo cargamos.",
        priceLevel: "Mid",
      },
      {
        category: "Caulk and Sealant",
        categoryEs: "Calafateo y Sellador",
        name: "Big Stretch by Sashco",
        nameEs: "Big Stretch de Sashco",
        description:
          "Stretches over 500% without cracking. Used on stucco hairlines, window perimeters, and trim gaps. Paintable. Lasts as long as the paint job.",
        descriptionEs:
          "Estira más de 500% sin agrietarse. Para grietas finas de estuco, perímetros de ventanas y juntas. Pintable. Dura lo mismo que el trabajo.",
        priceLevel: "Premium",
      },
      {
        category: "Caulk and Sealant",
        categoryEs: "Calafateo y Sellador",
        name: "DAP Alex Plus",
        nameEs: "DAP Alex Plus",
        description:
          "Standard paintable acrylic caulk. Good for indoor and lower-stress outdoor applications. Cheaper but lifespan is 3 to 5 years vs. 10.",
        descriptionEs:
          "Calafateo acrílico pintable estándar. Bueno para interior y exterior de baja exigencia. Más barato pero dura 3 a 5 años vs. 10.",
        priceLevel: "Budget",
      },
      {
        category: "Specialty",
        categoryEs: "Especializado",
        name: "Loxon XP",
        nameEs: "Loxon XP",
        description:
          "Like regular Loxon but rated for wind-driven rain at hurricane levels. Used on coastal homes in Cutler Bay and Palmetto Bay.",
        descriptionEs:
          "Como Loxon regular pero clasificado para lluvia por viento huracanado. Usado en hogares costeros en Cutler Bay y Palmetto Bay.",
        priceLevel: "Luxury",
      },
      {
        category: "Specialty",
        categoryEs: "Especializado",
        name: "DTM (Direct-to-Metal) Primer",
        nameEs: "Primer DTM (Directo a Metal)",
        description:
          "For metal railings, gates, and exterior steel. Stops rust under the paint film.",
        descriptionEs:
          "Para barandas metálicas, portones y acero exterior. Detiene óxido bajo la película de pintura.",
        priceLevel: "Mid",
      },
    ],
    pricingIntro:
      "Three tiers based on home size and paint selected. Prices assume single-story stucco homes typical to Miami-Dade.",
    pricingIntroEs:
      "Tres niveles basados en tamaño de casa y pintura. Precios asumen casas de un piso de estuco típicas de Miami-Dade.",
    pricingTiers: [
      {
        name: "Standard Refresh",
        nameEs: "Renovación Estándar",
        priceRange: "$3,500 - $5,500",
        duration: "3-5 days",
        durationEs: "3 a 5 días",
        includes: [
          "Pressure wash with anti-mildew",
          "Scrape and patch as needed",
          "Two coats SW Resilience",
          "One accent color on doors and trim",
          "Plant and window protection",
        ],
        includesEs: [
          "Lavado a presión con anti-moho",
          "Raspar y parchar según necesidad",
          "Dos manos SW Resilience",
          "Un color de acento en puertas y molduras",
          "Protección de plantas y ventanas",
        ],
        bestFor:
          "Homes around 1,500 to 1,800 sq ft with stucco in decent shape. Honest budget option that still uses real product.",
        bestForEs:
          "Casas de 1,500 a 1,800 pies cuadrados con estuco decente. Opción económica honesta con producto real.",
      },
      {
        name: "Full Protection",
        nameEs: "Protección Completa",
        priceRange: "$5,500 - $8,500",
        duration: "5-7 days",
        durationEs: "5 a 7 días",
        includes: [
          "Detailed pressure wash and mildew kill",
          "Crack repair and stucco patching",
          "Loxon stucco primer where needed",
          "Two coats SW SuperPaint or Loxon",
          "Two accent colors (trim and doors)",
          "Garage door and shutters included",
        ],
        includesEs: [
          "Lavado detallado y muerte de moho",
          "Reparación de grietas y parche de estuco",
          "Primer Loxon donde sea necesario",
          "Dos manos SW SuperPaint o Loxon",
          "Dos colores de acento (molduras y puertas)",
          "Puerta de garaje y contraventanas incluidas",
        ],
        bestFor:
          "Most Miami homes between 1,800 and 2,800 sq ft. Best ratio of cost to lifespan. Our most common exterior package.",
        bestForEs:
          "La mayoría de casas en Miami de 1,800 a 2,800 pies cuadrados. Mejor relación costo vs. duración. Nuestro paquete exterior más común.",
      },
      {
        name: "Premium Long-Life",
        nameEs: "Premium Larga Vida",
        priceRange: "$8,500 - $12,000",
        duration: "6-7 days",
        durationEs: "6 a 7 días",
        includes: [
          "Premium pressure wash and chemical prep",
          "Full crack repair with elastomeric patching",
          "Two coats SW Loxon Elastomeric or Loxon XP",
          "SW Emerald Exterior on all trim and doors",
          "All accent details (shutters, railings, garage)",
          "10-year written warranty",
        ],
        includesEs: [
          "Lavado a presión premium y preparación química",
          "Reparación completa de grietas con parche elastomérico",
          "Dos manos SW Loxon Elastomérico o Loxon XP",
          "SW Emerald Exterior en molduras y puertas",
          "Todos los detalles de acento",
          "Garantía escrita de 10 años",
        ],
        bestFor:
          "Coastal homes, larger Coral Gables and Pinecrest properties, owners who plan to stay 10+ years and want it done once.",
        bestForEs:
          "Casas costeras, propiedades más grandes en Coral Gables y Pinecrest, dueños que planean quedarse más de 10 años.",
      },
    ],
    projectsIntro:
      "Three recent exterior paint projects across Miami-Dade.",
    projectsIntroEs:
      "Tres proyectos recientes de pintura exterior en Miami-Dade.",
    recentProjects: [
      {
        title: "Coastal Stucco in Cutler Bay",
        titleEs: "Estuco Costero en Cutler Bay",
        location: "Cutler Bay, 33157",
        scope:
          "2,200 sq ft single-story, Loxon XP coating, two accent colors, garage and shutters included.",
        scopeEs:
          "Un piso de 2,200 pies cuadrados, recubrimiento Loxon XP, dos colores de acento, garaje y contraventanas incluidos.",
        duration: "7 working days",
        durationEs: "7 días laborables",
        highlight:
          "Owner's previous paint job lasted 4 years. We delivered the Loxon XP package with the promise it would last 10+. Came in at $11,200.",
        highlightEs:
          "La pintura anterior duró 4 años. Entregamos el paquete Loxon XP con promesa de más de 10. Vino a $11,200.",
        imagePlaceholder:
          "/images/services/exterior-painting/projects/cutler-bay-coastal.jpg",
      },
      {
        title: "Curb Appeal Refresh in Doral",
        titleEs: "Renovación de Apariencia en Doral",
        location: "Doral, 33172",
        scope:
          "1,800 sq ft house, full body color change from beige to greige, white trim, navy door.",
        scopeEs:
          "Casa de 1,800 pies cuadrados, cambio completo de color, beige a greige, molduras blancas, puerta azul marino.",
        duration: "5 working days",
        durationEs: "5 días laborables",
        highlight:
          "Owner was selling the house. New color got 8 offers in 4 days. Listed for $25K above target and sold above list price.",
        highlightEs:
          "El dueño vendía la casa. El nuevo color recibió 8 ofertas en 4 días. Listada $25K sobre objetivo y vendida arriba del precio listado.",
        imagePlaceholder:
          "/images/services/exterior-painting/projects/doral-curb-appeal.jpg",
      },
      {
        title: "Full Protection Job in Pinecrest",
        titleEs: "Trabajo de Protección Completa en Pinecrest",
        location: "Pinecrest, 33156",
        scope:
          "2,600 sq ft, SW SuperPaint, Emerald Exterior on doors and shutters, pressure wash on pool deck included.",
        scopeEs:
          "2,600 pies cuadrados, SW SuperPaint, Emerald Exterior en puertas y contraventanas, lavado de cubierta de piscina incluido.",
        duration: "6 working days",
        durationEs: "6 días laborables",
        highlight:
          "Found mildew growing under the previous coat that two other crews missed. Killed it before repainting. Owner thanked us a year later when no mildew came back.",
        highlightEs:
          "Encontramos moho bajo la pintura anterior que otros dos equipos pasaron por alto. Lo matamos antes de repintar. El dueño agradeció un año después cuando no volvió.",
        imagePlaceholder:
          "/images/services/exterior-painting/projects/pinecrest-protection.jpg",
      },
    ],
    testimonials: [
      {
        quote:
          "Previous painters did our house and the paint started flaking in two years. Broke & Fixed went back to bare stucco where it failed, primed properly, and used Loxon. Three years in, perfect.",
        quoteEs:
          "Los pintores anteriores hicieron la casa y la pintura empezó a pelarse en dos años. Broke & Fixed regresó al estuco donde falló, aplicó primer correctamente y usó Loxon. Tres años después, perfecto.",
        authorName: "Eduardo F.",
        authorLocation: "Cutler Bay",
        service: "Exterior Painting",
        rating: 5,
      },
      {
        quote:
          "Real estate agent told us to paint before listing. Best $5,800 we have ever spent. Sold above asking in a week.",
        quoteEs:
          "El agente nos dijo que pintáramos antes de listar. Los mejores $5,800 que hemos gastado. Vendida arriba del precio en una semana.",
        authorName: "Cristina N.",
        authorLocation: "Doral",
        service: "Exterior Painting",
        rating: 5,
      },
      {
        quote:
          "They postponed our start by 2 days because of forecast humidity. I respected that decision. Cheap painters would have rushed it and the paint would have failed.",
        quoteEs:
          "Pospusieron nuestro inicio 2 días por humedad pronosticada. Respeté esa decisión. Pintores baratos lo habrían apurado y la pintura habría fallado.",
        authorName: "Daniel K.",
        authorLocation: "Pinecrest",
        service: "Exterior Painting",
        rating: 5,
      },
    ],
  },

  "tile-work": {
    heroHeadline: "Tile Set Level, Grouted Tight, Built to Last",
    heroHeadlineEs: "Azulejo Nivelado, Lechada Firme, Hecho para Durar",
    heroSubhead:
      "Porcelain, ceramic, natural stone, large-format, mosaic. Floors, showers, backsplashes. Real prep, proper underlayment, lines that stay straight.",
    heroSubheadEs:
      "Porcelanato, cerámica, piedra natural, formato grande, mosaico. Pisos, duchas, salpicaderos. Preparación real, sustrato apropiado.",
    heroBadges: ["Schluter-certified", "Fully insured", "Lippage-free install"],
    heroBadgesEs: [
      "Certificados Schluter",
      "Totalmente asegurados",
      "Instalación sin lippage",
    ],
    whyChooseUsIntro:
      "Bad tile work hides for a few months then shows up. Grout cracks. Tiles lift. Lippage you cannot stop noticing. We do it the slow way because the fast way fails.",
    whyChooseUsIntroEs:
      "El mal trabajo de azulejo se esconde unos meses y luego aparece. La lechada se agrieta. Los azulejos se levantan. Lippage que no puedes ignorar. Lo hacemos lento porque la forma rápida falla.",
    whyChooseUs: [
      {
        icon: "Compass",
        title: "Level Sub-Floor or No Tile Goes Down",
        titleEs: "Sub-Piso Nivelado o No Va Azulejo",
        description:
          "If your floor is out of level by more than 1/8 inch over 10 feet, we self-level the slab before tile. Most failures we see started with a crooked floor under good tile.",
        descriptionEs:
          "Si tu piso está desnivelado más de 1/8 de pulgada en 10 pies, auto-nivelamos antes del azulejo. La mayoría de fallas comenzaron con piso torcido bajo buen azulejo.",
      },
      {
        icon: "Drop",
        title: "Schluter Membrane in Wet Areas",
        titleEs: "Membrana Schluter en Áreas Húmedas",
        description:
          "Shower floors, shower walls, and wet rooms get a proper waterproof membrane (Ditra, Kerdi, or RedGard) before tile. This is the layer that prevents water damage in the wall framing five years from now.",
        descriptionEs:
          "Pisos de ducha, paredes de ducha y habitaciones húmedas reciben membrana impermeable (Ditra, Kerdi o RedGard) antes del azulejo. Esta capa previene daño por agua en la estructura años después.",
      },
      {
        icon: "Toolbox",
        title: "Right Thinset for the Format",
        titleEs: "Thinset Correcto para el Formato",
        description:
          "Small tile uses different mortar than 24x48 large format. Natural stone needs LFT (large and heavy tile) mortar. We carry six thinsets on the truck and pick based on tile and substrate.",
        descriptionEs:
          "Azulejo pequeño usa diferente mortero que formato grande 24x48. Piedra natural necesita mortero LFT. Cargamos seis thinsets y elegimos según azulejo y sustrato.",
      },
      {
        icon: "Sparkle",
        title: "Lippage Killers: Leveling Clips",
        titleEs: "Anti-Lippage: Clips de Nivelación",
        description:
          "We use Raimondi or Tuscan leveling systems on all tile above 12x12. Clips and wedges pull adjacent tiles flush during cure. Result is a glass-flat surface with no edges to stub a toe on.",
        descriptionEs:
          "Usamos sistemas Raimondi o Tuscan en todo azulejo arriba de 12x12. Clips y cuñas alinean azulejos durante el curado. Resultado es superficie plana sin bordes.",
      },
      {
        icon: "ShieldCheck",
        title: "HB 803 Friendly on Tile-Only Jobs",
        titleEs: "Compatible HB 803 en Trabajos Solo de Azulejo",
        description:
          "Re-tiling a bathroom floor, kitchen, or backsplash with no plumbing moved stays cosmetic. Most projects under $7,500 qualify for permit-free work under the new Florida law.",
        descriptionEs:
          "Re-azulejar un piso de baño, cocina o salpicadero sin mover plomería es cosmético. La mayoría bajo $7,500 califica para trabajo sin permiso bajo la nueva ley.",
      },
    ],
    processIntro:
      "Tile work runs in five steps. We do not start setting tile until prep is right because tile cannot fix a bad substrate.",
    processIntroEs:
      "El trabajo de azulejo va en cinco pasos. No comenzamos hasta que la preparación esté correcta porque el azulejo no arregla un mal sustrato.",
    processSteps: [
      {
        step: 1,
        title: "Layout and Estimate",
        titleEs: "Distribución y Estimado",
        description:
          "Measure, calculate square footage with 10% waste factor, dry-lay key rows to plan cuts. Fixed quote written same day or within 24 hours.",
        descriptionEs:
          "Medir, calcular pies cuadrados con 10% de desperdicio, distribución en seco de hileras clave para planear cortes. Cotización fija el mismo día o en 24 horas.",
        duration: "Day 0",
        durationEs: "Día 0",
      },
      {
        step: 2,
        title: "Substrate Prep and Self-Leveling",
        titleEs: "Preparación de Sustrato y Auto-Nivelación",
        description:
          "Remove existing tile (or carpet/vinyl), clean and inspect substrate. Patch cracks. Self-level if needed. Apply waterproofing in wet areas.",
        descriptionEs:
          "Remover azulejo existente (o carpeta/vinilo), limpiar e inspeccionar sustrato. Parchar grietas. Auto-nivelar si necesario. Aplicar impermeabilización en zonas húmedas.",
        duration: "Days 1-2",
        durationEs: "Días 1 al 2",
      },
      {
        step: 3,
        title: "Tile Installation",
        titleEs: "Instalación de Azulejo",
        description:
          "Set tiles in proper thinset with the right trowel notch for the format. Use leveling clips on anything above 12x12. Cuts at walls and obstacles done on a wet saw for clean edges.",
        descriptionEs:
          "Asentar azulejos con thinset apropiado y muesca correcta. Clips de nivelación en formato sobre 12x12. Cortes en paredes y obstáculos con sierra de agua.",
        duration: "Days 2-5",
        durationEs: "Días 2 al 5",
      },
      {
        step: 4,
        title: "Grout and Seal",
        titleEs: "Lechada y Sellado",
        description:
          "Wait 24 hours for tile to set. Mix and apply grout with rubber float. Sponge off after 30 minutes. Apply grout sealer 48 hours after grout cures.",
        descriptionEs:
          "Esperar 24 horas para que asiente. Mezclar y aplicar lechada con flota. Limpiar con esponja después de 30 minutos. Sellador de lechada 48 horas después del curado.",
        duration: "Days 5-7",
        durationEs: "Días 5 al 7",
      },
      {
        step: 5,
        title: "Caulk and Final Walkthrough",
        titleEs: "Calafateo y Recorrido Final",
        description:
          "Color-matched silicone caulk in all corners and transitions (corners crack if grouted, so caulk handles movement). Walkthrough with you. Care guide handed over.",
        descriptionEs:
          "Calafateo de silicón a juego en esquinas y transiciones. Recorrido contigo. Guía de cuidado entregada.",
        duration: "Day 8",
        durationEs: "Día 8",
      },
    ],
    materialsIntro:
      "Tile choice shapes the whole look and the whole budget. Here is what we install most across Miami homes.",
    materialsIntroEs:
      "La elección de azulejo da forma al look y al presupuesto. Esto es lo que instalamos más en hogares de Miami.",
    materials: [
      {
        category: "Format",
        categoryEs: "Formato",
        name: "Ceramic 12x12 or 12x24",
        nameEs: "Cerámica 12x12 o 12x24",
        description:
          "Cheapest, fastest install. Decent for bathroom floors and dry areas. Lifespan 15+ years if installed right.",
        descriptionEs:
          "Más barato, instalación rápida. Decente para pisos de baño y áreas secas. Vida útil más de 15 años con buena instalación.",
        priceLevel: "Budget",
      },
      {
        category: "Format",
        categoryEs: "Formato",
        name: "Porcelain 12x24",
        nameEs: "Porcelanato 12x24",
        description:
          "Harder, denser, less porous than ceramic. The standard upgrade. Better for kitchens, foyers, and busy areas. Most-installed material in our jobs.",
        descriptionEs:
          "Más duro, denso y menos poroso que cerámica. La actualización estándar. Mejor para cocinas, foyers y áreas con tráfico.",
        priceLevel: "Mid",
      },
      {
        category: "Format",
        categoryEs: "Formato",
        name: "Large-Format 24x48",
        nameEs: "Formato Grande 24x48",
        description:
          "Fewer grout lines, modern, easy to clean. Requires extra prep and skilled install to avoid lippage. Best in open-concept living areas.",
        descriptionEs:
          "Menos juntas de lechada, moderno, fácil de limpiar. Requiere preparación extra e instalación habilidosa. Mejor en áreas abiertas.",
        priceLevel: "Premium",
      },
      {
        category: "Format",
        categoryEs: "Formato",
        name: "Subway 3x6 or 4x8",
        nameEs: "Subway 3x6 o 4x8",
        description:
          "Classic small-format wall tile. Used for backsplashes, shower walls, accent strips. Cheap to buy, more labor to set than people expect.",
        descriptionEs:
          "Azulejo pequeño clásico de pared. Para salpicaderos, paredes de ducha, bandas. Barato de comprar, más mano de obra de lo esperado.",
        priceLevel: "Budget",
      },
      {
        category: "Format",
        categoryEs: "Formato",
        name: "Herringbone or Chevron Pattern",
        nameEs: "Patrón Espina de Pescado o Chevron",
        description:
          "Same tile, different layout. Adds about 30% to labor due to extra cuts and care. Strong visual impact on a backsplash or accent wall.",
        descriptionEs:
          "Mismo azulejo, distribución diferente. Agrega 30% a mano de obra por cortes adicionales. Fuerte impacto visual en salpicadero o pared.",
        priceLevel: "Mid",
      },
      {
        category: "Material",
        categoryEs: "Material",
        name: "Natural Stone (Marble, Travertine)",
        nameEs: "Piedra Natural (Mármol, Travertino)",
        description:
          "Real stone. Each piece unique. Requires sealer every 12 months and harder to clean. Best in master baths and entryways where it earns its price.",
        descriptionEs:
          "Piedra real. Cada pieza única. Requiere sellador cada 12 meses y más difícil de limpiar. Mejor en baños principales y entradas.",
        priceLevel: "Luxury",
      },
      {
        category: "Material",
        categoryEs: "Material",
        name: "Wood-Look Porcelain Plank",
        nameEs: "Tabla de Porcelanato Tipo Madera",
        description:
          "Porcelain printed and textured to look like hardwood. Indestructible, waterproof, perfect for Miami where real wood swells with humidity.",
        descriptionEs:
          "Porcelanato impreso y texturizado tipo madera. Indestructible, impermeable, perfecto para Miami donde la madera real se hincha.",
        priceLevel: "Mid",
      },
      {
        category: "Material",
        categoryEs: "Material",
        name: "Glass Mosaic",
        nameEs: "Mosaico de Vidrio",
        description:
          "Used for accent strips, shower niches, kitchen backsplashes. Reflects light, looks expensive. Set on mesh sheets for precision.",
        descriptionEs:
          "Para bandas de acento, nichos, salpicaderos. Refleja luz, se ve costoso. En láminas de malla para precisión.",
        priceLevel: "Premium",
      },
      {
        category: "Grout",
        categoryEs: "Lechada",
        name: "Cement Grout, Sanded",
        nameEs: "Lechada de Cemento, Arenada",
        description:
          "Standard. Used for grout lines wider than 1/8 inch. Needs sealing or it stains. Cheap, replaceable if it cracks.",
        descriptionEs:
          "Estándar. Para juntas mayores a 1/8 de pulgada. Necesita sellado o se mancha. Barata, reemplazable.",
        priceLevel: "Budget",
      },
      {
        category: "Grout",
        categoryEs: "Lechada",
        name: "Epoxy Grout (Mapei Kerapoxy or Laticrete SpectraLOCK)",
        nameEs: "Lechada de Epoxi",
        description:
          "Stain-proof, no sealing needed, lifetime durability. About 2 to 3 times the cost of cement grout but pays back in zero maintenance. Best for kitchen backsplashes and shower floors.",
        descriptionEs:
          "A prueba de manchas, sin sellado, durabilidad de por vida. 2 a 3 veces el costo de cemento pero paga en cero mantenimiento. Mejor para salpicaderos y pisos de ducha.",
        priceLevel: "Premium",
      },
      {
        category: "Underlayment",
        categoryEs: "Sustrato",
        name: "Schluter Ditra",
        nameEs: "Schluter Ditra",
        description:
          "Uncoupling membrane. Lets the tile move independently of the substrate so concrete cracks do not telegraph through. Used on most slab installs.",
        descriptionEs:
          "Membrana desacopladora. Permite movimiento independiente entre azulejo y sustrato. Usada en mayoría de instalaciones en losa.",
        priceLevel: "Premium",
      },
      {
        category: "Underlayment",
        categoryEs: "Sustrato",
        name: "Hardibacker or Durock",
        nameEs: "Hardibacker o Durock",
        description:
          "Cement board for wet walls (showers). Real cement, not drywall with paper. Holds up to water in ways drywall never will.",
        descriptionEs:
          "Cemento board para paredes húmedas (duchas). Cemento real, no drywall con papel. Aguanta agua de formas que el drywall no.",
        priceLevel: "Mid",
      },
    ],
    pricingIntro:
      "Tile pricing varies a lot by format, material, and prep. Here are three honest ranges.",
    pricingIntroEs:
      "El precio de azulejo varía mucho por formato, material y preparación. Tres rangos honestos.",
    pricingTiers: [
      {
        name: "Single-Room Install",
        nameEs: "Instalación Habitación Individual",
        priceRange: "$3,000 - $5,500",
        duration: "3-5 days",
        durationEs: "3 a 5 días",
        includes: [
          "Remove existing flooring",
          "Substrate prep and minor leveling",
          "Install up to 150 sq ft porcelain or ceramic",
          "Standard cement grout, sealed",
          "Color-matched caulk at transitions",
        ],
        includesEs: [
          "Remover piso existente",
          "Preparación de sustrato y nivelación menor",
          "Instalar hasta 150 pies cuadrados porcelanato/cerámica",
          "Lechada de cemento estándar, sellada",
          "Calafateo a juego en transiciones",
        ],
        bestFor:
          "Single bathroom floor or kitchen replacement. Often HB 803 exempt since it is pure cosmetic.",
        bestForEs:
          "Un piso de baño o cocina. Frecuentemente exento HB 803 por ser cosmético.",
      },
      {
        name: "Mid-Size Project",
        nameEs: "Proyecto Mediano",
        priceRange: "$5,500 - $10,000",
        duration: "5-7 days",
        durationEs: "5 a 7 días",
        includes: [
          "Multiple rooms or full-bath shower install",
          "Self-leveling on uneven substrate",
          "Schluter Ditra or RedGard waterproofing",
          "Large-format porcelain or premium ceramic",
          "Decorative niche or accent strip",
          "Epoxy grout option on heavy-use areas",
        ],
        includesEs: [
          "Múltiples habitaciones o ducha completa",
          "Auto-nivelación en sustrato irregular",
          "Impermeabilización Ditra o RedGard",
          "Porcelanato formato grande o cerámica premium",
          "Nicho decorativo o banda de acento",
          "Opción lechada de epoxi en áreas de uso",
        ],
        bestFor:
          "Bathroom + kitchen combo or one large open space. Most common tile-only project in Kendall and Doral.",
        bestForEs:
          "Combo de baño + cocina o un espacio grande. Proyecto más común en Kendall y Doral.",
      },
      {
        name: "Large or Premium Job",
        nameEs: "Trabajo Grande o Premium",
        priceRange: "$10,000 - $15,000",
        duration: "7-10 days",
        durationEs: "7 a 10 días",
        includes: [
          "500+ sq ft or premium materials",
          "Natural stone or 24x48 large-format",
          "Schluter Kerdi shower system if applicable",
          "Custom mosaic feature wall",
          "Epoxy grout throughout",
          "Full edge profiles and reveals",
        ],
        includesEs: [
          "Más de 500 pies cuadrados o materiales premium",
          "Piedra natural o formato grande 24x48",
          "Sistema de ducha Schluter Kerdi si aplica",
          "Pared con mosaico personalizado",
          "Lechada de epoxi en todo",
          "Perfiles de borde completos",
        ],
        bestFor:
          "Pinecrest and Coral Gables homes where tile is a statement, not a finish. Worth the investment when stone or large format is involved.",
        bestForEs:
          "Hogares en Pinecrest y Coral Gables donde el azulejo es declaración. Vale la inversión con piedra o formato grande.",
      },
    ],
    projectsIntro:
      "Three recent tile jobs we have completed across Miami-Dade.",
    projectsIntroEs:
      "Tres trabajos recientes de azulejo en Miami-Dade.",
    recentProjects: [
      {
        title: "Wood-Look Plank Throughout in Sweetwater",
        titleEs: "Tabla Tipo Madera en Toda la Casa en Sweetwater",
        location: "Sweetwater, 33172",
        scope:
          "Replaced 1,200 sq ft of carpet and laminate with 6x36 wood-look porcelain plank. Self-leveled the slab.",
        scopeEs:
          "Reemplazamos 1,200 pies cuadrados de carpeta y laminado con tabla porcelanato tipo madera 6x36. Auto-nivelamos la losa.",
        duration: "8 working days",
        durationEs: "8 días laborables",
        highlight:
          "Owner had three quotes that did not include leveling. We caught a 3/4 inch dip in the living room and quoted the leveling honestly. Result: no lippage anywhere.",
        highlightEs:
          "El dueño tenía tres cotizaciones sin nivelación. Detectamos una caída de 3/4 pulgada en la sala y cotizamos honestamente. Resultado: sin lippage.",
        imagePlaceholder:
          "/images/services/tile-work/projects/sweetwater-plank.jpg",
      },
      {
        title: "Master Shower with Marble Accent in Pinecrest",
        titleEs: "Ducha Principal con Acento de Mármol en Pinecrest",
        location: "Pinecrest, 33156",
        scope:
          "Kerdi shower system, 12x24 porcelain main, vertical marble feature strip, integrated bench and niche.",
        scopeEs:
          "Sistema de ducha Kerdi, porcelanato 12x24 principal, banda vertical de mármol, banca y nicho integrados.",
        duration: "10 working days",
        durationEs: "10 días laborables",
        highlight:
          "Owner had been burned by a previous shower that leaked. We removed and replaced the failed substrate, installed Kerdi properly, and warranty backed everything for 5 years.",
        highlightEs:
          "El dueño tuvo una ducha previa que goteaba. Removimos sustrato fallado, instalamos Kerdi correctamente y garantizamos 5 años.",
        imagePlaceholder:
          "/images/services/tile-work/projects/pinecrest-shower.jpg",
      },
      {
        title: "Kitchen Backsplash in Country Walk",
        titleEs: "Salpicadero de Cocina en Country Walk",
        location: "Country Walk, 33186",
        scope:
          "30 sq ft herringbone subway tile with bullnose edge profile, epoxy grout, color-matched silicone at counter junction.",
        scopeEs:
          "30 pies cuadrados de subway espina de pescado con perfil bullnose, lechada de epoxi, silicón a juego.",
        duration: "2 working days",
        durationEs: "2 días laborables",
        highlight:
          "Quote was $1,950. Owner had a $4,500 quote from another company for the same scope. Same materials, same prep, real value.",
        highlightEs:
          "Cotización a $1,950. El dueño tenía cotización de $4,500 de otra empresa por el mismo alcance. Mismo material, valor real.",
        imagePlaceholder:
          "/images/services/tile-work/projects/country-walk-backsplash.jpg",
      },
    ],
    testimonials: [
      {
        quote:
          "We had a tile guy who set our floor and within six months we could feel edges sticking up. Broke & Fixed ripped it out, leveled the slab properly, and reset. Two years later, flat as glass.",
        quoteEs:
          "Tuvimos un instalador que nos puso piso y a los seis meses sentíamos bordes. Broke & Fixed lo sacó, niveló bien la losa y volvió a poner. Dos años después, plano como vidrio.",
        authorName: "Andrea L.",
        authorLocation: "Sweetwater",
        service: "Tile Work",
        rating: 5,
      },
      {
        quote:
          "Our previous shower leaked into the wall. They tore everything out, showed me the rotten studs, replaced them, and built the new shower with proper waterproofing. Did not cut corners.",
        quoteEs:
          "Nuestra ducha anterior goteaba a la pared. Sacaron todo, me mostraron la madera podrida, la reemplazaron y construyeron la ducha con impermeabilización apropiada. No tomaron atajos.",
        authorName: "Hector R.",
        authorLocation: "Pinecrest",
        service: "Tile Work",
        rating: 5,
      },
      {
        quote:
          "Backsplash quote from another company was $4,500. Theirs was $1,950 for the same exact scope and same materials. They saved my project.",
        quoteEs:
          "La cotización de salpicadero de otra empresa era $4,500. La de ellos $1,950 por el mismo alcance y materiales. Salvaron mi proyecto.",
        authorName: "Karen O.",
        authorLocation: "Country Walk",
        service: "Tile Work",
        rating: 5,
      },
      {
        quote:
          "Schluter-certified mattered. Most tile guys in Miami have no formal training. These guys know waterproofing membranes inside and out.",
        quoteEs:
          "Certificación Schluter importó. La mayoría de azulejeros en Miami no tienen entrenamiento formal. Estos saben de membranas a fondo.",
        authorName: "Manuel T.",
        authorLocation: "Coral Gables",
        service: "Tile Work",
        rating: 5,
      },
    ],
  },

  "exterior-repairs": {
    heroHeadline: "Exterior Repairs That Stop Bigger Bills Later",
    heroHeadlineEs: "Reparaciones Exteriores que Detienen Cuentas Mayores",
    heroSubhead:
      "Cracked stucco, rotting fascia, damaged soffits, water intrusion. We fix what South Florida homes deal with so small problems never become big ones.",
    heroSubheadEs:
      "Estuco agrietado, fascia podrida, sofitos dañados, intrusión de agua. Arreglamos lo que las casas del sur de Florida enfrentan para que pequeños problemas no se vuelvan grandes.",
    heroBadges: [
      "Same-week diagnosis",
      "Fully insured",
      "Hurricane prep specialists",
    ],
    heroBadgesEs: [
      "Diagnóstico en la semana",
      "Totalmente asegurados",
      "Especialistas preparación huracanes",
    ],
    whyChooseUsIntro:
      "Most exterior damage in Miami starts small and gets ignored until it becomes a roof leak or a wall framing problem. Catching it at the patch stage costs hundreds. Letting it ride costs thousands.",
    whyChooseUsIntroEs:
      "Casi todo daño exterior en Miami comienza pequeño y se ignora hasta convertirse en gotera o problema estructural. Atraparlo en etapa de parche cuesta cientos. Dejarlo cuesta miles.",
    whyChooseUs: [
      {
        icon: "Storm",
        title: "We Know What Miami Weather Does to Houses",
        titleEs: "Sabemos Qué Le Hace el Clima de Miami a las Casas",
        description:
          "Hurricane wind-driven rain finds every weakness. UV degrades caulk in 18 months. Humidity rots wood faster than the same wood would rot in Atlanta. We diagnose with this in mind.",
        descriptionEs:
          "Lluvia por viento huracanado encuentra cada debilidad. UV degrada calafateo en 18 meses. La humedad pudre madera más rápido que en Atlanta. Diagnosticamos pensando en esto.",
      },
      {
        icon: "Lightning",
        title: "Quick Diagnosis, Honest Scope",
        titleEs: "Diagnóstico Rápido, Alcance Honesto",
        description:
          "We come out, look at the damage, and tell you whether it is a $400 patch or a $4,000 fix. No upselling. Most repairs get a verbal quote on the spot.",
        descriptionEs:
          "Vamos, miramos el daño y te decimos si es parche de $400 o arreglo de $4,000. Sin venta sobre. La mayoría recibe cotización verbal en sitio.",
      },
      {
        icon: "Hammer",
        title: "Stucco Done Right, Not Mud-Smeared",
        titleEs: "Estuco Bien Hecho, No Embarrado",
        description:
          "Cracks get cut out to sound stucco, primed with bonding agent, patched with portland-based stucco repair compound (not just caulk), and textured to match. Most companies just caulk and paint. It fails in 2 years.",
        descriptionEs:
          "Las grietas se cortan hasta estuco sano, se imprima con agente de adhesión, se parchan con compuesto de portland (no solo calafateo) y se texturiza para igualar. La mayoría solo calafatea y pinta. Falla en 2 años.",
      },
      {
        icon: "Leaf",
        title: "Rotted Wood Gets Replaced, Not Filled",
        titleEs: "Madera Podrida Se Reemplaza, No Se Rellena",
        description:
          "If fascia or soffit wood is soft, we cut it out and install new pressure-treated or PVC trim. Wood filler on rotted wood is a 6-month fix that comes back worse.",
        descriptionEs:
          "Si la madera de fascia o sofito está suave, la cortamos y reemplazamos con pressure-treated o moldura de PVC. El relleno en madera podrida es arreglo de 6 meses que vuelve peor.",
      },
      {
        icon: "ShieldCheck",
        title: "Permits When Needed, Honest When Not",
        titleEs: "Permisos Cuando Es Necesario, Honestos Cuando No",
        description:
          "Most exterior repairs are not structural and stay under HB 803 limits. We tell you upfront which jobs need a permit (structural work, flood zone) and which do not (cosmetic stucco, paint, trim).",
        descriptionEs:
          "La mayoría de reparaciones exteriores no son estructurales y se quedan bajo límites HB 803. Te decimos qué necesita permiso (estructural, zona de inundación) y qué no.",
      },
    ],
    processIntro:
      "Most exterior repairs run in five quick steps. We can usually start within the same week.",
    processIntroEs:
      "La mayoría de reparaciones exteriores van en cinco pasos rápidos. Generalmente comenzamos en la misma semana.",
    processSteps: [
      {
        step: 1,
        title: "Site Visit and Diagnosis",
        titleEs: "Visita y Diagnóstico",
        description:
          "Walk the affected area, identify root cause (not just symptom), and write a fixed quote. Most diagnoses take 30 to 45 minutes.",
        descriptionEs:
          "Recorrer área afectada, identificar causa raíz (no solo síntoma) y escribir cotización fija. Mayoría toma 30 a 45 minutos.",
        duration: "Day 0",
        durationEs: "Día 0",
      },
      {
        step: 2,
        title: "Material and Schedule",
        titleEs: "Material y Horario",
        description:
          "Most repairs use stock material we have on the truck or can pick up same day. We schedule the work for the next available dry day.",
        descriptionEs:
          "La mayoría usa material estándar en el camión o disponible el mismo día. Programamos para el próximo día seco disponible.",
        duration: "Day 1",
        durationEs: "Día 1",
      },
      {
        step: 3,
        title: "Demolition of Damaged Material",
        titleEs: "Demolición de Material Dañado",
        description:
          "Cut out cracked stucco. Pull rotten fascia. Remove damaged soffit panels. Expose sound substrate so the repair bonds to something solid.",
        descriptionEs:
          "Cortar estuco agrietado. Sacar fascia podrida. Remover sofito dañado. Exponer sustrato sano para que la reparación se adhiera a algo sólido.",
        duration: "Day 1-2",
        durationEs: "Día 1 al 2",
      },
      {
        step: 4,
        title: "Repair and Match",
        titleEs: "Reparar e Igualar",
        description:
          "New stucco applied and textured to match existing. Fascia replaced with PVC or treated lumber. Soffit panels installed. Painted to match house body or trim.",
        descriptionEs:
          "Estuco nuevo aplicado y texturizado para igualar. Fascia reemplazada con PVC o madera tratada. Paneles de sofito instalados. Pintura para igualar.",
        duration: "Days 2-4",
        durationEs: "Días 2 al 4",
      },
      {
        step: 5,
        title: "Caulk, Seal, and Final Inspection",
        titleEs: "Calafatear, Sellar e Inspección Final",
        description:
          "All transitions sealed with elastomeric caulk. Plant covers and protection removed. We walk the area with you and explain how to spot the next problem early.",
        descriptionEs:
          "Todas las transiciones selladas con calafateo elastomérico. Cubiertas de plantas removidas. Recorrido contigo y explicación de cómo detectar el próximo problema temprano.",
        duration: "Day 5",
        durationEs: "Día 5",
      },
    ],
    materialsIntro:
      "Exterior repair materials get tested by Miami weather. Here is what holds up versus what fails.",
    materialsIntroEs:
      "Los materiales de reparación exterior los prueba el clima de Miami. Esto es lo que aguanta vs. lo que falla.",
    materials: [
      {
        category: "Stucco Repair",
        categoryEs: "Reparación de Estuco",
        name: "QUIKRETE Stucco Patch",
        nameEs: "QUIKRETE Parche de Estuco",
        description:
          "Pre-mixed portland-based patching compound. Good for hairline cracks and small chips. Trowels on, dries in 24 hours, ready for paint.",
        descriptionEs:
          "Compuesto pre-mezclado base portland. Bueno para grietas finas y pequeños chips. Aplicable con llana, seca en 24 horas.",
        priceLevel: "Budget",
      },
      {
        category: "Stucco Repair",
        categoryEs: "Reparación de Estuco",
        name: "DAP Crack Shot Filler",
        nameEs: "DAP Crack Shot",
        description:
          "Elastomeric crack filler for hairline cracks under 1/8 inch. Stretches with the building. Paintable. Used as a primer before texture coat on bigger repairs.",
        descriptionEs:
          "Relleno elastomérico para grietas bajo 1/8 pulgada. Se estira con el edificio. Pintable. Usado como primer antes de capa de textura.",
        priceLevel: "Mid",
      },
      {
        category: "Stucco Repair",
        categoryEs: "Reparación de Estuco",
        name: "Three-Coat Cement Stucco",
        nameEs: "Estuco Cemento de Tres Capas",
        description:
          "For larger damaged areas. Scratch coat, brown coat, and finish coat to match existing texture. Lasts the life of the wall when done right.",
        descriptionEs:
          "Para áreas grandes dañadas. Capa de scratch, capa brown y capa final para igualar textura. Dura la vida del muro bien hecho.",
        priceLevel: "Premium",
      },
      {
        category: "Fascia and Trim",
        categoryEs: "Fascia y Molduras",
        name: "Pressure-Treated Lumber",
        nameEs: "Madera Tratada a Presión",
        description:
          "Standard option for fascia replacement. Lasts 10 to 15 years in Miami. Cheaper than PVC but needs paint to last.",
        descriptionEs:
          "Opción estándar para reemplazo de fascia. Dura 10 a 15 años en Miami. Más barata que PVC pero necesita pintura.",
        priceLevel: "Budget",
      },
      {
        category: "Fascia and Trim",
        categoryEs: "Fascia y Molduras",
        name: "PVC Trim (Azek or Versatex)",
        nameEs: "Moldura PVC (Azek o Versatex)",
        description:
          "Synthetic, will never rot. About 30% more than treated wood but lasts forever. Best value over 20-year horizon.",
        descriptionEs:
          "Sintético, nunca se pudre. 30% más que madera tratada pero dura para siempre. Mejor valor en horizonte de 20 años.",
        priceLevel: "Premium",
      },
      {
        category: "Soffit",
        categoryEs: "Sofito",
        name: "Vinyl Soffit Panels",
        nameEs: "Paneles Sofito de Vinilo",
        description:
          "Standard ventilated vinyl panels. Easy to replace, weather-resistant, decent lifespan. Cheaper than aluminum.",
        descriptionEs:
          "Paneles ventilados de vinilo estándar. Fácil de reemplazar, resistentes, vida útil decente. Más baratos que aluminio.",
        priceLevel: "Budget",
      },
      {
        category: "Soffit",
        categoryEs: "Sofito",
        name: "Aluminum Soffit",
        nameEs: "Sofito de Aluminio",
        description:
          "More rigid, more durable. Better for coastal areas where salt air pits vinyl over time.",
        descriptionEs:
          "Más rígido, más duradero. Mejor en áreas costeras donde el aire salino pica el vinilo.",
        priceLevel: "Premium",
      },
      {
        category: "Caulking",
        categoryEs: "Calafateo",
        name: "DAP Dynaflex 230",
        nameEs: "DAP Dynaflex 230",
        description:
          "Premium acrylic-silicone. Paintable. Lasts 10+ years on stucco-to-trim joints. Our default for most caulk lines.",
        descriptionEs:
          "Acrílico-silicón premium. Pintable. Dura más de 10 años en juntas estuco-moldura.",
        priceLevel: "Mid",
      },
      {
        category: "Caulking",
        categoryEs: "Calafateo",
        name: "OSI Quad Max",
        nameEs: "OSI Quad Max",
        description:
          "Industrial-grade window and door sealant. 40-year lifespan. Used at window perimeters where water intrusion is critical.",
        descriptionEs:
          "Sellador industrial para ventanas y puertas. Vida útil 40 años. Usado en perímetros de ventana donde la intrusión es crítica.",
        priceLevel: "Luxury",
      },
      {
        category: "Waterproofing",
        categoryEs: "Impermeabilización",
        name: "Henry Crack Master Flashing Sealant",
        nameEs: "Sellador Henry Crack Master",
        description:
          "Asphalt-based flashing repair. Used to fix small leaks at roof-wall transitions, around vents, and on flat roof seams.",
        descriptionEs:
          "Reparación de flashing base asfalto. Para fugas pequeñas en transiciones techo-pared, alrededor de ventilas y costuras de techo plano.",
        priceLevel: "Mid",
      },
    ],
    pricingIntro:
      "Most exterior repairs land in three ranges depending on damage scope. We will quote your exact situation.",
    pricingIntroEs:
      "La mayoría de reparaciones exteriores caen en tres rangos según el alcance. Cotizamos tu situación exacta.",
    pricingTiers: [
      {
        name: "Small Patch and Seal",
        nameEs: "Parche y Sellado Pequeño",
        priceRange: "$1,500 - $3,000",
        duration: "1-2 days",
        durationEs: "1 a 2 días",
        includes: [
          "Hairline stucco crack repair (one wall)",
          "Caulk and seal around 2 to 4 windows",
          "Touch-up paint to match",
          "Minor soffit panel replacement",
        ],
        includesEs: [
          "Reparación de grietas finas (una pared)",
          "Calafateo en 2 a 4 ventanas",
          "Pintura de toque para igualar",
          "Reemplazo menor de panel sofito",
        ],
        bestFor:
          "Catching damage early. The right time is before hurricane season. HB 803 territory.",
        bestForEs:
          "Atrapar daño temprano. El momento correcto es antes de temporada de huracanes. Territorio HB 803.",
      },
      {
        name: "Mid-Size Repair",
        nameEs: "Reparación Mediana",
        priceRange: "$3,000 - $6,500",
        duration: "2-4 days",
        durationEs: "2 a 4 días",
        includes: [
          "Multiple wall stucco repairs",
          "Full fascia replacement on one elevation",
          "Soffit panel replacement section",
          "Window perimeter re-caulking (whole house)",
          "Spot painting to match",
        ],
        includesEs: [
          "Reparaciones de estuco en varias paredes",
          "Reemplazo completo de fascia en una elevación",
          "Sección de reemplazo de sofito",
          "Re-calafateo perímetros de ventana (casa)",
          "Pintura de toque para igualar",
        ],
        bestFor:
          "Owners who noticed problems but did not act for a year or two. Damage spread to multiple areas. Still recoverable.",
        bestForEs:
          "Dueños que notaron problemas pero no actuaron por un año o dos. Daño en varias áreas. Aún recuperable.",
      },
      {
        name: "Major Restoration",
        nameEs: "Restauración Mayor",
        priceRange: "$6,500 - $10,000",
        duration: "4-5 days",
        durationEs: "4 a 5 días",
        includes: [
          "Significant stucco area replacement",
          "Full fascia and soffit replacement",
          "Water intrusion remediation",
          "Window flashing redo",
          "Whole-house caulk audit and replacement",
          "Re-paint of repaired areas",
        ],
        includesEs: [
          "Reemplazo significativo de área de estuco",
          "Reemplazo completo de fascia y sofito",
          "Remediación de intrusión de agua",
          "Re-flashing de ventanas",
          "Auditoría y reemplazo de calafateo en toda la casa",
          "Re-pintura de áreas reparadas",
        ],
        bestFor:
          "Homes that have been neglected for years or sustained hurricane damage. Saves the next $20K of work that would come from continued damage.",
        bestForEs:
          "Casas descuidadas por años o con daño de huracán. Ahorra los próximos $20K que vendrían del daño continuado.",
      },
    ],
    projectsIntro:
      "Three recent exterior repair projects in Miami-Dade.",
    projectsIntroEs:
      "Tres proyectos recientes de reparación exterior en Miami-Dade.",
    recentProjects: [
      {
        title: "Pre-Hurricane Stucco and Caulk in Palmetto Bay",
        titleEs: "Estuco y Calafateo Pre-Huracán en Palmetto Bay",
        location: "Palmetto Bay, 33156",
        scope:
          "Sealed 12 stucco hairline cracks, re-caulked 18 window perimeters, replaced one rotted fascia section.",
        scopeEs:
          "Sellamos 12 grietas finas de estuco, re-calafateo de 18 perímetros de ventana, reemplazo de una sección de fascia podrida.",
        duration: "3 working days",
        durationEs: "3 días laborables",
        highlight:
          "Owner called us June 1 worried about hurricane season. We finished before the first named storm. House came through three storms that summer without a leak.",
        highlightEs:
          "El dueño llamó el 1 de junio preocupado. Terminamos antes de la primera tormenta nombrada. La casa pasó tres tormentas sin gotera.",
        imagePlaceholder:
          "/images/services/exterior-repairs/projects/palmetto-bay-hurricane-prep.jpg",
      },
      {
        title: "Major Fascia and Soffit Replacement in Kendall",
        titleEs: "Reemplazo Mayor de Fascia y Sofito en Kendall",
        location: "Kendall, 33186",
        scope:
          "Replaced 80 linear feet of rotted fascia with PVC trim. Replaced all vinyl soffit panels on rear elevation. Sealed and painted.",
        scopeEs:
          "Reemplazamos 80 pies lineales de fascia podrida con PVC. Cambio de paneles sofito en elevación trasera. Sellado y pintado.",
        duration: "4 working days",
        durationEs: "4 días laborables",
        highlight:
          "Owner thought she needed a roof replacement. We diagnosed it as fascia rot causing water entry. Saved her $15K on a roof job she did not need.",
        highlightEs:
          "La dueña pensaba que necesitaba techo nuevo. Diagnosticamos podredumbre de fascia causando entrada de agua. Le ahorramos $15K en un techo que no necesitaba.",
        imagePlaceholder:
          "/images/services/exterior-repairs/projects/kendall-fascia.jpg",
      },
      {
        title: "Water Intrusion Fix in Doral",
        titleEs: "Reparación de Intrusión de Agua en Doral",
        location: "Doral, 33172",
        scope:
          "Located source of interior water staining as failed flashing above master bedroom window. Removed stucco, installed new flashing, patched stucco, re-painted.",
        scopeEs:
          "Localizamos fuente de mancha de agua interior como flashing fallado sobre ventana de dormitorio principal. Removimos estuco, instalamos nuevo flashing, parchamos, repintamos.",
        duration: "2 working days",
        durationEs: "2 días laborables",
        highlight:
          "Three other companies just patched the inside drywall. We found the actual source on the outside. Owner has not seen a stain since.",
        highlightEs:
          "Otras tres empresas solo parcharon el drywall interior. Encontramos la fuente real afuera. La dueña no ha visto manchas desde entonces.",
        imagePlaceholder:
          "/images/services/exterior-repairs/projects/doral-water-intrusion.jpg",
      },
    ],
    testimonials: [
      {
        quote:
          "Called five companies. Three did not call back. One wanted to sell me a whole new roof. Broke & Fixed actually found the real problem and charged a fraction of what the others quoted.",
        quoteEs:
          "Llamé a cinco empresas. Tres no devolvieron la llamada. Una quería venderme un techo nuevo. Broke & Fixed encontró el problema real y cobró una fracción.",
        authorName: "Lourdes M.",
        authorLocation: "Kendall",
        service: "Exterior Repairs",
        rating: 5,
      },
      {
        quote:
          "We had been ignoring cracks for two years. They came out, sealed everything before hurricane season, and saved us from what would have been thousands in interior damage.",
        quoteEs:
          "Habíamos ignorado las grietas por dos años. Vinieron, sellaron todo antes de temporada de huracanes y nos ahorraron miles en daño interior.",
        authorName: "Felipe Q.",
        authorLocation: "Palmetto Bay",
        service: "Exterior Repairs",
        rating: 5,
      },
      {
        quote:
          "They did not try to upsell. Just told us what the problem was, what would fix it, and what we did not need. That kind of honesty is rare.",
        quoteEs:
          "No intentaron vender más. Solo nos dijeron cuál era el problema, qué lo arreglaría y qué no necesitábamos. Esa honestidad es rara.",
        authorName: "Ingrid W.",
        authorLocation: "Doral",
        service: "Exterior Repairs",
        rating: 5,
      },
    ],
  },

  "cabinet-refinishing": {
    heroHeadline: "Cabinet Refinishing That Beats Factory Finishes",
    heroHeadlineEs: "Renovación de Gabinetes Que Supera Acabados de Fábrica",
    heroSubhead:
      "If your boxes are solid wood and the layout works, refinishing gets you a new-looking kitchen for a fraction of the cost. Sprayed lacquer or 2K poly finish lasts 10 to 15 years.",
    heroSubheadEs:
      "Si las cajas son madera sólida y la distribución funciona, renovarlas te da una cocina nueva por fracción del costo. Laca aerosolada o poliuretano 2K dura 10 a 15 años.",
    heroBadges: [
      "10-15 year finish",
      "Fully insured",
      "Save 60-70% vs replacement",
    ],
    heroBadgesEs: [
      "Acabado 10-15 años",
      "Totalmente asegurados",
      "Ahorra 60-70% vs reemplazo",
    ],
    whyChooseUsIntro:
      "Most cabinet 'painting' jobs are roller paint applied at home. They look terrible up close and chip in a year. We do real refinishing with industrial sprayed coatings, the way the factory used to do it.",
    whyChooseUsIntroEs:
      "La mayoría de trabajos de 'pintura de gabinetes' son pintura con rodillo en casa. Se ven mal de cerca y se pelan en un año. Hacemos renovación real con recubrimientos aerosolados industriales.",
    whyChooseUs: [
      {
        icon: "Sparkle",
        title: "Sprayed Finish, Not Brushed or Rolled",
        titleEs: "Acabado Aerosolado, No Brocha o Rodillo",
        description:
          "We use HVLP and air-assisted airless sprayers to apply post-catalyzed lacquer or 2K polyurethane. The finish is glass smooth, no brush marks, no roller stipple. This is how the factory does it.",
        descriptionEs:
          "Usamos pistolas HVLP y airless asistidas por aire para aplicar laca post-catalizada o poliuretano 2K. El acabado es vidrio liso, sin marcas. Así lo hace la fábrica.",
      },
      {
        icon: "Toolbox",
        title: "Doors and Drawers Sprayed Off-Site",
        titleEs: "Puertas y Cajones Aerosolados Fuera de Sitio",
        description:
          "Doors come off and go to our shop where we can control overspray, temperature, and dust. Boxes stay in your kitchen. The result is a perfect factory-grade finish, not a dusty in-place mess.",
        descriptionEs:
          "Las puertas salen y van a nuestro taller donde controlamos sobrespray, temperatura y polvo. Las cajas se quedan en tu cocina. Acabado perfecto grado fábrica.",
      },
      {
        icon: "Medal",
        title: "10 to 15 Year Lifespan",
        titleEs: "Vida Útil 10 a 15 Años",
        description:
          "Post-catalyzed lacquer cured properly is harder than the factory melamine on most new cabinets. We have refinished kitchens in 2014 that still look fresh.",
        descriptionEs:
          "Laca post-catalizada bien curada es más dura que la melamina de fábrica en mayoría de gabinetes nuevos. Hemos renovado cocinas en 2014 que aún se ven nuevas.",
      },
      {
        icon: "Lightning",
        title: "Save 60-70% vs Full Replacement",
        titleEs: "Ahorra 60-70% vs Reemplazo",
        description:
          "A new mid-range kitchen runs $25K to $40K just in cabinets. Refinishing the existing boxes plus new doors if you want them runs $3K to $6K. Same look, much less money.",
        descriptionEs:
          "Una cocina nueva de gama media va de $25K a $40K solo en gabinetes. Renovar las cajas existentes más puertas nuevas si las quieres va de $3K a $6K. Mismo look, mucho menos dinero.",
      },
      {
        icon: "ShieldCheck",
        title: "HB 803 Friendly Always",
        titleEs: "Siempre Compatible HB 803",
        description:
          "Cabinet refinishing is pure cosmetic work. No plumbing, electrical, or structural changes. It always qualifies for the Florida HB 803 permit exemption when total is under $7,500.",
        descriptionEs:
          "La renovación de gabinetes es trabajo puramente cosmético. Sin plomería, electricidad o estructura. Siempre califica para exención HB 803 bajo $7,500.",
      },
    ],
    processIntro:
      "Cabinet refinishing follows six steps. The slowest part is finish cure time. Patience here is the difference between great work and mediocre.",
    processIntroEs:
      "La renovación de gabinetes sigue seis pasos. La parte más lenta es el tiempo de curado. La paciencia aquí es la diferencia.",
    processSteps: [
      {
        step: 1,
        title: "Inspection and Color Selection",
        titleEs: "Inspección y Selección de Color",
        description:
          "We check wood condition, talk through color options (white, two-tone, stain, custom), and write a fixed quote. Samples brought to your home.",
        descriptionEs:
          "Verificamos condición de madera, opciones de color (blanco, dos tonos, tinte, personalizado), cotización fija. Muestras llevadas a tu casa.",
        duration: "Day 0",
        durationEs: "Día 0",
      },
      {
        step: 2,
        title: "Removal and Inventory",
        titleEs: "Remoción e Inventario",
        description:
          "Every door and drawer front gets numbered and removed. Hardware bagged for reinstall. Doors and fronts go to our shop.",
        descriptionEs:
          "Cada puerta y frente de cajón se numera y remueve. Los herrajes se guardan para reinstalar. Las puertas van al taller.",
        duration: "Day 1",
        durationEs: "Día 1",
      },
      {
        step: 3,
        title: "Strip, Sand, Clean",
        titleEs: "Quitar Acabado, Lijar, Limpiar",
        description:
          "Existing finish removed with chemical stripper or sanded to bare wood depending on condition. Wood degreased with TSP or acetone wipe.",
        descriptionEs:
          "Acabado existente removido con químico o lijado hasta madera cruda según condición. Madera desengrasada con TSP o acetona.",
        duration: "Days 2-4",
        durationEs: "Días 2 al 4",
      },
      {
        step: 4,
        title: "Prime and Spray Three Coats",
        titleEs: "Imprimar y Aerosolar Tres Capas",
        description:
          "Adhesion primer first. Then 2 to 3 finish coats of post-catalyzed lacquer or 2K poly with sanding between coats. Boxes done in-place, doors in the shop.",
        descriptionEs:
          "Primer adherente primero. Luego 2 a 3 capas finales de laca post-catalizada o poliuretano 2K con lijado entre capas. Cajas en sitio, puertas en taller.",
        duration: "Days 5-8",
        durationEs: "Días 5 al 8",
      },
      {
        step: 5,
        title: "Cure and Pack",
        titleEs: "Curado y Embalado",
        description:
          "Lacquer cures for 24 to 48 hours before handling. Doors stacked carefully with foam separators for transport.",
        descriptionEs:
          "La laca cura 24 a 48 horas antes de manejarse. Puertas apiladas con separadores de espuma para transporte.",
        duration: "Day 9",
        durationEs: "Día 9",
      },
      {
        step: 6,
        title: "Reinstall and Adjust",
        titleEs: "Reinstalar y Ajustar",
        description:
          "Doors and drawers rehung. Hinges adjusted. New hardware installed if part of the scope. Walkthrough and care instructions.",
        descriptionEs:
          "Puertas y cajones recolocados. Bisagras ajustadas. Herrajes nuevos instalados si está en el alcance. Recorrido e instrucciones.",
        duration: "Day 10",
        durationEs: "Día 10",
      },
    ],
    materialsIntro:
      "Cabinet refinishing materials decide whether the finish lasts 2 years or 15. Here is what we use and what cheap shops use instead.",
    materialsIntroEs:
      "Los materiales de renovación deciden si el acabado dura 2 años o 15. Esto es lo que usamos vs. lo que tiendas baratas usan.",
    materials: [
      {
        category: "Primer",
        categoryEs: "Imprimante",
        name: "INSL-X Cabinet Coat Primer",
        nameEs: "INSL-X Cabinet Coat Primer",
        description:
          "Bonding primer specifically for cabinet refinishing. Sticks to glossy, sanded, or stained surfaces. Good base for waterborne topcoats.",
        descriptionEs:
          "Primer adherente específico para renovación. Se pega a superficies brillantes, lijadas o teñidas. Buena base para acabados a base de agua.",
        priceLevel: "Mid",
      },
      {
        category: "Primer",
        categoryEs: "Imprimante",
        name: "Sherwin-Williams Extreme Bond",
        nameEs: "Sherwin-Williams Extreme Bond",
        description:
          "High-bond primer for difficult surfaces. Used on cabinets with melamine or thermofoil finishes. Allows finish to grip anything.",
        descriptionEs:
          "Primer de alta adhesión para superficies difíciles. Usado en gabinetes con melamina o thermofoil.",
        priceLevel: "Premium",
      },
      {
        category: "Topcoat",
        categoryEs: "Acabado",
        name: "Post-Catalyzed Lacquer",
        nameEs: "Laca Post-Catalizada",
        description:
          "Mixed with hardener at spray time. Cures harder than the original factory finish. Smooth glass appearance. Industry standard for serious cabinet refinishing.",
        descriptionEs:
          "Mezclada con endurecedor al aerosolar. Cura más duro que acabado original de fábrica. Apariencia vidrio liso. Estándar de la industria.",
        priceLevel: "Premium",
      },
      {
        category: "Topcoat",
        categoryEs: "Acabado",
        name: "2K Polyurethane (Sherwin Kem-Aqua Plus)",
        nameEs: "Poliuretano 2K (Sherwin Kem-Aqua Plus)",
        description:
          "Two-component water-based poly. Hardness rivals automotive coatings. Premium finish for high-use kitchens.",
        descriptionEs:
          "Poliuretano 2K base agua. Dureza rival de acabados automotrices. Acabado premium para cocinas de uso intenso.",
        priceLevel: "Luxury",
      },
      {
        category: "Topcoat",
        categoryEs: "Acabado",
        name: "Benjamin Moore Advance",
        nameEs: "Benjamin Moore Advance",
        description:
          "Waterborne alkyd. Sprays beautifully. Good mid-tier option that does not need catalyst. Cures slower (30 days to full hardness) but easier to recoat later.",
        descriptionEs:
          "Alkyd base agua. Se aerosola bien. Buena opción gama media sin catalizador. Cura más lento (30 días para dureza total).",
        priceLevel: "Mid",
      },
      {
        category: "Topcoat",
        categoryEs: "Acabado",
        name: "Latex Enamel",
        nameEs: "Esmalte Latex",
        description:
          "Cheap option. Some companies use this and call it 'cabinet painting.' Lifespan 1 to 2 years before chipping. We do not recommend it.",
        descriptionEs:
          "Opción barata. Algunas empresas la usan y la llaman 'pintura de gabinetes.' Vida útil 1 a 2 años antes de pelar. No la recomendamos.",
        priceLevel: "Budget",
      },
      {
        category: "Color Options",
        categoryEs: "Opciones de Color",
        name: "Classic White (BM Simply White / SW Pure White)",
        nameEs: "Blanco Clásico (BM Simply White / SW Pure White)",
        description:
          "Our most-requested color. Bright, clean, makes any kitchen feel bigger. Easiest to keep looking good over years.",
        descriptionEs:
          "Nuestro color más solicitado. Brillante, limpio, hace cualquier cocina más grande. Más fácil de mantener bien.",
        priceLevel: "Mid",
      },
      {
        category: "Color Options",
        categoryEs: "Opciones de Color",
        name: "Two-Tone (Upper Light, Lower Dark)",
        nameEs: "Dos Tonos (Superior Claro, Inferior Oscuro)",
        description:
          "Modern look. Upper cabinets white or light gray, lower cabinets navy, charcoal, or deep green. Often paired with new hardware.",
        descriptionEs:
          "Look moderno. Superiores blanco o gris claro, inferiores azul marino, carbón o verde profundo. Frecuentemente con herrajes nuevos.",
        priceLevel: "Premium",
      },
      {
        category: "Color Options",
        categoryEs: "Opciones de Color",
        name: "Stain Refresh (Wood Cabinets)",
        nameEs: "Refresco de Tinte (Gabinetes de Madera)",
        description:
          "Keep the wood look but change tone. Strip old stain, apply new color, seal with conversion varnish. Best for owners who love wood grain.",
        descriptionEs:
          "Mantener look de madera pero cambiar tono. Quitar tinte viejo, aplicar nuevo color, sellar con barniz de conversión.",
        priceLevel: "Premium",
      },
      {
        category: "New Doors",
        categoryEs: "Puertas Nuevas",
        name: "Replacement Shaker Doors",
        nameEs: "Puertas de Reemplazo Estilo Shaker",
        description:
          "When existing doors are damaged or you want a different style, we order paint-grade MDF shaker doors and finish them with the same lacquer system as the boxes.",
        descriptionEs:
          "Cuando las puertas existentes están dañadas o quieres otro estilo, ordenamos puertas shaker MDF grado pintura y las acabamos con el mismo sistema.",
        priceLevel: "Premium",
      },
    ],
    pricingIntro:
      "Cabinet refinishing pricing is mostly per door/drawer front count. Three tiers by kitchen size.",
    pricingIntroEs:
      "El precio se basa mayormente en cantidad de puertas/frentes. Tres niveles por tamaño de cocina.",
    pricingTiers: [
      {
        name: "Small Kitchen",
        nameEs: "Cocina Pequeña",
        priceRange: "$2,400 - $3,500",
        duration: "5-7 working days",
        durationEs: "5 a 7 días laborables",
        includes: [
          "Up to 15 door and drawer fronts",
          "Strip, sand, prime, spray 2 coats",
          "Single solid color",
          "Existing hardware reinstalled",
        ],
        includesEs: [
          "Hasta 15 frentes de puertas y cajones",
          "Quitar acabado, lijar, primer, 2 capas",
          "Color sólido único",
          "Herrajes existentes reinstalados",
        ],
        bestFor:
          "Galley kitchens and small apartment kitchens. Always HB 803 exempt. Fastest cosmetic transformation.",
        bestForEs:
          "Cocinas galera y de apartamentos. Siempre exento HB 803. Transformación cosmética más rápida.",
      },
      {
        name: "Standard Kitchen",
        nameEs: "Cocina Estándar",
        priceRange: "$3,500 - $4,800",
        duration: "7-9 working days",
        durationEs: "7 a 9 días laborables",
        includes: [
          "16 to 28 door and drawer fronts",
          "Strip, sand, prime, spray 3 coats",
          "Single color or two-tone option",
          "New hardware installed (homeowner supplied)",
          "Interior of cabinets cleaned",
        ],
        includesEs: [
          "16 a 28 frentes de puertas y cajones",
          "Quitar acabado, lijar, primer, 3 capas",
          "Color único u opción dos tonos",
          "Herrajes nuevos instalados (suministrados)",
          "Interior de gabinetes limpiado",
        ],
        bestFor:
          "Most Miami kitchens in 1,500-2,000 sq ft homes. The most common scope we quote.",
        bestForEs:
          "La mayoría de cocinas Miami en hogares de 1,500-2,000 pies cuadrados. El alcance más común.",
      },
      {
        name: "Large or Premium Kitchen",
        nameEs: "Cocina Grande o Premium",
        priceRange: "$4,800 - $5,500",
        duration: "8-10 working days",
        durationEs: "8 a 10 días laborables",
        includes: [
          "30+ door and drawer fronts or new replacement doors",
          "2K polyurethane finish",
          "Two-tone or custom color match",
          "Some new doors to replace damaged",
          "New hardware (supplied by us)",
          "Pantry and island included",
        ],
        includesEs: [
          "Más de 30 frentes o puertas nuevas de reemplazo",
          "Acabado poliuretano 2K",
          "Dos tonos o color personalizado",
          "Algunas puertas nuevas para reemplazar dañadas",
          "Herrajes nuevos (suministrados)",
          "Despensa e isla incluidas",
        ],
        bestFor:
          "Larger Coral Gables and Pinecrest kitchens. Owners who want a custom designer look at a fraction of replacement cost.",
        bestForEs:
          "Cocinas más grandes en Coral Gables y Pinecrest. Dueños que quieren look de diseñador a fracción del costo de reemplazo.",
      },
    ],
    projectsIntro:
      "Three recent cabinet refinishing projects we have completed.",
    projectsIntroEs:
      "Tres proyectos recientes de renovación de gabinetes completados.",
    recentProjects: [
      {
        title: "White Refresh in The Hammocks",
        titleEs: "Renovación Blanca en The Hammocks",
        location: "The Hammocks, 33196",
        scope:
          "22 doors, 9 drawer fronts, single white color (BM Simply White), brushed nickel hardware reused.",
        scopeEs:
          "22 puertas, 9 frentes de cajón, color blanco único (BM Simply White), herrajes níquel cepillado reutilizados.",
        duration: "7 working days",
        durationEs: "7 días laborables",
        highlight:
          "Owner got a $32K cabinet replacement quote. We did refinishing for $3,800. Same visual transformation. Stayed inside HB 803 with $300 to spare.",
        highlightEs:
          "El dueño tuvo cotización de reemplazo por $32K. Hicimos renovación por $3,800. Misma transformación visual. Dentro de HB 803 con $300 de margen.",
        imagePlaceholder:
          "/images/services/cabinet-refinishing/projects/hammocks-white.jpg",
      },
      {
        title: "Two-Tone in Cutler Bay",
        titleEs: "Dos Tonos en Cutler Bay",
        location: "Cutler Bay, 33157",
        scope:
          "Uppers in BM White Dove, lowers in SW Naval, 26 fronts total, new black hardware.",
        scopeEs:
          "Superiores en BM White Dove, inferiores en SW Naval, 26 frentes en total, herrajes nuevos negros.",
        duration: "9 working days",
        durationEs: "9 días laborables",
        highlight:
          "Owner wanted a Pinterest kitchen on a real budget. Came in at $5,200. Most-photographed kitchen of the year for us.",
        highlightEs:
          "La dueña quería cocina de Pinterest con presupuesto real. Vino a $5,200. La cocina más fotografiada del año.",
        imagePlaceholder:
          "/images/services/cabinet-refinishing/projects/cutler-bay-two-tone.jpg",
      },
      {
        title: "Stain Refresh in Coconut Grove",
        titleEs: "Refresco de Tinte en Coconut Grove",
        location: "Coconut Grove, 33133",
        scope:
          "Original 1995 oak cabinets stripped, restained darker walnut, sealed with conversion varnish. 32 fronts.",
        scopeEs:
          "Gabinetes originales de roble 1995 desnudados, reteñidos a nogal oscuro, sellados con barniz de conversión. 32 frentes.",
        duration: "10 working days",
        durationEs: "10 días laborables",
        highlight:
          "Owner had inherited the house and wanted to keep the wood. We darkened the tone, modernized hardware, and the kitchen went from dated 90s to warm contemporary. $5,400 total.",
        highlightEs:
          "El dueño heredó la casa y quería conservar la madera. Oscurecimos el tono, modernizamos herrajes y la cocina pasó de 90s a contemporáneo cálido. $5,400 total.",
        imagePlaceholder:
          "/images/services/cabinet-refinishing/projects/coconut-grove-stain.jpg",
      },
    ],
    testimonials: [
      {
        quote:
          "We were going to spend $32K on new cabinets. Broke & Fixed talked us into refinishing and it cost us $3,800. The result is identical to brand new. Real money saved.",
        quoteEs:
          "Íbamos a gastar $32K en gabinetes nuevos. Broke & Fixed nos convenció de renovar y costó $3,800. El resultado es idéntico a nuevo. Dinero real ahorrado.",
        authorName: "Tamara H.",
        authorLocation: "The Hammocks",
        service: "Cabinet Refinishing",
        rating: 5,
      },
      {
        quote:
          "They sprayed the doors in their shop and brought them back perfect. No paint smell in the house, no overspray, no mess. Most cabinet painters do the doors on a tarp in your driveway. Big difference.",
        quoteEs:
          "Aerosolaron las puertas en su taller y las trajeron perfectas. Sin olor a pintura en la casa, sin sobrespray, sin desorden. Mayoría hacen las puertas en lona en tu entrada. Gran diferencia.",
        authorName: "Marcos B.",
        authorLocation: "Cutler Bay",
        service: "Cabinet Refinishing",
        rating: 5,
      },
      {
        quote:
          "Took them under HB 803. Total job was $5,400. No permit, no inspector, ten working days. Could not be happier.",
        quoteEs:
          "Lo hicieron bajo HB 803. Total $5,400. Sin permiso, sin inspector, diez días laborables. No podríamos estar más felices.",
        authorName: "Natasha J.",
        authorLocation: "Coconut Grove",
        service: "Cabinet Refinishing",
        rating: 5,
      },
    ],
  },
}
