# T2S Funnel End-to-End Verification - 2026-08-26

Full plumbing audit of the Facebook ad to GHL workflow chain, run live against
production, the real GHL sub-account, and the real ad account. Every claim
below was tested this session, not read from a spec.

## The chain, and where each link stands

```
Meta ad (Get Quote CTA)
  -> brokeandfixed.com/{en,es}/landing/tub-to-shower?utm_...   [VERIFIED LIVE]
  -> QuoteForm 3-step estimator                                 [VERIFIED LIVE]
  -> POST /api/lead                                             [VERIFIED LIVE, 200]
  -> GHL contacts/upsert + tags                                 [VERIFIED LIVE]
  -> Contact Tag trigger (tag added)                            [WIRED, drafts]
  -> T2S workflow sequences                                     [WIRED, drafts]
```

There is no inbound-webhook step. `GHL_INBOUND_WEBHOOK_URL` is unset on
purpose; the tag written by the upsert IS the trigger mechanism. Do not
"fix" that by adding a webhook.

## What was proven working

1. **Production landing page + form.** Submitted the estimator on the live
   site through a real browser with ad-style UTMs. POST /api/lead returned
   200, visitor landed on /thank-you, Meta pixel script loaded and drained
   its event queue (third-party request logs are hidden in the sandbox
   browser, so Events Manager is the final word on the Lead event).
2. **GHL receives the lead in seconds.** Contact `fp81Hbqt78hYaKd6Aomm`
   ("t2s funnel test", oacdigitalinnovations+t2stest@gmail.com) created with
   source `Tub to shower quote | facebook | t2s-miami-202608 | ...` and tag
   `facebook-ads-lead`. UTM attribution flows end to end.
3. **All 13 T2S workflow triggers read back correct via internal API**:
   01 EN/ES on `estimate-request-en|es`, 02+04 EN/ES on
   `planning-guide-lead-en|es`, 03 on `t2s-no-contact-en|es`, Router on
   Main Pipeline stage Showed - Got Estimate, 98 on `estimate-request`,
   99 on customer reply. 05 EN/ES intentionally trigger-less (Router-fed).
4. **The tag fix works.** Same submission through the new code (local dev
   server, real GHL account) added `estimate-request-en`; the guide path
   added `planning-guide-lead-en`. Both match the triggers exactly.
5. **Meta campaign structure.** Campaign `LEADS_TOF_Estimator_US-MIA_202608`
   and ad set ($50/day) PAUSED as intended. Five ads, all PAUSED, none
   disapproved, every one carrying the Get Quote CTA. Identity EN preview
   renders correctly, display link brokeandfixed.com, ad prices match
   landing page pricing.

## The one break found, and the fix

**Production writes the old tags.** Deployed main had
`estimate-request` + `lang-en` only. The workflows trigger on
`estimate-request-en|es` and `planning-guide-lead-en|es`, which existed only
in commit `4a1fe1e` on t2s/email-campaign. Live leads would never have
started a sequence, even after publishing.

Fix staged as **PR #1** (branch `fix/lead-language-tags`, cherry-pick of
4a1fe1e, single file): https://github.com/othmar-alejandro/broke-and-fixed/pull/1
Vercel already built its preview green (that is the "Ready / Preview" email).
Direct push to main is blocked for the agent, so merging is Omar's click.

## Launch runbook (in order, all Omar)

1. Merge PR #1. Wait for the Vercel production deploy to finish.
2. Publish the 13 workflows in the UI, exits first:
   98, 99 -> 01 EN/ES, 02 EN/ES -> 03 EN/ES, 04 EN/ES -> Router, 05 EN/ES.
3. Swap the two placeholder-proof templates (T2S-03 Proof, T2S-04 Case
   Study) for real jobs. Blocking for 03/04 content honesty, not plumbing.
4. One-click check in Ads Manager: destination URL on the two Identity ads
   (`PHOTO_Identity_v1_inhouse`, `-es`). The three original ads' URLs were
   API-verified; the Identity pair was created later and only their display
   domain could be confirmed by API.
5. Re-run one EN + one ES test submission on production, confirm the
   contact gets `estimate-request-en|es` and enrolls in 01. Then delete or
   keep the test contact.
