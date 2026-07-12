// Striation-Overlay Comparator — Analyze (L4)
// CANVAS_HEIGHT: 565
// A comparison-microscope striation tool. Two horizontal strips are stacked: the
// crime-scene toolmark on top and a suspect tool's test mark below, each a set of
// parallel vertical striation lines. Pick a suspect tool, slide its strip to align
// the striations with the scene mark, then score the alignment. Exactly one tool's
// individual striation pattern truly matches the crime-scene mark.

let canvasWidth = 900;
const drawHeight = 500;
const controlHeight = 65;
let canvasHeight = drawHeight + controlHeight;
const margin = 15;
const defaultTextSize = 16;

const BG = '#eef1f5';
const PANEL = '#ffffff';
const PANEL_E = '#c8d2df';
const INK = '#22303f';
const SUB = '#62707f';
const HEAD = '#1f3a5a';
const GREEN = '#2e9e57';
const RED = '#cf3b34';
const CTRL_BG = '#dde3ec';
const METAL = '#c9ced6';

const TOL = 7;              // px tolerance for two striations to "coincide"
const SCENE_WIDTH = 6;      // class characteristic: scene mark width in mm

// Crime-scene striation pattern: line positions (fraction of strip width) + depth.
const SCENE = [
  { p: 0.06, d: 0.9 }, { p: 0.11, d: 0.5 }, { p: 0.14, d: 0.8 }, { p: 0.22, d: 1.0 },
  { p: 0.27, d: 0.6 }, { p: 0.35, d: 0.85 }, { p: 0.41, d: 0.5 }, { p: 0.52, d: 0.95 },
  { p: 0.58, d: 0.7 }, { p: 0.63, d: 0.9 }, { p: 0.72, d: 0.55 }, { p: 0.80, d: 0.9 },
  { p: 0.88, d: 0.75 }, { p: 0.93, d: 0.6 }
];

// A different individual pattern (screwdriver) — will not align with the scene.
const TOOL1 = [
  { p: 0.04, d: 0.7 }, { p: 0.10, d: 0.9 }, { p: 0.17, d: 0.6 }, { p: 0.20, d: 0.85 },
  { p: 0.31, d: 0.5 }, { p: 0.38, d: 0.95 }, { p: 0.44, d: 0.7 }, { p: 0.49, d: 0.6 },
  { p: 0.60, d: 0.9 }, { p: 0.67, d: 0.55 }, { p: 0.74, d: 0.85 }, { p: 0.79, d: 0.7 },
  { p: 0.86, d: 0.9 }, { p: 0.91, d: 0.6 }
];

// A bolt cutter — fewer, wider striations AND a different class width (10 mm).
const TOOL3 = [
  { p: 0.08, d: 0.8 }, { p: 0.19, d: 1.0 }, { p: 0.33, d: 0.7 }, { p: 0.48, d: 0.9 },
  { p: 0.55, d: 0.6 }, { p: 0.69, d: 0.85 }, { p: 0.77, d: 0.7 }, { p: 0.90, d: 0.9 }
];

// Exactly one tool (Tool 2) shares the scene's striation pattern (same class width too).
const TOOLS = [
  { name: 'Tool 1 (Screwdriver)', widthMM: 6,  offset: 40, lines: TOOL1, isMatch: false },
  { name: 'Tool 2 (Chisel)',      widthMM: 6,  offset: 90, lines: SCENE, isMatch: true  },
  { name: 'Tool 3 (Bolt cutter)', widthMM: 10, offset: 55, lines: TOOL3, isMatch: false }
];

let toolSelect, shiftSlider, scoreBtn, resetBtn;
let scored = false;
let stripX = margin, stripW = 800;

