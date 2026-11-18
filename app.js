(function () {
  "use strict";

  var PROGRAMS = window.PROGRAMS;
  var $ = function (id) { return document.getElementById(id); };

  var form = $("calc");
  var programEl = $("program");
  var statusEl = $("status");
  var fareTypeEl = $("fareType");
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
  var errorEl = $("error");
  var resultEl = $("result");

  var num = new Intl.NumberFormat("en-US");
  var money = {
    USD: new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }),
    CAD: new Intl.NumberFormat("en-US", { style: "currency", currency: "CAD" }),
    MXN: new Intl.NumberFormat("en-US", { style: "currency", currency: "MXN" }),
    AUD: new Intl.NumberFormat("en-US", { style: "currency", currency: "AUD" }),
    NOK: new Intl.NumberFormat("en-US", { style: "currency", currency: "NOK" }),
    MYR: new Intl.NumberFormat("en-US", { style: "currency", currency: "MYR" }),
    SGD: new Intl.NumberFormat("en-US", { style: "currency", currency: "SGD" }),
    JPY: new Intl.NumberFormat("en-US", { style: "currency", currency: "JPY" }),
    HKD: new Intl.NumberFormat("en-US", { style: "currency", currency: "HKD" }),
    TWD: new Intl.NumberFormat("en-US", { style: "currency", currency: "TWD" }),
    GBP: new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }),
    EUR: new Intl.NumberFormat("en-IE", { style: "currency", currency: "EUR" })
  };
  var symbols = { USD: "$", CAD: "CA$", MXN: "MX$", AUD: "A$", NOK: "kr", MYR: "RM", SGD: "S$", JPY: "¥", HKD: "HK$", TWD: "NT$", GBP: "£", EUR: "€" };
  // Name of the currency's hundredth, for the point value label.
  var minorUnit = { USD: "¢", CAD: "¢", MXN: "¢", AUD: "¢", GBP: "p", EUR: "¢" };
  var moneyEls = document.querySelectorAll(".money:not(.wide-fixed)");
  // Labels for a card billed in another currency than the fare.
  var cardSymbols = { USD: "US$", CAD: "CA$", MXN: "MX$", AUD: "A$", NOK: "kr", MYR: "RM", SGD: "S$", JPY: "¥", HKD: "HK$", TWD: "NT$", GBP: "£", EUR: "€" };

  function option(value, label) {
    var o = document.createElement("option");
    o.value = value;
    o.textContent = label;
    return o;
  }

  // "Airline | Program" for an airline inside a group program.
  // "Status | Alliance tier" when the airline is in an alliance.
  function statusLabel(s) {
    var al = selection().airline;
    return s.alliance && !(al && al.noAlliance) ? s.name + " | " + s.alliance : s.name;
  }

  function airlineLabel(p, al) {
    return al.name + " | " + ((al.program && al.program.programName) || p.programName);
  }

  // One <optgroup> per country. A program that covers several airlines
  // (Flying Blue, Miles & More, IAG) lists each airline under its own
  // country, with the value "program:airline".
  // Choices sort by name inside each group.
  var pinned = window.COUNTRIES.filter(function (c) { return c.pinned; });
  var others = window.COUNTRIES.filter(function (c) { return !c.pinned; })
    .sort(function (a, b) { return a.label.localeCompare(b.label); });
  pinned.concat(others).forEach(function (c) {
    var group = document.createElement("optgroup");
    group.label = c.label;
    var choices = [];
    Object.keys(PROGRAMS).forEach(function (key) {
      var p = PROGRAMS[key];
      if (p.airlines) {
        // Each airline sits under its own country.
        p.airlines.forEach(function (al) {
          if ((al.country || p.country || "US") === c.id) choices.push([key + ":" + al.id, airlineLabel(p, al)]);
        });
      } else if ((p.country || "US") === c.id) {
        choices.push([key, p.name]);
      }
    });
    choices.sort(function (a, b) { return a[1].localeCompare(b[1]); })
      .forEach(function (ch) { group.appendChild(option(ch[0], ch[1])); });
    if (group.children.length) programEl.appendChild(group);
  });

  function setCurrency(code) {
    moneyEls.forEach(function (el) {
      el.querySelector("span").textContent = symbols[code];
      el.classList.toggle("wide", symbols[code].length > 1);
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
    if (!s.program || !s.airline || !s.airline.program) return s.program;
    return Object.assign({}, s.program, s.airline.program);
  }

  function onProgramChange() {
    applyProgram();
  }

  // Rebuilds the form for the current program and airline.
  function applyProgram() {
    var p = current();
    statusEl.innerHTML = "";
    fareTypeEl.innerHTML = "";
    if (!p) return;

    // Show the alliance of the chosen airline (or program).
    var sel = selection();
    var alliance = sel.airline ? sel.airline.alliance : sel.program.alliance;
    $("allianceValue").textContent = alliance || "Not part of an alliance";
    $("allianceValue").classList.toggle("none", !alliance);
    $("allianceField").hidden = false;

    setCurrency(p.currency || "USD");
    p.statuses.forEach(function (s) { statusEl.appendChild(option(s.id, statusLabel(s))); });
    statusEl.disabled = p.statuses.length < 2;

    fareTypeField.hidden = !p.fareTypes;
    if (p.fareTypes) {
      p.fareTypes.forEach(function (f) { fareTypeEl.appendChild(option(f.id, f.name)); });
      if (p.defaultFareType) fareTypeEl.value = p.defaultFareType;
      else fareTypeEl.selectedIndex = 1 < p.fareTypes.length ? 1 : 0;
    }

    // Ask about a co-branded card only for programs with card data.
    cardEl.innerHTML = "";
    cardField.hidden = !p.cards;
    if (p.cards) {
      // Group credit and debit cards when a program has both.
      var debit = p.cards.filter(function (c) { return c.kind === "debit"; });
      var credit = p.cards.filter(function (c) { return c.kind !== "debit"; });
      [["Credit cards", credit], ["Debit cards", debit]].forEach(function (g) {
        if (!g[1].length) return;
        var parent = cardEl;
        if (debit.length) {
          parent = document.createElement("optgroup");
          parent.label = g[0];
          cardEl.appendChild(parent);
        }
        g[1].forEach(function (c) { parent.appendChild(option(c.id, c.name)); });
      });
    }
    if (!p.cards) usedCardNo.checked = true;
    syncCardSelect();

    zoneEl.innerHTML = "";
    if (p.zones) p.zones.forEach(function (z) { zoneEl.appendChild(option(z.id, z.name)); });
    earnEl.innerHTML = "";
    earnField.hidden = !p.earnMethods;
    if (p.earnMethods) p.earnMethods.forEach(function (m) { earnEl.appendChild(option(m.id, m.name)); });
    syncEarnFields();
    resultEl.hidden = true;
    errorEl.hidden = true;
  }

  // Distance, segment, and route-band earning do not depend on the price,
  // so those programs skip the airfare and taxes fields.
  function usesFare(method) {
    return method !== "distance" && method !== "segments" && method !== "zone";
  }

  // The charge field shows when a card's points cannot come from the fare
  // fields: the card bills in another currency, or no fare was entered.
  function syncCardSelect() {
    cardSelectField.hidden = cardField.hidden || !usedCardYes.checked;
    var p = current();
    var card = p && p.cards && !cardSelectField.hidden ? find(p.cards, cardEl.value) : null;
    var foreign = !!(card && card.currency && card.currency !== (p.currency || "USD"));
    var noFare = !!(card && !usesFare(earnMethod(p).id));
    cardChargeField.hidden = !(foreign || noFare);
    if (card) {
      var code = card.currency || p.currency || "USD";
      $("cardChargeCurrency").textContent = cardSymbols[code];
      $("cardChargeSymbol").textContent = cardSymbols[code];
      $("cardChargeHint").textContent = foreign
        ? "This card earns in a different currency than the fare. Enter the total from your card statement."
        : "Enter the total charged to your card for this ticket, taxes included.";
    }
  }

  // How the chosen program earns: its fixed method, or the member's choice.
  function earnMethod(p) {
    return p.earnMethods ? find(p.earnMethods, earnEl.value) : { id: p.method };
  }

  function syncEarnFields() {
    var p = current();
    if (!p) return;
    var m = earnMethod(p).id;
    distanceField.hidden = m !== "distance";
    distanceEl.required = m === "distance";
    segmentsField.hidden = m !== "segments";
    zoneField.hidden = m !== "zone";
    fareFields.hidden = !usesFare(m);
    airfareEl.required = usesFare(m);
    syncCardSelect();
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

    if (em.id === "zone") {
      // Fixed points by route band and fare, plus the status bonus.
      var zone = find(p.zones, zoneEl.value);
      var fi = p.fareTypes.indexOf(fareType);
      var base = zone.points[fi];
      if (base == null) return { error: fareType.name + " is not sold on this route." };
      var bonusBase = fareType.premium && p.bonusBaseFare
        ? zone.points[p.fareTypes.indexOf(find(p.fareTypes, p.bonusBaseFare))] : base;
      var bonus = Math.round(bonusBase * (status.bonus || 0));
      points = base + bonus;
      rateLabel = bonus ? num.format(base) + " base + " + num.format(bonus) + " status bonus" : "fixed for this fare and route";
    } else if (em.id === "segments") {
      var perSegment = em.perSegment * status.multiplier;
      points = segments * perSegment;
      rateLabel = num.format(perSegment) + " " + p.unit + " per segment";
    } else if (em.id === "price") {
      var perDollar = em.rate * status.multiplier;
      points = airfare * perDollar;
      rateLabel = num.format(perDollar) + " " + p.unit + " per " + symbols[p.currency || "USD"];
    } else if (p.method === "distance") {
      // A fare class can set the share of distance earned (Virgin Atlantic).
      // Some fares are excluded from the status bonus (KrisFlyer). A status
      // bonus can also be added on top of the fare share (Etihad).
      var fareShare = fareType ? fareType.rate : 1;
      var perMile = status.bonus != null
        ? fareShare + status.bonus
        : fareShare * (fareType && fareType.noBonus ? 1 : status.multiplier);
      points = distance * perMile;
      rateLabel = num.format(perMile) + " " + p.unit + " per mile flown";
    } else if (p.method === "tiered") {
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
        ? (status.rates ? status.rates[fareType.id] : fareType.rate * status.multiplier)
        : status.rate;
      // Programs spanning several airlines can set their own elite rate.
      if (airline && status.elite && airline.eliteRate) rate = airline.eliteRate;
      points = airfare * rate;
      rateLabel = p.rateAsPercent
        ? num.format(rate * 100) + "% of the fare"
        : num.format(rate) + " " + p.unit + " per " + symbols[p.currency || "USD"];
    }

    // Distance programs round to the nearest mile; spend programs round down.
    points = em.id === "distance" ? Math.round(points) : Math.floor(points);
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

    var distance = parseFloat(distanceEl.value);
    var segments = parseInt(segmentsEl.value, 10);
    var method = earnMethod(p).id;
    var fareUsed = usesFare(method);
    var airfare = fareUsed ? parseFloat(airfareEl.value) : 0;
    var carrier = fareUsed ? (parseFloat(carrierEl.value) || 0) : 0;
    var taxes = fareUsed ? (parseFloat(taxesEl.value) || 0) : 0;
    // Most programs earn on the base fare plus carrier-imposed fees; a few
    // (Southwest, Allegiant) earn on the base fare only.
    var earnBase = airfare + (p.baseFareOnly ? 0 : carrier);
    var tripCost = airfare + carrier + taxes;

    if (fareUsed && (!(airfare >= 0) || airfareEl.value === "")) return showError("Please enter your airfare.");
    if (carrier < 0) return showError("Carrier-imposed fees cannot be negative.");
    if (taxes < 0) return showError("Taxes and fees cannot be negative.");
    if (method === "distance" && !(distance > 0)) return showError("Please enter the miles flown for this trip.");
    if (method === "segments" && !(segments > 0)) return showError("Please enter the number of segments flown.");

    errorEl.hidden = true;
    var usd = money[p.currency || "USD"];
    var status = find(p.statuses, statusEl.value);
    var fareType = p.fareTypes ? find(p.fareTypes, fareTypeEl.value) : null;
    var airline = selection().airline;
    var r = calculate(p, status, fareType, earnBase, distance, airline, segments);
    if (r.error) return showError(r.error);

    // Card points come on top of flight points and are earned on the
    // full charge, taxes included. The per-ticket cap does not apply.
    var card = p.cards && usedCardYes.checked ? find(p.cards, cardEl.value) : null;
    var cardCurrency = card && card.currency ? card.currency : (p.currency || "USD");
    var foreignCard = cardCurrency !== (p.currency || "USD");
    var charged = tripCost;
    if (card && (foreignCard || !fareUsed)) {
      charged = parseFloat(cardChargeEl.value);
      if (!(charged > 0)) return showError("Please enter the amount charged to your card in " + cardSymbols[cardCurrency] + ".");
    }
    var cardPoints = card ? Math.floor(charged * card.rate) : 0;
    var total = r.points + cardPoints;

    $("resultProgram").textContent = (airline ? airlineLabel(selection().program, airline) : p.name) + " · " + statusLabel(status) +
      (fareType ? " · " + fareType.name : "") + (card ? " · " + card.name : "");
    $("resultPoints").textContent = num.format(total);
    $("resultUnit").textContent = p.unit;

    var dl = $("breakdown");
    dl.innerHTML = "";
    if (fareUsed) {
      row(dl, "Airfare", usd.format(airfare));
      row(dl, "Carrier-imposed Fees", usd.format(carrier) + (p.baseFareOnly && carrier ? " (does not earn)" : ""));
      row(dl, "Taxes & Fees", usd.format(taxes));
      row(dl, "Total trip cost", usd.format(tripCost));
    }
    if (method === "distance") row(dl, "Miles flown", num.format(distance));
    if (method === "segments") row(dl, "Segments flown", num.format(segments));
    if (method === "zone") row(dl, "Route", find(p.zones, zoneEl.value).name);
    row(dl, "Flight earning", num.format(r.points) + " (" + r.rateLabel + ")");
    if (card) {
      var cardMoney = foreignCard || !fareUsed
        ? cardSymbols[cardCurrency] + charged.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
        : usd.format(charged);
      row(dl, "Card earning", num.format(cardPoints) + " (" + num.format(card.rate) + " per " +
        (foreignCard || !fareUsed ? cardSymbols[cardCurrency] : symbols[p.currency || "USD"]) + " on " + cardMoney + ")");
    }
    // Skip the value rows for programs without a reliable point value.
    if (p.centsPerPoint) {
      var value = total * p.centsPerPoint / 100;
      row(dl, "Approximate value", usd.format(value) + " (at " + p.centsPerPoint + minorUnit[p.currency || "USD"] + " each)");
      if (tripCost > 0) {
        row(dl, "Return on total cost", (value / tripCost * 100).toFixed(1) + "%");
      }
    }

    $("resultNote").textContent = (r.capped ? "This trip hits the per-ticket earning cap. " : "") + p.note + (airline && airline.note ? " " + airline.note : "");
    resultEl.hidden = false;
  });

  // Light/dark toggle. Starts from the device setting; a click picks the
  // other theme and remembers it on this device.
  var root = document.documentElement;
  var toggle = $("themeToggle");
  var systemDark = window.matchMedia("(prefers-color-scheme: dark)");
  try { var saved = localStorage.getItem("theme"); if (saved) root.setAttribute("data-theme", saved); } catch (e) {}

  function isDark() {
    var t = root.getAttribute("data-theme");
    return t ? t === "dark" : systemDark.matches;
  }
  function syncToggle() {
    if (!toggle) return;
    var dark = isDark();
    toggle.classList.toggle("is-dark", dark);
    toggle.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", dark ? "#0f141c" : "#1f5fd1");
  }
  if (toggle) {
    toggle.addEventListener("click", function () {
      var next = isDark() ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) {}
      syncToggle();
    });
  }
  if (systemDark.addEventListener) systemDark.addEventListener("change", syncToggle);
  syncToggle();

  var yearEl = $("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
  programEl.addEventListener("change", onProgramChange);
  earnEl.addEventListener("change", syncEarnFields);
  usedCardYes.addEventListener("change", syncCardSelect);
  usedCardNo.addEventListener("change", syncCardSelect);
  cardEl.addEventListener("change", syncCardSelect);
})();
