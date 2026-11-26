# Program data

Each loyalty program lives in its own file in `programs/`. The browser never reads these files directly. `node tools/build.js` combines them into `js/programs.js` and rebuilds the program pages.

## Changing a program

1. Edit `programs/<program>.js`.
2. Update `reviewed` to the month you checked the rules, for example `"2026-12"`.
3. Run `node tools/build.js`.

## Adding a program

Copy a similar program's file, rename it, and set `id` to the new file name. The build stops with a clear message if anything required is missing.

## What a program file holds

- `id`: the program's key. It must match the file name.
- `reviewed`: the month the rules were last checked, as `YYYY-MM`. The result shows it as "Rules last reviewed November 2026."
- `code`, `color`, `source`: the two-letter airline code, the brand color, and the page the rules come from. Group programs (Flying Blue, Miles & More, IAG and others) list these per airline under `airlines`. An airline without its own value uses the program's.
- `examples` (optional): published earning examples, kept as a record of how the rules were checked.
- `rules`: the earning rules the calculator uses. The fields are described below.

Other files:

- `alliances.js`: the alliance of each program or airline, and the alliance tier for each status.
- `countries.js`: the country groups in the airline menu.

## Rule fields

Earning rules for each loyalty program.

method:
  "spend"    -> points = airfare x rate (rate comes from the status, or from
                fare type x status multiplier when fareTypes is present)
  "distance" -> points = miles flown x status multiplier
  "tiered"   -> custom per-dollar tiers (Allegiant)
  "zone"     -> fixed points per fare and route band (Qantas)
earnMethods (optional): ways a member can choose to earn (Atmos Rewards):
  "distance", "price" (rate per dollar), or "segments" (perSegment).
  The status multiplier applies to each.

cards (optional): co-branded credit cards and the extra points each earns
per dollar charged to it for the ticket, taxes included. Cards marked
kind: "debit" are listed under Debit cards. A card with its
own currency (e.g. a US card on a Canadian program) asks for the amount
charged in that currency.

airlines (optional): the operating airlines a program covers. Each one is
its own entry in the program menu, shown as "Airline | programName" under
the airline's own country. An airline's eliteRate replaces the rate of statuses marked
elite, and its note is added to the program note. An airline's program
object, when present, replaces program fields such as currency,
statuses, cards, and note (IAG).

baseFareOnly (optional): the program earns on the base fare only, not on
carrier-imposed fees (Southwest, Allegiant). Others earn on both.


