// Headspace SPME -> GC-MS Workflow — Understand (L2)
// CANVAS_HEIGHT: 500
// Explain how headspace SPME recovers volatile accelerant residues from arson
// debris and connects to GC-MS identification. Click each station for its role;
// watch vapor accumulate in the sealed can; click chromatogram peaks to identify
// compounds; switch the accelerant to see how the peak pattern changes.

let canvasWidth = 900;
const drawHeight = 450;
const controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
const margin = 15;
const defaultTextSize = 16;

const FIRE = '#e8590c';
const BLUE = '#1769c9';
const OK = '#2e9e57';
const HW = '#6b7280';

let accelSelect, replayButton;
let selected = 4;        // default: chromatogram
let selectedPeak = -1;
let vapor = 0;           // 0..1 headspace saturation
let molecules = [];
let stationRects = [];
let peakHits = [];

const STATIONS = [
  { name: 'Debris Collection', icon: 'debris', kind: 'fire',
    purpose: 'Charred debris (carpet, wood) is collected at the fire scene and sealed in a clean, airtight metal can.',
    why: 'Volatile accelerants evaporate fast — an airtight can traps the vapors before they are lost.' },
  { name: 'Sealed Can (Headspace)', icon: 'can', kind: 'fire',
    purpose: 'The sealed can is gently warmed. Volatile accelerant molecules evaporate from the debris and build up in the air space (headspace) above it.',
    why: 'Warming concentrates the vapors in the headspace so they can be sampled with no solvent.' },
  { name: 'SPME Extraction', icon: 'fiber', kind: 'hw',
    purpose: 'A SPME fiber (a coated silica filament) is pushed through the can’s septum into the headspace; its coating adsorbs the volatile organic compounds.',
    why: 'Solvent-free pre-concentration: trace accelerant collects onto the fiber for delivery to the instrument.' },
  { name: 'GC-MS Injection', icon: 'gcms', kind: 'hw',
    purpose: 'The fiber is placed in the GC injector. Heat desorbs the compounds onto the column, which separates them; the mass spectrometer identifies each one.',
    why: 'The GC separates the mixture by retention time and the MS confirms each compound’s identity.' },
  { name: 'Chromatogram', icon: 'chart', kind: 'ok',
    purpose: 'The GC-MS output is a chromatogram of peaks. The pattern of peaks is matched against reference accelerants to identify the type.',
    why: 'It is the peak pattern — not any single compound — that identifies the accelerant.' }
];

const PATTERNS = {
  'Gasoline': {
    ref: 'Gasoline — a medium petroleum distillate with a dominant aromatic (xylene) cluster.',
    peaks: [
      { rt: 4.2, name: 'Toluene (C7)', h: 0.50 },
      { rt: 6.8, name: 'Ethylbenzene (C8)', h: 0.42 },
      { rt: 7.3, name: 'm/p-Xylene (C8)', h: 0.85 },
      { rt: 8.1, name: 'o-Xylene (C8)', h: 0.50 },
      { rt: 10.4, name: '1,2,4-Trimethylbenzene (C9)', h: 0.62 },
      { rt: 13.0, name: 'Naphthalene (C10)', h: 0.40 }
    ]
  },
  'Lighter Fluid': {
    ref: 'Lighter fluid — a light petroleum distillate dominated by short n-alkanes (C5–C9).',
    peaks: [
      { rt: 2.5, name: 'n-Pentane (C5)', h: 0.35 },
      { rt: 3.4, name: 'n-Hexane (C6)', h: 0.70 },
      { rt: 4.6, name: 'n-Heptane (C7)', h: 0.85 },
      { rt: 5.9, name: 'n-Octane (C8)', h: 0.58 },
      { rt: 7.2, name: 'n-Nonane (C9)', h: 0.35 }
    ]
  },
  'Kerosene': {
    ref: 'Kerosene — a heavy petroleum distillate: a smooth series of n-alkanes (C9–C14).',
    peaks: [
      { rt: 8.5, name: 'n-Nonane (C9)', h: 0.40 },
      { rt: 10.0, name: 'n-Decane (C10)', h: 0.62 },
      { rt: 11.5, name: 'n-Undecane (C11)', h: 0.80 },
      { rt: 13.0, name: 'n-Dodecane (C12)', h: 0.85 },
      { rt: 14.5, name: 'n-Tridecane (C13)', h: 0.68 },
      { rt: 16.0, name: 'n-Tetradecane (C14)', h: 0.48 }
    ]
  }
};
const RT_MIN = 2, RT_MAX = 17;

