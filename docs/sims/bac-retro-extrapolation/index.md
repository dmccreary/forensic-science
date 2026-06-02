---
title: BAC Retro-Extrapolation
description: Calculate BAC with the Widmark formula and retro-extrapolate it back to an earlier event time (Bloom L3 — Apply).
status: built
library: p5.js
bloom_level: Apply (L3) — calculate BAC with the Widmark formula and perform a retro-extrapolation.
quality_score: 98
image: /sims/bac-retro-extrapolation/bac-retro-extrapolation.png
og:image: /sims/bac-retro-extrapolation/bac-retro-extrapolation.png
twitter:image: /sims/bac-retro-extrapolation/bac-retro-extrapolation.png
social:
   cards: false
---

# BAC Retro-Extrapolation

<iframe src="main.html" width="100%" height="517" scrolling="no"></iframe>

[Run the BAC Retro-Extrapolation MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

## About This MicroSim

Blood alcohol concentration (**BAC**) is often measured hours after a relevant
event such as driving. Because alcohol leaves the body at a roughly steady rate
during the elimination phase, a toxicologist can work *backward* — a process
called **retro-extrapolation** — to estimate what the BAC was at the earlier
event time.

This MicroSim does both halves of that job. The left panel computes peak BAC
with the **Widmark formula**; the right panel graphs BAC over time and lets you
drag an event-time marker to read the retro-extrapolated value.

## How to Use It

1. Set **sex**, **weight**, and **number of drinks** — the panel shows each step
   of the Widmark calculation and the peak BAC.
2. Set the **blood-draw time** (hours after the last drink) and the
   **elimination rate** β.
3. **Drag the gray marker** on the graph to the event time (e.g., time of
   driving).
4. Press **Calculate** to reveal the retro-extrapolation arithmetic and the BAC
   at the event time — colored red if it is over the 0.08% legal limit.
5. Toggle **Show absorption phase** to add the pre-peak rising curve.

## What You Can Learn

- Calculate peak BAC from body weight, sex, and drinks using the Widmark formula.
- Retro-extrapolate a measured BAC backward to an earlier time.
- Explain why a BAC under the limit at the blood draw can still mean the person
  was over the limit while driving.

You can embed this MicroSim on your own web page with this iframe:

```html
<iframe src="https://dmccreary.github.io/forensic-science/sims/bac-retro-extrapolation/main.html"
        width="100%" height="517" scrolling="no"></iframe>
```

## Lesson Plan

**Audience:** High-school forensic science (grades 9–12)
**Time:** 15–20 minutes
**Bloom level:** Apply (L3) — calculate and retro-extrapolate.

**Worked example.** Male, 80 kg, 4 drinks. Compute A = 56 g, peak ≈ 0.103%. Set
draw = 3 h, event = 1 h, β = 0.015. Have students compute BAC at event by hand
before pressing Calculate.

**Guided questions:**

- The measured BAC at the draw is below 0.08%. Could the driver still have been
  over the limit two hours earlier? Show the arithmetic.
- How does a larger body weight change the peak BAC?
- Why is retro-extrapolation only valid during the elimination phase, not during
  absorption?

**Extension.** Discuss the legal assumptions and uncertainties (unknown drinking
pattern, individual variation in β) that make retro-extrapolation contested in
court.

## References

- [Blood alcohol content (Wikipedia)](https://en.wikipedia.org/wiki/Blood_alcohol_content) — definition and limits.
- [Widmark formula](https://en.wikipedia.org/wiki/Blood_alcohol_content#Estimation) — estimating BAC from dose and body water.
- [Forensic toxicology (Wikipedia)](https://en.wikipedia.org/wiki/Forensic_toxicology) — context for BAC casework.
- [p5.js reference](https://p5js.org/reference/) — the library used to build this simulation.

## Specification

This MicroSim was generated from a specification in
[Chapter 9: Forensic Toxicology and Chemical Analysis](../../chapters/09-forensic-toxicology/index.md).

> **Design note:** the model uses 14 g of ethanol per US standard drink and the
> classic Widmark r-values (0.68 male, 0.55 female). Numbers are illustrative for
> teaching the method, not for casework. The event-time marker is positioned by
> dragging it on the graph rather than with a separate slider.
