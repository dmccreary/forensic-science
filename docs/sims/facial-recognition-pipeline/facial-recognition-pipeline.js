// Facial Recognition Pipeline — Remember (L1)
// CANVAS_HEIGHT: 515
// Identify the five stages of the facial-recognition pipeline and the source of
// error at each. Click a stage for detail; degrade the image or switch
// algorithm to see how confidence, match scores, and demographic error change.

let canvasWidth = 880;
const drawHeight = 470;
const controlHeight = 45;
let canvasHeight = drawHeight + controlHeight;
const margin = 15;
const defaultTextSize = 16;

const BLUE = '#1f6fb2';
const ORANGE = '#c47a17';
const THRESH = 0.70;

let qualityButton, algoSelect;
let selected = 4;       // default highlight: Database Comparison (richest view)
let degraded = false;
let stageBoxes = [];

const STAGES = [
  { name: 'Input Image', icon: 'img',
    does: 'Acquire the probe image (often a CCTV still).',
    wrong: 'Low resolution, oblique angle, poor lighting, motion blur.',
    err: 'Garbage in, garbage out — every later stage inherits these flaws.' },
  { name: 'Face Detection', icon: 'box',
    does: 'Locate the face and draw a bounding box.',
    wrong: 'Missed faces or false boxes; fails at extreme angle / occlusion.',
    err: 'A non-detection means no identification at all.' },
  { name: 'Landmark Extraction', icon: 'dots',
    does: 'Mark ~68 facial landmarks (eyes, nose, mouth).',
    wrong: 'Points misplaced under glasses, masks, or expression.',
    err: 'Poor alignment distorts the feature vector.' },
  { name: 'Feature Vector', icon: 'vec',
    does: 'Encode the face as a numeric embedding vector.',
    wrong: 'Algorithm bias; sensitive to pose, age, and lighting.',
    err: 'Two images of one person can map far apart.' },
  { name: 'Database Comparison', icon: 'grid',
    does: 'Rank gallery faces by distance to the probe vector.',
    wrong: 'Threshold too low → false matches; too high → missed matches.',
    err: 'The ranked list is an investigative lead, not a positive ID.' }
];

function isCNN() { return algoSelect.value().indexOf('Deep') >= 0; }

function scores() {
  const cnn = isCNN();
  if (cnn) return degraded ? [0.81, 0.69, 0.61, 0.50, 0.40] : [0.94, 0.82, 0.71, 0.55, 0.43];
  return degraded ? [0.74, 0.68, 0.63, 0.57, 0.50] : [0.86, 0.78, 0.72, 0.66, 0.58];
}
function detectConf() { return degraded ? 64 : 98; }
function demoErr() {
  const cnn = isCNN();
  if (cnn) return degraded ? [2.5, 14.0] : [0.8, 7.3];
  return degraded ? [9.0, 30.0] : [4.0, 18.0];
}

function updateCanvasSize() {
  const c = document.querySelector('main');
  if (c) canvasWidth = Math.max(740, Math.floor(c.getBoundingClientRect().width));
}

function setup() {
  updateCanvasSize();
  const cnv = createCanvas(canvasWidth, canvasHeight);
  cnv.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  qualityButton = createButton('Degrade Image Quality');
  qualityButton.mousePressed(() => {
    degraded = !degraded;
    qualityButton.html(degraded ? 'Restore Image Quality' : 'Degrade Image Quality');
  });
  algoSelect = createSelect();
  algoSelect.option('Deep Learning (CNN)');
  algoSelect.option('Classical (Eigenface)');
  positionControls();
}

function positionControls() {
  const r1 = drawHeight + 10;
  qualityButton.position(margin, r1);
  algoSelect.position(margin + 200, r1);
}

function windowResized() {
  updateCanvasSize(); resizeCanvas(canvasWidth, canvasHeight); positionControls();
}

