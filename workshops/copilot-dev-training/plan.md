# Copilot Developer Training — Content Rebuild Plan

## Problem Statement

The existing Copilot Developer Training (Modules 1–4) totals ~9 hours of content but needs to fit into a **6-hour workshop** (5 hours instruction + 30-min lunch + 30-min buffer for transitions). The content plan in `contentplan.md` defines the new topic structure. This plan trims existing content to fit the constraint, replaces all existing slide/lab files in the non-draft `copilot-dev-*` folders, and updates Astro site configuration.

## Confirmed Decisions

| Decision | Choice |
|----------|--------|
| **Approach** | Trim existing content to fit 5 hours; keep current 4-module structure |
| **Labs** | Integrated — slides cue "🧪 Lab: Try it now" inline; lab docs are standalone end-to-end |
| **Deliverables per module** | Slides (`.slidev.md`) + Lab (`-LAB.md`) only — **no workshop guide files** |
| **Workshop button** | Remove from Astro site (already commented out on `index.astro`; fully remove) |
| **GitHub CLI** | In scope for Module 1 (gh copilot, gh extensions) |
| **Module 4 timing** | 15–20 minutes (cut from 30) |
| **AI Safety** | Keep 1–2 min callouts, woven inline into relevant topic slides |
| **Instruction layering** | Full stack: repo-level, folder-level, file-targeted |
| **MCP depth** | Architecture + practical install from registry (not build-your-own) |
| **Evaluation/Troubleshooting content** | Removed — replaced with content plan topics only |
| **In-scope folders** | `copilot-dev-foundations`, `copilot-dev-agentic`, `copilot-dev-advanced`, `copilot-dev-ado-integration` |
| **Out-of-scope folders** | `copilot-dev-hack` (.draft), `copilot-dev-one-day` (.draft) |

---

## Proposed Agenda (6 Hours Total)

| Time | Duration | Activity |
|------|----------|----------|
| **9:00–10:30** | 90 min | **Module 1: Foundations** |
| **10:30–12:15** | 105 min | **Module 2: Agentic Patterns** _(includes optimization section)_ |
| **12:15–12:45** | 30 min | 🍽️ **Lunch** |
| **12:45–2:15** | 90 min | **Module 3: Advanced Topics** |
| **2:15–2:30** | 15 min | **Module 4: GitHub + ADO Integration** |
| **2:30–3:00** | 30 min | **Hack / Open Lab Time** _(out of scope — .draft)_ |

> **Note**: The hack is out of scope for this plan (lives in `.draft` folders). The agenda above shows it for context only. Instructional time = **300 min (5h)** across Modules 1–4.

---

## Module 1: Foundations (90 min)

**Folder**: `workshops/copilot-dev-foundations/`
**Files to create**: `copilot-dev-foundations.slidev.md`, `copilot-dev-foundations-LAB.md`
**Files to delete**: `copilot-dev-foundations-workshop.md`

### Slide Outline

| # | Topic | Time | Notes |
|---|-------|------|-------|
| 1 | **Cover**: Copilot Developer Training — Module 1: Foundations | — | `layout: cover` |
| 2 | **Agenda** | 2 min | Module roadmap table |
| 3 | **Section: Copilot Chat Tour** | — | `layout: section` |
| 4 | AI Safety aside: "AI as Partner, Not Replacement" | 1 min | `gh-callout` inline |
| 5 | VS Code Chat Interface — chat panel, inline chat, quick chat | 5 min | Screenshot or diagram |
| 6 | Chat Modes — Ask, Edit, Agent | 5 min | Comparison table |
| 7 | Slash Commands & Participants (@workspace, @vscode, @terminal) | 5 min | Table of commands |
| 8 | 🧪 **Lab cue**: Exercise 1 — Chat Tour | — | Pointer to lab doc |
| 9 | **Section: GitHub CLI** | — | `layout: section` |
| 10 | `gh copilot` — explain, suggest commands | 5 min | Code block examples |
| 11 | `gh` extensions overview | 3 min | How to discover & install |
| 12 | 🧪 **Lab cue**: Exercise 2 — CLI | — | |
| 13 | **Section: Context & Instructions** | — | `layout: section` |
| 14 | Context Window — what goes in, how it's composed | 5 min | Mermaid diagram |
| 15 | Instruction Layering — repo, folder, file-targeted | 8 min | Stack diagram + examples |
| 16 | Sessions & Chat History management | 3 min | |
| 17 | 🧪 **Lab cue**: Exercise 3 — Instructions | — | |
| 18 | **Section: Models & Tokens** | — | `layout: section` |
| 19 | Model Landscape — which models, when to use each | 5 min | Comparison table |
| 20 | Token Mechanics — input/output, context budget | 5 min | Diagram |
| 21 | AI Safety aside: "Know your token costs" | 1 min | Inline callout |
| 22 | Token Management strategies (cost-aware usage) | 5 min | 5 key strategies list |
| 23 | 🧪 **Lab cue**: Exercise 4 — Models & Tokens | — | |
| 24 | **Module 1 Recap** | 2 min | Key takeaways |
| — | **Total presentation time** | ~58 min | ~32 min lab time |

