import fs from "node:fs"
import path from "node:path"
import Image from "next/image"

/**
 * Renders a real job photo when the file exists in /public, and a labeled
 * placeholder when it does not. This lets the page ship before every photo
 * has been shot, without ever showing a broken image to a paying visitor.
 *
 * Drop files per public/landing/tub-to-shower/PHOTOS.md and they appear here
 * with no code change.
 */

type Props = {
  /** Path under /public, e.g. "/landing/tub-to-shower/hero-after.jpg" */
  src: string
  /** Real alt text. Include the service and the location. */
  alt: string
  /** Shown in the placeholder so the shot list is obvious in-page. */
  need: string
  ratio?: string
  priority?: boolean
  className?: string
  sizes?: string
}

/**
 * Resolve a photo slot without caring about the extension the file arrived with.
 * Phones export .jpeg, .png or .HEIC, and renaming by hand is exactly the kind
 * of step that silently leaves a slot blank. Any of these hits.
 *
 * HEIC is matched so the file is at least detected, but note that Chrome and
 * Firefox cannot display it. Export those as JPEG.
 */
const EXTS = [
  ".jpg", ".jpeg", ".JPG", ".JPEG",
  ".png", ".PNG", ".webp", ".WEBP",
  ".heic", ".HEIC",
]

function resolve(src: string): string | null {
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

export default function JobPhoto({
  src,
  alt,
  need,
  ratio = "4 / 3",
  priority = false,
  className = "",
  sizes = "(max-width: 768px) 100vw, 50vw",
}: Props) {
  const style = { aspectRatio: ratio }
  const found = resolve(src)

  if (found) {
    return (
      <div
        className={`relative overflow-hidden rounded-[4px] bg-[var(--lp-rule-soft)] ${className}`}
        style={style}
      >
        <Image
          src={found}
          alt={alt}
          fill
          priority={priority}
          fetchPriority={priority ? "high" : undefined}
          sizes={sizes}
          className="object-cover"
        />
      </div>
    )
  }

  /*
   * Missing file. The labeled placeholder is a shot list for US and must never
   * reach a visitor: it leaks internal notes and file paths, and it makes the
   * page look unfinished at the exact moment of a buying decision. Production
   * renders nothing, so the layout closes up around the gap instead.
   */
  if (process.env.NODE_ENV === "production") {
    return null
  }

  return (
    <div
      className={`relative flex flex-col items-center justify-center gap-2 overflow-hidden rounded-[4px] border-2 border-dashed border-[var(--lp-rule)] bg-[var(--lp-rule-soft)] p-6 text-center ${className}`}
      style={style}
    >
      <span className="lp-label text-[var(--lp-ink-3)]">
        Photo needed (dev only, hidden in production)
      </span>
      <span className="max-w-[36ch] text-[15px] leading-snug text-[var(--lp-ink-2)]">
        {need}
      </span>
      <code className="mt-1 text-[12px] text-[var(--lp-ink-3)]">{src}</code>
    </div>
  )
}
