/* SpiceJet (SG): SpiceClub SC Points on SpiceJet flights, from SpiceClub's
   pages on spiceclub.spicejet.com: Tiers at a Glance (SC Points per ₹100
   spent: Classic 4, Silver 6, Gold 8, Platinum 10; 250 bonus SC Points on
   direct bookings), the Flights and Add-ons pages, the FAQs and the Terms
   and Conditions ("Earn SC Points": amount spent is the base price of
   flights and add-ons, net of taxes and duties). Card rates are from Axis
   Bank's "Terms & Conditions for Voyage / Voyage Black Credit Card -
   SpiceClub Points Earn" PDF and the card pages on axis.bank.in. */

const rules = {
  name: "SpiceJet | SpiceClub",
  programName: "SpiceClub",
  country: "IN",
  currency: "INR",
  unit: "SC Points",
  method: "spend",
  ratePer: 100,
  // SpiceJet's fares show the base fare and then taxes and fees, with no
  // separate carrier surcharge. Only the base price earns.
  noCarrier: true,
  // Pre-booked add-ons earn on their price before taxes (SpiceClub FAQ).
  addons: true,
  addonsLabel: "Add-ons",
  addonsHint: "Pre-booked add-ons such as seats, meals, excess baggage, SpiceMax and You 1st, before taxes. They earn like the fare.",
  statuses: [
    { id: "classic", name: "Classic", rate: 0.04 },
    { id: "silver", name: "Silver", rate: 0.06 },
    { id: "gold", name: "Gold", rate: 0.08 },
    { id: "platinum", name: "Platinum", rate: 0.10 }
  ],
  // Axis Bank SpiceJet Voyage cards: SC Points per ₹200 charged on the
  // SpiceJet website or app, on top of the SpiceClub points. Axis counts
  // spend in whole multiples of ₹200, rounded down.
  cardHint: "Card SC Points are earned on the amount charged on the SpiceJet website or app, taxes included, on top of the SpiceClub points. Axis Bank counts spend in whole multiples of ₹200, and card points on SpiceJet stop after ₹1 lakh of spend a month.",
  cards: [
    { id: "axis-voyage", name: "SpiceJet Axis Bank Voyage", rate: 6 / 200, spendStep: 200, rateText: "6 per ₹200", bank: "Axis Bank (India)" },
    { id: "axis-voyage-black", name: "SpiceJet Axis Bank Voyage Black", rate: 12 / 200, spendStep: 200, rateText: "12 per ₹200", bank: "Axis Bank (India)" }
  ],
  // 250 bonus SC Points per booking made on spicejet.com or the app.
  direct: { question: "Did you book on spicejet.com or the SpiceJet app?", points: 250 },
  note: "SpiceClub earns SC Points per ₹100 of the base fare and pre-booked add-ons on SpiceJet flights: 4 for Classic, 6 for Silver, 8 for Gold and 10 for Platinum. Taxes and fees do not earn. Members earn only on their own tickets, after the flight. Bookings made directly on the SpiceJet website or app also earn 250 bonus SC Points per booking. Tickets paid with SC Points or vouchers do not earn, and a part payment with SC Points earns only on the rest. The Axis Bank Voyage card earns 6 SC Points per ₹200 and the Voyage Black 12 per ₹200 spent on the SpiceJet website or app. Axis counts spend in whole multiples of ₹200. Enter fares in rupees."
};

module.exports = {
  id: "spicejet",
  // Month the earning rules were last checked against the source.
  reviewed: "2026-11",
  code: "SG",
  color: "#E02826",
  source: "https://spiceclub.spicejet.com/exploreAllTiers",
  examples: [
    { name: "SpiceJet Gold with add-ons, booked direct", input: { status: "gold", radios: { direct: "Yes" }, fields: { airfare: 5000, addons: 500, taxes: 900 } }, expect: 690 },
    { name: "SpiceJet Classic, travel agent", input: { status: "classic", radios: { direct: "No" }, fields: { airfare: 3000, taxes: 700 } }, expect: 120 },
    // Flight: (4,000 + 400) x 6 / 100 = 264. Card: 5,000 x 6 / 200 = 150.
    { name: "SpiceJet Silver with the Axis Voyage card", input: { status: "silver", radios: { usedCard: "Yes", direct: "No" }, fields: { airfare: 4000, addons: 400, taxes: 600 } }, expect: 414 }
  ],
  rules
};
