// Minutiae-Tagging Canvas — Analyze (L4)
// CANVAS_HEIGHT: 560
// Tag the minutiae (ridge endings and bifurcations) on a stylized loop fingerprint,
// then search a six-suspect AFIS database. The system RANKS candidates by how many
// of your tagged minutiae overlap each suspect's template — it does not auto-match.
// A human examiner makes the final call.

let canvasWidth = 900;
const drawHeight = 500;
const controlHeight = 60;
let canvasHeight = drawHeight + controlHeight;
const margin = 15;
const defaultTextSize = 16;

const BG = '#eef1f5';
const SCAN = '#eceff4';
const SCAN_E = '#c8d2df';
const SKIN = '#f3e9df';
const RIDGE = '#37324a';
const PANEL = '#ffffff';
const PANEL_E = '#c8d2df';
const INK = '#22303f';
const SUB = '#62707f';
const HEAD = '#1f3a5a';
const GREEN = '#2e9e57';
const ORANGE = '#e8730c';
const RED = '#c23c3c';
const BLUE = '#2f6fb0';
const GOLD = '#e8a712';

let typeSelect, searchBtn, clearBtn, answerBtn;

// Ground-truth minutiae, stored as fractions of the print's bounding box so they
// stay anchored to the print when the canvas resizes.
const gt = [
  { fx: 0.44, fy: 0.27, type: 'bifurcation' },
  { fx: 0.58, fy: 0.39, type: 'ending' },
  { fx: 0.33, fy: 0.48, type: 'ending' },
  { fx: 0.62, fy: 0.60, type: 'bifurcation' },
  { fx: 0.47, fy: 0.71, type: 'bifurcation' },
  { fx: 0.29, fy: 0.36, type: 'ending' }
];

// Six suspect templates: which ground-truth minutiae each candidate's print shares.
// S-3 is the true source (shares all six); the rest overlap only partially.
const candidates = [
  { id: 'S-3', role: 'Catering staff',       tmpl: [0, 1, 2, 3, 4, 5] },
  { id: 'S-1', role: 'Night security guard', tmpl: [0, 1, 2, 3] },
  { id: 'S-4', role: 'Donor / VIP guest',    tmpl: [2, 3, 5] },
  { id: 'S-2', role: 'Visiting curator',     tmpl: [0, 1, 4] },
  { id: 'S-5', role: 'Cleaning contractor',  tmpl: [0, 5] },
  { id: 'S-6', role: 'Museum board member',  tmpl: [1] }
];

let tags = [];          // { fx, fy, type, status, gtIndex }
let showAnswer = false;
let searched = false;
let ranked = [];        // sorted { ...candidate, score }
let print = { px: 0, py: 0, pw: 0, ph: 0, cx: 0, cy: 0 };

function setup() {
  updateCanvasSize();
  const cnv = createCanvas(canvasWidth, canvasHeight);
  cnv.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  typeSelect = createSelect();
  typeSelect.option('Ridge ending');
  typeSelect.option('Bifurcation');
  typeSelect.selected('Ridge ending');
  typeSelect.style('font-size', '13px');

  searchBtn = createButton('Search AFIS Database');
  searchBtn.mousePressed(runSearch);
  clearBtn = createButton('Clear Tags');
  clearBtn.mousePressed(clearTags);
  answerBtn = createButton('Show Answer');
  answerBtn.mousePressed(() => { showAnswer = !showAnswer; });

  positionControls();
}

function positionControls() {
  const by = drawHeight + 15;
  typeSelect.position(margin + 68, by);
  searchBtn.position(margin + 210, by - 2);
  clearBtn.position(margin + 375, by - 2);
  answerBtn.position(margin + 480, by - 2);
}

function updateCanvasSize() {
  const c = document.querySelector('main');
  if (c) canvasWidth = Math.max(800, Math.floor(c.getBoundingClientRect().width));
}
function windowResized() {
  updateCanvasSize(); resizeCanvas(canvasWidth, canvasHeight); positionControls();
}

