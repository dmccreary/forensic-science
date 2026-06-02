---
title: Evidence Search Pattern Selector
description: Select the appropriate search pattern for a given scene description (Bloom Level 3 — Apply; verb: select).
status: scaffold
library: p5.js
bloom_level: Apply (L3)
---

# Evidence Search Pattern Selector



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 2: Crime Scene Investigation and Evidence Collection](../../chapters/02-crime-scene-investigation/index.md).

```text
Type: microsim
**sim-id:** search-pattern-selector<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning Objective: Select the appropriate search pattern for a given scene description (Bloom Level 3 — Apply; verb: select).

Bloom Level: Apply (L3)
Bloom Verb: Select

Canvas layout:
- Scene display area (left ~70%): overhead grid representing the scene
- Control panel (right ~30%): pattern selection, scene parameters, animated searcher dots

Visual elements:
- A grid representing a top-down scene view (outdoor field, interior room)
- Animated dots representing searchers moving through the scene using the selected pattern
- Color-coded cells: unsearched (light gray), currently being searched (yellow), searched (green)
- A summary panel showing the pattern's best-use conditions

Interactive controls:
- Dropdown: Select pattern (Grid, Spiral Inward, Spiral Outward, Zone)
- Slider: Number of searchers (1–6)
- Dropdown: Scene type (indoor room, outdoor field, large outdoor area)
- Button: "Start Search" / "Pause" / "Reset"
- Animation speed slider

Default parameters:
- Pattern: Grid
- Searchers: 2
- Scene: outdoor field (20×20 grid)

Behavior:
- "Start Search" animates searcher dots moving through the selected pattern
- At completion, a summary shows total cells searched, animation steps elapsed, and a pattern efficiency rating
- If the user selects more searchers than the pattern supports efficiently, a warning tooltip appears
- Clicking a grid cell reveals the type of evidence that might be found there (randomly assigned from a list: fiber, footwear impression, latent print, etc.)

Instructional Rationale: An Apply-level objective (select and use a search pattern) requires the learner to experiment with the variables that govern pattern selection — scene size, team size, pattern type — and observe the consequences. Animation with coverage feedback makes the trade-offs visible rather than abstract.

Color scheme: Gray unsearched, yellow active, green cleared. If "contamination mode" is toggled on, cells a searcher skips appear red.
```

## Related Resources

- [Chapter 2: Crime Scene Investigation and Evidence Collection](../../chapters/02-crime-scene-investigation/index.md)
