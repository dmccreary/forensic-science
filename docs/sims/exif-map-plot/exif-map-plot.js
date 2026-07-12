// EXIF Geolocation & Alibi Timeline — Analyze (L4)
// CANVAS_HEIGHT: 570
// Investigators scrub a timeline slider through an afternoon. Each recovered photo
// carries hidden EXIF metadata (timestamp, GPS place, device model) and drops as a
// numbered pin on a schematic map. The photo whose timestamp is nearest the slider
// is highlighted and its EXIF is read out in a side panel. Turn on the suspect's
// claimed location ("Home all day"): whenever the highlighted photo's GPS is NOT
// Home, the tool flags the alibi as contradicted.

let canvasWidth = 900;
const drawHeight = 500;
const controlHeight = 70;
let canvasHeight = drawHeight + controlHeight;
const margin = 15;
const defaultTextSize = 16;

const BG = '#eef1f5';
const MAP_BG = '#e9efe6';
const MAP_E = '#9fb096';
const GRID = '#d3ddcd';
const PANEL = '#ffffff';
const PANEL_E = '#c8d2df';
const INK = '#22303f';
const SUB = '#62707f';
const HEAD = '#1f3a5a';
const NODE = '#dfe6ea';
const NODE_E = '#a8b6c2';
const PIN = '#2f6fb0';
const PIN_HI = '#e8730c';
const HOME_RING = '#2e9e57';
const FLAG = '#c0392b';
const ROUTE = '#b7c2cd';

// Four labeled places on the schematic map (col, row in a 2x2 layout).
const places = [
  { name: 'Home',        col: 0, row: 0 },
  { name: 'Downtown',    col: 1, row: 0 },
  { name: 'Park',        col: 0, row: 1 },
  { name: 'Crime Scene', col: 1, row: 1 }
];

// Five recovered photos, each with EXIF: minutes-since-midnight, clock label,
// GPS place, and device model. All from one device — the trail is trustworthy.
const photos = [
  { n: 1, min: 550, label: '9:10',  place: 'Home',        device: 'Pixel 7' },
  { n: 2, min: 645, label: '10:45', place: 'Downtown',    device: 'Pixel 7' },
  { n: 3, min: 750, label: '12:30', place: 'Park',        device: 'Pixel 7' },
  { n: 4, min: 845, label: '14:05', place: 'Crime Scene', device: 'Pixel 7' },
  { n: 5, min: 940, label: '15:40', place: 'Home',        device: 'Pixel 7' }
];

const T_MIN = 540;   // 9:00
const T_MAX = 960;   // 16:00

let timeSlider, homeCheckbox, playBtn, resetBtn;
let playing = false;

function setup() {
  updateCanvasSize();
  const cnv = createCanvas(canvasWidth, canvasHeight);
  cnv.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  timeSlider = createSlider(T_MIN, T_MAX, T_MIN, 1);
  timeSlider.style('width', '260px');
  timeSlider.input(() => { playing = false; });

  homeCheckbox = createCheckbox(' Show claimed location (Home all day)', false);

  playBtn = createButton('Play timeline');
  playBtn.mousePressed(togglePlay);

  resetBtn = createButton('Reset');
  resetBtn.mousePressed(resetSim);

  positionControls();
}

function positionControls() {
  const r1 = drawHeight + 12;
  const r2 = drawHeight + 42;
  timeSlider.position(margin + 96, r1);
  homeCheckbox.position(margin, r2 + 2);
  playBtn.position(margin + 292, r2 - 2);
  resetBtn.position(margin + 392, r2 - 2);
}

function updateCanvasSize() {
  const c = document.querySelector('main');
  if (c) canvasWidth = Math.max(780, Math.floor(c.getBoundingClientRect().width));
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  positionControls();
}

function togglePlay() {
  if (timeSlider.value() >= T_MAX) timeSlider.value(T_MIN);
  playing = !playing;
}

function resetSim() {
  playing = false;
  timeSlider.value(T_MIN);
  homeCheckbox.checked(false);
}

