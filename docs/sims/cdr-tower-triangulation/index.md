---
title: CDR & Tower Triangulation Timeline
description: Use Call Detail Records and cell-tower data to reconstruct a device's movement and trilaterate its location (Bloom L3 — Apply).
status: built
library: p5.js
bloom_level: Apply (L3) — use CDR and tower data to reconstruct device movement.
quality_score: 98
image: /sims/cdr-tower-triangulation/cdr-tower-triangulation.png
og:image: /sims/cdr-tower-triangulation/cdr-tower-triangulation.png
twitter:image: /sims/cdr-tower-triangulation/cdr-tower-triangulation.png
social:
   cards: false
---

# CDR & Tower Triangulation Timeline

<iframe src="main.html" width="100%" height="517" scrolling="no"></iframe>

[Run the CDR & Tower Triangulation MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

## About This MicroSim

Every call a phone makes is logged in a **Call Detail Record (CDR)**: the time,
the call type, the duration, and the **cell tower** that carried it. Because
each tower covers a known area, an investigator can place a device on a map at
each moment and **reconstruct its movement** over time.

This MicroSim pairs a coverage map (left) with a CDR table (right). Play the
timeline to watch the device travel between towers in chronological order, then
turn on the **trilateration** overlay to see how three tower ranges pin down an
estimated location with an uncertainty radius.

## How to Use It

1. Read the **CDR table** — the rows are in time order, each naming the tower
   that handled the call.
2. **Click a row** to highlight that tower (green) on the map.
3. Press **▶ Play Timeline** to animate the orange device icon along its path;
   adjust the **Playback speed** slider as needed.
4. Press **Show Triangulation** to display three range circles from three
   towers converging on the estimated location, with the ranges (in metres) and
   the uncertainty radius.

## What You Can Learn

- Use CDR rows (time and tower ID) to order a device's tower contacts.
- Reconstruct geographic movement by mapping those contacts over time.
- Apply trilateration to estimate a location from three tower ranges and state
  its uncertainty.

You can embed this MicroSim on your own web page with this iframe:

```html
<iframe src="https://dmccreary.github.io/forensic-science/sims/cdr-tower-triangulation/main.html"
        width="100%" height="517" scrolling="no"></iframe>
```

## Lesson Plan

**Audience:** High-school forensic science (grades 9–12)
**Time:** 20–25 minutes
**Bloom level:** Apply (L3) — use.

**Worked example.** Have students list the seven tower contacts in order, then
predict the shape of the path before pressing Play. Compare their sketch to the
animated route.

**Guided questions:**

- Between 09:35 and 09:52 the device jumps from tower B-204 to C-073. Roughly
  how far did it travel, and how fast must it have moved?
- With Show Triangulation on, why do three circles give a single estimate while
  two would leave an ambiguity?
- What does the uncertainty radius represent, and what would shrink it?

**Extension.** Discuss why a single tower contact only proves the device was
*somewhere in that tower's coverage*, not at the tower — a common
misinterpretation in court.

## References

- [Call detail record (Wikipedia)](https://en.wikipedia.org/wiki/Call_detail_record) — what a CDR contains.
- [Trilateration (Wikipedia)](https://en.wikipedia.org/wiki/Trilateration) — locating a point from three ranges.
- [Mobile phone tracking (Wikipedia)](https://en.wikipedia.org/wiki/Mobile_phone_tracking) — cell-site location methods and limits.
- [p5.js reference](https://p5js.org/reference/) — the library used to build this simulation.

## Specification

This MicroSim was generated from a specification in
[Chapter 17: Cell Phone Analytics and Mobile Forensics](../../chapters/17-cell-phone-analytics/index.md).

> **Design note:** towers, coverage radii, CDR rows, and the trilateration
> estimate are illustrative sample data for teaching the method, not real
> network data. The map spans about 5 km across to give an approximate
> metres-per-pixel readout. The "export a text timeline" requirement from the
> spec is represented on-canvas by the chronological timeline bar rather than a
> file download. Trilateration is drawn geometrically: three range circles are
> sized to pass through the estimated point so they converge cleanly.
