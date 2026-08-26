# Tub to Shower: Campaign As Built
Broke & Fixed Home Solutions | Miami-Dade | $50/day | 26 Aug 2026

**This is the single reference for the live campaign.** Everything below was read back
from the ad account, not assumed. Where a number comes from the Meta Ads Mastery vault
it names the note. Where something is an operator heuristic it says so.

Supersedes the budget and creative sections of `t2s-01-campaign-plan.md` and
`t2s-10-launch-checklist-20-day.md`. The recon that drove the creative is
`t2s-11-recon-report.md`. Ad copy long-form lives in `t2s-02` and `t2s-07`.

---

## 1. What is built, right now

Everything is **PAUSED**. Nothing has spent a cent.

| Layer | Name | ID | State |
|---|---|---|---|
| Ad account | Broke and Fixed | `882094667972705` | Active, payment method on file |
| Business | brokeandfixed | `2553821644995338` | |
| Pixel / dataset | "Brokie" | `1564050852174212` | Active, firing |
| Facebook Page | Broke and Fixed | `1099333583269076` | |
| Campaign | `LEADS_TOF_Estimator_US-MIA_202608` | `120255036342850397` | PAUSED, `OUTCOME_LEADS` |
| Ad set | `T2S_ZIP14_Age30plus_EN-ES` | `120255036345770397` | PAUSED, **$50.00/day** |
| Ad 1 | `TYPE_PriceGate_v2_inhouse` | `120255415237020397` | PAUSED, pending review |
| Ad 2 | `TYPE_Method_v2_inhouse` | `120255415258960397` | PAUSED, pending review |
| Ad 3 | `PHOTO_BeforeAfter_H10_v2_inhouse-es` | `120255415268580397` | PAUSED, pending review |

Delivery-blocking errors on the account: **none**.

### The budget is $50/day total, not per ad

This confused things once, so it is written down. On Meta the budget lives on the **ad
set**. An ad never carries its own budget.

```
Campaign  LEADS_TOF_Estimator_US-MIA_202608     no budget (CBO off)
└── Ad set  T2S_ZIP14_Age30plus_EN-ES          $50.00/day  ← the only budget
    ├── TYPE_PriceGate_v2_inhouse
    ├── TYPE_Method_v2_inhouse
    └── PHOTO_BeforeAfter_H10_v2_inhouse-es
```

$50/day is the ceiling for the whole ad set. Adding a fourth or fifth ad later does not
raise spend by a cent, it just gives Meta more options inside the same $50.

**Meta will not split it evenly into $16.67 each.** It concentrates on whichever ad it
believes converts. Expect one ad to be taking 60 to 80 percent of the budget inside a
week while the other two are nearly starved. That is not a fault. That concentration is
the answer you are paying for.

**No end date.** `end_time` is unset, so it runs until stopped. That is deliberate:
per [[Scaling Rules]] and the vertical playbook, **never go dark**. Cutting spend and
restarting means paying the new-advertiser tax a second time, and that tax runs about
60 days.

---

## 2. Budget: what $50/day actually buys

$50/day is **$1,520/month**, which lands exactly on the vault's stated practical floor
for a home services account ($1,500/mo). This is a real budget, not a token one.

| | |
|---|---|
| Daily | $50 |
| Monthly | ~$1,520 |
| Bath remodel CPL band | $60–$180 (Web Pinnacles, Jun 2026, remodel/GC band) |
| Miami-Dade adjustment | +25 to 40% for dense urban (RYN Digital, May 2026) |
| **Working CPL** | **$75–$250** |
| **Leads/month at that band** | **6 to 20.** Plan on 8–12 |
| First 14 days | CPL runs 30–50% above benchmark (M.Wolf Media, Apr 2026) |
| Week one | 1–3 leads. A slow week one is not a broken campaign |

