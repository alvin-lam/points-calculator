/* Norwegian Reward: Norwegian (DY) and, since 15 October 2025, Widerøe (WF).
   Norwegian: CashPoints by fare, from Norwegian Reward's flight-ticket page
   (https://www.norwegian.com/us/reward/earn-cashpoints/flight-tickets).
   Widerøe: Widerøe's help centre, "Earning and Using Spenn"
   (https://help.wideroe.no/hc/en-gb/articles/30806582842002) and
   "Retroactive Points Registration"
   (https://help.wideroe.no/hc/en-gb/articles/30806639498258), which give
   Mini 1, Smart 2 and Flex / Full Flex 3 Spenn per 10 NOK of the ticket
   price excluding taxes and fees, and say tender (PSO) routes earn nothing.
   The same rates are on Spenn Group's Widerøe page
   (https://spenngroup.com/nb-NO/articles/wideroe, 15 October 2025).
   Benefits: "Fordeler i Norwegian Reward"
   (https://help.wideroe.no/hc/no/articles/30806690961554): the first
   benefit after 8 flights is 2 extra Spenn per 10 kr, and Norwegian Reward
   Priority (32 flights in 12 months) gives 6 extra Spenn per 10 kr. Neither
   applies on tender routes. Widerøe publishes no CashPoints rates for
   members outside the Nordic countries. */

const rules = {
  name: "Norwegian | Norwegian Reward",
  programName: "Norwegian Reward",
  country: "NO",
  currency: "NOK",
  unit: "CashPoints",
  method: "spend",
  airlines: [
    { id: "dy", name: "Norwegian", country: "NO" },
    // Widerøe: Spenn per 10 NOK of the ticket price excluding taxes and
    // fees, by ticket type. The benefit levels add a flat amount per 10 NOK.
    { id: "wf", name: "Widerøe", country: "NO", program: {
        unit: "Spenn",
        rateAsPercent: false,
        ratePer: 10,
        defaultFareType: "mini",
        fareTypes: [
          { id: "mini", name: "Mini", rate: 0.1 },
          { id: "smart", name: "Smart", rate: 0.2 },
          { id: "flex", name: "Flex / Full Flex", rate: 0.3 }
        ],
        statuses: [
          { id: "member", name: "Norwegian Reward Member", multiplier: 1 },
          { id: "extra", name: "Extra Spenn benefit (after 8 flights)", multiplier: 1, addRate: 0.2 },
          { id: "priority", name: "Norwegian Reward Priority", multiplier: 1, addRate: 0.6 }
        ],
        note: "Widerøe flights earn Spenn on the ticket price excluding taxes and fees: 1 Spenn per 10 kroner with Mini, 2 with Smart, and 3 with Flex or Full Flex. The Extra Spenn benefit, which members get after their first 8 flights, adds 2 Spenn per 10 kroner. Norwegian Reward Priority adds 6 Spenn per 10 kroner. Routes in the tender (PSO) network earn nothing. Widerøe publishes these rates in Spenn, which members living in Norway, Sweden, Denmark, or Finland earn. It does not publish CashPoints rates for members living elsewhere. Enter the fare in kroner."
      } }
  ],
  // "CashPoints are calculated based on the net ticket price (excl. taxes,
  // charges and optional services)." (Norwegian Reward FAQ)
  noCarrier: true,
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
  note: "Norwegian Reward pays CashPoints worth 1%, 2%, or 5% of the net ticket price, by fare. Taxes, charges and optional services do not earn. One CashPoint is worth 1 Norwegian krone, so enter the fare in kroner. Members living in Norway, Sweden, Denmark, or Finland earn Spenn instead. Paying with a Bank Norwegian card raises LowFare to 3% and LowFare+ to 4%."
};

module.exports = {
  id: "norwegian",
  // Month the earning rules were last checked against the source.
  reviewed: "2026-11",
  code: "DY",
  color: "#D81939",
  source: "https://www.norwegian.com/us/reward/earn-cashpoints/flight-tickets",
  // Two-letter code, brand color, and source page for each airline.
  airlines: {
    dy: { code: "DY", color: "#D81939", source: "https://www.norwegian.com/us/reward/earn-cashpoints/flight-tickets" },
    wf: { code: "WF", color: "#1F8226", source: "https://help.wideroe.no/hc/en-gb/articles/30806582842002-Earning-and-Using-Spenn" }
  },
  // Published examples. The browser tests check each one.
  examples: [
    // Norwegian LowFare+: 2% of 1,500 kroner.
    { name: "Norwegian LowFare+", airline: "dy", input: { status: "member", fare: "lowfare-plus", fields: { airfare: 1500 } }, expect: 30 },
    // Widerøe Mini: 1 Spenn per 10 kroner of 1,000 kroner.
    { name: "Widerøe Mini", airline: "wf", input: { status: "member", fare: "mini", fields: { airfare: 1000 } }, expect: 100 },
    // Widerøe Smart with the Extra Spenn benefit: (2 + 2) per 10 kroner.
    { name: "Widerøe Smart with Extra Spenn", airline: "wf", input: { status: "extra", fare: "smart", fields: { airfare: 1000 } }, expect: 400 },
    // Widerøe Flex for a Priority member: (3 + 6) per 10 kroner.
    { name: "Widerøe Flex, Priority", airline: "wf", input: { status: "priority", fare: "flex", fields: { airfare: 1000 } }, expect: 900 }
  ],
  rules
};
