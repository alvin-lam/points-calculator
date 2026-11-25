const rules = {
  name: "Air France-KLM | Flying Blue",
  programName: "Flying Blue",
  country: "AFKL",
  currency: "EUR",
  unit: "Miles",
  method: "spend",
  centsPerPoint: 1.2,
  // The operating airline; all earn the same Flying Blue rates. Transavia
  // is not in SkyTeam, and the US card's bonus is not confirmed for it.
  airlines: [
    { id: "af", name: "Air France", country: "FR" },
    { id: "kl", name: "KLM", country: "NL" },
    { id: "to", name: "Transavia France", country: "FR", noAlliance: true, program: { cards: null, note: "Flying Blue earns 4 to 9 Miles per euro spent on the fare and carrier charges on Transavia, by status. Taxes do not earn. Enter fares in euros." },
      note: "Transavia France earns on all fares, Basic included. Add your Flying Blue number to the booking." },
    { id: "hv", name: "Transavia Netherlands", country: "NL", noAlliance: true, program: { cards: null, note: "Flying Blue earns 4 to 9 Miles per euro spent on the fare and carrier charges on Transavia, by status. Taxes do not earn. Enter fares in euros." },
      note: "Add your Flying Blue number to the booking. Transavia's older partner page says Netherlands Basic fares earn nothing; its current help page says all fares earn." }
  ],
  statuses: [
    { id: "explorer", name: "Explorer", rate: 4 },
    { id: "silver", name: "Silver", rate: 6 },
    { id: "gold", name: "Gold", rate: 7 },
    { id: "platinum", name: "Platinum", rate: 8 },
    { id: "ultimate", name: "Ultimate", rate: 9 }
  ],
  // Co-branded cards: extra points per dollar charged (fare + taxes).
  cards: [
    { id: "boa", name: "Air France KLM Visa Signature", rate: 3, currency: "USD", bank: "Bank of America (US)" },
    // Dutch cards: Miles per euro charged at Air France and KLM.
    { id: "amex-nl-gold", name: "Flying Blue American Express Gold Card", rate: 1.5, bank: "American Express (Netherlands)" },
    { id: "amex-nl-platinum", name: "Flying Blue American Express Platinum Card", rate: 2, bank: "American Express (Netherlands)" }
  ],
  note: "Flying Blue earns 4 to 9 Miles per euro spent on the fare and carrier charges on Air France, KLM, and Transavia, by status. Taxes do not earn. Enter fares in euros. The US Bank of America card earns per US dollar charged. The Dutch American Express Gold and Platinum cards earn 1.5 and 2 Miles per euro at Air France and KLM."
};

module.exports = {
  id: "flyingblue",
  // Month the earning rules were last checked against the source.
  reviewed: "2026-11",
  source: "https://www.flyingblue.com/en/earn",
  // Two-letter code, brand color, and source page for each airline.
  airlines: {
    af: { code: "AF", color: "#002157" },
    kl: { code: "KL", color: "#00A1DE" },
    to: { code: "TO", color: "#00B26B" },
    hv: { code: "HV", color: "#00B26B" }
  },
  rules
};
