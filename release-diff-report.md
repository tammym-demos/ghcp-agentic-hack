# Release Diff Report: `pre-cleanup` → `HEAD`

**Generated**: 2026-05-08  
**Base tag**: `pre-cleanup`  
**Head**: `d8bae3d` (main)  
**Total commits**: 8  
**Total changes**: 46 files changed, 2,787 insertions, 1,902 deletions

---

## Commit Log

| SHA | Date | Summary |
|-----|------|---------|
| `d8bae3d` | 2026-05-08 18:51 | fix: use `<img>` tags for PPTX slides + improve header/footer contrast |
| `1941469` | 2026-05-08 16:37 | fix: add image-full layout for PPTX slides + re-apply safety callouts |
| `5542ef6` | 2026-05-08 16:12 | fix: correct theme path for PPTX-generated Slidev decks |
| `ea7caee` | 2026-05-08 15:59 | Slide Changes |
| `ebae3b5` | 2026-05-08 15:42 | Rubber duck review: fix consistency, accuracy, and completeness across Modules 1-3 |
| `b0a5fb8` | 2026-05-08 15:19 | Restore Module 4 (Hack) and re-add to Astro configs |
| `30c755c` | 2026-05-08 15:09 | Add source-of-truth workshop guides for Modules 1-3 |
| `b9e44e3` | 2026-05-08 14:38 | Repo cleanup: full-bleed image workflow, remove Module 4 and build artifacts |

---

## High-Level Summary

The curriculum shifted from a **feature-centric** structure to a **workflow-and-safety-centric** structure. Key themes:

1. **New source-of-truth workshop guides** — 3 new `-workshop.md` files serve as authoritative content designed for NotebookLM slide generation
2. **Slide decks completely rewritten** — Agentic and Advanced decks replaced with new content matching the workshop guides
3. **Foundations deck rebuilt** — PPTX images replaced; rendering pipeline changed from `background:` to `<img>` tags
4. **AI Safety sprinkled throughout** — 14 safety checkpoints added across all LABs, GHAS nudges in slides
5. **Theme and infrastructure fixes** — New `image-full` layout, header/footer contrast improvements, PPTX conversion script rewritten

---

## File-by-File Diff Stats

```
.github/copilot-instructions.md                    | 155 ++--
.github/instructions/slidev.instructions.md        |  44 +-
public/images/copilot-dev-advanced/images.yaml     |   9 -
public/images/copilot-dev-agentic/images.yaml      |  16 -
public/images/copilot-dev-foundations/images.yaml  |  69 -
public/images/copilot-dev-foundations/slide-*.png   | 28 binary (14 added, 14 removed)
scripts/convert-pptx.py                            | 411 +++-------
themes/github/global-bottom.vue                    |   8 +-
themes/github/global-top.vue                       |   4 +-
themes/github/layouts/image-full.vue               |  24 + (NEW)
workshops/copilot-dev-advanced-LAB.md              | 209 ++---
workshops/copilot-dev-advanced-workshop.md         | 465 +++++++++++ (NEW)
workshops/copilot-dev-advanced.slidev.md           | 881 +++++++---------
workshops/copilot-dev-agentic-LAB.md               | 235 +++---
workshops/copilot-dev-agentic-workshop.md          | 673 +++++++++++++ (NEW)
workshops/copilot-dev-agentic.slidev.md            | 707 +++++---------
workshops/copilot-dev-foundations-LAB.md           | 164 ++--
workshops/copilot-dev-foundations-workshop.md      | 501 +++++++++++ (NEW)
workshops/copilot-dev-foundations.slidev.md        | 114 ++-
```

---

## Detailed Changes by Category

### 1. New Files

#### `workshops/copilot-dev-foundations/copilot-dev-foundations-workshop.md` (NEW)

- Source-of-truth workshop guide for Module 1: Foundations
- Covers: Copilot chat modes, custom instructions, model selection, GitHub Copilot CLI
- Designed to be fed into NotebookLM for visual slide deck generation

#### `workshops/copilot-dev-agentic/copilot-dev-agentic-workshop.md` (NEW)

- Source-of-truth workshop guide for Module 2: Agentic Patterns
- Covers: autonomy spectrum, PAOR loop, Ralph loop, orchestration topologies, antipatterns
- Introduces coding agent issue framing and human checkpoints

