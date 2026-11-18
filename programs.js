/*
 * Earning rules for each loyalty program.
 *
 * method:
 *   "spend"    -> points = airfare x rate (rate comes from the status, or from
 *                 fare type x status multiplier when fareTypes is present)
 *   "distance" -> points = miles flown x status multiplier
 *   "tiered"   -> custom per-dollar tiers (Allegiant)
 *   "zone"     -> fixed points per fare and route band (Qantas)
 * earnMethods (optional): ways a member can choose to earn (Atmos Rewards):
 *   "distance", "price" (rate per dollar), or "segments" (perSegment).
 *   The status multiplier applies to each.
 *
 * cards (optional): co-branded credit cards and the extra points each earns
 * per dollar charged to it for the ticket, taxes included. Cards marked
 * kind: "debit" are listed under Debit cards. A card with its
 * own currency (e.g. a US card on a Canadian program) asks for the amount
 * charged in that currency.
 *
 * airlines (optional): the operating airlines a program covers. Each one is
 * its own entry in the program menu, shown as "Airline | programName" under
 * the airline's own country. An airline's eliteRate replaces the rate of statuses marked
 * elite, and its note is added to the program note. An airline's program
 * object, when present, replaces program fields such as currency,
 * statuses, cards, and note (IAG).
 *
 * baseFareOnly (optional): the program earns on the base fare only, not on
 * carrier-imposed fees (Southwest, Allegiant). Others earn on both.
 *
 * Rates reflect publicly reported rules as of late 2026. Update them here
 * when a program changes; the rest of the app reads from this file.
 */
