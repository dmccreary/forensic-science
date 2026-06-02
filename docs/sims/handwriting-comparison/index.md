---
title: Handwriting Characteristics Comparison MicroSim
description: Identify the key handwriting characteristics used to compare questioned and known writing samples (Bloom Level 1 — Remember; verb: identify).
status: scaffold
library: p5.js
bloom_level: Remember (L1)
---

# Handwriting Characteristics Comparison MicroSim



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 14: Document Examination and Forgery Detection](../../chapters/14-document-examination/index.md).

```text
Type: microsim
**sim-id:** handwriting-comparison<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning Objective: Identify the key handwriting characteristics used to compare questioned and known writing samples (Bloom Level 1 — Remember; verb: identify).

Bloom Level: Remember (L1)
Bloom Verb: Identify

Canvas layout:
- Left panel (~50%): Display of a questioned writing sample (simulated handwriting)
- Right panel (~50%): Display of a known exemplar writing sample

Visual elements:
- Two side-by-side text panels showing simulated cursive writing of the same phrase
- Annotated overlay markers that appear when the user clicks a characteristic
- Characteristic panel at the bottom listing: Line Quality, Slant, Spacing, Letter Formation, Pen Lifts, Baseline

Interactive controls:
- Buttons for each characteristic; clicking highlights that characteristic on both samples
- Toggle button "Authentic / Forged" switches the questioned sample between a high-quality match and a simulated forgery (with tremor and hesitation marks visible)
- Slider: "Magnification" zooms in on the selected characteristic

Data Visibility Requirements:
- Show quantitative slant angle measurement when Slant is selected
- Show color-coded highlights for matching (green) and differing (red) characteristics
- Show a summary panel: "Matching characteristics: N / Differing characteristics: M"

Instructional Rationale: A Remember-level objective (identify characteristics) is best served by a visual comparison tool with labeled annotations, so students can recognize each characteristic before performing their own analysis.

Color scheme: Warm cream background for paper, dark ink for writing, blue highlights for characteristics, green/red for match/difference overlay.
```

## Related Resources

- [Chapter 14: Document Examination and Forgery Detection](../../chapters/14-document-examination/index.md)
