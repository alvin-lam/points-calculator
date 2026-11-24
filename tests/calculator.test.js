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

const cases = [
  // Southwest: southwest.com "How to Earn Points" ($200 base fare examples).
  ["Southwest Basic, member", { program: "southwest", status: "member", fare: "basic", fields: { airfare: 200 } }, 400],
  ["Southwest Choice Extra, member", { program: "southwest", status: "member", fare: "choiceExtra", fields: { airfare: 200 } }, 2800],
  ["Southwest Choice Preferred, A-List", { program: "southwest", status: "alist", fare: "choicePref", fields: { airfare: 200 } }, 2500],
  ["Southwest Choice Extra, A-List Preferred", { program: "southwest", status: "alistPref", fare: "choiceExtra", fields: { airfare: 200 } }, 5600],
  // Miles & More: EUR 2,000 earns 8,000, or 12,000 with status.
  ["Lufthansa, member", { program: "milesandmore:lh", status: "member", fields: { airfare: 2000 } }, 8000],
  ["Lufthansa, Senator", { program: "milesandmore:lh", status: "sen", fields: { airfare: 2000 } }, 12000],
  ["Air Dolomiti minimum", { program: "milesandmore:en", status: "member", fields: { airfare: 9, carrierFees: 20 } }, 125],
  ["Eurowings minimum", { program: "milesandmore:ew", status: "member", fields: { airfare: 19, carrierFees: 5 } }, 125],
  ["Eurowings status rate", { program: "milesandmore:ew", status: "ftl", fields: { airfare: 100, carrierFees: 20 } }, 600],
  ["ITA within Italy, class M", { program: "milesandmore:az", fare: "m", zone: "dom" }, 500],
  ["ITA Rome to Tokyo, class J", { program: "milesandmore:az", fare: "j", zone: "intl", fields: { distance: 6155 } }, 12310],
  // LATAM Pass: Platinum, US$400 international fare.
  ["LATAM Platinum international", { program: "latam", status: "platinum", fare: "intl", fields: { airfare: 400 } }, 3600],
  // GOL Smiles.
  ["GOL Diamante within South America", { program: "gol", status: "diamante", fare: "sa", fields: { airfare: 800 } }, 4000],
  ["GOL Magno cap", { program: "gol", status: "magno", fare: "intl", fields: { airfare: 6000 } }, 60000],
  // SAS EuroBonus (SAS's own table).
  ["SAS Standard within Europe", { program: "sas", status: "member", fare: "std-high", zone: "eu" }, 1000],
  ["SAS Business Flex within Europe, Gold", { program: "sas", status: "gold", fare: "pflex-cdz", zone: "eu" }, 4500],
  ["SAS with an Economy to Business bid", { program: "sas", status: "member", fare: "std-high", zone: "eu", upgrade: "y-j" }, 1500],
  // China Southern's worked examples.
  ["China Southern ticket 784, Silver", { program: "chinasouthern", earn: "price", status: "silver", fields: { airfare: 4870.87 } }, 4677],
  ["China Southern other ticket, 500 km minimum", { program: "chinasouthern", earn: "distance", status: "silver", fare: "pbmh", fields: { distance: 216.86 } }, 600],
  // Fortune Wings Club.
  ["Hong Kong Airlines, Fortune Wings", { program: "hongkongairlines", status: "member", fields: { airfare: 2000, carrierFees: 300 } }, 2300],
  ["Hong Kong Airlines, Select", { program: "hongkongairlines", status: "select", fields: { airfare: 2000, carrierFees: 300 } }, 2530],
  ["Hainan Airlines, Silver", { program: "hainan", status: "silver", fields: { airfare: 1088, carrierFees: 30 } }, 1456],
  // Breeze: a Breezy 2 member on a US$200 Nicest fare.
  ["Breeze Breezy 2 Nicest", { program: "breeze", status: "breezy2", fare: "nicest", fields: { airfare: 200 } }, 1500],
  // JetBlue TrueBlue table.
  ["JetBlue member, direct", { program: "jetblue", status: "member", fare: "main", radios: { direct: "Yes" }, fields: { airfare: 100 } }, 600],
  ["JetBlue member, not direct", { program: "jetblue", status: "member", fare: "main", radios: { direct: "No" }, fields: { airfare: 100 } }, 300],
  // Frontier: seats and bags earn like the fare; GoWild fare earns 1 mile.
  ["Frontier with CIC and bags", { program: "frontier", status: "member", fare: "basic", fields: { airfare: 80, carrierFees: 20, addons: 60 } }, 160],
  ["Frontier GoWild, Gold cardmember bundle", { program: "frontier", status: "gold", fare: "bundle", radios: { gowild: "Yes", cardmember: "Yes" }, fields: { gowildFee: 50, addons: 40 } }, 1441],
  // Allegiant: 1 point per dollar to $500, 2 above; the CUC does not earn.
  ["Allegiant over $500", { program: "allegiant", fields: { airfare: 450, carrierFees: 25, addons: 100 } }, 600],
  // WestJet: seats, bags, and upgrades earn at the status rate.
  ["WestJet Platinum with extras", { program: "westjet", status: "platinum", fields: { airfare: 200, addons: 100 } }, 2400],
  // British Airways: extras are listed but do not earn Avios.
  ["British Airways extras do not earn", { program: "iag:ba", status: "blue", fields: { airfare: 200, carrierFees: 100, addons: 80 } }, 1800],
  // AAdvantage: paid upgrades earn at the status rate; Fiji earns like American.
  ["American Gold with an upgrade", { program: "american:aa", status: "gold", fields: { airfare: 300, addons: 200 } }, 3500],
  ["Fiji Airways Executive Platinum", { program: "american:fj", status: "exp", fields: { airfare: 600, carrierFees: 100 } }, 7700],
  // Atmos Rewards by distance, Gold +50%.
  ["Alaska by distance, Gold", { program: "alaska", earn: "distance", status: "gold", fields: { distance: 1000 } }, 1500]
];

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
