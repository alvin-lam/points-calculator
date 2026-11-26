const rules = {
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
    // Transavia France (TO) and Transavia (HV) are one entry, listed under
    // both France and the Netherlands.
    // Transavia earns a fixed number of Miles per one-way flight by fare
    // and level (Flying Blue's Transavia partner page, also on KLM's site,
    // and Transavia's help pages):
    // Explorer 100 Basic, 250 Smart or Plus, 500 Max; Silver, Gold and
    // Platinum add 50%, 75% and 100% (Gold 438 = 250 x 1.75, rounded).
    // Ultimate is not listed and is shown at the Platinum amounts.
    { id: "transavia", name: "Transavia", country: "NL", countries: ["NL", "FR"], noAlliance: true,
      program: {
        cards: null,
        method: "zone",
        defaultFareType: "smart",
        fareTypes: [
          { id: "basic", name: "Basic" },
          { id: "smart", name: "Smart" },
          { id: "plus", name: "Plus" },
          { id: "max", name: "Max" }
        ],
        zones: [{ id: "any", name: "Any Transavia flight", points: [100, 250, 250, 500] }],
        statuses: [
          { id: "explorer", name: "Explorer", bonus: 0 },
          { id: "silver", name: "Silver", bonus: 0.5 },
          { id: "gold", name: "Gold", bonus: 0.75 },
          { id: "platinum", name: "Platinum", bonus: 1 },
          { id: "ultimate", name: "Ultimate", bonus: 1 }
        ],
        note: "Transavia earns a fixed number of Flying Blue Miles per one-way flight, set by fare and level, not by price: Explorer earns 100 on Basic, 250 on Smart or Plus and 500 on Max. Silver, Gold and Platinum earn 150, 375 and 750; 175, 438 and 875; and 200, 500 and 1,000. Ultimate is not listed separately and is shown at the Platinum amounts. All fares earn, Basic included, on Transavia (HV) and Transavia France (TO) flights. Add your Flying Blue number to the booking. Flights booked with Miles earn nothing."
      } }
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
    { id: "boa", name: "Air France KLM Visa Signature", rate: 3, currency: "USD", bank: "Bank of America (US)" },
    // French cards: Miles per euro charged at Air France, KLM and Transavia.
    { id: "amex-fr-silver", name: "Air France KLM American Express Silver", rate: 1, bank: "American Express (France)" },
    { id: "amex-fr-gold", name: "Air France KLM American Express Gold", rate: 1.5, bank: "American Express (France)" },
    { id: "amex-fr-platinum", name: "Air France KLM American Express Platinum", rate: 3, bank: "American Express (France)" },
    // Dutch cards: Miles per euro charged at Air France and KLM.
    { id: "amex-nl-gold", name: "Flying Blue American Express Gold Card", rate: 1.5, bank: "American Express (Netherlands)" },
    { id: "amex-nl-platinum", name: "Flying Blue American Express Platinum Card", rate: 2, bank: "American Express (Netherlands)" }
  ],
  note: "Flying Blue earns 4 to 9 Miles per euro spent on the fare and carrier charges on Air France and KLM, by status. Taxes do not earn. Enter fares in euros. The US Bank of America card earns per US dollar charged. The Dutch American Express Gold and Platinum cards earn 1.5 and 2 Miles per euro at Air France and KLM. In France, the Air France KLM American Express Silver, Gold and Platinum cards earn 1, 1.5 and 3 Miles per euro at Air France, KLM and Transavia."
};

module.exports = {
  id: "flyingblue",
  // Month the earning rules were last checked against the source.
  reviewed: "2026-11",
  source: "https://www.flyingblue.com/en/earn",
  // Two-letter code, brand color, and source page for each airline.
  airlines: {
    af: { code: "AF", color: "#002157" },
    kl: { code: "KL", color: "#00A1DE" },
    transavia: { code: "HV", codes: ["HV", "TO"], color: "#05CE78", source: "https://www.flyingblue.com/en/earn/partners/airline-transavia" }
  },
  rules
};
