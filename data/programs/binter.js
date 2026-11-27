/* Binter (NT): BinterMás. Sources:
   - Binter booking engine, inter-island fare comparison table (checked on
     Gran Canaria to Tenerife Norte, Tenerife Norte to La Palma and Gran
     Canaria to Lanzarote, December 2026 departures): "BinterMás points
     obtention" SuperPromo No, Promo 50, Economic 75, Flexible 100,
     FlexiMás 200 points per flight. https://www.bintercanarias.com/en
   - National and international fares page: Basic, Plus, FlexiPlus and
     Premium earn a fixed amount per flight that differs by route. The page
     lists 150, 300, 900 and 1,200 points, while the booking engine shows
     150, 600, 1,000 and 1,600 on Madrid flights and other amounts on
     Palma, Sevilla, Madeira and Dakar. Binter publishes no complete table
     for these routes, so they are left out.
     https://www.bintercanarias.com/en/national-international-fares
   - BinterMás FAQ and programme conditions: tiers Verde, Plata (2,500 tier
     points and 15 flights in 12 months), Oro (8,000 and 40) and Cumbre
     (20,000 and 100). Tier benefits list no earning bonus. One optional
     Cumbre benefit is a chosen month of double points on all flights.
     https://www.bintercanarias.com/en/bintermas
   No Binter co-brand credit card publishes a BinterMás earning rate. */
const rules = {
  name: "Binter | BinterMás (inter-island only)",
  programName: "BinterMás",
  country: "ES",
  currency: "EUR",
  unit: "BinterMás points",
  method: "zone",
  defaultFareType: "economica",
  fareTypeLabel: "Binter inter-island fare",
  // Fixed points per flight. The zone's points follow the fareTypes order.
  fareTypes: [
    { id: "superpromo", name: "SuperPromo" },
    { id: "promo", name: "Promo" },
    { id: "economica", name: "Económica" },
    { id: "flexible", name: "Flexible" },
    { id: "fleximas", name: "FlexiMás" }
  ],
  zoneLabel: "Route",
  zoneHint: "Only flights between the Canary Islands are covered. Flights to mainland Spain and abroad earn amounts that Binter does not publish in a complete table.",
  zones: [{ id: "interisland", name: "Inter-island flight within the Canary Islands (one flight)", points: [0, 50, 75, 100, 200] }],
  statuses: [
    { id: "verde", name: "BinterMás Verde", bonus: 0 },
    { id: "plata", name: "BinterMás Plata", bonus: 0 },
    { id: "oro", name: "BinterMás Oro", bonus: 0 },
    { id: "cumbre", name: "BinterMás Cumbre", bonus: 0 }
  ],
  cards: null,
  note: "This estimate covers inter-island flights within the Canary Islands only. BinterMás awards a fixed number of points for each inter-island flight, whatever the distance: SuperPromo earns nothing, Promo earns 50, Económica 75, Flexible 100 and FlexiMás 200. Flights to mainland Spain, Madeira, Africa and other destinations use the Basic, Plus, FlexiPlus and Premium fares. Their points differ by route and are shown only in the booking engine, and Binter publishes no complete table for them, so they are not covered here. Tiers do not add an earning bonus. Cumbre members can choose one month of double points on all flights as a personal benefit, which is not modeled. Points must be linked to the booking with the BinterMás number. Points expire on 31 March of the third year after they were earned, except at Cumbre level. Binter has no co-brand credit card with a published BinterMás rate."
};

module.exports = {
  id: "binter",
  // Month the earning rules were last checked against the source.
  reviewed: "2026-11",
  code: "NT",
  color: "#5BAC29",
  source: "https://www.bintercanarias.com/en/bintermas",
  // Rates read from the booking engine's inter-island fare table. The browser tests check each one.
  examples: [
    { name: "Binter Económica, one inter-island flight", input: { status: "verde", fare: "economica", zone: "interisland" }, expect: 75 },
    { name: "Binter FlexiMás, one inter-island flight at Oro", input: { status: "oro", fare: "fleximas", zone: "interisland" }, expect: 200 },
    { name: "Binter SuperPromo earns nothing", input: { status: "plata", fare: "superpromo", zone: "interisland" }, expect: 0 }
  ],
  rules
};