#### `workshops/copilot-dev-advanced/copilot-dev-advanced-workshop.md` (NEW)

- Source-of-truth workshop guide for Module 3: Advanced Topics
- Covers: extensions, MCP configuration, output evaluation (SMART criteria), diagnostics/troubleshooting

#### `themes/github/layouts/image-full.vue` (NEW)

- Transparent layout for PPTX-generated full-bleed image slides
- Renders slot `<img>` tags with `object-fit: contain` filling the viewport
- Necessary because other theme layouts (cover, default, section) paint opaque CSS backgrounds

---

### 2. Slide Deck Changes

#### Module 1: Foundations (`copilot-dev-foundations.slidev.md`)

| Aspect | Before (`pre-cleanup`) | After (`HEAD`) |
|--------|----------------------|----------------|
| Theme path | `../themes/github` (broken) | `../../themes/github` (correct) |
| Image rendering | `background:` frontmatter | `<img>` tags in slide content |
| Layout | default/cover | `image-full` on all 14 slides |
| Slide images | `slide-NN-1-*.png` naming | `slide-NN-*.png` naming (re-exported) |
| Slide count | 15 slides | 14 slides |

**Root cause of blank slides**: Slidev's `background:` frontmatter does not prepend `--base` to URLs at runtime. On GitHub Pages at `/ghcp-agentic-hack/`, the browser requested `/images/...` (404) instead of `/ghcp-agentic-hack/.../images/...` (200). The `<img>` tag fix lets Vite correctly transform the URL through the markdown→Vue pipeline.

#### Module 2: Agentic (`copilot-dev-agentic.slidev.md`)

| Aspect | Before (`pre-cleanup`) | After (`HEAD`) |
|--------|----------------------|----------------|
| Lines | ~707 | ~509 |
| Structure | Feature-centric (context mgmt, agents, skills, MCP) | Workflow-centric (autonomy spectrum, PAOR, Ralph loop, antipatterns) |
| Sections | Context Management, Agents & Skills, MCP, Agentic Loops | Autonomy Spectrum, Agentic Loop, PAOR & Ralph, Rubber Duck, Orchestration, Antipatterns |
| Safety callouts | 0 | 7 purple callouts embedded in slides |
| GHAS nudges | 0 | 1 (code scanning + Copilot Autofix on orchestration slide) |

**Key content shifts**:

- Removed: standalone sections on context management, `@workspace /new`, agent skills
- Added: autonomy spectrum (completions → chat → agent → coding agent), PAOR loop framework, Ralph loop (inner repair cycle), 8 antipatterns list, orchestration topologies
- Coding agent now framed as highest-autonomy level with explicit human checkpoints

#### Module 3: Advanced (`copilot-dev-advanced.slidev.md`)

| Aspect | Before (`pre-cleanup`) | After (`HEAD`) |
|--------|----------------------|----------------|
| Lines | ~881 | ~614 |
| Structure | Agent architecture, MCP deep-dive, debugging | Extensions/trust, MCP config, evaluation rubric, diagnostics |
| Sections | Agent Architecture, MCP Setup, Debugging Chat, Full Stack Agent | Extensions & Trust, MCP Configuration, Evaluating Output, Troubleshooting |
| Safety callouts | 0 | 4 purple callouts |
| GHAS nudges | 0 | 2 (Dependabot + secret scanning) |

**Key content shifts**:

- Removed: custom agent creation (`.github/agents/*.md`), agent architecture comparison (broad vs specialized), external URL fetching via MCP
- Added: extension trust review checklist, SMART evaluation criteria, output rubric (correctness/readability/security/coverage), VS Code diagnostics walkthrough
- GHAS nudges on trust calibration and third-party trust slides

---

### 3. LAB Changes

#### Module 1: Foundations LAB (`copilot-dev-foundations-LAB.md`)

| Aspect | Before | After |
|--------|--------|-------|
| Exercises | 4 (Chat Tour, GitHub CLI, Custom Instructions, Models & Tokens) | 4 (Foundations Framing, Chat Tour, Memory/Context, Models/Agents) |
| Total time | ~32 min | ~35 min |
| Safety checkpoints | 0 | 4 🛡️ |
| GHAS mentions | 0 | 1 (secret scanning) |

