// Area-of-Origin Stringing — Apply (L3)
// CANVAS_HEIGHT: 500
// A pseudo-3D room of floor bloodstains. Add a string to each stain (it
// projects back at that stain's angle of impact), then Find Intersection to
// reveal the 3D convergence zone — the area of origin of the blood source.

let canvasWidth = 800;
const drawHeight = 420;
const controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
const margin = 15;
const defaultTextSize = 16;

// room dimensions in metres
const RW = 3.0, RD = 3.0, RH = 2.4;
// axonometric projection params
const S = 64, OX = 110, OY = 345, DK = 0.5, DKy = 0.35;

let addButton, findButton, resetButton, heightSlider;
let stringsAdded = 0;
let showConvergence = false;
let selected = -1;

// source (area of origin) — strings are built to pass through it
let src = { x: 1.5, y: 1.3, z: 1.2 };
// floor stain positions (metres)
const STAINS = [
  { x: 0.6, y: 0.5 }, { x: 1.8, y: 0.4 }, { x: 2.4, y: 1.2 },
  { x: 1.0, y: 1.8 }, { x: 2.0, y: 2.2 },
];

function proj(x, y, z) {
  return { x: OX + x * S + y * S * DK, y: OY - z * S - y * S * DKy };
}

function updateCanvasSize() {
  const c = document.querySelector('main');
  if (c) canvasWidth = Math.max(560, Math.floor(c.getBoundingClientRect().width));
}

function setup() {
  updateCanvasSize();
  const cnv = createCanvas(canvasWidth, canvasHeight);
  cnv.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  addButton = createButton('Add String');
  addButton.mousePressed(() => { stringsAdded = min(STAINS.length, stringsAdded + 1); });
  findButton = createButton('Find Intersection');
  findButton.mousePressed(() => { if (stringsAdded >= 2) showConvergence = true; });
  resetButton = createButton('Reset');
  resetButton.mousePressed(() => { stringsAdded = 0; showConvergence = false; selected = -1; });

  heightSlider = createSlider(0.5, 2.0, 1.2, 0.1);
  positionControls();
}

function positionControls() {
  addButton.position(margin, drawHeight + 12);
  findButton.position(margin + 95, drawHeight + 12);
  resetButton.position(margin + 215, drawHeight + 12);
  heightSlider.position(margin + 150, drawHeight + 48); heightSlider.size(180);
}

function windowResized() {
  updateCanvasSize(); resizeCanvas(canvasWidth, canvasHeight); positionControls();
}

function stainData(i) {
  const st = STAINS[i];
  const dx = src.x - st.x, dy = src.y - st.y;
  const r = Math.sqrt(dx * dx + dy * dy);
  const angle = degrees(Math.atan2(src.z, r)); // impact angle above floor
  const L = 22, W = L * Math.sin(radians(angle));
  return { angle, r, W, L };
}

function draw() {
  src.z = heightSlider.value();
  noStroke();
  fill('#e8eef6'); rect(0, 0, canvasWidth, drawHeight);
  fill('#f4f4f4'); rect(0, drawHeight, canvasWidth, controlHeight);

  fill('#1a3a6c'); textAlign(CENTER, TOP); textSize(20); textStyle(BOLD);
  text('Area-of-Origin Stringing', canvasWidth / 2, 8); textStyle(NORMAL);

  drawRoom();
  drawStains();
  drawStrings();
  if (showConvergence) drawConvergence();
  drawStainMarkers();
  drawInfo();
  drawControlLabels();
}

function quad3(a, b, c, d, fillc, strokec) {
  const pa = proj(...a), pb = proj(...b), pc = proj(...c), pd = proj(...d);
  fill(fillc); stroke(strokec); strokeWeight(1);
  quad(pa.x, pa.y, pb.x, pb.y, pc.x, pc.y, pd.x, pd.y);
}

function drawRoom() {
  // back wall and left wall, then floor on top
  quad3([0, RD, 0], [RW, RD, 0], [RW, RD, RH], [0, RD, RH], '#dfe2e6', '#c4c9cf');
  quad3([0, 0, 0], [0, RD, 0], [0, RD, RH], [0, 0, RH], '#e7e9ec', '#c4c9cf');
  quad3([0, 0, 0], [RW, 0, 0], [RW, RD, 0], [0, RD, 0], '#e9dcc3', '#cdbb98');
  // floor grid
  stroke('#d8c8a6'); strokeWeight(1);
  for (let gx = 0; gx <= RW; gx += 0.5) { const a = proj(gx, 0, 0), b = proj(gx, RD, 0); line(a.x, a.y, b.x, b.y); }
  for (let gy = 0; gy <= RD; gy += 0.5) { const a = proj(0, gy, 0), b = proj(RW, gy, 0); line(a.x, a.y, b.x, b.y); }
}

