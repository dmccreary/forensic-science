---
title: Metadata Recovery and Timeline Builder
description: Apply EXIF metadata recovery to extract timestamps and GPS coordinates from digital evidence files and construct an event timeline (Bloom Level 3 — Apply; verb: apply).
status: scaffold
library: p5.js
bloom_level: Apply (L3)
---

# Metadata Recovery and Timeline Builder



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 15: Digital Forensics and Cybercrime Investigation](../../chapters/15-digital-forensics/index.md).

```text
Type: microsim
**sim-id:** metadata-timeline-builder<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning Objective: Apply EXIF metadata recovery to extract timestamps and GPS coordinates from digital evidence files and construct an event timeline (Bloom Level 3 — Apply; verb: apply).

Bloom Level: Apply (L3)
Bloom Verb: Apply

Canvas layout:
- Left panel (~40%): Simulated file browser showing a folder of evidence photographs with file icons
- Right panel (~60%): EXIF data readout panel + timeline visualization

Visual elements:
- Clickable file icons representing 6-8 simulated evidence photos with different timestamps and locations
- EXIF readout showing: Camera Make/Model, Capture Date/Time, GPS Lat/Long, Device Time Zone
- Timeline at bottom showing selected photos plotted in chronological order
- Mini map showing GPS coordinates of selected photos as map pins

Interactive controls:
- Click any photo icon to load its EXIF data into the readout panel
- "Add to Timeline" button places the photo on the chronological timeline
- "Plot on Map" button shows the GPS coordinates on a simplified map grid
- "Export Timeline" displays a formatted text report of all photos in chronological order

Data Visibility Requirements:
- Show EXIF data in human-readable format
- Show GPS coordinates in both decimal degrees and DMS (degrees/minutes/seconds) format
- Highlight time zone inconsistencies in red when detected
- Show the sorted chronological timeline as photos are added

Instructional Rationale: An Apply-level objective (extract and use EXIF metadata) requires hands-on practice with simulated evidence files, building a timeline that mirrors real investigative workflow.

Color scheme: Dark forensic blue background, white panels, green for verified data, red for anomalies/inconsistencies.
```

## Related Resources

- [Chapter 15: Digital Forensics and Cybercrime Investigation](../../chapters/15-digital-forensics/index.md)
