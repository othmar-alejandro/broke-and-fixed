import { Metadata } from "next"
import Link from "next/link"
import {
  Phone,
  ShieldCheck,
  CurrencyDollar,
  Timer,
  Shower,
  CheckCircle,
  CaretDown,
  ArrowRight,
  Star,
  Users,
  MapPin,
  Bathtub,
  Lightbulb,
  Wrench,
  Drop,
  ThermometerHot,
  Lamp,
  Armchair,
} from "@phosphor-icons/react/dist/ssr"
import JsonLd from "@/components/seo/JsonLd"
import Breadcrumbs from "@/components/seo/Breadcrumbs"

const siteUrl = "https://brokeandfixed.com"

/* ========================================================================== */
/*  Static params                                                              */
/* ========================================================================== */

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "es" }]
}

/* ========================================================================== */
/*  Metadata                                                                   */
/* ========================================================================== */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const isEs = locale === "es"

  const title = isEs
    ? "Remodelacion de Bano Premium en Miami | Desde $8K | Broke & Fixed"
    : "Premium Bathroom Remodel Miami | From $8K | Broke & Fixed Home Solutions"

  const description = isEs
    ? "Un bano que parece de $50,000 por mucho menos. Duchas abiertas con vidrio, azulejo de gran formato, vanidades flotantes. Desde $8K. Empresa familiar, completamente asegurada. (786) 363-7039."
    : "A bathroom that looks like it cost $50,000. For way less. Walk-in showers, frameless glass, large format tile, floating vanities. Starting at $8K. Family owned, fully insured. (786) 363-7039."

  const enUrl = `${siteUrl}/en/premium-bathroom`
  const esUrl = `${siteUrl}/es/premium-bathroom`

  return {
    title,
    description,
    keywords: [
      "premium bathroom remodel Miami",
      "luxury bathroom remodeling Miami",
      "bathroom renovation Miami",
      "walk-in shower Miami",
      "bathroom remodel cost Miami",
      "frameless glass shower Miami",
      "bathroom remodel Kendall",
      "bathroom remodel Miami-Dade",
      "modern bathroom renovation",
      "affordable luxury bathroom Miami",
    ],
    openGraph: {
      title,
      description,
      type: "website",
      url: isEs ? esUrl : enUrl,
      siteName: "Broke & Fixed Home Solutions",
      locale: isEs ? "es_US" : "en_US",
      alternateLocale: isEs ? "en_US" : "es_US",
      images: [
        {
          url: `${siteUrl}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: isEs
            ? "Remodelacion de bano premium en Miami por Broke & Fixed Home Solutions"
            : "Premium bathroom remodel in Miami by Broke & Fixed Home Solutions",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${siteUrl}/og-image.jpg`],
    },
    alternates: {
      canonical: isEs ? esUrl : enUrl,
      languages: {
        en: enUrl,
        es: esUrl,
        "x-default": enUrl,
      },
    },
  }
}

/* ========================================================================== */
/*  Content data                                                               */
/* ========================================================================== */

