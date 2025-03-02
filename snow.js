// Anzahl der Schneeflocken
let schnee_menge = 70;

// Farben der Schneeflocken
let schnee_farbe = ["#aaaacc", "#ddddFF", "#ccccDD"];

// Schriftarten für die Schneeflocken
let schnee_schrift = ["Arial Black", "Arial Narrow", "Times", "Comic Sans MS"];

// Symbol für Schneeflocken
let schnee_symbol = "❅";

// Geschwindigkeit des Fallens
let schnee_geschwindigkeit = 1.0;

// Max. und Min. Größe der Schneeflocken
let schnee_maxSize = 20;
let schnee_minSize = 8;

let schnee = [];
let hero, hero_bottom, hero_right;
let x_mv = [];
let crds = [];
let lftrght = [];
let browserinfos = navigator.userAgent;
let ie5 = document.all && document.getElementById && !browserinfos.match(/Opera/);
let ns6 = document.getElementById && !document.all;
let opera = browserinfos.match(/Opera/);
let browserok = ie5 || ns6 || opera;

function zufall(range) {
  return Math.floor(range * Math.random());
}

function initSchnee() {
  hero = document.querySelector(".hero");
  if (!hero) return; // Falls .hero nicht existiert, beenden
  
  hero_bottom = hero.clientHeight;
  hero_right = hero.clientWidth;

  let sizeRange = schnee_maxSize - schnee_minSize;

  for (let i = 0; i <= schnee_menge; i++) {
    crds[i] = 0;
    lftrght[i] = Math.random() * 15;
    x_mv[i] = 0.03 + Math.random() / 10;

    let span = document.createElement("span");
    span.id = "s" + i;
    span.style.position = "absolute";
    span.style.top = "-" + schnee_maxSize + "px";
    span.style.fontFamily = schnee_schrift[zufall(schnee_schrift.length)];
    span.style.fontSize = zufall(sizeRange) + schnee_minSize + "px";
    span.style.color = schnee_farbe[zufall(schnee_farbe.length)];
    span.textContent = schnee_symbol;
    
    hero.appendChild(span);

    schnee[i] = span;
    schnee[i].sink = schnee_geschwindigkeit * parseInt(schnee[i].style.fontSize) / 5;

    schnee[i].posx = zufall(hero_right - parseInt(schnee[i].style.fontSize));
    schnee[i].posy = zufall(hero_bottom - parseInt(schnee[i].style.fontSize));
    schnee[i].style.left = schnee[i].posx + "px";
    schnee[i].style.top = schnee[i].posy + "px";
  }

  moveSchnee();
}

function moveSchnee() {
  for (let i = 0; i <= schnee_menge; i++) {
    crds[i] += x_mv[i];
    schnee[i].posy += schnee[i].sink;
    schnee[i].style.left = schnee[i].posx + lftrght[i] * Math.sin(crds[i]) + "px";
    schnee[i].style.top = schnee[i].posy + "px";

    if (schnee[i].posy >= hero_bottom - parseInt(schnee[i].style.fontSize)) {
      schnee[i].posx = zufall(hero_right - parseInt(schnee[i].style.fontSize));
      schnee[i].posy = 0;
    }
  }

  setTimeout(moveSchnee, 50);
}

if (browserok) {
  window.onload = initSchnee;
}
