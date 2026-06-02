// ABO Blood Typing Interactive Simulator - p5.js
// CANVAS_HEIGHT: 540
// Bloom Level: Understand (L2) - INTERPRET agglutination results to determine blood type.
// The learner picks a mystery sample, adds Anti-A and Anti-B antisera (and optional
// Anti-D for Rh), OBSERVES whether the red cells clump (agglutinate) or stay smooth,
// PREDICTS the type, then presses Reveal to check the interpretation.
// MicroSim template version 2026.03

// ---- layout globals (standard MicroSim structure) ----
let canvasWidth = 400;
let drawHeight = 455;        // drawing region
let controlHeight = 85;      // two rows of controls
let canvasHeight = drawHeight + controlHeight;
let margin = 20;
let defaultTextSize = 16;

// ---- controls ----
let sampleSelect, addASerum, addBSerum, revealButton, resetButton, rhCheckbox;

// ---- mystery samples (type + Rh). Order shuffled on reset so it is a real test. ----
const TYPES = [
  { type: 'A',  antigens: ['A'],       rh: true  },
  { type: 'B',  antigens: ['B'],       rh: false },
  { type: 'AB', antigens: ['A', 'B'],  rh: true  },
  { type: 'O',  antigens: [],          rh: false }
];
let samples = [];     // shuffled copy, one per "Sample N"
let current = 0;      // index of selected sample

// ---- per-well state ----
// well: { id:'A'|'B'|'D', added:bool, t:0..1 (anim), result:'agg'|'clear'|null, cells:[] }
let wells = {};

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  // Row 1
  sampleSelect = createSelect();
  for (let i = 1; i <= 4; i++) sampleSelect.option('Sample ' + i);
  sampleSelect.selected('Sample 1');
  sampleSelect.position(10, drawHeight + 8);
  sampleSelect.changed(onSampleChange);

  addASerum = createButton('Add Anti-A');
  addASerum.position(120, drawHeight + 8);
  addASerum.mousePressed(function () { addReagent('A'); });

  addBSerum = createButton('Add Anti-B');
  addBSerum.position(210, drawHeight + 8);
  addBSerum.mousePressed(function () { addReagent('B'); });

  // Row 2
  revealButton = createButton('Reveal Type');
  revealButton.position(10, drawHeight + 46);
  revealButton.mousePressed(revealType);

  resetButton = createButton('New Sample');
  resetButton.position(110, drawHeight + 46);
  resetButton.mousePressed(newRound);

  rhCheckbox = createCheckbox(' Test Rh (Anti-D)', false);
  rhCheckbox.position(220, drawHeight + 48);
  rhCheckbox.changed(onRhToggle);

  shuffleSamples();
  initWells();
  describe('ABO blood typing simulator. Select a mystery blood sample, add Anti-A and Anti-B antiserum to the test wells, observe whether the red blood cells agglutinate (clump) or stay smooth, predict the blood type, then reveal the answer with an explanation.', LABEL);
}

let revealed = false;

function shuffleSamples() {
  samples = TYPES.slice();
  for (let i = samples.length - 1; i > 0; i--) {
    const j = Math.floor(random(i + 1));
    const tmp = samples[i]; samples[i] = samples[j]; samples[j] = tmp;
  }
}

function activeWellIds() {
  return rhCheckbox && rhCheckbox.checked() ? ['A', 'B', 'D'] : ['A', 'B'];
}

function initWells() {
  wells = {};
  ['A', 'B', 'D'].forEach(function (id) {
    wells[id] = { id: id, added: false, t: 0, result: null, cells: makeCells() };
  });
  revealed = false;
}

function makeCells() {
  const cells = [];
  for (let i = 0; i < 70; i++) {
    cells.push({ bx: random(-1, 1), by: random(-1, 1), cx: 0, cy: 0, r: random(3, 5) });
  }
  return cells;
}

function reactionFor(wellId) {
  const s = samples[current];
  if (wellId === 'A') return s.antigens.indexOf('A') >= 0 ? 'agg' : 'clear';
  if (wellId === 'B') return s.antigens.indexOf('B') >= 0 ? 'agg' : 'clear';
  if (wellId === 'D') return s.rh ? 'agg' : 'clear';
  return 'clear';
}

