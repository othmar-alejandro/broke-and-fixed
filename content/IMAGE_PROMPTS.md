# Image Prompts for Broke & Fixed SEO Content

This file is the source of truth for every AI-generated image referenced in blog posts and service pages. Hand any single section below to an image-gen agent (Nano Banana, DALL-E, Midjourney, Imagen, etc.) with the style guide attached.

---

## Universal Style Guide (apply to every prompt)

- **Photorealistic documentary real-estate photography.** Looks like a phone or DSLR photo of a real Miami home, not a render or illustration.
- **No people.** No text, no logos, no watermarks, no signage, no brand names visible.
- **Aspect ratio**: 16:9 for hero images. 4:3 acceptable for inline.
- **Lighting**: warm Florida natural light. Late morning or late afternoon. Slight golden tones. No harsh studio lighting.
- **Composition**: eye-level or slightly low. Some natural depth of field. Slight imperfection OK (light wear, lived-in feel).
- **Context cues for Miami**: terrazzo floors visible where appropriate, hurricane-rated impact windows, simple flat trim (1980s-2000s Miami suburban), CBS construction. Avoid Northeast-looking interiors (no exposed brick, no farmhouse, no mountain views out the windows).
- **What to avoid**: AI-looking faces, melting fingers, impossible architecture, oversaturated colors, "luxury hotel" aesthetic, magazine-perfect staging. Real homes have a coffee maker on the counter.

---

## Image 1: Cabinet Refinishing Blog Hero

- **Save to**: `public/images/blog/cabinet-refinishing-miami-hero.jpg`
- **Used by**: `content/blog/2026-05-15-cabinet-refinishing-miami-cost.md` (frontmatter `image:` field) and OG/Twitter previews
- **Alt text** (for the `<img>` tag, if you swap to `next/image`): `Refinished oak kitchen cabinets with honey stain and brushed nickel hardware in a Miami home`
- **Prompt**:

> Wide-angle photo of a refinished oak kitchen in a Miami suburban home. Honey-stained shaker-style cabinet doors with brushed nickel bar pulls, freshly resealed with a satin lacquer finish. White quartz countertop with subtle gray veining, small white subway tile backsplash, warm afternoon Florida sunlight coming through a window with sheer linen curtains. The cabinets look professionally refinished — visible wood grain texture showing through the stain — not new factory installation. Stainless steel undermount sink, a coffee maker and a wooden cutting board on the counter for lived-in feel. Terrazzo floor partially visible at the bottom edge. Photorealistic, 16:9, eye-level, slight depth of field. No people, no text or watermarks.

---

## Image 2: Budget Kitchen Update Blog Hero

- **Save to**: `public/images/blog/budget-kitchen-update-miami-hero.jpg`
- **Used by**: `content/blog/2026-05-15-budget-kitchen-update-miami.md`
- **Alt text**: `Budget kitchen update in a Miami home with refinished white cabinets and new quartz countertop`
- **Prompt**:

> Bright wide-angle photo of an updated Miami suburban kitchen showing the result of a budget refresh, not a full gut remodel. Refinished cabinets in matte white lacquer (clearly painted over older boxes, not new install), new white quartz countertop, fresh white subway tile backsplash with light gray grout, brushed gold cabinet pulls and knobs. Stainless steel appliances that look 5 to 10 years old, kept from before the update. Bright Florida morning light through a window. The architecture suggests a 1980s or 1990s Miami home: flat trim, popcorn texture on the ceiling lightly visible, terrazzo or large beige porcelain tile floor. A fruit bowl and a kettle on the counter. Photorealistic, 16:9, no people, no text.

---

## Image 3: Cabinet Refinishing Service Page Hero

- **Save to**: `public/images/services/cabinet-refinishing-hero.jpg`
- **Used by**: `/services/cabinet-refinishing` and all 17 location sub-pages (currently falls back to a generic kitchen photo from `lib/data/images.ts` — once this file exists, swap the path in that file from `/Home Remodeling - South Miami Heights /...` to `/images/services/cabinet-refinishing-hero.jpg`)
- **Alt text**: `Cabinet refinishing project in progress in a Miami kitchen with doors removed and boxes masked`
- **Prompt**:

