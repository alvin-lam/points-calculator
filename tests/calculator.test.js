// End-to-end checks: open index.html in a headless browser, fill in the
// form, and compare the result with each airline's published examples.
// Needs Playwright (see README). Skipped if Playwright is not installed.
const test = require("node:test");
const assert = require("node:assert");
const path = require("node:path");

let chromium = null;
try { ({ chromium } = require("playwright")); } catch (e) { /* skipped below */ }
// Served over HTTP (not file://) so fetch and the security policy behave as
// they do on the live site.
const http = require("node:http");
const fs = require("node:fs");
const ROOT = path.resolve(__dirname, "..");
const TYPES = { html: "text/html", js: "text/javascript", json: "application/json", css: "text/css",
  png: "image/png", ico: "image/x-icon", woff2: "font/woff2", webmanifest: "application/manifest+json", xml: "application/xml", txt: "text/plain" };
let server, PAGE;
const skip = chromium ? false : "Playwright is not installed (npm install --prefix tests)";

let browser, page;
test.before(async () => {
  if (skip) return;
  server = http.createServer((req, res) => {
    let p = decodeURIComponent(new URL(req.url, "http://x").pathname);
    if (p.endsWith("/")) p += "index.html";
    const f = path.join(ROOT, p);
    if (!f.startsWith(ROOT) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); return res.end(); }
    res.writeHead(200, { "Content-Type": TYPES[f.split(".").pop()] || "application/octet-stream" });
    fs.createReadStream(f).pipe(res);
  });
  await new Promise((r) => server.listen(0, "127.0.0.1", r));
  PAGE = "http://127.0.0.1:" + server.address().port + "/index.html";
  browser = await chromium.launch();
  page = await browser.newPage();
  await page.goto(PAGE);
});
test.after(async () => { if (browser) await browser.close(); if (server) server.close(); });

// Fill the form and return the points shown, as a number.
async function pickProgram(value) {
  await page.evaluate((v) => {
    const s = document.getElementById("program");
    s.value = v;
    s.dispatchEvent(new Event("change"));
    document.getElementById("programSearch").value = s.selectedOptions[0].textContent;
  }, value);
}

async function calc(o) {
  await pickProgram(o.program);
  if (o.earn) await page.selectOption("#earnMethod", o.earn);
  if (o.status) await page.selectOption("#status", o.status);
  if (o.fare) await page.selectOption("#fareType", o.fare);
  if (o.zone) await page.selectOption("#zone", o.zone);
  if (o.upgrade) await page.selectOption("#upgrade", o.upgrade);
  for (const [id, radio] of Object.entries(o.radios || {})) await page.check("#" + id + radio);
  for (const [id, value] of Object.entries(o.fields || {})) await page.fill("#" + id, String(value));
  await page.click("#calc button[type=submit]");
  const err = await page.$eval("#error", (e) => (e.hidden ? "" : e.textContent));
  assert.strictEqual(err, "", "form error: " + err);
  return Number((await page.textContent("#resultPoints")).replace(/,/g, ""));
}
// Clear money fields between cases so one case cannot leak into the next.
async function reset() {
  await page.goto(PAGE);
  await page.evaluate(() => { localStorage.removeItem("lastProgram"); localStorage.removeItem("lastStatus"); });
  await page.goto(PAGE);
}

// Published examples live with each program in data/programs/<program>.js.
const { programs } = require("../tools/build.js").compile();
const cases = [];
for (const p of programs) {
  for (const e of p.examples || []) {
    const program = e.airline ? p.id + ":" + e.airline : p.id;
    cases.push([e.name, Object.assign({ program }, e.input), e.expect]);
  }
}

for (const [name, input, expected] of cases) {
  test(name, { skip }, async () => {
    await reset();
    assert.strictEqual(await calc(input), expected);
  });
}

test("airline box filters a dropdown and chooses a match", { skip }, async () => {
  await reset();
  await page.click("#programSearch");
  await page.fill("#programSearch", "avios");
  assert.strictEqual(await page.$$eval("#programList [role=option]", (o) => o.length), 5);
  await page.fill("#programSearch", "LH");
  await page.keyboard.press("Enter");
  assert.strictEqual(await page.$eval("#program", (s) => s.value), "milesandmore:lh");
  assert.strictEqual(await page.inputValue("#programSearch"), await page.$eval("#program", (s) => s.selectedOptions[0].textContent));
  assert.ok(await page.$eval("#programList", (l) => l.hidden));
  await page.click("#programSearch");
  await page.fill("#programSearch", "qatar");
  await page.click("#programList [role=option]");
  assert.strictEqual(await page.$eval("#program", (s) => s.value), "qatar");
});

