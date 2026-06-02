# MicroSim Generation Log — handwriting-comparison

- **Date:** 2026-06-02
- **Library:** p5.js
- **Chapter:** 14 — Document Examination and Forgery Detection
- **Final score:** 98 / A (validate-sims.py; −2 is the expected deduction for required p5 DOM controls)
- **Iframe height:** 502px (CANVAS_HEIGHT 500 + 2)

## Instructional Design Check
- **Bloom level:** Remember (L1)
- **Bloom verb:** Identify
- **Pattern:** Clickable annotated comparison with detail panel. Two side-by-side samples (Known Exemplar, Questioned Sample) render the same simulated cursive stroke. A row of six characteristic chips (Line Quality, Slant, Spacing, Letter Formation, Pen Lifts, Baseline) highlights the selected feature on both samples — blue on the exemplar, green (match) or red (differ) on the questioned sample — with a description and a MATCH/DIFFERS badge. A toggle switches the questioned sample between authentic and forged; a magnification slider zooms both samples; selecting Slant shows the measured angle for each sample. A summary tallies matching vs. differing characteristics.
- **Specification alignment:** Aligned. Two side-by-side panels of the same phrase; annotated highlight overlays on click; bottom characteristic list of the six named features; Authentic/Forged toggle (forgery shows tremor and hesitation/pen-lift marks); Magnification slider; quantitative slant angle when Slant is selected; green/red match-difference color coding; "Matching characteristics: N / Differing characteristics: M" summary. Warm cream paper, dark ink, blue characteristic highlight, green/red overlay — all per spec.
- **Substitution:** spec implies rendering an actual written phrase; this implementation uses a **procedurally generated stylized cursive stroke** parameterized by slant/tremor/baseline-wave/loop-spacing/pen-lifts. Reason: a controllable schematic stroke lets each characteristic be isolated and highlighted unambiguously, which serves the L1 "identify" objective better than rendering literal glyphs. Documented in the index.md design note.
- **Rationale:** A Remember objective (identify characteristics) is well served by a labeled visual comparison where each characteristic can be lit up individually before the student performs analysis.

## Standardization (microsim-utils)
- main.html rewritten from the placeholder scaffold to the standard p5.js shell (CDN p5@1.11.10, project schema meta tag `…/ns/microsim/v1`, `<main></main>`, "Back to Documentation" link, script src `handwriting-comparison.js`). Caught and fixed a typo in the schema host (`dmccreais` → `dmccreary`) before screenshotting.
- index.md rewritten with full frontmatter (status built, quality_score 98, social image fields), copy-paste iframe at height 502, About / How to Use / What You Can Learn / Lesson Plan (worked example, guided questions, extension) / References, and a design note about the stylized stroke.
- metadata.json fixed from the dementia-stub: creator "Forensic Science Intelligent Textbook", questioned-document/handwriting subjects, educational + pedagogical blocks, completion_status → implemented.

## Layout Review (microsim-layout-reviewer)
- Default load (authentic, Slant selected): PASS — two cream-paper panels with matching cursive strokes; blue slant marker on the exemplar and green marker on the questioned sample; MATCH badge; slant readout Known 12° / Questioned 11°; summary 6 matching / 0 differing; six chips, toggle button, and Magnification slider all visible.
- Forged state verified by temporarily forcing `forged = true` and `selected = "line"` via sed: questioned sample shows shaky tremor line, pen-lift gaps with hesitation dots, "Line Quality DIFFERS" red badge, summary 1 matching / 5 differing. State reverted from /tmp backup and canonical screenshot recaptured.
- Magnification clip implemented with drawingContext clip + scale around panel center so zoomed strokes stay inside their panels.
- Checklist 1.x/2.x/3.x/4.x/6.x PASS. 5.x N/A (sample comparison, not an axis chart).

## Status: COMPLETE