// Photo whose timestamp is closest to the current slider time.
function highlightedPhoto() {
  const t = timeSlider.value();
  let best = photos[0], bd = Infinity;
  for (const p of photos) {
    const d = Math.abs(p.min - t);
    if (d < bd) { bd = d; best = p; }
  }
  return best;
}

// Pixel positions of place nodes inside a map rect.
function placeCenters(mx, my, mw, mh) {
  const cx = [mx + mw * 0.30, mx + mw * 0.70];
  const cy = [my + mh * 0.32, my + mh * 0.72];
  const centers = {};
  for (const pl of places) centers[pl.name] = { x: cx[pl.col], y: cy[pl.row] };
  return centers;
}

// Pin positions, offset when several photos share one place.
function pinPositions(centers) {
  const byPlace = {};
  for (const p of photos) (byPlace[p.place] = byPlace[p.place] || []).push(p);
  const out = [];
  for (const place in byPlace) {
    const grp = byPlace[place];
    const c = centers[place];
    grp.forEach((p, i) => {
      let ox = 0, oy = -34;
      if (grp.length > 1) {
        const ang = -HALF_PI + i * (TWO_PI / grp.length);
        ox = Math.cos(ang) * 20;
        oy = -34 + Math.sin(ang) * 12;
      }
      out.push({ photo: p, x: c.x + ox, y: c.y + oy });
    });
  }
  return out;
}

function fmt(min) {
  const h = Math.floor(min / 60);
  const m = min % 60;
  return h + ':' + nf(m, 2);
}

function draw() {
  background(BG);

  // advance the timeline while playing
  if (playing) {
    let v = timeSlider.value() + 2;
    if (v >= T_MAX) { v = T_MAX; playing = false; }
    timeSlider.value(v);
  }

  // control area background
  noStroke();
  fill('#dde3ec');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // header
  fill(HEAD); textAlign(LEFT, TOP); textSize(20); textStyle(BOLD);
  text('EXIF Geolocation & Alibi Timeline', margin, 8);
  textStyle(NORMAL); fill(SUB); textSize(11.5);
  text('Scrub the timeline — each photo’s hidden GPS pins the device to a place and time.',
    margin, 34);

  const hp = highlightedPhoto();
  const claim = homeCheckbox.checked();
  const contradicted = claim && hp.place !== 'Home';

  // layout: map (left) + panel (right), timeline strip along the bottom
  const topY = 54;
  const stripH = 52;
  const bodyBottom = drawHeight - stripH - margin;
  const panelW = Math.min(268, (canvasWidth - 3 * margin) * 0.32);
  const mapX = margin, mapY = topY;
  const mapW = canvasWidth - 3 * margin - panelW;
  const mapH = bodyBottom - topY;

  drawMap(mapX, mapY, mapW, mapH, hp, claim, contradicted);
  drawPanel(mapX + mapW + margin, topY, panelW, mapH, hp, claim, contradicted);
  drawTimeline(margin, bodyBottom + 8, canvasWidth - 2 * margin, stripH, hp);
  drawControlLabels(hp);
}