function draw() {
  stageBoxes = [];
  noStroke();
  fill('#eef3fb'); rect(0, 0, canvasWidth, drawHeight);
  fill('#f4f4f4'); rect(0, drawHeight, canvasWidth, controlHeight);

  fill('#1a3a6c'); textAlign(CENTER, TOP); textSize(20); textStyle(BOLD);
  text('Facial Recognition Pipeline', canvasWidth / 2, 8); textStyle(NORMAL);

  drawPipeline(margin, 42, canvasWidth - 2 * margin, 132);
  const by = 184, bh = drawHeight - by - 10;
  const w = canvasWidth - 2 * margin;
  drawVisual(margin, by, w * 0.34 - 6, bh);
  drawDetail(margin + w * 0.34 + 4, by, w * 0.36 - 8, bh);
  drawDemographic(margin + w * 0.70 + 6, by, w * 0.30 - 6, bh);
}

function drawPipeline(x, y, w, h) {
  const n = STAGES.length, gap = 14;
  const bw = (w - (n - 1) * gap) / n, bh = 60, boxY = y + 6;
  // animated probe dot traveling across the pipeline
  const tt = (frameCount % 360) / 360;
  const probeX = x + tt * w;
  for (let i = 0; i < n; i++) {
    const bx = x + i * (bw + gap);
    stageBoxes.push({ i, x: bx, y: boxY, w: bw, h: bh });
    const sel = i === selected;
    stroke(sel ? '#0a7d33' : BLUE); strokeWeight(sel ? 2.5 : 1.5);
    fill(sel ? '#e7f6ec' : '#ffffff'); rect(bx, boxY, bw, bh, 8); noStroke();
    drawIcon(STAGES[i].icon, bx + bw / 2, boxY + 22, sel);
    fill('#1a3a6c'); textAlign(CENTER, TOP); textSize(10.5); textStyle(BOLD);
    text(STAGES[i].name, bx + 4, boxY + 40, bw - 8); textStyle(NORMAL);
    // arrow
    if (i < n - 1) {
      const ax = bx + bw + gap / 2;
      stroke('#9aa6b8'); strokeWeight(2); line(bx + bw + 2, boxY + bh / 2, bx + bw + gap - 2, boxY + bh / 2);
      noStroke(); fill('#9aa6b8'); triangle(ax + 4, boxY + bh / 2, ax - 2, boxY + bh / 2 - 4, ax - 2, boxY + bh / 2 + 4);
    }
    // error label below
    fill(ORANGE); textAlign(CENTER, TOP); textSize(9);
    text('⚠ ' + STAGES[i].wrong, bx + 2, boxY + bh + 6, bw - 4);
  }
  // probe marker
  noStroke(); fill('#e67e22'); circle(probeX, boxY - 6, 9);
  fill('#fff'); circle(probeX, boxY - 6, 3);
  fill('#5a6472'); textAlign(LEFT, CENTER); textSize(9); text('probe', x, boxY - 6);
}

function drawIcon(kind, cx, cy, sel) {
  push(); translate(cx, cy);
  const c = sel ? '#0a7d33' : BLUE;
  stroke(c); strokeWeight(1.5); noFill();
  if (kind === 'img') { rect(-12, -8, 24, 16, 2); line(-12, 4, -4, -2); line(-4, -2, 4, 4); fill(c); noStroke(); circle(6, -3, 4); }
  else if (kind === 'box') { drawFaceMini(0, 0, 9, c); noFill(); stroke('#0a7d33'); strokeWeight(1.5); rect(-11, -11, 22, 22); }
  else if (kind === 'dots') { drawFaceMini(0, 0, 9, c); fill(ORANGE); noStroke(); for (let a = 0; a < 8; a++) circle(cos(a) * 7, sin(a * 2) * 6, 2.2); }
  else if (kind === 'vec') { noStroke(); for (let k = 0; k < 6; k++) { fill(lerpColor(color('#cfe0f0'), color(BLUE), k / 6)); rect(-12 + k * 4, -7, 3.4, 14); } }
  else if (kind === 'grid') { stroke(c); strokeWeight(1.2); noFill(); for (let r = 0; r < 2; r++) for (let cc = 0; cc < 3; cc++) rect(-12 + cc * 9, -8 + r * 9, 7, 7); }
  pop();
}

