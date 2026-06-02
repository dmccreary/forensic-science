// Soil Analysis Comparison Dashboard — Analyze (L4)
// CANVAS_HEIGHT: 600
// Compare a QUESTIONED soil sample (from a suspect's boots) against three
// reference samples (A, B, C) across four criteria at once: Munsell color,
// particle-size distribution, pH, and density-gradient banding. Click a
// reference column to compare it to the questioned sample, press Match Score to
// score the similarity, and New Case to load a fresh scenario.

let canvasWidth = 900;
const drawHeight = 548;
const controlHeight = 52;
let canvasHeight = drawHeight + controlHeight;
const margin = 15;
const defaultTextSize = 16;

const BG = '#f3ede2';
const PANEL = '#ffffff';
const PANEL_E = '#cdbfa6';
const INK = '#3a2f24';
const SUB = '#7a6c59';
const HEAD = '#5a4a36';
const ACCENT = '#b5651d';   // questioned highlight (burnt sienna)
const SELED = '#3d6b8e';    // selected reference highlight
const GREEN = '#2e9e57';
const RED = '#c0392b';

// particle-size segment colors (gravel, sand, silt, clay)
const PART_COLS = ['#8c7b66', '#d9b676', '#a9b58c', '#9a7a63'];
const PART_NAMES = ['Gravel', 'Sand', 'Silt', 'Clay'];

// Two cases. Each case has a questioned sample Q and references A,B,C.
// particles: [gravel, sand, silt, clay] summing to 100
// bands: density-gradient bands as {h:0..1 height, c:[r,g,b]}
const CASES = [
  {
    title: "Case 1 — Suspect's boots",
    samples: [
      { id: 'Q', label: 'Questioned', munsell: '10YR 3/2', mname: 'dark grayish brown',
        col: [82, 66, 49], particles: [5, 25, 35, 35], pH: 6.4,
        bands: [{ h: 0.18, c: [60, 48, 36] }, { h: 0.40, c: [150, 80, 55] }, { h: 0.62, c: [206, 178, 120] }, { h: 0.80, c: [150, 150, 150] }] },
      { id: 'A', label: 'Reference A', munsell: '10YR 5/4', mname: 'yellowish brown',
        col: [150, 120, 80], particles: [15, 60, 15, 10], pH: 7.8,
        bands: [{ h: 0.30, c: [220, 200, 150] }, { h: 0.55, c: [180, 120, 80] }, { h: 0.85, c: [120, 130, 120] }], note: 'Distant location, different geology' },
      { id: 'B', label: 'Reference B', munsell: '10YR 4/3', mname: 'brown',
        col: [110, 88, 62], particles: [8, 35, 32, 25], pH: 6.9,
        bands: [{ h: 0.20, c: [70, 55, 42] }, { h: 0.44, c: [160, 95, 60] }, { h: 0.70, c: [200, 175, 125] }], note: 'Nearby location, similar geology' },
      { id: 'C', label: 'Reference C', munsell: '10YR 3/2', mname: 'dark grayish brown',
        col: [85, 68, 50], particles: [5, 27, 34, 34], pH: 6.5,
        bands: [{ h: 0.18, c: [62, 50, 38] }, { h: 0.41, c: [152, 82, 56] }, { h: 0.61, c: [204, 176, 122] }, { h: 0.80, c: [148, 148, 148] }], note: 'Exact collection location' }
    ]
  },
  {
    title: 'Case 2 — Shovel residue',
    samples: [
      { id: 'Q', label: 'Questioned', munsell: '7.5YR 4/4', mname: 'brown',
        col: [120, 84, 56], particles: [10, 45, 30, 15], pH: 7.2,
        bands: [{ h: 0.22, c: [95, 70, 50] }, { h: 0.48, c: [180, 120, 70] }, { h: 0.72, c: [210, 190, 150] }] },
      { id: 'A', label: 'Reference A', munsell: '7.5YR 4/3', mname: 'brown',
        col: [126, 90, 60], particles: [12, 43, 30, 15], pH: 7.1,
        bands: [{ h: 0.23, c: [98, 72, 52] }, { h: 0.47, c: [182, 122, 72] }, { h: 0.73, c: [208, 188, 148] }], note: 'Garden bed by the back fence' },
      { id: 'B', label: 'Reference B', munsell: '2.5Y 6/4', mname: 'light yellowish brown',
        col: [180, 160, 110], particles: [3, 20, 45, 32], pH: 8.1,
        bands: [{ h: 0.35, c: [200, 185, 140] }, { h: 0.60, c: [150, 140, 110] }, { h: 0.88, c: [120, 120, 130] }], note: 'Lakeshore silt, different site' },
      { id: 'C', label: 'Reference C', munsell: '5YR 3/3', mname: 'dark reddish brown',
        col: [92, 58, 40], particles: [20, 50, 20, 10], pH: 6.2,
        bands: [{ h: 0.15, c: [70, 44, 34] }, { h: 0.45, c: [150, 70, 45] }, { h: 0.70, c: [190, 150, 110] }, { h: 0.90, c: [130, 110, 90] }], note: 'Wooded trailhead, iron-rich' }
    ]
  }
];

