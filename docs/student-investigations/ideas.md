# Student Investigations — Hands-On Lab Ideas

> *"Follow the evidence!"* — Trace the Raccoon

This page is a **teacher planning catalog**. Each entry turns a key concept from
a chapter into a **Student Investigation**: a hands-on lab where an individual
student or a small group solves a crime, cracks a mystery, or completes an
investigation. Assign one, run a full "crime lab" rotation, or build a
semester-long capstone from several.

Every investigation lists its **learning objective**, the **chapters it ties
into**, and either a **shopping list** (physical) or a **MicroSim
specification** (virtual). Where a MicroSim already exists in `docs/sims/`, it is
noted so you can reuse it instead of building from scratch.

## How to read each entry

Each investigation is tagged with one of three **lab types**:

| Badge | Type | What it means |
|-------|------|---------------|
| 🧪 **Physical** | Real bench lab | Solvable with **under $100 of supplies per group**, purchasable by a teacher from a grocery store, hardware store, or a science-supply vendor (Carolina, Home Science Tools, Amazon). |
| 💻 **Virtual** | Digital lab | Solved with a combination of the [`/story-generator`](../../story-generator) skill and one or more [MicroSims](../sims/index.md). No consumables. |
| 🔀 **Combination** | Hybrid | A physical bench step **plus** a virtual step — typically used to simulate an expensive or slow instrument (DNA sequencer, GC-MS, insect rearing) that a classroom cannot afford or wait for. |

!!! note "Budget & safety ground rules"
    - **$100/group cap** covers *consumables only*. Shared classroom equipment
      (compound microscopes, a UV flashlight, a laptop) is assumed to already be
      on hand and is called out separately as **"Assumes access to…"**.
    - **No real blood, no real body fluids, no controlled substances, no live
      flame beyond a supervised candle.** Every "blood," "drug," and "accelerant"
      below is a **simulant** with the same observable behavior.
    - Investigations that use chemicals include a one-line **safety note**;
      always pair with your district's lab-safety policy and PPE (goggles,
      gloves, aprons).

---

## 1. Locard's Silent Witness — Trace Evidence Transfer 🧪

**Description.** Every group gets a "suspect" object (a fleece glove, a wool
scarf, a glitter-dusted folder) and a "crime scene" surface. Students stage a
brief contact event, then hunt for the two-way transfer of fibers, glitter, and
hairs using tape lifts and a magnifier — proving that *every contact leaves a
trace*. A twist envelope reveals which of three suspect objects actually touched
the scene; students must let the recovered evidence, not the story, decide.

**Learning objective.** Demonstrate Locard's Exchange Principle by documenting
bidirectional trace transfer between two surfaces and using it to include or
exclude a suspect.

**Chapter ties.** Ch 01 (Locard Exchange Principle); Ch 02 (Trace Evidence,
Evidence Collection); Ch 04 (Class Evidence).

**Supplies (per group, ≈ $18).** Clear packing tape + index cards for tape
lifts; 1 fleece glove; 1 wool scarf; craft glitter; a handful of pet fur or
craft-fur; 5× hand magnifiers or loupes; tweezers; a black construction-paper
"scene" mat. *Assumes access to a classroom microscope for the reveal.*

**Companion MicroSim.** Reuse [`locard-exchange-visualizer`](../sims/locard-exchange-visualizer/main.html).

---

## 2. Map the Scene — Triangulation Documentation 🧪

**Description.** A taped-off "crime scene" on the classroom floor holds 4–5
numbered evidence markers. Groups must produce a **scaled sketch** that fixes
each item's position by triangulating from two fixed reference points (door
frame, window corner). A rival group then uses only the sketch to place the
items back — accuracy of the reconstruction is the grade.

**Learning objective.** Produce a scaled crime-scene sketch using the
two-point triangulation method and evaluate its accuracy by reconstruction.

**Chapter ties.** Ch 02 (Crime Scene Sketching, Scaled Sketch Techniques,
Triangulation Measurement, Crime Scene Documentation).

**Supplies (per group, ≈ $12).** 1 tape measure (25 ft); painter's tape;
graph paper; ruler/protractor; 5 numbered evidence tent markers (or folded
index cards); a few props (toy, key, "weapon").

**Companion MicroSim.** Reuse [`triangulation-measurement`](../sims/triangulation-measurement/main.html)
to practice the method before the floor exercise.

---

