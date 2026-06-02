# MicroSim Generation Log — bac-retro-extrapolation

- **Date:** 2026-06-01
- **Library:** p5.js
- **Chapter:** 9 — Forensic Toxicology and Chemical Analysis
- **Final score:** 98 / A (validate-sims.py; −2 is the expected deduction for required p5 DOM controls)
- **Iframe height:** 517px (CANVAS_HEIGHT 515 + 2)

## Instructional Design Check
- **Bloom level:** Apply (L3)
- **Bloom verb:** Calculate
- **Pattern:** Calculator + live graph. Left panel shows each step of the Widmark peak-BAC calculation; right panel graphs BAC over time with a dashed 0.08% legal limit, red over-limit shading, a yellow blood-draw point, and a draggable gray event-time marker. Pressing Calculate reveals the retro-extrapolation arithmetic and the BAC at the event time, colored red when over the limit.
- **Specification alignment:** Aligned (with one documented simplification). Widmark peak BAC = A/(W×1000×r)×100 with A = drinks×14 g and classic r-values (0.68 male, 0.55 female); linear zero-order elimination with adjustable β (0.010–0.025); optional pre-peak absorption ramp via checkbox. Per the design note, the event time is set by dragging the marker on the graph rather than with a separate slider. Numbers are illustrative for teaching, not casework.
- **Rationale:** The Apply objective (compute peak BAC and retro-extrapolate to an earlier time) requires students to chain two calculations; the live graph makes visible why a sub-limit BAC at draw can still imply an over-limit BAC earlier.

## Bug Fixed During Generation
- **Symptom:** Canvas draw region rendered blank white; only DOM controls visible. `node --check` passed, no `window.onerror` fired.
- **Root cause:** The state-builder function was named `model()`, which collides with p5.js's reserved global `model()` (a WEBGL 3D transform). In global mode p5 overwrites the sketch's `model` with its own when it instantiates on DOMContentLoaded, so `draw()`'s `model()` call hit p5's version, which throws "model() is only supported in WEBGL mode." The throw happened before the first `background`/`rect`, leaving the canvas transparent and `frameCount` stuck at 0.
- **Diagnosis method:** An instrumented harness probed `frameCount` (0), `isLooping()` (true), and forced `redraw()`, which surfaced the WEBGL error string.
- **Fix:** Renamed `model()` → `bacModel()` (definition + the one call site in `draw()`).
- **Lesson:** Avoid p5 reserved global names for sketch-level functions/vars (`model` among them).

## Standardization (microsim-utils)
- main.html uses the standard p5.js shell (CDN p5@1.11.10, schema meta tag, `<main></main>`, "Back to Documentation" link).
- index.md has full frontmatter (quality_score 98, social image fields) and all standard sections, including a worked example and a design note. Formulas use inline-code (this project loads no MathJax/KaTeX, so `$` does not render).
- metadata.json: creator "Forensic Science Intelligent Textbook", forensic-toxicology subjects, educational + pedagogical blocks, completion_status → implemented.

## Layout Review (microsim-layout-reviewer)
- Default load: PASS — title centered; Widmark calc panel and graph render cleanly; "Press Calculate to retro-extrapolate" prompt shown; all controls legible. Fixed: moved Calculate button right (margin+330 → +375) so the "Show absorption phase" checkbox label is no longer clipped.
- Calculated state verified by temporarily forcing `revealCalc = true`: arithmetic line `= 0.058 + 0.015 × (3.0 − 1.0)` and result `BAC at event = 0.088 %` render in red with "(over the 0.08% legal limit)" — matches hand calculation. State reverted and canonical screenshot recaptured.
- Checklist 1.x/2.x/3.x/4.x/5.x/6.x PASS.

## Status: COMPLETE
