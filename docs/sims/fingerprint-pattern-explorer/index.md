---
title: Fingerprint Pattern Classification Explorer
description: Identify the three fingerprint pattern families and their eight subtypes by their defining structural features (Bloom L1 — Remember).
status: built
library: p5.js
bloom_level: Remember (L1) — identify the fingerprint pattern families and subtypes by their defining features.
quality_score: 98
image: /sims/fingerprint-pattern-explorer/fingerprint-pattern-explorer.png
og:image: /sims/fingerprint-pattern-explorer/fingerprint-pattern-explorer.png
twitter:image: /sims/fingerprint-pattern-explorer/fingerprint-pattern-explorer.png
social:
   cards: false
---

# Fingerprint Pattern Classification Explorer

<iframe src="main.html" width="100%" height="522" scrolling="no"></iframe>

[Run the Fingerprint Pattern Classification Explorer Fullscreen](main.html){ .md-button .md-button--primary }

## About This MicroSim

Every fingerprint belongs to one of three pattern **families** — **loops**,
**whorls**, and **arches** — and these split further into eight named subtypes.
Examiners tell them apart using a few structural landmarks: the **core** (the
center of the pattern), the **delta** (a triangular meeting of ridge flows), and
the overall **ridge flow**. The simplest rule of all is the delta count: loops
have **one** delta, whorls have **two**, and arches have **none**.

This MicroSim lets you browse a schematic ridge diagram for each of the eight
patterns with those landmarks labeled, then test yourself in **Quiz Me** mode.

## How to Use It

1. Pick a pattern from the **left menu**. Its enlarged ridge diagram appears with
   the **core** (yellow), **delta(s)** (green), and **ridge flow** (blue arrows)
   marked.
2. Click the **Core**, **Delta**, or **Ridge Flow** chip for a pop-up definition.
3. Read the **Defining features** panel and note the **frequency badge** (loops
   are common, whorls less common, arches rare).
4. Press **Quiz Me** to hide the labels and get an unknown print. Choose a
   classification from the dropdown and press **Check Answer**; the correct
   pattern, its key feature, and the annotations are then revealed. Press **Next
   Pattern** to try another.

## What You Can Learn

- Identify the three pattern families and their eight subtypes.
- Use the **delta count** to place a print: one delta → loop, two → whorl, none
  → arch.
- Recognize the core and ridge flow that distinguish ulnar from radial loops, a
  plain whorl from a double loop, and a plain arch from a tented arch.

You can embed this MicroSim on your own web page with this iframe:

```html
<iframe src="https://dmccreary.github.io/forensic-science/sims/fingerprint-pattern-explorer/main.html"
        width="100%" height="522" scrolling="no"></iframe>
```

## Lesson Plan

**Audience:** High-school forensic science (grades 9–12)
**Time:** 15–20 minutes
**Bloom level:** Remember (L1) — identify.

**Worked example.** Project the explorer and step through one pattern from each
family. For each, count the deltas aloud and name the family before reading the
features panel. Establish the "one delta / two deltas / no delta" rule.

**Guided questions:**

- How many deltas does a loop have? A whorl? An arch?
- A print has two cores and an S-shaped ridge flow. Which subtype is it?
- What is the single feature that separates a plain arch from a tented arch?

**Extension.** Run Quiz Me ten times and keep score. Which family do you confuse
most often, and what feature would help you tell them apart?

## References

- [Fingerprint (Wikipedia)](https://en.wikipedia.org/wiki/Fingerprint) — pattern families, minutiae, and classification.
- [Henry Classification System (Wikipedia)](https://en.wikipedia.org/wiki/Henry_Classification_System) — the historical loop/whorl/arch scheme.
- [Dermatoglyphics (Wikipedia)](https://en.wikipedia.org/wiki/Dermatoglyphics) — the study of friction-ridge skin.
- [p5.js reference](https://p5js.org/reference/) — the library used to build this simulation.

## Specification

This MicroSim was generated from a specification in
[Chapter 3: Fingerprint Analysis and Dactyloscopy](../../chapters/03-fingerprint-analysis/index.md).

> **Design note:** the ridge diagrams are stylized **schematics**, not
> photographic fingerprints — they are drawn to make each pattern's core, delta
> count, and ridge flow easy to read. Real prints are noisier and classification
> uses additional rules (ridge counts, ridge tracing). The frequency badges are
> approximate population figures for teaching, not exact statistics.
