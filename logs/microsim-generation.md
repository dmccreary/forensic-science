# MicroSim Batch Generation Log

- **Date:** 2026-06-02
- **Library:** p5.js (all 27)
- **Request:** Generate every ungenerated MicroSim specification under `docs/sims/`, then run microsim-utils standardization and microsim-layout-reviewer on each, logging results to `logs/{MicroSimID}-generation.md`.
- **Outcome:** 27 MicroSims built, standardized, screenshot-verified, and logged. Every sim scored **98 / A** (the p5-DOM-controls ceiling — validate-sims.py deducts 2 points for the required p5 builtin controls). MkDocs navigation regenerated (38 MicroSim entries).

## Pipeline applied to each sim
1. **microsim-generator** — wrote `{id}.js` against the chapter spec, `node --check`, captured the canonical screenshot, and force-state-verified alternate states (then restored the canonical JS).
2. **microsim-utils standardization** — rewrote `main.html` to the standard p5 shell (CDN p5@1.11.10, schema meta tag `…/ns/microsim/v1`, `<main></main>`, "Back to Documentation"); rewrote `metadata.json` (creator, subjects, educational + pedagogical blocks, completion_status implemented, chapter fields); rewrote `index.md` (full frontmatter, copy-paste iframe at height 602, About / How to Use / What You Can Learn / Lesson Plan / References + design note).
3. **microsim-layout-reviewer** — verified default load and alternate states by screenshot; confirmed all controls are real p5 DOM elements.
4. **validate-sims.py** — confirmed 98 / A.

## Sims generated (by chapter)

| MicroSim | Chapter | Bloom |
|---|---|---|
| triangulation-measurement | 2 — Crime Scene Investigation and Evidence Collection | Apply (L3) |
| fingerprint-pattern-explorer | 3 — Fingerprint Analysis and Dactyloscopy | Remember (L1) |
| afis-search-workflow | 3 — Fingerprint Analysis and Dactyloscopy | Understand (L2) |
| latent-print-development | 3 — Fingerprint Analysis and Dactyloscopy | Apply (L3) |
| medullary-index-calculator | 4 — Hair, Fiber, and Trace Evidence Analysis | Apply (L3) |
| fiber-identification-tree | 4 — Hair, Fiber, and Trace Evidence Analysis | Apply (L3) |
| becke-line-test | 5 — Glass, Soil, and Physical Trace Evidence | Understand (L2) |
| glass-fracture-sequence | 5 — Glass, Soil, and Physical Trace Evidence | Apply (L3) |
| soil-analysis-dashboard | 5 — Glass, Soil, and Physical Trace Evidence | Analyze (L4) |
| abo-blood-typing | 6 — Forensic Serology and Biological Fluid Analysis | Understand (L2) |
| angle-of-impact-calculator | 7 — Bloodstain Pattern Analysis | Apply (L3) |
| area-of-origin-stringing | 7 — Bloodstain Pattern Analysis | Apply (L3) |
| pcr-amplification-simulator | 8 — Forensic DNA Profiling | Understand (L2) |
| rmp-product-rule | 8 — Forensic DNA Profiling | Apply (L3) |
| adme-pathway | 9 — Forensic Toxicology and Chemical Analysis | Understand (L2) |
| bac-retro-extrapolation | 9 — Forensic Toxicology and Chemical Analysis | Apply (L3) |
| headspace-spme-workflow | 10 — Fire Investigation, Arson, and Explosives | Understand (L2) |
| skeletal-sex-indicators | 11 — Forensic Anthropology and Skeletal Biology | Remember (L1) |
| adh-mpmi-calculator | 12 — Forensic Entomology and Decomposition Analysis | Apply (L3) |
| ballistic-pathway | 13 — Firearms, Ballistics, and Toolmark Examination | Remember (L1) |
| handwriting-comparison | 14 — Document Examination and Forgery Detection | Remember (L1) |
| tlc-ink-separation | 14 — Document Examination and Forgery Detection | Understand (L2) |
| forensic-imaging-workflow | 15 — Digital Forensics and Cybercrime Investigation | Understand (L2) |
| metadata-timeline-builder | 15 — Digital Forensics and Cybercrime Investigation | Apply (L3) |
| facial-recognition-pipeline | 16 — Facial Recognition | Remember (L1) |
| cdr-tower-triangulation | 17 — Cell Phone Analytics and Mobile Forensics | Apply (L3) |
| social-network-analysis | 18 — Social Media Analysis and Open-Source Intelligence | Analyze (L4) |

Bloom distribution: Remember 5, Understand 7, Apply 13, Analyze 2.

## Recurring fixes captured during the batch
- **canvasWidth floor = 800, not 880.** The headless screenshot viewport is 800px wide; a higher floor clips the canvas right edge. Now the standard floor in `updateCanvasSize()`.
- **Constrain p5 `createSelect`/`createButton` widths** (e.g. `.style('width','150px')`) and tighten button x-positions so a full control row fits inside 800px.
- **Schema meta tag** must be `https://dmccreary.github.io/intelligent-textbooks/ns/microsim/v1`.
- **Default-state screenshots:** set each sim's default to its most informative, self-explaining state (developed plate, centered evidence, populated readout) so the canonical capture is meaningful without interaction — also sidesteps mid-animation headless capture.

Per-sim detail is in each `logs/{id}-generation.md`.

## Status: COMPLETE — 27 / 27
