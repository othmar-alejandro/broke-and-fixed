import fs from "node:fs"
import path from "node:path"
import Image from "next/image"
import { Receipt, ShieldCheck, UsersThree } from "@phosphor-icons/react/dist/ssr"

import Reveal from "@/components/landing/Reveal"

/**
 * The page makes one claim that beats every other line on it: "One of us is at
 * your house every day of the job. Me or my brother." Everywhere else that
 * sentence is unsigned, which is exactly what a skeptic notices. This section
 * signs it, and puts the two facts a skeptic reaches for next, the warranty and
 * how the money moves, right underneath the signature instead of buried in a
 * paragraph three sections up.
 *
 * Composition note: the page already runs left-text / right-photo four times
 * (hero, timeline, safety, final CTA). A fifth would read as wallpaper, so this
 * is a centered statement with a signature block and a fact row beneath it.
 *
 * Server component on purpose. The photo existence check is a filesystem read.
 */

type Props = {
  /** Real first names of the owners. Omitted renders a role, never a guess. */
  ownerNames?: string[]
  /** Path under /public, e.g. "/landing/tub-to-shower/owners.jpg" */
  photoSrc?: string
  /** Whole years in business. Omitted renders nothing at all. */
  yearsInBusiness?: number
  /** "en" or "es". Every visible string in here carries both languages. */
  locale?: string
}

/**
 * Phones export .jpeg, .png and .HEIC, and renaming by hand is the step that
 * silently leaves a slot blank, so any of these resolve against the same name.
 * HEIC is matched for detection only. Chrome and Firefox cannot display it.
 */
const EXTS = [
  ".jpg", ".jpeg", ".JPG", ".JPEG",
  ".png", ".PNG", ".webp", ".WEBP",
]

function resolvePhoto(src?: string): string | null {
  if (!src) return null
  const base = src.replace(/\.[^./]+$/, "")
  for (const ext of EXTS) {
    const candidate = base + ext
    try {
      if (fs.existsSync(path.join(process.cwd(), "public", candidate))) {
        return candidate
      }
    } catch {
      return null
    }
  }
  return null
}

/** "Byron" / "Byron and Luis" / "Byron, Luis and Sam". No Oxford comma. */
function joinNames(names: string[], and: string): string {
  const clean = names.map((n) => n.trim()).filter(Boolean)
  if (clean.length === 0) return ""
  if (clean.length === 1) return clean[0]
  return `${clean.slice(0, -1).join(", ")} ${and} ${clean[clean.length - 1]}`
}

