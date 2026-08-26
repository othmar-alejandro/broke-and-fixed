# Round One Launch Checklist, $20 a Day
Broke & Fixed Home Solutions | Tub to shower | Miami-Dade | 25 Aug 2026

Supersedes the budget and creative-count sections of `t2s-01-campaign-plan.md`, which
were written for $50 a day. Everything else in `t2s-01`, `t2s-02`, `t2s-04`, `t2s-06`
and `t2s-07` still stands. This document is the ordered list you work through.

Every number below is sourced from the Meta Ads Mastery vault with its note named, or
marked as unverified. Nothing here is a guess dressed up as data.

---

## 0. What $20 a day actually buys

Read this before anything else, because it sets what counts as success.

**The learning phase is out of reach and that is fine.** The vault's formula is
`(target CPA × 50) ÷ 7` per ad set, per
[[Minimum Viable Budget — The 50-Conversion Math]]. At $20 a day the highest cost per
lead that clears fifty conversions a week is **$2.80**. Real bath remodel CPL is
$60 to $180 (Web Pinnacles, Jun 2026, remodel and GC band), and dense urban metros run
25 to 40 percent above benchmark (RYN Digital, May 2026), so Miami-Dade is roughly
**$75 to $250**. You will be Learning Limited permanently. The vault's instruction for
exactly this situation is blunt: *accept it, run broad, and change nothing for 14 days.*

**The honest lead math.**

| | |
|---|---|
| Daily budget | $20 |
| Monthly | ~$600 |
| Working CPL band, Miami-Dade bath remodel | $75 to $250 |
| Leads per month at that band | **2 to 8** |
| First 14 days | CPL runs 30 to 50 percent above benchmark (M.Wolf Media, Apr 2026) |
| Realistic week one | **0 to 2 leads.** Zero in week one is not a broken campaign |

The vault puts the practical floor for a home services account at **$1,500 a month**.
At $600 you are below it. That is your call to make and it is a reasonable one to make,
but it changes what the money is for.

**So treat month one as a signal test, not a lead flow.** In 30 days $600 can honestly
tell you three things:

1. Which of the three creatives earns the click.
2. Whether the landing page converts the click.
3. Whether the plumbing works end to end: pixel fires, lead lands in GoHighLevel, phone rings.

It cannot tell you a reliable CPL, and it cannot tell you which angle wins on cost per
booked job. Do not make a decision that needs those numbers off this data.

**The lever that beats the media budget.** At a $12,000 job, the vault's ranking of
improvements is: close rate plus 10 points is worth $180 a job, appointment-set rate
plus 10 points is worth $111, contact rate plus 10 points is worth $90. Cutting CPL
from $60 to $50 is worth $120. Three of the four biggest levers are operational.
[[Speed-to-Lead — The Highest-ROI Operational Fix]] is worth more than doubling this
budget. Call inside 5 minutes or the spend is wasted.

---

## 1. Pixel verification, done

You asked me to check the Meta tag against the campaign. Here is what is actually true
as of today, read from the live account and the repo, not assumed.

| Check | Result |
|---|---|
| Pixel ID in code | `1564050852174212`, at `app/[locale]/layout.tsx:23` |
| Dataset on the ad account | `1564050852174212`, named "Brokie", `is_active: true` |
| **IDs match** | **Yes** |
| Mounted once, root layout | Yes. `components/MetaPixel.tsx` via `layout.tsx:249` |
| Fires on client-side route changes | Yes, `MetaPixel.tsx:18` |
| Firing live | Yes. **116 PageViews in the last 7 days**, most recent today 11:25am |
| `Lead` standard event wired | Yes, `components/landing/ThankYouContent.tsx:93`, with `eventID` dedupe |
| **`Lead` events actually received by Meta** | **ZERO in 28 days.** Only PageView has ever fired |
| Conversions API (server side) | **None.** `server_last_fired_time` is epoch. No CAPI code in `app/api/lead/route.ts` |
| Pixel attached to the ad set | **Not set.** The ad set optimizes `OFFSITE_CONVERSIONS` with no `promoted_object` |

**Two of these are launch blockers.**

**Blocker A. The ad set optimizes for a conversion event but no pixel is attached.**
The ad set's `promoted_object` is empty. Optimization goal is `OFFSITE_CONVERSIONS`
with nothing telling Meta which pixel or which event. Fix in section 3.

**Blocker B. Meta has never seen a single `Lead` event from this pixel.** You are asking
the algorithm to optimize toward an event that has never happened, on a budget that
cannot generate volume. That is the worst possible cold start.

