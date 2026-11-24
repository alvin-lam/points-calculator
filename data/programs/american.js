const rules = {
  name: "American Airlines | AAdvantage",
  programName: "AAdvantage",
  unit: "miles",
  // Paid upgrades earn at the same rate as the ticket (since August 2024).
  addons: true,
  addonsLabel: "Paid Upgrades",
  addonsHint: "The base price of a cabin upgrade bought from American. It earns miles at your status rate.",
  // Fiji Airways uses AAdvantage and earns on the same ticket-price rates.
  airlines: [
    { id: "aa", name: "American Airlines", country: "US" },
    { id: "fj", name: "Fiji Airways", country: "FJ", program: {
        cap: null,
        cards: null,
        addons: false,
        note: "Fiji Airways uses AAdvantage. Flights sold by Fiji Airways earn like American flights: 5 miles per US dollar of the base fare and carrier-imposed fees, with a 40%, 60%, 80%, or 120% bonus for Gold, Platinum, Platinum Pro, and Executive Platinum. Government taxes do not earn. LITE fares bought on or after 17 December 2025 earn nothing. Fiji fares are often priced in Fiji dollars, so enter the US dollar equivalent."
      } }
  ],
  method: "spend",
  cap: 75000,
  centsPerPoint: 1.4,
  statuses: [
    { id: "member", name: "AAdvantage Member", rate: 5 },
    { id: "gold", name: "AAdvantage Gold", rate: 7 },
    { id: "platinum", name: "AAdvantage Platinum", rate: 8 },
    { id: "platpro", name: "AAdvantage Platinum Pro", rate: 9 },
    { id: "exp", name: "AAdvantage Executive Platinum", rate: 11 }
  ],
  // Co-branded cards: extra points per dollar charged (fare + taxes).
  cards: [
    { id: "citi-mileup", name: "Citi / AAdvantage MileUp", rate: 2 },
    { id: "citi-platselect", name: "Citi / AAdvantage Platinum Select", rate: 2 },
    { id: "citi-globe", name: "Citi / AAdvantage Globe", rate: 3 },
    { id: "citi-exec", name: "Citi / AAdvantage Executive", rate: 4 }
  ],
  note: "AAdvantage miles are earned on base fare and carrier-imposed fees, and on paid upgrades at the same rate. Government taxes, bags, and seats do not earn miles. Earning is capped at 75,000 miles per ticket."
};

module.exports = {
  id: "american",
  // Month the earning rules were last checked against the source.
  reviewed: "2026-11",
  // Two-letter code, brand color, and source page for each airline.
  airlines: {
    aa: { code: "AA", color: "#0078D2", source: "https://www.aa.com/i18n/aadvantage-program/miles/earn/earn-miles-on-american.jsp" },
    fj: { code: "FJ", color: "#1E3A5F", source: "https://www.aa.com/i18n/travel-info/partner-airlines/fiji-airways.html" }
  },
  // Published examples. The browser tests check each one.
  examples: [
    // AAdvantage: paid upgrades earn at the status rate; Fiji earns like American.
    { name: "American Gold with an upgrade", airline: "aa", input: { status: "gold", fields: { airfare: 300, addons: 200 } }, expect: 3500 },
    { name: "Fiji Airways Executive Platinum", airline: "fj", input: { status: "exp", fields: { airfare: 600, carrierFees: 100 } }, expect: 7700 }
  ],
  rules
};