**Learning phase is still out of reach, and that is expected.** The formula in
[[Minimum Viable Budget — The 50-Conversion Math]] is `(target CPA × 50) ÷ 7`. At a $125
CPL that is **$893/day** to exit learning. Nobody at this budget clears it. The vault's
instruction for exactly this case: accept it, run broad, and change nothing for 14 days.

**The lever that beats the media budget.** At a $12,000 job the vault ranks improvements:
close rate +10 points is worth $180/job, appointment-set rate +10 is worth $111, contact
rate +10 is worth $90. Cutting CPL from $60 to $50 is worth $120. Three of the four
biggest levers are operational, not media. [[Speed-to-Lead]] is worth more than another
$50/day. **Call inside 5 minutes.**

---

## 3. Who we are promoting to

Buyer research is in `t2s-06-targeting-spec.md` section 1. Three profiles, one primary.

| | Profile A — PRIMARY | Profile B — volume | Profile C — deprioritised |
|---|---|---|---|
| Who | The step-over buyer | Family, dead second bathroom | Recent buyer in project mode |
| Age | **58 to 75** | 38 to 55 | 32 to 45 |
| Where | Palmetto Bay, Westchester, Kendall proper, Pinecrest, South Miami Heights, Cutler Bay | West Kendall, The Hammocks, Country Walk, The Crossings, Kendale Lakes | Anywhere in the corridor |
| House | 1960s–80s, bathroom original or last touched in the 90s | 1990s–2000s planned community, builder-grade tub nobody has used since 2014 | 1980s–90s, just bought |
| Trigger | **Physical.** Stepping over a 15-inch tub wall got harder, or a spouse slipped | None. Has been meaning to for three years | Punch list |
| Ticket | **$6,500** (shower plus floor) | $4,500 | $4,500 |
| Language | **Skews Spanish-dominant hardest** | Mixed | Mixed |

**Profile A is primary because it is the only one with a trigger rather than a
preference.** Preference projects sit for three years; trigger projects close in three
weeks. It also maps to the housing stock: Miami-Dade's median year built is **1980** and
**82% of the county's 1.03M units were built before 2000**, which puts the modal home
squarely in the 45-year-old-bathroom band.

The service area was picked correctly for a reason worth knowing: **Kendall's
homeownership rate is 62.2% against the county's 52.2%.** That ten-point gap is the whole
business. County-wide Miami-Dade is renter-heavy, and renters do not buy a $6,500 shower.

Kendall household income is **$83,664** against a county median of $71,753, which is what
supports a $4,500–$6,500 ticket without a financing conversation.

> **The important nuance:** these profiles drive the **creative**, not the targeting
> settings. Under Andromeda you do not hand-build an audience out of interests and
> behaviours. You give Meta a clean geographic box, a sane age floor, and a real
> conversion signal, and it finds the buyer. Detailed interest stacking is a pre-2024
> tactic the vault explicitly flags as out of date. **Detailed targeting is set to none,
> deliberately.**

## 4. Targeting, exactly as set

Read back from the ad set after the 26 Aug changes.

| Field | Value | Why |
|---|---|---|
| Objective | `OUTCOME_LEADS` | Sales/conversions needs pixel volume this account does not have |
| Optimization goal | `OFFSITE_CONVERSIONS` | Website lead. Ticket is $4,500+, and the vault puts website above instant form over $1,500. Instant forms give 20–40% more volume; landing pages convert 35–55% lead-to-booked against 15–30% |
| Conversion event | **`LEAD`**, pixel `1564050852174212` | Attached 26 Aug. Was empty before |
| **Locations** | **14 ZIP codes** (below) | Changed from a radius pin. See the three fixes |
| Location type | **People living in this location** | Residents, not visitors |
| **Age** | **30 to 65+** | `age_max: 65` is Meta's top bucket and means 65 and older, so Profile A's 58–75 is fully covered |
| Gender | All | |
| **Languages** | **Blank** | Spanish runs as its own ad, not its own ad set |
| **Advantage+ audience** | **OFF** | Forced trade-off. See below |
| Detailed targeting | **None, explicitly** | Interest stacking is out of date and would shrink a pool that needs no shrinking |
| Placements | Advantage+, all | Manual placement selection starves a local audience |
| Attribution | 7-day click, 1-day view | Widest Meta offers. Bath remodel runs a 180-day cycle, so 7 days is already too short |
| Bid strategy | Highest volume | A cost cap on an ad set under 50 events/week simply refuses to spend |
| Special Ad Category | None | Section 7 |

