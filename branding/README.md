# Broke & Fixed Home Solutions — Branding Kit

## What's in this folder

```
branding/
├── DESIGN.md        # Full design system — atmosphere, colors, components, layout
├── TYPOGRAPHY.md    # Font choices, scale, Google Fonts imports, CSS
├── tokens.css       # CSS custom properties — drop into any project
├── palette.json     # Color palette for design tools and Tailwind config
└── README.md        # This file
```

---

## Quick Reference Card

### Core Colors
| Swatch | Name | Hex | Use |
|--------|------|-----|-----|
| 🟦 | Shield Navy | `#1E3A5F` | Primary — backgrounds, headlines, nav |
| 🟧 | Trade Orange | `#F07A1A` | Accent — roofline, CTAs, highlights |
| 🟩 | Approval Green | `#4CAF50` | Success — checkmarks, confirmations |
| ⬜ | Soft Silver | `#D9DDE3` | Surface — cards, section backgrounds |
| ⬛ | Deep Charcoal | `#1A1A2E` | Text — body copy |

### Core Fonts (Google Fonts)
| Font | Weight | Use |
|------|--------|-----|
| Barlow Condensed | 600, 700 | Headlines, brand name, buttons |
| Montserrat | 400, 500, 600 | Taglines, nav, labels |
| Inter | 400, 500, 600 | Body text, descriptions |

### Import in 1 line
```html
<link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700&family=Inter:wght@400;500;600&family=Montserrat:wght@400;500;600&display=swap" rel="stylesheet">
```

### Use tokens in your CSS
```css
@import './branding/tokens.css';

.hero {
  background: var(--color-primary);
  font-family: var(--font-display);
  color: var(--color-white);
  padding: var(--space-12) var(--space-4);
}
```

---

## Brand Personality
> **"The trusted neighbor who happens to be a contractor."**

- Bold, direct, and reliable
- Speaks plain language to homeowners
- Structural and angular (not soft/rounded)
- Orange = urgency + energy, Navy = trust + stability

---

## Logo Usage
- Logo file: `../public/logo.jpg`
- Minimum size: 120px wide (to preserve legibility of shield detail)
- Clear space: maintain 16px+ padding on all sides
- Preferred backgrounds: White, Soft Silver (`#D9DDE3`), or Shield Navy (`#1E3A5F`)
- Do not place on busy photographic backgrounds without an overlay
