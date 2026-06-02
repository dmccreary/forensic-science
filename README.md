# Forensic Science

[![MkDocs](https://img.shields.io/badge/Made%20with-MkDocs-526CFE?logo=materialformkdocs)](https://www.mkdocs.org/)
[![Material for MkDocs](https://img.shields.io/badge/Material%20for%20MkDocs-526CFE?logo=materialformkdocs)](https://squidfunk.github.io/mkdocs-material/)
[![GitHub Pages](https://img.shields.io/badge/View%20on-GitHub%20Pages-blue?logo=github)](https://dmccreary.github.io/forensic-science/)
[![Claude Code](https://img.shields.io/badge/Built%20with-Claude%20Code-DA7857?logo=anthropic)](https://claude.ai/code)
[![Claude Skills](https://img.shields.io/badge/Uses-Claude%20Skills-DA7857?logo=anthropic)](https://github.com/dmccreary/claude-skills)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Python](https://img.shields.io/badge/Python-3776AB?logo=python&logoColor=white)](https://www.python.org/)
[![License: CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc-sa/4.0/)

## View the Live Site

Visit the interactive textbook at: [https://dmccreary.github.io/forensic-science/](https://dmccreary.github.io/forensic-science/)

## Overview

This is an open-source, AI-assisted intelligent textbook on forensic science designed for high school students in grades 9–12. Built using MkDocs with the Material theme, it integrates a validated learning graph of 278 interconnected concepts, 38 browser-based interactive MicroSims, chapter quizzes, an annotated glossary, and a pedagogical mascot — Trace the Raccoon — who guides students through the material.

The course spans 19 chapters across six thematic modules: forensic infrastructure and legal principles, physical and microscopic trace evidence, biological evidence and biochemistry, chemical and biomolecular analysis, anatomical and ecological analysis, and digital/technological forensics (facial recognition, cell phone analytics, social media OSINT, and aviation crash investigation). Every chapter is organized around the authentic casework methodologies used by practicing forensic scientists, crime scene investigators, and digital forensics specialists.

Concepts are introduced in prerequisite order using a dependency graph, so understanding builds naturally from chapter to chapter. MicroSims let students manipulate evidence models, trace investigation workflows, and discover principles through experimentation rather than memorization. The entire textbook is free — no paywalls, no access codes.

## Site Status and Metrics

| Metric | Count |
|--------|-------|
| Concepts in Learning Graph | 278 |
| Chapters | 19 |
| Interactive MicroSims | 38 |
| Markdown Files | 117 |
| Total Words | ~187,000 |
| Chapter Quizzes | 19 |
| Estimated Quiz Questions | ~190 |
| Images & Mascot Poses | 16 |
| Modules | 6 |

**Completion Status:** Content generation phase — all 19 chapters written, quizzes and annotated references complete for all chapters.

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/dmccreary/forensic-science.git
cd forensic-science
```

### Install Dependencies

This project uses MkDocs with the Material theme:

```bash
pip install mkdocs mkdocs-material
```

### Build and Serve Locally

Serve locally with live reload:

```bash
mkdocs serve
```

Open your browser to `http://localhost:8000/forensic-science/`

Build the static site:

```bash
mkdocs build
```

### Deploy to GitHub Pages

```bash
mkdocs gh-deploy
```

This builds the site and pushes it to the `gh-pages` branch.

### Using the Textbook

**Navigation:** Use the left sidebar to browse chapters. Each chapter links to its quiz and annotated references.

**MicroSims:** Found in the "MicroSims" section. Each simulation runs standalone in your browser — adjust parameters with sliders and controls, no installation required.

**Learning Graph:** The [Learning Graph Viewer](https://dmccreary.github.io/forensic-science/sims/graph-viewer/) visualizes all 278 concept dependencies. Use it to explore prerequisites for any topic or trace how concepts connect across chapters.

**Customization:** Edit markdown files in `docs/` to modify content. Customize the theme palette in `mkdocs.yml` and add styles in `docs/css/extra.css`.

## Repository Structure

```
forensic-science/
├── docs/
│   ├── chapters/                  # 19 chapter directories
│   │   ├── 01-intro-forensic-science/
│   │   │   ├── index.md           # Chapter content
│   │   │   ├── quiz.md            # Chapter quiz (~10 questions)
│   │   │   └── references.md      # Annotated references
│   │   └── 02-crime-scene-investigation/
│   ├── sims/                      # 38 interactive MicroSims
│   │   ├── graph-viewer/          # Learning graph vis-network viewer
│   │   ├── fingerprint-pattern-explorer/
│   │   ├── pcr-amplification-simulator/
│   │   └── ...                    # (35 more)
│   ├── learning-graph/            # Learning graph data and analysis
│   │   ├── learning-graph.csv     # Concept dependency table (278 rows)
│   │   ├── learning-graph.json    # vis-network format for graph viewer
│   │   └── quality-metrics.md     # Quality analysis report
│   ├── img/
│   │   └── mascot/                # Trace the Raccoon pose set (7 poses)
│   ├── css/
│   │   ├── extra.css              # Custom theme overrides
│   │   └── mascot.css             # Mascot admonition styles
│   ├── glossary.md                # Key term definitions
│   ├── faq.md                     # Frequently asked questions
│   └── index.md                   # Home page
├── plugins/
│   └── social_override.py         # MkDocs hook for og:* meta tags
├── scripts/                       # Analysis and utility scripts
├── mkdocs.yml                     # MkDocs configuration
└── README.md                      # This file
```

## Reporting Issues

Found a bug, typo, or have a suggestion for improvement? Please report it on the [GitHub Issues](https://github.com/dmccreary/forensic-science/issues) page.

When reporting, please include:

- Description of the problem or suggestion
- Steps to reproduce (for bugs)
- Expected vs. actual behavior
- Screenshots if applicable
- Browser details for MicroSim issues

## License

This work is licensed under the [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License](https://creativecommons.org/licenses/by-nc-sa/4.0/).

**You are free to:**

- Share — copy and redistribute the material
- Adapt — remix, transform, and build upon the material

**Under the following terms:**

- **Attribution** — Give appropriate credit with a link to the original
- **NonCommercial** — No commercial use without permission
- **ShareAlike** — Distribute contributions under the same license

See [license.md](docs/license.md) for full details.

## Acknowledgements

This project is built on the shoulders of giants in the open source community:

- **[MkDocs](https://www.mkdocs.org/)** — Static site generator optimized for project documentation
- **[Material for MkDocs](https://squidfunk.github.io/mkdocs-material/)** — Beautiful, responsive theme
- **[vis-network](https://visjs.org/)** — Network visualization library powering the learning graph viewer
- **[p5.js](https://p5js.org/)** — Creative coding library from NYU ITP, used in interactive MicroSims
- **[Python](https://www.python.org/)** community — Data processing and analysis tools
- **[Claude AI](https://claude.ai)** by Anthropic — AI-assisted content generation
- **[GitHub Pages](https://pages.github.com/)** — Free hosting for open source projects

Special thanks to the forensic science educators and practitioners whose published casework methodologies informed the course structure.

## Contact

**Dan McCreary**

- LinkedIn: [linkedin.com/in/danmccreary](https://www.linkedin.com/in/danmccreary/)
- GitHub: [@dmccreary](https://github.com/dmccreary)

Questions, suggestions, or collaboration opportunities? Connect on LinkedIn or open an issue on GitHub.
