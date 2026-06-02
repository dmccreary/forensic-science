// Angle-of-Impact Calculator — Apply (L3)
// CANVAS_HEIGHT: 480
// Measure a bloodstain's width and length, compute sin θ = W / L, then press
// Calculate to reveal the angle of impact and its trajectory diagram.

let canvasWidth = 800;
const drawHeight = 400;
const controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
const margin = 15;
const defaultTextSize = 16;
const SCALE = 3.4; // px per mm (shared so the ellipse keeps real proportions)

let widthSlider, lengthSlider, calcButton, newButton;
let widthMM = 12, lengthMM = 30;
let calculated = false;
let dragging = null; // 'w' or 'l'
let stainCx, stainCy; // current ellipse center (px)

function updateCanvasSize() {
  const c = document.querySelector('main');
  if (c) canvasWidth = Math.max(560, Math.floor(c.getBoundingClientRect().width));
}

function setup() {
  updateCanvasSize();
  const cnv = createCanvas(canvasWidth, canvasHeight);
  cnv.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  widthSlider = createSlider(5, 30, 12, 1);
  widthSlider.input(() => { calculated = false; });
  lengthSlider = createSlider(5, 60, 30, 1);
  lengthSlider.input(() => { calculated = false; });

  calcButton = createButton('Calculate');
  calcButton.mousePressed(() => { calculated = true; });
  newButton = createButton('New Stain');
  newButton.mousePressed(newStain);

  positionControls();
}

function newStain() {
  const L = Math.round(random(18, 55));
  const W = Math.round(random(5, Math.min(30, L)));
  lengthSlider.value(L); widthSlider.value(W);
  calculated = false;
}

function positionControls() {
  widthSlider.position(margin + 110, drawHeight + 12); widthSlider.size(150);
  lengthSlider.position(margin + 110, drawHeight + 44); lengthSlider.size(150);
  calcButton.position(margin + 300, drawHeight + 10);
  newButton.position(margin + 300, drawHeight + 44);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  positionControls();
}

function readValues() {
  widthMM = widthSlider.value();
  lengthMM = lengthSlider.value();
  if (widthMM > lengthMM) { widthMM = lengthMM; widthSlider.value(widthMM); }
}

function draw() {
  readValues();
  noStroke();
  fill('#eef3fb'); rect(0, 0, canvasWidth, drawHeight);
  fill('#f4f4f4'); rect(0, drawHeight, canvasWidth, controlHeight);

  fill('#1a3a6c'); textAlign(CENTER, TOP); textSize(20); textStyle(BOLD);
  text('Angle-of-Impact Calculator', canvasWidth / 2, 8);
  textStyle(NORMAL);

  const splitX = canvasWidth * 0.58;
  drawStainPanel(margin, 40, splitX - margin - 6, drawHeight - 50);
  drawRightPanel(splitX + 6, 40, canvasWidth - margin - (splitX + 6), drawHeight - 50);
  drawControlLabels();
}

// ---------- left: the bloodstain ----------
function drawStainPanel(x, y, w, h) {
  fill('#fcf6ec'); stroke('#d8c9a8'); strokeWeight(1); rect(x, y, w, h, 8);
  noStroke(); fill('#7a6a4a'); textAlign(LEFT, TOP); textSize(12);
  text('Drag the blue handles (or use the sliders) to size the stain', x + 10, y + 8);

  const cx = x + w * 0.46, cy = y + h * 0.55;
  stainCx = cx; stainCy = cy;
  const ew = widthMM * SCALE, el = lengthMM * SCALE;

  // bloodstain ellipse (length is vertical)
  noStroke(); fill('#7b1010'); ellipse(cx, cy, ew, el);
  fill(123, 16, 16, 60); ellipse(cx, cy, ew * 1.18, el * 1.12); // soft halo

  // width arrow (horizontal)
  const wy = cy - el / 2 - 16;
  drawDimArrow(cx - ew / 2, wy, cx + ew / 2, wy, true);
  fill('#1f6fb2'); textAlign(CENTER, BOTTOM); textSize(12);
  text('Width = ' + widthMM + ' mm', cx, wy - 4);

  // length arrow (vertical)
  const lx = cx + ew / 2 + 18;
  drawDimArrow(lx, cy - el / 2, lx, cy + el / 2, false);
  push(); translate(lx + 14, cy); rotate(HALF_PI);
  fill('#1f6fb2'); textAlign(CENTER, BOTTOM); textSize(12);
  text('Length = ' + lengthMM + ' mm', 0, 0); pop();

  // drag handles
  drawHandle(cx + ew / 2, cy);       // width handle (right vertex)
  drawHandle(cx, cy + el / 2);       // length handle (bottom vertex)
}

