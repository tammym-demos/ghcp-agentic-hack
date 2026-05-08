"""
Convert a NotebookLM-generated PPTX into a Slidev markdown deck.

Usage:
  python scripts/convert-pptx.py <workshop-folder-name>

  Example:
    python scripts/convert-pptx.py copilot-dev-foundations

  The script expects a PPTX file at:
    source/pptx/<workshop-folder-name>.pptx

  It produces:
    workshops/<workshop>/               — Slidev .slidev.md file (overwrites existing)
    public/images/<workshop>/           — Extracted images
    public/images/<workshop>/images.yaml — Updated manifest
"""

import sys
import os
import re
import io
import hashlib
from pathlib import Path

try:
    from pptx import Presentation
    from pptx.util import Inches, Pt, Emu
    from pptx.enum.shapes import MSO_SHAPE_TYPE
except ImportError:
    print("ERROR: python-pptx not installed. Run: pip install python-pptx")
    sys.exit(1)

try:
    from PIL import Image
except ImportError:
    Image = None

# --- Configuration ---
ROOT = Path(__file__).resolve().parent.parent
WORKSHOPS_DIR = ROOT / "workshops"
PUBLIC_DIR = ROOT / "public" / "images"
SOURCE_DIR = ROOT / "source" / "pptx"

# Slidev frontmatter template
FRONTMATTER = """---
theme: ../themes/github
title: "{title}"
info: |
  {info}
ghFooterTitle: "{footer_title}"
ghFooterLabel: ""
drawings:
  persist: false
mermaid:
  theme: dark
transition: slide-left
mdc: true
layout: cover
---"""


def slugify(text: str) -> str:
    """Convert text to kebab-case slug for filenames."""
    text = text.lower().strip()
    text = re.sub(r'[^\w\s-]', '', text)
    text = re.sub(r'[\s_]+', '-', text)
    text = re.sub(r'-+', '-', text)
    return text.strip('-')[:60]


def extract_text_from_shape(shape):
    """Extract all text from a shape's text frame."""
    if not shape.has_text_frame:
        return ""
    lines = []
    for para in shape.text_frame.paragraphs:
        text = para.text.strip()
        if text:
            lines.append(text)
    return "\n".join(lines)


def extract_slide_content(slide):
    """Extract structured content from a single slide."""
    title = ""
    body_lines = []
    images = []

    for shape in slide.shapes:
        # Extract images
        if shape.shape_type == MSO_SHAPE_TYPE.PICTURE:
            img = shape.image
            images.append({
                'blob': img.blob,
                'content_type': img.content_type,
                'ext': img.ext,
            })
        elif shape.shape_type == MSO_SHAPE_TYPE.GROUP:
            # Check group children for images
            for child in shape.shapes:
                if child.shape_type == MSO_SHAPE_TYPE.PICTURE:
                    img = child.image
                    images.append({
                        'blob': img.blob,
                        'content_type': img.content_type,
                        'ext': img.ext,
                    })

        # Extract text
        if shape.has_text_frame:
            if shape.shape_id == slide.shapes.title.shape_id if slide.shapes.title else False:
                title = shape.text_frame.text.strip()
            else:
                for para in shape.text_frame.paragraphs:
                    text = para.text.strip()
                    if text:
                        # Detect bullet level from indentation
                        level = para.level if hasattr(para, 'level') else 0
                        body_lines.append((level, text))

    # If no title found from placeholder, try first text shape
    if not title and body_lines:
        # Check if first line looks like a title (short, no bullet)
        if body_lines[0][0] == 0 and len(body_lines[0][1]) < 80:
            title = body_lines.pop(0)[1]

    return {
        'title': title,
        'body': body_lines,
        'images': images,
    }


