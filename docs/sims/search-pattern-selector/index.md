---
title: Evidence Search Pattern Selector
description: Apply (Bloom L3) crime-scene search-pattern rules by selecting a search pattern for a given scene, running an animated overhead sweep, and judging the coverage, time, and personnel trade-offs against a live fit rating.
status: built
library: p5.js
bloom_level: Apply (L3) — select the appropriate search pattern for a given scene description.
image: /sims/search-pattern-selector/search-pattern-selector.png
og:image: /sims/search-pattern-selector/search-pattern-selector.png
twitter:image: /sims/search-pattern-selector/search-pattern-selector.png
social:
   cards: false
---

# Evidence Search Pattern Selector

<iframe src="main.html" width="100%" height="602" scrolling="no"></iframe>

[Run the Search Pattern Selector Fullscreen](main.html){ .md-button .md-button--primary }

## About This MicroSim

When investigators search a crime scene, they do not wander around looking for
clues — they follow a **systematic search pattern** so that every part of the
scene is covered and nothing is missed, double-searched, or trampled. The right
pattern depends on the scene: a small room, a measurable outdoor field, and a
sprawling outdoor area each call for a different approach, and each choice trades
off **coverage, time, and the number of searchers** you need.

This MicroSim turns that decision into a **select-and-run tool**. You **select** a
search pattern — Grid/Line, Spiral Inward, Spiral Outward, or Zone/Quadrant —
choose a scene type and team size, and press **Start Search**. Animated searcher
dots sweep an overhead grid: cells go from **gray** (unsearched) to **yellow**
(being searched right now) to **green** (searched). A live **fit rating** tells you
whether your pattern suits the scene, a **warning** appears when you assign more
searchers than the pattern uses well, and a **summary** at the end reports how many
cells were covered, how many steps it took, and an overall efficiency rating.

## How to Use It

1. Pick a **Pattern** from the first dropdown (start with **Grid**).
2. Pick a **Scene** from the second dropdown — an indoor room, an outdoor field,
   or a large outdoor area. The grid resizes to match the scene.
3. Read the **fit rating** in the right-hand panel: green (good fit), amber
   (workable but not ideal), or red (poor fit) for the pattern-and-scene pair.
4. Set the number of **Searchers** (1–6) and the animation **Speed** with the
   sliders. If you assign too many searchers for the pattern, a **warning** appears.
5. Press **Start Search** to run the sweep; press it again to **Pause** or
   **Resume**. Watch cells turn yellow then green as coverage builds.
6. When the search finishes, read the **summary**: cells searched, steps elapsed,
   and the **efficiency rating**. Then **click any green cell** to reveal the kind
   of evidence that might have been found there.
7. Press **Reset** (or change any setting) to clear the scene and try a different
   combination.

## What You Can Learn

- **Select** an appropriate search pattern for a given scene type and size, and see
  immediately whether your choice fits.
- Compare patterns on the real trade-offs: a **grid** is the most thorough single-team
  method for a measurable rectangle; a **spiral** suits a small scene with one searcher
  or a single central focal point; **zones** let a large scene be covered in parallel
  by several teams.
- Recognize that **more searchers is not always better** — crowding a single spiral or
  line path wastes people and raises the risk of stepping on evidence.
- Understand *why* a systematic pattern beats a random search: overlap and full coverage
  are what keep small items (a fiber, a latent print, a spent cartridge) from being missed.

You can embed this MicroSim on your own web page with this iframe:

```html
<iframe src="https://dmccreary.github.io/forensic-science/sims/search-pattern-selector/main.html"
        width="100%" height="602" scrolling="no"></iframe>
```

## Lesson Plan

**Audience:** High-school forensic science (grades 9–12)
**Time:** 15–20 minutes
**Bloom level:** Apply (L3) — select the appropriate search pattern for a given scene.

**Predict-then-run (the core routine).** For each scene, students *first* state which
pattern they would choose and why, *then* select it and press Start Search to test their
reasoning against the fit rating and the efficiency summary. The prediction step is what
pushes this activity from "watch dots move" to *applying* a selection rule. Have students
run the same scene with two different patterns and compare the step counts.

**Guided questions:**

- Set the scene to **Large outdoor area** and try the **Spiral Inward** pattern. Why does
  the fit rating warn against it, and which pattern does the panel recommend instead?
- Choose the **Spiral Inward** pattern, then drag the **Searchers** slider to 6. Read the
  warning. In plain language, why does crowding one spiral path waste searchers?
- Run an **Indoor room** with the **Grid** pattern at one searcher, then at two. How does
  the number of steps change, and what does that tell you about the coverage-versus-time
  trade-off?

**Extension.** Real scenes are rarely a clean rectangle. Ask students to describe a scene
the sim does *not* model — a winding hiking trail, a multi-room apartment, a vehicle
interior — and argue which pattern (or combination) they would choose and what they would
give up. Note honestly that no pattern guarantees finding everything: search effectiveness
also depends on lighting, searcher training, and how well the scene was secured first.

## References

- [Crime scene (Wikipedia)](https://en.wikipedia.org/wiki/Crime_scene) — how scenes are secured, documented, and systematically searched, and why method matters.
- [Forensic search (Wikipedia)](https://en.wikipedia.org/wiki/Forensic_search) — overview of organized search approaches used to locate physical and digital evidence.
- [Boustrophedon (Wikipedia)](https://en.wikipedia.org/wiki/Boustrophedon) — the back-and-forth "as the ox plows" sweep that the grid and zone searchers in this sim follow.
- [p5.js reference](https://p5js.org/reference/) — the library used to build this simulation.

## Specification

This MicroSim was generated from a specification in
[Chapter 2: Crime Scene Investigation and Evidence Collection](../../chapters/02-crime-scene-investigation/index.md).

> **Design note:** the specification asked for a control panel along the right ~30%
> that itself held "animated searcher dots." To keep the **Apply (L3)** objective in
> focus — *selecting* the right pattern — the right panel was used for the decision
> feedback (pattern description, live fit rating, scene recommendation, searcher
> warning, and the coverage summary) while the animated searcher dots run on the
> **overhead grid** where their coverage is actually visible. The spec's optional
> "contamination mode" (red skipped cells) was omitted because every pattern in this
> build provides complete coverage, so there are no skipped cells to flag; the more
> instructive risk — assigning too many searchers to a single path — is surfaced as a
> live warning instead. The click-to-reveal-evidence behavior is preserved on searched
> (green) cells.
