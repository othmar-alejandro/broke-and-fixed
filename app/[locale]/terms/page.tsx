import type { Metadata } from "next"
import Link from "next/link"

const EMAIL = "brokeandfixed305@gmail.com"
const PHONE = "(786) 363-7039"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const es = locale === "es"
  return {
    title: es ? "Términos de servicio | Broke & Fixed" : "Terms of Service | Broke & Fixed",
    description: es
      ? "Los términos que aplican al uso del sitio de Broke & Fixed Home Solutions, a los estimados publicados y a las guías descargables."
      : "The terms that apply to using the Broke & Fixed Home Solutions website, published starting prices, and downloadable guides.",
    alternates: {
      canonical: `/${es ? "es" : "en"}/terms`,
      languages: { en: "/en/terms", es: "/es/terms", "x-default": "/en/terms" },
    },
  }
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const es = locale === "es"
  const t = (en: string, esText: string) => (es ? esText : en)
  const canonical = `https://brokeandfixed.com/${es ? "es" : "en"}/terms`
  const sections = [
    {
      title: t("Using this site", "Uso de este sitio"),
      body: t(
        "Broke & Fixed Home Solutions is a family owned home remodeling company serving Miami-Dade County. By using this website you agree to these terms. If you do not agree with them, please do not use the site. We may update these terms as the business changes, and the date at the top of this page shows the most recent version.",
        "Broke & Fixed Home Solutions es una empresa familiar de remodelación que sirve al Condado de Miami-Dade. Al usar este sitio usted acepta estos términos. Si no está de acuerdo con ellos, por favor no use el sitio. Podemos actualizar estos términos conforme el negocio cambia, y la fecha al principio de esta página muestra la versión más reciente.",
      ),
    },
    {
      title: t("Prices and estimates", "Precios y estimados"),
      body: t(
        "Starting prices shown on this site are planning ranges, not quotes. They assume a standard layout and typical conditions. The real number for your home depends on the size of the space, the materials you pick, the condition of what is behind the walls, and what we find once work begins. A firm price comes only in writing after we measure your bathroom in person. Nothing on this website is an offer or a binding contract, and prices can change at any time.",
        "Los precios iniciales que aparecen en este sitio son rangos de planificación, no cotizaciones. Suponen una distribución estándar y condiciones típicas. El número real para su casa depende del tamaño del espacio, los materiales que elija, la condición de lo que está detrás de las paredes y lo que encontremos cuando empiece el trabajo. Un precio firme se entrega solamente por escrito después de medir su baño en persona. Nada en este sitio es una oferta ni un contrato obligatorio, y los precios pueden cambiar en cualquier momento.",
      ),
    },
    {
      title: t("The work itself", "El trabajo"),
      body: t(
        "Any project we take on is governed by the written agreement we sign with you, not by this website. If something in that agreement differs from what you read here, the signed agreement controls. We are fully insured and carry general liability coverage. We work within Miami-Dade County, and we will tell you honestly if a project falls outside what we do or outside the area we serve.",
        "Cualquier proyecto que tomemos se rige por el acuerdo escrito que firmamos con usted, no por este sitio. Si algo en ese acuerdo difiere de lo que usted lee aquí, el acuerdo firmado manda. Estamos totalmente asegurados y contamos con cobertura de responsabilidad general. Trabajamos dentro del Condado de Miami-Dade, y le diremos con honestidad si un proyecto queda fuera de lo que hacemos o fuera del área que servimos.",
      ),
    },
    {
      title: t("Guides and downloads", "Guías y descargas"),
      body: t(
        "Our planning guides are free and yours to keep. They are written to help you plan a project and understand what drives cost. They are general information, not a design, an engineering opinion, or advice about permits and building codes for your specific home. Please do not resell them or present them as your own work. Your own local requirements always come first, and you should confirm anything that affects permits with Miami-Dade County.",
        "Nuestras guías de planificación son gratis y suyas. Están escritas para ayudarle a planear un proyecto y entender qué afecta el costo. Son información general, no un diseño, una opinión de ingeniería ni asesoría sobre permisos y códigos de construcción para su casa específica. Por favor no las revenda ni las presente como trabajo propio. Sus requisitos locales siempre mandan, y debe confirmar con el Condado de Miami-Dade cualquier cosa que afecte permisos.",
      ),
    },
    {
      title: t("Calls, texts, and email", "Llamadas, textos y correo"),
      body: t(
        "When you send a form and ask us to reach out, you agree that we may contact you by phone, text message, or email about the project you asked about. Message and data rates may apply. You can reply STOP to end text messages and use the unsubscribe link at the bottom of any email. Consent to calls or texts is not a condition of buying anything from us. How we handle the information you send is covered in our Privacy Notice.",
        "Cuando envía un formulario y nos pide que le contactemos, usted acepta que podemos comunicarnos por teléfono, mensaje de texto o correo electrónico sobre el proyecto que consultó. Pueden aplicar cargos de mensajes y datos. Puede responder STOP para terminar los mensajes de texto y usar el enlace para darse de baja al final de cualquier correo. El consentimiento para llamadas o textos no es una condición para comprar nada. Cómo manejamos la información que usted envía se explica en nuestro Aviso de privacidad.",
      ),
    },
    {
      title: t("Photos and content", "Fotos y contenido"),
      body: t(
        "The project photos, written content, guides, and logo on this site belong to Broke & Fixed Home Solutions. You are welcome to read the site, share links to it, and print pages for your own planning. Please ask us first before copying content onto another website or using our photos in your own marketing. Reviews and quotes from customers belong to the people who wrote them and appear here with their permission.",
        "Las fotos de proyectos, el contenido escrito, las guías y el logo de este sitio pertenecen a Broke & Fixed Home Solutions. Puede leer el sitio, compartir enlaces y imprimir páginas para su propia planificación. Por favor pregúntenos antes de copiar contenido a otro sitio o de usar nuestras fotos en su propio marketing. Las reseñas y citas de clientes pertenecen a quienes las escribieron y aparecen aquí con su permiso.",
      ),
    },
    {
      title: t("Accuracy and limits", "Exactitud y límites"),
      body: t(
        "We keep this site as accurate as we can, but we cannot promise every page is complete or current at all times. Photos show past work and your results will differ. To the extent the law allows, Broke & Fixed Home Solutions is not liable for losses that come from relying on general information published here rather than on a written estimate or a signed agreement. Nothing in these terms limits any right you have that cannot be waived under Florida law.",
        "Mantenemos este sitio tan exacto como podemos, pero no podemos prometer que cada página esté completa o actualizada en todo momento. Las fotos muestran trabajos anteriores y sus resultados serán distintos. Hasta donde la ley lo permite, Broke & Fixed Home Solutions no es responsable por pérdidas que resulten de confiar en la información general publicada aquí en lugar de un estimado escrito o un acuerdo firmado. Nada en estos términos limita algún derecho suyo que no se pueda renunciar bajo la ley de Florida.",
      ),
    },
    {
      title: t("Governing law", "Ley aplicable"),
      body: t(
        "These terms are governed by the laws of the State of Florida. Any dispute about this website or these terms belongs in the state or federal courts located in Miami-Dade County, Florida. If a court finds one part of these terms unenforceable, the rest stays in effect.",
        "Estos términos se rigen por las leyes del Estado de Florida. Cualquier disputa sobre este sitio o estos términos corresponde a los tribunales estatales o federales ubicados en el Condado de Miami-Dade, Florida. Si un tribunal determina que una parte de estos términos no se puede hacer cumplir, el resto sigue vigente.",
      ),
    },
  ]
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "WebPage", name: t("Terms of Service", "Términos de servicio"), url: canonical },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Broke & Fixed", item: "https://brokeandfixed.com" },
          { "@type": "ListItem", position: 2, name: t("Terms of Service", "Términos de servicio"), item: canonical },
        ],
      },
    ],
  }

  return (
    <main className="min-h-screen bg-[#f8f9fc] px-5 py-10 text-[#0f1f35] sm:py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <article className="mx-auto max-w-3xl rounded-md border border-[#d9e0ea] bg-white p-6 shadow-[0_18px_55px_rgba(15,31,53,0.08)] sm:p-10">
        <nav aria-label={t("Breadcrumb", "Navegación")} className="text-sm text-[#52647b]">
          <Link href={`/${es ? "es" : "en"}`} className="underline underline-offset-2">
            {t("Home", "Inicio")}
          </Link>
          <span aria-hidden="true"> / </span>
          <span>{t("Terms of Service", "Términos de servicio")}</span>
        </nav>

        <h1 className="mt-7 font-[family-name:var(--font-barlow-condensed)] text-4xl font-bold uppercase tracking-tight sm:text-5xl">
          {t("Terms of Service", "Términos de servicio")}
        </h1>
        <p className="mt-3 text-sm text-[#52647b]">
          {t("Last updated August 11, 2026", "Última actualización: 11 de agosto de 2026")}
        </p>
        <p className="mt-6 text-[17px] leading-7 text-[#33465f]">
          {t(
            "These terms cover how you may use this website, what our published prices mean, and what our free guides are for. Read them alongside our Privacy Notice.",
            "Estos términos cubren cómo puede usar este sitio, qué significan nuestros precios publicados y para qué sirven nuestras guías gratuitas. Léalos junto con nuestro Aviso de privacidad.",
          )}
        </p>

        <div className="mt-9 space-y-9">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="font-[family-name:var(--font-barlow-condensed)] text-2xl font-bold uppercase tracking-tight">
                {section.title}
              </h2>
              <p className="mt-3 text-[16.5px] leading-7 text-[#33465f]">{section.body}</p>
            </section>
          ))}
        </div>

        <p className="mt-9 text-[16.5px] leading-7 text-[#33465f]">
          {t("See also our ", "Vea también nuestro ")}
          <Link
            href={`/${es ? "es" : "en"}/privacy`}
            className="font-semibold underline underline-offset-2"
          >
            {t("Privacy Notice", "Aviso de privacidad")}
          </Link>
          {t(".", ".")}
        </p>

        <section className="mt-10 rounded-md bg-[#0f1f35] p-6 text-white">
          <h2 className="font-[family-name:var(--font-barlow-condensed)] text-2xl font-bold uppercase">
            {t("Contact us", "Contáctenos")}
          </h2>
          <p className="mt-3 leading-7 text-white/85">
            Broke &amp; Fixed Home Solutions<br />
            {t("Service-area business based in Kendall, Florida 33186", "Empresa de área de servicio con base en Kendall, Florida 33186")}<br />
            <a href={`mailto:${EMAIL}`} className="underline underline-offset-2">{EMAIL}</a><br />
            <a href="tel:+17863637039" className="underline underline-offset-2">{PHONE}</a>
          </p>
        </section>
      </article>
    </main>
  )
}
