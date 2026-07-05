import { Metadata } from "next"
import {
  Phone,
  CheckCircle,
  PaintBrush,
  ShieldCheck,
  CurrencyDollar,
  Palette,
  Wrench,
  Eye,
  HandPointing,
  HouseLine,
  Users,
  CaretDown,
} from "@phosphor-icons/react/dist/ssr"
import JsonLd from "@/components/seo/JsonLd"
import Breadcrumbs from "@/components/seo/Breadcrumbs"

const siteUrl = "https://brokeandfixed.com"

/* ---------- Static generation ---------- */

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "es" }]
}

/* ---------- Metadata ---------- */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const isEs = locale === "es"

  const title = isEs
    ? "Pintura de Gabinetes de Cocina en Miami | Desde $3,000 | Broke & Fixed"
    : "Kitchen Cabinet Painting Miami | From $3,000 | Broke & Fixed"

  const description = isEs
    ? "Transforme su cocina por una fraccion del costo de gabinetes nuevos. Pintura profesional de gabinetes desde $3,000. Completamente asegurados, empresa familiar. Llame (786) 363-7039."
    : "Transform your kitchen for a fraction of the cost of new cabinets. Professional cabinet painting from $3,000. Fully insured, family owned. Call (786) 363-7039."

  const enUrl = `${siteUrl}/en/cabinet-painting`
  const esUrl = `${siteUrl}/es/cabinet-painting`

  return {
    title,
    description,
    keywords: [
      "cabinet painting Miami",
      "kitchen cabinet refinishing Miami",
      "paint kitchen cabinets cost",
      "cabinet painting near me",
      "cabinet refinishing Miami-Dade",
      "kitchen cabinet makeover Miami",
      "paint cabinets Miami",
      "cabinet painting cost Florida",
      "kitchen update Miami",
      "affordable kitchen remodel Miami",
    ],
    openGraph: {
      title,
      description,
      url: locale === "es" ? esUrl : enUrl,
      siteName: "Broke & Fixed Home Solutions",
      locale: isEs ? "es_US" : "en_US",
      type: "website",
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: isEs
            ? "Pintura de Gabinetes de Cocina por Broke & Fixed Home Solutions"
            : "Kitchen Cabinet Painting by Broke & Fixed Home Solutions",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image.jpg"],
    },
    alternates: {
      canonical: locale === "es" ? esUrl : enUrl,
      languages: {
        en: enUrl,
        es: esUrl,
        "x-default": enUrl,
      },
    },
  }
}

/* ---------- Content ---------- */

