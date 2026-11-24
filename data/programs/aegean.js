/* Aegean Miles+Bonus: a fixed number of miles per flight by fare family
   and booking class (Aegean and Olympic Air, bookings from 17 May 2023).
   Only domestic flights within Greece are included so far; the
   international table and status bonuses are still to be added. */
const L = "L, W, V, O, Q, K, J, S, E, H, F";
const rules = {
  name: "Aegean Airlines | Miles+Bonus",
  programName: "Miles+Bonus",
  country: "GR",
  currency: "EUR",
  unit: "miles",
  method: "distance",
  zoneLabel: "Route",
  zoneHint: "Aegean awards a fixed number of miles per flight for each fare and booking class.",
  zones: [
    { id: "domestic", name: "Domestic (within Greece)", fixed: true }
  ],
  defaultFareType: "flex-l",
  // Earn lists follow the zones order. Classes I, X, N and R earn nothing.
  fareTypes: [
    { id: "business", name: "Business (C, D, Z, A)", earn: [{ fixed: 1200 }] },
    { id: "business-basic", name: "Business Basic (C, D, Z, A)", earn: [{ fixed: 1100 }] },
    { id: "comfort-y", name: "Comfort Flex (Y, M, B)", earn: [{ fixed: 1000 }] },
    { id: "comfort-l", name: "Comfort Flex (" + L + ")", earn: [{ fixed: 900 }] },
    { id: "comfort-u", name: "Comfort Flex (U, P, T)", earn: [{ fixed: 500 }] },
    { id: "flex-y", name: "Flex or Family (Y, M, B)", earn: [{ fixed: 800 }] },
    { id: "flex-l", name: "Flex or Family (L, W, V, O, G, Q, K, J, S, E, H, F)", earn: [{ fixed: 600 }] },
    { id: "flex-u", name: "Flex or Family (U, P, T)", earn: [{ fixed: 300 }] },
    { id: "light-y", name: "Light (Y, M, B)", earn: [{ fixed: 500 }] },
    { id: "light-l", name: "Light (" + L + ")", earn: [{ fixed: 250 }] },
    { id: "light-u", name: "Light (U, P, T)", earn: [{ fixed: 100 }] }
  ],
  statuses: [
    { id: "member", name: "Miles+Bonus Member", multiplier: 1 }
  ],
  note: "Miles+Bonus awards a fixed number of miles per domestic flight, from 100 on Light (U, P, T) to 1,200 in Business. Booking classes I, X, N and R earn nothing. Registered Together ForFamilies accounts earn 20% more. Status bonuses are not included."
};

module.exports = {
  id: "aegean",
  // Month the earning rules were last checked against the source.
  reviewed: "2026-11",
  code: "A3",
  color: "#0B2E59",
  source: "https://en.aegeanair.com/milesandbonus/partners-v1/airlines/aegean/",
  // From Aegean's domestic earning table.
  examples: [
    { name: "Aegean domestic Business", input: { fare: "business", zone: "domestic" }, expect: 1200 },
    { name: "Aegean domestic Light (U, P, T)", input: { fare: "light-u", zone: "domestic" }, expect: 100 }
  ],
  rules
};
