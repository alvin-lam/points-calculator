// Network first, so rate updates show up right away. The cache is a
// fallback that lets the calculator open without a connection.
var CACHE = "points-calc-v177";
var SHELL = [
  "./", "index.html", "css/styles.css", "css/privacy.css", "js/programs.js", "js/distance.js", "js/app.js", "js/install.js", "js/airports.json", "js/logos.json", "js/theme-boot.js", "fonts/instrument-serif-v5-latin.woff2", "fonts/instrument-serif-v5-latin-ext.woff2", "privacy.html",
  "manifest.webmanifest", "favicon.ico", "icons/icon-192.png", "icons/tabicon-32.png", "icons/tabicon-192.png"
];

self.addEventListener("install", function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(SHELL); }));
  self.skipWaiting();
});

self.addEventListener("activate", function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k !== CACHE; })
      .map(function (k) { return caches.delete(k); }));
  }));
  self.clients.claim();
});

self.addEventListener("fetch", function (e) {
  var req = e.request;
  if (req.method !== "GET" || new URL(req.url).origin !== location.origin) return;
  e.respondWith(
    fetch(req).then(function (res) {
      var copy = res.clone();
      caches.open(CACHE).then(function (c) { c.put(req, copy); });
      return res;
    }).catch(function () {
      return caches.match(req).then(function (hit) { return hit || caches.match("index.html"); });
    })
  );
});