### The 14 ZIPs

`33133` `33134` `33143` `33156` `33157` `33165` `33174` `33176` `33177` `33183` `33186`
`33189` `33193` `33196`

Covers Coconut Grove, Coral Gables, South Miami, Pinecrest, Palmetto Bay, Cutler Bay,
Westchester, Kendall, South Miami Heights, Kendale Lakes, West Kendall, The Crossings,
The Hammocks and Country Walk.

**Not covered: Doral, most of Sweetwater, and Miami Gardens.** Three of the seventeen
service areas. Miami Gardens is roughly 20 miles north of the corridor and was always the
outlier. Doral and Sweetwater are a judgement call the owner should make — adding
`33172`, `33178`, `33182`, `33126` would bring them in. They are not in yet.

### Three things this fixed

**1. The pin was in the wrong place.** `t2s-06` specifies a centre of
`25.6795, -80.4072`. The live ad set was set to `25.6793, **-80.3173**`, which at this
latitude is **5.6 miles east** of the spec. That pushed the circle toward Biscayne Bay
and away from West Kendall, The Hammocks and Country Walk, where Profile B lives. ZIP
selection removes the problem rather than moving the pin.

**2. The circle over-covered by about 40%.** A 12-mile radius from that pin holds roughly
**1.2M adults** against the vault's 400,000 ceiling, and it reached into ZIPs the
business never listed (33175, 33184, 33185, 33194, 33173, 33155, 33170, 33187 and the
Tamiami and Fontainebleau edges). The vault's line applies directly: *a circle is the
wrong shape; where category rules allow it, build the service area from ZIP or city
selections.* We are not in the Housing category, so ZIP targeting is available. It was
simply not being used.

**3. Age floor was too high and cut real buyers.** It was 40–65. Profile B starts at 38
and Profile C at 32, so a floor of 40 removed both. Now 30–65+.

### Advantage+ audience: a forced trade-off, not a preference

`t2s-06` specifies Advantage+ audience **ON** *and* a minimum age of 30. **Meta does not
permit that combination.** The API rejects it outright:

> "With ad sets that use Advantage+ audience, the minimum age audience control can't be
> set to higher than 25."

So it is one or the other. Taking the age floor, for three reasons:

1. **There is no conversion history to expand from.** `Lead` has fired zero times.
   Advantage+ expansion with no signal is uninformed exploration paid for at $50/day.
2. **Miami-Dade is 52.2% homeowners.** The 25–29 cohort in a renter-heavy county is close
   to pure waste, and Advantage+ would force the floor down into it.
3. **The doctrinally correct alternative is unavailable.** The vault prefers *value rules*
   over age restriction — keep the full pool and weight the good segments. Value rules
   need conversion-value data, and this account has none.

**Revisit at day 30**, once real `Lead` events exist. Expansion from a trained model is a
different proposition from expansion from nothing.

Worth noting: the vault's 150k–400k sizing rule exists to control **frequency**, and that
constraint does not bind here. $50/day buys roughly 37,000–75,000 impressions a month.
Spread across even 400,000 adults that is a monthly frequency near **0.1**. Frequency 4.0
is unreachable at this budget on any pool above about 10,000 people. **So the geo decision
is a waste decision, not a frequency decision** — which is exactly why precise ZIPs beat a
generous circle here.

### Why English and Spanish share one ad set

Miami-Dade is roughly two thirds Spanish-speaking at home, so Spanish is not optional.
But splitting into two ad sets halves the signal in each, and both would sit in Learning
Limited permanently. The vault is blunt: splitting $60/day across four audiences gives
each 15 events/week and all four stay Learning Limited forever.

