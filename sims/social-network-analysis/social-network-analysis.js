// Social Network Analysis Graph Explorer — Analyze (L4)
// CANVAS_HEIGHT: 600
// Analyze a communication network: pick which centrality drives node SIZE and
// COLOR, filter out weakly connected accounts, click a node to read its degree
// and betweenness, run community detection to see the clusters, and trace the
// shortest path between any two accounts. The summary panel names the top
// "broker" accounts that bridge the network.

let canvasWidth = 900;
const drawHeight = 545;
const controlHeight = 55;
let canvasHeight = drawHeight + controlHeight;
const margin = 15;
const defaultTextSize = 16;

const BG = '#101826';
const PANEL = '#1b2738';
const PANEL_E = '#33445c';
const EDGE = '#3f6491';
const TXT = '#e8eef6';
const SUB = '#9fb0c4';
const RED = '#d6453d';      // suspect
const ORANGE = '#e8900c';   // associate / path highlight
const GRAY = '#7d8aa0';     // peripheral
const HEAD = '#cfe0f4';

const CLUSTER_COLS = ['#4e9bd6', '#56b96e', '#c879d6', '#e0a84a', '#d6685a'];

// 16 simulated accounts. role: suspect / associate / peripheral
const NODES = [
  { name: 'M. Reyes',   role: 'suspect' },     // 0
  { name: 'V. Doyle',   role: 'suspect' },     // 1
  { name: 'L. Park',    role: 'associate' },   // 2  (A-B broker)
  { name: 'D. Osei',    role: 'associate' },   // 3
  { name: 'T. Haddad',  role: 'peripheral' },  // 4
  { name: 'S. Marino',  role: 'associate' },   // 5  (B-C broker)
  { name: 'O. Khan',    role: 'suspect' },     // 6  (B-C broker)
  { name: 'N. Aziz',    role: 'associate' },   // 7
  { name: 'P. Rao',     role: 'peripheral' },  // 8
  { name: 'J. Mott',    role: 'peripheral' },  // 9
  { name: 'H. Vogel',   role: 'associate' },   // 10 (B-C broker)
  { name: 'I. Stern',   role: 'peripheral' },  // 11
  { name: 'C. Webb',    role: 'peripheral' },  // 12
  { name: 'R. Diaz',    role: 'associate' },   // 13
  { name: 'F. Lund',    role: 'peripheral' },  // 14
  { name: 'G. Sahni',   role: 'peripheral' }   // 15
];

// edges: [a, b, weight(=message frequency)]
const EDGES = [
  // community A
  [0, 1, 5], [0, 2, 4], [1, 2, 3], [2, 3, 3], [3, 4, 2], [0, 3, 2], [1, 3, 2],
  // community B
  [5, 6, 4], [6, 7, 4], [5, 7, 3], [7, 8, 2], [8, 9, 2], [6, 9, 2], [5, 8, 2],
  // community C
  [10, 11, 3], [10, 13, 4], [11, 12, 2], [12, 14, 2], [13, 14, 3], [13, 15, 2], [14, 15, 2], [10, 12, 2],
  // bridges between communities
  [2, 5, 2], [6, 10, 2]
];

let adj = [];          // adjacency list of neighbor indices
let degree = [];       // degree centrality (# neighbors)
let betweenness = [];  // betweenness centrality (normalized 0..1)
let clustering = [];   // clustering coefficient 0..1
let cluster = [];      // community id per node
let nClusters = 0;
let topBrokers = [];   // node indices sorted by betweenness, top 3

let colorSel, sizeSel, minSlider;
let clusterBtn, pathBtn, resetBtn;
let showClusters = false;
let pathMode = false;
let pathPick = [];     // up to two node indices
let pathNodes = [];    // shortest-path node sequence to highlight
let selected = -1;
let dragging = -1;

