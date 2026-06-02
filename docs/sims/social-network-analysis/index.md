---
title: Social Network Analysis Graph Explorer
description: Analyze a social network graph to identify hub nodes, broker nodes, and communication clusters relevant to a criminal investigation (Bloom Level 4 — Analyze; verb: analyze).
status: scaffold
library: p5.js
bloom_level: Analyze (L4)
---

# Social Network Analysis Graph Explorer



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 18: Social Media Analysis and Open-Source Intelligence](../../chapters/18-social-media-osint/index.md).

```text
Type: microsim
**sim-id:** social-network-analysis<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning Objective: Analyze a social network graph to identify hub nodes, broker nodes, and communication clusters relevant to a criminal investigation (Bloom Level 4 — Analyze; verb: analyze).

Bloom Level: Analyze (L4)
Bloom Verb: Analyze

Canvas layout:
- Full canvas: Force-directed graph visualization with labeled nodes
- Control panel at bottom: metric selection and filtering

Visual elements:
- Nodes representing 15–20 simulated accounts (labeled with fake names)
- Edges representing communication relationships with variable thickness based on frequency
- Node color coding: suspect accounts in red, known associates in orange, peripheral contacts in gray
- Node size proportional to selected centrality metric

Interactive controls:
- Dropdown: "Color by" — Degree Centrality / Betweenness Centrality / Clustering Coefficient
- Dropdown: "Size by" — same options
- Slider: "Minimum connections" — filters out nodes below a threshold
- Click any node: displays name, degree, betweenness score, and list of connected accounts
- "Highlight clusters" button — runs community detection and colors clusters differently
- "Show shortest path" — click two nodes to highlight the shortest path between them

Data Visibility Requirements:
- Show centrality scores in the node detail panel
- Show the number of distinct communication clusters identified
- Show the top 3 "broker" nodes by betweenness centrality in a summary panel

Instructional Rationale: An Analyze-level objective (identify structure and key actors in a network) requires active manipulation of the graph — filtering, selecting metrics, and discovering structure through interaction rather than passive reading.

Color scheme: Dark background, blue edges, node colors by role/metric, white labels, orange path highlighting.
```

## Related Resources

- [Chapter 18: Social Media Analysis and Open-Source Intelligence](../../chapters/18-social-media-osint/index.md)
