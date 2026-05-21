# Image Placeholders — Broke & Fixed Home Solutions

Every image slot on the site uses the `<ImagePlaceholder>` component (`components/ImagePlaceholder.tsx`). When a file doesn't exist at the expected path, a styled placeholder card renders in its place showing the section name, alt text, and the missing file path. So nothing breaks visually if an image is missing — it just shows a polite "needs upload" tile.

This document maps **every image path the site expects** so you can batch upload from your photo library.

---

## Naming conventions

- All paths are under `/public/...` and referenced in code as `/...` (Next.js public folder convention).
- Use **JPEG (.jpg)** for photos. Use PNG only for icons/logos with transparency.
- Compress before upload (target ≤ 250KB per image for galleries, ≤ 500KB for hero). Use [tinypng.com](https://tinypng.com) or `sharp` CLI.
- Recommended sizes are minimums. Browser handles down-scaling via `next/image`.

---

## Service page images (per service)

For each of the 7 services below, the new dedicated service-page template expects images at these paths. Slug list:
- `bathroom-remodeling`
- `kitchen-remodeling`
- `interior-painting`
- `exterior-painting`
- `tile-work`
- `exterior-repairs`
- `cabinet-refinishing`

### Per-service folder structure

```
public/images/services/[service-slug]/
  hero.jpg                                          # main hero image
  process/
    step-1.jpg
    step-2.jpg
    step-3.jpg
    step-4.jpg
    step-5.jpg
    step-6.jpg                                      # optional, only if 6 steps exist
  materials/
    [material-name-slug].jpg                        # e.g., porcelain-large-format.jpg
  projects/
    [project-slug]-before.jpg                       # before photo
    [project-slug]-after.jpg                        # paired after photo
```

### Hero image

- **Path**: `/images/services/[service-slug]/hero.jpg`
- **Dimensions**: 1200 × 1500 (4:5 portrait, prominently displayed on right side of hero on desktop)
- **Content guidance**: a single hero project shot. Photorealistic, well-lit, showing the finished result with depth (e.g., bathroom hero = full bathroom shot showing vanity + shower + tile, not just a close-up of a faucet).
- **Examples needed (7 total)**:
  - `/images/services/bathroom-remodeling/hero.jpg`
  - `/images/services/kitchen-remodeling/hero.jpg`
  - `/images/services/interior-painting/hero.jpg`
  - `/images/services/exterior-painting/hero.jpg`
  - `/images/services/tile-work/hero.jpg`
  - `/images/services/exterior-repairs/hero.jpg`
  - `/images/services/cabinet-refinishing/hero.jpg`

### Process step images

- **Path**: `/images/services/[service-slug]/process/step-N.jpg` (N = 1 through 5 or 6)
- **Dimensions**: 800 × 450 (16:9 widescreen)
- **Content guidance**: real action shots of that step. For bathroom step 1 (demo), a photo of crew removing old tile. For step 4 (tile install), a photo mid-install with spacers visible. Action > posed.
- **Total**: 6 steps × 7 services ≈ 36-42 photos

### Material option images

- **Path**: `/images/services/[service-slug]/materials/[material-slug].jpg`
- **Dimensions**: 600 × 338 (16:9)
- **Material slug rule**: lowercase, alphanumeric and dashes. Examples:
  - `porcelain-large-format.jpg`
  - `quartz-counters.jpg`
  - `sherwin-emerald.jpg`
  - `subway-tile.jpg`
- **Content guidance**: tight product shot showing texture/finish. Stock photos are fine here if real ones unavailable. The placeholder system shows the material name + category if missing.

### Before/after project images

- **Path**: `/images/services/[service-slug]/projects/[project-slug]-before.jpg` AND `-after.jpg`
- **Dimensions**: 800 × 800 (1:1 square — both before and after sit side-by-side)
- **Important**: shoot from the same angle/distance for both before and after. This dramatically improves visual impact.
- **Project slug**: derived from the project title (e.g., "Master Bath Refresh in Kendall" → `master-bath-refresh-in-kendall-before.jpg`)
- **Total**: 3 projects × 2 images × 7 services ≈ 42 photos

---

## Author photo

- **Path**: `/public/authors/othmar.jpg`
- **Dimensions**: 400 × 400 (square headshot)
- **Used in**: `<AuthorBio>` component at the bottom of every blog post
- **Content**: professional headshot, neutral background, friendly expression

---

## Blog post hero images

- **Path**: `/public/images/blog/[blog-slug].jpg` (or as specified in each post's frontmatter `image:` field)
- **Dimensions**: 1200 × 630 (Open Graph standard) for social-card use; same image renders inline at the top of the blog
- **Existing posts that need hero images**:
  - `/images/blog/florida-hb-803-no-permit.jpg`
  - `/images/blog/bathroom-remodeling-kendall.jpg`
  - `/images/blog/kitchen-remodeling-coral-gables.jpg`
  - `/images/blog/interior-painting-pinecrest.jpg`
  - `/images/blog/tile-installation-doral.jpg`
  - Plus ~40 existing posts already in `content/blog/` — see frontmatter `image:` field for each

---

## Open Graph / social card

- **Path**: `/public/og-image.jpg`
- **Dimensions**: 1200 × 630
- **Used in**: `app/layout.tsx` for default OG/Twitter card
- **Content**: branded image with logo + tagline + a representative photo

---

## Icons (already in place — just listing for reference)

- `/public/favicon.png`, `/public/favicon.svg` — site favicon
- `/public/broke-and-fixed-final-logo-Picsart-BackgroundRemover.png` — main logo (used in navbar + footer)
- `/public/services/[service].png` — service icon thumbnails (referenced in `lib/data/images.ts`)

---

## Existing photos (already uploaded — already wired up)

The current site already maps these existing project photo folders. They power the legacy gallery and the existing `serviceImages` data in `lib/data/images.ts`:

- `/public/Home Remodeling - South Miami Heights/` — bathroom, kitchen, drywall, painting photos from the South Miami Heights job
- `/public/exterior paint - the hammocks 2/` — exterior painting in The Hammocks
- `/public/driveway clear coating/` — driveway sealing photos
- `/public/chimney removal - The Crossings/` — exterior repair
- `/public/demolition project - miami gardens/` — demo / exterior repair
- `/public/security/` — affiliate page imagery
- `/public/images/services/` — existing service images (cabinet-refinishing already has 4)

---

## How the placeholder system works

`<ImagePlaceholder>` wraps `next/image`. On image load failure (404 or network error), the `onError` handler swaps in a styled card showing:
- A photo icon
- An optional **label** (passed via `label="Step 1"` or `label="Hero Image"`)
- The **alt text** (which serves as a human description of what should be there)
- The **expected file path** in monospace

This means:
1. The site is never visually broken even if you haven't uploaded all images yet
2. The placeholder tile tells you exactly what file is missing and where to put it
3. SEO is preserved because the `alt` text still renders

---

## Image upload priority (suggested order)

If you can only batch a few, do them in this order for highest visual ROI:

1. **7 service hero images** — these are the largest, most prominent images on the dedicated service pages
2. **Author photo** (`/authors/othmar.jpg`) — appears on every blog post
3. **OG image** (`/og-image.jpg`) — appears in every social share / search preview
4. **Blog post hero images** for the 5 newest posts (HB 803 + 4 hyperlocal)
5. **Process step photos** for the top 2 services (bathroom, kitchen) — 12 images
6. **Before/after pairs** for top 2 services — 12 images
7. Everything else as time allows

---

## Quick checklist when batching photos

- [ ] File is a `.jpg` (not `.heic`, `.png`, `.webp`)
- [ ] Compressed to ≤ 500KB
- [ ] Named with lowercase + dashes, matching the slug pattern in this doc
- [ ] Aspect ratio matches the recommended dimension (check this doc)
- [ ] For before/after pairs: same camera angle and distance
- [ ] Uploaded to the exact path specified

If you stick to this naming, **no code changes are needed when you upload**. The site picks up the new images automatically and the placeholder tile disappears.