6. Unpause ad set, then campaign.

## Test artifacts left behind

- GHL contact `fp81Hbqt78hYaKd6Aomm` carries both estimator and guide test
  tags. Publishing workflows later will NOT retro-enroll it (tag triggers
  fire on tag-added events, not on existing tags). Safe to delete anytime.
- One browser Lead pixel event may exist in the dataset from the live test.

## Addendum, same day: PR #1 merged, and a second break found

PR #1 was merged and the production deploy verified: a fresh live-site
submission (contact `skjD0JUG418bN9hZYUHO`) got `estimate-request-en` from
production. Runbook step 1 is DONE.

**Second break: GHL contacts/upsert REPLACES the tag array, it does not
merge.** Verified twice on live contacts. Consequence: an estimator lead
who later submitted the guide form lost `tub-to-shower-lead`, and workflow
99 Reply Exit plus the guarded nurture 1.2 branch on that tag, so a reply
would silently have stopped nothing.

Fix: the guide path now writes LEAD_TAG too, so the identity tag survives
any submission order. Nothing triggers on LEAD_TAG, so it enrolls no one.
Verified locally against the live CRM (estimator then guide keeps the tag).
Commit `f184ee5` on t2s/email-campaign; staged for production as **PR #2**:
https://github.com/othmar-alejandro/broke-and-fixed/pull/2

Runbook change: merge PR #2 alongside step 1's spot. Everything else
stands. Residual, accepted: a later guide submission still wipes
`estimate-request*` off the contact record. Harmless to automation (those
triggers fire on the add event, and lang-* survives in both sets), but tag
filters in the CRM undercount estimator leads who also took the guide.
The full fix would be read-merge before upsert; not worth the latency on
the lead path today.

## Addendum 2026-08-27: WORKFLOWS PUBLISHED, live E2E verified at 00:24 EDT

Publish done via the internal API by the workflow-architect session at
Omar's direction. Independently read back: all 13 published, every trigger
ACTIVE (publish auto-activates triggers, no UI re-save needed), SoR ON for
the 10 messaging flows, OFF for 98/99/Router. The earlier settings wipe on
99/01 EN/01 ES was repaired pre-publish.

Live tests at 00:24-00:30 EDT (the "2am lead" persona), all through the
production site:

| Check | Result |
|---|---|
| EN estimator submit | contact d419YTmkYCirIO2AfQqd, all 5 tags correct |
| EN enrollment | opportunity in Main Pipeline / New Lead, $6,500, 2s after submit |
| ES estimator submit | contact 15hECNlCsCzpfEPwsu4P, estimate-request-es + lang-es |
| ES enrollment | same pipeline/stage/value, seconds after submit |
| Owner alerts (pre-gate, 24/7) | email to brokeandfixed305@gmail.com + owner SMS record, both tests |
| Send window (8am-9pm gate) | customer SMS/email correctly HELD overnight, zero outbound to test contacts |
| Guide path | +t2sliveguide submitted; 02 EN delivery email due after 8am |

Due after 8:00 AM ET: SMS Instant attempts (WILL FAIL, no phone provider
until Twilio lands - not a workflow bug), Email Instant Ack EN+ES
(~8:16), guide delivery email. Verify in the oacdigitalinnovations inbox.

Cosmetic finding: owner alert renders the range as "$6500 to $" because
rangeHigh is deliberately blank. Swap those merge fields for
startingPriceDisplay when convenient.

Test artifacts now in GHL: 5 contacts (+t2stest, +t2stest2, +t2sliveen,
+t2slivees, +t2sliveguide) and 2 OPEN opportunities in Main Pipeline/New
Lead from the live tests. Delete or mark lost after the morning check so
the pipeline stays honest.

## Addendum 2026-08-27 ~1 AM: go-live fixes executed, launch is one click

Omar's call: launch as EMAIL + MANUAL CALLS, fix the open items, unpause.
Executed and verified this session:

- **Placeholder proof emails GONE.** All 4 templates (T2S-03 Proof EN/ES,
  T2S-04 Case Study EN/ES) rewritten around the REAL Glenvar Heights job
  using only owner-verified facts: full remodels start $9,500, tub-to-
  shower starts $4,500, the one-week process from the ad copy. Updated via
  POST /emails/builder/data (canary-verified per template). The two step
  subjects on 03 EN/ES changed Kendall -> Glenvar Heights via careful
  record PUT; readback confirms still published, SoR on, triggers active.
