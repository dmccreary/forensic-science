---
title: Glass, Soil, and Physical Trace Evidence
description: Refractive index, Becke line testing, glass fracture mechanics and the 3R Rule, soil composition analysis, and gradient tube density profiling.
generated_by: claude skill chapter-content-generator
date: 2026-06-01
version: 0.08
---

# Glass, Soil, and Physical Trace Evidence

## Summary

This chapter completes the trace evidence module by covering two additional material classes: glass and soil. For glass, students learn refractive index measurement, the Becke line test using immersion oil, and fracture mechanics — including how the 3R Rule and the sequence of radial versus concentric fracture lines reveal the direction and order of multiple impacts. Soil analysis covers composition assessment, pH measurement, particle size distribution, and gradient tube density profiling as a method of geographic comparison. Together, these techniques demonstrate how physical materials deposited at a scene can link suspects and victims through transfer evidence.

## Learning Objectives

By the end of this chapter, investigators will be able to:

1. **Explain** how refractive index is used to compare glass fragments from a crime scene.
2. **Describe** the Becke line test procedure and interpret its results.
3. **Apply** the 3R Rule to determine the direction of impact and the sequence of multiple impacts on shattered glass.
4. **Distinguish** between radial and concentric fracture lines and explain what each reveals about the fracture event.
5. **Describe** how soil composition, pH, particle size, and gradient density profiling are used to compare soil samples geographically.

## Concepts Covered

This chapter covers the following 14 concepts from the learning graph:

1. Glass Composition
2. Refractive Index
3. Becke Line Test
4. Immersion Oil Technique
5. Radial Fracture Lines
6. Concentric Fracture Lines
7. 3R Rule for Glass
8. Glass Fracture Sequence
9. Glass Fracture Mechanics
10. Soil Composition Analysis
11. Soil pH Measurement
12. Particle Size Distribution
13. Gradient Tube Density
14. Sand Mineral Analysis

## Prerequisites

This chapter builds on concepts from:

- [Chapter 2: Crime Scene Investigation and Evidence Collection](../02-crime-scene-investigation/index.md)

---

