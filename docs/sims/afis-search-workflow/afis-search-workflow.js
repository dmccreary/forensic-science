// AFIS Search Workflow — Understand (L2)
// CANVAS_HEIGHT: 505
// Step through the five AFIS stations from latent scan to examiner review.
// Click a station (or use Prev/Next) to reveal its description and a
// stage-specific visualization with concrete data.

let canvasWidth = 820;
const drawHeight = 460;
const controlHeight = 45;
let canvasHeight = drawHeight + controlHeight;
const margin = 15;
const defaultTextSize = 16;

const TECH = '#1f6fb2', TECHFILL = '#e8f1fb';
const HUMAN = '#2e8b57', HUMANFILL = '#e7f5ec';

const STATIONS = [
  { label: 'Scan', title: '1 — Latent Print Scanned', human: false,
    desc: 'A latent print lifted from the scene is digitized at high resolution. The grayscale ridge image is the raw input to AFIS — nothing has been measured yet.' },
  { label: 'Extract', title: '2 — Minutiae Extraction', human: false,
    desc: 'Software finds minutiae — ridge endings (red) and bifurcations (blue) — and encodes each as an (x, y, angle) value. This numeric template, not the picture, is what AFIS actually searches.' },
  { label: 'Search', title: '3 — Database Search', human: false,
    desc: 'The template is compared against millions of stored templates with fast matching algorithms. AFIS scores how well each stored print aligns with the query print.' },
  { label: 'Candidates', title: '4 — Candidate List Generated', human: false,
    desc: 'AFIS returns a ranked candidate list with similarity scores. A high score is a strong lead for a human to check — it is not, by itself, an identification.' },
  { label: 'Examiner', title: '5 — Human Examiner Review', human: true,
    desc: 'A trained examiner visually compares the latent against the top candidates and makes the final identification or exclusion. AFIS never decides on its own.' },
];

// minutiae positions as fractions of the print box
const MINUTIAE = [
  { fx: 0.46, fy: 0.30, type: 'end', ang: 35 },
  { fx: 0.62, fy: 0.40, type: 'bif', ang: 120 },
  { fx: 0.38, fy: 0.52, type: 'end', ang: 205 },
  { fx: 0.57, fy: 0.60, type: 'bif', ang: 80 },
  { fx: 0.49, fy: 0.46, type: 'bif', ang: 160 },
  { fx: 0.66, fy: 0.70, type: 'end', ang: 300 },
  { fx: 0.41, fy: 0.72, type: 'end', ang: 250 },
];
const CANDIDATES = [92, 78, 61];

let stage = 0;
let stageEnterFrame = 0;
let prevButton, nextButton, replayButton;
let stationBoxes = [];

function updateCanvasSize() {
  const c = document.querySelector('main');
  if (c) canvasWidth = Math.max(420, Math.floor(c.getBoundingClientRect().width));
}

function setup() {
  updateCanvasSize();
  const cnv = createCanvas(canvasWidth, canvasHeight);
  cnv.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  prevButton = createButton('◀ Prev');
  prevButton.mousePressed(() => gotoStage(stage - 1));
  nextButton = createButton('Next ▶');
  nextButton.mousePressed(() => gotoStage(stage + 1));
  replayButton = createButton('Replay animation');
  replayButton.mousePressed(() => { stageEnterFrame = frameCount; });
  positionControls();
}

function gotoStage(s) {
  stage = constrain(s, 0, STATIONS.length - 1);
  stageEnterFrame = frameCount;
}

function positionControls() {
  const y = drawHeight + 8;
  prevButton.position(margin, y);
  nextButton.position(margin + 75, y);
  replayButton.position(margin + 150, y);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  positionControls();
}

function draw() {
  noStroke();
  fill('#eef3fb'); rect(0, 0, canvasWidth, drawHeight);
  fill('#f4f4f4'); rect(0, drawHeight, canvasWidth, controlHeight);

  fill('#1a3a6c'); textAlign(CENTER, TOP); textSize(20); textStyle(BOLD);
  text('AFIS Search Workflow', canvasWidth / 2, 8);
  textStyle(NORMAL);

  drawStations();
  drawDescription();
  drawStageVisual();
}

