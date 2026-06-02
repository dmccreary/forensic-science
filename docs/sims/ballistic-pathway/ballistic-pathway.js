// Firearms Ballistic Pathway — Remember (L1)
// CANVAS_HEIGHT: 510
// Annotated diagram of the three ballistic phases (Internal, External,
// Terminal). Click any evidence item to identify what it is, when it is
// produced, and how it is collected.

let canvasWidth = 820;
const drawHeight = 460;
const controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
const margin = 15;
const defaultTextSize = 16;

// colors
const GUNMETAL = '#5a626b';
const GUNMETAL_D = '#3c424a';
const TRAJ = '#c0392b';
const LABEL = '#1f6fb2';
const TAN = '#d9b38c';

let evidenceSelect, riflingCheck, resetButton;
let selected = null;          // id string of selected evidence
let hotspots = [];            // rebuilt each frame for hit-testing
let hoverBarrel = false;

const EVIDENCE = {
  rifling: {
    label: 'Rifling marks', phase: 'Internal',
    what: 'Spiral striations engraved on the bullet by the lands and grooves inside the barrel.',
    when: 'Produced inside the barrel as the bullet travels down it (internal phase).',
    how: 'Recovered bullet examined on a comparison microscope against test fires.',
    data: 'Class characteristics: e.g. 6 lands & grooves, right (clockwise) twist.'
  },
  breech: {
    label: 'Breech face impression', phase: 'Internal',
    what: 'Marks stamped onto the cartridge case head by the breech face on firing.',
    when: 'At discharge, as chamber pressure forces the case back against the breech.',
    how: 'Fired cartridge case compared microscopically to test-fired cases.',
    data: 'Individual characteristics unique to one firearm; plus firing-pin impression.'
  },
  gsr: {
    label: 'GSR emission', phase: 'Internal',
    what: 'Gunshot residue: burned/unburned powder and primer particles expelled on firing.',
    when: 'At discharge, ejected from the muzzle and gaps in a spreading cone.',
    how: 'Collected with adhesive stubs from hands/clothing; analyzed by SEM-EDX.',
    data: 'Emission direction: forward from the muzzle and around the ejection port.'
  },
  trajectory: {
    label: 'Trajectory angle', phase: 'External',
    what: 'The straight-line flight path of the bullet between firearm and target.',
    when: 'During the external phase, after the bullet leaves the muzzle.',
    how: 'Reconstructed with trajectory rods, strings, or lasers through entry/exit points.',
    data: 'Angle measured relative to horizontal and vertical reference planes.'
  },
  wound: {
    label: 'Wound characteristics', phase: 'Terminal',
    what: 'Damage produced where the bullet strikes the target (terminal phase).',
    when: 'On impact with the target.',
    how: 'Documented at autopsy; entry vs. exit morphology compared.',
    data: 'Entry: small, round, abrasion collar. Exit: larger, irregular, everted.'
  },
  entry: {
    label: 'Entry wound', phase: 'Terminal',
    what: 'Where the bullet enters — typically small and round with an abrasion collar.',
    when: 'First moment of impact (terminal phase).',
    how: 'Measured and photographed; checked for soot/stippling indicating range.',
    data: 'Often smaller than the bullet; abrasion collar of scraped skin.'
  },
  exit: {
    label: 'Exit wound', phase: 'Terminal',
    what: 'Where the bullet leaves — typically larger and irregular with everted edges.',
    when: 'As the bullet passes through and out of the target (terminal phase).',
    how: 'Compared with the entry wound to establish bullet path direction.',
    data: 'No abrasion collar; tissue pushed outward (everted).'
  }
};
const ORDER = ['rifling', 'breech', 'gsr', 'trajectory', 'wound', 'entry', 'exit'];

function updateCanvasSize() {
  const c = document.querySelector('main');
  if (c) canvasWidth = Math.max(700, Math.floor(c.getBoundingClientRect().width));
}

