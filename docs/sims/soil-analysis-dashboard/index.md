---
title: Soil Analysis Comparison Dashboard
description: Compare a questioned soil sample to three reference samples across Munsell color, particle size, pH, and density-gradient banding at once, then score the match (Bloom L4 — Analyze).
status: built
library: p5.js
bloom_level: Analyze (L4) — compare a questioned soil sample to reference samples across multiple properties simultaneously.
quality_score: 98
image: /sims/soil-analysis-dashboard/soil-analysis-dashboard.png
og:image: /sims/soil-analysis-dashboard/soil-analysis-dashboard.png
twitter:image: /sims/soil-analysis-dashboard/soil-analysis-dashboard.png
social:
   cards: false
---

# Soil Analysis Comparison Dashboard

<iframe src="main.html" width="100%" height="602" scrolling="no"></iframe>

[Run the Soil Analysis Dashboard Fullscreen](main.html){ .md-button .md-button--primary }

## About This MicroSim

Soil is one of the most useful kinds of trace evidence because it is **different
almost everywhere**. The dirt on a suspect's boots carries a fingerprint of where
they have been — its color, the mix of gravel, sand, silt and clay, its acidity, and
the layers it forms when spun in a density column.

This dashboard puts a **questioned** soil sample (from a suspect's boots) next to
**three reference samples** from known locations and lets you compare all four
**criteria at once**. You decide which reference best matches the questioned soil, and
the **Match Score** button checks your reasoning with a number.

## How to Use It

1. The dashboard has **four panels**, one per comparison criterion:
    - **Soil Color (Munsell):** standardized color chips and their notation.
    - **Particle Size (%):** a stacked bar of gravel / sand / silt / clay.
    - **pH (0–14):** each sample's acidity marked on an acid-to-base scale.
    - **Density-Gradient Bands:** the layered pattern the soil forms in a column.
2. Each panel shows the same four samples as columns: **Questioned** (orange) and
   **References A, B, C**.
3. **Click any reference column (A, B, or C)** to select it. It is highlighted across
   every panel for a side-by-side comparison with the questioned sample.
4. In the gradient-tube panel, the selected reference's bands are outlined **green**
   where they line up with a questioned band and **red** where they do not.
5. Press **Match Score** to compute a weighted similarity (color, pH, particle size,
   and band match) as a percentage.
6. Press **New Case** to load a different questioned sample and reference set.
7. **Hover** over any panel for a note on why that criterion matters in court.

## What You Can Learn

- Compare two soil samples across **four independent properties** instead of just one.
- See why a single matching property is weak evidence but agreement across **all
  four** is strong.
- Read real numbers — pH and particle-size percentages — rather than eyeballing.
- Understand how a **density-gradient column** separates soil into mineral bands and
  why matching bands are so discriminating.

You can embed this MicroSim on your own web page with this iframe:

```html
<iframe src="https://dmccreary.github.io/forensic-science/sims/soil-analysis-dashboard/main.html"
        width="100%" height="602" scrolling="no"></iframe>
```

## Lesson Plan

**Audience:** High-school forensic science (grades 9–12)
**Time:** 10–15 minutes
**Bloom level:** Analyze (L4) — compare.

**Worked example.** In the default case, click **Reference A** and press **Match
Score** — it scores low, with a high pH, a sandy particle mix, and mostly red
(non-aligning) gradient bands. Now click **Reference C** and score it again: the color,
pH, particle ratios, and bands all agree, and the score is high. Reference C is the
soil's true collection location.

**Guided questions:**

- Which reference matches the questioned sample on **color** but not on **pH**? What
  does that tell you about relying on color alone?
- Look only at the **particle-size** panel. Which reference has the most similar
  gravel/sand/silt/clay mix to the questioned sample?
- In the **gradient-tube** panel, which reference has the most green (matching) bands?
  Why are aligned bands such strong evidence?
- Rank References A, B, and C from best match to worst, then check your ranking with
  the Match Score. Did any criterion mislead you on its own?

**Extension.** Press **New Case** and work through it without looking at the Match
Score first. Write down which reference you think matches and your reasoning across all
four criteria, then reveal the score to check yourself.

## References

- [Forensic soil analysis (Wikipedia)](https://en.wikipedia.org/wiki/Forensic_soil_analysis) — using soil as trace evidence.
- [Munsell color system (Wikipedia)](https://en.wikipedia.org/wiki/Munsell_color_system) — the standard way to describe soil color.
- [Soil texture (Wikipedia)](https://en.wikipedia.org/wiki/Soil_texture) — gravel, sand, silt, and clay fractions.
- [Soil pH (Wikipedia)](https://en.wikipedia.org/wiki/Soil_pH) — how and why soil acidity varies by location.
- [p5.js reference](https://p5js.org/reference/) — the library used to build this simulation.

## Specification

This MicroSim was generated from a specification in
[Chapter 5: Glass, Soil, and Physical Trace Evidence](../../chapters/05-glass-soil-trace-evidence/index.md).

> **Design note:** the samples, colors, and band patterns are **illustrative teaching
> data**, not measurements from a real case. Real soil comparison uses many more
> properties (mineralogy, pollen, microfossils, organic content) and is reported by a
> qualified examiner rather than a single percentage.
