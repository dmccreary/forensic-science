# MicroSim Generation Log — area-of-origin-stringing

- **Date:** 2026-06-01
- **Library:** p5.js
- **Chapter:** 7 — Bloodstain Pattern Analysis
- **Final score:** 98 / A (validate-sims.py; −2 is the expected deduction for required p5 DOM controls)
- **Iframe height:** 502px (CANVAS_HEIGHT 500 + 2)

## Instructional Design Check
- **Bloom level:** Apply (L3)
- **Bloom verb:** Apply
- **Pattern:** Build-up construction — click stains for measurements, Add String to project each stain back at its angle of impact, Find Intersection to reveal the 3D convergence zone, and a Source-height slider to watch the geometry respond.
- **Specification alignment:** Aligned (with one documented simplification). A pseudo-3D room (floor + two walls + grid), five floor stains with directional arrows, orange strings, a green convergence zone, per-stain angle/width/length readouts, and the source's (x, y, z) coordinates are all present; default convergence sits at ~1.2 m (a standing adult). Per the design note, per-stain angle sliders were replaced by a single Source-height control so the five strings still converge cleanly for teaching.
- **Rationale:** The Apply objective (determine a 3D area of origin) requires combining multiple spatial data points; the interactive string model makes that convergence geometry tangible.

## Standardization (microsim-utils)
- main.html rewritten from the placeholder scaffold to the standard p5.js shell.
- index.md rewritten with full frontmatter (quality_score 98, social image fields) and all standard sections, including a design note on the projection and the source-height simplification; cross-links to the Angle-of-Impact Calculator.
- metadata.json fixed (placeholder creator/subject): corrected to "Forensic Science Intelligent Textbook" + BPA subjects; added educational + pedagogical blocks; completion_status → implemented.

## Layout Review (microsim-layout-reviewer)
- Default load (no strings): PASS — title centered; axonometric room with floor grid, two walls, and five stains with directional arrows render clearly; "Click a stain" info panel and all controls legible.
- Strings + convergence state verified by temporarily forcing `stringsAdded = 5`, `showConvergence = true`, `selected = 2`: all five orange strings converge on the green source marker; source label "(1.5, 1.3, 1.2) m", dashed drop-line to floor, selection ring, and the Stain #3 data panel (θ = 53.0°, matching arcsin of W/L) all legible with no overlap.
- State variables restored to defaults; canonical screenshot recaptured.
- Checklist 1.x/2.x/3.x/4.x/6.x PASS. 5.x N/A (3D scene, not an axis chart).

## Status: COMPLETE