window.PROGRAMS = {
  american: {
    name: "American Airlines | AAdvantage",
    unit: "miles",
    method: "spend",
    cap: 75000,
    centsPerPoint: 1.4,
    statuses: [
      { id: "member", name: "AAdvantage Member", rate: 5 },
      { id: "gold", name: "AAdvantage Gold", rate: 7 },
      { id: "platinum", name: "AAdvantage Platinum", rate: 8 },
      { id: "platpro", name: "AAdvantage Platinum Pro", rate: 9 },
      { id: "exp", name: "AAdvantage Executive Platinum", rate: 11 }
    ],
    // Co-branded cards: extra points per dollar charged (fare + taxes).
    cards: [
      { id: "citi-mileup", name: "Citi / AAdvantage MileUp", rate: 2 },
      { id: "citi-platselect", name: "Citi / AAdvantage Platinum Select", rate: 2 },
      { id: "citi-globe", name: "Citi / AAdvantage Globe", rate: 3 },
      { id: "citi-exec", name: "Citi / AAdvantage Executive", rate: 4 }
    ],
    note: "AAdvantage miles are earned on base fare and carrier-imposed fees. Government taxes do not earn miles. Earning is capped at 75,000 miles per ticket."
  },
  delta: {
    name: "Delta Air Lines | SkyMiles",
    unit: "miles",
    method: "spend",
    cap: 75000,
    centsPerPoint: 1.2,
    statuses: [
      { id: "member", name: "SkyMiles Member", rate: 5 },
      { id: "silver", name: "Silver Medallion", rate: 7 },
      { id: "gold", name: "Gold Medallion", rate: 8 },
      { id: "platinum", name: "Platinum Medallion", rate: 9 },
      { id: "diamond", name: "Diamond Medallion", rate: 11 }
    ],
    // Co-branded cards: extra points per dollar charged (fare + taxes).
    cards: [
      { id: "blue", name: "Delta SkyMiles Blue Amex", rate: 2 },
      { id: "gold", name: "Delta SkyMiles Gold Amex", rate: 2 },
      { id: "plat", name: "Delta SkyMiles Platinum Amex", rate: 3 },
      { id: "reserve", name: "Delta SkyMiles Reserve Amex", rate: 3 }
    ],
    note: "SkyMiles are earned on base fare and carrier-imposed surcharges. Basic Economy fares earn no miles. Earning is capped at 75,000 miles per ticket."
  },
  united: {
    name: "United Airlines | MileagePlus",
    unit: "miles",
    method: "spend",
    cap: 75000,
    centsPerPoint: 1.3,
    statuses: [
      { id: "member", name: "MileagePlus Member", rate: 5 },
      { id: "silver", name: "Premier Silver", rate: 7 },
      { id: "gold", name: "Premier Gold", rate: 8 },
      { id: "platinum", name: "Premier Platinum", rate: 9 },
      { id: "1k", name: "Premier 1K", rate: 11 }
    ],
    // Co-branded cards: extra points per dollar charged (fare + taxes).
    cards: [
      { id: "gateway", name: "United Gateway Card", rate: 2 },
      { id: "explorer", name: "United Explorer Card", rate: 3 },
      { id: "quest", name: "United Quest Card", rate: 4 },
      { id: "club", name: "United Club Card", rate: 5 },
      { id: "debit", name: "United MileagePlus Debit Rewards Card", rate: 1, kind: "debit" }
    ],
    note: "MileagePlus miles are earned on base fare and carrier-imposed surcharges. Taxes do not earn miles. Earning is capped at 75,000 miles per ticket."
  },
  southwest: {
    name: "Southwest Airlines | Rapid Rewards",
    baseFareOnly: true,
    unit: "points",
    method: "spend",
    centsPerPoint: 1.3,
    // Points per dollar of base fare, from southwest.com (2026).
    fareTypes: [
      { id: "basic", name: "Basic", rate: 2 },
      { id: "choice", name: "Choice", rate: 6 },
      { id: "choicePref", name: "Choice Preferred", rate: 10 },
      { id: "choiceExtra", name: "Choice Extra", rate: 14 }
    ],
    statuses: [
      { id: "member", name: "Rapid Rewards Member", multiplier: 1 },
      { id: "alist", name: "A-List", multiplier: 1.25 },
      { id: "alistPref", name: "A-List Preferred", multiplier: 2 }
    ],
    // Co-branded cards: extra points per dollar charged (fare + taxes).
    cards: [
      { id: "plus", name: "Southwest Rapid Rewards Plus", rate: 2 },
      { id: "premier", name: "Southwest Rapid Rewards Premier", rate: 3 },
      { id: "priority", name: "Southwest Rapid Rewards Priority", rate: 4 },
      { id: "debit", name: "Southwest Rapid Rewards Debit Card", rate: 1, kind: "debit" }
    ],
    note: "Rapid Rewards earns per dollar of base fare only: 2 points on Basic, 6 on Choice, 10 on Choice Preferred, and 14 on Choice Extra. A-List adds a 25% bonus and A-List Preferred adds a 100% bonus. From 1 January 2027, Choice Preferred drops to 8 and Choice Extra to 10."
  },
  alaska: {
    name: "Alaska Airlines | Atmos Rewards",
    unit: "points",
    method: "distance",
    // Members choose one way to earn for flights from 1 January 2027.
    // Elite bonuses apply to all three.
    earnMethods: [
      { id: "distance", name: "Miles flown: 1 point per mile" },
      { id: "price", name: "Price paid: 5 points per dollar", rate: 5 },
      { id: "segments", name: "Segments flown: 500 points per segment", perSegment: 500 }
    ],
    centsPerPoint: 1.4,
    statuses: [
      { id: "member", name: "Atmos Member", multiplier: 1 },
      { id: "silver", name: "Atmos Silver", multiplier: 1.25 },
      { id: "gold", name: "Atmos Gold", multiplier: 1.5 },
      { id: "platinum", name: "Atmos Platinum", multiplier: 2 },
      { id: "titanium", name: "Atmos Titanium", multiplier: 2.5 }
    ],
    // Co-branded cards: extra points per dollar charged (fare + taxes).
    cards: [
      { id: "ascent", name: "Atmos Rewards Ascent Visa Signature", rate: 3 },
      { id: "summit", name: "Atmos Rewards Summit Visa Infinite", rate: 3 }
    ],
    note: "Atmos Rewards members choose how they earn for flights departing on or after 1 January 2027: 1 point per mile flown, 5 points per dollar of the fare, or 500 points per segment. Silver, Gold, Platinum, and Titanium add 25% to 150%. Members who never chose keep earning by distance; new members default to price paid. Price paid excludes taxes, and Basic Economy fares may not qualify. Flights before 2027 earn by distance."
  },
  frontier: {
    name: "Frontier Airlines | Frontier Miles",
    // Ask for seats and bags bought on the booking; they earn like the fare.
    addons: true,
    unit: "miles",
    method: "spend",
    centsPerPoint: 0.5,
    // Ask whether the trip was booked with the GoWild! Pass.
    gowild: true,
    carrierLabel: "Carrier Interface Charge",
    carrierHint: "Shown as CIC on your receipt. Frontier's per-segment charge for booking online or by phone. It earns miles like the fare.",
    defaultFareType: "basic",
    fareTypes: [
      { id: "basic", name: "Basic fare (no bundle)" },
      { id: "bundle", name: "Bundle" }
    ],
    // Rates for bookings made on or after September 1, 2026. Holders of a
    // Frontier Mastercard (World or Access) earn the higher
    // cardmember rate however they pay ("...Card" keys).
    cardmember: {
      question: "Are you a Frontier Airlines Mastercard cardmember?",
      hint: "World or Access Mastercard. Cardmembers earn a higher rate on every booking, however they pay."
    },
    statuses: [
      { id: "member", name: "Frontier Miles Member", rates: { basic: 1, bundle: 6, basicCard: 4, bundleCard: 12 } },
      { id: "silver", name: "Elite Silver", rates: { basic: 3, bundle: 8, basicCard: 6, bundleCard: 14 } },
      { id: "gold", name: "Elite Gold", rates: { basic: 5, bundle: 10, basicCard: 8, bundleCard: 16 } },
      { id: "platinum", name: "Elite Platinum", rates: { basic: 7, bundle: 12, basicCard: 10, bundleCard: 18 } },
      { id: "diamond", name: "Elite Diamond", rates: { basic: 11, bundle: 16, basicCard: 14, bundleCard: 22 } }
    ],
    // Paying with the card adds 5 miles per dollar on top. Frontier
    // publishes this for the World Mastercard; the Access card is assumed
    // to match.
    cards: [
      { id: "frontier-mc", name: "Frontier Airlines World Mastercard", rate: 5 },
      { id: "frontier-access", name: "Frontier Airlines Access Mastercard", rate: 5 }
    ],
    note: "For bookings made on or after September 1, 2026, Frontier Miles earns 1 to 11 miles per dollar on basic fares and 6 to 16 on bundles, depending on status, on the fare plus seats and bags. GoWild! Pass fares earn 1 mile, and the Early Booking Fee earns at the status and fare type rate. Holders of a Frontier Airlines World or Access Mastercard earn 4 to 14 on basic fares and 12 to 22 on bundles however they pay, and paying with the card adds 5 miles per dollar. Frontier publishes the 5 for the World Mastercard; this estimate assumes the same for the Access card."
  },
  jetblue: {
    name: "JetBlue Airways | TrueBlue",
    unit: "points",
    method: "spend",
    centsPerPoint: 1.3,
    defaultFareType: "main",
    fareTypes: [
      { id: "main", name: "Main, EvenMore, BlueFirst, or Mint" },
      { id: "base", name: "Base (Main Base, EvenMore Base, BlueFirst Base, Mint Base)" }
    ],
    // Fare points plus the Mosaic bonus (3, 4, or 5 per dollar).
    statuses: [
      { id: "member", name: "TrueBlue Member", rates: { main: 3, base: 1 } },
      { id: "mosaic1", name: "Mosaic 1", rates: { main: 6, base: 4 } },
      { id: "mosaic2", name: "Mosaic 2", rates: { main: 6, base: 4 } },
      { id: "mosaic3", name: "Mosaic 3", rates: { main: 7, base: 5 } },
      { id: "mosaic4", name: "Mosaic 4", rates: { main: 8, base: 6 } }
    ],
    // Booking on jetblue.com or the JetBlue app adds a bonus by fare type.
    direct: {
      question: "Did you book on jetblue.com or the JetBlue app?",
      rates: { main: 3, base: 1 }
    },
    // Co-branded cards: extra points per dollar charged (fare + taxes).
    cards: [
      { id: "card", name: "JetBlue Card", rate: 3 },
      { id: "plus", name: "JetBlue Plus Card", rate: 6 },
      { id: "premier", name: "JetBlue Premier Card", rate: 6 }
    ],
    note: "TrueBlue earns per dollar of the pre-tax fare: 3 points on Main, EvenMore, BlueFirst, and Mint, or 1 on Base fares. Booking on jetblue.com or the JetBlue app adds 3 (1 on Base). Mosaic 1 and 2 add 3, Mosaic 3 adds 4, and Mosaic 4 adds 5. The JetBlue Card adds 3 and the Plus Card 6. Subscription bonuses are not included."
  },
  allegiant: {
    name: "Allegiant Air | Allways Rewards",
    // Ask for seats and bags bought on the booking; they earn like the fare.
    addons: true,
    baseFareOnly: true,
    carrierLabel: "Carrier Usage Charge",
    carrierHint: "Allegiant's per-segment charge for booking online or by phone. It does not earn points.",
    unit: "points",
    method: "tiered",
    centsPerPoint: 1.0,
    tiers: [
      { upTo: 500, rate: 1 },
      { upTo: Infinity, rate: 2 }
    ],
    statuses: [
      { id: "member", name: "Allways Rewards Member" }
    ],
    // Co-branded cards: extra points per dollar charged (fare + taxes).
    cards: [
      { id: "allways-visa", name: "Allways Rewards Visa", rate: 3 }
    ],
    note: "Allways Rewards has no elite status tiers. Members earn 1 point per dollar on the first $500 of a booking and 2 points per dollar above $500, on the fare plus seats and bags, excluding taxes and fees."
  },
  breeze: {
    name: "Breeze Airways | Breezy Rewards",
    // Ask for seats and bags bought on the booking; they earn like the fare.
    addons: true,
    carrierLabel: "Technology Development Charge",
    carrierHint: "Breeze's per-segment charge for booking online. It earns points like the fare.",
    unit: "BreezePoints",
    method: "spend",
    centsPerPoint: 1.0,
    defaultFareType: "nice",
    fareTypes: [
      { id: "noflex", name: "No Flex", rate: 1 },
      { id: "nice", name: "Nice", rate: 2 },
      { id: "nicer", name: "Nicer", rate: 5 },
      { id: "nicest", name: "Nicest", rate: 5 }
    ],
    // 2026 status boosts: 25%, 50%, 75%, and 100%.
    statuses: [
      { id: "member", name: "Breezy Rewards Member", multiplier: 1 },
      { id: "breezy1", name: "Breezy 1", multiplier: 1.25 },
      { id: "breezy2", name: "Breezy 2", multiplier: 1.5 },
      { id: "breezy3", name: "Breezy 3", multiplier: 1.75 },
      { id: "club", name: "Breezy Club", multiplier: 2 }
    ],
    // The card's "when you buy" points match the fare: 1x No Flex, 2x Nice,
    // 5x Nicer and Nicest, on the amount charged.
    cards: [
      { id: "breeze-easy", name: "Breeze Easy Visa Signature", rate: 5, rates: { noflex: 1, nice: 2, nicer: 5, nicest: 5 } }
    ],
    note: "BreezePoints depend on the fare you buy: 1 per dollar on No Flex, 2 on Nice, and 5 on Nicer and Nicest, on the fare and add-ons such as seats and bags. Breezy 1, 2, 3, and Club add a 25%, 50%, 75%, or 100% boost. The Breeze Easy Visa Signature adds the same 1, 2, or 5 points per dollar again when you pay with it."
  },
  hawaiian: {
    name: "Hawaiian Airlines | Atmos Rewards",
    unit: "points",
    method: "distance",
    // Members choose one way to earn for flights from 1 January 2027.
    // Elite bonuses apply to all three.
    earnMethods: [
      { id: "distance", name: "Miles flown: 1 point per mile" },
      { id: "price", name: "Price paid: 5 points per dollar", rate: 5 },
      { id: "segments", name: "Segments flown: 500 points per segment", perSegment: 500 }
    ],
    centsPerPoint: 1.4,
    statuses: [
      { id: "member", name: "Atmos Member", multiplier: 1 },
      { id: "silver", name: "Atmos Silver", multiplier: 1.25 },
      { id: "gold", name: "Atmos Gold", multiplier: 1.5 },
      { id: "platinum", name: "Atmos Platinum", multiplier: 2 },
      { id: "titanium", name: "Atmos Titanium", multiplier: 2.5 }
    ],
    // Co-branded cards: extra points per dollar charged (fare + taxes).
    cards: [
      { id: "ascent", name: "Atmos Rewards Ascent Visa Signature", rate: 3 },
      { id: "summit", name: "Atmos Rewards Summit Visa Infinite", rate: 3 },
      { id: "hawaiian-mc", name: "Hawaiian Airlines World Elite Mastercard", rate: 3 }
    ],
    note: "HawaiianMiles is now part of Atmos Rewards. Members choose how they earn for flights departing on or after 1 January 2027: 1 point per mile flown, 5 points per dollar of the fare, or 500 points per segment. Silver, Gold, Platinum, and Titanium add 25% to 150%. With distance earning, Neighbor Island flights earn at least 500 points per segment, which this estimate does not apply. Flights before 2027 earn by distance."
  },
  aircanada: {
    name: "Air Canada | Aeroplan",
    country: "CA",
    currency: "CAD",
    unit: "points",
    method: "spend",
    centsPerPoint: 1.5,
    statuses: [
      { id: "member", name: "Aeroplan Member", rate: 1 },
      { id: "25k", name: "Aeroplan 25K", rate: 2 },
      { id: "35k", name: "Aeroplan 35K", rate: 3 },
      { id: "50k", name: "Aeroplan 50K", rate: 4 },
      { id: "75k", name: "Aeroplan 75K", rate: 5 },
      { id: "se", name: "Aeroplan Super Elite", rate: 6 }
    ],
    // Co-branded cards: extra points per dollar charged (fare + taxes).
    // Sorted by tier, then issuer; Canadian issuers first, the US card last.
    // Separator entries draw a "---" line between tiers.
    cards: [
      { id: "cibc-visa", name: "CIBC Aeroplan Visa (CA)", rate: 1 },
      { id: "td-plat", name: "TD Aeroplan Visa Platinum (CA)", rate: 1 },
      { separator: true },
      { id: "amex", name: "American Express Aeroplan Card (CA)", rate: 2 },
      { id: "cibc-vi", name: "CIBC Aeroplan Visa Infinite (CA)", rate: 1.5 },
      { id: "td-vi", name: "TD Aeroplan Visa Infinite (CA)", rate: 1.5 },
      { separator: true },
      { id: "amex-reserve", name: "American Express Aeroplan Reserve Card (CA)", rate: 3 },
      { id: "cibc-priv", name: "CIBC Aeroplan Visa Infinite Privilege (CA)", rate: 2 },
      { id: "td-priv", name: "TD Aeroplan Visa Infinite Privilege (CA)", rate: 2 },
      { separator: true },
      { id: "chase", name: "Chase Aeroplan Card (US)", rate: 3, currency: "USD" }
    ],
    note: "Since January 2026, Aeroplan earns points per Canadian dollar spent on base fare and carrier surcharges on Air Canada flights. Taxes do not earn. Elite members earn 2 to 6 points per dollar. The US Chase Aeroplan Card earns per US dollar charged and includes automatic 25K status."
  },
  westjet: {
    name: "WestJet | WestJet Rewards",
    country: "CA",
    currency: "CAD",
    unit: "WestJet points",
    method: "spend",
    centsPerPoint: 1.0,
    statuses: [
      { id: "teal", name: "Teal", rate: 1 },
      { id: "silver", name: "Silver", rate: 3 },
      { id: "gold", name: "Gold", rate: 5 },
      { id: "platinum", name: "Platinum", rate: 8 }
    ],
    // Co-branded cards: extra points per dollar charged (fare + taxes).
    cards: [
      { id: "rbc-mc", name: "WestJet RBC Mastercard", rate: 1.5 },
      { id: "rbc-we", name: "WestJet RBC World Elite Mastercard", rate: 2 }
    ],
    note: "WestJet Rewards earns points per Canadian dollar spent on WestJet flights, before taxes. Partner flights earn by distance and are not covered here."
  },
  aeromexico: {
    name: "Aeroméxico | Aeroméxico Rewards",
    country: "MX",
    currency: "USD",
    unit: "points",
    method: "spend",
    statuses: [
      { id: "member", name: "Aeroméxico Rewards Member", rate: 8 },
      { id: "silver", name: "Silver", rate: 8 },
      { id: "gold", name: "Gold", rate: 8 },
      { id: "platinum", name: "Platinum", rate: 8 },
      { id: "titanium", name: "Titanium", rate: 16 }
    ],
    note: "Aeroméxico Rewards earns 8 points per US dollar of base fare, excluding taxes. Enter the fare in US dollars. Titanium earns 8 more points per dollar. Bonuses for Silver, Gold, and Platinum were not confirmed, so those tiers are shown at the base rate."
  },
  viva: {
    name: "Viva Aerobus | Doters",
    country: "MX",
    currency: "MXN",
    unit: "Doters points",
    method: "spend",
    statuses: [
      { id: "green", name: "Doters Green", rate: 0.5 },
      { id: "silver", name: "Doters Silver", rate: 0.5 },
      { id: "gold", name: "Doters Gold", rate: 0.5 }
    ],
    note: "HSBC Viva card earning is not included because its rate could not be confirmed. Doters earns 1 point for every 2 Mexican pesos spent with Viva Aerobus, including bags and seats. Silver and Gold bonuses were not confirmed, so those levels are shown at the Green rate."
  },
  volaris: {
    name: "Volaris | Altitude",
    country: "MX",
    currency: "MXN",
    unit: "altitude Points",
    method: "spend",
    statuses: [
      { id: "member", name: "Altitude Member", rate: 0.5 }
    ],
    note: "Altitude by Volaris earns 10 points for every 20 Mexican pesos spent on volaris.com or the app, excluding taxes and airport fees. It has no status tiers."
  },
  virgin: {
    name: "Virgin Atlantic | Flying Club",
    country: "UK",
    currency: "GBP",
    unit: "Virgin Points",
    method: "distance",
    centsPerPoint: 1.0,
    defaultFareType: "classic-mid",
    // Share of miles flown earned as points, by fare class.
    fareTypes: [
      { id: "light", name: "Economy Light (T)", rate: 0.25 },
      { id: "classic-low", name: "Economy Classic (O, N, X, Q, E)", rate: 0.5 },
      { id: "classic-mid", name: "Economy Classic (L, U, M)", rate: 1 },
      { id: "classic-high", name: "Economy Classic (Y, B, R)", rate: 1.5 },
      { id: "delight", name: "Economy Delight (V)", rate: 1.5 },
      { id: "premium-std", name: "Premium Standard (H, K)", rate: 1 },
      { id: "premium-flex", name: "Premium Flexible (W, S)", rate: 2 },
      { id: "upper-std", name: "Upper Class Standard (I, Z)", rate: 2 },
      { id: "upper-flex", name: "Upper Class Flexible (J, C, D)", rate: 4 }
    ],
    statuses: [
      { id: "red", name: "Red", multiplier: 1 },
      { id: "silver", name: "Silver", multiplier: 1.3 },
      { id: "gold", name: "Gold", multiplier: 1.6 }
    ],
    // Co-branded cards: extra points per pound charged (fare + taxes).
    cards: [
      { id: "reward", name: "Virgin Atlantic Reward (UK)", rate: 1.5 },
      { id: "reward-plus", name: "Virgin Atlantic Reward+ (UK)", rate: 3 },
      { id: "red", name: "Virgin Red Rewards Mastercard (US)", rate: 3, currency: "USD" }
    ],
    note: "Flying Club earns a share of the miles flown set by fare class, and Silver and Gold add 30% and 60%. Premium and Upper Class rates differ between sources, so those are estimates. Card points are earned per pound charged, or per US dollar for the US card."
  },
  flyingblue: {
    name: "Air France-KLM | Flying Blue",
    programName: "Flying Blue",
    country: "AFKL",
    currency: "EUR",
    unit: "Miles",
    method: "spend",
    centsPerPoint: 1.2,
    // The operating airline; all earn the same Flying Blue rates. Transavia
    // is not in SkyTeam, and the US card's bonus is not confirmed for it.
    airlines: [
      { id: "af", name: "Air France", country: "FR" },
      { id: "kl", name: "KLM", country: "NL" },
      { id: "to", name: "Transavia France", country: "FR", noAlliance: true, program: { cards: null, note: "Flying Blue earns 4 to 9 Miles per euro spent on the fare and carrier charges on Transavia, by status. Taxes do not earn. Enter fares in euros." },
        note: "Transavia France earns on all fares, Basic included. Add your Flying Blue number to the booking." },
      { id: "hv", name: "Transavia Netherlands", country: "NL", noAlliance: true, program: { cards: null, note: "Flying Blue earns 4 to 9 Miles per euro spent on the fare and carrier charges on Transavia, by status. Taxes do not earn. Enter fares in euros." },
        note: "Add your Flying Blue number to the booking. Transavia's older partner page says Netherlands Basic fares earn nothing; its current help page says all fares earn." }
    ],
    statuses: [
      { id: "explorer", name: "Explorer", rate: 4 },
      { id: "silver", name: "Silver", rate: 6 },
      { id: "gold", name: "Gold", rate: 7 },
      { id: "platinum", name: "Platinum", rate: 8 },
      { id: "ultimate", name: "Ultimate", rate: 9 }
    ],
    // Co-branded cards: extra points per dollar charged (fare + taxes).
    cards: [
      { id: "boa", name: "Air France KLM Visa Signature (US)", rate: 3, currency: "USD" }
    ],
    note: "Flying Blue earns 4 to 9 Miles per euro spent on the fare and carrier charges on Air France, KLM, and Transavia, by status. Taxes do not earn. Enter fares in euros. The US Bank of America card earns per US dollar charged."
  }
};

/* Miles & More: one program across the Lufthansa Group airlines. Award
   miles are earned per euro of the fare; status members earn more, and
   how much more depends on the operating airline. */
