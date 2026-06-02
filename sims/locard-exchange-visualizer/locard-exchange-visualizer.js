// Locard Exchange Principle Visualizer - p5.js
// CANVAS_HEIGHT: 550
// Bloom Level: Apply (L3) - predict and verify what trace evidence transfers when
// two objects make physical contact. The learner picks a scenario, PREDICTS the
// two-way transfer, presses "Make Contact", then verifies against the evidence inventory.
// MicroSim template version 2026.03

// ---- layout globals (standard MicroSim structure) ----
let containerWidth;
let canvasWidth = 400;
let drawHeight = 470;        // drawing region: scene (top) + evidence inventory (bottom)
let sceneBottom = 285;       // y boundary between scene and evidence inventory
let controlHeight = 80;      // two rows of controls
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 20;
let defaultTextSize = 16;

// ---- controls ----
let scenarioSelect, contactButton, resetButton, labelsCheckbox;

// ---- state ----
let state = 'ready';   // 'ready' | 'contacting' | 'done'
let animT = 0;         // animation progress 0..1 during 'contacting'
let particles = [];
let acquiredA = [];    // foreign trace dots resting on object A after contact
let acquiredB = [];    // foreign trace dots resting on object B after contact

// ---- scenario data ----
// A -> B traces land on B; B -> A traces land on A.
const SCENARIOS = [
  {
    name: 'Suspect / Carpet',
    a: { label: 'Suspect', material: 'skin cells + shoe-sole rubber', fill: 'steelblue' },
    b: { label: 'Carpet',  material: 'synthetic nylon fibers',        fill: 'darkseagreen' },
    aToB: [ { trace: 'skin (epithelial) cells', qty: '~120', color: 'wheat' },
            { trace: 'shoe-sole rubber',         qty: '~30',  color: 'dimgray' } ],
    bToA: [ { trace: 'nylon carpet fibers',      qty: '~50',  color: 'royalblue' } ],
    lab: 'DNA profiling of skin cells; microscopy + FTIR spectroscopy to identify fibers; pyrolysis-GC/MS for the rubber.'
  },
  {
    name: 'Gloved hand / Door handle',
    a: { label: 'Gloved hand', material: 'latex glove', fill: 'gainsboro' },
    b: { label: 'Door handle', material: 'painted metal', fill: 'silver' },
    aToB: [ { trace: 'latex glove particles', qty: '~40', color: 'khaki' } ],
    bToA: [ { trace: 'metal-oxide residue',   qty: '~25', color: 'sienna' } ],
    lab: 'FTIR / Raman spectroscopy to confirm latex; SEM-EDX to identify the metal-oxide residue.'
  },
  {
    name: 'Shoe sole / Muddy soil',
    a: { label: 'Shoe sole', material: 'rubber tread', fill: 'dimgray' },
    b: { label: 'Muddy soil', material: 'mineral soil + pollen', fill: 'sienna' },
    aToB: [ { trace: 'tread impression', qty: '1 pattern', color: 'slategray' } ],
    bToA: [ { trace: 'soil + mineral grains', qty: '~200', color: 'peru' },
            { trace: 'pollen grains',          qty: '~15',  color: 'gold' } ],
    lab: 'Soil mineralogy and density-gradient comparison; palynology (pollen ID); casting and comparison of the tread impression.'
  },
  {
    name: 'Hair brush / Hair strands',
    a: { label: 'Hair brush', material: 'conditioning residue', fill: 'teal' },
    b: { label: 'Hair strands', material: 'keratin + follicles', fill: 'saddlebrown' },
    aToB: [ { trace: 'conditioning-chemical residue', qty: '~trace', color: 'orchid' } ],
    bToA: [ { trace: 'hair strands w/ follicles', qty: '~12', color: 'peachpuff' } ],
    lab: 'Microscopy of hair morphology; nuclear/mitochondrial DNA from follicular tags; GC-MS for cosmetic residues.'
  }
];

let sc;  // current scenario

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  scenarioSelect = createSelect();
  SCENARIOS.forEach(function (s) { scenarioSelect.option(s.name); });
  scenarioSelect.selected(SCENARIOS[0].name);
  scenarioSelect.position(10, drawHeight + 8);
  scenarioSelect.changed(onScenarioChange);

  contactButton = createButton('Make Contact');
  contactButton.position(200, drawHeight + 8);
  contactButton.mousePressed(startContact);

  resetButton = createButton('Reset Scene');
  resetButton.position(320, drawHeight + 8);
  resetButton.mousePressed(resetScene);

  labelsCheckbox = createCheckbox(' Show trace labels', true);
  labelsCheckbox.position(10, drawHeight + 46);

  sc = SCENARIOS[0];
  describe('Locard Exchange Principle visualizer: choose a contact scenario, predict which trace evidence transfers between two objects, then make contact and read the evidence inventory that appears on each object.', LABEL);
}