> Eye-level photo of a Miami kitchen mid-refinishing project. In the foreground: 4 to 6 cabinet doors removed and standing on a small drying rack, freshly sprayed in matte white finish, visible wet sheen on the surface. In the middle ground: cabinet boxes still mounted on the wall, openings taped off with blue painter's tape and brown craft paper. On a workbench: an HVLP spray gun, a small container of lacquer, and clean nitrile gloves. The kitchen is otherwise tidy and protected with plastic sheeting on the floor. Daylight from a window. Real working remodel site, organized not staged. Photorealistic, 16:9, no people in frame, no text or logos.

---

## Image 4: Cabinet Refinishing Gallery — Before

- **Save to**: `public/images/services/cabinet-refinishing-before.jpg`
- **Used by**: Service page gallery (add to `lib/data/images.ts` `cabinet-refinishing.gallery[0]` once created)
- **Alt text**: `Dated oak kitchen cabinets with yellowed clear coat before refinishing in a 1990s Miami home`
- **Prompt**:

> Honest photo of dated oak kitchen cabinets in a 1990s Miami home, before any refinishing. The finish has yellowed unevenly over time. Visible wear and dark smudges around the most-used cabinet pulls and door edges. Original brass pulls and hinges, slightly tarnished. The cabinets are clearly solid wood and structurally sound but cosmetically tired. Some clutter on the counter (paper towels, a half-empty bottle of dish soap, a couple of mail envelopes) to show real lived-in condition. Original beige tile countertop with darker grout. Natural daylight, slightly overcast — not flattering, honest. Photorealistic, 16:9, no people, no text.

---

## Image 5: Cabinet Refinishing Gallery — After

- **Save to**: `public/images/services/cabinet-refinishing-after.jpg`
- **Used by**: Service page gallery
- **Alt text**: `Same Miami kitchen after professional cabinet refinishing in matte white with black bar pulls`
- **Prompt**:

> The same Miami kitchen layout shown in the "before" image, now after professional cabinet refinishing. Cabinets refinished in crisp matte white lacquer with visibly smooth, factory-quality finish (no brush marks, no orange peel). Matte black bar pulls, soft-close hinges. New white quartz countertop replaced the old beige tile. Clean undermount sink. Warm Florida late-afternoon golden light through the window. The counter is mostly clear with just a wooden cutting board and a small vase. Same Miami 1990s architecture (flat trim, simple cased opening to dining room) but completely transformed visually. Photorealistic, 16:9, no people, no text.

---

## Image 6: Cabinet Refinishing Gallery — Process Detail

- **Save to**: `public/images/services/cabinet-refinishing-process.jpg`
- **Used by**: Service page gallery, blog post inline (optional)
- **Alt text**: `Close-up of a cabinet door being sanded during refinishing prep in a Miami workshop`
- **Prompt**:

> Tight close-up photo of a single cabinet door lying flat on a workshop table, being sanded by an orbital sander. Dust particles visible in a soft shaft of daylight coming from the side. Wood grain partially revealed where the previous finish has been sanded through. Hands wearing nitrile gloves are holding the sander steady. The hands should look natural and realistic — focus on craft, not on the person. Other doors on drying racks in soft-focus background. Clean shop environment with tools organized on a pegboard. Photorealistic, 16:9 or 3:2, no faces visible, no text or logos.

---

## How to Use This File

**If you're generating images yourself in another IDE / chat:**

1. Open the section for the image you want
2. Paste the entire **Prompt** block into your image generator
3. Append the **Universal Style Guide** above as additional context if the model supports it
4. Save the output to the exact path listed under **Save to**
5. The blog post or service page will pick it up automatically — no code changes needed (with one exception: Image 3, where you swap the path in `lib/data/images.ts`)

**If your image gen tool needs an aspect ratio parameter:**
- Heroes (Images 1, 2, 3): `16:9` or `1920x1080`
- Gallery (Images 4, 5, 6): `4:3` or `1600x1200`

**Adding more images later:** keep adding them to this file using the same template (Save to, Used by, Alt text, Prompt). One file, one source of truth.

