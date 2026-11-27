/* SKY Airline (H2): SKY Plus points on SKY-operated flights (SKY Airline
   Chile and SKY Airline Peru), from the SKY Plus page
   (skyairline.com/es/chile/skyplus): Cobre 2.5, Oro 3.3 and Platino 5.8
   points per USD 1 spent on SKY. The SKY Plus help centre
   (cda.skyairline.com) says tickets, extra bags and seats earn, whether
   bought on SKY's website or through a travel agency. The SKY Plus and
   Billetera SKY Terms and Conditions (V.2, June 2024), section III.4(i),
   count the purchase in US dollars, excluding fees, taxes and services from
   third parties such as insurance or car rental. Purchases in local
   currency (CLP, PEN) are converted to dollars at SKY's exchange rate on
   the day of purchase. The terms do not state how fractions are rounded. */

const rules = {
  name: "SKY Airline | SKY Plus",
  programName: "SKY Plus",
  country: "CL",
  currency: "USD",
  unit: "points",
  method: "spend",
  noCarrier: true,
  addons: true,
  addonsLabel: "Bags and Seats",
  addonsHint: "Extra bags and seat selection bought from SKY. They earn like the fare. Insurance, car rental and other third-party services do not.",
  statuses: [
    { id: "cobre", name: "Cobre", rate: 2.5 },
    { id: "oro", name: "Oro", rate: 3.3 },
    { id: "platino", name: "Platino", rate: 5.8 }
  ],
  note: "SKY Plus earns points per US dollar spent with SKY: 2.5 for Cobre, 3.3 for Oro and 5.8 for Platino. Tickets, extra bags and seats earn, whether bought on SKY's website or app or through a travel agency. Fees, taxes and third-party services such as insurance or car rental do not earn. Points are credited up to 14 days after the flight, and only for flights operated by SKY. Tickets paid with points, infant, charter, industry discount and consolidator fares do not earn. SKY converts purchases in pesos or soles to dollars at its exchange rate on the day of purchase. SKY does not publish how fractions of a point are rounded, so this estimate rounds down. SKY does not publish a co-brand credit card that earns SKY Plus points. Enter fares in US dollars."
};

module.exports = {
  id: "skyairline",
  // Month the earning rules were last checked against the source.
  reviewed: "2026-11",
  code: "H2",
  color: "#78028A",
  source: "https://www.skyairline.com/es/chile/skyplus",
  // Worked by hand from the published rates. The browser tests check each one.
  examples: [
    { name: "SKY Plus Oro with bags", input: { status: "oro", fields: { airfare: 100, addons: 20 } }, expect: 396 },
    { name: "SKY Plus Platino", input: { status: "platino", fields: { airfare: 150 } }, expect: 870 },
    { name: "SKY Plus Cobre, rounded down", input: { status: "cobre", fields: { airfare: 99 } }, expect: 247 }
  ],
  rules
};