function draw() {
  updateCanvasSize();

  // background regions
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
  textSize(22);
  text('Locard Exchange Principle', canvasWidth / 2, 8);
  textSize(13);
  fill('#495057');
  text('"Every contact leaves a trace"', canvasWidth / 2, 33);

  // advance animation
  if (state === 'contacting') {
    animT += 0.012;
    if (animT >= 1) { animT = 1; finishContact(); }
    updateParticles();
  }

  drawScene();
  drawEvidencePanel();
  drawControlLabels();
}

// ---- scene (objects + transfer animation) ----
function drawScene() {
  const objW = min(150, canvasWidth * 0.30);
  const objH = 86;
  const objY = 150;

  // resting positions
  let ax = canvasWidth * 0.27;
  let bx = canvasWidth * 0.73;

  // during contact, slide together (0..0.35), hold/burst (0.35..0.65), slide apart (0.65..1)
  let close = 0;
  if (state === 'contacting' || state === 'done') {
    if (animT < 0.35) close = map(animT, 0, 0.35, 0, 1);
    else if (animT < 0.65) close = 1;
    else close = map(animT, 0.65, 1, 1, 0);
  }
  ax = lerp(ax, canvasWidth * 0.40, close);
  bx = lerp(bx, canvasWidth * 0.60, close);

  // object A
  drawObject(ax, objY, objW, objH, sc.a, acquiredA);
  // object B
  drawObject(bx, objY, objW, objH, sc.b, acquiredB);

  // contact spark
  if (state === 'contacting' && animT >= 0.32 && animT <= 0.68) {
    noStroke();
    fill(255, 215, 0, 160);
    const cx = canvasWidth / 2;
    ellipse(cx, objY, 26 + 10 * sin(frameCount * 0.4), 26);
  }

  // particles
  drawParticles();

  // prediction prompt / result text
  noStroke();
  textAlign(CENTER, TOP);
  textSize(13);
  const py = 220;
  if (state === 'ready') {
    fill('#7a4d00');
    text('Predict first: which traces will move ' + sc.a.label + ' → ' + sc.b.label +
         ', and ' + sc.b.label + ' → ' + sc.a.label + '?', margin, py, canvasWidth - 2 * margin);
    fill('#495057');
    textSize(12);
    text('Then press "Make Contact" to check your prediction.', margin, py + 36, canvasWidth - 2 * margin);
  } else if (state === 'done') {
    fill('#14401a');
    text('Verified: the contact left traces on BOTH objects. ' + sc.a.label + ' now carries ' +
         sc.b.label.toLowerCase() + ' material, and ' + sc.b.label + ' now carries ' +
         sc.a.label.toLowerCase() + ' material — a two-way exchange.', margin, py, canvasWidth - 2 * margin);
  } else {
    fill('#495057');
    text('Contact in progress… watch the traces transfer in both directions.', margin, py, canvasWidth - 2 * margin);
  }
}

function drawObject(cx, cy, w, h, info, acquired) {
  rectMode(CENTER);
  stroke('#333');
  strokeWeight(1.5);
  fill(info.fill);
  rect(cx, cy, w, h, 10);
  rectMode(CORNER);

  // acquired foreign trace dots resting on the object
  for (let i = 0; i < acquired.length; i++) {
    const d = acquired[i];
    noStroke();
    fill(d.color);
    ellipse(cx + d.ox, cy + d.oy, d.r, d.r);
  }

  // label badge
  noStroke();
  fill(255, 255, 255, 235);
  rectMode(CENTER);
  rect(cx, cy + h / 2 + 16, w + 6, 30, 6);
  rectMode(CORNER);
  fill('black');
  textAlign(CENTER, CENTER);
  textSize(14);
  text(info.label, cx, cy + h / 2 + 10);
  textSize(10);
  fill('#555');
  text(info.material, cx, cy + h / 2 + 23);

  // annotation labels for acquired traces (checkbox)
  if (state === 'done' && labelsCheckbox && labelsCheckbox.checked() && acquired.length > 0) {
    const list = (acquired === acquiredA) ? sc.bToA : sc.aToB;
    let labelY = cy - h / 2 - 8;
    noStroke();
    textAlign(CENTER, BOTTOM);
    textSize(10);
    fill('#333');
    for (let i = 0; i < list.length; i++) {
      text(list[i].qty + ' ' + list[i].trace, cx, labelY - i * 12);
    }
  }
}

// ---- particles ----
function spawnParticles() {
  particles = [];
  const cx = canvasWidth / 2, cy = 150;
  // B-bound particles carry A's material (A -> B); A-bound carry B's material (B -> A)
  sc.aToB.forEach(function (t) { addParticleStream(cx, cy, canvasWidth * 0.60, t.color); });
  sc.bToA.forEach(function (t) { addParticleStream(cx, cy, canvasWidth * 0.40, t.color); });
}

function addParticleStream(cx, cy, targetX, color) {
  for (let i = 0; i < 12; i++) {
    particles.push({
      x: cx + random(-8, 8), y: cy + random(-30, 30),
      tx: targetX + random(-30, 30), ty: cy + random(-30, 30),
      color: color, r: random(4, 7), p: random(0, 0.2)
    });
  }
}

