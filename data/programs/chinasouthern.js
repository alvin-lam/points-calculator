/* Sky Pearl Club, rules since 1 January 2025. Tickets issued by China
   Southern (784) earn on the price paid; tickets issued by another airline
   earn on kilometres flown by booking class, with a 500 km minimum. */

const rules = {
  name: "China Southern | Sky Pearl Club",
  country: "CN",
  currency: "CNY",
  unit: "miles",
  method: "distance",
  roundUp: true,
  distanceFactor: 1.609344,
  minDistance: 500,
  earnLabel: "Who issued your ticket?",
  earnHint: "China Southern tickets have a ticket number starting with 784.",
  earnMethods: [
    { id: "price", name: "Ticket number starts with 784 (issued by China Southern)", rate: 0.8, noFareType: true },
    { id: "distance", name: "Ticket issued by another airline" }
  ],
  defaultFareType: "pbmh",
  fareTypes: [
    { id: "f", name: "First (F)", rate: 3 },
    { id: "j", name: "Business (J)", rate: 2.5 },
    { id: "c", name: "Business (C)", rate: 2 },
    { id: "d", name: "Business (D)", rate: 1.5 },
    { id: "i", name: "Business (I)", rate: 1.25 },
    { id: "w", name: "Sky Pearl Economy (W)", rate: 1.25 },
    { id: "s", name: "Sky Pearl Economy (S)", rate: 0.75 },
    { id: "y", name: "Economy (Y)", rate: 1.25 },
    { id: "pbmh", name: "Economy (P, B, M, H)", rate: 1 },
    { id: "kualq", name: "Economy (K, U, A, L, Q)", rate: 0.75 },
    { id: "evz", name: "Economy (E, V, Z)", rate: 0.25 },
    { id: "tn", name: "Economy (T, N)", rate: 0.25 }
  ],
  statuses: [
    { id: "member", name: "Sky Pearl", multiplier: 1 },
    { id: "silver", name: "Silver", multiplier: 1.2 },
    { id: "gold", name: "Gold", multiplier: 1.3 },
    { id: "platinum", name: "Platinum", multiplier: 1.5 }
  ],
  note: "Sky Pearl Club tickets issued by China Southern (ticket number 784) earn 0.8 miles per yuan of fare plus fuel surcharge, excluding taxes, times the level factor: 1.0, 1.2 for Silver, 1.3 for Gold, and 1.5 for Platinum. Tickets issued by another airline earn the kilometres flown times the booking class percentage and the level factor, with a 500 km minimum. Miles are rounded up. Group, award, and special discount tickets do not earn. Enter fares in yuan."
};

module.exports = {
  id: "chinasouthern",
  // Month the earning rules were last checked against the source.
  reviewed: "2026-11",
  code: "CZ",
  color: "#006CB7",
  source: "https://www.csair.com/mcms/mcmsNewSite/mowenglish/cn/#/skypearl/earning/hkgs/zgnfhkgs",
  // Published examples. The browser tests check each one.
  examples: [
    // China Southern's worked examples.
    { name: "China Southern ticket 784, Silver", input: { earn: "price", status: "silver", fields: { airfare: 4870.87 } }, expect: 4677 },
    { name: "China Southern other ticket, 500 km minimum", input: { earn: "distance", status: "silver", fare: "pbmh", fields: { distance: 216.86 } }, expect: 600 }
  ],
  rules
};
