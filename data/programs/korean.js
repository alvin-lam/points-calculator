const rules = {
  name: "Korean Air | SKYPASS",
  country: "KR",
  unit: "miles",
  method: "distance",
  defaultFareType: "y",
  fareTypes: [
    { id: "f", name: "First (F)", rate: 2 },
    { id: "j-flex", name: "Prestige Flex (J)", rate: 1.35 },
    { id: "j", name: "Prestige Plus or Standard (C, D, I, R)", rate: 1.25 },
    { id: "pe-v", name: "Premium (V)", rate: 1.1 },
    { id: "pe-w", name: "Premium (W)", rate: 1 },
    { id: "y", name: "Economy (Y, B, M, S, H, E, K, L, U)", rate: 1 },
    { id: "y-low", name: "Economy (Q, T)", rate: 0.7 }
  ],
  statuses: [
    { id: "member", name: "SKYPASS Member", multiplier: 1 },
    { id: "morning-calm", name: "Morning Calm", multiplier: 1 },
    { id: "morning-calm-select", name: "Morning Calm Select", multiplier: 1 },
    { id: "million-miler", name: "Million Miler", multiplier: 1 }
  ],
  // US cards (U.S. Bank): miles per dollar on Korean Air tickets.
  cards: [
    { id: "skyblue", name: "SKYPASS SkyBlue Visa (US)", rate: 1 },
    { id: "sig", name: "SKYPASS Visa Signature (US)", rate: 2 },
    { id: "select", name: "SKYPASS Select Visa Signature (US)", rate: 3 }
  ],
  note: "SKYPASS earns the flight distance times the booking class percentage, from 70% to 200%, on Korean Air's current international fare table. Tiers add no bonus miles. The US SKYPASS cards add 1, 2, or 3 miles per dollar on Korean Air tickets charged to the SkyBlue Visa, Visa Signature, or Select Visa Signature."
};

module.exports = {
  id: "korean",
  // Month the earning rules were last checked against the source.
  reviewed: "2026-11",
  code: "KE",
  color: "#0064DE",
  source: "https://cwsi.net/fares/korean-air/",
  rules
};
