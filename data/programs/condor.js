/* Condor (DE) has no frequent flyer program of its own ("Condor hat kein
   eigenes Meilenprogramm", Condor's FAQ). Its flights earn in two partner
   programs, so Condor appears twice in the program menu and the user picks
   the program they credit to:
   - JetBlue TrueBlue: points per mile flown by Condor fare, from JetBlue's
     Condor partner page (the same rates as Condor's TrueBlue page).
   - Alaska Atmos Rewards: from 1 January 2027 members choose how they earn
     (Alaska's "Choose how you earn" and 2027 earning pages), and the choice
     applies to partner flights: 1 point per mile, 500 per segment, or the
     price paid. On price paid, a Condor flight earns 5 points per dollar if
     bought from Alaska or Hawaiian, and otherwise a share of the distance by
     cabin.
   Emirates Skywards earning on Condor ended on 1 May 2026; Etihad Guest and
   Qantas are redemption-only partners. */

const trueBlue = {
  programName: "TrueBlue",
  unit: "points",
  method: "distance",
  defaultFareType: "flex",
  fareTypeLabel: "Condor fare",
  fareTypeHint: "The same booking class can belong to different Condor fares, so choose the fare you bought.",
  fareTypes: [
    { id: "business", name: "Business", rate: 2 },
    { id: "premium", name: "Premium Economy", rate: 1.25 },
    { id: "flex", name: "Economy Flex", rate: 1 },
    { id: "classic", name: "Economy Classic", rate: 0.75 },
    { id: "zero", name: "Economy Zero, Light or Promo", rate: 0.5 }
  ],
  // JetBlue lists no Mosaic bonus on Condor flights.
  statuses: [
    { id: "member", name: "TrueBlue Member", multiplier: 1 },
    { id: "mosaic", name: "Mosaic (any level)", multiplier: 1 }
  ],
  cards: null,
  note: "TrueBlue earns points per mile flown on Condor flights by Condor fare: 2 in Business, 1.25 in Premium Economy, 1 in Economy Flex, 0.75 in Economy Classic and 0.5 in Economy Zero, Light or Promo. Business earns this on flight numbers DE2000 to DE2999 and DE4000 to DE4499. Classes N, R, F and X earn nothing. JetBlue lists no Mosaic bonus on Condor flights, and the JetBlue cards' bonus applies to JetBlue purchases only."
};

const atmos = {
  programName: "Atmos Rewards",
  // Condor is not in an alliance, but Atmos Rewards is Alaska's program
  // (oneworld): Atmos status shows its oneworld tier, and the Alliance line
  // says the status counts on oneworld airlines, not on Condor's flights.
  sharedAlliance: "oneworld",
  unit: "points",
  method: "distance",
  currency: "USD",
  earnLabel: "How do you earn Atmos points?",
  earnHint: "From 1 January 2027, Atmos members choose one way to earn, and it also applies to Condor flights.",
  earnMethods: [
    { id: "distance", name: "Miles flown: 1 point per mile", noFareType: true },
    { id: "price", name: "Price paid, booked on alaskaair.com or Hawaiian: 5 points per dollar", rate: 5, noFareType: true },
    { id: "partner", method: "distance", name: "Price paid, booked with Condor or elsewhere: share of the distance by cabin" },
    { id: "segments", name: "Segments flown: 500 points per segment", perSegment: 500, noFareType: true }
  ],
  defaultFareType: "economy",
  fareTypeLabel: "Cabin",
  fareTypes: [
    { id: "business", name: "Business", rate: 2.5 },
    { id: "premium", name: "Premium Economy", rate: 1 },
    { id: "economy", name: "Economy", rate: 0.5 },
    { id: "discount", name: "Discount Economy", rate: 0.25 }
  ],
  statuses: [
    { id: "member", name: "Atmos Member", multiplier: 1 },
    { id: "silver", name: "Atmos Silver", multiplier: 1.25 },
    { id: "gold", name: "Atmos Gold", multiplier: 1.5 },
    { id: "platinum", name: "Atmos Platinum", multiplier: 2 },
    { id: "titanium", name: "Atmos Titanium", multiplier: 2.5 }
  ],
  cards: null,
  note: "From 1 January 2027, Atmos Rewards members choose how they earn, and the choice applies to Condor flights: 1 point per mile flown, 500 points per segment, or the price paid. On price paid, a Condor flight bought from Alaska or Hawaiian earns 5 points per dollar of the fare and carrier-imposed surcharges, excluding taxes; one bought elsewhere earns a share of the distance by cabin: 250% in Business, 100% in Premium Economy, 50% in Economy and 25% in Discount Economy. Silver, Gold, Platinum and Titanium add 25%, 50%, 100% and 150%. Saver, Basic and Light fares earn nothing. Alaska does not say which Condor fares count as Economy or Discount Economy."
};

const rules = {
  name: "Condor",
  country: "DE",
  unit: "points",
  method: "distance",
  airlines: [
    { id: "trueblue", name: "Condor", menuLabel: "Condor", country: "DE", noAlliance: true, program: trueBlue },
    { id: "atmos", name: "Condor", menuHidden: true, country: "DE", noAlliance: true, program: atmos }
  ],
  // One menu entry; the form asks which partner program the flight is
  // credited to.
  creditChoice: {
    label: "Which program do you credit Condor flights to?",
    hint: "Condor has no program of its own. Its flights earn in JetBlue TrueBlue or Alaska Atmos Rewards."
  },
  // Defaults before a program is chosen (TrueBlue). The group name lets a
  // search for either program find Condor.
  programName: "TrueBlue or Atmos Rewards",
  fareTypes: trueBlue.fareTypes,
  defaultFareType: trueBlue.defaultFareType,
  statuses: trueBlue.statuses,
  note: trueBlue.note
};

module.exports = {
  id: "condor",
  // Month the earning rules were last checked against the source.
  reviewed: "2026-11",
  // Two-letter code, brand color, and source page for each entry.
  airlines: {
    trueblue: { code: "DE", color: "#FFA200", source: "https://www.jetblue.com/airline-partners/condor" },
    atmos: { code: "DE", color: "#FFA200", source: "https://www.alaskaair.com/atmosrewards/content/earn-points/flights/2027" }
  },
  examples: [
    { name: "Condor on TrueBlue, Business", airline: "trueblue", input: { fare: "business", fields: { distance: 1000 } }, expect: 2000 },
    { name: "Condor on Atmos, miles flown, Gold", airline: "atmos", input: { earn: "distance", status: "gold", fields: { distance: 1000 } }, expect: 1500 },
    { name: "Condor on Atmos, partner price chart, Economy", airline: "atmos", input: { earn: "partner", fare: "economy", fields: { distance: 1000 } }, expect: 500 }
  ],
  rules
};
