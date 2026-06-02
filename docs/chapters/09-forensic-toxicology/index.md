---
title: Forensic Toxicology and Chemical Analysis
description: ADME pharmacokinetics, Controlled Substances Act schedules, presumptive color tests, GC-MS confirmatory analysis, BAC calculation, and poisoning mechanisms.
generated_by: claude skill chapter-content-generator
date: 2026-06-01
version: 0.08
---

# Forensic Toxicology and Chemical Analysis

## Summary

This chapter covers how the body processes drugs and poisons, how forensic chemists detect and confirm controlled substances, and how alcohol and other toxins are measured in biological samples. Students study the ADME pharmacokinetic pathway (absorption, distribution, metabolism, elimination), then learn the Controlled Substances Act schedule system. Color presumptive tests (Marquis, Scott, Duquenois-Levine) are covered as screening tools, followed by gas chromatography and mass spectrometry as the gold-standard confirmatory methods. Blood alcohol concentration calculation and BAC retro-extrapolation connect pharmacokinetics to legal standards. Specific poisoning mechanisms — cyanide, carbon monoxide, and heavy metals — complete the chapter.

## Learning Objectives

By the end of this chapter, investigators will be able to:

1. **Describe** the ADME pharmacokinetic pathway and explain how each stage affects the detection window for a drug.
2. **Identify** the five Controlled Substances Act schedule categories and give representative examples of each.
3. **Explain** how gas chromatography separates compounds and how mass spectrometry identifies them.
4. **Calculate** a blood alcohol concentration and perform a basic BAC retro-extrapolation.
5. **Distinguish** the mechanisms of cyanide, carbon monoxide, and heavy metal poisoning.

## Concepts Covered

This chapter covers the following 19 concepts from the learning graph:

1. Pharmacokinetics (ADME)
2. Drug Absorption
3. Drug Distribution
4. Drug Metabolism
5. Drug Elimination
6. Controlled Substances Act
7. Drug Schedule Classifications
8. Marquis Reagent Test
9. Scott Reagent Test
10. Duquenois-Levine Test
11. Gas Chromatography (GC)
12. Mass Spectrometry (MS)
13. GC-MS Analysis
14. LC-MS/MS Analysis
15. Blood Alcohol Concentration
16. BAC Retro-Extrapolation
17. Cyanide Poisoning
18. Carbon Monoxide Poisoning
19. Heavy Metal Toxicology

## Prerequisites

This chapter builds on concepts from:

- [Chapter 2: Crime Scene Investigation and Evidence Collection](../02-crime-scene-investigation/index.md)
- [Chapter 6: Forensic Serology and Biological Fluid Analysis](../06-forensic-serology/index.md)

---