function drawFaceMini(cx, cy, r, c) {
  push(); stroke(c); strokeWeight(1.2); fill(255); circle(cx, cy, r * 2);
  fill(c); noStroke(); circle(cx - r * 0.35, cy - r * 0.2, 1.8); circle(cx + r * 0.35, cy - r * 0.2, 1.8);
  noFill(); stroke(c); arc(cx, cy + r * 0.25, r, r * 0.7, 0.15 * PI, 0.85 * PI); pop();
}

function drawFace(cx, cy, s, opt) {
  opt = opt || {};
  push();
  if (opt.noisy) { for (let k = 0; k < 80; k++) { noStroke(); fill(random(120, 210), random(120, 210), random(120, 210), 90); rect(cx - s + random(2 * s), cy - s + random(2 * s), 3, 3); } }
  stroke('#7a6a55'); strokeWeight(2); fill('#f1d9bf'); ellipse(cx, cy, s * 1.5, s * 1.9);
  fill('#33414f'); noStroke();
  ellipse(cx - s * 0.32, cy - s * 0.2, s * 0.16, s * 0.12); ellipse(cx + s * 0.32, cy - s * 0.2, s * 0.16, s * 0.12);
  stroke('#7a6a55'); strokeWeight(1.5); noFill(); line(cx, cy - s * 0.1, cx, cy + s * 0.2);
  arc(cx, cy + s * 0.4, s * 0.6, s * 0.4, 0.1 * PI, 0.9 * PI);
  pop();
}

function drawVisual(x, y, w, h) {
  fill('#22272e'); stroke('#ccc'); strokeWeight(1); rect(x, y, w, h, 8); noStroke();
  fill('#cfe0f0'); textAlign(LEFT, TOP); textSize(12); textStyle(BOLD);
  text('Stage ' + (selected + 1) + ' view', x + 12, y + 8); textStyle(NORMAL);
  const cx = x + w / 2, cy = y + h / 2 + 6;
  if (selected === 0) {
    drawFace(cx, cy, 46, { noisy: degraded });
    fill('#f0c419'); textAlign(CENTER, TOP); textSize(11);
    text(degraded ? 'low-res • oblique • noisy' : 'usable still frame', cx, y + h - 26);
  } else if (selected === 1) {
    drawFace(cx, cy, 42);
    stroke('#0aff7d'); strokeWeight(2); noFill(); rect(cx - 38, cy - 46, 76, 90);
    fill('#0aff7d'); noStroke(); textAlign(CENTER, TOP); textSize(11);
    text('detection confidence ' + detectConf() + '%', cx, y + h - 26);
  } else if (selected === 2) {
    drawFace(cx, cy, 42);
    fill(ORANGE); noStroke();
    for (let k = 0; k < 40; k++) { const a = (k / 40) * TWO_PI; circle(cx + cos(a) * (28 + (k % 3) * 5), cy + sin(a) * (34 + (k % 2) * 4), 2.4); }
    fill('#cfe0f0'); textAlign(CENTER, TOP); textSize(11); text('~68 landmark points', cx, y + h - 26);
  } else if (selected === 3) {
    const vals = [0.12, -0.44, 0.91, 0.03, -0.27, 0.58, -0.10, 0.36];
    for (let k = 0; k < vals.length; k++) {
      const bx = x + 18 + k * ((w - 36) / vals.length);
      const bw = (w - 36) / vals.length - 4;
      const bh2 = map(vals[k], -1, 1, 0, h * 0.5);
      fill(vals[k] >= 0 ? BLUE : ORANGE); noStroke();
      rect(bx, cy - bh2, bw, bh2 * 2 > 0 ? Math.abs(bh2) + 1 : 2);
    }
    fill('#cfe0f0'); textAlign(CENTER, TOP); textSize(11); text('numeric embedding (vector)', cx, y + h - 26);
  } else {
    drawGallery(x, y + 30, w, h - 60);
  }
}

