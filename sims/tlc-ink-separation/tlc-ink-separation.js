// TLC Ink Separation Interactive Diagram — Understand (L2)
// CANVAS_HEIGHT: 600
// Explain thin-layer chromatography: ink is spotted on a plate, a solvent front
// rises and carries each dye component a characteristic distance, and the ratio
// (spot distance / solvent-front distance) is the Rf value. Run the separation,
// switch to UV to reveal fluorescent components, and read which reference ink the
// questioned sample matches, component by component.

let canvasWidth = 900;
const drawHeight = 548;
const controlHeight = 52;
let canvasHeight = drawHeight + controlHeight;
const margin = 15;
const defaultTextSize = 16;

const BG = '#eef1f5';
const PANEL = '#ffffff';
const PANEL_E = '#c8d2df';
const INK = '#22303f';
const SUB = '#62707f';
const HEAD = '#1f3a5a';
const SOLVENT = '#5b9bd5';
const GREEN = '#2e9e57';
const RED = '#c0392b';
const FRONT_MM = 50.0; // nominal solvent-front travel distance in mm

// Each ink = list of dye components {col:[r,g,b], rf, uv?}
const INKS = {
  'Ballpoint (blue)': [
    { col: [40, 80, 200], rf: 0.28 },
    { col: [120, 60, 200], rf: 0.52 },
    { col: [225, 90, 150], rf: 0.74 },
    { col: [120, 230, 160], rf: 0.62, uv: true }   // optical brightener
  ],
  'Rollerball (blue)': [
    { col: [30, 120, 180], rf: 0.22 },
    { col: [60, 170, 120], rf: 0.48 },
    { col: [210, 180, 40], rf: 0.70 }
  ],
  'Gel pen (black)': [
    { col: [45, 45, 50], rf: 0.12 },
    { col: [90, 65, 130], rf: 0.30 }
  ],
  'Fountain pen (blue-black)': [
    { col: [30, 50, 120], rf: 0.20 },
    { col: [60, 90, 180], rf: 0.44 },
    { col: [120, 70, 160], rf: 0.60 },
    { col: [200, 120, 90], rf: 0.78 }
  ]
};

// reference trios (which inks fill lanes R1, R2, R3)
const REF_SETS = {
  'Reference set 1 (pen lineup)': ['Rollerball (blue)', 'Ballpoint (blue)', 'Gel pen (black)'],
  'Reference set 2 (alt suspects)': ['Fountain pen (blue-black)', 'Gel pen (black)', 'Rollerball (blue)']
};

let qSelect, refSelect, runBtn, uvBtn, rfBtn;
let uvMode = false;
let progress = 1;        // solvent-front position 0..1 (1 = fully developed)
let running = false;
let rfShown = true;
let plate = {};

function setup() {
  updateCanvasSize();
  const cnv = createCanvas(canvasWidth, canvasHeight);
  cnv.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  qSelect = createSelect();
  Object.keys(INKS).forEach(k => qSelect.option(k));
  qSelect.selected('Ballpoint (blue)');
  qSelect.style('width', '150px');

  refSelect = createSelect();
  Object.keys(REF_SETS).forEach(k => refSelect.option(k));
  refSelect.selected('Reference set 1 (pen lineup)');
  refSelect.style('width', '150px');

  runBtn = createButton('Run Chromatography');
  runBtn.mousePressed(() => { progress = 0; running = true; });

  uvBtn = createButton('Toggle UV');
  uvBtn.mousePressed(() => { uvMode = !uvMode; });

  rfBtn = createButton('Calculate Rf');
  rfBtn.mousePressed(() => { rfShown = !rfShown; });

  positionControls();
}

function positionControls() {
  const by = drawHeight + 12;
  qSelect.position(margin + 75, by);
  refSelect.position(margin + 270, by);
  runBtn.position(margin + 428, by);
  uvBtn.position(margin + 560, by);
  rfBtn.position(margin + 650, by);
}
function updateCanvasSize() {
  const c = document.querySelector('main');
  if (c) canvasWidth = Math.max(800, Math.floor(c.getBoundingClientRect().width));
}
function windowResized() {
  updateCanvasSize(); resizeCanvas(canvasWidth, canvasHeight); positionControls();
}

function lanes() {
  // [{label, ink, comps}] for Q, R1, R2, R3
  const refs = REF_SETS[refSelect.value()];
  const out = [{ label: 'Q', name: qSelect.value() }];
  refs.forEach((r, i) => out.push({ label: 'R' + (i + 1), name: r }));
  return out.map(l => ({ ...l, comps: INKS[l.name] }));
}

function visibleComps(comps) {
  return comps.filter(c => uvMode || !c.uv);
}

