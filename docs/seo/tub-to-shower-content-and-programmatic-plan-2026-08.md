# Tub-to-Shower: Content and Programmatic SEO Plan

**Campaign:** Tub-to-shower conversion
**Market:** Miami-Dade County, Kendall corridor first
**Date:** August 18, 2026
**Conversion targets:** `/[locale]/landing/tub-to-shower` and `/[locale]/landing/tub-to-shower/[location]`
**Supersedes nothing.** This extends `docs/seo/tub-to-shower-programmatic-seo-research.md` with a keyword map, 26 blog ideas, and 7 programmatic page systems.

## Data honesty note

There is no verified monthly volume in this plan. The Ubersuggest connector on this machine is not authorized, so nothing here comes from a volume API. Every cluster below is built from live SERP reading: who ranks, what they say, what questions repeat, and what nobody answers. Treat the priority tiers as a bet on intent quality, not on a volume number. Once Search Console has 90 days of impressions on the first wave, re-rank the tiers with real query data from `scripts/gsc-hermes-weekly-report.mjs`.

## 1. What the Miami SERP actually looks like

Two kinds of sites own this query set, and neither is a local remodeling company doing tile work.

**National one-day acrylic installers.** Bath Fitter, BathWraps, Re-Bath, Jacuzzi Bath Remodel, DaBella, Five Star Bath Solutions, Everlast, TubcuT, Haven. They sell an acrylic liner or panel system installed over the existing surround, usually in one or two days. They rank on domain strength and paid media, not on page quality.

**Lead-generation aggregators.** Angi, Homeyou, HomeAdvisor, Home Depot Services. They publish cost pages with numbers that do not describe a real tiled conversion.

The published numbers are all over the place, and that is the opening:

| Source | Miami number |
|---|---|
| Homeyou (Miami) | $1,491 to $2,278 average, low end $311 |
| Angi (national) | $3,000 average, $1,500 to $15,000 |
| HomeAdvisor labor share | 40 to 60 percent of total |
| Plumbing adjustment | $300 to $2,400 |
| Permit fees | $200 to $2,000 |
| South Florida full tile build | $12,000 to $25,000 |
| **Our published range** | **$4,500 to $12,000** |

A homeowner searching this is getting a 70x spread between the cheapest and most expensive answer. Nobody in Miami is publishing an honest, itemized, locally grounded number. That is the wedge.

## 2. The three gaps we can own

### Gap 1: Price honesty

Franchises hide price behind "free in-home estimate" because their model needs a closer in the living room. Aggregators publish numbers that do not include a shower pan, waterproofing, tile, or glass. We already publish $4,500 to $12,000 and a form that returns a starting price. Push that advantage hard: itemize every line, name what an allowance is, show three budget tiers with the same scope, and say out loud which cheap quotes are covering an insert instead of a build.

### Gap 2: Acrylic over tile versus a real tile build

The one-day systems install panels over the existing surround. The documented failure mode is trapped moisture behind the panel, which turns into mold and a full tear-out later. That is a legitimate, non-hostile comparison story, and no credible Miami site is telling it. We do the demo, the waterproofing, and the tile, so the honest comparison favors us without a single insult. Frame it as "here is what each method actually is and when each one makes sense," not as an attack.

### Gap 3: Miami Spanish, done properly

Bath Fitter runs one Spanish page for Doral. Almost nobody else bothers. And the ones who do translate from Spain: "bañera" and "plato de ducha." Miami does not talk that way. Cuban households say **bañadera**. Central American and Mexican households say **tina**. South American households say **bañera**. Our Spanish pages currently use "tina," which is right for part of the market and invisible to the rest.

Cover all three words in Spanish body copy, headings, and FAQ questions. This is the cheapest defensible moat in the whole campaign, because a national franchise will never localize Spanish at the neighborhood level.

### A fourth, quieter gap: local build reality

