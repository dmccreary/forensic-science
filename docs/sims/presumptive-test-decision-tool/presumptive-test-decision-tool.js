// Presumptive-Test Decision Tool — Evaluate (L5)
// CANVAS_HEIGHT: 530
// A Kastle-Meyer presumptive blood-test simulator. Pick a reddish-brown sample,
// run the presumptive (peroxidase) test and watch peroxidase-active samples flash
// bright pink, then run a confirmatory test to learn the truth. Teaches that a
// presumptive test SCREENS (and can give false positives such as horseradish),
// while a confirmatory test CONFIRMS.

let canvasWidth = 900;
const drawHeight = 470;
const controlHeight = 60;
let canvasHeight = drawHeight + controlHeight;
const margin = 15;
const defaultTextSize = 16;

const BG = '#eef1f5';
const SCENE = '#f6f8fb';
const SCENE_E = '#c8d2df';
const PLATE = '#f2f4f7';
const PLATE_E = '#b7c1cf';
const PANEL = '#ffffff';
const PANEL_E = '#c8d2df';
const INK = '#22303f';
const SUB = '#62707f';
const HEAD = '#1f3a5a';
const GREEN = '#2e9e57';
const RED = '#c23c3c';
const ORANGE = '#e8730c';
const PINK = '#ff2d95';
const BLUE = '#2f6fb0';

let sampleSelect, presumptiveBtn, confirmBtn, resetBtn;

// Sample bench. pink = presumptive reaction strength (0..1); isBlood = confirmatory truth.
const samples = [
  { name: 'Stain A (reddish-brown)', short: 'Stain A',      color: '#7a3b2e', pink: 1.0,  isBlood: true,  falsePos: false },
  { name: 'Rust water',             short: 'Rust water',    color: '#b5651d', pink: 0.28, isBlood: false, falsePos: false },
  { name: 'Ketchup',                short: 'Ketchup',       color: '#bd3025', pink: 0.0,  isBlood: false, falsePos: false },
  { name: 'Horseradish extract',    short: 'Horseradish',   color: '#e4dcc0', pink: 1.0,  isBlood: false, falsePos: true  },
  { name: 'Blood simulant',         short: 'Blood simulant',color: '#8a1c1c', pink: 1.0,  isBlood: true,  falsePos: false }
];
let selIndex = 0;

// phase: 'idle' | 'presumptive-run' | 'presumptive-done' | 'confirm-run' | 'confirm-done'
let phase = 'idle';
let animT = 0;            // 0..1 progress of the active animation
const ANIM_FRAMES = 80;

function setup() {
  updateCanvasSize();
  const cnv = createCanvas(canvasWidth, canvasHeight);
  cnv.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  sampleSelect = createSelect();
  for (const s of samples) sampleSelect.option(s.name);
  sampleSelect.selected(samples[0].name);
  sampleSelect.changed(onSampleChange);
  sampleSelect.style('font-size', '13px');

  presumptiveBtn = createButton('Run Presumptive Test');
  presumptiveBtn.mousePressed(runPresumptive);
  confirmBtn = createButton('Run Confirmatory Test');
  confirmBtn.mousePressed(runConfirmatory);
  resetBtn = createButton('Reset');
  resetBtn.mousePressed(resetTest);

  positionControls();
}

function positionControls() {
  const by = drawHeight + 15;
  sampleSelect.position(margin + 58, by);
  presumptiveBtn.position(margin + 250, by - 2);
  confirmBtn.position(margin + 405, by - 2);
  resetBtn.position(margin + 560, by - 2);
}

function updateCanvasSize() {
  const c = document.querySelector('main');
  if (c) canvasWidth = Math.max(800, Math.floor(c.getBoundingClientRect().width));
}

function windowResized() {
  updateCanvasSize(); resizeCanvas(canvasWidth, canvasHeight); positionControls();
}

function onSampleChange() {
  selIndex = samples.findIndex(s => s.name === sampleSelect.value());
  if (selIndex < 0) selIndex = 0;
  resetTest();
}

function runPresumptive() {
  if (phase === 'presumptive-run' || phase === 'confirm-run') return;
  phase = 'presumptive-run';
  animT = 0;
}
function runConfirmatory() {
  if (phase === 'presumptive-run' || phase === 'confirm-run') return;
  if (phase === 'idle') return;   // must screen first
  phase = 'confirm-run';
  animT = 0;
}
function resetTest() {
  phase = 'idle';
  animT = 0;
}

