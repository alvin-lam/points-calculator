/* Azul (AD): Azul Fidelidade points on Azul-operated flights, per real
   spent on the base airfare, by tier at the time of the flight: 1 point
   (Básico), 2 (Topázio), 3 (Safira) or 4 (Diamante). The rate is the same
   for every fare type, domestic and international. Government taxes and
   airport fees do not earn. Rules supplied and verified by the user,
   November 2026. */

const rules = {
  name: "Azul | Azul Fidelidade",
  programName: "Azul Fidelidade",
  country: "BR",
  currency: "BRL",
  unit: "points",
  method: "spend",
  noCarrier: true,
  statuses: [
    { id: "basico", name: "Básico", rate: 1 },
    { id: "topazio", name: "Topázio", rate: 2 },
    { id: "safira", name: "Safira", rate: 3 },
    { id: "diamante", name: "Diamante", rate: 4 }
  ],
  note: "Azul Fidelidade earns 1, 2, 3 or 4 points per real spent on the base airfare of Azul-operated flights, for Básico, Topázio, Safira and Diamante, on every fare type, domestic and international. Points follow your tier on the day of the flight. Government taxes and airport fees do not earn. Your Azul Fidelidade number must be on the reservation. Points last 2 years for Básico, 3 for Topázio, 4 for Safira and 5 for Diamante. Enter fares in reais."
};

module.exports = {
  id: "azul",
  // Month the earning rules were last checked against the source.
  reviewed: "2026-11",
  code: "AD",
  color: "#041E42",
  source: "https://www.voeazul.com.br/br/pt/azul-fidelidade",
  // Published examples. The browser tests check each one.
  examples: [
    { name: "Azul Diamante", input: { status: "diamante", fields: { airfare: 1000 } }, expect: 4000 }
  ],
  rules
};