**Key changes**:

- New Exercise 1: "Foundations Framing, Safety, and Workflow Map" — choose Ask/Plan/Agent before prompting
- Chat Tour expanded: adds Plan mode, inline chat, GitHub Copilot CLI (replaces `gh copilot`)
- Custom Instructions: adds prompt refinement exercise (task/scope/constraints/output)
- Models exercise: adds cross-model security comparison
- CLI commands updated from `gh copilot explain/suggest` to `copilot -p`

#### Module 2: Agentic LAB (`copilot-dev-agentic-LAB.md`)

| Aspect | Before | After |
|--------|--------|-------|
| Exercises | 4 (Context Mgmt, Project Bootstrap, Agents & Skills, Agentic Loops) | 6 (Autonomy Spectrum, Loop Architecture, PAOR/Ralph, Rubber Duck, Topologies, Antipatterns) |
| Total time | ~26 min | ~26 min |
| Safety checkpoints | 0 | 6 🛡️ |
| GHAS mentions | 0 | 1 (code scanning + Copilot Autofix) |

**Key changes**:

- Complete rewrite to match new workshop guide structure
- Removed: `#codebase` vs `#file` comparison, `@workspace /new` scaffolding, custom agent creation, PRD-quality prompt comparison
- Added: autonomy spectrum exercise (same task across chat/agent/coding-agent), PAOR labeling, Ralph loop identification, cross-model rubber duck review, orchestration topology selection, antipattern-to-contract rewrite

#### Module 3: Advanced LAB (`copilot-dev-advanced-LAB.md`)

| Aspect | Before | After |
|--------|--------|-------|
| Exercises | 4 (Agent Architecture, MCP Setup, Debugging, Full Stack Agent) | 4 (Participants & Trust, MCP Config, SMART Evaluation, Diagnostics) |
| Total time | ~28 min | ~30 min |
| Safety checkpoints | 0 | 4 🛡️ |

**Key changes**:

- Removed: custom agent creation (`.github/agents/*.md`), MCP fetch server, output panel token inspection, full-stack agent workflow
- Added: `@workspace`/`@vscode`/`@terminal` participant comparison, extension trust review checklist, MCP filesystem server config, SMART criteria rewrite exercise, Agent Debug Log + Chat Debug View walkthrough

---

### 4. Safety & GHAS Additions

#### Safety Checkpoints Added (14 total)

| Module | File | Checkpoints | Topics |
|--------|------|-------------|--------|
| Foundations | LAB | 4 | Agent diff review, CLI command review, secret scanning instruction, cross-model security comparison |
| Agentic | LAB | 6 | Blast radius awareness, unexpected tool usage, retry quality, over-trust, least privilege for agents, bounded failure contracts |
| Advanced | LAB | 4 | Least-privilege install scope, MCP scope decision, verification patterns for risky changes, log-based trust tightening |

#### GHAS Nudges Added (4 total)

| Module | File | Location | Tool Mentioned |
|--------|------|----------|----------------|
| Foundations | LAB | Exercise 3 | Secret scanning |
| Agentic | Slides | Orchestration topologies slide | Code scanning + Copilot Autofix |
| Agentic | LAB | Exercise 6 | Code scanning + Copilot Autofix |
| Advanced | Slides | Trust calibration + third-party trust | Dependabot, secret scanning |

---

### 5. Infrastructure Changes

#### `scripts/convert-pptx.py`

- **Before**: Generated Slidev frontmatter with `background:` property, text extraction, layout detection
- **After**: Simplified to generate `<img>` tags with `layout: image-full`, streamlined image extraction
- Theme path corrected: `../themes/github` → `../../themes/github`
- Script is idempotent — re-running overwrites previous output

#### `themes/github/global-top.vue` and `global-bottom.vue`

- Header/footer text colors changed from `#30363d` → `#8b949e` for better contrast on dark theme background
- Footer dot color changed from `#21262d` → `#6e7681`

#### `.github/instructions/slidev.instructions.md`

- Documented `image-full` layout usage
- Added rationale for `<img>` tags over `background:` frontmatter
- Updated theme path template

#### `.github/copilot-instructions.md`

- Updated with content workflow documentation
- Workshop files (`-workshop.md`) documented as source of truth

