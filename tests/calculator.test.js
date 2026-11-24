// End-to-end checks: open index.html in a headless browser, fill in the
// form, and compare the result with each airline's published examples.
// Needs Playwright (see README). Skipped if Playwright is not installed.
const test = require("node:test");
const assert = require("node:assert");
const path = require("node:path");

let chromium = null;
try { ({ chromium } = require("playwright")); } catch (e) { /* skipped below */ }
const PAGE = "file://" + path.resolve(__dirname, "..", "index.html");
const skip = chromium ? false : "Playwright is not installed (npm install --prefix tests)";

let browser, page;
test.before(async () => {
  if (skip) return;
  browser = await chromium.launch();
  page = await browser.newPage();
  await page.goto(PAGE);
});
test.after(async () => { if (browser) await browser.close(); });

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
  await p.click('[data-mode="dark"]');
  await p.reload();
  assert.strictEqual(await p.evaluate(() => document.documentElement.getAttribute("data-theme")), "dark");
  await ctx.close();
});
