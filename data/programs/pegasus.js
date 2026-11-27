/* Pegasus Airlines (PC): BolBol BolPoints, from the Pegasus BolBol
   General Rules (Membership Agreement, section 14, flypgs.com/en/
   pegasus-bolbol-membership-agreement), the BolBol pages and FAQ on
   flypgs.com, and ING Turkey's Pegasus credit card page.
   - Members earn 1 BolPoint per TRY 2 on the monetary total paid for
     Pegasus scheduled flights (rule 14.4.1.3; FAQ: a TRY 1,000 ticket
     earns 500), and on flight packages, extra baggage, pre-ordered
     Pegasus Cafe, Free Cancellation, seat selection and pets (14.4.1.4).
   - Taxes: the rules earn on the total paid for the flight and count the
     airport tax, check-in fee and service fee as items of the ticket's
     Transportation Fare (14.4.2.5; Pegasus campaign terms define the
     ticket amount as base fare, fuel surcharge, airport tax, check-in fee
     and service fee). So taxes earn here.
   - BolBol Extra (15 Pins a year) earns twice the BolPoints calculated on
     the lowest flight package for the flight; points from higher
     packages and ancillaries are not doubled (14.7.3.1 (iii)).
   - Flights bought from online travel agencies, codeshares and tickets
     paid fully with BolPoints do not earn (14.4.1.3, 14.4.1.5).
   - Cards: https://www.ing.com.tr/tr/sizin-icin/kartlar/pegasus-kredi-kartlari
     ING gives 2 BolPoints per TRY 2 spent at Pegasus on both the Classic
     and the Premium card, on top of the 1 per TRY 2 from Pegasus. */
const rules = {
  name: "Pegasus Airlines | BolBol",
  programName: "BolBol",
  country: "TR",
  currency: "TRY",
  unit: "BolPoints",
  method: "spend",
  ratePer: 2,
  // The rules earn on the total paid for the flight, airport taxes included.
  taxesEarn: true,
  noCarrier: true,
  // Higher packages and ancillaries earn 1 per TRY 2 for every member;
  // BolBol Extra does not double them.
  addons: true,
  addonsRate: 0.5,
  addonsRateLabel: "packages and extras",
  addonsLabel: "Package Upgrade and Extras",
  addonsHint: "Enter the fare and taxes of the lowest package offered on the flight above. Put here what you paid on top for a higher package, plus extra baggage, seat selection, pre-ordered Pegasus Cafe, Free Cancellation and pets. These earn 1 BolPoint per ₺2 and are not doubled for BolBol Extra.",
  statuses: [
    { id: "bolbol", name: "BolBol", rate: 0.5 },
    { id: "extra", name: "BolBol Extra", rate: 1 }
  ],
  // ING (Türkiye) co-brand cards: 2 BolPoints per TRY 2 at Pegasus from ING.
  cardHint: "Card BolPoints are earned on the full amount charged at Pegasus, on top of the flight BolPoints. ING caps card BolPoints at 4,000 per transaction and 8,000 per statement for most customers (higher for Platinum and Private Banking).",
  cards: [
    { id: "ing-premium", name: "ING Pegasus BolBol Premium", rate: 1, rateText: "1 per ₺1 at Pegasus", bank: "ING (Türkiye)" },
    { id: "ing-classic", name: "ING Pegasus BolBol Classic", rate: 1, rateText: "1 per ₺1 at Pegasus", bank: "ING (Türkiye)" }
  ],
  note: "BolBol earns 1 BolPoint per ₺2 of the total paid for Pegasus flights, taxes included, and for flight packages, extra baggage, seat selection, pre-ordered Pegasus Cafe, Free Cancellation and pets. BolBol Extra members earn twice the BolPoints on the lowest package fare for the flight. Higher packages and extras are not doubled. Flights bought on the Pegasus website or app, by phone, at Pegasus ticket offices or from Pegasus contracted agencies earn. Flights bought from online travel agencies, codeshare flights and tickets paid fully with BolPoints do not earn. The ING Pegasus BolBol Premium and Classic cards earn 2 BolPoints per ₺2 spent at Pegasus, on top of the flight BolPoints. Enter fares in Turkish lira."
};

module.exports = {
  id: "pegasus",
  // Month the earning rules were last checked against the source.
  reviewed: "2026-11",
  code: "PC",
  color: "#E31F26",
  source: "https://www.flypgs.com/en/pegasus-bolbol-membership-agreement",
  examples: [
    // Pegasus FAQ: a TRY 1,000 ticket earns 500 BolPoints.
    { name: "Pegasus BolBol, TRY 1,000 ticket (FAQ example)", input: { status: "bolbol", radios: { usedCard: "No" }, fields: { airfare: 800, taxes: 200 } }, expect: 500 },
    // Extra doubles the lowest package fare only: 1,000 x 1 + 500 x 0.5.
    { name: "Pegasus BolBol Extra with a package upgrade", input: { status: "extra", radios: { usedCard: "No" }, fields: { airfare: 800, taxes: 200, addons: 500 } }, expect: 1250 },
    // 500 flight BolPoints + 1,000 from the ING Premium card.
    { name: "Pegasus BolBol with the ING Premium card", input: { status: "bolbol", radios: { usedCard: "Yes" }, fields: { airfare: 800, taxes: 200 } }, expect: 1500 }
  ],
  rules
};