- **The +1 289-301-8642 mystery solved.** The location has NO phone number
  ("No Twilio account found" from the API). Owner alerts ride GHL's shared
  internal relay number, which is why they deliver from a Canadian caller
  ID. Customers cannot receive SMS at all, so email+calls launch is safe.
  Omar should save that number as "B&F Lead Alerts".
- **Byron escalation clarified** (workflow session): nothing broken, it is
  an unbuilt TODO. Needs Byron's cell from Omar, then a second
  internal_notification after "Owner SMS - 30 min urgent" in 01 EN/ES.
- Stray draft "New Workflow : 1786510524396" deleted (was 1 empty step).
- EN/ES test contacts removed from workflow 01 (no more owner-alert noise);
  their 2 test opportunities marked lost. The guide test contact stays
  enrolled as the 8am email-delivery check.
- Identity ads' destinations VERIFIED from the preview payload: both point
  at the correct landing pages with full UTMs. All 5 ads now URL-verified.

**Activation of the Meta campaign is permission-blocked for the agent**
(budget-spending action). Omar unpauses campaign
LEADS_TOF_Estimator_US-MIA_202608 + ad set + 5 ads in Ads Manager.
Ads go through review on activation; delivery starts on approval.

Deferred to Twilio day: SMS compliance auto-append, From-number config,
Byron step (pending his number).

## LIVE 2026-08-27, and the launch blocker that nearly hid itself

Ad set activation failed with Meta error **#1870194**, "location targeting
option that has been removed". It reads like a dead ZIP. It is not. Meta
retired the granular location-type selector, and this ad set still stored
`location_types: ["home"]` ("people living in this location"), which is no
longer publishable.

**The fix, and the trap.** Set `geo_locations.location_types` EXPLICITLY to
`["home","recent"]`. Omitting the field does NOT clear it: the API keeps
the stored value, and `updated_fields` echoes the REQUEST, not what was
saved. The first attempt looked successful and changed nothing. Always
re-read targeting to confirm a targeting write. After the server is fixed,
Ads Manager can still show the error from a stale per-user draft: discard
drafts, hard refresh, then toggle from the list view.

**Verified live state** (API readback, not the UI's summary):

| Entity | State |
|---|---|
| Campaign + ad set | ACTIVE, $50.00/day |
| Ads delivering | Identity v2 tiled, PriceGate, BeforeAfter ES (all past review) |
| Ads paused on purpose | Identity v1 ES, ZZ_DO-NOT-LAUNCH_Method |
| Targeting | 14 ZIPs intact, home+recent, age 30-65, WCA_Leads_180d excluded |
| Delivery errors | none |

The age 35-65 draft sitting in the Ads Manager editor was never published;
stored age is still 30-65 per spec.

## Meta recommendations: standing posture for this account

Meta's Opportunity Score suggests changes that optimize Meta's delivery,
not a 14-ZIP service-area business selling a $6,500 job. Current stance,
all DECLINE until real CPL data exists:

- **Advantage+ creative enhancements** - alters art-directed creative with
  overlays, text rewrites and visual touch-ups. This brand has a hard rule
  that every price shown in an image matches the landing page; auto-altered
  creative can break it. Never turn on for price-bearing creative.
- **Advantage+ audience** - reaches beyond the deliberate 30-65 range.
  Renters and non-owners are waste at this ticket.
- **Reels 9:16 format** - there is no video creative yet. Real opportunity,
  but it is a production task, not a toggle.
- **Auto-add music** - wrong register for a trades credibility ad.

## Gotchas confirmed this session

- The landing page renders blank in automated-browser screenshots while the
  DOM is fully present and interactive. Screenshot artifact, not a bug;
  drive the page by accessibility refs or JS, not pixels.
- `guide-${source}` produces the tag `guide-guide-inline` (source is already
  "guide-inline"). Cosmetic only; nothing triggers on it.
- shower.brokeandfixed.com redirect (branch seo/shower-vanity-redirect) is
  still undeployed. Not in this funnel's path; ads link the full URL.
