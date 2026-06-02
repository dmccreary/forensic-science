---
title: Headspace SPME → GC-MS Workflow
description: Explain how headspace SPME recovers volatile accelerant residues from arson debris and connects to GC-MS identification (Bloom L2 — Understand).
status: built
library: p5.js
bloom_level: Understand (L2) — explain the SPME-to-GC-MS accelerant analysis workflow.
quality_score: 98
image: /sims/headspace-spme-workflow/headspace-spme-workflow.png
og:image: /sims/headspace-spme-workflow/headspace-spme-workflow.png
twitter:image: /sims/headspace-spme-workflow/headspace-spme-workflow.png
social:
   cards: false
---

# Headspace SPME → GC-MS Workflow

<iframe src="main.html" width="100%" height="502" scrolling="no"></iframe>

[Run the Headspace SPME → GC-MS Workflow Fullscreen](main.html){ .md-button .md-button--primary }

## About This MicroSim

After a suspicious fire, investigators want to know whether an **accelerant**
(gasoline, lighter fluid, kerosene) was used. The challenge is that accelerants
are **volatile** — they evaporate quickly and are present only in trace amounts
in the charred debris. The standard laboratory answer is **headspace
solid-phase microextraction (SPME)** feeding a **GC-MS**.

This MicroSim walks through the five-station pipeline:

1. **Debris Collection** — debris sealed in an airtight metal can at the scene
2. **Sealed Can (Headspace)** — gentle warming drives accelerant vapors into the
   air space above the debris
3. **SPME Extraction** — a coated fiber adsorbs the vapors with no solvent
4. **GC-MS Injection** — the fiber is desorbed onto the GC column; the MS
   identifies each compound
5. **Chromatogram** — the peak pattern is matched to a reference accelerant

## How to Use It

1. **Click each station** to read its purpose and *why that step matters*.
2. Watch the **Sealed Can** station: orange **vapor molecules** rise from the
   debris into the headspace, and the saturation bar fills as vapor accumulates.
   Press **Replay Vapor** to restart the animation.
3. In the **Chromatogram**, **click any peak** to reveal its compound name and
   retention time.
4. Read the **Reference Match** panel — the questioned sample's peak pattern is
   matched against a reference accelerant standard.
5. Use the **Accelerant** selector to switch between **Gasoline**, **Lighter
   Fluid**, and **Kerosene** and watch the whole peak pattern change.

## What You Can Learn

- Explain each stage of the SPME-to-GC-MS workflow and how the physical
  procedure connects to the analytical output.
- Explain why sealing and warming the can concentrates volatile accelerant
  vapors so a solvent-free fiber can sample them.
- Interpret a chromatogram by its **pattern** of peaks — a tight aromatic
  cluster (gasoline), light n-alkanes (lighter fluid), or a heavy n-alkane
  series (kerosene).

You can embed this MicroSim on your own web page with this iframe:

```html
<iframe src="https://dmccreary.github.io/forensic-science/sims/headspace-spme-workflow/main.html"
        width="100%" height="502" scrolling="no"></iframe>
```

## Lesson Plan

**Audience:** High-school forensic science (grades 9–12)
**Time:** 15–20 minutes
**Bloom level:** Understand (L2) — explain.

**Worked example.** Click through all five stations in order and have students
narrate the journey of a single accelerant molecule from the debris to a peak on
the chromatogram. Then click the tallest peak and read its identity.

**Guided questions:**

- Why is the debris sealed in an airtight can instead of a bag or open tray?
- What does "headspace" mean, and why does warming the can help?
- Switch from Gasoline to Kerosene. How does the peak pattern change, and what
  does that tell you about the kinds of molecules in each accelerant?

**Extension.** SPME uses no solvent. Why is a solvent-free extraction an
advantage when you are trying to detect a tiny amount of accelerant?

## References

- [Solid-phase microextraction (Wikipedia)](https://en.wikipedia.org/wiki/Solid-phase_microextraction) — the fiber-based sampling method.
- [Gas chromatography–mass spectrometry (Wikipedia)](https://en.wikipedia.org/wiki/Gas_chromatography%E2%80%93mass_spectrometry) — how GC-MS separates and identifies compounds.
- [Fire accelerant / ignitable liquid analysis (Wikipedia)](https://en.wikipedia.org/wiki/Accelerant) — accelerant classes and detection.
- [p5.js reference](https://p5js.org/reference/) — the library used to build this simulation.

## Specification

This MicroSim was generated from a specification in
[Chapter 10: Fire Investigation, Arson, and Explosives](../../chapters/10-fire-arson-explosives/index.md).

> **Design note:** the chromatograms are **schematic** — each accelerant is drawn
> as a sum of Gaussian peaks from a representative peak table (retention time,
> compound, relative height). The patterns capture the real character of each
> accelerant class (gasoline's aromatic cluster, lighter fluid's light alkanes,
> kerosene's heavy n-alkane series) but are illustrative, not instrument data.
