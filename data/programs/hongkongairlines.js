/* Fortune Wings Club on Hong Kong Airlines, for tickets issued on or
   after 20 September 2025. Award points follow the HK$ spent, rounded to
   the nearest HK$10. Fare classes R, G, O, E, A, F, and P do not earn. */

const rules = {
  name: "Hong Kong Airlines | Fortune Wings Club",
  country: "HK",
  currency: "HKD",
  unit: "points",
  method: "spend",
  // "Eligible spend includes base fare and carrier-imposed surcharges paid
  // for your ticket, such as fuel surcharges." Change fees, excess baggage,
  // seat selection, upgrades and service charges do not earn.
  carrierLabel: "Carrier-imposed Surcharges",
  carrierHint: "Hong Kong Airlines's fuel and other carrier-imposed surcharges. They earn like the fare. Seats, bags, upgrades and service charges do not.",
  roundSpendTo: 10,
  // 10 base points per HK$10, plus the status bonus per HK$10.
  statuses: [
    { id: "member", name: "Fortune Wings", rate: 1 },
    { id: "select", name: "Select Card", rate: 1.1 },
    { id: "silver", name: "Silver Card", rate: 1.3 },
    { id: "gold", name: "Gold Card", rate: 1.6 },
    { id: "platinum", name: "Platinum Card", rate: 1.8 }
  ],
  note: "Fortune Wings Club earns 10 base points per HK$10 of base fare and carrier surcharges on Hong Kong Airlines, for tickets issued on or after 20 September 2025, plus a status bonus of 1, 3, 6, or 8 points per HK$10 for Select, Silver, Gold, and Platinum. The basic Fortune Wings tier earns no bonus. Spending is rounded to the nearest HK$10. Classes R, G, O, E, A, F, and P earn nothing. Taxes, rebooking fees, seats, bags, upgrades and service charges do not earn, and codeshare flights do not earn. Tickets not issued by Hong Kong Airlines, or without a price, earn by class and distance instead, with a 50% bonus for Gold and Platinum and 25% for Silver. Fares in other currencies are converted to Hong Kong dollars at the IATA rate. Enter fares in Hong Kong dollars."
};

module.exports = {
  id: "hongkongairlines",
  // Month the earning rules were last checked against the source.
  reviewed: "2026-11",
  code: "HX",
  color: "#E60012",
  source: "https://content.hongkongairlines.com/en_HK/FFP/earn/earn_hx",
  // Published examples. The browser tests check each one.
  examples: [
    // Fortune Wings Club.
    { name: "Hong Kong Airlines, Fortune Wings", input: { status: "member", fields: { airfare: 2000, carrierFees: 300 } }, expect: 2300 },
    { name: "Hong Kong Airlines, Select", input: { status: "select", fields: { airfare: 2000, carrierFees: 300 } }, expect: 2530 }
  ],
  rules
};
