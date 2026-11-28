/* TAP Miles&Go: a share of miles flown, by fare and region. */

const rules = {
  name: "TAP Air Portugal | Miles&Go",
  country: "PT",
  currency: "EUR",
  unit: "miles",
  method: "distance",
  defaultFareType: "classic-eu",
  fareTypes: [
    { id: "discount", name: "Discount", rate: 0.2 },
    { id: "basic", name: "Basic (intercontinental)", rate: 0.5 },
    { id: "classic-eu", name: "Classic, Europe and North Africa", rate: 0.7 },
    { id: "classic-ic", name: "Classic, intercontinental", rate: 1 },
    { id: "plus-eu", name: "Plus, Europe and North Africa", rate: 1 },
    { id: "plus-ic", name: "Plus, intercontinental", rate: 1.5 },
    { id: "prime", name: "Prime (intercontinental)", rate: 1.5 },
    { id: "top-prime", name: "Top Prime (intercontinental)", rate: 1.75 },
    { id: "executive", name: "Executive", rate: 1.75 },
    { id: "top-executive", name: "Top Executive", rate: 2 }
  ],
  statuses: [
    { id: "member", name: "Miles&Go Member", multiplier: 1 },
    { id: "silver", name: "Silver", multiplier: 1 },
    { id: "gold", name: "Gold", multiplier: 1 }
  ],
  // US co-branded card (Cardless, issued by First Electronic Bank): 3 miles
  // per US dollar on TAP Air Portugal purchases, from
  // https://www.cardless.com/cards/tap
  // Portuguese cards (Millennium bcp): miles per euro on all card spend,
  // with no extra for TAP purchases, from TAP's partner page:
  // https://www.flytap.com/en-pt/miles-and-go/partners/millennium-bcp
  cards: [
    { id: "cardless-tap", name: "TAP Miles&Go American Express Credit Card", rate: 3, currency: "USD", bank: "Cardless (US)" },
    { id: "bcp-classic", name: "TAP Classic Credit Card", rate: 1, bank: "Millennium bcp (Portugal)" },
    { id: "bcp-gold", name: "TAP Gold Credit Card", rate: 1.5, bank: "Millennium bcp (Portugal)" },
    { id: "bcp-platinum", name: "TAP Platinum Credit Card", rate: 2, bank: "Millennium bcp (Portugal)" }
  ],
  note: "TAP Miles&Go earns a share of the miles flown set by fare and region. Executive rose from 150% to 175% in 2026. The intercontinental Prime and Top Prime fares earn 150% and 175%. Silver and Gold bonuses could not be confirmed, so all levels use the base rates. The US TAP Miles&Go American Express Credit Card earns 3 more miles per dollar on TAP purchases. In Portugal, the Millennium bcp TAP Classic, Gold and Platinum credit cards earn 1, 1.5 and 2 miles per euro on all purchases, up to 5,000, 15,000 and 75,000 miles a month."
};

module.exports = {
  id: "tap",
  // Month the earning rules were last checked against the source.
  reviewed: "2026-11",
  code: "TP",
  color: "#B3DB18",
  source: "https://www.flytap.com/en-us/miles-and-go/earn-miles/by-flying",
  rules
};
