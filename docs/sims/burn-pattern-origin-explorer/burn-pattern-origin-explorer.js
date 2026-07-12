// Burn-Pattern Origin Explorer — Analyze (L4)
// CANVAS_HEIGHT: 570
// Read burn-pattern evidence in a top-down room plan to locate a fire's point of
// origin. V-pattern scorch cones point toward each origin and the deepest,
// most-concentrated char marks it. Click to place an origin estimate, scrub the
// fire-spread time-lapse, optionally reveal the full burn-severity gradient, and
// score how close you got. Two unconnected origins raise the arson red flag.

let canvasWidth = 900;
const drawHeight = 500;
const controlHeight = 70;
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
const WALL = '#4a4136';
const FLOOR = [214, 205, 190];
const FURN = '#b9ae97';
const BLUE = '#2f6fb0';
const GREEN = '#2e9e57';
const ORANGE = '#e8730c';
const RED = '#c0392b';

const ROOM_W_M = 6.0;   // real room dimensions (meters) for distance scoring
const ROOM_L_M = 4.0;

// scenarios: origins are normalized (x-fraction, y-fraction) inside the room
const SCEN = [
  { name: 'Accidental (single origin)', origins: [[0.22, 0.68]], outlet: [0.22, 0.68] },
  { name: 'Suspicious (two origins)',   origins: [[0.26, 0.33], [0.74, 0.66]], outlet: null }
];

// severity -> color stops (unburned floor up to charcoal)
const SEV_STOPS = [
  [0.00, [214, 205, 190]],
  [0.15, [201, 168, 116]],
  [0.35, [178, 96, 32]],
  [0.60, [120, 52, 22]],
  [0.82, [64, 38, 26]],
  [1.00, [32, 24, 20]]
];

let scenarioSelect, severityCheck, spreadSlider, scoreBtn, resetBtn;
let scenIndex = 0;
let estimate = null;     // {x, y} in pixels
let scored = false;
let scoreResult = null;   // {distM, rating, col, oi}
let RM = { rx: 0, ry: 0, rw: 1, rh: 1, sx: 1, sy: 1 };

function updateCanvasSize() {
  const c = document.querySelector('main');
  if (c) canvasWidth = Math.max(800, Math.floor(c.getBoundingClientRect().width));
}

function setup() {
  updateCanvasSize();
  const cnv = createCanvas(canvasWidth, canvasHeight);
  cnv.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  scenarioSelect = createSelect();
  SCEN.forEach(s => scenarioSelect.option(s.name));
  scenarioSelect.changed(() => {
    scenIndex = SCEN.findIndex(s => s.name === scenarioSelect.value());
    resetEstimate();
  });

  severityCheck = createCheckbox(' Show burn severity', false);

  spreadSlider = createSlider(0, 100, 35, 1);

  scoreBtn = createButton('Score My Origin');
  scoreBtn.mousePressed(doScore);
  resetBtn = createButton('Reset');
  resetBtn.mousePressed(resetEstimate);

  positionControls();
}

function positionControls() {
  const r1 = drawHeight + 12, r2 = drawHeight + 44;
  scenarioSelect.position(margin + 74, r1);
  severityCheck.position(margin + 300, r1 + 2);
  spreadSlider.position(margin + 92, r2 + 3); spreadSlider.size(170);
  scoreBtn.position(margin + 292, r2);
  resetBtn.position(margin + 424, r2);
}

function windowResized() {
  updateCanvasSize(); resizeCanvas(canvasWidth, canvasHeight); positionControls();
}

function resetEstimate() { estimate = null; scored = false; scoreResult = null; }

function spread01() { return spreadSlider.value() / 100; }

function trueOrigins() {
  return SCEN[scenIndex].origins.map(o => ({
    x: RM.rx + o[0] * RM.rw,
    y: RM.ry + o[1] * RM.rh
  }));
}

