/* Miles & More: one program across the Lufthansa Group airlines. Award
   miles are earned per euro of the fare; status members earn more, and
   how much more depends on the operating airline. */

// Co-branded cards. Every airline shows the US card; German airlines add
// the German cards and Swiss airlines the Swiss cards.
// Co-branded card: extra miles per US dollar charged (fare + taxes).
const usCards = [
  { id: "barclays", name: "Miles & More World Elite Mastercard", rate: 2, currency: "USD", bank: "Barclays (US)" }
];
// German cards (Deutsche Bank): 1 mile per 2 euros charged, with no extra
// for Lufthansa Group purchases. From https://www.miles-and-more-kreditkarte.com/
const deCards = [
  { id: "db-mm", name: "Miles & More Credit Card (Blue, Gold or MyFlex)", rate: 1 / 2, per: 2, bank: "Deutsche Bank (Germany)" }
];
// Swiss cards (Swisscard): miles per CHF 2 charged, with no extra for
// SWISS purchases. Each package pairs an American Express card with a Visa
// or Mastercard that earns less. From Swisscard's card overview:
// https://www.swisscard.ch/dam/jcr:050ed06c-c2de-46da-9227-ed8a8e61fb79/leistungsuebersicht-swiss-miles-and-more-cards-en.pdf
const chCards = [
  { id: "swisscard-classic-amex", name: "SWISS Miles & More Classic American Express", rate: 1.5 / 2, rateText: "1.5 per CHF 2", currency: "CHF", bank: "Swisscard (Switzerland)" },
  { id: "swisscard-classic-visa-mc", name: "SWISS Miles & More Classic Visa or Mastercard", rate: 0.6 / 2, rateText: "0.6 per CHF 2", currency: "CHF", bank: "Swisscard (Switzerland)" },
  { id: "swisscard-gold-amex", name: "SWISS Miles & More Gold American Express", rate: 2 / 2, rateText: "2 per CHF 2", currency: "CHF", bank: "Swisscard (Switzerland)" },
  { id: "swisscard-gold-visa-mc", name: "SWISS Miles & More Gold Visa or Mastercard", rate: 0.8 / 2, rateText: "0.8 per CHF 2", currency: "CHF", bank: "Swisscard (Switzerland)" },
  { id: "swisscard-platinum-amex", name: "SWISS Miles & More Platinum American Express", rate: 2.4 / 2, rateText: "2.4 per CHF 2", currency: "CHF", bank: "Swisscard (Switzerland)" },
  { id: "swisscard-platinum-visa-mc", name: "SWISS Miles & More Platinum Visa or Mastercard", rate: 1 / 2, rateText: "1 per CHF 2", currency: "CHF", bank: "Swisscard (Switzerland)" },
  // Cornèrcard Miles & More cards: miles per CHF 2 charged in Swiss francs,
  // with no extra for SWISS purchases. Each package pairs a Visa or
  // Mastercard with a Diners Club card that earns more. The Visa or
  // Mastercard earns a little more in foreign currencies, which is left out.
  // From https://www.cornercard.ch/de/kreditkarten/cornercard-miles-more-kombi-angebot-classic/
  // (and the -gold/ and -platinum/ pages).
  { id: "corner-classic-visa", name: "Cornèrcard Miles & More Classic Visa or Mastercard", rate: 0.8 / 2, rateText: "0.8 per CHF 2", currency: "CHF", bank: "Cornèrcard (Switzerland)" },
  { id: "corner-classic-diners", name: "Cornèrcard Miles & More Classic Diners Club", rate: 2 / 2, rateText: "2 per CHF 2", currency: "CHF", bank: "Cornèrcard (Switzerland)" },
  { id: "corner-gold-visa", name: "Cornèrcard Miles & More Gold Visa", rate: 1 / 2, rateText: "1 per CHF 2", currency: "CHF", bank: "Cornèrcard (Switzerland)" },
  { id: "corner-gold-diners", name: "Cornèrcard Miles & More Gold Diners Club", rate: 2 / 2, rateText: "2 per CHF 2", currency: "CHF", bank: "Cornèrcard (Switzerland)" },
  { id: "corner-platinum-visa", name: "Cornèrcard Miles & More Platinum Visa", rate: 1.2 / 2, rateText: "1.2 per CHF 2", currency: "CHF", bank: "Cornèrcard (Switzerland)" },
  { id: "corner-platinum-diners", name: "Cornèrcard Miles & More Platinum Diners Club", rate: 2.4 / 2, rateText: "2.4 per CHF 2", currency: "CHF", bank: "Cornèrcard (Switzerland)" }
];
// Austrian card (Erste Bank and Sparkasse, since December 2025): 1 mile per
// 1.50 euros charged, plus 1 bonus mile per euro spent on austrian.com.
// From https://www.sparkasse.at/sgruppe/privatkunden/konto-karten/s-kreditkarten/s-mastercard/miles-more-kreditkarten/austrian-miles-more-premiumcard
const atCards = [
  { id: "erste-premiumcard", name: "Austrian Miles & More Premiumcard (booked on austrian.com)", rate: 1 / 1.5 + 1, rateText: "1 per €1.50, plus 1 per €1 on austrian.com", bank: "Erste Bank and Sparkasse (Austria)" }
];
// Belgian cards (Beobank): 2 miles per euro spent with Brussels Airlines on
// all three cards. From
// https://www.beobank.be/fr/payer/cartes-de-credit/mastercard-brussels-airlines-explore.html
// (and the -horizon and -altitude pages).
const beCards = [
  { id: "beobank-explore", name: "Beobank Brussels Airlines Explore Mastercard", rate: 2, bank: "Beobank (Belgium)" },
  { id: "beobank-horizon", name: "Beobank Brussels Airlines Horizon Mastercard", rate: 2, bank: "Beobank (Belgium)" },
  { id: "beobank-altitude", name: "Beobank Brussels Airlines Altitude Mastercard", rate: 2, bank: "Beobank (Belgium)" }
];

