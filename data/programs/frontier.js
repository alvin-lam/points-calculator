const rules = {
  name: "Frontier Airlines | Frontier Miles",
  // Ask for seats and bags bought on the booking; they earn like the fare.
  addons: true,
  unit: "miles",
  method: "spend",
  centsPerPoint: 0.5,
  // Ask whether the trip was booked with the GoWild! Pass.
  gowild: true,
  carrierLabel: "Carrier Interface Charge",
  carrierHint: "Shown as CIC on your receipt. Frontier's per-segment charge for booking online or by phone. It earns miles like the fare.",
  defaultFareType: "basic",
  fareTypes: [
    { id: "basic", name: "Basic fare (no bundle)" },
    { id: "bundle", name: "Bundle" }
  ],
  // Rates for bookings made on or after September 1, 2026. Holders of a
  // Frontier Mastercard (World or Access) earn the higher
  // cardmember rate however they pay ("...Card" keys).
  cardmember: {
    question: "Are you a Frontier Airlines Mastercard cardmember?",
    hint: "World or Access Mastercard. Cardmembers earn a higher rate on every booking, however they pay."
  },
  statuses: [
    { id: "member", name: "Frontier Miles Member", rates: { basic: 1, bundle: 6, basicCard: 4, bundleCard: 12 } },
    { id: "silver", name: "Elite Silver", rates: { basic: 3, bundle: 8, basicCard: 6, bundleCard: 14 } },
    { id: "gold", name: "Elite Gold", rates: { basic: 5, bundle: 10, basicCard: 8, bundleCard: 16 } },
    { id: "platinum", name: "Elite Platinum", rates: { basic: 7, bundle: 12, basicCard: 10, bundleCard: 18 } },
    { id: "diamond", name: "Elite Diamond", rates: { basic: 11, bundle: 16, basicCard: 14, bundleCard: 22 } }
  ],
  // Paying with the card adds 5 miles per dollar on top. Frontier
  // publishes this for the World Mastercard; the Access card is assumed
  // to match.
  cards: [
    { id: "frontier-mc", name: "Frontier Airlines World Mastercard", rate: 5 },
    { id: "frontier-access", name: "Frontier Airlines Access Mastercard", rate: 5 }
  ],
  note: "For bookings made on or after September 1, 2026, Frontier Miles earns 1 to 11 miles per dollar on basic fares and 6 to 16 on bundles, depending on status, on the fare plus seats and bags. GoWild! Pass fares earn 1 mile, and the Early Booking Fee earns at the status and fare type rate. Holders of a Frontier Airlines World or Access Mastercard earn 4 to 14 on basic fares and 12 to 22 on bundles however they pay, and paying with the card adds 5 miles per dollar. Frontier publishes the 5 for the World Mastercard; this estimate assumes the same for the Access card."
};

module.exports = {
  id: "frontier",
  // Month the earning rules were last checked against the source.
  reviewed: "2026-11",
  code: "F9",
  color: "#00965E",
  source: "https://www.flyfrontier.com/frontiermiles/terms-and-conditions/",
  // Published examples. The browser tests check each one.
  examples: [
    // Frontier: seats and bags earn like the fare; GoWild fare earns 1 mile.
    { name: "Frontier with CIC and bags", input: { status: "member", fare: "basic", fields: { airfare: 80, carrierFees: 20, addons: 60 } }, expect: 160 },
    { name: "Frontier GoWild, Gold cardmember bundle", input: { status: "gold", fare: "bundle", radios: { gowild: "Yes", cardmember: "Yes" }, fields: { gowildFee: 50, addons: 40 } }, expect: 1441 }
  ],
  rules
};
