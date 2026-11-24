const rules = {
  name: "Delta Air Lines | SkyMiles",
  // Paid seat upgrades earn miles like the fare.
  addons: true,
  addonsLabel: "Paid Upgrades",
  addonsHint: "The price of a seat upgrade bought from Delta, such as Comfort or First. It earns miles at your status rate.",
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
    { id: "blue", name: "Delta SkyMiles Blue Amex", rate: 2 },
    { id: "gold", name: "Delta SkyMiles Gold Amex", rate: 2 },
    { id: "plat", name: "Delta SkyMiles Platinum Amex", rate: 3 },
    { id: "reserve", name: "Delta SkyMiles Reserve Amex", rate: 3 }
  ],
  note: "SkyMiles are earned on base fare and carrier-imposed surcharges, and on paid seat upgrades. Basic Economy fares earn no miles. Earning is capped at 75,000 miles per ticket."
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