## 3. The Dusting Detective — Developing Latent Prints 🧪

**Description.** Students press clean fingertips onto glass, plastic, and paper,
then develop the invisible **latent prints** with a dusting powder and lift them
with tape. They compare their own prints to a set of "suspect" exemplar cards to
find who handled the ransom note. A second station uses super-glue (cyanoacrylate)
fuming in a covered jar to reveal prints on a plastic bag — instructor-run.

**Learning objective.** Develop latent fingerprints on porous and non-porous
substrates and match a developed print to an exemplar using pattern type and
minutiae.

**Chapter ties.** Ch 03 (Latent Fingerprints, Fingerprint Substrates,
Cyanoacrylate Fuming, Minutiae Points, Loops/Whorls/Arches).

**Supplies (per group, ≈ $22).** Cocoa powder or cornstarch + fine cosmetic
brush (cheap black-powder substitute) or a real black fingerprint powder jar;
clear packing tape; white and black index cards; a drinking glass, a zip bag, a
paper strip; ink pad for exemplars. **Safety:** cyanoacrylate fuming is a
*teacher demo only*, in a ventilated area.

**Companion MicroSims.** Reuse [`fingerprint-pattern-explorer`](../sims/fingerprint-pattern-explorer/main.html)
and [`latent-print-development`](../sims/latent-print-development/main.html).

---

## 4. Cold Case: AFIS Classification Challenge 💻

**Description.** A story-driven whodunit: a latent print is pulled from a
museum-heist scene, and students must classify it (loop / whorl / arch), count
minutiae, and "search" a six-suspect AFIS database to rank candidates — learning
why AFIS *ranks* rather than *matches*, and why a human examiner makes the final
call. Delivered as a branching story with an interactive search widget.

**Learning objective.** Classify a fingerprint by pattern and minutiae and
explain how an AFIS candidate list is generated and verified.

**Chapter ties.** Ch 03 (AFIS Database, Fingerprint Individualization, Minutiae
Points, Pattern Classification).

**MicroSim spec.** Reuse [`afis-search-workflow`](../sims/afis-search-workflow/main.html)
wrapped in a `/story-generator` narrative. **New optional widget:** a
*minutiae-tagging canvas* (p5.js) — student clicks ridge endings and
bifurcations on a zoomable print image; the sim scores tagged points against a
hidden ground-truth set and returns a ranked candidate list with match scores.
Controls: `createButton('Reset')`, `createSelect()` for pattern type,
`createSlider()` for zoom.

---

## 5. Human or Beast? The Medullary Index Mystery 🔀

**Description.** A hair is found clutched in a victim's hand. Groups mount unknown
hair samples (human head hair, dog, cat, wool) on slides, measure medulla and
shaft diameter under the microscope, and compute the **medullary index** to sort
human from animal. The physical measurement feeds a MicroSim that plots their
value against reference ranges and returns the species verdict.

**Learning objective.** Measure hair medulla and shaft width, calculate the
medullary index, and classify a hair as human or non-human against reference
ranges.

**Chapter ties.** Ch 04 (Hair Medulla Structure, Medullary Index Calculation,
Human vs Non-Human Hair, Hair Scale Patterns).

**Supplies (per group, ≈ $15).** Prepared or self-mounted hair samples (human
volunteer + pet fur + wool yarn); blank slides + coverslips; clear nail polish
or glycerin as mountant; ocular micrometer or a printed scale bar. *Assumes
access to a compound microscope.*

**Companion MicroSim.** Reuse [`medullary-index-calculator`](../sims/medullary-index-calculator/main.html)
for the verdict step.

---

## 6. Fiber Under Fire — Burn & Solubility ID 🧪

**Description.** Six unknown fiber snippets (cotton, wool, nylon, polyester,
acrylic, silk) are recovered from a suspect's car. Groups run a **controlled
burn test** (flame behavior, smell, ash) and a **solubility spot test**, then key
the fiber to a dichotomous identification chart to match it to the fibers on the
victim's sweater.

**Learning objective.** Distinguish natural from synthetic fibers using burn
characteristics and chemical solubility, and use a dichotomous key to identify an
unknown fiber.

**Chapter ties.** Ch 04 (Natural Fibers, Synthetic Fibers, Burn Testing of
Fibers, Chemical Solubility Testing, Fiber Microscopy).

