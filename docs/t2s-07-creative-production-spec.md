# Round One Creative Production Spec
Tub to Shower | Broke & Fixed | Meta, Miami-Dade | Campaign `t2s-miami-202608`

Everything below is paste ready. Copy blocks go into Ads Manager with no editing. Layout specs are written so a designer or an image model can execute without asking a question.

---

## 0. What changed from t2s-02 and t2s-04

Read this before you build anything. Three things in the earlier docs cannot ship as written.

**The round one slate was mostly video. It is now all static.**
`t2s-04` names six ads to build now and four of them are video. Round one is static only. The four *angles* port over intact, and the vault backs the swap rather than merely tolerating it: Static Ads That Beat Video says statics carry the comparison, price and objection angles best, and that "video carries them badly." The two angles that genuinely need video are Authority and Mechanism, which are exactly the two dropped from round one.

**There is no photo of Omar or Byron on disk.**
Every file in `public/images/` was checked. No owner portrait, no truck shot, no job photo with a person in it. The vault's trust stack wants a face. Round one cannot supply one, and the client has confirmed no owner photo in round one.

So round one runs a **partial trust stack**: local marker, insurance stated, third party proof and a concrete next step are all present on every ad, and the face slot is carried by a **named signature block**, "Omar and Byron Casilla, Kendall," set in type. This is a real gap, not a solved problem. The owner face static is the first day 14 asset and the shot list opens with the two frames needed to build it.

**The 20 percent image text rule in t2s-02 is out of date.**
Concept A's brief says "Under 20 percent image text, so the price block has to be tight." Meta retired the 20 percent rule as a hard enforcement gate in 2021. This matters because half of round one is a type led family where the words are the visual, and under the old rule that family would be unbuildable. Text volume still stays low, but for the real reason: feed reading time is about 1.7 seconds, so the rule that binds is one focal point and legibility at thumbnail scale, not a percentage.

**One reporting fix to make.**
This spec uses `utm_medium=paid`, as instructed. `t2s-02` currently specifies `utm_medium=paid-social`. Edit `t2s-02` to `paid` so the two documents agree, otherwise the same campaign reports across two medium values and the GHL `utmContent` field (`ltNuNBtrSgCjuGxcp2H3`) gets attributed under a split source.

---

## 1. Launch conditions

Confirmed with the client:

- **Undeclared for Special Ad Category.** Not Housing, not Credit, not Employment.
- **A $5 per day, 48 hour delivery test runs first**, on ad 1 only, before the real budget. A rejection on a $5 test costs nothing. A rejection after everything is built costs a week.

Two consequences that constrain every line of copy in this document:

**Nothing may read as repair.** Meta's Housing classifier reacts to damage and property framing. Every ad here is written as a remodel or an upgrade. No leaks, no rot, no water damage, no "what is behind your wall," no home value, no resale, no property. The liner comparison ad was the one at risk, since its natural argument is about what a liner hides. It has been rewritten so the argument is construction method, we remove and rebuild versus they bond over. That version is also the stronger ad.

**Nothing may mention financing.** The landing page carries payment methods and financing since commit `70c4b2f`. The page may. The ads may not. Any monthly payment, financing or credit term in ad copy can route the ad set into Meta's Credit special ad category, which strips the targeting the campaign plan depends on. "You pay by milestone, never everything up front" is a payment *schedule*, not credit, and is safe. Keep it that way.

---

## 2. The round one six

Four angles, two creative families, four English and two Spanish. The family sits in the FORMAT slot so the two families sort apart in Ads Manager. HookX refers to the hook bank in `t2s-04`, so hook performance compounds across rounds instead of restarting.

| # | Ad name | Family | Angle | From | Hook | Lang |
|---|---|---|---|---|---|---|
| 1 | `TYPE_PriceAnchor_H18_v1_inhouse` | Type led | Price transparency | Concept A | H18 | EN |
| 2 | `PHOTO_BeforeAfter_H10_v1_inhouse` | Photo led | Pain, transformation | Concept D | H10 | EN |
| 3 | `TYPE_LinerCallout_H5_v1_inhouse` | Type led | Comparison | Concept B | H5 | EN |
| 4 | `PHOTO_Objection_H3_v1_inhouse` | Photo led | Objection handling | new | H3 | EN |
| 5 | `TYPE_PriceAnchor_H18_v1_inhouse-es` | Type led | Price transparency | Concept A | H18 | ES |
| 6 | `PHOTO_BeforeAfter_H10_v1_inhouse-es` | Photo led | Pain, transformation | Concept D | H10 | ES |

Why these four angles. `t2s-04` ranks objection handling first and calls it the whitespace nobody in Miami-Dade home services is running. Comparison is second, the highest CVR static archetype. Pain carries the before and after, which has the highest raw CTR in this vertical. Price transparency comes in fourth because published pricing is the top ranked offer type in home improvement and no competitor does it. Authority is out until there is a face to put in it.

Ad 4 is the only genuinely new copy. The rest audits and sharpens what already existed.

All six run in **one ad set**, per `t2s-01`. Do not split English and Spanish into separate ad sets until daily budget reaches $100.

---

## 3. Build sheets

Every primary text below sits in the 250 to 500 character survival band. The 50 to 250 band is dead and nothing here touches it. Headlines are all at or under 27 characters so they render whole on Feed, well inside Meta's 40 character limit. Descriptions are 21 to 26 characters and frequently will not render on mobile at all.

Primary text truncates at roughly 125 characters behind a "See more" link. The fold is line count driven and varies by device, so treat 125 as the planning number. Each ad below states exactly what survives above it, because that fragment is doing the entire job.

CTA button on all six: **Get Quote**.

---

### Ad 1. `TYPE_PriceAnchor_H18_v1_inhouse`

Type led | Price transparency | Hook H18, price anchor | English
Image: type led composition, base photo `/Users/othmarcasilla/broke-and-fixed-305/public/images/glenvar-after-4.jpeg`

**Primary text** (493 characters, in band)

