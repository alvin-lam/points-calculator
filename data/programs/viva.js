const rules = {
  name: "Viva Aerobus | Doters",
  country: "MX",
  currency: "MXN",
  unit: "Doters points",
  method: "spend",
  // Doters' Viva Aerobus page: 1, 1.5 or 2 Puntos Doters per $2 MXN for
  // Verde, Plata and Oro. Qualifying points are "sobre la tarifa sin
  // impuestos ni cargos extra"; no extra charges are counted here either.
  noCarrier: true,
  statuses: [
    { id: "green", name: "Doters Green", rate: 0.5 },
    { id: "silver", name: "Doters Silver", rate: 0.75 },
    { id: "gold", name: "Doters Gold", rate: 1 }
  ],
  // Mexican co-branded cards (HSBC): Doters points per MX$10 charged at
  // Viva Aerobus. From https://www.hsbc.com.mx/tarjetas-de-credito/productos/viva/
  cards: [
    { id: "hsbc-viva", name: "HSBC VIVA", rate: 2 / 10, rateText: "2 per MX$10", bank: "HSBC (Mexico)" },
    { id: "hsbc-viva-plus", name: "HSBC VIVA PLUS", rate: 3 / 10, rateText: "3 per MX$10", bank: "HSBC (Mexico)" }
  ],
  note: "Doters earns 1 point for every 2 Mexican pesos of the Viva Aerobus fare at Green, 1.5 at Silver and 2 at Gold, excluding taxes. Doters does not say that paid seats or bags earn, so they are not counted. Smart fares earn 50% more and flight-count bonuses apply, which this estimate does not add. The HSBC VIVA card earns 2 points per MX$10 charged, and the HSBC VIVA PLUS 3 per MX$10 at Viva Aerobus."
};

module.exports = {
  id: "viva",
  // Month the earning rules were last checked against the source.
  reviewed: "2026-11",
  code: "VB",
  color: "#00A850",
  source: "https://www.doters.com/aliados/viva-aerobus",
  rules
};
