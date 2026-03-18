# Design System: Broke & Fixed Home Solutions

## 1. Brand Identity & Atmosphere

**Broke & Fixed Home Solutions** projects a **bold, trustworthy, and action-oriented** brand identity. The visual language is direct and confident — built for a home services contractor audience that values reliability, craftsmanship, and results.

The logo's shield shape communicates **protection and security**, while the roofline motif reinforces the home services niche. The cracked-texture "B" letter subtly nods to the "broke" concept — damaged things that need fixing — and the checkmark on the "F" closes the loop on resolution and quality.

The overall mood is **rugged yet professional**: blue-collar expertise delivered with polished presentation. It's the visual language of a contractor you can trust to both show up and do the job right.

**Key Brand Characteristics:**
- Shield emblem = protection, strength, reliability
- Roofline silhouette = home services specialization
- Cracked texture + checkmark = "broke to fixed" narrative built into the mark
- Bold condensed type = confidence, efficiency, no-nonsense
- Orange accents = energy, urgency, warmth (construction/trades tradition)
- Green checkmark = approval, completion, go-signal

---

## 2. Color Palette & Roles

### Primary Colors

| Name | Hex | Role |
|------|-----|------|
| **Shield Navy** | `#1E3A5F` | Primary brand color. Used for the shield, headlines, and dominant backgrounds. Conveys trust, depth, and professionalism. |
| **Trade Orange** | `#F07A1A` | Accent color. Used for the roofline, ampersand "&", and the vertical divider bar. Signals energy, urgency, and warmth — a classic trades/construction accent. |
| **Approval Green** | `#4CAF50` | Trust signal. Used exclusively for the checkmark. Represents completion, quality assurance, and positive outcomes. Use sparingly for success states only. |

### Secondary / Neutral Colors

| Name | Hex | Role |
|------|-----|------|
| **Concrete Gray** | `#B0BEC5` | Used for the cracked texture on the "B" and the logo background. Works well for disabled states, subtle borders, and skeleton loaders. |
| **Clean White** | `#FFFFFF` | Letter fills and light foreground elements. Used for text on dark backgrounds and icon fills. |
| **Soft Silver Background** | `#D9DDE3` | The logo's outer background. Ideal for section backgrounds, cards, and light mode surfaces. |
| **Deep Charcoal** | `#1A1A2E` | Near-black for body text and high-contrast situations. Softer than pure black, more premium. |

### Color Usage Rules
- **Do not** use Orange as a background for large areas — it's an accent, not a base
- **Shield Navy** should appear in every meaningful UI section as the anchor
- **Approval Green** is reserved for success/completion states only
- Maintain a 4.5:1 contrast ratio minimum for all text

---

## 3. Typography

### Identified Typefaces (from logo)

**Primary / Display — "BROKE & FIXED"**
- Style: Bold, condensed, wide-tracked sans-serif
- Character: Strong, authoritative, no-nonsense
- Closest match: **Barlow Condensed Bold** or **Oswald Bold**
- Recommended system font stack: `'Barlow Condensed', 'Oswald', Impact, sans-serif`
- Usage: Hero headlines, section titles, CTAs, brand name lockups

**Secondary / Subheading — "HOME SOLUTIONS"**
- Style: Light/regular weight, wide letter-spacing (tracked capitals)
- Character: Clean, professional, refined contrast to the bold primary
- Closest match: **Inter Medium** or **Montserrat Regular** with `letter-spacing: 0.2em`
- Usage: Subtitles, taglines, service category labels, navigation

**Body Text**
- Recommended: **Inter Regular** (400) or **Roboto Regular**
- Size: 16px base, 1.6 line-height
- Color: Deep Charcoal (`#1A1A2E`) on light backgrounds
- Usage: Descriptions, paragraphs, form labels

### Typography Scale

| Level | Font | Weight | Size | Letter-spacing |
|-------|------|--------|------|----------------|
| H1 (Brand) | Barlow Condensed | 700 | 48–64px | 0.02em |
| H2 (Section) | Barlow Condensed | 700 | 32–40px | 0.01em |
| H3 (Subsection) | Montserrat | 600 | 22–28px | 0em |
| Tagline | Montserrat | 400 | 14–16px | 0.2em uppercase |
| Body | Inter | 400 | 16px | 0em |
| Small/Meta | Inter | 400 | 13–14px | 0.01em |
| Button | Barlow Condensed | 600 | 16–18px | 0.05em uppercase |

---

## 4. Iconography & Shape Language

### Shield Motif
- The hexagonal shield is the core brand shape
- Use shield-inspired **hexagonal** or **angular** containers for featured cards, badges, and callouts
- Avoid overly circular shapes (circles feel soft; this brand is angular and structural)

### Corner Radius
- **Buttons:** Slightly rounded — `border-radius: 6px` (approachable, not playful)
- **Cards:** Subtle rounding — `border-radius: 8–12px`
- **Badges/Tags:** Either sharp (`0px`) for authority or pill-shaped (`9999px`) for labels
- **Avoid:** Large corner radii (>16px) — too soft for this brand's personality

### Shadows & Depth
- **Default:** Flat or very subtle — `box-shadow: 0 2px 6px rgba(0,0,0,0.10)`
- **Hover/Interactive:** Medium-lift — `box-shadow: 0 4px 16px rgba(30,58,95,0.20)` (Shield Navy shadow)
- **Never:** Heavy drop shadows or very soft blurs — too corporate/generic

### Dividers & Structure
- Use thin vertical orange bars (`#F07A1A`, 2–3px wide) as accent dividers — mirrors the logo's center bar
- Horizontal rules should be `1px solid` in Concrete Gray (`#B0BEC5`)