```
Four thousand five hundred. That is the number, and it does not move after somebody sees your bathroom.

Tub out and a tiled walk-in shower in, from $4,500. Shower and a new floor, from $6,500. The whole bathroom, from $9,500.

Porcelain tile, waterproofed properly, built where your tub sits now. About a week. You pay by milestone, never everything up front.

Two questions on our site gets you the real range. No Saturday sales visit.

Family owned in Kendall. Fully insured. 4.9 on Google.
```

Above the fold: *"Four thousand five hundred. That is the number, and it does not move after somebody sees your bathroom. Tub out and a tiled"*. The whole argument lands before the click. 368 characters hidden.

**Headline:** `Your range in 60 seconds` (24 characters)
**Description:** `Kendall. 4.9 on Google.` (23 characters)

The image carries `FROM $4,500` at 300px, so the headline must not repeat it. It sells the next step instead.

**Destination URL**

```
https://brokeandfixed.com/en/landing/tub-to-shower?utm_source=facebook&utm_medium=paid&utm_campaign=t2s-miami-202608&utm_content=TYPE_PriceAnchor_H18_v1_inhouse
```

---

### Ad 2. `PHOTO_BeforeAfter_H10_v1_inhouse`

Photo led | Pain, transformation | Hook H10, before and after | English
Images: `/Users/othmarcasilla/broke-and-fixed-305/public/images/glenvar-before-3.jpg` and `/Users/othmarcasilla/broke-and-fixed-305/public/images/glenvar-after-1.jpeg`

**Primary text** (495 characters, in band)

```
Left is a Monday in Glenvar Heights. Right is the Friday after next.

Same room, same wall, same window. The tub came out and a tiled walk-in shower went in where it stood. We do not move plumbing, because that turns a clean week into a three week job.

Demo, cement board, waterproofing, a full day for the membrane to cure with nobody in the house, then porcelain, grout, glass.

Standard five foot alcove. Shower and floor, from $6,500.

Two questions on our site tells you where yours lands.
```

Above the fold: *"Left is a Monday in Glenvar Heights. Right is the Friday after next. Same room, same wall, same window. The tub came out and"*. 370 characters hidden.

**Headline:** `Same wall, one week apart` (25 characters)
**Description:** `Glenvar Heights. Real job.` (26 characters)

**Destination URL**

```
https://brokeandfixed.com/en/landing/tub-to-shower?utm_source=facebook&utm_medium=paid&utm_campaign=t2s-miami-202608&utm_content=PHOTO_BeforeAfter_H10_v1_inhouse
```

---

### Ad 3. `TYPE_LinerCallout_H5_v1_inhouse`

Type led | Comparison | Hook H5, contrarian | English
Images: `/Users/othmarcasilla/broke-and-fixed-305/public/landing/tub-to-shower/compare-liner.png` and `/Users/othmarcasilla/broke-and-fixed-305/public/landing/tub-to-shower/compare-rebuild.png`

**Primary text** (493 characters, in band)

```
A one day bathroom is not a remodel. It is an acrylic panel bonded over the wall you already have.

Nothing comes out, so nothing has to cure, and the whole thing goes in between breakfast and dinner. That is the only reason it fits in a day.

We build it the other way. Old wall out to the studs, cement board up, then a pan liner and a membrane that gets a full day to cure before one tile goes on.

About a week instead of a day. Porcelain tile, from $4,500.

One year warranty, in writing.
```

Above the fold: *"A one day bathroom is not a remodel. It is an acrylic panel bonded over the wall you already have. Nothing comes out, so not"*. 368 characters hidden.

**Headline:** `We take the old wall out` (24 characters)
**Description:** `One year, in writing.` (21 characters)

Housing note: this copy makes no claim about what is behind anybody's wall and names no condition in anybody's home. It describes two construction methods. Do not add "rot," "leak," "mold" or "damage" to any variation of this ad.

Never name a franchise brand in the image or the copy. "A one day bathroom" is a category description and is safe. A trademark is not.

**Destination URL**

```
https://brokeandfixed.com/en/landing/tub-to-shower?utm_source=facebook&utm_medium=paid&utm_campaign=t2s-miami-202608&utm_content=TYPE_LinerCallout_H5_v1_inhouse
```

---

### Ad 4. `PHOTO_Objection_H3_v1_inhouse`

Photo led | Objection handling | Hook H3, callout | English
Image: `/Users/othmarcasilla/broke-and-fixed-305/public/images/Killian-tub-to-shower-results.jpeg`

**Primary text** (497 characters, in band)

```
If three people have come to look at your bathroom and you still have a tub, this one is for you.

You know the pattern. One never calls back. One quotes high and vague. One wants a Saturday sit-down in your kitchen before he says a number.

We publish ours. Tub out, walk-in shower in, from $4,500. Shower and floor, from $6,500. Two questions on our site gets you the real range for yours, before anybody is in your house.

An owner is at your house every day of the job. Kendall, fully insured.
```

Above the fold: *"If three people have come to look at your bathroom and you still have a tub, this one is for you. You know the pattern. One"*. 372 characters hidden.

**Headline:** `Still have the tub?` (19 characters)
**Description:** `Published prices. Kendall.` (26 characters)

This is the angle `t2s-04` identifies as whitespace, built from real review language: two flaky quotes, started on the day they said, the price was exactly what they quoted.

**Destination URL**

```
https://brokeandfixed.com/en/landing/tub-to-shower?utm_source=facebook&utm_medium=paid&utm_campaign=t2s-miami-202608&utm_content=PHOTO_Objection_H3_v1_inhouse
```

---

### Ad 5. `TYPE_PriceAnchor_H18_v1_inhouse-es`

Type led | Price transparency | Hook H18 | Spanish
Image: type led composition, base photo `/Users/othmarcasilla/broke-and-fixed-305/public/images/glenvar-after-1.jpeg`

**Primary text** (492 characters, in band)

```
Cuatro mil quinientos. Ese es el número, y no se mueve después de que alguien vea su baño.

Sale la bañera y entra una ducha de porcelanato, desde $4,500. Ducha y piso nuevo, desde $6,500. El baño completo, desde $9,500.

Bien impermeabilizado, construido donde hoy está su bañera. Más o menos una semana. Usted paga por etapa, nunca todo por adelantado.

Dos preguntas en nuestra página y le damos el rango real de su baño.

Empresa familiar en Kendall. Totalmente asegurados. 4.9 en Google.
```

