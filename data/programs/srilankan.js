/* SriLankan Airlines (UL): FlySmiLes miles as a share of the distance by
   fare family and booking class, from FlySmiLes' "Earning miles" page, with
   tier bonuses from the member privilege chart (Gold 15%, Platinum 25%). */
const rules = {
  name: "SriLankan Airlines | FlySmiLes",
  programName: "FlySmiLes",
  country: "LK",
  currency: "USD",
  unit: "miles",
  method: "distance",
  defaultFareType: "y-value",
  fareTypes: [
    { id: "j-flex", name: "Business Flex (J)", rate: 2.25 },
    { id: "j-semi", name: "Business Semi Flex (C)", rate: 2 },
    { id: "j-value", name: "Business Value (D)", rate: 1.75 },
    { id: "j-saver", name: "Business Saver (I)", rate: 1.5 },
    { id: "y-flex", name: "Economy Flex (Y, B, P, H)", rate: 1.5 },
    { id: "y-semi", name: "Economy Semi Flex (K, W, M, E)", rate: 1.25 },
    { id: "y-value", name: "Economy Value (L, R, V, S)", rate: 1 },
    { id: "y-saver", name: "Economy Saver (N, Q, O)", rate: 0.6 },
    { id: "g", name: "Group (G)", rate: 0.5 }
  ],
  statuses: [
    { id: "blue", name: "Blue", multiplier: 1 },
    { id: "classic", name: "Classic", multiplier: 1 },
    { id: "gold", name: "Gold", multiplier: 1.15 },
    { id: "platinum", name: "Platinum", multiplier: 1.25 }
  ],
  note: "FlySmiLes earns a share of the distance by fare family on SriLankan flights: 60% (Economy Saver) to 150% (Economy Flex), 150% to 225% in Business, and 50% on group (G) bookings. Gold members earn 15% more and Platinum members 25% more; Blue and Classic earn no bonus. SriLankan does not publish a minimum per flight."
};

module.exports = {
  id: "srilankan",
  // Month the earning rules were last checked against the source.
  reviewed: "2026-11",
  code: "UL",
  color: "#1687C1",
  source: "https://www.flysmiles.com/flysmiles/earning-miles",
  examples: [
    { name: "SriLankan Business Flex, Platinum", input: { fare: "j-flex", status: "platinum", fields: { distance: 1000 } }, expect: 2813 }
  ],
  rules
};
