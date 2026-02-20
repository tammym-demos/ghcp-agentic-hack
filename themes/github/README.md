# slidev-theme-github-workshop

A GitHub-branded [Slidev](https://sli.dev) theme for workshops, training decks, and technical presentations.

## Usage

Reference the theme as a local path in your presentation's frontmatter:

```yaml
---
theme: ../themes/github       # adjust relative path to your layout
title: "My Workshop Title"
ghFooterTitle: "Workshop Name" # shown in footer (left side)
ghFooterLabel: "Confidential"  # shown in footer, uppercase (optional)
---
```

Or copy the `themes/github/` directory into any repo and reference it the same way.

## Layouts

| Layout | Use For |
|--------|---------|
| `cover` | Title slide — dark background, gradient text, GitHub logo |
| `default` | Standard content slides — header/footer with branding |
| `section` | Section dividers — dark background with accent underline |
| `center` | Centered content — Q&A, announcements |
| `demo` | Live demo transitions — dark background, monitor icon |
| `end` | Closing slides — dark background, GitHub logo |
| `two-cols` | Side-by-side content with a vertical divider |

## Configuration

Set these in your presentation's global frontmatter:

| Key | Default | Description |
|-----|---------|-------------|
| `ghFooterTitle` | `"GitHub Workshop"` | Text shown in the footer left side |
| `ghFooterLabel` | `"GitHub Confidential"` | Uppercase label in footer |

## Features

- GitHub Primer design system colors and typography
- Branded header (GitHub logo + "GitHub Copilot" wordmark)
- Branded footer (title, label, page number, gradient bar)
- Header/footer auto-hide on dark layouts (cover, section, demo, end)
- Smooth `v-click` animations (fade + slide up)
- Rounded tables with hover highlights
- Utility classes: `.text-sm`, `.text-xs`, `.gh-box`, `.gh-badge-*`
- Mermaid diagram integration

## Utility Classes

### Badges

```html
<span class="gh-badge gh-badge-blue">Preview</span>
<span class="gh-badge gh-badge-green">Stable</span>
<span class="gh-badge gh-badge-purple">Beta</span>
<span class="gh-badge gh-badge-yellow">Warning</span>
<span class="gh-badge gh-badge-red">Breaking</span>
```

### Content Boxes

```html
<div class="gh-box">Neutral box</div>
<div class="gh-box-accent">Blue accent box</div>
<div class="gh-box-copilot">Purple Copilot box</div>
```

## File Structure

```
themes/github/
├── package.json         # Slidev theme metadata
├── README.md            # This file
├── global-top.vue       # Header component (GitHub logo + wordmark)
├── global-bottom.vue    # Footer component (title, label, page, bar)
├── styles/
│   └── index.css        # Full Primer-based stylesheet
└── layouts/
    ├── cover.vue         # Title slide
    ├── default.vue       # Standard content
    ├── section.vue       # Section divider
    ├── center.vue        # Centered content
    ├── demo.vue          # Live demo transition
    ├── end.vue           # Closing slide
    └── two-cols.vue      # Two-column layout
```
