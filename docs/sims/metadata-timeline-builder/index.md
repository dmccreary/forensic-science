---
title: Metadata Recovery and Timeline Builder
description: Recover EXIF metadata from simulated evidence photos, build a chronological timeline, and detect time-zone anomalies (Bloom L3 — Apply).
status: built
library: p5.js
bloom_level: Apply (L3) — apply EXIF metadata recovery to extract timestamps and GPS coordinates and construct an event timeline.
quality_score: 98
image: /sims/metadata-timeline-builder/metadata-timeline-builder.png
og:image: /sims/metadata-timeline-builder/metadata-timeline-builder.png
twitter:image: /sims/metadata-timeline-builder/metadata-timeline-builder.png
social:
   cards: false
---

# Metadata Recovery and Timeline Builder

<iframe src="main.html" width="100%" height="552" scrolling="no"></iframe>

[Run the Metadata Recovery and Timeline Builder Fullscreen](main.html){ .md-button .md-button--primary }

## About This MicroSim

Every digital photo carries hidden **EXIF metadata** — the camera that took it,
the date and time, the GPS location, and the device's time zone. In a digital
forensics investigation, that metadata is often the strongest evidence of **when**
and **where** something happened.

But metadata can lie. A camera whose clock was never set to the local zone will
stamp photos with the **wrong time**, and a careless examiner who trusts that
timestamp can build a false timeline. This MicroSim makes you **recover the
metadata, assemble the timeline yourself, and catch the inconsistencies** before
they become a mistake in court.

## How to Use It

1. **Click** any evidence photo in the left panel. Its **EXIF metadata** loads into
   the readout: camera make/model, capture date and time, GPS coordinates in both
   **decimal degrees** and **DMS** (degrees/minutes/seconds), and the device time
   zone.
2. Watch for a **red time-zone warning** — it means that photo's device zone does
   not match the rest of the case, so the timestamp is suspect.
3. Press **Add to Timeline** to place the photo on the chronological strip at the
   bottom. The timeline **auto-sorts** by capture time as you add photos.
4. Press **Plot on Map** to switch the right panel to a mini map showing the GPS
   pins of the selected photo and everything on the timeline.
5. Press **Export Timeline** to print a formatted chronological report (open the
   browser console to read it).
6. Use **Clear** to start the timeline over.

## What You Can Learn

- Apply EXIF recovery to extract timestamps, GPS, and time zone from a file.
- Convert GPS between decimal degrees and DMS, and locate a photo on a map.
- Build a defensible chronological timeline — and recognize when a **time-zone
  anomaly** means a timestamp cannot be trusted at face value.

You can embed this MicroSim on your own web page with this iframe:

```html
<iframe src="https://dmccreary.github.io/forensic-science/sims/metadata-timeline-builder/main.html"
        width="100%" height="552" scrolling="no"></iframe>
```

## Lesson Plan

**Audience:** High-school forensic science (grades 9–12)
**Time:** 12–18 minutes
**Bloom level:** Apply (L3) — apply.

**Worked example.** Click the first photo and read its metadata aloud — note the
green time zone (it matches the case). Add three photos in any order and watch them
sort themselves chronologically. Now click the photo flagged with a red time-zone
warning and discuss why its 14:27 timestamp might really be 17:27 local time.

**Guided questions:**

- Two photos were taken on a device set to the wrong time zone. How does the sim
  show you which ones, and in three places?
- If you only looked at the file names, could you reconstruct the order of events?
  What does the metadata add?
- Why does converting GPS to DMS matter when a court document expects a specific
  coordinate format?

**Extension.** A suspect claims a photo was taken at 8 a.m. local time, but the
EXIF time zone is three hours off. Use the timeline and the time-zone flag to
explain how you would correct the timestamp and where the photo really falls in the
sequence.

## References

- [Exif (Wikipedia)](https://en.wikipedia.org/wiki/Exif) — the metadata standard embedded in digital photographs.
- [Geotagging (Wikipedia)](https://en.wikipedia.org/wiki/Geotagging) — how GPS coordinates are stored in image metadata.
- [Digital forensics (Wikipedia)](https://en.wikipedia.org/wiki/Digital_forensics) — recovering and analyzing digital evidence.
- [p5.js reference](https://p5js.org/reference/) — the library used to build this simulation.

## Specification

This MicroSim was generated from a specification in
[Chapter 15: Digital Forensics and Cybercrime Investigation](../../chapters/15-digital-forensics/index.md).

> **Design note:** the evidence photos, EXIF values, and GPS coordinates are
> **simulated teaching data**, not real files. The map is a schematic grid that
> normalizes the photos' coordinates rather than a true geographic projection. The
> time-zone anomaly logic compares each photo's device zone to a single case "home
> zone" to teach the principle that recorded timestamps must be validated, not
> trusted blindly.
