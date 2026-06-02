# MicroSim Generation Log — rmp-product-rule

- **Date:** 2026-06-02
- **Library:** p5.js
- **Chapter:** 8 — Forensic DNA Profiling
- **Final score:** 98 / A (validate-sims.py; −2 is the expected deduction for required p5 DOM controls)
- **Iframe height:** 552px (CANVAS_HEIGHT 550 + 2)

## Instructional Design Check
- **Bloom level:** Apply (L3)
- **Bloom verb:** Calculate
- **Pattern:** Hands-on calculation with accumulating power. The student multiplies single-locus genotype frequencies via the product rule by toggling loci, watching the running product drop locus by locus on a log scale, then reads the final RMP and compares it to population sizes.
- **Specification alignment:** Aligned. Table view lists eight STR loci with locus name, two alleles, and editable/togglable genotype frequency; calculation panel shows the running product after each included locus on a log-scale curve; result display gives the RMP in scientific notation AND as "1 in X". "Calculate Product" reveals the RMP; a "How rare is that?" panel compares the inverse RMP against U.S. and world population sizes with log-scaled bars. Intermediate products are shown via the descending curve; the final RMP appears in both formats; the scale comparison delivers the "wow moment" (profile rarer than the world population). Color scheme matches spec (white table, blue running product, red for the tiny final probability, green/orange/red scale bars).
- **Rationale:** An Apply objective (calculate RMP) is served by making the student build the product themselves and see statistical power accumulate locus by locus.

## Standardization (microsim-utils)
- main.html rewritten from the placeholder scaffold to the standard p5.js shell (CDN p5@1.11.10, project schema meta tag `…/ns/microsim/v1`, `<main></main>`, "Back to Documentation" link, script src `rmp-product-rule.js`).
- index.md rewritten with full frontmatter (status built, quality_score 98, social image fields), copy-paste iframe at height 552, About / How to Use / What You Can Learn / Lesson Plan (worked example, guided questions, extension) / References, and a design note clarifying the loci/frequencies are realistic teaching values and the product rule assumes locus independence (real casework adjusts for substructure).
- metadata.json fixed from the dementia-stub: creator "Forensic Science Intelligent Textbook", DNA/RMP/STR subjects, educational + pedagogical blocks, completion_status → implemented.

## Layout Review (microsim-layout-reviewer)
- Default load (all 8 loci checked, result shown): PASS — locus table with per-row checkboxes aligned to each row, included rows highlighted; descending log-scale running-product curve ending in a red dot at ~10^-11; RMP = 2.05 × 10^-11 and "1 in 4.9 × 10^10"; three population-comparison bars (U.S., world, this profile) with the takeaway that the profile is rarer than the world population.
- Partial state verified by forcing `included = [true,true,true,false,false,false,false,false]` via sed: only the first three rows highlighted, a three-point curve, RMP = 1.16 × 10^-4 / "1 in 8,658", the DNA-profile bar shorter than the world bar, and the takeaway switching to "Add more loci to push the match probability below the world population." State reverted from /tmp backup (`/tmp/rmp.bak.js`) and the canonical screenshot recaptured.
- Controls are real p5 DOM elements: eight createCheckboxes positioned over their table rows plus three createButtons on the lower control strip. Checklist 1.x/2.x/3.x/4.x PASS; 5.x PASS (log-scale running-product chart has labeled 10^0…10^-12 axis).

## Status: COMPLETE