let caseIdx = 0;
let selected = 3;        // index into samples of the selected REFERENCE (default C)
let showScore = false;
let scoreBtn, newCaseBtn;
let panelRects = [];     // {x,y,w,h,kind} for hover + click hit-testing
let colRects = [];       // {x,w,sampleIdx} per panel sub-column for click selection

function samples() { return CASES[caseIdx].samples; }

function setup() {
  updateCanvasSize();
  const cnv = createCanvas(canvasWidth, canvasHeight);
  cnv.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  scoreBtn = createButton('Match Score');
  scoreBtn.mousePressed(() => { showScore = true; });

  newCaseBtn = createButton('New Case');
  newCaseBtn.mousePressed(() => {
    caseIdx = (caseIdx + 1) % CASES.length;
    selected = 3; showScore = false;
  });
  positionControls();
}

function positionControls() {
  const by = drawHeight + 12;
  scoreBtn.position(margin + 360, by);
  newCaseBtn.position(margin + 470, by);
}
function updateCanvasSize() {
  const c = document.querySelector('main');
  if (c) canvasWidth = Math.max(800, Math.floor(c.getBoundingClientRect().width));
}
function windowResized() {
  updateCanvasSize(); resizeCanvas(canvasWidth, canvasHeight); positionControls();
}

function matchScore(ref) {
  const q = samples()[0];
  // color similarity
  let cd = 0; for (let i = 0; i < 3; i++) cd += (q.col[i] - ref.col[i]) ** 2;
  cd = Math.sqrt(cd); const colSim = constrain(1 - cd / 180, 0, 1);
  // pH similarity
  const phSim = constrain(1 - Math.abs(q.pH - ref.pH) / 3, 0, 1);
  // particle overlap (Bray-Curtis similarity)
  let diff = 0; for (let i = 0; i < 4; i++) diff += Math.abs(q.particles[i] - ref.particles[i]);
  const partSim = constrain(1 - diff / 200, 0, 1);
  // band match fraction
  let matched = 0;
  for (const b of ref.bands) if (questionedBandMatch(b)) matched++;
  const bandSim = ref.bands.length ? matched / ref.bands.length : 0;
  const total = (colSim + phSim + partSim + bandSim) / 4;
  return { total: Math.round(total * 100), colSim, phSim, partSim, bandSim };
}

function questionedBandMatch(band) {
  const q = samples()[0];
  for (const qb of q.bands) {
    if (Math.abs(qb.h - band.h) < 0.06) {
      let cd = 0; for (let i = 0; i < 3; i++) cd += (qb.c[i] - band.c[i]) ** 2;
      if (Math.sqrt(cd) < 60) return true;
    }
  }
  return false;
}

