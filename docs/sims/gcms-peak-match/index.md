---
title: GC-MS Peak-Match Confirmation
description: Confirm an unknown substance by matching its gas-chromatogram retention time and mass-spectrum fragmentation pattern to a reference library (Bloom L3 — Apply).
status: built
library: p5.js
bloom_level: Apply (L3) — match retention time and fragmentation pattern to confirm an unknown's identity.
quality_score: 90
image: /sims/gcms-peak-match/gcms-peak-match.png
og:image: /sims/gcms-peak-match/gcms-peak-match.png
twitter:image: /sims/gcms-peak-match/gcms-peak-match.png
social:
   cards: false
---

# GC-MS Peak-Match Confirmation

<iframe src="main.html" width="100%" height="580" scrolling="no"></iframe>

[Run the GC-MS Peak-Match MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

## About This MicroSim

A field **color test** is fast and cheap, but it can only ever be
**presumptive** — a color suggests a *class* of substances, never a specific
molecule. To name the molecule, a crime lab turns to the confirmatory gold
standard: **gas chromatography–mass spectrometry (GC-MS)**.

This MicroSim shows the two pieces of evidence GC-MS produces:

- The **top panel** is a **gas chromatogram** — detector abundance plotted
  against **retention time**. Every compound travels through the column at its
  own speed, so it exits at a characteristic time. The unknown appears as one
  dominant peak.
- The **bottom panel** is a **mass spectrum** — relative intensity plotted
  against **m/z** (mass-to-charge ratio). The mass spectrometer shatters the
  molecule into fragments, and the pattern of labeled bars is as unique as a
  fingerprint.

You pick a candidate from a four-substance reference library — **Caffeine**,
**Aspirin**, **Pseudoephedrine**, or **Compound X** — and overlay it on the
unknown. A candidate only earns a **CONFIRMED MATCH** when **both** the
retention time **and** the fragmentation pattern line up.

## How to Use It

1. Study the unknown's chromatogram peak and its labeled mass-spectrum
   fragments.
2. Pick a **Candidate** from the dropdown that you think matches.
3. Press **Overlay & Score**. The candidate's retention peak and spectrum
   appear in orange over the unknown's, and the verdict panel reports the
   retention-time match, the fragment-pattern match, and an overall percentage.
   Shared fragments turn their m/z labels green.
4. Press **New Unknown** to test yourself on a different substance, and
   **Reveal Match** to check the true identity.

## Learning Objective

**Apply (L3):** Confirm the identity of an unknown by matching its retention
time and mass-spectrum fragmentation pattern to a reference library. Investigators
practice why a presumptive color test must be followed by GC-MS confirmation
before any substance can be named in court — matching two independent features
is far stronger than matching either one alone.

You can embed this MicroSim on your own web page with this iframe:

```html
<iframe src="https://dmccreary.github.io/forensic-science/sims/gcms-peak-match/main.html"
        width="100%" height="580" scrolling="no"></iframe>
```

## Lesson Plan

**Audience:** High-school forensic science (grades 9–12)
**Time:** 15–20 minutes
**Bloom level:** Apply (L3) — match retention time and fragmentation pattern to confirm identity.

**Warm-up.** Ask investigators: "A field color test just turned purple. A
prosecutor asks, 'So it's definitely this drug?' Why can't you say yes yet, and
what instrument would you reach for?"

**Guided questions:**

- Overlay a candidate that matches the retention time but not the fragmentation
  pattern. Why is that *not* a confirmed match, and what does each of the two
  features tell you?
- Why is matching two independent features (retention time *and* mass spectrum)
  far stronger evidence than matching either one alone?
- GC-MS is called a confirmatory "gold standard." What makes a mass-spectrum
  fragmentation pattern almost as unique as a fingerprint?

**Extension.** Look up how real labs build and search mass-spectral reference
libraries (such as the NIST library), and discuss why a good library match still
requires an analyst's judgment.

## References

- [Gas chromatography–mass spectrometry (Wikipedia)](https://en.wikipedia.org/wiki/Gas_chromatography%E2%80%93mass_spectrometry) — how the two instruments combine to confirm an identity.
- [Mass spectrometry (Wikipedia)](https://en.wikipedia.org/wiki/Mass_spectrometry) — how a molecule is fragmented into an identifying pattern.
- [Gas chromatography (Wikipedia)](https://en.wikipedia.org/wiki/Gas_chromatography) — how compounds are separated by retention time.
- [p5.js reference](https://p5js.org/reference/) — the library used to build this simulation.

## Specification

This MicroSim was generated from a specification in
[Chapter 9: Forensic Toxicology and Chemical Analysis](../../chapters/09-forensic-toxicology/index.md).

> **Design note:** the chromatogram peaks and mass spectra are stylized for
> teaching — retention times and fragment bars are chosen to make the two-feature
> confirmation logic visible, not to reproduce instrument-grade data.
