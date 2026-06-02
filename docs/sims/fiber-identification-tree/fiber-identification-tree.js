// Fiber Identification Decision Tree — Apply (L3)
// CANVAS_HEIGHT: 530
// Apply a multi-step protocol (burn test -> microscopy -> solubility) to an
// unknown fiber: read the observed test results, then answer Yes/No at each
// decision node to walk the tree to a classification.

let canvasWidth = 900;
const drawHeight = 480;
const controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
const margin = 15;
const defaultTextSize = 16;

const GREEN = '#2e7d32';
const BLUE = '#1565c0';
const YELLOW = '#f6c343';
const RED = '#c62828';
const DIM = '#b9c2cf';

let yesButton, noButton, newButton;

const FIBERS = {
  cotton: { name: 'Cotton', type: 'cellulosic', color: GREEN,
    sources: 'Denim, T-shirts, bed sheets',
    cross: 'flat, twisted ribbon',
    obs: ['Burn: ignites readily, burns steadily,', 'smells like burning paper, light gray ash.', 'Microscope: flat, twisted ribbon.'],
    melts: false, proteinSmell: false },
  wool: { name: 'Wool', type: 'protein', color: GREEN,
    sources: 'Sweaters, coats, carpets',
    cross: 'scaly shaft with medulla',
    obs: ['Burn: curls away, smells like burning hair,', 'self-extinguishes, dark crushable bead.', 'Microscope: overlapping scales.', 'Solubility: dissolves slowly in bleach.'],
    melts: false, proteinSmell: true, bleachSoluble: false },
  silk: { name: 'Silk', type: 'protein', color: GREEN,
    sources: 'Ties, scarves, fine garments',
    cross: 'smooth triangular',
    obs: ['Burn: burns slowly, burning-hair smell,', 'leaves a crushable bead.', 'Microscope: smooth, triangular.', 'Solubility: dissolves readily in bleach.'],
    melts: false, proteinSmell: true, bleachSoluble: true },
  nylon: { name: 'Nylon', type: 'synthetic', color: BLUE,
    sources: 'Stockings, jackets, rope, carpet',
    cross: 'smooth round rod',
    obs: ['Burn: melts & shrinks from flame,', 'celery/plastic smell, hard TAN-GRAY bead.', 'Microscope: smooth round rod.'],
    melts: true, hardBlackBead: false },
  polyester: { name: 'Polyester', type: 'synthetic', color: BLUE,
    sources: 'Clothing blends, fleece, upholstery',
    cross: 'round / trilobal rod',
    obs: ['Burn: melts & shrinks from flame,', 'sweet chemical smell, hard BLACK bead.', 'Microscope: round / trilobal rod.'],
    melts: true, hardBlackBead: true }
};

// decision nodes carry the sample property they test
const TREE = {
  d1: { kind: 'd', label: ['Melts / shrinks', 'from flame?'], prop: 'melts',
        full: 'Does the fiber MELT or shrink away as it nears the flame?',
        fx: 0.30, fy: 72, yes: 'd4', no: 'd2' },
  d2: { kind: 'd', label: ['Burning-hair', 'smell + bead?'], prop: 'proteinSmell',
        full: 'NATURAL fiber: does it smell like burning hair and leave a dark, crushable bead?',
        fx: 0.16, fy: 200, yes: 'd3', no: 'cotton' },
  d4: { kind: 'd', label: ['Hard BLACK', 'bead?'], prop: 'hardBlackBead',
        full: 'SYNTHETIC fiber: does the melted residue harden into a hard BLACK bead?',
        fx: 0.44, fy: 200, yes: 'polyester', no: 'nylon' },
  d3: { kind: 'd', label: ['Dissolves', 'in bleach?'], prop: 'bleachSoluble',
        full: 'PROTEIN fiber: does it dissolve quickly in household bleach?',
        fx: 0.24, fy: 328, yes: 'silk', no: 'wool' },
  cotton: { kind: 'leaf', fiber: 'cotton', fx: 0.07, fy: 328 },
  polyester: { kind: 'leaf', fiber: 'polyester', fx: 0.40, fy: 328 },
  nylon: { kind: 'leaf', fiber: 'nylon', fx: 0.53, fy: 328 },
  silk: { kind: 'leaf', fiber: 'silk', fx: 0.18, fy: 452 },
  wool: { kind: 'leaf', fiber: 'wool', fx: 0.30, fy: 452 }
};
const EDGES = [
  ['d1', 'd2', 'No'], ['d1', 'd4', 'Yes'],
  ['d2', 'cotton', 'No'], ['d2', 'd3', 'Yes'],
  ['d4', 'polyester', 'Yes'], ['d4', 'nylon', 'No'],
  ['d3', 'silk', 'Yes'], ['d3', 'wool', 'No']
];

