// Builds the search-engine files from index.html and js/programs.js:
//   - one page per program at /airlines/<slug>/ with its own title and description
//   - sitemap.xml and robots.txt
// tools/build.js runs this after it rebuilds js/programs.js.
const fs = require("node:fs");
const path = require("node:path");

const ROOT = path.resolve(__dirname, "..");
const SITE = "https://points.alltripsconsidered.com/";

function slugify(s) {
  return s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase()
    .replace(/&/g, " and ").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}
function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

// Every menu entry: its value, airline name, and program name.
function entries() {
  const PROGRAMS = require("./build.js").compile().PROGRAMS;
  const out = [];
  Object.keys(PROGRAMS).forEach((key) => {
    const p = PROGRAMS[key];
    if (p.airlines) {
      p.airlines.forEach((al) => out.push({
        value: key + ":" + al.id,
        airline: al.name,
        program: (al.program && al.program.programName) || p.programName,
      }));
    } else {
      const [airline, program] = p.name.split(" | ");
      out.push({ value: key, airline, program: program || p.programName || airline });
    }
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

function page(html, e) {
  const title = e.airline + " Points Calculator: " + e.program + " | All Trips Considered";
  const desc = "Estimate the " + e.program + " points or miles you will earn on a " + e.airline +
    " flight. Choose your status and fare, and see the result in seconds.";
  const url = SITE + "airlines/" + e.slug + "/";
  return html
    .replace(/<head>/, '<head>\n  <base href="../../">')
    .replace(/<title>[^<]*<\/title>/, "<title>" + esc(title) + "</title>")
    .replace(/(<meta name="description" content=")[^"]*/, "$1" + esc(desc))
    .replace(/(<link rel="canonical" href=")[^"]*/, "$1" + url)
    .replace(/(<meta property="og:url" content=")[^"]*/, "$1" + url)
    .replace(/(<meta property="og:title" content=")[^"]*/, "$1" + esc(title))
    .replace(/(<meta property="og:description" content=")[^"]*/, "$1" + esc(desc))
    .replace(/(<meta name="twitter:title" content=")[^"]*/, "$1" + esc(title))
    .replace(/(<meta name="twitter:description" content=")[^"]*/, "$1" + esc(desc))
    .replace(/("name": ")Airline Points Calculator(")/, "$1" + esc(e.airline) + " Points Calculator$2")
    .replace(/("url": ")[^"]*(")/, "$1" + url + "$2")
    .replace(/<script>\n    \/\/ Apply a saved theme/, '<script>window.PRESET_PROGRAM = "' + e.value + '";</script>\n  <script>\n    // Apply a saved theme');
}

function build() {
  const html = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
  const list = entries();
  const files = {};
  list.forEach((e) => { files["airlines/" + e.slug + "/index.html"] = page(html, e); });
  files["sitemap.xml"] = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    ["", ...list.map((e) => "airlines/" + e.slug + "/")].map((p) => "  <url><loc>" + SITE + p + "</loc></url>").join("\n") + "\n</urlset>\n";
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
