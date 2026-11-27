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
  note: "Doters earns 1 point for every 2 Mexican pesos of the Viva Aerobus fare at Green, 1.5 at Silver and 2 at Gold, excluding taxes. Doters does not say that paid seats or bags earn, so they are not counted. Smart fares earn 50% more and flight-count bonuses apply, which this estimate does not add. HSBC Viva card earning is not included because its rate could not be confirmed."
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
