// CDR & Tower Triangulation Timeline — Apply (L3)
// CANVAS_HEIGHT: 515
// Reconstruct a device's movement from Call Detail Records (CDR) and cell-tower
// data. Play the timeline to watch the device travel between towers, and show
// the trilateration that estimates its location from three tower ranges.

let canvasWidth = 860;
const drawHeight = 470;
const controlHeight = 45;
let canvasHeight = drawHeight + controlHeight;
const margin = 15;
const defaultTextSize = 16;

const MAP_KM = 5.0; // map spans 5 km across for the meters readout

let playButton, triButton, speedSlider;
let playing = false, prog = 0, showTri = false, selectedRow = -1;
let map = { x: 0, y: 0, w: 0, h: 0 };
let rowRects = [];

const TOWERS = [
  { id: 'A-117', nx: 0.18, ny: 0.22, rFrac: 0.23, type: 'Macro' },
  { id: 'B-204', nx: 0.64, ny: 0.16, rFrac: 0.19, type: 'Macro' },
  { id: 'C-073', nx: 0.84, ny: 0.48, rFrac: 0.21, type: 'Macro' },
  { id: 'D-339', nx: 0.56, ny: 0.60, rFrac: 0.14, type: 'Micro' },
  { id: 'E-256', nx: 0.22, ny: 0.72, rFrac: 0.22, type: 'Macro' },
  { id: 'F-188', nx: 0.42, ny: 0.40, rFrac: 0.15, type: 'Micro' }
];
const CDR = [
  { t: '09:02', type: 'Outgoing', dur: 120, tw: 0 },
  { t: '09:18', type: 'Incoming', dur: 45, tw: 5 },
  { t: '09:35', type: 'Outgoing', dur: 60, tw: 1 },
  { t: '09:52', type: 'Incoming', dur: 200, tw: 2 },
  { t: '10:10', type: 'Outgoing', dur: 30, tw: 3 },
  { t: '10:25', type: 'Incoming', dur: 90, tw: 4 },
  { t: '10:40', type: 'Outgoing', dur: 150, tw: 5 }
];
const PATH = CDR.map(r => r.tw);
// trilateration demo: three towers + a fixed estimated location
const TRI_TOWERS = [1, 2, 3];
const TRI_EST = { nx: 0.62, ny: 0.42 };

function updateCanvasSize() {
  const c = document.querySelector('main');
  if (c) canvasWidth = Math.max(720, Math.floor(c.getBoundingClientRect().width));
}

function setup() {
  updateCanvasSize();
  const cnv = createCanvas(canvasWidth, canvasHeight);
  cnv.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  playButton = createButton('▶ Play Timeline');
  playButton.mousePressed(() => {
    if (prog >= PATH.length - 1) prog = 0;
    playing = !playing;
    playButton.html(playing ? '⏸ Pause' : '▶ Play Timeline');
  });
  triButton = createButton('Show Triangulation');
  triButton.mousePressed(() => {
    showTri = !showTri;
    triButton.html(showTri ? 'Hide Triangulation' : 'Show Triangulation');
  });
  speedSlider = createSlider(0.25, 3, 1, 0.25);
  positionControls();
}

function positionControls() {
  const r1 = drawHeight + 10;
  playButton.position(margin, r1);
  triButton.position(margin + 140, r1);
  speedSlider.position(margin + 360, r1 + 3); speedSlider.size(160);
}

function windowResized() {
  updateCanvasSize(); resizeCanvas(canvasWidth, canvasHeight); positionControls();
}

function mapXY(nx, ny) { return { x: map.x + nx * map.w, y: map.y + ny * map.h }; }
function towerXY(i) { return mapXY(TOWERS[i].nx, TOWERS[i].ny); }
function metersPerPx() { return (MAP_KM * 1000) / map.w; }

function draw() {
  rowRects = [];
  noStroke();
  fill('#eef3fb'); rect(0, 0, canvasWidth, drawHeight);
  fill('#f4f4f4'); rect(0, drawHeight, canvasWidth, controlHeight);

  fill('#1a3a6c'); textAlign(CENTER, TOP); textSize(20); textStyle(BOLD);
  text('CDR & Tower Triangulation Timeline', canvasWidth / 2, 8); textStyle(NORMAL);

  if (playing) {
    prog += 0.012 * speedSlider.value();
    if (prog >= PATH.length - 1) { prog = PATH.length - 1; playing = false; playButton.html('▶ Play Timeline'); }
  }

  const splitX = canvasWidth * 0.5;
  drawMapPanel(margin, 38, splitX - margin - 6, 352);
  drawTable(splitX + 6, 38, canvasWidth - margin - (splitX + 6), 352);
  drawTimeline(margin, 402, canvasWidth - 2 * margin, 56);
}

