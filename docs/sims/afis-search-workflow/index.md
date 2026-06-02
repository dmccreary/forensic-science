---
title: AFIS Search Workflow
description: Explain how AFIS encodes minutiae and generates a candidate list for human examiner review (Bloom L2 — Understand).
status: built
library: p5.js
bloom_level: Understand (L2) — explain how AFIS encodes minutiae and generates a candidate list for examiner review.
quality_score: 98
image: /sims/afis-search-workflow/afis-search-workflow.png
og:image: /sims/afis-search-workflow/afis-search-workflow.png
twitter:image: /sims/afis-search-workflow/afis-search-workflow.png
social:
   cards: false
---

# AFIS Search Workflow

<iframe src="main.html" width="100%" height="507" scrolling="no"></iframe>

[Run the AFIS Search Workflow MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

## About This MicroSim

The **Automated Fingerprint Identification System (AFIS)** does not "match"
fingerprints by looking at pictures. It converts a print into a list of
numbers — the locations and angles of **minutiae** (ridge endings and
bifurcations) — and compares that numeric template against millions of stored
templates. The crucial point for investigators: **AFIS produces a ranked list of
candidates, not an identification.** A trained human examiner always makes the
final call.

This MicroSim walks through the five stations of that pipeline, with concrete
data shown at each step: the scanned print, the extracted (x, y, angle)
template, the database search, the scored candidate list, and the examiner
review.

## How to Use It

1. Use **Next ▶** and **◀ Prev**, or **click any station box**, to move through
   the five stages.
2. At **Minutiae Extraction**, watch the red (ridge-ending) and blue
   (bifurcation) dots appear one by one as the encoded coordinate list fills in.
   Press **Replay animation** to run it again.
3. At **Candidate List**, read the AFIS similarity scores (92, 78, 61 out of
   100) — note that a high score is a *lead*, not a conclusion.
4. At **Examiner Review**, read the banner: AFIS never makes the identification
   on its own.

## What You Can Learn

- Explain how AFIS encodes a fingerprint as a numeric minutiae template rather
  than as an image.
- Describe what an AFIS candidate list and its scores actually mean.
- Explain why the human examiner — not the computer — makes the final
  identification or exclusion.

You can embed this MicroSim on your own web page with this iframe:

```html
<iframe src="https://dmccreary.github.io/forensic-science/sims/afis-search-workflow/main.html"
        width="100%" height="507" scrolling="no"></iframe>
```

## Lesson Plan

**Audience:** High-school forensic science (grades 9–12)
**Time:** 15–20 minutes
**Bloom level:** Understand (L2) — explain the AFIS pipeline.

**Walk-through.** Step through the five stations as a class. At Stage 2, pause to
discuss why a numeric template (not the photo) is what gets searched. At Stage 5,
discuss why the law treats AFIS output as investigative, not conclusive.

**Guided questions:**

- What two kinds of minutiae does AFIS encode, and what does each (x, y, angle)
  value describe?
- A candidate scores 92/100. Has the person been identified? Why or why not?
- Why is the final station colored green instead of blue?

**Extension.** Have students research a real case where an AFIS candidate was
later excluded by a human examiner, and discuss the consequences of treating a
high score as proof.

## References

- [Automated fingerprint identification (Wikipedia)](https://en.wikipedia.org/wiki/Automated_fingerprint_identification) — how AFIS works.
- [Minutiae (Wikipedia)](https://en.wikipedia.org/wiki/Fingerprint#Minutiae_features) — ridge endings and bifurcations.
- [Fingerprint analysis (Wikipedia)](https://en.wikipedia.org/wiki/Fingerprint) — the broader discipline of dactyloscopy.
- [p5.js reference](https://p5js.org/reference/) — the library used to build this simulation.

## Specification

This MicroSim was generated from a specification in
[Chapter 3: Fingerprint Analysis and Dactyloscopy](../../chapters/03-fingerprint-analysis/index.md).

> **Design note:** the fingerprint images are stylized loop-pattern drawings and
> the minutiae coordinates, database count, and candidate scores are illustrative
> values chosen to teach the workflow, not output from a real AFIS system.
