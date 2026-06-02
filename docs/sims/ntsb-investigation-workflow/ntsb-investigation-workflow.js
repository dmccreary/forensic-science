// NTSB Investigation Workflow - p5.js
// CANVAS_HEIGHT: 600
// Bloom Level: Understand (L2) - describe the sequence of an aircraft accident
// investigation from notification to probable-cause determination. The learner
// clicks any stage to read what happens there; a feedback loop shows that analysis
// can send investigators back to the laboratory for more testing.
// MicroSim template version 2026.03

// ---- layout globals ----
let containerWidth;
let canvasWidth = 400;
let drawHeight = 560;
let controlHeight = 40;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 14;
let defaultTextSize = 16;

// ---- state ----
let selected = -1;
let stageRects = [];   // rebuilt each frame for hit-testing
let hoverIndex = -1;

// theme: deep-purple borders, amber hover highlight
const BORDER = '#5e35b1';
const FILL = '#ede7f6';
const HOVER_BG = '#fff3cd';
const HOVER_BD = '#e8870c';
const SELECT_BD = '#311b92';

// ---- stages (index = order) ----
const STAGES = [
  { n: 1, name: 'Notification & Classification',
    detail: 'The event is reported and classified as an accident or incident under ICAO Annex 13, triggering the investigative response.' },
  { n: 2, name: 'Go-Team Launch (IIC)',
    detail: 'The NTSB deploys specialist groups led by an Investigator-in-Charge (IIC) within hours of notification.' },
  { n: 3, name: 'On-Scene Documentation',
    detail: 'The debris field is photographed, mapped, and surveyed before anything is moved, preserving the spatial record of the wreckage.' },
  { n: 4, name: 'Recorder Recovery (FDR / CVR)',
    detail: 'The flight data and cockpit voice recorders are located — via the underwater locator beacon if submerged — and read out.' },
  { n: 5, name: 'Wreckage Reconstruction',
    detail: 'Recovered pieces are reassembled onto a frame or hangar floor to reveal the origin and sequence of the failure.' },
  { n: 6, name: 'Laboratory Analysis',
    detail: 'Metallurgy, fire and explosive chemistry, aircraft systems, and pathology examine the physical evidence in detail.' },
  { n: 7, name: 'Human Factors & Survivability',
    detail: 'Crew performance, injuries, and survivability are evaluated — fatigue, training, workload, restraints, and escape paths.' },
  { n: 8, name: 'Analysis & Correlation',
    detail: 'All evidence streams are correlated and hypotheses are tested against the data. This stage can send investigators back to the laboratory for more testing.' },
  { n: 9, name: 'Probable Cause & Safety Recommendations',
    detail: 'The final report states the probable cause, contributing factors, and safety recommendations intended to prevent recurrence.' }
];

// feedback arrow: from stage index 7 (Analysis & Correlation) back to index 5 (Laboratory Analysis)
const FB_FROM = 7;
const FB_TO = 5;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);
  describe('Top-to-bottom flowchart of an NTSB aircraft accident investigation, from notification through probable cause. Click any of the nine stages to read what happens there. A feedback arrow shows that analysis can send investigators back to laboratory testing.', LABEL);
}

function draw() {
  updateCanvasSize();
  stageRects = [];
  hoverIndex = -1;

  // regions
  noStroke();
  fill('#f5f3fb');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // title
  noStroke();
  fill('#311b92');
  textAlign(LEFT, TOP);
  textSize(18);
  text('NTSB Investigation Workflow', margin, 8);
  textSize(12);
  fill('#495057');
  text('Notification → probable cause — click a stage to see what happens there', margin, 30);

  const leftColW = canvasWidth * 0.46 - margin - 4;
  drawFlowchart(margin + 22, leftColW);   // +22 leaves a gutter for the feedback arrow

  const rightX = canvasWidth * 0.46 + 4;
  const rightW = canvasWidth - rightX - margin;
  drawDetailPanel(rightX, rightW);

  drawControlLabel();
}

function drawFlowchart(x, w) {
  const top = 50;
  const bottom = drawHeight - 10;
  const n = STAGES.length;
  const gap = 8;
  const barH = (bottom - top - gap * (n - 1)) / n;

  // store geometry first (needed for feedback arrow)
  for (let i = 0; i < n; i++) {
    const y = top + i * (barH + gap);
    stageRects.push({ x: x, y: y, w: w, h: barH, i: i });
  }

  // hover detection
  for (let i = 0; i < n; i++) {
    const r = stageRects[i];
    if (mouseX >= r.x && mouseX <= r.x + r.w && mouseY >= r.y && mouseY <= r.y + r.h && mouseY < drawHeight) {
      hoverIndex = i;
    }
  }

  // down arrows between bars
  for (let i = 0; i < n - 1; i++) {
    const r = stageRects[i];
    const ax = x + 18;
    stroke('#9b8bc4');
    strokeWeight(1.5);
    line(ax, r.y + barH, ax, r.y + barH + gap);
    noStroke();
    fill('#9b8bc4');
    triangle(ax - 3, r.y + barH + gap - 3, ax + 3, r.y + barH + gap - 3, ax, r.y + barH + gap);
  }

  // feedback arrow (Analysis & Correlation -> Laboratory Analysis), drawn in left gutter
  drawFeedbackArrow(x, barH);

  // bars
  for (let i = 0; i < n; i++) {
    const s = STAGES[i];
    const r = stageRects[i];
    const hovering = (hoverIndex === i);

    const bg = hovering ? HOVER_BG : FILL;
    const bd = (i === selected) ? SELECT_BD : (hovering ? HOVER_BD : BORDER);

    stroke(bd);
    strokeWeight(i === selected ? 3 : (hovering ? 2.5 : 1.4));
    fill(bg);
    rect(r.x, r.y, w, barH, 7);

    // number disc
    noStroke();
    fill(bd);
    ellipse(r.x + 17, r.y + barH / 2, 22, 22);
    fill('white');
    textAlign(CENTER, CENTER);
    textSize(12);
    textStyle(BOLD);
    text(s.n, r.x + 17, r.y + barH / 2);
    textStyle(NORMAL);

    // stage name
    fill('#212529');
    textAlign(LEFT, CENTER);
    textSize(barH < 44 ? 11 : 12);
    text(s.name, r.x + 34, r.y, w - 40, barH);
  }
}

