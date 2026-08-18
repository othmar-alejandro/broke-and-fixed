# T2S Bilingual GoHighLevel Architecture

> **Plan-mode note.** The requested destination was
> `/Users/othmarcasilla/broke-and-fixed-305/docs/t2s-08-ghl-bilingual-architecture.md`.
> Plan mode restricts writes to this plan file, so the complete spec is staged here.
> Move it verbatim to that path on approval. Nothing in GoHighLevel was created,
> modified, or deleted. Every CLI call made was read-only (`workflows list`,
> `workflow show`, `list custom-values`, `list custom-fields`).

Sub-account `Broke and Fixed Home Solutions` | location `BubbBDEstaWhTJReHDcG`
Supersedes `docs/t2s-03-ghl-workflows.md`. Read the correction in §0 before reusing any copy from it.

---

## 0. Corrections to the t2s-03 draft (verified in code today)

Three things in the earlier draft are now wrong. They are wrong in the copy, not just the notes.

**1. There is no price range any more. There is one starting price.**
`app/api/lead/route.ts:198` sends `planning_range_high` as the empty string, deliberately:

```ts
{ id: GHL_FIELD_IDS.rangeHigh, field_value: "" },
```

Every sentence in t2s-03 of the form "between ${{contact.planning_range_low}} and ${{contact.planning_range_high}}" renders as **"between $6500 and "**. That is a broken message going to a homeowner. All copy in this spec uses a single starting price.

**2. Some leads have no price at all.** `startingPrice()` in `lib/landing/quote-pricing.ts:114` returns `null` for the `master` layout, because a larger master bathroom has to be measured. `planning_range_low` is then written as `""`. So roughly one lead in three arrives with a blank price field, and any copy that hard-codes a dollar sign in front of it renders **"$"**.

**3. The estimator sends slugs; the Web3Forms fallback sends labels.** `buildCustomFields` (line 192) sends `lead.layout` raw. The Web3Forms path at line 417 sends `` `${lead.layout} (${LAYOUT_LABEL[lead.layout]})` ``. Two paths, two formats, from the same submission. Fixed in §8.

The fix for all three is one new TEXT custom field written by the route in the visitor's own language. §8 has it.

---

## 1. The bilingual routing decision

### The two designs

**(a) One workflow per job, `if_else` on the `lang-es` tag.** Nine workflows total. Each has a language fork near the top and every downstream step exists twice inside collapsed branches.

**(b) Two parallel sets, EN and ES, each triggered by its own language tag.** Eighteen workflows. Every workflow is a straight line. No branches for language anywhere.

### Compared

| | (a) branched | (b) parallel sets |
|---|---|---|
| Workflow count | 9 | 18 |
| **Can the CLI create it?** | **No.** | **Yes.** |
| Editing one Spanish email | Expand the workflow, find the right branch leg, edit in place | Open the ES workflow, edit |
| Proving the two languages are in sync | Read both legs of every fork by eye in the UI | `diff` the two spec JSON files |
| Sending domain / from-name per language | One shared value, or another fork | Set per workflow, no fork |
| Blast radius of a mistake | Both languages | One language |
| Adding a third language later | Another leg on every fork | Copy a set, translate |

### The decision: **(b), two parallel sets.**

**The CLI settles it.** `/Users/othmarcasilla/GHL CLI BUILD/docs/WORKFLOW-SCHEMA.md` is explicit: the create spec is a flat `steps` array and "steps are linked into a linear chain automatically." On `if_else` it says the branch-linking shape "must be modelled precisely before generating any branched workflow" and "for a first creation, avoid branches." Under design (a) the CLI can produce nothing but a stub, and all eighteen sequences get clicked in by hand, twice, in a UI where a mis-dropped step inside a collapsed branch is invisible. Under design (b) every one of the eighteen is a linear chain the CLI drafts today, from a file that lives in git next to the site code.

**Sync is the second reason, and it is the one the client actually asked about.** The client's worry is "duplicate the workflows we are going to use and put them in Spanish." Under (a), asking "does the Spanish side still match the English side?" means expanding forks in a browser. Under (b) it is `diff t2s-01-en.json t2s-01-es.json` — the step types and timings should be byte-identical and only the copy attributes should differ. That check is mechanical, so it can be run before every publish, and it will catch the failure that actually happens in production: someone adds a step to English in October and forgets Spanish.

**The third reason is the one that pays off in the copy.** With separate workflows, the *contact record itself* can carry pre-localized text. §8 adds `contact.starting_price_display`, which the API route fills with `starts at $6,500` for an English lead and `empieza en $6,500` for a Spanish one. Both workflows reference the same merge tag and each renders correctly. Under design (a) that field would render Spanish text inside an English branch whenever the tag check and the field disagreed. Separate sets make the whole class of bug impossible.

**Cost, stated honestly:** eighteen workflows instead of nine, and a discipline rule to keep them from drifting. That rule is in §11.

### Naming convention (enforced, no exceptions)

```
T2S | <NN> <LANG> | <Job>
```

`NN` is a two-digit number shared by the pair. `LANG` is `EN` or `ES`, or `XX` for the one language-neutral workflow. Sorting the workflow list alphabetically therefore puts each pair adjacent, and a missing partner is visible at a glance.

### Trigger discipline

The site writes all tags in a single upsert call (`app/api/lead/route.ts:254`), so every tag lands atomically and both the intent tag and the language tag are present when the trigger evaluates.

- **EN workflows:** Trigger `Contact Tag` = `estimate-request`. Filter: `Contact Tag` **has** `lang-en`.
- **ES workflows:** Trigger `Contact Tag` = `estimate-request`. Filter: `Contact Tag` **has** `lang-es`.

Never trigger on `tub-to-shower-lead`. It is applied to guide opt-ins too (line 309), which is the known tag-collision bug. Until §8 ships, that tag is unusable as a trigger.

Every workflow: **Allow re-entry OFF. Stop on response ON.**

---

## 2. Custom values

### The 17 that exist, and exactly what to set

All 17 are currently `None`. That is not a cosmetic problem. It means **every one of the 20 published inherited workflows is right now capable of sending a homeowner an email that says "this is from  at "**. Unpublishing them (§7) is urgent partly for this reason.

| Key | Value to set |
|---|---|
| `company_name` | `Broke & Fixed Home Solutions` |
| `company_owner` | `Omar` |
| `company_phone` | *the new local tracking number from §5, in `(786) XXX-XXXX` format*. Not the cell. This is the number printed in customer-facing copy. |
| `company_email` | `brokeandfixed305@gmail.com` |
| `company_website` | `https://brokeandfixed.com` |
| `company_calendar` | `https://api.leadconnectorhq.com/widget/booking/DuVLTGAO5jA40cpUMzzD` |
| `c__reschedule_calendar` | same as `company_calendar` |
| `confirmation_url` | `https://brokeandfixed.com/en/landing/tub-to-shower/thank-you` |
| `notifications_email_for_client` | `brokeandfixed305@gmail.com` |
| `universal__client_cell_phone_notifications` | `+17863637039` |
| `color1` | `#F07A1A` |
| `facebook_pixel` | `1564050852174212` |
| `facebook_token` | the CAPI system-user access token. **Type it into the GHL UI by hand. Never put it in a spec file, a git-tracked JSON, or a CLI argument.** |
| `c__google_review_link` | `https://search.google.com/local/writereview?placeid=ChIJ7VSW8vHbAgMRvNWjsiV5kII` |
| `instagram_page_url` | `https://www.instagram.com/brokeandfixed/` |
| `your_agency_name` | `OAC Digital Innovations` |
| `your_agency_email_for_notifications_to_you` | `oacdigitalinnovations@gmail.com` |

### New custom values to create (Settings → Custom Values → Add)

The Spanish side needs its own. Ten new values.

| Key | Value |
|---|---|
| `company_calendar_es` | booking URL of the duplicated Spanish calendar (see §2.1) |
| `landing_page_en` | `https://brokeandfixed.com/en/landing/tub-to-shower` |
| `landing_page_es` | `https://brokeandfixed.com/es/landing/tub-to-shower` |
| `guide_pdf_en` | `https://brokeandfixed.com/guides/tub-to-shower-planning-guide-en.pdf` |
| `guide_pdf_es` | `https://brokeandfixed.com/guides/tub-to-shower-planning-guide-es.pdf` |
| `company_blurb_en` | `Broke & Fixed Home Solutions. Family owned, fully insured, Miami-Dade.` |
| `company_blurb_es` | `Broke & Fixed Home Solutions. Empresa familiar y totalmente asegurada en Miami-Dade.` |
| `signoff_en` | `Omar` |
| `signoff_es` | `Omar` |
| `t2s_price_floor_en` | `$4,500` |
| `t2s_price_floor_es` | `$4,500` |

The two `signoff` values look redundant today. Define them anyway. The moment Byron takes the Spanish leads and Omar takes the English ones, this is a one-field change instead of an edit to nine workflows.

### 2.1 The Spanish calendar

`Free On-Site Estimate` (`DuVLTGAO5jA40cpUMzzD`) has an English widget and an English event title. GHL sets booking-widget language **per calendar**, not per link, so a Spanish-speaking homeowner clicking `company_calendar` gets an English form.

Duplicate it:

- **Name:** `Estimado Gratis en Casa`
- Round robin, same team members, 60-minute slots, 15-minute interval — identical to the English one, so the two calendars share one availability pool and cannot double-book.
- **Widget language:** Spanish
- **Event title:** `Estimado en Casa: {{contact.name}} - {{custom_values.company_name}}`
- Store its booking URL in `company_calendar_es`.

Verify after creating that both calendars point at the same team members. If they do not, the two languages will offer the same slot to two different homeowners.

---

## 3. Workflow specs

Eighteen workflows: eight EN/ES pairs plus one language-neutral. Copy below is final; it is what gets pasted.

