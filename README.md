# Airline Points Calculator

A static web app that estimates the points or miles you earn on a flight.

## Use

Open `index.html` in a browser. No build step or server is needed. It also works as-is on GitHub Pages.

1. Choose an airline program.
2. Choose your current status (and fare type for Southwest, Breeze, Frontier, Avianca, and Norwegian).
3. Enter the airfare and the taxes & fees separately. Programs that earn by distance or route (Virgin Atlantic, TAP, Qatar, Qantas, and Atmos Rewards when earning by miles or segments) skip these fields.
4. For Alaska or Hawaiian (Atmos Rewards), choose how you earn: miles flown, price paid, or segments flown. Then enter the miles or segments if asked.
5. Say whether you paid with the airline's co-branded credit card, and if so, which one. For distance-based programs, enter the amount charged to the card so its points can be added.

## How it calculates

- Points are earned on the airfare only. Taxes & fees are shown in the total cost but do not earn.
- American, Delta, and United cap earning at 75,000 miles per ticket.
- Air Canada and WestJet fares are entered in Canadian dollars (CA$). Viva Aerobus and Volaris fares are entered in Mexican pesos (MX$). British Airways and Virgin Atlantic fares are entered in pounds (£). Fares for the European airlines (Flying Blue, Miles & More, Iberia, LEVEL, Vueling, and TAP) are entered in euros (€). Aeroméxico earns per US dollar, so its fare is entered in US dollars.
- Alaska and Hawaiian both use Atmos Rewards. Members choose to earn 1 point per mile, 5 points per dollar, or 500 points per segment, with elite bonuses on each.
- Virgin Atlantic, TAP, and Qatar Airways earn a share of the miles flown set by fare, so they ask for the fare class and the miles flown, not the price paid.
- Qantas awards a fixed number of points per flight, so it asks for the fare and the route band, not the price paid. The table is Qantas' own, for travel from 22 July 2025.
- ANA, JAL, and Singapore Airlines KrisFlyer earn a share of the miles flown by booking class, and Cathay Pacific awards a fixed amount by fare type and distance zone from Hong Kong, so none of them ask for the price paid.
- Malaysia Airlines Enrich earns 1.5 to 2.5 points per ringgit (RM) by status.
- Porter fares are entered in Canadian dollars, Finnair fares in euros, Virgin Australia fares in Australian dollars (A$), and Norwegian fares in Norwegian kroner (kr). Avianca LifeMiles earns per US dollar by fare family.
- The program menu keeps the United States, Canada, and Mexico at the top and sorts the other groups alphabetically.
- Miles & More (Lufthansa Group), Flying Blue (Air France-KLM), and IAG are single programs. Each of their airlines is listed by name under a group heading that names the program, such as "IAG | Avios". For Miles & More, the airline sets the status earning rate. For IAG, the airline picks the loyalty program: AerClub in euros, British Airways Club in pounds, Iberia Club in euros (Iberia and LEVEL), or Vueling Club in euros, each with its own status levels and cards.
- United and Southwest also list their debit cards, grouped under Debit cards in the card menu.
- Allegiant earns 1 point per dollar up to $500 and 2 per dollar above that.

- Co-branded card points are added on top of flight points. They are earned on the full amount charged, taxes included, and are not subject to the per-ticket cap. A card billed in another currency than the fare, such as the US Chase Aeroplan Card, asks for the amount charged in its own currency. Breeze and Viva Aerobus have no card option because their card rates could not be confirmed.

## Install and icons

- `favicon.ico` and `icons/` hold the browser and home-screen icons. `manifest.webmanifest` and `sw.js` let the site install as an app and open offline.
- `install.js` invites visitors to add the calculator to their home screen. Chrome, Edge, and Android get an Install button. iPhone and iPad get the Share, then Add to Home Screen steps. "Not now" hides it for 14 days.
- Installing needs HTTPS, which GitHub Pages provides. When rates change, bump `CACHE` in `sw.js` so installed copies refresh their offline cache.

## Updating rates

All earning rules, including co-branded card rates, live in `programs.js`. Edit the rates there when a program changes.