function drawFeedbackArrow(x, barH) {
  const from = stageRects[FB_FROM];
  const to = stageRects[FB_TO];
  if (!from || !to) return;
  const gx = x - 12;                       // gutter x to the left of the bars
  const y1 = from.y + barH / 2;
  const y2 = to.y + barH / 2;
  stroke('#b00020');
  strokeWeight(1.5);
  noFill();
  // out to gutter, up, back in
  line(from.x, y1, gx, y1);
  line(gx, y1, gx, y2);
  line(gx, y2, to.x, y2);
  // arrowhead into the "to" bar
  noStroke();
  fill('#b00020');
  triangle(to.x, y2, to.x - 6, y2 - 4, to.x - 6, y2 + 4);
  // label
  push();
  translate(gx - 3, (y1 + y2) / 2);
  rotate(-HALF_PI);
  textAlign(CENTER, BOTTOM);
  textSize(9.5);
  fill('#b00020');
  noStroke();
  text('re-test loop', 0, 0);
  pop();
}

function drawDetailPanel(x, w) {
  const top = 50;
  const h = drawHeight - 10 - top;
  noStroke();
  fill('white');
  stroke('#c9b8e0');
  strokeWeight(1);
  rect(x, top, w, h, 8);

  if (selected < 0) {
    noStroke();
    fill('#311b92');
    textAlign(LEFT, TOP);
    textSize(14);
    text('How an investigation unfolds', x + 12, top + 12, w - 24, 50);
    fill('#343a40');
    textSize(12);
    text('Click any numbered stage on the left to read what happens there. The stages run top to bottom from the first notification to the final probable-cause report.',
         x + 12, top + 42, w - 24, 110);

    // feedback legend
    const ly = top + 150;
    stroke('#b00020');
    strokeWeight(1.5);
    line(x + 12, ly + 8, x + 40, ly + 8);
    noStroke();
    fill('#b00020');
    triangle(x + 40, ly + 8, x + 34, ly + 4, x + 34, ly + 12);
    fill('#343a40');
    textAlign(LEFT, CENTER);
    textSize(11.5);
    text('Re-test loop: analysis can send', x + 48, ly + 8);
    text('investigators back to the lab.', x + 48, ly + 24);

    fill('#6c757d');
    textSize(11);
    textAlign(LEFT, TOP);
    text('The careful output is "probable cause," not "proven cause" — a best explanation supported by the evidence.',
         x + 12, ly + 56, w - 24, 80);
    return;
  }

  const s = STAGES[selected];

  // header band
  noStroke();
  fill(BORDER);
  rect(x, top, w, 36, 8, 8, 0, 0);
  fill('white');
  textAlign(LEFT, CENTER);
  textSize(12.5);
  textStyle(BOLD);
  text('Stage ' + s.n + ': ' + s.name, x + 12, top, w - 24, 36);
  textStyle(NORMAL);

  // body
  fill('#212529');
  textAlign(LEFT, TOP);
  textSize(12.5);
  text(s.detail, x + 12, top + 48, w - 24, h - 60);

  // note for the analysis stage about the loop
  if (selected === FB_FROM) {
    const cy = top + h - 56;
    fill('#fdeaec');
    stroke('#e6a3ad');
    strokeWeight(1);
    rect(x + 10, cy, w - 20, 44, 6);
    noStroke();
    fill('#b00020');
    textAlign(LEFT, TOP);
    textSize(11);
    text('↺ This stage can loop back to Laboratory Analysis (stage 6) when a hypothesis needs more testing.',
         x + 16, cy + 8, w - 32, 32);
  }
}

function drawControlLabel() {
  noStroke();
  fill('#495057');
  textAlign(LEFT, CENTER);
  textSize(12);
  const msg = (selected >= 0) ? ('Selected: stage ' + STAGES[selected].n + ' — click again to clear')
                              : 'Click a stage to read what happens there';
  text(msg, margin, drawHeight + controlHeight / 2);
}

// ---- interactions ----
function mousePressed() {
  for (let i = 0; i < stageRects.length; i++) {
    const r = stageRects[i];
    if (mouseX >= r.x && mouseX <= r.x + r.w && mouseY >= r.y && mouseY <= r.y + r.h) {
      selected = (selected === r.i) ? -1 : r.i;
      return;
    }
  }
}

// ---- responsive plumbing ----
function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  redraw();
}
function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
