# Tub-to-Shower Meta Targeting Spec

Broke & Fixed Home Solutions. Kendall, FL. Meta Leads campaign, website destination, `Lead` pixel event, $20/day.

> **Delivery note.** This session ran in plan mode, so the file could not be written to
> `/Users/othmarcasilla/broke-and-fixed-305/docs/t2s-06-targeting-spec.md`. The full spec is below.
> Approve the plan and it gets copied to that path unchanged.

---

## 0. Budget reality, stated first

The vault's home services build puts the practical floor for an account like this at **$1,500/mo**, and says below that "the account never stabilises" (*Home Services Campaign Build, Exact Structure and Budget*, updated 2026-08-03, citing M.Wolf Media 2026). $20/day is **$600/mo**, which is 40% of that floor.

What that buys, using vault numbers only:

| Input | Value | Source |
|---|---|---|
| Bath remodel Meta CPL band | $60 to $180 | Web Pinnacles, Jun 2026, via vault *CPL Benchmarks by Trade*, 2026-08-03 |
| Dense urban metro adjustment | **up 25% to 40%** | RYN Digital, May 2026, via same vault note |
| Effective Miami-Dade CPL | **$75 to $252** | derived |
| Leads at $600/mo | **2.4 to 8 per month** | derived |
| Learning phase exit threshold | 50 conversions per ad set per week | Meta, via vault *Home Services Campaign Build* |

At 0.6 to 2 conversions per week against a 50 per week threshold, this ad set is **permanently Learning Limited**. That is not a build error. It is arithmetic, and the vault says to accept it, run broad, and change nothing for 14 days.

Two honest options for the owner:

1. Run $20/day as a **90-day proof window**. Judge on lead-to-quote conversations, not CPL. Expect CPL 30% to 50% above benchmark in weeks 1 to 2, settling weeks 3 to 4 (vault 90-day expectation curve).
2. Raise to **$50/day ($1,500/mo)** and get to the vault's stated floor. At a $150 blended CPL that is 10 leads/month, which is where a real read becomes possible.

Everything below is built to work at $20/day. It also works unchanged at $50/day. Nothing in this spec needs restructuring when the budget moves.

---

## 1. Who actually buys this

Three profiles. One primary.

### Profile A (PRIMARY): The step-over buyer, 58 to 75, 1960s to 1980s house

**Who.** Owns the home outright or nearly. Lives in Palmetto Bay, Westchester, Kendall proper, Pinecrest, South Miami Heights, or Cutler Bay. The bathroom is original or was last touched in the 1990s. The trigger is physical: stepping over a 15-inch tub wall got harder, or a spouse slipped, or a doctor said something.

**Evidence.**

| Fact | Number | Source |
|---|---|---|
| Miami-Dade median year structure built | **1980** | Point2Homes / Miami-Dade CDMP Housing Element data, retrieved 2026-08-14 |
| Miami-Dade housing units built before 2000 | **82%** of 1.03M units | Miami-Dade housing analysis citing 2019 Census, retrieved 2026-08-14 |
| Kendall homeownership rate | **62.2%** (2024) | Data USA, Kendall FL |
| Miami-Dade homeownership rate | **52.2%** (2024) | Data USA, Miami-Dade County |
| Kendall median age | **41.9** | Data USA, Kendall FL |
| Palmetto Bay housing stock | 1960s to 1970s ranch homes, larger lots | `lib/data/locations.ts` |
| Westchester housing stock | 1960s to 1970s bathrooms, terrazzo floors | `lib/data/tub-to-shower-locations.ts` |

The Kendall corridor's homeownership rate runs **10 points above the county**. That gap is the whole business. County-wide Miami-Dade is a renter-heavy market at 52.2%, and renters cannot buy a $6,500 tiled shower. The service area was picked correctly.

**Why primary.**

1. **It is the only profile with a trigger event rather than a preference.** Preference projects sit for three years. Trigger projects close in three weeks.
2. **The one-day liner franchises already proved the demand and already priced it wrong.** Bath Fitter and Re-Bath style operators run their entire model on this exact buyer. Someone quoted $16,000 for an acrylic liner and then shown $6,500 for a real tiled shower built where the tub is now is the highest-conversion conversation this business has. The positioning line, "a one day install is a liner over your old wall, we take the old wall out," is written for this person and nobody else.
3. **It maps to the housing stock.** County median build year 1980 puts the modal home squarely in the 45-year-old bathroom band.
4. **It skews Spanish-dominant harder than the other two profiles.** Older Miami-Dade Hispanic residents are far more likely to have Spanish as their daily language, so the ES ad carries more weight in this segment than a 50/50 read would suggest. See section 5.

