// GC-MS Peak-Match Confirmation — Apply (L3)
// CANVAS_HEIGHT: 580
// Confirm the identity of an unknown by matching its gas-chromatogram retention
// time and its mass-spectrum fragmentation pattern to a reference library.
// A presumptive color test only suggests a class; GC-MS is the confirmatory step
// that names the molecule. Pick a candidate, overlay it on the unknown, and read
// the match score.

let canvasWidth = 900;
const drawHeight = 520;
const controlHeight = 60;
let canvasHeight = drawHeight + controlHeight;
const margin = 15;
const defaultTextSize = 16;

const BG = '#eef1f5';
const CTRL_BG = '#dde3ec';
const PANEL = '#ffffff';
const PANEL_E = '#c8d2df';
const INK = '#22303f';
const SUB = '#62707f';
const HEAD = '#1f3a5a';
const GRID = '#e2e7ee';
const AXIS = '#8a97a6';
const BLUE = '#2f6fb0';       // unknown
const BLUE_FILL = 'rgba(47,111,176,0.20)';
const ORANGE = '#e8730c';     // candidate
const GREEN = '#2e9e57';
const RED = '#c0392b';

// Reference library: retention time (seconds) + mass-spectrum peaks [m/z, relative intensity 0-100]
const LIB = [
  { name: 'Caffeine',        rt: 8.4, peaks: [[194, 100], [109, 62], [67, 40], [82, 30], [55, 22]] },
  { name: 'Aspirin',         rt: 6.2, peaks: [[120, 100], [138, 55], [92, 42], [180, 22], [43, 30]] },
  { name: 'Pseudoephedrine', rt: 7.1, peaks: [[58, 100], [91, 26], [77, 16], [42, 32], [146, 10]] },
  { name: 'Compound X',      rt: 9.5, peaks: [[105, 100], [77, 58], [51, 30], [150, 18], [39, 15]] }
];
const RT_MAX = 12;      // chromatogram x-axis (seconds)
const MZ_MAX = 210;     // mass-spectrum x-axis (m/z)

let candSelect, overlayBtn, newBtn, revealBtn;
let unknownIndex = 0;   // which library entry is the unknown (cycled deterministically)
let candIndex = -1;     // selected candidate; -1 = none
let overlayOn = false;
let revealOn = false;
let scoreObj = null;

function updateCanvasSize() {
  const c = document.querySelector('main');
  if (c) canvasWidth = Math.max(800, Math.floor(c.getBoundingClientRect().width));
}

function setup() {
  updateCanvasSize();
  const cnv = createCanvas(canvasWidth, canvasHeight);
  cnv.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  candSelect = createSelect();
  candSelect.option('— choose candidate —');
  LIB.forEach(s => candSelect.option(s.name));
  candSelect.changed(() => {
    candIndex = LIB.findIndex(s => s.name === candSelect.value());
    overlayOn = false; scoreObj = null;   // require a fresh score after changing candidate
  });

  overlayBtn = createButton('Overlay &amp; Score');
  overlayBtn.mousePressed(doOverlayScore);
  newBtn = createButton('New Unknown');
  newBtn.mousePressed(newUnknown);
  revealBtn = createButton('Reveal Match');
  revealBtn.mousePressed(() => { revealOn = true; });

  positionControls();
}

function positionControls() {
  const by = drawHeight + 16;
  candSelect.position(margin + 82, by);
  overlayBtn.position(margin + 240, by - 1);
  newBtn.position(margin + 372, by - 1);
  revealBtn.position(margin + 486, by - 1);
}

function windowResized() {
  updateCanvasSize(); resizeCanvas(canvasWidth, canvasHeight); positionControls();
}

function newUnknown() {
  unknownIndex = (unknownIndex + 1) % LIB.length;   // deterministic cycle, no Math.random
  overlayOn = false; revealOn = false; scoreObj = null;
}

// --- scoring -------------------------------------------------------------
function rtScore(u, c) { return Math.max(0, 1 - Math.abs(u.rt - c.rt) / 3.0); }

