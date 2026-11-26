/* Jetstar Japan (GK): JAL Mileage Bank miles, from JAL's Jetstar Japan page.
   Flight mileage = sector mileage (IATA TPM) x accumulation rate.
   Only GK-numbered flights earn, and only the Starter Flex and Starter
   Flex Plus fares (30%). Other fares do not earn. Jetstar Airways (JQ)
   flights do not earn JAL miles; they earn Qantas Points instead. */

const rules = {
  name: "Jetstar Japan | JAL Mileage Bank",
  programName: "JAL Mileage Bank",
  country: "JP",
  currency: "JPY",
  unit: "miles",
  method: "distance",
  defaultFareType: "starter-flex",
  fareTypes: [
    { id: "starter-flex", name: "Starter Flex", rate: 0.3 },
    { id: "starter-flex-plus", name: "Starter Flex Plus", rate: 0.3 }
  ],
  // JAL lists no status bonus for Jetstar Japan flights.
  statuses: [
    { id: "member", name: "JMB Member", multiplier: 1 }
  ],
  note: "Jetstar Japan flights earn 30% of the sector mileage on the Starter Flex and Starter Flex Plus fares. Other fares do not earn. Select JAL Mileage as an option and enter your 9-digit JMB number when you book (add a leading 0 to shorter numbers). These flights do not count toward FLY ON status. Jetstar Airways (JQ) flights do not earn JAL miles."
};

module.exports = {
  id: "jetstarjapan",
  // Month the earning rules were last checked against the source.
  reviewed: "2026-11",
  code: "GK",
  color: "#FE5815",
  source: "https://www.jal.co.jp/jp/en/jmb/earn/travel/flight/gk/",
  rules
};
