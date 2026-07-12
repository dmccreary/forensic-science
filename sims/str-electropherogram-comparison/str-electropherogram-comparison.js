// STR Electropherogram Comparison — Analyze (L4)
// CANVAS_HEIGHT: 585
// Compare a crime-scene DNA profile against a chosen suspect across 5 CODIS loci.
// Each locus draws an electropherogram trace: one or two allele peaks at repeat-number
// positions. Overlay or side-by-side the scene and suspect traces, focus one locus or
// view all, then tally matching loci to include or exclude the suspect.

let canvasWidth = 900;
const drawHeight = 520;
const controlHeight = 65;
let canvasHeight = drawHeight + controlHeight;
const margin = 15;
const defaultTextSize = 16;

const BG = '#eef1f5';
const PANEL = '#ffffff';
const PANEL_E = '#c8d2df';
const GRID = '#e2e7ee';
const INK = '#22303f';
const SUB = '#62707f';
const HEAD = '#1f3a5a';
const GREEN = '#2e9e57';
const RED = '#cf3b34';
const CTRL_BG = '#dde3ec';

const SCENE_RGB = [47, 111, 176];   // blue — crime scene
const SUSP_RGB = [232, 115, 12];    // orange — suspect

// Five CODIS loci with the crime-scene genotype (repeat-number alleles).
const LOCI = [
  { name: 'D3S1358', min: 12, max: 19, scene: [15, 16] },
  { name: 'vWA',     min: 11, max: 21, scene: [17, 18] },
  { name: 'FGA',     min: 19, max: 27, scene: [21, 24] },
  { name: 'TH01',    min: 5,  max: 11, scene: [7, 9]  },
  { name: 'D8S1179', min: 11, max: 17, scene: [13, 14] }
];

// Suspect genotypes at each locus. Exactly one (A) matches the scene at all loci.
const SUSPECTS = {
  'Suspect A': [[15, 16], [17, 18], [21, 24], [7, 9],  [13, 14]], // full match
  'Suspect B': [[15, 16], [16, 18], [21, 24], [7, 9],  [13, 15]], // differs vWA, D8S1179
  'Suspect C': [[14, 17], [17, 18], [22, 24], [8, 9],  [13, 14]]  // differs D3, FGA, TH01
};

let suspectSelect, locusSelect, viewBtn, compareBtn;
let displayMode = 'overlay';   // 'overlay' | 'side'
let compared = false;
let verdict = null;            // { text, ok } after Compare Loci

function setup() {
  updateCanvasSize();
  const cnv = createCanvas(canvasWidth, canvasHeight);
  cnv.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  suspectSelect = createSelect();
  suspectSelect.option('Suspect A');
  suspectSelect.option('Suspect B');
  suspectSelect.option('Suspect C');
  suspectSelect.selected('Suspect A');
  suspectSelect.changed(() => { compared = false; verdict = null; });

  locusSelect = createSelect();
  locusSelect.option('All loci');
  for (const L of LOCI) locusSelect.option(L.name);
  locusSelect.selected('All loci');

  viewBtn = createButton('View: Overlay');
  viewBtn.mousePressed(toggleView);

  compareBtn = createButton('Compare Loci');
  compareBtn.mousePressed(runComparison);

  positionControls();
}

function toggleView() {
  displayMode = (displayMode === 'overlay') ? 'side' : 'overlay';
  viewBtn.html('View: ' + (displayMode === 'overlay' ? 'Overlay' : 'Side-by-side'));
}

function runComparison() {
  const alleles = SUSPECTS[suspectSelect.value()];
  let matches = 0;
  let firstDiff = -1;
  for (let i = 0; i < LOCI.length; i++) {
    if (genotypesEqual(LOCI[i].scene, alleles[i])) matches++;
    else if (firstDiff === -1) firstDiff = i;
  }
  compared = true;
  if (matches === LOCI.length) {
    verdict = { text: '5/5 loci match — INCLUSION (cannot exclude ' + suspectSelect.value() + ')', ok: true };
  } else {
    verdict = { text: 'Differs at ' + LOCI[firstDiff].name + ' — EXCLUSION (' +
                       matches + '/5 loci match)', ok: false };
  }
}

