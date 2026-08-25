# T2S Campaign, Email Phase
Sub-account `Broke and Fixed Home Solutions` | location `BubbBDEstaWhTJReHDcG`
Written 2026-08-25. Supersedes the SMS-dependent parts of `t2s-03-ghl-workflows.md`
until Twilio A2P 10DLC is approved. Everything else in `03` still stands.

---

## The one decision this document makes

`t2s-03` was built around a text message that goes out inside five minutes. That is
the mechanism that makes the money, and Twilio has not approved the campaign yet, so
it is gone.

The wrong conclusion is "so we run an email campaign." The right one is this: **the
estimator already captures a phone number, and calling it costs nothing and needs
nobody's approval.** The vault number is unambiguous. Responding in under five minutes
converts about eight times better than responding late, and a lead answered after
twenty four hours is functionally dead. Same ads, same spend, moving first contact from
fourteen hours to under five minutes took cost per sold job from $2,247 to $899.

So the phase we are in is **email plus a human dialing the phone**, not email alone.

| Job | Who does it now | Who does it after Twilio |
|---|---|---|
| Acknowledge instantly, so the lead knows they are not in a void | Automated email | SMS, with the email as backup |
| Get a human on the phone inside five minutes | Internal alert email + a task | Same, unchanged |
| Follow up when nobody answers | Email, on a schedule | Email and SMS together |
| Deliver the lead magnet | Email | Email |

Everything below is written so the SMS steps can be switched on later without
rewriting a single email. The SMS copy is written and parked in section 7. Do not
build those steps yet.

---

## 0. Voice, and the thing about the visit

Two rules that override anything written elsewhere in this file.

**Write it casual.** These read as one person typing to another person, not a company
issuing a communication. Contractions. Short sentences. Say "you're looking at" instead
of "your planning range is." A question on its own line is fine. Homeowners answer
people, they ignore brands. Do not tidy this into corporate voice on a later pass.

**Sign it `Omar Casilla`.** Full name, every email. Then `Broke & Fixed` on the next
line, and that is the whole signature. A first name alone reads like a mail merge; the
full name reads like somebody who will actually pick up.

### The visit is not a measuring appointment

This was wrong in earlier drafts and it matters, because it is the single strongest
thing this business offers and it was being described as a tape measure.

What actually happens in those fifteen minutes:

1. You tell us what you have in mind.
2. We design it **right there, on the spot**, so you can see it before deciding anything.
3. The final quote comes off **that design**, and it stays inside the range already given.

So the promise is not "we will come measure and get back to you." It is "you will see
your bathroom before you commit, and the price will not move outside the range." Almost
nobody in this trade does that. Every email that mentions the visit should say it.

Wrong: *"The only way to get a firm number is for one of us to stand in the bathroom
for fifteen minutes."*

Right: *"It's not just measuring. Tell us what you've got in mind and we'll put a design
together right there, on the spot, so you can actually see it before you decide
anything. Your final quote comes off that design, and it stays inside the range you
just got."*

---

## 1. What already exists and works

Verified against the live account and the repo, 2026-08-25.

- **Sending domain**: `send.brokeandfixed.com`, verified, SSL issued, warmup stage 1,
  1000 emails/day. From identity `Broke & Fixed Home Solutions <quotes@brokeandfixed.com>`.
- **Replies**: `quotes@` is an alias on `admin@brokeandfixed.com`, so replies land in a
  monitored inbox. Reply-to needs no special configuration.
- **Lead magnet**: both PDFs exist and are served.
  `public/guides/tub-to-shower-planning-guide-en.pdf` and `-es.pdf`.
- **Tags**: `estimate-request`, `planning-guide-lead`, `guide-inline`,
  `guide-exit-intent`, `lang-en`, `lang-es`, `facebook ads lead` all exist in the
  account and are applied correctly by `app/api/lead/route.ts`.
- **The tag collision is already fixed.** Guide opt-ins no longer receive
  `tub-to-shower-lead`. `t2s-03` warns about this as an open bug; it is closed.
