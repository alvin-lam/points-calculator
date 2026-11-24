const rules = {
  name: "Volaris | Altitude",
  country: "MX",
  currency: "MXN",
  unit: "altitude Points",
  method: "spend",
  statuses: [
    { id: "member", name: "Altitude Member", rate: 0.5 }
  ],
  note: "Altitude by Volaris earns 10 points for every 20 Mexican pesos spent on volaris.com or the app, excluding taxes and airport fees. It has no status tiers."
};

module.exports = {
  id: "volaris",
  // Month the earning rules were last checked against the source.
  reviewed: "2026-11",
  code: "Y4",
  color: "#A12A8B",
  source: "https://cms.volaris.com/en/travel-info/altitude/",
  rules
};
