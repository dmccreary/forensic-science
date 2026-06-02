---
title: ABO Blood Typing Interactive Simulator
description: Explain the ABO blood typing procedure and interpret agglutination results to determine blood type (Bloom Level 2 — Understand; verb: interpret).
status: scaffold
library: p5.js
bloom_level: Understand (L2)
---

# ABO Blood Typing Interactive Simulator



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 6: Forensic Serology and Biological Fluid Analysis](../../chapters/06-forensic-serology/index.md).

```text
Type: microsim
**sim-id:** abo-blood-typing<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning Objective: Explain the ABO blood typing procedure and interpret agglutination results to determine blood type (Bloom Level 2 — Understand; verb: interpret).

Bloom Level: Understand (L2)
Bloom Verb: Interpret

Canvas layout:
- Main view (~65%): two test wells side by side (one labeled Anti-A, one labeled Anti-B)
- Control panel (~35%): blood type selection (hidden initially), reaction results, explanation panel

Visual elements:
- Two circular test wells on a slide background
- Animated agglutination: when a reaction occurs, small circles (RBCs) cluster together into visible clumps
- When no reaction occurs, the circles remain evenly dispersed
- A color indicator: agglutination (positive) shown as dark red clumped mass; no agglutination (negative) as smooth reddish tint

Interactive controls:
- A "Select Blood Sample" dropdown with four mystery samples (each corresponds to a blood type)
- "Add Anti-A" and "Add Anti-B" buttons that trigger the well animations
- A "Determine Blood Type" button that reveals the correct answer after the student makes their prediction
- Rh factor add-on: a third well with Anti-D reagent can be shown/hidden

Data Visibility Requirements:
- Stage 1: Show two empty wells
- Stage 2: Student adds reagents; animation shows agglutination or smooth suspension
- Stage 3: Student predicts blood type; "Reveal" button shows correct type with explanation

Behavior:
- Type A: Anti-A well agglutinates; Anti-B well stays clear
- Type B: Anti-B agglutinates; Anti-A clear
- Type AB: Both wells agglutinate
- Type O: Neither well agglutinates

Instructional Rationale: The Understand objective (interpret agglutination results) requires the learner to observe the reaction and connect visual output to underlying chemistry — best achieved by animated simulation rather than text description.

Color scheme: Dark red for agglutination, light reddish tint for clear suspension, white slide background.
```

## Related Resources

- [Chapter 6: Forensic Serology and Biological Fluid Analysis](../../chapters/06-forensic-serology/index.md)