**Supplies (per group, ≈ $20).** Small fiber/yarn samples of 6 types; long
tweezers/forceps; a tea light or Bunsen burner; heat-proof tile; acetone (nail-
polish remover) for the solubility test; labeled jars. **Safety:** burn test in
a fume hood or well-ventilated area, one flame per bench, teacher-supervised,
goggles required.

**Companion MicroSim.** Reuse [`fiber-identification-tree`](../sims/fiber-identification-tree/main.html)
as the digital key.

---

## 7. The Broken Window — Refractive Index & Fracture Match 🔀

**Description.** Glass fragments from a suspect's jacket must be tied to a broken
window. In the physical step, students immerse glass chips in a series of
household liquids (water, oil, glycerin) and watch the **Becke line** to bracket
the refractive index. A MicroSim then lets them fine-tune the simulated immersion
oil to an exact match — modeling the pricey oil-gradient instrument a real lab
uses.

**Learning objective.** Explain refractive index and use the Becke line
immersion method to compare a glass fragment to a known source.

**Chapter ties.** Ch 05 (Glass Composition, Refractive Index, Becke Line Test,
Immersion Oil Technique).

**Supplies (per group, ≈ $16).** Clean crushed-glass chips from two "sources"
(safety-handled, or use clear-acrylic/glass-bead substitutes); watch glasses;
water, mineral oil, corn syrup/glycerin; disposable pipettes; tweezers.
**Safety:** teacher pre-crushes glass; students handle only pre-sorted chips
with tweezers, goggles on.

**Companion MicroSim.** Reuse [`becke-line-test`](../sims/becke-line-test/main.html).

---

## 8. Which Blow Came First? Glass Fracture Sequencing 🔀

**Description.** Given photos (or a 3D-printed/acrylic panel) of a pane with two
bullet holes and intersecting cracks, students apply the **3R rule** and the
principle that a fracture terminates at a pre-existing fracture to determine the
**order of impacts** — answering whether the shot from inside or outside came
first.

**Learning objective.** Determine the sequence of impacts on fractured glass
using radial/concentric fracture patterns and the rule of terminating fractures.

**Chapter ties.** Ch 05 (Radial Fracture Lines, Concentric Fracture Lines, 3R
Rule for Glass, Glass Fracture Sequence, Glass Fracture Mechanics).

**Supplies (per group, ≈ $8).** Printed high-res fracture photos, OR a cracked
acrylic panel (teacher-prepared by scoring), dry-erase overlay sheet + marker.
Mostly an analysis lab — near-zero consumables.

**Companion MicroSim.** Reuse [`glass-fracture-sequence`](../sims/glass-fracture-sequence/main.html).

---

## 9. Soil Signatures — Matching the Suspect's Boots 🧪

**Description.** Soil scraped from a suspect's boots must be matched to one of
three locations. Groups characterize each soil by **color** (against a Munsell-
style chart), **pH**, **particle-size layering** in a settling column, and
mineral sparkle, then decide which site the boot sample came from.

**Learning objective.** Characterize and compare soil samples using color, pH,
and particle-size distribution to associate a sample with a source location.

**Chapter ties.** Ch 05 (Soil Composition Analysis, Soil pH Measurement,
Particle Size Distribution, Gradient Tube Density, Sand Mineral Analysis).

**Supplies (per group, ≈ $18).** 3 labeled soil samples + 1 "boot" unknown
(teacher-collected from different spots); clear tall jars for settling columns;
universal pH test strips; hand lens; white paper for color comparison; small
sieve or coffee filter. *Optional:* a printed soil-color reference chart.

**Companion MicroSim.** Reuse [`soil-analysis-dashboard`](../sims/soil-analysis-dashboard/main.html)
to log and compare results.

---

## 10. Is It Blood? The Kastle-Meyer Presumptive Test 🧪

**Description.** Reddish-brown stains on four items must be screened for blood.
Students run a **Kastle-Meyer-style presumptive test** using a peroxidase
simulant (horseradish extract) and hydrogen peroxide, watching for the tell-tale
pink color and the fizz of catalase — then reason about false positives (horse-
radish, rust, some fruits) and why a presumptive test only *screens*.

**Learning objective.** Perform a presumptive blood test, interpret a positive
color change, and explain the difference between presumptive and confirmatory
tests including false positives.

**Chapter ties.** Ch 06 (Presumptive Blood Tests, Kastle-Meyer Color Test,
Confirmatory Blood Tests); Ch 01 (Scientific Method — screening vs confirmation).

