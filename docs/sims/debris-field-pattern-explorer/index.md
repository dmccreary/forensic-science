---
title: Debris Field Pattern Explorer
description: Apply (Bloom L3) the reading of an aircraft debris field to distinguish an intact ground impact from an in-flight breakup by adjusting breakup altitude, wind, and aircraft speed.
status: built
library: p5.js
bloom_level: Apply (L3) — interpret a debris field to distinguish an in-flight breakup from an intact ground impact.
image: /sims/debris-field-pattern-explorer/debris-field-pattern-explorer.png
og:image: /sims/debris-field-pattern-explorer/debris-field-pattern-explorer.png
twitter:image: /sims/debris-field-pattern-explorer/debris-field-pattern-explorer.png
social:
   cards: false
---

# Debris Field Pattern Explorer

<iframe src="main.html" width="100%" height="602" scrolling="no"></iframe>

[Run the Debris Field Explorer Fullscreen](main.html){ .md-button .md-button--primary }

## About This MicroSim

The shape of a wreckage field is one of the first clues an investigator reads.
A tight cluster at a single point says the aircraft hit the ground **intact**. A
long trail of wreckage, sorted by weight, says the aircraft **broke up in the
air** — and the longer and more sorted the field, the higher the breakup
happened.

This MicroSim turns that reasoning into an experiment. You control the **breakup
altitude**, the **wind**, and the **aircraft speed**, and the map shows how the
debris scatters. Heavy pieces (engines, landing gear) carry forward; light
pieces (panels, insulation, paper) fall short and drift with the wind. A live
readout reports the field length and a plain-language verdict.

## How to Use It

1. Start with **Breakup altitude** at 0 m. Notice the wreckage collapses into a
   tight cluster at the red **impact** marker — an intact ground impact.
2. Drag the altitude slider up. Watch the field **stretch** to the right and
   **sort** by weight: dark-blue heavy pieces lead, light-gray pieces lag.
3. Read the **Field Readout**: the debris-field length and the inferred verdict
   update as you move the sliders.
4. Change the **wind speed** and **direction**. With a *Crosswind*, the light
   debris fans out sideways.
5. Adjust **Aircraft speed** to see a faster aircraft fling its wreckage farther
   downrange.
6. Toggle **Show density sorting** off to see what an *unsorted* scatter looks
   like — then back on to recover the weight signal. Press **Reset** to return
   to the defaults.

## What You Can Learn

- Interpret debris-field length and sorting to infer roughly *how high* an
  aircraft broke up.
- Distinguish an intact ground impact from a low-altitude and a high-altitude
  in-flight breakup.
- Explain why heavy and light pieces end up in different places, and how wind
  skews the light-debris scatter.

You can embed this MicroSim on your own web page with this iframe:

```html
<iframe src="https://dmccreary.github.io/forensic-science/sims/debris-field-pattern-explorer/main.html"
        width="100%" height="602" scrolling="no"></iframe>
```

## Lesson Plan

**Audience:** High-school forensic science (grades 9–12)
**Time:** 15–20 minutes
**Bloom level:** Apply (L3) — interpret a debris field.

**Core routine (Manipulate-Observe-Explain).** Give students a described
scenario — "wreckage spread over 8 km, strongly sorted by weight" — and ask them
to set the sliders until the readout matches, then *explain* what altitude that
implies and why.

**Guided questions:**

- With altitude at 0, why is there no density sorting?
- Two crashes have the same aircraft speed, but one field is twice as long as the
  other. What does that tell you about the breakup altitudes?
- A field is long but the light debris is fanned far to one side. Which wind
  setting reproduces that, and what would it mean at a real scene?

**Extension.** Connect to the **Pan Am 103** and **TWA 800** cases from the
chapter: a wide, high-altitude field was an early signal of an in-flight event
rather than a controlled descent into the ground.

## References

- [Aircraft accident analysis (Wikipedia)](https://en.wikipedia.org/wiki/Aviation_accident_analysis) — how investigators read wreckage and debris fields.
- [Pan Am Flight 103 (Wikipedia)](https://en.wikipedia.org/wiki/Pan_Am_Flight_103) — a high-altitude breakup whose scattered field signaled an in-flight explosion.
- [TWA Flight 800 (Wikipedia)](https://en.wikipedia.org/wiki/TWA_Flight_800) — seabed wreckage distribution and reconstruction.
- [p5.js reference](https://p5js.org/reference/) — the library used to build this simulation.

## Specification

This MicroSim was generated from a specification in
[Chapter 19: Aviation Crash Forensics and Aircraft Accident Investigation](../../chapters/19-aviation-crash-forensics/index.md).

> **Design note:** the scatter uses a deliberately simplified ("physics-lite")
> ballistic model — fall time from altitude, with heavy pieces carrying forward
> and light pieces decelerating and drifting on the wind. The goal is to build
> *intuition* for reading a field, not to compute a forensically exact
> trajectory.
