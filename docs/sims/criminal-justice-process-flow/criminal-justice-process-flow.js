// Criminal Justice Process - From Crime Scene to Verdict - p5.js
// CANVAS_HEIGHT: 610
// Bloom Level: Understand (L2) - explain the sequence of stages in the U.S. criminal
// justice process and identify where forensic evidence and constitutional protections
// enter at each stage. The learner clicks any stage to read its role; a toggle
// highlights the stages where forensic evidence is pivotal.
// MicroSim template version 2026.03

// ---- layout globals ----
let containerWidth;
let canvasWidth = 400;
let drawHeight = 560;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 14;
let defaultTextSize = 16;

// ---- controls ----
let forensicCheckbox;

// ---- state ----
let selected = -1;
let stageRects = [];   // rebuilt each frame for hit-testing
let hoverIndex = -1;

// category palette
const CAT = {
  investigate: { bg: '#cfe2f3', border: '#2c6fbb', label: 'Investigation' },
  procedural:  { bg: '#ffe3c2', border: '#e08a1e', label: 'Legal / procedural' },
  forensic:    { bg: '#d5efd5', border: '#2ca02c', label: 'Forensic analysis & testimony' },
  adjudicate:  { bg: '#e6d6f0', border: '#7b3fa0', label: 'Adjudication' }
};
const HILITE = { bg: '#fff3b0', border: '#d4a017' };

// ---- stages ----
const STAGES = [
  { n: 1, name: 'Crime Occurs', cat: 'investigate', forensic: false,
    detail: 'Forensic role: Trace evidence, biological material, and impressions begin degrading immediately. The sooner the scene is secured and documented, the more evidence survives.' },
  { n: 2, name: 'Crime Scene Investigation', cat: 'investigate', forensic: true,
    amendment: '4th Amendment — governs searches & seizures',
    detail: 'Forensic role: Evidence collection follows chain-of-custody protocols from the first moment. The Fourth Amendment governs what can be seized without a warrant.' },
  { n: 3, name: 'Laboratory Analysis', cat: 'forensic', forensic: true,
    detail: 'Forensic role: DNA, fingerprints, trace evidence, toxicology, and digital evidence are processed and documented. Results are preserved for court.' },
  { n: 4, name: 'Arrest', cat: 'procedural', forensic: false,
    amendment: '4th Amendment (probable cause) + 5th Amendment (Miranda rights)',
    detail: 'Constitutional issue: The Fourth Amendment requires probable cause. Miranda rights (Fifth Amendment) must be delivered. Physical samples can be compelled with appropriate authority.' },
  { n: 5, name: 'Charging Decision', cat: 'procedural', forensic: false,
    detail: 'Forensic role: Laboratory results directly inform charging decisions. Prosecutors may request additional testing before filing charges.' },
  { n: 6, name: 'Preliminary Hearing / Grand Jury', cat: 'procedural', forensic: false,
    detail: 'Forensic role: Expert testimony or lab reports may be presented to establish that sufficient evidence exists to proceed to trial.' },
  { n: 7, name: 'Discovery', cat: 'procedural', forensic: true,
    amendment: 'Due process — Brady v. Maryland disclosure duty',
    detail: 'Forensic role: All lab reports, chain-of-custody documentation, analyst qualifications, and methodology records must be disclosed to the defense under Brady v. Maryland.' },
  { n: 8, name: 'Admissibility Hearing', cat: 'forensic', forensic: true,
    amendment: 'Judge as gatekeeper — Daubert / Frye standard',
    detail: 'Forensic role: The expert\'s qualifications and methodology are scrutinized. Evidence may be excluded if it fails the applicable standard. This is where Daubert and Frye matter in practice.' },
  { n: 9, name: 'Trial', cat: 'forensic', forensic: true,
    detail: 'Forensic role: Expert witnesses testify about findings. Defense experts may challenge methodology or offer alternative interpretations. Standard: beyond a reasonable doubt.' },
  { n: 10, name: 'Verdict', cat: 'adjudicate', forensic: false,
    detail: 'Standard of proof: beyond a reasonable doubt in criminal cases. Forensic evidence is one factor in deliberation — not automatically determinative.' },
  { n: 11, name: 'Sentencing', cat: 'adjudicate', forensic: false,
    detail: 'Forensic role: DNA matches to additional offenses or aggravating physical evidence may affect sentencing in some jurisdictions.' }
];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  forensicCheckbox = createCheckbox(' Highlight Forensic Entry Points', false);
  forensicCheckbox.position(10, drawHeight + 14);

  describe('Vertical flowchart of the U.S. criminal justice process from crime scene to verdict. Click any of the 11 stages to read where forensic evidence and constitutional protections apply. A toggle highlights the stages where forensic evidence is pivotal.', LABEL);
}

