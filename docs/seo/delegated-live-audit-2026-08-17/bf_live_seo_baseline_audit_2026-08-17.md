# Broke & Fixed live-site SEO baseline audit — prioritized issues only

Scope: read-only crawl of `https://brokeandfixed.com` on 2026-08-17 UTC. No public edits or outreach.

Baseline checked: `robots.txt`, sitemap, 514 sitemap URLs, HTTP status, redirects, titles, descriptions, H1, canonicals, hreflang, `lang`, JSON-LD, image alt, internal links, Lighthouse mobile homepage, and sampled Bing public SERP/local result. Search Console, GA4/analytics, GBP owner dashboard, and Firecrawl web search API were not available, so impressions/clicks/index coverage/query trends/conversions are unverified.

## P0 — Local trust/compliance: contractor/licensed language appears publicly

- **Opportunity:** Remove or reframe contractor/licensed wording unless the owner-approved facts sheet explicitly supports it. Public profile/category changes need Omar approval.
- **Evidence:** Bing branded result for `Broke & Fixed Home Solutions Miami-Dade` displayed a local entity card: “Broke and Fixed Home Solutions — Building contractor in Sunset, FL.” Live pages also contain risky terms: `/en/blog/budget-kitchen-update-miami-under-8000` says “we use a licensed electrician”; `/es/blog/hoa-approval-vs-permit-miami` says “contratista licenciado”; `/es/blog/miami-hoa-renovation-approval-guide` says “contratista ... licenciado”; several English pages include “contractor” in body copy.
- **Recommended change:** Replace business/category language with approved non-contractor service wording where possible; keep references to third-party licensed trades only if factually necessary and clearly not a Broke & Fixed license claim.
- **Target page/query:** Branded/local profile; HOA/permit and budget kitchen articles.
- **Expected business value:** Reduces licensing-compliance risk and prevents mismatched local-search trust signals.
- **Measurement plan:** Recrawl pages for prohibited terms; recheck branded local SERP/profile category after approved edits.
- **Approval status:** Requires Omar approval for any public copy/profile changes.

## P0 — Hard claims and legal/cost hooks need source-of-truth review

- **Opportunity:** Establish/refresh an owner-approved public facts sheet for project counts, response times, averages, prices, timelines, legal/permit statements, and insurance wording.
- **Evidence:** `/en/blog/florida-hb-803-no-permit-needed-2026` title/slug uses “Skip the Permit for Cosmetic Remodels Under $7,500” and body says “200+ remodels”; `/es` homepage shows “3 yrs,” “Dozens Completed projects,” “100% Fully insured”; `/en/services/interior-painting` shows “2-day average,” “Price Range $2,500 - $8,000,” and “Free Estimate”; `/en/blog/interior-painting-pinecrest-color-trends-2026` says “response within 15 minutes.” “Fully insured” is allowed only because the project guide says it is already confirmed.
- **Recommended change:** Tighten legal headlines, cite official/legal constraints where used, remove stale numeric claims or define who owns updates, and separate published price ranges/timelines from estimates unless explicitly approved.
- **Target page/query:** Permit/cost/service-commercial pages; homepage trust blocks.
- **Expected business value:** Protects trust, reduces complaint/legal risk, and keeps high-intent pages from overpromising.
- **Measurement plan:** Maintain a claim inventory; recrawl for numeric/legal claims; compare against owner-approved facts sheet every 60–90 days.
- **Approval status:** Requires Omar/Byron source confirmation before edits.

## P1 — Spanish localization is incomplete despite `/es` URLs and `lang="es"`

- **Opportunity:** Treat Spanish pages as first-class pages, not partial translations.
- **Evidence:** `/es` has `lang="es"` but H1 is English: “We fix what's broke. We build what's next.” Its visible copy includes “What we do,” English service names, and English hero text. ES service meta descriptions append English: “Serving 17 communities across Miami-Dade County. Call 786-363-7039 for a free estimate.” `/es/blog` shares the English title “Blog | Broke & Fixed Home Solutions.” ES gallery detail pages have English titles/descriptions such as “Two-Tone Kitchen Renovation” and “kitchen project in Lakes of the Meadow. 5 photos showing the full transformation.” Automated crawl found 62 ES pages with obvious English in title/description/H1 fields.
- **Recommended change:** Rewrite Spanish H1s, titles, descriptions, CTAs, gallery/project labels, and service metadata in natural Miami Spanish; preserve approved terminology and avoid translated prohibited contractor/licensed claims.
- **Target page/query:** `/es`, `/es/services/*`, `/es/blog`, `/es/gallery/*`; Spanish queries for remodelación/pintura/baños/cocinas Miami-Dade.
- **Expected business value:** Better Spanish SERP snippets, lower bounce from Spanish visitors, and stronger bilingual trust.
- **Measurement plan:** Recrawl ES pages for English leakage; track Spanish GSC query impressions/clicks once Search Console is available.
- **Approval status:** Requires public content approval.

## P1 — Hreflang implementation is incomplete on important EN/ES page pairs

