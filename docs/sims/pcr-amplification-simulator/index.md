---
title: PCR Amplification Step-Through Simulator
description: Step through the three stages of one PCR cycle — denaturation, annealing, extension — and trace what happens to the DNA at each stage (Bloom L2 — Understand).
status: built
library: p5.js
bloom_level: Understand (L2) — explain the three steps of PCR by tracing what happens to the DNA at each stage.
quality_score: 98
image: /sims/pcr-amplification-simulator/pcr-amplification-simulator.png
og:image: /sims/pcr-amplification-simulator/pcr-amplification-simulator.png
twitter:image: /sims/pcr-amplification-simulator/pcr-amplification-simulator.png
social:
   cards: false
---

# PCR Amplification Step-Through Simulator

<iframe src="main.html" width="100%" height="502" scrolling="no"></iframe>

[Run the PCR Amplification Step-Through Simulator Fullscreen](main.html){ .md-button .md-button--primary }

## About This MicroSim

Forensic DNA analysis usually starts with a **tiny** amount of DNA — sometimes
just a few cells from a touched surface. Before it can be profiled, that DNA has to
be **amplified** into millions of copies. The tool that does this is the
**polymerase chain reaction (PCR)**, and it works by repeating the same three
temperature steps over and over:

- **Denaturation (94 °C)** — heat unzips the double helix into two single strands.
- **Annealing (60 °C)** — short **primers** bind to where copying should start.
- **Extension (72 °C)** — **Taq polymerase** builds a new strand from each primer.

Each complete cycle **doubles** the DNA. This MicroSim lets you step through the
cycle one stage at a time and watch the molecule transform, with the temperature
and copy count shown the whole way.

## How to Use It

1. Press **Next Step** to move through **Denaturation → Annealing → Extension**, one
   stage at a time. Try to **predict** what the DNA will do before each reveal.
2. Watch the **Molecular View**:
   - Denaturation: the gray base-pair bridges break and the red and blue strands
     drift apart.
   - Annealing: yellow **primers** slide in and bind to each strand.
   - Extension: a light-purple **new strand** grows from each primer while a gray
     **polymerase** rides the growing end.
3. Read the **side panel**: the temperature gauge, the current step name and
   description, the cycle counter, and the **copies** counter.
4. Press **Run Cycle** to auto-play all three steps, or **Run 5 Cycles** to watch the
   copy count grow **exponentially** (×2, ×4, ×8, ×16, ×32).
5. **Click any DNA part** — template strand, primer, new strand, or polymerase — to
   read its definition.
6. Press **Reset** to start over.

## What You Can Learn

- Explain what happens to the DNA at each PCR step and the temperature it needs.
- Describe the jobs of the template strand, the primers, and Taq polymerase.
- Explain why each cycle doubles the DNA, giving exponential amplification.

You can embed this MicroSim on your own web page with this iframe:

```html
<iframe src="https://dmccreary.github.io/forensic-science/sims/pcr-amplification-simulator/main.html"
        width="100%" height="502" scrolling="no"></iframe>
```

## Lesson Plan

**Audience:** High-school forensic science (grades 9–12)
**Time:** 8–12 minutes
**Bloom level:** Understand (L2) — explain.

**Worked example.** Press Next Step three times and narrate each stage: "Heat
separates the strands… the primers bind… the polymerase copies." Note the cycle
counter ticks to 1 and copies jumps to ×2. Then press Run 5 Cycles and watch the
copy count race to ×32.

**Guided questions:**

- Why must the temperature go *up* for denaturation but *down* for annealing?
- What would happen to the reaction if you left the primers out?
- After 10 cycles, how many copies would one starting molecule produce? (Hint:
  it's a power of two.)

**Extension.** Real PCR runs 28–35 cycles. Using the doubling rule, estimate how
many copies 30 cycles makes from a single molecule, and discuss why that sensitivity
is both PCR's greatest strength and a contamination risk in a forensic lab.

## References

- [Polymerase chain reaction (Wikipedia)](https://en.wikipedia.org/wiki/Polymerase_chain_reaction) — the denature/anneal/extend cycle and its uses.
- [Taq polymerase (Wikipedia)](https://en.wikipedia.org/wiki/Taq_polymerase) — the heat-stable enzyme that makes PCR possible.
- [DNA profiling (Wikipedia)](https://en.wikipedia.org/wiki/DNA_profiling) — how amplified DNA is used to identify individuals.
- [p5.js reference](https://p5js.org/reference/) — the library used to build this simulation.

## Specification

This MicroSim was generated from a specification in
[Chapter 8: Forensic DNA Profiling](../../chapters/08-forensic-dna-profiling/index.md).

> **Design note:** the strands, primers, and new DNA are **schematic** — straight
> colored lines rather than a true double-helix model — so the focus stays on
> *what changes* at each step. The temperatures (94/60/72 °C) and the doubling rule
> are accurate; the per-step animation timing is for clarity, not real reaction
> speed.
