import type { Metadata } from "next"

interface PageParams {
  locale: string
}

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "es" }]
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>
}): Promise<Metadata> {
  const { locale } = await params
  const isEs = locale === "es"
  const title = isEs
    ? "Broke & Fixed Home Solutions | Enlaces y Proyectos"
    : "Broke & Fixed Home Solutions | Links & Projects"
  const description = isEs
    ? "Llame, escriba, vea nuestros proyectos y reseñas. Remodelación de cocinas y baños, pintura, azulejos y reparaciones en Miami-Dade. Empresa familiar, totalmente asegurada."
    : "Call, text, see our projects and reviews. Kitchen and bath remodeling, painting, tile, and repairs across Miami-Dade. Family owned, fully insured."
  return {
    title,
    description,
    alternates: {
      canonical: `https://brokeandfixed.com/${locale}/start`,
      languages: {
        en: "https://brokeandfixed.com/en/start",
        es: "https://brokeandfixed.com/es/start",
      },
    },
    robots: { index: false, follow: true },
  }
}

const LOGO = "/broke-and-fixed-final-logo-Picsart-BackgroundRemover.png"
const BG = "/start-bg.jpg"
const PHONE_TEL = "+17863637039"
const IG = "https://www.instagram.com/brokeandfixed/"
const REVIEWS =
  "https://search.google.com/local/writereview?placeid=ChIJ7VSW8vHbAgMRvNWjsiV5kII"

type LinkDef = {
  href: string
  label: string
  icon: keyof typeof ICONS
  primary?: boolean
  external?: boolean
}

const ICONS = {
  phone: "M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.5 2.8.6a2 2 0 0 1 1.7 2.1z",
  chat: "M21 11.5a8.4 8.4 0 0 1-9 8.4 9 9 0 0 1-4-.9L3 21l1.9-4.5A8.4 8.4 0 0 1 12 3a8.4 8.4 0 0 1 9 8.5z",
  quote: "M9 11H5a2 2 0 0 0-2 2v5h6zM21 11h-6V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2zM9 18v-7l3-7M21 18v-7",
  image: "M3 3h18v18H3zM3 15l5-5 4 4 3-3 6 6",
  bath: "M4 12h16v3a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4zM6 12V6a2 2 0 0 1 2-2 2 2 0 0 1 2 2",
  star: "M12 2l3 6.3 6.9.9-5 4.8 1.2 6.9L12 17.8 5.9 20.9 7.1 14l-5-4.8 6.9-.9z",
  instagram: "M2 2h20v20H2zM12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM17.5 6.5h.01",
  globe: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM2 12h20M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20",
}

function Icon({ name }: { name: keyof typeof ICONS }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={ICONS[name]} />
    </svg>
  )
}

