---
title: Medullary Index Calculator
description: Calculate the medullary index (MI = medulla ÷ shaft) of a hair cross-section and apply the rule that classifies it as human, ambiguous, or non-human (Bloom L3 — Apply).
status: built
library: p5.js
bloom_level: Apply (L3) — calculate the medullary index and apply the interpretation rule to classify a hair.
quality_score: 98
image: /sims/medullary-index-calculator/medullary-index-calculator.png
og:image: /sims/medullary-index-calculator/medullary-index-calculator.png
twitter:image: /sims/medullary-index-calculator/medullary-index-calculator.png
social:
   cards: false
---

# Medullary Index Calculator

<iframe src="main.html" width="100%" height="502" scrolling="no"></iframe>

[Run the Medullary Index Calculator Fullscreen](main.html){ .md-button .md-button--primary }

## About This MicroSim

A hair shaft has an outer layer called the **cortex** and a central canal called
the **medulla**. The **medullary index (MI)** is a simple ratio:

> **MI = medulla diameter ÷ overall shaft diameter**

That one number is a powerful first screen in trace-evidence work. **Human** hair
usually has a thin, fragmented, or absent medulla, so its MI is **small (≤ 0.33)**.
**Animal** hair tends to have a wide medulla that fills much of the shaft, giving a
**large MI (≥ 0.50)**. Values in between are **ambiguous** and need other features
to decide.

This MicroSim lets you **measure and calculate**: drag the two diameters and watch
the cross-section, the MI value, and the human/non-human verdict update live.

## How to Use It

1. Drag the **Medulla** slider to set the medulla diameter (µm).
2. Drag the **Shaft** slider to set the overall shaft diameter (µm).
3. Watch the **Hair Cross-Section** redraw — the dark inner circle is the medulla,
   the lighter ring is the cortex, and the arrows show each diameter.
4. Read the **Calculate the Index** panel: the formula, the computed **MI** to two
   decimals, and a color-coded badge:
   - **Green — Human** (MI ≤ 0.33)
   - **Orange — Ambiguous** (0.33 < MI < 0.50)
   - **Red — Non-human likely** (MI ≥ 0.50)
5. Press **New Sample** to load a preset diameter pair and classify it.
6. Compare your value to the **species reference row** (human, dog, cat, rodent).

## What You Can Learn

- Calculate the medullary index from two measurements.
- Apply the threshold rule (0.33 and 0.50) to classify a hair as human, ambiguous,
  or non-human.
- Explain *why* a wide medulla pushes a hair toward an animal classification, and
  why a borderline MI is not enough on its own.

You can embed this MicroSim on your own web page with this iframe:

```html
<iframe src="https://dmccreary.github.io/forensic-science/sims/medullary-index-calculator/main.html"
        width="100%" height="502" scrolling="no"></iframe>
```

## Lesson Plan

**Audience:** High-school forensic science (grades 9–12)
**Time:** 10–15 minutes
**Bloom level:** Apply (L3) — calculate.

**Worked example.** Set the medulla to about 18 µm and the shaft to about 90 µm.
The MI is 0.20 — green, **Human**. Now widen the medulla to about 60 µm on a 95 µm
shaft: the MI jumps to 0.63 — red, **Non-human likely**. The shaft barely changed;
it was the medulla that drove the verdict.

**Guided questions:**

- What MI value sits right on the human/ambiguous boundary? On the non-human one?
- If two hairs have the same shaft diameter, which one is more likely animal — the
  one with the wider or narrower medulla?
- Why might a forensic examiner refuse to call a hair "human" on MI alone when the
  index lands in the ambiguous band?

**Extension.** Look at the species reference row. A rodent's MI is near 0.90.
Sketch what that cross-section looks like compared to a human's, and explain how a
microscopist could tell them apart at a glance.

## References

- [Medulla (hair) (Wikipedia)](https://en.wikipedia.org/wiki/Medulla_(hair)) — the central canal of the hair shaft and its forensic significance.
- [Hair analysis (Wikipedia)](https://en.wikipedia.org/wiki/Hair_analysis) — microscopic comparison of human and animal hair in forensic casework.
- [p5.js reference](https://p5js.org/reference/) — the library used to build this simulation.

## Specification

This MicroSim was generated from a specification in
[Chapter 4: Hair, Fiber, and Trace Evidence Analysis](../../chapters/04-hair-and-fiber-analysis/index.md).

> **Design note:** the cross-section is a **schematic** drawn to a fixed scale
> (SCALE_MAX = 120 µm); it illustrates the medulla-to-shaft ratio, not a
> photomicrograph of a real hair. The interpretation thresholds (0.33 and 0.50)
> and the species reference values are typical teaching figures — real casework
> uses ranges and additional microscopic features, so the MI is a screening tool,
> not a sole identifier.
