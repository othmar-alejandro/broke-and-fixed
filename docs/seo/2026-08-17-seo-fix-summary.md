# SEO Fix Summary, 2026-08-17

## Scope

- Live domain audited: https://brokeandfixed.com
- Repo worked in: `/Users/othmarcasilla/broke-and-fixed-305`
- Multica issue: HIS-116
- Public deployment: not performed

## Live baseline captured

Files:

- `docs/seo/live-seo-audit-full-2026-08-17T150645Z-corrected-h1.md`
- `docs/seo/live-seo-audit-full-2026-08-17T150645Z-corrected-h1.csv`
- `docs/seo/live-seo-audit-full-2026-08-17T150645Z-corrected-h1.json`
- `docs/seo/delegated-live-audit-2026-08-17/` contains the independent subagent audit, raw crawl JSON, and mobile Lighthouse JSON.

Notes:

- 514 sitemap URLs were crawled.
- Search Console and analytics were not checked in this run, so impressions, clicks, CTR, average position, index coverage, and conversion attribution remain unverified.
- H1 counts were corrected after the first parser pass. Nested spans inside one `<h1>` were not counted as multiple H1 tags.

## Fixes prepared in the repo

1. Added `x-default` alternates to key metadata routes that were missing it.
2. Shortened EN/ES homepage titles and meta descriptions into safer search-snippet ranges.
3. Shortened EN/ES service-page meta descriptions into safer search-snippet ranges.
4. Updated service Open Graph descriptions to match the shorter service meta descriptions.
5. Removed one public service-page phrase using `contractor` from interior-painting content, replacing it with `trade paint`.
6. Rewrote public blog copy that used prohibited or sensitive contractor/license wording.
7. Removed the unapproved `200+ remodels` and `response within 15 minutes` claims from the HB 803 CTA.
8. Changed new tub-to-shower location FAQ answers to avoid quoting exact price ranges or promising timelines.
9. Fixed the declared dimensions for `/landing/tub-to-shower/compare-rebuild.png` from `1200x900` to `1200x670`.

## Verification

Commands run:

```bash
git diff --check
npm run build
```

Result:

- `git diff --check`: passed
- `npm run build`: passed
- Next.js generated 572 static/dynamic app routes successfully.

Post-build checks:

- 561 generated HTML pages checked.
- `hreflang_missing_x_default_count`: 0
- Public generated HTML files with `contractor`, `licensed`, `general contractor`, `contratista`, `licenciado`, `licencia`, or `license`: 0
- Homepage EN: title 54 chars, description 144 chars, H1 count 1
- Homepage ES: title 54 chars, description 149 chars, H1 count 1
- Sample service EN: title 63 chars, description 118 chars, H1 count 1
- Sample service ES: title 65 chars, description 123 chars, H1 count 1

## Remaining SEO/compliance work

These still need review before merge or deployment:

- Bing/GBP public category language may still show a contractor category. Any public profile change requires Omar approval.
- Search Console, Bing Webmaster Tools, GBP dashboard, GA4, and conversion attribution were not verified in this run.
- Several blog, FAQ, gallery, landing, and specialty pages still have titles or descriptions outside the preferred snippet ranges.
- New tub-to-shower campaign files are still untracked. Deployment is safe only if those dependent files/assets are included together.
- Some legal/cost content still needs an owner-approved facts sheet before public launch, especially permit-law hooks, service price ranges, timelines, review/project counts, and response-time claims.

## Approval boundary

No public deployment was done. Omar/Byron should review before merge/deploy because metadata and public copy changed.