function setup() {
  updateCanvasSize();
  const cnv = createCanvas(canvasWidth, canvasHeight);
  cnv.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  evidenceSelect = createSelect();
  evidenceSelect.option('— select evidence —');
  ORDER.forEach(id => evidenceSelect.option(EVIDENCE[id].label));
  evidenceSelect.changed(() => {
    const v = evidenceSelect.value();
    const id = ORDER.find(k => EVIDENCE[k].label === v);
    selected = id || null;
  });
  riflingCheck = createCheckbox(' Animate rifling', false);
  resetButton = createButton('Reset');
  resetButton.mousePressed(() => {
    selected = null;
    evidenceSelect.selected('— select evidence —');
    riflingCheck.checked(false);
  });
  positionControls();
}

function positionControls() {
  const r1 = drawHeight + 10;
  evidenceSelect.position(margin, r1);
  riflingCheck.position(margin + 230, r1 + 3);
  resetButton.position(margin + 400, r1);
}

function windowResized() {
  updateCanvasSize(); resizeCanvas(canvasWidth, canvasHeight); positionControls();
}

function draw() {
  hotspots = [];
  noStroke();
  fill('#eef3fb'); rect(0, 0, canvasWidth, drawHeight);
  fill('#f4f4f4'); rect(0, drawHeight, canvasWidth, controlHeight);

  fill('#1a3a6c'); textAlign(CENTER, TOP); textSize(20); textStyle(BOLD);
  text('Ballistic Pathway: Trigger to Wound', canvasWidth / 2, 8); textStyle(NORMAL);

  drawPhaseBands();
  drawFirearm();
  drawTrajectory();
  drawTarget();
  drawEvidenceLabels();
  drawDetailPanel();
}

function phaseX() {
  return { a: canvasWidth / 3, b: (canvasWidth * 2) / 3 };
}

function drawPhaseBands() {
  const { a, b } = phaseX();
  const top = 38, bot = 250;
  // separators
  stroke('#c4cede'); strokeWeight(1); drawingContext.setLineDash([4, 4]);
  line(a, top, a, bot); line(b, top, b, bot); drawingContext.setLineDash([]);
  noStroke();
  const labels = [['Internal', a / 2], ['External', (a + b) / 2], ['Terminal', (b + canvasWidth) / 2]];
  const subs = ['inside the firearm', 'bullet in flight', 'impact with target'];
  fill('#1a3a6c'); textAlign(CENTER, TOP); textStyle(BOLD); textSize(15);
  labels.forEach((L, i) => text(L[0], L[1], 40));
  textStyle(NORMAL); fill('#5a6472'); textSize(11);
  labels.forEach((L, i) => text(subs[i], L[1], 58));
}

function drawFirearm() {
  const { a } = phaseX();
  const muzzleX = a - 18, gunY = 150;
  // body
  fill(GUNMETAL); stroke(GUNMETAL_D); strokeWeight(1.5);
  rect(margin + 8, gunY - 14, muzzleX - (margin + 8), 24, 3);     // barrel
  rect(margin + 8, gunY - 22, 46, 52, 3);                          // breech block
  rect(margin + 18, gunY + 28, 18, 40, 3);                          // grip
  rect(margin + 30, gunY + 8, 24, 14, 2);                           // trigger guard area
  noStroke(); fill(GUNMETAL_D); rect(margin + 38, gunY + 10, 4, 12, 1); // trigger
  // muzzle opening
  fill('#222'); rect(muzzleX - 4, gunY - 10, 5, 16, 1);

  // barrel cross-section inset (rifling)
  const cx = margin + 70, cy = 218, rad = 23;
  hoverBarrel = dist(mouseX, mouseY, cx, cy) < rad + 4 && mouseY < drawHeight;
  stroke(GUNMETAL_D); strokeWeight(2); fill('#2b2f34'); circle(cx, cy, rad * 2);
  const animate = riflingCheck.checked() || hoverBarrel;
  const spin = animate ? frameCount * 0.04 : 0.6;
  stroke('#8a929b'); strokeWeight(2);
  for (let i = 0; i < 6; i++) {
    const ang = spin + (i * TWO_PI) / 6;
    const x1 = cx + Math.cos(ang) * (rad - 9), y1 = cy + Math.sin(ang) * (rad - 9);
    const x2 = cx + Math.cos(ang) * rad, y2 = cy + Math.sin(ang) * rad;
    line(x1, y1, x2, y2);
  }
  noStroke(); fill('#666'); textAlign(CENTER, TOP); textSize(10);
  text('barrel cross-section', cx, cy + rad + 4);
  text(animate ? '(6 lands & grooves, right twist)' : '(hover or check to animate)', cx, cy + rad + 17);
}

