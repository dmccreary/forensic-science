---
title: Facial Recognition Pipeline Interactive Diagram
description: Identify the stages of the facial recognition pipeline and the source of error at each stage (Bloom Level 1 — Remember; verb: identify).
status: scaffold
library: p5.js
bloom_level: Remember (L1)
---

# Facial Recognition Pipeline Interactive Diagram



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 16: Facial Recognition Technologies and Biometric Identification](../../chapters/16-facial-recognition/index.md).

```text
Type: infographic
**sim-id:** facial-recognition-pipeline<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning Objective: Identify the stages of the facial recognition pipeline and the source of error at each stage (Bloom Level 1 — Remember; verb: identify).

Bloom Level: Remember (L1)
Bloom Verb: Identify

Canvas layout:
- Horizontal pipeline showing five stages: Input Image → Face Detection → Landmark Extraction → Feature Vector Generation → Database Comparison
- Each stage is a labeled box with an icon
- Below each stage: an error source label

Visual elements:
- Animated example probe image flowing through each pipeline stage
- Stage 1 (Input): Shows a CCTV still frame — low res, oblique angle
- Stage 2 (Detection): Bounding box drawn around the detected face
- Stage 3 (Landmarks): 68 landmark dots overlaid on the face
- Stage 4 (Vector): Abstract numerical vector representation
- Stage 5 (Comparison): Gallery grid with distance scores, ranked matches

Interactive controls:
- Click each stage to open a detail panel explaining: what the stage does, what can go wrong, and how error rate is affected
- "Change Image Quality" button degrades the probe image (lower resolution, add noise) and shows how detection confidence drops
- Toggle: "Classical (Eigenface)" vs "Deep Learning (CNN)" — switches algorithm type

Data Visibility Requirements:
- Show similarity scores for top 5 gallery matches in Stage 5
- Show threshold line: matches above/below threshold
- Show error rate by demographic panel: "Error rate for this system: Light-skin male 0.8%, Dark-skin female 7.3%"

Instructional Rationale: A Remember-level objective (identify pipeline stages and error sources) is best served by an annotated, interactive diagram where each stage is clickable and error sources are explicitly labeled.

Color scheme: Dark background, blue stage boxes, orange error labels, green confidence bars, red threshold line.
```

## Related Resources

- [Chapter 16: Facial Recognition Technologies and Biometric Identification](../../chapters/16-facial-recognition/index.md)
