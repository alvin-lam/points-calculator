const rules = {
  name: "EVA Air | Infinity MileageLands",
  country: "TW",
  currency: "TWD",
  unit: "Award Miles",
  method: "distance",
  defaultFareType: "y-std",
  // Share of the ticketed distance by booking class and fare family, on
  // flights flown and marketed by EVA Air or UNI Air.
  fareTypes: [
    { id: "j-up", name: "Business Up (C)", rate: 1.75 },
    { id: "j-std", name: "Business Standard (J)", rate: 1.5 },
    { id: "j-basic", name: "Business Basic (D)", rate: 1.25 },
    { id: "pe-up", name: "Premium Economy Up (K)", rate: 1.25 },
    { id: "pe-std", name: "Premium Economy Standard (T, L)", rate: 1.15 },
    { id: "pe-basic", name: "Premium Economy Basic (P)", rate: 1 },
    { id: "y-up", name: "Economy Up (Y, B)", rate: 1 },
    { id: "y-std", name: "Economy Standard (Q, H, M)", rate: 0.75 },
    { id: "y-basic", name: "Economy Basic (V, W, S)", rate: 0.5 },
    { id: "y-discount", name: "Economy Discount (A)", rate: 0 }
  ],
  statuses: [
    { id: "green", name: "Green Card", multiplier: 1 },
    { id: "silver", name: "Silver Card", multiplier: 1.15 },
    { id: "gold", name: "Gold Card", multiplier: 1.25 },
    { id: "diamond", name: "Diamond Card", multiplier: 1.25 }
  ],
  note: "EVA Air earns a share of the ticketed distance set by booking class, from 50% in Economy Basic to 175% in Business Up. Economy Discount (A) and group fares earn nothing. Silver Card adds 15%, and Gold and Diamond Card add 25% on international EVA Air and UNI Air flights."
};

module.exports = {
  id: "eva",
  // Month the earning rules were last checked against the source.
  reviewed: "2026-11",
  code: "BR",
  color: "#00A650",
  source: "https://www.evaair.com/en-us/infinity-mileagelands/mileage-award-program/earning-mileage/eva-air-and-uni-air/mileage-accrual-ratio-rule/",
  rules
};
