---
title: Angle of Impact Calculator
description: Calculate the angle of impact of a bloodstain from width-to-length measurements (Bloom Level 3 — Apply; verb: calculate).
status: scaffold
library: p5.js
bloom_level: Apply (L3)
---

# Angle of Impact Calculator



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 7: Bloodstain Pattern Analysis](../../chapters/07-bloodstain-pattern-analysis/index.md).

```text
Type: microsim
**sim-id:** angle-of-impact-calculator<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning Objective: Calculate the angle of impact of a bloodstain from width-to-length measurements (Bloom Level 3 — Apply; verb: calculate).

Bloom Level: Apply (L3)
Bloom Verb: Calculate

Canvas layout:
- Left panel (~60%): a simulated bloodstain on a surface; user can drag handles to adjust width and length
- Right panel (~40%): formula display, measurement inputs, calculated angle, geometric diagram

Visual elements:
- An elliptical bloodstain with two measurement arrows: horizontal (width) and vertical (length)
- A geometric diagram showing the drop's trajectory angle relative to the surface plane
- The formula sin θ = Width/Length displayed with live-updating values
- The calculated angle displayed in degrees with a protractor arc overlay on the geometry diagram

Interactive controls:
- Drag handles on the stain to adjust width (5–30 mm) and length (5–60 mm)
- Alternatively, enter width and length values in input boxes
- "Calculate" button computes the angle
- "New Stain" button generates a random stain for the student to measure and calculate

Data Visibility Requirements:
- Stage 1: Show a bloodstain with default dimensions; formula visible with placeholder values
- Stage 2: As dimensions change, live-update the ratio and calculated angle
- Stage 3: Show the geometric diagram updating in real time to show the trajectory angle

Instructional Rationale: An Apply-level objective (calculate angle from measurements) requires hands-on computation. Interactive stain manipulation gives immediate visual feedback connecting the formula to the physical shape.

Color scheme: Bloodstain in dark red on tan/white surface; measurement arrows in blue; formula panel in white with dark text.
```

## Related Resources

- [Chapter 7: Bloodstain Pattern Analysis](../../chapters/07-bloodstain-pattern-analysis/index.md)
