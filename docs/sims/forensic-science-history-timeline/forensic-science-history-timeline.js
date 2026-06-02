// Interactive Timeline of Forensic Science History - vis-timeline
// CANVAS_HEIGHT: 605
// Bloom Level: Remember (L1) - identify and recall key milestones in forensic science history.
// Students hover for a one-line summary, click any milestone to read its full
// significance and a cross-reference to the chapter where it is covered in depth.

// ---- Event data ----------------------------------------------------------
// era keys map to CSS classes (era-gray, era-blue, era-green, era-purple, era-orange)
// and to legend labels defined below.
const EVENTS = [
  {
    year: 700, display: '~700 CE', era: 'gray',
    title: "Sung Tz'u, \"The Washing Away of Wrongs\"",
    summary: "World's earliest forensic manual, written in China.",
    body: "Sung Tz'u documented methods for distinguishing drowning, strangulation, and murder — the world's earliest known forensic text. It even described using insect activity to help determine cause of death.",
    xref: "See Chapter 12 (Forensic Entomology)"
  },
  {
    year: 1248, display: '1248', era: 'gray',
    title: "First documented forensic entomology case",
    summary: "Blowflies reveal a hidden murder weapon.",
    body: "A Chinese magistrate identified a murderer's sickle by observing which implement attracted blowflies drawn to invisible traces of blood — the first recorded use of insect behavior to solve a crime.",
    xref: "See Chapter 12 (Forensic Entomology)"
  },
  {
    year: 1835, display: '1835', era: 'gray',
    title: "Henry Goddard, bullet comparison",
    summary: "First recorded forensic ballistics analysis.",
    body: "Scotland Yard detective Henry Goddard compared bullet mold marks to link a bullet to its mold — a precursor to modern firearms and toolmark examination.",
    xref: "See Chapter 13 (Firearms and Ballistics)"
  },
  {
    year: 1877, display: '1877', era: 'gray',
    title: "Fingerprints for identity verification",
    summary: "William Herschel uses prints to verify identity.",
    body: "Working in colonial India, William Herschel began requiring fingerprints on contracts, establishing that an individual's friction-ridge patterns remain stable over a lifetime.",
    xref: "See Chapter 3 (Fingerprint Analysis)"
  },
  {
    year: 1892, display: '1892', era: 'gray',
    title: "Francis Galton, \"Finger Prints\"",
    summary: "First scientific proof of fingerprint uniqueness.",
    body: "Francis Galton's book provided the first rigorous scientific study proving fingerprints are unique and persistent, laying the foundation for modern dactyloscopy (fingerprint identification).",
    xref: "See Chapter 3 (Fingerprint Analysis)"
  },
  {
    year: 1901, display: '1901', era: 'blue',
    title: "ABO blood group system discovered",
    summary: "Karl Landsteiner opens the door to forensic serology.",
    body: "Karl Landsteiner's discovery of the ABO blood groups made it possible to classify bloodstains, turning blood grouping into a standard investigative tool and launching forensic serology.",
    xref: "See Chapter 6 (Forensic Serology)"
  },
  {
    year: 1910, display: '1910', era: 'blue',
    title: "Edmond Locard establishes the first crime lab",
    summary: "Locard formalizes the Exchange Principle in Lyon, France.",
    body: "In Lyon, France, Edmond Locard opened the first forensic laboratory and formalized the Exchange Principle bearing his name — \"every contact leaves a trace\" — creating the template for modern crime labs.",
    xref: "Covered in this chapter (Chapter 1)"
  },
  {
    year: 1923, display: '1923', era: 'blue',
    title: "Frye v. United States",
    summary: "Establishes the \"general acceptance\" admissibility standard.",
    body: "This federal appeals court ruling held that scientific testimony is admissible only if the method is \"generally accepted\" in its field. The Frye standard governed many U.S. courts for seventy years.",
    xref: "Covered in this chapter (Chapter 1)"
  },
  {
    year: 1984, display: '1984', era: 'purple',
    title: "Colin Pitchfork case — first DNA conviction",
    summary: "Alec Jeffreys' DNA profiling solves a double murder.",
    body: "Geneticist Alec Jeffreys' DNA fingerprinting first exonerated an innocent suspect and then identified Colin Pitchfork — the first criminal conviction obtained through DNA evidence, revolutionizing forensic biology.",
    xref: "See Chapter 8 (Forensic DNA Profiling)"
  },
  {
    year: 1993, display: '1993', era: 'purple',
    title: "Daubert v. Merrell Dow Pharmaceuticals",
    summary: "Supreme Court replaces Frye with a reliability test.",
    body: "The U.S. Supreme Court replaced the Frye standard in federal courts with a flexible, reliability-based \"gatekeeper\" test, directing judges to weigh testability, peer review, error rates, and acceptance.",
    xref: "Covered in this chapter (Chapter 1)"
  },
  {
    year: 2009, display: '2009', era: 'orange',
    title: "NAS Report on Forensic Science",
    summary: "National Academy of Sciences calls for reform.",
    body: "The National Academy of Sciences documented serious weaknesses across many forensic disciplines, finding that several lacked rigorous scientific validation, and called for major reform of the field.",
    xref: "Themes revisited throughout the book"
  },
  {
    year: 2016, display: '2016', era: 'orange',
    title: "PCAST Report",
    summary: "Calls for empirical validation of comparison methods.",
    body: "The President's Council of Advisors on Science and Technology urged that forensic feature-comparison methods (such as bite marks and firearms) be supported by rigorous empirical studies of their accuracy and error rates.",
    xref: "Themes revisited throughout the book"
  },
  {
    year: 2024, display: '2024+', era: 'orange',
    title: "AI-assisted forensic analysis",
    summary: "Machine learning enters modern forensic workflows.",
    body: "Machine-learning tools began assisting with DNA mixture interpretation, facial recognition, and digital evidence recovery — powerful but requiring careful validation before courtroom use.",
    xref: "See Chapters 16–18 (Facial Recognition, Cell Phone Analytics, Social Media OSINT)"
  }
];

