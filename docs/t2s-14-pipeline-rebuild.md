# T2S 14 - Main Pipeline Rebuild Spec

Date: 2026-08-27. Grounded in a live API read of the account, not docs.
Every stage ID and workflow reference below was pulled today with
`scripts/ghl-stage-xref.py`. Run that script again before executing and
after finishing. If its output disagrees with this doc, the account
changed and this spec is stale.

**Execution is manual.** The API cannot edit pipelines. All changes happen
in the GHL UI: Settings, Pipelines, Main Pipeline. One person, one sitting.

## Why

The Main Pipeline stages are named after the follow-up calendar, not the
buying decision: `New Lead [Day 1]`, `Contact Attempted [Day 2-3]`,
`Short Term Nurture [Day 4-5]`. That shape came from the original agency
build (the 1.x speed-to-lead system). A pipeline stage should answer
"where is this lead in deciding," not "what day of the dial sequence is
it." Day counting is workflow work, and the workflows already do it with
waits. The cost of the current shape: the board cannot answer basic
questions like "how many people have an estimate and have not decided,"
and stage names lie once a lead responds on day 4.

This was flagged in `t2s-08` (open item 10) and never executed. The live
pipeline is richer than that item assumed, so this spec replaces it.

## Live state (read 2026-08-27)

Pipeline `Main Pipeline🚀` `o4y21VMkOnoU1iPoRRXZ`. A second pipeline,
`Marketing Pipeline` `awSq7c91QlWblsctlG8H`, exists, is empty of
automation references, and is not touched by this spec.

| Pos | Stage (live name) | Stage ID | Referenced by |
|---|---|---|---|
| 0 | New Lead [Day 1]📞 | `2aee1dde-71a8-4908-93af-b8e56cb1574d` | T2S 01 EN + ES (create_opportunity step, PUBLISHED), 1.1 (step) |
| 1 | Contact Attempted [Day 2-3]💬 | `44c66149-24c0-4195-85a9-59da7c06300f` | 1.1 (step, moves opp here), 1.2 (trigger) |
| 2 | Short Term Nurture [Day 4-5]💬 | `9f5892b7-7141-48f4-9d46-655fd97b9f6d` | 1.2 (trigger + step) |
| 3 | Lead Responded🔥 | `a53cde13-c982-4be0-8969-483671e2cf4b` | 2.2 SMS Response Alert (step) |
| 4 | Responded - Didnt Book FU💬 | `7275a69e-a8d1-4997-b8fa-d9f6d1cf9d6a` | 1.2 (trigger/record) |
| 5 | Booked📅 | `823cb17b-691e-47a5-9ddf-6fd78ab186e7` | 1.4, 1.7 (steps) |
| 6 | No Show❗️ | `57816f2c-eab6-4d41-aa8c-35daaf0283e2` | 1.4, 1.6, 1.7 (steps) |
| 7 | Cancelled❌ | `fb62f390-4b1b-4756-885c-d436249ecae9` | 1.5 (step) |
| 8 | Showed - Not Interested ☹️ | `4206d296-3ed3-41b1-9ef6-3a8f69ce299a` | 1.4, 1.7 (steps) |
| 9 | Showed - Got Estimate ✅ | `14f62266-e975-48b6-8e54-8d12c5015823` | **T2S 05 Router (TRIGGER, PUBLISHED)**, 1.8 (trigger), 1.4, 1.7 (steps) |
| 10 | Showed - Sold 🤑 | `b279032e-778e-4b10-a810-410a22433abf` | 1.4, 1.7, 1.9 (steps) |
| 11 | Long Term Nurture🕰 | `6f6b11ac-dfa6-4b59-b60d-eac049135382` | 1.2 (step, moves opp here), 1.3 (trigger) |
| 12 | Disqualified🚫 | `5dad50a3-5498-46c8-8e79-6400c08f2d58` | nothing |

Two notes against the older docs:

- `t2s-08` said `4.3 Lead Disqualified` moves pipeline stages. The live
  scan finds no stage reference in 4.3. Nothing in automation touches
  `Disqualified` today.
- T2S 01 EN/ES and 05 Router are now **published and live**. This is a
  running campaign. That is why Phase 1 is renames only.

## Constraints

1. **Every workflow reference is by stage ID, not name.** Renaming a
   stage in the UI keeps its ID. Renames are safe for all triggers and
   steps in the table above.
2. **Deleting a stage is the dangerous act.** GHL will ask where to move
   its opportunities, but the workflows pointing at the dead ID fail
   silently. Phase 1 deletes nothing.