function setup() {
  updateCanvasSize();
  const cnv = createCanvas(canvasWidth, canvasHeight);
  cnv.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  buildGraph();
  computeMetrics();
  detectClusters();
  layoutGraph();

  colorSel = createSelect();
  colorSel.option('Role');
  colorSel.option('Degree centrality');
  colorSel.option('Betweenness');
  colorSel.option('Clustering coeff.');
  colorSel.selected('Role');

  sizeSel = createSelect();
  sizeSel.option('Degree centrality');
  sizeSel.option('Betweenness');
  sizeSel.option('Clustering coeff.');
  sizeSel.selected('Degree centrality');

  minSlider = createSlider(0, 6, 0, 1);
  minSlider.style('width', '130px');

  clusterBtn = createButton('Highlight clusters');
  clusterBtn.mousePressed(() => { showClusters = !showClusters; });

  pathBtn = createButton('Shortest path');
  pathBtn.mousePressed(() => {
    pathMode = !pathMode; pathPick = []; pathNodes = [];
  });

  resetBtn = createButton('Reset');
  resetBtn.mousePressed(() => {
    showClusters = false; pathMode = false; pathPick = []; pathNodes = [];
    selected = -1; minSlider.value(0);
    colorSel.selected('Role'); sizeSel.selected('Degree centrality');
  });

  positionControls();
}

function buildGraph() {
  adj = NODES.map(() => []);
  for (const [a, b] of EDGES) { adj[a].push(b); adj[b].push(a); }
  degree = adj.map(n => n.length);
}

function computeMetrics() {
  const N = NODES.length;
  // Brandes betweenness on unweighted graph
  const bc = new Array(N).fill(0);
  for (let s = 0; s < N; s++) {
    const stack = [];
    const pred = Array.from({ length: N }, () => []);
    const sigma = new Array(N).fill(0); sigma[s] = 1;
    const dist = new Array(N).fill(-1); dist[s] = 0;
    const queue = [s];
    while (queue.length) {
      const v = queue.shift(); stack.push(v);
      for (const w of adj[v]) {
        if (dist[w] < 0) { dist[w] = dist[v] + 1; queue.push(w); }
        if (dist[w] === dist[v] + 1) { sigma[w] += sigma[v]; pred[w].push(v); }
      }
    }
    const delta = new Array(N).fill(0);
    while (stack.length) {
      const w = stack.pop();
      for (const v of pred[w]) delta[v] += (sigma[v] / sigma[w]) * (1 + delta[w]);
      if (w !== s) bc[w] += delta[w];
    }
  }
  // undirected: divide by 2; normalize by max
  const norm = (N - 1) * (N - 2);
  betweenness = bc.map(v => (norm > 0 ? (v / 2) / (norm / 2) : 0));

  // clustering coefficient
  clustering = adj.map((nb, i) => {
    const k = nb.length;
    if (k < 2) return 0;
    let links = 0;
    for (let a = 0; a < nb.length; a++)
      for (let b = a + 1; b < nb.length; b++)
        if (adj[nb[a]].includes(nb[b])) links++;
    return (2 * links) / (k * (k - 1));
  });
}

function detectClusters() {
  // Girvan-Newman: repeatedly remove the highest edge-betweenness edge until
  // the graph splits into the target number of communities.
  const N = NODES.length;
  const TARGET = 3;
  const key = (u, v) => (u < v ? u + '-' + v : v + '-' + u);

  let edges = EDGES.map(([a, b]) => [a, b]);
  const adjOf = es => {
    const a = NODES.map(() => []);
    for (const [u, v] of es) { a[u].push(v); a[v].push(u); }
    return a;
  };
  const components = a => {
    const comp = new Array(N).fill(-1); let c = 0;
    for (let s = 0; s < N; s++) {
      if (comp[s] < 0) {
        const q = [s]; comp[s] = c;
        while (q.length) { const v = q.shift(); for (const w of a[v]) if (comp[w] < 0) { comp[w] = c; q.push(w); } }
        c++;
      }
    }
    return { comp, count: c };
  };
  const edgeBetween = a => {
    const eb = {};
    for (const [u, v] of edges) eb[key(u, v)] = 0;
    for (let s = 0; s < N; s++) {
      const stack = [];
      const pred = Array.from({ length: N }, () => []);
      const sigma = new Array(N).fill(0); sigma[s] = 1;
      const dist = new Array(N).fill(-1); dist[s] = 0;
      const q = [s];
      while (q.length) {
        const v = q.shift(); stack.push(v);
        for (const w of a[v]) {
          if (dist[w] < 0) { dist[w] = dist[v] + 1; q.push(w); }
          if (dist[w] === dist[v] + 1) { sigma[w] += sigma[v]; pred[w].push(v); }
        }
      }
      const delta = new Array(N).fill(0);
      while (stack.length) {
        const w = stack.pop();
        for (const v of pred[w]) {
          const c = (sigma[v] / sigma[w]) * (1 + delta[w]);
          eb[key(v, w)] += c; delta[v] += c;
        }
      }
    }
    return eb;
  };

  let a = adjOf(edges);
  let comp = components(a);
  let guard = 0;
  while (comp.count < TARGET && edges.length > 0 && guard++ < 100) {
    const eb = edgeBetween(a);
    let maxK = null, maxV = -1;
    for (const k of Object.keys(eb)) if (eb[k] > maxV) { maxV = eb[k]; maxK = k; }
    const [u, v] = maxK.split('-').map(Number);
    edges = edges.filter(([x, y]) => !((x === u && y === v) || (x === v && y === u)));
    a = adjOf(edges);
    comp = components(a);
  }
  cluster = comp.comp;
  nClusters = comp.count;

  topBrokers = NODES.map((_, i) => i)
    .sort((a, b) => betweenness[b] - betweenness[a])
    .slice(0, 3);
}