function drawMapPanel(x, y, w, h) {
  fill('#f3f4f6'); stroke('#ccc'); strokeWeight(1); rect(x, y, w, h, 8); noStroke();
  map = { x: x + 12, y: y + 30, w: w - 24, h: h - 44 };
  fill('#1a3a6c'); textAlign(LEFT, TOP); textSize(13); textStyle(BOLD);
  text('Coverage map', x + 12, y + 8); textStyle(NORMAL);
  fill('#888'); textAlign(RIGHT, TOP); textSize(10);
  text(MAP_KM.toFixed(0) + ' km across', x + w - 12, y + 10);

  // grid
  stroke('#e1e5ec'); strokeWeight(1);
  for (let i = 1; i < 6; i++) {
    line(map.x + (i / 6) * map.w, map.y, map.x + (i / 6) * map.w, map.y + map.h);
    line(map.x, map.y + (i / 6) * map.h, map.x + map.w, map.y + (i / 6) * map.h);
  }

  const curTower = PATH[Math.round(prog)];

  // coverage circles + towers
  for (let i = 0; i < TOWERS.length; i++) {
    const p = towerXY(i), rad = TOWERS[i].rFrac * map.w;
    const dim = showTri && !TRI_TOWERS.includes(i);
    noStroke();
    fill(31, 111, 178, dim ? 10 : 28); circle(p.x, p.y, rad * 2);
    stroke(31, 111, 178, dim ? 50 : 120); strokeWeight(1); noFill(); circle(p.x, p.y, rad * 2);
  }
  if (!showTri) drawPath();

  // triangulation overlay
  if (showTri) drawTriangulation();

  // tower icons on top
  for (let i = 0; i < TOWERS.length; i++) {
    const p = towerXY(i);
    const sel = (selectedRow >= 0 && CDR[selectedRow].tw === i) || (i === curTower && !showTri);
    const hl = showTri && TRI_TOWERS.includes(i);
    noStroke(); fill(sel ? '#0a7d33' : (hl ? '#1a3a6c' : '#1f6fb2'));
    triangle(p.x - 6, p.y + 6, p.x + 6, p.y + 6, p.x, p.y - 8);
    rect(p.x - 1.5, p.y + 6, 3, 5);
    fill('#33414f'); textAlign(CENTER, TOP); textSize(9);
    text(TOWERS[i].id, p.x, p.y + 12);
  }

  // device icon
  if (!showTri) {
    const d = devicePos();
    noStroke(); fill('#e67e22'); stroke('#a85a10'); strokeWeight(1.5);
    circle(d.x, d.y, 13);
    noStroke(); fill('#fff'); circle(d.x, d.y, 4);
  }
}

function devicePos() {
  const i0 = Math.floor(prog), i1 = Math.min(i0 + 1, PATH.length - 1), f = prog - i0;
  const a = towerXY(PATH[i0]), b = towerXY(PATH[i1]);
  return { x: lerp(a.x, b.x, f), y: lerp(a.y, b.y, f) };
}

function drawPath() {
  noFill(); stroke('#e67e22'); strokeWeight(2); drawingContext.setLineDash([6, 5]);
  beginShape();
  for (let k = 0; k < PATH.length; k++) { const p = towerXY(PATH[k]); vertex(p.x, p.y); }
  endShape(); drawingContext.setLineDash([]);
}

function drawTriangulation() {
  const est = mapXY(TRI_EST.nx, TRI_EST.ny);
  const mpp = metersPerPx();
  // measurement circles passing through the estimate
  for (const i of TRI_TOWERS) {
    const p = towerXY(i), r = dist(p.x, p.y, est.x, est.y);
    stroke(31, 111, 178, 150); strokeWeight(1.5); noFill();
    drawingContext.setLineDash([4, 3]); circle(p.x, p.y, r * 2); drawingContext.setLineDash([]);
    stroke('#1f6fb2'); strokeWeight(1); line(p.x, p.y, est.x, est.y);
  }
  // uncertainty + estimate
  const unc = 0.05 * map.w;
  noStroke(); fill(10, 125, 51, 40); circle(est.x, est.y, unc * 2);
  stroke('#0a7d33'); strokeWeight(1.5); noFill(); circle(est.x, est.y, unc * 2);
  noStroke(); fill('#0a7d33'); circle(est.x, est.y, 9);
  fill('#0a5a26'); textAlign(CENTER, BOTTOM); textSize(10); textStyle(BOLD);
  text('est. location ±' + Math.round(unc * mpp) + ' m', est.x, est.y - 9); textStyle(NORMAL);

  // math box
  const bx = map.x + 6, by = map.y + 6, bw = 150;
  fill(255, 255, 255, 232); stroke('#ccd6e4'); strokeWeight(1); rect(bx, by, bw, 76, 6); noStroke();
  fill('#1a3a6c'); textAlign(LEFT, TOP); textSize(10.5); textStyle(BOLD);
  text('Trilateration (≈ ' + (MAP_KM * 1000 / map.w).toFixed(0) + ' m/px)', bx + 7, by + 6); textStyle(NORMAL);
  let yy = by + 22; fill('#333'); textSize(10);
  for (const i of TRI_TOWERS) {
    const p = towerXY(i), r = dist(p.x, p.y, est.x, est.y) * mpp;
    text(TOWERS[i].id + ': r ≈ ' + Math.round(r) + ' m', bx + 7, yy); yy += 14;
  }
}