function addReagent(id) {
  const w = wells[id];
  if (w.added) return;
  w.added = true;
  w.result = reactionFor(id);
  assignClumps(w);
}

// pre-compute clump target positions for the cells in a well
function assignClumps(w) {
  const n = w.cells.length;
  if (w.result === 'agg') {
    // group cells into 4-6 clumps
    const clumpCount = floor(random(4, 7));
    const centers = [];
    for (let c = 0; c < clumpCount; c++) {
      centers.push({ x: random(-0.55, 0.55), y: random(-0.55, 0.55) });
    }
    for (let i = 0; i < n; i++) {
      const c = centers[i % clumpCount];
      w.cells[i].cx = c.x + random(-0.12, 0.12);
      w.cells[i].cy = c.y + random(-0.12, 0.12);
    }
  } else {
    // dispersed evenly
    for (let i = 0; i < n; i++) {
      const a = random(TWO_PI), rr = sqrt(random()) * 0.82;
      w.cells[i].cx = cos(a) * rr;
      w.cells[i].cy = sin(a) * rr;
    }
  }
}

function revealType() {
  const ids = activeWellIds();
  let allAdded = true;
  ids.forEach(function (id) { if (!wells[id].added) allAdded = false; });
  if (!allAdded) return;       // require observation before reveal
  revealed = true;
}

function newRound() {
  shuffleSamples();
  current = selectedSampleIndex();
  initWells();
}

function selectedSampleIndex() {
  return parseInt(sampleSelect.value().replace('Sample ', ''), 10) - 1;
}

function onSampleChange() {
  current = selectedSampleIndex();
  initWells();
}

function onRhToggle() {
  // reset only the wells so the new panel is observed fresh
  initWells();
}

function draw() {
  updateCanvasSize();

  // background regions
  noStroke();
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // animate wells
  const ids = activeWellIds();
  for (const id of ids) {
    const w = wells[id];
    if (w.added && w.t < 1) w.t = min(1, w.t + 0.04);
  }

  // title
  noStroke();
  fill('black');
  textAlign(CENTER, TOP);
  textSize(22);
  text('ABO / Rh Blood Typing', canvasWidth / 2, 8);
  textSize(13);
  fill('#495057');
  text('Add antiserum, watch for agglutination (clumping), then interpret the type',
       margin, 34, canvasWidth - 2 * margin);

  drawWells(ids);
  drawReadout(ids);
  drawResultPanel(ids);
  drawControlLabels();
}

function drawWells(ids) {
  const n = ids.length;
  const topY = 70;
  const wellR = min(62, (canvasWidth - 2 * margin) / (n * 2.4));
  const slotW = (canvasWidth - 2 * margin) / n;
  const cy = topY + wellR + 6;
  for (let k = 0; k < n; k++) {
    const cx = margin + slotW * (k + 0.5);
    drawWell(ids[k], cx, cy, wellR);
  }
}

function drawWell(id, cx, cy, r) {
  const w = wells[id];
  const labelMap = { A: 'Anti-A', B: 'Anti-B', D: 'Anti-D (Rh)' };

  // well dish
  noStroke();
  fill('white');
  stroke('#b0b0b0');
  strokeWeight(2);
  ellipse(cx, cy, r * 2, r * 2);

  // suspension / cells
  const ease = w.added ? easeInOut(w.t) : 0;
  if (!w.added) {
    // faint reddish empty suspension hint
    noStroke();
    fill(255, 228, 225, 120);
    ellipse(cx, cy, r * 2 - 6, r * 2 - 6);
  } else {
    // tint behind cells
    noStroke();
    if (w.result === 'clear') fill(244, 169, 160, 150 * ease + 40);
    else fill(255, 235, 232, 60);
    ellipse(cx, cy, r * 2 - 6, r * 2 - 6);

    // cells move from dispersed (base) to clump/dispersed target
    for (let i = 0; i < w.cells.length; i++) {
      const c = w.cells[i];
      const x = cx + lerp(c.bx, c.cx, ease) * (r - 8);
      const y = cy + lerp(c.by, c.cy, ease) * (r - 8);
      noStroke();
      if (w.result === 'agg') fill('#8b0000');
      else fill(220, 90, 80);
      ellipse(x, y, c.r, c.r);
    }
    // result chip
    if (w.t > 0.5) {
      noStroke();
      const agg = w.result === 'agg';
      fill(agg ? '#8b0000' : '#6c757d');
      rectMode(CENTER);
      rect(cx, cy + r + 18, 92, 22, 6);
      rectMode(CORNER);
      fill('white');
      textAlign(CENTER, CENTER);
      textSize(13);
      text(agg ? 'AGGLUTINATED +' : 'no reaction −', cx, cy + r + 18);
    }
  }

  // reagent label
  noStroke();
  fill('#1a3a6c');
  textAlign(CENTER, TOP);
  textSize(14);
  text(labelMap[id], cx, cy - r - 18);
  if (!w.added) {
    fill('#adb5bd');
    textSize(11);
    text('(no serum yet)', cx, cy + r + 10);
  }
}