- **Pipeline**: `Main Pipeline` `o4y21VMkOnoU1iPoRRXZ`, stage `New Lead`
  `2aee1dde-71a8-4908-93af-b8e56cb1574d`.

### What does not exist yet

- None of the four `T2S | ...` workflows. The 23 workflows in the account are a
  generic template pack, not this campaign.
- No email templates for this campaign.

---

## 2. The blocking check before anything is published

**Do this first. It is the only thing here that can actively damage a real lead.**

`1.1 New Lead (Day 1)` is **published** and contains an `email` step and an `sms` step.
`2.1 New Lead Alert` is **published**. Their step graphs are readable but their
triggers are not exposed through any API, documented or internal.

If either triggers on "contact created" rather than a specific tag, then every single
tub to shower lead gets the generic sequence on top of this one. The homeowner
receives two different emails from the same company within a minute of each other,
saying different things. That is worse than sending nothing.

Open both in Automation, read the trigger card, and confirm one of these:

- The trigger is a specific tag that this campaign never applies, or
- You add a filter excluding `estimate-request` and `planning-guide-lead`.

Until that is confirmed, every workflow below stays in draft.

---

## 3. Workflow 1: `T2S | 01 Estimate Lead | Speed to Lead`

**Trigger:** Contact Tag, tag is `estimate-request`
**Settings:** allow re-entry OFF. Stop on response ON.

| # | Step | Detail |
|---|---|---|
| 1 | Create Opportunity | `Main Pipeline` / `New Lead`, name `T2S {{contact.first_name}} {{contact.last_name}} {{contact.project_scope}}`, value `{{contact.planning_range_low}}`, source `Meta tub to shower` |
| 2 | Internal notification, **email** | To Omar and Byron. Body in 3.1 |
| 3 | Create Task | `Call {{contact.first_name}} {{contact.last_name}} - 5 min SLA`, assigned Omar, due now |
| 4 | If/Else | Contact tag is `lang-es` |
| 5 | Email, no wait | `T2S-01 Instant Ack` EN or ES. This is the SMS replacement. Copy in 3.2 |
| 6 | Wait 15 minutes | |
| 7 | If/Else | Outbound call logged? If no, internal email to Byron: `15 min, no contact on {{contact.first_name}} {{contact.phone}}. Taking over?` |
| 8 | Wait to 1 hour after entry | |
| 9 | Email | `T2S-01 One Hour` EN or ES. Copy in 3.3 |
| 10 | Wait until 9am next business day | |
| 11 | Email | `T2S-01 Your Range` EN or ES. Copy in 3.4 |
| 12 | Wait 2 days | Add tag `t2s-no-contact`, enter Workflow 3 |

**Exit:** appointment booked, contact replies, opportunity past New Lead, unsubscribe.

### 3.1 Internal alert, email

Subject: `NEW T2S LEAD - {{contact.first_name}} {{contact.last_name}} - CALL NOW`

```
NEW TUB TO SHOWER LEAD

{{contact.first_name}} {{contact.last_name}}
{{contact.phone}}
ZIP {{contact.postal_code}}

Layout: {{contact.bathroom_layout}}
Scope: {{contact.project_scope}}
Range: ${{contact.planning_range_low}} to ${{contact.planning_range_high}}

Ad: {{contact.utm_content}}
Source: {{contact.lead_source_detail}}

CALL WITHIN 5 MINUTES.
```

### 3.2 Instant acknowledgment, sent immediately

This email is doing the job the text message used to do. It has one purpose: tell them
a real person is about to call, so that when the phone rings they pick it up. It is
short on purpose. Do not add a header image, do not add a footer full of links.

**English.** Subject: `Got your bathroom request, {{contact.first_name}}`
Preview: `I'm calling you in the next few minutes.`

```
{{contact.first_name}},

Got your tub to shower request. Based on your answers, your planning range is
${{contact.planning_range_low}} to ${{contact.planning_range_high}}.

I'm going to call you in the next few minutes from 786-363-7039. Save that number so
you know it's me and not a spam call.

If right now is a bad time, just reply to this email with a better one and I'll work
around your schedule.

Omar Casilla
Broke & Fixed Home Solutions
Family owned, fully insured, Miami-Dade
```

