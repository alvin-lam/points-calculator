const rules = {
  name: "EVA Air | Infinity MileageLands",
  country: "TW",
  currency: "TWD",
  unit: "Award Miles",
  method: "distance",
  defaultFareType: "y-std",
  // Share of the ticketed distance by booking class and fare family, on
  // flights flown and marketed by EVA Air or UNI Air.
  fareTypes: [
    { id: "j-up", name: "Business Up (C)", rate: 1.75 },
    { id: "j-std", name: "Business Standard (J)", rate: 1.5 },
    { id: "j-basic", name: "Business Basic (D)", rate: 1.25 },
    { id: "pe-up", name: "Premium Economy Up (K)", rate: 1.25 },
    { id: "pe-std", name: "Premium Economy Standard (T, L)", rate: 1.15 },
    { id: "pe-basic", name: "Premium Economy Basic (P)", rate: 1 },
    { id: "y-up", name: "Economy Up (Y, B)", rate: 1 },
    { id: "y-std", name: "Economy Standard (Q, H, M)", rate: 0.75 },
    { id: "y-basic", name: "Economy Basic (V, W, S)", rate: 0.5 },
    { id: "y-discount", name: "Economy Discount (A)", rate: 0 }
  ],
  statuses: [
    { id: "green", name: "Green Card", multiplier: 1 },
    { id: "silver", name: "Silver Card", multiplier: 1.15 },
    { id: "gold", name: "Gold Card", multiplier: 1.25 },
    { id: "diamond", name: "Diamond Card", multiplier: 1.25 }
  ],
  // Cards from EVA Air's Infinity MileageLands credit card page (North
  // America English, user-supplied PDF of November 2026). Co-brand cards earn
  // award miles directly; bank reward cards are shown after conversion to
  // EVA miles at the bank's published ratio. Cards whose earning rate the
  // page does not give (Cathay United points, Taishin, E.Sun) and Union Bank
  // of Taiwan (cut off in the PDF) are left out.
  cardQuestion: "Did you pay with a card that earns EVA Air miles?",
  cardHint: "Co-brand cards earn award miles directly. Bank reward cards are shown after converting their points to EVA Air miles at the bank's ratio; minimum transfers apply. Enter the total charged in New Taiwan dollars.",
  cards: [
    // American Express EVA Air cards: 1 mile per NT$25, plus 50% (Platinum)
    // or 67% on the first 2,000 miles each month (Gold) on EVA Air tickets.
    { id: "amex-eva-plat", name: "American Express EVA Air Platinum Charge Card (+50% on EVA Air tickets)", rate: 1.5 / 25, rateText: "1.5 per NT$25", bank: "American Express (Taiwan)" },
    { id: "amex-eva-gold", name: "American Express EVA Air Gold Charge Card (+67% on EVA Air tickets)", rate: 1 / 15, tiers: [{ upTo: 50000, rate: 1 / 15 }, { rate: 1 / 25 }], rateText: "1 per NT$15 on the first NT$50,000 a month, then 1 per NT$25", bank: "American Express (Taiwan)" },
    // Cathay United EVA Air co-brand cards: 1 mile per NT$10 on EVA Air
    // tickets for international EVA Air and UNI Air flights.
    { id: "cub-supreme-infinite", name: "Cathay United EVA Air Supreme Infinite Card", rate: 1 / 10, per: 10, bank: "Cathay United Bank (Taiwan)" },
    { id: "cub-infinite", name: "Cathay United EVA Air Infinite Card", rate: 1 / 10, per: 10, bank: "Cathay United Bank (Taiwan)" },
    { id: "cub-supreme-signature", name: "Cathay United EVA Air Supreme Signature Card", rate: 1 / 10, per: 10, bank: "Cathay United Bank (Taiwan)" },
    { id: "cub-signature", name: "Cathay United EVA Air Signature Card", rate: 1 / 30, per: 30, bank: "Cathay United Bank (Taiwan)" },
    // Bank reward cards, converted to EVA Air miles.
    { id: "amex-mr-plat", name: "American Express Platinum or Centurion Card (Membership Rewards)", rate: 1 / 30, per: 30, foreignRate: 2 / 30, foreignPer: 15, bank: "American Express (Taiwan)" },
    { id: "amex-mr", name: "Other American Express cards (Membership Rewards)", rate: 1 / 30, per: 30, bank: "American Express (Taiwan)" },
    { id: "dbs-elite", name: "DBS Travel World Elite Card", rate: 1 / 18, per: 18, foreignRate: 1 / 15, foreignPer: 15, bank: "DBS (Taiwan)" },
    { id: "dbs-business", name: "DBS Travel World Business Card", rate: 1 / 20, per: 20, foreignRate: 1 / 15, foreignPer: 15, bank: "DBS (Taiwan)" },
    { id: "dbs-titanium", name: "DBS Travel Titanium Card", rate: 1 / 35, per: 35, foreignRate: 1 / 20, foreignPer: 20, bank: "DBS (Taiwan)" },
    { id: "far-eastern", name: "Far Eastern International Bank credit cards", rate: 1 / 90, per: 90, bank: "Far Eastern International Bank (Taiwan)" },
    { id: "fubon", name: "Taipei Fubon Bank credit cards", rate: 1 / 140, per: 140, bank: "Taipei Fubon Bank (Taiwan)" },
    { id: "ctbc", name: "CTBC credit cards", rate: 1 / 150, per: 150, bank: "CTBC Bank (Taiwan)" },
    { id: "ctbc-business", name: "CTBC Business Card", rate: 300 / 20000, rateText: "1 per NT$66.67", bank: "CTBC Bank (Taiwan)" },
    { id: "yuanta-infinite", name: "Yuanta Bank Infinite Card", rate: 600 / 110000, rateText: "1 per NT$183.33", bank: "Yuanta Bank (Taiwan)" },
    { id: "scsb", name: "Shanghai Commercial & Savings Bank credit cards", rate: 1 / 200, per: 200, bank: "Shanghai Commercial & Savings Bank (Taiwan)" },
    { id: "sinopac", name: "Bank SinoPac credit cards (invited cardholders only)", rate: 1 / 600, per: 600, bank: "Bank SinoPac (Taiwan)" }
  ],
  note: "EVA Air earns a share of the ticketed distance set by booking class, from 50% in Economy Basic to 175% in Business Up. Economy Discount (A) and group fares earn nothing. Silver Card adds 15%, and Gold and Diamond Card add 25% on international EVA Air and UNI Air flights."
};

module.exports = {
  id: "eva",
  // Month the earning rules were last checked against the source.
  reviewed: "2026-11",
  code: "BR",
  color: "#00A650",
  source: "https://www.evaair.com/en-us/infinity-mileagelands/mileage-award-program/earning-mileage/eva-air-and-uni-air/mileage-accrual-ratio-rule/",
  rules
};
