# MicroSim Generation Log — latent-print-development

- **Date:** 2026-06-02
- **Library:** p5.js
- **Chapter:** 3 — Fingerprint Analysis and Dactyloscopy
- **Final score:** 98 / A (validate-sims.py; −2 is the expected deduction for required p5 DOM controls)
- **Iframe height:** 502px (CANVAS_HEIGHT 500 + 2)

## Instructional Design Check
- **Bloom level:** Apply (L3)
- **Bloom verb:** Select
- **Pattern:** Apply a rule to reach a conclusion, with success/failure feedback. The student selects an evidence item (dropdown), chooses one of four development techniques (highlighting buttons), and presses Apply. A before panel shows the substrate with a POROUS/NON-POROUS badge and a faint invisible latent; the after panel animates either a developed print in the technique-accurate color or a "No visible ridge pattern" failure. A feedback panel states the porosity rule and, on failure, the substrate-specific reason.
- **Specification alignment:** Aligned. Evidence-item display from a dropdown (glass, paper, cardboard, plastic bag, wood); four technique buttons (Cyanoacrylate, Ninhydrin, Silver Nitrate, Iodine); Apply Technique button triggering a before→after reveal; result panel showing the developed print or a failure message with explanation; substrate porosity indicator. Behavior rules implemented per spec: cyanoacrylate succeeds on non-porous (white ridges), ninhydrin succeeds on porous (Ruhemann's purple) and fails on glass, iodine succeeds on any surface with a "photograph immediately" temporary warning; silver nitrate added as a porous-surface technique. Technique-accurate colors used.
- **Rationale:** An Apply objective (select technique by substrate) is best served by active choice plus consequence; failure feedback for wrong choices teaches the porosity logic better than a correct-only demo, exactly as the spec's rationale argues.

## Standardization (microsim-utils)
- main.html rewritten from the placeholder scaffold to the standard p5.js shell (CDN p5@1.11.10, project schema meta tag `…/ns/microsim/v1`, `<main></main>`, "Back to Documentation" link, script src `latent-print-development.js`).
- index.md rewritten with full frontmatter (status built, quality_score 98, social image fields), copy-paste iframe at height 502, About / How to Use / What You Can Learn / Lesson Plan (worked example, guided questions, extension) / References, and a design note clarifying the prints are procedural illustrations and the rule-based porosity logic (raw wood treated as porous).
- metadata.json fixed from the dementia-stub: creator "Forensic Science Intelligent Textbook", fingerprint/latent-print subjects, educational + pedagogical blocks, completion_status → implemented.

## Layout Review (microsim-layout-reviewer)
- Default load (Drinking Glass, no technique applied): PASS — non-porous badge, faint latent print on the glass substrate; result panel prompts to choose a technique and Apply; four technique buttons, evidence dropdown, and Apply button visible; "How to choose" guidance shown.
- Success verified by temporarily forcing `chosenTech = 'cya'` plus an `applyTechnique()` call in setup via sed: Cyanoacrylate button highlighted, after panel renders the white developed ridges, "✓ Cyanoacrylate on Drinking Glass — print developed" with substrate explanation.
- Failure verified by forcing `chosenTech = 'nin'` on the glass: after panel shows "No visible ridge pattern / Technique not effective on this substrate" and the feedback panel explains ninhydrin needs amino acids absorbed into a porous surface. State reverted from /tmp backup and canonical screenshot recaptured.
- Technique buttons are real p5 DOM createButtons positioned over the lower canvas; the chosen one is restyled (blue) via element.style. Checklist 1.x/2.x/3.x/4.x/6.x PASS. 5.x N/A (before/after evidence panels, not an axis chart).

## Status: COMPLETE
