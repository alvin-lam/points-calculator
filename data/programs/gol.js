/* GOL earns Smiles miles on the fare, by category: per real within South
   America (Brazil included) and per US dollar elsewhere, for tickets
   bought from 16 June 2026. Up to 60,000 miles per accrual. */

const rules = {
  name: "GOL | Smiles",
  country: "BR",
  currency: "BRL",
  unit: "miles",
  method: "spend",
  // Smiles rules 7.8(e): taxes, airport fees and fees "of any other nature"
  // do not earn; miles come from the fare only.
  noCarrier: true,
  cap: 60000,
  fareTypeLabel: "Route",
  defaultFareType: "sa",
  fareTypes: [
    { id: "sa", name: "Within South America, including Brazil (fare in R$)", currency: "BRL" },
    { id: "intl", name: "To or from outside South America (fare in US$)", currency: "USD" }
  ],
  statuses: [
    { id: "smiles", name: "Smiles", rates: { sa: 1, intl: 5 } },
    { id: "prata", name: "Prata", rates: { sa: 2, intl: 8 } },
    { id: "ouro", name: "Ouro", rates: { sa: 3, intl: 10 } },
    { id: "diamante", name: "Diamante", rates: { sa: 5, intl: 11 } },
    { id: "magno", name: "Magno", rates: { sa: 6, intl: 12 } }
  ],
  // Brazilian co-branded card: Smiles miles per US dollar equivalent of
  // card spend (billed in reais), from https://www.smiles.com.br/cartao-de-credito
  // Clube Smiles or Diamante members earn 5.5. Smiles publishes no extra
  // for GOL purchases.
  cardHint: "Card miles are earned on the US dollar equivalent of the amount charged, taxes included. Enter the charge in US dollars. Clube Smiles and Diamante members earn 5.5 miles per US dollar instead of 3.",
  cards: [
    { id: "smiles-infinite", name: "GOL Smiles Visa Infinite", rate: 3, currency: "USD", bank: "Banco do Brasil, Bradesco or Santander (Brazil)" }
  ],
  note: "Smiles earns on the GOL fare by category, for tickets bought from 16 June 2026: 1, 2, 3, 5, or 6 miles per real within South America, including Brazil, and 5, 8, 10, 11, or 12 miles per US dollar on other routes, for Smiles, Prata, Ouro, Diamante, and Magno. Earning is capped at 60,000 miles. Favorite Route bonuses are not included, and codeshare flights booked through another airline do not earn. The GOL Smiles Visa Infinite card earns 3 miles per US dollar equivalent charged, or 5.5 for Clube Smiles or Diamante members."
};

module.exports = {
  id: "gol",
  // Month the earning rules were last checked against the source.
  reviewed: "2026-11",
  code: "G3",
  color: "#FF7020",
  source: "https://www.smiles.com.br/gol-linhas-aereas-inteligentes",
  // Published examples. The browser tests check each one.
  examples: [
    // GOL Smiles.
    { name: "GOL Diamante within South America", input: { status: "diamante", fare: "sa", fields: { airfare: 800 } }, expect: 4000 },
    { name: "GOL Magno cap", input: { status: "magno", fare: "intl", fields: { airfare: 6000 } }, expect: 60000 }
  ],
  rules
};
