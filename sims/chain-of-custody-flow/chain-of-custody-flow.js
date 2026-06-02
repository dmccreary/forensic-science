// Chain of Custody Flow - p5.js
// CANVAS_HEIGHT: 560
// Bloom Level: Understand (L2) - explain the chain of custody for an evidence item.
// The learner STEPS THROUGH six custody stations with Next/Prev, sees who is
// responsible and what is documented at each transfer, and can toggle "Break the
// Chain" to drop a signature at the current step and see the INADMISSIBLE warning.
// MicroSim template version 2026.03

// ---- layout globals (standard MicroSim structure) ----
let containerWidth;
let canvasWidth = 400;
let drawHeight = 470;        // drawing region: workflow track (top) + detail panel (bottom)
let trackTop = 150;          // y center of the station track
let panelTop = 250;          // y where the detail panel begins
let controlHeight = 90;      // two rows of controls
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 20;
let defaultTextSize = 16;

// ---- controls ----
let prevButton, nextButton, resetButton, breakCheckbox;

// ---- state ----
let currentStep = 4;        // index 0..5 of the active station
let breakMode = true;      // when true, the current step's signature is missing
let brokenStep = 4;        // which step's link was broken (-1 = none)

// ---- color scheme (per spec) ----
const C_INVESTIGATOR = '#1f6feb';  // blue: active investigators
const C_STORAGE      = '#6c757d';  // gray: secure storage
const C_INTACT       = '#2e7d32';  // green: intact chain
const C_BROKEN       = '#c62828';  // red: broken chain / inadmissible

// ---- station data (concrete, accurate forensic content) ----
const STATIONS = [
  {
    short: 'Crime\nScene',
    title: '1. Crime Scene',
    role: 'Collection Officer',
    color: C_INVESTIGATOR,
    documents: 'Assigns the evidence item number (e.g., 2026-0142-A), photographs the item in place with a scale, and records the date, time, and exact location of recovery.',
    transfer: 'Signs the collection log as the first custodian.',
    skip: 'Without an item number and an in-place photo, the defense can argue the item was never actually at the scene — its origin cannot be tied to the crime.'
  },
  {
    short: 'Packaging\n& Labeling',
    title: '2. Packaging & Labeling',
    role: 'Collection Officer',
    color: C_INVESTIGATOR,
    documents: 'Packages the item by type (paper bag for biological evidence, rigid container for sharps), labels it with the item number and case number, then seals it with evidence tape and writes initials and date across the seal.',
    transfer: 'Initials and dates the tamper-evident seal.',
    skip: 'An unsealed or unlabeled package means contamination or substitution cannot be ruled out, so the item may be excluded.'
  },
  {
    short: 'Supervisor\nReview',
    title: '3. Supervisor Review',
    role: 'Lead Investigator',
    color: C_INVESTIGATOR,
    documents: 'Verifies the documentation is complete and the seal is intact before transport. Confirms the chain-of-custody form matches the item label.',
    transfer: 'Signs the chain-of-custody form accepting the item for transport.',
    skip: 'A missing review signature leaves a gap between collection and storage that no one can account for in testimony.'
  },
  {
    short: 'Evidence\nRoom',
    title: '4. Evidence Room',
    role: 'Evidence Custodian',
    color: C_STORAGE,
    documents: 'Logs the item into the property-management system, recording the date and time received, the storage location (e.g., shelf B-14), and any condition notes. Places the sealed item in secure, access-controlled storage.',
    transfer: 'Signs the receiving entry in the property log.',
    skip: 'If intake is not logged, there is no record of who held the item or where it was stored — the chain is undocumented.'
  },
  {
    short: 'Laboratory',
    title: '5. Laboratory Analyst',
    role: 'Forensic Analyst',
    color: C_INVESTIGATOR,
    documents: 'Signs the item out of storage, notes the seal was intact on receipt, performs testing, documents methods and results, then re-seals the item with new tape (initialed and dated) before returning it.',
    transfer: 'Signs the item out and back in; initials the new seal.',
    skip: 'If the analyst does not record an intact seal on receipt, the test results can be challenged as performed on a possibly altered item.'
  },
  {
    short: 'Courtroom',
    title: '6. Courtroom',
    role: 'Prosecutor / Evidence Clerk',
    color: C_INVESTIGATOR,
    documents: 'Signs the item into the court exhibit log, assigns an exhibit number, and presents it with the complete chain-of-custody record so the court can verify an unbroken trail from scene to trial.',
    transfer: 'Signs the court exhibit log.',
    skip: 'Without a complete record, the judge may rule the evidence inadmissible — even strong scientific results cannot be used.'
  }
];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  prevButton = createButton('< Prev');
  prevButton.position(10, drawHeight + 12);
  prevButton.mousePressed(goPrev);

  nextButton = createButton('Next >');
  nextButton.position(80, drawHeight + 12);
  nextButton.mousePressed(goNext);

  resetButton = createButton('Reset');
  resetButton.position(160, drawHeight + 12);
  resetButton.mousePressed(resetFlow);

  breakCheckbox = createCheckbox(' Break the Chain (drop this signature)', false);
  breakCheckbox.position(10, drawHeight + 52);
  breakCheckbox.changed(onBreakToggle);

  describe('Chain of Custody Flow: step through six evidence-handling stations from crime scene to courtroom with Next and Prev buttons. Each station shows who is responsible and what is documented. Toggle Break the Chain to remove a signature and see why the evidence becomes inadmissible.', LABEL);
}

