// Checks on the program data (built from data/ into js/programs.js). No browser needed:
//   node --test tests/
const test = require("node:test");
const assert = require("node:assert");
const path = require("node:path");

global.window = {};
require(path.join(__dirname, "..", "js", "programs.js"));
const P = window.PROGRAMS;

// Every entry in the airline menu: a program id, or "program:airline".
const entries = [];
for (const key of Object.keys(P)) {
  if (P[key].airlines) P[key].airlines.forEach((a) => entries.push({ value: key + ":" + a.id, p: P[key], a }));
  else entries.push({ value: key, p: P[key], a: null });
}
const lookup = (map, value) => map[value] || map[value.split(":")[0]];

test("every program has a name, a unit, statuses, and a note", () => {
  for (const key of Object.keys(P)) {
    const p = P[key];
    assert.ok(p.name, key + " has no name");
    assert.ok(p.unit, key + " has no unit");
    assert.ok(Array.isArray(p.statuses) && p.statuses.length, key + " has no statuses");
    assert.ok(p.note, key + " has no note");
  }
});

test("every menu entry belongs to a listed country", () => {
  const ids = new Set(window.COUNTRIES.map((c) => c.id));
  for (const e of entries) {
    const country = (e.a && e.a.country) || e.p.country || "US";
    assert.ok(ids.has(country), e.value + " uses unknown country " + country);
  }
});

test("every menu entry has a brand color", () => {
  for (const e of entries) {
    const c = lookup(window.BRAND_COLORS, e.value);
    assert.match(c || "", /^#[0-9A-Fa-f]{6}$/, e.value + " has no valid brand color");
  }
});

test("every menu entry has an https source", () => {
  for (const e of entries) {
    const s = lookup(window.SOURCES, e.value);
    assert.match(s || "", /^https:\/\//, e.value + " has no source");
  }
});

test("every menu entry has a review month", () => {
  for (const e of entries) {
    assert.match(window.REVIEWED[e.value] || "", /^[A-Z][a-z]+ \d{4}$/, e.value + " has no review month");
  }
});

test("airline codes are two characters", () => {
  for (const [value, code] of Object.entries(window.AIRLINE_CODES)) {
    assert.match(code, /^[A-Z0-9]{2}$/, value + " has a bad code " + code);
  }
});

test("fare type and status ids are unique within a program", () => {
  const check = (list, label) => {
    const ids = list.map((x) => x.id);
    assert.strictEqual(new Set(ids).size, ids.length, label + " repeats an id");
  };
  for (const e of entries) {
    const p = Object.assign({}, e.p, (e.a && e.a.program) || {});
    check(p.statuses, e.value + " statuses");
    if (p.fareTypes) check(p.fareTypes, e.value + " fare types");
  }
});

test("zone tables have one value per fare type", () => {
  for (const e of entries) {
    const p = Object.assign({}, e.p, (e.a && e.a.program) || {});
    if (p.method !== "zone" || !p.zones) continue;
    for (const z of p.zones) {
      assert.strictEqual(z.points.length, p.fareTypes.length, e.value + " zone " + z.id + " has the wrong number of values");
    }
  }
});

test("distance earn lists have one value per zone", () => {
  for (const e of entries) {
    const p = Object.assign({}, e.p, (e.a && e.a.program) || {});
    if (p.method !== "distance" || !p.zones || !p.fareTypes) continue;
    for (const f of p.fareTypes) {
      if (f.earn) assert.strictEqual(f.earn.length, p.zones.length, e.value + " " + f.id + " earn list does not match the zones");
    }
  }
});

test("js/programs.js matches the files in data/", () => {
  const fs = require("node:fs");
  const path = require("node:path");
  const { compile, render } = require("../tools/build.js");
  const built = render(compile());
  const onDisk = fs.readFileSync(path.join(__dirname, "..", "js/programs.js"), "utf8");
  assert.strictEqual(onDisk, built, "js/programs.js is out of date. Run: node tools/build.js");
});

