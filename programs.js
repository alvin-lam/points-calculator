/*
 * Earning rules for each loyalty program.
 *
 * method:
 *   "spend"    -> points = airfare x rate (rate comes from the status, or from
 *                 fare type x status multiplier when fareTypes is present)
 *   "distance" -> points = miles flown x status multiplier
 *   "tiered"   -> custom per-dollar tiers (Allegiant)
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
    note: "Allways Rewards has no elite status tiers. Members earn 1 point per dollar on the first $500 and 2 points per dollar above $500, excluding taxes and fees."
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
    note: "BreezePoints depend on the bundle you buy. Breezy 1 adds a 25% boost and Breezy 2 adds 50%. Breezy 3 and Breezy Club are shown at the confirmed 50% boost, so their real totals may be higher."
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
    note: "Since January 2026, Aeroplan earns points per Canadian dollar spent on base fare and carrier surcharges on Air Canada flights. Taxes do not earn. Elite members earn 2 to 6 points per dollar."
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
    note: "Doters earns 1 point for every 2 Mexican pesos spent with Viva Aerobus, including bags and seats. Silver and Gold bonuses were not confirmed, so those levels are shown at the Green rate."
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
    note: "Altitude by Volaris earns 10 points for every 20 Mexican pesos spent on volaris.com or the app, excluding taxes and airport fees. It has no status tiers. Volaris INVEX cardholders earn more."
  }
};

/* Groups shown as separators in the program menu. Programs without a
   country field belong to "US". */
window.COUNTRIES = [
  { id: "US", label: "United States \u{1F1FA}\u{1F1F8}" },
  { id: "CA", label: "Canada \u{1F1E8}\u{1F1E6}" },
  { id: "MX", label: "Mexico \u{1F1F2}\u{1F1FD}" }
];
