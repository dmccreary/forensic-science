---
title: Glass Fracture Sequence Analyzer
description: Apply the 3R Rule to determine impact direction and sequence from a glass fracture pattern (Bloom Level 3 — Apply; verb: apply).
status: scaffold
library: p5.js
bloom_level: Apply (L3)
---

# Glass Fracture Sequence Analyzer



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 5: Glass, Soil, and Physical Trace Evidence](../../chapters/05-glass-soil-trace-evidence/index.md).

```text
Type: microsim
**sim-id:** glass-fracture-sequence<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning Objective: Apply the 3R Rule to determine impact direction and sequence from a glass fracture pattern (Bloom Level 3 — Apply; verb: apply).

Bloom Level: Apply (L3)
Bloom Verb: Apply

Canvas layout:
- Main view (~70%): rectangular glass panel showing fracture pattern
- Control panel (~30%): impact simulation controls and analysis tools

Visual elements:
- Glass panel rendered as a light blue-gray rectangle
- Radial fracture lines in dark gray, radiating from impact point(s)
- Concentric fracture lines in medium gray, forming rings
- Impact point(s) marked with a small circle
- On termination events (second fracture meeting first), a small red "T" mark shows where the second fracture stopped

Interactive controls:
- Click anywhere on the glass to add an impact point (up to 3 impacts)
- The simulation draws realistic radial and concentric fracture patterns for each impact
- A "Which came first?" quiz button: hides the impact sequence numbers and asks students to click the impacts in the order they believe they occurred
- Correct/wrong feedback with explanation citing the 3R Rule

Data Visibility Requirements:
- Stage 1: Show a pre-built two-impact fracture pattern with the sequence hidden
- Stage 2: Student clicks to identify which impact point is #1 (first), then #2 (second)
- Stage 3: Reveal correct sequence; highlight the termination points where fracture lines from impact #2 stop at fracture lines from impact #1

Instructional Rationale: An Apply-level objective (apply the 3R Rule) requires the student to use the rule to reach a conclusion, not just recall it. The sequence quiz format forces active analysis.

Color scheme: Light blue-gray glass; dark gray radial lines; medium gray concentric lines; red termination marks; green for correct answer highlights.
```

## Related Resources

- [Chapter 5: Glass, Soil, and Physical Trace Evidence](../../chapters/05-glass-soil-trace-evidence/index.md)
