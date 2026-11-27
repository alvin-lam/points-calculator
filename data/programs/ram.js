/* Royal Air Maroc (AT): Safar Flyer Award Miles as a share of the distance
   by fare family, from Royal Air Maroc's "Earn miles" page (the fare-family
   table that replaced the booking-class table), with tier bonuses from the
   Silver, Gold and Platinum benefit pages. The terms set a minimum for
   flights under 500 miles but do not state the amount, so none is applied. */
const rules = {
  name: "Royal Air Maroc | Safar Flyer",
  programName: "Safar Flyer",
  country: "MA",
  currency: "MAD",
  unit: "miles",
  method: "distance",
  defaultFareType: "eco-classic",
  fareTypeLabel: "Fare family",
  fareTypes: [
    { id: "biz-flex", name: "Business Flex", rate: 2 },
    { id: "biz-classic", name: "Business Classic", rate: 1.5 },
    { id: "eco-flex", name: "Economy Flex", rate: 1.5 },
    { id: "eco-classic", name: "Economy Classic", rate: 1 },
    { id: "eco-essential", name: "Economy Essential", rate: 0.5 }
  ],
  statuses: [
    { id: "blue", name: "Blue", multiplier: 1 },
    { id: "silver", name: "Silver", multiplier: 1.5 },
    { id: "gold", name: "Gold", multiplier: 1.75 },
    { id: "platinum", name: "Platinum", multiplier: 2 }
  ],
  note: "Safar Flyer earns a share of the distance by fare family on flights operated and marketed by Royal Air Maroc: 50% (Economy Essential), 100% (Economy Classic), 150% (Economy Flex and Business Classic) and 200% (Business Flex). Silver, Gold and Platinum earn 50%, 75% and 100% more. Award tickets (X, U) and Cash & Miles earn nothing, and Royal Air Maroc's calculator says class E bookings without baggage earn nothing. Flights under 500 miles earn a minimum that Royal Air Maroc does not state, so short flights may earn more than shown."
};

module.exports = {
  id: "ram",
  // Month the earning rules were last checked against the source.
  reviewed: "2026-11",
  code: "AT",
  color: "#C20831",
  source: "https://www.royalairmaroc.com/int-en/safar-flyer/earn-miles",
  examples: [
    { name: "Royal Air Maroc Economy Classic, Gold", input: { fare: "eco-classic", status: "gold", fields: { distance: 1000 } }, expect: 1750 }
  ],
  rules
};
