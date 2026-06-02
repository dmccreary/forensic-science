---
title: Fiber Identification Decision Tree
description: Apply a multi-step protocol (burn test, microscopy, solubility) to classify an unknown textile fiber (Bloom L3 — Apply).
status: built
library: p5.js
bloom_level: Apply (L3) — apply a multi-step identification protocol to classify an unknown fiber.
quality_score: 98
image: /sims/fiber-identification-tree/fiber-identification-tree.png
og:image: /sims/fiber-identification-tree/fiber-identification-tree.png
twitter:image: /sims/fiber-identification-tree/fiber-identification-tree.png
social:
   cards: false
---

# Fiber Identification Decision Tree

<iframe src="main.html" width="100%" height="532" scrolling="no"></iframe>

[Run the Fiber Identification Decision Tree MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

## About This MicroSim

A forensic analyst rarely identifies a fiber from a single test. Instead they
follow a **protocol** — a burn test first, then microscopy, then a solubility
test — and each result narrows the possibilities. This MicroSim turns that
protocol into a **decision tree** you walk one choice at a time.

Each new sample is an unknown fiber with a fixed set of **observed test
results** shown on the right. Your job is to read those observations and answer
**Yes or No** at each yellow decision diamond, following the branch your answer
selects until you reach a leaf — the fiber's classification.

## How to Use It

1. Read the **Unknown Sample** card: its burn behavior, microscopic
   cross-section, and (for some fibers) solubility result.
2. Look at the highlighted **decision diamond** and its full question.
3. Press **Answer: Yes** or **Answer: No** based on the sample's observed
   result. The branch you choose lights up green and the next node highlights.
4. Reach a **leaf** to see the classification. A green check (✓) means your path
   matched the sample; a red ✗ means a step diverged — trace back to find where.
5. Press **Start New Sample** to get a different unknown fiber.

## What You Can Learn

- Apply a sequential identification protocol instead of guessing from one test.
- Use burn behavior to split **natural** fibers (which char and smell of paper
  or hair) from **synthetic** fibers (which melt and form a hard bead).
- Distinguish protein fibers (wool, silk) from cellulosic (cotton), and
  polyester from nylon, using the later branches.

You can embed this MicroSim on your own web page with this iframe:

```html
<iframe src="https://dmccreary.github.io/forensic-science/sims/fiber-identification-tree/main.html"
        width="100%" height="532" scrolling="no"></iframe>
```

## Lesson Plan

**Audience:** High-school forensic science (grades 9–12)
**Time:** 20–25 minutes
**Bloom level:** Apply (L3) — apply.

**Worked example.** Start a sample and read its results aloud as a class. Predict
the final classification *before* walking the tree, then traverse it together to
confirm. Discuss which single test was most decisive.

**Guided questions:**

- The very first decision asks whether the fiber melts. Why is "melts vs. burns"
  such a powerful first split?
- A sample smells like burning hair and leaves a crushable bead. Which two
  fibers are still possible, and what test separates them?
- What is the difference in the burn residue between nylon and polyester?

**Extension.** Deliberately answer one decision *wrong* and follow it to the
incorrect leaf. Explain in your own words where the logic diverged and why the
classification is wrong.

## References

- [Fiber analysis (Wikipedia)](https://en.wikipedia.org/wiki/Forensic_fiber_analysis) — how fibers are examined as trace evidence.
- [Textile fibre — identification (Wikipedia)](https://en.wikipedia.org/wiki/Textile#Fibre_types) — natural vs. synthetic fiber classes.
- [Burn test for fibers (Wikipedia)](https://en.wikipedia.org/wiki/Flame_test) — using flame behavior to identify materials.
- [p5.js reference](https://p5js.org/reference/) — the library used to build this simulation.

## Specification

This MicroSim was generated from a specification in
[Chapter 4: Hair, Fiber, and Trace Evidence Analysis](../../chapters/04-hair-and-fiber-analysis/index.md).

> **Design note:** the five fibers, their observed test results, and the
> branching logic are a simplified teaching model of a real identification
> protocol — actual casework uses additional instruments (FTIR, polarized-light
> microscopy) and more fiber types. Per the build guidelines, the Yes/No choice
> at each node is made with native p5 buttons rather than by clicking the
> diamond directly; the highlighted diamond shows which node the buttons act on.
