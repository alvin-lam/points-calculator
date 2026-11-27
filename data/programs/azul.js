/* Azul (AD): Azul Fidelidade points on Azul-operated flights, per real
   spent on the base airfare, by tier at the time of the flight: 1 point
   (Básico), 2 (Topázio), 3 (Safira), 4 (Diamante) or 5 (Diamante Unique,
   from January 2026, added at the user's request). The rate is the same
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
    { id: "diamante", name: "Diamante", rate: 4 },
    { id: "diamante-unique", name: "Diamante Unique", rate: 5 }
  ],
  note: "Azul Fidelidade earns 1, 2, 3, 4 or 5 points per real spent on the base airfare of Azul-operated flights, for Básico, Topázio, Safira, Diamante and Diamante Unique, on every fare type, domestic and international. Points follow your tier on the day of the flight. Government taxes and airport fees do not earn. Your Azul Fidelidade number must be on the reservation. Paid extras such as seats, upgrades and Espaço Azul earn qualifying (status) points but, as far as published, no redeemable points. Points last 2 years for Básico, 3 for Topázio, 4 for Safira, 5 for Diamante and 10 for Diamante Unique. Enter fares in reais."
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
