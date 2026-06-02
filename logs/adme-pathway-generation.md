# MicroSim Generation Log — adme-pathway

- **Date:** 2026-06-01
- **Library:** p5.js
- **Chapter:** 9 — Forensic Toxicology and Chemical Analysis
- **Final score:** 98 / A (validate-sims.py; −2 is the expected deduction for required p5 DOM controls)
- **Iframe height:** 517px (CANVAS_HEIGHT 515 + 2)

## Instructional Design Check
- **Bloom level:** Understand (L2)
- **Bloom verb:** Explain
- **Pattern:** Step-through animation — choose a route of administration, play/pause orange "drug molecules" flowing through the four ADME organ stages, and click a stage to read what happens there while a blood-concentration curve builds below.
- **Specification alignment:** Aligned. The spec's four labeled regions (GI/Absorption, Bloodstream/Distribution, Liver/Metabolism, Kidneys+Lungs/Elimination), animated drug molecules, click-to-describe panels, the Drug Type dropdown that changes onset speed, and the concentration-over-time curve are all present. Detection windows (blood/urine/hair) are shown as a reference annotation under the curve.
- **Rationale:** Animating the molecule flow plus the live concentration curve makes the abstract pharmacokinetic pathway concrete, directly supporting the "explain each phase" objective.

## Standardization (microsim-utils)
- main.html rewritten from the placeholder scaffold to the standard p5.js shell (CDN, `<main>` tag, schema meta tag).
- index.md rewritten with full frontmatter (quality_score 98, social image fields), About / How to Use / What You Can Learn / embed iframe / Lesson Plan / References / Specification design note.
- metadata.json fixed (stub was copied from a dementia project): corrected creator → "Forensic Science Intelligent Textbook" and subject list; added educational + pedagogical extension blocks; completion_status → implemented.

## Layout Review (microsim-layout-reviewer)
Cycle 1 FAILs:
- **2.3 / 3.x Element overlap** — the curve's "Blood concentration over time" title sat at the curve-frame top (`y − 22`), which fell inside the bottom edge of the info panel above it. Fixed by moving the curve region down (`y` 240 → 252) to open clear vertical separation between the info panel and the curve title.
- Also simplified an earlier draft's detection-window bands (which collided with the time-axis labels) into a single clean reference text line below the axis.

Cycle 2: re-captured screenshot — overlap resolved; clear separation between info panel and curve. All checklist items PASS (1.x, 2.x, 3.x, 4.x, 6.x). 5.x (chart): the custom-drawn concentration line chart has labeled axes, units, and a moving readout — PASS. Note: the curve/marker animate; the default-load screenshot shows the early-time state, with later states verified by code inspection.

## Status: COMPLETE
