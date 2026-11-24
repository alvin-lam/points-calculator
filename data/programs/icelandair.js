const rules = {
  name: "Icelandair | Saga Club",
  country: "IS",
  unit: "Saga Points",
  method: "zone",
  defaultFareType: "standard",
  // Fixed Saga Points per one-way flight, from Icelandair's fare types
  // page. Each zone's points follow the fareTypes order.
  fareTypes: [
    { id: "light", name: "Economy Light" },
    { id: "standard", name: "Economy Standard" },
    { id: "flex", name: "Economy Flex" },
    { id: "premium", name: "Saga Premium" },
    { id: "premium-flex", name: "Saga Premium Flex" }
  ],
  zones: [
    { id: "europe", name: "Iceland and Europe (one flight)", points: [850, 1700, 2550, 3400, 5100] },
    { id: "north-america", name: "Iceland and North America (one flight)", points: [1200, 2400, 3600, 4800, 7200] },
    { id: "via-iceland", name: "North America and Europe via Iceland (both flights)", points: [2050, 4100, 6150, 8200, 12300] }
  ],
  // Silver and Gold earn extra Tier Credits, not extra Saga Points.
  statuses: [
    { id: "blue", name: "Saga Blue", bonus: 0 },
    { id: "silver", name: "Saga Silver", bonus: 0 },
    { id: "gold", name: "Saga Gold", bonus: 0 }
  ],
  note: "Icelandair awards a fixed number of Saga Points per flight, set by fare and route. A trip between North America and Europe through Iceland earns both flights. Saga Silver and Gold add 10% or 20% Tier Credits toward status, not Saga Points. Icelandair has not updated this table in several years, so check a recent booking if the numbers look off."
};

module.exports = {
  id: "icelandair",
  // Month the earning rules were last checked against the source.
  reviewed: "2026-11",
  code: "FI",
  color: "#003A7D",
  source: "https://www.icelandair.com/frequent-flyer/earn-points/",
  rules
};