function severityRadius() { return Math.min(RM.rw, RM.rh) * 0.16 * (0.5 + 1.4 * spread01()); }

function isRevealed() { return severityCheck.checked() || scored; }

function doScore() {
  if (!estimate) return;
  const origins = trueOrigins();
  let best = Infinity, oi = 0;
  origins.forEach((o, i) => {
    const dx = (estimate.x - o.x) * RM.sx, dy = (estimate.y - o.y) * RM.sy;
    const d = Math.sqrt(dx * dx + dy * dy);
    if (d < best) { best = d; oi = i; }
  });
  let rating, col;
  if (best <= 0.6) { rating = 'Excellent'; col = GREEN; }
  else if (best <= 1.4) { rating = 'Good'; col = ORANGE; }
  else { rating = 'Off'; col = RED; }
  scoreResult = { distM: best, rating, col, oi };
  scored = true;
}

function colorForSeverity(s) {
  s = constrain(s, 0, 1);
  for (let i = 1; i < SEV_STOPS.length; i++) {
    if (s <= SEV_STOPS[i][0]) {
      const a = SEV_STOPS[i - 1], b = SEV_STOPS[i];
      const t = (s - a[0]) / (b[0] - a[0]);
      return [lerp(a[1][0], b[1][0], t), lerp(a[1][1], b[1][1], t), lerp(a[1][2], b[1][2], t)];
    }
  }
  return SEV_STOPS[SEV_STOPS.length - 1][1];
}

function severityAt(px, py, origins, R) {
  let s = 0;
  for (const o of origins) {
    const d = dist(px, py, o.x, o.y);
    s = Math.max(s, Math.exp(-(d * d) / (2 * R * R)));
  }
  return s;
}

// --- draw ----------------------------------------------------------------
function draw() {
  background(BG);
  noStroke();
  fill(CTRL_BG); rect(0, drawHeight, canvasWidth, controlHeight);

  fill(HEAD); textAlign(LEFT, TOP); textSize(20); textStyle(BOLD);
  text('Burn-Pattern Origin Explorer', margin, 8); textStyle(NORMAL);
  fill(SUB); textSize(11.5);
  text('Read the V-patterns and char to find where the fire started. Click the floor to place your origin estimate.',
    margin, 32);

  // layout
  const roomTop = 52, roomBottom = drawHeight - margin;
  const leftAreaW = (canvasWidth - 3 * margin) * 0.70;
  RM.rx = margin + 4; RM.ry = roomTop; RM.rw = leftAreaW - 8; RM.rh = roomBottom - roomTop;
  RM.sx = ROOM_W_M / RM.rw; RM.sy = ROOM_L_M / RM.rh;

  drawRoom();

  const panelX = 2 * margin + leftAreaW;
  drawPanel(panelX, roomTop, canvasWidth - panelX - margin, roomBottom - roomTop);

  drawControlLabels();
}

