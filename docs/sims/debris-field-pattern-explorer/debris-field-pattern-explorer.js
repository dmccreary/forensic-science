// Debris Field Pattern Explorer - p5.js
// CANVAS_HEIGHT: 600
// Bloom Level: Apply (L3) - interpret a debris field to distinguish an in-flight
// breakup from an intact ground impact. The learner manipulates breakup altitude,
// wind, and aircraft speed and reads how each changes the scatter and the verdict.
// MicroSim template version 2026.03

// ---- layout globals (standard MicroSim structure) ----
let containerWidth;
let canvasWidth = 400;
let drawHeight = 460;        // map (top ~70%) + readout panel (bottom ~30%)
let mapBottom = 320;         // y boundary between map and readout panel
let controlHeight = 140;     // four rows of controls
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 20;
let defaultTextSize = 16;

// ---- controls ----
let altSlider, windSlider, speedSlider, dirSelect, sortCheckbox, resetButton;

// ---- defaults ----
const DEF_ALT = 0;          // m
const DEF_WIND = 20;        // km/h
const DEF_SPEED = 850;      // km/h (cruise)

// ---- density classes ----
// heavy = engines / landing gear; medium = wing & fuselage sections;
// light = interior panels, insulation, paper.
const CLASS = {
  heavy:  { color: '#1a3a6c', r: 9,  label: 'heavy (engines, gear)',      frac: 0.85 },
  medium: { color: '#2a9d8f', r: 6,  label: 'medium (wing, fuselage)',    frac: 0.55 },
  light:  { color: '#c8ccd0', r: 4,  label: 'light (panels, paper)',      frac: 0.25 }
};

const TRACK_COLOR = '#e8870c';   // orange
const IMPACT_COLOR = '#d62828';  // red

let pieces = [];   // fixed list; positions recomputed each frame from params

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  // Row 1: breakup altitude
  altSlider = createSlider(0, 12000, DEF_ALT, 100);
  altSlider.position(170, drawHeight + 8);
  altSlider.style('width', '180px');

  // Row 2: wind speed + direction
  windSlider = createSlider(0, 100, DEF_WIND, 5);
  windSlider.position(170, drawHeight + 42);
  windSlider.style('width', '120px');

  dirSelect = createSelect();
  dirSelect.option('Tailwind');
  dirSelect.option('Headwind');
  dirSelect.option('Crosswind');
  dirSelect.selected('Tailwind');
  dirSelect.position(305, drawHeight + 42);

  // Row 3: aircraft speed at breakup
  speedSlider = createSlider(200, 950, DEF_SPEED, 10);
  speedSlider.position(170, drawHeight + 76);
  speedSlider.style('width', '180px');

  // Row 4: density-sorting checkbox + reset
  sortCheckbox = createCheckbox(' Show density sorting', true);
  sortCheckbox.position(margin, drawHeight + 108);

  resetButton = createButton('Reset');
  resetButton.position(260, drawHeight + 106);
  resetButton.mousePressed(resetDefaults);

  buildPieces();
  describe('Debris Field Pattern Explorer: a top-down map of an aircraft flight track with scattered wreckage. Adjust breakup altitude, wind, and aircraft speed to see how the debris field stretches and sorts by weight, and read a plain-language verdict on whether the pattern matches an intact impact or an in-flight breakup.', LABEL);
}

// Build a stable set of wreckage pieces with per-piece jitter saved once.
function buildPieces() {
  pieces = [];
  randomSeed(7);
  const mix = [];
  for (let i = 0; i < 12; i++) mix.push('heavy');
  for (let i = 0; i < 24; i++) mix.push('medium');
  for (let i = 0; i < 24; i++) mix.push('light');
  mix.forEach(function (cls) {
    pieces.push({
      cls: cls,
      fracJitter: random(-0.12, 0.12),   // spread around the class downrange fraction
      lat: random(-1, 1),                // base lateral position (-1..1)
      latJitter: random(-0.3, 0.3)
    });
  });
}

function draw() {
  updateCanvasSize();

  const alt = altSlider.value();
  const wind = windSlider.value();
  const speed = speedSlider.value();
  const dir = dirSelect.value();
  const sortOn = sortCheckbox.checked();

  const fieldKm = computeFieldLength(alt, speed, wind, dir);
  const verdict = computeVerdict(alt, fieldKm);

  // backgrounds
  noStroke();
  fill('#eef3f8'); rect(0, 0, canvasWidth, mapBottom);                 // map
  fill('#ffffff'); rect(0, mapBottom, canvasWidth, drawHeight - mapBottom); // readout
  fill('#ffffff'); rect(0, drawHeight, canvasWidth, controlHeight);    // controls
  stroke('silver'); strokeWeight(1); noFill();
  rect(0.5, 0.5, canvasWidth - 1, drawHeight - 1);

  drawMapTitle();
  drawMap(alt, wind, speed, dir, sortOn, fieldKm);
  drawReadout(alt, fieldKm, verdict, sortOn);
  drawControlLabels(alt, wind, speed);
}

