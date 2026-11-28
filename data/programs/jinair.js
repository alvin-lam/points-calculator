/* Jin Air (LJ): Nabi Points on Jin Air flights, from Jin Air's Nabi Points
   page (jinair.com, "Accrual Information"), supplied by the site owner as a
   screenshot in November 2026:
   - Fixed points per one-way flight by route: all domestic routes 10;
     international routes 10 to 40 by route, listed from Seoul Incheon,
     Busan, Daegu and Jeju.
   - Share by fare: JINIBIZ 150% (domestic only); JINI 100%; FLEX 80% on
     domestic routes (100% on Gimpo, Busan, Cheongju and Gwangju to Jeju)
     and 100% on international routes; SUPERLOW 0% on domestic routes
     (100% on those Jeju routes) and 80% on international routes.
   - Event prize, travel agency discount and group-sale, bonus, charter and
     infant tickets, and special fares (Jin Market) earn nothing.
   Jin Air takes over Air Busan and Air Seoul on 17 March 2027. */
const rules = {
  name: "Jin Air | Nabi Points",
  programName: "Nabi Points",
  country: "KR",
  currency: "KRW",
  unit: "Nabi Points",
  method: "zone",
  zoneLabel: "Route",
  zoneHint: "Jin Air sets fixed points for each one-way route. Domestic routes earn 10 points before the fare share.",
  zoneAfterFare: true,
  defaultFareType: "jini",
  fareTypeLabel: "Fare",
  // The zones' points follow this order.
  fareTypes: [
    { id: "jinibiz", name: "JINIBIZ (domestic only)" },
    { id: "jini", name: "JINI" },
    { id: "flex", name: "FLEX" },
    { id: "superlow", name: "SUPERLOW" }
  ],
  unavailableText: " is not sold on this route.",
  defaultZone: "icn-nrt",
  zones: [
    { id: "dom-jeju", name: "Domestic: Gimpo, Busan, Cheongju or Gwangju to or from Jeju", points: [15, 10, 10, 10] },
    { id: "dom-other", name: "Domestic: other routes", points: [15, 10, 8, 0] },
    { id: "icn-kix", name: "Seoul Incheon - Osaka Kansai (KIX)", points: [null, 15, 15, 12] },
    { id: "icn-ukb", name: "Seoul Incheon - Kobe (UKB)", points: [null, 15, 15, 12] },
    { id: "icn-fuk", name: "Seoul Incheon - Fukuoka (FUK)", points: [null, 15, 15, 12] },
    { id: "icn-ngo", name: "Seoul Incheon - Nagoya (NGO)", points: [null, 15, 15, 12] },
    { id: "icn-kkj", name: "Seoul Incheon - Kitakyushu (KKJ)", points: [null, 15, 15, 12] },
    { id: "icn-tao", name: "Seoul Incheon - Qingdao (TAO)", points: [null, 15, 15, 12] },
    { id: "icn-ynt", name: "Seoul Incheon - Yantai (YNT)", points: [null, 15, 15, 12] },
    { id: "icn-tak", name: "Seoul Incheon - Takamatsu (TAK)", points: [null, 15, 15, 12] },
    { id: "icn-nrt", name: "Seoul Incheon - Tokyo Narita (NRT)", points: [null, 20, 20, 16] },
    { id: "icn-shi", name: "Seoul Incheon - Miyakojima Shimojishima (SHI)", points: [null, 20, 20, 16] },
    { id: "icn-isg", name: "Seoul Incheon - Ishigakijima (ISG)", points: [null, 20, 20, 16] },
    { id: "icn-cts", name: "Seoul Incheon - Sapporo (CTS)", points: [null, 20, 20, 16] },
    { id: "icn-oka", name: "Seoul Incheon - Okinawa (OKA)", points: [null, 20, 20, 16] },
    { id: "icn-tpe", name: "Seoul Incheon - Taipei Taoyuan (TPE)", points: [null, 20, 20, 16] },
    { id: "icn-rmq", name: "Seoul Incheon - Taichung (RMQ)", points: [null, 20, 20, 16] },
    { id: "icn-yih", name: "Seoul Incheon - Yichang (YIH)", points: [null, 20, 20, 16] },
    { id: "icn-kwl", name: "Seoul Incheon - Guilin (KWL)", points: [null, 25, 25, 20] },
    { id: "icn-bkk", name: "Seoul Incheon - Bangkok (BKK)", points: [null, 30, 30, 24] },
    { id: "icn-hkt", name: "Seoul Incheon - Phuket (HKT)", points: [null, 30, 30, 24] },
    { id: "icn-cnx", name: "Seoul Incheon - Chiang Mai (CNX)", points: [null, 30, 30, 24] },
    { id: "icn-ceb", name: "Seoul Incheon - Cebu (CEB)", points: [null, 30, 30, 24] },
    { id: "icn-crk", name: "Seoul Incheon - Clark (CRK)", points: [null, 30, 30, 24] },
    { id: "icn-dad", name: "Seoul Incheon - Da Nang (DAD)", points: [null, 30, 30, 24] },
    { id: "icn-cxr", name: "Seoul Incheon - Nha Trang (CXR)", points: [null, 30, 30, 24] },
    { id: "icn-pqc", name: "Seoul Incheon - Phu Quoc (PQC)", points: [null, 30, 30, 24] },
    { id: "icn-bki", name: "Seoul Incheon - Kota Kinabalu (BKI)", points: [null, 30, 30, 24] },
    { id: "icn-tag", name: "Seoul Incheon - Bohol (TAG)", points: [null, 30, 30, 24] },
    { id: "icn-gum", name: "Seoul Incheon - Guam (GUM)", points: [null, 40, 40, 32] },
    { id: "pus-nrt", name: "Busan - Tokyo Narita (NRT)", points: [null, 20, 20, 16] },
    { id: "pus-kix", name: "Busan - Osaka Kansai (KIX)", points: [null, 15, 15, 12] },
    { id: "pus-fuk", name: "Busan - Fukuoka (FUK)", points: [null, 10, 10, 8] },
    { id: "pus-ngo", name: "Busan - Nagoya (NGO)", points: [null, 15, 15, 12] },
    { id: "pus-cts", name: "Busan - Sapporo (CTS)", points: [null, 20, 20, 16] },
    { id: "pus-oka", name: "Busan - Okinawa (OKA)", points: [null, 20, 20, 16] },
    { id: "pus-shi", name: "Busan - Miyakojima Shimojishima (SHI)", points: [null, 20, 20, 16] },
    { id: "pus-tpe", name: "Busan - Taipei Taoyuan (TPE)", points: [null, 20, 20, 16] },
    { id: "pus-rmq", name: "Busan - Taichung (RMQ)", points: [null, 20, 20, 16] },
    { id: "pus-ubn", name: "Busan - Ulaanbaatar (UBN)", points: [null, 25, 25, 20] },
    { id: "pus-bkk", name: "Busan - Bangkok (BKK)", points: [null, 30, 30, 24] },
    { id: "pus-ceb", name: "Busan - Cebu (CEB)", points: [null, 30, 30, 24] },
    { id: "pus-crk", name: "Busan - Clark (CRK)", points: [null, 25, 25, 20] },
    { id: "pus-dad", name: "Busan - Da Nang (DAD)", points: [null, 30, 30, 24] },
    { id: "pus-cxr", name: "Busan - Nha Trang (CXR)", points: [null, 30, 30, 24] },
    { id: "pus-pqc", name: "Busan - Phu Quoc (PQC)", points: [null, 30, 30, 24] },
    { id: "pus-bki", name: "Busan - Kota Kinabalu (BKI)", points: [null, 30, 30, 24] },
    { id: "pus-gum", name: "Busan - Guam (GUM)", points: [null, 40, 40, 32] },
    { id: "tae-tpe", name: "Daegu - Taipei Taoyuan (TPE)", points: [null, 20, 20, 16] },
    { id: "cju-pvg", name: "Jeju - Shanghai Pudong (PVG)", points: [null, 15, 15, 12] },
    { id: "cju-tpe", name: "Jeju - Taipei Taoyuan (TPE)", points: [null, 20, 20, 16] },
    { id: "cju-hkg", name: "Jeju - Hong Kong (HKG)", points: [null, 25, 25, 20] }
  ],
  statuses: [
    { id: "member", name: "Member", bonus: 0 }
  ],
  cards: null,
  note: "Nabi Points pays a fixed number of points per one-way Jin Air flight, set by route: 10 on every domestic route, and 10 to 40 on international routes, times the fare share. JINIBIZ earns 150% (domestic only) and JINI 100%. FLEX earns 80% on domestic routes and 100% on international routes; SUPERLOW earns nothing on domestic routes and 80% on international routes. On Gimpo, Busan, Cheongju and Gwangju to Jeju, FLEX and SUPERLOW earn 100%. Event prize, travel agency discount and group-sale, bonus, charter and infant tickets, and special fares such as Jin Market, earn nothing. Points also accrue on Air Busan and Air Seoul codeshares. Jin Air takes over Air Busan and Air Seoul on 17 March 2027."
};

module.exports = {
  id: "jinair",
  // Month the earning rules were last checked against the source.
  reviewed: "2026-11",
  code: "LJ",
  color: "#212A57",
  source: "https://www.jinair.com/benefit/nabipoint/saveInfo?snsLang=ko_KR&ctrCd=KOR",
  examples: [
    { name: "Jin Air Incheon - Tokyo Narita, JINI", input: { status: "member", fare: "jini", zone: "icn-nrt" }, expect: 20 },
    { name: "Jin Air Incheon - Guam, SUPERLOW (80%)", input: { status: "member", fare: "superlow", zone: "icn-gum" }, expect: 32 },
    { name: "Jin Air domestic, JINIBIZ (150%)", input: { status: "member", fare: "jinibiz", zone: "dom-other" }, expect: 15 },
    { name: "Jin Air Gimpo - Jeju, SUPERLOW (100%)", input: { status: "member", fare: "superlow", zone: "dom-jeju" }, expect: 10 }
  ],
  rules
};
