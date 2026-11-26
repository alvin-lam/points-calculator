const rules = {
  name: "Breeze Airways | Breezy Rewards",
  // Ask for seats and bags bought on the booking; they earn like the fare.
  addons: true,
  carrierLabel: "Technology Development Charge",
  carrierHint: "Breeze's per-segment charge for booking online. It earns points like the fare.",
  unit: "BreezePoints",
  method: "spend",
  centsPerPoint: 1.0,
  defaultFareType: "nice",
  fareTypes: [
    { id: "noflex", name: "No Flex", rate: 1 },
    { id: "nice", name: "Nice", rate: 2 },
    { id: "nicer", name: "Nicer", rate: 5 },
    { id: "nicest", name: "Nicest", rate: 5 }
  ],
  // 2026 status boosts: 25%, 50%, 75%, and 100%.
  statuses: [
    { id: "member", name: "Breezy Rewards Member", multiplier: 1 },
    { id: "breezy1", name: "Breezy 1", multiplier: 1.25 },
    { id: "breezy2", name: "Breezy 2", multiplier: 1.5 },
    { id: "breezy3", name: "Breezy 3", multiplier: 1.75 },
    { id: "club", name: "Breezy Club", multiplier: 2 }
  ],
  // The card's "when you buy" points match the fare: 1x No Flex, 2x Nice,
  // 5x Nicer and Nicest, on the amount charged.
  cards: [
    { id: "breeze-easy", name: "Breeze Easy Visa Signature", rate: 5, rates: { noflex: 1, nice: 2, nicer: 5, nicest: 5, bank: "Barclays (US)" } }
  ],
  note: "BreezePoints depend on the fare you buy: 1 per dollar on No Flex, 2 on Nice, and 5 on Nicer and Nicest, on the fare and add-ons such as seats and bags. Breezy 1, 2, 3, and Club add a 25%, 50%, 75%, or 100% boost. The Breeze Easy Visa Signature adds the same 1, 2, or 5 points per dollar again when you pay with it."
};

module.exports = {
  id: "breeze",
  // Month the earning rules were last checked against the source.
  reviewed: "2026-11",
  code: "MX",
  color: "#001633",
  source: "https://www.flybreeze.com/breezy-rewards",
  // Published examples. The browser tests check each one.
  examples: [
    // Breeze: a Breezy 2 member on a US$200 Nicest fare.
    { name: "Breeze Breezy 2 Nicest", input: { status: "breezy2", fare: "nicest", fields: { airfare: 200 } }, expect: 1500 }
  ],
  rules
};
