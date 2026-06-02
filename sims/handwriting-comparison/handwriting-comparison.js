// Handwriting Characteristics Comparison — Remember (L1)
// CANVAS_HEIGHT: 500
// Identify the key handwriting characteristics used to compare a questioned
// sample with a known exemplar. Click a characteristic to highlight it on both
// samples; toggle Authentic/Forged to see how a forgery differs; the slider
// magnifies the samples.

let canvasWidth = 900;
const drawHeight = 450;
const controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
const margin = 15;
const defaultTextSize = 16;

const PAPER = '#fdf6e3';
const INK = '#22303a';
const HILITE = '#1769c9';
const OK = '#2e9e57';
const BAD = '#c0392b';

let toggleButton, magSlider;
let forged = false;
let selected = 'slant';
let chipRects = [];

const KNOWN  = { slant: 12, tremor: 0, baselineWave: 0, loops: 8, loopHeight: 1, penLifts: [], seed: 7 };
const Q_AUTH = { slant: 11, tremor: 0, baselineWave: 0, loops: 8, loopHeight: 1, penLifts: [], seed: 7 };
const Q_FORG = { slant: 4,  tremor: 3, baselineWave: 5, loops: 8, loopHeight: 1, penLifts: [0.34, 0.68], seed: 19 };

const CHARS = [
  { key: 'line',     label: 'Line Quality',
    desc: 'Smooth, confident strokes vs. shaky tremor. Forgeries often waver because the writer copies slowly and carefully.',
    forgedMatch: false },
  { key: 'slant',    label: 'Slant',
    desc: 'The consistent angle of the writing relative to the baseline, measured in degrees.',
    forgedMatch: false },
  { key: 'spacing',  label: 'Spacing',
    desc: 'The gaps between letters and words. A deeply habitual feature that is hard to consciously change.',
    forgedMatch: true },
  { key: 'form',     label: 'Letter Formation',
    desc: 'The shape of the loops, curves, and connecting strokes that build each letter.',
    forgedMatch: false },
  { key: 'lifts',    label: 'Pen Lifts',
    desc: 'Points where the pen leaves the paper. Forgeries add unnatural lifts and hesitation marks mid-stroke.',
    forgedMatch: false },
  { key: 'baseline', label: 'Baseline',
    desc: 'The invisible line the writing rests on. Genuine writing holds a steady baseline; forgeries drift.',
    forgedMatch: false }
];

function setup() {
  updateCanvasSize();
  const cnv = createCanvas(canvasWidth, canvasHeight);
  cnv.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  toggleButton = createButton('Show Forged Sample');
  toggleButton.mousePressed(() => {
    forged = !forged;
    toggleButton.html(forged ? 'Show Authentic Sample' : 'Show Forged Sample');
  });
  magSlider = createSlider(1, 2.5, 1, 0.1);
  positionControls();
}
function positionControls() {
  const r = drawHeight + 12;
  toggleButton.position(margin, r);
  magSlider.position(margin + 220, r + 4);
  magSlider.style('width', '140px');
}
function updateCanvasSize() {
  const c = document.querySelector('main');
  if (c) canvasWidth = Math.max(800, Math.floor(c.getBoundingClientRect().width));
}
function windowResized() {
  updateCanvasSize(); resizeCanvas(canvasWidth, canvasHeight); positionControls();
}

function curQ() { return forged ? Q_FORG : Q_AUTH; }
function curChar() { return CHARS.find(c => c.key === selected); }
function charMatches(c) { return forged ? c.forgedMatch : true; }

function draw() {
  background('#eef2f7');
  noStroke();
  fill('#f4f4f4'); rect(0, drawHeight, canvasWidth, controlHeight);
  // control strip label
  fill('#33404f'); textAlign(LEFT, CENTER); textSize(12);
  text('Magnification', margin + 370, drawHeight + 24);

  fill('#173a63'); textAlign(CENTER, TOP); textSize(20); textStyle(BOLD);
  text('Handwriting Characteristics Comparison', canvasWidth / 2, 8); textStyle(NORMAL);

  const w = canvasWidth - 2 * margin;
  const halfW = (w - 12) / 2;
  drawSamplePanel(margin, 40, halfW, 150, KNOWN, 'Known Exemplar', false);
  drawSamplePanel(margin + halfW + 12, 40, halfW, 150, curQ(),
    'Questioned Sample' + (forged ? '  (forged)' : ''), true);

  drawChips(margin, 200, w, 34);
  drawInfo(margin, 244, w, drawHeight - 244 - 10);
}

