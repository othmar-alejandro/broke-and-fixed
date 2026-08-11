# GoHighLevel Workflows: Tub to Shower
Sub-account `Broke and Fixed Home Solutions` | location `BubbBDEstaWhTJReHDcG`

The GHL API is read only for workflows, so these get clicked in by hand. Everything below is exact: real tag strings, real merge field keys pulled from the live account, real message copy in both languages.

---

## Before you build anything

**1. Turn on sending.** The sub-account has no email provider and no phone number. Every workflow below is dead until that is fixed.

- Settings, Phone Numbers, add a number. Get a local 305 or 786 number, not a toll free one. Your vault is specific that the auto-text has to come from a local number.
- Settings, Email Services. LC Email is the fast path. If you want to send from `brokeandfixed305@gmail.com`, you need a dedicated sending domain instead, which means DNS records and a warm up period. LC Email now, dedicated domain later.
- A2P 10DLC registration is required before SMS will actually deliver in the US. It takes a few business days. **Start this today, it is the long pole.**

**2. Check the 22 workflows already in this sub-account.** That snapshot includes `1.1 New Lead (Day 1)` and `2.1 New Lead Alert`, both published. If either triggers on any new contact rather than a specific tag, every tub to shower lead will get double messaged. Open both, read the trigger, and either narrow them or add a filter that excludes `tub-to-shower-lead`. Do this before publishing anything new.

**3. Fix the tag collision in code first.** Right now guide opt-ins also get `tub-to-shower-lead`. Until that ships, every workflow below keys off `estimate-request` and never off `tub-to-shower-lead`. That is deliberate.

---

## Reference: what you have to work with

**Tags the site applies**

| Tag | When |
|---|---|
| `tub-to-shower-lead` | every submission, estimator and guide both (this is the bug) |
| `estimate-request` | completed estimator only |
| `planning-guide-lead` | guide opt-in only |
| `guide-inline` | guide opt-in from the inline block |
| `guide-exit-intent` | guide opt-in from the exit popup |
| `lang-en` | anything not Spanish |
| `lang-es` | Spanish page |
| `facebook ads lead` | fbclid present, or utm_source contains facebook / instagram / meta. **Note the spaces.** Type it exactly, including spaces, or the condition never matches. |

**Merge fields, verified against the live account**

| Field | Merge tag | Format |
|---|---|---|
| Bathroom Layout | `{{contact.bathroom_layout}}` | slug: `wall-to-wall`, `extra-space`, `master` |
| Project Scope | `{{contact.project_scope}}` | slug: `shower-only`, `shower-floor`, `full-remodel` |
| Planning Range Low | `{{contact.planning_range_low}}` | number, no dollar sign, no comma |
| Planning Range High | `{{contact.planning_range_high}}` | number, no dollar sign, no comma |
| Lead Source Detail | `{{contact.lead_source_detail}}` | pipe joined string |
| UTM Source | `{{contact.utm_source}}` | |
| UTM Campaign | `{{contact.utm_campaign}}` | |
| UTM Content | `{{contact.utm_content}}` | this is the ad name |
| Facebook Click ID | `{{contact.facebook_click_id}}` | |
| Landing Page | `{{contact.landing_page}}` | |
| Postal code | `{{contact.postal_code}}` | standard field |

**Two formatting problems to know about**

The range fields are numeric, so `{{contact.planning_range_low}}` renders as `6500`. In the copy below I write `${{contact.planning_range_low}}` so it at least reads as money. It will still say `$6500` not `$6,500`. Fine for now, worth fixing in code later.

Layout and scope come through as slugs, so an owner alert reads `wall-to-wall / shower-floor`. Readable, but the code already has human labels in `LAYOUT_LABEL` and `SCOPE_LABEL`. Sending those instead is a two line change and makes every alert and every message better.

**Pipeline**
`Main Pipeline` id `o4y21VMkOnoU1iPoRRXZ`, stage `New Lead` id `2aee1dde-71a8-4908-93af-b8e56cb1574d`.

