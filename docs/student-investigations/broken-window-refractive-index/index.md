---
title: The Broken Window — Refractive Index Match
description: A combination lab where investigators bracket a glass fragment's refractive index with the Becke line immersion method, then fine-tune a simulated immersion oil to an exact match and decide whether jacket glass came from a broken window.
---

![Cover Image](./cover.png)

# The Broken Window — Refractive Index Match

!!! mascot-welcome "Welcome, Investigators!"
    ![Trace waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img"}

    A window is smashed, and a tiny fleck of glass is riding on a suspect's
    jacket. To the naked eye, one clear chip looks exactly like another — but
    glass has a hidden fingerprint you can *measure*. Today you'll bend light
    through a fragment to read that fingerprint. Grab your goggles and your
    pipette. Follow the evidence!

## The Case

A jewelry store's front window was shattered during a break-in on Grove Street.
When police stopped **Marcus Vale** three blocks away, the crime-scene tech
noticed **glinting chips embedded in the sleeve of his jacket.** Marcus insists
the glass came from a drinking glass he dropped at home — not from the store.

The lab has two glass samples:

- **The KNOWN** — a reference chip taken directly from the broken store window.
- **The QUESTIONED** — the chip recovered from Marcus's jacket sleeve.

Your job: measure the **refractive index** of each chip and decide whether the
questioned glass could have come from that window — using **evidence, not the
alibi.**

## Learning Objectives

By the end of this investigation you will be able to:

1. **Explain** what refractive index is and why it varies between types of glass.
2. **Apply** the Becke line immersion method to bracket a fragment's refractive
   index between two liquids.
3. **Compare** a questioned glass fragment to a known source using its measured
   refractive index.
4. **Evaluate** whether refractive-index agreement is enough to say two glass
   samples share a common origin.

## Quick Facts

| | |
|---|---|
| **Lab type** | 🔀 Combination (bench immersion + simulator) |
| **Group size** | 2–3 investigators |
| **Time** | 45–55 minutes |
| **Cost** | ≈ $16 per group (consumables) |
| **Ties to** | [Ch 5 — Glass Composition, Refractive Index, Becke Line Test, Immersion Oil Technique](../../chapters/05-glass-soil-trace-evidence/index.md) |

## Materials

Per group (≈ $16):

- Pre-sorted glass chips: a labeled **KNOWN** set and a labeled **QUESTIONED**
  set (teacher pre-crushes and pre-sorts — see safety note)
- 3 watch glasses or small clear dishes
- Immersion liquids: **water** (n ≈ 1.33), **mineral oil** (n ≈ 1.47),
  **glycerin or corn syrup** (n ≈ 1.47–1.49)
- Disposable pipettes
- Fine-tip tweezers
- Hand magnifier or loupe
- *Shared:* one classroom compound microscope (to view the Becke line clearly)
- *Shared:* a computer or tablet for the `becke-line-test` simulator

!!! mascot-warning "Safety & Handling Rules"
    ![Trace looking alert](../../img/mascot/warning.png){ class="mascot-admonition-img"}

    - **The teacher pre-crushes all glass.** You handle only **pre-sorted chips
      with tweezers**, and goggles stay on the whole time.
    - Never rub or brush a chip with a bare finger — glass edges are sharp and
      small chips are easy to lose.
    - Report any spilled chip immediately. A lost fragment on the floor is a
      safety hazard *and* a contaminated scene.

## Background: Reading Glass With Light

**Refractive index (RI)** is a number that tells you how much a material bends
light as light passes into it. Water bends light a little (RI ≈ 1.33); most
window glass bends it more (RI ≈ 1.51–1.52). Because RI depends on the exact
chemical recipe of the glass, two panes from different manufacturers often have
slightly different values. That makes RI a useful way to *compare* an unknown
fragment to a known source.

Here's the clever part. When a clear glass chip sits in a clear liquid, you can
only *see* the chip if its RI differs from the liquid's. If the glass and the
liquid bend light by the **same** amount, the chip nearly vanishes. As you
focus up and down through the microscope, a bright halo called the **Becke line**
appears at the chip's edge and moves toward whichever material has the **higher**
refractive index. Track that line and you can tell whether the glass is "denser
to light" than the liquid around it — and bracket its RI between two liquids.

Real crime labs do this with a precise oil-gradient instrument. You'll start
with household liquids to bracket the value, then use the simulator to fine-tune
a virtual immersion oil to an exact match.

### Explore: The Becke Line Test

<iframe src="../../sims/becke-line-test/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Becke Line Test Interactive MicroSim</summary>
Type: microsim<br/>
**sim-id:** becke-line-test<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning Objective: Use the movement of the Becke line under focus to determine
whether a glass fragment's refractive index is higher or lower than the
surrounding immersion liquid, and tune the liquid to a match (Bloom Level 3 —
Apply).
</details>

Change the immersion liquid's refractive index and watch the Becke line jump to
the higher-RI side as you rack focus up. When the line disappears and the chip
melts into the background, you've found the **match point** — the liquid's RI
equals the glass's RI.

## Procedure

**Part 1 — Bracket the refractive index (bench).**

1. Place one **KNOWN** chip in a watch glass and cover it with **water**. View it
   under the microscope and rack the focus up. Note which way the Becke line
   moves — toward the glass means the glass has the higher RI.
2. Repeat with a fresh KNOWN chip in **mineral oil**, then another in
   **glycerin/corn syrup**. Record the Becke-line direction each time.
3. From your three trials, decide the **bracket**: the two liquids whose RI
   values the glass falls *between*.

**Part 2 — Repeat for the questioned glass.**

4. Run the exact same three immersions on the **QUESTIONED** chips.
5. Record the bracket for the questioned glass the same way.

**Part 3 — Fine-tune the match in the simulator.**

6. Open the `becke-line-test` simulator. Set the virtual chip to your KNOWN
   bracket, then adjust the immersion-oil RI until the Becke line vanishes.
   Record that RI as your **KNOWN match value.**
7. Repeat for the QUESTIONED chip and record its **match value.**
8. Compare the two match values.

## Data Collection

Record the Becke-line direction (toward glass = glass is higher RI) and your
final match values.

| Sample | Water (n≈1.33) | Mineral oil (n≈1.47) | Glycerin (n≈1.48) | Bracketed range | Sim match value |
|--------|----------------|----------------------|-------------------|-----------------|-----------------|
| KNOWN (window) | | | | | |
| QUESTIONED (jacket) | | | | | |

## Analysis Questions

1. For the KNOWN chip in water, which way did the Becke line move as you focused
   up, and what does that tell you about the glass's RI compared to water?
2. What range did you bracket the questioned glass into before using the
   simulator? How did the simulator narrow it down?
3. Do the KNOWN and QUESTIONED match values agree within measurement error?
   State your conclusion about whether the jacket glass **could** have come from
   the window.
4. Refractive index is **class evidence.** Explain why a matching RI shows the
   two samples are *consistent with* a common source but does **not** prove they
   came from the same window.
5. Name one source of measurement error in your bench immersions and describe
   how the simulator step reduced its effect.

## Deliverable

Turn in a one-page **Glass Comparison Report** that states each sample's bracket
and final match value, your conclusion about whether the questioned glass is
consistent with the window, and one sentence on what your evidence *cannot*
prove. Attach your completed data table.

!!! mascot-thinking "What Does the Data Tell Us?"
    ![Trace peering through a magnifying glass](../../img/mascot/thinking.png){ class="mascot-admonition-img"}

    Matching refractive index makes the jacket glass **consistent with** the
    window — it doesn't stamp Marcus guilty. Millions of panes share the same
    RI. The strongest reports say exactly that: the evidence *includes* a source
    but can't *individualize* it. Precise language is what holds up in court.

??? question "Extension Challenge: The Density Cross-Check"
    Refractive index isn't the only measurable glass property — **density** is
    another. Design a simple density comparison (for example, watching whether a
    chip sinks or floats in liquids of known density) that could support or
    contradict your RI conclusion. Would two glass samples that match on *both*
    RI and density be a stronger association than a match on RI alone? Explain
    why.

## Teacher Notes

??? note "Setup, timing, and grading (click to expand)"
    - **Prep:** *You* crush the glass in advance inside a folded cloth or a
      zip bag, then sort chips into labeled KNOWN and QUESTIONED vials. Students
      never crush glass. For an even safer version, substitute clear acrylic
      chips or glass beads with distinct known RIs — the Becke-line logic is
      identical.
    - **The reveal:** Keep the ground-truth answer (whether the questioned chip
      really matches the window) sealed. Groups commit to a conclusion from
      their match values *before* it's revealed — this rewards evidence over
      guessing.
    - **Differentiation:** For a quicker version, skip the microscope and use
      only the simulator to demonstrate Becke-line movement. For a challenge,
      add a third "decoy" glass with an RI very close to the window's so groups
      must measure carefully to tell them apart.
    - **Assessment focus:** Reward students who correctly read Becke-line
      direction, who bracket before fine-tuning, and who distinguish
      *inclusion* from *individualization* in their conclusion.

!!! mascot-celebration "Case Closed — For Now"
    ![Trace raising a magnifying glass in celebration](../../img/mascot/celebration.png){ class="mascot-admonition-img"}

    You just measured something invisible — the way a fleck of glass bends light
    — and used it to test an alibi. A halo of light at the edge of a chip was
    your silent witness, and you knew how to read it. **Follow the evidence!**
