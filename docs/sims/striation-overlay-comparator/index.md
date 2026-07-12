---
title: Striation-Overlay Comparator
description: Align a suspect tool's striations to a crime-scene toolmark and score the correlation to identify or exclude the tool (Bloom L4 — Analyze).
status: built
library: p5.js
bloom_level: Analyze (L4) — align and score toolmark striations to identify or exclude a suspect tool.
quality_score: 90
image: /sims/striation-overlay-comparator/striation-overlay-comparator.png
og:image: /sims/striation-overlay-comparator/striation-overlay-comparator.png
twitter:image: /sims/striation-overlay-comparator/striation-overlay-comparator.png
social:
   cards: false
---

# Striation-Overlay Comparator

<iframe src="main.html" width="100%" height="565" scrolling="no"></iframe>

[Run the Striation-Overlay Comparator MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

## About This MicroSim

When a tool scrapes across a surface, the microscopic **nicks and wear** on its
edge drag along and cut a pattern of fine parallel lines called **striations**.
Those striations are **individual characteristics** — unique to that one tool. A
firearms-and-toolmark examiner lines up a questioned mark against a test mark
under a **comparison microscope**, sliding one against the other until the
striations either line up ridge-for-ridge or clearly don't.

This MicroSim, investigators, gives you that split-field view. The **crime-scene
toolmark** sits on top; the **suspect tool's test mark** sits below, across the
comparison-microscope bridge. You choose one of three recovered tools, then
**slide** its strip to align the striations. Press **Score Alignment** and the
tool reports what percentage of the scene's striations coincide, with green guides
through the matching lines. **Exactly one tool truly matches** — a wrong tool never
climbs to a match no matter how you shift it. The panel also shows each tool's
**class width**, so a tool of the wrong size can be excluded on **class** before
you ever look at striations.

## How to Use It

1. Read the **class characteristic (width)** row first. If a tool's width differs
   from the scene mark, it is **excluded on class** — no striation match can save it.
2. Pick a **Tool** from the dropdown.
3. Drag the **Shift (align)** slider to slide the suspect test mark left or right
   until its striations line up under the scene mark's striations.
4. Press **Score Alignment**. Read the **coinciding lines**, the **score %**, and
   the **MATCH / NO MATCH** verdict; green guides mark every coinciding striation.
5. Press **Reset** to re-center the strip, and test the other tools. Only one will
   reach a match — and only after you align it.

## Learning Objective

Analyze two toolmark striation patterns by aligning the suspect test mark to the
crime-scene mark and scoring their correlation — excluding a tool on **class**
characteristics and identifying the source tool on **individual** characteristics,
just as a comparison microscope does (Bloom Level 4 — Analyze).

You can embed this MicroSim on your own web page with this iframe:

```html
<iframe src="https://dmccreary.github.io/forensic-science/sims/striation-overlay-comparator/main.html"
        width="100%" height="565" scrolling="no"></iframe>
```

## Lesson Plan

**Audience:** High-school forensic science (grades 9–12)
**Time:** 15–20 minutes
**Bloom level:** Analyze (L4) — align and score toolmark striations to identify or exclude a suspect tool.

**Warm-up.** Ask investigators: "The nicks worn into one screwdriver's edge are
unique to that tool. If we drag it across metal, what kind of pattern does it
leave, and how could that pattern tie a specific tool to a crime scene?"

**Guided questions:**

- Read the class-width row first. How can you exclude a tool *before* you ever
  slide its striations, and why is that faster than a full comparison?
- Pick the matching tool and align it. What do the "score %" and the count of
  coinciding lines tell you, and why does a wrong tool never climb to a match no
  matter how you shift it?
- What is the difference between a **class** characteristic and an **individual**
  characteristic, and which one lets you identify one specific tool?

**Extension.** Research the debate over the scientific validity of toolmark
identification and why examiners now emphasize documented, reproducible
comparisons.

## References

- [Forensic firearm examination (Wikipedia)](https://en.wikipedia.org/wiki/Forensic_firearm_examination) — how examiners compare toolmarks and striations.
- [Comparison microscope (Wikipedia)](https://en.wikipedia.org/wiki/Comparison_microscope) — the split-field instrument this tool re-creates.
- [Ballistic fingerprinting (Wikipedia)](https://en.wikipedia.org/wiki/Ballistic_fingerprinting) — matching marks left by a specific firearm or tool.
- [p5.js reference](https://p5js.org/reference/) — the library used to build this simulation.

## Specification

This MicroSim was generated from a specification in
[Chapter 13: Firearms, Ballistics, and Toolmark Examination](../../chapters/13-firearms-and-ballistics/index.md).

> **Design note:** the striation strips and scoring are stylized for teaching —
> the alignment score is a qualitative measure chosen to illustrate
> class-versus-individual reasoning, not a validated statistical toolmark-match
> metric.
