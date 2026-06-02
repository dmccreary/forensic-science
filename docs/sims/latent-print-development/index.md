---
title: Latent Print Development Technique Selector
description: Select the correct latent print development technique based on substrate porosity (Bloom Level 3 — Apply; verb: select).
status: scaffold
library: p5.js
bloom_level: Apply (L3)
---

# Latent Print Development Technique Selector



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 3: Fingerprint Analysis and Dactyloscopy](../../chapters/03-fingerprint-analysis/index.md).

```text
Type: microsim
**sim-id:** latent-print-development<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning Objective: Select the correct latent print development technique based on substrate porosity (Bloom Level 3 — Apply; verb: select).

Bloom Level: Apply (L3)
Bloom Verb: Select

Canvas layout:
- Top section: evidence item display (selected from a dropdown)
- Bottom section: four technique option buttons (Cyanoacrylate, Ninhydrin, Silver Nitrate, Iodine)
- Right panel: result panel showing what the developed print looks like after applying the chosen technique

Visual elements:
- Evidence item illustrations: drinking glass, piece of paper, cardboard box, plastic bag, wooden door frame
- Before/after views — left shows the blank surface, right shows the developed print in the correct color for the chosen technique
- A "substrate porosity" indicator (porous / non-porous) that appears when the evidence item is selected

Interactive controls:
- Dropdown: Select evidence item (glass, paper, cardboard, plastic bag, wood)
- Four technique buttons (Cyanoacrylate, Ninhydrin, Silver Nitrate, Iodine)
- "Apply Technique" button triggers the before→after animation
- If wrong technique is selected, result panel shows "No visible ridge pattern — technique not effective on this substrate" with a brief explanation

Data Visibility Requirements:
- Stage 1: Show selected evidence item with substrate porosity label
- Stage 2: User selects a technique and clicks Apply
- Stage 3: Show either a correct developed print (color matching the technique) or a "no result" failure with explanation

Behavior:
- Cyanoacrylate on non-porous: shows white fumed ridges
- Ninhydrin on paper: shows purple Ruhemann's purple ridges
- Ninhydrin on glass: shows failure message
- Iodine on any surface: shows yellow-brown temporary result and "must photograph immediately" warning

Instructional Rationale: An Apply-level objective (select technique by substrate) requires the student to actively choose and observe the consequence. Failure feedback for wrong choices teaches substrate logic better than a correct-only demonstration.

Color scheme: Substrate in realistic textures (gray for glass, tan for paper). Developed prints in technique-accurate colors.
```

## Related Resources

- [Chapter 3: Fingerprint Analysis and Dactyloscopy](../../chapters/03-fingerprint-analysis/index.md)