const content = {
  en: {
    breadcrumbs: [
      { name: "Home", href: "/en" },
      { name: "Kitchen Remodeling", href: "/en/services/kitchen-remodeling" },
      { name: "Cabinet Painting", href: "/en/cabinet-painting" },
    ],
    hero: {
      headline: "A $25,000 Kitchen Look. For Under $6,000.",
      subheadline:
        "Professional cabinet painting transforms your kitchen without the price tag of a full remodel.",
      cta: "Get Your Free Estimate",
      callUs: "Or call us now",
      stats: [
        { value: "$3K\u2013$6K", label: "Avg Cost" },
        { value: "5\u20137 Days", label: "Timeline" },
        { value: "7\u201310 Year", label: "Finish Life" },
        { value: "100%", label: "Fully Insured" },
      ],
    },
    problem: {
      heading: "Your Kitchen Deserves Better (Without the $25K Price Tag)",
      intro:
        "You already know your kitchen looks outdated. The dark cherry cabinets from 2005. The honey oak that screams \"builder grade.\" Or the off-white that turned yellow two presidencies ago.",
      painPoints: [
        {
          title: "New cabinets cost $15,000 to $30,000",
          text: "That is not a typo. Custom cabinets with installation regularly hit $25K or more in Miami-Dade. Even stock cabinets from a big box store run $8K to $12K after you add install labor.",
        },
        {
          title: "Full remodels take 4 to 8 weeks",
          text: "No kitchen for a month? Eating takeout every night while workers tear your house apart? Most homeowners dread that more than the price.",
        },
        {
          title: "Your cabinets are still solid",
          text: "Here is the thing most people miss. The boxes are fine. The doors are fine. The structure is good. You do not need new cabinets. You need new paint.",
        },
      ],
      pivot:
        "There is a smarter way to get the kitchen you want. And it saves you $12,000 to $24,000.",
    },
    transformation: {
      heading: "Same Cabinets. Completely Different Kitchen.",
      subheading:
        "Professional cabinet painting delivers a high-end result that your neighbors will think cost five figures.",
      projects: [
        {
          before: "Dark Cherry Cabinets",
          after: "Bright White",
          cost: "$4,500",
          note: "Complete transformation. Kitchen went from dark and cramped to open and modern.",
        },
        {
          before: "Honey Oak Cabinets",
          after: "Sage Green",
          cost: "$3,800",
          note: "The trending color that makes every kitchen feel fresh. New brushed brass hardware finished the look.",
        },
        {
          before: "Outdated White Cabinets",
          after: "Modern Navy",
          cost: "$5,200",
          note: "Yes, you can go darker. Navy cabinets with gold pulls created a high-end designer look.",
        },
      ],
    },
    process: {
      heading: "How It Works: 5 Simple Steps",
      subheading:
        "We handle everything from color selection to final walkthrough. Most kitchens done in 5 to 7 days.",
      steps: [
        {
          number: "01",
          title: "Free Estimate + Color Consultation",
          text: "We visit your home, measure your cabinets, and help you pick the perfect color. We bring real samples so you can see them in your actual lighting.",
        },
        {
          number: "02",
          title: "Door and Drawer Removal",
          text: "Every door, drawer front, and piece of hardware gets labeled and removed. We paint off-site in a controlled environment for the smoothest finish.",
        },
        {
          number: "03",
          title: "Clean, Sand, Prime",
          text: "This is where most DIY jobs fail. Proper prep is everything. We degrease, sand, and apply bonding primer so the paint sticks for years, not months.",
        },
        {
          number: "04",
          title: "2 to 3 Coats of Cabinet-Grade Paint",
          text: "Not wall paint. Not house paint. Cabinet-grade enamel that dries hard, resists fingerprints, and holds up to daily kitchen use. Sprayed, not brushed.",
        },
        {
          number: "05",
          title: "Reinstall + New Hardware + Final Walkthrough",
          text: "Doors go back on with adjusted hinges. New hardware gets installed. We walk through every detail with you before we leave.",
        },
      ],
    },
    included: {
      heading: "What Is Included",
      items: [
        "All cabinet doors and drawer fronts",
        "Cabinet frame painting",
        "Professional-grade primer and paint",
        "Color consultation included",
        "Hinges adjusted and tightened",
        "Hardware installation (pulls and knobs purchased separately)",
        "Full cleanup after completion",
        "Final walkthrough with the homeowner",
      ],
    },
    comparison: {
      heading: "The Real Cost Breakdown",
      saveLine:
        "Save $12,000 to $24,000 and get the same visual result.",
      headers: ["", "New Cabinets", "Cabinet Painting"],
      rows: [
        { label: "Cost", newCab: "$15,000 \u2013 $30,000", painting: "$3,000 \u2013 $6,000" },
        { label: "Timeline", newCab: "4 \u2013 8 Weeks", painting: "5 \u2013 7 Days" },
        { label: "Disruption", newCab: "Major Construction", painting: "Minimal" },
        { label: "Kitchen Usable?", newCab: "Not for weeks", painting: "Most of the time" },
        { label: "Visual Result", newCab: "Brand new look", painting: "Brand new look" },
      ],
    },
    colors: {
      heading: "Trending Cabinet Colors for 2026",
      subheading:
        "We bring samples to your home. See the color in your actual lighting before you commit.",
      trends: [
        { name: "Bright White", hex: "#F8F8F6", desc: "The classic. Clean, timeless, makes any kitchen feel bigger." },
        { name: "Sage Green", hex: "#B2BFA0", desc: "The biggest trend in kitchens right now. Warm, organic, pairs with everything." },
        { name: "Navy Blue", hex: "#1E3A5F", desc: "Bold and premium. Navy cabinets with gold hardware is a look that stops people mid-sentence." },
        { name: "Warm Gray", hex: "#9E9E9E", desc: "Sophisticated and neutral. Works with any countertop and backsplash." },
        { name: "Creamy Off-White", hex: "#F5F0E8", desc: "Softer than bright white. Adds warmth without going dark." },
      ],
    },
    faq: {
      heading: "Frequently Asked Questions",
      items: [
        {
          q: "How long does cabinet painting take?",
          a: "Most kitchens take 5 to 7 days from start to finish. That includes removal, prep, painting, drying, and reinstallation. Larger kitchens with more than 40 doors may take 7 to 10 days. You will have access to your kitchen for most of the process since we paint doors off-site. The only time your kitchen is fully disrupted is during removal day and reinstall day.",
        },
        {
          q: "Is painted finish as durable as factory finish?",
          a: "When done right, yes. We use cabinet-grade enamel paint that is specifically designed for kitchen cabinets. It dries to a hard, durable shell that resists chips, stains, and fingerprints. The key is proper prep work, bonding primer, and professional spray application. That is the difference between a finish that lasts 2 years and one that lasts 7 to 10 years. We do not cut corners on materials or technique.",
        },
        {
          q: "Can you paint over laminate cabinets?",
          a: "In most cases, yes. Laminate requires special bonding primers and extra prep work to ensure the paint adheres properly. During your free estimate, we inspect your cabinets and let you know if they are good candidates for painting. Some very old or heavily damaged laminate may not be suitable, but the majority of laminate cabinets in Miami-Dade homes paint beautifully with the right process.",
        },
        {
          q: "What type of paint do you use?",
          a: "We use cabinet-grade acrylic enamel, not standard wall paint. Cabinet paint is formulated to dry harder, resist moisture (important in Miami kitchens), and hold up to daily wear. We apply it with professional spray equipment for a smooth, factory-like finish with no brush marks. The specific brand depends on your color choice, but we only stock professional-grade products from Benjamin Moore, Sherwin-Williams, or equivalent.",
        },
        {
          q: "Do I need to buy my own hardware?",
          a: "You purchase the hardware (pulls, knobs, handles) and we install it at no extra charge. This way you get exactly the style you want without a markup. We are happy to recommend where to shop and what styles pair well with your new cabinet color. If you want to keep your existing hardware, we can reinstall it after painting.",
        },
        {
          q: "How much does cabinet painting cost in Miami?",
          a: "For a standard Miami-Dade kitchen (20 to 30 cabinet doors and drawer fronts), professional cabinet painting runs $3,000 to $6,000. Price depends on kitchen size, cabinet condition, and color choice. Going from a dark stain to a light color requires more coats and costs a bit more. Compare that to $15,000 to $30,000 for brand new cabinets and the savings are clear. We provide a free, no-pressure estimate at your home.",
        },
        {
          q: "Will I be able to use my kitchen during the project?",
          a: "Yes, for most of the project. On removal day and reinstall day, your kitchen will be disrupted. But during the 3 to 5 days when we are painting off-site, your kitchen is fully usable. You will just be looking at cabinet boxes without doors for a few days. Most homeowners find it a minor inconvenience compared to the weeks-long disruption of a full remodel.",
        },
        {
          q: "Are you insured?",
          a: "Yes. Broke & Fixed Home Solutions carries full general liability insurance. We are a family-owned remodeling company, not subcontractors or day laborers. Our team does all the work, start to finish. You are protected from day one.",
        },
      ],
    },
    finalCta: {
      heading: "Ready for a Kitchen That Looks Like You Spent Thousands More?",
      subheading:
        "Free estimates, no pressure, no obligation. Just honest advice on what your cabinets need.",
      cta: "Get Your Free Estimate",
      callText: "Or call",
      badges: ["Fully Insured", "Family Owned", "17 Miami-Dade Communities"],
    },
  },
  es: {
    breadcrumbs: [
      { name: "Inicio", href: "/es" },
      { name: "Remodelacion de Cocina", href: "/es/services/remodelacion-de-cocinas" },
      { name: "Pintura de Gabinetes", href: "/es/cabinet-painting" },
    ],
    hero: {
      headline: "Una Cocina de $25,000. Por Menos de $6,000.",
      subheadline:
        "La pintura profesional de gabinetes transforma su cocina sin el costo de una remodelacion completa.",
      cta: "Pida Su Estimado Gratis",
      callUs: "O llamenos ahora",
      stats: [
        { value: "$3K\u2013$6K", label: "Costo Prom." },
        { value: "5\u20137 Dias", label: "Plazo" },
        { value: "7\u201310 Anos", label: "Duracion" },
        { value: "100%", label: "Asegurados" },
      ],
    },
    problem: {
      heading: "Su Cocina Merece Mas (Sin el Precio de $25K)",
      intro:
        "Usted ya sabe que su cocina se ve anticuada. Los gabinetes oscuros de cherry del 2005. El roble miel que grita \"basico de constructor.\" O el blanco que se volvio amarillo hace anos.",
      painPoints: [
        {
          title: "Gabinetes nuevos cuestan de $15,000 a $30,000",
          text: "No es exageracion. Gabinetes a medida con instalacion alcanzan $25K o mas en Miami-Dade. Incluso gabinetes prefabricados cuestan de $8K a $12K con mano de obra.",
        },
        {
          title: "Una remodelacion completa toma de 4 a 8 semanas",
          text: "Sin cocina por un mes? Comer afuera cada noche mientras los trabajadores destruyen su casa? La mayoria de los propietarios temen eso mas que el precio.",
        },
        {
          title: "Sus gabinetes todavia estan en buen estado",
          text: "Esto es lo que muchos no ven. Las cajas estan bien. Las puertas estan bien. La estructura es solida. No necesita gabinetes nuevos. Necesita pintura nueva.",
        },
      ],
      pivot:
        "Hay una manera mas inteligente de conseguir la cocina que quiere. Y le ahorra de $12,000 a $24,000.",
    },
    transformation: {
      heading: "Mismos Gabinetes. Una Cocina Completamente Diferente.",
      subheading:
        "La pintura profesional de gabinetes ofrece un resultado de alta gama que sus vecinos pensaran que costo cinco cifras.",
      projects: [
        {
          before: "Gabinetes de Cherry Oscuro",
          after: "Blanco Brillante",
          cost: "$4,500",
          note: "Transformacion completa. La cocina paso de oscura y cerrada a abierta y moderna.",
        },
        {
          before: "Gabinetes de Roble Miel",
          after: "Verde Salvia",
          cost: "$3,800",
          note: "El color de moda que hace que cualquier cocina se vea fresca. Herrajes de laton cepillado completaron el look.",
        },
        {
          before: "Gabinetes Blancos Anticuados",
          after: "Azul Marino Moderno",
          cost: "$5,200",
          note: "Si, se puede ir mas oscuro. Gabinetes azul marino con tiradores dorados crearon un look de disenador de alta gama.",
        },
      ],
    },
    process: {
      heading: "Como Funciona: 5 Pasos Simples",
      subheading:
        "Nos encargamos de todo, desde la seleccion de color hasta el recorrido final. La mayoria de cocinas terminadas en 5 a 7 dias.",
      steps: [
        {
          number: "01",
          title: "Estimado Gratis + Consulta de Color",
          text: "Visitamos su hogar, medimos sus gabinetes y le ayudamos a elegir el color perfecto. Traemos muestras reales para que las vea con su iluminacion real.",
        },
        {
          number: "02",
          title: "Remocion de Puertas y Cajones",
          text: "Cada puerta, frente de cajon y herraje se etiqueta y se remueve. Pintamos fuera del sitio en un ambiente controlado para el acabado mas liso.",
        },
        {
          number: "03",
          title: "Limpiar, Lijar, Imprimar",
          text: "Aqui es donde la mayoria de los trabajos caseros fallan. La preparacion adecuada lo es todo. Desengrasamos, lijamos y aplicamos imprimador de adherencia.",
        },
        {
          number: "04",
          title: "2 a 3 Capas de Pintura para Gabinetes",
          text: "No pintura de pared. No pintura de casa. Esmalte de grado profesional que seca duro, resiste huellas digitales y soporta el uso diario de cocina. Rociado, no brocheado.",
        },
        {
          number: "05",
          title: "Reinstalacion + Herrajes + Recorrido Final",
          text: "Las puertas se reinstalan con bisagras ajustadas. Los herrajes nuevos se instalan. Revisamos cada detalle con usted antes de irnos.",
        },
      ],
    },
    included: {
      heading: "Que Esta Incluido",
      items: [
        "Todas las puertas y frentes de cajon",
        "Pintura del marco de los gabinetes",
        "Imprimador y pintura de grado profesional",
        "Consulta de color incluida",
        "Bisagras ajustadas y apretadas",
        "Instalacion de herrajes (tiradores y perillas se compran por separado)",
        "Limpieza completa al finalizar",
        "Recorrido final con el propietario",
      ],
    },
    comparison: {
      heading: "El Desglose Real de Costos",
      saveLine:
        "Ahorre de $12,000 a $24,000 y obtenga el mismo resultado visual.",
      headers: ["", "Gabinetes Nuevos", "Pintura de Gabinetes"],
      rows: [
        { label: "Costo", newCab: "$15,000 \u2013 $30,000", painting: "$3,000 \u2013 $6,000" },
        { label: "Plazo", newCab: "4 \u2013 8 Semanas", painting: "5 \u2013 7 Dias" },
        { label: "Interrupcion", newCab: "Construccion Mayor", painting: "Minima" },
        { label: "Cocina Usable?", newCab: "No por semanas", painting: "La mayor parte" },
        { label: "Resultado Visual", newCab: "Look completamente nuevo", painting: "Look completamente nuevo" },
      ],
    },
    colors: {
      heading: "Colores de Gabinetes en Tendencia para 2026",
      subheading:
        "Traemos muestras a su hogar. Vea el color en su iluminacion real antes de decidir.",
      trends: [
        { name: "Blanco Brillante", hex: "#F8F8F6", desc: "El clasico. Limpio, atemporal, hace que cualquier cocina se vea mas grande." },
        { name: "Verde Salvia", hex: "#B2BFA0", desc: "La tendencia mas grande en cocinas ahora. Calido, organico, combina con todo." },
        { name: "Azul Marino", hex: "#1E3A5F", desc: "Audaz y premium. Gabinetes azul marino con herrajes dorados es un look que detiene a la gente." },
        { name: "Gris Calido", hex: "#9E9E9E", desc: "Sofisticado y neutro. Funciona con cualquier encimera y salpicadero." },
        { name: "Blanco Crema", hex: "#F5F0E8", desc: "Mas suave que el blanco brillante. Agrega calidez sin ir oscuro." },
      ],
    },
    faq: {
      heading: "Preguntas Frecuentes",
      items: [
        {
          q: "Cuanto tiempo toma la pintura de gabinetes?",
          a: "La mayoria de cocinas toman de 5 a 7 dias de inicio a fin. Eso incluye remocion, preparacion, pintura, secado y reinstalacion. Cocinas grandes con mas de 40 puertas pueden tomar de 7 a 10 dias. Tendra acceso a su cocina la mayor parte del proceso ya que pintamos las puertas fuera del sitio. El unico momento de interrupcion total es el dia de remocion y el dia de reinstalacion.",
        },
        {
          q: "Es el acabado pintado tan duradero como el de fabrica?",
          a: "Cuando se hace correctamente, si. Usamos pintura de esmalte de grado profesional disenada especificamente para gabinetes de cocina. Seca a una capa dura y durable que resiste golpes, manchas y huellas digitales. La clave es la preparacion adecuada, el imprimador de adherencia y la aplicacion profesional con rociador. Esa es la diferencia entre un acabado que dura 2 anos y uno que dura de 7 a 10 anos.",
        },
        {
          q: "Se puede pintar sobre gabinetes de laminado?",
          a: "En la mayoria de los casos, si. El laminado requiere imprimadores de adherencia especiales y preparacion adicional para asegurar que la pintura se adhiera correctamente. Durante su estimado gratis, inspeccionamos sus gabinetes y le informamos si son buenos candidatos para pintura. Algunos laminados muy viejos o muy danados pueden no ser adecuados, pero la mayoria de gabinetes de laminado en hogares de Miami-Dade se pintan excelentemente con el proceso correcto.",
        },
        {
          q: "Que tipo de pintura usan?",
          a: "Usamos esmalte acrilico de grado profesional, no pintura comun de pared. La pintura para gabinetes esta formulada para secar mas duro, resistir la humedad (importante en cocinas de Miami) y soportar el uso diario. La aplicamos con equipo de rociado profesional para un acabado liso, tipo fabrica, sin marcas de brocha. La marca especifica depende de su eleccion de color, pero solo usamos productos de grado profesional de Benjamin Moore, Sherwin-Williams o equivalente.",
        },
        {
          q: "Necesito comprar mis propios herrajes?",
          a: "Usted compra los herrajes (tiradores, perillas, manijas) y nosotros los instalamos sin costo adicional. De esta manera obtiene exactamente el estilo que quiere sin sobrecargos. Estamos felices de recomendar donde comprar y que estilos combinan bien con su nuevo color de gabinete. Si quiere conservar sus herrajes actuales, podemos reinstalarlos despues de pintar.",
        },
        {
          q: "Cuanto cuesta pintar gabinetes en Miami?",
          a: "Para una cocina estandar en Miami-Dade (20 a 30 puertas y frentes de cajon), la pintura profesional de gabinetes cuesta de $3,000 a $6,000. El precio depende del tamano de la cocina, la condicion de los gabinetes y la eleccion de color. Cambiar de un tono oscuro a un color claro requiere mas capas y cuesta un poco mas. Compare eso con $15,000 a $30,000 por gabinetes nuevos y el ahorro es claro. Proporcionamos un estimado gratis, sin presion, en su hogar.",
        },
        {
          q: "Podre usar mi cocina durante el proyecto?",
          a: "Si, durante la mayor parte del proyecto. El dia de remocion y el dia de reinstalacion, su cocina estara interrumpida. Pero durante los 3 a 5 dias cuando estamos pintando fuera del sitio, su cocina es completamente funcional. Solo vera las cajas de gabinetes sin puertas por unos dias. La mayoria de los propietarios encuentran que es una inconveniencia menor comparada con semanas de interrupcion de una remodelacion completa.",
        },
        {
          q: "Estan asegurados?",
          a: "Si. Broke & Fixed Home Solutions tiene seguro de responsabilidad general completo. Somos una empresa familiar de remodelacion, no subcontratistas ni jornaleros. Nuestro equipo hace todo el trabajo, de principio a fin. Usted esta protegido desde el dia uno.",
        },
      ],
    },
    finalCta: {
      heading: "Listo para una Cocina Que Se Vea Como Si Hubiera Gastado Miles Mas?",
      subheading:
        "Estimados gratis, sin presion, sin compromiso. Solo consejos honestos sobre lo que sus gabinetes necesitan.",
      cta: "Pida Su Estimado Gratis",
      callText: "O llame al",
      badges: ["Completamente Asegurados", "Empresa Familiar", "17 Comunidades en Miami-Dade"],
    },
  },
}

