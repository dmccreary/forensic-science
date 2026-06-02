---
title: Facial Recognition Pipeline
description: Identify the five stages of an automated facial-recognition pipeline and the source of error at each (Bloom L1 — Remember).
status: built
library: p5.js
bloom_level: Remember (L1) — identify the stages of the facial-recognition pipeline and the error source at each.
quality_score: 98
image: /sims/facial-recognition-pipeline/facial-recognition-pipeline.png
og:image: /sims/facial-recognition-pipeline/facial-recognition-pipeline.png
twitter:image: /sims/facial-recognition-pipeline/facial-recognition-pipeline.png
social:
   cards: false
---

# Facial Recognition Pipeline

<iframe src="main.html" width="100%" height="517" scrolling="no"></iframe>

[Run the Facial Recognition Pipeline MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

## About This MicroSim

Automated facial recognition is not a single step — it is a **pipeline** of five
stages, and **each stage can introduce its own error**. A blurry CCTV still, a
missed face, a misplaced landmark, a biased feature vector, or a badly chosen
match threshold can each derail the result. Understanding where errors enter is
the first step to reading a facial-recognition "hit" critically.

This MicroSim lays the pipeline out left to right: **Input Image → Face
Detection → Landmark Extraction → Feature Vector → Database Comparison**. Click
any stage to see what it does, what can go wrong, and how that affects the error
rate. Degrade the image quality or switch the recognition algorithm and watch
the similarity scores and the **demographic error rates** change.

## How to Use It

1. Read the **five stage boxes** across the top, in order. The orange caption
   under each box names the characteristic source of error at that stage.
2. **Click a stage** to highlight it (green) and load its detail panel and a
   stage-specific picture.
3. Press **Degrade Image Quality** to simulate a low-quality probe image; watch
   detection confidence fall and the demographic error bars grow.
4. Use the **algorithm selector** to switch between a modern **Deep Learning
   (CNN)** model and a **Classical (Eigenface)** model, and compare their match
   scores and fairness.

## What You Can Learn

- Identify the five stages of the facial-recognition pipeline in order.
- Name the characteristic source of error introduced at each stage.
- Recognize that match scores and demographic error rates depend on image
  quality and the recognition algorithm — and that a "match" is an
  investigative lead, not a positive identification.

You can embed this MicroSim on your own web page with this iframe:

```html
<iframe src="https://dmccreary.github.io/forensic-science/sims/facial-recognition-pipeline/main.html"
        width="100%" height="517" scrolling="no"></iframe>
```

## Lesson Plan

**Audience:** High-school forensic science (grades 9–12)
**Time:** 15–20 minutes
**Bloom level:** Remember (L1) — identify.

**Worked example.** Walk through the pipeline once with the class on the default
**Database Comparison** view. Note that two gallery faces sit above the red
**0.70 threshold** and would be returned as candidate matches. Then degrade the
image and ask students which faces now fall below the line.

**Guided questions:**

- List the five stages in order. What is the single biggest source of error at
  the very first stage, and why does it matter for every stage after it?
- Switch to the Classical (Eigenface) algorithm. How do the match scores and the
  demographic error rates compare with the CNN model?
- Why is a face that scores above the threshold called a *candidate*, not a
  *positive identification*?

**Extension.** Discuss the demographic-error panel: accuracy varies sharply
across groups, a documented fairness problem in real systems. What are the
consequences of deploying such a system as if it were neutral?

## References

- [Facial recognition system (Wikipedia)](https://en.wikipedia.org/wiki/Facial_recognition_system) — overview of how the pipeline works and where it is used.
- [Eigenface (Wikipedia)](https://en.wikipedia.org/wiki/Eigenface) — the classical approach contrasted with deep-learning models here.
- [NIST Face Recognition Vendor Test](https://www.nist.gov/programs-projects/face-recognition-vendor-test-frvt) — independent accuracy and demographic-bias testing.
- [p5.js reference](https://p5js.org/reference/) — the library used to build this simulation.

## Specification

This MicroSim was generated from a specification in
[Chapter 16: Facial Recognition](../../chapters/16-facial-recognition/index.md).

> **Design note:** the faces, similarity scores, detection-confidence values,
> and demographic error percentages are illustrative sample data chosen to
> teach the structure of the pipeline and the *direction* of each effect (worse
> image → lower scores and higher error; classical model → larger demographic
> gap). They are not measurements from any specific real system. The 0.70 match
> threshold is a teaching value, not an industry standard.