function drawStations() {
  const top = 40, h = 50, gap = 10;
  const w = (canvasWidth - 2 * margin - 4 * gap) / 5;
  stationBoxes = [];
  for (let i = 0; i < 5; i++) {
    const x = margin + i * (w + gap);
    stationBoxes.push({ x, y: top, w, h, i });
    const s = STATIONS[i];
    const active = i === stage;
    const baseFill = s.human ? HUMANFILL : TECHFILL;
    const baseStroke = s.human ? HUMAN : TECH;
    stroke(baseStroke); strokeWeight(active ? 3 : 1);
    fill(active ? baseFill : '#ffffff'); rect(x, top, w, h, 7);
    // number circle
    noStroke(); fill(baseStroke); circle(x + 16, top + h / 2, 22);
    fill('#fff'); textAlign(CENTER, CENTER); textSize(12); textStyle(BOLD);
    text(i + 1, x + 16, top + h / 2);
    // label
    fill(baseStroke); textAlign(LEFT, CENTER); textSize(12);
    text(s.label, x + 30, top + h / 2);
    textStyle(NORMAL);
    if (i < 4) {
      const ax = x + w, ay = top + h / 2, bx = x + w + gap;
      stroke('#888'); strokeWeight(2); line(ax, ay, bx, ay);
      noStroke(); fill('#888'); triangle(bx, ay, bx - 5, ay - 4, bx - 5, ay + 4);
    }
  }
}

function drawDescription() {
  const x = margin, y = 100, w = canvasWidth - 2 * margin, h = 70;
  const s = STATIONS[stage];
  const col = s.human ? HUMAN : TECH;
  fill('#fff'); stroke('#ccc'); strokeWeight(1); rect(x, y, w, h, 7);
  noStroke(); fill(col); rect(x, y, 8, h, 7, 0, 0, 7);
  fill(col); textAlign(LEFT, TOP); textSize(15); textStyle(BOLD);
  text(s.title, x + 18, y + 8);
  textStyle(NORMAL); fill('#333'); textSize(12.5);
  text(s.desc, x + 18, y + 30, w - 30, 38);
}

function drawStageVisual() {
  const top = 182, h = drawHeight - top - 12, x = margin, w = canvasWidth - 2 * margin;
  const elapsed = frameCount - stageEnterFrame;
  if (stage === 0) visScan(x, top, w, h);
  else if (stage === 1) visExtract(x, top, w, h, elapsed);
  else if (stage === 2) visSearch(x, top, w, h, elapsed);
  else if (stage === 3) visCandidates(x, top, w, h);
  else visExaminer(x, top, w, h);
}

// stylized loop-pattern fingerprint
function drawPrint(cx, cy, rw, rh) {
  stroke('#6b5b49'); strokeWeight(1.3); noFill();
  for (let i = 1; i <= 9; i++) {
    const f = i / 9;
    ellipse(cx, cy + rh * 0.08 * (1 - f), rw * f, rh * f);
  }
}

function visScan(x, y, w, h) {
  const cx = x + w / 2, cy = y + h / 2;
  fill('#fff'); stroke('#ccc'); rect(x + w / 2 - 90, y, 180, h, 6);
  drawPrint(cx, cy, 130, 150);
  noStroke(); fill('#666'); textAlign(CENTER, TOP); textSize(12);
  text('Digitized grayscale ridge image (no measurements yet)', cx, y + h + 2);
}

function visExtract(x, y, w, h, elapsed) {
  const boxW = 230, cx = x + boxW / 2 + 10, cy = y + h / 2;
  fill('#fff'); stroke('#ccc'); rect(x + 10, y, boxW, h, 6);
  drawPrint(cx, cy, 130, 150);
  const shown = constrain(Math.floor(elapsed / 18), 0, MINUTIAE.length);
  for (let i = 0; i < shown; i++) {
    const m = MINUTIAE[i];
    const px = x + 10 + m.fx * boxW, py = y + m.fy * h;
    noStroke(); fill(m.type === 'end' ? '#d63031' : '#0984e3'); circle(px, py, 9);
    stroke(m.type === 'end' ? '#d63031' : '#0984e3'); strokeWeight(1.5);
    line(px, py, px + 11 * cos(radians(m.ang)), py + 11 * sin(radians(m.ang)));
  }
  // legend + coordinate list
  const lx = x + boxW + 40, ly = y + 4;
  noStroke(); fill('#d63031'); circle(lx + 5, ly + 6, 9);
  fill('#333'); textAlign(LEFT, CENTER); textSize(12); text('ridge ending', lx + 16, ly + 6);
  fill('#0984e3'); circle(lx + 130, ly + 6, 9);
  fill('#333'); text('bifurcation', lx + 141, ly + 6);
  fill('#1a3a6c'); textAlign(LEFT, TOP); textSize(12); textStyle(BOLD);
  text('Encoded template  (x, y, θ):', lx, ly + 22); textStyle(NORMAL);
  textSize(11.5); fill('#333');
  for (let i = 0; i < shown; i++) {
    const m = MINUTIAE[i];
    const tx = Math.round(m.fx * 100), ty = Math.round(m.fy * 100);
    text((i + 1) + '.  (' + tx + ', ' + ty + ', ' + m.ang + '°)  ' + (m.type === 'end' ? 'ending' : 'bifurcation'),
      lx, ly + 42 + i * 17);
  }
}

