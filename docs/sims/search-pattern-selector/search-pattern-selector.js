// Evidence Search Pattern Selector - p5.js
// CANVAS_HEIGHT: 600
// Bloom Level: Apply (L3) - SELECT the appropriate search pattern for a given
// scene. The learner picks a pattern (grid/line, spiral in/out, zone), a scene
// type, a team size and a speed, then RUNS an animated overhead sweep. Cells go
// gray (unsearched) -> yellow (active) -> green (searched). A live fit rating
// judges the pattern against the scene; a completion summary reports cells
// searched, steps elapsed, and an efficiency rating; a warning appears when too
// many searchers are chosen for the pattern. This makes the coverage / time /
// personnel trade-offs visible rather than abstract.
// MicroSim template version 2026.03

// ---- layout globals (standard MicroSim structure) ----
let containerWidth;
let canvasWidth = 400;
let drawHeight = 500;        // drawing region: grid (left) + info panel (right)
let controlHeight = 100;     // two rows of controls
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 20;
let defaultTextSize = 16;

// region split: grid on the left ~62%, info panel on the right
let panelX;                  // left edge of the right-hand info panel (set in draw)

// ---- controls (p5 built-ins only) ----
let patternSelect, sceneSelect, searcherSlider, speedSlider, runButton, resetButton;

// ---- scene types: grid dimensions + recommended pattern + notes ----
const SCENES = {
  'Indoor room (10 x 10)':       { cols: 10, rows: 10, key: 'indoor', best: 'Grid',          note: 'A small enclosed room. A line then grid sweep gives full, careful coverage; spirals waste effort in a boxy space.' },
  'Outdoor field (20 x 20)':     { cols: 20, rows: 20, key: 'field',  best: 'Grid',          note: 'A medium open area. A grid (double-line) search overlaps two passes for thorough coverage of a measurable rectangle.' },
  'Large outdoor area (30 x 30)':{ cols: 30, rows: 30, key: 'large',  best: 'Zone',          note: 'A large area beyond one team. Divide it into zones, assign a team per zone, and search each zone independently.' }
};

// ---- patterns: how well each fits each scene + how many searchers it uses well ----
// fit: 'good' | 'ok' | 'poor' for each scene key. goodTeam = searcher count the
// pattern uses efficiently (a single continuous path suits 1-2 searchers; zone
// scales with searchers).
const PATTERNS = {
  'Grid': {
    label: 'Grid / Line (double pass)',
    blurb: 'Walk straight parallel lines, then a second set of lines at 90 degrees. The overlap is what catches what one pass misses.',
    fit: { indoor: 'good', field: 'good', large: 'ok' },
    goodTeam: 2,
    bestUse: 'Best for measurable rectangular scenes; most thorough single-team method.'
  },
  'Spiral Inward': {
    label: 'Spiral Inward',
    blurb: 'Start at the outer edge and circle inward toward the center. One searcher follows a single continuous path.',
    fit: { indoor: 'ok', field: 'ok', large: 'poor' },
    goodTeam: 1,
    bestUse: 'Best for small circular scenes with one searcher; hard to keep even with a team.'
  },
  'Spiral Outward': {
    label: 'Spiral Outward',
    blurb: 'Start at a central point of interest (a body, a blast seat) and circle outward. Good when the center matters most.',
    fit: { indoor: 'ok', field: 'ok', large: 'poor' },
    goodTeam: 1,
    bestUse: 'Best when a central focal point is searched first; one searcher, small scenes.'
  },
  'Zone': {
    label: 'Zone / Quadrant',
    blurb: 'Divide the scene into zones and assign a team to each. Coverage scales with the number of searchers.',
    fit: { indoor: 'ok', field: 'good', large: 'good' },
    goodTeam: 6,
    bestUse: 'Best for large scenes; split work across teams to cover ground in parallel.'
  }
};

// possible evidence revealed when a searched cell is clicked
const EVIDENCE = ['fiber', 'footwear impression', 'latent print', 'hair', 'glass fragment',
                  'blood drop', 'spent cartridge', 'soil sample', 'nothing of note'];

