// Builds the search-engine files from index.html and js/programs.js:
//   - one page per program at /airlines/<slug>/ with its own title and description
//   - sitemap.xml and robots.txt
// tools/build.js runs this after it rebuilds js/programs.js.
const fs = require("node:fs");
const path = require("node:path");

// The published site lives in docs/.
const ROOT = path.resolve(__dirname, "..", "docs");
const SITE = "https://points.alltripsconsidered.com/";

function slugify(s) {
  // Letters that do not decompose get their usual spelling (Widerøe: wideroe, as on wideroe.no).
  return s.replace(/ø/g, "o").replace(/Ø/g, "O").replace(/æ/g, "ae").replace(/Æ/g, "Ae").replace(/ß/g, "ss")
    .normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase()
    .replace(/&/g, " and ").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}
function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

// Every menu entry: its value, airline name, and program name.
function entries() {
  const compiled = require("./build.js").compile();
  const PROGRAMS = compiled.PROGRAMS;
  const out = [];
  Object.keys(PROGRAMS).forEach((key) => {
    const p = PROGRAMS[key];
    if (p.airlines) {
      p.airlines.forEach((al) => out.push({
        value: key + ":" + al.id,
        airline: al.name,
        program: (al.program && al.program.programName) || p.programName,
        alliance: al.alliance || null,
      }));
    } else {
      const [airline, program] = p.name.split(" | ");
      out.push({ value: key, airline, program: program || p.programName || airline, alliance: p.alliance || null });
    }
  });
  const logos = JSON.parse(fs.readFileSync(path.join(ROOT, "icons/airlines/index.json"), "utf8"));
  out.forEach((e) => {
    e.code = compiled.AIRLINE_CODES[e.value] || null;
    e.reviewed = compiled.REVIEWED[e.value] || null;
    e.icon = logos[e.value] ? logos[e.value].square : null;
  });
  const seen = {};
  out.forEach((e) => {
    let slug = slugify(e.airline);
    if (seen[slug]) slug = slugify(e.airline + " " + e.program);
    seen[slug] = true;
    e.slug = slug;
  });
  return out.sort((a, b) => a.slug.localeCompare(b.slug));
}

// Breadcrumb data so search results show Home > Airline.
function breadcrumb(e, url) {
  return '  <script type="application/ld+json">\n' + JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Airline Points Calculator", item: SITE },
      { "@type": "ListItem", position: 2, name: e.airline + " Points Calculator", item: url }
    ]
  }, null, 2).replace(/^/gm, "  ") + "\n  </script>\n";
}

// The airline itself, with its code, alliance and logo, for search engines.
function airlineData(e) {
  const a = { "@type": "Airline", name: e.airline };
  if (e.code) a.iataCode = e.code.split("/")[0];
  if (e.icon) a.logo = SITE + e.icon;
  if (e.alliance) a.memberOf = { "@type": "Organization", name: e.alliance };
  return a;
}

function page(html, e) {
  const title = e.airline + " Points Calculator: " + e.program + " | All Trips Considered";
  const desc = "Estimate the " + e.program + " points or miles you will earn on " + (/^(?!uni)[aeiou]|^HK /i.test(e.airline) ? "an " : "a ") + e.airline + " flight" +
    (e.alliance ? ", with your " + e.alliance + " status" : "") +
    ". Choose your status, fare and card. Free, no sign-up.";
  const url = SITE + "airlines/" + e.slug + "/";
  return html
    .replace(/<head>/, '<head>\n  <base href="../../">')
    // Every page uses the same browser title; the share title stays specific.
    .replace(/(<meta name="description" content=")[^"]*/, "$1" + esc(desc))
    .replace(/(<link rel="canonical" href=")[^"]*/, "$1" + url)
    .replace(/(<meta property="og:url" content=")[^"]*/, "$1" + url)
    .replace(/(<meta property="og:title" content=")[^"]*/, "$1" + esc(title))
    .replace(/(<meta property="og:description" content=")[^"]*/, "$1" + esc(desc))
    .replace(/(<meta name="twitter:title" content=")[^"]*/, "$1" + esc(title))
    .replace(/(<meta name="twitter:description" content=")[^"]*/, "$1" + esc(desc))
    .replace(/("name": ")Airline Points Calculator(")/, () => '"name": ' + JSON.stringify(e.airline + " Points Calculator"))
    .replace(/("url": ")[^"]*(")/, "$1" + url + "$2")
    .replace(/("description": ")[^"]*(")/, () => '"description": ' + JSON.stringify(desc))
    .replace(/("applicationCategory": ")/, () => '"about": ' + JSON.stringify(airlineData(e)) + ',\n    "applicationCategory": "')
    .replace(/(<meta property="og:image:alt" content=")[^"]*/, "$1" + esc(e.airline + " Points Calculator by All Trips Considered: " + e.program + ", free, no sign-up"))
    .replace(/  <\/script>\n/, "  </script>\n" + breadcrumb(e, url))
    .replace(/<html lang="en">/, '<html lang="en" data-preset="' + esc(e.value) + '">');
}

// The most recent review month across all programs, for the home page.
function latest(list) {
  return list.map((e) => e.reviewed).filter(Boolean).sort().pop() || null;
}

// Pages that were merged into another (old slug -> new slug).
const REDIRECTS = {
  "transavia-france": "transavia",
  "transavia-netherlands": "transavia"
};

function build() {
  const html = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
  const list = entries();
  const files = {};
  list.forEach((e) => { files["airlines/" + e.slug + "/index.html"] = page(html, e); });
  // Old addresses of merged entries point to the new page (not in the sitemap).
  Object.entries(REDIRECTS).forEach(([from, to]) => {
    const url = SITE + "airlines/" + to + "/";
    files["airlines/" + from + "/index.html"] = '<!doctype html>\n<html lang="en">\n<head>\n  <meta charset="utf-8">\n  <title>Points Calculator | All Trips Considered</title>\n' +
      '  <meta name="robots" content="noindex">\n  <link rel="canonical" href="' + url + '">\n' +
      '  <meta http-equiv="refresh" content="0; url=../' + to + '/">\n</head>\n<body>\n  <p>This page moved to <a href="../' + to + '/">' + url + '</a>.</p>\n</body>\n</html>\n';
  });
  files["sitemap.xml"] = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    [{ p: "", m: latest(list) }, { p: "privacy.html" }, ...list.map((e) => ({ p: "airlines/" + e.slug + "/", m: e.reviewed }))]
      .map((u) => "  <url><loc>" + SITE + u.p + "</loc>" + (u.m ? "<lastmod>" + u.m + "-01</lastmod>" : "") + "</url>").join("\n") + "\n</urlset>\n";
  files["robots.txt"] = "User-agent: *\nAllow: /\n\nSitemap: " + SITE + "sitemap.xml\n";
  return { list, files };
}

function main() {
  const { list, files } = build();
  // Start clean so a removed program leaves no stale page behind.
  fs.rmSync(path.join(ROOT, "airlines"), { recursive: true, force: true });
  Object.entries(files).forEach(([f, text]) => {
    fs.mkdirSync(path.dirname(path.join(ROOT, f)), { recursive: true });
    fs.writeFileSync(path.join(ROOT, f), text);
  });
  console.log("Wrote " + list.length + " program pages, sitemap.xml and robots.txt.");
}

module.exports = { build, slugify, main };

if (require.main === module) main();
