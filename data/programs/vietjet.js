/* VietJet Air (VJ): SkyJoy SkyPoints on Vietjet-operated flights, from the
   SkyJoy Frequent Flyer Program Terms and Conditions version 2.1 (valid
   from 30 September 2026), Article 12, and SkyJoy's Vietjet page:
   SkyPoint = (eligible spending / VND 10,000) x the rate for the member's
   tier and fare type. Eligible spending is the base fare, Vietjet's
   surcharges and ancillary services, excluding taxes and fees set by the
   authorities. Thai Vietjet (VZ) flights do not earn. */
const rules = {
  name: "VietJet Air | SkyJoy",
  programName: "SkyJoy",
  country: "VN",
  currency: "VND",
  unit: "SkyPoints",
  method: "spend",
  ratePer: 10000,
  carrierLabel: "Vietjet Surcharges",
  carrierHint: "Fuel, system service and administration surcharges set by Vietjet. They earn like the fare. VAT, airport and security fees do not.",
  addons: true,
  addonsLabel: "Ancillary Services",
  addonsHint: "Seats, bags, meals, priority check-in, fare upgrades, travel insurance and other services bought from Vietjet. They earn like the fare.",
  defaultFareType: "eco",
  fareTypes: [
    { id: "eco", name: "Eco" },
    { id: "deluxe", name: "Deluxe" },
    { id: "skyboss", name: "SkyBoss" },
    { id: "business", name: "Business" }
  ],
  // SkyPoints per VND 10,000, by tier and fare type (Article 12).
  statuses: [
    { id: "red", name: "Red", rates: { eco: 0.5 / 10000, deluxe: 1 / 10000, skyboss: 1.5 / 10000, business: 2 / 10000 } },
    { id: "silver", name: "Silver", rates: { eco: 2 / 10000, deluxe: 4 / 10000, skyboss: 6 / 10000, business: 8 / 10000 } },
    { id: "gold", name: "Gold", rates: { eco: 3 / 10000, deluxe: 6 / 10000, skyboss: 8 / 10000, business: 10 / 10000 } },
    { id: "diamond", name: "Diamond", rates: { eco: 4 / 10000, deluxe: 8 / 10000, skyboss: 10 / 10000, business: 12 / 10000 } }
  ],
  // Vietnamese co-brand cards: SkyPoints per VND charged at Vietjet.
  // HDBank: https://hdbank.com.vn/vi/personal/product/detail/the/the-tin-dung/hdbank-vietjet-classic
  // VPBank (terms valid 3 August 2026 to 2 August 2027):
  // https://www.vpbank.com.vn/-/media/vpbank-latest/1retail/cards/credit-cards/The-le-uu-dai-tich-diem-danh-cho-chu-the-tin-dung-VPBank-VIETJET.pdf
  cardHint: "Card SkyPoints are earned on the amount charged at Vietjet, on top of the flight SkyPoints. Monthly or statement caps apply.",
  cards: [
    { id: "hdbank-classic", name: "HDBank Vietjet Classic", rate: 3 / 10000, rateText: "3 per ₫10,000", bank: "HDBank (Vietnam)" },
    { id: "vpbank-yojo", name: "VPBank YOJO Visa Platinum (Vietjet)", rate: 1 / 3000, rateText: "1 per ₫3,000 (1 per ₫1,500 with ₫20M+ statement spend)", bank: "VPBank (Vietnam)" }
  ],
  note: "SkyJoy earns SkyPoints per VND 10,000 of the base fare, Vietjet's surcharges and ancillary services, by tier and fare: Red 0.5 (Eco) to 2 (Business), Silver 2 to 8, Gold 3 to 10 and Diamond 4 to 12. Taxes, VAT and airport and security fees do not earn. Tickets paid with SkyPoints, charter, sponsored and staff tickets, and no-shows earn nothing. Thai Vietjet flights do not earn. The HDBank Vietjet Classic card earns 3 SkyPoints per VND 10,000 at Vietjet (up to 10,000 a month with travel and international spending); the VPBank YOJO card earns 1 per VND 3,000 (1 per VND 1,500 with a statement of VND 20 million or more), up to 1,500 or 3,000 per statement; the HDBank Vietjet Platinum gives 10% cashback instead of points. Enter fares in Vietnamese dong."
};

module.exports = {
  id: "vietjet",
  // Month the earning rules were last checked against the source.
  reviewed: "2026-11",
  code: "VJ",
  color: "#EB1C22",
  source: "https://skyjoy.vietjetair.com/en/vietjet-ffp/",
  examples: [
    // SkyJoy's worked example: Silver, Deluxe, VND 1,390,000.
    { name: "VietJet Silver Deluxe (SkyJoy example)", input: { status: "silver", fare: "deluxe", fields: { airfare: 1390000 } }, expect: 556 }
  ],
  rules
};
