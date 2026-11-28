const rules = {
  name: "Delta Air Lines | SkyMiles",
  // Paid seat upgrades earn miles like the fare.
  addons: true,
  addonsLabel: "Paid Upgrades and Seats",
  addonsHint: "Paid upgrades (such as to Comfort or First) and Preferred seats bought from Delta. They earn miles at your status rate. Purchases at airport kiosks in Amsterdam and Paris do not earn.",
  unit: "miles",
  method: "spend",
  cap: 75000,
  centsPerPoint: 1.2,
  // Miles per dollar by fare (Delta, July 2026): Main Basic earns none,
  // Main Classic and the other fares earn the status rate, and Main Extra
  // earns 2 more. Delta publishes 5 and 7 for members; the Medallion Main
  // Extra rates (status rate + 2) come from NerdWallet, not from Delta.
  defaultFareType: "classic",
  fareTypes: [
    { id: "basic", name: "Delta Main Basic" },
    { id: "classic", name: "Main Classic, Comfort, First, Premium Select or Delta One" },
    { id: "extra", name: "Delta Main Extra" }
  ],
  statuses: [
    { id: "member", name: "SkyMiles Member", rates: { basic: 0, classic: 5, extra: 7 } },
    { id: "silver", name: "Silver Medallion", rates: { basic: 0, classic: 7, extra: 9 } },
    { id: "gold", name: "Gold Medallion", rates: { basic: 0, classic: 8, extra: 10 } },
    { id: "platinum", name: "Platinum Medallion", rates: { basic: 0, classic: 9, extra: 11 } },
    { id: "diamond", name: "Diamond Medallion", rates: { basic: 0, classic: 11, extra: 13 } }
  ],
  // Co-branded cards: extra points per dollar charged (fare + taxes).
  cards: [
    { id: "blue", name: "Delta SkyMiles Blue Amex", rate: 2, bank: "American Express (US)" },
    { id: "gold", name: "Delta SkyMiles Gold Amex", rate: 2, bank: "American Express (US)" },
    { id: "plat", name: "Delta SkyMiles Platinum Amex", rate: 3, bank: "American Express (US)" },
    { id: "reserve", name: "Delta SkyMiles Reserve Amex", rate: 3, bank: "American Express (US)" }
  ],
  note: "SkyMiles are earned on base fare and carrier-imposed surcharges, and on paid upgrades and Comfort or Preferred seats. Delta Main Basic fares earn no miles, and Delta Main Extra earns 2 more miles per dollar than Main Classic (7 instead of 5 for members). Earning is capped at 75,000 miles per ticket."
};

module.exports = {
  id: "delta",
  // Month the earning rules were last checked against the source.
  reviewed: "2026-11",
  code: "DL",
  color: "#003A70",
  source: "https://www.delta.com/us/en/skymiles/overview",
  // Published examples. The browser tests check each one.
  examples: [
    // Delta agency page "Delta Main" (July 2026): 5 miles per $1 on Main Classic, 7 on Main Extra.
    { name: "Delta Main Classic, member", input: { status: "member", fare: "classic", fields: { airfare: 200 } }, expect: 1000 },
    { name: "Delta Main Extra, member", input: { status: "member", fare: "extra", fields: { airfare: 200 } }, expect: 1400 },
    { name: "Delta Main Basic, member", input: { status: "member", fare: "basic", fields: { airfare: 200 } }, expect: 0 }
  ],
  rules
};
