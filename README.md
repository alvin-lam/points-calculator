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

- Folder layout: `index.html` at the root, scripts in `js/` (`programs.js` for the earning data, `app.js` for the calculator, `install.js` for the install prompt), and styles in `css/styles.css`. `sw.js` stays at the root so it can serve the whole site offline.
- `favicon.ico` and `icons/` hold the browser and home-screen icons. `manifest.webmanifest` and `sw.js` let the site install as an app and open offline.
- `js/install.js` invites visitors to add the calculator to their home screen. Chrome, Edge, and Android get an Install button. iPhone and iPad get the Share, then Add to Home Screen steps. "Not now" hides it for 14 days.
- Installing needs HTTPS, which GitHub Pages provides. When rates change, bump `CACHE` in `sw.js` so installed copies refresh their offline cache.

## Updating rates

All earning rules, including co-branded card rates, live in `js/programs.js`. Edit the rates there when a program changes.
