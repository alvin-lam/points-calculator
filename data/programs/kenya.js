/* Kenya Airways (KQ): Asante Rewards points on Kenya Airways-operated
   flights, from the Reward Points Chart on Asante Rewards' "Earn" page
   (asante.kenya-airways.com/pages/earn, November 2026):
   - Fixed base points per flight by region to and from Kenya (and for
     13 fifth-freedom routes), by fare: Business Super Flex (J, C) 200%,
     Flex (I, D) 150% and Lite (Z) 100%; Economy Super Flex (Y, B) 125%,
     Flex (M, U, K, H) 100%, Standard (L, Q, T, E, N) 75% and Best Buy
     (V, R, G, W) 50%.
   - Tier bonus on the base points: Silver 50%, Gold 75%, Platinum 100%
     (official example: Nairobi to London, Economy Flex, Ruby 5,000,
     Silver 7,500, Gold 8,750, Platinum 10,000).
   - Minimum 250 points per flight.
   Travel agency rebated and staff tickets do not earn. */
const rules = {
  name: "Kenya Airways | Asante Rewards",
  programName: "Asante Rewards",
  country: "KE",
  currency: "KES",
  unit: "points",
  method: "zone",
  zoneLabel: "Route",
  zoneHint: "Kenya Airways sets fixed points by region for flights to and from Kenya, and for each fifth-freedom route.",
  zoneAfterFare: true,
  defaultFareType: "y-flex",
  fareTypeLabel: "Fare",
  // The zones' points follow this order.
  fareTypes: [
    { id: "j-superflex", name: "Business Super Flex (J, C)" },
    { id: "j-flex", name: "Business Flex (I, D)" },
    { id: "j-lite", name: "Business Lite (Z)" },
    { id: "y-superflex", name: "Economy Super Flex (Y, B)" },
    { id: "y-flex", name: "Economy Flex (M, U, K, H)" },
    { id: "y-standard", name: "Economy Standard (L, Q, T, E, N)" },
    { id: "y-bestbuy", name: "Economy Best Buy (V, R, G, W)" }
  ],
  defaultZone: "europe",
  zones: [
    { id: "domestic", name: "Domestic (within Kenya)", points: [1000, 750, 500, 625, 500, 375, 250] },
    { id: "eac", name: "Tanzania, Uganda, Rwanda or Burundi", points: [1200, 900, 600, 750, 600, 450, 300] },
    { id: "horn", name: "Comoros, Mayotte, Ethiopia, Sudan or South Sudan", points: [1600, 1200, 800, 1000, 800, 600, 400] },
    { id: "south1", name: "Seychelles, Malawi, Zambia or Zimbabwe", points: [2200, 1650, 1100, 1375, 1100, 825, 550] },
    { id: "central", name: "Madagascar, Congo, DR Congo or Central African Republic", points: [3000, 2250, 1500, 1875, 1500, 1125, 750] },
    { id: "south2", name: "South Africa, Mauritius or Cameroon", points: [4000, 3000, 2000, 2500, 2000, 1500, 1000] },
    { id: "west1", name: "Nigeria, Gabon, Ghana or Ivory Coast", points: [5000, 3750, 2500, 3125, 2500, 1875, 1250] },
    { id: "west2", name: "Senegal, Liberia or Sierra Leone", points: [8000, 6000, 4000, 5000, 4000, 3000, 2000] },
    { id: "me", name: "Middle East", points: [6000, 4500, 3000, 3750, 3000, 2250, 1500] },
    { id: "india", name: "India", points: [7000, 5250, 3500, 4375, 3500, 2625, 1750] },
    { id: "europe", name: "Europe", points: [10000, 7500, 5000, 6250, 5000, 3750, 2500] },
    { id: "fareast", name: "Far East", points: [13000, 9750, 6500, 8125, 6500, 4875, 3250] },
    { id: "usa", name: "USA", points: [16000, 12000, 8000, 10000, 8000, 6000, 4000] },
    { id: "acc-fna", name: "5th freedom: Accra - Freetown", points: [2000, 1500, 1000, 1250, 1000, 750, 500] },
    { id: "cpt-vfa", name: "5th freedom: Cape Town - Victoria Falls", points: [2600, 1950, 1300, 1650, 1300, 975, 650] },
    { id: "dla-bgf", name: "5th freedom: Douala - Bangui", points: [2000, 1500, 1000, 1200, 1000, 750, 500] },
    { id: "ebb-bgf", name: "5th freedom: Entebbe - Bangui", points: [2400, 1800, 1200, 1500, 1200, 900, 600] },
    { id: "kgl-bjm", name: "5th freedom: Kigali - Bujumbura", points: [1000, 750, 500, 625, 500, 375, 250] },
    { id: "llw-apl", name: "5th freedom: Lilongwe - Nampula", points: [1000, 750, 500, 625, 500, 375, 250] },
    { id: "fbm-nla", name: "5th freedom: Lubumbashi - Ndola", points: [600, 450, 300, 375, 300, 225, 150] },
    { id: "acc-rob", name: "5th freedom: Accra - Monrovia", points: [2000, 1500, 1000, 1250, 1000, 750, 500] },
    { id: "cpt-lvi", name: "5th freedom: Cape Town - Livingstone", points: [600, 450, 300, 375, 300, 225, 150] },
    { id: "dkr-abj", name: "5th freedom: Dakar - Abidjan", points: [2400, 1800, 1200, 1500, 1200, 900, 600] },
    { id: "krt-jub", name: "5th freedom: Khartoum - Juba", points: [2000, 1500, 1000, 1250, 1000, 750, 500] },
    { id: "lun-hre", name: "5th freedom: Lusaka - Harare", points: [1000, 750, 500, 625, 500, 375, 250] },
    { id: "bkk-can", name: "5th freedom: Bangkok Suvarnabhumi - Guangzhou", points: [2400, 1800, 1200, 1500, 1200, 900, 600] }
  ],
  // "Minimum: 250 points per flight", after the tier bonus.
  zoneMin: [250, 250, 250, 250, 250, 250, 250],
  statuses: [
    { id: "ruby", name: "Ruby", bonus: 0 },
    { id: "silver", name: "Silver", bonus: 0.5 },
    { id: "gold", name: "Gold", bonus: 0.75 },
    { id: "platinum", name: "Platinum", bonus: 1 }
  ],
  // Absa Bank Kenya co-brand cards, from the Asante Global Credit Card
  // terms, section 7: 2 points per KES 200 on Kenya Airways purchases
  // (1 per KES 200 elsewhere), rounded down per transaction.
  cardHint: "Asante Global cards earn on the amount charged at Kenya Airways, in Kenyan shillings, on top of the flight points.",
  cards: [
    { id: "absa-signature", name: "Asante Global Signature Credit Card", rate: 2 / 200, rateText: "2 per KSh 200", currency: "KES", bank: "Absa Bank (Kenya)" },
    { id: "absa-platinum", name: "Asante Global Platinum Credit Card", rate: 2 / 200, rateText: "2 per KSh 200", currency: "KES", bank: "Absa Bank (Kenya)" }
  ],
  note: "Asante Rewards earns a fixed number of points per Kenya Airways flight, set by the region flown to or from Kenya (or the fifth-freedom route) and the fare. Business Super Flex (J, C) earns 200%, Flex (I, D) 150% and Lite (Z) 100%; Economy Super Flex (Y, B) earns 125%, Flex (M, U, K, H) 100%, Standard (L, Q, T, E, N) 75% and Best Buy (V, R, G, W) 50% of the route's Economy Flex amount. Silver adds 50%, Gold 75% and Platinum 100% to the base points. Every flight earns at least 250 points. Tier points, which count toward levels, are the distance times the fare share and are not shown. Travel agency rebated and staff tickets do not earn. The Absa Bank Kenya Asante Global Signature and Platinum credit cards earn 2 points per KSh 200 on Kenya Airways purchases and 1 per KSh 200 elsewhere, rounded down per transaction."
};