**Supplies (per group, ≈ $14).** Phenolphthalein indicator solution (or a
teacher-mixed KM reagent kit); 3% hydrogen peroxide; grated horseradish or a
peroxidase source as "blood" simulant; rust water, ketchup, and a fruit-juice
decoy; cotton swabs; spot plate. **Safety:** goggles and gloves; no real blood;
dispose of peroxide per policy.

**Companion MicroSim.** New optional **presumptive-test decision** widget could
be specified, or reuse Ch 06's serology content; pairs well with #11 below.

---

## 11. Type the Blood — Who Was at the Scene? 🧪

**Description.** Four "suspects" and one crime-scene stain get **ABO/Rh typed**
using a simulated blood-typing kit (synthetic bloods + anti-A/anti-B/anti-Rh
sera). Students watch for **agglutination**, record each type, and match the
scene stain to the one suspect whose blood type is consistent — while learning
why blood type *excludes* far more powerfully than it *identifies*.

**Learning objective.** Determine ABO and Rh blood type from agglutination
reactions and use blood-type evidence to include or exclude suspects.

**Chapter ties.** Ch 06 (ABO Blood Typing, Rh Factor, Agglutination Chemistry,
Blood Composition).

**Supplies (per group, ≈ $35).** One simulated-blood typing kit (e.g. Carolina
/ Home Science Tools "simulated ABO/Rh" set covers a class); typing trays;
toothpick stirrers. Fully synthetic — no biohazard.

**Companion MicroSim.** Reuse [`abo-blood-typing`](../sims/abo-blood-typing/main.html)
as a pre-lab or verification tool.

---

## 12. Reading the Spatter — Angle of Impact 🔀

**Description.** Groups drip a **blood simulant** onto paper taped at known
angles (90°, 60°, 30°, 15°), measure the length and width of each resulting
stain, and compute the impact angle with the arcsin(W/L) formula — then compare
their calculated angles to the true angles. The MicroSim handles the trig and
lets them test angles they didn't drip.

**Learning objective.** Measure bloodstain dimensions and calculate the angle of
impact using the width-to-length ratio, then evaluate measurement error against
known angles.

**Chapter ties.** Ch 07 (Blood Drop Physics, Angle of Impact Formula, Surface
Tension of Blood, Passive Bloodstains).

**Supplies (per group, ≈ $12).** Blood simulant (water + red food coloring +
a little corn syrup for viscosity, or a commercial simulated-blood bottle);
pipettes/droppers; butcher paper; a protractor-set incline (cardboard + tape);
ruler; calculator. Washable, non-staining recipe recommended.

**Companion MicroSim.** Reuse [`angle-of-impact-calculator`](../sims/angle-of-impact-calculator/main.html).

---

## 13. Stringing the Scene — Finding the Area of Origin 🔀

**Description.** From a set of directional stains on a mock wall, groups run
**strings** back along each stain's flight path to find the **area of convergence**
in 2D, then use the impact angles to project the strings up to the **area of
origin** in 3D — pinpointing where the victim was when struck. The MicroSim
provides a clean digital stringing view to check the physical result.

**Learning objective.** Locate the area of convergence and reconstruct the 3D
area of origin of a bloodstain pattern using directionality and impact angle.

**Chapter ties.** Ch 07 (Area of Convergence, Area of Origin in 3D Space,
Stringing Technique, Cast-Off Bloodstains).

**Supplies (per group, ≈ $16).** Foam board or a cardboard "wall + floor"
corner; colored string/yarn; push pins; protractor; the printed stain pattern
from #12 (or a supplied pattern sheet). Reusable across classes.

**Companion MicroSim.** Reuse [`area-of-origin-stringing`](../sims/area-of-origin-stringing/main.html).

---

## 14. From Strawberry to Suspect — DNA Extraction + STR Match 🔀

**Description.** A two-part crowd-pleaser. **Physical:** students extract visible
DNA from strawberries (or their own cheek cells) using dish soap, salt, and cold
alcohol — proving DNA is real, physical stuff. **Virtual:** because no school can
run a $30k sequencer, a MicroSim simulates **PCR amplification** and produces an
**electropherogram** for the crime-scene sample and three suspects; students
compare STR peak positions at CODIS loci to find the match.

**Learning objective.** Extract DNA from cells and interpret a simulated STR
electropherogram to include or exclude suspects at multiple loci.