Above the fold: *"Cuatro mil quinientos. Ese es el número, y no se mueve después de que alguien vea su baño. Sale la bañera y entra una ducha"*. 367 characters hidden.

**Headline:** `Su rango en 60 segundos` (23 characters)
**Description:** `Kendall. 4.9 en Google.` (23 characters)

**Destination URL**

```
https://brokeandfixed.com/es/landing/tub-to-shower?utm_source=facebook&utm_medium=paid&utm_campaign=t2s-miami-202608&utm_content=TYPE_PriceAnchor_H18_v1_inhouse-es
```

---

### Ad 6. `PHOTO_BeforeAfter_H10_v1_inhouse-es`

Photo led | Pain, transformation | Hook H10 | Spanish
Images: `glenvar-before-3.jpg` and `glenvar-after-1.jpeg`, stacked layout

**Primary text** (491 characters, in band)

```
La izquierda es un lunes en Glenvar Heights. La derecha es el viernes de la otra semana.

El mismo cuarto, la misma pared, la misma ventana. Salió la bañera y en su lugar entró una ducha de porcelanato. No movemos la plomería, porque eso convierte una semana limpia en un trabajo de tres semanas.

Demolición, placa de cemento, impermeabilización, un día completo de curado sin nadie en la casa, después porcelanato, lechada y cristal.

Baño normal de cinco pies. Ducha y piso, desde $6,500.
```

Above the fold: *"La izquierda es un lunes en Glenvar Heights. La derecha es el viernes de la otra semana. El mismo cuarto, la misma pared, la"*. 366 characters hidden.

**Headline:** `La misma pared, una semana` (26 characters)
**Description:** `Glenvar Heights, Miami.` (23 characters)

Note: the primary text says izquierda and derecha because the Spanish creative uses a **stacked** master where before sits on top. Either change the layout to side by side for Spanish, or change the first line to `Arriba es un lunes en Glenvar Heights. Abajo es el viernes de la otra semana.` **Use the arriba and abajo version with the stacked layout specified in section 5.** The version printed above is here so the side by side option stays available if you flip the layout.

Corrected first line for the stacked master:

```
Arriba es un lunes en Glenvar Heights. Abajo es el viernes de la otra semana.
```

**Destination URL**

```
https://brokeandfixed.com/es/landing/tub-to-shower?utm_source=facebook&utm_medium=paid&utm_campaign=t2s-miami-202608&utm_content=PHOTO_BeforeAfter_H10_v1_inhouse-es
```

---

## 4. Asset audit, measured

Every candidate file was opened and measured. Two problems will bite you if nobody reads this table.

| File | Pixels | Verdict |
|---|---|---|
| `glenvar-after-1.jpeg` | 1500 x 2000 | Hero. Doorway shot, curbless, black hex floor, window anchor, black floating vanity right |
| `glenvar-after-4.jpeg` | 1500 x 2000 | **Best type led base.** Straight on shower, large clean marble wall upper left for an overlay. Not used on the landing page, so no repetition fatigue |
| `glenvar-before-3.jpg` | 768 x 1024 | Before frame. Same doorway, same window, tub and curtain on the left wall. Usable as a 4:5 half frame. **Too small for a 9:16 half frame** |
| `glenvar-before-3-slider.jpg` | **560 x 746** | **Unusable in ads.** Too small at any ad size. Use the full frame |
| `glenvar-before-2.jpg` | 360 x 480 | Unusable |
| `Killian-tub-to-shower-results.jpeg` | 1200 x 1600 | Modest alcove, sliding glass, **low curb, not curbless**, wood look floor. Reads believably as the entry tier |
| `work-the-crossings-conversion.jpeg` | 1536 x 2048 | Green marble, mosaic floor. **Feed distinctive.** Held for the day 14 refresh |
| `work-hammocks-level1-card.jpg` | 1000 x 625 | **Unusable as an ad hero.** It is a tight crop of a niche with nothing else in frame. It works as a landing page card and nowhere else |
| `compare-liner.png` / `compare-rebuild.png` | 1200 x 672 each | Navy isometric illustrations, already on brand. Ad 3 is built from these |
| `tub-to-shower-kendall-concept.png` | 1536 x 1024 | AI concept art. **Excluded from photo led.** PHOTOS.md and the page FAQ both promise every photo is real work |

**Filename trap.** The landing page references `/images/glenvar-after-1.jpg`. The file on disk is `glenvar-after-1.jpeg`. The page works because its `JobPhoto` component resolves extensions. **Ad tooling will not.** Use the `.jpeg` path in every export script and design file.

**Resolution consequence.** Because the only before frame is 768 wide, the before and after ad cannot be a full quality side by side at 9:16. Section 5 specifies a stacked 9:16 instead, which holds the upscale to about 1.4x on a Reels panel rather than 1.9x. This constraint is the entire reason item 1 of the shot list exists.

---

## 5. Type led creative specs

Three ads: 1, 3 and 5. The words are the visual.

**Palette.** Shield Navy `#1E3A5F`. Trade Orange `#F07A1A`. Approval Green `#4CAF50`. Cream `#F8F9FC`. Espresso `#0F1F35`.
**Type.** Barlow Condensed for display, Inter for body, Montserrat for accents and eyebrows.
**Master.** Build 4:5 at 1080 x 1350 first. 9:16 is a relayout, not a crop. 1:1 is a trim.

Safe zones, from Meta's published specs. Feed 4:5: top 14 percent, bottom 20 percent. Stories 9:16: top 250px, bottom 340px. Reels 9:16: top 14 percent, bottom **35 percent**, sides 6 percent. Reels' bottom third is the most aggressive zone Meta publishes and it swallows anything placed there.

---

### Ad 1, `TYPE_PriceAnchor`. The $4,500 hero

**4:5 master, 1080 x 1350**

Layers bottom to top:

1. **Ground.** Solid Shield Navy `#1E3A5F`, y 0 to 1080.
2. **Photo band.** y 1080 to 1350, full width, 270px tall. Source `glenvar-after-4.jpeg` (1500 x 2000). Crop source region x 0 to 1500, y 1450 to 1825, then scale to 1080 x 270. That region is the black hex shower floor and the lower marble wall, which gives a texture band rather than a competing subject. This band deliberately occupies the bottom 20 percent safe zone, where imagery belongs and critical text does not.
3. **Divider.** 6px Trade Orange `#F07A1A` horizontal rule, full width, y 1077 to 1083.
4. **Logo.** Cream lockup, height 70px, top right, right edge at x 992, top edge y 220.
5. **Eyebrow.** `TUB TO SHOWER CONVERSION`. Montserrat Bold, 32px, letter spacing 0.16em, Cream `#F8F9FC` at 65 percent opacity. Left edge x 88, baseline y 268.
6. **Kicker.** `FROM`. Montserrat Bold, 48px, letter spacing 0.20em, Cream 100 percent. Left edge x 88, baseline y 360.
7. **Hero number.** `$4,500`. Barlow Condensed Bold, **300px**, Trade Orange `#F07A1A`. Left edge x 88, baseline y 630. This is the single focal point. Nothing else on the canvas comes within half its size.
8. **Statement.** Two lines, Barlow Condensed SemiBold, 96px, line height 100px, Cream. Left edge x 88, baselines y 760 and y 860.
   Line 1: `Tub out. Tiled walk-in`
   Line 2: `shower in.`
9. **Trust row.** Inter Medium, 32px, Cream at 70 percent. Left edge x 88, baseline y 1000.
   `4.9 on Google · Fully insured · Kendall`
   Separator is a middle dot `·`, never a dash.
10. **Signature block.** Inter SemiBold, 30px, Trade Orange. Left edge x 88, baseline y 1044.
    `Omar and Byron Casilla`

On image word count: 21. Size ratio between the hero number and the next largest element is roughly 3:1, so the eye lands on the price first at any thumbnail size.

**9:16 relayout, 1080 x 1920**

Not a crop. Reels' bottom 35 percent is unusable, so all type moves up into y 269 to 1248.

- Ground navy, y 0 to 1248. Photo band y 1248 to 1920, 672px tall, same source region scaled to 1080 x 672 (use source x 0 to 1500, y 1250 to 2000 for the taller band).
- Orange 6px divider at y 1245 to 1251.
- Logo top right, right edge x 992, top edge y 320.
- Eyebrow baseline y 400. Kicker `FROM` baseline y 500.
- Hero `$4,500` at **300px**, baseline y 770.
- Statement two lines at 96px, baselines y 900 and y 1000.
- Trust row baseline y 1130. Signature baseline y 1180.
- Nothing crosses y 1248. Side margins go to x 88 minimum, which clears Reels' 6 percent side zone (65px).

**1:1 trim, 1080 x 1080**

- Ground navy y 0 to 880. Photo band y 880 to 1080, 200px.
- Eyebrow baseline y 150. Kicker baseline y 236.
- Hero `$4,500` drops to **250px**, baseline y 470.
- Statement drops to 78px, line height 82, baselines y 580 and y 662.
- Trust row 28px, baseline y 780. Signature 28px, baseline y 820.

**What changes between crops:** the hero number holds 300px at 4:5 and 9:16 and drops to 250px only at 1:1. The photo band grows from 270px to 672px at 9:16 because it is absorbing Reels' dead zone. Nothing else is redrawn.

---

### Ad 3, `TYPE_LinerCallout`. The comparison

Built from the two navy isometric illustrations, which already match the palette, so the panels bleed into the ground with no visible seam.

**4:5 master, 1080 x 1350**

Two stacked panels, orange rule between.

1. **Ground.** Shield Navy `#1E3A5F` full bleed.
2. **Top panel, theirs.** `compare-liner.png` (1200 x 672) scaled to 1080 x 605, placed at x 0, y 60. Its navy background matches the ground, so no border is needed.
   - Label: `ONE DAY INSTALL`. Montserrat Bold, 38px, letter spacing 0.14em, Cream at 60 percent. x 70, baseline y 220.
   - Caption: `Acrylic panel bonded over the wall you already have.` Inter Regular, 36px, Cream at 85 percent. x 70, baseline y 620.
3. **Divider.** 8px Trade Orange full width rule, y 668 to 676.
4. **Bottom panel, ours.** `compare-rebuild.png` scaled to 1080 x 605, placed at x 0, y 700.
   - Label: `HOW WE BUILD IT`. Montserrat Bold, 38px, letter spacing 0.14em, **Trade Orange**. x 70, baseline y 800.
   - Caption: `Old wall out. Cement board, membrane, porcelain tile.` Inter Regular, 36px, Cream at 85 percent. x 70, baseline y 1268.
5. **Footer.** Inter Medium, 30px, Cream at 65 percent. x 70, baseline y 1320.
   `From $4,500 · Fully insured · Kendall`

Two focal points here is correct and intentional. The comparison chart archetype is built on a side by side read, and the orange rule tells the eye where the argument turns.

**9:16 relayout, 1080 x 1920**

The two panels get room to breathe and the footer climbs out of the Reels dead zone.

- Top panel at x 0, y 330, scaled 1080 x 605. Label baseline y 300. Caption baseline y 990.
- Orange 8px divider y 1030 to 1038.
- Bottom panel at x 0, y 1060, scaled 1080 x 605. Label baseline y 1150 sits **over** the illustration's upper navy area, which is empty in the source. Caption baseline y 1700 falls inside Reels' bottom 35 percent, so **move the bottom caption up to baseline y 1195**, directly under the label, and let the illustration run clean beneath it.
- Footer moves to baseline y 1240, above the dead zone.
- Everything critical sits between y 269 and y 1248.

**1:1 trim, 1080 x 1080**

- Top panel scaled to 1080 x 470 at y 55. Label baseline y 150, caption baseline y 505.
- Divider y 540 to 548.
- Bottom panel scaled to 1080 x 470 at y 565. Label baseline y 645, caption baseline y 1015.
- Footer baseline y 1055, Inter Medium 26px.

**What changes between crops:** at 9:16 the second caption jumps from the bottom of its panel to directly under its label, because Reels would eat it otherwise. That is the only structural change. At 1:1 both panels compress vertically by about 22 percent and type steps down one size.

