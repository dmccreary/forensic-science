---
title: Handwriting Characteristics Comparison
description: Identify the key characteristics used to compare a questioned handwriting sample with a known exemplar (Bloom L1 — Remember).
status: built
library: p5.js
bloom_level: Remember (L1) — identify the characteristics used to compare handwriting samples.
quality_score: 98
image: /sims/handwriting-comparison/handwriting-comparison.png
og:image: /sims/handwriting-comparison/handwriting-comparison.png
twitter:image: /sims/handwriting-comparison/handwriting-comparison.png
social:
   cards: false
---

# Handwriting Characteristics Comparison

<iframe src="main.html" width="100%" height="502" scrolling="no"></iframe>

[Run the Handwriting Characteristics Comparison Fullscreen](main.html){ .md-button .md-button--primary }

## About This MicroSim

When a document examiner is asked whether a signature or note is genuine, they
compare a **questioned** sample against a **known exemplar** — writing the
suspect is known to have produced. They do not look at the writing as a whole;
they break it down into **specific characteristics** and compare each one.

This MicroSim puts the two samples side by side and lets you light up each of the
six characteristics examiners rely on:

- **Line Quality** — smooth, confident strokes vs. shaky tremor
- **Slant** — the angle of the writing, measured in degrees
- **Spacing** — the gaps between letters and words
- **Letter Formation** — the shape of loops and connectors
- **Pen Lifts** — where the pen leaves the paper
- **Baseline** — how steadily the writing sits on its line

A toggle switches the questioned sample between a genuine match and a **forgery**,
so you can see exactly how each characteristic changes when someone tries to copy
another person's hand.

## How to Use It

1. Look at the **Known Exemplar** (left) and the **Questioned Sample** (right).
2. **Click any characteristic chip** to highlight that feature on both samples.
   The exemplar is marked in **blue**; the questioned sample is marked **green**
   if it matches or **red** if it differs.
3. Read the description and the **MATCH / DIFFERS** badge for the selected
   characteristic.
4. Press **Show Forged Sample** to replace the questioned sample with a forgery.
   Watch the comparison summary change as characteristics begin to differ.
5. Drag the **Magnification** slider to zoom in on both samples for a closer look.
6. When **Slant** is selected, read the measured slant angle for each sample.

## What You Can Learn

- Identify the six characteristics document examiners use to compare handwriting.
- Recognize how a forgery typically differs: tremor in the line, a changed slant,
  a drifting baseline, and extra pen lifts.
- Read a comparison summary that tallies **matching vs. differing**
  characteristics.

You can embed this MicroSim on your own web page with this iframe:

```html
<iframe src="https://dmccreary.github.io/forensic-science/sims/handwriting-comparison/main.html"
        width="100%" height="502" scrolling="no"></iframe>
```

## Lesson Plan

**Audience:** High-school forensic science (grades 9–12)
**Time:** 10–15 minutes
**Bloom level:** Remember (L1) — identify.

**Worked example.** With the authentic sample showing, click through all six
characteristics in order and confirm each one shows MATCH and a green highlight.
Note that the summary reads 6 matching / 0 differing.

**Guided questions:**

- Which characteristic is measured in degrees, and why is a number more useful
  to an examiner than "leans left"?
- Press Show Forged Sample. Which characteristics now DIFFER, and which still
  MATCH? Why might a forger get spacing right but fail at line quality?
- What are pen lifts, and why does copying someone else's writing tend to add
  extra ones?

**Extension.** Have students collect two signatures from a classmate on
different days and list which of the six characteristics stay consistent — the
ones that are most stable are the hardest to forge.

## References

- [Questioned document examination (Wikipedia)](https://en.wikipedia.org/wiki/Questioned_document_examination) — how examiners compare writing.
- [Graphonomics / handwriting characteristics (Wikipedia)](https://en.wikipedia.org/wiki/Handwriting) — features that make writing individual.
- [p5.js reference](https://p5js.org/reference/) — the library used to build this simulation.

## Specification

This MicroSim was generated from a specification in
[Chapter 14: Document Examination and Forgery Detection](../../chapters/14-document-examination/index.md).

> **Design note:** the handwriting is a **procedurally generated stylized
> cursive stroke**, not real letters — it is a schematic stand-in that lets each
> characteristic (slant, tremor, baseline, spacing, pen lifts) be controlled and
> highlighted clearly. The authentic and forged samples use fixed parameters, so
> the comparison is illustrative rather than a measurement of real handwriting.