**Ticket.** Lands at **$6,500** (shower plus floor). This buyer wants the floor done because the floor is the part that is hard to clean and hard to stand on.

### Profile B (SECONDARY, volume): Family in a 1990s to 2000s West Kendall house with a dead second bathroom

**Who.** 38 to 55, two working adults, kids in school or just out. West Kendall, The Hammocks, Country Walk, The Crossings, Kendale Lakes. The guest or kids' bathroom has a builder-grade tub-shower combo nobody has taken a bath in since 2014.

**Evidence.**

| Fact | Number | Source |
|---|---|---|
| ZIP 33186 population | **72,732** (2024 est) | city-data.com, ZIP 33186 profile |
| ZIP 33186 median age | **40.9** | city-data.com |
| ZIP 33186 Hispanic share | **68.1%** | Data USA / city-data, ZIP 33186 |
| Kendall median household income | **$83,664** (2023) | Data USA, Kendall FL |
| Miami-Dade median household income | **$71,753** (2024) | Data USA, Miami-Dade County |
| West Kendall housing stock | 1990s to 2000s planned communities, HOA | `lib/data/locations.ts` |
| The Hammocks 2020 population | **59,480** | US Census 2020 via Wikipedia |
| Kendale Lakes 2020 population | **55,646** | US Census 2020 via Wikipedia |
| Kendall West 2020 population | **36,536** | US Census 2020 via Wikipedia |

Kendall household income runs **$12,000 above the county median**. That supports a $4,500 to $6,500 ticket without a financing conversation, which matters because financing is where liner franchises win on monthly-payment framing.

**Why not primary.** No trigger. This buyer has been meaning to do it for three years and will comparison-shop hard. Volume is real and this is where the $4,500 tier sells, but the creative that wins here is price transparency, not urgency. Run it as ad 3 and 6 in the set, not as the lead concept.

### Profile C (DEPRIORITIZED): Recent buyer, 32 to 45, bought in the last 24 months

**Who.** Bought a 1980s or 1990s house, is now in project mode, has a punch list.

**Evidence.** Kendall median property value **$567,900** (Data USA, 2024) against a county median of **$463,000** (Data USA, 2024). Someone who just cleared a $568k purchase in a market where the county median is $463k is stretched on cash. A $4,500 targeted fix beats a $25,000 gut renovation on exactly that constraint, and the published price tiers are the pitch.

**Why deprioritized.** Smallest of the three by count, and at six total ads there is no room to build a concept for them. They will self-select into the Profile B creative anyway, because the price tiers are the hook for both.

**Consequence for creative allocation:** roughly 3 ads on Profile A (step-free access, one-day-liner contrast), 2 on Profile B (price tiers, one week, real tile), 1 wildcard. Split EN/ES across all of them, see section 5.

---

## 2. The Housing Special Ad Category question

### The rule

Meta's Business Help Center defines the Housing category as ads that promote or link to a housing opportunity or related service, "including but not limited to listings for the sale or rental of a home or apartment, homeowners insurance, mortgage insurance, mortgage loans, **housing repairs** and home equity or appraisal services." (Meta Business Help Center, *How to choose a Special Ad Category*, quoted in the vault note *Local Targeting, Radius, and Service Area Strategy*, accessed 2026-08-03.)

"Housing repairs" is written into the policy text. It is not an algorithmic accident.

### Where tub-to-shower sits

The vault's operator read places **full bath remodel in the "genuinely ambiguous" column**, not in the "almost certainly Housing" column (which holds roof repair, foundation repair, storm and water damage restoration, structural and exterior repair, and anything mentioning home value, equity, or appraisal).

**The call: launch Spec A, standard category, undeclared.** A tub-to-shower conversion is an elective improvement, not a repair. Nothing in the offer touches home value, equity, appraisal, insurance, or financing.

**The condition attached to that call:** the classifier reads the ad and the landing page, not the invoice. Keep every one of these out of the copy and off the page:

| Never use | Why |
|---|---|
| repair, fix, damage, restore, restoration | Direct hit on "housing repairs" |
| home value, resale value, equity, appraisal, ROI, investment | Named in the policy text |
| leak, water damage, mold, rot, failing | Reads as repair |
| financing, monthly payment, 0% APR, qualify | Credit category exposure on top of Housing |
| unsafe, hazard, dangerous | Pulls a repair reading and weakens the Profile A pitch anyway |

Safe framings that keep the Profile A angle intact: "easier to step into," "no more climbing over the tub wall," "built where the tub is now," "porcelain tile, properly waterproofed."

The vault also warns: running an undeclared housing ad risks rejection, repeated-violation flags, and at the extreme account restriction, plus Fair Housing Act exposure in the US independent of Meta. So Spec B below is not a footnote. It is the fallback you keep loaded.