(function () {
  var P = window.PROGRAMS;

  P.milesandmore = {
    name: "Lufthansa Group | Miles & More",
    programName: "Miles & More",
    country: "LHG",
    currency: "EUR",
    unit: "miles",
    method: "spend",
    centsPerPoint: 1.0,
    // eliteRate: miles per euro for Frequent Traveller, Senator, and HON Circle.
    airlines: [
      { id: "lh", name: "Lufthansa", country: "DE", eliteRate: 6 },
      { id: "ew", name: "Eurowings", country: "DE", eliteRate: 5, noAlliance: true },
      { id: "de", name: "Discover Airlines", country: "DE", eliteRate: 5, noAlliance: true },
      { id: "os", name: "Austrian Airlines", country: "AT", eliteRate: 6 },
      { id: "lx", name: "SWISS", country: "CH", eliteRate: 6,
        note: "SWISS fares in Swiss francs earn at the euro equivalent." },
      { id: "sn", name: "Brussels Airlines", country: "BE", eliteRate: 6 },
      { id: "en", name: "Air Dolomiti", country: "IT", eliteRate: 6, noAlliance: true,
        program: { minPoints: 125 },
        note: "Air Dolomiti tickets (ticket number 101) and Lufthansa tickets earn at least 125 miles per flight. Air Dolomiti's own status rate has not been published, so it uses the Lufthansa rate." },
      { id: "az", name: "ITA Airways", country: "IT", eliteRate: 6,
        note: "ITA Airways joined Miles & More on 1 April 2026, replacing Volare. ITA's own status rate has not been published, so it uses the Lufthansa rate." }
    ],
    statuses: [
      { id: "member", name: "Miles & More Member", rate: 4 },
      { id: "ftl", name: "Frequent Traveller", rate: 6, elite: true },
      { id: "sen", name: "Senator", rate: 6, elite: true },
      { id: "hon", name: "HON Circle", rate: 6, elite: true }
    ],
    // Co-branded card: extra miles per US dollar charged (fare + taxes).
    cards: [
      { id: "barclays", name: "Miles & More World Elite Mastercard (US)", rate: 2, currency: "USD" }
    ],
    note: "Miles & More earns award miles per euro of the fare, not by distance: 4 per euro for members. Frequent Traveller, Senator, and HON Circle earn 6 per euro on Lufthansa, SWISS, Austrian, Brussels, and ITA, and 5 on Eurowings and Discover. Taxes do not earn. Enter fares in euros. The US Barclays card earns per US dollar charged."
  };

  /* Iberia Club covers Iberia and LEVEL flights (both under IAG below). */
  var iberiaStatuses = [
    { id: "clasica", name: "Clásica", rate: 5 },
    { id: "plata", name: "Plata", rate: 6 },
    { id: "oro", name: "Oro", rate: 7 },
    { id: "platino", name: "Platino", rate: 8 },
    { id: "infinita", name: "Infinita", rate: 9 },
    { id: "infinita-prime", name: "Infinita Prime", rate: 9 }
  ];
  // Co-branded cards: extra Avios per US dollar charged (fare + taxes).
  var avioUsCards = [
    { id: "chase-aerlingus", name: "Chase Aer Lingus Visa Signature (US)", rate: 3, currency: "USD" },
    { id: "chase-iberia", name: "Chase Iberia Visa Signature (US)", rate: 3, currency: "USD" },
    { id: "chase-ba", name: "Chase British Airways Visa Signature (US)", rate: 3, currency: "USD" }
  ];

  /* IAG: Aer Lingus, British Airways, Iberia, LEVEL, and Vueling in one program. Each airline brings
     its own loyalty program (currency, status levels, and cards). */
  var baClub = {
    programName: "British Airways Club",
    currency: "GBP",
    unit: "Avios",
    method: "spend",
    centsPerPoint: 1.0,
    statuses: [
      { id: "blue", name: "Blue", rate: 6 },
      { id: "bronze", name: "Bronze", rate: 7 },
      { id: "silver", name: "Silver", rate: 8 },
      { id: "gold", name: "Gold", rate: 9 }
    ],
    // Co-branded cards: extra points per pound charged (fare + taxes).
    // US cards earn per US dollar and ask for the US dollar charge.
    cards: [
      { id: "amex", name: "British Airways American Express (UK)", rate: 1 },
      { id: "amex-pp", name: "British Airways American Express Premium Plus (UK)", rate: 3 },
      { id: "chase-aerlingus", name: "Chase Aer Lingus Visa Signature (US)", rate: 3, currency: "USD" },
      { id: "chase", name: "Chase British Airways Visa Signature (US)", rate: 3, currency: "USD" },
      { id: "chase-iberia", name: "Chase Iberia Visa Signature (US)", rate: 3, currency: "USD" }
    ],
    note: "British Airways Club earns 6 to 9 Avios per pound spent on the fare and carrier charges, by status. Taxes do not earn. Enter fares in pounds. The UK Amex card rates on British Airways purchases could not be confirmed."
  };
  var iberiaClub = {
    programName: "Iberia Club",
    currency: "EUR",
    unit: "Avios",
    method: "spend",
    centsPerPoint: 1.0,
    statuses: iberiaStatuses,
    cards: avioUsCards,
    note: "Iberia Club earns 5 to 8 Avios per euro of the fare by status, plus 2 more per euro on flights within Spain and between Spain and Latin America, which this estimate does not add. The Infinita rates are not confirmed by Iberia. Taxes do not earn."
  };
  var levelClub = {
    programName: "Iberia Club",
    currency: "EUR",
    statuses: iberiaStatuses,
    cards: avioUsCards,
    note: "LEVEL flights booked under an Iberia (IB) flight number earn Iberia Club Avios at the usual per-euro rates. Flights sold under LEVEL's own code earn only between Barcelona and Oakland, Los Angeles, Punta Cana, and Buenos Aires, through 31 December 2026."
  };
  var vuelingClub = {
    programName: "Vueling Club",
    currency: "EUR",
    statuses: [
      { id: "basic", name: "Basic", rate: 0 },
      { id: "smart", name: "Smart", rate: 3 },
      { id: "plus", name: "Plus", rate: 5 },
      { id: "premium", name: "Premium", rate: 7 }
    ],
    cards: null,
    note: "Since 2026, Vueling Club earns Avios on flights only from the Smart level up: 3, 5, or 7 Avios per euro of the fare. Earning starts after 3 flights or 200 euros spent in a year. Basic members earn no Avios on flights."
  };
  var aerClub = {
    programName: "AerClub",
    currency: "EUR",
    statuses: [
      { id: "green", name: "Green", rate: 3 },
      { id: "silver", name: "Silver", rate: 3.75 },
      { id: "platinum", name: "Platinum", rate: 4.5 },
      { id: "concierge", name: "Concierge", rate: 5.25 }
    ],
    // Co-branded cards: extra Avios per US dollar charged (fare + taxes).
    cards: [
      { id: "chase-aerlingus", name: "Chase Aer Lingus Visa Signature (US)", rate: 3, currency: "USD" },
      { id: "chase-ba", name: "Chase British Airways Visa Signature (US)", rate: 3, currency: "USD" },
      { id: "chase-iberia", name: "Chase Iberia Visa Signature (US)", rate: 3, currency: "USD" }
    ],
    note: "AerClub earns 3 Avios per euro of the Aer Lingus fare, excluding taxes, bags, and seats. Silver, Platinum, and Concierge add a 25%, 50%, or 75% tier bonus. Enter fares in euros. The US Chase cards earn per US dollar charged."
  };
  P.iag = {
    name: "IAG | Avios",
    programName: "Avios",
    country: "IAG",
    unit: "Avios",
    method: "spend",
    centsPerPoint: 1.0,
    airlines: [
      { id: "ei", name: "Aer Lingus", country: "IE", program: aerClub },
      { id: "ba", name: "British Airways", country: "UK", program: baClub },
      { id: "ib", name: "Iberia", country: "ES", program: iberiaClub },
      { id: "level", name: "LEVEL", country: "ES", program: levelClub },
      { id: "vy", name: "Vueling", country: "ES", program: vuelingClub }
    ],
    // Defaults before an airline is chosen (British Airways).
    currency: baClub.currency,
    statuses: baClub.statuses,
    cards: baClub.cards,
    note: baClub.note
  };

  /* TAP Miles&Go: a share of miles flown, by fare and region. */
  P.tap = {
    name: "TAP Air Portugal | Miles&Go",
    country: "PT",
    currency: "EUR",
    unit: "miles",
    method: "distance",
    defaultFareType: "classic-eu",
    fareTypes: [
      { id: "discount", name: "Discount", rate: 0.2 },
      { id: "basic", name: "Basic (intercontinental)", rate: 0.5 },
      { id: "classic-eu", name: "Classic, Europe and North Africa", rate: 0.7 },
      { id: "classic-ic", name: "Classic, intercontinental", rate: 1 },
      { id: "plus-eu", name: "Plus, Europe and North Africa", rate: 1 },
      { id: "plus-ic", name: "Plus, intercontinental", rate: 1.5 },
      { id: "executive", name: "Executive", rate: 1.75 },
      { id: "top-executive", name: "Top Executive", rate: 2 }
    ],
    statuses: [
      { id: "member", name: "Miles&Go Member", multiplier: 1 },
      { id: "silver", name: "Silver", multiplier: 1 },
      { id: "gold", name: "Gold", multiplier: 1 }
    ],
    note: "TAP Miles&Go earns a share of the miles flown set by fare and region. Executive rose from 150% to 175% in 2026. Silver and Gold bonuses could not be confirmed, so all levels use the base rates."
  };
})();