3. Anything matching by stage NAME breaks on rename: saved smart-list
   filters, dashboards pinned to a stage, and the old `2.1 New Lead
   Alert` webhooks if they pass the stage label. 2.1 is already flagged
   for removal in `t2s-08` (it posts to a stranger's Google Sheet).
   Check saved filters once, after renaming.
4. The two stage IDs the T2S campaign cannot live without:
   `2aee1dde-...` (opportunity creation target) and `14f62266-...`
   (Router trigger, the proposal follow-up sequence). They survive both
   phases untouched.

## Phase 1 - Renames (do now, ~10 minutes, zero risk to automation)

In Settings, Pipelines, Main Pipeline, rename each stage in place.
Do not reorder, add, or delete anything in this phase.

| Pos | Old name | New name |
|---|---|---|
| 0 | New Lead [Day 1]📞 | New Lead |
| 1 | Contact Attempted [Day 2-3]💬 | Attempting Contact |
| 2 | Short Term Nurture [Day 4-5]💬 | Still No Answer |
| 3 | Lead Responded🔥 | Responded |
| 4 | Responded - Didnt Book FU💬 | Responded, Not Booked |
| 5 | Booked📅 | Appointment Booked |
| 6 | No Show❗️ | No Show |
| 7 | Cancelled❌ | Cancelled |
| 8 | Showed - Not Interested ☹️ | Not Interested |
| 9 | Showed - Got Estimate ✅ | Estimate Given |
| 10 | Showed - Sold 🤑 | Won |
| 11 | Long Term Nurture🕰 | Long Term Nurture |
| 12 | Disqualified🚫 | Disqualified |

Emojis are cosmetic. Keep them if Omar likes them; the names above are
the required part. The `[Day N]` suffixes must go: they are the lie.

Also rename the pipeline itself if desired (`Main Pipeline🚀` to
`Main Pipeline`); the ID is what everything references.

### What each stage means (the rule for moving a card)

Automation moves most cards. Manual moves are only the ones marked.

| Stage | Means | Who moves the card here |
|---|---|---|
| New Lead | Came in, nobody has reached them yet | T2S 01 / 1.1 create it here |
| Attempting Contact | We are calling and texting, no reply yet | 1.1 |
| Still No Answer | Late in the chase, days 4 to 5 | 1.2 |
| Responded | They replied, conversation open | 2.2 on SMS reply |
| Responded, Not Booked | Talked, would not commit to a time | manual |
| Appointment Booked | Estimate visit on the calendar | 1.4 / 1.7 |
| No Show | Missed the appointment | 1.6 / appointment status |
| Cancelled | Cancelled the appointment | 1.5 |
| Not Interested | Showed, said no | appointment survey / manual |
| Estimate Given | **Omar moves the card here after giving the number. This move fires T2S 05 Router and the whole proposal follow-up.** | manual |
| Won | Signed, deposit taken | manual / 1.9 |
| Long Term Nurture | Cold, on the 100-day drip | 1.2 hands off, 1.3 runs it |
| Disqualified | Wrong fit, renter, out of area | manual |

The one habit that matters: **Estimate Given is the trigger stage.**
Moving a card there is not bookkeeping, it launches the follow-up
sequence. Move it the same day the estimate is given, every time.

## Phase 2 - Optional merge (only after the campaign has run clean for a while)

`Attempting Contact` and `Still No Answer` are the same decision state
split by calendar. Merging them makes the board honest but requires
editing the published `1.2 Short Term Nurture`:

1. In 1.2, remove the trigger on stage `9f5892b7-...` (Still No Answer),
   keeping the trigger on `44c66149-...` (Attempting Contact).
2. In 1.2's step graph, re-point the move-to-`9f5892b7` step at
   `44c66149` or delete that step.
3. Only then delete the `Still No Answer` stage in the UI, moving any
   remaining opportunities to `Attempting Contact`.

Warnings, from the 2026-08-26 fix session: the internal workflow PUT
replaces the whole record and once wiped `status` and `stopOnResponse`.
Make these two edits **in the GHL builder by hand**, not via the CLI,
and verify after: 1.2 still published, stop on response ON, send window
intact, remaining trigger intact. If any of that feels like too much
while ads are spending, skip Phase 2. Two chase stages is a cosmetic
flaw; a broken published nurture is not.

Do not merge or delete anything else. Every other stage either has
automation pointed at it or costs nothing.

## Verification (after Phase 1, and again after Phase 2)

1. Re-run the scan:

```bash
cd "/Users/othmarcasilla/GHL CLI BUILD" && .venv/bin/python /Users/othmarcasilla/broke-and-fixed-305/scripts/ghl-stage-xref.py
```

   Expect: same stage IDs at the same positions, new names, the same
   workflow reference list as the table above (minus 1.2's second
   trigger if Phase 2 ran).
2. Open T2S 05 Router in the builder, confirm the trigger still shows
   the renamed `Estimate Given` stage.
3. Move a test opportunity into `Estimate Given` and confirm the Router
   fires (then pull the test contact back out per the E2E cleanup
   routine in `t2s-13`).
4. Check saved smart lists and any dashboard widgets filtered by stage
   name; re-select the renamed stages where needed.

## Housekeeping while in there

- The two OPEN test opportunities from the `t2s-13` live E2E are still
  sitting in New Lead unless already cleared. Delete or mark lost so the
  board starts honest.
- `Marketing Pipeline` is unused by everything. Leave it, or delete it
  in a separate sitting; it is not part of this spec.
