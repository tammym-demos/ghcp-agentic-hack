# Copilot Instructions — GH-Hack Workshop Content Repo

## What This Repo Is

A **content-only** repository of GitHub workshop/training materials for enterprise customers. No application code — only Markdown documents organized as paired slide decks and workshop guides.

## Repository Structure

```
copilot-workshops/     # Copilot training (Zero to Agents) — includes demo-scripts.md
github-admin/          # Enterprise setup, governance, architecture patterns
github-migration/      # Platform migration guides (Bitbucket → GitHub)
docs/                  # Reference PDFs/ebooks (currently empty)
```

Each topic has a **paired set**: `*-slides.md` + `*-workshop.md`. The **workshop is the source of truth**; slides must stay aligned with it. One topic (`copilot-zero-to-agents`) also has a `*-demo-scripts.md`.

## Critical Rule: Slides ↔ Workshop Synchronization

When editing either file in a pair, **always check the other for consistency**. These must match exactly between both files:
- Agenda tables (section names, timing, order)
- Pros/Cons/Requirements tables (identical rows, headers, wording)
- Architecture & decision flowchart diagrams (verbatim)
- "When to Choose" / "Think twice if" bullet lists
- Feature comparison matrices and data tables

## Document Structure Conventions

### Slides Files (`*-slides.md`)
- **Header**: H1 title → `## Slide Deck — Presenter Guide` (or `## Slide Deck with Presenter Notes`) → bold metadata fields (`**Duration**`, `**Format**`, `**Audience**`)
- **Slides**: `## Slide N: Title` (H2, sequential numbering)
- **Section dividers**: `# SECTION [N]: Title` (H1) before a section divider slide
- **Slide separator**: Every slide ends with `---`
- **Presenter notes**: `> **Presenter Note**: *"Conversational talk-track text."*` — appears after every slide, never in workshop files
- **Demo transitions**: `🖥️ **SWITCH TO DEMO**` in presenter notes; `# 🖥️ LIVE DEMO` as the demo slide heading
- **Breaks**: `## Slide N: ☕ Break` with content `# ☕ Break — 10 Minutes`
- **Appendix**: H1 `# APPENDIX` — includes Demo Timing Guide table, Backup URLs, Pre-Demo Checklist, Backup Plan

### Workshop Files (`*-workshop.md`)
- **Header**: H1 title (ends with "Workshop" or "Workshop Guide") → bold metadata fields → `## Workshop Overview` → `### Learning Objectives`
- **Sections**: `## N. Section Title (XX min)` (H2, numbered, with time in parentheses)
- **Subsections**: `### Key Points`, `### 🖥️ Demo: Title`, `### Discussion Points` (3-4 questions at section end)
- **Hands-on** (copilot-workshops only): `### Success Criteria` with `✅` checkmarks
- **Appendix**: H2 `## Appendix` — includes Key URLs table, checklists, Backup Plan

### Both Files
- **No YAML frontmatter** — all metadata is inline bold Markdown fields
- **No GitHub-flavored admonition syntax** (`[!NOTE]`, `[!TIP]`) — use `> **Note**:` pattern instead
- **Footer**: Every file ends with `*italicized document type description*` (e.g., `*Slide deck for GitHub Enterprise Governance Workshop*`)

## Table & Emoji Conventions

| Pattern | Format | Example |
|---------|--------|---------|
| **Pros/Cons/Requirements** | `\| ✅ Pros \| ✗ Cons \| 📋 Requirements \|` | All decision-support tables |
| **Feature support** | ✅ / ✗ / ⚠️ | EMU vs GHEC comparisons |
| **Feature checkmarks** | ✓ / ✗ (plain) | License tier comparisons |
| **Complexity traffic light** | 🟢 Low / 🟡 Medium / 🔴 High | Comparison matrices |
| **Scenario color labels** | 🔵 EMU, 🟢 Multi-Org, 🟠 Mixed/GHES, 🟣 GHE.com | `gh-setup-configurations` files |
| **Agenda (slides)** | 2-col: `\| Time \| Topic \|` | Slide 2 in every deck |
| **Agenda (workshop)** | 3-col: `\| Section \| Topic \| Time \|` | Workshop agenda sections |
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
> **Presenter Note**: *"Talk-track text"* (slides only)
> 💡 **Title**: Insight or tip callout
> **🟣 Consider GHE.com first**: Advisory evaluation callout
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

- **Missing blank line before a list**: If a list immediately follows a paragraph, bold label, or other non-list content, insert a blank line before the first `- ` item
- **Missing blank line around fenced code blocks**: Always have a blank line before the opening ` ``` ` and after the closing ` ``` `
- **Bare URLs in tables**: Use `<https://...>` or `[text]\(url)` — never a raw URL in a table cell
- **Nested code blocks in list items without spacing**: When a fenced code block appears inside a list item, add a blank line before and after it
- **Only use allowed HTML elements**: Only `<details>`, `<summary>`, `<h2>`, `<h3>`, `<img>`, and `<br>` are permitted — no other raw HTML
