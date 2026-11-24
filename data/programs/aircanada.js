const rules = {
  name: "Air Canada | Aeroplan",
  country: "CA",
  currency: "CAD",
  unit: "points",
  method: "spend",
  centsPerPoint: 1.5,
  statuses: [
    { id: "member", name: "Aeroplan Member", rate: 1 },
    { id: "25k", name: "Aeroplan 25K", rate: 2 },
    { id: "35k", name: "Aeroplan 35K", rate: 3 },
    { id: "50k", name: "Aeroplan 50K", rate: 4 },
    { id: "75k", name: "Aeroplan 75K", rate: 5 },
    { id: "se", name: "Aeroplan Super Elite", rate: 6 }
  ],
  // Co-branded cards: extra points per dollar charged (fare + taxes).
  // Sorted by tier, then issuer; Canadian issuers first, the US card last.
  // Separator entries draw a "---" line between tiers.
  // Grouped by issuing bank, then from entry level to premium.
  cards: [
    { id: "amex", name: "American Express Aeroplan Card", rate: 2, bank: "American Express (Canada)" },
    { id: "amex-reserve", name: "American Express Aeroplan Reserve Card", rate: 3, bank: "American Express (Canada)" },
    { id: "cibc-visa", name: "CIBC Aeroplan Visa", rate: 1, bank: "CIBC (Canada)" },
    { id: "cibc-vi", name: "CIBC Aeroplan Visa Infinite", rate: 1.5, bank: "CIBC (Canada)" },
    { id: "cibc-priv", name: "CIBC Aeroplan Visa Infinite Privilege", rate: 2, bank: "CIBC (Canada)" },
    { id: "td-plat", name: "TD Aeroplan Visa Platinum", rate: 1, bank: "TD (Canada)" },
    { id: "td-vi", name: "TD Aeroplan Visa Infinite", rate: 1.5, bank: "TD (Canada)" },
    { id: "td-priv", name: "TD Aeroplan Visa Infinite Privilege", rate: 2, bank: "TD (Canada)" },
    { id: "chase", name: "Chase Aeroplan Card", rate: 3, currency: "USD", bank: "Chase (US)" }
  ],
  note: "Since January 2026, Aeroplan earns points per Canadian dollar spent on base fare and carrier surcharges on Air Canada flights. Taxes do not earn. Elite members earn 2 to 6 points per dollar. The US Chase Aeroplan Card earns per US dollar charged and includes automatic 25K status."
};

module.exports = {
  id: "aircanada",
  // Month the earning rules were last checked against the source.
  reviewed: "2026-11",
  code: "AC",
  color: "#D52B1E",
  source: "https://www.aircanada.com/ca/en/aco/home/aeroplan/earn/air-canada.html",
  rules
};
