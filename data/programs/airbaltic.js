/* airBaltic (BT): airBaltic Club points per euro, from airBaltic's "How to
   collect?" page. Points are earned on the ticket's total charges, taxes
   and fuel charges included, and on extra services bought from airBaltic:
   1 point per euro at Club level, 3 at Executive and VIP, plus a fixed
   bonus on Classic (+50), Flex (+100), Business Experience (+150) and
   Business (+200). Only airBaltic tickets on airBaltic-operated flights
   earn. */

const rules = {
  name: "airBaltic | airBaltic Club",
  programName: "airBaltic Club",
  country: "LV",
  currency: "EUR",
  unit: "points",
  method: "spend",
  // The ticket's taxes and fuel charges earn too.
  taxesEarn: true,
  noCarrier: true,
  addons: true,
  addonsLabel: "Extra services",
  addonsHint: "Seats, bags, meals, upgrades, fast track or priority check-in bought from airBaltic. They earn points like the fare.",
  defaultFareType: "basic",
  fareTypes: [
    { id: "mini", name: "Economy MINI", rate: 1 },
    { id: "basic", name: "Economy BASIC", rate: 1 },
    { id: "classic", name: "Economy CLASSIC (airbaltic.com only)", rate: 1, addPoints: 50 },
    { id: "flex", name: "Economy FLEX", rate: 1, addPoints: 100 },
    { id: "experience", name: "Business EXPERIENCE", rate: 1, addPoints: 150 },
    { id: "business", name: "BUSINESS", rate: 1, addPoints: 200 }
  ],
  statuses: [
    { id: "club", name: "Club", multiplier: 1 },
    { id: "executive", name: "Executive", multiplier: 3 },
    { id: "vip", name: "VIP", multiplier: 3 }
  ],
  // C airBaltic payment card (Citadele, Latvia, Lithuania and Estonia):
  // 1 point per euro from the card plus 3 from airBaltic on flight tickets.
  cards: [
    { id: "c-airbaltic", name: "C airBaltic payment card", rate: 4, bank: "Citadele (Latvia, Lithuania, Estonia)" }
  ],
  note: "airBaltic Club earns 1 point per euro at Club level and 3 at Executive and VIP, on the ticket's total charges, including taxes and fuel charges, and on extra services bought from airBaltic. Classic, Flex, Business Experience and Business fares add 50, 100, 150 and 200 bonus points. Only airBaltic tickets for flights operated by airBaltic earn; codeshare flights on Air France and KLM earn 1 point per euro. The C airBaltic payment card earns 1 point per euro, plus 3 more per euro from airBaltic on flight tickets, awarded after the flight."
};

module.exports = {
  id: "airbaltic",
  // Month the earning rules were last checked against the source.
  reviewed: "2026-11",
  code: "BT",
  color: "#CDDA32",
  source: "https://www.airbaltic.com/en/how-to-collect-points",
  rules
};
