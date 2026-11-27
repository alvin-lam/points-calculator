/* El Al (LY): Matmid points per US dollar, from El Al's "Earn Points Like
   Never Before!" page and its Frequent Flyer Program regulations (supplied
   by the site owner, November 2026). Points are earned on the ticket price,
   excluding taxes, levies, fees, surcharges and travel agent commissions,
   and on baggage and SPACE seats bought with the flight. The rate is set by
   status at the time of flight. */

const rules = {
  name: "El Al | Matmid",
  programName: "Matmid",
  country: "IL",
  currency: "USD",
  unit: "points",
  method: "spend",
  // Surcharges do not earn.
  noCarrier: true,
  addons: true,
  addonsLabel: "Baggage and SPACE seats",
  addonsHint: "Checked baggage and SPACE seats bought with the flight. They earn points like the fare.",
  // "Rules of rounding": to the nearest point.
  roundNearest: true,
  // The fare sets the cabin and whether it is a FLEX fare (+20% points).
  defaultFareType: "economy",
  fareTypeLabel: "Cabin and fare",
  fareTypes: [
    { id: "economy", name: "Economy", rate: 1 },
    { id: "economy-flex", name: "Economy FLEX fare", rate: 1, bonusPct: 0.2, bonusName: "FLEX fare bonus" },
    { id: "premium", name: "Premium", rate: 1, premium: true },
    { id: "premium-flex", name: "Premium FLEX fare", rate: 1, premium: true, bonusPct: 0.2, bonusName: "FLEX fare bonus" },
    { id: "business", name: "Business", rate: 1, premium: true },
    { id: "business-flex", name: "Business FLEX fare", rate: 1, premium: true, bonusPct: 0.2, bonusName: "FLEX fare bonus" }
  ],
  statuses: [
    { id: "matmid", name: "Matmid", multiplier: 6 },
    { id: "silver", name: "Silver", multiplier: 8 },
    { id: "gold", name: "Gold", multiplier: 9 },
    { id: "platinum", name: "Platinum", multiplier: 11 },
    { id: "top-platinum", name: "Top Platinum", multiplier: 12 }
  ],
  // FLY CARD (Isracard): Matmid points per shekel charged, plus a bonus on
  // the flight points however you pay (10% for FLY CARD and FLY CARD
  // PREMIUM SELECT, 20% for FLY CARD PREMIUM, from El Al's points page).
  // Points per shekel, from Isracard's FLY CARD page and its April 2026
  // terms: FLY CARD 1 per NIS 5 (shekel or foreign currency), FLY CARD
  // PREMIUM SELECT 1 per NIS 4.50 (both), FLY CARD PREMIUM and PREMIUM
  // American Express 1 per NIS 4 in shekels or 1 per NIS 3 in a foreign
  // currency. Excluded categories (government, insurance and so on) earn
  // half; airline tickets are not among them.
  cardQuestion: "Do you hold an EL AL FLY CARD?",
  cardHint: "FLY CARD holders earn bonus points on eligible flights however they pay, plus points on the amount charged to the card.",
  cards: [
    { id: "flycard", name: "FLY CARD (+10% on flights)", rate: 1 / 5, per: 5, currency: "ILS", flightBonusPct: 0.1, bonusName: "FLY CARD bonus", bank: "Isracard (Israel)" },
    { id: "flycard-select", name: "FLY CARD PREMIUM SELECT (+10% on flights)", rate: 1 / 4.5, per: 4.5, rateText: "1 per ₪4.50", currency: "ILS", flightBonusPct: 0.1, bonusName: "FLY CARD PREMIUM SELECT bonus", bank: "Isracard (Israel)" },
    { id: "flycard-premium", name: "FLY CARD PREMIUM, charged in shekels (+20% on flights)", rate: 1 / 4, per: 4, currency: "ILS", flightBonusPct: 0.2, bonusName: "FLY CARD PREMIUM bonus", bank: "Isracard (Israel)" },
    { id: "flycard-premium-fx", name: "FLY CARD PREMIUM, charged in a foreign currency (+20% on flights)", rate: 1 / 3, per: 3, currency: "ILS", flightBonusPct: 0.2, bonusName: "FLY CARD PREMIUM bonus", bank: "Isracard (Israel)" }
  ],
  // Bonus points on eligible flights, each on the base points. EXECUTIVE
  // Member Circle eligibility and bonus: El Al's EXECUTIVE Member Circle
  // page (supplied by the site owner, November 2026).
  extras: [
    { id: "executive", premiumOnly: true, label: "Are you an EL AL EXECUTIVE Circle member?", hint: "For Silver, Gold, Platinum and Top Platinum members living outside Israel, and Matmid members abroad who earned over 2,000 Diamonds or converted at least 5,000 points from non-Israeli credit cards within 12 months. They earn 20% more points on El Al flights in Premium and Business.",
      options: [
        { id: "no", name: "No" },
        { id: "yes", name: "Yes (+20% in Premium and Business)", pct: 0.2, premiumOnly: true, bonusName: "EXECUTIVE Circle bonus", skipNote: "Premium and Business only" }
      ] }
  ],
  note: "Matmid earns points per US dollar of the ticket price, excluding taxes, levies, fees, surcharges and travel agent commissions: 6 for Matmid, 8 for Silver, 9 for Gold, 11 for Platinum and 12 for Top Platinum, by your status at the time of the flight. Baggage and SPACE seats bought with the flight earn too. Fares in other currencies are converted to US dollars at the ticketing date. Tickets with connecting flights, package or wholesale tickets, and Sundor flights earn by destination and booking class instead, which this estimate does not cover. Bonuses are added to the base points and rounded to the nearest point: FLEX fares earn 20% more, FLY CARD and FLY CARD PREMIUM SELECT holders 10% more, FLY CARD PREMIUM holders 20% more, and EXECUTIVE Member Circle members, for elite members living outside Israel, 20% more in Premium and Business. This estimate assumes the bonuses add together. Paying with a FLY CARD also earns points on the amount charged, per Isracard: 1 per NIS 5 (FLY CARD), NIS 4.50 (FLY CARD PREMIUM SELECT), or NIS 4 in shekels and NIS 3 in a foreign currency (FLY CARD PREMIUM, including the American Express version). Enter the amount in shekels from your card statement. Points count toward awards only; status is earned with Diamonds."
};

module.exports = {
  id: "elal",
  // Month the earning rules were last checked against the source.
  reviewed: "2026-11",
  code: "LY",
  color: "#1B358F",
  source: "https://www.elal.com/eng/frequentflyer/myffp/loyalty_points_new",
  rules
};
