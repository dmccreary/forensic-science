// ADME Pathway Interactive Flow Diagram — Understand (L2)
// CANVAS_HEIGHT: 515
// Drug molecules flow through Absorption -> Distribution -> Metabolism ->
// Elimination. Pick a route, watch the blood-concentration curve build, and
// click a stage to read what happens there.

let canvasWidth = 800;
const drawHeight = 470;
const controlHeight = 45;
let canvasHeight = drawHeight + controlHeight;
const margin = 15;
const defaultTextSize = 16;

const STAGES = [
  { key: 'A', name: 'Absorption', organ: 'GI tract', color: '#27ae60',
    duration: 'minutes to ~1 hour',
    desc: 'The drug crosses into the bloodstream — from the gut (oral) or directly (IV / inhaled). This sets how fast blood concentration rises.' },
  { key: 'D', name: 'Distribution', organ: 'Bloodstream & tissues', color: '#c0392b',
    duration: 'minutes to hours',
    desc: 'Blood carries the drug throughout the body, partitioning from plasma into fat, muscle and organs. Peak blood level occurs near here.' },
  { key: 'M', name: 'Metabolism', organ: 'Liver', color: '#8B5A2B',
    duration: 'hours',
    desc: 'Liver enzymes (the CYP450 family) chemically transform the drug into metabolites, usually lowering its activity.' },
  { key: 'E', name: 'Elimination', organ: 'Kidneys & lungs', color: '#7d3c98',
    duration: 'hours to days',
    desc: 'Unchanged drug and metabolites leave the body in urine, breath and sweat. Blood concentration falls back toward zero.' },
];

// route -> pharmacokinetic shape (normalized time 0..1 == 0..24 h)
const ROUTES = {
  'Oral (swallowed)': { ka: 6, ke: 1.6, speed: 0.55, note: 'slow rise, delayed peak' },
  'IV (injected)':    { ka: 60, ke: 1.4, speed: 1.3, note: 'near-instant peak' },
  'Inhaled':          { ka: 20, ke: 1.8, speed: 1.05, note: 'very rapid peak' },
};

let routeSelect, playButton, resetButton;
let boxes = [];          // computed each frame for hit-testing
let selectedStage = 0;   // index into STAGES
let t = 0;               // normalized time 0..1
let playing = true;
let cmax = 1;            // peak concentration for the active route (for scaling)

function concentration(tt, r) {
  // Bateman-style absorption/elimination curve
  const c = (Math.exp(-r.ke * tt) - Math.exp(-r.ka * tt));
  return Math.max(0, c);
}
function peakConc(r) {
  let m = 0;
  for (let i = 0; i <= 200; i++) m = Math.max(m, concentration(i / 200, r));
  return m || 1;
}

function updateCanvasSize() {
  const c = document.querySelector('main');
  if (c) canvasWidth = Math.max(380, Math.floor(c.getBoundingClientRect().width));
}

function setup() {
  updateCanvasSize();
  const cnv = createCanvas(canvasWidth, canvasHeight);
  cnv.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  routeSelect = createSelect();
  for (const k in ROUTES) routeSelect.option(k);
  routeSelect.selected('Oral (swallowed)');
  routeSelect.changed(() => { t = 0; playing = true; cmax = peakConc(ROUTES[routeSelect.value()]); });

  playButton = createButton('Pause');
  playButton.mousePressed(() => { playing = !playing; playButton.html(playing ? 'Pause' : 'Play'); });

  resetButton = createButton('Reset');
  resetButton.mousePressed(() => { t = 0; playing = true; playButton.html('Pause'); });

  cmax = peakConc(ROUTES['Oral (swallowed)']);
  positionControls();
}

function positionControls() {
  const y = drawHeight + 8;
  routeSelect.position(margin, y);
  routeSelect.size(170);
  playButton.position(margin + 185, y);
  resetButton.position(margin + 255, y);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  positionControls();
}

function draw() {
  const r = ROUTES[routeSelect.value()];
  if (playing) { t += 0.0016 * r.speed; if (t >= 1) { t = 1; playing = false; playButton.html('Play'); } }

  // backgrounds
  noStroke();
  fill('#eef3fb'); rect(0, 0, canvasWidth, drawHeight);
  fill('#f4f4f4'); rect(0, drawHeight, canvasWidth, controlHeight);

  // title
  fill('#1a3a6c'); textAlign(CENTER, TOP); textSize(20); textStyle(BOLD);
  text('ADME: A Drug’s Journey Through the Body', canvasWidth / 2, 8);
  textStyle(NORMAL); textSize(12); fill('#555');
  text('Route: ' + routeSelect.value() + ' — ' + r.note, canvasWidth / 2, 33);

  drawStageRow(r);
  drawInfoPanel(r);
  drawCurve(r);
}

