/* PhoenixMiles: Air China. Kilometres flown times the
   class percentage, with a minimum per flight in km; the first value is for
   flights within mainland China, the second for international ones.
   Air Macau (NX): PhoenixMiles partner page "澳门航空" (Air China partner
   page, categoryId=310, airlineId=231), accrual table valid from 1 April
   2026. Air Macau's own page gives the formula and a worked example
   (Macau to Beijing in Y: 2,006 km x 110% = 2,206 km) and lists its
   co-brand cards: https://www.airmacau.com.mo/index.mo.html#/mileAccumulate-twmo,
   #/ffpMileageMO, #/ffpMileage-zhMO (BOC) and #/ffpMileage-ghMO (ICBC). */

const rules = {
  name: "Air China Group | PhoenixMiles",
  programName: "PhoenixMiles",
  country: "CN",
  unit: "PhoenixMiles",
  method: "distance",
  distanceFactor: 1.609344,
  defaultFareType: "m",
  zoneLabel: "Route type",
  zoneHint: "PhoenixMiles counts kilometres; enter the distance in miles and the calculator converts it.",
  zones: [
    { id: "mainland", name: "Within mainland China" },
    { id: "intl", name: "International and regional" }
  ],
  airlines: [
    { id: "ca", name: "Air China" },
    // Shenzhen Airlines: PhoenixMiles partner page "深圳航空公司", accrual
    // table effective 29 October 2023. Same rates as Air China, except that
    // Shenzhen has no First class and A is an Economy class at 25%.
    { id: "zh", name: "Shenzhen Airlines", country: "CN",
      program: {
        fareTypes: [
          { id: "j", name: "Business (J)", earn: [{ share: 3, min: 800 }, { share: 2.5, min: 800 }] },
          { id: "c", name: "Business (C)", earn: [{ share: 2, min: 800 }, { share: 2, min: 800 }] },
          { id: "d", name: "Business (D)", earn: [{ share: 1.5, min: 800 }, { share: 1.5, min: 800 }] },
          { id: "z", name: "Business (Z)", earn: [{ share: 1.25, min: 800 }, { share: 1.25, min: 800 }] },
          { id: "r", name: "Business (R)", earn: [{ share: 1.1, min: 800 }, { share: 1.25, min: 800 }] },
          { id: "g", name: "Premium Economy (G)", earn: [{ share: 1.1, min: 500 }, { share: 1.1, min: 500 }] },
          { id: "e", name: "Premium Economy (E)", earn: [{ share: 0.9, min: 500 }, { share: 0.9, min: 500 }] },
          { id: "y", name: "Economy (Y)", earn: [{ share: 1.1, min: 500 }, { share: 1.1, min: 500 }] },
          { id: "b", name: "Economy (B)", earn: [{ share: 1, min: 500 }, { share: 1.1, min: 500 }] },
          { id: "m", name: "Economy (M)", earn: [{ share: 1, min: 500 }, { share: 1, min: 500 }] },
          { id: "u", name: "Economy (U)", earn: [{ share: 1, min: 500 }, { share: 0.75, min: 500 }] },
          { id: "hqv", name: "Economy (H, Q, V)", earn: [{ share: 0.75, min: 500 }, { share: 0.75, min: 500 }] },
          { id: "wst", name: "Economy (W, S, T)", earn: [{ share: 0.5, min: 500 }, { share: 0.5, min: 500 }] },
          { id: "lpak", name: "Economy (L, P, A, K)", earn: [{ share: 0.25, min: 500 }, { share: 0.25, min: 500 }] }
        ],
        note: "PhoenixMiles earns a share of the distance in kilometres by booking class on Shenzhen Airlines flights, with a minimum per flight (500 km in Economy, 800 km in Business), from the PhoenixMiles Shenzhen Airlines table effective 29 October 2023. Classes I, X and N earn nothing. The Silver, Gold and Platinum bonuses shown (25%, 30% and 50%) are Air China's and are not confirmed for Shenzhen Airlines."
      } },
    // Air Macau: PhoenixMiles table valid from 1 April 2026. One column for
    // all flights (international and regional), so no route type menu.
    // No First class. Classes R, A, K, O, I and X earn nothing.
    { id: "nx", name: "Air Macau", country: "MO",
      program: {
        zones: null,
        fareTypes: [
          { id: "j", name: "Business (J)", earn: [{ share: 2.5, min: 800 }] },
          { id: "c", name: "Business (C)", earn: [{ share: 2, min: 800 }] },
          { id: "d", name: "Business (D)", earn: [{ share: 1.5, min: 800 }] },
          { id: "z", name: "Business (Z)", earn: [{ share: 1.25, min: 800 }] },
          { id: "g", name: "Joyful Economy (G)", earn: [{ share: 1.1, min: 500 }] },
          { id: "e", name: "Joyful Economy (E)", earn: [{ share: 0.9, min: 500 }] },
          { id: "yb", name: "Economy (Y, B)", earn: [{ share: 1.1, min: 500 }] },
          { id: "m", name: "Economy (M)", earn: [{ share: 1, min: 500 }] },
          { id: "uhqv", name: "Economy (U, H, Q, V)", earn: [{ share: 0.75, min: 500 }] },
          { id: "wst", name: "Economy (W, S, T)", earn: [{ share: 0.5, min: 500 }] },
          { id: "lpn", name: "Economy (L, P, N)", earn: [{ share: 0.25, min: 500 }] }
        ],
        // PhoenixMiles does not say whether its status bonus applies to
        // Air Macau flights, so only the base level is offered.
        statuses: [
          { id: "member", name: "PhoenixMiles Member", multiplier: 1 }
        ],
        // Co-brand cards listed on Air Macau's site. Both earn on all card
        // spending, Air Macau tickets included, in patacas.
        cards: [
          { id: "boc-air", name: "BOC Air Card (UnionPay or Visa)", rate: 1 / 10, per: 10, currency: "MOP", bank: "Bank of China (Macau)" },
          { id: "icbc-nx-plat", name: "ICBC Air Macau Platinum Card (Visa or UnionPay)", rate: 1 / 9, per: 9, currency: "MOP", bank: "ICBC (Macau)" },
          { id: "icbc-nx-gold", name: "ICBC Air Macau Gold Card (Visa or UnionPay)", rate: 1 / 10, per: 10, currency: "MOP", bank: "ICBC (Macau)" }
        ],
        note: "PhoenixMiles earns a share of the distance in kilometres by booking class on flights operated by Air Macau, with a minimum per flight (500 km in Economy and Joyful Economy, 800 km in Business), from the PhoenixMiles Air Macau table valid from 1 April 2026. Air Macau has no First class. Classes R, A, K, O, I and X earn nothing. PhoenixMiles does not state whether its Silver, Gold and Platinum bonuses apply to Air Macau flights, so this estimate shows member earning only. The Bank of China (Macau) Air Card earns 1 km per MOP 10 spent. The ICBC (Macau) Air Macau cards earn 1 km per MOP 9 on Platinum and 1 km per MOP 10 on Gold. Card kilometres count all card spending, not only Air Macau tickets."
      } }
  ],
  fareTypes: [
    { id: "f", name: "First (F)", earn: [{ share: 3, min: 1000 }, { share: 3, min: 1000 }] },
    { id: "a", name: "First (A)", earn: [{ share: 2, min: 1000 }, { share: 2.5, min: 1000 }] },
    { id: "j", name: "Business (J)", earn: [{ share: 3, min: 800 }, { share: 2.5, min: 800 }] },
    { id: "c", name: "Business (C)", earn: [{ share: 2, min: 800 }, { share: 2, min: 800 }] },
    { id: "d", name: "Business (D)", earn: [{ share: 1.5, min: 800 }, { share: 1.5, min: 800 }] },
    { id: "z", name: "Business (Z)", earn: [{ share: 1.25, min: 800 }, { share: 1.25, min: 800 }] },
    { id: "r", name: "Business (R)", earn: [{ share: 1.1, min: 800 }, { share: 1.25, min: 800 }] },
    { id: "g", name: "Premium Economy (G)", earn: [{ share: 1.1, min: 500 }, { share: 1.1, min: 500 }] },
    { id: "e", name: "Premium Economy (E)", earn: [{ share: 0.9, min: 500 }, { share: 0.9, min: 500 }] },
    { id: "y", name: "Economy (Y)", earn: [{ share: 1.1, min: 500 }, { share: 1.1, min: 500 }] },
    { id: "b", name: "Economy (B)", earn: [{ share: 1, min: 500 }, { share: 1.1, min: 500 }] },
    { id: "m", name: "Economy (M)", earn: [{ share: 1, min: 500 }, { share: 1, min: 500 }] },
    { id: "u", name: "Economy (U)", earn: [{ share: 1, min: 500 }, { share: 0.75, min: 500 }] },
    { id: "hqv", name: "Economy (H, Q, V)", earn: [{ share: 0.75, min: 500 }, { share: 0.75, min: 500 }] },
    { id: "wst", name: "Economy (W, S, T)", earn: [{ share: 0.5, min: 500 }, { share: 0.5, min: 500 }] },
    { id: "lkp", name: "Economy (L, K, P)", earn: [{ share: 0.25, min: 500 }, { share: 0.25, min: 500 }] }
  ],
  statuses: [
    { id: "member", name: "PhoenixMiles Member", multiplier: 1 },
    { id: "silver", name: "Silver", multiplier: 1.25 },
    { id: "gold", name: "Gold", multiplier: 1.3 },
    { id: "platinum", name: "Platinum", multiplier: 1.5 }
  ],
  note: "PhoenixMiles earns a share of the distance in kilometres by booking class, with a minimum per flight (500 km in Economy, 800 km in Business, 1,000 km in First). Silver, Gold, and Platinum earn 25%, 30%, and 50% extra; the airline does not say what the bonus is taken of, so this estimate applies it to the class miles."
};

