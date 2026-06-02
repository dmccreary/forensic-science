---
title: Bloodstain Pattern Analysis
description: Physics of blood behavior, velocity classifications, angle-of-impact trigonometry, area of convergence and 3D area of origin, and bloodstain pattern taxonomy.
generated_by: claude skill chapter-content-generator
date: 2026-06-01
version: 0.08
---

# Bloodstain Pattern Analysis

## Summary

This chapter applies the physics of blood behavior to crime scene reconstruction. Students first study the properties of blood — surface tension, viscosity, and cohesion — that govern how a falling drop forms and deforms on impact. Velocity impact spatter (low, medium, and high) is classified and connected to weapon types or events. The chapter develops the mathematical toolkit of BPA: the angle-of-impact formula (\(\sin \theta = \text{width}/\text{length}\)), two-dimensional area of convergence, and three-dimensional area of origin using the stringing technique. Passive, transfer, and projected stain categories — including cast-off, arterial spurting, and wipe versus swipe patterns — complete the taxonomy.

## Learning Objectives

By the end of this chapter, investigators will be able to:

1. **Explain** how blood drop physics (surface tension, viscosity, cohesion) govern bloodstain shape.
2. **Classify** velocity impact spatter as low, medium, or high and connect each to typical causative events.
3. **Calculate** the angle of impact from a bloodstain's width-to-length ratio.
4. **Determine** the two-dimensional area of convergence using stain directionality.
5. **Distinguish** between passive, transfer, and projected bloodstain patterns and identify specific subtypes.

## Concepts Covered

This chapter covers the following 16 concepts from the learning graph:

1. Blood Drop Physics
2. Surface Tension of Blood
3. Blood Viscosity
4. Blood Cohesion
5. Low-Velocity Impact Spatter
6. Medium-Velocity Impact Spatter
7. High-Velocity Impact Spatter
8. Angle of Impact Formula
9. Area of Convergence
10. Area of Origin in 3D Space
11. Stringing Technique
12. Passive Bloodstains
13. Transfer Bloodstains
14. Cast-Off Bloodstains
15. Arterial Spurting Pattern
16. Wipe vs Swipe Stains

## Prerequisites

This chapter builds on concepts from:

- [Chapter 6: Forensic Serology and Biological Fluid Analysis](../06-forensic-serology/index.md)

---

