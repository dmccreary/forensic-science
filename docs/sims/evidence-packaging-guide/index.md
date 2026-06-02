---
title: Evidence Packaging Decision Guide
description: Select the correct packaging material for a given evidence type (Bloom Level 3 — Apply; verb: select).
status: scaffold
library: p5.js
bloom_level: Apply (L3)
---

# Evidence Packaging Decision Guide



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 2: Crime Scene Investigation and Evidence Collection](../../chapters/02-crime-scene-investigation/index.md).

```text
Type: infographic
**sim-id:** evidence-packaging-guide<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning Objective: Select the correct packaging material for a given evidence type (Bloom Level 3 — Apply; verb: select).

Bloom Level: Apply (L3)
Bloom Verb: Select

Purpose: Walk investigators through a decision interface for evidence packaging selection.

Layout:
- Left column: clickable list of evidence categories (biological wet, biological dry, trace/dry, sharp, firearm, digital, biohazard, impression)
- Right panel: when a category is selected, the panel shows: (1) correct packaging image/icon, (2) reason in one sentence, (3) common mistake to avoid

Visual elements:
- Illustrated icons for each packaging material (paper bag, biohazard container, rigid box, faraday bag, druggist fold sequence)
- Color-coded by evidence module: red = biological, orange = biohazard, blue = trace, gray = digital
- A "Druggist Fold Tutorial" button that launches a 4-step animated fold sequence

Interactive controls:
- Click on an evidence category to load the right-panel explanation
- "Druggist Fold Tutorial" shows the four fold steps with a "Next Step" button
- Hover over any packaging icon to see its name and a one-line description

Data Visibility Requirements:
- When user selects "Wet Biological": show paper bag, display "Wet blood in plastic → mold in 24h → DNA destroyed"
- When user selects "Trace Dry": show druggist fold steps with actual fold angles
- For each selection, show a "Courtroom Risk" line summarizing the consequence of using wrong packaging

Instructional Rationale: An Apply-level objective (select packaging) is best served by a decision interface where the learner actively chooses and receives immediate, specific feedback — including the consequence of a wrong choice.

Color scheme: Each evidence category has a distinct accent color; background is neutral white with subtle gray panels.
```

## Related Resources

- [Chapter 2: Crime Scene Investigation and Evidence Collection](../../chapters/02-crime-scene-investigation/index.md)
