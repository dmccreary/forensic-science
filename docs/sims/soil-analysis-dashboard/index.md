---
title: Soil Analysis Comparison Dashboard
description: Analyze multiple soil properties together to compare a questioned soil sample to reference samples from known locations (Bloom Level 4 — Analyze; verb: compare).
status: scaffold
library: p5.js
bloom_level: Analyze (L4)
---

# Soil Analysis Comparison Dashboard



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 5: Glass, Soil, and Physical Trace Evidence](../../chapters/05-glass-soil-trace-evidence/index.md).

```text
Type: infographic
**sim-id:** soil-analysis-dashboard<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning Objective: Analyze multiple soil properties together to compare a questioned soil sample to reference samples from known locations (Bloom Level 4 — Analyze; verb: compare).

Bloom Level: Analyze (L4)
Bloom Verb: Compare

Purpose: Allow investigators to compare a questioned soil sample against three reference samples using four analysis criteria simultaneously.

Layout:
- A four-panel comparison dashboard:
  1. Soil color swatches (Munsell color notation)
  2. Particle size distribution bar chart (gravel/sand/silt/clay %)
  3. pH bar (0–14 scale with visual acid/neutral/base gradient)
  4. Gradient tube visualization (band pattern shown as colored stripes at specific heights)
- Three reference samples (A, B, C) are shown as columns; the questioned sample is shown alongside

Interactive controls:
- Click any reference sample column to highlight it and see a side-by-side comparison with the questioned sample
- A "Match Score" button calculates a similarity score based on pH difference, particle size overlap, and color distance
- Hover over any panel to see a tooltip explaining the forensic significance of that comparison criterion
- A "New Case" button loads a different set of reference and questioned samples

Data Visibility Requirements:
- Show specific numeric values for pH and particle size percentages
- The gradient tube shows 4–6 colored bands at specific heights; matching bands align horizontally when two samples are compared
- When user clicks a reference column, highlight matching and non-matching bands in green/red respectively

Default scenario: Questioned soil from suspect's boots compared against Reference A (distant location, different geology), Reference B (nearby location, similar geology), Reference C (exact collection location)

Instructional Rationale: An Analyze-level objective (compare multiple samples across multiple criteria) requires a dashboard where the learner can view and interact with all the data simultaneously, then synthesize a conclusion.

Color scheme: Earthy tones (browns, tans, grays) for soil samples; blue for pH scale; distinct colors for gradient bands.
```

## Related Resources

- [Chapter 5: Glass, Soil, and Physical Trace Evidence](../../chapters/05-glass-soil-trace-evidence/index.md)
