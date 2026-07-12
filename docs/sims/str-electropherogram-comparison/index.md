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

You can embed this MicroSim on your own web page with this iframe:

```html
<iframe src="https://dmccreary.github.io/forensic-science/sims/str-electropherogram-comparison/main.html"
        width="100%" height="585" scrolling="no"></iframe>
```

## Lesson Plan

**Audience:** High-school forensic science (grades 9–12)
**Time:** 15–20 minutes
**Bloom level:** Analyze (L4) — compare STR peak sets across CODIS loci to include or exclude a suspect.

**Warm-up.** Ask investigators: "A lab does not read your whole genome — it reads
a few repeat sites called loci. If a suspect's peaks match the crime scene at four
loci but differ at the fifth, are they included or excluded?"

**Guided questions:**

- Compare each of the three suspects locus by locus. What does a peak's
  left-to-right position represent, and what does it mean when two peaks sit at
  the same position?
- Why is a *single* mismatched locus enough to exclude a suspect, while a match at
  every tested locus only supports inclusion?
- Switch between Overlay and Side-by-side views. How does each view help you decide
  whether the orange peaks line up with the blue?

**Extension.** Research why real CODIS profiles use 20 core loci and how adding
loci drives the random-match probability down to one in billions.

## References

- [DNA profiling (Wikipedia)](https://en.wikipedia.org/wiki/DNA_profiling) — how STR profiles are generated and compared.
- [Microsatellite (Wikipedia)](https://en.wikipedia.org/wiki/Microsatellite) — the short tandem repeats read at each locus.
- [Combined DNA Index System (Wikipedia)](https://en.wikipedia.org/wiki/Combined_DNA_Index_System) — the CODIS loci this tool compares.
- [p5.js reference](https://p5js.org/reference/) — the library used to build this simulation.

## Specification

This MicroSim was generated from a specification in
[Chapter 8: Forensic DNA Profiling](../../chapters/08-forensic-dna-profiling/index.md).

> **Design note:** the five electropherograms are stylized for teaching — peak
> positions and allele counts are chosen to make locus-by-locus inclusion and
> exclusion clear, not to reproduce real capillary-electrophoresis traces.