let graphArea;
function layoutGraph() {
  const panelW = 250;
  graphArea = {
    x: margin, y: 40,
    w: canvasWidth - panelW - 3 * margin,
    h: drawHeight - 40 - margin,
    panelX: canvasWidth - panelW - margin, panelW
  };
  const cx = graphArea.x + graphArea.w / 2;
  const cy = graphArea.y + graphArea.h / 2;
  const R = Math.min(graphArea.w, graphArea.h) * 0.42;
  // deterministic seed positions on a circle
  for (let i = 0; i < NODES.length; i++) {
    const ang = (i / NODES.length) * TWO_PI;
    NODES[i].x = cx + R * Math.cos(ang) + (i % 3 - 1) * 8;
    NODES[i].y = cy + R * Math.sin(ang) + (i % 2 - 0.5) * 8;
  }
  // Fruchterman-Reingold style relaxation, run to settle before first draw
  const area = graphArea.w * graphArea.h;
  const k = Math.sqrt(area / NODES.length) * 0.55;
  let temp = graphArea.w * 0.1;
  for (let iter = 0; iter < 400; iter++) {
    const disp = NODES.map(() => ({ x: 0, y: 0 }));
    // repulsion
    for (let i = 0; i < NODES.length; i++) {
      for (let j = i + 1; j < NODES.length; j++) {
        let dx = NODES[i].x - NODES[j].x, dy = NODES[i].y - NODES[j].y;
        let d = Math.sqrt(dx * dx + dy * dy) || 0.01;
        const f = (k * k) / d;
        const ux = dx / d, uy = dy / d;
        disp[i].x += ux * f; disp[i].y += uy * f;
        disp[j].x -= ux * f; disp[j].y -= uy * f;
      }
    }
    // attraction along edges
    for (const [a, b] of EDGES) {
      let dx = NODES[a].x - NODES[b].x, dy = NODES[a].y - NODES[b].y;
      let d = Math.sqrt(dx * dx + dy * dy) || 0.01;
      const f = (d * d) / k;
      const ux = dx / d, uy = dy / d;
      disp[a].x -= ux * f; disp[a].y -= uy * f;
      disp[b].x += ux * f; disp[b].y += uy * f;
    }
    // apply with temperature cap, then clamp to area
    for (let i = 0; i < NODES.length; i++) {
      let d = Math.sqrt(disp[i].x ** 2 + disp[i].y ** 2) || 0.01;
      NODES[i].x += (disp[i].x / d) * Math.min(d, temp);
      NODES[i].y += (disp[i].y / d) * Math.min(d, temp);
      NODES[i].x = constrain(NODES[i].x, graphArea.x + 26, graphArea.x + graphArea.w - 26);
      NODES[i].y = constrain(NODES[i].y, graphArea.y + 26, graphArea.y + graphArea.h - 26);
    }
    temp *= 0.985;
  }
}

function positionControls() {
  const by = drawHeight + 16;
  colorSel.position(margin + 56, by);
  sizeSel.position(margin + 235, by);
  minSlider.position(margin + 470, by + 4);
  clusterBtn.position(margin + 615, by);
  pathBtn.position(margin + 730, by);
  resetBtn.position(margin + 832, by);
}