function selectedType() {
  return typeSelect.value() === 'Bifurcation' ? 'bifurcation' : 'ending';
}

function clearTags() {
  tags = []; searched = false; ranked = [];
}

// Recompute the correct-match set and rank all six candidates by overlap.
function runSearch() {
  const correctIdx = new Set();
  for (const t of tags) if (t.status === 'correct') correctIdx.add(t.gtIndex);
  ranked = candidates.map(c => ({
    ...c,
    score: c.tmpl.filter(i => correctIdx.has(i)).length
  })).sort((a, b) => b.score - a.score || a.id.localeCompare(b.id));
  searched = true;
}

function gtPix(i) {
  return { x: print.px + gt[i].fx * print.pw, y: print.py + gt[i].fy * print.ph };
}

function draw() {
  background(BG);
  noStroke(); fill('#dde3ec'); rect(0, drawHeight, canvasWidth, controlHeight);

  // header
  fill(HEAD); textAlign(LEFT, TOP); textSize(20); textStyle(BOLD);
  text('Minutiae Tagging + AFIS Search', margin, 8); textStyle(NORMAL);
  fill(SUB); textSize(11.5);
  text('Tag the ridge endings and bifurcations, then let AFIS rank the six suspects. You make the final call.',
    margin, 33);

  const scanW = (canvasWidth - 3 * margin) * 0.56;
  drawScan(margin, 54, scanW, drawHeight - 54 - margin);
  drawPanel(margin * 2 + scanW, 54, canvasWidth - 3 * margin - scanW, drawHeight - 54 - margin);
  drawControlLabels();
}

function drawScan(ax, ay, aw, ah) {
  fill(SCAN); stroke(SCAN_E); strokeWeight(1); rect(ax, ay, aw, ah, 8); noStroke();
  fill(HEAD); textAlign(LEFT, TOP); textSize(12.5); textStyle(BOLD);
  text('Cold-case latent print', ax + 12, ay + 10); textStyle(NORMAL);

  // print bounding box (oval)
  const pad = 26;
  const pw = aw - 2 * pad;
  const ph = ah - 2 * pad - 14;
  const px = ax + pad;
  const py = ay + pad + 14;
  print = { px, py, pw, ph, cx: px + pw / 2, cy: py + ph / 2 };

  drawFingerprint(px, py, pw, ph);

  // ground-truth minutiae (revealed by Show Answer)
  if (showAnswer) {
    for (let i = 0; i < gt.length; i++) {
      const p = gtPix(i);
      drawMarker(p.x, p.y, gt[i].type, color(255, 255, 255, 0), color(BLUE), 15, true);
    }
  }

  // player tags
  for (const t of tags) {
    const x = print.px + t.fx * print.pw;
    const y = print.py + t.fy * print.ph;
    let col = t.status === 'correct' ? GREEN : (t.status === 'partial' ? ORANGE : RED);
    drawMarker(x, y, t.type, color(col), color(255), 12, false);
  }
}

