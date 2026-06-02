---
title: Aviation Crash Forensics and Aircraft Accident Investigation
description: ICAO Annex 13 and the NTSB go-team system, debris field analysis, wreckage reconstruction, flight recorders, metallurgical failure analysis, in-flight fire and explosion patterns, human factors, aviation pathology, and probable-cause determination.
generated_by: claude skill chapter-content-generator
date: 2026-06-01 22:20:33
version: 0.08
---

# Aviation Crash Forensics and Aircraft Accident Investigation

## Summary

This chapter examines how forensic science is applied to one of the most complex investigations in the field: determining why an aircraft crashed. Students first learn the legal and organizational framework — the international standard **ICAO Annex 13**, the role of the U.S. **National Transportation Safety Board (NTSB)**, the rapid-response **go-team**, and the **party system** that brings manufacturers and operators into the investigation under government control. The chapter then follows the physical evidence: reading a **debris field** to tell an in-flight breakup from an intact ground impact, **reconstructing wreckage** on a hangar floor, and recovering the **flight data recorder (FDR)** and **cockpit voice recorder (CVR)** from their crash-survivable housings. Students learn how **metallurgical failure analysis** distinguishes a slow **fatigue fracture** from a sudden **overload fracture**, how soot and metal-deformation patterns reveal an **in-flight fire or explosion**, and how **radar and ADS-B** data rebuild the flight path. The chapter closes with the human side of the investigation — **human factors analysis**, **aviation pathology**, **crash survivability**, and the **probable-cause determination** that turns evidence into safety recommendations. Throughout, the chapter stresses the defining feature of accident investigation: its goal is to **prevent the next crash**, not to assign blame.

## Learning Objectives

By the end of this chapter, investigators will be able to:

1. **Describe** the legal and organizational framework of aircraft accident investigation (ICAO Annex 13, the NTSB, the go-team, and the party system) and explain how its prevention-focused purpose differs from a criminal investigation.
2. **Interpret** a debris field to distinguish an in-flight breakup from an intact ground impact, and explain the purpose of physical wreckage reconstruction.
3. **Explain** how flight data recorders, cockpit voice recorders, and radar/ADS-B data are recovered and used to reconstruct the final minutes of a flight.
4. **Apply** metallurgical failure analysis to differentiate a fatigue fracture from an overload fracture and to identify in-flight fire or explosion signatures.
5. **Evaluate** human-factors, pathology, and survivability evidence to support a probable-cause determination and the safety recommendations that follow from it.

## Concepts Covered

This chapter covers the following 20 concepts:

1. Aircraft Accident Investigation
2. Accident vs. Incident Classification
3. ICAO Annex 13
4. National Transportation Safety Board (NTSB)
5. Go-Team and Investigator-in-Charge
6. Party System of Investigation
7. Debris Field Analysis
8. In-Flight Breakup vs. Intact Impact
9. Wreckage Reconstruction
10. Flight Data Recorder (FDR)
11. Cockpit Voice Recorder (CVR)
12. Crash-Survivable Memory Unit
13. Underwater Locator Beacon
14. Radar and ADS-B Flight Path Reconstruction
15. Metallurgical Failure Analysis
16. Fatigue versus Overload Fracture
17. In-Flight Fire and Explosion Patterns
18. Human Factors Analysis
19. Aviation Pathology and Victim Identification
20. Probable Cause and Crash Survivability

## Prerequisites

This chapter builds on concepts from:

- [Chapter 2: Crime Scene Investigation and Evidence Collection](../02-crime-scene-investigation/index.md) — documentation, search patterns, and chain of custody all apply to a crash site, which is simply a very large and hazardous scene.
- [Chapter 10: Fire Investigation, Arson, and Explosives](../10-fire-arson-explosives/index.md) — combustion chemistry and explosive residue analysis are central to telling an in-flight fire from a post-impact ground fire.
- [Chapter 11: Forensic Anthropology and Skeletal Biology](../11-forensic-anthropology/index.md) — and Chapters 8 and 9 — support victim identification, injury analysis, and crew toxicology.

---

