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
  // Finnish co-branded cards (Aktia Bank): Avios per euro on all card spend,
  // with no extra for Finnair purchases. Finnair Visa Credit earns by the
  // holder's Finnair Plus tier, so each tier is its own option. From
  // https://www.finnair.com/fi-en/finnair-plus/finnair-visa-credit-card
  cards: [
    { id: "aktia-credit-basic", name: "Finnair Visa Credit, Basic member", rate: 1, bank: "Aktia Bank (Finland)" },
    { id: "aktia-credit-silver", name: "Finnair Visa Credit, Silver member", rate: 1.2, bank: "Aktia Bank (Finland)" },
    { id: "aktia-credit-gold", name: "Finnair Visa Credit, Gold member", rate: 1.4, bank: "Aktia Bank (Finland)" },
    { id: "aktia-credit-platinum", name: "Finnair Visa Credit, Platinum member", rate: 1.6, bank: "Aktia Bank (Finland)" },
    { id: "aktia-credit-lumo", name: "Finnair Visa Credit, Platinum Lumo member", rate: 1.8, bank: "Aktia Bank (Finland)" },
    { id: "aktia-credit-light", name: "Finnair Visa Credit Light", rate: 1 / 2, per: 2, bank: "Aktia Bank (Finland)" }
  ],
  note: "Finnair Plus earns 6 to 10 Avios per euro by status on the fare, the surcharge set by Finnair and travel extras, on flights booked with Finnair. Taxes, airport and service charges do not earn. Enter fares in euros. In Finland, the Finnair Visa Credit card earns 1 to 1.8 Avios per euro on all purchases by Finnair Plus tier: 1 for Basic, 1.2 for Silver, 1.4 for Gold, 1.6 for Platinum and 1.8 for Platinum Lumo. Finnair Visa Credit Light earns 1 Avios per 2 euros."
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