function setup() {
  updateCanvasSize();
  const cnv = createCanvas(canvasWidth, canvasHeight);
  cnv.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  accelSelect = createSelect();
  accelSelect.option('Gasoline');
  accelSelect.option('Lighter Fluid');
  accelSelect.option('Kerosene');
  accelSelect.selected('Gasoline');
  accelSelect.changed(() => { selectedPeak = -1; });

  replayButton = createButton('Replay Vapor');
  replayButton.mousePressed(() => { vapor = 0; molecules = []; });

  positionControls();
}
function positionControls() {
  const r = drawHeight + 12;
  accelSelect.position(margin + 110, r + 2);
  replayButton.position(margin + 260, r);
}
function updateCanvasSize() {
  const c = document.querySelector('main');
  if (c) canvasWidth = Math.max(800, Math.floor(c.getBoundingClientRect().width));
}
function windowResized() {
  updateCanvasSize(); resizeCanvas(canvasWidth, canvasHeight); positionControls();
}

function curPattern() { return PATTERNS[accelSelect.value()]; }

function draw() {
  background('#eef2f7');
  noStroke();
  fill('#f4f4f4'); rect(0, drawHeight, canvasWidth, controlHeight);
  fill('#33404f'); textAlign(LEFT, CENTER); textSize(12);
  text('Accelerant:', margin, drawHeight + 24);

  fill('#173a63'); textAlign(CENTER, TOP); textSize(20); textStyle(BOLD);
  text('Headspace SPME → GC-MS Workflow', canvasWidth / 2, 8); textStyle(NORMAL);

  if (vapor < 1) vapor += 0.006;
  drawWorkflow(margin, 40, canvasWidth - 2 * margin, 112);
  drawDetail(margin, 160, canvasWidth - 2 * margin, 70);
  drawChromatogram(margin, 238, canvasWidth - 2 * margin, drawHeight - 238 - 10);
}

function drawWorkflow(x, y, w, h) {
  const n = STATIONS.length;
  const slot = w / n;
  const bw = slot * 0.66, bh = 66, cy = y + 34;
  stationRects = [];
  for (let i = 0; i < n - 1; i++) {
    const ax = x + slot * (i + 0.5) + bw / 2;
    const bx = x + slot * (i + 1.5) - bw / 2;
    stroke('#b8c2d0'); strokeWeight(2); line(ax, cy, bx, cy);
    noStroke(); fill('#b8c2d0'); triangle(bx, cy, bx - 7, cy - 4, bx - 7, cy + 4);
    for (let d = 0; d < 3; d++) {
      const tt = ((frameCount * 0.012) + d / 3) % 1;
      fill(BLUE); circle(lerp(ax, bx - 7, tt), cy, 4.5);
    }
  }
  for (let i = 0; i < n; i++) {
    const sx = x + slot * (i + 0.5);
    const st = STATIONS[i], sel = i === selected;
    stationRects.push({ i, x: sx - bw / 2, y: cy - bh / 2, w: bw, h: bh });
    const c = st.kind === 'fire' ? FIRE : st.kind === 'ok' ? OK : HW;
    stroke(sel ? '#0b3d91' : c); strokeWeight(sel ? 2.6 : 1.4);
    fill(sel ? '#eaf2ff' : '#ffffff');
    rect(sx - bw / 2, cy - bh / 2, bw, bh, 8);
    drawStationArt(st.icon, sx, cy, bw, bh, c);
    noStroke(); fill('#1a3a6c'); textAlign(CENTER, TOP); textSize(10); textStyle(BOLD);
    text(st.name, sx - bw / 2 + 2, cy + bh / 2 + 4, bw - 4); textStyle(NORMAL);
  }
}

