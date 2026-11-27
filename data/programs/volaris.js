const rules = {
  name: "Volaris | Altitude",
  country: "MX",
  currency: "MXN",
  unit: "altitude Points",
  method: "spend",
  // Points are "calculated based on the amount paid for the base fare of
  // the flight and, where applicable, the cost of Volaris Services ...
  // excluding taxes and any other airport or government fees." (altitude
  // terms and conditions)
  noCarrier: true,
  addons: true,
  addonsLabel: "Volaris Services",
  addonsHint: "Seat selection, extra baggage, bundles, Volaris te acompaña and pets bought from Volaris. They earn points like the fare.",
  statuses: [
    { id: "member", name: "Altitude Member", rate: 0.5 }
  ],
  note: "Altitude by Volaris earns 10 points for every 20 Mexican pesos spent on volaris.com or the app on the base fare and Volaris Services such as seats, bags and bundles, excluding taxes and airport or government fees. It has no status tiers."
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