// Legend: 5 conceptual eras shown with their historical date ranges.
const ERAS = [
  { key: 'gray',   color: '#d6d8db', label: 'Pre-laboratory era (pre-1900)' },
  { key: 'blue',   color: '#cfe2f3', label: 'Foundations of modern forensics (1900–1950)' },
  { key: 'green',  color: '#d5efd5', label: 'Scientific & legal maturation (1950–1984)' },
  { key: 'purple', color: '#e6d6f0', label: 'DNA revolution (1984–2009)' },
  { key: 'orange', color: '#fce3c4', label: 'Reform & digital era (2009–present)' }
];

let timeline, dataset, allItems, currentFilter = 'all';

document.addEventListener('DOMContentLoaded', function () {
  buildLegend();
  buildFilterButtons();

  // Build timeline items. content shows the year + headline; title is the hover tooltip.
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
    zoomMin: 1000 * 60 * 60 * 24 * 365 * 5,      // 5 years
    zoomMax: 1000 * 60 * 60 * 24 * 365 * 1600,   // ~1600 years (covers full span)
    min: new Date(500, 0, 1),
    max: new Date(2100, 0, 1),   // must sit well past the right window bound, else it silently clamps it
    stack: true,
    selectable: true,
    showCurrentTime: false,
    moveable: true,
    zoomable: false,   // wheel zoom disabled; use +/- buttons (prevents page-scroll hijack)
    align: 'center',   // center labels on their date so the last item does not clip the right edge
    tooltip: { followMouse: true }
  };

  timeline = new vis.Timeline(container, dataset, options);

  // Prevent scroll hijacking: let vertical wheel scroll the page; horizontal pans.
  container.addEventListener('wheel', function (e) {
    const isHorizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY);
    if (!isHorizontal) {
      e.stopImmediatePropagation();   // block vis; do NOT preventDefault (page scrolls)
    } else {
      e.preventDefault();
      const win = timeline.getWindow();
      const interval = win.end - win.start;
      const shift = (e.deltaX / container.clientWidth) * interval;
      timeline.setWindow(new Date(win.start.valueOf() + shift),
                         new Date(win.end.valueOf() + shift), { animation: false });
    }
  }, true);

  // Default view focuses on the dense modern cluster; ancient milestones are a pan away.
  timeline.setWindow(new Date(1795, 0, 1), new Date(2068, 0, 1), { animation: false });

  timeline.on('select', function (props) {
    if (props.items.length > 0) showDetails(props.items[0]);
  });

  // Wire navigation buttons
  document.getElementById('btn-zoom-in').onclick  = function () { timeline.zoomIn(0.5); };
  document.getElementById('btn-zoom-out').onclick = function () { timeline.zoomOut(0.5); };
  document.getElementById('btn-left').onclick      = function () { pan(-0.3); };
  document.getElementById('btn-right').onclick     = function () { pan(0.3); };
  document.getElementById('btn-fit').onclick       = fitAll;
});

function shortHeadline(t) {
  // Keep timeline labels compact so boxes do not clip the container edges;
  // the full headline always shows in the detail panel on click.
  return t.length > 22 ? t.slice(0, 21) + '…' : t;
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
  // generous padding so centered labels on the first/last items are not clipped
  timeline.setWindow(new Date(minD - 90 * year), new Date(maxD + 90 * year), { animation: true });
}

function buildLegend() {
  const legend = document.getElementById('legend');
  ERAS.forEach(function (era) {
    const item = document.createElement('span');
    item.className = 'legend-item';
    item.innerHTML = '<span class="legend-swatch" style="background:' + era.color + '"></span>' + era.label;
    legend.appendChild(item);
  });
}

function buildFilterButtons() {
  const wrap = document.getElementById('era-filters');
  const makeBtn = function (key, label) {
    const b = document.createElement('button');
    b.textContent = label;
    b.dataset.era = key;
    if (key === 'all') b.classList.add('active');
    b.onclick = function () { filterEra(key, b); };
    wrap.appendChild(b);
  };
  makeBtn('all', 'All eras');
  ERAS.forEach(function (era) { makeBtn(era.key, era.label.split(' (')[0]); });
}

function filterEra(key, btn) {
  currentFilter = key;
  document.querySelectorAll('#era-filters button').forEach(function (b) { b.classList.remove('active'); });
  btn.classList.add('active');
  const filtered = (key === 'all') ? allItems : allItems.filter(function (i) { return i.era === key; });
  dataset.clear();
  dataset.add(filtered);
  if (key === 'all') {
    timeline.setWindow(new Date(1795, 0, 1), new Date(2068, 0, 1), { animation: true });
  } else {
    fitAll();
  }
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