### The vault's test-first move, adapted

The vault says to test category classification with a $5/day ad before committing real budget. At $20/day the whole campaign is the test. So instead:

1. Build both specs in Ads Manager. Leave Spec B paused.
2. Launch Spec A.
3. If any ad is rejected with a Special Ad Category reason, or the account gets a housing flag, do not appeal. Pause Spec A, unpause Spec B, and take the reach penalty. Appealing burns two to five days at a budget that cannot afford them.

### What declaring costs

Per the vault's table, for US advertisers, declaring Housing removes or limits: **age targeting, gender targeting, ZIP or postal code targeting and exclusion, all exclusion targeting, lookalike audiences, saved audiences, and some home-improvement-adjacent interests.** Radius gets a floor, and practitioner reporting puts the US floor at **15 miles** (flagged in the vault as a secondary source, not stated numerically in Meta's help text).

One thing you keep: as of **late 2025**, Special Ad Categories qualify for algorithmic targeting, so **Advantage+ audience still works inside a declared Housing campaign** (vault *Audience Strategy in the Broad-Targeting Era*, change log, late 2025). Spec B is not forced back into manual.

---

## 3. Radius math

Center pin: **25.6795, -80.4072** (Kendall).

### Step 1: how far the service area actually reaches

At latitude 25.68 degrees, 1 degree of latitude = 69.05 miles and 1 degree of longitude = 62.33 miles. Straight-line distance from the pin to each service community:

| Community | Lat, Lon | Miles from pin |
|---|---|---|
| The Crossings | 25.6689, -80.4067 | 0.7 |
| Kendale Lakes | 25.7076, -80.4064 | 1.9 |
| West Kendall | 25.6842, -80.4431 | 2.3 |
| The Hammocks | 25.6717, -80.4478 | 2.6 |
| Country Walk | 25.6353, -80.4292 | 3.3 |
| South Miami Heights | 25.5973, -80.3956 | 5.7 |
| Sweetwater | 25.7637, -80.3730 | 6.2 |
| Pinecrest | 25.6673, -80.3084 | 6.2 |
| Palmetto Bay | 25.6251, -80.3228 | 6.5 |
| Westchester | 25.7548, -80.3253 | 7.3 |
| South Miami | 25.7076, -80.2937 | 7.3 |
| Cutler Bay | 25.5808, -80.3468 | 7.8 |
| Cutler Bay south (33189) | ~25.560, -80.347 | ~9.0 |
| Coral Gables | 25.7215, -80.2684 | 9.1 |
| **Coconut Grove** | 25.7275, -80.2436 | **10.7** |

**8 miles covers 12 of 15.** It misses 33189's south end, Coral Gables, and Coconut Grove.
**11 miles covers all 15.**

### Step 2: the circle is the wrong shape here

Two hard edges bound the circle, and both are uninhabited, which changes the population math:

- **East.** Biscayne Bay sits about 7.9 miles east of the pin at this latitude.
- **West.** The Urban Development Boundary runs roughly 5.2 miles west of the pin (around SW 157th to 177th Ave). Everything past it is Everglades and agricultural land.

Circular segment areas cut off by those two lines, for a radius r and offset distance d, using `r²·arccos(d/r) − d·√(r²−d²)`:

| Radius | Full circle | Everglades cut (d=5.2) | Bay cut (d=7.9) | Parks / ag / airbase | **Developed land** |
|---|---|---|---|---|---|
| 8 mi | 201 sq mi | 23.6 | 0.1 | ~15 | **~162 sq mi** |
| 11 mi | 380 sq mi | 80.1 | 32.5 | ~30 | **~237 sq mi** |
| 15 mi | 707 sq mi | 200.5 | 128.0 | ~60 | **~318 sq mi** |

### Step 3: density

Anchor from a real census geography rather than a metro-wide average. **Kendale Lakes-Tamiami CCD has a population of 378,183** (Census Reporter, US Census). That CCD covers roughly 64 square miles of developed land, giving **~5,900 people per square mile**. That sits well below the Miami urbanized-area weighted density of 7,395 per square mile (Broward County MSA comparison, 2019), which is correct: suburban Kendall is less dense than the metro's coastal core.

Adults 18+ run about **78%** of population in a county with a median age of 40.7 (Data USA, Miami-Dade, 2024).

### Step 4: the estimate

| Geo option | Est. residents | Est. adults 18+ | vs vault band (150k to 400k) |
|---|---|---|---|
| Core 8 ZIPs only | ~445,000 | ~347,000 | **inside** |
| **All 14 service ZIPs** | **~680,000** | **~530,000** | 33% over |
| 8-mile radius | ~956,000 | ~745,000 | 86% over |
| 11-mile radius | ~1,400,000 | ~1,090,000 | 173% over |
| **15-mile radius (Spec B floor)** | **~1,880,000** | **~1,470,000** | **268% over** |

