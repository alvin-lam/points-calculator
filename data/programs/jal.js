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
  // US co-branded card (First National Bank of Omaha): extra miles per US
  // dollar charged for tickets bought directly from JAL.
  cards: [
    { id: "fnbo-basic", name: "JAL USA Card Basic Rewards", rate: 0.5, currency: "USD", bank: "First National Bank of Omaha (US)" },
    { id: "fnbo-premium", name: "JAL USA Card Premium Rewards", rate: 2, currency: "USD", bank: "First National Bank of Omaha (US)" }
  ],
  note: "JAL earns a share of the flight distance set by booking class, and status adds a 35% to 130% mile-up bonus. Fare classes not listed do not earn miles. The US JAL USA Card earns 2 more miles per US dollar on JAL purchases with Premium Rewards, or 1 per 2 dollars with Basic Rewards. Only tickets bought directly from JAL count. Japanese JAL cards are not included."
};

// Announced for flights from 1 January 2027 (Traveling for Miles): JGC
// Premier no longer needs JAL Global Club membership and becomes JMB
// Premier, with the same 105% bonus and oneworld Emerald.
rules.upcoming = {
  from: "2027-01-01",
  label: "Flights from 1 January 2027",
  rules: {
    statuses: rules.statuses.map(function (st) { return st.id === "jgc-premier" ? Object.assign({}, st, { name: "JMB Premier" }) : st; }),
    note: rules.note + " For flights from 1 January 2027, JGC Premier becomes JMB Premier and no longer requires JAL Global Club membership."
  }
};

module.exports = {
  id: "jal",
  // Month the earning rules were last checked against the source.
  reviewed: "2026-11",
  code: "JL",
  color: "#CC0000",
  source: "https://www.jal.co.jp/jp/en/jmb/earn/travel/flight/jal.html",
  // Worked from the published rates: a ¥150,000 Economy (Y) fare on a
  // 3,000-mile flight, charged as US$1,000 to the Basic Rewards card (the first card listed).
  examples: [
    { name: "JAL Economy (Y) with the JAL USA Card Basic", input: { fare: "y", radios: { usedCard: "Yes" }, fields: { distance: 3000, cardCharge: 1000 } }, expect: 3500 }
  ],
  rules
};
