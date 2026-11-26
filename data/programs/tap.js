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
    { id: "executive", name: "Executive", rate: 1.75 },
    { id: "top-executive", name: "Top Executive", rate: 2 }
  ],
  statuses: [
    { id: "member", name: "Miles&Go Member", multiplier: 1 },
    { id: "silver", name: "Silver", multiplier: 1 },
    { id: "gold", name: "Gold", multiplier: 1 }
  ],
  note: "TAP Miles&Go earns a share of the miles flown set by fare and region. Executive rose from 150% to 175% in 2026. Silver and Gold bonuses could not be confirmed, so all levels use the base rates."
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