---

## 5. Component Stylings

### Primary Button (CTA)
```
Background: Shield Navy (#1E3A5F)
Text: Clean White (#FFFFFF)
Font: Barlow Condensed Bold, uppercase, letter-spacing: 0.05em
Border-radius: 6px
Padding: 14px 32px
Hover: Background darkens to #152D4A, slight translateY(-1px)
Active: Background #0F1F35
Border: none
```

### Secondary Button (Outline)
```
Background: Transparent
Border: 2px solid Shield Navy (#1E3A5F)
Text: Shield Navy (#1E3A5F)
Hover: Fill with Shield Navy, text White
Border-radius: 6px
```

### Accent Button (Action/Highlight)
```
Background: Trade Orange (#F07A1A)
Text: Clean White (#FFFFFF)
Font: Barlow Condensed Bold, uppercase
Border-radius: 6px
Hover: Darken to #D4670F
Use for: Emergency calls, primary booking CTAs
```

### Cards & Service Tiles
```
Background: Clean White (#FFFFFF) or Soft Silver (#D9DDE3)
Border: 1px solid Concrete Gray (#B0BEC5)
Border-radius: 10px
Shadow: 0 2px 8px rgba(30,58,95,0.08)
Hover shadow: 0 6px 20px rgba(30,58,95,0.15)
Left accent bar: 4px solid Trade Orange (#F07A1A) — gives it a "contractor clipboard" look
Padding: 24–32px
```

### Navigation Bar
```
Background: Shield Navy (#1E3A5F)
Link color: Clean White (#FFFFFF)
Active/Hover: Trade Orange (#F07A1A) underline or text tint
Font: Montserrat Medium, uppercase, letter-spacing: 0.12em
Logo placement: Left-aligned
CTA button: Trade Orange accent button, right side
```

### Badges & Status Tags
```
Success: Approval Green (#4CAF50) background, White text — "Job Complete", "Verified"
In-Progress: Trade Orange (#F07A1A) background, White text — "Scheduled", "Active"
Alert: #E53935 (red), White text — "Urgent", "Emergency"
Neutral: Concrete Gray (#B0BEC5), Charcoal text — "Pending"
Border-radius: 4px or 9999px (pill)
Font: Inter 600, 12px uppercase
```

---

## 6. Layout Principles

### Spacing System (8px base grid)
| Token | Value | Usage |
|-------|-------|-------|
| `space-1` | 8px | Tight icon/text gaps |
| `space-2` | 16px | Inner component padding |
| `space-3` | 24px | Card padding, form spacing |
| `space-4` | 32px | Between related sections |
| `space-6` | 48px | Section vertical padding |
| `space-8` | 64px | Major section gaps |
| `space-12` | 96px | Hero/feature top-bottom padding |

### Grid
- Max content width: **1280px**
- Desktop: 12-column, 24px gutter
- Tablet: 8-column, 16px gutter
- Mobile: 4-column, 16px gutter

### Tone of Layout
- **Dense enough to feel substantive** — this isn't a luxury minimalist brand
- Service offerings should be scannable and grid-organized (2–3 columns desktop)
- CTAs should appear early (above the fold) and repeat at section breaks
- Trust signals (reviews, certifications, "Licensed & Insured") should be near-header or near-CTA

---

## 7. Brand Voice & Design Personality

| Attribute | Description |
|-----------|-------------|
| **Tone** | Confident, direct, reliable — speaks to homeowners in plain language |
| **Personality** | The trusted neighbor who happens to be a contractor |
| **Avoid** | Corporate jargon, overly formal layouts, pastel palettes, decorative flourishes |
| **Embrace** | Bold type, strong contrast, clear hierarchy, action-oriented copy |

---

## 8. CSS Custom Properties (Ready to Use)

```css
:root {
  /* === BRAND COLORS === */
  --color-primary:        #1E3A5F;   /* Shield Navy */
  --color-primary-dark:   #152D4A;   /* Shield Navy Dark (hover) */
  --color-primary-deeper: #0F1F35;   /* Shield Navy Deeper (active) */
  --color-accent:         #F07A1A;   /* Trade Orange */
  --color-accent-dark:    #D4670F;   /* Trade Orange Dark */
  --color-success:        #4CAF50;   /* Approval Green */
  --color-surface:        #D9DDE3;   /* Soft Silver Background */
  --color-border:         #B0BEC5;   /* Concrete Gray */
  --color-text:           #1A1A2E;   /* Deep Charcoal */
  --color-text-muted:     #5A6A7A;   /* Muted blue-gray for secondary text */
  --color-white:          #FFFFFF;

  /* === TYPOGRAPHY === */
  --font-display:  'Barlow Condensed', 'Oswald', Impact, sans-serif;
  --font-body:     'Inter', 'Roboto', system-ui, sans-serif;
  --font-sub:      'Montserrat', 'Inter', sans-serif;

  /* === SPACING === */
  --space-1:  8px;
  --space-2:  16px;
  --space-3:  24px;
  --space-4:  32px;
  --space-6:  48px;
  --space-8:  64px;
  --space-12: 96px;

  /* === RADIUS === */
  --radius-sm:   4px;
  --radius-md:   6px;
  --radius-lg:   10px;
  --radius-pill: 9999px;

  /* === SHADOWS === */
  --shadow-sm:  0 2px 6px rgba(30, 58, 95, 0.08);
  --shadow-md:  0 4px 16px rgba(30, 58, 95, 0.15);
  --shadow-lg:  0 8px 32px rgba(30, 58, 95, 0.20);
}
```
