/* Great-circle distance between two airports, for programs that earn by
   distance. Works in the browser (window.Distance) and in Node. */
(function (root) {
  "use strict";

  var EARTH_RADIUS_MILES = 3958.8;

  function toRad(d) { return d * Math.PI / 180; }

  // Haversine distance in statute miles between two [lat, lon] points.
  function greatCircleMiles(a, b) {
    var dLat = toRad(b[0] - a[0]);
    var dLon = toRad(b[1] - a[1]);
    var h = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(a[0])) * Math.cos(toRad(b[0])) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    return 2 * EARTH_RADIUS_MILES * Math.asin(Math.min(1, Math.sqrt(h)));
  }

  // Pull a three-letter airport code from what the visitor typed, such as
  // "jfk", "JFK", or "JFK - New York (John F Kennedy International Airport)".
  function parseCode(text) {
    // Only an exact code ("JFK") or a suggestion ("JFK - New York ..."), so a
    // city name such as "New York" is not read as the code "NEW".
    var m = String(text || "").trim().toUpperCase().match(/^([A-Z]{3})(?:\s+-\s|$)/);
    return m ? m[1] : null;
  }

  // Look up both airports and return the rounded distance, or null.
  function airportMiles(airports, fromText, toText) {
    var from = parseCode(fromText), to = parseCode(toText);
    if (!from || !to || !airports[from] || !airports[to]) return null;
    return {
      from: from,
      to: to,
      miles: Math.round(greatCircleMiles(airports[from], airports[to])),
      // Unrounded, so programs that count kilometres are not rounded twice.
      exact: greatCircleMiles(airports[from], airports[to])
    };
  }

  // Text shown for an airport in the suggestions list.
  function airportLabel(code, a) {
    return code + " - " + (a[2] ? a[2] + " (" + a[3] + ")" : a[3]);
  }

  var api = {
    greatCircleMiles: greatCircleMiles,
    parseCode: parseCode,
    airportMiles: airportMiles,
    airportLabel: airportLabel
  };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.Distance = api;
})(this);
