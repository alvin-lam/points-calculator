const rules = {
  name: "Malaysia Airlines | Enrich",
  country: "MY",
  currency: "MYR",
  unit: "Enrich Points",
  method: "spend",
  // Points are on the "base fare and carrier-imposed surcharges ... Fuel
  // Surcharge (YQ) + Administration Charge (YR)", excluding government and
  // airport taxes and fees. (Enrich FAQ)
  carrierLabel: "Carrier-imposed Surcharges (YQ/YR)",
  carrierHint: "Malaysia Airlines' fuel surcharge (YQ) and administration charge (YR). They earn like the fare.",
  statuses: [
    { id: "blue", name: "Blue", rate: 1.5 },
    { id: "silver", name: "Silver", rate: 1.8 },
    { id: "gold", name: "Gold", rate: 2.2 },
    { id: "platinum", name: "Platinum", rate: 2.5 }
  ],
  note: "Since 1 January 2026, Enrich earns 1.5 to 2.5 points per ringgit spent on Malaysia Airlines and Firefly flights, by status, on the base fare and carrier-imposed surcharges (YQ and YR). Government and airport taxes and fees do not earn. Enter fares in ringgit."
};

module.exports = {
  id: "enrich",
  // Month the earning rules were last checked against the source.
  reviewed: "2026-11",
  code: "MH",
  color: "#1F4E9C",
  source: "https://enrich.malaysiaairlines.com/enrich/news/enrich-2026/new-updates.html",
  rules
};
