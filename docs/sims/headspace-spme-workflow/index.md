---
title: Headspace SPME Collection to GC-MS Workflow
description: Explain how headspace SPME recovers volatile accelerant residues from arson debris and connects to GC-MS identification (Bloom Level 2 — Understand; verb: explain).
status: scaffold
library: p5.js
bloom_level: Understand (L2)
---

# Headspace SPME Collection to GC-MS Workflow



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 10: Fire Investigation, Arson, and Explosives](../../chapters/10-fire-arson-explosives/index.md).

```text
Type: workflow
**sim-id:** headspace-spme-workflow<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning Objective: Explain how headspace SPME recovers volatile accelerant residues from arson debris and connects to GC-MS identification (Bloom Level 2 — Understand; verb: explain).

Bloom Level: Understand (L2)
Bloom Verb: Explain

Purpose: Walk investigators through the arson debris collection → sealed container → SPME extraction → GC-MS identification pipeline.

Visual layout:
- Horizontal workflow with five stations:
  1. Fire scene debris collection → sealed airtight can
  2. Debris in sealed can (headspace vapors accumulating)
  3. SPME fiber inserted into headspace
  4. SPME fiber injected into GC-MS instrument
  5. GC-MS chromatogram showing accelerant peaks

Interactive elements:
- Click each station to open a detail panel with description and why each step is necessary
- An animated "vapor molecules" simulation in Station 2 shows molecules moving from the debris into the headspace above
- Station 5 shows an interactive chromatogram: clicking each peak reveals the compound name and its role in identifying the accelerant type (gasoline, lighter fluid, kerosene)

Data Visibility Requirements:
- Station 2: show vapor concentration building in headspace over time (accumulation animation)
- Station 5: show a realistic chromatogram with labeled peaks (C6–C12 hydrocarbons for gasoline); clicking a peak reveals its identity and retention time
- Show the "reference accelerant match" panel comparing the questioned sample pattern to a gasoline standard

Color scheme: Orange and red for fire/heat elements, blue for analytical equipment, green for confirmed identification.

Instructional Rationale: An Understand objective (explain the SPME-to-GC-MS workflow) requires a step-through diagram where each stage is visually distinct and clickable — so learners can connect the physical procedure to the analytical output.
```

## Related Resources

- [Chapter 10: Fire Investigation, Arson, and Explosives](../../chapters/10-fire-arson-explosives/index.md)