!!! mascot-welcome "Welcome, Investigators!"
    ![Trace waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img"}
    The body is its own evidence container. Every substance that enters the bloodstream leaves a chemical signature — in blood, urine, hair, and even bone. Forensic toxicologists read those signatures to reconstruct what a person consumed, when they consumed it, and what effect it had. This chapter is where chemistry and medicine meet criminal investigation. Follow the evidence — right to the molecular level.

---

## Pharmacokinetics: The ADME Pathway

**Pharmacokinetics** is the study of how the body processes substances — drugs, poisons, alcohol, and other chemicals. The four phases of pharmacokinetics are collectively called the **ADME pathway**:

- **A**bsorption
- **D**istribution
- **M**etabolism
- **E**limination

Understanding ADME is essential for forensic toxicology because a drug's concentration in any given biological sample (blood, urine, hair) depends entirely on which ADME phase the body was in when the sample was collected.

### Absorption

**Drug absorption** is the process by which a substance enters the bloodstream from its site of administration. The route of administration determines the speed and completeness of absorption:

- **Intravenous (IV)** injection delivers the substance directly into the bloodstream — essentially 100% absorption, near-instantaneous
- **Oral** ingestion requires the substance to survive stomach acid, dissolve, and cross the intestinal lining — slower and less complete; first-pass metabolism in the liver reduces the active dose before it reaches systemic circulation
- **Inhalation** (smoking, vaping) provides very rapid absorption through the pulmonary capillaries — nearly as fast as IV, with effects in seconds
- **Transdermal** (skin patches) is slow but sustained, providing continuous drug release over hours to days

### Distribution

Once in the bloodstream, the drug is **distributed** throughout the body's tissues. Distribution is governed by:

- **Blood flow** to different organs (brain, muscle, fat receive different perfusion rates)
- **Lipid solubility** — highly lipid-soluble drugs (like THC in cannabis and many anesthetics) readily cross cell membranes and accumulate in fatty tissue; this is why THC can be detected in urine for weeks after use while more water-soluble drugs clear in days
- **Protein binding** — many drugs bind reversibly to plasma proteins; only the unbound fraction is pharmacologically active

### Metabolism

**Drug metabolism** (biotransformation) converts the parent compound into metabolites — typically more water-soluble compounds that can be excreted. The liver is the primary site of drug metabolism, using a family of enzymes called the **cytochrome P450 (CYP) system**. Some metabolites are inactive; others are pharmacologically active (prodrugs are metabolized to their active form in the body). Forensic toxicologists often test for metabolites rather than parent drugs because:

- Metabolites persist in urine longer than parent drugs
- Specific metabolites are diagnostic of specific drugs (e.g., benzoylecgonine is a cocaine metabolite unique to cocaine use)

### Elimination

**Drug elimination** is the process by which the body removes the drug and its metabolites. The primary routes are:

- **Renal (urinary) excretion** — water-soluble metabolites are filtered by the kidneys and excreted in urine; this is the main route for most drugs and their metabolites
- **Biliary/fecal excretion** — some drugs and metabolites are excreted in bile and pass through the gastrointestinal tract
- **Pulmonary excretion** — volatile substances (alcohol, some solvents) are partially exhaled through the lungs; this is the basis of breathalyzer technology

The **elimination half-life** is the time required for the concentration of a drug in the body to decrease by half. After approximately five half-lives, about 97% of the drug has been eliminated.

#### Diagram: ADME Pathway Interactive Flow Diagram

<iframe src="../../sims/adme-pathway/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>ADME Pathway Interactive Flow Diagram</summary>
Type: infographic
**sim-id:** adme-pathway<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning Objective: Explain the ADME pharmacokinetic pathway and describe what happens to a drug at each stage (Bloom Level 2 — Understand; verb: explain).

Bloom Level: Understand (L2)
Bloom Verb: Explain

Purpose: Visualize the journey of a drug through the body's four pharmacokinetic phases.

Layout:
- A simplified body outline with four labeled regions: GI tract (Absorption), Bloodstream/Tissues (Distribution), Liver (Metabolism), Kidneys/Lungs (Elimination)
- Animated colored dots (representing drug molecules) travel along the pathway

Interactive elements:
- Click each body region to open a panel describing that ADME phase, what organs are involved, and how long each phase typically takes
- A "Drug Type" dropdown lets students select oral vs. IV vs. inhaled; the animation speed changes to reflect onset time differences
- A timeline at the bottom shows how blood concentration changes over time (peak, then decline) as the drug moves through ADME phases

Data Visibility Requirements:
- Show actual drug concentration values at each stage
- Show a blood-concentration-over-time curve updating as ADME phases proceed
- Display the detection window for urine vs. blood vs. hair at any given time point

Instructional Rationale: A step-through animated ADME diagram connects abstract pharmacokinetic concepts to a concrete visual model of what happens inside the body after drug administration.

Color scheme: Body silhouette in gray outline; drug molecules as orange dots; liver in brown; kidneys in purple; blood vessels in red.
</details>

---

## The Controlled Substances Act: Schedule Classifications

The **Controlled Substances Act (CSA)** of 1970 is the federal law that regulates the manufacture, possession, use, and distribution of certain drugs and other substances. The CSA establishes five **schedules** (categories) based on a substance's medical value, potential for abuse, and safety profile.

Before the schedule table, two terms: **abuse potential** refers to the likelihood that a substance will be used in a way that leads to physical or psychological dependence; **accepted medical use** means the substance has a currently accepted medical application in treatment in the United States.

| Schedule | Abuse Potential | Accepted Medical Use | Examples |
|---|---|---|---|
| Schedule I | Highest | None recognized | Heroin, LSD, MDMA (ecstasy), psilocybin, cannabis (federal) |
| Schedule II | High; severe dependence | Yes, with restrictions | Cocaine (topical anesthetic), methamphetamine, oxycodone, fentanyl |
| Schedule III | Moderate | Yes | Anabolic steroids, ketamine, buprenorphine, acetaminophen/codeine combinations |
| Schedule IV | Lower | Yes | Benzodiazepines (Valium, Xanax), zolpidem, tramadol |
| Schedule V | Lowest | Yes | Cough preparations with low-dose codeine, pregabalin |

Schedule I substances cannot be legally prescribed; they can only be used in federally authorized research. Forensic toxicologists must know the schedule of any substance they report — it affects the legal charges that may be filed.

---

## Presumptive Color Tests for Controlled Substances

In the field and in preliminary laboratory screening, colorimetric presumptive tests provide rapid initial identification of suspected controlled substances. Like the blood presumptive tests covered in Chapter 6, these tests indicate the *possible* presence of a compound class — they do not confirm identity. All positive results require GC-MS confirmation.

### Marquis Reagent Test

The **Marquis reagent** (concentrated sulfuric acid + formaldehyde) is the most widely used field test for drugs. It produces distinctive color changes with different drug classes:

- **Purple to black**: opioids (heroin, morphine, codeine)
- **Orange to brown**: amphetamines and methamphetamine
- **Purple**: MDMA (ecstasy)
- **Red to orange**: ketamine

The Marquis test is sensitive but not specific — different substances in the same class produce similar colors, and cross-reactivity can produce false positives.

### Scott Reagent Test

The **Scott reagent test** (cobalt thiocyanate in glycerin + dilute hydrochloric acid) is specific for cocaine. In the presence of cocaine, the reagent turns **blue** in the first step; remains blue after addition of hydrochloric acid. Other compounds that initially produce a blue color will turn pink or clear after the acid addition. The two-step nature of the Scott test improves specificity over single-step color tests.

### Duquenois-Levine Test

The **Duquenois-Levine test** is specifically used for cannabis (marijuana and hashish). It involves three reagents applied sequentially:

1. Duquenois reagent (acetaldehyde + vanillin in ethanol) + crushed plant material → purple
2. Addition of hydrochloric acid (purple persists or deepens)
3. Addition of chloroform (chloroform layer turns purple; aqueous layer clears)

The distinctive three-stage purple reaction is characteristic of cannabis. The test targets the terpenoid and cannabinoid compounds in cannabis plant material.

---

## Gas Chromatography and Mass Spectrometry (GC-MS)

**GC-MS** is the gold-standard confirmatory technique for forensic drug analysis. It combines two analytical methods: gas chromatography (separation) and mass spectrometry (identification). Before describing the combined technique, each component needs definition.

### Gas Chromatography (GC)

**Gas chromatography** separates a mixture of volatile compounds by passing it (as a gas) through a long capillary column coated with a stationary phase material. Different compounds interact differently with the stationary phase, traveling through the column at different speeds. Compounds emerge from the column at characteristic times called **retention times**. The GC output is a **chromatogram** — a graph of detector signal intensity vs. time, with each peak representing a separated compound.

GC alone can suggest the identity of a compound based on retention time, but different compounds can share similar retention times. GC must be combined with MS for definitive identification.

### Mass Spectrometry (MS)

After separation by GC, each compound is ionized (typically by electron ionization — bombardment with high-energy electrons) and the resulting ions are separated by their mass-to-charge ratio (m/z) in the mass spectrometer. The output is a **mass spectrum** — a characteristic pattern of fragment ions unique to each molecule's structure. This pattern is essentially a molecular fingerprint.

The mass spectrum is compared against a database of known compound spectra (NIST Mass Spectral Library contains over 350,000 spectra). A match confirms the compound's identity beyond any reasonable doubt.

### LC-MS/MS Analysis

**Liquid chromatography tandem mass spectrometry (LC-MS/MS)** is used when compounds are not volatile enough for GC (including many drugs, their metabolites, and polar compounds). The compound is separated in a liquid mobile phase, ionized by electrospray ionization, and detected by two sequential mass spectrometer stages — the second MS stage selects and fragments specific ions, providing additional structural confirmation. LC-MS/MS is the standard for confirmatory drug testing in blood and urine in clinical and forensic toxicology.

---

## Blood Alcohol Concentration (BAC)

**Blood alcohol concentration (BAC)** is the mass of ethanol per unit volume of blood, expressed in grams per 100 mL (g/dL) or as a percentage (0.08% = 0.08 g/dL). In the United States, the legal limit for driving is 0.08% in most states.

BAC is estimated using the **Widmark formula**:

\[
\text{BAC} = \frac{A}{W \times r}
\]

where:
- *A* = grams of alcohol consumed
- *W* = body weight in grams
- *r* = Widmark factor (0.68 for males, 0.55 for females) — the fraction of body weight that is water (alcohol distributes in body water)

**Converting drinks to grams of alcohol:**
- 1 standard drink (in the US) = 14 grams of pure alcohol = 1.5 oz liquor (40%), 5 oz wine (12%), or 12 oz beer (5%)

**Example:** A 68 kg (150 lb) male consumed 3 standard drinks (42 grams of alcohol).

\[
\text{BAC} = \frac{42}{68{,}000 \times 0.68} = \frac{42}{46{,}240} \approx 0.00091 \text{ g/g} \times 100 = 0.091\%
\]

This exceeds the legal driving limit of 0.08%.

### BAC Retro-Extrapolation

When a blood sample was collected *after* the event of interest (e.g., a blood draw 2 hours after a traffic stop), the BAC at the time of the event must be estimated by **retro-extrapolation** — working backward through time using a known elimination rate.

Alcohol is eliminated from blood at a relatively constant rate (zero-order kinetics) of approximately **0.015–0.020 g/dL per hour** (average 0.017). Retro-extrapolation formula:

\[
\text{BAC at event} = \text{BAC measured} + (\text{hours since event} \times \text{elimination rate})
\]

**Example:** Measured BAC at 2 hours after driving = 0.06%; elimination rate = 0.017 g/dL/hr.

\[
\text{BAC at time of driving} = 0.06 + (2 \times 0.017) = 0.06 + 0.034 = 0.094\%
\]

This exceeds the legal limit, even though the measured BAC at the time of the blood draw was below it.

#### Diagram: BAC and Retro-Extrapolation Calculator

<iframe src="../../sims/bac-retro-extrapolation/main.html" width="100%" height="480px" scrolling="no"></iframe>

<details markdown="1">
<summary>BAC and Retro-Extrapolation Calculator MicroSim</summary>
Type: microsim
**sim-id:** bac-retro-extrapolation<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning Objective: Calculate BAC using the Widmark formula and perform a BAC retro-extrapolation (Bloom Level 3 — Apply; verb: calculate).

Bloom Level: Apply (L3)
Bloom Verb: Calculate

Canvas layout:
- Left panel (~50%): BAC calculator (Widmark formula)
- Right panel (~50%): BAC over time graph with retro-extrapolation line

Visual elements:
- Input fields for weight, sex, number of drinks, time elapsed since drinking began
- A line graph showing BAC rising during consumption, then declining linearly during elimination
- A vertical "event time" marker (e.g., "Time of driving") that the user can position
- A horizontal "legal limit" line at 0.08%
- A "measured BAC at collection" point plotted on the elimination curve

Interactive controls:
- Sliders for weight (40–150 kg), drinks consumed (1–10), time of blood draw (0–8 hours after last drink), elimination rate (0.010–0.025 g/dL/hr)
- "Calculate" button updates the graph and shows BAC at event time vs. at draw time
- "Add Absorption Phase" toggle shows the pre-peak absorption curve when enabled

Data Visibility Requirements:
- Show Widmark calculation steps explicitly
- Show retro-extrapolated BAC at event time with the arithmetic calculation
- Color the area of the graph where BAC > 0.08% in red

Instructional Rationale: An Apply-level objective (calculate and retro-extrapolate BAC) requires learners to input values and see both the formula and the result. A live graph makes the time-course of alcohol metabolism tangible.

Color scheme: Blue line for BAC curve, red shaded area above legal limit, gray vertical marker for event time, yellow point for measured BAC.
</details>

---

## Specific Poisoning Mechanisms

### Cyanide Poisoning

**Cyanide** (typically in the form of hydrogen cyanide gas, potassium cyanide, or sodium cyanide) kills by blocking the mitochondrial enzyme **cytochrome c oxidase** — the terminal enzyme in the cellular respiration chain. Without this enzyme, cells cannot use oxygen to produce ATP even if oxygen is plentiful. The result is **histotoxic hypoxia** — cells suffocate at the molecular level even in the presence of normal oxygen levels. The blood of cyanide victims often appears unusually bright red (oxyhemoglobin is not depleted because cells cannot use the oxygen).

Post-mortem blood samples in cyanide cases are sent to toxicology for cyanide quantification using ion-selective electrode analysis or GC headspace analysis.

### Carbon Monoxide Poisoning

**Carbon monoxide (CO)** is a colorless, odorless gas produced by incomplete combustion (car engines, generators, fires, gas heaters). CO poisoning kills by forming **carboxyhemoglobin (COHb)** — CO binds to hemoglobin with approximately 240 times greater affinity than oxygen, displacing it. The result is that red blood cells carry CO instead of oxygen, producing severe tissue hypoxia.

Post-mortem, carboxyhemoglobin produces a characteristic **cherry-red coloration** of the blood and tissues. Carboxyhemoglobin saturation is measured by spectrophotometric analysis of blood; values above 50% are generally considered lethal; values of 20–30% cause severe neurological impairment.

### Heavy Metal Toxicology

**Heavy metals** — lead (Pb), arsenic (As), mercury (Hg), thallium (Tl), cadmium (Cd) — are toxic in small quantities and accumulate in the body over time. They cause toxicity by:

- Binding to sulfhydryl groups on enzymes, inhibiting enzymatic function
- Interfering with calcium signaling (lead)
- Generating oxidative stress
- Accumulating in specific organs (lead in bone, mercury in the brain, arsenic in hair and nails)

Heavy metal exposure is detected in blood (recent exposure), urine (metabolic clearance), and hair or nails (historical exposure, since heavy metals incorporate into the keratin matrix as hair grows). Hair analysis can reconstruct a timeline of exposure — approximately 1 cm of hair represents one month of growth, so metal concentrations along the hair shaft provide a month-by-month exposure history.

---

## Key Concepts Review

The following table summarizes the major concepts from this chapter:

| Concept | Definition |
|---|---|
| Pharmacokinetics (ADME) | Absorption, Distribution, Metabolism, Elimination — the body's drug processing pathway |
| Drug Absorption | Entry into bloodstream; route determines speed and completeness |
| Drug Distribution | Spread through tissues; governed by blood flow, lipid solubility, protein binding |
| Drug Metabolism | Biotransformation in liver (CYP enzymes); converts parent drug to metabolites |
| Drug Elimination | Removal via kidneys, bile, lungs; half-life determines clearance time |
| CSA Schedules | Five categories (I–V) based on abuse potential and medical use |
| Marquis Reagent | Presumptive color test: purple-black for opioids, orange for amphetamines |
| GC-MS | Gold standard confirmatory: GC separates by retention time, MS identifies by mass spectrum |
| BAC Widmark Formula | BAC = A / (W × r); calculates blood alcohol from grams consumed and body weight |
| BAC Retro-Extrapolation | Estimates BAC at earlier time using elimination rate (~0.017 g/dL/hr) |
| Cyanide Poisoning | Blocks cytochrome c oxidase; histotoxic hypoxia; cherry-red blood |
| CO Poisoning | Forms carboxyhemoglobin (240× O₂ affinity); displaces oxygen; cherry-red tissues |

---

??? question "Challenge: BAC Retro-Extrapolation"
    A 75 kg female (Widmark r = 0.55) was involved in a traffic collision. A blood sample collected 3 hours after the collision measured 0.04% BAC. Using an elimination rate of 0.017 g/dL/hr, calculate her estimated BAC at the time of the collision.

    **Answer:**
    BAC at collision = BAC measured + (hours elapsed × elimination rate)
    = 0.04 + (3 × 0.017)
    = 0.04 + 0.051
    = **0.091%**

    Her estimated BAC at the time of the collision was **0.091%** — above the 0.08% legal limit — even though her measured BAC three hours later was below it.

---

!!! mascot-celebration "Case Closed — For Now"
    ![Trace raising magnifying glass in celebration](../../img/mascot/celebration.png){ class="mascot-admonition-img"}
    Forensic toxicology turns the body into a chemical archive — the drugs, poisons, and alcohol in someone's system are a chronological record of what they consumed and when. You now know how the body processes substances, how chemists confirm their identities, and how alcohol metabolism allows investigators to work backward through time to a critical moment. Chapter 10 brings us fire, arson, and explosives. Follow the evidence!
