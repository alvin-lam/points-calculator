// Prototype: Emirates Skywards in the program menu. Emirates publishes no
// earning table, only its own miles calculator, so choosing Emirates shows
// that calculator in a frame instead of the form. Loaded only by
// prototype/emirates/, before js/app.js.
(function () {
  var URL = "https://www.emirates.com/us/english/skywards/miles-calculator/";
  window.PROGRAMS.emirates = {
    name: "Emirates | Emirates Skywards",
    programName: "Emirates Skywards",
    country: "AE",
    unit: "Skywards Miles",
    method: "spend",
    external: URL,
    statuses: [{ id: "blue", name: "Skywards Blue", multiplier: 1 }],
    note: "Emirates publishes a miles calculator instead of an earning table."
  };
  window.AIRLINE_CODES.emirates = "EK";
  window.BRAND_COLORS.emirates = "#D71921";
  window.SOURCES.emirates = URL;

  document.addEventListener("DOMContentLoaded", function () {
    var form = document.getElementById("calc");
    var program = document.getElementById("program");
    var panel = document.getElementById("externalCalc");
    var frame = document.getElementById("externalFrame");
    var link = document.getElementById("externalLink");
    link.href = URL;
    function sync() {
      var on = program.value === "emirates";
      document.body.classList.toggle("external-mode", on);
      panel.hidden = !on;
      if (on && frame.getAttribute("src") !== URL) frame.setAttribute("src", URL);
    }
    program.addEventListener("change", sync);
    // The calculator has nothing to compute for Emirates.
    form.addEventListener("submit", function (e) {
      if (program.value === "emirates") { e.preventDefault(); e.stopImmediatePropagation(); }
    }, true);
    sync();
  });
})();
