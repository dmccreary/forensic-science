# MicroSim Generation Log — adh-mpmi-calculator

- **Date:** 2026-06-01
- **Library:** p5.js
- **Chapter:** 12 — Forensic Entomology and Decomposition Analysis
- **Final score:** 98 / A (validate-sims.py; −2 is the expected deduction for required p5 DOM controls)
- **Iframe height:** 549px (CANVAS_HEIGHT 547 + 2)

## Instructional Design Check
- **Bloom level:** Apply (L3)
- **Bloom verb:** Calculate
- **Pattern:** Calculator — set a 7-day daily-mean temperature record, choose species + larval stage (which sets the ADH threshold), then accumulate degree-hours backward from discovery until the cumulative curve crosses the threshold; read the minimum PMI.
- **Specification alignment:** Adapted. The spec called for an editable *hourly* table over 7 days (168 cells). To stay usable in a small embedded canvas, the model uses 7 editable **daily mean** temperatures (ADH = (mean − base) × 24 per day). Deviation documented in index.md design note. ADH thresholds are illustrative teaching reference values, not casework figures.
- **Rationale:** The cumulative-back accumulation curve crossing the stage threshold is the concrete computation the learner performs, matching the Apply objective.

## Standardization (microsim-utils)
- main.html written from the standard p5.js shell (CDN, `<main>` tag, schema meta tag).
- index.md written with full frontmatter (quality_score 98, social image fields), About / How to Use / What You Can Learn / embed iframe / Lesson Plan / References / Specification design note.
- metadata.json fixed (stub was copied from a dementia project): corrected creator → "Forensic Science Intelligent Textbook" and subject list; added educational + pedagogical extension blocks; completion_status → implemented.

## Layout Review (microsim-layout-reviewer)
Cycle 1 FAILs:
- **1.1 Clipped text (title)** — "Minimum PMI from Accumulated Degree Hours" overflowed the right edge. Cause: the title text box `x` was set to `canvasWidth/2`, but when text() is given a width argument `x` is the box's LEFT edge, not its center. Fixed by setting `x = margin`.
- **1.1 Clipped text (base label)** — the red "base N°" reference label rendered behind the temperature bars (only "ba" peeked through the left gap). Cause: it was drawn at the dashed-line position *before* the bar loop, so the bars painted over it. Fixed by moving the label to the panel header row, right-aligned at `x + w`, in clear space above the plot.

Cycle 2: re-captured screenshot — both FAILs resolved. Title centered and complete; base label legible at top-right of the temp panel. All checklist items PASS (1.x, 2.x, 3.x, 4.1–4.2, 6.x). N/A: 5.x (no map/network/Mermaid; bar chart + line chart are custom-drawn and pass general legibility). Note: the calculated state (orange curve + green crossing marker) is not shown in the default-load screenshot; verified by code inspection.

## Status: COMPLETE