/* ---------- Schema ---------- */

function getServiceSchema(locale: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${siteUrl}/${locale}/cabinet-painting#service`,
    name:
      locale === "es"
        ? "Pintura de Gabinetes de Cocina"
        : "Kitchen Cabinet Painting",
    description:
      locale === "es"
        ? "Servicio profesional de pintura de gabinetes de cocina en Miami-Dade. Transforme su cocina por una fraccion del costo de gabinetes nuevos."
        : "Professional kitchen cabinet painting service in Miami-Dade. Transform your kitchen for a fraction of the cost of new cabinets.",
    provider: {
      "@type": "HomeAndConstructionBusiness",
      "@id": `${siteUrl}/#business`,
      name: "Broke & Fixed Home Solutions",
      telephone: "+1-786-363-7039",
      email: "brokeandfixed305@gmail.com",
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
    offers: {
      "@type": "AggregateOffer",
      lowPrice: "3000",
      highPrice: "6000",
      priceCurrency: "USD",
      offerCount: "1",
    },
    serviceType: "Cabinet Painting",
    availableLanguage: ["English", "Spanish"],
  }
}

function getFaqSchema(locale: string) {
  const c = locale === "es" ? content.es : content.en
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: c.faq.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  }
}

/* ---------- Page Component ---------- */

