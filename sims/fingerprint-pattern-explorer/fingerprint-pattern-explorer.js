// Fingerprint Pattern Classification Explorer — Remember (L1)
// CANVAS_HEIGHT: 520
// Identify the three fingerprint pattern families (loops, whorls, arches) and
// their eight subtypes by their defining structural features: core (yellow),
// delta(s) (green), and ridge flow (blue). Includes a Quiz Me self-test mode.

let canvasWidth = 900;
const drawHeight = 470;
const controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
const margin = 15;
const defaultTextSize = 16;

const RIDGE = '#3a3f47';
const CORE_C = '#f4b400';
const DELTA_C = '#2e9e57';
const FLOW_C = '#1769c9';

let quizButton, answerSelect, checkButton;

// family frequency badges
const FREQ = {
  Loop: { label: 'Common · ~60%', color: '#2e7d32' },
  Whorl: { label: 'Less common · ~35%', color: '#b8860b' },
  Arch: { label: 'Rare · ~5%', color: '#c0392b' }
};

const PATTERNS = [
  { name: 'Plain Loop (Ulnar)', family: 'Loop', render: 'loop', dir: 1,
    features: ['Exactly ONE delta', 'One or more ridges recurve (loop back)',
      'Ridges flow toward the little-finger (ulnar) side'] },
  { name: 'Plain Loop (Radial)', family: 'Loop', render: 'loop', dir: -1,
    features: ['Exactly ONE delta', 'One or more recurving ridges',
      'Ridges flow toward the thumb (radial) side'] },
  { name: 'Plain Whorl', family: 'Whorl', render: 'whorl',
    features: ['TWO deltas', 'At least one ridge makes a complete circuit',
      'Concentric circles or a spiral around the core'] },
  { name: 'Central Pocket Loop', family: 'Whorl', render: 'central',
    features: ['TWO deltas', 'A loop with a small whorl/pocket at the core',
      'A ridge near the core rolls into a tiny circle'] },
  { name: 'Double Loop Whorl', family: 'Whorl', render: 'double',
    features: ['TWO deltas', 'TWO separate loop formations',
      'Two cores with an S-shaped ridge flow'] },
  { name: 'Accidental Whorl', family: 'Whorl', render: 'accidental',
    features: ['TWO or more deltas', 'A combination of two pattern types',
      'Does not conform to any single class'] },
  { name: 'Plain Arch', family: 'Arch', render: 'arch', tented: false,
    features: ['NO delta and NO core', 'Ridges enter one side and exit the other',
      'A gentle wave rises in the center'] },
  { name: 'Tented Arch', family: 'Arch', render: 'arch', tented: true,
    features: ['Ridges thrust sharply UP at the center', 'Steeper than a plain arch',
      'May show an upthrust or rudimentary delta'] }
];

const DEFS = {
  Core: 'Core: the approximate center of the pattern — the innermost point the ridges curve around.',
  Delta: 'Delta: a triangular formation (like a river delta) where ridges flowing from three directions meet. Loops have one; whorls have two.',
  'Ridge Flow': 'Ridge Flow: the overall direction the friction ridges travel across the fingerprint.'
};

let selected = 0;
let quizMode = false;
let showAnno = true;
let quizTarget = 0;
let quizChecked = false;
let quizCorrect = false;
let popup = '';            // active annotation definition
let chipRects = [];        // [{label,x,y,w,h}]
let menuRects = [];        // [{i,x,y,w,h}]
let annot = { cores: [], deltas: [], flows: [] };

function setup() {
  updateCanvasSize();
  const cnv = createCanvas(canvasWidth, canvasHeight);
  cnv.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  quizButton = createButton('Quiz Me');
  quizButton.mousePressed(toggleQuiz);
  answerSelect = createSelect();
  for (const p of PATTERNS) answerSelect.option(p.name);
  checkButton = createButton('Check Answer');
  checkButton.mousePressed(checkOrNext);

  positionControls();
  updateControlVisibility();
}

function positionControls() {
  const r = drawHeight + 12;
  quizButton.position(margin, r);
  answerSelect.position(margin + 110, r);
  checkButton.position(margin + 340, r);
}
function updateControlVisibility() {
  if (quizMode) { answerSelect.show(); checkButton.show(); }
  else { answerSelect.hide(); checkButton.hide(); }
}

