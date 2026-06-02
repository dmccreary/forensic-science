---
title: Firearms Ballistic Pathway
description: Identify the three ballistic phases and the evidence each produces by clicking an annotated trigger-to-wound diagram (Bloom L1 — Remember).
status: built
library: p5.js
bloom_level: Remember (L1) — identify the evidence produced at each ballistic phase.
quality_score: 98
image: /sims/ballistic-pathway/ballistic-pathway.png
og:image: /sims/ballistic-pathway/ballistic-pathway.png
twitter:image: /sims/ballistic-pathway/ballistic-pathway.png
social:
   cards: false
---

# Firearms Ballistic Pathway

<iframe src="main.html" width="100%" height="512" scrolling="no"></iframe>

[Run the Ballistic Pathway MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

## About This MicroSim

A bullet's journey has three **phases**, and each one leaves its own kind of
forensic evidence:

- **Internal** — everything that happens *inside the firearm*: the barrel
  engraves **rifling marks** on the bullet, the **breech face** stamps the
  cartridge case, and **gunshot residue (GSR)** is created.
- **External** — the bullet's *flight* through the air, described by its
  **trajectory angle**.
- **Terminal** — the *impact* with the target, which produces **entry and exit
  wounds** with different shapes.

This MicroSim lays the whole pathway out as one annotated diagram so you can
identify each piece of evidence and learn how examiners collect it.

## How to Use It

1. **Click any blue evidence label** — Rifling marks, Breech face impression,
   GSR emission, Trajectory angle, or Wound characteristics. A panel opens
   telling you *what* it is, *when* it is produced, and *how* it is collected.
2. **Click the entry or exit wound** on the target to compare their shapes.
3. **Hover the barrel cross-section** (or tick **Animate rifling**) to watch the
   lands and grooves spiral — the diagram lists the class characteristics
   (6 lands & grooves, right twist).
4. Use the **dropdown** to jump to any item, and **Reset** to clear the panel.

## What You Can Learn

- Identify the three ballistic phases: internal, external, and terminal.
- Match each phase to the evidence it produces.
- Describe what each evidence type is, when it forms, and how it is collected
  and analyzed.

You can embed this MicroSim on your own web page with this iframe:

```html
<iframe src="https://dmccreary.github.io/forensic-science/sims/ballistic-pathway/main.html"
        width="100%" height="512" scrolling="no"></iframe>
```

## Lesson Plan

**Audience:** High-school forensic science (grades 9–12)
**Time:** 10–15 minutes
**Bloom level:** Remember (L1) — identify.

**Warm-up.** Ask: "Where does a bullet pick up the marks that tie it to one
specific gun?" Then have students click each evidence label and sort the five
items into the three phases.

**Guided questions:**

- Which two evidence types are *individual* characteristics (unique to one
  firearm), and which are *class* characteristics (shared by many)?
- Why does GSR appear in the internal/muzzle phase but not the terminal phase?
- How do the entry and exit wounds differ, and why does that difference reveal
  the bullet's direction of travel?

**Extension.** Discuss why class characteristics narrow the field of possible
firearms while individual characteristics can identify a single weapon.

## References

- [Forensic firearm examination (Wikipedia)](https://en.wikipedia.org/wiki/Forensic_firearm_examination) — rifling, breech marks, and comparison.
- [Gunshot residue (Wikipedia)](https://en.wikipedia.org/wiki/Gunshot_residue) — GSR formation and collection.
- [Terminal ballistics (Wikipedia)](https://en.wikipedia.org/wiki/Terminal_ballistics) — wound morphology and impact behavior.
- [p5.js reference](https://p5js.org/reference/) — the library used to build this simulation.

## Specification

This MicroSim was generated from a specification in
[Chapter 13: Firearms, Ballistics, and Toolmark Examination](../../chapters/13-firearms-and-ballistics/index.md).

> **Design note:** the firearm, trajectory, and target are stylized for
> teaching, not anatomically or mechanically exact. The interaction is
> click-to-identify (Remember level): each evidence label opens a definition and
> collection procedure rather than running a physics simulation.
