// Accumulated Degree Hours (ADH) minimum-PMI Calculator - p5.js
// CANVAS_HEIGHT: 547
// Bloom Level: Apply (L3) - CALCULATE a minimum post-mortem interval (mPMI) from a
// temperature record. The learner sets a 7-day mean-temperature series and a base
// temperature, the sim accumulates degree-hours backward from discovery, and marks
// where cumulative ADH reaches the published threshold for the chosen species/stage.
// MicroSim template version 2026.03

// ---- layout globals ----
let canvasWidth = 400;
let drawHeight = 430;
let controlHeight = 115;     // three rows of controls
let canvasHeight = drawHeight + controlHeight;
let margin = 20;
let defaultTextSize = 16;

// ---- controls ----
let speciesSelect, stageSelect, baseSlider, daySlider, calcButton;

// ---- reference data (illustrative degree-hour requirements, base temp in C) ----
const SPECIES = {
  'Calliphora vicina': { base: 2, stages: { 'First instar': 220, 'Second instar': 480, 'Third instar': 1000, 'Pupa': 2400 } },
  'Lucilia sericata':  { base: 9, stages: { 'First instar': 110, 'Second instar': 250, 'Third instar': 600,  'Pupa': 1500 } },
  'Phormia regina':    { base: 7, stages: { 'First instar': 150, 'Second instar': 320, 'Third instar': 700,  'Pupa': 1700 } }
};
const STAGES = ['First instar', 'Second instar', 'Third instar', 'Pupa'];

// 7 daily mean temperatures, day index 0 = oldest, 6 = discovery day (most recent)
let dayTemps = [22, 24, 21, 23, 25, 20, 19];
let baseTemp = 2;
let selectedDay = 6;
let sweep = 0;          // 0..1 animation of the accumulation sweep
let sweeping = false;

const DISCOVERY = 'Jun 1';  // label for the discovery day (day 6 end)

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  // Row 1: species + stage
  speciesSelect = createSelect();
  Object.keys(SPECIES).forEach(function (s) { speciesSelect.option(s); });
  speciesSelect.selected('Calliphora vicina');
  speciesSelect.position(10, drawHeight + 8);
  speciesSelect.changed(onSpeciesChange);

  stageSelect = createSelect();
  STAGES.forEach(function (s) { stageSelect.option(s); });
  stageSelect.selected('Third instar');
  stageSelect.position(180, drawHeight + 8);
  stageSelect.changed(startSweep);

  calcButton = createButton('Calculate mPMI');
  calcButton.position(330, drawHeight + 8);
  calcButton.mousePressed(startSweep);

  // Row 2: base temperature slider
  baseSlider = createSlider(0, 15, SPECIES['Calliphora vicina'].base, 0.5);
  baseSlider.position(150, drawHeight + 44);
  baseSlider.input(function () { baseTemp = baseSlider.value(); });

  // Row 3: selected-day temperature slider
  daySlider = createSlider(0, 40, dayTemps[selectedDay], 0.5);
  daySlider.position(150, drawHeight + 80);
  daySlider.input(function () { dayTemps[selectedDay] = daySlider.value(); });

  baseTemp = baseSlider.value();
  describe('Forensic entomology minimum post-mortem interval calculator. Set a 7-day mean temperature record and a base temperature, choose a blowfly species and larval stage, and the simulation accumulates degree-hours backward from the discovery day to estimate the earliest possible time of death.', LABEL);
}

function onSpeciesChange() {
  baseTemp = SPECIES[speciesSelect.value()].base;
  baseSlider.value(baseTemp);
  startSweep();
}

function startSweep() {
  sweep = 0;
  sweeping = true;
}

function adhForDay(i) {
  return Math.max(0, dayTemps[i] - baseTemp) * 24;
}

// cumulative ADH accumulated in the most-recent d full days (d = 0..7)
function cumBack(d) {
  let sum = 0;
  for (let k = 0; k < d; k++) sum += adhForDay(6 - k);
  return sum;
}

// returns mPMI in days where cumulative-back ADH first reaches threshold, or null
function computeMpmi(threshold) {
  let cum = 0;
  for (let d = 1; d <= 7; d++) {
    const prev = cum;
    cum += adhForDay(6 - (d - 1));
    if (cum >= threshold) {
      const need = threshold - prev;
      const dayAdh = adhForDay(6 - (d - 1));
      const frac = dayAdh > 0 ? need / dayAdh : 0;
      return (d - 1) + frac;   // days before discovery
    }
  }
  return null;  // threshold not reached within the 7-day record
}

