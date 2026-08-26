# T2S Workflow Audit - 2026-08-26

Full engineering audit of the 13 T2S draft workflows in the Broke and Fixed
sub-account, run with the workflow-architect QA checklist. Method: every step
graph read via internal API, every trigger config pulled
(`?includeTriggers=true`), settings verified, tag chains traced against the
site code (`app/api/lead/route.ts`), and collisions checked against all 22
pre-existing published workflows.

## Verdict

The build is structurally sound and safe as drafts. The tag architecture
(language-suffixed tags emitted by the site) is correct and clever.
**Update 2026-08-26: all four blocking items are resolved** (three fixed,
one confirmed harmless on deeper inspection). Remaining before launch: the
should-fix list (call tasks + escalation especially) and the launch gates.

## What was verified good

- **Tag chains intact end to end.** Site emits `estimate-request` +
  `estimate-request-en|es` + `lang-*` (route.ts:300-308) and
  `planning-guide-lead` + `planning-guide-lead-en|es` (route.ts:365-376).
  Triggers match exactly: 01 EN/ES ← `estimate-request-en|es`, 02+04 EN/ES ←
  `planning-guide-lead-en|es`, 03 EN/ES ← `t2s-no-contact-en|es` (written by
  01's last step). Router ← Main Pipeline stage "Showed - Got Estimate".
  05 EN/ES have no triggers by design - Router-fed via Add to Workflow.
- **EN/ES parity:** step-for-step identical structures, translated copy.
- **Settings correct:** stop-on-response ON for all 10 messaging flows, OFF
  for Router/98/99 (utility). Re-entry OFF everywhere. Matches spec.
- **Compliance basics:** first SMS carries "Reply STOP to opt out"; every
  send sits behind an 8:00-21:00 window gate, 7 days (TCPA-safe for FL).
- **Exit web:** 99 Reply Exit removes from all 10 nurture flows + alerts
  owner (all 10 workflow IDs verified correct). 98 removes guide flows when
  `estimate-request` is added. No infinite-loop risk anywhere: no workflow
  writes a tag another one triggers on except the intended 01→03 handoff.
- **No collision with old speed-to-lead:** published 1.1 triggers on a
  specific GHL survey, not on website leads. Website leads only enter T2S.
- **Opportunity creation:** correct pipeline (`o4y21VMkOnoU1iPoRRXZ`), stage
  New Lead, name/value/source per spec.

## Fix before publishing (blocking)

1. **Stage collision with published `1.8 Got Estimate`.**
   **RESOLVED 2026-08-26 - no action needed:** 1.8 turned out to be a
   harmless dispatcher (enrolls into 3.1 cleanup + inert tag, sends nothing).
   Sharing the stage with T2S 05 Router is safe. Left untouched.
2. **99 Reply Exit alert-spams the owner.**
   **FIXED 2026-08-26:** guard branch added as first step - contacts with
   `tub-to-shower-lead` continue to the removals + owner alert, everyone
   else ends. Verified by readback (draft, 14 steps, links clean).
3. **Old nurture 1.2 catches T2S leads on manual stage moves.**
   **FIXED 2026-08-26:** guard branch added as first step of the published
   workflow - `tub-to-shower-lead` contacts exit immediately, everyone else
   unchanged. Verified after edit: still published, stop-on-response ON,
   send window + re-entry intact, both stage triggers intact, links clean.
4. **03 dead-ends at `t2s-cold`.** ~~Nothing listens for that tag.~~
   **FIXED 2026-08-26:** 03 EN now ends Tag cold → Mark opportunity lost →
   Add to 1.3 Long Term Nurture. 03 ES ends Tag cold → Mark opportunity lost
   (no Spanish LTN exists yet - build one, then add the handoff). Verified by
   API readback; give the canvas a 10-second visual check in the builder.

## Should fix (not blocking)

5. **Spec deviations in 01: escalation ladder.**
   **FIXED 2026-08-26:** 01 EN/ES now send owner SMS on entry (lead info +
   CALL WITHIN 5 MINUTES), a 15-min "called them yet?" check, and a 30-min
   urgent alert; the old 45-min wait was trimmed to 30 so lead-facing timing
   is unchanged. Sent to {{custom_values.universal__client_cell_phone_notifications}}.
   Byron has no contact info in the account - add a custom value and point
   the 30-min alert at it. Implemented as internal notifications, NOT GHL
   Task steps: no task step exists in the account to copy and the API
   accepts unvalidated shapes for them (silent-failure risk). Recreate as
   real Tasks in the builder if a to-do list is also wanted.
6. **03 call-attempt prompts.**
   **FIXED 2026-08-26:** owner SMS "call attempt N of 6" on days 2/5/9/14/21
   in both 03 EN and ES, each placed immediately before that day's
   lead-facing message. Speed-to-lead is attempt 1; the 6-attempt SLA is now
   prompted end to end.
7. **04 lacks the "does not have `estimate-request`" guard.**
   **FIXED 2026-08-26:** 04 EN and ES now open with If/Else "Already
   estimator lead?" (has tag `estimate-request` → remove from this workflow;
   None → the existing day-6 sequence). Verified by API readback; visual
   check in the builder recommended.
8. **Enable SMS compliance auto-append** (Settings → Messaging Compliance)
   so opt-out language re-inserts periodically, not just in SMS 1.
9. **Delete stray draft** "New Workflow : 1786510524396" (empty
   form-submission shell).

## Fix session note (2026-08-26)

Fixes 4 and 7 were applied via the internal API. One incident, caught and
fully resolved: the workflow PUT replaces the whole record, so the first
update wiped `status` and `stopOnResponse` on 03/04 EN+ES. Both were restored
in the same session and verified: all four now read status=draft,
stopOnResponse=true, re-entry off, triggers intact, zero broken step links.
Lesson filed to the workflow-architect field notes; the ghl-cli
`update_workflow_steps` needs a preserve-settings patch before anyone else
uses it.

## Launch gates (from other sessions, unchanged)

Phone number + A2P 10DLC approved; email sending domain live
(quotes@brokeandfixed.com is the from-address on every email); then the spec's
test protocol: EN + ES test submissions, walk every branch, verify all 14
custom fields render, publish 99+98 first, then 01, watch first three real
leads by hand.

## Positive interplay (leave as is)

T2S has no appointment lifecycle of its own - published 1.4-1.7 (booked /
cancelled / no-show / rescheduled) will correctly handle T2S leads who book.
That interplay is desirable; do not exclude T2S leads there.