#### Removed Files

- `public/images/copilot-dev-advanced/images.yaml` — manifest no longer used
- `public/images/copilot-dev-agentic/images.yaml` — manifest no longer used
- `public/images/copilot-dev-foundations/images.yaml` — manifest no longer used
- 14 old slide images (`slide-NN-1-*.png`) replaced with 14 new images (`slide-NN-*.png`)

---

### 6. Content Philosophy Shift

| Dimension | Before (`pre-cleanup`) | After (`HEAD`) |
|-----------|----------------------|----------------|
| **Slide structure** | Feature-centric (tools, APIs, configs) | Workflow-centric (when to use what, how to stay safe) |
| **Agent coverage** | How to build agents (`@helper`, `@tester`, `@documenter`) | When to delegate, how to bound autonomy, how to review |
| **MCP coverage** | External fetch server demo | Filesystem server + trust/scope decisions |
| **Safety** | Not present | 14 checkpoints + 4 GHAS nudges woven throughout |
| **Evaluation** | Not present | SMART criteria, output rubric (correctness/readability/security/coverage) |
| **Diagnostics** | Output panel token inspection | Agent Debug Log, Chat Debug View, `/troubleshoot`, diagnostics collection |
| **Coding agents** | Not mentioned | Framed as highest autonomy level with explicit human review gates |
| **Workshop guides** | Not present | 3 new `-workshop.md` files as authoritative content source |

---

## Appendix: How Copilot CLI Instructions & Session Storage Work

This section documents the GitHub features that power the Copilot CLI's instruction resolution, session persistence, and memory system — the same features used to generate and recover this report.

### Custom Instructions (3 Layers)

Copilot CLI resolves instructions from multiple locations, merged at runtime:

| Layer | Location | Scope |
|-------|----------|-------|
| **Repository-level** | `.github/copilot-instructions.md` | Applied to all Copilot interactions in the repo |
| **Scoped instructions** | `.github/instructions/**/*.instructions.md` | Applied selectively via `applyTo` glob patterns in YAML frontmatter (e.g., `applyTo: "**/*.slidev.md"` targets only Slidev files) |
| **User-level** | `$HOME/.copilot/copilot-instructions.md` | Personal instructions applied across all repos for the current user |
| **Additional files** | `CLAUDE.md`, `GEMINI.md`, `AGENTS.md` | Respected at git root and cwd |
| **Env var** | `COPILOT_CUSTOM_INSTRUCTIONS_DIRS` | Additional directories containing instruction files |

In this repo, instructions are split across:

- `.github/copilot-instructions.md` — repo structure, build commands, content conventions, PPTX pipeline docs
- `.github/instructions/slidev.instructions.md` — Slidev-specific theme, layout, and image conventions (only applied to `*.slidev.md` files)
- `.github/instructions/astro.instructions.md` — Astro site configuration and module registration
- `.github/prompts/generate-slides.prompt.md` — reusable prompt for generating Slidev decks from workshop files

### Session Storage

Copilot CLI persists every session turn, tool call, and file operation in two stores:

| Store | Location | Purpose |
|-------|----------|---------|
| **Local** | `~/.copilot/session-state/<session-id>/` | Checkpoints, persistent files, SQLite DB per session |
| **Cloud** | GitHub's cloud session store | Synced automatically; queryable via DuckDB SQL across all past sessions |

Key tables in the cloud store: `sessions`, `turns`, `session_files`, `tool_requests`, `events`, `checkpoints`, `session_refs`.

This is what enabled recovery of this very file — the `create` tool call with full file content was recorded in the cloud session store and retrieved via `session_store_sql` even though the file was never committed to git.

### Memories

The Copilot CLI `store_memory` system persists facts across sessions:

- **User-scoped** memories apply to the current user across all repos (e.g., personal preferences)
- **Repository-scoped** memories apply to all contributors in a specific repo (e.g., build commands, conventions)
- Memories can be **upvoted** or **downvoted** to indicate accuracy
- They surface automatically in future sessions as context

---

## Known Issues

- **Foundations slides still rendering blank** — The `<img>` tags and base path are correctly compiled in the JS bundle (verified), but the slides may still appear blank in the browser. Further investigation of the `image-full.vue` layout rendering is needed.