function draw() {
  background(BG);
  panelRects = []; colRects = [];
  noStroke();
  fill('#e7dcc8'); rect(0, drawHeight, canvasWidth, controlHeight);

  // title + comparison line
  fill(HEAD); textAlign(LEFT, TOP); textSize(20); textStyle(BOLD);
  text('Soil Analysis Comparison Dashboard', margin, 8); textStyle(NORMAL);
  fill(SUB); textSize(12);
  text(CASES[caseIdx].title + '  ·  click a reference column (A, B, C) to compare it with the Questioned sample',
    margin, 33);

  const ref = samples()[selected];
  if (selected > 0) {
    const sc = matchScore(ref);
    fill(INK); textAlign(RIGHT, TOP); textSize(12.5); textStyle(BOLD);
    let label = 'Comparing Questioned vs ' + ref.label;
    text(label, canvasWidth - margin, 10);
    if (showScore) {
      fill(sc.total >= 75 ? GREEN : sc.total >= 50 ? ACCENT : RED);
      textSize(15);
      text('Match Score: ' + sc.total + '%', canvasWidth - margin, 30);
    } else {
      fill(SUB); textSize(11); textStyle(NORMAL);
      text('press Match Score', canvasWidth - margin, 31);
    }
    textStyle(NORMAL); textAlign(LEFT, TOP);
  }

  // 2x2 panel grid
  const top = 56;
  const areaW = canvasWidth - 2 * margin;
  const areaH = drawHeight - top - margin;
  const gap = 12;
  const pw = (areaW - gap) / 2;
  const ph = (areaH - gap) / 2;
  drawColorPanel(margin, top, pw, ph);
  drawParticlePanel(margin + pw + gap, top, pw, ph);
  drawPhPanel(margin, top + ph + gap, pw, ph);
  drawTubePanel(margin + pw + gap, top + ph + gap, pw, ph);

  drawTooltip();
}

function panelFrame(x, y, w, h, title, note, kind) {
  fill(PANEL); stroke(PANEL_E); strokeWeight(1); rect(x, y, w, h, 8); noStroke();
  fill(HEAD); textAlign(LEFT, TOP); textSize(13); textStyle(BOLD);
  text(title, x + 12, y + 9); textStyle(NORMAL);
  panelRects.push({ x, y, w, h, kind });
}

function colCenters(x, w) {
  // 4 sub-columns: Q, A, B, C, leaving left gutter
  const x0 = x + 12, span = w - 24;
  const cw = span / 4;
  const cs = [];
  for (let i = 0; i < 4; i++) cs.push({ cx: x0 + cw * (i + 0.5), x: x0 + cw * i, w: cw });
  return cs;
}

function drawSelHighlight(cx, x, w, top, h, idx) {
  // highlight the column background for questioned + selected reference
  if (idx === 0) { fill(255, 240, 220); rect(x + 2, top, w - 4, h, 5); }
  else if (idx === selected) { fill(225, 238, 247); rect(x + 2, top, w - 4, h, 5); }
}

function registerCols(x, w, top, h) {
  const cs = colCenters(x, w);
  cs.forEach((c, i) => colRects.push({ x: c.x, w: c.w, top, h, sampleIdx: i }));
  return cs;
}

function drawColorPanel(x, y, w, h) {
  panelFrame(x, y, w, h, 'Soil Color (Munsell)', '', 'color');
  const top = y + 30, bodyH = h - 38;
  const cs = registerCols(x, w, top, bodyH);
  const s = samples();
  cs.forEach((c, i) => {
    drawSelHighlight(c.cx, c.x, c.w, top, bodyH, i);
    fill(i === 0 ? ACCENT : (i === selected ? SELED : SUB));
    textAlign(CENTER, TOP); textSize(11); textStyle(BOLD);
    text(s[i].id, c.cx, top + 2); textStyle(NORMAL);
    const sw = Math.min(c.w - 14, 60), sx = c.cx - sw / 2, sy = top + 20;
    fill(s[i].col[0], s[i].col[1], s[i].col[2]); stroke('#6b5a44'); strokeWeight(1);
    rect(sx, sy, sw, 48, 5); noStroke();
    fill(INK); textAlign(CENTER, TOP); textSize(11); textStyle(BOLD);
    text(s[i].munsell, c.cx, sy + 54); textStyle(NORMAL);
    fill(SUB); textSize(9.5);
    text(s[i].mname, c.cx, sy + 68, c.w - 4);
  });
}

