"""Repair slides where remove-watermark.py created visible artifacts.

The original watermark removal pasted pixels from x=1072..1224 (same y range)
into the watermark area x=1224..1376. That works perfectly when the source
strip is uniform background, but produces a duplicated copy of any text or
content that lay within the source strip (e.g., a blue footer bar with white
text near the right edge of the slide).

This repair script:

1. Detects affected slides by measuring color variance of the SOURCE strip
   (x=1072..1224, y=735..766). High variance => the strip had text/edges, so
   our prior paste duplicated visible content into x=1224..1376.

2. For affected slides, refills x=1224..1376, y=735..766 row-by-row using the
   modal (most common) RGB value sampled from x=0..1223 of that same row.
   This reliably reproduces solid-color horizontal bars (header/footer banners)
   without duplicating text.

Slides whose source strip was uniform background are left untouched — those
were already cleanly repaired by the previous pass.

Usage:
    py scripts/repair-watermark-artifacts.py [--dry-run] [--threshold N]
    py scripts/repair-watermark-artifacts.py --only path1.png path2.png
"""
from __future__ import annotations

import argparse
import glob
import os
import sys
from collections import Counter

from PIL import Image

ROOT = os.path.join(os.path.dirname(__file__), "..", "public", "images")

TARGET_SIZE = (1376, 768)
WM_LEFT, WM_TOP, WM_RIGHT, WM_BOTTOM = 1224, 735, 1376, 766
WM_W = WM_RIGHT - WM_LEFT  # 152

# Source strip used by the buggy removal pass (same y range, left of WM).
SRC_LEFT = WM_LEFT - WM_W   # 1072
SRC_RIGHT = WM_LEFT          # 1224

# Bucket size for "color similarity" when counting distinct colors / mode.
# Quantizing to 16-step buckets ignores tiny JPEG-ish noise but keeps real
# differences (background vs text) separate.
BUCKET = 16


def quantize(rgb: tuple[int, int, int]) -> tuple[int, int, int]:
    r, g, b = rgb
    return (r // BUCKET, g // BUCKET, b // BUCKET)


def source_strip_variance(im: Image.Image) -> int:
    """Return the number of distinct quantized colors in the source strip.

    A uniform background yields 1-3. Text/edges yield 20+.
    """
    strip = im.crop((SRC_LEFT, WM_TOP, SRC_RIGHT, WM_BOTTOM)).convert("RGB")
    pixels = list(strip.getdata())
    buckets = {quantize(p) for p in pixels}
    return len(buckets)


def repair(im: Image.Image) -> Image.Image:
    """Refill watermark area with per-row modal color sampled from the left."""
    rgb = im.convert("RGB")
    pixels = rgb.load()
    for y in range(WM_TOP, WM_BOTTOM):
        # Count quantized colors in this row from x=0..WM_LEFT-1.
        counter: Counter[tuple[int, int, int]] = Counter()
        # Also keep a representative full-resolution sample per bucket so we
        # can restore an un-quantized color (avoid posterization artifacts).
        rep: dict[tuple[int, int, int], tuple[int, int, int]] = {}
        for x in range(0, WM_LEFT):
            p = pixels[x, y]
            q = quantize(p)
            counter[q] += 1
            if q not in rep:
                rep[q] = p
        mode_bucket, _ = counter.most_common(1)[0]
        fill = rep[mode_bucket]
        for x in range(WM_LEFT, WM_RIGHT):
            pixels[x, y] = fill
    return rgb


def process(path: str, threshold: int, dry_run: bool) -> str:
    with Image.open(path) as im:
        if im.size != TARGET_SIZE:
            return "skip-size"
        mode = im.mode
        variance = source_strip_variance(im)
        if variance < threshold:
            return f"skip-clean(var={variance})"
        repaired = repair(im)
        if dry_run:
            return f"would-repair(var={variance})"
        out = repaired.convert(mode) if mode not in ("RGB", "RGBA") else repaired
        out.save(path, optimize=True)
        return f"repaired(var={variance})"


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--dry-run", action="store_true")
    ap.add_argument(
        "--threshold",
        type=int,
        default=15,
        help="Min distinct quantized colors in source strip to consider affected.",
    )
    ap.add_argument("--only", nargs="*", help="Process only these paths")
    args = ap.parse_args()

    paths = args.only or sorted(
        glob.glob(os.path.join(ROOT, "**", "*.png"), recursive=True)
    )
    counts: dict[str, int] = {}
    for p in paths:
        status = process(p, threshold=args.threshold, dry_run=args.dry_run)
        # Bucket status for summary (strip the (var=N) suffix).
        key = status.split("(")[0]
        counts[key] = counts.get(key, 0) + 1
        print(f"{status:30s} {p}")
    print("---")
    for k, v in counts.items():
        print(f"{k}: {v}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