Nobody writing about Miami tub-to-shower work mentions concrete slab construction, which is what decides whether a drain move costs a few hundred dollars or opens the floor. Nobody covers condo architectural review, HB 803, hurricane-season material scheduling, or hard water on new glass. Every one of those is a page the franchises structurally cannot write.

## 3. Keyword and intent map

Six clusters. Head term first, then the long-tail that actually converts.

### Cluster A: Cost and price (highest commercial intent)

tub to shower conversion cost Miami / how much to convert tub to shower / cost to replace bathtub with walk-in shower / tub to shower conversion cost per square foot / cheapest way to convert tub to shower / walk in shower installation cost Miami / bathtub removal and shower install price / tub to shower conversion financing Miami / is a tub to shower conversion worth it / hidden costs tub to shower conversion

Spanish: cuanto cuesta cambiar la bañadera por ducha Miami / precio cambiar tina por ducha / costo convertir bañera en ducha Miami / presupuesto ducha sin tina

**Status:** partly covered by `tub-to-shower-conversion-cost-miami`. Needs the per-square-foot, financing, hidden-cost, and cheapest-way long-tails.

### Cluster B: Method and comparison (highest differentiation)

acrylic vs tile shower / tub liner vs full conversion / one day tub to shower conversion real or not / bath fitter alternative Miami / tub cut vs full conversion / bathtub refinishing vs replacement / can you put acrylic panels over existing tile / prefab shower pan vs tiled pan / walk in shower vs bathtub resale value / do I need a bathtub in my house to sell

**Status:** almost entirely uncovered. This is the biggest single opportunity in the plan.

### Cluster C: Feasibility and construction (pre-qualifies leads hard)

can I convert my tub to a shower / does the drain have to move for a tub to shower conversion / tub to shower conversion on a concrete slab / do I need a permit to convert tub to shower Florida / tub to shower conversion in a condo Miami / HOA approval walk in shower / how long does a tub to shower conversion take / standard shower size after removing tub / 60x30 shower conversion / minimum shower size code Florida / shower drain size 2 inch vs tub

**Status:** timeline page exists. Permit, condo, slab, and sizing are open.

### Cluster D: Accessibility and aging in place (highest emotional urgency)

walk in shower for seniors Miami / curbless shower conversion / zero entry shower Miami / does Medicare pay for a walk in shower / grants for walk in shower for seniors Florida / VA HISA grant walk in shower / ADA shower conversion Miami / grab bar placement shower / shower bench for elderly / safest shower for elderly parent

Spanish: ducha para personas mayores Miami / ducha sin escalon / baño accesible para adultos mayores

**Status:** seniors guide exists. The funding, curbless, and caregiver angles are open, and the funding question is one of the highest-volume queries in the entire niche.

### Cluster E: Design and material selection (top of funnel, strong for images)

tub to shower conversion ideas / small bathroom tub to shower conversion ideas / walk in shower tile ideas Miami / frameless glass vs fixed panel shower / shower niche ideas / linear drain vs center drain / large format tile shower / walk in shower without door Miami / shower bench ideas / white subway tile walk in shower

**Status:** design-ideas blog post exists, niche post exists. Needs the material-decision long-tails.

### Cluster F: Local and near-me (the money pages)

tub to shower conversion near me / tub to shower conversion Kendall / walk in shower Palmetto Bay / bathtub to shower conversion Doral / shower conversion Cutler Bay / [neighborhood] + walk in shower / [neighborhood] + bathroom remodeling company

**Status:** 15 location landing pages live. Missing Doral and Miami Gardens from the 17 service areas.

## 4. Blog post ideas

26 posts, tiered by how fast each one should earn a lead. Nothing here duplicates the 18 bath posts already published.

### Tier 1: Publish first (weeks 1 to 4)