function setup() {
  updateCanvasSize();
  const cnv = createCanvas(canvasWidth, canvasHeight);
  cnv.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  toolSelect = createSelect();
  for (const t of TOOLS) toolSelect.option(t.name);
  toolSelect.selected(TOOLS[0].name);
  toolSelect.changed(() => { scored = false; });

  shiftSlider = createSlider(-160, 160, 0, 1);
  shiftSlider.style('width', '150px');
  shiftSlider.input(() => { scored = false; });

  scoreBtn = createButton('Score Alignment');
  scoreBtn.mousePressed(() => { scored = true; });

  resetBtn = createButton('Reset');
  resetBtn.mousePressed(() => { shiftSlider.value(0); scored = false; });

  positionControls();
}

function positionControls() {
  const by = drawHeight + 22;
  toolSelect.position(margin + 42, by);
  shiftSlider.position(margin + 300, by + 3);
  scoreBtn.position(margin + 470, by - 1);
  resetBtn.position(margin + 600, by - 1);
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

function currentTool() { return TOOLS[TOOLS.findIndex(t => t.name === toolSelect.value())]; }

// Count scene striations that coincide with a suspect striation at the current shift.
function computeAlignment() {
  const tool = currentTool();
  const shift = shiftSlider.value();
  const coincide = [];
  for (const s of SCENE) {
    const sx = s.p * stripW;
    for (const t of tool.lines) {
      const tx = t.p * stripW + tool.offset + shift;
      if (Math.abs(sx - tx) <= TOL) { coincide.push(s.p); break; }
    }
  }
  const score = Math.round(100 * coincide.length / SCENE.length);
  return { score, coincide, shift, matched: coincide.length };
}

function draw() {
  background(BG);
  noStroke();
  fill(CTRL_BG); rect(0, drawHeight, canvasWidth, controlHeight);

  stripX = margin;
  stripW = canvasWidth - 2 * margin;

  // Header
  fill(HEAD); textAlign(LEFT, TOP); textSize(20); textStyle(BOLD);
  text('Striation-Overlay Comparator', margin, 8); textStyle(NORMAL);
  fill(SUB); textSize(11.5);
  text('Slide the suspect test mark to line its striations up with the crime-scene mark, then score it.',
    margin, 32);

  const tool = currentTool();
  const align = computeAlignment();

  // Strip geometry
  const stripH = 120;
  const sceneY = 66;
  const bridgeY = sceneY + stripH + 10;
  const suspY = bridgeY + 20;

  // Scene strip
  fill(HEAD); textAlign(LEFT, BOTTOM); textSize(12.5); textStyle(BOLD);
  text('Crime-scene toolmark', stripX, sceneY - 3); textStyle(NORMAL);
  drawStrip(stripX, sceneY, stripW, stripH, SCENE, 0, 0);

  // Comparison-microscope bridge (split-field hairline)
  stroke('#9aa6b5'); strokeWeight(1); drawingContext.setLineDash([7, 5]);
  line(stripX, bridgeY + 5, stripX + stripW, bridgeY + 5);
  drawingContext.setLineDash([]); noStroke();
  fill(SUB); textAlign(CENTER, CENTER); textSize(9.5);
  text('comparison-microscope bridge', stripX + stripW / 2, bridgeY + 5);

  // Suspect strip
  fill(HEAD); textAlign(LEFT, BOTTOM); textSize(12.5); textStyle(BOLD);
  text('Suspect tool test mark — ' + tool.name, stripX, suspY - 3); textStyle(NORMAL);
  drawStrip(stripX, suspY, stripW, stripH, tool.lines, tool.offset, align.shift);

  // Green coincidence guides — drawn over the strips so coinciding lines stand out
  if (scored) {
    stroke(46, 158, 87, 150); strokeWeight(4);
    for (const p of align.coincide) {
      const gx = stripX + p * stripW;
      line(gx, sceneY - 4, gx, suspY + stripH + 4);
    }
    noStroke();
  }

  drawInfoPanel(suspY + stripH + 12, align, tool);
  drawControlLabels();
}

function drawStrip(x, y, w, h, lines, offsetPx, shiftPx) {
  // metallic surface
  fill(METAL); noStroke(); rect(x, y, w, h, 4);
  // brushed-metal texture
  stroke(255, 255, 255, 22); strokeWeight(1);
  for (let i = 1; i < 9; i++) line(x + 4, y + i * h / 9, x + w - 4, y + i * h / 9);
  // subtle top/bottom shading
  noStroke(); fill(0, 0, 0, 14); rect(x, y + h - 10, w, 10);
  fill(255, 255, 255, 30); rect(x, y, w, 8);

  // clip striations to the strip
  drawingContext.save();
  drawingContext.beginPath();
  drawingContext.rect(x, y, w, h);
  drawingContext.clip();
  for (const ln of lines) {
    const lx = x + ln.p * w + offsetPx + shiftPx;
    drawStriationLine(lx, y, h, ln.d);
  }
  drawingContext.restore();

  // border
  noFill(); stroke(PANEL_E); strokeWeight(1); rect(x, y, w, h, 4); noStroke();
}

function drawStriationLine(lx, y, h, depth) {
  const dark = lerpColor(color('#8a929c'), color('#262c33'), depth);
  stroke(dark); strokeWeight(1.4 + depth * 2.4); line(lx, y + 5, lx, y + h - 5);
  stroke(255, 255, 255, 70); strokeWeight(1);
  line(lx - 1.4 - depth, y + 5, lx - 1.4 - depth, y + h - 5);
}

function drawInfoPanel(py, align, tool) {
  const x = margin, w = canvasWidth - 2 * margin, h = drawHeight - py - 12;
  fill(PANEL); stroke(PANEL_E); strokeWeight(1); rect(x, py, w, h, 6); noStroke();

  let cy = py + 10;
  // Class characteristic row
  const classOk = tool.widthMM === SCENE_WIDTH;
  fill(HEAD); textAlign(LEFT, TOP); textSize(12); textStyle(BOLD);
  text('Class characteristic (width):', x + 12, cy); textStyle(NORMAL);
  fill(INK); textSize(11.5);
  text('scene ' + SCENE_WIDTH + ' mm   |   ' + tool.name.split(' (')[0] + ' ' + tool.widthMM + ' mm',
    x + 205, cy);
  fill(classOk ? GREEN : RED); textStyle(BOLD); textSize(11.5);
  text(classOk ? '  consistent — cannot exclude on class' : '  EXCLUDED on class (width differs)',
    x + 205 + 175, cy); textStyle(NORMAL);
  cy += 24;

  // Individual / alignment row
  fill(HEAD); textSize(12); textStyle(BOLD);
  text('Individual characteristics (striations):', x + 12, cy); textStyle(NORMAL);
  fill(INK); textSize(11.5);
  text('Shift ' + align.shift + ' px    Coinciding lines ' + align.matched + ' / ' + SCENE.length +
       '    Score ' + align.score + '%', x + 262, cy);
  cy += 26;

  // Verdict
  if (scored) {
    const isMatch = align.score >= 80;
    fill(isMatch ? '#e4f4ea' : '#fbe6e5'); rect(x + 12, cy, 200, 30, 5);
    fill(isMatch ? GREEN : RED); textAlign(LEFT, CENTER); textSize(15); textStyle(BOLD);
    text(isMatch ? '✓  MATCH' : '✗  NO MATCH', x + 24, cy + 16); textStyle(NORMAL);
    fill(SUB); textAlign(LEFT, CENTER); textSize(11);
    text(isMatch
      ? 'Striations line up ridge-for-ridge — individual identification to this tool.'
      : 'Striations do not line up — this tool is not the source of the scene mark.',
      x + 224, cy + 16);
  } else {
    fill(SUB); textAlign(LEFT, TOP); textSize(11.5);
    text('Slide the suspect strip until the striations line up, then press "Score Alignment".',
      x + 12, cy + 4);
    cy += 20;
    fill(SUB); textSize(11);
    text('Remember: class characteristics narrow the field; only matching individual striations identify one tool.',
      x + 12, cy + 4);
  }
}

function drawControlLabels() {
  fill(INK); textAlign(LEFT, CENTER); textSize(12);
  const ly = drawHeight + 32;
  text('Tool', margin, ly);
  text('Shift (align)', margin + 218, ly);
}
