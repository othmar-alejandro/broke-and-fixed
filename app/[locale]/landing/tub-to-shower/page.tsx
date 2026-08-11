import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import {
  CheckCircle,
  Drop,
  HandSoap,
  Phone,
  Ruler,
  MapPin,
  ShieldCheck,
  Star,
  Wrench,
} from "@phosphor-icons/react/dist/ssr"

import JobPhoto from "@/components/landing/JobPhoto"
import Reveal from "@/components/landing/Reveal"
import BeforeAfter from "@/components/landing/BeforeAfter"
import QuoteForm from "@/components/landing/QuoteForm"
import AboutUs from "@/components/landing/AboutUs"
import CapacityBand from "@/components/landing/CapacityBand"
import TrustFacts from "@/components/landing/TrustFacts"
import ExitIntent from "@/components/landing/ExitIntent"
import FunnelTracking from "@/components/landing/FunnelTracking"
import GuideCapture from "@/components/landing/GuideCapture"
import { BASE_PRICE, formatUSD } from "@/lib/landing/quote-pricing"
import "./landing.css"

/**
 * Bilingual page, one file. Every visible string sits inside t("en", "es"),
 * with the Spanish RIGHT NEXT to the English it translates. That colocation is
 * the point: a price or copy change that edits one language cannot miss the
 * other, because the other one is on the same line. Do not split this into a
 * translations file, and do not add a string without both languages.
 *
 * Spanish register: usted, Miami vocabulary (vanity, tope, zocalo, porcelanato)
 * and the same trade voice as the English. The project language rules and
 * punctuation rules apply to both languages.
 *
 * Prices interpolate from BASE_PRICE in quote-pricing.ts. Never hardcode a
 * dollar figure in copy here: the cards, the FAQ, the hero and the form all
 * have to move together, and on 8 Aug 2026 they were three separate edits.
 */

const PHONE = "(786) 363-7039"
const TEL = "+17863637039"
const QUOTE_HREF = "#quote"
const GOOGLE_REVIEWS_URL =
  "https://www.google.com/maps/place/?q=place_id:ChIJ7VSW8vHbAgMRvNWjsiV5kII"

/**
 * Read off the live Google Business Profile on 8 Aug 2026. Owner decision,
 * 9 Aug 2026: show the rating WITHOUT the review count while the count is
 * still small. Revisit once the profile has enough reviews that the number
 * helps instead of shrinks. The "Read all of them on Google" link stays, so
 * nobody is hiding the denominator from a visitor who wants it.
 */
const GOOGLE_RATING = "4.9"

/**
 * Real, public Google reviews from the business profile, quoted from the
 * owner's own captures. Rules for this list, do not break them:
 * - Public Google reviews only. Private WhatsApp or email messages need the
 *   customer's explicit OK before they appear here.
 * - Quote what the review says. Never trim a quote in a way that changes what
 *   the reviewer meant.
 * - Spanish reviews stay in Spanish. Half this county reads them fine, and a
 *   translated quote is no longer a quote. The QUOTES are identical on both
 *   language versions; only the detail label under the name translates.
 */
const REVIEWS = [
  {
    quote:
      "Byron and his crew are wonderful. Great communication and good work. Bathroom remodel came out great and other little projects he did. He's always trying to find the best price. Will call them again.",
    name: "Suzie B.",
    detail: "Bathroom remodel",
    detailEs: "Remodelación de baño",
  },
  {
    quote:
      "Excelente trabajo! Muy profesional, puntuales, responasables 100% recomendados",
    name: "Estefania D.",
    detail: "Reseña en Google",
    detailEs: "Reseña en Google",
  },
  {
    quote:
      "Hired these guys for a full home project including painting, kitchen cabinets, and bathroom installations.",
    name: "Sean I.",
    detail: "Full home project",
    detailEs: "Proyecto de casa completa",
  },
]

/**
 * Photos point straight at the existing library in /public/images so there is
 * one copy of each file, not a duplicate set. JobPhoto ignores the extension,
 * so .jpeg and .png resolve fine against these names.
 *
 * Glenvar Heights (Anna Vidal) is the anchor job. before-3 and after-1 are both
 * shot from the doorway, which is why they work in the comparison slider.
 */
const PHOTO = {
  before: "/images/glenvar-before-3.jpg",
  afterWide: "/images/glenvar-after-1.jpg",
  // Slider-only crops of the two shots above, cut down to the tub/shower
  // wall. In the full frames both subjects sit on the LEFT, so a 50% wipe
  // composited old tub + new vanity. These crops make every handle position
  // compare the same wall, and both keep the window the caption points at.
  sliderBefore: "/images/glenvar-before-3-slider.jpg",
  sliderAfter: "/images/glenvar-after-1-slider.jpg",
  // Killian job in the safety section, owner instruction 11 Aug 2026:
  // Glenvar already carries the hero, the slider and the level 3 card, and
  // a fourth appearance started reading like we only ever did one bathroom.
  // The Killian shower has a sliding door and a LOW CURB, not curbless, so
  // the section copy describes that. Do not re-attach the curbless claims
  // to this photo.
  safety: "/images/Killian-tub-to-shower-results.jpeg",
  // glenvar-demo and glenvar-waterproofing came off the timeline on owner
  // instruction, 10 Aug 2026. The files stay in /public/images.
  // Owner-assigned 9 Aug 2026. Hammocks shows a finished alcove shower with
  // the room around it untouched, which is the level 1 story. Crossings shows
  // shower plus a new floor through the room with the modest vanity kept,
  // which is level 2. Pinecrest and South Miami stay gallery-only because
  // both read as full remodels and would oversell the lower tiers.
  // These are 16:10 card crops of the gallery originals: the full Hammocks
  // frame has tile spacers and a rag in the untouched room, and the full
  // Crossings frame spends a quarter of the width on the open door.
  level1: "/images/work-hammocks-level1-card.jpg",
  level2: "/images/work-crossings-level2-card.jpg",
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const es = locale === "es"
  const from = formatUSD(BASE_PRICE["shower-only"])

  return {
    title: es
      ? "Conversión de bañera a ducha en Miami-Dade | Broke & Fixed"
      : "Tub to Shower Conversion in Miami-Dade | Broke & Fixed",
    description: es
      ? `Quitamos su bañera y construimos una ducha de porcelanato bien impermeabilizada en más o menos una semana. Precios honestos desde ${from}. Empresa familiar y totalmente asegurada en todo Miami-Dade.`
      : `We take out your tub and build a real tiled walk-in shower in about a week. Honest starting prices from ${from}. Fully insured, family owned, serving all of Miami-Dade.`,
    alternates: {
      canonical: `/${es ? "es" : "en"}/landing/tub-to-shower`,
      languages: {
        en: "/en/landing/tub-to-shower",
        es: "/es/landing/tub-to-shower",
        "x-default": "/en/landing/tub-to-shower",
      },
    },
  }
}

