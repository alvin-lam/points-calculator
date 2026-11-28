// Co-branded cards. Each airline shows US cards and its own home-market
// cards: French cards for Air France, Dutch cards for KLM.
const usCards = [
  { id: "boa", name: "Air France KLM Visa Signature", rate: 3, currency: "USD", bank: "Bank of America (US)" }
];
// French cards: Miles per euro charged at Air France, KLM and Transavia.
const frCards = [
  { id: "amex-fr-silver", name: "Air France KLM American Express Silver", rate: 1, bank: "American Express (France)" },
  { id: "amex-fr-gold", name: "Air France KLM American Express Gold", rate: 1.5, bank: "American Express (France)" },
  { id: "amex-fr-platinum", name: "Air France KLM American Express Platinum", rate: 3, bank: "American Express (France)" }
];
// Dutch cards: Miles per euro charged at Air France and KLM.
const nlCards = [
  { id: "amex-nl-gold", name: "Flying Blue American Express Gold Card", rate: 1.5, bank: "American Express (Netherlands)" },
  { id: "amex-nl-platinum", name: "Flying Blue American Express Platinum Card", rate: 2, bank: "American Express (Netherlands)" }
];
const rules = {
  name: "Air France-KLM | Flying Blue",
  programName: "Flying Blue",
  country: "AFKL",
  currency: "EUR",
  unit: "Miles",
  method: "spend",
  centsPerPoint: 1.2,
  // "Miles for each euro you spend ... (including the carrier surcharge,
  // but excluding other taxes and fees) and when you buy extra options such
  // as extra baggage, seats, and à la carte meals." (KLM and Air France)
  carrierLabel: "Carrier Surcharge",
  carrierHint: "The Air France or KLM carrier surcharge (YQ/YR) on the ticket. It earns Miles like the fare.",
  addons: true,
  addonsLabel: "Seats, Bags and/or Meals",
  addonsHint: "Extra baggage, seat reservations, à la carte meals and upgrades bought from Air France or KLM for your own trip. They earn Miles like the fare.",
  // The operating airline; all earn the same Flying Blue rates. Transavia
  // is not in SkyTeam, and the US card's bonus is not confirmed for it.
  airlines: [
    { id: "af", name: "Air France", country: "FR", program: { cards: usCards.concat(frCards) } },
    { id: "kl", name: "KLM", country: "NL", program: { cards: usCards.concat(nlCards) } },
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
        addons: false,
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
      } },
    // Aircalin (SB) earns Flying Blue Miles by distance and booking class,
    // not by price, from Aircalin's Flying Blue page (aircalin.nc/en/flying-blue,
    // checked Nov 2026; the French page aircalin.com/fr/flying-blue matches).
    // Two published class tables: regional/medium-haul and international/
    // long-haul. Elite bonus: Silver 50%, Gold 75%, Platinum and Ultimate
    // 100%, figured on the distance times the class share capped at 100%.
    // So classes above 100% get the bonus on the distance (bonusOnDistance),
    // and classes below 100% get it on the miles earned (multiplier).
    { id: "sb", name: "Aircalin", country: "NC", noAlliance: true,
      program: {
        cards: null,
        addons: false,
        method: "distance",
        currency: "XPF",
        // Flying Blue's 1.2 euro cents a mile, in Pacific francs (fixed at
        // 119.33 to the euro), since the franc has no hundredths.
        valuePerPoint: 1.43,
        defaultFareType: "ybs",
        fareTypeLabel: "Booking Class",
        zoneLabel: "Aircalin network",
        zoneHint: "Aircalin publishes one class table for its regional network and another for its long-haul network.",
        zones: [
          { id: "regional", name: "Regional (Australia, New Zealand, Fiji, Vanuatu, Wallis, Tahiti)" },
          { id: "longhaul", name: "Long-haul (Singapore, Bangkok, Paris, Los Angeles)" }
        ],
        unavailableText: " is not in Aircalin's table for this network.",
        fareTypes: [
          { id: "j", name: "Business Hibiscus (J)", earn: [1.75, 1.75], bonusOnDistance: true },
          { id: "d", name: "Business Hibiscus (D)", zones: ["regional"], earn: [1.5, null], bonusOnDistance: true },
          { id: "cd", name: "Business Hibiscus (C, D)", zones: ["longhaul"], earn: [null, 1.5], bonusOnDistance: true },
          { id: "zi", name: "Business Hibiscus (Z, I)", earn: [1.25, 1.25], bonusOnDistance: true },
          { id: "wp", name: "Premium Economy (W, P)", earn: [1.25, 1.25], bonusOnDistance: true },
          { id: "f", name: "Premium Economy (F)", earn: [1, 1] },
          { id: "ybs", name: "Economy (Y, B, S)", earn: [1, 1] },
          { id: "hkrl", name: "Economy (H, K, R, L)", zones: ["regional"], earn: [0.5, null] },
          { id: "mquvtg", name: "Economy (M, U, Q, V, T, G)", zones: ["regional"], earn: [0.25, null] },
          { id: "na", name: "Economy (N, A)", zones: ["regional"], earn: [0.1, null] },
          { id: "kh", name: "Economy (K, H)", zones: ["longhaul"], earn: [null, 0.75] },
          { id: "qruvl", name: "Economy (Q, R, U, V, L)", zones: ["longhaul"], earn: [null, 0.5] },
          { id: "nm", name: "Economy (N, M)", zones: ["longhaul"], earn: [null, 0.2] },
          { id: "a", name: "Economy (A)", zones: ["longhaul"], earn: [null, 0.1] }
        ],
        statuses: [
          { id: "explorer", name: "Explorer", multiplier: 1 },
          { id: "silver", name: "Silver", multiplier: 1.5 },
          { id: "gold", name: "Gold", multiplier: 1.75 },
          { id: "platinum", name: "Platinum", multiplier: 2 },
          { id: "ultimate", name: "Ultimate", multiplier: 2 }
        ],
        note: "Aircalin flights earn Flying Blue Miles as a share of the distance flown, set by booking class, not by price. Aircalin publishes one table for its regional network and one for its long-haul network to Singapore, Bangkok, Paris and Los Angeles. Business Hibiscus earns 125% to 175%, Premium Economy 100% or 125%, and Economy 10% to 100%. Silver adds 50%, Gold 75%, and Platinum and Ultimate 100%. The bonus is figured on the distance times the class share, with the share capped at 100%. This applies to flights sold under an SB or AF flight number and operated by Aircalin. The tables do not apply to award tickets or to classes they do not list. Aircalin does not say which table its domestic flights within New Caledonia use. The Aircalin American Express card earns its own Aircalin Points, not Flying Blue Miles, so it is not shown."
      } }
  ],
  statuses: [
    { id: "explorer", name: "Explorer", rate: 4 },
    { id: "silver", name: "Silver", rate: 6 },
    { id: "gold", name: "Gold", rate: 7 },
    { id: "platinum", name: "Platinum", rate: 8 },
    { id: "ultimate", name: "Ultimate", rate: 9 }
  ],
  cards: usCards.concat(frCards, nlCards),
  note: "Flying Blue earns 4 to 9 Miles per euro spent on the fare and carrier surcharge on Air France and KLM, by status, and on extra baggage, seats and à la carte meals for your own trip. Government taxes and other fees do not earn. Enter fares in euros. The US Bank of America card earns per US dollar charged. The Dutch American Express Gold and Platinum cards earn 1.5 and 2 Miles per euro at Air France and KLM. In France, the Air France KLM American Express Silver, Gold and Platinum cards earn 1, 1.5 and 3 Miles per euro at Air France, KLM and Transavia. Air France lists its French cards and KLM its Dutch cards."
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
    sb: { code: "SB", color: "#004388", source: "https://www.aircalin.nc/en/flying-blue" },
    transavia: { code: "HV", codes: ["HV", "TO"], color: "#05CE78", source: "https://www.flyingblue.com/en/earn/partners/airline-transavia" }
  },
  examples: [
    { name: "Aircalin Noumea-Sydney Economy (Y)", airline: "sb", input: { fare: "ybs", status: "explorer", zone: "regional", fields: { distance: 1230 } }, expect: 1230 },
    { name: "Aircalin Noumea-Bangkok Business (J), Platinum", airline: "sb", input: { fare: "j", status: "platinum", zone: "longhaul", fields: { distance: 5073 } }, expect: 13951 },
    { name: "Aircalin Noumea-Nadi Economy (Q), Silver", airline: "sb", input: { fare: "mquvtg", status: "silver", zone: "regional", fields: { distance: 787 } }, expect: 295 }
  ],
  rules
};
