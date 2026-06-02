// Skeletal Sex Indicators — Interactive Diagram — Remember (L1)
// CANVAS_HEIGHT: 550
// Compare male and female pelvis and skull features side by side. Click any
// labeled feature to read how it differs between the sexes and how reliable it is.
// Toggle labels off and use "Quiz Me" to test yourself.

let canvasWidth = 900;
const drawHeight = 500;
const controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
const margin = 15;
const defaultTextSize = 16;

const BONE = '#e9dcc0';
const BONE_E = '#b7a378';
const MALE = '#c0392b';
const FEMALE = '#2f6fb0';
const INK = '#1d2b3a';
const SUB = '#5b6472';
const PANEL = '#ffffff';
const PANEL_E = '#cdd7e5';
const HEAD = '#173a63';
const GOOD = '#2e9e57';

// region: 'pelvis' | 'skull'; ox/oy = dot offset from that schematic's center
const FEATURES = [
  { id: 'subpubic', name: 'Subpubic Angle', region: 'pelvis', ox: 0, oy: 62, acc: 95,
    male: 'Narrow, V-shaped arch — less than 90°.',
    female: 'Wide, U-shaped arch — greater than 90°.' },
  { id: 'sciatic', name: 'Greater Sciatic Notch', region: 'pelvis', ox: -52, oy: 6, acc: 90,
    male: 'Narrow and deep — a tight angle.',
    female: 'Wide and shallow — an open angle.' },
  { id: 'inlet', name: 'Pelvic Inlet Shape', region: 'pelvis', ox: 0, oy: -16, acc: 85,
    male: 'Heart-shaped and narrow.',
    female: 'Oval, round, and broad (built for childbirth).' },
  { id: 'brow', name: 'Brow Ridge', region: 'skull', ox: 0, oy: -34, acc: 85,
    male: 'Pronounced, heavy supraorbital ridge.',
    female: 'Smooth, with little or no ridge.' },
  { id: 'mastoid', name: 'Mastoid Process', region: 'skull', ox: -40, oy: 44, acc: 80,
    male: 'Large and robust bony bump behind the ear.',
    female: 'Small and smooth.' },
  { id: 'chin', name: 'Mental Eminence (Chin)', region: 'skull', ox: 0, oy: 66, acc: 80,
    male: 'Square, broad chin.',
    female: 'Rounded or pointed chin.' }
];

let labelsOn = true;
let mode = 'explore';            // 'explore' | 'quiz'
let selected = FEATURES[0];
let quiz = null;                 // { feature, sex, answered, correct }
let labelButton, quizButton, maleButton, femaleButton;
let dots = [];                   // hit zones

function setup() {
  updateCanvasSize();
  const cnv = createCanvas(canvasWidth, canvasHeight);
  cnv.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  labelButton = createButton('Hide Labels');
  labelButton.mousePressed(() => { labelsOn = !labelsOn; labelButton.html(labelsOn ? 'Hide Labels' : 'Show Labels'); });
  quizButton = createButton('Quiz Me');
  quizButton.mousePressed(startQuiz);
  maleButton = createButton('Male');
  maleButton.mousePressed(() => answerQuiz('male'));
  femaleButton = createButton('Female');
  femaleButton.mousePressed(() => answerQuiz('female'));
  positionControls();
  updateQuizButtons();
}
function positionControls() {
  const y = drawHeight + 12;
  labelButton.position(margin, y);
  quizButton.position(margin + 105, y);
  maleButton.position(margin + 200, y);
  femaleButton.position(margin + 270, y);
}
function updateQuizButtons() {
  if (mode === 'quiz' && quiz && !quiz.answered) { maleButton.show(); femaleButton.show(); }
  else { maleButton.hide(); femaleButton.hide(); }
}
function updateCanvasSize() {
  const c = document.querySelector('main');
  if (c) canvasWidth = Math.max(800, Math.floor(c.getBoundingClientRect().width));
}
function windowResized() {
  updateCanvasSize(); resizeCanvas(canvasWidth, canvasHeight); positionControls();
}

