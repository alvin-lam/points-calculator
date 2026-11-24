const rules = {
  name: "STARLUX Airlines | COSMILE",
  country: "TW",
  currency: "TWD",
  unit: "COSMILE miles",
  method: "distance",
  defaultFareType: "y-basic",
  // Share of the ticketed distance (IATA TPM) by booking class, on
  // STARLUX flight numbers (from STARLUX's mileage accrual page).
  fareTypes: [
    { id: "f", name: "First Full (F, A)", rate: 2 },
    { id: "j-full", name: "Business Full (J)", rate: 1.75 },
    { id: "j-basic", name: "Business Basic (C)", rate: 1.5 },
    { id: "j-saving", name: "Business Saving (D)", rate: 1.3 },
    { id: "pe-full", name: "Premium Economy Full (W)", rate: 1.25 },
    { id: "pe-basic", name: "Premium Economy Basic (R)", rate: 1.15 },
    { id: "pe-saving", name: "Premium Economy Saving (E)", rate: 1.05 },
    { id: "y-full", name: "Economy Full (Y, B, H)", rate: 1 },
    { id: "y-basic", name: "Economy Basic (K, M, L)", rate: 0.8 },
    { id: "y-saving", name: "Economy Saving (V, S, N)", rate: 0.6 },
    { id: "y-limited", name: "Economy Limited (Q)", rate: 0 }
  ],
  statuses: [
    { id: "traveler", name: "TRAVELER", multiplier: 1 },
    { id: "adventurer", name: "ADVENTURER", multiplier: 1.15 },
    { id: "explorer", name: "EXPLORER", multiplier: 1.25 },
    { id: "insighter", name: "INSIGHTER", multiplier: 1.25 }
  ],
  note: "COSMILE earns a share of the ticketed distance set by booking class, from 60% in Economy Saving to 200% in First. Economy Limited (Q) earns nothing. ADVENTURER adds 15%, and EXPLORER and INSIGHTER add 25%, on flights operated by STARLUX."
};

module.exports = {
  id: "starlux",
  // Month the earning rules were last checked against the source.
  reviewed: "2026-11",
  code: "JX",
  color: "#8B6E3C",
  source: "https://www.starlux-airlines.com/en-US/cosmile/my-cosmile/mileage-accrual",
  rules
};
