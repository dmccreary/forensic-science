---
title: Chain of Custody Flow
description: Understand (Bloom L2) the chain of custody by stepping through each evidence transfer from crime scene to courtroom and explaining the documentation required at every handoff.
status: built
library: p5.js
bloom_level: Understand (L2) — explain the chain of custody and the documentation required at each transfer.
image: /sims/chain-of-custody-flow/chain-of-custody-flow.png
og:image: /sims/chain-of-custody-flow/chain-of-custody-flow.png
twitter:image: /sims/chain-of-custody-flow/chain-of-custody-flow.png
social:
   cards: false
---

# Chain of Custody Flow

<iframe src="main.html" width="100%" height="562" scrolling="no"></iframe>

[Run the Chain of Custody Flow Fullscreen](main.html){ .md-button .md-button--primary }

## About This MicroSim

The **chain of custody** is the documented, unbroken trail showing who handled a
piece of evidence, when, and what they did with it — from the moment it is
collected at a crime scene to the moment it is presented in court. If any link in
that chain is missing, the defense can argue the evidence was lost, swapped, or
tampered with, and a judge may rule it **inadmissible**.

This MicroSim lets you **step through** the journey of a single evidence item
across six custody stations. At each step you see who is responsible, what gets
recorded (item ID, date, location, condition notes, and a signature), and what
would go wrong if that step were skipped. The **Break the Chain** toggle removes
a signature at the step you are on so you can see exactly how — and why — a single
gap can sink an entire case.

## How to Use It

1. Press **Next >** to advance the evidence item to the next custody station.
   Press **< Prev** to step back.
2. Read the **detail panel** at the bottom: it names the responsible person, the
   form fields recorded, and the transfer signature for that station.
3. Watch the **track** at the top. Completed transfers turn green ("signed");
   the station you are on is highlighted in blue (or gray for secure storage).
4. Tick **Break the Chain** to drop the signature at your current step. A red X
   marks the broken link and an **EVIDENCE INADMISSIBLE** banner explains the
   legal consequence.
5. Uncheck the box to restore the link, or press **Reset** to start over at the
   crime scene.

## What You Can Learn

- **Explain** the six stages an evidence item passes through, from collection to
  courtroom presentation.
- **Identify** the documentation required at each transfer: item ID, date and
  time, location, condition notes, and a custodian signature.
- Describe how a tamper-evident seal and a continuous signature record protect
  evidence against contamination and substitution.
- Reason about *why* a single missing signature can make otherwise solid evidence
  inadmissible — connecting procedure to courtroom admissibility.

You can embed this MicroSim on your own web page with this iframe:

```html
<iframe src="https://dmccreary.github.io/forensic-science/sims/chain-of-custody-flow/main.html"
        width="100%" height="562" scrolling="no"></iframe>
```

## Lesson Plan

**Audience:** High-school forensic science (grades 9–12)
**Time:** 15–20 minutes
**Bloom level:** Understand (L2) — explain the chain of custody and the documentation required at each transfer.

**Step-and-explain (the core routine).** Have students advance one station at a
time and, *before* reading the panel, say out loud who they think is responsible
and what should be recorded. They then check their explanation against the panel.
The goal is for students to be able to *narrate* the full chain in their own words,
which is exactly what an Understand-level objective asks for.

**Guided questions:**

- Name the two stations where the evidence item is **sealed** (or re-sealed), and
  explain why a fresh seal matters after laboratory testing.
- The custodian logs the item into the property-management system at the evidence
  room. What four pieces of information are recorded there?
- Use **Break the Chain** at the *Supervisor Review* step. In one sentence,
  explain to a jury why that gap is a problem — even if the lab results are
  perfect.

**Extension.** Ask students to write a short courtroom exchange in which a defense
attorney challenges a piece of evidence based on one broken link, and the
prosecutor responds using the chain-of-custody record. Note honestly that even a
complete chain does not guarantee the *scientific* conclusion is correct — it only
shows the item was not altered.

## References

- [Chain of custody (Wikipedia)](https://en.wikipedia.org/wiki/Chain_of_custody) — the legal concept of an unbroken, documented trail of evidence handling.
- [Evidence (law) (Wikipedia)](https://en.wikipedia.org/wiki/Evidence_(law)) — how courts decide what physical evidence is admissible at trial.
- [Tamper-evident technology (Wikipedia)](https://en.wikipedia.org/wiki/Tamper-evident_technology) — how seals and packaging reveal whether evidence has been opened or altered.
- [p5.js reference](https://p5js.org/reference/) — the library used to build this simulation.

## Specification

This MicroSim was generated from a specification in
[Chapter 2: Crime Scene Investigation and Evidence Collection](../../chapters/02-crime-scene-investigation/index.md).

> **Design note:** the specification described click-to-open station panels, an
> arrow-hover detail, and a free-form "Break the Chain" click mode. Because the
> learning objective is at the **Understand (L2)** level — *explain* the chain —
> the interaction was implemented as a guided **step-through** (Next / Prev) with
> a single always-visible detail panel, rather than continuous animation or
> free exploration. This keeps the concrete data (who, what, signature) visible
> at every step and makes the workflow easy to narrate. The **Break the Chain**
> idea is preserved as a checkbox that drops the signature at the current step,
> so students still see the red broken link and the *INADMISSIBLE* consequence
> in context.
