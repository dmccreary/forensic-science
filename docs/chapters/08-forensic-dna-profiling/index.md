---
title: Forensic DNA Profiling
description: DNA structure, STRs, CODIS loci, PCR amplification, capillary electrophoresis, electropherogram interpretation, Y-STR analysis, and random match probability.
generated_by: claude skill chapter-content-generator
date: 2026-06-01
version: 0.08
---

# Forensic DNA Profiling

## Summary

This chapter covers the science and practice of forensic DNA analysis, from molecular biology to courtroom statistics. Students review nuclear versus mitochondrial DNA and the concept of short tandem repeats (STRs), then study the 20 CODIS core loci used in national databases. PCR amplification is broken into its three steps (denaturation, annealing, and extension), and capillary electrophoresis is explained as the separation technology that produces the electropherogram. Allele interpretation, heterozygosity, and Y-STR lineage analysis extend the analytical toolkit. The chapter concludes with random match probability and the product rule — the statistical framework that converts a DNA profile into an evidentiary weight.

## Learning Objectives

By the end of this chapter, investigators will be able to:

1. **Distinguish** between nuclear DNA and mitochondrial DNA and explain the forensic applications of each.
2. **Explain** what short tandem repeats (STRs) are and why they are used for forensic profiling.
3. **Describe** the three steps of PCR amplification (denaturation, annealing, extension) and what each accomplishes.
4. **Interpret** a basic electropherogram to identify allele sizes at a CODIS locus.
5. **Calculate** a basic random match probability using the product rule across multiple loci.

## Concepts Covered

This chapter covers the following 18 concepts from the learning graph:

1. DNA Structure Review
2. Nuclear DNA
3. Mitochondrial DNA
4. Short Tandem Repeats (STRs)
5. CODIS Loci
6. Polymerase Chain Reaction
7. PCR Primer Design
8. DNA Denaturation
9. DNA Annealing
10. DNA Extension
11. Capillary Electrophoresis
12. Electropherogram Interpretation
13. DNA Alleles
14. Homozygous vs Heterozygous
15. Y-STR Analysis
16. Random Match Probability
17. Product Rule in Statistics
18. DNA Database Searching

## Prerequisites

This chapter builds on concepts from:

- [Chapter 2: Crime Scene Investigation and Evidence Collection](../02-crime-scene-investigation/index.md)

---

