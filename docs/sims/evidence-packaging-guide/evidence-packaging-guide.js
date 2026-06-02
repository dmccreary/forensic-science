// Evidence Packaging Guide - p5.js
// CANVAS_HEIGHT: 600
// Bloom Level: Apply (L3) - SELECT the correct packaging material for a given
// evidence item. The learner is handed a randomized evidence case card and must
// CHOOSE one of five packaging options; the sim gives immediate correct/incorrect
// feedback with the forensic reason and the courtroom risk of the wrong choice.
// A Reference mode lets students browse every evidence category and its rule.
// MicroSim template version 2026.03

// ---- layout globals (standard MicroSim structure) ----
let containerWidth;
let canvasWidth = 400;
let drawHeight = 510;        // drawing region: case card (top) + feedback panel (bottom)
let cardBottom = 250;        // y boundary between the case card and the choice/feedback area
let controlHeight = 90;      // two rows of controls
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 20;
let defaultTextSize = 16;

// ---- controls (p5 built-ins only) ----
let modeSelect, refSelect, nextButton, resetButton;

// ---- packaging options (the five choices the learner picks from) ----
// id is the stable key; label is the button text; tip is the hover one-liner.
const PACKAGING = [
  { id: 'paper',     label: 'Paper bag / envelope', color: '#2e7d32',
    tip: 'Breathable paper lets moisture escape so biological stains can air-dry.' },
  { id: 'bindle',    label: 'Paper bindle (druggist fold)', color: '#1565c0',
    tip: 'A folded glassine packet that traps loose particles without losing them.' },
  { id: 'rigid',     label: 'Rigid box / tube', color: '#5d4037',
    tip: 'A puncture-proof container for sharps, firearms, and fragile casts.' },
  { id: 'biohazard', label: 'Biohazard container', color: '#e65100',
    tip: 'Orange/red labeled container required by OSHA for infectious material.' },
  { id: 'faraday',   label: 'Antistatic / Faraday bag', color: '#455a64',
    tip: 'Blocks static and radio signals so a device cannot be wiped remotely.' }
];