function drawMapTitle() {
  noStroke();
  fill('#0d1b2a');
  textAlign(CENTER, TOP);
  textSize(20);
  text('Debris Field Pattern Explorer', canvasWidth / 2, 8);
  textSize(12);
  fill('#495057');
  text('Top-down view — direction of flight is left → right', canvasWidth / 2, 31);
}

// ---- physics-lite model ----
// Fall time from breakup altitude; heavy pieces carry forward at near aircraft
// speed, light pieces decelerate in the air and fall short. Wind skews the light
// debris. Returns total field length in km.
function computeFieldLength(alt, speed, wind, dir) {
  if (alt < 50) return 0.12;                       // intact impact: tight cluster
  const t = Math.sqrt(2 * alt / 9.81);             // s, free-fall time
  const vHeavy = (speed / 3.6);                    // m/s forward carry (heavy)
  const heavyCarry = vHeavy * t * 0.9 / 1000;      // km, heavy pieces downrange
  const lightCarry = vHeavy * t * 0.35 / 1000;     // km, light pieces fall short
  let len = heavyCarry - lightCarry;
  // wind stretches or compresses the light end
  const windKm = (wind / 3.6) * t / 1000;
  if (dir === 'Tailwind') len += windKm * 0.6;
  else if (dir === 'Headwind') len += windKm * 0.6; // headwind shortens light end -> still lengthens spread
  return Math.max(0.12, heavyCarry * 0.15 + len);
}

function computeVerdict(alt, fieldKm) {
  if (alt < 50) {
    return { tag: 'intact ground impact',
             note: 'Wreckage is concentrated at a single point — consistent with the aircraft striking the ground intact.' };
  }
  if (alt < 4000) {
    return { tag: 'low-altitude breakup',
             note: 'A short, modestly sorted field suggests the structure failed at low altitude.' };
  }
  return { tag: 'high-altitude breakup',
           note: 'A long field, strongly sorted by weight, points to a break-up high in the air (in-flight failure or explosion).' };
}

// ---- map drawing ----
function drawMap(alt, wind, speed, dir, sortOn, fieldKm) {
  const trackY = 150;
  const x0 = margin + 30;                      // impact / breakup origin (left)
  const x1 = canvasWidth - margin - 10;
  const trackPx = x1 - x0;

  // view spans a bit more than the field so the scale stays readable
  const viewKm = Math.max(2, fieldKm * 1.15);
  const pxPerKm = trackPx / viewKm;

  // flight track (dashed)
  stroke(TRACK_COLOR);
  strokeWeight(2);
  drawingContext.setLineDash([8, 6]);
  line(x0, trackY, x1, trackY);
  drawingContext.setLineDash([]);

  // direction-of-flight arrowhead at the right end
  noStroke();
  fill(TRACK_COLOR);
  triangle(x1, trackY, x1 - 12, trackY - 6, x1 - 12, trackY + 6);

  // wind arrow (upper-left of map)
  drawWindArrow(margin + 8, 70, wind, dir);

  // wreckage pieces
  for (let i = 0; i < pieces.length; i++) {
    const p = pieces[i];
    const c = CLASS[p.cls];

    let frac;
    if (alt < 50) {
      // intact impact: collapse into a tight cluster near the origin
      frac = 0.04 + p.fracJitter * 0.15;
    } else if (sortOn) {
      // sorted by density: heavy carry forward, light fall short
      frac = constrain(c.frac + p.fracJitter, 0.02, 1.0);
    } else {
      // unsorted: pieces spread roughly uniformly (no density signal)
      frac = constrain(0.5 + p.fracJitter * 3.5, 0.02, 1.0);
    }

    const px = x0 + frac * fieldKm * pxPerKm;

    // lateral scatter; crosswind widens the light debris band
    let lat = p.lat * 22 + p.latJitter * 14;
    if (dir === 'Crosswind' && p.cls === 'light') lat += (wind / 100) * 40;
    else if (dir === 'Crosswind' && p.cls === 'medium') lat += (wind / 100) * 18;
    const py = trackY + lat;

    noStroke();
    fill(c.color);
    ellipse(px, py, c.r, c.r);
  }

  // impact / origin marker
  noStroke();
  fill(IMPACT_COLOR);
  ellipse(x0, trackY, 14, 14);
  fill(IMPACT_COLOR);
  textAlign(CENTER, BOTTOM);
  textSize(11);
  text(alt < 50 ? 'impact' : 'breakup', x0, trackY - 12);

  drawLegend();
  drawScaleBar(x0, mapBottom - 22, pxPerKm);
}

