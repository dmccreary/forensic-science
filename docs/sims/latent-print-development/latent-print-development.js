// Latent Print Development Technique Selector — Apply (L3)
// CANVAS_HEIGHT: 500
// Apply substrate-porosity logic to SELECT the correct latent-print development
// technique. Pick an evidence item, choose a technique, and Apply it. A correct
// choice develops a print in the technique-accurate color; a wrong choice shows
// a "no visible ridge pattern" failure with the reason.

let canvasWidth = 900;
const drawHeight = 450;
const controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
const margin = 15;
const defaultTextSize = 16;

let evidenceSelect, applyButton;
let techButtons = [];
let chosenTech = null;
let applied = false;
let applyT = 0;       // reveal animation frames
let result = null;    // {success, color, label, note}

const OK = '#2e9e57';
const BAD = '#c0392b';

const EVIDENCE = [
  { key: 'glass',     name: 'Drinking Glass',    porous: false, tex: 'glass' },
  { key: 'paper',     name: 'Sheet of Paper',    porous: true,  tex: 'paper' },
  { key: 'cardboard', name: 'Cardboard Box',     porous: true,  tex: 'cardboard' },
  { key: 'plastic',   name: 'Plastic Bag',       porous: false, tex: 'plastic' },
  { key: 'wood',      name: 'Wooden Door Frame', porous: true,  tex: 'wood' }
];

const TECHNIQUES = [
  { key: 'cya',   name: 'Cyanoacrylate', col: [110, 116, 122],
    works: 'nonporous', label: 'white cyanoacrylate-fumed ridges',
    failWhy: 'Superglue fuming needs a smooth, non-porous surface for polymer to build on the ridge residue; on a porous surface the moisture soaks in.' },
  { key: 'nin',   name: 'Ninhydrin', col: [122, 30, 140],
    works: 'porous', label: 'purple (Ruhemann’s purple) ridges',
    failWhy: 'Ninhydrin reacts with amino acids absorbed INTO a porous surface; on non-porous glass there is nothing for it to soak into.' },
  { key: 'agno3', name: 'Silver Nitrate', col: [70, 55, 40],
    works: 'porous', label: 'dark gray ridges (silver chloride, under light)',
    failWhy: 'Silver nitrate reacts with chloride salts absorbed into porous material; a non-porous surface holds no absorbed salts to react with.' },
  { key: 'iod',   name: 'Iodine', col: [170, 128, 30],
    works: 'any', label: 'yellow-brown ridges (temporary)',
    note: 'Temporary — iodine fades fast. Photograph immediately!' }
];

function setup() {
  updateCanvasSize();
  const cnv = createCanvas(canvasWidth, canvasHeight);
  cnv.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  evidenceSelect = createSelect();
  for (const e of EVIDENCE) evidenceSelect.option(e.name);
  evidenceSelect.changed(resetResult);

  for (let i = 0; i < TECHNIQUES.length; i++) {
    const b = createButton(TECHNIQUES[i].name);
    b.mousePressed(() => { chosenTech = TECHNIQUES[i].key; resetResult(); styleTechButtons(); });
    b.style('width', '128px');
    techButtons.push(b);
  }
  applyButton = createButton('Apply Technique');
  applyButton.mousePressed(applyTechnique);

  positionControls();
  styleTechButtons();
}
function positionControls() {
  // technique buttons row inside the canvas (above the feedback area)
  const ty = 250;
  for (let i = 0; i < techButtons.length; i++)
    techButtons[i].position(margin + i * 134, ty);
  // control strip: evidence dropdown + apply
  const r = drawHeight + 12;
  evidenceSelect.position(margin + 130, r + 2);
  applyButton.position(margin + 330, r);
}
function styleTechButtons() {
  for (let i = 0; i < techButtons.length; i++) {
    const sel = TECHNIQUES[i].key === chosenTech;
    techButtons[i].style('background-color', sel ? '#0b3d91' : '#ffffff');
    techButtons[i].style('color', sel ? '#ffffff' : '#1a3a6c');
    techButtons[i].style('border', sel ? '2px solid #0b3d91' : '1px solid #b9c4d4');
    techButtons[i].style('border-radius', '6px');
  }
}
function updateCanvasSize() {
  const c = document.querySelector('main');
  if (c) canvasWidth = Math.max(800, Math.floor(c.getBoundingClientRect().width));
}
function windowResized() {
  updateCanvasSize(); resizeCanvas(canvasWidth, canvasHeight); positionControls();
}

