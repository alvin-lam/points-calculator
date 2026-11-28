const rules = {
  name: "China Airlines | Dynasty Flyer",
  programName: "Dynasty Flyer",
  // Mandarin Airlines (AE), China Airlines' regional airline, earns on the
  // same table.
  airlines: [
    { id: "ci", name: "China Airlines", country: "TW" },
    { id: "ae", name: "Mandarin Airlines", country: "TW" }
  ],
  country: "TW",
  currency: "TWD",
  unit: "miles",
  method: "distance",
  defaultFareType: "y-std",
  // Share of the distance flown by booking class and fare family, on
  // flights operated by China Airlines or Mandarin Airlines.
  fareTypes: [
    { id: "j-flex", name: "Business Flex (J)", rate: 1.75 },
    { id: "j-std", name: "Business Standard (C)", rate: 1.5 },
    { id: "j-basic", name: "Business Basic (D)", rate: 1.25 },
    { id: "pe-flex", name: "Premium Economy Flex (W, U)", rate: 1.25 },
    { id: "pe-std", name: "Premium Economy Standard (A)", rate: 1.15 },
    { id: "pe-basic", name: "Premium Economy Basic (E)", rate: 1 },
    { id: "y-flex", name: "Economy Flex (Y, B, M)", rate: 1 },
    { id: "y-std", name: "Economy Standard (K, V, T)", rate: 0.8 },
    { id: "y-basic", name: "Economy Basic (R, Q, H, N)", rate: 0.5 },
    { id: "y-discount", name: "Economy Discount (L)", rate: 0 }
  ],
  statuses: [
    { id: "dynasty", name: "Dynasty", multiplier: 1 },
    { id: "gold", name: "Gold", multiplier: 1.15 },
    { id: "emerald", name: "Emerald", multiplier: 1.25 },
    { id: "paragon", name: "Paragon", multiplier: 1.3 }
  ],
  note: "Dynasty Flyer earns a share of the distance flown set by booking class, from 50% in Economy Basic to 175% in Business Flex. Economy Discount (L) earns nothing. Gold, Emerald, and Paragon receive 15%, 25%, or 30% incentive miles; China Airlines does not say whether these apply to the class miles or the distance, so this estimate applies them to the class miles. Mandarin Airlines flights earn on the same table."
};

module.exports = {
  id: "chinaairlines",
  // Month the earning rules were last checked against the source.
  reviewed: "2026-11",
  // Two-letter code, brand color, and source page for each airline.
  airlines: {
    ci: { code: "CI", color: "#D6006E", source: "https://www.china-airlines.com/us/en/member/miles/earning/flight" },
    ae: { code: "AE", color: "#0B4EA2", source: "https://www.china-airlines.com/us/en/member/miles/earning/flight" }
  },
  rules
};
