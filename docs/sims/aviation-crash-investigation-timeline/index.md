---
title: Landmark Crash Investigations Timeline
description: Remember (Bloom L1) landmark aircraft accident investigations and the forensic advance each produced, on an interactive, filterable timeline.
status: built
library: vis-timeline
bloom_level: Remember (L1) — identify landmark aircraft accident investigations and the forensic advance each produced.
image: /sims/aviation-crash-investigation-timeline/aviation-crash-investigation-timeline.png
og:image: /sims/aviation-crash-investigation-timeline/aviation-crash-investigation-timeline.png
twitter:image: /sims/aviation-crash-investigation-timeline/aviation-crash-investigation-timeline.png
social:
   cards: false
---

# Landmark Crash Investigations Timeline

<iframe src="main.html" width="100%" height="660" scrolling="no"></iframe>

[Run the Timeline Fullscreen](main.html){ .md-button .md-button--primary }

## About This MicroSim

Many of aviation's safety advances were paid for by a single tragic accident.
This interactive timeline collects eight landmark crash investigations whose
findings reshaped how aircraft are built, inspected, and flown.

Each milestone is color-coded by the **kind of forensic lesson** it taught —
structural failure, human factors, explosion and reconstruction, or flight
recorders. **Hover** a milestone for a one-line summary, or **click** it to read
what the investigation found and which technique it advanced.

## How to Use It

1. Read the milestones left to right, from the 1954 Comet to the 2009 Air France
   and Colgan investigations.
2. **Hover** any milestone for a quick summary.
3. **Click** a milestone to open the detail panel with the key finding and the
   forensic technique or safety reform it produced.
4. Use the **theme buttons** to filter by lesson type (for example, show only the
   *Structural & metallurgical* cases).
5. Use **◀ ▶** to pan, **+ −** to zoom, and **Fit All** to see every milestone.

## What You Can Learn

- Identify eight landmark crash investigations and when each occurred.
- Match each investigation to the forensic technique or safety reform it
  advanced — from rounded windows to fuel-tank inerting to 90-day locator
  beacons.
- See how the *same* technique (metallurgical fatigue analysis) recurs across
  decades and different accidents.

You can embed this MicroSim on your own web page with this iframe:

```html
<iframe src="https://dmccreary.github.io/forensic-science/sims/aviation-crash-investigation-timeline/main.html"
        width="100%" height="660" scrolling="no"></iframe>
```

## Lesson Plan

**Audience:** High-school forensic science (grades 9–12)
**Time:** 10–15 minutes
**Bloom level:** Remember (L1) — identify landmark investigations.

**Routine.** Have students click every milestone and fill in a three-column
table: *year*, *crash*, *forensic advance*. Then filter by theme and ask which
lesson recurs most often.

**Guided questions:**

- Which two milestones taught lessons about **metal fatigue**? What changed in
  aircraft design as a result?
- Which milestone led to **Crew Resource Management** training?
- Why did **Air France 447** change the rules for underwater locator beacons?
- Two different crashes happened in **1988**. What different forensic lesson did
  each one teach?

**Extension.** Pair this timeline with the **Debris Field Pattern Explorer** and
the chapter's metallurgy section: for Pan Am 103 and TWA 800, describe how the
debris field and the reconstructed wreckage together pointed to the cause.

## References

- [de Havilland Comet (Wikipedia)](https://en.wikipedia.org/wiki/De_Havilland_Comet) — metal fatigue and the move to rounded windows.
- [Tenerife airport disaster (Wikipedia)](https://en.wikipedia.org/wiki/Tenerife_airport_disaster) — human factors and the birth of CRM.
- [Aloha Airlines Flight 243 (Wikipedia)](https://en.wikipedia.org/wiki/Aloha_Airlines_Flight_243) — aging-aircraft fatigue and corrosion.
- [United Airlines Flight 232 (Wikipedia)](https://en.wikipedia.org/wiki/United_Airlines_Flight_232) — fan-disk fatigue fracture.
- [Air France Flight 447 (Wikipedia)](https://en.wikipedia.org/wiki/Air_France_Flight_447) — deep-ocean recorder recovery and beacon rules.
- [vis-timeline documentation](https://visjs.github.io/vis-timeline/docs/timeline/) — the library used to build this MicroSim.

## Specification

This MicroSim was generated from a specification in
[Chapter 19: Aviation Crash Forensics and Aircraft Accident Investigation](../../chapters/19-aviation-crash-forensics/index.md).

> **Design note:** the milestones are colored by *forensic-lesson theme* rather
> than by date, so learners can filter to see how one kind of technique (for
> example, metallurgical fatigue analysis) recurs across decades.
