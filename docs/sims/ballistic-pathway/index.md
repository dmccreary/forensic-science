---
title: Firearms Ballistic Pathway Interactive Diagram
description: Identify the three ballistic phases and the key evidence produced at each stage (Bloom Level 1 — Remember; verb: identify).
status: scaffold
library: p5.js
bloom_level: Remember (L1)
---

# Firearms Ballistic Pathway Interactive Diagram



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 13: Firearms, Ballistics, and Toolmark Examination](../../chapters/13-firearms-and-ballistics/index.md).

```text
Type: infographic
**sim-id:** ballistic-pathway<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning Objective: Identify the three ballistic phases and the key evidence produced at each stage (Bloom Level 1 — Remember; verb: identify).

Bloom Level: Remember (L1)
Bloom Verb: Identify

Purpose: Visualize the complete ballistic pathway from trigger pull to wound, with interactive identification of evidence at each stage.

Layout:
- Horizontal diagram showing three labeled sections: Internal (inside firearm), External (flight), Terminal (impact)
- Illustrated cross-section of the firearm barrel, a simplified bullet flight arc, and a target at the end
- Evidence items labeled at each stage: rifling marks, breech face impression, GSR emission, trajectory angle, wound characteristics

Interactive controls:
- Click any labeled evidence item to open a detail panel: what it is, when it is produced, and how it is collected and analyzed
- Hover over the barrel cross-section to see animated rifling striations forming on the bullet
- Click the "Entry wound" and "Exit wound" regions to see comparison descriptions

Data Visibility Requirements:
- Show specific class characteristics (number of lands and grooves, twist direction) that can be determined from the bullet
- Show GSR emission direction from the firearm during discharge
- Show wound morphology differences between entry and exit

Instructional Rationale: A Remember objective (identify evidence at each ballistic stage) is best served by an annotated diagram where each evidence item is labeled and clickable for definition and collection procedure.

Color scheme: Gun metal gray for firearm, red for trajectory line, blue for evidence labels, tan for wound area.
```

## Related Resources

- [Chapter 13: Firearms, Ballistics, and Toolmark Examination](../../chapters/13-firearms-and-ballistics/index.md)
