/* Air New Zealand: fixed Airpoints per one-way flight by route group,
   fare, and booking class (each zone's points follow fareTypes order). */

const rules = {
  name: "Air New Zealand | Koru",
  country: "NZ",
  currency: "NZD",
  unit: "Airpoints",
  method: "zone",
  decimals: true,
  defaultFareType: "y",
  // Route picker: From, To and fare replace the long route group menu.
  // Routes are the directed pairs Air New Zealand lists for each route
  // group; the group and fare give the zone id ("tasman-1" + "-1").
  routePicker: {
    cities: {"ADL": "Adelaide", "AKL": "Auckland", "APW": "Apia", "BHE": "Blenheim", "BNE": "Brisbane", "CHC": "Christchurch", "CNS": "Cairns", "DPS": "Denpasar", "DUD": "Dunedin", "GIS": "Gisborne", "HBA": "Hobart", "HKG": "Hong Kong", "HKK": "Hokitika", "HLZ": "Hamilton", "HNL": "Honolulu", "IAH": "Houston", "ICN": "Seoul (Incheon)", "IUE": "Niue", "IVC": "Invercargill", "JFK": "New York", "KKE": "Kerikeri", "LAX": "Los Angeles", "MCY": "Sunshine Coast", "MEL": "Melbourne", "NAN": "Nadi", "NOU": "Nouméa", "NPE": "Napier", "NPL": "New Plymouth", "NRT": "Tokyo (Narita)", "NSN": "Nelson", "OOL": "Gold Coast", "ORD": "Chicago", "PEK": "Beijing", "PER": "Perth", "PMR": "Palmerston North", "PPT": "Papeete", "PVG": "Shanghai (Pudong)", "RAR": "Rarotonga", "ROT": "Rotorua", "SFO": "San Francisco", "SIN": "Singapore", "SYD": "Sydney", "TBU": "Nuku'alofa", "TIU": "Timaru", "TPE": "Taipei (Taoyuan)", "TRG": "Tauranga", "TUO": "Taupo", "WLG": "Wellington", "WRE": "Whangarei", "YVR": "Vancouver", "ZQN": "Queenstown"},
    // Fares by route family; families with one fare show no fare menu.
    fares: {
      domestic: ["Seat", "Seat+Bag", "Flexi Change", "Flexi Refund"],
      tasman: ["Seat", "Seat+Bag", "The Works or Works Flexi"],
      "pacific-islands": ["Seat", "Seat+Bag", "The Works or Works Flexi"]
    },
    routes: {
      "domestic-1": "AKL-CHC AKL-DUD AKL-WLG AKL-ZQN CHC-AKL CHC-DUD CHC-WLG CHC-ZQN DUD-AKL DUD-CHC DUD-WLG WLG-AKL WLG-CHC WLG-DUD WLG-ZQN ZQN-AKL ZQN-CHC ZQN-WLG",
      "domestic-2": "AKL-BHE AKL-GIS AKL-KKE AKL-NPE AKL-NPL AKL-NSN AKL-PMR AKL-ROT AKL-TRG AKL-TUO AKL-WRE BHE-AKL BHE-WLG CHC-HKK CHC-HLZ CHC-IVC CHC-NPE CHC-NPL CHC-NSN CHC-PMR CHC-ROT CHC-TRG GIS-AKL GIS-WLG HKK-CHC HLZ-CHC HLZ-WLG IVC-CHC IVC-WLG KKE-AKL NPE-AKL NPE-CHC NPE-WLG NPL-AKL NPL-CHC NPL-WLG NSN-AKL NSN-CHC NSN-WLG PMR-AKL PMR-CHC ROT-AKL ROT-CHC ROT-WLG TIU-WLG TRG-AKL TRG-CHC TRG-WLG TUO-AKL WLG-BHE WLG-GIS WLG-HLZ WLG-IVC WLG-NPE WLG-NPL WLG-NSN WLG-ROT WLG-TIU WLG-TRG WRE-AKL",
      "domestic-3": "AKL-IVC IVC-AKL",
      "tasman-1": "AKL-BNE AKL-HBA AKL-MCY AKL-MEL AKL-OOL AKL-SYD BNE-AKL BNE-CHC BNE-WLG CHC-BNE CHC-MEL CHC-OOL CHC-SYD HBA-AKL MCY-AKL MEL-AKL MEL-CHC MEL-WLG OOL-AKL OOL-CHC SYD-AKL SYD-CHC SYD-WLG WLG-BNE WLG-MEL WLG-SYD",
      "tasman-2": "ADL-AKL AKL-ADL AKL-CNS CNS-AKL MEL-ZQN SYD-ZQN ZQN-MEL ZQN-SYD",
      "tasman-3": "AKL-PER CHC-PER PER-AKL PER-CHC",
      "pacific-islands-1": "AKL-APW AKL-IUE AKL-NAN AKL-NOU AKL-RAR AKL-TBU APW-AKL IUE-AKL NAN-AKL NOU-AKL RAR-AKL TBU-AKL",
      "pacific-islands-2": "AKL-PPT PPT-AKL",
      "pacific-long-haul-1": "AKL-JFK JFK-AKL",
      "pacific-long-haul-2": "AKL-LAX AKL-SFO CHC-SFO LAX-AKL SFO-AKL SFO-CHC",
      "pacific-long-haul-3": "AKL-ORD ORD-AKL",
      "pacific-long-haul-4": "AKL-YVR YVR-AKL",
      "pacific-long-haul-5": "AKL-HNL HNL-AKL LAX-NAN LAX-PPT NAN-LAX PPT-LAX",
      "pacific-long-haul-6": "AKL-IAH IAH-AKL",
      "asia-1": "AKL-DPS DPS-AKL",
      "asia-2": "AKL-HKG AKL-PEK HKG-AKL PEK-AKL",
      "asia-3": "AKL-ICN ICN-AKL",
      "asia-4": "AKL-PVG PVG-AKL",
      "asia-5": "AKL-SIN CHC-SIN SIN-AKL SIN-CHC",
      "asia-6": "AKL-TPE TPE-AKL",
      "japan-1": "AKL-NRT CHC-NRT NRT-AKL NRT-CHC"
    }
  },
  fareTypeLabel: "Cabin and booking class",
  zoneLabel: "Route group and fare",
  zoneHint: "Air New Zealand pays a fixed number of Airpoints per one-way flight, set by route, fare and booking class.",
  fareTypes: [
    { id: "c", name: "Business Premier (C)" },
    { id: "d", name: "Business Premier (D)" },
    { id: "z", name: "Business Premier (Z)" },
    { id: "j", name: "Business Premier (J)" },
    { id: "u", name: "Premium Economy (U)" },
    { id: "e", name: "Premium Economy (E)" },
    { id: "o", name: "Premium Economy (O)" },
    { id: "a", name: "Premium Economy (A)" },
    { id: "y", name: "Economy (Y)" },
    { id: "b", name: "Economy (B)" },
    { id: "m", name: "Economy (M)" },
    { id: "h", name: "Economy (H)" },
    { id: "q", name: "Economy (Q)" },
    { id: "v", name: "Economy (V)" },
    { id: "w", name: "Economy (W)" },
    { id: "t", name: "Economy (T)" },
    { id: "l", name: "Economy (L)" },
    { id: "s", name: "Economy (S)" },
    { id: "g", name: "Economy (G)" },
    { id: "k", name: "Economy (K)" },
    { id: "p", name: "Economy (P)" },
    { id: "f", name: "Economy (F)" }
  ],
  zones: [
    { id: "domestic-1-0", name: "Domestic 1: AKL to CHC, DUD, WLG, ZQN, Seat fare", points: [null, null, null, null, null, null, null, null, 14, 12, 10, 9, 8, 6, 5, 4, 3, 2, 2, 1, 1, 0] },
    { id: "domestic-1-1", name: "Domestic 1: AKL to CHC, DUD, WLG, ZQN, Seat+Bag fare", points: [null, null, null, null, null, null, null, null, 14, 12, 10, 9, 8, 6, 5, 4, 3, 2, 2, 1, 1, 0] },
    { id: "domestic-1-2", name: "Domestic 1: AKL to CHC, DUD, WLG, ZQN, Flexi Change fare", points: [null, null, null, null, null, null, null, null, 16, 14, 12, 11, 10, 8, 7, 6, 5, 4, 4, 3, 3, 0] },
    { id: "domestic-1-3", name: "Domestic 1: AKL to CHC, DUD, WLG, ZQN, Flexi Refund fare", points: [null, null, null, null, null, null, null, null, 18, 16, 14, 13, 12, 10, 9, 8, 7, 6, 6, 5, 5, 0] },
    { id: "domestic-2-0", name: "Domestic 2: AKL to BHE, GIS, KKE, NPE, NPL, NSN, PMR, ROT, TRG, TUO, ..., Seat fare", points: [null, null, null, null, null, null, null, null, 12, 10, 8, 7, 6, 5, 4, 3.5, 3, 2.5, 2, 1, 1, 0] },
    { id: "domestic-2-1", name: "Domestic 2: AKL to BHE, GIS, KKE, NPE, NPL, NSN, PMR, ROT, TRG, TUO, ..., Seat+Bag fare", points: [null, null, null, null, null, null, null, null, 12, 10, 8, 7, 6, 5, 4, 3.5, 3, 2.5, 2, 1, 1, 0] },
    { id: "domestic-2-2", name: "Domestic 2: AKL to BHE, GIS, KKE, NPE, NPL, NSN, PMR, ROT, TRG, TUO, ..., Flexi Change fare", points: [null, null, null, null, null, null, null, null, 14, 12, 10, 9, 8, 7, 6, 5.5, 5, 4.5, 4, 3, 3, 0] },
    { id: "domestic-2-3", name: "Domestic 2: AKL to BHE, GIS, KKE, NPE, NPL, NSN, PMR, ROT, TRG, TUO, ..., Flexi Refund fare", points: [null, null, null, null, null, null, null, null, 16, 14, 12, 11, 10, 9, 8, 7.5, 7, 6.5, 6, 5, 5, 0] },
    { id: "domestic-3-0", name: "Domestic 3: AKL to IVC, Seat fare", points: [null, null, null, null, null, null, null, null, 23, 20, 17, 15, 13, 11, 9, 7, 5, 4, 3, 2, 1.5, 0] },
    { id: "domestic-3-1", name: "Domestic 3: AKL to IVC, Seat+Bag fare", points: [null, null, null, null, null, null, null, null, 23, 20, 17, 15, 13, 11, 9, 7, 5, 4, 3, 2, 1.5, 0] },
    { id: "domestic-3-2", name: "Domestic 3: AKL to IVC, Flexi Change fare", points: [null, null, null, null, null, null, null, null, 25, 22, 19, 17, 15, 13, 11, 9, 7, 6, 5, 4, 3.5, 0] },
    { id: "domestic-3-3", name: "Domestic 3: AKL to IVC, Flexi Refund fare", points: [null, null, null, null, null, null, null, null, 27, 24, 21, 19, 17, 15, 13, 11, 9, 8, 7, 6, 5.5, 0] },
    { id: "tasman-1-0", name: "Tasman 1: AKL to BNE, HBA, MCY, MEL, OOL, SYD, Seat fare", points: [71, 58.4, 47.9, 40.1, 38.1, 25.1, 17.1, 14.1, 15.6, 12.2, 10.8, 8.9, 7.4, 5.9, 4.9, 4.2, 2.8, 2.1, 2, 1.7, 1.5, 0] },
    { id: "tasman-1-1", name: "Tasman 1: AKL to BNE, HBA, MCY, MEL, OOL, SYD, Seat+Bag fare", points: [71, 58.4, 47.9, 40.1, 38.1, 25.1, 17.1, 14.1, 15.9, 12.3, 11.4, 9.6, 8.1, 6.6, 5.5, 4.8, 3.4, 2.6, 2.5, 2.2, 2, 0] },
    { id: "tasman-1-2", name: "Tasman 1: AKL to BNE, HBA, MCY, MEL, OOL, SYD, The Works, Works Flexi fare", points: [71, 58.4, 47.9, 40.1, 38.1, 25.1, 17.1, 14.1, 24.7, 18.9, 17.6, 14.8, 12.7, 10.4, 8.6, 7.6, 5.8, 4.6, 3.8, 3.4, 3, 0] },
    { id: "tasman-2-0", name: "Tasman 2: ADL to AKL, Seat fare", points: [110, 93, 83, 77, 61.8, 57.8, 53.8, 39.8, 18.5, 14.5, 12.5, 10.5, 8.5, 7.9, 6.9, 5, 4.9, 3, 2.8, 2.4, 2.1, 0] },
    { id: "tasman-2-1", name: "Tasman 2: ADL to AKL, Seat+Bag fare", points: [110, 93, 83, 77, 61.8, 57.8, 53.8, 39.8, 19, 15, 13, 11, 9, 8, 7, 5.9, 5, 3, 2.8, 2.6, 2.4, 0] },
    { id: "tasman-2-2", name: "Tasman 2: ADL to AKL, The Works, Works Flexi fare", points: [110, 93, 83, 77, 61.8, 57.8, 53.8, 39.8, 30, 25, 21, 18, 15, 13, 11, 10, 8, 5, 4.6, 4.3, 4, 0] },
    { id: "tasman-3-0", name: "Tasman 3: AKL to PER, Seat fare", points: [153, 127, 113, 105, 93.1, 71.3, 57.3, 51.3, 24.9, 20.9, 17.9, 14.9, 12.9, 11.9, 10.9, 9.9, 8.9, 5.9, 5.3, 4.7, 4.2, 0] },
    { id: "tasman-3-1", name: "Tasman 3: AKL to PER, Seat+Bag fare", points: [153, 127, 113, 105, 93.1, 71.3, 57.3, 51.3, 24.9, 20.9, 17.9, 14.9, 13.9, 11.9, 10.9, 9.9, 8.9, 5.9, 5.7, 5.3, 5, 0] },
    { id: "tasman-3-2", name: "Tasman 3: AKL to PER, The Works, Works Flexi fare", points: [153, 127, 113, 105, 93.1, 71.3, 57.3, 51.3, 41.4, 35.6, 29.8, 25.9, 22.2, 19.2, 16.9, 15.5, 13.4, 13.1, 12.6, 12.1, 11.6, 0] },
    { id: "pacific-islands-1-0", name: "Pacific Islands 1: AKL to APW, IUE, NAN, NOU, RAR, TBU, Seat fare", points: [70, 62, 42, 36.5, 29.5, 27.5, 25.5, 19.8, 14.6, 13.9, 12.3, 10.7, 9.5, 7.6, 6.6, 5.4, 4.5, 3.2, 6.6, 4.5, 3.2, 0] },
    { id: "pacific-islands-1-1", name: "Pacific Islands 1: AKL to APW, IUE, NAN, NOU, RAR, TBU, Seat+Bag fare", points: [70, 62, 42, 36.5, 29.5, 27.5, 25.5, 19.8, 15.6, 15.3, 13.4, 11.6, 10.3, 8.2, 7.3, 6, 5.1, 3.8, 7.3, 5.1, 3.8, 0] },
    { id: "pacific-islands-1-2", name: "Pacific Islands 1: AKL to APW, IUE, NAN, NOU, RAR, TBU, The Works, Works Flexi fare", points: [70, 62, 42, 36.5, 29.5, 27.5, 25.5, 19.8, 24.2, 22.4, 20, 17.4, 15.8, 12.7, 11.3, 9.4, 8.1, 6.1, 11.3, 8.1, 6.1, 0] },
    { id: "pacific-islands-2-0", name: "Pacific Islands 2: AKL to PPT, Seat fare", points: [125, 97, 86, 80, 65, 60, 56, 43, 23.5, 19.9, 17.9, 13.9, 12.9, 11.9, 9.9, 8.9, 7.9, 4.9, 10.9, 8.9, 6, 0] },
    { id: "pacific-islands-2-1", name: "Pacific Islands 2: AKL to PPT, Seat+Bag fare", points: [125, 97, 86, 80, 65, 60, 56, 43, 24.5, 19.9, 17.9, 14.9, 12.9, 11.9, 10.9, 8.9, 8.9, 5.9, 10.9, 8.9, 6.9, 0] },
    { id: "pacific-islands-2-2", name: "Pacific Islands 2: AKL to PPT, The Works, Works Flexi fare", points: [125, 97, 86, 80, 65, 60, 56, 43, 36.3, 30.7, 28.7, 25, 23.6, 20.6, 16.7, 14.1, 12.4, 9.2, 16.7, 12.4, 9.2, 0] },
    { id: "pacific-long-haul-1-0", name: "Pacific long haul 1: AKL to JFK", points: [526.9, 493.7, 411.7, 331.6, 213.3, 186.7, 149.1, 130, 110.7, 107.1, 89.3, 78.2, 59.3, 58.3, 52, 50.2, 48, 38.7, 20.5, 18.5, 15, 0] },
    { id: "pacific-long-haul-2-0", name: "Pacific long haul 2: AKL to LAX, SFO", points: [457.4, 421.6, 370, 291.7, 169.2, 147.2, 135, 123.5, 83, 80.7, 72.8, 62.6, 56.9, 52.8, 42.5, 38.8, 37, 31.6, 17.6, 14.5, 13, 0] },
    { id: "pacific-long-haul-3-0", name: "Pacific long haul 3: AKL to ORD", points: [506.9, 473.7, 391.7, 330, 184.1, 172, 140, 125, 101.7, 98.1, 80.3, 69.2, 50.3, 49.3, 43, 41.2, 39, 37, 18.7, 16.5, 12, null] },
    { id: "pacific-long-haul-4-0", name: "Pacific long haul 4: AKL to YVR", points: [492.9, 428.5, 321.1, 231.5, 190.3, 152.8, 115.6, 93.3, 81.1, 75, 71.4, 62.7, 48.8, 47.3, 41.9, 40.9, 38, 33.3, 16.2, 16, 15, 0] },
    { id: "pacific-long-haul-5-0", name: "Pacific long haul 5: AKL to HNL", points: [343, 294, 248, 206, 140, 109, 77, 62, 58, 46, 39, 32, 27, 23, 20, 18, 16, 15, 13, 12, 12, 0] },
    { id: "pacific-long-haul-6-0", name: "Pacific long haul 6: AKL to IAH", points: [458, 425.8, 370.7, 290.5, 172.6, 158.9, 140, 129.8, 85.2, 82.3, 74.2, 64.6, 57.9, 51.3, 44.1, 42, 40, 32.7, 18.7, 16.5, 12, 0] },
    { id: "asia-1-0", name: "Asia 1: AKL to DPS", points: [331, 189, 168, 133, 147, 93, 82, 72, 62, 45, 39, 33, 30, 27, 24, 22, 21, 19, 18, 18, 18, 0] },
    { id: "asia-2-0", name: "Asia 2: AKL to HKG, PEK", points: [263, 239, 217, 196, 137, 122, 110, 90, 72, 62, 53, 48, 46, 44, 43, 42, 36, 34, 19, 15, 12, 0] },
    { id: "asia-3-0", name: "Asia 3: AKL to ICN", points: [264, 224, 208, 177, 140, 125, 114, 83, 77, 66, 59, 54, 48, 44, 41, 40, 38, 34, 20, 18, 15, 0] },
    { id: "asia-4-0", name: "Asia 4: AKL to PVG", points: [295, 237, 215, 194, 135, 120, 108, 88, 71, 61, 58, 53, 45, 43, 42, 40, 35, 33, 18.5, 14.5, 10, 0] },
    { id: "asia-5-0", name: "Asia 5: AKL to SIN", points: [240, 216, 198, 186, 128, 114, 103, 82, 65, 56, 51, 48, 44, 41, 39, 37, 34, 32, 29, 24.5, 19.5, 0] },
    { id: "asia-6-0", name: "Asia 6: AKL to TPE", points: [215, 187, 166, 152, 144, 126, 109, 66, 73, 63, 58, 53, 48, 43, 38.5, 36.5, 33.5, 31.5, 16.8, 15.8, 14, 0] },
    { id: "japan-1-0", name: "Japan 1: AKL to NRT", points: [316, 269.8, 241.4, 219, 135, 122, 113.9, 83, 75.6, 64.4, 57.6, 53.1, 46, 45, 40, 38, 35, 32, 17.9, 14.9, 11.9, 0] }
  ],
  statuses: [
    { id: "bronze", name: "Koru Bronze", bonus: 0 },
    { id: "silver", name: "Koru Silver", bonus: 0 },
    { id: "gold", name: "Koru Gold", bonus: 0 },
    { id: "platinum", name: "Koru Platinum", bonus: 0 },
    { id: "black", name: "Koru Black", bonus: 0 }
  ],
  // New Zealand cards: Airpoints Dollars per NZ dollar charged. None has
  // a higher rate for Air New Zealand purchases. Rates from Air New
  // Zealand's card comparison (November 2026):
  // https://www.airnewzealand.co.nz/airpoints-direct-earn-credit-card-comparison-table
  // Westpac says its rate can depend on monthly spend; the table rate is used.
  cards: [
    { id: "amex-airpoints", name: "American Express Airpoints Card", rate: 1 / 100, per: 100, bank: "American Express (New Zealand)" },
    { id: "amex-airpoints-plat", name: "American Express Airpoints Platinum Card", rate: 1 / 70, per: 70, bank: "American Express (New Zealand)" },
    { id: "anz-airpoints-plat", name: "ANZ Airpoints Visa Platinum", rate: 1 / 110, per: 110, bank: "ANZ (New Zealand)" },
    { id: "anz-airpoints", name: "ANZ Airpoints Visa", rate: 1 / 170, per: 170, bank: "ANZ (New Zealand)" },
    { id: "anz-business-airpoints", name: "ANZ Visa Business Airpoints", rate: 1 / 85, per: 85, bank: "ANZ (New Zealand)" },
    { id: "westpac-koru-world", name: "Westpac Koru World Mastercard", rate: 1 / 95, per: 95, bank: "Westpac (New Zealand)" },
    { id: "westpac-koru-platinum", name: "Westpac Koru Platinum Mastercard", rate: 1 / 110, per: 110, bank: "Westpac (New Zealand)" },
    { id: "westpac-koru", name: "Westpac Koru Mastercard", rate: 1 / 150, per: 150, bank: "Westpac (New Zealand)" },
    { id: "westpac-koru-business", name: "Westpac Koru Business Mastercard", rate: 1 / 85, per: 85, bank: "Westpac (New Zealand)" }
  ],
  note: "Koru pays a fixed number of Airpoints per one-way flight, set by route group, fare, and booking class; one Airpoint is worth NZ$1. Tiers earn bonus Status Points, not extra Airpoints. Domestic flights are Economy only. Airpoints are not earned on Grabaseat Greenlight fares (booking class F is used for Grabaseat Greenlight fares available through grabaseat.co.nz) or full redemption tickets. Booking classes N, I, R, and X earn nothing. Airpoints credit cards earn 1 Airpoints Dollar per NZ$70 (American Express Airpoints Platinum), NZ$85 (ANZ Visa Business Airpoints, Westpac Koru Business Mastercard), NZ$95 (Westpac Koru World Mastercard), NZ$100 (American Express Airpoints Card), NZ$110 (ANZ Airpoints Visa Platinum, Westpac Koru Platinum Mastercard), NZ$150 (Westpac Koru Mastercard) or NZ$170 (ANZ Airpoints Visa) charged."
};

module.exports = {
  id: "airnz",
  // Month the earning rules were last checked against the source.
  reviewed: "2026-11",
  code: "NZ",
  color: "#111111",
  // Route tables from cwsi.net, spot-checked against Air New Zealand's own
  // Koru earnings calculator (November 2026).
  source: "https://www.airnewzealand.com/en-nz/koru/earn-airpoints/airpoints-calculator",
  rules
};