export default async function StartPage({
  params,
}: {
  params: Promise<PageParams>
}) {
  const { locale } = await params
  const isEs = locale === "es"

  const t = {
    tagline: isEs
      ? "Reparamos lo dañado. Construimos lo que sigue."
      : "We fix what's broke. We build what's next.",
    sub: isEs
      ? "Cocinas, baños, pintura, azulejos y reparaciones. Miami-Dade."
      : "Kitchens, baths, painting, tile, and repairs. Miami-Dade.",
    trust: isEs
      ? "Empresa familiar · Totalmente asegurada"
      : "Family owned · Fully insured",
  }

  const links: LinkDef[] = [
    { href: `tel:${PHONE_TEL}`, label: isEs ? "Llame al (786) 363-7039" : "Call (786) 363-7039", icon: "phone", primary: true },
    { href: `sms:${PHONE_TEL}`, label: isEs ? "Envíenos una foto para cotizar" : "Text us a photo for a quote", icon: "chat" },
    { href: `/${locale}#contact`, label: isEs ? "Estimado gratis" : "Get a free estimate", icon: "quote" },
    { href: `/${locale}/gallery`, label: isEs ? "Vea nuestros proyectos" : "See our latest projects", icon: "image" },
    { href: `/${locale}/premium-bathroom`, label: isEs ? "Remodelación de baños" : "Bathroom remodels", icon: "bath" },
    { href: REVIEWS, label: isEs ? "Reseñas de Google" : "Read our Google reviews", icon: "star", external: true },
    { href: IG, label: isEs ? "Síganos en Instagram" : "Follow us on Instagram", icon: "instagram", external: true },
    { href: `/${locale}`, label: isEs ? "Visite brokeandfixed.com" : "Visit brokeandfixed.com", icon: "globe" },
  ]

  return (
    <main className="relative min-h-screen overflow-hidden" style={{ backgroundColor: "#0F1F35" }}>
      {/* faded project photo */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${BG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.46) saturate(0.8)",
        }}
      />
      {/* navy gradient so it reads premium and stays legible, lighter in the middle to break the flat blue */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(15,31,53,0.92) 0%, rgba(15,31,53,0.50) 40%, rgba(15,31,53,0.72) 72%, rgba(15,31,53,0.97) 100%)",
        }}
      />
      {/* faint warm accent so it isn't all blue */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(540px 280px at 50% 8%, rgba(240,122,26,0.14), transparent 60%)" }}
      />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[440px] flex-col items-center px-6 py-14">
        {/* logo */}
        <div
          className="inline-flex items-center justify-center rounded-2xl p-3"
          style={{ backgroundColor: "#F8F9FC", boxShadow: "0 20px 50px -18px rgba(0,0,0,0.8)" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={LOGO} alt="Broke & Fixed Home Solutions" width={110} height={110} className="h-[100px] w-auto" />
        </div>

        <p className="font-display mt-7 text-center text-[21px] font-semibold italic leading-tight" style={{ color: "#ff9a4d" }}>
          {t.tagline}
        </p>
        <p className="mt-2 text-center text-[13px] tracking-wide" style={{ color: "#C2CCD8" }}>
          {t.sub}
        </p>

        {/* links */}
        <nav className="mt-9 flex w-full flex-col gap-3">
          {links.map((l) => {
            const primary = l.primary
            return (
              <a
                key={l.label}
                href={l.href}
                {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="group flex items-center gap-3 rounded-2xl px-5 py-4 font-display text-[17px] font-semibold tracking-wide backdrop-blur-md transition-all duration-150 active:scale-[0.99]"
                style={
                  primary
                    ? { backgroundColor: "#F07A1A", color: "#0F1F35", boxShadow: "0 18px 38px -16px rgba(240,122,26,0.55)" }
                    : { backgroundColor: "rgba(248,249,252,0.09)", color: "#F8F9FC", border: "1px solid rgba(248,249,252,0.14)" }
                }
              >
                <span style={{ color: primary ? "#0F1F35" : "#F07A1A" }}>
                  <Icon name={l.icon} />
                </span>
                <span className="flex-1">{l.label}</span>
                <span aria-hidden className="opacity-60 transition-transform duration-150 group-hover:translate-x-1">→</span>
              </a>
            )
          })}
        </nav>

        <div className="mt-auto pt-10">
          <p className="font-display text-center text-[11px] font-semibold uppercase tracking-[0.22em]" style={{ color: "#9AA7BA" }}>
            {t.trust}
          </p>
          <div className="mt-3 flex items-center justify-center gap-3 text-xs">
            <a href="/en/start" style={{ color: locale === "en" ? "#F07A1A" : "#7C8A9C", fontWeight: locale === "en" ? 700 : 400 }}>EN</a>
            <span style={{ color: "#48586B" }}>·</span>
            <a href="/es/start" style={{ color: locale === "es" ? "#F07A1A" : "#7C8A9C", fontWeight: locale === "es" ? 700 : 400 }}>ES</a>
          </div>
        </div>
      </div>
    </main>
  )
}