function updateCanvasSize() {
  const c = document.querySelector('main');
  if (c) canvasWidth = Math.max(880, Math.floor(c.getBoundingClientRect().width));
}
function windowResized() {
  updateCanvasSize(); resizeCanvas(canvasWidth, canvasHeight);
  layoutGraph(); positionControls();
}

function metricArray(name) {
  if (name === 'Betweenness') return betweenness;
  if (name === 'Clustering coeff.') return clustering;
  return degree;
}

function nodeVisible(i) {
  return degree[i] >= minSlider.value();
}

function nodeRadius(i) {
  const arr = metricArray(sizeSel.value());
  const mx = Math.max(...arr, 0.0001);
  return map(arr[i], 0, mx, 9, 24);
}

function nodeColor(i) {
  if (showClusters) return color(CLUSTER_COLS[cluster[i] % CLUSTER_COLS.length]);
  const mode = colorSel.value();
  if (mode === 'Role') {
    if (NODES[i].role === 'suspect') return color(RED);
    if (NODES[i].role === 'associate') return color(ORANGE);
    return color(GRAY);
  }
  const arr = metricArray(mode);
  const mx = Math.max(...arr, 0.0001);
  const t = arr[i] / mx;
  return lerpColor(color('#2b5070'), color('#5ad1ff'), t);
}

function draw() {
  background(BG);
  noStroke();
  fill('#0b121d'); rect(0, drawHeight, canvasWidth, controlHeight);

  fill(HEAD); textAlign(LEFT, TOP); textSize(20); textStyle(BOLD);
  text('Social Network Analysis — Communication Graph', margin, 10); textStyle(NORMAL);

  drawEdges();
  drawNodes();
  drawPanel();
  drawControlLabels();
}

function drawEdges() {
  for (const [a, b, w] of EDGES) {
    if (!nodeVisible(a) || !nodeVisible(b)) continue;
    const onPath = pathEdge(a, b);
    stroke(onPath ? ORANGE : EDGE);
    strokeWeight(onPath ? 4 : map(w, 1, 5, 1, 4.5));
    line(NODES[a].x, NODES[a].y, NODES[b].x, NODES[b].y);
  }
  noStroke();
}

function pathEdge(a, b) {
  for (let i = 0; i + 1 < pathNodes.length; i++) {
    if ((pathNodes[i] === a && pathNodes[i + 1] === b) ||
        (pathNodes[i] === b && pathNodes[i + 1] === a)) return true;
  }
  return false;
}

function drawNodes() {
  for (let i = 0; i < NODES.length; i++) {
    if (!nodeVisible(i)) continue;
    const r = nodeRadius(i);
    const onPath = pathNodes.includes(i);
    const picked = pathPick.includes(i);
    if (i === selected || picked) {
      noFill(); stroke(picked ? ORANGE : '#ffffff'); strokeWeight(3);
      circle(NODES[i].x, NODES[i].y, r * 2 + 8);
      noStroke();
    }
    fill(nodeColor(i));
    stroke(onPath ? ORANGE : '#0b121d'); strokeWeight(onPath ? 2.5 : 1.5);
    circle(NODES[i].x, NODES[i].y, r * 2);
    noStroke();
    fill(TXT); textAlign(CENTER, TOP); textSize(10.5);
    text(NODES[i].name, NODES[i].x, NODES[i].y + r + 2);
  }
}

function drawControlLabels() {
  fill(SUB); textAlign(LEFT, CENTER); textSize(11);
  const ly = drawHeight + 27;
  text('Color by', margin, ly);
  text('Size by', margin + 183, ly);
  text('Min conn.', margin + 405, ly);
  fill(HEAD); textAlign(LEFT, CENTER); textSize(11);
  text(minSlider.value(), margin + 608, ly);
  fill(SUB); textAlign(LEFT, CENTER); textSize(10.5);
  text(pathMode ? 'Path mode: click two accounts' : '', margin + 470, drawHeight + 44);
}

