---
title: ADH minimum-PMI Calculator
description: Calculate a minimum post-mortem interval from accumulated degree-hours and a temperature record (Bloom L3 — Apply).
status: built
library: p5.js
bloom_level: Apply (L3) — calculate minimum post-mortem interval from accumulated degree hours.
quality_score: 98
image: /sims/adh-mpmi-calculator/adh-mpmi-calculator.png
og:image: /sims/adh-mpmi-calculator/adh-mpmi-calculator.png
twitter:image: /sims/adh-mpmi-calculator/adh-mpmi-calculator.png
social:
   cards: false
---

# ADH minimum-PMI Calculator

<iframe src="main.html" width="100%" height="549" scrolling="no"></iframe>

[Run the ADH mPMI Calculator Fullscreen](main.html){ .md-button .md-button--primary }

## About This MicroSim

Blowfly larvae develop at a rate that depends on temperature. Forensic
entomologists exploit this by counting **Accumulated Degree Hours (ADH)** — the
sum, over time, of the temperature above a species-specific **base temperature**.
Each developmental stage requires a known number of degree-hours to reach. By
counting degree-hours *backward* from when a body is discovered until the total
reaches the threshold for the observed stage, an analyst estimates the **minimum
post-mortem interval (mPMI)** — the earliest the death could have occurred.

This MicroSim lets you perform that calculation. Set a 7-day mean-temperature
record, pick a species and larval stage, and watch the cumulative ADH accumulate
back from the discovery day until it crosses the published threshold.

## How to Use It

1. Choose an **insect species** and the **developmental stage** observed on the
   body. The stage sets the ADH threshold.
2. Adjust the **Base Temp** slider (the temperature below which development
   stops — it defaults to the species value).
3. **Click any temperature bar** to select that day, then use the **Day Temp**
   slider to edit its mean temperature.
4. Press **Calculate mPMI**. The orange curve accumulates degree-hours back from
   discovery; the green marker shows where it meets the red threshold line.
5. Read the **minimum PMI** (in days) in the green result panel.

## What You Can Learn

- Calculate accumulated degree-hours from a temperature record and base
  temperature.
- Explain why warmer weather shortens the estimated PMI and cooler weather
  lengthens it.
- Interpret the crossing of cumulative ADH with a stage threshold as the
  earliest possible time of death.

You can embed this MicroSim on your own web page with this iframe:

```html
<iframe src="https://dmccreary.github.io/forensic-science/sims/adh-mpmi-calculator/main.html"
        width="100%" height="547" scrolling="no"></iframe>
```

## Lesson Plan

**Audience:** High-school forensic science (grades 9–12)
**Time:** 15–20 minutes
**Bloom level:** Apply (L3) — calculate minimum PMI.

**Worked calculation.** Walk students through one full calculation by hand for a
single day (`ADH = (meanTemp − base) × 24`), then let them verify the running
total against the simulator's cumulative curve.

**Guided questions:**

- Raise every day's temperature by 5°C. Does the estimated mPMI get longer or
  shorter? Why?
- Switch the species from *Calliphora vicina* (base 2°C) to *Lucilia sericata*
  (base 9°C) at the same temperatures. What happens to the accumulated ADH, and
  why?
- Why is this called the *minimum* PMI rather than the exact time of death?

**Extension.** Have students research real published ADH thresholds and discuss
how measurement error in the temperature record propagates into the mPMI
estimate.

## References

- [Forensic entomology (Wikipedia)](https://en.wikipedia.org/wiki/Forensic_entomology) — using insects to estimate time of death.
- [Growing degree-day (Wikipedia)](https://en.wikipedia.org/wiki/Growing_degree-day) — the accumulated-temperature method adapted here as degree-hours.
- [Post-mortem interval (Wikipedia)](https://en.wikipedia.org/wiki/Post-mortem_interval) — what the calculation estimates.
- [p5.js reference](https://p5js.org/reference/) — the library used to build this simulation.

## Specification

This MicroSim was generated from a specification in
[Chapter 12: Forensic Entomology and Decomposition Analysis](../../chapters/12-forensic-entomology/index.md).

> **Design note:** the specification calls for an editable *hourly* table across
> 7 days (168 values). To keep the interface usable in a small embedded canvas,
> the model uses 7 editable **daily mean** temperatures (ADH = (mean − base) ×
> 24 per day). The ADH thresholds are illustrative reference values for teaching
> the method, not casework figures.
