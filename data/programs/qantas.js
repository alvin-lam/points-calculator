/* Qantas: fixed points per flight by route band and fare, from Qantas'
   earning tables for Qantas-marketed flights (travel from 22 July 2025).
   Each zone's points list follows the fareTypes order; null means the
   fare is not sold on that route. */

const rules = {
  name: "Qantas | Qantas Frequent Flyer",
  country: "AU",
  currency: "AUD",
  unit: "Qantas Points",
  method: "zone",
  centsPerPoint: 1.0,
  defaultFareType: "y",
  fareTypes: [
    { id: "disc-y", name: "Discount Economy" },
    { id: "y", name: "Economy" },
    { id: "flex-y", name: "Flexible Economy" },
    { id: "disc-pe", name: "Discount Premium Economy", premium: true },
    { id: "pe", name: "Premium Economy", premium: true },
    { id: "flex-pe", name: "Flexible Premium Economy", premium: true },
    { id: "disc-j", name: "Discount Business", premium: true },
    { id: "j", name: "Business", premium: true },
    { id: "flex-j", name: "Flexible Business", premium: true },
    { id: "f", name: "First", premium: true }
  ],
  zones: [
    { id: "dom-short", name: "Domestic Australia: 0 to 750 miles", points: [500, 500, 750, 750, 1125, 1250, null, 1750, 2000, 2250] },
    { id: "dom-medium", name: "Domestic Australia: 751 to 1,500 miles", points: [875, 875, 1375, 1375, 1750, 1940, null, 2625, 2940, 3500] },
    { id: "dom-long", name: "Domestic Australia: 1,501 miles and over", points: [1815, 1815, 2750, 2750, 3375, 3625, null, 4125, 4500, 5500] },
    { id: "int-1", name: "International: 0 to 750 miles", points: [300, 450, 650, 650, 750, 850, 900, 975, 1050, 1200] },
    { id: "int-2", name: "International: 751 to 1,500 miles", points: [550, 850, 1100, 1100, 1350, 1500, 1650, 1800, 1950, 2200] },
    { id: "int-3", name: "International: 1,501 to 2,500 miles", points: [1100, 1650, 2200, 2200, 2750, 3050, 3300, 3575, 3850, 4400] },
    { id: "int-4", name: "International: 2,501 to 3,500 miles", points: [1600, 2400, 3200, 3200, 4000, 4400, 4800, 5200, 5600, 6400] },
    { id: "int-5", name: "International: 3,501 to 5,000 miles", points: [2450, 3700, 4900, 4900, 6150, 6750, 7350, 7975, 8600, 9800] },
    { id: "int-6", name: "International: 5,001 to 6,500 miles", points: [2900, 4350, 5800, 5800, 7250, 8000, 8700, 9425, 10150, 11600] },
    { id: "int-7", name: "International: 6,501 miles and over", points: [4000, 6000, 8000, 8000, 10000, 11000, 12000, 13000, 14000, 16000] }
  ],
  // The status bonus on premium cabins is figured on the Flexible
  // Economy amount for the same route.
  // Minimum Points Guarantee per flight, after the status bonus, in
  // fareTypes order (clause 9.3.3 of the Qantas Frequent Flyer terms).
  zoneMin: [800, 800, 1200, 1200, 1200, 1200, 1400, 1400, 1400, 1400],
  bonusBaseFare: "flex-y",
  statuses: [
    { id: "bronze", name: "Bronze", bonus: 0 },
    { id: "silver", name: "Silver", bonus: 0.5 },
    { id: "gold", name: "Gold", bonus: 0.75 },
    { id: "platinum", name: "Platinum", bonus: 1 },
    { id: "platinum-one", name: "Platinum One", bonus: 1 }
  ],
  // Australian co-branded cards: Qantas Points per Australian dollar
  // charged for selected Qantas products and services, card points plus the
  // Qantas bonus. Sources (November 2026):
  // https://www.americanexpress.com/au/credit-cards/qantas-discovery-card/
  // https://www.anz.com.au/personal/credit-cards/frequent-flyer-black/
  // https://www.anz.com.au/personal/credit-cards/frequent-flyer-platinum/
  // https://www.westpac.com.au/credit-cards/reward/altitude-qantas-black
  // https://www.qantasmoney.com/credit-cards
  // ANZ: 1 (Black) or 0.75 (Platinum) per A$ plus 1 bonus on Qantas.
  // Westpac: 0.8 everyday plus up to 1 bonus on Qantas. Qantas Money:
  // 0.75, 1 or 1.25 plus 1, 1 or 2 bonus on Qantas.
  cards: [
    { id: "amex-premium", name: "Qantas American Express Premium Card", rate: 2, bank: "American Express (Australia)" },
    { id: "amex-ultimate", name: "Qantas American Express Ultimate Card", rate: 2.25, bank: "American Express (Australia)" },
    { id: "amex-discovery", name: "Qantas American Express Discovery Card", rate: 1.75, bank: "American Express (Australia)" },
    { id: "anz-ff-black", name: "ANZ Frequent Flyer Black", rate: 2, bank: "ANZ (Australia)" },
    { id: "anz-ff-platinum", name: "ANZ Frequent Flyer Platinum", rate: 1.75, bank: "ANZ (Australia)" },
    { id: "westpac-altitude-qantas-black", name: "Westpac Altitude Qantas Black", rate: 1.8, rateText: "up to 1.8 per A$", bank: "Westpac (Australia)" },
    { id: "qantas-money-everyday", name: "Qantas Money Everyday Credit Card", rate: 1.75, bank: "Qantas Money (Australia)" },
    { id: "qantas-money-platinum", name: "Qantas Money Platinum Credit Card", rate: 2, bank: "Qantas Money (Australia)" },
    { id: "qantas-money-titanium", name: "Qantas Money Titanium Credit Card", rate: 3.25, bank: "Qantas Money (Australia)" }
  ],
  note: "Qantas awards a fixed number of points per flight by fare and distance. Silver, Gold, and Platinum add 50%, 75%, and 100%; in Premium Economy, Business, and First the bonus is figured on the Flexible Economy amount. Some routes, such as Australia to New Zealand, the USA, or Europe, have their own tables; this estimate uses the general distance bands. The Minimum Points Guarantee lifts each flight to at least 800 points in Economy, 1,200 in Flexible Economy and Premium Economy, and 1,400 in Business and First. On selected Qantas purchases, Australian cards earn per Australian dollar: Qantas American Express Discovery 1.75, Premium 2 and Ultimate 2.25; ANZ Frequent Flyer Black 2 and Platinum 1.75; Westpac Altitude Qantas Black up to 1.8; and Qantas Money Everyday 1.75, Platinum 2 and Titanium 3.25."
};

module.exports = {
  id: "qantas",
  // Month the earning rules were last checked against the source.
  reviewed: "2026-11",
  code: "QF",
  color: "#E40000",
  source: "https://www.qantas.com/us/en/frequent-flyer/earning-points/flights/qantas.html",
  rules
};
