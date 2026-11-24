const rules = {
  name: "Porter Airlines | VIPorter",
  country: "CA",
  currency: "CAD",
  unit: "points",
  method: "spend",
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
  note: "VIPorter earns 5 to 7 points per Canadian dollar of the base fare by status, and Porter add-ons like seats and bags also earn. Taxes do not earn. The BMO card rates on Porter purchases differ between sources, so treat them as estimates."
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
