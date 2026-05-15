import { Metadata } from "next"
import Image from "next/image"
import {
  Phone,
  ShieldCheck,
  Camera,
  Lock,
  Bell,
  Sun,
  CloudSlash,
  CheckCircle,
  CaretDown,
  ArrowRight,
  Star,
  ArrowSquareOut,
  House,
  WifiHigh,
  SealCheck,
} from "@phosphor-icons/react/dist/ssr"
import JsonLd from "@/components/seo/JsonLd"
import Breadcrumbs from "@/components/seo/Breadcrumbs"

const siteUrl = "https://brokeandfixed.com"
const AFFILIATE_TAG = "oac024-20"

function amazonUrl(asin: string) {
  return `https://www.amazon.com/dp/${asin}?tag=${AFFILIATE_TAG}`
}

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
    ? "Seguridad para el Hogar en Miami | Camaras Eufy Sin Mensualidad | Broke & Fixed"
    : "Home Security Miami | Eufy Cameras, No Monthly Fee | Broke & Fixed Home Solutions"

  const description = isEs
    ? "Protege tu hogar en Miami con camaras Eufy. Sin contrato mensual. Sin cuota de suscripcion. Almacenamiento local, solar, resistente al calor de Florida. Desde $149."
    : "Protect your Miami home with Eufy security cameras and smart locks. No monthly fees, no contracts. Local storage, solar-powered, built for Florida heat. Starting at $149."

  const enUrl = `${siteUrl}/en/home-security`
  const esUrl = `${siteUrl}/es/home-security`

  return {
    title,
    description,
    keywords: [
      "home security Miami",
      "security cameras Miami",
      "Eufy camera Miami",
      "smart lock Miami",
      "home security no monthly fee",
      "outdoor security camera Miami",
      "home alarm system Miami-Dade",
      "Eufy doorbell Miami",
      "best security camera Miami",
      "home security Kendall",
    ],
    openGraph: {
      title,
      description,
      type: "website",
      url: isEs ? esUrl : enUrl,
      siteName: "Broke & Fixed Home Solutions",
      locale: isEs ? "es_US" : "en_US",
      alternateLocale: isEs ? "en_US" : "es_US",
      images: [{ url: `${siteUrl}/og-image.jpg`, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${siteUrl}/og-image.jpg`],
    },
    alternates: {
      canonical: isEs ? esUrl : enUrl,
      languages: { en: enUrl, es: esUrl, "x-default": enUrl },
    },
  }
}

/* ========================================================================== */
/*  Products                                                                   */
/* ========================================================================== */

const products = [
  {
    id: "alarm-kit",
    asin: "B083KC44TG",
    price: "$159.99",
    image: "/security/eufy-alarm-kit.jpg",
    imageAlt: "eufy 5-Piece Home Alarm Kit with hub, keypad, and sensors",
    badge: "Best Starter",
    badgeEs: "Mejor para Empezar",
    name: "eufy 5-Piece Home Alarm Kit",
    nameEs: "Kit de Alarma eufy 5 Piezas",
    category: "Alarm System",
    categoryEs: "Sistema de Alarma",
    icon: "bell",
    features: [
      "Hub, keypad, motion sensor, and 2 entry sensors included",
      "No monthly fees. No contracts. Arm via app or keypad.",
      "Expandable: add cameras, more sensors, and doorbells",
      "Works with Alexa and Google Assistant",
    ],
    featuresEs: [
      "Hub, teclado, sensor de movimiento y 2 sensores de entrada incluidos",
      "Sin mensualidad. Sin contrato. Activa desde la app o el teclado.",
      "Expandible: agrega camaras, mas sensores y timbres",
      "Compatible con Alexa y Google Assistant",
    ],
    why: "Wireless sensors mean no cutting through tile or stucco walls.",
    whyEs: "Los sensores inalambricos no requieren perforar azulejo ni estuco.",
  },
  {
    id: "doorbell",
    asin: "B0DDTSXJDV",
    price: "$149.99",
    image: "/security/eufy-doorbell-e340.jpg",
    imageAlt: "eufy Video Doorbell E340 with dual cameras",
    badge: "Best Seller",
    badgeEs: "Mas Vendido",
    name: "eufy Video Doorbell E340",
    nameEs: "Timbre con Camara eufy E340",
    category: "Video Doorbell",
    categoryEs: "Timbre con Video",
    icon: "bell",
    features: [
      "Dual cameras: face detection + downward lens to catch package theft",
      "Full-color night vision up to 16 ft, no IR blur",
      "2K Full HD, AI human and package detection",
      "Battery or wired, 8 GB built-in storage, no monthly fee",
    ],
    featuresEs: [
      "Dual camara: deteccion de rostro + lente inferior para paquetes",
      "Vision nocturna en color hasta 5 m, sin desenfoque IR",
      "2K Full HD, deteccion de personas y paquetes con IA",
      "Bateria o cableado, 8 GB de almacenamiento, sin mensualidad",
    ],
    why: "Battery install means no drilling through concrete block construction common in South Florida.",
    whyEs: "La instalacion con bateria evita perforar el bloque de concreto tipico en el sur de Florida.",
  },
  {
    id: "smart-lock",
    asin: "B0DTHVNNXQ",
    price: "$349.99",
    image: "/security/eufy-familock-s3.jpg",
    imageAlt: "eufy FamiLock S3 smart lock with palm vein recognition and camera",
    badge: "Most Advanced",
    badgeEs: "Mas Avanzado",
    name: "eufy FamiLock S3 Smart Lock",
    nameEs: "Cerradura Inteligente eufy FamiLock S3",
    category: "Smart Lock",
    categoryEs: "Cerradura Inteligente",
    icon: "lock",
    features: [
      "Palm vein recognition unlocks with a wave of your hand",
      "Built-in 2K camera with head-to-toe view, 16 GB local storage",
      "6 unlock methods: palm, PIN, app, key card, key, voice",
      "IP weatherproof, dual battery with AA backup",
    ],
    featuresEs: [
      "Reconocimiento de vena de palma: abre con un gesto de la mano",
      "Camara 2K integrada con vista completa, 16 GB de almacenamiento local",
      "6 metodos de desbloqueo: palma, PIN, app, tarjeta, llave, voz",
      "Resistente al clima, bateria dual con respaldo AA",
    ],
    why: "Palm vein and keypad work in Miami humidity where fingerprint sensors fail.",
    whyEs: "La vena de palma y el teclado funcionan en la humedad de Miami donde los sensores de huella fallan.",
  },
  {
    id: "floodlight",
    asin: "B0CD9QKSDD",
    price: "$219.99",
    image: "/security/eufy-floodlight-e340.jpg",
    imageAlt: "eufy Floodlight Camera E340 outdoor security camera with siren",
    badge: "Best Deterrent",
    badgeEs: "Mejor Disuasion",
    name: "eufy Floodlight Camera E340",
    nameEs: "Camara con Reflector eufy E340",
    category: "Floodlight Camera",
    categoryEs: "Camara con Reflector",
    icon: "camera",
    features: [
      "3K wide-angle + 2K telephoto dual-lens, 360° PTZ coverage",
      "2,000-lumen smart floodlight with 95 dB built-in siren",
      "24/7 recording with microSD or HomeBase S380",
      "Wi-Fi 6 dual-band, no monthly fees",
    ],
    featuresEs: [
      "Lente dual 3K gran angular + 2K teleobjetivo, cobertura PTZ 360°",
      "Reflector inteligente de 2,000 lumens con sirena incorporada de 95 dB",
      "Grabacion 24/7 con microSD o HomeBase S380",
      "Wi-Fi 6 dual band, sin mensualidad",
    ],
    why: "Wired power means 24/7 recording. The 2,000-lumen light plus siren stops trouble before it starts.",
    whyEs: "La alimentacion cableada permite grabacion 24/7. La luz y la sirena detienen los problemas antes de que comiencen.",
  },
  {
    id: "cam-s3-pro",
    asin: "B0DDPW1YK2",
    price: "$549.99",
    image: "/security/eufy-cam-s3-pro.jpg",
    imageAlt: "eufyCam S3 Pro 2-camera solar wireless outdoor security kit",
    badge: "Best Value Bundle",
    badgeEs: "Mejor Relacion Precio",
    name: "eufyCam S3 Pro 2-Cam Kit",
    nameEs: "eufyCam S3 Pro Kit 2 Camaras",
    category: "Solar Camera Bundle",
    categoryEs: "Paquete de Camaras Solares",
    icon: "camera",
    features: [
      "4K MaxColor Vision: full color in near-darkness, no spotlight needed",
      "SolarPlus 2.0 dual solar charging, completely wire-free",
      "Radar + PIR dual sensors cut false alerts by 99%",
      "Includes HomeBase S380 with 16 GB storage, expandable to 16 TB",
    ],
    featuresEs: [
      "4K MaxColor Vision: color completo en la oscuridad, sin reflector",
      "Carga solar dual SolarPlus 2.0, completamente inalambrico",
      "Sensores duales radar + PIR reducen falsas alertas en 99%",
      "Incluye HomeBase S380 con 16 GB, expandible hasta 16 TB",
    ],
    why: "Solar charging is a major win in Miami's 265+ sunny days per year. No wiring through stucco.",
    whyEs: "La carga solar es ideal para los 265+ dias soleados de Miami. Sin cables por el estuco.",
  },
  {
    id: "cam-s4",
    asin: "B0FH2Y86XD",
    price: "$1,399.99",
    image: "/security/eufy-cam-s4.jpg",
    imageAlt: "eufyCam S4 4-camera solar outdoor security system with PTZ tracking",
    badge: "Full Coverage",
    badgeEs: "Cobertura Total",
    name: "eufyCam S4 4-Cam Kit",
    nameEs: "eufyCam S4 Kit 4 Camaras",
    category: "4K Solar Bundle",
    categoryEs: "Paquete Solar 4K",
    icon: "camera",
    features: [
      "Triple-lens Bullet-PTZ: 4K 130° wide + 2K PTZ with 360° smart tracking",
      "Cross-cam tracking hands off between cameras to follow subjects",
      "SolarPlus 2.0, IP67 weatherproof, no monthly fees",
      "BionicMind AI recognizes family members vs strangers",
    ],
    featuresEs: [
      "Triple lente Bullet-PTZ: 4K 130° gran angular + 2K PTZ con seguimiento 360°",
      "Seguimiento entre camaras para rastrear sujetos automaticamente",
      "SolarPlus 2.0, IP67, sin mensualidad",
      "IA BionicMind reconoce a familiares vs desconocidos",
    ],
    why: "Covers all four sides of a typical Miami ranch or townhouse. The 4K bullet handles large lots and long driveways in Kendall and Palmetto Bay.",
    whyEs: "Cubre los cuatro lados de una casa tipica en Miami. La lente 4K maneja lotes grandes y entradas largas en Kendall y Palmetto Bay.",
  },
]

/* ========================================================================== */
/*  Content                                                                    */
/* ========================================================================== */

const content = {
  en: {
    breadcrumbs: [
      { name: "Home", href: "/en" },
      { name: "Home Security", href: "/en/home-security" },
    ],
    badge: "Home Security",
    heroHeadline: "Protect Your Home. No Monthly Fees. No Contracts.",
    heroSub:
      "You just put time and money into your home. Now protect it. Eufy security cameras and smart locks give you professional-grade coverage without the subscription trap.",
    stats: [
      { value: "No Fees", label: "Zero monthly costs" },
      { value: "Solar", label: "Wire-free cameras" },
      { value: "4K", label: "Crystal-clear footage" },
      { value: "Local", label: "Your data, not the cloud" },
    ],
    ctaPhone: "Call (786) 363-7039",
    ctaProducts: "See All Products",

    whyHeadline: "Why Eufy Works in Miami",
    whySub: "Most security systems are built for cold-climate suburbs. Miami is different.",
    whyPoints: [
      {
        icon: "sun",
        title: "Solar-powered cameras that actually work here",
        desc: "Miami gets 265+ sunny days a year. Eufy's solar cameras charge in as little as one hour of direct sunlight. No wiring through stucco or block walls.",
      },
      {
        icon: "cloud",
        title: "No monthly fees, ever",
        desc: "Ring, Nest, and Arlo charge $10 to $20 per month per camera. Eufy stores everything locally. You pay once and you own it.",
      },
      {
        icon: "shield",
        title: "Built for heat and humidity",
        desc: "Eufy cameras are IP67 weatherproof. They handle Florida's afternoon thunderstorms, salt air, and 95-degree heat without failing.",
      },
      {
        icon: "wifi",
        title: "Your footage stays private",
        desc: "Local storage on the HomeBase means your video never goes to a server you do not control. No breach risk. No subscription required to review footage.",
      },
    ],

    productsHeadline: "The Best Eufy Gear for Miami Homes",
    productsSub: "No monthly fees on any of these. Buy once and you are done.",
    affiliateDisclosure: "As an Amazon Associate, we earn from qualifying purchases. This helps keep our content free.",
    viewOnAmazon: "View on Amazon",
    whyMiami: "Why it works in Miami",

    setupHeadline: "How to Build Your Setup",
    setupSub: "Start small and add as you go. You do not need everything at once.",
    steps: [
      {
        step: "Start Here",
        title: "Secure your entry points",
        desc: "The 5-piece alarm kit and video doorbell cover your front door first. Most break-ins happen at the front door. These two together run under $320.",
        products: ["5-Piece Alarm Kit", "Video Doorbell E340"],
      },
      {
        step: "Add Next",
        title: "Cover your perimeter",
        desc: "Add the S3 Pro 2-cam kit to watch the sides and back of the house. Solar-powered so no electrician needed. Works with the HomeBase you already have.",
        products: ["eufyCam S3 Pro 2-Cam Kit"],
      },
      {
        step: "Complete It",
        title: "Lock down every angle",
        desc: "Upgrade to the S4 4-cam kit or add the floodlight camera for full 360 coverage. The smart lock replaces your deadbolt and eliminates lost key problems.",
        products: ["eufyCam S4 4-Cam Kit or Floodlight", "FamiLock S3 Smart Lock"],
      },
    ],

    faqHeadline: "Common Questions",
    faqs: [
      {
        q: "Do Eufy cameras require a monthly subscription?",
        a: "No. Every Eufy product listed here stores footage locally on the device or the HomeBase hub. You pay once and own the hardware. There are optional cloud storage plans, but the cameras work fully without them. This is the biggest advantage over Ring, Nest, and Arlo, which all charge monthly fees to access your own footage.",
      },
      {
        q: "Do Eufy cameras hold up in Miami's heat and humidity?",
        a: "Yes. Eufy's outdoor cameras carry IP67 weatherproof ratings, which means they are fully sealed against dust and water immersion. They handle Florida's daily afternoon rain, 95-degree heat, high humidity, and salt air. The solar charging works better in Miami than almost anywhere else in the country because of the year-round sun.",
      },
      {
        q: "Do I need a professional to install Eufy cameras?",
        a: "Not for the solar or battery-powered cameras. They mount with a single bracket and connect to your Wi-Fi network. The floodlight camera requires a wired junction box, which an electrician can install in under an hour. The smart lock replaces your existing deadbolt and most homeowners can install it themselves with a screwdriver.",
      },
      {
        q: "Is the FamiLock S3 smart lock worth it?",
        a: "If you frequently deal with lost keys, kids coming home alone, or contractors needing access, yes. The palm vein recognition is particularly useful in Miami because fingerprint sensors often fail in high humidity. You get six ways to unlock the door, a built-in 2K camera, and 16 GB of local storage for door footage. No monthly fee.",
      },
      {
        q: "What is the best Eufy setup for a typical Miami-Dade home?",
        a: "For a standard single-family home or townhouse, start with the video doorbell and 5-piece alarm kit to cover your main entry. Then add the eufyCam S3 Pro 2-cam kit on solar for the sides and back. If you want full 360 coverage, upgrade to the S4 4-cam kit. The floodlight camera works great for garages or dark side alleys. Total investment for a solid four-camera setup with alarm runs around $700 to $900 with no ongoing fees.",
      },
      {
        q: "Can I use Eufy cameras with Alexa or Google?",
        a: "Yes. Eufy cameras work with both Amazon Alexa and Google Assistant. You can view live footage on an Echo Show or Google Nest Hub display, trigger automations, and use voice commands to arm and disarm the alarm system. The app is also available for iOS and Android.",
      },
    ],

    ctaHeadline: "Just Finished a Remodel? Protect Your Investment.",
    ctaSub:
      "You spent the money to get it right. Do not leave it unprotected. Eufy gives you professional security coverage without the professional security price tag.",
    ctaLink: "See Our Remodeling Services",
  },
  es: {
    breadcrumbs: [
      { name: "Inicio", href: "/es" },
      { name: "Seguridad del Hogar", href: "/es/home-security" },
    ],
    badge: "Seguridad del Hogar",
    heroHeadline: "Protege Tu Hogar. Sin Mensualidad. Sin Contratos.",
    heroSub:
      "Ya invertiste tiempo y dinero en tu hogar. Ahora protegelo. Las camaras y cerraduras inteligentes de Eufy te dan cobertura profesional sin la trampa de la suscripcion mensual.",
    stats: [
      { value: "Sin Cuota", label: "Cero costo mensual" },
      { value: "Solar", label: "Camaras inalambricas" },
      { value: "4K", label: "Video cristalino" },
      { value: "Local", label: "Tus datos, no la nube" },
    ],
    ctaPhone: "Llama al (786) 363-7039",
    ctaProducts: "Ver Todos los Productos",

    whyHeadline: "Por Que Eufy Funciona en Miami",
    whySub: "La mayoria de los sistemas de seguridad estan disenados para climas frios. Miami es diferente.",
    whyPoints: [
      {
        icon: "sun",
        title: "Camaras solares que realmente funcionan aqui",
        desc: "Miami tiene mas de 265 dias soleados al ano. Las camaras solares de Eufy se cargan con solo una hora de luz solar directa. Sin cables por el estuco o paredes de bloque.",
      },
      {
        icon: "cloud",
        title: "Sin mensualidad, jamas",
        desc: "Ring, Nest y Arlo cobran de $10 a $20 al mes por camara. Eufy guarda todo localmente. Pagas una vez y es tuyo.",
      },
      {
        icon: "shield",
        title: "Construido para el calor y la humedad",
        desc: "Las camaras Eufy tienen certificacion IP67. Soportan las lluvias de la tarde en Florida, el aire salado y el calor de 35 grados sin fallar.",
      },
      {
        icon: "wifi",
        title: "Tu grabacion permanece privada",
        desc: "El almacenamiento local en el HomeBase significa que tu video nunca va a un servidor que no controlas. Sin riesgo de brechas. Sin suscripcion para revisar tu grabacion.",
      },
    ],

    productsHeadline: "El Mejor Equipo Eufy para Hogares en Miami",
    productsSub: "Sin mensualidad en ninguno de estos. Compra una vez y listo.",
    affiliateDisclosure: "Como Asociado de Amazon, ganamos de las compras que califican. Esto nos ayuda a mantener nuestro contenido gratuito.",
    viewOnAmazon: "Ver en Amazon",
    whyMiami: "Por que funciona en Miami",

    setupHeadline: "Como Armar Tu Sistema",
    setupSub: "Empieza pequeno y agrega segun tu presupuesto. No necesitas todo a la vez.",
    steps: [
      {
        step: "Empieza Aqui",
        title: "Asegura tus puntos de entrada",
        desc: "El kit de alarma de 5 piezas y el timbre con camara cubren tu puerta principal primero. La mayoria de los robos ocurren por la puerta frontal. Estos dos juntos cuestan menos de $320.",
        products: ["Kit de Alarma 5 Piezas", "Timbre con Camara E340"],
      },
      {
        step: "Agrega Despues",
        title: "Cubre el perimetro",
        desc: "Agrega el kit S3 Pro de 2 camaras para vigilar los lados y la parte trasera de la casa. Con energia solar, sin necesidad de electricista.",
        products: ["eufyCam S3 Pro Kit 2 Camaras"],
      },
      {
        step: "Completa Todo",
        title: "Cubre cada angulo",
        desc: "Actualiza al kit S4 de 4 camaras o agrega la camara con reflector para cobertura total de 360. La cerradura inteligente reemplaza tu cerrojo y elimina el problema de las llaves perdidas.",
        products: ["eufyCam S4 Kit 4 Camaras o Reflector", "Cerradura FamiLock S3"],
      },
    ],

    faqHeadline: "Preguntas Frecuentes",
    faqs: [
      {
        q: "Las camaras Eufy requieren suscripcion mensual?",
        a: "No. Todos los productos Eufy en esta pagina guardan el video localmente en el dispositivo o en el hub HomeBase. Pagas una vez y eres dueno del equipo. Hay planes opcionales de almacenamiento en la nube, pero las camaras funcionan completamente sin ellos. Esta es la mayor ventaja sobre Ring, Nest y Arlo, que cobran mensualmente para acceder a tu propio video.",
      },
      {
        q: "Las camaras Eufy aguantan el calor y la humedad de Miami?",
        a: "Si. Las camaras exteriores de Eufy tienen certificacion IP67, lo que significa que estan completamente selladas contra polvo y agua. Soportan las lluvias diarias de la tarde en Florida, calor de 35 grados, alta humedad y aire salado. La carga solar funciona mejor en Miami que en casi cualquier otro lugar del pais por el sol durante todo el ano.",
      },
      {
        q: "Necesito un profesional para instalar las camaras Eufy?",
        a: "No para las camaras solares o de bateria. Se montan con un solo soporte y se conectan a tu red Wi-Fi. La camara con reflector requiere una caja de conexiones cableada, que un electricista puede instalar en menos de una hora. La cerradura inteligente reemplaza tu cerrojo existente y la mayoria de los propietarios pueden instalarla solos con un desarmador.",
      },
      {
        q: "Vale la pena la cerradura inteligente FamiLock S3?",
        a: "Si frecuentemente pierdes llaves, tienes hijos que llegan solos a casa, o necesitas darle acceso a personas como empleados del hogar, si vale la pena. El reconocimiento de vena de palma es especialmente util en Miami porque los sensores de huella digital fallan con frecuencia en ambientes de alta humedad. Tienes seis formas de abrir la puerta, una camara 2K integrada y 16 GB de almacenamiento local de video de la puerta. Sin mensualidad.",
      },
      {
        q: "Cual es la mejor configuracion de Eufy para una casa tipica en Miami-Dade?",
        a: "Para una casa unifamiliar o townhouse estandar, comienza con el timbre con camara y el kit de alarma de 5 piezas para cubrir la entrada principal. Luego agrega el kit eufyCam S3 Pro de 2 camaras con energia solar para los lados y la parte trasera. Si quieres cobertura total de 360 grados, actualiza al kit S4 de 4 camaras. La camara con reflector funciona bien para garajes o callejones oscuros. La inversion total para un buen sistema de 4 camaras con alarma esta entre $700 y $900 sin costos adicionales mensuales.",
      },
      {
        q: "Puedo usar las camaras Eufy con Alexa o Google?",
        a: "Si. Las camaras Eufy funcionan tanto con Amazon Alexa como con Google Assistant. Puedes ver video en vivo en un dispositivo Echo Show o Google Nest Hub, crear automatizaciones y usar comandos de voz para activar y desactivar el sistema de alarma. La app tambien esta disponible para iOS y Android.",
      },
    ],

    ctaHeadline: "Acabas de Remodelar? Protege Tu Inversion.",
    ctaSub:
      "Invertiste el dinero para hacerlo bien. No lo dejes desprotegido. Eufy te da cobertura de seguridad profesional sin el precio profesional.",
    ctaLink: "Ver Nuestros Servicios de Remodelacion",
  },
}

/* ========================================================================== */
/*  Icon helper                                                                */
/* ========================================================================== */

function WhyIcon({ icon }: { icon: string }) {
  const cls = "text-sage-muted"
  const size = 28
  switch (icon) {
    case "sun":    return <Sun size={size} weight="duotone" className={cls} />
    case "cloud":  return <CloudSlash size={size} weight="duotone" className={cls} />
    case "shield": return <ShieldCheck size={size} weight="duotone" className={cls} />
    case "wifi":   return <WifiHigh size={size} weight="duotone" className={cls} />
    default:       return <ShieldCheck size={size} weight="duotone" className={cls} />
  }
}

function ProductIcon({ icon }: { icon: string }) {
  const cls = "text-sage-muted"
  const size = 24
  switch (icon) {
    case "camera": return <Camera size={size} weight="bold" className={cls} />
    case "lock":   return <Lock size={size} weight="bold" className={cls} />
    case "bell":   return <Bell size={size} weight="bold" className={cls} />
    default:       return <Camera size={size} weight="bold" className={cls} />
  }
}

/* ========================================================================== */
/*  Page component                                                             */
/* ========================================================================== */

export default async function HomeSecurityPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const isEs = locale === "es"
  const t = isEs ? content.es : content.en

  /* ---------- JSON-LD ---------- */

  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: isEs
      ? "Seguridad para el Hogar en Miami | Camaras Eufy Sin Mensualidad"
      : "Home Security Miami | Eufy Cameras No Monthly Fee",
    description: isEs
      ? "Camaras y cerraduras inteligentes Eufy para hogares en Miami-Dade. Sin mensualidad. Solar, local storage, resistentes al clima de Florida."
      : "Eufy security cameras and smart locks for Miami-Dade homes. No monthly fees. Solar-powered, local storage, built for Florida weather.",
    url: isEs ? `${siteUrl}/es/home-security` : `${siteUrl}/en/home-security`,
    inLanguage: isEs ? "es" : "en",
    isPartOf: { "@type": "WebSite", url: siteUrl, name: "Broke & Fixed Home Solutions" },
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: t.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: t.breadcrumbs.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${siteUrl}${item.href}`,
    })),
  }

  return (
    <main className="min-h-screen">
      <JsonLd data={pageSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbSchema} />

      {/* ================================================================== */}
      {/*  SECTION 1: HERO                                                    */}
      {/* ================================================================== */}
      <section className="bg-espresso text-white">
        <div className="max-w-6xl mx-auto px-4 pt-6 pb-16 md:pb-24">
          <Breadcrumbs items={t.breadcrumbs} />

          <div className="pt-10 md:pt-16 max-w-4xl">
            <div className="flex items-center gap-2 text-sage-muted font-accent text-sm font-semibold uppercase tracking-widest mb-5">
              <ShieldCheck size={18} weight="bold" />
              <span>{t.badge}</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[0.95] tracking-tight mb-6">
              {t.heroHeadline}
            </h1>

            <p className="text-lg md:text-xl text-white/70 leading-relaxed mb-10 max-w-2xl">
              {t.heroSub}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <a
                href="#products"
                className="inline-flex items-center justify-center gap-2 bg-sage-muted text-white font-display font-bold text-lg px-8 py-4 rounded-lg hover:brightness-110 transition-all"
              >
                <ArrowRight size={20} weight="bold" />
                {t.ctaProducts}
              </a>
              <a
                href="tel:7863637039"
                className="inline-flex items-center justify-center gap-2 border-2 border-white/25 text-white font-display font-bold text-lg px-8 py-4 rounded-lg hover:bg-white/10 transition-all"
              >
                <Phone size={20} weight="bold" />
                {t.ctaPhone}
              </a>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {t.stats.map((stat, i) => {
                const icons = [
                  <SealCheck key="a" size={22} weight="bold" className="text-sage-muted" />,
                  <Sun key="b" size={22} weight="bold" className="text-sage-muted" />,
                  <Camera key="c" size={22} weight="bold" className="text-sage-muted" />,
                  <House key="d" size={22} weight="bold" className="text-sage-muted" />,
                ]
                return (
                  <div
                    key={i}
                    className="bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-center"
                  >
                    <div className="flex justify-center mb-2">{icons[i]}</div>
                    <div className="font-display text-2xl font-bold text-white">{stat.value}</div>
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
      {/*  SECTION 2: WHY EUFY IN MIAMI                                       */}
      {/* ================================================================== */}
      <section className="bg-cream">
        <div className="max-w-6xl mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-espresso leading-tight mb-4">
              {t.whyHeadline}
            </h2>
            <p className="text-warm-gray text-lg">{t.whySub}</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {t.whyPoints.map((point, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-6 border border-warm-gray-lighter/40 shadow-sm"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-sage-muted/10 flex items-center justify-center">
                    <WhyIcon icon={point.icon} />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-espresso mb-2">
                      {point.title}
                    </h3>
                    <p className="text-warm-gray text-sm leading-relaxed">{point.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/*  SECTION 3: PRODUCTS                                                */}
      {/* ================================================================== */}
      <section id="products" className="bg-white">
        <div className="max-w-6xl mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center mb-4">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-espresso leading-tight mb-4">
              {t.productsHeadline}
            </h2>
            <p className="text-warm-gray text-lg mb-2">{t.productsSub}</p>
          </div>

          {/* Affiliate disclosure */}
          <div className="max-w-3xl mx-auto mb-12">
            <p className="text-center text-xs text-warm-gray/70 italic border border-warm-gray-lighter/40 rounded-lg px-4 py-2 bg-cream">
              {t.affiliateDisclosure}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => {
              const name = isEs ? product.nameEs : product.name
              const category = isEs ? product.categoryEs : product.category
              const badge = isEs ? product.badgeEs : product.badge
              const features = isEs ? product.featuresEs : product.features
              const why = isEs ? product.whyEs : product.why

              return (
                <div
                  key={product.id}
                  className="bg-cream rounded-2xl overflow-hidden border border-warm-gray-lighter/40 flex flex-col"
                >
                  {/* Card header */}
                  <div className="bg-espresso text-white px-6 py-5">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <ProductIcon icon={product.icon} />
                        <span className="text-xs font-accent font-semibold uppercase tracking-wider text-white/60">
                          {category}
                        </span>
                      </div>
                      <span className="text-xs font-accent font-semibold uppercase tracking-wider text-sage-muted bg-sage-muted/15 px-3 py-1 rounded-full">
                        {badge}
                      </span>
                    </div>
                    <h3 className="font-display text-xl font-bold leading-tight">{name}</h3>
                    <div className="flex items-center gap-1 mt-2">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} size={14} weight="fill" className="text-sage-muted" />
                      ))}
                      <span className="text-white/50 text-xs ml-1">4.5+ on Amazon</span>
                    </div>
                  </div>

                  {/* Product image */}
                  <div className="bg-white flex items-center justify-center px-6 py-6 border-b border-warm-gray-lighter/30">
                    <Image
                      src={product.image}
                      alt={product.imageAlt}
                      width={220}
                      height={220}
                      className="object-contain w-full max-h-[200px]"
                    />
                  </div>

                  {/* Features */}
                  <div className="px-6 py-5 flex-1">
                    <ul className="space-y-2 mb-5">
                      {features.map((f, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-warm-gray">
                          <CheckCircle
                            size={16}
                            weight="fill"
                            className="text-green-500 flex-shrink-0 mt-0.5"
                          />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Miami tip */}
                    <div className="bg-sage-muted/8 border border-sage-muted/20 rounded-lg px-4 py-3 mb-5">
                      <p className="text-xs font-accent font-semibold uppercase tracking-wider text-sage-muted mb-1">
                        {t.whyMiami}
                      </p>
                      <p className="text-xs text-espresso leading-relaxed">{why}</p>
                    </div>

                    {/* Price + CTA */}
                    <div className="flex items-center justify-between">
                      <span className="font-display text-2xl font-black text-espresso">
                        {product.price}
                      </span>
                      <a
                        href={amazonUrl(product.asin)}
                        target="_blank"
                        rel="noopener noreferrer sponsored"
                        className="inline-flex items-center gap-2 bg-sage-muted text-white font-display font-bold text-sm px-5 py-2.5 rounded-lg hover:brightness-110 transition-all"
                      >
                        {t.viewOnAmazon}
                        <ArrowSquareOut size={16} weight="bold" />
                      </a>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/*  SECTION 4: HOW TO BUILD YOUR SETUP                                 */}
      {/* ================================================================== */}
      <section className="bg-espresso text-white">
        <div className="max-w-6xl mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4">
              {t.setupHeadline}
            </h2>
            <p className="text-white/65 text-lg">{t.setupSub}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {t.steps.map((step, i) => (
              <div
                key={i}
                className="bg-white/8 border border-white/12 rounded-xl p-6 hover:bg-white/12 transition-colors"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-sage-muted text-white font-display font-black text-sm">
                    {i + 1}
                  </span>
                  <span className="text-xs font-accent font-semibold uppercase tracking-wider text-sage-muted">
                    {step.step}
                  </span>
                </div>
                <h3 className="font-display text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed mb-4">{step.desc}</p>
                <div className="space-y-1">
                  {step.products.map((p, j) => (
                    <div key={j} className="flex items-center gap-2 text-xs text-white/50">
                      <CheckCircle size={12} weight="fill" className="text-sage-muted flex-shrink-0" />
                      <span>{p}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/*  SECTION 5: FAQ                                                     */}
      {/* ================================================================== */}
      <section className="bg-cream">
        <div className="max-w-4xl mx-auto px-4 py-16 md:py-24">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-espresso leading-tight mb-12 text-center">
            {t.faqHeadline}
          </h2>

          <div className="space-y-4">
            {t.faqs.map((faq, i) => (
              <details
                key={i}
                className="group bg-white rounded-xl border border-warm-gray-lighter/40 overflow-hidden"
              >
                <summary className="flex items-center justify-between gap-4 px-6 py-5 cursor-pointer list-none font-display font-bold text-espresso text-lg hover:bg-cream/50 transition-colors">
                  <span>{faq.q}</span>
                  <CaretDown
                    size={20}
                    weight="bold"
                    className="flex-shrink-0 text-warm-gray group-open:rotate-180 transition-transform duration-200"
                  />
                </summary>
                <div className="px-6 pb-5">
                  <p className="text-warm-gray leading-relaxed">{faq.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/*  SECTION 6: CTA                                                     */}
      {/* ================================================================== */}
      <section className="bg-espresso text-white">
        <div className="max-w-4xl mx-auto px-4 py-16 md:py-24 text-center">
          <ShieldCheck size={48} weight="duotone" className="text-sage-muted mx-auto mb-6" />
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4">
            {t.ctaHeadline}
          </h2>
          <p className="text-white/65 text-lg mb-10 max-w-2xl mx-auto">{t.ctaSub}</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`/${locale}`}
              className="inline-flex items-center justify-center gap-2 bg-sage-muted text-white font-display font-bold text-lg px-8 py-4 rounded-lg hover:brightness-110 transition-all"
            >
              <House size={20} weight="bold" />
              {t.ctaLink}
            </a>
            <a
              href="tel:7863637039"
              className="inline-flex items-center justify-center gap-2 border-2 border-white/25 text-white font-display font-bold text-lg px-8 py-4 rounded-lg hover:bg-white/10 transition-all"
            >
              <Phone size={20} weight="bold" />
              {isEs ? "Llama al (786) 363-7039" : "Call (786) 363-7039"}
            </a>
          </div>

          <div className="flex flex-wrap justify-center gap-6 mt-10">
            {[
              isEs ? "Empresa Familiar" : "Family Owned",
              isEs ? "Completamente Asegurada" : "Fully Insured",
              isEs ? "Miami-Dade County" : "Miami-Dade County",
            ].map((badge, i) => (
              <div key={i} className="flex items-center gap-2 text-white/50 text-sm">
                <CheckCircle size={16} weight="fill" className="text-sage-muted" />
                <span>{badge}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
