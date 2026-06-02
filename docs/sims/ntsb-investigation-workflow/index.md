---
title: NTSB Investigation Workflow
description: Understand (Bloom L2) the sequence of an aircraft accident investigation from notification to probable-cause determination by clicking each stage of an interactive flowchart.
status: built
library: p5.js
bloom_level: Understand (L2) — describe the sequence of an aircraft accident investigation from notification to probable-cause determination.
image: /sims/ntsb-investigation-workflow/ntsb-investigation-workflow.png
og:image: /sims/ntsb-investigation-workflow/ntsb-investigation-workflow.png
twitter:image: /sims/ntsb-investigation-workflow/ntsb-investigation-workflow.png
social:
   cards: false
---

# NTSB Investigation Workflow

<iframe src="main.html" width="100%" height="602" scrolling="no"></iframe>

[Run the Workflow Fullscreen](main.html){ .md-button .md-button--primary }

## About This MicroSim

An aircraft accident investigation follows a disciplined sequence — from the
first notification through to a final report that states a **probable cause**.
This interactive flowchart lays out the nine stages an NTSB investigation moves
through, top to bottom.

Click any stage to read a short description of what happens there. A red
**re-test loop** connects *Analysis & Correlation* back to *Laboratory Analysis*,
showing that the process is not strictly one-way: when a hypothesis needs more
evidence, investigators send work back to the lab before reaching a conclusion.

## How to Use It

1. Read the nine stages from top to bottom — the order in which an investigation
   actually proceeds.
2. **Click any stage** to open its infobox in the panel on the right.
3. Click the same stage again to clear the selection.
4. Trace the red arrow from stage 8 back to stage 6 — the **re-test loop** — and
   click stage 8 to read why analysis can return to the laboratory.

## What You Can Learn

- Describe the ordered stages of an aircraft accident investigation, from
  notification to probable cause.
- Explain the role of the Investigator-in-Charge and the go-team launch.
- Explain why the workflow includes a feedback loop rather than a straight line,
  and why the final output is "probable cause," not "proven cause."

You can embed this MicroSim on your own web page with this iframe:

```html
<iframe src="https://dmccreary.github.io/forensic-science/sims/ntsb-investigation-workflow/main.html"
        width="100%" height="602" scrolling="no"></iframe>
```

## Lesson Plan

**Audience:** High-school forensic science (grades 9–12)
**Time:** 10–15 minutes
**Bloom level:** Understand (L2) — describe the investigation sequence.

**Routine.** Have students click through all nine stages in order, then close the
sim and try to reconstruct the sequence from memory. Reopen it to check.

**Guided questions:**

- Why must *On-Scene Documentation* (stage 3) come before anything is moved?
- What does the *Investigator-in-Charge* do, and how quickly does the go-team
  deploy?
- Explain the re-test loop between stages 8 and 6. Why is a one-way flow not
  enough for a complex crash?
- Why does the final report say "probable cause" rather than "proven cause"?

**Extension.** Map each stage to the chapter techniques it uses — recorder
readout, wreckage reconstruction, metallurgical analysis, human factors — and
identify which forensic skill from earlier chapters each one draws on.

## References

- [ICAO Annex 13 (Wikipedia)](https://en.wikipedia.org/wiki/Annex_13) — the international standard for aircraft accident investigation.
- [National Transportation Safety Board (Wikipedia)](https://en.wikipedia.org/wiki/National_Transportation_Safety_Board) — the U.S. investigative agency and its go-team system.
- [Aircraft accident analysis (Wikipedia)](https://en.wikipedia.org/wiki/Aviation_accident_analysis) — the broader investigative process.
- [p5.js reference](https://p5js.org/reference/) — the library used to build this simulation.

## Specification

This MicroSim was generated from a specification in
[Chapter 19: Aviation Crash Forensics and Aircraft Accident Investigation](../../chapters/19-aviation-crash-forensics/index.md).

> **Design note:** the chapter specifies a Mermaid flowchart with click
> callbacks. To stay consistent with the other workflow MicroSims in this
> textbook (which use clickable p5.js flowcharts with a side detail panel), this
> sim implements the same interaction in p5.js: every node is clickable and opens
> an infobox, and the re-test feedback arrow is drawn explicitly.
