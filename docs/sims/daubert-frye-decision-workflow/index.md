---
title: Daubert vs. Frye Admissibility Decision Workflow
description: Daubert vs. Frye Admissibility Decision Workflow
status: built
library: p5.js
bloom_level: Analyze (L4) — compare and contrast how the Frye and Daubert standards evaluate the same scientific evidence.
image: /sims/daubert-frye-decision-workflow/daubert-frye-decision-workflow.png
og:image: /sims/daubert-frye-decision-workflow/daubert-frye-decision-workflow.png
twitter:image: /sims/daubert-frye-decision-workflow/daubert-frye-decision-workflow.png
social:
   cards: false
---

# Daubert vs. Frye Admissibility Decision Workflow

<iframe src="main.html" width="100%" height="612" scrolling="no"></iframe>

[Run the Daubert vs. Frye Workflow Fullscreen](main.html){ .md-button .md-button--primary }

## About This MicroSim

Before a jury ever hears forensic evidence, a judge decides whether it is even
allowed in. U.S. courts use one of two "gatekeeper" standards:

- **Frye (1923)** asks a single question: *is the method generally accepted in
  its field?*
- **Daubert (1993)** asks four questions: *is it tested? peer-reviewed? does it
  have a known error rate? and is it accepted?*

This MicroSim puts the **same** forensic technique through **both** standards at
once, side by side, so you can see why the two tests sometimes reach different
outcomes on identical evidence.

## How to Use It

1. Pick a technique from the dropdown (DNA, bite marks, polygraph, or
   probabilistic genotyping software).
2. Press **Next Step ▸** to reveal one gatekeeper question at a time on each
   tree. Each node turns **green** (met), **yellow** (disputed), or **red** (not
   met) for that technique.
3. **Hover** any node to read what that gatekeeper question means.
4. When both trees reach a **RESULT**, read the **comparison panel** at the
   bottom for the key difference.
5. Press **Reset** or pick a new technique to compare another case.

## What You Can Learn

- Compare and contrast how Frye and Daubert evaluate the same evidence.
- Attribute differences in outcome to the *structure* of each test (one
  acceptance question vs. four reliability factors).
- Explain why a newer, validated method can pass Daubert yet fail Frye — and why
  a long-used but weakly tested method can do the opposite.

You can embed this MicroSim on your own web page with this iframe:

```html
<iframe src="https://dmccreary.github.io/forensic-science/sims/daubert-frye-decision-workflow/main.html"
        width="100%" height="612" scrolling="no"></iframe>
```

## Lesson Plan

**Audience:** High-school forensic science (grades 9–12)
**Time:** 20–25 minutes
**Bloom level:** Analyze (L4) — compare and contrast two standards.

**Warm-up.** Define *admissibility* and the role of a judge as "gatekeeper."
Contrast the standard of proof at trial (beyond a reasonable doubt) with the
*threshold* question of whether evidence gets in at all.

**Compare-and-contrast task.** Students step through all four techniques and fill
in a 4×2 table: **Technique · Frye outcome · Daubert outcome**. Then they answer:

- Which technique is admitted under both standards? (DNA STR profiling)
- Which is excluded under both? (Polygraph — fittingly, the Frye case itself.)
- For **bite mark analysis**, which Daubert factor exposes a weakness that Frye
  never checks? (Error rate.)

**Argument writing.** Each student picks one disputed technique and writes a
short paragraph arguing for admission or exclusion, citing specific gatekeeper
factors shown in the MicroSim.

## References

- [Daubert standard (Wikipedia)](https://en.wikipedia.org/wiki/Daubert_standard) — the 1993 reliability-based test and its four factors.
- [Frye standard (Wikipedia)](https://en.wikipedia.org/wiki/Frye_standard) — the 1923 "general acceptance" test.
- [Expert witness (Wikipedia)](https://en.wikipedia.org/wiki/Expert_witness) — how scientific testimony enters a courtroom.
- [2009 NAS report on forensic science (Wikipedia)](https://en.wikipedia.org/wiki/Forensic_science#Criticism) — context for why reliability matters.

## Specification

This MicroSim was generated from a specification in
[Chapter 1: Foundations of Forensic Science and Legal Principles](../../chapters/01-intro-forensic-science/index.md).
