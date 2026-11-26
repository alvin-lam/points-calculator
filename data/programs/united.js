const rules = {
  name: "United Airlines | MileagePlus",
  unit: "miles",
  method: "spend",
  cap: 75000,
  centsPerPoint: 1.3,
  statuses: [
    { id: "member", name: "MileagePlus Member", rate: 5 },
    { id: "silver", name: "Premier Silver", rate: 7 },
    { id: "gold", name: "Premier Gold", rate: 8 },
    { id: "platinum", name: "Premier Platinum", rate: 9 },
    { id: "1k", name: "Premier 1K", rate: 11 }
  ],
  // Co-branded cards: extra points per dollar charged (fare + taxes).
  cards: [
    { id: "gateway", name: "United Gateway Card", rate: 2, bank: "Chase (US)" },
    { id: "explorer", name: "United Explorer Card", rate: 3, bank: "Chase (US)" },
    { id: "quest", name: "United Quest Card", rate: 4, bank: "Chase (US)" },
    { id: "club", name: "United Club Card", rate: 5, bank: "Chase (US)" },
    { id: "debit", name: "United MileagePlus Debit Rewards Card", rate: 1, kind: "debit" }
  ],
  note: "MileagePlus miles are earned on base fare and carrier-imposed surcharges. Taxes do not earn miles. Earning is capped at 75,000 miles per ticket."
};

module.exports = {
  id: "united",
  // Month the earning rules were last checked against the source.
  reviewed: "2026-11",
  code: "UA",
  color: "#1415D1",
  source: "https://www.united.com/en/us/fly/mileageplus.html",
  rules
};
