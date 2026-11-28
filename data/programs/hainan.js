/* Fortune Wings Club on Hainan Airlines domestic flights, for flight
   dates from 28 March 2026. Same structure as Hong Kong Airlines: award
   points follow the yuan spent, rounded to the nearest 10 yuan. */

const rules = {
  name: "Hainan Airlines | Fortune Wings Club",
  country: "CN",
  currency: "CNY",
  unit: "points",
  method: "spend",
  // "Eligible spend includes base fare and carrier-imposed surcharges paid
  // for your ticket, such as fuel surcharges." Change fees, excess baggage,
  // seat selection, upgrades and service charges do not earn.
  carrierLabel: "Carrier-imposed Surcharges",
  carrierHint: "Hainan Airlines's fuel and other carrier-imposed surcharges. They earn like the fare. Seats, bags, upgrades and service charges do not.",
  roundSpendTo: 10,
  cap: 75000,
  // 10 base points per 10 yuan, plus the status bonus per 10 yuan.
  statuses: [
    { id: "member", name: "Fortune Wings", rate: 1 },
    { id: "select", name: "Select", rate: 1.1 },
    { id: "silver", name: "Silver", rate: 1.3 },
    { id: "gold", name: "Gold", rate: 1.6 },
    { id: "platinum", name: "Platinum", rate: 1.8 }
  ],
  note: "Fortune Wings Club earns 10 base points per 10 yuan of eligible spend on Hainan Airlines domestic flights, for flight dates from 28 March 2026, plus a status bonus of 1, 3, 6, or 8 points per 10 yuan for Select, Silver, Gold, and Platinum. The basic Fortune Wings tier earns no bonus. Spending is rounded to the nearest 10 yuan. Classes J, S, O, G, A, U, T, F, P, and B earn nothing. Earning is capped at 75,000 points per segment. Enter fares in yuan."
};

module.exports = {
  id: "hainan",
  // Month the earning rules were last checked against the source.
  reviewed: "2026-11",
  code: "HU",
  color: "#E60012",
  source: "https://ffp.hnair.com/FFPClub/en/hqjf/hkjl/gszl/201809/t20180908_25301.html",
  // Published examples. The browser tests check each one.
  examples: [
    { name: "Hainan Airlines, Silver", input: { status: "silver", fields: { airfare: 1088, carrierFees: 30 } }, expect: 1456 }
  ],
  rules
};