So: **one ad set, both languages as separate ads inside it**, each pointing at its own
locale URL. Meta works out who gets which.

**Split into two ad sets when daily budget reaches $100.** Not before. Split the budget
toward whichever language produces cheaper *booked appointments*, never cheaper leads.

---

## 5. The three ads, as written

CTA button on all three: **Get Quote**. Primary text sits in the 250–500 character
survival band. Headlines are at or under 27 characters so they render whole on Feed.
Primary text truncates around 125 characters behind "See more", so the first sentence
carries the whole argument.

### Ad 1. `TYPE_PriceGate_v2_inhouse` — English, price transparency

Creative `27127981213545161`. Image `adA-price-gate-miami-dade-en-4x5.jpg`.

The recon's central finding: **not one advertiser in the six-month-survivor set publishes
a price.** LJ Stone gates it behind "tap your age to unlock pricing" across ~46 ads,
Premier Home Pros behind "see if you qualify", American Bath & Shower behind an email.
This ad states the category's mechanic and then breaks it.

> Most bathroom companies make you unlock the price. Tap your age. See if you qualify. Sit down in your kitchen on a Saturday.
>
> Here is ours instead. Tub out and a tiled walk-in shower in, from $4,500. Shower and a new floor, from $6,500. The whole bathroom, from $9,500.
>
> Porcelain tile, waterproofed properly, built where your tub sits now. About a week. You pay by milestone, never everything up front.
>
> Family owned in Kendall. Fully insured. 4.9 on Google.

**Headline:** `Your range in 60 seconds`
**Description:** `Kendall. 4.9 on Google.`
**URL:** `https://brokeandfixed.com/en/landing/tub-to-shower?utm_source=facebook&utm_medium=paid&utm_campaign=t2s-miami-202608&utm_content=TYPE_PriceGate_v2_inhouse`

### Ad 2. `TYPE_Method_v2_inhouse` — English, construction method

Creative `1287869019982823`. Image `adB-method-en-4x5.jpg`.

Recon classifies method and construction quality as **whitespace**: nobody argues it. The
whole category argues discount, senior safety, or a gated price.

> A one-day bathroom is not a remodel. It is an acrylic panel bonded over the wall you already have.
>
> Nothing comes out, so nothing has to cure, and the whole thing goes in between breakfast and dinner. That is the only reason it fits in a day.
>
> We build it the other way. Old wall out to the studs, cement board up, then a pan liner and a membrane that gets a full day to cure before one tile goes on.
>
> About a week instead of a day. Porcelain tile, from $4,500.
>
> One year warranty, in writing.

**Headline:** `We take the old wall out`
**Description:** `One year, in writing.`
**URL:** same pattern, `utm_content=TYPE_Method_v2_inhouse`

### Ad 3. `PHOTO_BeforeAfter_H10_v2_inhouse-es` — Spanish, transformation

Creative `1371319154567059`. Image `ad6-before-after-es-4x5.jpg`.

Before/after carries the highest raw CTR in this vertical. Copy says *arriba* and *abajo*
because the layout is stacked, never *izquierda* and *derecha*.

> Arriba es un lunes en Glenvar Heights. Abajo es el viernes de la otra semana.
>
> El mismo cuarto, la misma pared, la misma ventana. Salió la bañera y en su lugar entró una ducha de porcelanato. No movemos la plomería, porque eso convierte una semana limpia en un trabajo de tres semanas.
>
> Demolición, placa de cemento, impermeabilización, un día completo de curado sin nadie en la casa, después porcelanato, lechada y cristal.
>
> Este fue un baño completo, desde $9,500. Sacar la bañera y poner la ducha empieza en $4,500.

**Headline:** `La misma pared, una semana`
**Description:** `Glenvar Heights, Miami.`
**URL:** `https://brokeandfixed.com/es/landing/tub-to-shower?...&utm_content=PHOTO_BeforeAfter_H10_v2_inhouse-es`