// ---- top: four stage boxes with flowing molecules ----
function drawStageRow(r) {
  const top = 52, h = 66, gap = 12;
  const w = (canvasWidth - 2 * margin - 3 * gap) / 4;
  boxes = [];
  for (let i = 0; i < 4; i++) {
    const x = margin + i * (w + gap);
    boxes.push({ x: x, y: top, w: w, h: h, i: i });
    const s = STAGES[i];
    // box
    stroke(i === selectedStage ? '#111' : '#bbb');
    strokeWeight(i === selectedStage ? 3 : 1);
    fill(red(color(s.color)), green(color(s.color)), blue(color(s.color)), 38);
    rect(x, top, w, h, 8);
    // label
    noStroke(); fill(s.color); textAlign(CENTER, TOP); textSize(13); textStyle(BOLD);
    text(s.name, x + w / 2, top + 8);
    textStyle(NORMAL); fill('#333'); textSize(11);
    text(s.organ, x + w / 2, top + 26);
    // arrow to next box
    if (i < 3) {
      const ax = x + w, ay = top + h / 2, bx = x + w + gap;
      stroke('#888'); strokeWeight(2); line(ax, ay, bx, ay);
      noStroke(); fill('#888');
      triangle(bx, ay, bx - 5, ay - 4, bx - 5, ay + 4);
    }
  }
  // flowing molecules: position mapped from t across the 4 boxes
  const path = t * 4; // 0..4 across stages
  for (let k = 0; k < 7; k++) {
    const tt = path - k * 0.16;
    if (tt < 0 || tt > 4) continue;
    const seg = Math.min(3, Math.floor(tt));
    const frac = tt - seg;
    const b = boxes[seg];
    const cx = b.x + frac * (b.w + gap);
    noStroke(); fill('#e67e22'); circle(cx + b.w * 0.15, b.y + b.h / 2 + (k % 2 ? -7 : 7), 7);
  }
}

// ---- middle: selected-stage description ----
function drawInfoPanel(r) {
  const x = margin, y = 130, w = canvasWidth - 2 * margin, h = 96;
  const s = STAGES[selectedStage];
  noStroke(); fill('#ffffff'); stroke('#ccc'); strokeWeight(1);
  rect(x, y, w, h, 8);
  noStroke();
  // colored tab
  fill(s.color); rect(x, y, 8, h, 8, 0, 0, 8);
  fill(s.color); textAlign(LEFT, TOP); textSize(15); textStyle(BOLD);
  text(s.key + ' — ' + s.name + '  (' + s.organ + ')', x + 18, y + 8);
  textStyle(NORMAL); fill('#333'); textSize(12.5);
  text(s.desc, x + 18, y + 30, w - 28, 44);
  fill('#666'); textSize(11);
  text('Typical duration: ' + s.duration + '     •     Click a stage above to read about it', x + 18, y + h - 18);
}

// ---- bottom: blood-concentration-over-time curve ----
function drawCurve(r) {
  const x = margin + 34, y = 252, w = canvasWidth - 2 * margin - 44, h = 150;
  const bot = y + h;
  // frame
  noStroke(); fill('#fff'); stroke('#ccc'); strokeWeight(1); rect(x - 4, y - 4, w + 8, h + 26, 6);
  noStroke(); fill('#1a3a6c'); textAlign(LEFT, TOP); textSize(13); textStyle(BOLD);
  text('Blood concentration over time', x, y - 22);
  textStyle(NORMAL);
  // axes
  stroke('#999'); strokeWeight(1); line(x, y, x, bot); line(x, bot, x + w, bot);
  noStroke(); fill('#666'); textSize(10);
  textAlign(RIGHT, CENTER); text('Conc.', x - 6, y + 6);
  textAlign(CENTER, TOP); text('0 h', x, bot + 4); text('12 h', x + w / 2, bot + 4); text('24 h', x + w, bot + 4);

  // detection-window reference (where a tox sample can still find the drug)
  noStroke(); fill('#666'); textAlign(LEFT, TOP); textSize(10.5);
  text('Detection windows:  blood = hours–1 day   ·   urine = 1–4 days   ·   hair = weeks–months', x, bot + 18);

  // full curve
  stroke('#e67e22'); strokeWeight(2.5); noFill(); beginShape();
  for (let i = 0; i <= 120; i++) {
    const tt = i / 120;
    const cx = x + tt * w;
    const cy = bot - (concentration(tt, r) / cmax) * h * 0.92;
    vertex(cx, cy);
  }
  endShape();

  // current point + vertical time marker
  const px = x + t * w;
  const cnow = concentration(t, r) / cmax;
  const py = bot - cnow * h * 0.92;
  stroke('#888'); strokeWeight(1); drawingContext.setLineDash([3, 3]);
  line(px, y, px, bot); drawingContext.setLineDash([]);
  noStroke(); fill('#b35900'); circle(px, py, 9);
  // readouts
  fill('#333'); textAlign(LEFT, TOP); textSize(11.5);
  const hrs = (t * 24).toFixed(1);
  text('t = ' + hrs + ' h', x + 6, y + 2);
  text('relative blood conc. = ' + (cnow * 100).toFixed(0) + '% of peak', x + 6, y + 16);
}

function mousePressed() {
  if (mouseY > drawHeight) return; // leave DOM controls alone
  for (const b of boxes) {
    if (mouseX >= b.x && mouseX <= b.x + b.w && mouseY >= b.y && mouseY <= b.y + b.h) {
      selectedStage = b.i; return;
    }
  }
}
