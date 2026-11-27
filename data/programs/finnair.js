const rules = {
  name: "Finnair | Finnair Plus",
  country: "FI",
  currency: "EUR",
  unit: "Avios",
  method: "spend",
  centsPerPoint: 1.0,
  // "You'll collect Avios and tier points from the base fare of the flight
  // ticket, the total price of travel extras and the possible surcharge set
  // by the airline." (Finnair Plus rules)
  carrierLabel: "Airline Surcharge",
  carrierHint: "The surcharge set by Finnair, shown as \"Extra fee\" under taxes, fees and charges. It earns Avios like the fare.",
  addons: true,
  addonsLabel: "Travel Extras",
  addonsHint: "Seats, bags, meals and other extras bought from Finnair before the flight. Extras bought on board or on award bookings do not earn.",
  statuses: [
    { id: "basic", name: "Basic", rate: 6 },
    { id: "silver", name: "Silver", rate: 7 },
    { id: "gold", name: "Gold", rate: 8 },
    { id: "platinum", name: "Platinum", rate: 9 },
    { id: "lumo", name: "Platinum Lumo", rate: 10 }
  ],
  note: "Finnair Plus earns 6 to 10 Avios per euro by status on the fare, the surcharge set by Finnair and travel extras, on flights booked with Finnair. Taxes, airport and service charges do not earn. Enter fares in euros."
};

module.exports = {
  id: "finnair",
  // Month the earning rules were last checked against the source.
  reviewed: "2026-11",
  code: "AY",
  color: "#0B1560",
  source: "https://www.finnair.com/gb-en/finnair-plus/finnair-plus-rules",
  rules
};
