# MicroSim Generation Log — soil-analysis-dashboard

- **Date:** 2026-06-02
- **Library:** p5.js
- **Chapter:** 5 — Glass, Soil, and Physical Trace Evidence
- **Final score:** 98 / A (validate-sims.py; −2 is the expected deduction for required p5 DOM controls)
- **Iframe height:** 602px (CANVAS_HEIGHT 600 + 2)

## Instructional Design Check
- **Bloom level:** Analyze (L4)
- **Bloom verb:** Compare
- **Pattern:** Four-panel comparison dashboard with simultaneous multi-criteria display, click-to-compare selection, and a computed match score. The learner views all the data at once, picks the best-matching reference, and synthesizes a conclusion — exactly what an Analyze/compare objective needs.
- **Specification alignment:** Aligned (spec type: infographic). 2x2 dashboard with the four required criteria — Munsell color swatches, gravel/sand/silt/clay particle-size bar chart, pH bar with an acid→neutral→base gradient, and density-gradient tube bands. Questioned + References A/B/C as columns. Click a reference column to highlight it across all panels; "Match Score" computes weighted similarity (color distance, pH diff, particle overlap, band match); per-panel hover tooltips explain forensic significance; "New Case" loads a second scenario. Gradient bands of the selected reference are outlined green (align with Questioned) / red (no match). Earthy color scheme, blue pH scale, distinct band colors — matches the spec.
- **Rationale:** Comparing multiple samples across multiple criteria simultaneously is precisely the dashboard pattern the spec argues for.

## Standardization (microsim-utils)
- main.html rewritten from the placeholder scaffold to the standard p5.js shell (CDN p5@1.11.10, project schema meta tag `…/ns/microsim/v1`, `<main></main>`, "Back to Documentation" link, script src `soil-analysis-dashboard.js`).
- index.md rewritten with full frontmatter (status built, quality_score 98, social image fields), copy-paste iframe at height 602, About / How to Use / What You Can Learn / Lesson Plan (worked example, guided questions, extension) / References, plus a design note clarifying the samples are illustrative teaching data and real soil comparison uses many more properties.
- metadata.json fixed from the dementia-stub: creator "Forensic Science Intelligent Textbook", trace-evidence/soil/geology subjects, educational + pedagogical blocks, completion_status → implemented.

## Default scenario (Case 1)
- Questioned = suspect's boots (10YR 3/2, clay-rich, pH 6.4, 4 bands).
- Reference A = distant/different geology (sandy, pH 7.8) → low score (~48%), mostly red bands.
- Reference B = nearby/similar geology (intermediate) → mid score.
- Reference C = exact collection location (near-identical) → high score, all bands green. Default selected = C.
- A "New Case" (Case 2, shovel residue) swaps in a fresh questioned sample and references.

## Layout fix
- Initial canonical capture clipped the 4th column (Reference C) and the right-aligned comparison/score text because `updateCanvasSize()` floored canvasWidth at 880 while the headless screenshot viewport is 800px wide. Lowered the floor to 800 (matching the other sims) so the full 4-column dashboard fits inside the 800px canonical screenshot; layout is computed from canvasWidth so it still scales up on wider containers.

## Layout Review (microsim-layout-reviewer)
- Default load (Reference C selected, score not yet shown): PASS — four panels render with Q (orange) and C (blue) highlighted; color swatches with Munsell codes; stacked particle bars with % labels and a Gravel/Sand/Silt/Clay legend; pH gradient with four labelled markers (Q 6.4 … A 7.8); four gradient tubes with C's bands outlined green (all align with Questioned).
- Verified states by temporarily forcing `selected=1; showScore=true` in setup: PASS — header shows "Comparing Questioned vs Reference A" and "Match Score: 48%" in red; A highlighted across panels; A's gradient bands show one green (h≈0.85 aligns) and the rest red; pH marker for A sits far to the base side. Temporary code removed (restored from `/tmp/soil.bak.js`) and canonical screenshot recaptured.
- Controls: real p5 DOM createButtons (Match Score, New Case); reference selection handled via canvas mousePressed column hit-testing; per-panel hover tooltips drawn on canvas. Checklist 1.x/2.x/3.x/4.x/6.x PASS. 5.x partial — the pH panel and particle bars have labeled scales/values though this is primarily a comparison infographic, not a single axis chart.

## Status: COMPLETE