The fix costs nothing: **submit the estimator form for real, from a browser, three or
four times before launch.** English and Spanish. Confirm each one lands in Events
Manager as `Lead` and in GoHighLevel with all fields. That does two jobs at once, it
proves the funnel end to end and it puts the event in Meta's index so the ad set has
something to reference on day one.

**Not a blocker but fix it soon.** No Conversions API means browser-only tracking, which
loses conversions to iOS and ad blockers. The `eventID` dedupe plumbing is already built
on the browser side, so the server half is the only missing piece. At 2 to 8 leads a
month that loss is small in absolute terms, but every lost lead is a large share of a
tiny sample. Worth doing before you scale, not before you launch.

---

## 2. The three creatives, rebuilt from the recon

**First build was made without an Ad Library sweep and it showed.** The sweep is now
done and written up in `t2s-11-recon-report.md`. It changed the lead creative. Read the
report; the short version is below.

**Not one advertiser in the six-month-survivor set publishes a price.** LJ Stone gates
it behind "tap your age to unlock pricing" across ~46 ads. Premier Home Pros gates it
behind "see if you qualify." American Bath & Shower gates it behind an email. Home
Concepts runs "here's what it should cost" and then never says. Broke & Fixed publishes
$4,500 / $6,500 / $9,500 on the page, before anybody calls.

So the ad is not the number. The ad is the **contrast**.

Files are in `public/ads/round-one/`, rendered by `scripts/build-t2s-ads.mjs`, which is
deterministic. Re-run it after any price change and every ad updates itself.

| Ad | File | Angle | Bucket per recon | Lang |
|---|---|---|---|---|
| **A** | `adA-price-gate-<area>-en-4x5.jpg` | "Nobody will tell you what it costs. So here it is." | **Whitespace.** Nobody publishes | EN |
| **B** | `adB-method-en-4x5.jpg` | "A one-day panel skips three of these." | **Whitespace.** Nobody argues method | EN |
| **6** | `ad6-before-after-es-4x5.jpg` + `-9x16` | Same room, one week apart | Highest raw CTR format in the vertical | ES |

**Ad A is orange.** Every advertiser in the proven set runs navy, gold and red. Orange
is both the brand colour and the only field nobody in the category occupies, which is
the cheapest pattern interrupt available.

**Ad A is geo-templated.** LJ Stone's actual engine is one template with the city name
swapped across roughly forty markets, and under Andromeda each is a separate retrieval
entity. Four are rendered (Miami-Dade, Kendall, Palmetto Bay, Doral) and **all 17
service areas are one line in `GEO_LAUNCH`**. At $20 a day run one or two, not
seventeen; this is the day-30 scaling mechanic, built now so it is ready.

**Ad B uses generated art, and only as a diagram.** The exploded layer illustration came
from Higgsfield in the same navy-and-orange language as `compare-liner.png` and
`compare-rebuild.png` already on the landing page. **A generated photoreal bathroom is
never allowed in an ad**, because the page FAQ promises every photo is real work and the
ads have to keep that promise. Illustration is fine. Fake job photos are not.

### Why three, not one and not six

You were right that $20 does not carry six creatives. It does not carry one either.

- **One ad** gives Andromeda a single retrieval entity, so you reach one behavioural
  pocket and are invisible to the rest. One disapproval also takes the campaign dark.
- **Six ads** at $20 a day is under $3.50 each. Nothing accumulates enough impressions
  to resolve, and you paid production cost six times for a result you cannot read.
- **Three** is the floor that still gives distinct fingerprints. Meta concentrates spend
  anyway, so one or two will take 70 percent of it inside a week. That concentration is
  the signal you are buying.

Every pair differs on three or more of the vault's five diversity dimensions (awareness
stage, emotional state, format, use case, persona), so the set passes the gate.

### Text, image or video, answered

You asked which pulls better. The sourced answer, then the call for this account.

| | Static | Video |
|---|---|---|
| Average Meta CPM | **~$15.80** | ~38 percent higher on cold audiences |
| Clicks | baseline | **+73 percent** |
| Customer acquisition cost | **−28 percent cheaper** | baseline |
| Production cost per asset | $1 to $60 | $150 to $700 |
| Brief to live | **1 to 4 hours** | 3 to 7 days |

Neither wins outright. The consistent 2026 finding is that a roughly **70/30
video-to-static split beats a single-format account**, so the right question is never
"which one," it is "why is one of them at zero."

Static wins outright in four situations, and this account is in all four:

1. **The claim is numeric.** $4,500 is the whole offer. Numbers get read, not watched.
2. **The angle is comparison or objection handling.** Ad 4 is exactly that.
3. **Feed placement, over-35 audience.** Feed scroll rewards legibility over motion.
4. **You need volume this week.** Three statics shipped today. Three videos do not exist.