function startQuiz() {
  mode = 'quiz'; labelsOn = false; labelButton.html('Show Labels');
  const f = FEATURES[floor(random(FEATURES.length))];
  const sex = random() < 0.5 ? 'male' : 'female';
  quiz = { feature: f, sex, answered: false, correct: false };
  selected = f;
  updateQuizButtons();
}
function answerQuiz(choice) {
  if (!quiz || quiz.answered) return;
  quiz.answered = true;
  quiz.correct = (choice === quiz.sex);
  quiz.choice = choice;
  updateQuizButtons();
}

function draw() {
  background('#eef2f7');
  noStroke();
  fill('#f4f4f4'); rect(0, drawHeight, canvasWidth, controlHeight);

  fill(HEAD); textAlign(CENTER, TOP); textSize(20); textStyle(BOLD);
  text('Skeletal Sex Indicators', canvasWidth / 2, 8); textStyle(NORMAL);

  const w = canvasWidth - 2 * margin;
  const top = 40;
  const mainW = w * 0.60;
  const mainH = drawHeight - top - 10;
  drawDiagrams(margin, top, mainW, mainH);
  drawPanel(margin + mainW + 12, top, w - mainW - 12, mainH);

  fill(SUB); textAlign(LEFT, CENTER); textSize(11);
  text(mode === 'quiz' ? 'Quiz mode — read the panel, then choose Male or Female'
    : 'Click a labeled feature to compare male vs. female', margin + 350, drawHeight + 25);
}

function drawDiagrams(x, y, w, h) {
  fill(PANEL); stroke(PANEL_E); strokeWeight(1); rect(x, y, w, h, 8); noStroke();
  const colW = w / 2, rowH = h / 2;
  // column headers
  fill(MALE); textAlign(CENTER, TOP); textSize(13); textStyle(BOLD);
  text('MALE', x + colW * 0.5, y + 8);
  fill(FEMALE); text('FEMALE', x + colW * 1.5, y + 8); textStyle(NORMAL);
  // row labels
  push(); fill(SUB); textSize(10.5); textStyle(BOLD);
  translate(x + 12, y + rowH * 0.5); rotate(-HALF_PI); textAlign(CENTER, CENTER); text('PELVIS', 0, 0); pop();
  push(); fill(SUB); textSize(10.5); textStyle(BOLD);
  translate(x + 12, y + rowH * 1.5); rotate(-HALF_PI); textAlign(CENTER, CENTER); text('SKULL', 0, 0); pop();

  dots = [];
  const cMP = { x: x + colW * 0.5, y: y + rowH * 0.5 + 6 };
  const cFP = { x: x + colW * 1.5, y: y + rowH * 0.5 + 6 };
  const cMS = { x: x + colW * 0.5, y: y + rowH * 1.5 - 2 };
  const cFS = { x: x + colW * 1.5, y: y + rowH * 1.5 - 2 };
  drawPelvis(cMP.x, cMP.y, true); drawPelvis(cFP.x, cFP.y, false);
  drawSkull(cMS.x, cMS.y, true); drawSkull(cFS.x, cFS.y, false);

  // feature dots on each schematic
  placeDots('pelvis', cMP, true); placeDots('pelvis', cFP, false);
  placeDots('skull', cMS, true); placeDots('skull', cFS, false);
}

