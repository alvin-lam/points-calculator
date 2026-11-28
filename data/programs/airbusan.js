/* Air Busan (BX): FLY & STAMP stamps on Air Busan flights, from Air
   Busan's "STAMP Information" page (supplied by the site owner as a
   screenshot in November 2026) and its FLY & STAMP rules:
   - Stamps per one-way flight by route group: domestic 1; Osaka, Fukuoka,
     Matsuyama, Takamatsu, Kagoshima 2; Tokyo, Sapporo, Shizuoka, Qingdao,
     Xi'an, Yanji, Zhangjiajie, Taipei, Kaohsiung 3; Hong Kong, Macao,
     Guangzhou 4; Da Nang, Nha Trang, Ulaanbaatar, Kota Kinabalu, Kalibo,
     Bangkok, Chiang Mai, Bohol, Cebu, Guam 5; Bali 6 (shown as "volley",
     a machine translation of the Korean name).
   - Only tickets bought on Air Busan's website or app earn. Reservation
     centre, airport and travel agency tickets earn nothing, nor do
     Super Special, Event and STAMP tickets, domestic fares discounted 50%
     or more, or infants.
   - A one-way STAMP ticket costs 20 (regular) or 25 (peak) stamps on
     domestic routes, up to 70 or 75 for Bali.
   Air Busan merges into Jin Air on 17 March 2027. */
const rules = {
  name: "Air Busan | FLY & STAMP",
  programName: "FLY & STAMP",
  country: "KR",
  currency: "KRW",
  unit: "stamps",
  method: "zone",
  zoneLabel: "Route",
  zoneHint: "Air Busan gives a fixed number of stamps for each one-way flight, by destination.",
  zoneAfterFare: true,
  defaultFareType: "eligible",
  fareTypeLabel: "Ticket",
  fareTypes: [
    { id: "eligible", name: "Bought on airbusan.com or the app" },
    { id: "none", name: "Super Special, Event or STAMP ticket, or bought elsewhere" }
  ],
  defaultZone: "g3",
  zones: [
    { id: "dom", name: "Domestic", points: [1, 0] },
    { id: "g2", name: "Osaka, Fukuoka, Matsuyama, Takamatsu or Kagoshima", points: [2, 0] },
    { id: "g3", name: "Tokyo, Sapporo, Shizuoka, Qingdao, Xi'an, Yanji, Zhangjiajie, Taipei or Kaohsiung", points: [3, 0] },
    { id: "g4", name: "Hong Kong, Macao or Guangzhou", points: [4, 0] },
    { id: "g5", name: "Da Nang, Nha Trang, Ulaanbaatar, Kota Kinabalu, Kalibo, Bangkok, Chiang Mai, Bohol, Cebu or Guam", points: [5, 0] },
    { id: "g6", name: "Bali", points: [6, 0] }
  ],
  statuses: [
    { id: "member", name: "Member", bonus: 0 }
  ],
  cards: null,
  note: "FLY & STAMP gives a fixed number of stamps per one-way Air Busan flight, by destination: 1 for domestic flights, 2 for Osaka, Fukuoka, Matsuyama, Takamatsu and Kagoshima, 3 for Tokyo, Sapporo, Shizuoka, Qingdao, Xi'an, Yanji, Zhangjiajie, Taipei and Kaohsiung, 4 for Hong Kong, Macao and Guangzhou, 5 for Da Nang, Nha Trang, Ulaanbaatar, Kota Kinabalu, Kalibo, Bangkok, Chiang Mai, Bohol, Cebu and Guam, and 6 for Bali. Only tickets bought on Air Busan's website or app earn. Tickets bought through the reservation centre, at the airport or from travel agencies, Super Special, Event and STAMP tickets, domestic fares discounted 50% or more, and infants earn nothing. A one-way STAMP ticket costs 20 stamps on domestic routes (25 in peak season), up to 70 (75) for Bali. Stamps are valid for one year. Air Busan merges into Jin Air on 17 March 2027."
};

module.exports = {
  id: "airbusan",
  // Month the earning rules were last checked against the source.
  reviewed: "2026-11",
  code: "BX",
  color: "#1E3F98",
  source: "https://m.airbusan.com/mc/common/flynstamp/help",
  examples: [
    { name: "Air Busan Busan - Tokyo (3 stamps)", input: { status: "member", fare: "eligible", zone: "g3" }, expect: 3 },
    { name: "Air Busan Bali (6 stamps)", input: { status: "member", fare: "eligible", zone: "g6" }, expect: 6 },
    { name: "Air Busan Super Special ticket (no stamps)", input: { status: "member", fare: "none", zone: "g5" }, expect: 0 }
  ],
  rules
};