**Spanish.** Subject: `Recibí su solicitud, {{contact.first_name}}`
Preview: `Lo llamo en unos minutos.`

```
{{contact.first_name}},

Recibí su solicitud para cambiar la bañera por ducha. Por sus respuestas, su rango
para planificar es de ${{contact.planning_range_low}} a ${{contact.planning_range_high}}.

Lo voy a llamar en unos minutos desde el 786-363-7039. Guarde ese número para que sepa
que soy yo y no una llamada de spam.

Si ahora no le queda bien, conteste este correo con una mejor hora y me acomodo a
su horario.

Omar Casilla
Broke & Fixed Home Solutions
Empresa familiar y totalmente asegurada, Miami-Dade
```

### 3.3 One hour later, no contact

**English.** Subject: `Tried calling, {{contact.first_name}}`
Preview: `Reply with a time and I'll call then.`

```
{{contact.first_name}},

I tried you a little while ago and didn't catch you. That's normal, everyone is busy.

Still want the walk-through on your bathroom? Reply with a time that works and I'll
call you then. Mornings, evenings, weekends, it doesn't matter to me.

And when we come out it's not just measuring. You tell us what you're picturing and
we'll design it right there so you can see it before you commit to anything.

Changed your mind? No problem, just say so and I'll leave you alone.

Omar Casilla
786-363-7039
```

**Spanish.** Subject: `Lo llamé, {{contact.first_name}}`
Preview: `Contésteme con una hora y lo llamo.`

```
{{contact.first_name}},

Lo llamé hace un rato y no lo alcancé. Es normal, todo el mundo está ocupado.

¿Todavía quiere que revisemos su baño? Contésteme con una hora que le sirva y lo llamo
a esa hora. En la mañana, en la tarde, el fin de semana, a mí me da igual.

Y cuando vamos no es solo tomar medidas. Usted nos dice lo que se está imaginando y se
lo diseñamos ahí mismo para que lo vea antes de comprometerse a nada.

¿Cambió de idea? No hay problema, dígamelo y no lo molesto más.

Omar Casilla
786-363-7039
```

### 3.4 Next business day, the range email

Unchanged from `t2s-03`, which got this one right. Reproduced so this document is
self-contained.

**English.** Subject: `Your tub to shower range, {{contact.first_name}}`

```
{{contact.first_name}},

From what you told us, a {{contact.project_scope}} in a bathroom like yours usually runs
${{contact.planning_range_low}} to ${{contact.planning_range_high}}.

That's a planning range, not your final number. To get you the real one, one of us comes
out and spends about fifteen minutes in the bathroom with you.

And it's not just measuring. Tell us what you've got in mind and we'll put a design
together right there, on the spot, so you can actually see it before you decide
anything. Your final quote comes off that design, and it stays inside the range you
just got.

It's free, and nobody's going to sell you anything. It's me or my brother, that's it.

Three things that push the number one way or the other:

1. Whether the drain and valve stay put. If they do, it's a simpler job and usually no permit.
2. What's behind the wall. Nobody knows until we open it.
3. Tile. The jump from builder grade to something you actually like is smaller than people think.

Just hit reply, or call me at 786-363-7039.

Omar Casilla
Broke & Fixed
Family owned, fully insured, Miami-Dade
```

**Spanish.** Subject: `Su rango para la ducha, {{contact.first_name}}`

