# SEO + Calls Blitz — Status (2026-05-20)

## Shipped (committed, awaiting push to main)

### Commit 1 — `594b925` — Conversion & HB 803 infrastructure
- HB 803 blog post (EN+ES, ~2,200 words, Article+FAQPage schema)
- HB 803 banner on home / service / service×location pages
- PhoneLink component (GA4 + Clarity tracking on every tel:)
- StickyCallBar (mobile bottom bar + desktop top bar on scroll)
- ExitIntentPopup ($250 off, 30s delay, desktop only, session cap)
- MidArticleCTA component
- AuthorBio component + Othmar author entry (E-E-A-T)
- Contact form upgrade: "respond in 15 min" + 4.7★/years/insured/bilingual trust bar + lead_source hidden field
- Navbar phone visible on md+ (was lg only)
- GA4 + Microsoft Clarity scripts (env-gated)
- lib/analytics.ts helpers

### Commit 2 — `pending` — Additional conversion lifts + agent output
- Blog post template now mounts MidArticleCTA + AuthorBio + Person author schema (E-E-A-T)
- Footer CTA banner with phone + free quote
- Google Maps embed in Contact section (directions = local ranking signal)
- FloatingSMS lifted on mobile to clear StickyCallBar
- 2 new hyperlocal blog posts:
  - bathroom-remodeling-kendall-cost-guide-2026 (~3,800 words)
  - kitchen-remodeling-coral-gables-luxury-guide (~3,500 words)
- 12 unique 250-word location intros injected into `lib/data/service-location-content.ts` (top 12 priority service×location combos — Kendall/Coral Gables/Pinecrest/Doral × Bathroom/Kitchen/Painting)
- `competitor-gap-analysis.md` — full audit of Trimline, MIDI, Mauro's, Trebor, Miami Pro, J&J with target keyword list

### Commit 3 — `pending` (waiting on background agent)
- Pinecrest interior painting blog post
- Doral tile installation blog post

---

## Manual setup needed from Othmar

### Required for full functionality (no breakage if skipped, just missing data)
1. **GA4** — create property at analytics.google.com, copy `G-XXXXXXXXXX`, add to Vercel env as `NEXT_PUBLIC_GA_MEASUREMENT_ID`
2. **Microsoft Clarity** — create project at clarity.microsoft.com, copy project ID, add to Vercel env as `NEXT_PUBLIC_CLARITY_PROJECT_ID`
3. **Author photo** — upload your headshot at `public/authors/othmar.jpg` (the AuthorBio block displays this)
4. **Blog post hero images** — upload at:
   - `public/images/blog/florida-hb-803-no-permit.jpg`
   - `public/images/blog/bathroom-remodeling-kendall.jpg`
   - `public/images/blog/kitchen-remodeling-coral-gables.jpg`
   - (similar for the 2 still-being-written)
5. **Google Search Console** — verify ownership via Vercel domain, submit `https://brokeandfixed.com/sitemap.xml`
6. **Bing Webmaster Tools** — verify, submit sitemap (critical for ChatGPT Search via Bing index)

### Recommended next moves (per the plan)
1. **Create GBP post linking to HB 803 blog** — high CTR opportunity
2. **Submit to Yelp, Angi, HomeAdvisor, BBB, Thumbtack, Houzz, Nextdoor** — SERPs are dominated by directories per competitor analysis; you need presence there
3. **Bing Places + Apple Business Connect** — separate from Google
4. **Set up review velocity system** — QR code on invoices linking to review URL, GHL SMS workflow 24h post-completion
5. **Replace Google Maps embed key with your own** — the current embed uses the public share URL which works without key

---

## Strategy summary

- **Why HB 803 is the priority blog**: Time-bounded SEO opportunity (law effective July 1). Search volume will spike mid-June through July. We're ahead of the surge.
- **Why the matrix pages matter**: Per competitor analysis, none of the top 6 competitors have true service × city pages with unique content. We have 102. Building unique 250-word intros for the top 12 lifts them from "thin" to "genuinely local" content.
- **Why the CTAs are urgent**: Industry average is ~0.5% conversion on contractor websites. With sticky bar + 15-min response promise + trust bar + exit-intent we target 2-3%.
- **Why E-E-A-T author bios matter**: Trustworthiness is the #1 Google ranking signal in 2026. Person-typed Author schema beats Organization for blog content.

---

## How to unblock the push

The auto-mode classifier blocked direct push to main (high-risk action). To unblock, either:
- Run `git push origin main` from terminal (one-time)
- Add to `.claude/settings.local.json` under `permissions.allow`: `"Bash(git push origin main)"`

After the push, Vercel will auto-deploy and the changes will be live within ~2-3 minutes.
