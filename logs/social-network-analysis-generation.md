# MicroSim Generation Log — social-network-analysis

- **Date:** 2026-06-02
- **Library:** p5.js
- **Chapter:** 18 — Social Media Analysis and Open-Source Intelligence
- **Final score:** 98 / A (validate-sims.py; −2 is the expected deduction for required p5 DOM controls)
- **Iframe height:** 602px (CANVAS_HEIGHT 600 + 2)

## Instructional Design Check
- **Bloom level:** Analyze (L4)
- **Bloom verb:** Analyze
- **Pattern:** Interactive force-directed graph with metric-driven encodings, filtering, community detection, and shortest-path tracing. The student manipulates the graph (chooses what color/size mean, filters, selects, runs clustering) to discover structure rather than reading it.
- **Specification alignment:** Aligned (spec type: microsim). 16 simulated accounts / 24 weighted edges; node color/size driven by selectable centrality (degree, betweenness, clustering coefficient) or role; min-connections slider; click-to-select detail panel (degree, betweenness, clustering, connections); "Highlight clusters" community detection; "Shortest path" two-click mode; summary panel shows cluster count and top-3 brokers by betweenness. Dark background, blue edges, white labels, orange path highlight — matches the spec color scheme.
- **Rationale:** An Analyze objective (identify hubs, brokers, clusters) is served by active manipulation — selecting metrics, filtering, and probing nodes — exactly as the spec argues.

## Standardization (microsim-utils)
- main.html rewritten from the placeholder scaffold to the standard p5.js shell (CDN p5@1.11.10, project schema meta tag `…/ns/microsim/v1`, `<main></main>`, "Back to Documentation" link, script src `social-network-analysis.js`).
- index.md rewritten with full frontmatter (status built, quality_score 98, social image fields), copy-paste iframe at height 602, About / How to Use / What You Can Learn / Lesson Plan (worked example, guided questions, extension) / References, and a design note clarifying the accounts are fictional and the force-directed layout may differ slightly per load while metrics/clusters/paths are computed live.
- metadata.json fixed from the dementia-stub: creator "Forensic Science Intelligent Textbook", social-media/OSINT/network-analysis subjects, educational + pedagogical blocks, completion_status → implemented.

## Algorithms
- **Degree centrality:** neighbor count.
- **Betweenness:** Brandes algorithm (unweighted BFS), normalized by (N-1)(N-2)/2; top brokers came out O. Khan (0.548), S. Marino, H. Vogel — the bridge accounts, as designed.
- **Clustering coefficient:** standard 2·links-among-neighbors / k(k-1).
- **Community detection:** Girvan-Newman — repeatedly remove the highest edge-betweenness edge until the graph splits into 3 components. (An earlier synchronous label-propagation attempt collapsed the connected graph to a single cluster; Girvan-Newman reliably recovers the 3 designed communities.)
- **Shortest path:** BFS between the two picked nodes, respecting the min-connections filter.

## Layout Review (microsim-layout-reviewer)
- Default load (Color by Role, Size by Degree, no filter): PASS — force-settled graph (400 FR iterations run in setup so the first frame is settled), suspect accounts red / associates orange / peripheral gray, edge thickness by message frequency; right panel shows Accounts 16 / Links 24, Clusters detected 3, top brokers O. Khan / S. Marino / H. Vogel, and the empty Account Detail prompt.
- Verified states by temporarily forcing `showClusters=true; selected=6; pathNodes=shortestPath(0,15); pathPick=[0,15]` in setup: PASS — three distinctly colored clusters; Account Detail for O. Khan (Role suspect, Degree 4, Betweenness 0.548, Clustering 0.17, connection list); orange shortest path G. Sahni→R. Diaz→H. Vogel→O. Khan→S. Marino→L. Park→M. Reyes spanning all three clusters with orange endpoint rings. Temporary code removed (restored from `/tmp/sna.bak.js`) and canonical screenshot recaptured.
- Controls are real p5 DOM elements: two createSelect dropdowns (Color by / Size by), a createSlider (Minimum connections), and three createButtons (Highlight clusters, Shortest path, Reset); node selection/drag handled via canvas mousePressed/mouseDragged distance hit-testing. Checklist 1.x/2.x/3.x/4.x/6.x PASS. 5.x N/A (network diagram, not an axis chart).

## Status: COMPLETE