### Step 5: the finding the brief asked for

**Yes, 12 miles overshoots badly.** A 12-mile circle from this pin holds roughly 1.2M adults, three times the vault's 400,000 ceiling, and it over-covers the declared service area by about 40% into ZIPs the business did not list (33175, 33184, 33185, 33194, 33173, 33155, 33146, 33158, 33170, 33187 and the Tamiami and Fontainebleau edges).

**But the sizing rule does not bind at $20/day, and here is why.**

The 150k to 400k rule exists to manage frequency. The vault: "Below 100k you hit frequency 4.0 within days and CPL degrades." Run the impressions:

- $600/month ÷ a $20 CPM = **30,000 impressions per month**. At a $40 CPM it is 15,000.
- Spread across 530,000 adults that is a monthly frequency of **0.03 to 0.06**.
- The vault notes Meta concentrates delivery on the most responsive ~15% of the pool. Even against an effective pool of 80,000, frequency lands at **0.2 to 0.4 per month**.

Frequency 4.0 is unreachable at this budget on any pool larger than about 10,000 people. The constraint the rule protects against does not exist here.

**Therefore the geo decision is a coverage and waste decision, not a frequency decision.**

### The call

**Spec A geo: the 14 ZIPs, entered as ZIP selections. Not a radius pin.**

Three reasons, all from the vault's *Local Targeting* note:

1. "A circle is the wrong shape. Where category rules allow it, build the service area from ZIP or city selections that follow drive time, not a pin drop." Category rules allow it in Spec A.
2. The circle over-covers by ~40% into unlisted ZIPs, which is spend on people the business did not choose to serve.
3. Biscayne Bay and the Everglades make the circle geometrically lopsided in a way ZIP selection sidesteps entirely.

With a **minimum age of 30** layered on (see section 4), the 18-29 cohort comes out, roughly 20% of the adult population. That lands the addressable pool at **~424,000**, effectively at the top of the vault's 150k to 400k band. Ads Manager will likely display a range of **350,000 to 550,000**; treat anything in that window as confirmation the geo is built right.

**Spec B geo: 15-mile radius from 25.6795, -80.4072.** No choice, that is the floor. Estimated ~1.47M adults, of which ~530k are in the service area. Roughly **two of every three impressions land outside the 14 ZIPs** on a pure population read. The real leakage is lower, because delivery follows the `Lead` events rather than population, but plan for it and price it in.

---

## 4. Exact ad set settings

One campaign. One ad set. Six ads.

### Campaign level (both specs)

| Field | Value |
|---|---|
| Objective | **Leads** |
| Campaign name | `T2S \| Leads \| Kendall \| 2026-08` |
| Special Ad Category | **Spec A: none. Spec B: Housing** |
| Advantage+ campaign budget (CBO) | **Off** |
| Campaign spending limit | none |
| A/B test | off |

CBO is off per the vault's Beginner build ("CBO off. One ad set, one budget"). With a single ad set, CBO and ABO are mathematically identical anyway. Keeping the budget at ad set level makes the daily number legible to the owner.

### Ad set level, SPEC A (standard category)

| Field | Value |
|---|---|
| Ad set name | `T2S \| ZIP14 \| Age30+ \| ADV+ \| EN-ES` |
| Conversion location | **Website** |
| Pixel / dataset | Broke & Fixed pixel (same one in `app/layout.tsx`) |
| Conversion event | **Lead** |
| Performance goal | **Maximize number of conversions** |
| Daily budget | **$20.00** |
| Schedule | Run continuously, no start/end date, no dayparting |
| **Location type** | **People living in this location** (not "recently in", not "traveling in") |
| **Locations** | ZIP codes, US: **33176, 33193, 33196, 33183, 33186, 33177, 33156, 33157, 33189, 33143, 33134, 33165, 33174, 33133** |
| Location exclusions | none |
| **Age** | **30 to 65+** (minimum 30, no maximum) |
| **Gender** | **All** |
| **Languages** | **BLANK. Leave empty.** See section 5 |
| **Advantage+ audience** | **ON** |
| Audience suggestions | **None at launch.** Nothing to seed with. See section 6 |
| Audience exclusions | **Customer list custom audience**, if it matches 100+ people. See section 6 |
| Detailed targeting | **None. Explicitly none.** No interests, no behaviors, no demographics |
| Detailed targeting expansion | n/a, subsumed by Advantage+ audience |
| **Placements** | **Advantage+ placements. All on. Zero exclusions** |
| Brand safety / inventory filter | Standard (default). Do not set to Limited |
| **Attribution setting** | **7-day click, 1-day view** |
| **Bid strategy** | **Highest volume.** No cost cap, no bid cap, no ROAS goal |
| Delivery type | Standard (not accelerated) |
| Customer Lifecycle Strategy | Leave default if the field appears |