// ---- state ----
let cols = 20, rows = 20;
let cells = [];              // cells[r][c] = 'gray' | 'green'  (yellow is computed live)
let searchers = [];          // each: { path:[{r,c}], idx, r, c }
let state = 'ready';         // 'ready' | 'running' | 'paused' | 'done'
let stepAccum = 0;           // fractional steps accumulated between frames
let steps = 0;               // total search steps taken
let totalCells = 0;
let searchedCount = 0;
let clickedCell = null;      // {r,c,evi} after the user clicks a searched cell

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  // Row 1 controls
  patternSelect = createSelect();
  Object.keys(PATTERNS).forEach(function (k) { patternSelect.option(k); });
  patternSelect.selected('Grid');
  patternSelect.position(80, drawHeight + 12);
  patternSelect.changed(onConfigChange);

  sceneSelect = createSelect();
  Object.keys(SCENES).forEach(function (k) { sceneSelect.option(k); });
  sceneSelect.selected('Outdoor field (20 x 20)');
  sceneSelect.position(330, drawHeight + 12);
  sceneSelect.changed(onConfigChange);

  // Row 2 controls
  searcherSlider = createSlider(1, 6, 2, 1);
  searcherSlider.position(90, drawHeight + 50);
  searcherSlider.style('width', '110px');
  searcherSlider.input(onSearcherChange);

  speedSlider = createSlider(1, 10, 4, 1);
  speedSlider.position(300, drawHeight + 50);
  speedSlider.style('width', '110px');

  // Row 3 buttons
  runButton = createButton('Start Search');
  runButton.position(10, drawHeight + 74);
  runButton.mousePressed(toggleRun);

  resetButton = createButton('Reset');
  resetButton.position(120, drawHeight + 74);
  resetButton.mousePressed(resetSearch);

  buildScene();

  describe('Evidence Search Pattern Selector: choose a search pattern (grid, spiral, or zone), ' +
    'a scene type, a team size and a speed, then run an animated overhead sweep. Cells turn from ' +
    'gray to yellow to green as they are searched. A fit rating judges the pattern against the ' +
    'scene, and a summary reports coverage, steps, and an efficiency rating when the search finishes.', LABEL);
}

function draw() {
  updateCanvasSize();
  panelX = Math.floor(canvasWidth * 0.62);

  // background regions
  noStroke();
  fill('#eef1f5');
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // advance animation
  if (state === 'running') advanceSearch();

  drawHeader();
  drawGrid();
  drawInfoPanel();
  drawControlLabels();
}

// ---- header ----
function drawHeader() {
  noStroke();
  fill('black');
  textAlign(CENTER, TOP);
  textSize(22);
  text('Evidence Search Pattern Selector', canvasWidth / 2, 8);
  textSize(13);
  fill('#495057');
  text('Pick a pattern for the scene, then run the sweep and watch the coverage.', canvasWidth / 2, 34);
}

// ---- the overhead grid ----
function gridGeometry() {
  const gx = margin;
  const gy = 58;
  const gw = panelX - margin - 14;
  const gh = drawHeight - gy - margin;
  const cw = gw / cols;
  const ch = gh / rows;
  const cell = Math.min(cw, ch);
  // center the square grid within the available box
  const usedW = cell * cols;
  const usedH = cell * rows;
  return { gx: gx + (gw - usedW) / 2, gy: gy + (gh - usedH) / 2, cell: cell };
}

function drawGrid() {
  const g = gridGeometry();

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      let col = '#d9dde3';                 // unsearched gray
      if (cells[r][c] === 'green') col = '#5cb85c';   // searched green
      fill(col);
      stroke('#c2c7cf');
      strokeWeight(0.5);
      rect(g.gx + c * g.cell, g.gy + r * g.cell, g.cell, g.cell);
    }
  }

  // currently-active cells (yellow) drawn on top
  if (state === 'running' || state === 'paused') {
    for (let i = 0; i < searchers.length; i++) {
      const s = searchers[i];
      if (s.r >= 0 && s.c >= 0) {
        noStroke();
        fill('#ffd633');
        rect(g.gx + s.c * g.cell, g.gy + s.r * g.cell, g.cell, g.cell);
      }
    }
  }

  // searcher dots (one color per searcher)
  for (let i = 0; i < searchers.length; i++) {
    const s = searchers[i];
    if (s.r < 0 || s.c < 0) continue;
    const x = g.gx + (s.c + 0.5) * g.cell;
    const y = g.gy + (s.r + 0.5) * g.cell;
    noStroke();
    fill(searcherColor(i));
    const d = Math.max(6, g.cell * 0.7);
    ellipse(x, y, d, d);
    stroke('white');
    strokeWeight(1);
    noFill();
    ellipse(x, y, d, d);
  }

  // highlight a clicked searched cell + show its evidence
  if (clickedCell) {
    noFill();
    stroke('#1a3a6c');
    strokeWeight(2.5);
    rect(g.gx + clickedCell.c * g.cell, g.gy + clickedCell.r * g.cell, g.cell, g.cell);
  }

  // grid border + zone divider lines for Zone pattern
  noFill();
  stroke('#8a93a0');
  strokeWeight(1.5);
  rect(g.gx, g.gy, g.cell * cols, g.cell * rows);

  if (patternSelect && patternSelect.value() === 'Zone') {
    drawZoneDividers(g);
  }
}