---

# Workflow 1
## `T2S | 01 Estimate Lead | Alert + Speed to Lead`

This is the one that makes the money. Your vault's number: same ads, same spend, moving first contact from 14 hours to under 5 minutes took cost per sold job from $2,247 to $899.

**Trigger:** Contact Tag, tag is `estimate-request`
**Settings:** allow re-entry OFF. Stop on response ON.

### Steps

**1. Create Opportunity**
Pipeline `Main Pipeline`, stage `New Lead`, name `T2S {{contact.first_name}} {{contact.last_name}} {{contact.project_scope}}`, value `{{contact.planning_range_low}}`, source `Meta tub to shower`.

**2. Internal Notification, immediately** (SMS and email, to you and Byron)

```
NEW TUB TO SHOWER LEAD

{{contact.first_name}} {{contact.last_name}}
{{contact.phone}}
ZIP {{contact.postal_code}}
Language: {{contact.tags}}

Layout: {{contact.bathroom_layout}}
Scope: {{contact.project_scope}}
Range: ${{contact.planning_range_low}} to ${{contact.planning_range_high}}

Ad: {{contact.utm_content}}
Source: {{contact.lead_source_detail}}

CALL WITHIN 5 MINUTES.
```

**3. If / Else: language**
Condition: Contact tag is `lang-es`.

**4a. Spanish branch, SMS, no wait**
```
Hola {{contact.first_name}}, le habla Omar de Broke & Fixed. Acabo de recibir su solicitud para cambiar la bañera por ducha. Su rango es de ${{contact.planning_range_low}} a ${{contact.planning_range_high}}. Le llamo en unos minutos. Si ahora no le queda bien, mándeme por texto una mejor hora.
```

**4b. English branch, SMS, no wait**
```
Hi {{contact.first_name}}, this is Omar with Broke & Fixed. Just got your tub to shower request. Your range is ${{contact.planning_range_low}} to ${{contact.planning_range_high}}. I'll call you in a few minutes. If now is bad, text me a better time and I'll work around it.
```

**5. Create Task**
Title `Call {{contact.first_name}} {{contact.last_name}} - 5 min SLA`, assigned to Omar, due now, description carries the same block as step 2.

**6. Wait 15 minutes**

**7. If / Else:** has an outbound call been logged?
No, send internal notification to Byron: `15 min, no contact on {{contact.first_name}} {{contact.phone}}. Taking over?`

**8. Wait 15 more minutes** (30 total)
No contact yet, notify both again, marked urgent.

**9. Wait until 1 hour after entry**

**10. Second SMS, language branched**

English:
```
{{contact.first_name}}, tried you earlier. Still want the walk-through on your bathroom? Reply with a time that works and I'll call then. If you changed your mind that's fine too, just say so and I'll stop.
```

Spanish:
```
{{contact.first_name}}, lo llamé hace un rato. ¿Todavía quiere que revisemos su baño? Contésteme con una hora que le sirva y lo llamo. Si cambió de idea no hay problema, solo dígamelo y no lo molesto más.
```

**11. Wait until 9am next business day**

**12. Email, language branched**

English, subject `Your tub to shower range, {{contact.first_name}}`
```
{{contact.first_name}},

Based on what you told us, a {{contact.project_scope}} in a bathroom like yours lands between ${{contact.planning_range_low}} and ${{contact.planning_range_high}}.

That is a planning range, not a quote. The only way to get a firm number is for one of us to stand in the bathroom for fifteen minutes. That visit is free and there is no salesman, it is me or my brother.

Three things that move the number either direction:
1. Whether the drain and valve stay where they are. If they do, the job is simpler and usually permit free.
2. What is behind the wall. We do not know until we open it.
3. Tile choice. The spread between builder grade and something you actually like is smaller than most people expect.

Reply to this email or call 786-363-7039 and we will find a time.

Omar
Broke & Fixed Home Solutions
Fully insured, family owned, Miami-Dade
```

