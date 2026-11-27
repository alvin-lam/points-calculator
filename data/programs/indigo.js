/* IndiGo (6E): BluChips on IndiGo flights, from IndiGo's BluChip FAQ
   (goindigo.in/loyalty/faq.html, read through search results because the
   site blocks automated access). Base BluChips are 8 per ₹100 of the base
   fare and fuel surcharge. Blu 2 adds 2 and Blu 1 adds 4 per ₹100 as a
   tier bonus. Booking on IndiGo's website or app adds 4 per ₹100. Taxes and
   fees do not earn. */

const rules = {
  name: "IndiGo | BluChip",
  programName: "BluChip",
  country: "IN",
  currency: "INR",
  unit: "BluChips",
  method: "spend",
  ratePer: 100,
  carrierLabel: "Fuel Surcharge",
  statuses: [
    { id: "blu3", name: "Blu 3", rate: 0.08 },
    { id: "blu2", name: "Blu 2", rate: 0.10 },
    { id: "blu1", name: "Blu 1", rate: 0.12 }
  ],
  // Booking on goindigo.in or the IndiGo app adds 4 BluChips per ₹100.
  direct: {
    question: "Did you book on goindigo.in or the IndiGo app?",
    rate: 0.04
  },
  note: "BluChip earns 8 BluChips per ₹100 of the base fare and fuel surcharge on IndiGo flights. Blu 2 members earn 2 more and Blu 1 members 4 more per ₹100 as a tier bonus. Booking on IndiGo's website or app adds 4 per ₹100. Taxes and other fees do not earn. Enter fares in rupees."
};

module.exports = {
  id: "indigo",
  // Month the earning rules were last checked against the source.
  reviewed: "2026-11",
  code: "6E",
  color: "#011B94",
  source: "https://www.goindigo.in/loyalty/faq.html",
  // Published examples. The browser tests check each one.
  examples: [
    { name: "IndiGo Blu 1, direct", input: { status: "blu1", radios: { direct: "Yes" }, fields: { airfare: 10000 } }, expect: 1600 },
    { name: "IndiGo Blu 3, not direct", input: { status: "blu3", radios: { direct: "No" }, fields: { airfare: 10000 } }, expect: 800 }
  ],
  rules
};
