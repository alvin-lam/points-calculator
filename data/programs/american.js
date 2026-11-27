const rules = {
  name: "American Airlines | AAdvantage",
  programName: "AAdvantage",
  unit: "miles",
  // Paid upgrades earn at the same rate as the ticket (since August 2024).
  addons: true,
  addonsLabel: "Paid Upgrades",
  addonsHint: "The base price of a cabin upgrade bought from American. It earns miles at your status rate.",
  // Fiji Airways uses AAdvantage and earns on the same ticket-price rates.
  // JetSMART uses AAdvantage too, with rates by fare (Basic earns nothing).
  airlines: [
    { id: "aa", name: "American Airlines", country: "US" },
    { id: "fj", name: "Fiji Airways", country: "FJ", program: {
        cap: null,
        cards: null,
        addons: false,
        note: "Fiji Airways uses AAdvantage. Flights sold by Fiji Airways earn like American flights: 5 miles per US dollar of the base fare and carrier-imposed fees, with a 40%, 60%, 80%, or 120% bonus for Gold, Platinum, Platinum Pro, and Executive Platinum. Government taxes do not earn. LITE fares bought on or after 17 December 2025 earn nothing. Fiji fares are often priced in Fiji dollars, so enter the US dollar equivalent."
      } },
    // JetSMART (since 24 September 2024): American's JetSMART page
    // (https://www.aa.com/i18n/travel-info/partner-airlines/jetsmart.jsp)
    // and JetSMART's AAdvantage page (https://jetsmart.com/cl/es/minisitios/millas-aadvantage/acumular):
    // miles per US dollar by fare, Basic 0, Light 2, SMART 5, FULL / Full
    // Flex 5, plus 40%, 60%, 80% or 120% for Gold, Platinum, Platinum Pro
    // and Executive Platinum. American counts carrier-imposed fees;
    // JetSMART says taxes and "cargos" do not earn. We follow American.
    { id: "ja", name: "JetSMART", country: "CL", program: {
        cap: null,
        cards: null,
        addons: false,
        carrierLabel: "JetSMART Carrier Fees",
        carrierHint: "Charges set by JetSMART, if any. American counts them; government taxes and airport fees do not earn.",
        fareTypes: [
          { id: "basic", name: "Basic" },
          { id: "light", name: "Light" },
          { id: "smart", name: "SMART Pack" },
          { id: "full", name: "FULL / Full Flex Pack" }
        ],
        statuses: [
          { id: "member", name: "AAdvantage Member", rates: { basic: 0, light: 2, smart: 5, full: 5 } },
          { id: "gold", name: "AAdvantage Gold", rates: { basic: 0, light: 2.8, smart: 7, full: 7 } },
          { id: "platinum", name: "AAdvantage Platinum", rates: { basic: 0, light: 3.2, smart: 8, full: 8 } },
          { id: "platpro", name: "AAdvantage Platinum Pro", rates: { basic: 0, light: 3.6, smart: 9, full: 9 } },
          { id: "exp", name: "AAdvantage Executive Platinum", rates: { basic: 0, light: 4.4, smart: 11, full: 11 } }
        ],
        note: "JetSMART uses AAdvantage. JetSMART flights earn miles per US dollar of the fare, including the price of the pack: 2 with Light and 5 with SMART or FULL (Full Flex), with a 40%, 60%, 80%, or 120% bonus for Gold, Platinum, Platinum Pro, and Executive Platinum. Basic fares earn nothing. American's JetSMART page says carrier-imposed fees earn and government taxes do not, so this calculator counts carrier fees. JetSMART's own page says taxes, charges, and optional extras do not earn, so carrier fees may not earn in practice. Bags, seats, and other extras do not earn. A fare paid in another currency earns on its US dollar value at the exchange rate of the purchase date, so enter the US dollar equivalent. No AAdvantage card publishes a JetSMART rate. JetSMART flights booked with an American flight number earn under American's own rates."
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
    { id: "citi-mileup", name: "Citi / AAdvantage MileUp", rate: 2, bank: "Citi (US)" },
    { id: "citi-platselect", name: "Citi / AAdvantage Platinum Select", rate: 2, bank: "Citi (US)" },
    { id: "citi-globe", name: "Citi / AAdvantage Globe", rate: 3, bank: "Citi (US)" },
    { id: "citi-exec", name: "Citi / AAdvantage Executive", rate: 4, bank: "Citi (US)" }
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
    fj: { code: "FJ", color: "#2C1E16", source: "https://www.aa.com/i18n/travel-info/partner-airlines/fiji-airways.html" },
    ja: { code: "JA", color: "#153E69", source: "https://www.aa.com/i18n/travel-info/partner-airlines/jetsmart.jsp" }
  },
  // Published examples. The browser tests check each one.
  examples: [
    // AAdvantage: paid upgrades earn at the status rate; Fiji earns like American.
    { name: "American Gold with an upgrade", airline: "aa", input: { status: "gold", fields: { airfare: 300, addons: 200 } }, expect: 3500 },
    { name: "Fiji Airways Executive Platinum", airline: "fj", input: { status: "exp", fields: { airfare: 600, carrierFees: 100 } }, expect: 7700 },
    // JetSMART: SMART at the Gold rate (5 x 1.4) on fare and carrier fees;
    // Light for a member earns 2 per dollar.
    { name: "JetSMART Gold SMART Pack", airline: "ja", input: { status: "gold", fare: "smart", fields: { airfare: 100, carrierFees: 20 } }, expect: 840 },
    { name: "JetSMART Member Light", airline: "ja", input: { status: "member", fare: "light", fields: { airfare: 80 } }, expect: 160 }
  ],
  rules
};
