---
title: Skeletal Sex Indicators Interactive Diagram
description: Identify the pelvic and cranial morphological features used to estimate biological sex from skeletal remains (Bloom Level 1 — Remember; verb: identify).
status: scaffold
library: p5.js
bloom_level: Remember (L1)
---

# Skeletal Sex Indicators Interactive Diagram



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 11: Forensic Anthropology and Skeletal Biology](../../chapters/11-forensic-anthropology/index.md).

```text
Type: infographic
**sim-id:** skeletal-sex-indicators<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning Objective: Identify the pelvic and cranial morphological features used to estimate biological sex from skeletal remains (Bloom Level 1 — Remember; verb: identify).

Bloom Level: Remember (L1)
Bloom Verb: Identify

Purpose: Allow investigators to compare male and female skeletal features side by side for the pelvis and skull.

Layout:
- Left panel: Male pelvis schematic | Right panel: Female pelvis schematic
- Below: Male skull schematic | Female skull schematic
- Each feature labeled with a clickable annotation

Interactive controls:
- Click any labeled feature (subpubic angle, greater sciatic notch, brow ridge, mastoid process, etc.) to reveal a pop-up explaining: (1) what the feature looks like in males vs. females, (2) how reliable this feature is as a sex indicator
- Toggle between "labeled" and "unlabeled" modes for self-testing
- "Quiz Me" mode: highlight a single feature and ask student to predict which sex (male/female) it belongs to

Data Visibility Requirements:
- Each feature pop-up shows a simple line diagram comparing male vs. female morphology side by side
- Shows accuracy percentage for each indicator (e.g., subpubic angle: ~95% accurate; skull features: ~85% accurate)

Instructional Rationale: A Remember-level objective (identify features and their significance) benefits from a labeling/annotation interface where learners can explore each feature interactively and quiz themselves.

Color scheme: Bone in warm tan/ivory; female features highlighted in blue; male features highlighted in red; pop-up panels in white.
```

## Related Resources

- [Chapter 11: Forensic Anthropology and Skeletal Biology](../../chapters/11-forensic-anthropology/index.md)
