const rules = {
  name: "Virgin Australia | Velocity",
  country: "AU",
  currency: "AUD",
  unit: "Velocity Points",
  method: "spend",
  centsPerPoint: 1.0,
  statuses: [
    { id: "red", name: "Red", rate: 4 },
    { id: "silver", name: "Silver", rate: 6 },
    { id: "gold", name: "Gold", rate: 7 },
    { id: "platinum", name: "Platinum", rate: 8 },
    { id: "platinum-plus", name: "Platinum Plus", rate: 10 }
  ],
  note: "Velocity earns 4 points per Australian dollar of the fare on Virgin Australia flights. Silver, Gold, Platinum, and Platinum Plus earn a status bonus; this estimate uses 50%, 75%, 100%, and 150%, the rates Velocity publishes for holiday bookings, because the flight rates are not published. Taxes do not earn."
};

module.exports = {
  id: "virginaustralia",
  // Month the earning rules were last checked against the source.
  reviewed: "2026-11",
  code: "VA",
  color: "#C8102E",
  source: "https://www.velocityfrequentflyer.com/partners-offers/airlines/virgin-australia-airlines",
  rules
};
