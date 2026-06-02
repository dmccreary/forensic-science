---
title: Fingerprint Pattern Classification Explorer
description: Identify the three fingerprint pattern families and their subtypes using defining structural features (Bloom Level 1 — Remember; verb: identify).
status: scaffold
library: p5.js
bloom_level: Remember (L1)
---

# Fingerprint Pattern Classification Explorer



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 3: Fingerprint Analysis and Dactyloscopy](../../chapters/03-fingerprint-analysis/index.md).

```text
Type: microsim
**sim-id:** fingerprint-pattern-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning Objective: Identify the three fingerprint pattern families and their subtypes using defining structural features (Bloom Level 1 — Remember; verb: identify).

Bloom Level: Remember (L1)
Bloom Verb: Identify

Canvas layout:
- Left panel (~30%): pattern selection menu showing all 8 pattern types (Plain Loop Ulnar, Plain Loop Radial, Plain Whorl, Central Pocket Loop, Double Loop Whorl, Accidental Whorl, Plain Arch, Tented Arch)
- Main display (~70%): enlarged fingerprint diagram for the selected pattern

Visual elements:
- Each pattern rendered as a schematic ridge diagram (not a photograph)
- Key structural features annotated with clickable labels: Core (yellow), Delta (green), Ridge Flow (arrows)
- A "Features" panel at the bottom listing the 2–3 defining characteristics of the selected pattern
- A frequency badge showing "Common: 60%" / "Less common: 35%" / "Rare: 5%" for the three families

Interactive controls:
- Click any pattern in the left menu to load it in the main panel
- Click annotated labels (Core, Delta, etc.) to get a pop-up definition
- A "Quiz Me" mode presents a random pattern and asks the investigator to classify it from a dropdown; correct/wrong feedback with explanation follows

Data Visibility Requirements:
- Stage 1: Show pattern with all annotations visible
- Stage 2 (Quiz mode): Hide annotations, show only the ridge diagram; user must classify before annotations are revealed
- Stage 3 (Quiz feedback): Show correct classification with annotations highlighted and a one-sentence explanation of the key feature that determines the classification

Default view: Ulnar Loop with all annotations visible

Instructional Rationale: A Remember-level objective (identify and classify patterns) is best supported by an interactive labeling interface where learners can self-test with immediate corrective feedback.

Color scheme: Ridges in dark gray on white background. Core highlighted yellow, deltas highlighted green, ridge flow arrows in blue.
```

## Related Resources

- [Chapter 3: Fingerprint Analysis and Dactyloscopy](../../chapters/03-fingerprint-analysis/index.md)
