# Content Generation Guide — Forensic Science Intelligent Textbook

*The complete playbook for writing any content in the textbook.
This includes the writing style, and placing helpful mascot admonitions, and
keeping this textbook fun, accurate, and student-friendly.*

---

## Audience

The target audience high school students (grades 9–12) with a background in algebra-1, introductory biology and chemistry.

## Tone & Voice

This textbook is for high school students who are part curious scientist, part
crime-show fan. Write like a knowledgeable teacher who actually enjoys their
subject — clear, precise, and occasionally witty. The goal is students who
finish a chapter thinking "that was actually interesting," not "I survived."

- Use **accessible language** first; introduce technical terms with a plain
  English definition right alongside them (not tucked in a footnote three
  pages later).
- Favor **active voice** and short sentences when explaining a process.
  ("The analyst swabs the surface" beats "The surface is swabbed by the analyst.")
- **Real examples beat hypotheticals.** "The 1984 Colin Pitchfork case was the
  first criminal conviction using DNA evidence" is more memorable than
  "imagine a crime scene where DNA was collected."
- Don't be afraid of a light joke — forensic science has plenty of dark humor
  baked in already. Just keep it tasteful for a school setting.

---

## Chapter Structure

Each chapter follows this skeleton:

1. **Opening mascot welcome** — Trace greets investigators and previews the chapter.
2. **Learning objectives** — 3–5 bullets, action-verb driven (Bloom's Taxonomy).
3. **Body sections** — concept by concept, with diagrams/MicroSims woven in.
4. **Key concept callouts** — use `mascot-thinking` for the 1–2 most important ideas.
5. **Tips and warnings** — sprinkle `mascot-tip` and `mascot-warning` where helpful.
6. **Closing mascot celebration** — Trace cheers students on at the end.

Chapters should target about 4,500 words for a typical 16-concept chapter.  Longer chapters with more concepts to cover may require more detailed content.

Place MiroSim #### Diagram specifications whenever there are complex concepts in a chapter.
These can be used to help students visualize complex concepts.
---

## Meet Trace — Your Forensic Raccoon Guide

Trace is the learning mascot for this course. Traces is clever, thoughtful, playful, fun,
precise, and witty. Trace somehow always find a fingerprint where nobody else thought to look.

### Character Overview

| Attribute | Detail |
|-----------|--------|
| **Name** | Trace |
| **Species** | Raccoon (obviously — they *love* investigating things) |
| **Personality** | Clever, curious, analytical, encouraging, precise |
| **Catchphrase** | "Follow the evidence!" |
| **Visual** | Medium-gray raccoon, black eye-mask, white facial accents, white forensic lab coat with a deep purple badge, amber-tinted round spectacles, magnifying glass in tip/thinking poses |
| **Pronouns** | They/them — never use he/she for Trace |

### Voice Characteristics

Trace speaks directly to students as **"investigators"** (never "students" or
"kids"). When Trace talks, it sounds like a mentor who has *been there*:

- Simple language first, forensic vocabulary second.
- Relates every abstract concept to a real investigation scenario.
- Signature phrases: **"Follow the evidence!"**, **"What does the data tell
  us?"**, **"Every clue matters."**
- Tone is warm but never condescending — these are capable investigators, after
  all.

> **Quick vibe check:** If Trace's dialogue sounds like a textbook wrote it,
> rewrite it. If it sounds like a raccoon in a lab coat who genuinely enjoys
> their job, you're good.

---

## Mascot File Index

The canonical files for Trace. When editing *any* of these, update the others
in the same turn so they stay in sync.

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

---

## Mascot Admonition Format

Always place mascot images **in the admonition body**, never in the title bar.
Adjust the `../../` prefix to match the depth of the page being edited.
Use the markdown image with attributes.

```markdown
!!! mascot-welcome "Welcome, Investigators!"
    ![Trace waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img"}
    Admonition text goes here after the img tag.
```

For chapter pages at `chapters/NN-slug/index.md` the rendered URL is
`chapters/NN-slug/`, so the image path is `../../img/mascot/POSE.png`.

### Placement Rules

Match the pose to the moment — Trace notices when you get this wrong (they're
a detective, after all).

| Context | Admonition Type | Frequency |
|---------|----------------|-----------|
| General note / sidebar | `mascot-neutral` | As needed |
| Chapter opening | `mascot-welcome` | Every chapter — exactly once |
| Key concept | `mascot-thinking` | 1–2 per chapter |
| Helpful tip | `mascot-tip` | As needed |
| Common mistake | `mascot-warning` | As needed |
| Difficult content | `mascot-encourage` | Where students may struggle |
| Chapter completion | `mascot-celebration` | End of chapter — exactly once |

**Hard limits:**
- No more than **5–6 mascot admonitions** per chapter. Trace is helpful, not
  clingy.
- **Never place two mascot admonitions back-to-back.** Give the content room to
  breathe between appearances.

### Do's and Don'ts

**Do:**
- Open every chapter with Trace's welcome (include the catchphrase!).
- Keep Trace's dialogue brief — **1–3 sentences** per admonition. Trace is
  pithy.
- Match the pose image to the content type (tip pose for tips, warning pose for
  warnings — this isn't a trick question).
- Model careful forensic language: **"the evidence suggests…"** not **"this
  proves…"** — even Trace knows not to overstate conclusions.

**Don't:**
- Use Trace more than 5–6 times per chapter (they have other cases to solve).
- Place mascot admonitions back-to-back.
- Deploy Trace for purely decorative purposes — every appearance should
  deliver actual instructional value.
- Alter Trace's personality or speech patterns — consistency builds trust with
  students who see Trace chapter after chapter.
- Use gendered pronouns — always refer to Trace by name or **"they/them."**

---

## Content Accuracy Rules

Forensic science is a field where inaccuracy has real-world consequences. Hold
the content to a high standard:

- Distinguish clearly between **forensic science** (the application of
  science to legal questions) and **investigative procedure** (police work).
  They overlap but are not the same.
- Never overstate the reliability of forensic techniques. Fingerprint and hair
  analysis, for example, have documented error rates — acknowledge them.
- When a technique has been challenged or reformed post-2009 NAS report or
  2016 PCAST report, say so. Students deserve the current scientific consensus,
  not TV mythology.
- Use **metric units** throughout (the international forensic community does).
  Add imperial in parentheses only when the audience clearly needs it.

---

## Diagrams & MicroSims

- Every major process should have a **flowchart or diagram**. A picture of the
  chain of custody workflow is worth a thousand words of bullet points.
- MicroSims live in `docs/sims/`. When referencing one in a chapter, use an
  iframe embed — see existing chapters for the pattern.
- Prefer **labeled diagrams** over decorative photos. The magnifying-glass
  callout style in the CSS is your friend.

---

## Common Mistakes to Avoid (Meta-Level)

These are mistakes in the *content itself*, not just formatting:

| Mistake | Fix |
|---------|-----|
| Saying DNA "proves" guilt | "DNA evidence is consistent with / implicates" |
| Treating every forensic technique as infallible | Note error rates and human factors |
| Ignoring chain of custody | It's the backbone of forensic admissibility — mention it |
| Over-glamorizing the field (CSI effect) | Acknowledge the gap between TV and reality |
| Gender/race bias in examples | Rotate demographic details in hypothetical scenarios |
