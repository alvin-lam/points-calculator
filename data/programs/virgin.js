const rules = {
  name: "Virgin Atlantic | Flying Club",
  country: "UK",
  currency: "GBP",
  unit: "Virgin Points",
  method: "distance",
  centsPerPoint: 1.0,
  defaultFareType: "classic-mid",
  // Share of miles flown earned as points, by fare class.
  fareTypes: [
    { id: "light", name: "Economy Light (T)", rate: 0.25 },
    { id: "classic-low", name: "Economy Classic (O, N, X, Q, E)", rate: 0.5 },
    { id: "classic-mid", name: "Economy Classic (L, U, M)", rate: 1 },
    { id: "classic-high", name: "Economy Classic (Y, B, R)", rate: 1.5 },
    { id: "delight", name: "Economy Delight (V)", rate: 1.5 },
    { id: "premium-std", name: "Premium Standard (H, K)", rate: 1.75 },
    { id: "premium-flex", name: "Premium Flexible (W, S)", rate: 2.5 },
    { id: "upper-std", name: "Upper Class Standard (I, Z)", rate: 3 },
    { id: "upper-flex", name: "Upper Class Flexible (J, C, D)", rate: 5 }
  ],
  statuses: [
    { id: "red", name: "Red", multiplier: 1 },
    { id: "silver", name: "Silver", multiplier: 1.3 },
    { id: "gold", name: "Gold", multiplier: 1.6 }
  ],
  // Co-branded cards: extra points per pound charged (fare + taxes).
  cards: [
    { id: "reward", name: "Virgin Atlantic Reward", rate: 1.5, bank: "Virgin Money (UK)" },
    { id: "reward-plus", name: "Virgin Atlantic Reward+", rate: 3, bank: "Virgin Money (UK)" },
    { id: "red", name: "Virgin Red Rewards Mastercard", rate: 3, currency: "USD", bank: "Synchrony (US)" }
  ],
  note: "Flying Club earns a share of the miles flown set by fare class, and Silver and Gold add 30% and 60%. Premium earns 175% (H, K) or 250% (W, S), and Upper Class 300% (I, Z) or 500% (J, C, D), from Virgin Atlantic's earning calculator. Card points are earned per pound charged, or per US dollar for the US card."
};

module.exports = {
  id: "virgin",
  // Month the earning rules were last checked against the source.
  reviewed: "2026-11",
  code: "VS",
  color: "#DA0530",
  source: "https://www.virginatlantic.com/en-US/flying-club/earn-points/earning-calculator",
  // Published examples. The browser tests check each one.
  examples: [
    // Virgin Atlantic earning calculator: Upper J, C, D earns 500% (Red) and 650% (Silver); Premium H, K 175% (Red).
    { name: "Virgin Upper Class Flexible, Red", input: { status: "red", fare: "upper-flex", fields: { distance: 1000 } }, expect: 5000 },
    { name: "Virgin Upper Class Flexible, Silver", input: { status: "silver", fare: "upper-flex", fields: { distance: 1000 } }, expect: 6500 },
    { name: "Virgin Premium Standard, Red", input: { status: "red", fare: "premium-std", fields: { distance: 1000 } }, expect: 1750 }
  ],
  rules
};