// ---- evidence items (correct answer + forensic reason + courtroom risk) ----
// Ground truth matches the Chapter 2 packaging table exactly.
const ITEMS = [
  {
    name: 'Wet bloodstained shirt',
    detail: 'A shirt soaked with fresh blood, collected from a bedroom floor.',
    accent: '#c62828', module: 'Biological',
    correct: 'paper',
    reason: 'Wet biological evidence goes in breathable paper so it can air-dry; ' +
            'paper lets moisture escape while plastic seals it in.',
    wrongPick: 'faraday',
    risk: 'Sealed in airtight plastic, wet blood grows mold within 24-48 hours and ' +
          'the DNA degrades - a degraded profile can be challenged or useless in court.'
  },
  {
    name: 'Dried saliva swab',
    detail: 'A cotton swab of dried saliva taken from a drinking glass, already air-dried.',
    accent: '#c62828', module: 'Biological',
    correct: 'paper',
    reason: 'Dried biological evidence still goes in paper, which prevents ' +
            'rehydration and reduces contamination.',
    wrongPick: 'faraday',
    risk: 'Airtight plastic can trap residual moisture and promote microbial growth, ' +
          'putting the recoverable DNA at risk.'
  },
  {
    name: 'Loose carpet fibers',
    detail: 'A few millimetre-long synthetic fibers lifted from a windowsill.',
    accent: '#1565c0', module: 'Trace',
    correct: 'bindle',
    reason: 'Tiny dry particles are folded into a paper bindle (druggist fold), then ' +
            'placed in a labeled envelope so nothing escapes.',
    wrongPick: 'paper',
    risk: 'Loose in a bag or envelope, fibers shift, clump, or leak out through a ' +
          'corner - the trace may be lost or its origin disputed.'
  },
  {
    name: 'Glass fragments',
    detail: 'A pinch of small glass shards swept from beneath a broken window.',
    accent: '#1565c0', module: 'Trace',
    correct: 'bindle',
    reason: 'Dry trace like glass is secured in a druggist fold so the fragments stay ' +
            'contained for refractive-index comparison.',
    wrongPick: 'rigid',
    risk: 'Loose fragments rattling in a large container can be lost or cross-contaminate ' +
          'other evidence, weakening any glass-source comparison.'
  },
  {
    name: 'Kitchen knife',
    detail: 'A blood-tipped kitchen knife recovered from a sink.',
    accent: '#5d4037', module: 'Sharp',
    correct: 'rigid',
    reason: 'Sharp objects go in a rigid box or tube so the blade cannot puncture the ' +
            'packaging or injure a handler.',
    wrongPick: 'paper',
    risk: 'A blade through a paper or plastic bag can cut an evidence handler ' +
          '(a safety violation) and let the bloodstain be smeared or lost.'
  },
  {
    name: 'Handgun',
    detail: 'A pistol found beside a doorway; treated as loaded until cleared.',
    accent: '#5d4037', module: 'Firearm',
    correct: 'rigid',
    reason: 'Firearms go in a rigid pistol box that immobilizes the weapon and ' +
            'prevents accidental discharge during transport.',
    wrongPick: 'biohazard',
    risk: 'A firearm loose in a soft container can shift, discharge, or lose surface ' +
          'trace and serial-number detail - a serious safety and evidentiary failure.'
  },
  {
    name: 'Used hypodermic needle',
    detail: 'A discarded syringe with visible blood, suspected infectious.',
    accent: '#e65100', module: 'Biohazard',
    correct: 'biohazard',
    reason: 'Sharp infectious material goes in a labeled biohazard sharps container - ' +
            'an OSHA Bloodborne Pathogens requirement that protects every handler.',
    wrongPick: 'paper',
    risk: 'An unlabeled or soft package exposes evidence custodians to needle-stick ' +
          'injury and bloodborne disease, and violates 29 CFR 1910.1030.'
  },
  {
    name: 'Suspect smartphone',
    detail: 'A powered-on phone seized from a suspect, still connected to a network.',
    accent: '#455a64', module: 'Digital',
    correct: 'faraday',
    reason: 'Digital devices go in an antistatic / Faraday bag that blocks signals so ' +
            'the data cannot be remotely wiped or altered.',
    wrongPick: 'paper',
    risk: 'Left able to receive signals, the phone can be remote-wiped or locked, ' +
          'and static can corrupt the storage - the digital evidence is destroyed.'
  },
  {
    name: 'Shoe-print plaster cast',
    detail: 'A hardened plaster cast of a footwear impression from soft soil.',
    accent: '#1565c0', module: 'Impression',
    correct: 'rigid',
    reason: 'Fragile impression casts go in a padded rigid box that cushions them ' +
            'against impacts during transport.',
    wrongPick: 'bindle',
    risk: 'A cast packed loosely or in soft wrap can crack or chip, destroying the ' +
          'unique tread detail used for comparison.'
  }
];

// ---- state ----
let mode = 'Practice';      // 'Practice' | 'Reference'
let order = [];             // shuffled item indices for practice
let orderPos = 0;
let current = 0;            // index into ITEMS for the active practice/reference item
let chosen = null;          // packaging id the learner picked this round (null = unanswered)
let isCorrect = false;
let score = 0;
let attempts = 0;
let hoverPkg = -1;          // packaging button index under the mouse (-1 = none)
let choiceRects = [];       // clickable rects for the 5 packaging choices (drawing region)

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  modeSelect = createSelect();
  modeSelect.option('Practice');
  modeSelect.option('Reference');
  modeSelect.selected('Practice');
  modeSelect.position(70, drawHeight + 12);
  modeSelect.changed(onModeChange);

  refSelect = createSelect();
  ITEMS.forEach(function (it) { refSelect.option(it.name); });
  refSelect.selected(ITEMS[0].name);
  refSelect.position(300, drawHeight + 12);
  refSelect.changed(onRefChange);
  refSelect.hide();

  nextButton = createButton('Next Item >');
  nextButton.position(10, drawHeight + 52);
  nextButton.mousePressed(nextItem);

  resetButton = createButton('Reset Score');
  resetButton.position(120, drawHeight + 52);
  resetButton.mousePressed(resetScore);

  buildOrder();
  current = order[0];

  describe('Evidence Packaging Guide: an evidence item is described on a case card. ' +
    'Click the correct packaging choice from five options to get immediate feedback ' +
    'with the forensic reason and the courtroom risk of a wrong choice. A Reference ' +
    'mode lets you browse every evidence category and its packaging rule.', LABEL);
}

