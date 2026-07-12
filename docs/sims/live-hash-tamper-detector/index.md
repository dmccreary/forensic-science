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

You can embed this MicroSim on your own web page with this iframe:

```html
<iframe src="https://dmccreary.github.io/forensic-science/sims/live-hash-tamper-detector/main.html"
        width="100%" height="640" scrolling="no"></iframe>
```

## Lesson Plan

**Audience:** High-school forensic science (grades 9–12)
**Time:** 15–20 minutes
**Bloom level:** Apply (L3) — compute and compare MD5 and SHA-256 digests and demonstrate the avalanche effect.

**Warm-up.** Ask investigators: "How can a lab prove that a seized hard drive is
bit-for-bit identical to the copy shown in court, without comparing every single
byte by hand?"

**Guided questions:**

- Type a sentence, then press "Tamper: flip one character." Roughly how many hex
  digits changed, and why does a one-character edit rewrite so much of the digest
  (the avalanche effect)?
- In "Compare two files," change one character in File B. How does the
  MATCH/MISMATCH result let you authenticate an untouched original and exclude a
  tampered copy?
- SHA-256 produces 64 hex digits and MD5 produces 32. Why does a longer digest
  make an accidental collision far less likely?

**Extension.** Research why MD5 is now considered broken for security use while
still handy for quick integrity checks, and how hashing supports chain of custody
for digital evidence.

## References

- [SHA-2 (Wikipedia)](https://en.wikipedia.org/wiki/SHA-2) — the family that includes the SHA-256 digest used here.
- [MD5 (Wikipedia)](https://en.wikipedia.org/wiki/MD5) — the 128-bit hash shown alongside SHA-256.
- [Cryptographic hash function (Wikipedia)](https://en.wikipedia.org/wiki/Cryptographic_hash_function) — the properties, including the avalanche effect, that make hashing useful for tamper detection.
- [Web Crypto API (MDN)](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API) — the browser API used to compute SHA-256.

## Specification

This MicroSim was generated from a specification in
[Chapter 15: Digital Forensics and Cybercrime Investigation](../../chapters/15-digital-forensics/index.md).

> **Design note:** the hashing is real (SHA-256 via Web Crypto, MD5 via a bundled
> routine), but the "evidence" text and tamper demo are simplified for teaching —
> the tool illustrates integrity verification rather than a full forensic imaging
> workflow.
