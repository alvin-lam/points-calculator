/* The airport nearest each airline's headquarters, among the airports it
   serves. The airport boxes use it as the "From" example ("From (ORD or
   city)"), with PHL as the "To" example. Keys match AIRLINE_CODES: a
   program id, or "program:airline" for group programs. Where the head
   office is not at a main airport, the airline's largest hub is used
   instead: Lufthansa FRA, SWISS ZRH, Virgin Atlantic LHR, JetBlue JFK,
   Icelandair KEF, Korean Air ICN. Southwest uses DAL, its home airport. */
module.exports = {
  // North America
  alaska: "SEA", allegiant: "LAS", "american:aa": "DFW", breeze: "SLC",
  delta: "ATL", frontier: "DEN", hawaiian: "HNL", jetblue: "JFK",
  southwest: "DAL", united: "ORD",
  aircanada: "YUL", porter: "YTZ", transat: "YUL", westjet: "YYC",
  aeromexico: "MEX", viva: "MTY", volaris: "MEX",
  // Central and South America
  copa: "PTY", lifemiles: "BOG", latam: "SCL", gol: "CGH", azul: "VCP", aerolineas: "AEP",
  // Europe
  ram: "CMN", omanair: "MCT", rj: "AMM",
  "condor:trueblue": "FRA", "condor:atmos": "FRA",
  aegean: "ATH", airbaltic: "RIX", aireuropa: "PMI", finnair: "HEL", icelandair: "KEF",
  norwegian: "OSL", sas: "ARN", tap: "LIS", turkish: "IST", virgin: "LHR",
  "flyingblue:af": "CDG", "flyingblue:kl": "AMS", "flyingblue:transavia": "AMS",
  "iag:ba": "LHR", "iag:ei": "DUB", "iag:ib": "MAD", "iag:level": "BCN", "iag:vy": "BCN",
  "milesandmore:lh": "FRA", "milesandmore:ew": "CGN", "milesandmore:de": "FRA",
  "milesandmore:os": "VIE", "milesandmore:lx": "ZRH", "milesandmore:sn": "BRU",
  "milesandmore:wk": "ZRH", "milesandmore:en": "VRN", "milesandmore:az": "FCO",
  "milesandmore:lo": "WAW", "milesandmore:ou": "ZAG",
  // Middle East
  elal: "TLV", saa: "JNB", emirates: "DXB", etihad: "AUH", qatar: "DOH",
  // Asia
  airindia: "DEL", indigo: "DEL", ana: "HND", cathay: "HKG", chinaairlines: "TPE",
  chinaeastern: "SHA", chinasouthern: "CAN", enrich: "KUL", eva: "TPE",
  hainan: "HAK", hkexpress: "HKG", hongkongairlines: "HKG", jal: "HND",
  jetstarjapan: "NRT", korean: "ICN", krisflyer: "SIN", "phoenix:ca": "PEK", "phoenix:zh": "SZX", vietnam: "HAN", vietjet: "HAN", pal: "MNL", srilankan: "CMB", airtahitinui: "PPT",
  scoot: "SIN", starlux: "TPE", thai: "BKK", xiamen: "XMN",
  // Oceania
  airnz: "AKL", "american:fj": "NAN", jetstar: "MEL", qantas: "SYD", virginaustralia: "BNE"
};