---

### Ad 5, `TYPE_PriceAnchor` Spanish

Same skeleton as ad 1, with two deliberate differences. Meta reads near identical creatives as duplicates and suppresses one, so the Spanish version must not be a string swap on the same picture.

**Difference 1, different photo band.** Source `glenvar-after-1.jpeg` instead of `glenvar-after-4.jpeg`. Crop source x 100 to 1400, y 1400 to 1725, scale to 1080 x 270. That is the black hex floor running into the marble floor of the wider room, visually distinct from ad 1's band.

**Difference 2, different statement structure.** Three short lines instead of two longer ones, which changes the block's silhouette.

Spanish strings, in the same slots:

- Eyebrow: `CONVERSIÓN DE BAÑERA A DUCHA`. Montserrat Bold 32px, tracking 0.16em, Cream 65 percent. Note this string is 28 characters against the English 24, so **drop tracking to 0.12em** to hold the same line width at x 88.
- Kicker: `DESDE`. Montserrat Bold, 48px, tracking 0.20em, Cream.
- Hero: `$4,500`. Barlow Condensed Bold, 300px, Trade Orange. Identical.
- Statement, three lines, Barlow Condensed SemiBold, 84px, line height 88px, Cream, baselines y 750, y 838, y 926:
  `Sale la bañera.`
  `Entra una ducha`
  `de porcelanato.`
- Trust row: `4.9 en Google · Totalmente asegurados · Kendall`. Inter Medium **28px** (down from 32px, the string is longer), Cream 70 percent, baseline y 1000.
- Signature: `Omar y Byron Casilla`. Inter SemiBold, 30px, Trade Orange, baseline y 1044.

9:16 and 1:1 follow ad 1's geometry with the statement at three lines and the trust row one step smaller.

**Accent warning.** `CONVERSIÓN`, `BAÑERA` and `porcelanato` carry accents and an eñe. Confirm the Barlow Condensed and Montserrat weights in use include full Latin Extended coverage before export. A missing glyph in the hero line is the kind of thing nobody catches until it is live.

---

## 6. Photo led creative specs

Three ads: 2, 4 and 6. Real completed jobs, no compositing, no generated bathrooms.

---

### Ad 2, `PHOTO_BeforeAfter`. Glenvar Heights

The two source frames were both shot from the doorway of the same bathroom, which is the only reason this ad works. The window in the upper left is the anchor that proves it is one room.

**4:5 master, 1080 x 1350, side by side**

1. **Left panel, before.** Source `glenvar-before-3.jpg` (768 x 1024). Crop source x 60 to 470, y 0 to 1024 (410 x 1024), scale to 540 x 1350. That crop centers the tub, the curtain and the window. **This is a 1.32x upscale.** Bicubic only. Do not run an AI upscaler, which invents grout lines and tile veining that were never there.
2. **Right panel, after.** Source `glenvar-after-1.jpeg` (1500 x 2000). Crop source x 100 to 900, y 0 to 2000 (800 x 2000), scale to 540 x 1350. Downscale, clean. That crop holds the shower, the same window and the black hex floor.
3. **Centre divider.** 8px Trade Orange vertical rule, x 536 to 544, full height.
4. **Interval band.** This is the required interval label and the focal point. Full width, y 620 to 730, Shield Navy at 92 percent opacity, with a 4px Trade Orange rule along its top and bottom edge.
   Text centered, Montserrat Bold, 40px, letter spacing 0.06em, Cream:
   `SAME ROOM. SAME WALL. ONE WEEK APART.`
   Dead centre means it survives every crop.
5. **Panel labels.** Two pills, 190 x 62px, Shield Navy at 88 percent, corner radius 6px. Left pill at x 40, y 762. Right pill at x 580, y 762. Text centered inside, Montserrat Bold 34px, Cream: `BEFORE` and `AFTER`.
6. **Footer strip.** y 1250 to 1350, Shield Navy 100 percent. Text centered, Inter Medium 30px, Cream at 75 percent:
   `Glenvar Heights, Miami-Dade · From $6,500 · 4.9 on Google`
   Sits inside the bottom 20 percent zone on purpose. It is reinforcement, not a claim the ad depends on.

**9:16 relayout, 1080 x 1920, stacked**

Side by side is impossible at 9:16. A 540 wide half panel at 1920 tall needs a 0.28 ratio crop from the before frame, which means a 1.9x upscale on a 768px source. Stack instead.

- **Before panel.** y 270 to 1030, 1080 x 760. Crop source `glenvar-before-3.jpg` x 0 to 768, y 240 to 780 (768 x 540), scale to 1080 x 760. **1.41x upscale**, bicubic.
- **After panel.** y 1038 to 1798, 1080 x 760. Crop source `glenvar-after-1.jpeg` x 0 to 1500, y 480 to 1535 (1500 x 1055), scale to 1080 x 760. Downscale, clean.
- **Interval band** between them, y 1000 to 1068, navy 92 percent with orange rules, same 40px Montserrat Bold text. Sits at the vertical centre and above Reels' 1248 line.
- **Labels** move to the top left corner of each panel: `BEFORE` pill at x 40, y 300; `AFTER` pill at x 40, y 1068.
- **Footer** drops to y 1798 to 1920, inside the Reels dead zone, carrying only the location and rating. Everything load bearing sits between y 270 and y 1248.

**1:1 trim, 1080 x 1080, side by side**

- Panels 540 x 1080 each. Before: crop source x 90 to 440, y 130 to 900 (350 x 770), scale to 540 x 1080, **1.54x upscale**. This is the weakest crop of the set. If any single cut gets dropped for quality, drop this one and let 4:5 and 9:16 carry the ad.
- After: crop source x 150 to 850, y 200 to 1600, scale to 540 x 1080.
- Interval band y 490 to 590, text at 34px.
- Labels at x 40 / x 580, y 620.
- No footer strip. The 1:1 has no room for it.

**What changes between crops:** 4:5 and 1:1 are side by side, 9:16 is stacked. The interval band stays vertically centered in all three, which is why it was placed there rather than at the top.

---

### Ad 4, `PHOTO_Objection`. Killian

**4:5 master, 1080 x 1350**

