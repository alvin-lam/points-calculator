/* Aegean Miles+Bonus on Aegean and Olympic Air flights, by fare family and
   booking class (Aegean's mile accrual charts and miles calculator data).
   Domestic flights within Greece earn a fixed number of miles per flight.
   International flights, Cyprus included, earn a share of Aegean's route
   distance with a minimum per flight: miles = the larger of the minimum
   and distance x share. Booking classes group differently on the two
   charts, so each route shows its own fare list. Status adds extra award
   miles (Aegean's Tiers & Benefits pages). */
// Domestic booking-class groups.
const DH = "Y, M, B, W";
const DM = "L, V, O, G, Q, K, J, S, E, H, F";
const DL = "U, P, T";
// International booking-class groups.
const IH = "Y, B, M, H, W";
const IM = "L, V, O, G, Q, K, J, S, F";
const IL = "U, T, P, E";
const dom = ["domestic"], intl = ["international"];
const rules = {
  name: "Aegean Airlines | Miles+Bonus",
  programName: "Miles+Bonus",
  country: "GR",
  currency: "EUR",
  unit: "miles",
  method: "distance",
  zoneLabel: "Route",
  zoneHint: "Domestic flights earn a fixed amount per flight. International flights, including Cyprus, earn a share of the distance with a minimum per flight.",
  // Tier bonuses apply to the fixed miles too.
  bonusOnFixed: true,
  zones: [
    { id: "domestic", name: "Domestic (within Greece)", fixed: true },
    { id: "international", name: "International (including Cyprus)" }
  ],
  defaultFareType: "flex-dm",
  zoneDefaultFare: { domestic: "flex-dm", international: "flex-im" },
  // Earn lists follow the zones order: [domestic, international]. Classes
  // I, X, N and R earn nothing.
  fareTypes: [
    { id: "business", name: "Business (C, D, Z, A)", earn: [{ fixed: 1200 }, { share: 2.5, min: 2500 }] },
    { id: "business-basic", name: "Business Basic (C, D, Z, A)", earn: [{ fixed: 1100 }, { share: 2.2, min: 2200 }] },
    { id: "comfort-dh", zones: dom, name: "Comfort Flex (" + DH + ")", earn: [{ fixed: 1000 }, null] },
    { id: "comfort-dm", zones: dom, name: "Comfort Flex (" + DM + ")", earn: [{ fixed: 900 }, null] },
    { id: "comfort-dl", zones: dom, name: "Comfort Flex (" + DL + ")", earn: [{ fixed: 500 }, null] },
    { id: "flex-dh", zones: dom, name: "Flex or Family (" + DH + ")", earn: [{ fixed: 800 }, null] },
    { id: "flex-dm", zones: dom, name: "Flex or Family (" + DM + ")", earn: [{ fixed: 600 }, null] },
    { id: "flex-dl", zones: dom, name: "Flex or Family (" + DL + ")", earn: [{ fixed: 300 }, null] },
    { id: "light-dh", zones: dom, name: "Light (" + DH + ")", earn: [{ fixed: 500 }, null] },
    { id: "light-dm", zones: dom, name: "Light (" + DM + ")", earn: [{ fixed: 250 }, null] },
    { id: "light-dl", zones: dom, name: "Light (" + DL + ")", earn: [{ fixed: 100 }, null] },
    { id: "comfort-ih", zones: intl, name: "Comfort Flex (" + IH + ")", earn: [null, { share: 2, min: 1800 }] },
    { id: "comfort-im", zones: intl, name: "Comfort Flex (" + IM + ")", earn: [null, { share: 1.3, min: 1400 }] },
    { id: "comfort-il", zones: intl, name: "Comfort Flex (" + IL + ")", earn: [null, { share: 1, min: 1000 }] },
    { id: "flex-ih", zones: intl, name: "Flex or Family (" + IH + ")", earn: [null, { share: 1.5, min: 1200 }] },
    { id: "flex-im", zones: intl, name: "Flex or Family (" + IM + ")", earn: [null, { share: 1, min: 1000 }] },
    { id: "flex-il", zones: intl, name: "Flex or Family (" + IL + ")", earn: [null, { share: 0.75, min: 600 }] },
    { id: "light-ih", zones: intl, name: "Light (" + IH + ")", earn: [null, { share: 0.75, min: 600 }] },
    { id: "light-im", zones: intl, name: "Light (" + IM + ")", earn: [null, { share: 0.5, min: 400 }] },
    { id: "light-il", zones: intl, name: "Light (" + IL + ")", earn: [null, { share: 0.3, min: 200 }] }
  ],
  statuses: [
    // Extra award miles on Aegean and Olympic Air flights, by tier.
    { id: "blue", name: "Blue", multiplier: 1 },
    { id: "silver", name: "Silver", multiplier: 1.1 },
    { id: "gold", name: "Gold", multiplier: 1.2 },
    { id: "platinum", name: "Platinum", multiplier: 1.3 }
  ],
  note: "Miles+Bonus awards a fixed number of miles per domestic flight, from 100 on Light (U, P, T) to 1,200 in Business. International flights, including Cyprus, earn a share of the distance with a minimum per flight: Business 250% (minimum 2,500), Business Basic 220% (2,200), Comfort Flex 100% to 200% (1,000 to 1,800), Flex or Family 75% to 150% (600 to 1,200) and Light 30% to 75% (200 to 600), by booking class. Aegean uses its own route distances, which can be up to about 1% shorter than the airport-to-airport distance shown here. Silver, Gold and Platinum add 10%, 20% and 30%. Booking classes I, X, N and R, and award, discounted and charter tickets earn nothing. Registered Together ForFamilies accounts earn 20% more."
};

module.exports = {
  id: "aegean",
  // Month the earning rules were last checked against the source.
  reviewed: "2026-11",
  code: "A3",
  color: "#0B2E59",
  source: "https://en.aegeanair.com/milesandbonus/partners-v1/airlines/aegean/",
  // From Aegean's domestic earning table.
  examples: [
    { name: "Aegean domestic Business", input: { fare: "business", zone: "domestic" }, expect: 1200 },
    { name: "Aegean domestic Comfort Flex (Y), Gold", input: { fare: "comfort-dh", status: "gold", zone: "domestic" }, expect: 1200 },
    { name: "Aegean domestic Light (U, P, T)", input: { fare: "light-dl", zone: "domestic" }, expect: 100 },
    // International, from Aegean's calculator data (Athens-London 1,495 miles).
    { name: "Aegean international Business, Athens-London", input: { fare: "business", zone: "international", fields: { distance: 1495 } }, expect: 3738 },
    { name: "Aegean international Light (U, T, P, E), Athens-Larnaca minimum", input: { fare: "light-il", zone: "international", fields: { distance: 579 } }, expect: 200 }
  ],
  rules
};
