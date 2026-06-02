// Becke Line Test — Understand (L2)
// CANVAS_HEIGHT: 510
// Simulated microscope view of a glass fragment in oil. Adjust glass RI, oil
// RI, and stage height, then interpret which way the bright Becke line moves to
// decide whether the glass or the oil has the higher refractive index.

let canvasWidth = 820;
const drawHeight = 420;
const controlHeight = 90;
let canvasHeight = drawHeight + controlHeight;
const margin = 15;
const defaultTextSize = 16;

const OIL_BG = [58, 63, 68];       // microscope field (oil)
const GLASS_HI = [120, 128, 136];  // glass fragment at max contrast
const MATCH_TOL = 0.002;

let glassSlider, oilSlider, stageSlider, oilSelect;
// irregular fragment outline (radius multipliers)
const BLOB = [1.00, 0.92, 1.06, 0.97, 1.10, 0.90, 1.04, 0.95,
              1.08, 0.93, 1.02, 0.98, 1.07, 0.91, 1.03, 0.99];
const OILS = [
  ['— choose oil —', null],
  ['Oil n = 1.460', 1.460],
  ['Oil n = 1.490', 1.490],
  ['Oil n = 1.515', 1.515],
  ['Oil n = 1.530', 1.530],
  ['Oil n = 1.550', 1.550]
];

function updateCanvasSize() {
  const c = document.querySelector('main');
  if (c) canvasWidth = Math.max(700, Math.floor(c.getBoundingClientRect().width));
}

function setup() {
  updateCanvasSize();
  const cnv = createCanvas(canvasWidth, canvasHeight);
  cnv.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  glassSlider = createSlider(1.450, 1.550, 1.520, 0.001);
  oilSlider = createSlider(1.450, 1.550, 1.490, 0.001);
  stageSlider = createSlider(-1, 1, 0.5, 0.05);
  oilSelect = createSelect();
  OILS.forEach(o => oilSelect.option(o[0]));
  oilSelect.changed(() => {
    const found = OILS.find(o => o[0] === oilSelect.value());
    if (found && found[1] != null) oilSlider.value(found[1]);
  });
  positionControls();
}

function positionControls() {
  const r1 = drawHeight + 10, r2 = drawHeight + 50, half = canvasWidth / 2;
  oilSelect.position(margin + 70, r1);
  stageSlider.position(half + 95, r1 + 2); stageSlider.size(canvasWidth - half - 110);
  glassSlider.position(margin + 90, r2 + 2); glassSlider.size(half - margin - 110);
  oilSlider.position(half + 95, r2 + 2); oilSlider.size(canvasWidth - half - 110);
}

function windowResized() {
  updateCanvasSize(); resizeCanvas(canvasWidth, canvasHeight); positionControls();
}

function draw() {
  const glassRI = glassSlider.value(), oilRI = oilSlider.value(), stageH = stageSlider.value();
  const dn = glassRI - oilRI;
  const contrast = constrain(Math.abs(dn) / 0.05, 0, 1);
  const matched = Math.abs(dn) < MATCH_TOL;

  noStroke();
  fill('#eef3fb'); rect(0, 0, canvasWidth, drawHeight);
  fill('#f4f4f4'); rect(0, drawHeight, canvasWidth, controlHeight);

  fill('#1a3a6c'); textAlign(CENTER, TOP); textSize(20); textStyle(BOLD);
  text('Becke Line Test', canvasWidth / 2, 8); textStyle(NORMAL);

  const splitX = canvasWidth * 0.62;
  drawScope(margin, 40, splitX - margin, drawHeight - 50, glassRI, oilRI, stageH, contrast, matched);
  drawPanel(splitX + 10, 40, canvasWidth - margin - (splitX + 10), drawHeight - 50, glassRI, oilRI, stageH, dn, matched);
  drawControlLabels(glassRI, oilRI, stageH);
}

// draw the irregular fragment path at a given radial scale
function blobPath(cx, cy, baseR, scale) {
  beginShape();
  for (let i = 0; i < BLOB.length; i++) {
    const ang = (i / BLOB.length) * TWO_PI;
    const r = baseR * BLOB[i] * scale;
    curveVertex(cx + Math.cos(ang) * r, cy + Math.sin(ang) * r);
  }
  // close smoothly
  for (let i = 0; i < 3; i++) {
    const ang = (i / BLOB.length) * TWO_PI;
    const r = baseR * BLOB[i] * scale;
    curveVertex(cx + Math.cos(ang) * r, cy + Math.sin(ang) * r);
  }
  endShape();
}

