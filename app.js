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
    INR: new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }),
    CNY: new Intl.NumberFormat("en-US", { style: "currency", currency: "CNY" }),
    NZD: new Intl.NumberFormat("en-US", { style: "currency", currency: "NZD" }),
    GBP: new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }),
    EUR: new Intl.NumberFormat("en-IE", { style: "currency", currency: "EUR" }),
    BRL: new Intl.NumberFormat("en-US", { style: "currency", currency: "BRL" })
  };
  var symbols = { USD: "$", CAD: "CA$", MXN: "MX$", AUD: "A$", NOK: "kr", MYR: "RM", SGD: "S$", JPY: "¥", HKD: "HK$", TWD: "NT$", INR: "₹", CNY: "CN¥", NZD: "NZ$", GBP: "£", EUR: "€", BRL: "R$" };
  // Name of the currency's hundredth, for the point value label.
  var minorUnit = { USD: "¢", CAD: "¢", MXN: "¢", AUD: "¢", GBP: "p", EUR: "¢" };
  var moneyEls = document.querySelectorAll(".money:not(.wide-fixed)");
  // Labels for a card billed in another currency than the fare.
  var cardSymbols = { USD: "US$", CAD: "CA$", MXN: "MX$", AUD: "A$", NOK: "kr", MYR: "RM", SGD: "S$", JPY: "¥", HKD: "HK$", TWD: "NT$", INR: "₹", CNY: "CN¥", NZD: "NZ$", GBP: "£", EUR: "€", BRL: "R$" };

  function option(value, label) {
    var o = document.createElement("option");
    o.value = value;
    o.textContent = label;
    return o;
  }

  // "Airline | Program" for an airline inside a group program.
  // "Status | Alliance tier" when the program is in an alliance. Airlines
  // that share a program show its tier too (Transavia, Eurowings).
  function statusLabel(s) {
    return s.alliance ? s.name + " | " + s.alliance : s.name;
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
    // An airline outside the alliance that uses an alliance program's status
    // levels (Transavia, LEVEL) says so; its own program (AerClub) does not.
    var tiered = p.statuses.some(function (s) { return s.alliance; });
    var shared = !alliance && sel.airline && tiered ? programAlliance(sel.program) : null;
    var allianceEl = $("allianceValue");
    allianceEl.textContent = alliance || "Not part of an alliance.";
    if (shared) {
      // The shared-program line goes on its own line.
      allianceEl.appendChild(document.createElement("br"));
      allianceEl.appendChild(document.createTextNode(airlineLabel(sel.program, sel.airline).split(" | ")[1] +
        " status is recognized across " + shared + "."));
    }
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
      setCurrency(current().currency || "USD");
    }

    // Ask about a co-branded card only for programs with card data.
    cardEl.innerHTML = "";
    // Programs where holding the card raises the flight earn rate (Frontier)
    // ask about it first; the payment question only follows a Yes.
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
        if (debit.length) {
          parent = document.createElement("optgroup");
          parent.label = g[0];
          cardEl.appendChild(parent);
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
    $("carrierHint").textContent = p.carrierHint || "Airline surcharges such as fuel fees (YQ/YR). Most programs count these toward earning.";
    $("fareTypeLabel").textContent = p.fareTypeLabel || "Fare Type";
    // Seats and bags earn like the fare on some airlines (Frontier, Allegiant, Breeze).
    addonsField.hidden = !p.addons;
    // A direct booking bonus question (JetBlue).
    directField.hidden = !p.direct;
    if (p.direct) $("directLegend").textContent = p.direct.question;
    directYes.checked = true;
    // GoWild! Pass bookings (Frontier).
    gowildField.hidden = !p.gowild;
    if (!p.gowild && gowildYes.checked) { gowildNo.checked = true; syncGoWild(); }
    syncCardSelect();

    zoneEl.innerHTML = "";
    if (p.zones) p.zones.forEach(function (z) { zoneEl.appendChild(option(z.id, z.name)); });
    earnEl.innerHTML = "";
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
    return method !== "distance" && method !== "segments" && method !== "zone";
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
    var zoneUsed = m === "zone" || (m === "distance" && !!p.zones);
    zoneField.hidden = !zoneUsed;
    $("zoneLabel").textContent = p.zoneLabel || "Route and distance";
    $("zoneHint").textContent = p.zoneHint || "This program awards a fixed amount per flight for each route band.";
    // A route type that pays a fixed amount needs no distance.
    var fixedZone = m === "distance" && p.zones && find(p.zones, zoneEl.value).fixed;
    if (fixedZone) { distanceField.hidden = true; distanceEl.required = false; }
    // Some earning choices do not depend on the booking class (Sky Pearl).
    fareTypeField.hidden = !p.fareTypes || !!earnMethod(p).noFareType;
    fareFields.hidden = !usesFare(m);
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
    $("carrierField").hidden = on;
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
      // What a fare earns: a share of the distance (a number), a share with a
      // minimum per flight ({ share, min }), or a fixed amount ({ fixed }).
      // With zones, fareType.earn lists one of these per zone; elite members
      // can have their own list (fareType.eliteEarn, Turkish Airlines).
      var dZone = p.zones ? find(p.zones, zoneEl.value) : null;
      var zi = dZone ? p.zones.indexOf(dZone) : 0;
      var specs = fareType && status.elite && fareType.eliteEarn ? fareType.eliteEarn : (fareType && fareType.earn);
      var spec = specs ? specs[zi] : (fareType ? fareType.rate : 1);
      if (spec == null) return { error: fareType.name + " does not earn on this route." };
      if (typeof spec === "object" && spec.fixed != null) {
        points = spec.fixed;
        rateLabel = "fixed for this fare and route";
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
          rateLabel = num.format(share + status.bonus) + " " + p.unit + " per " + unitName;
        } else {
          var mult = fareType && fareType.noBonus ? 1 : (status.multiplier || 1);
          points = base * mult;
          rateLabel = num.format(share * mult) + " " + p.unit + " per " + unitName;
        }
        if (minUsed) rateLabel += ", with the " + num.format(min) + " minimum per flight";
        if (minDistUsed) rateLabel += ", counted as the " + num.format(p.minDistance) + " km minimum";
      }
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
        ? (status.rates ? status.rates[fareType.id + (isCardmember(p) ? "Card" : "")] : fareType.rate * status.multiplier)
        : status.rate;
      // Programs spanning several airlines can set their own elite rate.
      if (airline && status.elite && airline.eliteRate) rate = airline.eliteRate;
      // A status can add a flat amount per unit of currency (Air Europa, Xiamen).
      if (status.addRate) rate += status.addRate;
      // Booking direct adds a bonus by fare type (JetBlue).
      if (p.direct && fareType && directYes.checked) rate += p.direct.rates[fareType.id] || 0;
      // Some programs round the spend first (Fortune Wings: nearest HK$10,
      // with anything under HK$10 counted as HK$10).
      var spend = airfare;
      if (p.roundSpendTo && spend > 0) spend = Math.max(p.roundSpendTo, Math.round(spend / p.roundSpendTo) * p.roundSpendTo);
      points = spend * rate;
      var sym = symbols[p.currency || "USD"];
      rateLabel = p.rateAsPercent
        ? num.format(rate * 100) + "% of the fare"
        : p.ratePer
          ? num.format(rate * p.ratePer) + " " + p.unit + " per " + sym + p.ratePer
          : num.format(rate) + " " + p.unit + " per " + sym;
    }

    // Distance programs round to the nearest mile; spend programs round down
    // (or up, where the program says so). Airpoints keep two decimals.
    if (p.decimals) points = Math.round(points * 100) / 100;
    else if (em.id === "distance" && !p.roundUp) points = Math.round(points);
    else points = p.roundUp ? Math.ceil(points - 1e-9) : Math.floor(points);
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

    var distance = parseFloat(distanceEl.value);
    var segments = parseInt(segmentsEl.value, 10);
    var method = earnMethod(p).id;
    var fareUsed = usesFare(method);
    var airfare = fareUsed ? parseFloat(airfareEl.value) : 0;
    var carrier = fareUsed ? (parseFloat(carrierEl.value) || 0) : 0;
    var taxes = fareUsed ? (parseFloat(taxesEl.value) || 0) : 0;
    // Most programs earn on the base fare plus carrier-imposed fees; a few
    // (Southwest, Allegiant) earn on the base fare only.
    // Seats and bags bought on the booking earn like the fare (p.addons).
    var addons = fareUsed && p.addons ? (parseFloat(addonsEl.value) || 0) : 0;
    if (addons < 0) return showError("Seats, bags and/or bundles cannot be negative.");
    var earnBase = airfare + (p.baseFareOnly ? 0 : carrier) + addons;
    var tripCost = airfare + carrier + addons + taxes;
    // GoWild!: the fare earns 1 mile, and the Early Booking Fee earns at
    // the status and fare type rate. There are no carrier-imposed fees.
    var gowild = fareUsed && goWildOn();
    var gowildFee = gowild ? (parseFloat(gowildFeeEl.value) || 0) : 0;
    if (gowildFee < 0) return showError("The GoWild Early Booking Fee cannot be negative.");
    if (gowild) {
      airfare = 0.01;
      carrier = 0;
      earnBase = gowildFee + addons;
      tripCost = airfare + gowildFee + addons + taxes;
    }

    if (fareUsed && (!(airfare >= 0) || airfareEl.value === "")) return showError("Please enter your airfare.");
    if (carrier < 0) return showError("Carrier-imposed fees cannot be negative.");
    if (taxes < 0) return showError("Taxes and fees cannot be negative.");
    var routeFixed = method === "distance" && p.zones && find(p.zones, zoneEl.value).fixed;
    if (method === "distance" && !routeFixed && !(distance > 0)) return showError("Please enter the miles flown for this trip.");
    if (method === "segments" && !(segments > 0)) return showError("Please enter the number of segments flown.");

    errorEl.hidden = true;
    var usd = money[p.currency || "USD"];
    var status = find(p.statuses, statusEl.value);
    var fareType = p.fareTypes && !earnMethod(p).noFareType ? find(p.fareTypes, fareTypeEl.value) : null;
    var airline = selection().airline;
    var r = calculate(p, status, fareType, earnBase, distance, airline, segments);
    if (r.error) return showError(r.error);
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
      if (!(charged > 0)) return showError("Please enter the amount charged to your card in " + cardSymbols[cardCurrency] + ".");
    }
    // A card's rate can depend on the fare type (Breeze Easy Visa).
    var cardRate = card ? (card.rates && fareType && card.rates[fareType.id] != null ? card.rates[fareType.id] : card.rate) : 0;
    var cardPoints = card ? Math.floor(charged * cardRate) : 0;
    var total = r.points + cardPoints;

    $("resultProgram").textContent = (airline ? airlineLabel(selection().program, airline) : p.name) + " · " + statusLabel(status) +
      (fareType ? " · " + fareType.name : "") + (isCardmember(p) ? " · Cardmember rate" : "") + (card ? " · " + card.name : "");
    $("resultPoints").textContent = num.format(total);
    $("resultUnit").textContent = p.unit;

    var dl = $("breakdown");
    dl.innerHTML = "";
    if (fareUsed) {
      row(dl, "Airfare", usd.format(airfare) + (gowild ? " (GoWild!)" : ""));
      if (gowild) row(dl, "GoWild Early Booking Fee", usd.format(gowildFee));
      if (!gowild) row(dl, p.carrierLabel || "Carrier-imposed Fees", usd.format(carrier) + (p.baseFareOnly && carrier ? " (does not earn)" : ""));
      if (p.addons) row(dl, "Seats, Bags and/or Bundles", usd.format(addons));
      row(dl, "Taxes & Fees", usd.format(taxes));
      row(dl, "Total trip cost", usd.format(tripCost));
    }
    if (method === "distance" && !routeFixed) row(dl, "Miles flown", num.format(distance));
    if (method === "distance" && p.zones) row(dl, "Route", find(p.zones, zoneEl.value).name);
    if (method === "segments") row(dl, "Segments flown", num.format(segments));
    if (method === "zone") row(dl, "Route", find(p.zones, zoneEl.value).name);
    row(dl, "Flight earning", num.format(r.points) + " (" + r.rateLabel + ")");
    if (card) {
      var cardMoney = foreignCard || !fareUsed
        ? cardSymbols[cardCurrency] + charged.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
        : usd.format(charged);
      row(dl, "Card earning", num.format(cardPoints) + " (" + num.format(cardRate) + " per " +
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
  zoneEl.addEventListener("change", syncEarnFields);
  usedCardYes.addEventListener("change", syncCardSelect);
  usedCardNo.addEventListener("change", syncCardSelect);
  cardmemberYes.addEventListener("change", syncCardmember);
  cardmemberNo.addEventListener("change", syncCardmember);
  // A fare type with its own currency updates the money symbols.
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
})();