function drawTrajectory() {
  const { a, b } = phaseX();
  const x0 = a - 18, y0 = 150, x1 = canvasWidth - 150, y1 = 175;
  stroke(TRAJ); strokeWeight(2.5); drawingContext.setLineDash([8, 6]); noFill();
  line(x0, y0, x1, y1); drawingContext.setLineDash([]);
  // bullet
  noStroke(); fill(TRAJ);
  const bx = (x0 + x1) / 2, by = (y0 + y1) / 2;
  push(); translate(bx, by); rotate(Math.atan2(y1 - y0, x1 - x0));
  ellipse(0, 0, 16, 7); pop();
  // angle arc reference
  stroke('#999'); strokeWeight(1); drawingContext.setLineDash([3, 3]);
  line(x0, y0, x0 + 90, y0); drawingContext.setLineDash([]);
  noStroke(); fill('#777'); textAlign(LEFT, BOTTOM); textSize(10);
  text('angle θ', x0 + 40, y0 - 3);
}

function drawTarget() {
  const tx = canvasWidth - 95, topY = 95;
  // simplified torso silhouette
  fill(TAN); stroke('#a8855f'); strokeWeight(1.5);
  rect(tx, topY + 18, 70, 120, 14);          // torso
  circle(tx + 35, topY, 34);                  // head
  noStroke();
  // entry wound (small, clean) on left side facing trajectory
  const ex = tx + 6, ey = topY + 70;
  fill('#7a1f1f'); circle(ex, ey, 10);
  stroke('#8a5a3a'); strokeWeight(2); noFill(); circle(ex, ey, 16); noStroke(); // abrasion collar
  // exit wound (larger, irregular) on right
  const xx = tx + 64, xy = topY + 82;
  fill('#7a1f1f');
  beginShape();
  for (let i = 0; i < 9; i++) {
    const ang = (i / 9) * TWO_PI;
    const rr = 9 + (i % 2 === 0 ? 4 : 0);
    vertex(xx + Math.cos(ang) * rr, xy + Math.sin(ang) * rr);
  }
  endShape(CLOSE);
  // register wound hotspots
  hotspots.push({ id: 'entry', x: ex - 12, y: ey - 12, w: 24, h: 24 });
  hotspots.push({ id: 'exit', x: xx - 14, y: xy - 14, w: 28, h: 28 });
  fill('#5a6472'); textAlign(CENTER, TOP); textSize(10);
  text('entry', ex, ey + 14); text('exit', xx, xy + 16);
  text('target', tx + 35, topY + 142);
}

// pill-style clickable evidence label with a leader line to a feature point
function evidenceLabel(id, lx, ly, fx, fy) {
  const info = EVIDENCE[id];
  textSize(12); textStyle(BOLD);
  const w = textWidth(info.label) + 18, h = 22;
  // leader
  stroke('#9aa6b8'); strokeWeight(1); line(lx + w / 2, ly + h, fx, fy);
  noStroke(); fill('#9aa6b8'); circle(fx, fy, 5);
  const isSel = selected === id;
  fill(isSel ? LABEL : '#ffffff'); stroke(LABEL); strokeWeight(1.3);
  rect(lx, ly, w, h, 11); noStroke();
  fill(isSel ? '#ffffff' : LABEL); textAlign(CENTER, CENTER);
  text(info.label, lx + w / 2, ly + h / 2 - 1);
  textStyle(NORMAL);
  hotspots.push({ id, x: lx, y: ly, w, h });
}