const rules = {
  name: "Lufthansa Group | Miles & More",
  programName: "Miles & More",
  country: "LHG",
  currency: "EUR",
  unit: "miles",
  method: "spend",
  centsPerPoint: 1.0,
  // eliteRate: miles per euro for Frequent Traveller, Senator, and HON Circle.
  airlines: [
    { id: "lh", name: "Lufthansa", country: "DE", eliteRate: 6,
      program: { cards: usCards.concat(deCards) } },
    { id: "ew", name: "Eurowings", country: "DE", eliteRate: 5, noAlliance: true,
      program: { minPoints: 125, cards: usCards.concat(deCards) } },
    { id: "de", name: "Discover Airlines", country: "DE", eliteRate: 5, noAlliance: true,
      program: { cards: usCards.concat(deCards) } },
    { id: "os", name: "Austrian Airlines", country: "AT", eliteRate: 6,
      program: { cards: usCards.concat(atCards) } },
    { id: "lx", name: "SWISS", country: "CH", eliteRate: 6,
      program: { cards: usCards.concat(chCards) },
      note: "SWISS fares in Swiss francs earn at the euro equivalent." },
    { id: "sn", name: "Brussels Airlines", country: "BE", eliteRate: 6,
      program: { cards: usCards.concat(beCards) } },
    { id: "wk", name: "Edelweiss", country: "CH", eliteRate: 6, noAlliance: true,
      program: { cards: usCards.concat(chCards) },
      note: "Edelweiss earns on spend only when the ticket price is available to Miles & More." },
    { id: "en", name: "Air Dolomiti", country: "IT", eliteRate: 6, noAlliance: true,
      program: { minPoints: 125 },
      note: "Air Dolomiti tickets (ticket number 101) and Lufthansa tickets earn at least 125 miles per flight. Air Dolomiti's own status rate has not been published, so it uses the Lufthansa rate." },
    { id: "az", name: "ITA Airways", country: "IT", program: {
      method: "distance",
      defaultFareType: "m",
      zoneLabel: "Route type",
      zoneHint: "Within Europe ITA pays a fixed amount per flight; elsewhere a share of the distance, with a minimum.",
      zones: [
        { id: "intl", name: "Worldwide (to or from outside Europe)" },
        { id: "eu", name: "Between European countries", fixed: true },
        { id: "dom", name: "Within one European country", fixed: true }
      ],
      // Earn lists follow the zones order. From Miles & More's ITA table.
      fareTypes: [
        { id: "j", name: "Business (C, D, J)", earn: [{ share: 2, min: 1000 }, { fixed: 2000 }, { fixed: 1500 }] },
        { id: "z", name: "Business (Z)", earn: [{ share: 1.5, min: 750 }, { fixed: 1250 }, { fixed: 1000 }] },
        { id: "p", name: "Business (P)", earn: [{ share: 1, min: 500 }, { fixed: 750 }, { fixed: 500 }] },
        { id: "pe-eg", name: "Premium Economy (E, G)", earn: [{ share: 1.5, min: 750 }, null, null] },
        { id: "pe-n", name: "Premium Economy (N)", earn: [{ share: 1, min: 500 }, null, null] },
        { id: "y", name: "Economy (B, Y)", earn: [{ share: 1.5, min: 750 }, { fixed: 1250 }, { fixed: 1000 }] },
        { id: "m", name: "Economy (M)", earn: [{ share: 1, min: 500 }, { fixed: 1250 }, { fixed: 500 }] },
        { id: "hu", name: "Economy (H, U)", earn: [{ share: 1, min: 500 }, { fixed: 750 }, { fixed: 500 }] },
        { id: "qv", name: "Economy (Q, V)", earn: [{ share: 0.5, min: 250 }, { fixed: 750 }, { fixed: 250 }] },
        { id: "sw", name: "Economy (S, W)", earn: [{ share: 0.5, min: 250 }, { fixed: 500 }, { fixed: 250 }] },
        { id: "klt", name: "Economy (K, L, T)", earn: [{ share: 0.25, min: 250 }, { fixed: 125 }, { fixed: 125 }] }
      ],
      note: "ITA Airways joined Miles & More on 1 April 2026. Miles & More publishes booking-class tables for ITA: a fixed number of miles within Europe, and a share of the distance, with a minimum, on other flights. Classes A, F, I, O, R, and X earn nothing. Status members earn up to 50% more on ITA, but Miles & More does not publish how much, so this estimate leaves it out."
    } }
  ],
  statuses: [
    { id: "member", name: "Miles & More Member", rate: 4 },
    { id: "ftl", name: "Frequent Traveller", rate: 6, elite: true },
    { id: "sen", name: "Senator", rate: 6, elite: true },
    { id: "hon", name: "HON Circle", rate: 6, elite: true }
  ],
  cards: usCards,
  // "miles are calculated according to the airfare, i.e. the ticket price +
  // surcharges levied by the Miles & More airline partner." The expert
  // calculator asks for the international/national surcharge separately.
  carrierLabel: "International/National Surcharge",
  carrierHint: "The surcharge levied by the airline (YQ/YR), entered separately from taxes. It earns miles like the fare.",
  note: "Miles & More earns award miles per euro of the ticket price plus the airline's surcharges, not by distance: 4 per euro for members. Frequent Traveller, Senator, and HON Circle earn 6 per euro on Lufthansa, SWISS, Austrian, Brussels, and Air Dolomiti, and 5 on Eurowings and Discover. Eurowings and Air Dolomiti flights earn at least 125 miles. Taxes, fees and product or service charges do not earn. Enter fares in euros. The US Barclays card earns per US dollar charged. Lufthansa, Eurowings and Discover also list the German Deutsche Bank Miles & More credit cards, which earn 1 mile per 2 euros. SWISS and Edelweiss list the Swiss Swisscard SWISS Miles & More cards, which earn per CHF 2: 1.5, 2 or 2.4 miles on the Classic, Gold or Platinum American Express, and 0.6, 0.8 or 1 on the matching Visa or Mastercard. They also list the Cornèrcard Miles & More cards, which earn per CHF 2 in Swiss francs: 0.8, 1 or 1.2 miles on the Classic, Gold or Platinum Visa, and 2, 2 or 2.4 on the matching Diners Club card. Austrian lists the Austrian Miles & More Premiumcard from Erste Bank and Sparkasse, which earns 1 mile per 1.50 euros plus 1 bonus mile per euro spent on austrian.com. Brussels Airlines lists the Belgian Beobank Brussels Airlines Mastercards, which earn 2 miles per euro spent with Brussels Airlines."
};