Spanish, subject `Su rango para la ducha, {{contact.first_name}}`
```
{{contact.first_name}},

Por lo que nos contó, un trabajo de {{contact.project_scope}} en un baño como el suyo queda entre ${{contact.planning_range_low}} y ${{contact.planning_range_high}}.

Eso es un rango para planificar, no una cotización. La única forma de darle un número firme es que uno de nosotros esté quince minutos parado en su baño. Esa visita es gratis y no va ningún vendedor, voy yo o va mi hermano.

Tres cosas que mueven el número para arriba o para abajo:
1. Si el desagüe y la válvula se quedan donde están. Si se quedan, el trabajo es más sencillo y por lo general no necesita permiso.
2. Lo que hay detrás de la pared. Eso no se sabe hasta abrirla.
3. El porcelanato que escoja. La diferencia entre lo básico y algo que de verdad le guste es menor de lo que la gente piensa.

Conteste este correo o llame al 786-363-7039 y buscamos una hora.

Omar
Broke & Fixed Home Solutions
Empresa familiar y totalmente asegurada en Miami-Dade
```

**13. Wait 2 days, then add tag `t2s-no-contact` and move into Workflow 3.**

### Exit conditions
Remove from this workflow when: appointment booked, contact replies to SMS, opportunity moves past New Lead, or contact unsubscribes.

---

# Workflow 2
## `T2S | 02 Planning Guide Delivery`

**Trigger:** Contact Tag, tag is `planning-guide-lead`
**Settings:** allow re-entry OFF.

### Steps

**1. If / Else:** Contact tag is `lang-es`.

**2a. Spanish, Email, no wait**
Subject: `Su guía de bañera a ducha`
```
Aquí está su guía, sin vueltas:
https://brokeandfixed.com/guides/tub-to-shower-planning-guide-es.pdf

Adentro está lo que casi nadie le dice antes de empezar: cuándo hace falta permiso y cuándo no, la diferencia real entre un forro de un día y una ducha construida de verdad, y en qué se le va el dinero.

Cuando quiera su número, son dos preguntas:
https://brokeandfixed.com/es/landing/tub-to-shower

Omar
Broke & Fixed Home Solutions
786-363-7039
```

**2b. English, Email, no wait**
Subject: `Your tub to shower planning guide`
```
Here is the guide, no runaround:
https://brokeandfixed.com/guides/tub-to-shower-planning-guide-en.pdf

Inside is the stuff nobody tells you before you start: when a permit is actually required and when it is not, the real difference between a one day liner and a shower that is built, and where the money actually goes.

When you want your number, it is two questions:
https://brokeandfixed.com/en/landing/tub-to-shower

Omar
Broke & Fixed Home Solutions
786-363-7039
```

**3. Wait 2 days**

**4. Email 2, language branched**

English, subject `The three questions to ask whoever quotes your bathroom`
```
{{contact.first_name}},

If you get a few quotes on this, ask all of them the same three questions. The answers will tell you more than the price will.

1. Are you taking the old wall out, or covering it?
   Covering it is faster and cheaper. It also means whatever is behind that wall is still behind that wall.

2. What is the waterproofing?
   You want a real membrane, not just thinset and hope. Ask them to name the product.

3. Who is actually on site?
   Some outfits sell the job and hand it to whoever is available that week. On ours, one of the owners is there.

If it helps, our two question estimator will tell you the range for your specific bathroom:
https://brokeandfixed.com/en/landing/tub-to-shower

Omar
```

Spanish, subject `Las tres preguntas que hay que hacerle a quien le cotice el baño`
```
{{contact.first_name}},

Si va a pedir varias cotizaciones, hágales las mismas tres preguntas a todos. Las respuestas le dicen más que el precio.

1. ¿Van a quitar la pared vieja o la van a tapar?
   Taparla es más rápido y más barato. También significa que lo que está detrás de esa pared se queda ahí.

2. ¿Cómo impermeabilizan?
   Usted quiere una membrana de verdad, no solamente pega y suerte. Pídales el nombre del producto.

3. ¿Quién va a estar en su casa?
   Hay empresas que venden el trabajo y se lo pasan a quien esté disponible esa semana. En los nuestros está uno de los dueños.

Si le sirve, nuestro estimador de dos preguntas le da el rango de su baño:
https://brokeandfixed.com/es/landing/tub-to-shower

Omar
```

