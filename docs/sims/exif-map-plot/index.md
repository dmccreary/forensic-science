---
title: EXIF Geolocation & Alibi Timeline
description: Plot recovered photos' EXIF GPS points on a schematic map and scrub a timeline to test whether the device's trail contradicts a suspect's claimed location (Bloom L4 — Analyze).
status: built
library: p5.js
bloom_level: Analyze (L4) — plot EXIF GPS points over time and test whether the timeline contradicts a claimed alibi.
quality_score: 90
image: /sims/exif-map-plot/exif-map-plot.png
og:image: /sims/exif-map-plot/exif-map-plot.png
twitter:image: /sims/exif-map-plot/exif-map-plot.png
social:
   cards: false
---

# EXIF Geolocation & Alibi Timeline

<iframe src="main.html" width="100%" height="570" scrolling="no"></iframe>

[Run the EXIF Geolocation & Alibi Timeline MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

## About This MicroSim

Every photo carries a hidden logbook called **EXIF metadata** — the moment the
shutter fired, the device that fired it, and, if location services were on, the
**GPS coordinates** where you were standing. Investigators, this MicroSim hands
you five recovered photos and lets you do what a digital-forensics analyst does:
line the metadata up in time and space and see where a device really was.

Each photo drops as a **numbered pin** at its GPS place on a schematic map with
four labeled locations — **Home**, **Downtown**, **Crime Scene**, and **Park**.
A faint dashed route connects the photos in time order, so you can watch the
device *travel* across the afternoon. A suspect claims they were **home all day**;
turn that claim on and the tool tests it against the metadata, photo by photo.

The map is a schematic — a plain grid, not a real street map — so the focus stays
on reading metadata and reasoning about it, not on geography.

## How to Use It

1. Drag the **Time** slider to scrub through the afternoon (9:00 to 16:00). The
   photo whose timestamp is **nearest** the slider is highlighted in orange, and
   its full EXIF — timestamp, GPS location, and device model — appears in the
   **Photo EXIF** panel on the right.
2. Press **Play timeline** to auto-advance the slider and watch the device move
   from pin to pin. Press it again to pause.
3. Turn on **Show claimed location (Home all day)**. A ring is drawn around
   **Home** — the suspect's claimed spot for the whole day.
4. Watch for the moment the highlighted photo's GPS is **not Home**. The tool
   raises a red **ALIBI CONTRADICTED** banner and names the exact place and time
   the metadata puts the device somewhere else.
5. Press **Reset** to return the slider to the start and clear the claim.

## Learning Objective

**Analyze (L4).** After using this MicroSim, investigators can read EXIF
timestamp, GPS, and device fields; plot photos into a chronological timeline on
a map; and analyze whether a device's location trail contradicts a suspect's
claimed location — while distinguishing what the metadata actually supports (the
*device* was there) from an over-broad claim (the *person* was there).