1. **Photograph.** Source `Killian-tub-to-shower-results.jpeg` (1200 x 1600). Crop source x 0 to 1200, y 50 to 1550 (1200 x 1500), scale to 1080 x 1350. Full frame, minimal crop. The shower, the sliding glass and the wood look floor all stay in.
2. **Scrim.** Shield Navy `#1E3A5F` at 92 percent, full width, y 760 to 1350. Hard top edge with a 6px Trade Orange rule at y 754 to 760. A hard edge, not a gradient, so the type sits on a flat field and stays legible at thumbnail size.
3. **Headline.** Two lines, Barlow Condensed Bold, 84px, line height 90px, Cream. x 80, baselines y 880 and y 970.
   Line 1: `Three people looked at it.`
   Line 2: `You still have the tub.`
4. **Sub.** Two lines, Inter Regular, 36px, line height 50px, Cream at 82 percent. x 80, baselines y 1040 and y 1090.
   Line 1: `We publish our prices. Tub out,`
   Line 2: `walk-in shower in, from $4,500.`
5. **Trust row.** Inter Medium, 30px, Cream at 65 percent. x 80, baseline y 1170.
   `4.9 on Google · Fully insured · An owner on every job`
6. **Signature.** Inter SemiBold, 30px, Trade Orange. x 80, baseline y 1226.
   `Omar and Byron Casilla, Kendall`
7. **Logo.** Cream lockup, height 64px, top right, right edge x 1000, top edge y 210.

**Compliance note specific to this photograph.** The Killian shower has a **low curb, not a curbless entry**. Do not put "no step," "curbless," "step free" or any accessibility language on this image. That claim belongs only to the Glenvar photographs, and even there it is a description of the job, never a promise about the viewer's bathroom.

**9:16 relayout, 1080 x 1920**

- Photograph fills the canvas: crop source x 60 to 1140, y 0 to 1600 (1080 x 1600), scale to 1080 x 1920. That is a 1.2x upscale on the vertical, acceptable at Reels viewing distance.
- Scrim moves up: y 620 to 1248, ending exactly at the Reels safe line. Orange rule at y 614 to 620.
- Headline baselines y 760 and y 850, same 84px.
- Sub baselines y 930 and y 980.
- Trust row baseline y 1070. Signature baseline y 1130.
- Below y 1248 the photograph runs clean into Reels' chrome. Nothing readable goes there.
- Logo top right, top edge y 300.

**1:1 trim, 1080 x 1080**

- Photograph: crop source x 0 to 1200, y 250 to 1450, scale to 1080 x 1080.
- Scrim y 620 to 1080. Orange rule at y 614.
- Headline drops to 68px, line height 74, baselines y 710 and y 784.
- Sub drops to 30px, baselines y 846 and y 888.
- Trust row 26px, baseline y 952. Signature 26px, baseline y 1000.

**What changes between crops:** the scrim's top edge moves to keep the whole type block above the placement's dead zone, from y 760 at 4:5 to y 620 at both 9:16 and 1:1. Type steps down one size at 1:1 only.

---

### Ad 6, `PHOTO_BeforeAfter` Spanish

Same evidence, genuinely different composition, so Meta does not read the pair as duplicates.

**The differentiator: Spanish uses the stacked layout as its 4:5 master**, where English uses side by side. This is an honest difference in composition rather than a cosmetic filter swap, and it means the two ads present a different first visual in the feed.

**4:5 master, 1080 x 1350, stacked**

- **Before panel.** y 0 to 640, 1080 x 640. Crop source `glenvar-before-3.jpg` x 0 to 768, y 260 to 715 (768 x 455), scale to 1080 x 640. **1.41x upscale**, bicubic.
- **Interval band.** y 640 to 750, Shield Navy 92 percent, 4px Trade Orange rules top and bottom. Text centered, Montserrat Bold 38px, Cream:
  `EL MISMO CUARTO. UNA SEMANA DESPUÉS.`
- **After panel.** y 750 to 1350, 1080 x 600. Crop source `glenvar-after-1.jpeg` x 0 to 1500, y 620 to 1453 (1500 x 833), scale to 1080 x 600. Downscale, clean.
- **Labels.** Pills 190 x 62px, navy 88 percent, Montserrat Bold 34px Cream. `ANTES` at x 40, y 40. `DESPUÉS` at x 40, y 790. The `DESPUÉS` pill needs 220px width for the accent and the extra glyph.
- **Footer.** No separate strip. Add a single line inside the after panel, Inter Medium 28px, Cream at 80 percent with a soft navy shadow for legibility over the tile, x 60, baseline y 1300:
  `Glenvar Heights · Desde $6,500 · 4.9 en Google`

**9:16, 1080 x 1920.** Same stack, taller panels: before y 270 to 1000, interval band y 1000 to 1090, after y 1090 to 1798. Labels at x 40, y 300 and x 40, y 1120. Footer line at baseline y 1230, above the Reels line. Crops widen vertically from the same sources, before at 1.45x, after clean.

**1:1, 1080 x 1080.** Before y 0 to 490, band y 490 to 590, after y 590 to 1080. Interval text drops to 32px. Labels at y 30 and y 620.

**What changes between crops:** nothing structural. Spanish is stacked in all three, which is what keeps it distinct from the English ad at every placement.

---

## 7. Compliance pass

**Price parity.** The published starting prices come from `lib/landing/quote-pricing.ts`, `BASE_PRICE`: `shower-only` 4500, `shower-floor` 6500, `full-remodel` 9500. The landing page cards render these as "From $4,500" and so on. Therefore **every in image price must read `FROM $4,500` or `From $6,500`**, never a bare `$4,500` that reads as a fixed total. A bare number in the image against "From" on the page is a price mismatch, and price claims in an image have to be honoured on the landing page with their conditions. If `BASE_PRICE` ever changes, every ad in this document changes the same day.

**No implied guarantee.** Before and after copy describes a job that was done. It never promises the viewer an outcome. `Same room, same wall, one week apart` is a statement about Glenvar Heights. `Your bathroom will look like this` is a misrepresentation violation. Nothing in this document uses second person about a result, and no variation should.

