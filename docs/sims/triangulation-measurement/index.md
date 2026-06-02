---
title: Triangulation Measurement Technique
description: Drag an evidence item around a scaled room floor plan and read the live triangulation distances from two reference corners, computed with the Pythagorean theorem, then record them to a sketch log (Bloom L3 — Apply).
status: built
library: p5.js
bloom_level: Apply (L3) — calculate triangulation distances to record an evidence item's position on a scaled sketch.
quality_score: 98
image: /sims/triangulation-measurement/triangulation-measurement.png
og:image: /sims/triangulation-measurement/triangulation-measurement.png
twitter:image: /sims/triangulation-measurement/triangulation-measurement.png
social:
   cards: false
---

# Triangulation Measurement Technique

<iframe src="main.html" width="100%" height="602" scrolling="no"></iframe>

[Run the Triangulation Measurement MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

## About This MicroSim

When investigators document a crime scene, they have to record **exactly where**
each piece of evidence was found — accurately enough that the scene could be
reconstructed later in court. One standard method is **triangulation**: measure the
straight-line distance from the item to **two fixed reference points** (often two
corners of the room). Those two distances pin the item to a single spot.

This MicroSim is an overhead floor plan with two reference corners, **A** and **B**.
Drag the orange evidence item anywhere in the room and watch the two distances update
in real time — calculated with the **Pythagorean theorem** — then record each item to a
measurement log, just like filling in a sketch sheet.

## How to Use It

1. The room is shown from above with a **1-meter grid**. Corner **A** (green, upper
   left) and corner **B** (green, upper right) are the fixed reference points.
2. **Drag the orange evidence dot (E)** anywhere inside the room. The two **blue dashed
   lines** show its distance to A and to B in **centimeters**, and the dot shows its
   **(x, y) coordinates** measured from corner A.
3. Use the **Width** and **Length** sliders to resize the room (3 m to 10 m). The
   distances and coordinates recompute for the new layout.
4. Press **Record Measurement** to add the current item to the **measurement log** with
   its number and its distances to A and B.
5. Press **Clear Log** to start a fresh sketch sheet.

## What You Can Learn

- Apply the **triangulation method**: two distances from two fixed points locate an
  object.
- See the **Pythagorean theorem** in action — distance = √(x² + y²) from a corner.
- Read measurements off a **scaled** plan in real units (centimeters).
- Understand how investigators **document** several evidence items on one sketch.

You can embed this MicroSim on your own web page with this iframe:

```html
<iframe src="https://dmccreary.github.io/forensic-science/sims/triangulation-measurement/main.html"
        width="100%" height="602" scrolling="no"></iframe>
```

## Lesson Plan

**Audience:** High-school forensic science (grades 9–12)
**Time:** 8–12 minutes
**Bloom level:** Apply (L3) — calculate.

**Worked example.** Leave the room at 6.0 m × 5.0 m and drag the item to the exact
center. Both distances read **391 cm**. Check it by hand: the item is 3.0 m across and
2.5 m down from corner A, so the distance is √(3.0² + 2.5²) = √15.25 ≈ 3.91 m = 391 cm.
Because the item is centered left-to-right, the distance to B is the same.

**Guided questions:**

- Drag the item into the **corner at A**. What is the distance to A? Why?
- Move the item straight **down the left wall**. Which distance changes faster, the one
  to A or the one to B? Why?
- Place the item 200 cm right of A and 150 cm down. Predict the distance to A *before*
  reading it, using the Pythagorean theorem, then check.
- Why do investigators measure to **two** reference points instead of just one?

**Extension.** Record three evidence items at different spots, then widen the room with
the slider. Explain why the recorded distances would change if you re-measured — and
why a sketch must always note the reference points and the room dimensions, not just
the distances.

## References

- [Crime scene sketch (Wikipedia)](https://en.wikipedia.org/wiki/Crime_scene#Documentation) — documenting evidence positions at a scene.
- [Triangulation (Wikipedia)](https://en.wikipedia.org/wiki/Triangulation) — locating a point from distances/angles to known points.
- [Pythagorean theorem (Wikipedia)](https://en.wikipedia.org/wiki/Pythagorean_theorem) — the right-triangle relationship used to compute the distances.
- [p5.js reference](https://p5js.org/reference/) — the library used to build this simulation.

## Specification

This MicroSim was generated from a specification in
[Chapter 2: Crime Scene Investigation and Evidence Collection](../../chapters/02-crime-scene-investigation/index.md).

> **Design note:** the room is a simplified rectangular plan and distances are
> straight-line ("as the tape measures") values. Real triangulation uses permanent,
> clearly described reference points and at least two measurements per item, and the
> sketch is later drawn to scale with all dimensions recorded.