function drawDimArrow(x1, y1, x2, y2, horiz) {
  stroke('#1f6fb2'); strokeWeight(2); line(x1, y1, x2, y2);
  noStroke(); fill('#1f6fb2');
  if (horiz) {
    triangle(x1, y1, x1 + 6, y1 - 4, x1 + 6, y1 + 4);
    triangle(x2, y2, x2 - 6, y2 - 4, x2 - 6, y2 + 4);
  } else {
    triangle(x1, y1, x1 - 4, y1 + 6, x1 + 4, y1 + 6);
    triangle(x2, y2, x2 - 4, y2 - 6, x2 + 4, y2 - 6);
  }
}

function drawHandle(px, py) {
  stroke('#0b3d66'); strokeWeight(2); fill('#cfe6f7'); circle(px, py, 14);
  noStroke();
}

// ---------- right: formula, angle, geometry ----------
function drawRightPanel(x, y, w, h) {
  fill('#fff'); stroke('#ccc'); strokeWeight(1); rect(x, y, w, h, 8);
  noStroke();
  const ratio = widthMM / lengthMM;
  const angle = degrees(Math.asin(constrain(ratio, 0, 1)));

  fill('#1a3a6c'); textAlign(LEFT, TOP); textSize(14); textStyle(BOLD);
  text('Angle of impact', x + 14, y + 12); textStyle(NORMAL);

  // formula with live values
  fill('#222'); textSize(15);
  text('sin θ  =  Width / Length', x + 14, y + 40);
  fill('#1f6fb2'); textSize(15);
  text('sin θ  =  ' + widthMM + ' / ' + lengthMM + '  =  ' + ratio.toFixed(3), x + 14, y + 64);

  // answer (hidden until Calculate)
  fill('#0a7d33'); textSize(22); textStyle(BOLD);
  if (calculated) {
    text('θ  =  ' + angle.toFixed(1) + '°', x + 14, y + 92);
  } else {
    fill('#b06a00'); textSize(15); textStyle(BOLD);
    text('θ  =  ?   (press Calculate)', x + 14, y + 96);
  }
  textStyle(NORMAL);

  // geometry diagram
  drawGeometry(x + 14, y + 140, w - 28, h - 152, angle);
}

function drawGeometry(x, y, w, h, angle) {
  noStroke(); fill('#f3f7fc'); stroke('#dde6f0'); rect(x, y, w, h, 6);
  noStroke(); fill('#1a3a6c'); textAlign(LEFT, TOP); textSize(12); textStyle(BOLD);
  text('Trajectory relative to surface', x + 8, y + 6); textStyle(NORMAL);

  const ox = x + 24, oy = y + h - 26;          // origin (impact point)
  const len = Math.min(w - 48, h - 60);
  // surface line
  stroke('#8a6d3b'); strokeWeight(3); line(x + 8, oy, x + w - 8, oy);
  noStroke(); fill('#8a6d3b'); textSize(11);
  textAlign(RIGHT, TOP); text('surface', x + w - 8, oy + 4);

  if (!calculated) {
    fill('#999'); textAlign(CENTER, CENTER); textSize(12);
    text('Calculate to draw the trajectory', x + w / 2, y + h / 2);
    return;
  }
  // trajectory line going up-right at angle above surface
  const a = radians(angle);
  const ex = ox + len * cos(a), ey = oy - len * sin(a);
  stroke('#c0392b'); strokeWeight(2.5); line(ox, oy, ex, ey);
  noStroke(); fill('#c0392b'); push(); translate(ex, ey); rotate(-a);
  triangle(0, 0, -9, -4, -9, 4); pop();
  // protractor arc
  noFill(); stroke('#1f6fb2'); strokeWeight(1.5);
  arc(ox, oy, 70, 70, -a, 0);
  noStroke(); fill('#1f6fb2'); textAlign(LEFT, BOTTOM); textSize(13); textStyle(BOLD);
  text(angle.toFixed(1) + '°', ox + 40, oy - 8); textStyle(NORMAL);
  fill('#c0392b'); textSize(11); textAlign(LEFT, BOTTOM);
  text('blood drop path', ex + 4, ey);
}

function drawControlLabels() {
  fill('#222'); textAlign(LEFT, CENTER); textSize(13);
  text('Width: ' + widthMM + ' mm', margin, drawHeight + 22);
  text('Length: ' + lengthMM + ' mm', margin, drawHeight + 54);
}

// ---------- dragging ----------
function mousePressed() {
  if (mouseY > drawHeight) return;
  const ew = widthMM * SCALE, el = lengthMM * SCALE;
  if (dist(mouseX, mouseY, stainCx + ew / 2, stainCy) < 12) dragging = 'w';
  else if (dist(mouseX, mouseY, stainCx, stainCy + el / 2) < 12) dragging = 'l';
}
function mouseDragged() {
  if (!dragging) return;
  if (dragging === 'w') {
    const v = constrain(Math.round((mouseX - stainCx) * 2 / SCALE), 5, 30);
    widthSlider.value(v);
  } else {
    const v = constrain(Math.round((mouseY - stainCy) * 2 / SCALE), 5, 60);
    lengthSlider.value(v);
  }
  calculated = false;
}
function mouseReleased() { dragging = null; }
