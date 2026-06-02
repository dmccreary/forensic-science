---
title: Forensic Imaging and Hash Verification Workflow
description: Explain the forensic imaging procedure and verify the integrity of a forensic image using hash comparison (Bloom Level 2 — Understand; verb: explain).
status: scaffold
library: p5.js
bloom_level: Understand (L2)
---

# Forensic Imaging and Hash Verification Workflow



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 15: Digital Forensics and Cybercrime Investigation](../../chapters/15-digital-forensics/index.md).

```text
Type: workflow
**sim-id:** forensic-imaging-workflow<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning Objective: Explain the forensic imaging procedure and verify the integrity of a forensic image using hash comparison (Bloom Level 2 — Understand; verb: explain).

Bloom Level: Understand (L2)
Bloom Verb: Explain

Canvas layout:
- Horizontal workflow with five stations: Original Drive → Write-Blocker → Forensic Workstation → Forensic Image → Hash Verification
- Each station is a labeled icon with a detail panel that opens on click

Visual elements:
- Animated data flow arrows between stations
- Write-blocker shown as a physical block preventing reverse data flow
- Hash computation animation at Original Drive and at Forensic Image stations
- Comparison panel showing MD5 and SHA-256 hashes side-by-side with green checkmark if matching

Interactive controls:
- Click each station to reveal purpose and procedure
- "Simulate Tamper" button: modifies one bit in the image and recomputes hash — shows how the hash completely changes even for a 1-bit modification
- Toggle: MD5 / SHA-256 display

Data Visibility Requirements:
- Show example hash values in correct format (32 hex for MD5, 64 hex for SHA-256)
- Show the tamper simulation: one character change in image → completely different hash value
- Show the "MATCH" / "MISMATCH" result clearly

Instructional Rationale: An Understand objective (explain the imaging and hash workflow) benefits from a visual, step-by-step workflow diagram with the ability to simulate tampering — making the importance of hash verification concrete and memorable.

Color scheme: Blue for data flow, gray for hardware components, green for verified match, red for mismatch/tamper.
```

## Related Resources

- [Chapter 15: Digital Forensics and Cybercrime Investigation](../../chapters/15-digital-forensics/index.md)
