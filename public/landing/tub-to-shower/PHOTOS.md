# Photos for the tub-to-shower landing page

All photos live in `public/images/`. The page points straight at them, so there
is one copy of each file and no duplicate set to keep in sync.

Slots are defined in the `PHOTO` and `WORK` objects at the top of
`app/[locale]/landing/tub-to-shower/page.tsx`.

## In place and working

| File | Where it shows |
|---|---|
| `glenvar-after-1.jpeg` | Hero, Level 3 card |
| `glenvar-before-3.jpg` / `glenvar-after-1.jpeg` | Source frames for the slider crops |
| `glenvar-before-3-slider.jpg` / `glenvar-after-1-slider.jpg` | Before/after slider. Cropped to the tub/shower wall, because in the full frames both subjects sit on the LEFT and a 50% wipe composited old tub next to new vanity. Re-crop with sharp if the source photos ever change. |
| `glenvar-after-4.jpeg` | Safety section. Straight-on: glass, niche, window, hex floor. Swapped in for after-2 on owner instruction 9 Aug 2026; after-2 stays on disk. |
| `glenvar-demo.jpeg` | Not on the page. Removed from the timeline on owner instruction 10 Aug 2026; the illustrated day icons carry that section now. File stays on disk. |
| `glenvar-waterproofing.jpeg` | Not on the page. Same removal as above. Still the best proof shot of the membrane if a future section wants it. |
| `work-hammocks-level1-card.jpg` | **Level 1 card**. 16:10 crop of the Hammocks original: the full frame has tile spacers and a rag in shot. |
| `work-crossings-level2-card.jpg` | **Level 2 card**. 16:10 crop of the Crossings original, open door cut out. |
| `work-hammocks-master-remodel.jpeg` | Recent work grid |
| `work-the-crossings-conversion.jpeg` | Recent work grid |
| `work-pinecrest-full-remodel.jpeg` | Recent work grid |
| `work-south-miami-master-remodel.jpeg` | Recent work grid |
| `/landing/tub-to-shower/compare-rebuild.png` | Comparison section, "How we do it" card. AI-generated ILLUSTRATION (Higgsfield, 9 Aug 2026), not a job photo: exploded studs, cement board, orange membrane, tile. Illustrations are fine here because they read as diagrams; never put a generated PHOTOREAL bathroom on this page, the FAQ promises every photo is real work. |
| `/landing/tub-to-shower/compare-liner.png` | Comparison section, franchise card. AI-generated ILLUSTRATION: acrylic panel glued over old cracked tile. Same rule as above. |

Glenvar Heights (Anna Vidal) is the anchor job. `glenvar-before-3` and
`glenvar-after-1` are both shot from the doorway, which is the only reason the
comparison slider reads properly. Shoot every future job that way.

Tier card assignments, owner-approved 9 Aug 2026: Hammocks shows a finished
alcove shower with the room around it untouched, which is the level 1 story.
Crossings shows shower plus a new floor through the room with the modest white
vanity kept, which is level 2. Pinecrest and South Miami stay gallery-only
because both read as full remodels and would oversell the lower tiers. If a
true shower-only job gets photographed later, swap it into level 1 and the
Hammocks shot goes back to gallery-only.

## Two things that broke and how to avoid them

**Rotation.** The first batch of after photos were stored 4032x3024 landscape
with no EXIF orientation tag, so browsers rendered the hero on its side.
`sips -r 90` did not fix it, it wrote an orientation tag instead of rotating the
pixels. The fix was `sharp().rotate(90)`, which bakes the rotation in and strips
the tag. If a photo ever shows sideways on the page, that is the cause.

**Resolution.** The first batch were 360x480 downsized copies, far too small for
a hero. Always pull the original off the phone. Do not upscale, and do not
bother with an AI upscaler: it invents grout lines and veining that were never
in your tile work.

Sources get resized to 2000px on the long edge at quality 86, which took the
hero from 2.4 MB to 233 KB with no visible loss.

## Shooting future jobs

1. Stand in the doorway. Shoot the whole room before anyone touches it.
2. Same spot, same height, same framing when the job is done.
3. Lights on, blinds open, no tools, no drop cloths, nobody in frame.
4. Keep before and after in the same orientation.
5. Grab one mid demo and one waterproofing shot every time. Those two are what
   separate you from a one day liner company.

Naming: `{neighborhood}-{before|demo|waterproofing|after-wide}.jpg` for a tracked
job, `work-{neighborhood}-{scope}.jpeg` for a gallery entry. Lowercase, hyphens,
no spaces.

## Extension does not matter

`JobPhoto` resolves `.jpg`, `.jpeg`, `.png`, `.webp` and `.heic` against the same
base name, so you do not have to rename what your phone exported. One exception:
**convert HEIC to JPEG.** Chrome and Firefox cannot display HEIC, so it would
look fine to you on a Mac and be broken for most of your traffic.