test("the last program and status come back on the next visit", { skip }, async () => {
  await reset();
  await pickProgram("milesandmore:lh");
  await page.selectOption("#status", "sen");
  await page.goto(PAGE);
  assert.strictEqual(await page.$eval("#program", (s) => s.value), "milesandmore:lh");
  assert.strictEqual(await page.$eval("#status", (s) => s.value), "sen");
  assert.match(await page.inputValue("#programSearch"), /Lufthansa/);
});

test("a program page opens on its own program", { skip }, async () => {
  await reset();
  await pickProgram("united");
  await page.goto(PAGE.replace(/index\.html$/, "airlines/lufthansa/index.html"));
  assert.strictEqual(await page.$eval("#program", (s) => s.value), "milesandmore:lh");
  assert.match(await page.inputValue("#programSearch"), /Lufthansa/);
  await reset();
});

test("a Copa route fills in Copa's published miles", { skip }, async () => {
  await reset();
  await pickProgram("copa");
  await page.selectOption("#fareType", "full");
  await page.selectOption("#routeSelect", "KIN");
  assert.strictEqual(await page.inputValue("#distance"), "634");
  await page.click("#calc button[type=submit]");
  assert.strictEqual(await page.textContent("#resultPoints"), "1,110");
  // Typing the airports in either direction uses the same figure.
  await page.selectOption("#routeSelect", "");
  await page.fill("#fromAirport", "MVD");
  await page.fill("#toAirport", "PTY");
  await page.waitForFunction(() => document.getElementById("distance").value === "3385");
  assert.strictEqual(await page.$eval("#routeSelect", (s) => s.value), "MVD");
});

test("a metric-region device enters and shows kilometres", { skip }, async () => {
  const ctx = await browser.newContext({ locale: "de-DE" });
  const p = await ctx.newPage();
  await p.goto(PAGE);
  await p.evaluate(() => { const s = document.getElementById("program"); s.value = "copa"; s.dispatchEvent(new Event("change")); });
  assert.strictEqual(await p.textContent('label[for="distance"]'), "Kilometres flown");
  await p.selectOption("#fareType", "full");
  await p.selectOption("#routeSelect", "KIN");
  // 634 miles is shown as 1,020 km, and earning still uses the exact miles.
  assert.strictEqual(await p.inputValue("#distance"), "1020");
  await p.click("#calc button[type=submit]");
  assert.strictEqual(await p.textContent("#resultPoints"), "1.110");
  // A typed distance in kilometres is converted to miles.
  await p.selectOption("#fareType", "classic");
  await p.fill("#distance", "1609");
  await p.click("#calc button[type=submit]");
  assert.strictEqual(await p.textContent("#resultPoints"), "1.000");
  assert.match(await p.textContent("#resultSource"), /November 2026/);
  await ctx.close();
});

test("miles and kilometre devices earn the same on mile- and km-based programs", { skip }, async () => {
  const run = async (locale, program, from, to) => {
    const ctx = await browser.newContext({ locale });
    const p = await ctx.newPage();
    await p.goto(PAGE);
    await p.evaluate((v) => { const s = document.getElementById("program"); s.value = v; s.dispatchEvent(new Event("change")); }, program);
    await p.fill("#fromAirport", from);
    await p.fill("#toAirport", to);
    await p.waitForFunction(() => document.getElementById("distance").value !== "");
    await p.click("#calc button[type=submit]");
    const pts = Number((await p.textContent("#resultPoints")).replace(/[^0-9]/g, ""));
    const row = await p.textContent("#breakdown");
    await ctx.close();
    return { pts, row };
  };
  // Copa counts miles; Air China (PhoenixMiles) counts kilometres.
  for (const [program, from, to, unit] of [["copa", "PTY", "MIA", "miles"], ["phoenix:ca", "PEK", "PVG", "km"]]) {
    const us = await run("en-US", program, from, to);
    const de = await run("de-DE", program, from, to);
    assert.strictEqual(de.pts, us.pts, program + " differs by device unit");
    assert.match(us.row, new RegExp("Distance flown[0-9,]+ " + unit), program + " should show " + unit + " first");
  }
});

