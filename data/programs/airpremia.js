/* Air Premia (YP): Premia Members points on Air Premia flights, from Air
   Premia's "Information on Earning Points" and "About Memberships" pages
   (airpremia.com, Premia Members), as supplied by the site owner in
   November 2026:
   - A base of 7 points per KRW 1,000 of the fare paid, after discounts.
     Airport tax, fuel surcharge, other taxes and additional services do
     not earn.
   - The rate varies by fare class: 70% for Lite, 100% for Standard and
     120% for Flex.
   - Gold earns about 60% more (11 points per KRW 1,000) and Diamond about
     115% more (15 per KRW 1,000).
   - Worked examples on a KRW 300,000 fare: Blue 2,100, Gold 2,100 + 1,200
     and Diamond 2,100 + 2,400.
   - Fares on flights departing outside Korea are converted to won.
   The pages do not show a Gold or Diamond example on a Lite or Flex fare;
   since the tiers earn "more points", the fare share is applied to the
   tier rate (Gold Lite: 11 x 70% per KRW 1,000). */
const rules = {
  name: "Air Premia | Premia Members",
  programName: "Premia Members",
  country: "KR",
  currency: "KRW",
  unit: "points",
  method: "spend",
  ratePer: 1000,
  // The fuel surcharge does not earn.
  baseFareOnly: true,
  carrierLabel: "Fuel Surcharge",
  carrierHint: "Air Premia's fuel surcharge. It does not earn points. Enter the fare after any discount; for flights departing outside Korea, enter the fare in won.",
  defaultFareType: "standard",
  fareTypeLabel: "Fare Class",
  fareTypes: [
    { id: "lite", name: "Lite", rate: 0.7 },
    { id: "standard", name: "Standard", rate: 1 },
    { id: "flex", name: "Flex", rate: 1.2 }
  ],
  // Points per won: the tier rate times the fare class share.
  statuses: [
    { id: "blue", name: "Blue", multiplier: 7 / 1000 },
    { id: "gold", name: "Gold", multiplier: 11 / 1000 },
    { id: "diamond", name: "Diamond", multiplier: 15 / 1000 }
  ],
  cards: null,
  note: "Premia Members earns 7 points per KRW 1,000 of the fare paid, after discounts, for Blue members; Gold earns 11 and Diamond 15 per KRW 1,000. Lite fares earn 70% of that rate, Standard 100% and Flex 120%. Airport tax, the fuel surcharge, other taxes and additional services such as bags and seats do not earn. Fares on flights departing outside Korea are converted to Korean won, so enter the fare in won. Air Premia does not show a Gold or Diamond example on a Lite or Flex fare, so this estimate applies the fare class share to the tier rate. Award tickets, ineligible discount fares and infants under two without a seat do not earn."
};

module.exports = {
  id: "airpremia",
  // Month the earning rules were last checked against the source.
  reviewed: "2026-11",
  code: "YP",
  color: "#E95B33",
  source: "https://www.airpremia.com/a/en/members/save-point",
  examples: [
    // Air Premia's own examples on a KRW 300,000 fare (Standard).
    { name: "Air Premia Blue, KRW 300,000 (official example)", input: { status: "blue", fare: "standard", fields: { airfare: 300000 } }, expect: 2100 },
    { name: "Air Premia Gold, KRW 300,000 (official example)", input: { status: "gold", fare: "standard", fields: { airfare: 300000 } }, expect: 3300 },
    { name: "Air Premia Diamond, KRW 300,000 (official example)", input: { status: "diamond", fare: "standard", fields: { airfare: 300000 } }, expect: 4500 },
    // Lite: 300 x 7 x 70% = 1,470.
    { name: "Air Premia Blue Lite, KRW 300,000", input: { status: "blue", fare: "lite", fields: { airfare: 300000 } }, expect: 1470 }
  ],
  rules
};