**Same property, same job, no compositing.** Both Glenvar frames are the same bathroom shot from the same doorway. The window in both frames is the proof. Never composite, never mix jobs inside one before and after, never use `tub-to-shower-kendall-concept.png` in a photo led ad. The page FAQ promises every photo is real work and the ads have to be able to keep that promise.

**Homeowner consent.** Glenvar Heights is Anna Vidal's home. These photographs are already public on the landing page, so the exposure is not new, but consent for advertising use should be confirmed in writing and the permission clause should go into the job contract going forward, not chased afterwards.

**Housing classifier.** Home remodeling is not Housing under Meta's policy. Housing covers listings, rentals, sales, mortgages and home insurance. Two habits pull a remodeling ad toward the classifier anyway and both are banned in this campaign:

| Do not write | Write instead |
|---|---|
| Fix, repair, damage, leak, rot, mold, failing, water behind the wall | Remodel, upgrade, convert, build, rebuild |
| Home value, resale, equity, your property, neighborhood values | Nothing. Drop the frame entirely |

Ad 3 was rewritten under this rule. Its argument is now two construction methods, one bonds a panel over an existing wall and one removes the wall and rebuilds it. It makes no claim about the condition of anybody's house. That version is also the more persuasive ad, because it sells the method rather than fear.

**Credit special ad category.** No ad in this campaign mentions financing, monthly payments, interest, approval, or credit. The landing page does and may. `You pay by milestone, never everything up front` describes a payment schedule and is safe.

**Personal attributes.** No ad may imply knowledge of the viewer's health, age, mobility or ability. This is why Concept C, step free access, is **not** in round one. When it enters at day 30 it must talk about the bathroom and never about the person. `That tub wall is 15 inches` is about a bathroom. `Is stepping over the tub getting hard for you?` is a rejection and possibly an account strike. Also note the Killian photograph shows a low curb and must never carry step free language.

**Competitor trademarks.** Never name a franchise brand in an image or in copy. "A one day bathroom" and "a one day install" are category descriptions and are safe.

**Language rules.** No use of contractor, licensed, contratista or licenciado anywhere in this document or in any variation built from it. Fully insured and totalmente asegurados only. No em dashes or en dashes in any copy block; the middle dot `·` is the separator in every trust row.

**The 20 percent text rule is retired.** It is not an enforcement gate and has not been since 2021. Type led creative will not be rejected for text coverage. Keep text low for legibility, not for policy.

**Before and after classifier drag.** Split frame before and after uses the same visual grammar Meta's health classifiers hunt for, so expect the occasional false positive rejection on ads 2 and 6. **Appeal, do not rebuild.** A rebuild resets learning and usually gets the same result.

**The $5 delivery test.** Run ad 1 alone at $5 per day for 48 hours before the real budget goes live. Ad 1 is the right probe because it is type led, carries a price in the image, and has no before and after grammar to trip a classifier. If it delivers clean, the rest follow.

---

## 8. Refresh plan

The vault's numbers: refresh every 10 to 14 days keeps 14 day frequency under 2.0 and CPM down 15 to 25 percent. Under Andromeda, effective ad lifespan has compressed from 6 to 8 weeks down to 2 to 4. Act in the Warning phase, days 4 to 7, when frequency is 1.6 to 2.8 and CTR has slipped 5 to 15 percent. Most operators act at the Cliff, having paid retail for a week of impressions on a dead ad.

Two rules that override instinct:

- **Rotate, never pause.** Swap the new variant into the same ad set. Pausing freezes the learning data the next variant would inherit.
- **Duplicate, never edit.** Editing a live ad's creative resets learning and wipes accumulated likes, comments and shares. Duplicate the ad, edit the duplicate.

### Days 1 to 7: do nothing

No budget changes, no pausing, no new ads, no audience edits. Look once on day 4 and take no action. This is `t2s-01`'s hardest rule and the most expensive one to break.

Day 4 read, diagnostic only. Statics have no hold rate gate, so the read is CTR first. Below about 0.7 percent link CTR on cold Feed, the asset failed to earn attention. Then CPM, which tells you which audience pocket Meta routed the visual to. Then CVR, where high CTR plus low CVR means the image over promised.

### Day 8: first decision, first additions

One decision only, then add two or three ads to the **same ad set**. Never a new ad set.

What ships on day 8, from the queue that should already be built and sitting paused:

| Ad name | What it is |
|---|---|
| `TYPE_Short_H17_v1_inhouse` | The under 50 character band, which is the highest survival band in the data. Cheap, and nothing in round one occupies it |
| `PHOTO_Crossings_H10_v1_inhouse` | `work-the-crossings-conversion.jpeg`, green marble and mosaic floor. Feed distinctive, because the feed is beige and this is not |
| `TYPE_PriceAnchor_H18_v2_inhouse` | Hook swap on ad 1's body if ad 1 is winning: `$6,500, not $18,000` as the hero instead of `FROM $4,500` |

`TYPE_Short_H17_v1_inhouse` copy, ready to paste:

- Primary text, English: `Two questions. Your real tub to shower price.` (44 characters, in the under 50 band)
- Headline: `Your price in 60 seconds` (24 characters)
- Description: `Miami-Dade. From $4,500.` (24 characters)
- Spanish primary: `Dos preguntas. Su precio real de la ducha.` (41 characters)
- Spanish headline: `Su precio en 60 segundos` (24 characters)
- Spanish description: `Miami-Dade. Desde $4,500.` (25 characters)

### Day 14: the owner face ships

This is the asset round one could not build. It closes the trust stack.

| Ad name | What it is |
|---|---|
| `PHOTO_Authority_H14_v1_inhouse` | Omar and Byron, truck or job behind them, from shot list item 1 |
| `PHOTO_Authority_H14_v1_inhouse-es` | Spanish cut, same shoot, different frame |

Copy for `PHOTO_Authority_H14_v1_inhouse`, adapted from Concept E and trimmed into band:

```
I am Omar. My brother Byron and I run Broke & Fixed out of Kendall.

We do not sell you a bathroom over the phone. You answer two questions on our site, you get a real price range the same day, and if the number does not work you have lost 60 seconds instead of a Saturday morning.

Tub to shower conversions start at $4,500. Porcelain tile, waterproofed properly, about a week.

One of us is on every job. Fully insured. 4.9 on Google.
```

