/* Loganair (LM): Loganair Loyalty, which has earned Avios since 31 March
   2025 (it replaced Clan Loganair and its Clan Points). Sources:
   - Loganair Loyalty Avios page and its fare table: Fly 410, Fly Flex 650,
     Fly Flex + 1300 Avios (previously 250, 400 and 800 Clan Points).
     https://www.loganair.co.uk/loyalty/avios/
   - Loganair Loyalty FAQs: a fixed amount per Loganair flight whatever the
     distance; each flight of a connection earns (Norwich to Kirkwall via
     Aberdeen on Fly earns 820); a through-flight on the same aircraft counts
     as one flight; travel agent bookings earn; codeshare flights operated by
     other airlines and Orkney inter-isles services do not.
     https://www.loganair.co.uk/loyalty/faqs/
   - Loganair Loyalty Terms and Conditions, section 3: only public fares on
     Loganair-operated scheduled flights earn; no Avios for excess baggage or
     other services. https://www.loganair.co.uk/loyalty/loganair-loyalty-terms-conditions/
   There are no tiers and no Loganair co-brand card. */
const rules = {
  name: "Loganair | Loganair Loyalty",
  programName: "Loganair Loyalty",
  country: "UK",
  unit: "Avios",
  method: "zone",
  defaultFareType: "fly",
  fareTypeLabel: "Loganair fare",
  // Fixed Avios per flight. The zone's points follow the fareTypes order.
  fareTypes: [
    { id: "fly", name: "Fly" },
    { id: "flex", name: "Fly Flex" },
    { id: "flexplus", name: "Fly Flex +" }
  ],
  zones: [{ id: "any", name: "Any Loganair flight (one flight)", points: [410, 650, 1300] }],
  statuses: [
    { id: "member", name: "Loganair Loyalty Member", bonus: 0 }
  ],
  cards: null,
  note: "Loganair Loyalty earns a fixed number of Avios for each Loganair flight, whatever the distance: 410 on Fly, 650 on Fly Flex and 1,300 on Fly Flex +. Each flight of a connection earns separately, so Norwich to Kirkwall via Aberdeen on Fly earns 820. A through-flight that stops but stays on the same aircraft counts as one flight. Bookings made with a travel agent also earn. Only public fares earn. Corporate, negotiated and tour fares, large group bookings, Orkney inter-isles services and codeshare flights operated by other airlines earn nothing. The program has no tiers, and Loganair has no co-brand card. Avios can be moved to and from British Airways Club and other Avios programs."
};

module.exports = {
  id: "loganair",
  // Month the earning rules were last checked against the source.
  reviewed: "2026-11",
  code: "LM",
  color: "#DA291C",
  source: "https://www.loganair.co.uk/loyalty/avios/",
  // Published examples. The browser tests check each one.
  examples: [
    { name: "Loganair Fly, one flight", input: { status: "member", fare: "fly", zone: "any" }, expect: 410 },
    { name: "Loganair Fly Flex +, one flight", input: { status: "member", fare: "flexplus", zone: "any" }, expect: 1300 }
  ],
  rules
};