function drawRoom() {
  const { rx, ry, rw, rh } = RM;
  const origins = trueOrigins();
  const R = severityRadius();

  // floor base
  noStroke(); fill(FLOOR[0], FLOOR[1], FLOOR[2]); rect(rx, ry, rw, rh);

  // full burn-severity gradient (toggle)
  if (severityCheck.checked()) {
    const cs = 12;
    noStroke();
    for (let px = rx; px < rx + rw; px += cs) {
      for (let py = ry; py < ry + rh; py += cs) {
        const s = severityAt(px + cs / 2, py + cs / 2, origins, R);
        if (s < 0.04) continue;
        const c = colorForSeverity(s);
        fill(c[0], c[1], c[2]);
        rect(px, py, Math.min(cs, rx + rw - px), Math.min(cs, ry + rh - py));
      }
    }
  }

  // faint floor grid
  stroke(0, 0, 0, 20); strokeWeight(1);
  for (let gx = 1; gx < 6; gx++) line(rx + gx / 6 * rw, ry, rx + gx / 6 * rw, ry + rh);
  for (let gy = 1; gy < 4; gy++) line(rx, ry + gy / 4 * rh, rx + rw, ry + gy / 4 * rh);
  noStroke();

  // always-visible char cue: a deep, concentrated char blotch at each origin
  for (const o of origins) drawCharBlotch(o, R);

  // furniture
  drawFurniture();

  // walls (drawn over furniture edges)
  noFill(); stroke(WALL); strokeWeight(7); rect(rx, ry, rw, rh);
  // doorway gap on the bottom wall
  stroke(BG); strokeWeight(9);
  line(rx + rw * 0.44, ry + rh, rx + rw * 0.60, ry + rh);
  noStroke(); fill(SUB); textSize(9.5); textAlign(CENTER, TOP);
  text('door', rx + rw * 0.52, ry + rh + 4);

  // always-visible V-pattern scorch cones pointing toward each origin
  for (const o of origins) drawVCone(o);

  // outlet hint for the accidental scenario
  const outlet = SCEN[scenIndex].outlet;
  if (outlet) drawOutlet(rx + outlet[0] * rw, ry + outlet[1] * rh);

  // reveal the true origin(s)
  if (isRevealed()) {
    for (const o of origins) drawTrueOrigin(o);
    if (SCEN[scenIndex].origins.length > 1) drawRedFlagBanner();
  }

  // the student's estimate, plus the scored distance line
  if (estimate) {
    if (scored && scoreResult && isRevealed()) {
      const o = origins[scoreResult.oi];
      stroke(scoreResult.col); strokeWeight(2); drawingContext.setLineDash([5, 5]);
      line(estimate.x, estimate.y, o.x, o.y); drawingContext.setLineDash([]); noStroke();
    }
    drawEstimate(estimate);
  }
}

function drawCharBlotch(o, R) {
  const rad = R * 0.6;
  noStroke();
  for (let i = 6; i >= 1; i--) {
    fill(28, 20, 16, 38);
    circle(o.x, o.y, rad * (i / 6) * 2);
  }
}

function drawVCone(o) {
  const { rx, ry, rw, rh } = RM;
  const dL = o.x - rx, dR = (rx + rw) - o.x, dT = o.y - ry, dB = (ry + rh) - o.y;
  const m = Math.min(dL, dR, dT, dB);
  const coneLen = 48, half = 30;
  let bx1, by1, bx2, by2, apx, apy, lx, ly;
  if (m === dL) { bx1 = rx; by1 = o.y - half; bx2 = rx; by2 = o.y + half; apx = rx + coneLen; apy = o.y; lx = rx + 14; ly = o.y - half - 4; }
  else if (m === dR) { bx1 = rx + rw; by1 = o.y - half; bx2 = rx + rw; by2 = o.y + half; apx = rx + rw - coneLen; apy = o.y; lx = rx + rw - 52; ly = o.y - half - 4; }
  else if (m === dT) { bx1 = o.x - half; by1 = ry; bx2 = o.x + half; by2 = ry; apx = o.x; apy = ry + coneLen; lx = o.x - 22; ly = ry + 4; }
  else { bx1 = o.x - half; by1 = ry + rh; bx2 = o.x + half; by2 = ry + rh; apx = o.x; apy = ry + rh - coneLen; lx = o.x - 22; ly = ry + rh - 16; }
  // soot cone (base on wall, apex toward origin)
  noStroke(); fill(46, 34, 28, 150);
  triangle(bx1, by1, bx2, by2, apx, apy);
  fill(30, 22, 18, 90);
  triangle((bx1 + apx) / 2, (by1 + apy) / 2, (bx2 + apx) / 2, (by2 + apy) / 2, apx, apy);
  fill('#3a2c24'); textSize(8.5); textAlign(LEFT, TOP); textStyle(BOLD);
  text('V-pattern', lx, ly); textStyle(NORMAL);
}

