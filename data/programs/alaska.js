const rules = {
  name: "Alaska Airlines | Atmos Rewards",
  unit: "points",
  method: "distance",
  // Members choose one way to earn for flights from 1 January 2027.
  // Elite bonuses apply to all three.
  earnMethods: [
    { id: "distance2026", method: "distance", name: "2026 flights: miles flown, with a fare class bonus", until: "2027-01-01" },
    { id: "distance", name: "2027 flights, miles flown: 1 point per mile", noFareType: true, from: "2027-01-01" },
    { id: "price", name: "2027 flights, price paid: 5 points per dollar", rate: 5, noFareType: true, from: "2027-01-01" },
    { id: "segments", name: "2027 flights, segments flown: 500 points per segment", perSegment: 500, noFareType: true, from: "2027-01-01" }
  ],
  // 2026 flights earn by distance with a bonus by fare class (Alaska,
  // "Earning on Alaska Airlines and Hawaiian Airlines flights", valid for
  // travel through 31 December 2026). The status bonus is figured on the
  // base points (the distance), not on the class bonus. Saver (X) earns 30%
  // of the distance when booked before 11 June 2026 or flown by 31 July
  // 2026, and nothing when booked from 11 June and flown from 1 August.
  defaultFareType: "y-other",
  fareTypeLabel: "Fare class (2026 flights)",
  fareTypes: [
    { id: "j", name: "First (J)", rate: 2, bonusOnDistance: true },
    { id: "c", name: "First (C)", rate: 1.75, bonusOnDistance: true },
    { id: "di", name: "First (D, I)", rate: 1.5, bonusOnDistance: true },
    { id: "yb", name: "Economy (Y, B)", rate: 1.5, bonusOnDistance: true },
    { id: "hk", name: "Economy (H, K)", rate: 1.25, bonusOnDistance: true },
    { id: "y-other", name: "Economy (M, L, V, S, N, Q, O, G)", rate: 1, bonusOnDistance: true },
    { id: "x-early", name: "Saver (X), booked before 11 June or flown by 31 July 2026", rate: 0.3 },
    { id: "x", name: "Saver (X), booked from 11 June and flown from 1 August 2026", rate: 0, noBonus: true }
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
  note: "Atmos Rewards members choose how they earn for flights departing on or after 1 January 2027: 1 point per mile flown, 5 points per dollar of the fare, or 500 points per segment. Silver, Gold, Platinum, and Titanium add 25% to 150%. Members who never chose keep earning by distance; new members default to price paid. Price paid excludes taxes. From 2027, Saver and Basic Economy fares earn nothing. Flights in 2026 earn by distance, plus a fare class bonus of 25% to 100% (J 200%, C 175%, D, I, Y and B 150%, H and K 125%); the status bonus is figured on the distance. Saver (X) fares booked from 11 June 2026 and flown from 1 August 2026 earn nothing."
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
    { name: "Alaska by distance, Gold", input: { earn: "distance", status: "gold", fields: { distance: 1000 } }, expect: 1500 },
    // 2026 chart: First J earns 200% of distance; Gold's 50% bonus is on the distance.
    { name: "Alaska 2026, First J, member", input: { earn: "distance2026", status: "member", fare: "j", fields: { distance: 1000 } }, expect: 2000 },
    { name: "Alaska 2026, First J, Gold", input: { earn: "distance2026", status: "gold", fare: "j", fields: { distance: 1000 } }, expect: 2500 },
    { name: "Alaska 2026, Saver from August", input: { earn: "distance2026", status: "gold", fare: "x", fields: { distance: 1000 } }, expect: 0 }
  ],
  rules
};
