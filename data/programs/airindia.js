/* Air India Maharaja Club: points per 100 rupees of base fare plus fuel
   surcharge (YQ), by tier, with 2 more per 100 rupees when booked on Air
   India's own website or app. Taxes and fees do not earn. */
const rules = {
  name: "Air India | Maharaja Club",
  programName: "Maharaja Club",
  country: "IN",
  currency: "INR",
  unit: "Maharaja Points",
  method: "spend",
  carrierLabel: "Fuel Surcharge (YQ)",
  carrierHint: "Air India's fuel surcharge, shown as YQ on the ticket. It earns points like the fare.",
  defaultFareType: "direct",
  fareTypes: [
    { id: "direct", name: "Booked on airindia.com or the Air India app" },
    { id: "other", name: "Booked through another channel" }
  ],
  // Points per rupee: 6, 8, 9 or 10 per 100 rupees, plus 2 when booked direct.
  statuses: [
    { id: "red", name: "Red", rates: { direct: 0.08, other: 0.06 } },
    { id: "silver", name: "Silver", rates: { direct: 0.1, other: 0.08 } },
    { id: "gold", name: "Gold", rates: { direct: 0.11, other: 0.09 } },
    { id: "platinum", name: "Platinum", rates: { direct: 0.12, other: 0.1 } }
  ],
  note: "Maharaja Club earns per 100 rupees of base fare and fuel surcharge: 6 points for Red, 8 for Silver, 9 for Gold and 10 for Platinum. Booking on Air India's own website or app adds 2 points per 100 rupees. Taxes and fees do not earn. Since 26 May 2026, Air India Express flights also earn Maharaja Points at the same rates. Enter fares in rupees."
};

module.exports = {
  id: "airindia",
  // Month the earning rules were last checked against the source.
  reviewed: "2026-11",
  code: "AI",
  color: "#DA0E29",
  source: "https://www.airindia.com/in/en/maharaja-club/earn-points.html",
  // Worked from the published rates.
  examples: [
    { name: "Air India Red, booked direct", input: { status: "red", fare: "direct", fields: { airfare: 9000, carrierFees: 1000 } }, expect: 800 },
    { name: "Air India Platinum, other channel", input: { status: "platinum", fare: "other", fields: { airfare: 10000 } }, expect: 1000 }
  ],
  rules
};