Shared merge tags used throughout:

| Tag | Renders |
|---|---|
| `{{contact.first_name}}` | first name |
| `{{contact.starting_price_display}}` | `starts at $6,500` / `empieza en $6,500` / `gets its number once we measure` / `lleva medición antes de darle el número` — **new field, §8** |
| `{{contact.bathroom_layout}}` | human label after §8 (`Tub sits wall to wall`) |
| `{{contact.project_scope}}` | human label after §8 (`Shower and floor`) |
| `{{custom_values.company_phone}}` | the tracking number |
| `{{custom_values.company_calendar}}` / `_es` | booking link |

---

### `T2S | 00 XX | Server-Side Lead CAPI`

Language-neutral. One workflow, both languages, because a conversion event has no copy in it.

**Trigger:** Contact Tag = `estimate-request`. No language filter.
**Re-entry:** OFF.

| # | Step | Attributes |
|---|---|---|
| 1 | `facebook_conversion_api` | `event_type: standard`, `event_name: Lead`, `pixel_id: 1564050852174212`, `access_token: {{custom_values.facebook_token}}` |

```json
{
  "type": "facebook_conversion_api",
  "name": "CAPI Lead",
  "attributes": {
    "type": "facebook_conversion_api",
    "event_type": "standard",
    "event_name": "Lead",
    "pixel_id": "1564050852174212",
    "access_token": "{{custom_values.facebook_token}}"
  }
}
```

**Deduplication — read this, it is the part that goes wrong.**

The browser pixel already fires `Lead` on the thank-you page. Without a shared `event_id`, Meta counts every estimate lead twice and the reported CPL is halved, which then corrupts every optimisation decision the ad account makes.

The mechanism: the site mints a UUID at submit time, sends it to the browser pixel as `eventID`, and stores it on the contact. The workflow sends the same string as the CAPI `event_id`. Meta collapses the pair.

The problem: the schema survey of all 23 workflows recorded exactly **five** attributes on `facebook_conversion_api` — `type`, `event_type`, `access_token`, `event_name`, `pixel_id`. There is no observed `event_id` attribute, and the sample size is one occurrence. So there are two paths and you pick after looking:

**Path A (preferred, check first).** Open the CAPI action in the GHL UI. If it exposes an Event ID input, put `{{contact.event_id}}` in it and use the step above with that attribute added. Confirm by reading the step back with `workflow show` and checking the attribute appears.

**Path B (fallback, always works).** Replace the CAPI step with a `webhook` step, which does carry arbitrary `customData`:

```json
{
  "type": "webhook",
  "name": "CAPI Lead (deduped)",
  "attributes": {
    "method": "POST",
    "url": "https://graph.facebook.com/v21.0/1564050852174212/events?access_token={{custom_values.facebook_token}}",
    "headers": { "Content-Type": "application/json" },
    "customData": {
      "data": [{
        "event_name": "Lead",
        "event_id": "{{contact.event_id}}",
        "action_source": "website",
        "event_source_url": "{{contact.landing_page}}",
        "user_data": {
          "em": "{{contact.email}}",
          "ph": "{{contact.phone}}",
          "fbc": "{{contact.facebook_click_id}}",
          "client_user_agent": ""
        }
      }]
    }
  }
}
```

Meta hashes `em` and `ph` server-side when they arrive in the clear over TLS to this endpoint, but confirm in Events Manager that Event Match Quality does not drop; if it does, hash to SHA-256 in the route instead and store the hashed values.

Either path needs the new `contact.event_id` field from §8. Verify in Events Manager → Lead → **Deduplication**: it should show browser and server events pairing. If it shows two separate counts, the IDs are not matching and every CPL number is wrong.

---

### `T2S | 01 EN | Estimate Lead Speed to Lead`

This is the one that makes the money. The vault arithmetic on a comparable trade: same ads, same spend, moving first contact from 14 hours to under 5 minutes took cost per sold job from $2,247 to $899. MIT/InsideSales 2007: calling at 5 minutes versus 30 is about 21x more likely to qualify and about 100x more likely to make contact. HBR 2011: firms contacting within an hour are about 7x more likely to qualify than those waiting one hour longer, against an industry average first response of 42 hours.

**Trigger:** Contact Tag = `estimate-request`
**Filter:** Contact Tag has `lang-en`
**Re-entry OFF. Stop on response ON.**

**Exit conditions (set on the workflow, not as steps):** appointment booked on either calendar; contact replies by SMS or email; opportunity moves past `New Lead`; tag `t2s-stop` added; unsubscribed.

| # | T+ | Type | Detail |
|---|---|---|---|
| 1 | 0s | `create_opportunity` | pipeline `o4y21VMkOnoU1iPoRRXZ`, stage `2aee1dde-71a8-4908-93af-b8e56cb1574d`, name `T2S {{contact.first_name}} {{contact.last_name}} - {{contact.project_scope}}`, value `{{contact.planning_range_low}}`, source `Meta tub to shower EN` |
| 2 | 0s | `remove_from_workflow` | targets `4c2cfd89` (1.1), `1e48eede` (2.1), `a4a13aa5` (1.2), `2dfe6b67` (1.3). Belt and braces even after §7 unpublishes them. |
| 3 | 0s | `internal_notification` | **Email + in-app push. Not SMS.** Body = ALERT block below. Works today, pre-A2P. |
| 4 | 45s | `wait` | so the SMS lands inside 60 seconds and never before the owner alert |
| 5 | 45s | `sms` | SMS 1 |
| 6 | 45s | Create Task | `CALL {{contact.first_name}} {{contact.last_name}} — 5 min SLA`, assigned round robin, due immediately, description = ALERT block |
| 7 | 15m | `internal_notification` | escalation 1 (email) if no outbound call logged |
| 8 | 30m | `internal_notification` | escalation 2, marked urgent, to both owners |
| 9 | 1h | `sms` | SMS 2 + call task 2 |
| 10 | 4h | `email` | Email 1 |
| 11 | Day 2, 9am | Task + `sms` | call task 3 + SMS 3 |
| 12 | Day 3, 9am | `email` | Email 2 |
| 13 | Day 5, 9am | Task | call task 4 |
| 14 | Day 7, 9am | `email` | Email 3 |
| 15 | Day 9, 9am | Task + `sms` | call task 5 + SMS 4 |
| 16 | Day 11, 9am | `email` | Email 4 |
| 17 | Day 14, 9am | Task + `email` | call task 6 (final) + Email 5 |
| 18 | Day 14 | `add_contact_tag` | `t2s-cold-en` |
| 19 | Day 14 | `add_to_workflow` | `T2S | 05 EN | Long Cycle Nurture` |

Six calls, five emails, four SMS over 14 days. That is the SLA from the playbook, and Velocify's number is that 93% of converted leads are reached by the sixth call. Every `wait` on days 2 through 14 uses a **window of 9am to 7pm America/New_York**, so nothing fires at 3am.

**ALERT block** (internal only, never sent to a customer, so English for both language sets):

```
NEW TUB TO SHOWER LEAD — ENGLISH

{{contact.first_name}} {{contact.last_name}}
{{contact.phone}}
{{contact.email}}
ZIP {{contact.postal_code}}

Layout: {{contact.bathroom_layout}}
Scope:  {{contact.project_scope}}
Quoted: {{contact.starting_price_display}}

Ad:     {{contact.utm_content}}
Source: {{contact.lead_source_detail}}

CALL WITHIN 5 MINUTES.
```

**Escalation 1 (15 min):**
```
15 minutes, no call logged on {{contact.first_name}} {{contact.last_name}} {{contact.phone}}. Whoever picks it up, log the call.
```

**Escalation 2 (30 min):**
```
30 MINUTES, STILL NO CALL. {{contact.first_name}} {{contact.last_name}} {{contact.phone}}. This lead is now worth a fraction of what it cost. Call now.
```

#### SMS 1 (T+60s)
```
Hi {{contact.first_name}}, this is Omar with Broke & Fixed. Just got your tub to shower request. For a bathroom like yours the job {{contact.starting_price_display}}. I'll call you in a couple of minutes from this number. If now is bad, text me a better time and I'll work around it.
```

#### SMS 2 (T+1h)
```
{{contact.first_name}}, tried you a few minutes ago. Still want someone to look at the bathroom? Text me a time and I'll call then. If you changed your mind, say so and I'll stop.
```

#### SMS 3 (Day 2)
```
{{contact.first_name}}, Omar again. Want me to just book the free walk-through and you pick the time? Takes fifteen minutes and nobody tries to sell you anything: {{custom_values.company_calendar}}
```

#### SMS 4 (Day 9)
```
{{contact.first_name}}, last couple of tries on my end. If the bathroom is still on the list, here's the calendar: {{custom_values.company_calendar}}. If it's off the list, reply STOP and I'll leave you alone.
```

#### Email 1 (T+4h) — subject: `Your starting price, {{contact.first_name}}`
```
{{contact.first_name}},

Based on the two things you told us, a {{contact.project_scope}} in a bathroom like yours {{contact.starting_price_display}}.

That is a starting price, not a quote. The only way to get a firm number is for one of us to stand in the bathroom for fifteen minutes. That visit is free, and there is no salesman. It is me or my brother.

Three things move the number in either direction:

1. Whether the drain and the valve stay where they are. If they do, the job is simpler and usually needs no permit.
2. What is behind the wall. Nobody knows until it comes off.
3. Tile. The gap between builder grade and something you actually like is smaller than most people expect.

Reply to this, or call {{custom_values.company_phone}}, or pick a time yourself:
{{custom_values.company_calendar}}

Omar
{{custom_values.company_blurb_en}}
```