function spectralScore(u, c) {
  let matched = 0, total = 0;
  for (const [mz, inten] of u.peaks) {
    total += inten;
    let best = 0;
    for (const [cmz, cinten] of c.peaks) {
      if (Math.abs(cmz - mz) <= 1.5) best = Math.max(best, Math.min(inten, cinten));
    }
    matched += best;
  }
  return total > 0 ? matched / total : 0;
}

function doOverlayScore() {
  if (candIndex < 0) return;               // no candidate chosen yet
  const u = LIB[unknownIndex], c = LIB[candIndex];
  const rt = rtScore(u, c), sp = spectralScore(u, c);
  const overall = Math.round(100 * (0.4 * rt + 0.6 * sp));
  scoreObj = { rt: Math.round(rt * 100), sp: Math.round(sp * 100), overall };
  overlayOn = true;
}

// set of unknown m/z that the candidate also has (for green labels)
function matchedMz(u, c) {
  const s = new Set();
  for (const [mz] of u.peaks)
    if (c.peaks.some(p => Math.abs(p[0] - mz) <= 1.5)) s.add(mz);
  return s;
}

// --- draw ----------------------------------------------------------------
function draw() {
  background(BG);
  noStroke();
  fill(CTRL_BG); rect(0, drawHeight, canvasWidth, controlHeight);

  fill(HEAD); textAlign(LEFT, TOP); textSize(20); textStyle(BOLD);
  text('GC-MS Peak-Match Confirmation', margin, 8); textStyle(NORMAL);
  fill(SUB); textSize(11.5);
  text('Match the unknown’s retention time AND fragmentation pattern to the reference library — the confirmatory step after a presumptive color test.',
    margin, 32);

  const panelW = Math.min(258, canvasWidth * 0.30);
  const chartsW = canvasWidth - 3 * margin - panelW;
  const chartsTop = 52;
  const availH = drawHeight - chartsTop - margin;
  const gap = 14;
  const chromH = Math.floor((availH - gap) / 2);
  const massH = availH - gap - chromH;

  drawChromatogram(margin, chartsTop, chartsW, chromH);
  drawMassSpectrum(margin, chartsTop + chromH + gap, chartsW, massH);
  drawVerdictPanel(margin * 2 + chartsW, chartsTop, panelW, availH);

  drawControlLabels();
}

function panelFrame(x, y, w, h, title) {
  fill(PANEL); stroke(PANEL_E); strokeWeight(1); rect(x, y, w, h, 8); noStroke();
  fill(HEAD); textAlign(LEFT, TOP); textSize(13); textStyle(BOLD);
  text(title, x + 12, y + 9); textStyle(NORMAL);
}

// gaussian peak value at time t (seconds) with apex rt, amplitude a, width sigma
function gauss(t, rt, a, sigma) {
  const d = t - rt;
  return a * Math.exp(-(d * d) / (2 * sigma * sigma));
}

