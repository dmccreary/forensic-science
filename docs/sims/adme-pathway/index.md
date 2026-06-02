---
title: ADME Pathway Interactive Flow Diagram
description: Explain the ADME pharmacokinetic pathway and describe what happens to a drug at each stage (Bloom Level 2 — Understand; verb: explain).
status: scaffold
library: p5.js
bloom_level: Understand (L2)
---

# ADME Pathway Interactive Flow Diagram



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 9: Forensic Toxicology and Chemical Analysis](../../chapters/09-forensic-toxicology/index.md).

```text
Type: infographic
**sim-id:** adme-pathway<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning Objective: Explain the ADME pharmacokinetic pathway and describe what happens to a drug at each stage (Bloom Level 2 — Understand; verb: explain).

Bloom Level: Understand (L2)
Bloom Verb: Explain

Purpose: Visualize the journey of a drug through the body's four pharmacokinetic phases.

Layout:
- A simplified body outline with four labeled regions: GI tract (Absorption), Bloodstream/Tissues (Distribution), Liver (Metabolism), Kidneys/Lungs (Elimination)
- Animated colored dots (representing drug molecules) travel along the pathway

Interactive elements:
- Click each body region to open a panel describing that ADME phase, what organs are involved, and how long each phase typically takes
- A "Drug Type" dropdown lets students select oral vs. IV vs. inhaled; the animation speed changes to reflect onset time differences
- A timeline at the bottom shows how blood concentration changes over time (peak, then decline) as the drug moves through ADME phases

Data Visibility Requirements:
- Show actual drug concentration values at each stage
- Show a blood-concentration-over-time curve updating as ADME phases proceed
- Display the detection window for urine vs. blood vs. hair at any given time point

Instructional Rationale: A step-through animated ADME diagram connects abstract pharmacokinetic concepts to a concrete visual model of what happens inside the body after drug administration.

Color scheme: Body silhouette in gray outline; drug molecules as orange dots; liver in brown; kidneys in purple; blood vessels in red.
```

## Related Resources

- [Chapter 9: Forensic Toxicology and Chemical Analysis](../../chapters/09-forensic-toxicology/index.md)
