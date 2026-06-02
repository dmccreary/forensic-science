---
title: Becke Line Test Simulator
description: Interpret which way the bright Becke line moves to decide whether glass or oil has the higher refractive index (Bloom L2 — Understand).
status: built
library: p5.js
bloom_level: Understand (L2) — interpret Becke line movement to compare refractive indices.
quality_score: 98
image: /sims/becke-line-test/becke-line-test.png
og:image: /sims/becke-line-test/becke-line-test.png
twitter:image: /sims/becke-line-test/becke-line-test.png
social:
   cards: false
---

# Becke Line Test Simulator

<iframe src="main.html" width="100%" height="512" scrolling="no"></iframe>

[Run the Becke Line Test MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

## About This MicroSim

To identify a glass fragment, an examiner measures its **refractive index (RI)**
by immersing it in oils of known RI. When the glass and oil RIs differ, a bright
rim of light — the **Becke line** — appears at the boundary. As you change the
focus (stage height), that line moves, and *which way it moves* tells you which
medium has the higher RI:

- **Raise the stage** → the Becke line moves into the medium with the **higher**
  refractive index.
- **Lower the stage** → it moves into the **lower**-RI medium.
- When glass and oil RIs are **equal**, the line disappears and the fragment
  becomes nearly invisible — that is the **match**.

This MicroSim recreates the microscope field of view so you can manipulate the
RI difference and read the directional response.

## How to Use It

1. Set the **Glass RI** and **Oil RI** sliders (or pick a calibrated **oil
   preset** from the dropdown).
2. Drag the **Stage height** slider above or below focus and watch the white
   Becke line shift into the glass or the oil.
3. Read the **Conclusion** panel: *Glass RI > Oil RI*, *Glass RI < Oil RI*, or
   *Match*.
4. Narrow in on a match by trying successive oils until the fragment vanishes.

## What You Can Learn

- Describe the Becke line test procedure for comparing refractive indices.
- Interpret the Becke line's direction of motion as you change stage height.
- Conclude whether the glass RI is greater than, less than, or equal to the oil.

You can embed this MicroSim on your own web page with this iframe:

```html
<iframe src="https://dmccreary.github.io/forensic-science/sims/becke-line-test/main.html"
        width="100%" height="512" scrolling="no"></iframe>
```

## Lesson Plan

**Audience:** High-school forensic science (grades 9–12)
**Time:** 15–20 minutes
**Bloom level:** Understand (L2) — interpret.

**Warm-up.** Remind students that a higher RI bends light more. Pose: "If the
glass bends light more than the oil, and we raise the focus, which way will the
bright line move?"

**Guided questions:**

- With Glass n = 1.520 and Oil n = 1.490, raise the stage. Into which medium
  does the Becke line move, and why?
- How do you produce a "match," and what does the field of view look like then?
- Why is the systematic narrowing process (trying several oils) more reliable
  than a single observation?

**Extension.** Discuss how temperature and wavelength affect oil RI, and why
forensic labs control both during the test.

## References

- [Becke line test (Wikipedia)](https://en.wikipedia.org/wiki/Becke_line_test) — procedure and interpretation.
- [Refractive index (Wikipedia)](https://en.wikipedia.org/wiki/Refractive_index) — the property being compared.
- [Glass analysis in forensic science](https://en.wikipedia.org/wiki/Glass#Forensic_analysis) — context for RI as trace evidence.
- [p5.js reference](https://p5js.org/reference/) — the library used to build this simulation.

## Specification

This MicroSim was generated from a specification in
[Chapter 5: Glass, Soil, and Physical Trace Evidence](../../chapters/05-glass-soil-trace-evidence/index.md).

> **Design note:** the optics are modeled qualitatively for teaching — the
> Becke line offsets toward the higher-RI medium when the stage is raised and
> fades within ±0.002 RI of a match. The fragment outline and vignette are
> stylized, not a ray-traced simulation. RI sliders and stage height use p5
> DOM controls; an oil-preset dropdown drives the systematic narrowing process.
