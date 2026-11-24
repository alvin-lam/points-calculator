# Airline Points Calculator

A static web app that estimates the points or miles you earn on a flight.

## Use

Open `index.html` in a browser. No build step or server is needed. It also works as-is on GitHub Pages.

1. Choose an airline program.
2. Choose your current status (and fare type for Southwest, Breeze, Frontier, Avianca, and Norwegian).
3. Enter the airfare, the carrier-imposed fees, and the taxes & fees separately. Programs that earn by distance or route (Virgin Atlantic, TAP, Qatar, Qantas, and Atmos Rewards when earning by miles or segments) skip these fields.
4. For Alaska or Hawaiian (Atmos Rewards), choose how you earn: miles flown, price paid, or segments flown. Then enter the miles or segments if asked.
5. Say whether you paid with the airline's co-branded credit card, and if so, which one. For distance-based programs, enter the amount charged to the card so its points can be added.

## How it calculates

- Points are earned on the airfare plus carrier-imposed fees (Southwest and Allegiant: airfare only). Taxes & fees are shown in the total cost but do not earn.
- American, Delta, and United cap earning at 75,000 miles per ticket.
- Air Canada and WestJet fares are entered in Canadian dollars (CA$). Viva Aerobus and Volaris fares are entered in Mexican pesos (MX$). British Airways and Virgin Atlantic fares are entered in pounds (£). Fares for the European airlines (Flying Blue, Miles & More, Iberia, LEVEL, Vueling, and TAP) are entered in euros (€). Aeroméxico earns per US dollar, so its fare is entered in US dollars.
- Alaska and Hawaiian both use Atmos Rewards. Members choose to earn 1 point per mile, 5 points per dollar, or 500 points per segment, with elite bonuses on each.
- Virgin Atlantic, TAP, and Qatar Airways earn a share of the miles flown set by fare, so they ask for the fare class and the miles flown, not the price paid.
- Qantas awards a fixed number of points per flight, so it asks for the fare and the route band, not the price paid. The table is Qantas' own, for travel from 22 July 2025.
- ANA, JAL, and Singapore Airlines KrisFlyer earn a share of the miles flown by booking class, and Cathay Pacific awards a fixed amount by fare type and distance zone from Hong Kong, so none of them ask for the price paid.
- Malaysia Airlines Enrich earns 1.5 to 2.5 points per ringgit (RM) by status.
- Etihad Guest earns a share of the route distance by fare brand, and adds a status bonus as a share of the distance.
- EVA Air, China Airlines, and STARLUX earn a share of the distance by booking class, so they ask for the class and the miles flown.
- Icelandair awards fixed Saga Points per flight by fare and route, so it asks for the fare and the route.
- Alliance airlines added in November 2026 follow each airline's published table. Some earn a share of the distance by booking class, with a minimum per flight (Turkish, PhoenixMiles). Some pay a fixed amount on certain routes (Turkish within Türkiye, LOT and Croatia within Europe). Air China counts kilometres, which the calculator converts from the miles entered. Air New Zealand pays fixed Airpoints by route group, fare, and class. Air Europa, China Eastern, and Xiamen earn on the price paid. SAS EuroBonus pays a fixed number of points per flight by route region and ticket type, with 25% to 75% more for Silver, Gold, and Diamond. GOL (Smiles) and LATAM (LATAM Pass) earn by category and route: GOL per real within South America and per US dollar elsewhere, LATAM per US dollar of the base fare. Fiji Airways uses AAdvantage and earns at American's rates on the US dollar price. Hong Kong Airlines and Hainan Airlines (Fortune Wings Club) earn on the amount spent, in HK$ or yuan, rounded to the nearest 10, plus a status bonus. China Southern earns on the price paid for tickets it issues (number 784), and on kilometres by booking class, with a 500 km minimum, for tickets issued by other airlines.
- Porter fares are entered in Canadian dollars, Finnair fares in euros, Virgin Australia fares in Australian dollars (A$), and Norwegian fares in Norwegian kroner (kr). Avianca LifeMiles earns per US dollar by fare family.
- The program menu keeps the United States, Canada, and Mexico at the top and sorts the other countries alphabetically.
- Miles & More (Lufthansa Group), Flying Blue (Air France, KLM, and Transavia), and IAG are single programs. Each of their airlines is listed under its own country as "Airline | Program", such as "Lufthansa | Miles & More" under Germany. For Miles & More, the airline sets the status earning rate. For IAG, the airline picks the loyalty program: AerClub in euros, British Airways Club in pounds, Iberia Club in euros (Iberia and LEVEL), or Vueling Club in euros, each with its own status levels and cards.
- After a program is chosen, an Alliance line shows oneworld, Star Alliance, SkyTeam, or "Not part of an alliance" for the chosen airline.
- Status levels show the matching alliance tier when the airline is in an alliance, such as "AAdvantage Gold | Ruby" (oneworld), "Premier Silver | Silver" (Star Alliance), or "Gold Medallion | Elite Plus" (SkyTeam).
- United and Southwest also list their debit cards, grouped under Debit cards in the card menu.
- Allegiant earns 1 point per dollar up to $500 and 2 per dollar above that.

