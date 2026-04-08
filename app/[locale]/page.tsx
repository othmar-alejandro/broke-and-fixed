import HomeClient from './HomeClient'

export default function LocaleHome() {
  return <HomeClient />
}

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'es' }]
}
