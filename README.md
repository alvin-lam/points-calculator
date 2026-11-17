# Airline Points Calculator

A static web app that estimates the points or miles you earn on a flight.

## Use

Open `index.html` in a browser. No build step or server is needed. It also works as-is on GitHub Pages.

1. Choose an airline program.
2. Choose your current status (and fare type for Southwest, Breeze, and Frontier).
3. Enter the airfare and the taxes & fees separately.
4. For Alaska or Hawaiian (Atmos Rewards), enter the miles flown, since that program earns by distance.
5. Say whether you paid with the airline's co-branded credit card, and if so, which one.

## How it calculates

- Points are earned on the airfare only. Taxes & fees are shown in the total cost but do not earn.
- American, Delta, and United cap earning at 75,000 miles per ticket.
- Air Canada and WestJet fares are entered in Canadian dollars (CA$). Viva Aerobus and Volaris fares are entered in Mexican pesos (MX$). British Airways and Virgin Atlantic fares are entered in pounds (£). Air France and KLM (Flying Blue) fares are entered in euros (€). Aeroméxico earns per US dollar, so its fare is entered in US dollars.
- Alaska and Hawaiian both use Atmos Rewards, which earns by distance.
- Virgin Atlantic earns a share of the miles flown set by fare class, so it asks for the fare class and the miles flown.
- United and Southwest also list their debit cards, grouped under Debit cards in the card menu.
- Allegiant earns 1 point per dollar up to $500 and 2 per dollar above that.

- Co-branded card points are added on top of flight points. They are earned on the full amount charged, taxes included, and are not subject to the per-ticket cap. A card billed in another currency than the fare, such as the US Chase Aeroplan Card, asks for the amount charged in its own currency. Breeze and Viva Aerobus have no card option because their card rates could not be confirmed.

## Install and icons

- `favicon.ico` and `icons/` hold the browser and home-screen icons. `manifest.webmanifest` and `sw.js` let the site install as an app and open offline.
- `install.js` invites visitors to add the calculator to their home screen. Chrome, Edge, and Android get an Install button. iPhone and iPad get the Share, then Add to Home Screen steps. "Not now" hides it for 14 days.
- Installing needs HTTPS, which GitHub Pages provides. When rates change, bump `CACHE` in `sw.js` so installed copies refresh their offline cache.

## Updating rates

All earning rules, including co-branded card rates, live in `programs.js`. Edit the rates there when a program changes.
