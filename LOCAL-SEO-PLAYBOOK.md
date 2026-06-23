# Local SEO Playbook: Jono Catliff video → Broke & Fixed

Source: "Claude Code Local SEO: How I Got 50,000 Google Clicks/Mo" (Jono Catliff, 70 min).
Transcript saved at `/tmp/sign/transcript-BTnU.txt`.

His business model is the same shape as ours: a service that travels to the
client (he uses a plumber as the running example). That matters because it means
we can rank across the whole metro, not just one pin. Everything below assumes
that.

## The video in one screen

Four pillars, in his order:

1. **Optimized Google Business Profile (GBP)** — the free, fastest, lowest
   barrier win. Four fields drive 80%: categories (1 primary + 9 secondary),
   services (up to 50), service areas (up to 20), reviews. Plus 100+ real photos
   (he claims up to 520% more calls), correct hours, citations (Yelp, Bing, FB,
   BBB, Yellow Pages) for trust.
2. **GBP posting on autopilot** — Claude writes posts, make.com pushes them to
   GBP. Purpose is not more views, it is converting existing views into calls and
   keeping the profile "active" so Google does not think you closed.
3. **Reviews engine** — get to 10 reviews fast, then keep velocity (~8/mo). A
   review-gate web app: 1-5 question, route 1-3 to Slack privately, send 4-5
   straight to the Google review link, auto-reply to the 4-5s.
4. **Localized blogs + service pages** — the "zipper": services × cities matrix.
   Keyword-cluster each page (1 primary + 4-5 secondary). Must be Static Site
   Generation. Rewrite AI slop in your real voice using reference files
   (tone/humor/vocabulary/beliefs). Then on-page + technical SEO (Lighthouse),
   bundle it all into a `/blog` skill, deploy to Vercel.

## Scorecard: where we stand against his 4 pillars

| Pillar | His move | Broke & Fixed today |
|---|---|---|
| Service/area pages | Build the services × cities zipper | **Done and ahead.** Bilingual `[locale]` matrix: services, locations, cost, guides, cabinet-painting, premium-bathroom, HB 803 cluster. |
| Technical + on-page SEO | Lighthouse loop, SSG, schema, sitemap | **Done.** `robots.ts`, `sitemap.ts`, JSON-LD, meta, hreflang, image SEO already shipped. |
| Voice (anti-AI-slop) | Build tone/humor/vocabulary/beliefs files | **Half done.** Rules live in CLAUDE.md but not as reusable reference files a skill can pull from. |
| Deploy | Push to GitHub, deploy to Vercel | **Done.** Already live on Vercel, apex canonicalization fixed. |
| Google Business Profile | Optimize categories/services/areas/photos | **Gap.** Profile exists (Places ID on file) but not optimized to his spec. |
| Reviews engine | Review-gate app + velocity + auto-reply | **Gap.** Have the Google review link, no engine, no gate, no auto-reply. |
| GBP posting | Automate daily posts | **Gap.** Not posting at all. |
| Citations | Yelp/Bing/FB/BBB/NAP consistency | **Gap.** Not built. |

Punch line: we already did his hard finale. The leverage now is the **off-site
trust layer** (GBP, reviews, citations) plus **GBP posting**, which is exactly
the half of his video we have not touched.

## The 5 gaps that matter, prioritized

Ranked by impact ÷ effort.

1. **Optimize the Google Business Profile.** Highest ROI, free, days not weeks.
   We have 17 service areas (he caps at 20) and 6 services that expand into far
   more than 50 sub-services. Build the brief: primary + 9 secondary categories,
   up to 50 validated services, up to 20 service areas, 100+ real job photos
   (before/after from the yard-sign shoot), correct hours.
2. **Reviews engine.** Build the gate as a route in THIS repo (`/feedback` or
   `/review`), not a separate app. Wire it to GoHighLevel + Web3Forms (both
   already in our stack) instead of make.com. Route 4-5 to the Google review
   link, route 1-3 privately to us. Then auto-reply to 4-5 star reviews.
3. **Keyword-validate the matrix.** He pays for Semrush. We have ubersuggest +
   dataforseo MCP already connected. Run the 6 services × 17 areas against real
   volume, kill the zero-volume combos (his "BS test"), double down on winners,
   add keyword clusters to the survivors.
4. **Citations + NAP consistency.** Yelp, Bing Places, Facebook, BBB, Apple
   Maps, plus Miami-local directories. One consistent name/address/phone
   everywhere. A day of work, durable trust signal.
5. **GBP posting cadence.** Once GBP is optimized, automate 1 post/day or a
   month batch. Bilingual EN/ES posts. GoHighLevel can likely handle the push
   without make.com.

## How we go beyond him (our unfair advantages)

He never mentions any of these. This is where we complement, not copy.

- **Bilingual EN/ES.** Miami-Dade is majority Hispanic. He is English-only.
  Spanish service pages, Spanish GBP posts, and Spanish review replies are a
  whole second lane of traffic he leaves on the table.
- **Real CRM (GoHighLevel).** He explicitly skips CRM because his audience does
  not have one, so he bolts on make.com. We already have the CRM. Review
  requests, the gate, posting, and review replies can run through it, more
  integrated and more reliable than his duct tape.
- **Free keyword data we already pay for.** ubersuggest + dataforseo MCP replace
  his Semrush step and let us validate programmatically across the full matrix.
- **Voice already codified.** Our CLAUDE.md language rules (no em dashes, no AI
  slant, write like a tradesperson) are stricter than his reference-file idea.
  We just need to export them into `reference/*.md` so a skill can load them.
- **Foundation already shipped.** We start every new page from a working
  bilingual SSG template with schema, not from his blank Next.js prompt.

## Concrete next actions (pick-list)

- [ ] Build the GBP optimization brief (categories, 50 services, 20 areas,
      photo shot-list) tuned to Broke & Fixed, EN/ES.
- [ ] Validate the 6×17 keyword matrix with ubersuggest/dataforseo, output a
      ranked "winners" CSV and a kill-list.
- [ ] Build the `/feedback` review-gate route in the repo, wired to GoHighLevel
      + Web3Forms, bilingual.
- [ ] Export CLAUDE.md voice rules into `reference/{tone,humor,vocabulary,
      beliefs,business-context}.md`.
- [ ] Stand up citations + NAP consistency checklist for Miami-Dade.
- [ ] Build a `/local-page` skill that generates a bilingual, keyword-clustered,
      schema-ready service/blog page from one keyword.