function draw() {
  updateCanvasSize();

  // background regions
  noStroke();
  fill('#f5f6f8');
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  drawHeader();
  drawCaseCard();
  drawChoices();
  drawFeedback();
  drawControlLabels();
  drawHoverTip();
}

// ---- header ----
function drawHeader() {
  noStroke();
  fill('black');
  textAlign(CENTER, TOP);
  textSize(22);
  text('Evidence Packaging Guide', canvasWidth / 2, 8);
  textSize(13);
  fill('#495057');
  const sub = (mode === 'Practice')
    ? 'Select the correct packaging for the evidence item'
    : 'Reference: browse each evidence type and its packaging rule';
  text(sub, canvasWidth / 2, 34);
}

// ---- the evidence case card ----
function drawCaseCard() {
  const it = ITEMS[current];
  const px = margin;
  const pw = canvasWidth - 2 * margin;
  const py = 58;
  const ph = cardBottom - py - 10;

  // accent-colored card
  stroke('#c9d4e5');
  strokeWeight(1);
  fill('white');
  rect(px, py, pw, ph, 8);
  noStroke();
  fill(it.accent);
  rect(px, py, pw, 30, 8, 8, 0, 0);

  // module tag + title bar
  fill('white');
  textAlign(LEFT, CENTER);
  textSize(13);
  text('EVIDENCE ITEM  -  ' + it.module + ' module', px + 12, py + 15);

  // item name
  noStroke();
  fill('#212529');
  textAlign(LEFT, TOP);
  textSize(18);
  text(it.name, px + 12, py + 40);

  // item description (wrapped)
  fill('#495057');
  textSize(13);
  text(it.detail, px + 12, py + 66, pw - 24, ph - 70);

  // prompt line
  fill(it.accent);
  textSize(13);
  const prompt = (chosen === null)
    ? 'Which packaging do you choose? Click an option below.'
    : (isCorrect ? 'Correct choice - read why below.'
                 : 'Not the best choice - read why below.');
  text(prompt, px + 12, py + ph - 24, pw - 24);
}

// ---- the five packaging choices (clickable in the drawing region) ----
function drawChoices() {
  choiceRects = [];
  const it = ITEMS[current];
  const n = PACKAGING.length;
  const gap = 8;
  const totalW = canvasWidth - 2 * margin;
  const bw = (totalW - (n - 1) * gap) / n;
  const bh = 56;
  const y = cardBottom + 2;

  textAlign(CENTER, CENTER);
  for (let i = 0; i < n; i++) {
    const pkg = PACKAGING[i];
    const x = margin + i * (bw + gap);
    choiceRects.push({ x: x, y: y, w: bw, h: bh, idx: i });

    // determine styling based on answer state
    let strokeCol = '#adb5bd';
    let strokeW = 1.5;
    let bg = 'white';
    if (mode === 'Practice' && chosen !== null) {
      if (pkg.id === it.correct) { strokeCol = '#2e7d32'; strokeW = 3; bg = '#e6f4ea'; }
      if (pkg.id === chosen && !isCorrect) { strokeCol = '#c62828'; strokeW = 3; bg = '#fdeaea'; }
    } else if (mode === 'Reference' && pkg.id === it.correct) {
      strokeCol = '#2e7d32'; strokeW = 3; bg = '#e6f4ea';
    } else if (i === hoverPkg && chosen === null && mode === 'Practice') {
      strokeCol = pkg.color; strokeW = 2.5; bg = '#f0f4f8';
    }

    stroke(strokeCol);
    strokeWeight(strokeW);
    fill(bg);
    rect(x, y, bw, bh, 8);

    // colored swatch chip
    noStroke();
    fill(pkg.color);
    rect(x + bw / 2 - 16, y + 8, 32, 8, 3);

    // label (two short lines)
    fill('#212529');
    textSize(11);
    drawWrappedCentered(pkg.label, x + 4, y + 22, bw - 8, 14, 2);

    // correctness marks
    if (mode === 'Practice' && chosen !== null) {
      noStroke();
      textSize(15);
      if (pkg.id === it.correct) { fill('#2e7d32'); textAlign(RIGHT, TOP); text('OK', x + bw - 6, y + 4); }
      if (pkg.id === chosen && !isCorrect) { fill('#c62828'); textAlign(RIGHT, TOP); text('X', x + bw - 6, y + 4); }
      textAlign(CENTER, CENTER);
    }
  }
}

