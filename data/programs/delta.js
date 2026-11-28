const rules = {
  name: "Delta Air Lines | SkyMiles",
  // Paid seat upgrades earn miles like the fare.
  addons: true,
  addonsLabel: "Paid Upgrades and Seats",
  addonsHint: "Paid upgrades (such as to Comfort or First) and Preferred seats bought from Delta. They earn miles at your status rate. Purchases at airport kiosks in Amsterdam and Paris do not earn.",
  unit: "miles",
  method: "spend",
  // No earning cap.
  centsPerPoint: 1.2,
  // Miles per dollar on Delta-marketed flights by experience (Delta): 5 in
  // Classic or Refundable and 7 in Extra for General Members, 2 with the
  // other Basic experiences (Comfort, First, Premium Select, Delta One),
  // and none in Delta Main Basic. Medallion members earn 7, 8, 9 or 11 in
  // Classic or Refundable (Delta's Medallion page). Their Extra rates
  // (2 more) and Basic rates (2, as for members) are assumed.
  defaultFareType: "classic",
  fareTypes: [
    { id: "basic", name: "Delta Main Basic" },
    { id: "basic-other", name: "Basic in Comfort, First, Premium Select or Delta One" },
    { id: "classic", name: "Classic or Refundable" },
    { id: "extra", name: "Extra" }
  ],
  statuses: [
    { id: "member", name: "SkyMiles Member", rates: { basic: 0, "basic-other": 2, classic: 5, extra: 7 } },
    { id: "silver", name: "Silver Medallion", rates: { basic: 0, "basic-other": 2, classic: 7, extra: 9 } },
    { id: "gold", name: "Gold Medallion", rates: { basic: 0, "basic-other": 2, classic: 8, extra: 10 } },
    { id: "platinum", name: "Platinum Medallion", rates: { basic: 0, "basic-other": 2, classic: 9, extra: 11 } },
    { id: "diamond", name: "Diamond Medallion", rates: { basic: 0, "basic-other": 2, classic: 11, extra: 13 } }
  ],
  // Co-branded cards: extra points per dollar charged (fare + taxes).
  cards: [
    { id: "blue", name: "Delta SkyMiles Blue Amex", rate: 2, bank: "American Express (US)" },
    { id: "gold", name: "Delta SkyMiles Gold Amex", rate: 2, bank: "American Express (US)" },
    { id: "plat", name: "Delta SkyMiles Platinum Amex", rate: 3, bank: "American Express (US)" },
    { id: "reserve", name: "Delta SkyMiles Reserve Amex", rate: 3, bank: "American Express (US)" }
  ],
  note: "SkyMiles are earned on base fare and carrier-imposed surcharges, and on paid upgrades and Comfort or Preferred seats. General SkyMiles Members earn 5 miles per dollar in Classic or Refundable and 7 in Extra on Delta-marketed flights. Other Basic experiences (Comfort, First, Premium Select or Delta One Basic) earn 2 miles per dollar, and Delta Main Basic earns none. Medallion members earn 7, 8, 9 or 11 in Classic or Refundable; their Extra and Basic rates here are estimates. There is no earning cap."
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
    // Delta: General Members earn 5 per $1 in Classic or Refundable, 7 in Extra, 2 with other Basic experiences, none in Main Basic.
    { name: "Delta Classic, member", input: { status: "member", fare: "classic", fields: { airfare: 200 } }, expect: 1000 },
    { name: "Delta Extra, member", input: { status: "member", fare: "extra", fields: { airfare: 200 } }, expect: 1400 },
    { name: "Delta Main Basic, member", input: { status: "member", fare: "basic", fields: { airfare: 200 } }, expect: 0 },
    { name: "Delta Comfort Basic, member", input: { status: "member", fare: "basic-other", fields: { airfare: 200 } }, expect: 400 }
  ],
  rules
};
