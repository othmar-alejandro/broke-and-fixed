import Image from "next/image"
import Link from "next/link"
import { getAuthor } from "@/lib/data/authors"

interface AuthorBioProps {
  authorId: string
  locale?: "en" | "es"
}

export default function AuthorBio({ authorId, locale = "en" }: AuthorBioProps) {
  const author = getAuthor(authorId)
  const bio = locale === "es" ? author.bioEs : author.bio

  return (
    <aside className="my-12 p-6 md:p-8 rounded-2xl bg-white/5 ring-1 ring-espresso/10 flex flex-col sm:flex-row gap-5 items-start">
      <div className="shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden ring-2 ring-sage/30 bg-espresso/10">
        <Image
          src={author.image}
          alt={author.name}
          width={80}
          height={80}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1">
        <div className="text-xs uppercase tracking-wider text-espresso/50 mb-1 font-semibold">
          {locale === "es" ? "Acerca del autor" : "About the author"}
        </div>
        <h3 className="font-display text-xl font-bold text-espresso mb-1">
          {author.name}
        </h3>
        <p className="text-sm text-espresso/60 mb-3">{author.title}</p>
        <p className="text-sm text-espresso/80 leading-relaxed mb-3">{bio}</p>
        <div className="flex gap-3 text-xs">
          {author.links.instagram && (
            <Link
              href={author.links.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sage hover:text-sage-dark font-semibold"
            >
              Instagram
            </Link>
          )}
          {author.links.linkedin && (
            <Link
              href={author.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sage hover:text-sage-dark font-semibold"
            >
              LinkedIn
            </Link>
          )}
          {author.links.website && (
            <Link
              href={author.links.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sage hover:text-sage-dark font-semibold"
            >
              Website
            </Link>
          )}
        </div>
      </div>
    </aside>
  )
}
