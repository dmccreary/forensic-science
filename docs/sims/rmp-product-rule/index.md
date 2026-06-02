---
title: Random Match Probability Product Rule Calculator
description: Calculate random match probability using the product rule across multiple STR loci (Bloom Level 3 — Apply; verb: calculate).
status: scaffold
library: p5.js
bloom_level: Apply (L3)
---

# Random Match Probability Product Rule Calculator



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 8: Forensic DNA Profiling](../../chapters/08-forensic-dna-profiling/index.md).

```text
Type: microsim
**sim-id:** rmp-product-rule<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning Objective: Calculate random match probability using the product rule across multiple STR loci (Bloom Level 3 — Apply; verb: calculate).

Bloom Level: Apply (L3)
Bloom Verb: Calculate

Canvas layout:
- Table view: a list of STR loci with genotype fields and frequency inputs
- Calculation panel: shows running product after each locus is added
- Result display: final RMP expressed as a fraction and as "1 in X"

Visual elements:
- Each locus row shows: locus name, allele 1, allele 2, estimated genotype frequency (editable)
- A "running product" bar that updates as each row is filled in
- A log-scale visualization of the probability getting smaller and smaller as loci are added

Interactive controls:
- Students fill in genotype frequencies for 5–8 loci (pre-populated with realistic values from population databases)
- "Calculate Product" button computes the RMP
- A "Compare to population sizes" feature shows how the RMP compares to world population, US population, and planet Earth population

Data Visibility Requirements:
- Show the intermediate product after each locus
- Show the final RMP in both decimal and "1 in X" formats
- Show a scale comparison: "1 in 10^18 means if you randomly sampled people until you found a match, you would have to sample 1 billion times the Earth's population"

Instructional Rationale: An Apply-level objective (calculate RMP) requires the learner to perform the multiplication themselves and see the statistical power accumulate locus by locus — the "wow moment" when the probability becomes incomprehensibly small.

Color scheme: White table background, blue product running total, red for very small probabilities, scale bars in green/orange/red.
```

## Related Resources

- [Chapter 8: Forensic DNA Profiling](../../chapters/08-forensic-dna-profiling/index.md)
