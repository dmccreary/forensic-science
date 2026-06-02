---
title: Angle-of-Impact Calculator
description: Calculate the angle of impact of a bloodstain from its width-to-length ratio (Bloom L3 — Apply).
status: built
library: p5.js
bloom_level: Apply (L3) — calculate the angle of impact from bloodstain width and length.
quality_score: 98
image: /sims/angle-of-impact-calculator/angle-of-impact-calculator.png
og:image: /sims/angle-of-impact-calculator/angle-of-impact-calculator.png
twitter:image: /sims/angle-of-impact-calculator/angle-of-impact-calculator.png
social:
   cards: false
---

# Angle-of-Impact Calculator

<iframe src="main.html" width="100%" height="482" scrolling="no"></iframe>

[Run the Angle-of-Impact Calculator Fullscreen](main.html){ .md-button .md-button--primary }

## About This MicroSim

When a blood drop strikes a surface at an angle, it leaves an **elliptical**
stain — the steeper the angle, the rounder the stain; the shallower the angle,
the more stretched and narrow it becomes. Bloodstain pattern analysts use this
geometry to recover the **angle of impact** from a simple measurement:
`sin θ = Width / Length`.

This MicroSim lets you measure a stain and apply that formula. Size the
elliptical stain, read the width-to-length ratio, and calculate the angle θ —
then watch the trajectory diagram redraw to match.

## How to Use It

1. **Drag the blue handles** on the stain (or use the **Width** and **Length**
   sliders) to set its dimensions in millimetres.
2. Read the live ratio: `sin θ = Width / Length`.
3. Compute the angle yourself, then press **Calculate** to check your answer and
   draw the trajectory with a protractor arc.
4. Press **New Stain** for a fresh randomized stain to measure and solve.

## What You Can Learn

- Calculate the angle of impact from a bloodstain's width and length.
- Explain why a near-90° impact gives a round stain and a shallow impact gives a
  long, narrow one.
- Connect the algebraic formula to the physical geometry of the drop's path.

You can embed this MicroSim on your own web page with this iframe:

```html
<iframe src="https://dmccreary.github.io/forensic-science/sims/angle-of-impact-calculator/main.html"
        width="100%" height="482" scrolling="no"></iframe>
```

## Lesson Plan

**Audience:** High-school forensic science (grades 9–12)
**Time:** 15–20 minutes
**Bloom level:** Apply (L3) — calculate the angle.

**Worked example.** Set Width = 15 mm and Length = 30 mm. Have students compute
`sin θ = 15/30 = 0.5`, so `θ = 30°`, before pressing Calculate to confirm.

**Guided questions:**

- Keep the length fixed and increase the width. Does the calculated angle get
  larger or smaller? Why?
- What stain shape corresponds to an impact angle near 90°?
- Why can the width never be larger than the length?

**Extension.** Discuss how analysts combine many stains' impact angles with
their positions to triangulate the **area of origin** of the blood source.

## References

- [Bloodstain pattern analysis (Wikipedia)](https://en.wikipedia.org/wiki/Bloodstain_pattern_analysis) — interpreting stains at a scene.
- [Angle of impact (Wikipedia)](https://en.wikipedia.org/wiki/Bloodstain_pattern_analysis#Directionality_and_angle_of_impact) — the width/length method.
- [Inverse sine (Wikipedia)](https://en.wikipedia.org/wiki/Inverse_trigonometric_functions) — recovering an angle from a ratio.
- [p5.js reference](https://p5js.org/reference/) — the library used to build this simulation.

## Specification

This MicroSim was generated from a specification in
[Chapter 7: Bloodstain Pattern Analysis](../../chapters/07-bloodstain-pattern-analysis/index.md).

> **Design note:** the angle answer stays hidden ("?") until you press
> Calculate, so the student performs the `sin θ = W/L` computation before
> checking it. Stain dimensions are constrained to width ≤ length, since the
> ratio cannot exceed 1.
