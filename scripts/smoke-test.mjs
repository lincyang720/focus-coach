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

async function post(path, body) {
  return fetch(`${BASE_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
}

async function testPages() {
  console.log("\nPage accessibility");
  const pages = [
    "/",
    "/login",
    "/register",
    "/pricing",
    "/privacy",
    "/terms",
    "/games",
    "/games/number-memory",
    "/games/quick-match",
    "/games/n-back",
    "/games/task-switch",
    "/games/stroop",
    "/dashboard",
    "/progress",
    "/reports",
    "/settings",
    "/success"
  ];

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
    for (const path of ["/login", "/pricing", "/games"]) {
      if (!text.includes(path)) throw new Error(`Missing path: ${path}`);
    }
  });

  await test("GET /manifest.webmanifest", async () => {
    const response = await fetch(`${BASE_URL}/manifest.webmanifest`);
    const json = await response.json();
    if (response.status !== 200) throw new Error(`HTTP ${response.status}`);
    if (!json.name && !json.short_name) throw new Error("Missing app name");
  });
}

async function testAuthApi() {
  console.log("\nAuth API");

  await test("POST /api/auth/register missing fields", async () => {
    const response = await post("/api/auth/register", {});
    const json = await response.json();
    if (response.status !== 400) throw new Error(`Expected 400, got ${response.status}`);
    if (json.success !== false) throw new Error("Expected success false");
  });

  await test("POST /api/auth/login demo fallback", async () => {
    const response = await post("/api/auth/login", {
      email: "demo@focuscoach.local",
      password: "password"
    });
    const json = await response.json();
    if (response.status !== 200) throw new Error(`Expected 200, got ${response.status}`);
    if (!json.success || !json.token) throw new Error("Missing demo login payload");
  });
}

async function testSessionsApi() {
  console.log("\nSessions API");

  await test("POST /api/sessions invalid payload", async () => {
    const response = await post("/api/sessions", { gameType: "number_memory" });
    const json = await response.json();
    if (response.status !== 400) throw new Error(`Expected 400, got ${response.status}`);
    if (json.success !== false) throw new Error("Expected success false");
  });

  await test("POST /api/sessions valid demo payload", async () => {
    const response = await post("/api/sessions", {
      userId: "test-user-123",
      gameType: "number_memory",
      difficultyLevel: 3,
      score: 80,
      maxScore: 100,
      accuracy: 0.8,
      durationSeconds: 120,
      gameData: { sequence: [1, 2, 3], userInput: [1, 2, 3] }
    });
    const json = await response.json();
    if (response.status !== 200) throw new Error(`Expected 200, got ${response.status}`);
    if (!json.success || !json.sessionId) throw new Error("Missing session payload");
    if (json.newDifficultyLevel !== 4) throw new Error("Expected level up");
  });
}

async function testPayPalApi() {
  console.log("\nPayPal API demo mode");

  await test("POST /api/paypal/create-order missing userId", async () => {
    const response = await post("/api/paypal/create-order", {});
    if (response.status !== 400) throw new Error(`Expected 400, got ${response.status}`);
  });

  await test("POST /api/paypal/create-order demo fallback", async () => {
    const response = await post("/api/paypal/create-order", { userId: "test-user-123" });
    const json = await response.json();
    if (response.status !== 200) throw new Error(`Expected 200, got ${response.status}`);
    if (!json.orderId) throw new Error("Missing orderId");
    if (!json.approveUrl?.includes("demo")) throw new Error("Expected demo approval URL");
  });
}

async function testReportsApi() {
  console.log("\nReports API");

  await test("GET /api/reports/weekly missing params", async () => {
    const response = await fetch(`${BASE_URL}/api/reports/weekly`);
    const json = await response.json();
    if (json.report !== null) throw new Error("Expected null report");
  });
}

async function testUserFlow() {
  console.log("\nFull user flow");
  let userId = "test-user-flow";

  await test("Register demo user", async () => {
    const response = await post("/api/auth/register", {
      email: "flow-test@example.com",
      password: "FlowTest123!",
      name: "Flow Test"
    });
    const json = await response.json();
    if (!json.success || !json.userId) throw new Error("Registration failed");
    userId = json.userId;
  });

  await test("Create payment order", async () => {
    const response = await post("/api/paypal/create-order", { userId });
    const json = await response.json();
    if (!json.approveUrl) throw new Error("Missing approval URL");
  });
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
  await testAuthApi();
  await testSessionsApi();
  await testPayPalApi();
  await testReportsApi();
  await testUserFlow();

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
