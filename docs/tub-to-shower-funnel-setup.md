# Tub to Shower Funnel Setup

## Lead paths

1. Estimate lead: visitor completes the three-step estimator, sees the thank-you page, and receives a call or text follow-up.
2. Planning guide lead: visitor submits email in the inline or exit offer, receives an immediate PDF download on the thank-you page, and can continue to the estimator.
3. Phone lead: visitor calls from any page CTA.

The page stores only anonymous layout, scope, and attribution data before submission. It does not transmit unfinished contact fields.

## Live GoHighLevel setup

The connected sub-account is `Broke and Fixed Home Solutions`, location `BubbBDEstaWhTJReHDcG`. `GHL_API_KEY` and `GHL_LOCATION_ID` are configured locally and in the Vercel production environment.

Seven funnel tags and fourteen contact fields are live. The production estimator was tested with a controlled contact on August 10, 2026. GoHighLevel received the exact layout, scope, planning range, source, language, Meta tag, UTM values, click ID, and landing URL. The QA contact was deleted after verification.

The GHL MCP cannot create pipelines or workflows. Two existing pipelines are available. Use `Main Pipeline` (`o4y21VMkOnoU1iPoRRXZ`) and its `New Lead` stage (`2aee1dde-71a8-4908-93af-b8e56cb1574d`) when the estimator workflow is built in the GHL interface.

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

The sub-account currently exposes no email or SMS conversation provider. Configure a sending email service and phone service before publishing either follow-up workflow. Keep both workflows in draft until one English and one Spanish test completes successfully.

## Meta Ads status

- Ad account: `882094667972705`, Broke and Fixed, active, USD.
- Business: `2553821644995338`.
- Dataset: `1564050852174212`, Brokie.
- Facebook Page: `1099333583269076`, Broke and Fixed.
- The live landing page initializes dataset `1564050852174212`. A production browser check received HTTP 200 for both the Brokie config request and its `PageView` event.
- The ad account is active and reports `has_payment_method: true`.
- The Page is owned by the correct business. The connector's ad-account Page endpoint returns no promoted Pages, so it cannot verify the Page association from that endpoint.
- Instagram identity is not available through the connector.
- Campaign, ad set, and ad creation through Claude always starts paused and requires connector approval.

A paused website-leads shell was created on August 10, 2026:

- Campaign `120255036342850397`: `B&F | Tub-to-Shower | Miami-Dade | Website Leads | Test 01`.
- Ad set `120255036345770397`: `Miami-Dade | Broad | 35-65+ | Website Lead`.
- Stored budget: $30 per day. Nothing can spend while paused.
- Optimization: website `Lead` on dataset `1564050852174212`.
- Attribution: 7-day click and 1-day view.
- Geography: 25-mile radius around Kendall.
- The fresh entity read reports ages 18 to 65 with Advantage+ expansion. The ad set name still says 35-65+.
- No ad exists yet.

Before delivery can start, confirm the Page identity at ad creation and connect the correct Instagram identity if Instagram placements will be used. Payment is already present.

Do not create or activate the ad until a real browser submission appears as `Lead` in Events Manager. The thank-you page now fires the conversion after navigation and only once per submitted session. Headless QA confirmed the event call and dedupe marker, but Meta did not record the headless event.

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