1. **Acrylic Shower Panels vs a Tiled Conversion: What You Are Actually Buying in Miami**
   Target: acrylic vs tile shower / bath fitter alternative Miami. The flagship comparison. Cover what happens when panels go over an old surround with moisture behind it, why that turns into a tear-out, and when acrylic is genuinely the right call. Links to cost guide and landing page.

2. **Why "One Day Tub to Shower Conversion" Ads Are Not Describing Our Work**
   Target: one day tub to shower conversion / is a one day bathroom remodel legit. Explain the two scopes side by side. A liner install really is one day. A tiled build with waterproofing and cure time is five to eight working days. Neither is a lie, they are different products. This post ends the price confusion for every reader who lands on it.

3. **Do You Need a Permit to Convert a Tub to a Shower in Miami-Dade?**
   Target: tub to shower conversion permit Florida. Touching the drain or supply usually triggers plumbing permit review, and moving a drain a few inches is enough. Tie to the existing HB 803 post cluster, which is already a strength on this site.

4. **What a Tub-to-Shower Conversion Really Costs in Miami, Line by Line**
   Target: hidden costs tub to shower conversion / tub to shower conversion cost per square foot. Publish the itemized breakdown: demo, haul-away, pan, waterproofing, wall tile, floor tile, grout, fixtures, glass, cleanup, water test. Name the $311 and $1,491 numbers floating around and explain what they actually cover.

5. **Removing Your Only Bathtub in Miami: The Resale Question, Answered Straight**
   Target: walk in shower vs bathtub resale value / does removing a bathtub hurt home value. The rule that matters: if the house keeps one tub somewhere, conversion returns roughly 60 to 70 percent and widens buyer appeal. If it was the only tub in a three-bedroom family house, think harder. Complements the existing walk-in-shower-vs-bathtub post rather than repeating it.

6. **Cambiar la Bañadera por Ducha en Miami: Precio Real y Que Incluye** (Spanish original, not a translation)
   Target: cuanto cuesta cambiar la bañadera por ducha Miami. Written first in Spanish, using bañadera, tina, and bañera naturally in the body. This post is the anchor for the entire Spanish moat.

### Tier 2: Weeks 5 to 10

7. **Tub-to-Shower Conversion on a Concrete Slab: What It Means for Your Drain**
   Target: tub to shower conversion concrete slab / drain relocation cost. The single most Miami-specific construction post available. Explains the cost fork nobody else explains.

8. **Will Medicare, Medicaid, or a Grant Pay for Your Walk-In Shower in Florida?**
   Target: does Medicare pay for a walk in shower / grants for walk in shower seniors Florida. High volume, high emotion, currently answered only by national lead-gen sites. Cover Medicare Advantage supplemental benefits, Florida Medicaid waivers, VA SAH/SHA/HISA, and USDA rural grants. Be accurate about what does not cover it. Honest disqualification builds more trust than a maybe.

9. **Curbless and Low-Curb Showers in Miami Homes: When the Floor Allows It**
   Target: curbless shower conversion / zero entry shower Miami. Ties accessibility to slab construction, so it earns two clusters at once.

10. **Converting a Tub to a Shower in a Miami Condo: Association Review Before Permit**
    Target: tub to shower conversion condo Miami / HOA approval walk in shower. Architectural review, work hours, elevator scheduling, wet-work limits. Reuses the existing HOA content strength.

11. **60x30: Why Your New Shower Fits Exactly Where the Tub Was**
    Target: standard shower size after removing tub / 60x30 shower conversion. Standard alcove tubs are 60 by 30 or 32 inches, code minimum interior is 30 by 30 and 900 square inches, and shower drains are 2 inch against a tub's 1.5 inch. Genuinely useful, technically credible, and it sets up the same-footprint pitch.

12. **Frameless Glass, Fixed Panel, or No Door: Choosing Shower Glass in Miami**
    Target: frameless glass vs fixed panel shower. Include the hard-water reality that shows up in franchise complaint threads, and how to plan for it.