```
{{contact.first_name}},

Por lo que nos contó, un trabajo de {{contact.project_scope}} en un baño como el suyo
normalmente sale entre ${{contact.planning_range_low}} y ${{contact.planning_range_high}}.

Ese es un rango para planificar, no su número final. Para darle el de verdad, uno de
nosotros pasa por su casa y se queda unos quince minutos en el baño con usted.

Y no es solo ir a tomar medidas. Usted nos dice lo que tiene en mente y le armamos un
diseño ahí mismo, en el lugar, para que lo vea antes de decidir nada. La cotización
final sale de ese diseño, y queda dentro del rango que le acabamos de dar.

Es gratis y nadie le va a vender nada. Voy yo o va mi hermano, nada más.

Tres cosas que mueven el número para un lado o para el otro:

1. Si el desagüe y la válvula se quedan donde están. Si se quedan, es un trabajo más
   sencillo y por lo general sin permiso.
2. Lo que hay detrás de la pared. Nadie sabe hasta abrirla.
3. El porcelanato. La diferencia entre lo básico y algo que de verdad le guste es menor
   de lo que la gente piensa.

Conteste este correo, o llámeme al 786-363-7039.

Omar Casilla
Broke & Fixed
Empresa familiar y totalmente asegurada, Miami-Dade
```

---

## 4. Workflow 2: `T2S | 02 Planning Guide Delivery`

**Trigger:** Contact Tag, tag is `planning-guide-lead`
**Settings:** allow re-entry OFF.

Already email only in `t2s-03`, so it ships as written there. Two steps:

| # | Step | Detail |
|---|---|---|
| 1 | If/Else | Contact tag is `lang-es` |
| 2 | Email, no wait | `T2S-02 Guide Delivery` EN or ES |
| 3 | Wait 2 days | |
| 4 | Email | `T2S-02 Three Questions` EN or ES |
| 5 | Wait 4 days | Enter Workflow 4 |

**Exit:** contact gets `estimate-request`, replies, books, or unsubscribes.

One change from `t2s-03`: send the guide email **immediately**, with no delay and no
branching wait in front of it. Somebody who just typed their email address to get a PDF
is waiting on that PDF right now. Every minute between the click and the delivery is a
minute they spend deciding you are disorganized.

Copy for both emails is in `t2s-03` sections Workflow 2 steps 2a/2b and step 4. It is
good as written. Do not rewrite it.

---

## 5. Workflow 3: `T2S | 03 Estimate Nurture`

For estimator leads nobody could reach. The vault number to hold: **93 percent of
converted leads are reached by the sixth call.** The SLA is six call attempts and five
emails across fourteen days before anyone marks it dead.

**Trigger:** Contact Tag, tag is `t2s-no-contact`

Call steps are **tasks**, not automated dials, so they work today with no Twilio.

| Day | Action |
|---|---|
| 2 | Call task 2 |
| 3 | Email: proof. Section 5.1 |
| 5 | Call task 3 |
| 7 | Email: permits. Section 5.2 |
| 9 | Call task 4 |
| 11 | Email: what the week looks like. Section 5.3 |
| 14 | Call task 5. Email: close it out. Section 5.4 |
| 21 | Call task 6, final. Tag `t2s-cold`, opportunity to Lost, drop into long term nurture |

**Do not delete cold leads.** A bathroom is a 180 day decision. Somebody who ignores
you in August is a real lead in December.

### 5.1 Day 3, proof

One job, one before, one after, the neighborhood, the tier they picked, what it cost.
Nothing else. Swap the details for a real job in or near their ZIP before sending.

**English.** Subject: `A bathroom we did in Kendall`

```
{{contact.first_name}},

Rather than tell you we do good work, here is one.

Kendall, wall to wall tub, same layout most of these houses have. The owner wanted the
tub gone because her mother was having trouble stepping over it.

Demo Monday, tile by Thursday, glass the following week. Drain and valve stayed put so
there was no permit. Porcelain that looks like stone, low threshold, one grab bar that
does not look like a grab bar.

$7,400 all in.

Before and after are on our Instagram if you want to see them:
https://www.instagram.com/brokeandfixed/

Yours is probably not identical. It is close enough to be useful.

Omar Casilla
786-363-7039
```

**Spanish.** Subject: `Un baño que hicimos en Kendall`