**Chapter ties.** Ch 08 (DNA Structure, Short Tandem Repeats, PCR, Capillary
Electrophoresis, Electropherogram Interpretation, CODIS Loci).

**Supplies (per group, ≈ $10).** Strawberries in zip bags; dish soap; table
salt; cold isopropyl or ethanol; coffee filter; test tube or clear cup; wooden
skewer to spool the DNA. Food-safe and cheap.

**Companion MicroSims.** Reuse [`pcr-amplification-simulator`](../sims/pcr-amplification-simulator/main.html)
then [`rmp-product-rule`](../sims/rmp-product-rule/main.html) for the statistics.
**New optional widget:** an *STR electropherogram comparison* sim (p5.js /
Chart.js) — renders scene vs. suspect peak sets at 4–6 loci; `createSelect()`
picks the locus, a `createButton('Overlay')` toggles side-by-side vs overlaid
traces, and the sim reports matching loci.

---

## 15. Beat the Odds — Random Match Probability 💻

**Description.** A defense attorney claims "lots of people share this DNA
profile." Students use a MicroSim to multiply per-locus allele frequencies with
the **product rule**, watch the random-match probability plummet as loci are
added, and write a short courtroom explanation of what "1 in 7 billion" really
means. Framed as a mock-trial prep exercise via `/story-generator`.

**Learning objective.** Apply the product rule to calculate a random match
probability across multiple loci and interpret its meaning for a jury.

**Chapter ties.** Ch 08 (Random Match Probability, Product Rule in Statistics,
DNA Alleles, Homozygous vs Heterozygous, DNA Database Searching).

**MicroSim spec.** Reuse [`rmp-product-rule`](../sims/rmp-product-rule/main.html).
Wrap in a two-scene story: (1) collect allele frequencies from an evidence card,
(2) argue the probability in a mock cross-examination with branching outcomes.

---

## 16. Color-Test Chemistry — Presumptive Drug Screening 🔀

**Description.** An unknown white powder (a **safe simulant** — baking soda,
powdered sugar, cornstarch, chalk) must be screened. Students run **color spot
tests** using household pH-indicator chemistry that stands in for the Marquis /
Scott reagents, build a color-key, and reason about why field color tests are
presumptive only and must be confirmed by GC-MS. A MicroSim then walks the
"confirmatory" GC-MS peak-matching step.

**Learning objective.** Perform presumptive color spot tests on unknown powders,
interpret a color key, and explain why GC-MS confirmation is required.

**Chapter ties.** Ch 09 (Marquis Reagent Test, Scott Reagent Test, Duquenois-
Levine Test, GC-MS Analysis, Gas Chromatography, Mass Spectrometry).

**Supplies (per group, ≈ $12).** 4–5 harmless white powders as "unknowns";
red-cabbage indicator or universal indicator solution; iodine (from a first-aid
kit) for a starch test; spot plates; pipettes; labeled key card. **Safety:**
goggles/gloves; explicitly a *simulant* lab — no real controlled substances.

**MicroSim spec.** **New optional GC-MS peak-match** widget (Chart.js): displays
a retention-time chromatogram + a mass-spectrum fragmentation pattern for the
unknown and a small reference library; student picks the library match. Or defer
to Ch 09's `adme-pathway` for the pharmacology angle.

---

## 17. Point of Origin — Reading a Burn Pattern 💻

**Description.** Arson investigation without the fire hazard. A story-driven
scene photo set shows **V-patterns**, spalling, and pour-pattern char across a
room; students trace the burn indicators back to the origin, decide whether the
fire was accidental or set, and identify where an **accelerant** was likely used
— then justify it with the fire tetrahedron.

**Learning objective.** Interpret V-patterns, spalling, and pour patterns to
locate a fire's origin and assess indicators of arson.

**Chapter ties.** Ch 10 (Fire Tetrahedron, Arson Investigation, Accelerant Pour
Patterns, Multiple Points of Origin, V-Pattern Burn Indicators, Spalling).

**MicroSim spec.** **New burn-pattern origin explorer** (p5.js): a room diagram
where students click suspected origin points and drag "burn-severity" probes;
the sim scores their origin estimate and flags whether multiple origins (an arson
red flag) are present. `createButton('Reset')`, `createSlider()` for a time-lapse
of fire spread, `createCheckbox('Show accelerant trail')`. Pairs with the
existing [`headspace-spme-workflow`](../sims/headspace-spme-workflow/main.html)
for the accelerant-lab follow-up.

