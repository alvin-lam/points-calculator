(function () {
  "use strict";

  var PROGRAMS = window.PROGRAMS;
  var $ = function (id) { return document.getElementById(id); };

  var form = $("calc");
  var programEl = $("program");
  var statusEl = $("status");
  var fareTypeEl = $("fareType");
  var creditEl = $("creditTo");
  var fareTypeField = $("fareTypeField");
  var distanceField = $("distanceField");
  var airfareEl = $("airfare");
  var carrierEl = $("carrierFees");
  var taxesEl = $("taxes");
  var distanceEl = $("distance");
  var earnField = $("earnField");
  var earnEl = $("earnMethod");
  var segmentsField = $("segmentsField");
  var zoneField = $("zoneField");
  // Marks the route menu's usual place, so it can move back.
  var zoneHome = document.createComment("zone field home");
  zoneField.before(zoneHome);
  var fareFields = $("fareFields");
  var zoneEl = $("zone");
  var segmentsEl = $("segments");
  var cardField = $("cardField");
  var cardSelectField = $("cardSelectField");
  var cardEl = $("card");
  var usedCardYes = $("usedCardYes");
  var usedCardNo = $("usedCardNo");
  var cardChargeField = $("cardChargeField");
  var cardChargeEl = $("cardCharge");
  var upgradeField = $("upgradeField");
  var upgradeEl = $("upgrade");
  var addonsField = $("addonsField");
  var addonsEl = $("addons");
  var directField = $("directField");
  var directYes = $("directYes");
  var cardmemberField = $("cardmemberField");
  var cardmemberYes = $("cardmemberYes");
  var cardmemberNo = $("cardmemberNo");
  var gowildField = $("gowildField");
  var gowildYes = $("gowildYes");
  var gowildNo = $("gowildNo");
  var gowildFeeField = $("gowildFeeField");
  var gowildFeeEl = $("gowildFee");
  var errorEl = $("error");
  var resultEl = $("result");

  // Numbers, money and dates follow the device's language and region.
  var LOCALE = (navigator.languages && navigator.languages[0]) || navigator.language || "en-US";
  var num = new Intl.NumberFormat(LOCALE);
  var money = {};
  ["USD", "CAD", "MXN", "AUD", "NOK", "MYR", "SGD", "JPY", "HKD", "TWD", "INR", "THB", "CNY", "NZD", "GBP", "EUR", "BRL", "ILS", "ZAR"].forEach(function (c) {
    money[c] = new Intl.NumberFormat(LOCALE, { style: "currency", currency: c });
  });
  // Distance unit: kilometres where the region uses them; miles in the
  // US, the UK, Liberia and Myanmar. Airlines still count miles, so a
  // distance entered in kilometres is converted before earning.
  var KM_PER_MILE = 1.609344;
  var useKm = (function () {
    try {
      var region = new Intl.Locale(LOCALE).maximize().region;
      return ["US", "GB", "LR", "MM"].indexOf(region) === -1;
    } catch (e) { return false; }
  })();
  distanceEl.addEventListener("input", function () { delete distanceEl.dataset.miles; });
  if (useKm) {
    document.querySelector('label[for="distance"]').textContent = "Kilometres flown";
    distanceEl.placeholder = "e.g. " + num.format(2000);
    var hint = $("distanceHint");
    if (hint) hint.textContent = "This program awards points by distance, not by price. Enter airport codes or cities to fill this in, or type the kilometres yourself. Airlines count miles, so it is converted.";
  }
  function distText(miles) {
    return useKm
      ? num.format(Math.round(miles * KM_PER_MILE)) + " km (" + num.format(miles) + " miles)"
      : num.format(miles) + " miles";
  }
  // Fills the distance box from a known mileage, in the device's unit,
  // and keeps the exact miles for the calculation.
  function setDistanceMiles(miles, exact) {
    distanceEl.value = useKm ? Math.round(miles * KM_PER_MILE) : miles;
    distanceEl.dataset.miles = exact != null ? exact : miles;
  }
  // The distance the airline counts, in the airline's own unit. Most
  // programs count miles; a few count kilometres (distanceFactor).
  function countedText(p, miles) {
    if (p.distanceFactor) {
      var km = Math.round(miles * p.distanceFactor);
      return num.format(km) + " km" + (useKm ? "" : " (" + num.format(Math.round(miles)) + " miles)");
    }
    return num.format(Math.round(miles)) + " miles" + (useKm ? " (" + num.format(Math.round(miles * KM_PER_MILE)) + " km)" : "");
  }
  // "1 mile", "1 point": singular only for plain English units.
  function unitFor(n, unit) {
    if (n !== 1) return unit;
    // "KrisFlyer miles" -> "KrisFlyer mile", "Qantas Points" -> "Qantas Point".
    return unit.replace(/(miles|points|dollars)$/i, function (w) { return w.slice(0, -1); });
  }
  function reviewedText(ym) {
    if (!ym) return "recently";
    var parts = ym.split("-");
    return new Date(Number(parts[0]), Number(parts[1]) - 1, 1).toLocaleDateString(LOCALE, { year: "numeric", month: "long" });
  }

  var symbols = { USD: "$", CAD: "CA$", MXN: "MX$", AUD: "A$", NOK: "kr", MYR: "RM", SGD: "S$", JPY: "¥", HKD: "HK$", TWD: "NT$", INR: "₹", THB: "฿", CNY: "CN¥", NZD: "NZ$", GBP: "£", EUR: "€", BRL: "R$", ILS: "₪", ZAR: "R", MZN: "MT", AED: "AED ", TRY: "₺", CHF: "CHF ", ISK: "ISK ", PHP: "₱", VND: "₫", XPF: "XPF ", MAD: "MAD ", OMR: "OMR ", JOD: "JOD ", LKR: "LKR ", ARS: "AR$", PAB: "B/.", KRW: "₩", MOP: "MOP$", PGK: "K", QAR: "QAR " };
  // Name of the currency's hundredth, for the point value label.
  var minorUnit = { USD: "¢", CAD: "¢", MXN: "¢", AUD: "¢", GBP: "p", EUR: "¢" };
  var moneyEls = document.querySelectorAll(".money:not(.wide-fixed)");
  // Labels for a card billed in another currency than the fare.
  // Names for the "charged in ... or a foreign currency?" card question.
  var CURRENCY_NAMES = { ILS: "shekels", TWD: "New Taiwan dollars" };
  var cardSymbols = { USD: "US$", CAD: "CA$", MXN: "MX$", AUD: "A$", NOK: "kr", MYR: "RM", SGD: "S$", JPY: "¥", HKD: "HK$", TWD: "NT$", INR: "₹", THB: "฿", CNY: "CN¥", NZD: "NZ$", GBP: "£", EUR: "€", BRL: "R$", ILS: "₪", ZAR: "R", MZN: "MT", AED: "AED ", TRY: "₺", CHF: "CHF ", ISK: "ISK ", PHP: "₱", VND: "₫", XPF: "XPF ", MAD: "MAD ", OMR: "OMR ", JOD: "JOD ", LKR: "LKR ", ARS: "AR$", PAB: "B/.", KRW: "₩", MOP: "MOP$", PGK: "K", QAR: "QAR " };

  function option(value, label) {
    var o = document.createElement("option");
    o.value = value;
    o.textContent = label;
    return o;
  }

  // "Airline | Program" for an airline inside a group program.
  // "Status | Alliance tier" when the program is in an alliance. Airlines
  // that share a program show its tier too (Transavia, Eurowings).
  // Extra fee fields a program defines (`extraFields`), each earning its own
  // rate per status. Built when the program changes.
  function buildExtraFields(p) {
    var box = $("extraFields");
    box.textContent = "";
    (p.extraFields || []).forEach(function (f) {
      var div = document.createElement("div");
      div.className = "field";
      var label = document.createElement("label");
      label.htmlFor = "extra-" + f.id;
      label.textContent = f.label;
      var money = document.createElement("div");
      money.className = "money";
      var sym = document.createElement("span");
      sym.setAttribute("aria-hidden", "true");
      sym.textContent = symbols[p.currency || "USD"] || "$";
      var input = document.createElement("input");
      input.id = "extra-" + f.id;
      input.type = "number"; input.inputMode = "decimal"; input.min = "0"; input.step = "0.01"; input.placeholder = p.currency || "USD";
      input.addEventListener("input", function () { resultEl.hidden = true; });
      money.appendChild(sym); money.appendChild(input);
      div.appendChild(label); div.appendChild(money);
      if (f.hint) { var small = document.createElement("small"); small.textContent = f.hint; div.appendChild(small); }
      box.appendChild(div);
    });
  }
  function readExtraFields(p) {
    var out = { items: [], total: 0 };
    for (var i = 0; i < (p.extraFields || []).length; i++) {
      var f = p.extraFields[i];
      var el = $("extra-" + f.id);
      var v = el ? (parseFloat(el.value) || 0) : 0;
      if (v < 0) return { error: f.label + " cannot be negative." };
      out.items.push({ def: f, amount: v });
      out.total += v;
    }
    return out;
  }

  // The Membership menu lists the airline's own levels; the alliance tier
  // shows separately below it (syncAllianceStatus).
  // How much a fare type earns, to list fares from lowest to highest: its
  // rate, its share of the distance or fixed amount, its points in a route
  // band, or the first level's rate. Fares are compared in one route column
  // (the first that covers them all); otherwise each uses its best value.
  function earnValue(e) {
    if (e == null) return null;
    return typeof e === "number" ? e * 1000 : e.share != null ? e.share * 1000 : e.fixed != null ? e.fixed : null;
  }
  function fareColumns(p, f) {
    if (f.earn) return f.earn.map(earnValue);
    if (p.zones && p.zones.length && p.zones[0].points) {
      var idx = p.fareTypes.indexOf(f);
      return p.zones.map(function (z) { return z.points && z.points[idx] != null ? z.points[idx] : null; });
    }
    return null;
  }
  function sortFares(p, list) {
    var cols = list.map(function (f) { return fareColumns(p, f); });
    var col = -1;
    if (cols.every(function (c) { return c; })) {
      var n = Math.max.apply(null, cols.map(function (c) { return c.length; }));
      for (var k = 0; k < n && col < 0; k++) if (cols.every(function (c) { return c[k] != null; })) col = k;
    }
    var vals = list.map(function (f, i) {
      var v = null;
      if (typeof f.rate === "number") v = f.rate;
      else if (cols[i]) {
        if (col >= 0) v = cols[i][col];
        else cols[i].forEach(function (x) { if (x != null && (v === null || x > v)) v = x; });
      } else if (p.statuses && p.statuses[0] && p.statuses[0].rates && p.statuses[0].rates[f.id] != null) {
        v = p.statuses[0].rates[f.id];
      }
      if (v !== null && f.addPoints) v += f.addPoints / 1e6;
      return v;
    });
    // A program whose fares cannot all be measured keeps its own order.
    if (vals.some(function (v) { return v === null; })) return list;
    // Fares that earn the same keep cabin order (most lists start with the
    // highest cabin, so the later entry comes first).
    return list.map(function (f, i) { return { f: f, v: vals[i], i: i }; })
      .sort(function (a, b) { return a.v - b.v || b.i - a.i; })
      .map(function (x) { return x.f; });
  }

  function statusLabel(s, p) {
    return levelName(p || current(), s);
  }

  // Level names without the program's name, since the menu is already
  // labelled "[program] Level": "MileagePlus Member" shows as "Member" and
  // "Egret Gold" as "Gold". Only the full program name, or its first word
  // followed by a usual tier word, is removed, so "Breezy 1", "Sky Pearl
  // Card" and base tiers named after the program ("Matmid") stay whole.
  var TIER_WORDS = /^(member|silver|gold|platinum|diamond|titanium|blue|green|red|black|bronze|extra|priority|elite)\b/i;
  function levelName(p, s) {
    var name = s.name;
    var prog = p ? (p.programName || ((p.name || "").split(" | ")[1] || "")) : "";
    if (!prog) return name;
    var lower = name.toLowerCase();
    var full = prog.toLowerCase() + " ";
    if (lower.indexOf(full) === 0) {
      var rest = name.slice(full.length).trim();
      if (rest && !/^or\b/i.test(rest) && !/^\d+$/.test(rest)) return rest.charAt(0).toUpperCase() + rest.slice(1);
      return name;
    }
    var first = prog.split(/\s+/)[0];
    if (first !== prog && lower.indexOf(first.toLowerCase() + " ") === 0) {
      var rest2 = name.slice(first.length + 1).trim();
      if (TIER_WORDS.test(rest2)) return rest2;
    }
    return name;
  }

  // "[Alliance] Status" beside Membership Level: shown only for an airline in
  // an alliance. A level with no alliance tier shows "General".
  function syncAllianceStatus() {
    var field = $("allianceStatusField");
    var p = current();
    var sel = selection();
    var alliance = p && sel.program ? (sel.airline ? sel.airline.alliance : sel.program.alliance) : null;
    var st = p && alliance ? find(p.statuses, statusEl.value) : null;
    if (!st) { field.hidden = true; return; }
    $("allianceStatusLabel").textContent = alliance + " Status";
    $("allianceStatusValue").textContent = st.alliance || "General";
    field.hidden = false;
  }

  // The alliance of a group program: its own, or that of its member airlines.
  function programAlliance(prog) {
    if (prog.alliance) return prog.alliance;
    var member = (prog.airlines || []).filter(function (a) { return a.alliance; })[0];
    return member ? member.alliance : null;
  }

  function airlineLabel(p, al) {
    return al.name + " | " + ((al.program && al.program.programName) || p.programName);
  }

  // One <optgroup> per country. A program that covers several airlines
  // (Flying Blue, Miles & More, IAG) lists each airline under its own
  // country, with the value "program:airline". Choices sort by name inside
  // each group. A search filter keeps only matching choices.
  var pinned = window.COUNTRIES.filter(function (c) { return c.pinned; });
  var others = window.COUNTRIES.filter(function (c) { return !c.pinned; })
    .sort(function (a, b) { return a.label.localeCompare(b.label); });
  var countryOrder = pinned.concat(others);
  var CODES = window.AIRLINE_CODES || {};
  function searchText(value, label, country, p) {
    // Grouped airlines match on their own name, program, and code, not the
    // group's name ("Lufthansa Group"), so "luft" finds only Lufthansa.
    var group = value.indexOf(":") === -1 ? (p.name || "") : "";
    // The airline name without spaces too, so "elal" finds "El Al".
    var compact = label.split(" | ")[0].replace(/\s+/g, "");
    return [label, compact, country.label, CODES[value] || "", p.programName || "", group].join(" ").toLowerCase();
  }
  // Whether a typed word is one of the country's two- or three-letter
  // ISO codes (or "UK"), compared without regard to case.
  function countryCode(c, w) {
    return (w.length === 2 || w.length === 3) && (c.codes || []).some(function (k) { return k.toLowerCase() === w; });
  }
  function isAnyCountryCode(w) {
    return window.COUNTRIES.some(function (c) { return countryCode(c, w); });
  }
  // Choices that match a search, grouped by country in menu order.
  function collect(filter) {
    var words = String(filter || "").toLowerCase().split(/\s+/).filter(Boolean);
    var groups = [];
    countryOrder.forEach(function (c) {
      var choices = [];
      Object.keys(PROGRAMS).forEach(function (key) {
        var p = PROGRAMS[key];
        var add = function (value, label) {
          var text = searchText(value, label, c, p);
          // A two-letter code matches only as a whole code (so "AA" does not
          // match every name with a double a).
          var ok = words.every(function (w) {
            if (w.length === 2 && CODES[value] && CODES[value].toLowerCase().split("/").indexOf(w) !== -1) return true;
            // A country's ISO code ("JP", "JPN") lists every program there,
            // and only those (plus an airline with that two-letter code).
            if (countryCode(c, w)) return true;
            if (isAnyCountryCode(w)) return false;
            return text.indexOf(w) !== -1;
          });
          if (ok) choices.push([value, label]);
        };
        if (p.airlines) {
          // Each airline sits under its own country.
          p.airlines.forEach(function (al) {
            // An airline can sit under several countries (Transavia: NL and FR).
            var homes = al.countries || [al.country || p.country || "US"];
            // An airline credited to a choice of programs (Condor) is listed
            // once; the form then asks which program (creditChoice).
            if (al.menuHidden) return;
            if (homes.indexOf(c.id) !== -1) add(key + ":" + al.id, al.menuLabel || airlineLabel(p, al));
          });
        } else if ((p.country || "US") === c.id) {
          add(key, p.name);
        }
      });
      choices.sort(function (a, b) { return a[1].localeCompare(b[1]); });
      if (choices.length) groups.push({ label: c.label, items: choices });
    });
    // A search that starts an airline's name ("El Al", "united") lists
    // that airline first, in a "Best match" group.
    var q = words.join(" ");
    if (q.length >= 3) {
      var best = [];
      groups = groups.map(function (g) {
        var rest = g.items.filter(function (ch) {
          var name = ch[1].split(" | ")[0].toLowerCase();
          var hit = name.indexOf(q) === 0 || name.replace(/\s+/g, "").indexOf(q.replace(/\s+/g, "")) === 0;
          if (hit && !best.some(function (t) { return t[0] === ch[0]; })) best.push(ch);
          return !hit;
        });
        return { label: g.label, items: rest };
      }).filter(function (g) { return g.items.length; });
      if (best.length) groups.unshift({ label: "Best match", items: best });
    }
    // A search that is exactly an airline's IATA code ("EW", "LL", "4Y")
    // lists that airline first, in its own group above the country groups.
    if (words.length === 1 && words[0].length === 2) {
      var top = [];
      groups = groups.map(function (g) {
        var rest = g.items.filter(function (ch) {
          var hit = CODES[ch[0]] && CODES[ch[0]].toLowerCase().split("/").indexOf(words[0]) !== -1;
          // An airline listed under two countries (Transavia) shows once.
          if (hit && !top.some(function (t) { return t[0] === ch[0]; })) top.push(ch);
          return !hit;
        });
        return { label: g.label, items: rest };
      }).filter(function (g) { return g.items.length; });
      if (top.length) groups.unshift({ label: "Airline code " + words[0].toUpperCase(), items: top });
    }
    return groups;
  }
  // The hidden select holds the chosen program for the rest of the app.
  function buildMenu() {
    programEl.replaceChildren();
    programEl.appendChild(option("", "Choose a program"));
    collect("").forEach(function (g) {
      var group = document.createElement("optgroup");
      group.label = g.label;
      g.items.forEach(function (ch) { group.appendChild(option(ch[0], ch[1])); });
      programEl.appendChild(group);
    });
    // Airlines left out of the menu (menuHidden) still need an option, so
    // the credited-program question can select them; they show the label
    // of the entry that stands for them.
    Object.keys(PROGRAMS).forEach(function (key) {
      var p = PROGRAMS[key];
      if (!p.airlines) return;
      var shown = p.airlines.filter(function (a) { return !a.menuHidden; })[0];
      p.airlines.forEach(function (al) {
        if (!al.menuHidden) return;
        var o = option(key + ":" + al.id, shown && shown.menuLabel ? shown.menuLabel : airlineLabel(p, al));
        o.hidden = true;
        programEl.appendChild(o);
      });
    });
    programEl.value = "";
  }
  buildMenu();

  function setCurrency(code) {
    moneyEls.forEach(function (el) {
      el.querySelector("span").textContent = symbols[code];
      el.classList.toggle("wide", symbols[code].length > 1);
      // The empty field shows the currency code (USD, EUR, TRY), not 0.00.
      el.querySelector("input").placeholder = code;
    });
  }

  // The chosen menu entry: a program, plus an airline for group programs.
  function selection() {
    var parts = programEl.value.split(":");
    var p = PROGRAMS[parts[0]];
    var airline = p && p.airlines ? find(p.airlines, parts[1]) : null;
    return { program: p, airline: airline };
  }

  // The chosen program as it applies to the chosen airline. An airline can
  // carry its own program fields (IAG: British Airways Club or Iberia Club).
  function current() {
    var s = selection();
    var p = s.program;
    if (p && s.airline && s.airline.program) p = Object.assign({}, p, s.airline.program);
    // A fare type can set its own currency (GOL: reais within South
    // America, US dollars elsewhere).
    if (p && p.fareTypes) {
      var ft = find(p.fareTypes, fareTypeEl.value);
      if (ft && ft.currency) p = Object.assign({}, p, { currency: ft.currency });
    }
    return p;
  }

  // Route picker (Air New Zealand): From, To and Fare choose the route
  // group zone ("tasman-1-1"), so members never read the group lists.
  var routePickField = $("routePickField"), routeFromEl = $("routeFrom"), routeToEl = $("routeTo");
  var routeFareEl = $("routeFare"), routeFareWrap = $("routeFareWrap");
  function pickerRoutes(p) {
    // { "AKL": { "SYD": "tasman-1", ... }, ... }
    var map = {};
    Object.keys(p.routePicker.routes).forEach(function (g) {
      p.routePicker.routes[g].split(" ").forEach(function (pair) {
        var ab = pair.split("-");
        (map[ab[0]] = map[ab[0]] || {})[ab[1]] = g;
      });
    });
    return map;
  }
  function cityOf(p, code) { return p.routePicker.cities[code] || code; }
  function byCity(p) { return function (a, b) { return cityOf(p, a).localeCompare(cityOf(p, b)); }; }
  function routeGroup(p) {
    var map = pickerRoutes(p);
    return (map[routeFromEl.value] || {})[routeToEl.value] || null;
  }
  function familyFares(p, g) { return p.routePicker.fares[g.replace(/-\d+$/, "")] || null; }
  function syncRouteZone() {
    var p = current();
    if (!p || !p.routePicker) return;
    var g = routeGroup(p);
    if (!g) return;
    var fares = familyFares(p, g);
    if (fares) {
      if (routeFareEl.dataset.family !== g.replace(/-\d+$/, "")) {
        var keep = routeFareEl.selectedIndex;
        routeFareEl.replaceChildren();
        fares.forEach(function (f, i) { routeFareEl.appendChild(option(String(i), f)); });
        routeFareEl.dataset.family = g.replace(/-\d+$/, "");
        routeFareEl.selectedIndex = keep >= 0 && keep < fares.length ? keep : 0;
      }
    }
    routeFareWrap.hidden = !fares;
    zoneEl.value = g + "-" + (fares ? routeFareEl.value : "0");
    resultEl.hidden = true;
  }
  function fillRouteTo(p) {
    var map = pickerRoutes(p);
    var keep = routeToEl.value;
    routeToEl.replaceChildren();
    Object.keys(map[routeFromEl.value] || {}).sort(byCity(p)).forEach(function (c) {
      routeToEl.appendChild(option(c, c + " \u00b7 " + cityOf(p, c)));
    });
    if (keep && map[routeFromEl.value] && map[routeFromEl.value][keep]) routeToEl.value = keep;
    syncRouteZone();
  }
  function setupRoutePicker(p) {
    if (!p || !p.routePicker) return;
    var map = pickerRoutes(p);
    routeFromEl.replaceChildren();
    Object.keys(map).sort(byCity(p)).forEach(function (c) {
      routeFromEl.appendChild(option(c, c + " \u00b7 " + cityOf(p, c)));
    });
    routeFromEl.value = map[HQ[programEl.value]] ? HQ[programEl.value] : routeFromEl.options[0].value;
    delete routeFareEl.dataset.family;
    fillRouteTo(p);
    $("routePickHint").textContent = p.zoneHint || "";
  }
  // What the picker shows, for the result card.
  function routePick(p) {
    var g = routeGroup(p);
    var z = find(p.zones, zoneEl.value);
    var fares = g ? familyFares(p, g) : null;
    return {
      from: routeFromEl.value, fromCity: cityOf(p, routeFromEl.value),
      to: routeToEl.value, toCity: cityOf(p, routeToEl.value),
      groupName: z ? z.name.split(":")[0] : "",
      fare: fares ? fares[+routeFareEl.value] + " fare" : ""
    };
  }
  routeFromEl.addEventListener("change", function () { fillRouteTo(current()); });
  routeToEl.addEventListener("change", syncRouteZone);
  routeFareEl.addEventListener("change", syncRouteZone);

  // Percentage bonuses chosen from extra menus (El Al: FLY CARD holders
  // earn 10% or 20% more; EXECUTIVE members 20% more in Premium and
  // Business). Each p.extras entry is { id, label, hint, options:
  // [{ id, name, pct, premiumOnly }] }.
  var extrasWrap = $("extrasWrap");
  function syncExtras(p) {
    extrasWrap.replaceChildren();
    if (!p || !p.extras) return;
    p.extras.forEach(function (x) {
      var field = document.createElement("div");
      field.className = "field";
      var label = document.createElement("label");
      label.htmlFor = "extra-" + x.id;
      label.textContent = x.label;
      var sel = document.createElement("select");
      sel.id = "extra-" + x.id;
      x.options.forEach(function (o) { sel.appendChild(option(o.id, o.name)); });
      sel.addEventListener("change", function () { resultEl.hidden = true; });
      field.append(label, sel);
      // A question that matters only in some cabins (EXECUTIVE Circle: Premium
      // and Business) shows only for those fares.
      if (x.premiumOnly) field.dataset.premiumOnly = "1";
      if (x.hint) { var h = document.createElement("small"); h.textContent = x.hint; field.appendChild(h); }
      extrasWrap.appendChild(field);
    });
  }
  function syncExtraVisibility() {
    var p = current();
    var ft = p && p.fareTypes ? find(p.fareTypes, fareTypeEl.value) : null;
    extrasWrap.querySelectorAll("[data-premium-only]").forEach(function (field) {
      var show = !!(ft && ft.premium);
      field.hidden = !show;
      // Hidden questions go back to their first answer ("No").
      if (!show) field.querySelector("select").selectedIndex = 0;
    });
  }

  // The bonuses that apply: [{ name, pct }].
  function extraBonuses(p, fareType) {
    var out = [];
    if (fareType && fareType.bonusPct) out.push({ name: fareType.bonusName || fareType.name, pct: fareType.bonusPct });
    // A card can add a percentage to the flight points (El Al FLY CARD).
    var heldCard = p.cards && usedCardYes.checked ? find(p.cards, cardEl.value) : null;
    if (heldCard && heldCard.flightBonusPct) out.push({ name: heldCard.bonusName || heldCard.name, pct: heldCard.flightBonusPct });
    (p.extras || []).forEach(function (x) {
      var el = $("extra-" + x.id);
      var o = el ? find(x.options, el.value) : null;
      if (o && o.pct && (!o.premiumOnly || (fareType && fareType.premium))) out.push({ name: o.bonusName || o.name, pct: o.pct });
      // Chosen, but this fare does not qualify: say so instead of
      // silently leaving the bonus out (El Al EXECUTIVE Circle in Economy).
      else if (o && o.pct && o.premiumOnly) out.push({ name: o.bonusName || o.name, pct: 0, note: o.skipNote || "not in this cabin" });
    });
    return out;
  }

  // The airport box examples: the airline's headquarters airport to PHL.
  var HQ = window.HQ_AIRPORTS || {};
  function syncAirportExamples() {
    var from = HQ[programEl.value];
    $("fromAirport").placeholder = "From (" + (from && from !== "PHL" ? from : "JFK") + " or city)";
    $("toAirport").placeholder = "To (PHL or city)";
  }
  function onProgramChange() {
    syncAirportExamples();
    applyProgram();
  }

  // How the form looks before any program is chosen, so clearing the
  // program can put it back.
  var initialHidden = Array.prototype.map.call(form.querySelectorAll("[id]"), function (el) {
    return [el, el.hidden];
  });

  // Rebuilds the form for the current program and airline.
  function applyProgram() {
    var p = current();
    // A program credited to a choice of partner programs (Condor: TrueBlue
    // or Atmos Rewards) asks which one; each choice is one of its airlines.
    var credit = selection();
    var creditField = $("creditField");
    if (credit.program && credit.program.creditChoice) {
      var cc = credit.program.creditChoice;
      $("creditLabel").textContent = cc.label;
      $("creditHint").textContent = cc.hint || "";
      creditEl.replaceChildren();
      credit.program.airlines.forEach(function (a) { creditEl.appendChild(option(a.id, (a.program && a.program.programName) || a.name)); });
      creditEl.value = credit.airline ? credit.airline.id : credit.program.airlines[0].id;
      creditField.hidden = false;
    } else {
      creditField.hidden = true;
    }
    statusEl.replaceChildren();
    fareTypeEl.replaceChildren();
    if (!p) {
      // No program: back to the starting form.
      initialHidden.forEach(function (pair) { pair[0].hidden = pair[1]; });
      statusEl.appendChild(option("", "Choose a program first"));
      statusEl.disabled = true;
      $("statusLabel").textContent = "Membership Level";
      usedCardNo.checked = true;
      resultEl.hidden = true;
      errorEl.hidden = true;
      return;
    }

    // Programs without an earning table can point to the airline's own
    // miles calculator for the flight (Emirates).
    var ext = p.flightCalculator;
    $("flightEstimateField").hidden = !ext;
    if (ext) {
      $("flightEstimateText").textContent = ext.text;
      var extLink = $("flightEstimateLink");
      extLink.href = ext.url;
      extLink.textContent = ext.label + " \u2197";
    }

    // Show the alliance of the chosen airline (or program).
    var sel = selection();
    var alliance = sel.airline ? sel.airline.alliance : sel.program.alliance;
    // An airline outside the alliance that shares an alliance airline's
    // program says so: inside a group program with alliance tiers
    // (Eurowings, Transavia, LEVEL), or on its own (Jetstar, HK Express,
    // via sharedAlliance). Its own program (AerClub) says nothing more.
    // The status counts on member airlines, not on this airline's flights.
    // Use the group's own statuses: an airline with its own list (Transavia)
    // still shares the group's alliance tiers.
    var hasTier = function (list) { return (list || []).some(function (s) { return s.alliance; }); };
    var tiered = hasTier(p.statuses) || hasTier(sel.program.statuses);
    var shared = alliance ? null
      : (p.sharedAlliance || (sel.airline && tiered ? programAlliance(sel.program) : (sel.program.sharedAlliance || null)));
    var allianceEl = $("allianceValue");
    // A non-member that shares an alliance airline's program names that
    // alliance ("Not part of Star Alliance."); others say "an alliance".
    allianceEl.textContent = alliance || (shared ? "Not part of " + shared + "." : "Not part of an alliance.");
    if (shared) {
      var progName = sel.airline ? airlineLabel(sel.program, sel.airline).split(" | ")[1] : (sel.program.statusProgramName || sel.program.programName || "");
      var airName = sel.airline ? sel.airline.name : sel.program.name.split(" | ")[0];
      // The shared-program line goes on its own line.
      allianceEl.appendChild(document.createElement("br"));
      allianceEl.appendChild(document.createTextNode(progName + " status is recognized on " + shared +
        " member airlines, but " + shared + " benefits are not guaranteed on " + airName + " flights."));
    }
    $("allianceValue").classList.toggle("none", !alliance);
    // The Alliance field shows for alliance members, and for airlines that
    // share an alliance airline's program (Eurowings, Transavia, Jetstar),
    // where it explains how status counts. It is hidden otherwise.
    $("allianceField").hidden = !alliance && !shared;

    setCurrency(p.currency || "USD");
    p.statuses.forEach(function (s) { statusEl.appendChild(option(s.id, statusLabel(s, p))); });
    statusEl.disabled = p.statuses.length < 2;
    // The level menu is named after the program ("AAdvantage Level").
    var progName = p.programName || ((p.name || "").split(" | ")[1] || "");
    $("statusLabel").textContent = progName ? progName + " Level" : "Membership Level";
    syncAllianceStatus();

    fareTypeField.hidden = !p.fareTypes;
    if (p.fareTypes) {
      sortFares(p, p.fareTypes).forEach(function (f) { fareTypeEl.appendChild(option(f.id, f.name)); });
      if (p.defaultFareType) fareTypeEl.value = p.defaultFareType;
      else fareTypeEl.value = p.fareTypes[1 < p.fareTypes.length ? 1 : 0].id;
      setCurrency(current().currency || "USD");
    }

    // Ask about a co-branded card only for programs with card data.
    cardEl.replaceChildren();
    // Programs where holding the card raises the flight earn rate (Frontier)
    // ask about it first; the payment question only follows a Yes.
    // A program can word the card question its own way (El Al: holding a
    // FLY CARD earns a bonus however you pay).
    $("cardLegend").textContent = p.cardQuestion || "Did you pay with the airline's co-branded credit or debit card?";
    $("cardSelectHint").textContent = p.cardHint || "Card points are earned on the full amount charged, taxes included.";
    cardmemberField.hidden = !p.cardmember;
    if (p.cardmember) {
      $("cardmemberLegend").textContent = p.cardmember.question;
      $("cardmemberHint").textContent = p.cardmember.hint || "";
    } else {
      cardmemberNo.checked = true;
    }
    cardField.hidden = !p.cards || (!!p.cardmember && !cardmemberYes.checked);
    if (p.cards) {
      // Group credit and debit cards when a program has both.
      var debit = p.cards.filter(function (c) { return c.kind === "debit"; });
      var credit = p.cards.filter(function (c) { return c.kind !== "debit"; });
      [["Credit cards", credit], ["Debit cards", debit]].forEach(function (g) {
        if (!g[1].length) return;
        var parent = cardEl;
        var byBank = g[0] === "Credit cards" && g[1].some(function (c) { return c.bank; });
        if (debit.length && !byBank) {
          parent = document.createElement("optgroup");
          parent.label = g[0];
          cardEl.appendChild(parent);
        }
        // Cards with a bank are grouped under that bank.
        // (Debit cards keep their own "Debit cards" heading.)
        if (g[0] === "Credit cards" && g[1].some(function (c) { return c.bank; })) {
          parent = cardEl;
          var groups = {};
          // US-issued cards first, then home-market cards, each in listed order.
          var isUS = function (c) { return /\(US\)$/.test(c.bank || ""); };
          g[1].filter(isUS).concat(g[1].filter(function (c) { return !isUS(c); })).forEach(function (c) {
            if (c.separator) return;
            var label = c.bank || "Other";
            if (!groups[label]) {
              groups[label] = document.createElement("optgroup");
              groups[label].label = label;
              parent.appendChild(groups[label]);
            }
            groups[label].appendChild(option(c.id, c.name));
          });
          return;
        }
        g[1].forEach(function (c) {
          // A separator entry draws a "---" line that cannot be chosen.
          if (c.separator) {
            var sep = option("", "---");
            sep.disabled = true;
            parent.appendChild(sep);
            return;
          }
          parent.appendChild(option(c.id, c.name));
        });
      });
    }
    if (!p.cards) usedCardNo.checked = true;
    // Some airlines name their carrier fee (Frontier: Carrier Interface Fee).
    $("carrierLabel").textContent = p.carrierLabel || "Carrier-imposed Fees";
    $("carrierHint").textContent = p.carrierHint || "Fuel or other airline surcharges (YQ/YR), if any. Leave blank if none.";
    $("fareTypeLabel").textContent = p.fareTypeLabel || "Fare Type";
    // An optional upgrade bonus per route (SAS Upgrade bids).
    upgradeEl.replaceChildren();
    upgradeField.hidden = !p.upgradeBonus;
    if (p.upgradeBonus) {
      $("upgradeLabel").textContent = p.upgradeBonus.label;
      $("upgradeHint").textContent = p.upgradeBonus.hint || "";
      p.upgradeBonus.options.forEach(function (o) { upgradeEl.appendChild(option(o.id, o.name)); });
    }
    // Seats and bags earn like the fare on some airlines (Frontier, Allegiant, Breeze).
    addonsField.hidden = !p.addons;
    buildExtraFields(p);
    // Extras that do not earn sit after the carrier fees (IAG); extras that
    // earn sit right after the fare (Frontier, Allegiant, Breeze, WestJet).
    var carrierFieldEl = $("carrierField");
    if (p.addonsNoEarn) carrierFieldEl.after(addonsField);
    else carrierFieldEl.before(addonsField);
    // An airline can name its own extras (WestJet: upgrades, not bundles).
    $("addonsLabel").textContent = p.addonsLabel || "Seats, Bags and/or Bundles";
    $("addonsHint").textContent = p.addonsHint || "Seat selection, carry-on and checked bags, or a bundle, bought on this booking. They earn points like the fare.";
    // A direct booking bonus question (JetBlue).
    directField.hidden = !p.direct;
    if (p.direct) $("directLegend").textContent = p.direct.question;
    directYes.checked = true;
    // GoWild! Pass bookings (Frontier).
    gowildField.hidden = !p.gowild;
    if (!p.gowild && gowildYes.checked) gowildNo.checked = true;
    syncGoWild();
    syncCardSelect();

    zoneEl.replaceChildren();
    if (p.zones) p.zones.forEach(function (z) { zoneEl.appendChild(option(z.id, z.name)); });
    // A program can preselect a route (Turkish: within Türkiye).
    if (p.defaultZone) zoneEl.value = p.defaultZone;
    setupRoutePicker(p);
    earnEl.replaceChildren();
    earnField.hidden = !p.earnMethods;
    if (p.earnMethods) p.earnMethods.forEach(function (m) { earnEl.appendChild(option(m.id, m.name)); });
    $("earnLabel").textContent = p.earnLabel || "How you earn";
    $("earnHint").textContent = p.earnHint || "The way you chose in your account.";
    syncEarnFields();
    resultEl.hidden = true;
    errorEl.hidden = true;
  }

  // Distance, segment, and route-band earning do not depend on the price,
  // so those programs skip the airfare and taxes fields.
  function usesFare(method) {
    return method !== "distance" && method !== "segments" && method !== "zone" && method !== "cardOnly";
  }

  // The charge field shows when a card's points cannot come from the fare
  // fields: the card bills in another currency, or no fare was entered.
  function isCardmember(p) {
    return !!(p && p.cardmember && cardmemberYes.checked);
  }
  function syncCardmember() {
    var p = current();
    if (!p) return;
    cardField.hidden = !p.cards || (!!p.cardmember && !cardmemberYes.checked);
    if (cardField.hidden) usedCardNo.checked = true;
    syncCardSelect();
    resultEl.hidden = true;
  }

  var wasCardOnly = false;
  function syncCardSelect() {
    var p = current();
    // A program listed only for its credit cards (Emirates) always uses one,
    // so the card question is skipped.
    var cardOnly = !!(p && p.method === "cardOnly");
    if (cardOnly) { cardField.hidden = true; usedCardYes.checked = true; }
    else if (wasCardOnly) usedCardNo.checked = true;
    wasCardOnly = cardOnly;
    cardSelectField.hidden = (cardField.hidden && !cardOnly) || !usedCardYes.checked;
    var card = p && p.cards && !cardSelectField.hidden ? find(p.cards, cardEl.value) : null;
    var foreign = !!(card && card.currency && card.currency !== (p.currency || "USD"));
    var noFare = !!(card && !usesFare(earnMethod(p).id));
    cardChargeField.hidden = !(foreign || noFare);
    // A card with its own foreign-currency rate asks how the ticket was
    // charged (El Al FLY CARD PREMIUM: 1 per NIS 4 in shekels, 3 abroad).
    $("cardFxField").hidden = !(card && card.foreignRate);
    if (card && card.foreignRate) {
      var fxCode = card.currency || p.currency || "USD";
      var fxSym = cardSymbols[fxCode];
      var fxName = CURRENCY_NAMES[fxCode] || fxCode;
      $("cardFxLabel").textContent = "Was the ticket charged in " + fxName + " or a foreign currency?";
      $("cardFxLocal").textContent = fxName.charAt(0).toUpperCase() + fxName.slice(1);
      $("cardFxHint").textContent = "1 per " + fxSym + num.format(card.per) + " in " + fxName + ", 1 per " + fxSym + num.format(card.foreignPer) + " in a foreign currency." + (p.cardFxHint ? " " + p.cardFxHint : "");
    }
    if (card) {
      var code = card.currency || p.currency || "USD";
      $("cardChargeCurrency").textContent = cardSymbols[code];
      $("cardChargeSymbol").textContent = cardSymbols[code];
      $("cardCharge").placeholder = code;
      $("cardChargeHint").textContent = card.flightBonusPct
        ? "Enter the total charged to the card in " + cardSymbols[code] + ", from your card statement. Leave it blank if you paid another way."
        : foreign
        ? "This card earns in a different currency than the fare. Enter the total from your card statement."
        : "Enter the total charged to your card for this ticket, taxes included.";
    }
  }

  // How the chosen program earns: its fixed method, or the member's choice.
  function earnMethod(p) {
    if (!p.earnMethods) return { id: p.method };
    var e = find(p.earnMethods, earnEl.value);
    // An earning choice can name its method separately from its own id, so
    // two choices can use the same method (Condor on Atmos Rewards: 1 point
    // per mile, or a share of the distance by cabin).
    return e.method ? Object.assign({}, e, { id: e.method, choice: e.id }) : e;
  }

  function syncEarnFields() {
    var p = current();
    if (!p) return;
    var m = earnMethod(p).id;
    distanceField.hidden = m !== "distance";
    distanceEl.required = m === "distance";
    segmentsField.hidden = m !== "segments";
    var zoneUsed = m === "zone" || (m === "distance" && !!p.zones);
    // A route picker (Air New Zealand) stands in for the route group menu.
    var picker = m === "zone" && !!p.routePicker;
    routePickField.hidden = !picker;
    // A single route (Transavia: any flight) needs no menu.
    var oneZone = m === "zone" && !!p.zones && p.zones.length === 1;
    zoneField.hidden = !zoneUsed || picker || oneZone;
    // A program can show the route menu right under the fare type (Turkish);
    // otherwise it stays in its usual place, after the amounts.
    if (p.zoneAfterFare) $("fareTypeField").after(zoneField);
    else zoneHome.after(zoneField);
    syncExtras(p);
    syncExtraVisibility();
    $("zoneLabel").textContent = p.zoneLabel || "Route and distance";
    $("zoneHint").textContent = p.zoneHint || "This program awards a fixed amount per flight for each route band.";
    // Fare types can belong to some routes only (Aegean: booking classes
    // group differently on domestic and international flights).
    if (p.fareTypes && p.fareTypes.some(function (f) { return f.zones; })) {
      var zid = zoneEl.value, prevFare = fareTypeEl.value;
      var fares = p.fareTypes.filter(function (f) { return !f.zones || f.zones.indexOf(zid) >= 0; });
      fareTypeEl.replaceChildren();
      sortFares(p, fares).forEach(function (f) { fareTypeEl.appendChild(option(f.id, f.name)); });
      var zDefault = p.zoneDefaultFare && p.zoneDefaultFare[zid];
      var hasFare = function (id) { return fares.some(function (f) { return f.id === id; }); };
      fareTypeEl.value = hasFare(prevFare) ? prevFare : (zDefault && hasFare(zDefault) ? zDefault : fares[0].id);
    }
    // A route type that pays a fixed amount needs no distance.
    var fixedZone = m === "distance" && p.zones && find(p.zones, zoneEl.value).fixed;
    if (fixedZone) { distanceField.hidden = true; distanceEl.required = false; }
    // Some earning choices do not depend on the booking class (Sky Pearl).
    fareTypeField.hidden = !p.fareTypes || !!earnMethod(p).noFareType;
    fareFields.hidden = !usesFare(m);
    // Load the airport list once a distance-based program is chosen.
    if (!distanceField.hidden) ensureAirports();
    syncRoutes();
    airfareEl.required = usesFare(m);
    syncCardSelect();
    resultEl.hidden = true;
  }

  // A GoWild! booking: the fare is one cent and the Early Booking Fee earns
  // at the status and fare type rate.
  function goWildOn() {
    var p = current();
    return !!(p && p.gowild && gowildYes.checked);
  }
  function syncGoWild() {
    var on = goWildOn();
    gowildFeeField.hidden = !on;
    // GoWild! fares are fixed at one cent and have no carrier-imposed fees.
    if (on) airfareEl.value = "0.01";
    else if (airfareEl.readOnly) airfareEl.value = "";
    airfareEl.readOnly = on;
    // Hidden on GoWild bookings and for airlines without carrier surcharges.
    var cp = current();
    $("carrierField").hidden = on || !!(cp && cp.noCarrier);
    $("airfareHint").textContent = on
      ? "GoWild! fares are one cent and earn 1 mile."
      : "Base fare, before fees and taxes.";
    resultEl.hidden = true;
  }

  function find(list, id) {
    for (var i = 0; i < list.length; i++) if (list[i].id === id) return list[i];
    return list[0];
  }

  // Returns { points, rateLabel, capped }.
  function calculate(p, status, fareType, airfare, distance, airline, segments) {
    var points, rateLabel;
    var em = earnMethod(p);

    if (em.id === "cardOnly") {
      // Listed only for its credit cards: the flight itself is not estimated.
      points = 0;
      rateLabel = p.flightLabel || "not estimated";
    } else if (em.id === "zone") {
      // Fixed points by route band and fare, plus the status bonus.
      var zone = find(p.zones, zoneEl.value);
      var fi = p.fareTypes.indexOf(fareType);
      var base = zone.points[fi];
      if (base == null) return { error: fareType.name + (p.unavailableText || " is not sold on this route.") };
      var bonusBase = fareType.premium && p.bonusBaseFare
        ? zone.points[p.fareTypes.indexOf(find(p.fareTypes, p.bonusBaseFare))] : base;
      var bonus = Math.round(bonusBase * (status.bonus || 0));
      points = base + bonus;
      rateLabel = bonus ? num.format(base) + " base + " + num.format(bonus) + " status bonus" : "fixed for this fare and route";
      // A minimum per flight by fare, after the status bonus (Jetstar).
      var floor = zone.min ? zone.min[fi] : (p.zoneMin ? p.zoneMin[fi] : null);
      if (floor && points < floor) {
        points = floor;
        rateLabel += ", raised to the " + num.format(floor) + " minimum per flight";
      }
      // A won upgrade bid adds a fixed amount per route, plus the status bonus.
      var up = p.upgradeBonus ? find(p.upgradeBonus.options, upgradeEl.value) : null;
      if (up && up.points) {
        var upBase = up.points[zone.id];
        if (upBase == null) return { error: up.name + " is not offered on this route." };
        var upPoints = upBase + Math.round(upBase * (status.bonus || 0));
        points += upPoints;
        rateLabel += ", plus " + num.format(upPoints) + " for the upgrade";
      }
    } else if (em.id === "segments") {
      var perSegment = em.perSegment * status.multiplier;
      points = segments * perSegment;
      rateLabel = num.format(perSegment) + " " + p.unit + " per segment";
    } else if (em.id === "price") {
      var perDollar = em.rate * status.multiplier;
      points = airfare * perDollar;
      rateLabel = num.format(perDollar) + " " + p.unit + " per " + symbols[p.currency || "USD"];
    } else if (em.id === "distance") {
      // What a fare earns: a share of the distance (a number), a share with a
      // minimum per flight ({ share, min }), or a fixed amount ({ fixed }).
      // With zones, fareType.earn lists one of these per zone; elite members
      // can have their own list (fareType.eliteEarn, Turkish Airlines).
      var dZone = p.zones ? find(p.zones, zoneEl.value) : null;
      var zi = dZone ? p.zones.indexOf(dZone) : 0;
      var specs = fareType && status.elite && fareType.eliteEarn ? fareType.eliteEarn : (fareType && fareType.earn);
      var spec = specs ? specs[zi] : (fareType ? fareType.rate : 1);
      if (spec == null) return { error: fareType.name + (p.unavailableText || " does not earn on this route.") };
      if (typeof spec === "object" && spec.fixed != null) {
        // Some programs add the status bonus to fixed amounts (Aegean).
        var fixedMult = p.bonusOnFixed ? (status.multiplier || 1) : 1;
        points = spec.fixed * fixedMult;
        rateLabel = "fixed for this fare and route" + (fixedMult !== 1 ? ", plus " + Math.round((fixedMult - 1) * 100) + "% status bonus" : "");
      } else {
        var share = typeof spec === "object" ? spec.share : spec;
        var min = typeof spec === "object" ? spec.min : null;
        // Some programs count kilometres (PhoenixMiles); the input is miles.
        var dist = distance * (p.distanceFactor || 1);
        var unitName = p.distanceFactor ? "km" : "mile flown";
        // A minimum distance per flight, before the class share (Sky Pearl).
        var minDistUsed = p.minDistance && dist < p.minDistance;
        if (minDistUsed) dist = p.minDistance;
        var base = dist * share;
        var minUsed = min != null && base < min;
        if (minUsed) base = min;
        // A fare class can set the share of distance earned (Virgin Atlantic).
        // Some fares are excluded from the status bonus (KrisFlyer). A status
        // bonus can also be added on top of the fare share (Etihad).
        if (status.bonus != null) {
          points = base + dist * status.bonus;
          rateLabel = num.format(share + status.bonus) + " " + unitFor(share + status.bonus, p.unit) + " per " + unitName;
        } else {
          var mult = fareType && fareType.noBonus ? 1 : (status.multiplier || 1);
          // A status can set its multiplier per route type (Philippine
          // Airlines: 75% more to and from the US and Canada, 25% elsewhere).
          if (status.multipliers && dZone && status.multipliers[dZone.id] != null) mult = status.multipliers[dZone.id];
          if (fareType && fareType.bonusOnDistance && mult !== 1) {
            // The status bonus is a share of the distance flown, not of the
            // earned miles (Philippine Airlines Business Class).
            points = base + dist * (mult - 1);
            rateLabel = num.format(share + mult - 1) + " " + unitFor(share + mult - 1, p.unit) + " per " + unitName;
          } else {
            points = base * mult;
            rateLabel = num.format(share * mult) + " " + unitFor(share * mult, p.unit) + " per " + unitName;
          }
        }
        if (minUsed) rateLabel += ", with the " + num.format(min) + " minimum per flight";
        if (minDistUsed) rateLabel += ", counted as the " + num.format(p.minDistance) + " km minimum";
      }
    } else if (em.id === "tiered") {
      points = 0;
      var floor = 0;
      p.tiers.forEach(function (t) {
        var slice = Math.max(0, Math.min(airfare, t.upTo) - floor);
        points += slice * t.rate;
        floor = t.upTo;
      });
      rateLabel = "1 per $ up to $500, 2 per $ above";
    } else {
      // A status can list its own rate per fare type (Frontier), or the
      // fare type sets the rate and the status scales it (Southwest, Breeze).
      var rate = fareType
        ? (status.rates ? status.rates[fareType.id + (isCardmember(p) ? "Card" : "")] : fareType.rate * status.multiplier)
        : status.rate;
      // Programs spanning several airlines can set their own elite rate.
      if (airline && status.elite && airline.eliteRate) rate = airline.eliteRate;
      // A status can add a flat amount per unit of currency (Air Europa, Xiamen).
      if (status.addRate) rate += status.addRate;
      // Booking direct adds a bonus by fare type (JetBlue), or a flat
      // amount per unit of currency (IndiGo: 4 BluChips per ₹100).
      if (p.direct && directYes.checked) rate += fareType && p.direct.rates ? (p.direct.rates[fareType.id] || 0) : (p.direct.rate || 0);
      // Some programs round the spend first (Fortune Wings: nearest HK$10,
      // with anything under HK$10 counted as HK$10).
      var spend = airfare;
      if (p.roundSpendTo && spend > 0) spend = Math.max(p.roundSpendTo, Math.round(spend / p.roundSpendTo) * p.roundSpendTo);
      points = spend * rate;
      var sym = symbols[p.currency || "USD"];
      // A program can state its rate in its own words (SAA: 1 mile per R1.60).
      rateLabel = p.rateText ? p.rateText : p.rateAsPercent
        ? num.format(rate * 100) + "% of the fare"
        : p.ratePer
          ? num.format(rate * p.ratePer) + " " + unitFor(rate * p.ratePer, p.unit) + " per " + sym + p.ratePer
          : num.format(rate) + " " + unitFor(rate, p.unit) + " per " + sym;
      // Percentage bonuses, each figured on the base points (El Al).
      var baseSpendPoints = points;
      extraBonuses(p, fareType).forEach(function (b) {
        if (b.note) { rateLabel += "; no " + b.name + " (" + b.note + ")"; return; }
        points += baseSpendPoints * b.pct;
        rateLabel += " + " + Math.round(b.pct * 100) + "% " + b.name;
      });
      // Some fares add a fixed bonus on top (airBaltic: Flex +100).
      if (fareType && fareType.addPoints) {
        points += fareType.addPoints;
        rateLabel += " + " + num.format(fareType.addPoints) + " fare bonus";
      }
      // Booking direct can add a fixed amount per booking (SpiceJet: 250).
      if (p.direct && p.direct.points && directYes.checked) {
        points += p.direct.points;
        rateLabel += " + " + num.format(p.direct.points) + " direct booking bonus";
      }
    }

    // Distance programs round to the nearest mile; spend programs round down
    // (or up, where the program says so). Airpoints keep two decimals.
    if (p.decimals) points = p.decimalsFloor ? Math.floor(points * 100 + 1e-6) / 100 : Math.round(points * 100) / 100;
    else if (em.id === "distance" && !p.roundUp) points = Math.round(points);
    else if (p.roundNearest) points = Math.round(points);
    else points = p.roundUp ? Math.ceil(points - 1e-9) : Math.floor(points + 1e-6);
    // Some airlines guarantee a minimum per flight (Air Dolomiti: 125 miles).
    if (p.minPoints && points < p.minPoints) {
      points = p.minPoints;
      rateLabel += ", raised to the " + num.format(p.minPoints) + " minimum per flight";
    }
    var capped = false;
    if (p.cap && points > p.cap) {
      points = p.cap;
      capped = true;
    }
    return { points: points, rateLabel: rateLabel, capped: capped };
  }

  function row(dl, term, value) {
    var dt = document.createElement("dt");
    var dd = document.createElement("dd");
    dt.textContent = term;
    dd.textContent = value;
    dl.appendChild(dt);
    dl.appendChild(dd);
  }

  function showError(msg) {
    errorEl.textContent = msg;
    errorEl.hidden = false;
    resultEl.hidden = true;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var p = current();
    if (!p) return showError("Please choose an airline program.");

    // Distance in miles: the exact figure when it came from an airport or
    // route lookup, otherwise the typed value (converted from km if needed).
    var distance = distanceEl.dataset.miles ? Number(distanceEl.dataset.miles)
      : parseFloat(distanceEl.value) / (useKm ? KM_PER_MILE : 1);
    var segments = parseInt(segmentsEl.value, 10);
    var method = earnMethod(p).id;
    var fareUsed = usesFare(method);
    var airfare = fareUsed ? parseFloat(airfareEl.value) : 0;
    var carrier = fareUsed && !p.noCarrier ? (parseFloat(carrierEl.value) || 0) : 0;
    var taxes = fareUsed ? (parseFloat(taxesEl.value) || 0) : 0;
    // Most programs earn on the base fare plus carrier-imposed fees; a few
    // (Southwest, Allegiant) earn on the base fare only.
    // Seats and bags bought on the booking earn like the fare (p.addons).
    var addons = fareUsed && p.addons ? (parseFloat(addonsEl.value) || 0) : 0;
    if (addons < 0) return showError("Seats, bags and/or bundles cannot be negative.");
    // Some airlines list extras that do not earn (British Airways, Iberia,
    // Aer Lingus); they still count toward the trip cost and card earning.
    // An addonsRate means extras earn their own flat rate (Air Transat).
    // A status can set its own extras rate (Cebu Pacific: by card type).
    var addonsStatus = find(p.statuses, statusEl.value);
    var addonsRate = addonsStatus && addonsStatus.addonsRate != null ? addonsStatus.addonsRate : p.addonsRate;
    var earnAddons = p.addonsNoEarn || addonsRate ? 0 : addons;
    // A few programs earn on taxes too (airBaltic: the ticket's total charges).
    var earnBase = airfare + (p.baseFareOnly ? 0 : carrier) + earnAddons + (p.taxesEarn ? taxes : 0);
    var extras = readExtraFields(p);
    if (extras.error) return showError(extras.error);
    var tripCost = airfare + carrier + addons + taxes + extras.total;
    // GoWild!: the fare earns 1 mile, and the Early Booking Fee earns at
    // the status and fare type rate. There are no carrier-imposed fees.
    var gowild = fareUsed && goWildOn();
    var gowildFee = gowild ? (parseFloat(gowildFeeEl.value) || 0) : 0;
    if (gowildFee < 0) return showError("The GoWild Early Booking Fee cannot be negative.");
    if (gowild) {
      airfare = 0.01;
      carrier = 0;
      earnBase = gowildFee + earnAddons;
      tripCost = airfare + gowildFee + addons + taxes;
    }

    if (fareUsed && (!(airfare >= 0) || airfareEl.value === "")) return showError("Please enter your airfare.");
    if (carrier < 0) return showError("Carrier-imposed fees cannot be negative.");
    if (taxes < 0) return showError("Taxes and airport fees cannot be negative.");
    var routeFixed = method === "distance" && p.zones && find(p.zones, zoneEl.value).fixed;
    if (method === "distance" && !routeFixed && !(distance > 0)) return showError("Please enter the miles flown for this trip.");
    if (method === "segments" && !(segments > 0)) return showError("Please enter the number of segments flown.");

    errorEl.hidden = true;
    var cur = p.currency || "USD";
    var usd = money[cur] || (money[cur] = new Intl.NumberFormat(LOCALE, { style: "currency", currency: cur }));
    var status = find(p.statuses, statusEl.value);
    var fareType = p.fareTypes && !earnMethod(p).noFareType ? find(p.fareTypes, fareTypeEl.value) : null;
    var airline = selection().airline;
    var r = calculate(p, status, fareType, earnBase, distance, airline, segments);
    if (r.error) return showError(r.error);
    if (addonsRate && addons) {
      // The extras rate can also take the status's tier bonus (Xiamen:
      // ancillaries earn 0.7 plus the tier multiplier).
      var aRate = addonsRate + (p.addonsAddTier && status && status.addRate ? status.addRate : 0);
      var aPts = addons * aRate;
      r.points += p.decimals ? (p.decimalsFloor ? Math.floor(aPts * 100 + 1e-6) / 100 : Math.round(aPts * 100) / 100) : p.roundUp ? Math.ceil(aPts - 1e-9) : Math.round(aPts);
      if (p.decimals) r.points = Math.round(r.points * 100) / 100;
      r.rateLabel += " + " + (p.ratePer
        ? num.format(aRate * p.ratePer) + " per " + (symbols[cur] || "") + p.ratePer
        : num.format(aRate) + " per " + (p.currency === "CAD" ? "dollar" : symbols[cur] || "unit")) + " on " + (p.addonsRateLabel || "seats and bags");
    }
    // Extra fee fields, each with its own rate per status (Cebu Pacific:
    // partner add-ons and the admin fee).
    extras.items.forEach(function (x) {
      var xRate = status && x.def.rates ? (x.def.rates[status.id] || 0) : 0;
      if (!xRate || !x.amount) return;
      var xPts = x.amount * xRate;
      r.points += p.decimals ? (p.decimalsFloor ? Math.floor(xPts * 100 + 1e-6) / 100 : Math.round(xPts * 100) / 100) : Math.floor(xPts + 1e-6);
      if (p.decimals) r.points = Math.round(r.points * 100) / 100;
      r.rateLabel += " + " + (p.ratePer
        ? num.format(xRate * p.ratePer) + " per " + (symbols[cur] || "") + p.ratePer
        : num.format(xRate) + " per " + (symbols[cur] || "unit")) + " on " + (x.def.rateLabel || x.def.label.toLowerCase());
    });
    if (gowild) {
      r.rateLabel = "1 on the GoWild! fare + " + num.format(r.points) + " on the Early Booking Fee" + (addons ? " and seats, bags and/or bundles" : "") + " at " + r.rateLabel;
      r.points += 1;
    }

    // Card points come on top of flight points and are earned on the
    // full charge, taxes included. The per-ticket cap does not apply.
    var card = p.cards && usedCardYes.checked ? find(p.cards, cardEl.value) : null;
    var cardCurrency = card && card.currency ? card.currency : (p.currency || "USD");
    var foreignCard = cardCurrency !== (p.currency || "USD");
    var charged = tripCost;
    if (card && (foreignCard || !fareUsed)) {
      charged = parseFloat(cardChargeEl.value);
      // A card that earns a flight bonus just for holding it (El Al FLY
      // CARD) can be held without paying with it: no amount, no card points.
      if (!(charged > 0) && card.flightBonusPct) charged = 0;
      else if (!(charged > 0)) return showError("Please enter the amount charged to your card in " + cardSymbols[cardCurrency] + ".");
    }
    // A card's rate can depend on the fare type (Breeze Easy Visa).
    var cardRate = card ? (card.rates && fareType && card.rates[fareType.id] != null ? card.rates[fareType.id] : card.rate) : 0;
    var cardFx = !!(card && card.foreignRate && $("cardFx").value === "foreign");
    if (cardFx) cardRate = card.foreignRate;
    // Programs that count in fractions (Airpoints Dollars) keep two decimals.
    // Some issuers count spend only in whole steps (Axis Bank: per ₹200).
    var cardSpend = card && card.spendStep ? Math.floor(charged / card.spendStep + 1e-9) * card.spendStep : charged;
    var cardEarn = cardSpend * cardRate;
    // Some cards earn a higher rate only up to a spending limit, then a
    // lower rate (Standard Chartered Cathay Mastercard: HK$2 per mile on the
    // first HK$8,000 per promotion period, then HK$6).
    if (card && card.tiers) {
      cardEarn = 0;
      var tierFloor = 0;
      card.tiers.forEach(function (t) {
        var top = t.upTo != null ? t.upTo : Infinity;
        cardEarn += Math.max(0, Math.min(charged, top) - tierFloor) * t.rate;
        tierFloor = top;
      });
    }
    // A tiny allowance keeps float error from dropping a point (3,300,000 x
    // 3/10,000 is 989.9999...).
    var cardPoints = card ? (p.decimals ? Math.floor(cardEarn * 100 + 1e-6) / 100 : Math.floor(cardEarn + 1e-6)) : 0;
    var total = r.points + cardPoints;

    // One line each: airline, membership level with its alliance status, fare
    // and card.
    var lineSel = selection();
    var lineAlliance = lineSel.airline ? lineSel.airline.alliance : lineSel.program.alliance;
    // The airline's IATA code follows its name: "United Airlines (UA) | MileagePlus".
    var firstLine = airline ? airlineLabel(lineSel.program, airline) : p.name;
    var iata = CODES[programEl.value];
    if (iata) {
      var cut = firstLine.indexOf(" | ");
      firstLine = cut === -1 ? firstLine + " (" + iata + ")" : firstLine.slice(0, cut) + " (" + iata + ")" + firstLine.slice(cut);
    }
    var lines = [
      firstLine,
      levelName(p, status) + (lineAlliance && status.alliance ? " | " + lineAlliance + " " + status.alliance : ""),
      fareType ? fareType.name : "",
      card ? card.name + (isCardmember(p) ? " (Cardmember rate)" : "") : (isCardmember(p) ? "Cardmember rate" : "")
    ].filter(Boolean);
    var programLine = $("resultProgram");
    programLine.replaceChildren();
    lines.forEach(function (text, i) {
      if (i) programLine.appendChild(document.createElement("br"));
      programLine.appendChild(document.createTextNode(text));
    });
    var resultLogo = $("resultLogo");
    var logoInfo = LOGOS[programEl.value];
    if (logoInfo) {
      resultLogo.src = logoInfo.logo;
      resultLogo.alt = airline ? airline.name : p.name;
      resultLogo.parentNode.hidden = false;
    } else {
      resultLogo.removeAttribute("src");
      resultLogo.parentNode.hidden = true;
    }
    // The alliance logo or, for an alliance tier, the status badge.
    var ALLIANCE_KEYS = { "Star Alliance": "star", "SkyTeam": "skyteam", "oneworld": "oneworld" };
    var sel = selection();
    var allianceName = sel.airline ? sel.airline.alliance : sel.program.alliance;
    var allianceKey = ALLIANCE_KEYS[allianceName];
    var allianceInfo = allianceKey && LOGOS["alliance:" + allianceKey];
    var tierInfo = allianceKey && status.alliance &&
      LOGOS["status:" + allianceKey + ":" + status.alliance.toLowerCase().replace(/\s+/g, "-")];
    // A member with an alliance tier sees the tier badge; otherwise the
    // alliance logo.
    setBadge($("resultAlliance"), tierInfo ? null : allianceInfo, allianceName);
    setBadge($("resultTier"), tierInfo, allianceName + " " + (status.alliance || ""));
    $("resultBadges").hidden = !allianceInfo && !tierInfo;
    $("resultPoints").textContent = num.format(total);
    $("resultUnit").textContent = p.unit;

    var dl = $("breakdown");
    dl.replaceChildren();
    if (fareUsed) {
      row(dl, "Airfare", usd.format(airfare) + (gowild ? " (GoWild!)" : ""));
      if (gowild) row(dl, "GoWild Early Booking Fee", usd.format(gowildFee));
      if (p.addons && !p.addonsNoEarn) row(dl, p.addonsLabel || "Seats, Bags and/or Bundles", usd.format(addons));
      if (!gowild && !p.noCarrier) row(dl, p.carrierLabel || "Carrier-imposed Fees", usd.format(carrier) + (p.baseFareOnly && carrier ? " (does not earn)" : ""));
      if (p.addons && p.addonsNoEarn) row(dl, p.addonsLabel, usd.format(addons) + (addons ? " (does not earn)" : ""));
      extras.items.forEach(function (x) { if (x.amount) row(dl, x.def.label, usd.format(x.amount)); });
      row(dl, "Taxes & Airport Fees", usd.format(taxes) + (p.taxesEarn && taxes ? " (earns)" : ""));
      row(dl, "Total trip cost", usd.format(tripCost));
    }
    if (method === "distance" && !routeFixed) row(dl, "Distance flown", countedText(p, distance));
    if (method === "distance" && p.zones) row(dl, "Route", find(p.zones, zoneEl.value).name);
    if (method === "segments") row(dl, "Segments flown", num.format(segments));
    if (method === "zone" && p.routePicker) {
      var rp = routePick(p);
      row(dl, "Route", rp.from + " " + rp.fromCity + " \u2192 " + rp.to + " " + rp.toCity + " (" + rp.groupName + ")");
      if (rp.fare) row(dl, "Fare", rp.fare);
    } else if (method === "zone" && p.zones.length > 1) row(dl, "Route", find(p.zones, zoneEl.value).name);
    if (method === "cardOnly") row(dl, "Flight earning", p.flightLabel ? p.flightLabel.charAt(0).toUpperCase() + p.flightLabel.slice(1) : "Not estimated");
    else row(dl, "Flight earning", num.format(r.points) + " (" + r.rateLabel + ")");
    if (card && (card.rate || card.tiers || card.rates) && (charged > 0 || !card.flightBonusPct)) {
      var cardMoney = foreignCard || !fareUsed
        ? cardSymbols[cardCurrency] + charged.toLocaleString(LOCALE, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
        : usd.format(charged);
      var sym = foreignCard || !fareUsed ? cardSymbols[cardCurrency] : symbols[p.currency || "USD"];
      // A card can state its rate as "1 per N" (Airpoints: 1 per NZ$70).
      row(dl, "Card earning", num.format(cardPoints) + " (" +
        (cardFx ? "1 per " + sym + num.format(card.foreignPer) : card.rateText ? card.rateText : card.per ? "1 per " + sym + num.format(card.per) : num.format(cardRate) + " per " + sym) + " on " + cardMoney + (cardFx ? ", foreign currency" : "") + ")");
    }
    // Skip the value rows for programs without a reliable point value.
    if (p.centsPerPoint) {
      var value = total * p.centsPerPoint / 100;
      row(dl, "Approximate value", usd.format(value) + " (at " + p.centsPerPoint + minorUnit[p.currency || "USD"] + " each)");
      if (tripCost > 0) {
        row(dl, "Return on total cost", (value / tripCost * 100).toFixed(1) + "%");
      }
    }

    var extResult = $("resultFlightEstimate");
    extResult.replaceChildren();
    extResult.hidden = !p.flightCalculator;
    if (p.flightCalculator) {
      var extA = document.createElement("a");
      extA.href = p.flightCalculator.url; extA.target = "_blank"; extA.rel = "noopener";
      extA.textContent = p.flightCalculator.label;
      extResult.append("For the miles on the flight itself, use ", extA, ".");
    }
    // One sentence per line, so the rules are easy to scan.
    var noteText = (r.capped ? "This trip hits the per-ticket earning cap. " : "") + p.note + (airline && airline.note ? " " + airline.note : "");
    var noteEl = $("resultNote");
    noteEl.replaceChildren();
    // A numbered list, one sentence per item.
    noteSentences(noteText).forEach(function (line) {
      var li = document.createElement("li");
      li.textContent = line;
      noteEl.appendChild(li);
    });
    // When the rules were last reviewed, and where they come from.
    var srcMap = window.SOURCES || {};
    var srcUrl = srcMap[programEl.value] || srcMap[programEl.value.split(":")[0]];
    var srcEl = $("resultSource");
    var reviewed = (window.REVIEWED || {})[programEl.value];
    srcEl.textContent = "Rules last reviewed " + reviewedText(reviewed) + ".";
    if (srcUrl) {
      var host = srcUrl.replace(/^https?:\/\//, "").split("/")[0].replace(/^www\./, "");
      var a = document.createElement("a");
      a.href = srcUrl; a.target = "_blank"; a.rel = "noopener"; a.textContent = host;
      srcEl.appendChild(document.createTextNode(" Source: "));
      srcEl.appendChild(a);
      if (host === "cwsi.net") srcEl.appendChild(document.createTextNode(", which republishes the airline\u2019s own table"));
      srcEl.appendChild(document.createTextNode("."));
    }
    resultEl.hidden = false;
    // On a single-column (phone) layout, bring the result into view.
    if (window.matchMedia("(max-width: 959px)").matches) {
      resultEl.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
    }
  });

  // Airline logos: a small circular icon for the menu and a short logo for
  // the result. Data only (JSON), fetched from this site.
  var LOGOS = {};
  fetch("js/logos.json", { credentials: "same-origin" })
    .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
    .then(function (data) {
      if (!data || typeof data !== "object") return;
      LOGOS = data;
      if (!listEl.hidden) openList(searchEl.value === chosenLabel() ? "" : searchEl.value);
    })
    .catch(function () { /* The menu works without logos. */ });

  // Splits a note into sentences at ". " before a capital letter or digit,
  // but not after abbreviations such as "U.S." or "vs.".
  function noteSentences(text) {
    var parts = String(text || "").split(/([.!?])\s+(?=[A-Z0-9"\u201c(])/);
    var out = [];
    for (var i = 0; i < parts.length; i += 2) {
      var piece = parts[i] + (parts[i + 1] || "");
      var prev = out[out.length - 1];
      if (prev && /(\bU\.S\.|\bU\.K\.|\bvs\.|\be\.g\.|\bi\.e\.)$/.test(prev)) out[out.length - 1] = prev + " " + piece;
      else out.push(piece);
    }
    return out.filter(Boolean);
  }

  // Shows a small logo image, or hides it when there is none.
  function setBadge(img, info, label) {
    // Alliance logos and status badges use their square icon when there is one.
    if (info && (info.square || info.logo)) { img.src = info.square || info.logo; img.alt = label; img.hidden = false; }
    else { img.removeAttribute("src"); img.alt = ""; img.hidden = true; }
  }

  // Airline program combobox: one box to type in and choose from. Typing
  // filters a dropdown list; a click or Enter chooses an entry.
  var searchEl = $("programSearch");
  var listEl = $("programList");
  var searchStatus = $("programSearchStatus");
  var active = -1;
  function chosenLabel() {
    var o = programEl.selectedOptions[0];
    return o && o.value ? o.textContent : "";
  }
  function listItems() { return listEl.querySelectorAll('[role="option"]'); }
  function setActive(i) {
    var items = listItems();
    if (!items.length) { active = -1; searchEl.removeAttribute("aria-activedescendant"); return; }
    active = (i + items.length) % items.length;
    items.forEach(function (el, n) { el.classList.toggle("active", n === active); el.setAttribute("aria-selected", n === active ? "true" : "false"); });
    searchEl.setAttribute("aria-activedescendant", items[active].id);
    items[active].scrollIntoView({ block: "nearest" });
  }
  function openList(filter) {
    var groups = collect(filter);
    var q = String(filter || "").trim();
    listEl.replaceChildren();
    var n = 0;
    groups.forEach(function (g) {
      var head = document.createElement("li");
      head.className = "combo-group";
      head.setAttribute("role", "presentation");
      head.textContent = g.label;
      listEl.appendChild(head);
      g.items.forEach(function (ch) {
        var li = document.createElement("li");
        li.id = "programOpt" + n++;
        li.setAttribute("role", "option");
        li.dataset.value = ch[0];
        var logo = LOGOS[ch[0]];
        var icon = document.createElement("img");
        icon.className = "combo-icon";
        icon.alt = "";
        icon.width = 24; icon.height = 24;
        icon.decoding = "async";
        if (logo) icon.src = logo.icon; else icon.classList.add("blank");
        var text = document.createElement("span");
        text.textContent = ch[1];
        li.append(icon, text);
        if (ch[0] === programEl.value) li.classList.add("current");
        listEl.appendChild(li);
      });
    });
    if (!n) {
      var none = document.createElement("li");
      none.className = "combo-empty";
      none.setAttribute("role", "presentation");
      none.textContent = "No airline or program matches \u201c" + q + "\u201d.";
      listEl.appendChild(none);
    }
    searchStatus.textContent = q ? (n === 1 ? "1 match." : n + " matches.") : "";
    listEl.hidden = false;
    searchEl.setAttribute("aria-expanded", "true");
    active = -1;
    if (q && n) setActive(0);
  }
  function closeList() {
    listEl.hidden = true;
    searchEl.setAttribute("aria-expanded", "false");
    searchEl.removeAttribute("aria-activedescendant");
    active = -1;
  }
  // The clear button shows whenever the box has text.
  var clearEl = $("programClear");
  function syncClear() {
    var show = !!searchEl.value;
    clearEl.hidden = !show;
    searchEl.classList.toggle("has-clear", show);
  }
  function choose(value) {
    var changed = programEl.value !== value;
    programEl.value = value;
    searchEl.value = chosenLabel();
    searchStatus.textContent = "";
    closeList();
    syncClear();
    if (changed) programEl.dispatchEvent(new Event("change"));
  }
  if (searchEl) {
    searchEl.addEventListener("focus", function () { searchEl.select(); openList(""); });
    searchEl.addEventListener("click", function () { if (listEl.hidden) openList(""); });
    searchEl.addEventListener("input", function () { syncClear(); openList(searchEl.value); });
    // Clearing empties the box and the chosen program, then shows the list.
    clearEl.addEventListener("mousedown", function (e) { e.preventDefault(); });
    clearEl.addEventListener("click", function () {
      choose("");
      searchEl.focus();
      openList("");
    });
    searchEl.addEventListener("keydown", function (e) {
      if (e.key === "ArrowDown") { e.preventDefault(); if (listEl.hidden) openList(searchEl.value); setActive(active + 1); }
      else if (e.key === "ArrowUp") { e.preventDefault(); if (listEl.hidden) openList(searchEl.value); setActive(active - 1); }
      else if (e.key === "Enter") {
        if (!listEl.hidden) {
          e.preventDefault();
          var items = listItems();
          var pick = items[active >= 0 ? active : 0];
          if (pick) choose(pick.dataset.value);
        }
      } else if (e.key === "Escape") { closeList(); searchEl.value = chosenLabel(); syncClear(); }
    });
    searchEl.addEventListener("blur", function () {
      // Let a click on the list finish first.
      setTimeout(function () { closeList(); searchEl.value = chosenLabel(); searchStatus.textContent = ""; syncClear(); }, 150);
    });
    listEl.addEventListener("mousedown", function (e) {
      var li = e.target.closest('[role="option"]');
      e.preventDefault();
      if (li) choose(li.dataset.value);
    });
    // Keep the box in step when the program changes another way.
    programEl.addEventListener("change", function () { if (document.activeElement !== searchEl) searchEl.value = chosenLabel(); syncClear(); });
    // Clear: empties every field and puts the form back to its starting
    // state, with no program chosen.
    $("clearForm").addEventListener("click", function () {
      form.querySelectorAll('input[type="number"], input[type="text"], input[type="search"], input:not([type])').forEach(function (el) { el.value = ""; });
      programEl.value = "";
      searchEl.value = "";
      closeList();
      onProgramChange();
      syncClear();
      resultEl.hidden = true;
      errorEl.hidden = true;
      searchEl.focus();
    });
  }

  // Airport lookup for distance-based programs. The airport list loads the
  // first time it is needed, so other visitors never download it.
  var fromAirport = $("fromAirport"), toAirport = $("toAirport");
  var airportResult = $("airportResult");
  var airportsLoading = false;
  function ensureAirports() {
    if (window.AIRPORTS) return;
    if (airportsLoading) return;
    airportsLoading = true;
    // Data only (JSON), fetched from this site; no script is loaded.
    fetch("js/airports.json", { credentials: "same-origin" })
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(function (data) {
        if (!data || typeof data !== "object") throw new Error("bad data");
        window.AIRPORTS = data;
        updateAirportDistance();
        [fromAirport, toAirport].forEach(function (el) { el.dispatchEvent(new Event("airports-ready")); });
      })
      .catch(function () {
        airportsLoading = false;
        airportResult.textContent = "The airport list could not load. Enter the miles yourself.";
      });
  }
  // Published route distances (Copa): a menu of routes, and the same
  // figures used when the two airports typed match a listed route.
  var routeWrap = $("routeWrap"), routeSelect = $("routeSelect");
  function routeMiles(p, a, b) {
    if (!p || !p.routes) return null;
    var other = a === p.routes.from ? b : (b === p.routes.from ? a : null);
    if (!other) return null;
    var hit = p.routes.list.filter(function (r) { return r[0] === other; })[0];
    return hit ? hit[2] : null;
  }
  function syncRoutes() {
    routeWrap = $("routeWrap"); routeSelect = $("routeSelect");
    var p = current();
    var show = !!(p && p.routes) && !distanceField.hidden;
    routeWrap.hidden = !show;
    if (!show) return;
    if (routeSelect.dataset.program === programEl.value) return;
    routeSelect.dataset.program = programEl.value;
    routeSelect.replaceChildren();
    routeSelect.appendChild(option("", "Another route (enter airports below)"));
    p.routes.list.forEach(function (r) {
      routeSelect.appendChild(option(r[0], r[1] + " (" + r[0] + "), " + (useKm ? num.format(Math.round(r[2] * KM_PER_MILE)) + " km" : num.format(r[2]) + " mi")));
    });
    $("routeLabel").textContent = "Route to or from " + p.routes.fromCity + " (" + p.routes.from + ")";
  }
  routeSelect.addEventListener("change", function () {
    var p = current();
    var r = p && p.routes ? p.routes.list.filter(function (x) { return x[0] === routeSelect.value; })[0] : null;
    if (!r) return;
    fromAirport.value = p.routes.from;
    toAirport.value = r[0];
    [fromAirport, toAirport].forEach(function (el) { el.dispatchEvent(new Event("airports-filled")); });
    setDistanceMiles(r[2]);
    airportResult.textContent = p.routes.from + " " + p.routes.fromCity + " \u2194 " + r[0] + " " + r[1] + ": " + distText(r[2]) + " (the airline's published distance).";
    resultEl.hidden = true;
  });

  function updateAirportDistance() {
    var from = fromAirport.value, to = toAirport.value;
    if (!from.trim() || !to.trim()) { airportResult.textContent = ""; return; }
    if (!window.AIRPORTS) { airportResult.textContent = "Loading airports\u2026"; return; }
    var D = window.Distance;
    var picks = [from, to].map(function (v) { return D.resolveAirport(window.AIRPORTS, v); });
    var unknown = [from, to].filter(function (v, i) { return !picks[i]; });
    if (unknown.length) { airportResult.textContent = "No airport found for \u201c" + unknown[0].trim() + "\u201d. Enter a three-letter code, such as PHL, or a city name."; return; }
    // A city with more than one airport: offer each as a button, main
    // international airports first.
    var si = picks[0].matches ? 0 : (picks[1].matches ? 1 : -1);
    if (si !== -1) {
      var A0 = window.AIRPORTS, input = si === 0 ? fromAirport : toAirport;
      var list = picks[si].matches.slice().sort(function (a, b) {
        var ia = /international/i.test(A0[a][3]) ? 0 : 1, ib = /international/i.test(A0[b][3]) ? 0 : 1;
        return ia - ib || A0[a][3].localeCompare(A0[b][3]);
      });
      // Leaving the box fires change again; keep the same buttons so a
      // click on one still lands.
      var key = si + ":" + list.join(",");
      if (airportResult.dataset.picks === key && airportResult.querySelector(".airport-pick")) return;
      airportResult.replaceChildren(document.createTextNode((si === 0 ? "From" : "To") + ": more than one airport matches. Pick one:"));
      airportResult.dataset.picks = key;
      var wrap = document.createElement("span");
      wrap.className = "airport-picks";
      list.slice(0, 10).forEach(function (c) {
        var b = document.createElement("button");
        b.type = "button";
        b.className = "airport-pick";
        b.textContent = c + " \u00b7 " + A0[c][3] + (A0[c][4] ? ", " + A0[c][4] : "");
        b.addEventListener("click", function () {
          input.value = D.airportLabel(c, A0[c]);
          input.dispatchEvent(new Event("airports-filled"));
          updateAirportDistance();
        });
        wrap.appendChild(b);
      });
      airportResult.appendChild(wrap);
      return;
    }
    var r = D.airportMiles(window.AIRPORTS, from, to);
    var A = window.AIRPORTS;
    var published = routeMiles(current(), r.from, r.to);
    if (routeSelect) routeSelect.value = published != null ? (r.from === current().routes.from ? r.to : r.from) : "";
    if (published != null) {
      setDistanceMiles(published);
      airportResult.textContent = r.from + " " + (A[r.from][2] || A[r.from][3]) + " \u2192 " + r.to + " " + (A[r.to][2] || A[r.to][3]) +
        ": " + distText(published) + " (the airline's published distance).";
      resultEl.hidden = true;
      return;
    }
    setDistanceMiles(r.miles, r.exact);
    airportResult.textContent = r.from + " " + (A[r.from][2] || A[r.from][3]) + " \u2192 " + r.to + " " + (A[r.to][2] || A[r.to][3]) +
      ": " + distText(r.miles) + " (great-circle distance; airlines may count slightly differently).";
    resultEl.hidden = true;
  }
  // Each airport box is a searchable dropdown: typing a code, city or
  // airport name lists the matches; a click or Enter picks one.
  function airportCombo(input, list) {
    var act = -1;
    function items() { return list.querySelectorAll('[role="option"]'); }
    function setAct(i) {
      var all = items();
      if (!all.length) { act = -1; input.removeAttribute("aria-activedescendant"); return; }
      act = (i + all.length) % all.length;
      all.forEach(function (el, n) { el.classList.toggle("active", n === act); el.setAttribute("aria-selected", n === act ? "true" : "false"); });
      input.setAttribute("aria-activedescendant", all[act].id);
      all[act].scrollIntoView({ block: "nearest" });
    }
    function close() {
      list.hidden = true;
      input.setAttribute("aria-expanded", "false");
      input.removeAttribute("aria-activedescendant");
      act = -1;
    }
    function open() {
      var A = window.AIRPORTS;
      var q = input.value.trim();
      // A box already holding a chosen airport shows no list.
      if (!A || !q || /^[A-Za-z]{3} - /.test(q)) { close(); return; }
      var codes = window.Distance.searchAirports(A, q, 30);
      list.replaceChildren();
      codes.forEach(function (c, n) {
        var a = A[c];
        var li = document.createElement("li");
        li.id = list.id + "Opt" + n;
        li.setAttribute("role", "option");
        li.dataset.code = c;
        var code = document.createElement("span");
        code.className = "airport-code";
        code.textContent = c;
        var place = document.createElement("span");
        place.className = "airport-place";
        place.textContent = (a[2] || a[3]) + (a[4] ? ", " + a[4] : "");
        var name = document.createElement("span");
        name.className = "airport-name";
        name.textContent = a[3];
        li.append(code, place, name);
        list.appendChild(li);
      });
      if (!codes.length) {
        var none = document.createElement("li");
        none.className = "combo-empty";
        none.setAttribute("role", "presentation");
        none.textContent = "No airport matches \u201c" + q + "\u201d.";
        list.appendChild(none);
      }
      list.hidden = false;
      input.setAttribute("aria-expanded", "true");
      act = -1;
      if (codes.length) setAct(0);
    }
    function pick(code) {
      var a = window.AIRPORTS[code];
      input.value = code + " - " + (a[2] || a[3]);
      close();
      syncClearBtn();
      updateAirportDistance();
    }
    // The × clears this box, and the distance it filled in.
    var clearBtn = $(input.id + "Clear");
    function syncClearBtn() {
      var show = !!input.value;
      clearBtn.hidden = !show;
      input.classList.toggle("has-clear", show);
    }
    clearBtn.addEventListener("mousedown", function (e) { e.preventDefault(); });
    clearBtn.addEventListener("click", function () {
      input.value = "";
      close();
      if (distanceEl.dataset.miles) { distanceEl.value = ""; delete distanceEl.dataset.miles; }
      airportResult.textContent = "";
      delete airportResult.dataset.picks;
      if (routeSelect) routeSelect.value = "";
      resultEl.hidden = true;
      syncClearBtn();
      input.focus();
    });
    input.addEventListener("input", syncClearBtn);
    input.addEventListener("change", syncClearBtn);
    input.addEventListener("airports-filled", syncClearBtn);
    input.addEventListener("focus", function () { ensureAirports(); if (input.value) input.select(); });
    input.addEventListener("input", function () {
      open();
      // While typing, show the distance only once both boxes name one airport.
      var A = window.AIRPORTS, D = window.Distance;
      var ok = A && [fromAirport, toAirport].every(function (el) { var r = D.resolveAirport(A, el.value); return r && r.code; });
      if (ok) updateAirportDistance(); else { airportResult.textContent = ""; delete airportResult.dataset.picks; }
    });
    input.addEventListener("keydown", function (e) {
      if (e.key === "ArrowDown") { e.preventDefault(); if (list.hidden) open(); setAct(act + 1); }
      else if (e.key === "ArrowUp") { e.preventDefault(); if (list.hidden) open(); setAct(act - 1); }
      else if (e.key === "Enter" && !list.hidden) {
        e.preventDefault();
        var one = items()[act >= 0 ? act : 0];
        if (one) pick(one.dataset.code);
      } else if (e.key === "Escape") close();
    });
    input.addEventListener("blur", function () { setTimeout(function () { close(); updateAirportDistance(); }, 150); });
    list.addEventListener("mousedown", function (e) {
      e.preventDefault();
      var li = e.target.closest('[role="option"]');
      if (li) pick(li.dataset.code);
    });
    // The list can open once the airport data arrives.
    input.addEventListener("airports-ready", function () { if (document.activeElement === input) open(); });
  }
  airportCombo(fromAirport, $("fromAirportList"));
  airportCombo(toAirport, $("toAirportList"));

  // Light and dark mode. "System" follows the device; Light and Dark
  // override it and are remembered on this device.
  var root = document.documentElement;
  var systemDark = window.matchMedia("(prefers-color-scheme: dark)");
  var mode = "system";
  try { var saved = localStorage.getItem("theme"); if (saved === "light" || saved === "dark") mode = saved; } catch (e) {}
  function applyMode() {
    if (mode === "system") root.removeAttribute("data-theme"); else root.setAttribute("data-theme", mode);
  }
  function isDark() { return mode === "system" ? systemDark.matches : mode === "dark"; }

  // Airline colors: the accent always follows the selected airline's brand
  // color, adjusted so text stays readable: darker in light mode (white text
  // on buttons), lighter in dark mode.
  function hexToRgb(h) { h = h.replace("#", ""); return [0, 2, 4].map(function (i) { return parseInt(h.substr(i, 2), 16); }); }
  function rgbToHex(c) { return "#" + c.map(function (v) { return ("0" + Math.round(v).toString(16)).slice(-2); }).join(""); }
  function mix(a, b, w) { return a.map(function (v, i) { return v * (1 - w) + b[i] * w; }); }
  function luminance(c) {
    var s = c.map(function (v) { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); });
    return 0.2126 * s[0] + 0.7152 * s[1] + 0.0722 * s[2];
  }
  function contrast(a, b) {
    var x = luminance(a), y = luminance(b);
    return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
  }
  // Shift a color toward black or white until it meets the contrast target.
  function adjust(c, toward, against, target) {
    var w = 0, out = c;
    while (contrast(out, against) < target && w < 1) { w += 0.05; out = mix(c, toward, w); }
    return out;
  }
  // Color choice from the Appearance panel: "auto" follows the selected
  // airline, and a menu value pins that airline's color. Saved on this
  // device and checked before use.
  var BRANDS = window.BRAND_COLORS || {};
  function brandOf(v) { return v ? (BRANDS[v] || BRANDS[v.split(":")[0]] || null) : null; }
  var colorChoice = "auto";
  try {
    var savedColor = localStorage.getItem("color");
    if (savedColor && brandOf(savedColor)) colorChoice = savedColor;
  } catch (e) {}
  function brandFor() {
    if (colorChoice !== "auto") return brandOf(colorChoice);
    return brandOf(programEl.value);
  }
  function applyAirlineColors() {
    var style = root.style;
    var brand = brandFor();
    var meta = document.querySelector('meta[name="theme-color"]');
    if (!brand) {
      ["--accent", "--accent-text", "--result-bg", "--to-top-text", "--site-accent"].forEach(function (n) { style.removeProperty(n); });
      if (meta) meta.setAttribute("content", isDark() ? "#0f141c" : "#1f5fd1");
      return;
    }
    var c = hexToRgb(brand), white = [255, 255, 255], ink = [15, 20, 28];
    var accent, accentText, resultBg;
    if (isDark()) {
      accent = adjust(c, white, ink, 4.6);
      accentText = contrast(accent, ink) >= contrast(accent, white) ? "#0f141c" : "#ffffff";
      resultBg = mix([24, 33, 48], c, 0.12);
    } else {
      accent = adjust(c, [0, 0, 0], [244, 246, 249], 4.6);
      accentText = "#ffffff";
      resultBg = mix(white, c, 0.08);
    }
    style.setProperty("--accent", rgbToHex(accent));
    // The wordmark title (and other --site-accent text) follows the color too.
    style.setProperty("--site-accent", rgbToHex(accent));
    style.setProperty("--accent-text", accentText);
    style.setProperty("--result-bg", rgbToHex(resultBg));
    style.setProperty("--to-top-text", accentText);
    if (meta) meta.setAttribute("content", isDark() ? "#0f141c" : rgbToHex(accent));
  }

  // The Appearance panel, from the All Trips Considered template: Mode
  // (Auto, Light, Dark) and a Color list of airline colors.
  var appearanceBtn = $("appearanceToggle");
  var appearancePanel = $("appearancePanel");
  var schemeList = $("schemeList");
  var modeHint = $("modeHint");
  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text !== undefined) e.textContent = text;
    return e;
  }
  // Every airline in the menu, by name, with its brand color.
  function airlineColors() {
    var seen = {}, out = [];
    collect("").forEach(function (g) {
      g.items.forEach(function (it) {
        var name = it[1].split(" | ")[0];
        var color = brandOf(it[0]);
        if (!color || seen[name]) return;
        seen[name] = true;
        out.push({ id: it[0], name: name, color: color });
      });
    });
    return out.sort(function (x, y) { return x.name.localeCompare(y.name); });
  }
  function schemeRow(id, name, color, now) {
    var row = el("label", "scheme-option");
    var input = el("input");
    input.type = "radio"; input.name = "scheme"; input.value = id;
    var label = el("span", "scheme-name", name);
    if (now) label.appendChild(el("small", "scheme-now", now));
    var swatch = el("span", "scheme-swatch");
    swatch.setAttribute("aria-hidden", "true");
    var i = el("i");
    i.style.background = color;
    swatch.appendChild(i);
    var check = el("span", "scheme-check", "\u2713");
    check.setAttribute("aria-hidden", "true");
    row.append(input, swatch, label, check);
    return row;
  }
  function renderSchemes() {
    schemeList.replaceChildren();
    var current = brandOf(programEl.value);
    var currentName = programEl.value ? programEl.selectedOptions[0].textContent.split(" | ")[0] : "";
    schemeList.appendChild(schemeRow("auto", "Match my airline", current || "#1f5fd1",
      "Now: " + (currentName && current ? currentName : "no airline chosen yet")));
    schemeList.appendChild(el("p", "scheme-subhead", "Airlines"));
    airlineColors().forEach(function (a) { schemeList.appendChild(schemeRow(a.id, a.name, a.color)); });
  }
  function syncAppearance() {
    var m = mode === "system" ? "auto" : mode;
    appearancePanel.querySelectorAll('input[name="mode"]').forEach(function (r) { r.checked = r.value === m; });
    schemeList.querySelectorAll('input[name="scheme"]').forEach(function (r) { r.checked = r.value === colorChoice; });
    modeHint.textContent = m === "auto"
      ? "Follows your device, which is set to " + (systemDark.matches ? "dark" : "light") + " right now."
      : m === "light" ? "Always light, whatever your device is set to." : "Always dark, whatever your device is set to.";
    appearanceBtn.setAttribute("aria-label", "Appearance");
    applyAirlineColors();
  }
  function openPanel() {
    renderSchemes();
    syncAppearance();
    appearancePanel.hidden = false;
    appearanceBtn.setAttribute("aria-expanded", "true");
    var checked = appearancePanel.querySelector('input[name="mode"]:checked');
    if (checked) checked.focus();
  }
  function closePanel(focusBtn) {
    if (appearancePanel.hidden) return;
    appearancePanel.hidden = true;
    appearanceBtn.setAttribute("aria-expanded", "false");
    if (focusBtn) appearanceBtn.focus();
  }
  if (appearanceBtn && appearancePanel) {
    appearancePanel.addEventListener("change", function (e) {
      if (e.target.name === "mode") {
        mode = e.target.value === "auto" ? "system" : e.target.value;
        try { if (mode === "system") localStorage.removeItem("theme"); else localStorage.setItem("theme", mode); } catch (err) {}
        applyMode();
      }
      if (e.target.name === "scheme") {
        colorChoice = e.target.value;
        try { if (colorChoice === "auto") localStorage.removeItem("color"); else localStorage.setItem("color", colorChoice); } catch (err) {}
      }
      syncAppearance();
    });
    appearanceBtn.addEventListener("click", function (e) { e.stopPropagation(); if (appearancePanel.hidden) openPanel(); else closePanel(false); });
    appearancePanel.addEventListener("click", function (e) { e.stopPropagation(); });
    document.addEventListener("click", function () { closePanel(false); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !appearancePanel.hidden) closePanel(true); });
  }
  if (systemDark.addEventListener) systemDark.addEventListener("change", syncAppearance);
  programEl.addEventListener("change", applyAirlineColors);
  applyMode();
  syncAppearance();

  // Back to top: appears after scrolling down, and scrolls smoothly unless
  // the visitor prefers reduced motion.
  var toTop = $("toTop");
  if (toTop) {
    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    var syncToTop = function () { toTop.hidden = window.scrollY < 400; };
    window.addEventListener("scroll", syncToTop, { passive: true });
    syncToTop();
    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: reduceMotion.matches ? "auto" : "smooth" });
      var first = $("program");
      if (first) first.focus({ preventScroll: true });
    });
  }

  // Travel Tools: mark the link whose site matches this page's address.
  // The markup marks Points Calculator; this keeps it right if the footer
  // is reused or the site is opened from another address.
  (function () {
    var links = document.querySelectorAll(".quick-links a");
    if (!links.length) return;
    var here = location.hostname.replace(/^www\./, "");
    var match = null;
    links.forEach(function (a) { if (a.hostname.replace(/^www\./, "") === here) match = a; });
    if (!match) return;
    links.forEach(function (a) {
      var tag = a.querySelector(".ql-arrow");
      if (a === match) {
        a.setAttribute("aria-current", "page");
        tag.textContent = "You are here";
      } else {
        a.removeAttribute("aria-current");
        tag.textContent = "\u203a";
      }
    });
  })();

  var yearEl = $("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
  programEl.addEventListener("change", onProgramChange);
  statusEl.addEventListener("change", syncAllianceStatus);
  earnEl.addEventListener("change", syncEarnFields);
  zoneEl.addEventListener("change", syncEarnFields);
  upgradeEl.addEventListener("change", function () { resultEl.hidden = true; });
  usedCardYes.addEventListener("change", syncCardSelect);
  $("cardFx").addEventListener("change", function () { resultEl.hidden = true; });
  usedCardNo.addEventListener("change", syncCardSelect);
  cardmemberYes.addEventListener("change", syncCardmember);
  cardmemberNo.addEventListener("change", syncCardmember);
  // A fare type with its own currency updates the money symbols.
  // Switching the credited program swaps the menu value to that airline.
  creditEl.addEventListener("change", function () {
    var key = programEl.value.split(":")[0];
    programEl.value = key + ":" + creditEl.value;
    onProgramChange();
  });
  fareTypeEl.addEventListener("change", syncExtraVisibility);
  fareTypeEl.addEventListener("change", function () {
    var p = current();
    if (p) setCurrency(p.currency || "USD");
    resultEl.hidden = true;
  });
  directYes.addEventListener("change", function () { resultEl.hidden = true; });
  $("directNo").addEventListener("change", function () { resultEl.hidden = true; });
  gowildYes.addEventListener("change", syncGoWild);
  gowildNo.addEventListener("change", syncGoWild);
  cardEl.addEventListener("change", syncCardSelect);

  // The program menu starts empty: no program is chosen until the visitor
  // picks one. A program page (such as /airlines/united-airlines/) opens on
  // its own program. Earlier versions remembered the last program and
  // status; those saved values are removed.
  try { localStorage.removeItem("lastProgram"); localStorage.removeItem("lastStatus"); } catch (e) {}
  (function openPreset() {
    var preset = document.documentElement.getAttribute("data-preset");
    if (preset && !programEl.value && programEl.querySelector('option[value="' + preset.replace(/"/g, "") + '"]')) {
      programEl.value = preset;
      programEl.dispatchEvent(new Event("change"));
    }
  })();
})();
