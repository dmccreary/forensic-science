---
title: Skeletal Sex Indicators Interactive Diagram
description: Compare male and female pelvis and skull features side by side and identify the traits used to estimate biological sex from skeletal remains (Bloom L1 — Remember).
status: built
library: p5.js
bloom_level: Remember (L1) — identify the pelvic and cranial features used to estimate biological sex.
quality_score: 98
image: /sims/skeletal-sex-indicators/skeletal-sex-indicators.png
og:image: /sims/skeletal-sex-indicators/skeletal-sex-indicators.png
twitter:image: /sims/skeletal-sex-indicators/skeletal-sex-indicators.png
social:
   cards: false
---

# Skeletal Sex Indicators Interactive Diagram

<iframe src="main.html" width="100%" height="552" scrolling="no"></iframe>

[Run the Skeletal Sex Indicators Diagram Fullscreen](main.html){ .md-button .md-button--primary }

## About This MicroSim

When forensic anthropologists find skeletal remains, one of the first questions is:
**was this person male or female?** The skeleton holds the answer — especially in the
**pelvis**, which is shaped differently because of childbirth, and secondarily in the
**skull**.

This MicroSim puts the male and female versions **side by side** so you can identify
each diagnostic feature, see how it differs between the sexes, and learn **how
reliable** each one is. Pelvic features are the gold standard; skull features help but
are less certain.

## How to Use It

1. The grid shows four schematics: **male** and **female pelvis** on top, **male** and
   **female skull** below. Male features are marked in **red**, female in **blue**.
2. **Click any numbered feature** — subpubic angle, greater sciatic notch, pelvic
   inlet, brow ridge, mastoid process, or mental eminence (chin).
3. The **Feature Detail** panel shows what that feature looks like in **males vs.
   females** and a **reliability bar** with its accuracy as a sex indicator.
4. Press **Hide Labels** to remove the names and test whether you can identify each
   feature from memory.
5. Press **Quiz Me**: one feature's description appears, and you choose **Male** or
   **Female**. The sim tells you if you're right and reminds you how reliable that
   feature is.

## What You Can Learn

- Identify the main pelvic and cranial features used to estimate biological sex.
- Describe how each feature differs between male and female skeletons.
- Recall which indicators are most reliable — and why the pelvis beats the skull.

You can embed this MicroSim on your own web page with this iframe:

```html
<iframe src="https://dmccreary.github.io/forensic-science/sims/skeletal-sex-indicators/main.html"
        width="100%" height="552" scrolling="no"></iframe>
```

## Lesson Plan

**Audience:** High-school forensic science (grades 9–12)
**Time:** 8–12 minutes
**Bloom level:** Remember (L1) — identify.

**Worked example.** Click the **subpubic angle** on both pelvises. Note the male's
narrow V (under 90°) versus the female's wide U (over 90°), and that this feature is
~95% reliable. Then compare the **brow ridge** on the two skulls and notice its lower
reliability (~85%).

**Guided questions:**

- Which three features are on the pelvis, and which three are on the skull?
- Why is the female pelvis wider and the subpubic angle larger?
- If the skull says "male" but the pelvis says "female," which should you trust more,
  and why?

**Extension.** Real cases often have only fragments of a skeleton. Using the
reliability percentages here, explain why finding an intact pelvis is far more useful
to an anthropologist than finding an intact skull.

## References

- [Forensic anthropology (Wikipedia)](https://en.wikipedia.org/wiki/Forensic_anthropology) — estimating sex, age, and ancestry from bone.
- [Pelvis (Wikipedia)](https://en.wikipedia.org/wiki/Pelvis#Sexual_dimorphism) — sexual dimorphism of the human pelvis.
- [Greater sciatic notch (Wikipedia)](https://en.wikipedia.org/wiki/Greater_sciatic_notch) — a key sex-estimation landmark.
- [p5.js reference](https://p5js.org/reference/) — the library used to build this simulation.

## Specification

This MicroSim was generated from a specification in
[Chapter 11: Forensic Anthropology and Skeletal Biology](../../chapters/11-forensic-anthropology/index.md).

> **Design note:** the pelvis and skull are **schematic line drawings** drawn with
> sex-distinct proportions to highlight each feature — they are teaching diagrams, not
> anatomically exact models. The accuracy percentages are typical published ranges;
> real sex estimation scores several features together rather than relying on any one.