// A stylized loop fingerprint: nested recurving ridges around a core, plus a delta.
function drawFingerprint(px, py, pw, ph) {
  const cx = px + pw / 2;
  const coreY = py + ph * 0.40;

  drawingContext.save();
  drawingContext.beginPath();
  drawingContext.ellipse(px + pw / 2, py + ph / 2, pw / 2 - 2, ph / 2 - 2, 0, 0, TWO_PI);
  drawingContext.clip();

  noStroke(); fill(SKIN); rect(px - 4, py - 4, pw + 8, ph + 8);

  stroke(RIDGE); strokeWeight(2.1); noFill();
  const spacing = pw * 0.05;
  const nLoops = 9;
  const legBottom = py + ph + 24;
  for (let k = 0; k < nLoops; k++) {
    const halfW = pw * 0.055 + k * spacing;
    const topY = coreY - (ph * 0.04 + k * spacing);
    beginShape();
    curveVertex(cx - halfW - k * 3, legBottom);
    curveVertex(cx - halfW, coreY);
    curveVertex(cx - halfW * 0.55, topY);
    curveVertex(cx, topY - 4);
    curveVertex(cx + halfW * 0.55, topY);
    curveVertex(cx + halfW, coreY);
    curveVertex(cx + halfW + k * 3, legBottom);
    endShape();
  }

  // delta: short angled ridges meeting at lower-left, outside the loop legs
  const dx = px + pw * 0.20, dy = py + ph * 0.74;
  for (let k = 0; k < 4; k++) {
    const o = k * spacing * 0.8;
    beginShape();
    curveVertex(px - 10, dy + o + 10);
    curveVertex(dx - 6 - o, dy + o);
    curveVertex(dx, dy - o * 0.3);
    curveVertex(dx - 4 - o, dy - o - 6);
    curveVertex(px - 10, dy - o - 20);
    endShape();
  }

  drawingContext.restore();

  // print outline
  noFill(); stroke('#9aa6b5'); strokeWeight(2);
  ellipse(px + pw / 2, py + ph / 2, pw, ph); noStroke();
}

// Draw a minutia marker. ending = circle, bifurcation = triangle.
// dashed = true draws a hollow dashed ring/triangle for ground-truth reveal.
function drawMarker(x, y, type, fillCol, strokeCol, s, dashed) {
  push();
  if (dashed) {
    drawingContext.setLineDash([3, 3]);
    noFill(); stroke(strokeCol); strokeWeight(2);
  } else {
    fill(fillCol); stroke(strokeCol); strokeWeight(2);
  }
  if (type === 'ending') {
    circle(x, y, s);
  } else {
    const r = s * 0.62;
    triangle(x, y - r, x - r, y + r * 0.8, x + r, y + r * 0.8);
  }
  drawingContext.setLineDash([]);
  pop();
}