function draw() {
  updateCanvasSize();
  stageRects = [];
  hoverIndex = -1;

  // regions
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
  textAlign(LEFT, TOP);
  textSize(19);
  text('Criminal Justice Process', margin, 8);
  textSize(12);
  fill('#495057');
  text('From crime scene to verdict — click a stage to see the forensic & constitutional role', margin, 31);

  const leftColW = canvasWidth * 0.50 - margin - 4;
  drawFlowchart(margin, leftColW);

  const rightX = canvasWidth * 0.50 + 4;
  const rightW = canvasWidth - rightX - margin;
  drawDetailPanel(rightX, rightW);

  drawControlLabel();
  drawBadgeTooltip();
}

function drawFlowchart(x, w) {
  const top = 52;
  const bottom = drawHeight - 10;
  const n = STAGES.length;
  const gap = 7;
  const barH = (bottom - top - gap * (n - 1)) / n;
  const highlight = forensicCheckbox && forensicCheckbox.checked();

  for (let i = 0; i < n; i++) {
    const s = STAGES[i];
    const y = top + i * (barH + gap);
    stageRects.push({ x: x, y: y, w: w, h: barH, i: i });

    const hovering = mouseX >= x && mouseX <= x + w && mouseY >= y && mouseY <= y + barH && mouseY < drawHeight;
    if (hovering) hoverIndex = i;

    const cat = CAT[s.cat];
    const useHi = highlight && s.forensic;
    const bg = useHi ? HILITE.bg : cat.bg;
    const bd = useHi ? HILITE.border : cat.border;

    // bar
    stroke(i === selected ? '#1a3a6c' : bd);
    strokeWeight(i === selected ? 3 : (hovering ? 2.5 : 1.2));
    fill(bg);
    rect(x, y, w, barH, 7);

    // number disc
    noStroke();
    fill(bd);
    ellipse(x + 16, y + barH / 2, 22, 22);
    fill('white');
    textAlign(CENTER, CENTER);
    textSize(12);
    textStyle(BOLD);
    text(s.n, x + 16, y + barH / 2);
    textStyle(NORMAL);

    // stage name
    fill('#212529');
    textAlign(LEFT, CENTER);
    textSize(barH < 38 ? 11.5 : 12.5);
    text(s.name, x + 32, y + barH / 2, w - 56, barH);

    // constitutional badge
    if (s.amendment) {
      noStroke();
      fill('#6a1b9a');
      ellipse(x + w - 14, y + 13, 18, 18);
      fill('white');
      textAlign(CENTER, CENTER);
      textSize(11);
      textStyle(BOLD);
      text('§', x + w - 14, y + 12);
      textStyle(NORMAL);
    }

    // down arrow between bars
    if (i < n - 1) {
      stroke('#adb5bd');
      strokeWeight(1.5);
      const ax = x + 16;
      line(ax, y + barH, ax, y + barH + gap);
      noStroke();
      fill('#adb5bd');
      triangle(ax - 3, y + barH + gap - 3, ax + 3, y + barH + gap - 3, ax, y + barH + gap);
    }
  }
}

