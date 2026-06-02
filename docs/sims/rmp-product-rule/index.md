---
title: Random Match Probability Product Rule Calculator
description: Apply the product rule across STR loci to calculate a DNA profile's random match probability and compare it to population sizes (Bloom L3 — Apply).
status: built
library: p5.js
bloom_level: Apply (L3) — calculate random match probability using the product rule across multiple STR loci.
quality_score: 98
image: /sims/rmp-product-rule/rmp-product-rule.png
og:image: /sims/rmp-product-rule/rmp-product-rule.png
twitter:image: /sims/rmp-product-rule/rmp-product-rule.png
social:
   cards: false
---

# Random Match Probability Product Rule Calculator

<iframe src="main.html" width="100%" height="552" scrolling="no"></iframe>

[Run the Random Match Probability Calculator Fullscreen](main.html){ .md-button .md-button--primary }

## About This MicroSim

When a DNA profile from a crime scene matches a suspect, the key question is: **how
likely is it that a random, unrelated person would match by chance?** That number is
the **random match probability (RMP)**, and it is what makes DNA evidence so
powerful in court.

The RMP is calculated with the **product rule**. Because the STR loci used in DNA
profiling are inherited independently, you can **multiply** the population frequency
of the genotype at each locus together. Each locus on its own is not that rare — but
multiply five, six, or eight of them and the probability becomes
**astronomically small**.

This MicroSim lets you build that product yourself, one locus at a time, and watch
the probability plunge below the entire world population.

## How to Use It

1. The table lists eight **STR loci**, each with a genotype and its **population
   frequency**. All start checked.
2. **Uncheck** and **recheck** loci to add or remove them from the product. The
   **Running Product** curve (log scale) drops a step lower with every locus you add.
3. Press **Calculate Product** to reveal the **RMP** in scientific notation and as
   **"1 in X"**.
4. Read the **How rare is that?** bars: they compare your **1-in-X** value against the
   **U.S. population** and the **world population** on a log scale.
5. Use **Select All** or **Clear** to jump between the full profile and an empty one.

## What You Can Learn

- Apply the product rule to calculate a multi-locus random match probability.
- Express an RMP both in scientific notation and as a "1 in X" odds statement.
- Explain why adding loci shrinks the probability **exponentially**, and judge when a
  profile is rare enough to point to one person.

You can embed this MicroSim on your own web page with this iframe:

```html
<iframe src="https://dmccreary.github.io/forensic-science/sims/rmp-product-rule/main.html"
        width="100%" height="552" scrolling="no"></iframe>
```

## Lesson Plan

**Audience:** High-school forensic science (grades 9–12)
**Time:** 10–15 minutes
**Bloom level:** Apply (L3) — calculate.

**Worked example.** Clear all loci, then check them back **one at a time**. Read the
running product aloud after each: ~1 in 17, then 1 in 300, then 1 in 8,600… By the
eighth locus it is **1 in tens of billions** — rarer than every person on Earth.

**Guided questions:**

- A single locus has a genotype frequency of 0.06 — about 1 in 17 people. Why isn't
  that enough to identify someone, but eight such loci are?
- What does the product rule assume about the loci, and why does that assumption
  matter?
- At how many loci does your RMP first drop below the U.S. population? Below the
  world population?

**Extension.** Standard CODIS profiling uses 20 loci. Using the pattern you see here,
explain why the RMP for a full 20-locus profile is often quoted as rarer than 1 in a
quadrillion, and why analysts still report it as a probability rather than a
certainty.

## References

- [DNA profiling (Wikipedia)](https://en.wikipedia.org/wiki/DNA_profiling) — STR analysis and random match probability.
- [Combined DNA Index System (CODIS) (Wikipedia)](https://en.wikipedia.org/wiki/Combined_DNA_Index_System) — the core STR loci used in U.S. forensic DNA.
- [Product rule of probability (Wikipedia)](https://en.wikipedia.org/wiki/Chain_rule_(probability)) — multiplying probabilities of independent events.
- [p5.js reference](https://p5js.org/reference/) — the library used to build this simulation.

## Specification

This MicroSim was generated from a specification in
[Chapter 8: Forensic DNA Profiling](../../chapters/08-forensic-dna-profiling/index.md).

> **Design note:** the loci and frequencies are **realistic teaching values**, not
> a specific population database, and the product rule here assumes the loci are
> independent (as the standard model does). Real casework adjusts for population
> substructure and relatedness, so the calculated RMP is an instructional estimate
> rather than a courtroom figure.
