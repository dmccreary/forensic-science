// Medullary Index Calculator — Apply (L3)
// CANVAS_HEIGHT: 500
// Calculate the medullary index (MI = medulla diameter / shaft diameter) of a
// hair cross-section and interpret it as Human, Ambiguous, or Non-human. Drag
// the sliders to set the two diameters; the cross-section and MI update live.

let canvasWidth = 900;
const drawHeight = 450;
const controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
const margin = 15;
const defaultTextSize = 16;

const CORTEX = '#d8b15e';
const CORTEX_E = '#b8902f';
const MEDULLA = '#5a3a1e';
const OK = '#2e9e57';
const WARN = '#e8900c';
const BAD = '#c0392b';

let medullaSlider, shaftSlider, newButton;
const SCALE_MAX = 120;  // µm mapped to the panel radius

const SAMPLES = [
  { m: 18, s: 90 }, { m: 22, s: 100 }, { m: 30, s: 95 },
  { m: 48, s: 100 }, { m: 60, s: 110 }, { m: 70, s: 95 }, { m: 40, s: 88 }
];

const REFS = [
  { name: 'Human',  mi: 0.25 },
  { name: 'Dog',    mi: 0.45 },
  { name: 'Cat',    mi: 0.55 },
  { name: 'Rodent', mi: 0.90 }
];

function setup() {
  updateCanvasSize();
  const cnv = createCanvas(canvasWidth, canvasHeight);
  cnv.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  medullaSlider = createSlider(1, 80, 18, 1);
  shaftSlider = createSlider(30, 120, 90, 1);
  newButton = createButton('New Sample');
  newButton.mousePressed(() => {
    const s = SAMPLES[floor(random(SAMPLES.length))];
    medullaSlider.value(s.m); shaftSlider.value(s.s);
  });
  positionControls();
}
function positionControls() {
  const r = drawHeight + 14;
  medullaSlider.position(margin + 96, r); medullaSlider.style('width', '150px');
  shaftSlider.position(margin + 350, r); shaftSlider.style('width', '150px');
  newButton.position(margin + 560, r - 4);
}
function updateCanvasSize() {
  const c = document.querySelector('main');
  if (c) canvasWidth = Math.max(800, Math.floor(c.getBoundingClientRect().width));
}
function windowResized() {
  updateCanvasSize(); resizeCanvas(canvasWidth, canvasHeight); positionControls();
}

function interp(mi) {
  if (mi <= 0.33) return { cat: 'Human', col: OK,
    note: 'MI ≤ 0.33 — consistent with HUMAN hair (a thin or fragmented medulla).' };
  if (mi < 0.50) return { cat: 'Ambiguous', col: WARN,
    note: '0.33 < MI < 0.50 — AMBIGUOUS; overlaps human and animal. Use other features to decide.' };
  return { cat: 'Non-human likely', col: BAD,
    note: 'MI ≥ 0.50 — likely NON-HUMAN (animal) hair, which has a wide medulla.' };
}

function draw() {
  background('#eef2f7');
  noStroke();
  fill('#f4f4f4'); rect(0, drawHeight, canvasWidth, controlHeight);

  const med = medullaSlider.value();
  const sha = shaftSlider.value();
  // control strip labels + values
  fill('#33404f'); textAlign(LEFT, CENTER); textSize(12);
  text('Medulla', margin, drawHeight + 24);
  text(med + ' µm', margin + 252, drawHeight + 24);
  text('Shaft', margin + 300, drawHeight + 24);
  text(sha + ' µm', margin + 506, drawHeight + 24);

  fill('#173a63'); textAlign(CENTER, TOP); textSize(20); textStyle(BOLD);
  text('Medullary Index Calculator', canvasWidth / 2, 8); textStyle(NORMAL);

  const w = canvasWidth - 2 * margin;
  const leftW = w * 0.58;
  drawCrossSection(margin, 40, leftW, drawHeight - 50, med, sha);
  drawReadout(margin + leftW + 12, 40, w - leftW - 12, drawHeight - 50, med, sha);
}

