(function () {
  var STORAGE_KEY = "moodpixels.entries.v1";
  var PROFILE_KEY = "moodpixels.profile.v1";
  var PROFILES_KEY = "moodpixels.profiles.v1";
  var SESSION_KEY = "moodpixels.session.v1";
  var WEATHERS = [
    { id: 0, name: "Ensolarado", bar: "#F4C266" },
    { id: 1, name: "Parc. nublado", bar: "#98CBE5" },
    { id: 2, name: "Nublado", bar: "#89B3C9" },
    { id: 3, name: "Chuvoso", bar: "#6B8FA3" },
    { id: 4, name: "Tempestade", bar: "#6A7D8C" },
    { id: 5, name: "Neblina", bar: "#C9BFB0" }
  ];

  var MONTHS = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  var WEEKDAYS = ["D", "S", "T", "Q", "Q", "S", "S"];

  var COLORS = [
    ["Amarelo", "#F2C94C"],
    ["Laranja", "#F2994A"],
    ["Vermelho", "#E05A5A"],
    ["Rosa", "#F4A6C0"],
    ["Roxo", "#A27BD1"],
    ["Azul", "#5B9BD5"],
    ["Verde", "#7BC47F"],
    ["Ciano", "#5FD0D0"],
    ["Branco", "#FFFFFF"],
    ["Cinza", "#9AA0A6"],
    ["Marrom", "#8B5E3C"]
  ];

  var INTENSITY_COLORS = ["#AEDBD8", "#8FC9E2", "#F7C66E", "#F2994A", "#EA639B"];

  var PALETTE = {
    S: "#F8D98A", s: "#F2B66D", o: "#E49A4E",
    C: "#CBE8F6", c: "#A7D4EC", b: "#86BDD9",
    D: "#8EAAB8", d: "#7392A3", k: "#5B7888",
    L: "#FFF199", l: "#F8DE68",
    R: "#6E98B3", r: "#8EB8D1",
    M: "#EFE7D6", m: "#D8CDB8", W: "#FFFDF7",
    P: "#E78DB1", p: "#F4B4CD", Y: "#F7DC88", G: "#9FD8B4", B: "#9CCEEB",
    K: "#4A3426", T: "#C8824B"
  };

  var WEATHER_GRIDS = {
    0: [
      "........o.........", "........o.........", "...o...ooo...o....", "....o.sSSSs.o.....",
      ".....sSSSSSs......", "....sSSSSSSSs.....", "....sSSSSSSso.....", ".oo.sSSSSSsoo.oo..",
      "....sSSSSSsoo.....", "....osSSSSooo.....", ".....ossssoo......", "....o..ooo..o.....",
      "...o....o....o....", "........o........."
    ],
    1: [
      "............o.....", ".........o.ooo.o..", "..........sSSSs...", ".....CCC.sSSSSs.o.",
      "....CCCCCsSSSSs...", "...CCCCCCsSSSo....", "..CCCCCCCCcco.....", ".CCCCCCCCccc......",
      ".CCCCCCCcccc......", ".cCCCCCCccccb.....", "..bbbbbbbbbb......", "..................",
      "..................", ".................."
    ],
    2: [
      "..................", "..................", ".....CCC..........", "....CCCCC.........",
      "...CCCCCCC..DD....", "..CCCCCCCCCdDDd...", ".CCCCCCCCCCdDDdd..", ".CCCCCCCCccdddd...",
      ".cCCCCCCCcccdd....", ".ccCCCCCCcccc.....", "..bbbbbbbbbbb.....", "..................",
      "..................", ".................."
    ],
    3: [
      "..................", ".....DDD..........", "....DDDDD.........", "...DDDDDDD........",
      "..DDDDDDDDD.......", ".DDDDDDDDddd......", ".dDDDDDDDdddd.....", ".ddDDDDDDddddk....",
      "..kkkkkkkkkkk.....", "..................", "...R...r...R......", "...R...r...R......",
      ".....R...r...R....", ".....R...r...R...."
    ],
    4: [
      "..................", "....DDD...........", "...DDDDD..........", "..DDDDDDD.........",
      ".DDDDDDDDdd.LLl...", ".dDDDDDDDddLLl....", ".ddDDDDDDdLLLl....", "..kkkkkkkkLLLLl...",
      "...........LLl....", "..........LLl.....", ".........LLl......", "........Ll........",
      ".......l..........", ".................."
    ],
    5: [
      "..................", "....L.............", "...LLL......L.....", "....L.............",
      "..CCCCCCCCCC......", ".cCCCCCCCCCCcc....", "..................", "...MMMMMMMMMMM....",
      "..mmmmmmmmmmmm....", "..................", ".CCCCCCCCCCC......", "..bbbbbbbbbbb.....",
      "..................", ".................."
    ]
  };

  var RAINBOW_GRID = [
    "......PPPPPP......", "....PPppppppPP....", "...PppYYYYYYppP...", "..PpYYGGGGGGYYpP..",
    ".PpYGGGBBBBGGGYpP.", ".PpYGBB....BBGYpP.", ".PpYGB......BGypP.", ".PpYGB......BGypP."
  ];

  var GEAR_GRID = [
    "....KK....", ".K.KTTK.K.", ".KKTTTTKK.", "..KTTKKT..", "KKTKK..TKK",
    "KKT..KKTKK", "..TKKTTK..", ".KKTTTTKK.", ".K.KTTK.K.", "....KK...."
  ];

  var SKY_BANDS = {
    0: ["#FDE9A8", "#FCEFD0", "#FFF7E5"],
    1: ["#CBE8F6", "#E6F3F9", "#FFF6DC"],
    2: ["#BCD9E9", "#D4E6F0", "#EAF2F6"],
    3: ["#97B8CC", "#B5CEDD", "#D4E3EC"],
    4: ["#7B8FA1", "#98A9B8", "#BAC6D0"],
    5: ["#DFDBD0", "#EAE6DC", "#F5F2EA"]
  };

  var TABS = [
    { id: "home", label: "Início", weather: 2, btnClass: "btn-sun" },
    { id: "reg", label: "Registrar", weather: 0, btnClass: "btn-berry" },
    { id: "cal", label: "Calendário", weather: 1, btnClass: "btn-sky" },
    { id: "art", label: "Arte", weather: 4, btnClass: "btn-lavender" },
    { id: "stats", label: "Stats", weather: 3, btnClass: "btn-mint" }
  ];

  var installPrompt = null;
  window.addEventListener("beforeinstallprompt", function (e) {
    e.preventDefault();
    installPrompt = e;
    if (tab === "set" && authenticated) render();
  });
  window.addEventListener("appinstalled", function () {
    installPrompt = null;
    toast("App instalado!");
    if (tab === "set" && authenticated) render();
  });

  var entries = {};
  var tab = "home";
  var viewYear = new Date().getFullYear();
  var viewMonth = new Date().getMonth();
  var selectedDate = null;
  var draft = null;
  var toastTimer = null;
  var authenticated = false;
  var avatarMode = false;
  var avatarDraft = null;
  var avatarHistory = [];
  var avatarCategory = "hair";

  function formatIso(d) {
    return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  }
  function todayIso() { return formatIso(new Date()); }
  function monthPrefix(y, m) { return y + "-" + String(m + 1).padStart(2, "0"); }
  function fmtBr(s) { var a = s.split("-"); return a[2] + "/" + a[1] + "/" + a[0]; }
  function colorName(hex) {
    for (var i = 0; i < COLORS.length; i++) {
      if (COLORS[i][1].toLowerCase() === hex.toLowerCase()) return COLORS[i][0];
    }
    return hex;
  }

  function createSampleEntries() {
    var now = new Date(), y = now.getFullYear(), m = now.getMonth(), day = now.getDate(), ts = now.getTime();
    var list = [
      { offset: 1, weather: 0, color: "#F2C94C", intensity: 4 },
      { offset: 2, weather: 1, color: "#F4A6C0", intensity: 5 },
      { offset: 4, weather: 3, color: "#5B9BD5", intensity: 3 },
      { offset: 6, weather: 2, color: "#7BC47F", intensity: 4 }
    ];
    var out = {};
    list.forEach(function (s) {
      var d = day - s.offset;
      if (d < 1) return;
      var k = monthPrefix(y, m) + "-" + String(d).padStart(2, "0");
      out[k] = {
        date: k, weather: s.weather, color: s.color, intensity: s.intensity,
        createdAt: ts - s.offset * 86400000, updatedAt: ts - s.offset * 86400000
      };
    });
    return out;
  }

  function load() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (raw === null) {
        entries = {};
        localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
      } else {
        var savedEntries = JSON.parse(raw);
        entries = savedEntries && typeof savedEntries === "object" && !Array.isArray(savedEntries)
          ? savedEntries
          : {};
        if (entries !== savedEntries) save();
      }

      var sessionNickname = localStorage.getItem(SESSION_KEY);
      var legacyProfile = JSON.parse(localStorage.getItem(PROFILE_KEY)) || null;
      var profiles = {};
      try { profiles = JSON.parse(localStorage.getItem(PROFILES_KEY)) || {}; } catch (e) {}
      if (legacyProfile) {
        if (!legacyProfile.avatar) legacyProfile.avatar = getDefaultAvatar();
        profiles[legacyProfile.nickname] = legacyProfile;
        localStorage.setItem(PROFILES_KEY, JSON.stringify(profiles));
        if (sessionNickname === "active") {
          sessionNickname = legacyProfile.nickname;
          localStorage.setItem(SESSION_KEY, sessionNickname);
        }
      }
      authenticated = !!(sessionNickname && (sessionNickname === "active" || profiles[sessionNickname]));
    } catch (e) {
      entries = {};
      authenticated = false;
    }
  }

  function save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    } catch (e) {
      toast("Não foi possível salvar neste navegador.");
    }
  }

  function toast(msg) {
    var el = document.getElementById("toast");
    el.textContent = msg;
    el.className = "on";
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.className = ""; }, 2100);
  }

  function openConfirm(title, body, confirmLabel, onConfirm) {
    var root = document.getElementById("modal-root");
    root.innerHTML = "";
    var wrap = el('<div class="modal-backdrop"><div class="modal-box" role="dialog" aria-modal="true"><h3>' + title + '</h3><p class="sub">' + body + '</p><div class="modal-actions"><button type="button" class="btn btn-paper-deep">Cancelar</button><button type="button" class="btn btn-berry">' + confirmLabel + "</button></div></div></div>");
    var btns = wrap.querySelectorAll("button");
    btns[0].onclick = function () { root.innerHTML = ""; };
    btns[1].onclick = function () { root.innerHTML = ""; onConfirm(); };
    wrap.onclick = function (ev) { if (ev.target === wrap) root.innerHTML = ""; };
    root.appendChild(wrap);
  }

  function el(html) {
    var d = document.createElement("div");
    d.innerHTML = html.trim();
    return d.firstElementChild;
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, function (char) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char];
    });
  }

  function svgGrid(grid, size, extraClass) {
    var rows = grid.length, cols = grid[0].length;
    var h = Math.round((size * rows) / cols);
    var rects = [];
    for (var y = 0; y < rows; y++) {
      for (var x = 0; x < cols; x++) {
        var fill = PALETTE[grid[y][x]];
        if (fill) rects.push('<rect x="' + x + '" y="' + y + '" width="1" height="1" fill="' + fill + '"/>');
      }
    }
    return '<svg width="' + size + '" height="' + h + '" viewBox="0 0 ' + cols + " " + rows + '" shape-rendering="crispEdges"' + (extraClass ? ' class="' + extraClass + '"' : "") + ' aria-hidden="true">' + rects.join("") + "</svg>";
  }

  function spiralCard(title, accent, rightHtml, bodyNode) {
    var rings = "";
    for (var i = 0; i < 7; i++) {
      rings += '<div class="ring-unit"><span class="ring-metal"></span><span class="ring-hole"></span></div>';
    }
    var sec = el('<section class="spiral-wrap"><div class="spiral-rings" aria-hidden="true">' + rings + '</div><div class="spiral-card"><div class="spiral-head acc-' + accent + '"><h2>' + title + '</h2>' + (rightHtml ? '<span class="meta">' + rightHtml + "</span>" : "") + '</div><div class="spiral-body"></div></div></section>');
    sec.querySelector(".spiral-body").appendChild(bodyNode);
    return sec;
  }

  function intensityHtml(val) {
    var out = '<span class="blocks" aria-label="Intensidade ' + val + ' de 5">';
    for (var i = 1; i <= 5; i++) {
      var bg = i <= val ? INTENSITY_COLORS[i - 1] : "var(--paper-deep)";
      out += '<span class="blk" style="background:' + bg + '"></span>';
    }
    return out + "</span>";
  }

  function monthEntries(y, m) {
    var p = monthPrefix(y, m);
    return Object.keys(entries).filter(function (k) { return k.indexOf(p) === 0; }).sort().map(function (k) { return entries[k]; });
  }

  function monthNav() {
    var box = el('<div class="postcard"><button type="button" class="btn btn-sky-soft" aria-label="Mês anterior">◀</button><span class="month-label">' + MONTHS[viewMonth] + " " + viewYear + '</span><button type="button" class="btn btn-sky-soft" aria-label="Próximo mês">▶</button></div>');
    var btns = box.querySelectorAll("button");
    btns[0].onclick = function () { var d = new Date(viewYear, viewMonth - 1, 1); viewYear = d.getFullYear(); viewMonth = d.getMonth(); render(); };
    btns[1].onclick = function () { var d = new Date(viewYear, viewMonth + 1, 1); viewYear = d.getFullYear(); viewMonth = d.getMonth(); render(); };
    return box;
  }

  function entryRow(entry) {
    var w = WEATHERS[entry.weather];
    var row = el(
      '<div class="entry-item">' +
        '<span class="swatch" style="background:' + entry.color + '"></span>' +
        svgGrid(WEATHER_GRIDS[entry.weather], 34) +
        '<div class="entry-info">' +
          '<div class="entry-date">' + fmtBr(entry.date) + "</div>" +
          '<div class="entry-meta"><span>' + w.name + "</span><span>·</span><span>" + colorName(entry.color) + "</span><span>·</span>" + intensityHtml(entry.intensity) + "</div>" +
        "</div>" +
        '<div class="row">' +
          '<button type="button" class="btn btn-sun-soft">Editar</button>' +
          '<button type="button" class="btn btn-danger" aria-label="Excluir registro">X</button>' +
        "</div>" +
      "</div>"
    );
    var btns = row.querySelectorAll("button");
    btns[0].onclick = function () {
      draft = { date: entry.date, weather: entry.weather, color: entry.color, intensity: entry.intensity };
      go("reg");
    };
    btns[1].onclick = function () {
      openConfirm("Excluir registro?", "Tem certeza que deseja excluir o registro de " + fmtBr(entry.date) + "?", "Excluir", function () {
        delete entries[entry.date];
        save();
        toast("Registro excluído");
        render();
      });
    };
    return row;
  }

  function createRng(seed) {
    return function () {
      seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
      var t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function hashStr(s) {
    var h = 2166136261;
    for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
    return h >>> 0;
  }

  function shadeHex(hex, f) {
    var n = parseInt(hex.slice(1), 16), r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
    function cl(v) { return Math.max(0, Math.min(255, Math.round(v * f))); }
    return "rgb(" + cl(r) + "," + cl(g) + "," + cl(b) + ")";
  }

  function drawArt(cv, y, m, S) {
    var W = 68, H = 84, list = monthEntries(y, m);
    cv.width = W * S; cv.height = H * S;
    var ctx = cv.getContext("2d");
    ctx.imageSmoothingEnabled = false;
    function R(x, yy, w, h, c) { ctx.fillStyle = c; ctx.fillRect(x * S, yy * S, w * S, h * S); }

    var dom = 1;
    if (list.length) {
      var counts = {}, bestC = -1;
      list.forEach(function (e) { counts[e.weather] = (counts[e.weather] || 0) + 1; });
      for (var w = 0; w < 6; w++) {
        if ((counts[w] || 0) > bestC) { bestC = counts[w] || 0; dom = w; }
      }
    }
    var sky = SKY_BANDS[dom];
    R(0, 0, W, 22, sky[0]); R(0, 22, W, 22, sky[1]); R(0, 44, W, 24, sky[2]);

    var seed = hashStr(monthPrefix(y, m) + list.map(function (e) { return e.date + e.color + e.weather + e.intensity; }).join("|"));
    var rn = createRng(seed);
    for (var i = 0; i < 16; i++) {
      var sx = 2 + Math.floor(rn() * (W - 4)), sy = 2 + Math.floor(rn() * 24);
      if (dom === 0 || dom === 5) R(sx, sy, 1, 1, "#FFFDF7CC");
      else { R(sx, sy, 3, 1, "#FFFDF7AA"); R(sx + 1, sy - 1, 1, 1, "#FFFDF788"); }
    }

    var sunny = list.filter(function (e) { return e.weather <= 1; }).length;
    if (sunny >= 2) {
      var bands = ["#F4B4CD", "#F8DE88", "#9FD8B4", "#9CCEEB"];
      bands.forEach(function (col, idx) {
        R(50 + idx, 6 + idx, 12 - idx * 2, 1, col);
        R(50 + idx, 6 + idx, 1, 6 - idx, col);
        R(61 - idx, 6 + idx, 1, 6 - idx, col);
      });
    }

    var base = 68, days = new Date(y, m + 1, 0).getDate(), p = monthPrefix(y, m), has = {};
    for (var d = 1; d <= days; d++) {
      var k = p + "-" + String(d).padStart(2, "0"), e = entries[k];
      if (!e) continue;
      has[d] = true;
      var r2 = createRng(hashStr(e.date + e.color)), hh = 6 + e.intensity * 8, x0 = 3 + (d - 1) * 2;
      for (var yy = 0; yy < hh; yy += 2) {
        for (var c = 0; c < 2; c++) {
          if (e.intensity < 3 && r2() < 0.22 && yy > hh - 4) continue;
          R(x0 + c, base - yy - 2, 1, 2, shadeHex(e.color, 0.84 + r2() * 0.34 + (e.intensity - 3) * 0.03));
        }
      }
      R(x0, base - hh - 2, 2, 2, shadeHex(e.color, 1.18));
      var tp = base - hh;
      if (e.weather === 0) { R(x0, tp - 6, 2, 2, "#F8D98A"); R(x0 - 1, tp - 5, 1, 1, "#E49A4E"); R(x0 + 2, tp - 5, 1, 1, "#E49A4E"); }
      if (e.weather === 1 || e.weather === 2) { R(x0 - 1, tp - 5, 4, 2, e.weather === 2 ? "#89B3C9" : "#CBE8F6"); R(x0, tp - 6, 2, 1, "#FFFDF7"); }
      if (e.weather === 3 || e.weather === 4) {
        R(x0 - 1, tp - 5, 4, 2, "#7392A3");
        for (var q = 0; q < 3; q++) R(x0 + (q % 2), tp - 3 + q * 2, 1, 2, "#6E98B3");
        if (e.weather === 4) { R(x0, tp - 9, 1, 2, "#FFF199"); R(x0 + 1, tp - 7, 1, 2, "#F8DE68"); }
      }
      if (e.weather === 5) { for (var f = 0; f < hh; f += 6) R(x0 - 1, base - f - 3, 4, 1, "#FFFDF799"); }
    }
    for (var d2 = 1; d2 <= days; d2++) if (!has[d2]) R(3 + (d2 - 1) * 2, base - 1, 2, 1, "#D8C5B0");

    R(0, base, W, H - base, "#FFF6EB");
    for (var gx = 0; gx < W; gx += 4) R(gx, base, 2, 1, "#C8824B");
    ctx.fillStyle = "#3E2A1E";
    ctx.font = "bold " + (4.5 * S) + "px 'Silkscreen','Courier New',monospace";
    ctx.textBaseline = "middle";
    ctx.fillText((MONTHS[m] + " " + y).toUpperCase(), 3 * S, 74 * S);
    ctx.fillStyle = "#8C6549";
    ctx.font = "bold " + (2.8 * S) + "px 'Pixelify Sans','Courier New',monospace";
    ctx.fillText(list.length ? list.length + " dia(s) registrados" : "sem registros", 3 * S, 79.5 * S);
    ctx.strokeStyle = "#3E2A1E";
    ctx.lineWidth = S;
    ctx.strokeRect(S / 2, S / 2, W * S - S, H * S - S);
    return list.length;
  }

  function barRow(label, value, max, color, suffix) {
    var pct = value > 0 && max > 0 ? Math.max(6, Math.round((value / max) * 100)) : 0;
    return el(
      '<div class="bar-row">' +
        '<span class="bar-label">' + label + "</span>" +
        '<div class="bar-track">' + (pct > 0 ? '<div class="bar-fill" style="width:' + pct + "%;background:" + color + '"></div>' : "") + "</div>" +
        '<span class="bar-val">' + suffix + "</span>" +
      "</div>"
    );
  }

  function buildCalGrid(y, m, mini) {
    var g = el('<div class="cal-grid"></div>');
    WEEKDAYS.forEach(function (l) { g.appendChild(el('<div class="cal-head">' + l + "</div>")); });
    var first = new Date(y, m, 1).getDay(), days = new Date(y, m + 1, 0).getDate(), p = monthPrefix(y, m), td = todayIso();
    for (var i = 0; i < first; i++) g.appendChild(document.createElement("div"));
    for (var d = 1; d <= days; d++) {
      (function (day) {
        var iso = p + "-" + String(day).padStart(2, "0"), e = entries[iso];
        var cls = "cal-cell" + (mini ? " mini" : "") + (iso === td ? " today" : "") + (!mini && iso === selectedDate ? " sel" : "");
        var cell = el(mini ? '<div class="' + cls + '"></div>' : '<button type="button" class="' + cls + '"><span class="cal-num">' + day + "</span></button>");
        if (e) cell.style.backgroundColor = e.color;
        if (!mini) cell.onclick = function () { selectedDate = iso; render(); };
        g.appendChild(cell);
      })(d);
    }
    return g;
  }

  var VIEWS = {};

  VIEWS.home = function (main) {
    var now = new Date(), h = now.getHours(), greet = h < 12 ? "Bom dia" : h < 18 ? "Boa tarde" : "Boa noite";
    var td = todayIso(), t = entries[td], list = monthEntries(now.getFullYear(), now.getMonth());
    var grid = el('<div class="grid-home"></div>');

    var leftBody = document.createElement("div");
    leftBody.appendChild(el(
      '<div class="greeting-row">' +
        '<div><h1 class="greeting-title">' + greet + '!</h1><p class="sub">' + now.getDate() + " de " + MONTHS[now.getMonth()] + " de " + now.getFullYear() + '</p><p class="motto">Cada dia tem uma cor. Cada mês conta uma história.</p></div>' +
        '<div class="sprite-frame">' + svgGrid(WEATHER_GRIDS[t ? t.weather : 0], 58, "pixel-float") + "</div>" +
      "</div>"
    ));

    var status = el('<div class="divider"></div>');
    if (t) {
      status.innerHTML = '<div class="row"><span class="swatch" style="background:' + t.color + '"></span><strong>Hoje: ' + WEATHERS[t.weather].name + " · " + colorName(t.color) + " · </strong>" + intensityHtml(t.intensity) + "</div>";
    } else {
      status.innerHTML = '<p class="sub" style="margin:0">Você ainda não registrou hoje. Escolha seu clima e sua cor!</p>';
    }
    leftBody.appendChild(status);

    var acts = el('<div class="row"><button type="button" class="btn btn-berry">' + (t ? "Editar hoje" : "Registrar hoje") + '</button><button type="button" class="btn btn-sun">Minha arte</button><button type="button" class="btn btn-mint">Estatísticas</button></div>');
    var ab = acts.querySelectorAll("button");
    ab[0].onclick = function () {
      draft = t ? { date: t.date, weather: t.weather, color: t.color, intensity: t.intensity } : { date: td, weather: null, color: null, intensity: 3 };
      go("reg");
    };
    ab[1].onclick = function () { go("art"); };
    ab[2].onclick = function () { go("stats"); };
    leftBody.appendChild(acts);
    grid.appendChild(spiralCard("Diário de hoje", "berry", now.getDate() + " de " + MONTHS[now.getMonth()], leftBody));

    var rightBody = document.createElement("div");
    rightBody.appendChild(buildCalGrid(now.getFullYear(), now.getMonth(), true));
    var calBtn = el('<button type="button" class="btn btn-paper-deep" style="width:100%;margin-top:16px">Abrir calendário completo</button>');
    calBtn.onclick = function () { go("cal"); };
    rightBody.appendChild(calBtn);
    grid.appendChild(spiralCard(MONTHS[now.getMonth()], "sky", list.length + " dia(s)", rightBody));

    main.appendChild(grid);
  };

  VIEWS.reg = function (main) {
    if (!draft) draft = { date: todayIso(), weather: null, color: null, intensity: 3 };
    var td = todayIso(), ex = entries[draft.date];

    var dBody = el('<div><div class="row"><label for="d-in" style="font-family:var(--font-pixel);font-weight:700">Dia escolhido:</label><input id="d-in" type="date" max="' + td + '" value="' + draft.date + '"></div></div>');
    dBody.querySelector("input").onchange = function () {
      if (!this.value) return;
      draft.date = this.value;
      var found = entries[draft.date];
      if (found) { draft.weather = found.weather; draft.color = found.color; draft.intensity = found.intensity; }
      render();
    };
    if (ex) dBody.appendChild(el('<p class="notice">Já existe registro em ' + fmtBr(draft.date) + ": salvar vai atualizá-lo.</p>"));
    main.appendChild(spiralCard("Data do registro", "terracotta", "", dBody));

    var wGrid = el('<div class="weather-grid"></div>');
    WEATHERS.forEach(function (w) {
      var b = el('<button type="button" class="btn weather-opt' + (draft.weather === w.id ? " selected" : "") + '">' + svgGrid(WEATHER_GRIDS[w.id], 48) + "<span>" + w.name + "</span></button>");
      b.onclick = function () { draft.weather = w.id; render(); };
      wGrid.appendChild(b);
    });
    main.appendChild(spiralCard("1 · Clima do dia", "sky", "", wGrid));

    var cGrid = el('<div class="color-grid"></div>');
    COLORS.forEach(function (c) {
      var on = draft.color === c[1];
      var b = el('<button type="button" class="btn color-opt' + (on ? " selected-color" : "") + '" title="' + c[0] + '"><span class="color-chip" style="background:' + c[1] + '">' + (on ? '<span class="color-check">✓</span>' : "") + "</span><span>" + c[0] + "</span></button>");
      b.onclick = function () { draft.color = c[1]; render(); };
      cGrid.appendChild(b);
    });
    main.appendChild(spiralCard("2 · Cor do dia", "berry", draft.color ? colorName(draft.color) + " (" + draft.color + ")" : "Escolha uma cor", cGrid));

    var lGrid = el('<div class="level-grid"></div>');
    for (var lv = 1; lv <= 5; lv++) {
      (function (lvl) {
        var sq = "";
        for (var j = 0; j < lvl; j++) sq += '<span class="blk" style="width:10px;height:12px;background:' + INTENSITY_COLORS[lvl - 1] + '"></span>';
        var b = el('<button type="button" class="btn level-opt' + (draft.intensity === lvl ? " selected" : "") + '"><div class="blocks" style="flex-wrap:wrap;justify-content:center">' + sq + '</div><span style="font-family:var(--font-display);font-size:12px">' + lvl + "</span></button>");
        b.onclick = function () { draft.intensity = lvl; render(); };
        lGrid.appendChild(b);
      })(lv);
    }
    main.appendChild(spiralCard("3 · Intensidade", "sun", "Nível " + draft.intensity + " de 5", lGrid));

    var saveBtn = el('<button type="button" class="btn btn-berry btn-full">' + (ex ? "Atualizar registro" : "Salvar registro") + "</button>");
    saveBtn.onclick = function () {
      if (draft.date > td) { toast("Não é possível registrar uma data futura."); return; }
      if (draft.weather === null) { toast("Escolha um clima para o dia."); return; }
      if (!draft.color) { toast("Escolha uma cor para o dia."); return; }
      var commit = function () {
        var nowTs = Date.now();
        entries[draft.date] = {
          date: draft.date, weather: draft.weather, color: draft.color, intensity: draft.intensity,
          createdAt: ex ? ex.createdAt : nowTs, updatedAt: nowTs
        };
        save();
        var d = new Date(draft.date + "T12:00:00");
        viewYear = d.getFullYear(); viewMonth = d.getMonth(); selectedDate = draft.date;
        draft = null;
        toast("Registro salvo!");
        go("cal");
      };
      if (ex) openConfirm("Atualizar registro?", "Já existe um registro em " + fmtBr(draft.date) + ". Deseja substituir pelas novas escolhas?", "Sim, atualizar", commit);
      else commit();
    };
    main.appendChild(saveBtn);
  };

  VIEWS.cal = function (main) {
    main.appendChild(monthNav());
    main.appendChild(spiralCard("Calendário de cores", "sky", "", buildCalGrid(viewYear, viewMonth, false)));

    var p = monthPrefix(viewYear, viewMonth), td = todayIso();
    if (selectedDate && selectedDate.indexOf(p) === 0) {
      var e = entries[selectedDate], body = document.createElement("div");
      if (e) {
        body.appendChild(entryRow(e));
      } else {
        var isFut = selectedDate > td;
        var row = el('<div class="row" style="justify-content:space-between"><p class="sub" style="margin:0">' + (isFut ? "Dia futuro — volte aqui quando ele chegar." : "Sem registro neste dia.") + "</p></div>");
        if (!isFut) {
          var rb = el('<button type="button" class="btn btn-berry">Registrar este dia</button>');
          rb.onclick = function () { draft = { date: selectedDate, weather: null, color: null, intensity: 3 }; go("reg"); };
          row.appendChild(rb);
        }
        body.appendChild(row);
      }
      main.appendChild(spiralCard("Dia " + fmtBr(selectedDate), "sun", "", body));
    }

    var list = monthEntries(viewYear, viewMonth).reverse();
    var hBody = document.createElement("div");
    if (!list.length) hBody.appendChild(el('<div class="empty-msg">Nenhum registro neste mês.<br>Cada dia tem uma cor, comece pela de hoje.</div>'));
    else list.forEach(function (item) { hBody.appendChild(entryRow(item)); });
    main.appendChild(spiralCard("Histórico do mês", "terracotta", list.length + " registro(s)", hBody));
  };

  VIEWS.art = function (main) {
    main.appendChild(monthNav());
    var wrap = el('<div class="grid-art"></div>');
    var cv = el('<canvas id="art-canvas" aria-label="Arte mensal em pixel art"></canvas>');
    var n = drawArt(cv, viewYear, viewMonth, 8);
    wrap.appendChild(cv);

    var side = el(
      '<div>' +
        '<p class="sub" style="margin:0 0 16px;color:var(--cocoa)">' + (n ? "Composição gerada a partir dos seus " + n + " registro(s). Dias vazios ficam vazios." : "Sem registros neste mês: nada foi inventado.") + "</p>" +
        '<div class="row" style="flex-direction:column;align-items:stretch">' +
          '<button type="button" class="btn btn-berry">Salvar PNG</button>' +
          '<button type="button" class="btn btn-sky-soft">Compartilhar</button>' +
        "</div>" +
      "</div>"
    );
    var btns = side.querySelectorAll("button");
    btns[0].onclick = function () {
      var a = document.createElement("a");
      a.href = cv.toDataURL("image/png");
      a.download = "moodpixels-" + monthPrefix(viewYear, viewMonth) + ".png";
      a.click();
      toast("Arte salva em PNG!");
    };
    btns[1].onclick = function () {
      cv.toBlob(function (bl) {
        if (!bl) { toast("Compartilhar indisponível: use Salvar PNG"); return; }
        var f = new File([bl], "moodpixels-" + monthPrefix(viewYear, viewMonth) + ".png", { type: "image/png" });
        if (navigator.canShare && navigator.canShare({ files: [f] })) navigator.share({ files: [f], title: "Minha arte MoodPixels" }).catch(function () {});
        else toast("Compartilhar indisponível neste navegador: use Salvar PNG");
      });
    };
    wrap.appendChild(side);
    main.appendChild(spiralCard("Cartão postal do mês", "berry", "", wrap));
  };

  VIEWS.stats = function (main) {
    main.appendChild(monthNav());
    var list = monthEntries(viewYear, viewMonth), all = Object.keys(entries).length;
    main.appendChild(el('<div class="postcard"><strong style="font-family:var(--font-pixel)">' + list.length + ' dia(s) neste mês</strong><span class="badge-count">' + all + " no total</span></div>"));

    if (!list.length) {
      main.appendChild(spiralCard("Estatísticas do mês", "mint", "", el('<div class="empty-msg">Sem dados neste mês.</div>')));
    } else {
      var ci = [0, 0, 0, 0, 0], cw = [0, 0, 0, 0, 0, 0], cc = {};
      list.forEach(function (e) { ci[e.intensity - 1]++; cw[e.weather]++; cc[e.color] = (cc[e.color] || 0) + 1; });
      var sortedC = Object.keys(cc).sort(function (a, b) { return cc[b] - cc[a]; });
      var bestW = 0;
      for (var i = 1; i < 6; i++) if (cw[i] > cw[bestW]) bestW = i;

      var grid = el('<div class="grid-2"></div>');

      var dBody = el(
        '<div>' +
          '<div class="highlight-card" style="background:var(--paper-deep)"><span class="swatch" style="background:' + sortedC[0] + '"></span><div><div class="sub" style="margin:0;font-size:12px">Cor mais usada</div><div style="font-family:var(--font-pixel);font-weight:700">' + colorName(sortedC[0]) + " (" + sortedC[0] + ")</div></div></div>" +
          '<div class="highlight-card" style="background:var(--sky-soft)">' + svgGrid(WEATHER_GRIDS[bestW], 36) + '<div><div class="sub" style="margin:0;font-size:12px">Clima predominante</div><div style="font-family:var(--font-pixel);font-weight:700">' + WEATHERS[bestW].name + "</div></div></div>" +
        "</div>"
      );
      grid.appendChild(spiralCard("Destaques", "berry", "", dBody));

      var wBody = document.createElement("div");
      WEATHERS.forEach(function (w) { wBody.appendChild(barRow(w.name, cw[w.id], list.length, w.bar, Math.round((cw[w.id] / list.length) * 100) + "%")); });
      grid.appendChild(spiralCard("Clima (%)", "sky", "", wBody));

      var iBody = document.createElement("div");
      ci.forEach(function (v, idx) { iBody.appendChild(barRow("Nível " + (idx + 1), v, list.length, INTENSITY_COLORS[idx], String(v))); });
      grid.appendChild(spiralCard("Intensidades", "sun", "", iBody));

      var cBody = document.createElement("div");
      sortedC.forEach(function (hex) { cBody.appendChild(barRow(colorName(hex), cc[hex], list.length, hex, String(cc[hex]))); });
      grid.appendChild(spiralCard("Frequência das cores", "terracotta", "", cBody));

      main.appendChild(grid);
    }

    var compBody = document.createElement("div"), compItems = [], mx = 1;
    for (var k = 5; k >= 0; k--) {
      var dd = new Date(viewYear, viewMonth - k, 1);
      var cnt = monthEntries(dd.getFullYear(), dd.getMonth()).length;
      if (cnt > mx) mx = cnt;
      compItems.push({ label: MONTHS[dd.getMonth()].slice(0, 3) + "/" + String(dd.getFullYear()).slice(2), count: cnt });
    }
    compItems.forEach(function (m) { compBody.appendChild(barRow(m.label, m.count, mx, "#EA639B", String(m.count))); });
    main.appendChild(spiralCard("Comparação de meses", "mint", "", compBody));
  };

  VIEWS.set = function (main) {
    var total = Object.keys(entries).length;
    var profile = getProfile();
    var body = el(
      '<div>' +
        '<div style="display:flex;gap:16px;align-items:flex-start">' +
          '<div class="sprite-frame" style="width:64px;height:64px">' + svgGrid(RAINBOW_GRID, 46) + "</div>" +
          '<div><p style="margin:0;font-family:var(--font-display);font-size:15px">MoodPixels · Versão 1.1 (PWA)</p>' +
          '<p class="sub">Privacidade: tudo fica salvo apenas neste dispositivo, funciona sem internet e sem contas. Nada é enviado a servidores. O app não faz interpretações psicológicas.</p>' +
          (profile ? '<p class="profile-summary">Perfil: <strong>' + escapeHtml(profile.name + " · @" + profile.nickname) + "</strong></p>" : "") +
          '<p style="margin:10px 0 0;font-family:var(--font-pixel);font-weight:700">' + total + " registro(s) armazenado(s) neste navegador.</p></div>" +
        "</div>" +
        '<div class="divider row"><button type="button" class="btn btn-lavender">Personalizar letra</button><button type="button" class="btn btn-sky-soft">Exportar JSON</button><button type="button" class="btn btn-danger">Excluir tudo</button><button type="button" class="btn btn-paper-deep">Sair</button></div>' +
      "</div>"
    );
    var btns = body.querySelectorAll("button");
    btns[0].onclick = function () {
      openLetterEditor(profile);
    };
    btns[1].onclick = function () {
      var a = document.createElement("a");
      a.href = "data:application/json;charset=utf-8," + encodeURIComponent(JSON.stringify(entries, null, 2));
      a.download = "moodpixels-backup.json";
      a.click();
      toast("Backup JSON exportado!");
    };
    btns[2].onclick = function () {
      openConfirm("Excluir todos os registros?", "Essa ação apaga todos os " + total + " registro(s) salvos neste navegador e não pode ser desfeita.", "Excluir tudo", function () {
        entries = {};
        selectedDate = null;
        save();
        toast("Todos os registros foram excluídos");
        render();
      });
    };
    btns[3].onclick = function () {
      localStorage.removeItem(SESSION_KEY);
      authenticated = false;
      tab = "home";
      render();
    };
    if (installPrompt) {
      var ib = el('<button type="button" class="btn btn-berry" style="margin-top:12px">Instalar app</button>');
      ib.onclick = function () {
        installPrompt.prompt();
        installPrompt.userChoice.then(function () { installPrompt = null; render(); });
      };
      body.appendChild(ib);
    }
    main.appendChild(spiralCard("Sobre o MoodPixels", "terracotta", "", body));
  };

  function go(nextTab) {
    if (nextTab === "reg" && tab !== "reg") {
      var td = todayIso(), ex = entries[td];
      draft = ex ? { date: ex.date, weather: ex.weather, color: ex.color, intensity: ex.intensity } : { date: td, weather: null, color: null, intensity: 3 };
    }
    tab = nextTab;
    render();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function encodePassword(value) {
    return btoa(unescape(encodeURIComponent(value)));
  }

  function getProfile() {
    try {
      var nickname = localStorage.getItem(SESSION_KEY);
      if (!nickname || nickname === "active") nickname = null;
      var profiles = JSON.parse(localStorage.getItem(PROFILES_KEY)) || {};
      if (nickname && profiles[nickname]) return profiles[nickname];
      var legacy = JSON.parse(localStorage.getItem(PROFILE_KEY)) || null;
      return legacy;
    } catch (e) {
      return null;
    }
  }

  function saveProfile(profile) {
    var profiles = {};
    try { profiles = JSON.parse(localStorage.getItem(PROFILES_KEY)) || {}; } catch (e) {}
    profiles[profile.nickname] = profile;
    localStorage.setItem(PROFILES_KEY, JSON.stringify(profiles));
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  }

  function getDefaultAvatar() {
    return {
      type: "letter",
      letter: "A",
      background: "#F7C66E",
      completed: true
    };
  }

  function getAvatar(profile) {
    var avatar = profile && profile.avatar ? profile.avatar : getDefaultAvatar();
    if (!avatar.type || avatar.type !== "letter") return getDefaultAvatar();
    return avatar;
  }

  function renderLogin() {
    var app = document.getElementById("app");
    app.innerHTML = "";
    document.getElementById("nav").innerHTML = "";

    var profiles = {};
    try { profiles = JSON.parse(localStorage.getItem(PROFILES_KEY)) || {}; } catch (e) {}
    var signupLetter = "A";
    var signupColor = "#F7C66E";
    var palette = [
      ["Amarelo", "#F7C66E"], ["Laranja", "#F2994A"], ["Vermelho", "#E05A5A"],
      ["Rosa", "#F4A6C0"], ["Roxo", "#A27BD1"], ["Azul", "#5B9BD5"],
      ["Verde", "#7BC47F"], ["Ciano", "#5FD0D0"], ["Branco", "#FFFDF7"],
      ["Cinza", "#9AA0A6"], ["Marrom", "#8B5E3C"]
    ];
    var card = el(
      '<main class="login-screen">' +
        '<section class="login-card">' +
          '<div class="login-logo">' + svgGrid(RAINBOW_GRID, 58) + '</div>' +
          '<h1>MOODPIXELS</h1>' +
          '<p class="login-sub">Crie sua conta ou entre no diário</p>' +
          '<form class="login-form">' +
            '<label>Nome <span class="optional-label">(novo usuário)</span><input id="login-name" type="text" autocomplete="name"></label>' +
            '<label>Apelido<input id="login-nickname" type="text" autocomplete="username" required></label>' +
            '<label>Senha<input id="login-password" type="password" autocomplete="current-password" required></label>' +
            '<div class="letter-signup"><label>Letra do perfil</label><div id="signup-letter-grid" class="signup-letter-grid"></div></div>' +
            '<div class="letter-signup"><label>Cor de fundo</label><div id="signup-color-grid" class="signup-color-grid"></div></div>' +
            '<p id="login-error" class="login-error" role="alert"></p>' +
            '<button type="submit" class="btn btn-berry btn-full">Continuar</button>' +
          '</form>' +
        '</section>' +
      '</main>'
    );

    var form = card.querySelector("form");
    var letterGrid = card.querySelector("#signup-letter-grid");
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").forEach(function (letter) {
      var button = el('<button type="button" class="signup-letter' + (letter === signupLetter ? " selected" : "") + '">' + letter + "</button>");
      button.onclick = function () {
        signupLetter = letter;
        letterGrid.querySelectorAll("button").forEach(function (item) { item.classList.remove("selected"); });
        button.classList.add("selected");
      };
      letterGrid.appendChild(button);
    });
    var colorGrid = card.querySelector("#signup-color-grid");
    palette.forEach(function (color) {
      var button = el('<button type="button" class="signup-color' + (color[1] === signupColor ? " selected" : "") + '" title="' + color[0] + '" style="background:' + color[1] + '"></button>');
      button.onclick = function () {
        signupColor = color[1];
        colorGrid.querySelectorAll("button").forEach(function (item) { item.classList.remove("selected"); });
        button.classList.add("selected");
      };
      colorGrid.appendChild(button);
    });
    form.onsubmit = function (ev) {
      ev.preventDefault();
      var error = card.querySelector("#login-error");
      var nickname = card.querySelector("#login-nickname").value.trim();
      var password = card.querySelector("#login-password").value;
      if (!nickname || !password) {
        error.textContent = "Preencha o apelido e a senha.";
        return;
      }

      var existing = profiles[nickname];
      if (!existing) {
        var name = card.querySelector("#login-name").value.trim();
        if (!name) {
          error.textContent = "Preencha seu nome.";
          return;
        }
        var newProfile = {
          name: name,
          nickname: nickname,
          password: encodePassword(password),
          avatar: {
            type: "letter",
            letter: signupLetter,
            background: signupColor,
            completed: true
          }
        };
        saveProfile(newProfile);
        localStorage.setItem(SESSION_KEY, nickname);
        authenticated = true;
        toast("Perfil criado!");
        render();
        return;
      }

      if (encodePassword(password) !== existing.password) {
        error.textContent = "Apelido ou senha incorretos.";
        return;
      }
      localStorage.setItem(SESSION_KEY, nickname);
      authenticated = true;
      render();
    };

    app.appendChild(card);
  }

  function avatarAssetUrl(avatar) {
    var hairFile = {
      "crespo": "hair-crespo",
      "raspado": "hair-raspado",
      "liso-franja": "hair-liso-franja",
      "comprido-liso": "hair-comprido-liso",
      "wolf-cut": "hair-wolf-cut",
      "chanel": "hair-chanel",
      "ombros-enrolado": "hair-ombros-enrolado"
    }[avatar.hairStyle] || "hair-crespo";
    var eyeFile = "eyes-" + (avatar.eyeColor || "brown");
    var clothingFile = avatar.clothingType + "-" + avatar.clothingColor;
    var earringFile = avatar.earring === "gold" ? "brinco-gold-large" :
      avatar.earring === "silver" ? "brinco-silver-large" : null;
    return { hair: hairFile, eye: eyeFile, clothing: clothingFile, earring: earringFile };
  }

  function hairFilter(color) {
    if (color === "preto") return "brightness(.42) saturate(.7)";
    if (color === "branco") return "brightness(1.55) saturate(.12)";
    return "sepia(.22) saturate(.9)";
  }

  function avatarPreviewHtml(avatar, compact) {
    var normalized = getDefaultAvatar();
    if (avatar && avatar.type === "letter") normalized = avatar;
    return (
      '<div class="avatar-preview letter-avatar ' + (compact ? "avatar-preview-compact" : "") + '" aria-label="Letra ' + escapeHtml(normalized.letter) + ' com fundo personalizado" style="background:' + normalized.background + '">' +
        '<span>' + escapeHtml(normalized.letter) + "</span>" +
      '</div>'
    );
  }

  function openLetterEditor(profile) {
    var root = document.getElementById("modal-root");
    var current = getAvatar(profile);
    var palette = [
      "#F7C66E", "#F2994A", "#E05A5A", "#F4A6C0", "#A27BD1", "#5B9BD5",
      "#7BC47F", "#5FD0D0", "#FFFDF7", "#9AA0A6", "#8B5E3C"
    ];
    var draft = cloneAvatar(current);
    var wrap = el(
      '<div class="modal-backdrop"><section class="letter-editor" role="dialog" aria-modal="true">' +
        '<h3>Personalizar letra</h3>' +
        '<div id="editor-preview" class="editor-preview"></div>' +
        '<label>Letra</label><div class="signup-letter-grid" id="editor-letters"></div>' +
        '<label>Cor de fundo</label><div class="signup-color-grid" id="editor-colors"></div>' +
        '<div class="modal-actions"><button type="button" class="btn btn-paper-deep">Cancelar</button><button type="button" class="btn btn-berry">Salvar</button></div>' +
      '</section></div>'
    );
    function refresh() { wrap.querySelector("#editor-preview").innerHTML = avatarPreviewHtml(draft, false); }
    refresh();
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").forEach(function (letter) {
      var button = el('<button type="button" class="signup-letter' + (draft.letter === letter ? " selected" : "") + '">' + letter + "</button>");
      button.onclick = function () {
        draft.letter = letter;
        wrap.querySelectorAll("#editor-letters button").forEach(function (item) { item.classList.remove("selected"); });
        button.classList.add("selected");
        refresh();
      };
      wrap.querySelector("#editor-letters").appendChild(button);
    });
    palette.forEach(function (color) {
      var button = el('<button type="button" class="signup-color' + (draft.background === color ? " selected" : "") + '" style="background:' + color + '"></button>');
      button.onclick = function () {
        draft.background = color;
        wrap.querySelectorAll("#editor-colors button").forEach(function (item) { item.classList.remove("selected"); });
        button.classList.add("selected");
        refresh();
      };
      wrap.querySelector("#editor-colors").appendChild(button);
    });
    var buttons = wrap.querySelectorAll("button.modal-actions");
    var actions = wrap.querySelectorAll(".modal-actions button");
    actions[0].onclick = function () { root.innerHTML = ""; };
    actions[1].onclick = function () {
      draft.type = "letter";
      draft.completed = true;
      profile.avatar = cloneAvatar(draft);
      saveProfile(profile);
      root.innerHTML = "";
      toast("Ícone atualizado!");
      render();
    };
    wrap.onclick = function (ev) { if (ev.target === wrap) root.innerHTML = ""; };
    root.appendChild(wrap);
  }

  function cloneAvatar(avatar) {
    return JSON.parse(JSON.stringify(avatar));
  }

  function pushAvatarChange(category, before) {
    avatarHistory.push({ category: category, before: cloneAvatar(before) });
  }

  function renderAvatar() {
    var app = document.getElementById("app");
    app.innerHTML = "";
    document.getElementById("nav").innerHTML = "";
    var profile = getProfile();
    if (!profile) { authenticated = false; render(); return; }

    var card = el(
      '<main class="avatar-screen">' +
        '<section class="avatar-customizer">' +
          '<header class="avatar-title"><h1>Personalize seu avatar!</h1><p>Crie um personagem que tenha a sua cara.</p></header>' +
          '<div class="avatar-stage" id="avatar-stage"></div>' +
          '<nav class="avatar-categories" aria-label="Categorias do avatar"></nav>' +
          '<div class="avatar-options" id="avatar-options"></div>' +
          '<footer class="avatar-actions">' +
            '<button type="button" class="btn btn-paper-deep" id="undo-avatar">VOLTAR PEÇA</button>' +
            '<button type="button" class="btn btn-danger" id="reset-avatar">RESTAURAR AVATAR</button>' +
            '<button type="button" class="btn btn-berry" id="confirm-avatar">CONFIRMAR AVATAR</button>' +
          '</footer>' +
        '</section>' +
      '</main>'
    );
    card.querySelector("#avatar-stage").innerHTML = avatarPreviewHtml(avatarDraft, false);

    var categories = [
      ["hair", "Cabelos"], ["eyes", "Olhos"], ["expression", "Expressões"],
      ["earring", "Brincos"], ["clothing", "Roupas"]
    ];
    var nav = card.querySelector(".avatar-categories");
    categories.forEach(function (item) {
      var button = el('<button type="button" class="avatar-category' + (avatarCategory === item[0] ? " active" : "") + '">' + item[1] + '</button>');
      button.onclick = function () { avatarCategory = item[0]; renderAvatar(); };
      nav.appendChild(button);
    });

    function refreshPreview() {
      card.querySelector("#avatar-stage").innerHTML = avatarPreviewHtml(avatarDraft, false);
    }

    function option(name, label, active, onClick) {
      var button = el('<button type="button" class="avatar-option' + (active ? " selected" : "") + '"><span class="option-label">' + label + "</span></button>");
      button.onclick = function () {
        var before = cloneAvatar(avatarDraft);
        onClick();
        pushAvatarChange(name, before);
        refreshPreview();
        renderAvatar();
      };
      return button;
    }

    var options = card.querySelector("#avatar-options");
    if (avatarCategory === "hair") {
      [["crespo","Crespo"],["raspado","Raspado"],["liso-franja","Liso com franja"],["comprido-liso","Comprido liso"],["wolf-cut","Wolf cut"],["chanel","Chanel"],["ombros-enrolado","Ombros enrolado"]].forEach(function (item) {
        options.appendChild(option("hairStyle", item[1], avatarDraft.hairStyle === item[0], function () { avatarDraft.hairStyle = item[0]; }));
      });
      [["preto","Preto"],["castanho","Castanho"],["branco","Branco"]].forEach(function (item) {
        options.appendChild(option("hairColor", item[1], avatarDraft.hairColor === item[0], function () { avatarDraft.hairColor = item[0]; }));
      });
    } else if (avatarCategory === "eyes") {
      [["brown","Castanho"],["blue","Azul"],["green","Verde"]].forEach(function (item) {
        options.appendChild(option("eyeColor", item[1], avatarDraft.eyeColor === item[0], function () { avatarDraft.eyeColor = item[0]; }));
      });
    } else if (avatarCategory === "expression") {
      [["discreto","Sorriso discreto"],["aberto","Sorriso aberto"],["dentes","Dentes"],["gargalhada","Gargalhada"],["fechado","Boca fechada"],["lado","Sorriso de lado"],["neutra","Neutra"],["triste","Triste"]].forEach(function (item) {
        options.appendChild(option("expression", item[1], avatarDraft.expression === item[0], function () { avatarDraft.expression = item[0]; }));
      });
    } else if (avatarCategory === "earring") {
      [["gold","Argola dourada"],["silver","Argola prateada"],["none","Sem brincos"]].forEach(function (item) {
        options.appendChild(option("earring", item[1], avatarDraft.earring === item[0], function () { avatarDraft.earring = item[0]; }));
      });
    } else {
      [["camiseta","Camiseta"],["regata","Regata"]].forEach(function (item) {
        options.appendChild(option("clothingType", item[1], avatarDraft.clothingType === item[0], function () { avatarDraft.clothingType = item[0]; }));
      });
      [["white","Branca"],["green","Verde"],["blue","Azul-claro"]].forEach(function (item) {
        options.appendChild(option("clothingColor", item[1], avatarDraft.clothingColor === item[0], function () { avatarDraft.clothingColor = item[0]; }));
      });
    }

    card.querySelector("#undo-avatar").onclick = function () {
      var last = avatarHistory.pop();
      if (!last) { toast("Nenhuma alteração para desfazer."); return; }
      avatarDraft = cloneAvatar(last.before);
      renderAvatar();
    };
    card.querySelector("#reset-avatar").onclick = function () {
      openConfirm("Restaurar avatar?", "Todas as peças voltarão ao personagem original.", "Restaurar", function () {
        avatarHistory.push({ category: "avatar", before: cloneAvatar(avatarDraft) });
        avatarDraft = getDefaultAvatar();
        renderAvatar();
      });
    };
    card.querySelector("#confirm-avatar").onclick = function () {
      avatarDraft.completed = true;
      profile.avatar = cloneAvatar(avatarDraft);
      saveProfile(profile);
      avatarMode = false;
      avatarHistory = [];
      toast("Avatar salvo!");
      render();
    };
    app.appendChild(card);
  }

  function render() {
    if (!authenticated) {
      renderLogin();
      return;
    }
    var activeProfile = getProfile();
    if (!activeProfile) {
      authenticated = false;
      renderLogin();
      return;
    }
    var activeAvatar = getAvatar(activeProfile);
    var app = document.getElementById("app");
    app.innerHTML = "";

    var top = el(
      '<header class="topbar">' +
        '<button type="button" class="brand-btn">' + svgGrid(RAINBOW_GRID, 38) + '<div><span class="brand-title">MOODPIXELS</span><span class="brand-sub">Diário em pixel art</span></div></button>' +
        '<div class="profile-chip">' + avatarPreviewHtml(activeAvatar, true) + '<strong>@' + escapeHtml(activeProfile.nickname) + "</strong></div>" +
        '<button type="button" class="btn' + (tab === "set" ? " btn-sun" : "") + '" aria-label="Configurações">' + svgGrid(GEAR_GRID, 18) + '<span class="hide-sm">Configurações</span></button>' +
      "</header>"
    );
    var hBtns = top.querySelectorAll("button");
    hBtns[0].onclick = function () { go("home"); };
    hBtns[1].onclick = function () { go("set"); };
    app.appendChild(top);

    var dNav = el('<nav class="desktop-nav" aria-label="Navegação principal"></nav>');
    TABS.forEach(function (t) {
      var active = tab === t.id;
      var b = el('<button type="button" class="btn ' + (active ? t.btnClass : "") + '">' + svgGrid(WEATHER_GRIDS[t.weather], 26) + "<span>" + t.label + "</span></button>");
      b.onclick = function () { go(t.id); };
      dNav.appendChild(b);
    });
    app.appendChild(dNav);

    var main = document.createElement("main");
    VIEWS[tab](main);
    app.appendChild(main);

    var mNav = document.getElementById("nav");
    mNav.innerHTML = "";
    TABS.forEach(function (t) {
      var b = el('<button type="button" class="' + (tab === t.id ? "on-" + t.id : "") + '">' + svgGrid(WEATHER_GRIDS[t.weather], 24) + "<span>" + t.label + "</span></button>");
      b.onclick = function () { go(t.id); };
      mNav.appendChild(b);
    });
  }

  load();
  render();
})();
