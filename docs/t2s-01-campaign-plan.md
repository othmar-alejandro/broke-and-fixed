# Tub to Shower Funnel: Campaign Plan
Broke & Fixed Home Solutions | Miami-Dade | August 2026
Built from the Meta Ads Mastery vault and the marketingskills library.

---

## 0. Read this part first

Three things will decide whether this campaign works, and none of them are the ad copy.

**1. Meta may classify this as Housing.** Meta's Housing Special Ad Category definition includes "housing repairs." Your own vault puts "full kitchen / bath remodel" in the genuinely ambiguous column. If Meta flags it, you lose ZIP targeting, age, gender, exclusions, lookalikes, and your radius gets forced to a 15 mile floor. That would break the whole targeting plan.

Do not launch the real budget until you have tested this. Run one ad at $5 a day for 48 hours and see if it delivers clean. A rejection on a $5 test costs nothing. A rejection after you have built everything costs you a week.

Frame every piece of copy as a remodel or an upgrade. Never as a repair.

**2. The 60 second text back is worth more than everything else in this document.** Your vault's numbers: a Facebook lead forgets they filled out the form within about 20 minutes. Same ads, same spend, moving callback from 14 hours to under 5 minutes moved cost per sold job from $2,247 to $899. That is not a marketing improvement, that is a different business.

**3. Your offer is already the best one in the vertical.** The vault ranks price-anchored bundles first and instant-quote calculators second out of every offer type in home improvement. You have both. Published tiers at $4,500 / $6,500 / $9,500 plus a three step estimator. Most people running these ads are still saying "call us for a free quote," which the vault says carries a 3 to 5x CPL penalty. You are starting ahead.

---

## 1. One decision I made against what you picked

You chose separate English and Spanish ad sets. I built one ad set instead. Here is why, using your own vault's math.

The learning threshold formula is `(target CPA x 50) / 7`. At $50 a day the highest CPA that clears 50 conversions a week is $7.00. Real bath remodel CPL is $60 to $180, and Miami-Dade runs 25 to 40 percent above benchmark, so your working band is roughly $75 to $250. You are structurally Learning Limited no matter what. That is fine and expected at this budget.

But splitting into two ad sets cuts each one's signal in half. The vault is blunt about it: "Splitting $60/day across four audiences gives each 15 events/week. All four stay in Learning limited forever."

So: **one ad set, both languages living as separate ads inside it.** Each ad points to its own locale URL. Meta figures out who gets which. Miami-Dade is roughly two thirds Spanish speaking at home, so there is plenty of signal for it to learn from.

**Split into two ad sets when your daily budget hits $100.** Not before. I wrote the split structure into section 4 so it is ready when you get there.

If you want the split anyway, say so and I will build it. I just want you making that call knowing it costs you learning speed.

---

## 2. Account state as of today

| Thing | ID | Status |
|---|---|---|
| Ad account | 882094667972705 | Active, payment method on file |
| Business | 2553821644995338 | |
| Dataset (pixel) | 1564050852174212 "Brokie" | Firing PageView on the live LP, HTTP 200 |
| Facebook Page | 1099333583269076 | Owned by the right business |
| Instagram identity | Not visible through the connector | **Needs manual connect if you want IG placements** |
| Campaign | 120255036342850397 | Paused, OUTCOME_LEADS |
| Ad set | 120255036345770397 | Paused, $30/day |
| Ads | none | **Nothing built yet** |
| GHL sub-account | BubbBDEstaWhTJReHDcG | 22 snapshot workflows live, none tub to shower specific |
| GHL sending | none | **No email provider, no phone number. Blocks all follow up.** |

---

## 3. What is wrong with the ad set right now