function drawEvidenceLabels() {
  const { a, b } = phaseX();
  evidenceLabel('breech', margin + 6, 96, margin + 30, 132);
  evidenceLabel('rifling', margin + 110, 150, margin + 70, 202);
  evidenceLabel('gsr', a - 70, 96, a - 14, 146);
  evidenceLabel('trajectory', (a + b) / 2 - 50, 118, (a + b) / 2, 162);
  evidenceLabel('wound', b + 18, 96, canvasWidth - 90, 165);
}

function drawDetailPanel() {
  const x = margin, y = 278, w = canvasWidth - 2 * margin, h = drawHeight - y - 12;
  fill('#fff'); stroke('#ccc'); strokeWeight(1); rect(x, y, w, h, 8); noStroke();
  if (!selected) {
    fill('#b06a00'); textAlign(LEFT, TOP); textStyle(BOLD); textSize(14);
    text('Click an evidence item (or the entry / exit wound) to identify it.', x + 14, y + 14);
    textStyle(NORMAL); fill('#666'); textSize(12);
    text('Each phase — Internal, External, Terminal — produces its own evidence.', x + 14, y + 38);
    return;
  }
  const info = EVIDENCE[selected];
  fill('#1a3a6c'); textAlign(LEFT, TOP); textStyle(BOLD); textSize(15);
  text(info.label, x + 14, y + 12);
  // phase chip
  const chipW = textWidth(info.phase + ' phase') + 16;
  const chipX = x + 14 + textWidth(info.label) + 20;
  fill('#e3edf9'); rect(chipX, y + 11, chipW, 20, 10);
  fill(LABEL); textSize(11); textAlign(LEFT, CENTER);
  text(info.phase + ' phase', chipX + 8, y + 21);
  textStyle(NORMAL); textAlign(LEFT, TOP); textSize(12.5);
  let yy = y + 40;
  const row = (k, v) => {
    fill('#1f6fb2'); textStyle(BOLD); text(k, x + 14, yy);
    fill('#333'); textStyle(NORMAL); text(v, x + 14 + textWidth(k) + 6, yy, w - 40 - textWidth(k));
    yy += lineCount(v, w - 40 - textWidth(k)) * 16 + 4;
  };
  row('What: ', info.what);
  row('When: ', info.when);
  row('How collected: ', info.how);
  fill('#b35900'); textStyle(BOLD); text('Class/individual data: ', x + 14, yy);
  fill('#7a4d00'); textStyle(NORMAL);
  text(info.data, x + 14 + textWidth('Class/individual data: ') + 8, yy, w - 60);
}

function lineCount(s, maxW) {
  // estimate wrapped line count for vertical spacing
  textSize(12.5);
  const words = s.split(' '); let line = '', n = 1;
  for (const word of words) {
    if (textWidth(line + word + ' ') > maxW) { n++; line = word + ' '; }
    else line += word + ' ';
  }
  return n;
}

function mousePressed() {
  if (mouseY > drawHeight) return;
  for (let i = hotspots.length - 1; i >= 0; i--) {
    const hs = hotspots[i];
    if (mouseX >= hs.x && mouseX <= hs.x + hs.w && mouseY >= hs.y && mouseY <= hs.y + hs.h) {
      selected = hs.id;
      evidenceSelect.selected(EVIDENCE[hs.id].label);
      return;
    }
  }
}

function mouseMoved() {
  let over = mouseY < drawHeight && hotspots.some(hs =>
    mouseX >= hs.x && mouseX <= hs.x + hs.w && mouseY >= hs.y && mouseY <= hs.y + hs.h);
  cursor(over ? HAND : ARROW);
}
