# MicroSim Generation Log — triangulation-measurement

- **Date:** 2026-06-02
- **Library:** p5.js
- **Chapter:** 2 — Crime Scene Investigation and Evidence Collection
- **Final score:** 98 / A (validate-sims.py; −2 is the expected deduction for required p5 DOM controls)
- **Iframe height:** 602px (CANVAS_HEIGHT 600 + 2)

## Instructional Design Check
- **Bloom level:** Apply (L3)
- **Bloom verb:** Calculate
- **Pattern:** Apply a rule with live feedback. The student drags an evidence item around a scaled floor plan and reads the two triangulation distances (computed via the Pythagorean theorem) that update in real time, then records them to a sketch log — the calculate-and-document loop the spec calls for.
- **Specification alignment:** Aligned (spec type: microsim). Left ~72% overhead room plan with a 1-meter grid and two fixed green reference corners (A top-left, B top-right); a draggable orange evidence dot (E) joined to A and B by blue dashed lines whose midpoints show the live distance in centimeters; the dot displays its (x, y) coordinates from A. Right panel: Live Measurement (to A, to B, coordinates) and a Measurement Log. Two sliders set room width and length (3–10 m); "Record Measurement" appends the current item to the log; "Clear Log" empties it. Matches the spec.
- **Rationale:** A draggable, live-recompute floor plan where students read off and record the two distances is exactly what an Apply/calculate objective needs.

## Standardization (microsim-utils)
- main.html rewritten from the placeholder scaffold to the standard p5.js shell (CDN p5@1.11.10, project schema meta tag `…/ns/microsim/v1`, `<main></main>`, "Back to Documentation" link, script src `triangulation-measurement.js`).
- index.md rewritten with full frontmatter (status built, quality_score 98, social image fields), copy-paste iframe at height 602, About / How to Use / What You Can Learn / Lesson Plan (worked example, guided questions, extension) / References, plus a design note clarifying the simplified rectangular plan and straight-line distances.
- metadata.json fixed from the stub: creator "Forensic Science Intelligent Textbook", crime-scene/evidence/sketching/measurement subjects, educational + pedagogical blocks, completion_status → implemented.

## Design choices
- **Geometric model:** evidence position `ex, ey` in meters from corner A; `distToA() = sqrt(ex² + ey²)`, `distToB() = sqrt((Wm − ex)² + ey²)`. Pixel geometry scaled to preserve the room's real aspect ratio as the sliders change its dimensions.
- **Default state:** 6.0 m × 5.0 m room, evidence at the exact center (3.0, 2.5). Both distances read 391 cm — a clean worked example: √(3.0² + 2.5²) = 3.91 m, and the symmetric left-right placement makes the two distances equal, which is informative for the canonical screenshot without any interaction.

## Layout Review (microsim-layout-reviewer)
- Default load (6 m × 5 m, centered item): PASS — room with 1 m grid, green corners A/B, orange E dot at center, both blue dashed lines labeled 391 cm, coordinate readout (300, 250) cm, right panel showing to A / to B 391 cm and the empty-log prompt.
- Verified states by temporarily forcing alternate positions in setup: PASS — off-center at (440, 160) cm read 468 cm to A and 226 cm to B (both confirmed by hand: √(4.40² + 1.60²)=4.68 m, √(1.60² + 1.60²)=2.26 m); a log-populated state rendered numbered E1/E2 rows with their A/B distances. Temporary code removed (restored from `/tmp/tri.bak.js`) and the canonical screenshot recaptured.
- Controls: real p5 DOM elements — two createSliders (room width, room length; 3–10 m, 0.5 step, 120px) and two createButtons (Record Measurement, Clear Log). Checklist 1.x/2.x/3.x/4.x/6.x PASS. 5.x N/A (scaled floor-plan diagram, not an axis chart, though distances are reported in labeled centimeters).

## Status: COMPLETE