| Field | Now | Change to | Why |
|---|---|---|---|
| Name | `Miami-Dade \| Broad \| 35-65+ \| Website Lead` | `BROAD_none_advantage_Lead` | Vault naming convention. Underscores between fields, hyphens inside a field. Never a pipe. |
| Age | 18 to 65 | 35 to 65+ | The name already claims 35+. An 18 year old in Kendall is not buying a $6,500 bathroom. Advantage+ treats this as a strong signal. |
| Radius | 25 miles from Kendall | **12 miles** | Vault: dense urban is 5 to 8 miles, and a documented HVAC rebuild from 35 mile blanket to 14 mile with a real offer moved CPL from $760 to $63. 12 miles covers 16 of your 17 service areas. Miami Gardens falls out, which is fine, it is your farthest. |
| Budget | $30/day | **$50/day** | Vault: "$1,500/mo is the practical floor." At $30 you are paying the new advertiser tax for twice as long. |
| Bid | Highest volume | Keep | Correct at this volume. No cost cap, no bid cap. |
| Attribution | 1d view 7d click | Keep | Correct. |
| Placements | Advantage+ (all) | Keep | Vault says do not judge by placement at $50/day, sample size of approximately nothing. Revisit at day 30. |
| Optimization | OFFSITE_CONVERSIONS on Lead | Keep | Correct. |

**Campaign rename:** `LEADS_TOF_Estimator_US-MIA_202608`

---

## 4. The structure

### Now, at $50/day

```
LEADS_TOF_Estimator_US-MIA_202608          (ABO, CBO off)
└── BROAD_none_advantage_Lead               $50/day
    ├── STATIC_PriceAnchor_HookA_v1_inhouse       EN
    ├── VID_LinerCallout_HookB_v1_inhouse         EN
    ├── STATIC_BeforeAfter_HookD_v1_inhouse       EN
    ├── VID_Founder_HookE_v1_inhouse              EN
    ├── STATIC_PriceAnchor_HookA_v1_inhouse-es    ES
    └── VID_LinerCallout_HookB_v1_inhouse-es      ES
```

Six ads. Vault says 4 to 6 at this tier, and explicitly warns against running 12.

### Later, at $100/day and up

```
LEADS_TOF_Estimator_US-MIA_2026xx
├── BROAD_en_advantage_Lead      $55/day    4 English ads
└── BROAD_es_advantage_Lead      $45/day    4 Spanish ads
```

Language is set at the ad set level. Split the budget toward whichever language is producing cheaper booked appointments, not cheaper leads.

---

## 5. Budget rules

**Days 1 to 7: do nothing.** No budget changes. No pausing ads. No new ads. No audience edits. Look once on day 4 and take no action. This is the single hardest rule to follow and the one that costs the most money when broken.

**Day 7:** first read. Expect CPL 30 to 50 percent above benchmark. That is normal, the new advertiser tax is real and runs about 60 days.

**Day 8:** one decision only. Then add 2 or 3 new ads to the same ad set. Never a new ad set.

**Day 14:** second read. A 40 to 70 percent week over week CPA swing at this budget is not a problem to fix.

**Scaling:** plus 20 to 30 percent every 72 hours, only when CPL is at or under target and the qualified rate is holding above 40 percent.

**Never go dark.** Cutting spend in a slow month means paying the new advertiser tax again when you come back.

---

## 6. What the numbers should look like

Bath remodel benchmarks from your vault, adjusted up 25 to 40 percent for dense urban Miami-Dade:

| Metric | Kill zone | Working | Good |
|---|---|---|---|
| CPL | above $250 | $75 to $250 | under $100 |
| Lead to booked job | under 6% | 8 to 15% | 20%+ |
| Cost per booked appointment | above $500 | $250 to $500 | under $250 |
| Hook rate (video, cold) | under 15% | 25 to 35% | 35%+ |
| 14 day frequency | above 4.0 | under 3.0 | under 2.0 |

At $50/day and a $120 CPL you should see roughly 12 to 13 leads a month. That is the honest expectation. Do not plan around 50.

**Cost per booked appointment is the number you steer on, not CPL.** Put it top left on whatever dashboard you build. CPL goes in the third row.

The lever ranking at a $12,000 job and $60 CPL, from your vault: improving close rate from 30 to 40 percent is worth $180 per job. Appointment set rate plus 10 points is worth $111. Contact rate plus 10 points is worth $90. Cutting CPL from $60 to $50 is worth $120. **Three of the four biggest levers are operational, not media.** Which is why section 0 point 2 matters more than any of this.

---

## 7. Watch list

**Daily, four numbers only:** spend, results, CPL, frequency. Turn every other dashboard cut off.

**Daily reconciliation:** leads in GHL must equal leads in Ads Manager. A silently broken integration burns a full week of budget invisibly.

