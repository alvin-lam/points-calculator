/* Ethiopian Airlines (ET): ShebaMiles award miles on Ethiopian-operated
   flights. ShebaMiles publishes no written chart; its terms award miles
   "at the rate published by Ethiopian" and point to the official Earn
   Miles calculator (shebamiles.ethiopianairlines.com/miles/earn-miles/),
   which the site owner approved as the source. Its results, checked in
   November 2026 on Addis Ababa to London (3,674 miles), Washington,
   Djibouti and Bahir Dar for each level:
   - International: the distance flown, counted as at least 500 miles,
     times the booking class share: C 200%, J 150%, D 125%, P 100%,
     Y G S B 100%, L V M K 75%, H U Q T 50%, E O W 25%.
   - Status bonus on international flights: Silver 25%, Gold 75% and
     Platinum 100% of that distance, the same for every class (London
     Silver: +919 in each class; Djibouti Silver: +125, from 500 miles).
   - Domestic: a fixed 300 miles in Business, 150 in Y G S B and 100 in
     other Economy classes, raised by the same share (Gold: 300 to 525,
     150 to 263).
   - Welcome and Blue earn the base rate.
   Co-brand cards issued in Ethiopia, from ShebaMiles' co-branded cards
   page. */
const rules = {
  name: "Ethiopian Airlines | ShebaMiles",
  programName: "ShebaMiles",
  country: "ET",
  currency: "ETB",
  unit: "miles",
  method: "distance",
  // Short international flights count as 500 miles, and the status bonus
  // is figured on that distance (status.bonus).
  minDistance: 500,
  // The calculator rounds the base and the bonus separately.
  roundParts: true,
  // Domestic fixed amounts are raised by the status share.
  bonusOnFixed: true,
  zoneLabel: "Route Type",
  zoneHint: "International flights earn a share of the distance; flights within Ethiopia earn a fixed amount.",
  zoneAfterFare: true,
  zones: [
    { id: "intl", name: "International" },
    { id: "domestic", name: "Within Ethiopia", fixed: true }
  ],
  defaultFareType: "ygsb",
  fareTypeLabel: "Booking Class",
  fareTypes: [
    { id: "c", name: "Business (C)", earn: [2, { fixed: 300 }] },
    { id: "j", name: "Business (J)", earn: [1.5, { fixed: 300 }] },
    { id: "d", name: "Business (D)", earn: [1.25, { fixed: 300 }] },
    { id: "p", name: "Business (P)", earn: [1, { fixed: 300 }] },
    { id: "ygsb", name: "Economy (Y, G, S, B)", earn: [1, { fixed: 150 }] },
    { id: "lvmk", name: "Economy (L, V, M, K)", earn: [0.75, { fixed: 100 }] },
    { id: "huqt", name: "Economy (H, U, Q, T)", earn: [0.5, { fixed: 100 }] },
    { id: "eow", name: "Economy (E, O, W)", earn: [0.25, { fixed: 100 }] }
  ],
  // bonus: the share of the distance added on international flights;
  // multiplier: the factor on domestic fixed amounts.
  statuses: [
    { id: "blue", name: "Welcome or Blue", bonus: 0, multiplier: 1 },
    { id: "silver", name: "Silver", bonus: 0.25, multiplier: 1.25 },
    { id: "gold", name: "Gold", bonus: 0.75, multiplier: 1.75 },
    { id: "platinum", name: "Platinum", bonus: 1, multiplier: 2 }
  ],
  cardHint: "ShebaMiles co-brand cards issued in Ethiopia earn miles on the amount charged, in birr, on top of the flight miles.",
  cards: [
    { id: "abyssinia", name: "Abyssinia ShebaMiles Card", rate: 50 / 1000, rateText: "50 per Br 1,000", currency: "ETB", bank: "Bank of Abyssinia (Ethiopia)" },
    { id: "awash", name: "Awash ShebaMiles Card", rate: 3 / 100, rateText: "3 per Br 100", currency: "ETB", bank: "Awash Bank (Ethiopia)" },
    { id: "hibir", name: "Hibir ShebaMiles Card", rate: 5 / 100, rateText: "5 per Br 100", currency: "ETB", bank: "Hibret Bank (Ethiopia)" }
  ],
  note: "ShebaMiles publishes no written earning chart, so this follows Ethiopian's official Earn Miles calculator. International flights earn the distance flown, counted as at least 500 miles, times the booking class share: 200% in C, 150% in J, 125% in D, 100% in P and Y, G, S, B, 75% in L, V, M, K, 50% in H, U, Q, T and 25% in E, O, W. Silver adds 25%, Gold 75% and Platinum 100% of the distance in every class. Flights within Ethiopia earn a fixed 300 miles in Business, 150 in Y, G, S, B and 100 in other Economy classes, raised by the same share for Silver, Gold and Platinum. Status miles, which count toward levels, are not shown. Co-brand cards earn on all spending: the Bank of Abyssinia card 50 miles per Br 1,000 (with a minimum monthly balance of Br 50,000), the Awash card 3 per Br 100 and the Hibir card 5 per Br 100."
};

module.exports = {
  id: "ethiopian",
  // Month the earning rules were last checked against the source.
  reviewed: "2026-11",
  code: "ET",
  color: "#2E7D32",
  source: "https://shebamiles.ethiopianairlines.com/miles/earn-miles/Index/",
  examples: [
    // Official calculator, Addis Ababa to London (3,674 miles).
    { name: "Ethiopian ADD-LHR Business (C), Blue (calculator)", input: { status: "blue", fare: "c", zone: "intl", fields: { distance: 3674 } }, expect: 7348 },
    { name: "Ethiopian ADD-LHR Business (C), Silver (calculator)", input: { status: "silver", fare: "c", zone: "intl", fields: { distance: 3674 } }, expect: 8267 },
    { name: "Ethiopian ADD-LHR Economy (E, O, W), Gold (calculator)", input: { status: "gold", fare: "eow", zone: "intl", fields: { distance: 3674 } }, expect: 3675 },
    // Addis Ababa to Djibouti, under 500 miles: counted as 500.
    { name: "Ethiopian ADD-JIB Business (C), Silver (calculator)", input: { status: "silver", fare: "c", zone: "intl", fields: { distance: 350 } }, expect: 1125 },
    // Domestic, Gold: 150 x 1.75 = 262.5, shown as 263.
    { name: "Ethiopian domestic Economy (Y), Gold (calculator)", input: { status: "gold", fare: "ygsb", zone: "domestic" }, expect: 263 }
  ],
  rules
};
