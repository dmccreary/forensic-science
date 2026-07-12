---
title: From Strawberry to Suspect — DNA Extraction + STR Match
description: A two-part lab where investigators first extract real, visible DNA from strawberries with kitchen chemistry, then simulate PCR and compare a crime-scene STR profile against three suspects across CODIS loci to include or exclude them.
---

# From Strawberry to Suspect — DNA Extraction + STR Match

!!! mascot-welcome "Welcome, Investigators!"
    ![Trace waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img"}

    First you'll pull a stringy white glob of **real DNA** out of a strawberry
    with nothing but dish soap, salt, and cold alcohol — proof that DNA is
    actual, physical stuff. Then you'll do what a $30,000 sequencer does, in a
    simulator: copy it, read it, and match it. Two labs, one molecule. Follow
    the evidence!

## The Case

A cracked-open safe at a downtown office left a smear of blood on the metal lip.
The lab pulls a DNA profile from that crime-scene sample and from **three
suspects** who had after-hours access:

- **Suspect 1 — Alvarez**, the night custodian.
- **Suspect 2 — Boyd**, a contractor with a grudge.
- **Suspect 3 — Chen**, a co-worker who reported the break-in.

Your job comes in two acts. First, prove you can **extract DNA** from cells with
your own hands. Then, using simulated instruments, **amplify** the sample by PCR
and **compare its STR profile** to all three suspects across several CODIS loci to
answer the question — **whose profile matches the safe, and how sure can you be?**

## Learning Objectives

By the end of this investigation you will be able to:

1. **Extract** visible DNA from plant cells using detergent, salt, and cold alcohol.
2. **Explain** how PCR copies short tandem repeat regions to make a readable profile.
3. **Compare** crime-scene and suspect STR profiles across CODIS loci to include or exclude.
4. **Estimate** the strength of a match using the random match probability product rule.

## Quick Facts

| | |
|---|---|
| **Lab type** | 🔀 Combination (physical extraction + virtual PCR/STR match) |
| **Group size** | 2–3 investigators |
| **Time** | 55–70 minutes (or split across two class periods) |
| **Cost** | ≈ $10 per group (food-safe) |
| **Ties to** | [Ch 8 — DNA Structure, Short Tandem Repeats, PCR, Capillary Electrophoresis, Electropherogram Interpretation, CODIS Loci, Random Match Probability](../../chapters/08-forensic-dna-profiling/index.md) |

## Materials

Per group (≈ $10, food-safe):

- 2–3 fresh or frozen **strawberries** in a sturdy zip bag
- **Dish soap** (1 tsp) and **table salt** (a pinch)
- Cold **isopropyl (rubbing) alcohol** or ethanol — kept in the freezer
- A **coffee filter** or cheesecloth + a funnel
- A clear cup or test tube, plus a **wooden skewer** to spool the DNA
- Water, a spoon for mashing, and measuring spoons
- A computer or tablet to run the **PCR** and **STR** simulators

!!! mascot-warning "Safety & Fair-Test Rules"
    ![Trace looking alert](../../img/mascot/warning.png){ class="mascot-admonition-img"}

    - The alcohol is **flammable and not for tasting** — no open flames, keep it
      capped when not pouring, goggles on.
    - Pour the cold alcohol **slowly down the side** of the cup so it layers on
      top. Dump it in and you'll mix the layers and lose your DNA.
    - This is a **food-safe** extraction, but a lab is still a lab: no eating the
      strawberries afterward, and wash hands at the end.

## Background: From a Cell to a Courtroom Profile

Every cell keeps its **DNA** coiled inside a nucleus, wrapped around proteins and
sealed behind two layers of fat (the cell and nuclear membranes). To see it, you
break in: **dish soap** dissolves those fatty membranes, **salt** makes the
released DNA clump together, and **cold alcohol** — which DNA can't dissolve in —
forces the strands out of solution as a stringy white mass you can spool on a
skewer. That glob is millions of DNA molecules tangled together.

Real casework can't see individual differences by eye, so it targets **short
tandem repeats (STRs)** — short DNA sequences repeated a variable number of times.
At one location (a **locus**), you might repeat "GATA" 11 times; someone else
repeats it 14 times. **PCR** (the polymerase chain reaction) copies these regions
millions of times so they can be measured. **Capillary electrophoresis** then
sorts the copies by size and draws an **electropherogram** — a row of peaks whose
positions equal the repeat counts.

The FBI's **CODIS** system compares 20 core loci. A person's repeat counts at each
locus form their **profile**. Match every locus and the odds that a random
stranger shares that whole profile become astronomically small — the **random
match probability**, found by multiplying each locus's frequency together with the
**product rule**. Miss even one locus and the suspect is **excluded** outright.
Run the two simulators below to see both halves — copying, then the statistics.

### Explore: PCR Amplification Simulator

<iframe src="../../sims/pcr-amplification-simulator/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>PCR Amplification Simulator Interactive MicroSim</summary>
Type: microsim<br/>
**sim-id:** pcr-amplification-simulator<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning Objective: Explain how repeated denature–anneal–extend cycles of PCR
double the number of target DNA copies (Bloom Level 2 — Understand).
</details>

Step through the **denature → anneal → extend** cycle and watch the copy count
double each round. Notice how just 30 cycles turns a few molecules into millions —
enough for the instrument to read a tiny crime-scene smear.

### Explore: Random Match Probability (Product Rule)

<iframe src="../../sims/rmp-product-rule/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Random Match Probability Product Rule Interactive MicroSim</summary>
Type: microsim<br/>
**sim-id:** rmp-product-rule<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning Objective: Apply the product rule to combine per-locus allele
frequencies into an overall random match probability (Bloom Level 3 — Apply).
</details>

Add loci one at a time and watch the random match probability plummet — from "1
in a few hundred" at one locus to "1 in billions" once several agree. That
collapse is *why* a full CODIS match is so powerful, and why a single locus is
never enough.

### Explore: STR Electropherogram Comparison

Compare the crime-scene STR profile against each suspect across five CODIS loci and
tally the matching loci to include or exclude them.

<iframe src="../../sims/str-electropherogram-comparison/main.html" width="100%" height="585" scrolling="no"></iframe>

<details markdown="1">
<summary>STR Electropherogram Comparison Interactive MicroSim</summary>
Type: microsim<br/>
**sim-id:** str-electropherogram-comparison<br/>
**Library:** p5.js<br/>
**Status:** Implemented

Learning Objective: Compare crime-scene and suspect STR peak sets across CODIS
loci to determine matching loci and include or exclude a suspect (Bloom Level 4
— Analyze).
</details>

Pick each suspect in turn, check whether their orange peaks sit at the same repeat
numbers as the scene's blue peaks, then press **Compare Loci**. Exactly one suspect
matches all five loci; the others differ at a locus — and a single mismatch is
enough to exclude. Record the repeat counts and matches in the data table below.

## Procedure

**Part 1 — Extract the DNA (physical).**

1. Seal 2–3 strawberries in a zip bag and **mash** them for about a minute until
   smooth — this breaks open the cells' outer walls.
2. In a cup, mix **1 tsp dish soap**, a **pinch of salt**, and a few tablespoons
   of water. Add it to the bag and gently mash 1 more minute (avoid making foam).
3. **Filter** the slurry through a coffee filter into a clear cup.
4. **Slowly pour cold alcohol down the side** of the cup to form a layer on top —
   about equal to the strawberry liquid. Do **not** stir.
5. Watch the white, stringy **DNA** appear at the boundary. Spool it onto a
   wooden skewer.

**Part 2 — Amplify and read (virtual).**

6. Open the **PCR Amplification Simulator** and run enough cycles to "amplify" the
   crime-scene sample. Note how many copies a readable profile needs.
7. From your evidence card (or the **STR Electropherogram Comparison** sim above),
   record the **repeat counts at each CODIS locus** for the **scene** and each suspect.

**Part 3 — Compare and weigh the match.**

8. For each suspect, compare their repeat counts to the scene **locus by locus.**
   Any single mismatch = **excluded.**
9. For the suspect who matches every locus, open the **Random Match Probability**
   sim and multiply the per-locus frequencies to estimate how rare that full
   profile is.

## Data Collection

Record repeat counts (alleles) at each locus. Mark ✔ if the suspect matches the
scene at that locus, ✘ if not.

| CODIS locus | Scene | Suspect 1 (Alvarez) | Suspect 2 (Boyd) | Suspect 3 (Chen) |
|-------------|-------|---------------------|------------------|------------------|
| TH01 | | | | |
| TPOX | | | | |
| CSF1PO | | | | |
| D5S818 | | | | |
| D7S820 | | | | |
| **Loci matched** | — | | | |

**Estimated random match probability for the matching suspect:** 1 in ____________

## Analysis Questions

1. In the extraction, what was the job of the **dish soap**, the **salt**, and the
   **cold alcohol**? Name the part of the cell each one acted on.
2. Why must the crime-scene sample be **amplified by PCR** before it can be read?
   What would happen if you tried to profile a smear too small to amplify?
3. Which suspects can you **exclude**, and at which locus did each one first fail
   to match? Why is a single mismatched locus enough to exclude someone?
4. Which suspect matches the scene at **every** locus? Using the product rule,
   explain why adding more matching loci makes that conclusion far stronger.
5. A defense attorney argues, "Plenty of people share this profile." Using your
   estimated random match probability, write one sentence a juror could
   understand about how likely a random match really is.

## Deliverable

Turn in a **DNA Case Report**: a photo of your spooled strawberry DNA, your
completed CODIS locus table, the suspects you exclude (with the failing locus for
each), the matching suspect, and your estimated random match probability with one
plain-English sentence interpreting it for a jury.

!!! mascot-thinking "What Does the Data Tell Us?"
    ![Trace peering through a magnifying glass](../../img/mascot/thinking.png){ class="mascot-admonition-img"}

    A DNA profile doesn't shout a name — it whispers a probability. "Consistent
    with, at a random match probability of 1 in 3 billion" is honest and
    powerful; "this proves it was Boyd" is neither. The careful phrasing is what
    holds up when the defense pushes back. **Every clue matters.**

??? question "Extension Challenge: The Mixed Sample"
    Real crime-scene DNA is often a **mixture** from two or more people. Sketch
    what an electropherogram at one locus would look like with **three or four**
    peaks instead of one or two. How would a mixture complicate matching a single
    suspect, and what extra information would an analyst need to interpret it?

## Teacher Notes

??? note "Setup, timing, and grading (click to expand)"
    - **Prep:** Freeze the alcohol the night before — warm alcohol barely
      precipitates DNA and the "wow" moment fails. Frozen strawberries work fine
      and mash easily. Print an **STR evidence card** with repeat counts for the
      scene and three suspects; set exactly **one** suspect to match all loci and
      make each other suspect fail at a *different* locus so exclusions are clean.
    - **Split option:** Extraction fits one period; PCR/STR/RMP simulators fit a
      second. The two halves are independent enough to run on different days.
    - **Differentiation:** For a shorter lab, supply the completed extraction
      photo and focus on the STR comparison. For a challenge, add a **mixed**
      scene sample (extra peaks) and discuss why it can't cleanly match one person.
    - **Assessment focus:** Reward a correct extraction explanation (soap/salt/
      alcohol roles), correct locus-by-locus exclusions, and — above all — careful
      probabilistic language instead of "this proves guilt."

!!! mascot-celebration "Case Closed — For Now"
    ![Trace raising a magnifying glass in celebration](../../img/mascot/celebration.png){ class="mascot-admonition-img"}

    You held real DNA on a skewer *and* reasoned like a forensic analyst about a
    profile — copying it, matching it, and weighing exactly how strong that match
    is. From a strawberry to a suspect, one honest probability at a time.
    **Follow the evidence!**