- **Opportunity:** Add consistent `x-default` alternates across paired bilingual money/index pages.
- **Evidence:** 56 pages have EN/ES alternates but no `x-default`: 7 EN service pages + 7 ES service pages, 17 EN location pages + 17 ES location pages, and paired FAQ/gallery/cost/guides indexes. Example: `/en/services/bathroom-remodeling` and `/es/services/remodelacion-de-banos` expose only `hreflang="en"` and `hreflang="es"`.
- **Recommended change:** Add reciprocal `x-default` to the preferred default URL, and verify every EN/ES pair has self, alternate, and x-default signals.
- **Target page/query:** Main service and location pages in EN/ES.
- **Expected business value:** Reduces wrong-language result selection and consolidates bilingual relevance.
- **Measurement plan:** Recrawl hreflang matrix; validate with Search Console international targeting/indexing reports if available.
- **Approval status:** Requires code/content deployment approval.

## P1 — Mobile performance is conversion-limiting even though Lighthouse SEO is 100

- **Opportunity:** Improve real mobile rendering and lead-form speed before expanding more content.
- **Evidence:** Lighthouse mobile on `/en`: Performance 36, SEO 100, Accessibility 88, Best Practices 77. FCP 2.7s, LCP 7.7s, TBT 3,330ms, Speed Index 7.0s, TTI 11.8s, CLS 0. Lighthouse flagged ~210 KiB unused JS including GA, Facebook Pixel, and a Next chunk; logo image is 386,924 bytes at 1200×1200 but displayed around 81×81; render-blocking CSS present.
- **Recommended change:** Resize/compress/modernize logo and above-fold images, delay nonessential third-party scripts, reduce unused JS, and protect above-fold text from render delays.
- **Target page/query:** Homepage mobile traffic and all high-intent service landing pages.
- **Expected business value:** Better mobile conversion rate and Core Web Vitals competitiveness.
- **Measurement plan:** Repeat Lighthouse/WebPageTest and monitor CrUX/Core Web Vitals after deployment; compare form/call starts from mobile landing pages.
- **Approval status:** Requires deployment approval.

## P2 — Metadata templates are overlong/duplicated, especially services and Spanish pages

- **Opportunity:** Tighten title/description templates so snippets carry the service, area, trust proof, and CTA without truncation or language mixing.
- **Evidence:** Crawl found 131 titles over 60 chars and 223 descriptions over 160 chars. Homepage title is 83 chars and description is 238 chars. `/en/services/bathroom-remodeling` title is 63 chars and description is 294 chars. `/es/services/renovacion-de-gabinetes` description is 400+ chars and ends with the English “Serving 17 communities...” line. Six duplicate descriptions exist, including EN blog/guide duplicates and EN/ES gallery duplicates.
- **Recommended change:** Create route-family-specific metadata limits: homepage/services ~150–160 chars, location pages unique by city + service, ES fully localized, gallery unique by project/service/location.
- **Target page/query:** Homepage, service pages, service-location pages, gallery, blog/guide duplicates.
- **Expected business value:** Cleaner SERP previews and less cannibalization between blog/guide versions.
- **Measurement plan:** Recrawl title/description lengths and duplicates; monitor CTR by page in GSC when available.
- **Approval status:** Requires content/deployment approval.

## P2 — Local proof pages are thin and sometimes not localized

- **Opportunity:** Strengthen gallery/project pages as trust assets instead of thin photo wrappers.
- **Evidence:** Gallery index pages are 86–89 visible words. Individual gallery pages are 79–90 words; examples: `/en/gallery/green-tiles-bathroom-kendall` 79 words and `/es/gallery/green-tiles-bathroom-kendall` 80 words. ES gallery descriptions remain English: “bathroom project in Kendall. 1 photos showing the full transformation.”
- **Recommended change:** Add approved project summaries: service performed, neighborhood, homeowner problem, materials/scope, before/after narrative, alt text, and bilingual copy. Avoid invented timelines/prices/project counts.
- **Target page/query:** Gallery/project pages supporting kitchen, bathroom, painting, and neighborhood queries.
- **Expected business value:** Stronger local trust, better internal-link targets, and more credible proof for service pages.
- **Measurement plan:** Track gallery landing impressions/clicks and assisted conversions once analytics/GSC are available.
- **Approval status:** Requires owner-approved project facts/photos before publishing.

## P3 — Image alt audit is mostly clean, but tracking/no-script images create noise

- **Opportunity:** Keep real image alt coverage strong while excluding decorative/tracking pixels from SEO QA noise.
- **Evidence:** HTML crawl reported one missing-alt image on every page, but the sample source is the Facebook no-script tracking pixel: `https://www.facebook.com/tr?id=1564050852174212&ev=PageView&noscript=1`. Lighthouse `image-alt` passed on `/en`.
- **Recommended change:** Ignore/mark tracking pixel as decorative in QA rules; continue requiring descriptive alt for project/service images, especially ES gallery pages.
- **Target page/query:** Sitewide QA; gallery/service images.
- **Expected business value:** Prevents false positives while preserving accessibility and image-search relevance.
- **Measurement plan:** Recrawl image alts with tracking pixels excluded; manually spot-check project image alt text.
- **Approval status:** Low-risk implementation/QA adjustment; still needs deployment approval if markup changes.

## Non-issues observed in this crawl

- `robots.txt` returned 200 and allows major search bots.
- Sitemap at `https://brokeandfixed.com/sitemap.xml` listed 514 URLs; all crawled sitemap URLs returned 200.
- HTML pages had self-referencing canonicals and one H1 in this crawl.
- JSON-LD parsed without syntax errors in sampled crawl; BreadcrumbList present on nested pages.
- Sampled internal links checked returned 200; root `/` redirects 307 to `/en`.
