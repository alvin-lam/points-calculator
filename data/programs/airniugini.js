/* Air Niugini (PX): Destinations Points on Air Niugini flights, from the
   Destinations Loyalty Program Terms and Conditions (PDF served at
   airniugini.com.pg/destinations-loyalty/terms-and-conditions/, dated
   2 December 2025) and the Destinations Loyalty section of the Air Niugini
   FAQ (airniugini.com.pg/help/frequently-asked-questions/). Clause 8.5:
   one Destinations Point per kina spent on valid Air Niugini commercial
   flights, excluding taxes, fees and surcharges. Clause 8.6: fares paid in
   another currency are converted to kina at Air Niugini's rate. Clause 5.13
   lists the same 1 point per kina for all Kumul Club memberships.
   The tier table in clause 9 lists Destinations Points earn of K1:1.5
   (Silver), K1:2 (Gold) and K1:1.75 (Platinum). Platinum is lower than Gold
   there and no other official page confirms these values, so they are left
   out. Air Niugini has no co-brand credit card. */

const rules = {
  name: "Air Niugini | Destinations",
  programName: "Destinations",
  country: "PG",
  currency: "PGK",
  unit: "Destinations Points",
  method: "spend",
  baseFareOnly: true,
  carrierLabel: "Surcharges",
  carrierHint: "Fuel or other Air Niugini surcharges, if any. They do not earn Destinations Points.",
  statuses: [
    { id: "member", name: "Destinations or Kumul Club member", rate: 1 }
  ],
  note: "Destinations earns 1 point per kina of the fare on Air Niugini flights. Taxes, fees and surcharges do not earn. Fares paid in another currency are converted to kina at Air Niugini's rate. Kumul Club members earn at the same rate. Your membership number must be on the booking when you reserve. Industry and agency discounts, award tickets, infant fares and charters do not earn. The terms list higher earn rates for Silver, Gold and Platinum Frequent Flyers, but the published Platinum rate is lower than Gold and is not confirmed elsewhere, so this calculator uses the base rate for every tier. Air Niugini does not offer a co-brand credit card. Points last 24 months and are extended by new activity. Enter fares in kina."
};

module.exports = {
  id: "airniugini",
  // Month the earning rules were last checked against the source.
  reviewed: "2026-11",
  code: "PX",
  color: "#730053",
  source: "https://www.airniugini.com.pg/destinations-loyalty/terms-and-conditions/",
  // Published examples. The browser tests check each one.
  examples: [
    { name: "Air Niugini Destinations member", input: { status: "member", fields: { airfare: 1000 } }, expect: 1000 },
    { name: "Air Niugini Destinations member, small fare", input: { status: "member", fields: { airfare: 350 } }, expect: 350 }
  ],
  rules
};
