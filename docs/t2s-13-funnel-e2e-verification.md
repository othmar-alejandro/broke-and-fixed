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

## Gotchas confirmed this session

- The landing page renders blank in automated-browser screenshots while the
  DOM is fully present and interactive. Screenshot artifact, not a bug;
  drive the page by accessibility refs or JS, not pixels.
- `guide-${source}` produces the tag `guide-guide-inline` (source is already
  "guide-inline"). Cosmetic only; nothing triggers on it.
- shower.brokeandfixed.com redirect (branch seo/shower-vanity-redirect) is
  still undeployed. Not in this funnel's path; ads link the full URL.