module.exports = {
  id: "phoenix",
  // Month the earning rules were last checked against the source.
  reviewed: "2026-11",
  source: "https://cwsi.net/fares/air-china/",
  // Two-letter code, brand color, and source page for each airline.
  airlines: {
    ca: { code: "CA", color: "#E30613" },
    zh: { code: "ZH", color: "#CC0327", source: "https://ffp.airchina.com.cn/phxplan/#/airlinepartners/airpartnerdetails?categoryId=310&airlineId=229" },
    nx: { code: "NX", color: "#312567", source: "https://ffp.airchina.com.cn/phxplan/#/airlinepartners/airpartnerdetails?categoryId=310&airlineId=231" }
  },
  // Published examples. The browser tests check each one.
  examples: [
    // Air Macau: 1,000 miles is 1,609.344 km; Y at 110% is 1,770 km.
    { name: "Air Macau Economy (Y)", airline: "nx", input: { fare: "yb", status: "member", fields: { distance: 1000 } }, expect: 1770 },
    // 1,000 miles in J at 250% is 4,023 km.
    { name: "Air Macau Business (J)", airline: "nx", input: { fare: "j", status: "member", fields: { distance: 1000 } }, expect: 4023 },
    // 300 miles (483 km) in L is 121 km, raised to the 500 km minimum.
    { name: "Air Macau Economy (L) minimum", airline: "nx", input: { fare: "lpn", status: "member", fields: { distance: 300 } }, expect: 500 }
  ],
  rules
};
