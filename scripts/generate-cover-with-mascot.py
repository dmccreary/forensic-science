#!/usr/bin/env python3
"""
generate-cover-with-mascot.py

Generates a 1200x630 book cover for Forensic Science with:
  - Left 20% (240 px): Trace the Raccoon in welcome pose (welcome.png composited)
  - Right 80% (960 px): AI-generated forensic science montage with title

Usage (from project root):
  python scripts/generate-cover-with-mascot.py

Requirements:
  pip install openai pillow
  export OPENAI_API_KEY=...
"""

from __future__ import annotations

import base64
import io
import sys
import urllib.request
from pathlib import Path

from openai import OpenAI
from PIL import Image, ImageChops

# ---------------------------------------------------------------------------
# Paths & constants
# ---------------------------------------------------------------------------

PROJECT_ROOT  = Path(__file__).parent.parent
MASCOT_PATH   = PROJECT_ROOT / "docs/img/mascot/welcome.png"
OUTPUT_PATH   = PROJECT_ROOT / "docs/img/cover.png"

COVER_W, COVER_H = 1200, 630
MASCOT_ZONE_W    = int(COVER_W * 0.20)   # 240 px — left column for mascot

# ---------------------------------------------------------------------------
# Background prompt
# ---------------------------------------------------------------------------

BACKGROUND_PROMPT = """\
Professional wide-landscape book cover for the high-school / college textbook \
"Forensic Science". Size: 1200×630 pixels.

LAYOUT (follow exactly):
• LEFT 20% (x = 0–240 px): a smooth deep-navy-to-dark-slate vertical gradient — \
clean, plain, no imagery. This column is reserved for a mascot character \
that will be composited later; keep it uncluttered and dark.
• RIGHT 80% (x = 240–1200 px): a rich, dramatic forensic science montage — \
fingerprint ridge close-ups, glowing cyan DNA double helix strands, a \
magnifying glass over numbered evidence tags, circular bloodstain drops, \
a forensic microscope, molecular diagrams, a yellow "CRIME SCENE — DO NOT \
CROSS" tape border, digital analysis grid overlays, and a subtle gavel icon.

TYPOGRAPHY:
• Title "Forensic Science" — large, bold, crisp white sans-serif, centered \
horizontally in the right 80% panel, positioned in the upper-center third.
• Subtitle "An Intelligent Textbook" — smaller, amber/gold italic, directly \
below the title.

PALETTE: deep navy #0D1B2A, forensic purple #4B2E83, amber/gold #F5A623, \
white text, cyan glow accents. Cinematic, high-contrast, modern educational art.

No additional text, logos, watermarks, or trademarks.\
"""

# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------


def _crop_to_cover(img: Image.Image) -> Image.Image:
    """Center-crop to 1.91:1 then resize to 1200×630."""
    w, h = img.size
    target = COVER_W / COVER_H
    if w / h > target:
        nw = int(h * target)
        img = img.crop(((w - nw) // 2, 0, (w + nw) // 2, h))
    else:
        nh = int(w / target)
        img = img.crop((0, (h - nh) // 2, w, (h + nh) // 2))
    return img.resize((COVER_W, COVER_H), Image.LANCZOS)


# ---------------------------------------------------------------------------
# Step 1: Generate background via OpenAI
# ---------------------------------------------------------------------------


def generate_background(client: OpenAI) -> Image.Image:
    print("Generating background via gpt-image-1 …")
    try:
        resp = client.images.generate(
            model="gpt-image-1",
            prompt=BACKGROUND_PROMPT,
            size="1536x1024",
            quality="high",
            output_format="png",
            n=1,
        )
        png_bytes = base64.b64decode(resp.data[0].b64_json)
    except Exception as exc:
        print(f"  gpt-image-1 unavailable ({exc}); falling back to dall-e-3 …")
        resp = client.images.generate(
            model="dall-e-3",
            prompt=BACKGROUND_PROMPT,
            size="1792x1024",
            quality="hd",
            n=1,
        )
        with urllib.request.urlopen(resp.data[0].url) as r:
            png_bytes = r.read()

    img = Image.open(io.BytesIO(png_bytes)).convert("RGBA")
    print(f"  Raw size: {img.size}")
    return _crop_to_cover(img)


# ---------------------------------------------------------------------------
# Step 2: Composite welcome.png onto left 20%
# ---------------------------------------------------------------------------


def composite_mascot(bg: Image.Image) -> Image.Image:
    """
    Scale welcome.png to fill the cover height (630 px) and composite it on
    the left side with a soft right-edge fade that completes at the 20% mark.

    welcome.png is 803×960 RGBA.  At cover height → ≈527×630 px.
    The gradient keeps the mascot fully opaque in [0, 240] and fades to
    transparent in [240, 320], so it visually "lives" in the left 20%.
    """
    mascot = Image.open(MASCOT_PATH).convert("RGBA")
    m_w, m_h = mascot.size

    # Scale so height == COVER_H, maintaining aspect ratio
    scale    = COVER_H / m_h
    new_m_w  = int(m_w * scale)            # ≈ 527 px
    mascot_s = mascot.resize((new_m_w, COVER_H), Image.LANCZOS)

    # Horizontal gradient mask
    #   x ∈ [0, fade_start]        → 255 (fully opaque)
    #   x ∈ [fade_start, fade_end] → linear 255 → 0
    #   x ∈ [fade_end, new_m_w]    → 0   (transparent)
    fade_start = MASCOT_ZONE_W          # 240 px
    fade_end   = MASCOT_ZONE_W + 80     # 320 px

    gradient = Image.new("L", (new_m_w, COVER_H))
    pix = gradient.load()
    for x in range(new_m_w):
        if x <= fade_start:
            v = 255
        elif x < fade_end:
            v = int(255 * (1.0 - (x - fade_start) / (fade_end - fade_start)))
        else:
            v = 0
        for y in range(COVER_H):
            pix[x, y] = v

    # Multiply the mascot's own alpha by the gradient mask
    r, g, b, a = mascot_s.split()
    final_a     = ImageChops.multiply(a, gradient)
    mascot_fade = Image.merge("RGBA", (r, g, b, final_a))

    # Paste onto background
    result = bg.copy()
    result.paste(mascot_fade, (0, 0), mascot_fade)
    return result.convert("RGB")


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------


def main() -> None:
    if not MASCOT_PATH.exists():
        print(f"ERROR: mascot not found at {MASCOT_PATH}", file=sys.stderr)
        sys.exit(1)

    client = OpenAI()           # reads OPENAI_API_KEY from environment

    print("=== Cover Image Generator (mascot layout) ===")
    bg    = generate_background(client)
    print("Compositing mascot onto left 20% …")
    final = composite_mascot(bg)
    final.save(str(OUTPUT_PATH), format="PNG")
    print(f"Done → {OUTPUT_PATH}  ({COVER_W}×{COVER_H} px)")


if __name__ == "__main__":
    main()