13. **Grab Bars That Do Not Look Like Grab Bars**
    Target: grab bar placement shower / safest shower for elderly parent. Design-forward accessibility, written for the adult child doing the searching, not the parent.

14. **Tub Cut vs Full Conversion: The Cheaper Option and Its Limits**
    Target: tub cut vs tub to shower conversion. TubcuT ranks locally for this. Explain honestly what a tub cut solves and what it does not, then present the full conversion for people whose problem is bigger.

15. **What We Find Behind the Old Tub: Five Things That Change the Price**
    Target: hidden water damage behind bathtub / what to expect tub removal. Original photos from real jobs. This is the post the franchises cannot write, because they never open the wall.

16. **Ducha sin Tina para Adultos Mayores en Miami: Seguridad Sin Que Parezca un Hospital** (Spanish original)
    Target: ducha para personas mayores Miami / baño accesible adultos mayores.

### Tier 3: Weeks 11 to 20

17. **Linear Drain vs Center Drain in a Converted Shower**
18. **Small Bathroom Tub-to-Shower Conversions: Making 5x8 Feel Bigger**
19. **How to Read Three Tub-to-Shower Quotes That Are $6,000 Apart**
20. **Waterproofing a Shower in a Humid Climate: Why the Boring Step Matters Most**
21. **Shower Benches, Niches, and Storage: Planning the Inside of the Box**
22. **Landlords and Rental Units: When a Conversion Pays and When It Does Not**
23. **Hurricane Season and Your Bathroom Project: Scheduling Around Material Delays**
24. **Master Bath vs Guest Bath: Which One to Convert First**
25. **From Tub to Shower in Kendall: A Full Project, Day by Day, With Photos**
26. **Ten Questions to Ask Before Anyone Removes Your Tub** (lead magnet companion to the existing checklist post)

## 5. Programmatic page systems

Seven systems. The rule for every one of them: a page ships only if it has at least one paragraph of genuinely page-specific substance that could not appear on any sibling page. If a template can only produce a swapped city name, that page does not get built.

### System 1: Location landing pages (live, extend)

`/[locale]/landing/tub-to-shower/[location]`

15 slugs live, 30 URLs. Add **Doral** and **Miami Gardens** to reach all 17 service areas. New total 34 URLs. Doral matters most, because Bath Fitter's Spanish Miami page is a Doral page.

Each page already carries a unique angle, detail, and nearby list. Keep that discipline.

### System 2: Intent guides (live, extend)

`/[locale]/guides/[keyword]`

3 t2s guides live. Add 9, giving 12 guides and 24 URLs:

- `tub-to-shower-conversion-permit-miami`
- `tub-to-shower-conversion-condo-miami`
- `acrylic-vs-tile-shower-conversion-miami`
- `curbless-shower-conversion-miami`
- `walk-in-shower-financial-assistance-florida`
- `tub-to-shower-conversion-small-bathroom-miami`
- `tub-to-shower-conversion-concrete-slab-miami`
- `shower-glass-options-miami`
- `tub-to-shower-conversion-resale-value-miami`

### System 3: Home-type pages (new, high value)

`/[locale]/guides/tub-to-shower-[home-type]-miami`

The build type changes the actual work, so these are not thin:

single-story slab home / two-story home upstairs bathroom / townhouse / condo or high-rise / 1970s and 1980s Kendall home / new-construction builder bathroom / manufactured home

7 types, 14 URLs. Each covers drain access, noise and floor structure, association rules, and access logistics.

### System 4: Feature pages (new)

`/[locale]/guides/[feature]-shower-miami`

curbless entry / low curb / bench seat / corner shower / doorless walk-in / recessed niche / linear drain / grab bar package / handheld sprayer

9 features, 18 URLs. Each one is a real construction decision with a real cost and a real tradeoff.

### System 5: Comparison pages (new, highest conversion rate)

`/[locale]/guides/[a]-vs-[b]-miami`

