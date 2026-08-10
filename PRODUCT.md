# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Miami-Dade homeowners planning bathroom changes, including older adults and families who want easier daily access, simpler cleaning, clearer pricing, and a local team they can reach directly. The experience must work in English and Spanish, with strong mobile usability for paid social traffic.

## Product Purpose

Broke & Fixed Home Solutions helps homeowners understand their tub-to-shower options, see honest starting figures, receive a useful planning guide, and request a project-specific price range. Success means a visitor can decide on the right next step without a high-pressure sales visit.

## Positioning

A family-owned, fully insured Miami-Dade remodeling company that publishes starting figures, shows real local work, explains the build, and has an owner present during the job.

## Operating Context

Visitors commonly arrive from Meta ads on a phone. Some are ready to request a price range. Others are researching safer access, easier cleaning, timing, and cost. The funnel must serve both groups without mixing the high-intent estimate action with the lower-intent guide download.

## Capabilities and Constraints

- Next.js App Router with English and Spanish routes.
- Prices are single-sourced from `lib/landing/quote-pricing.ts`.
- Lead records flow through `/api/lead` to GoHighLevel, with Web3Forms fallback behavior.
- The main estimate uses two visual choices followed by contact details.
- The planning guide must be available immediately after opt-in and through a GoHighLevel follow-up workflow.
- Personal information must not be transmitted silently before a clear visitor action.
- Anonymous form progress may be tracked to measure drop-off.
- Published figures are starting points, not firm project prices.

## Brand Commitments

Direct, bilingual trade language. Short sentences. No hype, fake countdowns, or pressure tactics. Use real project photography, the existing navy and orange identity, and the approved company name, phone, and service-area facts.

## Evidence on Hand

- Real tub-to-shower project photography under `public/images/`.
- Google rating and review links in the landing page.
- Owner-confirmed starting figures of $4,500, $6,500, and $9,500.
- Existing bilingual landing page, quote form, pricing logic, CRM route, and exit-intent component.
- No confirmed outbound guide email workflow is present in the repository.

## Product Principles

- Lead with the homeowner outcome, then explain the work.
- Publish useful information before asking for contact details.
- Keep the estimate path and guide path distinct.
- Make every promise deliverable immediately.
- Measure anonymous behavior without surprising visitors with hidden personal-data capture.

## Accessibility & Inclusion

Support keyboard navigation, reduced motion, clear focus states, large touch targets, readable contrast, plain English and Spanish, and layouts that remain usable at 200 percent zoom.