const AREAS = [
  "Kendall", "West Kendall", "The Hammocks", "The Crossings",
  "Kendale Lakes", "Palmetto Bay", "Pinecrest", "Cutler Bay",
  "South Miami", "South Miami Heights", "Westchester", "Country Walk",
  "Coral Gables", "Doral", "Sweetwater", "Coconut Grove", "Miami Gardens",
]

export default async function TubToShowerLanding({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const es = locale === "es"
  const t = (en: string, esText: string) => (es ? esText : en)

  /* Published starting prices, formatted once. The ONLY source is
     quote-pricing.ts, so the cards, the FAQ and the form can never disagree. */
  const P1 = formatUSD(BASE_PRICE["shower-only"])
  const P2 = formatUSD(BASE_PRICE["shower-floor"])
  const P3 = formatUSD(BASE_PRICE["full-remodel"])

  /* One illustrated spot icon per day, generated as a matched set in the
     same flat navy-and-orange style as the comparison cutaways (Higgsfield,
     10 Aug 2026). They live in /public/landing/tub-to-shower/. If a day ever
     changes, regenerate in the SAME style, do not mix in a lone Phosphor
     glyph or a stock icon. */
  const DAYS = [
    {
      d: t("Day 1", "Día 1"),
      t: t("Demo", "Demolición"),
      img: "/landing/tub-to-shower/day-1.png",
      b: t(
        "We cover your floors, pull the tub, and haul it out.",
        "Cubrimos sus pisos, sacamos la bañera y nos la llevamos.",
      ),
    },
    {
      d: t("Day 2", "Día 2"),
      t: t("Plumbing", "Plomería"),
      img: "/landing/tub-to-shower/day-2.png",
      b: t(
        "Valve and drain. Electrical too if the job calls for it.",
        "Válvula y desagüe. También electricidad si el trabajo lo pide.",
      ),
    },
    {
      d: t("Day 3", "Día 3"),
      t: t("Waterproofing", "Impermeabilización"),
      img: "/landing/tub-to-shower/day-3.png",
      b: t(
        "Cement board goes up, then the pan liner and membrane.",
        "Va la placa de cemento, después el plato de ducha y la membrana.",
      ),
    },
    {
      d: t("Day 4", "Día 4"),
      t: t("It cures", "Cura"),
      img: "/landing/tub-to-shower/day-4.png",
      b: t(
        "Nobody is in your house. This day is not optional.",
        "No hay nadie en su casa. Este día no es opcional.",
      ),
    },
    {
      d: t("Day 5", "Día 5"),
      t: t("Tile", "Azulejo"),
      img: "/landing/tub-to-shower/day-5.png",
      b: t(
        "Porcelain goes on the walls and the shower floor.",
        "El porcelanato va en las paredes y el piso de la ducha.",
      ),
    },
    {
      d: t("Day 6", "Día 6"),
      t: t("Grout", "Lechada"),
      img: "/landing/tub-to-shower/day-6.png",
      b: t(
        "Grout goes in and gets time to set properly.",
        "Se aplica la lechada y se le da tiempo de fraguar bien.",
      ),
    },
    {
      d: t("Day 7", "Día 7"),
      t: t("Finish", "Acabados"),
      img: "/landing/tub-to-shower/day-7.png",
      b: t(
        "Glass, fixtures, paint, cleanup, and we walk it with you.",
        "Cristal, grifería, pintura, limpieza, y lo revisamos con usted.",
      ),
    },
  ]

  const LEVELS = [
    {
      name: t("Tub out, shower in", "Sale la bañera, entra la ducha"),
      price: P1,
      photo: PHOTO.level1,
      need: "The Hammocks alcove shower. Finished shower, room untouched.",
      alt: t(
        "Tiled walk-in shower with white porcelain walls and a black hex mosaic floor built in a tub footprint in The Hammocks, Miami-Dade",
        "Ducha de azulejo con paredes de porcelanato blanco y piso de mosaico hexagonal negro construida en el espacio de una bañera en The Hammocks, Miami-Dade",
      ),
      does: [
        t("Pull the tub and haul it away", "Sacamos la bañera y nos la llevamos"),
        t("Build and waterproof the shower", "Construimos e impermeabilizamos la ducha"),
        t("Porcelain tile inside the shower", "Porcelanato dentro de la ducha"),
        t("New valve, fixtures and glass", "Válvula, grifería y cristal nuevos"),
      ],
      keeps: t(
        "Your floor, vanity and toilet stay as they are.",
        "Su piso, su vanity y su inodoro quedan como están.",
      ),
      featured: false,
    },
    {
      name: t("Shower and floor", "Ducha y piso"),
      price: P2,
      photo: PHOTO.level2,
      need: "The Crossings. Shower plus new floor, vanity kept.",
      alt: t(
        "Walk-in shower with green porcelain tile and a new patterned hex mosaic floor through the bathroom in The Crossings, Miami-Dade",
        "Ducha con porcelanato verde y un piso nuevo de mosaico hexagonal con diseño en todo el baño en The Crossings, Miami-Dade",
      ),
      does: [
        t("Everything in the first level", "Todo lo del primer nivel"),
        t(
          "New porcelain floor through the bathroom",
          "Piso de porcelanato nuevo en todo el baño",
        ),
        t("New baseboard", "Zócalo nuevo"),
        t("Fresh paint", "Pintura fresca"),
      ],
      keeps: t(
        "A new shower next to a twenty year old floor looks unfinished. This is the one most people pick.",
        "Una ducha nueva junto a un piso de veinte años se ve a medias. Este es el que más eligen.",
      ),
      featured: true,
    },
    {
      name: t("Full remodel", "Remodelación completa"),
      price: P3,
      photo: PHOTO.afterWide,
      need: "Glenvar Heights after, wide shot from the doorway. Photo 6.",
      alt: t(
        "Full bathroom remodel in Glenvar Heights with a curbless walk-in shower, floating vanity and porcelain tile",
        "Remodelación completa de baño en Glenvar Heights con ducha a ras de piso, vanity flotante y porcelanato",
      ),
      does: [
        t("Shower, wall tile and floor tile", "Ducha, azulejo de pared y de piso"),
        t("New vanity and countertop", "Vanity y tope nuevos"),
        t("New toilet", "Inodoro nuevo"),
        t("Lighting and paint", "Iluminación y pintura"),
      ],
      keeps: t("The entire room, done at once.", "El cuarto entero, todo de una vez."),
      featured: false,
    },
  ]

  const WORK = [
    {
      src: "/images/work-the-crossings-conversion.jpeg",
      area: "The Crossings",
      job: t(
        "Tub to shower conversion, mid install",
        "Conversión de bañera a ducha, en instalación",
      ),
      alt: t(
        "Tub to shower conversion in The Crossings with porcelain wall tile, a black hex shower floor and a tiled niche, photographed during installation",
        "Conversión de bañera a ducha en The Crossings con azulejo de porcelanato, piso de ducha de hexágono negro y nicho de azulejo, fotografiada durante la instalación",
      ),
    },
    {
      src: "/images/work-pinecrest-full-remodel.jpeg",
      area: "Pinecrest",
      job: t("Full bathroom remodel", "Remodelación completa de baño"),
      alt: t(
        "Full bathroom remodel in Pinecrest with green marble look porcelain, a penny tile accent column and a curbless shower with a linear drain",
        "Remodelación completa de baño en Pinecrest con porcelanato imitación mármol verde, columna de acento de penny tile y ducha a ras de piso con desagüe lineal",
      ),
    },
    {
      src: "/images/work-hammocks-master-remodel.jpeg",
      area: "The Hammocks",
      job: t("Master bathroom remodel", "Remodelación de baño principal"),
      alt: t(
        "Master bathroom remodel in The Hammocks with a double shower, two rain heads, a tiled bench and a glass divider",
        "Remodelación de baño principal en The Hammocks con ducha doble, dos regaderas de lluvia, banco de azulejo y división de cristal",
      ),
    },
    {
      src: "/images/work-south-miami-master-remodel.jpeg",
      area: "South Miami",
      job: t("Master bathroom remodel", "Remodelación de baño principal"),
      alt: t(
        "Master bathroom remodel in South Miami with a floating vanity, wall hung toilet and white marble look porcelain",
        "Remodelación de baño principal en South Miami con vanity flotante, inodoro suspendido y porcelanato imitación mármol blanco",
      ),
    },
  ]

  const FAQS = [
    {
      q: t(
        "What does a tub to shower conversion cost in Miami-Dade?",
        "¿Cuánto cuesta convertir una bañera en ducha en Miami-Dade?",
      ),
      a: t(
        `Most of our conversions start at ${P1} for taking the tub out and building a tiled walk-in shower in its place, keeping your existing floor, vanity and toilet. Adding a new porcelain floor through the whole bathroom starts at ${P2}. A full remodel with a new vanity and toilet starts at ${P3}. Those are starting numbers and bathroom size moves them, which is why we measure before we give you a firm price. Older homes with cast iron drain lines can add to the job as well. We tell you that before we start, not after. If you want a range for your specific bathroom, complete three short steps and we will send one over the same day.`,
        `La mayoría de nuestras conversiones empieza en ${P1} por sacar la bañera y construir en su lugar una ducha de azulejo, conservando su piso, su vanity y su inodoro. Agregar un piso de porcelanato nuevo en todo el baño empieza en ${P2}. Una remodelación completa con vanity e inodoro nuevos empieza en ${P3}. Son números iniciales y el tamaño del baño los mueve, por eso medimos antes de darle un precio firme. Las casas más viejas con líneas de desagüe de hierro fundido también pueden sumar al trabajo. Se lo decimos antes de empezar, no después. Si quiere un rango para su baño específico, complete tres pasos cortos y se lo mandamos el mismo día.`,
      ),
    },
    {
      q: t(
        "How long will my bathroom be out of service?",
        "¿Cuánto tiempo estará mi baño fuera de servicio?",
      ),
      a: t(
        "About a week for a straightforward conversion. Day one is demo, day two is plumbing and any electrical, day three is cement board and waterproofing, day four the waterproofing cures with nobody in your house, day five is tile, day six is grout, and day seven is glass, fixtures, paint and cleanup. Tricky tile layouts or extra electrical can add a day. We tell you which at the quote. Because the job runs about a week, most of our customers have a second bathroom in the house. If yours is the only one, tell us up front and we will talk honestly about whether the timing works for you.",
        "Más o menos una semana para una conversión sencilla. El día uno es demolición, el día dos plomería y electricidad si hace falta, el día tres placa de cemento e impermeabilización, el día cuatro la impermeabilización cura sin nadie en su casa, el día cinco azulejo, el día seis lechada, y el día siete cristal, grifería, pintura y limpieza. Diseños de azulejo complicados o electricidad extra pueden sumar un día. Se lo decimos en la cotización. Como el trabajo toma cerca de una semana, la mayoría de nuestros clientes tiene un segundo baño en la casa. Si el suyo es el único, díganoslo desde el principio y hablamos con honestidad de si el tiempo le funciona.",
      ),
    },
    {
      q: t(
        "Why do other companies say one day and you say a week?",
        "¿Por qué otras compañías dicen un día y ustedes una semana?",
      ),
      a: t(
        "Because they are doing a different job. A one day install bonds an acrylic liner over the wall that is already there. Nothing gets removed, so nothing has to cure, and the whole thing goes in between breakfast and dinner. We take the old wall out down to the studs, put up cement board, install a pan liner and a waterproofing membrane, and let that membrane cure before a single tile goes on. That cure day is the difference between a shower that lasts and a leak behind your wall in two years. If you want it done in a day, a liner company can do that. We would rather build it properly.",
        "Porque están haciendo un trabajo distinto. Una instalación de un día pega un forro de acrílico sobre la pared que ya está. No se quita nada, así que nada tiene que curar, y todo queda puesto entre el desayuno y la cena. Nosotros quitamos la pared vieja hasta la estructura, ponemos placa de cemento, instalamos el plato de ducha y una membrana impermeabilizante, y dejamos que esa membrana cure antes de poner un solo azulejo. Ese día de curado es la diferencia entre una ducha que dura y una filtración detrás de su pared en dos años. Si lo quiere en un día, una compañía de forros se lo hace. Nosotros preferimos construirlo bien.",
      ),
    },
    {
      q: t("Do you move the plumbing?", "¿Mueven la plomería?"),
      a: t(
        "No, and that is on purpose. Your new shower goes exactly where the tub is now. Relocating supply and drain lines is what turns a clean one week job into a three week demolition, and it can double the bill. Keeping the shower in the tub footprint is what lets us give you an honest starting price and a timeline you can plan around. If you have your heart set on moving the shower to a different wall, we are happy to look at it, but be aware it becomes a different project with a different budget.",
        "No, y es a propósito. Su ducha nueva va exactamente donde hoy está la bañera. Reubicar las líneas de agua y desagüe es lo que convierte un trabajo limpio de una semana en una demolición de tres, y puede duplicar la cuenta. Mantener la ducha en el espacio de la bañera es lo que nos permite darle un precio inicial honesto y un calendario con el que puede planificar. Si tiene el corazón puesto en mover la ducha a otra pared, con gusto lo miramos, pero sepa que se vuelve otro proyecto con otro presupuesto.",
      ),
    },
    {
      q: t(
        "Will it look cheap, like a plastic insert?",
        "¿Se verá barato, como un inserto plástico?",
      ),
      a: t(
        "No. We install real porcelain tile on a properly waterproofed substrate, the same way a full custom bathroom gets built. You pick the tile. Large format porcelain that looks like marble is popular right now and it is easier to keep clean than small tile because there is far less grout. We can add a niche for shampoo, a fold down seat, and grab bars that look like towel bars rather than hospital hardware. Look at the photos on this page. That is our actual work in Miami-Dade homes, not a showroom.",
        "No. Instalamos porcelanato de verdad sobre una base bien impermeabilizada, igual que se construye un baño completo a la medida. Usted escoge el azulejo. El porcelanato de formato grande que parece mármol está muy de moda y es más fácil de mantener limpio que el azulejo pequeño, porque tiene mucha menos lechada. Podemos agregar un nicho para el champú, un asiento plegable y barras de apoyo que parecen toalleros y no equipo de hospital. Mire las fotos de esta página. Ese es nuestro trabajo real en casas de Miami-Dade, no un showroom.",
      ),
    },
    {
      q: t(
        "Does removing the tub hurt my resale value?",
        "¿Quitar la bañera afecta el valor de reventa?",
      ),
      a: t(
        "It depends on how many bathrooms you have. If your home has two or more bathrooms and at least one keeps a tub, converting the other to a walk-in shower is generally a plus, especially in South Florida where a lot of buyers are looking for accessible features. If it is your only bathroom and you have small children, keeping a tub somewhere in the house is worth thinking about. We will give you a straight answer for your specific situation when we come measure. We would rather talk you out of a job than sell you one you regret.",
        "Depende de cuántos baños tenga. Si su casa tiene dos o más baños y al menos uno conserva bañera, convertir el otro en ducha generalmente suma, sobre todo en el sur de la Florida, donde muchos compradores buscan accesibilidad. Si es su único baño y tiene niños pequeños, vale la pena pensar en conservar una bañera en alguna parte de la casa. Le daremos una respuesta directa para su situación cuando vayamos a medir. Preferimos quitarle la idea de un trabajo antes que venderle uno del que se arrepienta.",
      ),
    },
    {
      q: t("Do I need a permit?", "¿Necesito permiso?"),
      a: t(
        "For a straight tub to shower conversion in the same footprint, with no wall moved and no plumbing relocated, permitting requirements are limited. Florida HB 803 also exempts a range of cosmetic work from permitting. That said, requirements vary by municipality across Miami-Dade, and we would rather check than guess. We will tell you exactly what your job needs when we measure. We do not start work and figure out the paperwork later.",
        "Para una conversión directa de bañera a ducha en el mismo espacio, sin mover paredes ni plomería, los requisitos de permisos son limitados. La ley HB 803 de la Florida también exime de permisos varios trabajos cosméticos. Dicho eso, los requisitos varían según el municipio en Miami-Dade, y preferimos verificar antes que adivinar. Le diremos exactamente qué necesita su trabajo cuando midamos. No empezamos la obra para resolver el papeleo después.",
      ),
    },
    {
      q: t(
        "Who actually shows up at my house?",
        "¿Quién llega de verdad a mi casa?",
      ),
      a: t(
        "Our trades. The plumber does the plumbing, the tile setter does the tile, because that is how you get good work. What stays constant is us. One of us is at your house every day of the job, me or my brother. We are the owners and we are the ones you call if something is not right. You will not get passed to a call center or a project manager you have never met. We are a family business, we are fully insured, and every job gets a one year workmanship warranty in writing.",
        "Nuestros oficios. El plomero hace la plomería y el azulejista pone el azulejo, porque así se logra buen trabajo. Lo que no cambia somos nosotros. Uno de los dos está en su casa cada día del trabajo, mi hermano o yo. Somos los dueños y somos a quienes llama si algo no está bien. No lo van a pasar a un call center ni a un gerente de proyecto que nunca conoció. Somos una empresa familiar, estamos totalmente asegurados y cada trabajo lleva garantía de mano de obra de un año por escrito.",
      ),
    },
  ]

  /* Rendered twice was a bug: the headgrid comment says the qualifier moved up
     "instead of orphaned below", so the orphan is gone and this is the single
     copy. */
  const priceNote = t(
    "These are starting prices. Bathroom size moves the number, so we measure before we quote. Your shower goes exactly where the tub is now. We do not relocate plumbing, because that is what turns a clean job into a three week demolition. You pay by milestone as each stage finishes, never everything up front, and the whole job carries a one year workmanship warranty in writing.",
    "Son precios iniciales. El tamaño del baño mueve el número, por eso medimos antes de cotizar. Su ducha va exactamente donde hoy está la bañera. No movemos la plomería, porque eso convierte un trabajo limpio en una demolición de tres semanas. Usted paga por etapas a medida que el trabajo avanza, nunca todo por adelantado, y todo el trabajo lleva garantía de mano de obra de un año por escrito.",
  )

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  }

  return (
    <div className="lp">
      <FunnelTracking />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Sticky call bar. Highest ROI element on the page for this audience. */}
      <div className="lp-sticky sticky top-0 z-50 bg-[var(--lp-orange)] text-[var(--lp-on-orange)]">
        <div className="lp-wrap flex items-center justify-between gap-3 py-2">
          {/* The logo answers "who is this company" in the first 200ms. An
              unbranded page reads as a lead broker. Text hides on the
              narrowest phones so the number never wraps; the mark stays. */}
          <span className="flex min-w-0 items-center gap-2.5">
            <Image
              src="/logo-160.webp"
              alt="Broke & Fixed Home Solutions"
              width={34}
              height={34}
              className="shrink-0"
            />
            <span className="hidden text-[15px] font-semibold leading-tight min-[440px]:block">
              {t("Free quote. No pressure.", "Cotización gratis. Sin presión.")}
            </span>
          </span>
          <a
            href={`tel:${TEL}`}
            className="lp-display flex min-h-[44px] w-full items-center justify-center gap-2 whitespace-nowrap rounded-[var(--lp-r-2)] bg-[var(--lp-navy-deep)] px-5 text-[1.15rem] tracking-wide text-white focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-white min-[400px]:w-auto"
          >
            <Phone size={19} weight="fill" aria-hidden="true" />
            {PHONE}
          </a>
        </div>
      </div>

      {/* HERO. Split: promise left, proof right. */}
      <header className="border-b border-[var(--lp-rule)] bg-white">
        <div className="lp-wrap grid items-center gap-10 pb-14 pt-12 md:grid-cols-2 md:gap-14 md:pb-20 md:pt-20">
          <div>
            <p className="lp-label mb-4 text-[var(--lp-orange-text)]">
              {t("Miami-Dade County", "Condado de Miami-Dade")}
            </p>
            <h1 className="lp-display lp-h-hero">
              {t(
                "Your tub becomes a walk-in shower",
                "Su bañera se convierte en una ducha moderna",
              )}
            </h1>
            <p className="mt-5 max-w-[46ch] text-[1.15rem] text-[var(--lp-ink-2)]">
              {t(
                `Porcelain tile, properly waterproofed, built where your tub is now. About a week start to finish. Starting at ${P1}.`,
                `Porcelanato bien impermeabilizado, construido donde hoy está su bañera. Más o menos una semana de principio a fin. Desde ${P1}.`,
              )}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link href={QUOTE_HREF} className="lp-cta">
                {t("Get my price", "Ver mi precio")}
              </Link>
              <a
                href={`tel:${TEL}`}
                className="lp-display inline-flex min-h-[44px] items-center px-1 text-[1.15rem] text-[var(--lp-navy)] underline underline-offset-4 focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[var(--lp-navy)]"
              >
                {t("Or call", "O llame al")} {PHONE}
              </a>
            </div>
          </div>

          <JobPhoto
            src={PHOTO.afterWide}
            alt={t(
              "Curbless walk-in shower with a linear drain and porcelain tile after a tub to shower conversion in Glenvar Heights, Miami-Dade",
              "Ducha a ras de piso con desagüe lineal y porcelanato después de una conversión de bañera a ducha en Glenvar Heights, Miami-Dade",
            )}
            need="Glenvar Heights after, wide shot from the doorway. Photo 6 in the set you sent."
            ratio="3 / 4"
            priority
            sizes="(max-width: 768px) 100vw, 560px"
          />
        </div>
      </header>

      {/* TRUST STRIP */}
      <section className="lp-trust lp-dark py-5">
        <div className="lp-wrap grid grid-cols-2 gap-x-6 gap-y-4 md:flex md:items-center md:justify-between">
          {/* The rating leads, and it carries its count. A star rating with no
              denominator is what the franchises print, and a skeptic reads the
              missing number as the answer. */}
          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-[44px] items-center gap-2.5 underline-offset-4 hover:underline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <Star
              size={22}
              weight="fill"
              className="shrink-0 text-[#f5b301]"
              aria-hidden="true"
            />
            <span className="text-[15px] font-medium">
              {GOOGLE_RATING} {t("on Google", "en Google")}
            </span>
          </a>

          {[
            { Icon: ShieldCheck, label: t("Fully insured", "Totalmente asegurados") },
            { Icon: HandSoap, label: t("Family owned", "Empresa familiar") },
            {
              Icon: Ruler,
              label: t("One year written warranty", "Garantía de un año por escrito"),
            },
          ].map(({ Icon, label }) => (
            <div key={label} className="flex items-center gap-2.5">
              <Icon
                size={22}
                weight="duotone"
                className="shrink-0 text-[var(--lp-orange)]"
                aria-hidden="true"
              />
              <span className="text-[15px] font-medium">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* BEFORE / AFTER */}
      <section className="lp-section bg-white">
        <div className="lp-wrap">
          <Reveal>
            <h2 className="lp-display max-w-[18ch] lp-h-arg">
              {t(
                "Same bathroom. Same footprint. One week apart.",
                "El mismo baño. El mismo espacio. Una semana de diferencia.",
              )}
            </h2>
            <p className="lp-lede mt-4">
              {t(
                "Drag the handle. Every one of these is a real Miami-Dade home, photographed the day we finished.",
                "Arrastre el control. Cada foto es una casa real de Miami-Dade, tomada el día que terminamos.",
              )}
            </p>
          </Reveal>

          <Reveal delay={0.08} className="mt-10">
            <div className="mx-auto max-w-[860px]">
              <BeforeAfter
                caption={t(
                  "Glenvar Heights. The tub came out, the shower went in curbless with a linear drain. Look at the window in both shots. Same room, same wall, one week apart.",
                  "Glenvar Heights. La bañera salió y entró una ducha a ras de piso con desagüe lineal. Mire la ventana en las dos fotos. El mismo cuarto, la misma pared, una semana de diferencia.",
                )}
                beforeLabel={t("Before", "Antes")}
                afterLabel={t("After", "Después")}
                handleAriaLabel={t(
                  "Drag to compare before and after",
                  "Arrastre para comparar el antes y el después",
                )}
                valueTextTemplate={t(
                  "{pct}% of the before photo showing",
                  "Se muestra el {pct}% de la foto de antes",
                )}
                before={
                  <JobPhoto
                    src={PHOTO.sliderBefore}
                    alt={t(
                      "Bathroom with a wall to wall alcove bathtub and shower curtain before conversion in Glenvar Heights",
                      "Baño con bañera de pared a pared y cortina de ducha antes de la conversión en Glenvar Heights",
                    )}
                    need="Glenvar Heights before, cropped to the tub wall. Photo 1."
                    ratio="3 / 4"
                    sizes="(max-width: 900px) 100vw, 860px"
                  />
                }
                after={
                  <JobPhoto
                    src={PHOTO.sliderAfter}
                    alt={t(
                      "Curbless walk-in shower with black hex mosaic floor and frameless glass after a tub to shower conversion in Glenvar Heights",
                      "Ducha a ras de piso con mosaico hexagonal negro y cristal sin marco después de una conversión de bañera a ducha en Glenvar Heights",
                    )}
                    need="Glenvar Heights after, cropped to the shower wall. Photo 6."
                    ratio="3 / 4"
                    sizes="(max-width: 900px) 100vw, 860px"
                  />
                }
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* PRICE LEVELS */}
      <section className="lp-section bg-[var(--lp-cream)]" id="pricing">
        <div className="lp-wrap">
          {/* Ledger head: the qualifier moves up into what used to be ~600px
              of dead gutter beside the intro, instead of orphaned below. */}
          <Reveal>
            <div className="lp-headgrid">
              <div>
                <h2 className="lp-display lp-h-thesis">
                  {t(
                    "What a tub to shower conversion actually costs",
                    "Lo que de verdad cuesta convertir una bañera en ducha",
                  )}
                </h2>
                <p className="lp-lede mt-4">
                  {t(
                    "Not one of the national bath companies will give you a price without an appointment in your kitchen. Here are three levels of scope and three honest starting numbers.",
                    "Ninguna de las compañías nacionales de baños le da un precio sin mandarle un vendedor a la casa. Aquí tiene tres niveles de trabajo y tres precios iniciales honestos.",
                  )}
                </p>
              </div>
              <p className="lp-note mt-8 lg:mt-0">{priceNote}</p>
            </div>
          </Reveal>

          <div className="lp-levels mt-12 grid gap-7">
            {/* No stagger: these sit side by side, and a stagger on a
                horizontal row reads as three cards at different opacities. */}
            {LEVELS.map((lv) => (
              <Reveal key={lv.name}>
                <div
                  className={`lp-level lp-card flex h-full flex-col overflow-hidden ${
                    lv.featured ? "lp-level--featured lp-e3" : "lp-e1"
                  }`}
                >
                  {/* The flag is its own band above the photo, not an inline
                      label, so every h3 in the row stays on one baseline. */}
                  {lv.featured ? (
                    <span className="lp-level__flag">
                      {t("Most people pick this", "El que más eligen")}
                    </span>
                  ) : (
                    <span className="lp-level__flag lp-level__flag--ghost" aria-hidden="true" />
                  )}
                  <JobPhoto
                    src={lv.photo}
                    alt={lv.alt}
                    need={lv.need}
                    ratio="16 / 10"
                    className="lp-level__media"
                    sizes="(max-width: 768px) 100vw, 420px"
                  />
                  <div className="lp-level__body">
                    <h3 className="lp-display text-[1.6rem]">{lv.name}</h3>
                    <p className="lp-display mt-2 text-[2.6rem] text-[var(--lp-orange-text)]">
                      {t("From", "Desde")} {lv.price}
                    </p>
                    <ul className="mt-4 flex flex-col gap-2">
                      {lv.does.map((d) => (
                        <li key={d} className="flex gap-2.5 text-[16px]">
                          <CheckCircle
                            size={19}
                            weight="fill"
                            className="mt-[3px] shrink-0 text-[var(--lp-green)]"
                            aria-hidden="true"
                          />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                    {/* Filled footer band pinned to the bottom, so leftover
                        card height lands inside a surface instead of as a gap */}
                    <p className="lp-level__keeps">{lv.keeps}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Lower-intent path. The estimator remains the main action. This gives
          researchers something useful without turning the whole page into an
          email gate. */}
      <GuideCapture locale={locale} />

      {/* REVIEWS. Directly after the prices: the buyer just saw a number and
          needs permission from other humans before acting on it. */}
      <section className="lp-section lp-section--util bg-white">
        <div className="lp-wrap">
          <Reveal>
            <h2 className="lp-display max-w-[20ch] lp-h-util">
              {t(
                "What your neighbors said on Google",
                "Lo que dicen sus vecinos en Google",
              )}
            </h2>
            <p className="lp-lede mt-4">
              {t(
                `${GOOGLE_RATING} out of 5 on Google. Quoted as written.`,
                `${GOOGLE_RATING} de 5 en Google. Citadas tal como se escribieron.`,
              )}{" "}
              <a
                href={GOOGLE_REVIEWS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[var(--lp-navy)] underline underline-offset-2"
              >
                {t("Read all of them on Google", "Léalas todas en Google")}
              </a>
              .
            </p>
          </Reveal>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {REVIEWS.map((r) => (
              <Reveal key={r.name}>
                <figure className="lp-card lp-e2 lp-review flex h-full flex-col p-7">
                  <div
                    className="flex gap-1"
                    role="img"
                    aria-label={t("Five star review", "Reseña de cinco estrellas")}
                  >
                    {[0, 1, 2, 3, 4].map((s) => (
                      <Star
                        key={s}
                        size={18}
                        weight="fill"
                        className="text-[#e7a312]"
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <blockquote className="mt-4 flex-1 text-[15.5px] leading-relaxed text-[var(--lp-ink)]">
                    {r.quote}
                  </blockquote>
                  <figcaption className="mt-4 border-t border-[var(--lp-rule)] pt-3 text-[14px] text-[var(--lp-ink-2)]">
                    <span className="font-semibold text-[var(--lp-ink)]">
                      {r.name}
                    </span>{" "}
                    · {es ? r.detailEs : r.detail}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* MID CTA */}
      <section className="bg-[var(--lp-orange)] py-12 text-[var(--lp-on-orange)]">
        <div className="lp-wrap flex flex-col items-center gap-5 text-center">
          <h2 className="lp-display lp-h-arg">
            {t(
              "Want your number? Takes 60 seconds.",
              "¿Quiere su número? Toma 60 segundos.",
            )}
          </h2>
          <Link href={QUOTE_HREF} className="lp-cta lp-cta-dark">
            {t("Get my price", "Ver mi precio")}
          </Link>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="lp-section bg-white">
        <div className="lp-wrap">
          <Reveal>
            <h2 className="lp-display max-w-[20ch] lp-h-arg">
              {t(
                "Why this takes a week, and why that is the point",
                "Por qué esto toma una semana, y por qué así debe ser",
              )}
            </h2>
            <p className="lp-lede mt-4">
              {t(
                "A tiled shower has to be built in order. Skip a step and you get a leak behind the wall in two years. Here is every day, including the one where nothing visible happens.",
                "Una ducha de azulejo se construye en orden. Sáltese un paso y en dos años tiene una filtración detrás de la pared. Aquí está cada día, incluido el día en que no se ve nada.",
              )}
            </p>
          </Reveal>

          <div className="mt-10">
            <Reveal>
              <ol className="grid gap-0 sm:grid-cols-2 lg:grid-cols-3">
                {DAYS.map((day, i) => (
                  <li
                    key={day.d}
                    className={`flex items-start gap-4 border-l-2 py-4 pl-5 ${
                      i === 3
                        ? "border-[var(--lp-orange)]"
                        : "border-[var(--lp-rule)]"
                    }`}
                  >
                    {/* Decorative: the day title next to it says the same
                        thing, so screen readers skip the picture. */}
                    <Image
                      src={day.img}
                      alt=""
                      aria-hidden="true"
                      width={240}
                      height={240}
                      sizes="64px"
                      className="mt-1 h-16 w-16 shrink-0 rounded-[4px]"
                    />
                    <span className="block">
                      <p
                        className={`lp-label ${
                          i === 3
                            ? "text-[var(--lp-orange-text)]"
                            : "text-[var(--lp-ink-3)]"
                        }`}
                      >
                        {day.d}
                      </p>
                      <h3 className="lp-display mt-1 text-[1.35rem]">{day.t}</h3>
                      <p className="mt-1 max-w-[34ch] text-[15px] text-[var(--lp-ink-2)]">
                        {day.b}
                      </p>
                    </span>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ABOUT US. Sits here, not after the FAQ, because the story and the
          comparison below it are one argument: the story names the enemy and
          the table proves it. Belief first, then the logic that justifies it.
          Signed with the owners' real names, given 11 Aug 2026. */}
      <AboutUs locale={locale} ownerNames={["Omar", "Byron Casilla"]} />

      {/* COMPARISON */}
      <section className="lp-section lp-dark">
        <div className="lp-wrap">
          <Reveal>
            <h2 className="lp-display max-w-[22ch] lp-h-thesis">
              {t(
                "A one day install is a liner over your old wall. We take the old wall out.",
                "Una instalación de un día es un forro sobre su pared vieja. Nosotros quitamos la pared.",
              )}
            </h2>
          </Reveal>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-[var(--lp-r-2)] border-2 border-[var(--lp-orange)] bg-[rgba(255,255,255,0.04)] p-7">
                <h3 className="lp-display text-[1.5rem] text-[var(--lp-orange)]">
                  {t("How we do it", "Cómo lo hacemos nosotros")}
                </h3>
                {/* Illustration, not a job photo. The FAQ promises every photo
                    on this page is our real work, so anything generated has to
                    read as a diagram at a glance. */}
                <Image
                  src="/landing/tub-to-shower/compare-rebuild.png"
                  alt={t(
                    "Illustration of a shower wall built in layers: wood studs, cement board, waterproofing membrane, then porcelain tile",
                    "Ilustración de una pared de ducha construida por capas: estructura de madera, placa de cemento, membrana impermeabilizante y porcelanato",
                  )}
                  width={1200}
                  height={670}
                  sizes="(max-width: 768px) 100vw, 600px"
                  className="mt-4 h-auto w-full rounded-[4px]"
                />
                <ul className="mt-4 flex flex-col gap-3">
                  {[
                    t(
                      "Old surround comes out down to the studs",
                      "El recubrimiento viejo sale hasta la estructura",
                    ),
                    t(
                      "Cement board, pan liner and waterproofing membrane",
                      "Placa de cemento, plato de ducha y membrana impermeabilizante",
                    ),
                    t(
                      "Real porcelain tile that you pick",
                      "Porcelanato de verdad que usted escoge",
                    ),
                    t(
                      "Starting price published before you call",
                      "Precio inicial publicado antes de que llame",
                    ),
                    t(
                      "Pay by milestone, as each stage of the work finishes",
                      "Pago por etapas, a medida que el trabajo avanza",
                    ),
                    t(
                      "An owner on your job every day",
                      "Un dueño en su obra todos los días",
                    ),
                    t(
                      "No four hour high pressure sales appointment",
                      "Sin citas de ventas de cuatro horas ni presión",
                    ),
                  ].map((item) => (
                    <li key={item} className="flex gap-2.5 text-[15.5px]">
                      <CheckCircle
                        size={19}
                        weight="fill"
                        className="mt-[3px] shrink-0 text-[var(--lp-orange)]"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal>
              <div className="h-full rounded-[var(--lp-r-2)] border-2 border-[rgba(255,255,255,0.18)] p-7">
                <h3 className="lp-display text-[1.5rem] lp-muted">
                  {t(
                    "How a one day franchise does it",
                    "Cómo lo hace una franquicia de un día",
                  )}
                </h3>
                <Image
                  src="/landing/tub-to-shower/compare-liner.png"
                  alt={t(
                    "Illustration of an acrylic panel glued over an old cracked tile wall",
                    "Ilustración de un panel de acrílico pegado sobre una pared de azulejo viejo y agrietado",
                  )}
                  width={1200}
                  height={670}
                  sizes="(max-width: 768px) 100vw, 600px"
                  className="mt-4 h-auto w-full rounded-[4px]"
                />
                <ul className="mt-4 flex flex-col gap-3 lp-muted">
                  {[
                    t(
                      "Acrylic liner bonded over the wall already there",
                      "Un forro de acrílico pegado sobre la pared que ya está",
                    ),
                    t(
                      "Nothing has to cure, which is why it fits in a day",
                      "Nada tiene que curar, por eso cabe en un día",
                    ),
                    t(
                      "Whatever colors the catalog offers",
                      "Los colores que ofrezca el catálogo",
                    ),
                    t(
                      "Price only after someone visits your home",
                      "Precio solo después de que alguien visite su casa",
                    ),
                    t(
                      "Rotating installers you meet on the morning",
                      "Instaladores rotativos que conoce esa misma mañana",
                    ),
                    t(
                      "A payment plan pitch you did not ask for, at your kitchen table",
                      "Una oferta de financiamiento que usted no pidió, en la mesa de su cocina",
                    ),
                  ].map((item) => (
                    <li key={item} className="flex gap-2.5 text-[15.5px]">
                      <span
                        aria-hidden="true"
                        className="mt-[9px] h-[2px] w-3 shrink-0 bg-[rgba(255,255,255,0.35)]"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CTA off the comparison. The visitor just read WHY the week matters;
          this is the moment to hand them the next step, not three sections
          later. */}
      <section className="bg-[var(--lp-orange)] py-12 text-[var(--lp-on-orange)]">
        <div className="lp-wrap flex flex-col items-center gap-5 text-center">
          <h2 className="lp-display lp-h-arg">
            {t(
              "Want it built right? Start with your number.",
              "¿Lo quiere bien hecho? Empiece con su número.",
            )}
          </h2>
          <Link href={QUOTE_HREF} className="lp-cta lp-cta-dark">
            {t("Get my price", "Ver mi precio")}
          </Link>
        </div>
      </section>

      {/* SAFETY */}
      <section className="lp-section bg-white">
        <div className="lp-wrap grid items-center gap-10 md:grid-cols-2 md:gap-14">
          <Reveal>
            <h2 className="lp-display max-w-[16ch] lp-h-arg">
              {t(
                "A bathroom you do not have to climb into",
                "Un baño al que no hay que treparse",
              )}
            </h2>
            <p className="mt-5 max-w-[46ch] text-[1.05rem] text-[var(--lp-ink-2)]">
              {t(
                "This one is in Killian. The tub wall is gone, so you step over a few inches of tile instead of climbing over a knee-high wall. A sliding glass door instead of a curtain, a handheld on a slide bar, and porcelain from floor to ceiling. Built so the room still looks like a good bathroom.",
                "Esta es en Killian. La pared de la bañera ya no está, así que usted pasa unas pocas pulgadas de azulejo en vez de treparse por una pared a la altura de la rodilla. Una puerta de cristal corrediza en vez de cortina, una ducha de mano en barra deslizante, y porcelanato de piso a techo. Construida para que el cuarto siga viéndose como un buen baño.",
              )}
            </p>
            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3">
              {[
                t("One low step, not a tub wall", "Un escalón bajo, no una bañera"),
                t("Sliding glass door", "Puerta de cristal corrediza"),
                t("Handheld shower", "Ducha de mano"),
                t("Porcelain, no plastic liner", "Porcelanato, sin forro plástico"),
              ].map((chip) => (
                <span key={chip} className="flex items-center gap-2 text-[15.5px]">
                  <Drop
                    size={18}
                    weight="fill"
                    className="text-[var(--lp-green)]"
                    aria-hidden="true"
                  />
                  {chip}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <JobPhoto
              src={PHOTO.safety}
              alt={t(
                "Tub to shower conversion in Killian with a sliding glass door, marble look porcelain tile and a handheld shower on a slide bar",
                "Conversión de bañera a ducha en Killian con puerta de cristal corrediza, porcelanato imitación mármol y ducha de mano en barra deslizante",
              )}
              need="Killian results. Sliding door, marble look tile, wood look floor."
              ratio="3 / 4"
              sizes="(max-width: 768px) 100vw, 480px"
            />
          </Reveal>
        </div>
      </section>

      {/* RECENT WORK. Breadth after the depth of the before/after slider. */}
      <section className="lp-section lp-section--util bg-[var(--lp-cream)]">
        <div className="lp-wrap">
          <Reveal>
            <h2 className="lp-display max-w-[20ch] lp-h-util">
              {t(
                "More bathrooms we have finished",
                "Más baños que hemos terminado",
              )}
            </h2>
            <p className="lp-lede mt-4">
              {t(
                "Different homes, different tile, same build. Every one of these is a Miami-Dade house.",
                "Casas distintas, azulejos distintos, la misma construcción. Cada una es una casa de Miami-Dade.",
              )}
            </p>
          </Reveal>

          <ul className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {WORK.map((w) => (
              <li key={w.src}>
                <Reveal>
                  <JobPhoto
                    src={w.src}
                    alt={w.alt}
                    need={`Recent work photo for ${w.area}.`}
                    ratio="3 / 4"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 280px"
                  />
                  <p className="lp-display mt-3 text-[1.25rem]">{w.area}</p>
                  <p className="text-[14.5px] text-[var(--lp-ink-2)]">{w.job}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/*
        The standalone service-area section is gone. It was 465px on desktop
        and 799px on mobile of non-interactive pills with zero differentiation,
        sitting between the FAQ and the form where every pixel stands between a
        warm visitor and a lead. Every neighborhood name still ships as
        crawlable text, moved into the final CTA section below.
      */}

      {/* FAQ. Native details so it works with no JS and is keyboard accessible. */}
      <section className="lp-section lp-section--util bg-white">
        <div className="lp-wrap">
          <Reveal>
            <h2 className="lp-display lp-h-util">
              {t(
                "Straight answers, no sales pitch",
                "Respuestas directas, sin discurso de ventas",
              )}
            </h2>
          </Reveal>

          <div className="mt-8 max-w-[820px]">
            {FAQS.map((f, i) => (
              <details
                key={f.q}
                open={i === 0}
                className="group border-b border-[var(--lp-rule)]"
              >
                <summary className="lp-display flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-[1.25rem] marker:hidden focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[var(--lp-navy)]">
                  {f.q}
                  <span
                    aria-hidden="true"
                    className="shrink-0 text-[var(--lp-orange-text)] transition-transform duration-[220ms] ease-[cubic-bezier(0.32,0.72,0,1)] group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="max-w-[68ch] pb-6 text-[16.5px] text-[var(--lp-ink-2)]">
                  {f.a}
                </p>
              </details>
            ))}
          </div>

          {/* The reader who got this far has a question the list did not
              answer. Hand them both doors in one sentence. */}
          <p className="mt-8 max-w-[70ch] text-[16.5px] text-[var(--lp-ink-2)]">
            {t(
              "Did not see your question? Call or text ",
              "¿No vio su pregunta? Llame o mande un texto al ",
            )}
            <a
              href={`tel:${TEL}`}
              className="font-semibold text-[var(--lp-navy)] underline underline-offset-2"
            >
              {PHONE}
            </a>
            {t(
              ", or complete three short steps and we will send your range the same day. ",
              ", o complete tres pasos cortos y le mandamos su rango el mismo día. ",
            )}
            <Link
              href={QUOTE_HREF}
              className="font-semibold text-[var(--lp-navy)] underline underline-offset-2"
            >
              {t("Start here.", "Empiece aquí.")}
            </Link>
          </p>
        </div>
      </section>

      {/* Warranty, payment, who answers. Logic, sitting next to the decision
          rather than next to the story. Split out of AboutUs 11 Aug 2026. */}
      <TrustFacts locale={locale} />

      {/* Honest urgency. Real capacity, not a countdown: two brothers with an
          owner on site daily means one job at a time, and that books out. */}
      <CapacityBand locale={locale} />

      {/* FINAL CTA + the three step quote form. */}
      <section id="quote" className="lp-section lp-dark scroll-mt-16">
        <div className="lp-wrap grid gap-10 md:grid-cols-2 md:items-center">
          <Reveal>
            <h2 className="lp-display lp-h-arg">
              {t("Tell us about your bathroom", "Cuéntenos de su baño")}
            </h2>
            <p className="mt-4 max-w-[46ch] lp-muted">
              {t(
                "Two quick choices, then your contact information. You get your starting price on the spot and one of us calls the same day. If it is not a fit, we will tell you that too.",
                "Dos selecciones rápidas y después sus datos de contacto. Recibe su precio inicial al momento y uno de nosotros le llama el mismo día. Si no somos la opción adecuada, también se lo decimos.",
              )}
            </p>
            <p className="mt-6 flex items-center gap-2.5">
              <Wrench
                size={20}
                weight="fill"
                className="text-[var(--lp-orange)]"
                aria-hidden="true"
              />
              <span className="text-[15.5px]">
                {t(
                  "One of us is at your house every day of the job. Me or my brother.",
                  "Uno de los dos está en su casa cada día del trabajo. Mi hermano o yo.",
                )}
              </span>
            </p>
            <p className="mt-3 flex items-center gap-2.5">
              <ShieldCheck
                size={20}
                weight="fill"
                className="shrink-0 text-[var(--lp-orange)]"
                aria-hidden="true"
              />
              <span className="text-[16px]">
                {t(
                  "One year workmanship and waterproofing warranty, in writing. Fixtures carry their factory warranty.",
                  "Garantía de un año por mano de obra e impermeabilización, por escrito. La grifería lleva su garantía de fábrica.",
                )}
              </span>
            </p>
            <p className="mt-3 flex items-start gap-2.5">
              <MapPin
                size={20}
                weight="fill"
                className="mt-[3px] shrink-0 text-[var(--lp-orange)]"
                aria-hidden="true"
              />
              <span className="text-[15px] lp-muted">
                {t("We work all over Miami-Dade.", "Trabajamos en todo Miami-Dade.")}{" "}
                {AREAS.join(", ")}.
              </span>
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <QuoteForm phone={PHONE} tel={TEL} locale={locale} />
          </Reveal>
        </div>
      </section>

      <footer className="bg-[var(--lp-navy-deep)] pb-12 text-[14.5px] text-[#8ea4c0]">
        <div className="lp-wrap border-t border-[rgba(255,255,255,0.12)] pt-8">
          <p>
            {t(
              "Broke & Fixed Home Solutions. Family owned and fully insured, serving Miami-Dade County from Kendall.",
              "Broke & Fixed Home Solutions. Empresa familiar y totalmente asegurada, sirviendo al condado de Miami-Dade desde Kendall.",
            )}
          </p>
          <p className="mt-2">
            <a
              href={`tel:${TEL}`}
              className="inline-flex min-h-[44px] items-center text-[1.05rem] text-white underline underline-offset-2 focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              {PHONE}
            </a>
          </p>
        </div>

      </footer>

      {/* Last catch before a paid click leaves. Fires once per session, never
          inside the first 20 seconds, never on a first mobile scroll. */}
      <ExitIntent locale={locale} />
    </div>
  )
}
