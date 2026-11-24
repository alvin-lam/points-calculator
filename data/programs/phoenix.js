/* PhoenixMiles: Air China. Kilometres flown times the
   class percentage, with a minimum per flight in km; the first value is for
   flights within mainland China, the second for international ones. */

const rules = {
  name: "Air China Group | PhoenixMiles",
  programName: "PhoenixMiles",
  country: "CN",
  unit: "PhoenixMiles",
  method: "distance",
  distanceFactor: 1.609344,
  defaultFareType: "m",
  zoneLabel: "Route type",
  zoneHint: "PhoenixMiles counts kilometres; enter the distance in miles and the calculator converts it.",
  zones: [
    { id: "mainland", name: "Within mainland China" },
    { id: "intl", name: "International and regional" }
  ],
  airlines: [
    { id: "ca", name: "Air China" }
  ],
  fareTypes: [
    { id: "f", name: "First (F)", earn: [{ share: 3, min: 1000 }, { share: 3, min: 1000 }] },
    { id: "a", name: "First (A)", earn: [{ share: 2, min: 1000 }, { share: 2.5, min: 1000 }] },
    { id: "j", name: "Business (J)", earn: [{ share: 3, min: 800 }, { share: 2.5, min: 800 }] },
    { id: "c", name: "Business (C)", earn: [{ share: 2, min: 800 }, { share: 2, min: 800 }] },
    { id: "d", name: "Business (D)", earn: [{ share: 1.5, min: 800 }, { share: 1.5, min: 800 }] },
    { id: "z", name: "Business (Z)", earn: [{ share: 1.25, min: 800 }, { share: 1.25, min: 800 }] },
    { id: "r", name: "Business (R)", earn: [{ share: 1.1, min: 800 }, { share: 1.25, min: 800 }] },
    { id: "g", name: "Premium Economy (G)", earn: [{ share: 1.1, min: 500 }, { share: 1.1, min: 500 }] },
    { id: "e", name: "Premium Economy (E)", earn: [{ share: 0.9, min: 500 }, { share: 0.9, min: 500 }] },
    { id: "y", name: "Economy (Y)", earn: [{ share: 1.1, min: 500 }, { share: 1.1, min: 500 }] },
    { id: "b", name: "Economy (B)", earn: [{ share: 1, min: 500 }, { share: 1.1, min: 500 }] },
    { id: "m", name: "Economy (M)", earn: [{ share: 1, min: 500 }, { share: 1, min: 500 }] },
    { id: "u", name: "Economy (U)", earn: [{ share: 1, min: 500 }, { share: 0.75, min: 500 }] },
    { id: "hqv", name: "Economy (H, Q, V)", earn: [{ share: 0.75, min: 500 }, { share: 0.75, min: 500 }] },
    { id: "wst", name: "Economy (W, S, T)", earn: [{ share: 0.5, min: 500 }, { share: 0.5, min: 500 }] },
    { id: "lkp", name: "Economy (L, K, P)", earn: [{ share: 0.25, min: 500 }, { share: 0.25, min: 500 }] }
  ],
  statuses: [
    { id: "member", name: "PhoenixMiles Member", multiplier: 1 },
    { id: "silver", name: "Silver", multiplier: 1.25 },
    { id: "gold", name: "Gold", multiplier: 1.3 },
    { id: "platinum", name: "Platinum", multiplier: 1.5 }
  ],
  note: "PhoenixMiles earns a share of the distance in kilometres by booking class, with a minimum per flight (500 km in Economy, 800 km in Business, 1,000 km in First). Silver, Gold, and Platinum earn 25%, 30%, and 50% extra; the airline does not say what the bonus is taken of, so this estimate applies it to the class miles."
};

module.exports = {
  id: "phoenix",
  // Month the earning rules were last checked against the source.
  reviewed: "2026-11",
  source: "https://cwsi.net/fares/air-china/",
  // Two-letter code, brand color, and source page for each airline.
  airlines: {
    ca: { code: "CA", color: "#E30613" }
  },
  rules
};
