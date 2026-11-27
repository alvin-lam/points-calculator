/* Vietnam Airlines (VN): Lotusmiles award miles as the distance times a
   fare-family multiplier, from Vietnam Airlines' accrual table effective
   26 August 2026 (EN_Mile_Accrual.pdf). Economy Classic and Lite earn less
   on international routes. Tier bonuses from the tier benefits page. */
const rules = {
  name: "Vietnam Airlines | Lotusmiles",
  programName: "Lotusmiles",
  country: "VN",
  currency: "VND",
  unit: "miles",
  method: "distance",
  zoneLabel: "Route",
  zoneHint: "Economy Classic and Economy Lite earn less on international routes.",
  zones: [
    { id: "domestic", name: "Within Vietnam" },
    { id: "international", name: "International" }
  ],
  defaultFareType: "y-classic",
  fareTypeLabel: "Fare family",
  // Earn lists follow the zones order: [within Vietnam, international].
  fareTypes: [
    { id: "j-flex", name: "Business Flex (J, C)", earn: [2, 2] },
    { id: "j-classic", name: "Business Classic (D, I)", earn: [1.5, 1.5] },
    { id: "w-flex", name: "Premium Economy Flex (W)", earn: [1.3, 1.3] },
    { id: "w-classic", name: "Premium Economy Classic (Z, U)", earn: [1.2, 1.2] },
    { id: "y-flex", name: "Economy Flex (Y, M, B)", earn: [1.1, 1.1] },
    { id: "y-classic", name: "Economy Classic (S, H, K, L)", earn: [0.8, 0.65] },
    { id: "y-lite", name: "Economy Lite (Q, N, R, T, E)", earn: [0.6, 0.25] },
    { id: "y-superlite", name: "Economy Super Lite (A, P, G)", earn: [0.1, 0.1] }
  ],
  statuses: [
    { id: "silver", name: "Member or Silver", multiplier: 1 },
    { id: "titanium", name: "Titanium", multiplier: 1.3 },
    { id: "gold", name: "Gold", multiplier: 1.5 },
    { id: "platinum", name: "Platinum", multiplier: 2 },
    { id: "million", name: "Million Miler", multiplier: 2 }
  ],
  note: "Lotusmiles earns the distance times a fare-family multiplier on VN flights, from 0.1 (Economy Super Lite) to 2.0 (Business Flex), for flights from 26 August 2026. Economy Classic earns 0.8 within Vietnam and 0.65 internationally, and Economy Lite 0.6 and 0.25. Booking class Q counts as Economy Classic between Vietnam and Europe, Australia, the United States and China. Titanium earns 30% more, Gold 50% and Platinum and Million Miler 100%. Award, agent-discount and other discounted tickets earn nothing."
};

module.exports = {
  id: "vietnam",
  // Month the earning rules were last checked against the source.
  reviewed: "2026-11",
  code: "VN",
  color: "#005771",
  source: "https://www.vietnamairlines.com/content/dam/vna/vna-assets/global/documents/lotusmiles/earn_miles/EN_Mile_Accrual.pdf",
  examples: [
    { name: "Vietnam Airlines Economy Classic, international", input: { fare: "y-classic", zone: "international", fields: { distance: 1000 } }, expect: 650 },
    { name: "Vietnam Airlines Business Flex, Gold", input: { fare: "j-flex", zone: "domestic", status: "gold", fields: { distance: 700 } }, expect: 2100 }
  ],
  rules
};
