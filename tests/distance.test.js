// Checks on the airport distance math in js/distance.js. No browser needed.
const test = require("node:test");
const assert = require("node:assert");
const path = require("node:path");

const D = require(path.join(__dirname, "..", "js", "distance.js"));
global.window = {};
global.window.AIRPORTS = require(path.join(__dirname, "..", "js", "airports.json"));
const A = window.AIRPORTS;

// Published great-circle distances, in statute miles, with a small tolerance
// for rounding of airport coordinates.
const routes = [
  ["JFK", "LHR", 3451],
  ["LAX", "ICN", 5973],
  ["JFK", "DOH", 6694],
  ["SYD", "LAX", 7488],
  ["FRA", "SIN", 6398]
];

for (const [from, to, miles] of routes) {
  test(from + " to " + to + " is about " + miles + " miles", () => {
    const r = D.airportMiles(A, from, to);
    assert.ok(r, "no result");
    assert.ok(Math.abs(r.miles - miles) <= 15, "got " + r.miles);
  });
}

test("distance is the same in both directions", () => {
  assert.strictEqual(D.airportMiles(A, "JFK", "LHR").miles, D.airportMiles(A, "LHR", "JFK").miles);
});

test("codes are read from typed text or a suggestion", () => {
  assert.strictEqual(D.parseCode("jfk"), "JFK");
  assert.strictEqual(D.parseCode(" DOH "), "DOH");
  assert.strictEqual(D.parseCode("LAX - Los Angeles (Los Angeles International Airport)"), "LAX");
  assert.strictEqual(D.parseCode("New York"), null);
  assert.strictEqual(D.parseCode(""), null);
});

test("unknown airports give no distance", () => {
  assert.strictEqual(D.airportMiles(A, "JFK", "QQQ"), null);
  assert.strictEqual(D.airportMiles(A, "", "LHR"), null);
});

test("the airport list covers the airlines' main hubs", () => {
  const hubs = ["ATL", "DFW", "ORD", "DEN", "SEA", "YYZ", "MEX", "LHR", "CDG", "AMS", "FRA", "MUC",
    "ZRH", "VIE", "MAD", "DUB", "LIS", "HEL", "KEF", "DOH", "AUH", "IST", "HKG", "NRT", "HND",
    "ICN", "TPE", "SIN", "KUL", "SYD", "AKL", "PEK", "PVG", "CAN", "GRU", "SCL", "BOG", "PTY", "ARN"];
  for (const h of hubs) assert.ok(A[h], h + " is missing");
});
