// Landmark Crash Investigations Timeline - vis-timeline
// CANVAS_HEIGHT: 605
// Bloom Level: Remember (L1) - identify landmark aircraft accident investigations and
// the forensic advance each produced. Students hover for a one-line summary and click any
// milestone to read the investigation's key finding and the technique it advanced.

// ---- Event data ----------------------------------------------------------
// era keys map to forensic-lesson themes and to CSS classes
// (era-structural, era-human, era-security, era-recorders).
const EVENTS = [
  {
    year: 1954, display: '1954', era: 'structural',
    title: "de Havilland Comet breakups",
    summary: "Metal fatigue from square windows downs the first jetliner.",
    body: "The world's first commercial jetliner suffered in-flight breakups traced to metal fatigue cracking from the corners of its near-square windows. The finding gave every later airliner its rounded windows and launched the science of airframe fatigue testing.",
    xref: "See this chapter — Metallurgical Failure Analysis"
  },
  {
    year: 1977, display: '1977', era: 'human',
    title: "Tenerife runway collision",
    summary: "Two 747s collide in fog — the deadliest accident in aviation.",
    body: "Two Boeing 747s collided on a fog-bound runway after a breakdown in cockpit communication and crew decision-making. The disaster catalyzed Crew Resource Management (CRM) training, a cornerstone of modern human-factors analysis.",
    xref: "See this chapter — Human Factors Analysis"
  },
  {
    year: 1988, display: '1988', era: 'structural',
    title: "Aloha Airlines Flight 243",
    summary: "An aging fuselage tears open in flight.",
    body: "A large section of upper fuselage tore away in flight. Investigators found that years of metal fatigue, accelerated by salt-air corrosion and frequent short pressurization cycles, had weakened the skin. The case reshaped aging-aircraft inspection programs.",
    xref: "See this chapter — Fatigue vs. Overload Fracture"
  },
  {
    year: 1988, display: '1988', era: 'security',
    title: "Pan Am Flight 103 (Lockerbie)",
    summary: "Reconstruction reveals an in-flight bomb.",
    body: "After the aircraft broke up over Lockerbie, investigators reassembled the forward fuselage and found metal petalled and pitted outward — the signature of an explosion inside the aircraft. Wreckage reconstruction and explosive-residue analysis identified a bomb.",
    xref: "See this chapter — Wreckage Reconstruction; In-Flight Explosion Patterns"
  },
  {
    year: 1989, display: '1989', era: 'structural',
    title: "United Flight 232 (Sioux City)",
    summary: "A fan-disk fatigue crack severs the hydraulics.",
    body: "A fatigue fracture in an engine fan disk destroyed all three hydraulic systems. Metallurgical analysis of the disk advanced engine-component inspection and drove redundant hydraulic-system design.",
    xref: "See this chapter — Metallurgical Failure Analysis"
  },
  {
    year: 1996, display: '1996', era: 'security',
    title: "TWA Flight 800",
    summary: "Seabed recovery and hangar reconstruction settle the cause.",
    body: "After the aircraft exploded off New York, the NTSB recovered wreckage from the seabed and rebuilt a large section in a hangar. The reconstruction supported a center-fuel-tank explosion over the early missile and bomb theories, and led to fuel-tank inerting rules.",
    xref: "See this chapter — Wreckage Reconstruction"
  },
  {
    year: 2009, display: '2009', era: 'recorders',
    title: "Air France Flight 447",
    summary: "Deep-ocean recorder recovery reshapes beacon rules.",
    body: "The aircraft fell into the Atlantic and its recorders were not found until 2011 — after the locator-beacon batteries had died. The case drove an international standard for longer-lasting (about 90-day) underwater locator beacons.",
    xref: "See this chapter — Flight Recorders; Underwater Locator Beacon"
  },
  {
    year: 2009, display: '2009', era: 'human',
    title: "Colgan Air Flight 3407",
    summary: "Crew fatigue and training prompt new U.S. rules.",
    body: "An approach-phase loss of control was tied to crew fatigue, training, and response to a stall warning. The investigation led to U.S. changes in pilot rest requirements and qualification standards.",
    xref: "See this chapter — Human Factors Analysis"
  }
];

// Forensic-lesson themes (used as filter buttons and item colors).
const ERAS = [
  { key: 'structural', color: '#cfe2f3', label: 'Structural & metallurgical failure' },
  { key: 'human',      color: '#d5efd5', label: 'Human factors & crew performance' },
  { key: 'security',   color: '#e6d6f0', label: 'Explosion, fire & reconstruction' },
  { key: 'recorders',  color: '#fce3c4', label: 'Flight recorders & recovery' }
];

