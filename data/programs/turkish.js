const rules = {
  name: "Turkish Airlines | Miles&Smiles",
  country: "TR",
  unit: "Miles",
  method: "distance",
  defaultFareType: "y-mid",
  zoneLabel: "Route type",
  zoneHint: "International flights earn a share of the distance; flights within Türkiye earn a fixed amount.",
  zones: [
    { id: "intl", name: "International" },
    { id: "domestic", name: "Within Türkiye", fixed: true }
  ],
  fareTypes: [
    { id: "j-high", name: "Business (C, D)", earn: [{ share: 1.5, min: 1500 }, { fixed: 1250 }], eliteEarn: [{ share: 1.75, min: 1750 }, { fixed: 1250 }] },
    { id: "j", name: "Business (K, J, Z)", earn: [{ share: 1.35, min: 1350 }, { fixed: 1000 }], eliteEarn: [{ share: 1.6, min: 1600 }, { fixed: 1000 }] },
    { id: "y-high", name: "Economy (Y, B)", earn: [{ share: 1.25, min: 1250 }, { fixed: 600 }] },
    { id: "y-mid", name: "Economy (M, H, S, E, Q, A, O)", earn: [{ share: 1, min: 1000 }, { fixed: 600 }] },
    { id: "y-low", name: "Economy (T, L, V, G)", earn: [{ share: 0.5, min: 500 }, { fixed: 300 }] },
    { id: "y-lowest", name: "Economy (W, P, F, U)", earn: [{ share: 0.25, min: 250 }, { fixed: 150 }] }
  ],
  statuses: [
    { id: "classic", name: "Classic" },
    { id: "classic-plus", name: "Classic Plus", elite: true },
    { id: "elite", name: "Elite", elite: true },
    { id: "elite-plus", name: "Elite Plus", elite: true }
  ],
  // US co-branded card (First Electronic Bank, serviced by Imprint): extra
  // miles per US dollar charged for Turkish Airlines purchases.
  cards: [
    { id: "imprint-premier", name: "Miles&Smiles Premier Visa Signature", rate: 3, currency: "USD", bank: "First Electronic Bank (US)" },
    // Turkish card (Garanti BBVA): 1 mile per TRY 7 on Turkish Airlines
    // tickets bought at THY sales offices in Türkiye, the THY app, the 0850
    // call center or turkishairlines.com. From
    // https://www.garantibbva.com.tr/kartlar/miles-and-smiles
    { id: "garanti-ms", name: "Miles&Smiles Garanti BBVA Credit Card", rate: 1 / 7, per: 7, currency: "TRY", bank: "Garanti BBVA (Türkiye)" }
  ],
  note: "Miles&Smiles earns a share of the distance by booking class on international flights, with a minimum per flight, and a fixed amount within Türkiye. Classic Plus, Elite, and Elite Plus earn more in Business. The US Miles&Smiles Premier Visa Signature earns 3 more miles per dollar on Turkish Airlines purchases. In Türkiye, the Miles&Smiles Garanti BBVA credit card earns 1 mile per 7 lira on Turkish Airlines tickets bought from Turkish Airlines' own website, app, call center or sales offices."
};

module.exports = {
  id: "turkish",
  // Month the earning rules were last checked against the source.
  reviewed: "2026-11",
  code: "TK",
  color: "#C70A0C",
  source: "https://cwsi.net/fares/turkish-airlines/",
  rules
};