/* Programs added November 2026. */
(function () {
  var P = window.PROGRAMS;

  P.porter = {
    name: "Porter Airlines | VIPorter",
    country: "CA",
    currency: "CAD",
    unit: "points",
    method: "spend",
    statuses: [
      { id: "member", name: "VIPorter Member", rate: 5 },
      { id: "passport", name: "Passport", rate: 6 },
      { id: "venture", name: "Venture", rate: 6 },
      { id: "ascent", name: "Ascent", rate: 7 },
      { id: "first", name: "First", rate: 7 }
    ],
    // Co-branded cards: extra points per Canadian dollar charged.
    cards: [
      { id: "bmo", name: "BMO VIPorter Mastercard", rate: 2 },
      { id: "bmo-we", name: "BMO VIPorter World Elite Mastercard", rate: 3 }
    ],
    note: "VIPorter earns 5 to 7 points per Canadian dollar of the base fare by status, and Porter add-ons like seats and bags also earn. Taxes do not earn. The BMO card rates on Porter purchases differ between sources, so treat them as estimates."
  };

  P.finnair = {
    name: "Finnair | Finnair Plus",
    country: "FI",
    currency: "EUR",
    unit: "Avios",
    method: "spend",
    centsPerPoint: 1.0,
    statuses: [
      { id: "basic", name: "Basic", rate: 6 },
      { id: "silver", name: "Silver", rate: 7 },
      { id: "gold", name: "Gold", rate: 8 },
      { id: "platinum", name: "Platinum", rate: 9 },
      { id: "lumo", name: "Platinum Lumo", rate: 10 }
    ],
    note: "Finnair Plus earns 6 to 10 Avios per euro of the fare by status, on flights booked with Finnair. Taxes do not earn. Enter fares in euros."
  };

  P.lifemiles = {
    name: "Avianca | LifeMiles",
    country: "CO",
    unit: "LifeMiles",
    method: "spend",
    defaultFareType: "classic",
    fareTypes: [
      { id: "basic", name: "Basic or Light", rate: 3 },
      { id: "classic", name: "Classic", rate: 6 },
      { id: "flex", name: "Flex", rate: 8 },
      { id: "business", name: "Business or Insignia", rate: 10 }
    ],
    statuses: [
      { id: "red", name: "Red", multiplier: 1 },
      { id: "red-plus", name: "Red Plus", multiplier: 1.1 },
      { id: "silver", name: "Silver", multiplier: 1.2 },
      { id: "gold", name: "Gold", multiplier: 1.6 },
      { id: "diamond", name: "Diamond", multiplier: 1.8 }
    ],
    note: "LifeMiles earns on Avianca flights by the fare paid: 3, 6, 8, or 10 miles per US dollar by fare family, excluding taxes. Red Plus and Silver add 10% and 20%. Gold and Diamond are shown at 60% and 80%, but sources differ on those two."
  };

  P.icelandair = {
    name: "Icelandair | Saga Club",
    country: "IS",
    unit: "Saga Points",
    method: "zone",
    defaultFareType: "standard",
    // Fixed Saga Points per one-way flight, from Icelandair's fare types
    // page. Each zone's points follow the fareTypes order.
    fareTypes: [
      { id: "light", name: "Economy Light" },
      { id: "standard", name: "Economy Standard" },
      { id: "flex", name: "Economy Flex" },
      { id: "premium", name: "Saga Premium" },
      { id: "premium-flex", name: "Saga Premium Flex" }
    ],
    zones: [
      { id: "europe", name: "Iceland and Europe (one flight)", points: [850, 1700, 2550, 3400, 5100] },
      { id: "north-america", name: "Iceland and North America (one flight)", points: [1200, 2400, 3600, 4800, 7200] },
      { id: "via-iceland", name: "North America and Europe via Iceland (both flights)", points: [2050, 4100, 6150, 8200, 12300] }
    ],
    // Silver and Gold earn extra Tier Credits, not extra Saga Points.
    statuses: [
      { id: "blue", name: "Saga Blue", bonus: 0 },
      { id: "silver", name: "Saga Silver", bonus: 0 },
      { id: "gold", name: "Saga Gold", bonus: 0 }
    ],
    note: "Icelandair awards a fixed number of Saga Points per flight, set by fare and route. A trip between North America and Europe through Iceland earns both flights. Saga Silver and Gold add 10% or 20% Tier Credits toward status, not Saga Points. Icelandair has not updated this table in several years, so check a recent booking if the numbers look off."
  };

  P.norwegian = {
    name: "Norwegian | Norwegian Reward",
    country: "NO",
    currency: "NOK",
    unit: "CashPoints",
    method: "spend",
    rateAsPercent: true,
    defaultFareType: "lowfare",
    fareTypes: [
      { id: "lowfare", name: "LowFare", rate: 0.01 },
      { id: "lowfare-plus", name: "LowFare+", rate: 0.02 },
      { id: "flex", name: "Flex", rate: 0.05 }
    ],
    statuses: [
      { id: "member", name: "Norwegian Reward Member", multiplier: 1 }
    ],
    note: "Norwegian Reward pays CashPoints worth 1%, 2%, or 5% of the ticket price before taxes, by fare. One CashPoint is worth 1 Norwegian krone, so enter the fare in kroner. Members living in Norway, Sweden, Denmark, or Finland earn Spenn instead. Paying with a Bank Norwegian card raises LowFare to 3% and LowFare+ to 4%."
  };

  P.virginaustralia = {
    name: "Virgin Australia | Velocity",
    country: "AU",
    currency: "AUD",
    unit: "Velocity Points",
    method: "spend",
    centsPerPoint: 1.0,
    statuses: [
      { id: "red", name: "Red", rate: 4 },
      { id: "silver", name: "Silver", rate: 6 },
      { id: "gold", name: "Gold", rate: 7 },
      { id: "platinum", name: "Platinum", rate: 8 },
      { id: "platinum-plus", name: "Platinum Plus", rate: 10 }
    ],
    note: "Velocity earns 4 points per Australian dollar of the fare on Virgin Australia flights. Silver, Gold, Platinum, and Platinum Plus earn a status bonus; this estimate uses 50%, 75%, 100%, and 150%, the rates Velocity publishes for holiday bookings, because the flight rates are not published. Taxes do not earn."
  };

  /* Qantas: fixed points per flight by route band and fare, from Qantas'
     earning tables for Qantas-marketed flights (travel from 22 July 2025).
     Each zone's points list follows the fareTypes order; null means the
     fare is not sold on that route. */
  P.qantas = {
    name: "Qantas | Qantas Frequent Flyer",
    country: "AU",
    currency: "AUD",
    unit: "Qantas Points",
    method: "zone",
    centsPerPoint: 1.0,
    defaultFareType: "y",
    fareTypes: [
      { id: "disc-y", name: "Discount Economy" },
      { id: "y", name: "Economy" },
      { id: "flex-y", name: "Flexible Economy" },
      { id: "disc-pe", name: "Discount Premium Economy", premium: true },
      { id: "pe", name: "Premium Economy", premium: true },
      { id: "flex-pe", name: "Flexible Premium Economy", premium: true },
      { id: "disc-j", name: "Discount Business", premium: true },
      { id: "j", name: "Business", premium: true },
      { id: "flex-j", name: "Flexible Business", premium: true },
      { id: "f", name: "First", premium: true }
    ],
    zones: [
      { id: "dom-short", name: "Domestic Australia: 0 to 750 miles", points: [500, 500, 750, 750, 1125, 1250, null, 1750, 2000, 2250] },
      { id: "dom-medium", name: "Domestic Australia: 751 to 1,500 miles", points: [875, 875, 1375, 1375, 1750, 1940, null, 2625, 2940, 3500] },
      { id: "dom-long", name: "Domestic Australia: 1,501 miles and over", points: [1815, 1815, 2750, 2750, 3375, 3625, null, 4125, 4500, 5500] },
      { id: "int-1", name: "International: 0 to 750 miles", points: [300, 450, 650, 650, 750, 850, 900, 975, 1050, 1200] },
      { id: "int-2", name: "International: 751 to 1,500 miles", points: [550, 850, 1100, 1100, 1350, 1500, 1650, 1800, 1950, 2200] },
      { id: "int-3", name: "International: 1,501 to 2,500 miles", points: [1100, 1650, 2200, 2200, 2750, 3050, 3300, 3575, 3850, 4400] },
      { id: "int-4", name: "International: 2,501 to 3,500 miles", points: [1600, 2400, 3200, 3200, 4000, 4400, 4800, 5200, 5600, 6400] },
      { id: "int-5", name: "International: 3,501 to 5,000 miles", points: [2450, 3700, 4900, 4900, 6150, 6750, 7350, 7975, 8600, 9800] },
      { id: "int-6", name: "International: 5,001 to 6,500 miles", points: [2900, 4350, 5800, 5800, 7250, 8000, 8700, 9425, 10150, 11600] },
      { id: "int-7", name: "International: 6,501 miles and over", points: [4000, 6000, 8000, 8000, 10000, 11000, 12000, 13000, 14000, 16000] }
    ],
    // The status bonus on premium cabins is figured on the Flexible
    // Economy amount for the same route.
    bonusBaseFare: "flex-y",
    statuses: [
      { id: "bronze", name: "Bronze", bonus: 0 },
      { id: "silver", name: "Silver", bonus: 0.5 },
      { id: "gold", name: "Gold", bonus: 0.75 },
      { id: "platinum", name: "Platinum", bonus: 1 },
      { id: "platinum-one", name: "Platinum One", bonus: 1 }
    ],
    note: "Qantas awards a fixed number of points per flight by fare and distance. Silver, Gold, and Platinum add 50%, 75%, and 100%; in Premium Economy, Business, and First the bonus is figured on the Flexible Economy amount. Some routes, such as Australia to New Zealand, the USA, or Europe, have their own tables; this estimate uses the general distance bands. A minimum points guarantee may raise short flights."
  };

  P.qatar = {
    name: "Qatar Airways | Privilege Club",
    country: "QA",
    unit: "Avios",
    method: "distance",
    centsPerPoint: 1.2,
    defaultFareType: "econ-conv",
    // Share of the flight distance earned, by booking class.
    fareTypes: [
      { id: "first", name: "First Elite (F, A)", rate: 3 },
      { id: "bus-elite", name: "Business Elite (C, J)", rate: 2 },
      { id: "bus-comfort", name: "Business Comfort (I, D)", rate: 1.75 },
      { id: "bus-classic", name: "Business Classic (R)", rate: 1.25 },
      { id: "bus-lite", name: "Business Lite (P)", rate: 0.75 },
      { id: "econ-comfort", name: "Economy Comfort (H, B, Y)", rate: 1 },
      { id: "econ-conv", name: "Economy Convenience (S, V, L, M, K)", rate: 0.75 },
      { id: "econ-classic", name: "Economy Classic (O, T, Q, N)", rate: 0.5 },
      { id: "econ-lite", name: "Economy Lite (W)", rate: 0.25 }
    ],
    statuses: [
      { id: "burgundy", name: "Burgundy", multiplier: 1 },
      { id: "silver", name: "Silver", multiplier: 1.25 },
      { id: "gold", name: "Gold", multiplier: 1.75 },
      { id: "platinum", name: "Platinum", multiplier: 2 }
    ],
    note: "Privilege Club earns a share of the miles flown set by booking class, from 25% in Economy Lite to 300% in First. Silver, Gold, and Platinum add 25%, 75%, and 100%."
  };
})();

