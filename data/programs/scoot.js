/* Scoot (TR): KrisFlyer miles on Scoot flights bought on flyscoot.com,
   from Scoot's "Earn KrisFlyer Miles" page: 1 mile per SGD 1 spent on the
   base fare and add-ons. Taxes, Scootsurance, service fees, processing
   fees and amounts paid with Scoot vouchers do not earn. Fares in other
   currencies earn at Scoot's system exchange rate. Scoot publishes no
   KrisFlyer status bonus, so every member earns the same. */

const rules = {
  name: "Scoot | KrisFlyer",
  programName: "KrisFlyer",
  // Not an alliance member, but shares Singapore Airlines' program.
  sharedAlliance: "Star Alliance",
  country: "SG",
  currency: "SGD",
  unit: "KrisFlyer miles",
  method: "spend",
  // Ask for add-ons bought on the booking; they earn like the fare.
  addons: true,
  addonsLabel: "Add-ons",
  addonsHint: "Seats, bags, meals or bundles bought on this booking. They earn miles like the fare. Scootsurance does not earn; include it with the taxes.",
  // Service and processing fees do not earn.
  baseFareOnly: true,
  carrierLabel: "Service and processing fees",
  carrierHint: "Scoot's booking service and payment processing fees. They do not earn miles.",
  statuses: [
    { id: "member", name: "KrisFlyer member", rate: 1 }
  ],
  // Singapore co-branded card: KrisFlyer miles per Singapore dollar on
  // eligible Scoot flights booked direct in Singapore dollars from
  // Singapore, from American Express:
  // https://www.americanexpress.com/sg/credit-cards/singapore-airlines-krisflyer-ascend-credit-card/
  // The KrisFlyer Credit Card earns 2 per S$1 on Scoot purchases:
  // https://www.americanexpress.com/sg/credit-cards/singapore-airlines-krisflyer-credit-card/
  cards: [
    { id: "amex-kf-ascend", name: "American Express Singapore Airlines KrisFlyer Ascend Credit Card", rate: 2, bank: "American Express (Singapore)" },
    { id: "amex-kf", name: "American Express Singapore Airlines KrisFlyer Credit Card", rate: 2, bank: "American Express (Singapore)" }
  ],
  note: "Scoot flights bought on flyscoot.com earn 1 KrisFlyer mile per S$1 spent on the base fare and add-ons. Taxes, Scootsurance, service fees, processing fees and amounts paid with Scoot vouchers do not earn. Fares in other currencies earn at Scoot's exchange rate, so enter the amounts in Singapore dollars. Scoot publishes no bonus for KrisFlyer Elite or PPS Club members. Only the cash part of a flight paid partly with miles or vouchers earns, and flights paid fully with miles earn nothing. Scoot flights on the same ticket as Singapore Airlines flights earn by distance instead and are not covered here. The American Express Singapore Airlines KrisFlyer Ascend Credit Card earns 2 miles per Singapore dollar on Scoot flights booked direct in Singapore dollars. The American Express Singapore Airlines KrisFlyer Credit Card also earns 2 per Singapore dollar on Scoot purchases."
};

module.exports = {
  id: "scoot",
  // Month the earning rules were last checked against the source.
  reviewed: "2026-11",
  code: "TR",
  color: "#FFE900",
  source: "https://www.flyscoot.com/en/krisflyer/earn-krisflyer-miles",
  rules
};