function updateCanvasSize() {
  const c = document.querySelector('main');
  if (c) canvasWidth = Math.max(780, Math.floor(c.getBoundingClientRect().width));
}
function windowResized() {
  updateCanvasSize(); resizeCanvas(canvasWidth, canvasHeight); positionControls();
}

function toggleQuiz() {
  quizMode = !quizMode;
  quizButton.html(quizMode ? 'Study Mode' : 'Quiz Me');
  popup = '';
  if (quizMode) startQuiz();
  else { showAnno = true; }
  updateControlVisibility();
}
function startQuiz() {
  quizTarget = Math.floor(Math.random() * PATTERNS.length);
  selected = quizTarget;
  showAnno = false;
  quizChecked = false;
  quizCorrect = false;
  checkButton.html('Check Answer');
}
function checkOrNext() {
  if (!quizMode) return;
  if (!quizChecked) {
    quizChecked = true;
    quizCorrect = (answerSelect.value() === PATTERNS[quizTarget].name);
    showAnno = true;
    checkButton.html('Next Pattern');
  } else {
    startQuiz();
  }
}

function draw() {
  background('#eef2f7');
  noStroke();
  fill('#f4f4f4'); rect(0, drawHeight, canvasWidth, controlHeight);

  fill('#173a63'); textAlign(CENTER, TOP); textSize(20); textStyle(BOLD);
  text('Fingerprint Pattern Classification Explorer', canvasWidth / 2, 8);
  textStyle(NORMAL);

  drawMenu(margin, 44, canvasWidth * 0.27 - margin, drawHeight - 56);
  drawMain(canvasWidth * 0.28, 44, canvasWidth - margin - canvasWidth * 0.28, drawHeight - 56);
}

function drawMenu(x, y, w, h) {
  noStroke(); fill('#ffffff'); stroke('#d6deea'); strokeWeight(1);
  rect(x, y, w, h, 8); noStroke();
  fill('#173a63'); textAlign(LEFT, TOP); textSize(12.5); textStyle(BOLD);
  text(quizMode ? 'Classify this print →' : 'Pattern types', x + 12, y + 10);
  textStyle(NORMAL);

  menuRects = [];
  const ih = 40, top = y + 36;
  for (let i = 0; i < PATTERNS.length; i++) {
    const iy = top + i * ih;
    const sel = i === selected && !quizMode;
    const fam = PATTERNS[i].family;
    stroke('#e1e7f0'); strokeWeight(1);
    fill(sel ? '#eaf2ff' : '#ffffff');
    rect(x + 8, iy, w - 16, ih - 6, 6); noStroke();
    // family color dot
    fill(FREQ[fam].color); circle(x + 20, iy + (ih - 6) / 2, 9);
    fill(sel ? '#0b3d91' : '#33404f'); textAlign(LEFT, CENTER);
    textSize(11); textStyle(sel ? BOLD : NORMAL);
    text(quizMode ? '? ? ?' : PATTERNS[i].name, x + 32, iy + (ih - 6) / 2, w - 44);
    textStyle(NORMAL);
    if (!quizMode) menuRects.push({ i, x: x + 8, y: iy, w: w - 16, h: ih - 6 });
  }
}