- Headline: `Family run, out of Kendall` (26 characters)
- Description: `Fully insured. 4.9 stars.` (25 characters)

Image spec: portrait crop, both brothers in frame, truck or an active job visible behind. `FULLY INSURED` set in Montserrat Bold 34px Cream on a navy pill in the lower third, never the word licensed. Names set under the faces in Inter SemiBold 30px Trade Orange.

At day 14 also run the fatigue diagnostic properly, because the fix depends on which metric moved first:

| Signal | Threshold | Diagnosis | Fix |
|---|---|---|---|
| CTR drop | 15 percent off 7 day baseline | Cleanest signal, normalises for cost | Read the next two rows |
| Hook or CTR down, CPM flat | | **Creative fatigue**, asset level | New opening on the same body. An hour of work |
| CPM up 10 percent, CTR flat | | **Ad fatigue**, audience level | New angle, or widen. A production cycle |
| Frequency over 2.5 prospecting | | Not enough creative depth | Rotate the queued variant that day |

Reach for the wrong lever and you re-shoot a perfectly good angle, or refresh a hook on an angle the market already rejected.

### Day 30: new angles, first video

By day 30 the round one concepts are 28 to 45 days old, which the vault says is the point to iterate *and* have a fresh angle in test.

| Ad name | Angle | Note |
|---|---|---|
| `PHOTO_StepFree_HookC_v1_inhouse` | Accessibility, reframed | Concept C, held out of round one on policy. Talks about the bathroom, never the person. Glenvar photographs only, never Killian |
| `VID_LinerCallout_H6_v1_inhouse` | Comparison, demonstration | The first video, from shot list items 3 and 4. Owner on camera, phone shot, captions burned in |
| `TYPE_Listicle_H8_v1_inhouse` | Listicle | `Three things people regret about a tub to shower job.` Benefits, not features |
| `PHOTO_Review_v1_inhouse` | Social proof | Real Google review rendered as a card. Suzie B. or Estefania D., verbatim, never trimmed in a way that changes the meaning |

Also at day 30: run a Layer 1 angle read. If none of the four round one angles has produced a booked job, the angle is the ceiling and no amount of hook swapping will fix it.

### Standing rule

Have the next variant **produced, tagged and sitting paused in the account** before the current winner enters Warning. Refresh then becomes a click instead of a fire drill. This single habit is what separates accounts that barely flinched when lifespans compressed from accounts that scramble every month.

---

## 9. Shot list for the next three jobs

Round one exposed exactly what the library is missing. This list is ordered by what unblocks the most creative, not by what is easiest to shoot.

**Item 1 is the one that matters most.** It is the only thing standing between the account and a complete trust stack.

### 1. The two of you. Ten minutes, next job.

- Both brothers, standing, truck behind you with plates visible. Landscape and portrait.
- The same shot with one of you alone, mid work, tools in hand.
- One frame of hands laying tile, then a frame of the face. That pair is the founder hook.
- Shoot in daylight. No sunglasses. Work shirts, not clean polos.

Without this there is no face in the account, and the vault is blunt that a face is the first item in the trust stack for a business asking strangers to let them into a house.

### 2. A full resolution before and after pair, doorway discipline

The current before frame is 768 pixels wide, which forces a 1.4x upscale on every Reels panel and cost the 1:1 crop its quality. Fix it once and it stays fixed.

- Stand in the doorway. Shoot the whole room before anyone touches anything.
- Same spot, same height, same framing when the job is done.
- Lights on, blinds open, no tools, no drop cloths, nobody in frame.
- Same orientation for both. **Pull the original off the phone, not a shared or downsized copy.** Convert HEIC to JPEG; Chrome and Firefox cannot display HEIC.

### 3. The wall coming out

- The old wall opened to the studs, wide enough to read as a room.
- Cement board going up. The pan liner going in. The membrane going on, close.
- First tile on the wall.

These three frames are the entire comparison angle as real photography instead of illustration. Right now ad 3 runs on diagrams because there is no photographic version.

### 4. The estimate conversation

The highest value thing on this list after the faces, and the cheapest, because the appointment was happening anyway.

Forty seconds of one of you in a customer's bathroom explaining what you found and what it will cost. Phone, vertical, no script. It previews the exact interaction the homeowner is nervous about, which is why it outperforms the glossy finished shot.

Get a verbal OK on camera before you film in someone's house.

### 5. A true shower only job

Level 1 currently has no honest hero image. `work-hammocks-level1-card.jpg` is a tight crop of a niche and cannot carry an ad. The next job where the tub comes out and the room otherwise stays as it is, shoot it properly from the doorway. That photograph is the $4,500 tier's proof.

### 6. Ten seconds of the homeowner, if they are willing

Never push. When it happens it is the best retargeting asset in the account.

### Making it a habit

Give the crew this list on one page and $50 per job for usable footage. Every job site is a content studio. It costs less than one stock video licence and it is the only creative supply chain that does not run dry.

Naming: `{neighborhood}-{before|demo|waterproofing|after-wide}.jpg` for a tracked job, `work-{neighborhood}-{scope}.jpeg` for a gallery entry. Lowercase, hyphens, no spaces.

---

## 10. Open items for the owners

1. **The real Kendall job count this year.** Hook H15, "Eleven bathrooms in Kendall this year, this is number eleven," is one of the strongest hooks in the bank and it is deliberately absent from round one because nobody has confirmed the number. It only works if it is true. Give the number and it ships at day 14.
2. **Anna Vidal's written consent** for advertising use of the Glenvar Heights photographs, and a permission clause added to the job contract going forward.
3. **Edit `t2s-02`** from `utm_medium=paid-social` to `utm_medium=paid` so the two documents agree and reporting does not split.
4. **The dream client doc**, if one exists outside this repo. Segments 2 and 3 of the empathy map in `t2s-04` are still marked unverified, and the Spanish voice in particular is written from a good ear rather than from customer language. Run one of the next three estimates in Spanish and write down exactly how the homeowner describes the problem. Then rewrite ads 5 and 6 in their nouns.