---

## 18. Bones Tell Tales — Sex & Stature Estimation 🔀

**Description.** Skeletal remains (a set of **3D-printed or cast** bones, or
scaled printed photos with scale bars) arrive at the lab. Groups measure pelvic
and cranial features to estimate **biological sex**, then measure a long bone and
apply a **stature regression equation** to estimate height — building a biological
profile to compare against three missing-person reports.

**Learning objective.** Estimate biological sex from pelvic/cranial morphology
and estimate stature from long-bone measurements using regression equations.

**Chapter ties.** Ch 11 (Pelvic Morphology, Subpubic Angle, Biological Sex
Estimation, Long Bone Measurements, Stature Regression Equations).

**Supplies (per group, ≈ $25).** Printed high-resolution bone photos with scale
bars (near-free), **or** a set of plastic-cast/3D-printed pelvis + femur models
(one shared class set amortizes well); calipers or a metric ruler; calculator.
Chicken/turkey leg bones (cleaned) work as a cheap long-bone stand-in for the
regression math.

**Companion MicroSim.** Reuse [`skeletal-sex-indicators`](../sims/skeletal-sex-indicators/main.html)
and the stature step of the anthropology chapter.

---

## 19. The Bug Clock — Estimating Time of Death 🔀

**Description.** A body is discovered; the largest blowfly larvae on it are 9 mm
long. Given a temperature log and a development chart, groups compute
**Accumulated Degree Hours** to back-calculate the **minimum post-mortem
interval**. An optional multi-day physical extension rears mealworms or observes
a chicken-liver-in-a-jar succession sequence (well-sealed, outdoors) to see real
instar changes.

**Learning objective.** Use larval length, a development chart, and accumulated
degree hours/days to estimate the minimum post-mortem interval.

**Chapter ties.** Ch 12 (Larval Instar Stages, Accumulated Degree Hours,
Accumulated Degree Days, Minimum Post-Mortem Interval, Blowfly Lifecycle, Insect
Succession).

**Supplies (per group, ≈ $10; optional rearing).** Printed temperature log +
development chart + a metric ruler for the core math (near-free). *Optional
physical extension:* mealworms from a pet store, a ventilated container, oats —
observed over 1–2 weeks. **Safety:** if using meat/liver for succession, seal in
mesh, keep outdoors, dispose responsibly.

**Companion MicroSim.** Reuse [`adh-mpmi-calculator`](../sims/adh-mpmi-calculator/main.html).

---

## 20. Toolmarks & Impressions — Matching the Instrument 🧪

**Description.** A pry mark is found at the point of entry. Each suspect tool
(screwdriver, chisel, bolt cutter) is pressed into modeling clay to make a
**known impression**; students then compare the class characteristics and unique
**striations/compression marks** of the crime-scene impression to the knowns
under magnification to identify the tool — a hands-on model of comparison
microscopy.

**Learning objective.** Compare toolmark impressions by class and individual
characteristics to associate a tool with a mark.

**Chapter ties.** Ch 13 (Toolmark Analysis, Compression Marks, Sliding Marks,
Comparison Microscope, Class vs Individual Characteristics).

**Supplies (per group, ≈ $15).** Modeling clay or plasticine; 3–4 hardware
tools (screwdriver, flat-blade, serrated edge); hand lens or USB microscope;
a "crime-scene" impression the teacher makes with one hidden tool.

**Companion MicroSim.** New optional **striation-overlay** widget could be
specified, or reuse the firearms chapter's [`ballistic-pathway`](../sims/ballistic-pathway/main.html)
for the trajectory angle.

---

## 21. Which Pen Wrote the Ransom Note? Ink Chromatography 🧪

**Description.** A ransom note was written in black ink. Six suspect pens are
seized. Groups spot each pen's ink on chromatography paper (or a coffee filter),
run it with a solvent, and compare the **pigment separation patterns** — the
note's ink fingerprint reveals which pen wrote it.

**Learning objective.** Separate ink pigments using paper chromatography and
compare separation patterns to identify the pen used to write a document.

**Chapter ties.** Ch 14 (Ink Chemistry Analysis, Paper Chromatography, Thin-
Layer Chromatography, Document Examination).

**Supplies (per group, ≈ $10).** Chromatography paper or coffee filters; 6
black water-based markers/pens (deliberately different brands); rubbing alcohol
or water as solvent; clear cups; pencils to suspend strips. Safe, colorful,
high-success.