function updateParticles() {
  // particles only travel during the burst window
  const local = constrain(map(animT, 0.35, 0.75, 0, 1), 0, 1);
  for (let i = 0; i < particles.length; i++) {
    const pt = particles[i];
    pt.cur = constrain(local - pt.p, 0, 1);
  }
}

function drawParticles() {
  if (state !== 'contacting') return;
  for (let i = 0; i < particles.length; i++) {
    const pt = particles[i];
    if (pt.cur === undefined || pt.cur <= 0) continue;
    const x = lerp(pt.x, pt.tx, pt.cur);
    const y = lerp(pt.y, pt.ty, pt.cur);
    noStroke();
    fill(pt.color);
    ellipse(x, y, pt.r, pt.r);
  }
}

// ---- evidence inventory panel ----
function drawEvidencePanel() {
  // divider
  stroke('silver');
  strokeWeight(1);
  line(0, sceneBottom, canvasWidth, sceneBottom);

  noStroke();
  fill('#1a3a6c');
  textAlign(LEFT, TOP);
  textSize(15);
  text('Evidence Inventory', margin, sceneBottom + 8);

  const colW = (canvasWidth - 2 * margin) / 2;
  const leftX = margin;
  const rightX = margin + colW;
  const listY = sceneBottom + 32;

  drawInventoryColumn(leftX, listY, colW - 8, 'On ' + sc.a.label + ':', sc.bToA);
  drawInventoryColumn(rightX, listY, colW - 8, 'On ' + sc.b.label + ':', sc.aToB);

  // lab methods sub-panel
  const labY = sceneBottom + 110;
  noStroke();
  fill(255, 255, 255, 235);
  stroke('#c9b8e0');
  strokeWeight(1);
  rect(margin - 4, labY, canvasWidth - 2 * margin + 8, drawHeight - labY - 8, 8);
  noStroke();
  fill('#6a1b9a');
  textAlign(LEFT, TOP);
  textSize(13);
  text('What the lab would look for:', margin + 4, labY + 6);
  fill('#333');
  textSize(12);
  if (state === 'done') {
    text(sc.lab, margin + 4, labY + 24, canvasWidth - 2 * margin - 4, drawHeight - labY - 28);
  } else {
    fill('#999');
    text('(make contact to reveal the analytical techniques)', margin + 4, labY + 24, canvasWidth - 2 * margin - 4, 40);
  }
}

function drawInventoryColumn(x, y, w, header, traces) {
  noStroke();
  fill('#212529');
  textAlign(LEFT, TOP);
  textSize(13);
  text(header, x, y);
  let yy = y + 20;
  if (state !== 'done') {
    fill('#adb5bd');
    textSize(12);
    text('— nothing yet —', x, yy);
    return;
  }
  for (let i = 0; i < traces.length; i++) {
    const t = traces[i];
    noStroke();
    fill(t.color);
    stroke('#888');
    strokeWeight(0.5);
    ellipse(x + 6, yy + 7, 11, 11);
    noStroke();
    fill('#212529');
    textSize(12);
    text(t.qty + ' ' + t.trace, x + 18, yy, w - 18, 30);
    yy += 26;
  }
}

function drawControlLabels() {
  noStroke();
  fill('#495057');
  textAlign(LEFT, CENTER);
  textSize(12);
  let status = (state === 'ready') ? 'Ready — predict, then make contact'
            : (state === 'done')  ? 'Contact complete'
            : 'Transferring traces…';
  text('Status: ' + status, 200, drawHeight + 60);
}

// ---- interactions ----
function startContact() {
  if (state !== 'ready') return;
  state = 'contacting';
  animT = 0;
  spawnParticles();
}

function finishContact() {
  state = 'done';
  buildAcquired();
}

function buildAcquired() {
  acquiredA = makeDots(sc.bToA, 80);
  acquiredB = makeDots(sc.aToB, 80);
}

function makeDots(traceList, count) {
  const dots = [];
  // distribute count dots across the object's surface, colored by trace type
  let total = 0;
  traceList.forEach(function (t) { total += parseQty(t.qty); });
  for (let k = 0; k < traceList.length; k++) {
    const t = traceList[k];
    const share = total > 0 ? Math.max(4, Math.round(count * parseQty(t.qty) / total)) : 8;
    for (let i = 0; i < share; i++) {
      dots.push({ ox: random(-60, 60), oy: random(-34, 34), r: random(3, 6), color: t.color });
    }
  }
  return dots;
}

function parseQty(q) {
  const n = parseInt(String(q).replace(/[^0-9]/g, ''), 10);
  return isNaN(n) ? 10 : n;
}

function resetScene() {
  state = 'ready';
  animT = 0;
  particles = [];
  acquiredA = [];
  acquiredB = [];
}

function onScenarioChange() {
  sc = SCENARIOS.find(function (s) { return s.name === scenarioSelect.value(); }) || SCENARIOS[0];
  resetScene();
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