!!! mascot-welcome "Welcome, Investigators!"
    ![Trace waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img"}
    A shattered window does not just show that someone broke in — it records *how* and *from which direction* if you know how to read it. A smear of soil on a suspect's boot is not just dirt — it is a geographic signature that can place them at a specific location. This chapter teaches you to read two of the most overlooked classes of physical evidence. Follow the evidence — even when it is scattered across the floor in a thousand pieces.

---

## Glass as Physical Evidence

Glass appears at crime scenes as fragments, chips, or smears. It transfers readily during break-ins, assaults involving glass objects, and vehicle collisions. Because different glass products — window panes, headlights, bottles, eyeglass lenses — are manufactured with specific chemical compositions, forensic glass comparison can determine whether two glass fragments share a common origin.

### Glass Composition

Most architectural and automotive glass is **soda-lime glass**, composed primarily of:

- Silicon dioxide (SiO₂) — approximately 70–75% — the primary network former
- Sodium oxide (Na₂O) — approximately 12–15% — a flux that lowers the melting temperature
- Calcium oxide (CaO) — approximately 10–12% — a stabilizer that increases durability
- Minor components — aluminum oxide, magnesium oxide, iron oxide (which affects color and UV transmission)

Specialty glasses have different compositions. **Borosilicate glass** (Pyrex, laboratory glassware) contains boron trioxide, giving it high heat resistance and low thermal expansion. **Tempered glass** has the same composition as ordinary soda-lime glass but is processed differently — heat-treated and rapidly cooled — to make it stronger and cause it to shatter into small, relatively harmless pebbles rather than sharp shards (important for automotive side windows).

The chemical composition of glass is forensically significant because different batches and manufacturers use slightly different formulations, and impurity trace elements (iron, manganese, lead, titanium) vary by raw material source. Two fragments with identical trace element profiles are consistent with originating from the same glass object.

### Refractive Index

The **refractive index (RI)** is the most commonly used physical property for glass comparison. Refractive index is a measure of how much a material slows and bends light as it passes through, defined mathematically as:

\[
n = \frac{c}{v}
\]

where *c* is the speed of light in a vacuum and *v* is the speed of light in the material. For glass, refractive index typically ranges from about 1.45 to 1.55, varying with composition. Because the RI is highly sensitive to the glass's chemical formula, fragments from the same object will have the same RI, while fragments from different glass objects almost always differ — even if the difference is small.

Forensic laboratories measure RI to five significant figures using a hot-stage refractometer or the immersion oil technique described below.

---

## The Becke Line Test

The **Becke line test** is a classic laboratory technique for comparing the refractive index of a glass fragment to that of a reference liquid of known RI — the **immersion oil** — without requiring complex instrumentation.

Before describing the procedure, two terms need definition. A **Becke line** is a bright halo of light visible at the edge of a transparent object when it is immersed in a liquid and viewed under a microscope with slightly defocused illumination. An **immersion oil** is a liquid whose refractive index is precisely known and standardized; a set of immersion oils spans a range of RI values in small increments.

**The Becke line test procedure:**

1. Place a small glass fragment on a microscope slide and surround it with a drop of immersion oil of known RI.
2. Focus the microscope on the glass edge, then slightly defocus by raising the stage.
3. Observe the Becke line (bright halo) at the glass-oil interface.
4. The Becke line always moves **toward the medium with the higher refractive index** when the stage is raised.

**Interpretation:**

- If the Becke line moves **into the glass** (the glass has higher RI than the oil): the glass RI > oil RI → use a higher-RI oil next
- If the Becke line moves **into the oil** (the oil has higher RI than the glass): the glass RI < oil RI → use a lower-RI oil next
- When the glass and oil have **identical RI**, the Becke line disappears and the glass boundary becomes invisible — the glass appears to "vanish" into the oil

By systematically narrowing the oil selection, a forensic examiner can determine the glass fragment's RI to high precision. Two fragments with the same RI are consistent with originating from the same source; a difference of more than ±0.001 in RI indicates different sources.

#### Diagram: Becke Line Test Simulator

<iframe src="../../sims/becke-line-test/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Becke Line Test Interactive Simulator</summary>
Type: microsim
**sim-id:** becke-line-test<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning Objective: Describe the Becke line test procedure and interpret the direction of line movement to determine whether the glass or oil has the higher refractive index (Bloom Level 2 — Understand; verb: interpret).

Bloom Level: Understand (L2)
Bloom Verb: Interpret

Canvas layout:
- Main view (~65%): circular microscope view simulation showing a glass fragment submerged in oil
- Control panel (~35%): sliders for glass RI and oil RI, stage height adjustment, result readout

Visual elements:
- A simulated microscope field of view (circular, with slight vignetting)
- A glass fragment outline visible in the center
- A bright halo (Becke line) at the glass-oil boundary that moves in the correct direction as stage height is adjusted
- A "RI comparison" readout showing glass RI vs. oil RI

Interactive controls:
- Slider: Glass RI (1.450–1.550)
- Slider: Oil RI (1.450–1.550)
- Slider: Stage height (focus / defocus above / below)
- When stage height > focus: Becke line moves toward higher RI medium
- When stage height < focus: Becke line moves toward lower RI medium
- When glass RI = oil RI (±0.002): Becke line fades out; glass boundary becomes invisible

Data Visibility Requirements:
- Stage 1: Show glass and oil at default RIs; both stage-height directions available
- Stage 2: As stage height slider moves, animate Becke line movement direction
- Stage 3: Show a panel with "Conclusion: Glass RI > Oil RI / Glass RI < Oil RI / Match"
- Provide an oil selection tool (dropdown of 5 oils) to simulate the systematic narrowing process

Instructional Rationale: The Understand objective (interpret Becke line movement) is best served by a simulation that lets students manipulate the RI difference and observe the directional response, rather than just reading a description.

Color scheme: Dark microscope background, gray glass fragment, white/bright halo for Becke line, blue control panel.
</details>

---

## Glass Fracture Mechanics

When an object strikes a glass surface, it creates a fracture pattern that encodes information about the impact. Two types of fracture lines form, and their relationship reveals both the direction of force and — when there are multiple impacts — their sequence.

Before examining each fracture type, a key concept: glass is a **brittle material** that does not deform plastically before failing. Instead, stress waves radiate outward from the impact point, creating fracture lines that follow the stress distribution.

### Radial Fracture Lines

**Radial fracture lines** extend outward from the point of impact like the spokes of a wheel — radiating away from the center. They form first and represent the initial propagation of tensile stress from the impact point. On the side of the glass opposite to the impact (the exit side), radial fractures form an arc whose shape can indicate the impact direction.

### Concentric Fracture Lines

**Concentric fracture lines** form rings around the point of impact — like ripples in a pond — connecting the radial lines. They form after the radial lines and represent secondary stress relief around the impact zone. At higher impact energies, multiple rings of concentric lines form.

### The 3R Rule

The **3R Rule** is a mnemonic for reading glass fracture patterns:

> **Radial fractures form first; Radial fractures have Ridges on the Reverse side from the force.**

This rule has three applications:

1. **Which fracture came first?** Radial fractures always form before concentric fractures.
2. **Which direction was the force applied?** The **rib marks** (also called hackle marks or conchoidal stress marks) on the edges of radial fracture lines form a "C" or arc shape that opens toward the side that received the impact. By examining which side of the fracture edge has the arc opening, the examiner determines the direction of force.
3. **What is the sequence of multiple impacts?** When two or more impact events occur, each creates its own radial and concentric lines. A critical rule applies: **fracture lines never cross another pre-existing fracture line**. A fracture line that was created second will terminate when it reaches a fracture line from the first impact event — it does not continue through it. This termination sequence allows examiners to reconstruct the order of impacts even from a shattered, partially reassembled glass panel.

**Glass fracture sequence analysis** answers the investigative question: which blow came first? This has direct bearing on cases involving self-defense claims, staged crime scenes, and vehicle collision reconstruction.

#### Diagram: Glass Fracture Sequence Analyzer

<iframe src="../../sims/glass-fracture-sequence/main.html" width="100%" height="520px" scrolling="no"></iframe>

<details markdown="1">
<summary>Glass Fracture Sequence Analyzer MicroSim</summary>
Type: microsim
**sim-id:** glass-fracture-sequence<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning Objective: Apply the 3R Rule to determine impact direction and sequence from a glass fracture pattern (Bloom Level 3 — Apply; verb: apply).

Bloom Level: Apply (L3)
Bloom Verb: Apply

Canvas layout:
- Main view (~70%): rectangular glass panel showing fracture pattern
- Control panel (~30%): impact simulation controls and analysis tools

Visual elements:
- Glass panel rendered as a light blue-gray rectangle
- Radial fracture lines in dark gray, radiating from impact point(s)
- Concentric fracture lines in medium gray, forming rings
- Impact point(s) marked with a small circle
- On termination events (second fracture meeting first), a small red "T" mark shows where the second fracture stopped

Interactive controls:
- Click anywhere on the glass to add an impact point (up to 3 impacts)
- The simulation draws realistic radial and concentric fracture patterns for each impact
- A "Which came first?" quiz button: hides the impact sequence numbers and asks students to click the impacts in the order they believe they occurred
- Correct/wrong feedback with explanation citing the 3R Rule

Data Visibility Requirements:
- Stage 1: Show a pre-built two-impact fracture pattern with the sequence hidden
- Stage 2: Student clicks to identify which impact point is #1 (first), then #2 (second)
- Stage 3: Reveal correct sequence; highlight the termination points where fracture lines from impact #2 stop at fracture lines from impact #1

Instructional Rationale: An Apply-level objective (apply the 3R Rule) requires the student to use the rule to reach a conclusion, not just recall it. The sequence quiz format forces active analysis.

Color scheme: Light blue-gray glass; dark gray radial lines; medium gray concentric lines; red termination marks; green for correct answer highlights.
</details>

---

!!! mascot-tip "Investigator Tip"
    ![Trace holding magnifying glass](../../img/mascot/tip.png){ class="mascot-admonition-img"}
    When collecting glass fragments from a scene, collect from multiple locations — not just the obvious pile on the floor. Fragments can travel meters from the point of impact and may have transferred to a suspect's clothing or hair. A fragment on the inside of the room suggests the glass was broken from outside (a burglary scenario); fragments on the outside suggest a break from inside (potentially a staged break-in). The distribution pattern tells the story.

---

## Soil as Physical Evidence

Soil is one of the most geographically specific trace evidence materials available. Because soil composition varies with local geology, vegetation, human activity, and drainage patterns, soil found on a suspect's shoes or clothing can potentially be traced to a specific location. No two geographic locations have identical soil profiles when all variables are considered together.

Soil evidence is collected as a **questioned sample** (from the suspect or scene) and compared against **known reference samples** collected from the suspected location.

### Soil Composition Analysis

**Soil composition analysis** evaluates the proportions of the major components present in a soil sample. Soil is a mixture of:

- **Mineral particles** — derived from weathered rock (quartz, feldspar, clay minerals)
- **Organic matter** — decomposed plant and animal material (humus)
- **Soil organisms** — bacteria, fungi, small invertebrates
- **Pore spaces** — occupied by air and water

The relative proportions of these components, and the specific mineral types present, vary with the local geology and land use history. A forensic soil comparison begins with a visual examination of color, texture, and any distinctive inclusions (man-made particles, seeds, pollen, glass).

### Soil pH Measurement

**Soil pH** reflects the acidity or alkalinity of the soil and is determined primarily by the parent rock material and organic matter content. Limestone-derived soils tend to be alkaline (pH > 7); soils from conifer forests or peat deposits tend to be acidic (pH < 7).

pH is measured using pH indicator paper (quick field test) or a digital pH meter (precise laboratory measurement). Two soil samples from different geographic locations often differ in pH, providing a quick initial comparison criterion.

### Particle Size Distribution

**Particle size distribution** classifies soil particles by diameter into the standard soil texture categories:

- **Gravel** — > 2 mm
- **Sand** — 0.05 to 2 mm
- **Silt** — 0.002 to 0.05 mm
- **Clay** — < 0.002 mm

The proportion of each size class defines the soil texture (sandy loam, silty clay, etc.). Particle size distribution is determined by **sieve analysis** (for coarser fractions) or **hydrometer analysis** (for finer fractions). A soil profile with a distinctive combination of coarse sand, clay, and gravel proportions can be highly specific to a geographic location.

### Gradient Tube Density Profiling

**Gradient tube density profiling** (also called **density gradient analysis**) is one of the most discriminating soil comparison techniques available. A gradient tube is a long glass cylinder filled with a column of liquid whose density increases from top to bottom — creating a continuous density gradient. When a soil sample is introduced to the tube, each particle settles to the level where the liquid density equals the particle density, creating a **density profile** — a visual pattern of colored bands at characteristic heights in the tube.

Two soil samples from the same geographic location produce identical or nearly identical band patterns (same bands at the same heights); soil samples from different locations produce different patterns. The gradient tube is highly sensitive to differences in the mineral mix — even two visually similar soils from locations 100 meters apart may produce different gradient profiles if they have different mineral assemblages.

### Sand Mineral Analysis

**Sand mineral analysis** identifies the specific minerals present in the sand-sized fraction of a soil sample. Because different rock types contain different minerals, and because rock types are geographically distributed, the mineral assemblage in a sand sample is a geographic fingerprint. Common sand minerals include quartz, feldspar, mica, hornblende, and garnet. Identification is performed by polarized light microscopy, where each mineral type has characteristic optical properties (birefringence, cleavage angle, extinction angle).

#### Diagram: Soil Analysis Comparison Dashboard

<iframe src="../../sims/soil-analysis-dashboard/main.html" width="100%" height="520px" scrolling="no"></iframe>

<details markdown="1">
<summary>Soil Analysis Comparison Dashboard Interactive Infographic</summary>
Type: infographic
**sim-id:** soil-analysis-dashboard<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning Objective: Analyze multiple soil properties together to compare a questioned soil sample to reference samples from known locations (Bloom Level 4 — Analyze; verb: compare).

Bloom Level: Analyze (L4)
Bloom Verb: Compare

Purpose: Allow investigators to compare a questioned soil sample against three reference samples using four analysis criteria simultaneously.

Layout:
- A four-panel comparison dashboard:
  1. Soil color swatches (Munsell color notation)
  2. Particle size distribution bar chart (gravel/sand/silt/clay %)
  3. pH bar (0–14 scale with visual acid/neutral/base gradient)
  4. Gradient tube visualization (band pattern shown as colored stripes at specific heights)
- Three reference samples (A, B, C) are shown as columns; the questioned sample is shown alongside

Interactive controls:
- Click any reference sample column to highlight it and see a side-by-side comparison with the questioned sample
- A "Match Score" button calculates a similarity score based on pH difference, particle size overlap, and color distance
- Hover over any panel to see a tooltip explaining the forensic significance of that comparison criterion
- A "New Case" button loads a different set of reference and questioned samples

Data Visibility Requirements:
- Show specific numeric values for pH and particle size percentages
- The gradient tube shows 4–6 colored bands at specific heights; matching bands align horizontally when two samples are compared
- When user clicks a reference column, highlight matching and non-matching bands in green/red respectively

Default scenario: Questioned soil from suspect's boots compared against Reference A (distant location, different geology), Reference B (nearby location, similar geology), Reference C (exact collection location)

Instructional Rationale: An Analyze-level objective (compare multiple samples across multiple criteria) requires a dashboard where the learner can view and interact with all the data simultaneously, then synthesize a conclusion.

Color scheme: Earthy tones (browns, tans, grays) for soil samples; blue for pH scale; distinct colors for gradient bands.
</details>

---

!!! mascot-thinking "What Does the Data Tell Us?"
    ![Trace peering through magnifying glass](../../img/mascot/thinking.png){ class="mascot-admonition-img"}
    Like hair and fiber, soil is class evidence — a match places a person within a population of people who could have been at that location, but rarely to the exclusion of everyone else. However, when particle size distribution *plus* pH *plus* mineral assemblage *plus* gradient profile all match, the coincidence of that combination being from an unrelated location becomes extremely unlikely. Accumulate the data points.

---

## Key Concepts Review

The following table summarizes the major concepts from this chapter:

| Concept | Definition |
|---|---|
| Refractive Index | How much a material slows light; used to compare glass fragments |
| Becke Line Test | Microscope technique; Becke line moves toward higher RI medium on defocus |
| Radial Fracture Lines | Spoke-like lines from impact point; form first; carry rib marks |
| Concentric Fracture Lines | Ring-shaped lines around impact; form second; connect radials |
| 3R Rule | Radial first; Ridges on Reverse side from force; second fractures terminate at first |
| Glass Fracture Sequence | Order of multiple impacts determined by fracture line termination points |
| Soil Composition Analysis | Evaluation of mineral, organic, and particle components of a soil sample |
| Gradient Tube Density | Most discriminating soil comparison; mineral particles settle to density-matching bands |
| Particle Size Distribution | Proportions of gravel, sand, silt, clay — defines soil texture and geographic origin |
| Sand Mineral Analysis | Microscopic identification of mineral types in the sand fraction |

---

??? question "Challenge: Reading the Glass"
    An investigator examines a broken window at a burglary scene. The fracture pattern shows two clear impact points. Fracture lines from Impact B stop abruptly when they reach fracture lines from Impact A; Impact A's fracture lines continue uninterrupted across the entire pane.

    **Which impact occurred first? How does the 3R Rule explain this conclusion?**

    **Answer:** Impact A occurred first. The 3R Rule states that fracture lines cannot cross pre-existing fracture lines — they terminate at them. Since Impact B's lines stop at Impact A's lines, Impact A's fractures already existed when Impact B occurred. Impact A's fractures are the "pre-existing" ones that B's fractures could not penetrate. Therefore, A came first, B came second.

---

!!! mascot-celebration "Case Closed — For Now"
    ![Trace raising magnifying glass in celebration](../../img/mascot/celebration.png){ class="mascot-admonition-img"}
    You have just learned to read shattered glass like a forensic detective and to match soil samples to their geographic origins. The trace evidence module is complete — you now have the tools to analyze hair, fiber, glass, and soil. In Chapter 6 we shift to biological evidence, starting with the forensic analysis of blood and other biological fluids. Follow the evidence!

[See Annotated References](./references.md)
