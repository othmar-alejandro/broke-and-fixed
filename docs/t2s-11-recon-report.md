# Recon Report, Tub to Shower and Bath Remodel
US category sweep | Meta Ad Library | 25 Aug 2026

Run against the vault's winner query: `active_status=active` plus
`start_date[max]=2026-02-25`, which returns only ads that launched six or more months
ago and are **still running today**. Nobody keeps paying for creative that loses, so
everything below has passed a profitability test somebody else funded.

Scope: `tub to shower` collapsed **3,332 results to ~500** under the six month filter.
Five advertisers pulled and their full active sets inspected visually.

---

## The proven set

| Advertiser | Active ads | Aesthetic | Angle | The mechanic |
|---|---|---|---|---|
| **LJ Stone Bath Remodel** | **~46** | Loud gold, navy and red. Cartoon illustration of an older woman beside a shower photo | "Senior Bathroom Remodel Program" | **"TAP YOUR AGE TO UNLOCK PRICING"** with fake gold buttons, 55-60 / 61-65 / 66+ |
| **Home Concepts Custom Remodeling** | **~42** | Two registers. One polished navy serif discount card. One deliberately raw, yellow highlighter text slapped over a real photo | (a) "$1,500 OFF + free premium color upgrade" (b) "Here's What a 1-Day Walk-In Shower Should Cost You in 2026!" | Discount urgency, and curiosity about a number they never publish |
| **Premier Home Pros** | many, video led | Video | "We're looking for 150 homeowners in COOK COUNTY for a 1-Day Tub or Shower transformation" | **Scarcity plus geo callout plus qualification.** "Click to see if you qualify" |
| **American Bath & Shower** | ~5 | Guide cover on a tablet, on a wooden desk, coffee cup in frame | "The Top 10 Things You Need To Know Before You Buy A Walk In Tub Or Shower" | Lead magnet. Email for the PDF |
| **Aqua Therapy Tubs & Bathrooms** | several | — | "GET $500 OFF THIS SUMMER" | Flat discount |

Two of these run genuine creative engines. Per the vault, an advertiser holding 40+
active ads is a threat; one holding three is not. LJ Stone and Home Concepts are the
ones to study.

---

## Finding 1. The whole category hides the price

This is the single most useful thing in this report.

- LJ Stone: **tap your age to unlock pricing**
- Premier Home Pros: **click to see if you qualify**
- Home Concepts: **"what it should cost"**, and then does not say what it costs
- American Bath & Shower: **give us your email and we will send a guide**
- Everyone else: free in-home estimate

**Not one advertiser in the proven set publishes a number.** The dominant mechanic in
this category is withholding the price and charging you an email address, a phone
number, or a Saturday afternoon in your kitchen to find out.

Broke & Fixed publishes $4,500, $6,500 and $9,500 on the landing page, before anybody
calls. Against this field that is not a nice touch. **It is the position.**

The vault ranks the price-anchored bundle as the best-quality offer in home improvement
and puts published pricing at the top of the offer table. The recon says nobody in the
category is using it. That combination, proven demand with no crowd, is the definition
of a **silent winner**, and it is the highest-confidence brief available here.

## Finding 2. Geo-templating is the volume engine

LJ Stone runs one template with the **city name set in huge type at the top**, swapped
across roughly forty markets: Fort Wayne, Indianapolis, Huntington, Anderson, Wabash,
North Manchester, Muncie, Greenwood, New Haven, Decatur. Same illustration, same red
50% band, same fake age buttons. Only the city changes.

Under Andromeda each of those is a distinct retrieval entity, so the template buys
creative volume at near zero marginal cost. Broke & Fixed has **17 service areas** and
already has per-location landing pages at `/landing/tub-to-shower/[location]`. The same
mechanic is available and costs one render script.

## Finding 3. The feed is loud, and mostly looks like a scam

Gold gradients, red urgency bands, cartoon seniors, fake tappable buttons drawn into a
static image. The category's best performer looks like a 2009 banner ad, on purpose,
because it converts for a franchise lead-gen model that does not care about brand.

Two ways to read that, and both are true:

- **The pattern interrupt is real.** Anything restrained reads as a different species
  in this feed. Below-40% creative similarity is what the retrieval engine rewards.
- **Quiet can also mean invisible.** Home Concepts' actual winner is the *raw* one, the
  yellow highlighter over a real photo. Not corporate polish, not gold-and-red either.
  A third register: it looks like a real person made it.

## Angle map

| Angle family | Bucket | Who runs it | Read |
|---|---|---|---|
| Aging in place, seniors, safety | **Saturated** | LJ Stone, American Bath & Shower, Aqua Therapy | Crowded, and Meta's personal-attributes policy makes it a rejection risk. `t2s-07` already excluded it from round one. Keep it out |
| Discount and urgency | **Saturated** | Home Concepts, Aqua Therapy, Premier Home Pros | Everyone. No edge available |
| "What it should cost" curiosity | **Saturated as a tease** | Home Concepts | Crowded as a question. **Wide open as an answer** |
| Lead magnet, planning guide | **Silent winner** | American Bath & Shower only | One advertiser holding it. Broke & Fixed already has the guide and the capture component built |
| Geo-personalised creative | **Silent winner** | LJ Stone only | Proven at scale, nobody local doing it |
| **Published price, stated up front** | **Whitespace** | **Nobody** | The contrarian position. Only credible because the landing page actually publishes |
| Method and construction quality | **Whitespace** | Nobody | "We take the wall out, they bond a panel over it." `t2s-07` ad 3 already written |

---

## What this changes about round one

The first build was made from `t2s-07` without this sweep, which the vault warns against:
a brief written without the Ad Library is a guess. Three corrections.

**1. Lead with the contrast, not the number.** `FROM $4,500` set beautifully is a price
anchor. It is not an argument. The argument is that **every competitor makes you unlock
the price and this one does not**. Comparison is the highest-CVR static archetype in the
vault and it is exactly what the recon hands us. That becomes the lead creative.

**2. Add the geo template.** Seventeen areas, one render script, seventeen retrieval
entities. Copy LJ Stone's mechanic, drop their aesthetic.

**3. Add the guide mockup.** American Bath & Shower is the only advertiser holding the
lead-magnet slot, and the guide, the cover art and the capture component already exist
in this repo. That is a proven format sitting unused.

## Sources

Meta Ad Library, read without login, 25 Aug 2026. Page IDs captured for re-query:
LJ Stone `772961679233419` · Home Concepts `340123863133449` ·
American Bath & Shower `328470303678104` · Aqua Therapy `342817522562600`.
The Library keeps no history, so these captures are the record.
