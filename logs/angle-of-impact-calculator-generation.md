# MicroSim Generation Log — angle-of-impact-calculator

- **Date:** 2026-06-01
- **Library:** p5.js
- **Chapter:** 7 — Bloodstain Pattern Analysis
- **Final score:** 98 / A (validate-sims.py; −2 is the expected deduction for required p5 DOM controls)
- **Iframe height:** 482px (CANVAS_HEIGHT 480 + 2)

## Instructional Design Check
- **Bloom level:** Apply (L3)
- **Bloom verb:** Calculate
- **Pattern:** Calculator — size an elliptical bloodstain (drag handles or sliders), read the live `sin θ = Width / Length` ratio, compute θ, then press Calculate to reveal the angle and a trajectory/protractor diagram.
- **Specification alignment:** Aligned. Left panel (~58%) holds the draggable elliptical stain with blue width/length measurement arrows and handles; right panel (~40%) shows the formula with live-updating values, the calculated angle, and a geometric trajectory diagram with a protractor arc. New Stain randomizes dimensions for fresh practice.
- **Rationale:** The Apply objective requires hands-on computation; hiding the angle answer ("?") until Calculate forces the learner to perform `θ = arcsin(W/L)` before checking, and the live ellipse connects the formula to the physical stain shape.

## Standardization (microsim-utils)
- main.html rewritten from the placeholder scaffold to the standard p5.js shell.
- index.md rewritten with full frontmatter (quality_score 98, social image fields) and all standard sections. Replaced a `$$…$$` MathJax block with an inline-code formula after confirming the project enables `pymdownx.arithmatex` but does not load the MathJax/KaTeX JS, so `$$` would not render.
- metadata.json fixed (placeholder creator/subject): corrected to "Forensic Science Intelligent Textbook" + bloodstain subjects; added educational + pedagogical blocks; completion_status → implemented.

## Layout Review (microsim-layout-reviewer)
- Default load (answer hidden): PASS — title centered, stain with width/length arrows and handles, formula panel, hidden-answer prompt, and surface line all clear.
- Calculated state verified by temporarily forcing `calculated = true`: θ = 23.6° (= arcsin 0.400) displayed; trajectory line, protractor arc, angle label, and "blood drop path" / "surface" labels all legible within the diagram box. No overlap.
- `calculated` restored to false; canonical default screenshot recaptured.
- Checklist 1.x/2.x/3.x/4.x/6.x PASS. 5.x N/A (geometric diagram, not an axis chart).

## Status: COMPLETE
