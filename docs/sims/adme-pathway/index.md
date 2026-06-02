---
title: ADME Pathway Interactive Flow Diagram
description: Explain the ADME pharmacokinetic pathway and describe what happens to a drug at each stage (Bloom L2 — Understand).
status: built
library: p5.js
bloom_level: Understand (L2) — explain the ADME pathway and what happens at each stage.
quality_score: 98
image: /sims/adme-pathway/adme-pathway.png
og:image: /sims/adme-pathway/adme-pathway.png
twitter:image: /sims/adme-pathway/adme-pathway.png
social:
   cards: false
---

# ADME Pathway Interactive Flow Diagram

<iframe src="main.html" width="100%" height="517" scrolling="no"></iframe>

[Run the ADME Pathway MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

## About This MicroSim

Every drug a forensic toxicologist looks for follows the same four-step journey
through the body, abbreviated **ADME**: **A**bsorption, **D**istribution,
**M**etabolism, and **E**limination. Understanding this pathway explains *why* a
substance shows up in blood for only hours but in hair for months, and *why* the
route of administration changes how fast a drug peaks.

This MicroSim animates orange "drug molecules" flowing through four organ
stages — the GI tract, the bloodstream and tissues, the liver, and the kidneys
and lungs — while a blood-concentration curve builds underneath. Choose a route
of administration and watch the curve change shape.

## How to Use It

1. Pick a **route** from the dropdown: oral (swallowed), IV (injected), or
   inhaled. The animation speed and the concentration curve change to match.
2. Watch the orange molecules travel left to right through the four ADME stages
   as the blood-concentration curve fills in below.
3. **Click any stage box** to read what happens there — which organs are
   involved and how long the phase typically takes.
4. Use **Pause / Play** to stop on a moment in time and **Reset** to start over.
   The dashed marker shows the current time and the relative blood concentration.

## What You Can Learn

- Explain each of the four ADME phases and name the organs responsible.
- Describe why an IV dose peaks almost instantly while an oral dose rises slowly.
- Connect blood concentration over time to the detection windows for blood,
  urine, and hair samples.

You can embed this MicroSim on your own web page with this iframe:

```html
<iframe src="https://dmccreary.github.io/forensic-science/sims/adme-pathway/main.html"
        width="100%" height="517" scrolling="no"></iframe>
```

## Lesson Plan

**Audience:** High-school forensic science (grades 9–12)
**Time:** 15–20 minutes
**Bloom level:** Understand (L2) — explain the pathway.

**Walk-through.** Project the sim and step through each stage with the class,
clicking the boxes in order and reading the descriptions aloud. Pause the
animation at the peak of the curve and ask which ADME phase is dominant.

**Guided questions:**

- Switch from oral to IV. Why does the curve peak almost immediately for IV?
- At t = 12 hours, is the drug more likely to be found in blood or in urine? Why?
- Which organ does the body rely on to chemically break the drug down, and what
  enzyme family does the work?

**Extension.** Have students research a specific drug's half-life and sketch how
its ADME curve would differ from the generic shape shown here.

## References

- [ADME (Wikipedia)](https://en.wikipedia.org/wiki/ADME) — absorption, distribution, metabolism, excretion.
- [Pharmacokinetics (Wikipedia)](https://en.wikipedia.org/wiki/Pharmacokinetics) — how drug concentration changes over time.
- [Forensic toxicology (Wikipedia)](https://en.wikipedia.org/wiki/Forensic_toxicology) — detecting drugs and poisons in biological samples.
- [p5.js reference](https://p5js.org/reference/) — the library used to build this simulation.

## Specification

This MicroSim was generated from a specification in
[Chapter 9: Forensic Toxicology and Chemical Analysis](../../chapters/09-forensic-toxicology/index.md).

> **Design note:** the concentration curve uses a generic Bateman-style
> absorption/elimination model on a normalized 0–24 hour axis. The shapes and
> the detection-window ranges are illustrative for teaching the ADME concept,
> not pharmacokinetic figures for any specific drug.