```
{{contact.first_name}},

En vez de decirle que hacemos buen trabajo, aquí le muestro uno.

Kendall, bañera de pared a pared, el mismo diseño que tienen casi todas esas casas.
La señora quería quitar la bañera porque su mamá tenía problemas para pasarle por
encima.

Demolición el lunes, porcelanato el jueves, el vidrio la semana siguiente. El desagüe y
la válvula se quedaron donde estaban, así que no hizo falta permiso. Porcelanato que
parece piedra, entrada baja, y una barra de apoyo que no parece barra de hospital.

$7,400 todo incluido.

Las fotos de antes y después están en nuestro Instagram si las quiere ver:
https://www.instagram.com/brokeandfixed/

El suyo probablemente no es idéntico. Se parece lo suficiente para que le sirva.

Omar Casilla
786-363-7039
```

### 5.2 Day 7, the permit question

This is what people are quietly worried about. Say the true thing and do not promise
either way in writing.

**English.** Subject: `Do you need a permit for this?`

```
{{contact.first_name}},

Most people wonder this and almost nobody asks it out loud, so here is the honest
answer.

If the drain, the valve and the fixture locations do not move, and there is no
electrical work, a tub to shower conversion is usually cosmetic. Most of those do not
need a permit.

If any of that moves, it needs one. We pull it and we handle the inspection. It adds
time, not drama.

Which one yours is gets decided standing in the bathroom, not over email. Anyone who
tells you "no permit needed" before they have seen it is guessing, and anyone who tells
you it always needs one is padding the invoice.

Fifteen minutes and we will know.

Omar Casilla
786-363-7039
```

**Spanish.** Subject: `¿Necesita permiso para esto?`

```
{{contact.first_name}},

Casi todo el mundo se lo pregunta y casi nadie lo dice en voz alta, así que aquí va la
respuesta honesta.

Si el desagüe, la válvula y las llaves se quedan donde están, y no hay trabajo
eléctrico, cambiar la bañera por ducha por lo general es cosmético. La mayoría de esos
no necesitan permiso.

Si algo de eso se mueve, sí lo necesita. Nosotros lo sacamos y nos encargamos de la
inspección. Suma tiempo, no problemas.

Cuál de los dos es el suyo se decide parado en el baño, no por correo. El que le diga
"no necesita permiso" sin haberlo visto está adivinando, y el que le diga que siempre
hace falta le está inflando la factura.

Quince minutos y lo sabemos.

Omar Casilla
786-363-7039
```

### 5.3 Day 11, what the week actually looks like

People are more afraid of the disruption than the price. Answer the fear nobody says.

**English.** Subject: `What the week actually looks like`

```
{{contact.first_name}},

The question behind the question is usually "how long am I going to be living in a
construction site." Here is the real schedule.

Monday: demo. Loud, dusty, done by the afternoon. We tape off the hallway.
Tuesday: backer board and waterproofing. Quiet day.
Wednesday and Thursday: tile.
Friday: grout, and we measure for the glass.
Following week: glass goes in, fixtures, finish.

You lose that bathroom for about a week. If it is the only one in the house we talk
about that up front and plan around it.

We clean up daily. Not "contractor clean," actually clean, because one of the owners is
the person standing there.

Omar Casilla
786-363-7039
```

**Spanish.** Subject: `Cómo es la semana de verdad`

```
{{contact.first_name}},

La pregunta detrás de la pregunta casi siempre es "cuánto tiempo voy a estar viviendo
en una obra." Este es el horario real.

Lunes: demolición. Ruidoso, con polvo, listo por la tarde. Tapamos el pasillo.
Martes: tabla de respaldo e impermeabilización. Día tranquilo.
Miércoles y jueves: porcelanato.
Viernes: lechada, y medimos para el vidrio.
La semana siguiente: entra el vidrio, las llaves, los acabados.

Pierde ese baño por más o menos una semana. Si es el único de la casa lo hablamos desde
el principio y planificamos alrededor de eso.

Limpiamos todos los días. Limpio de verdad, porque el que está parado ahí es uno de los
dueños.

Omar Casilla
786-363-7039
```

### 5.4 Day 14, close it out

The permission-to-close email. It works because it is genuinely easy to say no to, and
because a real answer either way is more useful than silence.

**English.** Subject: `Should I close this out?`

