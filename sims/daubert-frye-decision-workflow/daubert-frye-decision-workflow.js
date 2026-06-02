// Daubert vs. Frye Admissibility Decision Workflow - p5.js
// CANVAS_HEIGHT: 610
// Bloom Level: Analyze (L4) - compare and contrast how the Frye and Daubert standards
// evaluate the SAME scientific evidence, and attribute differences in outcome to the
// structural differences between the two standards.
// The learner picks a forensic technique, steps through each gatekeeper question on
// both trees, then reads the side-by-side outcome comparison.
// MicroSim template version 2026.03

// ---- layout globals ----
let containerWidth;
let canvasWidth = 400;
let drawHeight = 560;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 16;
let defaultTextSize = 16;

// ---- controls ----
let scenarioSelect, nextButton, resetButton;
let step = 0;            // 0 = nothing revealed; advances one node per press
const MAX_STEP = 5;      // Daubert has the most reveals (4 factors + outcome)

let hoverTargets = [];   // rebuilt each frame for tooltip hit-testing

// ---- status styling ----
const STATUS = {
  yes:     { bg: '#d5efd5', border: 'seagreen',  chip: 'Met',      chipColor: '#1d6b3a' },
  no:      { bg: '#f8d7da', border: 'firebrick', chip: 'Not met',  chipColor: '#a02128' },
  partial: { bg: '#fdf0c8', border: 'goldenrod', chip: 'Disputed', chipColor: '#8a6400' },
  info:    { bg: '#e9ecef', border: '#868e96',   chip: 'Note',     chipColor: '#495057' }
};
const OUTCOME_COLOR = {
  'ADMITTED':     { bg: '#d5efd5', border: 'seagreen' },
  'EXCLUDED':     { bg: '#f8d7da', border: 'firebrick' },
  'DISPUTED':     { bg: '#fdf0c8', border: 'goldenrod' },
  'CASE-BY-CASE': { bg: '#fdf0c8', border: 'goldenrod' }
};

// Generic gatekeeper questions (definitions shown on hover)
const FRYE_NODES = [
  { q: 'Novel or already established technique?',
    def: 'Frye first looks at whether the method is new. Established methods are presumed acceptable; truly novel ones must prove they have won acceptance.' },
  { q: 'Generally accepted in its relevant scientific field?',
    def: 'The heart of Frye: evidence is admissible only if the underlying method has gained GENERAL ACCEPTANCE among experts in that field.' }
];
const DAUBERT_NODES = [
  { q: '1. Empirically tested (and testable)?',
    def: 'Daubert factor 1: can the theory or technique be tested, and has it actually been tested?' },
  { q: '2. Peer-reviewed and published?',
    def: 'Daubert factor 2: has the method been subjected to independent peer review and publication?' },
  { q: '3. Known, acceptably low error rate?',
    def: 'Daubert factor 3: is there a known or potential error rate, with standards that control how the technique is used?' },
  { q: '4. Generally accepted in the field?',
    def: 'Daubert factor 4: general acceptance still matters — but it is only ONE factor, never decisive on its own.' }
];

