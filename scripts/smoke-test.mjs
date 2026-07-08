/**
 * Focus Coach — Smoke Test Suite
 * 
 * Run: node scripts/smoke-test.mjs
 * Requires: dev server running on http://localhost:3000
 * 
 * Tests:
 * 1. All pages return HTTP 200
 * 2. API endpoints work correctly (demo mode)
 * 3. SEO files are valid
 * 4. Game logic works
 * 5. Full user flow simulation
 */

const BASE_URL = "http://localhost:3000";
let passed = 0;
let failed = 0;
const failures = [];

function log(msg) {
  console.log(`  ${msg}`);
}

function pass(name) {
  passed++;
  console.log(`  ✅ ${name}`);
}

function fail(name, reason) {
  failed++;
  failures.push({ name, reason });
  console.log(`  ❌ ${name}: ${reason}`);
}

async function test(name, fn) {
  try {
    await fn();
    pass(name);
  } catch (e) {
    fail(name, e.message);
  }
}

// ─── 1. Page Accessibility ───────────────────────────────────────────
async function testPages() {
  console.log("\n📄 Page Accessibility");
  
  const pages = [
    { path: "/", desc: "Homepage" },
    { path: "/login", desc: "Login page" },
    { path: "/register", desc: "Register page" },
    { path: "/pricing", desc: "Pricing page" },
    { path: "/privacy", desc: "Privacy policy" },
    { path: "/terms", desc: "Terms of service" },
    { path: "/games", desc: "Games list" },
    { path: "/games/number-memory", desc: "Number Memory game" },
    { path: "/games/quick-match", desc: "Quick Match game" },
    { path: "/games/n-back", desc: "N-Back game" },
    { path: "/games/task-switch", desc: "Task Switch game" },
    { path: "/games/stroop", desc: "Stroop game" },
    { path: "/dashboard", desc: "Dashboard" },
    { path: "/progress", desc: "Progress page" },
    { path: "/reports", desc: "Reports page" },
    { path: "/settings", desc: "Settings page" },
    { path: "/success", desc: "Success page" },
  ];

  for (const page of pages) {
    await test(`${page.desc} (${page.path})`, async () => {
      const res = await fetch(`${BASE_URL}${page.path}`, { redirect: "manual" });
      // Allow 200 or 307/302 redirects (e.g. dashboard may redirect to login)
      if (![200, 302, 307, 308].includes(res.status)) {
        throw new Error(`HTTP ${res.status}`);
      }
    });
  }
}

// ─── 2. SEO Files ────────────────────────────────────────────────────
async function testSEO() {
  console.log("\n🔍 SEO Files");

  await test("robots.txt", async () => {
    const res = await fetch(`${BASE_URL}/robots.txt`);
    if (res.status !== 200) throw new Error(`HTTP ${res.status}`);
    const text = await res.text();
    if (!text.includes("User-agent") && !text.includes("Sitemap")) {
      throw new Error("Missing User-agent or Sitemap directive");
    }
  });

  await test("sitemap.xml", async () => {
    const res = await fetch(`${BASE_URL}/sitemap.xml`);
    if (res.status !== 200) throw new Error(`HTTP ${res.status}`);
    const text = await res.text();
    if (!text.includes("<urlset") && !text.includes("<sitemapindex")) {
      throw new Error("Invalid sitemap format");
    }
    // Check it contains key pages
    const requiredPaths = ["/login", "/pricing", "/games"];
    for (const p of requiredPaths) {
      if (!text.includes(p)) {
        throw new Error(`Missing path: ${p}`);
      }
    }
  });

  await test("manifest.webmanifest (PWA)", async () => {
    const res = await fetch(`${BASE_URL}/manifest.webmanifest`);
    if (res.status !== 200) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    if (!json.name && !json.short_name) throw new Error("Missing app name");
    if (!json.icons || json.icons.length === 0) throw new Error("Missing icons");
  });

  await test("opengraph-image exists", async () => {
    const res = await fetch(`${BASE_URL}/opengraph-image`);
    // Should return an image (200) or at least not 404
    if (res.status === 404) throw new Error("OG image not found");
  });
}

// ─── 3. API — Auth ───────────────────────────────────────────────────
async function testAuthAPI() {
  console.log("\n🔐 Auth API (Demo Mode)");

  await test("POST /api/auth/register — missing fields", async () => {
    const res = await fetch(`${BASE_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({})
    });
    const json = await res.json();
    if (res.status !== 400) throw new Error(`Expected 400, got ${res.status}`);
    if (json.success !== false) throw new Error("Expected success: false");
    if (!json.error) throw new Error("Missing error message");
  });

  await test("POST /api/auth/register — success (demo)", async () => {
    const res = await fetch(`${BASE_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "test@example.com", password: "Test1234!", name: "Test User" })
    });
    const json = await res.json();
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
    if (!json.success) throw new Error("Expected success: true");
    if (!json.userId) throw new Error("Missing userId");
  });

  await test("POST /api/auth/login — missing fields", async () => {
    const res = await fetch(`${BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({})
    });
    const json = await res.json();
    if (res.status !== 400) throw new Error(`Expected 400, got ${res.status}`);
    if (json.success !== false) throw new Error("Expected success: false");
  });

  await test("POST /api/auth/login — demo mode fallback", async () => {
    const res = await fetch(`${BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "demo@focuscoach.local", password: "password" })
    });
    const json = await res.json();
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
    if (!json.success) throw new Error("Expected success: true");
    if (!json.token) throw new Error("Missing token");
  });
}