function genotypesEqual(a, b) {
  const s1 = [...a].sort((x, y) => x - y);
  const s2 = [...b].sort((x, y) => x - y);
  return s1.length === s2.length && s1.every((v, i) => v === s2[i]);
}

function positionControls() {
  const by = drawHeight + 22;
  suspectSelect.position(margin + 62, by);
  locusSelect.position(margin + 232, by);
  viewBtn.position(margin + 380, by - 1);
  compareBtn.position(margin + 520, by - 1);
}

function updateCanvasSize() {
  const c = document.querySelector('main');
  if (c) canvasWidth = Math.max(800, Math.floor(c.getBoundingClientRect().width));
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  positionControls();
}

function draw() {
  background(BG);
  noStroke();
  fill(CTRL_BG); rect(0, drawHeight, canvasWidth, controlHeight);

  // Header
  fill(HEAD); textAlign(LEFT, TOP); textSize(20); textStyle(BOLD);
  text('STR Electropherogram Comparison', margin, 8); textStyle(NORMAL);
  fill(SUB); textSize(11.5);
  text('Compare the crime-scene DNA profile with a suspect across 5 CODIS loci.', margin, 32);

  drawLegend();
  drawVerdictStrip();
  drawControlLabels();

  // Loci region
  const regionTop = 80;
  const regionBottom = drawHeight - 8;
  const focus = locusSelect.value();

  if (focus === 'All loci') {
    const gap = 8;
    const ph = (regionBottom - regionTop - gap * 4) / 5;
    for (let i = 0; i < LOCI.length; i++) {
      drawLocusPanel(margin, regionTop + i * (ph + gap), canvasWidth - 2 * margin, ph, i);
    }
  } else {
    const i = LOCI.findIndex(L => L.name === focus);
    drawLocusPanel(margin, regionTop, canvasWidth - 2 * margin, regionBottom - regionTop, i);
  }
}

function drawLegend() {
  const lx = canvasWidth - margin - 190;
  const ly = 12;
  noStroke();
  fill(SCENE_RGB[0], SCENE_RGB[1], SCENE_RGB[2]); rect(lx, ly, 16, 12, 2);
  fill(INK); textAlign(LEFT, TOP); textSize(11);
  text('Crime scene', lx + 22, ly);
  fill(SUSP_RGB[0], SUSP_RGB[1], SUSP_RGB[2]); rect(lx, ly + 18, 16, 12, 2);
  fill(INK); text('Suspect', lx + 22, ly + 18);
}

function drawVerdictStrip() {
  const x = margin, y = 50, w = canvasWidth - 2 * margin, h = 24;
  noStroke();
  if (!compared || !verdict) {
    fill('#e7ebf1'); rect(x, y, w, h, 5);
    fill(SUB); textAlign(LEFT, CENTER); textSize(12);
    text('Set the suspect and press "Compare Loci" to tally matching loci and reach a verdict.',
      x + 12, y + h / 2 + 1);
  } else {
    fill(verdict.ok ? '#e4f4ea' : '#fbe6e5'); rect(x, y, w, h, 5);
    fill(verdict.ok ? GREEN : RED);
    circle(x + 16, y + h / 2, 12);
    fill('#fff'); textAlign(CENTER, CENTER); textSize(11); textStyle(BOLD);
    text(verdict.ok ? '✓' : '✗', x + 16, y + h / 2 + 0.5);
    fill(verdict.ok ? '#1c6b3c' : '#9d2a24'); textAlign(LEFT, CENTER); textSize(12.5);
    text(verdict.text, x + 30, y + h / 2 + 1); textStyle(NORMAL);
  }
}