function draw() {
  background(BG);
  // control strip
  noStroke(); fill('#dde3ec'); rect(0, drawHeight, canvasWidth, controlHeight);

  // advance animation
  if (phase === 'presumptive-run' || phase === 'confirm-run') {
    animT += 1 / ANIM_FRAMES;
    if (animT >= 1) {
      animT = 1;
      phase = (phase === 'presumptive-run') ? 'presumptive-done' : 'confirm-done';
    }
  }

  // header
  fill(HEAD); textAlign(LEFT, TOP); textSize(20); textStyle(BOLD);
  text('Kastle-Meyer Presumptive Blood Test', margin, 8); textStyle(NORMAL);
  fill(SUB); textSize(11.5);
  text('Screen a stain for peroxidase activity, then confirm the truth. A pink flash is presumptive — not proof.',
    margin, 33);

  const sceneW = (canvasWidth - 3 * margin) * 0.55;
  drawScene(margin, 54, sceneW, drawHeight - 54 - margin);
  drawPanel(margin * 2 + sceneW, 54, canvasWidth - 3 * margin - sceneW, drawHeight - 54 - margin);
  drawControlLabels();
}

// The current well liquid color: sample color that morphs toward pink when the
// presumptive reaction has developed.
function wellColor() {
  const s = samples[selIndex];
  let strength = 0;
  if (phase === 'presumptive-run') {
    // color starts morphing only in the second half (after the drop lands)
    strength = s.pink * constrain((animT - 0.5) / 0.5, 0, 1);
  } else if (phase === 'presumptive-done' || phase === 'confirm-run' || phase === 'confirm-done') {
    strength = s.pink;
  }
  return lerpColor(color(s.color), color(PINK), strength);
}

function drawScene(ax, ay, aw, ah) {
  fill(SCENE); stroke(SCENE_E); strokeWeight(1); rect(ax, ay, aw, ah, 8); noStroke();
  const s = samples[selIndex];

  const cx = ax + aw / 2;
  const wellR = Math.min(aw, ah) * 0.20;
  const wellY = ay + ah * 0.62;

  // spot plate slab under the well
  const plateW = aw * 0.80, plateH = ah * 0.34;
  const plateX = cx - plateW / 2, plateY = wellY - plateH * 0.42;
  fill(PLATE); stroke(PLATE_E); strokeWeight(1.5); rect(plateX, plateY, plateW, plateH, 10); noStroke();
  // decoy empty wells on the plate
  fill('#e7ebf1'); stroke(PLATE_E); strokeWeight(1);
  circle(plateX + plateW * 0.16, plateY + plateH * 0.5, wellR * 0.7);
  circle(plateX + plateW * 0.84, plateY + plateH * 0.5, wellR * 0.7);
  noStroke();

  // dropper + falling drop (during the presumptive run, first half)
  if (phase === 'presumptive-run') {
    drawDropper(cx, ay + ah * 0.10, wellY - wellR, constrain(animT / 0.5, 0, 1));
  }

  // the active well
  fill('#dfe4ea'); stroke(PLATE_E); strokeWeight(2); circle(cx, wellY, wellR * 2.2); noStroke();
  fill(wellColor()); circle(cx, wellY, wellR * 2.0);
  // highlight
  fill(255, 255, 255, 60); ellipse(cx - wellR * 0.35, wellY - wellR * 0.4, wellR * 0.8, wellR * 0.5);

  // well label
  fill(INK); textAlign(CENTER, TOP); textSize(12.5); textStyle(BOLD);
  text(s.name, cx, wellY + wellR + 12); textStyle(NORMAL);

  // status line above the well
  fill(HEAD); textAlign(CENTER, BOTTOM); textSize(13); textStyle(BOLD);
  let status = 'Sample ready — run the presumptive test';
  if (phase === 'presumptive-run') status = 'Adding reagent + peroxide...';
  else if (phase === 'presumptive-done') status = presumptiveLabel(s);
  else if (phase === 'confirm-run') status = 'Running confirmatory test...';
  else if (phase === 'confirm-done') status = confirmLabel(s);
  fill(statusColor()); text(status, cx, ay + ah * 0.09); textStyle(NORMAL);
}

function statusColor() {
  const s = samples[selIndex];
  if (phase === 'presumptive-done') return s.pink >= 0.9 ? PINK : (s.pink > 0 ? ORANGE : SUB);
  if (phase === 'confirm-done') return s.isBlood ? GREEN : RED;
  return HEAD;
}

function presumptiveLabel(s) {
  if (s.pink >= 0.9) return 'PRESUMPTIVE POSITIVE (pink)';
  if (s.pink > 0)   return 'WEAK / INCONCLUSIVE';
  return 'PRESUMPTIVE NEGATIVE (no color)';
}
function confirmLabel(s) {
  return s.isBlood ? 'CONFIRMED: BLOOD' : 'CONFIRMED: NOT BLOOD';
}

function drawDropper(cx, topY, wellSurfaceY, t) {
  // pipette body
  const bx = cx, by = topY;
  fill('#cfd8e3'); stroke('#9aa6b5'); strokeWeight(1.5);
  rect(bx - 7, by, 14, 34, 4);
  triangle(bx - 7, by + 34, bx + 7, by + 34, bx, by + 48);
  fill('#e8b7c8'); noStroke(); rect(bx - 4, by + 4, 8, 22, 2); // reagent inside
  // falling drop
  const dropY = lerp(by + 50, wellSurfaceY, t);
  fill('#e64a8c'); noStroke();
  ellipse(bx, dropY, 8, 11);
}