function draw() {
  updateCanvasSize();
  layoutControls();

  // backgrounds
  noStroke();
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  if (sweeping) { sweep = min(1, sweep + 0.03); if (sweep >= 1) sweeping = false; }

  // title
  noStroke();
  fill('black');
  textAlign(CENTER, TOP);
  textSize(20);
  text('Minimum PMI from Accumulated Degree Hours', margin, 8, canvasWidth - 2 * margin);

  const sp = SPECIES[speciesSelect.value()];
  const threshold = sp.stages[stageSelect.value()];

  const splitX = canvasWidth * 0.49;
  drawTempPanel(margin, 52, splitX - margin - 6, 250);
  drawAdhPanel(splitX + 6, 52, canvasWidth - margin - (splitX + 6), 250, threshold);
  drawResultPanel(threshold);
  drawControlLabels();
}

// ---- left: daily temperature bars ----
let tempPanel = { x: 0, y: 0, w: 0, h: 0, plotTop: 0, plotBot: 0 };
function drawTempPanel(x, y, w, h) {
  tempPanel = { x: x, y: y, w: w, h: h, plotTop: y + 24, plotBot: y + h - 22 };
  noStroke();
  fill('#1a3a6c');
  textAlign(LEFT, TOP);
  textSize(13);
  text('Daily Mean Temp (°C) — click a bar to edit', x, y);
  // base label on the header row (right) so bars never paint over it
  fill('#c0392b');
  textSize(10);
  textAlign(RIGHT, TOP);
  text('base ' + baseTemp + '°', x + w, y + 2);

  const tMax = 40;
  const plotTop = tempPanel.plotTop, plotBot = tempPanel.plotBot;
  // base temperature reference line
  const baseY = map(baseTemp, 0, tMax, plotBot, plotTop);
  stroke('#c0392b');
  strokeWeight(1);
  drawingContext.setLineDash([4, 4]);
  line(x, baseY, x + w, baseY);
  drawingContext.setLineDash([]);
  noStroke();

  const slot = w / 7;
  const barW = slot * 0.64;
  for (let i = 0; i < 7; i++) {
    const cx = x + slot * (i + 0.5);
    const topY = map(dayTemps[i], 0, tMax, plotBot, plotTop);
    // bar
    noStroke();
    fill(i === selectedDay ? '#0b5394' : '#4a90d9');
    rect(cx - barW / 2, topY, barW, plotBot - topY);
    if (i === selectedDay) { noFill(); stroke('#073763'); strokeWeight(2); rect(cx - barW / 2, topY, barW, plotBot - topY); }
    // value + day label
    noStroke();
    fill('#212529');
    textAlign(CENTER, BOTTOM);
    textSize(10);
    text(dayTemps[i], cx, topY - 1);
    fill('#6c757d');
    textAlign(CENTER, TOP);
    text(i === 6 ? 'disc.' : '-' + (7 - i) + 'd', cx, plotBot + 3);
  }
  // axis baseline
  stroke('silver'); strokeWeight(1);
  line(x, plotBot, x + w, plotBot);
}

