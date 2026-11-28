/* SunExpress (XQ): SunExpress your benefits points, from the Loyalty
   Program Terms & Conditions (sunexpress.com, supplied by the site owner
   as a PDF in November 2026) and the "Your benefits program" page:
   - 1 Point per 1 EUR spent on flights booked through SunExpress's own
     channels, including airfares, taxes and surcharges (2.1, 2.8), with
     prices rounded up to the nearest monetary value.
   - Travel complements (seats, SunFare bundles, baggage, sports equipment)
     earn 1 Point per EUR for Welcome, 50% more for Silver and 75% more for
     Gold (2.18).
   - Tiers by flights in the last 18 months: Welcome under 4, Silver 4 to
     10 (the website says 4 to 9), Gold 10 or more.
   - Other currencies convert to euros at the Central Bank of the Republic
     of Türkiye's rate on the booking date. 1 Point = EUR 0.01.
   - Tour operator and travel agency bookings earn a fixed number of
     points that the terms do not state, so they are not covered. */
const rules = {
  name: "SunExpress | SunExpress your benefits",
  programName: "SunExpress your benefits",
  country: "TR",
  currency: "EUR",
  unit: "Points",
  method: "spend",
  // Taxes and surcharges earn like the airfare.
  taxesEarn: true,
  carrierLabel: "Surcharges",
  carrierHint: "SunExpress surcharges on the ticket. They earn like the airfare.",
  roundUp: true,
  centsPerPoint: 1,
  addons: true,
  addonsLabel: "Seats, Bundles and Baggage",
  addonsHint: "Seat selection, SunFare bundles, extra baggage and other travel complements bought from SunExpress. Silver and Gold members earn more on these.",
  addonsRateLabel: "travel complements",
  statuses: [
    { id: "welcome", name: "Welcome", rate: 1, addonsRate: 1 },
    { id: "silver", name: "Silver", rate: 1, addonsRate: 1.5 },
    { id: "gold", name: "Gold", rate: 1, addonsRate: 1.75 }
  ],
  cards: null,
  note: "SunExpress your benefits earns 1 Point per euro spent on flights booked through SunExpress's website, app or other own channels, including the airfare, taxes and surcharges. Travel complements such as seats, SunFare bundles and baggage earn 1 Point per euro for Welcome members, 50% more for Silver (4 or more flights in 18 months) and 75% more for Gold (10 or more). Fares in other currencies convert to euros at the Central Bank of the Republic of Türkiye's rate on the booking date, so enter amounts in euros. Points are rounded up. Tour operator and travel agency bookings earn a fixed number of points that SunExpress does not publish, so they are not covered. One Point is worth EUR 0.01."
};

module.exports = {
  id: "sunexpress",
  // Month the earning rules were last checked against the source.
  reviewed: "2026-11",
  code: "XQ",
  color: "#F39200",
  source: "https://www.sunexpress.com/en-gb/legal-notice/terms-conditions-loyalty/",
  examples: [
    { name: "SunExpress Welcome, EUR 150 fare + EUR 40 taxes", input: { status: "welcome", fields: { airfare: 150, taxes: 40 } }, expect: 190 },
    // Gold: 190 + 30 x 1.75 = 242.5, rounded up to 243.
    { name: "SunExpress Gold with EUR 30 of extras", input: { status: "gold", fields: { airfare: 150, taxes: 40, addons: 30 } }, expect: 243 }
  ],
  rules
};
