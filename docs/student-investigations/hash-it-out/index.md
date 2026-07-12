---
title: Hash It Out — Digital Evidence Integrity
description: A digital lab where investigators compute MD5 and SHA-256 hashes of an evidence file, watch a single changed character rewrite the entire hash, and use hash matching to prove which of three seized files is the untouched original.
---

# Hash It Out — Digital Evidence Integrity

!!! mascot-welcome "Welcome, Investigators!"
    ![Trace waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img"}

    A hard drive can hold a case's entire story — but how do you prove that not
    one single bit changed between the crime scene and the courtroom? Today you'll
    learn the trick digital investigators trust: a **cryptographic hash**, a tiny
    fingerprint that betrays even the smallest tampering. Follow the evidence!

## The Case

A laptop was seized from a suspect and handed to the digital-forensics unit.
Before anyone opened a single file, an analyst made a **bit-stream copy** — an
exact, bit-for-bit duplicate of the drive — so the original could stay untouched
in the evidence locker. Weeks later, the defense claims the copy was **altered**
after seizure.

You have three files that all claim to be the original evidence file, plus the
**hash value** the analyst recorded the day it was seized. Only one of the three
is the genuine, unaltered original. Your job: use hashing to prove — mathematically
— which file is authentic and which two have been changed, even if the change is
a single character.

## Learning Objectives

By the end of this investigation you will be able to:

1. **Explain** why investigators hash a drive *before and after* imaging.
2. **Compute** the MD5 and SHA-256 hash of an evidence file.
3. **Analyze** the avalanche effect by altering one character and re-hashing.
4. **Evaluate** three files against a known hash to authenticate the original.

## Quick Facts

| | |
|---|---|
| **Lab type** | 🔀 Combination (hands-on tool + reasoning) |
| **Group size** | 2 investigators |
| **Time** | 40–50 minutes |
| **Cost** | $0 — computer-based |
| **Ties to** | [Ch 15 — MD5 & SHA-256 Hash Functions, Hash Verification, Forensic Imaging, Bit-Stream Copy, Write-Blocker Hardware](../../chapters/15-digital-forensics/index.md) |

## Materials

Per group:

- **None — a laptop and a browser.**
- The instructor's provided sample evidence files and the recorded "day-of-seizure"
  hash card.
- *Assumes access to one computer per group.*

!!! mascot-warning "Data-Integrity Ground Rules"
    ![Trace looking alert](../../img/mascot/warning.png){ class="mascot-admonition-img"}

    - Hash **only the sample files** the instructor provides. Never hash a real
      person's private files "to test it" — that is someone else's evidence.
    - In a real case, altering a seized file is a **crime** and breaks the chain
      of custody. In this lab you *simulate* tampering to learn how it's caught.
    - A hash proves a file **changed**; it does not prove **who** changed it or
      **what** the file contains. Keep your claims to what the math supports.

## Background: A Fingerprint for Data

A **cryptographic hash function** takes any input — a word, a file, a whole drive
— and produces a fixed-length string of characters called a **hash** or **digest**.
**MD5** always returns 128 bits (32 hex characters); **SHA-256** always returns
256 bits (64 hex characters). The same input always produces the same hash, but
the function only runs **one way** — you cannot reverse a hash back into the file.

The property that makes hashing powerful for evidence is the **avalanche effect**:
change a single bit of the input and roughly *half* of the output bits flip. Add
one space, swap one letter, and the new hash looks completely unrelated to the
old one. There is no "close" — a hash either matches exactly or it doesn't.

This is how investigators prove a copy is perfect. Before imaging, the analyst
runs the drive (behind a **write-blocker**, so the act of reading can't alter it)
and records its hash. After making the bit-stream copy, they hash the copy. If the
two hashes match, the copy is a verifiable, court-ready twin of the original. If a
single byte were disturbed, the hashes would diverge and everyone would know.

### Explore: The Forensic Imaging Workflow

<iframe src="../../sims/forensic-imaging-workflow/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Forensic Imaging Workflow Interactive MicroSim</summary>
Type: microsim<br/>
**sim-id:** forensic-imaging-workflow<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning Objective: Sequence the forensic-imaging workflow and identify where
hashing verifies integrity at each step (Bloom Level 2 — Understand).
</details>

Step through the workflow and notice **where the hash is taken** — once on the
original, once on the copy. That before-and-after pair is the whole point. Now
you'll compute those hashes yourself.

### Explore: Live Hash & Tamper Detector

Type evidence text, flip a single character to watch the avalanche effect rewrite
the whole fingerprint, then compare two files to authenticate the untouched original.

<iframe src="../../sims/live-hash-tamper-detector/main.html" width="100%" height="640px" scrolling="no"></iframe>

<details markdown="1">
<summary>Live Hash & Tamper Detector Interactive MicroSim</summary>
Type: microsim<br/>
**sim-id:** live-hash-tamper-detector<br/>
**Library:** JavaScript (Web Crypto)<br/>
**Status:** Implemented

Learning Objective: Compute and compare MD5 and SHA-256 digests and demonstrate
the avalanche effect from a single-character change (Bloom Level 3 — Apply).
</details>

## Procedure

**Part 1 — Hash the original.**

1. Open the hashing tool in your browser. Load the instructor's **original
   evidence file** (`evidence.txt`).
2. Compute its **MD5** and **SHA-256** hashes. Record the first 8 and last 8
   characters of each in your data table (writing all 64 is optional — the ends
   are enough to compare).
3. Compare your hashes to the **"day-of-seizure" hash card**. They should match
   exactly. You have now verified the original.

**Part 2 — Watch the avalanche.**

4. Change **one** character in the file — flip a single letter, or add one space.
5. Re-compute both hashes. Record them. Compare, character by character, to your
   Part 1 hashes.
6. Count roughly how many characters changed. This is the **avalanche effect**:
   a one-character edit rewrites nearly the whole fingerprint.

**Part 3 — Find the untouched original.**

7. The instructor gives you three files: `seized_A`, `seized_B`, `seized_C`. Each
   claims to be the original.
8. Hash all three and compare each hash to the recorded day-of-seizure hash.
9. Exactly **one** will match. That file is the authentic, unaltered original —
   the other two have been tampered with. Record your verdict and the evidence.

## Data Collection

Record the first-8 and last-8 hex characters of each hash.

| File / step | MD5 (first…last) | SHA-256 (first…last) | Matches seizure hash? |
|-------------|------------------|----------------------|-----------------------|
| Original (Part 1) | | | — |
| After 1-char edit (Part 2) | | | |
| seized_A | | | |
| seized_B | | | |
| seized_C | | | |

## Analysis Questions

1. Which seized file is the authentic original? State the exact hash evidence
   that lets you **exclude** the other two.
2. In Part 2, about how many hash characters changed when you edited a single
   character? What does this tell you about detecting "small" tampering?
3. Why does an investigator hash the drive **both** before and after imaging,
   rather than just once?
4. A hash proves a file changed but not *what* it now contains or *who* changed
   it. Write one sentence a careful investigator could testify to, and one an
   over-reaching one might wrongly claim.
5. MD5 is older and has known weaknesses; modern practice prefers SHA-256. Why
   might a lab still record **both** hashes for the same evidence file?

## Deliverable

Turn in a one-page **Evidence Integrity Report** that names the authentic original,
lists the recorded seizure hash and the matching computed hash, and explains — in
plain language a jury could follow — how the avalanche effect let you rule out the
two tampered files.

!!! mascot-thinking "What Does the Data Tell Us?"
    ![Trace peering through a magnifying glass](../../img/mascot/thinking.png){ class="mascot-admonition-img"}

    A hash match doesn't tell you the file is *innocent* — it tells you the file
    is **unchanged since it was hashed**. That's a narrower, stronger claim, and
    it's exactly the kind of precision a courtroom rewards. Say what the math
    proves, and nothing more.

??? question "Extension Challenge: The Collision Question"
    A **hash collision** is when two *different* inputs produce the *same* hash.
    Researchers have engineered MD5 collisions on purpose; nobody has done it for
    SHA-256. Research one real MD5 collision example and write a short paragraph:
    why does the mere *possibility* of a collision matter for evidence, and why is
    SHA-256 the safer choice today?

## Teacher Notes

??? note "Setup, timing, and grading (click to expand)"
    - **Prep:** Create `evidence.txt` with a short paragraph. Make `seized_A/B/C`
      by copying it three times, then quietly editing two of the three (change one
      character in each). Record the true hash of the untouched copy on the "hash
      card" you hand out. Any browser-based hasher works; the proposed MicroSim
      keeps everything offline and private.
    - **The reveal:** Have groups commit to which file is authentic **before** you
      confirm — this rewards trusting the math over guessing.
    - **Differentiation:** For a quicker run, use SHA-256 only. For a challenge,
      add a fourth file that is byte-identical to the original (same hash) to show
      that identical content = identical hash, regardless of filename.
    - **Assessment focus:** Reward students who cite the exact matching/mismatching
      hash as evidence and who state the *narrow* claim a hash supports (unchanged
      since hashing), not an over-broad one.

!!! mascot-celebration "Case Closed — For Now"
    ![Trace raising a magnifying glass in celebration](../../img/mascot/celebration.png){ class="mascot-admonition-img"}

    You just caught a single altered character hiding inside a file — using nothing
    but a fingerprint made of math. That's the quiet superpower behind every piece
    of digital evidence that ever held up in court. **Follow the evidence!**