function drawSamplePanel(x, y, w, h, p, label, isQ) {
  noStroke(); fill('#ffffff'); stroke('#d6deea'); strokeWeight(1);
  rect(x, y, w, h, 8); noStroke();
  fill('#173a63'); textAlign(LEFT, TOP); textSize(11.5); textStyle(BOLD);
  text(label, x + 10, y + 7); textStyle(NORMAL);

  const px = x + 8, py = y + 26, pw = w - 16, ph = h - 34;
  // clipped paper region (for magnification)
  drawingContext.save();
  drawingContext.beginPath();
  drawingContext.rect(px, py, pw, ph);
  drawingContext.clip();

  noStroke(); fill(PAPER); rect(px, py, pw, ph, 4);
  // faint ruled lines
  stroke('#e7dcc0'); strokeWeight(1);
  for (let ly = py + ph * 0.5; ly < py + ph; ly += 22) line(px + 6, ly, px + pw - 6, ly);

  const mag = magSlider ? magSlider.value() : 1;
  push();
  const cx = px + pw / 2, cy = py + ph / 2;
  translate(cx, cy); scale(mag); translate(-cx, -cy);
  const g = genStrokes(p, px, py, pw, ph);
  drawHighlight(g, px, py, pw, ph, isQ);
  stroke(INK); strokeWeight(2.0); noFill();
  for (const s of g.strokes) {
    beginShape();
    for (const pt of s) vertex(pt.x, pt.y);
    endShape();
  }
  // hesitation dots at pen lifts
  noStroke(); fill(INK);
  for (const gx of p.penLifts) {
    const dx = lerp(g.x0, g.x1, gx);
    circle(dx, g.mid + 1, 3.2);
  }
  pop();
  drawingContext.restore();
}

function genStrokes(p, x, y, w, h) {
  const padX = w * 0.08;
  const x0 = x + padX, x1 = x + w - padX;
  const mid = y + h * 0.55;
  const amp = h * 0.18 * p.loopHeight;
  const N = 220;
  const slantR = radians(p.slant);
  noiseSeed(p.seed);
  const strokes = [];
  let cur = [];
  for (let i = 0; i <= N; i++) {
    const t = i / N;
    const bx = lerp(x0, x1, t);
    let vy = mid - amp * sin(t * TWO_PI * p.loops);
    vy -= amp * 0.45 * max(0, sin(t * TWO_PI * (p.loops / 3)));
    vy += p.baselineWave * sin(t * TWO_PI * 2.0);
    if (p.tremor > 0) vy += (noise(t * 38) - 0.5) * p.tremor * 2.2;
    const sx = bx + (mid - vy) * Math.tan(slantR);
    let lift = false;
    for (const gpos of p.penLifts) if (Math.abs(t - gpos) < 0.018) lift = true;
    if (lift) { if (cur.length > 1) strokes.push(cur); cur = []; }
    else cur.push({ x: sx, y: vy });
  }
  if (cur.length > 1) strokes.push(cur);
  return { strokes, mid, x0, x1, amp };
}

function drawHighlight(g, px, py, pw, ph, isQ) {
  const c = curChar();
  const match = !isQ ? true : charMatches(c);
  const col = isQ ? (match ? OK : BAD) : HILITE;
  noStroke(); fill(red(color(col)), green(color(col)), blue(color(col)), 28);
  if (c.key === 'baseline') {
    rect(px, g.mid - 4, pw, 10);
    stroke(col); strokeWeight(1.5);
    line(px + 4, g.mid, px + pw - 4, g.mid);
  } else if (c.key === 'slant') {
    rect(px, py, pw, ph);
    // slant reference line through middle
    const p = isQ ? curQ() : KNOWN;
    const ang = radians(p.slant);
    const lx = px + pw * 0.5, ly = g.mid;
    stroke(col); strokeWeight(1.6);
    line(lx - 24 * Math.tan(ang), ly + 24, lx + 24 * Math.tan(ang), ly - 24);
    line(lx - 30, ly, lx + 30, ly);
  } else if (c.key === 'lifts') {
    rect(px, py, pw, ph);
  } else {
    rect(px, py, pw, ph);
  }
}