**Companion MicroSim.** Reuse [`tlc-ink-separation`](../sims/tlc-ink-separation/main.html).

---

## 22. Forged or Genuine? Handwriting Examination 🔀

**Description.** A contested signature on a check must be evaluated. Students
collect **requested exemplars** from classmates, then examine line quality,
slant, spacing, and letter formation to distinguish a person's natural writing
from a **simulated forgery** — and rank three questioned signatures by likelihood
of forgery. The MicroSim overlays and measures slant/spacing for precision.

**Learning objective.** Compare questioned and known handwriting using line
quality, slant, and spacing to assess authenticity.

**Chapter ties.** Ch 14 (Handwriting Analysis, Line Quality, Slant and Spacing
Analysis, Requested Writing Exemplars, Simulated Forgery, Traced Forgery).

**Supplies (per group, ≈ $6).** Exemplar collection sheets; the "questioned"
document set (teacher-prepared with one genuine + forgeries); ruler/protractor;
magnifier. Almost all paper.

**Companion MicroSim.** Reuse [`handwriting-comparison`](../sims/handwriting-comparison/main.html).

---

## 23. Hash It Out — Digital Evidence Integrity 🔀

**Description.** Students learn why investigators hash a drive *before and after*
imaging. Using a simple hashing tool (or a browser MicroSim), they compute the
**MD5/SHA-256** hash of an evidence file, then change a single character and watch
the hash change completely — proving tamper detection. They then match hashes to
prove which of three "seized" files is the untouched original.

**Learning objective.** Compute and compare cryptographic hashes to verify
digital-evidence integrity and detect tampering.

**Chapter ties.** Ch 15 (MD5 Hash Function, SHA-256 Hash Function, Hash
Verification, Forensic Imaging Process, Bit-Stream Copy, Write-Blocker Hardware).

**Supplies.** None — a laptop and a browser. *Assumes access to one computer per
group.*

**MicroSim spec.** **New in-browser hashing** widget (HTML/JS): a text box +
`createButton('Hash')` computing MD5 and SHA-256 live; a "tamper" toggle flips
one byte and highlights the avalanche effect; a compare mode checks two files'
hashes and reports match/mismatch. Reuse [`forensic-imaging-workflow`](../sims/forensic-imaging-workflow/main.html)
for the chain-of-custody framing.

---

## 24. Metadata Detective — EXIF Geolocation 💻

**Description.** A suspect claims they were home all day. Students inspect the
**EXIF metadata** of a set of provided photos (timestamps, GPS coordinates,
device model), plot the coordinates on a map, and build a timeline that
contradicts the alibi. A MicroSim provides the metadata viewer and timeline
builder so no personal photos are needed.

**Learning objective.** Extract and interpret EXIF timestamp and geolocation
metadata to reconstruct a timeline and test an alibi.

**Chapter ties.** Ch 15 (EXIF Metadata Recovery, Digital Timestamp Analysis,
Geolocation from Metadata); Ch 18 (Image Metadata in Social Media, Geolocation
from Social Posts).

**MicroSim spec.** Reuse [`metadata-timeline-builder`](../sims/metadata-timeline-builder/main.html).
**New optional map-plot** step (Leaflet/plotly): drops EXIF GPS points on a map
and animates the timeline; `createSlider()` scrubs time, and a `createCheckbox`
toggles the suspect's claimed location.

---

## 25. Locate the Phone — Cell Tower Triangulation 💻

**Description.** Call Detail Records place a suspect's phone on three towers
during the crime window. Students use signal-strength/timing data to
**triangulate** the phone's probable location, then compare it to the suspect's
claimed whereabouts — learning both the power and the *uncertainty* (sector,
not point) of tower geolocation.

**Learning objective.** Estimate a mobile device's location from cell-tower
records using triangulation and describe the precision limits of the method.

**Chapter ties.** Ch 17 (Cell Tower Records, Call Detail Records, Tower
Triangulation, IMEI Device Identification, GPS Location Data).

**MicroSim spec.** Reuse [`cdr-tower-triangulation`](../sims/cdr-tower-triangulation/main.html).
Frame with a `/story-generator` narrative that hands students a CDR table and
asks them to place the phone and write a probable-location statement with an
explicit uncertainty radius.

---

## 26. Mapping the Conspiracy — Social Network Analysis 💻