def determine_layout(content, slide_index, total_slides):
    """Determine the best Slidev layout for a slide."""
    if slide_index == 0:
        return 'cover'
    if slide_index == total_slides - 1:
        return 'end'

    has_images = len(content['images']) > 0
    has_body = len(content['body']) > 0
    title = content['title'].lower()

    # Section dividers (short title, minimal body)
    if len(content['body']) <= 1 and not has_images:
        if any(kw in title for kw in ['section', 'part', 'chapter', 'module']):
            return 'section'

    # If it has images and text, use image-right
    if has_images and has_body:
        return 'image-right'

    # If it has images but no text (or minimal text), use center
    if has_images and not has_body:
        return 'center'

    # Statement slides (very short body, impactful)
    if len(content['body']) <= 2 and all(len(line[1]) < 60 for line in content['body']):
        if not has_images:
            return 'statement'

    return 'default'


def format_body_as_markdown(body_lines):
    """Convert body lines (with indent levels) to markdown bullets."""
    if not body_lines:
        return ""

    md_lines = []
    for level, text in body_lines:
        # Bold the first part if it contains a colon (key: value pattern)
        if ':' in text and text.index(':') < 40:
            parts = text.split(':', 1)
            text = f"**{parts[0].strip()}** —{parts[1].strip()}"

        indent = "  " * level
        md_lines.append(f"{indent}- {text}")

    return "\n".join(md_lines)


def save_image(blob, ext, workshop_name, slide_index, img_index, images_dir):
    """Save an image blob to disk and return the filename."""
    # Generate a content-based hash for deduplication
    content_hash = hashlib.md5(blob).hexdigest()[:8]
    filename = f"slide-{slide_index + 1:02d}-{img_index + 1}-{content_hash}.{ext}"
    filepath = images_dir / filename

    # Optimize if Pillow is available
    if Image and ext in ('png', 'jpg', 'jpeg'):
        try:
            img = Image.open(io.BytesIO(blob))
            # Resize if too large (max 1200px wide for slides)
            if img.width > 1200:
                ratio = 1200 / img.width
                new_size = (1200, int(img.height * ratio))
                img = img.resize(new_size, Image.LANCZOS)
            img.save(filepath, optimize=True)
            return filename
        except Exception:
            pass

    # Fallback: write raw bytes
    filepath.write_bytes(blob)
    return filename


def generate_slidev_markdown(slides_data, workshop_name, title, images_dir):
    """Generate the complete Slidev markdown from extracted slide data."""
    # Frontmatter
    info_text = f"Converted from NotebookLM presentation for {workshop_name}"
    md = FRONTMATTER.format(
        title=title,
        info=info_text,
        footer_title=title,
    )
    md += "\n\n"

    # First slide content (under frontmatter cover)
    if slides_data and slides_data[0]['title']:
        md += f"# {slides_data[0]['title']}\n\n"
        if slides_data[0]['body']:
            # Use first body line as subtitle
            md += f"{slides_data[0]['body'][0][1]}\n"

    # Manifest entries for images.yaml
    manifest_entries = []

    # Process remaining slides
    for i, content in enumerate(slides_data[1:], start=1):
        layout = determine_layout(content, i, len(slides_data))
        title_text = content['title'] or f"Slide {i + 1}"

        # Determine density class
        body_len = len(content['body'])
        if body_len > 8:
            density_class = "text-xs"
        elif body_len > 5:
            density_class = "text-sm"
        else:
            density_class = "text-sm"

        # Save images for this slide
        img_filenames = []
        for img_idx, img_data in enumerate(content['images']):
            filename = save_image(
                img_data['blob'], img_data['ext'],
                workshop_name, i, img_idx, images_dir
            )
            img_filenames.append(filename)

        # Build slide separator with frontmatter
        md += "\n---\n"
        if layout != 'default':
            md += f"layout: {layout}\n"
        md += f"class: {density_class}\n"
        md += "---\n\n"

        # Title
        if title_text:
            md += f"# {title_text}\n\n"

        # Body content
        if layout == 'image-right':
            # Content on left
            if content['body']:
                md += "<v-clicks>\n\n"
                md += format_body_as_markdown(content['body'])
                md += "\n\n</v-clicks>\n\n"

            # Image on right (in ::image:: slot)
            if img_filenames:
                img_file = img_filenames[0]
                alt_text = title_text or "Slide visual"
                md += "::image::\n\n"
                md += f'<img src="/images/{workshop_name}/{img_file}" alt="{alt_text}" />\n'

                manifest_entries.append({
                    'file': img_file,
                    'slide': title_text,
                    'alt': alt_text,
                    'position': 'right',
                })
        elif layout == 'statement':
            # Just the title (already written above) and maybe one line
            if content['body']:
                md += f"{content['body'][0][1]}\n"
        elif layout == 'center' and img_filenames:
            img_file = img_filenames[0]
            alt_text = title_text or "Slide visual"
            md += f'<img src="/images/{workshop_name}/{img_file}" alt="{alt_text}" class="mx-auto max-h-96" />\n'
            manifest_entries.append({
                'file': img_file,
                'slide': title_text,
                'alt': alt_text,
                'position': 'center',
            })
        else:
            # Default layout with bullets
            if content['body']:
                md += "<v-clicks>\n\n"
                md += format_body_as_markdown(content['body'])
                md += "\n\n</v-clicks>\n"

            # If there are images on a default slide, add them inline
            for img_file in img_filenames:
                alt_text = title_text or "Slide visual"
                md += f'\n<img src="/images/{workshop_name}/{img_file}" alt="{alt_text}" class="mt-4 max-h-60" />\n'
                manifest_entries.append({
                    'file': img_file,
                    'slide': title_text,
                    'alt': alt_text,
                    'position': 'inline',
                })

    return md, manifest_entries


