const rules = {
  name: "JetBlue Airways | TrueBlue",
  // No carrier-imposed fees field: the airline adds none, or they never earn.
  noCarrier: true,
  unit: "points",
  method: "spend",
  centsPerPoint: 1.3,
  defaultFareType: "main",
  fareTypes: [
    { id: "main", name: "Main, EvenMore, BlueFirst, or Mint" },
    { id: "base", name: "Base (Main Base, EvenMore Base, BlueFirst Base, Mint Base)" }
  ],
  // Fare points plus the Mosaic bonus (3, 4, or 5 per dollar).
  statuses: [
    { id: "member", name: "TrueBlue Member", rates: { main: 3, base: 1 } },
    { id: "mosaic1", name: "Mosaic 1", rates: { main: 6, base: 4 } },
    { id: "mosaic2", name: "Mosaic 2", rates: { main: 6, base: 4 } },
    { id: "mosaic3", name: "Mosaic 3", rates: { main: 7, base: 5 } },
    { id: "mosaic4", name: "Mosaic 4", rates: { main: 8, base: 6 } }
  ],
  // Booking on jetblue.com or the JetBlue app adds a bonus by fare type.
  direct: {
    question: "Did you book on jetblue.com or the JetBlue app?",
    rates: { main: 3, base: 1 }
  },
  // Co-branded cards: extra points per dollar charged (fare + taxes).
  cards: [
    { id: "card", name: "JetBlue Card", rate: 3, bank: "Barclays (US)" },
    { id: "plus", name: "JetBlue Plus Card", rate: 6, bank: "Barclays (US)" },
    { id: "premier", name: "JetBlue Premier Card", rate: 6, bank: "Barclays (US)" }
  ],
  note: "TrueBlue earns per dollar of the pre-tax fare: 3 points on Main, EvenMore, BlueFirst, and Mint, or 1 on Base fares. Booking on jetblue.com or the JetBlue app adds 3 (1 on Base). Mosaic 1 and 2 add 3, Mosaic 3 adds 4, and Mosaic 4 adds 5. The JetBlue Card adds 3 and the Plus Card 6. Subscription bonuses are not included."
};

module.exports = {
  id: "jetblue",
  // Month the earning rules were last checked against the source.
  reviewed: "2026-11",
  code: "B6",
  color: "#0033A0",
  source: "https://www.jetblue.com/trueblue/earning-points",
  // Published examples. The browser tests check each one.
  examples: [
    // JetBlue TrueBlue table.
    { name: "JetBlue member, direct", input: { status: "member", fare: "main", radios: { direct: "Yes" }, fields: { airfare: 100 } }, expect: 600 },
    { name: "JetBlue member, not direct", input: { status: "member", fare: "main", radios: { direct: "No" }, fields: { airfare: 100 } }, expect: 300 }
  ],
  rules
};
