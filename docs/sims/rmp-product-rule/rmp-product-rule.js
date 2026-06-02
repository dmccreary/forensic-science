// Random Match Probability — Product Rule Calculator — Apply (L3)
// CANVAS_HEIGHT: 550
// Apply the product rule: multiply the single-locus genotype frequencies across
// STR loci to get the random match probability (RMP). Toggle loci in and out with
// the checkboxes and watch the running product shrink locus by locus, then read
// the RMP as a fraction, as "1 in X", and against real population sizes.

let canvasWidth = 900;
const drawHeight = 500;
const controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
const margin = 15;
const defaultTextSize = 16;

const INK = '#1d2b3a';
const SUB = '#5b6472';
const PANEL = '#ffffff';
const PANEL_E = '#cdd7e5';
const BLUE = '#2f6fb0';
const RED = '#c0392b';
const GREEN = '#2e9e57';
const ORANGE = '#e8900c';
const HEAD = '#173a63';

const LOCI = [
  { name: 'D3S1358', a1: '15', a2: '18', freq: 0.060 },
  { name: 'vWA',     a1: '16', a2: '17', freq: 0.055 },
  { name: 'FGA',     a1: '21', a2: '24', freq: 0.035 },
  { name: 'D8S1179', a1: '13', a2: '14', freq: 0.050 },
  { name: 'D21S11',  a1: '28', a2: '30', freq: 0.040 },
  { name: 'D18S51',  a1: '14', a2: '16', freq: 0.045 },
  { name: 'D5S818',  a1: '11', a2: '12', freq: 0.058 },
  { name: 'D13S317', a1: '11', a2: '13', freq: 0.034 }
];

const POPS = [
  { label: 'U.S. population', n: 3.34e8, col: GREEN },
  { label: 'World population', n: 8.1e9, col: ORANGE }
];

let included = LOCI.map(() => true);
let showResult = true;
let checks = [];
let allButton, clearButton, calcButton;

// table geometry (recomputed in layout())
let geo = {};
function layout() {
  const w = canvasWidth - 2 * margin;
  const tableX = margin, tableY = 44;
  const tableW = w * 0.50;
  const tableH = drawHeight - tableY - 12;
  const headerH = 30;
  const rowH = (tableH - headerH) / LOCI.length;
  geo = { w, tableX, tableY, tableW, tableH, headerH, rowH,
    panelX: tableX + tableW + 14, panelW: w - tableW - 14 };
}

function setup() {
  updateCanvasSize();
  const cnv = createCanvas(canvasWidth, canvasHeight);
  cnv.parent(document.querySelector('main'));
  textSize(defaultTextSize);
  layout();

  for (let i = 0; i < LOCI.length; i++) {
    const cb = createCheckbox('', included[i]);
    cb.changed(() => { included[i] = cb.checked(); });
    checks.push(cb);
  }
  allButton = createButton('Select All');
  allButton.mousePressed(() => { included = LOCI.map(() => true); syncChecks(); });
  clearButton = createButton('Clear');
  clearButton.mousePressed(() => { included = LOCI.map(() => false); syncChecks(); });
  calcButton = createButton('Calculate Product');
  calcButton.mousePressed(() => { showResult = true; });
  positionControls();
}
function syncChecks() { checks.forEach((cb, i) => cb.checked(included[i])); }

function positionControls() {
  layout();
  for (let i = 0; i < LOCI.length; i++) {
    const ry = geo.tableY + geo.headerH + i * geo.rowH + geo.rowH / 2 - 8;
    checks[i].position(geo.tableX + 10, ry);
  }
  const by = drawHeight + 12;
  allButton.position(margin, by);
  clearButton.position(margin + 90, by);
  calcButton.position(margin + 160, by);
}
function updateCanvasSize() {
  const c = document.querySelector('main');
  if (c) canvasWidth = Math.max(800, Math.floor(c.getBoundingClientRect().width));
}
function windowResized() {
  updateCanvasSize(); resizeCanvas(canvasWidth, canvasHeight); positionControls();
}

function runningProducts() {
  // returns array of {i, prod} for included loci in order, cumulative product
  const steps = [];
  let p = 1;
  for (let i = 0; i < LOCI.length; i++) {
    if (included[i]) { p *= LOCI[i].freq; steps.push({ i, prod: p }); }
  }
  return steps;
}