export default function AboutUs({
  ownerNames,
  photoSrc,
  yearsInBusiness,
  locale = "en",
}: Props) {
  const es = locale === "es"
  const t = (en: string, esText: string) => (es ? esText : en)

  const FACTS = [
    {
      Icon: ShieldCheck,
      title: t("What you get in writing", "Lo que recibe por escrito"),
      body: t(
        "One year on our workmanship. One year on the waterproofing behind the tile. Fixtures carry whatever warranty the manufacturer puts on them. All of it is on paper before anybody swings a hammer.",
        "Un año por nuestra mano de obra. Un año por la impermeabilización detrás del azulejo. La grifería lleva la garantía que le ponga el fabricante. Todo queda en papel antes de que alguien agarre un martillo.",
      ),
    },
    {
      Icon: Receipt,
      title: t("How you pay us", "Cómo nos paga"),
      body: t(
        "By milestone, as each stage of the work finishes. Never everything up front. We do not offer financing, so nobody is going to sit at your kitchen table pitching you a payment plan.",
        "Por etapas, a medida que cada fase del trabajo termina. Nunca todo por adelantado. No ofrecemos financiamiento, así que nadie se va a sentar en la mesa de su cocina a venderle un plan de pagos.",
      ),
    },
    {
      Icon: UsersThree,
      title: t("Who picks up the phone", "Quién contesta el teléfono"),
      body: t(
        "One of us. The same people who measured your bathroom are the ones running the job and the ones you call after. There is no call center and no project manager in the middle.",
        "Uno de nosotros. Las mismas personas que midieron su baño son las que dirigen el trabajo y las que usted llama después. No hay call center ni gerente de proyecto en el medio.",
      ),
    },
  ]

  const names = ownerNames?.length ? joinNames(ownerNames, t("and", "y")) : ""
  const photo = resolvePhoto(photoSrc)

  /*
   * Hard rule, and it has already cost this page once: no invented name and no
   * "photo goes here" box. If the owner has not supplied a face or a name yet,
   * this degrades to what is verifiably true, which is that two brothers own
   * the company. A dashed placeholder at the moment of a buying decision reads
   * as an unfinished website, and an invented name reads as a lie.
   */
  const signature =
    names ||
    t(
      "The two brothers who own Broke & Fixed",
      "Los dos hermanos dueños de Broke & Fixed",
    )
  const photoAlt = names
    ? t(
        `${names}, the owners of Broke & Fixed Home Solutions, a family owned remodeling company in Miami-Dade`,
        `${names}, los dueños de Broke & Fixed Home Solutions, una empresa familiar de remodelación en Miami-Dade`,
      )
    : t(
        "The owners of Broke & Fixed Home Solutions, a family owned remodeling company in Miami-Dade",
        "Los dueños de Broke & Fixed Home Solutions, una empresa familiar de remodelación en Miami-Dade",
      )

  return (
    <section className="lp-section bg-[var(--lp-cream)]">
      <div className="lp-wrap">
        <Reveal>
          <div className="mx-auto max-w-[720px] text-center">
            <p className="lp-label text-[var(--lp-orange-text)]">
              {t("The people, not the brand", "Las personas, no la marca")}
            </p>
            <h2 className="lp-display mt-4 text-[2rem] md:text-[3rem]">
              {t(
                "Somebody has to answer for this work. It is us.",
                "Alguien tiene que responder por este trabajo. Somos nosotros.",
              )}
            </h2>
            {/* Origin story, owner's own answers 11 Aug 2026, tightened with
                the Epiphany Bridge beats: the wall they watched homeowners
                hit, the company built as the answer, the name, the daily
                visit rule, the transformation. Every fact in here came from
                the owners. Do not add drama that did not happen. */}
            <div className="mx-auto mt-6 max-w-[54ch] space-y-4 text-left text-[1.15rem] leading-relaxed text-[var(--lp-ink-2)]">
              <p>
                {t(
                  "Before Broke & Fixed had a name, we were two brothers doing residential work with our own hands. Painting, repairs, renovations, whatever the project called for. And on job after job we watched the same things go wrong for homeowners. People who did not show up. Calls nobody returned. Projects passed from hand to hand until nobody owned the result, and the homeowner ended up managing their own renovation.",
                  "Antes de que Broke & Fixed tuviera nombre, éramos dos hermanos haciendo trabajo residencial con nuestras propias manos. Pintura, reparaciones, remodelaciones, lo que el proyecto pidiera. Y en trabajo tras trabajo vimos fallar las mismas cosas para el dueño de casa. Gente que no llegaba. Llamadas que nadie devolvía. Proyectos que pasaban de mano en mano hasta que nadie respondía por el resultado, y el dueño terminaba administrando su propia remodelación.",
                )}
              </p>
              <p>
                {t(
                  "So we built the company we kept wishing existed. One team, one point of responsibility, one person you talk to for all of it. You do not chase five trades. We carry that for you, and we treat the project like it is our own house. The name says the rest. Something in your home is broke, outdated, or just not working for you anymore. We fix it and leave it better than we found it. We fix what's broke. We build what's next.",
                  "Así que construimos la empresa que nos hubiera gustado encontrar. Un solo equipo, un solo responsable, una sola persona con quien hablar para todo. Usted no persigue a cinco oficios. Nosotros cargamos con eso, y tratamos el proyecto como si fuera nuestra propia casa. El nombre dice el resto. Algo en su casa está broke, roto, viejo o ya no le funciona. Nuestro trabajo es dejarlo fixed, arreglado y mejor de lo que lo encontramos.",
                )}
              </p>
              <p>
                {t(
                  "It is also why one of us comes to your job every day. A renovation makes decisions daily, and when nobody accountable is in the room, small problems grow expensive. With us you always know who to call, and it is always an owner. And when the job is done, the check is not the part we remember. It is you walking into the finished bathroom feeling that the dust and the decisions were worth it, comfortable putting our name in front of the people you care about.",
                  "Por eso también uno de los dos pasa por su obra todos los días. Una remodelación toma decisiones a diario, y cuando no hay nadie responsable en el cuarto, los problemas chicos se vuelven caros. Con nosotros usted siempre sabe a quién llamar, y siempre es un dueño. Y cuando el trabajo termina, el cheque no es la parte que recordamos. Es usted entrando a su baño terminado sintiendo que el polvo y las decisiones valieron la pena, con la confianza de poner nuestro nombre frente a la gente que quiere.",
                )}
              </p>
            </div>
          </div>
        </Reveal>

        {/* Signature block. Centered, deliberately small, sits under the
            statement the way a name sits under a letter. */}
        <Reveal delay={0.08}>
          <div className="mt-10 flex flex-col items-center">
            <span
              aria-hidden="true"
              className="h-[3px] w-14 bg-[var(--lp-orange)]"
            />

            {/* With a face the name sits beside it and reads left. Without one
                the block is just two lines of type under a centered statement,
                so it stays centered rather than hanging off to one side. */}
            <div
              className={`mt-6 flex items-center gap-4 ${
                photo ? "text-left" : "text-center"
              }`}
            >
              {photo && (
                <Image
                  src={photo}
                  alt={photoAlt}
                  width={72}
                  height={72}
                  sizes="72px"
                  className="h-[72px] w-[72px] shrink-0 rounded-full object-cover"
                />
              )}
              <span>
                <span className="lp-display block text-[1.4rem] text-[var(--lp-ink)]">
                  {signature}
                </span>
                <span className="block text-[16px] text-[var(--lp-ink-2)]">
                  {t(
                    "Owners, Broke & Fixed Home Solutions",
                    "Dueños, Broke & Fixed Home Solutions",
                  )}
                </span>
              </span>
            </div>

            <p className="mt-6 max-w-[48ch] text-center text-[17px] text-[var(--lp-ink-2)]">
              {t(
                "Family owned and fully insured. Based in Kendall, working all over Miami-Dade",
                "Empresa familiar y totalmente asegurada. Con base en Kendall, trabajando en todo Miami-Dade",
              )}
              {typeof yearsInBusiness === "number" && yearsInBusiness > 0
                ? t(
                    ` for ${yearsInBusiness} ${
                      yearsInBusiness === 1 ? "year" : "years"
                    }.`,
                    ` desde hace ${yearsInBusiness} ${
                      yearsInBusiness === 1 ? "año" : "años"
                    }.`,
                  )
                : "."}
            </p>
          </div>
        </Reveal>

        {/* The two questions a skeptic asks right after "who are you", answered
            where the answer is cheapest to find. */}
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {FACTS.map(({ Icon, title, body }) => (
            <Reveal key={title}>
              <div className="flex h-full flex-col rounded-[4px] border border-[var(--lp-rule)] bg-white p-6">
                <Icon
                  size={26}
                  weight="duotone"
                  className="text-[var(--lp-orange-text)]"
                  aria-hidden="true"
                />
                <h3 className="lp-display mt-3 text-[1.35rem]">{title}</h3>
                <p className="mt-2 text-[17px] leading-relaxed text-[var(--lp-ink-2)]">
                  {body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