function drawPanel(x, y, w, h) {
  fill(PANEL); stroke(PANEL_E); strokeWeight(1); rect(x, y, w, h, 8); noStroke();
  let cy = y + 12;
  fill(HEAD); textAlign(LEFT, TOP); textSize(14); textStyle(BOLD);
  text('AFIS Candidate Search', x + 14, cy); textStyle(NORMAL); cy += 24;

  // tag tally
  let cCorrect = 0, cPartial = 0, cSpur = 0;
  for (const t of tags) {
    if (t.status === 'correct') cCorrect++;
    else if (t.status === 'partial') cPartial++;
    else cSpur++;
  }

  if (!searched) {
    fill(INK); textSize(11.5);
    cy = wrapText('Choose a tag type, then click the print to mark each ridge ending and bifurcation you find. Press "Search AFIS Database" to rank the suspects.',
      x + 14, cy, w - 28, 15) + 6;

    fill(SUB); textSize(11); textStyle(BOLD); text('YOUR TAGS', x + 14, cy); textStyle(NORMAL); cy += 18;
    // legend
    drawMarker(x + 22, cy + 6, 'ending', color(GREEN), color(255), 12, false);
    fill(INK); textSize(11); text('correct spot + type: ' + cCorrect, x + 34, cy); cy += 20;
    drawMarker(x + 22, cy + 6, 'ending', color(ORANGE), color(255), 12, false);
    fill(INK); text('right spot, wrong type: ' + cPartial, x + 34, cy); cy += 20;
    drawMarker(x + 22, cy + 6, 'ending', color(RED), color(255), 12, false);
    fill(INK); text('off-ridge (no minutia): ' + cSpur, x + 34, cy); cy += 24;

    fill(SUB); textSize(10.5);
    cy = wrapText('Circle = ridge ending. Triangle = bifurcation. Use "Show Answer" to reveal the ground-truth minutiae.',
      x + 14, cy, w - 28, 14);
  } else {
    // ranked candidate list
    fill(SUB); textSize(10.5);
    cy = wrapText('Ranked by how many of your correctly tagged minutiae overlap each suspect template:',
      x + 14, cy, w - 28, 14) + 4;

    const maxScore = 6;
    const rowH = 30;
    for (let r = 0; r < ranked.length; r++) {
      const c = ranked[r];
      const top = r === 0 && c.score > 0;
      if (top) { fill('#fff6e0'); stroke(GOLD); strokeWeight(1.2); rect(x + 10, cy - 3, w - 20, rowH, 5); noStroke(); }
      fill(top ? '#8a6400' : SUB); textSize(11); textStyle(BOLD);
      text('#' + (r + 1), x + 16, cy); textStyle(NORMAL);
      fill(INK); textSize(11.5); textStyle(BOLD);
      text(c.id, x + 44, cy); textStyle(NORMAL);
      fill(SUB); textSize(10);
      text(c.role, x + 82, cy + 1);
      // score bar
      const barX = x + 16, barY = cy + 16, barW = w - 90;
      fill('#e6ebf1'); rect(barX, barY, barW, 8, 4);
      fill(top ? GOLD : BLUE); rect(barX, barY, barW * (c.score / maxScore), 8, 4);
      fill(INK); textAlign(LEFT, CENTER); textSize(10.5); textStyle(BOLD);
      text(c.score + '/6', barX + barW + 8, barY + 4); textStyle(NORMAL); textAlign(LEFT, TOP);
      cy += rowH + 6;
    }

    if (cCorrect === 0) {
      fill(RED); textSize(11);
      cy = wrapText('No correctly tagged minutiae yet — every score is 0. Clear and tag some real ridge points, then search again.',
        x + 14, cy, w - 28, 14);
    }
  }

  // footer teaching note
  const fy = y + h - 46;
  stroke(PANEL_E); line(x + 12, fy - 8, x + w - 12, fy - 8); noStroke();
  fill(HEAD); textSize(11.5); textStyle(BOLD);
  text('AFIS RANKS — it never auto-matches.', x + 14, fy); textStyle(NORMAL);
  fill(SUB); textSize(10.5);
  wrapText('The computer narrows the field; a human examiner makes the final identification.',
    x + 14, fy + 16, w - 28, 13);
}

function wrapText(str, x, y, maxW, lh) {
  textAlign(LEFT, TOP); textSize(11.5);
  const words = str.split(' ');
  let line = '', cy = y;
  for (const wd of words) {
    const test = line ? line + ' ' + wd : wd;
    if (textWidth(test) > maxW && line) { text(line, x, cy); cy += lh; line = wd; }
    else line = test;
  }
  if (line) { text(line, x, cy); cy += lh; }
  return cy;
}

function drawControlLabels() {
  fill(SUB); textAlign(LEFT, CENTER); textSize(12);
  text('Tag type', margin, drawHeight + 26);
}

// Place a tag where the investigator clicks inside the print oval.
function mousePressed() {
  if (mouseY > drawHeight || mouseY < 54) return;
  const nx = (mouseX - print.cx) / (print.pw / 2);
  const ny = (mouseY - print.cy) / (print.ph / 2);
  if (nx * nx + ny * ny > 1) return;   // outside the print oval

  const type = selectedType();
  const fx = (mouseX - print.px) / print.pw;
  const fy = (mouseY - print.py) / print.ph;

  // score against the nearest ground-truth minutia within tolerance
  const tol = print.pw * 0.09;
  let best = -1, bestD = Infinity;
  for (let i = 0; i < gt.length; i++) {
    const p = gtPix(i);
    const d = dist(mouseX, mouseY, p.x, p.y);
    if (d < bestD) { bestD = d; best = i; }
  }
  let status, gtIndex;
  if (best >= 0 && bestD <= tol) {
    gtIndex = best;
    status = (gt[best].type === type) ? 'correct' : 'partial';
  } else {
    gtIndex = -1; status = 'spurious';
  }
  tags.push({ fx, fy, type, status, gtIndex });
  searched = false;   // a new tag invalidates the previous ranking
}