function fmtSci(x) {
  if (x <= 0) return '0';
  const e = Math.floor(Math.log10(x));
  const m = x / Math.pow(10, e);
  return m.toFixed(2) + ' × 10^' + e;
}
function fmtOneIn(x) {
  if (x <= 0) return '—';
  const inv = 1 / x;
  const e = Math.floor(Math.log10(inv));
  if (e < 4) return '1 in ' + Math.round(inv).toLocaleString();
  const m = inv / Math.pow(10, e);
  return '1 in ' + m.toFixed(1) + ' × 10^' + e;
}

function draw() {
  background('#eef2f7');
  noStroke();
  fill('#f4f4f4'); rect(0, drawHeight, canvasWidth, controlHeight);

  fill(HEAD); textAlign(CENTER, TOP); textSize(20); textStyle(BOLD);
  text('Random Match Probability — Product Rule', canvasWidth / 2, 8); textStyle(NORMAL);

  layout();
  drawTable();
  drawPanel();

  fill(SUB); textAlign(LEFT, CENTER); textSize(11);
  const cnt = included.filter(Boolean).length;
  text(cnt + ' of ' + LOCI.length + ' loci included · check rows to build the product',
    margin + 300, drawHeight + 25);
}

function drawTable() {
  const g = geo;
  fill(PANEL); stroke(PANEL_E); strokeWeight(1); rect(g.tableX, g.tableY, g.tableW, g.tableH, 8); noStroke();
  // header
  fill(HEAD); textAlign(LEFT, CENTER); textSize(11.5); textStyle(BOLD);
  const cLocus = g.tableX + 40, cGeno = g.tableX + g.tableW * 0.46, cFreq = g.tableX + g.tableW * 0.74;
  text('Locus', cLocus, g.tableY + g.headerH / 2);
  text('Genotype', cGeno, g.tableY + g.headerH / 2);
  text('Freq.', cFreq, g.tableY + g.headerH / 2);
  textStyle(NORMAL);
  stroke(PANEL_E); line(g.tableX + 6, g.tableY + g.headerH, g.tableX + g.tableW - 6, g.tableY + g.headerH); noStroke();

  for (let i = 0; i < LOCI.length; i++) {
    const ry = g.tableY + g.headerH + i * g.rowH;
    const on = included[i];
    if (on) { fill('#eaf2fb'); rect(g.tableX + 4, ry + 2, g.tableW - 8, g.rowH - 4, 4); }
    fill(on ? INK : '#9aa6b3'); textAlign(LEFT, CENTER); textSize(12.5);
    text(LOCI[i].name, cLocus, ry + g.rowH / 2);
    textSize(12);
    text(LOCI[i].a1 + ', ' + LOCI[i].a2, cGeno, ry + g.rowH / 2);
    fill(on ? BLUE : '#9aa6b3'); textStyle(BOLD);
    text(LOCI[i].freq.toFixed(3), cFreq, ry + g.rowH / 2); textStyle(NORMAL);
    if (i < LOCI.length - 1) { stroke('#eef2f7'); line(g.tableX + 6, ry + g.rowH, g.tableX + g.tableW - 6, ry + g.rowH); noStroke(); }
  }
}

