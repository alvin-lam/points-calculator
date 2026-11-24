const rules = {
  name: "Alaska Airlines | Atmos Rewards",
  unit: "points",
  method: "distance",
  // Members choose one way to earn for flights from 1 January 2027.
  // Elite bonuses apply to all three.
  earnMethods: [
    { id: "distance", name: "Miles flown: 1 point per mile" },
    { id: "price", name: "Price paid: 5 points per dollar", rate: 5 },
    { id: "segments", name: "Segments flown: 500 points per segment", perSegment: 500 }
  ],
  centsPerPoint: 1.4,
  statuses: [
    { id: "member", name: "Atmos Member", multiplier: 1 },
    { id: "silver", name: "Atmos Silver", multiplier: 1.25 },
    { id: "gold", name: "Atmos Gold", multiplier: 1.5 },
    { id: "platinum", name: "Atmos Platinum", multiplier: 2 },
    { id: "titanium", name: "Atmos Titanium", multiplier: 2.5 }
  ],
  // Co-branded cards: extra points per dollar charged (fare + taxes).
  cards: [
    { id: "ascent", name: "Atmos Rewards Ascent Visa Signature", rate: 3, bank: "Bank of America (US)" },
    { id: "summit", name: "Atmos Rewards Summit Visa Infinite", rate: 3, bank: "Bank of America (US)" }
  ],
  note: "Atmos Rewards members choose how they earn for flights departing on or after 1 January 2027: 1 point per mile flown, 5 points per dollar of the fare, or 500 points per segment. Silver, Gold, Platinum, and Titanium add 25% to 150%. Members who never chose keep earning by distance; new members default to price paid. Price paid excludes taxes, and Basic Economy fares may not qualify. Flights before 2027 earn by distance."
};

module.exports = {
  id: "alaska",
  // Month the earning rules were last checked against the source.
  reviewed: "2026-11",
  code: "AS",
  color: "#01426A",
  source: "https://www.alaskaair.com/atmosrewards/content/earn-points/flights",
  // Published examples. The browser tests check each one.
  examples: [
    // Atmos Rewards by distance, Gold +50%.
    { name: "Alaska by distance, Gold", input: { earn: "distance", status: "gold", fields: { distance: 1000 } }, expect: 1500 }
  ],
  rules
};
