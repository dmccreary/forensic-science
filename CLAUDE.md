# CLAUDE.md — Forensic Science Intelligent Textbook

Project-specific instructions for Claude Code working in this repository.

## Learning Mascot: Trace the Raccoon

### Mascot File Index

The canonical files for this mascot. When editing any of these, update the
others in the same turn so they stay in sync.

| File | Purpose |
|------|---------|
| [`docs/img/mascot/character-sheet.md`](docs/img/mascot/character-sheet.md) | Canonical identity document (name, species, colors, voice). Source of truth. |
| [`docs/img/mascot/image-prompts.md`](docs/img/mascot/image-prompts.md) | Self-contained AI prompts for regenerating each pose. |
| [`docs/img/mascot/neutral.png`](docs/img/mascot/neutral.png) | Default / general-purpose pose. |
| [`docs/img/mascot/welcome.png`](docs/img/mascot/welcome.png) | Chapter-opening pose. |
| [`docs/img/mascot/thinking.png`](docs/img/mascot/thinking.png) | Key-concept pose. |
| [`docs/img/mascot/tip.png`](docs/img/mascot/tip.png) | Hint / helpful-guidance pose. |
| [`docs/img/mascot/warning.png`](docs/img/mascot/warning.png) | Common-mistake / pitfall pose. |
| [`docs/img/mascot/encouraging.png`](docs/img/mascot/encouraging.png) | Difficult-content / struggle pose. |
| [`docs/img/mascot/celebration.png`](docs/img/mascot/celebration.png) | End-of-chapter / achievement pose. |
| [`docs/css/mascot.css`](docs/css/mascot.css) | Custom admonition styles for the seven pose contexts. |
| [`docs/learning-graph/mascot-test.md`](docs/learning-graph/mascot-test.md) | Rendering test page that exercises every admonition style. |

### Character Overview

- **Name**: Trace
- **Species**: Raccoon
- **Personality**: Curious, analytical, encouraging, precise
- **Catchphrase**: "Follow the evidence!"
- **Visual**: Medium-gray raccoon with black eye-mask and white facial
  accents, white forensic lab coat with deep purple badge, amber-tinted
  round spectacles; magnifying glass in tip/thinking poses

### Voice Characteristics

- Uses simple, accessible language appropriate for high school students
- Relates abstract concepts to real investigation scenarios
- Refers to students as "investigators"
- Uses forensic vocabulary naturally, always defining it the first time
- Signature phrases: "Follow the evidence!", "What does the data tell us?",
  "Every clue matters."

### Mascot Admonition Format

Always place mascot images in the admonition body, never in the title bar.
Adjust the `../../` prefix to match the depth of the page being edited:

    !!! mascot-welcome "Welcome, Investigators!"
        <img src="../../img/mascot/welcome.png" class="mascot-admonition-img" alt="Trace waving welcome">
        Admonition text goes here after the img tag.

For chapter pages at `chapters/NN-slug/index.md` the rendered URL is
`chapters/NN-slug/`, so the image path is `../../img/mascot/POSE.png`.

### Placement Rules

| Context | Admonition Type | Frequency |
|---------|----------------|-----------|
| General note / sidebar | mascot-neutral | As needed |
| Chapter opening | mascot-welcome | Every chapter (once) |
| Key concept | mascot-thinking | 1–2 per chapter |
| Helpful tip | mascot-tip | As needed |
| Common mistake | mascot-warning | As needed |
| Difficult content | mascot-encourage | Where students may struggle |
| Chapter completion | mascot-celebration | End of chapter (once) |

**Hard limits:** No more than 5–6 mascot admonitions per chapter.
Never place two mascot admonitions back-to-back.

### Do's and Don'ts

**Do:**
- Use Trace to introduce new topics warmly at the chapter opening
- Include the catchphrase ("Follow the evidence!") in welcome admonitions
- Keep dialogue brief — 1–3 sentences per admonition
- Match the pose image to the content type (tip pose for tips, etc.)
- Model careful forensic language: "the evidence suggests…" not "this proves…"

**Don't:**
- Use Trace more than 5–6 times per chapter
- Place mascot admonitions back-to-back
- Use the mascot for purely decorative purposes with no instructional value
- Change Trace's personality or speech patterns
- Use gendered pronouns — always refer to Trace by name or "they/them"
