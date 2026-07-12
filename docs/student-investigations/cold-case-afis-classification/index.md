---
title: Cold Case — AFIS Classification Challenge
description: A virtual investigation where investigators classify a museum-heist latent print, count its minutiae, and search a six-suspect database to learn why AFIS ranks candidates while a human examiner makes the final call.
---

![Cover Image](./cover.png)

# Cold Case — AFIS Classification Challenge

!!! mascot-welcome "Welcome, Investigators!"
    ![Trace waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img"}

    A print sat in an evidence file for eleven years waiting for someone patient
    enough to work it. Today that someone is you. You'll classify it, count its
    tiny landmarks, and let the database hand you a ranked list of suspects —
    then decide who's really guilty. The computer narrows the field; **you** make
    the call. Follow the evidence!

## The Case

Eleven years ago, a jade figurine vanished from the Meridian Museum during a
private after-hours event. The only physical evidence was a single **latent
print** lifted from the empty display mount — smudged, partial, and never
matched. The case went cold. Now a grant has funded a re-examination, and six
people from the original guest-and-staff list are still on record in the
database:

| Suspect | Role that night |
|---------|-----------------|
| S-1 | Night security guard |
| S-2 | Visiting curator |
| S-3 | Catering staff |
| S-4 | Donor / VIP guest |
| S-5 | Cleaning contractor |
| S-6 | Museum board member |

Your job: classify the cold-case print, count its minutiae, run it against all
six database records the way an **Automated Fingerprint Identification System
(AFIS)** would, and produce a **ranked candidate list** — then explain why the
top rank is a *lead*, not a *verdict*.

## Learning Objectives

By the end of this investigation you will be able to:

1. **Classify** a latent print by pattern type (loop, whorl, or arch) and locate
   its core and delta.
2. **Identify** and count minutiae — ridge endings and bifurcations — on a
   partial print.
3. **Explain** how an AFIS search produces a ranked candidate list from minutiae
   coordinates rather than a single yes/no match.
4. **Evaluate** why a human examiner, not the computer, makes the final
   identification.

## Quick Facts

| | |
|---|---|
| **Lab type** | 💻 Virtual |
| **Group size** | 1–2 investigators (one workstation) |
| **Time** | 35–45 minutes |
| **Cost** | $0 — no consumables |
| **Ties to** | [Ch 3 — AFIS Database, Fingerprint Individualization, Minutiae Points, Pattern Classification](../../chapters/03-fingerprint-analysis/index.md) |

## Materials

Per workstation:

- 1 computer, tablet, or laptop with a browser
- The AFIS Search Workflow MicroSim (linked below)
- A printout of the six suspect exemplar cards (provided by your teacher) **or**
  the on-screen database
- Scratch paper for tallying minutiae counts

*No physical consumables — this is a fully digital lab.*

!!! mascot-warning "Fair-Search Rules"
    ![Trace looking alert](../../img/mascot/warning.png){ class="mascot-admonition-img"}

    - **Count before you compare.** Tally the cold-case print's minutiae *before*
      you look at the suspects, so you don't unconsciously bend the evidence to
      fit a favorite.
    - AFIS returns a **ranked list, never a "guilty" stamp.** Treat the top
      candidate as the start of your work, not the end.
    - Record your reasoning as you go. In a real cold case, an examiner has to
      defend every decision years later.

## Background: How a Machine Reads a Fingerprint

An **AFIS** does not compare pictures of fingerprints the way you compare two
photos. Instead, it reduces each print to a **map of minutiae** — the exact
coordinates and directions of every ridge ending and **bifurcation** (a point
where one ridge splits into two). A print might yield 40–100 of these points; a
smudged partial from a crime scene might give only 8 or 10. The system then looks
for database records whose minutiae maps **overlap** the crime-scene map and
scores each one.

The output is a **ranked candidate list**: the records most similar to the
unknown, ordered by match score, highest first. Crucially, AFIS is a **search
tool, not a decision tool**. It might return ten close candidates; it never
declares a winner. A trained **latent print examiner** then compares the top
candidates side by side and makes the actual identification — or rules them all
out. This human-in-the-loop design exists precisely because automated scores can
be fooled by smudges, partials, and coincidental similarity.

That distinction matters for justice. In the 2004 Madrid train bombing, the FBI's
AFIS returned Oregon lawyer **Brandon Mayfield** as a candidate for a latent
found on a bag of detonators. Human examiners then *wrongly confirmed* the match,
and he was jailed for two weeks before Spanish police identified the real source.
The lesson forensic science took from it: a candidate list is a starting point,
and even expert human verification carries an error rate. Now try the search
yourself.

### Explore: AFIS Search Workflow

<iframe src="../../sims/afis-search-workflow/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>AFIS Search Workflow Interactive MicroSim</summary>
Type: microsim<br/>
**sim-id:** afis-search-workflow<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning Objective: Explain how an AFIS search converts minutiae into a ranked
candidate list that a human examiner then verifies (Bloom Level 2 — Understand).
</details>

Walk through each stage of the workflow: capture, feature extraction, search,
and the ranked candidate list. Watch how the match **score** drops off after the
top few candidates — that gap between rank 1 and rank 2 is a signal an examiner
weighs, but never treats as proof on its own.

### Explore: Minutiae-Tagging Canvas

Tag each ridge ending and bifurcation on the cold-case print, then search the
six-suspect database and watch AFIS rank the candidates by how many of your
minutiae overlap each one.

<iframe src="../../sims/minutiae-tagging-canvas/main.html" width="100%" height="560" scrolling="no"></iframe>

<details markdown="1">
<summary>Minutiae-Tagging Canvas Interactive MicroSim</summary>
Type: microsim<br/>
**sim-id:** minutiae-tagging-canvas<br/>
**Library:** p5.js<br/>
**Status:** Implemented

Learning Objective: Locate and classify minutiae on a latent print and interpret
the resulting ranked AFIS candidate list, recognizing that the system ranks while
a human examiner decides (Bloom Level 4 — Analyze).
</details>

## Procedure

**Part 1 — Classify the cold-case print.**

1. Open the cold-case latent print (on screen or on your printout).
2. Locate the **core** (center) and any **delta** (triangular ridge meeting).
   Use the delta count to classify: **arch** = no delta, **loop** = one delta,
   **whorl** = two deltas.
3. Record the pattern type on your data sheet.

**Part 2 — Tag and count the minutiae.**

4. Working across the print, mark every **ridge ending** (a ridge that just
   stops) and every **bifurcation** (a ridge that forks). On paper, circle each
   one; in the proposed canvas widget, click each one.
5. Tally your totals: number of ridge endings, number of bifurcations, and the
   combined minutiae count. This is your unknown's "feature map."

**Part 3 — Search the database and rank.**

6. Run the AFIS Search Workflow MicroSim, or compare your feature map against
   each of the six suspect exemplars by hand.
7. For each suspect, note how many minutiae fall in the **same relative
   position** as the unknown. Assign a rough match score.
8. Order the six suspects into a **ranked candidate list**, highest score first.
9. Take the **top candidate** and verify it as an examiner would: confirm the
   pattern type agrees *and* that specific minutiae line up. Decide whether the
   evidence supports an identification or whether the print is too limited to
   individualize.

## Data Collection

| Suspect | Pattern type | Ridge endings in agreement | Bifurcations in agreement | Match score (rank) |
|---------|--------------|----------------------------|---------------------------|--------------------|
| S-1 | | | | |
| S-2 | | | | |
| S-3 | | | | |
| S-4 | | | | |
| S-5 | | | | |
| S-6 | | | | |

*Cold-case print — pattern type: ________  Total minutiae counted: ________*

## Analysis Questions

1. What pattern type is the cold-case print, and which suspects can you
   **exclude** immediately on pattern type alone?
2. Which suspect ranked **first** on your candidate list? Cite the specific
   minutiae that put them at the top.
3. AFIS returned a *ranked list*, not a single name. Explain in your own words
   why the system is designed to rank rather than to decide.
4. The print is a **partial** with fewer minutiae than a full rolled print. How
   does a low minutiae count affect how confident your identification can be?
5. Using the **Brandon Mayfield** case, explain why a human examiner's
   confirmation is still not a guarantee. What safeguard would you add before
   making an arrest?

## Deliverable

Turn in your completed **ranked candidate list** for all six suspects plus a
short **examiner's statement**: name your top candidate, state the pattern type
and the minutiae that support the ranking, and state honestly whether the
partial print is sufficient to individualize or only to include. Precision of
language is graded.

!!! mascot-thinking "What Does the Data Tell Us?"
    ![Trace peering through a magnifying glass](../../img/mascot/thinking.png){ class="mascot-admonition-img"}

    Here's the twist most people miss: AFIS never says "match." It says "here are
    the closest records — now a human decides." The computer is fast and tireless
    but blind to context; the examiner is slow and fallible but can reason. The
    strongest cold-case work pairs both and stays honest about the limits of a
    smudged partial print.

??? question "Extension Challenge: The Twelve-Point Debate"
    Some countries once required a fixed minimum number of matching minutiae
    (often cited as 12 or 16) before declaring an identification; the United
    States uses a holistic examiner judgment instead. Research one argument for a
    numeric standard and one against it, then write which approach you'd defend
    if you were testifying — and why.

## Teacher Notes

??? note "Setup, timing, and grading (click to expand)"
    - **Prep:** Load the AFIS Search Workflow MicroSim on each workstation and
      print the six suspect exemplar cards plus the cold-case latent at high
      resolution. Decide in advance which suspect is the "true" source so you can
      confirm rankings, but keep it sealed until groups commit.
    - **Sequencing matters:** Insist students count minutiae in Part 2 *before*
      seeing the suspects. This models blind analysis and blocks confirmation
      bias — the exact failure mode behind the Mayfield error.
    - **Differentiation:** For a shorter run, provide the pattern-type
      classification and have students focus only on ranking. For a challenge,
      include two suspects with the same pattern type so minutiae are the only
      way to separate them.
    - **Assessment focus:** Reward correct pattern classification, honest
      minutiae counting, a defensible ranked list, and — above all — an
      examiner's statement that distinguishes *include* from *individualize* and
      acknowledges the partial-print limitation.

!!! mascot-celebration "Case Closed — For Now"
    ![Trace raising a magnifying glass in celebration](../../img/mascot/celebration.png){ class="mascot-admonition-img"}

    Eleven years cold, and you just handed the ranked list that reopens the file.
    You did what AFIS can't: you reasoned. The machine narrowed six suspects to a
    front-runner, but the judgment was yours — exactly as it should be. **Follow
    the evidence!**