!!! mascot-welcome "Welcome, Investigators!"
    ![Trace waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img"}
    DNA profiling transformed forensic science more profoundly than any other development in the 20th century. It created the possibility of not just narrowing a suspect pool but of identifying a specific individual with statistical certainty in the quadrillions-to-one range. But DNA evidence is only as reliable as the science behind it — and this chapter gives you that science. Follow the evidence all the way to the molecule.

---

## DNA Structure Review

**Deoxyribonucleic acid (DNA)** is the molecular blueprint for all living organisms. It is a double-stranded helix composed of nucleotide units, each of which contains a phosphate group, a deoxyribose sugar, and one of four nitrogen bases: **adenine (A)**, **thymine (T)**, **guanine (G)**, and **cytosine (C)**. The two strands are held together by hydrogen bonds between complementary base pairs: A pairs with T, and G pairs with C. This complementary pairing is the molecular foundation of PCR amplification.

The human genome contains approximately 3 billion base pairs distributed across 23 pairs of chromosomes. The overwhelming majority of this DNA sequence is identical among all humans — we are approximately 99.9% genetically identical. Forensic DNA profiling focuses on the 0.1% that varies between individuals — the **polymorphic regions**.

### Nuclear DNA

**Nuclear DNA** is housed in the cell nucleus and contains the full 3 billion base pair genome. It is the primary target for forensic STR profiling because:

- It is present in all nucleated cells (leukocytes in blood, skin cells, spermatogenic cells, epithelial cells)
- The two alleles (one from each parent) at each locus can be distinguished, providing powerful discriminating power
- The CODIS database is built entirely on nuclear STR profiles

Nuclear DNA degrades over time through enzymatic activity, oxidation, and microbial action. Degraded nuclear DNA can produce incomplete profiles, requiring careful interpretation.

### Mitochondrial DNA

**Mitochondrial DNA (mtDNA)** is housed in the mitochondria — small organelles in the cell cytoplasm that generate cellular energy. Unlike nuclear DNA, mtDNA has several features that make it uniquely useful in specific forensic contexts:

- **High copy number**: each cell contains hundreds to thousands of mitochondria, so even a cell with minimal nuclear DNA may have abundant mtDNA — useful for degraded or low-cellular-content evidence like hair shafts without root, old bones, and teeth
- **Maternal inheritance**: mtDNA is passed from mothers to all their children, unchanged (except for rare mutations) — allowing maternal lineage tracing
- **No individual specificity**: all maternally related individuals share the same mtDNA sequence, so mtDNA cannot uniquely identify a single person; it can only include or exclude based on maternal lineage

mtDNA is analyzed by sequencing the hypervariable regions (HV1 and HV2) of the control region and comparing the sequence to reference databases.

---

## Short Tandem Repeats (STRs)

The forensic DNA community settled on **Short Tandem Repeats (STRs)** as the standard profiling marker for excellent reasons. An STR is a location in the genome (a **locus**, plural *loci*) where a short sequence of 2–7 base pairs is repeated in tandem. For example, the tetranucleotide repeat unit AGAT might be repeated 8 times at one allele: AGAT-AGAT-AGAT-AGAT-AGAT-AGAT-AGAT-AGAT.

The number of repeat units at each STR locus varies between people — these different repeat counts are the **alleles** at that locus. If a person inherited 8 repeats from their mother and 12 repeats from their father at a particular locus, they are **heterozygous** at that locus (two different allele sizes). If they inherited the same number of repeats from both parents, they are **homozygous** (both alleles are the same size and appear as a single peak on the electropherogram).

STRs are ideal forensic markers because:

- They are highly polymorphic — many different allele sizes exist in the population, so matching profiles at multiple loci is statistically powerful
- They are short (100–400 base pairs) — small enough to amplify even from degraded DNA samples
- PCR amplification of STRs is reliable and well-standardized globally

### CODIS Loci

The **CODIS** (Combined DNA Index System) is the FBI's national DNA database, established in 1998. CODIS stores DNA profiles as sets of numbers representing allele sizes at standardized STR loci. The current (CODIS Expansion, 2017) standard uses **20 core STR loci** plus the gender-determining amelogenin marker.

The 20 core CODIS loci are:

CSF1PO, FGA, TH01, TPOX, vWA, D3S1358, D5S818, D7S820, D8S1179, D13S317, D16S539, D18S51, D21S11, D1S1656, D2S441, D2S1338, D10S1248, D12S391, D19S433, D22S1045

At each locus, a person carries two alleles. With 20 loci, the combined profile captures 40 allele designations plus amelogenin — creating a DNA "fingerprint" that is statistically unique to an individual.

---

## Polymerase Chain Reaction (PCR)

**PCR** is the molecular amplification technique that takes trace amounts of target DNA and copies it millions of times. Without PCR, forensic DNA analysis would require large, pristine DNA samples. With PCR, a single cell's worth of DNA can be sufficient.

PCR requires several components: the template DNA (from the evidence), short single-stranded DNA sequences called **primers** that flank the target region, **DNA polymerase** (the copying enzyme, typically the heat-stable Taq polymerase from *Thermus aquaticus*), the four nucleotide building blocks (dNTPs), and a magnesium buffer.

**PCR Primer Design** is the step that makes STR typing locus-specific. Primers are designed to anneal exclusively to the sequences flanking a particular STR locus — one on each strand of the double helix. The primers define the exact region that will be amplified. In forensic multiplex PCR kits (like GlobalFiler or PowerPlex Fusion), primers for all 20 CODIS loci plus amelogenin are included in a single reaction.

The PCR process runs in a thermal cycler — a machine that precisely controls temperature — through a series of cycles (typically 28–32 cycles). Each cycle has three steps:

### Step 1: DNA Denaturation

The reaction is heated to approximately **94–96°C**. At this temperature, the hydrogen bonds between complementary base pairs break, and the double-stranded DNA separates into two single strands. This is **denaturation** — the DNA helix "melts" open. Each single strand will serve as a template for DNA synthesis.

### Step 2: DNA Annealing

The temperature is lowered to approximately **55–65°C**. At this temperature, the short primer sequences can bind (anneal) to their complementary sequences on the single-stranded template DNA. Each primer attaches to one strand of the template, flanking the target STR locus from both sides. This is **annealing** — the primers "find" their target by complementary base pairing.

### Step 3: DNA Extension

The temperature is raised to approximately **72°C** — the optimal temperature for Taq DNA polymerase activity. The polymerase begins at the primer's 3' end and synthesizes a new complementary strand, adding nucleotides one by one in the 5' to 3' direction. When it reaches the end of the template, a new double-stranded copy of the target region has been made. This is **extension** (also called **elongation**).

Each cycle doubles the number of copies of the target sequence. After 30 cycles:
\[
2^{30} \approx 1{,}073{,}741{,}824 \text{ copies}
\]

From a single copy of the target DNA, PCR produces over a billion copies.

#### Diagram: PCR Amplification Step-Through Simulator

<iframe src="../../sims/pcr-amplification-simulator/main.html" width="100%" height="520px" scrolling="no"></iframe>

<details markdown="1">
<summary>PCR Amplification Step-Through Simulator MicroSim</summary>
Type: microsim
**sim-id:** pcr-amplification-simulator<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning Objective: Explain the three steps of PCR (denaturation, annealing, extension) by tracing what happens to the DNA at each stage (Bloom Level 2 — Understand; verb: explain).

Bloom Level: Understand (L2)
Bloom Verb: Explain

Canvas layout:
- Main view (~65%): molecular-level animation of the DNA strands
- Side panel (~35%): temperature display, step label, step description, cycle counter

Visual elements:
- Two complementary DNA strands shown as colored lines (one strand red, one blue) with base pairs as short horizontal bridges
- Primers shown as shorter yellow/green segments
- New DNA synthesis shown as a growing strand in a lighter color
- Temperature gauge on the side panel
- A "copies so far" counter

Interactive controls:
- "Next Step" button advances through: Denature (94°C) → Anneal (60°C) → Extend (72°C)
- "Run Cycle" button runs all three steps automatically with a 1-second pause between
- "Run 5 Cycles" shows the exponential growth of copy count
- Clicking on any DNA component (strand, primer, new strand) reveals a pop-up definition

Data Visibility Requirements:
- Denaturation step: show the hydrogen bond bridges disappearing one by one; temperature rises to 94°C; strands drift apart
- Annealing step: show primers searching and binding to complementary positions; temperature drops to 60°C
- Extension step: show new nucleotides being added one by one from the primer end; temperature rises to 72°C
- After each complete cycle: show copy count double

Instructional Rationale: An Understand objective (explain PCR steps) requires the learner to see the molecular transformation at each step with concrete data (temperature, copy count). Animation with Next-Step control supports prediction before each stage is revealed.

Color scheme: Red and blue for template strands, yellow for primers, light purple for new strand synthesis, gray for enzyme.
</details>

---

## Capillary Electrophoresis and the Electropherogram

After PCR amplification, the mixture of amplified STR fragments must be separated by size so the alleles at each locus can be identified. **Capillary electrophoresis (CE)** performs this separation.

In CE, the amplified DNA sample is injected into a thin glass capillary filled with a polymer gel matrix. An electric field is applied across the capillary, and the negatively charged DNA fragments migrate toward the positive electrode. Smaller fragments move faster through the gel than larger fragments, so they reach the detection window first — separating the fragments by size.

At the detection window, a laser excites the fluorescent dyes that were attached to the PCR primers. Each STR locus was amplified with primers carrying a different fluorescent dye color, so fragments from different loci can be distinguished even if they overlap in size.

The output of CE is the **electropherogram** — a graph plotting fluorescent signal intensity (y-axis) versus fragment size in base pairs (x-axis). Each peak on the electropherogram represents an allele, and the peak's horizontal position indicates its size.

### Electropherogram Interpretation

**DNA alleles** appear as peaks on the electropherogram. The horizontal position of a peak identifies the allele size (in base pairs, which corresponds to a repeat number). A **heterozygous** individual at a given locus shows two peaks (two different allele sizes); a **homozygous** individual shows a single peak (both alleles the same size, producing one taller peak or appearing the same height as a heterozygous peak depending on the kit and settings).

For a complete 20-locus CODIS profile, the electropherogram contains up to 40 allele peaks spread across multiple color channels, plus the amelogenin peak (which indicates XX = female or XY = male).

Reading an electropherogram requires understanding **allele ladders** — reference standards run alongside the sample showing peaks at known repeat numbers for each locus. The sample peaks are compared against the ladder to assign allele designations.

---

## Y-STR Analysis

**Y-STR analysis** targets STR loci on the Y chromosome. Because the Y chromosome is passed from fathers to sons with minimal recombination, all patrilineally related males share the same Y-STR haplotype.

Forensic applications of Y-STR analysis include:

- **Male lineage tracing** in paternity, missing persons, and ancestry cases
- **Sexual assault cases** where the male contributor's autosomal DNA cannot be separated from the victim's — Y-STR analysis detects only the male-derived DNA
- **Degraded samples** where autosomal STR profiles are incomplete but Y-STR profiles may still be obtainable

The limitation of Y-STR is the same as mtDNA: it cannot uniquely identify an individual; it can only include or exclude based on shared paternal lineage. All brothers, father, paternal grandfather, and paternal uncles of a male contributor share the same Y-STR haplotype.

---

## Random Match Probability and the Product Rule

The power of a complete DNA profile lies in its statistical improbability. The **random match probability (RMP)** answers the question: if we assume the DNA was not left by the suspect, what is the probability that a randomly chosen, unrelated person from the relevant population would have this same profile?

The calculation uses the **product rule**: because the STR loci used in CODIS profiling are on different chromosomes (or sufficiently far apart on the same chromosome), they segregate independently. Therefore, the frequencies of matching genotypes at each locus can be multiplied together.

At each locus, the genotype frequency is calculated using the **Hardy-Weinberg equation**:

- For a heterozygous genotype (alleles *a* and *b*): frequency = \(2p_a p_b\)
- For a homozygous genotype (allele *a* twice): frequency = \(p_a^2\)

where \(p_a\) and \(p_b\) are the frequencies of alleles *a* and *b* in the relevant reference population.

**Example calculation** (simplified to 3 loci):

| Locus | Genotype | Frequency |
|---|---|---|
| CSF1PO | 10, 12 | 0.08 |
| D3S1358 | 15, 17 | 0.12 |
| vWA | 14, 18 | 0.05 |

Product rule:
\[
\text{RMP} = 0.08 \times 0.12 \times 0.05 = 0.00048 \approx 1 \text{ in } 2{,}083
\]

With all 20 CODIS loci, the product rule typically yields RMPs in the range of 1 in one quintillion (10¹⁸) or smaller — meaning the profile would be expected to appear in only about 1 in 10¹⁸ unrelated people.

**DNA database searching** through CODIS operates by comparing profiles at all CODIS loci against stored profiles. A **CODIS hit** (a match between a crime scene profile and a database profile) provides an investigative lead — it identifies a specific known individual whose DNA profile matches the evidence. The hit must be confirmed by re-analysis of a new reference sample from that individual before any legal action is taken.

#### Diagram: Random Match Probability Product Rule Calculator

<iframe src="../../sims/rmp-product-rule/main.html" width="100%" height="480px" scrolling="no"></iframe>

<details markdown="1">
<summary>Random Match Probability Product Rule Calculator MicroSim</summary>
Type: microsim
**sim-id:** rmp-product-rule<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning Objective: Calculate random match probability using the product rule across multiple STR loci (Bloom Level 3 — Apply; verb: calculate).

Bloom Level: Apply (L3)
Bloom Verb: Calculate

Canvas layout:
- Table view: a list of STR loci with genotype fields and frequency inputs
- Calculation panel: shows running product after each locus is added
- Result display: final RMP expressed as a fraction and as "1 in X"

Visual elements:
- Each locus row shows: locus name, allele 1, allele 2, estimated genotype frequency (editable)
- A "running product" bar that updates as each row is filled in
- A log-scale visualization of the probability getting smaller and smaller as loci are added

Interactive controls:
- Students fill in genotype frequencies for 5–8 loci (pre-populated with realistic values from population databases)
- "Calculate Product" button computes the RMP
- A "Compare to population sizes" feature shows how the RMP compares to world population, US population, and planet Earth population

Data Visibility Requirements:
- Show the intermediate product after each locus
- Show the final RMP in both decimal and "1 in X" formats
- Show a scale comparison: "1 in 10^18 means if you randomly sampled people until you found a match, you would have to sample 1 billion times the Earth's population"

Instructional Rationale: An Apply-level objective (calculate RMP) requires the learner to perform the multiplication themselves and see the statistical power accumulate locus by locus — the "wow moment" when the probability becomes incomprehensibly small.

Color scheme: White table background, blue product running total, red for very small probabilities, scale bars in green/orange/red.
</details>

---

## Key Concepts Review

The following table summarizes the major concepts from this chapter:

| Concept | Definition |
|---|---|
| Nuclear DNA | Full genome in cell nucleus; 3 billion base pairs; primary forensic profiling target |
| Mitochondrial DNA | In cytoplasm mitochondria; maternally inherited; useful for degraded samples/hair shafts |
| STR | Short Tandem Repeat; polymorphic loci with variable repeat counts used for profiling |
| CODIS | FBI national database; uses 20 core STR loci + amelogenin |
| PCR Denaturation | 94°C; hydrogen bonds break; double helix separates into single strands |
| PCR Annealing | ~60°C; primers bind to complementary sequences flanking target locus |
| PCR Extension | 72°C; Taq polymerase synthesizes new strand from primer; doubles copy count each cycle |
| Capillary Electrophoresis | Separates PCR fragments by size through a gel-filled capillary under electric field |
| Electropherogram | Graph of fluorescence vs. fragment size; each peak = an allele |
| Heterozygous | Two different alleles at a locus; two peaks on electropherogram |
| Y-STR | Y chromosome STRs; identifies paternal lineage; useful in mixed male/female samples |
| Product Rule | RMP calculated by multiplying genotype frequencies across independent loci |

---

??? question "Challenge: Product Rule Calculation"
    A DNA profile from a crime scene matches a suspect at three loci with genotype frequencies of 0.06, 0.09, and 0.04 respectively.

    **a) Calculate the random match probability. b) What does this probability mean in plain language?**

    **Answer:** (a) RMP = 0.06 × 0.09 × 0.04 = **0.000216**, or approximately **1 in 4,630**. (b) This means that, in the relevant reference population, approximately 1 in every 4,630 unrelated people would be expected to have the same DNA profile at these three loci. Note: this calculation only covers 3 of 20 CODIS loci — a complete 20-locus profile would produce a far smaller (more improbable) RMP, often 1 in quintillions.

---

!!! mascot-celebration "Case Closed — For Now"
    ![Trace raising magnifying glass in celebration](../../img/mascot/celebration.png){ class="mascot-admonition-img"}
    DNA profiling is where biology, chemistry, and statistics converge into one of the most powerful investigative tools ever created. You now understand the molecular basis of the technique, the PCR process that makes it possible from trace samples, and the statistical framework that gives a DNA match its extraordinary evidentiary weight. Chapter 9 takes us to forensic toxicology — what happens when the body itself becomes the evidence container. Follow the evidence!