// ---- scenarios ----
const SCENARIOS = [
  {
    name: 'DNA STR profiling',
    frye:   { novelty: { s: 'info', note: 'Mature, established method' },
              accept:  { s: 'yes',  note: 'Universally accepted' },
              outcome: 'ADMITTED' },
    daubert:{ tested: { s: 'yes', note: 'Extensively validated' },
              peer:   { s: 'yes', note: 'Vast peer-reviewed literature' },
              error:  { s: 'yes', note: 'Error rates known and low' },
              accept: { s: 'yes', note: 'Broadly accepted' },
              outcome: 'ADMITTED' },
    key: 'A mature, validated method clears every gate of both standards — Frye and Daubert agree it comes in.'
  },
  {
    name: 'Bite mark analysis',
    frye:   { novelty: { s: 'info', note: 'Long used in courtrooms' },
              accept:  { s: 'partial', note: 'Accepted within forensic odontology — a small, self-selected community' },
              outcome: 'ADMITTED' },
    daubert:{ tested: { s: 'partial', note: 'Few rigorous validation studies' },
              peer:   { s: 'partial', note: 'Limited independent peer review' },
              error:  { s: 'no', note: 'High, poorly characterized error rate' },
              accept: { s: 'partial', note: 'Disputed outside odontology' },
              outcome: 'DISPUTED' },
    key: 'Frye asks only whether odontologists accept it — and they do. Daubert\'s testing and error-rate factors expose weaknesses Frye never examines, so the same evidence is far shakier under Daubert.'
  },
  {
    name: 'Polygraph ("lie detector")',
    frye:   { novelty: { s: 'info', note: 'The 1923 Frye case was itself about the polygraph' },
              accept:  { s: 'no', note: 'Not generally accepted as reliable' },
              outcome: 'EXCLUDED' },
    daubert:{ tested: { s: 'no', note: 'Validity disputed in testing' },
              peer:   { s: 'partial', note: 'Published but heavily contested' },
              error:  { s: 'no', note: 'High error rate' },
              accept: { s: 'no', note: 'Not accepted' },
              outcome: 'EXCLUDED' },
    key: 'The polygraph fails both standards. Fittingly, the Frye "general acceptance" rule was born from a polygraph case in 1923.'
  },
  {
    name: 'Probabilistic genotyping software',
    frye:   { novelty: { s: 'info', note: 'Newer technique, still spreading' },
              accept:  { s: 'partial', note: 'General acceptance still emerging' },
              outcome: 'DISPUTED' },
    daubert:{ tested: { s: 'yes', note: 'Developer + independent validation studies exist' },
              peer:   { s: 'partial', note: 'Growing but incomplete peer review' },
              error:  { s: 'partial', note: 'Error behavior still being characterized' },
              accept: { s: 'partial', note: 'Acceptance emerging' },
              outcome: 'CASE-BY-CASE' },
    key: 'A newer but validated method can satisfy Daubert\'s reliability factors while still failing Frye\'s strict "general acceptance" bar — so Daubert is often the friendlier gate for emerging science.'
  }
];

let sc;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  scenarioSelect = createSelect();
  SCENARIOS.forEach(function (s) { scenarioSelect.option(s.name); });
  scenarioSelect.selected(SCENARIOS[0].name);
  scenarioSelect.position(10, drawHeight + 12);
  scenarioSelect.changed(onScenarioChange);

  nextButton = createButton('Next Step ▸');
  nextButton.position(250, drawHeight + 12);
  nextButton.mousePressed(nextStep);

  resetButton = createButton('Reset');
  resetButton.position(355, drawHeight + 12);
  resetButton.mousePressed(resetSteps);

  sc = SCENARIOS[0];
  describe('Side-by-side comparison of the Frye and Daubert admissibility standards. Choose a forensic technique and step through each gatekeeper question to see whether the evidence is admitted, excluded, or disputed under each standard.', LABEL);
}

function draw() {
  updateCanvasSize();
  hoverTargets = [];

  // regions
  noStroke();
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // title
  noStroke();
  fill('black');
  textAlign(CENTER, TOP);
  textSize(21);
  text('Frye vs. Daubert: Admissibility Workflow', canvasWidth / 2, 8);
  textSize(12);
  fill('#495057');
  text('Technique on trial: ' + sc.name, canvasWidth / 2, 32);

  // columns
  const colGap = 12;
  const colW = (canvasWidth - 2 * margin - colGap) / 2;
  const leftX = margin;
  const rightX = margin + colW + colGap;
  const colTop = 54;
  const colBottom = 440;

  drawFryeColumn(leftX, colW, colTop, colBottom);
  drawDaubertColumn(rightX, colW, colTop, colBottom);

  drawComparison(448);
  drawControlLabel();

  // tooltip drawn last so it sits on top
  drawTooltip();
}