function drawDetailPanel(x, w) {
  const top = 52;
  const h = drawHeight - 10 - top;
  noStroke();
  fill('white');
  stroke('#c9c9c9');
  strokeWeight(1);
  rect(x, top, w, h, 8);

  if (selected < 0) {
    // default: instructions + category legend
    noStroke();
    fill('#1a3a6c');
    textAlign(LEFT, TOP);
    textSize(14);
    text('How a case moves through the system', x + 12, top + 12, w - 24, 50);
    fill('#343a40');
    textSize(12);
    text('Click any numbered stage on the left to read where forensic evidence enters and which constitutional protections apply. A § badge marks stages with a constitutional or gatekeeping rule.',
         x + 12, top + 44, w - 24, 110);

    // legend
    let ly = top + 150;
    noStroke();
    fill('#1a3a6c');
    textSize(12);
    text('Stage colors', x + 12, ly);
    ly += 20;
    const keys = ['investigate', 'forensic', 'procedural', 'adjudicate'];
    for (let k = 0; k < keys.length; k++) {
      const c = CAT[keys[k]];
      stroke(c.border);
      strokeWeight(1.2);
      fill(c.bg);
      rect(x + 12, ly, 16, 16, 4);
      noStroke();
      fill('#343a40');
      textAlign(LEFT, CENTER);
      textSize(11.5);
      text(c.label, x + 34, ly + 8, w - 46, 18);
      ly += 24;
    }
    // forensic highlight legend
    stroke(HILITE.border);
    strokeWeight(1.2);
    fill(HILITE.bg);
    rect(x + 12, ly, 16, 16, 4);
    noStroke();
    fill('#343a40');
    textAlign(LEFT, CENTER);
    textSize(11.5);
    text('Forensic entry point (toggle below)', x + 34, ly + 8, w - 46, 18);
    return;
  }

  const s = STAGES[selected];
  const cat = CAT[s.cat];

  // header band
  noStroke();
  fill(cat.border);
  rect(x, top, w, 34, 8, 8, 0, 0);
  fill('white');
  textAlign(LEFT, CENTER);
  textSize(13);
  textStyle(BOLD);
  text('Stage ' + s.n + ': ' + s.name, x + 12, top + 17, w - 24, 30);
  textStyle(NORMAL);

  let yy = top + 46;
  // category tag
  noStroke();
  fill('#6c757d');
  textAlign(LEFT, TOP);
  textSize(11);
  text(cat.label.toUpperCase(), x + 12, yy);
  yy += 20;

  // detail body
  fill('#212529');
  textSize(12.5);
  text(s.detail, x + 12, yy, w - 24, h - (yy - top) - 12);

  // constitutional callout
  if (s.amendment) {
    const cy = top + h - 58;
    fill('#f3eafb');
    stroke('#c9b8e0');
    strokeWeight(1);
    rect(x + 10, cy, w - 20, 46, 6);
    noStroke();
    fill('#6a1b9a');
    textAlign(LEFT, TOP);
    textSize(11);
    textStyle(BOLD);
    text('§ Constitutional / gatekeeping rule', x + 18, cy + 7);
    textStyle(NORMAL);
    fill('#3a2050');
    textSize(11);
    text(s.amendment, x + 18, cy + 23, w - 36, 22);
  }
}

function drawControlLabel() {
  noStroke();
  fill('#495057');
  textAlign(LEFT, CENTER);
  textSize(12);
  const msg = (selected >= 0) ? ('Selected: stage ' + STAGES[selected].n) : 'Click a stage to begin';
  text(msg, canvasWidth - 220, drawHeight + 25, 210, 20);
}

function drawBadgeTooltip() {
  if (hoverIndex < 0) return;
  const s = STAGES[hoverIndex];
  if (!s.amendment) return;
  const tw = min(240, canvasWidth - 24);
  textSize(11);
  textAlign(LEFT, TOP);
  const lines = Math.ceil(textWidth(s.amendment) / (tw - 16)) + 1;
  const th = 12 + lines * 13;
  let tx = constrain(mouseX + 12, 8, canvasWidth - tw - 8);
  let ty = constrain(mouseY + 12, 8, drawHeight - th - 8);
  noStroke();
  fill(44, 62, 80, 245);
  rect(tx, ty, tw, th, 6);
  fill('white');
  text(s.amendment, tx + 8, ty + 6, tw - 16, th - 10);
}

// ---- interactions ----
function mousePressed() {
  for (let i = 0; i < stageRects.length; i++) {
    const r = stageRects[i];
    if (mouseX >= r.x && mouseX <= r.x + r.w && mouseY >= r.y && mouseY <= r.y + r.h) {
      selected = (selected === r.i) ? -1 : r.i;
      return;
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
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