function drawCrossSection(x, y, w, h, med, sha) {
  noStroke(); fill('#ffffff'); stroke('#d6deea'); strokeWeight(1);
  rect(x, y, w, h, 8); noStroke();
  fill('#173a63'); textAlign(LEFT, TOP); textSize(12.5); textStyle(BOLD);
  text('Hair Cross-Section', x + 14, y + 10); textStyle(NORMAL);

  const cx = x + w / 2, cy = y + h * 0.46;
  const rmax = min(w, h) * 0.34;
  const shaftR = rmax * (sha / SCALE_MAX);
  const medR = min(shaftR * 0.97, rmax * (med / SCALE_MAX));

  // cortex (outer)
  stroke(CORTEX_E); strokeWeight(2); fill(CORTEX);
  circle(cx, cy, shaftR * 2);
  // medulla (inner)
  noStroke(); fill(MEDULLA); circle(cx, cy, medR * 2);
  // cuticle hint
  noFill(); stroke(CORTEX_E); strokeWeight(1);
  circle(cx, cy, shaftR * 2 + 6);

  // shaft diameter arrow (below)
  const ay = cy + shaftR + 26;
  drawDimArrow(cx - shaftR, ay, cx + shaftR, ay, '#33404f');
  noStroke(); fill('#33404f'); textAlign(CENTER, TOP); textSize(11);
  text('Shaft diameter = ' + sha + ' µm', cx, ay + 6);
  // medulla diameter arrow (through center)
  drawDimArrow(cx - medR, cy, cx + medR, cy, '#f0d9b8');
  noStroke(); fill('#f0d9b8'); textAlign(CENTER, BOTTOM); textSize(10);
  text('medulla ' + med + ' µm', cx, cy - 4);

  // legend
  noStroke(); textAlign(LEFT, CENTER); textSize(10.5);
  fill(CORTEX); rect(x + 14, y + h - 22, 12, 12, 2); fill('#33404f'); text('cortex', x + 32, y + h - 16);
  fill(MEDULLA); rect(x + 90, y + h - 22, 12, 12, 2); fill('#33404f'); text('medulla', x + 108, y + h - 16);
}

function drawDimArrow(x1, y1, x2, y2, col) {
  stroke(col); strokeWeight(1.6); line(x1, y1, x2, y2);
  noStroke(); fill(col);
  triangle(x1, y1, x1 + 6, y1 - 4, x1 + 6, y1 + 4);
  triangle(x2, y2, x2 - 6, y2 - 4, x2 - 6, y2 + 4);
}

function drawReadout(x, y, w, h, med, sha) {
  noStroke(); fill('#ffffff'); stroke('#d6deea'); strokeWeight(1);
  rect(x, y, w, h, 8); noStroke();
  const mi = med / sha;
  const r = interp(mi);

  fill('#173a63'); textAlign(LEFT, TOP); textSize(12.5); textStyle(BOLD);
  text('Calculate the Index', x + 14, y + 10); textStyle(NORMAL);

  fill('#33404f'); textSize(12);
  text('MI = Medulla ÷ Shaft', x + 14, y + 34);
  fill('#5b6472'); textSize(12);
  text('= ' + med + ' µm ÷ ' + sha + ' µm', x + 14, y + 54);

  // big MI value
  fill(r.col); textAlign(LEFT, TOP); textSize(30); textStyle(BOLD);
  text('MI = ' + mi.toFixed(2), x + 14, y + 78); textStyle(NORMAL);

  // result badge
  noStroke(); fill(r.col); rect(x + 14, y + 118, w - 28, 26, 6);
  fill('#ffffff'); textAlign(CENTER, CENTER); textSize(13); textStyle(BOLD);
  text(r.cat.toUpperCase(), x + w / 2, y + 131); textStyle(NORMAL);
  fill('#33404f'); textAlign(LEFT, TOP); textSize(10.8);
  text(r.note, x + 14, y + 150, w - 28);

  // comparison row
  stroke('#e3e8f0'); line(x + 12, y + 196, x + w - 12, y + 196); noStroke();
  fill('#173a63'); textSize(11); textStyle(BOLD);
  text('Typical medullary index by species', x + 14, y + 204); textStyle(NORMAL);
  const n = REFS.length, cw = (w - 28) / n;
  for (let i = 0; i < n; i++) {
    const rf = REFS[i];
    const ccx = x + 14 + cw * (i + 0.5);
    const ccy = y + 244;
    const R = 18;
    stroke(CORTEX_E); strokeWeight(1.5); fill(CORTEX); circle(ccx, ccy, R * 2);
    noStroke(); fill(MEDULLA); circle(ccx, ccy, R * 2 * rf.mi);
    fill('#33404f'); textAlign(CENTER, TOP); textSize(10); textStyle(BOLD);
    text(rf.name, ccx, ccy + R + 4); textStyle(NORMAL);
    fill('#5b6472'); textSize(9.5); text('~' + rf.mi.toFixed(2), ccx, ccy + R + 17);
  }
}
