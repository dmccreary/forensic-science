---
title: Mascot Style Guide
description: Rendering test page for all Trace the Raccoon admonition styles.
---

# Mascot Style Guide

This page previews every admonition style for Trace the Raccoon,
the pedagogical mascot for the Forensic Science textbook.
Use it to verify that images load, colors render correctly,
and text wraps cleanly around the floated mascot image.

Images are at `../../img/mascot/` relative to this page's rendered URL
(`learning-graph/mascot-test/index.html`).

---

!!! mascot-neutral "A Note from Trace"
    <img src="../../img/mascot/neutral.png" class="mascot-admonition-img" alt="Trace the raccoon in a neutral pose">
    Use this style for general sidebars, cross-references, or any content
    that does not call for a specific emotional tone. Trace stands calmly,
    ready to assist investigators at any point in the chapter.

---

!!! mascot-welcome "Welcome, Investigators!"
    <img src="../../img/mascot/welcome.png" class="mascot-admonition-img" alt="Trace the raccoon waving a welcome">
    In this chapter we'll uncover how forensic scientists collect, analyze,
    and interpret physical evidence. Every scene tells a story — your job
    is to read it carefully. Follow the evidence!

---

!!! mascot-thinking "Key Insight"
    <img src="../../img/mascot/thinking.png" class="mascot-admonition-img" alt="Trace the raccoon thinking with a magnifying glass">
    Notice how the Locard Exchange Principle applies here: every contact
    leaves a trace. This single idea underlies nearly every discipline in
    forensic science — from hair analysis to digital forensics.

---

!!! mascot-tip "Trace's Tip"
    <img src="../../img/mascot/tip.png" class="mascot-admonition-img" alt="Trace the raccoon pointing upward with a tip">
    Always photograph evidence before touching it. The order of
    documentation — observe, photograph, sketch, then collect — protects
    the chain of custody and prevents costly errors in court.

---

!!! mascot-warning "Common Mistake"
    <img src="../../img/mascot/warning.png" class="mascot-admonition-img" alt="Trace the raccoon holding up both paws in a warning gesture">
    Don't confuse presumptive tests with confirmatory tests. A positive
    presumptive result means "possible" — it is never sufficient on its own
    for a court conclusion. Always follow up with a confirmatory method.

---

!!! mascot-encourage "You Can Do This!"
    <img src="../../img/mascot/encouraging.png" class="mascot-admonition-img" alt="Trace the raccoon giving a thumbs-up">
    Bloodstain pattern trigonometry can feel overwhelming at first.
    That's completely normal — every forensic investigator felt the same
    way. Work through one drop at a time and the patterns will start
    to make sense.

---

!!! mascot-celebration "Case Closed!"
    <img src="../../img/mascot/celebration.png" class="mascot-admonition-img" alt="Trace the raccoon celebrating with arms raised">
    Outstanding work, investigator! You've completed the chapter.
    The evidence you've gathered — and the reasoning skills you've built —
    will carry forward to every case we tackle together.

---

## Image Border Test

The boxes below add a visible 1px red border so you can verify that
transparent padding has been trimmed correctly. If the character appears
small inside a large white box, run the trim script on that image.

<style>
.mascot-border-test img { border: 1px solid red; }
</style>

<div class="mascot-border-test" style="display:flex; gap:12px; flex-wrap:wrap; align-items:flex-end;">
  <div style="text-align:center">
    <img src="../../img/mascot/neutral.png" width="90" alt="neutral"><br>neutral
  </div>
  <div style="text-align:center">
    <img src="../../img/mascot/welcome.png" width="90" alt="welcome"><br>welcome
  </div>
  <div style="text-align:center">
    <img src="../../img/mascot/thinking.png" width="90" alt="thinking"><br>thinking
  </div>
  <div style="text-align:center">
    <img src="../../img/mascot/tip.png" width="90" alt="tip"><br>tip
  </div>
  <div style="text-align:center">
    <img src="../../img/mascot/warning.png" width="90" alt="warning"><br>warning
  </div>
  <div style="text-align:center">
    <img src="../../img/mascot/encouraging.png" width="90" alt="encouraging"><br>encouraging
  </div>
  <div style="text-align:center">
    <img src="../../img/mascot/celebration.png" width="90" alt="celebration"><br>celebration
  </div>
</div>