function drawLocusPanel(px, py, pw, ph, li) {
  const L = LOCI[li];
  const susAlleles = SUSPECTS[suspectSelect.value()][li];
  const isMatch = genotypesEqual(L.scene, susAlleles);

  // Panel background
  fill(PANEL); stroke(PANEL_E); strokeWeight(1); rect(px, py, pw, ph, 6); noStroke();

  // Locus label + genotypes
  fill(HEAD); textAlign(LEFT, TOP); textSize(12.5); textStyle(BOLD);
  text(L.name, px + 10, py + 5); textStyle(NORMAL);
  textSize(10.5);
  fill(SCENE_RGB[0], SCENE_RGB[1], SCENE_RGB[2]);
  text('scene ' + L.scene.join(','), px + 92, py + 6);
  fill(SUSP_RGB[0], SUSP_RGB[1], SUSP_RGB[2]);
  text('suspect ' + susAlleles.join(','), px + 178, py + 6);

  // Per-locus match indicator (after Compare)
  if (compared) {
    fill(isMatch ? GREEN : RED);
    circle(px + pw - 58, py + 11, 12);
    fill('#fff'); textAlign(CENTER, CENTER); textSize(9); textStyle(BOLD);
    text(isMatch ? '✓' : '✗', px + pw - 58, py + 11.5);
    fill(isMatch ? GREEN : RED); textAlign(LEFT, CENTER); textSize(10); textStyle(BOLD);
    text(isMatch ? 'match' : 'differs', px + pw - 48, py + 11.5); textStyle(NORMAL);
  }

  // Axis geometry
  const axisLeft = px + 58;
  const axisRight = px + pw - 16;
  const contentTop = py + 20;
  const axisY = py + ph - 14;
  const alleleToX = a => map(a, L.min, L.max, axisLeft, axisRight);

  // Gridlines + repeat-number ticks
  stroke(GRID); strokeWeight(1);
  for (let a = L.min; a <= L.max; a++) line(alleleToX(a), contentTop, alleleToX(a), axisY);
  stroke(PANEL_E); line(axisLeft, axisY, axisRight, axisY); noStroke();
  fill(SUB); textAlign(CENTER, TOP); textSize(8.5);
  for (let a = L.min; a <= L.max; a++) text(a, alleleToX(a), axisY + 2);

  if (displayMode === 'overlay') {
    const maxH = axisY - contentTop - 14;
    drawTrace(L.scene, alleleToX, axisY, maxH, SCENE_RGB, li);
    drawTrace(susAlleles, alleleToX, axisY, maxH, SUSP_RGB, li);
  } else {
    // Side-by-side: scene on top half, suspect on bottom half
    const midY = (contentTop + axisY) / 2;
    stroke(GRID); strokeWeight(1); line(axisLeft, midY, axisRight, midY); noStroke();
    const topH = midY - contentTop - 14;
    const botH = axisY - midY - 14;
    fill(SCENE_RGB[0], SCENE_RGB[1], SCENE_RGB[2]); textAlign(LEFT, TOP); textSize(8.5);
    text('scene', px + 8, contentTop);
    fill(SUSP_RGB[0], SUSP_RGB[1], SUSP_RGB[2]);
    text('susp.', px + 8, midY + 2);
    drawTrace(L.scene, alleleToX, midY - 2, topH, SCENE_RGB, li);
    drawTrace(susAlleles, alleleToX, axisY, botH, SUSP_RGB, li);
  }
}

function drawTrace(alleles, alleleToX, baseline, maxH, rgb, li) {
  const h = Math.max(10, maxH);
  for (const a of alleles) {
    const cx = alleleToX(a);
    drawPeak(cx, baseline, h, rgb, 150);
    // allele-number label at apex
    fill(rgb[0], rgb[1], rgb[2]); textAlign(CENTER, BOTTOM); textSize(9.5); textStyle(BOLD);
    text(a, cx, baseline - h - 1); textStyle(NORMAL);
  }
}

function drawPeak(cx, baseline, h, rgb, alpha) {
  const halfW = 24;
  const sigma = 10;
  noStroke();
  fill(rgb[0], rgb[1], rgb[2], alpha);
  beginShape();
  vertex(cx - halfW, baseline);
  for (let x = -halfW; x <= halfW; x += 2) {
    const yy = baseline - h * Math.exp(-(x * x) / (2 * sigma * sigma));
    vertex(cx + x, yy);
  }
  vertex(cx + halfW, baseline);
  endShape(CLOSE);
  // outline for definition
  stroke(rgb[0], rgb[1], rgb[2]); strokeWeight(1.5); noFill();
  beginShape();
  for (let x = -halfW; x <= halfW; x += 2) {
    const yy = baseline - h * Math.exp(-(x * x) / (2 * sigma * sigma));
    vertex(cx + x, yy);
  }
  endShape();
  noStroke();
}

function drawControlLabels() {
  fill(INK); textAlign(LEFT, CENTER); textSize(12);
  const ly = drawHeight + 32;
  text('Suspect', margin, ly);
  text('Locus', margin + 185, ly);
}