// ─── 4. API — Game Sessions ─────────────────────────────────────────
async function testSessionsAPI() {
  console.log("\n🎮 Game Sessions API");

  await test("POST /api/sessions — invalid payload", async () => {
    const res = await fetch(`${BASE_URL}/api/sessions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ gameType: "number_memory" })
    });
    const json = await res.json();
    if (res.status !== 400) throw new Error(`Expected 400, got ${res.status}`);
    if (json.success !== false) throw new Error("Expected success: false");
  });

  await test("POST /api/sessions — valid session (demo)", async () => {
    const res = await fetch(`${BASE_URL}/api/sessions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: "test-user-123",
        gameType: "number_memory",
        difficultyLevel: 3,
        score: 8,
        maxScore: 10,
        accuracy: 0.8,
        durationSeconds: 120,
        gameData: { sequence: "12345", userInput: "12345" }
      })
    });
    const json = await res.json();
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
    if (!json.success) throw new Error("Expected success: true");
    if (!json.sessionId) throw new Error("Missing sessionId");
    if (typeof json.newDifficultyLevel !== "number") throw new Error("Missing newDifficultyLevel");
  });

  await test("POST /api/sessions — difficulty adjustment (accuracy >= 0.8 → level up)", async () => {
    const res = await fetch(`${BASE_URL}/api/sessions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: "test-user-123",
        gameType: "quick_match",
        difficultyLevel: 5,
        score: 9,
        maxScore: 10,
        accuracy: 0.9,
        durationSeconds: 180,
        gameData: { rounds: [] }
      })
    });
    const json = await res.json();
    if (json.newDifficultyLevel !== 6) throw new Error(`Expected level 6, got ${json.newDifficultyLevel}`);
  });

  await test("POST /api/sessions — difficulty adjustment (accuracy < 0.6 → level down)", async () => {
    const res = await fetch(`${BASE_URL}/api/sessions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: "test-user-123",
        gameType: "n_back",
        difficultyLevel: 5,
        score: 3,
        maxScore: 10,
        accuracy: 0.3,
        durationSeconds: 200,
        gameData: { rounds: [] }
      })
    });
    const json = await res.json();
    if (json.newDifficultyLevel !== 4) throw new Error(`Expected level 4, got ${json.newDifficultyLevel}`);
  });

  await test("GET /api/sessions — no userId returns empty", async () => {
    const res = await fetch(`${BASE_URL}/api/sessions`);
    const json = await res.json();
    if (!Array.isArray(json.sessions)) throw new Error("Expected sessions array");
    if (json.sessions.length !== 0) throw new Error("Expected empty sessions");
  });

  // Test all 5 game types
  const gameTypes = ["number_memory", "quick_match", "n_back", "task_switch", "stroop"];
  for (const gameType of gameTypes) {
    await test(`POST /api/sessions — ${gameType}`, async () => {
      const res = await fetch(`${BASE_URL}/api/sessions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: "test-user-123",
          gameType,
          difficultyLevel: 1,
          score: 5,
          maxScore: 10,
          accuracy: 0.5,
          durationSeconds: 60,
          gameData: {}
        })
      });
      const json = await res.json();
      if (!json.success) throw new Error("Expected success: true");
    });
  }
}

// ─── 5. API — Stripe ─────────────────────────────────────────────────
async function testStripeAPI() {
  console.log("\n💳 Stripe API (Demo Mode)");

  await test("POST /api/stripe/create-checkout-session — missing userId", async () => {
    const res = await fetch(`${BASE_URL}/api/stripe/create-checkout-session`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({})
    });
    if (res.status !== 400) throw new Error(`Expected 400, got ${res.status}`);
  });

  await test("POST /api/stripe/create-checkout-session — demo fallback", async () => {
    const res = await fetch(`${BASE_URL}/api/stripe/create-checkout-session`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: "test-user-123" })
    });
    const json = await res.json();
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
    if (!json.sessionId) throw new Error("Missing sessionId");
    if (!json.url) throw new Error("Missing url");
    // Demo mode should redirect to /success?demo=1
    if (!json.url.includes("demo")) throw new Error("Expected demo redirect URL");
  });
}

// ─── 6. API — Reports ────────────────────────────────────────────────
async function testReportsAPI() {
  console.log("\n📊 Reports API");

  await test("GET /api/reports/weekly — missing params", async () => {
    const res = await fetch(`${BASE_URL}/api/reports/weekly`);
    const json = await res.json();
    if (json.report !== null) throw new Error("Expected null report");
  });

  await test("GET /api/reports/weekly — no report found", async () => {
    const res = await fetch(`${BASE_URL}/api/reports/weekly?userId=test&weekStart=2026-07-01`);
    const json = await res.json();
    if (json.report !== null) throw new Error("Expected null report for non-existent data");
  });
}

// ─── 7. Game Logic (import directly) ────────────────────────────────
async function testGameLogic() {
  console.log("\n🧩 Game Logic");

  // Test adjustDifficulty via sessions API (indirect but effective)
  await test("Level clamps at 1 (min)", async () => {
    const res = await fetch(`${BASE_URL}/api/sessions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: "test-clamp",
        gameType: "stroop",
        difficultyLevel: 1,
        score: 2,
        maxScore: 10,
        accuracy: 0.2,
        durationSeconds: 30,
        gameData: {}
      })
    });
    const json = await res.json();
    if (json.newDifficultyLevel !== 1) throw new Error(`Expected 1, got ${json.newDifficultyLevel}`);
  });

  await test("Level clamps at 10 (max)", async () => {
    const res = await fetch(`${BASE_URL}/api/sessions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: "test-clamp",
        gameType: "task_switch",
        difficultyLevel: 10,
        score: 10,
        maxScore: 10,
        accuracy: 1.0,
        durationSeconds: 60,
        gameData: {}
      })
    });
    const json = await res.json();
    if (json.newDifficultyLevel !== 10) throw new Error(`Expected 10, got ${json.newDifficultyLevel}`);
  });

  await test("Middle accuracy (0.6-0.8) keeps same level", async () => {
    const res = await fetch(`${BASE_URL}/api/sessions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: "test-stable",
        gameType: "number_memory",
        difficultyLevel: 5,
        score: 7,
        maxScore: 10,
        accuracy: 0.7,
        durationSeconds: 90,
        gameData: {}
      })
    });
    const json = await res.json();
    if (json.newDifficultyLevel !== 5) throw new Error(`Expected 5, got ${json.newDifficultyLevel}`);
  });
}