- Co-branded card points are added on top of flight points. They are earned on the full amount charged, taxes included, and are not subject to the per-ticket cap. A card billed in another currency than the fare, such as the US Chase Aeroplan Card, asks for the amount charged in its own currency. Breeze and Viva Aerobus have no card option because their card rates could not be confirmed.

## Install and icons

- Folder layout: `index.html` at the root, scripts in `js/`, styles in `css/styles.css`, and tests in `tests/`. `sw.js` stays at the root so it can serve the whole site offline.
  - `js/programs.js`: the earning data the browser loads, generated from `data/` (see Program data below).
  - `js/app.js`: the calculator, airline search, airport lookup, and Appearance panel.
  - `js/distance.js`: great-circle distance between two airports.
  - `js/airports.js`: about 3,200 airports with scheduled service, from [OurAirports](https://ourairports.com/data/) (public domain). It loads only when a distance-based program is chosen.
  - `js/install.js`: the install prompt.
- `favicon.ico` and `icons/` hold the browser and home-screen icons. `manifest.webmanifest` and `sw.js` let the site install as an app and open offline.
- `js/install.js` invites visitors to add the calculator to their home screen. Chrome, Edge, and Android get an Install button. iPhone and iPad get the Share, then Add to Home Screen steps. Other phones and tablets whose browser has no install button (such as Firefox or Samsung Internet) are reminded to use the browser menu's Add to Home Screen. "Not now" hides it for 14 days.
- Installing needs HTTPS, which GitHub Pages provides. When rates change, bump `CACHE` in `sw.js` so installed copies refresh their offline cache.

## Updating rates

All earning rules, including co-branded card rates, live in `data/programs/`, one file per program. Edit the program's file when its rules change, then run `node tools/build.js`.

## Tests

The data and distance checks need only Node 18 or later. The calculator checks open the page in a headless browser with Playwright, and are skipped if it is not installed.

```bash
npm install --prefix tests
npx --prefix tests playwright install chromium
node --test tests/*.test.js
```

When a program's rules change, update its file in `data/programs/`, set `reviewed` to the current month, and add or adjust an entry in its `examples` using the airline's own published example.

## Search engines and sharing

- Each program has its own page at `/airlines/<name>/` (for example `/airlines/lufthansa/`). The page opens the calculator with that program chosen and has its own title and description.
- These pages, `sitemap.xml` and `robots.txt` are generated by `node tools/build.js` (see below).

- The tests fail if the generated files are out of date.
- `icons/og-image.png` is the preview image shown when a link is shared. Its source is `tools/og-image.html`.

## Program data

- Each program's rules, code, color, source, review month and published examples live in one file: `data/programs/<program>.js`.
- `js/programs.js` is generated from those files. Do not edit it by hand.
- After changing anything in `data/` or `index.html`, run:

```bash
node tools/build.js
```

- See `data/README.md` for the fields and for how to add a program. The tests fail if the generated files are out of date.

## Roadmap

Programs and data still to add. Each needs an official, complete earning table before it is built. Many of these airlines' websites block automated access, so a screenshot or PDF of the earning page is the quickest way to add one.

### Programs to add

| Airline | Program | Region | What is needed |
|---|---|---|---|
| Emirates | Skywards | Middle East | Emirates publishes only a per-ticket miles calculator, not an earning table. Calculator results for a few routes, all fare types, would let us work out the rule. |
| Vietnam Airlines | Lotusmiles | Asia | The current international and domestic accrual tables. The website is blocked here, and search results show conflicting versions. |
| Garuda Indonesia | GarudaMiles | Asia | The full accrual table effective 8 September 2025, with status bonuses. The website is blocked here. |
| Philippine Airlines | Mabuhay Miles | Asia | The earning table for Philippine Airlines' own flights. Only the codeshare table is published. |
| Air Tahiti Nui | Club Tiare | Oceania | The percentage earned by each booking class. Status bonuses (Silver 50%, Gold 75%) and non-earning classes (O, X, U, I, F, R) are known. |
| Jetstar | Qantas Frequent Flyer | Oceania | Which Jetstar fares earn and at what rate. Qantas' and Jetstar's pages disagree, and the late-2025 Frequent Flyer Extra option changes the rules. Would join the Qantas entry. |
| Ethiopian Airlines | ShebaMiles | Africa | The accrual table for Ethiopian's own flights and the tier bonuses. The website is blocked here. The only published table found (25% to 100% for economy classes) appears to be for tier activity, not award miles. |
| Royal Air Maroc | Safar Flyer | Africa | Which earning table is current. Its site shows a booking-class version (Business J, C, D, I 200%; Economy Y, B 120%; other economy classes 100%) and a newer fare-family version (Eco Essential reported at 50%). Tier bonuses reported as Silver 50%, Gold 75%, Platinum 100%. The website is blocked here. |
| EgyptAir | EgyptAir Plus | Africa | EgyptAir Plus's own accrual table. Only partner programs' tables for EgyptAir flights were found, and they disagree. |
| Kenya Airways | Asante Rewards | Africa | The earning chart. Points depend on route, fare type and cabin, with a reported 500-point minimum per sector, but no table was found. The website is blocked here. |
| South African Airways | Voyager | Africa | Which rule applies to SAA's own flights: one mile per R1.60 of fare and carrier fees (reported by a fare-chart site), or class-based percentages (a Thai Airways table effective 1 July 2026). The website is blocked here. |

### Programs to complete

| Airline | What is missing |
|---|---|
| Aegean Airlines | The International earning table (only Domestic is built). International flights earn a share of the distance with a minimum per flight, but sources disagree on the rates (see below). Confirm the tier bonuses (read as Silver 10%, Gold 20%, Platinum 30% from a low-resolution screenshot). |
| Copa Airlines | Whether Copa rounds before or after the PreferMember bonus (can differ by one mile). |
| Edelweiss | An official Miles & More source for its rates (the current source is Travel-Dealz). |

#### Aegean international: routes to verify

Run each route in Aegean's miles calculator as a Blue member, and note the miles for every fare family (Business, Business Basic, Comfort Flex, Flex, Light) and Aegean's distance if shown.

| Route | Great-circle distance |
|---|---|
| Athens (ATH) to Larnaca (LCA) | 578 miles |
| Athens (ATH) to Rome (FCO) | 675 miles |
| Athens (ATH) to Tel Aviv (TLV) | 742 miles |
| Athens (ATH) to Paris (CDG) | 1,310 miles |
| Athens (ATH) to London (LHR) | 1,508 miles |
| Athens (ATH) to New York (JFK) | 4,929 miles |

Rates to test:

- Quoted from Aegean's page: Business 250% (minimum 2,500), Comfort Flex 200% (minimum 1,800), Light 75% (minimum 600). Business Basic and Flex unknown.
- A guide's example implies Light earns 50%, not 75%.
- An older review says Business 150% and full-fare Economy 125%; likely outdated.

Expected results under the quoted rates: ATH–FCO 2,500 / 1,800 / 600 (all minimums); ATH–LHR 3,770 / 3,016 / 1,131; ATH–JFK 12,323 / 9,858 / 3,697 (Business / Comfort Flex / Light). Light at 50% would give 754 on LHR and 2,465 on JFK.

### Lower priority

- Asia: IndiGo BluChip, Saudia Alfursan, SriLankan FlySmiLes, Bangkok Airways FlyerBonus, AirAsia, Cebu Pacific, Shenzhen Airlines (may join the Air China entry).
- Europe: airBaltic Club, Pegasus BolBol, Volotea, Binter.
- Oceania: Air Niugini Destinations, Aircalin.

### Credit cards to add

Each card needs its current earning rate on airline purchases, confirmed from the issuer, before it is added. Cards are grouped by issuing bank in the card menu.

| Cards | Programs | Notes |
|---|---|---|
| US business cards | United (Chase), Delta (American Express), Southwest (Chase), American (Citi), Alaska and Hawaiian (Bank of America), JetBlue (Barclays) | Most earn the same extra miles on airline purchases as the personal cards. Adding all of them lengthens the card menus, so consider adding only those whose airline rate differs. |
| Canadian business cards | Air Canada (CIBC, TD, American Express) | Aeroplan business versions of the existing Canadian cards. |
| US or home-market cards for programs with none | Qantas, Virgin Australia (Velocity), Singapore Airlines (KrisFlyer), Malaysia Airlines (Enrich), Cathay Pacific (home market), Thai, Air India, Qatar, Etihad, Turkish and other non-US programs | Add a US-issued card where one exists; otherwise the airline's home-market cards, with the card amount in that market's currency. |

### Site improvements

| Item | What it involves |
|---|---|
| Google Search Console | Submit `https://points.alltripsconsidered.com/sitemap.xml` so the program pages are indexed in days rather than weeks. Needs the site owner's Google account. |
| Automatic tests on GitHub | A GitHub Actions workflow that runs `node --test tests/*.test.js` (with Playwright) on every push and blocks a merge to `prod` if any test fails. |
| Report a correction | A footer link, by email or a simple form, so readers can report changed earning rules. |
| Review schedule | A reminder every six months listing programs whose `reviewed` month is older than six months, so the "Rules last reviewed" dates stay current. |
| Visit counter | A privacy-friendly counter (for example Plausible or GoatCounter, with no cookies or consent banner) to see which programs people use. If added, the footer should say so. |
| "70+ airlines" wording | The page titles, descriptions and preview image say "70+ airlines" (73 today, in 55 programs). Update the wording and remake the preview image (`tools/og-image.html`) if the count passes 100. |

### Watch

- Sun Country Rewards: merging into Allegiant Allways Rewards, likely by about May 2028. Not added for that reason.
- Asiana Club: merging into Korean Air SKYPASS. Not added for that reason.
- Air Transat Staria credit cards: Desjardins and Visa plan cards that earn Staria points, launching later in 2027. Fees and earning rates are not yet published. Add them to the Air Transat entry once they launch.
