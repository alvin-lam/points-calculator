/* Tigerair Taiwan (IT): tigerclub tigerpoints on Tigerair Taiwan flights,
   from the tigerclub member page and its FAQ
   (tigerairtw.com/en-US/support/tigerclub and /zh-TW/support/tigerclub).
   tigerexpert members earn tigerpoints equal to 1% of the ticket fare and
   tigerprime members 2%, by the member's tier on the day of purchase.
   Only regular international flights bought on Tigerair Taiwan's own
   website earn. Taxes, booking service fees, bags, seats and meals do not
   earn. Fares paid in other currencies are converted to New Taiwan dollars
   at the month's exchange rate.
   Card: Taiwan Rakuten Card's Tigerair co-brand card (樂虎卡), from
   https://www.card.rakuten.com.tw/corp/ads/16.xhtml (campaign
   7 January to 31 December 2026). */
const rules = {
  name: "Tigerair Taiwan | tigerclub",
  programName: "tigerclub",
  country: "TW",
  currency: "TWD",
  unit: "tigerpoints",
  method: "spend",
  rateAsPercent: true,
  // Booking service fees do not earn.
  baseFareOnly: true,
  carrierLabel: "Booking Service Fee",
  carrierHint: "Tigerair Taiwan's booking service fee. It does not earn tigerpoints.",
  // Bags, seats and meals do not earn, but they count toward the card charge.
  addons: true,
  addonsNoEarn: true,
  addonsLabel: "Bags, Seats and/or Meals",
  addonsHint: "Checked bags, seat selection, meals and other add-ons. They do not earn tigerpoints.",
  // tigerpoints as a share of the ticket fare, by tier on the day of purchase.
  statuses: [
    { id: "tigerexpert", name: "tigerexpert", rate: 0.01 },
    { id: "tigerprime", name: "tigerprime", rate: 0.02 }
  ],
  // Taiwan Rakuten Card Tigerair co-brand card: 2.5% in tigerpoints on
  // Tigerair Taiwan's website and app, up to 500 tigerpoints per statement
  // (NT$20,000 of spending), from 7 January to 31 December 2026. The card's
  // 0.5% base reward is a statement credit, not tigerpoints, so it is left out.
  cardHint: "The card earns 2.5% in tigerpoints on the full amount charged on Tigerair Taiwan's website or app, up to 500 tigerpoints per statement, until 31 December 2026. This estimate assumes nothing else on the statement used the cap.",
  cards: [
    { id: "rakuten-tigerair", name: "Rakuten Tigerair Taiwan Co-branded Card", rate: 0.025, tiers: [{ upTo: 20000, rate: 0.025 }, { rate: 0 }], rateText: "2.5%, up to 500 per statement", bank: "Rakuten Card (Taiwan)" }
  ],
  note: "tigerclub earns tigerpoints equal to 1% of the ticket fare for tigerexpert members and 2% for tigerprime members, based on the tier on the day of purchase. Every member starts as tigerexpert. Only regular international flights bought on Tigerair Taiwan's own website earn. Tickets from travel agencies, group tickets, codeshare flights and tickets paid fully with a voucher earn nothing. Taxes, booking service fees, bags, seats and meals do not earn, and any discount code or voucher amount is taken off the fare first. Tigerair Taiwan does not say how the bags and seats included in tigersmart and tigerpro bundles are counted, so enter the fare as charged. tigerpoints are redeemed in blocks of 100 for vouchers on Tigerair Taiwan's website. The Rakuten Tigerair Taiwan co-branded card adds 2.5% in tigerpoints on Tigerair Taiwan's website and app, up to 500 tigerpoints per statement, until 31 December 2026. Its 0.5% base reward is paid as a statement credit and is not counted here. Enter fares in New Taiwan dollars."
};

module.exports = {
  id: "tigerairtw",
  // Month the earning rules were last checked against the source.
  reviewed: "2026-11",
  code: "IT",
  color: "#FAA836",
  source: "https://www.tigerairtw.com/en-US/support/tigerclub",
  // Worked from the published rates. The browser tests check each one.
  examples: [
    // 1% of NT$5,000; taxes and the booking fee do not earn.
    { name: "Tigerair Taiwan tigerexpert", input: { status: "tigerexpert", fields: { airfare: 5000, carrierFees: 300, taxes: 1500 } }, expect: 50 },
    // 2% of NT$8,000; bags and seats do not earn.
    { name: "Tigerair Taiwan tigerprime with add-ons", input: { status: "tigerprime", fields: { airfare: 8000, addons: 1200, taxes: 1800 } }, expect: 160 },
    // 1% of NT$10,000 = 100, plus 2.5% of the NT$12,000 charged = 300.
    { name: "Tigerair Taiwan tigerexpert with the Rakuten card", input: { status: "tigerexpert", radios: { usedCard: "Yes" }, fields: { airfare: 10000, taxes: 2000 } }, expect: 400 }
  ],
  rules
};