### Ad set level, SPEC B (Housing declared)

Everything above except these six rows:

| Field | Value | Change from Spec A |
|---|---|---|
| **Locations** | **Pin drop 25.6795, -80.4072 + 15 mile radius** | ZIP targeting unavailable |
| Location type | **People living in this location** | unchanged, still selectable |
| **Age** | **18 to 65+** | age targeting unavailable |
| **Gender** | **All** | forced |
| **Audience exclusions** | **None** | exclusion targeting unavailable |
| Detailed targeting | **None** | some home-improvement interests restricted anyway |
| **Advantage+ audience** | **ON** | still available, per the late-2025 change |

Spec B keeps Advantage+ placements, the `Lead` event, highest volume bidding, 7-day click / 1-day view, blank Languages, and the same six ads. Only geo, age, and exclusions change.

### Why each of the contested settings

**Website destination, not instant form.** The vault's objective table: instant form for tickets under $1,500, website for tickets over $1,500. Ticket here is $4,500 to $9,500. Instant forms give 20% to 40% more raw volume, but landing pages convert **35% to 55% lead-to-booked against 15% to 30%** for instant forms. At 2 to 8 leads a month you cannot afford junk leads. Website wins.

**`Lead` event, not "booked appointment" or a call event.** Required daily budget per ad set = `(target CPA × 50) ÷ 7`. A $200 booked appointment needs **$1,428.57/day**. A $60 lead needs $428.57/day. Neither is fundable, but the lead event at least keeps the model pointed at the cheapest available signal. The vault is unambiguous: optimize on the lead event and push quality back through the CRM, do not move the optimization event up.

**Not "conversion leads."** That performance goal requires Conversions API for CRM, which the vault says needs **200+ leads per month** from instant forms. At a $150 CPL that is $30,000/month. Not reachable. Revisit only if budget goes past $12,000/month.

**Highest volume, no cost cap.** A cost cap on an ad set producing under 50 events per week will simply refuse to spend. The vault's whole Beginner posture is to stop constraining a starved learner.

**7-day click / 1-day view.** This is the widest window Meta offers and it is the default. Do not narrow to 1-day click. The vault puts kitchen remodel at a **180-day sales cycle** and bath remodel in the same trade band. A 7-day attribution window is already far too short for the real decision cycle. Narrowing it further would hide conversions the ads actually caused.

**Advantage+ placements, no exclusions.** The vault: "Meta can now spend up to 5% of budget on an excluded placement anyway. Use value rules to bid a placement down instead." And separately: "Manual placement selection starves a small local audience."

**Minimum age 30, no maximum.** Miami-Dade homeownership is **52.2%** county-wide, and the 18-29 cohort in a renter-heavy county is close to pure waste. A minimum of 30 removes it. No maximum, because a cap would cut Profile A, the primary target. If lead quality comes back skewed young after 60 days, raise the minimum to 35, not lower the maximum.

The vault does note that restricting age removes you from Advantage+ state and prefers **value rules** instead, keeping the full pool and weighting the good segments. That is the doctrinally correct tool and it is unusable here: value rules need conversion-value data, and 2 to 8 leads a month produces none. Revisit value rules at 50+ leads/month.

**Signal quality before anything else.** The vault: verify **Event Match Quality above 7.0** on the primary conversion event before blaming delivery for anything. Confirm before launch that the `Lead` event fires on the landing page form's success state, that browser pixel and Conversions API are both sending it, and that they deduplicate on a shared `event_id`. At this volume every single event carries enormous weight in the model.

### Creative count

| | |
|---|---|
| Ads in the set | **6** (3 EN, 3 ES) |
| Distinct concepts | **3**, each shipped in both languages |
| Refresh cadence | **Monthly**, not the 10-to-14-day cadence used at real spend |

The vault's Beginner creative quota is 2 to 4 assets/month with the note "fatigue is slow at low frequency," which the frequency math in section 3 confirms. The old 6-ad-per-ad-set ceiling was deleted from Meta's documentation in **February 2025** (documented by Jon Loomer), so six is a floor and not a limit if more concepts exist.

The reason creative volume is doing the work here and not targeting: **Andromeda**, Meta's ad retrieval engine, shipped a **10,000× increase in retrieval model capacity**, a **+6% recall improvement** and a **+8% ads quality improvement** across Facebook and Instagram (Meta Engineering, 2024-12-02). Retrieval stopped being the bottleneck, so selection pressure moved onto the ad itself. One creative is one lottery ticket per impression. Six is six.