### Lab Outline (copilot-dev-foundations-LAB.md)

| Exercise | Title | Duration | Activity |
|----------|-------|----------|----------|
| 1 | Chat Tour | 8 min | Open chat panel, try Ask/Edit/Agent modes, use slash commands, explore @workspace |
| 2 | GitHub CLI | 7 min | Run `gh copilot explain`, `gh copilot suggest`, install a gh extension |
| 3 | Custom Instructions | 8 min | Create `.github/copilot-instructions.md`, add folder-level & file-targeted instructions, observe behavior change |
| 4 | Models & Tokens | 9 min | Switch models in chat, compare outputs, check token usage in Output panel |
| — | **Total lab time** | ~32 min | |

---

## Module 2: Agentic Patterns (105 min)

**Folder**: `workshops/copilot-dev-agentic/`
**Files to create**: `copilot-dev-agentic.slidev.md`, `copilot-dev-agentic-LAB.md`
**Files to delete**: `copilot-dev-agentic-workshop.md`, `copilot-dev-agentic.slidev.md.bak`, `FEEDBACK-AGENT-LAB.md`

### Slide Outline

| # | Topic | Time | Notes |
|---|-------|------|-------|
| 1 | **Cover**: Module 2 — Agentic Patterns | — | `layout: cover` |
| 2 | **Agenda** | 2 min | |
| 3 | **Section: Context Window Management** | — | `layout: section` |
| 4 | Context window deep dive — composition, limits, what gets sent | 8 min | Mermaid diagram |
| 5 | Managing context effectively — fresh sessions, targeted context | 5 min | Best practices table |
| 6 | AI Safety aside: "Autonomy vs. Oversight" | 1 min | Inline callout |
| 7 | 🧪 **Lab cue**: Exercise 1 — Context Management | — | |
| 8 | **Section: Starting a Project with Copilot** | — | `layout: section` |
| 9 | `copilot init` — bootstrapping projects | 5 min | Demo-style slide |
| 10 | Copilot coding agent — how to start a project from an issue | 5 min | Workflow diagram |
| 11 | 🧪 **Lab cue**: Exercise 2 — Project Bootstrap | — | |
| 12 | **Section: Agents & Skills** | — | `layout: section` |
| 13 | What are agents? Built-in vs. custom | 5 min | Comparison table |
| 14 | Skills / Tools — what agents can use | 5 min | Table of available skills |
| 15 | How requests get routed to agents | 5 min | Flow diagram |
| 16 | 🧪 **Lab cue**: Exercise 3 — Agents | — | |
| 17 | **Section: Agentic Loops** | — | `layout: section` |
| 18 | Plan → Act → Observe → Reflect (RALPH) | 8 min | Mermaid loop diagram |
| 19 | Self-correction & iteration patterns | 5 min | Examples |
| 20 | The Rubber Duck Pattern — cross-model review | 5 min | How & when to use it |
| 21 | 🧪 **Lab cue**: Exercise 4 — Agentic Loops & Rubber Duck | — | |
| 22 | **Section: Agent Quality & Token Optimization** | — | `layout: section` |
| 23 | Why Quality Over Cost — ROI formula, compounding error | 5 min | Statement + callout |
| 24 | Context windows — how tokens accumulate, stateless nature | 5 min | Mermaid diagram |
| 25 | Context rot — lost in the middle, recency bias | 3 min | Attention callout |
| 26 | Control 1: Model selection (24× cost difference) | 3 min | Table |
| 27 | Control 2: Precise prompts with stop signals | 3 min | Before/after box |
| 28 | Control 3: Split tasks — Research → Plan → Implement | 3 min | Mermaid flow |
| 29 | Control 4: Deterministic guardrails (tests) | 2 min | Callout |
| 30 | Control 5: Persistent instructions | 2 min | Anti-pattern callout |
| 31 | Top 5 optimization checklist | 2 min | Statement + list |
| 32 | 🧪 **Lab cue**: Exercise 5 — Token Optimization | — | |
| 33 | **Module 2 Recap** | 2 min | Key takeaways |
| — | **Total presentation time** | ~89 min | ~26 min lab time |

