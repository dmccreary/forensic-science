// BAC Retro-Extrapolation — Apply (L3)
// CANVAS_HEIGHT: 515
// Calculate peak BAC with the Widmark formula, then retro-extrapolate the BAC
// backward from the blood-draw time to an earlier event time (e.g. driving).

let canvasWidth = 820;
const drawHeight = 400;
const controlHeight = 115;
let canvasHeight = drawHeight + controlHeight;
const margin = 15;
const defaultTextSize = 16;

const DRINK_G = 14;     // grams ethanol per standard drink
const LEGAL = 0.08;     // g/dL
const tMin = -1, tMax = 8;

let sexSelect, absorptionCheck, calcButton;
let weightSlider, drinksSlider, drawSlider, elimSlider;
let tEvent = 1.0, revealCalc = false, draggingEvent = false;
let graph = { x: 0, y: 0, w: 0, h: 0 };

function updateCanvasSize() {
  const c = document.querySelector('main');
  if (c) canvasWidth = Math.max(700, Math.floor(c.getBoundingClientRect().width));
}

function setup() {
  updateCanvasSize();
  const cnv = createCanvas(canvasWidth, canvasHeight);
  cnv.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  sexSelect = createSelect();
  sexSelect.option('Male (r = 0.68)');
  sexSelect.option('Female (r = 0.55)');
  absorptionCheck = createCheckbox(' Show absorption phase', false);
  calcButton = createButton('Calculate');
  calcButton.mousePressed(() => { revealCalc = true; });

  weightSlider = createSlider(40, 150, 80, 1);
  drinksSlider = createSlider(1, 10, 4, 1);
  drawSlider = createSlider(0, 8, 3, 0.5);
  elimSlider = createSlider(0.010, 0.025, 0.015, 0.001);
  positionControls();
}

function positionControls() {
  const r1 = drawHeight + 8, r2 = drawHeight + 44, r3 = drawHeight + 80;
  sexSelect.position(margin, r1);
  absorptionCheck.position(margin + 160, r1 + 3);
  calcButton.position(margin + 375, r1);
  const half = canvasWidth / 2;
  weightSlider.position(margin + 110, r2); weightSlider.size(half - margin - 130);
  drinksSlider.position(half + 95, r2); drinksSlider.size(canvasWidth - half - 110);
  drawSlider.position(margin + 110, r3); drawSlider.size(half - margin - 130);
  elimSlider.position(half + 95, r3); elimSlider.size(canvasWidth - half - 110);
}

function windowResized() {
  updateCanvasSize(); resizeCanvas(canvasWidth, canvasHeight); positionControls();
}

function rValue() { return sexSelect.value().indexOf('Female') >= 0 ? 0.55 : 0.68; }

function bacModel() {
  const drinks = drinksSlider.value(), W = weightSlider.value(), r = rValue();
  const A = drinks * DRINK_G;
  const peak = A / (W * 1000 * r) * 100; // g/dL
  return { drinks, W, r, A, peak, beta: elimSlider.value(), tDraw: drawSlider.value() };
}

function bacAt(t, m) {
  if (t >= 0) return Math.max(0, m.peak - m.beta * t);
  if (absorptionCheck.checked() && t >= -0.8) return Math.max(0, m.peak * (t + 0.8) / 0.8);
  return 0;
}

function draw() {
  const m = bacModel();
  noStroke();
  fill('#eef3fb'); rect(0, 0, canvasWidth, drawHeight);
  fill('#f4f4f4'); rect(0, drawHeight, canvasWidth, controlHeight);

  fill('#1a3a6c'); textAlign(CENTER, TOP); textSize(20); textStyle(BOLD);
  text('BAC Retro-Extrapolation (Widmark)', canvasWidth / 2, 8); textStyle(NORMAL);

  const splitX = canvasWidth * 0.45;
  drawCalcPanel(margin, 40, splitX - margin - 6, drawHeight - 50, m);
  drawGraph(splitX + 6, 40, canvasWidth - margin - (splitX + 6), drawHeight - 50, m);
  drawControlLabels(m);
}

function drawCalcPanel(x, y, w, h, m) {
  fill('#fff'); stroke('#ccc'); strokeWeight(1); rect(x, y, w, h, 8); noStroke();
  const bacDraw = bacAt(m.tDraw, m);
  const bacEvent = bacDraw + m.beta * (m.tDraw - tEvent);
  let yy = y + 12;
  fill('#1a3a6c'); textAlign(LEFT, TOP); textSize(13); textStyle(BOLD);
  text('Widmark calculation', x + 12, yy); textStyle(NORMAL); yy += 24;
  fill('#333'); textSize(12.5);
  const line = (s) => { text(s, x + 12, yy); yy += 18; };
  line('Alcohol  A = ' + m.drinks + ' drinks × 14 g = ' + m.A + ' g');
  line('r = ' + m.r + '   Weight = ' + m.W + ' kg');
  line('Peak BAC = A / (W×1000 × r) × 100');
  fill('#1f6fb2'); line('         = ' + m.A + ' / (' + (m.W * 1000) + ' × ' + m.r + ') × 100');
  fill('#1f6fb2'); textStyle(BOLD); line('         = ' + m.peak.toFixed(3) + ' %'); textStyle(NORMAL);
  yy += 6; fill('#1a3a6c'); textStyle(BOLD); text('Retro-extrapolation', x + 12, yy); textStyle(NORMAL); yy += 22;
  fill('#333');
  line('BAC at draw (t = ' + m.tDraw.toFixed(1) + ' h) = ' + bacDraw.toFixed(3) + ' %');
  line('BAC_event = BAC_draw + β × (t_draw − t_event)');
  if (revealCalc) {
    fill('#b35900');
    line('   = ' + bacDraw.toFixed(3) + ' + ' + m.beta.toFixed(3) + ' × (' +
      m.tDraw.toFixed(1) + ' − ' + tEvent.toFixed(1) + ')');
    fill(bacEvent >= LEGAL ? '#c0392b' : '#0a7d33'); textStyle(BOLD); textSize(15);
    text('BAC at event = ' + bacEvent.toFixed(3) + ' %', x + 12, yy);
    textSize(11); textStyle(NORMAL); fill(bacEvent >= LEGAL ? '#c0392b' : '#0a7d33');
    text(bacEvent >= LEGAL ? '(over the 0.08% legal limit)' : '(under the 0.08% legal limit)', x + 12, yy + 18);
  } else {
    fill('#b06a00'); textStyle(BOLD);
    text('Press Calculate to retro-extrapolate', x + 12, yy); textStyle(NORMAL);
  }
}