function drawMap(mx, my, mw, mh, hp, claim, contradicted) {
  // map surface + grid
  fill(MAP_BG); stroke(MAP_E); strokeWeight(1.5); rect(mx, my, mw, mh, 6);
  stroke(GRID); strokeWeight(1);
  for (let gx = mx + 40; gx < mx + mw; gx += 40) line(gx, my + 1, gx, my + mh - 1);
  for (let gy = my + 40; gy < my + mh; gy += 40) line(mx + 1, gy, mx + mw - 1, gy);
  noStroke();

  fill(SUB); textAlign(LEFT, TOP); textSize(10.5);
  text('Schematic map (not to scale)', mx + 8, my + 6);

  const centers = placeCenters(mx, my, mw, mh);

  // faint route line connecting photos in time order (the device's path)
  const ordered = [...photos].sort((a, b) => a.min - b.min);
  const pins = pinPositions(centers);
  const pinOf = {};
  for (const pp of pins) pinOf[pp.photo.n] = pp;
  stroke(ROUTE); strokeWeight(2); drawingContext.setLineDash([6, 6]);
  noFill();
  beginShape();
  for (const p of ordered) vertex(pinOf[p.n].x, pinOf[p.n].y);
  endShape();
  drawingContext.setLineDash([]); noStroke();

  // place nodes + labels
  for (const pl of places) {
    const c = centers[pl.name];
    const isHome = pl.name === 'Home';
    if (isHome && claim) {
      // claimed-location ring
      noFill();
      stroke(contradicted ? FLAG : HOME_RING);
      strokeWeight(2.5);
      drawingContext.setLineDash([5, 4]);
      circle(c.x, c.y, 78);
      drawingContext.setLineDash([]);
      noStroke();
    }
    fill(NODE); stroke(NODE_E); strokeWeight(1.5); circle(c.x, c.y, 30); noStroke();
    fill(HEAD); textAlign(CENTER, TOP); textSize(11.5); textStyle(BOLD);
    text(pl.name, c.x, c.y + 18);
    textStyle(NORMAL);
    if (isHome && claim) {
      fill(contradicted ? FLAG : HOME_RING); textSize(9.5);
      text('claimed', c.x, c.y + 32);
    }
  }

  // pins — highlighted one drawn last (on top)
  const sorted = [...pins].sort((a, b) => (a.photo.n === hp.n) - (b.photo.n === hp.n));
  for (const pp of sorted) drawPin(pp.x, pp.y, pp.photo, pp.photo.n === hp.n);

  // contradiction banner across the top of the map
  if (contradicted) {
    const bw = mw - 16, bx = mx + 8, by = my + 8, bh = 30;
    fill(FLAG); rect(bx, by, bw, bh, 5); noStroke();
    fill('#fff'); textAlign(CENTER, CENTER); textSize(12); textStyle(BOLD);
    text('ALIBI CONTRADICTED — photo #' + hp.n + ' places device at ' +
      hp.place + ' at ' + hp.label, mx + mw / 2, by + bh / 2);
    textStyle(NORMAL);
  }
}

function drawPin(x, y, photo, hi) {
  const r = hi ? 15 : 11;
  // teardrop pin
  fill(hi ? PIN_HI : PIN); stroke('#fff'); strokeWeight(2);
  circle(x, y, r * 2);
  triangle(x - r * 0.5, y + r * 0.7, x + r * 0.5, y + r * 0.7, x, y + r * 1.7);
  noStroke();
  fill('#fff'); textAlign(CENTER, CENTER); textStyle(BOLD);
  textSize(hi ? 13 : 10);
  text(photo.n, x, y - 0.5);
  textStyle(NORMAL);
  if (hi) {
    fill(INK); textAlign(CENTER, TOP); textSize(10);
    text(photo.label, x, y + r * 1.9);
  }
}