function draw() {
  updateCanvasSize();

  // background regions
  noStroke();
  fill('aliceblue');
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  drawHeader();
  drawTrack();
  drawDetailPanel();
  drawControlLabels();
}

// ---- header ----
function drawHeader() {
  noStroke();
  fill('black');
  textAlign(CENTER, TOP);
  textSize(22);
  text('Chain of Custody Flow', canvasWidth / 2, 8);
  textSize(13);
  fill('#495057');
  text('Following one evidence item from the crime scene to the courtroom',
       canvasWidth / 2, 34);
}

// ---- workflow track (six stations + arrows) ----
function drawTrack() {
  const n = STATIONS.length;
  const usableW = canvasWidth - 2 * margin;
  const stepX = usableW / n;
  const boxW = min(stepX - 12, 92);
  const boxH = 64;
  const cy = trackTop;

  // arrows BETWEEN stations (drawn first so boxes sit on top)
  for (let i = 0; i < n - 1; i++) {
    const x1 = margin + stepX * (i + 0.5) + boxW / 2;
    const x2 = margin + stepX * (i + 1.5) - boxW / 2;
    drawArrow(x1, cy, x2, cy, i);
  }

  // station boxes
  for (let i = 0; i < n; i++) {
    const cx = margin + stepX * (i + 0.5);
    drawStationBox(cx, cy, boxW, boxH, i);
  }
}

function drawArrow(x1, y, x2, y2, transferIndex) {
  // a transfer is broken if the SOURCE station's signature was dropped
  const isBroken = (brokenStep === transferIndex);
  // the chain is "reached" (green) up to the current step
  const reached = (transferIndex < currentStep);

  let col;
  if (isBroken) col = C_BROKEN;
  else if (reached) col = C_INTACT;
  else col = '#adb5bd';

  stroke(col);
  strokeWeight(isBroken || reached ? 3 : 2);
  line(x1, y, x2, y2);
  // arrowhead
  noStroke();
  fill(col);
  triangle(x2, y2, x2 - 8, y2 - 5, x2 - 8, y2 + 5);

  // broken-link marker: a red X over the arrow
  if (isBroken) {
    const mx = (x1 + x2) / 2;
    stroke(C_BROKEN);
    strokeWeight(3);
    line(mx - 6, y - 6, mx + 6, y + 6);
    line(mx - 6, y + 6, mx + 6, y - 6);
    noStroke();
  }
}

function drawStationBox(cx, cy, w, h, i) {
  const st = STATIONS[i];
  const active = (i === currentStep);
  const visited = (i < currentStep);
  const isBroken = (brokenStep === i);

  rectMode(CENTER);
  // border + fill
  if (isBroken) {
    stroke(C_BROKEN);
    strokeWeight(3);
  } else if (active) {
    stroke('#0b3d91');
    strokeWeight(3);
  } else {
    stroke('#888');
    strokeWeight(1);
  }

  if (isBroken) fill('#f8d7da');
  else if (active) fill(st.color);
  else if (visited) fill('#d7ead9');
  else fill('white');
  rect(cx, cy, w, h, 8);
  rectMode(CORNER);

  // step number badge
  noStroke();
  fill(active && !isBroken ? 'white' : '#495057');
  textAlign(CENTER, TOP);
  textSize(10);
  text('STEP ' + (i + 1), cx, cy - h / 2 + 6);

  // station short name (two lines)
  fill(active && !isBroken ? 'white' : '#212529');
  textSize(11);
  textAlign(CENTER, CENTER);
  const lines = st.short.split('\n');
  const ly = cy - (lines.length - 1) * 7 + 4;
  for (let k = 0; k < lines.length; k++) {
    text(lines[k], cx, ly + k * 14);
  }

  // signature checkmark / missing indicator under the box
  textAlign(CENTER, TOP);
  textSize(11);
  if (i <= currentStep) {
    if (isBroken) {
      fill(C_BROKEN);
      text('signature MISSING', cx, cy + h / 2 + 4);
    } else {
      fill(C_INTACT);
      text('signed', cx, cy + h / 2 + 4);
    }
  }
}