let sample = 'polyester';
let current = 'd1';
let pathEdges = [];   // [parent, child] pairs taken
let stepNote = '';
let stepOK = null;    // true/false/null
let finished = false;
let resultOK = false;

function setup() {
  updateCanvasSize();
  const cnv = createCanvas(canvasWidth, canvasHeight);
  cnv.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  yesButton = createButton('Answer: Yes');
  yesButton.mousePressed(() => answer(true));
  noButton = createButton('Answer: No');
  noButton.mousePressed(() => answer(false));
  newButton = createButton('Start New Sample');
  newButton.mousePressed(newSample);

  positionControls();
  newSample();
}

function positionControls() {
  const r = drawHeight + 12;
  yesButton.position(margin, r);
  noButton.position(margin + 110, r);
  newButton.position(margin + 220, r);
}

function updateCanvasSize() {
  const c = document.querySelector('main');
  if (c) canvasWidth = Math.max(760, Math.floor(c.getBoundingClientRect().width));
}
function windowResized() {
  updateCanvasSize(); resizeCanvas(canvasWidth, canvasHeight); positionControls();
}

function newSample() {
  const keys = Object.keys(FIBERS);
  sample = keys[Math.floor(Math.random() * keys.length)];
  current = 'd1';
  pathEdges = [];
  stepNote = 'Read the observed test results, then answer Yes / No at the highlighted node.';
  stepOK = null;
  finished = false;
  resultOK = false;
}

function answer(yes) {
  if (finished) { stepNote = 'Press "Start New Sample" to begin again.'; return; }
  const node = TREE[current];
  if (node.kind !== 'd') return;
  const correct = !!FIBERS[sample][node.prop];
  stepOK = (yes === correct);
  stepNote = stepOK
    ? 'Matches the sample’s observed result. Advancing…'
    : 'Mismatch: the sample’s result is actually ' + (correct ? 'YES' : 'NO') + '. Your path diverges here.';
  const next = yes ? node.yes : node.no;
  pathEdges.push([current, next]);
  current = next;
  if (TREE[current].kind === 'leaf') {
    finished = true;
    resultOK = (TREE[current].fiber === sample);
    stepNote = resultOK
      ? 'Correct! The protocol identifies this fiber.'
      : 'This leaf does not match the sample. Trace back to find where the logic diverged.';
  }
}

function draw() {
  background('#f3f6fb');
  noStroke();
  fill('#eef3fb'); rect(0, 0, canvasWidth, drawHeight);
  fill('#f4f4f4'); rect(0, drawHeight, canvasWidth, controlHeight);

  fill('#173a63'); textAlign(CENTER, TOP); textSize(20); textStyle(BOLD);
  text('Fiber Identification Decision Tree', canvasWidth * 0.31, 8); textStyle(NORMAL);

  drawTree();
  drawPanel(canvasWidth * 0.62, 44, canvasWidth - margin - canvasWidth * 0.62, drawHeight - 60);
}

function visited(p, c) {
  return pathEdges.some(e => e[0] === p && e[1] === c);
}

function drawTree() {
  // edges first
  for (const [p, c, lab] of EDGES) {
    const a = TREE[p], b = TREE[c];
    const x1 = canvasWidth * a.fx, y1 = a.fy + 30;
    const x2 = canvasWidth * b.fx, y2 = b.fy - (b.kind === 'd' ? 30 : 20);
    const on = visited(p, c);
    stroke(on ? GREEN : DIM); strokeWeight(on ? 3 : 1.5);
    line(x1, y1, x2, y2);
    noStroke();
    fill(on ? GREEN : '#8a93a3');
    textAlign(CENTER, CENTER); textSize(11); textStyle(BOLD);
    text(lab, (x1 + x2) / 2 + (lab === 'Yes' ? 10 : -10), (y1 + y2) / 2);
    textStyle(NORMAL);
  }
  // nodes
  for (const key of Object.keys(TREE)) {
    const n = TREE[key];
    const x = canvasWidth * n.fx, y = n.fy;
    const onPath = key === 'd1' || pathEdges.some(e => e[1] === key);
    if (n.kind === 'd') drawDiamond(x, y, n, key === current, onPath);
    else drawLeaf(x, y, n, key === current);
  }
}