function placeDots(region, c, isMale) {
  FEATURES.filter(f => f.region === region).forEach(f => {
    const dx = c.x + (isMale ? f.ox : f.ox), dy = c.y + f.oy;
    const isSel = selected && selected.id === f.id;
    const col = isMale ? MALE : FEMALE;
    // in quiz mode, only highlight the quizzed feature on the quizzed sex
    const quizHit = mode === 'quiz' && quiz && quiz.feature.id === f.id && quiz.sex === (isMale ? 'male' : 'female');
    if (mode === 'explore' && isSel) { noFill(); stroke(col); strokeWeight(2.5); circle(dx, dy, 22); noStroke(); }
    if (quizHit) { noFill(); stroke('#e8900c'); strokeWeight(3); circle(dx, dy, 24); noStroke(); }
    fill(col); circle(dx, dy, 12);
    fill('#ffffff'); textAlign(CENTER, CENTER); textSize(9); textStyle(BOLD);
    text(FEATURES.filter(ff => ff.region === region).indexOf(f) + 1 + (region === 'skull' ? 3 : 0), dx, dy); textStyle(NORMAL);
    if (labelsOn) {
      fill(INK); textAlign(LEFT, CENTER); textSize(9.5);
      text(f.name, dx + 10, dy);
    }
    dots.push({ x: dx, y: dy, r: 12, feature: f, isMale });
  });
}

function drawPelvis(cx, cy, isMale) {
  const col = isMale ? MALE : FEMALE;
  const wIlium = isMale ? 58 : 74;        // female wider
  push(); translate(cx, cy);
  stroke(BONE_E); strokeWeight(2); fill(BONE);
  // two iliac wings
  ellipse(-wIlium * 0.55, -18, wIlium, 70);
  ellipse(wIlium * 0.55, -18, wIlium, 70);
  // central inlet opening
  noStroke(); fill('#ffffff');
  if (isMale) { // heart-ish: narrow
    beginShape(); vertex(0, -2); bezierVertex(-26, -8, -22, 30, 0, 42); bezierVertex(22, 30, 26, -8, 0, -2); endShape(CLOSE);
  } else { // oval wide
    ellipse(0, 18, 64, 52);
  }
  stroke(BONE_E); strokeWeight(2); noFill();
  if (isMale) { beginShape(); vertex(0, -2); bezierVertex(-26, -8, -22, 30, 0, 42); bezierVertex(22, 30, 26, -8, 0, -2); endShape(CLOSE); }
  else ellipse(0, 18, 64, 52);
  // subpubic angle (V male / U female) at bottom center
  stroke(col); strokeWeight(3); noFill();
  if (isMale) { line(0, 52, -16, 78); line(0, 52, 16, 78); }
  else { arc(0, 52, 56, 52, 0, PI); }
  pop();
}

function drawSkull(cx, cy, isMale) {
  const col = isMale ? MALE : FEMALE;
  push(); translate(cx, cy);
  stroke(BONE_E); strokeWeight(2); fill(BONE);
  // cranium
  ellipse(0, -14, 90, 96);
  // jaw / mandible
  if (isMale) {
    beginShape(); vertex(-40, 6); vertex(-36, 46); vertex(0, 64); vertex(36, 46); vertex(40, 6); endShape();
  } else {
    beginShape(); vertex(-36, 6); vertex(-28, 44); vertex(0, 58); vertex(28, 44); vertex(36, 6); endShape();
  }
  noStroke(); fill(BONE);
  rect(-40, -2, 80, 16);
  // eye sockets
  fill('#cdbf9b'); noStroke();
  ellipse(-18, -20, 22, 18); ellipse(18, -20, 22, 18);
  // brow ridge
  stroke(col); strokeWeight(isMale ? 5 : 2); noFill();
  arc(0, -34, 72, 30, PI + 0.2, TWO_PI - 0.2);
  // mastoid bumps
  noStroke(); fill(col);
  const mr = isMale ? 11 : 6;
  ellipse(-40, 28, mr, mr + 4); ellipse(40, 28, mr, mr + 4);
  // chin
  stroke(col); strokeWeight(isMale ? 4 : 2); noFill();
  if (isMale) { line(-12, 60, 12, 60); }
  else { arc(0, 56, 22, 18, 0, PI); }
  pop();
}

