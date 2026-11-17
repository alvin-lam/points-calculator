# Airline Points Calculator

A static web app that estimates the points or miles you earn on a flight.

## Use

Open `index.html` in a browser. No build step or server is needed. It also works as-is on GitHub Pages.

1. Choose an airline program.
2. Choose your current status (and fare type for Southwest and Breeze).
3. Enter the airfare and the taxes & fees separately.
4. For Alaska Atmos Rewards, enter the miles flown, since that program earns by distance.

## How it calculates

- Points are earned on the airfare only. Taxes & fees are shown in the total cost but do not earn.
- American, Delta, and United cap earning at 75,000 miles per ticket.
- Allegiant earns 1 point per dollar up to $500 and 2 per dollar above that.

## Updating rates

All earning rules live in `programs.js`. Edit the rates there when a program changes.
