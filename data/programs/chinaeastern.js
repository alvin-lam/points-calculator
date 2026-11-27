const rules = {
  name: "China Eastern | Eastern Miles",
  country: "CN",
  currency: "CNY",
  unit: "miles",
  method: "spend",
  // Spend is the ticket's actual amount "(含燃油YQ)"; miles = (fare + fuel)
  // x the earning factor. Insurance, preferred seats, change fees and paid
  // upgrades earn nothing. (Eastern Miles member handbook)
  carrierLabel: "Fuel Surcharge",
  carrierHint: "China Eastern's fuel surcharge (YQ). It earns like the fare.",
  defaultFareType: "direct",
  // Miles per yuan of fare plus fuel surcharge, by level and sales channel.
  fareTypes: [
    { id: "direct", name: "Booked on the China Eastern app, website, or 95530" },
    { id: "other", name: "Booked through another channel" }
  ],
  statuses: [
    { id: "1-star", name: "1-star member", rates: { direct: 0.264, other: 0.24 } },
    { id: "2-star", name: "2-star member", rates: { direct: 0.44, other: 0.4 } },
    { id: "3-star", name: "3-star member", rates: { direct: 0.66, other: 0.6 } },
    { id: "4-star", name: "4-star member", rates: { direct: 0.792, other: 0.72 } },
    { id: "5-star", name: "5-star member", rates: { direct: 0.88, other: 0.8 } },
    { id: "6-star", name: "6-star member", rates: { direct: 0.968, other: 0.88 } },
    { id: "silver", name: "Silver card", rates: { direct: 1.056, other: 0.96 } },
    { id: "gold", name: "Gold card", rates: { direct: 1.144, other: 1.04 } },
    { id: "platinum", name: "Platinum card", rates: { direct: 1.232, other: 1.12 } }
  ],
  note: "Eastern Miles earns on the price paid, fare plus fuel surcharge, on China Eastern, Shanghai Airlines, and China United tickets: 0.24 to 1.232 miles per yuan by level and sales channel. Taxes, insurance, preferred seats, change fees and paid upgrades do not earn. Enter fares in yuan."
};

module.exports = {
  id: "chinaeastern",
  // Month the earning rules were last checked against the source.
  reviewed: "2026-11",
  code: "MU",
  color: "#1C3F94",
  source: "https://easternmiles.ceair.com/member/huiyuanshouce/app/US-jflj/lineJF/integralAccumula.html",
  rules
};
