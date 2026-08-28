# T2S 15 - Meta Conversions API Wiring Spec

Date: 2026-08-27. Research grounded in: live API reads of dataset
`Brokie` `1564050852174212`, official GHL help docs (each claim
adversarially re-verified against the live articles), Meta developer
docs, the Meta Ads Mastery vault (`/Users/othmarcasilla/Meta Ads
Mastery/`, Tracking & Attribution + Vertical Playbooks), and a
file-by-file inventory of this repo's pixel code. Sources cited inline.

Depends on `t2s-14-pipeline-rebuild.md` Phase 1 (stage renames). Stage
IDs are what triggers bind to, so this spec works either way, but it
uses the new names.

## Current state (verified 2026-08-27)

> **Status update, 2026-08-27 evening.** Phase 2 is BUILT and merged: the
> route now reads `x-forwarded-for` and `user-agent`, captures the GHL
> contact id from the upsert, and sends the server `Lead` with the shared
> `event_id`, hashed PII, raw `fbp`/`fbc` (with the documented `fbclid`
> fallback), gated on `META_CAPI_ACCESS_TOKEN`. Unset token = one log line,
> nothing sent. `META_CAPI_TEST_EVENT_CODE` (env) replaces the in-code
> test_event_code so verification needs no deploy. The privacy notice's
> provider clause now discloses hashed conversion matching. Open: Phase 0
> (token + GHL custom values, Omar, ~15 min) and Phase 1 (workflows 91/92/93,
> Omar, by hand in the builder). Verification steps below unchanged.

- Dataset `Brokie` `1564050852174212`: active, browser events only
  (`Lead`, `estimate_cta_click`, `form_start`, `form_step`, `PageView`).
  `server_last_fired_time` is epoch zero. **No server event has ever
  been sent.** No crm or server channel exists yet.
- Campaign optimizes for `Lead` (OUTCOME_LEADS, OFFSITE_CONVERSIONS,
  conversion event LEAD, per `t2s-12-campaign-as-built.md:129-131`).
- The site already fires browser `Lead` with a dedup key: `eventId`
  generated at submit (`QuoteForm.tsx:572-575`), fired as `eventID` on
  the thank-you page (`ThankYouContent.tsx:88-102`), stored on the GHL
  contact in field `metaEventId` `pq5ueS5n9ngk5PbmLDB8`
  (`route.ts:244`).
- `fbclid` is stored on every contact, both paths, in field
  `v7t2MtrRLZ6AebhbsDNU` (`route.ts:251`, `route.ts:393`).
- `fbp`/`fbc` are posted by the browser to `/api/lead` but currently go
  nowhere usable (the webhook forward at `route.ts:463` is env-gated
  and unset by design). The route reads no request IP or user agent.
- GHL's workflow engine has a native `facebook_conversion_api` action.
  None exist in the account yet.

## The one fact that decides the architecture

**GHL's CAPI action has no event_id field.** Verified against the live
help articles (48001185099, 48001236281, 155000003691) and the GHL
changelog; the only Custom Mapping overrides are FBCLID (funnel events)
and Facebook Lead ID (lead events). GHL's automatic dedup works only
for events originating on GHL funnel pages, which our Next.js landing
page is not. Community reports confirm the double-count consequence.

Therefore:

1. **GHL must never send the `Lead` event.** The browser pixel already
   sends it. A GHL copy could not carry our `eventId`, Meta could not
   collapse the pair, and every lead would count twice. The vault calls
   dedup failure "the single most common failure" in CAPI setups,
   inflating reported results 1.6 to 2.0x.
2. **Down-funnel events are safe from GHL.** Schedule, Quote, and
   Purchase have no browser twin. Nothing to dedup against.
3. **The server-side `Lead` belongs in our own code** (`/api/lead`
   direct to the Graph API), where we control `event_id`, hashing, and
   every match key. Phase 2.

## What this buys (vault doctrine)

Meta's published numbers for CRM-event feedback in home services: 19%
lower cost per quality lead on average, 44% lift in lead-to-quality-lead
rate. The vault calls this "the highest-leverage technical work
available in this vertical": without it Meta optimizes for people who
fill in forms; with it, for people who look like the ones who signed
contracts. Adding a deduplicated server `Lead` also typically recovers
10 to 30% of attributed conversions lost to ad blockers and Safari
(vendor-sourced number, measure our own).

**What we do NOT do:** switch the ad set performance goal to Conversion
Leads. It requires Instant Form leads (we run website leads), 200+ per
month (Meta) / 250 (GHL), and a mapped Meta Lead ID. We expect ~20
leads a month. `t2s-06:305` already ruled it out. Optimization stays on
`Lead`; the vault's rule is "buy appointment-quality through CAPI for
CRM, not through the optimization event." Revisit only past 20+
down-funnel events per week, which is a different business.

## Event map

