const rules = {
  name: "Aeroméxico | Aeroméxico Rewards",
  country: "MX",
  currency: "USD",
  unit: "points",
  method: "spend",
  // Points are on the "tarifa base en dólares (Costo total del boleto -
  // impuestos y cuotas)", so carrier surcharges are treated as not earning.
  // Aeroméxico does not say so for individual members in so many words.
  baseFareOnly: true,
  carrierLabel: "Carrier Surcharges (YQ)",
  carrierHint: "Aeroméxico's carrier surcharges on the ticket. Points are earned on the base fare only, so they do not earn.",
  statuses: [
    { id: "member", name: "Aeroméxico Rewards Member", rate: 8 },
    { id: "silver", name: "Silver", rate: 8 },
    { id: "gold", name: "Gold", rate: 8 },
    { id: "platinum", name: "Platinum", rate: 8 },
    { id: "titanium", name: "Titanium", rate: 16 }
  ],
  // Co-branded cards: extra points per US dollar equivalent of Aeroméxico
  // tickets and aeromexico.com purchases on the Mexican American Express
  // cards, which bill in pesos. (The U.S. Bank AeroMexico Visa Signature
  // ended in May 2020 and is not listed.)
  // From the American Express Mexico terms, e.g.
  // https://www.americanexpress.com/content/dam/amex/es-mx/tarjetas-de-credito/aeromexico/TC_Platinum_Aeromexico.pdf
  // (TC_Blue_Aeromexico.pdf and TC_Gold_Aeromexico.pdf for the others).
  // Inbursa Aeroméxico cards (Mexico, since 2026): points per US dollar
  // equivalent on Aeroméxico tickets, Aeroméxico Vacations packages and
  // aeromexico.com, billed in pesos, from Inbursa's terms:
  // https://www.inbursa.com/sites/gfi/document/tyc-tarjetas-aeromexico.pdf
  cardHint: "Card points are earned on the full amount charged, taxes included. The Mexican American Express and Inbursa Aeroméxico cards bill in pesos and earn per US dollar equivalent, so they are figured here on the amount in US dollars.",
  cards: [
    { id: "amex-mx", name: "American Express Aeroméxico Card", rate: 2.4, bank: "American Express (Mexico)" },
    { id: "amex-mx-gold", name: "The Gold Card American Express Aeroméxico", rate: 3.2, bank: "American Express (Mexico)" },
    { id: "amex-mx-platinum", name: "The Platinum Card American Express Aeroméxico", rate: 4.8, bank: "American Express (Mexico)" },
    { id: "inbursa-ascend", name: "Tarjeta Inbursa Aeroméxico Ascend", rate: 2, bank: "Inbursa (Mexico)" },
    { id: "inbursa-elevate", name: "Tarjeta Inbursa Aeroméxico Elevate", rate: 2.4, bank: "Inbursa (Mexico)" },
    { id: "inbursa-horizon", name: "Tarjeta Inbursa Aeroméxico Horizon", rate: 3, bank: "Inbursa (Mexico)" },
    { id: "inbursa-debit", name: "Cuenta Inbursa Aeroméxico debit card", kind: "debit", rate: 2.4, bank: "Inbursa (Mexico)" }
  ],
  note: "Aeroméxico Rewards earns 8 points per US dollar of base fare, excluding taxes. Enter the fare in US dollars. Titanium earns 8 more points per dollar. Bonuses for Silver, Gold, and Platinum were not confirmed, so those tiers are shown at the base rate. In Mexico, the American Express Aeroméxico, Gold Card and Platinum Card Aeroméxico earn 2.4, 3.2 and 4.8 points per US dollar equivalent on Aeroméxico tickets, billed in pesos. The Inbursa Aeroméxico Ascend, Elevate and Horizon credit cards earn 2, 2.4 and 3, and the Cuenta Inbursa Aeroméxico debit card earns 2.4."
};

module.exports = {
  id: "aeromexico",
  // Month the earning rules were last checked against the source.
  reviewed: "2026-11",
  code: "AM",
  color: "#0B2343",
  source: "https://www.aeromexicorewards.com/",
  // Worked from the published rates: US$400 base fare, Classic member, charged to the card.
  examples: [
    // 8 points per dollar of fare (3,200) plus the American Express Aeroméxico
    // card's 2.4 per dollar on the $500 charged (1,200).
    { name: "Aeroméxico with the American Express Aeroméxico card", input: { status: "member", radios: { usedCard: "Yes" }, fields: { airfare: 400, taxes: 100 } }, expect: 4400 }
  ],
  rules
};