function drawDiamond(x, y, n, isCur, onPath) {
  const hw = 58, hh = 30;
  if (isCur && !finished) {
    const pulse = 2 + 1.5 * sin(frameCount * 0.15);
    stroke(YELLOW); strokeWeight(3 + pulse); noFill();
    quad(x, y - hh - 4, x + hw + 4, y, x, y + hh + 4, x - hw - 4, y);
  }
  stroke(onPath ? '#caa400' : DIM); strokeWeight(onPath ? 2 : 1.2);
  fill(onPath ? '#fff3cf' : '#fafbfd');
  quad(x, y - hh, x + hw, y, x, y + hh, x - hw, y);
  noStroke(); fill('#5b4a00'); textAlign(CENTER, CENTER); textSize(11); textStyle(BOLD);
  text(n.label[0], x, y - 7); text(n.label[1], x, y + 6); textStyle(NORMAL);
}

function drawLeaf(x, y, n, isCur) {
  const f = FIBERS[n.fiber], w = 92, h = 40;
  const reached = isCur && finished;
  stroke(reached ? (resultOK ? GREEN : RED) : f.color);
  strokeWeight(reached ? 3 : 1.5);
  fill(reached ? (resultOK ? '#e6f4e6' : '#fdeaea') : '#ffffff');
  rect(x - w / 2, y - h / 2, w, h, 6);
  noStroke(); fill(f.color); textAlign(CENTER, CENTER); textSize(13); textStyle(BOLD);
  text(f.name, x, y - 5); textStyle(NORMAL);
  fill('#7a808c'); textSize(9); text(f.type, x, y + 11);
  if (reached) {
    fill(resultOK ? GREEN : RED); textSize(16); textStyle(BOLD);
    text(resultOK ? '✓' : '✗', x + w / 2 - 10, y - h / 2 + 9); textStyle(NORMAL);
  }
}

function drawPanel(px, py, pw, ph) {
  noStroke(); fill('#ffffff'); stroke('#d6deea'); strokeWeight(1);
  rect(px, py, pw, ph, 10); noStroke();

  let yy = py + 14;
  fill('#173a63'); textAlign(LEFT, TOP); textSize(14); textStyle(BOLD);
  text('Unknown Sample', px + 14, yy); textStyle(NORMAL);
  drawFlame(px + pw - 28, yy + 8);
  yy += 26;

  const f = FIBERS[sample];
  fill('#33404f'); textSize(11.5);
  for (const line of f.obs) { text(line, px + 14, yy, pw - 28); yy += 16; }
  yy += 10;

  stroke('#e3e8f0'); line(px + 12, yy, px + pw - 12, yy); noStroke(); yy += 12;

  // current prompt
  fill('#173a63'); textSize(12.5); textStyle(BOLD);
  text(finished ? 'Result' : 'Current question', px + 14, yy); textStyle(NORMAL); yy += 18;
  if (!finished) {
    fill('#33404f'); textSize(12);
    text(TREE[current].full, px + 14, yy, pw - 28); yy += 56;
  }

  // feedback note
  let nc = '#5b6472';
  if (finished) nc = resultOK ? GREEN : RED;
  else if (stepOK === true) nc = GREEN;
  else if (stepOK === false) nc = RED;
  fill(nc); textSize(12); textStyle(stepOK === null && !finished ? NORMAL : BOLD);
  text(stepNote, px + 14, yy, pw - 28); textStyle(NORMAL);

  if (finished) {
    yy += 50;
    fill('#173a63'); textSize(12); textStyle(BOLD);
    text('Typical crime-scene sources:', px + 14, yy); textStyle(NORMAL); yy += 16;
    fill('#33404f'); textSize(11.5);
    text(FIBERS[sample].sources + '.', px + 14, yy, pw - 28); yy += 30;
    fill('#7a808c'); textSize(11);
    text('Cross-section: ' + FIBERS[sample].cross + '.', px + 14, yy, pw - 28);
  }
}

function drawFlame(x, y) {
  const f = 1 + 0.18 * sin(frameCount * 0.3);
  noStroke();
  fill('#f4801f'); ellipse(x, y, 14, 22 * f);
  fill('#f6c343'); ellipse(x, y + 2, 7, 12 * f);
}
