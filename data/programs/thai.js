/* Thai Airways Royal Orchid Plus: a share of the distance flown by booking
   class on THAI-operated flights (rates updated October 2025). Flights
   under 500 miles earn at least 500 miles. Status adds a tier bonus. */
const rules = {
  name: "Thai Airways | Royal Orchid Plus",
  programName: "Royal Orchid Plus",
  country: "TH",
  currency: "THB",
  unit: "miles",
  method: "distance",
  minDistance: 500,
  defaultFareType: "y-hqt",
  // Classes L, O, I, X, E, N and R earn nothing.
  fareTypes: [
    { id: "f", name: "Royal First (F)", rate: 2.5 },
    { id: "ap", name: "Royal First (A, P)", rate: 2 },
    { id: "cd", name: "Royal Silk (C, D)", rate: 1.5 },
    { id: "jz", name: "Royal Silk (J, Z)", rate: 1.25 },
    { id: "u", name: "Premium Economy (U)", rate: 1.1 },
    { id: "y-ybm", name: "Economy (Y, B, M)", rate: 1.1 },
    { id: "y-hqt", name: "Economy (H, Q, T)", rate: 1 },
    { id: "y-ksv", name: "Economy (K, S, V)", rate: 0.75 },
    { id: "y-g", name: "Economy (G)", rate: 0.5 },
    { id: "y-w", name: "Economy (W)", rate: 0.25 }
  ],
  statuses: [
    { id: "member", name: "Royal Orchid Plus Member", multiplier: 1 },
    { id: "silver", name: "Silver", multiplier: 1.05 },
    { id: "gold", name: "Gold", multiplier: 1.1 },
    { id: "platinum", name: "Platinum", multiplier: 1.2 }
  ],
  // Thai co-branded card (American Express Thailand): 2 points per THB 25,
  // and 2 points make 1 mile, doubled on THAI tickets bought at THAI
  // offices in Thailand or on the THAI website, so 2 miles per THB 25.
  // https://americanexpress.com/th/en/thai-amex-card
  cards: [
    { id: "amex-thai-platinum", name: "THAI American Express Platinum Card", rate: 2 / 25, rateText: "2 per ฿25", bank: "American Express (Thailand)" }
  ],
  note: "Royal Orchid Plus earns a share of the distance flown by booking class, from 25% (W) to 250% (F). Flights under 500 miles count as 500. Silver adds 5%, Gold 10% and Platinum 20%. Classes L, O, I, X, E, N and R earn nothing. The THAI American Express Platinum Card earns 2 miles per 25 baht on THAI tickets bought on the THAI website or at THAI offices in Thailand."
};

module.exports = {
  id: "thai",
  // Month the earning rules were last checked against the source.
  reviewed: "2026-11",
  code: "TG",
  color: "#4B286D",
  source: "https://www.thaiairways.com/en-th/content/earn-miles/thai/",
  // Worked from the published rates.
  examples: [
    { name: "Thai Royal Silk (C), 1,000 miles", input: { fare: "cd", fields: { distance: 1000 } }, expect: 1500 },
    { name: "Thai Economy (H), short flight, Gold", input: { fare: "y-hqt", status: "gold", fields: { distance: 300 } }, expect: 550 }
  ],
  rules
};
