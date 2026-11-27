/* KM Malta Airlines (KM): KMrewards SkyBux on KM Malta Airlines flights, from
   KMrewards' Collecting SkyBux page (kmrewards.mt/collecting-skybux), its
   Status Benefits page, the KMrewards Terms and Conditions and the official
   Collecting Scenarios PDF (Earning-Scenarios.pdf). SkyBux are a percentage
   of the base fare in euros, excluding taxes, fees and charges, set by fare
   family: Economy Basic 1.5%, Value 2%, Plus 3%, Flex 4.5%; Business Basic
   5.25%, Value 5.75%, Plus 6.75%, Flex 8.25%. The KM Elite tier bonus is
   figured on those SkyBux: Traveller 4%, Explorer 8%, Pioneer 14%. Eligible
   in-house extras earn a fixed 2% with no tier bonus. The percentage is of
   the fare in euros and 1 SkyBux is EUR 0.01, so each euro earns 1.5 to
   8.25 SkyBux before the tier bonus. The scenarios round to the nearest
   SkyBux (330.72 becomes 331). */
const rules = {
  name: "KM Malta Airlines | KMrewards",
  programName: "KMrewards",
  country: "MT",
  currency: "EUR",
  unit: "SkyBux",
  method: "spend",
  // SkyBux earn on the base fare only, not taxes, fees or charges.
  noCarrier: true,
  roundNearest: true,
  addons: true,
  addonsRate: 2,
  addonsRateLabel: "extras",
  addonsLabel: "Flight Extras",
  addonsHint: "Excess baggage, sports or musical equipment, seat selection, pets in the cabin and other in-house extras bought from KM Malta Airlines. They earn a fixed 2% (2 SkyBux per euro) with no tier bonus.",
  centsPerPoint: 1,
  defaultFareType: "eco-value",
  // SkyBux per euro of base fare (the published percentage of the fare,
  // where 1 SkyBux is EUR 0.01).
  fareTypes: [
    { id: "eco-basic", name: "Economy Basic", rate: 1.5 },
    { id: "eco-value", name: "Economy Value", rate: 2 },
    { id: "eco-plus", name: "Economy Plus", rate: 3 },
    { id: "eco-flex", name: "Economy Flex", rate: 4.5 },
    { id: "bus-basic", name: "Business Basic", rate: 5.25 },
    { id: "bus-value", name: "Business Value", rate: 5.75 },
    { id: "bus-plus", name: "Business Plus", rate: 6.75 },
    { id: "bus-flex", name: "Business Flex", rate: 8.25 }
  ],
  // KM Elite tier bonus on the fare family SkyBux.
  statuses: [
    { id: "member", name: "Member", multiplier: 1 },
    { id: "traveller", name: "Traveller", multiplier: 1.04 },
    { id: "explorer", name: "Explorer", multiplier: 1.08 },
    { id: "pioneer", name: "Pioneer", multiplier: 1.14 }
  ],
  note: "KMrewards earns SkyBux on the base fare in euros, excluding taxes, fees and charges. The rate depends on the fare family: 1.5% on Economy Basic, 2% on Value, 3% on Plus and 4.5% on Flex, and 5.25%, 5.75%, 6.75% and 8.25% on the matching Business fares. One SkyBux is worth EUR 0.01, so a 1.5% rate is 1.5 SkyBux per euro. KM Elite members add a tier bonus on those SkyBux: 4% for Traveller, 8% for Explorer and 14% for Pioneer. Eligible extras such as excess baggage and seat selection earn a fixed 2% with no tier bonus. Only flights operated by KM Malta Airlines earn, including tickets bought from third parties. Hidden fares are excluded. Enter fares in euros."
};

module.exports = {
  id: "kmmalta",
  // Month the earning rules were last checked against the source.
  reviewed: "2026-11",
  code: "KM",
  color: "#C7102E",
  source: "https://kmrewards.mt/collecting-skybux",
  // KMrewards Collecting Scenarios 2, 4 and 5.
  examples: [
    { name: "KM Member Economy Basic with excess baggage (KMrewards scenario 2)", input: { status: "member", fare: "eco-basic", fields: { airfare: 106, addons: 25 } }, expect: 209 },
    { name: "KM Explorer Economy Flex (KMrewards scenario 4)", input: { status: "explorer", fare: "eco-flex", fields: { airfare: 106 } }, expect: 515 },
    { name: "KM Pioneer Business Basic (KMrewards scenario 5)", input: { status: "pioneer", fare: "bus-basic", fields: { airfare: 392 } }, expect: 2346 }
  ],
  rules
};