Do not repeat the "+22% ROAS from Andromeda" figure to the client. That number in the same Meta post describes Advantage+ shopping campaigns using GenAI creative features, not Andromeda.

---

## 5. Language handling, EN and ES inside one ad set

### The decision

**Leave the Languages field completely blank. Both specs.**

### Why

Meta's Languages field exists for one situation: reaching people who speak a language **not common in the location you are targeting**. Advertising in Spanish to Boise is the textbook case. It filters on the user's Facebook or Instagram interface language and on languages the account has indicated.

Miami-Dade is the opposite of that situation. About **67% of residents aged five and over speak Spanish at home** (US Census / Miami-Dade demographic sources, retrieved 2026-08-14), and the 14 target ZIPs run higher: Kendall is **65.5% Hispanic** and ZIP 33186 is **68.1% Hispanic** (Data USA, 2024). Both English and Spanish are common languages of this location.

Three concrete costs to filling the field in:

1. **It shrinks reach for nothing.** You would be filtering a pool where both languages are already native.
2. **It cuts the bilingual majority the wrong way.** Enormous numbers of Miami-Dade Hispanic homeowners run their phone interface in English and speak Spanish at home. Setting Languages to Spanish would exclude exactly the Profile A buyer you most want. Setting it to English would exclude the Spanish-dominant seniors who are the single best-converting slice of Profile A.
3. **It is a hard constraint.** Language is a targeting selection, not a suggestion, and adding it narrows a pool that is already sized for one starved ad set.

### What happens when it is blank

Meta delivers to everyone in the location regardless of interface language. Ad language is then handled at the **ad level**, by the retrieval engine, per person.

Andromeda evaluates every eligible ad against every impression opportunity. Meta's framing: personalization is per-person, not per-segment, and the winning ad for person A is not the winning ad for person B. In practice the ES ad accumulates its wins on Spanish-interface and Spanish-signal users because those are the users who stop, read, and click it. The EN ad does the same on the other side. That is not a promise Meta makes. It is an emergent result of optimizing for the `Lead` event with six ads in the pool.

### The two things that make it actually work

**1. Language self-selection happens in the first frame.** A Spanish headline is read by Spanish readers and scrolled past by everyone else. That is the real language targeting, and it costs nothing. The vault line applies literally here: the creative is the targeting.

**2. Destination URLs must be locale-correct.** This is the safeguard that catches every mismatch the algorithm makes.

| Ad | Destination |
|---|---|
| EN ads (3) | `https://brokeandfixed.com/en/landing/tub-to-shower` |
| ES ads (3) | `https://brokeandfixed.com/es/landing/tub-to-shower` |

The site already routes on `[locale]`, so hardcode the locale segment in each ad's URL rather than relying on any redirect or browser-language detection. If an ES ad gets shown to an English speaker, the worst case is a Spanish landing page rather than a broken funnel, and vice versa. Add a visible language switch on the landing page so a mismatched click can self-correct in one tap.

### What NOT to do

**Do not split EN and ES into two ad sets.** Two ad sets at $10/day each is the exact failure the vault names: "Three starved ad sets perform worse than one fed one." It would halve an already-Learning-Limited budget, double the learning-phase tax, and buy a segmentation the retrieval engine already performs for free.

**Do not run two campaigns by language.** The vault only splits by language at Mastery tier, $150k+/month, in the structure table.

**Do not machine-translate the EN ads.** Write the ES ads natively. The vault's creative note on new-language markets is blunt: native re-record, not dubbing.

### Reporting

Because both languages sit in one ad set, read the split at the **ad level** in Ads Manager: impressions, CPL, and lead volume per ad. That gives you the EN vs ES read without paying for a structural split. If ES is producing leads at half the CPL after 60 days, the answer is more ES creative in the same ad set, not a separate ad set.

---

## 6. Exclusions

### Spec A, apply at launch

| Exclusion | How | Condition |
|---|---|---|
| **Existing customers** | Export every past customer from GoHighLevel (email, phone, first name, last name, ZIP). Upload as a Customer List custom audience. Exclude at ad set level | Needs **100+ matched people** or Meta will not let the audience deliver, and the exclusion silently does nothing |
| **Existing and disqualified leads** | Same export, all contacts already in the pipeline, quoted-not-closed included. Vault window for lead gen is **90 days**; use "all time" here given the low absolute count | Same 100-person floor |
| **Employees, family, crew** | Add to the same list rather than building a second audience | Combine to help clear the 100 floor |

Practical note: if GoHighLevel holds fewer than roughly 130 raw records, hash matching will not clear 100 matched and neither exclusion will function. In that case skip both, and instead handle it on the landing page with a "have we worked with you before?" field. Do not build an exclusion audience you cannot verify is delivering.