test("a phone browser without an install button is reminded to Add to Home Screen", { skip }, async () => {
  const ctx = await browser.newContext({
    viewport: { width: 390, height: 800 }, isMobile: true, hasTouch: true,
    userAgent: "Mozilla/5.0 (Android 14; Mobile; rv:132.0) Gecko/132.0 Firefox/132.0"
  });
  const p = await ctx.newPage();
  await p.goto(PAGE);
  await p.waitForSelector("#installBanner:not([hidden])", { timeout: 8000 });
  assert.ok(await p.isVisible("#menuSteps"));
  assert.ok(!(await p.isVisible("#iosSteps")));
  assert.match(await p.textContent("#menuSteps"), /Add to Home Screen/);
  // "Close" hides it for 24 hours, then it can come back.
  assert.strictEqual((await p.textContent("#installDismiss")).trim(), "Close");
  await p.click("#installDismiss");
  await p.reload();
  await p.waitForTimeout(4500);
  assert.ok(await p.isHidden("#installBanner"), "banner should stay hidden after Close");
  await p.evaluate(() => localStorage.setItem("installDismissedAt", String(Date.now() - 25 * 3600 * 1000)));
  await p.reload();
  await p.waitForSelector("#installBanner:not([hidden])", { timeout: 8000 });
  await ctx.close();
});

test("the security policy blocks nothing the pages use", { skip }, async () => {
  const ctx = await browser.newContext();
  const p = await ctx.newPage();
  const problems = [];
  p.on("console", (m) => { if (/Content Security Policy|Trusted Type|Refused to/i.test(m.text())) problems.push(m.text()); });
  p.on("pageerror", (e) => problems.push(e.message));
  await p.addInitScript(() => document.addEventListener("securitypolicyviolation", (e) => console.error("Refused to: " + e.violatedDirective + " " + e.blockedURI)));
  for (const url of [PAGE, PAGE.replace(/index\.html$/, "airlines/copa-airlines/index.html"), PAGE.replace(/index\.html$/, "privacy.html")]) {
    await p.goto(url);
    await p.waitForLoadState("networkidle");
  }
  // Exercise the airport fetch, the route menu, a result and the Appearance panel.
  await p.goto(PAGE.replace(/index\.html$/, "airlines/copa-airlines/index.html"));
  await p.fill("#fromAirport", "PTY");
  await p.fill("#toAirport", "MIA");
  await p.waitForFunction(() => document.getElementById("distance").value !== "");
  await p.click("#calc button[type=submit]");
  await p.click("#appearanceToggle");
  await p.click('input[name="mode"][value="dark"] + span');
  // The fonts load from this site, not Google.
  const fontsFromSite = await p.evaluate(() => performance.getEntriesByType("resource").filter((r) => /woff2/.test(r.name)).every((r) => r.name.startsWith(location.origin)));
  assert.ok(fontsFromSite, "fonts must load from this site");
  assert.deepStrictEqual(problems, []);
  await ctx.close();
});

test("the Appearance panel lists airline colors and remembers the choice", { skip }, async () => {
  const ctx = await browser.newContext();
  const p = await ctx.newPage();
  await p.goto(PAGE);
  const choose = (v) => p.evaluate((v) => { const s = document.getElementById("program"); s.value = v; s.dispatchEvent(new Event("change")); }, v);
  await choose("united");
  const accent = () => p.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue("--accent").trim().toLowerCase());
  const united = await accent();
  await p.click("#appearanceToggle");
  // Match my airline, then every airline once (no Classic blue).
  const rows = await p.$$eval('#schemeList input[name="scheme"]', (r) => r.map((x) => x.value));
  assert.strictEqual(rows[0], "auto");
  assert.ok(!rows.includes("classic"));
  // The wordmark title follows the color scheme.
  const title = await p.evaluate(() => getComputedStyle(document.querySelector(".brand a")).color);
  assert.strictEqual(title, await p.evaluate(() => { const d = document.createElement("i"); d.style.color = "var(--accent)"; document.body.append(d); const c = getComputedStyle(d).color; d.remove(); return c; }));
  assert.ok(rows.length > 60, "airline list is too short: " + rows.length);
  assert.match(await p.textContent("#schemeList"), /Now: United Airlines/);
  // Pin Delta's color: it stays while another airline is chosen, and after a reload.
  await p.click('#schemeList input[value="delta"] ~ .scheme-name');
  const delta = await accent();
  assert.notStrictEqual(delta, united);
  await choose("southwest");
  assert.strictEqual(await accent(), delta);
  await p.reload();
  assert.strictEqual(await p.evaluate(() => localStorage.getItem("color")), "delta");
  // Back to Match my airline.
  await p.click("#appearanceToggle");
  await p.click('#schemeList input[value="auto"] ~ .scheme-name');
  await choose("united");
  assert.strictEqual(await accent(), united);
  await ctx.close();
});