function drawMain(x, y, w, h) {
  noStroke(); fill('#ffffff'); stroke('#d6deea'); strokeWeight(1);
  rect(x, y, w, h, 8); noStroke();

  const p = PATTERNS[selected];
  // header: name + frequency badge
  fill('#173a63'); textAlign(LEFT, TOP); textSize(15); textStyle(BOLD);
  text(quizMode && !quizChecked ? 'Unknown print' : p.name, x + 14, y + 10);
  textStyle(NORMAL);
  const badge = FREQ[p.family];
  if (!(quizMode && !quizChecked)) {
    const bw = 130, bx = x + w - bw - 14, byy = y + 10;
    fill(badge.color); rect(bx, byy, bw, 20, 10);
    fill('#fff'); textAlign(CENTER, CENTER); textSize(10.5); textStyle(BOLD);
    text(p.family + ' · ' + badge.label.split('· ')[1], bx + bw / 2, byy + 10);
    textStyle(NORMAL);
  }

  // annotation chips (study + revealed quiz)
  chipRects = [];
  if (showAnno) {
    const labels = ['Core', 'Delta', 'Ridge Flow'];
    const cols = [CORE_C, DELTA_C, FLOW_C];
    let cxp = x + 14, cyp = y + 36;
    textSize(11);
    for (let i = 0; i < labels.length; i++) {
      const cw = textWidth(labels[i]) + 30;
      stroke('#cdd6e2'); strokeWeight(1); fill('#f7faff');
      rect(cxp, cyp, cw, 22, 11); noStroke();
      fill(cols[i]); circle(cxp + 12, cyp + 11, 11);
      fill('#33404f'); textAlign(LEFT, CENTER); text(labels[i], cxp + 22, cyp + 11);
      chipRects.push({ label: labels[i], x: cxp, y: cyp, w: cw, h: 22 });
      cxp += cw + 8;
    }
  }

  // diagram box
  const dy = y + (showAnno ? 66 : 40);
  const bx = x + 18, by = dy, bw = w - 36, bh = h - (showAnno ? 66 : 40) - 96;
  noStroke(); fill('#ffffff'); stroke('#e6ebf2'); strokeWeight(1);
  rect(bx, by, bw, bh, 6); noStroke();
  drawPattern(selected, bx + 12, by + 12, bw - 24, bh - 24);
  if (showAnno) drawAnnotations();

  // features / feedback panel at the bottom of main
  const fy = by + bh + 10;
  drawFeatures(x + 14, fy, w - 28, y + h - fy - 12);

  // popup overlay (definition)
  if (popup) drawPopup(x, y, w, h);
}

function drawFeatures(x, y, w, h) {
  noStroke(); fill('#f7faff'); stroke('#dde5f0'); strokeWeight(1);
  rect(x, y, w, h, 6); noStroke();
  let yy = y + 8;
  if (quizMode && quizChecked) {
    fill(quizCorrect ? DELTA_C : '#c0392b'); textAlign(LEFT, TOP);
    textSize(12.5); textStyle(BOLD);
    text(quizCorrect ? '✓ Correct — ' + PATTERNS[quizTarget].name
                     : '✗ This is a ' + PATTERNS[quizTarget].name, x + 12, yy);
    textStyle(NORMAL); yy += 18;
    fill('#33404f'); textSize(11.5);
    text('Key feature: ' + PATTERNS[quizTarget].features[0] + '. ' +
         PATTERNS[quizTarget].features[1] + '.', x + 12, yy, w - 24);
  } else if (quizMode && !quizChecked) {
    fill('#5b6472'); textAlign(LEFT, TOP); textSize(12);
    text('Study the ridge diagram, pick a classification from the dropdown, then press Check Answer.',
      x + 12, yy, w - 24);
  } else {
    fill('#173a63'); textAlign(LEFT, TOP); textSize(12.5); textStyle(BOLD);
    text('Defining features', x + 12, yy); textStyle(NORMAL); yy += 18;
    fill('#33404f'); textSize(11.5);
    for (const f of PATTERNS[selected].features) {
      text('•  ' + f, x + 12, yy, w - 24); yy += 16;
    }
  }
}

function drawPopup(x, y, w, h) {
  noStroke(); fill(0, 0, 0, 40); rect(x, y, w, h, 8);
  const pw = w * 0.7, ph = 92, px = x + (w - pw) / 2, py = y + h / 2 - ph / 2;
  fill('#ffffff'); stroke('#1769c9'); strokeWeight(1.5); rect(px, py, pw, ph, 8);
  noStroke(); fill('#33404f'); textAlign(LEFT, TOP); textSize(12.5);
  text(DEFS[popup], px + 14, py + 14, pw - 28, ph - 28);
  fill('#8a93a3'); textAlign(RIGHT, BOTTOM); textSize(10);
  text('(click anywhere to close)', px + pw - 12, py + ph - 8);
}

// ---- ridge renderers ----
function drawPattern(idx, bx, by, bw, bh) {
  annot = { cores: [], deltas: [], flows: [] };
  const p = PATTERNS[idx];
  stroke(RIDGE); strokeWeight(1.8); noFill();
  const cx = bx + bw / 2, cy = by + bh / 2;
  if (p.render === 'arch') drawArch(bx, by, bw, bh, p.tented);
  else if (p.render === 'loop') drawLoop(bx, by, bw, bh, p.dir);
  else if (p.render === 'whorl') drawWhorl(cx, cy, bw, bh);
  else if (p.render === 'central') drawCentral(cx, cy, bw, bh);
  else if (p.render === 'double') drawDouble(cx, cy, bw, bh);
  else if (p.render === 'accidental') drawAccidental(cx, cy, bw, bh);
}