/* Asia and the Middle East: Japan, Hong Kong, the UAE, Taiwan, Singapore, and Malaysia. */
(function () {
  var P = window.PROGRAMS;

  P.ana = {
    name: "ANA | ANA Mileage Club",
    country: "JP",
    currency: "JPY",
    unit: "miles",
    method: "distance",
    defaultFareType: "y-mid",
    // Share of the flight distance earned, by booking class (international).
    fareTypes: [
      { id: "f", name: "First (F, A)", rate: 1.5 },
      { id: "j", name: "Business (J)", rate: 1.5 },
      { id: "c", name: "Business (C, D, Z)", rate: 1.25 },
      { id: "p", name: "Business (P)", rate: 0.7 },
      { id: "pe", name: "Premium Economy (G, E)", rate: 1 },
      { id: "pe-low", name: "Premium Economy (N)", rate: 0.7 },
      { id: "y", name: "Economy (Y, B, M)", rate: 1 },
      { id: "y-mid", name: "Economy (U, H, Q)", rate: 0.7 },
      { id: "y-low", name: "Economy (V, W, S)", rate: 0.5 },
      { id: "y-lowest", name: "Economy (L, K)", rate: 0.3 }
    ],
    statuses: [
      { id: "member", name: "ANA Mileage Club Member", multiplier: 1 },
      { id: "bronze", name: "Bronze", multiplier: 1.4 },
      { id: "platinum", name: "Platinum", multiplier: 1.9 },
      { id: "diamond", name: "Diamond", multiplier: 2.15 }
    ],
    note: "ANA earns a share of the flight distance set by booking class. Bronze, Platinum, and Diamond add 40%, 90%, and 115% in the first status year, and more in later years or with an ANA Gold or Premium card. O, I, R, and X fares do not earn miles. Japanese ANA cards are not included."
  };

  P.jal = {
    name: "Japan Airlines | JAL Mileage Bank",
    country: "JP",
    currency: "JPY",
    unit: "miles",
    method: "distance",
    defaultFareType: "y-mid",
    // Share of the flight distance earned, by booking class (international).
    fareTypes: [
      { id: "f", name: "First (F, A)", rate: 1.5 },
      { id: "j", name: "Business (J, C, D, I)", rate: 1.25 },
      { id: "x", name: "Business (X)", rate: 0.7 },
      { id: "pe", name: "Premium Economy (W, R)", rate: 1 },
      { id: "pe-low", name: "Premium Economy (E)", rate: 0.7 },
      { id: "y", name: "Economy (Y, B)", rate: 1 },
      { id: "y-mid", name: "Economy (H, K, M)", rate: 0.7 },
      { id: "y-low", name: "Economy (L, V, S)", rate: 0.5 },
      { id: "y-lowest", name: "Economy (O, G, Q, N)", rate: 0.3 }
    ],
    statuses: [
      { id: "member", name: "JMB Member", multiplier: 1 },
      { id: "jgc", name: "JAL Global Club", multiplier: 1.35 },
      { id: "crystal", name: "JMB Crystal", multiplier: 1.55 },
      { id: "sapphire", name: "JMB Sapphire", multiplier: 2.05 },
      { id: "jgc-premier", name: "JGC Premier", multiplier: 2.05 },
      { id: "diamond", name: "JMB Diamond", multiplier: 2.3 }
    ],
    note: "JAL earns a share of the flight distance set by booking class, and status adds a 35% to 130% mile-up bonus. Fare classes not listed do not earn miles. Japanese JAL cards are not included."
  };

  /* SAS EuroBonus: a fixed number of points per SAS flight, set by route
     region and ticket type (booking class). Silver, Gold, and Diamond add
     25%, 50%, and 75% to Bonus points. Values from SAS's published tables. */
  P.sas = {
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
    note: "EuroBonus pays a fixed number of points per one-way SAS flight, set by the route region and ticket type. Silver, Gold, and Diamond earn 25%, 50%, and 75% more Bonus points. Level points stay at the base amount. SK flights operated by SkyTeam partners earn by distance instead and are not covered here."
  };

  /* Fiji Airways uses AAdvantage. Flights sold by Fiji Airways (FJ flight
     numbers) earn on the ticket price at American's rates. */
  P.fiji = Object.assign({}, P.american, {
    name: "Fiji Airways | AAdvantage",
    country: "FJ",
    cards: null,
    note: "Fiji Airways uses AAdvantage. Flights sold by Fiji Airways earn 5 to 11 miles per US dollar on the base fare and carrier-imposed fees, by status, like American flights. Government taxes do not earn. LITE fares bought on or after 17 December 2025 earn nothing. Fiji fares are often priced in Fiji dollars, so enter the US dollar equivalent. Earning is capped at 75,000 miles per ticket."
  });

  /* Fortune Wings Club on Hong Kong Airlines, for tickets issued on or
     after 20 September 2025. Award points follow the HK$ spent, rounded to
     the nearest HK$10. Fare classes R, G, O, E, A, F, and P do not earn. */
  P.hongkongairlines = {
    name: "Hong Kong Airlines | Fortune Wings Club",
    country: "HK",
    currency: "HKD",
    unit: "points",
    method: "spend",
    roundSpendTo: 10,
    // 10 base points per HK$10, plus the status bonus per HK$10.
    statuses: [
      { id: "member", name: "Fortune Wings", rate: 1 },
      { id: "select", name: "Select Card", rate: 1.1 },
      { id: "silver", name: "Silver Card", rate: 1.3 },
      { id: "gold", name: "Gold Card", rate: 1.6 },
      { id: "platinum", name: "Platinum Card", rate: 1.8 }
    ],
    note: "Fortune Wings Club earns 10 base points per HK$10 of base fare and carrier surcharges on Hong Kong Airlines, for tickets issued on or after 20 September 2025, plus a status bonus of 1, 3, 6, or 8 points per HK$10 for Select, Silver, Gold, and Platinum. The basic Fortune Wings tier earns no bonus. Spending is rounded to the nearest HK$10. Classes R, G, O, E, A, F, and P earn nothing. Taxes do not earn, and codeshare and some special tickets follow other rules. Enter fares in Hong Kong dollars."
  };

  P.cathay = {
    name: "Cathay Pacific | Asia Miles",
    country: "HK",
    currency: "HKD",
    unit: "Asia Miles",
    method: "zone",
    defaultFareType: "y-ess",
    // Fixed Asia Miles per flight from Cathay's table effective 20 August 2025.
    fareTypes: [
      { id: "f", name: "First (F, A) Flex" },
      { id: "j", name: "Business (J, C) Flex" },
      { id: "d", name: "Business (D, P, I) Essential or Light" },
      { id: "w", name: "Premium Economy (W, R) Flex" },
      { id: "e", name: "Premium Economy (E) Essential" },
      { id: "y-flex", name: "Economy (Y, B, H, K) Flex" },
      { id: "y-ess", name: "Economy (Y, B, H, K) Essential" },
      { id: "y-light", name: "Economy (Y, B, H, K) Light" },
      { id: "m-flex", name: "Economy (M, L, V) Flex" },
      { id: "m-ess", name: "Economy (M, L, V) Essential" },
      { id: "m-light", name: "Economy (M, L, V) Light" },
      { id: "s-flex", name: "Economy (S, N, Q, O) Flex" },
      { id: "s-ess", name: "Economy (S, N, Q, O) Essential" },
      { id: "s-light", name: "Economy (S, N, Q, O) Light" }
    ],
    // Each zone's points list follows the fareTypes order. Zones are
    // measured from Hong Kong.
    zones: [
      { id: "ultra-short", name: "Ultra-short: 1 to 750 miles (Hanoi, Manila, Taipei)", points: [3500, 3000, 2500, 2500, 1500, 2500, 1500, 1000, 2000, 1000, 600, 1500, 500, 300] },
      { id: "short1", name: "Short, Type 1: 751 to 2,750 miles (Beijing, Seoul, Singapore)", points: [4500, 4000, 3500, 3000, 2000, 3000, 2000, 1500, 2500, 1500, 1000, 2000, 1000, 600] },
      { id: "short2", name: "Short, Type 2: 751 to 2,750 miles to Japan, India, Indonesia, Sri Lanka, Nepal, Bangladesh", points: [6000, 5000, 4500, 3500, 2500, 3500, 2500, 1800, 3000, 2000, 1200, 2500, 1500, 800] },
      { id: "medium", name: "Medium: 2,751 to 5,000 miles (Dubai, Melbourne, Sydney)", points: [11000, 9000, 7500, 6000, 4500, 4800, 3800, 3000, 4200, 3200, 2200, 3200, 2200, 1500] },
      { id: "long", name: "Long: 5,001 to 7,500 miles (London, Paris, San Francisco)", points: [16000, 13000, 10000, 8000, 6500, 7000, 6000, 4000, 6000, 5000, 3200, 3800, 2800, 1800] },
      { id: "ultra-long", name: "Ultra-long: 7,501 miles or more (Chicago, New York, Toronto)", points: [18000, 15000, 12000, 10000, 8500, 9000, 7000, 5000, 8000, 6000, 4000, 4500, 3500, 2500] }
    ],
    statuses: [
      { id: "green", name: "Green", bonus: 0 },
      { id: "silver", name: "Silver", bonus: 0 },
      { id: "gold", name: "Gold", bonus: 0 },
      { id: "diamond", name: "Diamond", bonus: 0 }
    ],
    // US card (Synchrony): Asia Miles per US dollar on Cathay Pacific and
    // HK Express purchases.
    cards: [
      { id: "cathay-wemc", name: "Cathay World Elite Mastercard (US)", rate: 3, currency: "USD" }
    ],
    note: "Cathay Pacific awards a fixed number of Asia Miles per flight, set by fare type and distance zone from Hong Kong. Cathay's published table is the same for every status level. It covers flights marketed by Cathay Pacific and departing on or after 20 August 2025. The US Cathay World Elite Mastercard adds 3 Asia Miles per US dollar charged for the ticket."
  };

  P.etihad = {
    name: "Etihad Airways | Etihad Guest",
    country: "AE",
    currency: "USD",
    unit: "Guest Miles",
    method: "distance",
    defaultFareType: "y-value",
    // Share of the route's base distance earned, by fare brand, on tickets
    // issued by Etihad (from the notes of Etihad's miles calculator).
    fareTypes: [
      { id: "y-basic", name: "Economy Basic", rate: 0.05 },
      { id: "y-value", name: "Economy Value", rate: 0.35 },
      { id: "y-comfort", name: "Economy Comfort", rate: 0.75 },
      { id: "y-deluxe", name: "Economy Deluxe", rate: 1.25 },
      { id: "j-value", name: "Business Value", rate: 1 },
      { id: "j-comfort", name: "Business Comfort", rate: 1.5 },
      { id: "j-deluxe", name: "Business Deluxe", rate: 2.5 },
      { id: "f-comfort", name: "First Comfort", rate: 2 },
      { id: "f-deluxe", name: "First Deluxe", rate: 3 }
    ],
    // The tier bonus is a share of the base distance added on top.
    statuses: [
      { id: "member", name: "Etihad Guest Member", bonus: 0 },
      { id: "silver", name: "Silver", bonus: 0.25 },
      { id: "gold", name: "Gold", bonus: 0.5 },
      { id: "platinum", name: "Platinum", bonus: 1 },
      { id: "emerald", name: "Emerald", bonus: 1 }
    ],
    note: "Etihad Guest earns a share of the route's base distance set by fare brand, from 5% in Economy Basic to 300% in First Deluxe. Silver, Gold, and Platinum or Emerald add 25%, 50%, or 100% of the base distance. Etihad's base distance for a route can differ slightly from the miles flown. Economy Basic earned 15% on tickets issued before 18 June 2026."
  };

  P.eva = {
    name: "EVA Air | Infinity MileageLands",
    country: "TW",
    currency: "TWD",
    unit: "Award Miles",
    method: "distance",
    defaultFareType: "y-std",
    // Share of the ticketed distance by booking class and fare family, on
    // flights flown and marketed by EVA Air or UNI Air.
    fareTypes: [
      { id: "j-up", name: "Business Up (C)", rate: 1.75 },
      { id: "j-std", name: "Business Standard (J)", rate: 1.5 },
      { id: "j-basic", name: "Business Basic (D)", rate: 1.25 },
      { id: "pe-up", name: "Premium Economy Up (K)", rate: 1.25 },
      { id: "pe-std", name: "Premium Economy Standard (T, L)", rate: 1.15 },
      { id: "pe-basic", name: "Premium Economy Basic (P)", rate: 1 },
      { id: "y-up", name: "Economy Up (Y, B)", rate: 1 },
      { id: "y-std", name: "Economy Standard (Q, H, M)", rate: 0.75 },
      { id: "y-basic", name: "Economy Basic (V, W, S)", rate: 0.5 },
      { id: "y-discount", name: "Economy Discount (A)", rate: 0 }
    ],
    statuses: [
      { id: "green", name: "Green Card", multiplier: 1 },
      { id: "silver", name: "Silver Card", multiplier: 1.15 },
      { id: "gold", name: "Gold Card", multiplier: 1.25 },
      { id: "diamond", name: "Diamond Card", multiplier: 1.25 }
    ],
    note: "EVA Air earns a share of the ticketed distance set by booking class, from 50% in Economy Basic to 175% in Business Up. Economy Discount (A) and group fares earn nothing. Silver Card adds 15%, and Gold and Diamond Card add 25% on international EVA Air and UNI Air flights."
  };

  P.chinaairlines = {
    name: "China Airlines | Dynasty Flyer",
    country: "TW",
    currency: "TWD",
    unit: "miles",
    method: "distance",
    defaultFareType: "y-std",
    // Share of the distance flown by booking class and fare family, on
    // flights operated by China Airlines or Mandarin Airlines.
    fareTypes: [
      { id: "j-flex", name: "Business Flex (J)", rate: 1.75 },
      { id: "j-std", name: "Business Standard (C)", rate: 1.5 },
      { id: "j-basic", name: "Business Basic (D)", rate: 1.25 },
      { id: "pe-flex", name: "Premium Economy Flex (W, U)", rate: 1.25 },
      { id: "pe-std", name: "Premium Economy Standard (A)", rate: 1.15 },
      { id: "pe-basic", name: "Premium Economy Basic (E)", rate: 1 },
      { id: "y-flex", name: "Economy Flex (Y, B, M)", rate: 1 },
      { id: "y-std", name: "Economy Standard (K, V, T)", rate: 0.8 },
      { id: "y-basic", name: "Economy Basic (R, Q, H, N)", rate: 0.5 },
      { id: "y-discount", name: "Economy Discount (L)", rate: 0 }
    ],
    statuses: [
      { id: "dynasty", name: "Dynasty", multiplier: 1 },
      { id: "gold", name: "Gold", multiplier: 1.15 },
      { id: "emerald", name: "Emerald", multiplier: 1.25 },
      { id: "paragon", name: "Paragon", multiplier: 1.3 }
    ],
    note: "Dynasty Flyer earns a share of the distance flown set by booking class, from 50% in Economy Basic to 175% in Business Flex. Economy Discount (L) earns nothing. Gold, Emerald, and Paragon receive 15%, 25%, or 30% incentive miles; China Airlines does not say whether these apply to the class miles or the distance, so this estimate applies them to the class miles."
  };

  P.starlux = {
    name: "STARLUX Airlines | COSMILE",
    country: "TW",
    currency: "TWD",
    unit: "COSMILE miles",
    method: "distance",
    defaultFareType: "y-basic",
    // Share of the ticketed distance (IATA TPM) by booking class, on
    // STARLUX flight numbers (from STARLUX's mileage accrual page).
    fareTypes: [
      { id: "f", name: "First Full (F, A)", rate: 2 },
      { id: "j-full", name: "Business Full (J)", rate: 1.75 },
      { id: "j-basic", name: "Business Basic (C)", rate: 1.5 },
      { id: "j-saving", name: "Business Saving (D)", rate: 1.3 },
      { id: "pe-full", name: "Premium Economy Full (W)", rate: 1.25 },
      { id: "pe-basic", name: "Premium Economy Basic (R)", rate: 1.15 },
      { id: "pe-saving", name: "Premium Economy Saving (E)", rate: 1.05 },
      { id: "y-full", name: "Economy Full (Y, B, H)", rate: 1 },
      { id: "y-basic", name: "Economy Basic (K, M, L)", rate: 0.8 },
      { id: "y-saving", name: "Economy Saving (V, S, N)", rate: 0.6 },
      { id: "y-limited", name: "Economy Limited (Q)", rate: 0 }
    ],
    statuses: [
      { id: "traveler", name: "TRAVELER", multiplier: 1 },
      { id: "adventurer", name: "ADVENTURER", multiplier: 1.15 },
      { id: "explorer", name: "EXPLORER", multiplier: 1.25 },
      { id: "insighter", name: "INSIGHTER", multiplier: 1.25 }
    ],
    note: "COSMILE earns a share of the ticketed distance set by booking class, from 60% in Economy Saving to 200% in First. Economy Limited (Q) earns nothing. ADVENTURER adds 15%, and EXPLORER and INSIGHTER add 25%, on flights operated by STARLUX."
  };

  P.krisflyer = {
    name: "Singapore Airlines | KrisFlyer",
    country: "SG",
    currency: "SGD",
    unit: "KrisFlyer miles",
    method: "distance",
    defaultFareType: "y-mid",
    // Share of miles flown by booking class (chart dated 12 January 2026).
    // noBonus fares do not get the 25% tier bonus.
    fareTypes: [
      { id: "f", name: "Suites or First (A, F)", rate: 2 },
      { id: "j", name: "Business (C, J, Z)", rate: 1.5 },
      { id: "j-low", name: "Business (D, U)", rate: 1.25 },
      { id: "pe", name: "Premium Economy (S, T)", rate: 1.25 },
      { id: "pe-low", name: "Premium Economy (R, L, P)", rate: 1 },
      { id: "y", name: "Economy (B, E, Y)", rate: 1 },
      { id: "y-mid", name: "Economy (H, M, W)", rate: 0.75 },
      { id: "y-low", name: "Economy (K, N, Q, V, G)", rate: 0.5, noBonus: true }
    ],
    statuses: [
      { id: "member", name: "KrisFlyer Member", multiplier: 1 },
      { id: "elite-silver", name: "Elite Silver", multiplier: 1.25 },
      { id: "elite-gold", name: "Elite Gold", multiplier: 1.25 },
      { id: "pps", name: "PPS Club", multiplier: 1.25 },
      { id: "solitaire", name: "Solitaire PPS Club", multiplier: 1.25 }
    ],
    note: "KrisFlyer earns a share of the miles flown set by booking class, from 50% to 200%. Elite Silver, Elite Gold, and PPS Club members get a 25% tier bonus, except on Economy K, N, Q, V, and G. Scoot flights do not get the tier bonus."
  };

  P.enrich = {
    name: "Malaysia Airlines | Enrich",
    country: "MY",
    currency: "MYR",
    unit: "Enrich Points",
    method: "spend",
    statuses: [
      { id: "blue", name: "Blue", rate: 1.5 },
      { id: "silver", name: "Silver", rate: 1.8 },
      { id: "gold", name: "Gold", rate: 2.2 },
      { id: "platinum", name: "Platinum", rate: 2.5 }
    ],
    note: "Since 1 January 2026, Enrich earns 1.5 to 2.5 points per ringgit spent on Malaysia Airlines and Firefly flights, by status. Enter fares in ringgit."
  };
})();

/* Alliance airlines added November 2026, from the airlines' published
   earning tables (as collected on cwsi.net). */
