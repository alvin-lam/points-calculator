// Checks that the program pages, sitemap and robots file match the
// current data. If this fails, run: node tools/build.js
const test = require("node:test");
const assert = require("node:assert");
const fs = require("node:fs");
const path = require("node:path");
const { build } = require("../tools/build-pages.js");

const ROOT = path.resolve(__dirname, "..");
const { list, files } = build();

test("every program has a page, and the generated files are current", () => {
  for (const [f, text] of Object.entries(files)) {
    const p = path.join(ROOT, f);
    assert.ok(fs.existsSync(p), f + " is missing");
    assert.strictEqual(fs.readFileSync(p, "utf8"), text, f + " is out of date");
  }
  const dirs = fs.readdirSync(path.join(ROOT, "airlines"));
  assert.strictEqual(dirs.length, list.length, "stale folders in airlines/");
});

test("page addresses are unique and readable", () => {
  const slugs = list.map((e) => e.slug);
  assert.strictEqual(new Set(slugs).size, slugs.length);
  slugs.forEach((s) => assert.match(s, /^[a-z0-9]+(-[a-z0-9]+)*$/));
});

test("each page names its program and presets it", () => {
  list.forEach((e) => {
    const html = files["airlines/" + e.slug + "/index.html"];
    assert.ok(html.includes('data-preset="' + e.value + '"'), e.slug);
    assert.ok(html.includes("/airlines/" + e.slug + "/"), e.slug + " canonical");
  });
  assert.ok(fs.existsSync(path.join(ROOT, "icons/og-image.png")));
});
