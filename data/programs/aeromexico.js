const rules = {
  name: "Aeroméxico | Aeroméxico Rewards",
  country: "MX",
  currency: "USD",
  unit: "points",
  method: "spend",
  statuses: [
    { id: "member", name: "Aeroméxico Rewards Member", rate: 8 },
    { id: "silver", name: "Silver", rate: 8 },
    { id: "gold", name: "Gold", rate: 8 },
    { id: "platinum", name: "Platinum", rate: 8 },
    { id: "titanium", name: "Titanium", rate: 16 }
  ],
  note: "Aeroméxico Rewards earns 8 points per US dollar of base fare, excluding taxes. Enter the fare in US dollars. Titanium earns 8 more points per dollar. Bonuses for Silver, Gold, and Platinum were not confirmed, so those tiers are shown at the base rate."
};

module.exports = {
  id: "aeromexico",
  // Month the earning rules were last checked against the source.
  reviewed: "2026-11",
  code: "AM",
  color: "#0B2343",
  source: "https://www.aeromexicorewards.com/",
  rules
};
