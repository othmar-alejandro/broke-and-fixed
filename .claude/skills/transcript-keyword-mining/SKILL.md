---
name: transcript-keyword-mining
description: Mine top-ranking YouTube and competitor transcripts for keyword and question gaps, then turn them into blog post outlines that match Broke & Fixed voice. Use when researching new content angles for a service or location (e.g. "find content gaps for bathroom remodeling Kendall"), planning the next batch of blog posts, or auditing whether a topic cluster is missing common buyer questions.
---

# Transcript Keyword Mining

Steal the questions real Miami homeowners ask. Top-ranking YouTube videos and
competitor pages already did the audience research. This skill pulls their
transcripts and copy, extracts the questions and subtopics they cover, checks
those against what we already publish, and hands back a gap list plus blog
outlines written in our voice.

This is the one tactic from the "Claude Code SEO" videos we had not been
running. The mechanics are real; the influencer click numbers are not. Treat
output as a research input, not a publish-ready draft.

## When to use

- Planning the next batch of blog posts for a service or location.
- A service x city page feels thin and you want real buyer questions to add.
- Checking whether a topic cluster (e.g. HB 803, kitchen cost) is missing
  obvious questions.

## Inputs you need from the user

1. A topic or seed keyword, e.g. `bathroom remodeling cost Miami`.
2. Optional: a specific service slug and/or location slug to scope the gap check.

If the user only gives a vague ask, pick the most relevant service from
`lib/data/services.ts` and the highest-priority location from
`lib/data/locations.ts` and state your choice.

## Workflow

### 1. Find the source videos and pages
- Use WebSearch for the seed keyword plus `youtube`, and for the plain keyword,
  to collect the top 5-10 ranking videos and the top 5 competitor articles.
- Prefer videos with 50k+ views and articles ranking on page 1. Established
  results reflect what Google already rewards for this query.
- Record each URL. Do not guess at content you cannot retrieve.

### 2. Pull transcripts and copy
- Run the helper: `python3 .claude/skills/transcript-keyword-mining/scripts/fetch_transcripts.py "<video_url_1>" "<video_url_2>" ...`
  It writes plain-text transcripts to `.cache/transcripts/`.
- The helper tries `yt-dlp` (auto-subtitles) first, then an Apify YouTube
  transcript actor if `APIFY_TOKEN` is set in the environment. If neither is
  available it prints setup instructions and exits non-zero. Do not fabricate
  a transcript; tell the user what to install.
- For competitor articles, use WebFetch to pull the page text.

Note: in the Claude Code on the web sandbox, `youtube.com` is usually blocked
by network egress. Run this skill from a local Claude Code session, or have the
user paste transcripts directly.

### 3. Extract questions and subtopics
- From each transcript and article, pull every concrete question, objection,
  cost figure, material name, brand, code/permit reference, and step.
- Group them into themes. Note frequency: a question asked across multiple
  sources is high intent.

### 4. Diff against what we already publish
- Search existing content for each theme:
  - `content/blog/*.md` (titles and bodies)
  - `lib/data/faqs.ts`, `lib/data/long-tail-*.ts`, `lib/data/service-location-content*.ts`
  - `lib/data/content-index.ts` for the published map
- Mark each theme as: COVERED, THIN (mentioned, under 100 words), or MISSING.

### 5. Output
Produce a markdown report with:
- A gap table: theme | intent (high/med/low) | status | source count
- For the top 5 MISSING or THIN gaps, a blog outline: working title (EN + ES),
  target keyword, H2/H3 structure, and which existing pages should link to it
  (internal linking is required, see CLAUDE.md SEO rules).
- A note on any new FAQ entries to add to `lib/data/faqs.ts`.

Save the report to `content/research/<seed-keyword>-gap-report.md`.

## Voice and compliance rules (NEVER violate, from CLAUDE.md)

- NEVER write "contractor", "licensed", "general contractor", "contratista",
  "licenciado". Use "remodeling company", "remodeling team", "fully insured".
- NO em dashes or en dashes. Commas, periods, or rewrite.
- NO AI slant words: leverage, elevate, streamline, robust, comprehensive,
  "In today's world", "When it comes to", "It's worth noting".
- Short, direct sentences. Sound like someone who knows the trade.
- FAQ answers 100-200 words, not one-liners.

## Guardrails

- Do not copy competitor sentences. Extract the question, write our own answer.
- Cite every source URL in the report so claims are traceable.
- If you cannot retrieve a transcript, say so. Never invent quotes, view counts,
  or cost figures.
