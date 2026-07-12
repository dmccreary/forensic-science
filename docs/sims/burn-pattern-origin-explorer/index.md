---
title: Burn-Pattern Origin Explorer
description: Locate a fire's point of origin from V-pattern and char evidence and flag multiple origins as an arson indicator (Bloom L4 — Analyze).
status: built
library: p5.js
bloom_level: Analyze (L4) — locate a fire's point of origin and flag multiple origins as an arson indicator.
quality_score: 90
image: /sims/burn-pattern-origin-explorer/burn-pattern-origin-explorer.png
og:image: /sims/burn-pattern-origin-explorer/burn-pattern-origin-explorer.png
twitter:image: /sims/burn-pattern-origin-explorer/burn-pattern-origin-explorer.png
social:
   cards: false
---

# Burn-Pattern Origin Explorer

<iframe src="main.html" width="100%" height="570" scrolling="no"></iframe>

[Run the Burn-Pattern Origin Explorer MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

## About This MicroSim

A fire leaves its history written in scars. Hot gases climb **up and out**, so a
flame scorches a wall into a **V-pattern** whose apex points down toward the
**origin** — the lowest, most heavily damaged spot. The deepest, most
concentrated **char** sits right on that origin.

This MicroSim gives investigators a top-down room plan where those cues are
drawn but the origin is **not** marked. Your job is to read the evidence and
place your own **origin estimate**, then check how close you got.

The strongest arson evidence is not one dramatic burn — it is the **geometry**.
A single origin near an outlet is consistent with an accident. **Two separate
origins with no burn path connecting them** is a strong arson indicator, because
a fire cannot teleport. Either way, an accelerant claim still requires **lab
confirmation**.

## How to Use It

1. Pick a **Scenario**: *Accidental (single origin)* or *Suspicious (two
   origins)*.
2. Study the **V-pattern** cones — each apex points toward an origin — and look
   for the deepest, most concentrated **char**.
3. Drag the **Fire spread** slider to watch the char grow outward from the
   origin(s) as a time-lapse.
4. **Click the floor** to drop your origin estimate.
5. Press **Score My Origin** to see the distance to the nearest true origin and
   a rating: *Excellent*, *Good*, or *Off*. Toggle **Show burn severity** to
   reveal the full heat gradient and confirm your reasoning.
6. In the two-origin scenario, watch for the **MULTIPLE ORIGINS — arson red
   flag** once the origins are revealed. Press **Reset** to try again.

## Learning Objective

**Analyze (L4):** Locate a fire's point of origin from burn-severity evidence
and flag multiple origins as an arson indicator. Investigators practice
synthesizing V-pattern direction and char concentration into a defended origin
call, and learn that two unconnected origins point to a set fire — a conclusion
that still depends on lab confirmation of any accelerant.

You can embed this MicroSim on your own web page with this iframe:

```html
<iframe src="https://dmccreary.github.io/forensic-science/sims/burn-pattern-origin-explorer/main.html"
        width="100%" height="570" scrolling="no"></iframe>
```

## Lesson Plan

**Audience:** High-school forensic science (grades 9–12)
**Time:** 15–20 minutes
**Bloom level:** Analyze (L4) — locate a fire's point of origin and flag multiple origins as an arson indicator.

**Warm-up.** Ask investigators: "Fire moves up and out. If a flame burns a
V-shaped scar into a wall, where on that V would you expect the fire to have
started?"

**Guided questions:**

- Using the V-pattern apex and the deepest char, place your origin estimate. What
  two cues did you combine, and how does the burn-severity overlay confirm or
  correct your call?
- Run the *Suspicious (two origins)* scenario. Why are two separate origins with
  no burn path between them a strong arson indicator?
- A single origin near an electrical outlet is "consistent with an accident." Why
  is that phrasing more careful than saying "this was an accident"?

**Extension.** Investigate how burn indicators can be misread (flashover,
ventilation effects) and why an accelerant claim always requires laboratory
confirmation of a residue sample.

## References

- [Fire investigation (Wikipedia)](https://en.wikipedia.org/wiki/Fire_investigation) — how investigators trace a fire to its origin.
- [Arson (Wikipedia)](https://en.wikipedia.org/wiki/Arson) — multiple origins and accelerants as indicators of a set fire.
- [Fire triangle (Wikipedia)](https://en.wikipedia.org/wiki/Fire_triangle) — the fuel, heat, and oxygen a fire needs to spread from its origin.
- [p5.js reference](https://p5js.org/reference/) — the library used to build this simulation.

## Specification

This MicroSim was generated from a specification in
[Chapter 10: Fire Investigation, Arson, and Explosives](../../chapters/10-fire-arson-explosives/index.md).

> **Design note:** the room, V-patterns, and char gradient are stylized for
> teaching — the spread model is a qualitative time-lapse chosen to make origin
> reasoning visible, not a physics-based fire simulation.