function drawChips(x, y, w, h) {
  chipRects = [];
  const n = CHARS.length;
  const gap = 6;
  const cw = (w - gap * (n - 1)) / n;
  for (let i = 0; i < n; i++) {
    const c = CHARS[i];
    const cx = x + i * (cw + gap);
    const sel = c.key === selected;
    chipRects.push({ key: c.key, x: cx, y, w: cw, h });
    stroke(sel ? '#0b3d91' : '#c3cedd'); strokeWeight(sel ? 2 : 1);
    fill(sel ? '#dce9ff' : '#ffffff');
    rect(cx, y, cw, h, 6);
    noStroke(); fill(sel ? '#0b3d91' : '#33404f');
    textAlign(CENTER, CENTER); textSize(11.5); textStyle(sel ? BOLD : NORMAL);
    text(c.label, cx + cw / 2, y + h / 2); textStyle(NORMAL);
  }
}

function drawInfo(x, y, w, h) {
  noStroke(); fill('#ffffff'); stroke('#d6deea'); strokeWeight(1);
  rect(x, y, w, h, 8); noStroke();
  const c = curChar();
  const match = charMatches(c);

  fill('#173a63'); textAlign(LEFT, TOP); textSize(13); textStyle(BOLD);
  text(c.label, x + 14, y + 10); textStyle(NORMAL);

  // match/differ badge for the selected characteristic
  const badge = match ? 'MATCH' : 'DIFFERS';
  const bcol = match ? OK : BAD;
  textSize(11); textStyle(BOLD); const bw = textWidth(badge) + 16;
  stroke(bcol); strokeWeight(1.2); fill(match ? '#e6f4ec' : '#fdeaea');
  rect(x + 14 + textWidth(c.label) + 12, y + 9, bw, 18, 5); noStroke();
  fill(bcol); textAlign(LEFT, CENTER); text(badge, x + 14 + textWidth(c.label) + 20, y + 18);
  textStyle(NORMAL);

  fill('#33404f'); textAlign(LEFT, TOP); textSize(11.5);
  text(c.desc, x + 14, y + 34, w * 0.62 - 14);

  // slant measurement readout
  if (c.key === 'slant') {
    fill('#173a63'); textSize(11.5); textStyle(BOLD);
    text('Measured slant', x + 14, y + 86); textStyle(NORMAL);
    fill('#33404f'); textSize(11.5);
    text('Known: ' + KNOWN.slant + '°    Questioned: ' + curQ().slant + '°',
      x + 14, y + 104);
  }

  // summary panel (right side)
  const sx = x + w * 0.64;
  stroke('#e3e8f0'); line(sx, y + 12, sx, y + h - 12); noStroke();
  let matchN = 0, diffN = 0;
  for (const cc of CHARS) (charMatches(cc) ? matchN++ : diffN++);
  fill('#173a63'); textAlign(LEFT, TOP); textSize(12); textStyle(BOLD);
  text('Comparison summary', sx + 16, y + 12); textStyle(NORMAL);
  textSize(12);
  fill(OK); text('Matching characteristics:  ' + matchN, sx + 16, y + 38);
  fill(BAD); text('Differing characteristics:  ' + diffN, sx + 16, y + 58);
  fill('#5b6472'); textSize(11);
  text(forged
    ? 'The questioned sample is a forgery: most habitual characteristics differ from the exemplar.'
    : 'The questioned sample is authentic: every characteristic matches the known exemplar.',
    sx + 16, y + 84, w * 0.34 - 30);
}

function mousePressed() {
  for (const r of chipRects) {
    if (mouseX >= r.x && mouseX <= r.x + r.w && mouseY >= r.y && mouseY <= r.y + r.h) {
      selected = r.key; return;
    }
  }
}
