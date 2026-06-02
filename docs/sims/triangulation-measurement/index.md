---
title: Triangulation Measurement Technique
description: Apply triangulation measurement to record evidence position on a scaled sketch (Bloom Level 3 — Apply; verb: calculate).
status: scaffold
library: p5.js
bloom_level: Apply (L3)
---

# Triangulation Measurement Technique



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 2: Crime Scene Investigation and Evidence Collection](../../chapters/02-crime-scene-investigation/index.md).

```text
Type: microsim
**sim-id:** triangulation-measurement<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning Objective: Apply triangulation measurement to record evidence position on a scaled sketch (Bloom Level 3 — Apply; verb: calculate).

Bloom Level: Apply (L3)
Bloom Verb: Calculate

Canvas layout:
- Main drawing area (left ~75%): overhead view of a room
- Control panel (right ~25%): input fields, instructions, measurement log

Visual elements:
- A rectangular room floor plan viewed from above
- Two labeled reference points (A and B) at two corners, shown as green circles
- A draggable orange dot representing an evidence item
- Two dashed lines from the evidence item to reference points A and B
- Live distance measurements displayed along the dashed lines in centimeters
- A readout showing the calculated (x, y) coordinates of the evidence item

Interactive controls:
- Drag the evidence item anywhere within the room
- Sliders to adjust room length and width (3m to 10m)
- A "Record Measurement" button that appends current distances to a measurement log list
- A "Clear Log" button

Data Visibility Requirements:
- Stage 1: Show room with two fixed reference corners (A, B) and a default evidence item position
- Stage 2: As user drags the evidence item, live-update distances to A and B
- Stage 3: When "Record Measurement" is clicked, append a row to a log showing: Evidence Item #, Distance to A (cm), Distance to B (cm)

Default parameters:
- Room: 6m × 5m
- Evidence item starting position: roughly center of room
- Reference point A: upper-left corner
- Reference point B: upper-right corner

Behavior:
- Distances update in real time as the evidence item is dragged
- Log panel demonstrates how multiple evidence items are recorded on a sketch sheet
- Simulation recalculates positions accurately using the Pythagorean theorem

Instructional Rationale: An Apply-level objective (calculate triangulation distances) requires the learner to perform the operation themselves. A draggable evidence item with live distance feedback gives immediate confirmation of whether the student understands what is being measured.

Color scheme: Light gray room background, green reference points, orange evidence dot, blue dashed measurement lines.
```

## Related Resources

- [Chapter 2: Crime Scene Investigation and Evidence Collection](../../chapters/02-crime-scene-investigation/index.md)
