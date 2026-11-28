/* LATAM Pass: miles per US dollar of the base fare, by category and by
   route type. Taxes, boarding fees, seats, and bags do not earn. Up to
   60,000 miles per segment. */

const rules = {
  name: "LATAM Airlines | LATAM Pass",
  // No carrier-imposed fees field: the airline adds none, or they never earn.
  noCarrier: true,
  country: "CL",
  // LATAM's airlines in Chile, Peru, Colombia, Ecuador and Paraguay earn
  // the same LATAM Pass rates. LATAM Brasil (JJ) is treated the same, as
  // the site owner decided; LATAM Pass Brasil's own table could not be read.
  countries: ["CL", "PE", "CO", "EC", "PY", "BR"],
  currency: "USD",
  unit: "miles",
  method: "spend",
  baseFareOnly: true,
  cap: 60000,
  fareTypeLabel: "Route",
  defaultFareType: "sa",
  fareTypes: [
    { id: "sa", name: "Domestic or within South America" },
    { id: "intl", name: "To or from outside South America" }
  ],
  statuses: [
    { id: "latam", name: "LATAM", rates: { sa: 3, intl: 5 } },
    { id: "gold", name: "Gold", rates: { sa: 4, intl: 6 } },
    { id: "platinum", name: "Platinum", rates: { sa: 7, intl: 9 } },
    { id: "black", name: "Black", rates: { sa: 8, intl: 10 } },
    { id: "black-sig", name: "Black Signature", rates: { sa: 9, intl: 12 } }
  ],
  // US co-branded cards (Cardless): extra miles per US dollar charged for
  // LATAM purchases.
  cards: [
    { id: "cardless-mc", name: "LATAM Airlines Mastercard", rate: 3, currency: "USD", bank: "Cardless (US)" },
    { id: "cardless-we", name: "LATAM Airlines World Elite Mastercard", rate: 4, currency: "USD", bank: "Cardless (US)" }
  ],
  note: "LATAM Pass earns miles per US dollar of the base fare on flights marketed by LATAM: 3, 4, 7, 8, or 9 on domestic flights and within South America, and 5, 6, 9, 10, or 12 outside South America, for LATAM, Gold, Platinum, Black, and Black Signature. Taxes, boarding fees, and extras such as bags and seats do not earn. Fares in other currencies convert to dollars at the IATA rate, so enter the US dollar equivalent. Earning is capped at 60,000 miles per segment. The US LATAM Airlines Mastercard earns 3 more miles per dollar on LATAM purchases, and the World Elite Mastercard earns 4. LATAM Brasil (JJ) flights are assumed to earn the same; LATAM Pass Brasil members may earn differently."
};

module.exports = {
  id: "latam",
  // Month the earning rules were last checked against the source.
  reviewed: "2026-11",
  code: "LA",
  codes: ["LA", "JJ", "LP", "4C", "XL", "PZ"],
  color: "#1B0088",
  source: "https://latampass.latam.com/us/en/tickets",
  // Published examples. The browser tests check each one.
  examples: [
    // LATAM Pass: Platinum, US$400 international fare.
    { name: "LATAM Platinum international", input: { status: "platinum", fare: "intl", fields: { airfare: 400 } }, expect: 3600 }
  ],
  rules
};