def write_manifest(manifest_entries, images_dir):
    """Write the images.yaml manifest."""
    if not manifest_entries:
        return

    yaml_path = images_dir / "images.yaml"
    lines = []
    for entry in manifest_entries:
        lines.append(f"- file: {entry['file']}")
        lines.append(f"  slide: \"{entry['slide']}\"")
        lines.append(f"  alt: \"{entry['alt']}\"")
        lines.append(f"  position: {entry['position']}")
        lines.append("")

    yaml_path.write_text("\n".join(lines), encoding='utf-8')


def main():
    if len(sys.argv) < 2:
        print("Usage: python scripts/convert-pptx.py <workshop-folder-name>")
        print("  Example: python scripts/convert-pptx.py copilot-dev-foundations")
        sys.exit(1)

    workshop_name = sys.argv[1]
    pptx_path = SOURCE_DIR / f"{workshop_name}.pptx"

    if not pptx_path.exists():
        print(f"ERROR: PPTX file not found: {pptx_path}")
        print(f"  Place your file at: source/pptx/{workshop_name}.pptx")
        sys.exit(1)

    print(f"Converting: {pptx_path}")
    print(f"Workshop:   {workshop_name}")

    # Ensure output directories exist
    workshop_dir = WORKSHOPS_DIR / workshop_name
    images_dir = PUBLIC_DIR / workshop_name
    workshop_dir.mkdir(parents=True, exist_ok=True)
    images_dir.mkdir(parents=True, exist_ok=True)

    # Load PPTX
    prs = Presentation(str(pptx_path))
    total_slides = len(prs.slides)
    print(f"Slides:     {total_slides}")

    # Extract content from each slide
    slides_data = []
    for slide in prs.slides:
        content = extract_slide_content(slide)
        slides_data.append(content)

    # Determine deck title from first slide
    deck_title = slides_data[0]['title'] if slides_data else workshop_name
    print(f"Title:      {deck_title}")

    # Count images
    total_images = sum(len(s['images']) for s in slides_data)
    print(f"Images:     {total_images}")

    # Generate Slidev markdown
    md_content, manifest = generate_slidev_markdown(
        slides_data, workshop_name, deck_title, images_dir
    )

    # Write output files
    output_path = workshop_dir / f"{workshop_name}.slidev.md"
    output_path.write_text(md_content, encoding='utf-8')
    print(f"\nOutput:     {output_path}")

    # Write manifest
    write_manifest(manifest, images_dir)
    if manifest:
        print(f"Manifest:   {images_dir / 'images.yaml'} ({len(manifest)} entries)")

    print(f"\n✓ Conversion complete!")
    print(f"  - {total_slides} slides converted")
    print(f"  - {total_images} images extracted")
    print(f"  - Review the output and adjust layouts as needed")
    print(f"  - Run 'npx slidev {output_path.relative_to(ROOT)}' to preview")


if __name__ == "__main__":
    main()
