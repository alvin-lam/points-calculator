const rules = {
  name: "Air Europa | SUMA",
  country: "ES",
  currency: "EUR",
  unit: "Suma Miles",
  method: "spend",
  // "Miles will be earned for each euro paid exclusively for the published
  // rate and fuel surcharge." (SUMA terms and conditions)
  carrierLabel: "Fuel Surcharge",
  carrierHint: "The Air Europa fuel surcharge (YQ/YR) on the ticket. It earns miles like the fare. Management and handling fees do not earn.",
  roundUp: true,
  centsPerPoint: 1.0,
  defaultFareType: "y-eu",
  fareTypes: [
    { id: "y-eu", name: "Economy or Premium, Spain and Europe", rate: 5 },
    { id: "y-am", name: "Economy or Premium, America", rate: 6 },
    { id: "j-eu", name: "Business, Spain and Europe", rate: 8 },
    { id: "j-am", name: "Business, America", rate: 9 }
  ],
  // The level bonus is a share of the base 5 Miles per euro.
  statuses: [
    { id: "suma", name: "Suma", multiplier: 1 },
    { id: "silver", name: "Suma Silver", multiplier: 1, addRate: 2.5 },
    { id: "gold", name: "Suma Gold", multiplier: 1, addRate: 3.75 },
    { id: "platinum", name: "Suma Platinum", multiplier: 1, addRate: 5 }
  ],
  note: "SUMA earns per euro of the fare plus fuel surcharge: 5 in Spain and Europe, 6 on America flights, and 3 more in Business. Silver, Gold, and Platinum add 50%, 75%, or 100% of the base 5 per euro. Air Europa rounds up. Enter fares in euros."
};

module.exports = {
  id: "aireuropa",
  // Month the earning rules were last checked against the source.
  reviewed: "2026-11",
  code: "UX",
  color: "#0970CB",
  source: "https://www.aireuropa.com/ot/en/aea/suma/our-program/terms-and-conditions.html",
  rules
};