function drawZoneDividers(g) {
  const n = searchers.length > 0 ? searchers.length : searcherSlider.value();
  const zoneCols = zoneSplit(cols, n);
  stroke('#6c757d');
  strokeWeight(1.5);
  drawingContext.setLineDash([5, 4]);
  let acc = 0;
  for (let z = 0; z < zoneCols.length - 1; z++) {
    acc += zoneCols[z];
    const x = g.gx + acc * g.cell;
    line(x, g.gy, x, g.gy + g.cell * rows);
  }
  drawingContext.setLineDash([]);
}

// ---- right-hand info panel ----
function drawInfoPanel() {
  const px = panelX;
  const pw = canvasWidth - panelX - margin;
  const py = 58;

  // panel card
  stroke('#c9d4e5');
  strokeWeight(1);
  fill('white');
  rect(px, py, pw, drawHeight - py - margin, 8);

  const tx = px + 12;
  const tw = pw - 24;
  let yy = py + 12;

  const pat = PATTERNS[patternSelect.value()];
  const scene = SCENES[sceneSelect.value()];

  // pattern name
  noStroke();
  fill('#1a3a6c');
  textAlign(LEFT, TOP);
  textSize(15);
  yy = wrapText(pat.label, tx, yy, tw, 18) + 4;

  // pattern blurb
  fill('#212529');
  textSize(12);
  yy = wrapText(pat.blurb, tx, yy, tw, 15) + 8;

  // ---- live fit rating: pattern vs chosen scene ----
  const fit = pat.fit[scene.key];
  const fitCol = (fit === 'good') ? '#2e7d32' : (fit === 'ok') ? '#b8860b' : '#c62828';
  const fitTxt = (fit === 'good') ? 'GOOD FIT for this scene'
               : (fit === 'ok')   ? 'WORKABLE, not ideal here'
               :                    'POOR FIT for this scene';
  fill(fitCol);
  rect(tx, yy, tw, 22, 4);
  fill('white');
  textSize(12);
  textAlign(CENTER, CENTER);
  text(fitTxt, tx + tw / 2, yy + 11);
  textAlign(LEFT, TOP);
  yy += 30;

  // recommended pattern for this scene
  fill('#495057');
  textSize(11);
  yy = wrapText('Recommended for ' + sceneLabelShort() + ': ' + recommendedLabel(scene), tx, yy, tw, 14) + 6;

  // scene note
  fill('#5a6b7a');
  textSize(11);
  yy = wrapText(scene.note, tx, yy, tw, 14) + 8;

  // ---- searcher warning ----
  const want = searcherSlider.value();
  if (want > pat.goodTeam && pat.goodTeam < 6) {
    fill('#fff3cd');
    stroke('#e0a800');
    strokeWeight(1);
    const wh = 44;
    rect(tx, yy, tw, wh, 4);
    noStroke();
    fill('#7a5b00');
    textSize(11);
    wrapText('Warning: ' + want + ' searchers on a ' + pat.label.split(' ')[0] +
             ' path crowd one route. This pattern uses about ' + pat.goodTeam +
             ' searcher' + (pat.goodTeam > 1 ? 's' : '') + ' efficiently.',
             tx + 6, yy + 5, tw - 12, 13);
    yy += wh + 8;
  }

  // ---- live coverage / summary ----
  stroke('#e2e6ec');
  strokeWeight(1);
  line(tx, yy, tx + tw, yy);
  yy += 8;

  noStroke();
  fill('#1a3a6c');
  textSize(13);
  text('Coverage', tx, yy);
  yy += 18;

  const pct = totalCells > 0 ? Math.round((searchedCount / totalCells) * 100) : 0;
  // progress bar
  fill('#e9ecef');
  rect(tx, yy, tw, 14, 3);
  fill('#5cb85c');
  rect(tx, yy, tw * (pct / 100), 14, 3);
  yy += 20;
  fill('#212529');
  textSize(11);
  text('Cells searched: ' + searchedCount + ' / ' + totalCells + '  (' + pct + '%)', tx, yy);
  yy += 15;
  text('Search steps elapsed: ' + steps, tx, yy);
  yy += 18;

  if (state === 'done') {
    const eff = efficiencyRating(scene, pat, want);
    fill(eff.color);
    textSize(12);
    text('Efficiency: ' + eff.label, tx, yy);
    yy += 16;
    fill('#5a6b7a');
    textSize(11);
    yy = wrapText(eff.note, tx, yy, tw, 13);
  } else if (clickedCell) {
    fill('#1a3a6c');
    textSize(11);
    wrapText('Found at clicked cell: ' + clickedCell.evi + '.', tx, yy, tw, 13);
  } else {
    fill('#9aa3ad');
    textSize(11);
    wrapText('Tip: after a sweep, click any green cell to reveal what was found there.', tx, yy, tw, 13);
  }
}

