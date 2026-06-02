# MicroSim Generation Log — pcr-amplification-simulator

- **Date:** 2026-06-02
- **Library:** p5.js
- **Chapter:** 8 — Forensic DNA Profiling
- **Final score:** 98 / A (validate-sims.py; −2 is the expected deduction for required p5 DOM controls)
- **Iframe height:** 502px (CANVAS_HEIGHT 500 + 2)

## Instructional Design Check
- **Bloom level:** Understand (L2)
- **Bloom verb:** Explain
- **Pattern:** Step-through animation with prediction. The student advances through the three PCR stages one at a time (or auto-runs cycles) and watches the molecular transformation while concrete data — temperature and copy count — make the process explainable.
- **Specification alignment:** Aligned. Main ~64% molecular view animating two template strands (red, blue) with base-pair bridges; yellow primers; light-purple new-strand synthesis; gray polymerase. Side ~36% panel with a temperature gauge, step label, step description, cycle counter, and a "copies so far" counter. "Next Step" advances Denature (94°C) → Anneal (60°C) → Extend (72°C); "Run Cycle" auto-plays the three steps with a pause; "Run 5 Cycles" shows exponential growth; clicking any DNA component reveals a definition pop-up. Denaturation breaks bridges left-to-right and drifts the strands apart; annealing slides primers in to bind; extension grows the new strand from the primer; completing a cycle doubles the copy count. Color scheme matches the spec.
- **Rationale:** An Understand objective (explain the steps) is served by letting the student predict each stage before revealing it, supported by the temperature and exponential copy-count readouts.

## Standardization (microsim-utils)
- main.html rewritten from the placeholder scaffold to the standard p5.js shell (CDN p5@1.11.10, project schema meta tag `…/ns/microsim/v1`, `<main></main>`, "Back to Documentation" link, script src `pcr-amplification-simulator.js`).
- index.md rewritten with full frontmatter (status built, quality_score 98, social image fields), copy-paste iframe at height 502, About / How to Use / What You Can Learn / Lesson Plan (worked example, guided questions, extension) / References, and a design note clarifying the strands are schematic straight lines (not a true helix) while the temperatures and the doubling rule are accurate.
- metadata.json fixed from the dementia-stub: creator "Forensic Science Intelligent Textbook", DNA/PCR subjects, educational + pedagogical blocks, completion_status → implemented.

## Layout Review (microsim-layout-reviewer)
- Default load (not started, double-stranded DNA): PASS — red/blue template strands joined by gray base-pair bridges, temperature gauge at 25 °C, "Not started" step label with start guidance, Cycles 0 / Copies ×1, four DOM control buttons visible.
- Extension step verified by forcing `stepIdx = 2`, `started = true`, `cycle = 2`, `copies = 4` via sed: yellow primers, light-purple new strands growing from each primer, gray polymerase enzymes on the growing ends, green "3. Extension" label with description, Cycles 2 / Copies ×4. State reverted from /tmp backup (`/tmp/pcr.bak.js`) and the canonical default screenshot recaptured.
- Note: the headless screenshot grabs an early animation frame, so the forced extension capture shows the temperature still interpolating toward 72 °C and the new strands part-grown; in live use the temperature settles and the strand completes. This is animation timing, not a layout defect.
- Controls are real p5 DOM createButtons positioned over the lower control strip; DNA-part definitions handled via canvas mousePressed hit-testing with a pop-up. Checklist 1.x/2.x/3.x/4.x/6.x PASS. 5.x N/A (molecular animation + gauge panel, not an axis chart).

## Status: COMPLETE
