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
  { id: "chase-aerlingus", name: "Chase Aer Lingus Visa Signature", rate: 3, currency: "USD", bank: "Chase (US)" },
  { id: "chase-iberia", name: "Chase Iberia Visa Signature", rate: 3, currency: "USD", bank: "Chase (US)" },
  { id: "chase-ba", name: "Chase British Airways Visa Signature", rate: 3, currency: "USD", bank: "Chase (US)" }
];

/* IAG: Aer Lingus, British Airways, Iberia, LEVEL, and Vueling in one program. Each airline brings
   its own loyalty program (currency, status levels, and cards). */
var baClub = {
  programName: "British Airways Club",
  // Eligible spend is the "base fare and carrier imposed charges", and the
  // Avios page also lists cabin upgrades, paid seats and additional baggage.
  carrierLabel: "Carrier-imposed Charges",
  carrierHint: "Charges British Airways adds to the fare (YQ/YR). They earn Avios like the fare. Service and change fees do not earn.",
  addons: true,
  addonsLabel: "Seats, Bags and/or Upgrades",
  addonsHint: "Seat selection, extra bags, and cabin upgrades bought from British Airways. They earn Avios like the fare.",
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
    { id: "amex", name: "British Airways American Express", rate: 1, bank: "American Express (UK)" },
    // Amex UK: a flat 1.25 Avios per pound since the 3x on British Airways
    // purchases ended on 7 October 2026.
    { id: "amex-pp", name: "British Airways American Express Premium Plus", rate: 1.25, bank: "American Express (UK)" },
    // 1.25 Avios per pound on all purchases, from
    // https://www.americanexpress.com/en-gb/credit-cards/british-airways-accelerating-card/
    { id: "amex-accelerating", name: "British Airways American Express Accelerating Business Card", rate: 1.25, bank: "American Express (UK)" },
    { id: "chase-aerlingus", name: "Chase Aer Lingus Visa Signature", rate: 3, currency: "USD", bank: "Chase (US)" },
    { id: "chase", name: "Chase British Airways Visa Signature", rate: 3, currency: "USD", bank: "Chase (US)" },
    { id: "chase-iberia", name: "Chase Iberia Visa Signature", rate: 3, currency: "USD", bank: "Chase (US)" }
  ],
  note: "British Airways Club earns 6 to 9 Avios per pound spent on the fare and carrier-imposed charges, by status. Paid seats, extra bags and cabin upgrades also earn. Airport charges, government taxes, and service or change fees do not earn. Enter fares in pounds. The UK British Airways American Express earns 1 Avios per pound and the Premium Plus 1.25 per pound on all purchases, including British Airways; the Premium Plus 3 Avios per pound on British Airways ended on 7 October 2026. The British Airways American Express Accelerating Business Card also earns 1.25 Avios per pound."
};
var iberiaClub = {
  programName: "Iberia Club",
  // Avios apply to "net spend, including additional services and operator
  // charges but excluding taxes and fees." (Iberia Club earning page)
  carrierLabel: "Carrier Charges",
  carrierHint: "Charges Iberia adds to the fare (YQ/YR). They earn Avios like the fare.",
  addons: true,
  addonsLabel: "Seats, Bags and/or Upgrades",
  addonsHint: "Seat selection, extra bags, and upgrades bought from Iberia. They earn Avios like the fare.",
  currency: "EUR",
  unit: "Avios",
  method: "spend",
  centsPerPoint: 1.0,
  statuses: iberiaStatuses,
  cards: avioUsCards,
  note: "Iberia Club earns 5 to 8 Avios per euro of the fare, carrier charges and additional services (seats, bags, upgrades) by status, plus 2 more per euro on flights within Spain and between Spain and Latin America, which this estimate does not add. The Infinita rates are not confirmed by Iberia. Taxes and fees do not earn."
};
var levelClub = {
  programName: "Iberia Club",
  // On LEVEL flights with the IB code, Avios on "net spend (fare and
  // carrier charges) excluding taxes and fees", plus additional baggage,
  // seat selection and cabin upgrades.
  carrierLabel: "Carrier Charges",
  carrierHint: "Charges LEVEL adds to the fare (YQ/YR). They earn Avios like the fare.",
  addons: true,
  addonsLabel: "Seats, Bags and/or Upgrades",
  addonsHint: "Seat selection, extra bags, and upgrades bought from LEVEL. They earn Avios like the fare.",
  currency: "EUR",
  statuses: iberiaStatuses,
  cards: avioUsCards,
  note: "LEVEL flights booked under an Iberia (IB) flight number earn Iberia Club Avios at the usual per-euro rates, on the fare, carrier charges, extra bags, seat selection and cabin upgrades. Taxes and fees do not earn. Flights sold under LEVEL's own code earn only between Barcelona and Oakland, Los Angeles, Punta Cana, and Buenos Aires, through 31 December 2026."
};
var vuelingClub = {
  programName: "Vueling Club",
  // Avios are earned "per passenger, excluding taxes and fees" (Vueling
  // help centre). Vueling shows no carrier charge on its bookings.
  noCarrier: true,
  currency: "EUR",
  statuses: [
    { id: "basic", name: "Basic", rate: 0 },
    { id: "smart", name: "Smart", rate: 3 },
    { id: "plus", name: "Plus", rate: 5 },
    { id: "premium", name: "Premium", rate: 7 }
  ],
  cards: null,
  note: "Since 2026, Vueling Club earns Avios on flights only from the Smart level up: 3, 5, or 7 Avios per euro of the fare. Earning starts after 3 flights or 200 euros spent in a year. Basic members earn no Avios on flights. Taxes and fees do not earn, and Vueling does not say that seats or bags bought separately earn, so this estimate counts the fare only."
};
var aerClub = {
  programName: "AerClub",
  // AerClub terms, clause 10.2 (from 1 March 2024): Avios are awarded "on
  // the basis of fare spend (excluding taxes, fees and charges, and any
  // ancillary retail spend". Aer Lingus's carrier imposed charge (mainly on
  // North Atlantic flights) therefore does not earn, and neither do extras.
  baseFareOnly: true,
  carrierLabel: "Carrier Imposed Charge",
  carrierHint: "The carrier imposed charge Aer Lingus adds, mainly on flights to and from North America. It does not earn Avios.",
  addons: true,
  addonsNoEarn: true,
  addonsLabel: "Seats, Bags and/or Upgrades",
  addonsHint: "Seat selection, bags, and upgrades bought from Aer Lingus. They do not earn Avios.",
  currency: "EUR",
  statuses: [
    { id: "green", name: "Green", rate: 3 },
    { id: "silver", name: "Silver", rate: 3.75 },
    { id: "platinum", name: "Platinum", rate: 4.5 },
    { id: "concierge", name: "Concierge", rate: 5.25 }
  ],
  // Co-branded cards: extra Avios per US dollar charged (fare + taxes).
  cards: [
    { id: "chase-aerlingus", name: "Chase Aer Lingus Visa Signature", rate: 3, currency: "USD", bank: "Chase (US)" },
    { id: "chase-ba", name: "Chase British Airways Visa Signature", rate: 3, currency: "USD", bank: "Chase (US)" },
    { id: "chase-iberia", name: "Chase Iberia Visa Signature", rate: 3, currency: "USD", bank: "Chase (US)" }
  ],
  note: "AerClub earns 3 Avios per euro of the Aer Lingus fare, excluding taxes, fees and charges (including the carrier imposed charge), bags, seats and other extras. Silver, Platinum, and Concierge add a 25%, 50%, or 75% tier bonus. Enter fares in euros. The US Chase cards earn per US dollar charged."
};