acrylic vs tile / one-day system vs tiled build / tub cut vs full conversion / refinishing vs conversion / walk-in shower vs bathtub / fixed panel vs shower door / prefab pan vs tiled pan / wet room vs standard shower

8 comparisons, 16 URLs. People search comparisons when they are close to buying and are choosing between two vendors, not deciding whether to start.

### System 6: Location x feature, capped hard

`/[locale]/landing/tub-to-shower/[location]/[feature]`

Do **not** build 17 x 9. Build 3 features (curbless, senior safety package, small bathroom) across the 8 strongest locations. 24 pages, 48 URLs, and only if each carries local housing-stock detail. Review indexing after 60 days. If impressions are flat and cannibalizing the parent location page, kill the whole branch. This is the one system that can hurt the site, so it ships last and gets watched.

### System 7: Supporting surfaces

- `/[locale]/faq/tub-to-shower` on the existing `faq/[service]` route, holding 20 to 30 questions with 100 to 200 word answers and FAQPage schema.
- `/[locale]/cost/tub-to-shower-conversion` on the existing `cost/[service]` route.
- `/[locale]/gallery/[slug]` before-and-after entries, one per completed conversion. Original Miami photography with service plus location alt text is the single strongest trust asset against franchises running stock imagery.

**Total at full build:** roughly 190 URLs across both languages, every one of them mapped to a distinct question or a distinct build condition.

## 6. Build order

**Weeks 1 to 4.** Tier 1 posts 1 through 6. Doral and Miami Gardens location pages. `/faq/tub-to-shower`. Register the sitemap additions.

**Weeks 5 to 10.** Tier 2 posts 7 through 16. System 5 comparison guides, all 8. System 2 guide expansion.

**Weeks 11 to 20.** Tier 3 posts. Systems 3 and 4. Gallery entries as jobs complete.

**Week 20 plus.** System 6, capped, measured, and killed without sentiment if it underperforms.

## 7. How we actually outrank them

Ranking above Bath Fitter on domain authority is not the play. Out-answering them is.

1. **Publish the numbers.** Every competitor either hides price or publishes a fiction. An itemized, Miami-specific, three-tier price page is the strongest asset on the site, and it pre-qualifies every lead that comes through it.
2. **Shoot our own photos.** Franchise pages run catalog imagery. Ours should show a Kendall bathroom mid-demolition with the wall open. Image search plus trust plus a thing no template can copy.
3. **Answer the disqualifying questions honestly.** Say when a tub cut is enough. Say when Medicare will not pay. Say when keeping the tub is the better financial call. Honest disqualification is what makes the rest of the site believable, and it filters out the leads that waste a measurement visit.
4. **Own Spanish at the neighborhood level.** Bañadera, tina, and bañera in real Miami phrasing, on original Spanish pages rather than translations. No national franchise will follow us here.
5. **Be the only site that knows this is a slab market.** Concrete slab, condo review, HB 803, hurricane scheduling, hard water. Local build reality is a moat.
6. **Schema on everything.** FAQPage on guides and FAQ, HowTo on process posts, Service plus LocalBusiness on landing pages, ImageObject on gallery entries, BreadcrumbList sitewide.
7. **Hub and spoke internal linking.** Every post links to its cluster guide, every guide links to the landing page, every location page links to its three nearest neighbors and the cost guide. No orphans.
8. **Match Google Business Profile to the page set.** Service entries and GBP posts should use the same phrasing as the pages they support.

## 8. Measurement

Track in `scripts/gsc-hermes-weekly-report.mjs`:

- Impressions and clicks split by cluster prefix, not just sitewide
- Queries where we appear in positions 5 to 20, which is the re-optimization queue
- Spanish query share against English, the health check on Gap 3
- Form starts per URL, so guides get judged on leads and not on traffic
- Location page indexing rate, the early warning for thin-page risk

Re-tier this whole plan at 90 days against real query data.
