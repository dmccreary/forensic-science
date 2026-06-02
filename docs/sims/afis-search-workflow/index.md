---
title: AFIS Search and Comparison Workflow
description: Explain how AFIS encodes minutiae and generates a candidate list for human examiner review (Bloom Level 2 — Understand; verb: explain).
status: scaffold
library: p5.js
bloom_level: Understand (L2)
---

# AFIS Search and Comparison Workflow



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 3: Fingerprint Analysis and Dactyloscopy](../../chapters/03-fingerprint-analysis/index.md).

```text
Type: workflow
**sim-id:** afis-search-workflow<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning Objective: Explain how AFIS encodes minutiae and generates a candidate list for human examiner review (Bloom Level 2 — Understand; verb: explain).

Bloom Level: Understand (L2)
Bloom Verb: Explain

Purpose: Walk investigators through the AFIS search pipeline from latent print scan to candidate list to examiner review.

Visual layout:
- Horizontal step-through diagram with five stations:
  1. Latent Print Scanned
  2. Minutiae Extraction (mathematical encoding)
  3. Database Search (comparison against stored templates)
  4. Candidate List Generated (ranked results)
  5. Human Examiner Review (final identification or exclusion)

Interactive elements:
- Click any station to reveal a detailed description panel
- An animated "minutiae map" at Stage 2 shows a fingerprint with dots placed at ridge endings (red) and bifurcations (blue) — dots appear one by one as the extraction animates
- At Stage 4, a simulated candidate list shows three "match" cards ranked by score (e.g., 92/100, 78/100, 61/100), each with a fingerprint thumbnail
- At Stage 5, a banner reads "AFIS does NOT make identifications — examiner required"

Data Visibility Requirements:
- Stage 2: Show the minutiae encoding process — a scanned print image, then overlay of dots at ridge endings and bifurcations, then a simplified (x, y, angle) coordinate list
- Stage 4: Show candidate list with realistic AFIS score numbers

Hover text for each station explains the process in 2–3 sentences.

Color scheme: Blue for database/technology stages, green for human review stage (reinforcing that the human makes the call).

Instructional Rationale: The Understand objective (explain how AFIS works) requires the learner to trace the process with concrete data. Step-through with data visibility at each stage shows the transformation from print to template to candidate list.
```

## Related Resources

- [Chapter 3: Fingerprint Analysis and Dactyloscopy](../../chapters/03-fingerprint-analysis/index.md)
