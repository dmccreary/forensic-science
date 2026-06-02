---
title: ADH and mPMI Calculator MicroSim
description: Calculate minimum post-mortem interval using Accumulated Degree Hours and ambient temperature records (Bloom Level 3 — Apply; verb: calculate).
status: scaffold
library: p5.js
bloom_level: Apply (L3)
---

# ADH and mPMI Calculator MicroSim



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 12: Forensic Entomology and Decomposition Analysis](../../chapters/12-forensic-entomology/index.md).

```text
Type: microsim
**sim-id:** adh-mpmi-calculator<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning Objective: Calculate minimum post-mortem interval using Accumulated Degree Hours and ambient temperature records (Bloom Level 3 — Apply; verb: calculate).

Bloom Level: Apply (L3)
Bloom Verb: Calculate

Canvas layout:
- Left panel (~50%): Temperature input table (hourly temperature entries for 7 days)
- Right panel (~50%): Running ADH sum chart; mPMI result readout

Visual elements:
- A table where students enter or edit hourly temperature values (defaults pre-populated with a realistic warm-weather 7-day dataset)
- A bar chart showing daily ADH contributions
- A running cumulative ADH sum line graph
- A labeled ADH threshold line (the ADH required to reach the student-specified developmental stage)
- A "mPMI result" panel showing: days since oviposition, calendar date of estimated earliest death, and a confidence range

Interactive controls:
- Dropdown: Select insect species (Calliphora vicina, Lucilia sericata, Phormia regina)
- Dropdown: Select observed developmental stage (First instar, Second instar, Third instar, Pupa)
- Input: Base temperature (defaults to 2°C for C. vicina)
- Input or edit hourly temperatures
- "Calculate mPMI" button runs the ADH accumulation and identifies when the threshold was crossed

Data Visibility Requirements:
- Show the ADH for each day
- Show cumulative ADH over time
- Show where cumulative ADH crosses the developmental threshold — this is the estimated first oviposition (= minimum death date)
- Show the published ADH requirement for the selected species and stage (from reference table)

Instructional Rationale: An Apply-level objective (calculate mPMI) requires the learner to perform the temperature-accumulation calculation themselves and see the result on the timeline.

Color scheme: Blue for temperature bars, orange for cumulative ADH line, red dashed line for ADH threshold, green highlight for the mPMI result date.
```

## Related Resources

- [Chapter 12: Forensic Entomology and Decomposition Analysis](../../chapters/12-forensic-entomology/index.md)
