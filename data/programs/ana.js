const rules = {
  name: "ANA | ANA Mileage Club",
  country: "JP",
  currency: "JPY",
  unit: "miles",
  method: "distance",
  defaultFareType: "y-mid",
  // Share of the flight distance earned, by booking class (international).
  fareTypes: [
    { id: "f", name: "First (F, A)", rate: 1.5 },
    { id: "j", name: "Business (J)", rate: 1.5 },
    { id: "c", name: "Business (C, D, Z)", rate: 1.25 },
    { id: "p", name: "Business (P)", rate: 0.7 },
    { id: "pe", name: "Premium Economy (G, E)", rate: 1 },
    { id: "pe-low", name: "Premium Economy (N)", rate: 0.7 },
    { id: "y", name: "Economy (Y, B, M)", rate: 1 },
    { id: "y-mid", name: "Economy (U, H, Q)", rate: 0.7 },
    { id: "y-low", name: "Economy (V, W, S)", rate: 0.5 },
    { id: "y-lowest", name: "Economy (L, K)", rate: 0.3 }
  ],
  statuses: [
    { id: "member", name: "ANA Mileage Club Member", multiplier: 1 },
    { id: "bronze", name: "Bronze", multiplier: 1.4 },
    { id: "platinum", name: "Platinum", multiplier: 1.9 },
    { id: "diamond", name: "Diamond", multiplier: 2.15 }
  ],
  // US co-branded card (First National Bank of Omaha): extra miles per US
  // dollar charged for ANA purchases.
  cards: [
    { id: "fnbo-plus", name: "ANA Card U.S.A. Plus", rate: 2, currency: "USD", bank: "First National Bank of Omaha (US)" }
  ],
  note: "ANA earns a share of the flight distance set by booking class. Bronze, Platinum, and Diamond add 40%, 90%, and 115% in the first status year, and more in later years or with an ANA Gold or Premium card. O, I, R, and X fares do not earn miles. The US ANA Card U.S.A. Plus earns 2 more miles per US dollar on ANA purchases. Japanese ANA cards are not included."
};

module.exports = {
  id: "ana",
  // Month the earning rules were last checked against the source.
  reviewed: "2026-11",
  code: "NH",
  color: "#13448F",
  source: "https://www.ana.co.jp/en/us/amc/ana-international-flights/",
  rules
};
