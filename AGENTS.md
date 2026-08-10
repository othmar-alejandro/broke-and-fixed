# Broke & Fixed Home Solutions - Project Guide

## About
Home remodeling company serving Miami-Dade County. Family owned, fully insured (general liability). 6 services across 17 service areas. Bilingual EN/ES.

## Tech Stack
- **Framework**: Next.js App Router (migrating from Vite SPA)
- **Styling**: Tailwind CSS v4 with custom theme
- **Animations**: GSAP + Framer Motion
- **Icons**: Phosphor Icons
- **i18n**: react-i18next (EN/ES)
- **Deployment**: Vercel
- **CRM**: GoHighLevel (Private Integration Token in `.env.local` as `GHL_API_KEY`, gitignored, never committed)
- **Forms**: Web3Forms

## Design System
- **Colors**: Shield Navy (#1E3A5F), Trade Orange (#F07A1A), Approval Green (#4CAF50), Cream (#F8F9FC), Espresso (#0F1F35)
- **Fonts**: Barlow Condensed (display), Inter (body), Montserrat (accents)
- **Style**: Premium, dense, scannable. Dark sections alternate with light. Orange for CTAs and accents.

## Critical Rules

### Language - NEVER VIOLATE
- NEVER use "contractor", "licensed", "general contractor", "contratista", "licenciado" anywhere
- ALWAYS use "remodeling company", "remodeling team", "home renovation company", "fully insured"
- The business does NOT have a contractor's license. It has general liability insurance.

### Writing Style - NEVER VIOLATE
- NO em dashes or en dashes. Use commas, periods, or rewrite.
- NO AI slant: "leverage", "elevate", "streamline", "robust", "comprehensive", "In today's world...", "When it comes to...", "It's worth noting..."
- Write like a real person who knows their trade. Short sentences. Direct. No filler.
- Read it out loud. If it sounds like ChatGPT wrote it, rewrite it.

### SEO Rules
- Every page needs: unique title, meta description, H1, JSON-LD schema, canonical, hreflang, breadcrumbs
- Internal linking is critical: service pages link to location sub-pages and vice versa
- Image alt text must include service + location keywords
- FAQ answers should be 100-200 words (not one-liners)
- robots.txt allows search + AI search crawlers, blocks training-only crawlers

## Business Info
- **Name**: Broke & Fixed Home Solutions
- **Phone**: (786) 363-7039
- **Email**: brokeandfixed305@gmail.com
- **Website**: https://brokeandfixed.com
- **Instagram**: https://www.instagram.com/brokeandfixed/
- **Google Places ID**: ChIJ7VSW8vHbAgMRvNWjsiV5kII
- **Google Review Link**: https://search.google.com/local/writereview?placeid=ChIJ7VSW8vHbAgMRvNWjsiV5kII
- **Address**: Service-area business based in Kendall, FL 33186

## Services
1. Bathroom Remodeling
2. Kitchen Remodeling
3. Interior Painting
4. Exterior Painting
5. Tile Work
6. Exterior Repairs

## Service Areas (17)
Kendall, West Kendall, Palmetto Bay, Doral, The Hammocks, The Crossings, Kendale Lakes, Sweetwater, Cutler Bay, Pinecrest, South Miami, South Miami Heights, Miami Gardens, Westchester, Coral Gables, Country Walk, Coconut Grove

## SEO Plan
See `/Users/othmarcasilla/.Codex/plans/ethereal-booping-sedgewick.md` for the full 7-phase SEO domination plan.

## Memory
Always update memory after completing work. Check `/Users/othmarcasilla/.Codex/projects/-Users-othmarcasilla-broke-and-fixed-305/memory/MEMORY.md` for current state.

## Reference
- Obsidian vault with SEO playbooks: `/Users/othmarcasilla/obsidian and qmd for Codex super/OAC Digital Vault/`
- SEO Playbook (detailed): `/Users/othmarcasilla/OAC Digitial Vault/Othmar PC/SEO Playbook/`
- Marketing skills: `/Users/othmarcasilla/OAC Digitial Vault/Othmar PC/Skills and Frameworks/Skills Index.md`

# context-mode — MANDATORY routing rules

You have context-mode MCP tools available. These rules are NOT optional — they protect your context window from flooding. A single unrouted command can dump 56 KB into context and waste the entire session.

## BLOCKED commands — do NOT attempt these

### curl / wget — BLOCKED
Any Bash command containing `curl` or `wget` is intercepted and replaced with an error message. Do NOT retry.
Instead use:
- `ctx_fetch_and_index(url, source)` to fetch and index web pages
- `ctx_execute(language: "javascript", code: "const r = await fetch(...)")` to run HTTP calls in sandbox

### Inline HTTP — BLOCKED
Any Bash command containing `fetch('http`, `requests.get(`, `requests.post(`, `http.get(`, or `http.request(` is intercepted and replaced with an error message. Do NOT retry with Bash.
Instead use:
- `ctx_execute(language, code)` to run HTTP calls in sandbox — only stdout enters context

### WebFetch — BLOCKED
WebFetch calls are denied entirely. The URL is extracted and you are told to use `ctx_fetch_and_index` instead.
Instead use:
- `ctx_fetch_and_index(url, source)` then `ctx_search(queries)` to query the indexed content

## REDIRECTED tools — use sandbox equivalents

### Bash (>20 lines output)
Bash is ONLY for: `git`, `mkdir`, `rm`, `mv`, `cd`, `ls`, `npm install`, `pip install`, and other short-output commands.
For everything else, use:
- `ctx_batch_execute(commands, queries)` — run multiple commands + search in ONE call
- `ctx_execute(language: "shell", code: "...")` — run in sandbox, only stdout enters context

### Read (for analysis)
If you are reading a file to **Edit** it → Read is correct (Edit needs content in context).
If you are reading to **analyze, explore, or summarize** → use `ctx_execute_file(path, language, code)` instead. Only your printed summary enters context. The raw file content stays in the sandbox.

### Grep (large results)
Grep results can flood context. Use `ctx_execute(language: "shell", code: "grep ...")` to run searches in sandbox. Only your printed summary enters context.

## Tool selection hierarchy

1. **GATHER**: `ctx_batch_execute(commands, queries)` — Primary tool. Runs all commands, auto-indexes output, returns search results. ONE call replaces 30+ individual calls.
2. **FOLLOW-UP**: `ctx_search(queries: ["q1", "q2", ...])` — Query indexed content. Pass ALL questions as array in ONE call.
3. **PROCESSING**: `ctx_execute(language, code)` | `ctx_execute_file(path, language, code)` — Sandbox execution. Only stdout enters context.
4. **WEB**: `ctx_fetch_and_index(url, source)` then `ctx_search(queries)` — Fetch, chunk, index, query. Raw HTML never enters context.
5. **INDEX**: `ctx_index(content, source)` — Store content in FTS5 knowledge base for later search.

## Subagent routing

When spawning subagents (Agent/Task tool), the routing block is automatically injected into their prompt. Bash-type subagents are upgraded to general-purpose so they have access to MCP tools. You do NOT need to manually instruct subagents about context-mode.

## Output constraints

- Keep responses under 500 words.
- Write artifacts (code, configs, PRDs) to FILES — never return them as inline text. Return only: file path + 1-line description.
- When indexing content, use descriptive source labels so others can `ctx_search(source: "label")` later.

## ctx commands

| Command | Action |
|---------|--------|
| `ctx stats` | Call the `ctx_stats` MCP tool and display the full output verbatim |
| `ctx doctor` | Call the `ctx_doctor` MCP tool, run the returned shell command, display as checklist |
| `ctx upgrade` | Call the `ctx_upgrade` MCP tool, run the returned shell command, display as checklist |