function drawChromatogram(x, y, w, h) {
  panelFrame(x, y, w, h, 'Gas Chromatogram');
  const plotX = x + 44, plotY = y + 30, plotW = w - 60, plotB = y + h - 26;
  const plotH = plotB - plotY;

  // grid + axes
  stroke(GRID); strokeWeight(1);
  for (let s = 0; s <= RT_MAX; s += 2) {
    const px = plotX + (s / RT_MAX) * plotW;
    line(px, plotY, px, plotB);
  }
  stroke(AXIS); strokeWeight(1.2);
  line(plotX, plotY, plotX, plotB); line(plotX, plotB, plotX + plotW, plotB);
  noStroke(); fill(SUB); textSize(9.5); textAlign(CENTER, TOP);
  for (let s = 0; s <= RT_MAX; s += 2)
    text(s, plotX + (s / RT_MAX) * plotW, plotB + 4);
  textAlign(CENTER, BOTTOM); text('retention time (s)', plotX + plotW / 2, plotB + 22);
  push(); translate(x + 12, plotY + plotH / 2); rotate(-HALF_PI);
  textAlign(CENTER, BOTTOM); text('abundance', 0, 0); pop();

  const u = LIB[unknownIndex];
  const tx = t => plotX + (t / RT_MAX) * plotW;
  const vy = v => plotB - v * plotH;         // v is 0..1

  // small solvent front near t=0.4
  noStroke(); fill(200, 208, 218);
  beginShape(); vertex(tx(0), plotB);
  for (let t = 0; t <= 1.2; t += 0.05) vertex(tx(t), vy(gauss(t, 0.4, 0.16, 0.12)));
  vertex(tx(1.2), plotB); endShape(CLOSE);

  // unknown dominant peak (filled)
  fill(BLUE_FILL); stroke(BLUE); strokeWeight(1.6);
  beginShape(); vertex(tx(Math.max(0, u.rt - 1.4)), plotB);
  for (let t = u.rt - 1.4; t <= u.rt + 1.4; t += 0.04) vertex(tx(t), vy(gauss(t, u.rt, 0.9, 0.17)));
  vertex(tx(u.rt + 1.4), plotB); endShape();
  // apex label
  noStroke(); fill(BLUE); textSize(10.5); textAlign(CENTER, BOTTOM); textStyle(BOLD);
  text('unknown  RT ' + u.rt.toFixed(1) + ' s', tx(u.rt), vy(0.9) - 4); textStyle(NORMAL);

  // candidate overlay peak (stroked, different color)
  if (overlayOn && candIndex >= 0) {
    const c = LIB[candIndex];
    noFill(); stroke(ORANGE); strokeWeight(2);
    drawingContext.setLineDash([5, 4]);
    beginShape();
    for (let t = c.rt - 1.4; t <= c.rt + 1.4; t += 0.04) vertex(tx(t), vy(gauss(t, c.rt, 0.82, 0.17)));
    endShape();
    drawingContext.setLineDash([]);
    noStroke(); fill(ORANGE); textSize(10); textAlign(CENTER, BOTTOM);
    text(c.name + '  RT ' + c.rt.toFixed(1) + ' s', tx(c.rt), vy(0.82) - 3);
  }
}

function drawMassSpectrum(x, y, w, h) {
  panelFrame(x, y, w, h, 'Mass Spectrum (fragmentation pattern)');
  const plotX = x + 44, plotY = y + 30, plotB = y + h - 26;
  const plotW = w - 60, plotH = plotB - plotY;

  // grid + axes
  stroke(GRID); strokeWeight(1);
  for (let m = 0; m <= MZ_MAX; m += 50) {
    const px = plotX + (m / MZ_MAX) * plotW;
    line(px, plotY, px, plotB);
  }
  stroke(AXIS); strokeWeight(1.2);
  line(plotX, plotY, plotX, plotB); line(plotX, plotB, plotX + plotW, plotB);
  noStroke(); fill(SUB); textSize(9.5); textAlign(CENTER, TOP);
  for (let m = 0; m <= MZ_MAX; m += 50) text(m, plotX + (m / MZ_MAX) * plotW, plotB + 4);
  textAlign(CENTER, BOTTOM); text('m/z (mass-to-charge)', plotX + plotW / 2, plotB + 22);
  push(); translate(x + 12, plotY + plotH / 2); rotate(-HALF_PI);
  textAlign(CENTER, BOTTOM); text('rel. intensity', 0, 0); pop();

  const u = LIB[unknownIndex];
  const c = (overlayOn && candIndex >= 0) ? LIB[candIndex] : null;
  const mx = m => plotX + (m / MZ_MAX) * plotW;
  const matched = c ? matchedMz(u, c) : new Set();

  // candidate bars first (orange, semi-transparent, wider) so unknown sits on top
  if (c) {
    for (const [mz, inten] of c.peaks) {
      const bx = mx(mz), bh = (inten / 100) * plotH;
      noStroke(); fill(232, 115, 12, 90);
      rect(bx - 5, plotB - bh, 10, bh, 1);
    }
  }
  // unknown bars (blue)
  for (const [mz, inten] of u.peaks) {
    const bx = mx(mz), bh = (inten / 100) * plotH;
    noStroke(); fill(BLUE); rect(bx - 2.5, plotB - bh, 5, bh, 1);
    // m/z label: green if the candidate shares this fragment, else ink
    fill(matched.has(mz) ? GREEN : INK); textSize(9); textAlign(CENTER, BOTTOM); textStyle(BOLD);
    text(mz, bx, plotB - bh - 2); textStyle(NORMAL);
  }

  // legend (with a background so a tall base peak can't obscure it)
  const lx = x + w - 132, ly = y + 30;
  fill(255, 255, 255, 235); stroke(PANEL_E); strokeWeight(1); rect(lx - 6, ly - 5, 120, 34, 5); noStroke();
  fill(BLUE); rect(lx, ly, 12, 8); fill(INK); textSize(9.5); textAlign(LEFT, CENTER);
  text('Unknown', lx + 16, ly + 4);
  fill(232, 115, 12, 150); rect(lx, ly + 14, 12, 8); fill(INK);
  text('Candidate', lx + 16, ly + 18);
}

