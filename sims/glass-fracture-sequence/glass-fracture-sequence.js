// Glass Fracture Sequence Analyzer — Apply (L3)
// CANVAS_HEIGHT: 500
// Apply the fracture-sequencing rule (a radial crack stops when it meets an
// existing crack) to decide which of two impacts on a glass pane happened
// first. Click the impact you think cracked first; the answer reveals the
// termination points (red T) that prove the sequence.

let canvasWidth = 900;
const drawHeight = 450;
const controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
const margin = 15;
const defaultTextSize = 16;

const GLASS = '#dde6ee';
const RADIAL = '#3d4148';
const CONCEN = '#9aa0a8';
const TERM = '#d32f2f';
const OK = '#2e9e57';
const BAD = '#c0392b';

let newButton, revealButton;
let impacts = [];     // [{x,y,angles[],rings[]}]
let olderIdx = 0;     // which impact cracked first
let terms = [];       // termination points {x,y}
let guess = -1;       // student's pick for "first"
let revealed = false;
let glass = {};

function setup() {
  updateCanvasSize();
  const cnv = createCanvas(canvasWidth, canvasHeight);
  cnv.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  newButton = createButton('New Pattern');
  newButton.mousePressed(newPattern);
  revealButton = createButton('Reveal Answer');
  revealButton.mousePressed(() => { revealed = true; });

  positionControls();
  newPattern();
}
function positionControls() {
  const r = drawHeight + 12;
  newButton.position(margin, r);
  revealButton.position(margin + 130, r);
}
function updateCanvasSize() {
  const c = document.querySelector('main');
  if (c) canvasWidth = Math.max(800, Math.floor(c.getBoundingClientRect().width));
}
function windowResized() {
  updateCanvasSize(); resizeCanvas(canvasWidth, canvasHeight); positionControls();
  layoutGlass();
}
function layoutGlass() {
  glass = { x: margin, y: 50, w: canvasWidth * 0.64 - margin, h: drawHeight - 64 };
}

function newPattern() {
  layoutGlass();
  guess = -1; revealed = false;
  const g = glass;
  const pad = 70;
  const a = { x: g.x + pad + random(g.w * 0.10), y: g.y + pad + random(g.h - 2 * pad) };
  const b = { x: g.x + g.w * 0.55 + random(g.w * 0.25), y: g.y + pad + random(g.h - 2 * pad) };
  for (const p of [a, b]) {
    p.angles = [];
    const n = 11;
    for (let i = 0; i < n; i++) p.angles.push((TWO_PI / n) * i + random(-0.12, 0.12));
    p.rings = [g.h * 0.07, g.h * 0.13, g.h * 0.20];
  }
  impacts = [a, b];
  olderIdx = floor(random(2));
  computeTerms();
}

function computeTerms() {
  terms = [];
  const younger = impacts[1 - olderIdx];
  const older = impacts[olderIdx];
  const toward = atan2(older.y - younger.y, older.x - younger.x);
  const d = dist(younger.x, younger.y, older.x, older.y);
  for (const a of younger.angles) {
    const align = cos(a - toward);
    if (align > 0.35) {
      const len = d * 0.46;
      terms.push({ x: younger.x + cos(a) * len, y: younger.y + sin(a) * len });
    }
  }
}

function draw() {
  background('#eef2f7');
  noStroke();
  fill('#f4f4f4'); rect(0, drawHeight, canvasWidth, controlHeight);

  fill('#173a63'); textAlign(CENTER, TOP); textSize(20); textStyle(BOLD);
  text('Glass Fracture Sequence Analyzer', canvasWidth * 0.32, 8); textStyle(NORMAL);

  drawGlass();
  drawPanel(canvasWidth * 0.66, 44, canvasWidth - margin - canvasWidth * 0.66, drawHeight - 56);
}