**Weekly:** cost per booked appointment, 14 day frequency, spend concentration (one or two ads should be taking 70 percent or more), hook rate.

**Monthly:** cost per sold job by lead cohort, not by calendar month. Kitchen and bath runs a 180 day sales cycle. A 7 day click window cannot see it.

---

## 8. Tracking fixes to make before you spend real money

These came out of reading the code. Ranked by how much they will cost you.

**1. HIGH. Guide opt-ins get tagged `tub-to-shower-lead`, same as real estimator leads.**
`app/api/lead/route.ts` line 301 puts `LEAD_TAG` in the guide tag array. So an email-only lead with no name, no phone, no ZIP and no price range will trip any workflow keyed on that tag. The setup doc already works around it with a manual exclusion, which is fragile.
Fix: remove `LEAD_TAG` from the guide path. Key the estimator workflow on `estimate-request` instead.

**2. HIGH. The thank-you page fails open to "guide".**
`thank-you/page.tsx` line 39: `kind === "quote" ? "quote" : "guide"`. Any estimator success that loses the query string fires the guide event instead of the `Lead` conversion Meta is optimizing on. That silently undercounts and mistrains the algorithm.
Fix: default to `quote`, or render neutral and fire nothing.

**3. HIGH. The Web3Forms fallback may be dead.**
There is an unresolved comment at route.ts 386 saying Cloudflare returns a 403 to server-side POSTs and adding a User-Agent did not fix it. If that is still true, you are single-upstream. If GHL times out, the lead is gone.
Fix: test it from a deployed preview, or replace it with a second recovery path.

**4. MEDIUM. The tag `facebook ads lead` has spaces.**
Every other tag is lowercase kebab-case. Any workflow condition typed as `facebook-ads-lead` will silently never match.
Fix: rename to `facebook-ads-lead` at route.ts line 143 before the workflows go live.

**5. MEDIUM. `rangeLow` and `rangeHigh` are stored as raw integers.**
So a merge field in a text message renders `6500`, not `$6,500`. It reads cheap.
Fix: add a 15th custom field `planningRange` holding the formatted string, `$6,500 to $7,900`. Then the SMS copy in the workflow doc reads right without string surgery.

**6. MEDIUM. ZIP+4 is rejected.**
`/^\d{5}$/` against a field that allows 10 characters. Someone typing `33186-1234` gets "Please check your name, phone and ZIP code."
Fix: strip non-digits, take the first five.

**7. MEDIUM. Estimator email is optional but the nurture is email-only.**
A completed estimator with no email has no reachable address until SMS is live. Another reason SMS is the priority.

**8. LOW. No `fbp` / `fbc` cookie capture and no `event_id`.**
You do not need them today. You will need them the moment you want Conversions API deduplication or offline conversion upload. Worth adding now while you are in the file.

---

## 9. Conversions API and the CRM loop

Meta's published lift for CAPI for CRM is 19 percent lower cost per quality lead, and 44 percent higher lead to quality-lead rate. You cannot use it yet. The vault's threshold is 200+ leads a month and you will be doing 12 to 25.

Do the manual version instead, starting week one. A shared sheet: lead name, source, contacted yes/no, appointment set, held, sold, job value. That sheet is what tells you whether a $180 lead was actually better than a $70 lead. Without it you will optimize toward cheap junk.

GoHighLevel is listed in your vault as having native Meta CAPI plus workflow triggers per pipeline stage, described as "the default for agency-owned stacks, fastest to stand up." So the plumbing is cheap to build now and switch on later when volume supports it.

---

## 10. Launch order

1. Fix items 1, 2 and 4 in section 8. Deploy.
2. Run the $5/day Special Ad Category test with one ad. 48 hours.
3. Turn on LC Email and an LC Phone number in the GHL sub-account.
4. Build the four workflows (separate doc). Keep them in draft.
5. Real browser submission in English. Confirm `Lead` lands in Events Manager and the contact lands in GHL with all 14 fields.
6. Same in Spanish.
7. Publish the workflows. Test one English and one Spanish contact end to end.
8. Update the ad set per section 3.
9. Build the six ads (copy in the ad copy doc).
10. Unpause at $50/day. Do not touch it for seven days.
