const rules = {
  name: "Allegiant Air | Allways Rewards",
  // Ask for seats and bags bought on the booking; they earn like the fare.
  addons: true,
  baseFareOnly: true,
  carrierLabel: "Carrier Usage Charge",
  carrierHint: "Allegiant's per-segment charge for booking online or by phone. It does not earn points.",
  unit: "points",
  method: "tiered",
  centsPerPoint: 1.0,
  tiers: [
    { upTo: 500, rate: 1 },
    { upTo: Infinity, rate: 2 }
  ],
  statuses: [
    { id: "member", name: "Allways Rewards Member" }
  ],
  // Co-branded cards: extra points per dollar charged (fare + taxes).
  cards: [
    { id: "allways-visa", name: "Allways Rewards Visa", rate: 3 }
  ],
  note: "Allways Rewards has no elite status tiers. Members earn 1 point per dollar on the first $500 of a booking and 2 points per dollar above $500, on the fare plus seats and bags, excluding taxes and fees."
};

module.exports = {
  id: "allegiant",
  // Month the earning rules were last checked against the source.
  reviewed: "2026-11",
  code: "G4",
  color: "#0057B8",
  source: "https://www.allegiantair.com/",
  // Published examples. The browser tests check each one.
  examples: [
    // Allegiant: 1 point per dollar to $500, 2 above; the CUC does not earn.
    { name: "Allegiant over $500", input: { fields: { airfare: 450, carrierFees: 25, addons: 100 } }, expect: 600 }
  ],
  rules
};