#### Email 2 (Day 3) — subject: `The three questions to ask anyone who quotes your bathroom`
```
{{contact.first_name}},

If you get a few quotes on this, ask everyone the same three questions. The answers tell you more than the price does.

1. Are you taking the old wall out, or covering it?
Covering it is faster and cheaper. It also means whatever is behind that wall is still behind that wall.

2. What is the waterproofing?
You want a real membrane, not thinset and hope. Ask them to name the product. If they cannot, that is your answer.

3. Who is actually going to be in my house?
Some outfits sell the job and hand it to whoever is free that week. On ours, one of the owners is on site.

We are a family owned remodeling company, fully insured, and we work Miami-Dade only. That is why you can get one of the owners on the phone.

{{custom_values.company_calendar}}

Omar
```

#### Email 3 (Day 7) — subject: `Do you need a permit for this? Straight answer`
```
{{contact.first_name}},

This is the question people are quietly worried about, so here is the plain version.

If the drain, the valve and the fixture locations do not move, and there is no electrical work, most tub to shower conversions in Miami-Dade are cosmetic. If any of those move, it needs a permit, and we handle that side of it.

Which one you are depends on what your bathroom actually looks like behind the tub, and that is not something anybody can tell you from a photo or a phone call. We decide it at the walk-through, and we tell you which one it is before you have signed anything.

What we will not do is promise you "no permit needed" in an email to win the job and then find out on demo day. That is how people end up with a stalled bathroom.

Fifteen minutes, free, no obligation:
{{custom_values.company_calendar}}

Omar
{{custom_values.company_phone}}
```

#### Email 4 (Day 11) — subject: `What the week actually looks like`
```
{{contact.first_name}},

Most people are more worried about the disruption than the price. Here is the real schedule for a standard conversion.

Monday: demo. The tub comes out. This is the loud day.
Tuesday: backer board and waterproofing. Quiet.
Wednesday and Thursday: tile.
Friday: grout, and the glass gets measured.
The following week: glass goes in, fixtures, done.

So it is one loud day, and one bathroom out of service for about a week and a half. If it is the only bathroom in the house, tell us at the walk-through and we sequence it differently.

If you want your week on the calendar:
{{custom_values.company_calendar}}

Omar
```

#### Email 5 (Day 14) — subject: `Should I close this out?`
```
{{contact.first_name}},

I have tried you a handful of times and I do not want to be the guy who keeps calling.

So, one question, and either answer is fine:

Is the bathroom still on the list, or should I close this out?

If it is still on, here is the calendar and you pick the time:
{{custom_values.company_calendar}}

If it is off, reply with anything at all and I will stop. No hard feelings, and if it comes back around in six months you know where we are.

Omar
{{custom_values.company_phone}}
{{custom_values.company_blurb_en}}
```

---

### `T2S | 01 ES | Speed to Lead, Solicitud de Estimado`

Structurally identical to `01 EN`. Same 19 steps, same timings, same window. Only the copy differs, plus:

- Trigger filter: Contact Tag has `lang-es`
- `create_opportunity` source: `Meta tub to shower ES`
- Every calendar link: `{{custom_values.company_calendar_es}}`
- Sign-off block: `{{custom_values.company_blurb_es}}`
- ALERT block header: `NEW TUB TO SHOWER LEAD — SPANISH · THIS ONE NEEDS A SPANISH SPEAKER`

That header matters more than it looks. An owner glancing at a phone notification needs to know which language to open the call in before they dial.

#### SMS 1 (T+60s)
```
Hola {{contact.first_name}}, le habla Omar de Broke & Fixed. Acabo de recibir su solicitud para cambiar la bañera por ducha. Para un baño como el suyo, el trabajo {{contact.starting_price_display}}. Lo llamo en unos minutos de este mismo número. Si ahorita no le queda bien, mándeme un texto con una mejor hora y me acomodo.
```

#### SMS 2 (T+1h)
```
{{contact.first_name}}, lo llamé hace un rato. ¿Todavía quiere que alguien vea el baño? Mándeme la hora que le sirva y lo llamo. Si cambió de idea, dígamelo y no lo molesto más.
```

#### SMS 3 (Día 2)
```
{{contact.first_name}}, Omar otra vez. ¿Quiere que le agende la visita gratis y usted escoge la hora? Son quince minutos y nadie le va a vender nada: {{custom_values.company_calendar_es}}
```

#### SMS 4 (Día 9)
```
{{contact.first_name}}, estos son mis últimos intentos. Si el baño sigue en la lista, aquí está el calendario: {{custom_values.company_calendar_es}}. Si ya no, conteste STOP y lo dejo tranquilo.
```

#### Email 1 (T+4h) — asunto: `Su precio inicial, {{contact.first_name}}`
```
{{contact.first_name}},

Por las dos cosas que nos contó, un trabajo de {{contact.project_scope}} en un baño como el suyo {{contact.starting_price_display}}.

Eso es un precio inicial, no una cotización. La única manera de darle un número firme es que uno de nosotros esté quince minutos parado en su baño. Esa visita es gratis y no le mandamos ningún vendedor. Voy yo o va mi hermano.

Tres cosas mueven el número para arriba o para abajo:

1. Si el desagüe y la válvula se quedan donde están. Si se quedan, el trabajo es más sencillo y por lo general no necesita permiso.
2. Lo que hay detrás de la pared. Eso nadie lo sabe hasta que se abre.
3. El porcelanato. La diferencia entre lo más básico y algo que de verdad le guste es menor de lo que la gente cree.

Conteste este correo, llame al {{custom_values.company_phone}}, o escoja la hora usted mismo:
{{custom_values.company_calendar_es}}

Omar
{{custom_values.company_blurb_es}}
```

#### Email 2 (Día 3) — asunto: `Las tres preguntas para quien le cotice el baño`
```
{{contact.first_name}},

Si va a pedir varias cotizaciones, hágales las mismas tres preguntas a todos. Las respuestas le dicen más que el precio.

1. ¿Van a quitar la pared vieja o la van a tapar?
Taparla sale más rápido y más barato. También quiere decir que lo que está detrás de esa pared se queda ahí.

2. ¿Cómo impermeabilizan?
Usted quiere una membrana de verdad, no pega y suerte. Pídales el nombre del producto. Si no se lo saben, ahí tiene la respuesta.

3. ¿Quién va a estar en mi casa?
Hay empresas que venden el trabajo y se lo pasan a quien esté libre esa semana. En los nuestros está uno de los dueños.

Somos una empresa familiar de remodelación, totalmente asegurada, y trabajamos solo en Miami-Dade. Por eso usted puede hablar con un dueño por teléfono.

{{custom_values.company_calendar_es}}

Omar
```

#### Email 3 (Día 7) — asunto: `¿Hace falta permiso? Respuesta directa`
```
{{contact.first_name}},

Esta es la pregunta que la gente tiene guardada, así que se la contesto sin vueltas.

Si el desagüe, la válvula y las salidas se quedan donde están, y no hay trabajo eléctrico, la mayoría de estos cambios de bañera a ducha en Miami-Dade son cosméticos. Si algo de eso se mueve, sí hace falta permiso, y de eso nos encargamos nosotros.

Cuál de los dos casos es el suyo depende de cómo esté su baño por detrás de la bañera, y eso no se puede saber por una foto ni por teléfono. Lo decidimos en la visita y se lo decimos antes de que usted firme nada.

Lo que no vamos a hacer es prometerle por correo que "no hace falta permiso" para ganarnos el trabajo y darnos cuenta el día de la demolición. Así es como la gente termina con el baño parado.

Quince minutos, gratis, sin compromiso:
{{custom_values.company_calendar_es}}

Omar
{{custom_values.company_phone}}
```

#### Email 4 (Día 11) — asunto: `Cómo es la semana de verdad`
```
{{contact.first_name}},

A la mayoría le preocupa más el desorden que el precio. Aquí está el itinerario real de un cambio estándar.

Lunes: demolición. Sale la bañera. Este es el día ruidoso.
Martes: tabla de respaldo e impermeabilización. Tranquilo.
Miércoles y jueves: porcelanato.
Viernes: sellado de juntas y medición del vidrio.
La semana siguiente: entra el vidrio, las llaves, y listo.

O sea, un día ruidoso, y un baño fuera de servicio como semana y media. Si es el único baño de la casa, dígalo en la visita y lo organizamos distinto.

Si quiere poner su semana en el calendario:
{{custom_values.company_calendar_es}}

Omar
```

#### Email 5 (Día 14) — asunto: `¿Lo cierro?`
```
{{contact.first_name}},

Lo he llamado varias veces y no quiero ser el que sigue insistiendo.

Así que una sola pregunta, y cualquiera de las dos respuestas está bien:

¿El baño sigue en la lista, o lo cierro?

Si sigue, aquí está el calendario y usted escoge la hora:
{{custom_values.company_calendar_es}}

Si ya no, contésteme cualquier cosa y paro. Sin resentimientos, y si en seis meses vuelve el tema, ya sabe dónde estamos.

Omar
{{custom_values.company_phone}}
{{custom_values.company_blurb_es}}
```

---

### `T2S | 02 EN | Planning Guide Delivery` / `T2S | 02 ES | Entrega de la Guía`

**Trigger:** Contact Tag = `planning-guide-lead`
**Filter:** Contact Tag has `lang-en` (or `lang-es`)
**Re-entry OFF.**

Email only. The guide form takes an email address and nothing else, so there is no phone number to text.

| # | T+ | Type | Detail |
|---|---|---|---|
| 1 | 0s | `email` | Guide delivery |
| 2 | 2d | `email` | Guide follow-up |
| 3 | 4d | `add_to_workflow` | `T2S | 04 <LANG> | Guide to Estimate` |

**Exit:** contact gets `estimate-request`, replies, books, or unsubscribes.

