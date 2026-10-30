import PhoneLink from "@/components/PhoneLink"

const PHONE = "(786) 363-7039"

/**
 * Urgent call prompt for king tide pages. The urgency is the EPA's 24 to 48
 * hour mold window, not a response-time promise: no hours or arrival times
 * are claimed until the client confirms them.
 */
export default function CallBox({ isEs, source }: { isEs: boolean; source: string }) {
  return (
    <div className="bg-espresso text-white rounded-lg p-6 my-8 flex flex-col md:flex-row md:items-center gap-4">
      <div className="flex-1">
        <div className="font-display text-2xl font-bold mb-1">
          {isEs ? "¿Hay agua en la casa ahora mismo?" : "Water in the house right now?"}
        </div>
        <p className="text-cream">
          {isEs
            ? "Según la EPA, el drywall, los zócalos y los pisos mojados deben secarse en 24 a 48 horas para evitar el moho. Llámenos: vamos a ver, medimos la humedad y le decimos qué hay que sacar."
            : "The EPA says wet drywall, baseboards and flooring should be dried within 24 to 48 hours to prevent mold. Call us. We come look, take moisture readings and tell you what has to go."}
        </p>
      </div>
      <PhoneLink
        phoneNumber={PHONE}
        source={source}
        displayText={isEs ? `Llame ${PHONE}` : `Call ${PHONE}`}
        className="shrink-0 text-center bg-sage-muted text-white font-bold text-lg px-6 py-3 rounded hover:opacity-90 transition-opacity"
      />
    </div>
  )
}
