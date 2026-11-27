/* EgyptAir (MS): EgyptAir Plus miles on EgyptAir flights, from the program's
   own "Earning Miles Policy" page (https://www.egyptairplus.com/earning-miles-policy)
   and its Earn Miles Calculator chart. International flights earn a share of
   the distance flown by booking class, with a minimum per flight. Domestic
   flights within Egypt earn a fixed amount per flight, equal to the minimum
   in the same chart ("Minimum Miles international & Fixed Domestic").
   P class earns 75% of the distance on international flights (calculator
   chart note); no minimum is published for it. Classes X, I, O, R, N and F
   earn nothing. Tier bonuses (extra award miles on every flight operated by
   EgyptAir) come from the Membership Levels page
   (https://www.egyptairplus.com/membership-levels): Silver 20%, Gold 30%,
   Elite 35%, Platinum 40%. */
const dom = ["domestic"], intl = ["international"];
const rules = {
  name: "EgyptAir | EgyptAir Plus",
  programName: "EgyptAir Plus",
  country: "EG",
  currency: "USD",
  unit: "miles",
  method: "distance",
  zoneLabel: "Route",
  zoneHint: "Domestic flights within Egypt earn a fixed amount per flight. International flights earn a share of the distance with a minimum per flight.",
  // Tier bonuses apply to every flight operated by EgyptAir, domestic ones included.
  bonusOnFixed: true,
  zones: [
    { id: "domestic", name: "Domestic (within Egypt)", fixed: true },
    { id: "international", name: "International" }
  ],
  defaultFareType: "y-mid",
  // Earn lists follow the zones order: [domestic, international].
  fareTypes: [
    { id: "business", name: "Business (C, D, J, Z)", earn: [{ fixed: 1000 }, { share: 2, min: 1000 }] },
    { id: "premium", name: "Premium Economy (A)", earn: [{ fixed: 900 }, { share: 1.75, min: 900 }] },
    { id: "y-full", name: "Economy (Y, B)", earn: [{ fixed: 750 }, { share: 1.5, min: 750 }] },
    { id: "y-mid", name: "Economy (M, Q, H, K)", earn: [{ fixed: 500 }, { share: 1, min: 500 }] },
    { id: "y-low", name: "Economy (V, L)", earn: [{ fixed: 250 }, { share: 0.5, min: 250 }] },
    { id: "y-disc", name: "Economy (E, G, W, T, S)", earn: [{ fixed: 150 }, { share: 0.25, min: 150 }] },
    { id: "p", zones: intl, name: "Economy (P)", earn: [null, 0.75] }
  ],
  statuses: [
    { id: "blue", name: "Blue", multiplier: 1 },
    { id: "silver", name: "Silver", multiplier: 1.2 },
    { id: "gold", name: "Gold", multiplier: 1.3 },
    { id: "elite", name: "Elite", multiplier: 1.35 },
    { id: "platinum", name: "Platinum", multiplier: 1.4 }
  ],
  note: "EgyptAir Plus earns a share of the distance on international EgyptAir flights, with a minimum per flight: Business (C, D, J, Z) 200% (minimum 1,000), Premium Economy (A) 175% (900), Economy Y and B 150% (750), M, Q, H and K 100% (500), V and L 50% (250), and E, G, W, T and S 25% (150). P class earns 75% on international flights, and EgyptAir Plus publishes no minimum for it. Domestic flights within Egypt earn the minimum as a fixed amount per flight. Silver, Gold, Elite and Platinum members get 20%, 30%, 35% and 40% extra award miles on flights operated by EgyptAir. Classes X, I, O, R, N and F, award and upgrade tickets, discounted tickets (AD, ID, DG, DM and OD) and infant tickets earn nothing. Star Alliance partners earn by their own charts. The CIB EGYPTAIR Mileseverywhere cards are left out because EgyptAir Plus and CIB publish different earning rates for them."
};

module.exports = {
  id: "egyptair",
  // Month the earning rules were last checked against the source.
  reviewed: "2026-11",
  code: "MS",
  color: "#1B2C58",
  source: "https://www.egyptairplus.com/earning-miles-policy",
  // Worked from the EgyptAir Plus earning chart and tier bonuses.
  examples: [
    { name: "EgyptAir international Business, Gold, 2,200 miles", input: { fare: "business", status: "gold", zone: "international", fields: { distance: 2200 } }, expect: 5720 },
    { name: "EgyptAir international Economy S, 300 miles (minimum)", input: { fare: "y-disc", zone: "international", fields: { distance: 300 } }, expect: 150 },
    { name: "EgyptAir domestic Economy Y, Silver", input: { fare: "y-full", status: "silver", zone: "domestic" }, expect: 900 }
  ],
  rules
};