---

## Image 7: Miami HOA Renovation Approval Pillar Post Hero

- **Save to**: `public/images/blog/miami-hoa-renovation-approval-hero.jpg`
- **Used by**: `content/blog/2026-05-15-miami-hoa-renovation-approval-guide.md` + OG cards
- **Alt text**: `Modern Miami suburban home in an HOA community with manicured front yard`
- **Prompt**:

> Wide-angle photo of a well-maintained single-family home in a Miami-Dade master-planned HOA community. Light beige stucco walls, barrel terra cotta tile roof, two-car garage with a white door, neatly trimmed Florida-style landscaping (a few palm trees, low hibiscus shrubs, fresh mulch beds), brick paver driveway. Composition shows the home from a slight angle to convey street appeal. Late afternoon golden Florida light, blue sky with a few clouds. Standard Doral or West Kendall HOA architecture. No people, no cars on the street, no logos or signage. Photorealistic 16:9.

---

## Image 8: HOA vs. Permit Post Hero

- **Save to**: `public/images/blog/hoa-approval-vs-permit-hero.jpg`
- **Used by**: `content/blog/2026-05-15-hoa-approval-vs-permit-miami.md`
- **Alt text**: `Stack of paperwork including HOA application and building permit documents on a kitchen counter`
- **Prompt**:

> Close-up overhead photo of two stacks of paperwork on a wooden kitchen counter in a Miami home. Left stack: an HOA architectural review application form with a color sample chip and a printed photo of a house clipped to it. Right stack: a Miami-Dade building permit application with a contractor's business card and a blue highlighter on top. A coffee mug and a smartphone are off to the side for casual lived-in feel. Soft daylight from above. The text on the documents is intentionally blurred / generic so no readable text is visible. No people, no logos, no specific brand names readable. Photorealistic 16:9 overhead/flat-lay.

---

## Image 9: Hurricane Impact Windows HOA Post Hero

- **Save to**: `public/images/blog/hurricane-impact-windows-miami-hoa-hero.jpg`
- **Used by**: `content/blog/2026-05-15-hurricane-impact-windows-miami-hoa.md`
- **Alt text**: `Hurricane impact windows installed on a Miami home with bronze frames and clear glass`
- **Prompt**:

> Photo of the front facade of a single-family Miami home showing newly installed hurricane impact windows with bronze aluminum frames and clear low-E glass. The home has light beige stucco walls and a barrel tile roof typical of Doral or West Kendall HOA communities. A small sticker on the corner of one window (subtle, not text-readable) suggests recent installation. Florida foliage in the foreground (palm fronds, hibiscus). Warm late-morning light, slight haze. The bronze frames should be visibly different from typical white window frames, distinctly hurricane-rated. No people, no logos, no manufacturer brand names visible, no installer signage in the yard. Photorealistic 16:9.

---

## Existing Photo Inventory

You already have real project photos in these folders that might be reusable instead of AI-generated:

- `public/Home Remodeling - South Miami Heights /` — kitchen, bathroom, dining room
- `public/kitchen rennovation - south miami heights /` — kitchen process shots
- `public/exterior paint - the hammocks 2/` — exterior painting
- `public/driveway clear coating/` — exterior repairs
- `public/demolition project - miami gardens/`
- `public/chimney removal - The Crossings/`

Real client work usually beats AI for service-page galleries because customers can see actual jobs you've done in their neighborhood. AI is best for hero shots and "concept" images that don't claim to be a specific past project.

---

## Image 10: HB 803 In Effect Blog Hero

- **Save to**: `public/images/blog/hb-803-in-effect-bathroom-kitchen.jpg`
- **Used by**: `content/blog/2026-07-01-hb-803-in-effect-bathroom-kitchen.md`
- **Alt text**: `Modern permit-free cosmetic bathroom remodel with oak vanity and quartz top in Miami`
- **Prompt**:

> Photorealistic wide-angle interior of a recently updated suburban Miami bathroom showing a permit-free cosmetic refresh. Features a new modern oak vanity with a white quartz top, a chrome faucet, fresh light gray painted walls, and clean light gray porcelain floor tiles. The shower zone with frameless glass and clean subway tile is visible in the background. Bright Florida late-morning sunlight streams through a high window. Clean, lived-in feel with a simple hand towel and soap dispenser on the vanity. 16:9, eye-level, no people, no text.