**Description.** From seized call logs and social-media connections, students
build a **network graph** of a suspected crew, then use degree and betweenness to
identify the **ringleader** and the key **broker** connecting two cells — an
OSINT investigation that shows how structure, not just content, reveals roles.

**Learning objective.** Construct a social network from communication records and
use centrality measures to identify key actors in a criminal network.

**Chapter ties.** Ch 18 (Social Network Analysis, Social Media Forensics, OSINT,
Open-Source Intelligence); Ch 17 (Call Detail Records).

**MicroSim spec.** Reuse [`social-network-analysis`](../sims/social-network-analysis/main.html).
Provide an edge-list evidence card; students enter connections, the sim renders
the graph and highlights the highest-centrality node as the "person of interest."

---

## 27. Reconstructing the Debris Field — Aviation Forensics 💻

**Description.** A capstone-scale investigation. Students examine a **debris-field
scatter plot** from a crash, classify the pattern as an **in-flight breakup vs.
intact impact**, sequence the wreckage to infer break-up order, and combine it
with radar/ADS-B path data to propose a probable-cause hypothesis — running the
NTSB party-system workflow end to end.

**Learning objective.** Interpret a debris-field distribution to distinguish
in-flight breakup from intact impact and integrate flight-path data into a
probable-cause hypothesis.

**Chapter ties.** Ch 19 (Debris Field Analysis, In-Flight Breakup vs. Intact
Impact, Wreckage Reconstruction, Radar/ADS-B Path Reconstruction, Probable
Cause, NTSB Party System).

**MicroSim spec.** Reuse [`debris-field-pattern-explorer`](../sims/debris-field-pattern-explorer/main.html),
[`ntsb-investigation-workflow`](../sims/ntsb-investigation-workflow/main.html),
and [`aviation-crash-investigation-timeline`](../sims/aviation-crash-investigation-timeline/main.html)
in a three-stage story: field analysis → workflow roles → timeline synthesis.

---

## 28. Face in the Crowd — Recognition & Algorithmic Bias 💻

**Description.** Students step through a **facial-recognition pipeline** (detect →
landmark → encode → match) on sample faces, then run a short "audit" scenario
where the system's confidence differs across demographic groups — surfacing
**algorithmic bias** and why a face match is investigative lead, not proof. A
discussion-and-decision story caps it with an admissibility judgment.

**Learning objective.** Trace the stages of a facial-recognition pipeline and
evaluate the reliability and bias limitations of face-match evidence.

**Chapter ties.** Ch 16 (Facial Recognition Overview, Facial Landmark Detection,
Face Detection Algorithms, Algorithmic Bias in Facial Recognition, Facial
Recognition Admissibility, CCTV Surveillance Analysis).

**MicroSim spec.** Reuse [`facial-recognition-pipeline`](../sims/facial-recognition-pipeline/main.html).
Add a `/story-generator` scenario where students receive candidate match scores
with per-group error rates and must decide whether the match justifies an arrest
— with branching consequences that teach the bias lesson.

---

## Suggested rotations & capstones

Mix and match by course goal:

- **One-day crime-lab carousel (intro):** #1 Locard, #3 Prints, #21 Ink
  Chromatography, #11 Blood Typing — four cheap physical stations, ~20 min each.
- **BPA deep-dive block:** #12 Angle of Impact → #13 Stringing the Scene.
- **DNA week:** #14 Extraction + STR → #15 Random Match Probability (mock trial).
- **Digital-forensics unit:** #23 Hash Integrity → #24 EXIF Metadata → #25 Tower
  Triangulation → #26 Social Network Analysis.
- **Semester capstone:** a single staged "cold case" that requires evidence from
  #3, #5, #9, #14, and #24 to convict — students rotate roles as the lab team.

| Lab type | Investigations |
|----------|----------------|
| 🧪 Physical | #1, #2, #3, #6, #9, #10, #11, #20, #21 |
| 💻 Virtual | #4, #15, #17, #24, #25, #26, #27, #28 |
| 🔀 Combination | #5, #7, #8, #12, #13, #14, #16, #18, #19, #22, #23 |

!!! tip "Trace's advice for teachers"
    Start every investigation with the *question*, not the *procedure*. Hand
    students the mystery — "Which of these three suspects was at the scene?" —
    and let the evidence answer it. That's when forensic science stops feeling
    like a worksheet and starts feeling like the real thing. **Follow the
    evidence!**
