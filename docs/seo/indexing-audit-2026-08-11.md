# Indexing and Analytics Audit

**Date:** August 11, 2026
**Site:** `https://brokeandfixed.com`
**Campaign:** Kendall corridor tub-to-shower pages

## What is current in the build

- The main generated sitemap contains 552 URLs.
- The tub-to-shower campaign contributes 32 URLs, two core landing pages plus 15 locations in English and Spanish.
- The campaign XML export is available at `docs/seo/tub-to-shower-sitemap.xml`.
- The deployed XML endpoint will be `https://brokeandfixed.com/tub-to-shower-sitemap.xml`.
- Homestead is not in the campaign sitemap.
- The full production build passed and generated all 30 location pages.

## Google Search Console state

The local machine does not currently have `GSC_ACCESS_TOKEN`, so the Google Search Console CLI cannot read coverage, inspect URLs, list sitemaps, or submit a sitemap from this session.

The saved project record says:

- The last known property was the `https://www.brokeandfixed.com/` URL-prefix property.
- The codebase and canonical URLs use the apex host, `https://brokeandfixed.com`.
- The last recorded sitemap report showed 504 discovered pages, submitted May 21, 2026 and last read June 26, 2026.
- The recommended next step was to use a Domain property or the apex URL-prefix property, then resubmit the sitemap after confirming the host configuration.
- Historical query data showed Kendall remodeling intent as the useful human signal. The large query cluster around “miami bathroom remodeling plumbing services” was flagged as rank-tracker or bot noise.

No Search Console changes were made because the current API credential is not present.

## Bing Webmaster state

No Bing Webmaster API credential or local connector artifact was found. The repository does have IndexNow support with a verified key file and a script that can ping the live sitemap after deployment. Do not ping the new URLs until the deployment is live. After deploy, run:

```bash
npm run indexnow -- /en/landing/tub-to-shower/kendall /es/landing/tub-to-shower/kendall
```

Or submit the full live sitemap through the existing script:

```bash
npm run indexnow
```

## Clarity state

The Clarity export API is connected locally. The last three-day page report showed:

- 33 total sessions
- 20 bot sessions
- 36 distinct users reported by the export
- 1.56 pages per session
- 27.42 percent average scroll depth
- 12 visits to the live English tub-to-shower landing page
- 10 visits to `localhost:3000/en/landing/tub-to-shower`
- 4 visits to `localhost:3000/es/landing/tub-to-shower`
- 3 sessions referred by Google

The report is polluted by localhost, Electron, preview, and bot traffic. Treat the production landing page signal as directional until local development traffic is excluded or filtered in reporting.

## 404 and redirect state

The last saved full crawl audit reported zero broken internal links and 510 of 510 sitemap URLs returning HTTP 200. The new 32 campaign URLs are build-verified, but they still need a production deploy before a live HTTP audit can confirm them.

The canonical host is the apex domain. The `www` host should continue redirecting permanently to the apex. Keep the sitemap, canonicals, Open Graph URLs, and hreflang URLs on the apex host.

## Post-deploy checklist

1. Open `https://brokeandfixed.com/tub-to-shower-sitemap.xml` and confirm 32 URL entries.
2. Open three English and three Spanish location pages and confirm HTTP 200, canonical, hreflang, BreadcrumbList, Service, and FAQPage markup.
3. Submit the apex sitemap in Google Search Console.
4. Submit the campaign sitemap URL if the property accepts multiple sitemaps.
5. Run IndexNow for the campaign URLs after production is live.
6. Re-run the full internal-link and sitemap crawl.
7. Inspect the Kendall hub and a sample of location URLs in Search Console after Google processes the sitemap.