function drawTable(x, y, w, h) {
  fill('#fff'); stroke('#ccc'); strokeWeight(1); rect(x, y, w, h, 8); noStroke();
  fill('#1a3a6c'); textAlign(LEFT, TOP); textSize(13); textStyle(BOLD);
  text('Call Detail Records (CDR)', x + 12, y + 8); textStyle(NORMAL);
  fill('#888'); textAlign(RIGHT, TOP); textSize(10);
  text('click a row to locate the tower', x + w - 12, y + 10);

  const cols = [x + 14, x + 90, x + 195, x + 270];
  const headY = y + 32;
  fill('#5a6472'); textSize(11); textStyle(BOLD); textAlign(LEFT, TOP);
  text('Time', cols[0], headY); text('Call type', cols[1], headY);
  text('Dur', cols[2], headY); text('Tower', cols[3], headY); textStyle(NORMAL);
  stroke('#e1e5ec'); strokeWeight(1); line(x + 10, headY + 18, x + w - 10, headY + 18); noStroke();

  const rowH = (h - 58) / CDR.length;
  for (let i = 0; i < CDR.length; i++) {
    const ry = headY + 22 + i * rowH;
    const cur = i === Math.round(prog);
    if (i === selectedRow) { fill('#e7f6ec'); rect(x + 6, ry - 2, w - 12, rowH, 4); }
    else if (cur && playing) { fill('#fdf0e3'); rect(x + 6, ry - 2, w - 12, rowH, 4); }
    noStroke(); fill('#333'); textSize(11.5); textAlign(LEFT, TOP);
    text(CDR[i].t, cols[0], ry);
    fill(CDR[i].type === 'Outgoing' ? '#1f6fb2' : '#7a5cc0'); text(CDR[i].type, cols[1], ry);
    fill('#333'); text(CDR[i].dur + 's', cols[2], ry);
    fill('#0a7d33'); textStyle(BOLD); text(TOWERS[CDR[i].tw].id, cols[3], ry); textStyle(NORMAL);
    rowRects.push({ i, x: x + 6, y: ry - 2, w: w - 12, h: rowH });
  }
}

function drawTimeline(x, y, w, h) {
  fill('#fff'); stroke('#ccc'); strokeWeight(1); rect(x, y, w, h, 8); noStroke();
  fill('#1a3a6c'); textAlign(LEFT, TOP); textSize(12); textStyle(BOLD);
  text('Timeline', x + 10, y + 6); textStyle(NORMAL);
  const bx = x + 70, bw = w - 110, by = y + 28;
  stroke('#c4cede'); strokeWeight(3); line(bx, by, bx + bw, by); noStroke();
  for (let i = 0; i < CDR.length; i++) {
    const tx = bx + (i / (CDR.length - 1)) * bw;
    fill('#1f6fb2'); circle(tx, by, 9);
    fill('#5a6472'); textAlign(CENTER, TOP); textSize(9); text(CDR[i].t, tx, by + 8);
  }
  // playhead
  const px = bx + (prog / (PATH.length - 1)) * bw;
  stroke('#e67e22'); strokeWeight(2); line(px, by - 12, px, by + 12); noStroke();
  fill('#e67e22'); triangle(px, by - 12, px - 5, by - 20, px + 5, by - 20);
}

function mousePressed() {
  if (mouseY > drawHeight) return;
  for (const r of rowRects) {
    if (mouseX >= r.x && mouseX <= r.x + r.w && mouseY >= r.y && mouseY <= r.y + r.h) {
      selectedRow = (selectedRow === r.i) ? -1 : r.i;
      return;
    }
  }
}
