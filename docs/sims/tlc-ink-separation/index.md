---
title: TLC Ink Separation Interactive Diagram
description: Run a thin-layer chromatography separation, calculate Rf values, switch to UV light, and compare a questioned ink to reference lanes to decide whether it matches (Bloom L2 — Understand).
status: built
library: p5.js
bloom_level: Understand (L2) — explain how TLC separates ink dye components and interpret a result as matching or non-matching.
quality_score: 98
image: /sims/tlc-ink-separation/tlc-ink-separation.png
og:image: /sims/tlc-ink-separation/tlc-ink-separation.png
twitter:image: /sims/tlc-ink-separation/tlc-ink-separation.png
social:
   cards: false
---

# TLC Ink Separation Interactive Diagram

<iframe src="main.html" width="100%" height="602" scrolling="no"></iframe>

[Run the TLC Ink Separation Diagram Fullscreen](main.html){ .md-button .md-button--primary }

## About This MicroSim

A pen line that looks like a single color is usually a **mixture of several dyes**.
**Thin-layer chromatography (TLC)** pulls that mixture apart: a tiny spot of ink is
placed near the bottom of a coated plate, the plate stands in solvent, and as the
**solvent front** climbs, it carries each dye a different distance. The result is a
ladder of separated spots that acts like a fingerprint for that ink.

This MicroSim lets you **run the separation**, read the **Rf value** of each dye, flip
to **UV light** to uncover invisible components, and compare a questioned ink to three
reference lanes to decide which formulation it matches — exactly what a
questioned-document examiner does to detect a forgery or an altered date.

## How to Use It

1. The **plate** on the left has four lanes: **Q** (questioned) and **R1, R2, R3**
   (references). The dashed line at the bottom is the **origin**; the blue line is the
   **solvent front**.
2. Press **Run Chromatography** to watch the solvent front rise and the dye spots
   separate and climb to their resting positions.
3. Press **Calculate Rf** to label each spot with its **Rf value** — the spot's
   distance divided by the solvent-front distance. The right panel shows the numbers.
4. Press **Toggle UV** to switch to ultraviolet light. The plate darkens and any
   **fluorescent** components (like optical brighteners) light up — some are invisible
   in white light.
5. Use the **Questioned ink** dropdown to change the unknown pen, and the **Reference
   set** dropdown to swap the reference lanes.
6. Read the **Match Determination** box: it reports which reference the questioned ink
   matches and how many components agree.

## What You Can Learn

- Explain why a single ink produces **several spots** on a TLC plate.
- Calculate an **Rf value** and use it to compare dyes objectively.
- See how **UV light** reveals components that white light misses.
- Decide whether two inks **match** by comparing their components one by one — not just
  their overall color.

You can embed this MicroSim on your own web page with this iframe:

```html
<iframe src="https://dmccreary.github.io/forensic-science/sims/tlc-ink-separation/main.html"
        width="100%" height="602" scrolling="no"></iframe>
```

## Lesson Plan

**Audience:** High-school forensic science (grades 9–12)
**Time:** 8–12 minutes
**Bloom level:** Understand (L2) — explain.

**Worked example.** With the default ballpoint ink and Reference set 1, press **Run
Chromatography**, then **Calculate Rf**. Notice that lane **R2** has spots at the same
heights (same Rf values) as the questioned lane — the Match Determination reads 3/3.
Now press **Toggle UV**: a green fluorescent spot at Rf ≈ 0.62 appears in both Q and
R2, a hidden component that confirms the match.

**Guided questions:**

- A dye traveled 26 mm while the solvent front traveled 50 mm. What is its Rf?
- Why is Rf a better way to compare two inks than just looking at their color?
- Switch to **Reference set 2**. Why does the Match Determination now say "no full
  match"? Which lane is closest, and why isn't it good enough?
- What can **UV light** show that white light cannot, and why does that matter when
  comparing inks on a questioned document?

**Extension.** Change the **Questioned ink** to the gel pen, then to the fountain pen.
Describe how the number and spacing of spots differs between a pigment-based gel ink
and a dye-based ballpoint, and what that tells you about the ink's composition.

## References

- [Thin-layer chromatography (Wikipedia)](https://en.wikipedia.org/wiki/Thin-layer_chromatography) — how TLC separates mixtures.
- [Retardation factor / Rf value (Wikipedia)](https://en.wikipedia.org/wiki/Retardation_factor) — the spot-distance ÷ solvent-front-distance ratio.
- [Questioned document examination (Wikipedia)](https://en.wikipedia.org/wiki/Questioned_document_examination) — comparing inks and detecting alterations.
- [p5.js reference](https://p5js.org/reference/) — the library used to build this simulation.

## Specification

This MicroSim was generated from a specification in
[Chapter 14: Document Examination and Forgery Detection](../../chapters/14-document-examination/index.md).

> **Design note:** the inks, dye colors, and Rf values are **illustrative teaching
> data** chosen to make the comparison clear, not measurements of specific commercial
> pens. Real ink analysis uses calibrated plates, standards, and often instrumental
> methods alongside TLC, and is reported by a qualified examiner.