(function () {
  var P = window.PROGRAMS;

  /* Air New Zealand: fixed Airpoints per one-way flight by route group,
     fare, and booking class (each zone's points follow fareTypes order). */
  P.airnz = {
    name: "Air New Zealand | Koru",
    country: "NZ",
    currency: "NZD",
    unit: "Airpoints",
    method: "zone",
    decimals: true,
    defaultFareType: "y",
    zoneLabel: "Route group and fare",
    zoneHint: "Air New Zealand pays a fixed number of Airpoints per one-way flight for each route group, fare, and booking class.",
    fareTypes: [
      { id: "c", name: "Business Premier (C)" },
      { id: "d", name: "Business Premier (D)" },
      { id: "z", name: "Business Premier (Z)" },
      { id: "j", name: "Business Premier (J)" },
      { id: "u", name: "Premium Economy (U)" },
      { id: "e", name: "Premium Economy (E)" },
      { id: "o", name: "Premium Economy (O)" },
      { id: "a", name: "Premium Economy (A)" },
      { id: "y", name: "Economy (Y)" },
      { id: "b", name: "Economy (B)" },
      { id: "m", name: "Economy (M)" },
      { id: "h", name: "Economy (H)" },
      { id: "q", name: "Economy (Q)" },
      { id: "v", name: "Economy (V)" },
      { id: "w", name: "Economy (W)" },
      { id: "t", name: "Economy (T)" },
      { id: "l", name: "Economy (L)" },
      { id: "s", name: "Economy (S)" },
      { id: "g", name: "Economy (G)" },
      { id: "k", name: "Economy (K)" },
      { id: "p", name: "Economy (P)" },
      { id: "f", name: "Economy (F)" }
    ],
    zones: [
      { id: "domestic-1-0", name: "Domestic 1: AKL to CHC, DUD, WLG, ZQN, Seat fare", points: [null, null, null, null, null, null, null, null, 14, 12, 10, 9, 8, 6, 5, 4, 3, 2, 2, 1, 1, 0] },
      { id: "domestic-1-1", name: "Domestic 1: AKL to CHC, DUD, WLG, ZQN, Seat+Bag fare", points: [null, null, null, null, null, null, null, null, 14, 12, 10, 9, 8, 6, 5, 4, 3, 2, 2, 1, 1, 0] },
      { id: "domestic-1-2", name: "Domestic 1: AKL to CHC, DUD, WLG, ZQN, Flexi Change fare", points: [null, null, null, null, null, null, null, null, 16, 14, 12, 11, 10, 8, 7, 6, 5, 4, 4, 3, 3, 0] },
      { id: "domestic-1-3", name: "Domestic 1: AKL to CHC, DUD, WLG, ZQN, Flexi Refund fare", points: [null, null, null, null, null, null, null, null, 18, 16, 14, 13, 12, 10, 9, 8, 7, 6, 6, 5, 5, 0] },
      { id: "domestic-2-0", name: "Domestic 2: AKL to BHE, GIS, KKE, NPE, NPL, NSN, PMR, ROT, TRG, TUO, ..., Seat fare", points: [null, null, null, null, null, null, null, null, 12, 10, 8, 7, 6, 5, 4, 3.5, 3, 2.5, 2, 1, 1, 0] },
      { id: "domestic-2-1", name: "Domestic 2: AKL to BHE, GIS, KKE, NPE, NPL, NSN, PMR, ROT, TRG, TUO, ..., Seat+Bag fare", points: [null, null, null, null, null, null, null, null, 12, 10, 8, 7, 6, 5, 4, 3.5, 3, 2.5, 2, 1, 1, 0] },
      { id: "domestic-2-2", name: "Domestic 2: AKL to BHE, GIS, KKE, NPE, NPL, NSN, PMR, ROT, TRG, TUO, ..., Flexi Change fare", points: [null, null, null, null, null, null, null, null, 14, 12, 10, 9, 8, 7, 6, 5.5, 5, 4.5, 4, 3, 3, 0] },
      { id: "domestic-2-3", name: "Domestic 2: AKL to BHE, GIS, KKE, NPE, NPL, NSN, PMR, ROT, TRG, TUO, ..., Flexi Refund fare", points: [null, null, null, null, null, null, null, null, 16, 14, 12, 11, 10, 9, 8, 7.5, 7, 6.5, 6, 5, 5, 0] },
      { id: "domestic-3-0", name: "Domestic 3: AKL to IVC, Seat fare", points: [null, null, null, null, null, null, null, null, 23, 20, 17, 15, 13, 11, 9, 7, 5, 4, 3, 2, 1.5, 0] },
      { id: "domestic-3-1", name: "Domestic 3: AKL to IVC, Seat+Bag fare", points: [null, null, null, null, null, null, null, null, 23, 20, 17, 15, 13, 11, 9, 7, 5, 4, 3, 2, 1.5, 0] },
      { id: "domestic-3-2", name: "Domestic 3: AKL to IVC, Flexi Change fare", points: [null, null, null, null, null, null, null, null, 25, 22, 19, 17, 15, 13, 11, 9, 7, 6, 5, 4, 3.5, 0] },
      { id: "domestic-3-3", name: "Domestic 3: AKL to IVC, Flexi Refund fare", points: [null, null, null, null, null, null, null, null, 27, 24, 21, 19, 17, 15, 13, 11, 9, 8, 7, 6, 5.5, 0] },
      { id: "tasman-1-0", name: "Tasman 1: AKL to BNE, HBA, MCY, MEL, OOL, SYD, Seat fare", points: [71, 58.4, 47.9, 40.1, 38.1, 25.1, 17.1, 14.1, 15.6, 12.2, 10.8, 8.9, 7.4, 5.9, 4.9, 4.2, 2.8, 2.1, 2, 1.7, 1.5, 0] },
      { id: "tasman-1-1", name: "Tasman 1: AKL to BNE, HBA, MCY, MEL, OOL, SYD, Seat+Bag fare", points: [71, 58.4, 47.9, 40.1, 38.1, 25.1, 17.1, 14.1, 15.9, 12.3, 11.4, 9.6, 8.1, 6.6, 5.5, 4.8, 3.4, 2.6, 2.5, 2.2, 2, 0] },
      { id: "tasman-1-2", name: "Tasman 1: AKL to BNE, HBA, MCY, MEL, OOL, SYD, The Works, Works Flexi fare", points: [71, 58.4, 47.9, 40.1, 38.1, 25.1, 17.1, 14.1, 24.7, 18.9, 17.6, 14.8, 12.7, 10.4, 8.6, 7.6, 5.8, 4.6, 3.8, 3.4, 3, 0] },
      { id: "tasman-2-0", name: "Tasman 2: ADL to AKL, Seat fare", points: [110, 93, 83, 77, 61.8, 57.8, 53.8, 39.8, 18.5, 14.5, 12.5, 10.5, 8.5, 7.9, 6.9, 5, 4.9, 3, 2.8, 2.4, 2.1, 0] },
      { id: "tasman-2-1", name: "Tasman 2: ADL to AKL, Seat+Bag fare", points: [110, 93, 83, 77, 61.8, 57.8, 53.8, 39.8, 19, 15, 13, 11, 9, 8, 7, 5.9, 5, 3, 2.8, 2.6, 2.4, 0] },
      { id: "tasman-2-2", name: "Tasman 2: ADL to AKL, The Works, Works Flexi fare", points: [110, 93, 83, 77, 61.8, 57.8, 53.8, 39.8, 30, 25, 21, 18, 15, 13, 11, 10, 8, 5, 4.6, 4.3, 4, 0] },
      { id: "tasman-3-0", name: "Tasman 3: AKL to PER, Seat fare", points: [153, 127, 113, 105, 93.1, 71.3, 57.3, 51.3, 24.9, 20.9, 17.9, 14.9, 12.9, 11.9, 10.9, 9.9, 8.9, 5.9, 5.3, 4.7, 4.2, 0] },
      { id: "tasman-3-1", name: "Tasman 3: AKL to PER, Seat+Bag fare", points: [153, 127, 113, 105, 93.1, 71.3, 57.3, 51.3, 24.9, 20.9, 17.9, 14.9, 13.9, 11.9, 10.9, 9.9, 8.9, 5.9, 5.7, 5.3, 5, 0] },
      { id: "tasman-3-2", name: "Tasman 3: AKL to PER, The Works, Works Flexi fare", points: [153, 127, 113, 105, 93.1, 71.3, 57.3, 51.3, 41.4, 35.6, 29.8, 25.9, 22.2, 19.2, 16.9, 15.5, 13.4, 13.1, 12.6, 12.1, 11.6, 0] },
      { id: "pacific-islands-1-0", name: "Pacific Islands 1: AKL to APW, IUE, NAN, NOU, RAR, TBU, Seat fare", points: [70, 62, 42, 36.5, 29.5, 27.5, 25.5, 19.8, 14.6, 13.9, 12.3, 10.7, 9.5, 7.6, 6.6, 5.4, 4.5, 3.2, 6.6, 4.5, 3.2, 0] },
      { id: "pacific-islands-1-1", name: "Pacific Islands 1: AKL to APW, IUE, NAN, NOU, RAR, TBU, Seat+Bag fare", points: [70, 62, 42, 36.5, 29.5, 27.5, 25.5, 19.8, 15.6, 15.3, 13.4, 11.6, 10.3, 8.2, 7.3, 6, 5.1, 3.8, 7.3, 5.1, 3.8, 0] },
      { id: "pacific-islands-1-2", name: "Pacific Islands 1: AKL to APW, IUE, NAN, NOU, RAR, TBU, The Works, Works Flexi fare", points: [70, 62, 42, 36.5, 29.5, 27.5, 25.5, 19.8, 24.2, 22.4, 20, 17.4, 15.8, 12.7, 11.3, 9.4, 8.1, 6.1, 11.3, 8.1, 6.1, 0] },
      { id: "pacific-islands-2-0", name: "Pacific Islands 2: AKL to PPT, Seat fare", points: [125, 97, 86, 80, 65, 60, 56, 43, 23.5, 19.9, 17.9, 13.9, 12.9, 11.9, 9.9, 8.9, 7.9, 4.9, 10.9, 8.9, 6, 0] },
      { id: "pacific-islands-2-1", name: "Pacific Islands 2: AKL to PPT, Seat+Bag fare", points: [125, 97, 86, 80, 65, 60, 56, 43, 24.5, 19.9, 17.9, 14.9, 12.9, 11.9, 10.9, 8.9, 8.9, 5.9, 10.9, 8.9, 6.9, 0] },
      { id: "pacific-islands-2-2", name: "Pacific Islands 2: AKL to PPT, The Works, Works Flexi fare", points: [125, 97, 86, 80, 65, 60, 56, 43, 36.3, 30.7, 28.7, 25, 23.6, 20.6, 16.7, 14.1, 12.4, 9.2, 16.7, 12.4, 9.2, 0] },
      { id: "pacific-long-haul-1-0", name: "Pacific long haul 1: AKL to JFK", points: [526.9, 493.7, 411.7, 331.6, 213.3, 186.7, 149.1, 130, 110.7, 107.1, 89.3, 78.2, 59.3, 58.3, 52, 50.2, 48, 38.7, 20.5, 18.5, 15, 0] },
      { id: "pacific-long-haul-2-0", name: "Pacific long haul 2: AKL to LAX, SFO", points: [457.4, 421.6, 370, 291.7, 169.2, 147.2, 135, 123.5, 83, 80.7, 72.8, 62.6, 56.9, 52.8, 42.5, 38.8, 37, 31.6, 17.6, 14.5, 13, 0] },
      { id: "pacific-long-haul-3-0", name: "Pacific long haul 3: AKL to ORD", points: [506.9, 473.7, 391.7, 330, 184.1, 172, 140, 125, 101.7, 98.1, 80.3, 69.2, 50.3, 49.3, 43, 41.2, 39, 37, 18.7, 16.5, 12, null] },
      { id: "pacific-long-haul-4-0", name: "Pacific long haul 4: AKL to YVR", points: [492.9, 428.5, 321.1, 231.5, 190.3, 152.8, 115.6, 93.3, 81.1, 75, 71.4, 62.7, 48.8, 47.3, 41.9, 40.9, 38, 33.3, 16.2, 16, 15, 0] },
      { id: "pacific-long-haul-5-0", name: "Pacific long haul 5: AKL to HNL", points: [343, 294, 248, 206, 140, 109, 77, 62, 58, 46, 39, 32, 27, 23, 20, 18, 16, 15, 13, 12, 12, 0] },
      { id: "pacific-long-haul-6-0", name: "Pacific long haul 6: AKL to IAH", points: [458, 425.8, 370.7, 290.5, 172.6, 158.9, 140, 129.8, 85.2, 82.3, 74.2, 64.6, 57.9, 51.3, 44.1, 42, 40, 32.7, 18.7, 16.5, 12, 0] },
      { id: "asia-1-0", name: "Asia 1: AKL to DPS", points: [331, 189, 168, 133, 147, 93, 82, 72, 62, 45, 39, 33, 30, 27, 24, 22, 21, 19, 18, 18, 18, 0] },
      { id: "asia-2-0", name: "Asia 2: AKL to HKG, PEK", points: [263, 239, 217, 196, 137, 122, 110, 90, 72, 62, 53, 48, 46, 44, 43, 42, 36, 34, 19, 15, 12, 0] },
      { id: "asia-3-0", name: "Asia 3: AKL to ICN", points: [264, 224, 208, 177, 140, 125, 114, 83, 77, 66, 59, 54, 48, 44, 41, 40, 38, 34, 20, 18, 15, 0] },
      { id: "asia-4-0", name: "Asia 4: AKL to PVG", points: [295, 237, 215, 194, 135, 120, 108, 88, 71, 61, 58, 53, 45, 43, 42, 40, 35, 33, 18.5, 14.5, 10, 0] },
      { id: "asia-5-0", name: "Asia 5: AKL to SIN", points: [240, 216, 198, 186, 128, 114, 103, 82, 65, 56, 51, 48, 44, 41, 39, 37, 34, 32, 29, 24.5, 19.5, 0] },
      { id: "asia-6-0", name: "Asia 6: AKL to TPE", points: [215, 187, 166, 152, 144, 126, 109, 66, 73, 63, 58, 53, 48, 43, 38.5, 36.5, 33.5, 31.5, 16.8, 15.8, 14, 0] },
      { id: "japan-1-0", name: "Japan 1: AKL to NRT", points: [316, 269.8, 241.4, 219, 135, 122, 113.9, 83, 75.6, 64.4, 57.6, 53.1, 46, 45, 40, 38, 35, 32, 17.9, 14.9, 11.9, 0] }
    ],
    statuses: [
      { id: "bronze", name: "Koru Bronze", bonus: 0 },
      { id: "silver", name: "Koru Silver", bonus: 0 },
      { id: "gold", name: "Koru Gold", bonus: 0 },
      { id: "platinum", name: "Koru Platinum", bonus: 0 },
      { id: "black", name: "Koru Black", bonus: 0 }
    ],
    note: "Koru pays a fixed number of Airpoints per one-way flight, set by route group, fare, and booking class; one Airpoint is worth NZ$1. Tiers earn bonus Status Points, not extra Airpoints. Domestic flights are Economy only. Class F (Grabaseat Greenlight) earns no Airpoints, and N, I, R, and X earn nothing."
  };

  P.turkish = {
    name: "Turkish Airlines | Miles&Smiles",
    country: "TR",
    unit: "Miles",
    method: "distance",
    defaultFareType: "y-mid",
    zoneLabel: "Route type",
    zoneHint: "International flights earn a share of the distance; flights within Türkiye earn a fixed amount.",
    zones: [
      { id: "intl", name: "International" },
      { id: "domestic", name: "Within Türkiye", fixed: true }
    ],
    fareTypes: [
      { id: "j-high", name: "Business (C, D)", earn: [{ share: 1.5, min: 1500 }, { fixed: 1250 }], eliteEarn: [{ share: 1.75, min: 1750 }, { fixed: 1250 }] },
      { id: "j", name: "Business (K, J, Z)", earn: [{ share: 1.35, min: 1350 }, { fixed: 1000 }], eliteEarn: [{ share: 1.6, min: 1600 }, { fixed: 1000 }] },
      { id: "y-high", name: "Economy (Y, B)", earn: [{ share: 1.25, min: 1250 }, { fixed: 600 }] },
      { id: "y-mid", name: "Economy (M, H, S, E, Q, A, O)", earn: [{ share: 1, min: 1000 }, { fixed: 600 }] },
      { id: "y-low", name: "Economy (T, L, V, G)", earn: [{ share: 0.5, min: 500 }, { fixed: 300 }] },
      { id: "y-lowest", name: "Economy (W, P, F, U)", earn: [{ share: 0.25, min: 250 }, { fixed: 150 }] }
    ],
    statuses: [
      { id: "classic", name: "Classic" },
      { id: "classic-plus", name: "Classic Plus", elite: true },
      { id: "elite", name: "Elite", elite: true },
      { id: "elite-plus", name: "Elite Plus", elite: true }
    ],
    note: "Miles&Smiles earns a share of the distance by booking class on international flights, with a minimum per flight, and a fixed amount within Türkiye. Classic Plus, Elite, and Elite Plus earn more in Business."
  };

  P.korean = {
    name: "Korean Air | SKYPASS",
    country: "KR",
    unit: "miles",
    method: "distance",
    defaultFareType: "y",
    fareTypes: [
      { id: "f", name: "First (F)", rate: 2 },
      { id: "j-flex", name: "Prestige Flex (J)", rate: 1.35 },
      { id: "j", name: "Prestige Plus or Standard (C, D, I, R)", rate: 1.25 },
      { id: "pe-v", name: "Premium (V)", rate: 1.1 },
      { id: "pe-w", name: "Premium (W)", rate: 1 },
      { id: "y", name: "Economy (Y, B, M, S, H, E, K, L, U)", rate: 1 },
      { id: "y-low", name: "Economy (Q, T)", rate: 0.7 }
    ],
    statuses: [
      { id: "member", name: "SKYPASS Member", multiplier: 1 },
      { id: "morning-calm", name: "Morning Calm", multiplier: 1 },
      { id: "morning-calm-select", name: "Morning Calm Select", multiplier: 1 },
      { id: "million-miler", name: "Million Miler", multiplier: 1 }
    ],
    // US cards (U.S. Bank): miles per dollar on Korean Air tickets.
    cards: [
      { id: "skyblue", name: "SKYPASS SkyBlue Visa (US)", rate: 1 },
      { id: "sig", name: "SKYPASS Visa Signature (US)", rate: 2 },
      { id: "select", name: "SKYPASS Select Visa Signature (US)", rate: 3 }
    ],
    note: "SKYPASS earns the flight distance times the booking class percentage, from 70% to 200%, on Korean Air's current international fare table. Tiers add no bonus miles. The US SKYPASS cards add 1, 2, or 3 miles per dollar on Korean Air tickets charged to the SkyBlue Visa, Visa Signature, or Select Visa Signature."
  };

  /* PhoenixMiles: Air China. Kilometres flown times the
     class percentage, with a minimum per flight in km; the first value is for
     flights within mainland China, the second for international ones. */
  P.phoenix = {
    name: "Air China Group | PhoenixMiles",
    programName: "PhoenixMiles",
    country: "CN",
    unit: "PhoenixMiles",
    method: "distance",
    distanceFactor: 1.609344,
    defaultFareType: "m",
    zoneLabel: "Route type",
    zoneHint: "PhoenixMiles counts kilometres; enter the distance in miles and the calculator converts it.",
    zones: [
      { id: "mainland", name: "Within mainland China" },
      { id: "intl", name: "International and regional" }
    ],
    airlines: [
      { id: "ca", name: "Air China" }
    ],
    fareTypes: [
      { id: "f", name: "First (F)", earn: [{ share: 3, min: 1000 }, { share: 3, min: 1000 }] },
      { id: "a", name: "First (A)", earn: [{ share: 2, min: 1000 }, { share: 2.5, min: 1000 }] },
      { id: "j", name: "Business (J)", earn: [{ share: 3, min: 800 }, { share: 2.5, min: 800 }] },
      { id: "c", name: "Business (C)", earn: [{ share: 2, min: 800 }, { share: 2, min: 800 }] },
      { id: "d", name: "Business (D)", earn: [{ share: 1.5, min: 800 }, { share: 1.5, min: 800 }] },
      { id: "z", name: "Business (Z)", earn: [{ share: 1.25, min: 800 }, { share: 1.25, min: 800 }] },
      { id: "r", name: "Business (R)", earn: [{ share: 1.1, min: 800 }, { share: 1.25, min: 800 }] },
      { id: "g", name: "Premium Economy (G)", earn: [{ share: 1.1, min: 500 }, { share: 1.1, min: 500 }] },
      { id: "e", name: "Premium Economy (E)", earn: [{ share: 0.9, min: 500 }, { share: 0.9, min: 500 }] },
      { id: "y", name: "Economy (Y)", earn: [{ share: 1.1, min: 500 }, { share: 1.1, min: 500 }] },
      { id: "b", name: "Economy (B)", earn: [{ share: 1, min: 500 }, { share: 1.1, min: 500 }] },
      { id: "m", name: "Economy (M)", earn: [{ share: 1, min: 500 }, { share: 1, min: 500 }] },
      { id: "u", name: "Economy (U)", earn: [{ share: 1, min: 500 }, { share: 0.75, min: 500 }] },
      { id: "hqv", name: "Economy (H, Q, V)", earn: [{ share: 0.75, min: 500 }, { share: 0.75, min: 500 }] },
      { id: "wst", name: "Economy (W, S, T)", earn: [{ share: 0.5, min: 500 }, { share: 0.5, min: 500 }] },
      { id: "lkp", name: "Economy (L, K, P)", earn: [{ share: 0.25, min: 500 }, { share: 0.25, min: 500 }] }
    ],
    statuses: [
      { id: "member", name: "PhoenixMiles Member", multiplier: 1 },
      { id: "silver", name: "Silver", multiplier: 1.25 },
      { id: "gold", name: "Gold", multiplier: 1.3 },
      { id: "platinum", name: "Platinum", multiplier: 1.5 }
    ],
    note: "PhoenixMiles earns a share of the distance in kilometres by booking class, with a minimum per flight (500 km in Economy, 800 km in Business, 1,000 km in First). Silver, Gold, and Platinum earn 25%, 30%, and 50% extra; the airline does not say what the bonus is taken of, so this estimate applies it to the class miles."
  };

  P.aireuropa = {
    name: "Air Europa | SUMA",
    country: "ES",
    currency: "EUR",
    unit: "Suma Miles",
    method: "spend",
    roundUp: true,
    centsPerPoint: 1.0,
    defaultFareType: "y-eu",
    fareTypes: [
      { id: "y-eu", name: "Economy or Premium, Spain and Europe", rate: 5 },
      { id: "y-am", name: "Economy or Premium, America", rate: 6 },
      { id: "j-eu", name: "Business, Spain and Europe", rate: 8 },
      { id: "j-am", name: "Business, America", rate: 9 }
    ],
    // The level bonus is a share of the base 5 Miles per euro.
    statuses: [
      { id: "suma", name: "Suma", multiplier: 1 },
      { id: "silver", name: "Suma Silver", multiplier: 1, addRate: 2.5 },
      { id: "gold", name: "Suma Gold", multiplier: 1, addRate: 3.75 },
      { id: "platinum", name: "Suma Platinum", multiplier: 1, addRate: 5 }
    ],
    note: "SUMA earns per euro of the fare plus fuel surcharge: 5 in Spain and Europe, 6 on America flights, and 3 more in Business. Silver, Gold, and Platinum add 50%, 75%, or 100% of the base 5 per euro. Air Europa rounds up. Enter fares in euros."
  };

  P.chinaeastern = {
    name: "China Eastern | Eastern Miles",
    country: "CN",
    currency: "CNY",
    unit: "miles",
    method: "spend",
    defaultFareType: "direct",
    // Miles per yuan of fare plus fuel surcharge, by level and sales channel.
    fareTypes: [
      { id: "direct", name: "Booked on the China Eastern app, website, or 95530" },
      { id: "other", name: "Booked through another channel" }
    ],
    statuses: [
      { id: "1-star", name: "1-star member", rates: { direct: 0.264, other: 0.24 } },
      { id: "2-star", name: "2-star member", rates: { direct: 0.44, other: 0.4 } },
      { id: "3-star", name: "3-star member", rates: { direct: 0.66, other: 0.6 } },
      { id: "4-star", name: "4-star member", rates: { direct: 0.792, other: 0.72 } },
      { id: "5-star", name: "5-star member", rates: { direct: 0.88, other: 0.8 } },
      { id: "6-star", name: "6-star member", rates: { direct: 0.968, other: 0.88 } },
      { id: "silver", name: "Silver card", rates: { direct: 1.056, other: 0.96 } },
      { id: "gold", name: "Gold card", rates: { direct: 1.144, other: 1.04 } },
      { id: "platinum", name: "Platinum card", rates: { direct: 1.232, other: 1.12 } }
    ],
    note: "Eastern Miles earns on the price paid, fare plus fuel surcharge, on China Eastern, Shanghai Airlines, and China United tickets: 0.24 to 1.232 miles per yuan by level and sales channel. Enter fares in yuan."
  };

  /* Sky Pearl Club, rules since 1 January 2025. Tickets issued by China
     Southern (784) earn on the price paid; tickets issued by another airline
     earn on kilometres flown by booking class, with a 500 km minimum. */
  P.chinasouthern = {
    name: "China Southern | Sky Pearl Club",
    country: "CN",
    currency: "CNY",
    unit: "miles",
    method: "distance",
    roundUp: true,
    distanceFactor: 1.609344,
    minDistance: 500,
    earnLabel: "Who issued your ticket?",
    earnHint: "China Southern tickets have a ticket number starting with 784.",
    earnMethods: [
      { id: "price", name: "Ticket number starts with 784 (issued by China Southern)", rate: 0.8, noFareType: true },
      { id: "distance", name: "Ticket issued by another airline" }
    ],
    defaultFareType: "pbmh",
    fareTypes: [
      { id: "f", name: "First (F)", rate: 3 },
      { id: "j", name: "Business (J)", rate: 2.5 },
      { id: "c", name: "Business (C)", rate: 2 },
      { id: "d", name: "Business (D)", rate: 1.5 },
      { id: "i", name: "Business (I)", rate: 1.25 },
      { id: "w", name: "Sky Pearl Economy (W)", rate: 1.25 },
      { id: "s", name: "Sky Pearl Economy (S)", rate: 0.75 },
      { id: "y", name: "Economy (Y)", rate: 1.25 },
      { id: "pbmh", name: "Economy (P, B, M, H)", rate: 1 },
      { id: "kualq", name: "Economy (K, U, A, L, Q)", rate: 0.75 },
      { id: "evz", name: "Economy (E, V, Z)", rate: 0.25 },
      { id: "tn", name: "Economy (T, N)", rate: 0.25 }
    ],
    statuses: [
      { id: "member", name: "Sky Pearl Card", multiplier: 1 },
      { id: "silver", name: "Silver Card", multiplier: 1.2 },
      { id: "gold", name: "Gold Card", multiplier: 1.3 },
      { id: "platinum", name: "Platinum Card", multiplier: 1.5 }
    ],
    note: "Sky Pearl Club tickets issued by China Southern (ticket number 784) earn 0.8 miles per yuan of fare plus fuel surcharge, excluding taxes, times the level factor: 1.0, 1.2 for Silver, 1.3 for Gold, and 1.5 for Platinum. Tickets issued by another airline earn the kilometres flown times the booking class percentage and the level factor, with a 500 km minimum. Miles are rounded up. Group, award, and special discount tickets do not earn. Enter fares in yuan."
  };

  P.xiamen = {
    name: "Xiamen Airlines | Egret Miles",
    country: "CN",
    currency: "CNY",
    unit: "miles",
    method: "spend",
    roundUp: true,
    defaultFareType: "y-other",
    fareTypes: [
      { id: "j", name: "First or Business", rate: 1 },
      { id: "y-yw", name: "Economy (Y, W)", rate: 1 },
      { id: "y-h-dom", name: "Economy (H), within China", rate: 1 },
      { id: "y-h-intl", name: "Economy (H), international or regional", rate: 0.7 },
      { id: "y-other", name: "Other Economy classes", rate: 0.7 }
    ],
    statuses: [
      { id: "member", name: "Egret Member", multiplier: 1 },
      { id: "silver", name: "Egret Silver", multiplier: 1, addRate: 0.2 },
      { id: "gold", name: "Egret Gold", multiplier: 1, addRate: 0.3 },
      { id: "platinum", name: "Egret Platinum", multiplier: 1, addRate: 0.4 },
      { id: "diamond", name: "Egret Diamond", multiplier: 1, addRate: 0.5 }
    ],
    note: "Since 25 July 2026, Egret Miles earns on the base fare plus fuel surcharge in yuan, times the cabin multiplier (1.0 or 0.7) plus the tier multiplier (0.2 to 0.5). Miles are rounded up. Enter fares in yuan."
  };

  /* LOT and Croatia Airlines credit to Miles & More; they join that program
     as airlines with their own earning tables. */
  var mm = P.milesandmore;
  mm.airlines.push(
    { id: "lo", name: "LOT Polish Airlines", country: "PL", program: {
        method: "distance",
        defaultFareType: "y-mid",
        zoneLabel: "Route type",
        zoneHint: "Within Europe LOT pays a fixed amount per flight; outside Europe a share of the distance, with a minimum.",
        zones: [
          { id: "intl", name: "International (to or from outside Europe)" },
          { id: "eu", name: "Between European countries", fixed: true },
          { id: "dom", name: "Within one European country", fixed: true }
        ],
        // Earn lists follow the zones order.
        fareTypes: [
            { id: "j", name: "Business (C, D)", earn: [{ share: 2, min: 1000 }, { fixed: 2000 }, null] },
            { id: "jz", name: "Business (F, Z)", earn: [{ share: 1.5, min: 750 }, { fixed: 1250 }, null] },
            { id: "pe-p", name: "Premium Economy (P)", earn: [{ share: 1.6, min: 750 }, { fixed: 1350 }, null] },
            { id: "pe-a", name: "Premium Economy (A)", earn: [{ share: 1.5, min: 750 }, { fixed: 1250 }, null] },
            { id: "pe-r", name: "Premium Economy (R)", earn: [{ share: 1, min: 500 }, { fixed: 750 }, null] },
            { id: "y-high", name: "Economy (Y, B)", earn: [{ share: 1.5, min: 750 }, { fixed: 1250 }, { fixed: 1000 }] },
            { id: "y-m", name: "Economy (M)", earn: [{ share: 1, min: 500 }, { fixed: 1250 }, { fixed: 500 }] },
            { id: "y-mid", name: "Economy (E, H, K)", earn: [{ share: 1, min: 500 }, { fixed: 750 }, { fixed: 500 }] },
            { id: "y-q", name: "Economy (Q)", earn: [{ share: 1, min: 500 }, { fixed: 750 }, { fixed: 250 }] },
            { id: "y-low", name: "Economy (G, S, T, V)", earn: [{ share: 0.5, min: 250 }, { fixed: 500 }, { fixed: 250 }] },
            { id: "y-lowest", name: "Economy (L, O, U, W)", earn: [{ share: 0.25, min: 250 }, { fixed: 125 }, { fixed: 125 }] }
        ],
        note: "On LOT tickets (ticket number 080), Miles & More pays a fixed amount per flight within Europe and a share of the distance, with a minimum, outside Europe. Status members earn up to 25% more on LOT, but Miles & More does not publish how much, so this estimate leaves it out."
      } },
    { id: "ou", name: "Croatia Airlines", country: "HR", program: {
        method: "zone",
        defaultFareType: "y-mid",
        zoneLabel: "Route type",
        zoneHint: "Croatia Airlines pays a fixed amount per flight, whatever the distance.",
        fareTypes: [
            { id: "j", name: "Business (C, D)" },
            { id: "jz", name: "Business (Z)" },
            { id: "y-high", name: "Economy (B, Y)" },
            { id: "y-m", name: "Economy (M)" },
            { id: "y-mid", name: "Economy (A, F, H, J)" },
            { id: "y-q", name: "Economy (G, O, Q)" },
            { id: "y-low", name: "Economy (K, V)" },
            { id: "y-sw", name: "Economy (S, W)" },
            { id: "y-lowest", name: "Economy (E, L, P, T, U)" }
        ],
        zones: [
          { id: "eu", name: "Between European countries", points: [2000, 1250, 1250, 1250, 750, 750, 500, 500, 125] },
          { id: "dom", name: "Within Croatia", points: [1500, 750, 750, 500, 500, 250, 250, 125, 125] }
        ],
        note: "On Croatia Airlines, Miles & More pays a fixed amount per flight by booking class: one amount within Croatia and another between European countries. Status members earn up to 50% more, but Miles & More does not publish how much, so this estimate leaves it out."
      } }
  );
})();