function compMatches(qc, comps) {
  for (const c of comps) {
    if (Math.abs(c.rf - qc.rf) < 0.04) {
      let cd = 0; for (let i = 0; i < 3; i++) cd += (c.col[i] - qc.col[i]) ** 2;
      if (Math.sqrt(cd) < 90) return true;
    }
  }
  return false;
}

function matchCount(qComps, refComps) {
  let m = 0;
  for (const qc of qComps) if (compMatches(qc, refComps)) m++;
  return m;
}

function draw() {
  if (running) {
    progress = Math.min(1, progress + 0.012);
    if (progress >= 1) running = false;
  }
  background(BG);
  noStroke();
  fill('#dde3ec'); rect(0, drawHeight, canvasWidth, controlHeight);

  fill(HEAD); textAlign(LEFT, TOP); textSize(20); textStyle(BOLD);
  text('TLC Ink Separation', margin, 8); textStyle(NORMAL);
  fill(SUB); textSize(11.5);
  text('Thin-layer chromatography: read each dye’s Rf = spot distance ÷ solvent-front distance',
    margin, 33);

  const plateW = (canvasWidth - 3 * margin) * 0.40;
  drawPlate(margin, 54, plateW, drawHeight - 54 - margin);
  drawResults(margin * 2 + plateW, 54, canvasWidth - 3 * margin - plateW, drawHeight - 54 - margin);
  drawControlLabels();
}

function drawPlate(x, y, w, h) {
  const ls = lanes();
  const plateBG = uvMode ? color(26, 24, 40) : color(252, 252, 250);
  fill(plateBG); stroke(uvMode ? '#444' : '#b9c2cf'); strokeWeight(1.5);
  rect(x, y, w, h, 4); noStroke();

  const baseY = y + h - 34;            // origin (spotting) line
  const frontMaxY = y + 24;            // max solvent front
  const fullTravel = baseY - frontMaxY;
  const frontY = lerp(baseY, frontMaxY, progress);
  plate = { x, y, w, baseY, frontMaxY, fullTravel };

  // solvent reservoir glow at bottom
  if (uvMode) { fill(40, 38, 70); } else { fill(225, 238, 250); }
  rect(x + 2, baseY + 2, w - 4, y + h - baseY - 4, 0, 0, 3, 3);

  // origin line + solvent front line
  stroke(uvMode ? '#7a7a8a' : '#9aa6b5'); strokeWeight(1);
  drawingContext.setLineDash([5, 4]);
  line(x + 8, baseY, x + w - 8, baseY);
  stroke(SOLVENT); strokeWeight(1.5);
  line(x + 8, frontY, x + w - 8, frontY);
  drawingContext.setLineDash([]); noStroke();
  fill(uvMode ? '#cfd6ff' : SUB); textAlign(LEFT, BOTTOM); textSize(9.5);
  text('origin', x + 10, baseY - 2);
  fill(SOLVENT); textAlign(LEFT, BOTTOM);
  text('solvent front', x + 10, frontY - 2);

  // lanes
  const nLanes = ls.length;
  const laneW = (w - 16) / nLanes;
  for (let i = 0; i < nLanes; i++) {
    const lx = x + 8 + laneW * (i + 0.5);
    // lane label
    fill(uvMode ? '#e6e9ff' : INK); textAlign(CENTER, TOP); textSize(12); textStyle(BOLD);
    text(ls[i].label, lx, y + 4); textStyle(NORMAL);
    // baseline spot
    const baseCol = visibleComps(ls[i].comps)[0] || ls[i].comps[0];
    // migrating spots
    for (const c of visibleComps(ls[i].comps)) {
      const sy = baseY - c.rf * (baseY - frontY);
      drawSpot(lx, sy, c, laneW);
      if (rfShown && progress >= 1) {
        fill(uvMode ? '#dfe4ff' : SUB); textAlign(CENTER, TOP); textSize(8.5);
        text(c.rf.toFixed(2), lx, sy + 8);
      }
    }
  }
}

function drawSpot(cx, cy, c, laneW) {
  const r = Math.min(laneW * 0.42, 13);
  if (uvMode) {
    // glowing spot
    const gl = c.uv ? color(150, 255, 190) : color(c.col[0], c.col[1], c.col[2]);
    for (let k = 3; k >= 1; k--) {
      fill(red(gl), green(gl), blue(gl), 60 / k);
      ellipse(cx, cy, r * 2 + k * 6, r * 1.3 + k * 4);
    }
    fill(red(gl), green(gl), blue(gl), 230); ellipse(cx, cy, r * 1.8, r * 1.1);
  } else {
    fill(c.col[0], c.col[1], c.col[2], 70); ellipse(cx, cy, r * 2.1, r * 1.4);
    fill(c.col[0], c.col[1], c.col[2], 210); ellipse(cx, cy, r * 1.5, r * 0.95);
  }
}

