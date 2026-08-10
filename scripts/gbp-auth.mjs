/**
 * One-time Google Business Profile OAuth.
 *
 * Opens Google's consent screen in your browser, catches the redirect on a
 * temporary localhost server, trades the code for a refresh token, and appends
 * that token to .env.local (gitignored). Run it once; after that every other
 * GBP script refreshes its own access token silently.
 *
 * Prerequisites in .env.local (from GCP Console -> Credentials -> OAuth client
 * ID -> Desktop app, under project broke-fixed-gbp-305):
 *   GBP_CLIENT_ID=...
 *   GBP_CLIENT_SECRET=...
 *
 * Usage:
 *   node scripts/gbp-auth.mjs
 *
 * Sign in as brokeandfixed305@gmail.com (the profile owner). Any other account
 * will authorize fine but see no locations.
 */

import { appendFile } from "node:fs/promises"
import { createHash, randomBytes } from "node:crypto"
import { createServer } from "node:http"
import { spawn } from "node:child_process"
import { loadEnv, requireVars, ENV_PATH } from "./lib/gbp.mjs"

const PORT = 3111
const REDIRECT_URI = `http://127.0.0.1:${PORT}`
const SCOPE = "https://www.googleapis.com/auth/business.manage"

const base64url = (buf) => buf.toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "")

function page(title, body) {
  return `<!doctype html><meta charset="utf-8"><title>${title}</title>
<body style="font:16px/1.5 system-ui;max-width:32rem;margin:15vh auto;padding:0 1.5rem;color:#1E3A5F">
<h1 style="font-size:1.5rem">${title}</h1><p>${body}</p></body>`
}

/** Serves one request: the OAuth redirect. Resolves with the code. */
function waitForCode(state) {
  return new Promise((resolve, reject) => {
    const server = createServer((req, res) => {
      const url = new URL(req.url, REDIRECT_URI)
      const code = url.searchParams.get("code")
      const error = url.searchParams.get("error")
      const gotState = url.searchParams.get("state")

      const finish = (status, html, cb) => {
        res.writeHead(status, { "Content-Type": "text/html; charset=utf-8" })
        res.end(html, () => server.close(cb))
      }

      if (error) {
        return finish(400, page("Authorization denied", `Google returned: ${error}. You can close this tab.`), () =>
          reject(new Error(`Authorization denied: ${error}`))
        )
      }
      if (gotState !== state) {
        return finish(400, page("State mismatch", "Request rejected. Re-run the script."), () =>
          reject(new Error("State mismatch — possible interference. Nothing was saved."))
        )
      }
      if (!code) {
        // Ignore stray requests (favicon, etc.) without tearing the server down.
        res.writeHead(204)
        return res.end()
      }
      finish(200, page("Connected", "Broke &amp; Fixed is authorized. You can close this tab and return to the terminal."), () =>
        resolve(code)
      )
    })

    server.on("error", (err) => {
      reject(
        err.code === "EADDRINUSE"
          ? new Error(`Port ${PORT} is busy. Free it and re-run, or edit PORT in this script.`)
          : err
      )
    })
    server.listen(PORT, "127.0.0.1")
  })
}

function openBrowser(url) {
  const cmd = process.platform === "darwin" ? "open" : process.platform === "win32" ? "start" : "xdg-open"
  spawn(cmd, [url], { detached: true, stdio: "ignore", shell: process.platform === "win32" }).unref()
}

async function main() {
  const env = await loadEnv()
  requireVars(env, ["GBP_CLIENT_ID", "GBP_CLIENT_SECRET"])

  if (env.GBP_REFRESH_TOKEN) {
    console.log("GBP_REFRESH_TOKEN already exists in .env.local.")
    console.log("Re-authorizing will append a second value, which is ignored. Remove the old line first if you")
    console.log("actually want to re-auth (for example after revoking access). Nothing was changed.")
    return
  }

  const state = base64url(randomBytes(24))
  const verifier = base64url(randomBytes(48))
  const challenge = base64url(createHash("sha256").update(verifier).digest())

  const authUrl =
    "https://accounts.google.com/o/oauth2/v2/auth?" +
    new URLSearchParams({
      client_id: env.GBP_CLIENT_ID,
      redirect_uri: REDIRECT_URI,
      response_type: "code",
      scope: SCOPE,
      access_type: "offline",
      prompt: "consent",
      state,
      code_challenge: challenge,
      code_challenge_method: "S256",
    })

  console.log("Opening Google's consent screen in your browser.")
  console.log("Sign in as brokeandfixed305@gmail.com and approve the request.\n")
  console.log("If the browser does not open, paste this URL yourself:\n")
  console.log(authUrl + "\n")
  console.log(`Listening on ${REDIRECT_URI} ...`)

  openBrowser(authUrl)
  const code = await waitForCode(state)

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: env.GBP_CLIENT_ID,
      client_secret: env.GBP_CLIENT_SECRET,
      redirect_uri: REDIRECT_URI,
      grant_type: "authorization_code",
      code_verifier: verifier,
    }),
  })

  const body = await res.json()
  if (!res.ok) {
    throw new Error(`Token exchange failed (${res.status}): ${body.error_description || body.error}`)
  }
  if (!body.refresh_token) {
    throw new Error(
      "Google returned no refresh token. Revoke the app at https://myaccount.google.com/permissions and re-run."
    )
  }

  await appendFile(
    ENV_PATH,
    `\n# Google Business Profile refresh token (scope: business.manage)\n` +
      `# Written by scripts/gbp-auth.mjs. Never commit. Revoke at myaccount.google.com/permissions\n` +
      `GBP_REFRESH_TOKEN=${body.refresh_token}\n`
  )

  console.log(`\nDone. Refresh token saved to .env.local (gitignored).`)
  console.log(`Next: node scripts/gbp-read.mjs`)
}

main().catch((err) => {
  console.error(`\n${err.message}`)
  process.exit(1)
})