function drawScope(x, y, w, h, glassRI, oilRI, stageH, contrast, matched) {
  const cx = x + w / 2, cy = y + h / 2, R = Math.min(w, h) / 2 - 6;
  // field of view (oil)
  noStroke(); fill(OIL_BG[0], OIL_BG[1], OIL_BG[2]); circle(cx, cy, R * 2);

  // glass fragment — fades toward oil color as contrast → 0
  const gf = lerpColor(color(OIL_BG[0], OIL_BG[1], OIL_BG[2]),
                       color(GLASS_HI[0], GLASS_HI[1], GLASS_HI[2]), contrast);
  const baseR = R * 0.5;
  noStroke(); fill(gf); blobPath(cx, cy, baseR, 1);

  // Becke line: bright halo offset toward higher- or lower-RI medium
  if (!matched && Math.abs(stageH) > 0.02) {
    const higherIsGlass = glassRI > oilRI;
    // raising stage (stageH>0) → toward higher RI; lowering → toward lower RI
    const towardHigher = stageH > 0;
    const intoGlass = (towardHigher && higherIsGlass) || (!towardHigher && !higherIsGlass);
    const off = Math.abs(stageH) * 0.16;               // fractional radial offset
    const scale = intoGlass ? (1 - off) : (1 + off);
    const alpha = 80 + contrast * 150;
    noFill();
    for (let k = 3; k >= 0; k--) {
      stroke(255, 255, 255, alpha / (k + 1));
      strokeWeight(2 + k * 2.5);
      blobPath(cx, cy, baseR, scale);
    }
  } else if (!matched) {
    // at focus: faint outline sits on the boundary
    noFill(); stroke(255, 255, 255, 50 + contrast * 90); strokeWeight(2);
    blobPath(cx, cy, baseR, 1);
  }

  // vignette ring
  noFill();
  for (let i = 0; i < 14; i++) {
    stroke(10, 12, 14, 14); strokeWeight(2);
    circle(cx, cy, (R - i) * 2);
  }
  // scope rim
  stroke('#202428'); strokeWeight(6); noFill(); circle(cx, cy, R * 2);
  noStroke(); fill('#5a6472'); textAlign(CENTER, TOP); textSize(11);
  text('microscope field of view', cx, y + h + 2);

  if (matched) {
    fill(255, 255, 255, 230); textAlign(CENTER, CENTER); textSize(13); textStyle(BOLD);
    text('RI match — fragment\nnearly invisible', cx, cy); textStyle(NORMAL);
  }
}

function drawPanel(x, y, w, h, glassRI, oilRI, stageH, dn, matched) {
  fill('#fff'); stroke('#ccc'); strokeWeight(1); rect(x, y, w, h, 8); noStroke();
  let yy = y + 14;
  fill('#1a3a6c'); textAlign(LEFT, TOP); textStyle(BOLD); textSize(14);
  text('Refractive index', x + 14, yy); textStyle(NORMAL); yy += 26;
  fill('#333'); textSize(13);
  text('Glass  n = ' + glassRI.toFixed(3), x + 14, yy); yy += 20;
  text('Oil      n = ' + oilRI.toFixed(3), x + 14, yy); yy += 20;
  fill('#555'); textSize(12.5);
  text('Δn = ' + (dn >= 0 ? '+' : '') + dn.toFixed(3), x + 14, yy); yy += 26;

  // stage-height direction explanation
  fill('#1a3a6c'); textStyle(BOLD); textSize(13); text('Becke line', x + 14, yy);
  textStyle(NORMAL); yy += 20; fill('#333'); textSize(12);
  let dir;
  if (matched) dir = 'No line — boundary disappears.';
  else if (stageH > 0.02) dir = 'Stage raised → line moves into the\nhigher-RI medium (' + (glassRI > oilRI ? 'glass' : 'oil') + ').';
  else if (stageH < -0.02) dir = 'Stage lowered → line moves into the\nlower-RI medium (' + (glassRI < oilRI ? 'glass' : 'oil') + ').';
  else dir = 'At focus → line sits on the boundary.';
  text(dir, x + 14, yy, w - 24); yy += 46;

  // conclusion box
  const boxY = y + h - 70;
  let label, col;
  if (matched) { label = 'Match: Glass RI ≈ Oil RI'; col = '#b06a00'; }
  else if (dn > 0) { label = 'Glass RI > Oil RI'; col = '#c0392b'; }
  else { label = 'Glass RI < Oil RI'; col = '#0a7d33'; }
  noStroke(); fill('#f3f6fb'); stroke('#d4ddea'); strokeWeight(1);
  rect(x + 12, boxY, w - 24, 54, 6); noStroke();
  fill('#5a6472'); textSize(11); textAlign(LEFT, TOP); text('Conclusion', x + 22, boxY + 8);
  fill(col); textStyle(BOLD); textSize(15); text(label, x + 22, boxY + 26); textStyle(NORMAL);
}

function drawControlLabels(glassRI, oilRI, stageH) {
  fill('#222'); textAlign(LEFT, CENTER); textSize(12.5);
  const r1 = drawHeight + 22, r2 = drawHeight + 62, half = canvasWidth / 2;
  text('Oil preset', margin, r1);
  let sLabel = stageH > 0.02 ? 'above focus' : stageH < -0.02 ? 'below focus' : 'in focus';
  text('Stage: ' + sLabel, half, r1);
  text('Glass n ' + glassRI.toFixed(3), margin, r2);
  text('Oil n ' + oilRI.toFixed(3), half, r2);
}
