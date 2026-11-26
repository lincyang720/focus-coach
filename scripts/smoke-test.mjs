/**
 * Focus Coach smoke tests.
 *
 * Run with a local server:
 *   npm run dev
 *   node scripts/smoke-test.mjs
 */

const BASE_URL = process.env.SMOKE_BASE_URL ?? "http://localhost:3000";
let passed = 0;
let failed = 0;
const failures = [];

async function test(name, fn) {
  try {
    await fn();
    passed += 1;
    console.log(`  PASS ${name}`);
  } catch (error) {
    failed += 1;
    failures.push({ name, reason: error instanceof Error ? error.message : String(error) });
    console.log(`  FAIL ${name}: ${failures.at(-1).reason}`);
  }
}

const retiredPages = ["/dashboard", "/progress", "/reports", "/settings", "/login", "/success", "/pricing", "/register"];

async function testPages() {
  console.log("\nPage accessibility");
  const pages = ["/", "/about", "/contact", "/exercises", "/privacy", "/terms", "/games",
    "/exercises/number-memory", "/exercises/quick-match", "/exercises/n-back",
    "/exercises/task-switch", "/exercises/stroop-test"];

  for (const path of pages) {
    await test(`GET ${path}`, async () => {
      const response = await fetch(`${BASE_URL}${path}`, { redirect: "manual" });
      if (![200, 302, 307, 308].includes(response.status)) {
        throw new Error(`HTTP ${response.status}`);
      }
    });
  }
}

async function testSeoFiles() {
  console.log("\nSEO files");

  await test("GET /robots.txt", async () => {
    const response = await fetch(`${BASE_URL}/robots.txt`);
    const text = await response.text();
    const normalized = text.toLowerCase();
    if (response.status !== 200) throw new Error(`HTTP ${response.status}`);
    if (!normalized.includes("user-agent") || !normalized.includes("sitemap")) {
      throw new Error("Missing robots directives");
    }
  });

  await test("GET /sitemap.xml", async () => {
    const response = await fetch(`${BASE_URL}/sitemap.xml`);
    const text = await response.text();
    if (response.status !== 200) throw new Error(`HTTP ${response.status}`);
    for (const path of retiredPages) {
      if (text.includes(path + "</loc>")) throw new Error("Retired sitemap entry: " + path);
    }
    for (const path of ["/exercises", "/games"]) {
      if (!text.includes(path + "</loc>")) throw new Error(`Missing path: ${path}`);
    }
  });

  await test("GET /manifest.webmanifest", async () => {
    const response = await fetch(`${BASE_URL}/manifest.webmanifest`);
    const json = await response.json();
    if (response.status !== 200) throw new Error(`HTTP ${response.status}`);
    if (!json.name && !json.short_name) throw new Error("Missing app name");
  });
}

async function testRetiredRoutes() {
  for (const path of retiredPages) {
    await test(`GET ${path} is retired`, async () => {
      const response = await fetch(BASE_URL + path, { redirect: "manual" });
      if (response.status !== 404) throw new Error(`HTTP ${response.status}`);
    });
  }
  for (const [method, path] of [
    ["POST", "/api/auth/register"], ["POST", "/api/auth/login"], ["POST", "/api/sessions"],
    ["GET", "/api/reports/weekly"], ["POST", "/api/reports/generate"],
    ["POST", "/api/paypal/create-order"], ["POST", "/api/paypal/capture-order"]
  ]) {
    await test(`${method} ${path} is retired`, async () => {
      const response = await fetch(BASE_URL + path, { method, redirect: "manual" });
      if (response.status !== 404 && response.status !== 405) throw new Error(`HTTP ${response.status}`);
    });
  }
}

async function main() {
  console.log(`Testing ${BASE_URL}`);
  try {
    await fetch(BASE_URL, { signal: AbortSignal.timeout(3000) });
  } catch {
    console.error("Dev server is not running. Start it with npm run dev.");
    process.exit(1);
  }

  const start = Date.now();
  await testPages();
  await testSeoFiles();
  await testRetiredRoutes();

  const duration = ((Date.now() - start) / 1000).toFixed(1);
  console.log(`\nTotal: ${passed + failed} | Passed: ${passed} | Failed: ${failed} | ${duration}s`);

  if (failures.length > 0) {
    console.log("\nFailures:");
    for (const failure of failures) {
      console.log(`- ${failure.name}: ${failure.reason}`);
    }
    process.exit(1);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
