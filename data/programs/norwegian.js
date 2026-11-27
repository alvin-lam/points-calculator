const rules = {
  name: "Norwegian | Norwegian Reward",
  country: "NO",
  currency: "NOK",
  unit: "CashPoints",
  method: "spend",
  // "CashPoints are calculated based on the net ticket price (excl. taxes,
  // charges and optional services)." (Norwegian Reward FAQ)
  noCarrier: true,
  rateAsPercent: true,
  defaultFareType: "lowfare",
  fareTypes: [
    { id: "lowfare", name: "LowFare", rate: 0.01 },
    { id: "lowfare-plus", name: "LowFare+", rate: 0.02 },
    { id: "flex", name: "Flex", rate: 0.05 }
  ],
  statuses: [
    { id: "member", name: "Norwegian Reward Member", multiplier: 1 }
  ],
  note: "Norwegian Reward pays CashPoints worth 1%, 2%, or 5% of the net ticket price, by fare. Taxes, charges and optional services do not earn. One CashPoint is worth 1 Norwegian krone, so enter the fare in kroner. Members living in Norway, Sweden, Denmark, or Finland earn Spenn instead. Paying with a Bank Norwegian card raises LowFare to 3% and LowFare+ to 4%."
};

module.exports = {
  id: "norwegian",
  // Month the earning rules were last checked against the source.
  reviewed: "2026-11",
  code: "DY",
  color: "#D81939",
  source: "https://www.norwegian.com/us/reward/earn-cashpoints/flight-tickets",
  rules
};