const content = {
  en: {
    breadcrumbs: [
      { name: "Home", href: "/en" },
      { name: "Bathroom Remodeling", href: "/en/services/bathroom-remodeling" },
      { name: "Premium Bathroom", href: "/en/premium-bathroom" },
    ],
    badge: "Premium Bathroom Remodeling",
    heroHeadline: "A $50,000 Bathroom. Without the $50,000 Price Tag.",
    heroSub:
      "Premium finishes, smart design, and quality craftsmanship. The bathroom you have been dreaming about, at a price that actually makes sense.",
    stats: [
      { value: "$8K-$28K", label: "Typical range" },
      { value: "2-4 Weeks", label: "Average timeline" },
      { value: "Walk-In", label: "Shower conversions" },
      { value: "Insured", label: "Fully covered" },
    ],
    ctaPrimary: "Get Your Free Estimate",
    ctaPhone: "Call (786) 363-7039",

    // Problem section
    problemHeadline: "Your Bathroom Should Not Feel Like a Time Capsule",
    problemSub:
      "Most homeowners think a premium bathroom costs $40K to $50K. It does not have to.",
    painPoints: [
      {
        title: "Outdated tile everywhere",
        desc: "Pink, beige, or baby blue from a decade you would rather forget.",
      },
      {
        title: "Builder-grade everything",
        desc: "Cheap vanity, basic fixtures, and that tub nobody has used in years.",
      },
      {
        title: "Embarrassing for guests",
        desc: "You close the door and hope nobody looks too closely.",
      },
      {
        title: "Sticker shock stops you cold",
        desc: "You looked into it once. The quote scared you off. That was years ago.",
      },
    ],

    // Secret section
    secretHeadline: "How to Get a Premium Bathroom for Half the Price",
    secretSub:
      "The secret is not cutting corners. It is making smarter choices about materials and layout.",
    secrets: [
      {
        title: "Porcelain tile that looks like marble",
        detail: "$8/sqft vs $25/sqft for real marble. Same look. Better durability.",
        highlight: "Save 60% on tile",
      },
      {
        title: "Walk-in shower with frameless glass",
        detail:
          "The single biggest upgrade you can make. Opens up the entire bathroom and adds instant value.",
        highlight: "Biggest impact",
      },
      {
        title: "Floating vanity with quartz top",
        detail:
          "Looks custom. Costs a fraction of true custom cabinetry. Adds floor space and a modern feel.",
        highlight: "Modern look, smart price",
      },
      {
        title: "Rain showerhead and modern fixtures",
        detail:
          "Small cost, huge visual impact. Matte black or brushed gold hardware changes the entire vibe.",
        highlight: "$200-$400 upgrade",
      },
    ],

    // Transformations
    transformHeadline: "Real Projects. Real Prices. Real Results.",
    transformSub:
      "Every project below was completed by our team in Miami-Dade. No stock photos. No inflated numbers.",
    projects: [
      {
        title: "Master Bath Transformation",
        cost: "$16,000",
        looksLike: "Looks like $40K",
        scope: "Full gut. Walk-in shower with frameless glass, large format porcelain tile on floors and walls, floating double vanity with quartz countertop, rain showerhead, recessed niche, new plumbing, LED mirror.",
        result:
          "The homeowner had been putting this off for five years. Now it is the favorite room in the house.",
      },
      {
        title: "Hall Bath Refresh",
        cost: "$11,000",
        looksLike: "Looks like $25K",
        scope: "Tub-to-shower conversion, new tile surround with accent strip, modern vanity with undermount sink, updated plumbing, new lighting and mirror.",
        result:
          "A bathroom the whole family actually wants to use. Completed in under three weeks.",
      },
      {
        title: "Full Gut Remodel",
        cost: "$22,000",
        looksLike: "Looks like $50K",
        scope: "Complete teardown to studs. Layout change, walk-in shower with bench seat, heated floors, double vanity, custom tile pattern, frameless glass, all new plumbing and electrical.",
        result:
          "The kind of bathroom you see in a magazine. Built by a family-owned remodeling team in Kendall.",
      },
    ],

    // What's included
    includedHeadline: "What Is Included in Every Project",
    includedSub: "No surprises. No hidden fees. This is what you get.",
    included: [
      "Full demo and disposal",
      "Custom tile installation (floors, walls, shower)",
      "Walk-in shower conversion with frameless glass",
      "New vanity, countertop, mirror, and lighting",
      "Plumbing upgrades",
      "Waterproofing on all wet areas",
      "Final inspection and cleanup",
    ],

    // Premium upgrades
    upgradesHeadline: "Premium Upgrades That Make the Difference",
    upgradesSub:
      "These small add-ons are what separate a good bathroom from a great one.",
    upgrades: [
      { name: "Heated floors", price: "$800 - $1,200", icon: "thermometer" },
      { name: "Rain showerhead", price: "$200 - $400", icon: "drop" },
      { name: "Recessed shower niches", price: "$150 - $300 each", icon: "lamp" },
      { name: "LED mirror", price: "$250 - $500", icon: "lightbulb" },
      { name: "Bench seating in shower", price: "$400 - $800", icon: "armchair" },
    ],

    // Process
    processHeadline: "How It Works",
    processSub: "We handle everything. You just pick your finishes.",
    steps: [
      {
        week: "Week 1",
        title: "Demo + Plumbing",
        desc: "We tear out the old bathroom and rough in new plumbing lines. The messy part is over fast.",
      },
      {
        week: "Week 2",
        title: "Tile Installation",
        desc: "Floors, walls, shower surround. This is where the transformation starts to take shape.",
      },
      {
        week: "Week 3",
        title: "Vanity + Fixtures",
        desc: "Vanity install, countertop, mirror, lighting, and all fixture connections.",
      },
      {
        week: "Week 4",
        title: "Finishing Touches",
        desc: "Glass installation, hardware, caulking, grout sealing, final cleanup, and walkthrough.",
      },
    ],

    // FAQ
    faqHeadline: "Common Questions",
    faqs: [
      {
        q: "How much does a premium bathroom remodel cost in Miami?",
        a: "Most of our premium bathroom remodels in Miami-Dade fall between $8,000 and $28,000. The final price depends on the size of the bathroom, the materials you choose, and whether you are doing a cosmetic refresh or a full gut remodel. A standard master bath with walk-in shower, frameless glass, new tile, and a floating vanity typically lands between $14,000 and $20,000. We provide a detailed written estimate before any work begins, so there are no surprises.",
      },
      {
        q: "How long does a bathroom renovation take?",
        a: "Most bathroom remodels take two to four weeks from demo to final walkthrough. A smaller hall bath refresh can be done in about two weeks. A full gut remodel with layout changes, heated floors, and custom tile work usually takes closer to four weeks. We build a day-by-day schedule before we start, so you know exactly what is happening and when.",
      },
      {
        q: "Can you make porcelain tile look like real marble?",
        a: "Yes. Modern porcelain tile has come a long way. The large format porcelain slabs we use have realistic veining, depth, and texture that closely mimic natural marble. The big advantage is durability. Porcelain does not stain, does not need sealing, and costs about 60% less than real marble. Most visitors will not be able to tell the difference.",
      },
      {
        q: "Do you handle the plumbing?",
        a: "We handle all plumbing work that is part of the bathroom remodel. That includes moving drain lines for shower conversions, installing new supply lines, connecting fixtures, and setting up new valves. If a project requires a major reroute or tie-in to the main line, we coordinate with a plumbing specialist to make sure everything is done right and to code.",
      },
      {
        q: "What areas do you serve?",
        a: "We serve 17 communities across Miami-Dade County, including Kendall, West Kendall, Palmetto Bay, Doral, The Hammocks, The Crossings, Kendale Lakes, Sweetwater, Cutler Bay, Pinecrest, South Miami, South Miami Heights, Miami Gardens, Westchester, Coral Gables, Country Walk, and Coconut Grove. Our team is based in Kendall, so most jobs are within a short drive.",
      },
      {
        q: "Are you insured?",
        a: "Yes. Broke and Fixed Home Solutions carries general liability insurance. We are a family-owned remodeling company that has been serving Miami-Dade for years. We can provide proof of insurance before any project begins. Your home is protected from day one.",
      },
      {
        q: "What if I want to keep my tub?",
        a: "That is completely fine. Not every bathroom needs a walk-in shower. If you want to keep your tub, we can retile the surround, update the fixtures, add a new faucet and hardware, and make it look brand new. We design around what works for your household, not a one-size-fits-all template.",
      },
      {
        q: "Do I need to pick out all the materials myself?",
        a: "No. We help you choose everything. During the planning phase, we show you material options in your price range and explain the trade-offs. Most homeowners appreciate the guidance because there are a lot of choices out there. You make the final call on every finish, color, and fixture. We just make the process easier.",
      },
    ],

    // Final CTA
    ctaHeadline: "Your Dream Bathroom Is Closer Than You Think",
    ctaSub:
      "Free estimates. No pressure. Just a straight conversation about what is possible in your budget.",
    trustBadges: ["Fully Insured", "Family Owned", "17 Miami-Dade Communities"],
  },
  es: {
    breadcrumbs: [
      { name: "Inicio", href: "/es" },
      { name: "Remodelacion de Banos", href: "/es/services/remodelacion-de-banos" },
      { name: "Bano Premium", href: "/es/premium-bathroom" },
    ],
    badge: "Remodelacion de Bano Premium",
    heroHeadline: "Un Bano de $50,000. Sin el Precio de $50,000.",
    heroSub:
      "Acabados premium, diseno inteligente y mano de obra de calidad. El bano que siempre sonaste, a un precio que tiene sentido.",
    stats: [
      { value: "$8K-$28K", label: "Rango tipico" },
      { value: "2-4 Semanas", label: "Tiempo promedio" },
      { value: "Ducha Abierta", label: "Conversiones" },
      { value: "Asegurada", label: "Completamente" },
    ],
    ctaPrimary: "Pide Tu Estimado Gratis",
    ctaPhone: "Llama (786) 363-7039",

    problemHeadline: "Tu Bano No Deberia Sentirse Como Una Capsula del Tiempo",
    problemSub:
      "La mayoria de los duenos de casa piensan que un bano premium cuesta entre $40K y $50K. No tiene que ser asi.",
    painPoints: [
      {
        title: "Azulejo viejo por todas partes",
        desc: "Rosado, beige o azul de una decada que preferirias olvidar.",
      },
      {
        title: "Todo de calidad basica",
        desc: "Vanidad barata, accesorios basicos y esa banera que nadie usa.",
      },
      {
        title: "Verguenza cuando llegan visitas",
        desc: "Cierras la puerta y esperas que nadie mire demasiado.",
      },
      {
        title: "El precio te paraliza",
        desc: "Preguntaste una vez. La cotizacion te asusto. Eso fue hace anos.",
      },
    ],

    secretHeadline: "Como Obtener un Bano Premium por la Mitad del Precio",
    secretSub:
      "El secreto no es recortar esquinas. Es tomar decisiones inteligentes sobre materiales y diseno.",
    secrets: [
      {
        title: "Porcelanato que parece marmol",
        detail:
          "$8/pie cuadrado vs $25/pie cuadrado por marmol real. Mismo look. Mejor durabilidad.",
        highlight: "Ahorra 60% en azulejo",
      },
      {
        title: "Ducha abierta con vidrio sin marco",
        detail:
          "La mejora mas grande que puedes hacer. Abre todo el espacio y agrega valor instantaneo.",
        highlight: "Mayor impacto",
      },
      {
        title: "Vanidad flotante con tope de cuarzo",
        detail:
          "Parece hecha a medida. Cuesta una fraccion de la ebanisteria personalizada. Agrega espacio y un look moderno.",
        highlight: "Look moderno, precio inteligente",
      },
      {
        title: "Regadera tipo lluvia y accesorios modernos",
        detail:
          "Poco costo, gran impacto visual. Negro mate o dorado cepillado cambia toda la vibra.",
        highlight: "Mejora de $200-$400",
      },
    ],

    transformHeadline: "Proyectos Reales. Precios Reales. Resultados Reales.",
    transformSub:
      "Cada proyecto fue completado por nuestro equipo en Miami-Dade. Sin fotos de stock. Sin numeros inflados.",
    projects: [
      {
        title: "Transformacion de Bano Principal",
        cost: "$16,000",
        looksLike: "Parece de $40K",
        scope: "Demolicion total. Ducha abierta con vidrio sin marco, porcelanato de gran formato en pisos y paredes, vanidad doble flotante con tope de cuarzo, regadera tipo lluvia, nicho empotrado, plomeria nueva, espejo LED.",
        result:
          "El dueno habia pospuesto esto por cinco anos. Ahora es su habitacion favorita de la casa.",
      },
      {
        title: "Renovacion de Bano de Pasillo",
        cost: "$11,000",
        looksLike: "Parece de $25K",
        scope: "Conversion de banera a ducha, nuevo azulejo con franja decorativa, vanidad moderna con lavamanos empotrado, plomeria actualizada, nueva iluminacion y espejo.",
        result:
          "Un bano que toda la familia quiere usar. Completado en menos de tres semanas.",
      },
      {
        title: "Remodelacion Completa",
        cost: "$22,000",
        looksLike: "Parece de $50K",
        scope: "Demolicion hasta los montantes. Cambio de distribucion, ducha abierta con banco, pisos calefaccionados, doble vanidad, patron de azulejo personalizado, vidrio sin marco, plomeria y electricidad nueva.",
        result:
          "El tipo de bano que ves en una revista. Construido por una empresa familiar en Kendall.",
      },
    ],

    includedHeadline: "Que Esta Incluido en Cada Proyecto",
    includedSub: "Sin sorpresas. Sin cargos ocultos. Esto es lo que recibes.",
    included: [
      "Demolicion completa y desalojo",
      "Instalacion de azulejo personalizada (pisos, paredes, ducha)",
      "Conversion a ducha abierta con vidrio sin marco",
      "Vanidad nueva, tope, espejo e iluminacion",
      "Mejoras de plomeria",
      "Impermeabilizacion en todas las areas mojadas",
      "Inspeccion final y limpieza",
    ],

    upgradesHeadline: "Mejoras Premium Que Hacen la Diferencia",
    upgradesSub:
      "Estos pequenos extras son lo que separan un bano bueno de uno increible.",
    upgrades: [
      { name: "Pisos calefaccionados", price: "$800 - $1,200", icon: "thermometer" },
      { name: "Regadera tipo lluvia", price: "$200 - $400", icon: "drop" },
      { name: "Nichos empotrados en ducha", price: "$150 - $300 c/u", icon: "lamp" },
      { name: "Espejo LED", price: "$250 - $500", icon: "lightbulb" },
      { name: "Banco en la ducha", price: "$400 - $800", icon: "armchair" },
    ],

    processHeadline: "Como Funciona",
    processSub: "Nosotros nos encargamos de todo. Tu solo eliges los acabados.",
    steps: [
      {
        week: "Semana 1",
        title: "Demolicion + Plomeria",
        desc: "Sacamos el bano viejo e instalamos las nuevas lineas de plomeria. La parte sucia termina rapido.",
      },
      {
        week: "Semana 2",
        title: "Instalacion de Azulejo",
        desc: "Pisos, paredes, area de ducha. Aqui es donde la transformacion empieza a tomar forma.",
      },
      {
        week: "Semana 3",
        title: "Vanidad + Accesorios",
        desc: "Instalacion de vanidad, tope, espejo, iluminacion y conexion de todos los accesorios.",
      },
      {
        week: "Semana 4",
        title: "Toques Finales",
        desc: "Instalacion de vidrio, hardware, calafateo, sellado de lechada, limpieza final y recorrido.",
      },
    ],

    faqHeadline: "Preguntas Frecuentes",
    faqs: [
      {
        q: "Cuanto cuesta una remodelacion de bano premium en Miami?",
        a: "La mayoria de nuestras remodelaciones de bano premium en Miami-Dade estan entre $8,000 y $28,000. El precio final depende del tamano del bano, los materiales que elijas y si es una renovacion cosmetica o una remodelacion completa. Un bano principal estandar con ducha abierta, vidrio sin marco, azulejo nuevo y vanidad flotante tipicamente cuesta entre $14,000 y $20,000. Proporcionamos un estimado detallado por escrito antes de que comience cualquier trabajo.",
      },
      {
        q: "Cuanto tiempo toma una renovacion de bano?",
        a: "La mayoria de las remodelaciones de bano toman de dos a cuatro semanas desde la demolicion hasta el recorrido final. Un bano de pasillo mas pequeno puede completarse en unas dos semanas. Una remodelacion completa con cambios de distribucion, pisos calefaccionados y trabajo de azulejo personalizado usualmente toma cerca de cuatro semanas. Creamos un calendario dia a dia antes de comenzar.",
      },
      {
        q: "Pueden hacer que el porcelanato parezca marmol real?",
        a: "Si. El porcelanato moderno ha avanzado mucho. Las losas de porcelanato de gran formato que usamos tienen vetas realistas, profundidad y textura que imitan el marmol natural. La gran ventaja es la durabilidad. El porcelanato no se mancha, no necesita sellado y cuesta aproximadamente 60% menos que el marmol real. La mayoria de los visitantes no podran notar la diferencia.",
      },
      {
        q: "Se encargan de la plomeria?",
        a: "Nos encargamos de toda la plomeria que es parte de la remodelacion del bano. Eso incluye mover lineas de desague para conversiones de ducha, instalar nuevas lineas de suministro, conectar accesorios y configurar nuevas valvulas. Si un proyecto requiere un redireccionamiento mayor, coordinamos con un especialista en plomeria para asegurar que todo este bien hecho.",
      },
      {
        q: "Que areas sirven?",
        a: "Servimos 17 comunidades en Miami-Dade County, incluyendo Kendall, West Kendall, Palmetto Bay, Doral, The Hammocks, The Crossings, Kendale Lakes, Sweetwater, Cutler Bay, Pinecrest, South Miami, South Miami Heights, Miami Gardens, Westchester, Coral Gables, Country Walk y Coconut Grove. Nuestro equipo esta basado en Kendall.",
      },
      {
        q: "Estan asegurados?",
        a: "Si. Broke and Fixed Home Solutions tiene seguro de responsabilidad general. Somos una empresa familiar de remodelacion que ha servido a Miami-Dade por anos. Podemos proporcionar prueba de seguro antes de que comience cualquier proyecto. Tu hogar esta protegido desde el dia uno.",
      },
      {
        q: "Que pasa si quiero mantener mi banera?",
        a: "Eso esta perfectamente bien. No todos los banos necesitan una ducha abierta. Si quieres mantener tu banera, podemos poner nuevo azulejo alrededor, actualizar los accesorios, agregar un grifo y hardware nuevos, y hacer que se vea como nueva. Disenamos alrededor de lo que funciona para tu hogar.",
      },
      {
        q: "Tengo que escoger todos los materiales yo mismo?",
        a: "No. Te ayudamos a elegir todo. Durante la fase de planificacion, te mostramos opciones de materiales en tu rango de precio y explicamos las ventajas y desventajas. La mayoria de los duenos de casa aprecian la guia porque hay muchas opciones. Tu tomas la decision final sobre cada acabado, color y accesorio. Nosotros solo hacemos el proceso mas facil.",
      },
    ],

    ctaHeadline: "Tu Bano Sonado Esta Mas Cerca de Lo Que Piensas",
    ctaSub:
      "Estimados gratis. Sin presion. Solo una conversacion directa sobre lo que es posible dentro de tu presupuesto.",
    trustBadges: [
      "Completamente Asegurada",
      "Empresa Familiar",
      "17 Comunidades en Miami-Dade",
    ],
  },
}

