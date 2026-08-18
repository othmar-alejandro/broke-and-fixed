#!/usr/bin/env node

import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'

const tokenFile =
  process.env.HERMES_GOOGLE_TOKEN_FILE ||
  path.join(os.homedir(), '.hermes', 'google_token.json')
const sitePreference = process.env.GSC_SITE_URL
const days = Number(process.env.GSC_REPORT_DAYS || 7)
const inspectUrl = process.env.GSC_INSPECT_URL

function isoDate(date) {
  return date.toISOString().slice(0, 10)
}

const end = new Date()
end.setUTCDate(end.getUTCDate() - 2)
const start = new Date(end)
start.setUTCDate(start.getUTCDate() - (days - 1))

async function readTokenFile() {
  return JSON.parse(await fs.readFile(tokenFile, 'utf8'))
}

async function refreshAccessToken(credentials) {
  const body = new URLSearchParams({
    client_id: credentials.client_id,
    client_secret: credentials.client_secret,
    refresh_token: credentials.refresh_token,
    grant_type: 'refresh_token',
  })
  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  })
  const data = await response.json()
  if (!response.ok || !data.access_token) {
    throw new Error('Google OAuth refresh failed with HTTP ' + response.status)
  }
  return data.access_token
}

async function gscRequest(accessToken, url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: {
      Authorization: 'Bearer ' + accessToken,
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  })
  const data = await response.json()
  if (!response.ok) {
    throw new Error(
      'GSC request failed with HTTP ' +
        response.status +
        ': ' +
        (data.error?.message || 'unknown error'),
    )
  }
  return data
}

function totals(rows) {
  return rows.reduce(
    (sum, row) => ({
      clicks: sum.clicks + Number(row.clicks || 0),
      impressions: sum.impressions + Number(row.impressions || 0),
      ctr: 0,
      positionTotal: sum.positionTotal + Number(row.position || 0) * Number(row.impressions || 0),
    }),
    { clicks: 0, impressions: 0, ctr: 0, positionTotal: 0 },
  )
}

function formatRows(rows, key) {
  return rows.slice(0, 15).map((row) => ({
    [key]: row.keys?.[0] || '(unknown)',
    clicks: row.clicks,
    impressions: row.impressions,
    ctr: Number(row.ctr || 0),
    position: Number(row.position || 0),
  }))
}

async function query(accessToken, siteUrl, dimensions, extra = {}) {
  const encodedSite = encodeURIComponent(siteUrl)
  return gscRequest(
    accessToken,
    'https://www.googleapis.com/webmasters/v3/sites/' +
      encodedSite +
      '/searchAnalytics/query',
    {
      method: 'POST',
      body: JSON.stringify({
        startDate: isoDate(start),
        endDate: isoDate(end),
        dimensions,
        rowLimit: 25000,
        dataState: 'final',
        ...extra,
      }),
    },
  )
}

try {
  const credentials = await readTokenFile()
  const accessToken = await refreshAccessToken(credentials)
  const sitesData = await gscRequest(
    accessToken,
    'https://www.googleapis.com/webmasters/v3/sites',
  )
  const sites = (sitesData.siteEntry || []).map((site) => ({
    siteUrl: site.siteUrl,
    permissionLevel: site.permissionLevel,
  }))
  const siteUrl =
    sitePreference ||
    sites.find((site) => site.siteUrl === 'https://www.brokeandfixed.com/')?.siteUrl ||
    sites.find((site) => site.siteUrl === 'https://brokeandfixed.com/')?.siteUrl

  if (!siteUrl) {
    console.log(JSON.stringify({ window: { start: isoDate(start), end: isoDate(end) }, sites }))
    process.exit(0)
  }

  const encodedSite = encodeURIComponent(siteUrl)
  const [dateData, queryData, pageData, campaignPageData, sitemapsData] = await Promise.all([
    query(accessToken, siteUrl, ['date']),
    query(accessToken, siteUrl, ['query']),
    query(accessToken, siteUrl, ['page']),
    query(accessToken, siteUrl, ['page'], {
      dimensionFilterGroups: [
        {
          filters: [{ dimension: 'page', operator: 'contains', expression: 'tub-to-shower' }],
        },
      ],
    }),
    gscRequest(
      accessToken,
      'https://www.googleapis.com/webmasters/v3/sites/' + encodedSite + '/sitemaps',
    ),
  ])

  const dateRows = dateData.rows || []
  const queryRows = queryData.rows || []
  const pageRows = pageData.rows || []
  const campaignRows = campaignPageData.rows || []
  const summary = totals(dateRows)
  let inspection = null
  if (inspectUrl) {
    inspection = await gscRequest(
      accessToken,
      'https://searchconsole.googleapis.com/v1/urlInspection/index:inspect',
      {
        method: 'POST',
        body: JSON.stringify({
          inspectionUrl: inspectUrl,
          siteUrl,
        }),
      },
    )
  }

  console.log(
    JSON.stringify(
      {
        window: { start: isoDate(start), end: isoDate(end) },
        property: siteUrl,
        permissionLevel: sites.find((site) => site.siteUrl === siteUrl)?.permissionLevel,
        sitemaps: (sitemapsData.sitemap || []).map((sitemap) => ({
          path: sitemap.path,
          lastSubmitted: sitemap.lastSubmitted,
          lastDownloaded: sitemap.lastDownloaded,
          isPending: sitemap.isPending,
          errors: sitemap.errors,
          warnings: sitemap.warnings,
        })),
        inspection,
        totals: {
          clicks: summary.clicks,
          impressions: summary.impressions,
          ctr: summary.impressions ? summary.clicks / summary.impressions : 0,
          averagePosition: summary.impressions ? summary.positionTotal / summary.impressions : 0,
        },
        byDate: formatRows(dateRows, 'date'),
        topQueries: formatRows(queryRows, 'query'),
        topPages: formatRows(pageRows, 'page'),
        campaignPages: formatRows(campaignRows, 'page'),
      },
      null,
      2,
    ),
  )
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error))
  process.exit(1)
}
