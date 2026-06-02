---
title: Chain of Custody Flow
description: Trace the chain of custody for an evidence item from collection to court and identify required documentation at each transfer (Bloom Level 2 — Understand; verb: explain).
status: scaffold
library: p5.js
bloom_level: Understand (L2)
---

# Chain of Custody Flow



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 2: Crime Scene Investigation and Evidence Collection](../../chapters/02-crime-scene-investigation/index.md).

```text
Type: workflow
**sim-id:** chain-of-custody-flow<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning Objective: Trace the chain of custody for an evidence item from collection to court and identify required documentation at each transfer (Bloom Level 2 — Understand; verb: explain).

Bloom Level: Understand (L2)
Bloom Verb: Explain

Purpose: Visualize the flow of physical evidence from crime scene collection through laboratory analysis to courtroom presentation.

Visual layout:
- Horizontal workflow with six labeled stations:
  1. Crime Scene (collection officer)
  2. Evidence Packaging and Labeling
  3. Scene Supervisor / Lead Investigator
  4. Evidence Custodian (evidence room)
  5. Laboratory Analyst
  6. Courtroom (prosecutor / evidence clerk)
- Arrows connecting stations with labels showing what is signed at each transfer

Interactive elements:
- Click any station to open an info panel showing: (1) who is responsible, (2) what documentation is completed, (3) what happens if this step is skipped
- A "Break the Chain" mode lets students click to remove a signature at any step and see a red "INADMISSIBLE" warning appear over the evidence path
- Hover over arrows to see the form fields required at that transfer

Data Visibility Requirements:
- Each station shows specific form fields (item ID, date, signature, condition notes)
- The "Break the Chain" simulation highlights which step was broken and explains why that break matters legally

Steps with hover detail:
1. Crime Scene: "Officer collects item, assigns evidence number, photographs in place."
2. Packaging: "Evidence packaged per type, labeled, sealed with evidence tape."
3. Supervisor Review: "Lead investigator verifies documentation before transport."
4. Evidence Room: "Custodian logs item into property management system; item placed in secure storage."
5. Laboratory: "Analyst signs out item, performs tests, documents results, returns item sealed."
6. Court: "Prosecutor or clerk signs item into court exhibit log; item presented with full documentation."

Color scheme: Blue for active investigators, green for intact chain, red for broken chain / inadmissible warning, gray for storage.

Instructional Rationale: A step-through workflow with "break the chain" interactivity lets students explore consequences rather than memorize rules, which is appropriate for an Understand-level objective.
```

## Related Resources

- [Chapter 2: Crime Scene Investigation and Evidence Collection](../../chapters/02-crime-scene-investigation/index.md)
