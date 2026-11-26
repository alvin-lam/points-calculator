# Airline and alliance logos

Logos for 73 airlines and 3 alliances in the calculator. `index.json` maps each calculator menu value (for example `united`, `milesandmore:lh` or `alliance:oneworld`) to its file, name, source and license.

## Sources

0. **Official files supplied by the site owner** from airline and alliance media kits. Each airline, alliance and status level has one logo; extra versions and program logos are not kept.

1. **Simple Icons** (4 single-color SVGs, to be replaced with official or Wikimedia Commons versions): from [Simple Icons](https://simpleicons.org) version 16.38.1, released under CC0 1.0 (see `LICENSE.md`). They have no color set; give them a `fill` or use them as a CSS mask.
2. **The airline's own website** (2 PNGs): Hong Kong Airlines and Frontier. The Frontier file is the white version, for dark backgrounds.
3. **Wikimedia Commons** (49 SVGs): each file page is listed in `index.json`. The first 32 were confirmed public domain on Commons; the 15 added later replaced Simple Icons logos, and their license should be confirmed on each file page (Commons only hosts freely licensed files).

## Trademarks

Every logo is a trademark of its airline or alliance. The licenses above cover copyright in the files, not the trademarks. Use the logos only to identify each airline, and never in a way that suggests the airline or alliance endorses or sponsors this site.

## Still missing

- SkyTeam Elite and Elite Plus status badges: none found on Commons.

- Chosen on Commons but not downloaded (Wikimedia rate-limited the requests): Star Alliance for light backgrounds.
- No suitable file found: Fiji Airways, Hainan Airlines, LEVEL, Malaysia Airlines, Virgin Australia.

## Status badges

Official files supplied by the site owner, keyed as `status:<alliance>:<tier>`: oneworld Emerald, Sapphire and Ruby (the "Priority" badges), Star Alliance Gold and Silver, SkyTeam Elite Plus, and SkyTeam Elite. The Elite badge was made for this site from the Elite Plus file by removing the word PLUS.

## Square and circular icons

Each airline, alliance and status badge also has a 512 by 512 square icon (`square/`) and a circular icon with a transparent outside (`circle/`). `index.json` links them through the `square` and `circle` fields. Most use the airline's official app icon: from the Apple App Store, or supplied by the site owner. `iconSource` in `index.json` names the app. The rest were made from the full logo, with the symbol cut out and centered on white. Airlines whose logo is only a wordmark use the whole wordmark until an official icon file is supplied.
