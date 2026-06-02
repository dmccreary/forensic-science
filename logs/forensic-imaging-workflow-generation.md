# MicroSim Generation Log — forensic-imaging-workflow

- **Date:** 2026-06-02
- **Library:** p5.js
- **Chapter:** 15 — Digital Forensics and Cybercrime Investigation
- **Final score:** 98 / A (validate-sims.py; −2 is the expected deduction for required p5 DOM controls)
- **Iframe height:** 502px (CANVAS_HEIGHT 500 + 2)

## Instructional Design Check
- **Bloom level:** Understand (L2)
- **Bloom verb:** Explain
- **Pattern:** Manipulate + observe. A horizontal five-station workflow (Original Drive → Write-Blocker → Forensic Workstation → Forensic Image → Hash Verification) with animated blue data-flow dots and a red "no write-back to original" indicator under the write-blocker. Clicking a station opens a detail panel (purpose + procedure). A hash-comparison panel shows the original vs. image hashes side by side in monospace; the Simulate Tamper control recomputes the image hash so the result flips between green MATCH and red MISMATCH.
- **Specification alignment:** Aligned. Five labeled stations with click-to-reveal details; animated data flow; write-blocker blocking reverse flow; hash computation/recompute animation; side-by-side MD5/SHA-256 comparison with MATCH/MISMATCH; Simulate Tamper changing the image so the hash differs entirely; MD5/SHA-256 toggle; correct hash formats (32 / 64 hex). Color scheme (blue data flow, gray hardware, green match, red mismatch) matches.
- **Rationale:** An Understand objective (explain the workflow and hash verification) is served by a step-by-step diagram plus a tamper simulation that makes the value of hashing concrete.

## Standardization (microsim-utils)
- main.html rewritten from the placeholder scaffold to the standard p5.js shell (CDN p5@1.11.10, project schema meta tag, `<main></main>`, "Back to Documentation" link).
- index.md rewritten with full frontmatter (quality_score 98, social image fields) and all standard sections, including a worked example, guided questions, References, and a design note clarifying the hashes are precomputed examples.
- metadata.json fixed from the stub: creator "Forensic Science Intelligent Textbook", digital-forensics subjects, educational + pedagogical blocks, completion_status → implemented.

## Layout Review (microsim-layout-reviewer)
- Default load (untampered, Hash Verification selected, SHA-256): PASS — five stations with animated data dots and the write-blocker reverse-flow symbol; detail panel populated; both SHA-256 hashes identical (wrapped 32 chars/line); green MATCH banner; both controls visible.
- Tamper state verified by temporarily setting `tampered = true`: the Forensic Image hash renders in red and is completely different from the original; red MISMATCH banner and the avalanche-effect note display. State reverted and canonical screenshot recaptured.
- Checklist 1.x/2.x/3.x/4.x/6.x PASS. 5.x N/A (workflow + hash panel, not an axis chart).

## Status: COMPLETE
