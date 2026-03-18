# Typography Guide — Broke & Fixed Home Solutions

## Font Families

### 1. Display / Brand Font — Barlow Condensed
Used for: Hero headlines, section titles, brand name, CTA buttons

```html
<!-- Google Fonts import -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700&family=Inter:wght@400;500;600&family=Montserrat:wght@400;500;600&display=swap" rel="stylesheet">
```

```css
/* Or via @import */
@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700&family=Inter:wght@400;500;600&family=Montserrat:wght@400;500;600&display=swap');
```

**Why Barlow Condensed?**
The "BROKE & FIXED" wordmark uses a bold, condensed sans-serif with even stroke widths. Barlow Condensed Bold (700) is the closest Google Fonts match — it matches the logo's weight, width, and overall authority.

---

### 2. Sub-heading / Label Font — Montserrat
Used for: "HOME SOLUTIONS" tagline style, navigation, service categories, tracked labels

**Why Montserrat?**
The "HOME SOLUTIONS" text in the logo uses a regular-weight, wide-tracked, all-caps style. Montserrat Regular + `letter-spacing: 0.18–0.22em` + `text-transform: uppercase` perfectly replicates this.

---

### 3. Body Font — Inter
Used for: Body copy, descriptions, forms, metadata, UI labels

**Why Inter?**
Clean, highly legible at small sizes, designed for screens. Goes well with the bold display font without competing.

---

## Type Scale

| Role | Font | Weight | Size (desktop) | Size (mobile) | Letter-spacing | Line Height |
|------|------|--------|---------------|--------------|----------------|-------------|
| H1 — Hero | Barlow Condensed | 700 | 56–72px | 38–44px | 0.01em | 1.1 |
| H2 — Section | Barlow Condensed | 700 | 40–48px | 28–34px | 0.01em | 1.15 |
| H3 — Sub-section | Barlow Condensed | 600 | 28–34px | 22–26px | 0em | 1.2 |
| Tagline | Montserrat | 400 | 14–16px | 12–14px | 0.20em | 1.5 |
| Nav Link | Montserrat | 500 | 14px | 14px | 0.12em | 1 |
| Body | Inter | 400 | 16px | 15px | 0em | 1.625 |
| Body Strong | Inter | 600 | 16px | 15px | 0em | 1.625 |
| Caption / Meta | Inter | 400 | 13px | 12px | 0.01em | 1.4 |
| Button | Barlow Condensed | 600 | 16–18px | 15–16px | 0.06em | 1 |
| Badge / Tag | Montserrat | 600 | 11–12px | 11px | 0.1em | 1 |

---

## CSS Implementation

```css
/* =============================================
   BASE TYPOGRAPHIC SYSTEM
============================================= */

body {
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.625;
  color: #1A1A2E;
  -webkit-font-smoothing: antialiased;
}

/* --- Headings --- */
h1, h2, h3, h4 {
  font-family: 'Barlow Condensed', 'Oswald', Impact, sans-serif;
  font-weight: 700;
  line-height: 1.1;
  color: #1E3A5F;
  text-transform: uppercase;
  letter-spacing: 0.01em;
}

h1 { font-size: clamp(2.5rem, 6vw, 4.5rem); }
h2 { font-size: clamp(1.875rem, 4vw, 3rem); }
h3 { font-size: clamp(1.5rem, 3vw, 2rem); font-weight: 600; }
h4 { font-size: clamp(1.25rem, 2vw, 1.5rem); font-weight: 600; text-transform: none; letter-spacing: 0; }

/* --- Tagline / Sub-label style --- */
.tagline,
.eyebrow {
  font-family: 'Montserrat', sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.20em;
  color: #5A6A7A;
}

/* --- Navigation --- */
nav a {
  font-family: 'Montserrat', sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: #FFFFFF;
  text-decoration: none;
}

/* --- Buttons --- */
.btn {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

/* --- Body emphasis --- */
strong, b { font-weight: 600; }
small      { font-size: 0.8125rem; color: #5A6A7A; }
```

---

## Pairing Examples

### Hero Section
```
RESTORE YOUR HOME'S BEST    ← Barlow Condensed 700, 64px, #1E3A5F
────────────────────────
HOME REPAIR & RENOVATION     ← Montserrat 400, 14px, #5A6A7A, letter-spacing: 0.2em
```

### Service Card
```
ROOF REPAIRS                 ← Barlow Condensed 700, 28px, #1E3A5F
────────
Fast, affordable roofing...  ← Inter 400, 16px, #1A1A2E
```

### CTA Button
```
[ GET A FREE QUOTE ]         ← Barlow Condensed 600, 18px, uppercase, #FFFFFF on #1E3A5F
```

---

## Font Loading Best Practices

```html
<!-- Preload the display font for fastest render -->
<link rel="preload" href="https://fonts.gstatic.com/..." as="font" type="font/woff2" crossorigin>

<!-- ✅ Use display=swap to prevent invisible text while loading -->
<link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700&family=Inter:wght@400;500;600&family=Montserrat:wght@400;500;600&display=swap" rel="stylesheet">
```
