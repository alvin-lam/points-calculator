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

  // Lower case without accents, so "zurich" finds "Zürich".
  function fold(text) {
    // Letters with no separate accent are spelled out ("tromso" finds Tromsø).
    return String(text || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/[øæœßłđı]/g, function (ch) { return { "ø": "o", "æ": "ae", "œ": "oe", "ß": "ss", "ł": "l", "đ": "d", "ı": "i" }[ch]; })
      .replace(/\s+/g, " ").trim();
  }

  // Main airports of cities whose airports the data lists under other
  // town names (Narita, Newark, Dulles) or that share a name with a
  // smaller city elsewhere (London, Ontario; Sydney, Nova Scotia).
  var METROS = {
    "tokyo": ["HND", "NRT"], "osaka": ["KIX", "ITM"], "seoul": ["ICN", "GMP"],
    "taipei": ["TPE", "TSA"], "shanghai": ["PVG", "SHA"], "beijing": ["PEK", "PKX"],
    "bangkok": ["BKK", "DMK"], "jakarta": ["CGK", "HLP"], "kuala lumpur": ["KUL", "SZB"],
    "dubai": ["DXB", "DWC"], "istanbul": ["IST", "SAW"], "moscow": ["SVO", "DME", "VKO"],
    "london": ["LHR", "LGW", "STN", "LTN", "LCY", "SEN"], "paris": ["CDG", "ORY"],
    "milan": ["MXP", "LIN", "BGY"], "rome": ["FCO", "CIA"], "stockholm": ["ARN", "BMA"],
    "new york": ["JFK", "EWR", "LGA"], "washington": ["IAD", "DCA", "BWI"],
    "chicago": ["ORD", "MDW"], "houston": ["IAH", "HOU"], "dallas": ["DFW", "DAL"],
    "los angeles": ["LAX"], "san francisco": ["SFO"], "miami": ["MIA", "FLL"],
    "toronto": ["YYZ", "YTZ"], "montreal": ["YUL"], "vancouver": ["YVR"],
    "mexico city": ["MEX", "NLU"], "sao paulo": ["GRU", "CGH", "VCP"],
    "rio de janeiro": ["GIG", "SDU"], "buenos aires": ["EZE", "AEP"],
    "sydney": ["SYD", "WSI"], "mumbai": ["BOM", "NMI"], "delhi": ["DEL", "DXN"], "new delhi": ["DEL", "DXN"],
    "phnom penh": ["KTI"], "siem reap": ["SAI"], "luanda": ["NBJ", "LAD"], "munich": ["MUC"], "munchen": ["MUC"],
    "melbourne": ["MEL", "AVV"], "auckland": ["AKL"], "bali": ["DPS"], "sapporo": ["CTS", "OKD"],
    "reykjavik": ["KEF", "RKV"], "bucharest": ["OTP", "BBU"],
    "panama": ["PTY", "PAC"], "panama city": ["PTY", "PAC", "ECP"], "montevideo": ["MVD"],
    "asuncion": ["ASU"], "la paz": ["LPB", "LAP"], "seattle": ["SEA", "BFI"],
    "barcelona": ["BCN", "BLA"], "brussels": ["BRU", "CRL"], "johannesburg": ["JNB", "HLA"],
    "bengaluru": ["BLR"], "okinawa": ["OKA"], "fiji": ["NAN", "SUV"]
  };

  // IATA metropolitan area codes for cities with several airports. Some
  // are also an airport's own code (TPE, SHA, BKK); typing one of those
  // still finds that airport first.
  var METRO_CODES = {
    NYC: "new york", TYO: "tokyo", LON: "london", PAR: "paris", MIL: "milan",
    ROM: "rome", STO: "stockholm", MOW: "moscow", WAS: "washington", CHI: "chicago",
    YTO: "toronto", YMQ: "montreal", SAO: "sao paulo", RIO: "rio de janeiro",
    BUE: "buenos aires", OSA: "osaka", SEL: "seoul", BJS: "beijing", JKT: "jakarta",
    SPK: "sapporo", REK: "reykjavik", BUH: "bucharest", SHA: "shanghai",
    TPE: "taipei", BKK: "bangkok", DXB: "dubai", IST: "istanbul", HOU: "houston",
    DFW: "dallas", KUL: "kuala lumpur"
  };
  // The main airports for a typed city name or metro code.
  // Codes that were retired and given to a new code for the same airport
  // (Chișinău KIV is now RMO) or for the airport that replaced it (Siem
  // Reap REP is now SAI). Typing the old code still finds the airport.
  var OLD_CODES = { KIV: "RMO", FRU: "BSZ", KVD: "GNJ", PBI: "DJT", REP: "SAI" };
  function currentCode(airports, code) {
    if (code && !airports[code] && OLD_CODES[code] && airports[OLD_CODES[code]]) return OLD_CODES[code];
    return code;
  }
  function metroFor(q) {
    return METROS[q] || METROS[METRO_CODES[q.toUpperCase()]] || [];
  }

  // Find the airport for what the visitor typed: a code, a suggestion, a
  // city name ("Tokyo") or an airport name ("Haneda"). Returns
  // { code } for one airport, { matches: [codes] } when a city has several,
  // or null when nothing matches.
  function resolveAirport(airports, text) {
    var code = currentCode(airports, parseCode(text));
    if (code && airports[code]) return { code: code };
    var q = fold(text);
    // One or two letters are not yet a code or a place ("LH" on the way to
    // LHR is not Shannan, LXA), so they name no airport.
    if (q.length < 3) return null;
    var metro = metroFor(q).filter(function (c) { return airports[c]; });
    if (metro.length === 1) return { code: metro[0] };
    // A city's main airports keep the order listed in METROS.
    if (metro.length > 1) return { matches: metro, ordered: true };
    var codes = Object.keys(airports);
    var tests = [
      function (a) { return fold(a[2]) === q; },
      function (a) { return fold(a[3]) === q; },
      function (a) { return fold(a[2]).indexOf(q) === 0; },
      function (a) { return (" " + fold(a[3])).indexOf(" " + q) !== -1; },
      // A word inside the city's name, as the dropdown suggests it
      // ("palm beach" for West Palm Beach).
      function (a) { return (" " + fold(a[2])).indexOf(" " + q) !== -1; }
    ];
    for (var i = 0; i < tests.length; i++) {
      var hits = codes.filter(function (c) { return tests[i](airports[c]); });
      if (hits.length === 1) return { code: hits[0] };
      if (hits.length > 1) return { matches: hits };
    }
    return null;
  }

  // Airports for the dropdown, best match first: the exact code, a city's
  // main airports, the city, code and city starts, then airport names.
  function searchAirports(airports, text, limit) {
    var q = fold(text);
    if (!q) return [];
    var metro = metroFor(q);
    // A code (airport or metro) lists its airports, then only names that
    // start with it, not names that merely contain the letters.
    var oldTo = OLD_CODES[q.toUpperCase()];
    var isCode = metro.length > 0 || !!airports[q.toUpperCase()] || !!oldTo;
    var hits = [];
    Object.keys(airports).forEach(function (code) {
      var a = airports[code], c = code.toLowerCase(), city = fold(a[2]), name = fold(a[3]);
      var score = c === q || code === oldTo ? 0
        : metro.indexOf(code) !== -1 ? 1
        : city === q ? 2
        : q.length <= 3 && c.indexOf(q) === 0 ? 3
        : city.indexOf(q) === 0 ? 4
        : (" " + name).indexOf(" " + q) !== -1 ? 5
        : city.indexOf(q) !== -1 || name.indexOf(q) !== -1 ? 6 : -1;
      if (score === -1 || (isCode && score >= 5)) return;
      // A city's main airports keep the order listed in METROS.
      var intl = score === 1 ? metro.indexOf(code) : (/international/.test(name) ? 0 : 1);
      hits.push([score, intl, city || name, code]);
    });
    hits.sort(function (x, y) { return x[0] - y[0] || x[1] - y[1] || (x[2] < y[2] ? -1 : x[2] > y[2] ? 1 : 0); });
    return hits.slice(0, limit || 30).map(function (h) { return h[3]; });
  }

  // Look up both airports and return the rounded distance, or null.
  function airportMiles(airports, fromText, toText) {
    var a = resolveAirport(airports, fromText), b = resolveAirport(airports, toText);
    var from = a && a.code, to = b && b.code;
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
    resolveAirport: resolveAirport,
    searchAirports: searchAirports,
    airportMiles: airportMiles,
    airportLabel: airportLabel
  };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.Distance = api;
})(this);