function drawFryeColumn(x, w, top, bottom) {
  drawColumnHeader(x, w, top, 'FRYE  (1923)', '"General acceptance" test');
  const nodeTop = top + 34;
  const region = bottom - nodeTop;
  const n = FRYE_NODES.length;          // 2 question nodes
  const outcomeH = 52;
  const gap = 10;
  const nodeH = (region - outcomeH - gap * n) / n;

  let y = nodeTop;
  // node 0: novelty (info)
  drawNode(x, y, w, nodeH, FRYE_NODES[0].q, step >= 1, sc.frye.novelty.s, sc.frye.novelty.note, FRYE_NODES[0].def);
  y += nodeH + gap;
  // node 1: acceptance
  drawNode(x, y, w, nodeH, FRYE_NODES[1].q, step >= 2, sc.frye.accept.s, sc.frye.accept.note, FRYE_NODES[1].def);
  y += nodeH + gap;
  // outcome
  drawOutcome(x, y, w, outcomeH, step >= 3, sc.frye.outcome);
}

function drawDaubertColumn(x, w, top, bottom) {
  drawColumnHeader(x, w, top, 'DAUBERT  (1993)', 'Reliability "gatekeeper" factors');
  const nodeTop = top + 34;
  const region = bottom - nodeTop;
  const n = DAUBERT_NODES.length;       // 4 factor nodes
  const outcomeH = 48;
  const gap = 8;
  const nodeH = (region - outcomeH - gap * n) / n;
  const keys = ['tested', 'peer', 'error', 'accept'];

  let y = nodeTop;
  for (let i = 0; i < n; i++) {
    const st = sc.daubert[keys[i]];
    drawNode(x, y, w, nodeH, DAUBERT_NODES[i].q, step >= (i + 1), st.s, st.note, DAUBERT_NODES[i].def);
    y += nodeH + gap;
  }
  drawOutcome(x, y, w, outcomeH, step >= 5, sc.daubert.outcome);
}

function drawColumnHeader(x, w, y, title, subtitle) {
  noStroke();
  fill('#1a3a6c');
  rect(x, y, w, 30, 6);
  fill('white');
  textAlign(CENTER, CENTER);
  textSize(14);
  text(title, x + w / 2, y + 11);
  textSize(10);
  fill('#cfe0f5');
  text(subtitle, x + w / 2, y + 23);
}

function drawNode(x, y, w, h, question, revealed, status, note, def) {
  const stl = revealed ? STATUS[status] : { bg: 'white', border: '#ced4da' };
  stroke(stl.border);
  strokeWeight(revealed ? 2 : 1);
  fill(stl.bg);
  rect(x, y, w, h, 8);

  // question text (top of the box)
  noStroke();
  fill(revealed ? '#495057' : '#212529');
  textAlign(LEFT, TOP);
  textStyle(NORMAL);
  textSize(11);
  text(question, x + 8, y + 7, w - 16, 30);

  if (revealed) {
    const st = STATUS[status];
    // colored status chip
    noStroke();
    fill(st.chipColor);
    textStyle(BOLD);
    textSize(11);
    text(st.chip, x + 8, y + 36);
    textStyle(NORMAL);
    // scenario-specific note, wrapped within the remaining box height
    fill('#343a40');
    textSize(10.5);
    text(note, x + 8, y + 50, w - 16, h - 54);
  }

  hoverTargets.push({ x: x, y: y, w: w, h: h, tip: def });
}

function drawOutcome(x, y, w, h, revealed, outcome) {
  if (!revealed) {
    stroke('#ced4da');
    strokeWeight(1);
    fill('white');
    rect(x, y, w, h, 8);
    noStroke();
    fill('#adb5bd');
    textAlign(CENTER, CENTER);
    textSize(12);
    text('outcome…', x + w / 2, y + h / 2);
    return;
  }
  const oc = OUTCOME_COLOR[outcome];
  stroke(oc.border);
  strokeWeight(2.5);
  fill(oc.bg);
  rect(x, y, w, h, 8);
  noStroke();
  fill('#212529');
  textAlign(CENTER, CENTER);
  textSize(10);
  text('RESULT', x + w / 2, y + 12);
  textSize(15);
  textStyle(BOLD);
  text(outcome, x + w / 2, y + h / 2 + 6);
  textStyle(NORMAL);
}

