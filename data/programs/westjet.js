const rules = {
  name: "WestJet | WestJet Rewards",
  // Seat selection, baggage, and upgrades earn at the status rate.
  addons: true,
  addonsLabel: "Seats, Bags and/or Upgrades",
  addonsHint: "Seat selection, checked bags, and cabin upgrades bought from WestJet. They earn points at your status rate.",
  country: "CA",
  currency: "CAD",
  unit: "WestJet points",
  method: "spend",
  centsPerPoint: 1.0,
  statuses: [
    { id: "teal", name: "Teal", rate: 1 },
    { id: "silver", name: "Silver", rate: 3 },
    { id: "gold", name: "Gold", rate: 5 },
    { id: "platinum", name: "Platinum", rate: 8 }
  ],
  // Co-branded cards: extra points per dollar charged (fare + taxes).
  cards: [
    { id: "rbc-mc", name: "WestJet RBC Mastercard", rate: 1.5, bank: "RBC (Canada)" },
    { id: "rbc-we", name: "WestJet RBC World Elite Mastercard", rate: 2, bank: "RBC (Canada)" }
  ],
  note: "WestJet Rewards earns points per Canadian dollar spent on WestJet flights, before taxes, and on seat selection, baggage, and upgrades. Partner flights earn by distance and are not covered here."
};

module.exports = {
  id: "westjet",
  // Month the earning rules were last checked against the source.
  reviewed: "2026-11",
  code: "WS",
  color: "#00A3AD",
  source: "https://www.westjet.com/en-us/rewards/tiers/teal",
  // Published examples. The browser tests check each one.
  examples: [
    // WestJet: seats, bags, and upgrades earn at the status rate.
    { name: "WestJet Platinum with extras", input: { status: "platinum", fields: { airfare: 200, addons: 100 } }, expect: 2400 }
  ],
  rules
};
