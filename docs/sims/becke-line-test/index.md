---
title: Becke Line Test Simulator
description: Describe the Becke line test procedure and interpret the direction of line movement to determine whether the glass or oil has the higher refractive index (Bloom Level 2 — Understand; verb: interpret).
status: scaffold
library: p5.js
bloom_level: Understand (L2)
---

# Becke Line Test Simulator



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 5: Glass, Soil, and Physical Trace Evidence](../../chapters/05-glass-soil-trace-evidence/index.md).

```text
Type: microsim
**sim-id:** becke-line-test<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning Objective: Describe the Becke line test procedure and interpret the direction of line movement to determine whether the glass or oil has the higher refractive index (Bloom Level 2 — Understand; verb: interpret).

Bloom Level: Understand (L2)
Bloom Verb: Interpret

Canvas layout:
- Main view (~65%): circular microscope view simulation showing a glass fragment submerged in oil
- Control panel (~35%): sliders for glass RI and oil RI, stage height adjustment, result readout

Visual elements:
- A simulated microscope field of view (circular, with slight vignetting)
- A glass fragment outline visible in the center
- A bright halo (Becke line) at the glass-oil boundary that moves in the correct direction as stage height is adjusted
- A "RI comparison" readout showing glass RI vs. oil RI

Interactive controls:
- Slider: Glass RI (1.450–1.550)
- Slider: Oil RI (1.450–1.550)
- Slider: Stage height (focus / defocus above / below)
- When stage height > focus: Becke line moves toward higher RI medium
- When stage height < focus: Becke line moves toward lower RI medium
- When glass RI = oil RI (±0.002): Becke line fades out; glass boundary becomes invisible

Data Visibility Requirements:
- Stage 1: Show glass and oil at default RIs; both stage-height directions available
- Stage 2: As stage height slider moves, animate Becke line movement direction
- Stage 3: Show a panel with "Conclusion: Glass RI > Oil RI / Glass RI < Oil RI / Match"
- Provide an oil selection tool (dropdown of 5 oils) to simulate the systematic narrowing process

Instructional Rationale: The Understand objective (interpret Becke line movement) is best served by a simulation that lets students manipulate the RI difference and observe the directional response, rather than just reading a description.

Color scheme: Dark microscope background, gray glass fragment, white/bright halo for Becke line, blue control panel.
```

## Related Resources

- [Chapter 5: Glass, Soil, and Physical Trace Evidence](../../chapters/05-glass-soil-trace-evidence/index.md)
