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
