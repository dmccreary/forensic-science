---
title: Locate the Phone — Cell Tower Triangulation
description: A virtual lab where investigators use Call Detail Records and signal data from three cell towers to triangulate a phone's probable location during the crime window, then confront the real limit of the method — a sector, not a single point on the map.
---

# Locate the Phone — Cell Tower Triangulation

!!! mascot-welcome "Welcome, Investigators!"
    ![Trace waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img"}

    Every call a phone makes leaves a paper trail — which tower it talked to, how
    strong the signal was, exactly when. Investigators can turn that trail into a
    location. But here's the twist you'll learn today: cell towers point to a
    **region**, not a pin. Precision *and* humility. Follow the evidence!

## The Case

During a one-hour crime window, a suspect's phone connected to **three different
cell towers**. The suspect says they were nowhere near the scene. The provider's
**Call Detail Records (CDRs)** tell a different story — each record logs the tower,
the signal strength, and the timing of the connection.

Your job: use the tower positions, signal strengths, and timing to **triangulate**
the phone's probable location during the window, compare it to where the suspect
claims to have been, and — just as importantly — state honestly *how precisely*
tower data can actually pin a phone. Real triangulation gives you a wedge of
likely area, not a dot.

## Learning Objectives

By the end of this investigation you will be able to:

1. **Interpret** a Call Detail Record table of tower connections.
2. **Apply** signal-strength and timing data to triangulate a probable location.
3. **Compare** the estimated location region to a suspect's claimed whereabouts.
4. **Evaluate** the precision limits of tower geolocation (sector vs. point).

## Quick Facts

| | |
|---|---|
| **Lab type** | 💻 Virtual |
| **Group size** | 2–3 investigators |
| **Time** | 40–50 minutes |
| **Cost** | $0 — computer-based |
| **Ties to** | [Ch 17 — Cell Tower Records, Call Detail Records, Tower Triangulation, IMEI Device Identification, GPS Location Data](../../chapters/17-cell-phone-analytics/index.md) |

## Materials

Per group:

- **None — a laptop and a browser.**
- The instructor's provided CDR evidence table and the suspect's claimed-location
  statement.
- *Assumes access to one computer per group.*

!!! mascot-warning "Read the Uncertainty, Not Just the Answer"
    ![Trace looking alert](../../img/mascot/warning.png){ class="mascot-admonition-img"}

    - Tower data locates the **phone**, not the **person** holding it — phones get
      borrowed, lost, and left behind.
    - Triangulation from towers produces a **probable area**, not a GPS-precise
      point. Reporting a single dot as if it were exact is how tower evidence gets
      overturned on appeal.
    - Use only the provided sample CDR. Real subscriber records are protected and
      require legal process to obtain.

## Background: How Towers Locate a Phone

A cell phone is always in quiet conversation with nearby **cell towers**. Every
call, text, and data session gets logged in a **Call Detail Record** — the tower
used, the time, the duration, and often the **signal strength** and the tower
**sector** (towers broadcast in wedge-shaped sectors, usually three per tower).
Each phone also has a unique **IMEI** number identifying the device itself.

Signal strength is a rough proxy for **distance**: a strong signal usually means
the phone was close to that tower, a weak one means farther away. Combine the
distances to **three** towers and the phone must lie somewhere that satisfies all
three at once — the classic idea behind **triangulation**. Timing data (how long
the signal took to travel) sharpens the estimate.

But here's the catch investigators must always state: towers don't return a point.
Their range varies with terrain, buildings, and network load; a rural tower covers
kilometres while a dense-city tower covers a few hundred metres. The honest output
is an **overlap region** — often a sector wedge or an area of a few city blocks —
where the phone *probably* was. "Probably in this area" is powerful; "exactly here"
overstates what the physics allows.

### Explore: CDR Tower Triangulation

<iframe src="../../sims/cdr-tower-triangulation/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>CDR Tower Triangulation Interactive MicroSim</summary>
Type: microsim<br/>
**sim-id:** cdr-tower-triangulation<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning Objective: Estimate a phone's probable-location region from three towers'
signal ranges and read the uncertainty of the overlap (Bloom Level 4 — Analyze).
</details>

Adjust each tower's signal-strength ring and watch the **overlap region** shrink or
grow. Notice how three rings rarely meet at one clean point — they enclose an
*area*. That area, not a dot, is your answer.

## Procedure

**Part 1 — Read the records.**

1. Open the CDR evidence table. For each connection during the crime window, note
   the **tower ID**, **time**, and **signal strength**.
2. On the map (or the MicroSim), mark the position of each of the three towers the
   phone used.
3. Confirm the connections all belong to the same device by checking the **IMEI**.

**Part 2 — Triangulate.**

4. Translate each tower's signal strength into an approximate **range ring**
   (stronger signal = smaller ring, closer to the tower).
5. Draw all three rings. The region where they **overlap** is the phone's probable
   location during that connection.
6. Repeat for each time point in the window so you can see whether the phone was
   **stationary** or **moving**.

**Part 3 — Compare and qualify.**

7. Mark the suspect's **claimed location** on the same map.
8. Decide whether the claimed location falls **inside or outside** your overlap
   region.
9. Write your location conclusion **with an explicit uncertainty** — the size of
   the region, not a single point.

## Data Collection

| Time | Tower ID | Signal strength | Approx. range | Overlap region (describe) |
|------|----------|-----------------|---------------|---------------------------|
| | | | | |
| | | | | |
| | | | | |
| | | | | |

## Analysis Questions

1. Describe the **overlap region** for the crime window. Roughly how large is it —
   a block, a neighborhood, a few kilometres?
2. Does the suspect's claimed location fall inside or outside that region? What
   does that let you conclude — and what does it *not* let you conclude?
3. Why does a **stronger** signal generally mean the phone was **closer** to a
   tower? Name one thing that could break that assumption.
4. A prosecutor wants you to testify that the phone was "at 42 Main Street." Why
   should you refuse to state it that precisely, and what would you say instead?
5. The evidence locates the **phone**, not the **person**. Give one realistic
   scenario where the phone was in the region but the suspect was not.

## Deliverable

Turn in a **Probable-Location Statement**: a map (or sketch) showing the three
towers, their range rings, and the shaded overlap region, plus a written
conclusion that names the probable area, states its size as an **uncertainty
radius**, and says clearly whether it supports or contradicts the alibi.

!!! mascot-thinking "What Does the Data Tell Us?"
    ![Trace peering through a magnifying glass](../../img/mascot/thinking.png){ class="mascot-admonition-img"}

    The best cell-tower testimony sounds almost cautious: "The phone was probably
    within this several-block area." That hedge isn't weakness — it's honesty about
    what the physics can and can't prove. A dot on a map that pretends to be exact
    is the kind of overreach that gets convictions thrown out.

??? question "Extension Challenge: When the Phone Has GPS"
    Modern phones also log **GPS location data**, which is far more precise than
    tower triangulation — often within metres. Research one difference between how
    **GPS** and **tower** location are generated, and explain why an investigator
    might still rely on tower CDRs even when GPS exists (hint: the phone must have
    logged it, and the data must survive to be recovered).

## Teacher Notes

??? note "Setup, timing, and grading (click to expand)"
    - **Prep:** Build a CDR table with 3 towers and 3–4 time points whose overlap
      region clearly lands **away** from the suspect's claimed location. Place towers
      on a simple grid map so range rings are easy to draw. Vary the tower spacing so
      the overlap is a believable *area*, not a point.
    - **The uncertainty is the lesson.** Grade down any conclusion that reports a
      single exact address; grade up conclusions that state a region and a radius.
    - **Differentiation:** For a shorter run, give pre-drawn range rings and have
      groups only find the overlap. For a challenge, add a fourth tower with a
      contradictory reading and ask which record to trust and why.
    - **Assessment focus:** Reward explicit uncertainty language and the phone-vs-
      person distinction over a "confident" but overstated pinpoint.

!!! mascot-celebration "Case Closed — For Now"
    ![Trace raising a magnifying glass in celebration](../../img/mascot/celebration.png){ class="mascot-admonition-img"}

    You put a phone on the map *and* you were honest about how big the map pin
    really is. That balance — powerful evidence, carefully qualified — is exactly
    what separates real forensic analysis from a TV plot twist. **Follow the
    evidence!**