| Funnel moment | Event | Type | Sender | Dedup | Value |
|---|---|---|---|---|---|
| Estimator submit | `Lead` (standard) | website | Browser pixel today; + server twin from `/api/lead` in Phase 2 | `eventId`, both sides | starting price when priced |
| Stage move to Appointment Booked | `Schedule` (standard) | GHL CAPI action | GHL workflow 91 | none needed | none |
| Stage move to Estimate Given | `Quote` (custom, vault's home-services map) | GHL CAPI action | GHL workflow 92 | none needed | estimate amount |
| Stage move to Won | `Purchase` (standard) | GHL CAPI action | GHL workflow 93 | none needed | **real contract value** |

Standard names wherever one fits, per vault doctrine: standard events
feed Meta's cross-advertiser priors; "a custom event with 40
conversions/week optimises worse than a standard event with the same
volume." `Quote` is the vault's own naming for the estimate stage
(Lead, Qualified, ScheduleAppointment, AppointmentHeld, Quote,
Purchase). Purchase must carry the true contract value, never an
average; the value feed is "most of the available edge" in a vertical
where job values span 100x.

We use GHL's **Funnel Event** type (choosable event name, value,
currency), not the Lead Event type (which forces the pipeline stage
name as the event name and only allows value on a stage literally named
Purchase). Pipeline Stage Change firing a Funnel Event is GHL's
documented Advanced Configuration; it requires FBCLID passed via Custom
Mapping from a custom field, which we already store.

## Phase 0 - Omar, in the UI, ~15 minutes

1. Events Manager, dataset `Brokie` `1564050852174212`, Settings,
   Conversions API, **Generate access token**. This is the manual-token
   ("Integrations") connection type; the Facebook OAuth under GHL
   Settings, Integrations is a different product (lead-ads sync) and is
   not required for this.
2. In GHL: Settings, Custom Values, create `meta_capi_access_token`
   with the token, and `meta_pixel_id` = `1564050852174212`. The
   workflow actions reference these custom values so a token rotation
   is one edit, not three.
3. Check Events Manager, Settings, "Domains In Your Allow List" does
   not block `brokeandfixed.com` (a known silent event-eater per GHL's
   FAQ).

## Phase 1 - Omar, in the workflow builder, three drafts

**Build these by hand in the builder, not via the CLI.** No
`facebook_conversion_api` step exists in the account to copy, the
internal API accepts unvalidated step shapes without error, and we
already ate one silent-failure incident that way (t2s-12 fix session).
Same lesson, same rule.

