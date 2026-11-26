/* SAS EuroBonus: a fixed number of points per SAS flight, set by route
   region and ticket type (booking class). Silver, Gold, and Diamond add
   25%, 50%, and 75% to Bonus points. Values from SAS's published tables. */

const rules = {
  name: "SAS Scandinavian Airlines | EuroBonus",
  country: "SCAN",
  unit: "points",
  method: "zone",
  zoneLabel: "Route",
  zoneHint: "SAS pays a fixed amount per one-way flight by route region and ticket type.",
  defaultFareType: "std-high",
  fareTypes: [
    { id: "light", name: "Light" },
    { id: "std-low", name: "Standard (G, K, L, N, O, R, T, U, V); long-haul O, T" },
    { id: "std-high", name: "Standard (E, H, M, Q, W); long-haul other Economy classes" },
    { id: "flex-low", name: "Flex (G, K, L, N, O, R, T, U, V); long-haul O, T" },
    { id: "flex-high", name: "Flex (E, H, M, Q, W); long-haul other Economy classes" },
    { id: "prem", name: "Premium or Business (A, B, J, P, S, Y); long-haul Premium (A, B, P, S, Y)" },
    { id: "prem-cdz", name: "Premium or Business (C, D, Z); long-haul Business (C, D, J, Z)" },
    { id: "pflex-ap", name: "Premium Flex or Business Flex (A, P); long-haul Premium Flex" },
    { id: "pflex-bjsy", name: "Premium Flex or Business Flex (B, J, S, Y); long-haul Premium Flex" },
    { id: "pflex-cdz", name: "Premium Flex or Business Flex (C, D, Z); long-haul Business Flex (C, D, J, Z)" }
  ],
  // Each zone's points list follows the fareTypes order.
  zones: [
    { id: "dom", name: "Domestic, within Denmark, Norway, or Sweden", points: [100, 250, 500, 600, 700, 700, 850, 1000, 1000, 1200] },
    { id: "scan", name: "Within Scandinavia (between Denmark, Norway, and Sweden)", points: [100, 250, 500, 600, 700, 1000, 1200, 1500, 1500, 2000] },
    { id: "eu", name: "Within Europe", points: [100, 500, 1000, 1200, 1400, 1500, 1700, 2000, 2500, 3000] },
    { id: "lh1", name: "Long-haul: Boston, New York, Toronto", points: [200, 400, 1600, 1000, 4000, 4000, 6000, 5000, 5000, 9000] },
    { id: "lh2", name: "Long-haul: Atlanta, Beijing, Chicago, Mumbai, Washington", points: [200, 500, 2000, 1250, 5000, 5000, 7500, 7000, 7000, 10000] },
    { id: "lh3", name: "Long-haul: Bangkok, Los Angeles, Miami, San Francisco, Seattle, Seoul, Tokyo", points: [240, 600, 2400, 1500, 6000, 6000, 9000, 7500, 7500, 12000] }
  ],
  statuses: [
    { id: "member", name: "EuroBonus Member", bonus: 0 },
    { id: "silver", name: "EuroBonus Silver", bonus: 0.25 },
    { id: "gold", name: "EuroBonus Gold", bonus: 0.5 },
    { id: "diamond", name: "EuroBonus Diamond", bonus: 0.75 }
  ],
  // SAS Upgrade: a won online bid paid in cash adds points by route.
  upgradeBonus: {
    label: "Did you win an SAS Upgrade bid?",
    hint: "Online bids paid in cash only. Upgrades bought at the gate earn nothing extra.",
    options: [
      { id: "none", name: "No upgrade" },
      { id: "y-pe", name: "Economy to Premium Economy", points: { dom: 250, lh1: 1500, lh2: 1500, lh3: 1500 } },
      { id: "y-j", name: "Economy to Business", points: { scan: 500, eu: 500, lh1: 3000, lh2: 3000, lh3: 3000 } },
      { id: "pe-j", name: "Premium Economy to Business", points: { lh1: 1500, lh2: 1500, lh3: 1500 } }
    ]
  },
  note: "EuroBonus pays a fixed number of points per one-way SAS flight, set by the route region and ticket type. Silver, Gold, and Diamond earn 25%, 50%, and 75% more Bonus points. Level points stay at the base amount. A won SAS Upgrade bid paid in cash adds 250 to 3,000 points by route. SK flights operated by SkyTeam partners earn by distance instead and are not covered here."
};

module.exports = {
  id: "sas",
  // Month the earning rules were last checked against the source.
  reviewed: "2026-11",
  code: "SK",
  color: "#0002BE",
  source: "https://www.flysas.com/us-en/eurobonus/partners/airlines/scandinavian-airlines/",
  // Published examples. The browser tests check each one.
  examples: [
    // SAS EuroBonus (SAS's own table).
    { name: "SAS Standard within Europe", input: { status: "member", fare: "std-high", zone: "eu" }, expect: 1000 },
    { name: "SAS Business Flex within Europe, Gold", input: { status: "gold", fare: "pflex-cdz", zone: "eu" }, expect: 4500 },
    { name: "SAS with an Economy to Business bid", input: { status: "member", fare: "std-high", zone: "eu", upgrade: "y-j" }, expect: 1500 }
  ],
  rules
};