// ─── 8. Full User Flow Simulation ───────────────────────────────────
async function testUserFlow() {
  console.log("\n🔄 Full User Flow (Demo Mode)");

  let userId;
  
  await test("Step 1: Register", async () => {
    const res = await fetch(`${BASE_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "flow-test@example.com", password: "FlowTest123!", name: "Flow Test" })
    });
    const json = await res.json();
    if (!json.success || !json.userId) throw new Error("Registration failed");
    userId = json.userId;
  });

  await test("Step 2: Login", async () => {
    const res = await fetch(`${BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "flow-test@example.com", password: "FlowTest123!" })
    });
    const json = await res.json();
    if (!json.success || !json.token) throw new Error("Login failed");
  });

  await test("Step 3: Play 3 games", async () => {
    const games = [
      { gameType: "number_memory", accuracy: 0.7 },
      { gameType: "quick_match", accuracy: 0.9 },
      { gameType: "stroop", accuracy: 0.4 }
    ];
    for (const g of games) {
      const res = await fetch(`${BASE_URL}/api/sessions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          gameType: g.gameType,
          difficultyLevel: 3,
          score: Math.round(g.accuracy * 10),
          maxScore: 10,
          accuracy: g.accuracy,
          durationSeconds: 120,
          gameData: {}
        })
      });
      const json = await res.json();
      if (!json.success) throw new Error(`Failed to save session for ${g.gameType}`);
    }
  });

  await test("Step 4: Create checkout session", async () => {
    const res = await fetch(`${BASE_URL}/api/stripe/create-checkout-session`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId })
    });
    const json = await res.json();
    if (!json.url) throw new Error("Missing checkout URL");
  });
}

// ─── Main ────────────────────────────────────────────────────────────
async function main() {
  console.log("╔══════════════════════════════════════════╗");
  console.log("║   Focus Coach — Smoke Test Suite         ║");
  console.log("╚══════════════════════════════════════════╝");
  
  // Check server is running
  try {
    await fetch(BASE_URL, { signal: AbortSignal.timeout(3000) });
  } catch {
    console.error("\n⚠️  Dev server not running! Start it first:");
    console.error("   npm run dev\n");
    process.exit(1);
  }

  console.log(`\n🚀 Testing against ${BASE_URL}\n`);
  const start = Date.now();

  await testPages();
  await testSEO();
  await testAuthAPI();
  await testSessionsAPI();
  await testStripeAPI();
  await testReportsAPI();
  await testGameLogic();
  await testUserFlow();

  const duration = ((Date.now() - start) / 1000).toFixed(1);
  
  console.log("\n══════════════════════════════════════════");
  console.log(`  Total: ${passed + failed} | ✅ Passed: ${passed} | ❌ Failed: ${failed} | ⏱ ${duration}s`);
  
  if (failures.length > 0) {
    console.log("\n  Failures:");
    for (const f of failures) {
      console.log(`    • ${f.name}: ${f.reason}`);
    }
  }
  
  console.log("══════════════════════════════════════════");
  
  if (failed > 0) {
    console.log("\n🔴 Some tests failed. Fix before deploying!\n");
    process.exit(1);
  } else {
    console.log("\n🟢 All tests passed! Ready to deploy.\n");
  }
}

main().catch(e => {
  console.error("Fatal error:", e);
  process.exit(1);
});
