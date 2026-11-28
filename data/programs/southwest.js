const rules = {
  name: "Southwest Airlines | Rapid Rewards",
  // No carrier-imposed fees field: the airline adds none, or they never earn.
  noCarrier: true,
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
    { id: "plus", name: "Southwest Rapid Rewards Plus", rate: 2, bank: "Chase (US)" },
    { id: "premier", name: "Southwest Rapid Rewards Premier", rate: 3, bank: "Chase (US)" },
    { id: "priority", name: "Southwest Rapid Rewards Priority", rate: 4, bank: "Chase (US)" },
    { id: "debit", name: "Southwest Rapid Rewards Debit Card", rate: 1, kind: "debit" }
  ],
  // Announced for 1 January 2027 (southwest.com/rapid-rewards/2027):
  // Choice Preferred earns 8 and Choice Extra 10; A-List becomes Silver
  // (40% bonus), A-List Preferred becomes Gold (60%), and Platinum (120%)
  // is new.
  upcoming: {
    from: "2027-01-01",
    label: "From 1 January 2027",
    rules: {
      fareTypes: [
        { id: "basic", name: "Basic", rate: 2 },
        { id: "choice", name: "Choice", rate: 6 },
        { id: "choicePref", name: "Choice Preferred", rate: 8 },
        { id: "choiceExtra", name: "Choice Extra", rate: 10 }
      ],
      statuses: [
        { id: "member", name: "Rapid Rewards Member", multiplier: 1 },
        { id: "silver", name: "Silver", multiplier: 1.4 },
        { id: "gold", name: "Gold", multiplier: 1.6 },
        { id: "platinum", name: "Platinum", multiplier: 2.2 }
      ],
      note: "From 1 January 2027, Rapid Rewards earns per dollar of base fare only: 2 points on Basic, 6 on Choice, 8 on Choice Preferred, and 10 on Choice Extra. Silver (formerly A-List) adds a 40% bonus, Gold (formerly A-List Preferred) 60%, and the new Platinum level 120%."
    }
  },
  note: "Rapid Rewards earns per dollar of base fare only: 2 points on Basic, 6 on Choice, 10 on Choice Preferred, and 14 on Choice Extra. A-List adds a 25% bonus and A-List Preferred adds a 100% bonus. From 1 January 2027, Choice Preferred drops to 8 and Choice Extra to 10, A-List becomes Silver with a 40% bonus, A-List Preferred becomes Gold with a 60% bonus, and a new Platinum level earns a 120% bonus."
};

module.exports = {
  id: "southwest",
  // Month the earning rules were last checked against the source.
  reviewed: "2026-11",
  code: "WN",
  color: "#304CB2",
  source: "https://www.southwest.com/rapid-rewards/points/how-to-earn/",
  // Published examples. The browser tests check each one.
  examples: [
    // Southwest: southwest.com "How to Earn Points" ($200 base fare examples).
    { name: "Southwest Basic, member", input: { status: "member", fare: "basic", fields: { airfare: 200 } }, expect: 400 },
    { name: "Southwest Choice Extra, member", input: { status: "member", fare: "choiceExtra", fields: { airfare: 200 } }, expect: 2800 },
    { name: "Southwest Choice Preferred, A-List", input: { status: "alist", fare: "choicePref", fields: { airfare: 200 } }, expect: 2500 },
    { name: "Southwest Choice Extra, A-List Preferred", input: { status: "alistPref", fare: "choiceExtra", fields: { airfare: 200 } }, expect: 5600 },
    // Southwest 2027 page: Choice Extra 10 per $1; Platinum +120%.
    { name: "Southwest 2027 Choice Extra, Platinum (Coming Soon)", input: { rules: "upcoming", status: "platinum", fare: "choiceExtra", fields: { airfare: 200 } }, expect: 4400 },
    { name: "Southwest 2027 Choice Preferred, Silver (Coming Soon)", input: { rules: "upcoming", status: "silver", fare: "choicePref", fields: { airfare: 200 } }, expect: 2240 }
  ],
  rules
};
