# Copilot Instructions — GH-Hack Workshop Content Repo

## What This Repo Is

A **content-only** repository of GitHub Copilot developer training materials. The content is organized as a modular curriculum of Slidev slide decks and hands-on labs.

## Repository Structure

```
workshops/
  copilot-dev-training/      # Parent curriculum — planning docs, module index
  copilot-dev-foundations/   # Module 1: Foundations (Slidev deck + LAB)
  copilot-dev-agentic/       # Module 2: Agentic Patterns (Slidev deck + LAB)
  copilot-dev-advanced/      # Module 3: Advanced Topics (Slidev deck + LAB)
  copilot-dev-hack/          # Module 4: Hack (Slidev deck + workshop guide)
  copilot-workshop-c++/      # Standalone: Zero to Agents C++ / ODrive variant
  <workshop>/public → ../public  # Symlink/junction (gitignored, created by build script)
public/
  images/                    # Centralized image assets for Slidev decks
    copilot-dev-foundations/  # Images referenced by Module 1 slides
    copilot-dev-agentic/     # Images referenced by Module 2 slides
    copilot-dev-advanced/    # Images referenced by Module 3 slides
source/
  pptx/                      # Input PPTX files for conversion (gitignored)
site/                        # Astro site (landing page, lab pages)
  astro.config.mjs           # Astro config — base path set to /ghcp-agentic-hack/
  pages/index.astro          # Main landing page with workshop cards
  pages/[workshop]/lab.astro # Dynamic lab page route
  layouts/Base.astro         # Shared layout (header, dark theme)
scripts/
  build-site.mjs             # Full build: creates public/ symlinks → Slidev decks → Astro site
  convert-pptx.py            # PPTX → Slidev conversion (requires python-pptx)
themes/                      # Slidev theme (github/)
```

Each module folder contains a `*.slidev.md` slide deck and an optional `*-LAB.md` for hands-on exercises. The `copilot-dev-training/` parent folder holds curriculum-level planning documents.

## Build & Deployment

The full build is orchestrated by `scripts/build-site.mjs`:

```bash
node scripts/build-site.mjs
```

Build steps (in order):

1. **Create public/ symlinks** — each workshop folder gets a symlink to the repo-root `public/` so Slidev can resolve `/images/...` paths
2. **Build Slidev decks** — each deck is built with `--base` matching the deployment subpath
3. **Build Astro site** — landing page, workshop detail pages, lab pages
4. **Copy slides into Astro dist** — merges Slidev outputs into `dist/site/`

### CI / GitHub Pages

- Workflow: `.github/workflows/pages.yml` (deploys on push to `main`)
- Base path: `BASE_PATH=/ghcp-agentic-hack/` (set in workflow env)
- URL: `https://tammym-demos.github.io/ghcp-agentic-hack/`
- Trigger paths: `workshops/`, `public/`, `site/`, `themes/`, `scripts/`, `package.json`

### Local Preview

The base path means `dist/site/` can't be served directly. Create a wrapper directory:

```powershell
New-Item -ItemType Junction -Path dist\local-preview\ghcp-agentic-hack -Target (Resolve-Path dist\site).Path -Force
npx http-server dist/local-preview -p 4201 -c-1 --cors -s
# Open: http://localhost:4201/ghcp-agentic-hack/
```

Do **not** modify `BASE_PATH` to `/` for local testing — it will break the GitHub Pages deployment.

## Critical Rule: Slidev Deck ↔ LAB Synchronization

When editing either file in a module, **always check the other for consistency**. These must match between slides and labs:

- Section names, ordering, and scope
- Feature comparison matrices and data tables
- Architecture & decision flowchart diagrams (verbatim)

## Document Structure Conventions

### Slidev Files (`*.slidev.md`)
- **Frontmatter**: YAML frontmatter with `theme`, `title`, `info`, layout, and transition settings
- **Theme reference**: `theme: ../themes/github` (relative path from workshop subfolder to repo root)
- **Slide separator**: `---` between every slide
- **Speaker notes**: `<!-- notes -->` HTML comments below slide content
- **Section dividers**: Use `layout: section` in slide frontmatter
- **Demo transitions**: `layout: demo` for live demo slides
- **Breaks**: Slide with `# ☕ Break — 10 Minutes`
- **Mermaid diagrams**: Native `mermaid` fenced code blocks (rendered by Slidev)
- **Images**: Use centralized `public/images/<workshop>/` assets with `<img>` tags (see Images section below)
- **Markdownlint**: Disabled in Slidev files via `.markdownlintignore` or `<!-- markdownlint-disable -->` at the top

### LAB Files (`*-LAB.md`)
- Hands-on exercises with step-by-step instructions
- `### Success Criteria` with `✅` checkmarks
- Fenced code blocks for all commands and prompts (ensures copy button on GitHub)

### Workshop Files (`*-workshop.md`) — Legacy
- Some modules may still have workshop guide files; the Slidev deck + LAB are the primary deliverables
- **Header**: H1 title → bold metadata fields → `## Workshop Overview` → `### Learning Objectives`
- **Sections**: `## N. Section Title (XX min)` (H2, numbered, with time in parentheses)
- **Subsections**: `### Key Points`, `### 🖥️ Demo: Title`, `### Discussion Points`

