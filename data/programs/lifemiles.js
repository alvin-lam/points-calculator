const rules = {
  name: "Avianca | LifeMiles",
  country: "CO",
  unit: "LifeMiles",
  method: "spend",
  // "The fare amount used to calculate miles does not include taxes, fees,
  // or additional services." (Avianca fares page)
  baseFareOnly: true,
  carrierLabel: "Carrier Fees",
  carrierHint: "Fees Avianca adds to the fare. LifeMiles are earned on the fare only, so they do not earn.",
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
  // US co-branded cards (Cardless, issued by First Electronic Bank): extra
  // LifeMiles per US dollar charged for Avianca and LifeMiles purchases, from
  // https://www.cardless.com/cards/avianca/lifemiles and
  // https://www.cardless.com/cards/avianca/lifemiles-elite
  // Colombian card (Bancolombia): 2 LifeMiles per US dollar equivalent at
  // Avianca, billed in pesos, from
  // https://www.bancolombia.com/personas/tarjetas-de-credito/visa/lifemiles
  cards: [
    { id: "cardless-amex", name: "Avianca LifeMiles American Express Card", rate: 2, currency: "USD", bank: "Cardless (US)" },
    { id: "cardless-amex-elite", name: "Avianca LifeMiles American Express Elite Card", rate: 3, currency: "USD", bank: "Cardless (US)" },
    { id: "bancolombia-visa", name: "Bancolombia Visa Avianca LifeMiles", rate: 2, bank: "Bancolombia (Colombia)" }
  ],
  note: "LifeMiles earns on Avianca flights by the fare paid: 3, 6, 8, or 10 miles per US dollar by fare family, excluding taxes, fees and additional services. Red Plus and Silver add 10% and 20%. Gold and Diamond are shown at 60% and 80%, but sources differ on those two. The US Avianca LifeMiles American Express Card earns 2 more LifeMiles per dollar on Avianca purchases, and the Elite Card earns 3. The Elite Card also doubles the first 1,000 miles it earns each month, which this estimate leaves out. In Colombia, the Bancolombia Visa Avianca LifeMiles earns 2 per US dollar equivalent at Avianca, billed in pesos."
};

module.exports = {
  id: "lifemiles",
  // Month the earning rules were last checked against the source.
  reviewed: "2026-11",
  code: "AV",
  color: "#E30617",
  source: "https://helpcenter.lifemiles.com/hc/en-us/articles/15775435987227-Miles-accrual-with-avianca",
  rules
};
