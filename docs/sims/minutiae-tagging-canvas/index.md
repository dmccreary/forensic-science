---
title: Minutiae-Tagging Canvas
description: Tag ridge endings and bifurcations on a latent print, then search a six-suspect AFIS database and interpret the ranked candidate list (Bloom L4 — Analyze).
status: built
library: p5.js
bloom_level: Analyze (L4) — locate and classify minutiae and interpret a ranked AFIS candidate list.
quality_score: 90
image: /sims/minutiae-tagging-canvas/minutiae-tagging-canvas.png
og:image: /sims/minutiae-tagging-canvas/minutiae-tagging-canvas.png
twitter:image: /sims/minutiae-tagging-canvas/minutiae-tagging-canvas.png
social:
   cards: false
---

# Minutiae-Tagging Canvas

<iframe src="main.html" width="100%" height="560" scrolling="no"></iframe>

[Run the Minutiae-Tagging Canvas Fullscreen](main.html){ .md-button .md-button--primary }

## About This MicroSim

An **Automated Fingerprint Identification System (AFIS)** does not compare
pictures of prints. It reduces each print to a **map of minutiae** — the
coordinates and types of every **ridge ending** and **bifurcation** — then looks
for database records whose maps **overlap** the crime-scene map and scores each
one. The output is a **ranked candidate list**, not a "guilty" stamp.

This MicroSim lets investigators generate that map by hand. You tag the minutiae
on a stylized loop print, and each tag is scored against a hidden **ground-truth**
set. When you search the database, the six suspects are ranked by how many of your
correctly tagged minutiae they share. The point is built into the design: AFIS
**ranks** candidates, and a human examiner — not the computer — makes the final
identification.

## How to Use It

1. Pick a **Tag type** from the dropdown — *Ridge ending* (drawn as a circle) or
   *Bifurcation* (drawn as a triangle).
2. **Click on the print** to place a tag on each minutia you find. Each tag turns
   **green** (correct spot and type), **orange** (right spot, wrong type), or
   **red** (off-ridge — no minutia there).
3. Press **Search AFIS Database** to rank all six suspects by how many of your
   correctly tagged minutiae overlap each one's template. Read the ranked list and
   the score bars on the right.
4. Use **Show Answer** to reveal the ground-truth minutiae as dashed markers and
   check your tagging.
5. Press **Clear Tags** to start over and try to place all six.

## Learning Objective

Locate and classify minutiae on a latent print and interpret the resulting ranked
AFIS candidate list, recognizing that the system ranks while a human examiner
decides (Bloom Level 4 — Analyze).
