const rules = {
  name: "Viva Aerobus | Doters",
  country: "MX",
  currency: "MXN",
  unit: "Doters points",
  method: "spend",
  statuses: [
    { id: "green", name: "Doters Green", rate: 0.5 },
    { id: "silver", name: "Doters Silver", rate: 0.5 },
    { id: "gold", name: "Doters Gold", rate: 0.5 }
  ],
  note: "HSBC Viva card earning is not included because its rate could not be confirmed. Doters earns 1 point for every 2 Mexican pesos spent with Viva Aerobus, including bags and seats. Silver and Gold bonuses were not confirmed, so those levels are shown at the Green rate."
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
