const rules = {
  name: "Xiamen Airlines | Egret Miles",
  country: "CN",
  currency: "CNY",
  unit: "miles",
  method: "spend",
  // "Egret Miles = (Base Fare + Fuel Surcharge) x (Category Multiplier +
  // Tier Multiplier)"; other fees such as the Airport Construction Fee do
  // not earn. (Egret Miles earning page)
  carrierLabel: "Fuel Surcharge",
  carrierHint: "Xiamen Airlines' fuel surcharge (YQ). It earns like the fare. The airport construction fee and other fees do not.",
  roundUp: true,
  defaultFareType: "y-other",
  fareTypes: [
    { id: "j", name: "First or Business", rate: 1 },
    { id: "y-yw", name: "Economy (Y, W)", rate: 1 },
    { id: "y-h-dom", name: "Economy (H), within China", rate: 1 },
    { id: "y-h-intl", name: "Economy (H), international or regional", rate: 0.7 },
    { id: "y-other", name: "Other Economy classes", rate: 0.7 }
  ],
  statuses: [
    { id: "member", name: "Egret Member", multiplier: 1 },
    { id: "silver", name: "Egret Silver", multiplier: 1, addRate: 0.2 },
    { id: "gold", name: "Egret Gold", multiplier: 1, addRate: 0.3 },
    { id: "platinum", name: "Egret Platinum", multiplier: 1, addRate: 0.4 },
    { id: "diamond", name: "Egret Diamond", multiplier: 1, addRate: 0.5 }
  ],
  note: "Since 25 July 2026, Egret Miles earns on the base fare plus fuel surcharge in yuan, times the cabin multiplier (1.0 or 0.7) plus the tier multiplier (0.2 to 0.5). Miles are rounded up. Ancillary services earn at a 0.7 multiplier plus the tier multiplier and are not included here. Only tickets starting 731, 836 or 989 earn by spend. Enter fares in yuan."
};

module.exports = {
  id: "xiamen",
  // Month the earning rules were last checked against the source.
  reviewed: "2026-11",
  code: "MF",
  color: "#0D4A8F",
  source: "https://ffp.xiamenair.com/en-US/earnScoreByFlying",
  rules
};
