# Tub to Shower Funnel Setup

## Lead paths

1. Estimate lead: visitor completes the three-step estimator, sees the thank-you page, and receives a call or text follow-up.
2. Planning guide lead: visitor submits email in the inline or exit offer, receives an immediate PDF download on the thank-you page, and can continue to the estimator.
3. Phone lead: visitor calls from any page CTA.

The page stores only anonymous layout, scope, and attribution data before submission. It does not transmit unfinished contact fields.

## Required GoHighLevel setting

Add `GHL_LOCATION_ID` to `.env.local` and to the Vercel project environment. `GHL_API_KEY` is already present locally. The current token cannot list locations, so the location ID must be copied from the correct GoHighLevel sub-account.

After adding it, restart the app and submit one test lead in each language. Confirm that the contact includes the expected tags and attribution values.

## GoHighLevel workflow

Create one workflow named `Tub to Shower Planning Guide`.

- Trigger: contact tag added, `planning-guide-lead`.
- Branch: `lang-es` sends Spanish. All other guide leads receive English.
- Email 1: send immediately with the matching public PDF link.
  - English: `https://brokeandfixed.com/guides/tub-to-shower-planning-guide-en.pdf`
  - Spanish: `https://brokeandfixed.com/guides/tub-to-shower-planning-guide-es.pdf`
- Email 2: wait two days, then send one useful project-planning note and a link back to the estimator.
- Stop the workflow when the contact gets the `estimate-request` tag, replies, books, or unsubscribes.
- Include the business name, service-area mailing information, and unsubscribe link in every commercial email.

Create a second workflow for completed estimator leads using the tag `tub-to-shower-lead`. Exclude contacts whose only qualifying tag is `planning-guide-lead`. The first action should notify the owners with the chosen layout, scope, ZIP code, planning range, language, and UTM fields.

## Measurement

Use these events in Meta Events Manager and Google Analytics:

- `estimate_cta_click`
- `form_start`
- `form_step`
- `Lead` and `generate_lead` for completed estimators
- `planning_guide_open`
- `PriceGuideLead` for guide email submissions
- `planning_guide_download`
- `phone_click`

Report guide leads and completed estimator leads separately. The primary conversion is a completed estimator. The guide is an assist, not a replacement for the estimate CTA.