/* Alliance tier matching each program status, shown as "Status | Tier".
   oneworld: Ruby, Sapphire, Emerald. Star Alliance: Silver, Gold.
   SkyTeam: Elite, Elite Plus. Airlines outside an alliance are left out,
   and an airline that shares a program but is not a member (Eurowings,
   Transavia) still shows the program's tier.
   Keys are program ids, or "program:airline" for group programs. */
(function () {
  var P = window.PROGRAMS;
  var ALLIANCE_TIERS = {
    // oneworld
    american: { gold: "Ruby", platinum: "Sapphire", platpro: "Sapphire", exp: "Emerald" },
    fiji: { gold: "Ruby", platinum: "Sapphire", platpro: "Sapphire", exp: "Emerald" },
    alaska: { silver: "Ruby", gold: "Sapphire", platinum: "Emerald", titanium: "Emerald" },
    hawaiian: { silver: "Ruby", gold: "Sapphire", platinum: "Emerald", titanium: "Emerald" },
    "iag:ba": { bronze: "Ruby", silver: "Sapphire", gold: "Emerald" },
    "iag:ib": { plata: "Ruby", oro: "Sapphire", platino: "Emerald", infinita: "Emerald", "infinita-prime": "Emerald" },
    "iag:level": { plata: "Ruby", oro: "Sapphire", platino: "Emerald", infinita: "Emerald", "infinita-prime": "Emerald" },
    finnair: { silver: "Ruby", gold: "Sapphire", platinum: "Emerald", lumo: "Emerald" },
    qatar: { silver: "Ruby", gold: "Sapphire", platinum: "Emerald" },
    qantas: { silver: "Ruby", gold: "Sapphire", platinum: "Emerald", "platinum-one": "Emerald" },
    cathay: { silver: "Ruby", gold: "Sapphire", diamond: "Emerald" },
    jal: { crystal: "Ruby", jgc: "Sapphire", sapphire: "Sapphire", "jgc-premier": "Emerald", diamond: "Emerald" },
    enrich: { silver: "Ruby", gold: "Sapphire", platinum: "Emerald" },
    // Star Alliance
    united: { silver: "Silver", gold: "Gold", platinum: "Gold", "1k": "Gold" },
    aircanada: { "25k": "Silver", "35k": "Gold", "50k": "Gold", "75k": "Gold", se: "Gold" },
    milesandmore: { ftl: "Silver", sen: "Gold", hon: "Gold" },
    tap: { silver: "Silver", gold: "Gold" },
    ana: { bronze: "Silver", platinum: "Gold", diamond: "Gold" },
    krisflyer: { "elite-silver": "Silver", "elite-gold": "Gold", pps: "Gold", solitaire: "Gold" },
    eva: { silver: "Silver", gold: "Gold", diamond: "Gold" },
    lifemiles: { silver: "Silver", gold: "Gold", diamond: "Gold" },
    airnz: { silver: "Silver", gold: "Gold", platinum: "Gold", black: "Gold" },
    turkish: { "classic-plus": "Silver", elite: "Gold", "elite-plus": "Gold" },
    phoenix: { silver: "Silver", gold: "Gold", platinum: "Gold" },
    // SkyTeam
    delta: { silver: "Elite", gold: "Elite Plus", platinum: "Elite Plus", diamond: "Elite Plus" },
    aeromexico: { silver: "Elite", gold: "Elite Plus", platinum: "Elite Plus", titanium: "Elite Plus" },
    flyingblue: { silver: "Elite", gold: "Elite Plus", platinum: "Elite Plus", ultimate: "Elite Plus" },
    virgin: { silver: "Elite", gold: "Elite Plus" },
    chinaairlines: { gold: "Elite", emerald: "Elite Plus", paragon: "Elite Plus" },
    korean: { "morning-calm": "Elite", "morning-calm-select": "Elite Plus", "million-miler": "Elite Plus" },
    aireuropa: { silver: "Elite", gold: "Elite Plus", platinum: "Elite Plus" },
    chinaeastern: { silver: "Elite", gold: "Elite Plus", platinum: "Elite Plus" },
    xiamen: { silver: "Elite", gold: "Elite", platinum: "Elite Plus", diamond: "Elite Plus" },
    sas: { silver: "Elite", gold: "Elite Plus", diamond: "Elite Plus" }
  };

  // Alliance of each program, or of each airline for group programs.
  // Anything not listed is not part of an alliance.
  var ALLIANCES = {
    oneworld: ["american", "fiji", "alaska", "hawaiian", "iag:ba", "iag:ib", "finnair", "qatar",
      "qantas", "cathay", "jal", "enrich"],
    "Star Alliance": ["united", "aircanada", "milesandmore:lh", "milesandmore:lx",
      "milesandmore:os", "milesandmore:sn", "milesandmore:az", "tap", "ana",
      "krisflyer", "eva", "lifemiles", "airnz", "turkish", "phoenix:ca",
      "milesandmore:lo", "milesandmore:ou"],
    SkyTeam: ["delta", "aeromexico", "flyingblue:af", "flyingblue:kl", "virgin", "chinaairlines",
      "korean", "aireuropa", "chinaeastern", "xiamen", "sas"]
  };
  Object.keys(ALLIANCES).forEach(function (name) {
    ALLIANCES[name].forEach(function (key) {
      var parts = key.split(":");
      var target = P[parts[0]];
      if (parts[1]) target = target.airlines.filter(function (a) { return a.id === parts[1]; })[0];
      target.alliance = name;
    });
  });

  Object.keys(ALLIANCE_TIERS).forEach(function (key) {
    var parts = key.split(":");
    var p = P[parts[0]];
    var holder = p;
    if (parts[1]) {
      var al = p.airlines.filter(function (a) { return a.id === parts[1]; })[0];
      holder = al.program;
    }
    var tiers = ALLIANCE_TIERS[key];
    // Copy the list so shared status lists (Iberia and LEVEL) stay separate.
    holder.statuses = holder.statuses.map(function (s) {
      return tiers[s.id] ? Object.assign({}, s, { alliance: tiers[s.id] }) : s;
    });
  });
})();