### Lab Outline (copilot-dev-agentic-LAB.md)

| Exercise | Title | Duration | Activity |
|----------|-------|----------|----------|
| 1 | Context Management | 6 min | Observe context window composition, practice targeted context (#file vs #codebase), start fresh sessions |
| 2 | Project Bootstrap | 6 min | Use `copilot init` to scaffold a project, explore generated structure |
| 3 | Agents & Skills | 7 min | Trigger different agent modes, explore built-in tools, test routing behavior |
| 4 | Agentic Loops & Rubber Duck | 7 min | Observe plan-act-observe-reflect in Agent mode, try rubber duck debugging with model switching |
| 5 | Token Optimization | 5 min | Compare model tiers on same prompt, practice /clear + task splitting, write precise prompt with stop signal |
| — | **Total lab time** | ~31 min | |

---

## Module 3: Advanced Topics (90 min)

**Folder**: `workshops/copilot-dev-advanced/`
**Files to create**: `copilot-dev-advanced.slidev.md`, `copilot-dev-advanced-LAB.md`
**Files to delete**: `copilot-dev-advanced-workshop.md`, `FEEDBACK-AGENT-LAB.md` (if present), `plan.md`

### Slide Outline

| # | Topic | Time | Notes |
|---|-------|------|-------|
| 1 | **Cover**: Module 3 — Advanced Topics | — | `layout: cover` |
| 2 | **Agenda** | 2 min | |
| 3 | **Section: Agent Architecture Patterns** | — | `layout: section` |
| 4 | Single agent with multiple skills — when & how | 8 min | Architecture diagram |
| 5 | Multi-agent with multiple skills — when to break out | 8 min | Comparison diagram |
| 6 | AI Safety aside: "Designing Responsible Agents" | 1 min | Inline callout |
| 7 | Decision framework: single vs. multi-agent | 5 min | Flowchart or table |
| 8 | 🧪 **Lab cue**: Exercise 1 — Agent Architecture | — | |
| 9 | **Section: MCP (Model Context Protocol)** | — | `layout: section` |
| 10 | What is MCP? Architecture overview | 8 min | Mermaid diagram |
| 11 | AI Safety aside: "Third-Party Trust" | 1 min | Inline callout |
| 12 | Installing an MCP server from a registry | 8 min | Step-by-step with code blocks |
| 13 | Configuring MCP in VS Code settings | 5 min | JSON config example |
| 14 | 🧪 **Lab cue**: Exercise 2 — MCP Setup | — | |
| 15 | **Section: Debugging & Diagnostics** | — | `layout: section` |
| 16 | Chat Debug Mode — enabling, reading output | 5 min | How to toggle & interpret chat debug logs |
| 17 | Agent Debug Logs — tracing agentic loops | 5 min | Output channels, log levels, what to look for |
| 18 | AI Safety aside: "Debugging the Black Box" | 1 min | Inline callout |
| 19 | 🧪 **Lab cue**: Exercise 3 — Debugging | — | |
| 20 | **Section: Putting It All Together** | — | `layout: section` |
| 21 | Custom agents + MCP + instructions — the full stack | 5 min | End-to-end diagram |
| 22 | Best practices & common pitfalls | 3 min | Do/Don't table |
| 23 | 🧪 **Lab cue**: Exercise 4 — Full Stack Agent | — | |
| 24 | **Module 3 Recap** | 2 min | Key takeaways |
| — | **Total presentation time** | ~62 min | ~28 min lab time |

### Lab Outline (copilot-dev-advanced-LAB.md)

| Exercise | Title | Duration | Activity |
|----------|-------|----------|----------|
| 1 | Agent Architecture | 7 min | Build a single-agent with multiple skills, discuss when to decompose |
| 2 | MCP Setup | 10 min | Install an MCP server from the registry, configure in VS Code, test a tool call |
| 3 | Debugging Chat & Agents | 5 min | Enable chat debug mode, read output logs, enable agent debug logging, trace an agentic loop |
| 4 | Full Stack Agent | 6 min | Combine custom instructions + agent + MCP server into a working workflow |
| — | **Total lab time** | ~28 min | |

---

## Module 4: GitHub + ADO Integration (15 min)

**Folder**: `workshops/copilot-dev-ado-integration/`
**Files to create**: `gh-ado-integration-30min.slidev.md` (overwrite), `gh-ado-integration-LAB.md` (overwrite)
**Files to delete**: `gh-ado-integration-30min-workshop.md`, `PLAN.md`, `README.md`

### Slide Outline

| # | Topic | Time | Notes |
|---|-------|------|-------|
| 1 | **Cover**: Module 4 — GitHub + ADO Integration | — | `layout: cover` |
| 2 | Architecture — ADO layered on GitHub | 3 min | Diagram |
| 3 | AB# Linking — commits, PRs, state transitions | 5 min | Code examples + table of where AB# works |
| 4 | Copilot from Azure Boards work items | 3 min | Quick demo slide |
| 5 | When to integrate vs. skip — decision table | 3 min | ✅/⚠️ table |
| 6 | 🧪 **Lab cue**: Quick exercise | — | |
| 7 | **Q&A** | 1 min | |
| — | **Total presentation time** | ~15 min | Lab is optional/brief |

### Lab Outline (gh-ado-integration-LAB.md)

| Exercise | Title | Duration | Activity |
|----------|-------|----------|----------|
| 1 | AB# Linking | 5 min | Create a commit with AB# reference, observe linkage |
| — | **Total lab time** | ~5 min | (Optional — instructor demo if no ADO access) |

---

## Astro Site Changes

### Remove Workshop button (already partially done)

**File**: `site/pages/index.astro` — the Workshop badge is already commented out (line ~162). No further change needed on the main page.

**File**: `site/pages/[workshop]/index.astro` — check if Workshop badge still renders on module detail pages and comment it out if so.

### Update module descriptions

Both `site/pages/index.astro` and `site/pages/[workshop]/index.astro` need updated `workshopMeta` entries:

```javascript
'copilot-dev-training': {
  label: 'Copilot Developer Training',
  desc: '6-hour developer workshop — chat, context, agentic patterns, MCP, and GitHub + ADO integration.',
  icon: '🎓',
  modules: [
    { folder: 'copilot-dev-foundations', label: 'Module 1: Foundations', desc: '90 min · Chat tour, GitHub CLI, context & instructions, models & tokens', icon: '🎓' },
    { folder: 'copilot-dev-agentic', label: 'Module 2: Agentic Patterns', desc: '90 min · Context management, copilot init, agents & skills, agentic loops', icon: '🤖' },
    { folder: 'copilot-dev-advanced', label: 'Module 3: Advanced Topics', desc: '90 min · Agent architecture patterns, MCP setup, full-stack agents', icon: '🔬' },
    { folder: 'copilot-dev-ado-integration', label: 'Module 4: GitHub + ADO Integration', desc: '15 min · AB# linking, Copilot from Boards, decision framework', icon: '🔗' },
    { folder: 'copilot-dev-hack', label: 'Module 5: Hack', desc: '45-minute hackathon · Build custom agents for real business problems', icon: '🚀' }
  ]
}
```

---

## File Inventory — What Changes

### Files to CREATE (new content replacing old)

| File | Description |
|------|-------------|
| `workshops/copilot-dev-foundations/copilot-dev-foundations.slidev.md` | **Overwrite** — new trimmed slides |
| `workshops/copilot-dev-foundations/copilot-dev-foundations-LAB.md` | **Overwrite** — new integrated lab |
| `workshops/copilot-dev-agentic/copilot-dev-agentic.slidev.md` | **Overwrite** — new trimmed slides |
| `workshops/copilot-dev-agentic/copilot-dev-agentic-LAB.md` | **Overwrite** — new integrated lab |
| `workshops/copilot-dev-advanced/copilot-dev-advanced.slidev.md` | **Overwrite** — new trimmed slides |
| `workshops/copilot-dev-advanced/copilot-dev-advanced-LAB.md` | **Overwrite** — new integrated lab |
| `workshops/copilot-dev-ado-integration/gh-ado-integration-30min.slidev.md` | **Overwrite** — trimmed to 15 min |
| `workshops/copilot-dev-ado-integration/gh-ado-integration-LAB.md` | **Overwrite** — minimal lab |

### Files to DELETE

| File | Reason |
|------|--------|
| `workshops/copilot-dev-foundations/copilot-dev-foundations-workshop.md` | Workshop guides removed (Slides + Lab only) |
| `workshops/copilot-dev-agentic/copilot-dev-agentic-workshop.md` | Workshop guides removed |
| `workshops/copilot-dev-agentic/copilot-dev-agentic.slidev.md.bak` | Backup file cleanup |
| `workshops/copilot-dev-agentic/FEEDBACK-AGENT-LAB.md` | Not in new content plan |
| `workshops/copilot-dev-advanced/copilot-dev-advanced-workshop.md` | Workshop guides removed |
| `workshops/copilot-dev-advanced/FEEDBACK-AGENT-LAB.md` | Not in new content plan (if exists) |
| `workshops/copilot-dev-advanced/plan.md` | Old planning doc |
| `workshops/copilot-dev-ado-integration/gh-ado-integration-30min-workshop.md` | Workshop guides removed |
| `workshops/copilot-dev-ado-integration/PLAN.md` | Old planning doc |
| `workshops/copilot-dev-ado-integration/README.md` | Not needed |

### Files to EDIT

| File | Change |
|------|--------|
| `site/pages/index.astro` | Update `workshopMeta` descriptions for copilot-dev-training modules |
| `site/pages/[workshop]/index.astro` | Update `workshopMeta` descriptions (must match index.astro) |

---

## Conventions & Style

All Slidev files follow `.github/instructions/slidev.instructions.md`:

- **Theme**: `theme: ../../themes/github` (two levels up from workshop subfolder)
- **Frontmatter**: `transition: slide-left`, `mdc: true`, `layout: cover`
- **Density**: All content slides use `class: text-sm` or `text-xs`
- **Diagrams**: Mermaid with `{scale: 0.75}`, `<br/>` for line breaks
- **Callouts**: `<div class="gh-callout gh-callout-blue">` for info, `gh-callout-purple` for Copilot
- **Lab cues**: Slide with a clear `🧪 Lab: Exercise N — Title` heading pointing to the lab doc
- **Speaker notes**: `<!-- notes -->` HTML comments
- **No scrolling**: One concept per slide
- **AI Safety**: Inline `gh-callout` divs woven into relevant topic slides (not standalone sections)

Lab files follow workshop `-LAB.md` conventions:
- Numbered exercises with clear titles, time estimates, and step-by-step instructions
- Each exercise is self-contained with success criteria (✅ checkmarks)
- Copyable code blocks for all commands and prompts

---

## Execution Order

1. **Module 1** — Foundations slides + lab
2. **Module 2** — Agentic Patterns slides + lab
3. **Module 3** — Advanced Topics slides + lab
4. **Module 4** — ADO Integration slides + lab (smallest)
5. **Astro site** — Update workshopMeta in both index files
6. **Cleanup** — Delete old workshop guides, backups, planning docs
7. **Build & verify** — `npm run build:all` and local preview
8. **Commit & push** — `git add .`, `git commit`, `git push` to trigger GitHub Pages build
