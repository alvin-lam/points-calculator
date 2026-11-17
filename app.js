(function () {
  "use strict";

  var PROGRAMS = window.PROGRAMS;
  var $ = function (id) { return document.getElementById(id); };

  var form = $("calc");
  var programEl = $("program");
  var statusEl = $("status");
  var airlineField = $("airlineField");
  var airlineEl = $("airline");
  var fareTypeEl = $("fareType");
  var fareTypeField = $("fareTypeField");
  var distanceField = $("distanceField");
  var airfareEl = $("airfare");
  var taxesEl = $("taxes");
  var distanceEl = $("distance");
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
    GBP: new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }),
    EUR: new Intl.NumberFormat("en-IE", { style: "currency", currency: "EUR" })
  };
  var symbols = { USD: "$", CAD: "CA$", MXN: "MX$", GBP: "£", EUR: "€" };
  // Name of the currency's hundredth, for the point value label.
  var minorUnit = { USD: "¢", CAD: "¢", MXN: "¢", GBP: "p", EUR: "¢" };
  var moneyEls = document.querySelectorAll(".money:not(.wide-fixed)");
  // Labels for a card billed in another currency than the fare.
  var cardSymbols = { USD: "US$", CAD: "CA$", MXN: "MX$", GBP: "£", EUR: "€" };

  function option(value, label) {
    var o = document.createElement("option");
    o.value = value;
    o.textContent = label;
    return o;
  }

  // One <optgroup> per country, programs sorted by name inside each.
  var pinned = window.COUNTRIES.filter(function (c) { return c.pinned; });
  var others = window.COUNTRIES.filter(function (c) { return !c.pinned; })
    .sort(function (a, b) { return a.label.localeCompare(b.label); });
  pinned.concat(others).forEach(function (c) {
    var group = document.createElement("optgroup");
    group.label = c.label;
    Object.keys(PROGRAMS).filter(function (key) {
      return (PROGRAMS[key].country || "US") === c.id;
    }).sort(function (a, b) {
      return PROGRAMS[a].name.localeCompare(PROGRAMS[b].name);
    }).forEach(function (key) {
      group.appendChild(option(key, PROGRAMS[key].name));
    });
    if (group.children.length) programEl.appendChild(group);
  });

  function setCurrency(code) {
    moneyEls.forEach(function (el) {
      el.querySelector("span").textContent = symbols[code];
      el.classList.toggle("wide", symbols[code].length > 1);
    });
  }

  // The chosen program as it applies to the chosen airline. An airline can
  // carry its own program fields (IAG: British Airways Club or Iberia Club).
  function current() {
    var p = PROGRAMS[programEl.value];
    if (!p || !p.airlines) return p;
    var al = find(p.airlines, airlineEl.value);
    return al.program ? Object.assign({}, p, al.program) : p;
  }

  function onProgramChange() {
    var p = PROGRAMS[programEl.value];
    airlineEl.innerHTML = "";
    if (!p) return;
    airlineField.hidden = !p.airlines;
    if (p.airlines) p.airlines.forEach(function (al) { airlineEl.appendChild(option(al.id, al.name)); });
    applyProgram();
  }

  // Rebuilds the form for the current program and airline.
  function applyProgram() {
    var p = current();
    statusEl.innerHTML = "";
    fareTypeEl.innerHTML = "";
    if (!p) return;

    setCurrency(p.currency || "USD");
    p.statuses.forEach(function (s) { statusEl.appendChild(option(s.id, s.name)); });
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

    distanceField.hidden = p.method !== "distance";
    distanceEl.required = p.method === "distance";
    resultEl.hidden = true;
    errorEl.hidden = true;
  }

  function syncCardSelect() {
    cardSelectField.hidden = cardField.hidden || !usedCardYes.checked;
    var p = current();
    var card = p && p.cards && !cardSelectField.hidden ? find(p.cards, cardEl.value) : null;
    var foreign = card && card.currency && card.currency !== (p.currency || "USD");
    cardChargeField.hidden = !foreign;
    if (foreign) {
      $("cardChargeCurrency").textContent = cardSymbols[card.currency];
      $("cardChargeSymbol").textContent = cardSymbols[card.currency];
    }
  }

  function find(list, id) {
    for (var i = 0; i < list.length; i++) if (list[i].id === id) return list[i];
    return list[0];
  }

  // Returns { points, rateLabel, capped }.
  function calculate(p, status, fareType, airfare, distance, airline) {
    var points, rateLabel;

    if (p.method === "distance") {
      // Some distance programs also scale by fare class (Virgin Atlantic).
      var perMile = (fareType ? fareType.rate : 1) * status.multiplier;
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
      rateLabel = num.format(rate) + " " + p.unit + " per " + symbols[p.currency || "USD"];
    }

    points = Math.floor(points);
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

    var airfare = parseFloat(airfareEl.value);
    var taxes = parseFloat(taxesEl.value) || 0;
    var distance = parseFloat(distanceEl.value);

    if (!(airfare >= 0) || airfareEl.value === "") return showError("Please enter your airfare.");
    if (taxes < 0) return showError("Taxes and fees cannot be negative.");
    if (p.method === "distance" && !(distance > 0)) return showError("Please enter the miles flown for this trip.");

    errorEl.hidden = true;
    var usd = money[p.currency || "USD"];
    var status = find(p.statuses, statusEl.value);
    var fareType = p.fareTypes ? find(p.fareTypes, fareTypeEl.value) : null;
    var airline = p.airlines ? find(p.airlines, airlineEl.value) : null;
    var r = calculate(p, status, fareType, airfare, distance, airline);

    // Card points come on top of flight points and are earned on the
    // full charge, taxes included. The per-ticket cap does not apply.
    var card = p.cards && usedCardYes.checked ? find(p.cards, cardEl.value) : null;
    var cardCurrency = card && card.currency ? card.currency : (p.currency || "USD");
    var foreignCard = cardCurrency !== (p.currency || "USD");
    var charged = airfare + taxes;
    if (foreignCard) {
      charged = parseFloat(cardChargeEl.value);
      if (!(charged > 0)) return showError("Please enter the amount charged to your card in " + cardSymbols[cardCurrency] + ".");
    }
    var cardPoints = card ? Math.floor(charged * card.rate) : 0;
    var total = r.points + cardPoints;

    $("resultProgram").textContent = p.name + (airline ? " · " + airline.name : "") + " · " + status.name +
      (fareType ? " · " + fareType.name : "") + (card ? " · " + card.name : "");
    $("resultPoints").textContent = num.format(total);
    $("resultUnit").textContent = p.unit;

    var dl = $("breakdown");
    dl.innerHTML = "";
    row(dl, "Airfare", usd.format(airfare));
    row(dl, "Taxes & fees", usd.format(taxes));
    row(dl, "Total trip cost", usd.format(airfare + taxes));
    if (p.method === "distance") row(dl, "Miles flown", num.format(distance));
    row(dl, "Flight earning", num.format(r.points) + " (" + r.rateLabel + ")");
    if (card) {
      var cardMoney = foreignCard
        ? cardSymbols[cardCurrency] + charged.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
        : usd.format(charged);
      row(dl, "Card earning", num.format(cardPoints) + " (" + num.format(card.rate) + " per " +
        (foreignCard ? cardSymbols[cardCurrency] : symbols[p.currency || "USD"]) + " on " + cardMoney + ")");
    }
    // Skip the value rows for programs without a reliable point value.
    if (p.centsPerPoint) {
      var value = total * p.centsPerPoint / 100;
      row(dl, "Approximate value", usd.format(value) + " (at " + p.centsPerPoint + minorUnit[p.currency || "USD"] + " each)");
      if (airfare + taxes > 0) {
        row(dl, "Return on total cost", (value / (airfare + taxes) * 100).toFixed(1) + "%");
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
  airlineEl.addEventListener("change", applyProgram);
  usedCardYes.addEventListener("change", syncCardSelect);
  usedCardNo.addEventListener("change", syncCardSelect);
  cardEl.addEventListener("change", syncCardSelect);
})();