function drawResults(x, y, w, h) {
  fill(PANEL); stroke(PANEL_E); strokeWeight(1); rect(x, y, w, h, 8); noStroke();
  const ls = lanes();
  const q = ls[0];
  const qVis = visibleComps(q.comps);

  let cy = y + 12;
  fill(HEAD); textAlign(LEFT, TOP); textSize(14); textStyle(BOLD);
  text('Result Interpretation', x + 14, cy); textStyle(NORMAL); cy += 22;
  fill(SUB); textSize(11);
  text('Light: ' + (uvMode ? 'UV (366 nm) — fluorescent components visible' : 'white light'),
    x + 14, cy); cy += 20;

  // Questioned Rf table
  fill(HEAD); textSize(12.5); textStyle(BOLD);
  text('Questioned ink: ' + q.name, x + 14, cy); textStyle(NORMAL); cy += 19;
  fill(SUB); textSize(10);
  text('Solvent front distance = ' + FRONT_MM.toFixed(1) + ' mm', x + 14, cy); cy += 16;
  // header
  fill(SUB); textSize(10); textStyle(BOLD);
  text('dye', x + 26, cy); text('spot dist', x + 90, cy); text('Rf', x + 180, cy);
  textStyle(NORMAL); cy += 4;
  stroke(PANEL_E); line(x + 14, cy + 10, x + w - 14, cy + 10); noStroke(); cy += 14;
  for (const c of qVis) {
    if (c.uv) fill(120, 230, 160); else fill(c.col[0], c.col[1], c.col[2]);
    circle(x + 22, cy + 6, 12);
    fill(INK); textAlign(LEFT, TOP); textSize(10.5);
    const dist = (c.rf * FRONT_MM).toFixed(1) + ' mm';
    text(c.uv ? 'UV' : 'dye', x + 36, cy);
    text(dist, x + 90, cy);
    if (rfShown) { textStyle(BOLD); text(c.rf.toFixed(2), x + 180, cy); textStyle(NORMAL); }
    else text('—', x + 180, cy);
    cy += 18;
  }
  cy += 6;
  stroke(PANEL_E); line(x + 14, cy, x + w - 14, cy); noStroke(); cy += 12;

  // comparison to each reference
  fill(HEAD); textSize(12.5); textStyle(BOLD);
  text('Component match vs references', x + 14, cy); textStyle(NORMAL); cy += 20;
  let best = -1, bestM = -1;
  for (let i = 1; i < ls.length; i++) {
    const rVis = visibleComps(ls[i].comps);
    const m = matchCount(qVis, rVis);
    const full = (m === qVis.length);
    if (m > bestM) { bestM = m; best = i; }
    fill(INK); textAlign(LEFT, TOP); textSize(11);
    text(ls[i].label + '  ' + ls[i].name, x + 30, cy);
    fill(full ? GREEN : RED); textSize(12); textStyle(BOLD);
    text(m + '/' + qVis.length, x + w - 78, cy);
    drawMark(x + w - 32, cy + 7, full);
    textStyle(NORMAL);
    cy += 19;
  }
  cy += 8;

  // Match Determination box
  const boxH = 56, bx = x + 14, bw = w - 28;
  const full = (bestM === qVis.length && best > 0);
  fill(full ? '#e7f6ec' : '#fbeceb'); stroke(full ? GREEN : RED); strokeWeight(1.5);
  rect(bx, cy, bw, boxH, 6); noStroke();
  fill(full ? GREEN : RED); textAlign(LEFT, TOP); textSize(12.5); textStyle(BOLD);
  text('Match Determination', bx + 12, cy + 8); textStyle(NORMAL);
  fill(INK); textSize(11);
  const msg = full
    ? 'Questioned ink matches ' + ls[best].label + ' (' + ls[best].name + '), ' +
      bestM + '/' + qVis.length + ' components matched.'
    : 'No reference is a full match. Closest is ' + ls[best].label + ' (' +
      bestM + '/' + qVis.length + ' matched).';
  text(msg, bx + 12, cy + 28, bw - 24);
}

function drawMark(cx, cy, ok) {
  stroke(ok ? GREEN : RED); strokeWeight(2.5); noFill();
  if (ok) { line(cx - 5, cy, cx - 1, cy + 5); line(cx - 1, cy + 5, cx + 6, cy - 4); }
  else { line(cx - 5, cy - 5, cx + 5, cy + 5); line(cx + 5, cy - 5, cx - 5, cy + 5); }
  noStroke();
}

function drawControlLabels() {
  fill(SUB); textAlign(LEFT, CENTER); textSize(11);
  const ly = drawHeight + 26;
  text('Ink', margin, ly);
  text('Refs', margin + 232, ly);
}
