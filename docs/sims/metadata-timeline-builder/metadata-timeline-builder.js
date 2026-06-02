// Metadata Recovery and Timeline Builder — Apply (L3)
// CANVAS_HEIGHT: 550
// Click a simulated evidence photo to read its EXIF metadata (camera, capture
// time, GPS in decimal + DMS, time zone). Add photos to a chronological timeline
// and plot them on a mini map. Time-zone inconsistencies are flagged in red.

let canvasWidth = 900;
const drawHeight = 500;
const controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
const margin = 15;
const defaultTextSize = 16;

const BG = '#0e2438';
const PANEL = '#ffffff';
const PANEL_E = '#cdd7e5';
const INK = '#1d2b3a';
const SUB = '#5b6472';
const GREEN = '#2e9e57';
const RED = '#c0392b';
const ACCENT = '#2f6fb0';

let addButton, mapButton, exportButton, clearButton;

// Most photos are captured in the device's home zone (-05:00). Two were taken on
// a device whose clock still read a different zone — those are the anomalies.
const HOME_TZ = '-05:00';
const PHOTOS = [
  { id: 'IMG_0418.JPG', make: 'Apple',   model: 'iPhone 13',     dt: '2026-05-14 08:42', tz: '-05:00', lat: 44.9778, lon: -93.2650, hue: 205 },
  { id: 'IMG_0421.JPG', make: 'Apple',   model: 'iPhone 13',     dt: '2026-05-14 09:15', tz: '-05:00', lat: 44.9820, lon: -93.2710, hue: 145 },
  { id: 'DSC_7782.JPG', make: 'Nikon',   model: 'D7500',         dt: '2026-05-14 11:03', tz: '-05:00', lat: 44.9901, lon: -93.2588, hue: 35  },
  { id: 'IMG_0430.JPG', make: 'Apple',   model: 'iPhone 13',     dt: '2026-05-14 14:27', tz: '-08:00', lat: 44.9745, lon: -93.2502, hue: 280 },
  { id: 'PXL_2210.JPG', make: 'Google',  model: 'Pixel 7',       dt: '2026-05-15 07:55', tz: '-05:00', lat: 45.0012, lon: -93.2741, hue: 95  },
  { id: 'DSC_7790.JPG', make: 'Nikon',   model: 'D7500',         dt: '2026-05-15 10:18', tz: '-05:00', lat: 44.9689, lon: -93.2459, hue: 15  },
  { id: 'IMG_0447.JPG', make: 'Apple',   model: 'iPhone 13',     dt: '2026-05-15 16:40', tz: '-08:00', lat: 45.0080, lon: -93.2620, hue: 320 },
  { id: 'PXL_2235.JPG', make: 'Google',  model: 'Pixel 7',       dt: '2026-05-16 09:02', tz: '-05:00', lat: 44.9602, lon: -93.2805, hue: 245 }
];

let selected = 0;
let timeline = [];   // indices added, kept sorted by dt
let showMap = false;

function setup() {
  updateCanvasSize();
  const cnv = createCanvas(canvasWidth, canvasHeight);
  cnv.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  addButton = createButton('Add to Timeline');
  addButton.mousePressed(addSelected);
  mapButton = createButton('Plot on Map');
  mapButton.mousePressed(() => { showMap = !showMap; });
  exportButton = createButton('Export Timeline');
  exportButton.mousePressed(exportTimeline);
  clearButton = createButton('Clear');
  clearButton.mousePressed(() => { timeline = []; });
  positionControls();
}
function positionControls() {
  const y = drawHeight + 12;
  addButton.position(margin, y);
  mapButton.position(margin + 130, y);
  exportButton.position(margin + 245, y);
  clearButton.position(margin + 372, y);
}
function updateCanvasSize() {
  const c = document.querySelector('main');
  if (c) canvasWidth = Math.max(800, Math.floor(c.getBoundingClientRect().width));
}
function windowResized() {
  updateCanvasSize(); resizeCanvas(canvasWidth, canvasHeight); positionControls();
}

function addSelected() {
  if (!timeline.includes(selected)) {
    timeline.push(selected);
    timeline.sort((a, b) => PHOTOS[a].dt < PHOTOS[b].dt ? -1 : 1);
  }
}
function exportTimeline() {
  if (timeline.length === 0) { console.log('Timeline is empty.'); return; }
  let out = 'CHRONOLOGICAL EVIDENCE TIMELINE\n';
  timeline.forEach((idx, i) => {
    const p = PHOTOS[idx];
    out += (i + 1) + '. ' + p.dt + ' (UTC' + p.tz + ')  ' + p.id +
      '  GPS ' + p.lat.toFixed(4) + ', ' + p.lon.toFixed(4) +
      (p.tz !== HOME_TZ ? '  [TZ ANOMALY]' : '') + '\n';
  });
  console.log(out);
}

