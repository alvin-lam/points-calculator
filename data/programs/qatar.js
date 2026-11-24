const rules = {
  name: "Qatar Airways | Privilege Club",
  country: "QA",
  unit: "Avios",
  method: "distance",
  centsPerPoint: 1.2,
  defaultFareType: "econ-conv",
  // Share of the flight distance earned, by booking class.
  fareTypes: [
    { id: "first", name: "First Elite (F, A)", rate: 3 },
    { id: "bus-elite", name: "Business Elite (C, J)", rate: 2 },
    { id: "bus-comfort", name: "Business Comfort (I, D)", rate: 1.75 },
    { id: "bus-classic", name: "Business Classic (R)", rate: 1.25 },
    { id: "bus-lite", name: "Business Lite (P)", rate: 0.75 },
    { id: "econ-comfort", name: "Economy Comfort (H, B, Y)", rate: 1 },
    { id: "econ-conv", name: "Economy Convenience (S, V, L, M, K)", rate: 0.75 },
    { id: "econ-classic", name: "Economy Classic (O, T, Q, N)", rate: 0.5 },
    { id: "econ-lite", name: "Economy Lite (W)", rate: 0.25 }
  ],
  statuses: [
    { id: "burgundy", name: "Burgundy", multiplier: 1 },
    { id: "silver", name: "Silver", multiplier: 1.25 },
    { id: "gold", name: "Gold", multiplier: 1.75 },
    { id: "platinum", name: "Platinum", multiplier: 2 }
  ],
  note: "Privilege Club earns a share of the miles flown set by booking class, from 25% in Economy Lite to 300% in First. Silver, Gold, and Platinum add 25%, 75%, and 100%."
};

module.exports = {
  id: "qatar",
  // Month the earning rules were last checked against the source.
  reviewed: "2026-11",
  code: "QR",
  color: "#5C0632",
  source: "https://www.qatarairways.com/en-us/Privilege-Club/qcalculator.html",
  rules
};
