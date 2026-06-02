---
title: Fiber Identification Decision Tree
description: Apply a multi-step identification protocol (microscopy → burn test → solubility test) to classify an unknown fiber (Bloom Level 3 — Apply; verb: apply).
status: scaffold
library: p5.js
bloom_level: Apply (L3)
---

# Fiber Identification Decision Tree



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 4: Hair, Fiber, and Trace Evidence Analysis](../../chapters/04-hair-and-fiber-analysis/index.md).

```text
Type: infographic
**sim-id:** fiber-identification-tree<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning Objective: Apply a multi-step identification protocol (microscopy → burn test → solubility test) to classify an unknown fiber (Bloom Level 3 — Apply; verb: apply).

Bloom Level: Apply (L3)
Bloom Verb: Apply

Purpose: Guide investigators through a branching decision tree for fiber classification.

Layout:
- Top-down branching flowchart structure
- Each decision node is a clickable diamond shape; leaf nodes display the fiber classification

Interactive elements:
- Click a decision node to select "Yes" or "No" and advance to the next step
- Each path reveals what the observation would look like (e.g., selecting "Burns readily, smells like paper" shows an animated orange flame)
- Correct classifications (matching known fibers in the scenario) are confirmed with a green check; wrong paths show where the logic diverged
- A "Start New Sample" button assigns a random unknown fiber with preset test results for the student to identify

Decision nodes:
1. Does the fiber melt approaching the flame? (Yes → synthetic branch; No → natural branch)
2. (Natural branch) Does the residue form a crushable bead? (Yes → protein; No → cellulosic)
3. (Synthetic branch) Does it form a hard black bead? (Yes → polyester/acrylic sub-tree; No → nylon sub-tree)
4. Further discrimination by solubility results

Each leaf node shows: fiber name, microscopic cross-section icon, typical crime scene sources (clothing type, carpet, upholstery).

Instructional Rationale: An Apply-level objective (apply an identification protocol) is best served by a decision tree that forces the learner to choose at each step rather than passively reading a table. Incorrect paths teach the logic of the exception.

Color scheme: Natural fiber branch in green tones, synthetic fiber branch in blue tones, decision diamonds in yellow.
```

## Related Resources

- [Chapter 4: Hair, Fiber, and Trace Evidence Analysis](../../chapters/04-hair-and-fiber-analysis/index.md)
