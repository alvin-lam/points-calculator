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
  // Australian direct-earn Velocity cards: Velocity Points per Australian
  // dollar charged at Virgin Australia, from Velocity's direct earn cards
  // page (November 2026):
  // https://www.velocityfrequentflyer.com/frequent-flyer-credit-cards/direct-earn-cards
  // Virgin Money cards: 0.75 or 0.5 per A$ plus 2 or 1 extra at Virgin
  // Australia. American Express rates are "up to" (thresholds apply).
  cards: [
    { id: "amex-velocity-platinum", name: "American Express Velocity Platinum Card", rate: 2.25, rateText: "up to 2.25 per A$", bank: "American Express (Australia)" },
    { id: "amex-velocity-escape-plus", name: "American Express Velocity Escape Plus Card", rate: 1.75, rateText: "up to 1.75 per A$", bank: "American Express (Australia)" },
    { id: "virgin-money-high-flyer", name: "Virgin Money Virgin Australia Velocity High Flyer Card", rate: 2.75, bank: "Virgin Money (Australia)" },
    { id: "virgin-money-flyer", name: "Virgin Money Virgin Australia Velocity Flyer Card", rate: 1.5, bank: "Virgin Money (Australia)" }
  ],
  note: "Velocity earns 4 Base Points per Australian dollar of the all-inclusive fare on Virgin Australia flights: the base fare, taxes (including GST), fees and carrier charges. Seat selection, Economy X, extra baggage and other extras do not earn. Silver, Gold, Platinum and Platinum Plus add 50%, 75%, 100% and 100% of Base Points, but not on Lite fares. Eligible Velocity cardholders earn 5 Base Points per dollar. Flights to and from Doha earn by distance and are not covered. Enter fares in Australian dollars. At Virgin Australia, the American Express Velocity Platinum earns up to 2.25 points per Australian dollar and the Velocity Escape Plus up to 1.75; the Virgin Money Velocity High Flyer earns 2.75 and the Velocity Flyer 1.5."
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
