---
title: Locard Exchange Principle Visualizer
description: Apply (Bloom L3) the Locard Exchange Principle to predict and verify what trace evidence is produced and transferred when two objects make physical contact.
status: implemented
library: p5.js
bloom_level: Apply (L3) — predict and verify what trace evidence transfers when two objects make physical contact.
image: /sims/locard-exchange-visualizer/locard-exchange-visualizer.png
og:image: /sims/locard-exchange-visualizer/locard-exchange-visualizer.png
twitter:image: /sims/locard-exchange-visualizer/locard-exchange-visualizer.png
social:
   cards: false
---

# Locard Exchange Principle Visualizer

<iframe src="main.html" width="100%" height="552" scrolling="no"></iframe>

[Run the Locard Visualizer Fullscreen](main.html){ .md-button .md-button--primary }

## About This MicroSim

Edmond Locard's Exchange Principle states that **"every contact leaves a
trace."** When two objects touch, material moves in *both* directions — and that
two-way transfer is what crime-scene investigators collect and analyze.

This MicroSim turns the principle into a predict-then-check experiment. You pick
a contact scenario, **predict** which traces will move from each object to the
other, press **Make Contact**, and then verify your prediction against the
evidence inventory that builds up on each object.

## How to Use It

1. Choose a scenario from the dropdown (for example, *Suspect / Carpet*).
2. Read the **prediction prompt** and decide what will transfer each way.
3. Press **Make Contact** and watch the colored traces stream in both directions.
4. Read the **Evidence Inventory** to see exactly what landed on each object and
   roughly how much.
5. Check the **"What the lab would look for"** panel to learn which analytical
   technique detects each trace type.
6. Toggle **Show trace labels** on or off, and press **Reset Scene** to try again.

## What You Can Learn

- Apply Locard's principle to predict two-way trace transfer in new situations.
- Connect specific trace types (fibers, skin cells, soil, residues) to the lab
  methods that identify them.
- Explain why securing a scene quickly preserves fragile transferred evidence.

You can embed this MicroSim on your own web page with this iframe:

```html
<iframe src="https://dmccreary.github.io/forensic-science/sims/locard-exchange-visualizer/main.html"
        width="100%" height="552" scrolling="no"></iframe>
```

## Lesson Plan

**Audience:** High-school forensic science (grades 9–12)
**Time:** 15–20 minutes
**Bloom level:** Apply (L3) — predict and verify trace transfer.

**Predict-Test-Observe (the core routine).** For each scenario, students *first*
write down their prediction for both directions of transfer, *then* press Make
Contact to test it. The prediction step is what pushes this activity from
"watch an animation" to "apply a principle."

**Guided questions:**

- In the *Shoe sole / Muddy soil* scenario, name one trace that moves each way.
- Which scenario produces evidence requiring **DNA analysis**? Which requires
  **pollen analysis (palynology)**?
- A suspect claims they were never in the carpeted room. What two-way evidence
  would contradict that claim?

**Extension.** Ask students to invent a fifth scenario (e.g., *bicycle tire /
gravel*) and predict the bidirectional transfer and the lab methods that would
detect it.

## References

- [Locard's exchange principle (Wikipedia)](https://en.wikipedia.org/wiki/Locard%27s_exchange_principle) — the foundational idea behind this MicroSim.
- [Trace evidence (Wikipedia)](https://en.wikipedia.org/wiki/Trace_evidence) — categories of transferred material and how labs analyze them.
- [Edmond Locard (Wikipedia)](https://en.wikipedia.org/wiki/Edmond_Locard) — the French criminalist who founded the first crime laboratory.
- [p5.js reference](https://p5js.org/reference/) — the library used to build this simulation.

## Specification

This MicroSim was generated from a specification in
[Chapter 1: Foundations of Forensic Science and Legal Principles](../../chapters/01-intro-forensic-science/index.md).

> **Design note:** the specification mentions draggable objects. To keep the
> focus on the learning objective — *predicting* the two-way transfer — the
> objects are fixed and the **Make Contact** button animates the contact event
> itself. Dragging was omitted because repositioning the objects does not change
> what transfers between them.