```
{{contact.first_name}},

I have reached out a few times about your bathroom and haven't heard back, which
usually means one of three things.

You went with somebody else. Totally fine, I hope it goes well.
The timing moved. Also fine, tell me roughly when and I'll check back then.
You are not interested anymore. Fine as well.

Reply with 1, 2 or 3 and I will do the right thing with it. If I don't hear anything
I'll close the file and stop emailing you.

No hard feelings either way.

Omar Casilla
786-363-7039
```

**Spanish.** Subject: `¿Cierro esto?`

```
{{contact.first_name}},

Le he escrito varias veces sobre su baño y no he sabido nada, que por lo general
significa una de tres cosas.

Se fue con otra empresa. Está bien, ojalá le salga bien.
Se le movió la fecha. También está bien, dígame más o menos cuándo y lo busco entonces.
Ya no le interesa. También está bien.

Contésteme con 1, 2 o 3 y hago lo que corresponda. Si no sé nada, cierro el archivo y
dejo de escribirle.

Sin resentimientos de ninguna forma.

Omar Casilla
786-363-7039
```

---

## 6. Workflow 4: `T2S | 04 Guide to Estimate`

Guide readers who never ran the estimator. Lower intent, slower cadence, email only
because there is no phone number for these people. This is the one place where "email
only" is not a compromise, it is the only channel that exists.

**Trigger:** Contact Tag `planning-guide-lead` AND does not have `estimate-request`

| Day | Email | Subject (EN) |
|---|---|---|
| 6 | Case study | `The bathroom, the number, the timeline` |
| 10 | Cost breakdown | `Where the $6,500 actually goes` |
| 14 | Objection | `Does losing the tub hurt resale?` |
| 19 | Direct ask | `Two questions, and you get your number` |
| 30 | Re-engagement | `Still thinking about it, or should I stop?` |

Exit the moment they get `estimate-request`.

### 6.2 Day 10, the cost breakdown

People trust a number they can see inside of. This is the highest performing email in
the sequence in most trades, because it is the only one that treats the reader like
somebody capable of understanding their own purchase.

**English.** Subject: `Where the $6,500 actually goes`

```
{{contact.first_name}},

Nobody itemizes this, so here it is on a $6,500 tub to shower.

Demo and haul away          $700
Plumbing, valve and drain   $900
Backer board and waterproof $800
Tile and setting material   $1,400
Labor, the tile work        $1,800
Glass and door              $900

The two lines people try to cut are waterproofing and glass. Cut the glass and use a
curtain, that is a real option and it saves real money. Cut the waterproofing and you
will be paying somebody to open that wall again in four years.

The tile line is the one you actually control. Builder grade to something you like is
usually a few hundred dollars, not a few thousand.

Your bathroom is not this bathroom. Two questions and you get your own number:
https://brokeandfixed.com/en/landing/tub-to-shower

Omar Casilla
```

**Spanish.** Subject: `En qué se va de verdad el dinero`

```
{{contact.first_name}},

Nadie desglosa esto, así que aquí está en un trabajo de $6,500.

Demolición y botar escombros   $700
Plomería, válvula y desagüe    $900
Tabla de respaldo e impermeab. $800
Porcelanato y material         $1,400
Mano de obra, la instalación   $1,800
Vidrio y puerta                $900

Las dos líneas que la gente trata de recortar son la impermeabilización y el vidrio.
Quitar el vidrio y poner cortina es una opción real y ahorra dinero real. Recortar la
impermeabilización significa que en cuatro años le va a pagar a alguien para volver a
abrir esa pared.

El porcelanato es la línea que usted sí controla. De lo básico a algo que le guste por
lo general son unos cientos de dólares, no unos miles.

Su baño no es este baño. Dos preguntas y le damos su propio número:
https://brokeandfixed.com/es/landing/tub-to-shower

Omar Casilla
```

### 6.3 Day 14, the objection nobody says out loud

**English.** Subject: `Does losing the tub hurt resale?`