!!! mascot-welcome "Welcome, Investigators!"
    ![Trace waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img"}
    Blood does not lie — but it does speak a language you have to learn to read. A bloodstain at a crime scene is a frozen record of physics: the velocity, direction, and height of a drop of blood when it impacted the surface. In this chapter, you will learn the language of bloodstain pattern analysis — from the physics of a single falling drop to the three-dimensional reconstruction of where a victim was standing when an event occurred. Follow the evidence — the physics never changes.

---

## The Physics of a Blood Drop

Blood is not simply a red liquid. Its physical properties — **surface tension**, **viscosity**, and **cohesion** — combine to produce the characteristic behaviors that bloodstain pattern analysts rely on.

**Surface tension** is the cohesive force that acts at the surface of a liquid, caused by attractive forces between the liquid's molecules. Blood has a surface tension of approximately 50–73 mN/m (depending on its cellular content and temperature), which causes a falling blood drop to form a sphere. The spherical shape minimizes surface area relative to volume — the most energetically favorable configuration. As the drop falls, it maintains this roughly spherical shape until it contacts a surface.

**Blood viscosity** — approximately 3–5 times greater than water — affects how the blood deforms on impact. A more viscous fluid deforms more slowly, resisting the explosive spread that pure water would exhibit. This is why blood drops on impact tend to produce circular or elliptical stains with relatively smooth edges rather than the highly irregular patterns you might see with a less viscous fluid.

**Blood cohesion** is the molecular attraction between blood cells and plasma molecules that keeps the drop intact during flight and prevents it from breaking apart prematurely. Together, surface tension and cohesion determine the drop's minimum breakup velocity during flight.

### Drop Shape on Impact

When a blood drop strikes a surface at a 90-degree angle (perpendicular), the resulting stain is **circular**. The drop spreads radially and, if the surface is smooth and the drop small, may produce a stain with a slightly scalloped edge. As the drop impacts at increasingly oblique angles, the stain becomes progressively more **elliptical** — elongated in the direction of travel, with a tail or satellite droplets on the leading (downrange) edge.

This shape change from circular to elliptical with decreasing impact angle is the physical basis of the angle-of-impact calculation.

---

## Velocity Classification of Impact Spatter

**Impact spatter** results when a source of blood receives a physical force — a blow, a gunshot — that projects blood droplets outward. The size and distribution of droplets depends primarily on the force (velocity) applied, making velocity classification a useful tool for connecting stain patterns to the type of event that produced them.

Forensic examiners historically used the terms "low," "medium," and "high" velocity to describe impact spatter, though current professional guidance from the International Association of Bloodstain Pattern Analysts (IABPA) prefers describing patterns by their characteristics rather than making direct velocity claims. For educational purposes, the velocity classification framework remains useful as a conceptual tool.

### Low-Velocity Impact Spatter

**Low-velocity impact spatter** involves blood droplets typically **greater than 3 mm in diameter**, produced by low-energy events. Examples include dripping, blood falling from a wound under gravity, or a very slow movement through a pool of blood. The large droplet size reflects the dominance of surface tension at low energy levels — the blood holds together in larger volumes before breaking off. Patterns from low-velocity events include **drip stains**, **pool formations**, and **passive flow trails**.

### Medium-Velocity Impact Spatter

**Medium-velocity impact spatter** produces droplets typically **1–3 mm in diameter**, associated with beatings, blunt force trauma, and stabbings. The weapon strike breaks the blood into moderate-sized droplets that project outward from the impact point. The distribution pattern may help identify the approximate location of the blood source and the direction the blows were delivered.

### High-Velocity Impact Spatter

**High-velocity impact spatter** produces a fine mist of very small droplets — typically **less than 1 mm in diameter**, often described as a mist or spray. This pattern is characteristic of gunshot wounds (both entrance and exit), power tools, and explosions. The extreme energy breaks blood into extremely fine droplets that travel considerable distances. High-velocity mist is often found on ceilings, walls, and surfaces at significant distance from the event.

The following table summarizes the velocity classification framework:

| Classification | Droplet Size | Typical Causes | Pattern Characteristics |
|---|---|---|---|
| Low velocity | > 3 mm | Dripping, passive flow | Large drops, pools, trails |
| Medium velocity | 1–3 mm | Blunt force, beatings, stabbings | Moderate drops, directional patterns |
| High velocity | < 1 mm | Gunshots, explosions | Fine mist, wide distribution |

!!! mascot-thinking "What Does the Data Tell Us?"
    ![Trace peering through magnifying glass](../../img/mascot/thinking.png){ class="mascot-admonition-img"}
    The IABPA moved away from strict velocity classification because the same droplet size can be produced by different types of events depending on the amount of blood available, the surface involved, and environmental conditions. A pattern that "looks like" high-velocity spatter should prompt the question: what event could have produced this? Do not let the vocabulary constrain your analysis.

---

## The Angle-of-Impact Formula

The most important calculation in bloodstain pattern analysis is the **angle of impact** — the angle at which a blood drop struck the surface. It determines where the blood came from.

The formula relies on the geometry of an elliptical bloodstain. When a spherical blood drop strikes a surface at an oblique angle, it produces an elliptical stain. The width of the stain (the minor axis, measured perpendicular to the direction of travel) stays approximately equal to the diameter of the original sphere regardless of impact angle. The length of the stain (the major axis, measured along the direction of travel) increases as the impact angle becomes more oblique.

The relationship is described by the inverse sine function:

\[
\sin \theta = \frac{\text{Width}}{\text{Length}}
\]

where:
- \(\theta\) = angle of impact (degrees from horizontal)
- Width = the minor axis of the stain (shortest dimension)
- Length = the major axis of the stain (longest dimension)

**Example:** A bloodstain measures 8 mm wide and 16 mm long.

\[
\sin \theta = \frac{8}{16} = 0.50
\]
\[
\theta = \sin^{-1}(0.50) = 30°
\]

The blood struck the surface at a 30-degree angle from the surface plane (60 degrees from vertical). Multiple stains in the same spatter event are measured and their angles calculated; the angles are then used to triangulate the area of origin.

#### Diagram: Angle of Impact Calculator

<iframe src="../../sims/angle-of-impact-calculator/main.html" width="100%" height="480px" scrolling="no"></iframe>

<details markdown="1">
<summary>Angle of Impact Calculator MicroSim</summary>
Type: microsim
**sim-id:** angle-of-impact-calculator<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning Objective: Calculate the angle of impact of a bloodstain from width-to-length measurements (Bloom Level 3 — Apply; verb: calculate).

Bloom Level: Apply (L3)
Bloom Verb: Calculate

Canvas layout:
- Left panel (~60%): a simulated bloodstain on a surface; user can drag handles to adjust width and length
- Right panel (~40%): formula display, measurement inputs, calculated angle, geometric diagram

Visual elements:
- An elliptical bloodstain with two measurement arrows: horizontal (width) and vertical (length)
- A geometric diagram showing the drop's trajectory angle relative to the surface plane
- The formula sin θ = Width/Length displayed with live-updating values
- The calculated angle displayed in degrees with a protractor arc overlay on the geometry diagram

Interactive controls:
- Drag handles on the stain to adjust width (5–30 mm) and length (5–60 mm)
- Alternatively, enter width and length values in input boxes
- "Calculate" button computes the angle
- "New Stain" button generates a random stain for the student to measure and calculate

Data Visibility Requirements:
- Stage 1: Show a bloodstain with default dimensions; formula visible with placeholder values
- Stage 2: As dimensions change, live-update the ratio and calculated angle
- Stage 3: Show the geometric diagram updating in real time to show the trajectory angle

Instructional Rationale: An Apply-level objective (calculate angle from measurements) requires hands-on computation. Interactive stain manipulation gives immediate visual feedback connecting the formula to the physical shape.

Color scheme: Bloodstain in dark red on tan/white surface; measurement arrows in blue; formula panel in white with dark text.
</details>

---

## Area of Convergence and Area of Origin

Once the direction and angle of multiple stains in a spatter event are known, the location of the blood source can be reconstructed.

### Area of Convergence (2D)

The **area of convergence** is the two-dimensional region where lines drawn along the major axes of multiple bloodstains (their direction of travel) intersect on a floor plan. Each stain acts like an arrow pointing back toward the blood source. When the lines of convergence from multiple stains are drawn on a 2D overhead sketch, they converge on a region that represents the approximate location of the blood source — where the victim was located horizontally on the floor.

The area of convergence is established by drawing the directionality axis (the long axis extended backward) through at least three or more stains. The region where most lines intersect is the area of convergence. It is a two-dimensional location — a point (or small region) on the floor plan.

### Area of Origin in 3D Space

The **area of origin** extends the area-of-convergence analysis into the third dimension — answering not just *where horizontally* but also *how high above the floor*. This requires knowing both the direction of each stain and its angle of impact.

The **stringing technique** is the physical method for determining the area of origin. At the crime scene, strings are attached to each bloodstain and extended backward along the stain's directionality axis at the calculated angle of impact. The string rises from the floor at the stain's angle, pointing back toward the blood source. Where the strings from multiple stains intersect in three-dimensional space marks the area of origin — the approximate position (height, x, y) of the blood source when the spatter event occurred.

This information can tell investigators whether the victim was standing, sitting, kneeling, or lying on the floor when blood was shed — critical reconstruction data.

#### Diagram: Area of Origin Stringing Simulator

<iframe src="../../sims/area-of-origin-stringing/main.html" width="100%" height="520px" scrolling="no"></iframe>

<details markdown="1">
<summary>Area of Origin Stringing Simulator MicroSim</summary>
Type: microsim
**sim-id:** area-of-origin-stringing<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning Objective: Determine the three-dimensional area of origin using stain direction and angle-of-impact data (Bloom Level 3 — Apply; verb: apply).

Bloom Level: Apply (L3)
Bloom Verb: Apply

Canvas layout:
- Main 3D-perspective view of a room with floor, one wall, and ceiling (isometric or 3D projection)
- Multiple bloodstains visible on the floor with directional arrows
- Strings extending backward from each stain at the calculated angle
- Intersection zone highlighted in the air

Interactive controls:
- Click a bloodstain to see its measurements (width, length, calculated angle)
- "Add String" button attaches a string to a selected stain and shows it projecting at the correct angle
- After all strings are added, "Find Intersection" button highlights the approximate convergence zone in 3D
- Sliders to adjust individual stain measurements to see how the convergence zone moves

Data Visibility Requirements:
- Show angle of impact for each selected stain
- Show the x, y, z coordinates of the intersection zone (in meters from the floor)
- When the user changes a stain's angle, animate the string's slope changing and the convergence zone shifting

Default scenario: Five stains positioned on the floor with pre-calculated angles; the convergence zone indicates a source at approximately 1.2m height (consistent with a standing adult)

Instructional Rationale: An Apply-level objective (determine 3D area of origin) requires the learner to connect multiple data points in space. A 3D interactive string model makes the geometry tangible.

Color scheme: Floor in light wood color, walls light gray, bloodstains dark red, strings bright orange, convergence zone green highlight.
</details>

---

## Bloodstain Pattern Taxonomy

Not all bloodstains at a scene are impact spatter. The full taxonomy of bloodstain patterns covers three major categories, each with several subtypes.

### Passive Bloodstains

**Passive bloodstains** result from gravity acting on blood without external force. They include:

- **Drip stains** — produced when blood falls freely and strikes a surface; circular if perpendicular, elliptical if oblique
- **Pool stains** — blood accumulates on a horizontal surface and spreads outward; the margins reflect the surface texture
- **Flow/trail patterns** — blood flows along a surface under gravity; the direction of flow is shown by the flow pattern margin

### Transfer Bloodstains

**Transfer bloodstains** form when a bloody surface makes direct contact with another surface. They include:

- **Contact/swipe patterns** — a bloody object (hand, shoe, weapon) makes linear contact with a surface, leaving a smear that preserves the shape of the object
- **Wipe patterns** — a clean object moves through an existing wet bloodstain, disturbing it; the direction of wipe is shown by the trailing edge
- **Swipe patterns** — a bloody object moves across a clean surface, leaving a trace of its passage (the blood comes off the object)

The distinction between **wipe** and **swipe** is directional: in a wipe, the blood was already on the surface and something moved through it; in a swipe, the blood was on the moving object and was deposited on the surface.

### Projected Bloodstains

**Projected bloodstains** result from blood projected under pressure or as a result of physical motion, without direct impact:

- **Cast-off bloodstains** — created when a bloody weapon (or bloody hand) is swung; blood flies off in an arc, producing a linear trail of elongated droplets on a wall or ceiling; the curvature of the arc can indicate the direction and number of swings
- **Arterial spurting patterns** — produced by blood pumped under arterial pressure through a wound; creates rhythmic, arching spurts on surfaces (walls, ceiling); the arch height and spacing reflect the victim's heart rate and blood pressure; these patterns indicate the victim was alive when arterial blood was shed
- **Expirated blood patterns** — blood mixed with air exhaled from the respiratory tract; produces a fine mist with a distinctive cellular or bubble pattern when examined closely

---

## Key Concepts Review

The following table summarizes the major concepts from this chapter:

| Concept | Definition |
|---|---|
| Surface Tension | Cohesive force that keeps a blood drop spherical during flight |
| Blood Viscosity | ~3–5× water; controls how blood deforms and spreads on impact |
| Blood Cohesion | Molecular attraction keeping the drop intact until impact |
| Low-Velocity Spatter | > 3mm drops; dripping and passive flow events |
| High-Velocity Spatter | < 1mm mist; gunshots and explosions |
| Angle of Impact | sin θ = width/length; calculates the angle at which a drop struck a surface |
| Area of Convergence | 2D intersection of directionality lines; shows horizontal position of blood source |
| Area of Origin | 3D reconstruction using stringing technique; shows height of blood source |
| Cast-Off Pattern | Linear arc of drops from a swinging bloody weapon |
| Arterial Spurting | Rhythmic arching pattern from arterial pressure wound; victim was alive |
| Wipe vs. Swipe | Wipe: blood already on surface, moved through; Swipe: blood from moving object deposited |

---

??? question "Challenge: Stain Calculations"
    An investigator measures a bloodstain at a scene: width = 12 mm, length = 24 mm. The stain is oriented with its long axis pointing toward a corner of the room.

    **a) Calculate the angle of impact.  b) What does this angle suggest about the height of the blood source?  c) What additional stains would the investigator need to locate the area of origin?**

    **Answer:** (a) sin θ = 12/24 = 0.50; θ = sin⁻¹(0.50) = **30 degrees** from the surface. (b) A 30-degree angle suggests the blood source was at a relatively low height and/or at a significant horizontal distance from the stain — the blood struck the floor at a shallow angle. A 90-degree angle would indicate a source directly above the stain. (c) The investigator needs at least three additional stains from the same spatter event, with measurable width, length, and directionality. Lines drawn along their major axes back toward their sources will converge at the area of convergence; stringing the angles in 3D gives the area of origin.

---

!!! mascot-celebration "Case Closed — For Now"
    ![Trace raising magnifying glass in celebration](../../img/mascot/celebration.png){ class="mascot-admonition-img"}
    You have just learned to read the physics of violence encoded in bloodstains. From a single drop's width-to-length ratio to the three-dimensional stringing of a spatter event, BPA turns crime scene reconstruction into applied trigonometry. Chapter 8 moves from the physical analysis of blood to its molecular identity — forensic DNA profiling. Follow the evidence!

[See Annotated References](./references.md)