function easeInOut(t) { return t < 0.5 ? 2 * t * t : 1 - pow(-2 * t + 2, 2) / 2; }

function drawReadout(ids) {
  // small interpretation grid below wells
  const y = 270;
  noStroke();
  fill('#212529');
  textAlign(LEFT, TOP);
  textSize(13);
  text('Reaction so far:', margin, y);
  let line = ids.map(function (id) {
    const w = wells[id];
    const lbl = id === 'D' ? 'Anti-D' : 'Anti-' + id;
    const r = !w.added ? '?' : (w.result === 'agg' ? '+' : '−');
    return lbl + ': ' + r;
  }).join('     ');
  fill('#0d3b66');
  textSize(14);
  text(line, margin, y + 20);
}

function drawResultPanel(ids) {
  const py = 305;
  noStroke();
  fill(255, 255, 255, 235);
  stroke('#c9d6e8');
  strokeWeight(1);
  rect(margin - 4, py, canvasWidth - 2 * margin + 8, drawHeight - py - 8, 8);
  noStroke();

  let allAdded = true;
  ids.forEach(function (id) { if (!wells[id].added) allAdded = false; });

  textAlign(LEFT, TOP);
  if (!allAdded) {
    fill('#7a4d00');
    textSize(14);
    text('Step 1 — Add Anti-A and Anti-B' + (ids.indexOf('D') >= 0 ? ' and Anti-D' : '') +
         ' to the wells above and watch each reaction.', margin + 4, py + 10, canvasWidth - 2 * margin - 4);
    fill('#495057');
    textSize(13);
    text('Clumping (agglutination) means the matching antigen is present on the red cells.',
         margin + 4, py + 56, canvasWidth - 2 * margin - 4);
  } else if (!revealed) {
    fill('#14401a');
    textSize(14);
    text('Step 2 — Predict the blood type from the + / − pattern, then press "Reveal Type".',
         margin + 4, py + 10, canvasWidth - 2 * margin - 4);
    fill('#495057');
    textSize(13);
    text('Antigen A → Anti-A clumps. Antigen B → Anti-B clumps. Type O clumps with neither.',
         margin + 4, py + 50, canvasWidth - 2 * margin - 4);
  } else {
    const s = samples[current];
    const rhStr = ids.indexOf('D') >= 0 ? (s.rh ? ' Rh-positive' : ' Rh-negative') : '';
    fill('#0b5d1e');
    textSize(16);
    text('Blood type: ' + s.type + (ids.indexOf('D') >= 0 ? (s.rh ? '+' : '−') : ''),
         margin + 4, py + 8);
    fill('#212529');
    textSize(13);
    text(explain(s, ids) + rhStr + '.', margin + 4, py + 34, canvasWidth - 2 * margin - 4,
         drawHeight - py - 40);
  }
}

function explain(s, ids) {
  const a = wells['A'].result === 'agg';
  const b = wells['B'].result === 'agg';
  if (s.type === 'A')  return 'Anti-A clumped (antigen A present) and Anti-B did not → Type A';
  if (s.type === 'B')  return 'Anti-B clumped (antigen B present) and Anti-A did not → Type B';
  if (s.type === 'AB') return 'Both Anti-A and Anti-B clumped (antigens A and B present) → Type AB';
  return 'Neither antiserum clumped (no A or B antigen) → Type O';
}

function drawControlLabels() {
  // Controls are native p5 DOM elements; no canvas-drawn labels needed here.
}

// ---- responsive plumbing ----
function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = Math.floor(container.getBoundingClientRect().width);
  }
}