function curEvidence() { return EVIDENCE[evidenceSelect.selectedIndex !== undefined ? evidenceSelect.selectedIndex : evidenceSelect.elt.selectedIndex]; }
function resetResult() { applied = false; applyT = 0; result = null; }

function applyTechnique() {
  if (!chosenTech) return;
  const ev = curEvidence();
  const t = TECHNIQUES.find(x => x.key === chosenTech);
  let success;
  if (t.works === 'any') success = true;
  else if (t.works === 'porous') success = ev.porous;
  else success = !ev.porous;
  result = { success, color: t.col, label: t.label, note: t.note, techName: t.name };
  applied = true; applyT = 42;
}

function draw() {
  background('#eef2f7');
  noStroke();
  fill('#f4f4f4'); rect(0, drawHeight, canvasWidth, controlHeight);
  fill('#33404f'); textAlign(LEFT, CENTER); textSize(12);
  text('Evidence item:', margin, drawHeight + 24);

  fill('#173a63'); textAlign(CENTER, TOP); textSize(20); textStyle(BOLD);
  text('Latent Print Development Technique Selector', canvasWidth / 2, 8); textStyle(NORMAL);

  if (applyT > 0) applyT--;
  const w = canvasWidth - 2 * margin;
  const halfW = (w - 12) / 2;
  drawBeforePanel(margin, 38, halfW, 196);
  drawAfterPanel(margin + halfW + 12, 38, halfW, 196);

  // technique chooser label (buttons are DOM, positioned at y=250)
  fill('#173a63'); textAlign(LEFT, TOP); textSize(12.5); textStyle(BOLD);
  text('Choose a development technique:', margin, 232); textStyle(NORMAL);

  drawFeedback(margin, 286, w, drawHeight - 286 - 10);
}

function drawBeforePanel(x, y, w, h) {
  const ev = curEvidence();
  noStroke(); fill('#ffffff'); stroke('#d6deea'); strokeWeight(1);
  rect(x, y, w, h, 8); noStroke();
  fill('#173a63'); textAlign(LEFT, TOP); textSize(12); textStyle(BOLD);
  text('Evidence (before)', x + 12, y + 8); textStyle(NORMAL);

  // porosity badge
  const pc = ev.porous ? OK : '#1769c9';
  const lbl = ev.porous ? 'POROUS' : 'NON-POROUS';
  textSize(10.5); textStyle(BOLD); const bw = textWidth(lbl) + 16;
  stroke(pc); strokeWeight(1.1); fill(ev.porous ? '#e6f4ec' : '#e7f0fb');
  rect(x + w - bw - 12, y + 7, bw, 17, 5); noStroke();
  fill(pc); textAlign(CENTER, CENTER); text(lbl, x + w - bw / 2 - 12, y + 16); textStyle(NORMAL);

  const sx = x + 16, sy = y + 32, sw = w - 32, sh = h - 48;
  drawSubstrate(ev.tex, sx, sy, sw, sh);
  // faint invisible latent print on the surface
  drawRidges(sx + sw / 2, sy + sh / 2, min(sw, sh) * 0.4, [90, 95, 100], 0.10);
  fill('#8a93a3'); textAlign(CENTER, BOTTOM); textSize(10);
  text(ev.name + ' — a latent print is present but invisible', x + w / 2, y + h - 6);
}

function drawAfterPanel(x, y, w, h) {
  noStroke(); fill('#ffffff'); stroke('#d6deea'); strokeWeight(1);
  rect(x, y, w, h, 8); noStroke();
  fill('#173a63'); textAlign(LEFT, TOP); textSize(12); textStyle(BOLD);
  text('Result (after)', x + 12, y + 8); textStyle(NORMAL);

  const sx = x + 16, sy = y + 32, sw = w - 32, sh = h - 48;
  const ev = curEvidence();
  drawSubstrate(ev.tex, sx, sy, sw, sh);

  if (!applied) {
    fill('#8a93a3'); textAlign(CENTER, CENTER); textSize(11.5);
    text('Choose a technique and press\n“Apply Technique”.', x + w / 2, y + h / 2);
    return;
  }
  const a = 1 - applyT / 42;  // 0->1 reveal
  if (result.success) {
    drawRidges(sx + sw / 2, sy + sh / 2, min(sw, sh) * 0.4, result.color, a);
    noStroke(); fill(OK); textAlign(CENTER, BOTTOM); textSize(11); textStyle(BOLD);
    text('Developed: ' + result.label, x + w / 2, y + h - 6); textStyle(NORMAL);
  } else {
    fill(BAD); textAlign(CENTER, CENTER); textSize(12); textStyle(BOLD);
    text('No visible ridge pattern', x + w / 2, y + h / 2 - 6);
    textStyle(NORMAL); textSize(10.5); fill('#8a5a52');
    text('Technique not effective on this substrate.', x + w / 2, y + h / 2 + 12);
  }
}