// ---- control-area labels ----
function drawControlLabels() {
  noStroke();
  fill('#495057');
  textAlign(LEFT, CENTER);
  textSize(13);
  text('Pattern:', 10, drawHeight + 24);
  text('Scene:', 280, drawHeight + 24);

  text('Searchers: ' + searcherSlider.value(), 10, drawHeight + 60);
  text('Speed: ' + speedSlider.value(), 230, drawHeight + 60);

  fill('#6c757d');
  textSize(11);
  let status = (state === 'ready')   ? 'Ready - press Start Search'
             : (state === 'running') ? 'Searching...'
             : (state === 'paused')  ? 'Paused'
             :                         'Search complete';
  text('Status: ' + status, 200, drawHeight + 82, canvasWidth - 210);
}

// ===================================================================
//  SEARCH MODEL
// ===================================================================
function buildScene() {
  const scene = SCENES[sceneSelect.value()];
  cols = scene.cols;
  rows = scene.rows;
  totalCells = cols * rows;
  cells = [];
  for (let r = 0; r < rows; r++) {
    cells[r] = [];
    for (let c = 0; c < cols; c++) cells[r][c] = 'gray';
  }
  buildSearchers();
  searchedCount = 0;
  steps = 0;
  stepAccum = 0;
  clickedCell = null;
}

function buildSearchers() {
  const pattern = patternSelect.value();
  const n = searcherSlider.value();
  searchers = [];

  if (pattern === 'Zone') {
    // split columns into n vertical zones; each searcher boustrophedon-sweeps its zone
    const zoneCols = zoneSplit(cols, n);
    let startCol = 0;
    for (let z = 0; z < n; z++) {
      const path = boustrophedonPath(startCol, startCol + zoneCols[z], 0, rows);
      searchers.push(newSearcher(path));
      startCol += zoneCols[z];
    }
  } else if (pattern === 'Spiral Inward' || pattern === 'Spiral Outward') {
    // a single continuous spiral path; team members share it offset along the path
    let path = spiralPath();
    if (pattern === 'Spiral Outward') path = path.slice().reverse();
    const team = Math.min(n, 6);
    for (let i = 0; i < team; i++) {
      const offset = Math.floor((path.length / team) * i);
      const sub = path.slice(offset).concat(path.slice(0, offset));
      searchers.push(newSearcher(sub));
    }
  } else {
    // Grid / Line: split rows among searchers; each does a double pass (down then across)
    for (let i = 0; i < n; i++) {
      const path = gridPath(i, n);
      searchers.push(newSearcher(path));
    }
  }
}

function newSearcher(path) {
  return { path: path, idx: 0, r: -1, c: -1 };
}

// boustrophedon (snake) sweep over a column range [c0,c1) and row range [r0,r1)
function boustrophedonPath(c0, c1, r0, r1) {
  const path = [];
  let dir = 1;
  for (let c = c0; c < c1; c++) {
    if (dir === 1) for (let r = r0; r < r1; r++) path.push({ r: r, c: c });
    else for (let r = r1 - 1; r >= r0; r--) path.push({ r: r, c: c });
    dir = -dir;
  }
  return path;
}

// grid / line: searcher i takes every n-th band of rows, snaking through it
function gridPath(i, n) {
  const path = [];
  for (let r = i; r < rows; r += n) {
    if (((r - i) / n) % 2 === 0) for (let c = 0; c < cols; c++) path.push({ r: r, c: c });
    else for (let c = cols - 1; c >= 0; c--) path.push({ r: r, c: c });
  }
  return path;
}

// inward spiral covering every cell exactly once
function spiralPath() {
  const path = [];
  let top = 0, bottom = rows - 1, left = 0, right = cols - 1;
  while (top <= bottom && left <= right) {
    for (let c = left; c <= right; c++) path.push({ r: top, c: c });
    top++;
    for (let r = top; r <= bottom; r++) path.push({ r: r, c: right });
    right--;
    if (top <= bottom) { for (let c = right; c >= left; c--) path.push({ r: bottom, c: c }); bottom--; }
    if (left <= right) { for (let r = bottom; r >= top; r--) path.push({ r: r, c: left }); left++; }
  }
  return path;
}