// ---- right: cumulative-back ADH curve ----
function drawAdhPanel(x, y, w, h, threshold) {
  noStroke();
  fill('#a85b00');
  textAlign(LEFT, TOP);
  textSize(13);
  text('Cumulative ADH (back from discovery)', x, y, w);

  const plotTop = y + 24, plotBot = y + h - 22;
  const total = cumBack(7);
  const aMax = Math.max(total, threshold) * 1.1 + 1;

  // axes
  stroke('silver'); strokeWeight(1);
  line(x, plotBot, x + w, plotBot);
  line(x, plotTop, x, plotBot);

  // threshold line
  const thY = map(threshold, 0, aMax, plotBot, plotTop);
  stroke('#c0392b'); strokeWeight(1.5);
  drawingContext.setLineDash([5, 4]);
  line(x, thY, x + w, thY);
  drawingContext.setLineDash([]);
  noStroke(); fill('#c0392b');
  textAlign(RIGHT, BOTTOM); textSize(10);
  text('threshold ' + threshold + ' ADH', x + w, thY - 1);

  // curve: daysBefore 0 (discovery, right) .. 7 (left). value cumBack(d) increasing leftward.
  // x maps daysBefore 0 -> right edge, 7 -> left edge
  const shownMax = sweep * 7;
  stroke('#e67e22'); strokeWeight(2.5); noFill();
  beginShape();
  for (let d = 0; d <= 7; d++) {
    if (d > shownMax) break;
    const px = map(d, 0, 7, x + w, x);
    const py = map(cumBack(d), 0, aMax, plotBot, plotTop);
    vertex(px, py);
  }
  endShape();

  // discovery marker (right)
  noStroke(); fill('#e67e22');
  ellipse(x + w, plotBot, 6, 6);
  fill('#6c757d'); textAlign(RIGHT, TOP); textSize(10);
  text('discovery', x + w, plotBot + 3);
  textAlign(LEFT, TOP);
  text('7 d ago', x, plotBot + 3);

  // crossing marker (mPMI) when sweep complete
  const mpmi = computeMpmi(threshold);
  if (sweep >= 0.999 && mpmi !== null) {
    const cx = map(mpmi, 0, 7, x + w, x);
    const cyTop = plotTop, cyBot = plotBot;
    stroke('#1e8449'); strokeWeight(2);
    drawingContext.setLineDash([3, 3]);
    line(cx, cyTop, cx, cyBot);
    drawingContext.setLineDash([]);
    noStroke(); fill('#1e8449');
    ellipse(cx, thY, 9, 9);
  }
}

// ---- bottom: mPMI result ----
function drawResultPanel(threshold) {
  const y = 312;
  noStroke();
  fill(232, 245, 233);
  stroke('#1e8449'); strokeWeight(1.5);
  rect(margin - 4, y, canvasWidth - 2 * margin + 8, drawHeight - y - 8, 8);
  noStroke();

  const mpmi = computeMpmi(threshold);
  textAlign(LEFT, TOP);
  fill('#0b5d1e');
  textSize(16);
  if (sweep < 0.999) {
    fill('#a85b00');
    text('Press "Calculate mPMI" to accumulate degree-hours back from discovery…', margin + 4, y + 12, canvasWidth - 2 * margin - 4);
    return;
  }
  if (mpmi === null) {
    fill('#c0392b');
    text('Threshold not reached within the 7-day record — extend the record or lower the stage.', margin + 4, y + 10, canvasWidth - 2 * margin - 4);
    return;
  }
  text('Minimum PMI ≈ ' + mpmi.toFixed(1) + ' days', margin + 4, y + 8);
  fill('#212529');
  textSize(13);
  const sp = speciesSelect.value();
  text(stageSelect.value() + ' of ' + sp + ' requires ' + threshold +
       ' ADH above ' + baseTemp + '°C. Counting that many degree-hours back from discovery (' +
       DISCOVERY + ') gives the earliest possible time of death — about ' + mpmi.toFixed(1) +
       ' days before the body was found.',
       margin + 4, y + 32, canvasWidth - 2 * margin - 8, drawHeight - y - 38);
}

function drawControlLabels() {
  noStroke();
  fill('#495057');
  textAlign(LEFT, CENTER);
  textSize(13);
  text('Base T: ' + baseTemp + '°C', 10, drawHeight + 52);
  text('Day ' + (selectedDay === 6 ? 'disc.' : '-' + (7 - selectedDay) + 'd') + ': ' + dayTemps[selectedDay] + '°C', 10, drawHeight + 88);
}

function layoutControls() {
  baseSlider.size(canvasWidth - 150 - margin);
  daySlider.size(canvasWidth - 150 - margin);
}

function mousePressed() {
  // click a temperature bar to select that day
  if (mouseY < tempPanel.plotBot && mouseY > tempPanel.y && mouseX > tempPanel.x && mouseX < tempPanel.x + tempPanel.w) {
    const slot = tempPanel.w / 7;
    const i = Math.floor((mouseX - tempPanel.x) / slot);
    if (i >= 0 && i < 7) {
      selectedDay = i;
      daySlider.value(dayTemps[i]);
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
  const container = document.querySelector('main');
  if (container) canvasWidth = Math.floor(container.getBoundingClientRect().width);
}