### Both Files
- **No GitHub-flavored admonition syntax** (`[!NOTE]`, `[!TIP]`) — use `> **Note**:` pattern instead
- **Footer**: Every file ends with `*italicized document type description*` (e.g., `*Slide deck for GitHub Enterprise Governance Workshop*`)

## Table & Emoji Conventions

| Pattern | Format | Example |
|---------|--------|---------|
| **Feature support** | ✅ / ✗ / ⚠️ | Feature comparisons |
| **Feature checkmarks** | ✓ / ✗ (plain) | License tier comparisons |
| **Complexity traffic light** | 🟢 Low / 🟡 Medium / 🔴 High | Comparison matrices |
| **Agenda (slides)** | 2-col: `\| Time \| Topic \|` | Slide 2 in every deck |
| **Break markers** | ☕ (short breaks), 🍽️ (longer breaks) | Agenda tables |

## Diagram Conventions

All diagrams use **Unicode box-drawing characters** inside fenced code blocks (no language tag):
- Boxes: `┌─┐ │ └─┘ ├ ┤ ┬ ┴ ┼`
- Arrows: `▼ ▲ ► ◄ → ←`
- Decision branches: YES/NO labels with `┌────┴────┐` splits

## Callout Patterns

```markdown
> **Note**: General informational callout (both files)
> **Important**: Critical information callout
> 💡 **Title**: Insight or tip callout
```

## Images

All slide images live in `public/images/<workshop-folder-name>/`. This centralized structure is shared by all Slidev decks.

### Core principle

Images belong **on existing content slides** using the `image-right` layout — not on standalone image-only slides. Every image should accompany the text it supports.

### Adding images

1. Place the image in the correct subfolder:

   ```
   public/images/copilot-dev-agentic/agent-harness.png
   ```

2. Add an entry to the `images.yaml` manifest in that subfolder:

   ```yaml
   - file: agent-harness.png
     slide: "What is an Agent Harness?"
     alt: "Agent harness architecture"
     position: right
     section: "Agent Architecture"
   ```

3. Use `layout: image-right` on the target slide. Place the image in the `::image::` slot:

   ```markdown
   ---
   layout: image-right
   class: text-sm
   ---

   # What is an Agent Harness?

   - **Point one** — explanation
   - **Point two** — explanation

   ::image::

   <img src="/images/copilot-dev-agentic/agent-harness.png" alt="Agent harness architecture" />
   ```

### Image manifest fields

| Field | Required | Description |
|-------|----------|-------------|
| `file` | ✅ | Image filename |
| `slide` | ✅ | Target slide title (exact `# Heading` text) |
| `alt` | ✅ | Alt text for accessibility |
| `position` | No | `right` (image-right layout) or `center` (full-width) |
| `section` | No | Logical section the slide belongs to |

### Image rules

- Use `<img>` tags (not markdown `![]()`) for `alt` control
- Always include `alt` attributes
- Keep images under 500 KB; prefer PNG for diagrams, SVG where possible
- Name files with kebab-case matching the concept shown (e.g., `memory-landscape.png`)
- Create the workshop subfolder under `public/images/` if it does not exist yet
- Always update `images.yaml` when adding, renaming, or removing images
- Do **not** create standalone image-only slides — embed images into content slides

### How Slidev resolves images (public/ symlinks)

Slidev uses the `.slidev.md` file's directory as its Vite project root, so `/images/...` resolves from a `public/` directory **next to the slidev file**, not the repo root. To share the centralized `public/` directory:

- Each workshop folder has a `public` symlink (junction on Windows) pointing to the repo-root `public/` directory
- These symlinks are **gitignored** (`workshops/*/public/` in `.gitignore`) — they are NOT committed
- The build script (`scripts/build-site.mjs`) creates them automatically before building decks
- For local dev, create them manually if needed:

  ```powershell
  # Windows (junction)
  New-Item -ItemType Junction -Path workshops\copilot-dev-foundations\public -Target (Resolve-Path public).Path

  # Linux/macOS (symlink)
  ln -s ../../public workshops/copilot-dev-foundations/public
  ```

When adding a **new workshop folder**, the build script will auto-create the junction for it. No manual step is needed unless you want to preview locally before running a full build.

### Pre-build image sync check

Before running any build (`npm run build:site`, `npm run build:all`, or `npx slidev build`), review each `public/images/*/images.yaml` manifest for consistency:

1. **Every image file** in the directory has a corresponding entry in `images.yaml`
2. **Every manifest entry** references a file that actually exists
3. **Every `<img>` tag** in the matching Slidev deck uses the `alt` and `src` from the manifest
4. **Slide titles** in the manifest still match the actual `# Heading` in the Slidev file

If any mismatches are found, fix them before proceeding with the build.

## PPTX Conversion Pipeline

The repo supports converting NotebookLM-generated PPTX files into Slidev decks.