// ---- feedback / reason / courtroom-risk panel ----
function drawFeedback() {
  const it = ITEMS[current];
  const px = margin;
  const pw = canvasWidth - 2 * margin;
  const py = cardBottom + 66;
  const ph = drawHeight - py - margin;

  stroke('#c9d4e5');
  strokeWeight(1);
  fill('white');
  rect(px, py, pw, ph, 8);

  const tx = px + 12;
  const tw = pw - 24;
  let yy = py + 12;

  if (mode === 'Practice' && chosen === null) {
    noStroke();
    fill('#6c757d');
    textAlign(LEFT, TOP);
    textSize(13);
    text('Make your selection above. After you choose, this panel shows the ' +
         'correct packaging, the forensic reason, and the courtroom risk of the ' +
         'wrong choice.', tx, yy, tw, ph - 20);
    return;
  }

  // result banner (practice) or reference header
  noStroke();
  textAlign(LEFT, TOP);
  textSize(14);
  if (mode === 'Practice') {
    fill(isCorrect ? '#2e7d32' : '#c62828');
    text(isCorrect ? 'Correct - good selection.' : 'Reconsider - that packaging is risky here.',
         tx, yy);
  } else {
    fill('#1a3a6c');
    text('Correct packaging: ' + labelFor(it.correct), tx, yy);
  }
  yy += 22;

  // forensic reason
  fill('#1a3a6c');
  textSize(12);
  text('Why this packaging:', tx, yy);
  yy += 16;
  fill('#212529');
  yy = wrappedText(it.reason, tx, yy, tw) + 8;

  // courtroom risk
  fill('#8a2000');
  textSize(12);
  text('Courtroom risk of the wrong choice:', tx, yy);
  yy += 16;
  fill('#7a1010');
  wrappedText(it.risk, tx, yy, tw);
}

// ---- control-area labels ----
function drawControlLabels() {
  noStroke();
  fill('#495057');
  textAlign(LEFT, CENTER);
  textSize(13);
  text('Mode:', 10, drawHeight + 24);

  if (mode === 'Practice') {
    fill('#1a3a6c');
    textSize(13);
    const acc = (attempts > 0) ? Math.round((score / attempts) * 100) : 0;
    text('Score: ' + score + ' / ' + attempts + (attempts > 0 ? '  (' + acc + '%)' : ''),
         300, drawHeight + 24, canvasWidth - 310);
  } else {
    fill('#495057');
    textSize(13);
    text('Item:', 258, drawHeight + 24);
  }

  fill('#6c757d');
  textSize(11);
  const hint = (mode === 'Practice')
    ? 'Click a packaging option above, then press Next Item for a new evidence item.'
    : 'Pick an item from the dropdown; the correct packaging is highlighted in green.';
  text(hint, 240, drawHeight + 64, canvasWidth - 250);
}