**5. Wait 4 days, then move into Workflow 4.**

### Exit conditions
Remove when the contact gets `estimate-request`, replies, books, or unsubscribes.

---

# Workflow 3
## `T2S | 03 Estimate Nurture`

For estimator leads you could not reach. Your vault: 93 percent of converted leads are reached by the sixth call. The SLA to hold is **6 call attempts and 5 emails over 14 days** before you mark it dead.

**Trigger:** Contact Tag, tag is `t2s-no-contact`

Structure, language branched throughout:

| Day | Action |
|---|---|
| 2 | Call task 2. SMS: "Tried you a couple times. Want me to just text you the range and leave it there?" |
| 3 | Email: one before and after from a job in their ZIP or the closest one you have |
| 5 | Call task 3 |
| 7 | Email: the permit question answered plainly, since that is what most people are quietly worried about |
| 9 | Call task 4. SMS |
| 11 | Email: what a week of the job actually looks like, day by day |
| 14 | Call task 5. Email: "Should I close this out?" |
| 21 | Call task 6, final. Tag `t2s-cold`, move opportunity to Lost, drop into long term nurture |

Do not delete cold leads. Your vault is explicit: recycle them into a lower frequency nurture. A bathroom is a 180 day decision. Someone who ignores you in August is a real lead in December.

Content notes per email:

- **Day 3, proof:** one job, one before, one after, the neighborhood name, the tier they picked and what it cost. Nothing else. Short.
- **Day 7, permits:** say the true thing. If the drain, valve and fixture locations do not move and there is no electrical work, most of these are cosmetic. If they do move, it needs a permit and you handle it. Decide it at the estimate, do not promise either way in writing.
- **Day 11, the week:** Monday demo, Tuesday backer and waterproofing, Wednesday and Thursday tile, Friday grout and glass measure, following week glass and finish. People are more afraid of the disruption than the price.

---

# Workflow 4
## `T2S | 04 Guide to Estimate`

Guide readers who never ran the estimator. Lower intent, slower cadence, email only since you never got a phone number.

**Trigger:** Contact Tag `planning-guide-lead` AND does not have tag `estimate-request`

| Day | Email |
|---|---|
| 6 | Case study. One bathroom, the real number, the real timeline. |
| 10 | Cost breakdown. Where the money goes in a $6,500 job: demo, waterproofing, tile, labor, glass. People trust a number they can see inside of. |
| 14 | Objection. "Is a walk-in shower going to hurt resale if I take out my only tub?" Answer honestly: if it is the only tub in the house, that is a real consideration, and here is how we usually handle it. |
| 19 | Direct ask. Two questions, get your range, link. |
| 30 | Re-engagement. "Still thinking about the bathroom, or should I stop emailing?" |

Exit the moment they get `estimate-request`.

---

## Build order and how to test

1. Sending on: phone number, LC Email, A2P registration started.
2. Audit the 22 existing workflows for trigger overlap.
3. Build Workflow 1. Leave it in draft.
4. Build Workflow 2. Draft.
5. Build 3 and 4. Draft.
6. Submit a real estimator form in English from a phone. Confirm the contact lands with all 14 fields and the right tags, and that `Lead` shows in Events Manager.
7. Same in Spanish. Confirm `lang-es` and that the Spanish branch is the one that fires.
8. Publish 1 and 2. Watch the first three real leads by hand before you trust it.
9. Publish 3 and 4.
10. Delete the test contacts.

## One number to track from day one

Time from form submission to first human contact. Log it manually for the first month if you have to. It is the highest leverage number in this entire build, and it is the only one that is completely inside your control.
