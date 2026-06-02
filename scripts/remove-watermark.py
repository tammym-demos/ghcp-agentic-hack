"""Remove the 'NotebookLM' watermark from full-bleed slide images.

The watermark sits in the bottom-right of every 1376x768 NotebookLM-exported
slide. This script overwrites the watermark region with a slice of pixels
copied from immediately above it, which preserves any underlying background
color or texture (solid, cream, graph paper, dark navy, etc.).

Usage: py scripts/remove-watermark.py [--dry-run]
"""
from __future__ import annotations

import argparse
import glob
import os
import sys
from PIL import Image

ROOT = os.path.join(os.path.dirname(__file__), "..", "public", "images")

# Slides exported from NotebookLM are 1376x768. Only those carry the watermark.
TARGET_SIZE = (1376, 768)

# Watermark bounding box (generous margin around the glyphs).
WM_LEFT, WM_TOP, WM_RIGHT, WM_BOTTOM = 1224, 735, 1376, 766
WM_W = WM_RIGHT - WM_LEFT
WM_H = WM_BOTTOM - WM_TOP

# Source patch sits directly to the LEFT of the watermark at the same y range.
# Sampling horizontally avoids pulling in content from rows above (e.g.,
# orange callout bars, code-block borders) and keeps the bottom margin
# texture/grid pattern intact.
SRC_LEFT = WM_LEFT - WM_W
SRC_RIGHT = WM_LEFT


def process(path: str, dry_run: bool = False) -> str:
    with Image.open(path) as im:
        if im.size != TARGET_SIZE:
            return "skip-size"
        mode = im.mode
        im = im.convert("RGBA") if mode != "RGBA" else im.copy()
        patch = im.crop((SRC_LEFT, WM_TOP, SRC_RIGHT, WM_BOTTOM))
        im.paste(patch, (WM_LEFT, WM_TOP))
        out = im.convert(mode) if mode != "RGBA" else im
        if dry_run:
            return "would-clean"
        out.save(path, optimize=True)
        return "cleaned"


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--dry-run", action="store_true")
    ap.add_argument("--only", nargs="*", help="Process only these paths")
    args = ap.parse_args()

    paths = args.only or sorted(
        glob.glob(os.path.join(ROOT, "**", "*.png"), recursive=True)
    )
    counts: dict[str, int] = {}
    for p in paths:
        status = process(p, dry_run=args.dry_run)
        counts[status] = counts.get(status, 0) + 1
        print(f"{status:14s} {p}")
    print("---")
    for k, v in counts.items():
        print(f"{k}: {v}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
