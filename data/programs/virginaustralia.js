const rules = {
  name: "Virgin Australia | Velocity",
  country: "AU",
  currency: "AUD",
  unit: "Velocity Points",
  method: "spend",
  centsPerPoint: 1.0,
  // Base Points are per dollar of the "All Inclusive Fare": "base fare, taxes
  // (including GST), fees and carrier charges", excluding seats, bags and
  // other extras. Tier bonus: Silver +50%, Gold +75%, Platinum and Platinum
  // Plus +100% of Base Points (not on Lite fares).
  taxesEarn: true,
  carrierLabel: "Carrier Charges",
  carrierHint: "Virgin Australia's carrier charges. They earn like the fare, and so do taxes and fees.",
  statuses: [
    { id: "red", name: "Red", rate: 4 },
    { id: "silver", name: "Silver", rate: 6 },
    { id: "gold", name: "Gold", rate: 7 },
    { id: "platinum", name: "Platinum", rate: 8 },
    { id: "platinum-plus", name: "Platinum Plus", rate: 8 }
  ],
  note: "Velocity earns 4 Base Points per Australian dollar of the all-inclusive fare on Virgin Australia flights: the base fare, taxes (including GST), fees and carrier charges. Seat selection, Economy X, extra baggage and other extras do not earn. Silver, Gold, Platinum and Platinum Plus add 50%, 75%, 100% and 100% of Base Points, but not on Lite fares. Eligible Velocity cardholders earn 5 Base Points per dollar. Flights to and from Doha earn by distance and are not covered. Enter fares in Australian dollars."
};

module.exports = {
  id: "virginaustralia",
  // Month the earning rules were last checked against the source.
  reviewed: "2026-11",
  code: "VA",
  color: "#C8102E",
  source: "https://www.velocityfrequentflyer.com/partners-offers/airlines/virgin-australia-airlines",
  rules
};