function drawPanel() {
  const g = geo;
  const x = g.panelX, y = g.tableY, w = g.panelW, h = g.tableH;
  fill(PANEL); stroke(PANEL_E); strokeWeight(1); rect(x, y, w, h, 8); noStroke();

  const steps = runningProducts();
  const rmp = steps.length ? steps[steps.length - 1].prod : 1;

  fill(HEAD); textAlign(LEFT, TOP); textSize(12.5); textStyle(BOLD);
  text('Running Product (log scale)', x + 14, y + 10); textStyle(NORMAL);

  // log-scale curve
  const gx = x + 44, gy = y + 34, gw = w - 60, gh = 150;
  fill('#f6f9fc'); stroke(PANEL_E); rect(gx, gy, gw, gh, 6); noStroke();
  const expMin = -12, expMax = 0;
  // axis labels
  fill(SUB); textAlign(RIGHT, CENTER); textSize(9);
  for (let e = 0; e >= expMin; e -= 3) {
    const yy = map(e, expMax, expMin, gy + 6, gy + gh - 6);
    stroke('#e3e8f0'); line(gx, yy, gx + gw, yy); noStroke();
    fill(SUB); text('10^' + e, gx - 4, yy);
  }
  // curve over included loci
  if (steps.length) {
    stroke(BLUE); strokeWeight(2); noFill();
    beginShape();
    // start at 10^0
    let x0 = gx + 6;
    vertex(x0, map(0, expMax, expMin, gy + 6, gy + gh - 6));
    steps.forEach((s, k) => {
      const px = map(k, 0, max(1, steps.length - 1), gx + 6, gx + gw - 6);
      const e = Math.log10(s.prod);
      const py = map(constrain(e, expMin, expMax), expMax, expMin, gy + 6, gy + gh - 6);
      vertex(px, py);
    });
    endShape();
    noStroke();
    steps.forEach((s, k) => {
      const px = map(k, 0, max(1, steps.length - 1), gx + 6, gx + gw - 6);
      const e = Math.log10(s.prod);
      const py = map(constrain(e, expMin, expMax), expMax, expMin, gy + 6, gy + gh - 6);
      fill(k === steps.length - 1 ? RED : BLUE); circle(px, py, k === steps.length - 1 ? 9 : 6);
    });
  } else {
    fill(SUB); textAlign(CENTER, CENTER); textSize(11.5);
    text('Check at least one locus to begin.', gx + gw / 2, gy + gh / 2);
  }

  // result block
  const ry = gy + gh + 16;
  fill(HEAD); textAlign(LEFT, TOP); textSize(12.5); textStyle(BOLD);
  text('Random Match Probability', x + 14, ry); textStyle(NORMAL);
  if (showResult && steps.length) {
    fill(SUB); textSize(12); text('RMP =', x + 14, ry + 22);
    fill(RED); textSize(15); textStyle(BOLD); text(fmtSci(rmp), x + 64, ry + 20); textStyle(NORMAL);
    fill(steps.length ? RED : SUB); textSize(26); textStyle(BOLD);
    text(fmtOneIn(rmp), x + 14, ry + 42); textStyle(NORMAL);

    // population comparison bars
    const cy = ry + 84;
    fill(HEAD); textSize(11.5); textStyle(BOLD); text('How rare is that?', x + 14, cy); textStyle(NORMAL);
    const refs = POPS.concat([{ label: 'This DNA profile (1 in …)', n: 1 / rmp, col: RED }]);
    let maxLog = 0; refs.forEach(r => maxLog = max(maxLog, Math.log10(r.n)));
    const bx = x + 14, bw = w - 130, by0 = cy + 20, bh = 14, gap = 8;
    refs.forEach((r, k) => {
      const yy = by0 + k * (bh + gap);
      const frac = Math.log10(r.n) / maxLog;
      fill('#eef2f7'); rect(bx, yy, bw, bh, 3);
      fill(r.col); rect(bx, yy, bw * frac, bh, 3);
      fill(INK); textAlign(LEFT, CENTER); textSize(9.5);
      text(r.label, bx + 2, yy - 7);
      fill(SUB); textAlign(LEFT, CENTER); textSize(10);
      text(fmtCount(r.n), bx + bw + 6, yy + bh / 2);
    });
    // takeaway
    const inv = 1 / rmp;
    fill(inv > POPS[1].n ? RED : SUB); textAlign(LEFT, TOP); textSize(10.3);
    const msg = inv > POPS[1].n
      ? 'Rarer than the entire world population — a random unrelated person almost certainly would not match by chance.'
      : 'Add more loci to push the match probability below the world population.';
    text(msg, x + 14, by0 + refs.length * (bh + gap) + 4, w - 28);
  } else {
    fill(SUB); textSize(11.5);
    text('Press "Calculate Product" to multiply the included loci and reveal the RMP.', x + 14, ry + 24, w - 28);
  }
}

function fmtCount(n) {
  const e = Math.floor(Math.log10(n));
  const m = n / Math.pow(10, e);
  return m.toFixed(1) + '×10^' + e;
}