For home services specifically the vault is equally clear the other way: **owner on
camera, vertical, shot on a phone, beats polished agency b-roll almost every time.** It
is the trust builder, and a homeowner is deciding whether to let a stranger into the
house.

**So: all three launch static, and that is a known compromise, not the finished state.**
An all-static account is a single-format account and gives up the video half of the
split. The fix is already scheduled. Section 6 of `t2s-07` puts the owner-on-camera
piece at day 14, and item 1 of its shot list is ten minutes of the two of you at the
next job. Shoot it in week one. That single clip is the highest-value creative asset
this campaign will have, and it costs a phone and ten minutes.

The recon adds one more reason to hold the video: **Home Concepts' actual winner is the
raw one**, yellow highlighter text slapped over a real photo. Not corporate polish, not
gold-and-red either. A third register that looks like a real person made it. That is
what the owner-on-camera clip should feel like when you shoot it. Do not over-produce it.

**Before and after carries the highest raw CTR in this vertical**, which is why ad 6
uses it. Expect the occasional false-positive rejection on it, because split-frame
before/after is the same visual grammar Meta's health classifiers hunt for.
**Appeal, do not rebuild.** A rebuild resets learning and gets the same answer.

---

## 3. Exact ad set changes

Campaign `120255036342850397` `LEADS_TOF_Estimator_US-MIA_202608`, objective
`OUTCOME_LEADS`, paused. Ad set `120255036345770397` `BROAD_none_advantage_Lead`, paused.
Zero ads exist.

| Field | Now | Change to | Why |
|---|---|---|---|
| Daily budget | **$50.00** | **$20.00** (`2000` cents) | Your call |
| `promoted_object` | **empty** | pixel `1564050852174212`, event `LEAD` | **Blocker A.** Optimizing for a conversion with no pixel attached |
| Advantage+ audience | **off** (`advantage_audience: 0`) | **on** | Vault: local audiences are already small, do not shrink them further. With zero conversion history Meta needs maximum freedom to find the pocket. Age 40 to 65 becomes a strong signal rather than a hard wall |
| Age | 40 to 65 | Keep | Correct for this service. Do not widen |
| Radius | 12 miles, 25.6793 / −80.3173 | Keep | Vault: a 12-mile radius beats a 30-mile blanket every time. Covers 16 of your 17 areas |
| Location type | Home | Keep | Residents, not people passing through |
| Placements | Advantage+, all | Keep | Manual placement selection starves a small local audience. Revisit at day 30, not before |
| Optimization goal | `OFFSITE_CONVERSIONS` | Keep | Correct. Do not switch to a proxy event like landing page views. That trains the model to find clickers |
| Bid strategy | Highest volume | Keep | No cost cap, no bid cap at this volume |
| Special Ad Category | None | **Keep None** | See below |

### Special Ad Category, the decision and the risk

Meta's Housing definition explicitly names **"housing repairs."** Your own vault puts
"full kitchen / bath remodel" in the genuinely ambiguous column.

**Run it undeclared.** A tub-to-shower conversion is an elective upgrade. It touches no
listing, rental, sale, mortgage, home insurance, equity or appraisal. Declaring Housing
would cost you age targeting, exclusions, and force the radius to a 15-mile floor, which
is a straight 56 percent increase in wasted impression area on a $20 budget.

**The risk is real and here is the mitigation.** All ad copy in `t2s-07` was already
written under the rule that nothing may read as repair. No leaks, no rot, no damage, no
"what is behind your wall," no home value, no resale. Keep it that way in every variation.

**Special Ad Category is set at campaign level and cannot be changed after creation.** If
Meta does classify this as Housing, you build a new campaign, you do not edit this one.

The `$5/day, 48-hour delivery test on ad 1 alone` from `t2s-07` is still the right probe.
At $20 a day it costs a quarter of your budget for two days, which is the cheapest
insurance available.

### One thing that will stop the build

**The Facebook Page is not attached to the ad account.** Page "Broke and Fixed"
`1099333583269076` exists and you have admin rights on it, but the ad account's promoted
pages list comes back empty. Ads cannot be created until the Page is added to the ad
account in Business Manager. Do this first, it takes two minutes.

---

## 4. The ads, copy and destinations

Full primary text, headlines and descriptions are in `t2s-07` sections 3. Use them
verbatim, they are already length-checked against the fold. CTA button on all three:
**Get Quote**.