function drawGraph(x, y, w, h, m) {
  fill('#fff'); stroke('#ccc'); strokeWeight(1); rect(x, y, w, h, 8); noStroke();
  const px = x + 40, py = y + 28, pw = w - 56, ph = h - 64;
  graph = { x: px, y: py, w: pw, h: ph };
  const ymax = Math.max(0.16, m.peak * 1.15);
  const tToX = (t) => px + (t - tMin) / (tMax - tMin) * pw;
  const bToY = (b) => py + ph - (b / ymax) * ph;

  fill('#1a3a6c'); textAlign(LEFT, TOP); textSize(12); textStyle(BOLD);
  text('BAC over time', px - 24, y + 6); textStyle(NORMAL);

  // red over-limit shading
  const limY = bToY(LEGAL);
  for (let i = 0; i <= 120; i++) {
    const t = tMin + (i / 120) * (tMax - tMin);
    const b = bacAt(t, m);
    if (b > LEGAL) { stroke(192, 57, 43, 70); strokeWeight((pw / 120) + 1); line(tToX(t), limY, tToX(t), bToY(b)); }
  }
  // axes
  stroke('#999'); strokeWeight(1); line(px, py, px, py + ph); line(px, py + ph, px + pw, py + ph);
  noStroke(); fill('#666'); textSize(10);
  textAlign(RIGHT, CENTER); text('BAC %', px - 4, py + 4);
  textAlign(CENTER, TOP);
  for (let t = 0; t <= 8; t += 2) text(t + 'h', tToX(t), py + ph + 4);
  // legal limit line
  stroke('#c0392b'); strokeWeight(1.3); drawingContext.setLineDash([5, 4]);
  line(px, limY, px + pw, limY); drawingContext.setLineDash([]);
  noStroke(); fill('#c0392b'); textAlign(LEFT, BOTTOM); textSize(10);
  text('legal limit 0.08%', px + 4, limY - 2);

  // BAC curve (blue)
  stroke('#1f6fb2'); strokeWeight(2.5); noFill(); beginShape();
  for (let i = 0; i <= 120; i++) {
    const t = tMin + (i / 120) * (tMax - tMin);
    vertex(tToX(t), bToY(bacAt(t, m)));
  }
  endShape();

  // event-time marker (gray, draggable)
  const ex = tToX(tEvent);
  stroke('#666'); strokeWeight(2); line(ex, py, ex, py + ph);
  noStroke(); fill('#666'); triangle(ex, py - 2, ex - 5, py - 11, ex + 5, py - 11);
  fill('#444'); textAlign(CENTER, BOTTOM); textSize(10);
  text('event ' + tEvent.toFixed(1) + 'h', ex, py + ph + 26);
  const beRetro = bacAt(m.tDraw, m) + m.beta * (m.tDraw - tEvent);
  noStroke(); fill('#666'); circle(ex, bToY(beRetro), 8);

  // draw-time point (yellow)
  const dx = tToX(m.tDraw), dy = bToY(bacAt(m.tDraw, m));
  stroke('#b8860b'); strokeWeight(1.5); fill('#ffd23f'); circle(dx, dy, 11);
  noStroke(); fill('#7a5c00'); textAlign(CENTER, TOP); textSize(10);
  text('draw', dx, dy + 8);

  fill('#555'); textAlign(RIGHT, TOP); textSize(10);
  text('drag the gray marker to set event time', px + pw, y + 6);
}

function drawControlLabels(m) {
  fill('#222'); textAlign(LEFT, CENTER); textSize(12.5);
  const r2 = drawHeight + 52, r3 = drawHeight + 88, half = canvasWidth / 2;
  text('Weight ' + m.W + 'kg', margin, r2);
  text('Drinks ' + m.drinks, half, r2);
  text('Draw ' + m.tDraw.toFixed(1) + 'h', margin, r3);
  text('β ' + m.beta.toFixed(3), half, r3);
}

function mousePressed() {
  if (mouseY > drawHeight) return;
  const ex = graph.x + (tEvent - tMin) / (tMax - tMin) * graph.w;
  if (mouseX > graph.x && mouseX < graph.x + graph.w && abs(mouseX - ex) < 14 &&
      mouseY > graph.y - 12 && mouseY < graph.y + graph.h) draggingEvent = true;
}
function mouseDragged() {
  if (!draggingEvent) return;
  const t = tMin + (mouseX - graph.x) / graph.w * (tMax - tMin);
  tEvent = constrain(Math.round(t * 2) / 2, 0, tMax);
}
function mouseReleased() { draggingEvent = false; }