let timeline, dataset, allItems, currentFilter = 'all';

document.addEventListener('DOMContentLoaded', function () {
  buildFilterButtons();

  allItems = EVENTS.map(function (e, i) {
    return {
      id: i,
      content: '<b>' + e.display + '</b>  ' + shortHeadline(e.title),
      start: new Date(e.year, 0, 1),
      className: 'era-' + e.era,
      title: e.display + ' — ' + e.summary,
      era: e.era,
      data: e
    };
  });

  dataset = new vis.DataSet(allItems);

  const container = document.getElementById('timeline');
  const options = {
    width: '100%',
    height: '330px',
    orientation: 'top',
    margin: { item: { horizontal: 40, vertical: 8 }, axis: 30 },
    zoomMin: 1000 * 60 * 60 * 24 * 365 * 2,      // 2 years
    zoomMax: 1000 * 60 * 60 * 24 * 365 * 120,    // ~120 years
    min: new Date(1940, 0, 1),
    max: new Date(2030, 0, 1),
    stack: true,
    selectable: true,
    showCurrentTime: false,
    moveable: true,
    zoomable: false,   // wheel zoom disabled; use +/- buttons (prevents page-scroll hijack)
    align: 'center',
    tooltip: { followMouse: true }
  };

  timeline = new vis.Timeline(container, dataset, options);

  // Prevent scroll hijacking: vertical wheel scrolls the page; horizontal pans.
  container.addEventListener('wheel', function (e) {
    const isHorizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY);
    if (!isHorizontal) {
      e.stopImmediatePropagation();
    } else {
      e.preventDefault();
      const win = timeline.getWindow();
      const interval = win.end - win.start;
      const shift = (e.deltaX / container.clientWidth) * interval;
      timeline.setWindow(new Date(win.start.valueOf() + shift),
                         new Date(win.end.valueOf() + shift), { animation: false });
    }
  }, true);

  fitAll();

  timeline.on('select', function (props) {
    if (props.items.length > 0) showDetails(props.items[0]);
  });

  document.getElementById('btn-zoom-in').onclick  = function () { timeline.zoomIn(0.5); };
  document.getElementById('btn-zoom-out').onclick = function () { timeline.zoomOut(0.5); };
  document.getElementById('btn-left').onclick      = function () { pan(-0.3); };
  document.getElementById('btn-right').onclick     = function () { pan(0.3); };
  document.getElementById('btn-fit').onclick       = fitAll;
});

function shortHeadline(t) {
  return t.length > 24 ? t.slice(0, 23) + '…' : t;
}

function pan(fraction) {
  const win = timeline.getWindow();
  const interval = win.end - win.start;
  const shift = interval * fraction;
  timeline.setWindow(new Date(win.start.valueOf() + shift),
                     new Date(win.end.valueOf() + shift), { animation: true });
}

function fitAll() {
  const ts = allItems.map(function (i) { return i.start.getTime(); });
  const minD = Math.min.apply(null, ts), maxD = Math.max.apply(null, ts);
  const year = 365 * 24 * 60 * 60 * 1000;
  timeline.setWindow(new Date(minD - 6 * year), new Date(maxD + 6 * year), { animation: true });
}

function buildFilterButtons() {
  const wrap = document.getElementById('era-filters');
  const makeBtn = function (key, label, color) {
    const b = document.createElement('button');
    b.textContent = label;
    b.dataset.era = key;
    if (color) b.style.background = color;   // theme buttons carry the theme color
    if (key === 'all') b.classList.add('active');
    b.onclick = function () { filterEra(key, b); };
    wrap.appendChild(b);
  };
  makeBtn('all', 'All themes');
  ERAS.forEach(function (era) { makeBtn(era.key, era.label, era.color); });
}

function filterEra(key, btn) {
  currentFilter = key;
  document.querySelectorAll('#era-filters button').forEach(function (b) { b.classList.remove('active'); });
  btn.classList.add('active');
  const filtered = (key === 'all') ? allItems : allItems.filter(function (i) { return i.era === key; });
  dataset.clear();
  dataset.add(filtered);
  fitAll();
}

function showDetails(id) {
  const e = allItems[id].data;
  const era = ERAS.find(function (x) { return x.key === e.era; });
  const details = document.getElementById('details');
  details.innerHTML =
    '<span class="era-label" style="background:' + era.color + '">' + era.label + '</span>' +
    '<h2>' + e.display + ' — ' + e.title + '</h2>' +
    '<div>' + e.body + '</div>' +
    '<span class="xref">→ ' + e.xref + '</span>';
}