function toDMS(deg, posChar, negChar) {
  const dir = deg >= 0 ? posChar : negChar;
  const a = Math.abs(deg);
  const d = Math.floor(a);
  const mfloat = (a - d) * 60;
  const m = Math.floor(mfloat);
  const s = ((mfloat - m) * 60).toFixed(1);
  return d + '° ' + m + "' " + s + '" ' + dir;
}

function draw() {
  background(BG);
  noStroke();
  fill('#0a1b2a'); rect(0, drawHeight, canvasWidth, controlHeight);

  fill('#eaf1f9'); textAlign(CENTER, TOP); textSize(20); textStyle(BOLD);
  text('Metadata Recovery & Timeline Builder', canvasWidth / 2, 8); textStyle(NORMAL);

  const w = canvasWidth - 2 * margin;
  const top = 40;
  const tlH = 96;                       // timeline strip height
  const bodyH = drawHeight - top - tlH - 14;
  const leftW = w * 0.38;

  drawBrowser(margin, top, leftW, bodyH);
  const rx = margin + leftW + 12;
  const rw = w - leftW - 12;
  if (showMap) drawMap(rx, top, rw, bodyH);
  else drawExif(rx, top, rw, bodyH);

  drawTimeline(margin, drawHeight - tlH - 4, w, tlH);

  // control strip hint
  fill('#9fb4c9'); textAlign(LEFT, CENTER); textSize(11);
  text('Click a photo to read EXIF · ' + timeline.length + ' on timeline', margin + 430, drawHeight + 25);
}

function panel(x, y, w, h, title) {
  fill(PANEL); stroke(PANEL_E); strokeWeight(1); rect(x, y, w, h, 8); noStroke();
  fill(ACCENT); textAlign(LEFT, TOP); textSize(12.5); textStyle(BOLD);
  text(title, x + 14, y + 10); textStyle(NORMAL);
}

let iconRects = [];
function drawBrowser(x, y, w, h) {
  panel(x, y, w, h, 'Evidence Photos');
  iconRects = [];
  const cols = 2;
  const gx = 14, gy = 36, gap = 7;
  const cellW = (w - gx * 2 - 10) / cols;
  const cellH = 68;
  for (let i = 0; i < PHOTOS.length; i++) {
    const c = i % cols, r = floor(i / cols);
    const ix = x + gx + c * (cellW + 10);
    const iy = y + gy + r * (cellH + gap);
    iconRects.push({ x: ix, y: iy, w: cellW, h: cellH, i });
    // selection highlight
    if (i === selected) { stroke(ACCENT); strokeWeight(2.5); } else { stroke(PANEL_E); strokeWeight(1); }
    fill('#f4f7fb'); rect(ix, iy, cellW, cellH, 6); noStroke();
    // thumbnail swatch
    colorMode(HSB, 360, 100, 100);
    fill(PHOTOS[i].hue, 45, 78); rect(ix + 8, iy + 7, cellW - 16, 28, 4);
    colorMode(RGB, 255);
    fill('#ffffff'); textAlign(CENTER, CENTER); textSize(9); text('JPEG', ix + cellW / 2, iy + 21);
    // filename + added check / time
    fill(INK); textAlign(LEFT, TOP); textSize(10.5);
    text(PHOTOS[i].id, ix + 8, iy + 40);
    if (timeline.includes(i)) {
      fill(GREEN); textAlign(LEFT, TOP); textSize(10.5); textStyle(BOLD);
      text('✓ added', ix + 8, iy + 53); textStyle(NORMAL);
    } else {
      fill(SUB); textAlign(LEFT, TOP); textSize(9.5);
      text(PHOTOS[i].dt.slice(11), ix + 8, iy + 53);
    }
  }
}

function drawExif(x, y, w, h) {
  panel(x, y, w, h, 'EXIF Metadata');
  const p = PHOTOS[selected];
  const anomaly = p.tz !== HOME_TZ;
  let ty = y + 38;
  const lx = x + 16, vx = x + 150;
  textAlign(LEFT, TOP);

  // file name header
  fill(INK); textSize(15); textStyle(BOLD); text(p.id, lx, ty); textStyle(NORMAL);
  ty += 26;

  const row = (label, value, col) => {
    fill(SUB); textSize(11.5); text(label, lx, ty);
    fill(col || INK); textSize(12.5); text(value, vx, ty);
    ty += 22;
  };
  row('Camera Make', p.make);
  row('Camera Model', p.model);
  row('Capture Date', p.dt.slice(0, 10), GREEN);
  row('Capture Time', p.dt.slice(11), GREEN);
  row('Device Time Zone', 'UTC' + p.tz, anomaly ? RED : GREEN);
  ty += 6;
  fill(ACCENT); textSize(11.5); textStyle(BOLD); text('GPS Coordinates', lx, ty); textStyle(NORMAL); ty += 20;
  row('Decimal', p.lat.toFixed(4) + ', ' + p.lon.toFixed(4));
  row('DMS Lat', toDMS(p.lat, 'N', 'S'));
  row('DMS Long', toDMS(p.lon, 'E', 'W'));

  ty += 6;
  if (anomaly) {
    fill(RED); textSize(11.5); textStyle(BOLD);
    text('⚠ Time-zone anomaly', lx, ty); textStyle(NORMAL); ty += 18;
    fill(SUB); textSize(11);
    text('Device zone UTC' + p.tz + ' differs from the case home zone UTC' +
      HOME_TZ + '. Verify the camera clock before trusting this timestamp.',
      lx, ty, w - 32);
  } else {
    fill(GREEN); textSize(11.5); textStyle(BOLD);
    text('✓ Time zone consistent with case', lx, ty); textStyle(NORMAL);
  }
}

