/*
 * Earning rules for each loyalty program.
 *
 * method:
 *   "spend"    -> points = airfare x rate (rate comes from the status, or from
 *                 fare type x status multiplier when fareTypes is present)
 *   "distance" -> points = miles flown x status multiplier
 *   "tiered"   -> custom per-dollar tiers (Allegiant)
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
 * its own entry in the program menu, listed by airline name under the
 * group heading. The result card shows "Airline | programName". An airline's eliteRate replaces the rate of statuses marked
 * elite, and its note is added to the program note. An airline's program
 * object, when present, replaces program fields such as currency,
 * statuses, cards, and note (IAG).
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
  flyingblue: {
    name: "Air France-KLM | Flying Blue",
    programName: "Flying Blue",
    country: "AFKL",
    currency: "EUR",
    unit: "Miles",
    method: "spend",
    centsPerPoint: 1.2,
    // The operating airline; both earn the same Flying Blue rates.
    airlines: [
      { id: "af", name: "Air France" },
      { id: "kl", name: "KLM" }
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
    note: "Flying Blue earns 4 to 9 Miles per euro spent on the fare and carrier charges on Air France and KLM, by status. Taxes do not earn. Enter fares in euros. The US Bank of America card earns per US dollar charged."
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
      { id: "lh", name: "Lufthansa", eliteRate: 6 },
      { id: "ew", name: "Eurowings", eliteRate: 5 },
      { id: "de", name: "Discover Airlines", eliteRate: 5 },
      { id: "os", name: "Austrian Airlines", eliteRate: 6 },
      { id: "lx", name: "SWISS", eliteRate: 6,
        note: "SWISS fares in Swiss francs earn at the euro equivalent." },
      { id: "sn", name: "Brussels Airlines", eliteRate: 6 },
      { id: "az", name: "ITA Airways", eliteRate: 6,
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
      { id: "chase", name: "Chase British Airways Visa Signature (US)", rate: 3, currency: "USD" }
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
      { id: "ei", name: "Aer Lingus", program: aerClub },
      { id: "ba", name: "British Airways", program: baClub },
      { id: "ib", name: "Iberia", program: iberiaClub },
      { id: "level", name: "LEVEL", program: levelClub },
      { id: "vy", name: "Vueling", program: vuelingClub }
    ],
    // Defaults before an airline is chosen (British Airways).
    currency: baClub.currency,
    statuses: baClub.statuses,
    cards: baClub.cards,
    note: baClub.note
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


})();

/* Groups shown as separators in the program menu: a country, or an
   airline group spanning countries. Programs without a country field
   belong to "US". */
// Pinned groups stay at the top in this order; the rest sort by name.
window.COUNTRIES = [
  { id: "US", label: "United States \u{1F1FA}\u{1F1F8}", pinned: true },
  { id: "CA", label: "Canada \u{1F1E8}\u{1F1E6}", pinned: true },
  { id: "MX", label: "Mexico \u{1F1F2}\u{1F1FD}", pinned: true },
  { id: "AFKL", label: "Air France-KLM \u{1F1EB}\u{1F1F7} \u{1F1F3}\u{1F1F1} | Flying Blue" },
  { id: "IAG", label: "IAG \u{1F1EC}\u{1F1E7} \u{1F1EA}\u{1F1F8} \u{1F1EE}\u{1F1EA} | Avios" },
  { id: "LHG", label: "Lufthansa Group \u{1F1E9}\u{1F1EA} \u{1F1E6}\u{1F1F9} \u{1F1E8}\u{1F1ED} \u{1F1E7}\u{1F1EA} \u{1F1EE}\u{1F1F9} | Miles & More" },
  { id: "AU", label: "Australia \u{1F1E6}\u{1F1FA}" },
  { id: "CO", label: "Colombia \u{1F1E8}\u{1F1F4}" },
  { id: "NO", label: "Norway \u{1F1F3}\u{1F1F4}" },
  { id: "FI", label: "Finland \u{1F1EB}\u{1F1EE}" }
];