/* LOT and Croatia Airlines credit to Miles & More; they join that program
   as airlines with their own earning tables. */
rules.airlines.push(
  { id: "lo", name: "LOT Polish Airlines", country: "PL", program: {
      method: "distance",
      // Tickets issued by a Lufthansa Group airline earn on the fare.
      earnLabel: "Who issued your ticket?",
      earnHint: "Lufthansa Group tickets start with 220, 724, 257, 082, or 101.",
      earnMethods: [
        { id: "distance", name: "LOT ticket (number 080) or another airline's ticket: booking class" },
        { id: "spend", name: "Lufthansa Group ticket: 4 miles per euro, 6 with status", noFareType: true }
      ],
      defaultFareType: "y-mid",
      zoneLabel: "Route type",
      zoneHint: "Within Europe LOT pays a fixed amount per flight; outside Europe a share of the distance, with a minimum.",
      zones: [
        { id: "intl", name: "International (to or from outside Europe)" },
        { id: "eu", name: "Between European countries", fixed: true },
        { id: "dom", name: "Within one European country", fixed: true }
      ],
      // Earn lists follow the zones order.
      fareTypes: [
          { id: "j", name: "Business (C, D)", earn: [{ share: 2, min: 1000 }, { fixed: 2000 }, null] },
          { id: "jz", name: "Business (F, Z)", earn: [{ share: 1.5, min: 750 }, { fixed: 1250 }, null] },
          { id: "pe-p", name: "Premium Economy (P)", earn: [{ share: 1.6, min: 750 }, { fixed: 1350 }, null] },
          { id: "pe-a", name: "Premium Economy (A)", earn: [{ share: 1.5, min: 750 }, { fixed: 1250 }, null] },
          { id: "pe-r", name: "Premium Economy (R)", earn: [{ share: 1, min: 500 }, { fixed: 750 }, null] },
          { id: "y-high", name: "Economy (Y, B)", earn: [{ share: 1.5, min: 750 }, { fixed: 1250 }, { fixed: 1000 }] },
          { id: "y-m", name: "Economy (M)", earn: [{ share: 1, min: 500 }, { fixed: 1250 }, { fixed: 500 }] },
          { id: "y-mid", name: "Economy (E, H, K)", earn: [{ share: 1, min: 500 }, { fixed: 750 }, { fixed: 500 }] },
          { id: "y-q", name: "Economy (Q)", earn: [{ share: 1, min: 500 }, { fixed: 750 }, { fixed: 250 }] },
          { id: "y-low", name: "Economy (G, S, T, V)", earn: [{ share: 0.5, min: 250 }, { fixed: 500 }, { fixed: 250 }] },
          { id: "y-lowest", name: "Economy (L, O, U, W)", earn: [{ share: 0.25, min: 250 }, { fixed: 125 }, { fixed: 125 }] }
      ],
      note: "On LOT tickets (ticket number 080), Miles & More pays a fixed amount per flight within Europe and a share of the distance, with a minimum, outside Europe. Status members earn up to 25% more on LOT, but Miles & More does not publish how much, so this estimate leaves it out. LOT flights on a Lufthansa Group ticket earn 4 miles per euro of the fare plus surcharges, or 6 with status."
    } },
  { id: "ou", name: "Croatia Airlines", country: "HR", program: {
      method: "zone",
      // Tickets issued by a Lufthansa Group airline earn on the fare.
      earnLabel: "Who issued your ticket?",
      earnHint: "Lufthansa Group tickets start with 220, 724, 257, 082, or 101.",
      earnMethods: [
        { id: "zone", name: "Croatia Airlines ticket (number 831) or another airline's ticket: booking class" },
        { id: "spend", name: "Lufthansa Group ticket: 4 miles per euro, 6 with status", noFareType: true }
      ],
      defaultFareType: "y-mid",
      zoneLabel: "Route type",
      zoneHint: "Croatia Airlines pays a fixed amount per flight, whatever the distance.",
      fareTypes: [
          { id: "j", name: "Business (C, D)" },
          { id: "jz", name: "Business (Z)" },
          { id: "y-high", name: "Economy (B, Y)" },
          { id: "y-m", name: "Economy (M)" },
          { id: "y-mid", name: "Economy (A, F, H, J)" },
          { id: "y-q", name: "Economy (G, O, Q)" },
          { id: "y-low", name: "Economy (K, V)" },
          { id: "y-sw", name: "Economy (S, W)" },
          { id: "y-lowest", name: "Economy (E, L, P, T, U)" }
      ],
      zones: [
        { id: "eu", name: "Between European countries", points: [2000, 1250, 1250, 1250, 750, 750, 500, 500, 125] },
        { id: "dom", name: "Within Croatia", points: [1500, 750, 750, 500, 500, 250, 250, 125, 125] }
      ],
      note: "On Croatia Airlines, Miles & More pays a fixed amount per flight by booking class: one amount within Croatia and another between European countries. Status members earn up to 50% more, but Miles & More does not publish how much, so this estimate leaves it out. Croatia Airlines flights on a Lufthansa Group ticket earn 4 miles per euro of the fare plus surcharges, or 6 with status."
    } }
);

