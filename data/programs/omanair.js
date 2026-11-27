/* Oman Air (WY): Sindbad miles per US dollar on Oman Air flights, from
   Oman Air's "Earn miles with Oman Air" page and revenue-based Sindbad FAQ:
   4 miles per US dollar for Blue, 5 for Silver and 6 for Gold, on the base
   fare, carrier-imposed surcharges and add-ons, excluding airport taxes and
   government charges. Fares in other currencies convert at the IATA 5-day
   rate. Only tickets numbered 910 earn this way; other tickets earn by
   booking class and distance, which is not covered. */
const rules = {
  name: "Oman Air | Sindbad",
  programName: "Sindbad",
  country: "OM",
  currency: "USD",
  unit: "miles",
  method: "spend",
  carrierLabel: "Carrier-imposed Surcharges",
  carrierHint: "Oman Air's carrier-imposed surcharges (YQ/YR). They earn miles like the fare.",
  addons: true,
  addonsLabel: "Add-ons",
  addonsHint: "Seats, lounge access, meet and greet and other add-ons bought from Oman Air. They earn miles like the fare.",
  statuses: [
    { id: "blue", name: "Blue", rate: 4 },
    { id: "silver", name: "Silver", rate: 5 },
    { id: "gold", name: "Gold", rate: 6 }
  ],
  // Bank Muscat Oman Air Visa Platinum (Oman): 2 Sindbad miles per rial
  // spent, with no extra on Oman Air purchases.
  // https://www.bankmuscat.com/en/bm-cards/Pages/Oman-Air-Visa-Credit-Card.aspx
  cards: [
    { id: "bankmuscat", name: "Oman Air Visa Platinum", rate: 2, rateText: "2 per OMR 1", currency: "OMR", bank: "Bank Muscat (Oman)" }
  ],
  note: "Sindbad earns 4 miles per US dollar for Blue, 5 for Silver and 6 for Gold, on the base fare, carrier-imposed surcharges and add-ons such as seats and lounge access, on flights operated and marketed by Oman Air with a ticket number starting 910. Airport taxes and government charges do not earn. Fares in other currencies convert at the IATA rate. Other tickets earn by booking class and distance, which this estimate does not cover. The Bank Muscat Oman Air Visa Platinum earns 2 miles per rial charged. Enter fares in US dollars."
};

module.exports = {
  id: "omanair",
  // Month the earning rules were last checked against the source.
  reviewed: "2026-11",
  code: "WY",
  color: "#B39759",
  source: "https://sindbad.omanair.com/earn-miles-with-omanair",
  examples: [
    { name: "Oman Air Gold", input: { status: "gold", fields: { airfare: 500, carrierFees: 100 } }, expect: 3600 }
  ],
  rules
};
