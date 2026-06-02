---
title: Glass Fracture Sequence Analyzer
description: Apply the fracture-sequencing rule to determine which of two impacts on a glass pane happened first (Bloom L3 — Apply).
status: built
library: p5.js
bloom_level: Apply (L3) — apply the fracture-sequencing rule to determine impact order.
quality_score: 98
image: /sims/glass-fracture-sequence/glass-fracture-sequence.png
og:image: /sims/glass-fracture-sequence/glass-fracture-sequence.png
twitter:image: /sims/glass-fracture-sequence/glass-fracture-sequence.png
social:
   cards: false
---

# Glass Fracture Sequence Analyzer

<iframe src="main.html" width="100%" height="502" scrolling="no"></iframe>

[Run the Glass Fracture Sequence Analyzer Fullscreen](main.html){ .md-button .md-button--primary }

## About This MicroSim

When a window is broken by more than one impact, investigators can often work
out **which blow came first**. The key is a simple physical rule: a **radial
crack stops the moment it runs into a crack that is already there**. Glass
cannot crack across a gap that has already opened, so the later impact's cracks
end abruptly when they meet the earlier impact's cracks.

This MicroSim shows a glass pane with **two impact points**. Each impact sends
out radial cracks and concentric rings. The cracks from the impact that came
*first* run uninterrupted to the edge of the glass. The cracks from the impact
that came *second* — the ones pointing toward the first impact — **stop short**,
ending at a **termination point**. Your job is to read the pattern and decide
which impact cracked first.

## How to Use It

1. Study the two impact points and their radial cracks. Look for radial lines
   that seem to **stop partway** instead of reaching the glass edge.
2. **Click the impact point** you think cracked **first**.
3. The answer is revealed: the first impact is ringed in **green** and labelled
   **#1**; the later impact is labelled **#2**.
4. Red **✕ termination marks** appear where impact #2's radial cracks were
   stopped by the cracks already laid down by impact #1.
5. Read the feedback to confirm whether your choice was correct and how many
   radials terminated.
6. Press **New Pattern** for a fresh randomized scenario, or **Reveal Answer**
   to see the solution without guessing.

## What You Can Learn

- Apply the sequencing rule — *a radial crack stops at a pre-existing crack* —
  to decide which of two impacts happened first.
- Recognize **termination points**: the tell-tale spots where one set of cracks
  ends against another.
- Explain how fracture sequencing lets investigators reconstruct the **order of
  events** when glass is broken more than once.

You can embed this MicroSim on your own web page with this iframe:

```html
<iframe src="https://dmccreary.github.io/forensic-science/sims/glass-fracture-sequence/main.html"
        width="100%" height="502" scrolling="no"></iframe>
```

## Lesson Plan

**Audience:** High-school forensic science (grades 9–12)
**Time:** 10–15 minutes
**Bloom level:** Apply (L3) — apply a rule to reach a conclusion.

**Worked example.** Generate a pattern and trace one radial crack from each
impact with a finger. Find a radial from one impact that stops before reaching
the edge — that impact came *later*, because its crack ran into an existing one.
Predict which impact is #1, then Reveal Answer to check.

**Guided questions:**

- What does it mean when a radial crack stops partway instead of reaching the
  glass edge?
- Why can a crack from the *first* impact run all the way to the edge while a
  crack from the *second* cannot cross the first impact's cracks?
- How many of impact #2's radials terminate in this pattern, and how do those
  termination points prove the order?

**Extension.** Have students sketch a two-impact pattern of their own and mark
where the terminations *must* occur, then check their reasoning against several
New Pattern runs.

## References

- [Glass fracture analysis (Wikipedia)](https://en.wikipedia.org/wiki/Forensic_glass_analysis) — radial and concentric fractures and sequencing.
- [Fracture (geology/materials)](https://en.wikipedia.org/wiki/Fracture) — why a crack cannot propagate across an existing free surface.
- [p5.js reference](https://p5js.org/reference/) — the library used to build this simulation.

## Specification

This MicroSim was generated from a specification in
[Chapter 5: Glass, Soil, and Physical Trace Evidence](../../chapters/05-glass-soil-trace-evidence/index.md).

> **Design note:** the original specification allowed free clicking to add up to
> three impacts. This implementation instead presents **randomized pre-built
> two-impact patterns** (via *New Pattern*) so the terminations are always
> physically valid and unambiguous — a freely placed third impact could produce
> a pattern with no clear sequence. The fracture geometry is a simplified
> illustration of the sequencing rule, not a physics simulation.
