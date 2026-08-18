#!/usr/bin/env node

const apiKey = process.env.BING_WEBMASTER_API_KEY
const siteUrl = process.env.BING_SITE_URL || 'https://brokeandfixed.com'

if (!apiKey) {
  console.error('Missing BING_WEBMASTER_API_KEY')
  process.exit(1)
}

const days = Number(process.env.BING_REPORT_DAYS || 7)
const cutoff = Date.now() - days * 24 * 60 * 60 * 1000

const methods = [
  ['GetUserSites', false],
  ['GetQueryStats', true],
  ['GetPageStats', true],
  ['GetRankAndTrafficStats', true],
  ['GetCrawlStats', true],
  ['GetUrlSubmissionQuota', true],
]

async function call(method, includeSite) {
  const params = new URLSearchParams({ apikey: apiKey })
  if (includeSite) params.set('siteUrl', siteUrl)
  const response = await fetch(
    `https://ssl.bing.com/webmaster/api.svc/json/${method}?${params.toString()}`,
  )

  const body = await response.text()
  let data
  try {
    data = JSON.parse(body)
  } catch {
    data = { raw: body.slice(0, 500) }
  }

  return { method, status: response.status, data }
}

function rowDate(row) {
  const match = String(row?.Date || '').match(/Date\((-?\d+)/)
  return match ? new Date(Number(match[1])) : null
}

function recentRows(data) {
  const rows = Array.isArray(data?.d) ? data.d : []
  return rows.filter((row) => {
    const date = rowDate(row)
    return !date || date.getTime() >= cutoff
  })
}

function aggregateRows(rows, label) {
  const groups = new Map()
  for (const row of rows) {
    const key = String(row?.[label] || '(unknown)')
    const current = groups.get(key) || { [label]: key, clicks: 0, impressions: 0 }
    current.clicks += Number(row?.Clicks || 0)
    current.impressions += Number(row?.Impressions || 0)
    groups.set(key, current)
  }
  return [...groups.values()]
    .sort((a, b) => b.impressions - a.impressions || b.clicks - a.clicks)
    .slice(0, 10)
}

function summarize(method, data) {
  if (method === 'GetUserSites') {
    return (data?.d || []).map((site) => ({
      url: site.Url,
      verified: site.IsVerified,
    }))
  }

  if (method === 'GetUrlSubmissionQuota') {
    return {
      dailyQuota: data?.d?.DailyQuota,
      monthlyQuota: data?.d?.MonthlyQuota,
    }
  }

  const rows = recentRows(data)
  if (method === 'GetQueryStats') {
    return {
      rows: rows.length,
      clicks: rows.reduce((sum, row) => sum + Number(row.Clicks || 0), 0),
      impressions: rows.reduce((sum, row) => sum + Number(row.Impressions || 0), 0),
      topQueries: aggregateRows(rows, 'Query'),
    }
  }

  if (method === 'GetPageStats') {
    return {
      rows: rows.length,
      clicks: rows.reduce((sum, row) => sum + Number(row.Clicks || 0), 0),
      impressions: rows.reduce((sum, row) => sum + Number(row.Impressions || 0), 0),
      topPages: aggregateRows(rows, 'Page'),
    }
  }

  if (method === 'GetCrawlStats') {
    const latest = rows.at(-1)
    return {
      rows: rows.length,
      latest: latest
        ? {
            date: rowDate(latest)?.toISOString().slice(0, 10),
            inIndex: latest.InIndex,
            crawledPages: latest.CrawledPages,
            code2xx: latest.Code2xx,
            code4xx: latest.Code4xx,
            code5xx: latest.Code5xx,
            crawlErrors: latest.CrawlErrors,
          }
        : null,
    }
  }

  return {
    rows: rows.length,
    sample: rows.slice(-7).map((row) => ({
      date: rowDate(row)?.toISOString().slice(0, 10),
      ...Object.fromEntries(
        Object.entries(row).filter(([key]) => !key.startsWith('__') && key !== 'Date'),
      ),
    })),
  }
}

for (const [method, includeSite] of methods) {
  try {
    const result = await call(method, includeSite)
    console.log(JSON.stringify({ method, status: result.status, data: summarize(method, result.data) }))
  } catch (error) {
    console.log(JSON.stringify({ method, error: error instanceof Error ? error.message : String(error) }))
  }
}
