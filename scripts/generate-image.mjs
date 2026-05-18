#!/usr/bin/env node
// Direct Gemini 2.5 Flash Image generator (Nano Banana GA).
// Bypasses outdated nano-banana-mcp package (uses obsolete -preview model name).
//
// Usage:
//   node scripts/generate-image.mjs <output-path> <prompt>
//   node scripts/generate-image.mjs public/images/blog/foo.jpg "photorealistic kitchen..."
//
// Env: reads GEMINI_API_KEY from .env.local (or process.env)

import fs from "node:fs"
import path from "node:path"

// Load .env.local
const envPath = path.resolve(".env.local")
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z_][A-Z0-9_]*)\s*=\s*(.+?)\s*$/)
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "")
  }
}

const KEY = process.env.GEMINI_API_KEY
if (!KEY) {
  console.error("Missing GEMINI_API_KEY in .env.local or environment")
  process.exit(1)
}

const [, , outputArg, ...promptParts] = process.argv
if (!outputArg || promptParts.length === 0) {
  console.error("Usage: node scripts/generate-image.mjs <output-path> <prompt>")
  process.exit(1)
}

const prompt = promptParts.join(" ")
const outputPath = path.resolve(outputArg)
const MODEL = process.env.GEMINI_IMAGE_MODEL || "gemini-2.5-flash-image"

console.log(`Model:  ${MODEL}`)
console.log(`Output: ${outputPath}`)
console.log(`Prompt: ${prompt.slice(0, 120)}${prompt.length > 120 ? "..." : ""}`)

const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${KEY}`
const body = {
  contents: [{ parts: [{ text: prompt }] }],
  generationConfig: { responseModalities: ["IMAGE"] },
}

const res = await fetch(url, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
})

if (!res.ok) {
  console.error(`HTTP ${res.status}: ${await res.text()}`)
  process.exit(1)
}

const json = await res.json()
const parts = json?.candidates?.[0]?.content?.parts || []
const imagePart = parts.find((p) => p.inlineData?.data)

if (!imagePart) {
  console.error("No image in response:", JSON.stringify(json, null, 2).slice(0, 1000))
  process.exit(1)
}

const mime = imagePart.inlineData.mimeType || "image/jpeg"
const buffer = Buffer.from(imagePart.inlineData.data, "base64")
fs.mkdirSync(path.dirname(outputPath), { recursive: true })
fs.writeFileSync(outputPath, buffer)

console.log(`Saved ${buffer.length.toLocaleString()} bytes (${mime}) -> ${outputPath}`)
