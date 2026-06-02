---
title: PCR Amplification Step-Through Simulator
description: Explain the three steps of PCR (denaturation, annealing, extension) by tracing what happens to the DNA at each stage (Bloom Level 2 — Understand; verb: explain).
status: scaffold
library: p5.js
bloom_level: Understand (L2)
---

# PCR Amplification Step-Through Simulator



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 8: Forensic DNA Profiling](../../chapters/08-forensic-dna-profiling/index.md).

```text
Type: microsim
**sim-id:** pcr-amplification-simulator<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning Objective: Explain the three steps of PCR (denaturation, annealing, extension) by tracing what happens to the DNA at each stage (Bloom Level 2 — Understand; verb: explain).

Bloom Level: Understand (L2)
Bloom Verb: Explain

Canvas layout:
- Main view (~65%): molecular-level animation of the DNA strands
- Side panel (~35%): temperature display, step label, step description, cycle counter

Visual elements:
- Two complementary DNA strands shown as colored lines (one strand red, one blue) with base pairs as short horizontal bridges
- Primers shown as shorter yellow/green segments
- New DNA synthesis shown as a growing strand in a lighter color
- Temperature gauge on the side panel
- A "copies so far" counter

Interactive controls:
- "Next Step" button advances through: Denature (94°C) → Anneal (60°C) → Extend (72°C)
- "Run Cycle" button runs all three steps automatically with a 1-second pause between
- "Run 5 Cycles" shows the exponential growth of copy count
- Clicking on any DNA component (strand, primer, new strand) reveals a pop-up definition

Data Visibility Requirements:
- Denaturation step: show the hydrogen bond bridges disappearing one by one; temperature rises to 94°C; strands drift apart
- Annealing step: show primers searching and binding to complementary positions; temperature drops to 60°C
- Extension step: show new nucleotides being added one by one from the primer end; temperature rises to 72°C
- After each complete cycle: show copy count double

Instructional Rationale: An Understand objective (explain PCR steps) requires the learner to see the molecular transformation at each step with concrete data (temperature, copy count). Animation with Next-Step control supports prediction before each stage is revealed.

Color scheme: Red and blue for template strands, yellow for primers, light purple for new strand synthesis, gray for enzyme.
```

## Related Resources

- [Chapter 8: Forensic DNA Profiling](../../chapters/08-forensic-dna-profiling/index.md)
