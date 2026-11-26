/* Countries shown as separators in the program menu. Programs and
   airlines without a country field belong to "US". */
// codes: ISO 3166 two- and three-letter codes that find the group in the
// program search (the United Kingdom also answers to "UK"; Scandinavia to
// Denmark, Sweden and Norway, since SAS is all three).
// Pinned groups stay at the top in this order; the rest sort by name.
module.exports = [
  { id: "US", label: "United States \u{1F1FA}\u{1F1F8}", pinned: true, codes: ["US", "USA"] },
  { id: "CA", label: "Canada \u{1F1E8}\u{1F1E6}", pinned: true, codes: ["CA", "CAN"] },
  { id: "MX", label: "Mexico \u{1F1F2}\u{1F1FD}", pinned: true, codes: ["MX", "MEX"] },
  { id: "AT", label: "Austria \u{1F1E6}\u{1F1F9}", codes: ["AT", "AUT"] },
  { id: "BE", label: "Belgium \u{1F1E7}\u{1F1EA}", codes: ["BE", "BEL"] },
  { id: "BR", label: "Brazil \u{1F1E7}\u{1F1F7}", codes: ["BR", "BRA"] },
  { id: "FJ", label: "Fiji \u{1F1EB}\u{1F1EF}", codes: ["FJ", "FJI"] },
  { id: "SCAN", label: "Scandinavia \u{1F1E9}\u{1F1F0} \u{1F1F3}\u{1F1F4} \u{1F1F8}\u{1F1EA}", codes: ["DK", "DNK", "SE", "SWE", "NO", "NOR"] },
  { id: "FR", label: "France \u{1F1EB}\u{1F1F7}", codes: ["FR", "FRA"] },
  { id: "DE", label: "Germany \u{1F1E9}\u{1F1EA}", codes: ["DE", "DEU"] },
  { id: "GR", label: "Greece \u{1F1EC}\u{1F1F7}", codes: ["GR", "GRC"] },
  { id: "IE", label: "Ireland \u{1F1EE}\u{1F1EA}", codes: ["IE", "IRL"] },
  { id: "IT", label: "Italy \u{1F1EE}\u{1F1F9}", codes: ["IT", "ITA"] },
  { id: "NL", label: "Netherlands \u{1F1F3}\u{1F1F1}", codes: ["NL", "NLD"] },
  { id: "ES", label: "Spain \u{1F1EA}\u{1F1F8}", codes: ["ES", "ESP"] },
  { id: "CH", label: "Switzerland \u{1F1E8}\u{1F1ED}", codes: ["CH", "CHE"] },
  { id: "PT", label: "Portugal \u{1F1F5}\u{1F1F9}", codes: ["PT", "PRT"] },
  { id: "UK", label: "United Kingdom \u{1F1EC}\u{1F1E7}", codes: ["GB", "GBR", "UK"] },
  { id: "AU", label: "Australia \u{1F1E6}\u{1F1FA}", codes: ["AU", "AUS"] },
  { id: "CO", label: "Colombia \u{1F1E8}\u{1F1F4}", codes: ["CO", "COL"] },
  { id: "PA", label: "Panama \u{1F1F5}\u{1F1E6}", codes: ["PA", "PAN"] },
  { id: "NO", label: "Norway \u{1F1F3}\u{1F1F4}", codes: ["NO", "NOR"] },
  { id: "IS", label: "Iceland \u{1F1EE}\u{1F1F8}", codes: ["IS", "ISL"] },
  { id: "FI", label: "Finland \u{1F1EB}\u{1F1EE}", codes: ["FI", "FIN"] },
  { id: "QA", label: "Qatar \u{1F1F6}\u{1F1E6}", codes: ["QA", "QAT"] },
  { id: "JP", label: "Japan \u{1F1EF}\u{1F1F5}", codes: ["JP", "JPN"] },
  { id: "HK", label: "Hong Kong \u{1F1ED}\u{1F1F0}", codes: ["HK", "HKG"] },
  { id: "SG", label: "Singapore \u{1F1F8}\u{1F1EC}", codes: ["SG", "SGP"] },
  { id: "TW", label: "Taiwan \u{1F1F9}\u{1F1FC}", codes: ["TW", "TWN"] },
  { id: "AE", label: "United Arab Emirates \u{1F1E6}\u{1F1EA}", codes: ["AE", "ARE"] },
  { id: "NZ", label: "New Zealand \u{1F1F3}\u{1F1FF}", codes: ["NZ", "NZL"] },
  { id: "TR", label: "Türkiye \u{1F1F9}\u{1F1F7}", codes: ["TR", "TUR"] },
  { id: "KR", label: "South Korea \u{1F1F0}\u{1F1F7}", codes: ["KR", "KOR"] },
  { id: "CL", label: "Chile \u{1F1E8}\u{1F1F1}", codes: ["CL", "CHL"] },
  { id: "CN", label: "China \u{1F1E8}\u{1F1F3}", codes: ["CN", "CHN"] },
  { id: "PL", label: "Poland \u{1F1F5}\u{1F1F1}", codes: ["PL", "POL"] },
  { id: "LV", label: "Latvia \u{1F1F1}\u{1F1FB}", codes: ["LV", "LVA"] },
  { id: "HR", label: "Croatia \u{1F1ED}\u{1F1F7}", codes: ["HR", "HRV"] },
  { id: "IN", label: "India \u{1F1EE}\u{1F1F3}", codes: ["IN", "IND"] },
  { id: "TH", label: "Thailand \u{1F1F9}\u{1F1ED}", codes: ["TH", "THA"] },
  { id: "MY", label: "Malaysia \u{1F1F2}\u{1F1FE}", codes: ["MY", "MYS"] }
];
