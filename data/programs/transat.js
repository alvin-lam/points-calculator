/* Air Transat Staria: points per Canadian dollar by fare family, on the
   fare paid before taxes and airport fees. Staria has no elite tiers. */
const rules = {
  name: "Air Transat | Staria",
  programName: "Staria",
  country: "CA",
  currency: "CAD",
  unit: "points",
  method: "spend",
  baseFareOnly: true,
  carrierLabel: "Carrier Surcharge",
  carrierHint: "Air Transat's carrier surcharge, if any. Staria earns on the fare only.",
  addons: true,
  addonsRate: 5,
  addonsLabel: "Seats and Bags",
  addonsHint: "Seat selection, checked bags and other Air Transat extras bought before the airport. They earn 5 points per dollar.",
  centsPerPoint: 0.75,
  defaultFareType: "eco-standard",
  fareTypes: [
    { id: "eco-budget", name: "Eco Budget", rate: 3 },
    { id: "eco-standard", name: "Eco Standard", rate: 5 },
    { id: "eco-flex", name: "Eco Flex", rate: 7 },
    { id: "club-standard", name: "Club Standard", rate: 5 },
    { id: "club-flex", name: "Club Flex", rate: 7 }
  ],
  statuses: [
    { id: "member", name: "Staria Member", multiplier: 1 }
  ],
  note: "Staria earns per Canadian dollar of fare, before taxes and airport fees: 3 points on Eco Budget, 5 on Eco Standard and Club Standard, and 7 on Eco Flex and Club Flex. Extras bought before the airport earn 5 points per dollar. Flights operated by Air Transat or Porter earn. Only flights booked on Air Transat's Canadian website earn."
};

module.exports = {
  id: "transat",
  // Month the earning rules were last checked against the source.
  reviewed: "2026-11",
  code: "TS",
  color: "#1E2A5A",
  source: "https://www.airtransat.com/en-CA/staria/earn-points",
  // Worked from the published rates: CA$400 Eco Standard plus CA$60 of extras.
  examples: [
    { name: "Air Transat Eco Standard with extras", input: { fare: "eco-standard", fields: { airfare: 400, addons: 60 } }, expect: 2300 }
  ],
  rules
};
