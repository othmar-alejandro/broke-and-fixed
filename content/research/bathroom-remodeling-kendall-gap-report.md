# Gap Report: "bathroom remodeling Kendall"

Run date: 2026-06-17. Skill: transcript-keyword-mining.
Scope: service `bathroom-remodeling` x location `kendall`.

## Method note (read this)

YouTube is blocked by this sandbox's network egress, so step 2 (transcript
pull via yt-dlp/Apify) did not run here. Buyer questions were instead mined
from server-side web search of the top-ranking Miami bathroom-remodel cost
pages and "people also ask" style results. Run the skill from a local Claude
Code session to add real video transcripts on top of this. Treat the cost
figures below as competitor-reported, not ours; verify before publishing.

## Headline finding

This cluster is saturated. Of the 11 high-intent themes buyers ask about, 9
are already COVERED, often with a dedicated post AND a long-tail guide. Writing
another "bathroom remodel cost Kendall" article would be redundant and risks
keyword cannibalization with the existing cost guide. The leverage is NOT more
bathroom-cost content. It is (a) the two narrow gaps below, and (b) off-site
citations (see LOCAL-CITATIONS-CHECKLIST.md).

## Gap table

| Theme | Intent | Status | Where it already lives |
|---|---|---|---|
| Cost tiers for Kendall bathroom | High | COVERED | `2026-05-20-bathroom-remodeling-kendall-cost-guide.md` (3 tiers, case studies) |
| Project timeline / how long | High | COVERED | Kendall guide week-by-week + FAQ in `faqs.ts` |
| Walk-in / tub-to-shower conversion | High | COVERED | `long-tail-bathroom.ts` guide + `2026-05-01-walk-in-shower-vs-bathtub-miami.md` |
| Small bathroom remodel | Med | COVERED | `2026-05-01-small-bathroom-remodel-ideas-miami.md` |
| HB 803 permit exemption | High | COVERED | 8 HB 803 posts |
| HOA approval | Med | COVERED | `miami-hoa-renovation-approval-guide.md` + `hoa-approval-vs-permit-miami.md` |
| Financing | Med | COVERED | `home-remodel-financing-miami.md` |
| Accessible / aging-in-place bath | Med | COVERED | `2026-05-01-accessible-bathroom-design-miami.md` |
| Materials / fixtures / vanity | Med | COVERED | `bathroom-vanity-guide.md`, Kendall guide |
| **Bathroom remodel ROI / resale value** | **High** | **MISSING** | Kitchen has `kitchen-remodel-roi-miami.md`; bathroom has none |
| **Permit cost + approval timeline for work that DOES need a permit** | **High** | **THIN** | Scattered inside HB 803 (exemption) posts; no standalone for the homeowner whose layout-change job still needs permits |

## The two gaps worth filling

### Gap 1 (MISSING, high intent): Bathroom remodel ROI / resale value in Miami

We tell people what a bathroom costs but never what they get back. The kitchen
cluster already has an ROI post and it is a strong internal-link hub. Bathrooms
need the same.

- Working title (EN): "What a Bathroom Remodel Adds to Your Miami Home Value"
- Working title (ES): "Cuanto Valor Suma una Remodelacion de Bano a Tu Casa en Miami"
- Target keyword: `bathroom remodel resale value miami` / `bathroom remodel roi miami`
- Outline:
  - H2: Does a bathroom remodel pay off when you sell in Miami-Dade?
  - H2: Resale value by project tier (refresh vs mid-range vs full gut)
  - H2: What Miami buyers actually look for in a bathroom (humidity, mold-proofing, walk-in showers)
  - H2: Remodel for yourself vs remodel to sell (different choices)
  - H2: The mistakes that hurt resale (over-personalizing, cheap waterproofing)
  - H2: FAQ
- Internal links: from `kitchen-remodel-roi-miami.md`, the Kendall cost guide,
  `/en/services/bathroom-remodeling`, and `remodeling-vs-moving-miami.md`.

### Gap 2 (THIN, high intent): Plain permit cost + approval timeline for permitted bathroom work

The HB 803 posts answer "when you DON'T need a permit." Nothing cleanly answers
the homeowner moving plumbing or a wall, who DOES need one, and is asking "what
will the permit cost and how long until I can start?" Competitors rank with
exactly this ($325-$425 across 2-3 permits, 2-6 week Miami-Dade approval).

- Working title (EN): "Bathroom Remodel Permits in Miami-Dade: Cost and Timeline (2026)"
- Working title (ES): "Permisos para Remodelar el Bano en Miami-Dade: Costo y Tiempo (2026)"
- Target keyword: `bathroom remodel permit cost miami dade`
- Outline:
  - H2: When a bathroom remodel needs a permit (and when HB 803 exempts you)
  - H2: Which permits you need (plumbing, electrical, building) and what each runs
  - H2: How long Miami-Dade approval takes right now, and why the backlog happens
  - H2: Private provider option to skip the county queue (link HB 803 private-provider post)
  - H2: What we handle for you vs what the homeowner signs
  - H2: FAQ
- Internal links: cross-link every HB 803 post, the Kendall cost guide, and
  `hoa-approval-vs-permit-miami.md`. This becomes the hub for the permit subtopic.

## FAQ additions for `lib/data/faqs.ts` (bathroom-remodeling)

The existing "What about permits?" answer is one of the few one-liners in the
file and is THIN versus the 100-200 word standard. Suggested replacements/adds
(write in our voice, fully insured, never "contractor/licensed"):

1. Expand "What about permits?" to name the plumbing/electrical/building split,
   the rough fee range, and that we pull and manage them so the homeowner does
   not deal with the county.
2. New: "Will a bathroom remodel raise my home value?" (short version of Gap 1,
   links to the new post once published).
3. New: "How long does permit approval take in Miami-Dade?" (sets the 2-6 week
   expectation, mentions the private-provider shortcut).

## Sources

- https://fabsremodeling.com/bathroom-remodeling-cost-miami/
- https://fabsremodeling.com/what-permits-required-home-remodeling-miami-dade/
- https://tmgroupdc.com/blog/bathroom-remodel-cost-in-miami-fl-2026-pricing-breakdown/
- https://sweeten.com/blog/home-renovation-cost-guides/bathroom-miami/
- https://www.blockrenovation.com/guides/miami-florida-bathroom-remodeling-costs-local
- https://permitcalculator.com/cities/miami-fl/
