# MicroSim Generation Log — skeletal-sex-indicators

- **Date:** 2026-06-02
- **Library:** p5.js
- **Chapter:** 11 — Forensic Anthropology and Skeletal Biology
- **Final score:** 98 / A (validate-sims.py; −2 is the expected deduction for required p5 DOM controls)
- **Iframe height:** 552px (CANVAS_HEIGHT 550 + 2)

## Instructional Design Check
- **Bloom level:** Remember (L1)
- **Bloom verb:** Identify
- **Pattern:** Clickable annotated comparison diagram with self-test. The student explores labeled male/female features, reads how each differs and how reliable it is, then hides labels and uses Quiz Me to recall which morphology indicates which sex.
- **Specification alignment:** Aligned (spec type: infographic). Left/right male and female pelvis schematics on top, male and female skull schematics below, each with clickable, labeled feature annotations. Clicking a feature reveals (1) the male-vs-female form and (2) its reliability as a sex indicator with an accuracy percentage. "Hide Labels" toggle supports self-testing; "Quiz Me" highlights a single feature and asks the student to predict the sex with Male/Female buttons and feedback. Color scheme matches the spec: bone in warm tan/ivory, male features red, female features blue, white detail panel.
- **Rationale:** A Remember objective (identify features and their significance) is served by a labeling/annotation interface plus a quiz, exactly as the spec argues.

## Standardization (microsim-utils)
- main.html rewritten from the placeholder scaffold to the standard p5.js shell (CDN p5@1.11.10, project schema meta tag `…/ns/microsim/v1`, `<main></main>`, "Back to Documentation" link, script src `skeletal-sex-indicators.js`).
- index.md rewritten with full frontmatter (status built, quality_score 98, social image fields), copy-paste iframe at height 552, About / How to Use / What You Can Learn / Lesson Plan (worked example, guided questions, extension) / References, and a design note clarifying the schematics are teaching line drawings (not anatomically exact) and the accuracy percentages are typical published ranges.
- metadata.json fixed from the dementia-stub: creator "Forensic Science Intelligent Textbook", forensic-anthropology/osteology subjects, educational + pedagogical blocks, completion_status → implemented.

## Layout Review (microsim-layout-reviewer)
- Default load (explore mode, subpubic angle selected): PASS — four bone-colored schematics with red (male) and blue (female) numbered feature dots; MALE/FEMALE column headers and rotated PELVIS/SKULL row labels; detail panel shows Subpubic Angle with male (narrow V <90°) vs female (wide U >90°) descriptions and a ~95% green reliability bar.
- Label-overflow fix: left-edge labels (Greater Sciatic Notch, Mastoid Process on the male side) initially ran off the left of the canvas; switched all feature labels to left-aligned text drawn to the right of each dot so every label stays inside the diagram panel. Recaptured.
- Quiz mode verified by temporarily forcing `mode = 'quiz'` with a fixed quiz (greater sciatic notch / female) in setup: labels hidden, the quizzed feature highlighted with an orange ring, the panel shows the morphology prompt ("Wide and shallow — an open angle.") and asks for the sex, and the Male/Female DOM buttons appear on the control strip. Temporary code removed (restored from `/tmp/ssi.bak.js`) and the canonical screenshot recaptured.
- Controls are real p5 DOM createButtons (Hide/Show Labels toggle, Quiz Me, and show/hide Male/Female answer buttons); feature selection handled via canvas mousePressed distance hit-testing. Checklist 1.x/2.x/3.x/4.x/6.x PASS. 5.x N/A (annotated anatomical diagram, not an axis chart).

## Status: COMPLETE
