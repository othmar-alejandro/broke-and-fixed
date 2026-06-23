#!/usr/bin/env node
/**
 * Microsoft Clarity Data Export API report.
 *
 * Usage:
 *   node --env-file=.env.local scripts/clarity-report.mjs [options]
 *
 * Options:
 *   --days <1|2|3>          Number of days to look back (default: 3)
 *   --dim <name>            Break down by 1 dimension (e.g. Page, Device, Country)
 *   --dim2 <name>           Add a second dimension
 *   --dim3 <name>           Add a third dimension
 *   --json                  Output raw JSON instead of formatted tables
 *
 * Valid dimensions: Browser, Device, OS, Country, Page, Source, Medium, Campaign,
 *                   Channel, URL, Device + OS combos, etc.
 *
 * Limits: 10 API calls/day per project, 1-3 days of data max.
 */

const API_URL = "https://www.clarity.ms/export-data/api/v1/project-live-insights";
const token = process.env.CLARITY_API_TOKEN;

if (!token) {
  console.error("Missing CLARITY_API_TOKEN. Run with: node --env-file=.env.local scripts/clarity-report.mjs");
  process.exit(1);
}

const args = process.argv.slice(2);
const getArg = (flag) => {
  const i = args.indexOf(flag);
  return i >= 0 ? args[i + 1] : undefined;
};
const hasFlag = (flag) => args.includes(flag);

const numOfDays = Number(getArg("--days") ?? 3);
const dim1 = getArg("--dim");
const dim2 = getArg("--dim2");
const dim3 = getArg("--dim3");
const asJson = hasFlag("--json");

if (![1, 2, 3].includes(numOfDays)) {
  console.error("--days must be 1, 2, or 3");
  process.exit(1);
}

const params = new URLSearchParams({ numOfDays: String(numOfDays) });
if (dim1) params.set("dimension1", dim1);
if (dim2) params.set("dimension2", dim2);
if (dim3) params.set("dimension3", dim3);

const url = `${API_URL}?${params.toString()}`;

const res = await fetch(url, {
  headers: { Authorization: `Bearer ${token}` },
});

if (!res.ok) {
  const body = await res.text();
  console.error(`Clarity API error ${res.status}: ${body}`);
  process.exit(1);
}

const data = await res.json();

if (asJson) {
  console.log(JSON.stringify(data, null, 2));
  process.exit(0);
}

const dimLabel = [dim1, dim2, dim3].filter(Boolean).join(" / ") || "Project total";
console.log(`\nClarity report — last ${numOfDays} day${numOfDays > 1 ? "s" : ""}`);
console.log(`Grouped by: ${dimLabel}`);
console.log("=".repeat(70));

for (const metric of data) {
  const name = metric.metricName ?? "Unknown";
  const info = metric.information ?? [];
  console.log(`\n## ${name}`);
  if (info.length === 0) {
    console.log("  (no data)");
    continue;
  }
  for (const row of info) {
    const dimensions = [];
    for (const k of ["dimension", "dimension1", "dimension2", "dimension3"]) {
      if (row[k] != null && row[k] !== "") dimensions.push(row[k]);
    }
    const label = dimensions.length ? dimensions.join(" | ") : "(total)";
    const values = Object.entries(row)
      .filter(([k]) => !k.startsWith("dimension"))
      .map(([k, v]) => `${k}=${v}`)
      .join("  ");
    console.log(`  ${label.padEnd(40)} ${values}`);
  }
}

console.log("\n" + "=".repeat(70));
console.log(`Tip: --dim Page  |  --dim Device  |  --dim Country  |  --dim Source`);