#### EN, email 1 — subject: `Your tub to shower planning guide`
```
Here it is, no runaround:
{{custom_values.guide_pdf_en}}

Inside is the stuff nobody tells you before you start. When a permit is actually required and when it is not. The real difference between a one day liner and a shower that is built. And where the money actually goes.

When you want your own number, it is two questions and about thirty seconds:
{{custom_values.landing_page_en}}

Omar
{{custom_values.company_blurb_en}}
{{custom_values.company_phone}}
```

#### EN, email 2 (Day 2) — subject: `Where the money goes in a tub to shower job`
```
Most people looking at this see one number and no idea what is inside it. So here is a {{custom_values.t2s_price_floor_en}} job, opened up.

Demo and haul-off: the tub, the old tile, the debris.
Rough plumbing: only if the drain or valve moves. Often it does not.
Backer and waterproofing: this is the part you never see and the part that decides whether the job lasts.
Tile and labor: the biggest single line, and the one where the days go.
Glass: measured after the tile is in, because it has to fit what is actually there.

You will notice there is no line for a commission, an office, or a sales rep. That is the whole reason our number looks the way it does.

Two questions, get your own number:
{{custom_values.landing_page_en}}

Omar
```

#### ES, correo 1 — asunto: `Su guía para cambiar la bañera por ducha`
```
Aquí la tiene, sin vueltas:
{{custom_values.guide_pdf_es}}

Adentro está lo que casi nadie le dice antes de empezar. Cuándo hace falta permiso de verdad y cuándo no. La diferencia real entre un forro de un día y una ducha construida. Y en qué se le va el dinero.

Cuando quiera su propio número, son dos preguntas y como treinta segundos:
{{custom_values.landing_page_es}}

Omar
{{custom_values.company_blurb_es}}
{{custom_values.company_phone}}
```

#### ES, correo 2 (Día 2) — asunto: `En qué se le va el dinero al cambiar la bañera por ducha`
```
La mayoría ve un solo número y no tiene idea de qué hay adentro. Así que aquí está un trabajo de {{custom_values.t2s_price_floor_es}}, abierto.

Demolición y botar los escombros: la bañera, el porcelanato viejo, todo eso.
Plomería: solo si se mueve el desagüe o la válvula. Muchas veces no se mueve.
Tabla de respaldo e impermeabilización: esta es la parte que usted nunca ve y la que decide si el trabajo dura.
Porcelanato y mano de obra: la línea más grande, y donde se van los días.
Vidrio: se mide después de poner el porcelanato, porque tiene que caber en lo que quedó de verdad.

Va a notar que no hay una línea para comisión, ni para oficina, ni para vendedor. Por eso nuestro número es el que es.

Dos preguntas y le sale su número:
{{custom_values.landing_page_es}}

Omar
```

---

### `T2S | 03 EN | Estimate Nurture` / `T2S | 03 ES | Seguimiento del Estimado`

**Folded into `01`.** The 14-day cadence lives inside workflow 01 as steps 11 through 19. A separate nurture workflow was in the t2s-03 draft; keeping it separate means a second hand-off tag, a second re-entry setting, and a second place for the two languages to drift. One linear chain per language is the whole point of design (b).

If a future version needs to split it, split at step 11 and hand off with `t2s-no-contact-<lang>`.

---

### `T2S | 04 EN | Guide to Estimate` / `T2S | 04 ES | De la Guía al Estimado`

Guide readers who never ran the estimator. Lower intent, slower cadence, email only.

**Trigger:** `add_to_workflow` from `02`, or Contact Tag = `planning-guide-lead`
**Filter:** Contact Tag has `lang-<x>` **AND** does not have `estimate-request`
**Exit immediately** on `estimate-request`.

| Day | Email |
|---|---|
| 6 | Case study. One bathroom in a named neighborhood, the tier they picked, the real number, the real timeline. One before, one after. Nothing else. |
| 10 | The resale objection, answered honestly. Subject EN `Will taking out my only tub hurt resale?`, ES `¿Quitar la única bañera afecta la reventa?` |
| 14 | Financing and payment. Points at the existing payment-methods and financing section on the landing page. |
| 19 | Direct ask. Two questions, get your number, link. |
| 30 | Re-engagement. EN `Still thinking about the bathroom, or should I stop emailing?` / ES `¿Todavía está con lo del baño, o dejo de escribirle?` |
| 30 | `add_contact_tag` `t2s-cold-<lang>` then `add_to_workflow` → `05` |

Day 10 EN body, since it is the one that gets written badly:
```
{{contact.first_name}},

Fair question, and the honest answer has an "it depends" in it.

If the house has another full bath with a tub, taking this one out costs you nothing on resale and usually helps. Walk-in showers show better and Miami buyers want them.

If it is the only tub in the house, that is a real consideration, and any remodeling company that tells you otherwise is selling. Families with small kids do filter for a tub. What we usually do in that case is one of two things: keep a tub in the secondary bath if there is one, or build the shower with a bench and a low curb so it reads as a premium feature instead of a missing tub.

Either way it is a decision you should make with the numbers in front of you, not from a brochure.

{{custom_values.landing_page_en}}

Omar
```

Day 10 ES:
```
{{contact.first_name}},

Buena pregunta, y la respuesta honesta lleva un "depende".

Si la casa tiene otro baño completo con bañera, quitar esta no le cuesta nada en la reventa y por lo general ayuda. Las duchas amplias se ven mejor y el comprador en Miami las busca.

Si es la única bañera de la casa, eso sí hay que pensarlo, y cualquier empresa de remodelación que le diga lo contrario le está vendiendo. Las familias con niños chiquitos sí filtran por bañera. Lo que hacemos normalmente en ese caso es una de dos: dejar una bañera en el otro baño si lo hay, o construir la ducha con banco y borde bajo para que se vea como una mejora y no como una bañera que falta.

De cualquier forma, es una decisión que usted debe tomar con los números delante, no con un folleto.

{{custom_values.landing_page_es}}

Omar
```

---

### `T2S | 05 EN | Long Cycle Nurture` / `T2S | 05 ES | Seguimiento a Largo Plazo`

A bathroom is a 180-day decision. Someone who ignores you in August is a real lead in December. **Do not delete cold leads.**

**Trigger:** Contact Tag = `t2s-cold-en` / `t2s-cold-es`
**Filter:** does not have `estimate-booked`
**Re-entry OFF.** One email every 30 days for six months, then quarterly.

| Day | Theme |
|---|---|
| 30 | A finished job from the last month, in a Miami-Dade neighborhood. Photo, tier, number. |
| 60 | Seasonal. Hurricane-season note: this is the quiet stretch for interior work, and scheduling is easy. |
| 90 | The maintenance angle. What a failing tub surround actually does to the subfloor, and how to tell. |
| 120 | Answer one question from a real customer, verbatim. |
| 150 | Price honesty. What changed in materials cost this year and what did not. |
| 180 | The permission-to-leave email. "Should I keep sending these?" One-click stay-in. Anyone who does not open six in a row gets `t2s-dormant` and drops to quarterly. |

Step 1 of this workflow is `create_opportunity` update moving the opportunity to **Lost** with reason `No contact — recycled to long nurture`. Lost is not deleted, and the pipeline report stays honest.

Frequency cap: this workflow must never run at the same time as `03` or `04`. Enforce with the workflow-level condition "does not have tag `t2s-active`", where `t2s-active` is added at step 1 of `01` and removed at day 14.

---

### `T2S | 06 EN | Appointment Booked + Reminders` / `T2S | 06 ES | Cita Agendada y Recordatorios`

**Trigger:** Customer Booked Appointment, calendar = `Free On-Site Estimate` (`DuVLTGAO5jA40cpUMzzD`) for EN, `Estimado Gratis en Casa` for ES.

Because the two calendars are separate, **the language filter is the calendar itself.** No tag filter needed, and no way for a Spanish booker to land in the English reminder set. This is a second concrete payoff from design (b).

| # | When | Type | Content |
|---|---|---|---|
| 1 | immediate | `add_contact_tag` | `estimate-booked` |
| 2 | immediate | `remove_from_workflow` | `01`, `03`, `04`, `05` (same language) |
| 3 | immediate | `create_opportunity` | move to stage `Appointment Booked` |
| 4 | immediate | `internal_notification` | email + push, appointment details |
| 5 | immediate | `email` | confirmation |
| 6 | immediate | `sms` | confirmation |
| 7 | 24h before | `sms` | reminder 1 |
| 8 | 2h before | `sms` | reminder 2 |
| 9 | 1h after end | `update_appointment_status` + `add_to_workflow` → `T2S | 08` outcome router |

Reminder SMS matter more than the confirmation. 68% of consumers do not answer unknown numbers, so a reminder from the same local number the auto-text came from is what keeps the appointment.

**EN confirmation SMS:**
```
{{contact.first_name}}, you're on the calendar: {{appointment.start_time}} at your place. It's me or my brother, fifteen minutes, no sales pitch. If anything changes, text this number. — Omar, Broke & Fixed
```

**EN reminder 24h:**
```
{{contact.first_name}}, seeing you tomorrow at {{appointment.start_time}} for the bathroom. Two things that help: clear whatever is stored in the tub, and know where the water shutoff is. Text me if tomorrow stopped working.
```

**EN reminder 2h:**
```
On my way to you in about two hours, {{contact.first_name}}. Text this number if anything changed.
```

**ES confirmación SMS:**
```
{{contact.first_name}}, ya quedó en el calendario: {{appointment.start_time}} en su casa. Va uno de nosotros dos, quince minutos, sin discurso de ventas. Si algo cambia, escríbame a este número. — Omar, Broke & Fixed
```

**ES recordatorio 24h:**
```
{{contact.first_name}}, mañana nos vemos a las {{appointment.start_time}} por lo del baño. Dos cosas que ayudan: saque lo que tenga guardado dentro de la bañera, y ubique la llave de paso del agua. Escríbame si mañana ya no le sirve.
```