function drawWindArrow(x, y, wind, dir) {
  push();
  translate(x + 26, y);
  let ang = 0;                       // tailwind: points right (with flight)
  if (dir === 'Headwind') ang = PI;  // points left
  else if (dir === 'Crosswind') ang = HALF_PI; // points down
  const len = map(wind, 0, 100, 8, 30);
  stroke('#5a6b7b');
  strokeWeight(2);
  const ex = cos(ang) * len, ey = sin(ang) * len;
  line(0, 0, ex, ey);
  push();
  translate(ex, ey);
  rotate(ang);
  fill('#5a6b7b');
  noStroke();
  triangle(0, 0, -6, -4, -6, 4);
  pop();
  pop();
  noStroke();
  fill('#5a6b7b');
  textAlign(LEFT, CENTER);
  textSize(11);
  text('wind ' + wind + ' km/h', x + 60, y);
}

function drawLegend() {
  const lx = canvasWidth - margin - 150;
  let ly = 56;
  noStroke();
  fill(255, 255, 255, 220);
  rect(lx - 8, ly - 8, 158, 64, 6);
  textAlign(LEFT, CENTER);
  textSize(11);
  const order = ['heavy', 'medium', 'light'];
  for (let i = 0; i < order.length; i++) {
    const c = CLASS[order[i]];
    fill(c.color);
    noStroke();
    ellipse(lx + 2, ly + i * 18, c.r + 2, c.r + 2);
    fill('#333');
    text(c.label, lx + 14, ly + i * 18);
  }
}

function drawScaleBar(x0, y, pxPerKm) {
  // choose a "nice" km length that fits in ~90 px
  const targets = [0.1, 0.25, 0.5, 1, 2, 5, 10, 20, 50];
  let km = targets[0];
  for (let i = 0; i < targets.length; i++) {
    if (targets[i] * pxPerKm <= 110) km = targets[i];
  }
  const w = km * pxPerKm;
  stroke('#333');
  strokeWeight(2);
  line(x0, y, x0 + w, y);
  line(x0, y - 4, x0, y + 4);
  line(x0 + w, y - 4, x0 + w, y + 4);
  noStroke();
  fill('#333');
  textAlign(LEFT, BOTTOM);
  textSize(11);
  text(km < 1 ? (km * 1000) + ' m' : km + ' km', x0 + w + 6, y + 4);
}

// ---- readout panel ----
function drawReadout(alt, fieldKm, verdict, sortOn) {
  const top = mapBottom;
  stroke('silver');
  strokeWeight(1);
  line(0, top, canvasWidth, top);

  noStroke();
  fill('#1a3a6c');
  textAlign(LEFT, TOP);
  textSize(15);
  text('Field Readout', margin, top + 8);

  textSize(13);
  fill('#212529');
  const lenStr = fieldKm < 1 ? Math.round(fieldKm * 1000) + ' m' : fieldKm.toFixed(2) + ' km';
  text('Debris-field length:  ' + lenStr, margin, top + 32);
  text('Inferred breakup altitude:  ' + (alt < 50 ? '~0 m (ground impact)' : alt.toLocaleString() + ' m'),
       margin, top + 52);

  // density-sorting note
  fill('#495057');
  textSize(12);
  if (alt < 50) {
    text('Density sorting: none — a tight cluster, no downrange separation.', margin, top + 74);
  } else if (sortOn) {
    text('Density sorting: light pieces fall short / upwind, heavy pieces carry forward.', margin, top + 74, canvasWidth - 2 * margin, 30);
  } else {
    text('Density sorting hidden — turn it on to see how weight separates the field.', margin, top + 74, canvasWidth - 2 * margin, 30);
  }

  // verdict box
  const vy = top + 96;
  noStroke();
  let bg = (alt < 50) ? '#fde8e8' : (alt < 4000 ? '#fff4e0' : '#e8f0fb');
  let bd = (alt < 50) ? IMPACT_COLOR : (alt < 4000 ? '#e8870c' : '#1a3a6c');
  fill(bg);
  stroke(bd);
  strokeWeight(1.5);
  rect(margin - 4, vy, canvasWidth - 2 * margin + 8, drawHeight - vy - 8, 6);
  noStroke();
  fill(bd);
  textAlign(LEFT, TOP);
  textSize(13);
  text('Pattern consistent with: ' + verdict.tag, margin + 4, vy + 6);
  fill('#333');
  textSize(11);
  text(verdict.note, margin + 4, vy + 26, canvasWidth - 2 * margin - 4, 40);
}

// ---- control labels (drawn in the canvas control strip) ----
function drawControlLabels(alt, wind, speed) {
  noStroke();
  fill('#212529');
  textAlign(LEFT, CENTER);
  textSize(13);
  text('Breakup altitude:', margin, drawHeight + 18);
  text(altSlider.value().toLocaleString() + ' m', 360, drawHeight + 18);

  text('Wind speed:', margin, drawHeight + 52);

  text('Aircraft speed:', margin, drawHeight + 86);
  text(speedSlider.value() + ' km/h', 360, drawHeight + 86);
}

function resetDefaults() {
  altSlider.value(DEF_ALT);
  windSlider.value(DEF_WIND);
  speedSlider.value(DEF_SPEED);
  dirSelect.selected('Tailwind');
  sortCheckbox.checked(true);
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
