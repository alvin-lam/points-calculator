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
  // Volaris INVEX Mastercard credit cards (Mexico), from Volaris' INVEX card
  // page: altitude Points per MX$20 charged at Volaris, integrated into
  // altitude since 20 May 2026. No US-issued Volaris card was found.
  cardHint: "Volaris INVEX cards earn altitude Points on the full amount charged at Volaris, taxes included, on top of the flight points.",
  cards: [
    { id: "invex-0", name: "Volaris INVEX 0", rate: 15 / 20, rateText: "15 per MX$20", bank: "INVEX (Mexico)" },
    { id: "invex", name: "Volaris INVEX", rate: 17 / 20, rateText: "17 per MX$20", bank: "INVEX (Mexico)" },
    { id: "invex-2", name: "Volaris INVEX 2.0", rate: 20 / 20, rateText: "20 per MX$20", bank: "INVEX (Mexico)" }
  ],
  note: "Altitude by Volaris earns 10 points for every 20 Mexican pesos spent on volaris.com or the app on the base fare and Volaris Services such as seats, bags and bundles, excluding taxes and airport or government fees. It has no status tiers. The Volaris INVEX 0, INVEX and INVEX 2.0 credit cards earn 15, 17 or 20 points per MX$20 charged at Volaris."
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
