const rules = {
  name: "Etihad Airways | Etihad Guest",
  country: "AE",
  currency: "USD",
  unit: "Guest Miles",
  method: "distance",
  defaultFareType: "y-value",
  // Share of the route's base distance earned, by fare brand, on tickets
  // issued by Etihad (from the notes of Etihad's miles calculator).
  fareTypes: [
    { id: "y-basic", name: "Economy Basic", rate: 0.05 },
    { id: "y-value", name: "Economy Value", rate: 0.35 },
    { id: "y-comfort", name: "Economy Comfort", rate: 0.75 },
    { id: "y-deluxe", name: "Economy Deluxe", rate: 1.25 },
    { id: "j-value", name: "Business Value", rate: 1 },
    { id: "j-comfort", name: "Business Comfort", rate: 1.5 },
    { id: "j-deluxe", name: "Business Deluxe", rate: 2.5 },
    { id: "f-comfort", name: "First Comfort", rate: 2 },
    { id: "f-deluxe", name: "First Deluxe", rate: 3 }
  ],
  // The tier bonus is a share of the base distance added on top.
  statuses: [
    { id: "member", name: "Etihad Guest Member", bonus: 0 },
    { id: "silver", name: "Silver", bonus: 0.25 },
    { id: "gold", name: "Gold", bonus: 0.5 },
    { id: "platinum", name: "Platinum", bonus: 1 },
    { id: "emerald", name: "Emerald", bonus: 1 }
  ],
  // US co-branded cards (First National Bank of Omaha, launched November
  // 2026): extra miles per US dollar charged for Etihad purchases.
  cards: [
    { id: "fnbo-visa", name: "Etihad Guest Visa Signature", rate: 3, currency: "USD", bank: "First National Bank of Omaha (US)" },
    { id: "fnbo-premier", name: "Etihad Guest Premier Visa Signature", rate: 5, currency: "USD", bank: "First National Bank of Omaha (US)" },
    // UAE cards (First Abu Dhabi Bank): Etihad Guest Miles per AED 10 spent
    // on Etihad, without the optional Miles Accelerator. From
    // https://bankfab.com/personal/rewards/etihad-guest-miles/program
    { id: "fab-infinite", name: "FAB Etihad Guest Infinite Credit Card", rate: 0.7, rateText: "7 per AED 10", currency: "AED", bank: "First Abu Dhabi Bank (United Arab Emirates)" },
    { id: "fab-signature", name: "FAB Etihad Guest Signature Credit Card", rate: 0.55, rateText: "5.5 per AED 10", currency: "AED", bank: "First Abu Dhabi Bank (United Arab Emirates)" },
    { id: "fab-platinum", name: "FAB Etihad Guest Platinum Credit Card", rate: 0.4, rateText: "4 per AED 10", currency: "AED", bank: "First Abu Dhabi Bank (United Arab Emirates)" },
    { id: "fab-signature-debit", name: "FAB Etihad Guest Signature Debit Card", kind: "debit", rate: 0.5, rateText: "5 per AED 10", currency: "AED", bank: "First Abu Dhabi Bank (United Arab Emirates)" },
    { id: "fab-platinum-debit", name: "FAB Etihad Guest Platinum Debit Card", kind: "debit", rate: 0.4, rateText: "4 per AED 10", currency: "AED", bank: "First Abu Dhabi Bank (United Arab Emirates)" }
  ],
  note: "Etihad Guest earns a share of the route's base distance set by fare brand, from 5% in Economy Basic to 300% in First Deluxe. Silver, Gold, and Platinum or Emerald add 25%, 50%, or 100% of the base distance. Etihad's base distance for a route can differ slightly from the miles flown. Economy Basic earned 15% on tickets issued before 18 June 2026. The US Etihad Guest Visa Signature earns 3 more miles per dollar on Etihad purchases, and the Premier Visa Signature earns 5. In the UAE, FAB Etihad Guest cards earn per AED 10 spent on Etihad: 7 (Infinite), 5.5 (Signature) and 4 (Platinum) credit cards, and 5 (Signature) and 4 (Platinum) debit cards. FAB's optional Miles Accelerator adds more, which this estimate leaves out."
};

module.exports = {
  id: "etihad",
  // Month the earning rules were last checked against the source.
  reviewed: "2026-11",
  code: "EY",
  color: "#BD8B13",
  source: "https://www.etihad.com/en-us/etihadguest/earn-miles",
  rules
};
