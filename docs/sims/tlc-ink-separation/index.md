---
title: TLC Ink Separation Interactive Diagram
description: Explain how TLC separates ink dye components for comparison, and interpret a TLC result as matching or non-matching (Bloom Level 2 — Understand; verb: explain).
status: scaffold
library: p5.js
bloom_level: Understand (L2)
---

# TLC Ink Separation Interactive Diagram



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 14: Document Examination and Forgery Detection](../../chapters/14-document-examination/index.md).

```text
Type: microsim
**sim-id:** tlc-ink-separation<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning Objective: Explain how TLC separates ink dye components for comparison, and interpret a TLC result as matching or non-matching (Bloom Level 2 — Understand; verb: explain).

Bloom Level: Understand (L2)
Bloom Verb: Explain

Canvas layout:
- Left panel (~40%): TLC plate visualization showing spotted inks, solvent front, and separated spots
- Right panel (~60%): Controls and result interpretation

Visual elements:
- Animated TLC plate showing solvent front rising from bottom to top
- Dye component spots appearing and migrating as the solvent front rises
- Multiple lanes: Questioned sample, Known Reference 1, Known Reference 2, Known Reference 3
- Rf value labels appear next to each spot when analysis is complete
- Toggle: White Light / UV Light mode (UV reveals additional fluorescent spots)

Interactive controls:
- Dropdown: Select questioned ink type (ballpoint, rollerball, gel pen, fountain pen)
- Dropdown: Select reference inks for comparison lanes
- Button: "Run Chromatography" — animates solvent front rise and spot migration
- Button: "Toggle UV" — switches visualization to UV fluorescence mode
- Button: "Calculate Rf" — overlays Rf value calculations

Data Visibility Requirements:
- Show solvent front distance and component distances used to calculate Rf
- Show color-coded match indicators: green checkmark when questioned Rf matches a reference; red X when it does not
- Show a "Match Determination" panel: "Questioned ink matches Reference 2 formulation (3/3 components matched)"

Instructional Rationale: An Understand objective (explain TLC separation and interpret results) benefits from an animated, interactive chromatography simulation where students can run the separation and read the Rf comparisons themselves.

Color scheme: White TLC plate background, colored dye spots, blue solvent front, green/red match indicators.
```

## Related Resources

- [Chapter 14: Document Examination and Forgery Detection](../../chapters/14-document-examination/index.md)
