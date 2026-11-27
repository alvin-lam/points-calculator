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
  // Co-branded card: extra points per US dollar charged for Aeroméxico tickets
  // bought from Aeroméxico (U.S. Bank AeroMexico Visa Signature).
  cards: [
    { id: "usbank-visa", name: "AeroMexico Visa Signature", rate: 2, currency: "USD", bank: "U.S. Bank (US)" }
  ],
  note: "Aeroméxico Rewards earns 8 points per US dollar of base fare, excluding taxes. Enter the fare in US dollars. Titanium earns 8 more points per dollar. Bonuses for Silver, Gold, and Platinum were not confirmed, so those tiers are shown at the base rate. The U.S. Bank AeroMexico Visa Signature earns 2 more points per dollar on tickets bought from Aeroméxico."
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
    { name: "Aeroméxico with the US Visa card", input: { status: "member", radios: { usedCard: "Yes" }, fields: { airfare: 400, taxes: 100 } }, expect: 4200 }
  ],
  rules
};