function drawSubstrate(tex, x, y, w, h) {
  push();
  drawingContext.save(); drawingContext.beginPath();
  drawingContext.rect(x, y, w, h); drawingContext.clip();
  if (tex === 'glass') {
    fill('#dfe7ec'); noStroke(); rect(x, y, w, h, 4);
    stroke(255, 255, 255, 180); strokeWeight(6);
    line(x + w * 0.2, y + 6, x + w * 0.42, y + h - 6);
  } else if (tex === 'paper') {
    fill('#f3e9d2'); noStroke(); rect(x, y, w, h, 4);
    stroke('#e2d4b4'); strokeWeight(1);
    for (let ly = y + 16; ly < y + h; ly += 18) line(x + 8, ly, x + w - 8, ly);
  } else if (tex === 'cardboard') {
    fill('#c9a06a'); noStroke(); rect(x, y, w, h, 4);
    stroke('#b08a52'); strokeWeight(1.4);
    for (let lx = x + 8; lx < x + w; lx += 10) line(lx, y + 4, lx, y + h - 4);
  } else if (tex === 'plastic') {
    fill('#d6e6ea'); noStroke(); rect(x, y, w, h, 4);
    noFill(); stroke(255, 255, 255, 120); strokeWeight(2);
    for (let i = 0; i < 3; i++) line(x + 6, y + 14 + i * 20, x + w - 6, y + 8 + i * 20);
  } else if (tex === 'wood') {
    fill('#c08a4e'); noStroke(); rect(x, y, w, h, 4);
    noFill(); stroke('#9c6a36'); strokeWeight(1.2);
    for (let ly = y + 10; ly < y + h; ly += 16) {
      beginShape();
      for (let lx = x; lx <= x + w; lx += 12) vertex(lx, ly + 4 * sin(lx * 0.05));
      endShape();
    }
  }
  drawingContext.restore();
  pop();
}

function drawRidges(cx, cy, rad, col, a) {
  if (a <= 0) return;
  push(); noFill(); stroke(col[0], col[1], col[2], a * 255); strokeWeight(1.7);
  for (let r = 7; r < rad; r += 5) {
    beginShape();
    for (let ang = PI * 0.12; ang <= PI * 1.88; ang += 0.16) {
      const rr = r * (1 + 0.14 * sin(ang * 2 + 0.6));
      vertex(cx + cos(ang) * rr, cy + sin(ang) * rr * 1.12);
    }
    endShape();
  }
  pop();
}

function drawFeedback(x, y, w, h) {
  noStroke(); fill('#ffffff'); stroke('#d6deea'); strokeWeight(1);
  rect(x, y, w, h, 8); noStroke();
  const ev = curEvidence();

  if (!applied) {
    fill('#173a63'); textAlign(LEFT, TOP); textSize(12); textStyle(BOLD);
    text('How to choose', x + 14, y + 10); textStyle(NORMAL);
    fill('#33404f'); textSize(11.5);
    text('Match the technique to the substrate. POROUS surfaces (paper, cardboard, raw wood) ' +
         'absorb sweat residue, so they call for chemical reagents — Ninhydrin or Silver Nitrate. ' +
         'NON-POROUS surfaces (glass, plastic) hold residue on top, so Cyanoacrylate fuming works. ' +
         'Iodine gives a quick, temporary result on almost anything.',
      x + 14, y + 32, w - 28);
    return;
  }
  const r = result;
  fill(r.success ? OK : BAD); textAlign(LEFT, TOP); textSize(13); textStyle(BOLD);
  text((r.success ? '✓ ' : '✗ ') + r.techName + ' on ' + ev.name +
       (r.success ? ' — print developed' : ' — no result'), x + 14, y + 10);
  textStyle(NORMAL); fill('#33404f'); textSize(11.5);
  if (r.success) {
    let msg = 'The ' + (ev.porous ? 'porous' : 'non-porous') + ' substrate suits this technique, so the ridges develop as ' + r.label + '.';
    if (r.note) msg += '  ' + r.note;
    text(msg, x + 14, y + 34, w - 28);
  } else {
    const t = TECHNIQUES.find(x => x.key === chosenTech);
    text(t.failWhy + '  Try a technique that matches a ' +
         (ev.porous ? 'POROUS' : 'NON-POROUS') + ' surface.',
      x + 14, y + 34, w - 28);
  }
}
