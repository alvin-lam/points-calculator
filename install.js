// Asks visitors to add the calculator to their home screen.
// Chrome, Edge, and Android use the browser's install prompt.
// iPhone and iPad show the Share > Add to Home Screen steps.
(function () {
  "use strict";

  var banner = document.getElementById("installBanner");
  var installBtn = document.getElementById("installBtn");
  var shareBtn = document.getElementById("shareBtn");
  var iosSteps = document.getElementById("iosSteps");
  var dismissBtn = document.getElementById("installDismiss");
  if (!banner) return;

  var KEY = "installDismissedAt";
  var WAIT_DAYS = 14;
  var deferred = null;

  if ("serviceWorker" in navigator && location.protocol === "https:") {
    navigator.serviceWorker.register("sw.js").catch(function () {});
  }

  var standalone = window.matchMedia("(display-mode: standalone)").matches || navigator.standalone === true;
  var ios = /iphone|ipad|ipod/i.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

  function recentlyDismissed() {
    try {
      var t = Number(localStorage.getItem(KEY));
      return t && Date.now() - t < WAIT_DAYS * 864e5;
    } catch (e) { return false; }
  }

  function show(mode) {
    installBtn.hidden = mode !== "prompt";
    iosSteps.hidden = mode !== "ios";
    shareBtn.hidden = mode !== "share";
    banner.hidden = false;
    // Leave room so the banner never covers the end of the page.
    document.body.style.paddingBottom = banner.offsetHeight + "px";
  }

  function hide(remember) {
    banner.hidden = true;
    document.body.style.paddingBottom = "";
    if (remember) { try { localStorage.setItem(KEY, String(Date.now())); } catch (e) {} }
  }

  // Which way this browser can add the app, or null.
  function mode() {
    if (deferred) return "prompt";
    if (ios) return "ios";
    if (navigator.share) return "share";
    return null;
  }

  if (standalone) return;

  window.addEventListener("beforeinstallprompt", function (e) {
    e.preventDefault();
    deferred = e;
    if (!recentlyDismissed()) show("prompt");
  });

  window.addEventListener("appinstalled", function () {
    deferred = null;
    hide(false);
  });

  installBtn.addEventListener("click", function () {
    if (!deferred) return;
    deferred.prompt();
    deferred.userChoice.finally(function () { deferred = null; hide(false); });
  });

  shareBtn.addEventListener("click", function () {
    navigator.share({
      title: document.title,
      text: "Estimate the airline points you will earn on a flight.",
      url: location.href
    }).catch(function () {});
  });

  dismissBtn.addEventListener("click", function () { hide(true); });

  // iOS and share-only browsers never fire beforeinstallprompt, so offer
  // the manual route after the visitor has had a moment with the page.
  setTimeout(function () {
    var m = mode();
    if (!deferred && m && !recentlyDismissed()) show(m);
  }, 4000);
})();
