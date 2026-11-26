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
  // Bonus points on eligible flights, each on the base points.
  extras: [
    { id: "flycard", label: "Do you hold a FLY CARD?", hint: "FLY CARD holders earn bonus points on eligible flights, however they pay.",
      options: [
        { id: "none", name: "No" },
        { id: "flycard", name: "FLY CARD or FLY CARD PREMIUM SELECT (+10%)", pct: 0.1, bonusName: "FLY CARD bonus" },
        { id: "premium", name: "FLY CARD PREMIUM (+20%)", pct: 0.2, bonusName: "FLY CARD PREMIUM bonus" }
      ] },
    { id: "executive", label: "Are you an EL AL EXECUTIVE Circle member?", hint: "EXECUTIVE Circle members earn 20% more points on El Al flights in Premium and Business. Most members can answer No.",
      options: [
        { id: "no", name: "No" },
        { id: "yes", name: "Yes (+20% in Premium and Business)", pct: 0.2, premiumOnly: true, bonusName: "EXECUTIVE Circle bonus" }
      ] }
  ],
  note: "Matmid earns points per US dollar of the ticket price, excluding taxes, levies, fees, surcharges and travel agent commissions: 6 for Matmid, 8 for Silver, 9 for Gold, 11 for Platinum and 12 for Top Platinum, by your status at the time of the flight. Baggage and SPACE seats bought with the flight earn too. Fares in other currencies are converted to US dollars at the ticketing date. Tickets with connecting flights, package or wholesale tickets, and Sundor flights earn by destination and booking class instead, which this estimate does not cover. Bonuses are added to the base points and rounded to the nearest point: FLEX fares earn 20% more, FLY CARD and FLY CARD PREMIUM SELECT holders 10% more, FLY CARD PREMIUM holders 20% more, and EXECUTIVE Circle members 20% more in Premium and Business. This estimate assumes the bonuses add together. Points count toward awards only; status is earned with Diamonds."
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
