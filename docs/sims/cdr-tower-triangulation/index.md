---
title: CDR and Tower Triangulation Timeline MicroSim
description: Use CDR and cell tower data to reconstruct a device's geographic movement across an investigative timeline (Bloom Level 3 — Apply; verb: use).
status: scaffold
library: p5.js
bloom_level: Apply (L3)
---

# CDR and Tower Triangulation Timeline MicroSim



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 17: Cell Phone Analytics and Mobile Forensics](../../chapters/17-cell-phone-analytics/index.md).

```text
Type: microsim
**sim-id:** cdr-tower-triangulation<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning Objective: Use CDR and cell tower data to reconstruct a device's geographic movement across an investigative timeline (Bloom Level 3 — Apply; verb: use).

Bloom Level: Apply (L3)
Bloom Verb: Use

Canvas layout:
- Left panel (~50%): Simplified map grid showing cell tower locations and their coverage circles
- Right panel (~50%): CDR table showing call timestamps and tower IDs

Visual elements:
- Map with 6–8 cell towers shown as icons, each with a labeled coverage circle
- CDR table: rows showing timestamp, call type (outgoing/incoming), duration, tower ID
- Timeline bar at the bottom showing device movement as a colored path connecting towers chronologically
- Animated "device" icon that moves between towers as the timeline is played

Interactive controls:
- Click any CDR row to highlight the corresponding tower on the map
- "Play Timeline" button — animates the device movement across the map based on CDR records
- "Show Triangulation" button — displays triangulation calculation for a specific time window with 3-tower measurements shown
- Slider: "Playback speed"

Data Visibility Requirements:
- Show the geographic coverage area (circle radius) for each tower — radius varies by tower type
- Show the trilateration math: three circles, their intersection, the estimated location point
- Show the resulting location estimate with uncertainty radius
- Export a formatted text timeline of tower contacts

Instructional Rationale: An Apply-level objective (use CDR to reconstruct geographic movement) requires hands-on work with simulated CDR data, placing a device's movements in geographic and temporal context.

Color scheme: Map in light gray, towers in blue, coverage circles in semi-transparent blue, device path in orange, selected tower in green.
```

## Related Resources

- [Chapter 17: Cell Phone Analytics and Mobile Forensics](../../chapters/17-cell-phone-analytics/index.md)
