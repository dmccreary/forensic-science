---
title: Evidence Packaging Guide
description: Apply (Bloom L3) evidence-packaging rules by selecting the correct packaging material for a given evidence item and seeing the forensic reason and courtroom risk of a wrong choice.
status: built
library: p5.js
bloom_level: Apply (L3) — select the correct packaging material for a given evidence item.
image: /sims/evidence-packaging-guide/evidence-packaging-guide.png
og:image: /sims/evidence-packaging-guide/evidence-packaging-guide.png
twitter:image: /sims/evidence-packaging-guide/evidence-packaging-guide.png
social:
   cards: false
---

# Evidence Packaging Guide

<iframe src="main.html" width="100%" height="602" scrolling="no"></iframe>

[Run the Evidence Packaging Guide Fullscreen](main.html){ .md-button .md-button--primary }

## About This MicroSim

The packaging material must match the evidence type. Using the wrong container is
not a technicality — it can **destroy the forensic value of the evidence** or make
it inadmissible. Wet blood sealed in plastic grows mold and the DNA degrades; loose
fibers spill out of a bag; a powered-on phone gets wiped remotely; a knife slices
through a paper sack and injures a handler.

This MicroSim turns those rules into a **decision-practice tool**. You are handed a
realistic evidence item — a wet bloodstained shirt, loose carpet fibers, a used
needle, a suspect's phone — and you must **select** the correct packaging from five
options. The moment you choose, you get immediate feedback: whether your choice was
correct, the **forensic reason** the right packaging protects the evidence, and the
**courtroom risk** of getting it wrong. A **Reference** mode lets you browse every
evidence category and its packaging rule at your own pace.

## How to Use It

1. Leave the **Mode** dropdown on **Practice**. Read the evidence **case card** at
   the top — it names the item, describes it, and tells you which evidence module
   it belongs to.
2. **Hover** over any of the five packaging choices to see its name and a one-line
   description.
3. **Click** the packaging you think is correct. The correct option is outlined in
   green; if your pick was wrong, it is outlined in red.
4. Read the **feedback panel** at the bottom: the forensic reason for the correct
   packaging and the courtroom risk of the wrong choice.
5. Press **Next Item >** for a new randomized evidence item. Your running **Score**
   appears in the control bar; press **Reset Score** to start fresh.
6. Switch **Mode** to **Reference** to browse every evidence type from the dropdown
   with its correct packaging always highlighted.

## What You Can Learn

- **Select** the correct packaging material for wet and dried biological evidence,
  dry trace, sharps, firearms, biohazards, digital devices, and impression casts.
- Explain *why* breathable paper protects biological evidence while airtight plastic
  destroys it (mold and DNA degradation within 24–48 hours).
- Connect a packaging choice to its **courtroom consequence** — how the wrong
  container can make solid evidence unreliable or inadmissible.
- Recognize that correct packaging is one human-controlled step where avoidable
  error can quietly ruin a case before any laboratory test is ever run.

You can embed this MicroSim on your own web page with this iframe:

```html
<iframe src="https://dmccreary.github.io/forensic-science/sims/evidence-packaging-guide/main.html"
        width="100%" height="602" scrolling="no"></iframe>
```

## Lesson Plan

**Audience:** High-school forensic science (grades 9–12)
**Time:** 15–20 minutes
**Bloom level:** Apply (L3) — select the correct packaging material for a given evidence item.

**Choose-and-justify (the core routine).** For each case card, students *first* say
out loud which packaging they would choose and *why*, **then** click to check. The
spoken justification is what pushes this from "guess the answer" to *applying* the
packaging rule. Have students keep a running tally and aim to explain every wrong
answer before moving on.

**Guided questions:**

- A detective seals a wet bloodstained shirt in a plastic bag for four days. Using
  the sim's feedback, explain in one sentence what happens to the DNA and why.
- Two items in the sim use the **rigid box / tube**. Name them and explain why a
  rigid container — rather than paper or plastic — is the safe choice for each.
- Why does a powered-on smartphone need an antistatic / Faraday bag rather than a
  paper envelope? What could an accomplice do otherwise?

**Extension.** Ask students to invent a new evidence item (e.g., a damp soil sample,
a charred document, a wet swab of an unknown liquid) and argue for its correct
packaging and the courtroom risk of the wrong one. Note honestly that real cases are
sometimes ambiguous — an item can be both biological *and* sharp (a bloody needle),
and investigators must weigh handler safety against evidence preservation.

## References

- [Evidence packaging (Wikipedia)](https://en.wikipedia.org/wiki/Evidence_packaging) — overview of how physical evidence is contained, sealed, and labeled to preserve it.
- [Trace evidence (Wikipedia)](https://en.wikipedia.org/wiki/Trace_evidence) — the dry, transferable material (fibers, glass, soil) that the druggist fold is designed to contain.
- [Bloodborne Pathogens Standard, 29 CFR 1910.1030 (OSHA)](https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.1030) — the federal rule requiring biohazard containers for infectious evidence.
- [p5.js reference](https://p5js.org/reference/) — the library used to build this simulation.

## Specification

This MicroSim was generated from a specification in
[Chapter 2: Crime Scene Investigation and Evidence Collection](../../chapters/02-crime-scene-investigation/index.md).

> **Design note:** the specification described a left-column category list with a
> right-panel explanation and a separate animated "Druggist Fold Tutorial." Because
> the learning objective is at the **Apply (L3)** level — *select* the correct
> packaging — the interaction was implemented as an active **decision-practice tool**
> rather than a passive browse-and-read panel: the learner is handed a randomized
> evidence item and must **choose** before seeing any answer, then receives immediate
> correct/incorrect feedback with the forensic reason and the courtroom risk. The
> spec's browse view is preserved as a **Reference** mode, and the druggist fold is
> represented as one of the five packaging choices (used for the dry-trace items)
> rather than a standalone animation, keeping the focus on the selection decision.