function drawPanel(x, y, w, h, hp, claim, contradicted) {
  fill(PANEL); stroke(PANEL_E); strokeWeight(1); rect(x, y, w, h, 8); noStroke();
  let cy = y + 12;
  fill(HEAD); textAlign(LEFT, TOP); textSize(14); textStyle(BOLD);
  text('Photo EXIF', x + 12, cy); textStyle(NORMAL); cy += 24;

  // highlighted photo badge
  fill(PIN_HI); stroke('#fff'); strokeWeight(2); circle(x + 22, cy + 8, 22); noStroke();
  fill('#fff'); textAlign(CENTER, CENTER); textSize(12); textStyle(BOLD);
  text(hp.n, x + 22, cy + 7); textStyle(NORMAL);
  fill(INK); textAlign(LEFT, TOP); textSize(13); textStyle(BOLD);
  text('Photo ' + hp.n, x + 40, cy + 1); textStyle(NORMAL); cy += 28;

  fill(SUB); textSize(11); text('Timestamp', x + 12, cy);
  fill(INK); textSize(13); textStyle(BOLD);
  text(hp.label + (hp.min >= 720 ? ' pm' : ' am'), x + 12, cy + 13);
  textStyle(NORMAL); cy += 34;

  fill(SUB); textSize(11); text('GPS location', x + 12, cy);
  fill(INK); textSize(13); textStyle(BOLD);
  text(hp.place, x + 12, cy + 13); textStyle(NORMAL); cy += 34;

  fill(SUB); textSize(11); text('Device model', x + 12, cy);
  fill(INK); textSize(13); textStyle(BOLD);
  text(hp.device, x + 12, cy + 13); textStyle(NORMAL); cy += 32;

  stroke(PANEL_E); line(x + 12, cy, x + w - 12, cy); noStroke(); cy += 12;

  // alibi status
  fill(HEAD); textSize(12); textStyle(BOLD);
  text('Alibi check', x + 12, cy); textStyle(NORMAL); cy += 18;
  if (!claim) {
    fill(SUB); textSize(11);
    text('Turn on “Show claimed', x + 12, cy);
    text('location” to test the', x + 12, cy + 13);
    text('“Home all day” alibi.', x + 12, cy + 26);
  } else if (contradicted) {
    fill(FLAG); textSize(12); textStyle(BOLD);
    text('CONTRADICTED', x + 12, cy); textStyle(NORMAL); cy += 16;
    fill(INK); textSize(11);
    wrapText('Photo #' + hp.n + ' places the device at ' + hp.place +
      ' at ' + hp.label + ', not Home.', x + 12, cy, w - 24, 13);
  } else {
    fill(HOME_RING); textSize(12); textStyle(BOLD);
    text('Consistent (so far)', x + 12, cy); textStyle(NORMAL); cy += 16;
    fill(INK); textSize(11);
    wrapText('Photo #' + hp.n + ' at ' + hp.label +
      ' places the device at Home.', x + 12, cy, w - 24, 13);
  }
}

// simple word-wrap helper
function wrapText(str, x, y, maxW, lh) {
  const words = str.split(' ');
  let line = '', yy = y;
  textAlign(LEFT, TOP);
  for (const wd of words) {
    const test = line ? line + ' ' + wd : wd;
    if (textWidth(test) > maxW && line) { text(line, x, yy); line = wd; yy += lh; }
    else line = test;
  }
  if (line) text(line, x, yy);
}

function drawTimeline(x, y, w, h, hp) {
  fill(PANEL); stroke(PANEL_E); strokeWeight(1); rect(x, y, w, h, 8); noStroke();
  const ax = x + 44, aw = w - 90;
  const axisY = y + h / 2 + 4;

  fill(HEAD); textAlign(LEFT, CENTER); textSize(11); textStyle(BOLD);
  text('Timeline', x + 10, y + 12); textStyle(NORMAL);

  // axis
  stroke('#c8d2df'); strokeWeight(2); line(ax, axisY, ax + aw, axisY); noStroke();
  fill(SUB); textAlign(CENTER, TOP); textSize(9);
  for (let m = T_MIN; m <= T_MAX; m += 60) {
    const px = map(m, T_MIN, T_MAX, ax, ax + aw);
    stroke('#c8d2df'); strokeWeight(1); line(px, axisY - 3, px, axisY + 3); noStroke();
    text(fmt(m), px, axisY + 7);
  }

  // photo ticks
  for (const p of photos) {
    const px = map(p.min, T_MIN, T_MAX, ax, ax + aw);
    const hi = p.n === hp.n;
    fill(hi ? PIN_HI : PIN); noStroke();
    circle(px, axisY, hi ? 13 : 9);
    fill('#fff'); textAlign(CENTER, CENTER); textStyle(BOLD); textSize(hi ? 9 : 7);
    text(p.n, px, axisY); textStyle(NORMAL);
  }

  // current-time marker
  const tx = map(timeSlider.value(), T_MIN, T_MAX, ax, ax + aw);
  stroke(HEAD); strokeWeight(1.5); line(tx, axisY - 16, tx, axisY + 16); noStroke();
  fill(HEAD); triangle(tx - 5, axisY - 16, tx + 5, axisY - 16, tx, axisY - 9);
}

function drawControlLabels(hp) {
  fill(INK); textAlign(LEFT, CENTER); textSize(12); textStyle(BOLD);
  const ly = drawHeight + 22;
  text('Time', margin, ly);
  fill(HEAD);
  text(fmt(timeSlider.value()), margin + 366, ly);
  textStyle(NORMAL);
}