**ES recordatorio 2h:**
```
Salgo para allá en unas dos horas, {{contact.first_name}}. Escríbame a este número si algo cambió.
```

---

### `T2S | 07 EN | No Show` / `T2S | 07 ES | No Asistió`

**Trigger:** Appointment Status = No Show, filtered by calendar.

A no-show is not a dead lead. It is usually a scheduling failure.

| When | Action |
|---|---|
| +5 min | `internal_notification`, and a call task, immediately. Call before texting. Half of no-shows answer. |
| +30 min | SMS 1 |
| +1 day | Email with a rebooking link |
| +3 days | SMS 2, final |
| +5 days | `add_contact_tag` `t2s-cold-<lang>`, `add_to_workflow` → `05` |

**EN SMS 1:**
```
{{contact.first_name}}, knocked and no answer. No problem at all, it happens. Want to pick another time? {{custom_values.company_calendar}}
```
**ES SMS 1:**
```
{{contact.first_name}}, toqué y no había nadie. No hay ningún problema, pasa. ¿Escogemos otra hora? {{custom_values.company_calendar_es}}
```
**EN SMS 2 (day 3):**
```
{{contact.first_name}}, last one from me on this. Calendar is here if the bathroom is still on: {{custom_values.company_calendar}}
```
**ES SMS 2 (día 3):**
```
{{contact.first_name}}, este es el último de mi parte. Aquí está el calendario por si el baño sigue en pie: {{custom_values.company_calendar_es}}
```

---

### `T2S | 08 EN | Reschedule & Cancel` / `T2S | 08 ES | Reagendar y Cancelar`

**Trigger:** Appointment Status = Cancelled OR Rescheduled, filtered by calendar.

**Rescheduled** leg: acknowledge, re-arm the reminder chain from `06`, do not restart `01`.
**Cancelled** leg: `internal_notification`, one SMS asking whether to rebook or close out, then a 3-day wait, then `t2s-cold-<lang>` → `05`.

**EN cancel SMS:**
```
{{contact.first_name}}, got the cancellation, no problem. Should I rebook you or close this out? Either answer is fine.
```
**ES cancel SMS:**
```
{{contact.first_name}}, recibí la cancelación, no hay problema. ¿Le busco otra fecha o lo cierro? Cualquiera de las dos me sirve.
```

---

## 4. Existing inherited-workflow audit

### The finding that changes the priority

`workflow show` on the two named workflows confirms the brief and adds one thing:

```
2.1 New Lead Alert
  ...
  {"order":2,"name":"1. Add New Lead To Google Sheet Tracker","type":"webhook"}
  {"order":3,"name":"2. Send Lead To Dialler","type":"webhook"}
```

Two `webhook` steps in a **published** workflow, pointing at a Google Sheet and a dialler that belong to whoever built the snapshot. Every lead that enters it is being copied to a third party's systems right now.

Separately: **all 17 custom values are empty.** Those 20 published workflows send emails and SMS built on `{{custom_values.company_name}}` and `{{custom_values.company_phone}}`, which currently render as nothing. So the inherited workflows are not merely a double-messaging risk. Any one of them that fires today sends a homeowner a message with blank holes in it, signed by nobody, from a company with no name.

### The recommendation: unpublish all 20 today

Not filter. Unpublish. A draft workflow cannot enrol a contact, which makes this the only mitigation with a zero failure mode, and it is available before A2P, before email, before anything. Reinstate individually and deliberately if a specific one turns out to be worth keeping.

### Inspect in this order

**Tier 1, can leak data or destroy records. Inspect today, unpublish today.**

| Workflow | ID | Why |
|---|---|---|
| `2.1 New Lead Alert` | `1e48eede-f803-4284-8638-314dfdbb3ba5` | two webhooks to a stranger's Sheet and dialler |
| `4.7 Spam Deletion` | `5f4b840b-9034-4e21-b7c4-879883e317d6` | the survey found `internal-delete-contact` in this account. A misfire permanently deletes a paid lead. |
| `1.1 New Lead (Day 1)` | `4c2cfd89-2e2e-41df-b31b-adb1c9dbc8be` | `create_opportunity`, `email`, `sms`, and `add_to_workflow` — it is the hub that pulls contacts into 1.2 and 1.3 |
| `4.3 Lead Disqualified` | `2bef5988-783e-4bc7-ab91-59099d4603ad` | moves pipeline stages under its own logic |

**Tier 2, will double-message.**

`1.2 Short Term Nurture` `a4a13aa5`, `1.3 Long Term Nurture` `2dfe6b67`, `4.1 After 24hrs Move Hot Lead` `701286ab`, `2.2 SMS Response Alert` `3d9dc014`, `4.9 Lost Opportunity` `89bec9d0`, `3.1 Remove From Nurture Workflows` `adb96e11`.

**Tier 3, appointment side. Inspect for reuse, since `T2S | 06/07/08` may be able to borrow their step patterns rather than being built from scratch.**

`1.4 Appointment Booked + Survey` `3e68c5d9`, `1.5 Cancelled` `4ab3dd77`, `1.6 No Show` `8e9b0fa3`, `1.7 Rescheduled` `740c31ea`, `2.3 New Appointment Alert` `6993f8f3`, `4.2 Lead Rescheduled` `89a7836d`, `4.5 Review Request` `4adeffc2`, `4.6 Client Call Completed` `c75438c1`.

`4.5 Review Request` is the most likely keeper. Point it at `{{custom_values.c__google_review_link}}` and it works.

**Tier 4, already draft, no action needed.** `4.4` `fd50b2cd`, `4.8` `1379d9be`, `New Workflow : 1786510524396` `37509a7e`.

Not in any tier: `1.8 Got Estimate` `400259cc`, `1.9 Closed Sale` `2aeabdf5`. Inspect last.

### Commands

Run from `/Users/othmarcasilla/GHL CLI BUILD`. All read-only.

```bash
cd "/Users/othmarcasilla/GHL CLI BUILD"

# The full inventory with ids and status
.venv/bin/python -m ghl_cli.ghl.cli workflows list

# Tier 1, one at a time, reading each before moving on
.venv/bin/python -m ghl_cli.ghl.cli workflow show "2.1 New Lead Alert"
.venv/bin/python -m ghl_cli.ghl.cli workflow show "4.7 Spam Deletion"
.venv/bin/python -m ghl_cli.ghl.cli workflow show "1.1 New Lead (Day 1)"
.venv/bin/python -m ghl_cli.ghl.cli workflow show "4.3 Lead Disqualified - Add Notes And Move Pipeline Stage"
```

Dump every step graph to one file for offline reading, so the audit is a diffable artifact rather than 23 browser tabs:

```bash
cd "/Users/othmarcasilla/GHL CLI BUILD"
CLI=".venv/bin/python -m ghl_cli.ghl.cli"
$CLI workflows list \
  | python3 -c 'import json,sys; [print(w["name"]) for w in json.load(sys.stdin)["workflows"]]' \
  | while IFS= read -r n; do
      printf '\n===== %s =====\n' "$n"
      $CLI workflow show "$n"
    done > /tmp/ghl-inherited-audit.json
```

Adjust the JSON key if `workflows list` nests differently; the verified shape today is `{"workflows": [{id,name,status,...}]}`.

### What to look for in each graph

1. **`webhook` steps.** Any URL not on `brokeandfixed.com` or `graph.facebook.com` is a leak. Note the URL, then unpublish.
2. **`internal-delete-contact`.** Anywhere. It destroys paid leads.
3. **`internal_notification` recipients.** If any resolve to the snapshot author instead of `{{custom_values.notifications_email_for_client}}`, that person is getting the leads.
4. **`add_to_workflow`.** Maps the hidden chains. `1.1` has one; follow it.
5. **The trigger.** `workflow show` does not return triggers (the schema doc lists them as not yet mapped), so read the trigger in the UI. Any trigger that is Contact Created, Form Submitted with no form named, or Tag Added with no tag named will catch every tub-to-shower lead.
6. **Merge fields against §2.** After the custom values are filled, some of these become safe to run again. Before, none are.

### Three layers so this cannot come back

1. **Unpublish** all 20 today. Primary defence.
2. **Filter.** On any inherited workflow later reinstated, add trigger filter `Contact does not have tag tub-to-shower-lead`. Requires the §8 tag fix to land first, or it will also exclude guide leads.
3. **Eject.** Step 2 of `T2S | 01 EN/ES` is `remove_from_workflow` targeting `4c2cfd89`, `1e48eede`, `a4a13aa5`, `2dfe6b67`. Even if someone republishes one by accident, a T2S lead is pulled out within seconds.

---

## 5. Phone number strategy

### The number

One local number, area code **786** preferred over 305. Both are Miami-Dade, but 786 is the newer overlay and reads as a mobile to most Miami residents, which lifts answer rate on the callback. Buy it in Settings → Phone Numbers. **Do not buy toll-free.** A toll-free caller ID on a callback for a home remodel reads as a call center, and 68% of consumers do not answer unknown numbers as it is.

Once purchased, set `custom_values.company_phone` to it in `(786) XXX-XXXX` format. Every customer-facing message in §3 renders that value, so the entire system switches to the new number with one edit.

### Forwarding vs. Call Connect — they are different things

**Call Forwarding** is a property of the number. Settings → Phone Numbers → the number → Forwarding Number. Set it to `+17863637039`. An inbound call to the tracking number rings the owner's cell directly. Simple, and it has one serious flaw: the owner's voicemail will pick up. GHL sees the call as *answered* by voicemail, so the missed-call automation never fires, and the homeowner leaves a message on a cell nobody checks. This is the default and it is the wrong setting.

**Call Connect** (the whisper) is the same forward with a gate in front. GHL calls the owner, plays a recorded whisper that only the owner hears, and bridges the two parties only after a keypress. Configure it as:

- Whisper message: *"Tub to shower lead calling. Press any key to connect."*
- Require keypress: **ON**
- Ring duration: 20 seconds
- Fallback if no key is pressed: route to the next team member, then to voicemail **on the GHL number**, which triggers the missed-call flow.

Use Call Connect. Three reasons. The owner knows before saying hello that this is an ad lead and answers as the business rather than "yeah?". Voicemail cannot silently swallow the call, because a voicemail system does not press a key. And an unanswered call becomes a genuine missed-call event, which is what the automation hangs off.

### Caller ID, both directions

| Leg | What is displayed |
|---|---|
| Homeowner calls the tracking number | their own number to them, obviously; irrelevant |
| GHL rings the owner's cell | **the homeowner's number**, by default. Change this to display the tracking number, so the owner can tell an ad lead from a personal call before answering. GHL: Settings → Phone Numbers → Advanced → "Display forwarded caller ID". |
| Owner calls out from the GHL app or dialer | **the tracking number.** Verify this. If the owner calls back from their personal cell instead, the homeowner sees an unfamiliar number that does not match the text they just received, and answer rate collapses. This single behavioral habit undoes half the value of buying the number. |
| The 60-second auto-text | the tracking number |

The consistency is the whole point. Text arrives from 786-XXX-XXXX, call arrives from 786-XXX-XXXX, the homeowner's phone shows one number twice, and the second contact is warm.

### Call recording

Settings → Phone Numbers → Advanced Settings → Call Recording: ON.

**Florida is a two-party consent state** (Fla. Stat. § 934.03). Recording a call without the other party's consent is a criminal offence, not a policy violation. Recording is genuinely useful here, both for training and for settling "but you said" disputes on a $9,500 job, so configure it compliantly rather than skipping it:

- Enable **Call Recording Announcement** so an automated message plays to the caller before the conversation begins, on both inbound and outbound calls.
- The announcement must be **bilingual**, because Spanish ads point at this same number: *"This call may be recorded for quality. Esta llamada puede ser grabada."* Short, in that order, once.
- Do not rely on the owner saying it verbally. It will be forgotten on call four of the day.
- Retention: 12 months, then purge.

### Missed-call text back

Do **not** use the number-level Missed Call Text Back toggle. It sends one fixed message in one language, and this number receives both English and Spanish callers.

Build it as a workflow instead: **`T2S | 09 XX | Missed Call Text Back`**, trigger Call Status = Missed / No Answer.

The complication is the unknown caller. Someone calling from a billboard or a Google listing has no `lang-en` or `lang-es` tag. So this one workflow is the single place an `if_else` is worth the cost, or three separate workflows filtered on the tag:

- has `lang-es` → Spanish message
- has `lang-en` → English message
- has neither → **bilingual message**, English first, Spanish second, in one SMS

```
Sorry we missed you, this is Broke & Fixed. Text us here and we'll get right back.
Perdone que no contestamos, le habla Broke & Fixed. Escríbanos por aquí y le respondemos enseguida.
```

That is 176 characters, which is two SMS segments. Accept it. A wrong-language reply costs more than a segment.

### How this interacts with A2P 10DLC

The single most useful fact, and the one that unblocks most of the work:

**A2P 10DLC governs application-to-person SMS. It does not govern voice.**

So the moment the number is purchased:

- Inbound calls forward, with whisper. **Works.**
- Call recording. **Works.**
- Outbound calls from the GHL dialer showing the tracking number. **Works.**
- Every SMS, including the 60-second auto-text and missed-call text back. **Blocked or heavily filtered until the campaign is approved.**

Buy the number now and run voice on it immediately. That alone delivers the five-minute call SLA, which is the highest-value item in this entire document.

Three registration details that decide whether the campaign passes:

1. **Assign the number to the campaign.** The brand and campaign are registered separately from numbers. If the number is bought after the campaign clears, it must be attached to the campaign in Settings → Phone Numbers → A2P, or SMS from it is unregistered traffic and gets filtered even though the campaign shows approved.
2. **The sample messages must be the real messages.** Submit the actual SMS bodies from §3 — SMS 1, the reminder, the missed-call text — verbatim. Carriers compare live traffic against samples. Generic placeholder samples are the most common reason a campaign passes review and then gets filtered in production.
3. **Use case: Mixed / Customer Care, low volume.** Not Marketing. Every SMS in §3 is a response to a form the person just filled in or an appointment they booked, which is exactly what Customer Care describes and it carries better throughput and fewer filtering rules than Marketing. The opt-in evidence is the landing-page consent language, so make sure that consent line exists on both `/en/landing/tub-to-shower` and `/es/landing/tub-to-shower` and points at a live privacy policy, and submit that URL as the opt-in proof.

Include `Reply STOP to opt out` on the first SMS of any sequence. `SMS 4` already carries it; add it to `SMS 1` in both languages before submitting samples, and keep the sample and the live copy identical.

---

## 6. Email sending setup

### LC Email vs. a dedicated sending domain

**LC Email** is LeadConnector's shared Mailgun-backed pool. Zero setup, sends today. The cost is that reputation is shared with every other GHL sub-account on that pool, the `From` shows a LeadConnector-owned domain, and Gmail's promotions-tab classification for a shared bulk pool is unkind. For a homeowner who filled a form four minutes ago, the promotions tab is the same as not sending.

**A dedicated sending domain** means the reputation is the client's own and it compounds. The `From` reads `omar@brokeandfixed.com`, which matches the site the person just used.

The client said explicitly: *"we are going to create dedicated emails."* So the answer is dedicated. The recommendation is on the sequencing.

### The recommendation

**Start LC Email, cut over to the dedicated domain at day 10.**

Verify the dedicated domain today, because DNS propagation plus a warm-up is a clock that should be running while everything else is being built. But do not gate the launch on it. Volume in week one is a handful of leads a day, LC Email delivers those fine, and a lead that gets an email from a shared pool is infinitely better than a lead that gets nothing because DKIM has not propagated.

### The domain to use

Sending subdomain: **`mail.brokeandfixed.com`**. Not the root.

The root domain runs the website and its MX points at Gmail for `brokeandfixed305@gmail.com`. Handing bulk-sending DNS to the root risks the mailbox the business actually reads. A subdomain isolates sending reputation completely, and a subdomain that starts cold cannot damage a root that already has history.

- `From`: `omar@brokeandfixed.com` — the root, so it looks right to a human
- `Reply-To`: `brokeandfixed305@gmail.com` — so replies land in the inbox that is actually read
- DKIM signs on `mail.brokeandfixed.com`, aligning to the root via relaxed DMARC alignment

That is the standard pattern and it is why `adkim=r` below is not optional.

### DNS records

Copy the exact selector and key from the GHL UI. The values below are the shapes; the DKIM public key is generated per domain and only GHL knows it.

| Type | Host | Value | TTL |
|---|---|---|---|
| TXT | `mail.brokeandfixed.com` | `v=spf1 include:mailgun.org ~all` | 3600 |
| TXT | `<selector>._domainkey.mail.brokeandfixed.com` | `k=rsa; p=<paste from GHL>` | 3600 |
| CNAME | `email.mail.brokeandfixed.com` | `mailgun.org` | 3600 |
| MX | `mail.brokeandfixed.com` | `10 mxa.mailgun.org` | 3600 |
| MX | `mail.brokeandfixed.com` | `10 mxb.mailgun.org` | 3600 |
| TXT | `_dmarc.brokeandfixed.com` | `v=DMARC1; p=none; rua=mailto:dmarc@brokeandfixed.com; fo=1; adkim=r; aspf=r; pct=100` | 3600 |

Notes that prevent the two failures that actually happen:

- **Do not add a second SPF TXT at the root.** If `brokeandfixed.com` already has `v=spf1 include:_spf.google.com ~all` for Gmail, leave it alone. Two SPF records at one host is a permerror and it breaks the existing mail, not just the new sending. The SPF above goes on the **subdomain only**.
- **`adkim=r` is load-bearing.** With strict alignment, a DKIM signature on `mail.brokeandfixed.com` does not align with a `From` of `@brokeandfixed.com` and every message fails DMARC. Relaxed alignment accepts the organizational-domain match.
- The two MX records on the subdomain are for bounce handling. Without them, bounces are invisible and the list rots silently.
- Start at `p=none`. After 30 days of clean `rua` reports, move to `p=quarantine`. Only then consider `p=reject`.

### Warm-up schedule

| Days | Max sends/day | Send to |
|---|---|---|
| 1–3 | 20 | only same-day form submissions, the highest-engagement traffic there is |
| 4–7 | 50 | same-day submissions plus day-3 follow-ups |
| 8–14 | 100 | add the guide sequence |
| 15–21 | 250 | add workflow `04` |
| 22–30 | 500 | add workflow `05` long-cycle nurture |
| 30+ | as needed | never more than 2x the previous day |

Hold these or restart the warm-up: bounce rate under **2%**, spam complaints under **0.1%**, open rate above 20%.

Two rules that matter more than the schedule. Send the transactional messages first, because they get opened and opens are what build reputation. And do not import an old contact list into a cold domain, ever. One bulk send to stale addresses in week one undoes the entire warm-up.

### Cut-over

At day 10, once GHL shows the domain verified and green:

1. Change the sending domain in Settings → Email Services.
2. Update `from_email` on every `email` step across the 18 workflows. The CLI spec files make this a find-and-replace in git, not 18 UI edits — a further argument for design (b).
3. Send one test to a Gmail address, one to an Outlook address, one to an iCloud address. Check `Show original` in Gmail: SPF **pass**, DKIM **pass**, DMARC **pass**.
4. Watch the first week's bounce rate before raising volume.

---

## 7. Buildable right now, before A2P and before email

