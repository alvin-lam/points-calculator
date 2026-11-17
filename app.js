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
  var taxesEl = $("taxes");
  var distanceEl = $("distance");
  var errorEl = $("error");
  var resultEl = $("result");

  var num = new Intl.NumberFormat("en-US");
  var usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

  function option(value, label) {
    var o = document.createElement("option");
    o.value = value;
    o.textContent = label;
    return o;
  }

  Object.keys(PROGRAMS).forEach(function (key) {
    programEl.appendChild(option(key, PROGRAMS[key].name));
  });

  function onProgramChange() {
    var p = PROGRAMS[programEl.value];
    statusEl.innerHTML = "";
    fareTypeEl.innerHTML = "";
    if (!p) return;

    p.statuses.forEach(function (s) { statusEl.appendChild(option(s.id, s.name)); });
    statusEl.disabled = p.statuses.length < 2;

    fareTypeField.hidden = !p.fareTypes;
    if (p.fareTypes) {
      p.fareTypes.forEach(function (f) { fareTypeEl.appendChild(option(f.id, f.name)); });
      fareTypeEl.selectedIndex = 1 < p.fareTypes.length ? 1 : 0;
    }

    distanceField.hidden = p.method !== "distance";
    distanceEl.required = p.method === "distance";
    resultEl.hidden = true;
    errorEl.hidden = true;
  }

  function find(list, id) {
    for (var i = 0; i < list.length; i++) if (list[i].id === id) return list[i];
    return list[0];
  }

  // Returns { points, rateLabel, capped }.
  function calculate(p, status, fareType, airfare, distance) {
    var points, rateLabel;

    if (p.method === "distance") {
      points = distance * status.multiplier;
      rateLabel = num.format(status.multiplier) + " " + p.unit + " per mile";
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
      var rate = fareType ? fareType.rate * status.multiplier : status.rate;
      points = airfare * rate;
      rateLabel = num.format(rate) + " " + p.unit + " per $";
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
    var p = PROGRAMS[programEl.value];
    if (!p) return showError("Please choose an airline program.");

    var airfare = parseFloat(airfareEl.value);
    var taxes = parseFloat(taxesEl.value) || 0;
    var distance = parseFloat(distanceEl.value);

    if (!(airfare >= 0) || airfareEl.value === "") return showError("Please enter your airfare.");
    if (taxes < 0) return showError("Taxes and fees cannot be negative.");
    if (p.method === "distance" && !(distance > 0)) return showError("Please enter the miles flown for this trip.");

    errorEl.hidden = true;
    var status = find(p.statuses, statusEl.value);
    var fareType = p.fareTypes ? find(p.fareTypes, fareTypeEl.value) : null;
    var r = calculate(p, status, fareType, airfare, distance);

    $("resultProgram").textContent = p.name + " · " + status.name + (fareType ? " · " + fareType.name : "");
    $("resultPoints").textContent = num.format(r.points);
    $("resultUnit").textContent = p.unit;

    var dl = $("breakdown");
    dl.innerHTML = "";
    row(dl, "Airfare", usd.format(airfare));
    row(dl, "Taxes & fees", usd.format(taxes));
    row(dl, "Total trip cost", usd.format(airfare + taxes));
    if (p.method === "distance") row(dl, "Miles flown", num.format(distance));
    row(dl, "Earning rate", r.rateLabel);
    var value = r.points * p.centsPerPoint / 100;
    row(dl, "Approximate value", usd.format(value) + " (at " + p.centsPerPoint + "¢ each)");
    if (airfare + taxes > 0) {
      row(dl, "Return on total cost", (value / (airfare + taxes) * 100).toFixed(1) + "%");
    }

    $("resultNote").textContent = (r.capped ? "This trip hits the per-ticket earning cap. " : "") + p.note;
    resultEl.hidden = false;
  });

  programEl.addEventListener("change", onProgramChange);
})();
