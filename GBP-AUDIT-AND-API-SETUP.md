# Google Business Profile: Audit + API Automation Setup

Owner account: **brokeandfixed305@gmail.com** · Places ID: `ChIJ7VSW8vHbAgMRvNWjsiV5kII`
Live owner view: Google Search → "Broke and Fixed Home Solutions" (you manage it).

---

## Part 1 — Profile audit (what's there vs missing)

Captured live from the owner dashboard on 2026-06-09.

| Field | State | Action |
|---|---|---|
| **Primary category** | WAS "General contractor" (rule violation). **Pending edit → "Remodeler"**, General contractor removed. | ✅ Fixed, awaiting Google review |
| Secondary categories | Painter, Kitchen remodeler, Bathroom remodeler, Building restoration service (5 total) | Room for ~5 more (Google allows 10); add in validation pass |
| **Service areas** | Only **"The Crossings and nearby areas"** showing | ❗ Biggest gap. Build out to ~17–20 (Kendall, West Kendall, Doral, Palmetto Bay, etc.) |
| **Description** | Placeholder: *"Call us today to learn more!"* | ❗ Rewrite: keyword-rich, 750 chars, no "contractor" |
| Reviews | 4.8★, **6 reviews** | Below the 10-review floor; needs a review engine + velocity (~8/mo) |
| Phone | (786) 363-7039 | ✅ |
| Website | brokeandfixed.com | ✅ |
| Chat | SMS + WhatsApp (wa.me/7863637039) | ✅ |
| Hours | Closes 7PM | ✅ |
| Opening date | Jan 1, 2023 | ✅ (qualifies for API: 60+ days active) |
| Services list | Not yet audited (Edit services tab) | Pending |
| Products | Not yet audited | Pending |
| Photos | Count not yet confirmed | Target 100+ (video: up to 520% more calls) |
| Posts | Not posting | Automate after API approval |

---

## Part 2 — API automation status

Goal: read + write the profile programmatically (categories, services, areas, description, posts, review replies) so edits and weekly posting run hands-off.

**Done:**
- ✅ GCP project `broke-fixed-gbp-305` created (project number **659522661382**) under brokeandfixed305@gmail.com
- ✅ Enabled: `mybusinessbusinessinformation.googleapis.com`, `mybusinessaccountmanagement.googleapis.com`

- ✅ OAuth + read scripts written (zero dependencies, Node 22):
  - `scripts/gbp-auth.mjs` — one-time browser authorize, saves refresh token to `.env.local`
  - `scripts/gbp-read.mjs` — prints live categories, pending-edit flag, service areas, description
  - `scripts/lib/gbp.mjs` — env loading + token refresh shared by both

**Remaining:**
1. **Create the OAuth client** — GCP Console → project `broke-fixed-gbp-305` → APIs & Services → Credentials → Create credentials → OAuth client ID → **Desktop app**. Add the two values to `.env.local` as `GBP_CLIENT_ID` and `GBP_CLIENT_SECRET`. On the OAuth consent screen (External, Testing), add brokeandfixed305@gmail.com as a test user.
2. **Authorize once:** `node scripts/gbp-auth.mjs` — sign in as brokeandfixed305@gmail.com. Uses a loopback redirect on `127.0.0.1:3111` with PKCE.
3. **Submit Google's access form** (the real gate — see Part 3). Only an owner/manager can submit. Until it's approved, `gbp-read.mjs` returns 403 with a quota message; that's expected, not a bug in the scripts.
4. **Wait for approval** — confirmed by email; or check the project's Business Profile API quota (300 QPM = approved, 0 = pending).
5. **Verify:** `node scripts/gbp-read.mjs`. The `Pending edits` line tells you whether the Remodeler category change is still in Google's review queue.
6. **Write scripts** (set category, services, areas, description) — not written yet, deliberately. Posts + review replies use the v4 LocalPosts/Reviews APIs.

---

## Part 3 — Access request form (copy-paste)

Form: **https://support.google.com/business/contact/api_default**
Dropdown: select **"Application for Basic API Access."**
Submit while signed in as **brokeandfixed305@gmail.com** (must be an owner/manager on the GBP).

Field answers:
- **Project number:** 659522661382
- **Project ID:** broke-fixed-gbp-305
- **Business name:** Broke & Fixed Home Solutions
- **Website:** https://brokeandfixed.com
- **Country:** United States
- **Number of locations:** 1 (self-managed, not an agency)
- **Use case:**
  > Broke & Fixed Home Solutions is a family-owned home remodeling company serving Miami-Dade County. We manage our own verified Google Business Profile and need API access to keep it current: update business information and service areas, publish regular local posts, and reply to customer reviews promptly. Single self-managed location with one website (brokeandfixed.com).

Note: Google recommends the profile be complete before review, so finishing Part 1 (service areas, description) improves approval odds.

---

## Recommended order
1. Submit the access form now (starts the approval clock; you qualify today).
2. Complete the profile (service areas + description first) — helps approval AND is the core SEO work.
3. On approval, switch on hands-off posting + review replies via the API.
