export default async function LocaleHome({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  return (
    <main className="min-h-screen bg-cream">
      <div className="max-w-7xl mx-auto px-4 py-20">
        <h1 className="font-display text-5xl font-bold text-espresso">
          Broke &amp; Fixed Home Solutions
        </h1>
        <p className="text-warm-gray text-lg mt-4">
          {locale === "es"
            ? "Remodelacion de hogares en Miami-Dade"
            : "Home remodeling in Miami-Dade"}
        </p>
      </div>
    </main>
  )
}

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "es" }]
}