const rules = {
  name: "IAG | Avios",
  programName: "Avios",
  country: "IAG",
  unit: "Avios",
  method: "spend",
  centsPerPoint: 1.0,
  airlines: [
    { id: "ei", name: "Aer Lingus", country: "IE", program: aerClub },
    { id: "ba", name: "British Airways", country: "UK", program: baClub },
    { id: "ib", name: "Iberia", country: "ES", program: iberiaClub },
    { id: "level", name: "LEVEL", country: "ES", program: levelClub },
    { id: "vy", name: "Vueling", country: "ES", program: vuelingClub }
  ],
  // Defaults before an airline is chosen (British Airways).
  currency: baClub.currency,
  statuses: baClub.statuses,
  cards: baClub.cards,
  note: baClub.note
};

module.exports = {
  id: "iag",
  // Month the earning rules were last checked against the source.
  reviewed: "2026-11",
  // Two-letter code, brand color, and source page for each airline.
  airlines: {
    ei: { code: "EI", color: "#006272", source: "https://www.aerlingus.com/aerclub/collecting-avios/collect-avios-in-the-air/" },
    ba: { code: "BA", color: "#075AAA", source: "https://www.britishairways.com/content/the-british-airways-club/avios/collecting-avios/flights" },
    ib: { code: "IB", color: "#D7192D", source: "https://www.iberia.com/us/iberia-club/earn-avios-when-you-fly/" },
    level: { code: "LL", color: "#00AADB", source: "https://iberiaclubmagazine.iberia.com/en/collect-more-avios/flights/level/" },
    vy: { code: "VY", color: "#FFCC00", source: "https://help.vueling.com/hc/en-gb/articles/19798837592593-Avios-and-how-to-use-them" }
  },
  // Published examples. The browser tests check each one.
  examples: [
    // British Airways: paid seats, bags and upgrades earn Avios.
    { name: "British Airways extras earn", airline: "ba", input: { status: "blue", fields: { airfare: 200, carrierFees: 100, addons: 80 } }, expect: 2280 }
  ],
  rules
};
