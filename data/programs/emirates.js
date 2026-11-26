// Emirates publishes no earning table for its own flights, only a per-ticket
// miles calculator, so the flight itself is not estimated. Emirates is listed
// for its US co-branded cards, whose miles on Emirates purchases are known.
const rules = {
  name: "Emirates | Emirates Skywards",
  country: "AE",
  unit: "Skywards Miles",
  method: "cardOnly",
  statuses: [
    { id: "member", name: "Emirates Skywards Member", multiplier: 1 }
  ],
  // US co-branded cards (Barclays): 3 miles per dollar on eligible Emirates
  // purchases, such as tickets bought on emirates.com.
  cards: [
    { id: "barclays-rewards", name: "Emirates Skywards Rewards World Elite Mastercard", rate: 3, currency: "USD", bank: "Barclays (US)" },
    { id: "barclays-premium", name: "Emirates Skywards Premium World Elite Mastercard", rate: 3, currency: "USD", bank: "Barclays (US)" }
  ],
  // Emirates' own calculator, shown in the form and with the result.
  flightCalculator: {
    url: "https://www.emirates.com/us/english/skywards/miles-calculator/",
    label: "Emirates' Skywards Miles Calculator",
    text: "Emirates publishes no earning table, so this calculator counts only your card's miles. To estimate the Skywards Miles for your flight, enter your route and fare on Emirates' own calculator."
  },
  note: "Emirates is listed for its co-branded credit cards only. Emirates publishes no earning table for its flights, so the miles for the flight itself are not estimated here. Both US Emirates Skywards World Elite Mastercards from Barclays earn 3 Skywards Miles per dollar on eligible Emirates purchases."
};

module.exports = {
  id: "emirates",
  // Month the earning rules were last checked against the source.
  reviewed: "2026-11",
  code: "EK",
  color: "#D71921",
  source: "https://cards.barclaycardus.com/banking/cards/emirates-skywards-premium-world-elite-mastercard/",
  rules
};
