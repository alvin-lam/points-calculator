/* Royal Jordanian (RJ): Royal Club Award Miles as a share of the distance,
   by booking class and tier, from Royal Jordanian's "Ways to earn" page.
   Each tier column is 25 percentage points above the one before, so the
   tier bonus is added as a share of the distance. Tickets discounted 50%
   or more earn nothing. */
const rules = {
  name: "Royal Jordanian | Royal Club",
  programName: "Royal Club",
  country: "JO",
  currency: "JOD",
  unit: "miles",
  method: "distance",
  defaultFareType: "y-lvsnq",
  fareTypes: [
    { id: "j", name: "Crown (J)", rate: 2 },
    { id: "cd", name: "Crown (C, D)", rate: 1.75 },
    { id: "iz", name: "Crown (I, Z)", rate: 1.5 },
    { id: "w-prem", name: "Premium (W)", rate: 1.25 },
    { id: "y-ybhkm", name: "Economy (Y, B, H, K, M)", rate: 1 },
    { id: "y-lvsnq", name: "Economy (L, V, S, N, Q)", rate: 0.75 },
    { id: "y-opw", name: "Economy (O, P, W)", rate: 0.5 },
    { id: "y-gr", name: "Economy (G, R)", rate: 0.25 }
  ],
  // Bronze Sunbird earns the base column; each higher tier adds 25% of the
  // distance (Economy G and R: 25%, 50%, 75% and 100%).
  statuses: [
    { id: "bronze", name: "Bronze Sunbird", bonus: 0 },
    { id: "silver", name: "Silver Jay", bonus: 0.25 },
    { id: "gold", name: "Gold Sparrow", bonus: 0.5 },
    { id: "platinum", name: "Platinum Hawk", bonus: 0.75 }
  ],
  // Jordanian co-brand cards: 1 mile per Jordanian dinar spent, with no
  // extra on Royal Jordanian tickets (Royal Club partners page).
  // https://www.rj.com/en/royal-club/our-partners/partners?tab=1
  cards: [
    { id: "arabbank", name: "Arab Bank Royal Jordanian Visa Platinum", rate: 1, bank: "Arab Bank (Jordan)" },
    { id: "capital-debit", name: "Capital Bank Royal Jordanian Visa Signature Debit", rate: 1, kind: "debit", bank: "Capital Bank (Jordan)" },
    { id: "ajib-debit", name: "AJIB Royal Jordanian Debit Mastercard", rate: 1, kind: "debit", bank: "AJIB (Jordan)" }
  ],
  note: "Royal Club earns a share of the distance by booking class and tier: Bronze Sunbird earns 25% (G, R) to 200% (Crown J), and Silver Jay, Gold Sparrow and Platinum Hawk add 25%, 50% and 75% of the distance. Royal Jordanian lists W under both Economy (50%) and Premium (125%). Only flights marketed and operated by Royal Jordanian count here, and tickets discounted 50% or more earn nothing. The Jordanian co-brand cards earn 1 mile per dinar charged."
};

module.exports = {
  id: "rj",
  // Month the earning rules were last checked against the source.
  reviewed: "2026-11",
  code: "RJ",
  color: "#A8854A",
  source: "https://www.rj.com/en/royal-club/earn-and-buy/ways-to-earn",
  examples: [
    { name: "Royal Jordanian Crown (J), Bronze", input: { fare: "j", fields: { distance: 1000 } }, expect: 2000 },
    { name: "Royal Jordanian Economy (G), Platinum Hawk", input: { fare: "y-gr", status: "platinum", fields: { distance: 1000 } }, expect: 1000 }
  ],
  rules
};