module.exports = {
  id: "milesandmore",
  // Month the earning rules were last checked against the source.
  reviewed: "2026-11",
  source: "https://www.miles-and-more.com/row/en/program/flight-benefits/calculate-flight-miles.html",
  // Two-letter code, brand color, and source page for each airline.
  airlines: {
    lh: { code: "LH", color: "#05164D" },
    ew: { code: "EW", color: "#871C54" },
    de: { code: "4Y", color: "#1F73B0" },
    os: { code: "OS", color: "#E30613" },
    lx: { code: "LX", color: "#E2001A" },
    sn: { code: "SN", color: "#002A5C" },
    wk: { code: "WK", color: "#B3122E", source: "https://travel-dealz.com/?p=99681" },
    en: { code: "EN", color: "#0A2E6B" },
    az: { code: "AZ", color: "#0047BB", source: "https://cwsi.net/calc/az/" },
    lo: { code: "LO", color: "#11397E", source: "https://cwsi.net/fares/lot-polish-airlines/" },
    ou: { code: "OU", color: "#0D2C6C", source: "https://cwsi.net/fares/croatia-airlines/" }
  },
  // Published examples. The browser tests check each one.
  examples: [
    { name: "Edelweiss, member", airline: "wk", input: { status: "member", fields: { airfare: 500 } }, expect: 2000 },
    { name: "Edelweiss, Senator", airline: "wk", input: { status: "sen", fields: { airfare: 500 } }, expect: 3000 },
    // Miles & More: EUR 2,000 earns 8,000, or 12,000 with status.
    { name: "Lufthansa, member", airline: "lh", input: { status: "member", fields: { airfare: 2000 } }, expect: 8000 },
    { name: "Lufthansa, Senator", airline: "lh", input: { status: "sen", fields: { airfare: 2000 } }, expect: 12000 },
    { name: "Air Dolomiti minimum", airline: "en", input: { status: "member", fields: { airfare: 9, carrierFees: 20 } }, expect: 125 },
    { name: "Eurowings minimum", airline: "ew", input: { status: "member", fields: { airfare: 19, carrierFees: 5 } }, expect: 125 },
    { name: "Eurowings status rate", airline: "ew", input: { status: "ftl", fields: { airfare: 100, carrierFees: 20 } }, expect: 600 },
    { name: "ITA within Italy, class M", airline: "az", input: { fare: "m", zone: "dom" }, expect: 500 },
    { name: "ITA Rome to Tokyo, class J", airline: "az", input: { fare: "j", zone: "intl", fields: { distance: 6155 } }, expect: 12310 }
  ],
  rules
};
