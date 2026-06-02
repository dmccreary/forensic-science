# MicroSim Generation Log — cdr-tower-triangulation

- **Date:** 2026-06-01
- **Library:** p5.js
- **Chapter:** 17 — Cell Phone Analytics and Mobile Forensics
- **Final score:** 98 / A (validate-sims.py; −2 is the expected deduction for required p5 DOM controls)
- **Iframe height:** 517px (CANVAS_HEIGHT 515 + 2)

## Instructional Design Check
- **Bloom level:** Apply (L3)
- **Bloom verb:** Use
- **Pattern:** Map + table + timeline. Left half is a coverage map with six labeled towers, semi-transparent coverage circles, a dashed orange device path, and an animated device icon. Right half is a CDR table (time, call type, duration, tower ID) whose rows are clickable to highlight a tower. A bottom timeline bar shows the seven contacts with a moving playhead. A trilateration overlay draws three range circles converging on a green estimated location with an uncertainty radius and a ranges-in-metres math box.
- **Specification alignment:** Aligned (with one documented substitution). Play Timeline, Show/Hide Triangulation, and a playback-speed slider are present; clicking a CDR row highlights its tower; coverage radius varies by tower type (macro vs. micro); the trilateration overlay shows three circles, their intersection, the estimate, and an uncertainty radius. The spec's "export a formatted text timeline" is represented on-canvas by the chronological timeline bar rather than a browser file download.
- **Rationale:** The Apply objective (use CDR to reconstruct geographic movement) requires hands-on work placing simulated tower contacts in geographic and temporal context — delivered by the map animation plus the interactive trilateration.

## Standardization (microsim-utils)
- main.html rewritten from the placeholder scaffold to the standard p5.js shell (CDN p5@1.11.10, schema meta tag, `<main></main>`, "Back to Documentation" link).
- index.md rewritten with full frontmatter (quality_score 98, social image fields) and all standard sections, including a worked example, guided questions, References, and a design note covering the sample data and the timeline-bar substitution for export.
- metadata.json fixed from the stub (creator "Dementia Education Project", subject ["dementia"], completion_status "scaffold"): corrected to "Forensic Science Intelligent Textbook" + mobile-forensics subjects; added educational + pedagogical blocks; completion_status → implemented.

## Layout Review (microsim-layout-reviewer)
- Default load (timeline at start, device at A-117): PASS — title centered; six towers with coverage circles, dashed device path, CDR table with seven rows, and the timeline bar with seven ticks all render legibly; three controls visible.
- Triangulation state verified by temporarily setting `showTri = true`: three dashed range circles from B-204, C-073, D-339 converge on the green estimate; lines from each tower to the estimate; uncertainty circle with "est. location ±250 m"; math box lists ranges (≈1132 m, ≈1130 m, ≈836 m); non-selected towers dimmed. State reverted and canonical screenshot recaptured.
- Checklist 1.x/2.x/3.x/4.x/6.x PASS. 5.x N/A (map + table, not an axis chart).

## Status: COMPLETE
