const rules = {
  name: "Porter Airlines | VIPorter",
  country: "CA",
  currency: "CAD",
  unit: "points",
  method: "spend",
  // VIPorter Eligible Dollars are "the base fare (net of any discounts)" and
  // Porter ancillary services such as seat selection and checked baggage
  // fees. Taxes, NAV surcharges (navigation, insurance, fuel), airport fees
  // and administration fees do not count. (VIPorter terms)
  baseFareOnly: true,
  carrierLabel: "NAV Charge and Surcharges",
  carrierHint: "Porter's NAV charge and fuel, insurance or peak surcharges. They do not earn points.",
  addons: true,
  addonsLabel: "Seats, Bags and/or Other Porter Fees",
  addonsHint: "Seat selection, checked bags, and change, pet or unaccompanied-minor fees paid to Porter. They earn points like the fare.",
  statuses: [
    { id: "member", name: "VIPorter Member", rate: 5 },
    { id: "passport", name: "Passport", rate: 6 },
    { id: "venture", name: "Venture", rate: 6 },
    { id: "ascent", name: "Ascent", rate: 7 },
    { id: "first", name: "First", rate: 7 }
  ],
  // Co-branded cards: extra points per Canadian dollar charged.
  cards: [
    { id: "bmo", name: "BMO VIPorter Mastercard", rate: 2, bank: "BMO (Canada)" },
    { id: "bmo-we", name: "BMO VIPorter World Elite Mastercard", rate: 3, bank: "BMO (Canada)" }
  ],
  note: "VIPorter earns 5 to 7 points per Canadian dollar of the base fare by status, and Porter add-ons like seats, bags and change fees also earn. Taxes, the NAV charge, fuel and other surcharges, and airport fees do not earn. The BMO card rates on Porter purchases differ between sources, so treat them as estimates."
};

module.exports = {
  id: "porter",
  // Month the earning rules were last checked against the source.
  reviewed: "2026-11",
  code: "PD",
  color: "#002856",
  source: "https://www.flyporter.com/en-ca/about-porter/viporter",
  rules
};
