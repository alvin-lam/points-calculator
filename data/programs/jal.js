const rules = {
  name: "Japan Airlines | JAL Mileage Bank",
  country: "JP",
  currency: "JPY",
  unit: "miles",
  method: "distance",
  defaultFareType: "y-mid",
  // Share of the flight distance earned, by booking class (international).
  fareTypes: [
    { id: "f", name: "First (F, A)", rate: 1.5 },
    { id: "j", name: "Business (J, C, D, I)", rate: 1.25 },
    { id: "x", name: "Business (X)", rate: 0.7 },
    { id: "pe", name: "Premium Economy (W, R)", rate: 1 },
    { id: "pe-low", name: "Premium Economy (E)", rate: 0.7 },
    { id: "y", name: "Economy (Y, B)", rate: 1 },
    { id: "y-mid", name: "Economy (H, K, M)", rate: 0.7 },
    { id: "y-low", name: "Economy (L, V, S)", rate: 0.5 },
    { id: "y-lowest", name: "Economy (O, G, Q, N)", rate: 0.3 }
  ],
  statuses: [
    { id: "member", name: "JMB Member", multiplier: 1 },
    { id: "jgc", name: "JAL Global Club", multiplier: 1.35 },
    { id: "crystal", name: "JMB Crystal", multiplier: 1.55 },
    { id: "sapphire", name: "JMB Sapphire", multiplier: 2.05 },
    { id: "jgc-premier", name: "JGC Premier", multiplier: 2.05 },
    { id: "diamond", name: "JMB Diamond", multiplier: 2.3 }
  ],
  note: "JAL earns a share of the flight distance set by booking class, and status adds a 35% to 130% mile-up bonus. Fare classes not listed do not earn miles. Japanese JAL cards are not included."
};

module.exports = {
  id: "jal",
  // Month the earning rules were last checked against the source.
  reviewed: "2026-11",
  code: "JL",
  color: "#CC0000",
  source: "https://www.jal.co.jp/jp/en/jmb/earn/travel/flight/jal.html",
  rules
};
