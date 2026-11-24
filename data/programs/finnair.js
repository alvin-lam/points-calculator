const rules = {
  name: "Finnair | Finnair Plus",
  country: "FI",
  currency: "EUR",
  unit: "Avios",
  method: "spend",
  centsPerPoint: 1.0,
  statuses: [
    { id: "basic", name: "Basic", rate: 6 },
    { id: "silver", name: "Silver", rate: 7 },
    { id: "gold", name: "Gold", rate: 8 },
    { id: "platinum", name: "Platinum", rate: 9 },
    { id: "lumo", name: "Platinum Lumo", rate: 10 }
  ],
  note: "Finnair Plus earns 6 to 10 Avios per euro of the fare by status, on flights booked with Finnair. Taxes do not earn. Enter fares in euros."
};

module.exports = {
  id: "finnair",
  // Month the earning rules were last checked against the source.
  reviewed: "2026-11",
  code: "AY",
  color: "#0B1560",
  source: "https://www.finnair.com/us-en/finnair-plus/collect-and-use-avios/collect-avios-and-tier-points-from-flights",
  rules
};
