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
    title: es ? "Aviso de privacidad | Broke & Fixed" : "Privacy Notice | Broke & Fixed",
    description: es
      ? "Cómo Broke & Fixed Home Solutions recopila y usa la información enviada en este sitio."
      : "How Broke & Fixed Home Solutions collects and uses information submitted through this site.",
    alternates: {
      canonical: `/${es ? "es" : "en"}/privacy`,
      languages: { en: "/en/privacy", es: "/es/privacy", "x-default": "/en/privacy" },
    },
  }
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const es = locale === "es"
  const t = (en: string, esText: string) => (es ? esText : en)
  const canonical = `https://brokeandfixed.com/${es ? "es" : "en"}/privacy`
  const sections = [
    {
      title: t("Information you choose to send", "Información que usted decide enviar"),
      body: t(
        "Our estimate and guide forms may collect your name, phone number, email address, ZIP code, bathroom choices, and project details. We receive this information only after you select the form button to send it. The estimator may remember anonymous bathroom choices in your current browser tab so you can continue later. It does not send unfinished name, phone, or email fields to us.",
        "Nuestros formularios de estimado y guía pueden recopilar su nombre, teléfono, correo electrónico, código postal, selecciones del baño y detalles del proyecto. Recibimos esta información solamente después de que usted selecciona el botón para enviarla. El estimador puede recordar selecciones anónimas del baño en la pestaña actual para que pueda continuar después. No nos envía campos sin terminar de nombre, teléfono o correo.",
      ),
    },
    {
      title: t("How we use it", "Cómo usamos la información"),
      body: t(
        "We use submitted information to provide the guide, prepare a planning range, answer questions, check the service area, and follow up about the project you asked us about. If you ask us to call or text, message and data rates may apply. You can reply STOP to end text messages. Consent to calls or texts is not a condition of purchase.",
        "Usamos la información enviada para proporcionar la guía, preparar un rango de planificación, responder preguntas, revisar el área de servicio y dar seguimiento al proyecto sobre el que usted preguntó. Si nos pide que le llamemos o escribamos, pueden aplicar cargos de mensajes y datos. Puede responder STOP para terminar los mensajes de texto. El consentimiento para llamadas o textos no es una condición de compra.",
      ),
    },
    {
      title: t("Text messages and mobile information", "Mensajes de texto e información móvil"),
      body: t(
        `If you give us your mobile number and ask us to text you, Broke & Fixed Home Solutions uses it to answer your question, confirm an appointment, and send updates about the project you asked about. Message frequency varies. Message and data rates may apply. Reply STOP at any time to end text messages, reply HELP for help, or call us at ${PHONE}. Consent to receive text messages is not a condition of any purchase. Carriers are not liable for delayed or undelivered messages.`,
        `Si nos da su número móvil y nos pide que le escribamos, Broke & Fixed Home Solutions lo usa para responder su pregunta, confirmar una cita y enviar actualizaciones sobre el proyecto que consultó. La frecuencia de mensajes varía. Pueden aplicar cargos de mensajes y datos. Responda STOP en cualquier momento para terminar los mensajes de texto, responda HELP para ayuda, o llámenos al ${PHONE}. El consentimiento para recibir mensajes de texto no es una condición de compra. Las operadoras no son responsables por mensajes demorados o no entregados.`,
      ),
    },
    {
      title: t("Mobile information is never shared for marketing", "La información móvil nunca se comparte para marketing"),
      body: t(
        "No mobile information will be shared with third parties or affiliates for marketing or promotional purposes. Text messaging originator opt-in data and consent will not be shared with any third parties. Mobile information may be shared only with the subcontractors that support the messaging service itself, such as our messaging provider and our customer relationship system, and only so that the message you asked for can be delivered. We do not sell or rent mobile numbers to anyone.",
        "Ninguna información móvil será compartida con terceros ni con afiliados para fines de marketing o promoción. Los datos de consentimiento y de suscripción para mensajes de texto no serán compartidos con ningún tercero. La información móvil puede compartirse solamente con los subcontratistas que dan soporte al servicio de mensajería, como nuestro proveedor de mensajería y nuestro sistema de relación con clientes, y únicamente para poder entregar el mensaje que usted pidió. No vendemos ni alquilamos números móviles a nadie.",
      ),
    },
    {
      title: t("Service and analytics providers", "Proveedores de servicio y analítica"),
      body: t(
        "We use service providers to receive form submissions, manage customer follow-up, host the website, and understand page performance. These may include GoHighLevel, Web3Forms, Vercel, Meta, Google Analytics, and Microsoft Clarity. They process information under their own terms and privacy notices. Advertising and analytics tools receive browser, device, page, and campaign information through cookies or similar technology, and nothing more. They do not receive your mobile number, your text messaging opt-in, or your consent record.",
        "Usamos proveedores para recibir formularios, manejar el seguimiento al cliente, alojar el sitio y entender el rendimiento de las páginas. Estos pueden incluir GoHighLevel, Web3Forms, Vercel, Meta, Google Analytics y Microsoft Clarity. Ellos procesan información bajo sus propios términos y avisos de privacidad. Las herramientas de publicidad y analítica reciben información del navegador, dispositivo, página y campaña mediante cookies o tecnología similar, y nada más. No reciben su número móvil, su suscripción a mensajes de texto ni su registro de consentimiento.",
      ),
    },
    {
      title: t("Your choices", "Sus opciones"),
      body: t(
        `You may ask what contact information we have from you, request a correction, or ask us to remove it by emailing ${EMAIL} or calling ${PHONE}. You can unsubscribe from an email through its unsubscribe link and end text messages by replying STOP. Reply HELP to any text for help. We may keep records when needed to respond to a request, prevent abuse, or meet a legal obligation.`,
        `Puede pedir qué información de contacto tenemos sobre usted, solicitar una corrección o pedir que la eliminemos escribiendo a ${EMAIL} o llamando al ${PHONE}. Puede cancelar un correo mediante su enlace para darse de baja y terminar textos respondiendo STOP. Responda HELP a cualquier texto para obtener ayuda. Podemos conservar registros cuando sea necesario para responder una solicitud, prevenir abuso o cumplir una obligación legal.`,
      ),
    },
  ]
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "WebPage", name: t("Privacy Notice", "Aviso de privacidad"), url: canonical },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Broke & Fixed", item: "https://brokeandfixed.com" },
          { "@type": "ListItem", position: 2, name: t("Privacy Notice", "Aviso de privacidad"), item: canonical },
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
          <span>{t("Privacy Notice", "Aviso de privacidad")}</span>
        </nav>

        <h1 className="mt-7 font-[family-name:var(--font-barlow-condensed)] text-4xl font-bold uppercase tracking-tight sm:text-5xl">
          {t("Privacy Notice", "Aviso de privacidad")}
        </h1>
        <p className="mt-3 text-sm text-[#52647b]">
          {t("Last updated August 24, 2026", "Última actualización: 24 de agosto de 2026")}
        </p>
        <p className="mt-6 text-[17px] leading-7 text-[#33465f]">
          {t(
            "This notice explains what happens to information you submit to Broke & Fixed Home Solutions, a registered DBA of Loadr Solutions LLC, through this website.",
            "Este aviso explica qué sucede con la información que usted envía a Broke & Fixed Home Solutions, nombre comercial registrado (DBA) de Loadr Solutions LLC, mediante este sitio.",
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

        <section className="mt-10 rounded-md bg-[#0f1f35] p-6 text-white">
          <h2 className="font-[family-name:var(--font-barlow-condensed)] text-2xl font-bold uppercase">
            {t("Contact us", "Contáctenos")}
          </h2>
          <p className="mt-3 leading-7 text-white/85">
            Broke &amp; Fixed Home Solutions<br />
            {t("A registered DBA of Loadr Solutions LLC", "Nombre comercial registrado (DBA) de Loadr Solutions LLC")}<br />
            {t("Service-area business based in Kendall, Florida 33186", "Empresa de área de servicio con base en Kendall, Florida 33186")}<br />
            <a href={`mailto:${EMAIL}`} className="underline underline-offset-2">{EMAIL}</a><br />
            <a href="tel:+17863637039" className="underline underline-offset-2">{PHONE}</a>
          </p>
        </section>
      </article>
    </main>
  )
}

