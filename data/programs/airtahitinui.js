/* Air Tahiti Nui (TN): Club Tiare miles as a share of the distance by
   booking class, from Air Tahiti Nui's "Earn miles" page, with the status
   bonus from the Club Tiare terms (revised 9 November 2026, clause 2.3.6):
   50% for Silver and 75% for Gold, applied to the miles earned. */
const rules = {
  name: "Air Tahiti Nui | Club Tiare",
  programName: "Club Tiare",
  country: "PF",
  currency: "XPF",
  unit: "miles",
  method: "distance",
  defaultFareType: "y-tln",
  // Classes O, X, U, I, F and R earn nothing.
  fareTypes: [
    { id: "j-cj", name: "Poerava Business (C, J)", rate: 1.5 },
    { id: "j-dz", name: "Poerava Business (D, Z)", rate: 1.25 },
    { id: "w", name: "Mānava Premium (W)", rate: 1.15 },
    { id: "w-eap", name: "Mānava Premium (E, A, P)", rate: 1.05 },
    { id: "y-ymkh", name: "Moana Economy (Y, M, K, H)", rate: 1 },
    { id: "y-tln", name: "Moana Economy (T, L, N)", rate: 0.75 },
    { id: "y-bqgv", name: "Moana Economy (B, Q, G, V)", rate: 0.5 },
    { id: "y-s-paris", name: "Moana Economy (S), Papeete-Paris", rate: 0.5 },
    { id: "y-s", name: "Moana Economy (S), other routes", rate: 0.25 }
  ],
  statuses: [
    { id: "member", name: "Club Tiare Member", multiplier: 1 },
    { id: "silver", name: "Silver", multiplier: 1.5 },
    { id: "gold", name: "Gold", multiplier: 1.75 }
  ],
  note: "Club Tiare earns a share of the distance by booking class on Air Tahiti Nui flights: 25% (S) to 150% (Poerava Business C, J); class S earns 50% between Papeete and Paris. Classes O, X, U, I, F and R and infants under 2 earn nothing. Silver earns 50% and Gold 75% more, per the Club Tiare terms. Codeshare flights with Alaska Airlines do not earn."
};

module.exports = {
  id: "airtahitinui",
  // Month the earning rules were last checked against the source.
  reviewed: "2026-11",
  code: "TN",
  color: "#003764",
  source: "https://us.airtahitinui.com/earn-miles",
  examples: [
    { name: "Air Tahiti Nui Economy (Y), Papeete-Los Angeles", input: { fare: "y-ymkh", fields: { distance: 4109 } }, expect: 4109 },
    { name: "Air Tahiti Nui Business (C), Gold", input: { fare: "j-cj", status: "gold", fields: { distance: 1000 } }, expect: 2625 }
  ],
  rules
};
