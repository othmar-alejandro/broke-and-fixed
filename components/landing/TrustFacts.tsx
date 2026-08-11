import { Receipt, ShieldCheck, UsersThree } from "@phosphor-icons/react/dist/ssr"

import Reveal from "@/components/landing/Reveal"

/**
 * Warranty, money, and who answers the phone.
 *
 * Split out of AboutUs on 11 Aug 2026. These three are LOGIC, not emotion, and
 * Brunson's Three Closes puts logic next to the decision rather than next to
 * the story. They sit late on purpose: this is what a visitor wants confirmed
 * with a thumb already over the submit button. The origin story that used to
 * carry them moved up beside the comparison section, where emotion belongs.
 *
 * Every string carries English and Spanish side by side, same as the page.
 */

type Props = {
  /** "en" or "es". */
  locale?: string
}

export default function TrustFacts({ locale = "en" }: Props) {
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
        "By milestone, as each stage of the work finishes. Never everything up front. Cash or credit card, whichever is easier for you. Nobody is going to sit at your kitchen table pitching you a payment plan, but if financing would help, tell us and we will help you get it set up.",
        "Por etapas, a medida que cada fase del trabajo termina. Nunca todo por adelantado. Efectivo o tarjeta de crédito, lo que le quede más fácil. Nadie se va a sentar en la mesa de su cocina a venderle un plan de pagos, pero si el financiamiento le ayuda, díganoslo y lo ayudamos a conseguirlo.",
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

  return (
    <section className="lp-section lp-section--util bg-[var(--lp-cream)]">
      <div className="lp-wrap">
        <Reveal>
          <h2 className="lp-display lp-h-util">
            {t(
              "Before you send us anything",
              "Antes de que nos mande sus datos",
            )}
          </h2>
        </Reveal>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
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
