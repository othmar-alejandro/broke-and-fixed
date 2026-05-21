import ImagePlaceholder from "@/components/ImagePlaceholder"

export interface ProcessStep {
  step: number
  title: string
  titleEs: string
  description: string
  descriptionEs: string
  duration: string
  durationEs: string
}

interface ProcessTimelineProps {
  steps: ProcessStep[]
  locale: "en" | "es"
  intro?: string
  serviceSlug: string
}

export default function ProcessTimeline({
  steps,
  locale,
  intro,
  serviceSlug,
}: ProcessTimelineProps) {
  const isEs = locale === "es"

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block text-xs uppercase tracking-[0.2em] text-sage font-bold mb-3">
            {isEs ? "Cómo trabajamos" : "How we work"}
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-espresso leading-tight">
            {isEs ? "Nuestro Proceso" : "Our Process"}
          </h2>
          {intro && (
            <p className="text-warm-gray mt-4 text-lg leading-relaxed">{intro}</p>
          )}
        </div>

        <div className="relative">
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-sage/20" aria-hidden />

          <div className="flex flex-col gap-12 md:gap-16">
            {steps.map((step, i) => {
              const isEven = i % 2 === 0
              const imagePath = `/images/services/${serviceSlug}/process/step-${step.step}.jpg`
              return (
                <div
                  key={step.step}
                  className={`relative grid md:grid-cols-2 gap-8 md:gap-16 items-center ${
                    isEven ? "" : "md:[direction:rtl]"
                  }`}
                >
                  <div className={`relative ${isEven ? "" : "md:[direction:ltr]"}`}>
                    <div className="rounded-2xl overflow-hidden ring-1 ring-espresso/10">
                      <ImagePlaceholder
                        src={imagePath}
                        alt={`${step.title} step illustration`}
                        ratio="video"
                        fill={false}
                        width={800}
                        height={450}
                        className="w-full h-auto"
                        label={`Step ${step.step}`}
                      />
                    </div>
                  </div>
                  <div className={isEven ? "" : "md:[direction:ltr]"}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-full bg-espresso text-white font-display font-bold text-lg flex items-center justify-center shrink-0">
                        {step.step}
                      </div>
                      <div className="inline-flex items-center px-3 py-1 rounded-full bg-sage/10 text-sage text-xs font-semibold uppercase tracking-wider">
                        {isEs ? step.durationEs : step.duration}
                      </div>
                    </div>
                    <h3 className="font-display text-2xl md:text-3xl font-bold text-espresso leading-tight mb-3">
                      {isEs ? step.titleEs : step.title}
                    </h3>
                    <p className="text-warm-gray text-base md:text-lg leading-relaxed">
                      {isEs ? step.descriptionEs : step.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
