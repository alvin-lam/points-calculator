const rules = {
  name: "Cathay Pacific | Asia Miles",
  country: "HK",
  currency: "HKD",
  unit: "Asia Miles",
  method: "zone",
  defaultFareType: "y-ess",
  // Fixed Asia Miles per flight from Cathay's table effective 20 August 2025.
  fareTypes: [
    { id: "f", name: "First (F, A) Flex" },
    { id: "j", name: "Business (J, C) Flex" },
    { id: "d", name: "Business (D, P, I) Essential or Light" },
    { id: "w", name: "Premium Economy (W, R) Flex" },
    { id: "e", name: "Premium Economy (E) Essential" },
    { id: "y-flex", name: "Economy (Y, B, H, K) Flex" },
    { id: "y-ess", name: "Economy (Y, B, H, K) Essential" },
    { id: "y-light", name: "Economy (Y, B, H, K) Light" },
    { id: "m-flex", name: "Economy (M, L, V) Flex" },
    { id: "m-ess", name: "Economy (M, L, V) Essential" },
    { id: "m-light", name: "Economy (M, L, V) Light" },
    { id: "s-flex", name: "Economy (S, N, Q, O) Flex" },
    { id: "s-ess", name: "Economy (S, N, Q, O) Essential" },
    { id: "s-light", name: "Economy (S, N, Q, O) Light" }
  ],
  // Each zone's points list follows the fareTypes order. Zones are
  // measured from Hong Kong.
  zones: [
    { id: "ultra-short", name: "Ultra-short: 1 to 750 miles (Hanoi, Manila, Taipei)", points: [3500, 3000, 2500, 2500, 1500, 2500, 1500, 1000, 2000, 1000, 600, 1500, 500, 300] },
    { id: "short1", name: "Short, Type 1: 751 to 2,750 miles (Beijing, Seoul, Singapore)", points: [4500, 4000, 3500, 3000, 2000, 3000, 2000, 1500, 2500, 1500, 1000, 2000, 1000, 600] },
    { id: "short2", name: "Short, Type 2: 751 to 2,750 miles to Japan, India, Indonesia, Sri Lanka, Nepal, Bangladesh", points: [6000, 5000, 4500, 3500, 2500, 3500, 2500, 1800, 3000, 2000, 1200, 2500, 1500, 800] },
    { id: "medium", name: "Medium: 2,751 to 5,000 miles (Dubai, Melbourne, Sydney)", points: [11000, 9000, 7500, 6000, 4500, 4800, 3800, 3000, 4200, 3200, 2200, 3200, 2200, 1500] },
    { id: "long", name: "Long: 5,001 to 7,500 miles (London, Paris, San Francisco)", points: [16000, 13000, 10000, 8000, 6500, 7000, 6000, 4000, 6000, 5000, 3200, 3800, 2800, 1800] },
    { id: "ultra-long", name: "Ultra-long: 7,501 miles or more (Chicago, New York, Toronto)", points: [18000, 15000, 12000, 10000, 8500, 9000, 7000, 5000, 8000, 6000, 4000, 4500, 3500, 2500] }
  ],
  statuses: [
    { id: "green", name: "Green", bonus: 0 },
    { id: "silver", name: "Silver", bonus: 0 },
    { id: "gold", name: "Gold", bonus: 0 },
    { id: "diamond", name: "Diamond", bonus: 0 }
  ],
  // US card (Synchrony): Asia Miles per US dollar on Cathay Pacific and
  // HK Express purchases.
  cards: [
    { id: "cathay-wemc", name: "Cathay World Elite Mastercard", rate: 3, currency: "USD", bank: "Synchrony (US)" }
  ],
  note: "Cathay Pacific awards a fixed number of Asia Miles per flight, set by fare type and distance zone from Hong Kong. Cathay's published table is the same for every status level. It covers flights marketed by Cathay Pacific and departing on or after 20 August 2025. The US Cathay World Elite Mastercard adds 3 Asia Miles per US dollar charged for the ticket."
};

module.exports = {
  id: "cathay",
  // Month the earning rules were last checked against the source.
  reviewed: "2026-11",
  code: "CX",
  color: "#006564",
  source: "https://www.cathaypacific.com/cx/en_US/faqs/cathay-membership-programme/asia-miles/earn-when-you-fly/how-can-i-earn-miles-with-cathay-pacific-or-other-flights-partners.html",
  rules
};
