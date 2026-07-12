---
title: Live Hash & Tamper Detector
description: Compute MD5 and SHA-256 digests of evidence text, watch a single changed character rewrite the whole hash, and compare two files to authenticate the untouched original (Bloom L3 — Apply).
status: built
library: JavaScript (Web Crypto)
bloom_level: Apply (L3) — compute and compare MD5 and SHA-256 digests and demonstrate the avalanche effect.
quality_score: 90
image: /sims/live-hash-tamper-detector/live-hash-tamper-detector.png
og:image: /sims/live-hash-tamper-detector/live-hash-tamper-detector.png
twitter:image: /sims/live-hash-tamper-detector/live-hash-tamper-detector.png
social:
   cards: false
---

# Live Hash & Tamper Detector

<iframe src="main.html" width="100%" height="640" scrolling="no"></iframe>

[Run the Live Hash & Tamper Detector Fullscreen](main.html){ .md-button .md-button--primary }

## About This MicroSim

A **cryptographic hash** is a fixed-length fingerprint of data. The same input
always produces the same fingerprint, but change a single bit and the whole thing
is rewritten — the **avalanche effect**. Investigators lean on this property to
prove that a piece of digital evidence has not changed between the crime scene and
the courtroom.

This tool lets you feel that property with your own hands. Type into the **Evidence
text** box and watch its **MD5** (128-bit, 32 hex digits) and **SHA-256** (256-bit,
64 hex digits) digests appear instantly. Press **Tamper: flip one character** and
the tool changes exactly one character, re-hashes, and highlights every hex digit
that flipped — usually about half of them — with a running count.

The **Compare two files** section does what a forensic analyst does to authenticate
an image: it hashes two text blocks with SHA-256 and reports a green **MATCH**
(bit-for-bit identical — the untouched original) or a red **MISMATCH** (something
was changed).

Everything runs **offline** in your browser. SHA-256 comes from the browser's
built-in **Web Crypto API**; MD5 uses a small public-domain routine bundled in the
page. No text ever leaves your machine.

## How to Use It

1. Read the sample sentence in **Evidence text**, or type your own. The **MD5** and
   **SHA-256** digests update as you type.
2. Press **Tamper: flip one character**. Note the message telling you which
   character changed, then look at the highlighted hex digits and the **avalanche**
   count. Almost the whole fingerprint changed from a one-character edit.
3. Scroll to **Compare two files**. The two boxes start identical — press
   **Compare** and confirm a green **MATCH**.
4. Change one character in **File B** and press **Compare** again. The verdict flips
   to a red **MISMATCH**, and the differing hex digits are highlighted. That is how
   you exclude a tampered copy and authenticate the real original.

## Learning Objective

**Apply (L3).** After using this MicroSim, investigators can compute the MD5 and
SHA-256 digests of evidence, demonstrate the avalanche effect by changing a single
character, and use a SHA-256 match or mismatch to authenticate an untouched
original and rule out tampered copies.
