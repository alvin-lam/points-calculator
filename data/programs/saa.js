/* South African Airways (SA): Voyager miles on SAA-operated flights
   (flight numbers SA001 to SA999), from Voyager's "Earn - Airline
   Partners" page (rule 1, SAA Operated Flights) and "Earning Miles" page:
   1 mile for every R1.60 spent on the published base fare and
   carrier-imposed fees, pro-rated across the flown sectors of the ticket.
   Neither page lists a status bonus on flights, so every tier earns the
   same rate. SAA marketing (codeshare) flights earn by distance and are
   not covered. */

const rules = {
  name: "South African Airways | Voyager",
  programName: "Voyager",
  country: "ZA",
  currency: "ZAR",
  unit: "miles",
  method: "spend",
  rateText: "1 mile per R1.60",
  statuses: [
    { id: "blue", name: "Blue", rate: 1 / 1.6 },
    { id: "silver", name: "Silver", rate: 1 / 1.6 },
    { id: "gold", name: "Gold", rate: 1 / 1.6 },
    { id: "platinum", name: "Platinum", rate: 1 / 1.6 },
    { id: "lifetime-platinum", name: "Lifetime Platinum", rate: 1 / 1.6 }
  ],
  // Co-branded cards from Voyager's "Earn - Financial Partners" page
  // (voyager.flysaa.com/earn-financial-partners), with the issuer and the
  // Amex and Mastercard pairing from Nedbank's SAA Voyager Premium and Gold
  // card pages. The Amex credit and cheque cards earn the same rate, so each
  // pair is one option. The Nedbank Mozambique Visa cards (1 mile per MT60
  // Silver, MT40 Gold) are left out: only home-market and US cards are shown. Voyager's page labels the R11.50 Mastercard
  // "Premium", but its card image reads "gold credit", and Nedbank pairs it
  // with the Gold Amex. Two "$" Mastercards on the page name no issuer or
  // country and are left out.
  cardHint: "Card miles are earned on the full amount charged, taxes included, on top of the flight miles. Nedbank Premium and Gold accounts come with an American Express card and a Mastercard that earn at different rates.",
  cards: [
    { id: "nedbank-premium-amex", name: "SAA Voyager Premium American Express, credit or cheque card", rate: 1 / 6, per: 6, bank: "Nedbank (South Africa)" },
    { id: "nedbank-premium-mc", name: "SAA Voyager Premium Credit Mastercard", rate: 1 / 10.5, per: 10.5, rateText: "1 per R10.50", bank: "Nedbank (South Africa)" },
    { id: "nedbank-gold-amex", name: "SAA Voyager Gold American Express, credit or cheque card", rate: 1 / 6.5, per: 6.5, rateText: "1 per R6.50", bank: "Nedbank (South Africa)" },
    { id: "nedbank-gold-mc", name: "SAA Voyager Gold Credit Mastercard", rate: 1 / 11.5, per: 11.5, rateText: "1 per R11.50", bank: "Nedbank (South Africa)" }
  ],
  note: "Voyager earns 1 mile for every R1.60 spent on the base fare and carrier-imposed fees on SAA-operated flights (flight numbers SA001 to SA999), whatever your status. Taxes do not earn. Miles are split across the flown sectors of the ticket. SAA codeshare flights on partner aircraft (4-digit flight numbers) earn by distance instead and are not covered here. Tour operator, unpublished, charter, award, compensation and sponsorship tickets earn nothing. Enter fares in rand."
};

module.exports = {
  id: "saa",
  // Month the earning rules were last checked against the source.
  reviewed: "2026-11",
  code: "SA",
  color: "#0D1051",
  source: "https://voyager.flysaa.com/earn-airline-partners",
  rules
};