/* ========================================================================== */
/*  Upgrade icon component                                                     */
/* ========================================================================== */

function UpgradeIcon({ icon }: { icon: string }) {
  const cls = "text-sage-muted"
  const size = 28
  switch (icon) {
    case "thermometer":
      return <ThermometerHot size={size} weight="duotone" className={cls} />
    case "drop":
      return <Drop size={size} weight="duotone" className={cls} />
    case "lamp":
      return <Lamp size={size} weight="duotone" className={cls} />
    case "lightbulb":
      return <Lightbulb size={size} weight="duotone" className={cls} />
    case "armchair":
      return <Armchair size={size} weight="duotone" className={cls} />
    default:
      return <Star size={size} weight="duotone" className={cls} />
  }
}

/* ========================================================================== */
/*  Page component                                                             */
/* ========================================================================== */

export default async function PremiumBathroomPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const isEs = locale === "es"
  const t = isEs ? content.es : content.en

  /* ---------- JSON-LD schemas ---------- */

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: isEs
      ? "Remodelacion de Bano Premium"
      : "Premium Bathroom Remodeling",
    description: isEs
      ? "Remodelacion de bano premium en Miami-Dade. Duchas abiertas, vidrio sin marco, vanidades flotantes, azulejo de gran formato. Desde $8,000."
      : "Premium bathroom remodeling in Miami-Dade. Walk-in showers, frameless glass, floating vanities, large format tile. Starting at $8,000.",
    provider: {
      "@type": "HomeAndConstructionBusiness",
      "@id": `${siteUrl}/#business`,
      name: "Broke & Fixed Home Solutions",
      telephone: "+1-786-363-7039",
      email: "brokeandfixed305@gmail.com",
      url: siteUrl,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Kendall",
        addressRegion: "FL",
        postalCode: "33186",
        addressCountry: "US",
      },
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Miami-Dade County",
    },
    serviceType: "Bathroom Remodeling",
    offers: {
      "@type": "AggregateOffer",
      lowPrice: "8000",
      highPrice: "28000",
      priceCurrency: "USD",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Premium Bathroom Remodeling Services",
      itemListElement: [
        "Walk-In Shower Conversion",
        "Frameless Glass Installation",
        "Custom Tile Installation",
        "Floating Vanity Installation",
        "Plumbing Upgrades",
        "Heated Floor Installation",
      ].map((name) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name },
      })),
    },
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: t.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: t.breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.href}`,
    })),
  }

  /* ---------- Render ---------- */

  return (
    <main className="min-h-screen">
      {/* Schema markup */}
      <JsonLd data={serviceSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbSchema} />

      {/* ================================================================== */}
      {/*  SECTION 1: HERO                                                    */}
      {/* ================================================================== */}
      <section className="bg-espresso text-white">
        <div className="max-w-6xl mx-auto px-4 pt-6 pb-16 md:pb-24">
          <Breadcrumbs items={t.breadcrumbs} />

          <div className="pt-10 md:pt-16 max-w-4xl">
            {/* Badge */}
            <div className="flex items-center gap-2 text-sage-muted font-accent text-sm font-semibold uppercase tracking-widest mb-5">
              <Bathtub size={18} weight="bold" />
              <span>{t.badge}</span>
            </div>

            {/* Headline */}
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[0.95] tracking-tight mb-6">
              {t.heroHeadline}
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-white/70 leading-relaxed mb-10 max-w-2xl">
              {t.heroSub}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <a
                href="tel:7863637039"
                className="inline-flex items-center justify-center gap-2 bg-sage-muted text-white font-display font-bold text-lg px-8 py-4 rounded-lg hover:brightness-110 transition-all"
              >
                <Phone size={20} weight="bold" />
                {t.ctaPhone}
              </a>
              <a
                href="#estimate"
                className="inline-flex items-center justify-center gap-2 border-2 border-white/25 text-white font-display font-bold text-lg px-8 py-4 rounded-lg hover:bg-white/10 transition-all"
              >
                <ArrowRight size={20} weight="bold" />
                {t.ctaPrimary}
              </a>
            </div>

            {/* Stats bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {t.stats.map((stat, i) => {
                const icons = [
                  <CurrencyDollar key="d" size={22} weight="bold" className="text-sage-muted" />,
                  <Timer key="t" size={22} weight="bold" className="text-sage-muted" />,
                  <Shower key="s" size={22} weight="bold" className="text-sage-muted" />,
                  <ShieldCheck key="c" size={22} weight="bold" className="text-sage-muted" />,
                ]
                return (
                  <div
                    key={i}
                    className="bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-center"
                  >
                    <div className="flex justify-center mb-2">{icons[i]}</div>
                    <div className="font-display text-2xl font-bold text-white">
                      {stat.value}
                    </div>
                    <div className="text-xs text-white/50 font-accent uppercase tracking-wider mt-1">
                      {stat.label}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/*  SECTION 2: PROBLEM                                                 */}
      {/* ================================================================== */}
      <section className="bg-cream">
        <div className="max-w-6xl mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-espresso leading-tight mb-4">
              {t.problemHeadline}
            </h2>
            <p className="text-warm-gray text-lg">{t.problemSub}</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {t.painPoints.map((point, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-6 border border-warm-gray-lighter/40 shadow-sm"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">
                    <span className="text-red-400 font-display font-bold text-lg">
                      {i + 1}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-espresso mb-1">
                      {point.title}
                    </h3>
                    <p className="text-warm-gray text-sm leading-relaxed">
                      {point.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/*  SECTION 3: THE SECRET                                              */}
      {/* ================================================================== */}
      <section className="bg-sage text-white">
        <div className="max-w-6xl mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4">
              {t.secretHeadline}
            </h2>
            <p className="text-white/65 text-lg">{t.secretSub}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {t.secrets.map((secret, i) => (
              <div
                key={i}
                className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-xl p-6 hover:bg-white/15 transition-colors"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-sage-muted text-white font-display text-sm font-bold">
                    {i + 1}
                  </span>
                  <span className="text-xs font-accent font-semibold uppercase tracking-wider text-sage-muted">
                    {secret.highlight}
                  </span>
                </div>
                <h3 className="font-display text-xl font-bold mb-2">
                  {secret.title}
                </h3>
                <p className="text-white/65 text-sm leading-relaxed">
                  {secret.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/*  SECTION 4: TRANSFORMATIONS                                         */}
      {/* ================================================================== */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-espresso leading-tight mb-4">
              {t.transformHeadline}
            </h2>
            <p className="text-warm-gray text-lg">{t.transformSub}</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {t.projects.map((project, i) => (
              <div
                key={i}
                className="bg-cream rounded-2xl overflow-hidden border border-warm-gray-lighter/40"
              >
                {/* Cost header */}
                <div className="bg-espresso text-white px-6 py-5">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-display text-3xl font-black">
                      {project.cost}
                    </span>
                    <span className="text-xs font-accent font-semibold uppercase tracking-wider text-sage-muted bg-sage-muted/15 px-3 py-1 rounded-full">
                      {project.looksLike}
                    </span>
                  </div>
                  <h3 className="font-display text-lg font-bold text-white/80">
                    {project.title}
                  </h3>
                </div>

                {/* Details */}
                <div className="px-6 py-5">
                  <div className="mb-4">
                    <p className="text-sm text-espresso font-medium uppercase tracking-wider font-accent mb-2">
                      {isEs ? "Alcance" : "Scope"}
                    </p>
                    <p className="text-warm-gray text-sm leading-relaxed">
                      {project.scope}
                    </p>
                  </div>
                  <div className="border-t border-warm-gray-lighter/40 pt-4">
                    <p className="text-sm text-espresso font-medium uppercase tracking-wider font-accent mb-2">
                      {isEs ? "Resultado" : "Result"}
                    </p>
                    <p className="text-warm-gray text-sm leading-relaxed italic">
                      {project.result}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/*  SECTION 5: WHAT'S INCLUDED                                         */}
      {/* ================================================================== */}
      <section className="bg-cream">
        <div className="max-w-6xl mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-espresso leading-tight mb-4">
              {t.includedHeadline}
            </h2>
            <p className="text-warm-gray text-lg">{t.includedSub}</p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl border border-warm-gray-lighter/40 shadow-sm overflow-hidden">
              {t.included.map((item, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-4 px-6 py-4 ${
                    i < t.included.length - 1
                      ? "border-b border-warm-gray-lighter/30"
                      : ""
                  }`}
                >
                  <CheckCircle
                    size={24}
                    weight="fill"
                    className="flex-shrink-0 text-[#4CAF50]"
                  />
                  <span className="text-espresso font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/*  SECTION 6: PREMIUM UPGRADES                                        */}
      {/* ================================================================== */}
      <section className="bg-espresso text-white">
        <div className="max-w-6xl mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4">
              {t.upgradesHeadline}
            </h2>
            <p className="text-white/60 text-lg">{t.upgradesSub}</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {t.upgrades.map((upgrade, i) => (
              <div
                key={i}
                className="bg-white/5 border border-white/10 rounded-xl px-6 py-5 hover:bg-white/10 transition-colors"
              >
                <div className="mb-3">
                  <UpgradeIcon icon={upgrade.icon} />
                </div>
                <h3 className="font-display text-lg font-bold mb-1">
                  {upgrade.name}
                </h3>
                <p className="text-sage-muted font-accent font-semibold text-sm">
                  {upgrade.price}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/*  SECTION 7: PROCESS / TIMELINE                                      */}
      {/* ================================================================== */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-espresso leading-tight mb-4">
              {t.processHeadline}
            </h2>
            <p className="text-warm-gray text-lg">{t.processSub}</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-4 gap-0">
              {t.steps.map((step, i) => (
                <div key={i} className="relative flex flex-col items-center text-center">
                  {/* Connector line (not on last item) */}
                  {i < t.steps.length - 1 && (
                    <div className="hidden md:block absolute top-7 left-[calc(50%+24px)] right-0 w-[calc(100%-24px)] h-0.5 bg-warm-gray-lighter/50" />
                  )}

                  {/* Step number circle */}
                  <div className="relative z-10 w-14 h-14 rounded-full bg-sage flex items-center justify-center mb-4">
                    <span className="text-white font-display text-xl font-bold">
                      {i + 1}
                    </span>
                  </div>

                  {/* Week label */}
                  <span className="text-xs font-accent font-semibold uppercase tracking-wider text-sage-muted mb-2">
                    {step.week}
                  </span>

                  {/* Title */}
                  <h3 className="font-display text-lg font-bold text-espresso mb-2">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-warm-gray text-sm leading-relaxed px-2 mb-8 md:mb-0">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/*  SECTION 8: FAQ                                                     */}
      {/* ================================================================== */}
      <section id="faq" className="bg-cream">
        <div className="max-w-3xl mx-auto px-4 py-16 md:py-24">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-espresso text-center leading-tight mb-12">
            {t.faqHeadline}
          </h2>

          <div className="space-y-3">
            {t.faqs.map((faq, i) => (
              <details
                key={i}
                className="group bg-white rounded-xl border border-warm-gray-lighter/40 shadow-sm overflow-hidden"
              >
                <summary className="flex items-center justify-between cursor-pointer px-6 py-5 font-display text-lg font-bold text-espresso hover:text-sage transition-colors [&::-webkit-details-marker]:hidden list-none">
                  <span className="pr-4">{faq.q}</span>
                  <CaretDown
                    size={20}
                    weight="bold"
                    className="flex-shrink-0 text-warm-gray group-open:rotate-180 transition-transform"
                  />
                </summary>
                <div className="px-6 pb-6">
                  <p className="text-warm-gray leading-relaxed">{faq.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/*  SECTION 9: FINAL CTA                                              */}
      {/* ================================================================== */}
      <section id="estimate" className="bg-sage text-white">
        <div className="max-w-4xl mx-auto px-4 py-16 md:py-24 text-center">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-6">
            {t.ctaHeadline}
          </h2>
          <p className="text-white/65 text-lg mb-10 max-w-2xl mx-auto">
            {t.ctaSub}
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <a
              href="tel:7863637039"
              className="inline-flex items-center justify-center gap-2 bg-sage-muted text-white font-display font-bold text-lg px-10 py-5 rounded-lg hover:brightness-110 transition-all w-full sm:w-auto"
            >
              <Phone size={22} weight="bold" />
              {t.ctaPhone}
            </a>
            <Link
              href={`/${locale}/services/bathroom-remodeling`}
              className="inline-flex items-center justify-center gap-2 border-2 border-white/25 text-white font-display font-bold text-lg px-10 py-5 rounded-lg hover:bg-white/10 transition-all w-full sm:w-auto"
            >
              <ArrowRight size={20} weight="bold" />
              {isEs ? "Ver todos los servicios de bano" : "See all bathroom services"}
            </Link>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-6">
            {t.trustBadges.map((badge, i) => {
              const badgeIcons = [
                <ShieldCheck key="s" size={20} weight="fill" className="text-sage-muted" />,
                <Users key="u" size={20} weight="fill" className="text-sage-muted" />,
                <MapPin key="m" size={20} weight="fill" className="text-sage-muted" />,
              ]
              return (
                <div
                  key={i}
                  className="flex items-center gap-2 text-white/70 text-sm font-accent font-medium"
                >
                  {badgeIcons[i]}
                  <span>{badge}</span>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </main>
  )
}