/* Countries shown as separators in the program menu. Programs and
   airlines without a country field belong to "US". */
// Pinned groups stay at the top in this order; the rest sort by name.
window.COUNTRIES = [
  { id: "US", label: "United States \u{1F1FA}\u{1F1F8}", pinned: true },
  { id: "CA", label: "Canada \u{1F1E8}\u{1F1E6}", pinned: true },
  { id: "MX", label: "Mexico \u{1F1F2}\u{1F1FD}", pinned: true },
  { id: "AT", label: "Austria \u{1F1E6}\u{1F1F9}" },
  { id: "BE", label: "Belgium \u{1F1E7}\u{1F1EA}" },
  { id: "FJ", label: "Fiji \u{1F1EB}\u{1F1EF}" },
  { id: "SCAN", label: "Scandinavia \u{1F1E9}\u{1F1F0} \u{1F1F3}\u{1F1F4} \u{1F1F8}\u{1F1EA}" },
  { id: "FR", label: "France \u{1F1EB}\u{1F1F7}" },
  { id: "DE", label: "Germany \u{1F1E9}\u{1F1EA}" },
  { id: "IE", label: "Ireland \u{1F1EE}\u{1F1EA}" },
  { id: "IT", label: "Italy \u{1F1EE}\u{1F1F9}" },
  { id: "NL", label: "Netherlands \u{1F1F3}\u{1F1F1}" },
  { id: "ES", label: "Spain \u{1F1EA}\u{1F1F8}" },
  { id: "CH", label: "Switzerland \u{1F1E8}\u{1F1ED}" },
  { id: "PT", label: "Portugal \u{1F1F5}\u{1F1F9}" },
  { id: "UK", label: "United Kingdom \u{1F1EC}\u{1F1E7}" },
  { id: "AU", label: "Australia \u{1F1E6}\u{1F1FA}" },
  { id: "CO", label: "Colombia \u{1F1E8}\u{1F1F4}" },
  { id: "NO", label: "Norway \u{1F1F3}\u{1F1F4}" },
  { id: "IS", label: "Iceland \u{1F1EE}\u{1F1F8}" },
  { id: "FI", label: "Finland \u{1F1EB}\u{1F1EE}" },
  { id: "QA", label: "Qatar \u{1F1F6}\u{1F1E6}" },
  { id: "JP", label: "Japan \u{1F1EF}\u{1F1F5}" },
  { id: "HK", label: "Hong Kong \u{1F1ED}\u{1F1F0}" },
  { id: "SG", label: "Singapore \u{1F1F8}\u{1F1EC}" },
  { id: "TW", label: "Taiwan \u{1F1F9}\u{1F1FC}" },
  { id: "AE", label: "United Arab Emirates \u{1F1E6}\u{1F1EA}" },
  { id: "NZ", label: "New Zealand \u{1F1F3}\u{1F1FF}" },
  { id: "TR", label: "Türkiye \u{1F1F9}\u{1F1F7}" },
  { id: "KR", label: "South Korea \u{1F1F0}\u{1F1F7}" },
  { id: "CN", label: "China \u{1F1E8}\u{1F1F3}" },
  { id: "PL", label: "Poland \u{1F1F5}\u{1F1F1}" },
  { id: "HR", label: "Croatia \u{1F1ED}\u{1F1F7}" },
  { id: "MY", label: "Malaysia \u{1F1F2}\u{1F1FE}" }
];
