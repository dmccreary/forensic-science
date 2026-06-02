# MicroSim Generation Log — medullary-index-calculator

- **Date:** 2026-06-02
- **Library:** p5.js
- **Chapter:** 4 — Hair, Fiber, and Trace Evidence Analysis
- **Final score:** 98 / A (validate-sims.py; −2 is the expected deduction for required p5 DOM controls)
- **Iframe height:** 502px (CANVAS_HEIGHT 500 + 2)

## Instructional Design Check
- **Bloom level:** Apply (L3)
- **Bloom verb:** Calculate
- **Pattern:** Use a rule to reach a conclusion with live feedback. The student drags two sliders (medulla diameter, shaft diameter); the hair cross-section, the MI ratio, and a human/ambiguous/non-human verdict update continuously. A "New Sample" button loads preset diameter pairs to classify.
- **Specification alignment:** Aligned. MI = medulla ÷ shaft computed and shown to two decimals; cross-section drawn to scale (SCALE_MAX 120 µm) with the medulla as a dark inner circle inside the lighter cortex and dimension arrows for both diameters; color-coded result badge (green Human ≤ 0.33, orange Ambiguous 0.33–0.50, red Non-human likely ≥ 0.50) with an explanatory note; species reference row (human 0.25, dog 0.45, cat 0.55, rodent 0.90) for comparison.
- **Rationale:** A "calculate" objective is best served by letting the student set the inputs and read the computed ratio plus its classification, so the threshold logic (0.33 / 0.50) is discovered by sweeping the sliders rather than memorized.

## Standardization (microsim-utils)
- main.html rewritten from the placeholder scaffold to the standard p5.js shell (CDN p5@1.11.10, project schema meta tag `…/ns/microsim/v1`, `<main></main>`, "Back to Documentation" link, script src `medullary-index-calculator.js`).
- index.md rewritten with full frontmatter (status built, quality_score 98, social image fields), copy-paste iframe at height 502, About / How to Use / What You Can Learn / Lesson Plan (worked example, guided questions, extension) / References, and a design note clarifying the cross-section is a schematic ratio diagram and the thresholds/species values are teaching figures (MI is a screening tool, not a sole identifier).
- metadata.json fixed from the dementia-stub: creator "Forensic Science Intelligent Textbook", hair/trace-evidence/medullary-index subjects, educational + pedagogical blocks, completion_status → implemented.

## Layout Review (microsim-layout-reviewer)
- Default load (medulla 18 µm, shaft 90 µm): PASS — MI = 0.20, green HUMAN badge, narrow medulla inside the cortex, both dimension arrows and the species reference row render; "Calculate the Index" panel shows the formula and the substituted values.
- Non-human state verified by forcing the slider defaults to medulla 62 µm / shaft 95 µm via sed: MI ≈ 0.65, red NON-HUMAN LIKELY badge, wide medulla filling most of the shaft, note explaining the animal-hair interpretation. State reverted from /tmp backup (`/tmp/mi.bak.js`) and the canonical MI = 0.20 Human screenshot recaptured.
- Controls are real p5 DOM elements: two createSliders (medulla 1–80, shaft 30–120) styled to 150px and a createButton ("New Sample") positioned over the lower control strip. Checklist 1.x/2.x/3.x/4.x/6.x PASS. 5.x N/A (cross-section + readout panels, not an axis chart).

## Status: COMPLETE
