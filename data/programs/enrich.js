const rules = {
  name: "Malaysia Airlines | Enrich",
  country: "MY",
  currency: "MYR",
  unit: "Enrich Points",
  method: "spend",
  statuses: [
    { id: "blue", name: "Blue", rate: 1.5 },
    { id: "silver", name: "Silver", rate: 1.8 },
    { id: "gold", name: "Gold", rate: 2.2 },
    { id: "platinum", name: "Platinum", rate: 2.5 }
  ],
  note: "Since 1 January 2026, Enrich earns 1.5 to 2.5 points per ringgit spent on Malaysia Airlines and Firefly flights, by status. Enter fares in ringgit."
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