module.exports = {
  id: "kenya",
  // Month the earning rules were last checked against the source.
  reviewed: "2026-11",
  code: "KQ",
  color: "#E9262A",
  source: "https://asante.kenya-airways.com/pages/earn",
  examples: [
    // Asante Rewards' own example: Nairobi to London, Economy Flex.
    { name: "Kenya Airways NBO-LHR Economy Flex, Ruby (official example)", input: { status: "ruby", fare: "y-flex", zone: "europe" }, expect: 5000 },
    { name: "Kenya Airways NBO-LHR Economy Flex, Silver (official example)", input: { status: "silver", fare: "y-flex", zone: "europe" }, expect: 7500 },
    { name: "Kenya Airways NBO-LHR Economy Flex, Gold (official example)", input: { status: "gold", fare: "y-flex", zone: "europe" }, expect: 8750 },
    { name: "Kenya Airways NBO-LHR Economy Flex, Platinum (official example)", input: { status: "platinum", fare: "y-flex", zone: "europe" }, expect: 10000 },
    // Card: KSh 100,000 at Kenya Airways x 2 / 200 = 1,000, plus 5,000 flight.
    { name: "Kenya Airways Europe Economy Flex with the Asante Global card", input: { status: "ruby", fare: "y-flex", zone: "europe", radios: { usedCard: "Yes" }, fields: { cardCharge: 100000 } }, expect: 6000 },
    // Lubumbashi - Ndola Best Buy lists 150, raised to the 250 minimum.
    { name: "Kenya Airways Lubumbashi-Ndola Best Buy (minimum)", input: { status: "ruby", fare: "y-bestbuy", zone: "fbm-nla" }, expect: 250 }
  ],
  rules
};
