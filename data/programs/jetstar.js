/* Jetstar Airways (JQ): Qantas Points per flight by route and fare bundle,
   from Qantas' earning tables for Qantas and Jetstar marketed flights.
   Qantas maps each Jetstar bundle to an earn category:
     Domestic New Zealand: Starter, Combo, Boost, Packed = Discount Economy;
       Flex, Flex Plus, Starter Plus = Economy; Starter Max = Flexible Economy.
     Elsewhere: Flex, Flex Plus, Max, Mega, More = Economy (More does not
       earn on domestic flights); Starter Max = Flexible Economy;
       Business Max = Business.
   Each zone's points list follows the fareTypes order; null means the
   bundle does not earn Qantas Points on that route. */

const rules = {
  name: "Jetstar Airways | Qantas Frequent Flyer",
  programName: "Qantas Frequent Flyer",
  country: "AU",
  currency: "AUD",
  unit: "Qantas Points",
  method: "zone",
  centsPerPoint: 1.0,
  defaultFareType: "y",
  fareLabel: "Fare bundle",
  fareTypes: [
    { id: "starter", name: "Starter, Combo, Boost or Packed (New Zealand domestic only)" },
    { id: "y", name: "Flex or Flex Plus" },
    { id: "starter-plus", name: "Starter Plus (New Zealand domestic only)" },
    { id: "max", name: "Max or Mega (not New Zealand domestic)" },
    { id: "more", name: "More (international only)" },
    { id: "flex-y", name: "Starter Max (bought on qantas.com)" },
    { id: "j", name: "Business Max", premium: true }
  ],
  unavailableText: " does not earn Qantas Points on this route.",
  zoneLabel: "Route and distance",
  zoneHint: "Pick your route if it is listed. Otherwise pick the distance band for your flight. Domestic Australia uses its own distance bands.",
  // Points per flight in fareTypes order; null means the bundle does not
  // earn on that route. Earn categories: Starter etc. = Discount Economy;
  // Flex, Flex Plus, Starter Plus, Max, Mega, More = Economy;
  // Starter Max = Flexible Economy; Business Max = Business.
  zones: [
    { id: "au-short", name: "Domestic Australia: 0 to 750 miles", points: [null, 400, null, 400, null, 600, 1400] },
    { id: "au-medium", name: "Domestic Australia: 751 to 1,500 miles", points: [null, 700, null, 700, null, 1100, 2100] },
    { id: "au-long", name: "Domestic Australia: 1,501 miles and over", points: [null, 1450, null, 1450, null, 2200, 3300] },
    { id: "nz-dom", name: "Domestic New Zealand", points: [300, 450, 450, null, null, 600, null], min: [400, 800, 800, null, null, 1200, null] },
    { id: "au-nz", name: "Adelaide, Brisbane, Gold Coast, Melbourne or Sydney to New Zealand", points: [null, 1375, null, 1375, 1375, 1750, 2700] },
    { id: "au-asia", name: "Adelaide, Brisbane, Gold Coast, Melbourne or Sydney to Southeast or Northeast Asia", points: [null, 3900, null, 3900, 3900, 5200, 8450] },
    { id: "au-hawaii", name: "Adelaide, Brisbane, Gold Coast, Melbourne or Sydney to Hawaii", points: [null, 4500, null, 4500, 4500, 6000, 9750] },
    { id: "west-sea", name: "Darwin or Perth to Southeast Asia", points: [null, 2025, null, 2025, 2025, 2700, 4400] },
    { id: "west-nea", name: "Darwin or Perth to Northeast Asia", points: [null, 3750, null, 3750, 3750, 5000, 8125] },
    { id: "int-1", name: "Other international: 0 to 750 miles", points: [null, 450, null, 450, 450, 650, 975] },
    { id: "int-2", name: "Other international: 751 to 1,500 miles", points: [null, 850, null, 850, 850, 1100, 1800] },
    { id: "int-3", name: "Other international: 1,501 to 2,500 miles (such as Australia to the South Pacific)", points: [null, 1650, null, 1650, 1650, 2200, 3575] },
    { id: "int-4", name: "Other international: 2,501 to 3,500 miles", points: [null, 2400, null, 2400, 2400, 3200, 5200] },
    { id: "int-5", name: "Other international: 3,501 to 5,000 miles", points: [null, 3700, null, 3700, 3700, 4900, 7975] },
    { id: "int-6", name: "Other international: 5,001 to 6,500 miles", points: [null, 4350, null, 4350, 4350, 5800, 9425] }
  ],
  // Minimum Points Guarantee per flight, after the status bonus, by fare
  // (clause 9.3.3 of the Qantas Frequent Flyer terms). Domestic New
  // Zealand has its own lower minimums (set on that zone).
  zoneMin: [800, 800, 800, 800, 800, 1200, 1400],
  // The status bonus on Business Max is figured on the Starter Max
  // (Flexible Economy) amount for the same route, as on Qantas.
  bonusBaseFare: "flex-y",
  statuses: [
    { id: "bronze", name: "Bronze", bonus: 0 },
    { id: "silver", name: "Silver", bonus: 0.5 },
    { id: "gold", name: "Gold", bonus: 0.75 },
    { id: "platinum", name: "Platinum", bonus: 1 },
    { id: "platinum-one", name: "Platinum One", bonus: 1 }
  ],
  note: "Jetstar flights earn Qantas Points by route and fare bundle. Within New Zealand, Starter, Combo, Boost and Packed earn at the Discount Economy rate, and Flex, Flex Plus and Starter Plus at the Economy rate. Elsewhere, Flex, Flex Plus, Max, Mega and More earn at the Economy rate, but More does not earn on domestic flights. Starter Max earns at the Flexible Economy rate and Business Max at the Business rate. Silver, Gold, and Platinum add 50%, 75%, and 100%. The Minimum Points Guarantee lifts each flight to at least 800 points on Economy bundles, 1,200 on Starter Max and 1,400 on Business Max (400 on Starter, 800 on Economy bundles and 1,200 on Starter Max within New Zealand). Club Jetstar members with the Qantas Frequent Flyer Extra add-on can earn more; that bonus is not included. Jetstar flights booked as part of a Qantas international fare in Economy do not earn."
};

module.exports = {
  id: "jetstar",
  // Month the earning rules were last checked against the source.
  reviewed: "2026-11",
  code: "JQ",
  color: "#FE5815",
  source: "https://www.qantas.com/en-au/frequent-flyer/calculators/earning-tables/qantas-jetstar",
  rules
};
