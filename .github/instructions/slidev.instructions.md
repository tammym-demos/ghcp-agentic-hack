---
applyTo: "**/*.slidev.md"
---

# Slidev Presentation Instructions

When creating or editing Slidev `.slidev.md` files in this repo, follow these conventions exactly.

## Theme Reference

Use the reusable GitHub dark theme at `themes/github/`. Set in frontmatter:

```yaml
---
theme: ../themes/github
title: "Your Title"
info: |
  Description of the presentation.
ghFooterTitle: "Footer Title"
ghFooterLabel: ""
drawings:
  persist: false
mermaid:
  theme: dark
transition: slide-left
mdc: true
layout: cover
---
```

## Available Layouts

| Layout | Purpose | Use For |
|--------|---------|---------|
| `cover` | Opening slide with logo + gradient | First slide only |
| `section` | Section divider with accent bar | Section transitions |
| `default` | Standard content with dot grid + glow | Most content slides |
| `center` | Centered content with radial glow | Single-concept or quote slides |
| `statement` | Bold gradient text, centered | Memorable one-liner between dense slides |
| `image-right` | Content left, framed image right | Content slides with a supporting visual |
| `two-cols` | Two-column with gradient divider | Comparisons, side-by-side data |
| `demo` | Demo transition with 🖥️ icon | Before live demos |
| `end` | Closing slide with dual glow orbs | Last 1-2 slides |

## Slide Density Classes

ALL content slides MUST have a density class to prevent scrolling. Slidev renders at 980×552px — content must fit in one page with NO scrolling.

| Class | When to Use |
|-------|-------------|
| `text-sm` | Most content slides (table + list, or code block + list) |
| `text-xs` | Very dense slides (table + code block + callout on same slide) |
| *(none)* | Only for slides with minimal content (≤3 short bullets) |

Set the class in the slide frontmatter:

```yaml
---
class: text-sm
---
```

## CSS Utility Classes for Content

### Callout Boxes (key insights, analogies)

```markdown
<div class="gh-callout gh-callout-blue">

**Bold label**: Description text here.

</div>
```

Colors: `gh-callout-blue` (default/info), `gh-callout-purple` (Copilot-related), `gh-callout-green` (success/positive)

### Glass Card Panels (decision frameworks, code examples)

```markdown
<div class="gh-box-accent">

Content inside a blue-accented glass card.

</div>
```

Variants: `gh-box` (neutral), `gh-box-accent` (blue), `gh-box-copilot` (purple), `gh-box-success` (green), `gh-box-attention` (yellow/warning)

### Stat Badges

```html
<div class="gh-stat">
  <span class="gh-stat-value">42%</span>
  <span class="gh-stat-label">Improvement</span>
</div>
```

### Inline Badges

```html
<span class="gh-badge gh-badge-blue">Preview</span>
```

Colors: `gh-badge-blue`, `gh-badge-green`, `gh-badge-purple`, `gh-badge-yellow`, `gh-badge-red`

## Slide Design Philosophy

- **Visual-first** — most slides should combine text and a visual element (image, diagram, or cards). Avoid walls of text.
- **One concept per slide** — if content overflows, split into two slides
- **Cards over tables** — when comparing 2-4 items, use `gh-box-*` cards in a grid instead of a table. Tables are for 5+ rows of data.
- **Statement slides** — use `layout: statement` between dense sections to land a memorable one-liner. The audience remembers sentences, not tables.
- **Progressive reveal** — use `<v-clicks>` for lists and cards so items appear one at a time during presentation
- **Fewer words** — aim for max 3-4 bullets per slide, max ~8 words per bullet. Let presenter notes carry the detail.

## Slide Structure Conventions

- **Content slides**: `# Title` → `### Subtitle` → content (cards, list, code) → optional callout div
- **Content slides with images**: Use `layout: image-right` — text/bullets on left, image on right via `::image::` slot
- **Statement slides**: Use `layout: statement` — a single `# Heading` plus one `p` line
- **Section dividers**: Use `layout: section` — content is just `# Section Title`
- **Demo slides**: Use `layout: demo` — `# 🖥️ LIVE DEMO` → `### Demo Title` → bullet list of what to show
- **Presenter notes**: Use HTML comments `<!-- notes here -->`
- **Progressive reveal**: Use `<v-clicks>` to reveal list items one at a time

