/* Philippine Airlines (PR): Mabuhay Miles as a route's base miles times a
   fare-family percentage, from PAL's domestic (1 October 2026) and
   international (27 October 2026) accrual charts. The charts list base
   miles per route; the calculator uses the distance entered, which can
   differ slightly. Tier bonuses from the Elite, Premier Elite and Million
   Miler pages: 25%, or 75% to and from the US and Canada for Premier Elite
   and Million Miler, on earned miles in Economy and Premium Economy and on
   the distance flown in Business. Philippine Airlines is reported to join
   oneworld in 2027. */
const rules = {
  name: "Philippine Airlines | Mabuhay Miles",
  programName: "Mabuhay Miles",
  country: "PH",
  currency: "PHP",
  unit: "miles",
  method: "distance",
  zoneLabel: "Route",
  zoneHint: "Premier Elite and Million Miler earn a larger bonus on flights to and from the US and Canada.",
  zones: [
    { id: "other", name: "Domestic or international (not US or Canada)" },
    { id: "usca", name: "To or from the US or Canada" }
  ],
  defaultFareType: "y-flex",
  fareTypeLabel: "Fare family",
  fareTypes: [
    { id: "j-flex", name: "Business Flex (D, C, J)", rate: 1.5, bonusOnDistance: true },
    { id: "j-value", name: "Business Value (Z, I)", rate: 1.25, bonusOnDistance: true },
    { id: "w", name: "Premium Economy or Comfort Class (N, W)", rate: 1.15 },
    { id: "y-flex", name: "Economy Flex (H, M, L, S, Y)", rate: 1 },
    { id: "y-value", name: "Economy Value (X, B, V, Q)", rate: 0.75 },
    { id: "y-saver", name: "Economy Saver (T, E, K)", rate: 0.5 },
    { id: "g", name: "Group Booking (G)", rate: 0.5 },
    { id: "y-supersaver", name: "Economy Supersaver (O, U)", rate: 0.1 }
  ],
  statuses: [
    { id: "member", name: "Mabuhay Miles Member", multiplier: 1 },
    { id: "elite", name: "Elite", multiplier: 1.25 },
    { id: "premier", name: "Premier Elite", multiplier: 1.25, multipliers: { other: 1.25, usca: 1.75 } },
    { id: "million", name: "Million Miler", multiplier: 1.25, multipliers: { other: 1.25, usca: 1.75 } }
  ],
  note: "Mabuhay Miles earns a route's base miles times a fare-family percentage on Philippine Airlines and PAL Express flights: 10% (Economy Supersaver) to 150% (Business Flex). PAL's charts list fixed base miles per route, which can differ slightly from the distance entered here. Elite earns a 25% bonus; Premier Elite and Million Miler earn 75% to and from the US and Canada and 25% elsewhere. The bonus is figured on earned miles in Economy, Comfort and Premium Economy, and on the distance flown in Business."
};

module.exports = {
  id: "pal",
  // Month the earning rules were last checked against the source.
  reviewed: "2026-11",
  code: "PR",
  color: "#001F60",
  source: "https://www.philippineairlines.com/content/dam/palportal/loyalty_accrual_redemption/International-Accrual-Chart-as-of-27-October-2026.pdf",
  examples: [
    { name: "PAL Economy Flex, Manila-Cebu base miles", input: { fare: "y-flex", zone: "other", fields: { distance: 349 } }, expect: 349 },
    { name: "PAL Business Flex, Premier Elite to the US", input: { fare: "j-flex", zone: "usca", status: "premier", fields: { distance: 1000 } }, expect: 2250 },
    { name: "PAL Economy Value, Elite", input: { fare: "y-value", zone: "other", status: "elite", fields: { distance: 1000 } }, expect: 938 }
  ],
  rules
};
