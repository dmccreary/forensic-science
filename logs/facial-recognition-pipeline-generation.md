# MicroSim Generation Log — facial-recognition-pipeline

- **Date:** 2026-06-02
- **Library:** p5.js
- **Chapter:** 16 — Facial Recognition
- **Final score:** 98 / A (validate-sims.py; −2 is the expected deduction for required p5 DOM controls)
- **Iframe height:** 517px (CANVAS_HEIGHT 515 + 2)

## Instructional Design Check
- **Bloom level:** Remember (L1)
- **Bloom verb:** Identify
- **Pattern:** Clickable annotated pipeline diagram with detail panels — the canonical L1 pattern. Five stage boxes (Input Image → Face Detection → Landmark Extraction → Feature Vector → Database Comparison) run left to right, each with an icon, name, an orange error caption, and connecting arrows; an animated probe dot travels the row. Clicking a stage highlights it green and loads three bottom panels: a stage-specific visual (face with noise / bounding box / landmarks / feature-vector bars / gallery), a detail panel (what it does / what can go wrong / effect on error rate), and a demographic-error panel.
- **Specification alignment:** Aligned. All five stages, per-stage error sources, the degrade/restore image-quality toggle, and the CNN-vs-Eigenface algorithm selector are present. Match scores and demographic error rates respond to both image quality and algorithm choice, and the gallery shows a 0.70 match threshold line.
- **Rationale:** The Remember objective (identify the stages and the error source at each) is served by a labeled, clickable diagram that surfaces each stage's role and failure mode on demand, with the degrade/algorithm controls reinforcing that recognition quality is conditional, not absolute.

## Standardization (microsim-utils)
- main.html rewritten from the placeholder scaffold to the standard p5.js shell (CDN p5@1.11.10, schema meta tag, `<main></main>`, "Back to Documentation" link).
- index.md rewritten with full frontmatter (quality_score 98, social image fields) and all standard sections, including a worked example, guided questions, References, and a design note flagging the figures as illustrative sample data.
- metadata.json fixed from the stub (creator "Dementia Education Project", subject ["dementia"], completion_status "scaffold"): corrected to "Forensic Science Intelligent Textbook" + facial-recognition/biometrics subjects; added educational + pedagogical blocks; completion_status → implemented.

## Layout Review (microsim-layout-reviewer)
- Default load (selected = Database Comparison, clean image, CNN): PASS — title centered; five pipeline boxes with icons, arrows, and orange error captions render legibly; gallery panel shows five score bars (0.94/0.82/0.71/0.55/0.43) with two above the red 0.70 threshold line; detail and demographic panels populated; both controls visible. The animated probe label sits cleanly above the boxes (not clipped).
- Alternate state verified by temporarily setting `selected = 1` and `degraded = true`: Face Detection highlighted; visual shows the bounding-box face with "detection confidence 64%"; demographic errors rise to 2.5% / 14.0%. State reverted and canonical screenshot recaptured.
- Checklist 1.x/2.x/3.x/4.x/6.x PASS. 5.x N/A (diagram + panels, not an axis chart).

## Notes
- Initial validation scored 95/A because main.html carried the wrong schema meta-tag URL (json-schema.org draft instead of the project namespace). Corrected to `https://dmccreary.github.io/intelligent-textbooks/ns/microsim/v1` → 98/A.

## Status: COMPLETE