function drawGlass() {
  const g = glass;
  noStroke(); fill(GLASS); stroke('#aeb8c4'); strokeWeight(2);
  rect(g.x, g.y, g.w, g.h, 4);

  // concentric rings (medium gray)
  for (let k = 0; k < impacts.length; k++) {
    const p = impacts[k];
    stroke(CONCEN); strokeWeight(1.4); noFill();
    for (const r of p.rings) ellipse(p.x, p.y, r * 2, r * 2);
  }
  // radial fractures
  for (let k = 0; k < impacts.length; k++) {
    const p = impacts[k];
    const isOlder = k === olderIdx;
    const younger = impacts[1 - olderIdx];
    const older = impacts[olderIdx];
    stroke(RADIAL); strokeWeight(1.6);
    for (const a of p.angles) {
      if (!isOlder) {
        const toward = atan2(older.y - p.y, older.x - p.x);
        const d = dist(p.x, p.y, older.x, older.y);
        if (cos(a - toward) > 0.35) {
          const len = d * 0.46;
          line(p.x, p.y, p.x + cos(a) * len, p.y + sin(a) * len);
          continue;
        }
      }
      const e = rayRect(p.x, p.y, a, g.x, g.y, g.w, g.h);
      line(p.x, p.y, e.x, e.y);
    }
  }
  // termination marks (red T) only when revealed
  if (revealed) {
    for (const t of terms) {
      stroke(TERM); strokeWeight(2);
      line(t.x - 5, t.y - 5, t.x + 5, t.y + 5);
      line(t.x - 5, t.y + 5, t.x + 5, t.y - 5);
    }
  }
  // impact points
  for (let k = 0; k < impacts.length; k++) {
    const p = impacts[k];
    const isFirst = k === olderIdx;
    if (revealed && guess === k) {
      noFill(); stroke(guess === olderIdx ? OK : BAD); strokeWeight(3); circle(p.x, p.y, 34);
    }
    noStroke(); fill('#222'); circle(p.x, p.y, 12);
    fill('#fff'); circle(p.x, p.y, 5);
    if (revealed) {
      fill(isFirst ? OK : '#173a63'); textAlign(CENTER, CENTER); textSize(15); textStyle(BOLD);
      text(isFirst ? '1' : '2', p.x, p.y - 22); textStyle(NORMAL);
    }
  }
}

function rayRect(cx, cy, a, rx, ry, rw, rh) {
  const dx = cos(a), dy = sin(a); let t = Infinity;
  if (dx > 1e-6) t = min(t, (rx + rw - cx) / dx);
  if (dx < -1e-6) t = min(t, (rx - cx) / dx);
  if (dy > 1e-6) t = min(t, (ry + rh - cy) / dy);
  if (dy < -1e-6) t = min(t, (ry - cy) / dy);
  return { x: cx + dx * t, y: cy + dy * t };
}

function drawPanel(x, y, w, h) {
  noStroke(); fill('#ffffff'); stroke('#d6deea'); strokeWeight(1);
  rect(x, y, w, h, 8); noStroke();
  let yy = y + 12;
  fill('#173a63'); textAlign(LEFT, TOP); textSize(14); textStyle(BOLD);
  text('Which impact came first?', x + 12, yy); textStyle(NORMAL); yy += 24;

  fill('#33404f'); textSize(11.5);
  text('Click the impact point on the glass that you think cracked FIRST.',
    x + 12, yy, w - 24); yy += 38;

  // rule box
  stroke('#e3e8f0'); line(x + 10, yy, x + w - 10, yy); noStroke(); yy += 10;
  fill('#173a63'); textSize(12); textStyle(BOLD);
  text('Sequencing rule', x + 12, yy); textStyle(NORMAL); yy += 18;
  fill('#33404f'); textSize(11.5);
  text('A radial crack STOPS when it reaches a pre-existing crack. So the impact whose ' +
       'radial lines are interrupted (red ✕) cracked LATER. The 3R Rule helps confirm direction.',
    x + 12, yy, w - 24); yy += 72;

  // feedback
  stroke('#e3e8f0'); line(x + 10, yy, x + w - 10, yy); noStroke(); yy += 12;
  if (!revealed && guess === -1) {
    fill('#8a93a3'); textSize(11.5);
    text('Awaiting your selection…', x + 12, yy);
  } else if (revealed) {
    const correct = guess === olderIdx;
    if (guess === -1) {
      fill('#173a63'); textSize(12.5); textStyle(BOLD);
      text('Answer revealed', x + 12, yy); textStyle(NORMAL);
    } else {
      fill(correct ? OK : BAD); textSize(13); textStyle(BOLD);
      text(correct ? '✓ Correct!' : '✗ Not quite.', x + 12, yy); textStyle(NORMAL);
    }
    yy += 20;
    fill('#33404f'); textSize(11.5);
    text('Impact #1 (green) cracked first — its radial cracks run uninterrupted. ' +
         'Impact #2 came later: ' + terms.length + ' of its radials terminate (red ✕) ' +
         'where they met cracks from #1.', x + 12, yy, w - 24);
  }
}

function mousePressed() {
  if (revealed) return;
  for (let k = 0; k < impacts.length; k++) {
    if (dist(mouseX, mouseY, impacts[k].x, impacts[k].y) < 18) {
      guess = k; revealed = true; return;
    }
  }
}