**Price correction, owner instruction 26 Aug 2026.** Glenvar Heights was a **full
bathroom remodel**, so quoting it at $6,500 (shower plus floor) was wrong. It now reads
$9,500, which is the published full-remodel starting price in `quote-pricing.ts`. It is
$9,500 and not $8,500 because **every price in an image has to match the landing page**;
a number that exists only in the ad is a price mismatch.

---

## 6. Retargeting: not yet, and here is the trigger

**Do not build retargeting now.** Two independent reasons.

**The pool does not exist.** The vertical playbook sets the threshold at **1,000+ site or
form engagers** before retargeting earns a dollar. The pixel is currently seeing about
**116 PageViews a week**, so roughly 500 a month. You are under half the threshold, and
at $50/day the ads will add maybe 400–900 more visitors a month. Realistically the pool
crosses 1,000 somewhere around **week 4 to 6**.

**The budget cannot carry it.** [[Budget Allocation]] puts retargeting at 5 to 10 percent
at this tier, which is $2.50–$5.00/day. That funds nothing, and a second ad set would
split signal away from the one that matters.

### What to build, when the pool crosses 1,000

One campaign, **one ad set, two messages**. Not an audience ladder. The vault is explicit
that 7/14/30/90-day ladders are dead: four ad sets, four learning phases, one small pool.

| Setting | Value |
|---|---|
| Budget | 5–10% of total. At $50/day that is $3–$5/day, so **wait until total is $100+/day** |
| Audience | Site visitors **0–30 days**, plus form starters who did not complete |
| Exclusion | Anyone who fired `Lead`. Non-negotiable, or you pay to re-sell closed leads |
| Optimization | `OFFSITE_CONVERSIONS` on `LEAD` |
| Creative | Offer restated, financing terms, and social proof. Not the prospecting ads |

**Kitchen and bath runs a 180-day sales cycle**, which prospecting creative cannot carry.
Sequence the retargeting creative:

| Day | Message |
|---|---|
| 0–3 | Offer restated, "still thinking about it?" |
| 4–14 | Social proof: reviews, named local jobs, warranty terms |
| 15–45 | Education: the four things that change a remodel quote, cost breakdown |
| 46–180 | Seasonal urgency, price-increase notice |

> **The honest warning.** Retargeting is mostly **not incremental**, which is worse than
> not working, because it looks like it is working. Reported ROAS commonly overstates real
> contribution by 30–60%, and the gap is concentrated in retargeting, because those people
> were closest to buying anyway. When it is running, the highest-value test in the account
> is to **pause it for 14 days and watch total booked jobs**, not Ads Manager.

---

## 7. Compliance, and the one real rejection risk

**Special Ad Category is None, deliberately.** Meta's Housing definition explicitly names
"housing repairs," and the vault puts full bath remodel in the *genuinely ambiguous*
column. Declaring Housing would cost age targeting, exclusions, and force a 15-mile
minimum radius, which is a 56% increase in wasted impression area.

A tub-to-shower conversion is an elective upgrade. It touches no listing, rental, sale,
mortgage, home insurance, equity or appraisal. Undeclared is the right call.

**Special Ad Category cannot be changed after campaign creation.** If Meta reclassifies
this, you build a new campaign. You do not edit this one.

Rules that keep it that way, in every ad and every future variation:

| Never write | Write instead |
|---|---|
| Fix, repair, damage, leak, rot, mold, failing, water behind the wall | Remodel, upgrade, convert, build, rebuild |
| Home value, resale, equity, your property, neighborhood values | Drop the frame entirely |
| Financing, monthly payment, interest, approval, credit | "You pay by milestone" is a payment schedule and is safe |
| Any competitor trademark | "A one-day bathroom" is a category description and is safe |
| Step-free, curbless, no step, "is stepping over the tub getting hard?" | Nothing. Personal-attribute implication is a rejection and possibly a strike |

