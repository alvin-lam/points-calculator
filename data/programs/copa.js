/* Copa ConnectMiles: a share of the distance flown by fare family, with at
   least 500 miles per flight. Elite bonuses are not published on the page
   used here, so only the member rate is offered. */
const rules = {
  name: "Copa Airlines | ConnectMiles",
  programName: "ConnectMiles",
  country: "PA",
  unit: "miles",
  method: "distance",
  minPoints: 500,
  centsPerPoint: 1.1,
  defaultFareType: "classic",
  fareTypes: [
    { id: "business", name: "Business (C, D, J, R)", rate: 1.25 },
    { id: "full", name: "Economy Full (Y, B, M)", rate: 1.25 },
    { id: "classic", name: "Economy Classic (H, Q, K, V, U, S, O, W)", rate: 1 },
    { id: "promo", name: "Economy Promo and Basic (other classes)", rate: 0.5 }
  ],
  statuses: [
    { id: "member", name: "ConnectMiles Member", multiplier: 1 }
  ],
  note: "ConnectMiles earns a share of the distance flown: 125% on Economy Full, 100% on Economy Classic, and 50% on promotional fares, with at least 500 miles per flight. The Business rate comes from partner earning tables. Elite bonuses are not included."
};

module.exports = {
  id: "copa",
  // Month the earning rules were last checked against the source.
  reviewed: "2026-11",
  code: "CM",
  color: "#0E3A8C",
  source: "https://connectmiles.copaair.com/en/web/guest/earn-flying-on-copa-airlines",
  examples: [
    { name: "Copa Economy Classic, 1,000 miles", input: { fare: "classic", fields: { distance: 1000 } }, expect: 1000 },
    { name: "Copa promo fare raised to the minimum", input: { fare: "promo", fields: { distance: 600 } }, expect: 500 }
  ],
  rules
};