function drawPanel() {
  const x = graphArea.panelX, y = 40, w = graphArea.panelW, h = drawHeight - 40 - margin;
  fill(PANEL); stroke(PANEL_E); strokeWeight(1); rect(x, y, w, h, 8); noStroke();

  let cy = y + 14;
  // network summary
  fill(HEAD); textAlign(LEFT, TOP); textSize(13); textStyle(BOLD);
  text('Network Summary', x + 12, cy); textStyle(NORMAL); cy += 22;
  fill(SUB); textSize(11.5);
  text('Accounts: ' + NODES.length + '   Links: ' + EDGES.length, x + 12, cy); cy += 18;
  text('Clusters detected: ', x + 12, cy);
  fill(HEAD); textStyle(BOLD); text(nClusters, x + 130, cy); textStyle(NORMAL); cy += 24;

  fill(HEAD); textSize(12.5); textStyle(BOLD);
  text('Top brokers (betweenness)', x + 12, cy); textStyle(NORMAL); cy += 20;
  topBrokers.forEach((idx, r) => {
    fill(ORANGE); textSize(11.5); textStyle(BOLD);
    text((r + 1) + '. ' + NODES[idx].name, x + 16, cy); textStyle(NORMAL);
    fill(SUB); textAlign(RIGHT, TOP);
    text(betweenness[idx].toFixed(3), x + w - 14, cy);
    textAlign(LEFT, TOP);
    cy += 17;
  });
  cy += 8;
  stroke(PANEL_E); line(x + 12, cy, x + w - 12, cy); noStroke(); cy += 12;

  // node detail
  fill(HEAD); textSize(13); textStyle(BOLD);
  text('Account Detail', x + 12, cy); textStyle(NORMAL); cy += 22;
  if (selected >= 0) {
    fill(TXT); textSize(13); textStyle(BOLD);
    text(NODES[selected].name, x + 12, cy); textStyle(NORMAL); cy += 19;
    fill(roleColor(NODES[selected].role)); textSize(11);
    text('Role: ' + NODES[selected].role, x + 12, cy); cy += 18;
    fill(SUB); textSize(11.5);
    text('Degree: ' + degree[selected], x + 12, cy); cy += 16;
    text('Betweenness: ' + betweenness[selected].toFixed(3), x + 12, cy); cy += 16;
    text('Clustering: ' + clustering[selected].toFixed(2), x + 12, cy); cy += 18;
    fill(HEAD); textSize(11.5); textStyle(BOLD);
    text('Connected to:', x + 12, cy); textStyle(NORMAL); cy += 16;
    fill(SUB); textSize(10.8);
    const names = adj[selected].map(n => NODES[n].name);
    text(names.join(', '), x + 12, cy, w - 24);
  } else {
    fill(SUB); textSize(11);
    text('Click an account to see its centrality scores and connections.',
      x + 12, cy, w - 24);
  }
}

function roleColor(role) {
  if (role === 'suspect') return color(RED);
  if (role === 'associate') return color(ORANGE);
  return color(GRAY);
}

function shortestPath(s, t) {
  const N = NODES.length;
  const prev = new Array(N).fill(-1);
  const seen = new Array(N).fill(false);
  const q = [s]; seen[s] = true;
  while (q.length) {
    const v = q.shift();
    if (v === t) break;
    for (const w of adj[v]) if (!seen[w] && nodeVisible(w)) {
      seen[w] = true; prev[w] = v; q.push(w);
    }
  }
  if (!seen[t]) return [];
  const path = []; let cur = t;
  while (cur !== -1) { path.unshift(cur); cur = prev[cur]; }
  return path;
}

function nodeAt(mx, my) {
  for (let i = 0; i < NODES.length; i++) {
    if (!nodeVisible(i)) continue;
    const r = nodeRadius(i);
    if (dist(mx, my, NODES[i].x, NODES[i].y) <= r + 2) return i;
  }
  return -1;
}

function mousePressed() {
  if (mouseY > drawHeight || mouseX > graphArea.panelX) return;
  const hit = nodeAt(mouseX, mouseY);
  if (hit < 0) return;
  if (pathMode) {
    pathPick.push(hit);
    if (pathPick.length === 2) {
      pathNodes = shortestPath(pathPick[0], pathPick[1]);
      selected = hit;
    } else {
      pathNodes = [];
    }
    if (pathPick.length > 2) { pathPick = [hit]; pathNodes = []; }
  } else {
    selected = hit;
    dragging = hit;
  }
}

function mouseDragged() {
  if (dragging >= 0) {
    NODES[dragging].x = constrain(mouseX, graphArea.x + 26, graphArea.x + graphArea.w - 26);
    NODES[dragging].y = constrain(mouseY, graphArea.y + 26, graphArea.y + graphArea.h - 26);
  }
}

function mouseReleased() { dragging = -1; }
