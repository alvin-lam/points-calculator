const rules = {
  name: "United Airlines | MileagePlus",
  unit: "miles",
  method: "spend",
  // 75,000 miles per ticket per member, excluding promotional bonuses and
  // purchased miles.
  cap: 75000,
  centsPerPoint: 1.3,
  // Miles per dollar for tickets issued from 2 April 2026 (AwardWallet,
  // "United MileagePlus mileage earning changes 2026"). The primary holder
  // of a United card with an annual fee earns the cardmember rate ("...Card"
  // keys); Gateway and debit card holders do after spending $10,000 on the
  // card in a calendar year. Basic Economy earns only with a card or status.
  defaultFareType: "standard",
  fareTypes: [
    { id: "basic", name: "Basic Economy" },
    { id: "standard", name: "All other fares" }
  ],
  cardmember: {
    question: "Are you the primary holder of a United credit card?",
    hint: "Explorer, Quest or Club, or Gateway or the debit card after spending $10,000 on it this calendar year. Cardmembers earn a higher rate on every United ticket, however they pay.",
    cardsAnyway: true
  },
  statuses: [
    { id: "member", name: "MileagePlus Member", rates: { basic: 0, standard: 3, basicCard: 3, standardCard: 6 } },
    { id: "silver", name: "Premier Silver", rates: { basic: 2, standard: 5, basicCard: 5, standardCard: 8 } },
    { id: "gold", name: "Premier Gold", rates: { basic: 3, standard: 6, basicCard: 6, standardCard: 9 } },
    { id: "platinum", name: "Premier Platinum", rates: { basic: 4, standard: 7, basicCard: 7, standardCard: 10 } },
    { id: "1k", name: "Premier 1K", rates: { basic: 6, standard: 9, basicCard: 9, standardCard: 12 } }
  ],
  // Co-branded cards: extra miles per dollar when paying with the card
  // (fare + taxes), on top of the cardmember rate.
  cards: [
    { id: "gateway", name: "United Gateway Card", rate: 2, bank: "Chase (US)" },
    { id: "explorer", name: "United Explorer Card", rate: 3, bank: "Chase (US)" },
    { id: "quest", name: "United Quest Card", rate: 4, bank: "Chase (US)" },
    { id: "club", name: "United Club Card", rate: 5, bank: "Chase (US)" },
    { id: "debit", name: "United MileagePlus Debit Rewards Card", rate: 1, kind: "debit" }
  ],
  note: "For tickets issued from 2 April 2026, MileagePlus earns per dollar of base fare and carrier-imposed surcharges: 3, 5, 6, 7 or 9 miles for Member, Premier Silver, Gold, Platinum and 1K, or 6, 8, 9, 10 or 12 for the primary holder of a United card. Basic Economy earns 2, 3, 4 or 6 for Premier members and 3 to 9 for cardmembers; general members without a card earn nothing. Gateway and debit card holders earn the cardmember rate after spending $10,000 on the card in a calendar year. Paying with a United card adds its own bonus miles. Taxes do not earn miles. Earning is capped at 75,000 miles per ticket per member, excluding promotional bonuses and purchased miles."
};

module.exports = {
  id: "united",
  // Month the earning rules were last checked against the source.
  reviewed: "2026-11",
  code: "UA",
  color: "#1415D1",
  source: "https://www.united.com/en/us/fly/mileageplus.html",
  // Published examples. The browser tests check each one.
  examples: [
    // AwardWallet table (from 2 April 2026): Gold 6 per $1, or 9 as a cardmember; Silver Basic Economy 2.
    { name: "United Premier Gold", input: { status: "gold", fare: "standard", fields: { airfare: 500 } }, expect: 3000 },
    { name: "United Premier Gold cardmember", input: { status: "gold", fare: "standard", radios: { cardmember: "Yes" }, fields: { airfare: 500 } }, expect: 4500 },
    { name: "United Basic Economy, member without a card", input: { status: "member", fare: "basic", fields: { airfare: 500 } }, expect: 0 },
    { name: "United Basic Economy, Premier Silver", input: { status: "silver", fare: "basic", fields: { airfare: 500 } }, expect: 1000 }
  ],
  rules
};