function drawParticlePanel(x, y, w, h) {
  panelFrame(x, y, w, h, 'Particle Size (%)', '', 'particle');
  const top = y + 30, bodyH = h - 64;
  const cs = registerCols(x, w, top, bodyH + 6);
  const s = samples();
  const barH = bodyH - 18;
  const barTop = top + 16;
  cs.forEach((c, i) => {
    drawSelHighlight(c.cx, c.x, c.w, top, bodyH + 6, i);
    fill(i === 0 ? ACCENT : (i === selected ? SELED : SUB));
    textAlign(CENTER, TOP); textSize(11); textStyle(BOLD);
    text(s[i].id, c.cx, top); textStyle(NORMAL);
    const bw = Math.min(c.w - 18, 40), bx = c.cx - bw / 2;
    let yy = barTop;
    for (let p = 0; p < 4; p++) {
      const segH = (s[i].particles[p] / 100) * barH;
      fill(PART_COLS[p]); rect(bx, yy, bw, segH);
      if (s[i].particles[p] >= 12) {
        fill('#2a221a'); textAlign(CENTER, CENTER); textSize(9.5);
        text(s[i].particles[p], c.cx, yy + segH / 2);
      }
      yy += segH;
    }
    stroke('#6b5a44'); noFill(); rect(bx, barTop, bw, barH); noStroke();
  });
  // legend
  fill(SUB); textAlign(LEFT, CENTER); textSize(9.5);
  let lx = x + 12; const ly = y + h - 12;
  for (let p = 0; p < 4; p++) {
    fill(PART_COLS[p]); rect(lx, ly - 5, 10, 10, 2);
    fill(SUB); text(PART_NAMES[p], lx + 13, ly);
    lx += 13 + textWidth(PART_NAMES[p]) + 14;
  }
}

function drawPhPanel(x, y, w, h) {
  panelFrame(x, y, w, h, 'pH (0–14)', '', 'ph');
  const top = y + 34;
  const gx = x + 16, gw = w - 32, gy = top, gh = 16;
  // gradient bar red(acid) -> green(neutral) -> blue(base)
  for (let i = 0; i < gw; i++) {
    const t = i / gw; let cc;
    if (t < 0.5) cc = lerpColor(color(206, 70, 55), color(70, 170, 90), t * 2);
    else cc = lerpColor(color(70, 170, 90), color(70, 110, 190), (t - 0.5) * 2);
    stroke(cc); line(gx + i, gy, gx + i, gy + gh);
  }
  noStroke();
  fill(SUB); textAlign(LEFT, TOP); textSize(9);
  text('0 acid', gx, gy + gh + 2);
  textAlign(CENTER, TOP); text('7 neutral', gx + gw / 2, gy + gh + 2);
  textAlign(RIGHT, TOP); text('14 base', gx + gw, gy + gh + 2);
  // markers per sample
  const s = samples();
  const rowTop = gy + gh + 22, rowH = (y + h - 12 - rowTop) / 4;
  s.forEach((sm, i) => {
    const mx = gx + (sm.pH / 14) * gw;
    const ry = rowTop + i * rowH + rowH / 2;
    const isSel = (i === 0 || i === selected);
    stroke(i === 0 ? ACCENT : (i === selected ? SELED : '#b3a78f'));
    strokeWeight(isSel ? 2 : 1);
    line(mx, gy + gh, mx, ry); noStroke();
    fill(i === 0 ? ACCENT : (i === selected ? SELED : SUB));
    circle(mx, ry, isSel ? 11 : 8);
    fill(INK); textAlign(LEFT, CENTER); textSize(10.5);
    textStyle(isSel ? BOLD : NORMAL);
    text(sm.id + '  pH ' + sm.pH.toFixed(1), gx, ry); textStyle(NORMAL);
  });
}

