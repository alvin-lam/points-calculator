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
  statuses: [
    { id: "matmid", name: "Matmid", rate: 6 },
    { id: "silver", name: "Silver", rate: 8 },
    { id: "gold", name: "Gold", rate: 9 },
    { id: "platinum", name: "Platinum", rate: 11 },
    { id: "top-platinum", name: "Top Platinum", rate: 12 }
  ],
  note: "Matmid earns points per US dollar of the ticket price, excluding taxes, levies, fees, surcharges and travel agent commissions: 6 for Matmid, 8 for Silver, 9 for Gold, 11 for Platinum and 12 for Top Platinum, by your status at the time of the flight. Baggage and SPACE seats bought with the flight earn too. Fares in other currencies are converted to US dollars at the ticketing date. Tickets with connecting flights, package or wholesale tickets, and Sundor flights earn by destination and booking class instead, which this estimate does not cover. FLY CARD PREMIUM SELECT and FLY CARD PREMIUM holders earn 10% and 20% more points on flights; those and other bonuses are not included. Points count toward awards only; status is earned with Diamonds."
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
