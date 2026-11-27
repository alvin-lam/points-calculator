const rules = {
  name: "Singapore Airlines | KrisFlyer",
  country: "SG",
  currency: "SGD",
  unit: "KrisFlyer miles",
  method: "distance",
  defaultFareType: "y-mid",
  // Share of miles flown by booking class (chart dated 12 January 2026).
  // noBonus fares do not get the 25% tier bonus.
  fareTypes: [
    { id: "f", name: "Suites or First (A, F)", rate: 2 },
    { id: "j", name: "Business (C, J, Z)", rate: 1.5 },
    { id: "j-low", name: "Business (D, U)", rate: 1.25 },
    { id: "pe", name: "Premium Economy (S, T)", rate: 1.25 },
    { id: "pe-low", name: "Premium Economy (R, L, P)", rate: 1 },
    { id: "y", name: "Economy (B, E, Y)", rate: 1 },
    { id: "y-mid", name: "Economy (H, M, W)", rate: 0.75 },
    { id: "y-low", name: "Economy (K, N, Q, V, G)", rate: 0.5, noBonus: true }
  ],
  statuses: [
    { id: "member", name: "KrisFlyer Member", multiplier: 1 },
    { id: "elite-silver", name: "Elite Silver", multiplier: 1.25 },
    { id: "elite-gold", name: "Elite Gold", multiplier: 1.25 },
    { id: "pps", name: "PPS Club", multiplier: 1.25 },
    { id: "solitaire", name: "Solitaire PPS Club", multiplier: 1.25 }
  ],
  // Singapore co-branded cards: KrisFlyer miles per Singapore dollar
  // charged for Singapore Airlines, Scoot and KrisShop purchases (UOB), or
  // for eligible Singapore Airlines and Scoot flights booked direct in
  // Singapore dollars from Singapore (American Express, from
  // https://www.americanexpress.com/sg/credit-cards/singapore-airlines-krisflyer-ascend-credit-card/).
  cards: [
    { id: "uob-kf", name: "KrisFlyer UOB Credit Card", rate: 3, bank: "UOB (Singapore)" },
    { id: "amex-kf-ascend", name: "American Express Singapore Airlines KrisFlyer Ascend Credit Card", rate: 2, bank: "American Express (Singapore)" }
  ],
  note: "KrisFlyer earns a share of the miles flown set by booking class, from 50% to 200%. Elite Silver, Elite Gold, and PPS Club members get a 25% tier bonus, except on Economy K, N, Q, V, and G. Scoot flights do not get the tier bonus. The Singapore KrisFlyer UOB Credit Card earns 3 miles per Singapore dollar on Singapore Airlines purchases, and the American Express Singapore Airlines KrisFlyer Ascend Credit Card earns 2 on Singapore Airlines flights booked direct in Singapore dollars."
};

module.exports = {
  id: "krisflyer",
  // Month the earning rules were last checked against the source.
  reviewed: "2026-11",
  code: "SQ",
  color: "#0A2F6B",
  source: "https://www.singaporeair.com/en_UK/us/faq/krisflyer-miles-earn-and-redeem/earning-and-redeeming-krisflyer-miles/",
  rules
};