// split `count` columns into `n` near-equal zones
function zoneSplit(count, n) {
  const base = Math.floor(count / n);
  let rem = count - base * n;
  const out = [];
  for (let i = 0; i < n; i++) { out.push(base + (rem > 0 ? 1 : 0)); if (rem > 0) rem--; }
  return out;
}

function advanceSearch() {
  // steps per frame scale with the speed slider and grid size
  const perFrame = speedSlider.value() * Math.max(1, Math.round(totalCells / 400));
  stepAccum += perFrame;
  const take = Math.floor(stepAccum);
  stepAccum -= take;

  for (let t = 0; t < take; t++) {
    let movedAny = false;
    for (let i = 0; i < searchers.length; i++) {
      const s = searchers[i];
      if (s.idx < s.path.length) {
        const cellRef = s.path[s.idx];
        s.r = cellRef.r;
        s.c = cellRef.c;
        if (cells[s.r][s.c] !== 'green') { cells[s.r][s.c] = 'green'; searchedCount++; }
        s.idx++;
        movedAny = true;
      }
    }
    if (movedAny) steps++;
    if (allDone()) { state = 'done'; runButton.html('Start Search'); return; }
  }
}

function allDone() {
  for (let i = 0; i < searchers.length; i++) if (searchers[i].idx < searchers[i].path.length) return false;
  return true;
}

// ---- efficiency rating shown at completion ----
function efficiencyRating(scene, pat, teamWanted) {
  const fit = pat.fit[scene.key];
  let score = (fit === 'good') ? 2 : (fit === 'ok') ? 1 : 0;
  let penalty = (teamWanted > pat.goodTeam && pat.goodTeam < 6) ? 1 : 0;
  score -= penalty;
  if (score >= 2) return { label: 'High', color: '#2e7d32',
    note: 'This pattern matched the scene and the team size was reasonable.' };
  if (score === 1) return { label: 'Moderate', color: '#b8860b',
    note: 'It covered the scene, but a better-matched pattern or team size would be faster or more thorough.' };
  return { label: 'Low', color: '#c62828',
    note: 'This pattern is a poor match for this scene. Compare it with the recommended pattern.' };
}

// ===================================================================
//  INTERACTION
// ===================================================================
function toggleRun() {
  if (state === 'ready' || state === 'paused') {
    state = 'running';
    runButton.html('Pause');
  } else if (state === 'running') {
    state = 'paused';
    runButton.html('Resume');
  } else if (state === 'done') {
    resetSearch();
  }
}

function resetSearch() {
  state = 'ready';
  buildScene();
  runButton.html('Start Search');
}

function onConfigChange() {
  resetSearch();
}

function onSearcherChange() {
  // changing the team size rebuilds paths but only matters before/at reset
  if (state === 'ready') buildSearchers();
  else resetSearch();
}

function mousePressed() {
  if (state !== 'done' && state !== 'paused' && state !== 'ready') return;
  const g = gridGeometry();
  const c = Math.floor((mouseX - g.gx) / g.cell);
  const r = Math.floor((mouseY - g.gy) / g.cell);
  if (r < 0 || r >= rows || c < 0 || c >= cols) return;
  if (cells[r][c] !== 'green') return;     // only searched cells reveal evidence
  clickedCell = { r: r, c: c, evi: random(EVIDENCE) };
}

// ===================================================================
//  HELPERS
// ===================================================================
function searcherColor(i) {
  const palette = ['#1565c0', '#c62828', '#6a1b9a', '#00838f', '#ef6c00', '#2e7d32'];
  return palette[i % palette.length];
}

function sceneLabelShort() {
  const v = sceneSelect.value();
  if (v.indexOf('Indoor') === 0) return 'this room';
  if (v.indexOf('Large') === 0) return 'a large area';
  return 'this field';
}

function recommendedLabel(scene) {
  const p = PATTERNS[scene.best];
  return p ? p.label : scene.best;
}

// wrap text and return the y after the last line
function wrapText(str, x, y, w, lineH) {
  const words = String(str).split(' ');
  let line = '';
  let yy = y;
  for (let i = 0; i < words.length; i++) {
    const test = line ? line + ' ' + words[i] : words[i];
    if (textWidth(test) > w && line) {
      text(line, x, yy);
      line = words[i];
      yy += lineH;
    } else {
      line = test;
    }
  }
  if (line) { text(line, x, yy); yy += lineH; }
  return yy;
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