test("US-issued cards come first in every card menu", { skip }, async () => {
  await reset();
  const bad = await page.evaluate(() => {
    const out = [];
    for (const opt of document.querySelectorAll("#program option[value]")) {
      if (!opt.value) continue;
      const s = document.getElementById("program");
      s.value = opt.value;
      s.dispatchEvent(new Event("change"));
      const labels = [...document.querySelectorAll("#card optgroup")].map((g) => g.label).filter((l) => l !== "Debit cards");
      const firstHome = labels.findIndex((l) => !/\(US\)$/.test(l));
      const lastUS = labels.map((l) => /\(US\)$/.test(l)).lastIndexOf(true);
      if (firstHome !== -1 && lastUS > firstHome) out.push(opt.value + ": " + labels.join(", "));
    }
    return out;
  });
  assert.deepStrictEqual(bad, []);
});

test("airport codes fill in the miles", { skip }, async () => {
  await reset();
  await pickProgram("qatar");
  await page.fill("#fromAirport", "jfk");
  await page.fill("#toAirport", "DOH");
  await page.waitForFunction(() => document.getElementById("distance").value !== "");
  const miles = Number(await page.inputValue("#distance"));
  assert.ok(Math.abs(miles - 6694) <= 15, "got " + miles);
});

test("every result shows when the rules were reviewed", { skip }, async () => {
  await reset();
  await calc({ program: "united", fields: { airfare: 300 } });
  const line = await page.textContent("#resultSource");
  assert.match(line, /Rules last reviewed .+ Source: united\.com\./);
});

test("airline colors stay readable in light and dark mode", { skip }, async () => {
  const lum = (c) => {
    const s = c.map((v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); });
    return 0.2126 * s[0] + 0.7152 * s[1] + 0.0722 * s[2];
  };
  const rgb = (s) => s.match(/\d+/g).slice(0, 3).map(Number);
  const ratio = (a, b) => { const x = lum(rgb(a)), y = lum(rgb(b)); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };
  for (const scheme of ["light", "dark"]) {
    const p = await browser.newPage({ colorScheme: scheme });
    await p.goto(PAGE);
    const values = await p.$$eval("#program option", (o) => o.map((x) => x.value).filter(Boolean));
    for (const v of values) {
      await p.evaluate((v) => { const s = document.getElementById("program"); s.value = v; s.dispatchEvent(new Event("change")); }, v);
      const m = await p.evaluate(() => {
        const b = getComputedStyle(document.querySelector("#calc button[type=submit]"));
        return { bg: b.backgroundColor, fg: b.color, page: getComputedStyle(document.body).backgroundColor };
      });
      assert.ok(ratio(m.bg, m.fg) >= 4.5, scheme + " " + v + " button text contrast is too low");
      assert.ok(ratio(m.bg, m.page) >= 4.5, scheme + " " + v + " accent contrast is too low");
    }
    await p.close();
  }
});

test("the chosen mode is remembered", { skip }, async () => {
  const ctx = await browser.newContext();
  const p = await ctx.newPage();
  await p.goto(PAGE);
  await p.click("#appearanceToggle");
  await p.click('input[name="mode"][value="dark"] + span');
  await p.reload();
  assert.strictEqual(await p.evaluate(() => document.documentElement.getAttribute("data-theme")), "dark");
  await ctx.close();
});
