---
title: Area of Origin Stringing Simulator
description: Determine the three-dimensional area of origin using stain direction and angle-of-impact data (Bloom Level 3 — Apply; verb: apply).
status: scaffold
library: p5.js
bloom_level: Apply (L3)
---

# Area of Origin Stringing Simulator



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 7: Bloodstain Pattern Analysis](../../chapters/07-bloodstain-pattern-analysis/index.md).

```text
Type: microsim
**sim-id:** area-of-origin-stringing<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning Objective: Determine the three-dimensional area of origin using stain direction and angle-of-impact data (Bloom Level 3 — Apply; verb: apply).

Bloom Level: Apply (L3)
Bloom Verb: Apply

Canvas layout:
- Main 3D-perspective view of a room with floor, one wall, and ceiling (isometric or 3D projection)
- Multiple bloodstains visible on the floor with directional arrows
- Strings extending backward from each stain at the calculated angle
- Intersection zone highlighted in the air

Interactive controls:
- Click a bloodstain to see its measurements (width, length, calculated angle)
- "Add String" button attaches a string to a selected stain and shows it projecting at the correct angle
- After all strings are added, "Find Intersection" button highlights the approximate convergence zone in 3D
- Sliders to adjust individual stain measurements to see how the convergence zone moves

Data Visibility Requirements:
- Show angle of impact for each selected stain
- Show the x, y, z coordinates of the intersection zone (in meters from the floor)
- When the user changes a stain's angle, animate the string's slope changing and the convergence zone shifting

Default scenario: Five stains positioned on the floor with pre-calculated angles; the convergence zone indicates a source at approximately 1.2m height (consistent with a standing adult)

Instructional Rationale: An Apply-level objective (determine 3D area of origin) requires the learner to connect multiple data points in space. A 3D interactive string model makes the geometry tangible.

Color scheme: Floor in light wood color, walls light gray, bloodstains dark red, strings bright orange, convergence zone green highlight.
```

## Related Resources

- [Chapter 7: Bloodstain Pattern Analysis](../../chapters/07-bloodstain-pattern-analysis/index.md)