function drawPanel(x, y, w, h) {
  fill(PANEL); stroke(PANEL_E); strokeWeight(1); rect(x, y, w, h, 8); noStroke();
  if (mode === 'quiz') { drawQuizPanel(x, y, w, h); return; }

  const f = selected;
  fill(HEAD); textAlign(LEFT, TOP); textSize(12.5); textStyle(BOLD);
  text('Feature Detail', x + 14, y + 12); textStyle(NORMAL);
  fill(INK); textSize(17); textStyle(BOLD); text(f.name, x + 14, y + 34); textStyle(NORMAL);
  fill(SUB); textSize(11); text(f.region === 'pelvis' ? 'Region: Pelvis' : 'Region: Skull', x + 14, y + 58);

  // male vs female comparison
  let ty = y + 84;
  fill(MALE); textSize(12.5); textStyle(BOLD); text('Male', x + 14, ty); textStyle(NORMAL);
  fill(INK); textSize(11.8); text(f.male, x + 14, ty + 18, w - 28); ty += 58;
  fill(FEMALE); textSize(12.5); textStyle(BOLD); text('Female', x + 14, ty); textStyle(NORMAL);
  fill(INK); textSize(11.8); text(f.female, x + 14, ty + 18, w - 28); ty += 60;

  // accuracy bar
  stroke('#e3e8f0'); line(x + 12, ty, x + w - 12, ty); noStroke(); ty += 12;
  fill(HEAD); textSize(11.5); textStyle(BOLD); text('Reliability as a sex indicator', x + 14, ty); textStyle(NORMAL);
  ty += 22;
  const bx = x + 14, bw = w - 90, bh = 16;
  fill('#eef2f7'); rect(bx, ty, bw, bh, 4);
  const ac = f.acc >= 90 ? GOOD : (f.acc >= 83 ? '#e8900c' : '#c0392b');
  fill(ac); rect(bx, ty, bw * f.acc / 100, bh, 4);
  fill(INK); textAlign(LEFT, CENTER); textSize(13); textStyle(BOLD);
  text('~' + f.acc + '%', bx + bw + 8, ty + bh / 2); textStyle(NORMAL);
  fill(SUB); textAlign(LEFT, TOP); textSize(10.5);
  text(f.acc >= 90 ? 'Highly reliable — pelvic features are the gold standard for sex estimation.'
    : 'Useful but less reliable on its own; combine several features for a confident estimate.',
    x + 14, ty + 28, w - 28);
}

function drawQuizPanel(x, y, w, h) {
  fill('#173a63'); textAlign(LEFT, TOP); textSize(12.5); textStyle(BOLD);
  text('Quiz Me', x + 14, y + 12); textStyle(NORMAL);
  const f = quiz.feature;
  const desc = quiz.sex === 'male' ? f.male : f.female;
  fill(INK); textSize(12); text('A skeleton shows this ' + f.name.toLowerCase() + ':', x + 14, y + 40, w - 28);
  fill('#173a63'); textSize(13.5); textStyle(BOLD); text('“' + desc + '”', x + 14, y + 78, w - 28); textStyle(NORMAL);

  if (!quiz.answered) {
    fill(SUB); textSize(12); text('Which sex does this indicate? Use the Male / Female buttons below.', x + 14, y + 138, w - 28);
  } else {
    const col = quiz.correct ? GOOD : MALE;
    fill(col); textSize(15); textStyle(BOLD);
    text(quiz.correct ? '✓ Correct!' : '✗ Not quite', x + 14, y + 140); textStyle(NORMAL);
    fill(INK); textSize(12.5);
    text('This feature indicates ' + quiz.sex.toUpperCase() + '.', x + 14, y + 166, w - 28);
    fill(SUB); textSize(11.5);
    text('Reliability of ' + f.name + ': ~' + f.acc + '%.', x + 14, y + 190, w - 28);
    fill(SUB); textSize(11);
    text('Press "Quiz Me" for another, or "Show Labels" to return to exploring.', x + 14, y + 218, w - 28);
  }
}

function mousePressed() {
  if (mouseY > drawHeight) return;
  if (mode === 'quiz') return; // answers come from DOM buttons
  for (const d of dots) {
    if (dist(mouseX, mouseY, d.x, d.y) <= d.r + 4) { selected = d.feature; return; }
  }
}