This is the section the client asked for. Ordered by value per hour of work. Nothing in this list requires an approved A2P campaign or a verified sending domain.

### Right now

**1. Unpublish the 20 published inherited workflows.** Fifteen minutes, and it is the highest-risk item in the account. Two of them are copying every lead to a stranger's Google Sheet and dialler, one can delete contacts, and all of them send messages with blank merge fields because every custom value is empty. Set them to draft. Reinstate individually later if any turns out to be worth keeping.

**2. Fill all 17 custom values, and create the 11 new ones.** §2. Thirty minutes. Nothing else works properly until this is done, and it unblocks reinstating anything inherited.

**3. Buy the 786 number and configure voice.** §5. **A2P does not gate voice.** Forwarding with Call Connect whisper, keypress required, caller ID showing the tracking number, bilingual recording announcement, recording on. The five-minute call SLA is live the moment this is done, and per the MIT data that is the single largest lever in the account.

**4. Create the three new custom fields.** §8: `event_id`, `starting_price_display`, `lang`. Two minutes each in Settings → Custom Fields, and every workflow spec depends on them.

**5. Start the dedicated-domain DNS today.** §6. Propagation and a 30-day warm-up are a clock. Start it now even though sending starts on LC Email.

**6. Ship the code-side fixes.** §8. Tag collision, slug labels, the price-display field, `event_id`. These are edits to `app/api/lead/route.ts` and they are prerequisites for the trigger filters and for CAPI deduplication.

### This week

**7. Build the internal-alert path, and turn it on.** This is the biggest thing in this list that people assume is blocked and is not. GHL `internal_notification` by **email and in-app push** goes through GHL's own system sender and the mobile app, not the client's sending domain and not an SMS carrier. So the owner alert, the 15-minute escalation, the 30-minute escalation and the call task all work **today**, in full, with the exact ALERT block from §3. What is blocked is internal notification *by SMS*, because that still traverses a carrier. Configure the alerts as Email + Push and leave the SMS toggle off until A2P clears.

**8. Build the call-task cadence.** Tasks are internal records. All six call tasks across 14 days work today. Combined with item 7, the full human side of the speed-to-lead SLA is operational before a single automated message is sent.

**9. Duplicate the calendar for Spanish.** §2.1. Same team, same slots, Spanish widget, Spanish event title. This is what makes the language filter on workflow `06` structural instead of tag-dependent.

**10. Build the pipeline out.** `Main Pipeline` currently has `New Lead` doing all the work. Add: `Contacted`, `Appointment Booked`, `Estimate Given`, `Won`, `Lost`. The `create_opportunity` and stage-move steps in every workflow reference these, and adding stages later means editing every workflow.

**11. Draft all 18 workflows via the CLI.** Draft workflows cannot enrol or message anyone, which is exactly why this is safe pre-A2P. Every step type in this spec except `sms` and `email` is fully functional in draft and reviewable. Build them as linear chains, `--dry-run` first, and keep the spec JSON in the repo next to the site code.

**12. Tag hygiene.** Rename `facebook ads lead` → `facebook-ads-lead` in code and in GHL, and split `tub-to-shower-lead` off the guide path. Both in §8. Until the rename ships, any condition testing that tag must be typed with the spaces, exactly.

**13. Set up the CAPI token and workflow `00`.** Server-side conversions have nothing to do with SMS or email. Meta's Events Manager will show `Lead` events arriving from the server the day this is turned on, and the deduplication check in §3 can be verified immediately.

**14. Write and stage every SMS body, then submit them as A2P samples.** §5. The samples must be the real copy. Doing this now means the campaign is reviewed against what will actually be sent, which is the difference between an approved campaign that delivers and an approved campaign that gets filtered.

**15. Baseline speed-to-lead.** Log time from form submission to first human contact, by hand if necessary, starting with the next lead. It is the highest-leverage number in the build, it is entirely inside the client's control, and there is no baseline to improve against unless measurement starts before the automation does.

### What unlocks the moment A2P clears

1. **The 60-second auto-text**, EN and ES. The single highest-ROI automation in the account.
2. SMS 2, 3, 4 in workflow `01`, both languages.
3. Missed-call text back, all three language variants.
4. Appointment confirmation and the 24-hour and 2-hour reminders in `06`.
5. No-show and cancellation SMS in `07` and `08`.
6. Internal notification **by SMS** to the owners, on top of the email and push already running.
7. Two-way SMS conversations in the GHL inbox, which is what makes "text me a better time" a real offer rather than a dead end.

### What unlocks when the sending domain verifies

1. All five emails in `01`, both languages.
2. Guide delivery in `02`, which is currently the only thing genuinely blocking the guide funnel, since it has no phone number to fall back on.
3. Workflows `04` and `05` in full.
4. The `From` on every message changes from a LeadConnector domain to `omar@brokeandfixed.com`.

---

## 8. Formatting fixes

Four problems. Three are one-line code changes and one needs a new field.

### 8.1 Price renders as `6500`, or as nothing

**Cause.** `planning_range_low` is `NUMERICAL`, so `{{contact.planning_range_low}}` renders `6500`. Writing `${{contact.planning_range_low}}` in copy produces `$6500`. Worse, `startingPrice()` returns `null` for the `master` layout, the route writes `""`, and the same merge tag renders `$` on its own. And `planning_range_high` is deliberately always empty (`app/api/lead/route.ts:198`), so every "between X and Y" sentence renders with a hole in it.

**GHL side.** Do not try to fix this in GHL. There is no number formatter in the merge-tag engine, and converting the field to TEXT would break `create_opportunity`'s `monetary_value`, which needs a number. Keep `planning_range_low` numeric and keep using it for opportunity value only. Never put it in customer-facing copy.

**Code side.** Add one TEXT custom field, `contact.starting_price_display`, and have the route write a complete, already-localized phrase:

| locale | priced | measure required |
|---|---|---|
| `en` | `starts at $6,500` | `gets its number once we measure` |
| `es` | `empieza en $6,500` | `lleva medición antes de darle el número` |

In `app/api/lead/route.ts`, `buildCustomFields` (line 190). `formatUSD` already exists in `lib/landing/quote-pricing.ts:125` and produces `$6,500` with the comma:

```ts
const PRICE_PHRASE = {
  en: { priced: (p: string) => `starts at ${p}`, measure: "gets its number once we measure" },
  es: { priced: (p: string) => `empieza en ${p}`, measure: "lleva medición antes de darle el número" },
} as const

// inside buildCustomFields, which needs lead.locale in scope (it already has `lead`)
{
  id: GHL_FIELD_IDS.startingPriceDisplay,
  field_value:
    startingAt === null
      ? PRICE_PHRASE[lead.locale].measure
      : PRICE_PHRASE[lead.locale].priced(formatUSD(startingAt)),
},
```

Every sentence in §3 is written to take this phrase, in both languages, in both the priced and the measure case. Verify all four combinations read correctly before publishing.

This is the design that only works because the EN and ES workflows are separate. Under a branched design, the field would carry Spanish text into the English branch whenever the tag and the field disagreed.

### 8.2 Layout and scope render as slugs

**Cause.** `buildCustomFields` lines 192–193 send `lead.layout` and `lead.scope` raw, so an owner alert reads `wall-to-wall / shower-floor`. Meanwhile the Web3Forms fallback at line 417 sends `` `${lead.layout} (${LAYOUT_LABEL[lead.layout]})` ``. Two formats from one submission depending on which upstream answered.

**GHL side.** Nothing. Do not build a lookup in workflow conditions; it would need maintaining in two languages and it would silently break when a new layout ships.

**Code side.** `LAYOUT_LABEL` and `SCOPE_LABEL` already exist in `lib/landing/quote-pricing.ts:152` and `:158` and are already imported into the route (lines 7–8). Send the labels:

```ts
{ id: GHL_FIELD_IDS.bathroomLayout, field_value: LAYOUT_LABEL[lead.layout] },
{ id: GHL_FIELD_IDS.projectScope,   field_value: SCOPE_LABEL[lead.scope] },
```

Then make line 417 match, so both paths write the same string:

```ts
bathroom_layout: LAYOUT_LABEL[lead.layout],
scope_level: SCOPE_LABEL[lead.scope],
```

The comment on `LAYOUT_LABEL` says these stay English in the CRM regardless of the visitor's language. Keep that. The labels appear in owner alerts, which are internal, and in the Email 1 sentence `a {{contact.project_scope}} in a bathroom like yours`. That sentence is the one place an English label lands in a Spanish email. Two options, and the second is correct:

- Leave it, and accept `un trabajo de Shower and floor` — reads badly.
- **Drop the merge tag from the ES Email 1 subject line and body** and write `un trabajo como el suyo` instead. The Spanish copy in §3 already does this. The English copy keeps the merge tag.

Do not localize `SCOPE_LABEL` itself. The sales side needs one vocabulary.

### 8.3 The tag collision

**Cause.** `LEAD_TAG = "tub-to-shower-lead"` is applied at line 254 for estimator leads and again at line 309 for guide opt-ins. So the tag cannot distinguish intent and cannot be used as a trigger.

**Fix.** Remove `LEAD_TAG` from the guide payload at line 309. Guide opt-ins keep `planning-guide-lead`, `guide-<source>`, and `lang-<locale>`. Estimator leads keep `tub-to-shower-lead` and `estimate-request`.

Until that ships, every trigger in this spec keys off `estimate-request` or `planning-guide-lead` and never off `tub-to-shower-lead`. That is deliberate and it is why the spec is safe to build before the code fix.

### 8.4 `facebook ads lead` has spaces

**Cause.** `adPlatformTags` returns `["facebook ads lead"]` at line 142.