function drawArch(bx, by, bw, bh, tented) {
  const cx = bx + bw / 2;
  const left = bx + bw * 0.06, right = bx + bw * 0.94;
  const baseY = by + bh * 0.94, topY = by + bh * (tented ? 0.42 : 0.34);
  const N = 12, sx = tented ? bw * 0.07 : bw * 0.20;
  for (let k = 0; k < N; k++) {
    const f = k / (N - 1);
    const yb = lerp(baseY, topY, f);
    const amp = (tented ? bh * 0.40 : bh * 0.26) * (0.30 + 0.70 * f);
    beginShape();
    for (let x = left; x <= right; x += 6) {
      const d = (x - cx) / sx;
      const hump = tented ? Math.exp(-Math.abs(d) * 1.1) : Math.exp(-d * d);
      vertex(x, yb - amp * hump);
    }
    endShape();
  }
  // flow arrow
  annot.flows.push({ x1: left + 14, y1: by + bh * 0.5, x2: right - 14, y2: by + bh * 0.5, curve: 0 });
  if (tented) {
    annot.deltas.push({ x: cx, y: baseY - bh * 0.12 });
    annot.flows.push({ x1: cx, y1: baseY - 6, x2: cx, y2: topY + amax(bh), curve: 0 });
  }
}
function amax(bh) { return bh * 0.2; }

function drawLoop(bx, by, bw, bh, dir) {
  const cx = bx + bw / 2, cy = by + bh / 2;
  push();
  translate(cx, cy); scale(dir, 1); translate(-cx, -cy);
  const N = 9;
  for (let k = 0; k < N; k++) {
    const rw = bw * (0.10 + k * 0.045);
    const rh = bh * (0.12 + k * 0.05);
    // open-right recurve: draw left-opening arc (gap faces right)
    arc(cx - bw * 0.04, cy, rw * 2, rh * 2, radians(48), radians(312));
    // tails flowing to the right/down
    const ex = cx - bw * 0.04 + rw * cos(radians(48));
    const eyT = cy + rh * sin(radians(48));
    const eyB = cy + rh * sin(radians(-48));
    line(ex, eyT, bx + bw, eyT + rh * 0.25);
    line(ex, eyB, bx + bw, eyB - rh * 0.25);
  }
  pop();
  const ccx = cx - dir * bw * 0.06;
  annot.cores.push({ x: ccx, y: cy - bh * 0.02 });
  annot.deltas.push({ x: cx + dir * bw * 0.30, y: cy + bh * 0.30 });
  annot.flows.push({ x1: cx + dir * bw * 0.30, y1: cy + bh * 0.18,
                     x2: cx - dir * bw * 0.10, y2: cy - bh * 0.10, curve: dir });
}

function drawWhorl(cx, cy, bw, bh) {
  const N = 9;
  for (let k = 1; k <= N; k++) {
    ellipse(cx, cy, bw * 0.10 * k, bh * 0.11 * k);
  }
  annot.cores.push({ x: cx, y: cy });
  annot.deltas.push({ x: cx - bw * 0.34, y: cy + bh * 0.30 });
  annot.deltas.push({ x: cx + bw * 0.34, y: cy + bh * 0.30 });
  annot.flows.push({ x1: cx + bw * 0.16, y1: cy - bh * 0.16, x2: cx + bw * 0.02, y2: cy - bh * 0.02, curve: 1 });
}

function drawCentral(cx, cy, bw, bh) {
  // loop-like outer ridges with a small whorl pocket at the core
  push(); translate(cx, cy); scale(1, 1); translate(-cx, -cy);
  for (let k = 3; k < 9; k++) {
    const rw = bw * (0.06 + k * 0.045), rh = bh * (0.07 + k * 0.05);
    arc(cx, cy + bh * 0.05, rw * 2, rh * 2, radians(40), radians(320));
  }
  pop();
  for (let k = 1; k <= 3; k++) ellipse(cx, cy - bh * 0.04, bw * 0.05 * k, bh * 0.05 * k);
  annot.cores.push({ x: cx, y: cy - bh * 0.04 });
  annot.deltas.push({ x: cx - bw * 0.32, y: cy + bh * 0.30 });
  annot.deltas.push({ x: cx + bw * 0.32, y: cy + bh * 0.30 });
  annot.flows.push({ x1: cx + bw * 0.14, y1: cy - bh * 0.10, x2: cx, y2: cy - bh * 0.02, curve: 1 });
}