**Do not exclude anything else.** No ZIP exclusions beyond the geo definition, no interest exclusions, no placement exclusions, no age-based exclusions past the minimum-30 floor.

### Spec B

**None.** Exclusion targeting is unavailable in a declared Housing campaign. The customer list exclusion is gone, so build the equivalent into the funnel: a "current or past customer" checkbox on the landing page form, and a GHL workflow that routes those submissions away from the new-lead pipeline so they do not pollute the CPL read.

### Account-level setup, do this before launch either way

The vault calls this "the most common unforced error in an otherwise well-built account," and it is not retroactive.

In **Ad Account Settings, Audiences**, define:

1. **Existing customers** = the full customer-list upload **plus** the pixel `Lead` and any purchase event. Not pixel events alone. A five-year-old business with a two-year-old pixel tells Meta that most of its customers are strangers, then pays prospecting CPMs to re-acquire them.
2. **Engaged audience** = website visitors from organic, direct, and email, plus any email subscribers who never bought, plus abandoned quotes sitting in GHL. Keep it **separate** from the customer list. Folding engaged into existing turns off the cheapest conversions available.

Meta builds the on-platform half automatically (video viewers, page followers, IG engagers, post engagement, DMs). The off-platform half is the part you must upload, and it is the whole point of the exercise.

Payoff at this budget is mostly **reporting**: you get the new / engaged / existing spend split, which is the fastest way to catch an "acquisition" campaign quietly re-buying people who already know the business. Screenshot the split at day 14 and day 30.

Set a **30-day recurring reminder to re-upload** the customer list. The vault calls this the highest-value ten minutes in account hygiene, and lists decay silently.

### What to build later, with the thresholds

| Asset | Threshold before it becomes viable | Realistic timing at $20/day |
|---|---|---|
| **Retargeting ad set** | Vault: **$0 retargeting until 1,000+ site or form engagers exist**, and retargeting as a structure starts at roughly **$8,000/month** (Intermediate tier) | At $2 to $4 per landing page click, $600/month buys 150 to 300 visitors. **5 to 7 months** to reach 1,000. Do not build it before then, and do not build it as a separate ad set until budget is far higher |
| **Lookalike audience** | Needs **100+ matched people** in the source, and the vault's guidance is to seed from **actual closed jobs**, not page engagers | **12+ months** at 2 to 8 leads/month with a fraction closing. And when it arrives, feed it as an **Advantage+ audience suggestion**, never as hard targeting. The vault: a 1% lookalike is a starting hint, not a boundary |
| **Advantage+ audience suggestions** | Vault priority order: purchasers last 180 days, then top-20% LTV list, then 1% LAL, then 25s+ video viewers last 90 days, then site visitors last 180 days | None of these exist with usable volume at launch. Run **geo-only**, which is the correct Beginner posture per the vault tier table. Add the first suggestion once the customer list clears 100 matched |
| **CAPI for CRM / conversion leads goal** | **200+ leads per month** from forms | Not reachable at this budget. Run the manual feedback loop: tag every GHL lead with quoted / booked / sold, and read it by ad monthly |
| **Value rules** | Requires conversion-value data across enough events to derive a multiplier | Not before 50 leads/month |
| **Creative testing campaign** | Vault Intermediate tier, $3,000+/month | Test inside the live ad set until then |

**One exception worth doing now, because it is free:** if GoHighLevel already holds 100+ past customers, upload the list, use it as the exclusion, **and** add it as a single Advantage+ audience suggestion. Adding it as a suggestion does not constrain delivery. Meta starts there and expands freely, which is exactly the warm start a starved, slow-converting ad set benefits from. The vault names this as the one case where a lookalike or seed still earns its keep: "under ~$100/day with a CPA above $50, broad can take weeks to find its footing."

---

## 7. What NOT to do at $20/day

Every line is from the vault.

**Structure**

1. **Do not split into two ad sets.** Not by language, not by ZIP cluster, not by price tier, not by buyer profile. "Three starved ad sets perform worse than one fed one."
2. **Do not add a retargeting ad set.** $0 until 1,000+ engagers exist, which is five to seven months out.
3. **Do not add a creative testing campaign.** Vault Beginner build: "Testing $0, test inside the live ad set."
4. **Do not add a second campaign for the ES version.** Language splits start at Mastery tier, $150k+/month.

**Targeting**

5. **Do not build interest stacks.** Meta culled detailed targeting options on **2025-01-15** and ad sets using removed options stopped delivering. The vault instruction is to delete every ad set whose only distinguishing feature is an interest.
6. **Do not add a hard lookalike.** Advantage+ Lookalike expansion now applies across **nine performance goals** and cannot be disabled in most cases. A lookalike is a suggestion, and you have no seed anyway.
7. **Do not fill in the Languages field.** Section 5.
8. **Do not exclude placements.** Meta can spend up to **5%** of budget on an excluded placement regardless, and manual selection starves a small local audience.
9. **Do not narrow the radius below the 14 ZIPs to "focus" the budget.** The frequency ceiling that would justify it is unreachable at this spend, per section 3.