**Fix.** Change to `["facebook-ads-lead"]`, then in GHL merge the old tag into the new one so historical contacts are not orphaned. Order matters: ship the code first, then merge, then update any conditions. Until then, any condition testing this tag must be typed with the spaces, exactly, or it silently never matches.

### 8.5 New custom fields to create

Settings → Custom Fields. Three.

| Name | Key | Type | Written by |
|---|---|---|---|
| Starting Price Display | `contact.starting_price_display` | TEXT | route, §8.1 |
| Event ID | `contact.event_id` | TEXT | route, at submit, for CAPI dedup |
| Language | `contact.lang` | TEXT | route, `en` / `es` |

`contact.lang` duplicates the `lang-en` / `lang-es` tags on purpose. Tags are for triggering; a field is for merge tags, filters and reporting, and it survives a tag cleanup. Cheap insurance.

After creating each, read the generated field ID back and add it to `GHL_FIELD_IDS` in `app/api/lead/route.ts:47`:

```bash
cd "/Users/othmarcasilla/GHL CLI BUILD" && .venv/bin/python -m ghl_cli.ghl.cli list custom-fields
```

---

## 9. Test plan

Two leads, one per language, each traced through every touch. Run it against **draft** workflows first, then again after publishing.

### Preconditions

- Custom values filled (§2), both calendars exist (§2.1)
- Three new custom fields created and their IDs in `GHL_FIELD_IDS`
- Code fixes from §8 deployed to production
- Inherited workflows unpublished (§7 item 1)
- Two real test contacts with two real phone numbers and two real inboxes. **Do not use a single Gmail with plus-addressing**; the upsert matches on email and the two tests will collide into one contact.

### Phase 1, pre-publish, no messages sent

| # | Do | Expect |
|---|---|---|
| 1.1 | Submit the estimator at `/en/landing/tub-to-shower` from a phone. Layout `wall-to-wall`, scope `shower-floor`. | HTTP 200, thank-you page shows a starting price |
| 1.2 | `list contacts --limit 5` | contact exists, phone in `+1` E.164 |
| 1.3 | Inspect the contact in GHL | Tags: `tub-to-shower-lead`, `estimate-request`, `lang-en`. **Not** `planning-guide-lead`. |
| 1.4 | Check custom fields | `bathroom_layout` = `Tub sits wall to wall` (not a slug), `project_scope` = `Shower and floor`, `starting_price_display` = `starts at $6,500`, `event_id` populated, `lang` = `en` |
| 1.5 | Repeat 1.1 with layout `master` | `starting_price_display` = `gets its number once we measure`, `planning_range_low` empty, and **no `$` appears anywhere** |
| 1.6 | Submit at `/es/landing/tub-to-shower`, layout `master` | `lang-es` present, `starting_price_display` = `lleva medición antes de darle el número` |
| 1.7 | Submit ES with layout `extra-space`, scope `full-remodel` | `starting_price_display` = `empieza en $X,XXX` — comma present, Spanish phrase |
| 1.8 | Meta Events Manager → Test Events | browser `Lead` fired on both submissions |
| 1.9 | Confirm no messages were sent | Conversations tab empty for both contacts. **If anything sent, an inherited workflow is still published. Stop and return to §7.** |

Step 1.9 is the gate. Do not proceed past it.

### Phase 2, publish `00` and `01 EN` only

| # | Do | Expect |
|---|---|---|
| 2.1 | Publish `T2S | 00 XX` and `T2S | 01 EN`. Leave ES and everything else draft. | |
| 2.2 | Submit a fresh EN estimator lead. Start a stopwatch. | |
| 2.3 | Watch the owner's email and the GHL mobile app | ALERT block arrives within ~10s, header reads `— ENGLISH`, every field populated, no blank holes, no `$` on its own |
| 2.4 | Watch the test phone | SMS 1 arrives **between 45 and 75 seconds**. From the 786 tracking number. English. Price phrase reads as a sentence. |
| 2.5 | Check the opportunity | created in `Main Pipeline` / `New Lead`, named `T2S <name> - Shower and floor`, value = the number |
| 2.6 | Do nothing for 35 minutes | escalation email at ~15 min, urgent escalation at ~30 min |
| 2.7 | Check the task list | one call task, assigned, due now |
| 2.8 | Events Manager → `Lead` → Deduplication | browser and server events **paired, counted once**. If the count is 2, `event_id` is not matching. Fix before spending money. |
| 2.9 | Call the 786 number from the test phone | whisper plays, keypress required, bridges to (786) 363-7039, bilingual recording announcement heard first |
| 2.10 | Call it again and let it ring out | missed-call event registers. Voicemail on the GHL number, **not** the owner's cell voicemail. |
| 2.11 | Reply to SMS 1 from the test phone | contact exits the workflow. No further messages. **Verify by waiting until the 1-hour mark and confirming SMS 2 never arrives.** |

### Phase 3, publish `01 ES`

| # | Do | Expect |
|---|---|---|
| 3.1 | Submit an ES lead from a second phone | |
| 3.2 | Owner alert | header reads `— SPANISH · THIS ONE NEEDS A SPANISH SPEAKER` |
| 3.3 | Test phone | SMS 1 in Spanish, inside 75 seconds, from the same 786 number |
| 3.4 | **Cross-contamination check.** Confirm the ES contact is enrolled in `01 ES` and **not** in `01 EN`. | Contact record → Workflows tab shows exactly one |
| 3.5 | Same check on the EN contact from Phase 2 | enrolled in `01 EN` only |
| 3.6 | Opportunity source | `Meta tub to shower ES` |
| 3.7 | Let the ES lead run to the 4-hour email | Email 1 fully Spanish. **No English string anywhere**, including subject line, sign-off, and the `company_blurb_es` block. Calendar link resolves to the Spanish calendar. |
| 3.8 | Click that calendar link | **Spanish** booking widget, not English. If English, `company_calendar_es` is wrong or the duplicate calendar's language is unset. |

Step 3.8 is the one that fails most often, and it fails silently, because the email is perfect Spanish right up until the click.

### Phase 4, the appointment path

| # | Do | Expect |
|---|---|---|
| 4.1 | Book the ES lead through the Spanish calendar | enrolled in `06 ES`, **not** `06 EN` |
| 4.2 | Check | removed from `01 ES`, tag `estimate-booked` added, opportunity moved to `Appointment Booked` |
| 4.3 | Confirmation SMS and email | Spanish. Event title in the calendar reads `Estimado en Casa: <name> - Broke & Fixed Home Solutions`. |
| 4.4 | Book an EN lead through the English calendar | `06 EN`, English throughout, event title `On-Site Estimate: ...` |
| 4.5 | Availability | book the same slot in EN, then try the same slot in ES | **unavailable.** If it is offered, the two calendars are not sharing team members and will double-book. |
| 4.6 | Mark one no-show | `07 <lang>` fires in the right language |
| 4.7 | Cancel the other | `08 <lang>` fires in the right language |

### Phase 5, guide path

| # | Do | Expect |
|---|---|---|
| 5.1 | Submit the ES exit-intent guide form | tags `planning-guide-lead`, `guide-exit-intent`, `lang-es`. **No `estimate-request`. No `tub-to-shower-lead`** (post-§8.3). |
| 5.2 | Guide email | Spanish, ES PDF link, and the link **downloads** |
| 5.3 | Same contact then completes the ES estimator | exits `02 ES` and `04 ES`, enters `01 ES`. **No duplicate contact created** — the upsert matched on email. |
| 5.4 | Confirm | exactly one contact record for that email |

### Phase 6, deliverability

| # | Do | Expect |
|---|---|---|
| 6.1 | Send Email 1 to a Gmail, an Outlook and an iCloud address | all three arrive |
| 6.2 | Gmail → Show original | SPF **pass**, DKIM **pass**, DMARC **pass** |
| 6.3 | Check placement | Primary or Updates, not Promotions. If Promotions, cut image count and link count in the transactional emails. |
| 6.4 | Send both Spanish emails to all three | accents render correctly in subject and body. `¿`, `ñ`, `ó` intact. A mojibake subject line is the single most common encoding failure and it looks like spam. |

### Cleanup

Delete all test contacts and their opportunities. Then re-check the pipeline count so the first real week's numbers start from zero.

### The number to track from day one

**Time from form submission to first human contact.** Log it manually for the first month if necessary. It is the highest-leverage number in this entire build, it is the only one entirely inside the client's control, and per HBR 2011 the industry it is being measured against averages 42 hours.

---

## 10. Build order

1. Unpublish 20 inherited workflows
2. Fill 17 custom values, create 11 new
3. Create 3 custom fields, capture their IDs
4. Ship §8 code fixes
5. Buy the 786 number, configure Call Connect, recording, caller ID
6. Start the sending-domain DNS
7. Duplicate the calendar for Spanish
8. Build out pipeline stages
9. Draft all 18 workflows via the CLI
10. Publish `00` and `01 EN`, run Phase 2
11. Publish `01 ES`, run Phase 3
12. Publish `06`, `07`, `08` pairs, run Phase 4
13. Publish `02`, `04`, run Phase 5
14. A2P clears → enable every SMS step, re-run Phases 2 and 3
15. Domain verifies → cut over `from_email`, run Phase 6
16. Publish `05` pair last

---

## 11. Keeping the two languages in sync

The one real cost of design (b). Four rules.

1. **Never edit one language without the other in the same sitting.** If the ES version cannot be done now, do not ship the EN version now.
2. **Keep the 18 create-specs in the repo**, under `docs/ghl/specs/`. Then `diff t2s-01-en.json t2s-01-es.json` shows only copy attributes differing. Any structural difference is a bug.
3. **Step counts must match.** Assert it in review: `01 EN` and `01 ES` both have 19 steps. A mismatch means someone added a step to one language.
4. **One copy source.** All 18 workflows' copy lives in this document. GHL is the deployment target, not the source of truth. Edit here, then deploy.