function drawDouble(cx, cy, bw, bh) {
  const c1y = cy - bh * 0.14, c2y = cy + bh * 0.14;
  for (let k = 1; k <= 6; k++) {
    push(); translate(cx, c1y);
    arc(0, 0, bw * 0.10 * k, bh * 0.07 * k, radians(20), radians(250)); pop();
    push(); translate(cx, c2y);
    arc(0, 0, bw * 0.10 * k, bh * 0.07 * k, radians(200), radians(70)); pop();
  }
  annot.cores.push({ x: cx, y: c1y });
  annot.cores.push({ x: cx, y: c2y });
  annot.deltas.push({ x: cx - bw * 0.32, y: cy + bh * 0.04 });
  annot.deltas.push({ x: cx + bw * 0.32, y: cy - bh * 0.04 });
  annot.flows.push({ x1: cx - bw * 0.18, y1: c1y, x2: cx + bw * 0.18, y2: c2y, curve: 0 });
}

function drawAccidental(cx, cy, bw, bh) {
  push(); translate(cx, cy); rotate(radians(-12)); translate(-cx, -cy);
  for (let k = 1; k <= 7; k++) ellipse(cx - bw * 0.05, cy, bw * 0.09 * k, bh * 0.10 * k);
  pop();
  // an arch-like sweep across the top to suggest a second pattern type
  beginShape();
  for (let x = cx - bw * 0.45; x <= cx + bw * 0.45; x += 6) {
    const d = (x - cx) / (bw * 0.25);
    vertex(x, cy - bh * 0.30 - bh * 0.18 * Math.exp(-d * d));
  }
  endShape();
  annot.cores.push({ x: cx - bw * 0.05, y: cy });
  annot.deltas.push({ x: cx - bw * 0.34, y: cy + bh * 0.28 });
  annot.deltas.push({ x: cx + bw * 0.34, y: cy + bh * 0.22 });
  annot.flows.push({ x1: cx - bw * 0.30, y1: cy - bh * 0.30, x2: cx + bw * 0.30, y2: cy - bh * 0.28, curve: 0 });
}

function drawAnnotations() {
  // ridge flow arrows (blue)
  for (const f of annot.flows) {
    stroke(FLOW_C); strokeWeight(2.4); noFill();
    if (f.curve) {
      const mx = (f.x1 + f.x2) / 2, my = (f.y1 + f.y2) / 2 - 26 * f.curve;
      beginShape(); vertex(f.x1, f.y1); quadraticVertex(mx, my, f.x2, f.y2); endShape();
    } else {
      line(f.x1, f.y1, f.x2, f.y2);
    }
    arrowHead(f.x2, f.y2, atan2(f.y2 - f.y1, f.x2 - f.x1));
  }
  // deltas (green triangles)
  for (const d of annot.deltas) {
    noStroke(); fill(DELTA_C);
    triangle(d.x, d.y - 7, d.x - 7, d.y + 6, d.x + 7, d.y + 6);
    stroke('#fff'); strokeWeight(1); noFill();
    triangle(d.x, d.y - 7, d.x - 7, d.y + 6, d.x + 7, d.y + 6);
  }
  // cores (yellow dots)
  for (const c of annot.cores) {
    noStroke(); fill(CORE_C); circle(c.x, c.y, 13);
    fill('#fff'); circle(c.x, c.y, 5);
  }
}
function arrowHead(x, y, a) {
  push(); translate(x, y); rotate(a); noStroke(); fill(FLOW_C);
  triangle(0, 0, -8, -4, -8, 4); pop();
}

function mousePressed() {
  if (popup) { popup = ''; return; }
  // annotation chips
  for (const c of chipRects) {
    if (mouseX >= c.x && mouseX <= c.x + c.w && mouseY >= c.y && mouseY <= c.y + c.h) {
      popup = c.label; return;
    }
  }
  // menu (study mode only)
  if (!quizMode) {
    for (const m of menuRects) {
      if (mouseX >= m.x && mouseX <= m.x + m.w && mouseY >= m.y && mouseY <= m.y + m.h) {
        selected = m.i; return;
      }
    }
  }
}