function drawVerdictPanel(x, y, w, h) {
  panelFrame(x, y, w, h, 'GC-MS Confirmation');
  let cy = y + 34;
  const u = LIB[unknownIndex];

  fill(INK); textAlign(LEFT, TOP); textSize(11.5);
  text('Unknown peak RT:  ' + u.rt.toFixed(1) + ' s', x + 12, cy); cy += 18;
  const candName = candIndex >= 0 ? LIB[candIndex].name : '— none —';
  fill(candIndex >= 0 ? ORANGE : SUB);
  text('Candidate:  ' + candName, x + 12, cy); cy += 22;

  stroke(PANEL_E); line(x + 12, cy, x + w - 12, cy); noStroke(); cy += 12;

  if (overlayOn && scoreObj) {
    fill(INK); textSize(11.5);
    text('Retention-time match:  ' + scoreObj.rt + '%', x + 12, cy); cy += 18;
    text('Fragment-pattern match:  ' + scoreObj.sp + '%', x + 12, cy); cy += 24;

    // verdict box
    let label, col;
    if (scoreObj.overall >= 85) { label = 'CONFIRMED MATCH'; col = GREEN; }
    else if (scoreObj.overall >= 55) { label = 'INCONCLUSIVE'; col = ORANGE; }
    else { label = 'NOT A MATCH'; col = RED; }
    fill('#f6f8fb'); stroke('#d4ddea'); strokeWeight(1); rect(x + 12, cy, w - 24, 62, 6); noStroke();
    fill(SUB); textSize(10); text('Overall match', x + 22, cy + 8);
    fill(col); textStyle(BOLD); textSize(26); text(scoreObj.overall + '%', x + 22, cy + 22);
    textSize(12); text(label, x + 108, cy + 34); textStyle(NORMAL);
    cy += 74;
  } else {
    fill(SUB); textSize(11);
    text('Choose a candidate, then press', x + 12, cy); cy += 15;
    text('"Overlay & Score" to compare', x + 12, cy); cy += 15;
    text('both features against the unknown.', x + 12, cy); cy += 24;
  }

  if (revealOn) {
    fill('#eaf6ee'); stroke(GREEN); strokeWeight(1); rect(x + 12, cy, w - 24, 40, 6); noStroke();
    fill('#1c6b39'); textSize(10.5); text('True identity of unknown:', x + 20, cy + 7);
    textStyle(BOLD); textSize(14); text(u.name, x + 20, cy + 20); textStyle(NORMAL);
    cy += 52;
  }

  // teaching reminder anchored near the bottom
  const ry = y + h - 74;
  stroke(PANEL_E); line(x + 12, ry - 6, x + w - 12, ry - 6); noStroke();
  fill(HEAD); textSize(10.5); textStyle(BOLD); text('Why GC-MS?', x + 12, ry); textStyle(NORMAL);
  fill(SUB); textSize(10);
  text('A color test only suggests a class. GC-MS is confirmatory: matching BOTH retention time AND the fragmentation pattern names the molecule.',
    x + 12, ry + 15, w - 24);
}

function drawControlLabels() {
  fill(SUB); textAlign(LEFT, CENTER); textSize(12);
  text('Candidate:', margin, drawHeight + 26);
}

function mousePressed() {
  // no canvas interaction beyond the p5 controls
}
