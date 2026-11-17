/*
 * Earning rules for each loyalty program.
 *
 * method:
 *   "spend"    -> points = airfare x rate (rate comes from the status, or from
 *                 fare type x status multiplier when fareTypes is present)
 *   "distance" -> points = miles flown x status multiplier
 *   "tiered"   -> custom per-dollar tiers (Allegiant)
 *
 * cards (optional): co-branded credit cards and the extra points each earns
 * per dollar charged to it for the ticket, taxes included. Cards marked
 * kind: "debit" are listed under Debit cards. A card with its
 * own currency (e.g. a US card on a Canadian program) asks for the amount
 * charged in that currency.
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
      { id: "gold-biz", name: "Delta SkyMiles Gold Business Amex", rate: 2 },
      { id: "plat", name: "Delta SkyMiles Platinum Amex", rate: 3 },
      { id: "plat-biz", name: "Delta SkyMiles Platinum Business Amex", rate: 3 },
      { id: "reserve", name: "Delta SkyMiles Reserve Amex", rate: 3 },
      { id: "reserve-biz", name: "Delta SkyMiles Reserve Business Amex", rate: 3 }
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
    unit: "points",
    method: "spend",
    centsPerPoint: 1.3,
    fareTypes: [
      { id: "basic", name: "Basic", rate: 2 },
      { id: "choice", name: "Choice", rate: 6 },
      { id: "choicePref", name: "Choice Preferred", rate: 8 },
      { id: "choiceExtra", name: "Choice Extra", rate: 12 }
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
      { id: "premier-biz", name: "Southwest Rapid Rewards Premier Business", rate: 3 },
      { id: "priority", name: "Southwest Rapid Rewards Priority", rate: 4 },
      { id: "perf-biz", name: "Southwest Rapid Rewards Performance Business", rate: 4 },
      { id: "debit", name: "Southwest Rapid Rewards Debit Card", rate: 1, kind: "debit" }
    ],
    note: "Rapid Rewards points depend on fare type and are earned on base fare only. A-List adds a 25% bonus and A-List Preferred adds a 100% bonus."
  },
  alaska: {
    name: "Alaska Airlines | Atmos Rewards",
    unit: "points",
    method: "distance",
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
    note: "Atmos Rewards awards 1 point per mile flown on Alaska and Hawaiian, with elite bonuses of 25% to 150%. Fare class bonuses are not included. Members who chose spend-based or segment-based earning will see different results."
  },
  frontier: {
    name: "Frontier Airlines | Frontier Miles",
    unit: "miles",
    method: "spend",
    centsPerPoint: 0.5,
    defaultFareType: "basic",
    fareTypes: [
      { id: "basic", name: "Basic fare (no bundle)" },
      { id: "bundle", name: "Bundle" }
    ],
    // Rates for bookings made on or after September 1, 2026 (non-cardholders).
    statuses: [
      { id: "member", name: "Frontier Miles Member", rates: { basic: 1, bundle: 6 } },
      { id: "silver", name: "Elite Silver", rates: { basic: 3, bundle: 8 } },
      { id: "gold", name: "Elite Gold", rates: { basic: 5, bundle: 10 } },
      { id: "platinum", name: "Elite Platinum", rates: { basic: 7, bundle: 12 } },
      { id: "diamond", name: "Elite Diamond", rates: { basic: 11, bundle: 16 } }
    ],
    // Co-branded cards: extra points per dollar charged (fare + taxes).
    cards: [
      { id: "frontier-mc", name: "Frontier Airlines World Mastercard", rate: 5 }
    ],
    note: "For bookings made on or after September 1, 2026, Frontier Miles earns 1 to 11 miles per dollar on basic fares and 6 to 16 on bundles, depending on status. Frontier World Mastercard holders earn more."
  },
  jetblue: {
    name: "JetBlue Airways | TrueBlue",
    unit: "points",
    method: "spend",
    centsPerPoint: 1.3,
    statuses: [
      { id: "member", name: "TrueBlue Member", rate: 6 },
      { id: "mosaic1", name: "Mosaic 1", rate: 9 },
      { id: "mosaic2", name: "Mosaic 2", rate: 9 },
      { id: "mosaic3", name: "Mosaic 3", rate: 9 },
      { id: "mosaic4", name: "Mosaic 4", rate: 9 }
    ],
    // Co-branded cards: extra points per dollar charged (fare + taxes).
    cards: [
      { id: "card", name: "JetBlue Card", rate: 3 },
      { id: "plus", name: "JetBlue Plus Card", rate: 6 },
      { id: "premier", name: "JetBlue Premier Card", rate: 6 },
      { id: "biz", name: "JetBlue Business Card", rate: 6 }
    ],
    note: "TrueBlue awards 3 base points per dollar plus a 3-point bonus for booking on jetblue.com or the JetBlue app. Mosaic members earn 3 more points per dollar. Blue Basic fares earn less."
  },
  allegiant: {
    name: "Allegiant Air | Allways Rewards",
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
    note: "Allways Rewards has no elite status tiers. Members earn 1 point per dollar on the first $500 and 2 points per dollar above $500, excluding taxes and fees."
  },
  suncountry: {
    name: "Sun Country Airlines | Sun Country Rewards",
    unit: "points",
    method: "spend",
    centsPerPoint: 1.0,
    statuses: [
      { id: "member", name: "Sun Country Rewards Member", rate: 2 },
      { id: "plus", name: "Plus", rate: 3 }
    ],
    // Co-branded cards: extra points per dollar charged (fare + taxes).
    cards: [
      { id: "visa", name: "Sun Country Visa Signature", rate: 3 }
    ],
    note: "Sun Country Rewards earns 2 points per dollar on Sun Country purchases, and Plus status adds 1 more. The Sun Country Visa Signature adds 3 points per dollar charged. Sun Country is merging with Allegiant, so these rules may change."
  },
  breeze: {
    name: "Breeze Airways | Breezy Rewards",
    unit: "BreezePoints",
    method: "spend",
    centsPerPoint: 1.0,
    fareTypes: [
      { id: "nice", name: "Nice", rate: 2 },
      { id: "nicer", name: "Nicer", rate: 5 },
      { id: "nicest", name: "Nicest", rate: 5 }
    ],
    statuses: [
      { id: "member", name: "Breezy Rewards Member", multiplier: 1 },
      { id: "breezy1", name: "Breezy 1", multiplier: 1.25 },
      { id: "breezy2", name: "Breezy 2", multiplier: 1.5 },
      { id: "breezy3", name: "Breezy 3", multiplier: 1.5 },
      { id: "club", name: "Breezy Club", multiplier: 1.5 }
    ],
    note: "Breeze Easy Visa earning is not included because its per-dollar rate is not published clearly. BreezePoints depend on the bundle you buy. Breezy 1 adds a 25% boost and Breezy 2 adds 50%. Breezy 3 and Breezy Club are shown at the confirmed 50% boost, so their real totals may be higher."
  },
  hawaiian: {
    name: "Hawaiian Airlines | Atmos Rewards",
    unit: "points",
    method: "distance",
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
    note: "HawaiianMiles is now part of Atmos Rewards, so Hawaiian flights earn 1 point per mile flown with elite bonuses of 25% to 150%. Neighbor Island flights earn a minimum of 500 points per segment, which this estimate does not apply."
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
    cards: [
      { id: "td-vi", name: "TD Aeroplan Visa Infinite", rate: 1.5 },
      { id: "cibc-vi", name: "CIBC Aeroplan Visa Infinite", rate: 1.5 },
      { id: "td-priv", name: "TD Aeroplan Visa Infinite Privilege", rate: 2 },
      { id: "cibc-priv", name: "CIBC Aeroplan Visa Infinite Privilege", rate: 2 },
      { id: "amex", name: "American Express Aeroplan Card", rate: 2 },
      { id: "amex-reserve", name: "American Express Aeroplan Reserve Card", rate: 3 },
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
    // Co-branded cards: extra points per dollar charged (fare + taxes).
    cards: [
      { id: "amex", name: "American Express Aeroméxico", rate: 2.4 },
      { id: "amex-plat", name: "American Express Aeroméxico Platinum", rate: 4.8 }
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
    // Co-branded cards: extra points per dollar charged (fare + taxes).
    cards: [
      { id: "invex0", name: "Volaris INVEX 0", rate: 0.75 },
      { id: "invex", name: "Volaris INVEX", rate: 0.85 },
      { id: "invex2", name: "Volaris INVEX 2", rate: 1 }
    ],
    note: "Altitude by Volaris earns 10 points for every 20 Mexican pesos spent on volaris.com or the app, excluding taxes and airport fees. It has no status tiers. Volaris INVEX cardholders earn more."
  },
  britishairways: {
    name: "British Airways | British Airways Club",
    country: "UK",
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
      { id: "chase", name: "Chase British Airways Visa Signature (US)", rate: 3, currency: "USD" }
    ],
    note: "British Airways Club earns 6 to 9 Avios per pound spent on the fare and carrier charges, by status. Taxes do not earn. Enter fares in pounds. The UK Amex card rates on British Airways purchases could not be confirmed."
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
  }
};

/* Groups shown as separators in the program menu. Programs without a
   country field belong to "US". */
window.COUNTRIES = [
  { id: "US", label: "United States \u{1F1FA}\u{1F1F8}" },
  { id: "CA", label: "Canada \u{1F1E8}\u{1F1E6}" },
  { id: "MX", label: "Mexico \u{1F1F2}\u{1F1FD}" },
  { id: "UK", label: "United Kingdom \u{1F1EC}\u{1F1E7}" }
];
