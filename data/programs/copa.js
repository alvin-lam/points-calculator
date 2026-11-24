/* Copa ConnectMiles: a share of the distance flown by fare family, with at
   least 500 miles per flight (copaair.com, tickets flown from 2024). The
   page does not publish PreferProgram elite bonuses, so only the member
   rate is offered. */
const rules = {
  name: "Copa Airlines | ConnectMiles",
  programName: "ConnectMiles",
  country: "PA",
  unit: "miles",
  method: "distance",
  minPoints: 500,
  centsPerPoint: 1.1,
  defaultFareType: "classic",
  // Award miles as a share of the distance flown, for tickets flown from
  // 1 January 2024. Classes G, I, N, P, X and Z earn nothing.
  fareTypes: [
    { id: "business-full", name: "Business Full", rate: 3 },
    { id: "business-promo", name: "Business Promo", rate: 1.75 },
    { id: "full", name: "Economy Full", rate: 1.75 },
    { id: "classic", name: "Economy Classic or Classic Flex", rate: 1 },
    { id: "basic", name: "Economy Basic", rate: 0.5 }
  ],
  statuses: [
    { id: "member", name: "ConnectMiles Member", multiplier: 1 }
  ],
  note: "ConnectMiles earns a share of the distance flown by fare family: 300% on Business Full, 175% on Business Promo and Economy Full, 100% on Economy Classic and Classic Flex, and 50% on Economy Basic. Every flight earns at least 500 miles. Classes G, I, N, P, X and Z earn nothing. PreferProgram elite bonuses are not published, so they are not included."
};

module.exports = {
  id: "copa",
  // Month the earning rules were last checked against the source.
  reviewed: "2026-11",
  code: "CM",
  color: "#0E3A8C",
  source: "https://www.copaair.com/en-us/connectmiles/miles/earn-flying-on-copa-airlines/",
  examples: [
    { name: "Copa Economy Classic, 1,000 miles", input: { fare: "classic", fields: { distance: 1000 } }, expect: 1000 },
    { name: "Copa Business Full, 1,000 miles", input: { fare: "business-full", fields: { distance: 1000 } }, expect: 3000 },
    { name: "Copa Economy Basic raised to the minimum", input: { fare: "basic", fields: { distance: 600 } }, expect: 500 }
  ],
  rules
};