// ---- hover tip for packaging choices ----
function drawHoverTip() {
  if (hoverPkg < 0) return;
  const pkg = PACKAGING[hoverPkg];
  const r = choiceRects[hoverPkg];
  if (!r) return;
  const tw = 220;
  const th = 52;
  let tx = r.x + r.w / 2 - tw / 2;
  tx = constrain(tx, margin, canvasWidth - margin - tw);
  let ty = r.y - th - 6;
  if (ty < cardBottom) ty = r.y + r.h + 6;

  noStroke();
  fill(33, 37, 41, 235);
  rect(tx, ty, tw, th, 6);
  fill('white');
  textAlign(LEFT, TOP);
  textSize(12);
  textStyle(BOLD);
  text(pkg.label, tx + 8, ty + 6, tw - 16);
  textStyle(NORMAL);
  textSize(11);
  fill('#e0e0e0');
  text(pkg.tip, tx + 8, ty + 22, tw - 16, th - 26);
}

// ---- text helpers ----
function wrappedText(str, x, y, w) {
  noStroke();
  textAlign(LEFT, TOP);
  textSize(12);
  text(str, x, y, w, drawHeight - y);
  const charsPerLine = max(1, Math.floor(w / 6.2));
  const lines = Math.ceil(str.length / charsPerLine);
  return y + lines * 15;
}

function drawWrappedCentered(str, x, y, w, lineH, maxLines) {
  const words = str.split(' ');
  const lines = [];
  let line = '';
  for (let i = 0; i < words.length; i++) {
    const test = line ? line + ' ' + words[i] : words[i];
    if (textWidth(test) > w && line) { lines.push(line); line = words[i]; }
    else line = test;
  }
  if (line) lines.push(line);
  const show = lines.slice(0, maxLines);
  const startY = y + (maxLines - show.length) * lineH / 2;
  for (let i = 0; i < show.length; i++) {
    text(show[i], x + w / 2, startY + i * lineH);
  }
}

function labelFor(id) {
  const p = PACKAGING.find(function (q) { return q.id === id; });
  return p ? p.label : id;
}

// ---- interactions ----
function mousePressed() {
  if (mode !== 'Practice' || chosen !== null) return;
  for (let i = 0; i < choiceRects.length; i++) {
    const r = choiceRects[i];
    if (mouseX >= r.x && mouseX <= r.x + r.w && mouseY >= r.y && mouseY <= r.y + r.h) {
      chosen = PACKAGING[i].id;
      isCorrect = (chosen === ITEMS[current].correct);
      attempts++;
      if (isCorrect) score++;
      return;
    }
  }
}

function mouseMoved() {
  hoverPkg = -1;
  if (mouseY < cardBottom || mouseY > cardBottom + 60) return;
  for (let i = 0; i < choiceRects.length; i++) {
    const r = choiceRects[i];
    if (mouseX >= r.x && mouseX <= r.x + r.w && mouseY >= r.y && mouseY <= r.y + r.h) {
      hoverPkg = i;
      return;
    }
  }
}

function nextItem() {
  if (mode === 'Practice') {
    orderPos++;
    if (orderPos >= order.length) buildOrder();
    current = order[orderPos];
    chosen = null;
    isCorrect = false;
  } else {
    // advance the reference dropdown
    let idx = ITEMS.findIndex(function (it) { return it.name === refSelect.value(); });
    idx = (idx + 1) % ITEMS.length;
    refSelect.selected(ITEMS[idx].name);
    current = idx;
  }
}

function resetScore() {
  score = 0;
  attempts = 0;
  buildOrder();
  current = order[0];
  chosen = null;
  isCorrect = false;
}

function onModeChange() {
  mode = modeSelect.value();
  chosen = null;
  isCorrect = false;
  if (mode === 'Reference') {
    refSelect.show();
    current = ITEMS.findIndex(function (it) { return it.name === refSelect.value(); });
    if (current < 0) current = 0;
  } else {
    refSelect.hide();
    buildOrder();
    current = order[0];
  }
}

function onRefChange() {
  current = ITEMS.findIndex(function (it) { return it.name === refSelect.value(); });
  if (current < 0) current = 0;
}

function buildOrder() {
  order = [];
  for (let i = 0; i < ITEMS.length; i++) order.push(i);
  // Fisher-Yates shuffle
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(random(i + 1));
    const t = order[i]; order[i] = order[j]; order[j] = t;
  }
  orderPos = 0;
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