function drawTubePanel(x, y, w, h) {
  panelFrame(x, y, w, h, 'Density-Gradient Bands', '', 'tube');
  const top = y + 32, bodyH = h - 56;
  const cs = registerCols(x, w, top, bodyH);
  const s = samples();
  const tubeTopY = top + 16, tubeH = bodyH - 22;
  const ref = samples()[selected];
  cs.forEach((c, i) => {
    fill(i === 0 ? ACCENT : (i === selected ? SELED : SUB));
    textAlign(CENTER, TOP); textSize(11); textStyle(BOLD);
    text(s[i].id, c.cx, top); textStyle(NORMAL);
    const tw = Math.min(c.w - 20, 30), tx = c.cx - tw / 2;
    // glass tube
    fill('#eef3f5'); stroke('#9fb0b8'); strokeWeight(1);
    rect(tx, tubeTopY, tw, tubeH, tw / 2); noStroke();
    // bands
    for (const b of s[i].bands) {
      const by = tubeTopY + tubeH - b.h * tubeH;
      fill(b.c[0], b.c[1], b.c[2]); rect(tx + 1, by - 5, tw - 2, 10);
      // when this is the selected reference, mark match vs questioned
      if (i === selected && selected > 0) {
        const ok = questionedBandMatch(b);
        stroke(ok ? GREEN : RED); strokeWeight(2.5); noFill();
        rect(tx - 1, by - 6, tw + 2, 12); noStroke();
      }
    }
  });
  // legend for match coloring
  if (selected > 0) {
    fill(GREEN); textAlign(LEFT, CENTER); textSize(9.5);
    rect(x + 12, y + h - 13, 9, 9, 2);
    fill(SUB); text('band aligns with Questioned', x + 25, y + h - 9);
    fill(RED); rect(x + w / 2 + 20, y + h - 13, 9, 9, 2);
    fill(SUB); text('no match', x + w / 2 + 33, y + h - 9);
  }
}

const PANEL_NOTES = {
  color: 'Munsell color is a quick, reproducible first screen — but many soils share a color, so it can only exclude, not confirm.',
  particle: 'The gravel/sand/silt/clay ratio reflects the parent geology and is hard to fake; a close match across all four fractions is strong evidence.',
  ph: 'Soil pH depends on local minerals and vegetation. A large pH gap is good evidence the samples came from different places.',
  tube: 'A density-gradient column separates soil into mineral bands by specific gravity. Matching band heights and colors is one of the most discriminating soil comparisons.'
};

function drawTooltip() {
  if (mouseY > drawHeight) return;
  for (const p of panelRects) {
    if (mouseX >= p.x && mouseX <= p.x + p.w && mouseY >= p.y && mouseY <= p.y + p.h) {
      const txt = PANEL_NOTES[p.kind]; if (!txt) return;
      textSize(11); const tw = 230;
      const lines = wrapLines(txt, tw - 16);
      const thh = 14 + lines.length * 15;
      let tx = mouseX + 14, ty = mouseY + 6;
      if (tx + tw > canvasWidth) tx = mouseX - tw - 12;
      if (ty + thh > drawHeight) ty = drawHeight - thh - 4;
      fill(40, 32, 24, 240); stroke('#caa46f'); strokeWeight(1);
      rect(tx, ty, tw, thh, 6); noStroke();
      fill('#f6ecda'); textAlign(LEFT, TOP);
      lines.forEach((ln, i) => text(ln, tx + 8, ty + 8 + i * 15));
      return;
    }
  }
}

function wrapLines(s, maxW) {
  const words = s.split(' '); const lines = []; let cur = '';
  for (const w of words) {
    const test = cur ? cur + ' ' + w : w;
    if (textWidth(test) > maxW) { lines.push(cur); cur = w; } else cur = test;
  }
  if (cur) lines.push(cur);
  return lines;
}

function mousePressed() {
  if (mouseY > drawHeight) return;
  for (const c of colRects) {
    if (mouseX >= c.x && mouseX <= c.x + c.w && mouseY >= c.top && mouseY <= c.top + c.h) {
      if (c.sampleIdx > 0) { selected = c.sampleIdx; showScore = false; }
      return;
    }
  }
}
