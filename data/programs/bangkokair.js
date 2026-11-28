/* Bangkok Airways (PG): FlyerBonus points on Bangkok Airways flights, from
   FlyerBonus' "Bangkok Airways" earning page and its points calculator
   (flyerbonus.bangkokair.com, supplied by the site owner as screenshots in
   November 2026):
   - 1 point per mile flown between the airports, times the booking class
     share: Blue Ribbon (J, C, D) 150%; Web Freedom (Y, M, K, N) and Web
     Saver (T, L, H) 100%; Web Promotion (Q, V, G, B) 50% and (R, P, A, O)
     10%.
   - A minimum per one-way sector by route zone and class (chart below).
     Bangkok to Koh Samui and Koh Samui to U-Tapao earn 500 in Q, V, G, B.
   - The calculator rounds to the nearest point (1,049 miles: J 1,574,
     Y 1,049, Q 525, R 105).
   Award tickets, classes X, S and Z, and charter flights earn nothing. */
const rules = {
  name: "Bangkok Airways | FlyerBonus",
  programName: "FlyerBonus",
  country: "TH",
  currency: "THB",
  unit: "points",
  method: "distance",
  zoneLabel: "Route",
  zoneHint: "Each route zone sets a minimum number of points per one-way flight.",
  zoneAfterFare: true,
  defaultZone: "dom",
  defaultFareType: "freedom",
  fareTypeLabel: "Booking Class",
  zones: [
    { id: "dom", name: "Thailand domestic" },
    { id: "samui", name: "Bangkok - Koh Samui or Koh Samui - U-Tapao" },
    { id: "z1", name: "Zone 1: Bangkok - Siem Reap, Phnom Penh or Luang Prabang; Koh Samui - Singapore" },
    { id: "z2", name: "Zone 2: Koh Samui - Hong Kong" },
    { id: "z3", name: "Zone 3: Bangkok - Maldives" }
  ],
  // Share of the miles flown, with the chart's minimum per zone.
  fareTypes: [
    { id: "ribbon", name: "Business: Blue Ribbon (J, C, D)", earn: [{ share: 1.5, min: 750 }, { share: 1.5, min: 750 }, { share: 1.5, min: 1125 }, { share: 1.5, min: 1500 }, { share: 1.5, min: 1875 }] },
    { id: "freedom", name: "Economy: Web Freedom (Y, M, K, N)", earn: [{ share: 1, min: 500 }, { share: 1, min: 500 }, { share: 1, min: 750 }, { share: 1, min: 1000 }, { share: 1, min: 1250 }] },
    { id: "saver", name: "Economy: Web Saver (T, L, H)", earn: [{ share: 1, min: 500 }, { share: 1, min: 500 }, { share: 1, min: 750 }, { share: 1, min: 1000 }, { share: 1, min: 1250 }] },
    { id: "promo", name: "Economy: Web Promotion (Q, V, G, B)", earn: [{ share: 0.5, min: 250 }, { share: 0.5, min: 500 }, { share: 0.5, min: 375 }, { share: 0.5, min: 500 }, { share: 0.5, min: 625 }] },
    { id: "promo-low", name: "Economy: Web Promotion (R, P, A, O)", earn: [{ share: 0.1, min: 50 }, { share: 0.1, min: 50 }, { share: 0.1, min: 75 }, { share: 0.1, min: 100 }, { share: 0.1, min: 125 }] }
  ],
  statuses: [
    { id: "member", name: "Member", multiplier: 1 }
  ],
  cards: null,
  note: "FlyerBonus earns 1 point per mile flown on Bangkok Airways, times the booking class share: 150% in Blue Ribbon (J, C, D), 100% in Web Freedom (Y, M, K, N) and Web Saver (T, L, H), 50% in Web Promotion (Q, V, G, B) and 10% in Web Promotion (R, P, A, O). Each one-way flight earns at least the chart's minimum for its zone, from 750 (Business) and 500 (Economy) within Thailand up to 1,875 and 1,250 to the Maldives. Bangkok to Koh Samui and Koh Samui to U-Tapao earn at least 500 in Q, V, G, B. Award tickets, classes X, S and Z, and charter flights earn nothing. The chart gives no bonus for Premier or Premier Plus members."
};

module.exports = {
  id: "bangkokair",
  // Month the earning rules were last checked against the source.
  reviewed: "2026-11",
  code: "PG",
  color: "#1B3E94",
  source: "https://flyerbonus.bangkokair.com/earn-points/eyJhaXJsaW5lIjoiYmFuZ2tvay1haXJ3YXlzIn0",
  examples: [
    // FlyerBonus calculator, 1,049 miles (zone 1): J 1,574, Y 1,049, Q 525, R 105.
    { name: "Bangkok Airways Blue Ribbon, 1,049 miles (calculator)", input: { status: "member", fare: "ribbon", zone: "z1", fields: { distance: 1049 } }, expect: 1574 },
    { name: "Bangkok Airways Web Promotion (Q), 1,049 miles (calculator)", input: { status: "member", fare: "promo", zone: "z1", fields: { distance: 1049 } }, expect: 525 },
    { name: "Bangkok Airways Web Promotion (R), 1,049 miles (calculator)", input: { status: "member", fare: "promo-low", zone: "z1", fields: { distance: 1049 } }, expect: 105 },
    // Bangkok - Koh Samui (about 300 miles) in Q: the 500 minimum.
    { name: "Bangkok Airways Bangkok - Koh Samui, Web Promotion (Q)", input: { status: "member", fare: "promo", zone: "samui", fields: { distance: 300 } }, expect: 500 }
  ],
  rules
};
