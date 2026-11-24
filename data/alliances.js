/* Alliance tier matching each program status, shown as "Status | Tier".
   oneworld: Ruby, Sapphire, Emerald. Star Alliance: Silver, Gold.
   SkyTeam: Elite, Elite Plus. Airlines outside an alliance are left out,
   and an airline that shares a program but is not a member (Eurowings,
   Transavia) still shows the program's tier.
   Keys are program ids, or "program:airline" for group programs. */
module.exports = function applyAlliances(P) {
  var ALLIANCE_TIERS = {
    // oneworld
    american: { gold: "Ruby", platinum: "Sapphire", platpro: "Sapphire", exp: "Emerald" },
    alaska: { silver: "Ruby", gold: "Sapphire", platinum: "Emerald", titanium: "Emerald" },
    hawaiian: { silver: "Ruby", gold: "Sapphire", platinum: "Emerald", titanium: "Emerald" },
    "iag:ba": { bronze: "Ruby", silver: "Sapphire", gold: "Emerald" },
    "iag:ib": { plata: "Ruby", oro: "Sapphire", platino: "Emerald", infinita: "Emerald", "infinita-prime": "Emerald" },
    "iag:level": { plata: "Ruby", oro: "Sapphire", platino: "Emerald", infinita: "Emerald", "infinita-prime": "Emerald" },
    finnair: { silver: "Ruby", gold: "Sapphire", platinum: "Emerald", lumo: "Emerald" },
    qatar: { silver: "Ruby", gold: "Sapphire", platinum: "Emerald" },
    qantas: { silver: "Ruby", gold: "Sapphire", platinum: "Emerald", "platinum-one": "Emerald" },
    cathay: { silver: "Ruby", gold: "Sapphire", diamond: "Emerald" },
    jal: { crystal: "Ruby", jgc: "Sapphire", sapphire: "Sapphire", "jgc-premier": "Emerald", diamond: "Emerald" },
    enrich: { silver: "Ruby", gold: "Sapphire", platinum: "Emerald" },
    // Star Alliance
    united: { silver: "Silver", gold: "Gold", platinum: "Gold", "1k": "Gold" },
    aircanada: { "25k": "Silver", "35k": "Gold", "50k": "Gold", "75k": "Gold", se: "Gold" },
    milesandmore: { ftl: "Silver", sen: "Gold", hon: "Gold" },
    tap: { silver: "Silver", gold: "Gold" },
    ana: { bronze: "Silver", platinum: "Gold", diamond: "Gold" },
    krisflyer: { "elite-silver": "Silver", "elite-gold": "Gold", pps: "Gold", solitaire: "Gold" },
    eva: { silver: "Silver", gold: "Gold", diamond: "Gold" },
    lifemiles: { silver: "Silver", gold: "Gold", diamond: "Gold" },
    airnz: { silver: "Silver", gold: "Gold", platinum: "Gold", black: "Gold" },
    turkish: { "classic-plus": "Silver", elite: "Gold", "elite-plus": "Gold" },
    phoenix: { silver: "Silver", gold: "Gold", platinum: "Gold" },
    // SkyTeam
    delta: { silver: "Elite", gold: "Elite Plus", platinum: "Elite Plus", diamond: "Elite Plus" },
    aeromexico: { silver: "Elite", gold: "Elite Plus", platinum: "Elite Plus", titanium: "Elite Plus" },
    flyingblue: { silver: "Elite", gold: "Elite Plus", platinum: "Elite Plus", ultimate: "Elite Plus" },
    virgin: { silver: "Elite", gold: "Elite Plus" },
    chinaairlines: { gold: "Elite", emerald: "Elite Plus", paragon: "Elite Plus" },
    korean: { "morning-calm": "Elite", "morning-calm-select": "Elite Plus", "million-miler": "Elite Plus" },
    aireuropa: { silver: "Elite", gold: "Elite Plus", platinum: "Elite Plus" },
    chinaeastern: { silver: "Elite", gold: "Elite Plus", platinum: "Elite Plus" },
    xiamen: { silver: "Elite", gold: "Elite", platinum: "Elite Plus", diamond: "Elite Plus" },
    sas: { silver: "Elite", gold: "Elite Plus", diamond: "Elite Plus" }
  };

  // Alliance of each program, or of each airline for group programs.
  // Anything not listed is not part of an alliance.
  var ALLIANCES = {
    oneworld: ["american:aa", "american:fj", "alaska", "hawaiian", "iag:ba", "iag:ib", "finnair", "qatar",
      "qantas", "cathay", "jal", "enrich"],
    "Star Alliance": ["united", "aircanada", "milesandmore:lh", "milesandmore:lx",
      "milesandmore:os", "milesandmore:sn", "milesandmore:az", "tap", "ana",
      "krisflyer", "eva", "lifemiles", "airnz", "turkish", "phoenix:ca",
      "milesandmore:lo", "milesandmore:ou"],
    SkyTeam: ["delta", "aeromexico", "flyingblue:af", "flyingblue:kl", "virgin", "chinaairlines",
      "korean", "aireuropa", "chinaeastern", "xiamen", "sas"]
  };
  Object.keys(ALLIANCES).forEach(function (name) {
    ALLIANCES[name].forEach(function (key) {
      var parts = key.split(":");
      var target = P[parts[0]];
      if (parts[1]) target = target.airlines.filter(function (a) { return a.id === parts[1]; })[0];
      target.alliance = name;
    });
  });

  Object.keys(ALLIANCE_TIERS).forEach(function (key) {
    var parts = key.split(":");
    var p = P[parts[0]];
    var holder = p;
    if (parts[1]) {
      var al = p.airlines.filter(function (a) { return a.id === parts[1]; })[0];
      holder = al.program;
    }
    var tiers = ALLIANCE_TIERS[key];
    // Copy the list so shared status lists (Iberia and LEVEL) stay separate.
    holder.statuses = holder.statuses.map(function (s) {
      return tiers[s.id] ? Object.assign({}, s, { alliance: tiers[s.id] }) : s;
    });
  });
};