function drawComparison(y) {
  const w = canvasWidth - 2 * margin;
  noStroke();
  fill('white');
  stroke('#c9b8e0');
  strokeWeight(1);
  rect(margin, y, w, drawHeight - y - 8, 8);

  noStroke();
  fill('#6a1b9a');
  textAlign(LEFT, TOP);
  textSize(13);
  text('Compare the outcomes', margin + 10, y + 7);

  if (step < MAX_STEP) {
    fill('#999');
    textSize(12);
    text('Press "Next Step" until both decision trees reach a RESULT, then compare them here.',
         margin + 10, y + 28, w - 20, 40);
    return;
  }

  // outcome chips
  textAlign(LEFT, CENTER);
  let cx = margin + 10;
  const chipY = y + 36;
  cx = drawOutcomeChip('Frye:', sc.frye.outcome, cx, chipY);
  cx += 18;
  drawOutcomeChip('Daubert:', sc.daubert.outcome, cx, chipY);

  noStroke();
  fill('#212529');
  textAlign(LEFT, TOP);
  textSize(11.5);
  text('Key difference: ' + sc.key, margin + 10, y + 54, w - 20, drawHeight - (y + 54) - 12);
}

function drawOutcomeChip(label, outcome, x, y) {
  noStroke();
  fill('#212529');
  textAlign(LEFT, CENTER);
  textSize(12);
  textStyle(BOLD);
  text(label, x, y);
  textStyle(NORMAL);
  const lw = textWidth(label) + 6;
  const oc = OUTCOME_COLOR[outcome];
  const cw = textWidth(outcome) + 16;
  stroke(oc.border);
  strokeWeight(1.5);
  fill(oc.bg);
  rectMode(CORNER);
  rect(x + lw, y - 10, cw, 20, 10);
  noStroke();
  fill('#212529');
  textAlign(CENTER, CENTER);
  textSize(11);
  textStyle(BOLD);
  text(outcome, x + lw + cw / 2, y);
  textStyle(NORMAL);
  return x + lw + cw;
}

function drawControlLabel() {
  noStroke();
  fill('#495057');
  textAlign(LEFT, CENTER);
  textSize(12);
  const status = (step >= MAX_STEP) ? 'all steps revealed' : ('step ' + step + ' of ' + MAX_STEP);
  text('Progress: ' + status, 250, drawHeight + 38);
}

function drawTooltip() {
  for (let i = 0; i < hoverTargets.length; i++) {
    const t = hoverTargets[i];
    if (mouseX >= t.x && mouseX <= t.x + t.w && mouseY >= t.y && mouseY <= t.y + t.h) {
      const tw = min(260, canvasWidth - 24);
      textSize(11.5);
      textAlign(LEFT, TOP);
      const lines = Math.ceil(textWidth(t.tip) / (tw - 16)) + 2;
      const th = 14 + lines * 13;
      let tx = constrain(mouseX + 12, 8, canvasWidth - tw - 8);
      let ty = constrain(mouseY + 12, 8, drawHeight - th - 8);
      noStroke();
      fill(44, 62, 80, 245);
      rect(tx, ty, tw, th, 6);
      fill('white');
      text(t.tip, tx + 8, ty + 7, tw - 16, th - 12);
      break;
    }
  }
}

// ---- interactions ----
function nextStep() {
  if (step < MAX_STEP) step++;
  else resetSteps();
}
function resetSteps() { step = 0; }
function onScenarioChange() {
  sc = SCENARIOS.find(function (s) { return s.name === scenarioSelect.value(); }) || SCENARIOS[0];
  step = 0;
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
