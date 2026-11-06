/**
 * Trigger IndexNow submission via the protected API route.
 *
 * Usage (production after merge):
 *   INDEXNOW_SUBMIT_SECRET=your-secret node scripts/submit-indexnow.mjs
 *
 * Optional:
 *   INDEXNOW_SUBMIT_URL=https://www.focuscoach.dev
 */

const submitUrl =
  process.env.INDEXNOW_SUBMIT_URL?.replace(/\/$/, "") ?? "https://www.focuscoach.dev";
const secret = process.env.INDEXNOW_SUBMIT_SECRET;

if (!secret) {
  console.error("Set INDEXNOW_SUBMIT_SECRET to call /api/indexnow/submit.");
  process.exit(1);
}

const response = await fetch(`${submitUrl}/api/indexnow/submit`, {
  method: "POST",
  headers: {
    Authorization: `Bearer ${secret}`,
    "Content-Type": "application/json"
  },
  body: "{}"
});

const text = await response.text();
let json;
try {
  json = JSON.parse(text);
} catch {
  json = { raw: text };
}

console.log(JSON.stringify(json, null, 2));

if (!response.ok) {
  process.exit(1);
}