function drawStationArt(kind, cx, cy, bw, bh, c) {
  push(); translate(cx, cy);
  stroke(c); strokeWeight(1.6); noFill();
  if (kind === 'debris') {
    fill(c); noStroke();
    triangle(-10, 8, -2, -10, 6, 8); triangle(2, 8, 9, -4, 14, 8);
    stroke(FIRE); strokeWeight(1.4); noFill();
    line(0, -12, 2, -18); line(6, -10, 9, -16);
  } else if (kind === 'can') {
    // sealed can with headspace + rising molecules
    stroke(HW); rect(-13, -14, 26, 30, 3);
    noStroke(); fill('#cfe0c9'); rect(-12, 0, 24, 15);  // debris layer
    // molecules in headspace
    if (frameCount % 4 === 0 && molecules.length < 40 && vapor < 1)
      molecules.push({ x: random(-10, 10), y: random(0, 12), v: random(0.2, 0.6) });
    for (const m of molecules) {
      m.y -= m.v;
      if (m.y < -13) m.y = random(-2, 10);
      fill(FIRE); noStroke(); circle(m.x, m.y, 2.4);
    }
  } else if (kind === 'fiber') {
    stroke(HW); line(0, -16, 0, 6); fill(HW); noStroke(); rect(-4, -20, 8, 6);
    stroke(BLUE); strokeWeight(2.4); line(0, 6, 0, 16);
  } else if (kind === 'gcms') {
    stroke(c); rect(-14, -8, 14, 18, 2);
    line(0, 0, 8, 0); ellipse(12, 0, 10, 14);
  } else if (kind === 'chart') {
    stroke(c); strokeWeight(1.6);
    line(-12, 10, 12, 10); line(-12, 10, -12, -12);
    noFill(); beginShape();
    vertex(-10, 8); vertex(-5, -6); vertex(-2, 6); vertex(2, -10); vertex(6, 6); vertex(10, 2);
    endShape();
  }
  pop();
}

function drawDetail(x, y, w, h) {
  noStroke(); fill('#ffffff'); stroke('#d6deea'); strokeWeight(1);
  rect(x, y, w, h, 8); noStroke();
  const st = STATIONS[selected];
  fill('#173a63'); textAlign(LEFT, TOP); textSize(13); textStyle(BOLD);
  text(st.name, x + 14, y + 8); textStyle(NORMAL);
  fill('#33404f'); textSize(11.5);
  text(st.purpose, x + 14, y + 28, w * 0.60 - 14, h - 32);
  // why box
  const wx = x + w * 0.62;
  noStroke(); fill('#fff6ef'); stroke('#f3d9c6'); strokeWeight(1);
  rect(wx, y + 8, w - (wx - x) - 14, h - 16, 6); noStroke();
  fill(FIRE); textSize(10.5); textStyle(BOLD); text('WHY THIS STEP', wx + 10, y + 14); textStyle(NORMAL);
  fill('#5b4636'); textSize(11);
  text(st.why, wx + 10, y + 30, w - (wx - x) - 34, h - 36);
  // headspace saturation bar when station 2 selected
  if (selected === 1) {
    fill('#5b6472'); textSize(10); textAlign(LEFT, BOTTOM);
    text('Headspace saturation: ' + nf(vapor * 100, 0, 0) + '%', x + 14, y + h - 6);
    noStroke(); fill('#e0e6ee'); rect(x + 150, y + h - 16, 120, 8, 4);
    fill(FIRE); rect(x + 150, y + h - 16, 120 * vapor, 8, 4);
  }
}