export default async function CabinetPaintingPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const isEs = locale === "es"
  const c = isEs ? content.es : content.en

  return (
    <>
      <JsonLd data={getServiceSchema(locale)} />
      <JsonLd data={getFaqSchema(locale)} />

      <main className="min-h-screen">
        {/* ═══════ HERO ═══════ */}
        <section className="relative bg-espresso overflow-hidden">
          {/* Subtle grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
          <div className="relative max-w-7xl mx-auto px-4 pt-8 pb-20 md:pt-12 md:pb-28">
            <Breadcrumbs items={c.breadcrumbs} />

            <div className="max-w-3xl mt-8 md:mt-12">
              <p className="font-accent text-sm font-semibold uppercase tracking-[0.2em] text-[#F07A1A] mb-4">
                {isEs
                  ? "Pintura de Gabinetes de Cocina"
                  : "Kitchen Cabinet Painting"}
              </p>
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                {c.hero.headline}
              </h1>
              <p className="text-white/70 text-lg md:text-xl mt-6 max-w-2xl leading-relaxed">
                {c.hero.subheadline}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mt-10">
                <a
                  href="tel:+17863637039"
                  className="inline-flex items-center justify-center gap-2 bg-[#F07A1A] hover:bg-[#D4670F] text-white font-display text-lg font-bold py-4 px-8 rounded-lg transition-colors"
                >
                  <Phone weight="bold" className="w-5 h-5" />
                  {c.hero.cta}
                </a>
                <a
                  href="tel:+17863637039"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur hover:bg-white/20 text-white font-display text-lg font-bold py-4 px-8 rounded-lg border border-white/20 transition-colors"
                >
                  <Phone weight="regular" className="w-5 h-5" />
                  {c.hero.callUs}: (786) 363-7039
                </a>
              </div>
            </div>

            {/* Stats bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-14">
              {c.hero.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white/5 backdrop-blur border border-white/10 rounded-xl px-6 py-5 text-center"
                >
                  <span className="block font-display text-2xl md:text-3xl font-bold text-[#F07A1A]">
                    {stat.value}
                  </span>
                  <span className="block text-sm text-white/60 font-accent uppercase tracking-wider mt-1">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════ PROBLEM ═══════ */}
        <section className="py-20 md:py-28 bg-cream">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-espresso text-center">
              {c.problem.heading}
            </h2>
            <p className="text-warm-gray text-lg md:text-xl text-center mt-6 max-w-2xl mx-auto leading-relaxed">
              {c.problem.intro}
            </p>

            <div className="mt-14 space-y-6">
              {c.problem.painPoints.map((point, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl p-6 md:p-8 border-l-4 border-[#E53935]"
                >
                  <h3 className="font-display text-xl md:text-2xl font-bold text-espresso">
                    {point.title}
                  </h3>
                  <p className="text-warm-gray mt-3 leading-relaxed">
                    {point.text}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-12 bg-espresso rounded-2xl p-8 md:p-10 text-center">
              <p className="font-display text-2xl md:text-3xl font-bold text-white">
                {c.problem.pivot}
              </p>
            </div>
          </div>
        </section>

        {/* ═══════ TRANSFORMATION ═══════ */}
        <section className="py-20 md:py-28 bg-[#1E3A5F]">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                {c.transformation.heading}
              </h2>
              <p className="text-white/70 text-lg mt-6 leading-relaxed">
                {c.transformation.subheading}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14">
              {c.transformation.projects.map((project, i) => (
                <div
                  key={i}
                  className="bg-white/10 backdrop-blur border border-white/10 rounded-2xl overflow-hidden"
                >
                  {/* Before/After header */}
                  <div className="grid grid-cols-2 text-center">
                    <div className="bg-white/5 py-3 border-r border-white/10">
                      <span className="text-xs font-accent uppercase tracking-wider text-white/50">
                        {isEs ? "Antes" : "Before"}
                      </span>
                      <p className="font-display text-sm font-bold text-white mt-0.5">
                        {project.before}
                      </p>
                    </div>
                    <div className="bg-[#F07A1A]/20 py-3">
                      <span className="text-xs font-accent uppercase tracking-wider text-[#F07A1A]">
                        {isEs ? "Despues" : "After"}
                      </span>
                      <p className="font-display text-sm font-bold text-white mt-0.5">
                        {project.after}
                      </p>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-white/70 text-sm leading-relaxed">
                      {project.note}
                    </p>
                    <div className="mt-4 flex items-center gap-2">
                      <CurrencyDollar
                        weight="bold"
                        className="w-5 h-5 text-[#4CAF50]"
                      />
                      <span className="font-display text-2xl font-bold text-[#4CAF50]">
                        {project.cost}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════ PROCESS ═══════ */}
        <section className="py-20 md:py-28 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-espresso">
                {c.process.heading}
              </h2>
              <p className="text-warm-gray text-lg mt-6 leading-relaxed">
                {c.process.subheading}
              </p>
            </div>

            <div className="mt-14 space-y-0">
              {c.process.steps.map((step, i) => {
                const icons = [Eye, Wrench, PaintBrush, Palette, HandPointing]
                const StepIcon = icons[i] || PaintBrush
                const isLast = i === c.process.steps.length - 1

                return (
                  <div key={i} className="relative flex gap-6 md:gap-8">
                    {/* Timeline line */}
                    <div className="flex flex-col items-center">
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-espresso text-white font-display text-lg font-bold flex-shrink-0">
                        {step.number}
                      </div>
                      {!isLast && (
                        <div className="w-px h-full bg-espresso/10 min-h-[40px]" />
                      )}
                    </div>

                    {/* Content */}
                    <div className="pb-10">
                      <div className="flex items-center gap-3">
                        <StepIcon
                          weight="bold"
                          className="w-5 h-5 text-[#F07A1A]"
                        />
                        <h3 className="font-display text-xl md:text-2xl font-bold text-espresso">
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-warm-gray mt-3 leading-relaxed max-w-xl">
                        {step.text}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ═══════ WHAT'S INCLUDED ═══════ */}
        <section className="py-20 md:py-28 bg-cream">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-espresso text-center">
              {c.included.heading}
            </h2>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
              {c.included.items.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 bg-white rounded-xl p-5 border border-cream-dark"
                >
                  <CheckCircle
                    weight="fill"
                    className="w-6 h-6 text-[#4CAF50] flex-shrink-0 mt-0.5"
                  />
                  <span className="text-espresso font-medium leading-snug">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════ COST COMPARISON ═══════ */}
        <section className="py-20 md:py-28 bg-espresso">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center">
              {c.comparison.heading}
            </h2>

            {/* Desktop table */}
            <div className="mt-12 hidden md:block overflow-hidden rounded-2xl border border-white/10">
              <table className="w-full">
                <thead>
                  <tr className="bg-white/5">
                    <th className="text-left py-4 px-6 font-accent text-sm uppercase tracking-wider text-white/50">
                      {c.comparison.headers[0]}
                    </th>
                    <th className="text-center py-4 px-6 font-accent text-sm uppercase tracking-wider text-white/50">
                      {c.comparison.headers[1]}
                    </th>
                    <th className="text-center py-4 px-6 font-accent text-sm uppercase tracking-wider text-[#4CAF50]">
                      {c.comparison.headers[2]}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {c.comparison.rows.map((row, i) => (
                    <tr
                      key={i}
                      className="border-t border-white/5"
                    >
                      <td className="py-4 px-6 font-display text-lg font-bold text-white">
                        {row.label}
                      </td>
                      <td className="py-4 px-6 text-center text-white/50">
                        {row.newCab}
                      </td>
                      <td className="py-4 px-6 text-center font-semibold text-[#4CAF50]">
                        {row.painting}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="mt-12 md:hidden space-y-4">
              {c.comparison.rows.map((row, i) => (
                <div
                  key={i}
                  className="bg-white/5 rounded-xl p-5 border border-white/10"
                >
                  <p className="font-display text-lg font-bold text-white mb-3">
                    {row.label}
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-xs font-accent uppercase tracking-wider text-white/40 mb-1">
                        {c.comparison.headers[1]}
                      </p>
                      <p className="text-white/50 text-sm">{row.newCab}</p>
                    </div>
                    <div>
                      <p className="text-xs font-accent uppercase tracking-wider text-[#4CAF50]/70 mb-1">
                        {c.comparison.headers[2]}
                      </p>
                      <p className="text-[#4CAF50] font-semibold text-sm">
                        {row.painting}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-center font-display text-xl md:text-2xl font-bold text-[#F07A1A] mt-12">
              {c.comparison.saveLine}
            </p>
          </div>
        </section>

        {/* ═══════ COLOR TRENDS 2026 ═══════ */}
        <section className="py-20 md:py-28 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-espresso">
                {c.colors.heading}
              </h2>
              <p className="text-warm-gray text-lg mt-6 leading-relaxed">
                {c.colors.subheading}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-14">
              {c.colors.trends.map((color) => (
                <div
                  key={color.name}
                  className="rounded-2xl overflow-hidden border border-gray-100 bg-cream"
                >
                  <div
                    className="h-24 md:h-28"
                    style={{ backgroundColor: color.hex }}
                  />
                  <div className="p-4">
                    <h3 className="font-display text-lg font-bold text-espresso">
                      {color.name}
                    </h3>
                    <p className="text-warm-gray text-sm mt-1 leading-relaxed">
                      {color.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════ FAQ ═══════ */}
        <section className="py-20 md:py-28 bg-cream">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-espresso text-center">
              {c.faq.heading}
            </h2>

            <div className="mt-12 space-y-3">
              {c.faq.items.map((faq, i) => (
                <details
                  key={i}
                  className="group bg-white rounded-xl overflow-hidden border border-cream-dark"
                >
                  <summary className="flex items-center justify-between cursor-pointer px-6 py-5 font-display text-lg font-bold text-espresso hover:text-sage transition-colors list-none [&::-webkit-details-marker]:hidden">
                    <span>{faq.q}</span>
                    <CaretDown
                      weight="bold"
                      className="w-5 h-5 text-warm-gray flex-shrink-0 ml-4 transition-transform group-open:rotate-180"
                    />
                  </summary>
                  <div className="px-6 pb-6 text-warm-gray leading-relaxed">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════ FINAL CTA ═══════ */}
        <section className="py-20 md:py-28 bg-[#1E3A5F]">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
              {c.finalCta.heading}
            </h2>
            <p className="text-white/70 text-lg mt-6 leading-relaxed max-w-xl mx-auto">
              {c.finalCta.subheading}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
              <a
                href="tel:+17863637039"
                className="inline-flex items-center justify-center gap-2 bg-[#F07A1A] hover:bg-[#D4670F] text-white font-display text-lg font-bold py-4 px-10 rounded-lg transition-colors"
              >
                <Phone weight="bold" className="w-5 h-5" />
                {c.finalCta.cta}
              </a>
              <a
                href="tel:+17863637039"
                className="inline-flex items-center justify-center gap-2 text-white font-display text-lg font-bold hover:text-[#F07A1A] transition-colors"
              >
                <Phone weight="regular" className="w-5 h-5" />
                {c.finalCta.callText} (786) 363-7039
              </a>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center justify-center gap-6 mt-14">
              {c.finalCta.badges.map((badge, i) => {
                const badgeIcons = [ShieldCheck, Users, HouseLine]
                const BadgeIcon = badgeIcons[i] || ShieldCheck
                return (
                  <div
                    key={badge}
                    className="flex items-center gap-2 text-white/60"
                  >
                    <BadgeIcon weight="bold" className="w-5 h-5" />
                    <span className="font-accent text-sm uppercase tracking-wider">
                      {badge}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
