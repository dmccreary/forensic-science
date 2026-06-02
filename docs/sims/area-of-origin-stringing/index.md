---
title: Area-of-Origin Stringing
description: Determine the 3D area of origin of a blood source using stain direction and angle-of-impact data (Bloom L3 — Apply).
status: built
library: p5.js
bloom_level: Apply (L3) — determine the 3D area of origin from stain direction and angle data.
quality_score: 98
image: /sims/area-of-origin-stringing/area-of-origin-stringing.png
og:image: /sims/area-of-origin-stringing/area-of-origin-stringing.png
twitter:image: /sims/area-of-origin-stringing/area-of-origin-stringing.png
social:
   cards: false
---

# Area-of-Origin Stringing

<iframe src="main.html" width="100%" height="502" scrolling="no"></iframe>

[Run the Area-of-Origin Stringing MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

## About This MicroSim

Once an analyst knows the **direction** and **angle of impact** of several
bloodstains, those stains can be traced backward through space to locate where
the blood came from. Classically this was done with physical **strings** pinned
to each stain and run back at the measured angle; the place where the strings
cross is the **area of origin** of the source.

This MicroSim shows a pseudo-3D room with five floor stains. Add a string to
each stain, then find the point in the air where they converge — and read its
x, y, z position in metres.

## How to Use It

1. **Click a stain** on the floor to read its width, length, and calculated
   angle of impact.
2. Press **Add String** to project a string back from each stain (in order) at
   its angle.
3. With at least two strings up, press **Find Intersection** to highlight the
   green convergence zone and read its (x, y, z) coordinates.
4. Drag the **Source height** slider and watch the strings re-slope and the
   convergence zone rise or fall. Press **Reset** to start over.

## What You Can Learn

- Apply stain direction and angle-of-impact data to locate a source in 3D.
- Explain why multiple stains are needed — a single string only gives a line,
  not a point.
- Interpret the convergence height (about 1.2 m here) as evidence about the
  source's position, such as a standing or seated person.

You can embed this MicroSim on your own web page with this iframe:

```html
<iframe src="https://dmccreary.github.io/forensic-science/sims/area-of-origin-stringing/main.html"
        width="100%" height="502" scrolling="no"></iframe>
```

## Lesson Plan

**Audience:** High-school forensic science (grades 9–12)
**Time:** 15–20 minutes
**Bloom level:** Apply (L3) — determine the area of origin.

**Walk-through.** Add strings one at a time and ask the class to predict where
they will cross before pressing Find Intersection. Then move the height slider
and discuss how the convergence point tracks the true source.

**Guided questions:**

- Why does one string alone fail to pin down the source?
- The convergence sits about 1.2 m above the floor. What does that suggest about
  the source's height?
- If a stain's angle were measured incorrectly, what would happen to the
  convergence zone?

**Extension.** Connect this to the
[Angle-of-Impact Calculator](../angle-of-impact-calculator/index.md): the angle
each string uses comes directly from a stain's width-to-length ratio.

## References

- [Bloodstain pattern analysis (Wikipedia)](https://en.wikipedia.org/wiki/Bloodstain_pattern_analysis) — directionality, angle of impact, and area of origin.
- [Area of convergence and origin](https://en.wikipedia.org/wiki/Bloodstain_pattern_analysis#Area_of_convergence_and_area_of_origin) — the stringing method.
- [p5.js reference](https://p5js.org/reference/) — the library used to build this simulation.

## Specification

This MicroSim was generated from a specification in
[Chapter 7: Bloodstain Pattern Analysis](../../chapters/07-bloodstain-pattern-analysis/index.md).

> **Design note:** the room uses a 2D axonometric projection rather than true
> 3D. The five strings are constructed to pass through one source point so the
> convergence is clean for teaching; instead of per-stain angle sliders (which
> would prevent convergence), a single **Source height** control moves the true
> origin so students can watch the strings and convergence zone respond.