function drawChromatogram(x, y, w, h) {
  noStroke(); fill('#ffffff'); stroke('#d6deea'); strokeWeight(1);
  rect(x, y, w, h, 8); noStroke();
  const pat = curPattern();

  fill('#173a63'); textAlign(LEFT, TOP); textSize(12.5); textStyle(BOLD);
  text('GC-MS Chromatogram', x + 14, y + 10); textStyle(NORMAL);
  fill('#8a93a3'); textSize(10.5);
  text('Click a peak to identify the compound.', x + 165, y + 12);

  const plotX = x + 44, plotY = y + 32, plotW = w * 0.66 - 44, plotH = h - 70;
  const baseY = plotY + plotH;
  // axes
  stroke('#c9d3e0'); strokeWeight(1);
  line(plotX, plotY, plotX, baseY); line(plotX, baseY, plotX + plotW, baseY);
  noStroke(); fill('#8a93a3'); textSize(9);
  textAlign(CENTER, TOP);
  for (let t = 2; t <= 16; t += 2) {
    const px = map(t, RT_MIN, RT_MAX, plotX, plotX + plotW);
    stroke('#eef2f7'); line(px, plotY, px, baseY);
    noStroke(); text(t, px, baseY + 4);
  }
  textAlign(CENTER, BOTTOM); text('Retention time (min)', plotX + plotW / 2, baseY + 30);
  push(); translate(x + 12, plotY + plotH / 2); rotate(-HALF_PI);
  textAlign(CENTER, CENTER); text('Abundance', 0, 0); pop();

  // curve (sum of gaussians)
  const sigma = 0.34;
  stroke(BLUE); strokeWeight(1.8); fill(232, 240, 252);
  beginShape();
  vertex(plotX, baseY);
  for (let px = plotX; px <= plotX + plotW; px += 2) {
    const rt = map(px, plotX, plotX + plotW, RT_MIN, RT_MAX);
    let ab = 0;
    for (const pk of pat.peaks) ab += pk.h * Math.exp(-Math.pow((rt - pk.rt) / sigma, 2));
    vertex(px, baseY - ab * plotH * 0.86);
  }
  vertex(plotX + plotW, baseY);
  endShape(CLOSE);

  // peak apex hit targets + labels
  peakHits = [];
  for (let i = 0; i < pat.peaks.length; i++) {
    const pk = pat.peaks[i];
    const px = map(pk.rt, RT_MIN, RT_MAX, plotX, plotX + plotW);
    const py = baseY - pk.h * plotH * 0.86;
    peakHits.push({ i, x: px, y: py });
    if (selectedPeak === i) {
      stroke(OK); strokeWeight(1.6); line(px, py - 4, px, baseY);
      noStroke(); fill(OK); circle(px, py, 8);
    } else {
      noStroke(); fill(BLUE); circle(px, py, 5);
    }
  }
  // selected peak readout
  if (selectedPeak >= 0 && selectedPeak < pat.peaks.length) {
    const pk = pat.peaks[selectedPeak];
    noStroke(); fill('#173a63'); textAlign(LEFT, TOP); textSize(11); textStyle(BOLD);
    text(pk.name, plotX + 4, plotY - 2); textStyle(NORMAL);
    fill('#5b6472'); text('RT ' + pk.rt.toFixed(1) + ' min', plotX + 4, plotY + 13);
  }

  // reference match panel
  const rx = x + w * 0.69, rw = w - (rx - x) - 14;
  noStroke(); fill('#e6f4ec'); stroke(OK); strokeWeight(1.2);
  rect(rx, y + 32, rw, h - 70, 8); noStroke();
  fill(OK); textAlign(LEFT, TOP); textSize(11.5); textStyle(BOLD);
  text('✓ Reference Match', rx + 12, y + 42); textStyle(NORMAL);
  fill('#1f5133'); textSize(11);
  text(accelSelect.value(), rx + 12, y + 62);
  fill('#33404f'); textSize(10.5);
  text(pat.ref, rx + 12, y + 80, rw - 24);
  fill('#5b6472'); textSize(10);
  text('The questioned sample’s peak pattern matches this reference accelerant standard.',
    rx + 12, y + 80 + 56, rw - 24);
}

function mousePressed() {
  for (const p of peakHits) {
    if (dist(mouseX, mouseY, p.x, p.y) < 12) { selectedPeak = p.i; selected = 4; return; }
  }
  for (const s of stationRects) {
    if (mouseX >= s.x && mouseX <= s.x + s.w && mouseY >= s.y && mouseY <= s.y + s.h) {
      selected = s.i; return;
    }
  }
}
