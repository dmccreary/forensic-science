---
title: STR Electropherogram Comparison
description: Compare a crime-scene DNA profile with a suspect's across five CODIS loci and tally matching loci to include or exclude the suspect (Bloom L4 — Analyze).
status: built
library: p5.js
bloom_level: Analyze (L4) — compare STR peak sets across CODIS loci to include or exclude a suspect.
quality_score: 90
image: /sims/str-electropherogram-comparison/str-electropherogram-comparison.png
og:image: /sims/str-electropherogram-comparison/str-electropherogram-comparison.png
twitter:image: /sims/str-electropherogram-comparison/str-electropherogram-comparison.png
social:
   cards: false
---

# STR Electropherogram Comparison

<iframe src="main.html" width="100%" height="585" scrolling="no"></iframe>

[Run the STR Electropherogram Comparison MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

## About This MicroSim

When a lab profiles DNA, it doesn't read the whole genome — it reads a handful of
**short tandem repeat (STR)** sites called **loci**. At each locus, everyone
carries one or two **alleles**, and an allele is just a count of how many times a
short sequence repeats. **Capillary electrophoresis** turns those counts into an
**electropherogram**: a row of peaks whose left-to-right positions equal the
repeat numbers.

This MicroSim, investigators, puts the crime-scene profile (blue) next to a
suspect's profile (orange) at **five CODIS loci** — D3S1358, vWA, FGA, TH01, and
D8S1179. You choose which of three suspects to test. **Exactly one suspect matches
the scene at every locus; the other two differ somewhere.** Press **Compare Loci**
and the tool tallies the matching loci, flags the first locus where a suspect
differs, and returns an **inclusion** or **exclusion** — the same locus-by-locus
logic a real analyst uses, where a single mismatched locus rules a person out.

## How to Use It

1. Pick a **Suspect** (A, B, or C) from the first dropdown.
2. Use the **Locus** dropdown to focus one locus at full height, or leave it on
   **All loci** to see all five stacked traces at once.
3. Press **View** to switch between **Overlay** (scene and suspect on the same
   axis) and **Side-by-side** (scene on top, suspect below).
4. Read each locus: do the suspect's orange peaks sit at the same repeat numbers
   as the scene's blue peaks?
5. Press **Compare Loci** to tally matches. A green ✓ or red ✗ appears on each
   locus, and the banner reports **5/5 loci match — inclusion** or **differs at
   locus X — exclusion**.
6. Test all three suspects to find the one that cannot be excluded.

## Learning Objective

Analyze crime-scene and suspect STR electropherograms locus by locus to determine
how many CODIS loci match and decide whether to **include** or **exclude** each
suspect — recognizing that one mismatched locus is enough to exclude (Bloom Level
4 — Analyze).