---

## Image 11: Florida HB 803 Permit Guide Blog Hero

- **Save to**: `public/images/blog/florida-hb-803-no-permit.jpg`
- **Used by**: `content/blog/2026-05-20-florida-hb-803-no-permit-needed.md`
- **Alt text**: `Overhead view of remodeling project budget and tile samples on a Miami kitchen island`
- **Prompt**:

> Close-up photorealistic overhead flat-lay of remodeling planning documents and design samples on a kitchen island with a white quartz countertop. Includes a printed sheet titled "Project Budget" (text is generic and blurry/unreadable), a metal tape measure, three warm-neutral paint color swatch cards, and a few white ceramic subway tile samples. Soft natural Florida morning light from a side window creates gentle shadows. 16:9, clean and organized, no people, no text.

---

## Image 12: Kendall Bathroom Remodeling Cost Guide Hero

- **Save to**: `public/images/blog/bathroom-remodeling-kendall.jpg`
- **Used by**: `content/blog/2026-05-20-bathroom-remodeling-kendall-cost-guide.md`
- **Alt text**: `Remodeled primary bathroom with walk-in shower and floating double vanity in Kendall`
- **Prompt**:

> Photorealistic interior of a fully remodeled primary bathroom in a Kendall, Miami suburban home. Features a large walk-in shower with a low curb, tiled in large-format light gray porcelain, and a modern floating double vanity in light oak with white quartz countertops and matte black faucets. Natural warm Florida afternoon light shines through impact glass windows. Lived-in details like a folded towel and a small potted plant on the vanity. 16:9, eye-level, no people, no text.

---

## Image 13: Coral Gables Luxury Kitchen Remodeling Guide Hero

- **Save to**: `public/images/blog/kitchen-remodeling-coral-gables.jpg`
- **Used by**: `content/blog/2026-05-20-kitchen-remodeling-coral-gables-luxury-guide.md`
- **Alt text**: `Luxury remodeled kitchen with dark cabinetry and quartzite waterfall island in Coral Gables`
- **Prompt**:

> Photorealistic wide-angle interior of a remodeled kitchen in a Coral Gables, Miami home. Features custom refinished dark wood cabinetry, a polished quartzite waterfall kitchen island, and a natural stone backsplash. Brushed brass pendant lights hang over the island. Warm golden hour light pours through French doors that show lush green tropical landscaping outside. 16:9, eye-level, clean and premium, no people, no text.

---

## Image 14: Pinecrest Interior Painting Color Trends Hero

- **Save to**: `public/images/blog/interior-painting-pinecrest.jpg`
- **Used by**: `content/blog/2026-05-20-interior-painting-pinecrest-color-trends.md`
- **Alt text**: `Freshly painted sage green living room with terrazzo floor in a Pinecrest home`
- **Prompt**:

> Photorealistic interior of a freshly painted modern living room in a Pinecrest, Miami home. The walls are coated in a soft matte sage green, contrasting with crisp white baseboards and window frames. Large impact glass windows show lush tropical green foliage and palm trees in the background. Natural light fills the space, reflecting off a polished terrazzo floor. A minimalist sofa and wooden coffee table create a clean, modern look. 16:9, no people, no text.

---

## Image 15: Doral Tile Installation Condo Guide Hero

- **Save to**: `public/images/blog/tile-installation-doral.jpg`
- **Used by**: `content/blog/2026-05-20-tile-installation-doral-condo-guide.md`
- **Alt text**: `Large-format porcelain tile flooring in a modern Doral condominium`
- **Prompt**:

> Photorealistic low-angle photo of a modern Doral, Miami condominium living area showing newly installed large-format porcelain floor tiles. The tiles are a light concrete-gray color with thin, precise grout lines that run straight. In the background, floor-to-ceiling windows show a bright sky and high-rise silhouettes. Sunlight glints off the polished tile surface. 16:9, clean and spotless, no people, no text.
