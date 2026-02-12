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
