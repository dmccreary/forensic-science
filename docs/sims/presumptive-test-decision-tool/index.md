---
title: Presumptive-Test Decision Tool
description: Screen reddish-brown stains with a Kastle-Meyer presumptive blood test, then confirm the truth to reason about false positives and why a presumptive test only screens (Bloom L5 — Evaluate).
status: built
library: p5.js
bloom_level: Evaluate (L5) — judge which stains warrant confirmatory testing and reason about false positives.
quality_score: 90
image: /sims/presumptive-test-decision-tool/presumptive-test-decision-tool.png
og:image: /sims/presumptive-test-decision-tool/presumptive-test-decision-tool.png
twitter:image: /sims/presumptive-test-decision-tool/presumptive-test-decision-tool.png
social:
   cards: false
---

# Presumptive-Test Decision Tool

<iframe src="main.html" width="100%" height="530" scrolling="no"></iframe>

[Run the Presumptive-Test Decision Tool Fullscreen](main.html){ .md-button .md-button--primary }

## About This MicroSim

Forensic testing runs in two stages, and this MicroSim lets investigators live
inside the first one. A **presumptive test** is fast, cheap, and sensitive: it
tells you a stain **might** be blood so a lab does not waste a slow, expensive
**confirmatory** test on a ketchup smear. The Kastle-Meyer test uses
**phenolphthalein** reagent and hydrogen peroxide. Blood contains **hemoglobin**,
which acts like a **peroxidase** and flashes the reagent bright **pink** within
seconds.

Here is the catch this tool is built to teach: other things act like a peroxidase
too. **Horseradish** is the classic **false positive** — it screens strongly
positive but is not blood at all. So a pink flash means "*consistent with* blood,
confirm it," never "this is blood." A presumptive test **screens**; only a
**confirmatory** test **identifies**.

## How to Use It

1. Pick a sample from the **Sample** dropdown: *Stain A (reddish-brown)*, *Rust
   water*, *Ketchup*, *Horseradish extract*, or *Blood simulant*.
2. Press **Run Presumptive Test** and watch the reagent drop fall. Peroxidase-active
   samples (blood simulant, horseradish, and Stain A) flash **bright pink** — a
   presumptive **positive**. Rust reacts weakly and ketchup shows no change.
3. Read the **Verdict** panel. A pink result means the stain *could* be blood, but
   it is a **presumptive** call only.
4. Press **Run Confirmatory Test** to reveal the truth. Only **Stain A** and the
   **Blood simulant** are truly blood — **horseradish** is exposed as a false
   positive.
5. Press **Reset** and try another sample to compare how the screen and the
   confirmation agree or disagree.

## Learning Objective

Judge which stains warrant confirmatory testing and reason about false positives,
distinguishing a presumptive screen from a confirmatory identification (Bloom
Level 5 — Evaluate).

You can embed this MicroSim on your own web page with this iframe:

```html
<iframe src="https://dmccreary.github.io/forensic-science/sims/presumptive-test-decision-tool/main.html"
        width="100%" height="530" scrolling="no"></iframe>
```

## Lesson Plan

**Audience:** High-school forensic science (grades 9–12)
**Time:** 15–20 minutes
**Bloom level:** Evaluate (L5) — judge which stains warrant confirmatory testing.

**Warm-up.** Ask investigators: "If a reddish-brown smear flashes bright pink with
the Kastle-Meyer reagent, do we now *know* it is blood? What could a defense
attorney say?"

**Guided questions:**

- Run the test on *Horseradish extract*, then confirm it. Why does a non-blood
  sample screen positive, and what does that tell you about the meaning of a pink
  flash?
- Which samples does the presumptive test screen *out*, sparing the lab a slow
  confirmatory test? Why is that screening still valuable even though it cannot
  identify blood?
- A presumptive test "screens" while a confirmatory test "identifies." Using two
  samples from the tool, explain the difference in what each result lets you claim
  in court.

**Extension.** Discuss why labs prefer a highly sensitive presumptive test (few
false negatives) even at the cost of occasional false positives, and how
chain-of-custody plus confirmatory testing together protect an innocent suspect.

## References

- [Kastle–Meyer test (Wikipedia)](https://en.wikipedia.org/wiki/Kastle%E2%80%93Meyer_test) — the phenolphthalein presumptive blood test modeled here.
- [Presumptive and confirmatory tests (Wikipedia)](https://en.wikipedia.org/wiki/Presumptive_and_confirmatory_tests) — the two-stage screen-then-confirm logic.
- [Forensic serology (Wikipedia)](https://en.wikipedia.org/wiki/Forensic_serology) — the field that identifies and analyzes biological fluids.
- [p5.js reference](https://p5js.org/reference/) — the library used to build this simulation.

## Specification

This MicroSim was generated from a specification in
[Chapter 6: Forensic Serology and Biological Fluid Analysis](../../chapters/06-forensic-serology/index.md).

> **Design note:** the reagent chemistry is stylized for teaching — the pink flash,
> weak rust reaction, and hidden "truth" are qualitative outcomes chosen to
> illustrate false positives, not measured reaction kinetics.
