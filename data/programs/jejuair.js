/* Jeju Air (7C): J Points on Jeju Air flights, from Jeju Air's J Point
   earning guide (jejuair.net, "J 포인트 탑승 적립 안내") and its member
   tier guide. Flights earn a percentage of the air fare: a base 5% when
   bought on Jeju Air's website or app, or a base 2% when bought from a
   travel agency or other outside channel, plus a tier bonus in either
   case (Silver+ 0.5%, Gold 1%, VIP 5%). Discount coupons, fuel surcharges,
   airport fees and taxes do not earn. Pre-paid bags and seats bought on
   Jeju Air's app or website earn 2% of their price. 1 J Point is worth
   1 won. The KB Kookmin card rate is from Jeju Air's card benefits page. */
const rules = {
  name: "Jeju Air | J Point",
  programName: "J Point",
  country: "KR",
  currency: "KRW",
  unit: "J Points",
  method: "spend",
  rateAsPercent: true,
  // Fuel surcharges do not earn.
  baseFareOnly: true,
  carrierLabel: "Fuel Surcharge",
  carrierHint: "Jeju Air's fuel surcharge. It does not earn J Points. Enter the fare after any coupon or promo code discount.",
  // Pre-paid bags and seats bought on Jeju Air's app or website earn 2%.
  addons: true,
  addonsRate: 0.02,
  addonsRateLabel: "pre-paid bags and seats",
  addonsLabel: "Pre-paid Bags and Seats",
  addonsHint: "Pre-paid bags and seats bought on Jeju Air's app or website earn 2% of their price. Fare bundles, items bought at the airport on the day of departure and items paid with J Points do not earn.",
  // Travel agency and other outside channel rates: base 2% plus the tier
  // bonus. Booking on Jeju Air's own channels raises the base to 5%.
  statuses: [
    { id: "silver", name: "Silver", rate: 0.02 },
    { id: "silverplus", name: "Silver+", rate: 0.025 },
    { id: "gold", name: "Gold", rate: 0.03 },
    { id: "vip", name: "VIP", rate: 0.07 }
  ],
  direct: {
    question: "Did you book on Jeju Air's website or app?",
    rate: 0.03
  },
  // Korean co-brand card, from Jeju Air's card benefits page:
  // https://www.jejuair.net/ko/event/payBenefit.do
  cardHint: "Card J Points are earned on the amount charged, on top of the flight J Points.",
  cards: [
    { id: "kb-jpoint", name: "Jeju Air J Point KB Kookmin Card", rate: 20 / 1200, rateText: "20 per ₩1,200 at Jeju Air (10 base + 10 bonus)", bank: "KB Kookmin Card (South Korea)" }
  ],
  note: "J Point earns a percentage of the air fare on Jeju Air flights. Booking on Jeju Air's website or app earns a base 5%, and booking through a travel agency or other outside channel earns a base 2%. Silver+ members add 0.5%, Gold members 1% and VIP members 5% on either channel, so a VIP booking direct earns 10%. Coupon discounts, fuel surcharges, airport fees and taxes do not earn. Pre-paid bags and seats bought on Jeju Air's app or website earn 2% of their price. Award tickets, charters, prize tickets, some special fares, gift tickets and codeshare or interline flights not on a Jeju Air (806) ticket earn nothing. The Jeju Air J Point KB Kookmin Card earns 10 J Points per ₩1,200 spent, plus 10 more per ₩1,200 at Jeju Air. Enter fares in Korean won."
};

module.exports = {
  id: "jejuair",
  // Month the earning rules were last checked against the source.
  reviewed: "2026-11",
  code: "7C",
  color: "#FF5000",
  source: "https://www.jejuair.net/ko/memberBenefit/refreshPoint/main.do",
  examples: [
    { name: "Jeju Air Silver, booked direct", input: { status: "silver", radios: { direct: "Yes" }, fields: { airfare: 200000, carrierFees: 30000 } }, expect: 10000 },
    { name: "Jeju Air VIP, travel agency", input: { status: "vip", radios: { direct: "No" }, fields: { airfare: 300000 } }, expect: 21000 },
    { name: "Jeju Air Gold, direct with bags and seats", input: { status: "gold", radios: { direct: "Yes" }, fields: { airfare: 100000, addons: 50000 } }, expect: 7000 }
  ],
  rules
};
