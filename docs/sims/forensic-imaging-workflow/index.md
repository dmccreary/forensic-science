---
title: Forensic Imaging & Hash Verification Workflow
description: Explain the forensic imaging procedure and verify image integrity with hash comparison (Bloom L2 — Understand).
status: built
library: p5.js
bloom_level: Understand (L2) — explain the imaging workflow and how hash comparison verifies integrity.
quality_score: 98
image: /sims/forensic-imaging-workflow/forensic-imaging-workflow.png
og:image: /sims/forensic-imaging-workflow/forensic-imaging-workflow.png
twitter:image: /sims/forensic-imaging-workflow/forensic-imaging-workflow.png
social:
   cards: false
---

# Forensic Imaging & Hash Verification Workflow

<iframe src="main.html" width="100%" height="502" scrolling="no"></iframe>

[Run the Forensic Imaging & Hash Verification Workflow Fullscreen](main.html){ .md-button .md-button--primary }

## About This MicroSim

When investigators seize a hard drive, they never analyze the original. Instead
they make a **forensic image** — a perfect, bit-for-bit copy — and work on that.
To prove the copy is truly identical, they compute a **cryptographic hash** of
both the original and the image. If the hashes match, the copy is verified.

This MicroSim walks through the five-station pipeline — **Original Drive →
Write-Blocker → Forensic Workstation → Forensic Image → Hash Verification** —
with animated data flow and a write-blocker that physically prevents any change
to the original. Then it lets you **simulate tampering** with the image to see
why even a one-byte change is impossible to hide.

## How to Use It

1. Watch the **blue data dots** flow from the original drive through the
   write-blocker to the workstation, which writes the forensic image.
2. Note the red **"no write-back to original"** symbol — the write-blocker lets
   data be read but blocks any write to the evidence drive.
3. **Click any station** to read its purpose and procedure in the detail panel.
4. Read the **Hash Verification** panel: the original and image hashes appear
   side by side. With no tampering they are identical → **MATCH**.
5. Press **Simulate Tamper** to change one byte of the image. The image hash is
   recomputed and comes out **completely different** → **MISMATCH**.
6. Switch the algorithm between **MD5** (32 hex characters) and **SHA-256** (64
   hex characters).

## What You Can Learn

- Explain each stage of forensic imaging and why the write-blocker is essential.
- Explain how matching hashes prove a forensic image is an unaltered copy.
- Describe the **avalanche effect**: a one-byte change yields a totally different
  hash, so tampering is always detectable.

You can embed this MicroSim on your own web page with this iframe:

```html
<iframe src="https://dmccreary.github.io/forensic-science/sims/forensic-imaging-workflow/main.html"
        width="100%" height="502" scrolling="no"></iframe>
```

## Lesson Plan

**Audience:** High-school forensic science (grades 9–12)
**Time:** 15–20 minutes
**Bloom level:** Understand (L2) — explain.

**Worked example.** Click through all five stations in order and have students
narrate the journey of the data in their own words. Then read the two matching
hashes and confirm the MATCH result.

**Guided questions:**

- Why must the original drive be connected only through a write-blocker?
- The hashes match before tampering. What does that prove about the image?
- Press Simulate Tamper. How much of the hash changed, and what does that tell
  you about how sensitive the hash is to changes in the data?

**Extension.** Switch between MD5 and SHA-256. Why might an investigator prefer
SHA-256 even though both detect the tampering here?

## References

- [Disk image / forensic imaging (Wikipedia)](https://en.wikipedia.org/wiki/Disk_image) — bit-for-bit copies of storage devices.
- [Forensic disk controller / write blocker (Wikipedia)](https://en.wikipedia.org/wiki/Forensic_disk_controller) — hardware that prevents writes to evidence.
- [Cryptographic hash function (Wikipedia)](https://en.wikipedia.org/wiki/Cryptographic_hash_function) — MD5, SHA-256, and the avalanche effect.
- [p5.js reference](https://p5js.org/reference/) — the library used to build this simulation.

## Specification

This MicroSim was generated from a specification in
[Chapter 15: Digital Forensics and Cybercrime Investigation](../../chapters/15-digital-forensics/index.md).

> **Design note:** the hash values are real, correctly formatted examples (32 hex
> for MD5, 64 hex for SHA-256), but they are precomputed illustrations rather
> than hashes of an actual disk image — the sim does not perform real hashing.
> The "tampered" hashes are genuinely different values to demonstrate the
> avalanche effect; the brief "computing hash…" animation is cosmetic.