function visSearch(x, y, w, h, elapsed) {
  fill('#1a3a6c'); textAlign(LEFT, TOP); textSize(12); textStyle(BOLD);
  text('Comparing query template against 6,240,118 stored templates…', x + 4, y); textStyle(NORMAL);
  const cols = 16, rows = 5, gx = 14, gy = 24;
  const cw = (w - gx) / cols - 4, ch = (h - gy - 18) / rows - 4;
  const total = cols * rows;
  const sweep = (Math.floor(elapsed / 2)) % (total + 12);
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
    const idx = r * cols + c;
    const px = x + gx + c * (cw + 4), py = y + gy + r * (ch + 4);
    const lit = idx <= sweep && idx > sweep - 12;
    noStroke(); fill(lit ? '#1f6fb2' : '#c7d6e6'); rect(px, py, cw, ch, 2);
  }
  fill('#666'); textAlign(LEFT, TOP); textSize(11);
  text('Each tile is a stored template; the algorithm scores alignment with the query.', x + 4, y + h - 14);
}

function visCandidates(x, y, w, h) {
  fill('#1a3a6c'); textAlign(LEFT, TOP); textSize(12); textStyle(BOLD);
  text('Ranked candidate list (similarity score out of 100):', x + 4, y); textStyle(NORMAL);
  const n = CANDIDATES.length, gap = 14, cardW = (w - (n - 1) * gap) / n, cardY = y + 22, cardH = h - 30;
  for (let i = 0; i < n; i++) {
    const cx = x + i * (cardW + gap), score = CANDIDATES[i];
    const top1 = i === 0;
    fill('#fff'); stroke(top1 ? '#1f6fb2' : '#ccc'); strokeWeight(top1 ? 2.5 : 1);
    rect(cx, cardY, cardW, cardH, 7);
    noStroke(); fill('#333'); textAlign(LEFT, TOP); textSize(12); textStyle(BOLD);
    text('Rank ' + (i + 1), cx + 10, cardY + 8); textStyle(NORMAL);
    // thumbnail print
    drawPrint(cx + cardW / 2, cardY + cardH * 0.42, cardW * 0.32, cardH * 0.45);
    // score bar
    const bx = cx + 12, bw = cardW - 24, by = cardY + cardH - 30;
    fill('#e4e4e4'); rect(bx, by, bw, 12, 6);
    fill(top1 ? '#1f6fb2' : '#7ea9d0'); rect(bx, by, bw * score / 100, 12, 6);
    fill('#1a3a6c'); textAlign(CENTER, TOP); textSize(15); textStyle(BOLD);
    text(score + ' / 100', cx + cardW / 2, by + 14); textStyle(NORMAL);
  }
}

function visExaminer(x, y, w, h) {
  fill(HUMANFILL); stroke(HUMAN); strokeWeight(2); rect(x, y, w, 44, 8);
  noStroke(); fill(HUMAN); textAlign(CENTER, CENTER); textSize(16); textStyle(BOLD);
  text('⚠  AFIS does NOT make identifications — a human examiner is required', x + w / 2, y + 22);
  textStyle(NORMAL);
  // two outcome chips
  const cy = y + 90, cw = (w - 30) / 2;
  fill('#e7f5ec'); stroke(HUMAN); rect(x, cy, cw, 70, 8);
  fill('#fdecea'); stroke('#c0392b'); rect(x + cw + 30, cy, cw, 70, 8);
  noStroke(); fill(HUMAN); textAlign(CENTER, CENTER); textSize(15); textStyle(BOLD);
  text('IDENTIFICATION', x + cw / 2, cy + 26);
  fill('#c0392b'); text('EXCLUSION', x + cw + 30 + cw / 2, cy + 26);
  textStyle(NORMAL); textSize(11.5);
  fill('#2e8b57'); text('examiner confirms the latent and a candidate share enough detail', x + cw / 2, cy + 50);
  fill('#c0392b'); text('examiner determines no candidate is the source', x + cw + 30 + cw / 2, cy + 50);
}

function mousePressed() {
  if (mouseY > drawHeight) return;
  for (const b of stationBoxes) {
    if (mouseX >= b.x && mouseX <= b.x + b.w && mouseY >= b.y && mouseY <= b.y + b.h) { gotoStage(b.i); return; }
  }
}
