const rules = {
  name: "Avianca | LifeMiles",
  country: "CO",
  unit: "LifeMiles",
  method: "spend",
  defaultFareType: "classic",
  fareTypes: [
    { id: "basic", name: "Basic or Light", rate: 3 },
    { id: "classic", name: "Classic", rate: 6 },
    { id: "flex", name: "Flex", rate: 8 },
    { id: "business", name: "Business or Insignia", rate: 10 }
  ],
  statuses: [
    { id: "red", name: "Red", multiplier: 1 },
    { id: "red-plus", name: "Red Plus", multiplier: 1.1 },
    { id: "silver", name: "Silver", multiplier: 1.2 },
    { id: "gold", name: "Gold", multiplier: 1.6 },
    { id: "diamond", name: "Diamond", multiplier: 1.8 }
  ],
  // Co-branded card: extra LifeMiles per US dollar charged for Avianca
  // purchases made directly with Avianca (Banco Popular Avianca Vuela Visa).
  cards: [
    { id: "vuela-visa", name: "Avianca Vuela Visa", rate: 3, currency: "USD", bank: "Banco Popular (US)" }
  ],
  note: "LifeMiles earns on Avianca flights by the fare paid: 3, 6, 8, or 10 miles per US dollar by fare family, excluding taxes. Red Plus and Silver add 10% and 20%. Gold and Diamond are shown at 60% and 80%, but sources differ on those two. The US Avianca Vuela Visa earns 3 more LifeMiles per dollar on Avianca purchases made directly with Avianca."
};

module.exports = {
  id: "lifemiles",
  // Month the earning rules were last checked against the source.
  reviewed: "2026-11",
  code: "AV",
  color: "#E30613",
  source: "https://helpcenter.lifemiles.com/hc/en-us/articles/15775435987227-Miles-accrual-with-avianca",
  rules
};