### Workflow

1. **Generate** a PPTX from NotebookLM (or any presentation tool)
2. **Drop** it into `source/pptx/<workshop-folder-name>.pptx`
3. **Run** the conversion:

   ```bash
   npm run convert:pptx -- <workshop-folder-name>
   ```

4. **Review** the generated `.slidev.md` and adjust layouts/density as needed
5. **Preview** with `npx slidev workshops/<workshop>/<workshop>.slidev.md`

### What the script does

- Extracts text from each PPTX slide (title + body bullets)
- Extracts embedded images and saves to `public/images/<workshop>/`
- Auto-detects the best Slidev layout for each slide (cover, section, image-right, statement, default)
- Generates `images.yaml` manifest for all extracted images
- Formats body text as markdown bullets with `<v-clicks>` progressive reveal

### Re-running after updates

The script is **idempotent** — re-running it overwrites previous output. Drop an updated PPTX into the same location and re-run:

```bash
npm run convert:pptx -- copilot-dev-foundations
```

### Source files

- Script: `scripts/convert-pptx.py` (requires `python-pptx` and optional `Pillow`)
- Input: `source/pptx/*.pptx` (gitignored — local only, not committed)
- Output: `workshops/<name>/<name>.slidev.md` + `public/images/<name>/`

### Python dependency

Install once per machine:

```bash
pip install python-pptx Pillow
```

## Content Guidelines

- **Audience**: Enterprise admins, IT decision makers, engineering managers — not beginners
- **Copyable code/prompt blocks**: Always use fenced code blocks (triple backtick) for CLI commands, prompts, YAML snippets, and configuration examples — never indented code blocks. This ensures a copy button appears when rendered on GitHub. Keep each copyable unit in its own fenced block so users can copy it with one click.
- Prefer tables and bullets over prose paragraphs
- Use `**bold**` for key terms on first use; backtick formatting for commands, paths, config values
- Do not invent GitHub features — only document what actually exists
- Every workshop section should end with **Discussion Points**
- Slide presenter notes provide talk-track guidance, not repeat slide content

## Markdown Formatting Rules

This repo uses **markdownlint** (configured in `.markdownlint.json` at the repo root). All Markdown files must pass with **zero warnings**. Follow these rules when writing or editing content:

### Enforced Rules (must follow)

| Rule | Requirement |
|------|-------------|
| **MD031** (blanks-around-fences) | Always add a blank line before and after fenced code blocks |
| **MD032** (blanks-around-lists) | Always add a blank line before the first item when a list follows a non-list line (e.g., after a paragraph, bold label, or heading) |
| **MD034** (no-bare-urls) | Never use bare URLs in tables — wrap in angle brackets: `<https://example.com>`. Markdown link syntax `[text]\(url)` is also acceptable |
| **MD007** (ul-indent) | Unordered sub-list items must use standard indentation (no extra spaces) |

### Disabled Rules (intentional — do not re-enable)

These rules are disabled in `.markdownlint.json` because they conflict with the workshop document conventions:

| Rule | Why Disabled |
|------|-------------|
| **MD013** (line-length) | Tables, talking points, and callouts regularly exceed 80 characters |
| **MD024** (no-duplicate-heading) | Workshop sections intentionally reuse subsection names (`### Key Points`, `### Steps`, `### Success Criteria`) |
| **MD029** (ol-prefix) | Numbered lists interrupted by fenced code blocks lose their sequence — markdown renderers handle this correctly |
| **MD033** (no-inline-html) | Partially disabled — `<details>`, `<summary>`, `<h2>`, `<h3>`, `<img>`, and `<br>` are allowed for collapsible sections and sized images. All other HTML elements are still flagged |
| **MD036** (no-emphasis-as-heading) | Bold step labels (`**Step 1: Title**`) inside collapsible sections are intentional |
| **MD040** (fenced-code-language) | Some fenced blocks contain plain-text decision frameworks or Unicode diagrams that have no language tag |
| **MD060** (table-column-style) | Compact table separator rows (`\|---\|---\|`) are the convention in this repo |

### Common Formatting Mistakes to Avoid

- **Wrapping navigable URLs in backticks**: If a URL is meant to be clicked (e.g., "Navigate to ..."), use angle brackets `<https://example.com>` so it renders as a clickable link. Only use backticks for URLs that are config values inside YAML, `.npmrc`, `git remote` commands, or similar code contexts
- **Missing blank line before a list**: If a list immediately follows a paragraph, bold label, or other non-list content, insert a blank line before the first `- ` item
- **Missing blank line around fenced code blocks**: Always have a blank line before the opening ` ``` ` and after the closing ` ``` `
- **Bare URLs in tables**: Use `<https://...>` or `[text]\(url)` — never a raw URL in a table cell
- **Nested code blocks in list items without spacing**: When a fenced code block appears inside a list item, add a blank line before and after it
- **Only use allowed HTML elements**: Only `<details>`, `<summary>`, `<h2>`, `<h3>`, `<img>`, and `<br>` are permitted — no other raw HTML