function drawMap(x, y, w, h) {
  panel(x, y, w, h, 'GPS Map (selected + timeline)');
  const mx = x + 14, my = y + 36, mw = w - 28, mh = h - 50;
  fill('#eef4ee'); stroke(PANEL_E); rect(mx, my, mw, mh, 6); noStroke();
  // grid lines
  stroke('#d6e3d6'); strokeWeight(1);
  for (let i = 1; i < 6; i++) { line(mx + mw * i / 6, my, mx + mw * i / 6, my + mh); }
  for (let i = 1; i < 5; i++) { line(mx, my + mh * i / 5, mx + mw, my + mh * i / 5); }
  noStroke();
  // bounding box over all photos
  let minLat = 1e9, maxLat = -1e9, minLon = 1e9, maxLon = -1e9;
  PHOTOS.forEach(p => {
    minLat = min(minLat, p.lat); maxLat = max(maxLat, p.lat);
    minLon = min(minLon, p.lon); maxLon = max(maxLon, p.lon);
  });
  const pad = 0.15;
  const proj = (p) => {
    const px = map(p.lon, minLon, maxLon, mx + mw * pad, mx + mw * (1 - pad));
    const py = map(p.lat, minLat, maxLat, my + mh * (1 - pad), my + mh * pad); // north up
    return { px, py };
  };
  // timeline pins (numbered) + selected highlighted
  timeline.forEach((idx, i) => {
    const q = proj(PHOTOS[idx]);
    const anomaly = PHOTOS[idx].tz !== HOME_TZ;
    fill(anomaly ? RED : ACCENT); circle(q.px, q.py, 18);
    fill('#ffffff'); textAlign(CENTER, CENTER); textSize(10); textStyle(BOLD);
    text(i + 1, q.px, q.py - 0.5); textStyle(NORMAL);
  });
  // selected pin (open ring) if not on timeline
  const s = proj(PHOTOS[selected]);
  noFill(); stroke(PHOTOS[selected].tz !== HOME_TZ ? RED : GREEN); strokeWeight(2.5);
  circle(s.px, s.py, 24); noStroke();
  fill(INK); textAlign(CENTER, TOP); textSize(9.5);
  text(PHOTOS[selected].id, s.px, s.py + 14);
  // legend
  fill(SUB); textAlign(LEFT, BOTTOM); textSize(10);
  text('Ring = selected · numbered = timeline order · red = TZ anomaly', mx + 6, my + mh - 4);
}

function drawTimeline(x, y, w, h) {
  fill('#0a1b2a'); stroke('#1d3247'); strokeWeight(1); rect(x, y, w, h, 8); noStroke();
  fill('#9fdcb6'); textAlign(LEFT, TOP); textSize(12); textStyle(BOLD);
  text('Chronological Timeline', x + 14, y + 8); textStyle(NORMAL);
  if (timeline.length === 0) {
    fill('#7f96ad'); textSize(11.5); textAlign(LEFT, CENTER);
    text('Select a photo and press "Add to Timeline" to begin building the sequence.', x + 14, y + h / 2 + 6);
    return;
  }
  const axisY = y + h - 26;
  stroke('#3a5670'); strokeWeight(2); line(x + 24, axisY, x + w - 24, axisY); noStroke();
  const n = timeline.length;
  for (let i = 0; i < n; i++) {
    const p = PHOTOS[timeline[i]];
    const px = n === 1 ? x + w / 2 : map(i, 0, n - 1, x + 40, x + w - 40);
    const anomaly = p.tz !== HOME_TZ;
    stroke('#3a5670'); strokeWeight(1); line(px, axisY, px, axisY - 14); noStroke();
    fill(anomaly ? RED : '#5fb98a'); circle(px, axisY, 12);
    fill('#dce7f2'); textAlign(CENTER, BOTTOM); textSize(9.5);
    text(p.dt.slice(5).replace(' ', '\n'), px, axisY - 16);
    fill('#7f96ad'); textAlign(CENTER, TOP); textSize(8.5);
    text(p.id.slice(0, 8), px, axisY + 8);
  }
}

function mousePressed() {
  for (const r of iconRects) {
    if (mouseX >= r.x && mouseX <= r.x + r.w && mouseY >= r.y && mouseY <= r.y + r.h) {
      selected = r.i; return;
    }
  }
}
