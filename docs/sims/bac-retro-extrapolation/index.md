---
title: BAC and Retro-Extrapolation Calculator
description: Calculate BAC using the Widmark formula and perform a BAC retro-extrapolation (Bloom Level 3 — Apply; verb: calculate).
status: scaffold
library: p5.js
bloom_level: Apply (L3)
---

# BAC and Retro-Extrapolation Calculator



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 9: Forensic Toxicology and Chemical Analysis](../../chapters/09-forensic-toxicology/index.md).

```text
Type: microsim
**sim-id:** bac-retro-extrapolation<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning Objective: Calculate BAC using the Widmark formula and perform a BAC retro-extrapolation (Bloom Level 3 — Apply; verb: calculate).

Bloom Level: Apply (L3)
Bloom Verb: Calculate

Canvas layout:
- Left panel (~50%): BAC calculator (Widmark formula)
- Right panel (~50%): BAC over time graph with retro-extrapolation line

Visual elements:
- Input fields for weight, sex, number of drinks, time elapsed since drinking began
- A line graph showing BAC rising during consumption, then declining linearly during elimination
- A vertical "event time" marker (e.g., "Time of driving") that the user can position
- A horizontal "legal limit" line at 0.08%
- A "measured BAC at collection" point plotted on the elimination curve

Interactive controls:
- Sliders for weight (40–150 kg), drinks consumed (1–10), time of blood draw (0–8 hours after last drink), elimination rate (0.010–0.025 g/dL/hr)
- "Calculate" button updates the graph and shows BAC at event time vs. at draw time
- "Add Absorption Phase" toggle shows the pre-peak absorption curve when enabled

Data Visibility Requirements:
- Show Widmark calculation steps explicitly
- Show retro-extrapolated BAC at event time with the arithmetic calculation
- Color the area of the graph where BAC > 0.08% in red

Instructional Rationale: An Apply-level objective (calculate and retro-extrapolate BAC) requires learners to input values and see both the formula and the result. A live graph makes the time-course of alcohol metabolism tangible.

Color scheme: Blue line for BAC curve, red shaded area above legal limit, gray vertical marker for event time, yellow point for measured BAC.
```

## Related Resources

- [Chapter 9: Forensic Toxicology and Chemical Analysis](../../chapters/09-forensic-toxicology/index.md)