```
{{contact.first_name}},

Straight answer, including the part that is not in our favor.

If it is the only tub in the house and you might sell to a family with small kids, yes,
that is a real consideration. Some buyers want one tub somewhere in the house.

If you have a second bathroom with a tub, it is close to a non-issue, and a well built
walk-in shower in the primary usually helps.

What we normally do: if it is the only tub, we look at whether the second bathroom can
take a tub instead, or we build the shower with a low threshold and a bench so it reads
as an upgrade rather than a subtraction.

We are not going to tell you it never matters. It sometimes matters, and it is worth
fifteen minutes to figure out which one you are.

Omar Casilla
786-363-7039
```

**Spanish.** Subject: `¿Perder la bañera afecta la reventa?`

```
{{contact.first_name}},

Respuesta directa, incluyendo la parte que no nos conviene.

Si es la única bañera de la casa y podría vendérsela a una familia con niños chiquitos,
sí, eso es algo real que considerar. Hay compradores que quieren una bañera en algún
baño de la casa.

Si tiene un segundo baño con bañera, casi no importa, y una ducha bien construida en el
cuarto principal por lo general ayuda.

Lo que hacemos normalmente: si es la única bañera, miramos si el segundo baño puede
llevar una, o construimos la ducha con entrada baja y banco para que se vea como una
mejora y no como algo que le quitaron.

No le vamos a decir que nunca importa. A veces importa, y vale quince minutos averiguar
en cuál de los dos casos está usted.

Omar Casilla
786-363-7039
```

Copy for days 6, 19 and 30 follows the same voice. Day 6 is one job told plainly, same
shape as section 5.1. Day 19 is three sentences and the estimator link, nothing else.
Day 30 is the close-out from section 5.4 with a softer subject.

---

## 7. How the form actually starts the automation

This is the part that is easy to get wrong, so it is written out fully.

### The connection already exists, and it is not a webhook

`app/api/lead/route.ts` posts to `services.leadconnectorhq.com/contacts/upsert` and
applies tags in the same call:

| Form | Tags applied |
|---|---|
| Estimator, completed | `tub-to-shower-lead`, `estimate-request`, `lang-en\|es`, ad tags |
| Guide opt-in, inline | `planning-guide-lead`, `guide-inline`, `lang-en\|es`, ad tags |
| Guide opt-in, exit popup | `planning-guide-lead`, `guide-exit-intent`, `lang-en\|es`, ad tags |

Every workflow in this document triggers on **Contact Tag**. So the chain is already
complete:

```
form submit -> /api/lead -> contacts/upsert with tag -> tag trigger -> workflow runs
```

Nothing else has to be built for the automation to start on form fill. The tag is the
trigger.

### Why tag beats inbound webhook here

`GHL_INBOUND_WEBHOOK_URL` exists in the code and is currently unset. That is a second,
optional path. It is worth understanding the tradeoff rather than wiring it reflexively.

- **A tag trigger cannot silently break.** The tag is written in the same API call that
  creates the contact. If the contact exists, the tag exists.
- **A webhook URL can rotate.** Rebuild the trigger in GHL and the old URL dies. The
  form keeps returning 200 to the visitor while no automation runs. That failure is
  invisible until somebody notices leads went quiet.
- The webhook's only real advantage is carrying a richer payload than the contact
  record holds. Everything this campaign needs is already on the contact as a custom
  field.

**Recommendation: keep the tag trigger as the one that starts the automation.** If the
webhook gets wired later, it should add a step inside an already running workflow, not
be the thing the campaign depends on to start.

### What must still be done by hand

Workflow triggers cannot be created through any API. The documented API is read only
for workflows, and the internal API's trigger file format is unmapped. The four
workflows and their tag triggers get built in the GHL UI. There is no automation path
around this.

---

## 8. Partial form capture

Right now there is none. `QuoteForm.tsx` submits once, at the end. Somebody who types
their name and ZIP and then closes the tab leaves nothing behind.

This is a real gap and worth building, but it is a code change, not a GHL setting.
Recommended shape, smallest version that works:

1. On blur of the email or phone field, if the value validates, POST a partial lead to
   `/api/lead` with a `partial: true` flag.
