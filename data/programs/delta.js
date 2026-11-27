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
  statuses: [
    { id: "member", name: "SkyMiles Member", rate: 5 },
    { id: "silver", name: "Silver Medallion", rate: 7 },
    { id: "gold", name: "Gold Medallion", rate: 8 },
    { id: "platinum", name: "Platinum Medallion", rate: 9 },
    { id: "diamond", name: "Diamond Medallion", rate: 11 }
  ],
  // Co-branded cards: extra points per dollar charged (fare + taxes).
  cards: [
    { id: "blue", name: "Delta SkyMiles Blue Amex", rate: 2, bank: "American Express (US)" },
    { id: "gold", name: "Delta SkyMiles Gold Amex", rate: 2, bank: "American Express (US)" },
    { id: "plat", name: "Delta SkyMiles Platinum Amex", rate: 3, bank: "American Express (US)" },
    { id: "reserve", name: "Delta SkyMiles Reserve Amex", rate: 3, bank: "American Express (US)" }
  ],
  note: "SkyMiles are earned on base fare and carrier-imposed surcharges, and on paid upgrades and Comfort or Preferred seats. Basic Economy fares earn no miles. Earning is capped at 75,000 miles per ticket."
};

module.exports = {
  id: "delta",
  // Month the earning rules were last checked against the source.
  reviewed: "2026-11",
  code: "DL",
  color: "#003A70",
  source: "https://www.delta.com/us/en/skymiles/overview",
  rules
};