Other standing rules: no "contractor" or "licensed" anywhere, only **fully insured**. No
em dashes. Every in-image price reads **From**, never a bare number.

**Expect the occasional false-positive rejection on the Spanish before/after.** Split-frame
before/after is the same visual grammar Meta's health classifiers hunt for. **Appeal, do
not rebuild.** A rebuild resets learning and gets the same answer.

---

## 8. What to do after launch, by day

**Days 1–7: nothing.** No budget changes, no pausing an ad that looks slow, no new ads,
no audience edits. Look once on day 4 and take no action. This is the rule that costs the
most money when broken.

**Daily, four numbers only:** spend, results, CPL, frequency. Turn off every other cut.

**Daily reconciliation:** leads in GoHighLevel must equal leads in Ads Manager. A silently
broken integration burns a week of budget invisibly.

**Day 7, first read.** Expect CPL 30–50% above the $75–$250 band. That is the
new-advertiser tax and it runs about 60 days.

**Day 8, one decision only.** If one ad is taking most of the spend, that is Meta
answering the question. Leave it. Then add 2–3 new ads to the **same ad set**, never a
new ad set.

**Day 14, the owner video ships.** Shoot it in week one. Ten minutes at the next job.
Refresh cadence in this vertical is every 10–14 days, which holds 14-day frequency under
2.0 and CPM down 15–25%. Under Andromeda, effective ad lifespan compressed from 6–8 weeks
to **2–4**.

**Day 30, revisit:** Advantage+ audience (section 3), placement breakdown, and whether
the retargeting pool has crossed 1,000.

### Targets

| Metric | Kill zone | Working | Good |
|---|---|---|---|
| CPL | above $250 | $75–$250 | under $100 |
| Lead to booked job | under 6% | 8–15% | 20%+ |
| **Cost per booked appointment** | above $500 | $250–$500 | under $250 |
| 14-day frequency | above 4.0 | under 3.0 | under 2.0 |

**Cost per booked appointment is the number you steer on, not CPL.** Put it top left on
whatever you build. CPL goes in the third row. At this volume you read it off a sheet by
hand: lead name, source, contacted y/n, appointment set, held, sold, job value. Start
that sheet on day one or you will optimize toward cheap junk.

**Scaling:** +20 to 30% every 72 hours, only while CPL is at or under target and the
qualified rate holds above 40%.

---

## 9. Still open before this goes live

| # | Item | Who |
|---|---|---|
| 1 | **`Lead` has never fired.** Zero events in 28 days. Submit the estimator for real 3–4 times, EN and ES, and confirm each lands in Events Manager and GoHighLevel | **You** |
| 2 | Meta creative review — all three ads are `PENDING_REVIEW`. Confirm approved before activating | Either |
| 3 | **Activation.** Nothing spends until someone flips it to ACTIVE. I will not do that without you saying so explicitly | **You decide** |
| 4 | Conversions API not built. Browser-only tracking loses conversions to iOS and ad blockers. `eventID` dedupe is already wired on the browser side; only the server half is missing. Before scaling, not before launching | Dev |
| 5 | Owner-on-camera video not shot. Highest-value asset this campaign will have | **You** |
| 6 | `Killian-tub-to-shower-results.jpeg` has a macOS `com.apple.macl` attribute returning EPERM. Open and re-save a copy to restore the objection ad | **You** |
| 7 | Page `1099333583269076` is not in the ad account's promoted-pages list. It did **not** block creative creation, so this is hygiene, not a blocker | Optional |

### Ready when you are

The geo template renders all 17 service areas from one command
(`GEO_LAUNCH` in `scripts/build-t2s-ads.mjs`). Four are built. That is the day-30 scaling
mechanic once budget supports per-area ad sets, copied from LJ Stone, who runs one
template across ~40 markets.

Three more ads from `t2s-07` are specified and waiting for the day-8 and day-14 additions.
