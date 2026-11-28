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
    { id: "green", name: "Green", multiplier: 1 },
    { id: "silver", name: "Silver", multiplier: 1.15 },
    { id: "gold", name: "Gold", multiplier: 1.25 },
    { id: "diamond", name: "Diamond", multiplier: 1.25 }
  ],
  // EVA Air co-brand cards from American Express and Cathay United Bank, from
  // EVA Air's Infinity MileageLands credit card page (North America English,
  // user-supplied PDF of November 2026). The Amex 1 per NT$25 rate is confirmed
  // on American Express Taiwan's card page. Other cards on the page are left
  // out by choice.
  cardQuestion: "Did you pay with an EVA Air co-brand card?",
  cardHint: "These Taiwan-issued cards earn award miles directly, with a higher rate on EVA Air tickets. Enter the total charged in New Taiwan dollars.",
  cards: [
    // American Express EVA Air cards: 1 point (= 1 award mile) per NT$25,
    // kept simple. The extra 50% (Platinum) or 67% on the first 2,000 miles
    // a month (Gold) on EVA Air tickets is not counted.
    { id: "amex-eva-plat", name: "American Express EVA Air Platinum Charge Card", rate: 1 / 25, per: 25, bank: "American Express (Taiwan)" },
    { id: "amex-eva-gold", name: "American Express EVA Air Gold Charge Card", rate: 1 / 25, per: 25, bank: "American Express (Taiwan)" },
    // Cathay United EVA Air co-brand cards: 1 mile per NT$10 on EVA Air
    // tickets for international EVA Air and UNI Air flights.
    { id: "cub-supreme-infinite", name: "Cathay United EVA Air Supreme Infinite Card", rate: 1 / 10, per: 10, bank: "Cathay United Bank (Taiwan)" },
    { id: "cub-infinite", name: "Cathay United EVA Air Infinite Card", rate: 1 / 10, per: 10, bank: "Cathay United Bank (Taiwan)" },
    { id: "cub-supreme-signature", name: "Cathay United EVA Air Supreme Signature Card", rate: 1 / 10, per: 10, bank: "Cathay United Bank (Taiwan)" },
    { id: "cub-signature", name: "Cathay United EVA Air Signature Card", rate: 1 / 30, per: 30, bank: "Cathay United Bank (Taiwan)" }
  ],
  note: "EVA Air earns a share of the ticketed distance set by booking class, from 50% in Economy Basic to 175% in Business Up. Economy Discount (A) and group fares earn nothing. Silver adds 15%, and Gold and Diamond add 25% on international EVA Air and UNI Air flights."
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