function drawFurniture() {
  const { rx, ry, rw, rh } = RM;
  noStroke(); fill(FURN); stroke('#8f8467'); strokeWeight(1.5);
  // shelving along the top wall
  rect(rx + rw * 0.12, ry + 8, rw * 0.42, 16, 2);
  // a workbench in the upper-right (clear of both origins)
  rect(rx + rw * 0.66, ry + rh * 0.12, rw * 0.24, rh * 0.14, 2);
  noStroke(); fill(SUB); textSize(8.5); textAlign(CENTER, CENTER);
  text('shelving', rx + rw * 0.33, ry + 16);
  text('bench', rx + rw * 0.78, ry + rh * 0.19);
}

function drawOutlet(x, y) {
  push(); noStroke(); fill('#ffffff'); stroke('#7a6f58'); strokeWeight(1);
  rect(x - 6, y - 8, 12, 16, 2);
  noStroke(); fill('#5a5040'); circle(x - 2.5, y - 2, 2.4); circle(x + 2.5, y - 2, 2.4);
  fill(SUB); textSize(8); textAlign(CENTER, TOP); text('outlet', x, y + 9); pop();
}

function drawTrueOrigin(o) {
  push(); stroke(RED); strokeWeight(2.5);
  line(o.x - 8, o.y - 8, o.x + 8, o.y + 8); line(o.x - 8, o.y + 8, o.x + 8, o.y - 8);
  noFill(); stroke(RED); strokeWeight(2); circle(o.x, o.y, 26);
  noStroke(); fill(RED); textSize(9); textAlign(CENTER, TOP); textStyle(BOLD);
  text('true origin', o.x, o.y + 15); textStyle(NORMAL); pop();
}

function drawEstimate(e) {
  push(); noStroke(); fill(BLUE); circle(e.x, e.y, 16);
  fill('#fff'); circle(e.x, e.y, 6);
  fill(BLUE); textSize(9.5); textAlign(CENTER, BOTTOM); textStyle(BOLD);
  text('your estimate', e.x, e.y - 11); textStyle(NORMAL); pop();
}

function drawRedFlagBanner() {
  const { rx, ry, rw } = RM;
  const bw = Math.min(rw - 20, 320), bx = rx + (rw - bw) / 2, by = ry + 10;
  noStroke(); fill(192, 57, 43, 235); rect(bx, by, bw, 26, 5);
  fill('#fff'); textAlign(CENTER, CENTER); textSize(12); textStyle(BOLD);
  text('⚠  MULTIPLE ORIGINS — ARSON RED FLAG', bx + bw / 2, by + 13); textStyle(NORMAL);
}

