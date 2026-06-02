---
title: ABO Blood Typing Interactive Simulator
description: Interpret agglutination results to determine ABO/Rh blood type (Bloom L2 — Understand).
status: built
library: p5.js
bloom_level: Understand (L2) — interpret agglutination results to determine blood type.
quality_score: 98
image: /sims/abo-blood-typing/abo-blood-typing.png
og:image: /sims/abo-blood-typing/abo-blood-typing.png
twitter:image: /sims/abo-blood-typing/abo-blood-typing.png
social:
   cards: false
---

# ABO Blood Typing Interactive Simulator

<iframe src="main.html" width="100%" height="542" scrolling="no"></iframe>

[Run the ABO Blood Typing MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

## About This MicroSim

Forensic serologists determine ABO blood type by mixing a blood sample with
**antiserum** — Anti-A, Anti-B, and Anti-D (Rh). If the red cells carry the
matching antigen, they **agglutinate**: the cells clump into visible masses. If
the antigen is absent, the suspension stays smooth. Reading that clumping pattern
is how the type is interpreted.

This MicroSim hands you a **mystery sample**. You add each antiserum, watch the
well either clump (a positive reaction) or stay smooth (negative), and use the
+ / − pattern to **predict the type** before revealing the answer.

## How to Use It

1. Pick a **Sample** from the dropdown. Its type is hidden — the samples are
   reshuffled every round.
2. Press **Add Anti-A** and **Add Anti-B** and watch each well react.
3. Optionally check **Test Rh (Anti-D)** to add a third well for the Rh factor.
4. Read the **Reaction so far** line (`+` = agglutinated, `−` = no reaction).
5. **Predict** the blood type, then press **Reveal Type** to check your
   interpretation and read the explanation.
6. Press **New Sample** to reshuffle and try another.

## What You Can Learn

- Interpret an agglutination pattern to determine ABO type (A, B, AB, or O).
- Connect a positive reaction to the presence of a specific red-cell antigen.
- Explain why Type O agglutinates with neither Anti-A nor Anti-B, and Type AB
  with both.

You can embed this MicroSim on your own web page with this iframe:

```html
<iframe src="https://dmccreary.github.io/forensic-science/sims/abo-blood-typing/main.html"
        width="100%" height="542" scrolling="no"></iframe>
```

## Lesson Plan

**Audience:** High-school forensic science (grades 9–12)
**Time:** 10–15 minutes
**Bloom level:** Understand (L2) — interpret agglutination results.

**Predict-Test-Observe.** For each sample, students add the antisera, *then write
down their predicted type before pressing Reveal*. The prediction step is what
turns "watching clumps" into "interpreting a serological result."

**Guided questions:**

- Which antigen must be present for the Anti-B well to agglutinate?
- A sample shows agglutination with both Anti-A and Anti-B. What type is it, and
  why?
- Type O is the "universal donor." How does its reaction pattern in this sim
  explain that nickname?

**Extension.** Have students build a 2×2 truth table (Anti-A +/− × Anti-B +/−)
and fill in the four ABO types, then check it against the simulator.

## References

- [ABO blood group system (Wikipedia)](https://en.wikipedia.org/wiki/ABO_blood_group_system) — antigens, antibodies, and agglutination.
- [Agglutination (biology) (Wikipedia)](https://en.wikipedia.org/wiki/Agglutination_(biology)) — the clumping reaction visualized here.
- [Rh blood group system (Wikipedia)](https://en.wikipedia.org/wiki/Rh_blood_group_system) — the Anti-D (Rh) test.
- [p5.js reference](https://p5js.org/reference/) — the library used to build this simulation.

## Specification

This MicroSim was generated from a specification in
[Chapter 6: Forensic Serology and Biological Fluid Analysis](../../chapters/06-forensic-serology/index.md).

> **Design note:** the specification calls for separate "Add Anti-A" / "Add
> Anti-B" buttons and an optional Anti-D well — all preserved here. The mystery
> samples are reshuffled each round so the activity is a genuine interpretation
> task rather than a memorization exercise.