**Optimization**

10. **Do not move the optimization event up.** Booked appointment at a $200 target requires **$1,428.57/day**. Sold job at $720 requires **$5,142.86/day**.
11. **Do not set a cost cap or bid cap.** An ad set under 50 events/week with a cap will not spend.
12. **Do not narrow the attribution window.** 7-day click / 1-day view is already short against a 180-day trade sales cycle.
13. **Do not use the "conversion leads" performance goal.** It needs 200+ leads/month.
14. **Do not build value rules.** No value data at this volume.

**Operating discipline**

15. **Do not touch anything for 14 days after launch.** CPL runs **30% to 50% above benchmark** in weeks 1 to 2 and settles in weeks 3 to 4. Every edit resets the model's priors.
16. **Do not judge CPL before week 4.** And do not judge it against the $41.26 blended "Home & Home Improvement" figure (LocaliQ, updated 2025-10-24). Judge against the bath remodel band of $60 to $180 adjusted up 25% to 40% for a dense urban metro, so **$75 to $252**.
17. **Do not expect to exit the learning phase.** It will not happen at 0.6 to 2 conversions per week. Say so at kickoff, in writing.
18. **Do not test new creative by adding it to the ad set mid-flight and expecting reach.** Incumbents absorb delivery. At refresh, swap the losers out rather than stacking new ads on top.
19. **Do not write "home value," "equity," "repair," or "financing" into the copy.** Section 2. That is what pulls the Housing classifier onto a campaign that does not need to be there.
20. **Do not appeal a Special Ad Category rejection.** Switch to Spec B and keep spending. An appeal costs two to five days this budget cannot absorb.

**The one thing worth more than every setting above**

The vault's own framing: at this budget, speed-to-lead and the CRM loop are worth more than any structural change available. A 10-percentage-point improvement in contact rate is worth roughly **$90 per sold job**. Splitting the ad set is worth negative money. Put the effort into calling every lead inside five minutes and into tagging outcomes in GoHighLevel so there is something to optimize against in ninety days.

---

## Sources

**Vault (`/Users/othmarcasilla/Meta Ads Mastery`)**
- `14 Vertical Playbooks/Local Targeting, Radius, and Service Area Strategy.md`, updated 2026-08-03
- `02 Campaign Playbooks/Audience Strategy in the Broad-Targeting Era.md`, updated 2026-08-03
- `02 Campaign Playbooks/Andromeda and the 2026 Meta Algorithm, What Actually Changed.md`, updated 2026-08-03
- `02 Campaign Playbooks/Account-Level Audience Definitions, New, Engaged, and Existing.md`, updated 2026-08-13
- `14 Vertical Playbooks/Home Services Campaign Build, Exact Structure and Budget.md`, updated 2026-08-03
- `14 Vertical Playbooks/CPL Benchmarks by Trade.md`, updated 2026-08-03

**Project**
- `/Users/othmarcasilla/broke-and-fixed-305/lib/data/tub-to-shower-locations.ts`
- `/Users/othmarcasilla/broke-and-fixed-305/lib/data/locations.ts`

**External, all retrieved 2026-08-14**
- Data USA, Kendall FL: https://datausa.io/profile/geo/kendall-fl
- Data USA, Miami-Dade County FL: https://datausa.io/profile/geo/miami-dade-county-fl
- city-data.com ZIP 33186 profile: https://www.city-data.com/zips/33186.html
- city-data.com ZIP 33176 profile: https://www.city-data.com/zips/33176.html
- Census Reporter, Kendale Lakes-Tamiami CCD: https://censusreporter.org/profiles/06000US1208691705-kendale-lakes-tamiami-ccd-miami-dade-county-fl/
- Point2Homes, Miami-Dade County demographics: https://www.point2homes.com/US/Neighborhood/FL/Miami-Dade-County-Demographics.html
- Miami-Dade CDMP Housing Element: http://www.miamidade.gov/planning/library/reports/cdmp-housing-element.pdf
- US Census QuickFacts, Miami-Dade County: https://www.census.gov/quickfacts/fact/table/miamidadecountyflorida
- Wikipedia, 2020 census CDP populations (The Hammocks, Kendale Lakes, Kendall West, Richmond West)
- Broward County MSA density comparison, 2019: https://www.broward.org/Planning/Demographics/Documents/BBTN/BBTN-MSAComparison-2019-02_FINAL.pdf
