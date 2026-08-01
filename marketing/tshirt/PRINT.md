# Broke & Fixed - T-Shirt Back Design

Minimal back print: **QR up top -> "See our projects" hook -> logo**. No phone, no URL.
The logo has a **white outline** so it reads on any shirt colour, which means **one print
file works for every colour**.

## FINAL PRINT FILE
`print-back-transparent.png` - transparent background, **1297 x 2558 px = 4.32 x 8.53 in
@ 300 dpi**. Hand this to the printer (DTF / DTG / screen / heat transfer). Works on any
shirt colour. Source: `print-artwork.html`.

- Placement: centre back, top of the art ~3-4 in below the collar (QR between the
  shoulder blades). Print ~4.3 in wide as-is, or scale up to ~5 in and stay sharp.
- QR prints ~2.3 in with its white chip + quiet zone -> **test-scan a printed sample.**
  It points to brokeandfixed.com/start.
- `print-proof-navy.png` = the same file shown on navy, to confirm it reads on dark.

## Logo (white outline)
- `logo-outline-bold.png` = the real full-colour logo (`logo.png`, 1200px) with an ~18px
  white keyline added so it pops on light AND dark fabric. Generated from `logo.png`;
  re-run the PIL outline step to change thickness.
- This replaces the old approach of separate light/dark logos.

## Mockups (preview only - the dark frame is just the background, not part of the print)
`minimal-heather.png`, `minimal-navy.png`, `minimal-black.png` - the design on a shirt
shape in three colours. Render any theme from `back-minimal.html#heather` / `#navy` /
`#black` / `#sand` / `#white`.

## Notes / next options
- Hook text is "See our projects" - easy to swap (e.g. "See our work", "Before & afters",
  "Scan our projects"). Say the word.
- True vector (SVG/AI) isn't possible as-is: the **logo is raster only** (no vector
  source). DTF/DTG/transfer shops accept this 300 dpi PNG. Vector would need the logo
  redrawn first.
- Optional matching **front**: small left-chest shield.

## Re-render
```bash
cd marketing/tshirt
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
# transparent print file:
"$CHROME" --headless=new --hide-scrollbars --default-background-color=00000000 \
  --force-device-scale-factor=1 --window-size=1480,2740 --virtual-time-budget=5000 \
  --screenshot=print-back-transparent.png "file://$PWD/print-artwork.html"
# shirt mockup:
"$CHROME" --headless=new --hide-scrollbars --force-device-scale-factor=2 \
  --window-size=1400,1700 --virtual-time-budget=5000 \
  --screenshot=minimal-navy.png "file://$PWD/back-minimal.html#navy"
```

## Earlier (rejected - too busy, read like flyers)
`back-billboard.html/.png`, `back-scan.html/.png`. Kept for reference only.