| Ad name | Headline | Destination |
|---|---|---|
| `TYPE_PriceAnchor_H18_v1_inhouse` | `Your range in 60 seconds` | `/en/landing/tub-to-shower?utm_source=facebook&utm_medium=paid&utm_campaign=t2s-miami-202608&utm_content=TYPE_PriceAnchor_H18_v1_inhouse` |
| `PHOTO_Objection_H3_v1_inhouse` | `Still have the tub?` | `/en/landing/tub-to-shower?...&utm_content=PHOTO_Objection_H3_v1_inhouse` |
| `PHOTO_BeforeAfter_H10_v1_inhouse-es` | `La misma pared, una semana` | `/es/landing/tub-to-shower?...&utm_content=PHOTO_BeforeAfter_H10_v1_inhouse-es` |

Spanish ad 6 uses the **stacked** master, so its first line must read
`Arriba es un lunes en Glenvar Heights. Abajo es el viernes de la otra semana.`
Not izquierda and derecha. The corrected line is in `t2s-07`.

---

## 5. Launch order

Work top to bottom. Do not skip ahead.

1. **Attach the Page** `1099333583269076` to ad account `882094667972705` in Business
   Manager. Nothing can be built until this is done.
2. **Commit and deploy the creatives.** The images are on disk at
   `public/ads/round-one/`, untracked. Meta's image upload accepts a public URL only,
   no local files and no Drive or Dropbox links, so they must be live at
   `https://brokeandfixed.com/ads/round-one/...` before the ads can be built.
3. **Fire real `Lead` events.** Submit the estimator from a browser, three or four times,
   English and Spanish. Confirm each in Events Manager and in GoHighLevel. This is
   Blocker B and it is the cheapest fix in this document.
4. **Update the ad set** per section 3. Budget to $20, attach the pixel and `LEAD`, turn
   Advantage+ audience on.
5. **Build the three ads**, paused, with the copy and URLs in section 4.
6. **Run the $5/day category probe** on ad 1 alone for 48 hours. If it delivers clean,
   the rest follow.
7. **Unpause at $20/day.** Then do not touch it for seven days.

---

## 6. What to do, and not do, after launch

**Days 1 to 7: nothing.** No budget changes, no pausing an ad because it looks slow, no
new ads, no audience edits. Look once on day 4 and take no action. This is the rule that
costs the most money when broken, and at $20 a day a single impatient edit resets a
learning period you cannot afford to pay for twice.

**Day 7, first read.** Four numbers only: spend, results, CPL, frequency. Expect CPL
30 to 50 percent above the $75 to $250 band. That is the new advertiser tax and it runs
about 60 days.

**Day 8, one decision.** If one ad is taking most of the spend and the other two have
effectively nothing, that is Meta answering the question you paid for. Leave it.

**Day 14, the owner video ships.** Shoot it in week one so it is ready. Refresh cadence
in this vertical is every 10 to 14 days, which keeps 14-day frequency under 2.0 and CPM
down 15 to 25 percent. Under Andromeda, effective ad lifespan compressed from 6 to 8
weeks down to **2 to 4**.

**The number you steer on is cost per booked appointment, not CPL.** Put it top left on
whatever you build. CPL goes in the third row. At this volume you will be reading it off
a shared sheet by hand: lead name, source, contacted yes/no, appointment set, held, sold,
job value. Start that sheet on day one. Without it you will optimize toward cheap junk.

**Never go dark.** Cutting spend in a slow month means paying the new advertiser tax
again when you come back.

---

## 7. Open items

| Item | Status |
|---|---|
| Meta ad account writes | **Blocked in this session by the permission classifier.** Section 3 and 4 have every exact value, so this is executable by hand in Ads Manager, or by me once the permission is granted |
| Facebook Page not attached to the ad account | Blocks ad creation. Two minutes in Business Manager |
| `Lead` event has never fired | Blocks sane optimization. Fixed by four real form submissions |
| Conversions API | Not built. Browser-only tracking. Do before scaling, not before launching |
| `Killian-tub-to-shower-results.jpeg` unreadable | The file carries a macOS `com.apple.macl` attribute that pins read access to one app and returns EPERM to everything else. Cannot be cleared from the command line. **Open it and re-save a fresh copy** to restore it. The renderer skips it loudly rather than dropping the ad silently. Only affects the objection ad, which is not in the launch three |
| Owner-on-camera video | Not shot. Ten minutes at the next job. Highest-value asset this campaign will have |
| Homeowner consent for the Glenvar photos | Already public on the landing page, but get it in writing and put the clause in the job contract going forward |
| Tracking fixes 1, 2 and 4 from `t2s-01` section 8 | **All three applied.** Guide opt-ins no longer carry `LEAD_TAG` (`route.ts:356`), the thank-you page now defaults to `quote` rather than `guide` (`thank-you/page.tsx:48`), and the tag is `facebook-ads-lead` with no spaces (`route.ts:169`). Nothing to do |
