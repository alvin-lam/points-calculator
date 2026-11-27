/* Cebu Pacific (5J): Go Rewards points on Cebu Pacific and Cebgo flights,
   from the Go Rewards Help Center articles "How to earn Go Rewards points
   from Cebu Pacific?" (with its earn rate table) and "Earning of Go Rewards
   Points from Cebu Pacific FAQs", for flights flown from 22 October 2026,
   and the Go Rewards Terms and Conditions (updated 30 October 2026),
   clause 8.4: points are calculated to two decimal places, without
   rounding. The rate depends on the membership tier or card type of the
   Go Rewards number entered in the booking, and on the item:
   pesos per point        Regular fare  Promo fare  Core add-ons  Partner add-ons  Admin fee
   Classic                     80          160          80            160            80
   Go Rewards/GoTyme Debit     40          160          40            160            80
   Black, co-brand credit      20           40          20             40            20
   The base fare includes the fare and fuel surcharge; taxes do not earn. */
const rules = {
  name: "Cebu Pacific | Go Rewards",
  programName: "Go Rewards",
  country: "PH",
  currency: "PHP",
  unit: "Go Rewards points",
  method: "spend",
  decimals: true,
  // Go Rewards counts two decimals without rounding (T&C 8.4).
  decimalsFloor: true,
  addons: true,
  addonsLabel: "Bags, Seats and Meals",
  addonsHint: "Core add-ons bought from Cebu Pacific. They earn at the regular fare rate for your card type, even on a promo fare. Insurance, transfers and other partner add-ons are not counted here.",
  addonsRateLabel: "bags, seats and meals",
  ratePer: 80,
  carrierLabel: "Fuel Surcharge",
  carrierHint: "Cebu Pacific's fuel surcharge. It earns like the base fare. Taxes, aviation charges, customs and immigration fees do not.",
  fareTypeLabel: "Fare (Regular or Promo)",
  defaultFareType: "regular",
  fareTypes: [
    { id: "regular", name: "Regular base fare" },
    { id: "promo", name: "Promo base fare" }
  ],
  // Pesos per point by the card type of the Go Rewards number entered in
  // the booking (Go Rewards earn rate table, from 22 October 2026).
  statuses: [
    { id: "classic", name: "Classic", rates: { regular: 1 / 80, promo: 1 / 160 }, addonsRate: 1 / 80 },
    { id: "debit", name: "Go Rewards or GoTyme Debit Card", rates: { regular: 1 / 40, promo: 1 / 160 }, addonsRate: 1 / 40 },
    { id: "black", name: "Black, or UnionBank co-brand credit card", rates: { regular: 1 / 20, promo: 1 / 40 }, addonsRate: 1 / 20 }
  ],
  note: "Go Rewards points depend on the card type of the Go Rewards number entered in the booking. Classic members earn 1 point per ₱80 of the regular base fare and 1 per ₱160 of a promo base fare. The Go Rewards Debit Card (UnionBank) and GoTyme Debit Card earn 1 per ₱40 and 1 per ₱160. Black members and holders of the UnionBank Cebu Pacific or Go Rewards Gold and Platinum Visa credit cards earn 1 per ₱20 and 1 per ₱40, if they enter that card's Go Rewards number. The base fare includes the fuel surcharge; taxes do not earn. Points are counted to two decimals. Go Rewards does not say which fares count as promo fares. Core add-ons (bags, seats, meals) earn at the regular fare rate, even on a promo fare. Partner add-ons (insurance, transfers) earn at the promo fare rate, and the admin fee at 1 per ₱80 (Classic and debit) or 1 per ₱20 (Black and credit card); the calculator does not count these two items. Points earned with the co-brand cards on the amount charged are not shown, since UnionBank's card rates could not be confirmed. A double points promo applies to bookings made on Cebu Pacific's website or app from 3 November to 31 December 2026 and is not included. Enter fares in Philippine pesos."
};

module.exports = {
  id: "cebupacific",
  // Month the earning rules were last checked against the source.
  reviewed: "2026-11",
  code: "5J",
  color: "#1875BB",
  source: "https://helpcenter.gorewards.com.ph/hc/en-us/articles/4409934680857-How-to-earn-Go-Rewards-points-from-Cebu-Pacific",
  examples: [
    // Classic, regular fare ₱2,000 + ₱400 fuel surcharge: 2,400 / 80 = 30.
    { name: "Cebu Pacific Classic regular fare", input: { status: "classic", fare: "regular", fields: { airfare: 2000, carrierFees: 400 } }, expect: 30 },
    // Debit card, promo fare ₱1,000 + ₱200 fuel surcharge: 1,200 / 160 = 7.5.
    { name: "Cebu Pacific debit card promo fare", input: { status: "debit", fare: "promo", fields: { airfare: 1000, carrierFees: 200 } }, expect: 7.5 },
    // Black, regular fare ₱1,000 + ₱333 fuel surcharge: 1,333 / 20 = 66.65.
    { name: "Cebu Pacific Black regular fare", input: { status: "black", fare: "regular", fields: { airfare: 1000, carrierFees: 333 } }, expect: 66.65 },
    // 1,234 / 80 = 15.425, cut to 15.42 (no rounding). Bags 500 / 80 = 6.25.
    { name: "Cebu Pacific Classic promo fare with bags", input: { status: "classic", fare: "promo", fields: { airfare: 2468, addons: 500 } }, expect: 21.67 }
  ],
  rules
};