function drawStains() {
  for (let i = 0; i < STAINS.length; i++) {
    const st = STAINS[i];
    const p = proj(st.x, st.y, 0);
    // directional arrow (travel direction = away from source)
    const dx = st.x - src.x, dy = st.y - src.y, m = Math.hypot(dx, dy) || 1;
    const e = proj(st.x + dx / m * 0.35, st.y + dy / m * 0.35, 0);
    stroke('#7b1010'); strokeWeight(2); line(p.x, p.y, e.x, e.y);
    push(); const ang = Math.atan2(e.y - p.y, e.x - p.x); translate(e.x, e.y); rotate(ang);
    noStroke(); fill('#7b1010'); triangle(0, 0, -7, -3, -7, 3); pop();
    // stain ellipse
    noStroke(); fill('#7b1010');
    push(); translate(p.x, p.y); rotate(ang); ellipse(0, 0, 8, 16); pop();
  }
}

function drawStrings() {
  const s = proj(src.x, src.y, src.z);
  for (let i = 0; i < stringsAdded; i++) {
    const p = proj(STAINS[i].x, STAINS[i].y, 0);
    stroke('#e67e22'); strokeWeight(2); line(p.x, p.y, s.x, s.y);
  }
}

function drawConvergence() {
  const s = proj(src.x, src.y, src.z);
  const f = proj(src.x, src.y, 0);
  // drop line to floor
  stroke('#2e8b57'); strokeWeight(1); drawingContext.setLineDash([4, 4]);
  line(s.x, s.y, f.x, f.y); drawingContext.setLineDash([]);
  // green convergence zone
  noStroke(); fill(46, 139, 87, 70); circle(s.x, s.y, 46);
  fill('#2e8b57'); circle(s.x, s.y, 14);
  // label
  fill('#1e6b40'); textAlign(LEFT, BOTTOM); textSize(12); textStyle(BOLD);
  text('source ≈ (' + src.x.toFixed(1) + ', ' + src.y.toFixed(1) + ', ' + src.z.toFixed(1) + ') m',
    s.x + 14, s.y - 8); textStyle(NORMAL);
}

function drawStainMarkers() {
  for (let i = 0; i < STAINS.length; i++) {
    if (i !== selected) continue;
    const p = proj(STAINS[i].x, STAINS[i].y, 0);
    noFill(); stroke('#1f6fb2'); strokeWeight(2.5); circle(p.x, p.y, 26);
  }
}

function drawInfo() {
  const x = canvasWidth - 232, y = 40, w = 217, h = 96;
  fill('#fff'); stroke('#ccc'); strokeWeight(1); rect(x, y, w, h, 8); noStroke();
  fill('#1a3a6c'); textAlign(LEFT, TOP); textSize(13); textStyle(BOLD);
  if (selected < 0) {
    text('Click a stain', x + 12, y + 10); textStyle(NORMAL);
    fill('#555'); textSize(12);
    text('Click any floor stain to see its\nwidth, length and angle of\nimpact, then Add String.', x + 12, y + 32);
    return;
  }
  const d = stainData(selected);
  text('Stain #' + (selected + 1), x + 12, y + 10); textStyle(NORMAL);
  fill('#333'); textSize(12.5);
  text('Width  = ' + d.W.toFixed(1) + ' mm', x + 12, y + 32);
  text('Length = ' + d.L.toFixed(1) + ' mm', x + 12, y + 50);
  text('sin θ = ' + (d.W / d.L).toFixed(2) + '  →  θ = ' + d.angle.toFixed(1) + '°', x + 12, y + 68);
}

function drawControlLabels() {
  fill('#222'); textAlign(LEFT, CENTER); textSize(13);
  text('Strings added: ' + stringsAdded + ' / ' + STAINS.length, margin + 290, drawHeight + 22);
  text('Source height: ' + src.z.toFixed(1) + ' m', margin, drawHeight + 58);
}

function mousePressed() {
  if (mouseY > drawHeight) return;
  for (let i = 0; i < STAINS.length; i++) {
    const p = proj(STAINS[i].x, STAINS[i].y, 0);
    if (dist(mouseX, mouseY, p.x, p.y) < 16) { selected = i; return; }
  }
}