Shared settings for all three: re-entry / Allow Multiple ON (a lead can
revisit a stage; GHL's own conversion-leads walkthrough requires it),
stop on response OFF (utility workflow, no messaging), publish after
the test protocol below.

### `T2S | 91 CAPI Schedule`
- Trigger: Opportunity stage changed to `Appointment Booked`
  (`823cb17b-691e-47a5-9ddf-6fd78ab186e7`), Main Pipeline.
- Step: Facebook Conversions API. Connection: Integrations, Access
  Token `{{custom_values.meta_capi_access_token}}`, Pixel ID
  `{{custom_values.meta_pixel_id}}`. Event Type: Funnel Event. Event:
  `Schedule`. Custom Mapping ON, FBCLID = contact custom field `fbclid`.

### `T2S | 92 CAPI Quote`
- Trigger: Opportunity stage changed to `Estimate Given`
  (`14f62266-e975-48b6-8e54-8d12c5015823`), Main Pipeline. This is the
  same stage that fires `T2S | 05 Router`; both run, they do not
  interact.
- Step: same action config. Event: `Quote`. Value: the estimate amount
  (opportunity value / `planning_range_low`; pick whichever the builder
  exposes cleanly, static fallback 6500). Currency USD. Custom Mapping
  FBCLID as above.

### `T2S | 93 CAPI Purchase`
- Trigger: Opportunity stage changed to `Won`
  (`b279032e-778e-4b10-a810-410a22433abf`), Main Pipeline.
- Step: same action config. Event: `Purchase`. Value: opportunity
  value. Currency USD. Custom Mapping FBCLID as above.
- **New habit this creates: before moving a card to Won, Omar updates
  the opportunity value to the actual contract amount.** The value
  starts as `planning_range_low` from the estimator; left alone, every
  Purchase reports the teaser price. Add this line to the stage table
  in t2s-14.

Scope note: the triggers are stage-scoped, so any Main Pipeline lead
that books or buys sends the event, not just T2S leads. That is
correct; it is all honest remodeling-funnel signal. Events from
contacts with no `fbclid`/Meta attribution will simply not attribute to
ads (GHL documents this), which is also correct.

## Phase 2 - code, server-side `Lead` with dedup (Claude builds, Omar supplies the token)

Add a fire-and-forget CAPI call to `/api/lead` (quote path), same
pattern as the existing webhook block at `route.ts:447-470`
(non-blocking, one retry, lead survives any failure):

- `POST https://graph.facebook.com/v23.0/1564050852174212/events` with
  `access_token` from env `META_CAPI_ACCESS_TOKEN` (Vercel env var,
  never committed, same handling as `GHL_API_KEY`).
- Payload per vault requirements: `event_name: Lead`, `event_time` now
  (Unix seconds), **`event_id` = the same `eventId` already in hand**
  (`route.ts:608`), `action_source: website`, `event_source_url` from
  the posted page, `custom_data` value/currency when priced.
- `user_data`: `em` and `ph` normalized then SHA-256 (email trim +
  lowercase; phone digits only with country code), `fn`/`ln`/`zp`
  hashed, `fbp`/`fbc` RAW (already posted, `route.ts:610-617`; hashing
  them kills matching), `client_ip_address` and `client_user_agent`
  from request headers (the route currently discards both; read
  `x-forwarded-for` and `user-agent`), `external_id` = GHL contact id
  from the upsert response.
- When the `_fbc` cookie is absent but `fbclid` is present, construct
  `fbc` as `fb.1.<timestamp>.<fbclid>`. The vault calls this "one of
  the highest-leverage fixes on lead-gen sites."
- Use `test_event_code` during verification, remove before production.

Small optional fix while in there: the guide path fires custom
`PriceGuideLead` with a dedup slot that is never populated
(`ExitIntent.tsx:363-366` stores no eventId). Harmless today since no
server twin exists; populate it if the guide event ever gets one.

EMQ targets (vault): 6.0 or better on every event, 8.0 or better on
`Lead`. With em + ph + fbp + fbc + IP + UA + external_id, `Lead` should
clear 8 comfortably; em + fbc are the two highest-power keys.

## Verification

Order matters: dedup is checked before anything else.

1. **Phase 1 test:** GHL Test Workflow on each of 91/92/93, then Events
   Manager, Test Events tab. Known quirk per GHL's FAQ: test events can
   display as "Custom Event" instead of the chosen name; live events
   show correctly. If nothing arrives at all: Diagnostics tab, then the
   domain allow list. Workflow-sent events can take up to a day to
   appear in the main view.
2. **Live smoke:** move a test opportunity through Appointment Booked,
   Estimate Given, Won (then clean up per the t2s-13 routine). Confirm
   all three events with correct values.
3. **Dataset flips:** re-run the check that produced the baseline:
   `ads_get_dataset_details` on `1564050852174212`. Before:
   `server_last_fired_time` = epoch zero. After: a real timestamp.
   `ads_get_dataset_quality` grows a server/crm grouping next to `web`.
4. **action_source check:** GHL does not document what it sends. Open
   one received event's details in Events Manager and record the
   actual `action_source` in this doc.
5. **Phase 2 dedup:** submit a test estimator lead, then Events
   Manager, `Lead` event, confirm connection method shows Browser AND
   Server and the deduplicated count rises. Target 90%+ dedup rate on
   `Lead`; both sides must share the `event_id` within 48 hours. Below
   90% means reported results are inflated; fix before trusting any
   number.
6. **Weekly habit:** leads in GHL = Leads in Ads Manager. "A silently
   broken integration burns a full week of budget invisibly."

## Compliance notes

- Privacy policy must disclose transmission of lead data to Meta for
  advertising measurement. Check before Phase 2 ships; add a line if
  absent.
- All PII hashed SHA-256 before transmission (Phase 2 code does this
  explicitly; GHL's hashing is undocumented, so eyeball one Test Events
  payload to confirm em arrives hashed).
- Traffic is Florida-only, which lowers but does not remove consent
  concerns. No CMP exists on the site; if one is ever added, gate the
  server call on the same consent state as the pixel.

## What NOT to do

- No `Lead` event from GHL, ever. Double counting with no fix.
- No Conversion Leads performance goal. Volume gate is 10x away.
- No Lead Event type in the CAPI action for these workflows.
- No CLI-built CAPI steps until one exists in-account to clone.
- No inbound webhook on the landing page (standing rule, CLAUDE.md).
- Do not let the 91/92/93 workflows grow messaging steps. CAPI only.

## Known risks

- The GHL CAPI action is a black box we cannot patch. A late-2025
  Meta-side change broke attribution payloads agency-wide for days
  (community-reported). The browser pixel stays as redundant signal;
  check Events Manager Diagnostics after any GHL platform update.
- Meta may reclassify or reject events with an unexpected
  action_source; verification step 4 catches it early.

## Sources

- GHL help: articles 48001157632 (FB integration), 48001185099 (CAPI
  trigger + FAQ), 48001236281 (funnel event pixel), 155000003691 (Ad
  Manager CAPI), 48001233833 (conversion leads walkthrough). All
  re-verified live 2026-08-27.
- Meta developers: Conversions API for CRM (`action_source =
  system_generated`, event naming), Conversion Leads integration
  (volume gates, 3 to 4 week time-to-value).
- Meta Ads Mastery vault: Conversions API Complete Guide, EMQ, Tracking
  Stack pre-flight, Offline Conversions and CRM Feedback Loops for Home
  Services, Advantage+ Leads Playbook, Home Services Campaign Build,
  businesses/Broke and Fixed.md.
- This repo: `components/MetaPixel.tsx`, `QuoteForm.tsx`,
  `ThankYouContent.tsx`, `ExitIntent.tsx`, `FunnelTracking.tsx`,
  `app/api/lead/route.ts`, `docs/t2s-06`, `docs/t2s-12`.