## Tables

Tables automatically get glass-morphism treatment (rounded borders, gradient accent bar, alternating row shading). Use bold for emphasis in first column:

```markdown
| Feature | Description |
|---------|-------------|
| **Bold label** | Explanation text |
```

## Mermaid Diagrams

Use `mermaid` fenced code blocks with `{scale: 0.75}` to fit within the slide viewport. They automatically get glass container styling. Keep diagrams simple — 4-6 nodes max for readability at presentation scale.

**Line breaks in node labels**: Use `<br/>` — NOT `\n`. The `\n` escape renders as literal text in Slidev's mermaid.

```markdown
```mermaid {scale: 0.75}
graph LR
    A["Node A<br/>(subtitle)"] --> B["Node B"]
    B --> C["Node C"]
```
```

**Always include `{scale: 0.75}`** (or smaller like `0.65` / `0.6` for wide `graph LR` diagrams with 5+ nodes) — without it, mermaid diagrams render at full size and get cut off.

The mermaid glass container is set to `width: 100%` so it fills the slide width. The diagram itself is centered inside it.

## Key Rules

1. **No scrolling** — every slide must fit in the viewport. Use `text-sm` or `text-xs` class
2. **One concept per slide** — if content overflows, split into two slides
3. **PPTX slides use `background:`** — generated decks are full-bleed images, no text content on slide
4. **Cards over tables** — for 2-4 items, use `gh-box-*` cards in a `grid` instead of a table
5. **Statement slides for impact** — use `layout: statement` for memorable one-liners between dense content
6. **Callouts at bottom** — place `gh-callout` divs as the last content element
7. **Blank lines around HTML divs** — Slidev needs blank lines before/after `<div>` blocks for markdown parsing
8. **Speaker notes in comments** — use `<!-- -->` not `> **Presenter Note**:` in the slidev file
9. **Cover slide uses layout: cover in frontmatter** — the first slide's layout is set in the document frontmatter, not in a slide separator

## Images

All slide images are stored centrally in `public/images/<workshop-folder-name>/`.

### PPTX-Generated Decks (Primary Workflow)

For decks generated from NotebookLM PPTX files, each slide is a full-bleed background image. Use `background:` in the slide frontmatter:

```markdown
---
background: /images/copilot-dev-foundations/slide-02-a1b2c3d4.png
---

<!-- Presenter notes for this slide -->
```

Key rules for PPTX-generated decks:
- **No text on slides** — the image IS the slide
- **No layout overrides** — don't set `layout:` (background fills viewport)
- **Presenter notes in `<!-- -->`** — added manually after conversion
- **One image per slide** — the `background:` property handles it

### Manually-Authored Slides with Images

For slides authored by hand (not generated from PPTX), use the `image-right` layout to pair an image with text content:

```markdown
---
layout: image-right
class: text-sm
---

# Slide Title

<v-clicks>

- **Key point** — brief explanation
- **Another point** — brief explanation

</v-clicks>

::image::

<img src="/images/<workshop>/image.png" alt="Description" />
```

### Rules (all slides)

- Use `<img>` tags (not markdown `![]()`) for `alt` control when using `image-right`
- Always include `alt` attributes
- Keep images under 500 KB; prefer PNG for diagrams, SVG where possible
- Name files with kebab-case matching the concept shown
- Do **not** place images in per-workshop `assets/` directories

### How image resolution works

Slidev resolves `/images/...` from a `public/` directory relative to the `.slidev.md` file. Each workshop folder has a gitignored `public` symlink (junction on Windows) pointing to the repo-root `public/` directory. The build script creates these automatically. For local preview, create it manually:

```powershell
# Windows
New-Item -ItemType Junction -Path workshops\<folder>\public -Target (Resolve-Path public).Path

# Linux/macOS
ln -s ../../public workshops/<folder>/public
```