// ---- detail panel for the current station ----
function drawDetailPanel() {
  const st = STATIONS[currentStep];
  const isBroken = (brokenStep === currentStep);
  const px = margin;
  const pw = canvasWidth - 2 * margin;
  const py = panelTop;
  const ph = drawHeight - py - margin;

  // panel background
  stroke('#c9d4e5');
  strokeWeight(1);
  fill('white');
  rect(px, py, pw, ph, 8);

  // title bar
  noStroke();
  fill(isBroken ? C_BROKEN : '#1a3a6c');
  rect(px, py, pw, 30, 8, 8, 0, 0);
  fill('white');
  textAlign(LEFT, CENTER);
  textSize(15);
  text(st.title, px + 12, py + 15);
  textAlign(RIGHT, CENTER);
  textSize(12);
  text('Responsible: ' + st.role, px + pw - 12, py + 15);

  // body content
  let yy = py + 40;
  const tx = px + 12;
  const tw = pw - 24;

  // form fields recorded here
  noStroke();
  fill('#495057');
  textAlign(LEFT, TOP);
  textSize(12);
  text('Recorded at this station:', tx, yy);
  yy += 18;
  fill('#212529');
  text('Item ID  -  Date / Time  -  Location  -  Condition notes  -  Signature',
       tx, yy, tw);
  yy += 22;

  // what is documented
  fill('#1a3a6c');
  textSize(12);
  text('What happens here:', tx, yy);
  yy += 16;
  fill('#212529');
  yy = wrappedText(st.documents, tx, yy, tw) + 8;

  // the transfer signature line
  fill('#1a3a6c');
  text('Transfer documentation:', tx, yy);
  yy += 16;
  fill(isBroken ? C_BROKEN : C_INTACT);
  const sig = isBroken
    ? 'MISSING - the required signature for this transfer was never recorded.'
    : st.transfer;
  yy = wrappedText(sig, tx, yy, tw) + 8;

  // skip consequence OR inadmissible banner
  if (isBroken) {
    drawInadmissibleBanner(px, yy, pw, st);
  } else {
    fill('#8a5a00');
    text('If this step is skipped:', tx, yy);
    yy += 16;
    fill('#5c3d00');
    wrappedText(st.skip, tx, yy, tw);
  }
}

function drawInadmissibleBanner(px, yy, pw, st) {
  const bx = px + 12;
  const bw = pw - 24;
  // box fills the remaining panel space, leaving a bottom margin
  const bh = drawHeight - margin - yy - 4;
  noStroke();
  fill('#f8d7da');
  stroke(C_BROKEN);
  strokeWeight(2);
  rect(bx, yy, bw, max(bh, 56), 6);
  // heading
  noStroke();
  fill(C_BROKEN);
  textAlign(LEFT, TOP);
  textSize(15);
  text('EVIDENCE INADMISSIBLE', bx + 10, yy + 8);
  // concise consequence that fits without clipping
  fill('#7a1010');
  textSize(12);
  text('A gap in the chain here means the court cannot verify the item was unaltered, so it may be excluded.',
       bx + 10, yy + 30, bw - 20, max(bh, 56) - 36);
}

// helper: draw wrapped text and return the y after it
function wrappedText(str, x, y, w) {
  textAlign(LEFT, TOP);
  textSize(12);
  text(str, x, y, w, drawHeight - y);
  // estimate height consumed (approx 14px per ~ (w/7) chars per line)
  const charsPerLine = max(1, Math.floor(w / 6.5));
  const lines = Math.ceil(str.length / charsPerLine);
  return y + lines * 15;
}

// ---- control-area status labels ----
function drawControlLabels() {
  noStroke();
  fill('#495057');
  textAlign(LEFT, CENTER);
  textSize(12);
  const status = 'Step ' + (currentStep + 1) + ' of ' + STATIONS.length +
                 (brokenStep >= 0 ? '  -  chain BROKEN at step ' + (brokenStep + 1) : '  -  chain intact');
  text(status, 240, drawHeight + 24);

  fill('#6c757d');
  textSize(11);
  text('Use Next / Prev to follow the evidence. Check the box to break the current link.',
       240, drawHeight + 52, canvasWidth - 250);
}

// ---- interactions ----
function goNext() {
  if (currentStep < STATIONS.length - 1) {
    currentStep++;
    syncBreakCheckbox();
  }
}

function goPrev() {
  if (currentStep > 0) {
    currentStep--;
    syncBreakCheckbox();
  }
}

function resetFlow() {
  currentStep = 0;
  breakMode = false;
  brokenStep = -1;
  if (breakCheckbox) breakCheckbox.checked(false);
}

function onBreakToggle() {
  breakMode = breakCheckbox.checked();
  brokenStep = breakMode ? currentStep : -1;
}

// keep the checkbox reflecting whether THIS step is the broken one
function syncBreakCheckbox() {
  const thisBroken = (brokenStep === currentStep);
  if (breakCheckbox) breakCheckbox.checked(thisBroken);
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
