// Runs in <head>: apply a saved light or dark mode before the page paints.
// (A file, not inline code, so the Content-Security-Policy can forbid inline scripts.)
(function () {
  "use strict";
  try {
    var t = localStorage.getItem("theme");
    if (t === "light" || t === "dark") document.documentElement.setAttribute("data-theme", t);
  } catch (e) {}
})();
