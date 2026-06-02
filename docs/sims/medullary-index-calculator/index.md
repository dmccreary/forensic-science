---
title: Medullary Index Calculator
description: Calculate the medullary index of a hair sample and interpret the result as human or non-human (Bloom Level 3 — Apply; verb: calculate).
status: scaffold
library: p5.js
bloom_level: Apply (L3)
---

# Medullary Index Calculator



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 4: Hair, Fiber, and Trace Evidence Analysis](../../chapters/04-hair-and-fiber-analysis/index.md).

```text
Type: microsim
**sim-id:** medullary-index-calculator<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning Objective: Calculate the medullary index of a hair sample and interpret the result as human or non-human (Bloom Level 3 — Apply; verb: calculate).

Bloom Level: Apply (L3)
Bloom Verb: Calculate

Canvas layout:
- Left panel (~60%): cross-sectional view of a hair shaft rendered as two concentric circles (outer = shaft, inner = medulla)
- Right panel (~40%): measurement inputs, formula display, and result readout

Visual elements:
- A circular cross-section of the hair showing the medulla (darker center) and cortex (lighter outer ring)
- Two measurement arrows: one spanning the full shaft diameter, one spanning the medulla diameter
- The formula displayed: MI = Medulla Diameter / Hair Shaft Diameter
- A color-coded result: green if MI ≤ 0.33 (Human), orange if 0.33–0.50 (Ambiguous), red if ≥ 0.50 (Non-human likely)
- A concentric diagram comparison showing typical human vs. dog vs. cat vs. rodent medulla proportions

Interactive controls:
- Sliders for medulla diameter (1–80 µm) and shaft diameter (30–120 µm)
- The cross-section diagram updates in real time as sliders change
- A "New Sample" button generates a random hair sample with preset measurements for the student to calculate manually before the MI is revealed

Data Visibility Requirements:
- Stage 1: Show sliders at default positions with formula visible
- Stage 2: As student adjusts sliders, live-update the cross-section proportions and the calculated MI value
- Stage 3: When MI is calculated, display the interpretation (Human / Ambiguous / Non-human) with a one-sentence explanation

Default parameters:
- Medulla diameter: 18 µm
- Shaft diameter: 90 µm (MI = 0.20, Human)

Instructional Rationale: An Apply-level objective (calculate and interpret MI) requires the learner to perform the calculation themselves. A visual cross-section that updates in real time connects the formula to the physical structure being measured.

Color scheme: Cortex in tan/gold; medulla in dark brown; background white. Result badge green/orange/red.
```

## Related Resources

- [Chapter 4: Hair, Fiber, and Trace Evidence Analysis](../../chapters/04-hair-and-fiber-analysis/index.md)
