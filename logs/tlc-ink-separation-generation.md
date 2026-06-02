# MicroSim Generation Log — tlc-ink-separation

- **Date:** 2026-06-02
- **Library:** p5.js
- **Chapter:** 14 — Document Examination and Forgery Detection
- **Final score:** 98 / A (validate-sims.py; −2 is the expected deduction for required p5 DOM controls)
- **Iframe height:** 602px (CANVAS_HEIGHT 600 + 2)

## Instructional Design Check
- **Bloom level:** Understand (L2)
- **Bloom verb:** Explain
- **Pattern:** Animated, interactive chromatography simulation with read-your-own-Rf comparison. The student runs the separation, computes Rf, toggles UV, and interprets a component-by-component match — the explain/interpret loop the spec calls for.
- **Specification alignment:** Aligned (spec type: microsim). Left ~40% TLC plate with four lanes (Q, R1, R2, R3), origin and solvent-front lines, animated solvent rise and migrating dye spots, Rf labels on completion, and a white-light/UV toggle that reveals a fluorescent component. Right ~60% result panel: questioned-ink Rf table (spot distance + front distance + Rf), per-reference component match counts with green-check/red-X indicators, and a Match Determination box ("Questioned ink matches R2 … 3/3 components matched"). Dropdowns select questioned ink (ballpoint/rollerball/gel/fountain) and the reference lane set. White plate, colored spots, blue solvent front, green/red indicators — matches the spec.
- **Rationale:** An animated, runnable chromatography sim where students read the Rf comparisons themselves is exactly what the spec argues an Understand objective needs.

## Standardization (microsim-utils)
- main.html rewritten from the placeholder scaffold to the standard p5.js shell (CDN p5@1.11.10, project schema meta tag `…/ns/microsim/v1`, `<main></main>`, "Back to Documentation" link, script src `tlc-ink-separation.js`).
- index.md rewritten with full frontmatter (status built, quality_score 98, social image fields), copy-paste iframe at height 602, About / How to Use / What You Can Learn / Lesson Plan (worked example, guided questions, extension) / References, plus a design note clarifying the inks and Rf values are illustrative teaching data.
- metadata.json fixed from the dementia-stub: creator "Forensic Science Intelligent Textbook", document-examination/ink/chromatography subjects, educational + pedagogical blocks, completion_status → implemented.

## Design choices
- **Default state = fully developed plate** (progress=1, rfShown=true, white light) so the canonical screenshot is informative without first pressing Run — this also sidesteps the headless-screenshot mid-animation problem. "Run Chromatography" resets progress to 0 and replays the rise for explanation.
- **Default scenario:** Questioned = Ballpoint (blue) with components at Rf 0.28/0.52/0.74 plus a UV-only brightener at 0.62. Reference set 1 = [Rollerball, Ballpoint, Gel] so R2 is a 3/3 match (4/4 in UV). Reference set 2 = [Fountain, Gel, Rollerball] gives no full match, demonstrating the negative determination.

## Layout fix
- First capture overflowed: the bottom control row (two selects + three buttons) ran past the 800px screenshot width ("Calculate Rf" cut off) and the default-width questioned `<select>` collided with the "References" label. Fixed by constraining both selects to 150px (`.style('width','150px')`), tightening the button x-positions, and shortening the on-canvas labels to "Ink" / "Refs". All five controls now fit inside 800px.

## Layout Review (microsim-layout-reviewer)
- Default load (white light, developed, Rf shown, Reference set 1): PASS — four lanes with separated spots and Rf labels, origin/solvent-front lines, Q Rf table (0.28/0.52/0.74 at 14/26/37 mm of a 50 mm front), R1 0/3 ✗ / R2 3/3 ✓ / R3 1/3 ✗, green Match Determination naming R2.
- Verified states by temporarily forcing `uvMode=true` + Reference set 2 in setup: PASS — dark plate with glowing spots, the green fluorescent brightener appears at Rf 0.62 in the Q lane, the Rf table grows to 4 rows including a "UV" component, and the red Match Determination reads "No reference is a full match. Closest is R2 (1/4 matched)." Temporary code removed (restored from `/tmp/tlc.bak.js`) and the canonical screenshot recaptured.
- Controls: real p5 DOM elements — two createSelect dropdowns (questioned ink, reference set) and three createButtons (Run Chromatography, Toggle UV, Calculate Rf). Checklist 1.x/2.x/3.x/4.x/6.x PASS. 5.x N/A (chromatography plate diagram, not an axis chart, though the Rf table reports labeled distances).

## Status: COMPLETE
