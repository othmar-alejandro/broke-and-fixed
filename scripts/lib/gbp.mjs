/**
 * Shared helpers for the Google Business Profile scripts.
 *
 * Reads credentials from .env.local (gitignored). Nothing here ever prints a
 * secret: tokens are used in memory and only ever written back to .env.local.
 */

import { readFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

// Resolved from this file, not cwd, so the scripts run from any directory.
const ENV_PATH = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../.env.local")

export { ENV_PATH }

/** Minimal .env parser. Handles KEY=value, quotes, comments, blank lines. */
export async function loadEnv() {
  let raw
  try {
    raw = await readFile(ENV_PATH, "utf8")
  } catch {
    throw new Error(`.env.local not found at ${ENV_PATH}`)
  }
  const env = {}
  for (const line of raw.split("\n")) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith("#")) continue
    const eq = trimmed.indexOf("=")
    if (eq === -1) continue
    const key = trimmed.slice(0, eq).trim()
    let value = trimmed.slice(eq + 1).trim()
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    }
    env[key] = value
  }
  return env
}

export function requireVars(env, keys) {
  const missing = keys.filter((k) => !env[k])
  if (missing.length) {
    throw new Error(
      `Missing in .env.local: ${missing.join(", ")}\n` +
        `Run: node scripts/gbp-auth.mjs  (see GBP-AUDIT-AND-API-SETUP.md)`
    )
  }
  return env
}

/**
 * Trades the long-lived refresh token for a short-lived access token.
 * Access tokens last ~1 hour, so every script call gets a fresh one.
 */
export async function getAccessToken(env) {
  requireVars(env, ["GBP_CLIENT_ID", "GBP_CLIENT_SECRET", "GBP_REFRESH_TOKEN"])

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: env.GBP_CLIENT_ID,
      client_secret: env.GBP_CLIENT_SECRET,
      refresh_token: env.GBP_REFRESH_TOKEN,
      grant_type: "refresh_token",
    }),
  })

  const body = await res.json()
  if (!res.ok) {
    const hint =
      body.error === "invalid_grant"
        ? "\nThe refresh token is expired or revoked. Re-run: node scripts/gbp-auth.mjs"
        : ""
    throw new Error(`Token refresh failed (${res.status}): ${body.error_description || body.error}${hint}`)
  }
  return body.access_token
}

/** GET against a Business Profile API host, with the 403-means-not-approved hint. */
export async function apiGet(url, accessToken) {
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
  const text = await res.text()
  let body
  try {
    body = JSON.parse(text)
  } catch {
    body = { raw: text }
  }

  if (res.status === 403 || res.status === 429) {
    const msg = body?.error?.message || ""
    if (/quota|permission|not been used|disabled/i.test(msg)) {
      throw new Error(
        `${res.status} from Google: ${msg}\n\n` +
          `This is the expected response until Basic API Access is approved.\n` +
          `Submit the form (answers are in GBP-AUDIT-AND-API-SETUP.md Part 3):\n` +
          `https://support.google.com/business/contact/api_default`
      )
    }
  }
  if (!res.ok) {
    throw new Error(`${res.status} ${url}\n${JSON.stringify(body, null, 2)}`)
  }
  return body
}
