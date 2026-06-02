# MicroSim Generation Log — metadata-timeline-builder

- **Date:** 2026-06-02
- **Library:** p5.js
- **Chapter:** 15 — Digital Forensics and Cybercrime Investigation
- **Final score:** 98 / A (validate-sims.py; −2 is the expected deduction for required p5 DOM controls)
- **Iframe height:** 552px (CANVAS_HEIGHT 550 + 2)

## Instructional Design Check
- **Bloom level:** Apply (L3)
- **Bloom verb:** Apply
- **Pattern:** Hands-on investigative workflow. The student clicks simulated evidence photos to recover EXIF metadata, adds them to a chronological timeline, plots them on a map, and detects time-zone anomalies — applying metadata recovery to build a defensible event sequence rather than viewing facts passively.
- **Specification alignment:** Aligned. Left ~40% file browser with eight clickable photo icons (different timestamps/locations/cameras); right ~60% EXIF readout (Make/Model, Capture Date/Time, GPS Lat/Long, Device Time Zone) with GPS shown in BOTH decimal degrees and DMS; bottom chronological timeline that auto-sorts added photos; "Add to Timeline", "Plot on Map", and "Export Timeline" controls (plus a Clear convenience button); a mini map plotting GPS pins; time-zone inconsistencies highlighted in red. Color scheme matches spec (dark forensic blue background, white panels, green verified data, red anomalies).
- **Rationale:** An Apply objective (extract and use EXIF metadata) is served by letting the student assemble the timeline and confront a planted time-zone anomaly, mirroring the real investigative workflow the spec calls for.

## Standardization (microsim-utils)
- main.html rewritten from the placeholder scaffold to the standard p5.js shell (CDN p5@1.11.10, project schema meta tag `…/ns/microsim/v1`, `<main></main>`, "Back to Documentation" link, script src `metadata-timeline-builder.js`).
- index.md rewritten with full frontmatter (status built, quality_score 98, social image fields), copy-paste iframe at height 552, About / How to Use / What You Can Learn / Lesson Plan (worked example, guided questions, extension) / References, and a design note clarifying the photos/EXIF/GPS are simulated teaching data, the map is a normalized schematic grid, and the anomaly logic compares each photo's device zone to a case home zone.
- metadata.json fixed from the dementia-stub: creator "Forensic Science Intelligent Textbook", digital-forensics/EXIF/timeline subjects, educational + pedagogical blocks, completion_status → implemented.

## Layout Review (microsim-layout-reviewer)
- Default load (first photo selected, empty timeline, EXIF view): PASS — all eight photo icons fit within the browser panel after tightening cell height from 78→68px; EXIF readout shows make/model, green capture date/time, green time zone, decimal + DMS GPS, and a green "Time zone consistent" note; timeline strip prompts the student to add photos; four DOM control buttons visible.
- Anomaly + populated timeline verified by forcing `selected = 3` (IMG_0430, UTC-08:00) and `timeline = [0,2,3,4,6]` via sed: EXIF time zone renders red with the "Time-zone anomaly" warning paragraph; the timeline shows five photos in chronological order with red dots on the two anomalous captures.
- Map view verified by forcing `showMap = true`: numbered pins (1–5 timeline order), red pins on the two anomalies, an open ring around the selected photo, and a legend. State reverted from /tmp backup (`/tmp/mtb.bak.js`) and the canonical default screenshot recaptured.
- Controls are real p5 DOM createButtons positioned over the lower control strip; photo selection handled via canvas mousePressed hit-testing. Checklist 1.x/2.x/3.x/4.x/6.x PASS. 5.x N/A (browser/EXIF/map/timeline panels, not an axis chart).

## Status: COMPLETE
