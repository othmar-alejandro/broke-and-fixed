export interface Author {
  id: string
  name: string
  title: string
  bio: string
  bioEs: string
  image: string
  links: {
    instagram?: string
    linkedin?: string
    website?: string
  }
}

export const authors: Record<string, Author> = {
  othmar: {
    id: "othmar",
    name: "Othmar Casilla",
    title: "SEO & Content Lead, OAC Digital Innovations",
    bio: "Othmar leads SEO and content strategy at OAC Digital Innovations, working with Miami home services teams on local search and lead generation. He writes about Florida home remodeling, building codes, and the practical side of getting a project done right.",
    bioEs: "Othmar dirige la estrategia de SEO y contenido en OAC Digital Innovations, trabajando con equipos de servicios para el hogar en Miami en posicionamiento local y generación de prospectos. Escribe sobre remodelación de viviendas en Florida, códigos de construcción y el lado práctico de hacer un proyecto bien.",
    image: "/authors/othmar.jpg",
    links: {
      instagram: "https://www.instagram.com/brokeandfixed/",
      website: "https://brokeandfixed.com",
    },
  },
  brokeAndFixed: {
    id: "brokeAndFixed",
    name: "Broke & Fixed Team",
    title: "Miami-Dade Remodeling Team",
    bio: "The Broke & Fixed team has completed remodels across Kendall, Coral Gables, Pinecrest, Doral, and all of Miami-Dade. Family owned, fully insured, bilingual EN/ES.",
    bioEs: "El equipo de Broke & Fixed ha completado remodelaciones en Kendall, Coral Gables, Pinecrest, Doral y todo Miami-Dade. Empresa familiar, totalmente asegurada, bilingüe EN/ES.",
    image: "/logo.png",
    links: {
      instagram: "https://www.instagram.com/brokeandfixed/",
    },
  },
}

export function getAuthor(id: string): Author {
  return authors[id] || authors.brokeAndFixed
}