function drawGallery(x, y, w, h) {
  const sc = scores();
  const rowH = (h - 8) / sc.length;
  for (let i = 0; i < sc.length; i++) {
    const ry = y + i * rowH;
    drawFace(x + 22, ry + rowH / 2, 13);
    const barX = x + 46, barW = w - 100;
    noStroke(); fill('#3a4450'); rect(barX, ry + rowH / 2 - 6, barW, 12, 3);
    const above = sc[i] >= THRESH;
    fill(above ? '#0aff7d' : '#7f8a99'); rect(barX, ry + rowH / 2 - 6, barW * sc[i], 12, 3);
    fill('#e8eef5'); textAlign(LEFT, CENTER); textSize(11); text(sc[i].toFixed(2), barX + barW + 8, ry + rowH / 2);
  }
  // threshold line
  const barX = x + 46, barW = w - 100, tx = barX + barW * THRESH;
  stroke('#ff5a4d'); strokeWeight(1.5); drawingContext.setLineDash([4, 3]);
  line(tx, y - 2, tx, y + h - 4); drawingContext.setLineDash([]);
  noStroke(); fill('#ff5a4d'); textAlign(CENTER, BOTTOM); textSize(9);
  text('threshold ' + THRESH.toFixed(2), tx, y - 3);
}

function drawDetail(x, y, w, h) {
  fill('#fff'); stroke('#ccc'); strokeWeight(1); rect(x, y, w, h, 8); noStroke();
  const s = STAGES[selected];
  fill('#1a3a6c'); textAlign(LEFT, TOP); textSize(14); textStyle(BOLD);
  text(s.name, x + 12, y + 10, w - 24); textStyle(NORMAL);
  let yy = y + 40;
  const block = (k, v, col) => {
    fill(col); textStyle(BOLD); textSize(11.5); text(k, x + 12, yy); textStyle(NORMAL); yy += 17;
    fill('#333'); textSize(12); text(v, x + 12, yy, w - 24); yy += textHeight(v, w - 24) + 12;
  };
  block('What it does', s.does, BLUE);
  block('What can go wrong', s.wrong, ORANGE);
  block('Effect on error rate', s.err, '#c0392b');
  fill('#888'); textSize(10); text('Click a pipeline stage above to switch.', x + 12, y + h - 22, w - 24);
}

function textHeight(s, maxW) {
  textSize(12); const words = s.split(' '); let line = '', n = 1;
  for (const word of words) { if (textWidth(line + word + ' ') > maxW) { n++; line = word + ' '; } else line += word + ' '; }
  return n * 16;
}

function drawDemographic(x, y, w, h) {
  fill('#fff'); stroke('#ccc'); strokeWeight(1); rect(x, y, w, h, 8); noStroke();
  fill('#1a3a6c'); textAlign(LEFT, TOP); textSize(13); textStyle(BOLD);
  text('Error by demographic', x + 12, y + 10); textStyle(NORMAL);
  fill('#5a6472'); textSize(10.5);
  text(isCNN() ? 'Deep Learning (CNN)' : 'Classical (Eigenface)', x + 12, y + 30);
  const e = demoErr();
  const rows = [['Light-skin male', e[0], '#0a7d33'], ['Dark-skin female', e[1], '#c0392b']];
  let yy = y + 54;
  for (const r of rows) {
    fill('#333'); textSize(11.5); textAlign(LEFT, TOP); text(r[0], x + 12, yy);
    const barX = x + 12, barW = w - 24, mx = 32; // max% for scaling
    noStroke(); fill('#eef1f5'); rect(barX, yy + 17, barW, 12, 3);
    fill(r[2]); rect(barX, yy + 17, barW * Math.min(r[1] / mx, 1), 12, 3);
    fill(r[2]); textAlign(RIGHT, TOP); textSize(11); textStyle(BOLD);
    text(r[1].toFixed(1) + '%', x + w - 14, yy); textStyle(NORMAL);
    yy += 42;
  }
  fill('#7a4d00'); textSize(10.5); textAlign(LEFT, TOP);
  text('Error is not uniform: accuracy varies sharply across demographic groups — a key fairness concern.', x + 12, yy + 2, w - 24);
}

function mousePressed() {
  if (mouseY > drawHeight) return;
  for (const b of stageBoxes) {
    if (mouseX >= b.x && mouseX <= b.x + b.w && mouseY >= b.y && mouseY <= b.y + b.h) { selected = b.i; return; }
  }
}