!!! mascot-welcome "Welcome, Investigators!"
    ![Trace waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img"}
    A crashed aircraft is a forensic puzzle scattered across a hillside, a runway, or the floor of an ocean. Nobody walks up and confesses, and the most important witnesses — the crew — often did not survive. Yet investigators can still reconstruct the final seconds of a flight from twisted metal, a charred memory chip, and a graph of airspeed. This is forensic science at its largest scale, and its goal is unusual: not to punish anyone, but to make sure the same thing never happens again. Follow the evidence — all the way to the black box.

---

## What Makes a Crash a Forensic Problem

A modern airliner is a machine with millions of parts, flown by trained crews, inside a tightly regulated system. When one crashes, the question "what happened?" almost never has a single, obvious answer. **Aircraft accident investigation** is the systematic, science-based process of reconstructing an aviation accident to determine its cause and prevent recurrence. It draws on nearly every discipline in this book — trace evidence, fire and explosives chemistry, pathology, toxicology, and digital forensics — and adds engineering disciplines such as metallurgy, aerodynamics, and human factors.

It is important to separate two ideas that television tends to blur. **Forensic science** is the application of scientific methods to questions of public interest; **investigative procedure** is the organizational work of running the inquiry. Aviation investigation keeps these especially distinct, because the entire enterprise is built around a single principle: the purpose is **prevention, not blame**. An accident investigator who discovers pilot error does not arrest the pilot — they write a recommendation so that training, procedures, or cockpit design change for everyone.

That prevention-first goal also explains a sharp boundary. The moment evidence suggests a **deliberate** act — sabotage, a bomb, or a hijacking — the investigation becomes a criminal matter and a law-enforcement agency (in the United States, the FBI) takes the lead, applying everything you learned about chain of custody and admissibility in earlier chapters. Most investigations, however, are about accidents, and they are governed by safety law, not criminal law.

### Accident or Incident?

Before an investigation can begin, the event must be classified. International standards draw a clear line between an **accident** and an **incident**, because the classification determines who must be notified and how intensive the response will be.

| Feature | Accident | Incident |
|---|---|---|
| Injury | A person is killed or seriously injured | No serious injuries |
| Aircraft damage | Substantial structural damage, or aircraft destroyed | Little or no damage |
| Aircraft status | May be missing or inaccessible | Aircraft intact and usable |
| Example | Runway overrun with fatalities | A near-miss between two aircraft |
| Reporting | Mandatory, immediate, full investigation | Reported and reviewed; may or may not be investigated in depth |

The distinction matters because incidents — the near-misses and minor events — are studied just as carefully in aggregate. A pattern of similar incidents is often the early warning that prevents a future accident, which is why aviation safety culture treats reporting as a duty rather than an admission of fault.

---

## The Framework: Annex 13, the NTSB, and the Go-Team

Aviation is international by nature — an aircraft built in one country, owned in a second, and crashed in a third is routine. To keep investigations consistent across borders, the International Civil Aviation Organization publishes **ICAO Annex 13**, the global standard titled *Aircraft Accident and Incident Investigation*. Annex 13 establishes which country leads an investigation (normally the **State of Occurrence**, where the crash happened), guarantees participation rights to the states of the operator, manufacturer, and registry, and — critically — states that the **sole objective** of an investigation is the prevention of future accidents, explicitly *not* the apportioning of blame or liability.

Within the United States, that standard is carried out by the **National Transportation Safety Board (NTSB)**, an independent federal agency. "Independent" is the key word: the NTSB does not report to the Federal Aviation Administration (FAA) — the agency that regulates aviation — so it can investigate the regulator itself without a conflict of interest. The NTSB determines the **probable cause** of each accident and issues safety recommendations, but it has no power to punish, fine, or regulate. Its only weapon is a well-supported recommendation.

!!! mascot-thinking "Key Concept: The Machine Keeps Its Own Record"
    ![Trace thinking with magnifying glass](../../img/mascot/thinking.png){ class="mascot-admonition-img"}
    Here is what makes aviation forensics unique among everything in this book: the "victim" is also the best witness. An aircraft continuously records what it was doing — its speed, its altitude, the crew's words, the position of every control. When investigators recover that record, the machine effectively testifies about its own final minutes. Our job is to make it speak accurately, without putting words in its mouth.

### The Go-Team

When a major accident occurs, the NTSB launches a **go-team** — a group of specialists kept on standby to deploy within hours, anywhere in the country (or the world, when invited under Annex 13). The team is led by an **Investigator-in-Charge (IIC)**, who has authority over the entire on-scene investigation. The IIC organizes the work into specialist groups, each responsible for one slice of the evidence.

A typical go-team includes specialist groups for:

- **Operations** — the flight crew's actions, the flight plan, and the history of the flight.
- **Structures** — the airframe, wreckage distribution, and reconstruction.
- **Powerplants** — the engines and propellers.
- **Systems** — hydraulics, electrical systems, flight controls, and instruments.
- **Air Traffic Control** — communications and radar data.
- **Weather** — meteorological conditions along the route.
- **Human Performance** — crew fatigue, training, medical history, and decision-making.
- **Survival Factors** — the cabin, evacuation, injuries, and emergency response.

### The Party System

The NTSB cannot possibly hold deep expertise in every aircraft type ever built, so it uses the **party system**: it formally invites the organizations with the most technical knowledge — the aircraft manufacturer, the engine maker, the airline, and relevant unions — to participate as **parties** to the investigation. Those parties supply engineers and data, but they work *under NTSB control and direction*, and lawyers and insurers are explicitly excluded. This arrangement gives investigators access to proprietary engineering knowledge while keeping the people with a financial stake in the outcome from steering the result.

---

## Reading the Wreckage

The crash site is the first and largest body of physical evidence. Before anything is moved, the entire scene is documented — photographed, mapped, and surveyed — exactly as you learned for any crime scene in Chapter 2, but spread across an area that can span many kilometers. The pattern of that wreckage is itself a major clue.

### The Debris Field

A **debris field** is the area over which aircraft wreckage is distributed. Its shape, size, and the way pieces are sorted across it tell investigators a great deal before a single component is examined in a lab. The central question a debris field answers is whether the aircraft was **intact when it hit the ground** or **broke apart in the air**.

To read a debris field, investigators distinguish two broad patterns:

- **Intact (in-one-piece) impact** produces a **concentrated** debris field. The aircraft struck the ground as a single body, so wreckage, ground scars, and the heaviest components cluster in a relatively small area along the flight path.
- **In-flight breakup** produces an **elongated, scattered** field. When a structure fails in flight, light pieces (interior panels, paper, insulation) flutter down and land far "upwind" along the track, while dense pieces (engines, landing gear) carry forward and fall farther along. The longer and more sorted the field, the higher the altitude at which the breakup likely began.

The principle behind the scatter is straightforward physics: heavier, denser objects retain more momentum and travel farther before landing, while light objects are quickly slowed by air resistance and drift down near where they separated. Mapping the location of each piece by weight and type therefore reverse-engineers the sequence and altitude of the breakup. The following MicroSim lets you experiment with that relationship directly.

#### Diagram: Debris Field Pattern Explorer MicroSim

<iframe src="../../sims/debris-field-pattern-explorer/main.html" width="100%" height="602px" scrolling="no"></iframe>

<details markdown="1">
<summary>Debris Field Pattern Explorer MicroSim</summary>
Type: microsim
**sim-id:** debris-field-pattern-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning Objective: Interpret a debris field to distinguish an in-flight breakup from an intact ground impact (Bloom Level 3 — Apply; verb: interpret).

Bloom Level: Apply (L3)
Bloom Verb: Interpret

Canvas layout:
- Top view (~70% of canvas height): a top-down map showing the aircraft flight track as a dashed line crossing the canvas left to right, with a ground-scar/impact marker. Wreckage pieces are plotted as labeled dots scattered along the track.
- Bottom panel (~30%): a readout showing the computed debris-field length, the inferred breakup altitude, and a plain-language verdict ("Pattern consistent with: intact impact / low-altitude breakup / high-altitude breakup").

Visual elements:
- Wreckage pieces color-coded and sized by density class: heavy (engines, landing gear) in dark blue, medium (wing/fuselage sections) in teal, light (interior panels, insulation, paper) in light gray.
- A wind-direction arrow.
- A scale bar in kilometers.

Interactive controls:
- Slider: Breakup altitude (0 m = intact ground impact, up to 12,000 m). At 0 the pieces collapse into a tight cluster; as altitude increases the field stretches and sorts by density.
- Slider: Wind speed and a direction selector (to show how wind skews the light-debris scatter).
- Slider: Aircraft speed at breakup.
- Checkbox: "Show density sorting" highlights how light pieces fall short and heavy pieces carry forward.
- Button: Reset to defaults.

Data Visibility Requirements:
- Display the debris-field length in km as the sliders change.
- Display the density sorting (light pieces upwind/short, heavy pieces downwind/long).
- Display the inferred verdict text that updates live.

Instructional Rationale: An Apply-level objective requires the learner to manipulate altitude, wind, and speed and observe how each changes the debris pattern, building intuition for reading a real field.

Responsive design: The sketch must call updateCanvasSize() first in setup() and respond to window resize events so the map rescales to the container width.

Color scheme: Dark blue for heavy debris, teal for medium, light gray for light debris; orange for the flight track; red for the impact/ground-scar marker.
</details>

### Wreckage Reconstruction

When the cause of a breakup is unclear — or when sabotage is suspected — investigators may physically rebuild the aircraft. **Wreckage reconstruction** is the painstaking reassembly of recovered pieces onto a frame or a marked hangar floor, restoring the aircraft's shape so that the *origin* and *sequence* of a failure become visible. Reconstruction reveals which structure failed first, whether a fracture started from the inside or the outside, and where a fire or explosion began.

Two landmark cases show its power. After **Pan Am Flight 103** broke up over Lockerbie, Scotland, in 1988, investigators reassembled the forward fuselage and found a small region of metal bent and pitted in a way that pointed outward — the unmistakable signature of an explosion *inside* the aircraft, which redirected the inquiry toward a bomb. After **TWA Flight 800** exploded off New York in 1996, the NTSB recovered wreckage from the seabed and rebuilt a large section of the aircraft in a hangar, an effort that took months and ultimately supported a center-fuel-tank explosion as the cause rather than the missile or bomb theories that circulated early on.

!!! mascot-warning "Resist the First Theory"
    ![Trace pointing out a caution](../../img/mascot/warning.png){ class="mascot-admonition-img"}
    Early in a high-profile crash, everyone wants an answer *now*, and the loudest theory is often wrong. TWA 800 was blamed on a missile for months; the reconstructed wreckage said otherwise. Disciplined investigators hold every hypothesis open until the physical evidence rules it out. "The evidence suggests" is a far stronger phrase than "this proves" — even when the cameras are rolling.

---

## The Recorders: Flight Data and Cockpit Voice

Two devices, popularly called the **black box** (though they are painted bright orange so they can be found), capture the most direct record of a flight's final minutes. Recovering and reading them is often the single most decisive step in an investigation.

The **flight data recorder (FDR)** logs the aircraft's measurable parameters over time. Early units recorded only a handful of values; modern recorders capture hundreds to thousands of parameters — altitude, airspeed, heading, vertical acceleration, control-surface positions, engine settings, autopilot mode, and more — typically for the most recent 25 hours of operation. The **cockpit voice recorder (CVR)** captures audio from the flight deck: crew conversation, radio calls, switch clicks, and ambient sounds such as alarms or the airflow of a depressurization. Modern CVRs retain the last two hours of audio across multiple channels.

Before comparing them, it helps to see what each one is for. The FDR tells investigators *what the aircraft did*; the CVR tells them *what the crew experienced and decided*. Used together, they let investigators correlate an event (say, an engine surge on the FDR) with the crew's awareness and response (their words on the CVR) to the same second.

| Feature | Flight Data Recorder (FDR) | Cockpit Voice Recorder (CVR) |
|---|---|---|
| Records | Flight parameters (altitude, speed, control inputs, engine data) | Cockpit audio (crew voices, radio, alarms, ambient sound) |
| Answers | *What did the aircraft do?* | *What did the crew know and decide?* |
| Typical duration | ~25 hours of data | ~2 hours of audio (loops over older content) |
| Form | Digital values sampled many times per second | Multi-channel audio |
| Strength together | Correlates the machine's behavior with the crew's response, second by second |

### Surviving the Crash

Recorders are only useful if they survive, so the memory itself is sealed inside a **crash-survivable memory unit (CSMU)** — a heavily armored module engineered to outlast the aircraft around it. Regulatory standards require the unit to withstand an impact shock on the order of **3,400 g**, a fire of roughly **1,100 °C for up to an hour**, and prolonged immersion under deep-sea pressure. The electronics that *write* the data are not protected; only the stored record needs to survive.

When an aircraft goes down over water, finding the recorders becomes its own challenge, solved by the **underwater locator beacon (ULB)** — a "pinger" attached to the recorder that activates on contact with water and emits an acoustic signal (about 37.5 kHz) that search vessels can home in on. After **Air France Flight 447** disappeared into the Atlantic in 2009 and its recorders were not found until 2011 — after the beacon batteries had died — international standards were strengthened to require longer-lasting beacons (about 90 days) so that future deep-water recorders can be located before their signal fades.

!!! mascot-tip "Investigator Tip"
    ![Trace holding magnifying glass](../../img/mascot/tip.png){ class="mascot-admonition-img"}
    A recorder readout is data, not truth. The values can be mislabeled, a sensor can fail, and a parameter can read "normal" while the real system is broken. Always corroborate the recorders against independent evidence — radar tracks, the physical wreckage, and the witnesses. When two independent lines of evidence agree, your conclusion is solid. When they disagree, you have found your next question.

### Rebuilding the Flight Path

The recorders describe the aircraft from the inside; outside observers describe it too. **Radar and ADS-B flight-path reconstruction** combines ground-radar returns with **ADS-B (Automatic Dependent Surveillance–Broadcast)** signals — position reports that modern aircraft broadcast automatically from their own GPS — to rebuild the three-dimensional track of the flight. This external record is invaluable when recorders are damaged, missing, or recovered late, and it provides an independent check on the FDR's own position data.

---

## When Metal Fails: Metallurgical Analysis

If the wreckage suggests a structural failure, the investigation moves into the materials laboratory. **Metallurgical failure analysis** is the examination of fractured metal components — often under a microscope — to determine *how* and *why* they broke. The central distinction is between a fracture that developed slowly over many flights and one that happened all at once.

A **fatigue fracture** grows gradually under repeated cycles of stress, such as the pressurization and depressurization an airframe experiences on every flight. Under magnification, a fatigue surface shows two telltale features: **beach marks** (curved bands, visible to the eye, that record pauses or changes in the crack's growth) and microscopic **striations** (fine ridges, one per stress cycle, visible only under an electron microscope). A fatigue crack typically begins at a stress concentration — a rivet hole, a sharp corner, or a spot of corrosion — and spreads until the remaining metal can no longer carry the load.

An **overload (overstress) fracture**, by contrast, happens in a single event when a force exceeds what the metal can bear all at once. Its surface looks completely different: rough, fibrous, or dimpled in ductile metals, with no beach marks and no striations, because there were no repeated cycles to leave them.

Because this distinction can be hard to hold onto, the table below summarizes the contrast you should carry into the next section.

| Feature | Fatigue Fracture | Overload Fracture |
|---|---|---|
| Cause | Repeated stress cycles over time | A single excessive force |
| Time to develop | Many flights / long period | Instantaneous |
| Surface to the eye | Smooth zones with curved **beach marks** | Rough, fibrous, or dimpled |
| Surface under microscope | Fine **striations** (one per cycle) | Dimples (ductile) or cleavage (brittle); no striations |
| Typical origin | A stress concentration: rivet hole, corrosion pit, sharp corner | The point of peak applied load |
| Classic example | Comet (1950s); Aloha Airlines 243 (1988) | A structure broken by a separate primary failure |

The history of aviation is, in part, a history of learning to read these surfaces. The **de Havilland Comet** — the first commercial jetliner — suffered catastrophic in-flight breakups in the 1950s that were eventually traced to **metal fatigue** cracking from the corners of its near-square windows, a finding that gave every later airliner its rounded windows. Decades later, **Aloha Airlines Flight 243** lost a large section of its upper fuselage in flight; investigators found that years of fatigue cracking, accelerated by salt-air corrosion and a high number of short pressurization cycles, had weakened the skin. In both cases, the metal itself recorded its own slow failure for anyone who knew how to look.

!!! mascot-encourage "This One Takes Practice"
    ![Trace offering encouragement](../../img/mascot/encouraging.png){ class="mascot-admonition-img"}
    Telling fatigue from overload on a real fracture surface is a skill metallurgists spend years developing — do not expect it to click on the first read. The shortcut to remember: **fatigue is a story told over time** (beach marks and striations are its chapters), while **overload is a single sudden sentence**. Get that mental image firmly in place and the laboratory details will hang on it.

---

## Fire, Explosion, and the Human Story

Fire is common in crashes, and a key forensic question is *when* it started — in the air or on the ground. The chemistry you studied in Chapter 10 carries directly into the aircraft. **In-flight fire and explosion patterns** are read from soot deposition, heat damage, and metal deformation. Soot that streaks *backward along the exterior* of a fuselage section, for instance, indicates fire while the aircraft was still moving through the air; uniform charring concentrated at the impact point points instead to a post-impact ground fire. An internal **explosion** leaves its own signature — metal **petalled and bent outward**, fine pitting, and explosive residues — the very pattern that identified the bomb in the Pan Am 103 reconstruction. Detecting and identifying explosive residue uses the same trace-chemistry methods covered in the explosives section of Chapter 10.

The investigation also studies the people on board, and here several earlier chapters converge. **Human factors analysis** examines the crew's performance — fatigue, training, workload, communication, and decision-making — recognizing that most accidents involve a *chain* of small human and organizational errors rather than a single villain. **Aviation pathology and victim identification** applies forensic pathology, odontology, and DNA (Chapters 8 and 11) to identify victims and to read injury patterns: the distribution of injuries can reveal whether occupants were braced, whether seatbelts were worn, and whether the forces were survivable. Toxicology (Chapter 9) screens the crew for impairing substances or for carbon monoxide that would indicate an in-flight fire.

Closely tied to pathology is the **crash survivability assessment**, which asks a sober but vital question: *could anyone have survived this, and if not, why not?* Investigators classify the crash forces against the limits of human tolerance and examine whether occupiable space was preserved, whether restraints and seats held, and whether occupants could have escaped before fire or smoke overcame them. A crash is judged **survivable** when the deceleration forces stayed within human limits *and* a livable space remained; when survivors nonetheless die, the survival-factors group asks what about the seats, exits, or evacuation can be improved. This is prevention at its most direct — many modern advances in seat strength, fire-blocking cabin materials, and floor-path lighting came straight from survivability findings.

### Putting It Together: The Probable Cause

All of these threads — wreckage, recorders, metallurgy, fire, human factors, pathology — feed a single output. After months or years of analysis, the NTSB issues a final report stating the **probable cause**: the most likely explanation supported by the evidence, along with **contributing factors** and, most importantly, **safety recommendations**. The careful language is deliberate. Investigators write "probable cause," not "proven cause," because they are reasoning from evidence to the best explanation, in the same disciplined, hedged language you have seen throughout this book.

The following workflow shows how the investigation moves from notification to that final report. Each stage is clickable to reveal a short description of what happens there.

#### Diagram: NTSB Investigation Workflow (Clickable)

<iframe src="../../sims/ntsb-investigation-workflow/main.html" width="100%" height="602px" scrolling="no"></iframe>

<details markdown="1">
<summary>NTSB Investigation Workflow (Clickable)</summary>
Type: workflow
**sim-id:** ntsb-investigation-workflow<br/>
**Library:** Mermaid<br/>
**Status:** Specified

Learning Objective: Describe the sequence of an aircraft accident investigation from notification to probable-cause determination (Bloom Level 2 — Understand; verb: describe).

Bloom Level: Understand (L2)
Bloom Verb: Describe

Diagram type: Mermaid flowchart (top-to-bottom). EVERY node MUST have a `click` directive that opens an infobox/tooltip with a one- to two-sentence definition, so the diagram is interactive rather than a static image.

Nodes and the infobox text each click reveals:
- "Notification & Classification" → The event is reported and classified as an accident or incident under ICAO Annex 13, triggering the response.
- "Go-Team Launch (IIC)" → The NTSB deploys specialist groups led by an Investigator-in-Charge within hours.
- "On-Scene Documentation" → The debris field is photographed, mapped, and surveyed before anything is moved.
- "Recorder Recovery (FDR/CVR)" → The flight data and cockpit voice recorders are located (via the underwater locator beacon if submerged) and read out.
- "Wreckage Reconstruction" → Pieces are reassembled to reveal the origin and sequence of failure.
- "Laboratory Analysis" → Metallurgy, fire/explosive chemistry, systems, and pathology examine the evidence.
- "Human Factors & Survivability" → Crew performance, injuries, and survivability are evaluated.
- "Analysis & Correlation" → All evidence streams are correlated; hypotheses are tested against the data.
- "Probable Cause & Safety Recommendations" → The final report states the probable cause, contributing factors, and recommendations to prevent recurrence.

Edges connect the nodes in the order listed (Notification → ... → Probable Cause), with a feedback arrow from "Analysis & Correlation" back to "Laboratory Analysis" to show that analysis can send investigators back for more testing.

Color scheme: deep-purple node borders with amber highlight on hover, consistent with the textbook theme. Each node's infobox uses the glossary definition style.

Implementation: Mermaid flowchart with `click` callbacks bound to a small JS handler that displays the infobox text; the diagram must be responsive to container width.
</details>

To anchor these concepts in real investigations, the timeline below collects landmark crashes whose findings reshaped aviation safety. Click any milestone to read what the investigation found and which forensic technique it advanced.

#### Diagram: Landmark Crash Investigations Timeline

<iframe src="../../sims/aviation-crash-investigation-timeline/main.html" width="100%" height="660px" scrolling="no"></iframe>

<details markdown="1">
<summary>Landmark Crash Investigations Timeline</summary>
Type: timeline
**sim-id:** aviation-crash-investigation-timeline<br/>
**Library:** vis-timeline<br/>
**Status:** Specified

Learning Objective: Recall landmark aircraft accident investigations and the forensic advances each produced (Bloom Level 1 — Remember; verb: identify).

Bloom Level: Remember (L1)
Bloom Verb: Identify

Interactive behavior: Each milestone is clickable; clicking opens a detail panel below the timeline with the investigation's key finding and the forensic technique it advanced. Hovering shows a one-line summary. Provide era filter buttons and zoom/pan controls.

Milestones (year — title — key forensic lesson):
- 1954 — de Havilland Comet breakups → Metal fatigue from square window corners; led to rounded windows and the science of airframe fatigue testing.
- 1977 — Tenerife runway collision → Human factors and cockpit communication; catalyzed Crew Resource Management (CRM).
- 1988 — Aloha Airlines 243 → Fatigue plus corrosion in an aging fuselage; reshaped aging-aircraft inspection programs.
- 1988 — Pan Am 103 (Lockerbie) → Outward metal petalling and explosive residue from wreckage reconstruction identified an in-flight bomb.
- 1989 — United 232 (Sioux City) → Fan-disk fatigue fracture; advanced engine metallurgy and redundant hydraulic design.
- 1996 — TWA 800 → Large-scale seabed recovery and hangar reconstruction supported a center-fuel-tank explosion; led to fuel-tank inerting rules.
- 2009 — Air France 447 → Deep-ocean recorder recovery (after beacon batteries died) drove the 90-day underwater locator beacon standard.
- 2009 — Colgan Air 3407 → Crew fatigue and training; led to U.S. pilot rest and qualification rule changes.

Responsive design: timeline must resize to the container width.
Color scheme: era bands consistent with the textbook theme (deep purple / amber accents).
</details>

---

## Key Concepts Review

The following table summarizes the major concepts from this chapter.

| Concept | Definition |
|---|---|
| Aircraft Accident Investigation | Systematic, science-based reconstruction of an aviation accident to find its cause and prevent recurrence |
| Accident vs. Incident | An accident involves death, serious injury, or substantial damage; an incident does not, but is still studied |
| ICAO Annex 13 | International standard for accident investigation; its sole objective is prevention, not blame |
| NTSB | Independent U.S. agency that determines probable cause and issues safety recommendations (no enforcement power) |
| Go-Team / IIC | Rapid-response specialist groups led by an Investigator-in-Charge |
| Party System | Manufacturers, operators, and unions assist under NTSB control; lawyers and insurers excluded |
| Debris Field | Distribution of wreckage; concentrated = intact impact, elongated/sorted = in-flight breakup |
| Wreckage Reconstruction | Physical reassembly of pieces to reveal the origin and sequence of failure |
| FDR / CVR | Flight data recorder (what the aircraft did) and cockpit voice recorder (what the crew knew) |
| Crash-Survivable Memory Unit | Armored module protecting the stored record against impact (~3,400 g), fire (~1,100 °C), and immersion |
| Underwater Locator Beacon | "Pinger" that activates in water (~37.5 kHz) so submerged recorders can be found |
| Radar / ADS-B | External flight-path reconstruction from ground radar and broadcast GPS positions |
| Fatigue vs. Overload Fracture | Fatigue grows over many cycles (beach marks, striations); overload breaks in one event |
| In-Flight Fire / Explosion Patterns | Soot streaming and outward metal petalling distinguish airborne events from ground fires |
| Human Factors Analysis | Study of crew fatigue, training, workload, and the chain of errors behind most accidents |
| Aviation Pathology & Survivability | Victim identification and injury analysis; assessment of whether the crash was survivable |
| Probable Cause | The best evidence-supported explanation, with contributing factors and safety recommendations |

---

??? question "Challenge: Read the Evidence"
    Searchers locate aircraft wreckage spread in a **long, narrow band about 12 km long**. The lightest interior materials are found near one end of the band, while the engines and landing gear are found roughly 11 km farther along the flight path. In the laboratory, a fractured wing-spar section shows a smooth region covered with curved **beach marks** and, under the electron microscope, fine **striations**, with the crack originating at a corroded rivet hole.

    **(a)** Does the debris field suggest an intact ground impact or an in-flight breakup, and why? **(b)** What does the fracture surface tell you about how the spar failed? **(c)** Which agency would lead this investigation if no evidence of a deliberate act is found, and what is the ultimate purpose of its work?

    **Answer:**
    **(a)** An **in-flight breakup**. A concentrated debris field indicates an intact impact; this field is long (12 km) and **density-sorted** — light materials fell short and dropped near the breakup point, while dense engines and landing gear carried their momentum far down-track. That sorting only happens when the aircraft comes apart at altitude.

    **(b)** The spar failed by **fatigue**, not sudden overload. Beach marks (visible bands marking pauses in crack growth) and microscopic striations (one ridge per stress cycle) are the signatures of a crack that grew slowly over many flights. The origin at a **corroded rivet hole** is a classic fatigue initiation site — a stress concentration where cracking begins, exactly as in the Comet and Aloha 243 cases.

    **(c)** With no sign of a deliberate act, the **NTSB** (under ICAO Annex 13) leads the investigation. Its purpose is **prevention** — to determine the probable cause and issue safety recommendations so the failure is not repeated — *not* to assign blame or liability.

---

!!! mascot-celebration "Case Closed — and So Is the Book!"
    ![Trace raising magnifying glass in celebration](../../img/mascot/celebration.png){ class="mascot-admonition-img"}
    Look how far you've come, investigators. You started with fingerprints and a single drop of blood, and you're finishing by reconstructing an entire aircraft from a scattered field of wreckage and a charred orange box. Aviation crash forensics is the capstone of everything in this book — trace, fire, explosives, pathology, toxicology, and digital evidence all working together toward one goal that every forensic scientist shares: getting the truth right so that justice, and safety, can follow. You've learned to let the evidence speak, to hedge your conclusions honestly, and to follow every clue to its source. Now go find the ones nobody else thought to look for. Follow the evidence!

[See Annotated References](./references.md)