2. Tag it `t2s-partial` and **not** `estimate-request`, so it never enters Workflow 1
   and never gets an email claiming a range that was never calculated.
3. A separate short workflow on `t2s-partial`: one email at 20 minutes, one at day 2,
   both saying some version of "you started this and did not finish, want me to just
   finish it for you."
4. When the same contact later completes the estimator, the upsert adds
   `estimate-request`, and the partial workflow's exit condition removes them.

The compliance point that matters: a partial capture is still a person who gave you
their address. It gets the same unsubscribe link and the same suppression rules as
everything else.

---

## 9. SMS copy, written and parked

**Do not build these steps.** No Twilio approval, no phone number. This section exists
so that switching SMS on later is a copy and paste rather than a writing project.

Workflow 1, instant, English:
```
Hi {{contact.first_name}}, this is Omar with Broke & Fixed. Just got your tub to shower
request. Your range is ${{contact.planning_range_low}} to ${{contact.planning_range_high}}.
I'll call you in a few minutes. If now is bad, text me a better time and I'll work around it.
```

Workflow 1, instant, Spanish:
```
Hola {{contact.first_name}}, le habla Omar de Broke & Fixed. Acabo de recibir su
solicitud para cambiar la bañera por ducha. Su rango es de ${{contact.planning_range_low}}
a ${{contact.planning_range_high}}. Le llamo en unos minutos. Si ahora no le queda bien,
mándeme por texto una mejor hora.
```

Workflow 1, one hour, English:
```
{{contact.first_name}}, tried you earlier. Still want the walk-through on your bathroom?
Reply with a time that works and I'll call then. If you changed your mind that's fine
too, just say so and I'll stop.
```

Workflow 1, one hour, Spanish:
```
{{contact.first_name}}, lo llamé hace un rato. ¿Todavía quiere que revisemos su baño?
Contésteme con una hora que le sirva y lo llamo. Si cambió de idea no hay problema,
solo dígamelo y no lo molesto más.
```

When A2P clears: add the SMS step immediately **before** each corresponding email, and
change the email to a fifteen minute delay so the text lands first and the email backs
it up.

---

## 10. Build checklist

Nothing here is optional and the order matters.

### Before building
- [ ] Open `1.1 New Lead (Day 1)`, read the trigger. Confirm it does not fire on any
      new contact, or add a filter excluding `estimate-request` and `planning-guide-lead`
- [ ] Same for `2.1 New Lead Alert`
- [ ] Resolve `Needs review (1)` in the workflow list
- [ ] Delete or rename the stray draft `New Workflow : 1786510524396`

### Build, all four stay in DRAFT
- [ ] Create the email templates
- [ ] Build `T2S | 01 Estimate Lead | Speed to Lead`
- [ ] Build `T2S | 02 Planning Guide Delivery`
- [ ] Build `T2S | 03 Estimate Nurture`
- [ ] Build `T2S | 04 Guide to Estimate`

### Test before publishing
- [ ] Submit a real estimator form in English from a phone. Confirm the contact lands
      with all fields, the right tags, and that `Lead` shows in Events Manager
- [ ] Same in Spanish. Confirm `lang-es` and that the Spanish branch is the one that fires
- [ ] Confirm the instant email arrives from `quotes@brokeandfixed.com` and that a reply
      to it lands in `admin@brokeandfixed.com`
- [ ] Confirm the guide PDF link resolves in both languages
- [ ] Confirm the internal alert reaches both owners

### Publish
- [ ] Publish 1 and 2. Watch the first three real leads by hand before trusting it
- [ ] Publish 3 and 4
- [ ] Delete the test contacts

### Deploy the site side
- [ ] `git push -u origin seo/shower-vanity-redirect` and deploy, or
      `shower.brokeandfixed.com` keeps serving a duplicate of the whole site

---

## 11. The one number

Time from form submission to first human contact. Log it by hand for the first month if
you have to.

It is the highest leverage number in this build and the only one entirely inside your
control. Every email in this document exists to buy time until somebody picks up a
phone. None of them outperform the phone call.
