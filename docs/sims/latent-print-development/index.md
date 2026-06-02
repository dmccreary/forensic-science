---
title: Latent Print Development Technique Selector
description: Apply substrate-porosity logic to select the correct latent fingerprint development technique (Bloom L3 — Apply).
status: built
library: p5.js
bloom_level: Apply (L3) — select a development technique by matching it to substrate porosity.
quality_score: 98
image: /sims/latent-print-development/latent-print-development.png
og:image: /sims/latent-print-development/latent-print-development.png
twitter:image: /sims/latent-print-development/latent-print-development.png
social:
   cards: false
---

# Latent Print Development Technique Selector

<iframe src="main.html" width="100%" height="502" scrolling="no"></iframe>

[Run the Latent Print Development Technique Selector Fullscreen](main.html){ .md-button .md-button--primary }

## About This MicroSim

A **latent print** — the invisible sweat-and-oil impression a finger leaves
behind — has to be **developed** before it can be seen and photographed. The
catch is that the right development technique depends on the **surface**. The
single most important factor is whether the substrate is **porous** (it soaks up
the residue) or **non-porous** (the residue sits on top).

This MicroSim makes you **choose**:

- **Non-porous** surfaces (glass, plastic) → **Cyanoacrylate** (superglue) fuming
- **Porous** surfaces (paper, cardboard, raw wood) → **Ninhydrin** or **Silver
  Nitrate** chemical reagents
- **Iodine** gives a quick, *temporary* result on almost any surface

Pick the wrong technique and you get **no print** — and an explanation of why.

## How to Use It

1. Select an **evidence item** from the dropdown. The before panel shows the
   surface and a **POROUS / NON-POROUS** badge.
2. Click one of the four **technique** buttons to select it (it highlights blue).
3. Press **Apply Technique**.
4. Read the **Result (after)** panel:
   - A **correct** match develops the ridges in the technique's real color —
     white (cyanoacrylate), purple (ninhydrin), dark gray (silver nitrate), or
     yellow-brown (iodine).
   - A **wrong** match shows *"No visible ridge pattern"* and the feedback panel
     explains why that technique fails on that substrate.
5. Try other combinations to build the porosity rule for yourself.

## What You Can Learn

- Apply the porosity rule to **select** the correct development technique.
- Predict the **color** a correctly developed print will appear.
- Explain *why* a mismatched technique fails — e.g., ninhydrin needs amino acids
  absorbed *into* a porous surface, which glass does not provide.

You can embed this MicroSim on your own web page with this iframe:

```html
<iframe src="https://dmccreary.github.io/forensic-science/sims/latent-print-development/main.html"
        width="100%" height="502" scrolling="no"></iframe>
```

## Lesson Plan

**Audience:** High-school forensic science (grades 9–12)
**Time:** 10–15 minutes
**Bloom level:** Apply (L3) — select.

**Worked example.** Choose the Drinking Glass (non-porous). Apply Cyanoacrylate
and confirm a developed print appears. Then apply Ninhydrin to the same glass and
read why it fails. Switch to Paper and show that Ninhydrin now succeeds.

**Guided questions:**

- Which two techniques are for porous surfaces, and which is for non-porous?
- Why does cyanoacrylate need a non-porous surface to build its white ridges?
- Iodine works on almost anything — so why isn't it the obvious first choice?

**Extension.** A varnished wooden table behaves like a non-porous surface, but
raw lumber is porous. How would coating a wood surface change which technique you
would choose?

## References

- [Cyanoacrylate fuming (Wikipedia)](https://en.wikipedia.org/wiki/Cyanoacrylate#Forensic_use) — superglue development of prints on non-porous surfaces.
- [Ninhydrin (Wikipedia)](https://en.wikipedia.org/wiki/Ninhydrin) — the amino-acid reagent that yields Ruhemann's purple.
- [Fingerprint development techniques (Wikipedia)](https://en.wikipedia.org/wiki/Fingerprint#Detection_techniques) — overview of porous vs. non-porous methods.
- [p5.js reference](https://p5js.org/reference/) — the library used to build this simulation.

## Specification

This MicroSim was generated from a specification in
[Chapter 3: Fingerprint Analysis and Dactyloscopy](../../chapters/03-fingerprint-analysis/index.md).

> **Design note:** the developed prints are **procedural loop-pattern
> illustrations** rendered in each technique's characteristic color, not images
> of real fingerprints. The success/failure logic is rule-based on substrate
> porosity; raw wood is treated as porous. The visuals are schematic and meant to
> teach which technique fits which surface, not to depict actual chemical results.
