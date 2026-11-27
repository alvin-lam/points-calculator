/* South African Airways (SA): Voyager miles on SAA-operated flights
   (flight numbers SA001 to SA999), from Voyager's "Earn - Airline
   Partners" page (rule 1, SAA Operated Flights) and "Earning Miles" page:
   1 mile for every R1.60 spent on the published base fare and
   carrier-imposed fees, pro-rated across the flown sectors of the ticket.
   Neither page lists a status bonus on flights, so every tier earns the
   same rate. SAA marketing (codeshare) flights earn by distance and are
   not covered. */

const rules = {
  name: "South African Airways | Voyager",
  programName: "Voyager",
  country: "ZA",
  currency: "ZAR",
  unit: "miles",
  method: "spend",
  rateText: "1 mile per R1.60",
  statuses: [
    { id: "blue", name: "Blue", rate: 1 / 1.6 },
    { id: "silver", name: "Silver", rate: 1 / 1.6 },
    { id: "gold", name: "Gold", rate: 1 / 1.6 },
    { id: "platinum", name: "Platinum", rate: 1 / 1.6 },
    { id: "lifetime-platinum", name: "Lifetime Platinum", rate: 1 / 1.6 }
  ],
  note: "Voyager earns 1 mile for every R1.60 spent on the base fare and carrier-imposed fees on SAA-operated flights (flight numbers SA001 to SA999), whatever your status. Taxes do not earn. Miles are split across the flown sectors of the ticket. SAA codeshare flights on partner aircraft (4-digit flight numbers) earn by distance instead and are not covered here. Tour operator, unpublished, charter, award, compensation and sponsorship tickets earn nothing. Enter fares in rand."
};

module.exports = {
  id: "saa",
  // Month the earning rules were last checked against the source.
  reviewed: "2026-11",
  code: "SA",
  color: "#0D1051",
  source: "https://voyager.flysaa.com/earn-airline-partners",
  rules
};
