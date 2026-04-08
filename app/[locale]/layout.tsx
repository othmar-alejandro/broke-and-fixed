import { redirect } from "next/navigation"

const validLocales = ["en", "es"]

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "es" }]
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!validLocales.includes(locale)) {
    redirect("/en")
  }

  return <>{children}</>
}
