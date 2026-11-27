/* Aerolíneas Argentinas (AR): Aerolíneas Plus miles as a share of the
   distance flown, by route type and the first letter of the fare basis,
   from "Sumá millas" (aerolineas.com.ar/suma-millas). Elite bonuses from
   the Socios Elite page: Oro 25%, Platino 75%, Diamante 100%, on flights
   operated by Aerolíneas Argentinas. Fare letters group differently on
   each route type, so each route shows its own fare list. */
const dom = ["domestic"], reg = ["regional"], intl = ["international"];
const rules = {
  name: "Aerolíneas Argentinas | Aerolíneas Plus",
  programName: "Aerolíneas Plus",
  country: "AR",
  currency: "USD",
  unit: "miles",
  method: "distance",
  zoneLabel: "Route",
  zoneHint: "Earning depends on the route type and the first letter of the fare basis.",
  zones: [
    { id: "domestic", name: "Domestic (within Argentina)" },
    { id: "regional", name: "Regional (Bolivia, Brazil, Chile, Colombia, Paraguay, Peru, Uruguay)" },
    { id: "international", name: "International (Caribbean, Mexico, US, Europe)" }
  ],
  zoneDefaultFare: { domestic: "d-ukhl", regional: "r-uqlkh", international: "i-uqlkh" },
  fareTypeLabel: "Fare basis (first letter)",
  // Earn lists follow the zones order: [domestic, regional, international].
  fareTypes: [
    { id: "d-ws", zones: dom, name: "W, S", earn: [1.5, null, null] },
    { id: "d-ybm", zones: dom, name: "Y, B, M", earn: [1, null, null] },
    { id: "d-ukhl", zones: dom, name: "U, K, H, L", earn: [0.75, null, null] },
    { id: "d-qtenv", zones: dom, name: "Q, T, E, N, V", earn: [0.25, null, null] },
    { id: "d-arg", zones: dom, name: "A, R, G (no miles)", earn: [0, null, null] },
    { id: "r-wsjidc", zones: reg, name: "W, S, J, I, D, C", earn: [null, 1.5, null] },
    { id: "r-ybm", zones: reg, name: "Y, B, M", earn: [null, 1.25, null] },
    { id: "r-uqlkh", zones: reg, name: "U, Q, L, K, H", earn: [null, 1, null] },
    { id: "r-vtrnea", zones: reg, name: "V, T, R, N, E, A", earn: [null, 0.25, null] },
    { id: "r-g", zones: reg, name: "G (no miles)", earn: [null, 0, null] },
    { id: "i-jidc", zones: intl, name: "J, I, D, C", earn: [null, null, 2] },
    { id: "i-ws", zones: intl, name: "W, S", earn: [null, null, 1.5] },
    { id: "i-ybm", zones: intl, name: "Y, B, M", earn: [null, null, 1.25] },
    { id: "i-uqlkh", zones: intl, name: "U, Q, L, K, H", earn: [null, null, 1] },
    { id: "i-vtrnea", zones: intl, name: "V, T, R, N, E, A", earn: [null, null, 0.25] },
    { id: "i-g", zones: intl, name: "G (no miles)", earn: [null, null, 0] }
  ],
  defaultFareType: "d-ukhl",
  statuses: [
    { id: "plus", name: "Aerolíneas Plus", multiplier: 1 },
    { id: "oro", name: "Oro", multiplier: 1.25 },
    { id: "platino", name: "Platino", multiplier: 1.75 },
    { id: "diamante", name: "Diamante", multiplier: 2 }
  ],
  note: "Aerolíneas Plus earns a share of the distance flown by route type and the first letter of the fare basis: within Argentina 0% to 150%, on regional routes 0% to 150%, and on international routes 0% to 200%. Oro, Platino and Diamante members earn 25%, 75% and 100% more on flights operated by Aerolíneas Argentinas. Aerolíneas Argentinas does not publish a minimum per flight."
};

module.exports = {
  id: "aerolineas",
  // Month the earning rules were last checked against the source.
  reviewed: "2026-11",
  code: "AR",
  color: "#0080BE",
  source: "https://www.aerolineas.com.ar/suma-millas",
  examples: [
    { name: "Aerolíneas Argentinas domestic Y, Oro", input: { fare: "d-ybm", zone: "domestic", status: "oro", fields: { distance: 1000 } }, expect: 1250 },
    { name: "Aerolíneas Argentinas international J", input: { fare: "i-jidc", zone: "international", fields: { distance: 5000 } }, expect: 10000 }
  ],
  rules
};