function drawPanel(x, y, w, h) {
  fill(PANEL); stroke(PANEL_E); strokeWeight(1); rect(x, y, w, h, 8); noStroke();
  const s = samples[selIndex];
  let cy = y + 12;

  fill(HEAD); textAlign(LEFT, TOP); textSize(14); textStyle(BOLD);
  text('Verdict', x + 14, cy); textStyle(NORMAL); cy += 24;

  // Presumptive result block
  fill(SUB); textSize(11); textStyle(BOLD); text('PRESUMPTIVE (screen)', x + 14, cy); textStyle(NORMAL); cy += 17;
  if (phase === 'idle') {
    cy = wrapText('Select a sample and press "Run Presumptive Test".', x + 14, cy, w - 28, 15);
  } else if (phase === 'presumptive-run') {
    cy = wrapText('Reagent reacting...', x + 14, cy, w - 28, 15);
  } else {
    // colored result chip
    let chip = (s.pink >= 0.9) ? PINK : (s.pink > 0 ? ORANGE : SUB);
    fill(chip); textSize(12.5); textStyle(BOLD);
    text(presumptiveLabel(s), x + 14, cy); textStyle(NORMAL); cy += 19;
    fill(INK); textSize(11.5);
    let msg;
    if (s.pink >= 0.9) {
      msg = 'A pink result means this COULD be blood — but horseradish, some plants, and rust can also react. PRESUMPTIVE only: it screens, it does not identify.';
    } else if (s.pink > 0) {
      msg = 'Only a faint/slow reaction. Not a clear positive — treat as inconclusive and interpret with care.';
    } else {
      msg = 'No color change. This stain does not react in the screen; you can set it aside.';
    }
    cy = wrapText(msg, x + 14, cy, w - 28, 15);
  }
  cy += 8;

  stroke(PANEL_E); line(x + 12, cy, x + w - 12, cy); noStroke(); cy += 12;

  // Confirmatory result block
  fill(SUB); textSize(11); textStyle(BOLD); text('CONFIRMATORY (identify)', x + 14, cy); textStyle(NORMAL); cy += 17;
  if (phase === 'idle' || phase === 'presumptive-run') {
    cy = wrapText('Run the presumptive test first.', x + 14, cy, w - 28, 15);
  } else if (phase === 'presumptive-done') {
    fill(BLUE); textSize(11.5);
    cy = wrapText('Now press "Run Confirmatory Test" to learn the truth.', x + 14, cy, w - 28, 15);
  } else if (phase === 'confirm-run') {
    cy = wrapText('Confirming...', x + 14, cy, w - 28, 15);
  } else if (phase === 'confirm-done') {
    let chip = s.isBlood ? GREEN : RED;
    fill(chip); textSize(12.5); textStyle(BOLD);
    text(confirmLabel(s), x + 14, cy); textStyle(NORMAL); cy += 19;
    fill(INK); textSize(11.5);
    let msg;
    if (s.isBlood) {
      msg = 'The confirmatory test identifies this stain as blood — the presumptive screen was correct here.';
    } else if (s.falsePos) {
      msg = 'FALSE POSITIVE! Horseradish is the classic peroxidase false positive: it flashed pink but is NOT blood. This is exactly why a presumptive positive is never called "blood."';
    } else {
      msg = 'Not blood — the confirmatory test agrees with the negative screen.';
    }
    cy = wrapText(msg, x + 14, cy, w - 28, 15);
  }

  // teaching footer, pinned near the bottom
  const fy = y + h - 42;
  stroke(PANEL_E); line(x + 12, fy - 8, x + w - 12, fy - 8); noStroke();
  fill(HEAD); textSize(11.5); textStyle(BOLD);
  text('Presumptive = SCREEN.  Confirmatory = CONFIRM.', x + 14, fy);
  textStyle(NORMAL); fill(SUB); textSize(10.5);
  text('A screen narrows the field; only a confirmatory test identifies.', x + 14, fy + 16);
}

// Simple word-wrap; returns the new y below the block.
function wrapText(str, x, y, maxW, lh) {
  textAlign(LEFT, TOP); textSize(11.5);
  const words = str.split(' ');
  let line = '';
  let cy = y;
  for (const wd of words) {
    const test = line ? line + ' ' + wd : wd;
    if (textWidth(test) > maxW && line) {
      text(line, x, cy); cy += lh; line = wd;
    } else {
      line = test;
    }
  }
  if (line) { text(line, x, cy); cy += lh; }
  return cy;
}

function drawControlLabels() {
  fill(SUB); textAlign(LEFT, CENTER); textSize(12);
  text('Sample', margin, drawHeight + 26);
}
