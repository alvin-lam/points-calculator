// HK Express (UO) flights do not earn Asia Miles: Cathay's FAQ says miles
// are not earned on HK Express flight bookings. HK Express is listed for
// the Hong Kong Standard Chartered Cathay Mastercard, which earns Asia Miles
// on HK Express tickets.
const rules = {
  name: "HK Express | Asia Miles",
  programName: "Asia Miles",
  country: "HK",
  currency: "HKD",
  unit: "Asia Miles",
  method: "cardOnly",
  flightLabel: "does not earn Asia Miles",
  statuses: [
    { id: "member", name: "Cathay member", multiplier: 1 }
  ],
  // Standard Chartered Cathay Mastercard (Hong Kong): 1 Asia Mile per HK$6
  // on HK Express tickets, plus extra miles that bring the first HK$8,000
  // of Cathay and HK Express spending in each promotion period to 1 per HK$2.
  cards: [
    { id: "sc-cathay", name: "Standard Chartered Cathay Mastercard", rate: 0.5, tiers: [{ upTo: 8000, rate: 0.5 }, { rate: 1 / 6 }], rateText: "1 per HK$2 on the first HK$8,000, then 1 per HK$6", currency: "HKD", bank: "Standard Chartered (Hong Kong)" }
  ],
  note: "HK Express flights do not earn Asia Miles, so this calculator counts only your card's miles. The Hong Kong Standard Chartered Cathay Mastercard earns 1 Asia Mile per HK$6 on HK Express tickets, plus extra miles that bring the first HK$8,000 of Cathay and HK Express spending in each promotion period to 1 per HK$2. The estimate assumes this ticket is the first eligible spending in the period. Short-term HK Express promotions can add bonus miles and are not included."
};

module.exports = {
  id: "hkexpress",
  // Month the earning rules were last checked against the source.
  reviewed: "2026-11",
  code: "UO",
  color: "#702B91",
  source: "https://www.sc.com/hk/credit-cards/cathay/",
  rules
};