function drawPanel(x, y, w, h) {
  fill(PANEL); stroke(PANEL_E); strokeWeight(1); rect(x, y, w, h, 8); noStroke();
  let cy = y + 12;
  fill(HEAD); textAlign(LEFT, TOP); textSize(13.5); textStyle(BOLD);
  text('Origin Analysis', x + 12, cy); textStyle(NORMAL); cy += 22;

  fill(INK); textSize(11.5);
  text('Scenario:', x + 12, cy); cy += 15;
  fill(scenIndex === 1 ? RED : GREEN); textStyle(BOLD); textSize(11.5);
  text(SCEN[scenIndex].name, x + 12, cy); textStyle(NORMAL); cy += 22;

  fill(SUB); textSize(10.5);
  cy = wrapText('Read the cues: each V-pattern apex points toward an origin, and the deepest, most concentrated char sits right on it. Click the floor to drop your estimate.',
    x + 12, cy, w - 24, 13); cy += 8;

  fill(INK); textSize(11);
  text('Fire spread: ' + spreadSlider.value() + '%', x + 12, cy); cy += 20;

  stroke(PANEL_E); line(x + 12, cy, x + w - 12, cy); noStroke(); cy += 12;

  if (scored && scoreResult) {
    fill(INK); textSize(11);
    text('Estimate → nearest origin:', x + 12, cy); cy += 18;
    fill('#f6f8fb'); stroke('#d4ddea'); strokeWeight(1); rect(x + 12, cy, w - 24, 52, 6); noStroke();
    fill(SUB); textSize(10); text('distance', x + 22, cy + 8);
    fill(INK); textStyle(BOLD); textSize(20); text(scoreResult.distM.toFixed(2) + ' m', x + 22, cy + 20); textStyle(NORMAL);
    fill(scoreResult.col); textStyle(BOLD); textSize(15); textAlign(RIGHT, CENTER);
    text(scoreResult.rating, x + w - 22, cy + 26); textAlign(LEFT, TOP); textStyle(NORMAL);
    cy += 62;
  } else {
    fill(SUB); textSize(10.5);
    text(estimate ? 'Press "Score My Origin".' : 'Click the floor to place a marker.', x + 12, cy); cy += 22;
  }

  if (isRevealed()) {
    if (SCEN[scenIndex].origins.length > 1) {
      fill('#fdecea'); stroke(RED); strokeWeight(1); rect(x + 12, cy, w - 24, 62, 6); noStroke();
      fill(RED); textStyle(BOLD); textSize(11); text('MULTIPLE ORIGINS', x + 20, cy + 8); textStyle(NORMAL);
      fill('#7a2018'); textSize(9.8);
      wrapText('Two separate origins with no burn path between them — fire cannot teleport. This is a strong arson indicator; confirm accelerant in the lab.',
        x + 20, cy + 24, w - 40, 11);
      cy += 72;
    } else {
      fill('#eaf6ee'); stroke(GREEN); strokeWeight(1); rect(x + 12, cy, w - 24, 50, 6); noStroke();
      fill('#1c6b39'); textStyle(BOLD); textSize(11); text('SINGLE ORIGIN', x + 20, cy + 8); textStyle(NORMAL);
      fill('#255c3b'); textSize(9.8);
      wrapText('One origin, consistent with an accidental fire — but any accelerant claim still needs lab confirmation.',
        x + 20, cy + 24, w - 40, 11);
      cy += 60;
    }
  }

  // legend anchored at the bottom
  drawLegend(x + 12, y + h - 60, w - 24);
}

function drawLegend(x, y, w) {
  fill(HEAD); textAlign(LEFT, TOP); textSize(10); textStyle(BOLD);
  text('Burn severity', x, y); textStyle(NORMAL);
  const gy = y + 16, gw = w, gh = 12;
  for (let i = 0; i < gw; i++) {
    const c = colorForSeverity(i / gw);
    stroke(c[0], c[1], c[2]); line(x + i, gy, x + i, gy + gh);
  }
  noStroke(); fill(SUB); textSize(8.5); textAlign(LEFT, TOP);
  text('unburned', x, gy + gh + 2); textAlign(RIGHT, TOP);
  text('deep char', x + gw, gy + gh + 2); textAlign(LEFT, TOP);
}

// simple word-wrap helper; returns the next y
function wrapText(str, x, y, w, lh) {
  const words = str.split(' ');
  let line = '', yy = y;
  textAlign(LEFT, TOP);
  for (const word of words) {
    const test = line + word + ' ';
    if (textWidth(test) > w && line !== '') { text(line, x, yy); line = word + ' '; yy += lh; }
    else line = test;
  }
  text(line, x, yy);
  return yy + lh;
}

function drawControlLabels() {
  fill(SUB); textAlign(LEFT, CENTER); textSize(12);
  text('Scenario:', margin, drawHeight + 22);
  text('Fire spread', margin, drawHeight + 54);
}

function mousePressed() {
  if (mouseY < RM.ry || mouseY > RM.ry + RM.rh) return;
  if (mouseX < RM.rx || mouseX > RM.rx + RM.rw) return;
  estimate = { x: mouseX, y: mouseY };
  scored = false; scoreResult = null;
}
